import React, { useState, useEffect, useRef } from 'react';
import { 
  Star, 
  CheckCircle2, 
  ShieldCheck, 
  ChevronLeft, 
  ChevronRight, 
  Pause, 
  Play, 
  ThumbsUp, 
  MessageSquare, 
  MapPin, 
  Package, 
  Truck, 
  Globe2, 
  HelpCircle, 
  SlidersHorizontal,
  ExternalLink,
  Award,
  Sparkles,
  Info,
  CornerDownRight
} from 'lucide-react';
import { Review } from '../types';
import { TRUSTPILOT_STATS, FEATURED_REVIEWS } from '../data/reviewsData';

interface ReviewsShowcaseProps {
  onNavigateProduct?: (slug: string) => void;
  onNavigate?: (view: string, data?: any) => void;
}

export function ReviewsShowcase({ onNavigateProduct, onNavigate }: ReviewsShowcaseProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStarFilter, setSelectedStarFilter] = useState<number | 'all'>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [viewMode, setViewMode] = useState<'slider' | 'grid'>('slider');
  const [helpfulVotes, setHelpfulVotes] = useState<Record<string, number>>({});
  const [userVoted, setUserVoted] = useState<Record<string, boolean>>({});
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackSuccess, setFeedbackSuccess] = useState(false);

  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  // Filter reviews
  const filteredReviews = FEATURED_REVIEWS.filter((rev) => {
    const matchesCategory = selectedCategory === 'all' || rev.category === selectedCategory;
    const matchesRating = selectedStarFilter === 'all' || rev.rating === selectedStarFilter;
    return matchesCategory && matchesRating;
  });

  const displayReviews = filteredReviews.length > 0 ? filteredReviews : FEATURED_REVIEWS;

  // Slider navigation logic
  const itemsPerView = {
    mobile: 1,
    tablet: 2,
    desktop: 3,
  };

  const maxIndex = Math.max(0, displayReviews.length - 1);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  useEffect(() => {
    if (isAutoPlaying && viewMode === 'slider') {
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, 5000);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlaying, maxIndex, viewMode, currentIndex]);

  const handleHelpfulClick = (id: string, initialCount: number = 0) => {
    if (userVoted[id]) return;
    setUserVoted((prev) => ({ ...prev, [id]: true }));
    setHelpfulVotes((prev) => ({
      ...prev,
      [id]: (prev[id] ?? initialCount) + 1,
    }));
  };

  // Renders Trustpilot solid green rating stars
  const renderTrustStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1" aria-label={`${rating} out of 5 stars`}>
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = star <= rating;
          return (
            <div
              key={star}
              className={`w-6 h-6 flex items-center justify-center rounded transition ${
                isFilled ? 'bg-[#00b67a] text-white shadow-xs' : 'bg-slate-200 text-slate-400'
              }`}
            >
              <Star className="w-4 h-4 fill-current stroke-none" />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <section id="trustpilot-reviews-section" className="bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 border-y border-slate-800 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-10 relative z-10">
        
        {/* Section Header with Trustpilot Style Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-8 border-b border-slate-800/80">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-950/80 text-emerald-400 border border-emerald-800/60">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified Independent Customer Feedback
              </span>
              <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                • 3,600+ UK & European Outboard Deliveries
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white flex items-center gap-3">
              Customer Reviews & Trust Score
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
              Real marine operator experiences covering timber pallet delivery, European customs transit, post-purchase PDI inspection, and technical shaft-length advice.
            </p>
          </div>

          {/* Trustpilot-Style Summary Card */}
          <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col sm:flex-row items-center gap-6 w-full lg:w-auto shrink-0">
            <div className="flex items-center gap-4">
              <div className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                  <span className="text-3xl sm:text-4xl font-black text-white tracking-tight">4.7</span>
                  <div className="text-left leading-none">
                    <span className="text-xs text-emerald-400 font-bold uppercase tracking-wider block">Excellent</span>
                    <span className="text-[10px] text-slate-400">out of 5.0</span>
                  </div>
                </div>
                {renderTrustStars(5)}
              </div>
            </div>

            <div className="h-10 w-px bg-slate-800 hidden sm:block" />

            <div className="text-xs text-slate-400 space-y-1 text-center sm:text-left">
              <div className="flex items-center gap-1.5 text-slate-300 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[#00b67a]" />
                <span>3,642 Verified Reviews</span>
              </div>
              <p className="text-[11px] text-slate-400">
                97.2% Positive sentiment rating
              </p>
              <div className="text-[10px] text-slate-400 flex items-center justify-center sm:justify-start gap-1">
                <span>104 historical low ratings resolved</span>
                <span title="Past misunderstandings and freight carrier delays resolved with 100% merchant follow-up." className="cursor-help text-sky-400 underline">info</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowFeedbackModal(true)}
              className="w-full sm:w-auto px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2 shrink-0"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Leave a Review</span>
            </button>
          </div>
        </div>

        {/* Rating Breakdown & Category Filter Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Rating Breakdown Bar Chart */}
          <div className="lg:col-span-5 bg-slate-950/60 border border-slate-800/80 rounded-2xl p-4 space-y-2.5">
            <div className="flex justify-between items-center text-xs font-semibold text-slate-300 pb-1 border-b border-slate-850">
              <span>Rating Breakdown ({TRUSTPILOT_STATS.totalReviews.toLocaleString()})</span>
              {selectedStarFilter !== 'all' && (
                <button
                  type="button"
                  onClick={() => setSelectedStarFilter('all')}
                  className="text-[11px] text-sky-400 hover:underline font-normal"
                >
                  Clear filter ({selectedStarFilter}★)
                </button>
              )}
            </div>

            {[
              { stars: 5, count: TRUSTPILOT_STATS.ratingBreakdown.stars5, percent: 83 },
              { stars: 4, count: TRUSTPILOT_STATS.ratingBreakdown.stars4, percent: 11 },
              { stars: 3, count: TRUSTPILOT_STATS.ratingBreakdown.stars3, percent: 3 },
              { stars: 2, count: TRUSTPILOT_STATS.ratingBreakdown.stars2, percent: 1.6 },
              { stars: 1, count: TRUSTPILOT_STATS.ratingBreakdown.stars1, percent: 1.3 },
            ].map((row) => (
              <button
                key={row.stars}
                type="button"
                onClick={() => setSelectedStarFilter(selectedStarFilter === row.stars ? 'all' : row.stars)}
                className={`w-full flex items-center gap-3 text-xs text-left group p-1 rounded transition ${
                  selectedStarFilter === row.stars ? 'bg-slate-800/90 text-white' : 'hover:bg-slate-900 text-slate-400'
                }`}
              >
                <span className="w-12 text-slate-300 font-medium group-hover:text-white shrink-0">
                  {row.stars} star{row.stars > 1 ? 's' : ''}
                </span>
                <div className="flex-1 h-2.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      row.stars >= 4 ? 'bg-[#00b67a]' : row.stars === 3 ? 'bg-amber-400' : 'bg-rose-500'
                    }`}
                    style={{ width: `${row.percent}%` }}
                  />
                </div>
                <span className="w-12 text-right font-mono text-[11px] text-slate-400 group-hover:text-slate-200 shrink-0">
                  {row.percent}%
                </span>
              </button>
            ))}

            <div className="pt-2 text-[10px] text-slate-400 border-t border-slate-850 flex items-center justify-between">
              <span>Below standard ratings (104 total)</span>
              <span className="text-slate-400">100% merchant response rate</span>
            </div>
          </div>

          {/* Interactive Category Tabs & Slider Controls */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap gap-2">
              {TRUSTPILOT_STATS.categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  id={`review-cat-${cat.id}`}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setCurrentIndex(0);
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition flex items-center gap-1.5 ${
                    selectedCategory === cat.id
                      ? 'bg-sky-600 text-white border-sky-500 shadow-md shadow-sky-950'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                    selectedCategory === cat.id ? 'bg-sky-700 text-white' : 'bg-slate-900 text-slate-400'
                  }`}>
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Slider Revolution Header Controls */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-850">
              <div className="flex items-center gap-2">
                <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
                  <button
                    type="button"
                    onClick={() => setViewMode('slider')}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                      viewMode === 'slider' ? 'bg-slate-800 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Slider Revolution
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('grid')}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
                      viewMode === 'grid' ? 'bg-slate-800 text-white font-bold' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    All Grid ({displayReviews.length})
                  </button>
                </div>

                {viewMode === 'slider' && (
                  <button
                    type="button"
                    onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                    className="p-1.5 text-slate-400 hover:text-white bg-slate-950 border border-slate-800 rounded-lg text-xs flex items-center gap-1 transition"
                    title={isAutoPlaying ? 'Pause autoplay' : 'Start autoplay'}
                  >
                    {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    <span className="text-[10px] hidden sm:inline">{isAutoPlaying ? 'Auto' : 'Paused'}</span>
                  </button>
                )}
              </div>

              {/* Slider Prev / Next Buttons */}
              {viewMode === 'slider' && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={prevSlide}
                    aria-label="Previous review slide"
                    className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition active:scale-95"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-xs text-slate-400 font-mono">
                    {currentIndex + 1} / {displayReviews.length}
                  </span>
                  <button
                    type="button"
                    onClick={nextSlide}
                    aria-label="Next review slide"
                    className="w-9 h-9 flex items-center justify-center rounded-xl bg-slate-950 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition active:scale-95"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* REVIEWS SLIDER DISPLAY */}
        {viewMode === 'slider' ? (
          <div className="relative">
            {/* AutoPlay Progress Bar */}
            {isAutoPlaying && (
              <div className="w-full h-0.5 bg-slate-850 rounded-full mb-6 overflow-hidden">
                <div className="h-full bg-emerald-500 animate-[pulse_5s_ease-in-out_infinite]" />
              </div>
            )}

            {/* Slider Track with 3 visible cards on desktop, 2 on tablet, 1 on mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[0, 1, 2].map((offset) => {
                const itemIndex = (currentIndex + offset) % displayReviews.length;
                const review = displayReviews[itemIndex];
                if (!review) return null;

                const isTopPositive = review.rating >= 4;
                const isResolvedIssue = review.rating <= 3;
                const currentHelpful = helpfulVotes[review.id] ?? (review.helpfulCount || 12);
                const hasVoted = userVoted[review.id];

                return (
                  <div
                    key={`${review.id}-${offset}`}
                    className={`bg-slate-950/95 border rounded-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:border-slate-700 ${
                      isResolvedIssue
                        ? 'border-amber-900/60 shadow-amber-950/20'
                        : 'border-slate-800 shadow-slate-950/50'
                    }`}
                  >
                    <div className="space-y-4">
                      {/* Top bar: Stars + Verified Badge + Date */}
                      <div className="flex items-center justify-between gap-2">
                        {renderTrustStars(review.rating)}
                        <span className="text-[11px] text-slate-400 font-mono">{review.date}</span>
                      </div>

                      {/* Title & Verified Buyer Status */}
                      <div>
                        <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium mb-1">
                          <CheckCircle2 className="w-3.5 h-3.5 fill-emerald-500/20 text-emerald-400" />
                          <span>Verified Marine Buyer</span>
                          {review.location && (
                            <span className="text-slate-400 text-[11px] flex items-center gap-0.5 ml-auto">
                              <MapPin className="w-3 h-3 text-slate-400" />
                              {review.location}
                            </span>
                          )}
                        </div>
                        <h4 className="font-bold text-white text-base leading-snug tracking-tight">
                          "{review.title}"
                        </h4>
                      </div>

                      {/* Review Body */}
                      <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                        {review.comment}
                      </p>

                      {/* Purchased Motor Tag */}
                      {review.purchasedItem && (
                        <div className="p-2 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] flex items-center gap-2">
                          <Package className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                          <span className="text-slate-400">Purchased:</span>
                          <span className="font-semibold text-slate-200 truncate">{review.purchasedItem}</span>
                        </div>
                      )}

                      {/* Official Merchant Response Box (Transparent customer service resolution) */}
                      {review.merchantReply && (
                        <div className="p-3 bg-amber-950/30 border border-amber-800/40 rounded-xl space-y-1.5 text-xs">
                          <div className="flex items-center gap-1.5 text-amber-400 font-bold text-[11px]">
                            <CornerDownRight className="w-3.5 h-3.5" />
                            <span>Response from {review.merchantReply.author}</span>
                            <span className="text-slate-400 text-[10px] ml-auto font-normal">{review.merchantReply.date}</span>
                          </div>
                          <p className="text-amber-100/80 text-[11px] leading-relaxed">
                            {review.merchantReply.message}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Footer: Author & Helpful Counter */}
                    <div className="pt-4 mt-4 border-t border-slate-850 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-slate-200 block">{review.author}</span>
                        <span className="text-[10px] text-slate-400 capitalize">
                          Topic: {review.category || 'General Outboard'}
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleHelpfulClick(review.id, review.helpfulCount)}
                        disabled={hasVoted}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs transition ${
                          hasVoted
                            ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                            : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
                        }`}
                      >
                        <ThumbsUp className="w-3 h-3" />
                        <span>Helpful ({currentHelpful})</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Slider Dots Pagination */}
            <div className="flex items-center justify-center gap-2 mt-8">
              {displayReviews.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to review slide ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentIndex === idx ? 'w-8 bg-[#00b67a]' : 'w-2 bg-slate-800 hover:bg-slate-700'
                  }`}
                />
              ))}
            </div>
          </div>
        ) : (
          /* FULL GRID VIEW */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {displayReviews.map((review) => {
              const isResolvedIssue = review.rating <= 3;
              const currentHelpful = helpfulVotes[review.id] ?? (review.helpfulCount || 12);
              const hasVoted = userVoted[review.id];

              return (
                <div
                  key={review.id}
                  className={`bg-slate-950 border rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition ${
                    isResolvedIssue ? 'border-amber-900/60' : 'border-slate-800'
                  }`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between gap-2">
                      {renderTrustStars(review.rating)}
                      <span className="text-[11px] text-slate-400 font-mono">{review.date}</span>
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium mb-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Verified Buyer</span>
                        {review.location && (
                          <span className="text-slate-400 text-[11px] flex items-center gap-0.5 ml-auto">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            {review.location}
                          </span>
                        )}
                      </div>
                      <h4 className="font-bold text-white text-base leading-snug">
                        "{review.title}"
                      </h4>
                    </div>

                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                      {review.comment}
                    </p>

                    {review.purchasedItem && (
                      <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-[11px] flex items-center gap-2">
                        <Package className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                        <span className="text-slate-400">Purchased:</span>
                        <span className="font-semibold text-slate-200 truncate">{review.purchasedItem}</span>
                      </div>
                    )}

                    {review.merchantReply && (
                      <div className="p-3 bg-amber-950/30 border border-amber-800/40 rounded-xl space-y-1 text-xs">
                        <div className="flex items-center gap-1 text-amber-400 font-bold text-[11px]">
                          <CornerDownRight className="w-3.5 h-3.5" />
                          <span>Response from {review.merchantReply.author}</span>
                        </div>
                        <p className="text-amber-100/80 text-[11px] leading-relaxed">
                          {review.merchantReply.message}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-850 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-slate-200 block">{review.author}</span>
                      <span className="text-[10px] text-slate-400 capitalize">
                        {review.category || 'General Outboard'}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleHelpfulClick(review.id, review.helpfulCount)}
                      disabled={hasVoted}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs transition ${
                        hasVoted
                          ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                          : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                      }`}
                    >
                      <ThumbsUp className="w-3 h-3" />
                      <span>Helpful ({currentHelpful})</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Trust Badges Banner at Bottom */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-[#00b67a] shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-white text-xs">100% Genuine Reviews</p>
              <p className="text-[11px] text-slate-400">Authenticated serial number verification</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-white text-xs">UK Crated Freight</p>
              <p className="text-[11px] text-slate-400">Zero in-transit damage guarantee</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0">
              <Globe2 className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-white text-xs">European Customs Handled</p>
              <p className="text-[11px] text-slate-400">Direct zero-VAT export shipping</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-white text-xs">5-7 Year UK Warranties</p>
              <p className="text-[11px] text-slate-400">Official dealer stamped PDI records</p>
            </div>
          </div>
        </div>
      </div>

      {/* Leave a Review Modal */}
      {showFeedbackModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-white shadow-2xl relative animate-scale-in">
            <button
              type="button"
              onClick={() => setShowFeedbackModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-xl p-2"
            >
              ✕
            </button>

            {feedbackSuccess ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-[#00b67a]/20 text-[#00b67a] rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold">Review Submitted Successfully!</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Thank you for contributing to our verified customer community. Your review will be authenticated against our engine serial registry.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setShowFeedbackModal(false);
                    setFeedbackSuccess(false);
                  }}
                  className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setFeedbackSuccess(true);
                }}
                className="space-y-4"
              >
                <div className="space-y-1">
                  <h3 className="text-xl font-bold">Share Your Outboard Experience</h3>
                  <p className="text-xs text-slate-400">
                    Help fellow mariners in the UK and Europe with your honest delivery & engine review.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Your Overall Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        className="p-2 rounded bg-slate-800 hover:bg-[#00b67a] text-white transition"
                      >
                        <Star className="w-5 h-5 fill-current" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Capt. James Miller"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-400 mb-1">Harbour / Location</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Lymington, Hampshire"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">Outboard Model / Serial</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Yamaha F25 GETL or Invoice Reference"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">Review Headline</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Fast freight crate delivery & smooth sea trial"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-400 mb-1">Detailed Feedback</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Describe delivery packaging, customer support, shaft recommendation, noise level, fuel economy..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowFeedbackModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#00b67a] hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition shadow-lg"
                  >
                    Publish Verified Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
