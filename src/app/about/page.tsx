import type { Metadata } from 'next';
import StaticPageClient from '../../components/routes/StaticPageClient';

export const metadata: Metadata = {
  title: 'About Solent Outboards UK - Our Rigging Team | Solent Marine UK',
  description:
    "Learn the history of Solent Marine Outboards, the UK's leading independent boating catalog and rigging center based in Cowes, Isle of Wight.",
  alternates: { canonical: '/about/' }
};

export default function Page() {
  return <StaticPageClient page="about" />;
}
