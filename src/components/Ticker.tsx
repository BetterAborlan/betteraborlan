'use client';

import { useEffect, useRef, useState } from 'react';

// Must match .info-strip-ticker-item's height in portal.css.
export const TICKER_ITEM_HEIGHT_EM = 1.25;
export const TICKER_TRANSITION_MS = 500;

// Slides from the old text up to the new one whenever `value` changes.
export function TickerText({ value }: { value: string }) {
  const [items, setItems] = useState([value]);
  const [offset, setOffset] = useState(0);
  const [transition, setTransition] = useState(true);
  const prevValue = useRef(value);

  useEffect(() => {
    if (value === prevValue.current) return;
    prevValue.current = value;
    setItems((curr) => [curr[curr.length - 1], value]);
    setTransition(true);
    setOffset(1);
  }, [value]);

  useEffect(() => {
    if (offset !== 1) return;
    const snapBack = setTimeout(() => {
      setTransition(false);
      setItems((curr) => [curr[curr.length - 1]]);
      setOffset(0);
    }, TICKER_TRANSITION_MS);
    return () => clearTimeout(snapBack);
  }, [offset]);

  return (
    <span className="info-strip-ticker">
      <span
        className="info-strip-ticker-track"
        style={{
          transform: `translateY(-${offset * TICKER_ITEM_HEIGHT_EM}em)`,
          transition: transition ? 'transform 0.5s ease' : 'none',
        }}
        aria-hidden="true"
      >
        {items.map((text, i) => (
          <span className="info-strip-ticker-item" key={i}>
            {text}
          </span>
        ))}
      </span>
    </span>
  );
}

// Cycles through a fixed list of strings on a timer, sliding up to each
// next item. Loops seamlessly by sliding onto an appended duplicate of the
// first item, then snapping (transition-less) back to real index 0.
export function CyclingTicker({
  items,
  intervalMs = 3000,
  itemsPerView = 1,
}: {
  items: string[];
  intervalMs?: number;
  itemsPerView?: number;
}) {
  // Append the first `itemsPerView` items again so the track can slide
  // straight past the real end, then snap (transition-less) back to 0 —
  // makes the loop seamless regardless of how many items show at once.
  const tickerItems = [...items, ...items.slice(0, itemsPerView)];
  const [index, setIndex] = useState(0);
  const [transition, setTransition] = useState(true);

  useEffect(() => {
    const tick = setInterval(() => {
      setTransition(true);
      setIndex((i) => i + itemsPerView);
    }, intervalMs);
    return () => clearInterval(tick);
  }, [intervalMs, itemsPerView]);

  useEffect(() => {
    if (index !== items.length) return;
    const snapBack = setTimeout(() => {
      setTransition(false);
      setIndex(0);
    }, TICKER_TRANSITION_MS);
    return () => clearTimeout(snapBack);
  }, [index, items.length]);

  return (
    <span
      className="info-strip-ticker"
      style={{ height: `${itemsPerView * TICKER_ITEM_HEIGHT_EM}em` }}
    >
      <span
        className="info-strip-ticker-track"
        style={{
          transform: `translateY(-${index * TICKER_ITEM_HEIGHT_EM}em)`,
          transition: transition ? 'transform 0.5s ease' : 'none',
        }}
        aria-hidden="true"
      >
        {tickerItems.map((text, i) => (
          <span className="info-strip-ticker-item" key={i}>
            {text}
          </span>
        ))}
      </span>
    </span>
  );
}

// Like CyclingTicker (one item at a time, same vertical slide), but the
// wrapper also measures each item's natural text width and animates its
// own width to match — so a pill/badge around it visibly grows or shrinks
// as it slides to a longer or shorter line.
export function AutoWidthTicker({
  items,
  intervalMs = 3000,
}: {
  items: string[];
  intervalMs?: number;
}) {
  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState<number | null>(null);
  const measureRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const tick = setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, intervalMs);
    return () => clearInterval(tick);
  }, [intervalMs, items.length]);

  useEffect(() => {
    if (measureRef.current) setWidth(measureRef.current.offsetWidth);
  }, [index, items]);

  return (
    <span
      style={{
        display: 'inline-block',
        overflow: 'hidden',
        verticalAlign: 'middle',
        width: width != null ? `${width}px` : 'auto',
        transition: 'width 0.4s ease',
      }}
    >
      <TickerText value={items[index]} />
      <span
        ref={measureRef}
        aria-hidden="true"
        style={{ position: 'absolute', visibility: 'hidden', whiteSpace: 'nowrap' }}
      >
        {items[index]}
      </span>
    </span>
  );
}
