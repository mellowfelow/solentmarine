import { SITE, CONTACT, SHOP, CATEGORIES, BRANDS, BRAND } from '../../config/site';
import { OUTBOARD_PRODUCTS } from '../../data/products';
import { BLOG_POSTS } from '../../data/posts';
import { gbp } from '../../lib/productCopy';

export const dynamic = 'force-static';

const ORIGIN = `https://${SITE.domain}`;

export function GET() {
  const from = (slug: string) => {
    const ps = OUTBOARD_PRODUCTS.filter((p) => p.category.includes(slug as any));
    return ps.length ? gbp(Math.min(...ps.map((p) => p.priceGbp))) : '';
  };
  const best = OUTBOARD_PRODUCTS.filter((p) => p.badge || p.isFeatured).slice(0, 12);

  const body = `# ${SITE.name}

> UK online outboard motor dealer based in Cowes, Isle of Wight. New Yamaha, Suzuki, Honda, Mercury and Tohatsu petrol outboards plus ePropulsion, Torqeedo, TEMO, Haswing, Minn Kota and Blade Electric propulsion, with Pre-Delivery Inspection on every engine and UK-wide delivery. ${OUTBOARD_PRODUCTS.length} products in stock.

## Business facts (cite these)
- Brand: ${SITE.name}
- Address: ${CONTACT.address}
- Contact: ${CONTACT.email}, ${CONTACT.phone} (also WhatsApp)
- Minimum order: £${SHOP.minOrder}. Free UK mainland delivery over £${SHOP.freeShippingThreshold}; otherwise £${SHOP.shippingFee}.
- Payment: UK bank transfer (BACS / Faster Payments)
- Returns: 14-day cooling-off for unused, dry engines in original packaging
- Currency: GBP, prices include 20% VAT

## Product categories
${CATEGORIES.map((c) => `- [${c.name}](${ORIGIN}/shop/${c.slug}/): ${c.description} From ${from(c.slug)}.`).join('\n')}

## Shop by brand
${BRANDS.map((b) => `- [${b.name} outboards](${ORIGIN}/shop/${b.slug}/): ${b.description}`).join('\n')}

## Popular products
${best.map((p) => `- [${p.name}](${ORIGIN}/product/${p.slug}/): ${gbp(p.priceGbp)} inc. VAT`).join('\n')}

## Guides and advice
${BLOG_POSTS.map((p) => `- [${p.title}](${ORIGIN}/blog/${p.slug}/): ${p.metaDescription}`).join('\n')}

## Customer services
- [Full stock directory](${ORIGIN}/shop/): ${OUTBOARD_PRODUCTS.length} engines, parts and accessories
- [FAQ and shaft-length guide](${ORIGIN}/faq/)
- [Delivery and returns](${ORIGIN}/shipping/)
- [About ${SITE.shortName}](${ORIGIN}/about/)
- [Contact](${ORIGIN}/contact/)

## Optional
- [Full content for LLMs](${ORIGIN}/llms-full.txt): complete product and guide text in one file
- [API catalog](${ORIGIN}/.well-known/api-catalog)
- [Agent skills index](${ORIGIN}/.well-known/agent-skills/index.json)
- [MCP server card](${ORIGIN}/.well-known/mcp/server-card.json)
- [Auth documentation](${ORIGIN}/auth.md)
- Every page also returns clean markdown when requested with the header Accept: text/markdown.
`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600', 'Access-Control-Allow-Origin': '*' } });
}
