import type { Metadata } from 'next';
import AboutContent from './AboutContent';

export const metadata: Metadata = {
  title: 'About',
  description: 'About BetterAborlan.org — a civic transparency portal for Aborlan, Palawan.',
};

export default function AboutPage() {
  return <AboutContent />;
}
