/**
 * Product copy generator. Produces unique, factual on-page copy, meta text and FAQs for every
 * product from the structured catalogue fields that are reliable (name, brand, HP / kW, price,
 * applications, features, shaft options, warranty). It deliberately does NOT assert weight,
 * fuel-system, starter or cylinder details, because those catalogue fields are category-typical
 * placeholders rather than manufacturer data.
 */
import type { Product } from '../types';
import { SHOP, CONTACT, SITE } from '../config/site';
import { fitDesc, fitTitle, nameWithBrand } from './seo';
import { OUTBOARD_PRODUCTS } from '../data/products';

export type ProductKind = 'petrol' | 'electric' | 'trolling' | 'part';

export interface ProductCopy {
  kind: ProductKind;
  h1: string;
  title: string;
  metaDescription: string;
  summary: string; // one-paragraph plain-text summary (also used in Product schema)
  paragraphs: string[];
  chooseHeading: string;
  chooseBullets: string[];
  included: string[];
  faqs: { q: string; a: string }[];
  guideSlug: string;
  guideLabel: string;
}

const an = (n: number | string) => (/^(8|11|18|[aeiou])/i.test(String(n)) ? 'an' : 'a');

export const gbp = (n: number) =>
  `£${n.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}
const pick = <T,>(arr: T[], seed: number, salt = 0): T => arr[(seed + salt * 7) % arr.length];

export function kindOf(p: Product): ProductKind {
  if (p.category.includes('parts')) return 'part';
  if (p.category.includes('trolling')) return 'trolling';
  if (p.engineType === 'Electric') return 'electric';
  return 'petrol';
}

function hpClass(hp: number): { label: string; boats: string; band: string } {
  if (hp <= 3) return { label: 'ultra-portable', boats: 'dinghies, yacht tenders and small inflatables', band: '2.5HP–6HP portable' };
  if (hp <= 6) return { label: 'portable', boats: 'tenders, small inflatables, dinghies and as auxiliary power on a sailing yacht', band: '2.5HP–6HP portable' };
  if (hp <= 20) return { label: 'compact mid-range', boats: 'larger inflatables, small RIBs, fishing boats and small day boats', band: '8HP–40HP mid-range' };
  if (hp <= 60) return { label: 'mid-range', boats: 'RIBs, day boats, small cabin boats and fishing boats', band: '8HP–40HP mid-range' };
  if (hp <= 150) return { label: 'high-power', boats: 'larger RIBs, offshore day boats, cabin cruisers and workboats', band: '50HP+ high-power' };
  return { label: 'flagship high-power', boats: 'large offshore RIBs, centre consoles, cruisers and twin or triple-engine installations', band: '50HP+ high-power' };
}

const brandLine: Record<string, string> = {
  Yamaha: 'Yamaha Marine outboards are a common sight on UK slipways, from dinghy tenders to commercial workboats.',
  Suzuki: 'Suzuki Marine builds a wide four-stroke range that covers everything from tender engines to large offshore power.',
  Honda: 'Honda Marine four-strokes are popular for their smooth running and straightforward day-to-day ownership.',
  Mercury: 'Mercury Marine supplies engines for the full range of UK boating, from portable FourStroke units to Verado flagships.',
  Tohatsu: 'Tohatsu is a long-established outboard manufacturer with a strong reputation for lightweight, practical engines.',
  Torqeedo: 'Torqeedo is a specialist in electric boat propulsion, known for integrated battery systems and app-connected range data.',
  ePropulsion: 'ePropulsion focuses entirely on electric propulsion, with integrated battery outboards and pod drives.',
  'Minn Kota': 'Minn Kota is a well-known name in electric trolling motors for fishing and small-boat propulsion.',
  'TEMO France': 'TEMO France makes compact electric outboards aimed at tenders, dinghies and inland waterways.',
  Haswing: 'Haswing makes affordable electric outboards and trolling motors for kayaks, dinghies and small boats.',
  'Blade Electric': 'Blade Electric supplies electric outboards for tenders, small cruisers and day boats.',
  Solas: 'Solas is a long-standing marine propeller manufacturer.',
  Universal: 'This is a general-purpose marine accessory that fits a wide range of outboards.'
};

const shaftText = (p: Product) => {
  const s = p.shaftLengths.filter((x) => !/fixed|universal/i.test(x));
  if (s.length === 0) return '';
  return s.map((x) => x.replace(/\s*-\s*/, ' ')).join(' or ');
};

const deliveryLine = `Orders over £${SHOP.freeShippingThreshold} ship free to the UK mainland; below that a flat £${SHOP.shippingFee} delivery charge applies. Minimum order is £${SHOP.minOrder}.`;

function appLine(p: Product): string {
  const apps = Array.from(new Set(p.applications.filter(Boolean)));
  if (apps.length === 0) return '';
  return apps.length === 1 ? apps[0].toLowerCase() : apps.slice(0, -1).map((a) => a.toLowerCase()).join(', ') + ' and ' + apps[apps.length - 1].toLowerCase();
}

function featList(p: Product): string {
  const f = p.features.filter(Boolean);
  if (f.length === 0) return '';
  return f.length === 1 ? f[0] : f.slice(0, -1).join(', ') + ' and ' + f[f.length - 1];
}


/** Model-specific comparison paragraph built from real catalogue data (price, power, neighbours). */
function contextParagraph(p: Product, kind: ProductKind): string {
  const band = (['portable', 'mid-range', 'high-horsepower'] as const).find((c) => p.category.includes(c));
  const peers = OUTBOARD_PRODUCTS.filter((x) => {
    if (kindOf(x) !== kind) return false;
    if (kind === 'part') return x.brand === p.brand;
    if (kind === 'petrol') return band ? x.category.includes(band) : true;
    return true;
  });
  const sorted = [...peers].sort((a, b) => (kind === 'part' ? a.priceGbp - b.priceGbp : a.powerHp - b.powerHp || a.priceGbp - b.priceGbp));
  const i = sorted.findIndex((x) => x.slug === p.slug);
  const lower = i > 0 ? sorted[i - 1] : null;
  const higher = i >= 0 && i < sorted.length - 1 ? sorted[i + 1] : null;
  const prices = sorted.map((x) => x.priceGbp);
  const cheapest = sorted.reduce((m, x) => (x.priceGbp < m.priceGbp ? x : m), sorted[0] || p);
  const dearest = sorted.reduce((m, x) => (x.priceGbp > m.priceGbp ? x : m), sorted[0] || p);
  const rank = [...prices].sort((a, b) => a - b).indexOf(p.priceGbp) + 1;
  const bits: string[] = [];
  bits.push(`At ${gbp(p.priceGbp)} the ${p.name} is number ${rank} of ${sorted.length} by price in this part of our range, which runs from ${gbp(cheapest.priceGbp)} (${cheapest.name}) up to ${gbp(dearest.priceGbp)} (${dearest.name}).`);
  if (kind !== 'part' && p.powerHp > 0) bits.push(`That works out at roughly ${gbp(p.priceGbp / p.powerHp)} per horsepower${kind === 'electric' || kind === 'trolling' ? ' equivalent' : ''}.`);
  const steps: string[] = [];
  if (lower) steps.push(`a step down is the ${lower.name} (${kind === 'part' ? gbp(lower.priceGbp) : `${lower.powerHp}HP, ${gbp(lower.priceGbp)}`})`);
  if (higher) steps.push(`a step up is the ${higher.name} (${kind === 'part' ? gbp(higher.priceGbp) : `${higher.powerHp}HP, ${gbp(higher.priceGbp)}`})`);
  if (steps.length) bits.push(`If it is not quite right, ${steps.join(' and ')}.`);
  return bits.join(' ');
}

export function getProductCopy(p: Product): ProductCopy {
  const _ctx = contextParagraph(p, kindOf(p));
  const kind = kindOf(p);
  const seed = hash(p.slug);
  const full = nameWithBrand(p.name, p.brand);
  const price = gbp(p.priceGbp);
  const warranty = p.specs.warrantyYears;
  const shafts = shaftText(p);
  const apps = appLine(p);
  const feats = featList(p);
  const brandSentence = brandLine[p.brand] || '';

  // ---------------------------------------------------------------- petrol outboards
  if (kind === 'petrol') {
    const c = hpClass(p.powerHp);
    const subAmp = (apps ? `Recommended use: ${apps}. ` : '');
    const intro = pick(
      [
        `The ${full} is ${an(p.powerHp)} ${p.powerHp}HP four-stroke petrol outboard in the ${c.band} class, a good match for ${c.boats}. ${brandSentence}`,
        `Looking for a ${p.powerHp}HP outboard from ${p.brand}? The ${full} is ${an(c.label)} ${c.label} four-stroke engine sized for ${c.boats}. ${brandSentence}`,
        `${full}: ${an(p.powerHp)} ${p.powerHp}HP ${p.brand} four-stroke outboard, listed at ${price} including VAT. It sits in our ${c.band} range, aimed at ${c.boats}.`
      ],
      seed
    );
    const spec = feats ? `Headline specification: ${feats}. ${subAmp}` : subAmp;
    const shaftSentence = shafts
      ? `It is available in ${shafts} shaft length${shafts.includes(' or ') ? 's' : ''}; choose by measuring your transom, because the wrong shaft causes cavitation or a drowned exhaust.`
      : 'Confirm the shaft length against your transom height before ordering.';
    const prep = pick(
      [
        `Every engine is unboxed, inspected and test-run in a tank before dispatch (our Pre-Delivery Inspection), and it comes with the UK manufacturer warranty of ${warranty} years. ${deliveryLine}`,
        `We carry out a Pre-Delivery Inspection on every outboard, including a tank test run, before it leaves Cowes. The engine is covered by a ${warranty}-year UK manufacturer warranty. ${deliveryLine}`,
        `Before dispatch the ${p.name} goes through our PDI: inspection, a wet test run and secure crating. ${warranty}-year UK manufacturer warranty applies. ${deliveryLine}`
      ],
      seed,
      1
    );
    const paragraphs = [intro, `${spec}${shaftSentence}`.trim(), _ctx, prep];
    const guideSlug = p.powerHp <= 6 ? 'small-outboard-motor-buying-guide' : 'outboard-horsepower-guide';
    const guideLabel = p.powerHp <= 6 ? 'Small outboard buying guide' : 'Outboard horsepower sizing guide';
    return {
      kind,
      h1: p.name.toLowerCase().startsWith(p.brand.toLowerCase()) ? p.name : `${p.brand} ${p.name}`,
      title: fitTitle(`${full} ${p.powerHp}HP Outboard for Sale UK | Solent Marine UK`),
      metaDescription: fitDesc(`${full} ${p.powerHp}HP outboard motor for sale: ${price} inc. VAT${apps ? `, ideal for ${apps}` : ''}. PDI checked, ${warranty}-year UK warranty, delivery from Cowes.`),
      summary: `${full} ${p.powerHp}HP four-stroke petrol outboard motor. ${feats ? feats + '. ' : ''}${apps ? `Suited to ${apps}. ` : ''}Supplied new with a Pre-Delivery Inspection and ${warranty}-year UK manufacturer warranty.`,
      paragraphs,
      chooseHeading: `Is the ${p.name} right for your boat?`,
      chooseBullets: [
        `Power: ${p.powerHp}HP suits ${c.boats}. Check your boat's maximum rated power on its capacity plate and never exceed it.`,
        shafts ? `Shaft: ${shafts}. Measure transom height from the top of the transom to the bottom of the hull.` : 'Shaft: confirm transom height before ordering.',
        pick([`Fuel and oil: this is a four-stroke engine, so it runs on unleaded petrol with no pre-mixing. It ships without engine oil and must be filled before first use.`, `Running it: unleaded petrol only, no oil mixed into the fuel, and the crankcase must be filled with the correct four-stroke oil before the first start.`, `Petrol and oil: fill the crankcase before first use (the engine is despatched dry) and run it on ordinary unleaded, with no pre-mix.`], seed, 3),
        pick([`Weight and fitting: check the manufacturer data sheet for the current dry weight and mounting details if you are fitting to a lightweight tender or a bracket.`, `Before you buy: confirm the engine weight against your transom or bracket rating using the manufacturer data sheet.`, `Fitting: make sure the transom, bracket and control layout suit this engine; the data sheet lists the exact dimensions.`], seed, 4)
      ],
      included: [
        pick(['Pre-Delivery Inspection with tank test run', 'Unboxed, inspected and wet-tested before dispatch', 'Full PDI including a tank test run'], seed, 8),
        `${warranty}-year UK manufacturer warranty`,
        'Secure crating for courier or pallet delivery',
        'Technical shaft-length and rigging advice before you buy'
      ],
      faqs: [
        { q: `What shaft length does the ${p.name} come in?`, a: shafts ? `We list the ${p.name} in ${shafts}. If you are unsure which suits your boat, measure your transom height or send us the boat make and model and we will confirm before you order.` : `Shaft options for the ${p.name} are confirmed at order. Send us your transom height and we will advise.` },
        { q: `Does the ${p.name} come with engine oil?`, a: pick(['No. For safe delivery it ships without engine oil, so you must fill the crankcase with the correct manufacturer-approved four-stroke oil before starting it for the first time. Never run the engine dry.', `The ${p.name} is despatched without oil. Add the manufacturer-approved four-stroke oil to the correct level (see the owner's manual) before the first start, and never run it dry.`, `Not in the crankcase. For safe carriage the engine travels dry, so fill it with the right four-stroke oil before first use. Our genuine oils are in the Parts category.`], seed, 5) },
        { q: `How much is delivery for the ${p.name}?`, a: `${deliveryLine} Larger engines travel on a pallet with tail-lift delivery on a booked slot.` },
        { q: `Is the ${p.name} covered by a manufacturer warranty?`, a: pick([`Yes. It is a new engine supplied with a ${warranty}-year UK manufacturer warranty, and we complete a Pre-Delivery Inspection before dispatch.`, `It is sold new, with ${warranty} years of UK manufacturer warranty cover, and each engine is checked and test-run before it leaves us.`], seed, 6) }
      ],
      guideSlug,
      guideLabel
    };
  }

  // ---------------------------------------------------------------- electric outboards
  if (kind === 'electric') {
    const kw = p.powerKw ? `${p.powerKw}kW` : '';
    const eq = p.powerHp ? `${p.powerHp}HP-equivalent` : '';
    const intro = pick(
      [
        `The ${full} is a zero-emission electric outboard${kw ? ` rated at ${kw}` : ''}${eq ? ` (${eq})` : ''}. ${brandSentence}`,
        `Electric power without fuel: the ${full}${kw ? ` delivers ${kw}` : ''}${eq ? `, comparable to a ${p.powerHp}HP petrol outboard` : ''}. ${brandSentence}`,
        `${full} is an electric outboard${eq ? ` in the ${p.powerHp}HP-equivalent class` : ''}, listed at ${price} including VAT. ${brandSentence}`
      ],
      seed
    );
    const spec = (feats ? `Key features: ${feats}. ` : '') + (apps ? `Recommended use: ${apps}. ` : '');
    const body = pick(
      [
        'There is no fuel, no oil and no spark plugs to look after, and the motor runs quietly with instant torque, which suits marinas, lakes and rivers where petrol engines are restricted.',
        'With no combustion, there is no exhaust smell, no carburettor and no routine engine servicing, so ownership is simpler than a petrol outboard and quieter on the water.',
        'Electric propulsion removes the petrol tank and the oil changes. Throttle response is immediate and the motor is far quieter than a petrol engine at tickover.'
      ],
      seed,
      2
    );
    const paragraphs = [intro, `${spec}${body}`.trim(), _ctx, `Supplied new with ${warranty}-year warranty cover and a pre-dispatch check. ${deliveryLine}`];
    return {
      kind,
      h1: full,
      title: fitTitle(`${full} Electric Outboard for Sale UK | Solent Marine UK`),
      metaDescription: fitDesc(`${full} electric outboard motor${kw ? `, ${kw}` : ''}${eq ? ` (${eq})` : ''}: ${price} inc. VAT. Zero emissions, UK delivery from Cowes. Buy online.`),
      summary: `${full} electric outboard motor${kw ? `, ${kw}` : ''}${eq ? ` (${eq})` : ''}. ${feats ? feats + '. ' : ''}${apps ? `Suited to ${apps}. ` : ''}Supplied new with ${warranty}-year warranty.`,
      paragraphs,
      chooseHeading: `Is the ${p.name} right for your boat?`,
      chooseBullets: [
        `Power: ${kw ? kw + ' ' : ''}${eq ? `(${eq}) ` : ''}is comparable to a petrol outboard of that rating, but electric motors deliver full torque from standstill, so hull weight and speed target matter more than the number alone.`,
        'Range: depends on battery capacity, throttle setting, boat weight and conditions. Plan for the speed you will actually cruise at, not top speed.',
        'Charging: check the battery capacity and charging time for this model on the manufacturer data sheet, and allow for a spare battery if you cruise all day.',
        'Mounting: electric outboards are fitted like petrol ones, but confirm your transom height and boat capacity plate before ordering.'
      ],
      included: [`${warranty}-year warranty`, 'Pre-dispatch check', 'Secure packing for courier delivery', 'UK-based technical advice before you buy'],
      faqs: [
        { q: `How far will the ${p.name} go on a charge?`, a: 'Range depends on battery capacity, boat weight, throttle setting and conditions, so there is no single fixed figure. As a guide, running at displacement speed gives several times the range of running flat out. Contact us with your boat details and we will give an honest estimate.' },
        { q: `Is the ${p.name} equivalent to a petrol outboard?`, a: eq ? `It is rated ${eq}, which is a comparison to a petrol engine of that power. Electric motors produce strong torque at low speed, so they often feel more capable than the figure suggests on displacement hulls.` : 'It is an electric outboard, so power is quoted in kW rather than horsepower. As a rule of thumb 0.75kW is about 1HP at the propeller shaft.' },
        { q: `How much is delivery for the ${p.name}?`, a: deliveryLine },
        { q: 'Does an electric outboard need servicing?', a: 'Servicing is far simpler than a petrol engine: there is no fuel system, oil or spark plugs. Keep the battery charged and stored as the manufacturer advises, and rinse the unit after use in salt water.' }
      ],
      guideSlug: 'electric-outboard-motors-explained',
      guideLabel: 'How electric outboards work'
    };
  }

  // ---------------------------------------------------------------- trolling motors
  if (kind === 'trolling') {
    const intro = pick(
      [
        `The ${full} is an electric ${p.category.includes('electric') ? 'transom-mount ' : ''}trolling motor for kayaks, dinghies and small boats. ${brandSentence}`,
        `${full} gives quiet, fuel-free propulsion for small craft, listed at ${price} including VAT. ${brandSentence}`
      ],
      seed
    );
    const paragraphs = [
      intro,
      `${feats ? `Key features: ${feats}. ` : ''}${apps ? `Recommended use: ${apps}. ` : ''}A trolling motor is the simplest way to add quiet low-speed power: it runs from a 12V or 24V leisure battery (check this model's voltage), and there is no fuel, oil or servicing.`.trim(),
      _ctx,
      `${deliveryLine}`
    ];
    return {
      kind,
      h1: full,
      title: fitTitle(`${full} Electric Trolling Motor UK | Solent Marine UK`),
      metaDescription: fitDesc(`${full} electric trolling motor: ${price} inc. VAT. Quiet, fuel-free power for kayaks, dinghies and small boats. UK delivery from Cowes.`),
      summary: `${full} electric trolling motor. ${feats ? feats + '. ' : ''}${apps ? `Suited to ${apps}. ` : ''}`.trim(),
      paragraphs,
      chooseHeading: `Is the ${p.name} right for your boat?`,
      chooseBullets: [
        'Thrust: match the thrust rating to boat weight. A heavier boat or one used in current needs more thrust.',
        'Battery: you will need a suitable 12V or 24V deep-cycle battery; check the model voltage and allow for your intended run time.',
        'Mounting: confirm the shaft length against your transom or bow mount before ordering.'
      ],
      included: [`${warranty}-year warranty`, 'Secure packing for courier delivery', 'UK-based technical advice'],
      faqs: [
        { q: `What battery does the ${p.name} need?`, a: 'Trolling motors run from a deep-cycle 12V or 24V marine or leisure battery, depending on the model. Check the model voltage and size the battery for the run time you want.' },
        { q: 'Can I use a trolling motor as my main engine?', a: 'On kayaks, canoes, small dinghies and lightweight fishing boats, yes. For heavier boats or tidal water consider a larger electric outboard.' },
        { q: `How much is delivery for the ${p.name}?`, a: deliveryLine }
      ],
      guideSlug: 'best-outboard-for-dinghy-tender-kayak',
      guideLabel: 'Choosing a motor for a tender or kayak'
    };
  }

  // ---------------------------------------------------------------- parts & accessories
  const isOil = /oil|lube|ecstar|quicksilver/i.test(p.name);
  const isBattery = /battery/i.test(p.name);
  const isProp = /propeller/i.test(p.name);
  const useLine = isOil
    ? 'Always use the oil grade your engine manufacturer specifies, and change it at the intervals in your owner’s manual. Using approved oil helps keep your warranty intact.'
    : isBattery
    ? 'Check the voltage and connector type against your motor before ordering, and store lithium batteries partly charged if you will not use them for weeks.'
    : isProp
    ? 'Propeller choice depends on engine, boat and load, so confirm pitch and diameter against your engine manual before ordering.'
    : 'Check compatibility with your engine model before ordering. If you are not sure, message us with your engine make and model.';
  const intro = pick(
    [
      `${full} for outboard owners: ${feats || p.description.replace(/^.*?—\s*/, '')}.`,
      `Order the ${full} online from Solent Marine UK. ${feats ? feats + '.' : ''}`
    ],
    seed
  );
  return {
    kind,
    h1: full,
    title: fitTitle(`${full} | Buy Online UK | Solent Marine UK`),
    metaDescription: fitDesc(`Buy ${full} online: ${price} inc. VAT. ${feats ? feats + '. ' : ''}Genuine marine spares and accessories, UK delivery from Cowes.`),
    summary: `${full}. ${feats ? feats + '. ' : ''}${useLine}`,
    paragraphs: [intro, useLine, _ctx, deliveryLine],
    chooseHeading: 'Fitting and compatibility',
    chooseBullets: [
      feats ? `Fit: ${feats}.` : 'Check compatibility against your engine model before ordering.',
      'Not sure it fits? Send us your engine make, model and serial number and we will confirm.',
      'Genuine and manufacturer-approved consumables help protect your engine warranty.'
    ],
    included: ['Genuine marine spares and accessories', 'UK delivery from Cowes', 'Compatibility advice before you order'],
    faqs: [
      { q: `Will the ${p.name} fit my engine?`, a: `${feats ? feats + '. ' : ''}If you are unsure, email ${CONTACT.email} or message us on WhatsApp with your engine make, model and serial number and we will confirm fit before you order.` },
      { q: `How much is delivery for the ${p.name}?`, a: deliveryLine }
    ],
    guideSlug: 'outboard-motor-maintenance-guide',
    guideLabel: 'Outboard maintenance guide'
  };
}

export const PRODUCT_SITE = SITE.domain;
