import type { Metadata } from 'next';
import TermsContent from './TermsContent';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms of use for BetterAborlan.org.',
};

export default function TermsPage() {
  return <TermsContent />;
}
