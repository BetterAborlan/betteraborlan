'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';

export default function TopBar() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="topbar">
      <div className="container topbar-inner">
        <a
          href="https://github.com/BetterAborlan/betteraborlan"
          className="topbar-join"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="bi bi-rocket-takeoff-fill" aria-hidden="true"></i> Join Us
        </a>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact Us</Link>
        <Link href="/contact#hotlines">Hotlines</Link>
        <select
          className="topbar-lang"
          value={language}
          onChange={(e) => setLanguage(e.target.value as 'en' | 'fil')}
          aria-label="Select language"
        >
          <option value="en">English</option>
          <option value="fil">Filipino</option>
        </select>
      </div>
    </div>
  );
}
