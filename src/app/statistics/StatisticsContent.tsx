'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import demographics from '@data/demographics.json';
import barangaysData from '@data/barangays.json';

export default function StatisticsContent() {
  const { t } = useLanguage();

  const totalPop2024 = demographics.population;
  const totalPop2020 = barangaysData.barangays.reduce((sum, b) => sum + b.population_2020, 0);
  const totalPop2015 = barangaysData.barangays.reduce((sum, b) => sum + b.population_2015, 0);
  const growthSince2020 = ((totalPop2024 - totalPop2020) / totalPop2020) * 100;
  const growthSince2015 = ((totalPop2024 - totalPop2015) / totalPop2015) * 100;
  const maxPop = Math.max(totalPop2015, totalPop2020, totalPop2024);

  const density = demographics.population / demographics.land_area_km2;
  const voterRate = (demographics.registered_voters_2025 / demographics.population) * 100;

  const urbanPop = barangaysData.barangays
    .filter((b) => b.urban_rural === 'Urban')
    .reduce((sum, b) => sum + b.population_2024, 0);
  const ruralPop = totalPop2024 - urbanPop;
  const urbanShare = (urbanPop / totalPop2024) * 100;
  const urbanCount = barangaysData.barangays.filter((b) => b.urban_rural === 'Urban').length;
  const ruralCount = barangaysData.barangays.length - urbanCount;

  return (
    <section className="portal-section">
      <div className="container">
        <div className="portal-section-header">
          <h2>{t('stats-page-title')}</h2>
          <p>{t('stats-page-subtitle')}</p>
        </div>

        <div className="stat-profile-grid">
          <div className="surface-card surface-card--hoverable stat-profile-group">
            <h3>{t('stats-group-population')}</h3>
            <dl>
              <div className="stat-profile-row">
                <dt>{t('stats-population-label')}</dt>
                <dd>{totalPop2024.toLocaleString()}</dd>
              </div>
              <div className="stat-profile-row">
                <dt>{t('stats-households-label')}</dt>
                <dd>{demographics.households_2024.toLocaleString()}</dd>
              </div>
              <div className="stat-profile-row">
                <dt>{t('stats-density-label')}</dt>
                <dd>
                  {density.toLocaleString(undefined, { maximumFractionDigits: 1 })}{' '}
                  <span className="stat-profile-unit">{t('stats-density-unit')}</span>
                </dd>
              </div>
            </dl>
          </div>

          <div className="surface-card surface-card--hoverable stat-profile-group">
            <h3>{t('stats-group-geography')}</h3>
            <dl>
              <div className="stat-profile-row">
                <dt>{t('stats-land-area-label')} *</dt>
                <dd>{demographics.land_area_km2} km²</dd>
              </div>
              <div className="stat-profile-row">
                <dt>{t('stats-income-label')} *</dt>
                <dd>{demographics.income_classification}</dd>
              </div>
              <div className="stat-profile-row">
                <dt>{t('stats-barangays-label')}</dt>
                <dd>{demographics.barangay_count}</dd>
              </div>
              <div className="stat-profile-row">
                <dt>{t('stats-province-label')}</dt>
                <dd>{demographics.province}</dd>
              </div>
              <div className="stat-profile-row">
                <dt>{t('stats-region-label')}</dt>
                <dd>{demographics.region}</dd>
              </div>
            </dl>
          </div>

          <div className="surface-card surface-card--hoverable stat-profile-group">
            <h3>{t('stats-group-governance')}</h3>
            <dl>
              <div className="stat-profile-row">
                <dt>{t('stats-registered-voters-label')}</dt>
                <dd>{demographics.registered_voters_2025.toLocaleString()}</dd>
              </div>
              <div className="stat-profile-row">
                <dt>{t('stats-voter-rate-label')}</dt>
                <dd>
                  {voterRate.toFixed(1)}%{' '}
                  <span className="stat-profile-unit">({t('stats-voter-rate-note')})</span>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Population growth */}
      <div className="container" style={{ marginTop: 56 }}>
        <div className="portal-section-header">
          <h2>{t('stats-growth-heading')}</h2>
          <p>{t('stats-growth-subtitle')}</p>
        </div>
        <div className="surface-card stat-growth-card">
          <div className="stat-growth-bars">
            {[
              { year: 2015, pop: totalPop2015 },
              { year: 2020, pop: totalPop2020 },
              { year: 2024, pop: totalPop2024 },
            ].map(({ year, pop }) => (
              <div className="stat-growth-bar" key={year}>
                <span className="stat-growth-bar-value">{pop.toLocaleString()}</span>
                <div
                  className="stat-growth-bar-fill"
                  style={{ height: `${(pop / maxPop) * 100}%` }}
                />
                <span className="stat-growth-bar-year">{year}</span>
              </div>
            ))}
          </div>
          <p className="stat-growth-summary">
            <strong>
              +{(totalPop2024 - totalPop2020).toLocaleString()} ({growthSince2020.toFixed(1)}%)
            </strong>{' '}
            {t('stats-growth-since')} 2020 ·{' '}
            <strong>
              +{(totalPop2024 - totalPop2015).toLocaleString()} ({growthSince2015.toFixed(1)}%)
            </strong>{' '}
            {t('stats-growth-since')} 2015
          </p>
        </div>
      </div>

      {/* Urban vs. rural */}
      <div className="container" style={{ marginTop: 56 }}>
        <div className="portal-section-header">
          <h2>{t('stats-urban-rural-heading')}</h2>
          <p>{t('stats-urban-rural-subtitle')}</p>
        </div>
        <div className="surface-card urban-rural-card">
          <div className="urban-rural-bar">
            <div className="urban-rural-bar-urban" style={{ width: `${urbanShare}%` }} />
          </div>
          <div className="urban-rural-legend">
            <span className="urban-rural-legend-item">
              <span className="urban-rural-legend-dot urban-rural-legend-dot--urban" />
              {t('stats-urban')} ({urbanCount}): <strong>{urbanPop.toLocaleString()}</strong> (
              {urbanShare.toFixed(1)}%)
            </span>
            <span className="urban-rural-legend-item">
              <span className="urban-rural-legend-dot urban-rural-legend-dot--rural" />
              {t('stats-rural')} ({ruralCount}): <strong>{ruralPop.toLocaleString()}</strong> (
              {(100 - urbanShare).toFixed(1)}%)
            </span>
          </div>
        </div>
      </div>

      {/* Barangay table */}
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
                  <th>{t('stats-th-2020-population')}</th>
                  <th>{t('stats-th-population')}</th>
                  <th>{t('stats-th-growth')}</th>
                  <th>{t('stats-th-share')}</th>
                </tr>
              </thead>
              <tbody>
                {barangaysData.barangays
                  .slice()
                  .sort((a, b) => b.population_2024 - a.population_2024)
                  .map((b) => {
                    const growth = ((b.population_2024 - b.population_2020) / b.population_2020) * 100;
                    return (
                      <tr key={b.name}>
                        <td>{b.name}</td>
                        <td>{b.urban_rural === 'Urban' ? t('stats-urban') : t('stats-rural')}</td>
                        <td>{b.population_2020.toLocaleString()}</td>
                        <td>{b.population_2024.toLocaleString()}</td>
                        <td>
                          {growth >= 0 ? '+' : ''}
                          {growth.toFixed(1)}%
                        </td>
                        <td>{((b.population_2024 / totalPop2024) * 100).toFixed(1)}%</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Sources & notes */}
      <div className="container" style={{ marginTop: 56 }}>
        <div className="surface-card sources-footnote">
          <h3>{t('stats-footnotes-heading')}</h3>
          <ul>
            <li>{t('stats-footnote-population')}</li>
            <li>{t('stats-footnote-land-income')}</li>
            <li>{t('stats-footnote-voters')}</li>
            <li>{t('stats-footnote-barangay')}</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
