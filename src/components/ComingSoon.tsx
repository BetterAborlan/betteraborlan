export default function ComingSoon() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-linear-to-br from-kapwa-brand-900 to-kapwa-brand-950 px-6 py-16 text-center text-[var(--color-kapwa-text-inverse)]">
      <img
        src="/assets/images/logo/better-aborlan-logo-white.svg"
        alt="BetterAborlan.org"
        width={102}
        height={110}
        className="mb-8"
      />
      {/* Inline style, not a Tailwind class: Tailwind utilities live in a
          CSS @layer, so the plain (unlayered) h1 color rule in style.css
          always wins over them regardless of specificity. */}
      <h1
        className="mb-4 text-4xl font-extrabold sm:text-5xl"
        style={{ color: 'var(--color-kapwa-text-inverse)' }}
      >
        Coming Soon
      </h1>
      <p className="mb-10 max-w-md text-lg text-kapwa-blue-100">
        A community-run transparency portal for Aborlan, Palawan — government services,
        officials, and public data, all in one place. Launching soon.
      </p>
      {/* Inline color styles here for the same reason as the h1 above:
          style.css has a global `a { color: var(--color-primary) }` rule
          that beats any Tailwind text-color utility regardless of specificity. */}
      <div className="flex flex-wrap items-center justify-center gap-4">
        <a
          href="https://github.com/BetterAborlan/betteraborlan"
          target="_blank"
          rel="noopener noreferrer"
          className="coming-soon-btn coming-soon-btn--solid inline-flex items-center gap-2 rounded-md bg-[var(--color-kapwa-neutral-50)] font-semibold transition-colors hover:bg-kapwa-blue-50"
          style={{ color: 'var(--color-kapwa-brand-800)' }}
        >
          <i className="bi bi-github" aria-hidden="true"></i> Follow progress
        </a>
        <a
          href="https://discord.gg/Fsgdh7cJvw"
          target="_blank"
          rel="noopener noreferrer"
          className="coming-soon-btn inline-flex items-center gap-2 rounded-md border border-white/30 font-semibold transition-colors hover:bg-white/10"
          style={{ color: 'var(--color-kapwa-text-inverse)' }}
        >
          <i className="bi bi-discord" aria-hidden="true"></i> Join the Discord
        </a>
        <a
          href="mailto:info@betteraborlan.org"
          className="coming-soon-btn inline-flex items-center gap-2 rounded-md border border-white/30 font-semibold transition-colors hover:bg-white/10"
          style={{ color: 'var(--color-kapwa-text-inverse)' }}
        >
          <i className="bi bi-envelope" aria-hidden="true"></i> info@betteraborlan.org
        </a>
      </div>

      <div className="coming-soon-social">
        <a
          href="https://facebook.com/betteraborlan.org"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
        >
          <i className="bi bi-facebook" aria-hidden="true"></i>
        </a>
        <a
          href="https://linkedin.com/company/betteraborlan"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <i className="bi bi-linkedin" aria-hidden="true"></i>
        </a>
      </div>
    </div>
  );
}
