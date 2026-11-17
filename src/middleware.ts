import { NextRequest, NextResponse } from 'next/server';
import { markdownForPath } from './lib/markdown';

export const config = {
  matcher: ['/', '/shop/', '/shop/:slug/', '/product/:slug/', '/blog/', '/blog/:slug/', '/faq/', '/about/', '/contact/', '/brands/']
};

/**
 * Never a substring check: an agent that sends "Accept: text/html, text/markdown;q=0.9" still
 * prefers HTML (and gets the full page with JSON-LD); only serve markdown when its q genuinely
 * exceeds text/html's, or text/html is absent.
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

export function middleware(request: NextRequest) {
  const accept = request.headers.get('accept') || '';
  if (prefersMarkdownOverHtml(accept)) {
    const md = markdownForPath(request.nextUrl.pathname);
    if (md) {
      return new NextResponse(md, {
        headers: { 'Content-Type': 'text/markdown; charset=utf-8', Vary: 'Accept', 'x-markdown-tokens': String(Math.ceil(md.length / 4)) }
      });
    }
  }
  return NextResponse.next();
}
