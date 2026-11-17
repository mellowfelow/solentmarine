/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChevronRight, ShieldCheck } from 'lucide-react';
import NavLink from '../NavLink';
import { CATEGORIES } from '../../config/site';

export interface BrandCardData {
  slug: string;
  name: string;
  description: string;
  productCount: number;
  minPrice: number;
}

interface BrandsViewProps {
  brands: BrandCardData[];
  onNavigate: (view: string, params?: Record<string, string>) => void;
}

export default function BrandsView({ brands, onNavigate }: BrandsViewProps) {
  return (
    <div id="brands-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500 mb-6">
        <NavLink view="home" className="hover:text-sky-700 cursor-pointer">Home</NavLink>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-800 font-semibold">Brands</span>
      </nav>

      {/* Hero */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-10 mb-10 border border-slate-800 shadow-xl">
        <div className="max-w-2xl space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-none">
            Outboard Motor Brands UK
          </h1>
          <p className="text-slate-350 text-sm">
            Browse new outboards from Yamaha, Mercury, Honda, Suzuki, Tohatsu and ePropulsion. Every engine is PDI checked and supplied with the UK manufacturer warranty.
          </p>
        </div>
      </div>

      {/* Brand Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {brands.map((brand) => (
          <NavLink
            key={brand.slug}
            view="shop-category"
            params={{ slug: brand.slug }}
            className="group text-left bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-sky-300 transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <h2 className="font-sans font-extrabold text-slate-900 text-xl tracking-tight group-hover:text-sky-700 transition">
                  {brand.name}
                </h2>
                <span className="bg-sky-50 text-sky-700 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border border-sky-100">
                  {brand.productCount} models
                </span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed line-clamp-4">{brand.description}</p>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest">From</span>
                <span className="text-lg font-extrabold text-slate-900">
                  £{brand.minPrice.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <span className="inline-flex items-center gap-1 text-sky-700 font-semibold text-sm group-hover:gap-2 transition-all">
                Shop {brand.name}
                <ChevronRight className="w-4 h-4" />
              </span>
            </div>
          </NavLink>
        ))}
      </div>


      <section aria-labelledby="choose-brand-heading" className="mt-12 max-w-4xl space-y-4">
        <h2 id="choose-brand-heading" className="font-sans font-extrabold text-slate-900 text-2xl">Which outboard brand should you choose?</h2>
        <p className="text-slate-700 leading-relaxed">
          Every brand we stock sells reliable four-stroke outboards, so the right choice usually comes down to power, shaft length, local servicing and price rather than the badge. Yamaha, Suzuki, Honda, Mercury and Tohatsu all cover the popular 2.5HP to 40HP range, while Yamaha, Suzuki and Mercury also offer high-power engines up to 300HP and above. For zero-emission propulsion, ePropulsion and other electric brands such as Torqeedo, TEMO, Haswing, Minn Kota and Blade Electric are listed in our <NavLink view="shop-category" params={{ slug: 'electric' }} className="text-sky-700 font-semibold underline">electric outboard range</NavLink>.
        </p>
        <p className="text-slate-700 leading-relaxed">
          If you already own an engine and want to stay with the same brand, check our parts range for matching oils and service kits. If you are choosing by size first, start with the category that matches your boat:
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
          {CATEGORIES.map((c) => (
            <li key={c.slug}><NavLink view="shop-category" params={{ slug: c.slug }} className="text-sky-800 font-semibold underline">{c.name}</NavLink></li>
          ))}
        </ul>
        <p className="text-slate-700 leading-relaxed">
          Not sure? Read our <NavLink view="blog-post" params={{ slug: 'outboard-horsepower-guide' }} className="text-sky-700 font-semibold underline">horsepower guide</NavLink> or message us with your boat details and we will recommend an engine.
        </p>
      </section>

      {/* Trust strip */}
      <div className="mt-12 bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
        <ShieldCheck className="w-10 h-10 text-emerald-600 shrink-0" />
        <p className="text-sm text-slate-600">
          Every brand listed is sold under an official UK manufacturer warranty. All engines pass our in-house
          Pre-Delivery Inspection (PDI) before dispatch from our Cowes, Isle of Wight workshop.
        </p>
      </div>
    </div>
  );
}
