import type { Metadata } from 'next';
import ServicesContent from './ServicesContent';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Directory of municipal services offered by LGU Aborlan, by category.',
};

export default function ServicesPage() {
  return <ServicesContent />;
}
