import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ShopClient from '../../../components/routes/ShopClient';
import { CATEGORIES, BRANDS } from '../../../config/site';
import { OUTBOARD_PRODUCTS } from '../../../data/products';
import { getShopBreadcrumbSchema, getShopCollectionSchema } from '../../../lib/schema';

// Real Transactional/Commercial primary keywords per docs/keyword-map.md — Tohatsu and ePropulsion
// had no qualifying T/C keyword in the export (their brand-specific search volume is below the
// tool's tracking floor), so a natural commercial phrase is used instead of an Informational one.
const BRAND_SEO: Record<string, { title: string; description: string }> = {
  yamaha: {
    title: 'Yamaha Outboards | Shop UK Stock | Solent Marine UK',
    description: 'Yamaha outboards for sale from our UK dealership — buy Yamaha outboard motors from 2.5HP tenders to 300HP offshore V6 engines, all PDI checked before dispatch.'
  },
  mercury: {
    title: 'Mercury Outboards | Shop UK Stock | Solent Marine UK',
    description: 'Mercury outboard motors and Mercury Marine engines for sale in the UK, from 3.5HP FourStroke portables to the 400HP Verado V10, all PDI checked before dispatch.'
  },
  honda: {
    title: 'Honda Outboards | Shop UK Stock | Solent Marine UK',
    description: 'Honda outboard engines and Honda outboard motors for sale in the UK, from the ultra-light BF2.3 to the BF100 XRU, backed by official Honda UK warranty.'
  },
  suzuki: {
    title: 'Suzuki Outboard Engines | Shop UK Stock | Solent Marine UK',
    description: 'Suzuki outboards for sale in the UK — buy Suzuki outboard motors from lightweight portables to the 350HP DF350A, all PDI checked before dispatch.'
  },
  tohatsu: {
    title: 'Tohatsu Outboards | Shop UK Stock | Solent Marine UK',
    description: 'Buy Tohatsu outboard motors in the UK, known for class-leading power-to-weight ratios, from the 3.5HP MFS3.5C to the 115HP MFS115A.'
  },
  epropulsion: {
    title: 'ePropulsion Electric Outboards | Shop UK Stock | Solent Marine UK',
    description: 'Buy ePropulsion electric outboards in the UK — zero-emission propulsion and pod drives from the 0.5kW eLite to the 20kW X20.'
  }
};

// Real Transactional/Commercial primary+secondary keywords per docs/keyword-map.md v2 — the
// generic category.description text alone doesn't carry the actual T/C keyword phrase, so titles
// and meta descriptions here work the real target phrase in naturally.
const CATEGORY_SEO: Record<string, { title: string; description: string }> = {
  portable: {
    title: 'Portable Outboards 2.5HP-6HP | 5HP Outboard Engine | Solent Marine UK',
    description: 'Shop portable outboards 2.5HP-6HP — including 5HP and 6HP outboard engines for sale from Yamaha, Suzuki, Honda, Mercury and Tohatsu. UK-wide delivery, PDI checked, from our Cowes base on the Solent.'
  },
  'mid-range': {
    title: 'Mid-Range Outboards 8HP-40HP | Boat Motor 10HP | Solent Marine UK',
    description: 'Shop mid-range outboards 8HP-40HP — boat motor 10HP and 15HP outboard motors for sale from Yamaha, Suzuki, Honda, Mercury and Tohatsu. UK-wide delivery, PDI checked, from our Cowes base on the Solent.'
  },
  'high-horsepower': {
    title: 'High-Power Outboards 50HP-400HP+ | Solent Marine UK',
    description: '150HP and 60HP outboards for sale, plus the full 50HP-400HP+ range from Yamaha, Suzuki, Mercury and Honda for offshore and commercial craft. UK-wide delivery, PDI checked, from our Cowes base on the Solent.'
  },
  electric: {
    title: 'Electric Outboard Motors | Electric & Eco Outboards | Solent Marine UK',
    description: 'Shop electric outboard motors from ePropulsion, Torqeedo, TEMO, Haswing, Minn Kota and Blade Electric — zero-emission propulsion for tenders, kayaks and RIBs. UK-wide delivery from our Cowes base on the Solent.'
  },
  parts: {
    title: 'Outboard Spare Parts & Rigging | Yamaha & Mercury Genuine Parts | Solent Marine UK',
    description: 'Genuine Yamaha and Mercury outboard motor spare parts, oils, propellers and rigging hardware — UK-wide delivery, including regular supply across the Solent to Hamble, Hythe, Lymington, Portsmouth and Swanwick.'
  }
};

export function generateStaticParams() {
  return [...CATEGORIES.map((c) => ({ category: c.slug })), ...BRANDS.map((b) => ({ category: b.slug }))];
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category: slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);
  if (category) {
    const seo = CATEGORY_SEO[category.slug];
    return { ...seo, alternates: { canonical: `/shop/${category.slug}/` } };
  }
  const brand = BRANDS.find((b) => b.slug === slug);
  if (brand) {
    const seo = BRAND_SEO[brand.slug];
    return { ...seo, alternates: { canonical: `/shop/${brand.slug}/` } };
  }
  return {};
}

export default async function Page({ params }: { params: Promise<{ category: string }> }) {
  const { category: slug } = await params;
  const category = CATEGORIES.find((c) => c.slug === slug);
  const brand = !category ? BRANDS.find((b) => b.slug === slug) : undefined;
  if (!category && !brand) notFound();

  if (category) {
    const count = OUTBOARD_PRODUCTS.filter((p) => p.category.includes(category.slug as any)).length;
    const schema = [getShopBreadcrumbSchema(category), getShopCollectionSchema(category, count)];
    return (
      <>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        <ShopClient categorySlug={category.slug} />
      </>
    );
  }

  const count = OUTBOARD_PRODUCTS.filter((p) => p.brand.toLowerCase() === brand!.name.toLowerCase()).length;
  const schema = [
    getShopBreadcrumbSchema({ slug: brand!.slug, name: `${brand!.name} Outboards` }),
    getShopCollectionSchema({ slug: brand!.slug, name: `${brand!.name} Outboards`, description: brand!.description }, count)
  ];
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <ShopClient brandSlug={brand!.slug} />
    </>
  );
}
