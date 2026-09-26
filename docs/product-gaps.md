# Product & Structural Gap Analysis — Solent Marine Outboards UK

## Gap 1 — Brand hub pages (T1 priority, largest finding)

**The single biggest opportunity in this keyword set.** No `/shop/[brand]/` pages exist — the site's category structure is entirely HP-tier-based (portable/mid-range/high-horsepower/electric/parts). But a huge volume of search demand is brand-first, not HP-first: someone searching "yamaha outboards" wants to browse everything Yamaha, not pick an HP band first.

| Proposed URL | Primary keyword (Transactional/Commercial only) | Combined cluster volume/mo | Keywords in cluster |
|---|---|---|---|
| `/shop/yamaha/` | yamaha outboards (880, Transactional) | **13,730** | 70 |
| `/shop/mercury/` | mercury outboards (390, Informational+Transactional) | **10,510** | 77 |
| `/shop/honda/` | honda outboards (590, Informational+Transactional) | **6,230** | 27 |
| `/shop/suzuki/` | suzuki outboard engine (Commercial) | **6,040** | 39 |
| `/shop/tohatsu/` | — no qualifying T/C keyword ≥Vol50 | 70 | 1 |
| `/shop/epropulsion/` | e propulsion (140, Navigational only) | 140 | 1 |

*(Corrected from v1, which had picked "mercury motors" and "yamaha outboards" without checking whether a cleaner Transactional/Commercial phrase existed — see `keyword-map.md` v2 for the full secondary-keyword lists per brand.)*

**Combined: ~36,720/mo across 4 real brand-hub candidates — more than double the volume of any single HP-tier category.**

**Implementation:** technically straightforward given the existing architecture — `ShopView.tsx` already supports a `categorySlug` prop and category-scoped filtering; a parallel `brandSlug` prop (or a unified `/shop/[filter]/` dynamic segment distinguishing brand vs HP-tier by a lookup table) would let these render from the same component. `generateStaticParams` would add 4–6 more paths, consistent with how `/shop/[category]/` already works. Each brand page would need:
- A short brand-specific intro paragraph (real facts only — dealer status, which HP ranges we stock for that brand)
- Products filtered to `product.brand === brand`
- Its own `generateMetadata` (title: `"${brand} Outboards | Shop UK Stock | Solent Marine UK"`)
- BreadcrumbList + CollectionPage schema (same pattern as category pages)

**Priority: T1.** Lowest KD in the entire primary pool for its volume (Yamaha KD28, Mercury KD22, Honda KD25, Suzuki KD18), all Vol 590+.

---

## Gap 2 — No blog exists

**26 distinct content clusters** (20 prioritised to build first, 6 backlogged) are currently unaddressable because there's no `/blog/` route — see `blog-plan.md` v2 for the full list, including a rich vein of how-to/support content (winterizing, flushing, starting procedure, serial-number identification — 520/mo alone, mostly KD 0/uncompeted) that only surfaced once the full 11,149-keyword dataset was mined rather than just the Vol 50+ page-building pool. This isn't a content gap so much as a structural one — see `blog-plan.md` for the full build note (mirrors the existing `/product/[slug]/` pattern with a new `src/data/posts.ts`).

---

## Gap 3 — Local Solent-area content (small but genuine)

Not a new page — an enhancement to `/shop/parts/`. Five keywords (350/mo combined) specifically search for Mercury spare parts in Hamble, Hythe, Lymington, Portsmouth, and Swanwick — all real Solent marinas, geographically consistent with the business's actual Cowes, Isle of Wight base. Add one paragraph naming these delivery areas explicitly. See `faq-bank.md` for a matching FAQ entry. **This is real and verifiable** (the business genuinely serves this area) — not a fabricated local-SEO claim.

---

## Non-gaps (checked, no action needed)

- **Product-level long-tail (exact model number searches):** only 4 keywords across the entire 789-keyword workable pool matched a specific product by brand+model code (e.g. "epropulsion spirit 1.0", "400r mercury outboard"). This is expected and normal — exact-SKU search volume is inherently low/long-tail for this category; category and brand pages carry the real ranking weight, individual product pages earn traffic primarily through internal linking and direct/branded visits, not head-term search volume. No new products need to be added to the catalog based on this keyword data.
- **"Used"/"second-hand" outboards:** real search volume (45 keywords, several 260–480/mo) but explicitly out of scope — the business sells new stock only, and building pages to rank for "used outboard motors" while selling only new inventory would be a false-advertising risk under ASA rules. Correctly excluded, not a gap.
- **Local service/repair "near me":** real volume (24 keywords) but the business has no walk-in service bay — attempting to rank a Local Pack listing for "outboard motor repair near me" without a genuine serviceable location risks a Google Business Profile suspension. Correctly excluded.
