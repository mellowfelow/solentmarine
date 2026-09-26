import type { Metadata } from 'next';
import StaticPageClient from '../../components/routes/StaticPageClient';

export const metadata: Metadata = {
  title: 'Outboard Engine Delivery & Returns UK Policies | Solent Marine UK',
  description:
    'Official Solent Marine UK transport policies. Learn how outboards are safely crated, shipped dry of engine oil, and the 14-day UK distance return guidelines.',
  alternates: { canonical: '/shipping/' }
};

export default function Page() {
  return <StaticPageClient page="shipping" />;
}
