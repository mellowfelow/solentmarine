/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { X, Scale, FlameKindling, Anchor } from 'lucide-react';
import { Product } from '../types';

interface CompareDrawerProps {
  compareList: Product[];
  onRemove: (product: Product) => void;
  onClear: () => void;
  onClose: () => void;
  isOpen: boolean;
}

export default function CompareDrawer({
  compareList,
  onRemove,
  onClear,
  onClose,
  isOpen
}: CompareDrawerProps) {
  if (!isOpen) return null;

  return (
    <div id="compare-modal-backdrop" className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-end justify-center">
      <div 
        id="compare-modal-content"
        className="bg-white w-full max-w-7xl rounded-t-2xl shadow-2xl border-t border-slate-200 p-6 max-h-[90vh] overflow-y-auto animate-slide-up"
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <Scale className="w-6 h-6 text-sky-800" />
            <div>
              <h2 className="font-sans font-bold text-slate-900 text-xl">Outboard Technical Comparison</h2>
              <p className="text-xs text-slate-500 font-mono">Comparing {compareList.length} of max 3 engines</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {compareList.length > 0 && (
              <button
                type="button"
                id="clear-compare-btn"
                onClick={onClear}
                className="text-xs font-semibold text-slate-500 hover:text-slate-800 px-3 py-1.5 rounded-md hover:bg-slate-100"
              >
                Clear All
              </button>
            )}
            <button
              type="button"
              id="close-compare-btn"
              onClick={onClose}
              className="p-1.5 rounded-full bg-slate-150 text-slate-700 hover:bg-slate-200 transition"
              aria-label="Close Comparison"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {compareList.length === 0 ? (
          <div className="py-12 text-center text-slate-500 space-y-3">
            <Anchor className="w-12 h-12 text-slate-300 mx-auto" />
            <p className="font-sans">No engines in comparison list.</p>
            <p className="text-xs">Add outboard engines from the listing or details pages to compare their specifications.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:divide-x md:divide-slate-200">
            {/* Legend Column (hidden on mobile, shown on desktop) */}
            <div className="hidden md:block pr-4 space-y-4 text-sm font-semibold text-slate-500 py-4 font-sans mt-[190px]">
              <div className="h-14 flex items-center border-b border-slate-100">Retail Price (VAT Inc)</div>
              <div className="h-12 flex items-center border-b border-slate-100">Engine Output (HP / kW)</div>
              <div className="h-12 flex items-center border-b border-slate-100">Engine Type</div>
              <div className="h-12 flex items-center border-b border-slate-100">Fuel & Injection System</div>
              <div className="h-12 flex items-center border-b border-slate-100">Dry Weight (kg)</div>
              <div className="h-12 flex items-center border-b border-slate-100">Starter Mechanism</div>
              <div className="h-12 flex items-center border-b border-slate-100">Control Type</div>
              <div className="h-12 flex items-center border-b border-slate-100">Cylinders</div>
              <div className="h-12 flex items-center border-b border-slate-100">Displacement</div>
              <div className="h-12 flex items-center border-b border-slate-100">Propeller Included</div>
              <div className="h-12 flex items-center border-b border-slate-100">UK Warranty</div>
            </div>

            {/* Spec Columns (1 per product) */}
            {compareList.map((prod) => (
              <div key={prod.id} className="px-4 py-2 relative flex flex-col justify-between">
                <div>
                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => onRemove(prod)}
                    className="absolute top-2 right-2 p-1 rounded-full bg-red-50 text-red-500 hover:bg-red-100 transition"
                    title="Remove from comparison"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  {/* Thumbnail / Title */}
                  <div className="mb-4">
                    <img
                      src={prod.imageUrl}
                      alt={prod.name}
                      className="w-full h-32 object-cover rounded-lg border border-slate-200 shadow-sm mb-2"
                      referrerPolicy="no-referrer"
                    />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-sky-800 bg-sky-50 px-2 py-0.5 rounded">
                      {prod.brand}
                    </span>
                    <h4 className="font-semibold text-slate-900 text-sm mt-1 line-clamp-2 h-10">{prod.name}</h4>
                  </div>

                  {/* Specifications (Vertical row format) */}
                  <div className="space-y-4 text-xs text-slate-800 font-sans">
                    {/* Price */}
                    <div className="h-14 border-b border-slate-100 flex flex-col justify-center">
                      <span className="md:hidden font-bold text-slate-400 uppercase tracking-wider text-[10px]">Retail Price:</span>
                      <span className="text-base font-extrabold text-slate-900">£{prod.priceGbp.toLocaleString('en-GB')}</span>
                      <span className="text-[10px] text-slate-400">Includes 20% UK VAT</span>
                    </div>

                    {/* Output */}
                    <div className="h-12 border-b border-slate-100 flex flex-col justify-center">
                      <span className="md:hidden font-bold text-slate-400 uppercase tracking-wider text-[10px]">Output HP:</span>
                      <span className="font-medium text-slate-900">
                        {prod.powerHp} HP {prod.powerKw ? `(${prod.powerKw} kW)` : ''}
                      </span>
                    </div>

                    {/* Engine Type */}
                    <div className="h-12 border-b border-slate-100 flex flex-col justify-center">
                      <span className="md:hidden font-bold text-slate-400 uppercase tracking-wider text-[10px]">Engine Type:</span>
                      <span className="text-slate-900">{prod.engineType}</span>
                    </div>

                    {/* Fuel System */}
                    <div className="h-12 border-b border-slate-100 flex flex-col justify-center">
                      <span className="md:hidden font-bold text-slate-400 uppercase tracking-wider text-[10px]">Fuel System:</span>
                      <span className="text-slate-900 truncate" title={prod.fuelSystem}>{prod.fuelSystem}</span>
                    </div>

                    {/* Weight */}
                    <div className="h-12 border-b border-slate-100 flex flex-col justify-center">
                      <span className="md:hidden font-bold text-slate-400 uppercase tracking-wider text-[10px]">Weight:</span>
                      <span className="text-slate-900 font-medium">{prod.weightKg} kg</span>
                    </div>

                    {/* Starter */}
                    <div className="h-12 border-b border-slate-100 flex flex-col justify-center">
                      <span className="md:hidden font-bold text-slate-400 uppercase tracking-wider text-[10px]">Starter:</span>
                      <span className="text-slate-900">{prod.starter}</span>
                    </div>

                    {/* Control */}
                    <div className="h-12 border-b border-slate-100 flex flex-col justify-center">
                      <span className="md:hidden font-bold text-slate-400 uppercase tracking-wider text-[10px]">Control:</span>
                      <span className="text-slate-900">{prod.control}</span>
                    </div>

                    {/* Cylinders */}
                    <div className="h-12 border-b border-slate-100 flex flex-col justify-center">
                      <span className="md:hidden font-bold text-slate-400 uppercase tracking-wider text-[10px]">Cylinders:</span>
                      <span className="text-slate-900">{prod.specs.cylinders || 'N/A'}</span>
                    </div>

                    {/* Displacement */}
                    <div className="h-12 border-b border-slate-100 flex flex-col justify-center">
                      <span className="md:hidden font-bold text-slate-400 uppercase tracking-wider text-[10px]">Displacement:</span>
                      <span className="text-slate-900">{prod.specs.displacementHex || 'N/A'}</span>
                    </div>

                    {/* Propeller */}
                    <div className="h-12 border-b border-slate-100 flex flex-col justify-center">
                      <span className="md:hidden font-bold text-slate-400 uppercase tracking-wider text-[10px]">Propeller:</span>
                      <span className="text-slate-900">{prod.specs.propellerIncluded ? 'Yes' : 'Not Included'}</span>
                    </div>

                    {/* Warranty */}
                    <div className="h-12 border-b border-slate-100 flex flex-col justify-center">
                      <span className="md:hidden font-bold text-slate-400 uppercase tracking-wider text-[10px]">UK Warranty:</span>
                      <span className="font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md inline-block max-w-max">
                        {prod.specs.warrantyYears} Year Warranty
                      </span>
                    </div>
                  </div>
                </div>

                {prod.category.includes('two-stroke') && (
                  <div className="mt-4 p-2 bg-amber-50 rounded-md border border-amber-200 text-[10px] text-amber-800 leading-snug flex items-start gap-1">
                    <FlameKindling className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                    <span>Commercial / Racing use only (UK RCD II restrictions).</span>
                  </div>
                )}
              </div>
            ))}

            {/* Empty slots placeholders if comparison lists holds less than 3 */}
            {Array.from({ length: Math.max(0, 3 - compareList.length) }).map((_, idx) => (
              <div key={`empty-${idx}`} className="hidden md:flex flex-col items-center justify-center border-2 border-dashed border-slate-205 rounded-xl h-[450px] text-slate-300 py-10">
                <Scale className="w-10 h-10 mb-2 opacity-35" />
                <p className="text-xs text-slate-405 font-medium">Add another engine</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
