'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { serviceCategories } from '@/data/serviceCategories';

export default function ServicesContent() {
  const { t } = useLanguage();

  return (
    <section className="portal-section">
      <div className="container">
        <div className="portal-section-header">
          <h2>{t('services-page-title')}</h2>
          <p>{t('services-page-subtitle')}</p>
        </div>
        <div className="service-cat-grid">
          {serviceCategories.map((cat) => {
            const catTitle = t(`dropdown-${cat.id}`);
            return (
              <div key={cat.id} className="surface-card surface-card--hoverable service-cat-card">
                <span className="service-cat-icon">
                  <i className={`bi ${cat.icon}`} aria-hidden="true"></i>
                </span>
                <h3>{catTitle}</h3>
                <ul>
                  {cat.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <Link href={cat.href}>
                  {t('services-view-all')} {catTitle} <i className="bi bi-arrow-right" aria-hidden="true"></i>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
