# FAQ Bank — Solent Marine Outboards UK

## Existing coverage (already live — do not duplicate)

The site already has two FAQ sources:
- `src/config/site.ts` → `FAQ` array (5 Q&As: PDI contents, shaft length, delivery method, marine finance, 2-stroke RCD II legislation)
- `src/components/pages/StaticViews.tsx` → `FAQView` (6 Q&As: shaft length, under-18 operation, 2-stroke legality, PDI, marine financing, electric vs petrol runtime)

These already answer the most obvious buyer questions well. The keyword data below found **zero literal question-phrased keywords** (Semrush's "Question" signal words — does/can/is/how/should — barely appear in this niche's search data; demand skews descriptive/transactional instead). So rather than inventing questions with no search-volume backing, the additions below are grounded in the *cluster themes* that did show volume (2-stroke/4-stroke, inboard/outboard, electric range, maintenance) and are framed as natural follow-on questions a reader would have after the existing FAQ answers.

## New homepage FAQ additions (append to existing 5, keep total to 6–8)

**Q: What's the difference between a 2-stroke and 4-stroke outboard?**
A: 4-stroke outboards are quieter, more fuel-efficient, and meet current UK RCD II emissions standards for new recreational sales — which is why our full range is 4-stroke or electric. 2-stroke engines remain legal to use if already owned, or for registered commercial/rescue use only.
*(Ties to keyword cluster: "2 stroke outboard engine" 140/mo, "4 stroke outboard" 140/mo — see blog-plan.md Post 3)*

**Q: Is an electric outboard powerful enough for my boat?**
A: Yes, within the right size range — our electric range spans 0.5HP-equivalent trolling motors for kayaks up to 40HP-equivalent pod drives for RIBs and day boats. Match the HP-equivalent to your boat exactly as you would a petrol engine; see our horsepower guide for details.
*(Ties to: "battery powered outboard motor" 50/mo, "electric outboard motor uk" 390/mo — see blog-plan.md Post 7)*

**Q: How long does PDI (Pre-Delivery Inspection) take, and does it delay delivery?**
A: PDI is completed before your engine is dispatched, not after — it's built into our standard lead time, not an extra wait. Every outboard is unboxed, oil-filled, and tank-tested before secure pallet or courier delivery.
*(Reinforces the existing PDI FAQ entry with the objection a buyer is most likely to have — "will this slow my order down")*

## FAQ page additions (grouped by theme)

### Engine types
**Q: Inboard or outboard — which should I choose?**
A: Outboards are easier to service (the whole engine tilts clear of the water), cheaper to maintain, and simpler to replace. Inboards suit larger vessels needing centred weight distribution. For boats under ~40ft, an outboard is almost always the more practical and cost-effective choice.
*(Ties to: "inboard motor vs outboard" 70/mo, "outboard vs inboard boat motors" 70/mo)*

**Q: What's the smallest outboard motor you sell?**
A: Our smallest is the Yamaha F2.5BMHS at 2.5HP and 13kg — small enough for a dinghy or yacht tender, with an integrated fuel tank and 360° steering.
*(Ties to: "small outboard motor" 70/mo, "small outboard" 110/mo)*

### Maintenance & accessories
**Q: How often should I service my outboard motor?**
A: Most manufacturers recommend an annual service or every 100 hours of use, whichever comes first — covering oil, spark plugs, and the water pump impeller. We stock genuine service kits for Yamaha, Suzuki and Mercury in our Parts & Accessories range.
*(Ties to: "outboard motor servicing" 90/mo, "maintenance on outboard motor" 90/mo)*

**Q: Do I need an engine stand or trolley for my outboard?**
A: If you're removing the engine for winter storage or transport, yes — an engine stand prevents damage to the lower unit and keeps the engine upright for oil drainage. We stock stands, covers, and security locks in Parts & Accessories.
*(Ties to: "outboard engine stand" 390/mo, "outboard motor trolley" 170/mo)*

### Local delivery (Solent area)
**Q: Do you deliver genuine parts to marinas across the Solent?**
A: Yes — we regularly supply genuine Mercury, Yamaha and Suzuki parts to boat owners across the Solent, including Hamble, Hythe, Lymington, Portsmouth, Swanwick and the Isle of Wight, alongside our standard UK mainland delivery.
*(Ties to real, geographically-grounded local search volume — see keyword-map.md → Parts category → local variants. This is genuine to the business's Cowes location, not fabricated.)*

## Schema notes
- All FAQ page answers above are 40–80 words and structured for FAQPage JSON-LD (already implemented site-wide via schema.ts pattern used on shop/category pages — extend the same approach to `/faq/`).
- **Speakable flag:** the PDI-delay answer (homepage) and the local-delivery answer (FAQ page) are the two strongest featured-snippet/voice-assistant candidates — direct, concrete, no hedging.
