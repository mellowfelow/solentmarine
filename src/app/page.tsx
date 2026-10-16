import type { Metadata } from 'next';
import HomeClient from '../components/routes/HomeClient';
import { OUTBOARD_PRODUCTS } from '../data/products';
import { getHomeSchema } from '../lib/schema';

export const metadata: Metadata = {
  title: 'Outboard Motors For Sale UK | Solent Marine Outboards',
  description:
    'Outboard motors for sale from Yamaha, Suzuki, Honda, Mercury and Tohatsu, plus electric propulsion. PDI checked, UK-wide delivery from Cowes, Isle of Wight.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    images: [{ url: '/images/hero/hero-yamaha-200-rib.jpg', width: 1200, height: 630 }]
  }
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getHomeSchema(OUTBOARD_PRODUCTS)) }}
      />
      <HomeClient />
    </>
  );
}
