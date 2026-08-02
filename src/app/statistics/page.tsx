import type { Metadata } from 'next';
import StatisticsContent from './StatisticsContent';

export const metadata: Metadata = {
  title: 'Statistics',
  description: 'Demographic and administrative statistics for Aborlan, Palawan.',
};

export default function StatisticsPage() {
  return <StatisticsContent />;
}
