import type { Metadata } from 'next';
import StaticPageClient from '../../components/routes/StaticPageClient';
import { FAQ_ITEMS } from '../../data/faq';

export const metadata: Metadata = {
  title: 'Outboard Motor FAQ: Shaft Length & Delivery | Solent Marine',
  description:
    'Answers to common outboard motor questions: shaft length, engine size, PDI, UK 2-stroke rules, servicing, electric range, delivery and bank transfer payment.',
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
