import type { Metadata } from 'next';
import Link from 'next/link';
import { serviceCategories } from '@/data/serviceCategories';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Directory of municipal services offered by LGU Aborlan, by category.',
};

export default function ServicesPage() {
  return (
    <section className="portal-section">
      <div className="container">
        <div className="portal-section-header">
          <h2>Services Directory</h2>
          <p>Browse all municipal services offered by LGU Aborlan, organized by category.</p>
        </div>
        <div className="service-cat-grid">
          {serviceCategories.map((cat) => (
            <div key={cat.id} className="surface-card surface-card--hoverable service-cat-card">
              <span className="service-cat-icon">
                <i className={`bi ${cat.icon}`} aria-hidden="true"></i>
              </span>
              <h3>{cat.title}</h3>
              <ul>
                {cat.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Link href={cat.href}>
                View All {cat.title} <i className="bi bi-arrow-right" aria-hidden="true"></i>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
