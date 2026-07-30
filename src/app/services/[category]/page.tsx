import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { serviceCategories } from '@/data/serviceCategories';
import servicesData from '@data/services.json';

interface Props {
  params: Promise<{ category: string }>;
}

export function generateStaticParams() {
  return serviceCategories.map((cat) => ({ category: cat.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = serviceCategories.find((c) => c.id === category);
  return { title: cat?.title ?? 'Services' };
}

export default async function ServiceCategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = serviceCategories.find((c) => c.id === category);
  if (!cat) notFound();

  const services = servicesData.services.filter((s) => s.categoryId === category);

  return (
    <section className="portal-section">
      <div className="container">
        <div className="portal-section-header">
          <span className="service-cat-icon" style={{ margin: '0 auto 16px' }}>
            <i className={`bi ${cat.icon}`} aria-hidden="true"></i>
          </span>
          <h2>{cat.title}</h2>
        </div>
        {services.length === 0 ? (
          <p style={{ textAlign: 'center' }}>
            No services listed for this category yet. Check back once sourced from the official
            Aborlan LGU or its Citizen&apos;s Charter.
          </p>
        ) : (
          <div className="service-cat-grid">
            {services.map((svc) => (
              <div key={svc.id} className="surface-card surface-card--hoverable service-cat-card">
                <h3>{svc.title}</h3>
                <p>{svc.description}</p>
                <ul>
                  <li>Fee: {svc.fee ?? 'Pending verification'}</li>
                  <li>Processing time: {svc.processingTime ?? 'Pending verification'}</li>
                  <li>Office: {svc.office ?? 'Pending verification'}</li>
                </ul>
                <Link href={`/service-details/${svc.id}`}>
                  View Details <i className="bi bi-arrow-right" aria-hidden="true"></i>
                </Link>
              </div>
            ))}
          </div>
        )}
        <div className="portal-section-cta">
          <Link
            href="/services"
            className="inline-flex items-center justify-center rounded-md bg-[var(--color-kapwa-bg-brand-default)] px-4 py-2 h-10 text-base font-medium text-[var(--color-kapwa-text-inverse)] shadow-xs transition-colors hover:bg-[var(--color-kapwa-bg-brand-hover)]"
          >
            Back to Services Directory
          </Link>
        </div>
      </div>
    </section>
  );
}
