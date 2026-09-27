import { NextRequest, NextResponse } from 'next/server';
import { SITE, CONTACT, BRAND, CATEGORIES, BRANDS, FAQ } from './config/site';

export const config = {
  matcher: ['/', '/shop/', '/faq/', '/about/', '/contact/', '/brands/']
};

const ORIGIN = `https://${SITE.domain}`;

/**
 * Never a substring check — an agent that sends "Accept: text/html, text/markdown;q=0.9"
 * still prefers HTML (and gets the full page with its JSON-LD schema and complete content);
 * only serve markdown when its q genuinely exceeds text/html's, or text/html is absent.
 */
function prefersMarkdownOverHtml(accept: string): boolean {
  let mdQ = -1;
  let htmlQ = -1;
  for (const part of accept.split(',')) {
    const [type, ...params] = part.trim().split(';').map((s) => s.trim());
    let q = 1;
    for (const p of params) {
      const m = /^q=([\d.]+)$/.exec(p);
      if (m) q = parseFloat(m[1]);
    }
    if (type === 'text/markdown') mdQ = Math.max(mdQ, q);
    if (type === 'text/html') htmlQ = Math.max(htmlQ, q);
  }
  return mdQ > -1 && mdQ > htmlQ;
}

function homeMarkdown(): string {
  return `# ${SITE.name}

> ${BRAND.description}

## About
- **Founded:** ${BRAND.foundingYear} in ${BRAND.foundingLocation}
- **Contact:** [${CONTACT.email}](mailto:${CONTACT.email}) | ${CONTACT.phone} | WhatsApp: ${CONTACT.whatsappDisplay}
- **Address:** ${CONTACT.address}

## Categories
${CATEGORIES.map((c) => `- [${c.name}](${ORIGIN}/shop/${c.slug}/): ${c.description}`).join('\n')}

## Brands
${BRANDS.map((b) => `- [${b.name}](${ORIGIN}/shop/${b.slug}/): ${b.description}`).join('\n')}

## Key Pages
- [Full Catalog](${ORIGIN}/shop/)
- [FAQ](${ORIGIN}/faq/)
- [About](${ORIGIN}/about/)
- [Contact](${ORIGIN}/contact/)
`;
}

function shopMarkdown(): string {
  return `# ${SITE.name} — Outboard Motors Catalog

> Full UK outboard motor stock directory across ${CATEGORIES.length} categories.

## Categories
${CATEGORIES.map((c) => `- [${c.name}](${ORIGIN}/shop/${c.slug}/): ${c.description}`).join('\n')}

## Brands
${BRANDS.map((b) => `- [${b.name}](${ORIGIN}/shop/${b.slug}/): ${b.description}`).join('\n')}
`;
}

function faqMarkdown(): string {
  return `# ${SITE.name} — Frequently Asked Questions

${FAQ.map((f) => `## ${f.question}\n${f.answer}`).join('\n\n')}
`;
}

function aboutMarkdown(): string {
  return `# About ${SITE.name}

> ${BRAND.description}

## Milestones
${BRAND.milestones.map((m) => `- **${m.year}:** ${m.event}`).join('\n')}

## What Makes Us Different
${BRAND.differentiation.map((d) => `- ${d}`).join('\n')}
`;
}

function contactMarkdown(): string {
  return `# Contact ${SITE.name}

- **Email:** [${CONTACT.email}](mailto:${CONTACT.email})
- **Phone:** ${CONTACT.phone}
- **WhatsApp:** ${CONTACT.whatsappDisplay}
- **Address:** ${CONTACT.address}
`;
}

function brandsMarkdown(): string {
  return `# ${SITE.name} — Shop by Brand

${BRANDS.map((b) => `## [${b.name}](${ORIGIN}/shop/${b.slug}/)\n${b.description}`).join('\n\n')}
`;
}

const MARKDOWN_BY_PATH: Record<string, () => string> = {
  '/': homeMarkdown,
  '/shop/': shopMarkdown,
  '/faq/': faqMarkdown,
  '/about/': aboutMarkdown,
  '/contact/': contactMarkdown,
  '/brands/': brandsMarkdown
};

export function middleware(request: NextRequest) {
  const accept = request.headers.get('accept') || '';
  const generator = MARKDOWN_BY_PATH[request.nextUrl.pathname];

  if (generator && prefersMarkdownOverHtml(accept)) {
    return new NextResponse(generator(), {
      headers: { 'Content-Type': 'text/markdown; charset=utf-8' }
    });
  }

  return NextResponse.next();
}
