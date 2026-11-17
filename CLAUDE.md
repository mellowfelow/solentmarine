# Solent Marine Outboards UK — project instructions

Next.js 15 (App Router) ecommerce site, deployed to Vercel from GitHub. Domain lives only in `SITE.domain` (`src/config/site.ts`).

## Rules
- `npx tsc --noEmit` and `npx next build` must pass before every push.
- Never invent brand facts, reviews or specs. Owner-confirmed facts are listed in `docs/PROJECT.md`. Do not state weight, fuel system, starter or cylinder data for products: the catalogue values are placeholders.
- No financing, no card payments: bank transfer only; min order £150; free UK mainland delivery over £500 else £25.
- Exactly one `<h1>` per page. Titles ≤60 chars, descriptions 110–158. One primary keyword per URL (see `docs/keyword-map.md`).
- Adding a product: edit `src/data/products.ts`; copy, schema, sitemap, markdown and llms files regenerate from it.
- When page content changes, bump that page in `src/data/lastmod.ts` (never blanket-update).
- Strategy docs stay in `docs/` and are never deployed.
- `middleware.ts` returns markdown for `Accept: text/markdown` only; it must never alter normal HTML responses. (Local `next start` on Windows/Node 24 returns empty bodies for middleware-matched routes; verify middleware on a Vercel preview, not locally.)
