# PROJECT.md — Solent Marine Outboards UK

**Domain:** https://solentmarineoutboards.co.uk · **Target:** Vercel (Next.js 15, App Router) · **Reply Portal:** on (Upstash + SMTP) · **Backend CMS:** none.

## Business facts (owner-confirmed 17 Nov 2026, kept on the site)
| Fact | Source / status |
|---|---|
| Founded 2011, Cowes, Isle of Wight | Owner confirmed |
| Authorised Yamaha Marine and Suzuki Outboards UK dealer since 2016 | Owner confirmed ("all true, keep them") |
| Award: South Coast Marine Dealer Customer Excellence 2023; British Marine Federation member #BM-49021; UK Company No. 09842114; VAT GB 294 4001 98 | Owner confirmed; keep proof on file |
| Customer reviews: 4.7 / 3,642 verified, 104 historical low ratings (data in `src/data/reviewsData.ts`) | Owner states these are real and migrated from the previous website. **Action:** link the review platform (profile URL) next to the stats so they are verifiable. |
| Address | **Cowes Yacht Haven, High Street, Cowes, Isle of Wight, PO31 7BD** (owner chose this over Shepard's Wharf; footer, contact and About updated) |
| Contact | 07577 298720 (WhatsApp + phone), sales@solentmarineoutboards.co.uk |
| Order rules | Min order £150 · free UK mainland delivery over £500, else £25 · bank transfer (BACS/Faster Payments) only · 14-day cooling-off |
| Finance | **Not offered.** Finance copy and the FCA badge were removed on 17 Nov 2026. |

## Decisions
- AI training allowed (`Content-Signal: search=yes, ai-input=yes, ai-train=yes`).
- Only four trust statements remain unverifiable by code (reviews, award, BMF, company number): keep supporting evidence available for Google/ASA/CMA requests.
- Product specs: the catalogue fields weight, fuel system, starter and control are category-typical placeholders. Product copy and schema therefore do not assert them. Replace with manufacturer data before re-introducing them.

## SEO architecture
- Single source: `src/config/site.ts`. Per-page content: `src/data/listingContent.ts` (shop/category/brand), `src/lib/productCopy.ts` (products), `src/data/postBodies*.ts` (blog), `src/data/homeContent.ts`.
- Sitemap per-page `lastmod` in `src/data/lastmod.ts` — bump a page only when its content changes.
- Agent layer: `llms.txt` and `llms-full.txt` are generated routes; markdown negotiation in `src/middleware.ts` + `src/lib/markdown.ts`.
- Keyword map: `docs/keyword-map.md` (v3, Semrush UK, 17 Nov 2026). Audit: `docs/AUDIT-2026-11-17.md`.
