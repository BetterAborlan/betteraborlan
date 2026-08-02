import type { Metadata } from 'next';
import ContactContent from './ContactContent';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contact information and emergency hotlines for the Municipality of Aborlan.',
};

export default function ContactPage() {
  return <ContactContent />;
}
