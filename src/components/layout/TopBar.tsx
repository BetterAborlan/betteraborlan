'use client';

import Link from 'next/link';
import { AutoWidthTicker } from '@/components/Ticker';
import { hotlines } from '@/data/hotlines';

const HOTLINE_ITEMS = hotlines.map((h) => `${h.label}: ${h.numbers?.join(' / ') ?? 'TBD'}`);

export default function TopBar() {
  return (
    <div className="topbar">
      <div className="container topbar-inner">
        <Link
          href="/contact#hotlines"
          className="topbar-hotline-badge"
          aria-label="Emergency hotlines, cycling every 5 seconds"
        >
          <i className="bi bi-telephone-fill" aria-hidden="true"></i>
          <AutoWidthTicker items={HOTLINE_ITEMS} intervalMs={5000} />
        </Link>
        <a
          href="https://github.com/BetterAborlan/betteraborlan"
          className="topbar-join"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="bi bi-rocket-takeoff-fill" aria-hidden="true"></i> Join Us
        </a>
        <Link href="/about">About</Link>
        <a href="https://aborlanpalawan.gov.ph" target="_blank" rel="noopener noreferrer">
          Official Aborlan Website
        </a>
      </div>
    </div>
  );
}
