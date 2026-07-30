import type { Metadata } from 'next';
import budgetData from '@data/budget.json';

export const metadata: Metadata = {
  title: 'Budget',
  description: 'Annual budget and appropriations of the Municipality of Aborlan.',
};

export default function BudgetPage() {
  const { categories, fiscal_year, total_appropriations, _note } = budgetData;

  return (
    <section className="portal-section">
      <div className="container">
        <div className="portal-section-header">
          <h2>Budget</h2>
          <p>
            Annual appropriations and spending categories for the Municipality of Aborlan,
            sourced from the Annual Investment Plan once published.
          </p>
        </div>

        <div className="home-stats-v2-grid">
          <div className="surface-card home-stat-card" style={{ padding: 24, textAlign: 'center' }}>
            <div className="home-stat-card-content">
              <span className="home-stat-card-value">{fiscal_year ?? '—'}</span>
              <span className="home-stat-card-label">Fiscal Year</span>
            </div>
          </div>
          <div className="surface-card home-stat-card" style={{ padding: 24, textAlign: 'center' }}>
            <div className="home-stat-card-content">
              <span className="home-stat-card-value">{total_appropriations ?? '—'}</span>
              <span className="home-stat-card-label">Total Appropriations</span>
            </div>
          </div>
        </div>

        {categories.length === 0 ? (
          <div className="surface-card" style={{ padding: 32, textAlign: 'center', marginTop: 24 }}>
            <p>No budget breakdown published yet.</p>
            <p className="pending">{_note}</p>
          </div>
        ) : (
          <ul className="doc-list" style={{ marginTop: 24 }}>
            {categories.map((cat: { name: string; amount: number }) => (
              <li key={cat.name} className="surface-card surface-card--hoverable">
                {cat.name}: {cat.amount}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
