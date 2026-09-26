/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Phone, MapPin, HelpCircle, Truck, Ship, Fuel, CheckCircle } from 'lucide-react';

import { CONTACT } from '../../config/site';

interface NavProp {
  onNavigate?: (view: string, params?: Record<string, string>) => void;
}

// =============== FAQ VIEW ===============
export function FAQView({ onNavigate }: NavProp) {
  const faqs = [
    {
      q: 'Which shaft length do I need for my boat?',
      a: 'The shaft length is determined by measuring your boat’s transom height (from the top of the transom to the bottom of the hull keel). Commonly, Short Shaft (15"/38cm) is for inflatables and small tenders. Long Shaft (20"/51cm) is for speedboats, RIBs, and sailing aux. Extra Long Shaft (25"/63cm) is for high-freeboard seaworthy ships or twin-engine installs.'
    },
    {
      q: 'Can under-18s operate outboard motors in the UK?',
      a: 'In the UK, there is no formal statutory licensing for operating small leisure vessels of low horsepower, but safety frameworks strongly recommend teenager adult supervision. For engines exceeding 10hp, yacht clubs and maritime organizations recommend completing the RYA Powerboat Level 1 or 2 qualification.'
    },
    {
      q: 'Are 2-stroke outboards illegal to purchase or use in the UK?',
      a: 'Under RCD II (Recreational Craft Directive) emissions guidelines implemented in the UK, carburetted 2-stroke outboards can no longer be sold for brand-new "recreational" use. However, they remain legal to use if owned prior, and new direct-injection/commercial 2-strokes can be purchased for commercial registrations (such as fishing, fleet patrol, or registered racing setups).'
    },
    {
      q: 'What is PDI (Pre-Delivery Inspection)?',
      a: 'PDI is a mandatory mechanical safety procedure. Our engineering team unboxes your engine, mounts it, fills it with oil, runs the block, tests cooling impeller water flow (piddle-stream), sets timing, and inspects gear shifting. We then drain the sump (to meet UK dangerous cargo carriage rules) and crate it. PDI ensures your motor is ready without dead-on-arrival issues.'
    },
    {
      q: 'How does marine financing operate on Solent Marine?',
      a: 'We work with FCA regulated asset lenders to offer Hire Purchase (HP) options at a 9.9% representative APR. You can select terms from 12 to 60 months with a minimum 10% cash deposit. Approval decisions are generally returned in 2 to 4 hours.'
    },
    {
      q: 'How do electric outboard runtimes compare to petrol?',
      a: 'Electric motors (like Torqeedo or ePropulsion Spirit) offer immediate digital torque. Run-time is dictated by battery size: a standard 1276Wh float battery on a 3hp equivalent engine delivers up to 5-6 hours of tooling at half-throttle (4 knots), or 75 minutes at wide-open full throttle.'
    }
  ];

  return (
    <div id="faq-page" className="max-w-4xl mx-auto py-10 px-4 sm:px-6">
      <div className="text-center space-y-3 mb-12">
        <HelpCircle className="w-12 h-12 text-sky-800 mx-auto" />
        <h1 className="font-sans font-extrabold text-slate-900 text-3xl sm:text-4xl tracking-tight">Technical Outboards FAQ</h1>
        <p className="text-base text-slate-500 max-w-xl mx-auto">
          Need assistance mapping out the correct engine dimensions or financing packages? Browse our comprehensive marine directory answers below.
        </p>
      </div>

      <div className="space-y-6">
        {faqs.map((f, i) => (
          <div key={i} className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-2 hover:border-slate-300 transition">
            <h3 className="font-sans font-bold text-slate-900 text-base flex gap-2.5 items-start">
              <span className="text-sky-800 font-mono text-xs mt-1">Q{i+1}.</span>
              <span>{f.q}</span>
            </h3>
            <p className="text-sm leading-relaxed text-slate-600 pl-7">{f.a}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 p-6 bg-slate-50 border border-slate-200 rounded-2xl text-center space-y-3">
        <h3 className="font-bold text-slate-900 text-base">Have a specific vessel inquiry?</h3>
        <p className="text-xs text-slate-600 max-w-md mx-auto">
          Our team in Cowes can provide tailored shaft matching, propeller pitch guidance, and rigging specs.
        </p>
        <button
          type="button"
          onClick={() => onNavigate && onNavigate('contact')}
          className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition cursor-pointer"
        >
          Contact Rigging Engineers &rarr;
        </button>
      </div>
    </div>
  );
}

// =============== CONTACT VIEW ===============
export function ContactView({ onNavigate }: NavProp) {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div id="contact-page" className="max-w-5xl mx-auto py-10 px-4 sm:px-6">
      <div className="text-center space-y-3 mb-12">
        <Mail className="w-12 h-12 text-sky-800 mx-auto" />
        <h1 className="font-sans font-extrabold text-slate-900 text-3xl sm:text-4xl tracking-tight">Connect with Boating Experts</h1>
        <p className="text-base text-slate-500 max-w-lg mx-auto">
          Planning a boat upgrade, auxiliary sizing, or bulk fleet procurement? Our Cowes head office is ready to field your call.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Info Card */}
        <div className="bg-slate-900 text-white rounded-2xl p-6 space-y-6 shadow-xl lg:col-span-1">
          <div className="space-y-2">
            <h3 className="text-lg font-bold">Cowes Head Office</h3>
            <p className="text-xs text-slate-400">Located at the world-famous yachting focal point on the Medina River.</p>
          </div>

          <div className="space-y-4 text-sm font-sans">
            <div className="flex gap-3.5 items-start">
              <MapPin className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-200">Solent Marine Outboards</p>
                <p className="text-xs text-slate-400">Unit 12, Shepard's Wharf Marina</p>
                <p className="text-xs text-slate-400">Medina Road, Cowes</p>
                <p className="text-xs text-slate-400">Isle of Wight, PO31 7DL</p>
              </div>
            </div>

            <div className="flex gap-3.5 items-center">
              <Phone className="w-5 h-5 text-sky-400 shrink-0" />
              <div>
                <p className="font-semibold text-slate-200">{CONTACT.phone}</p>
                <p className="text-[10px] text-slate-400">Mon - Fri: 08:30 - 17:30</p>
              </div>
            </div>

            <div className="flex gap-3.5 items-center">
              <Mail className="w-5 h-5 text-sky-400 shrink-0" />
              <div>
                <p className="font-semibold text-slate-200">{CONTACT.email}</p>
                <p className="text-[10px] text-slate-400">24 Hour response timeframe</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-1 text-xs">
            <p className="font-bold text-sky-400 uppercase tracking-widest text-[9px]">PDI Workshop Sump Fill Notice</p>
            <p className="text-slate-400 leading-snug">
              Engines purchased online can also be set up and collected hot in-person at our Cowes marina workshop with sump filling fully ready.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm lg:col-span-2">
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center py-10 space-y-4 text-center">
              <CheckCircle className="w-16 h-16 text-emerald-500" />
              <div className="space-y-1">
                <h3 className="font-sans font-bold text-slate-900 text-xl">Rigging Request Dispatched</h3>
                <p className="text-sm text-slate-500">Thank you for your enquiry. A factory-certified advisor will contact you by telephone or email within 2-4 working hours.</p>
              </div>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition cursor-pointer"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="font-sans font-bold text-slate-900 text-lg mb-1">Send a Message / Inquire</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Your Full Name</label>
                  <input
                    type="text"
                    id="contact-name"
                    required
                    className="block w-full border border-slate-300 rounded-md p-2 text-sm bg-white text-slate-900 focus:ring-sky-500"
                    placeholder="e.g. Admiral John Smith"
                  />
                </div>
                <div>
                  <label htmlFor="contact-phone" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">UK Contact Telephone</label>
                  <input
                    type="tel"
                    id="contact-phone"
                    required
                    className="block w-full border border-slate-300 rounded-md p-2 text-sm bg-white text-slate-900 focus:ring-sky-500"
                    placeholder="e.g. +44 7123 456789"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Email Address</label>
                <input
                  type="email"
                  id="contact-email"
                  required
                  className="block w-full border border-slate-300 rounded-md p-2 text-sm bg-white text-slate-900 focus:ring-sky-500"
                  placeholder="e.g. john.smith@boatmail.co.uk"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-hull" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Vessel / Hull specification</label>
                  <input
                    type="text"
                    id="contact-hull"
                    className="block w-full border border-slate-300 rounded-md p-2 text-sm bg-white text-slate-900 focus:ring-sky-500"
                    placeholder="e.g. Brig Falcon RIB / Yacht Aux"
                  />
                </div>
                <div>
                  <label htmlFor="contact-shaft" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Interested Shaft</label>
                  <select
                    id="contact-shaft"
                    className="block w-full border border-slate-300 rounded-md p-2 text-sm bg-white text-slate-900 focus:ring-sky-500"
                  >
                    <option>Short Shaft (S) - 15"</option>
                    <option>Long Shaft (L) - 20"</option>
                    <option>Extra Long (XL) - 25"</option>
                    <option>Not sure - please advise</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="contact-msg" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Details of inquiry / Rigging requirements</label>
                <textarea
                  id="contact-msg"
                  rows={4}
                  required
                  className="block w-full border border-slate-300 rounded-md p-2 text-sm bg-white text-slate-900 focus:ring-sky-500"
                  placeholder="Describe your vessel, safety requirements, budget, or model requests..."
                ></textarea>
              </div>

              <button
                type="submit"
                id="contact-submit-btn"
                className="w-full bg-slate-900 text-white rounded-lg py-2.5 text-sm font-semibold hover:bg-slate-800 transition shadow-sm cursor-pointer"
              >
                Dispatch Commission Request
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

// =============== ABOUT VIEW ===============
export function AboutView({ onNavigate }: NavProp) {
  return (
    <div id="about-page" className="max-w-4xl mx-auto py-10 px-4 sm:px-6 space-y-12">
      {/* Hero */}
      <div className="text-center space-y-4">
        <Ship className="w-12 h-12 text-sky-800 mx-auto" />
        <h1 className="font-sans font-extrabold text-slate-900 text-3xl sm:text-4xl tracking-tight">Our Marine Heritage & Roots</h1>
        <p className="text-base text-slate-500 max-w-xl mx-auto">
          Founded in the epicentre of British yacht racing and boat building on the Solent estuary.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <h2 className="font-sans font-bold text-slate-900 text-xl">The Cowes Marine Standard</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            At Solent Marine UK, we believe an outboard engine is not merely a piece of metal—it is the life safety line of your vessel. Whether battling severe channels in a search-and-rescue RIB, trolling shallow riverbeds, or enjoying silent cruising in electric launches, reliable power is absolute.
          </p>
          <p className="text-slate-600 text-sm leading-relaxed">
            Based at Shepard's Wharf Marina in Cowes, Isle of Wight, our facility incorporates clean workshops, diagnostic bays, and a full team of factory-trained maritime engineers specializing in petrol fuel injections and high-density marine lithium grids.
          </p>
          {onNavigate && (
            <button
              type="button"
              onClick={() => onNavigate('shop')}
              className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition cursor-pointer"
            >
              Browse 2026 Engine Catalog &rarr;
            </button>
          )}
        </div>
        <div>
          <img
            src="https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?auto=format&fit=crop&q=80&w=800"
            alt="Cowes Marina engineering"
            className="rounded-xl border border-slate-200 shadow-md object-cover h-64 w-full"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* PDI Pipeline */}
      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
        <h3 className="font-sans font-bold text-slate-900 text-lg mb-4 text-center">Every Outboard Passes Through Our 4-Stage UK PDI</h3>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
          <div className="p-3 space-y-1">
            <span className="text-lg font-extrabold text-sky-800 font-mono">01.</span>
            <p className="font-semibold text-slate-900 text-sm">Unboxing & Inspection</p>
            <p className="text-xs text-slate-500 leading-snug">Visual verification of paint, brackets, tiller arms, and cylinder plugs.</p>
          </div>
          <div className="p-3 space-y-1">
            <span className="text-lg font-extrabold text-sky-800 font-mono">02.</span>
            <p className="font-semibold text-slate-900 text-sm">Wet Running & Tuning</p>
            <p className="text-xs text-slate-500 leading-snug">Tanked running at variable RPMs to align timing and cooling tell-tale stream.</p>
          </div>
          <div className="p-3 space-y-1">
            <span className="text-lg font-extrabold text-sky-800 font-mono">03.</span>
            <p className="font-semibold text-slate-900 text-sm">Safe Sump Draining</p>
            <p className="text-xs text-slate-500 leading-snug">Ensuring clean extraction of all internal liquids to comply with dry courier shipping regulations.</p>
          </div>
          <div className="p-3 space-y-1">
            <span className="text-lg font-extrabold text-sky-800 font-mono">04.</span>
            <p className="font-semibold text-slate-900 text-sm">Heavy Duty Crating</p>
            <p className="text-xs text-slate-500 leading-snug">Secured in custom vertical frameworks to limit vibration during pallet hauling.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// =============== SHIPPING VIEW ===============
export function ShippingView({ onNavigate }: NavProp) {
  return (
    <div id="shipping-page" className="max-w-4xl mx-auto py-10 px-4 sm:px-6 space-y-8">
      <div className="text-center space-y-3 mb-8">
        <Truck className="w-12 h-12 text-sky-800 mx-auto" />
        <h1 className="font-sans font-extrabold text-slate-900 text-3xl sm:text-4xl tracking-tight">Delivery Infrastructure & Returns</h1>
        <p className="text-base text-slate-500 max-w-xl mx-auto">
          Outboards represent heavy, high-value mechanical precision. We take shipping seriously.
        </p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-sm text-amber-900 flex items-start gap-3.5 leading-relaxed shadow-sm">
        <Fuel className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="font-bold uppercase tracking-wider text-xs">CRITICAL COURIER SUMP SAFETY ADVISORY</p>
          <p className="text-amber-800 text-xs">
            Due to strict UK Carriage of Dangerous Goods regulations, all petrol outboard motors are fully drained of oil during our PDI rigging process prior to shipping. <strong>Do NOT fire or pull-crank the starter cord before filling the crankcase sump oil!</strong> Doing so will seize the cylinders instantly. Use official Yamlube FC-W 4M oil included in our shipping packs.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 text-sm font-sans leading-relaxed">
        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-3">
          <h3 className="font-bold text-slate-900 text-base">Ground Freight Coverage</h3>
          <p className="text-slate-600">We offer three primary UK transport schemes:</p>
          <ul className="space-y-1.5 text-xs text-slate-500 font-mono">
            <li>• UK Mainland Standard (Orders &gt; £1500) - FREE</li>
            <li>• UK Mainland Standard (Orders &lt; £1500) - £45.00</li>
            <li>• Scottish Highlands & Islands Courier Surcharge - £125.00</li>
            <li>• Isle of Wight Local Collection (hot testing) - FREE</li>
          </ul>
          <p className="text-slate-600">All shipments are tracked and dispatched via specialized pallet carriers.</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-3">
          <h3 className="font-bold text-slate-900 text-base">Consumer distance selling & returns</h3>
          <p className="text-slate-600">
            Under the UK Consumer Contracts Regulations (Distance Selling), you hold an absolute 14-day cooling-off right for engines purchased online.
          </p>
          <p className="text-slate-600">
            Returned engines must remain in an un-run, dry state (unfilled engine oil, unfused fuel lines) inside original packaging. The buyer carries return shipping liability unless an engine suffers a pre-certified manufacturer defect.
          </p>
        </div>
      </div>
    </div>
  );
}

// =============== PRIVACY POLICY ===============
export function PrivacyView() {
  return (
    <div id="privacy-page" className="max-w-3xl mx-auto py-10 px-4 sm:px-6 prose prose-slate">
      <h1 className="font-sans font-extrabold text-slate-900 text-3xl mb-4">Privacy Framework & GDPR Compliance</h1>
      <p className="text-xs text-slate-400 font-mono mb-6">Last Revised: 2026-09-22 • ICO Registered Operator</p>
      
      <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
        <p>
          At Solent Marine Outboards, we take data custody with absolute seriousness under UK GDPR, the Data Protection Act 2018, and ICO frameworks.
        </p>

        <h3 className="font-bold text-slate-900 text-md mt-6">1. Information Collection</h3>
        <p>
          We capture only necessary, relevant credentials on our portals: name, billing/shipping address coordinates, contact telephone indicators (to communicate dry pallet delivery schedules), and boating parameters. We do not gather or store any underlying bank details on our servers.
        </p>

        <h3 className="font-bold text-slate-900 text-md mt-6">2. Cookies Framework</h3>
        <p>
          We employ cookies exclusively to keep track of engine shopping basket quantities, comparison tray selections, and analytical metrics to optimize our mobile design ratios across Google and Bing index engines.
        </p>

        <h3 className="font-bold text-slate-900 text-md mt-6">3. Outboard Finance Parameters</h3>
        <p>
          When deploying our in-app interactive finance calculator, any inputs are evaluated serverless-ly on active React state and are never transferred to external marketers.
        </p>
      </div>
    </div>
  );
}

// =============== TERMS & CONDITIONS ===============
export function TermsView() {
  return (
    <div id="terms-page" className="max-w-3xl mx-auto py-10 px-4 sm:px-6 prose prose-slate">
      <h1 className="font-sans font-extrabold text-slate-900 text-3xl mb-4">Terms and Conditions of Supply</h1>
      <p className="text-xs text-slate-400 font-mono mb-6">Current active draft: Official Code Version PO31-7DL</p>

      <div className="space-y-4 text-slate-600 text-sm leading-relaxed">
        <p>
          These binding commercial terms apply to any purchase of outboard engines or marine parts supplied by Solent Marine Outboards.
        </p>

        <h4 className="font-bold text-slate-900 text-sm mt-6">1. Purchasing Limitations & 2-Stroke Guidelines</h4>
        <p>
          Under UK marine legislation, carburetted 2-stroke engines are strictly limited to commercial businesses, rescue fleets, clubs, and regulated racing organizations. Placing an order online for a 2-stroke model constitutes commercial warranty declaration; buyers must verify commercial hull registration in writing.
        </p>

        <h4 className="font-bold text-slate-900 text-sm mt-6">2. Warranty Frameworks</h4>
        <p>
          All petrol outboards are accompanied by their official manufacturer warranties (e.g. Suzuki 6-Years, Yamaha 5-Years, Honda 6-Years), which are strictly valid only under authorized dealer Pre-Delivery Inspections (PDI) and annual servicing schedules at registered boatyards.
        </p>

        <h4 className="font-bold text-slate-900 text-sm mt-6">3. Installation Safety Duty of Care</h4>
        <p>
          Rigging outboards to vessels must comply with maximum transom rating guidelines (found on the hull builder plate). Overpowering a stern transom violates UK CE boating guidelines and invalidates yacht insurances.
        </p>
      </div>
    </div>
  );
}
