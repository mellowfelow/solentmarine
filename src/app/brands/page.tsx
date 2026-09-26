import type { Metadata } from 'next';
import BrandsClient from '../../components/routes/BrandsClient';
import { BRANDS, SITE } from '../../config/site';
import { OUTBOARD_PRODUCTS } from '../../data/products';

const ORIGIN = `https://${SITE.domain}`;

export const metadata: Metadata = {
  title: 'Outboard Motor Brands | Yamaha, Mercury, Honda, Suzuki, Tohatsu, ePropulsion | Solent Marine UK',
  description: 'Browse every outboard motor brand Solent Marine UK stocks — Yamaha, Mercury, Honda, Suzuki, Tohatsu and ePropulsion — with authorized dealer warranty on every engine.',
  alternates: { canonical: '/brands/' }
};

export default function Page() {
  const brands = BRANDS.map((b) => {
    const brandProducts = OUTBOARD_PRODUCTS.filter((p) => p.brand.toLowerCase() === b.name.toLowerCase());
    const minPrice = brandProducts.length ? Math.min(...brandProducts.map((p) => p.priceGbp)) : 0;
    return { slug: b.slug, name: b.name, description: b.description, productCount: brandProducts.length, minPrice };
  });

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${ORIGIN}/` },
        { '@type': 'ListItem', position: 2, name: 'Brands', item: `${ORIGIN}/brands/` }
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Outboard Motor Brands',
      description: 'All outboard motor brands stocked by Solent Marine Outboards UK.',
      url: `${ORIGIN}/brands/`,
      numberOfItems: brands.length
    }
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <BrandsClient brands={brands} />
    </>
  );
}
