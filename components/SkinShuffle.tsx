"use client";

import { useEffect, useRef, useState } from "react";

const STATS = [
  {
    number: "250+",
    label: "Commercial Products",
    image: "https://api.lotuspharm.com/storage/sections/home/our-pipeline/01K8WAVSM0FWPKJ2VA414GHKM0.png",
    fallback: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&q=80",
  },
  {
    number: "80+",
    label: "R&D Pipelines",
    image: "https://api.lotuspharm.com/storage/sections/home/our-pipeline/01K8WAVSM18SJS6HW2GC8BN6K6.png",
    fallback: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&q=80",
  },
  {
    number: "100+",
    label: "Global Partnerships",
    image: "https://api.lotuspharm.com/storage/sections/home/our-pipeline/getty-images-ulToeFfq338-unsplash.jpg",
    fallback: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80",
  },
  {
    number: "265+",
    label: "Licensing Deals Signed",
    image: "https://api.lotuspharm.com/storage/sections/home/our-pipeline/gabrielle-henderson-HJckKnwCXxQ-unsplash.jpg.jpg",
    fallback: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80",
  },
];

function AnimatedNumber({ target, triggerKey, duration = 1600 }) {
  const [display, setDisplay] = useState("0");
  const rafRef = useRef(null);
  const startRef = useRef(null);
  const numeric = parseInt(target.replace(/\D/g, ""), 10);
  const suffix = target.replace(/[0-9]/g, "");

  useEffect(() => {
    startRef.current = null;
    cancelAnimationFrame(rafRef.current);
    const animate = (ts) => {
      if (!startRef.current) startRef.current = ts;
      const p = Math.min((ts - startRef.current) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.floor(eased * numeric) + suffix);
      if (p < 1) rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [triggerKey, numeric, suffix, duration]);

  return <span>{display}</span>;
}

// Slot visual config: [far-left, near-left, CENTER, near-right]
const SLOT_CONFIG = [
  { size: 120, numSize: "1.5rem", labelSize: "0.68rem", opacity: 0.45, shadow: "0 2px 8px rgba(0,0,0,0.07)" },
  { size: 155, numSize: "1.9rem", labelSize: "0.75rem", opacity: 0.65, shadow: "0 3px 14px rgba(0,0,0,0.09)" },
  { size: 230, numSize: "3rem",   labelSize: "0.85rem", opacity: 1,    shadow: "0 10px 48px rgba(0,0,0,0.16)" },
  { size: 140, numSize: "1.7rem", labelSize: "0.72rem", opacity: 0.55, shadow: "0 2px 10px rgba(0,0,0,0.08)" },
];

export default function OurPipeline() {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [active, setActive] = useState(0);
  const [imgSrcs, setImgSrcs] = useState(STATS.map((s) => s.image));

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const handleImgError = (i) => {
    setImgSrcs((prev) => { const n = [...prev]; n[i] = STATS[i].fallback; return n; });
  };

  // Build display order: active card always in slot index 2 (center)
  // Remaining 3 fill slots 0,1,3 in their original relative order
  const others = STATS.map((_, i) => i).filter((i) => i !== active);
  // Spread: others[0]=slot0(far-left), others[1]=slot1(near-left), CENTER=slot2, others[2]=slot3(near-right)
  const displayOrder = [others[0], others[1], active, others[2]];

  return (
    <section
      ref={sectionRef}
      style={{ width: "100%", backgroundColor: "#fff", padding: "80px 24px 100px", fontFamily: "Arial, sans-serif", overflow: "hidden" }}
    >
      {/* ── Header ── */}
      <div
        style={{
          textAlign: "center", maxWidth: "720px", margin: "0 auto 72px",
          opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        <h2 style={{ fontFamily: "'Georgia', serif", fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: "700", color: "#1a1a2e", marginBottom: "20px", lineHeight: 1.25 }}>
          Our Pipeline: Innovating for a Healthier Tomorrow
        </h2>
        <p style={{ fontSize: "0.92rem", color: "#777", lineHeight: "1.75", margin: 0 }}>
          Lotus builds an optimised and sustainable pipeline through its hybrid portfolio strategy
          through developing high-barrier medicines in-house and forging strategic partnerships — we
          focus on expanding access to essential therapies and improving patient health globally.
        </p>
      </div>

      {/* ── Cards Row ── */}
      <div
        style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: "clamp(16px, 3vw, 40px)", maxWidth: "1100px", margin: "0 auto", minHeight: "340px",
        }}
      >
        {displayOrder.map((statIdx, slot) => {
          const stat = STATS[statIdx];
          const cfg = SLOT_CONFIG[slot];
          const isCenter = slot === 2;

          return (
            <div
              key={statIdx}
              onClick={() => !isCenter && setActive(statIdx)}
              style={{
                display: "flex", flexDirection: "column", alignItems: "center",
                gap: isCenter ? "20px" : "12px",
                cursor: isCenter ? "default" : "pointer",
                opacity: inView ? cfg.opacity : 0,
                transform: inView ? "translateY(0)" : "translateY(32px)",
                transition: `opacity 0.55s ease ${slot * 0.08}s, transform 0.55s ease ${slot * 0.08}s`,
                zIndex: isCenter ? 10 : slot,
                position: "relative",
              }}
            >
              {/* Circle */}
              <div
                style={{
                  width: `${cfg.size}px`, height: `${cfg.size}px`,
                  borderRadius: "50%", overflow: "hidden", flexShrink: 0,
                  boxShadow: cfg.shadow,
                  border: isCenter ? "3px solid #ebebeb" : "2px solid #f2f2f2",
                  transition: "width 0.55s cubic-bezier(0.4,0,0.2,1), height 0.55s cubic-bezier(0.4,0,0.2,1), box-shadow 0.4s, border 0.4s",
                }}
              >
                <img
                  src={imgSrcs[statIdx]}
                  alt={stat.label}
                  onError={() => handleImgError(statIdx)}
                  style={{
                    width: "100%", height: "100%", objectFit: "cover",
                    transition: "transform 0.55s ease, filter 0.4s ease",
                    transform: isCenter ? "scale(1.06)" : "scale(1)",
                    filter: isCenter ? "none" : "grayscale(30%) brightness(0.95)",
                  }}
                />
              </div>

              {/* Number */}
              <div style={{
                fontFamily: "'Georgia', serif",
                fontSize: cfg.numSize,
                fontWeight: "700",
                color: isCenter ? "#1a1a2e" : "#aaa",
                lineHeight: 1,
                letterSpacing: "-0.02em",
                transition: "font-size 0.5s ease, color 0.4s ease",
              }}>
                {inView
                  ? <AnimatedNumber target={stat.number} triggerKey={`${statIdx}-${isCenter}`} />
                  : "0+"}
              </div>

              {/* Label */}
              <div style={{
                fontFamily: "Arial, sans-serif",
                fontSize: cfg.labelSize,
                color: isCenter ? "#555" : "#bbb",
                textTransform: "uppercase",
                letterSpacing: "0.13em",
                textAlign: "center",
                fontWeight: isCenter ? "600" : "400",
                maxWidth: `${cfg.size + 24}px`,
                transition: "font-size 0.4s ease, color 0.4s ease, font-weight 0.3s ease",
              }}>
                {stat.label}
              </div>

              {/* Active gold dot */}
              {isCenter && (
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#C8A96E", marginTop: "-4px" }} />
              )}
            </div>
          );
        })}
      </div>

      {/* ── Dot navigation ── */}
      <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginTop: "48px" }}>
        {STATS.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{
              width: active === i ? "26px" : "8px", height: "8px",
              borderRadius: "999px",
              backgroundColor: active === i ? "#C8A96E" : "#ddd",
              border: "none", cursor: "pointer", padding: 0,
              transition: "width 0.35s ease, background-color 0.3s ease",
            }}
          />
        ))}
      </div>
    </section>
  );
}
