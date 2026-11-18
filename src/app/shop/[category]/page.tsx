import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ShopClient from '../../../components/routes/ShopClient';
import { CATEGORIES, BRANDS } from '../../../config/site';
import { OUTBOARD_PRODUCTS } from '../../../data/products';
import { CATEGORY_CONTENT, BRAND_CONTENT } from '../../../data/listingContent';
import { getShopBreadcrumbSchema, getShopCollectionSchema, getListingFaqSchema } from '../../../lib/schema';
import { fitDesc, fitTitle } from '../../../lib/seo';

export function generateStaticParams() {
  return [...CATEGORIES.map((c) => ({ category: c.slug })), ...BRANDS.map((b) => ({ category: b.slug }))];
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category: slug } = await params;
  const content = CATEGORY_CONTENT[slug] || BRAND_CONTENT[slug];
  if (!content) return {};
  const title = fitTitle(content.metaTitle);
  const description = fitDesc(content.metaDescription);
  return {
    title,
    description,
    alternates: { canonical: `/shop/${slug}/` },
    openGraph: { type: 'website', title, description, url: `/shop/${slug}/`, images: ['/images/og-home.jpg'] },
    twitter: { card: 'summary_large_image', title, description, images: ['/images/og-home.jpg'] }
  };
}

export default async function Page({ params }: { params: Promise<{ category: string }> }) {
  const { category: slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);
  const brand = !category ? BRANDS.find((b) => b.slug === slug) : undefined;
  if (!category && !brand) notFound();

  if (category) {
    const content = CATEGORY_CONTENT[category.slug];
    const count = OUTBOARD_PRODUCTS.filter((p) => p.category.includes(category.slug as any)).length;
    const schema = [
      getShopBreadcrumbSchema(category),
      getShopCollectionSchema({ ...category, name: content.h1, description: content.metaDescription }, count),
      getListingFaqSchema(content.faqs)
    ];
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        <ShopClient categorySlug={category.slug} />
      </>
    );
  }

  const content = BRAND_CONTENT[brand!.slug];
  const count = OUTBOARD_PRODUCTS.filter((p) => p.brand.toLowerCase() === brand!.name.toLowerCase()).length;
  const schema = [
    getShopBreadcrumbSchema({ slug: brand!.slug, name: content.h1 }),
    getShopCollectionSchema({ slug: brand!.slug, name: content.h1, description: content.metaDescription }, count),
    getListingFaqSchema(content.faqs)
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ShopClient brandSlug={brand!.slug} />
    </>
  );
}
