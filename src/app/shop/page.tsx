import type { Metadata } from 'next';
import ShopClient from '../../components/routes/ShopClient';
import { OUTBOARD_PRODUCTS } from '../../data/products';
import { getShopBreadcrumbSchema, getShopCollectionSchema } from '../../lib/schema';

export const metadata: Metadata = {
  title: 'Marine Motors For Sale | Full UK Stock | Solent Marine',
  description:
    'Marine motors for sale: search our full stock of Suzuki, Yamaha, Tohatsu, Mercury, Torqeedo and ePropulsion outboards, portable petrol to electric.',
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
