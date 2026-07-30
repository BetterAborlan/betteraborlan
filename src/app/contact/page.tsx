import type { Metadata } from 'next';
import { hotlines } from '@/data/hotlines';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact information and emergency hotlines for the Municipality of Aborlan.',
};

export default function ContactPage() {
  return (
    <section className="portal-section">
      <div className="container">
        <div className="portal-section-header">
          <h2>Contact</h2>
          <p>Reach the Municipality of Aborlan or its emergency response offices.</p>
        </div>

        <div className="surface-card" style={{ padding: 24, marginBottom: 32 }}>
          <h3>Municipal Hall</h3>
          <p>
            <i className="bi bi-geo-alt-fill" aria-hidden="true"></i> Poblacion, Aborlan, Palawan,
            Philippines
          </p>
          <p className="pending">
            Office hours and direct trunkline pending verification from the municipal hall.
          </p>
        </div>

        <div id="hotlines">
          <h3 style={{ marginBottom: 16 }}>
            <i className="bi bi-telephone-fill" aria-hidden="true"></i> Emergency Hotlines
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
                    <span className="pending">TBD</span>
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
