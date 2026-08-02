import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { serviceCategories } from '@/data/serviceCategories';
import servicesData from '@data/services.json';
import CategoryContent from './CategoryContent';

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

  return <CategoryContent cat={cat} services={services} />;
}
