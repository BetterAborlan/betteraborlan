'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import servicesData from '@data/services.json';
import { serviceCategories } from '@/data/serviceCategories';

interface Service {
  id: string;
  title: string;
  categoryId: string;
}

export default function SearchClient() {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return (servicesData.services as Service[]).filter((svc) =>
      svc.title.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div>
      <div className="surface-card" style={{ padding: 24, marginBottom: 24 }}>
        <label htmlFor="site-search" style={{ display: 'block', marginBottom: 8 }}>
          Search services
        </label>
        <input
          id="site-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. business permit, barangay clearance..."
          className="search-input"
          style={{ width: '100%', padding: '10px 14px', fontSize: '1rem' }}
        />
      </div>

      {query.trim() && (
        <>
          {results.length === 0 ? (
            <p className="pending">No services match &quot;{query}&quot;.</p>
          ) : (
            <ul className="doc-list">
              {results.map((svc) => {
                const cat = serviceCategories.find((c) => c.id === svc.categoryId);
                return (
                  <li key={svc.id} className="surface-card surface-card--hoverable">
                    <Link href={`/service-details/${svc.id}`}>{svc.title}</Link>
                    {cat && <span className="pending"> — {cat.title}</span>}
                  </li>
                );
              })}
            </ul>
          )}
        </>
      )}
    </div>
  );
}
