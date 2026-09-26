# FAQ Bank — Solent Marine Outboards UK (v2 — corrected)

## What changed from v1
v1 only searched the Vol 50+ primary pool with a narrow question regex and found **zero** candidates, so it produced 6 thin, mostly-invented supplementary questions. This version mines the **full 11,149-keyword dataset** at a Vol 20+ floor (appropriate for FAQ — these are long-tail voice/AI-assistant queries, not page-ranking targets, so the stricter Vol 50 floor used for building new pages doesn't apply) and found **201 real question-phrased keywords**, grouped into 14 themes below. This is the actual output the keyword-engine skill's Phase 7 calls for.

## Existing coverage (already live — don't duplicate)
- `src/config/site.ts` → `FAQ` array (5 Q&As: PDI, shaft length, delivery, finance, 2-stroke legislation)
- `src/components/pages/StaticViews.tsx` → `FAQView` (6 Q&As: shaft length, under-18 operation, 2-stroke legality, PDI, financing, electric runtime)

---

## Theme 1 — Serial number / age identification (26 keywords, 520/mo — biggest theme)
Real, low-KD (mostly KD 0), genuinely useful. Get a dedicated blog guide too (`blog-plan.md` #20).

**Q: How do I find my Mercury outboard's serial number?**
A: On most Mercury outboards, the serial number plate is on the transom bracket or engine mount, visible when the engine is tilted up. It's needed for warranty registration, genuine parts orders, and confirming the model year.

**Q: How do I tell the year of my Yamaha outboard?**
A: Yamaha serial numbers encode the model year in their format, stamped on a plate on the engine mounting bracket. If you're not sure how to read it, send us the serial number and we'll confirm the year for you.

**Q: Where is the serial number on an outboard motor?**
A: It's almost always on the transom clamp bracket or swivel bracket — the part that stays fixed to the boat even when the engine tilts. Check there first regardless of brand.

## Theme 2 — Oil & servicing (23 keywords, 500/mo)
**Q: How often should I service my outboard motor?**
A: Most manufacturers recommend an annual service or every 100 hours of use, whichever comes first — covering oil, spark plugs, and the water pump impeller. We stock genuine service kits for Yamaha, Suzuki and Mercury.

**Q: How do I change the impeller on my outboard?**
A: The water pump impeller sits in the lower unit and typically needs the gearcase removed to access — this is a job most owners have done professionally unless comfortable with engine mechanics, since a failed impeller causes overheating. See our full maintenance guide.

**Q: What oil should I use in my 4-stroke outboard?**
A: Use the manufacturer-specified viscosity and FC-W certified marine oil (never automotive oil) — we stock genuine Yamalube and equivalent oils for each brand we sell.

## Theme 3 — How it works / mechanics (9 keywords, 260/mo)
**Q: How does an outboard motor work?**
A: An outboard combines the engine, gearbox and propeller in one unit mounted on the transom, steered by pivoting the whole assembly — unlike an inboard, where only the propeller shaft passes through the hull.

**Q: What is command thrust on a Mercury outboard?**
A: Command Thrust is Mercury's high-thrust lower-unit design with a larger gearcase and propeller for extra low-speed pushing power — used on heavier boats, pontoons, and pushing tenders through current.

## Theme 4 — Reliability & quality (9 keywords, 200/mo)
**Q: Are Mercury outboards reliable?**
A: Mercury is one of the longest-established outboard manufacturers with a strong reliability record across their current 4-stroke range — every engine we sell also passes our own Pre-Delivery Inspection before dispatch.
**Q: Are electric outboards powerful enough for my boat?** *(cross-referenced with existing electric FAQ)*

## Theme 5 — Winterizing (11 keywords, 220/mo)
**Q: How do I winterize my outboard motor?**
A: Run the engine on fuel stabiliser, flush with fresh water, fog the cylinders with fogging oil, drain the gearcase, and store upright or as the manufacturer specifies. Full step-by-step guide linked below.
→ Full guide: `blog-plan.md` #17

## Theme 6 — Starting procedure (11 keywords, 220/mo)
**Q: How do I start an outboard motor for the first time?**
A: Check fuel/oil, prime the bulb if fitted, set choke, and pull or turn over — cold starts differ slightly by brand and 2-stroke vs 4-stroke. Full guide linked below.
→ Full guide: `blog-plan.md` #19

## Theme 7 — Flushing (9 keywords, 180/mo)
**Q: Do I need to flush my outboard after every use?**
A: Yes, especially after saltwater use — residual salt corrodes internal cooling passages over time. A quick flush with muffs or a flush-port takes under 5 minutes.
→ Full guide: `blog-plan.md` #18

## Theme 8 — Carburetor cleaning (9 keywords, 180/mo)
**Q: How do I clean my outboard's carburetor?**
A: Carburetor cleaning involves removing it, disassembling the float bowl and jets, and soaking in carb cleaner — ethanol fuel left sitting over winter is the most common cause of gumming. This is a job for confident DIYers or a service centre.

## Theme 9 — Buying guidance (5 keywords, 150/mo)
**Q: What should I look for when buying an outboard motor?**
A: Match HP to your boat and transom rating, confirm the correct shaft length, check whether you need electric or manual start, and buy from an authorised dealer for a valid manufacturer warranty and PDI.
**Q: Where can I buy outboard motors with a warranty?**
A: Every engine we sell carries full UK manufacturer warranty (up to 5 years on Yamaha/Suzuki/Honda/Mercury/Tohatsu) plus our own Pre-Delivery Inspection.

## Theme 10 — Shaft length (6 keywords, 120/mo)
*(Already covered well in existing FAQ — no new entry needed, just ensure the blog backlog item #21 links back here)*

## Theme 11 — Cost & value (6 keywords, 120/mo)
**Q: How much does an outboard motor cost?**
A: Prices range from around £700 for a 2.5HP portable engine to £45,000+ for a 400HP V10 offshore engine. See our full stock directory for current pricing across every HP band.

## Theme 12 — Storage & transport (5 keywords, 100/mo)
**Q: Can I lay an outboard motor on its side for transport?**
A: Most 4-stroke outboards should be transported upright or on the specific side the manufacturer recommends (check your manual) — laying it the wrong way can let oil flood the cylinders.

## Theme 13 — Speed & performance (5 keywords, 100/mo)
**Q: How fast will a small outboard motor go?**
A: Speed depends on boat weight and hull type as much as HP — a 4HP on a light dinghy might reach 5–6 knots, while the same engine on a heavier tender will be slower. Use our horsepower guide to match engine to boat.

## Theme 14 — Brand & manufacturer facts (~15 keywords, ~200/mo)
**Q: Who makes Mercury outboards?**
A: Mercury Marine, a division of Brunswick Corporation, based in Fond du Lac, Wisconsin, USA.
**Q: Does Tohatsu make Mercury outboards?**
A: Tohatsu and Mercury have historically collaborated on smaller portable outboard engines under licensing arrangements, though the two remain separate companies — **verify current arrangement before publishing this specific answer live**, as OEM relationships change over time and this must not be stated as fact without confirming it's still accurate.
*(Flagging this theme explicitly: brand-ownership/manufacturing-location facts must be verified against current public sources before publishing — do not publish from memory alone. This is the one FAQ theme with real fabrication risk if not checked.)*

---

## Schema notes
- All answers above are 40–80 words, structured for FAQPage JSON-LD.
- **Speakable candidates:** the PDI/warranty answer (Theme 9) and the serial-number-location answer (Theme 1) are the strongest featured-snippet/voice candidates — direct, concrete, no hedging.
- Themes 5–8 (winterizing/starting/flushing/carb-cleaning) should each show a short FAQ answer **plus a link to the full how-to blog guide** — don't try to fit the full process into an FAQ-length answer.
