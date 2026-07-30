import type { Metadata } from 'next';
import Link from 'next/link';
import ordinancesData from '@data/ordinances.json';

export const metadata: Metadata = {
  title: 'Ordinance Framework',
  description: 'Local ordinances enacted by the Sangguniang Bayan ng Aborlan.',
};

export default function OrdinanceFrameworkPage() {
  const { ordinances, _note } = ordinancesData;

  return (
    <section className="portal-section">
      <div className="container">
        <div className="portal-section-header">
          <h2>Ordinance Framework</h2>
          <p>
            Ordinances are local laws passed by the Sangguniang Bayan, with the force and effect
            of law within Aborlan once approved and published.
          </p>
        </div>

        {ordinances.length === 0 ? (
          <div className="surface-card" style={{ padding: 32, textAlign: 'center' }}>
            <p>No ordinances published yet.</p>
            <p className="pending">{_note}</p>
          </div>
        ) : (
          <ul className="doc-list">
            {ordinances.map((ord: { id: string; title: string }) => (
              <li key={ord.id} className="surface-card surface-card--hoverable">
                {ord.title}
              </li>
            ))}
          </ul>
        )}

        <p style={{ marginTop: 24 }}>
          <Link href="/legislative">&larr; Back to Legislative</Link>
        </p>
      </div>
    </section>
  );
}
