'use client';

import { useCallback, useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport, type UIMessage } from 'ai';
import { useLanguage } from '@/contexts/LanguageContext';
import { findQuickAnswer } from '@/data/chat-quick-answers';
import { RATE_LIMIT_COOLDOWN_MS, RATE_LIMIT_MESSAGE } from '@/lib/chat-shared';

const EXIT_DURATION_MS = 220; // must be >= the .chat-widget-panel-out CSS animation duration
const STORAGE_KEY = 'chat-widget-messages';

// The only metadata we attach to messages -- when they were created. Set
// client-side for user turns (incl. quick-answers) and server-side (on the
// stream's 'start' event, see route.ts) for LLM replies.
interface ChatMetadata {
  createdAt?: number;
}

function formatTime(ms: number | undefined): string {
  if (!ms) return '';
  return new Date(ms).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

type ChatUIMessage = UIMessage<ChatMetadata>;

// Chat state lives in sessionStorage, not localStorage -- it survives page
// navigation and closing/reopening the widget within the tab, but is gone
// once the tab itself is closed, matching the privacy disclaimer.
function loadStoredMessages(): ChatUIMessage[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ChatUIMessage[]) : [];
  } catch {
    return [];
  }
}

function makeId(): string {
  return typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `msg-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function textOf(message: ChatUIMessage): string {
  return message.parts
    .filter((p): p is { type: 'text'; text: string } => p.type === 'text')
    .map((p) => p.text)
    .join('');
}

// Matches markdown-style links, e.g. "[Services](/services)". Assistant
// replies (LLM and quick-answers alike) may include these to point the
// resident at the relevant page; this turns them into real anchors instead
// of showing the raw brackets/parens.
const MD_LINK_RE = /\[([^\]]+)\]\((\/[^)\s]*)\)/g;

function renderMessageContent(text: string) {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  MD_LINK_RE.lastIndex = 0;
  while ((match = MD_LINK_RE.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    nodes.push(
      <a key={key++} href={match[2]} className="chat-widget-message-link">
        {match[1]}
      </a>,
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }
  return nodes;
}

export default function ChatWidget() {
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const [input, setInput] = useState('');
  // How many messages existed the last time the panel was closed. Seeded
  // from storage so restoring a past conversation on load isn't treated as
  // "new" -- only replies that arrive after that count as unread.
  const [seenCount, setSeenCount] = useState(() => loadStoredMessages().length);
  const panelRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  const { messages, sendMessage, setMessages, status, error, clearError, regenerate } =
    useChat<ChatUIMessage>({
      transport: new DefaultChatTransport({ api: '/api/chat' }),
      messages: loadStoredMessages(),
    });

  const busy = status === 'streaming' || status === 'submitted';

  // Unread = a reply arrived, or finished streaming in, after the panel was
  // last closed (messages.length grew past what had been seen at close time).
  const unread = !visible && messages.length > seenCount;

  // A 429 from the route is distinguishable by its exact body text (see
  // chat-shared.ts) -- shown as a countdown instead of a generic error with
  // a Retry button that would just get rate-limited again immediately.
  const isRateLimited = error?.message === RATE_LIMIT_MESSAGE;
  const [cooldownRemaining, setCooldownRemaining] = useState(RATE_LIMIT_COOLDOWN_MS);

  useEffect(() => {
    if (!isRateLimited) return;
    const start = Date.now();
    const id = setInterval(() => {
      const remaining = Math.max(0, RATE_LIMIT_COOLDOWN_MS - (Date.now() - start));
      setCooldownRemaining(remaining);
      if (remaining <= 0) {
        clearInterval(id);
        clearError();
      }
    }, 500);
    return () => clearInterval(id);
  }, [isRateLimited, clearError]);

  const coolingDown = isRateLimited && cooldownRemaining > 0;

  // Persist every turn to sessionStorage so a page nav or a close/reopen
  // doesn't lose the conversation -- only closing the tab clears it.
  useEffect(() => {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // storage full or unavailable -- conversation just won't survive reload
    }
  }, [messages]);

  const open = useCallback(() => {
    previousFocus.current = document.activeElement as HTMLElement;
    setMounted(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setVisible(true));
    });
  }, []);

  const close = useCallback(() => {
    setClosing(true);
    setVisible(false);
    setSeenCount(messages.length);
    if (previousFocus.current) {
      try {
        previousFocus.current.focus();
      } catch {
        // ignore
      }
    }
    setTimeout(() => {
      setMounted(false);
      setClosing(false);
    }, EXIT_DURATION_MS);
  }, [messages.length]);

  useEffect(() => {
    if (!visible) return;
    panelRef.current?.querySelector<HTMLInputElement>('.chat-widget-input')?.focus({
      preventScroll: true,
    });

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') close();
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [visible, close]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, status]);

  const submitText = useCallback(
    (text: string) => {
      if (!text || busy) return;
      clearError();

      // Common questions get answered straight from the client-bundled
      // dataset -- appended as a normal turn via setMessages, with no
      // network/LLM call at all. Anything else falls through to the
      // streaming API via sendMessage.
      const quickAnswer = findQuickAnswer(text);
      if (quickAnswer) {
        const now = Date.now();
        setMessages((curr) => [
          ...curr,
          { id: makeId(), role: 'user', parts: [{ type: 'text', text }], metadata: { createdAt: now } },
          {
            id: makeId(),
            role: 'assistant',
            parts: [{ type: 'text', text: quickAnswer }],
            metadata: { createdAt: now },
          },
        ]);
        return;
      }

      // Quick-answers never touch Groq, so they're exempt from the cooldown;
      // only the actual LLM call needs to wait one out.
      if (coolingDown) return;
      sendMessage({ text, metadata: { createdAt: Date.now() } });
    },
    [busy, coolingDown, sendMessage, setMessages, clearError],
  );

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const text = input.trim();
      if (!text || busy) return;
      setInput('');
      submitText(text);
    },
    [input, busy, submitText],
  );

  // Copy-to-clipboard feedback and 👍/👎 reactions are UI-only -- neither
  // is sent anywhere or persisted; a page refresh (or the copy flag timing
  // out) resets them.
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<Record<string, 'up' | 'down'>>({});

  const copyMessage = useCallback((id: string, text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopiedId(id);
        setTimeout(() => setCopiedId((curr) => (curr === id ? null : curr)), 1500);
      })
      .catch(() => {
        // clipboard permission denied or unavailable -- silently ignore
      });
  }, []);

  const rateMessage = useCallback((id: string, rating: 'up' | 'down') => {
    setFeedback((curr) => {
      const next = { ...curr };
      if (next[id] === rating) {
        delete next[id]; // tapping the active choice again clears it
      } else {
        next[id] = rating;
      }
      return next;
    });
  }, []);

  // Shown only before the first turn -- a real assistant-style greeting plus
  // a few tappable prompts so residents aren't staring at a blank box.
  const suggestions = [
    t('chat-widget-suggestion-hotlines'),
    t('chat-widget-suggestion-services'),
    t('chat-widget-suggestion-mayor'),
    t('chat-widget-suggestion-permit'),
  ];

  if (!mounted) {
    return (
      <button
        type="button"
        className="chat-widget-fab"
        onClick={open}
        aria-label={t('chat-widget-label')}
      >
        <i className="bi bi-robot" aria-hidden="true"></i>
        {unread && <span className="chat-widget-fab-badge" aria-hidden="true"></span>}
      </button>
    );
  }

  return (
    <>
      <button
        type="button"
        className="chat-widget-fab chat-widget-fab--hidden"
        onClick={open}
        aria-label={t('chat-widget-label')}
        tabIndex={-1}
      >
        <i className="bi bi-robot" aria-hidden="true"></i>
        {unread && <span className="chat-widget-fab-badge" aria-hidden="true"></span>}
      </button>
      <div
        ref={panelRef}
        className={`chat-widget-panel ${visible ? 'chat-widget-panel--visible' : ''} ${closing ? 'is-closing' : ''}`}
        role="dialog"
        aria-modal="false"
        aria-labelledby="chat-widget-title"
      >
        <div className="chat-widget-header">
          <span id="chat-widget-title" className="chat-widget-header-title">
            <i className="bi bi-robot" aria-hidden="true"></i>
            {t('chat-widget-title')}
            <span className="chat-widget-ai-badge">{t('chat-widget-ai-badge')}</span>
          </span>
          <button
            type="button"
            className="chat-widget-close"
            onClick={close}
            aria-label={t('chat-widget-close')}
          >
            <i className="bi bi-x-lg" aria-hidden="true"></i>
          </button>
        </div>

        <div ref={scrollRef} className="chat-widget-messages">
          {messages.length === 0 && (
            <div className="chat-widget-greeting">
              <div className="chat-widget-message chat-widget-message--assistant">
                {t('chat-widget-greeting')}
              </div>
              <div className="chat-widget-suggestions">
                {suggestions.map((label) => (
                  <button
                    key={label}
                    type="button"
                    className="chat-widget-suggestion-chip"
                    onClick={() => submitText(label)}
                    disabled={busy}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}
          {messages.map((message) => {
            const text = textOf(message);
            const isAssistant = message.role === 'assistant';
            const rating = feedback[message.id];
            return (
              <div
                key={message.id}
                className={`chat-widget-message chat-widget-message--${message.role}`}
              >
                <div>{renderMessageContent(text)}</div>
                <div className="chat-widget-message-meta">
                  <span className="chat-widget-message-time">
                    {formatTime((message.metadata as ChatMetadata | undefined)?.createdAt)}
                  </span>
                  {isAssistant && (
                    <span className="chat-widget-message-actions">
                      <button
                        type="button"
                        className="chat-widget-message-action"
                        onClick={() => copyMessage(message.id, text)}
                        aria-label={t('chat-widget-copy')}
                        title={copiedId === message.id ? t('chat-widget-copied') : t('chat-widget-copy')}
                      >
                        <i
                          className={`bi ${copiedId === message.id ? 'bi-check2' : 'bi-clipboard'}`}
                          aria-hidden="true"
                        ></i>
                      </button>
                      <button
                        type="button"
                        className={`chat-widget-message-action ${rating === 'up' ? 'is-active' : ''}`}
                        onClick={() => rateMessage(message.id, 'up')}
                        aria-label={t('chat-widget-feedback-up')}
                        aria-pressed={rating === 'up'}
                      >
                        <i className="bi bi-hand-thumbs-up" aria-hidden="true"></i>
                      </button>
                      <button
                        type="button"
                        className={`chat-widget-message-action ${rating === 'down' ? 'is-active' : ''}`}
                        onClick={() => rateMessage(message.id, 'down')}
                        aria-label={t('chat-widget-feedback-down')}
                        aria-pressed={rating === 'down'}
                      >
                        <i className="bi bi-hand-thumbs-down" aria-hidden="true"></i>
                      </button>
                    </span>
                  )}
                </div>
              </div>
            );
          })}
          {status === 'submitted' && (
            <div className="chat-widget-message chat-widget-message--assistant chat-widget-loading">
              <span className="chat-widget-typing" aria-hidden="true">
                <span></span>
                <span></span>
                <span></span>
              </span>
              <span className="chat-widget-sr-only">{t('chat-widget-loading')}</span>
            </div>
          )}
          {error && !isRateLimited && (
            <div className="chat-widget-message chat-widget-message--error">
              <p>{t('chat-widget-error')}</p>
              <button type="button" className="chat-widget-retry" onClick={() => regenerate()}>
                <i className="bi bi-arrow-clockwise" aria-hidden="true"></i> {t('chat-widget-retry')}
              </button>
            </div>
          )}
          {isRateLimited && (
            <div className="chat-widget-message chat-widget-message--error">
              <p>{t('chat-widget-rate-limited')}</p>
              <p className="chat-widget-cooldown">
                {t('chat-widget-cooldown').replace('{s}', String(Math.ceil(cooldownRemaining / 1000)))}
              </p>
            </div>
          )}
        </div>

        <form className="chat-widget-input-row" onSubmit={handleSubmit}>
          <input
            type="text"
            className="chat-widget-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('chat-widget-placeholder')}
            disabled={busy}
            maxLength={1000}
          />
          <button
            type="submit"
            className="chat-widget-send"
            disabled={busy || !input.trim()}
            aria-label={t('chat-widget-send')}
          >
            <i className="bi bi-send-fill" aria-hidden="true"></i>
          </button>
        </form>
        <p className="chat-widget-disclaimer">{t('chat-widget-disclaimer')}</p>
      </div>
    </>
  );
}
