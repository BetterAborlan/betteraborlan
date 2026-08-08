'use client';

import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport, type UIMessage } from 'ai';
import { useLanguage } from '@/contexts/LanguageContext';
import { findQuickAnswer } from '@/data/chat-quick-answers';

const EXIT_DURATION_MS = 220; // must be >= the .chat-widget-panel-out CSS animation duration

function makeId(): string {
  return typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `msg-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

function textOf(message: UIMessage): string {
  return message.parts
    .filter((p): p is { type: 'text'; text: string } => p.type === 'text')
    .map((p) => p.text)
    .join('');
}

export default function ChatWidget() {
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const [input, setInput] = useState('');
  const panelRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  const { messages, sendMessage, setMessages, status, error, clearError } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  });

  const busy = status === 'streaming' || status === 'submitted';

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
  }, []);

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

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      const text = input.trim();
      if (!text || busy) return;
      setInput('');
      clearError();

      // Common questions get answered straight from the client-bundled
      // dataset -- appended as a normal turn via setMessages, with no
      // network/LLM call at all. Anything else falls through to the
      // streaming API via sendMessage.
      const quickAnswer = findQuickAnswer(text);
      if (quickAnswer) {
        setMessages((curr) => [
          ...curr,
          { id: makeId(), role: 'user', parts: [{ type: 'text', text }] },
          { id: makeId(), role: 'assistant', parts: [{ type: 'text', text: quickAnswer }] },
        ]);
        return;
      }

      sendMessage({ text });
    },
    [input, busy, sendMessage, setMessages, clearError],
  );

  if (!mounted) {
    return (
      <button
        type="button"
        className="chat-widget-fab"
        onClick={open}
        aria-label={t('chat-widget-label')}
      >
        <i className="bi bi-chat-dots-fill" aria-hidden="true"></i>
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
        <i className="bi bi-chat-dots-fill" aria-hidden="true"></i>
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
            <i className="bi bi-chat-dots-fill" aria-hidden="true"></i>
            {t('chat-widget-title')}
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
            <p className="chat-widget-empty-state">{t('chat-widget-empty-state')}</p>
          )}
          {messages.map((message) => (
            <div
              key={message.id}
              className={`chat-widget-message chat-widget-message--${message.role}`}
            >
              {textOf(message)}
            </div>
          ))}
          {status === 'submitted' && (
            <div className="chat-widget-message chat-widget-message--assistant chat-widget-loading">
              {t('chat-widget-loading')}
            </div>
          )}
          {error && (
            <div className="chat-widget-message chat-widget-message--error">
              {t('chat-widget-error')}
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
