import { findQuickAnswer } from '@/data/chat-quick-answers';
import { buildQuickAnswerData } from '@/lib/chat-quick-data';
import { isChatLanguage, logChatEvent, rateChatEvent } from '@/lib/chat-log';
import { clientIp, createRateLimiter } from '@/lib/rate-limit';

// Opt-in chat research log for the two things /api/chat never sees:
// instant answers (answered client-side, no LLM call) and 👍/👎 ratings.
// ChatWidget only calls this when the resident has turned logging on.
//
//   { kind: 'instant', messageId, question, uiLanguage, turn }
//   { kind: 'rating', messageId, rating: 1 | -1 | null }

const MAX_QUESTION_LENGTH = 1000;
const MAX_TURN = 100;
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const isRateLimited = createRateLimiter(30, 60_000);

// Built once per instance — the same data ChatWidget gets as a prop.
const quickAnswerData = buildQuickAnswerData();

export async function POST(req: Request) {
  if (isRateLimited(clientIp(req))) {
    return new Response(null, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return new Response(null, { status: 400 });
  }

  const { kind, messageId } = body;
  if (typeof messageId !== 'string' || !UUID_RE.test(messageId)) {
    return new Response(null, { status: 400 });
  }

  if (kind === 'instant') {
    const { question, uiLanguage, turn } = body;
    if (
      typeof question !== 'string' ||
      question.length > MAX_QUESTION_LENGTH ||
      !isChatLanguage(uiLanguage) ||
      !Number.isInteger(turn) ||
      (turn as number) < 1 ||
      (turn as number) > MAX_TURN
    ) {
      return new Response(null, { status: 400 });
    }
    // The answer is recomputed here rather than trusted from the client, so
    // the log only ever holds real instant answers. (Only the randomly
    // picked opener can differ from what the resident saw.)
    const answer = findQuickAnswer(question, quickAnswerData);
    if (!answer) {
      return new Response(null, { status: 400 });
    }
    await logChatEvent({
      messageId,
      tier: 'instant',
      uiLanguage,
      turn: turn as number,
      question,
      answer,
    });
    return new Response(null, { status: 204 });
  }

  if (kind === 'rating') {
    const { rating } = body;
    if (rating !== 1 && rating !== -1 && rating !== null) {
      return new Response(null, { status: 400 });
    }
    await rateChatEvent(messageId, rating);
    return new Response(null, { status: 204 });
  }

  return new Response(null, { status: 400 });
}
