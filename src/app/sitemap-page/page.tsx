import type { Metadata } from 'next';
import Link from 'next/link';
import { serviceCategories } from '@/data/serviceCategories';

export const metadata: Metadata = {
  title: 'Sitemap',
  description: 'Full page listing for BetterAborlan.org.',
};

const mainPages = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/government', label: 'Government' },
  { href: '/legislative', label: 'Legislative' },
  { href: '/legislative/ordinance-framework', label: 'Ordinance Framework' },
  { href: '/legislative/resolution-framework', label: 'Resolution Framework' },
  { href: '/statistics', label: 'Statistics' },
  { href: '/contact', label: 'Contact' },
  { href: '/about', label: 'About' },
  { href: '/search', label: 'Search' },
];

const legalPages = [
  { href: '/terms', label: 'Terms of Use' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/accessibility', label: 'Accessibility' },
  { href: '/faq', label: 'FAQ' },
];

export default function SitemapPage() {
  return (
    <section className="portal-section">
      <div className="container">
        <div className="portal-section-header">
          <h2>Sitemap</h2>
          <p>Every page on BetterAborlan.org, in one place.</p>
        </div>

        <div className="surface-card" style={{ padding: 24, marginBottom: 24 }}>
          <h3>Main Pages</h3>
          <ul className="doc-list">
            {mainPages.map((p) => (
              <li key={p.href}>
                <Link href={p.href}>{p.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="surface-card" style={{ padding: 24, marginBottom: 24 }}>
          <h3>Service Categories</h3>
          <ul className="doc-list">
            {serviceCategories.map((cat) => (
              <li key={cat.id}>
                <Link href={cat.href}>{cat.title}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="surface-card" style={{ padding: 24 }}>
          <h3>Legal & Support</h3>
          <ul className="doc-list">
            {legalPages.map((p) => (
              <li key={p.href}>
                <Link href={p.href}>{p.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
