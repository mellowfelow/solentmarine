/**
 * Full-length article bodies (posts 1-5). Merged into BLOG_POSTS by slug in posts.ts.
 * Facts are general, checkable marine knowledge or taken from the live catalogue (prices, models).
 */
export interface PostBody {
  title?: string;
  metaDescription?: string;
  bodyHtml: string;
  faq: { question: string; answer: string }[];
  relatedPostSlugs: string[];
  relatedCategorySlugs?: string[];
}

export const POST_BODIES_A: Record<string, PostBody> = {
  'electric-outboard-motors-explained': {
    title: 'Electric Outboard Motors Explained: How They Work & What to Expect',
    metaDescription: 'How electric outboards work, how to work out real range from battery capacity, what the HP-equivalent rating means and when electric beats petrol. UK guide.',
    relatedPostSlugs: ['outboard-horsepower-guide', 'best-outboard-for-dinghy-tender-kayak', '2-stroke-vs-4-stroke-outboards'],
    bodyHtml: `
<p>An electric outboard replaces the engine, fuel tank and exhaust of a petrol outboard with a battery and an electric motor. There is no combustion, no fuel to carry and no oil to change, so it runs almost silently and needs very little maintenance. This guide explains how they work, how to estimate real range and when electric is the right choice.</p>

<h2>How does an electric outboard work?</h2>
<p>A battery pack sends power through a controller to a brushless electric motor in the motor head or in a submerged pod. The motor turns the propeller directly or through a small reduction gear. Because electric motors produce their full torque from standstill, they feel responsive at low speed, which is ideal for manoeuvring a tender or holding station in a tideway.</p>
<p>Most small electric outboards (such as the <a href="/product/epropulsion-spirit-1-0-plus/">ePropulsion Spirit 1.0 Plus</a> or <a href="/product/torqeedo-travel-1103-c/">Torqeedo Travel 1103 C</a>) use an integrated or clip-on lithium battery. Larger pod drives and outboards use separate battery packs wired to the motor, which allows bigger capacity for longer trips.</p>

<h2>What does the HP-equivalent rating mean?</h2>
<p>Electric motors are rated in kilowatts (kW). To help buyers compare, manufacturers also quote a horsepower-equivalent figure: the size of petrol outboard the electric motor is roughly comparable to on a typical boat. One horsepower is about 0.75kW of shaft power, but electric motors give strong thrust at low revs, so a 1kW electric motor is often described as a "3HP equivalent" for a displacement tender.</p>
<p>Treat the equivalent as a guide only. Hull type, weight and the speed you want matter more than the number on the box.</p>

<h2>How to work out real-world range</h2>
<p>Range comes from battery capacity (watt-hours, Wh) divided by the power the motor draws (watts, W). The result is run time in hours; multiply by your speed for distance.</p>
<table>
<thead><tr><th>Battery</th><th>Power draw</th><th>Approximate run time</th></tr></thead>
<tbody>
<tr><td>1,276Wh</td><td>250W (slow cruising)</td><td>About 5 hours</td></tr>
<tr><td>1,276Wh</td><td>500W (brisk displacement speed)</td><td>About 2.5 hours</td></tr>
<tr><td>1,276Wh</td><td>1,000W (full power)</td><td>About 1.2 hours</td></tr>
</tbody>
</table>
<p>These figures ignore losses and cold-weather capacity reduction, so allow a safety margin. The key point is that power draw rises steeply with speed: running at displacement speed gives several times the range of running flat out. Always plan trips with a reserve and carry a paddle or a spare battery for longer outings.</p>

<h2>Electric versus petrol: running costs and convenience</h2>
<ul>
<li><strong>Fuel and servicing:</strong> no petrol, oil, spark plugs or carburettor to maintain. Charge the battery and rinse the motor after use in salt water.</li>
<li><strong>Noise and smell:</strong> near silent, no exhaust, which suits marinas, lakes and nature reserves.</li>
<li><strong>Upfront cost:</strong> electric outboards cost more than a petrol engine of similar equivalent power, once you include the battery.</li>
<li><strong>Range and refuelling:</strong> petrol wins for long distances at speed, because refuelling takes minutes while recharging takes hours.</li>
</ul>

<h2>Who should choose electric?</h2>
<p>Electric is a strong choice for yacht tenders, dinghies, sailing auxiliaries, inland waterways and short coastal trips, and anywhere petrol engines are restricted. For heavier boats or longer runs, pod drives such as the <a href="/product/epropulsion-x12-pod-drive/">ePropulsion X12</a> and <a href="/product/torqeedo-cruise-6-0-r/">Torqeedo Cruise 6.0 R</a> bring electric propulsion to larger RIBs and day boats.</p>
<p>If you only need quiet low-speed power for a kayak or small boat, a trolling motor such as the <a href="/product/haswing-w20-kayak-pro/">Haswing W20 Kayak Pro</a> or <a href="/product/minn-kota-endura-c2-30/">Minn Kota Endura C2 30</a> is the simplest and cheapest route.</p>

<h2>Our electric range</h2>
<p>We stock electric propulsion from ePropulsion, Torqeedo, TEMO, Haswing, Minn Kota and Blade Electric, plus spare batteries, bags and controls. Browse all <a href="/shop/electric/">electric outboard motors for sale</a>, or see the <a href="/shop/epropulsion/">ePropulsion range</a>. If you are unsure which suits your boat, message us with your boat weight and typical trip and we will recommend a motor and battery.</p>`,
    faq: [
      { question: 'How long does an electric outboard battery last per charge?', answer: 'It depends on battery capacity and speed. Divide battery watt-hours by the power the motor draws: a 1,276Wh battery at 500W gives roughly 2.5 hours. Running slowly extends range dramatically; running flat out shortens it.' },
      { question: 'Are electric outboards powerful enough for a RIB?', answer: 'Yes. Pod drives and large outboards up to 20kW are suited to RIBs and day boats, but weight and target speed determine the right size. Ask us with your boat details.' },
      { question: 'Do electric outboards work in salt water?', answer: 'Yes. They are built for marine use. Rinse the motor with fresh water after salt water use and follow the manufacturer\'s storage and battery guidance.' },
      { question: 'Is an electric outboard cheaper to run than petrol?', answer: 'Running costs are lower because there is no fuel, oil or servicing routine. Upfront cost is higher once you include the battery.' }
    ]
  },

  'outboard-horsepower-guide': {
    title: 'How Much Horsepower Do You Need? The UK Outboard Motor Guide',
    metaDescription: 'Choose the right outboard horsepower for your boat: indicative HP by boat type from 2.5HP tenders to 300HP RIBs, how to read the capacity plate, and shaft length.',
    relatedPostSlugs: ['small-outboard-motor-buying-guide', 'electric-outboard-motors-explained', 'how-to-start-an-outboard-motor'],
    bodyHtml: `
<p>Outboard horsepower runs from 2.5HP for tenders to 300HP and beyond for offshore boats. The right figure depends on your boat\'s weight, hull type and how you use it, and it must never exceed the maximum power on the boat\'s capacity plate. This guide shows how to choose.</p>

<h2>Step 1: find the maximum power on the capacity plate</h2>
<p>Boats built for the UK and EU carry a builder\'s plate that states the maximum engine power the hull is designed for. This is your upper limit. It is a safety and insurance matter, so never fit an outboard that exceeds it. If your boat has no plate (older dinghies and some inflatables), ask the manufacturer or a surveyor, or contact us with the make and model and we will help.</p>

<h2>Step 2: match power to boat type</h2>
<p>These are indicative ranges for typical boats; weight and load change the answer.</p>
<table>
<thead><tr><th>Boat type</th><th>Typical outboard</th><th>Browse</th></tr></thead>
<tbody>
<tr><td>Dinghy or yacht tender</td><td>2.5HP to 6HP</td><td><a href="/shop/portable/">Small outboards</a></td></tr>
<tr><td>Larger inflatable, small fishing boat</td><td>8HP to 20HP</td><td><a href="/shop/mid-range/">10HP to 40HP outboards</a></td></tr>
<tr><td>Small RIB or day boat</td><td>20HP to 60HP</td><td><a href="/shop/mid-range/">Mid-range outboards</a></td></tr>
<tr><td>Larger RIB, cabin boat or workboat</td><td>70HP to 150HP</td><td><a href="/shop/high-horsepower/">High-power outboards</a></td></tr>
<tr><td>Big offshore RIB or centre console</td><td>200HP to 400HP, often twin engines</td><td><a href="/shop/high-horsepower/">High-power outboards</a></td></tr>
</tbody>
</table>

<h2>Portable engines: 2.5HP to 6HP</h2>
<p>These suit dinghies, yacht tenders, small inflatables and sailing auxiliaries. A 2.5HP engine such as the <a href="/product/yamaha-f2-5bmhs/">Yamaha F2.5BMHS</a> or <a href="/product/suzuki-df2-5s/">Suzuki DF2.5S</a> moves a light tender at displacement speed, while 5HP and 6HP models such as the <a href="/product/yamaha-f6cmhs/">Yamaha F6CMHS</a> or <a href="/product/tohatsu-mfs6sp/">Tohatsu MFS6SP</a> give a small inflatable enough power to plane with a crew. See also our <a href="/blog/small-outboard-motor-buying-guide/">small outboard buying guide</a>.</p>

<h2>Mid-range engines: 8HP to 40HP</h2>
<p>The workhorse range for inflatables, small RIBs and fishing boats. Engines such as the <a href="/product/suzuki-df20as/">Suzuki DF20AS</a>, <a href="/product/yamaha-f25gets/">Yamaha F25GETS</a> and <a href="/product/mercury-40hp-fourstroke/">Mercury 40HP FourStroke</a> balance performance, weight and economy. At this level, fuel-injected models are common and give easy starting and good economy.</p>

<h2>High-power engines: 50HP and above</h2>
<p>Offshore boats and larger RIBs need engines from 50HP up to 400HP. They are heavy, usually have remote controls and often need a pallet delivery. Examples include the <a href="/product/suzuki-df115bg/">Suzuki DF115BG</a>, <a href="/product/mercury-pro-xs-175/">Mercury Pro XS 175</a> and <a href="/product/yamaha-f300ncb/">Yamaha F300NCB</a>.</p>

<h2>Electric equivalents</h2>
<p>Electric motors are rated in kW with an HP-equivalent figure for comparison. Our range spans small trolling motors to 20kW pod drives. See <a href="/blog/electric-outboard-motors-explained/">electric outboard motors explained</a>.</p>

<h2>Step 3: choose the shaft length</h2>
<p>Horsepower is only half the decision. Shaft length must match your transom height: about 15 inches (38cm) needs a short shaft, 20 inches (51cm) a long shaft and 25 inches (63cm) an extra long shaft. Measure from the top of the transom to the bottom of the hull. A shaft that is too short lets the propeller suck air; one that is too long drags and wastes power.</p>

<h2>Common mistakes to avoid</h2>
<ul>
<li>Choosing by boat length alone. Weight, hull shape and load matter more.</li>
<li>Exceeding the capacity plate to get more speed.</li>
<li>Buying too little power for a loaded boat, which struggles to plane and burns more fuel.</li>
<li>Ignoring engine weight on a light transom or tender.</li>
</ul>
<p>Not sure? Send us your boat make, model, transom height and how you use it, and we will recommend an engine before you buy. You can also browse all <a href="/shop/">outboard engines for sale</a>.</p>`,
    faq: [
      { question: 'What size outboard do I need for a 3 metre dinghy?', answer: 'Most 3 metre dinghies and tenders need 2.5HP to 5HP. Check the boat\'s capacity plate for the maximum power.' },
      { question: 'Can I fit a bigger outboard than the capacity plate allows?', answer: 'No. The plate shows the maximum power the hull is designed for. Exceeding it is unsafe and may invalidate insurance.' },
      { question: 'Does a higher horsepower outboard use more fuel?', answer: 'Not necessarily. Fuel use depends on how hard the engine works. A well-matched larger engine may run at lower load, but a bigger engine at full throttle uses more.' },
      { question: 'How do I measure shaft length?', answer: 'Measure from the top of the transom to the bottom of the hull: about 15 inches needs a short shaft, 20 inches a long shaft, 25 inches an extra long shaft.' }
    ]
  },

  'best-outboard-for-dinghy-tender-kayak': {
    title: 'Best Outboard Motor for Your Tender, Kayak or Inflatable Boat',
    metaDescription: 'Choose a motor for a tender, inflatable dinghy or kayak: petrol versus electric, weight limits, transom strength, run time and our UK picks from £107.',
    relatedPostSlugs: ['small-outboard-motor-buying-guide', 'electric-outboard-motors-explained', 'outboard-horsepower-guide'],
    bodyHtml: `
<p>The best motor for a tender, inflatable or kayak is the lightest one that gives enough power for the boat and your trip. That usually means a 2.5HP to 6HP four-stroke petrol outboard, a compact electric outboard, or an electric trolling motor for the smallest craft. This guide helps you choose.</p>

<h2>Petrol or electric for a small boat?</h2>
<p><strong>Petrol four-stroke</strong> engines give long range and quick refuelling, which suits tenders that run between a mooring and a harbour. <strong>Electric</strong> motors are quiet, clean and need almost no maintenance, which suits short trips, kayaks and anywhere noise matters. Compare them on weight, range and how often you use the boat.</p>
<table>
<thead><tr><th></th><th>Petrol 2.5HP to 6HP</th><th>Electric outboard</th><th>Trolling motor</th></tr></thead>
<tbody>
<tr><td>Best for</td><td>Tenders, inflatables, longer runs</td><td>Tenders, dinghies, quiet cruising</td><td>Kayaks, canoes, small boats</td></tr>
<tr><td>Range</td><td>Long, refuel in minutes</td><td>Hours, depends on battery</td><td>Hours at slow speed</td></tr>
<tr><td>Upkeep</td><td>Annual service</td><td>Minimal</td><td>Minimal</td></tr>
<tr><td>Typical price here</td><td>From £711</td><td>From about £995</td><td>From £107</td></tr>
</tbody>
</table>

<h2>Petrol picks for tenders and inflatables</h2>
<ul>
<li><a href="/product/yamaha-f2-5bmhs/">Yamaha F2.5BMHS</a> and <a href="/product/suzuki-df2-5s/">Suzuki DF2.5S</a>: the classic 2.5HP choice for dinghies and light tenders.</li>
<li><a href="/product/honda-bf2-3-schu/">Honda BF2.3 SCHU</a>: a small, light engine for the smallest transoms.</li>
<li><a href="/product/tohatsu-mfs3-5c/">Tohatsu MFS3.5C</a> and <a href="/product/mercury-3-5hp-fourstroke/">Mercury 3.5HP FourStroke</a>: a step up in power for heavier tenders.</li>
<li><a href="/product/yamaha-f6cmhs/">Yamaha F6CMHS</a>, <a href="/product/suzuki-df6a/">Suzuki DF6A</a> and <a href="/product/tohatsu-mfs6sp/">Tohatsu MFS6SP</a>: the 6HP class for inflatables that need to plane.</li>
</ul>

<h2>Electric picks for tenders and dinghies</h2>
<p>The <a href="/product/epropulsion-spirit-1-0-plus/">ePropulsion Spirit 1.0 Plus</a>, <a href="/product/torqeedo-travel-903/">Torqeedo Travel 903</a>, <a href="/product/temo-france-temo-450-longtail/">TEMO 450 Longtail</a> and <a href="/product/epropulsion-elite-500w/">ePropulsion eLite</a> are compact electric outboards with integrated batteries or simple battery connections, ideal for yacht tenders. Browse the whole <a href="/shop/electric/">electric outboard range</a>.</p>

<h2>Motors for kayaks and canoes</h2>
<p>Kayaks and canoes need very light, low-power motors. The <a href="/product/haswing-w20-kayak-pro/">Haswing W20 Kayak Pro</a> and <a href="/product/haswing-osapian-30lbs/">Haswing Osapian 30lbs</a> are budget-friendly electric options, and the <a href="/product/minn-kota-endura-c2-30/">Minn Kota Endura C2 30</a> is a well-known transom-mount trolling motor. You will need a suitable 12V deep-cycle battery and a secure mount; the <a href="/product/haswing-quick-release-kayakboat-bracket/">Haswing quick-release bracket</a> is one example.</p>

<h2>What to check before you buy</h2>
<ul>
<li><strong>Capacity plate:</strong> the maximum power for the boat. Never exceed it.</li>
<li><strong>Transom strength and height:</strong> inflatables and lightweight dinghies may have limits. Shaft length must match (15in short, 20in long).</li>
<li><strong>Weight:</strong> you will lift the engine on and off the boat, so check the data sheet for current weight.</li>
<li><strong>Run time:</strong> for electric, work out battery watt-hours divided by power draw (see <a href="/blog/electric-outboard-motors-explained/">how electric outboards work</a>).</li>
</ul>
<p>Browse all <a href="/shop/portable/">small outboard motors for sale</a>, or ask us for a recommendation with your boat details.</p>`,
    faq: [
      { question: 'What size motor do I need for an inflatable dinghy?', answer: 'Most inflatable dinghies need 2.5HP to 6HP. Check the maximum power stamped on the boat or in its manual.' },
      { question: 'Can I put an outboard on a kayak?', answer: 'Yes, but most kayaks suit a lightweight electric trolling motor or a very small electric outboard with a proper mount. Check the kayak manufacturer\'s guidance.' },
      { question: 'Is electric or petrol better for a tender?', answer: 'Electric is quieter and simpler for short runs; petrol gives longer range. Choose by how far and how often you go.' },
      { question: 'Do I need a battery for an electric trolling motor?', answer: 'Yes. Most need a 12V (or 24V) deep-cycle battery sized for your run time.' }
    ]
  },

  'small-outboard-motor-buying-guide': {
    title: 'How to Choose a Small Outboard Motor: Buying Guide for Dinghies',
    metaDescription: 'How to choose a small outboard motor for a dinghy or small boat: power, weight, shaft length, controls and costs, with a checklist and real UK prices.',
    relatedPostSlugs: ['best-outboard-for-dinghy-tender-kayak', 'outboard-horsepower-guide', 'how-to-start-an-outboard-motor'],
    bodyHtml: `
<p>Choosing a small outboard motor comes down to five checks: the boat\'s power limit, shaft length, weight, how you will control it and what it will cost to own. Work through this checklist and you will avoid the usual mistakes.</p>

<h2>1. Power: stay within the boat\'s limit</h2>
<p>Look for the maximum power on the capacity plate or in the manual. Within that, 2.5HP is enough for a small light dinghy at displacement speed, 3.5HP to 5HP gives more flexibility for two people and a little gear, and 6HP can get a light inflatable planing. Our <a href="/blog/outboard-horsepower-guide/">horsepower guide</a> shows typical choices by boat type.</p>

<h2>2. Shaft length</h2>
<p>Measure the transom from the top edge to the bottom of the hull. Around 15 inches (38cm) is a short shaft; around 20 inches (51cm) is a long shaft. A mismatch causes cavitation or drag. Most small engines come in short and long versions.</p>

<h2>3. Weight and portability</h2>
<p>You will lift a small outboard on and off the transom, so weight matters. Smaller engines are easiest to carry; check the manufacturer data sheet for the current weight of the model you choose and consider how you will store and transport it.</p>

<h2>4. Controls, starting and fuel</h2>
<p>Small outboards are tiller steered with manual pull-start, and many have an integrated fuel tank that makes them neat to carry. Four-strokes run on plain unleaded petrol with no oil mixed in; they ship without oil, so fill the crankcase before first use. Our guide to <a href="/blog/how-to-start-an-outboard-motor/">starting an outboard</a> covers a first start.</p>

<h2>5. Cost of ownership</h2>
<p>Besides the purchase price, allow for oil, a service kit and a fuel tank if the engine does not have its own. Entry-level examples in stock include:</p>
<ul>
<li><a href="/product/yamaha-f2-5bmhs/">Yamaha F2.5BMHS</a> at £711.00</li>
<li><a href="/product/honda-bf2-3-schu/">Honda BF2.3 SCHU</a> at £720.00</li>
<li><a href="/product/suzuki-df2-5s/">Suzuki DF2.5S</a> at £755.00</li>
<li><a href="/product/tohatsu-mfs3-5c/">Tohatsu MFS3.5C</a> at £840.00</li>
</ul>
<p>Look at the <a href="/shop/portable/">full range of small outboard motors for sale</a>. For maintenance basics, see our <a href="/blog/outboard-motor-maintenance-guide/">maintenance guide</a>.</p>

<h2>Petrol, electric or trolling motor?</h2>
<p>If you want silent, simple running for short trips, consider an electric outboard. Our <a href="/blog/best-outboard-for-dinghy-tender-kayak/">tender, kayak and inflatable guide</a> compares the options.</p>`,
    faq: [
      { question: 'What is the best small outboard for a dinghy?', answer: 'A 2.5HP to 5HP four-stroke is typical. Choose by boat weight, the capacity plate and the weight you are happy to lift.' },
      { question: 'Do small outboards need mixing oil in the petrol?', answer: 'Not four-strokes. They run on plain unleaded and have a separate oil sump that you fill before first use.' },
      { question: 'How often should I service a small outboard?', answer: 'Annually or every 100 hours, whichever comes first, as most manufacturers recommend.' }
    ]
  },

  'outboard-motor-stand-guide': {
    title: 'Do You Need an Outboard Motor Stand? A Buyer\'s Guide',
    metaDescription: 'Outboard motor stands explained: why you need one for storage, servicing and transport, the types available and how to match the stand to engine weight.',
    relatedPostSlugs: ['outboard-motor-trolleys', 'winterize-outboard-motor', 'outboard-motor-covers-guide'],
    bodyHtml: `
<p>An outboard motor stand holds the engine upright off the ground so you can store it, service it or run it in a test tank without laying it down. If you take your outboard off the boat, a stand is one of the most useful and cheapest accessories you can own.</p>

<h2>Why use an outboard stand?</h2>
<ul>
<li><strong>Protects the engine:</strong> keeps the lower unit and propeller off the floor and avoids knocks.</li>
<li><strong>Keeps it upright:</strong> storing and transporting most outboards upright (or as the manual says) helps avoid oil and fuel reaching places they should not.</li>
<li><strong>Makes servicing easier:</strong> oil changes, spark plug changes and impeller checks are simpler at a comfortable height.</li>
<li><strong>Safer to handle:</strong> a stable stand stops a heavy engine tipping over.</li>
</ul>

<h2>Types of outboard stand</h2>
<ul>
<li><strong>Folding or portable stands:</strong> light frames for small engines, easy to take to a boat or workshop.</li>
<li><strong>Heavy-duty workshop stands:</strong> a wide, stable base for larger engines.</li>
<li><strong>Combined stand and trolley:</strong> a stand with wheels so you can move the engine as well as store it (see our <a href="/blog/outboard-motor-trolleys/">trolley guide</a>).</li>
<li><strong>Wall brackets and racks:</strong> hold the engine securely in a garage or boathouse.</li>
</ul>

<h2>How to choose the right stand</h2>
<ol>
<li><strong>Engine weight:</strong> check the weight on the data sheet and choose a stand rated comfortably above it.</li>
<li><strong>Mounting width:</strong> the clamp or cradle must fit the engine\'s mounting bracket or lower unit.</li>
<li><strong>Stability:</strong> a wide base and non-slip feet matter more than a lightweight frame.</li>
<li><strong>Where you will use it:</strong> a folding stand suits a small boat locker; a heavy-duty stand suits a garage.</li>
</ol>

<h2>Looking after your engine in storage</h2>
<p>A stand pairs naturally with a good cover and a winter routine. Read our guides to <a href="/blog/winterize-outboard-motor/">winterizing an outboard</a> and <a href="/blog/outboard-motor-covers-guide/">outboard covers</a>. We do not currently list outboard stands in our shop, but our <a href="/shop/parts/">parts and accessories</a> range has oils, service kits and fuel equipment, and we are happy to advise if you tell us your engine.</p>`,
    faq: [
      { question: 'Can I store an outboard motor lying down?', answer: 'It depends on the engine. Many manufacturers recommend storing upright or specify a particular position; check your owner\'s manual before laying it down.' },
      { question: 'What size stand do I need?', answer: 'Choose a stand rated above your engine\'s weight and with a cradle that fits its mounting bracket. Check the data sheet for current weight.' },
      { question: 'Do I need a stand for a small outboard?', answer: 'It is still helpful. Even a light engine should be kept upright and off the floor to protect the lower unit and propeller.' }
    ]
  }
};
