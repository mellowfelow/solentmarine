import type { Metadata } from 'next';
import ShopClient from '../../components/routes/ShopClient';
import { OUTBOARD_PRODUCTS } from '../../data/products';
import { getShopBreadcrumbSchema, getShopCollectionSchema } from '../../lib/schema';

export const metadata: Metadata = {
  title: 'Shop Outboard Motors | Comprehensive UK Stock Directory | Solent Marine UK',
  description:
    'Filter and search physical stock of Suzuki, Yamaha, Tohatsu, Mercury, Torqeedo, ePropulsion and more. Buy portable 4-stroke or electric propulsion packages today.',
  alternates: { canonical: '/shop/' }
};

export default function Page() {
  const schema = [getShopBreadcrumbSchema(), getShopCollectionSchema(undefined, OUTBOARD_PRODUCTS.length)];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ShopClient />
    </>
  );
}
