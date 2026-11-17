import type { PostBody } from './postBodiesA';

export const POST_BODIES_B: Record<string, PostBody> = {
  'diesel-outboard-motors-explained': {
    title: 'Diesel Outboard Motors: Do They Exist & Are They Right for You?',
    metaDescription: 'Do diesel outboard motors exist? Yes, but they are rare, heavy and aimed at commercial and military users. How they work, why petrol and electric suit most UK boaters.',
    relatedPostSlugs: ['2-stroke-vs-4-stroke-outboards', 'electric-outboard-motors-explained', 'inboard-vs-outboard-motors'],
    relatedCategorySlugs: ['high-horsepower', 'electric', 'mid-range'],
    bodyHtml: `
<p>Yes, diesel outboard motors exist, but they are rare. A small number of manufacturers build them mainly for commercial, patrol and military boats where one fuel type across the whole fleet is a big advantage. For most recreational boaters in the UK, a petrol four-stroke or an electric outboard is the more practical choice.</p>

<h2>Why would anyone want a diesel outboard?</h2>
<ul>
<li><strong>One fuel for the fleet:</strong> workboats and patrol craft often carry diesel for their inboard engines, so running the outboard on the same fuel simplifies logistics.</li>
<li><strong>Fire risk:</strong> diesel is less volatile than petrol, which is attractive for safety-conscious operators.</li>
<li><strong>Torque and economy:</strong> diesel engines deliver strong low-speed torque and good fuel economy at working loads.</li>
</ul>

<h2>Why are diesel outboards uncommon?</h2>
<p>Diesel engines are heavier and more complex than petrol engines of the same power, and an outboard has to hang on the transom. The extra weight, the cost of the engine and the limited number of models mean they are mostly specified for commercial work. Companies such as OXE and Cox Powertrain have built diesel outboards, aimed at larger boats and professional users rather than tenders and dinghies.</p>

<h2>Small diesel outboards: why you won\'t find one</h2>
<p>If you searched for a small diesel outboard for a dinghy or tender, you will not find one. The weight and cost of a diesel make little sense below high power levels, which is why small outboards are petrol four-strokes or electric.</p>

<h2>What should recreational boaters choose instead?</h2>
<table>
<thead><tr><th>Need</th><th>Best option</th><th>Why</th></tr></thead>
<tbody>
<tr><td>Dinghy, tender, small inflatable</td><td>Petrol 2.5HP to 6HP</td><td>Light, simple, widely serviced. <a href="/shop/portable/">Small outboards</a></td></tr>
<tr><td>Quiet, zero-emission running</td><td>Electric outboard</td><td>No fuel or oil. <a href="/shop/electric/">Electric outboards</a></td></tr>
<tr><td>RIBs and day boats</td><td>Petrol 20HP to 150HP</td><td>Wide choice of four-strokes. <a href="/shop/mid-range/">Mid-range</a> and <a href="/shop/high-horsepower/">high-power</a></td></tr>
<tr><td>Heavy commercial or patrol work</td><td>Diesel outboard or inboard</td><td>Specialist suppliers</td></tr>
</tbody>
</table>

<h2>Our advice</h2>
<p>We do not sell diesel outboards. If you are looking at diesel because you want low running costs or fewer fire risks, an <a href="/blog/electric-outboard-motors-explained/">electric outboard</a> may suit short trips, and a modern fuel-injected four-stroke is efficient for longer ones. If you need an engine for a commercial boat, contact us and we will tell you honestly what we can and cannot supply. You can also compare petrol and two-stroke choices in our <a href="/blog/2-stroke-vs-4-stroke-outboards/">two-stroke vs four-stroke guide</a>.</p>`,
    faq: [
      { question: 'Do diesel outboard motors exist?', answer: 'Yes. A small number of manufacturers build them, mainly for commercial and military boats. They are rare in recreational boating.' },
      { question: 'Is there a small diesel outboard for a dinghy?', answer: 'No. Diesel outboards are heavy and expensive, so small dinghy and tender engines are petrol four-strokes or electric.' },
      { question: 'Do you sell diesel outboards?', answer: 'No. We supply new petrol and electric outboards from Yamaha, Suzuki, Honda, Mercury, Tohatsu, ePropulsion, Torqeedo and others.' }
    ]
  },

  '2-stroke-vs-4-stroke-outboards': {
    title: '2-Stroke vs 4-Stroke Outboards: Which Should You Buy?',
    metaDescription: '2-stroke vs 4-stroke outboards compared: weight, power, fuel, noise, maintenance and UK emissions rules. Why most buyers now choose a four-stroke.',
    relatedPostSlugs: ['outboard-motor-maintenance-guide', 'diesel-outboard-motors-explained', 'outboard-horsepower-guide'],
    bodyHtml: `
<p>For most UK boaters buying new, the answer is a four-stroke. Four-stroke outboards are quieter, cleaner and more economical, and they run on plain petrol. Two-strokes are lighter and simpler, but emissions rules and fuel mixing make them a niche choice today.</p>

<h2>How they differ</h2>
<p>A <strong>two-stroke</strong> engine fires on every revolution and relies on oil mixed with the petrol (or injected separately) to lubricate the engine. A <strong>four-stroke</strong> fires every second revolution and has a separate oil sump, like a car engine.</p>

<table>
<thead><tr><th></th><th>Four-stroke</th><th>Two-stroke</th></tr></thead>
<tbody>
<tr><td>Fuel</td><td>Plain unleaded petrol</td><td>Petrol mixed with two-stroke oil (or oil injection)</td></tr>
<tr><td>Weight</td><td>Heavier for the same power</td><td>Lighter, good power-to-weight</td></tr>
<tr><td>Noise and smoke</td><td>Quieter, much cleaner</td><td>Louder, more smoke and smell</td></tr>
<tr><td>Fuel economy</td><td>Better</td><td>Usually thirstier</td></tr>
<tr><td>Servicing</td><td>Oil and filter changes</td><td>Simpler engine, but fuel mixing</td></tr>
<tr><td>Availability new</td><td>Wide range from every brand</td><td>Very limited</td></tr>
</tbody>
</table>

<h2>The UK rules</h2>
<p>Recreational craft regulations (RCD II) set exhaust emission limits that conventional carburetted two-stroke engines struggle to meet, which is why they are largely unavailable new for ordinary leisure use. Commercial, rescue and some other uses are treated differently. If you are unsure about a specific use, check the current regulations or ask us. Every petrol outboard we sell is a four-stroke.</p>

<h2>Which is better for you?</h2>
<ul>
<li><strong>Dinghy or tender:</strong> a 2.5HP to 6HP four-stroke is the standard choice. See <a href="/shop/portable/">small outboard motors</a>.</li>
<li><strong>RIB or day boat:</strong> a fuel-injected four-stroke from <a href="/shop/mid-range/">10HP to 40HP</a> or the <a href="/shop/high-horsepower/">high-power range</a> gives easy starting and good economy.</li>
<li><strong>Quiet, low-maintenance running:</strong> consider <a href="/shop/electric/">an electric outboard</a>.</li>
</ul>

<h2>Two-stroke or four-stroke maintenance basics</h2>
<p>A four-stroke needs regular oil and filter changes, a spark plug and impeller service and annual checks: see our <a href="/blog/outboard-motor-maintenance-guide/">maintenance guide</a>. Four-strokes ship without oil, so fill the sump before first use.</p>

<h2>Conclusion</h2>
<p>Choose a four-stroke unless you have a specific reason, such as a very lightweight vintage-style engine. If you are buying new for leisure use in the UK, a four-stroke is also the easiest to buy, insure and service.</p>`,
    faq: [
      { question: 'Can I still buy a new two-stroke outboard in the UK?', answer: 'Conventional carburetted two-strokes are largely unavailable new for ordinary leisure use because of emissions rules. All the petrol outboards we sell are four-strokes.' },
      { question: 'Which is more reliable, 2-stroke or 4-stroke?', answer: 'Modern four-strokes are very reliable and need straightforward oil and filter servicing. Two-strokes are simple but depend on correct fuel mixing.' },
      { question: 'Do four-stroke outboards need oil in the fuel?', answer: 'No. They run on plain unleaded petrol and have a separate oil sump.' }
    ]
  },

  'british-seagull-outboards-legacy': {
    title: 'British Seagull Outboards: A British Icon, and What to Buy Today',
    metaDescription: 'The story of the British Seagull outboard, why spares are scarce today and which modern lightweight four-stroke or electric outboard to buy instead.',
    relatedPostSlugs: ['small-outboard-motor-buying-guide', '2-stroke-vs-4-stroke-outboards', 'best-outboard-for-dinghy-tender-kayak'],
    relatedCategorySlugs: ['portable', 'electric'],
    bodyHtml: `
<p>The British Seagull is one of the best-loved names in small-boat history: a simple, rugged long-shaft two-stroke built in Poole, Dorset for decades and famous for its slogan about being "the best outboard motor in the world". If you own one or are thinking of buying one, here is what to know, and what to buy if you want something modern.</p>

<h2>Why British Seagulls became famous</h2>
<p>The Seagull was a basic, single-cylinder two-stroke outboard that could be repaired with simple tools, which made it a favourite for dinghies, tenders and small cruising boats. Its distinctive look and sound earned it a loyal following and a place in British boating folklore. Production ended in the early 2010s, and the engines you see today are second-hand.</p>

<h2>Owning a Seagull today</h2>
<ul>
<li><strong>Spares are scarce:</strong> new parts are limited, so owners rely on specialist suppliers and used parts.</li>
<li><strong>Fuel mixing:</strong> as a two-stroke, it runs on petrol mixed with oil, with the mixture ratio set by the engine type.</li>
<li><strong>Weight and noise:</strong> they are heavy for their power and noisy compared with modern four-strokes.</li>
<li><strong>Heritage appeal:</strong> many owners keep them for nostalgia on classic dinghies and wooden boats.</li>
</ul>

<h2>What to buy if you want a modern replacement</h2>
<p>If you want the same simple small-boat power with modern reliability, a lightweight four-stroke or an electric outboard is the practical answer:</p>
<ul>
<li><a href="/product/yamaha-f2-5bmhs/">Yamaha F2.5BMHS</a>, <a href="/product/suzuki-df2-5s/">Suzuki DF2.5S</a> and <a href="/product/honda-bf2-3-schu/">Honda BF2.3 SCHU</a>: easy-starting, plain-petrol small engines for dinghies.</li>
<li><a href="/product/tohatsu-mfs3-5c/">Tohatsu MFS3.5C</a>: a slightly stronger option for heavier tenders.</li>
<li><a href="/product/epropulsion-elite-500w/">ePropulsion eLite</a> and <a href="/product/temo-france-temo-450-longtail/">TEMO 450 Longtail</a>: quiet electric choices that need no fuel.</li>
</ul>
<p>Browse the full range of <a href="/shop/portable/">small outboard motors</a> or <a href="/shop/electric/">electric outboards</a>. We only sell new engines and do not supply second-hand or vintage Seagulls or their parts.</p>

<h2>Practical tips for dinghy owners</h2>
<p>Measure your transom before you buy (see our <a href="/blog/small-outboard-motor-buying-guide/">small outboard buying guide</a>), check the boat\'s maximum power and consider the engine weight, because a lighter engine is easier to lift on and off a small dinghy.</p>`,
    faq: [
      { question: 'Are British Seagull outboards still made?', answer: 'No. Production ended in the early 2010s, so any Seagull you buy is second-hand.' },
      { question: 'Can I get new parts for a British Seagull?', answer: 'Parts are limited and mainly come from specialists. We do not supply Seagull parts or second-hand engines.' },
      { question: 'What is a good modern replacement for a Seagull?', answer: 'A 2.5HP to 6HP four-stroke from Yamaha, Suzuki, Honda, Mercury or Tohatsu, or a small electric outboard, depending on your boat.' }
    ]
  },

  'outboard-fuel-tanks-gas-lines': {
    title: 'Outboard Motor Fuel Tanks & Fuel Lines: A Buyer\'s Guide',
    metaDescription: 'Outboard fuel tanks and fuel lines explained: tank size, primer bulb, connectors and fuel use per hour so you carry the right amount. UK buyer\'s guide.',
    relatedPostSlugs: ['outboard-motor-maintenance-guide', 'how-to-start-an-outboard-motor', 'winterize-outboard-motor'],
    relatedCategorySlugs: ['parts', 'portable'],
    bodyHtml: `
<p>An outboard needs a clean, correctly sized fuel supply. If your engine has an integrated tank you may not need anything extra; larger engines use a portable tank and a fuel line with a primer bulb. This guide covers how to choose both.</p>

<h2>Integrated tank or portable tank?</h2>
<p>Many small engines (around 2.5HP to 6HP) have a built-in tank that gives a few hours of running and keeps things simple. Larger engines usually use a separate portable tank connected by a fuel line. A portable tank gives much more range and can be swapped or refilled ashore.</p>

<h2>How big a tank do you need?</h2>
<p>As a very rough guide, an outboard at full throttle uses about 0.3 litres per horsepower per hour, and far less at cruising speed. A 20HP engine at full throttle might use around 6 litres an hour, and at moderate cruising speed roughly half that. Multiply by your expected run time and add a reserve. A 12 litre tank is a common size for small and mid-sized engines.</p>
<p>Our <a href="/product/universal-12-litre-portable-fuel-tank-gauge/">12 Litre Portable Fuel Tank with gauge</a> is an anti-UV polyethylene tank designed to suit common outboards, and the gauge helps you track fuel without opening the cap.</p>

<h2>Fuel lines and the primer bulb</h2>
<p>A fuel line connects the tank to the engine. The primer bulb is a squeezable section that fills the line and carburettor with petrol before starting. Key points:</p>
<ul>
<li><strong>Connectors:</strong> make sure the tank and engine ends match (many engines use a standard quick-connect fitting).</li>
<li><strong>Bulb direction:</strong> the bulb has an arrow showing flow direction; fit it so the arrow points to the engine.</li>
<li><strong>Condition:</strong> perished or cracked lines leak or let air in. Replace them if they are stiff or damaged.</li>
</ul>
<p>We stock a <a href="/product/universal-fuel-line-assembly-with-primer-bulb/">fuel line assembly with primer bulb</a> for typical outboards. Check the connector type against your engine before ordering.</p>

<h2>Keep fuel clean and fresh</h2>
<ul>
<li>Use fresh unleaded petrol and avoid fuel that has sat for months.</li>
<li>Keep tank caps sealed, and vent as the tank requires.</li>
<li>Do not store petrol in a hot, sealed space; use proper containers.</li>
<li>For winter storage, follow our <a href="/blog/winterize-outboard-motor/">winterizing guide</a>.</li>
</ul>

<h2>Safety</h2>
<p>Petrol is flammable. Refuel ashore where possible, switch the engine off, avoid spills into the bilge and never smoke near fuel. Four-strokes run on plain petrol; do not add oil unless your engine is a two-stroke that requires it.</p>
<p>See our full range of <a href="/shop/parts/">outboard spares and accessories</a>, or read our <a href="/blog/outboard-motor-maintenance-guide/">maintenance guide</a>.</p>`,
    faq: [
      { question: 'What size fuel tank do I need for my outboard?', answer: 'Estimate roughly 0.3 litres per horsepower per hour at full throttle, less at cruising speed, then multiply by run time and add a reserve. A 12 litre tank suits many small and mid-size engines.' },
      { question: 'What does the primer bulb do?', answer: 'It lets you pump petrol from the tank to the engine to prime the fuel system before starting.' },
      { question: 'Can I use any fuel line on my outboard?', answer: 'Check the connector type on your engine and the tank. Many outboards use a standard quick-connect fitting but not all do.' }
    ]
  },

  'outboard-motor-security-locks': {
    title: 'Outboard Motor Security: Locks & Anti-Theft Guide',
    metaDescription: 'How to stop outboard motor theft: lock types, chains, security marking, registering your serial number and storing engines securely. A practical UK guide.',
    relatedPostSlugs: ['outboard-motor-stand-guide', 'outboard-motor-covers-guide', 'outboard-serial-number-year-guide'],
    bodyHtml: `
<p>Outboard motors are easy to steal: a few bolts or a clamp is often all that holds one to the transom. The best protection combines a physical lock, security marking and sensible storage. Here is how to reduce the risk.</p>

<h2>Why outboards are targeted</h2>
<p>They are valuable, portable and easy to resell, and many boats are left on trailers, moorings or driveways. A visible, solid deterrent makes thieves move on to an easier target.</p>

<h2>Types of outboard lock</h2>
<ul>
<li><strong>Clamp locks:</strong> a lock that fits over the engine\'s transom clamp screws and stops them being turned, so the engine cannot be removed.</li>
<li><strong>Through-bolt fixing:</strong> replacing the clamp screws with bolts and locking nuts on a suitable transom.</li>
<li><strong>Cable or chain locks:</strong> a hardened chain or cable passing through the engine and a fixed point on the boat or trailer.</li>
<li><strong>Alarms and trackers:</strong> a motion alarm or GPS tracker adds a further layer.</li>
</ul>
<p>Choose a lock designed for your engine\'s clamp type and a chain thick enough to resist cutters. A weak lock on a strong engine is a false economy.</p>

<h2>Mark and register your engine</h2>
<ul>
<li><strong>Record the serial number</strong> and keep a photo of the engine plate (see our <a href="/blog/outboard-serial-number-year-guide/">serial number guide</a> for where to find it).</li>
<li><strong>Register it</strong> on a recognised property register such as Immobilise, and report theft to the police with the serial number.</li>
<li><strong>Security-mark</strong> the cowling and lower unit with a visible etch or UV pen as a deterrent.</li>
</ul>

<h2>Storage habits</h2>
<ul>
<li>Remove small outboards from the boat when unattended and store them in a locked garage or shed, ideally on a <a href="/blog/outboard-motor-stand-guide/">stand</a> or <a href="/blog/outboard-motor-trolleys/">trolley</a>.</li>
<li>Remove or immobilise the fuel tank and keep spare keys away from the boat.</li>
<li>Keep trailers locked and park in a secure or well-lit spot.</li>
<li>Use a <a href="/blog/outboard-motor-covers-guide/">cover</a> that does not advertise the engine\'s size.</li>
</ul>

<h2>Check your insurance</h2>
<p>Many boat insurance policies require a lock or specific security measures for outboards, and may exclude theft if you do not follow them. Read your policy or ask your insurer which lock is acceptable.</p>
<p>We do not currently list outboard locks in our shop, but our <a href="/shop/parts/">parts and accessories</a> range covers service items and fuel equipment, and we are happy to advise on engine details such as clamp type if you contact us.</p>`,
    faq: [
      { question: 'How do I stop my outboard being stolen?', answer: 'Use a purpose-made lock or through-bolt fixing, add a chain to a fixed point, security-mark the engine, record and register its serial number and store it securely when unattended.' },
      { question: 'Where do I find my outboard serial number?', answer: 'It is usually on a plate on the transom bracket or swivel bracket. Photograph it and keep a record.' },
      { question: 'Does insurance cover outboard theft?', answer: 'Often only if specific security measures are used. Check your policy wording or ask your insurer.' }
    ]
  }
};
