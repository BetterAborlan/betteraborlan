'use client';

import { useLanguage } from '@/contexts/LanguageContext';

const faqKeys = [
  { q: 'faq-q1', a: 'faq-a1' },
  { q: 'faq-q2', a: 'faq-a2' },
  { q: 'faq-q3', a: 'faq-a3' },
  { q: 'faq-q4', a: 'faq-a4' },
  { q: 'faq-q5', a: 'faq-a5' },
];

export default function FaqContent() {
  const { t } = useLanguage();

  return (
    <section className="portal-section">
      <div className="container">
        <div className="portal-section-header">
          <h2>{t('faq-page-title')}</h2>
        </div>

        <div className="doc-list">
          {faqKeys.map((item) => (
            <div key={item.q} className="surface-card" style={{ padding: 24 }}>
              <h3 style={{ marginBottom: 8 }}>{t(item.q)}</h3>
              <p>{t(item.a)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
