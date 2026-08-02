import type { Metadata } from 'next';
import NewsContent from '@/components/NewsContent';

export const metadata: Metadata = {
  title: 'News',
  description: 'Recent news about Aborlan, Palawan, gathered from Google News.',
};

export default function NewsPage() {
  return <NewsContent />;
}
