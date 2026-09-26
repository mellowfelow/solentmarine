/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Scale, X, Anchor, ShoppingCart } from 'lucide-react';
import { Product } from '../../types';

interface CompareViewProps {
  compareList: Product[];
  onRemove: (product: Product) => void;
  onClear: () => void;
  onNavigate: (view: string, params?: Record<string, string>) => void;
  onAddToBasket: (product: Product, shaft: string) => void;
}

const isEngine = (p: Product) => !p.category.includes('parts') && p.powerHp > 0;

interface SpecRow {
  label: string;
  show: (products: Product[]) => boolean;
  render: (p: Product) => React.ReactNode;
}

const DASH = <span className="text-slate-300">—</span>;

const ROWS: SpecRow[] = [
  {
    label: 'UK Retail Price',
    show: () => true,
    render: (p) => (
      <div>
        <span className="text-base font-extrabold text-slate-900">
          £{p.priceGbp.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </span>
        <span className="block text-[10px] text-slate-400">VAT Included (20%)</span>
      </div>
    )
  },
  {
    label: 'Stock Status',
    show: () => true,
    render: (p) => (
      <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-mono">
        {p.stockStatus}
      </span>
    )
  },
  {
    label: 'Power Output',
    show: (products) => products.some(isEngine),
    render: (p) => (isEngine(p) ? <span>{p.powerHp} HP{p.powerKw ? ` (${p.powerKw} kW)` : ''}</span> : DASH)
  },
  {
    label: 'Engine / Drive Type',
    show: (products) => products.some(isEngine),
    render: (p) => (isEngine(p) ? <span>{p.engineType}</span> : DASH)
  },
  {
    label: 'Fuel / Power System',
    show: (products) => products.some(isEngine),
    render: (p) => (isEngine(p) ? <span title={p.fuelSystem}>{p.fuelSystem}</span> : DASH)
  },
  {
    label: 'Starter',
    show: (products) => products.some(isEngine),
    render: (p) => (isEngine(p) ? <span>{p.starter}</span> : DASH)
  },
  {
    label: 'Control Type',
    show: (products) => products.some(isEngine),
    render: (p) => (isEngine(p) ? <span>{p.control}</span> : DASH)
  },
  {
    label: 'Shaft / Fitting',
    show: () => true,
    render: (p) => <span>{p.shaftLengths.join(', ')}</span>
  },
  {
    label: 'Cylinders',
    show: (products) => products.some((p) => isEngine(p) && !!p.specs.cylinders),
    render: (p) => <span>{p.specs.cylinders || DASH}</span>
  },
  {
    label: 'Displacement',
    show: (products) => products.some((p) => isEngine(p) && !!p.specs.displacementHex),
    render: (p) => <span>{p.specs.displacementHex || DASH}</span>
  },
  {
    label: 'Propeller Included',
    show: (products) => products.some((p) => isEngine(p) && p.specs.propellerIncluded !== undefined),
    render: (p) => (isEngine(p) ? <span>{p.specs.propellerIncluded ? 'Yes' : 'Not Included'}</span> : DASH)
  },
  {
    label: 'Weight',
    show: () => true,
    render: (p) => <span className="font-medium">{p.weightKg} kg</span>
  },
  {
    label: 'Category',
    show: () => true,
    render: (p) => <span>{p.subcategories?.join(', ') || p.category.join(', ')}</span>
  },
  {
    label: 'Key Features',
    show: (products) => products.some((p) => p.features?.length),
    render: (p) =>
      p.features?.length ? (
        <ul className="text-xs space-y-0.5 list-disc list-inside text-left">
          {p.features.slice(0, 4).map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>
      ) : (
        DASH
      )
  },
  {
    label: 'UK Warranty',
    show: () => true,
    render: (p) => (
      <span className="font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md inline-block">
        {p.specs.warrantyYears} Year{p.specs.warrantyYears === 1 ? '' : 's'}
      </span>
    )
  }
];

export default function CompareView({ compareList, onRemove, onClear, onNavigate, onAddToBasket }: CompareViewProps) {
  const visibleRows = ROWS.filter((row) => row.show(compareList));

  return (
    <div id="compare-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="bg-sky-600 p-2.5 rounded-xl text-white shadow-inner">
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-sans font-extrabold text-slate-900 text-2xl sm:text-3xl tracking-tight">
              Product Comparison
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 font-mono">
              Comparing {compareList.length} of max 4 products — engines, batteries, chargers &amp; accessories
            </p>
          </div>
        </div>
        {compareList.length > 0 && (
          <button
            type="button"
            id="clear-compare-btn"
            onClick={onClear}
            className="text-xs font-semibold text-slate-500 hover:text-red-600 px-3 py-2 rounded-lg border border-slate-200 hover:border-red-200 hover:bg-red-50 transition self-start sm:self-auto"
          >
            Clear All
          </button>
        )}
      </div>

      {compareList.length === 0 ? (
        <div className="py-24 text-center border-2 border-dashed border-slate-200 rounded-2xl space-y-4 max-w-md mx-auto">
          <Anchor className="w-14 h-14 text-slate-300 mx-auto" />
          <div className="space-y-1">
            <h2 className="font-sans font-bold text-slate-900 text-lg">No products selected yet</h2>
            <p className="text-sm text-slate-500 px-6">
              Add up to 4 engines, batteries, chargers or accessories from the shop to compare their specs side by side.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('shop')}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-bold transition"
          >
            Browse the Shop &rarr;
          </button>
        </div>
      ) : (
        <div className="border border-slate-200 rounded-2xl shadow-sm overflow-hidden bg-white">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse min-w-[720px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="sticky left-0 z-10 bg-slate-50 text-left p-4 w-40 sm:w-52 align-bottom">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      {compareList.length}/4 selected
                    </span>
                  </th>
                  {compareList.map((p) => (
                    <th key={p.id} className="p-4 align-bottom min-w-[200px]">
                      <div className="relative bg-white border border-slate-200 rounded-xl p-3 text-left">
                        <button
                          type="button"
                          onClick={() => onRemove(p)}
                          title="Remove from comparison"
                          className="absolute top-1.5 right-1.5 p-1 rounded-full bg-red-50 text-red-500 hover:bg-red-100 transition"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                        <img
                          src={p.imageUrl}
                          alt={p.imageUrl.includes('/placeholders/') ? `Placeholder image — ${p.name}` : p.name}
                          className="w-full h-28 object-contain bg-slate-50 rounded-lg border border-slate-100 mb-2"
                          referrerPolicy="no-referrer"
                        />
                        <span className="text-[9px] font-bold uppercase tracking-wider text-sky-800 bg-sky-50 px-2 py-0.5 rounded">
                          {p.brand}
                        </span>
                        <button
                          type="button"
                          onClick={() => onNavigate('product-details', { slug: p.slug })}
                          className="block font-bold text-slate-900 text-sm mt-1.5 leading-snug line-clamp-2 min-h-[2.5rem] hover:text-sky-700 text-left transition"
                        >
                          {p.name}
                        </button>
                        <button
                          type="button"
                          onClick={() => onAddToBasket(p, p.shaftLengths[0] || 'Universal Fit')}
                          className="mt-2 w-full flex items-center justify-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 rounded-lg py-1.5 text-[11px] font-semibold transition"
                        >
                          <ShoppingCart className="w-3 h-3" />
                          Add to Basket
                        </button>
                      </div>
                    </th>
                  ))}
                  {Array.from({ length: Math.max(0, 4 - compareList.length) }).map((_, i) => (
                    <th key={`empty-${i}`} className="p-4 align-bottom min-w-[200px]">
                      <div className="h-full min-h-[220px] border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-slate-300 py-8">
                        <Scale className="w-8 h-8 mb-2 opacity-40" />
                        <p className="text-[11px] font-medium">Add another item</p>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {visibleRows.map((row, idx) => (
                  <tr key={row.label} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}>
                    <td className="sticky left-0 z-10 p-4 text-xs font-semibold text-slate-500 uppercase tracking-wide align-top bg-inherit border-t border-slate-100">
                      {row.label}
                    </td>
                    {compareList.map((p) => (
                      <td key={p.id} className="p-4 text-sm text-slate-800 align-top border-t border-slate-100">
                        {row.render(p)}
                      </td>
                    ))}
                    {Array.from({ length: Math.max(0, 4 - compareList.length) }).map((_, i) => (
                      <td key={`empty-${i}`} className="p-4 border-t border-slate-100" />
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
