import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductClient from '../../../components/routes/ProductClient';
import { OUTBOARD_PRODUCTS } from '../../../data/products';
import { getProductSchema } from '../../../lib/schema';
import { getProductCopy } from '../../../lib/productCopy';

export function generateStaticParams() {
  return OUTBOARD_PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = OUTBOARD_PRODUCTS.find((p) => p.slug === slug);
  if (!product) return {};
  const copy = getProductCopy(product);
  return {
    title: copy.title,
    description: copy.metaDescription,
    alternates: { canonical: `/product/${product.slug}/` },
    openGraph: { type: 'website', title: copy.title, description: copy.metaDescription, url: `/product/${product.slug}/`, images: [{ url: product.imageUrl, width: 1200, height: 900, alt: copy.h1 }] },
    twitter: { card: 'summary_large_image', title: copy.title, description: copy.metaDescription, images: [product.imageUrl] }
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = OUTBOARD_PRODUCTS.find((p) => p.slug === slug);
  if (!product) notFound();

  const avgRating = product.reviews.length > 0
    ? (product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length).toFixed(1)
    : null;
  const schema = getProductSchema(product, product.reviews.length, avgRating);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ProductClient slug={slug} />
    </>
  );
}
