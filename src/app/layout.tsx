import type { Metadata, Viewport } from 'next';
import './globals.css';
import TopBar from '@/components/layout/TopBar';
import Header from '@/components/layout/Header';
import InfoBar from '@/components/layout/InfoBar';
import PromoBanner from '@/components/layout/PromoBanner';
import Footer from '@/components/layout/Footer';
import PWAManager from '@/components/PWAManager';
import ComingSoon from '@/components/ComingSoon';
import { LanguageProvider } from '@/contexts/LanguageContext';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://betteraborlan.org';

// Set only in Vercel's Production environment vars — Development/Preview
// always show the full site regardless of this flag. Flip it off in
// Production when the site is ready to launch for real, no code change.
const COMING_SOON = process.env.NEXT_PUBLIC_COMING_SOON === 'true';

export const viewport: Viewport = {
  themeColor: '#0032A0',
};

export const metadata: Metadata = {
  title: { default: 'BetterAborlan.org | Official Portal', template: '%s | BetterAborlan.org' },
  description: 'BetterAborlan.org - Your digital gateway to LGU Aborlan services.',
  keywords: ['BetterAborlan', 'Aborlan Palawan', 'LGU Aborlan', 'municipal services'],
  authors: [{ name: 'BetterAborlan.org' }],
  openGraph: {
    type: 'website',
    locale: 'en_PH',
    url: SITE_URL,
    siteName: 'BetterAborlan.org',
    title: 'BetterAborlan.org | Official Portal',
    description: 'Empowering the people of Aborlan with transparent access to services.',
  },
  twitter: { card: 'summary_large_image' },
  icons: {
    icon: [
      { url: '/assets/images/logo/favicon.svg', type: 'image/svg+xml' },
      { url: '/assets/images/logo/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    shortcut: '/assets/images/logo/favicon.ico',
    apple: '/assets/images/logo/apple-touch-icon.png',
  },
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'BetterAborlan',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css"
        />
        <link rel="stylesheet" href="/assets/css/style.css" />
        <link rel="stylesheet" href="/assets/css/responsive.css" />
        <link rel="stylesheet" href="/assets/css/accessibility.css" />
        <link rel="stylesheet" href="/assets/css/portal.css" />
      </head>
      <body>
        {COMING_SOON ? (
          <ComingSoon />
        ) : (
          <LanguageProvider>
            <a href="#main-content" className="skip-link">
              Skip to main content
            </a>
            <TopBar />
            <Header />
            <InfoBar />
            <PromoBanner />
            <main id="main-content">{children}</main>
            <Footer />
            <PWAManager />
          </LanguageProvider>
        )}
      </body>
    </html>
  );
}
