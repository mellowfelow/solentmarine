import type { MetadataRoute } from 'next';
import { SITE, CATEGORIES, BRANDS } from '../config/site';
import { OUTBOARD_PRODUCTS } from '../data/products';
import { BLOG_POSTS } from '../data/posts';
import { lastmodFor } from '../data/lastmod';

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = `https://${SITE.domain}`;
  const entry = (
    path: string,
    changeFrequency: 'daily' | 'weekly' | 'monthly',
    priority: number,
    lastModified?: string,
    images?: string[]
  ) => ({
    url: `${origin}${path}`,
    lastModified: lastModified ?? lastmodFor(path),
    changeFrequency,
    priority,
    ...(images && images.length ? { images } : {})
  });

  const staticPages: MetadataRoute.Sitemap = [
    entry('/', 'daily', 1.0, undefined, [`${origin}/images/hero/hero-yamaha-200-rib.jpg`]),
    entry('/shop/', 'daily', 0.9),
    entry('/brands/', 'weekly', 0.8),
    entry('/blog/', 'weekly', 0.8),
    entry('/about/', 'monthly', 0.6),
    entry('/faq/', 'monthly', 0.7),
    entry('/shipping/', 'monthly', 0.6),
    entry('/contact/', 'monthly', 0.6),
    entry('/privacy/', 'monthly', 0.3),
    entry('/terms/', 'monthly', 0.3)
  ];

  const categoryPages = CATEGORIES.map((c) => entry(`/shop/${c.slug}/`, 'weekly', 0.8));
  const brandPages = BRANDS.map((b) => entry(`/shop/${b.slug}/`, 'weekly', 0.8));

  const productPages = OUTBOARD_PRODUCTS.map((p) =>
    entry(
      `/product/${p.slug}/`,
      'weekly',
      p.isFeatured ? 0.85 : 0.6,
      undefined,
      (p.images && p.images.length ? p.images : [p.imageUrl])
        .filter((u) => u.startsWith('/images/products/'))
        .map((u) => `${origin}${u}`)
    )
  );

  const blogPages = BLOG_POSTS.map((p) => entry(`/blog/${p.slug}/`, 'monthly', 0.7, p.modifiedDate ?? p.publishDate));

  return [...staticPages, ...categoryPages, ...brandPages, ...productPages, ...blogPages];
}
