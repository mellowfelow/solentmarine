import type { Metadata } from 'next';
import HomeClient from '../components/routes/HomeClient';
import { OUTBOARD_PRODUCTS } from '../data/products';
import { getHomeSchema } from '../lib/schema';

export const metadata: Metadata = {
  title: 'Premium Boat Engines Shop & Rigging | Solent Marine UK',
  description:
    "UK's premier marine outboard engines provider. Explore Yamaha, Suzuki, Honda, Mercury, Tohatsu petrol outboards and ePropulsion, Torqeedo, TEMO, Haswing, Minn Kota electric propulsion. In-house PDI diagnostics, competitive finance rates, and UK-wide secure pallet delivery.",
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
