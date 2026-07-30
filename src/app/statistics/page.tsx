import type { Metadata } from 'next';
import demographics from '@data/demographics.json';

export const metadata: Metadata = {
  title: 'Statistics',
  description: 'Demographic and administrative statistics for Aborlan, Palawan.',
};

function StatCard({
  icon,
  value,
  label,
  source,
}: {
  icon: string;
  value: string;
  label: string;
  source: string;
}) {
  return (
    <div className="surface-card home-stat-card" style={{ padding: 24, textAlign: 'center' }}>
      <div className="home-stat-card-icon">
        <i className={`bi ${icon}`} aria-hidden="true"></i>
      </div>
      <div className="home-stat-card-content">
        <span className="home-stat-card-value">{value}</span>
        <span className="home-stat-card-label">{label}</span>
        <span className="home-stat-card-source">{source}</span>
      </div>
    </div>
  );
}

export default function StatisticsPage() {
  return (
    <section className="portal-section">
      <div className="container">
        <div className="portal-section-header">
          <h2>Aborlan at a Glance</h2>
          <p>
            Figures below are left unverified until sourced from PSA (Philippine Statistics
            Authority) census releases or the official Aborlan LGU — see{' '}
            <code>data/demographics.json</code>.
          </p>
        </div>
        <div className="home-stats-v2-grid">
          <StatCard
            icon="bi-people-fill"
            value="—"
            label="Population"
            source={demographics.population_source ?? 'Pending verification'}
          />
          <StatCard
            icon="bi-geo-alt-fill"
            value="—"
            label="Barangays"
            source="Administrative Units"
          />
          <StatCard
            icon="bi-award-fill"
            value="—"
            label="Income Classification"
            source={demographics.income_classification ?? 'Pending verification'}
          />
          <StatCard
            icon="bi-rulers"
            value="—"
            label="Land Area"
            source="Pending verification"
          />
        </div>
        <p style={{ marginTop: 32 }}>
          Province: {demographics.province} · Region: {demographics.region}
        </p>
      </div>
    </section>
  );
}
