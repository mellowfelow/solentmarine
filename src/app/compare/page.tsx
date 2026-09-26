import type { Metadata } from 'next';
import CompareClient from '../../components/routes/CompareClient';

export const metadata: Metadata = {
  title: 'Compare Outboards, Batteries & Accessories | Solent Marine UK',
  description: 'Compare outboard motors, electric batteries, chargers and marine accessories side by side — price, power output, weight, warranty and key specs.',
  alternates: { canonical: '/compare/' },
  robots: { index: false, follow: true }
};

export default function Page() {
  return <CompareClient />;
}
