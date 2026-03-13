"use client";

import { useState, useEffect } from "react";

// ─── Slide Data ────────────────────────────────────────────────────────────────
// Replace image src values with your actual image paths under /public/hero/
// Each slide has its own title, italic word, and description
const slides = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&q=80",
    alt: "Advanced skin laser treatment",
    heading: "Confidence in Every",
    italic: "Treatment",
    desc: "At Luminox, every treatment is crafted with precision. As a leading skin, hair & laser clinic, we deliver trusted, high-quality care with greater expertise—bringing beautiful results to every patient.",
    cta: "Explore Treatments",
    ctaHref: "/laser-treatments",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1600&q=80",
    alt: "Skin care therapy",
    heading: "Radiance in Every",
    italic: "Glow",
    desc: "Reveal your skin's true potential with our clinically proven skin care therapies. Personalised regimens designed by dermatologists for lasting luminosity.",
    cta: "Discover Skin Care",
    ctaHref: "/skin-care",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=1600&q=80",
    alt: "Injectable aesthetics",
    heading: "Beauty in Every",
    italic: "Detail",
    desc: "From precision injectables to advanced aesthetics, our expert team sculpts natural-looking results that honour your uniqueness—safely and beautifully.",
    cta: "View Injectables",
    ctaHref: "/injectables",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=1600&q=80",
    alt: "Medical dermatology",
    heading: "Care in Every",
    italic: "Diagnosis",
    desc: "World-class medical dermatology combining clinical rigour with compassionate care. From acne to complex skin conditions—evidence-based solutions, every time.",
    cta: "Medical Dermatology",
    ctaHref: "/medical-dermatology",
  },
];

const SLIDE_DURATION = 5000; // ms per slide

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [animating, setAnimating] = useState(false);

  // Auto-advance
  useEffect(() => {
    const timer = setInterval(() => goTo((current + 1) % slides.length), SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [current]);

  const goTo = (idx: number) => {
    if (idx === current || animating) return;
    setAnimating(true);
    setPrev(current);
    setCurrent(idx);
    setTimeout(() => { setPrev(null); setAnimating(false); }, 900);
  };

  return (
    <section className="relative h-screen min-h-[600px] w-full overflow-hidden flex items-center">

      {/* ── Background Slides ── */}
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          className="absolute inset-0 z-0 transition-all duration-900"
          style={{
            opacity: i === current ? 1 : i === prev ? 0 : 0,
            transform: i === current ? "scale(1)" : i === prev ? "scale(1.04)" : "scale(1.04)",
            transition: "opacity 0.9s ease, transform 0.9s ease",
            zIndex: i === current ? 2 : i === prev ? 1 : 0,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={slide.src}
            alt={slide.alt}
            className="h-full w-full object-cover"
          />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-black/20" />
          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      ))}

      {/* ── Decorative concentric circles (matches reference design) ── */}
      <div className="absolute inset-0 z-[3] pointer-events-none flex items-center justify-center">
        {[520, 380, 260].map((size) => (
          <div
            key={size}
            className="absolute rounded-full border border-white/10"
            style={{ width: size, height: size }}
          />
        ))}
      </div>

      {/* ── Content Layer ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 pt-24 sm:pt-28">
        <div className="max-w-2xl">

          {/* Slide-in headline — matches reference style */}
          <div
            key={`heading-${current}`}
            className="mb-5"
            style={{ animation: "fadeSlideUp 0.7s ease both" }}
          >
            {/* Tag line */}
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="h-px w-8 bg-[#DFAA5E]" />
              <span className="text-[#DFAA5E] text-xs font-bold uppercase tracking-[0.25em]">
                Luminox Skin · Hair · Laser
              </span>
            </div>

            {/* Main title — "Confidence in Every [italic word]" style */}
            <h1 className="text-white font-extrabold leading-none"
                style={{ fontFamily: "'Georgia', serif" }}>
              {/* Regular part — yellow highlighted block like reference */}
              <span
                className="inline bg-[#DFAA5E] text-[#292E4B] px-3 py-1 mr-2
                           text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
                style={{ lineHeight: 1.3, boxDecorationBreak: "clone", WebkitBoxDecorationBreak: "clone" }}
              >
                {slides[current].heading}
              </span>
              {/* Italic word — white cursive style like reference */}
              <span
                className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-[5rem] italic font-bold ml-1"
                style={{ fontFamily: "'Georgia', 'Times New Roman', serif", letterSpacing: "-0.02em" }}
              >
                {slides[current].italic}
              </span>
            </h1>
          </div>

          {/* Description */}
          <p
            key={`desc-${current}`}
            className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed font-light mb-8 max-w-xl"
            style={{ animation: "fadeSlideUp 0.7s 0.15s ease both" }}
          >
            {slides[current].desc}
          </p>

          {/* CTA */}
          <div
            key={`cta-${current}`}
            style={{ animation: "fadeSlideUp 0.7s 0.28s ease both" }}
          >
            <a
              href={slides[current].ctaHref}
              className="inline-flex items-center gap-2 bg-[#DFAA5E] text-[#292E4B] px-7 py-3
                         text-xs sm:text-sm font-extrabold uppercase tracking-widest
                         hover:bg-white transition-colors duration-300"
            >
              {slides[current].cta}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* ── Slide Indicators (bottom center) ── */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex items-center gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            className="relative h-[3px] rounded-full overflow-hidden transition-all duration-300"
            style={{ width: i === current ? 40 : 16, background: "rgba(255,255,255,0.3)" }}
          >
            {i === current && (
              <span
                className="absolute inset-y-0 left-0 bg-[#DFAA5E] rounded-full"
                style={{
                  animation: `progressBar ${SLIDE_DURATION}ms linear forwards`,
                  width: "100%",
                  transformOrigin: "left",
                }}
              />
            )}
          </button>
        ))}
      </div>

      {/* ── Prev / Next Arrows ── */}
      <button
        onClick={() => goTo((current - 1 + slides.length) % slides.length)}
        className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-10
                   w-10 h-10 rounded-full border border-white/25 bg-white/10 backdrop-blur-sm
                   flex items-center justify-center text-white
                   hover:bg-[#DFAA5E] hover:border-[#DFAA5E] hover:text-[#292E4B]
                   transition-all duration-200"
        aria-label="Previous slide"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={() => goTo((current + 1) % slides.length)}
        className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-10
                   w-10 h-10 rounded-full border border-white/25 bg-white/10 backdrop-blur-sm
                   flex items-center justify-center text-white
                   hover:bg-[#DFAA5E] hover:border-[#DFAA5E] hover:text-[#292E4B]
                   transition-all duration-200"
        aria-label="Next slide"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* ── Slide counter (top right) ── */}
      <div className="absolute top-6 right-6 z-10 text-white/50 text-xs font-bold tracking-widest hidden sm:block">
        <span className="text-[#DFAA5E] text-base">{String(current + 1).padStart(2, "0")}</span>
        <span className="mx-1">/</span>
        {String(slides.length).padStart(2, "0")}
      </div>

      {/* ── CSS Keyframes injected via style tag ── */}
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes progressBar {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
      `}</style>
    </section>
  );
};

export default Hero;