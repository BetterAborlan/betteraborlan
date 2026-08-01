import Link from 'next/link';

export default function TopBar() {
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
        <a href="https://aborlanpalawan.gov.ph" target="_blank" rel="noopener noreferrer">
          Official Aborlan Website
        </a>
        <Link href="/contact#hotlines">Hotlines</Link>
      </div>
    </div>
  );
}
