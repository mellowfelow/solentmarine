# Blog Content Plan — Solent Marine Outboards UK

No blog currently exists on the site (`src/app/` has no `/blog/` route). This plan covers the 10 highest-value content clusters pulled from the 220 keywords with no existing page to absorb them. Two are pillar posts (3,000w+); the rest are 1,500–2,500w cluster posts that link back to their pillar and to the relevant `/shop/[category]/` page.

**Architecture note:** building `/blog/` is itself a small structural addition — a new `src/app/blog/page.jsx` (index) + `src/app/blog/[slug]/page.jsx` (post), following the same `generateStaticParams`/`generateMetadata` pattern already used for `/shop/[category]/` and `/product/[slug]/`. Posts should live as data in a `src/data/posts.ts` file mirroring `products.ts`, so `app/sitemap.ts` picks them up automatically.

---

## Pillar 1: Outboard Motor Horsepower Guide
- **Title (H1):** How Much Horsepower Do You Need? The UK Outboard Motor Guide
- **Meta description:** "Choosing outboard HP for your boat? Our UK sizing guide covers 2.5HP tenders to 300HP offshore rigs, shaft length, and boat-type recommendations." (155 chars)
- **Primary keyword:** outboard motor horsepower guide
- **Secondary keywords:** 10 horsepower outboard motor, 15 horsepower outboard motor, 20 horsepower outboard motor, 6 horsepower outboard motor, 8 horsepower outboard, 25 horsepower outboard engine, 60 horsepower outboard motor, 100 horsepower outboard motor
- **Word count:** 3,000w+ (pillar)
- **Content type:** Guide/pillar
- **Slug:** `/blog/outboard-horsepower-guide/`
- **Outline:**
  - H2: Why horsepower isn't the only number that matters (weight, hull type, shaft length)
  - H2: Portable range (2.5HP–6HP) — tenders, dinghies, small inflatables → links to `/shop/portable/`
  - H2: Mid-range (8HP–40HP) — RIBs, day boats, fishing craft → links to `/shop/mid-range/`
  - H2: High-power (50HP+) — offshore, commercial, twin-engine setups → links to `/shop/high-horsepower/`
  - H2: Electric HP-equivalents explained → links to `/shop/electric/`
  - H2: Shaft length quick-reference table (reuse the FAQ's transom measurement method)
  - H2: Worked examples — "I have a 14ft RIB, what HP?" / "Sailing yacht auxiliary?"
- **Internal links in:** homepage engine-sizer tool, all 5 category pages, FAQ page
- **Internal links out (from other pages to this post):** homepage "Launch Engine Sizer Tool" section, each category page intro
- **CTA:** "Browse [category] outboards" per HP band section
- **Images:** HP comparison infographic; one product photo per HP band (already have placeholders)
- **Schema:** Article + FAQPage (worked examples as Q&A)
- **FAQ section:** What HP do I need for a 12ft dinghy? Can I put too much horsepower on my boat? What's the difference between short and long shaft?
- **Funnel position:** Top (informational, high awareness stage) — feeds all 3 petrol category pages

---

## Pillar 2: Best Outboard for Tenders, Kayaks & Inflatables
- **Title (H1):** Best Outboard Motor for Your Tender, Kayak or Inflatable Boat
- **Meta description:** "Find the right lightweight outboard for dinghies, kayaks, canoes and inflatables — petrol vs electric, weight limits, and our top picks." (149 chars)
- **Primary keyword:** motor for inflatable boat
- **Secondary keywords:** inflatable dinghy motor, motor for rubber boat, dinghy motor, motor for dinghy, kayak outboard motor, canoe outboard motor, paddleboard motor, inflatable raft motor
- **Word count:** 3,000w+ (pillar)
- **Content type:** Guide/pillar
- **Slug:** `/blog/best-outboard-for-dinghy-tender-kayak/`
- **Outline:**
  - H2: What makes a good tender/kayak outboard (weight, portability, mounting)
  - H2: Petrol options 2.5HP–6HP → links to `/shop/portable/`, features Yamaha F2.5BMHS, Suzuki DF2.5S
  - H2: Electric options for kayaks & canoes → links to `/shop/electric/`, features Haswing/TEMO trolling motors
  - H2: Weight limits and transom strength — safety note
  - H2: Fuel tank vs battery — which lasts longer on the water
- **Internal links in:** category pages, product pages for the featured models
- **CTA:** "Shop portable outboards" / "Shop electric outboards"
- **Images:** lifestyle shots of tenders/kayaks with outboards (placeholder-safe: use category SVGs until real photos available)
- **Schema:** Article + Product (mention, not full schema — avoid Product schema on a non-product page per WebForge Rule 4)
- **FAQ:** Can I put an outboard on any inflatable? How heavy is a 2.5HP outboard? Do kayak outboards need a battery?
- **Funnel position:** Top/Middle — feeds Portable + Electric categories

---

## Cluster Post 3: 2-Stroke vs 4-Stroke Outboards
- **Title:** 2-Stroke vs 4-Stroke Outboards: Which Should You Buy in 2026?
- **Meta description:** "2-stroke or 4-stroke outboard? We break down UK legal restrictions (RCD II), fuel efficiency, weight and maintenance to help you decide." (150 chars)
- **Primary keyword:** 2 stroke vs 4 stroke outboard
- **Secondary keywords:** 2 stroke outboard engine, 4 stroke outboard engine, two stroke outboard motors, 4 cycle outboard motor, outboard motors 2 stroke
- **Word count:** 1,800–2,200w
- **Content type:** Comparison
- **Slug:** `/blog/2-stroke-vs-4-stroke-outboards/`
- **Outline:** H2 What's the mechanical difference · H2 UK RCD II legal status (reuse FAQ's 2-stroke legislation answer, expand) · H2 Fuel economy & weight · H2 Maintenance & noise · H2 Our recommendation by use case
- **Internal links:** FAQ page (2-stroke legislation entry), `/shop/mid-range/`, `/shop/portable/`
- **CTA:** Browse 4-stroke portable/mid-range range
- **Schema:** Article + FAQPage
- **FAQ:** Are 2-stroke outboards illegal in the UK? Are 2-strokes more fuel efficient? Which is lighter, 2-stroke or 4-stroke?
- **Funnel position:** Top/Middle

---

## Cluster Post 4: Inboard vs Outboard Motors
- **Title:** Inboard vs Outboard Motors: Key Differences Explained
- **Meta description:** "Inboard or outboard engine — which is right for your boat? Compare maintenance, cost, space and performance in this UK buyer's guide." (147 chars)
- **Primary keyword:** inboard vs outboard motor
- **Secondary keywords:** inboard motor vs outboard, outboard vs inboard boat motors, outboard vs inboard motors
- **Word count:** 1,500–1,800w
- **Content type:** Comparison/explainer
- **Slug:** `/blog/inboard-vs-outboard-motors/`
- **Outline:** H2 How each system works · H2 Maintenance & accessibility · H2 Cost comparison · H2 Which boats suit which
- **Internal links:** homepage, `/shop/`
- **CTA:** "Browse our outboard range"
- **Schema:** Article
- **FAQ:** Can you convert an inboard boat to outboard? Which is cheaper to maintain?
- **Funnel position:** Top

---

## Cluster Post 5: Affordable Outboard Motors UK
- **Title:** Affordable Outboard Motors UK: Best Value Picks by Budget
- **Meta description:** "Looking for a budget-friendly outboard? See our best value picks across portable, mid-range and electric, plus finance options from £50 deposit." (154 chars)
- **Primary keyword:** affordable outboard motors
- **Secondary keywords:** cheap outboard motors, budget outboard motors, inexpensive outboard motors, low cost outboard motors, cheapest outboard boat motors
- **Word count:** 1,500–2,000w
- **Content type:** Listicle/commercial
- **Slug:** `/blog/affordable-outboard-motors-uk/`
- **Outline:** H2 What drives outboard pricing · H2 Best budget picks under £1,000 (pull real SKUs from catalog, e.g. Yamaha F2.5BMHS £711, Suzuki DF2.5S £755) · H2 Finance options (link finance calculator) · H2 Don't cut corners on PDI/warranty
- **Internal links:** `/shop/portable/`, `/shop/mid-range/`, product pages for the featured budget SKUs
- **CTA:** "View finance options" / product page links
- **Schema:** Article + ItemList (real products only, no invented pricing)
- **FAQ:** What's the cheapest reliable outboard? Can I finance an outboard motor?
- **Funnel position:** Middle/Bottom — highest commercial intent of the cluster posts

---

## Cluster Post 6: Outboard Motor Accessories Guide
- **Title:** Outboard Motor Accessories You Actually Need: Stands, Covers & Locks
- **Meta description:** "From engine stands to security locks — the essential outboard accessories UK boat owners need, and where to buy genuine parts." (145 chars)
- **Primary keyword:** outboard motor accessories
- **Secondary keywords:** outboard engine stand, outboard motor cover, outboard motor trolley, outboard motor lock, outboard motor bracket, outboard engine gas tank
- **Word count:** 1,500–1,800w
- **Content type:** Guide
- **Slug:** `/blog/outboard-motor-accessories-guide/`
- **Outline:** H2 Storage (stands, covers) · H2 Transport (trolleys) · H2 Security (locks) · H2 Fuel (tanks, lines) — each ties back to `/shop/parts/`
- **Internal links:** `/shop/parts/`
- **CTA:** "Shop genuine parts & accessories"
- **Schema:** Article
- **FAQ:** Do I need an outboard motor stand? How do I stop my outboard being stolen?
- **Funnel position:** Middle — supports the Parts category

---

## Cluster Post 7: How Electric Outboard Motors Work
- **Title:** Electric Outboard Motors Explained: How They Work & What to Expect
- **Meta description:** "Considering an electric outboard? Here's how battery-powered propulsion works, real-world range, and how it compares to petrol." (143 chars)
- **Primary keyword:** how electric outboard motors work
- **Secondary keywords:** battery outboard motor, battery powered outboard motor, electronic motor boat, electric outboard motor uk
- **Word count:** 1,800–2,200w
- **Content type:** Explainer
- **Slug:** `/blog/electric-outboard-motors-explained/`
- **Outline:** H2 How battery propulsion works · H2 Real-world range (reuse FAQ's runtime answer) · H2 Petrol vs electric running costs · H2 Our electric range (ePropulsion, Torqeedo, TEMO, Haswing, Minn Kota, Blade Electric)
- **Internal links:** `/shop/electric/`, FAQ page
- **CTA:** "Shop electric & eco outboards"
- **Schema:** Article + FAQPage
- **FAQ:** How long does an electric outboard battery last? Are electric outboards powerful enough for a RIB? Can I charge an electric outboard at home?
- **Funnel position:** Top/Middle — this is the single biggest keyword opportunity on the site (electric category = 17,830/mo), so this pillar-adjacent post matters disproportionately

---

## Cluster Post 8: Outboard Motor Maintenance Guide
- **Title:** Outboard Motor Maintenance: A Beginner's Guide
- **Meta description:** "Keep your outboard running reliably. Our maintenance guide covers winterising, oil changes, impellers and what PDI actually checks." (147 chars)
- **Primary keyword:** outboard motor maintenance
- **Secondary keywords:** maintenance on outboard motor, outboard motor servicing, outboard motor service
- **Word count:** 1,500–2,000w
- **Content type:** How-to guide
- **Slug:** `/blog/outboard-motor-maintenance-guide/`
- **Outline:** H2 What PDI covers before delivery (ties to real business differentiator) · H2 Seasonal winterising checklist · H2 Oil & impeller service intervals · H2 Signs you need a service
- **Internal links:** `/shop/parts/` (oils/service kits), FAQ (PDI answer)
- **CTA:** "Shop genuine oils & service kits"
- **Schema:** Article + HowTo
- **FAQ:** How often should I service my outboard? What is PDI?
- **Funnel position:** Bottom-of-funnel for existing customers, Middle for prospects evaluating running costs

---

## Cluster Post 9: British Seagull Outboards — Legacy & Modern Alternatives
- **Title:** British Seagull Outboards: A British Icon, and What to Buy Today
- **Meta description:** "British Seagull outboards are a UK boating icon. Here's their history, parts availability, and the modern equivalents we'd recommend." (145 chars)
- **Primary keyword:** british seagull outboard
- **Secondary keywords:** seagull outboard engine, seagull outboard motor, seagull outboard motors
- **Word count:** 1,200–1,500w
- **Content type:** Explainer/nostalgia-to-conversion
- **Slug:** `/blog/british-seagull-outboards-legacy/`
- **Outline:** H2 A brief history of British Seagull · H2 Why parts are hard to find today · H2 What we'd recommend as a modern equivalent for the same use case (portable 2.5–6HP range)
- **Internal links:** `/shop/portable/`
- **CTA:** "Shop modern portable outboards"
- **Schema:** Article
- **FAQ:** Are British Seagull outboards still made? Where can I get parts for a British Seagull?
- **Funnel position:** Top — niche nostalgia traffic, genuine conversion angle to a modern portable sale

---

## Cluster Post 10: Small Boat Engine Buying Guide
- **Title:** Small Outboard Motors: A Buying Guide for Small Boats & Dinghies
- **Meta description:** "Buying a small outboard motor? Compare small boat engines, weight, and which small outboards suit your dinghy or tender best." (144 chars)
- **Primary keyword:** small outboard motor
- **Secondary keywords:** small boat engine, small outboard engines, small marine motors, small outboard boat motors
- **Word count:** 1,200–1,500w
- **Content type:** Guide
- **Slug:** `/blog/small-boat-engine-buying-guide/`
- **Note:** Significant semantic overlap with Pillar 2 (dinghy/tender/kayak) and Pillar 1 (HP guide) — keep this shorter and cross-link heavily rather than duplicating content; this post's unique angle is "engine + boat" pairing advice, not HP or specific-use-case selection.
- **Internal links:** Pillar 1, Pillar 2, `/shop/portable/`
- **CTA:** "Shop portable outboards"
- **Schema:** Article
- **FAQ:** What's the smallest outboard motor available? How light is the lightest outboard?
- **Funnel position:** Top

---

## Local content opportunity (not a blog post — category page enhancement)

The Parts category cluster surfaced five genuine Solent-area local searches: *mercury outboard spare parts hamble / hythe / lymington / portsmouth / swanwick* (70/mo each, 350/mo combined). Rather than a blog post, add a short "We deliver Mercury genuine parts across the Solent — Hamble, Hythe, Lymington, Portsmouth, Swanwick and the Isle of Wight" paragraph to `/shop/parts/`, since the business is physically Cowes-based and this is real, not fabricated. See `product-gaps.md`.

---

## 12-week publishing calendar

Sequenced Tier-1 (lowest KD, fastest to rank) first, then by funnel position (Bottom → Middle → Top), per skill rule.

| Week | Post | Why this order |
|---|---|---|
| 1 | Affordable Outboard Motors UK | Highest commercial intent (Bottom-funnel), lowest KD in the set |
| 2 | Electric Outboard Motors Explained | Feeds the single largest category opportunity (17,830/mo) |
| 3 | Outboard Motor Horsepower Guide (Pillar 1) | Foundational pillar — publish early so other posts can link to it |
| 4 | Best Outboard for Tenders, Kayaks & Inflatables (Pillar 2) | Second pillar, links to Portable + Electric |
| 5 | 2-Stroke vs 4-Stroke Outboards | Strong existing FAQ content to expand from |
| 6 | Outboard Motor Maintenance Guide | Ties to PDI, a real differentiator |
| 7 | Outboard Motor Accessories Guide | Supports the underserved Parts category |
| 8 | Inboard vs Outboard Motors | Lower priority, broad awareness content |
| 9 | Small Boat Engine Buying Guide | Cross-links Pillars 1 & 2, needs them live first |
| 10 | British Seagull Outboards | Niche, evergreen, no dependency |
| 11–12 | Buffer / first performance review | Check GSC data on weeks 1–4 posts before committing to the next batch |
