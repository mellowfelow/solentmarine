/**
 * JSON-LD builders shared between route `page.tsx` server components. Centralised here (rather
 * than inline in each View component, as under the old client-side SEOHead injection) because
 * structured data now needs to be rendered server-side for it to be present in the initial HTML.
 */
import { SITE, CONTACT, BRAND, SHOP, POLICY, CATEGORIES } from '../config/site';
import { Product, BlogPost } from '../types';
import { getProductCopy, gbp } from './productCopy';

const ORIGIN = `https://${SITE.domain}`;
export const ORG_ID = `${ORIGIN}/#organization`;
export const WEBSITE_ID = `${ORIGIN}/#website`;

const returnPolicy = {
  '@type': 'MerchantReturnPolicy',
  applicableCountry: POLICY.returnCountry,
  returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
  merchantReturnDays: POLICY.returnDays,
  returnMethod: 'https://schema.org/ReturnByMail',
  returnFees: 'https://schema.org/ReturnShippingFees',
  merchantReturnLink: `${ORIGIN}/shipping/`
};

function shippingDetails(price: number) {
  return {
    '@type': 'OfferShippingDetails',
    shippingRate: { '@type': 'MonetaryAmount', value: price >= SHOP.freeShippingThreshold ? 0 : SHOP.shippingFee, currency: SITE.currency },
    shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'GB' },
    deliveryTime: {
      '@type': 'ShippingDeliveryTime',
      handlingTime: { '@type': 'QuantitativeValue', minValue: POLICY.handlingDaysMin, maxValue: POLICY.handlingDaysMax, unitCode: 'DAY' },
      transitTime: { '@type': 'QuantitativeValue', minValue: POLICY.transitDaysMin, maxValue: POLICY.transitDaysMax, unitCode: 'DAY' }
    }
  };
}

export function getHomeSchema(products: Product[], faqs: { question: string; answer: string }[] = []) {
  const prices = products.map((p) => p.priceGbp);
  const nodes: object[] = [
    {
      '@context': 'https://schema.org',
      '@type': ['Store', 'Organization'],
      '@id': ORG_ID,
      name: SITE.name,
      alternateName: SITE.shortName,
      description: BRAND.description,
      url: `${ORIGIN}/`,
      telephone: CONTACT.phoneInternational,
      email: CONTACT.email,
      foundingDate: BRAND.foundingYear,
      foundingLocation: { '@type': 'Place', name: BRAND.foundingLocation },
      areaServed: { '@type': 'Country', name: 'United Kingdom' },
      priceRange: `${gbp(Math.min(...prices))} - ${gbp(Math.max(...prices))}`,
      currenciesAccepted: 'GBP',
      paymentAccepted: 'Bank transfer',
      numberOfItems: products.length,
      knowsAbout: ['Outboard motors', 'Electric outboards', 'Yamaha outboards', 'Suzuki outboards', 'Honda outboards', 'Mercury outboards', 'Tohatsu outboards', 'Outboard spare parts', 'Marine propulsion'],
      sameAs: BRAND.sameAs,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Cowes Yacht Haven, High Street',
        addressLocality: 'Cowes',
        addressRegion: 'Isle of Wight',
        postalCode: 'PO31 7BD',
        addressCountry: 'GB'
      },
      logo: { '@type': 'ImageObject', url: `${ORIGIN}/apple-icon.png`, width: 180, height: 180 },
      image: `${ORIGIN}/images/og-home.jpg`,
      hasMerchantReturnPolicy: returnPolicy,
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'sales',
          telephone: CONTACT.phoneInternational,
          email: CONTACT.email,
          areaServed: 'GB',
          availableLanguage: 'en-GB'
        }
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': WEBSITE_ID,
      url: `${ORIGIN}/`,
      name: SITE.name,
      inLanguage: 'en-GB',
      publisher: { '@id': ORG_ID }
    }
  ];
  if (faqs.length > 0) {
    nodes.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } }))
    });
  }
  return nodes;
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
    url: category && category.slug ? `${ORIGIN}/shop/${category.slug}/` : `${ORIGIN}/shop/`,
    numberOfItems: itemCount
  };
}

export function getBlogIndexSchema(postCount: number) {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${ORIGIN}/` },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${ORIGIN}/blog/` }
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Outboard Motor Guides & Advice',
      description: 'Sizing guides, maintenance how-tos, and buying advice for outboard motors.',
      url: `${ORIGIN}/blog/`,
      numberOfItems: postCount
    }
  ];
}

export function getBlogPostSchema(post: BlogPost) {
  const postUrl = `${ORIGIN}/blog/${post.slug}/`;
  const schema: object[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      '@id': `${postUrl}#article`,
      mainEntityOfPage: postUrl,
      headline: post.title.slice(0, 110),
      description: post.metaDescription,
      datePublished: post.publishDate,
      dateModified: post.modifiedDate ?? post.publishDate,
      url: postUrl,
      inLanguage: 'en-GB',
      image: [`${ORIGIN}/images/og-home.jpg`],
      author: { '@type': 'Organization', '@id': ORG_ID, name: SITE.name, url: `${ORIGIN}/` },
      publisher: { '@type': 'Organization', '@id': ORG_ID, name: SITE.name, logo: { '@type': 'ImageObject', url: `${ORIGIN}/apple-icon.png` } }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${ORIGIN}/` },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${ORIGIN}/blog/` },
        { '@type': 'ListItem', position: 3, name: post.title, item: postUrl }
      ]
    }
  ];
  if (post.faq && post.faq.length > 0) {
    schema.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: post.faq.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } }))
    });
  }
  return schema;
}

export function getProductSchema(product: Product, reviewCount: number, avgRating: string | null) {
  const productUrl = `${ORIGIN}/product/${product.slug}/`;
  const copy = getProductCopy(product);
  const cat = CATEGORIES.find((c) => product.category.includes(c.slug as any));
  const images = (product.images && product.images.length ? product.images : [product.imageUrl]).map((u) => `${ORIGIN}${u}`);
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      '@id': `${productUrl}#product`,
      name: copy.h1,
      sku: product.sku || product.id,
      brand: { '@type': 'Brand', name: product.brand },
      description: copy.summary,
      image: images,
      url: productUrl,
      category: cat ? cat.name : product.category[0],
      ...(reviewCount > 0 && avgRating
        ? { aggregateRating: { '@type': 'AggregateRating', ratingValue: avgRating, reviewCount } }
        : {}),
      offers: {
        '@type': 'Offer',
        priceCurrency: SITE.currency,
        itemCondition: product.condition === 'used' ? 'https://schema.org/UsedCondition' : 'https://schema.org/NewCondition',
        price: product.priceGbp.toFixed(2),
        priceValidUntil: POLICY.priceValidUntil,
        availability: product.stockStatus === 'In Stock' ? 'https://schema.org/InStock' : 'https://schema.org/PreOrder',
        url: productUrl,
        seller: { '@type': 'Organization', '@id': ORG_ID, name: SITE.name },
        shippingDetails: shippingDetails(product.priceGbp),
        hasMerchantReturnPolicy: returnPolicy
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${ORIGIN}/` },
        { '@type': 'ListItem', position: 2, name: 'Shop', item: `${ORIGIN}/shop/` },
        ...(cat ? [{ '@type': 'ListItem', position: 3, name: cat.name, item: `${ORIGIN}/shop/${cat.slug}/` }] : []),
        { '@type': 'ListItem', position: cat ? 4 : 3, name: product.name, item: productUrl }
      ]
    }
  ];
}

export function getListingFaqSchema(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } }))
  };
}
