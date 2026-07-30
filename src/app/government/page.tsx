import type { Metadata } from 'next';
import officials from '@data/officials.json';
import barangaysData from '@data/barangays.json';

export const metadata: Metadata = {
  title: 'Government',
  description: 'Officials and administrative structure of LGU Aborlan.',
};

function OfficialCard({ name, title }: { name: string | null; title: string }) {
  return (
    <div className="surface-card gov-branch-card">
      <h3>{title}</h3>
      <p>{name ?? 'Pending verification'}</p>
    </div>
  );
}

export default function GovernmentPage() {
  return (
    <>
      <section className="portal-section">
        <div className="container">
          <div className="portal-section-header">
            <h2>Government of Aborlan</h2>
            <p>How the municipal government of Aborlan is organized.</p>
          </div>
          <div className="gov-branch-grid">
            <div className="surface-card gov-branch-card">
              <span className="gov-branch-icon">
                <i className="bi bi-star-fill" aria-hidden="true"></i>
              </span>
              <h3>Executive</h3>
              <p>Office of the Municipal Mayor and Vice Mayor, and their line departments.</p>
            </div>
            <div className="surface-card gov-branch-card">
              <span className="gov-branch-icon">
                <i className="bi bi-bank2" aria-hidden="true"></i>
              </span>
              <h3>Legislative</h3>
              <p>Sangguniang Bayan ng Aborlan — the municipal council that enacts ordinances.</p>
            </div>
            <div className="surface-card gov-branch-card">
              <span className="gov-branch-icon">
                <i className="bi bi-signpost-split-fill" aria-hidden="true"></i>
              </span>
              <h3>Barangays</h3>
              <p>
                {barangaysData.barangays.length > 0
                  ? `${barangaysData.barangays.length} barangays`
                  : 'Pending verification'}{' '}
                — the local administrative units of Aborlan.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="portal-section portal-section--alt">
        <div className="container">
          <div className="portal-section-header">
            <h2>Elected Officials</h2>
            <p>
              Names below are unverified pending an official source (COMELEC proclamation or the
              Sangguniang Bayan&apos;s own published roster) — see{' '}
              <code>data/officials.json</code> for sourcing notes.
            </p>
          </div>
          <div className="gov-branch-grid">
            <OfficialCard name={officials.mayor.name} title="Municipal Mayor" />
            <OfficialCard name={officials.vice_mayor.name} title="Municipal Vice Mayor" />
            <OfficialCard name={officials.sk_federation_president.name} title="SK Federation President" />
          </div>
          {officials.councilors.length === 0 && (
            <p style={{ textAlign: 'center', marginTop: 24 }}>
              Sangguniang Bayan member roster pending verification.
            </p>
          )}
        </div>
      </section>

      <section className="portal-section">
        <div className="container">
          <div className="portal-section-header">
            <h2>Barangays</h2>
            <p>Administrative units of Aborlan.</p>
          </div>
          {barangaysData.barangays.length === 0 ? (
            <p style={{ textAlign: 'center' }}>
              Barangay directory pending verification from the official Aborlan LGU or the PSGC
              (Philippine Standard Geographic Code) list.
            </p>
          ) : (
            <ul>
              {barangaysData.barangays.map((b: { name: string }) => (
                <li key={b.name}>{b.name}</li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
