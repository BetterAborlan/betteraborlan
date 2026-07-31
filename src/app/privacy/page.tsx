import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for BetterAborlan.org.',
};

export default function PrivacyPage() {
  return (
    <section className="portal-section">
      <div className="container">
        <div className="portal-section-header">
          <h2>Privacy Policy</h2>
        </div>

        <div className="surface-card" style={{ padding: 24 }}>
          <h3>What we collect</h3>
          <p>
            BetterAborlan.org does not require an account and does not ask visitors for personal
            information to browse the site. We do not sell or share visitor data with third
            parties.
          </p>

          <h3>Third-party data on this site</h3>
          <p>
            Some widgets (weather, currency exchange rates) call public third-party APIs directly
            from your browser to display live data. No personal information is sent to them
            beyond what any standard web request includes (e.g., your IP address, handled by
            those providers under their own policies).
          </p>

          <h3>Hosting</h3>
          <p>
            This site is hosted on Vercel, which may log standard web request data (IP address,
            user agent) for operational and security purposes.
          </p>

          <h3>Questions</h3>
          <p>
            Reach out via the channels listed on our{' '}
            <a
              href="https://github.com/BetterAborlan/betteraborlan"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub repository
            </a>{' '}
            or Discord.
          </p>
        </div>
      </div>
    </section>
  );
}
