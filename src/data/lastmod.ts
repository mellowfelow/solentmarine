/**
 * Honest per-page <lastmod> dates for sitemap.xml. Bump a page's date ONLY when its content
 * actually changes — identical dates across the whole sitemap tell crawlers nothing.
 */
export const LASTMOD_DEFAULT = '2026-11-17';

export const LASTMOD_STATIC: Record<string, string> = {
  '/privacy/': '2026-10-16',
  '/terms/': '2026-10-16',
  // v4 keyword map applied 19 Nov 2026 — only the pages whose on-page copy changed
  '/': '2026-11-21',
  '/shop/': '2026-11-21',
  '/shop/mid-range/': '2026-11-19',
  '/shop/parts/': '2026-11-19',
  '/shop/tohatsu/': '2026-11-19',
  '/shop/epropulsion/': '2026-11-19',
  '/shop/mercury/': '2026-11-21',
  '/shop/honda/': '2026-11-19',
  // Used outboards category added 21 Nov 2026
  '/shop/used/': '2026-11-21',
  '/shop/yamaha/': '2026-11-21',
  '/shop/suzuki/': '2026-11-21',
};

export function lastmodFor(path: string): string {
  return LASTMOD_STATIC[path] ?? LASTMOD_DEFAULT;
}
