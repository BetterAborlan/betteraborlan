'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import StatCard from '@/components/StatCard';
import demographics from '@data/demographics.json';
import barangaysData from '@data/barangays.json';

export default function StatisticsContent() {
  const { t } = useLanguage();

  return (
    <section className="portal-section">
      <div className="container">
        <div className="portal-section-header">
          <h2>{t('stats-page-title')}</h2>
          <p>{t('stats-page-subtitle')}</p>
        </div>
        <div className="home-stats-v2-grid">
          <StatCard
            icon="bi-people-fill"
            value={demographics.population?.toLocaleString() ?? '—'}
            label={t('stats-population-label')}
            source={demographics.population_source ?? t('gov-pending-verification')}
          />
          <StatCard
            icon="bi-house-door-fill"
            value={demographics.households_2024?.toLocaleString() ?? '—'}
            label={t('stats-households-label')}
            source={t('stats-source-psa-2024')}
          />
          <StatCard
            icon="bi-geo-alt-fill"
            value={demographics.barangay_count?.toString() ?? '—'}
            label={t('stats-barangays-label')}
            source={t('gov-branch-barangays-desc')}
          />
          <StatCard
            icon="bi-award-fill"
            value={demographics.income_classification ?? '—'}
            label={t('stats-income-label')}
            source={t('stats-source-psa-2020')}
          />
          <StatCard
            icon="bi-rulers"
            value={demographics.land_area_km2 ? `${demographics.land_area_km2} km²` : '—'}
            label={t('stats-land-area-label')}
            source={t('stats-source-psa-2020')}
          />
          <StatCard
            icon="bi-person-vcard-fill"
            value={demographics.registered_voters_2025?.toLocaleString() ?? '—'}
            label={t('stats-registered-voters-label')}
            source={t('stats-source-comelec-2025')}
          />
        </div>
        <p style={{ marginTop: 32 }}>
          {t('stats-province-label')}: {demographics.province} · {t('stats-region-label')}:{' '}
          {demographics.region}
        </p>
      </div>

      <div className="container" style={{ marginTop: 56 }}>
        <div className="portal-section-header">
          <h2>
            {t('stats-population-by-barangay')}{' '}
            <span className="data-as-of">{t('stats-as-of-date')}</span>
          </h2>
          <p>{t('stats-barangay-table-subtitle')}</p>
        </div>
        <div className="surface-card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table className="barangay-stats-table">
              <thead>
                <tr>
                  <th>{t('stats-th-barangay')}</th>
                  <th>{t('stats-th-urban-rural')}</th>
                  <th>{t('stats-th-population')}</th>
                  <th>{t('stats-th-share')}</th>
                </tr>
              </thead>
              <tbody>
                {barangaysData.barangays
                  .slice()
                  .sort((a, b) => b.population_2024 - a.population_2024)
                  .map((b) => (
                    <tr key={b.name}>
                      <td>{b.name}</td>
                      <td>{b.urban_rural === 'Urban' ? t('stats-urban') : t('stats-rural')}</td>
                      <td>{b.population_2024.toLocaleString()}</td>
                      <td>{((b.population_2024 / demographics.population) * 100).toFixed(1)}%</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
