import type { Metadata } from 'next';
import SearchClient from '@/components/SearchClient';

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search government services on BetterAborlan.org.',
};

export default function SearchPage() {
  return (
    <section className="portal-section">
      <div className="container">
        <div className="portal-section-header">
          <h2>Search</h2>
          <p>Find a government service by name.</p>
        </div>
        <SearchClient />
      </div>
    </section>
  );
}
