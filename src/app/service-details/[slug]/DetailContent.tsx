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

export default function DetailContent({
  svc,
  cat,
}: {
  svc: Service;
  cat: ServiceCategory | undefined;
}) {
  const { t } = useLanguage();
  const catTitle = cat ? t(`dropdown-${cat.id}`) : null;
  // Office is the real signal for "not sourced yet" — fee can legitimately be
  // null (meaning free), so only office being null means the Charter didn't
  // cover this service.
  const isUnsourced = svc.office == null;

  return (
    <section className="portal-section">
      <div className="container" style={{ maxWidth: 720 }}>
        <div className="portal-section-header" style={{ textAlign: 'left', margin: '0 0 32px' }}>
          {catTitle && (
            <p style={{ margin: '0 0 8px', fontWeight: 600, color: 'var(--color-kapwa-brand-700)' }}>
              {catTitle}
            </p>
          )}
          <h1 style={{ fontSize: '1.875rem', fontWeight: 800, margin: '0 0 12px' }}>{svc.title}</h1>
          <p>{svc.description}</p>
        </div>

        <div className="surface-card" style={{ padding: 24 }}>
          <h3 style={{ marginTop: 0 }}>{t('service-details-heading')}</h3>
          <table className="realtime-currency-table" style={{ width: '100%' }}>
            <tbody>
              <tr>
                <td>{t('services-fee')}</td>
                <td>{svc.fee ?? t('gov-pending-verification')}</td>
              </tr>
              <tr>
                <td>{t('services-processing-time')}</td>
                <td>{svc.processingTime ?? t('gov-pending-verification')}</td>
              </tr>
              <tr>
                <td>{t('service-details-responsible-office')}</td>
                <td>{svc.office ?? t('gov-pending-verification')}</td>
              </tr>
            </tbody>
          </table>
          {isUnsourced && (
            <p style={{ fontSize: '0.875rem', color: 'var(--color-kapwa-text-support)' }}>
              {t('service-details-unsourced-1')} <Link href="/contact">{t('nav-contact')}</Link>{' '}
              {t('service-details-unsourced-2')}
            </p>
          )}
        </div>

        <div className="portal-section-cta" style={{ textAlign: 'left', marginTop: 24 }}>
          {cat && catTitle && (
            <Link
              href={cat.href}
              className="inline-flex items-center justify-center rounded-md bg-[var(--color-kapwa-bg-brand-default)] px-4 py-2 h-10 text-base font-medium text-[var(--color-kapwa-text-inverse)] shadow-xs transition-colors hover:bg-[var(--color-kapwa-bg-brand-hover)]"
            >
              {t('service-details-back-to')} {catTitle}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
