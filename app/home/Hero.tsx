"use client";

import { useState, useEffect, useRef } from "react";

const slides = [
  {
    id: 1,
    src: "/home/banner.png",
    alt: "Luminox Banner",
    fitMode: "contain" as const,
  },
  {
    id: 2,
    src: "/home/banner12.png",
    alt: "Skin care clinic",
    fitMode: "cover" as const,
    italic: "Luminox",
    desc4:
      "At Luminox – Skin | Hair | Laser | IV Drips, we don't chase trends or temporary fixes. We work with science, technology, and dermatology expertise to restore what your skin and hair were always meant to be.",
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
  const [sectionHeight, setSectionHeight] = useState<string>("100svh");

  // ✅ NEW: track if desktop (≥768px) or mobile
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  const imgRef = useRef<HTMLImageElement | null>(null);

  // ✅ Detect screen size
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      goTo((current + 1) % slides.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [current]);

  // ✅ Height calculation — only for mobile contain
  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const slide = slides[current];

    if (slide.fitMode === "contain" && !isDesktop) {
      // Mobile: fit height to image aspect ratio
      const naturalW = img.naturalWidth;
      const naturalH = img.naturalHeight;
      const screenW = window.innerWidth;
      const renderedH = (naturalH / naturalW) * screenW;
      const maxH = window.innerHeight;
      setSectionHeight(`${Math.min(renderedH, maxH)}px`);
    } else {
      // Desktop or cover slides: full viewport
      setSectionHeight("100svh");
    }
  };

  useEffect(() => {
    const onResize = () => {
      const desktop = window.innerWidth >= 768;
      setIsDesktop(desktop);

      if (imgRef.current && slides[current].fitMode === "contain" && !desktop) {
        const img = imgRef.current;
        const renderedH = (img.naturalHeight / img.naturalWidth) * window.innerWidth;
        setSectionHeight(`${Math.min(renderedH, window.innerHeight)}px`);
      } else {
        setSectionHeight("100svh");
      }
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, [current]);

  useEffect(() => {
    if (slides[current].fitMode === "cover" || isDesktop) {
      setSectionHeight("100svh");
    }
  }, [current, isDesktop]);

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
  const hasContent =
    "italic" in slide && (!!slide.italic || !!slide.desc4 || !!slide.highlight);

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        height: sectionHeight,
        minHeight: "200px",
        backgroundColor: "#f8f2fb",
        transition: "height 0.4s ease",
      }}
    >
      {/* ── BACKGROUND SLIDES ── */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: i === current ? 2 : i === prev ? 1 : 0,
            opacity: i === current ? 1 : i === prev ? 0 : 0,
            transform: i === current ? "scale(1)" : s.fitMode === "cover" ? "scale(1.05)" : "scale(1)",
            transition: "opacity 1000ms ease, transform 1200ms ease",
            width: "100%",
            height: "100%",
          }}
        >
          <img
            ref={i === current ? imgRef : null}
            src={s.src}
            alt={s.alt ?? ""}
            onLoad={i === current ? handleImageLoad : undefined}
            style={{
              width: "100%",
              height: "100%",
              /*
               * ✅ FIX: banner.png (id1)
               *   Desktop (≥768px) → cover: fills full width, no side gaps
               *   Mobile  (<768px) → contain: full image visible, no crop
               *
               * id2 always cover
               */
              objectFit:
                s.fitMode === "contain"
                  ? isDesktop
                    ? "cover"      // ✅ Desktop: no white space
                    : "contain"    // ✅ Mobile: full image visible
                  : "cover",
              objectPosition: "center center",
              display: "block",
            }}
          />

          {/* Overlay only for text slide */}
          {s.fitMode === "cover" && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.25) 65%, rgba(0,0,0,0.0) 100%)",
              }}
            />
          )}
        </div>
      ))}

      {/* ── DECORATIVE CIRCLES ── */}
      <div
        className="hidden sm:block"
        style={{ position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none" }}
      >
        <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          {[520, 380, 260].map((size) => (
            <div
              key={size}
              style={{
                position: "absolute",
                width: size,
                height: size,
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            />
          ))}
        </div>
      </div>

      {/* ── TEXT CONTENT (id2 only) ── */}
      {hasContent && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 10,
            display: "flex",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "1280px",
              margin: "0 auto",
              padding: "0 clamp(20px, 5vw, 64px)",
            }}
          >
            <div style={{ maxWidth: "700px" }}>

              {/* Tagline */}
              <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
                <div style={{ height: "1px", width: "clamp(24px, 4vw, 40px)", background: "#DFAA5E" }} />
                <span style={{
                  color: "#DFAA5E",
                  fontSize: "clamp(9px, 1.2vw, 11px)",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.3em",
                }}>
                  Luminox Skin · Hair · Laser · IV Drips
                </span>
              </div>

              {/* Heading */}
              {"italic" in slide && slide.italic && (
                <h1 key={current} style={{
                  fontFamily: "'Georgia', serif",
                  fontStyle: "italic",
                  fontWeight: 800,
                  lineHeight: 1.1,
                  marginBottom: "24px",
                  fontSize: "clamp(40px, 10vw, 112px)",
                  color: "white",
                }}>
                  {slide.italic}
                </h1>
              )}

              {/* Description */}
              {"desc4" in slide && slide.desc4 && (
                <p style={{
                  color: "rgba(210,210,210,0.9)",
                  marginBottom: "24px",
                  maxWidth: "520px",
                  fontSize: "clamp(13px, 1.5vw, 16px)",
                  lineHeight: 1.75,
                }}>
                  {slide.desc4}
                </p>
              )}

              {/* Highlight */}
              {"highlight" in slide && slide.highlight && (
                <p style={{
                  color: "#DFAA5E",
                  fontWeight: 700,
                  marginBottom: "40px",
                  letterSpacing: "0.25em",
                  fontSize: "clamp(10px, 1.2vw, 13px)",
                  textTransform: "uppercase",
                }}>
                  {slide.highlight}
                </p>
              )}

              {/* CTA Buttons */}
              {"cta1" in slide && (slide.cta1 || slide.cta2) && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
                  {slide.cta1 && (
                    <a href={slide.cta1Href} style={{
                      background: "#DFAA5E",
                      color: "#292E4B",
                      padding: "clamp(12px, 1.5vw, 16px) clamp(24px, 3vw, 32px)",
                      fontSize: "clamp(10px, 1.1vw, 12px)",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.2em",
                      textDecoration: "none",
                      display: "inline-block",
                    }}>
                      {slide.cta1}
                    </a>
                  )}
                  {slide.cta2 && (
                    <a href={slide.cta2Href} style={{
                      border: "1px solid rgba(255,255,255,0.35)",
                      color: "white",
                      padding: "clamp(12px, 1.5vw, 16px) clamp(24px, 3vw, 32px)",
                      fontSize: "clamp(10px, 1.1vw, 12px)",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.2em",
                      textDecoration: "none",
                      display: "inline-block",
                      backdropFilter: "blur(4px)",
                    }}>
                      {slide.cta2}
                    </a>
                  )}
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* ── SLIDE INDICATORS ── */}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          left: 0,
          width: "100%",
          zIndex: 10,
          display: "flex",
          justifyContent: "center",
          gap: "12px",
        }}
      >
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
            style={{ background: "none", border: "none", padding: "16px 4px", cursor: "pointer" }}
          >
            <div
              style={{
                height: "2px",
                borderRadius: "9999px",
                transition: "all 0.5s",
                width: i === current ? "48px" : "24px",
                background: i === current ? "#DFAA5E" : "rgba(100,100,100,0.4)",
              }}
            />
          </button>
        ))}
      </div>
    </section>
  );
};

export default Hero;
