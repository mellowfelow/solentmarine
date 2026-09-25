/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Search, Filter, RotateCcw } from 'lucide-react';
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

  return (
    <div id="filter-panel" className="bg-white border border-slate-200 rounded-xl p-5 space-y-6 shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-slate-100 pb-3">
        <div id="filter-panel-header" className="flex items-center gap-2 font-semibold text-slate-900 text-sm">
          <Filter className="w-4 h-4 text-sky-850" />
          <span>Filters & Selection</span>
        </div>
        <button
          type="button"
          id="reset-filters-btn"
          onClick={handleReset}
          className="text-xs text-sky-700 hover:text-sky-900 font-medium flex items-center gap-1.5 transition"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset All</span>
        </button>
      </div>

      {/* Text Search */}
      <div className="space-y-1.5">
        <label className="block text-xs font-semibold text-slate-505 uppercase tracking-wider">Search Keyword</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            id="filter-search-input"
            value={filters.searchQuery}
            onChange={handleTextChange}
            placeholder="e.g. Yamaha F2.5, EFI, 4-stroke..."
            className="block w-full pl-9 pr-3 py-2 border border-slate-300 rounded-md focus:ring-sky-501 focus:border-sky-500 text-sm bg-white text-slate-900 placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Stock Signal Filter */}
      <div className="flex items-center justify-between py-2 border-y border-slate-100">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest leading-none">UK Stock Only</span>
        <button
          type="button"
          id="stock-only-toggle"
          onClick={handleToggleStock}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
            filters.stockOnly ? 'bg-sky-900' : 'bg-slate-200'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              filters.stockOnly ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      {/* Brands check-grid */}
      <div className="space-y-2">
        <span className="block text-xs font-semibold text-slate-500 uppercase tracking-widest">Brand / Builder</span>
        <div className="grid grid-cols-2 gap-2">
          {BRANDS.map((brand) => {
            const isChecked = filters.brands.includes(brand);
            return (
              <button
                type="button"
                key={brand}
                id={`filter-brand-${brand.toLowerCase().replace(' ', '-')}`}
                onClick={() => handleBrandToggle(brand)}
                className={`flex items-center px-3 py-2 border text-xs font-medium rounded-md transition ${
                  isChecked
                    ? 'border-sky-800 bg-sky-50 text-sky-900 font-semibold'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                {brand}
              </button>
            );
          })}
        </div>
      </div>

      {/* Categories check-list */}
      <div className="space-y-2.5">
        <span className="block text-xs font-semibold text-slate-500 uppercase tracking-widest">Product Categories</span>
        <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
          {CATEGORIES.map((cat) => {
            const isChecked = filters.categories.includes(cat.value);
            return (
              <label key={cat.value} className="flex items-center gap-2.5 text-sm text-slate-700 cursor-pointer hover:text-slate-900">
                <input
                  type="checkbox"
                  id={`filter-cat-${cat.value}`}
                  checked={isChecked}
                  onChange={() => handleCategoryToggle(cat.value)}
                  className="rounded text-sky-850 focus:ring-sky-500 border-slate-300 w-4 h-4"
                />
                <span className={isChecked ? 'font-semibold text-slate-900' : ''}>{cat.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Engine Types check-list */}
      <div className="space-y-2.5">
        <span className="block text-xs font-semibold text-slate-500 uppercase tracking-widest">Engine Classification</span>
        <div className="flex gap-2">
          {ENGINE_TYPES.map((type) => {
            const isChecked = filters.engineTypes.includes(type);
            return (
              <button
                type="button"
                id={`filter-enginetype-${type.toLowerCase()}`}
                key={type}
                onClick={() => handleEngineTypeToggle(type)}
                className={`flex-1 py-1.5 border text-xs font-medium rounded text-center transition ${
                  isChecked
                    ? 'border-sky-850 bg-sky-100 text-sky-900 font-semibold'
                    : 'border-slate-200 bg-white text-slate-650 hover:bg-slate-50'
                }`}
              >
                {type}
              </button>
            );
          })}
        </div>
      </div>

      {/* Maximum Price Slider */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Max Price (inc. VAT)</span>
          <span className="text-xs font-semibold font-mono text-slate-900">£{filters.maxPrice.toLocaleString('en-GB')}</span>
        </div>
        <input
          type="range"
          id="filter-price-slider"
          min="0"
          max={maxProductPrice}
          step="50"
          value={filters.maxPrice}
          onChange={handlePriceSlide}
          className="w-full accent-sky-800 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-400 font-mono">
          <span>£0</span>
          <span>£{maxProductPrice.toLocaleString()}</span>
        </div>
      </div>

      {/* Maximum Horsepower Slider */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Max Power equivalent</span>
          <span className="text-xs font-semibold font-mono text-slate-900">{filters.maxPowerHp} HP</span>
        </div>
        <input
          type="range"
          id="filter-power-slider"
          min="0"
          max={maxHp}
          value={filters.maxPowerHp}
          onChange={handlePowerSlide}
          className="w-full accent-sky-800 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-400 font-mono">
          <span>0 HP</span>
          <span>{maxHp} HP</span>
        </div>
      </div>

      {/* Shaft length checkboxes */}
      <div className="space-y-2">
        <span className="block text-xs font-semibold text-slate-500 uppercase tracking-widest">Shaft Configurations</span>
        <div className="space-y-1.5">
          {SHAFT_LENGTHS.map((shaft) => {
            const isChecked = filters.shaftLengths.includes(shaft);
            return (
              <label key={shaft} className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  id={`filter-shaft-${shaft.replace(' ', '-').toLowerCase()}`}
                  checked={isChecked}
                  onChange={() => handleShaftToggle(shaft)}
                  className="rounded text-sky-850 focus:ring-sky-502 border-slate-300 w-4 h-4"
                />
                <span>{shaft}</span>
              </label>
            );
          })}
        </div>
      </div>
    </div>
  );
}
