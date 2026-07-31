import type { Metadata } from 'next';
import demographics from '@data/demographics.json';
import barangaysData from '@data/barangays.json';

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
          <p>Population is from the 2024 national census; land area and income class from 2020.</p>
        </div>
        <div className="home-stats-v2-grid">
          <StatCard
            icon="bi-people-fill"
            value={demographics.population?.toLocaleString() ?? '—'}
            label="Population"
            source={demographics.population_source ?? 'Pending verification'}
          />
          <StatCard
            icon="bi-house-door-fill"
            value={demographics.households_2024?.toLocaleString() ?? '—'}
            label="Households"
            source="PSA 2024 Census"
          />
          <StatCard
            icon="bi-geo-alt-fill"
            value={demographics.barangay_count?.toString() ?? '—'}
            label="Barangays"
            source="Administrative Units"
          />
          <StatCard
            icon="bi-award-fill"
            value={demographics.income_classification ?? '—'}
            label="Income Classification"
            source="PSA 2020 Census"
          />
          <StatCard
            icon="bi-rulers"
            value={demographics.land_area_km2 ? `${demographics.land_area_km2} km²` : '—'}
            label="Land Area"
            source="PSA 2020 Census"
          />
          <StatCard
            icon="bi-person-vcard-fill"
            value={demographics.registered_voters_2025?.toLocaleString() ?? '—'}
            label="Registered Voters"
            source="COMELEC, 2025 elections"
          />
        </div>
        <p style={{ marginTop: 32 }}>
          Province: {demographics.province} · Region: {demographics.region}
        </p>
      </div>

      <div className="container" style={{ marginTop: 56 }}>
        <div className="portal-section-header">
          <h2>
            Population by Barangay <span className="data-as-of">as of 31 July 2025</span>
          </h2>
          <p>PSA 2024 Census of Population (POPCEN) — sums exactly to the municipal total above.</p>
        </div>
        <div className="surface-card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table className="barangay-stats-table">
              <thead>
                <tr>
                  <th>Barangay</th>
                  <th>Urban / Rural</th>
                  <th>2024 Population</th>
                  <th>Share of Total</th>
                </tr>
              </thead>
              <tbody>
                {barangaysData.barangays
                  .slice()
                  .sort((a, b) => b.population_2024 - a.population_2024)
                  .map((b) => (
                    <tr key={b.name}>
                      <td>{b.name}</td>
                      <td>{b.urban_rural}</td>
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
