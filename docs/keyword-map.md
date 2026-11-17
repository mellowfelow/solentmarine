# Keyword Map v3 — Solent Marine Outboards UK

**Data:** Semrush Keyword Magic Tool, UK database, pulled live 17 Nov 2026 (seeds: outboard motor, outboard engine, electric outboard, yamaha outboard; volume 40+, KD ≤45). Earlier v2 map (15 exports, Sep 2026) retained for the brand and per-model long tail.
**Why v3:** GSC showed 7 clicks / 4.2K impressions in 7 weeks, average position 56. Head terms with a zero-authority domain rank on pages 5–9. v3 keeps the head terms where they belong but assigns exactly **one primary per URL**, makes each H1/title carry its primary, and separates informational (blog) from transactional (shop) intents.

## Rules
1. One URL = one primary keyword cluster. A keyword never appears as primary on two URLs.
2. Transactional/Commercial intent owns shop URLs; Informational owns blog URLs.
3. H1, title, meta description, first paragraph and one H2 of each URL contain its primary.
4. Product pages target their own model + "for sale UK" (title) and inherit the category cluster only as supporting text.
5. Excluded: used/second-hand, "near me" servicing, competitor brands, tool-generated AI-prompt queries seen in GSC.

## Shop pages
| URL | Primary (vol / KD / intent) | Secondary | H1 |
|---|---|---|---|
| `/` | outboard motors for sale (1.0K / 16 / T) | outboard motors for sale uk (480/13 T), buy outboard motor | Outboard Motors for Sale in the UK |
| `/shop/` | outboard engines for sale (1.0K / 16 / T) | outboard motor engines for sale (720/16), boat motor outboard for sale (720/19), outboard engine for sale (590/16) | Outboard Engines for Sale: Full UK Stock Directory |
| `/shop/portable/` | small outboard motors for sale (260 / 10 / T) | 6hp outboard motor (320/9), 5hp outboard motor (210/19), 4hp outboard motor (210/10), 2.5 hp outboard | Small Outboard Motors for Sale (2.5HP–6HP) |
| `/shop/mid-range/` | 10 hp outboard boat motor (260 / 15 / C) | 15 hp outboard boat motor (320/8), 20 horsepower outboard motor (260/21), 10hp outboard engine (320/18) | 10HP–40HP Outboard Motors for Sale |
| `/shop/high-horsepower/` | 60hp / 115hp / 150hp outboard for sale (T) | 50hp outboard, yamaha 60hp (brand hub owns "yamaha outboard motor 60hp") | High-Power Outboards for Sale (50HP–400HP) |
| `/shop/electric/` | electric outboard motor (1.9K / 25 / C) | electric outboard engine (1.0K/15), electric outboard motor uk (390/12), electric outboards for sale (110/14) | Electric Outboard Motors for Sale UK |
| `/shop/parts/` | outboard motor spares (C) | yamaha outboard spares (140/11), outboard motor propeller, outboard fuel tank | Outboard Spares, Oils & Accessories UK |
| `/shop/yamaha/` | yamaha outboards (880 / 33 / T) | yamaha outboards for sale (320/9), yamaha outboard motors for sale (140/8), buy yamaha outboard (110/11) | Yamaha Outboards for Sale UK |
| `/shop/mercury/` | mercury outboard motors for sale (210 / 8 / T) | mercury outboard motors (320/18), mercury outboard boat motors (260/21) | Mercury Outboard Motors for Sale UK |
| `/shop/honda/` | honda outboard motors (480 / 21 / T) | honda outboard motor (260/26), honda outboard engines (480/26) | Honda Outboard Motors for Sale UK |
| `/shop/suzuki/` | suzuki outboards for sale (210 / 6 / T) | suzuki outboard engine (390/14), suzuki outboard motors for sale | Suzuki Outboards for Sale UK |
| `/shop/tohatsu/` | tohatsu outboard motors (brand/navigational, low volume) | tohatsu outboard for sale | Tohatsu Outboard Motors for Sale UK |
| `/shop/epropulsion/` | epropulsion (navigational, 140) | epropulsion outboard, electric outboard battery | ePropulsion Electric Outboards UK |
| `/brands/` | outboard motor brands (informational/navigational) | — | Outboard Motor Brands UK |

## Blog pages (informational — do not compete with shop primaries)
| URL | Primary | Notes |
|---|---|---|
| `/blog/outboard-horsepower-guide/` | how many hp do I need for my boat / outboard horsepower guide | pillar; links to all categories |
| `/blog/electric-outboard-motors-explained/` | how do electric outboard motors work | informational; shop owns "electric outboard motor" |
| `/blog/best-outboard-for-dinghy-tender-kayak/` | best outboard for inflatable boat / kayak outboard | comparison |
| `/blog/small-outboard-motor-buying-guide/` | how to choose a small outboard motor | retitled to remove "small outboard motors for sale" overlap with `/shop/portable/` |
| `/blog/affordable-outboard-motors-uk/` | cheap/affordable outboard motors | commercial-informational, links to priced products |
| `/blog/diesel-outboard-motors-explained/` | diesel outboard motor (210/14) | earns impressions; routes readers to petrol/electric |
| `/blog/2-stroke-vs-4-stroke-outboards/`, `/blog/inboard-vs-outboard-motors/` | comparison queries | |
| `/blog/how-to-start-an-outboard-motor/`, `/blog/flush-outboard-motor/`, `/blog/winterize-outboard-motor/`, `/blog/outboard-motor-maintenance-guide/` | how-to / maintenance | support content, link to parts |
| `/blog/outboard-serial-number-year-guide/` | how to tell year of outboard by serial number | |
| `/blog/outboard-motor-stand-guide/`, `-covers-guide/`, `-security-locks/`, `-mounting-brackets/`, `-trolleys/`, `outboard-fuel-tanks-gas-lines/` | accessory how-to guides (stand 390/20, lock 260/11, fuel tank 260/7) | shop only stocks fuel tank/line; others are advice-only and say so |
| `/blog/british-seagull-outboards-legacy/` | seagull outboard motor (260/15) | heritage; routes to modern small engines |

## Cannibalisation controls (from Semrush/GSC evidence)
- `/shop/` was ranking for "boat motor 10hp", "10hp outboard", "small outboard motors for sale", "cheap outboard motors". Fix: `/shop/` now owns only "outboard engines for sale" and the generic directory; `/shop/mid-range/` and `/shop/portable/` own the HP terms in their H1, title, intro and H2s.
- `/blog/` index ranked for "dinghy outboard motor" and "diesel outboard". Fix: pillar posts now have full-length content and are linked from the homepage, shop, category and product pages so the post, not the index, is the stronger match.
- Product pages no longer repeat category keywords; each targets "[model] [HP] outboard for sale UK".

## Per-product pattern
Title: `[Brand Model] [HP]HP Outboard for Sale UK | Solent Marine UK` (electric: `… Electric Outboard for Sale UK`; parts: `… | Buy Online UK`). Copy is generated in `src/lib/productCopy.ts` from catalogue data and verified for uniqueness by crawl (see audit log).

## Open items
- Reviews: add real product-level reviews as they arrive (Rule: only real, attributable reviews).
- Build brand-hub link equity: dealer-locator listings (Yamaha/Suzuki), Google Business Profile, marine directories.
