import type { Metadata } from 'next';
import Link from 'next/link';
import officials from '@data/officials.json';
import barangaysData from '@data/barangays.json';

export const metadata: Metadata = {
  title: 'Government',
  description: 'Officials and administrative structure of LGU Aborlan.',
};

function OfficialCard({ name, title }: { name: string | null; title: string }) {
  return (
    <div className="surface-card gov-branch-card official-card">
      <h3>{name ?? 'Pending verification'}</h3>
      <p>{title}</p>
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
            <Link href="/legislative" className="surface-card surface-card--hoverable gov-branch-card">
              <span className="gov-branch-icon">
                <i className="bi bi-bank2" aria-hidden="true"></i>
              </span>
              <h3>Legislative</h3>
              <p>Sangguniang Bayan ng Aborlan — the municipal council that enacts ordinances.</p>
            </Link>
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
            <p>The mayor, vice mayor, and other leaders representing Aborlan for the 2025–2028 term.</p>
          </div>
          <div className="gov-branch-grid">
            <OfficialCard name={officials.mayor.name} title="Municipal Mayor" />
            <OfficialCard name={officials.vice_mayor.name} title="Municipal Vice Mayor" />
            <OfficialCard
              name={officials.representative.name}
              title="Representative, 3rd District of Palawan"
            />
            <OfficialCard name={officials.sk_federation_president.name} title="SK Federation President" />
            <OfficialCard
              name={officials.ipmr.name}
              title="IPMR (Indigenous Peoples Mandatory Representative)"
            />
          </div>
          {officials.councilors.length === 0 ? (
            <p style={{ textAlign: 'center', marginTop: 24 }}>
              Sangguniang Bayan member roster pending verification.
            </p>
          ) : (
            <div style={{ marginTop: 24 }}>
              <h3 style={{ textAlign: 'center', marginBottom: 16 }}>Sangguniang Bayan Members</h3>
              <div className="member-grid">
                {officials.councilors.map((c: { name: string; title: string }) => (
                  <div key={c.name} className="surface-card surface-card--hoverable member-card">
                    <span className="member-card-icon">
                      <i className="bi bi-person-badge-fill" aria-hidden="true"></i>
                    </span>
                    <span className="member-card-name">
                      {c.name}
                      <span className="member-card-title">{c.title}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
          <p className="pending" style={{ textAlign: 'center', marginTop: 24 }}>
            Officials assumed office June 30, 2025. Mayor and Vice Mayor are confirmed from news
            reports; councilor names are from initial election results and may change once
            officially proclaimed.
          </p>
        </div>
      </section>

      <section className="portal-section">
        <div className="container">
          <div className="portal-section-header">
            <h2>Barangays</h2>
            <p>Aborlan is made up of 19 barangays, each with its own 2024 census population.</p>
          </div>
          {barangaysData.barangays.length === 0 ? (
            <p style={{ textAlign: 'center' }}>
              Barangay directory pending verification from the official Aborlan LGU or the PSGC
              (Philippine Standard Geographic Code) list.
            </p>
          ) : (
            <div className="barangay-grid">
              {barangaysData.barangays.map((b: { name: string; population_2024: number }) => (
                <div key={b.name} className="surface-card surface-card--hoverable barangay-chip">
                  <i className="bi bi-geo-alt-fill" aria-hidden="true"></i>
                  <span>
                    {b.name}
                    <span className="barangay-chip-pop">
                      {b.population_2024.toLocaleString()} residents
                    </span>
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
