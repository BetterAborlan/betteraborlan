import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms of use for BetterAborlan.org.',
};

export default function TermsPage() {
  return (
    <section className="portal-section">
      <div className="container">
        <div className="portal-section-header">
          <h2>Terms of Use</h2>
        </div>

        <div className="surface-card" style={{ padding: 24 }}>
          <h3>Independent, volunteer-run project</h3>
          <p>
            BetterAborlan.org is an independent, volunteer-built civic transparency portal. It is
            not an official website of the Municipality of Aborlan or any Philippine government
            agency, and is not affiliated with or endorsed by them.
          </p>

          <h3>No warranty</h3>
          <p>
            Content is provided &quot;as is&quot; for general informational purposes. While we
            try to keep information accurate and clearly mark unverified data, we make no
            guarantee of completeness or accuracy. For official transactions, always confirm
            details directly with the relevant municipal office.
          </p>

          <h3>Open source</h3>
          <p>
            The code powering this site is open source (MIT License) and the underlying data is
            licensed CC BY 4.0. See the{' '}
            <a
              href="https://github.com/BetterAborlan/betteraborlan"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub repository
            </a>{' '}
            for details.
          </p>
        </div>
      </div>
    </section>
  );
}
