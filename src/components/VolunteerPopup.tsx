'use client';

import { useEffect, useRef, useState, useCallback } from 'react';

const STORAGE_KEY = 'ba-vol-popup-v1';
const SHOW_DELAY_MS = 800;
const EXIT_DURATION_MS = 340; // must be >= the .vol-popup-out CSS animation duration

const roles = [
  { icon: 'bi-code-slash', label: 'Software Dev' },
  { icon: 'bi-layers', label: 'UI/UX Design' },
  { icon: 'bi-palette', label: 'Graphic Design' },
  { icon: 'bi-pencil-square', label: 'Content Creation' },
  { icon: 'bi-megaphone', label: 'Digital Marketing' },
  { icon: 'bi-translate', label: 'Cuyunon Translator' },
];

export default function VolunteerPopup() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const dismissedRef = useRef(false);
  const scrollYRef = useRef(0);

  const dismiss = useCallback(() => {
    if (dismissedRef.current) return;
    dismissedRef.current = true;

    try {
      localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      // ignore
    }

    setClosing(true);
    setVisible(false);

    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
    if (previousFocus.current) {
      try {
        previousFocus.current.focus();
      } catch {
        // ignore
      }
    }

    setTimeout(() => setMounted(false), EXIT_DURATION_MS);
  }, []);

  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = !!localStorage.getItem(STORAGE_KEY);
    } catch {
      // ignore
    }
    if (dismissed) return;

    const reducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const delay = reducedMotion ? 0 : SHOW_DELAY_MS;

    const showTimer = setTimeout(() => {
      previousFocus.current = document.activeElement as HTMLElement;
      setMounted(true);
      requestAnimationFrame(() => {
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        scrollYRef.current = window.scrollY;
        if (scrollbarWidth > 0) {
          document.body.style.paddingRight = `${scrollbarWidth}px`;
        }
        document.body.style.overflow = 'hidden';

        requestAnimationFrame(() => {
          setVisible(true);
        });
      });
    }, delay);

    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    if (!visible) return;

    modalRef.current?.querySelector<HTMLButtonElement>('.vol-popup-close')?.focus({
      preventScroll: true,
    });

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        dismiss();
        return;
      }
      if (e.key === 'Tab' && modalRef.current) {
        const focusable = Array.from(
          modalRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [visible, dismiss]);

  if (!mounted) return null;

  return (
    <div
      ref={overlayRef}
      className={`vol-popup-overlay ${visible ? 'vol-popup-overlay--visible' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="vol-popup-title"
      onClick={(e) => {
        if (e.target === overlayRef.current) dismiss();
      }}
    >
      <div ref={modalRef} className={`vol-popup ${closing ? 'is-closing' : ''}`}>
        <button
          className="vol-popup-close"
          type="button"
          aria-label="Close volunteer popup"
          onClick={dismiss}
        >
          <i className="bi bi-x-lg" aria-hidden="true"></i>
        </button>
        <div className="vol-popup-header">
          <div className="vol-popup-header-bg" aria-hidden="true"></div>
          <img
            src="/assets/images/logo/better-aborlan-logo-white.svg"
            alt="BetterAborlan.org"
            className="vol-popup-logo"
            width={78}
            height={84}
            draggable={false}
          />
          <h2 id="vol-popup-title" className="vol-popup-title">
            Be Part of Something Greater
          </h2>
          <p className="vol-popup-header-sub">
            Aborlan, Palawan deserves a transparent digital government. Help us build it.
          </p>
        </div>
        <div className="vol-popup-body">
          <p className="vol-popup-lead">
            We are looking for passionate <strong>people of Aborlan</strong> who want to serve
            their community through their craft.
          </p>
          <div className="vol-popup-roles" role="list">
            {roles.map((role) => (
              <div className="vol-popup-role" role="listitem" key={role.label}>
                <i className={`bi ${role.icon}`} aria-hidden="true"></i>
                <span>{role.label}</span>
              </div>
            ))}
          </div>
          <div className="vol-popup-actions">
            <a
              href="mailto:info@betteraborlan.org"
              className="vol-popup-cta"
              rel="noopener"
              onClick={() => setTimeout(dismiss, 150)}
            >
              <i className="bi bi-envelope-heart-fill" aria-hidden="true"></i>
              I Want to Volunteer
            </a>
            <button className="vol-popup-skip" type="button" onClick={dismiss}>
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
