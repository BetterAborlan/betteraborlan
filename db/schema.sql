-- Opt-in chat research log. One row per assistant reply, written only when
-- the resident has turned on "share my questions" in the chat widget.
-- Deliberately holds no IP address, user agent, or any persistent visitor
-- or conversation identifier. See the privacy page (privacy-chat-* keys).
--
-- Idempotent: safe to re-run via `npm run db:setup`.
CREATE TABLE IF NOT EXISTS chat_events (
  id                    bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  -- Random id of the assistant message; lets a later 👍/👎 find its row.
  message_id            text NOT NULL UNIQUE,
  created_at            timestamptz NOT NULL DEFAULT now(),
  -- VERCEL_ENV of the deployment that wrote the row, so preview/dev test
  -- chats can be excluded from analysis (one database serves all three).
  environment           text NOT NULL,
  -- 'instant' = client-side quick answer, 'llm' = streamed /api/chat reply.
  tier                  text NOT NULL CHECK (tier IN ('instant', 'llm')),
  ui_language           text NOT NULL CHECK (ui_language IN ('en', 'fil')),
  -- 1 for the first question in a conversation, 2 for the follow-up, etc.
  turn                  smallint NOT NULL CHECK (turn >= 1),
  question              text NOT NULL,
  answer                text NOT NULL,
  model                 text,
  -- Services keyword retrieval put in the prompt (llm tier only).
  retrieved_service_ids text[],
  latency_ms            integer,
  finish_reason         text,
  rating                smallint CHECK (rating IN (-1, 1)),
  rated_at              timestamptz
);

CREATE INDEX IF NOT EXISTS chat_events_created_at_idx ON chat_events (created_at);
