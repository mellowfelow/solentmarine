/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, RotateCcw, ChevronDown, Tag, LayoutGrid, Zap, Banknote, Gauge, Ruler } from 'lucide-react';
import { SearchFilters, BrandType, CategoryType } from '../types';

interface SearchAndFiltersProps {
  filters: SearchFilters;
  onFilterChange: (filters: SearchFilters) => void;
  maxProductPrice: number;
  maxHp: number;
}

const BRANDS: BrandType[] = ['Yamaha', 'Suzuki', 'Honda', 'Mercury', 'Tohatsu', 'Torqeedo', 'ePropulsion', 'TEMO France', 'Haswing', 'Minn Kota', 'Blade Electric', 'Solas', 'Universal'];
const ENGINE_TYPES: ('4-Stroke' | '2-Stroke' | 'Electric')[] = ['4-Stroke', '2-Stroke', 'Electric'];
const SHAFT_LENGTHS = ['Short (S)', 'Long (L)', 'Extra Long', 'Adjustable'];

const CATEGORIES: { label: string; value: CategoryType }[] = [
  { label: 'Portable outboards (2.5hp - 6hp)', value: 'portable' },
  { label: 'Mid-range (8hp - 40hp)', value: 'mid-range' },
  { label: 'High Horsepower (50hp+)', value: 'high-horsepower' },
  { label: '4-Stroke Petrol Motors', value: 'four-stroke' },
  { label: 'Electric & Eco Motors', value: 'electric' },
  { label: 'Trolling Motors', value: 'trolling' },
  { label: 'Parts, Oils & Accessories', value: 'parts' }
];

function FilterSection({
  title,
  icon,
  defaultOpen = false,
  count,
  children
}: {
  title: string;
  icon: React.ReactNode;
  defaultOpen?: boolean;
  count?: number;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-slate-100 last:border-0 py-4 first:pt-0 last:pb-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between text-left group"
        aria-expanded={open}
      >
        <span className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
          <span className="text-sky-700">{icon}</span>
          {title}
          {!!count && (
            <span className="bg-sky-100 text-sky-800 text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
              {count}
            </span>
          )}
        </span>
        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="mt-3">{children}</div>}
    </div>
  );
}

export default function SearchAndFilters({
  filters,
  onFilterChange,
  maxProductPrice,
  maxHp
}: SearchAndFiltersProps) {

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, searchQuery: e.target.value });
  };

  const handleBrandToggle = (brand: BrandType) => {
    const isChecked = filters.brands.includes(brand);
    const updatedBrands = isChecked
      ? filters.brands.filter(b => b !== brand)
      : [...filters.brands, brand];
    onFilterChange({ ...filters, brands: updatedBrands });
  };

  const handleCategoryToggle = (category: CategoryType) => {
    const isChecked = filters.categories.includes(category);
    const updatedCats = isChecked
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    onFilterChange({ ...filters, categories: updatedCats });
  };

  const handleEngineTypeToggle = (type: '4-Stroke' | '2-Stroke' | 'Electric') => {
    const isChecked = filters.engineTypes.includes(type);
    const updatedTypes = isChecked
      ? filters.engineTypes.filter(t => t !== type)
      : [...filters.engineTypes, type];
    onFilterChange({ ...filters, engineTypes: updatedTypes });
  };

  const handleShaftToggle = (shaft: string) => {
    const isChecked = filters.shaftLengths.includes(shaft);
    const updatedShaft = isChecked
      ? filters.shaftLengths.filter(s => s !== shaft)
      : [...filters.shaftLengths, shaft];
    onFilterChange({ ...filters, shaftLengths: updatedShaft });
  };

  const handlePriceSlide = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, maxPrice: parseInt(e.target.value) });
  };

  const handlePowerSlide = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, maxPowerHp: parseInt(e.target.value) });
  };

  const handleToggleStock = () => {
    onFilterChange({ ...filters, stockOnly: !filters.stockOnly });
  };

  const handleReset = () => {
    onFilterChange({
      searchQuery: '',
      brands: [],
      categories: [],
      engineTypes: [],
      minPrice: 0,
      maxPrice: maxProductPrice,
      minPowerHp: 0,
      maxPowerHp: maxHp,
      shaftLengths: [],
      stockOnly: false
    });
  };

  const activeCount =
    filters.brands.length + filters.categories.length + filters.engineTypes.length + filters.shaftLengths.length + (filters.stockOnly ? 1 : 0);

  return (
    <div id="filter-panel" className="bg-white rounded-xl">
      {/* Header */}
      <div className="flex justify-between items-center pb-4 mb-1">
        <div id="filter-panel-header" className="flex items-center gap-2 font-bold text-slate-900 text-sm">
          <span>Refine Results</span>
          {activeCount > 0 && (
            <span className="bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{activeCount} active</span>
          )}
        </div>
        <button
          type="button"
          id="reset-filters-btn"
          onClick={handleReset}
          className="text-xs text-sky-700 hover:text-sky-900 font-semibold flex items-center gap-1.5 transition"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Text Search */}
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-slate-400" />
        </div>
        <input
          type="text"
          id="filter-search-input"
          value={filters.searchQuery}
          onChange={handleTextChange}
          placeholder="Search e.g. Yamaha F2.5, EFI, 4-stroke..."
          className="block w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-sm bg-slate-50 focus:bg-white text-slate-900 placeholder:text-slate-400 transition"
        />
      </div>

      {/* Stock Signal Filter */}
      <div className="flex items-center justify-between py-3 px-3.5 mb-1 bg-slate-50 rounded-lg border border-slate-100">
        <span className="text-xs font-semibold text-slate-600">UK Stock Only</span>
        <button
          type="button"
          id="stock-only-toggle"
          onClick={handleToggleStock}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
            filters.stockOnly ? 'bg-sky-600' : 'bg-slate-300'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              filters.stockOnly ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      <div className="divide-y divide-slate-100">
        <FilterSection title="Category" icon={<LayoutGrid className="w-3.5 h-3.5" />} defaultOpen count={filters.categories.length}>
          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
            {CATEGORIES.map((cat) => {
              const isChecked = filters.categories.includes(cat.value);
              return (
                <label key={cat.value} className="flex items-center gap-2.5 text-sm text-slate-700 cursor-pointer hover:text-slate-900 py-0.5">
                  <input
                    type="checkbox"
                    id={`filter-cat-${cat.value}`}
                    checked={isChecked}
                    onChange={() => handleCategoryToggle(cat.value)}
                    className="rounded text-sky-600 focus:ring-sky-500 border-slate-300 w-4 h-4"
                  />
                  <span className={isChecked ? 'font-semibold text-slate-900' : ''}>{cat.label}</span>
                </label>
              );
            })}
          </div>
        </FilterSection>

        <FilterSection title="Brand" icon={<Tag className="w-3.5 h-3.5" />} defaultOpen count={filters.brands.length}>
          <div className="grid grid-cols-2 gap-2">
            {BRANDS.map((brand) => {
              const isChecked = filters.brands.includes(brand);
              return (
                <button
                  type="button"
                  key={brand}
                  id={`filter-brand-${brand.toLowerCase().replace(' ', '-')}`}
                  onClick={() => handleBrandToggle(brand)}
                  className={`px-3 py-2 border text-xs font-medium rounded-lg transition text-left ${
                    isChecked
                      ? 'border-sky-600 bg-sky-50 text-sky-900 font-semibold'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {brand}
                </button>
              );
            })}
          </div>
        </FilterSection>

        <FilterSection title="Engine / Drive Type" icon={<Zap className="w-3.5 h-3.5" />} count={filters.engineTypes.length}>
          <div className="flex gap-2">
            {ENGINE_TYPES.map((type) => {
              const isChecked = filters.engineTypes.includes(type);
              return (
                <button
                  type="button"
                  id={`filter-enginetype-${type.toLowerCase()}`}
                  key={type}
                  onClick={() => handleEngineTypeToggle(type)}
                  className={`flex-1 py-2 border text-xs font-medium rounded-lg text-center transition ${
                    isChecked
                      ? 'border-sky-600 bg-sky-50 text-sky-900 font-semibold'
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {type}
                </button>
              );
            })}
          </div>
        </FilterSection>

        <FilterSection title="Max Price" icon={<Banknote className="w-3.5 h-3.5" />}>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[11px] text-slate-500">Up to</span>
              <span className="text-sm font-bold font-mono text-slate-900">£{filters.maxPrice.toLocaleString('en-GB')}</span>
            </div>
            <input
              type="range"
              id="filter-price-slider"
              min="0"
              max={maxProductPrice}
              step="50"
              value={filters.maxPrice}
              onChange={handlePriceSlide}
              className="w-full accent-sky-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>£0</span>
              <span>£{maxProductPrice.toLocaleString()}</span>
            </div>
          </div>
        </FilterSection>

        <FilterSection title="Max Power" icon={<Gauge className="w-3.5 h-3.5" />}>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-[11px] text-slate-500">Up to</span>
              <span className="text-sm font-bold font-mono text-slate-900">{filters.maxPowerHp} HP</span>
            </div>
            <input
              type="range"
              id="filter-power-slider"
              min="0"
              max={maxHp}
              value={filters.maxPowerHp}
              onChange={handlePowerSlide}
              className="w-full accent-sky-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-mono">
              <span>0 HP</span>
              <span>{maxHp} HP</span>
            </div>
          </div>
        </FilterSection>

        <FilterSection title="Shaft / Fitting" icon={<Ruler className="w-3.5 h-3.5" />} count={filters.shaftLengths.length}>
          <div className="space-y-1.5">
            {SHAFT_LENGTHS.map((shaft) => {
              const isChecked = filters.shaftLengths.includes(shaft);
              return (
                <label key={shaft} className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer py-0.5">
                  <input
                    type="checkbox"
                    id={`filter-shaft-${shaft.replace(' ', '-').toLowerCase()}`}
                    checked={isChecked}
                    onChange={() => handleShaftToggle(shaft)}
                    className="rounded text-sky-600 focus:ring-sky-500 border-slate-300 w-4 h-4"
                  />
                  <span>{shaft}</span>
                </label>
              );
            })}
          </div>
        </FilterSection>
      </div>
    </div>
  );
}
