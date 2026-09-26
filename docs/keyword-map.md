# Keyword Map — Solent Marine Outboards UK (v2 — corrected)

**Source:** 15 raw Semrush UK keyword exports, deduplicated across overlapping batches.
**Generated:** 2026-09-26 · **Revised:** same day, after correcting the page-mapping intent-priority rule.

## What changed from v1

v1 picked category-page primary keywords by raw volume, which let **Informational** keywords win primary/secondary slots on sales pages (e.g. `/shop/portable/` primary was "6hp outboard engine," Informational). That's wrong: **Transactional and Commercial intent are the only priority tiers for primary/secondary on a page that has to sell something** (category pages, brand hubs, the shop hub, product pages). Informational and Navigational keywords are for **blog posts, FAQ entries, and brand-hub discovery** — never a category-page primary, regardless of volume. This version enforces that rule everywhere below. It also adds the per-product table and full FAQ mining that v1 was missing.

## Pipeline summary

| Stage | Count |
|---|---|
| Raw rows across all 15 CSVs | 11,901 |
| Unique keywords after dedup | 11,149 |
| Workable pool (Vol 50+, KD ≤55, post-exclusions) | 785 |
| Excluded — competitor nav / used / local-service / competitor brands | 109 |
| FAQ candidates mined from full dataset (Vol 20+, true question phrasing) | 201 |
| Blog clusters (≥2 keywords, max 15/cluster) | 30 raw → 26 real content clusters after routing fixes |

---

## Homepage (`/`)

**Corrected — v1/early-v2 wrongly gave the homepage a pass to use Informational primary keywords ("outboard motor," "outboard motors") on the reasoning that they're "brand-identity terms." That contradicts the same T/C-priority rule enforced on every other page. The homepage is the highest-value sales page on the site — it doesn't get an exception.** Real Transactional/Commercial candidates exist and are used instead:

| Keyword | Volume | KD | Intent |
|---|---|---|---|
| outboard motors for sale | 1,000 | 13 | Transactional |
| outboard boat | 720 | 29 | Commercial |
| buy outboard motor | 170 | 9 | Transactional |

(Max 3 primary-tier keywords on homepage, per the skill's homepage cap — no separate secondary tier here.)

**Cannibalisation note:** "outboard motors for sale" was originally `/shop/`'s primary keyword too — assigning it to both pages would violate the one-cluster-one-URL rule. Reassigned: homepage now owns "outboard motors for sale" (highest-authority page, top-of-funnel entry point), and `/shop/` takes a different Vol-1,000 keyword from its own secondary list instead — see the `/shop/` section below, now updated.

"Outboard motor(s)" as phrases still appear naturally in the H1/title/body since they're literally the business's name and category — that's fine as incidental on-page language, just not the targeted ranking keyword.

---

## `/shop/` — Stock Directory Hub
**Primary:** marine motors for sale (Vol 1,000, KD 9, **Transactional**) — *reassigned from "outboard motors for sale," now the homepage primary; this is actually a KD improvement (9 vs 13) at the same volume*
**Secondary:** outboard engines for sale (1000/16/T) · boat motors for sale (720/16/T) · outboard engine for sale (590/16/T) · boat engines for sale (480/11/T) · outboard motor for sale (480/17/T)
**Cluster volume:** ~15,990/mo

---

## Category pages — primary/secondary now strictly Transactional/Commercial

### /shop/portable/ (2.5HP–6HP)
**Primary:** 5hp outboard engine (Vol 170, KD 11, **Informational, Commercial**)
**Secondary:** 6hp outboard for sale (140/T) · 2.5 hp outboard motor (140/I,T) · outboard engine 5hp (110/I,C) · outboard engine 6hp (110/I,T) · honda outboard motor 5 hp (110/I,T)
**Cluster volume:** 8,280/mo (67 LSI keywords — full HP 2–6 permutation set)

### /shop/mid-range/ (8HP–40HP)
**Primary:** boat motor 10hp (Vol 320, KD 17, **Informational, Commercial**)
**Secondary:** 15hp outboard motor (210/I,T) · honda 8hp outboard engine (170/I,T) · 25 hp outboard for sale (170/T) · 15 hp outboard for sale (140/T) · 30 hp outboard for sale (110/T)
**Cluster volume:** 10,080/mo (71 LSI)

### /shop/high-horsepower/ (50HP–400HP+)
**Primary:** yamaha outboard motor 60hp (Vol 260, KD 4, **Informational, Commercial**)
**Secondary:** 150 hp outboard for sale (140/T) · 60 hp outboard for sale (140/T) · 60hp outboard for sale (140/T) · 50 hp outboard (140/I,C) · 50hp outboard (140/I,C)
**Cluster volume:** 2,530/mo (15 LSI) — smallest category cluster; see Product Gaps for why brand hubs matter more here

### /shop/electric/
**Primary:** electric outboard motor (Vol 1,900, KD 27, **Commercial**)
**Secondary:** boat motors electric (1000/I,C) · electric outboard engine (1000/C) · electric boat motor (590/C) · electric outboard boat motor (590/I,C) · outboard electric (480/I,T)
**Cluster volume:** 17,830/mo (74 LSI) — **largest single opportunity on the site**

### /shop/parts/
**Primary:** yamaha outboard motor spare parts (Vol 70, KD low, **Commercial**)
**Secondary:** mercury outboard spare parts lymington (70/C) · mercury outboard spare parts portsmouth (70/C) · mercury outboard spare parts hamble/hythe/swanwick (70 each/C — see Local content below) · outboard motor propeller (70/I,T)
**LSI:** outboard engine fuel tank (260/I), outboard motor fuel tank (260/I) — Informational but high-volume, use as body-copy LSI only, never as primary/secondary per the rule
**Cluster volume:** 1,850/mo

---

## Brand hubs (structural gap — pages don't exist yet; see `product-gaps.md`)

| Brand | Proposed URL | Primary keyword | Secondary | Cluster vol/mo |
|---|---|---|---|---|
| Yamaha | `/shop/yamaha/` | yamaha outboards (880, **T**) | yamaha outboards for sale (260/T) · yamaha boat motors (170/T) · buy yamaha outboard (140/T) · yamaha outboard boat motors for sale (140/T) · yamaha outboard motors for sale (140/T) | **13,730** |
| Mercury | `/shop/mercury/` | mercury outboards (390, **I,T**) | mercury outboard (390/I,T) · mercury marine (260/I,T) · mercury outboard boat motors (260/I,T) · mercury outboard motors (260/I,T) | **10,510** |
| Suzuki | `/shop/suzuki/` | suzuki outboard engine (Vol, **Commercial**) | suzuki outboards for sale (210/T) · suzuki outboard motors for sale (170/T) · suzuki boat motors (140/I,T) · suzuki outboard engines for sale (110/T) | **6,040** |
| Honda | `/shop/honda/` | honda outboards (590, **I,T**) | honda outboard engines (480/I,T) · honda outboard motors (480/N,T) · honda engines (390/I,T) · honda boat engine (260/I,T) | **6,230** |
| Tohatsu | `/shop/tohatsu/` | (no qualifying T/C keyword ≥Vol50 found) | — | 70 (Informational only) |
| ePropulsion | `/shop/epropulsion/` | e propulsion (140, **Navigational**) | — | 140 |

**Note on Tohatsu/ePropulsion:** genuinely thin brand-specific search demand in this dataset (Navigational-only or sub-threshold) — still worth building the page for catalog completeness and internal linking, just don't expect it to carry standalone ranking weight the way Yamaha/Mercury/Honda/Suzuki will.

---

## Per-product keyword mapping (all 114 products)

Real exact-model search volume is near-zero for this category (expected — buyers search by HP/brand/use-case, not SKU, until deep in the funnel). Only **2 of 114 products** matched a real keyword directly:

| Product | Matched keyword | Volume |
|---|---|---|
| ePropulsion Spirit 1.0 Plus | epropulsion spirit 1.0 / epropulsion spirit 1.0 plus / spirit 1.0 epropulsion | 3 kws, 50–70 each |
| Mercury Verado 400 | 400r mercury outboard | 50 |

**Every other product page inherits its category's primary + top-3 secondary keywords** as on-page LSI (body copy, alt text, meta description filler) — this is standard practice: the category page carries the head-term ranking weight, and product pages earn traffic via internal links from the category/brand pages plus direct/branded visits. Full inheritance table (by category):

| Category | Products | Inherited keywords (from category primary+secondary) |
|---|---|---|
| Portable | 24 products | 5hp outboard engine · 6hp outboard for sale · 2.5 hp outboard motor |
| Mid-range | 31 products | boat motor 10hp · 15hp outboard motor · honda 8hp outboard engine |
| High-horsepower | 15 products | yamaha outboard motor 60hp · 150 hp outboard for sale · 60 hp outboard for sale |
| Electric | 30 products | electric outboard motor · boat motors electric · electric outboard engine |
| Parts | 14 products | yamaha outboard motor spare parts · mercury outboard spare parts (+ local variant matching brand) · outboard motor propeller |

Each product's own name/brand/model stays the primary on-page focus (title, H1, schema) — the inherited category keywords are supporting context only, never override the product's own identity.

---

## FAQ candidates mined (full detail in `faq-bank.md`)

201 question-phrased keywords found by mining the **full 11,149-keyword dataset** (not just the Vol 50+ primary pool — FAQ answers are long-tail voice/AI-assistant material, so a Vol 20+ floor was used instead) for true question signals (does/can/is/are/who/which/where/how long) plus guide-style how-to phrasing suited to quick answers rather than full blog posts. Grouped into 14 themes — see `faq-bank.md`.

---

## Blog clusters (full briefs in `blog-plan.md`)

26 distinct content clusters after correcting the routing (v1 wrongly merged several distinct accessory clusters — e.g. stands, covers, locks, trolleys, brackets, fuel tanks — into one combined post; the skill's one-cluster-one-URL rule means each gets its own page). 20 are prioritized to build first; 6 are backlog.

---

## Exclusions (unchanged from v1 — still correct)

| Bucket | Count | Why |
|---|---|---|
| Competitor navigational brands | ~10 (a few more caught in this pass: "boats & outboards," "boats outboards uk," "cambridge rebores ltd") | Named competitor dealers |
| Used / second-hand | 45 | New-stock-only business model |
| Local "near me" / servicing | 24 | No walk-in service bay |
| Competitor brand names | 29 | Mariner, Parsun, Selva, Evinrude, Yanmar, Nissan Marine, Highfield, Mercruiser, Hangkai — comparison content only, never product pages |

---

## Phase 9 — AI/GEO/AEO Visibility Layer

Applied across every page/post in this plan, per the skill's five required signals.

**1. FAQ Schema** — every page with 2+ question-intent keywords gets a planned FAQPage block:
- `/faq/` — full 14-theme bank (`faq-bank.md`)
- `/shop/electric/`, `/shop/portable/`, `/shop/mid-range/` — inherit relevant FAQ themes (reliability, how-it-works) as on-page mini-FAQs
- Blog posts #16–20 (maintenance/winterize/flush/start/serial-number) each carry their own FAQPage block per `blog-plan.md`

**2. Speakable Schema** — flagged single-best-answer candidates:
- Homepage: the PDI-delay answer (`faq-bank.md` Theme 9)
- `/faq/`: the serial-number-location answer (Theme 1) — most concrete, no hedging
- `/shop/parts/`: the Solent-delivery-areas answer (genuine local fact)

**3. Entity Coverage check** — does each page name product/brand/location entities clearly?
| Page | Product entity | Brand entity | Location entity | Gap? |
|---|---|---|---|---|
| Homepage | ✅ "outboard motor" | ✅ Solent Marine | ✅ Cowes, Isle of Wight | None |
| Category pages | ✅ HP-tier named | ⚠️ Brands mentioned but not individually entity-rich | ❌ No location entity | Category pages should name the Solent/Cowes location at least once — currently generic |
| Brand hubs (once built) | ✅ by definition | ✅ | ❌ | Should also carry the location entity for local relevance |
| `/shop/parts/` | ✅ | ✅ | ✅ (once local paragraph added) | Fixed by Gap 3 in `product-gaps.md` |
| Blog posts | Varies | Varies | ❌ mostly | Add a one-line "Solent Marine, Cowes" mention in each post's author/about blurb, not forced into body copy |

**4. Featured Snippet Hooks** — every informational/question cluster needs a 1–2 sentence plain-language answer in the first 150 words:
- Pillar 1 (HP guide): open with "Outboard horsepower ranges from 2.5HP for tenders to 300HP+ for offshore boats — the right size depends on your hull weight and use case, not just boat length."
- Pillar 3 (dinghy/kayak): open with "A 2.5HP–6HP outboard suits most dinghies, tenders and inflatables; kayaks and canoes are better matched to an electric trolling motor."
- Electric explainer: open with "Electric outboards replace a fuel tank and engine with a battery and electric motor, rated in HP-equivalent rather than true horsepower."
- Serial-number guide: open with "An outboard's serial number is stamped on the transom or swivel bracket, and its format encodes the model year."
- Every blog post in Tier 1 needs this same treatment before publishing — noted here as a build requirement, not written into every brief individually to avoid duplicating `blog-plan.md`.

**5. llms.txt Priority Map** — ranked by topical authority + AI answer relevance, for when `/llms.txt` is next regenerated:
1. `/shop/electric/` — largest keyword authority (17,830/mo), most likely to be cited for "electric outboard" queries
2. `/shop/` — the stock directory hub, canonical "what do you sell" answer
3. `/blog/outboard-horsepower-guide/` — pillar, high AI-answer utility (concrete HP recommendations)
4. `/blog/outboard-serial-number-year-guide/` — near-zero competition, genuinely useful factual lookup content AI assistants favour
5. `/shop/yamaha/`, `/shop/mercury/`, `/shop/honda/`, `/shop/suzuki/` (once built) — brand authority pages
6. `/faq/` — the single highest-density factual-answer page on the site
7. Remaining category pages (`/shop/portable/`, `/shop/mid-range/`, `/shop/high-horsepower/`)
8. `/about/` — entity/founding facts
9. Individual product pages — lowest priority for `llms.txt` (long tail, better discovered via category/brand page links than listed individually)
