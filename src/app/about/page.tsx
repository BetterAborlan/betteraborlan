import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'About BetterAborlan.org — a civic transparency portal for Aborlan, Palawan.',
};

export default function AboutPage() {
  return (
    <section className="portal-section">
      <div className="container">
        <div className="portal-section-header">
          <h2>About BetterAborlan.org</h2>
          <p>
            An independent, volunteer-built civic transparency portal for the Municipality of
            Aborlan, Palawan — a directory of local government services, officials, legislative
            records, and budget data in one place.
          </p>
        </div>

        <div className="surface-card" style={{ padding: 24, marginBottom: 24 }}>
          <h3>Why this exists</h3>
          <p>
            Residents shouldn&apos;t have to dig through scattered Facebook posts or outdated
            flyers to find which office handles a permit, who their elected officials are, or
            what ordinances are in effect. BetterAborlan.org centralizes that information and
            keeps it easy to find.
          </p>
        </div>

        <div className="surface-card" style={{ padding: 24, marginBottom: 24 }}>
          <h3>Based on BetterGov.ph</h3>
          <p>
            This site&apos;s layout, design system (<code>@bettergov/kapwa</code>), and data
            conventions are based on{' '}
            <a href="https://bettergov.ph" target="_blank" rel="noopener noreferrer">
              BetterGov.ph
            </a>
            , part of the wider community effort to make Philippine government information more
            accessible.
          </p>
        </div>

        <div className="surface-card" style={{ padding: 24 }}>
          <h3>Data policy</h3>
          <p>
            We do not fabricate or guess civic data. Where official figures aren&apos;t yet
            available or verified, the site shows an explicit &quot;pending verification&quot;
            state instead of a placeholder number. See the project&apos;s{' '}
            <a
              href="https://github.com/BetterAborlan/betteraborlan"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub repository
            </a>{' '}
            for source data and contribution details.
          </p>
        </div>
      </div>
    </section>
  );
}
