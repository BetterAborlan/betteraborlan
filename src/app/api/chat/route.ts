import { groq } from '@ai-sdk/groq';
import { convertToModelMessages, streamText, type UIMessage } from 'ai';
import { buildSystemPrompt } from '@/lib/chat-context';
import { isChatLanguage, logChatEvent } from '@/lib/chat-log';
import { RATE_LIMIT_MESSAGE } from '@/lib/chat-shared';
import { clientIp, createRateLimiter } from '@/lib/rate-limit';

export const maxDuration = 30;

// Smallest general-purpose chat model on Groq (llama-3.1-8b-instant was
// retired). It's a reasoning model: effort is kept low for latency/tokens,
// and the reasoning itself is never streamed to the resident.
const MODEL = 'openai/gpt-oss-20b';
const MAX_MESSAGES = 12;
const MAX_MESSAGE_LENGTH = 1000;

// RATE_WINDOW_MS is mirrored client-side as RATE_LIMIT_COOLDOWN_MS.
const RATE_LIMIT = 15;
const RATE_WINDOW_MS = 60_000;
const isRateLimited = createRateLimiter(RATE_LIMIT, RATE_WINDOW_MS);

function textOf(message: UIMessage): string {
  return message.parts
    .filter((p): p is { type: 'text'; text: string } => p.type === 'text')
    .map((p) => p.text)
    .join(' ');
}

function lastUserText(messages: UIMessage[]): string {
  for (let i = messages.length - 1; i >= 0; i--) {
    const msg = messages[i];
    if (msg.role !== 'user') continue;
    return textOf(msg);
  }
  return '';
}

export async function POST(req: Request) {
  if (isRateLimited(clientIp(req))) {
    return new Response(RATE_LIMIT_MESSAGE, { status: 429 });
  }

  // logConsent/uiLanguage come from ChatWidget's transport body. Logging
  // happens only when the resident has explicitly opted in.
  const {
    messages,
    logConsent,
    uiLanguage,
  }: { messages: UIMessage[]; logConsent?: unknown; uiLanguage?: unknown } = await req.json();

  if (!Array.isArray(messages) || messages.length === 0) {
    return new Response('No messages provided.', { status: 400 });
  }

  const trimmedMessages = messages.slice(-MAX_MESSAGES);
  const question = lastUserText(trimmedMessages);

  if (question.length > MAX_MESSAGE_LENGTH) {
    return new Response('Message is too long.', { status: 400 });
  }

  const startedAt = Date.now();
  const { system, serviceIds } = buildSystemPrompt(question);
  const result = streamText({
    model: groq(MODEL),
    providerOptions: { groq: { reasoningEffort: 'low' } },
    system,
    messages: await convertToModelMessages(trimmedMessages),
  });

  return result.toUIMessageStreamResponse({
    sendReasoning: false,
    // Stamps the assistant reply with a server-side timestamp (sent on the
    // 'start' event) so the client can show "when" without trusting local
    // clocks alone for one side of the conversation.
    messageMetadata: ({ part }) => (part.type === 'start' ? { createdAt: Date.now() } : undefined),
    // A server-assigned id becomes the reply's id on the client too, so a
    // later 👍/👎 (sent to /api/chat/log) can find this row.
    generateMessageId: () => crypto.randomUUID(),
    onEnd: async ({ responseMessage, isAborted, finishReason }) => {
      if (logConsent !== true || !isChatLanguage(uiLanguage) || isAborted) return;
      // A failed generation (e.g. a provider error) ends with no text --
      // nothing to log, and it would skew the research data.
      const answer = textOf(responseMessage);
      if (!answer) return;
      await logChatEvent({
        messageId: responseMessage.id,
        tier: 'llm',
        uiLanguage,
        turn: messages.filter((m) => m.role === 'user').length,
        question,
        answer,
        model: MODEL,
        retrievedServiceIds: serviceIds,
        latencyMs: Date.now() - startedAt,
        finishReason,
      });
    },
  });
}
