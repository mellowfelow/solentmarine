/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface HeroSlide {
  webp: string;
  jpg: string;
  alt: string;
  caption: string;
  /** CSS object-position, e.g. "center bottom" — lets a tall/awkwardly-framed source photo
   *  stay anchored on its subject when the hero box crops it tighter than the pre-baked image. */
  focalPoint?: string;
}

interface HeroSliderProps {
  slides: HeroSlide[];
  intervalMs?: number;
}

/**
 * Full-bleed, auto-rotating hero image carousel ("slider revolution" style background layer).
 * Crossfades between real product/customer photography, pauses on hover/focus and whenever the
 * tab is hidden, and collapses to an instant, non-animated crossfade under prefers-reduced-motion
 * (no autoplay there either — the visitor drives it via the dots/arrows only).
 */
export default function HeroSlider({ slides, intervalMs = 6000 }: HeroSliderProps) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);

  useEffect(() => {
    if (paused || reducedMotion || slides.length <= 1) return;
    timerRef.current = setInterval(() => {
      setActive((i) => (i + 1) % slides.length);
    }, intervalMs);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [paused, reducedMotion, slides.length, intervalMs]);

  useEffect(() => {
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  const goTo = useCallback((i: number) => setActive(((i % slides.length) + slides.length) % slides.length), [slides.length]);
  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  return (
    <div
      id="hero-slider-revolution"
      role="region"
      aria-roledescription="carousel"
      aria-label="Solent Marine outboard motors in the field"
      className="absolute inset-0 z-0"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {slides.map((slide, i) => (
        <figure
          key={slide.webp}
          aria-hidden={i !== active}
          className={`absolute inset-0 m-0 transition-opacity ${reducedMotion ? 'duration-0' : 'duration-1000 ease-in-out'} ${i === active ? 'opacity-100' : 'opacity-0'}`}
        >
          <picture>
            <source srcSet={slide.webp} type="image/webp" />
            <img
              src={slide.jpg}
              alt={slide.alt}
              className="w-full h-full object-cover"
              style={slide.focalPoint ? { objectPosition: slide.focalPoint } : undefined}
              loading={i === 0 ? 'eager' : 'lazy'}
              fetchPriority={i === 0 ? 'high' : 'auto'}
              referrerPolicy="no-referrer"
            />
          </picture>
        </figure>
      ))}

      <div className="absolute inset-0 bg-gradient-to-r from-slate-955 via-slate-950/80 to-transparent" />

      {/* Per-slide caption chip — decorative context, not a duplicate heading */}
      <div className="absolute bottom-6 left-4 sm:left-6 lg:left-8 z-10 hidden sm:block" aria-live="off">
        <span className="bg-slate-950/70 backdrop-blur-sm border border-white/10 text-slate-200 text-xs font-semibold px-3 py-1.5 rounded-full">
          {slides[active].caption}
        </span>
      </div>

      {/* Prev / Next arrows */}
      {slides.length > 1 && (
        <>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous hero image"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-slate-950/50 hover:bg-slate-950/80 border border-white/10 text-white rounded-full p-2 transition cursor-pointer hidden md:flex"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next hero image"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-slate-950/50 hover:bg-slate-950/80 border border-white/10 text-white rounded-full p-2 transition cursor-pointer hidden md:flex"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-6 right-4 sm:right-6 lg:right-8 z-10 flex gap-2" role="tablist" aria-label="Hero slides">
            {slides.map((slide, i) => (
              <button
                key={slide.webp}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={`Show slide ${i + 1}: ${slide.caption}`}
                onClick={() => goTo(i)}
                className={`w-2.5 h-2.5 rounded-full transition cursor-pointer ${i === active ? 'bg-sky-400 w-6' : 'bg-white/40 hover:bg-white/70'}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
