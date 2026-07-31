import type { Metadata } from 'next';
import Link from 'next/link';
import resolutionsData from '@data/resolutions.json';

export const metadata: Metadata = {
  title: 'Resolution Framework',
  description: 'Resolutions passed by the Sangguniang Bayan ng Aborlan.',
};

export default function ResolutionFrameworkPage() {
  const { resolutions, _note } = resolutionsData;

  return (
    <section className="portal-section">
      <div className="container">
        <div className="portal-section-header">
          <h2>Resolution Framework</h2>
          <p>
            Resolutions are formal expressions of the council&apos;s opinion or will on a
            particular matter — unlike ordinances, they do not have the force of law.
          </p>
        </div>

        {resolutions.length === 0 ? (
          <div className="surface-card" style={{ padding: 32, textAlign: 'center' }}>
            <p>No resolutions published yet.</p>
            <p className="pending">{_note}</p>
          </div>
        ) : (
          <ul className="doc-list">
            {resolutions.map((res: { id: string; title: string }) => (
              <li key={res.id} className="surface-card surface-card--hoverable">
                {res.title}
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
