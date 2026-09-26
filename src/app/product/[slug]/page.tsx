import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductClient from '../../../components/routes/ProductClient';
import { OUTBOARD_PRODUCTS } from '../../../data/products';
import { getProductSchema } from '../../../lib/schema';

export function generateStaticParams() {
  return OUTBOARD_PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = OUTBOARD_PRODUCTS.find((p) => p.slug === slug);
  if (!product) return {};
  return {
    title: `${product.name} — Specs, Price & Finance | Solent Marine UK`,
    description: `${product.brand} ${product.name}: £${product.priceGbp.toLocaleString('en-GB')} inc. VAT. Fuel system: ${product.fuelSystem}, ${product.powerHp > 0 ? `${product.powerHp}HP, ` : ''}dry weight ${product.weightKg}kg. Fully PDI checked at Solent Marine, Isle of Wight.`,
    alternates: { canonical: `/product/${product.slug}/` },
    openGraph: { type: 'website', images: [product.imageUrl] }
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
