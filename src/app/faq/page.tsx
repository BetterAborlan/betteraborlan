import type { Metadata } from 'next';
import FaqContent from './FaqContent';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Frequently asked questions about BetterAborlan.org.',
};

export default function FaqPage() {
  return <FaqContent />;
}
