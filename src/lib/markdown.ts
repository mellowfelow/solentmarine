/**
 * Plain-markdown renderings of key pages, served when an agent sends `Accept: text/markdown`
 * (see src/middleware.ts) and reused to build /llms-full.txt.
 */
import { SITE, CONTACT, BRAND, CATEGORIES, BRANDS, SHOP, FAQ } from '../config/site';
import { OUTBOARD_PRODUCTS } from '../data/products';
import { BLOG_POSTS } from '../data/posts';
import { getProductCopy, gbp } from './productCopy';

const ORIGIN = `https://${SITE.domain}`;

export function htmlToMarkdown(html: string): string {
  return html
    .replace(/<h2[^>]*>([\s\S]*?)<\/h2>/gi, '\n\n## $1\n\n')
    .replace(/<h3[^>]*>([\s\S]*?)<\/h3>/gi, '\n\n### $1\n\n')
    .replace(/<a [^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/gi, (_m, href, text) => `[${text.replace(/<[^>]+>/g, '')}](${href.startsWith('/') ? ORIGIN + href : href})`)
    .replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, '\n- $1')
    .replace(/<tr[^>]*>([\s\S]*?)<\/tr>/gi, (_m, row) => '\n| ' + row.replace(/<\/t[hd]>\s*<t[hd][^>]*>/gi, ' | ').replace(/<[^>]+>/g, '').trim() + ' |')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/&pound;/g, '£').replace(/&apos;|&#39;/g, "'").replace(/&quot;/g, '"')
    .replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n')
    .trim();
}

export function productMarkdown(slug: string): string | null {
  const p = OUTBOARD_PRODUCTS.find((x) => x.slug === slug);
  if (!p) return null;
  const c = getProductCopy(p);
  return `# ${c.h1}

> ${c.summary}

- **Price:** ${gbp(p.priceGbp)} including VAT
- **Brand:** ${p.brand}
- **Availability:** ${p.stockStatus}
- **UK warranty:** ${p.specs.warrantyYears} years
- **URL:** ${ORIGIN}/product/${p.slug}/

## About
${c.paragraphs.join('\n\n')}

## ${c.chooseHeading}
${c.chooseBullets.map((b) => `- ${b}`).join('\n')}

## FAQs
${c.faqs.map((f) => `### ${f.q}\n${f.a}`).join('\n\n')}
`;
}

export function listingMarkdown(slug: string): string | null {
  const cat = CATEGORIES.find((c) => c.slug === slug);
  const brand = BRANDS.find((b) => b.slug === slug);
  if (!cat && !brand) return null;
  const items = cat
    ? OUTBOARD_PRODUCTS.filter((p) => p.category.includes(cat.slug as any))
    : OUTBOARD_PRODUCTS.filter((p) => p.brand.toLowerCase() === brand!.name.toLowerCase());
  const name = cat ? cat.name : `${brand!.name} Outboards`;
  const desc = cat ? cat.description : brand!.description;
  return `# ${name}

> ${desc}

${items.map((p) => `- [${p.name}](${ORIGIN}/product/${p.slug}/): ${gbp(p.priceGbp)} inc. VAT`).join('\n')}
`;
}

export function blogMarkdown(slug: string): string | null {
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return null;
  const faq = (post.faq || []).map((f) => `### ${f.question}\n${f.answer}`).join('\n\n');
  return `# ${post.title}

> ${post.metaDescription}

${htmlToMarkdown(post.bodyHtml)}
${faq ? `\n## FAQs\n${faq}\n` : ''}
Published ${post.publishDate}${post.modifiedDate ? `, updated ${post.modifiedDate}` : ''}. Source: ${ORIGIN}/blog/${post.slug}/
`;
}

export function blogIndexMarkdown(): string {
  return `# ${SITE.name} — Outboard Motor Guides & Advice

${BLOG_POSTS.map((p) => `- [${p.title}](${ORIGIN}/blog/${p.slug}/): ${p.metaDescription}`).join('\n')}
`;
}

export function homeMarkdown(): string {
  return `# ${SITE.name}

> ${BRAND.description}

## About
- **Contact:** [${CONTACT.email}](mailto:${CONTACT.email}) | ${CONTACT.phone} | WhatsApp: ${CONTACT.whatsappDisplay}
- **Address:** ${CONTACT.address}
- **Minimum order:** £${SHOP.minOrder} · **Free UK mainland delivery over:** £${SHOP.freeShippingThreshold} · **Payment:** UK bank transfer

## Categories
${CATEGORIES.map((c) => `- [${c.name}](${ORIGIN}/shop/${c.slug}/): ${c.description}`).join('\n')}

## Brands
${BRANDS.map((b) => `- [${b.name}](${ORIGIN}/shop/${b.slug}/): ${b.description}`).join('\n')}

## Guides
${BLOG_POSTS.slice(0, 8).map((p) => `- [${p.title}](${ORIGIN}/blog/${p.slug}/)`).join('\n')}
`;
}

export function shopMarkdown(): string {
  return `# ${SITE.name} — Outboard Engines for Sale (Full UK Stock)

${CATEGORIES.map((c) => `## [${c.name}](${ORIGIN}/shop/${c.slug}/)\n${OUTBOARD_PRODUCTS.filter((p) => p.category.includes(c.slug as any)).map((p) => `- [${p.name}](${ORIGIN}/product/${p.slug}/): ${gbp(p.priceGbp)}`).join('\n')}`).join('\n\n')}
`;
}

export function faqMarkdown(): string {
  return `# ${SITE.name} — Frequently Asked Questions

${FAQ.map((f) => `## ${f.question}\n${f.answer}`).join('\n\n')}
`;
}

export function aboutMarkdown(): string {
  return `# About ${SITE.name}

> ${BRAND.description}

## Milestones
${BRAND.milestones.map((m) => `- **${m.year}:** ${m.event}`).join('\n')}

## What makes us different
${BRAND.differentiation.map((d) => `- ${d}`).join('\n')}
`;
}

export function contactMarkdown(): string {
  return `# Contact ${SITE.name}

- **Email:** [${CONTACT.email}](mailto:${CONTACT.email})
- **Phone / WhatsApp:** ${CONTACT.phone}
- **Address:** ${CONTACT.address}
`;
}

export function brandsMarkdown(): string {
  return `# ${SITE.name} — Outboard Motor Brands

${BRANDS.map((b) => `## [${b.name}](${ORIGIN}/shop/${b.slug}/)\n${b.description}`).join('\n\n')}
`;
}

/** Markdown for a pathname, or null when the route has no markdown rendering. */
export function markdownForPath(pathname: string): string | null {
  if (pathname === '/') return homeMarkdown();
  if (pathname === '/shop/') return shopMarkdown();
  if (pathname === '/faq/') return faqMarkdown();
  if (pathname === '/about/') return aboutMarkdown();
  if (pathname === '/contact/') return contactMarkdown();
  if (pathname === '/brands/') return brandsMarkdown();
  if (pathname === '/blog/') return blogIndexMarkdown();
  let m = pathname.match(/^\/product\/([^/]+)\/$/);
  if (m) return productMarkdown(m[1]);
  m = pathname.match(/^\/shop\/([^/]+)\/$/);
  if (m) return listingMarkdown(m[1]);
  m = pathname.match(/^\/blog\/([^/]+)\/$/);
  if (m) return blogMarkdown(m[1]);
  return null;
}
