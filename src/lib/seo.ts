const SUFFIX = ' | Solent Marine UK';

function cut(text: string, max: number): string {
  if (text.length <= max) return text;
  const slice = text.slice(0, max + 1);
  const at = slice.lastIndexOf(' ');
  return slice.slice(0, at > max * 0.6 ? at : max).replace(/[\s,;:|–—-]+$/, '');
}

/** Title ≤60 chars: keeps the brand suffix only when it fits, never truncates mid-word. */
export function fitTitle(main: string, max = 60): string {
  const bare = main.replace(SUFFIX, '').trim();
  return bare.length + SUFFIX.length <= max ? bare + SUFFIX : cut(bare, max);
}

/** Meta description ≤158 chars, cut at a word boundary. */
export function fitDesc(text: string, max = 158): string {
  return cut(text.replace(/\s+/g, ' ').trim(), max);
}

/** "Yamaha Yamalube 4M" stays as is; "F2.5BMHS" becomes "Yamaha F2.5BMHS". */
export function nameWithBrand(name: string, brand: string): string {
  return name.toLowerCase().startsWith(brand.toLowerCase()) ? name : `${brand} ${name}`;
}

/** Card-sized (480px) variant of a product photo; falls back to the original for placeholders. */
export function thumbUrl(url: string): string {
  return url.startsWith('/images/products/') && url.endsWith('.webp') ? url.replace('/images/products/', '/images/products/thumbs/') : url;
}
