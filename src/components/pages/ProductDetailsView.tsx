/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Product, Review } from '../../types';
import { Star, ShieldAlert, BadgeInfo, Scale, ChevronLeft, MapPin, CheckCircle, Ship, AlertCircle } from 'lucide-react';
import NavLink from '../NavLink';
import { CATEGORIES, BRANDS } from '../../config/site';
import { getProductCopy, gbp, kindOf } from '../../lib/productCopy';
import { thumbUrl } from '../../lib/seo';

interface ProductDetailsViewProps {
  slug: string;
  products: Product[];
  onNavigate: (view: string, params?: Record<string, string>) => void;
  onAddToCompare: (product: Product) => void;
  compareList: Product[];
  onAddToBasket: (product: Product, shaft: string, quantity?: number) => void;
}

export default function ProductDetailsView({
  slug,
  products,
  onNavigate,
  onAddToCompare,
  compareList,
  onAddToBasket
}: ProductDetailsViewProps) {
  const product = products.find(p => p.slug === slug);

  if (!product) {
    return (
      <div className="max-w-md mx-auto py-20 text-center space-y-4 font-sans">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
        <h2 className="font-sans font-bold text-slate-900 text-lg">Product Not Located</h2>
        <p className="text-sm text-slate-550">We could not identify the outboard motor specifications matching that web slug.</p>
        <NavLink
          view="shop"
          className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold"
        >
          Return to Stock Center
        </NavLink>
      </div>
    );
  }

  // State management
  const [selectedShaft, setSelectedShaft] = useState<string>(product.shaftLengths[0] || 'Short Shaft (15")');
  const [quantity, setQuantity] = useState<number>(1);
  const [addedNote, setAddedNote] = useState<boolean>(false);

  const reviews: Review[] = product.reviews;

  const handleBasketSub = () => {
    onAddToBasket(product, selectedShaft, quantity);
    setAddedNote(true);
    setTimeout(() => setAddedNote(false), 3000);
  };

  const avgRating = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : null; // No fabricated default rating — a product with zero reviews shows "No reviews yet", not a fake 5.0.

  const copy = getProductCopy(product);
  const kind = kindOf(product);
  const primaryCat = CATEGORIES.find(c => product.category.includes(c.slug as any));
  const brandPage = BRANDS.find(b => b.name.toLowerCase() === product.brand.toLowerCase());
  const related = products
    .filter(p => p.slug !== product.slug && kindOf(p) === kind && (primaryCat ? p.category.includes(primaryCat.slug as any) : true))
    .sort((a, b) => (a.brand === product.brand ? -1 : 0) - (b.brand === product.brand ? -1 : 0) || Math.abs(a.powerHp - product.powerHp) - Math.abs(b.powerHp - product.powerHp))
    .slice(0, 4);
  const specRows: [string, string][] = [['Brand', product.brand]];
  if (kind !== 'part') {
    specRows.push(['Power', product.powerKw ? `${product.powerKw}kW (${product.powerHp}HP equivalent)` : `${product.powerHp}HP`]);
    specRows.push(['Engine type', product.engineType === 'Electric' ? 'Electric' : `${product.engineType} petrol`]);
    const sh = product.shaftLengths.filter(x => !/fixed|universal/i.test(x));
    if (sh.length) specRows.push(['Shaft options', sh.join(' / ')]);
    if (product.condition === 'used') {
      specRows.push(['Condition', 'Used']);
    } else {
      specRows.push(['Condition', 'New']);
      specRows.push(['UK warranty', `${product.specs.warrantyYears} years`]);
    }
  }
  if (product.sku) specRows.push(['SKU', product.sku]);

  return (
    <div id="pdp-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans space-y-10">
      <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500 flex-wrap">
        <NavLink view="home" className="hover:text-sky-700">Home</NavLink>
        <span aria-hidden="true">/</span>
        <NavLink view="shop" className="hover:text-sky-700">Shop</NavLink>
        {primaryCat && (<><span aria-hidden="true">/</span><NavLink view="shop-category" params={{ slug: primaryCat.slug }} className="hover:text-sky-700">{primaryCat.name}</NavLink></>)}
        <span aria-hidden="true">/</span>
        <span className="text-slate-800 font-semibold">{product.name}</span>
      </nav>

      <header className="space-y-2">
        <div className="flex items-center gap-2 flex-wrap">
          {brandPage ? (
            <NavLink view="shop-category" params={{ slug: brandPage.slug }} className="text-[10px] font-bold uppercase tracking-widest text-sky-800 bg-sky-50 px-2.5 py-1 rounded hover:bg-sky-100">
              {product.brand} outboards
            </NavLink>
          ) : (
            <span className="text-[10px] font-bold uppercase tracking-widest text-sky-800 bg-sky-50 px-2.5 py-1 rounded">{product.brand}</span>
          )}
          {product.badge && (
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-900 bg-amber-400 px-2.5 py-1 rounded">{product.badge}</span>
          )}
        </div>
        <h1 className="font-sans font-extrabold text-slate-900 text-2xl sm:text-3xl tracking-tight">{copy.h1}</h1>
        {avgRating && (
          <div className="flex gap-2.5 items-center text-xs text-slate-500">
            <div className="flex">
              {Array.from({ length: Math.round(parseFloat(avgRating)) }).map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
              ))}
            </div>
            <span>({reviews.length} reviews)</span>
          </div>
        )}
      </header>

      {/* Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-8">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm relative">
            <img
              src={product.imageUrl}
              alt={product.imageUrl.includes('/placeholders/') ? `${product.name} product image` : `${copy.h1} outboard motor`}
              width={1200}
              height={900}
              loading="eager"
              fetchPriority="high"
              className="w-full h-[350px] sm:h-[450px] object-contain bg-slate-50 rounded-xl border border-slate-100"
              referrerPolicy="no-referrer"
            />
          </div>

          {product.condition === 'used' && (
            <p className="text-[11px] text-slate-500 -mt-4">Photo shows the model. The actual engine may differ in appearance, so ask us for photos of the unit before you order.</p>
          )}

          <section aria-labelledby="about-heading" className="space-y-3">
            <h2 id="about-heading" className="font-sans font-extrabold text-slate-900 text-xl">About the {product.name}</h2>
            {copy.paragraphs.map((para, i) => (
              <p key={i} className="text-sm sm:text-base text-slate-700 leading-relaxed">{para}</p>
            ))}
          </section>

          {kind === 'petrol' && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-xs text-amber-900 space-y-2 leading-relaxed shadow-sm">
              <div className="flex items-center gap-1.5 font-bold uppercase tracking-wide">
                <ShieldAlert className="w-5 h-5 text-amber-600" />
                <span>Important: add oil before first use</span>
              </div>
              <p>
                For safe delivery this engine ships <strong>without engine oil</strong>. <strong>Do not start or run the engine until you have filled the crankcase</strong> with the manufacturer-approved four-stroke oil specified in the owner&apos;s manual.
              </p>
            </div>
          )}

          <section aria-labelledby="specs-heading" className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
            <h2 id="specs-heading" className="font-sans font-extrabold text-slate-900 text-lg border-b border-slate-100 pb-3">{kind === 'part' ? 'Product details' : 'Key specifications'}</h2>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 text-xs sm:text-sm font-sans">
              {specRows.map(([k, v]) => (
                <div key={k} className="flex justify-between py-1.5 border-b border-slate-100 gap-3">
                  <dt className="text-slate-500">{k}</dt>
                  <dd className="font-semibold text-slate-900 text-right">{v}</dd>
                </div>
              ))}
            </dl>
            {product.features.length > 0 && (
              <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">
                {product.features.map((f, i) => (<li key={i}>{f}</li>))}
              </ul>
            )}
            <p className="text-[11px] text-slate-500">Check the manufacturer data sheet for full technical data (dimensions, weight and fuel consumption). Contact us and we will confirm anything before you order.</p>
          </section>

          <section aria-labelledby="choose-heading" className="space-y-3">
            <h2 id="choose-heading" className="font-sans font-extrabold text-slate-900 text-xl">{copy.chooseHeading}</h2>
            <ul className="list-disc pl-5 text-sm sm:text-base text-slate-700 space-y-2 leading-relaxed">
              {copy.chooseBullets.map((b, i) => (<li key={i}>{b}</li>))}
            </ul>
            <p className="text-sm text-slate-600">
              Read our <NavLink view="blog-post" params={{ slug: copy.guideSlug }} className="text-sky-700 font-semibold underline">{copy.guideLabel}</NavLink>
              {primaryCat && <> or browse all <NavLink view="shop-category" params={{ slug: primaryCat.slug }} className="text-sky-700 font-semibold underline">{primaryCat.name}</NavLink></>}
              {brandPage && <>, or see every <NavLink view="shop-category" params={{ slug: brandPage.slug }} className="text-sky-700 font-semibold underline">{product.brand} outboard</NavLink> we stock</>}.
            </p>
          </section>

          <section aria-labelledby="included-heading" className="space-y-2">
            <h2 id="included-heading" className="font-sans font-extrabold text-slate-900 text-xl">What you get when you buy from Solent Marine UK</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-700">
              {copy.included.map((x, i) => (
                <li key={i} className="flex gap-2 items-start"><CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" /><span>{x}</span></li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="faq-heading" className="space-y-3">
            <h2 id="faq-heading" className="font-sans font-extrabold text-slate-900 text-xl">{product.name} FAQs</h2>
            <div className="space-y-3">
              {copy.faqs.map((f, i) => (
                <div key={i} className="bg-slate-50 rounded-xl p-4 border border-slate-200/60">
                  <h3 className="font-bold text-slate-900 text-sm mb-1">{f.q}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{f.a}</p>
                </div>
              ))}
            </div>
          </section>

          {reviews.length > 0 && (
            <section aria-labelledby="reviews-heading" className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm space-y-4">
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <h2 id="reviews-heading" className="font-sans font-extrabold text-slate-900 text-lg">Customer reviews</h2>
                {avgRating && (
                  <div className="flex items-center gap-1 bg-yellow-50 text-yellow-800 font-bold text-sm px-2.5 py-1 rounded-md border border-yellow-100">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                    <span>{avgRating} / 5.0</span>
                  </div>
                )}
              </div>
              <div className="space-y-4">
                {reviews.map((r) => (
                  <div key={r.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200/50 space-y-2 text-xs sm:text-sm">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-bold text-slate-900 block">{r.author}</span>
                        <span className="text-[10px] text-slate-500 font-mono mt-0.5">{r.date}</span>
                      </div>
                      <div className="flex gap-0.5">
                        {Array.from({ length: r.rating }).map((_, i) => (<Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />))}
                      </div>
                    </div>
                    <h3 className="font-bold text-slate-800 mt-1">{r.title}</h3>
                    <p className="text-slate-600 leading-normal">{r.comment}</p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Side: Buying Controls, Shaft Chooser, Compare Tray Integration */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-6">
          <div className="bg-white border border-slate-205 rounded-2xl p-6 shadow-sm space-y-6">
            <div className="py-4 border-y border-slate-100 flex justify-between items-baseline">
              <span className="text-xs uppercase font-bold tracking-widest text-slate-500">{product.condition === 'used' ? 'Used price:' : 'Retail Price (inc. VAT):'}</span>
              <div className="text-right">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">{gbp(product.priceGbp)}</span>
                <span className="block text-[10px] text-slate-400">{product.condition === 'used' ? 'Shipping calculated at basket' : 'Includes 20% UK VAT • Shipping Calculated at Basket'}</span>
              </div>
            </div>

            {/* Application fields */}
            <div className="space-y-1 text-xs">
              <span className="block font-bold text-slate-500 uppercase tracking-widest text-[10px]">Optimal Boat Applications:</span>
              <div className="flex flex-wrap gap-1.5">
                {product.applications.map((app, i) => (
                  <span key={i} className="bg-sky-50/70 text-sky-900 border border-sky-100 px-2.5 py-1 rounded-full font-semibold">
                    {app}
                  </span>
                ))}
              </div>
            </div>

            {/* Shaft Height selector */}
            <div className="space-y-2">
              <label htmlFor="shaft-selection" className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Select Shaft Depth Height</label>
              <select
                id="shaft-selection"
                value={selectedShaft}
                onChange={(e) => setSelectedShaft(e.target.value)}
                className="block w-full border border-slate-300 rounded-lg p-2 text-sm bg-white text-slate-900 focus:ring-sky-500"
              >
                {product.shaftLengths.map((s, i) => (
                  <option key={i} value={s}>{s}</option>
                ))}
              </select>
              <p className="text-[10px] text-slate-400 select-none leading-relaxed">
                * If unsure of transom measurements, check our <NavLink view="faq" className="underline">FAQ Sizing Guides</NavLink> first.
              </p>
            </div>

            {/* Quantity Chooser */}
            <div className="flex items-center justify-between gap-4 py-2 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest leading-none">Order Quantity</span>
              <div className="flex items-center border border-slate-300 rounded-md bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 text-slate-600 hover:text-slate-900 hover:bg-slate-55 bg-slate-100 text-sm font-bold"
                >
                  -
                </button>
                <div id="quantity-display" className="px-5 py-1 text-slate-900 font-bold text-sm min-w-[50px] text-center">
                  {quantity}
                </div>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1 text-slate-600 hover:text-slate-900 hover:bg-slate-55 bg-slate-100 text-sm font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Trigger actions */}
            <div className="space-y-2.5 pt-2 border-t border-slate-100">
              <button
                type="button"
                id="add-to-basket-pdp"
                onClick={handleBasketSub}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl py-3.5 text-sm font-bold transition shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Add configuration to shopping basket</span>
              </button>

              {addedNote && (
                <div id="added-basket-notification" className="text-center text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-250 rounded-lg p-2 animate-fade-in shadow-inner">
                  🎉 Added {quantity} unit(s) of {product.name} ({selectedShaft}) successfully.
                </div>
              )}

              <button
                type="button"
                id="add-compare-pdp"
                onClick={() => onAddToCompare(product)}
                disabled={compareList.some(c => c.id === product.id)}
                className="w-full bg-slate-100 border border-slate-200 hover:bg-slate-200 text-slate-800 rounded-xl py-3 text-xs font-semibold transition flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                <Scale className="w-4 h-4 text-sky-800" />
                <span>{compareList.some(c => c.id === product.id) ? 'Selected in specs comparison table' : 'Add to specifications comparison table'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="space-y-4">
          <h2 id="related-heading" className="font-sans font-extrabold text-slate-900 text-xl">Related {primaryCat ? primaryCat.name.toLowerCase() : 'products'}</h2>
          <ul className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {related.map((r) => (
              <li key={r.slug} className="bg-white border border-slate-200 rounded-xl p-3 hover:border-sky-300 transition">
                <NavLink view="product-details" params={{ slug: r.slug }} className="block space-y-2">
                  <img src={thumbUrl(r.imageUrl)} alt={r.name} width={480} height={360} loading="lazy" className="w-full h-28 object-contain bg-slate-50 rounded-lg" />
                  <span className="block text-xs font-bold text-slate-900 leading-snug">{r.name}</span>
                  <span className="block text-xs text-slate-600">{gbp(r.priceGbp)} inc. VAT</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
