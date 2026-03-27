"use client";

import { useState, useEffect, useRef } from "react";

type FitMode = "contain" | "cover";

interface Slide {
  id: number;
  // Responsive sources: use the best image for each breakpoint
  srcMobile: string;   // portrait  – shown on  < 768px
  srcTablet: string;   // landscape – shown on 768px – 1279px
  srcDesktop: string;  // wide      – shown on ≥ 1280px
  alt: string;
  fitMode: FitMode;
}

const slides: Slide[] = [
  {
    id: 1,
    srcMobile:  "/home/hero/mobile.png",   // 9:16 portrait  image
    srcTablet:  "/home/hero/tablet.png",   // 4:3  landscape image
    srcDesktop: "/home/hero/desktop.png",  // 16:9 widescreen image
    alt: "Luminox Banner 1",
    fitMode: "contain",
  },
  {
    id: 2,
    srcMobile:  "/home/hero/mobile.png",
    srcTablet:  "/home/hero/tablet.png",
    srcDesktop: "/home/hero/desktop.png",
    alt: "Luminox Banner 2",
    fitMode: "contain",
  },
];

const SLIDE_DURATION = 5000;

// Breakpoints (px)
const BP_TABLET  = 768;
const BP_DESKTOP = 1280;

type ScreenSize = "mobile" | "tablet" | "desktop";

function getScreenSize(w: number): ScreenSize {
  if (w >= BP_DESKTOP) return "desktop";
  if (w >= BP_TABLET)  return "tablet";
  return "mobile";
}

function getSrc(slide: Slide, size: ScreenSize): string {
  if (size === "desktop") return slide.srcDesktop;
  if (size === "tablet")  return slide.srcTablet;
  return slide.srcMobile;
}

const Hero = () => {
  const [current,    setCurrent]    = useState<number>(0);
  const [prev,       setPrev]       = useState<number | null>(null);
  const [animating,  setAnimating]  = useState<boolean>(false);
  const [sectionHeight, setSectionHeight] = useState<string>("100svh");
  const [screenSize, setScreenSize] = useState<ScreenSize>("mobile");

  const imgRef = useRef<HTMLImageElement | null>(null);

  // ── Detect / track screen size ──────────────────────────────────────────
  useEffect(() => {
    const update = () => setScreenSize(getScreenSize(window.innerWidth));
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  // ── Auto-slide ──────────────────────────────────────────────────────────
  useEffect(() => {
    const timer = setInterval(() => {
      goTo((current + 1) % slides.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [current]);

  // ── Height calculation for mobile "contain" mode ────────────────────────
  const recalcHeight = (img: HTMLImageElement) => {
    const slide = slides[current];
    if (slide.fitMode === "contain" && screenSize === "mobile") {
      const renderedH = (img.naturalHeight / img.naturalWidth) * window.innerWidth;
      setSectionHeight(`${Math.min(renderedH, window.innerHeight)}px`);
    } else {
      setSectionHeight("100svh");
    }
  };

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    recalcHeight(e.currentTarget);
  };

  useEffect(() => {
    const onResize = () => {
      if (imgRef.current) recalcHeight(imgRef.current);
      else setSectionHeight("100svh");
    };
    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, [current, screenSize]);

  // ── Navigation ──────────────────────────────────────────────────────────
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

  // On desktop/tablet always cover; on mobile follow slide.fitMode
  const objectFit: FitMode =
    screenSize !== "mobile" ? "cover" : slides[current].fitMode;

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
      {/* ── BACKGROUND SLIDES ────────────────────────────────────────────── */}
      {slides.map((s, i) => {
        const src = getSrc(s, screenSize);
        const isCurrent = i === current;
        const isPrev    = i === prev;

        return (
          <div
            key={s.id}
            style={{
              position:  "absolute",
              inset:     0,
              zIndex:    isCurrent ? 2 : isPrev ? 1 : 0,
              opacity:   isCurrent ? 1 : 0,
              transform: isCurrent ? "scale(1)" : "scale(1.05)",
              transition: "opacity 1000ms ease, transform 1200ms ease",
              width:  "100%",
              height: "100%",
            }}
          >
            <img
              ref={isCurrent ? imgRef : null}
              src={src}
              alt={s.alt}
              onLoad={isCurrent ? handleImageLoad : undefined}
              style={{
                width:          "100%",
                height:         "100%",
                objectFit:      isCurrent ? objectFit : (screenSize !== "mobile" ? "cover" : s.fitMode),
                objectPosition: "center center",
                display:        "block",
              }}
            />
          </div>
        );
      })}

      {/* ── DECORATIVE CIRCLES ───────────────────────────────────────────── */}
      <div
        className="hidden sm:block"
        style={{ position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none" }}
      >
        <div
          style={{
            position:       "relative",
            width:          "100%",
            height:         "100%",
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
          }}
        >
          {[520, 380, 260].map((size) => (
            <div
              key={size}
              style={{
                position:     "absolute",
                width:        size,
                height:       size,
                borderRadius: "50%",
                border:       "1px solid rgba(255,255,255,0.1)",
              }}
            />
          ))}
        </div>
      </div>

      {/* ── SLIDE INDICATORS ─────────────────────────────────────────────── */}
      <div
        style={{
          position:       "absolute",
          bottom:         "20px",
          left:           0,
          width:          "100%",
          zIndex:         10,
          display:        "flex",
          justifyContent: "center",
          gap:            "12px",
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
                height:       "2px",
                borderRadius: "9999px",
                transition:   "all 0.5s",
                width:        i === current ? "48px" : "24px",
                background:   i === current ? "#DFAA5E" : "rgba(100,100,100,0.4)",
              }}
            />
          </button>
        ))}
      </div>
    </section>
  );
};

export default Hero;