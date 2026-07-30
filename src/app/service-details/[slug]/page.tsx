import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { serviceCategories } from '@/data/serviceCategories';
import servicesData from '@data/services.json';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return servicesData.services.map((s) => ({ slug: s.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const svc = servicesData.services.find((s) => s.id === slug);
  return { title: svc?.title ?? 'Service Details' };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const svc = servicesData.services.find((s) => s.id === slug);
  if (!svc) notFound();

  const cat = serviceCategories.find((c) => c.id === svc.categoryId);

  return (
    <section className="portal-section">
      <div className="container" style={{ maxWidth: 720 }}>
        <div className="portal-section-header" style={{ textAlign: 'left', margin: '0 0 32px' }}>
          {cat && (
            <p style={{ margin: '0 0 8px', fontWeight: 600, color: 'var(--color-kapwa-brand-700)' }}>
              {cat.title}
            </p>
          )}
          <h1 style={{ fontSize: '1.875rem', fontWeight: 800, margin: '0 0 12px' }}>{svc.title}</h1>
          <p>{svc.description}</p>
        </div>

        <div className="surface-card" style={{ padding: 24 }}>
          <h3 style={{ marginTop: 0 }}>What you need to know</h3>
          <table className="realtime-currency-table" style={{ width: '100%' }}>
            <tbody>
              <tr>
                <td>Fee</td>
                <td>{svc.fee ?? 'Pending verification'}</td>
              </tr>
              <tr>
                <td>Processing time</td>
                <td>{svc.processingTime ?? 'Pending verification'}</td>
              </tr>
              <tr>
                <td>Responsible office</td>
                <td>{svc.office ?? 'Pending verification'}</td>
              </tr>
            </tbody>
          </table>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-kapwa-text-support)' }}>
            Fee, processing time, and office details haven&apos;t been sourced from the official
            Aborlan LGU or its Citizen&apos;s Charter yet — check{' '}
            <Link href="/contact">Contact</Link> for how to reach the municipal hall directly in
            the meantime.
          </p>
        </div>

        <div className="portal-section-cta" style={{ textAlign: 'left', marginTop: 24 }}>
          {cat && (
            <Link
              href={cat.href}
              className="inline-flex items-center justify-center rounded-md bg-[var(--color-kapwa-bg-brand-default)] px-4 py-2 h-10 text-base font-medium text-[var(--color-kapwa-text-inverse)] shadow-xs transition-colors hover:bg-[var(--color-kapwa-bg-brand-hover)]"
            >
              Back to {cat.title}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
