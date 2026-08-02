'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function AboutContent() {
  const { t } = useLanguage();

  return (
    <section className="portal-section">
      <div className="container">
        <div className="portal-section-header">
          <h2>{t('about-page-title')}</h2>
          <p>{t('about-page-subtitle')}</p>
        </div>

        <div className="surface-card" style={{ padding: 24, marginBottom: 24 }}>
          <h3>{t('about-why-heading')}</h3>
          <p>{t('about-why-body')}</p>
        </div>

        <div className="surface-card" style={{ padding: 24, marginBottom: 24 }}>
          <h3>{t('about-bettergov-heading')}</h3>
          <p>
            {t('about-bettergov-body-1')} <code>@bettergov/kapwa</code>
            {t('about-bettergov-body-2')}{' '}
            <a href="https://bettergov.ph" target="_blank" rel="noopener noreferrer">
              BetterGov.ph
            </a>
            , {t('about-bettergov-body-3')}
          </p>
        </div>

        <div className="surface-card" style={{ padding: 24 }}>
          <h3>{t('about-data-policy-heading')}</h3>
          <p>
            {t('about-data-policy-body-1')} &quot;{t('gov-pending-verification').toLowerCase()}
            &quot; {t('about-data-policy-body-2')}{' '}
            <a
              href="https://github.com/BetterAborlan/betteraborlan"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('about-github-repo')}
            </a>{' '}
            {t('about-data-policy-body-3')}
          </p>
        </div>
      </div>
    </section>
  );
}
