import type { Metadata } from 'next';
import StaticPageClient from '../../components/routes/StaticPageClient';

export const metadata: Metadata = {
  title: 'Contact Solent Marine Outboards Cowes | Solent Marine UK',
  description:
    'Get in touch with UK marine mechanics and sales advisors based in Cowes, Isle of Wight. Phone call line: 01983 294400 or submit an outboard rigging inquiry.',
  alternates: { canonical: '/contact/' }
};

export default function Page() {
  return <StaticPageClient page="contact" />;
}
