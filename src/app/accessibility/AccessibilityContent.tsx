'use client';

import { useLanguage } from '@/contexts/LanguageContext';

export default function AccessibilityContent() {
  const { t } = useLanguage();

  return (
    <section className="portal-section">
      <div className="container">
        <div className="portal-section-header">
          <h2>{t('footer-accessibility')}</h2>
        </div>

        <div className="surface-card" style={{ padding: 24 }}>
          <p>
            {t('accessibility-body-1')} <code>@bettergov/kapwa</code> {t('accessibility-body-2')}
          </p>
          <p>
            {t('accessibility-body-3')}{' '}
            <a
              href="https://github.com/BetterAborlan/betteraborlan/issues"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('accessibility-github-issues')}
            </a>{' '}
            {t('accessibility-or')}{' '}
            <a href="https://discord.gg/Fsgdh7cJvw" target="_blank" rel="noopener noreferrer">
              Discord
            </a>{' '}
            {t('accessibility-body-4')}
          </p>
        </div>
      </div>
    </section>
  );
}
