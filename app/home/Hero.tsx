"use client";

import { useState, useEffect } from "react";

const slides = [
  {
    id: 1,
    src: "/home/banner.png",
  },
  {
    id: 2,
    src: "/home/banner12.png",
    alt: "Skin care clinic",
    heading: "Look",
    italic: "Luminox",
    desc1: "Not brighter skin.",
    desc2: "Not younger skin.",
    desc3: "Just skin that finally looks like you.",
    desc4:
      "At Luminox – Skin | Hair | Laser | IVF Drips, we don't chase trends or temporary fixes. We work with science, technology, and dermatology expertise to restore what your skin and hair were always meant to be.",
    highlight: "Healthy. Balanced. Radiant.",
    cta1: "Discover Luminox",
    cta1Href: "/about",
    cta2: "Book Consultation",
    cta2Href: "/contact",
  },
];

const SLIDE_DURATION = 5000;

const Hero = () => {
  const [current, setCurrent] = useState<number>(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [animating, setAnimating] = useState<boolean>(false);

  useEffect(() => {
    const timer = setInterval(() => {
      goTo((current + 1) % slides.length);
    }, SLIDE_DURATION);

    return () => clearInterval(timer);
  }, [current]);

  const goTo = (idx: number) => {
    if (idx === current || animating) return;

    setAnimating(true);
    setPrev(current);
    setCurrent(idx);

    setTimeout(() => {
      setPrev(null);
      setAnimating(false);
    }, 900);
  };

  const slide = slides[current];
  const hasContent = !!slide.italic || !!slide.desc4 || !!slide.highlight;

  return (
    <section className="relative min-h-screen w-full overflow-hidden flex items-center py-20 lg:py-0">

      {/* Background Slides */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          className="absolute inset-0 z-0 transition-all duration-1000"
          style={{
            opacity: i === current ? 1 : i === prev ? 0 : 0,
            transform: i === current ? "scale(1)" : "scale(1.08)",
            zIndex: i === current ? 2 : i === prev ? 1 : 0,
          }}
        >
          <img
            src={s.src}
            alt={s.alt ?? ""}
            className="h-full w-full object-cover"
          />
        </div>
      ))}

      {/* Decorative circles */}
      <div className="absolute inset-0 z-[3] pointer-events-none flex items-center justify-center overflow-hidden">
        {[520, 380, 260].map((size) => (
          <div
            key={size}
            className="absolute rounded-full border border-white/10 hidden sm:block"
            style={{ width: size, height: size }}
          />
        ))}
      </div>

      {/* Content — only rendered when slide has content */}
      {hasContent && (
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          <div className="max-w-3xl">

            {/* Tagline */}
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="h-px w-6 md:w-10 bg-[#DFAA5E]" />
              <span className="text-[#DFAA5E] text-[10px] md:text-xs font-bold uppercase tracking-[0.3em]">
                Luminox Skin · Hair · Laser · IVF Drips
              </span>
            </div>

            {/* Heading */}
            {slide.italic && (
              <h1
                key={current}
                className="text-white font-extrabold leading-[1.1] mb-6 flex flex-wrap items-baseline gap-x-3"
                style={{ fontFamily: "'Georgia', serif" }}
              >
                <span className="text-white italic text-5xl md:text-7xl lg:text-[7rem] font-serif block sm:inline mt-2 sm:mt-0">
                  {slide.italic}
                </span>
              </h1>
            )}

            {/* Paragraph */}
            {slide.desc4 && (
              <p className="text-gray-400 mb-6 max-w-lg text-sm md:text-base leading-relaxed">
                {slide.desc4}
              </p>
            )}

            {/* Highlight */}
            {slide.highlight && (
              <p className="text-[#DFAA5E] font-bold mb-10 tracking-widest text-xs md:text-sm uppercase">
                {slide.highlight}
              </p>
            )}

            {/* CTA Buttons */}
            {(slide.cta1 || slide.cta2) && (
              <div className="flex flex-col sm:flex-row gap-4">
                {slide.cta1 && (
                  <a
                    href={slide.cta1Href}
                    className="bg-[#DFAA5E] text-[#292E4B] px-8 py-4 text-[11px] md:text-xs font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors duration-300 text-center"
                  >
                    {slide.cta1}
                  </a>
                )}
                {slide.cta2 && (
                  <a
                    href={slide.cta2Href}
                    className="border border-white/30 text-white px-8 py-4 text-[11px] md:text-xs font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-[#292E4B] transition-all duration-300 text-center backdrop-blur-sm"
                  >
                    {slide.cta2}
                  </a>
                )}
              </div>
            )}

          </div>
        </div>
      )}

      {/* Indicators */}
      <div className="absolute bottom-8 left-0 w-full z-10 flex justify-center lg:justify-start lg:left-16 gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className="group py-4 px-1"
            aria-label={`Go to slide ${i + 1}`}
          >
            <div
              className={`h-[2px] transition-all duration-500 rounded-full ${
                i === current
                  ? "w-12 bg-[#DFAA5E]"
                  : "w-6 bg-white/30 group-hover:bg-white/60"
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
};

export default Hero;