"use client";

import { useState, useEffect, useRef } from "react";

const slides = [
  {
    id: 1,
    src: "/home/banner-21.png",
    alt: "Luminox Banner",
    fitMode: "contain" as const,
  },
  {
    id: 2,
    src: "/home/banner-21.png",
    alt: "Luminox Banner",
    fitMode: "contain" as const,
  },
];

const SLIDE_DURATION = 5000;

const Hero = () => {
  const [current, setCurrent] = useState<number>(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [animating, setAnimating] = useState<boolean>(false);
  const [sectionHeight, setSectionHeight] = useState<string>("100svh");
  const [isDesktop, setIsDesktop] = useState<boolean>(false);

  const imgRef = useRef<HTMLImageElement | null>(null);

  // Detect screen size for responsive logic
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  // Auto-slide logic
  useEffect(() => {
    const timer = setInterval(() => {
      goTo((current + 1) % slides.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [current]);

  // Height calculation for mobile aspect ratio
  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const slide = slides[current];

    if (slide.fitMode === "contain" && !isDesktop) {
      const naturalW = img.naturalWidth;
      const naturalH = img.naturalHeight;
      const screenW = window.innerWidth;
      const renderedH = (naturalH / naturalW) * screenW;
      const maxH = window.innerHeight;
      setSectionHeight(`${Math.min(renderedH, maxH)}px`);
    } else {
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
            opacity: i === current ? 1 : 0,
            transform: i === current ? "scale(1)" : "scale(1.05)",
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
               * Desktop (≥768px) → cover: fills full width
               * Mobile  (<768px) → contain: full image visible
               */
              objectFit: isDesktop ? "cover" : "contain",
              objectPosition: "center center",
              display: "block",
            }}
          />
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