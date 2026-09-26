import type { MetadataRoute } from 'next';
import { SITE, CATEGORIES, BRANDS } from '../config/site';
import { OUTBOARD_PRODUCTS } from '../data/products';
import { BLOG_POSTS } from '../data/posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = `https://${SITE.domain}`;
  const today = new Date().toISOString().split('T')[0];

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${origin}/`, lastModified: today, changeFrequency: 'daily', priority: 1.0 },
    { url: `${origin}/shop/`, lastModified: today, changeFrequency: 'daily', priority: 0.9 },
    { url: `${origin}/blog/`, lastModified: today, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${origin}/about/`, lastModified: today, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${origin}/faq/`, lastModified: today, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${origin}/shipping/`, lastModified: today, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${origin}/contact/`, lastModified: today, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${origin}/privacy/`, lastModified: today, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${origin}/terms/`, lastModified: today, changeFrequency: 'monthly', priority: 0.3 }
  ];

  const categoryPages: MetadataRoute.Sitemap = CATEGORIES.map((c) => ({
    url: `${origin}/shop/${c.slug}/`,
    lastModified: today,
    changeFrequency: 'weekly',
    priority: 0.8
  }));

  const brandPages: MetadataRoute.Sitemap = BRANDS.map((b) => ({
    url: `${origin}/shop/${b.slug}/`,
    lastModified: today,
    changeFrequency: 'weekly',
    priority: 0.8
  }));

  const productPages: MetadataRoute.Sitemap = OUTBOARD_PRODUCTS.map((p) => ({
    url: `${origin}/product/${p.slug}/`,
    lastModified: today,
    changeFrequency: 'weekly',
    priority: p.isFeatured ? 0.85 : 0.6
  }));

  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map((p) => ({
    url: `${origin}/blog/${p.slug}/`,
    lastModified: p.publishDate,
    changeFrequency: 'monthly',
    priority: 0.7
  }));

  return [...staticPages, ...categoryPages, ...brandPages, ...productPages, ...blogPages];
}
