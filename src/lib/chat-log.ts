import { neon, type NeonQueryFunction } from '@neondatabase/serverless';

// Server-only writes to the opt-in chat research log (db/schema.sql). Every
// function here is best-effort: a logging failure is reported to the server
// console and swallowed, never surfaced to the resident or allowed to break
// the chat itself.

export type ChatTier = 'instant' | 'llm';
export type ChatLanguage = 'en' | 'fil';

export interface ChatEvent {
  messageId: string;
  tier: ChatTier;
  uiLanguage: ChatLanguage;
  turn: number;
  question: string;
  answer: string;
  model?: string;
  retrievedServiceIds?: string[];
  latencyMs?: number;
  finishReason?: string;
}

// Lazily created so `next build` (and local dev without a database) never
// needs DATABASE_URL; logging is simply skipped when it isn't configured.
let sql: NeonQueryFunction<false, false> | null = null;

function getSql(): NeonQueryFunction<false, false> | null {
  if (!process.env.DATABASE_URL) return null;
  if (!sql) sql = neon(process.env.DATABASE_URL);
  return sql;
}

export function isChatLanguage(value: unknown): value is ChatLanguage {
  return value === 'en' || value === 'fil';
}

export async function logChatEvent(event: ChatEvent): Promise<void> {
  const db = getSql();
  if (!db) return;
  try {
    await db`
      INSERT INTO chat_events (
        message_id, environment, tier, ui_language, turn, question, answer, model,
        retrieved_service_ids, latency_ms, finish_reason
      ) VALUES (
        ${event.messageId}, ${process.env.VERCEL_ENV ?? 'development'}, ${event.tier},
        ${event.uiLanguage}, ${event.turn},
        ${event.question}, ${event.answer}, ${event.model ?? null},
        ${event.retrievedServiceIds ?? null}, ${event.latencyMs ?? null},
        ${event.finishReason ?? null}
      )
      ON CONFLICT (message_id) DO NOTHING`;
  } catch (err) {
    console.error('chat log insert failed:', err);
  }
}

// rating: 1 = 👍, -1 = 👎, null = rating cleared. Only touches a row that
// already exists, so rating a reply given before opting in is a no-op.
export async function rateChatEvent(messageId: string, rating: 1 | -1 | null): Promise<void> {
  const db = getSql();
  if (!db) return;
  try {
    await db`
      UPDATE chat_events
      SET rating = ${rating}, rated_at = ${rating === null ? null : new Date()}
      WHERE message_id = ${messageId}`;
  } catch (err) {
    console.error('chat log rating failed:', err);
  }
}
