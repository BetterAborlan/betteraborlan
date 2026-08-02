'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function TermsContent() {
  const { t } = useLanguage();

  return (
    <section className="portal-section">
      <div className="container">
        <div className="portal-section-header">
          <h2>{t('footer-terms')}</h2>
        </div>

        <div className="surface-card" style={{ padding: 24 }}>
          <h3>{t('terms-independent-heading')}</h3>
          <p>{t('terms-independent-body')}</p>

          <h3>{t('terms-no-warranty-heading')}</h3>
          <p>{t('terms-no-warranty-body')}</p>

          <h3>{t('terms-open-source-heading')}</h3>
          <p>
            {t('terms-open-source-body-1')}{' '}
            <a
              href="https://github.com/BetterAborlan/betteraborlan"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('about-github-repo')}
            </a>{' '}
            {t('terms-open-source-body-2')}
          </p>
        </div>
      </div>
    </section>
  );
}
