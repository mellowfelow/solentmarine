import { SITE } from '../../config/site';
import { OUTBOARD_PRODUCTS } from '../../data/products';
import { BLOG_POSTS } from '../../data/posts';
import { homeMarkdown, productMarkdown, blogMarkdown, faqMarkdown, aboutMarkdown } from '../../lib/markdown';

export const dynamic = 'force-static';

export function GET() {
  const parts = [
    `# ${SITE.name} — full content for language models`,
    homeMarkdown(),
    aboutMarkdown(),
    faqMarkdown(),
    ...BLOG_POSTS.map((p) => blogMarkdown(p.slug)),
    ...OUTBOARD_PRODUCTS.map((p) => productMarkdown(p.slug))
  ].filter(Boolean);
  return new Response(parts.join('\n\n---\n\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600', 'Access-Control-Allow-Origin': '*' }
  });
}
