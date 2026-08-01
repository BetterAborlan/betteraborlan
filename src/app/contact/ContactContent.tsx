'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { hotlines } from '@/data/hotlines';

export default function ContactContent() {
  const { t } = useLanguage();

  return (
    <section className="portal-section">
      <div className="container">
        <div className="portal-section-header">
          <h2>{t('contact-page-title')}</h2>
          <p>{t('contact-page-subtitle')}</p>
        </div>

        <div className="surface-card" style={{ padding: 24, marginBottom: 32 }}>
          <h3>{t('contact-municipal-hall')}</h3>
          <p>
            <i className="bi bi-geo-alt-fill" aria-hidden="true"></i> Puerto Princesa South Road,
            Poblacion, Barangay Ramon Magsaysay, Aborlan, Palawan, 5302
          </p>
          <p className="pending">{t('contact-office-hours-pending')}</p>
        </div>

        <div id="hotlines">
          <h3 style={{ marginBottom: 16 }}>
            <i className="bi bi-telephone-fill" aria-hidden="true"></i> {t('contact-hotlines-heading')}{' '}
            <span className="data-as-of">as of April 2023</span>
          </h3>
          <ul className="doc-list">
            {hotlines.map((h) => (
              <li key={h.label} className="surface-card">
                <strong>{h.label}</strong>
                <div>
                  {h.numbers ? (
                    h.numbers.map((n, i) => (
                      <span key={n}>
                        {i > 0 && ' / '}
                        <a href={`tel:${n.replace(/-/g, '')}`}>{n}</a>
                      </span>
                    ))
                  ) : (
                    <span className="pending">{t('contact-hotline-tbd')}</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
