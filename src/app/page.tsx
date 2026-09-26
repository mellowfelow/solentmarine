import type { Metadata } from 'next';
import HomeClient from '../components/routes/HomeClient';
import { OUTBOARD_PRODUCTS } from '../data/products';
import { getHomeSchema } from '../lib/schema';

export const metadata: Metadata = {
  title: 'Outboard Motors For Sale UK | Solent Marine Outboards',
  description:
    "Outboard motors for sale from our Cowes, Isle of Wight dealership — buy outboard boat motors from Yamaha, Suzuki, Honda, Mercury, Tohatsu and electric propulsion from ePropulsion, Torqeedo, TEMO, Haswing, Minn Kota. PDI checked, UK-wide delivery.",
  alternates: { canonical: '/' },
  openGraph: { type: 'website', url: '/' }
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
