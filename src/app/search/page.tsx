import type { Metadata } from 'next';
import SearchClient from '@/components/SearchClient';

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search government services on BetterAborlan.org.',
};

export default function SearchPage() {
  return <SearchClient />;
}
