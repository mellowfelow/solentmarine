/**
 * Maps the app's old view/params navigation convention onto real Next.js routes, so the existing
 * View components (which all call `onNavigate(view, params)`) don't need to be rewritten to use
 * next/link directly — only the function they call changes, from a pushState shim to router.push.
 */
export function pathForView(view: string, params: Record<string, string> = {}): string {
  if (view === 'home') return '/';
  if (view === 'product-details' && params.slug) return `/product/${params.slug}/`;
  if (view === 'shop-category' && params.slug) return `/shop/${params.slug}/`;
  if (view === 'blog-post' && params.slug) return `/blog/${params.slug}/`;
  return `/${view}/`;
}

export function viewForPath(pathname: string): string {
  if (pathname === '/' || pathname === '') return 'home';
  if (pathname.startsWith('/product/')) return 'product-details';
  if (pathname.startsWith('/shop/') && pathname.length > 6) return 'shop-category';
  if (pathname.startsWith('/blog/') && pathname.length > 6) return 'blog-post';
  const view = pathname.replace(/^\//, '').replace(/\/$/, '');
  return view || 'home';
}
