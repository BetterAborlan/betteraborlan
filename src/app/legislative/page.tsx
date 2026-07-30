import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Legislative',
  description: 'Ordinances and resolutions of the Sangguniang Bayan ng Aborlan.',
};

export default function LegislativePage() {
  return (
    <section className="portal-section">
      <div className="container">
        <div className="portal-section-header">
          <h2>Legislative</h2>
          <p>Ordinances and resolutions passed by the Sangguniang Bayan ng Aborlan.</p>
        </div>
        <div className="gov-branch-grid">
          <Link href="/legislative/ordinance-framework" className="surface-card gov-branch-card">
            <span className="gov-branch-icon">
              <i className="bi bi-file-earmark-ruled-fill" aria-hidden="true"></i>
            </span>
            <h3>Ordinance Framework</h3>
            <p>Local laws enacted by the Sangguniang Bayan, with the force and effect of law.</p>
          </Link>
          <Link href="/legislative/resolution-framework" className="surface-card gov-branch-card">
            <span className="gov-branch-icon">
              <i className="bi bi-file-earmark-text-fill" aria-hidden="true"></i>
            </span>
            <h3>Resolution Framework</h3>
            <p>Formal expressions of the council&apos;s opinion or will — no force of law.</p>
          </Link>
        </div>
      </div>
    </section>
  );
}
