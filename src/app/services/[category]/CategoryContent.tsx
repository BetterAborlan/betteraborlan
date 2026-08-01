'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import type { ServiceCategory } from '@/data/serviceCategories';

interface Service {
  id: string;
  title: string;
  description: string;
  fee: string | null;
  processingTime: string | null;
  office: string | null;
}

export default function CategoryContent({
  cat,
  services,
}: {
  cat: ServiceCategory;
  services: Service[];
}) {
  const { t } = useLanguage();
  const catTitle = t(`dropdown-${cat.id}`);

  return (
    <section className="portal-section">
      <div className="container">
        <div className="portal-section-header">
          <span className="service-cat-icon" style={{ margin: '0 auto 16px' }}>
            <i className={`bi ${cat.icon}`} aria-hidden="true"></i>
          </span>
          <h2>{catTitle}</h2>
        </div>
        {services.length === 0 ? (
          <div className="surface-card service-cat-empty">
            <span className="service-cat-icon">
              <i className={`bi ${cat.icon}`} aria-hidden="true"></i>
            </span>
            <h3>{t('services-empty-title')}</h3>
            <p>
              {t('services-empty-desc-1')} {catTitle.toLowerCase()} {t('services-empty-desc-2')}{' '}
              <Link href="/contact">{t('services-empty-cta')}</Link> {t('services-empty-desc-3')}
            </p>
          </div>
        ) : (
          <div className="service-cat-grid">
            {services.map((svc) => (
              <div key={svc.id} className="surface-card surface-card--hoverable service-cat-card">
                <h3>{svc.title}</h3>
                <p>{svc.description}</p>
                <ul>
                  <li>
                    {t('services-fee')}: {svc.fee ?? t('gov-pending-verification')}
                  </li>
                  <li>
                    {t('services-processing-time')}:{' '}
                    {svc.processingTime ?? t('gov-pending-verification')}
                  </li>
                  <li>
                    {t('services-office')}: {svc.office ?? t('gov-pending-verification')}
                  </li>
                </ul>
                <Link href={`/service-details/${svc.id}`}>
                  {t('services-view-details')} <i className="bi bi-arrow-right" aria-hidden="true"></i>
                </Link>
              </div>
            ))}
          </div>
        )}
        <div className="portal-section-cta">
          <Link
            href="/services"
            className="inline-flex items-center justify-center rounded-md bg-[var(--color-kapwa-bg-brand-default)] px-4 py-2 h-10 text-base font-medium text-[var(--color-kapwa-text-inverse)] shadow-xs transition-colors hover:bg-[var(--color-kapwa-bg-brand-hover)]"
          >
            {t('services-back-to-directory')}
          </Link>
        </div>
      </div>
    </section>
  );
}
