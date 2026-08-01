'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import officials from '@data/officials.json';
import barangaysData from '@data/barangays.json';

function OfficialCard({ name, title }: { name: string | null; title: string }) {
  const { t } = useLanguage();
  return (
    <div className="surface-card gov-branch-card official-card">
      <h3>{name ?? t('gov-pending-verification')}</h3>
      <p>{title}</p>
    </div>
  );
}

export default function GovernmentContent() {
  const { t } = useLanguage();

  return (
    <>
      <section className="portal-section">
        <div className="container">
          <div className="portal-section-header">
            <h2>{t('gov-page-title')}</h2>
            <p>{t('gov-page-subtitle')}</p>
          </div>
          <div className="gov-branch-grid">
            <div className="surface-card gov-branch-card">
              <span className="gov-branch-icon">
                <i className="bi bi-star-fill" aria-hidden="true"></i>
              </span>
              <h3>{t('gov-branch-executive')}</h3>
              <p>{t('gov-branch-executive-desc')}</p>
            </div>
            <div className="surface-card gov-branch-card">
              <span className="gov-branch-icon">
                <i className="bi bi-bank2" aria-hidden="true"></i>
              </span>
              <h3>{t('gov-branch-legislative')}</h3>
              <p>{t('gov-branch-legislative-desc')}</p>
            </div>
            <div className="surface-card gov-branch-card">
              <span className="gov-branch-icon">
                <i className="bi bi-signpost-split-fill" aria-hidden="true"></i>
              </span>
              <h3>{t('gov-branch-barangays')}</h3>
              <p>
                {barangaysData.barangays.length > 0
                  ? `${barangaysData.barangays.length} ${t('gov-barangays-word')}`
                  : t('gov-pending-verification')}{' '}
                — {t('gov-branch-barangays-desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="portal-section portal-section--alt">
        <div className="container">
          <div className="portal-section-header">
            <h2>{t('gov-elected-officials')}</h2>
            <p>{t('gov-elected-officials-subtitle')}</p>
          </div>
          <div className="gov-branch-grid">
            <OfficialCard name={officials.mayor.name} title={t('title-mayor')} />
            <OfficialCard name={officials.vice_mayor.name} title={t('title-vice-mayor')} />
            <OfficialCard name={officials.representative.name} title={t('title-representative')} />
            <OfficialCard
              name={officials.sk_federation_president.name}
              title={t('title-sk-president')}
            />
            <OfficialCard name={officials.ipmr.name} title={t('title-ipmr')} />
          </div>
          {officials.councilors.length === 0 ? (
            <p style={{ textAlign: 'center', marginTop: 24 }}>{t('gov-councilors-pending')}</p>
          ) : (
            <div style={{ marginTop: 24 }}>
              <h3 style={{ textAlign: 'center', marginBottom: 16 }}>{t('gov-sb-members')}</h3>
              <div className="member-grid">
                {officials.councilors.map((c: { name: string; title: string }) => (
                  <div key={c.name} className="surface-card surface-card--hoverable member-card">
                    <span className="member-card-icon">
                      <i className="bi bi-person-badge-fill" aria-hidden="true"></i>
                    </span>
                    <span className="member-card-name">
                      {c.name}
                      <span className="member-card-title">{c.title}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
          <p className="pending" style={{ textAlign: 'center', marginTop: 24 }}>
            {t('gov-officials-footnote')}
          </p>
        </div>
      </section>

      <section className="portal-section">
        <div className="container">
          <div className="portal-section-header">
            <h2>{t('gov-branch-barangays')}</h2>
            <p>{t('gov-barangays-page-subtitle')}</p>
          </div>
          {barangaysData.barangays.length === 0 ? (
            <p style={{ textAlign: 'center' }}>{t('gov-barangays-directory-pending')}</p>
          ) : (
            <div className="barangay-grid">
              {barangaysData.barangays.map((b: { name: string; population_2024: number }) => (
                <div key={b.name} className="surface-card surface-card--hoverable barangay-chip">
                  <i className="bi bi-geo-alt-fill" aria-hidden="true"></i>
                  <span>
                    {b.name}
                    <span className="barangay-chip-pop">
                      {b.population_2024.toLocaleString()} {t('gov-residents-word')}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
