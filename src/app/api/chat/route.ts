import { groq } from '@ai-sdk/groq';
import { convertToModelMessages, streamText, type UIMessage } from 'ai';
import { buildSystemPrompt } from '@/lib/chat-context';
import { RATE_LIMIT_MESSAGE } from '@/lib/chat-shared';

export const maxDuration = 30;

const MODEL = 'llama-3.1-8b-instant';
const MAX_MESSAGES = 12;
const MAX_MESSAGE_LENGTH = 1000;

// Simple in-memory per-IP rate limit. Resets on cold start, which is fine
// for a low-traffic civic site — this only needs to stop abusive bursts
// against the free-tier Groq quota, not act as a hardened limiter.
const RATE_LIMIT = 15;
const RATE_WINDOW_MS = 60_000;
const requestLog = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  timestamps.push(now);
  requestLog.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT;
}

function lastUserText(messages: UIMessage[]): string {
  for (let i = messages.length - 1; i >= 0; i--) {
    const msg = messages[i];
    if (msg.role !== 'user') continue;
    return msg.parts
      .filter((p): p is { type: 'text'; text: string } => p.type === 'text')
      .map((p) => p.text)
      .join(' ');
  }
  return '';
}

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (isRateLimited(ip)) {
    return new Response(RATE_LIMIT_MESSAGE, { status: 429 });
  }

  const { messages }: { messages: UIMessage[] } = await req.json();

  if (!Array.isArray(messages) || messages.length === 0) {
    return new Response('No messages provided.', { status: 400 });
  }

  const trimmedMessages = messages.slice(-MAX_MESSAGES);
  const question = lastUserText(trimmedMessages);

  if (question.length > MAX_MESSAGE_LENGTH) {
    return new Response('Message is too long.', { status: 400 });
  }

  const result = streamText({
    model: groq(MODEL),
    system: buildSystemPrompt(question),
    messages: await convertToModelMessages(trimmedMessages),
  });

  return result.toUIMessageStreamResponse({
    // Stamps the assistant reply with a server-side timestamp (sent on the
    // 'start' event) so the client can show "when" without trusting local
    // clocks alone for one side of the conversation.
    messageMetadata: ({ part }) => (part.type === 'start' ? { createdAt: Date.now() } : undefined),
  });
}
