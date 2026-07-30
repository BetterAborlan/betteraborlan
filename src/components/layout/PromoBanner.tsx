'use client';

// Kapwa's dist components ship their own bundled jsx-runtime chunk, which
// crashes Next's dev-mode Server Component rendering (owner-stack
// tracking). Rendering as a client component sidesteps it — any file that
// renders a Kapwa component needs this directive.
import { StripBanner } from '@bettergov/kapwa/strip-banner';

export default function PromoBanner() {
  return (
    <StripBanner
      stripBannerTitle="Get Involved"
      stripBanner={{
        id: 1,
        emoji: '🚀',
        mainText: 'Join the #CivicTech movement',
        subText: 'Help build BetterAborlan.org',
        primaryButton: {
          text: 'Join Now',
          href: 'https://github.com/BetterAborlan/betteraborlan',
        },
        secondaryLink: {
          text: 'Contribute on GitHub',
          href: 'https://github.com/BetterAborlan/betteraborlan',
        },
      }}
    />
  );
}
