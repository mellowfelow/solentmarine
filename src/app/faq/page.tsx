import type { Metadata } from 'next';
import StaticPageClient from '../../components/routes/StaticPageClient';
import { FAQ_ITEMS } from '../../data/faq';

export const metadata: Metadata = {
  title: 'Technical Marine Outboards FAQ | Solent Marine UK',
  description:
    'Frequently Asked Questions about UK outboard shaft lengths, PDI rigging, 2-stroke legislation, electric motor runtimes, and Solent marine finance definitions.',
  alternates: { canonical: '/faq/' }
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_ITEMS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a }
  }))
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <StaticPageClient page="faq" />
    </>
  );
}
