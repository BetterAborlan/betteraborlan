'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { serviceCategories } from '@/data/serviceCategories';

const mainPages = [
  { href: '/', labelKey: 'nav-home' },
  { href: '/services', labelKey: 'nav-services' },
  { href: '/government', labelKey: 'nav-government' },
  { href: '/statistics', labelKey: 'nav-statistics' },
  { href: '/contact', labelKey: 'nav-contact' },
  { href: '/about', labelKey: 'sitemap-about' },
  { href: '/search', labelKey: 'sitemap-search' },
];

const legalPages = [
  { href: '/terms', labelKey: 'footer-terms' },
  { href: '/privacy', labelKey: 'footer-privacy' },
  { href: '/accessibility', labelKey: 'footer-accessibility' },
  { href: '/faq', labelKey: 'footer-faq' },
];

export default function SitemapContent() {
  const { t } = useLanguage();

  return (
    <section className="portal-section">
      <div className="container">
        <div className="portal-section-header">
          <h2>{t('footer-sitemap')}</h2>
          <p>{t('sitemap-page-subtitle')}</p>
        </div>

        <div className="surface-card" style={{ padding: 24, marginBottom: 24 }}>
          <h3>{t('sitemap-main-pages')}</h3>
          <ul className="doc-list">
            {mainPages.map((p) => (
              <li key={p.href}>
                <Link href={p.href}>{t(p.labelKey)}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="surface-card" style={{ padding: 24, marginBottom: 24 }}>
          <h3>{t('sitemap-service-categories')}</h3>
          <ul className="doc-list">
            {serviceCategories.map((cat) => (
              <li key={cat.id}>
                <Link href={cat.href}>{t(`dropdown-${cat.id}`)}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="surface-card" style={{ padding: 24 }}>
          <h3>{t('sitemap-legal-support')}</h3>
          <ul className="doc-list">
            {legalPages.map((p) => (
              <li key={p.href}>
                <Link href={p.href}>{t(p.labelKey)}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
