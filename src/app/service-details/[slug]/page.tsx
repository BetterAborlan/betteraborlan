import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { serviceCategories } from '@/data/serviceCategories';
import servicesData from '@data/services.json';
import DetailContent from './DetailContent';

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

  return <DetailContent svc={svc} cat={cat} />;
}
