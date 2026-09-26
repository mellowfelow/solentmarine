import type { Metadata } from 'next';
import StaticPageClient from '../../components/routes/StaticPageClient';

export const metadata: Metadata = {
  title: 'Technical Marine Outboards FAQ | Solent Marine UK',
  description:
    'Frequently Asked Questions about UK outboard shaft lengths, PDI rigging, 2-stroke legislation, electric motor runtimes, and Solent marine finance definitions.',
  alternates: { canonical: '/faq/' }
};

export default function Page() {
  return <StaticPageClient page="faq" />;
}
