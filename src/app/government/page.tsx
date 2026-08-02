import type { Metadata } from 'next';
import GovernmentContent from './GovernmentContent';

export const metadata: Metadata = {
  title: 'Government',
  description: 'Officials and administrative structure of LGU Aborlan.',
};

export default function GovernmentPage() {
  return <GovernmentContent />;
}
