import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Accessibility',
  description: 'Accessibility statement for BetterAborlan.org.',
};

export default function AccessibilityPage() {
  return (
    <section className="portal-section">
      <div className="container">
        <div className="portal-section-header">
          <h2>Accessibility</h2>
        </div>

        <div className="surface-card" style={{ padding: 24 }}>
          <p>
            BetterAborlan.org aims to be usable by as many residents as possible, including
            people using assistive technology like screen readers and keyboard-only navigation.
            We build on semantic HTML and the <code>@bettergov/kapwa</code> component library,
            which follows accessible design patterns.
          </p>
          <p>
            This is an ongoing effort rather than a finished guarantee. If you run into a page or
            feature that is hard to use with assistive technology, please let us know through our{' '}
            <a
              href="https://github.com/BetterAborlan/betteraborlan/issues"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub issues
            </a>{' '}
            or{' '}
            <a href="https://discord.gg/Fsgdh7cJvw" target="_blank" rel="noopener noreferrer">
              Discord
            </a>{' '}
            so it can be fixed.
          </p>
        </div>
      </div>
    </section>
  );
}
