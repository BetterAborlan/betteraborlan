import type { Metadata } from 'next';
import SitemapContent from './SitemapContent';

export const metadata: Metadata = {
  title: 'Sitemap',
  description: 'Full page listing for BetterAborlan.org.',
};

export default function SitemapPage() {
  return <SitemapContent />;
}
