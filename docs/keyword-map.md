# Keyword Map v4 — Solent Marine Outboards UK

**Data:** Semrush **Keyword Magic Tool** + **Keyword Magic Tool 2.0**, UK database, pulled live 18 Nov 2026 (each seed refreshed: outboard motor, outboard engine, electric outboard, boat motor, trolling motor, outboard spares, and the five petrol brands + ePropulsion). Cross-checked against **live GSC queries (16-month)** and **Bing Webmaster Tools**.
**Supersedes:** v3 (17 Nov). v4 was reviewed and approved, then applied to on-page titles/H1s/meta on 19 Nov 2026.

## What the live data says (drives every decision)
- **GSC (ground truth):** the only page-1 keyword is the brand name "solent marine" (pos ~7.8). Every commercial term ranks pages 3–8. The best-positioned non-brand term is **"diesel outboard engines uk" (pos ~28.8)** — the diesel guide is the closest page to a breakthrough.
- **KMT 2.0:** the "outboard motors for sale" topic carries **AI Volume ~6.5K and 113+ tracked AI prompts** in the UK — real GEO/AEO demand, which justifies the llms.txt / llms-full.txt / markdown-negotiation work.
- **Competitors** (Semrush-named): billhigham.co.uk, ashmarine.co.uk (both lead with **used** outboards) and store.honda.co.uk. The independents win on *used* stock — a segment this site does not sell — so we compete on **new + brand + guides**.
- **Strategic conclusion:** a zero-authority site cannot take head terms (KD 22–37, pages 3–8 today). v4 front-loads **KD ≤ 25 quick wins** and makes each page win its own low-competition term; head terms stay as natural on-page language. Authority (backlinks) is the real ceiling — see "Off-site".

## Rules
1. One URL = one primary keyword cluster. A keyword is primary on one URL only.
2. Transactional/Commercial → shop/category/brand/product URLs. Informational/Question → blog/FAQ.
3. H1, title, meta description, first 150 words and one H2 of each URL contain its primary.
4. Tiering: **T1 KD 0–25 (optimise first)**, T2 KD 26–40, T3 KD 41–55 (LSI only, never a page's primary).
5. Excluded: used/second-hand, "near me"/local-service, competitor dealer brands, AI-prompt strings, and "motor boat(s) for sale" (buying a *boat*, not an engine).
6. Mangled/ungrammatical queries ("out boat motor for sale", "boat motor outboard for sale") are covered by their grammatical tokens in natural copy, never pasted verbatim.

## Shop pages (every URL owns one primary + secondaries)
Intent key: T=Transactional, C=Commercial, I=Informational, N=Navigational.

| URL | Primary (vol / KD / intent / tier) | Secondary | H1 |
|---|---|---|---|
| `/` | outboard motors for sale (1.0K / 16 / T / T1) | outboard motors for sale uk (480/13), **marine outboards for sale (210/8)** | Outboard Motors for Sale in the UK |
| `/shop/` | outboard engines for sale (1.0K / 16 / T / T1) | outboard motor engines for sale (720/16), boat motors for sale (720/18), outboard motor for sale (480/16) | Outboard Engines for Sale: Full UK Stock Directory |
| `/shop/portable/` | small outboard motors for sale (260 / 10 / T / T1) | 6hp outboard motor (320/9), outboard motor 6 hp (320/6), 5hp (210/19), 4hp (210/10) | Small Outboard Motors for Sale (2.5HP–6HP) |
| `/shop/mid-range/` | boat motor 10hp (320 / 14 / C / T1) | 15 hp outboard boat motor (320/8), 15hp outboard motor (210/7), 10 hp outboard boat motor (260/15), 20 horsepower outboard motor (260/21) | 10HP–40HP Outboard Motors for Sale |
| `/shop/high-horsepower/` | yamaha outboard motor 60hp (260 / 11 / T1) | 50/60hp outboard for sale, 150 hp outboard for sale (140) | High-Power Outboards for Sale (50HP–400HP) |
| `/shop/electric/` | electric outboard motor (1.9K / 25 / C / T2) | electric outboard engine (1.0K/15), electric outboard motor uk (390/12), boat motors electric (1.3K/23), electric boat motor (590/17), electric outboards for sale (110/14) | Electric Outboard Motors for Sale UK |
| `/shop/parts/` | **mercury outboard motor spares (170 / 3 / T1 — lowest KD on site)** | **yamaha outboard spares (140/11)**, **outboard motor fuel tank (260/7)**, outboard engine stand (390/9), outboard motor lock (260/11) | Outboard Motor Spares, Oils & Accessories UK |
| `/shop/yamaha/` | yamaha outboards (880 / 33 / T) | yamaha outboards for sale (320/9 T1), yamaha outboard motors for sale (140/8), buy yamaha outboard (110/11) | Yamaha Outboards for Sale UK |
| `/shop/suzuki/` | suzuki outboards (590 / 16 / T) | suzuki outboard engine (390/14), suzuki outboards for sale (210/6 — easiest brand term), suzuki outboard motors for sale (170/12) | Suzuki Outboards for Sale UK |
| `/shop/mercury/` | mercury outboards (390 / 21 / T) | mercury outboard motors (320/18), mercury outboards for sale (260/12), mercury outboard motors for sale (210/8) | Mercury Outboards for Sale UK |
| `/shop/honda/` | honda outboards (480 / 30 / T) | honda outboard engines (480/26), honda outboards for sale (170/9 T1), honda outboard motors for sale (170/19) | Honda Outboards for Sale UK |
| `/shop/tohatsu/` | **tohatsu outboards (480 / 14 / T)** ← upgraded from v3 "no term" | tohatsu outboard (480/20), tohatsu (260/26 N) | Tohatsu Outboards for Sale UK |
| `/shop/epropulsion/` | **epropulsion (480 / 17 / T/N)** ← upgraded from v3 "navigational only" | epropulsion outboard (140/12), epropulsion elite (170/9), epropulsion spirit 1.0 (260/18) | ePropulsion Electric Outboards for Sale UK |
| `/brands/` | outboard motor brands (informational/navigational) | — | Outboard Motor Brands UK |

## Product pages
- Pattern: `[Brand Model] [HP]HP Outboard for Sale UK | Solent Marine UK` (electric: `… Electric Outboard for Sale UK`; parts: `… | Buy Online UK`). Copy generated in `src/lib/productCopy.ts` from catalogue data, verified unique by crawl.
- Three ePropulsion models carry their own model name as primary (real UK volume), which the generator already does because the model name is the H1/title/meta root: **ePropulsion Spirit 1.0 Plus** (110/KD9), **ePropulsion eLite 500W** (170/KD9), **ePropulsion Spirit 2** (140/KD12).
- All other products inherit their category cluster as LSI only.

## Blog pages (informational — re-prioritised by KD + GSC)
| URL | Primary | Notes |
|---|---|---|
| `/blog/diesel-outboard-motors-explained/` | diesel outboard motor (210/14) | **#1 priority** — site's best-ranked non-brand page (GSC pos ~28.8), biggest impression driver, closest to page 1. |
| `/blog/electric-outboard-motors-explained/` | how do electric outboard motors work | feeds the 1.9K electric category; shop owns "electric outboard motor" |
| `/blog/best-outboard-for-dinghy-tender-kayak/` | motor for rubber boat (590/8), inflatable boat with motor (880/21) | strong tender demand, low KD |
| `/blog/outboard-horsepower-guide/` | outboard horsepower guide (pillar) | links all categories |
| `/blog/affordable-outboard-motors-uk/` | cheap/affordable outboard motors | commercial-informational |
| `/blog/outboard-motor-stand-guide/` | outboard engine stand (390/9) | T1 quick win, links to parts |
| `/blog/outboard-motor-security-locks/` | outboard motor lock (260/11) | T1, links to parts |
| `/blog/outboard-fuel-tanks-gas-lines/` | outboard motor fuel tank (260/7) | T1, links to parts (parts page owns the commercial term) |
| `/blog/small-outboard-motor-buying-guide/` | how to choose a small outboard motor | retitled to avoid overlap with `/shop/portable/` |
| `/blog/2-stroke-vs-4-stroke-outboards/`, `/blog/inboard-vs-outboard-motors/` | comparison queries | |
| `/blog/how-to-start-an-outboard-motor/`, `/blog/flush-outboard-motor/`, `/blog/winterize-outboard-motor/`, `/blog/outboard-motor-maintenance-guide/` | how-to / maintenance | support content, link to parts |
| `/blog/outboard-serial-number-year-guide/` | how to tell year of outboard by serial number | near-zero competition |
| `/blog/british-seagull-outboards-legacy/` | seagull outboard motor (260/15) | heritage; routes to modern small engines |

## Cannibalisation controls (checked against live rankings)
- Head terms "outboard motors"/"outboard engines" appear on home, `/shop/` and categories. Ownership: **home = "outboard motors for sale"**, **`/shop/` = "outboard engines for sale"**, **categories = their HP terms**.
- "electric outboard motor" (category) vs "how electric outboards work" (blog) — distinct intents.
- Brand pages own `[brand] outboards`; `/brands/` stays informational/navigational only.
- Parts page owns the spares/parts/fuel-tank commercial terms; accessory blog posts own the "guide/how-to" variants and link in.

## Off-site (the real ceiling — GSC and Bing both agree)
On-page is clean. The blocker both tools flag is **off-site authority**: Semrush Authority Score 0, ~2 referring domains; Bing's single recommendation is "lacks inbound links from high-quality domains." No keyword map fixes this. Priority: manufacturer dealer-locator listings (Yamaha/Suzuki/Honda/Mercury/Tohatsu), Google Business Profile + Bing Places, UK marine directories, Solent/IoW local listings, genuine Trustpilot/Google reviews, marine-forum presence.

## GEO / AEO
- Keep llms.txt + llms-full.txt + markdown negotiation (live).
- Every page with 2+ question keywords keeps its FAQPage block.
- Featured-snippet hooks open the diesel, electric, HP-guide and serial-number posts.
- Entity coverage: each page names product + brand + "Cowes/Solent, Isle of Wight".

## Summary of v4 changes vs v3 (applied 19 Nov 2026)
1. **Tohatsu** `/shop/tohatsu/` → **"tohatsu outboards" (480/KD14)** (was "no qualifying keyword"). H1/title/meta aligned.
2. **ePropulsion** `/shop/epropulsion/` → **"epropulsion" (480/KD17)** (was navigational only); eLite / Spirit 1.0 secondaries added.
3. **Mercury & Honda** H1/title aligned to the `[brand] outboards` primary.
4. **Homepage/Shop** add "marine outboards for sale" (210/KD8) and boat-motor phrasing.
5. **Parts** re-scoped to "mercury outboard motor spares" (KD3), "yamaha outboard spares", "outboard motor fuel tank" (KD7).
6. **Mid-range** primary → "boat motor 10hp".
7. **Diesel guide** confirmed #1 blog priority.
8. Everything re-tiered strictly by KD (quick wins first).

## Open items
- Reviews: add real product-level reviews as they arrive (only real, attributable).
- Off-site authority programme (above) is the main growth lever from here.
