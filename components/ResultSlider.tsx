"use client";

import { useState, useRef, useCallback } from "react";

type ResultItem = {
  id: number;
  before: string;
  after: string;
  label?: string;
};

const RESULTS: ResultItem[] = [
  {
    id: 1,
    label: "Portrait Retouch",
    before:
      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/photoshop-face-before.jpg",
    after:
      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/4273/photoshop-face-after.jpg",
  },
  {
    id: 2,
    label: "Skin Glow",
    before:
      "https://images.unsplash.com/photo-1596755389378-c31d21fd52b3?q=80&w=1000",
    after:
      "https://images.unsplash.com/photo-1596755389378-c31d21fd52b3?q=80&w=1000",
  },
  {
    id: 3,
    label: "Studio Look",
    before:
      "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=1000",
    after:
      "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=1000",
  },
  {
    id: 4,
    label: "Color Grade",
    before:
      "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=1000",
    after:
      "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=1000",
  },
  {
    id: 5,
    label: "Full Edit",
    before:
      "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=1000",
    after:
      "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=1000",
  },
];

/* ─── Slider ─────────────────────────────────────────────── */
type SliderProps = { before: string; after: string };

function Slider({ before, after }: SliderProps) {
  const [sliderPos, setSliderPos] = useState<number>(50);

  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl bg-gray-200 select-none">
      {/* BEFORE */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${before})` }}
      >
        <span className="absolute bottom-4 right-4 bg-black/50 text-white text-xs px-3 py-1 rounded-full tracking-widest uppercase">
          Before
        </span>
      </div>

      {/* AFTER */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${after})`,
          width: `${sliderPos}%`,
          borderRight: "2px solid white",
        }}
      >
        <span className="absolute bottom-4 right-4 bg-[#FFB800] text-black text-xs px-3 py-1 rounded-full font-bold tracking-widest uppercase">
          After
        </span>
      </div>

      {/* RANGE INPUT */}
      <input
        type="range"
        min="0"
        max="100"
        value={sliderPos}
        onChange={(e) => setSliderPos(Number(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
      />

      {/* HANDLE */}
      <div
        className="absolute top-0 bottom-0 z-20 pointer-events-none"
        style={{ left: `${sliderPos}%` }}
      >
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-white rounded-full shadow-lg border-2 border-[#FFB800] flex items-center justify-center">
          <div className="flex gap-1">
            <div className="w-1 h-3 bg-gray-400 rounded-full" />
            <div className="w-1 h-3 bg-gray-400 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Carousel ───────────────────────────────────────────── */
export default function ResultSlider() {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const total = RESULTS.length;

  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + total) % total),
    [total]
  );
  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);

  /* touch/swipe */
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
    touchStartX.current = null;
  };

  /* visible ghost indices */
  const prevIdx = (current - 1 + total) % total;
  const nextIdx = (current + 1) % total;

  return (
    <section className="bg-white py-16 sm:py-20 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* HEADING */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl font-serif text-gray-900">
            Real Transformations
          </h2>
          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Slide to compare · swipe or use arrows to browse
          </p>
        </div>

        {/* ── CAROUSEL TRACK ── */}
        <div
          className="relative flex items-center justify-center gap-4"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >

          {/* LEFT GHOST — visible on lg+ */}
          <div
            className="hidden lg:block relative flex-shrink-0 w-[26%] aspect-[4/3] rounded-2xl overflow-hidden opacity-40 scale-[0.92] transition-all duration-500 cursor-pointer hover:opacity-50"
            onClick={prev}
            aria-label="Previous slide"
          >
            <Slider
              before={RESULTS[prevIdx].before}
              after={RESULTS[prevIdx].after}
            />
          </div>

          {/* CENTER — active card */}
          <div className="relative z-10 w-full sm:w-[85%] lg:w-[44%] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl transition-all duration-500 flex-shrink-0">
            <Slider
              before={RESULTS[current].before}
              after={RESULTS[current].after}
            />

            {/* label badge */}
            {RESULTS[current].label && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur text-gray-900 text-xs font-semibold px-4 py-1.5 rounded-full shadow-sm z-40 pointer-events-none tracking-wide whitespace-nowrap">
                {RESULTS[current].label}
              </div>
            )}
          </div>

          {/* RIGHT GHOST — visible on lg+ */}
          <div
            className="hidden lg:block relative flex-shrink-0 w-[26%] aspect-[4/3] rounded-2xl overflow-hidden opacity-40 scale-[0.92] transition-all duration-500 cursor-pointer hover:opacity-50"
            onClick={next}
            aria-label="Next slide"
          >
            <Slider
              before={RESULTS[nextIdx].before}
              after={RESULTS[nextIdx].after}
            />
          </div>
        </div>

        {/* ── CONTROLS ── */}
        <div className="mt-8 flex items-center justify-center gap-5">

          {/* PREV BUTTON */}
          <button
            onClick={prev}
            aria-label="Previous"
            className="w-11 h-11 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-600 hover:border-[#FFB800] hover:text-[#FFB800] transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* DOTS */}
          <div className="flex items-center gap-2">
            {RESULTS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-6 h-2.5 bg-[#FFB800]"
                    : "w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>

          {/* NEXT BUTTON */}
          <button
            onClick={next}
            aria-label="Next"
            className="w-11 h-11 rounded-full border-2 border-gray-200 flex items-center justify-center text-gray-600 hover:border-[#FFB800] hover:text-[#FFB800] transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* COUNTER */}
        <p className="text-center text-xs text-gray-400 mt-3 tracking-widest">
          {current + 1} / {total}
        </p>

      </div>
    </section>
  );
}
