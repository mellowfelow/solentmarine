import type { Metadata } from 'next';
import ShopClient from '../../components/routes/ShopClient';
import { OUTBOARD_PRODUCTS } from '../../data/products';
import { getShopBreadcrumbSchema, getShopCollectionSchema, getListingFaqSchema } from '../../lib/schema';
import { SHOP_CONTENT } from '../../data/listingContent';
import { fitDesc, fitTitle } from '../../lib/seo';

export const metadata: Metadata = {
  title: fitTitle(SHOP_CONTENT.metaTitle),
  description: fitDesc(SHOP_CONTENT.metaDescription),
  alternates: { canonical: '/shop/' },
  openGraph: { type: 'website', title: fitTitle(SHOP_CONTENT.metaTitle), description: fitDesc(SHOP_CONTENT.metaDescription), url: '/shop/', images: ['/images/og-home.jpg'] },
  twitter: { card: 'summary_large_image', title: fitTitle(SHOP_CONTENT.metaTitle), description: fitDesc(SHOP_CONTENT.metaDescription), images: ['/images/og-home.jpg'] }
};

export default function Page() {
  const schema = [getShopBreadcrumbSchema(), getShopCollectionSchema({ slug: '', name: SHOP_CONTENT.h1, description: SHOP_CONTENT.metaDescription }, OUTBOARD_PRODUCTS.length), getListingFaqSchema(SHOP_CONTENT.faqs)];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ShopClient />
    </>
  );
}
