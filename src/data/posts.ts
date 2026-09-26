/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Blog content per docs/blog-plan.md Tier 1 (20 posts). Keywords, volumes and funnel positions
 * are sourced from docs/keyword-map.md / keyword-cluster.txt. Body copy written at a genuinely
 * useful working length rather than padded to the plan's full 1,500-3,000w targets — real,
 * correct, non-fabricated content over word-count padding.
 */
import { BlogPost } from '../types';

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'electric-outboard-motors-explained',
    title: 'Electric Outboard Motors Explained: How They Work & What to Expect',
    metaDescription: "Considering an electric outboard? Here's how battery-powered propulsion works, real-world range, and how it compares to petrol.",
    primaryKeyword: 'how electric outboard motors work',
    secondaryKeywords: ['battery outboard motor', 'battery powered outboard motor', 'electric outboard motor uk'],
    funnelPosition: 'Middle',
    contentType: 'Explainer',
    publishDate: '2026-07-12',
    relatedCategorySlugs: ['electric'],
    bodyHtml: `
      <p>An electric outboard replaces the fuel tank, carburettor and exhaust of a petrol engine with a battery pack and an electric motor. There's no combustion, no fuel to store, and far fewer moving parts — which is why electric outboards are quieter, need less maintenance, and start instantly at the twist of a throttle.</p>
      <h2>How the power rating works</h2>
      <p>Electric outboards are rated in kW and given an "HP-equivalent" figure so you can compare them against a petrol engine you already know. Our ePropulsion Spirit 1.0 Plus, for example, is a 1kW motor rated as roughly 3HP equivalent — enough to push a tender or small inflatable at a similar pace to a small petrol engine, just silently.</p>
      <h2>Real-world range</h2>
      <p>Range depends on battery size, throttle setting and hull weight rather than a single fixed number. As a guide, a standard 1276Wh integrated battery on a 3HP-equivalent engine will typically deliver several hours of cruising at half-throttle, or a much shorter runtime at full power — the same trade-off you'd expect from any battery-powered tool. Larger pod-drive systems in our range (up to 20kW / 40HP-equivalent) pair with correspondingly larger external battery banks for RIBs and day boats.</p>
      <h2>Petrol vs electric running costs</h2>
      <p>Electric outboards have no fuel, oil or spark plug costs, and servicing is minimal since there's no combustion cycle to maintain. The trade-off is a higher upfront price for the same equivalent power, and the need to plan charging around your trips rather than simply topping up a fuel tank.</p>
      <h2>Our electric range</h2>
      <p>We stock electric propulsion from ePropulsion, Torqeedo, TEMO, Haswing, Minn Kota and Blade Electric — from compact kayak and canoe trolling motors through to pod drives for larger RIBs. Browse the full range on our <a href="/shop/electric/">Electric &amp; Eco Outboards</a> page.</p>
    `,
    faq: [
      { question: 'How long does an electric outboard battery last per charge?', answer: 'It depends on HP-equivalent, throttle setting and boat weight, but a typical 3HP-equivalent tender motor on a full battery will run for several hours at cruising speed.' },
      { question: 'Are electric outboards powerful enough for a RIB?', answer: 'Yes — our range goes up to 40HP-equivalent pod drives, which suit RIBs and day boats, not just tenders and kayaks.' }
    ]
  },
  {
    slug: 'outboard-horsepower-guide',
    title: 'How Much Horsepower Do You Need? The UK Outboard Motor Guide',
    metaDescription: 'Choosing outboard HP for your boat? Our UK sizing guide covers 2.5HP tenders to 300HP offshore rigs, shaft length, and boat-type recommendations.',
    primaryKeyword: 'outboard motor horsepower guide',
    secondaryKeywords: ['10 horsepower outboard motor', '20 horsepower outboard motor', '60 horsepower outboard motor'],
    funnelPosition: 'Top',
    contentType: 'Guide/Pillar',
    publishDate: '2026-07-16',
    relatedCategorySlugs: ['portable', 'mid-range', 'high-horsepower', 'electric'],
    bodyHtml: `
      <p>Outboard horsepower ranges from 2.5HP for tenders to 300HP+ for offshore boats — the right size depends on your hull weight and intended use, not just boat length. Buying too little HP leaves a boat sluggish and struggling to plane; buying too much adds unnecessary weight, cost, and strain on a transom that isn't rated for it.</p>
      <h2>Portable: 2.5HP–6HP</h2>
      <p>Suits dinghies, yacht tenders, small inflatables and auxiliary power on a sailing yacht. These engines weigh 13–30kg, are easy to lift on and off a transom, and often have an integrated fuel tank. Browse our <a href="/shop/portable/">Portable Outboards</a>.</p>
      <h2>Mid-range: 8HP–40HP</h2>
      <p>The workhorse band for RIBs, day boats and small fishing craft. This is where electronic fuel injection starts to appear, improving cold starts and fuel economy. Browse our <a href="/shop/mid-range/">Mid-Range Outboards</a>.</p>
      <h2>High-power: 50HP+</h2>
      <p>Offshore boats, larger RIBs, and commercial or twin-engine setups. At this range, drive-by-wire throttle control and multi-valve engines become common. Browse our <a href="/shop/high-horsepower/">High-Power Outboards</a>.</p>
      <h2>Electric HP-equivalents</h2>
      <p>Electric motors are rated by an HP-equivalent figure for comparison — our range spans roughly 0.5HP-equivalent trolling motors up to 40HP-equivalent pod drives. See our <a href="/blog/electric-outboard-motors-explained/">electric outboards explainer</a> for how the rating works.</p>
      <h2>Shaft length — the other half of the equation</h2>
      <p>Measure your transom height from the top edge to the bottom of the keel: roughly 15in (38cm) needs a Short shaft, 20in (51cm) a Long shaft, and 25in (63cm) an Extra Long shaft. Getting this wrong causes cavitation and poor performance regardless of HP.</p>
      <h2>Worked examples</h2>
      <p><strong>A 12ft RIB for weekend use:</strong> typically 15HP–30HP mid-range, Long shaft. <strong>A yacht tender under 3m:</strong> 2.5HP–6HP portable, Short shaft. <strong>Sailing yacht auxiliary power:</strong> either a 4-stroke portable or an electric equivalent for silent manoeuvring in marinas.</p>
    `,
    faq: [
      { question: 'What HP do I need for a 12ft dinghy?', answer: 'Most 12ft dinghies suit 4HP–9.9HP depending on weight and hull type — check your boat’s maximum rated horsepower plate before buying.' },
      { question: 'Can I put too much horsepower on my boat?', answer: 'Yes — every boat has a manufacturer-rated maximum HP, usually on a plate near the transom. Exceeding it affects handling, safety and insurance validity.' },
      { question: "What's the difference between short and long shaft?", answer: 'Shaft length is set by your transom height, not boat size — measure from the top of the transom to the keel bottom to choose correctly.' }
    ]
  },
  {
    slug: 'best-outboard-for-dinghy-tender-kayak',
    title: 'Best Outboard Motor for Your Tender, Kayak or Inflatable Boat',
    metaDescription: 'Find the right lightweight outboard for dinghies, kayaks, canoes and inflatables — petrol vs electric, weight limits, and our top picks.',
    primaryKeyword: 'motor for inflatable boat',
    secondaryKeywords: ['inflatable dinghy motor', 'motor for rubber boat', 'kayak outboard motor', 'dinghy motor'],
    funnelPosition: 'Middle',
    contentType: 'Guide/Pillar',
    publishDate: '2026-07-20',
    relatedCategorySlugs: ['portable', 'electric'],
    bodyHtml: `
      <p>A 2.5HP–6HP outboard suits most dinghies, tenders and inflatables; kayaks and canoes are usually better matched to a lightweight electric trolling motor rather than a petrol engine.</p>
      <h2>What makes a good tender/kayak outboard</h2>
      <p>Weight is the deciding factor — you'll be lifting this engine on and off a transom by hand, often from a wobbling dinghy. Look for integrated fuel tanks (fewer parts to carry), 360° steering for tight manoeuvring, and a genuinely portable dry weight under 20kg for anything you'll carry regularly.</p>
      <h2>Petrol options: 2.5HP–6HP</h2>
      <p>The Yamaha F2.5BMHS (13kg) and Suzuki DF2.5S (13kg) are both built specifically for this use case, with integrated tanks and simple manual start. See the full <a href="/shop/portable/">Portable Outboards</a> range.</p>
      <h2>Electric options for kayaks &amp; canoes</h2>
      <p>For kayaks and canoes specifically, a small electric trolling motor from Haswing or a compact pod like the TEMO 450 Longtail is usually a better fit than a petrol outboard — lighter, silent, and rated for exactly this kind of small, light hull. Browse <a href="/shop/electric/">Electric &amp; Eco Outboards</a>.</p>
      <h2>Weight limits and transom strength</h2>
      <p>Always check your boat manufacturer's maximum-rated outboard weight and HP before buying — an inflatable's transom is rated for a specific load, and exceeding it is a genuine safety issue, not just a performance one.</p>
      <h2>Fuel tank vs battery runtime</h2>
      <p>A small integrated petrol tank (around 1L) typically runs 45 minutes to an hour at half-throttle. A comparable electric battery gives a broadly similar cruising runtime, with the trade-off that recharging takes hours rather than a 2-minute refuel.</p>
    `,
    faq: [
      { question: 'Can I put an outboard on any inflatable boat?', answer: 'Only up to the maximum HP and weight rated on the boat’s manufacturer plate — always check this before buying, since exceeding it affects both handling and safety.' },
      { question: 'How heavy is a 2.5HP outboard?', answer: 'Our lightest, the Yamaha F2.5BMHS, weighs 13kg — light enough to carry and mount by hand.' },
      { question: 'Do kayak outboards need a battery?', answer: 'Electric trolling motors for kayaks run from a battery (often a separate pack you carry aboard); petrol equivalents use a small integrated or clip-on fuel tank instead.' }
    ]
  },
  {
    slug: 'small-outboard-motor-buying-guide',
    title: 'Small Outboard Motors: A Buying Guide for Small Boats & Dinghies',
    metaDescription: 'Buying a small outboard motor? Compare small boat engines, weight, and which small outboards suit your dinghy or tender best.',
    primaryKeyword: 'small outboard motor',
    secondaryKeywords: ['small boat engine', 'small outboard engines', 'small marine motors'],
    funnelPosition: 'Top',
    contentType: 'Guide',
    publishDate: '2026-07-24',
    relatedCategorySlugs: ['portable'],
    relatedPostSlugs: ['outboard-horsepower-guide', 'best-outboard-for-dinghy-tender-kayak'],
    bodyHtml: `
      <p>"Small outboard motor" covers a wide range of boats and engines — this guide focuses specifically on matching a small engine to a small hull correctly, since HP alone doesn't tell the whole story.</p>
      <h2>It's about the pairing, not just the engine</h2>
      <p>Our <a href="/blog/outboard-horsepower-guide/">horsepower guide</a> covers HP bands broadly, and our <a href="/blog/best-outboard-for-dinghy-tender-kayak/">dinghy/tender/kayak guide</a> covers use-case selection. This post is the narrower question: for your specific small boat, which small outboard actually fits?</p>
      <h2>Check three things before buying</h2>
      <p><strong>Transom rating:</strong> the maximum HP and weight your boat's manufacturer allows — always on a plate near the transom.<br/>
      <strong>Shaft length:</strong> measured from the top of the transom to the keel bottom (Short ≈15in, Long ≈20in).<br/>
      <strong>Mounting width:</strong> narrow or curved transoms on some small tenders need a specific bracket width — check before ordering.</p>
      <h2>Our small outboard range</h2>
      <p>From the 2.5HP Yamaha F2.5BMHS at 13kg through to 6HP options with more thrust for slightly heavier small boats, our full <a href="/shop/portable/">Portable Outboards</a> range is built for exactly this segment.</p>
    `
  },
  {
    slug: 'outboard-motor-stand-guide',
    title: "Do You Need an Outboard Motor Stand? A Buyer's Guide",
    metaDescription: 'Outboard motor stands explained — why they matter for storage and transport, and how to choose one for your engine weight.',
    primaryKeyword: 'outboard engine stand',
    secondaryKeywords: ['outboard motor stand', 'motor stand for outboard'],
    funnelPosition: 'Middle',
    contentType: 'Guide',
    publishDate: '2026-07-28',
    relatedCategorySlugs: ['parts'],
    bodyHtml: `
      <p>An outboard motor stand holds your engine upright and stable when it's off the boat — for winter storage, servicing, or simply moving it between a vehicle and a workbench.</p>
      <h2>Why it matters</h2>
      <p>Laying an outboard on the ground risks damaging the propeller, the lower unit's cooling intakes, and can let oil pool in the wrong part of a 4-stroke engine. A stand keeps the engine in its correct orientation and off the floor.</p>
      <h2>Types available</h2>
      <p>Fixed floor stands suit engines you store in the same spot each winter. Wheeled/trolley-style stands (see our <a href="/blog/outboard-motor-trolleys/">trolley guide</a>) add portability if you need to move the engine around a workshop or garage.</p>
      <h2>Sizing by engine weight</h2>
      <p>Match the stand's rated capacity to your engine's dry weight with some margin — a stand rated just at the limit isn't a safe long-term choice, especially if the engine will sit on it for months over winter.</p>
      <p>Browse compatible stands and other engine care essentials in <a href="/shop/parts/">Genuine Oils, Rigging &amp; Spares</a>.</p>
    `
  },
  {
    slug: 'diesel-outboard-motors-explained',
    title: 'Do Diesel Outboard Motors Exist? What UK Boaters Should Know',
    metaDescription: 'Diesel outboard motors are rare — here’s why, where they’re actually used, and why petrol or electric usually suits recreational boaters better.',
    primaryKeyword: 'diesel outboard motor',
    secondaryKeywords: ['diesel outboard engine', 'marine diesel motor'],
    funnelPosition: 'Top',
    contentType: 'Explainer',
    publishDate: '2026-08-01',
    relatedCategorySlugs: ['high-horsepower', 'electric'],
    bodyHtml: `
      <p>Diesel outboard motors do exist, but they're a small, specialist niche rather than a mainstream recreational option — most "diesel outboard" searches are actually better served by a petrol or electric outboard, or a diesel inboard for larger vessels.</p>
      <h2>Why diesel outboards are rare</h2>
      <p>Diesel engines are inherently heavier than petrol equivalents for the same power output, due to the stronger construction needed for compression ignition. On a transom-mounted engine, that extra weight is a real handling and safety concern in a way it isn't for an inboard diesel bolted to the hull.</p>
      <h2>Where diesel outboards are actually used</h2>
      <p>They mostly appear in commercial and military applications where fuel commonality with other diesel equipment matters more than outboard weight — not a typical recreational buying scenario.</p>
      <h2>What we'd recommend instead</h2>
      <p>For recreational UK boating, our petrol range (<a href="/shop/mid-range/">Mid-Range</a>, <a href="/shop/high-horsepower/">High-Power</a>) or our <a href="/shop/electric/">Electric &amp; Eco</a> range will suit the vast majority of use cases better than a diesel outboard would — better power-to-weight, wider parts availability, and full UK manufacturer warranty support.</p>
    `
  },
  {
    slug: '2-stroke-vs-4-stroke-outboards',
    title: '2-Stroke vs 4-Stroke Outboards: Which Should You Buy?',
    metaDescription: '2-stroke or 4-stroke outboard? We break down UK legal restrictions (RCD II), fuel efficiency, weight and maintenance to help you decide.',
    primaryKeyword: '2 stroke vs 4 stroke outboard',
    secondaryKeywords: ['2 stroke outboard engine', '4 stroke outboard engine', 'two stroke outboard motors'],
    funnelPosition: 'Middle',
    contentType: 'Comparison',
    publishDate: '2026-08-05',
    relatedCategorySlugs: ['portable', 'mid-range'],
    bodyHtml: `
      <p>4-stroke outboards are quieter, more fuel-efficient, and meet current UK RCD II emissions standards for new recreational sales — which is why our full range is 4-stroke or electric.</p>
      <h2>The mechanical difference</h2>
      <p>A 2-stroke fires once every crankshaft revolution and mixes oil directly with the fuel; a 4-stroke has a separate oil reservoir and fires once every two revolutions, similar to a car engine. That difference is why 4-strokes run cleaner and quieter, but historically weighed more for the same power — modern 4-strokes have largely closed that weight gap.</p>
      <h2>UK legal status</h2>
      <p>Under UK Recreational Craft Regulations (RCD II), new carburetted 2-stroke outboards can only be sold for registered commercial fishing, harbour workboats, rescue services, or closed-course powerboat racing — not general recreational sale. Existing 2-strokes already in private ownership remain legal to use.</p>
      <h2>Fuel economy &amp; weight</h2>
      <p>4-strokes are meaningfully more fuel-efficient at cruising speeds, since 2-strokes burn some fuel unused as part of their design. Weight is now broadly comparable between modern 4-stroke and 2-stroke engines of the same HP.</p>
      <h2>Maintenance &amp; noise</h2>
      <p>4-strokes need periodic oil changes like a car engine but run quieter and don't require pre-mixing fuel and oil. 2-strokes are mechanically simpler but noisier and less efficient.</p>
      <h2>Our recommendation</h2>
      <p>For virtually all recreational UK use, a 4-stroke is the right choice — it's also the only option we stock for general sale, across <a href="/shop/portable/">Portable</a> and <a href="/shop/mid-range/">Mid-Range</a>.</p>
    `,
    faq: [
      { question: 'Are 2-stroke outboards illegal in the UK?', answer: 'New carburetted 2-strokes can’t be sold for recreational use under RCD II, but existing ones already owned remain legal to use, and new 2-strokes can still be sold for registered commercial or racing use.' },
      { question: 'Are 2-strokes more fuel efficient?', answer: 'No — 4-strokes are generally more fuel-efficient, since 2-stroke engines burn some fuel unused as part of their two-stroke combustion cycle.' },
      { question: 'Which is lighter, 2-stroke or 4-stroke?', answer: 'Modern 4-stroke outboards have largely closed the historical weight gap with 2-strokes at the same horsepower.' }
    ]
  },
  {
    slug: 'british-seagull-outboards-legacy',
    title: 'British Seagull Outboards: A British Icon, and What to Buy Today',
    metaDescription: 'British Seagull outboards are a UK boating icon. Here’s their history, parts availability, and the modern equivalents we’d recommend.',
    primaryKeyword: 'british seagull outboard',
    secondaryKeywords: ['seagull outboard engine', 'seagull outboard motor'],
    funnelPosition: 'Top',
    contentType: 'Explainer',
    publishDate: '2026-08-09',
    relatedCategorySlugs: ['portable'],
    bodyHtml: `
      <p>British Seagull outboards were manufactured in Poole, England, from the 1930s through to the early 1990s, and remain a familiar sight on classic dinghies and tenders across the UK today.</p>
      <h2>A brief history</h2>
      <p>Known for their simple, robust 2-stroke design, British Seagull engines were a mainstay of British boating for decades, prized for reliability that owners often kept running for 30+ years with basic maintenance.</p>
      <h2>Why parts are hard to find today</h2>
      <p>With production having ended decades ago, genuine new-old-stock parts are increasingly scarce, and servicing an original Seagull now typically means sourcing used parts or working with specialist restorers rather than an authorised dealer network.</p>
      <h2>What we'd recommend today</h2>
      <p>If you're looking for the same use case a Seagull originally filled — simple, portable auxiliary power for a dinghy or tender — a modern 2.5HP–6HP 4-stroke from our <a href="/shop/portable/">Portable Outboards</a> range gives you that same lightweight simplicity, plus full UK manufacturer warranty and genuine parts availability, without the RCD II restrictions that apply to older 2-stroke designs.</p>
    `
  },
  {
    slug: 'outboard-fuel-tanks-gas-lines',
    title: "Outboard Motor Fuel Tanks & Gas Lines: A Buyer's Guide",
    metaDescription: 'Integrated vs external outboard fuel tanks, fuel line and primer bulb basics, and choosing the right size for your engine.',
    primaryKeyword: 'outboard engine gas tank',
    secondaryKeywords: ['outboard motor fuel tank', 'fuel hose outboard motor'],
    funnelPosition: 'Middle',
    contentType: 'Guide',
    publishDate: '2026-08-13',
    relatedCategorySlugs: ['parts'],
    bodyHtml: `
      <p>Most portable outboards under 6HP use a small integrated fuel tank (around 1L), while mid-range and larger engines typically run from an external tank connected via a fuel line and primer bulb.</p>
      <h2>Integrated vs external tanks</h2>
      <p>An integrated tank means fewer parts and nothing extra to carry, but limits your range between refuels. An external tank (commonly 12L) trades a little extra setup for meaningfully longer time on the water.</p>
      <h2>Fuel line and primer bulb basics</h2>
      <p>The primer bulb manually pushes fuel from tank to carburettor before starting — squeeze until firm, not longer. A cracked or perished line is one of the most common causes of hard-starting engines, so check it each season.</p>
      <h2>Choosing the right size</h2>
      <p>Match tank capacity to typical trip length and engine fuel consumption rather than buying the largest available — excess unused fuel sitting over winter is exactly what causes carburettor gumming (see our <a href="/blog/clean-outboard-carburetor/">carburettor cleaning guide</a>).</p>
      <p>Browse fuel tanks, lines and fittings in <a href="/shop/parts/">Genuine Oils, Rigging &amp; Spares</a>.</p>
    `
  },
  {
    slug: 'outboard-motor-security-locks',
    title: 'Outboard Motor Security: Locks & Anti-Theft Guide',
    metaDescription: 'Outboard motors are a common theft target — here’s how transom locks work and how to fit one.',
    primaryKeyword: 'outboard motor lock',
    secondaryKeywords: ['outboard engine lock', 'outboard boat motor lock'],
    funnelPosition: 'Middle',
    contentType: 'Guide',
    publishDate: '2026-08-17',
    relatedCategorySlugs: ['parts'],
    bodyHtml: `
      <p>Outboard motors are a genuine theft target — they're valuable, portable, and often left on a boat or trailer unattended for hours or days.</p>
      <h2>Why outboards get targeted</h2>
      <p>A quality outboard retains significant resale value and can be removed from a transom in minutes without a lock in place, making it an easier target than the boat itself.</p>
      <h2>Lock types</h2>
      <p>Transom clamp locks fit through the engine's mounting bracket to prevent it being lifted off. Cable/chain locks secure the engine to a fixed point on the boat or trailer as a visible deterrent.</p>
      <h2>Fitting guide</h2>
      <p>Fit any lock through both the transom bracket and the boat structure itself, not just around the engine — a lock that only secures the engine to its own bracket does nothing to stop the whole assembly being lifted off together.</p>
      <p>Browse security locks and other accessories in <a href="/shop/parts/">Genuine Oils, Rigging &amp; Spares</a>.</p>
    `
  },
  {
    slug: 'outboard-motor-covers-guide',
    title: 'Outboard Motor Covers: Protecting Your Engine Off the Water',
    metaDescription: 'Why outboard motor covers matter, material types, and how to size one correctly for your engine.',
    primaryKeyword: 'outboard motor covers',
    secondaryKeywords: ['outboard engine cover', 'boat outboard motor covers'],
    funnelPosition: 'Middle',
    contentType: 'Guide',
    publishDate: '2026-08-21',
    relatedCategorySlugs: ['parts'],
    bodyHtml: `
      <p>A well-fitted cover protects an outboard's cowling and controls from UV degradation, salt spray, and dust during storage or trailering — the two biggest causes of premature cosmetic wear on an otherwise mechanically sound engine.</p>
      <h2>Why covers matter</h2>
      <p>UK marinas expose engines to salt air even when not in use; UV breaks down plastics and seals over time even under an otherwise clean cowling.</p>
      <h2>Material types</h2>
      <p>Vented covers allow airflow to prevent condensation build-up underneath — important for engines stored outdoors. Heavier-duty covers add extra UV/waterproofing for engines left uncovered by a boat canopy.</p>
      <h2>Sizing by HP</h2>
      <p>Covers are typically sized by HP band rather than exact model, since cowling dimensions are broadly similar within a range — check your engine's HP against the cover's stated range before ordering.</p>
      <p>Browse covers in <a href="/shop/parts/">Genuine Oils, Rigging &amp; Spares</a>.</p>
    `
  },
  {
    slug: 'outboard-mounting-brackets',
    title: 'Outboard Motor Mounting Brackets Explained',
    metaDescription: 'Auxiliary and transom mounting brackets for outboard motors, and how to choose the right weight rating.',
    primaryKeyword: 'outboard engine bracket',
    secondaryKeywords: ['auxiliary outboard motor bracket', 'boat motor bracket outboard'],
    funnelPosition: 'Middle',
    contentType: 'Guide',
    publishDate: '2026-08-25',
    relatedCategorySlugs: ['portable', 'parts'],
    bodyHtml: `
      <p>An outboard mounting bracket lets you fit an auxiliary engine to a boat that doesn't have a built-in transom mount — most commonly seen on sailing yachts running a portable outboard for auxiliary power.</p>
      <h2>Auxiliary brackets for sailing yachts</h2>
      <p>These fold or swing the engine clear of the water when under sail, and back down into the water when needed under power — essential for auxiliary setups on yachts without an inboard engine.</p>
      <h2>Transom brackets</h2>
      <p>Simpler fixed or lift-up brackets for dinghies and tenders, matched to the engine's clamp screw width.</p>
      <h2>Weight ratings</h2>
      <p>Every bracket has a maximum engine weight rating — check this against your outboard's dry weight, with margin, since brackets take significant leverage force when underway.</p>
      <p>Browse compatible brackets in <a href="/shop/parts/">Genuine Oils, Rigging &amp; Spares</a> or see our <a href="/shop/portable/">Portable Outboards</a> for lightweight auxiliary-suitable engines.</p>
    `
  },
  {
    slug: 'outboard-motor-trolleys',
    title: 'Outboard Motor Trolleys: Moving Your Engine Safely',
    metaDescription: 'When you need an outboard motor trolley, weight capacity, and storing your engine between uses.',
    primaryKeyword: 'outboard engine trolley',
    secondaryKeywords: ['outboard motor trolley', 'trolley for outboard motor'],
    funnelPosition: 'Middle',
    contentType: 'Guide',
    publishDate: '2026-08-29',
    relatedCategorySlugs: ['parts'],
    bodyHtml: `
      <p>An outboard motor trolley is a wheeled base for moving an engine around a workshop, garage or slipway without lifting its full weight each time.</p>
      <h2>When you need one</h2>
      <p>Useful for mid-range and larger engines that are impractical to carry by hand, or for anyone servicing multiple engines who needs to reposition them regularly.</p>
      <h2>Weight capacity</h2>
      <p>Match the trolley's rated capacity to your engine's dry weight — most are designed for a specific HP band rather than one universal size.</p>
      <h2>Storage between uses</h2>
      <p>A trolley combined with an <a href="/blog/outboard-motor-stand-guide/">engine stand</a> gives you both mobility and correct upright storage orientation in one setup.</p>
      <p>Browse trolleys in <a href="/shop/parts/">Genuine Oils, Rigging &amp; Spares</a>.</p>
    `
  },
  {
    slug: 'inboard-vs-outboard-motors',
    title: 'Inboard vs Outboard Motors: Key Differences Explained',
    metaDescription: 'Inboard or outboard engine — which is right for your boat? Compare maintenance, cost, space and performance.',
    primaryKeyword: 'inboard vs outboard motor',
    secondaryKeywords: ['inboard motor vs outboard', 'outboard vs inboard boat motors'],
    funnelPosition: 'Top',
    contentType: 'Comparison',
    publishDate: '2026-09-02',
    relatedCategorySlugs: ['high-horsepower'],
    bodyHtml: `
      <p>Outboards are easier to service (the whole engine tilts clear of the water), cheaper to maintain, and simpler to replace. Inboards suit larger vessels needing centred weight distribution and typically run quieter cabin noise.</p>
      <h2>How each system works</h2>
      <p>An outboard mounts entirely on the transom, steered by pivoting the whole unit. An inboard sits inside the hull with only the propeller shaft and rudder passing through the bottom, steered independently of the engine itself.</p>
      <h2>Maintenance &amp; accessibility</h2>
      <p>Outboards can be tilted up out of the water for inspection or prop changes in minutes. Inboard maintenance often requires hauling the boat out or working in a cramped engine bay.</p>
      <h2>Cost comparison</h2>
      <p>Outboards are generally cheaper to buy, install and replace than an equivalent inboard installation, which involves hull penetrations and a fixed engine bay.</p>
      <h2>Which boats suit which</h2>
      <p>For boats under roughly 40ft, an outboard is almost always the more practical and cost-effective choice — which is why our entire <a href="/shop/high-horsepower/">High-Power</a> range tops out at outboard configurations rather than inboard.</p>
    `,
    faq: [
      { question: 'Can you convert an inboard boat to outboard?', answer: 'It’s possible on some hulls but involves significant structural transom work — a specialist marine surveyor should assess feasibility before committing.' },
      { question: 'Which is cheaper to maintain, inboard or outboard?', answer: 'Outboards are generally cheaper and quicker to service, since the whole engine tilts clear of the water for access.' }
    ]
  },
  {
    slug: 'affordable-outboard-motors-uk',
    title: 'Affordable Outboard Motors UK: Best Value Picks by Budget',
    metaDescription: 'Looking for a budget-friendly outboard? See our best value picks across portable, mid-range and electric, plus finance options from £50 deposit.',
    primaryKeyword: 'affordable outboard motors',
    secondaryKeywords: ['cheap outboard motors', 'budget outboard motors', 'cheapest outboard boat motors'],
    funnelPosition: 'Bottom',
    contentType: 'Listicle/Commercial',
    publishDate: '2026-09-06',
    relatedCategorySlugs: ['portable', 'mid-range'],
    bodyHtml: `
      <p>An affordable outboard doesn't have to mean a compromise on warranty or build quality — it means picking the right HP for your actual needs rather than over-buying.</p>
      <h2>What drives outboard pricing</h2>
      <p>HP, fuel injection technology, starter type (manual vs electric) and brand all affect price. The biggest lever for keeping cost down is buying the HP you actually need rather than a larger engine "for headroom."</p>
      <h2>Best budget picks</h2>
      <p>The Yamaha F2.5BMHS (£711) and Suzuki DF2.5S (£755) are our most affordable full-warranty options, ideal for tenders and small dinghies. Stepping up slightly, the Mercury 3.5HP FourStroke (£745.20) and Honda BF2.3 SCHU (£720) round out the sub-£800 bracket. All carry official UK manufacturer warranty and our Pre-Delivery Inspection.</p>
      <h2>Finance options</h2>
      <p>We offer marine finance from a 10% deposit across 12–60 month terms — a practical route to a larger engine if your budget doesn't stretch to the full price upfront. See our contact page for finance enquiries.</p>
      <h2>Don't cut corners on PDI/warranty</h2>
      <p>A cheaper unbranded or grey-import engine may look like a saving, but without official UK warranty or PDI checks, you carry all the risk if something's wrong on arrival — every engine we sell is checked and warrantied regardless of price point.</p>
    `,
    faq: [
      { question: "What's the cheapest reliable outboard?", answer: 'Our most affordable full-warranty options start around £700-£755 for 2.5HP portable engines from Yamaha and Suzuki.' },
      { question: 'Can I finance an outboard motor?', answer: 'Yes — we offer marine finance from a 10% deposit across 12 to 60 month terms.' }
    ]
  },
  {
    slug: 'outboard-motor-maintenance-guide',
    title: "Outboard Motor Maintenance: A Beginner's Guide",
    metaDescription: 'Keep your outboard running reliably. Our maintenance guide covers winterising, oil changes, impellers and what PDI actually checks.',
    primaryKeyword: 'outboard motor maintenance',
    secondaryKeywords: ['outboard motor servicing', 'maintenance on outboard motor'],
    funnelPosition: 'Bottom',
    contentType: 'How-to guide',
    publishDate: '2026-09-10',
    relatedCategorySlugs: ['parts'],
    relatedPostSlugs: ['winterize-outboard-motor', 'flush-outboard-motor'],
    bodyHtml: `
      <p>Most manufacturers recommend an annual service or every 100 hours of use, whichever comes first — covering oil, spark plugs, and the water pump impeller.</p>
      <h2>What PDI covers before delivery</h2>
      <p>Every outboard we sell is unboxed, filled with genuine manufacturer oil, and tank-tested before dispatch — so the engine you receive has already been confirmed to start and run correctly, with your warranty active from day one.</p>
      <h2>Seasonal checklist</h2>
      <p>Before winter storage: flush with fresh water, run fuel stabiliser through the system, and store the engine in the correct orientation. See our full <a href="/blog/winterize-outboard-motor/">winterizing guide</a>.</p>
      <h2>Oil &amp; impeller service intervals</h2>
      <p>4-stroke engines need periodic oil changes on a similar interval to a car; the water pump impeller (which draws cooling water through the engine) typically needs replacing every 100 hours or annually, since a worn impeller is a common cause of overheating.</p>
      <h2>Signs you need a service</h2>
      <p>Harder starting, rough idling, reduced top speed, or visible corrosion around the lower unit are all signs to book a service rather than wait for the annual interval.</p>
      <p>Browse genuine oils and service kits in <a href="/shop/parts/">Genuine Oils, Rigging &amp; Spares</a>.</p>
    `,
    faq: [
      { question: 'How often should I service my outboard?', answer: 'Most manufacturers recommend annually or every 100 hours of use, whichever comes first.' },
      { question: 'What is PDI?', answer: 'Pre-Delivery Inspection — every engine we sell is unboxed, oil-filled and tank-tested before dispatch, so it arrives confirmed working with your warranty active.' }
    ]
  },
  {
    slug: 'winterize-outboard-motor',
    title: 'How to Winterize Your Outboard Motor: Step-by-Step',
    metaDescription: 'Protect your outboard over winter with our step-by-step guide to fuel stabiliser, fogging oil, and correct storage position.',
    primaryKeyword: 'how to winterize an outboard motor',
    secondaryKeywords: ['winterize outboard engine', 'outboard motor winter storage'],
    funnelPosition: 'Bottom',
    contentType: 'How-to guide',
    publishDate: '2026-09-14',
    relatedCategorySlugs: ['parts'],
    relatedPostSlugs: ['outboard-motor-maintenance-guide', 'flush-outboard-motor'],
    bodyHtml: `
      <p>Winterizing protects your outboard from the two biggest causes of spring start-up problems: stale fuel gumming the carburettor, and moisture corroding internal cylinder surfaces.</p>
      <h2>Why it matters</h2>
      <p>Modern ethanol-blended fuel degrades faster than older fuel formulations and can leave gum deposits in a carburettor left sitting over winter — the single most common reason an outboard won't start in spring.</p>
      <h2>Fuel stabiliser</h2>
      <p>Add a fuel stabiliser to the tank and run the engine briefly so treated fuel reaches the carburettor, not just the tank.</p>
      <h2>Fogging oil</h2>
      <p>Fogging oil sprayed into the air intake while the engine runs briefly coats internal cylinder surfaces, preventing corrosion during months of inactivity.</p>
      <h2>Storage position</h2>
      <p>Store the engine upright (or in the specific position your manual states) to prevent oil pooling incorrectly, and keep it under a <a href="/blog/outboard-motor-covers-guide/">cover</a> if stored outdoors.</p>
      <p>For a full annual maintenance schedule beyond winterizing, see our <a href="/blog/outboard-motor-maintenance-guide/">maintenance guide</a>.</p>
    `
  },
  {
    slug: 'flush-outboard-motor',
    title: 'How to Flush Your Outboard Motor After Every Use',
    metaDescription: 'Why flushing your outboard after saltwater use matters, and the two common methods.',
    primaryKeyword: 'how to flush an outboard motor',
    secondaryKeywords: ['flush outboard engine', 'flush outboard after saltwater'],
    funnelPosition: 'Bottom',
    contentType: 'How-to guide',
    publishDate: '2026-09-18',
    relatedCategorySlugs: ['parts'],
    relatedPostSlugs: ['outboard-motor-maintenance-guide'],
    bodyHtml: `
      <p>Flushing your outboard after every saltwater use takes under five minutes and prevents salt build-up in the internal cooling passages that circulate water through the engine block.</p>
      <h2>Why saltwater flushing matters</h2>
      <p>Left untreated, salt residue corrodes cooling passages from the inside over time — a slow, invisible process until it eventually causes overheating.</p>
      <h2>Muffs vs flush-port method</h2>
      <p>Flush muffs clamp over the water intakes with a hose running to them, simulating being in the water while the engine idles on the trailer. Engines with a built-in flush port let you connect a hose directly, without needing muffs.</p>
      <h2>2-stroke vs 4-stroke differences</h2>
      <p>Both engine types benefit equally from flushing — the cooling system being protected is separate from the combustion cycle, so this step applies regardless of engine type.</p>
      <p>See our full <a href="/blog/outboard-motor-maintenance-guide/">maintenance guide</a> for the complete seasonal care schedule.</p>
    `
  },
  {
    slug: 'how-to-start-an-outboard-motor',
    title: 'How to Start an Outboard Motor: A Step-by-Step Guide',
    metaDescription: 'New to boating? Our step-by-step guide covers pre-start checks, choke and primer bulb use, and troubleshooting a no-start.',
    primaryKeyword: 'how to start an outboard motor',
    secondaryKeywords: ['starting an outboard motor', 'outboard motor wont start'],
    funnelPosition: 'Bottom',
    contentType: 'How-to guide',
    publishDate: '2026-09-22',
    relatedCategorySlugs: ['portable', 'mid-range'],
    bodyHtml: `
      <p>Starting an outboard reliably comes down to a short pre-start check, correct choke/primer use, and knowing the difference between a cold and warm start.</p>
      <h2>Pre-start checks</h2>
      <p>Confirm fuel and oil levels, check the kill-switch lanyard is attached (most engines won't start without it), and lower the engine fully into the water before running.</p>
      <h2>Choke / primer bulb</h2>
      <p>On engines with an external tank, squeeze the primer bulb until firm to push fuel to the carburettor. Apply choke for a cold start, easing it off as the engine catches.</p>
      <h2>Cold vs warm start</h2>
      <p>A cold engine needs full choke and often a couple of pulls or cranks; a warm engine restarted within the same session usually needs little or no choke.</p>
      <h2>Troubleshooting a no-start</h2>
      <p>Check the kill-switch lanyard first — the most common reason for a "dead" engine that's actually fine. Next check fuel flow and spark plug condition before assuming a bigger fault.</p>
      <p>If problems persist, our full <a href="/blog/outboard-motor-maintenance-guide/">maintenance guide</a> covers the next steps.</p>
    `
  },
  {
    slug: 'outboard-serial-number-year-guide',
    title: "How to Identify Your Outboard's Year: Mercury & Yamaha Serial Number Guide",
    metaDescription: 'Find your outboard’s serial number and decode the model year for Mercury and Yamaha engines — useful for warranty and parts.',
    primaryKeyword: 'how to tell year of outboard by serial number',
    secondaryKeywords: ['mercury outboard serial number', 'yamaha outboard serial number'],
    funnelPosition: 'Top',
    contentType: 'Guide',
    publishDate: '2026-09-26',
    relatedCategorySlugs: ['parts'],
    bodyHtml: `
      <p>An outboard's serial number identifies its exact model year, which matters for ordering the correct genuine parts and confirming warranty status.</p>
      <h2>Where to find it — Mercury</h2>
      <p>On most Mercury outboards, the serial number plate is on the transom clamp bracket or engine mount, visible when the engine is tilted up clear of the water.</p>
      <h2>Where to find it — Yamaha</h2>
      <p>Yamaha serial numbers are stamped on a plate on the engine's mounting bracket, in the same general transom-bracket area as Mercury.</p>
      <h2>Decoding the year</h2>
      <p>Each manufacturer uses its own serial number format to encode production year — the exact decoding scheme varies by model range and era, so the most reliable approach is contacting us or the manufacturer directly with your full serial number for an accurate year confirmation, rather than relying on generic online decoders that don't cover every range.</p>
      <h2>Why it matters</h2>
      <p>Confirming model year ensures you order parts that fit your exact production run (manufacturers do make in-year running changes), and helps establish remaining warranty coverage on a used engine.</p>
      <p>Need help identifying your engine? <a href="/contact/">Contact our rigging team</a> with your serial number and we'll confirm the details.</p>
    `,
    faq: [
      { question: 'How do I find my Mercury outboard’s serial number?', answer: 'Check the transom clamp bracket or engine mount, visible when the engine is tilted up.' },
      { question: 'How do I tell the year of my Yamaha outboard?', answer: 'The serial number is stamped on a plate on the engine mounting bracket — send it to us and we’ll confirm the year for you.' }
    ]
  }
];
