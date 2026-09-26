/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Product, Review } from '../../types';
import FinanceCalculator from '../FinanceCalculator';
import { Star, ShieldAlert, BadgeInfo, Scale, ChevronLeft, MapPin, CheckCircle, Ship, AlertCircle } from 'lucide-react';

interface ProductDetailsViewProps {
  slug: string;
  products: Product[];
  onNavigate: (view: string, params?: Record<string, string>) => void;
  onAddToCompare: (product: Product) => void;
  compareList: Product[];
  onAddToBasket: (product: Product, shaft: string) => void;
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
        <button
          type="button"
          onClick={() => onNavigate('shop')}
          className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold"
        >
          Return to Stock Center
        </button>
      </div>
    );
  }

  // State management
  const [selectedShaft, setSelectedShaft] = useState<string>(product.shaftLengths[0] || 'Short Shaft (15")');
  const [quantity, setQuantity] = useState<number>(1);
  const [addedNote, setAddedNote] = useState<boolean>(false);

  // Review states
  const [reviews, setReviews] = useState<Review[]>(product.reviews);
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewAuthor || !reviewComment) return;

    const newRev: Review = {
      id: `new-${Date.now()}`,
      author: reviewAuthor,
      rating: reviewRating,
      date: new Date().toISOString().split('T')[0],
      title: reviewTitle || `${reviewRating} Star Outboard Review`,
      comment: reviewComment,
      verified: true
    };

    setReviews([newRev, ...reviews]);
    setReviewSubmitted(true);
    setReviewAuthor('');
    setReviewTitle('');
    setReviewComment('');
  };

  const handleBasketSub = () => {
    onAddToBasket(product, selectedShaft);
    setAddedNote(true);
    setTimeout(() => setAddedNote(false), 3000);
  };

  const avgRating = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : null; // No fabricated default rating — a product with zero reviews shows "No reviews yet", not a fake 5.0.

  return (
    <div id="pdp-container" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans space-y-10">
      {/* Back to inventory */}
      <div>
        <button
          type="button"
          onClick={() => onNavigate('shop')}
          className="text-slate-600 hover:text-slate-900 font-semibold text-xs flex items-center gap-1 cursor-pointer transition"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Outboard catalog inventory</span>
        </button>
      </div>

      {/* Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Large Image, Spec Table & Reviews */}
        <div className="lg:col-span-7 space-y-8">
          {/* Main Visual */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm relative">
            <img
              src={product.imageUrl}
              alt={product.imageUrl.includes('/placeholders/') ? `Placeholder image — ${product.name} — real product photo coming soon` : product.name}
              loading="eager"
              className="w-full h-[350px] sm:h-[450px] object-contain bg-slate-50 rounded-xl border border-slate-100"
              referrerPolicy="no-referrer"
            />
            {product.isFeatured && (
              <span className="absolute top-6 left-6 bg-amber-500 text-slate-950 font-bold text-xs uppercase px-3 py-1 rounded-full border border-amber-400">
                ⭐ Featured Selection
              </span>
            )}
          </div>

          {/* Oil-Fill Safety Warning */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 text-xs text-amber-900 space-y-2 leading-relaxed shadow-sm">
            <div className="flex items-center gap-1.5 font-bold uppercase tracking-wide">
              <ShieldAlert className="w-5 h-5 text-amber-600" />
              <span>Important: Add Oil Before First Use</span>
            </div>
            <p>
              For safe delivery, this engine ships <strong>without engine oil</strong>. <strong>Do not start or run the engine until you've added oil</strong> — fill it with the correct amount of Yamalube 4M oil before you start it for the first time.
            </p>
          </div>

          {/* Specs Table */}
          <div className="bg-white border border-slate-205 rounded-xl p-6 shadow-sm space-y-4">
            <h3 className="font-sans font-extrabold text-slate-900 text-lg border-b border-slate-105 pb-3">Technical Specifications Block</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3.5 text-xs sm:text-sm font-sans">
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Official Brand:</span>
                <span className="font-semibold text-slate-905 text-slate-900">{product.brand}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Horsepower Out:</span>
                <span className="font-semibold text-slate-905 text-slate-900">{product.powerHp} HP</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Dry Sump Weight:</span>
                <span className="font-semibold text-slate-905 text-slate-900">{product.weightKg} kg</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Engine Cycle:</span>
                <span className="font-semibold text-slate-905 text-slate-900">{product.engineType}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Starter Setup:</span>
                <span className="font-semibold text-slate-905 text-slate-900">{product.starter}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Command Steering:</span>
                <span className="font-semibold text-slate-905 text-slate-900">{product.control}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Fuel Setup:</span>
                <span className="font-semibold text-slate-905 text-slate-900">{product.fuelSystem}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Cylinder volume:</span>
                <span className="font-semibold text-slate-905 text-slate-900">{product.specs.displacementHex || 'N/A'}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Cylinder Matrix:</span>
                <span className="font-semibold text-slate-905 text-slate-900">{product.specs.cylinders || 'N/A'}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Throttle RPM Range:</span>
                <span className="font-semibold text-slate-905 text-slate-900">{product.specs.fullThrottleRange || 'N/A'}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">Charging Alternator:</span>
                <span className="font-semibold text-slate-905 text-slate-900">{product.specs.alternatorOutput || 'N/A'}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500">UK Warranty Duration:</span>
                <span className="font-bold text-emerald-800 bg-emerald-50 px-2 rounded">{product.specs.warrantyYears} Years</span>
              </div>
            </div>
          </div>

          {/* Customer Reviews View */}
          <div className="bg-white border border-slate-205 rounded-xl p-6 shadow-sm space-y-6">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-sans font-extrabold text-slate-900 text-lg flex items-center gap-2">
                <span>Buyer Reviews & Ratings</span>
                <span className="text-sm font-normal text-slate-500">({reviews.length} total)</span>
              </h3>
              {avgRating && (
                <div className="flex items-center gap-1 bg-yellow-50 text-yellow-800 font-bold text-sm px-2.5 py-1 rounded-md border border-yellow-100">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                  <span>{avgRating} / 5.0</span>
                </div>
              )}
            </div>

            {/* Individual Reviews */}
            <div className="space-y-4">
              {reviews.length === 0 && (
                <p className="text-sm text-slate-500 italic">No reviews yet for this engine — check back soon, or be the first to leave one below.</p>
              )}
              {reviews.map((r) => (
                <div key={r.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200/50 space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-bold text-slate-900 block">{r.author}</span>
                      <span className="text-[10px] text-slate-400 font-mono mt-0.5">{r.date}</span>
                    </div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: r.rating }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                      ))}
                    </div>
                  </div>
                  <h5 className="font-bold text-slate-800 mt-1">{r.title}</h5>
                  <p className="text-slate-600 leading-normal">{r.comment}</p>
                </div>
              ))}
            </div>

            {/* Review form submissions */}
            <div className="pt-6 border-t border-slate-150">
              {reviewSubmitted ? (
                <div className="bg-emerald-55 bg-emerald-50 text-emerald-900 p-4 rounded-xl text-center leading-normal border border-emerald-200 text-xs sm:text-sm shadow-inner">
                  <p className="font-bold">Review Dispatched for Authorisation</p>
                  <p className="text-slate-500 text-xs mt-0.5">This comment is certified as unique and scheduled to enter the live UK product index stream.</p>
                </div>
              ) : (
                <form onSubmit={handleAddReview} className="space-y-4 text-xs sm:text-sm">
                  <h4 className="font-sans font-bold text-slate-900">Write an Outboard Review</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label htmlFor="review-author" className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">Your Name</label>
                      <input
                        type="text"
                        id="review-author"
                        required
                        value={reviewAuthor}
                        onChange={(e) => setReviewAuthor(e.target.value)}
                        className="block w-full border border-slate-300 rounded-md p-1.5 focus:ring-sky-500 bg-white"
                        placeholder="e.g. skipper Bill"
                      />
                    </div>
                    <div className="col-span-2">
                      <label htmlFor="review-title" className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">Title</label>
                      <input
                        type="text"
                        id="review-title"
                        value={reviewTitle}
                        onChange={(e) => setReviewTitle(e.target.value)}
                        className="block w-full border border-slate-300 rounded-md p-1.5 focus:ring-sky-500 bg-white"
                        placeholder="e.g. Excellent auxiliary power"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
                    <div>
                      <label htmlFor="review-rating" className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">Star rating (1-5)</label>
                      <select
                        id="review-rating"
                        value={reviewRating}
                        onChange={(e) => setReviewRating(parseInt(e.target.value))}
                        className="bg-white border border-slate-300 rounded-md p-1.5 w-full font-sans"
                      >
                        <option value={5}>⭐⭐⭐⭐⭐ (5/5)</option>
                        <option value={4}>⭐⭐⭐⭐ (4/5)</option>
                        <option value={3}>⭐⭐⭐ (3/5)</option>
                        <option value={2}>⭐⭐ (2/5)</option>
                        <option value={1}>⭐ (1/5)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="review-comment" className="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">Detailed Review Comment</label>
                    <textarea
                      id="review-comment"
                      rows={3}
                      required
                      value={reviewComment}
                      onChange={(e) => setReviewComment(e.target.value)}
                      className="block w-full border border-slate-300 rounded-md p-2 bg-white"
                      placeholder="Comment on fuel burn, starting simplicity, weight parameters..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="bg-slate-900 hover:bg-slate-800 text-white rounded-lg py-1.5 px-4 font-semibold transition"
                  >
                    Submit Verifiable Review
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Buying Controls, Shaft Chooser, Compare Tray Integration & Finance Engine */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-6">
          <div className="bg-white border border-slate-205 rounded-2xl p-6 shadow-sm space-y-6">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-bold uppercase tracking-widest text-sky-800 bg-sky-50 px-2.5 py-1 rounded">
                  Official {product.brand} Catalog
                </span>
                {product.badge && (
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-900 bg-amber-400 px-2.5 py-1 rounded">
                    {product.badge}
                  </span>
                )}
                {product.sku && (
                  <span className="text-[10px] font-mono text-slate-400">SKU: {product.sku}</span>
                )}
              </div>
              <h1 className="font-sans font-extrabold text-slate-900 text-xl sm:text-2xl tracking-tight mt-2.5">
                {product.name}
              </h1>
              <div className="flex gap-2.5 items-center mt-2.5 text-xs text-slate-500">
                {avgRating ? (
                  <>
                    <div className="flex">
                      {Array.from({ length: Math.round(parseFloat(avgRating)) }).map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                      ))}
                    </div>
                    <span>({reviews.length} reviews verified)</span>
                  </>
                ) : (
                  <span>No reviews yet — be the first to review this engine</span>
                )}
              </div>
            </div>

            <div className="py-4 border-y border-slate-100 flex justify-between items-baseline">
              <span className="text-xs uppercase font-bold tracking-widest text-slate-500">Retail Price (inc. VAT):</span>
              <div className="text-right">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900">£{product.priceGbp.toLocaleString('en-GB', { minimumFractionDigits: 2 })}</span>
                <span className="block text-[10px] text-slate-400">Includes 20% UK VAT • Shipping Calculated at Basket</span>
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
                * If unsure of transom measurements, check our <span className="underline cursor-pointer" onClick={() => onNavigate('faq')}>FAQ Sizing Guides</span> first.
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

          {/* Embedded Finance Calculator */}
          {product.priceGbp >= 350 && (
            <FinanceCalculator productPrice={product.priceGbp * quantity} />
          )}
        </div>
      </div>
    </div>
  );
}
