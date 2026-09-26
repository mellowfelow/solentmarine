import type { Metadata } from 'next';
import StaticPageClient from '../../components/routes/StaticPageClient';

export const metadata: Metadata = {
  title: 'Terms of Service & UK Warranties - Solent Marine | Solent Marine UK',
  description:
    'Review Solent Marine terms and conditions. Covers boat motor sales laws, UK CE markings, fuel line safety guidelines, and warranty activations.',
  alternates: { canonical: '/terms/' }
};

export default function Page() {
  return <StaticPageClient page="terms" />;
}
