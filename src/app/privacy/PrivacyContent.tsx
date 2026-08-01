'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function PrivacyContent() {
  const { t } = useLanguage();

  return (
    <section className="portal-section">
      <div className="container">
        <div className="portal-section-header">
          <h2>{t('footer-privacy')}</h2>
        </div>

        <div className="surface-card" style={{ padding: 24 }}>
          <h3>{t('privacy-collect-heading')}</h3>
          <p>{t('privacy-collect-body')}</p>

          <h3>{t('privacy-third-party-heading')}</h3>
          <p>{t('privacy-third-party-body')}</p>

          <h3>{t('privacy-hosting-heading')}</h3>
          <p>{t('privacy-hosting-body')}</p>

          <h3>{t('privacy-questions-heading')}</h3>
          <p>
            {t('privacy-questions-body-1')}{' '}
            <a
              href="https://github.com/BetterAborlan/betteraborlan"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('about-github-repo')}
            </a>{' '}
            {t('privacy-questions-body-2')}
          </p>
        </div>
      </div>
    </section>
  );
}
