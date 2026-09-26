import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ShopClient from '../../../components/routes/ShopClient';
import { CATEGORIES } from '../../../config/site';
import { OUTBOARD_PRODUCTS } from '../../../data/products';
import { getShopBreadcrumbSchema, getShopCollectionSchema } from '../../../lib/schema';

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = CATEGORIES.find((c) => c.slug === categorySlug);
  if (!category) return {};
  const count = OUTBOARD_PRODUCTS.filter((p) => p.category.includes(category.slug as any)).length;
  return {
    title: `${category.name} | Shop UK Stock | Solent Marine UK`,
    description: `${category.description} Browse ${count} in-stock ${category.name.toLowerCase()} with UK-wide delivery and PDI inspection.`,
    alternates: { canonical: `/shop/${category.slug}/` }
  };
}

export default async function Page({ params }: { params: Promise<{ category: string }> }) {
  const { category: categorySlug } = await params;
  const category = CATEGORIES.find((c) => c.slug === categorySlug);
  if (!category) notFound();

  const count = OUTBOARD_PRODUCTS.filter((p) => p.category.includes(category.slug as any)).length;
  const schema = [getShopBreadcrumbSchema(category), getShopCollectionSchema(category, count)];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ShopClient categorySlug={category.slug} />
    </>
  );
}
