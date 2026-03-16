"use client";

import { useState, useRef, useCallback, useEffect } from "react";

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
      "https://images.unsplash.com/photo-1588516903720-8ceb67f96d81?q=80&w=1000",
    after:
      "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?q=80&w=1000",
  },
  {
    id: 2,
    label: "Skin Glow",
    before:
      "https://images.unsplash.com/photo-1552058544-f2b08422138a?q=80&w=1000",
    after:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1000",
  },
  {
    id: 3,
    label: "Studio Look",
    before:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1000",
    after:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1000",
  },
  {
    id: 4,
    label: "Color Grade",
    before:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=1000",
    after:
      "https://images.unsplash.com/photo-1560717789-0ac7c58ac90a?q=80&w=1000",
  },
  {
    id: 5,
    label: "Full Edit",
    before:
      "https://images.unsplash.com/photo-1607008829749-c0f284a49fc4?q=80&w=1000",
    after:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=1000",
  },
];

const AUTO_INTERVAL = 3500;

/* ─── Progress Ring ──────────────────────────────────────── */
function ProgressRing({
  isPlaying,
  duration,
}: {
  isPlaying: boolean;
  duration: number;
}) {
  const r = 18;
  const circ = 2 * Math.PI * r;

  return (
    <>
      <style>{`
        @keyframes progressSpin {
          from { stroke-dashoffset: ${circ}; }
          to   { stroke-dashoffset: 0; }
        }
      `}</style>
      <svg
        width="44"
        height="44"
        viewBox="0 0 44 44"
        className="absolute inset-0 -rotate-90"
        aria-hidden="true"
      >
        <circle cx="22" cy="22" r={r} fill="none" stroke="#e5e7eb" strokeWidth="2.5" />
        <circle
          cx="22"
          cy="22"
          r={r}
          fill="none"
          stroke="#FFB800"
          strokeWidth="2.5"
          strokeDasharray={`${circ}`}
          strokeDashoffset={circ}
          strokeLinecap="round"
          style={
            isPlaying
              ? { animation: `progressSpin ${duration}ms linear forwards` }
              : { strokeDashoffset: circ }
          }
        />
      </svg>
    </>
  );
}

/* ─── Before/After Slider ────────────────────────────────── */
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
  const [isPaused, setIsPaused] = useState(false);
  // const [ringKey, setRingKey] = useState(0);

  // Separate refs to track both hover and touch activity
  const isHoveredRef = useRef(false);
  const isTouchActiveRef = useRef(false);

  // Touch tracking for swipe gesture
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const total = RESULTS.length;

  /* ── Pause helpers ── */
  const pause = useCallback(() => setIsPaused(true), []);
  const resume = useCallback(() => {
    // Only resume if neither hover nor touch is active
    if (!isHoveredRef.current && !isTouchActiveRef.current) {
      setIsPaused(false);
    }
  }, []);

  /* ── Navigation ── */
  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + total) % total);
    // setRingKey((k) => k + 1);
  }, [total]);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % total);
    // setRingKey((k) => k + 1);
  }, [total]);

  const goTo = useCallback((i: number) => {
    setCurrent(i);
    // setRingKey((k) => k + 1);
  }, []);

  /* ── Auto-play interval ── */
  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % total);
      // setRingKey((k) => k + 1);
    }, AUTO_INTERVAL);
    return () => clearInterval(id);
  }, [isPaused, total]);

  /* ── Mouse handlers ── */
  const onMouseEnter = useCallback(() => {
    isHoveredRef.current = true;
    pause();
  }, [pause]);

  const onMouseLeave = useCallback(() => {
    isHoveredRef.current = false;
    isTouchActiveRef.current = false; // safety reset
    resume();
  }, [resume]);

  /* ── Section-level touch handlers (pause/resume carousel) ── */
  const onSectionTouchStart = useCallback(
    (e: React.TouchEvent) => {
      isTouchActiveRef.current = true;
      // Record swipe start
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
      pause();
    },
    [pause]
  );

  const onSectionTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      isTouchActiveRef.current = false;

      // Swipe detection — only on the carousel track area
      if (touchStartX.current !== null && touchStartY.current !== null) {
        const dx = touchStartX.current - e.changedTouches[0].clientX;
        const dy = Math.abs(
          touchStartY.current - e.changedTouches[0].clientY
        );
        // Only trigger swipe if horizontal movement dominates
        if (Math.abs(dx) > 40 && Math.abs(dx) > dy) {
          dx > 0 ? next() : prev();
        }
      }
      touchStartX.current = null;
      touchStartY.current = null;

      // Resume after a short delay so the user can finish interacting
      setTimeout(() => {
        if (!isTouchActiveRef.current && !isHoveredRef.current) {
          setIsPaused(false);
        }
      }, 1200);
    },
    [next, prev]
  );

  const onSectionTouchCancel = useCallback(() => {
    isTouchActiveRef.current = false;
    touchStartX.current = null;
    touchStartY.current = null;
    setTimeout(() => {
      if (!isTouchActiveRef.current && !isHoveredRef.current) {
        setIsPaused(false);
      }
    }, 1200);
  }, []);

  const prevIdx = (current - 1 + total) % total;
  const nextIdx = (current + 1) % total;
  const isPlaying = !isPaused;

  return (
    <section
      className="bg-white py-16 sm:py-20 px-4 sm:px-6 overflow-hidden"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onTouchStart={onSectionTouchStart}
      onTouchEnd={onSectionTouchEnd}
      onTouchCancel={onSectionTouchCancel}
    >
      <div className="max-w-7xl mx-auto">

        {/* HEADING */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl font-serif text-gray-900">
            Real Transformations
          </h2>
          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Slide to compare · swipe or use arrows to browse
          </p>

          {/* Status pill */}
          {/* <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-xs text-gray-500 select-none transition-all duration-300">
            <span
              className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                isPlaying ? "bg-green-400 animate-pulse" : "bg-gray-400"
              }`}
            />
            {isPlaying ? "Auto-playing" : "Paused"}
          </div> */}
        </div>

        {/* ── CAROUSEL TRACK ── */}
        <div className="relative flex items-center justify-center gap-4">

          {/* LEFT GHOST — lg+ only */}
          <div
            className="hidden lg:block relative flex-shrink-0 w-[26%] aspect-[4/3] rounded-2xl overflow-hidden opacity-40 scale-[0.92] transition-all duration-500 cursor-pointer hover:opacity-55"
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

            {/* Label badge */}
            {RESULTS[current].label && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur text-gray-900 text-xs font-semibold px-4 py-1.5 rounded-full shadow-sm z-40 pointer-events-none tracking-wide whitespace-nowrap">
                {RESULTS[current].label}
              </div>
            )}
          </div>

          {/* RIGHT GHOST — lg+ only */}
          <div
            className="hidden lg:block relative flex-shrink-0 w-[26%] aspect-[4/3] rounded-2xl overflow-hidden opacity-40 scale-[0.92] transition-all duration-500 cursor-pointer hover:opacity-55"
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
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* DOTS */}
          <div className="flex items-center gap-2">
            {RESULTS.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
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
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* COUNTER + PROGRESS RING */}
        {/* <div className="flex items-center justify-center gap-3 mt-4">
          <div className="relative w-11 h-11 flex items-center justify-center">
            <ProgressRing
              key={`${ringKey}-${isPlaying}`}
              isPlaying={isPlaying}
              duration={AUTO_INTERVAL}
            />
            <div className="relative z-10 text-gray-500">
              {isPlaying ? (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                  <rect x="1" y="1" width="3.5" height="10" rx="1" />
                  <rect x="7.5" y="1" width="3.5" height="10" rx="1" />
                </svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                  <polygon points="2,1 11,6 2,11" />
                </svg>
              )}
            </div>
          </div>

          <p className="text-xs text-gray-400 tracking-widest">
            {current + 1} / {total}
          </p>
        </div> */}

      </div>
    </section>
  );
}
