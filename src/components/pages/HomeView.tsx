/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Ship, ArrowRight, Compass } from 'lucide-react';
import { Product } from '../../types';
import { BRANDS } from '../../config/site';
import { ReviewsShowcase } from '../ReviewsShowcase';
import HeroSlider, { HeroSlide } from '../HeroSlider';

interface HomeViewProps {
  products: Product[];
  onNavigate: (view: string, params?: Record<string, string>) => void;
  onAddToCompare: (product: Product) => void;
  compareList: Product[];
}

export default function HomeView({
  products,
  onNavigate,
  onAddToCompare,
  compareList
}: HomeViewProps) {
  // Sizing assistant state
  const [boatType, setBoatType] = useState<string>('');
  const [boatUsage, setBoatUsage] = useState<string>('');
  const [recommendations, setRecommendations] = useState<{
    hpClass: string;
    shaft: string;
    engines: Product[];
    advice: string;
  } | null>(null);

  const featuredProducts = products.filter(p => p.isFeatured).slice(0, 8);

  const heroSlides: HeroSlide[] = [
    {
      webp: '/images/hero/hero-yamaha-dry-dock.webp',
      jpg: '/images/hero/hero-yamaha-dry-dock.jpg',
      alt: 'Yamaha outboard motor mounted on a boat in dry dock at sunset',
      caption: 'Yamaha 4-stroke, dry-dock ready'
    },
    {
      webp: '/images/hero/hero-yamaha-f15-transom.webp',
      jpg: '/images/hero/hero-yamaha-f15-transom.jpg',
      alt: 'Yamaha F15 outboard motor mounted on a small tender transom',
      caption: 'Yamaha F15 on a Solent tender'
    },
    {
      webp: '/images/hero/hero-mercury-7-5-vintage.webp',
      jpg: '/images/hero/hero-mercury-7-5-vintage.jpg',
      alt: 'Classic Mercury 7.5hp outboard motor cowling and shaft',
      caption: 'Decades of outboard expertise',
      focalPoint: 'center bottom'
    },
    {
      webp: '/images/hero/hero-yamaha-200-rib.webp',
      jpg: '/images/hero/hero-yamaha-200-rib.jpg',
      alt: 'Yamaha 200hp outboard motor on a RIB moored at the coast',
      caption: 'Yamaha 200hp, offshore-ready'
    },
    {
      webp: '/images/hero/hero-tohatsu-beach-launch.webp',
      jpg: '/images/hero/hero-tohatsu-beach-launch.jpg',
      alt: 'Tohatsu outboard motor on a fishing boat launching from the beach',
      caption: 'Tohatsu, beach-launch ready'
    }
  ];

  const handleSizingRecommendation = (type: string, usage: string) => {
    let hpClass = '';
    let shaft = '';
    let advice = '';
    let engineFilters: Product[] = [];

    if (type === 'dinghy') {
      hpClass = '2.5 HP - 6 HP';
      shaft = 'Short Shaft (S)';
      advice = 'Ideal for lightweight yacht tenders or small inflatables. Look for engines with integrated fuel tanks and 360° steering to minimize structural weight on the transom plate.';
      engineFilters = products.filter(p => p.powerHp >= 2 && p.powerHp <= 6 && p.engineType !== '2-Stroke');
    } else if (type === 'rib') {
      hpClass = '15 HP - 100 HP+';
      shaft = 'Long Shaft (L) or Extra Long (X)';
      advice = 'Rigid Inflatable Boats require rapid planing torque. Look for Electronic Fuel Injection (EFI) on mid-size engines, or multi-valve high-hp blocks with deep gear ratios.';
      engineFilters = products.filter(p => p.powerHp >= 15);
    } else if (type === 'fishing') {
      hpClass = '5 HP - 30 HP';
      shaft = 'Short (S) or Long Shaft (L)';
      advice = 'Ideal for angling in coastal estuaries, inland lochs, or rivers. We highly recommend Suzuki or Tohatsu battery-less EFI models for reliable remote operation.';
      engineFilters = products.filter(p => p.powerHp >= 5 && p.powerHp <= 30);
    } else {
      hpClass = '3 HP equivalent (Electric) or 2.5 - 6 HP Aux';
      shaft = 'Long Shaft (L) or Extra Long (X)';
      advice = 'Auxiliary power for sailing crafts up to 2 tons. Consider Torqeedo Travel or ePropulsion Spirit electric drives for silent maneuverability in currents and maintenance-free storage.';
      engineFilters = products.filter(p => p.category.includes('electric') || (p.powerHp <= 6 && p.engineType === '4-Stroke'));
    }

    setRecommendations({
      hpClass,
      shaft,
      advice,
      engines: engineFilters.slice(0, 2)
    });
  };

  return (
    <div id="home-view-container" className="space-y-16 pb-16 font-sans">
      {/* Hero Banner Section — auto-rotating slider revolution of real customer/product photography */}
      <section className="relative bg-slate-950 text-white overflow-hidden min-h-[60vh] sm:min-h-[70vh] flex items-center px-4 sm:px-6 lg:px-8 py-16">
        <HeroSlider slides={heroSlides} />

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-1.5 bg-sky-900/50 border border-sky-500/30 px-3 py-1 rounded-full text-xs font-semibold text-sky-305">
              <Compass className="w-3.5 h-3.5 animate-spin-slow text-sky-400" />
              <span>Based in Cowes, Isle of Wight • Rated by Our Customers</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              UK’s Premier <br />
              <span className="text-sky-400">Outboard Engine</span> Specialists
            </h1>
            <p className="text-base sm:text-lg text-slate-200 max-w-xl leading-relaxed">
              Every engine is checked and tested in our Isle of Wight workshop before it's carefully packed and delivered to you. Backed by an official dealer warranty.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                id="hero-shop-btn"
                onClick={() => onNavigate('shop')}
                className="px-6 py-3.5 bg-sky-600 hover:bg-sky-500 rounded-xl text-sm font-bold text-white transition shadow-lg flex items-center gap-2 group cursor-pointer"
              >
                <span>Browse Outboard Inventory</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                type="button"
                id="hero-sizing-btn"
                onClick={() => {
                  const el = document.getElementById('sizing-assistant-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 hover:border-slate-500 border border-slate-700 text-slate-100 rounded-xl text-sm font-bold transition cursor-pointer"
              >
                Launch Engine Sizer Tool
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div id="brands-section-header" className="text-center space-y-1.5">
          <p className="text-xs font-bold text-sky-800 uppercase tracking-widest font-mono">Authorized UK Dealer</p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">Brands We Sell</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {BRANDS.map((brand) => (
            <button
              key={brand.slug}
              onClick={() => onNavigate('shop-category', { slug: brand.slug })}
              type="button"
              className="bg-slate-50 hover:bg-sky-50 border border-slate-205 rounded-xl p-5 text-center flex flex-col items-center justify-center transition hover:border-sky-300 group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-slate-800 font-bold text-base group-hover:bg-sky-900 group-hover:text-white transition">
                {brand.name[0]}
              </div>
              <span className="font-semibold text-slate-900 text-sm mt-2">{brand.name}</span>
              <span className="text-[10px] text-slate-400 font-mono mt-0.5">Approved Seller</span>
            </button>
          ))}
        </div>
      </section>

      {/* Boating Sizing Assistant Tool Section */}
      <section id="sizing-assistant-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 lg:grid lg:grid-cols-12 gap-8 items-center shadow-xl border border-slate-800">
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-sky-950 text-sky-400 border border-sky-900 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider max-w-max flex items-center gap-1">
              <Ship className="w-3.5 h-3.5 shrink-0" />
              <span>Engine Size Finder</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Not Sure Which Engine You Need?</h2>
            <p className="text-slate-350 text-sm leading-relaxed">
              Tell us what type of boat you have and we'll recommend the right horsepower and shaft length for you.
            </p>
          </div>

          <div className="lg:col-span-7 mt-8 lg:mt-0 bg-slate-950 border border-slate-850 rounded-2xl p-6 space-y-6">
            <h3 className="font-sans font-bold text-white text-base">Choose Your Boat Type</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { name: 'Dinghy / Tender', id: 'dinghy' },
                { name: 'RIB / Sport Boat', id: 'rib' },
                { name: 'Fishing Boat', id: 'fishing' },
                { name: 'Sailing Boat', id: 'sail' }
              ].map((boat) => (
                <button
                  key={boat.id}
                  type="button"
                  id={`sizer-boat-${boat.id}`}
                  onClick={() => {
                    setBoatType(boat.id);
                    handleSizingRecommendation(boat.id, boatUsage);
                  }}
                  className={`p-3 text-xs font-semibold rounded-xl border text-center transition ${
                    boatType === boat.id
                      ? 'bg-sky-600 text-white border-sky-600 shadow'
                      : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-850'
                  }`}
                >
                  {boat.name}
                </button>
              ))}
            </div>

            {/* Sizing Recommendations Display */}
            {recommendations && (
              <div id="sizer-recommendations-box" className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-4 animate-fade-in text-xs sm:text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="text-slate-450 text-[10px] uppercase font-bold tracking-wider">Recommended Horsepower:</span>
                    <p className="text-semibold text-amber-400 font-sans text-base sm:text-lg">{recommendations.hpClass}</p>
                  </div>
                  <div>
                    <span className="text-slate-450 text-[10px] uppercase font-bold tracking-wider">Required Shaft Depth:</span>
                    <p className="text-semibold text-sky-400 font-sans text-base sm:text-lg">{recommendations.shaft}</p>
                  </div>
                </div>
                <p className="text-slate-300 leading-normal text-xs">{recommendations.advice}</p>

                {/* Sized Engines Items */}
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <span className="text-slate-450 text-[10px] uppercase font-bold tracking-widest">Matches In Our Catalog:</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {recommendations.engines.map((eng) => (
                      <button
                        key={eng.id}
                        type="button"
                        id={`sizer-nav-to-${eng.id}`}
                        onClick={() => onNavigate('product-details', { slug: eng.slug })}
                        className="bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-left flex items-center justify-between hover:border-slate-600 transition"
                      >
                        <div className="flex items-center gap-2">
                          <img
                            src={eng.imageUrl}
                            alt={eng.name}
                            className="w-10 h-10 object-cover rounded border border-slate-850"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <p className="font-semibold text-white truncate max-w-[120px] text-xs leading-none">{eng.name}</p>
                            <span className="text-[10px] font-mono text-slate-400">£{eng.priceGbp.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-sky-450 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Featured Outboard Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 border-b border-slate-100 pb-4">
          <div>
            <p className="text-xs font-bold text-sky-800 uppercase tracking-widest font-mono">UK's Top Selling Outboards</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">Best Sellers</h2>
          </div>
          <button
            type="button"
            id="see-all-mid-btn"
            onClick={() => onNavigate('shop')}
            className="text-sm font-semibold text-sky-700 hover:text-sky-900 flex items-center gap-1 transition"
          >
            <span>See entire stock list</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((prod) => (
            <div
              key={prod.id}
              className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col justify-between hover:shadow-md transition"
            >
              <div>
                <div className="relative">
                  <img
                    src={prod.imageUrl}
                    alt={prod.imageUrl.includes('/placeholders/') ? `Placeholder image — ${prod.name} — real product photo coming soon` : prod.name}
                    className="w-full h-44 object-contain bg-slate-50 rounded-xl border border-slate-100 mb-3"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  {prod.badge && (
                    <span className="absolute top-2 left-2 bg-amber-400 text-slate-900 text-[10px] font-extrabold uppercase tracking-wider px-2 py-1 rounded-md shadow">
                      {prod.badge}
                    </span>
                  )}
                </div>
                <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 tracking-wider uppercase mb-1">
                  <span>{prod.brand}</span>
                  <span className="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded">
                    {prod.stockStatus}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-sm leading-snug line-clamp-2 min-h-10 hover:text-sky-800 cursor-pointer" onClick={() => onNavigate('product-details', { slug: prod.slug })}>
                  {prod.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2 mb-3">{prod.description}</p>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <div className="flex justify-between items-baseline mb-2">
                  <span className="text-xs text-slate-400">Retail Price</span>
                  <div className="text-right">
                    <span className="text-base font-extrabold text-slate-905 text-slate-900">£{prod.priceGbp.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    <p className="text-[9px] text-slate-400 leading-none">inc. 20% UK VAT</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => onNavigate('product-details', { slug: prod.slug })}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-lg py-2 text-xs font-semibold transition text-center"
                  >
                    View Specs
                  </button>
                  <button
                    type="button"
                    onClick={() => onAddToCompare(prod)}
                    disabled={compareList.some(c => c.id === prod.id)}
                    className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg py-2 text-xs font-semibold transition border border-slate-200"
                  >
                    {compareList.some(c => c.id === prod.id) ? 'Selected' : 'Compare'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trustpilot-Style 3,600+ Reviews Slider Revolution & Customer Feedback Grid */}
      <ReviewsShowcase
        onNavigate={(view, data) => onNavigate(view, data)}
        onNavigateProduct={(slug) => onNavigate('product-details', { slug })}
      />

      {/* Outboards for every boat + safe delivery */}
      <section className="bg-slate-50 border-y border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-700">
              <Ship className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Outboards for Every Boat</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Whether you need a small engine for a dinghy, a powerful engine for a RIB, or a quiet electric motor for a lake or river boat, we stock trusted brands like Yamaha, Suzuki, Tohatsu and Honda — all approved for UK waters.
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 text-base">Safe UK-Wide Delivery</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              We build a custom wooden crate around every engine before it ships, including to the Scottish Highlands, the Solent and Belfast. Engine oil is drained before shipping, as required by delivery rules —{' '}
              <button type="button" onClick={() => onNavigate('shipping')} className="text-sky-700 underline font-semibold">
                see our delivery guide
              </button>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
