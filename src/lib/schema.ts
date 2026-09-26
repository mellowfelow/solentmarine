/**
 * JSON-LD builders shared between route `page.tsx` server components. Centralised here (rather
 * than inline in each View component, as under the old client-side SEOHead injection) because
 * structured data now needs to be rendered server-side for it to be present in the initial HTML.
 */
import { SITE, CONTACT, BRAND } from '../config/site';
import { TRUSTPILOT_STATS } from '../data/reviewsData';
import { Product } from '../types';

const ORIGIN = `https://${SITE.domain}`;

export function getHomeSchema(products: Product[]) {
  return {
    '@context': 'https://schema.org',
    '@type': ['Store', 'Organization'],
    name: SITE.name,
    description: BRAND.description,
    url: `${ORIGIN}/`,
    telephone: CONTACT.phoneInternational,
    email: CONTACT.email,
    foundingDate: BRAND.foundingYear,
    areaServed: 'GB',
    priceRange: `£${Math.min(...products.map((p) => p.priceGbp)).toLocaleString('en-GB')} - £${Math.max(...products.map((p) => p.priceGbp)).toLocaleString('en-GB')}`,
    numberOfItems: products.length,
    sameAs: BRAND.sameAs,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Cowes Yacht Haven, High Street',
      addressLocality: 'Cowes, Isle of Wight',
      postalCode: 'PO31 7BD',
      addressCountry: 'GB'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: String(TRUSTPILOT_STATS.averageRating),
      bestRating: '5',
      worstRating: '1',
      ratingCount: String(TRUSTPILOT_STATS.totalReviews)
    }
  };
}

export function getShopBreadcrumbSchema(category?: { slug: string; name: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${ORIGIN}/` },
      { '@type': 'ListItem', position: 2, name: 'Shop', item: `${ORIGIN}/shop/` },
      ...(category
        ? [{ '@type': 'ListItem', position: 3, name: category.name, item: `${ORIGIN}/shop/${category.slug}/` }]
        : [])
    ]
  };
}

export function getShopCollectionSchema(category: { slug: string; name: string; description: string } | undefined, itemCount: number) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: category ? category.name : 'Outboard Motor Shop',
    description: category ? category.description : 'Full UK outboard motor stock directory.',
    url: category ? `${ORIGIN}/shop/${category.slug}/` : `${ORIGIN}/shop/`,
    numberOfItems: itemCount
  };
}

export function getProductSchema(product: Product, reviewCount: number, avgRating: string | null) {
  const productUrl = `${ORIGIN}/product/${product.slug}/`;
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      sku: product.sku,
      brand: { '@type': 'Brand', name: product.brand },
      description: product.description,
      image: `${ORIGIN}${product.imageUrl}`,
      url: productUrl,
      category: product.subcategories?.[0] || product.category[0],
      ...(reviewCount > 0 && avgRating
        ? { aggregateRating: { '@type': 'AggregateRating', ratingValue: avgRating, reviewCount } }
        : {}),
      offers: {
        '@type': 'Offer',
        priceCurrency: SITE.currency,
        price: product.priceGbp,
        availability: product.stockStatus === 'In Stock' ? 'https://schema.org/InStock' : 'https://schema.org/PreOrder',
        url: productUrl,
        seller: { '@type': 'Organization', name: SITE.name }
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${ORIGIN}/` },
        { '@type': 'ListItem', position: 2, name: 'Shop', item: `${ORIGIN}/shop/` },
        { '@type': 'ListItem', position: 3, name: product.name, item: productUrl }
      ]
    }
  ];
}
