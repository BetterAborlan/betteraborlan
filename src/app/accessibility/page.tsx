import type { Metadata } from 'next';
import AccessibilityContent from './AccessibilityContent';

export const metadata: Metadata = {
  title: 'Accessibility',
  description: 'Accessibility statement for BetterAborlan.org.',
};

export default function AccessibilityPage() {
  return <AccessibilityContent />;
}
