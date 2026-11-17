/**
 * Honest per-page <lastmod> dates for sitemap.xml. Bump a page's date ONLY when its content
 * actually changes — identical dates across the whole sitemap tell crawlers nothing.
 */
export const LASTMOD_DEFAULT = '2026-11-17';

export const LASTMOD_STATIC: Record<string, string> = {
  '/privacy/': '2026-10-16',
  '/terms/': '2026-10-16',
};

export function lastmodFor(path: string): string {
  return LASTMOD_STATIC[path] ?? LASTMOD_DEFAULT;
}
