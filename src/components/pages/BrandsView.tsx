/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ChevronRight, ShieldCheck } from 'lucide-react';

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
        <button type="button" onClick={() => onNavigate('home')} className="hover:text-sky-700 cursor-pointer">Home</button>
        <ChevronRight className="w-3 h-3" />
        <span className="text-slate-800 font-semibold">Brands</span>
      </nav>

      {/* Hero */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-10 mb-10 border border-slate-800 shadow-xl">
        <div className="max-w-2xl space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-none">
            Shop Outboard Motors by Brand
          </h1>
          <p className="text-slate-350 text-sm">
            Authorized UK dealer stock from Yamaha, Mercury, Honda, Suzuki, Tohatsu and ePropulsion — every engine PDI checked and backed by official manufacturer warranty.
          </p>
        </div>
      </div>

      {/* Brand Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {brands.map((brand) => (
          <button
            key={brand.slug}
            type="button"
            onClick={() => onNavigate('shop-category', { slug: brand.slug })}
            className="group text-left bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:border-sky-300 transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-sans font-extrabold text-slate-900 text-xl tracking-tight group-hover:text-sky-700 transition">
                  {brand.name}
                </span>
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
          </button>
        ))}
      </div>

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
