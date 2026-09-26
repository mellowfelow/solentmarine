/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { SearchFilters, Product } from '../../types';
import SearchAndFilters from '../SearchAndFilters';
import { LayoutGrid, AlertCircle, ShoppingCart, ChevronRight, SlidersHorizontal, X, ChevronLeft } from 'lucide-react';
import { CATEGORIES, BRANDS } from '../../config/site';

const PAGE_SIZE = 12;

interface ShopViewProps {
  products: Product[];
  onNavigate: (view: string, params?: Record<string, string>) => void;
  onAddToCompare: (product: Product) => void;
  compareList: Product[];
  onAddToBasket: (product: Product, shaft: string) => void;
  categorySlug?: string;
  brandSlug?: string;
}

export default function ShopView({
  products,
  onNavigate,
  onAddToCompare,
  compareList,
  onAddToBasket,
  categorySlug,
  brandSlug
}: ShopViewProps) {
  const activeCategory = categorySlug ? CATEGORIES.find(c => c.slug === categorySlug) : undefined;
  const activeBrand = brandSlug ? BRANDS.find(b => b.slug === brandSlug) : undefined;
  // Scope the catalog to the category/brand route (if any) before facet filtering — this is what makes
  // /shop/[category]/ and /shop/[brand]/ real, distinct, crawlable pages rather than client-side filters.
  const scopedProducts = useMemo(() => {
    if (activeCategory) return products.filter(p => p.category.includes(activeCategory.slug as any));
    if (activeBrand) return products.filter(p => p.brand.toLowerCase() === activeBrand.name.toLowerCase());
    return products;
  }, [products, activeCategory, activeBrand]);

  // Max ranges in database
  const maxPriceDb = useMemo(() => Math.max(...scopedProducts.map(p => p.priceGbp)), [scopedProducts]);
  const maxHpDb = useMemo(() => Math.max(...scopedProducts.map(p => p.powerHp)), [scopedProducts]);

  // Filters State
  const [filters, setFilters] = useState<SearchFilters>({
    searchQuery: '',
    brands: [],
    categories: [],
    engineTypes: [],
    minPrice: 0,
    maxPrice: maxPriceDb,
    minPowerHp: 0,
    maxPowerHp: maxHpDb,
    shaftLengths: [],
    stockOnly: false
  });

  const [sortBy, setSortBy] = useState<string>('featured');

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...scopedProducts];

    // Search Query
    if (filters.searchQuery.trim() !== '') {
      const q = filters.searchQuery.toLowerCase();
      result = result.filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Brands
    if (filters.brands.length > 0) {
      result = result.filter(p => filters.brands.includes(p.brand));
    }

    // Categories
    if (filters.categories.length > 0) {
      result = result.filter(p =>
        p.category.some(c => filters.categories.includes(c))
      );
    }

    // Engine Types
    if (filters.engineTypes.length > 0) {
      result = result.filter(p => filters.engineTypes.includes(p.engineType));
    }

    // Stock Only
    if (filters.stockOnly) {
      result = result.filter(p => p.stockStatus === 'In Stock');
    }

    // Shaft Lengths
    if (filters.shaftLengths.length > 0) {
      result = result.filter(p =>
        p.shaftLengths.some(shaft =>
          filters.shaftLengths.some(fShaft =>
            shaft.toLowerCase().includes(fShaft.toLowerCase().split(' ')[0])
          )
        )
      );
    }

    // Price Range
    result = result.filter(p => p.priceGbp <= filters.maxPrice);

    // Power Range
    result = result.filter(p => p.powerHp <= filters.maxPowerHp);

    // Sort By
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.priceGbp - b.priceGbp);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.priceGbp - a.priceGbp);
    } else if (sortBy === 'weight-asc') {
      result.sort((a, b) => a.weightKg - b.weightKg);
    } else if (sortBy === 'hp-desc') {
      result.sort((a, b) => b.powerHp - a.powerHp);
    }

    return result;
  }, [scopedProducts, filters, sortBy]);

  // Pagination
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));

  useEffect(() => {
    setPage(1);
  }, [filters, sortBy, categorySlug, brandSlug]);

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const paginatedProducts = useMemo(
    () => filteredProducts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [filteredProducts, page]
  );

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div id="shop-view-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500 mb-4">
        <button type="button" onClick={() => onNavigate('home')} className="hover:text-sky-700 cursor-pointer">Home</button>
        <ChevronRight className="w-3 h-3" />
        <button type="button" onClick={() => onNavigate('shop')} className="hover:text-sky-700 cursor-pointer">Shop</button>
        {(activeCategory || activeBrand) && (
          <>
            <ChevronRight className="w-3 h-3" />
            <span className="text-slate-800 font-semibold">{activeCategory ? activeCategory.name : activeBrand!.name}</span>
          </>
        )}
      </nav>

      {/* Hero Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-10 mb-8 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight leading-none">
            {activeCategory ? activeCategory.name : activeBrand ? `${activeBrand.name} Outboards` : 'Marine Motors For Sale — UK Outboard Stock Inventory'}
          </h1>
          <p className="text-slate-350 text-sm">
            {activeCategory ? activeCategory.description : activeBrand ? activeBrand.description : 'Configure technical parameters to match your hull. We conduct a full Pre-Delivery Inspection (PDI) on all outboards and offer dynamic monthly financing models.'}
          </p>
          {activeCategory?.slug === 'parts' && (
            <p className="text-sky-300 text-xs pt-1">
              We regularly deliver genuine parts across the Solent — Hamble, Hythe, Lymington, Portsmouth, Swanwick and the Isle of Wight — alongside standard UK mainland delivery.
            </p>
          )}
        </div>
        <div className="absolute top-0 right-0 h-full w-1/3 opacity-10 pointer-events-none hidden md:block">
          <LayoutGrid className="w-full h-full text-white" />
        </div>
      </div>

      {/* Category quick-links — real crawlable /shop/[category]/ pages, internal linking hub */}
      <div className="flex flex-wrap gap-2 mb-3">
        <button
          type="button"
          onClick={() => onNavigate('shop')}
          className={`px-3.5 py-2 rounded-lg text-xs font-semibold border transition ${!activeCategory && !activeBrand ? 'bg-sky-600 text-white border-sky-600' : 'bg-white text-slate-700 border-slate-200 hover:border-sky-300'}`}
        >
          All Stock
        </button>
        {CATEGORIES.map(cat => (
          <button
            key={cat.slug}
            type="button"
            onClick={() => onNavigate('shop-category', { slug: cat.slug })}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold border transition ${activeCategory?.slug === cat.slug ? 'bg-sky-600 text-white border-sky-600' : 'bg-white text-slate-700 border-slate-200 hover:border-sky-300'}`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Brand quick-links — real crawlable /shop/[brand]/ pages */}
      <div className="flex flex-wrap gap-2 mb-8">
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 self-center mr-1">Shop by brand:</span>
        {BRANDS.map(brand => (
          <button
            key={brand.slug}
            type="button"
            onClick={() => onNavigate('shop-category', { slug: brand.slug })}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${activeBrand?.slug === brand.slug ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'}`}
          >
            {brand.name}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {/* Controls toolbar */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              id="open-filters-btn"
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg px-4 py-2.5 text-xs font-bold transition shrink-0"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              {(filters.brands.length + filters.categories.length + filters.engineTypes.length + filters.shaftLengths.length + (filters.stockOnly ? 1 : 0)) > 0 && (
                <span className="bg-sky-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {filters.brands.length + filters.categories.length + filters.engineTypes.length + filters.shaftLengths.length + (filters.stockOnly ? 1 : 0)}
                </span>
              )}
            </button>
            <p className="text-slate-600 font-medium">
              <span className="font-bold text-slate-900">{filteredProducts.length}</span> products found
            </p>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
            <label htmlFor="sort-selection" className="font-semibold text-slate-500 uppercase tracking-widest text-[10px] shrink-0">Sort By:</label>
            <select
              id="sort-selection"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-slate-300 rounded-md p-1.5 focus:ring-sky-500 font-semibold text-slate-800"
            >
              <option value="featured">Featured Engine Listing</option>
              <option value="price-asc">Price: Petrol (Low to High)</option>
              <option value="price-desc">Price: Petrol (High to Low)</option>
              <option value="weight-asc">Dry Weight: Lightest First</option>
              <option value="hp-desc">Horsepower: Strongest First</option>
            </select>
          </div>
        </div>

        {/* Filter Drawer */}
        {isFilterOpen && (
          <div id="filter-drawer-backdrop" className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex justify-end">
            <div
              id="filter-drawer-panel"
              className="bg-white w-full max-w-sm h-full shadow-2xl overflow-y-auto p-6 animate-slide-left"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold text-slate-900 text-base">Filters</h2>
                <button
                  type="button"
                  id="close-filters-btn"
                  onClick={() => setIsFilterOpen(false)}
                  className="p-1.5 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 transition"
                  aria-label="Close filters"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <SearchAndFilters
                filters={filters}
                onFilterChange={setFilters}
                maxProductPrice={maxPriceDb}
                maxHp={maxHpDb}
              />
              <button
                type="button"
                onClick={() => setIsFilterOpen(false)}
                className="mt-6 w-full bg-sky-600 hover:bg-sky-700 text-white rounded-lg py-3 text-sm font-bold transition sticky bottom-0"
              >
                Show {filteredProducts.length} results
              </button>
            </div>
          </div>
        )}

        {/* Listing Grid */}
        <div>
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center border-2 border-dashed border-slate-200 rounded-2xl space-y-4 max-w-md mx-auto">
              <AlertCircle className="w-12 h-12 text-slate-400 mx-auto" />
              <div className="space-y-1">
                <h3 className="font-sans font-bold text-slate-900 text-base">No Outboard Motors Found</h3>
                <p className="text-xs text-slate-550 px-6">We could not locate any models matching these current filtration parameters. Please try relaxed selections or click "Reset All".</p>
              </div>
              <button
                type="button"
                id="reset-empty-filters-btn"
                onClick={() => setFilters({
                  searchQuery: '',
                  brands: [],
                  categories: [],
                  engineTypes: [],
                  minPrice: 0,
                  maxPrice: maxPriceDb,
                  minPowerHp: 0,
                  maxPowerHp: maxHpDb,
                  shaftLengths: [],
                  stockOnly: false
                })}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {paginatedProducts.map((prod) => {
                const isTwoStroke = prod.category.includes('two-stroke');
                const defaultShaft = prod.shaftLengths[0] || 'Short Shaft (S)';
                
                return (
                  <div
                    key={prod.id}
                    className="bg-white border border-slate-205 rounded-xl p-4 shadow-sm group flex flex-col justify-between hover:shadow-md transition"
                  >
                    <div>
                      {/* Product Image */}
                      <div className="relative overflow-hidden rounded-lg mb-3">
                        <img
                          src={prod.imageUrl}
                          alt={prod.imageUrl.includes('/placeholders/') ? `Placeholder image — ${prod.name} — real product photo coming soon` : prod.name}
                          loading="lazy"
                          className="w-full h-44 object-contain bg-slate-50 group-hover:scale-105 transition duration-300 border border-slate-100"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-sm px-2 py-0.5 rounded text-[9px] font-bold tracking-wider text-sky-400">
                          {prod.brand.toUpperCase()}
                        </div>
                        {prod.powerKw && (
                          <div className="absolute bottom-2 left-2 bg-sky-900 text-white px-2.5 py-0.5 rounded text-[10px] font-bold">
                            {prod.powerKw} kW Electric Drive
                          </div>
                        )}
                      </div>

                      {/* Header Specs */}
                      <div className="flex justify-between items-center text-[10px] font-bold tracking-wider uppercase text-slate-450 mb-1">
                        <span>{prod.engineType}</span>
                        <span className="text-emerald-700 bg-emerald-50 px-2 rounded-full font-mono">{prod.stockStatus}</span>
                      </div>

                      {/* Title */}
                      <h4
                        onClick={() => onNavigate('product-details', { slug: prod.slug })}
                        className="font-sans font-bold text-slate-900 text-sm leading-snug line-clamp-2 min-h-10 hover:text-sky-800 transition cursor-pointer"
                      >
                        {prod.name}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2 mb-3">{prod.description}</p>

                      {/* Technical Quick Badges */}
                      <div className="flex flex-wrap gap-1.5 mb-4 max-h-12 overflow-hidden select-none">
                        <span className="bg-slate-100 text-slate-700 text-[10px] px-2 py-0.5 rounded font-medium">
                          {prod.powerHp} HP
                        </span>
                        <span className="bg-slate-100 text-slate-700 text-[10px] px-2 py-0.5 rounded font-medium">
                          {prod.weightKg} kg weight
                        </span>
                        <span className="bg-slate-100 text-slate-700 text-[10px] px-2 py-0.5 rounded font-medium">
                          {prod.specs.warrantyYears} Yr Warranty
                        </span>
                      </div>
                    </div>

                    {/* Bottom Pricing & Trigger Area */}
                    <div className="pt-3 border-t border-slate-100">
                      <div className="flex justify-between items-baseline mb-3">
                        <span className="text-[10px] text-slate-400 font-semibold">UK Retail Price</span>
                        <div className="text-right">
                          <span className="text-base font-extrabold text-slate-900">£{prod.priceGbp.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                          <span className="block text-[9px] text-slate-400 leading-none">VAT Included (20%)</span>
                        </div>
                      </div>

                      {isTwoStroke && (
                        <div className="p-1 px-2 border border-amber-200 bg-amber-50 rounded text-[9px] text-amber-800 leading-tight mb-3">
                          * Commercial or racing registration required for dispatch.
                        </div>
                      )}

                      {/* Control buttons */}
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => onNavigate('product-details', { slug: prod.slug })}
                          className="bg-slate-900 hover:bg-slate-800 text-white rounded-lg py-2.5 text-xs font-semibold transition text-center"
                        >
                          Specification details
                        </button>
                        <button
                          type="button"
                          id={`add-to-compare-${prod.id}`}
                          onClick={() => onAddToCompare(prod)}
                          disabled={compareList.some(c => c.id === prod.id)}
                          className="bg-slate-100 hover:bg-slate-200 text-slate-800 disabled:opacity-50 disabled:cursor-not-allowed border border-slate-200 rounded-lg py-2.5 text-xs font-semibold transition"
                        >
                          {compareList.some(c => c.id === prod.id) ? 'Added ✓' : 'Compare'}
                        </button>
                      </div>

                      {/* Direct Basket button */}
                      <button
                        type="button"
                        id={`add-to-basket-${prod.id}`}
                        onClick={() => onAddToBasket(prod, defaultShaft)}
                        className="w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-900 rounded-lg py-2 text-xs font-semibold transition mt-2 border border-emerald-200 flex items-center justify-center gap-1.5"
                      >
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>Add default configuration to Basket</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Pagination */}
          {filteredProducts.length > PAGE_SIZE && (
            <div className="flex items-center justify-center gap-2 pt-8">
              <button
                type="button"
                id="pagination-prev"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
                aria-label="Previous page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-1.5">
                {Array.from({ length: totalPages }).map((_, i) => {
                  const pageNum = i + 1;
                  const isActive = pageNum === page;
                  if (totalPages > 7 && Math.abs(pageNum - page) > 2 && pageNum !== 1 && pageNum !== totalPages) {
                    if (pageNum === 2 || pageNum === totalPages - 1) {
                      return <span key={pageNum} className="text-slate-300 px-1">…</span>;
                    }
                    return null;
                  }
                  return (
                    <button
                      key={pageNum}
                      type="button"
                      onClick={() => setPage(pageNum)}
                      className={`min-w-[2.25rem] h-9 px-2 rounded-lg text-xs font-bold transition ${
                        isActive
                          ? 'bg-slate-900 text-white'
                          : 'text-slate-600 hover:bg-slate-100 border border-slate-200'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              <button
                type="button"
                id="pagination-next"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
                aria-label="Next page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
