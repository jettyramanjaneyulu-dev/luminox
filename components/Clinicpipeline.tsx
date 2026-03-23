"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// ─── Brand Colors ─────────────────────────────────────────────────────────────
// 60% → #FFFFFF / #FAF9F6
// 30% → #292E4B navy  #5B326A deep purple
// 10% → #DFAA5E gold  #D95CB9 pink  #F9DB9F light gold
// Neutral → #414042
// ─────────────────────────────────────────────────────────────────────────────

// ── Replace Unsplash URLs with /public/pipeline/card1.jpg etc. ────────────────
const STATS = [
  {
    value: "20,000+",
    label: "Patients Transformed",
    sub: "Across skin, hair, laser and IV Drips treatments ",
    accent: "#DFAA5E",
    rgb: "223,170,94",
    img: "https://images.unsplash.com/photo-1629909615957-be38d48fbbe4?w=800&q=85",
    icon: (
      // Face / skin icon
      <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" width="48" height="48">
        <circle cx="28" cy="28" r="18" stroke="#DFAA5E" strokeWidth="2" fill="none"/>
        <circle cx="22" cy="24" r="2.5" fill="#DFAA5E"/>
        <circle cx="34" cy="24" r="2.5" fill="#DFAA5E"/>
        <path d="M20 34 Q28 40 36 34" stroke="#DFAA5E" strokeWidth="2" strokeLinecap="round" fill="none"/>
        {/* Sparkle top */}
        <path d="M28 6 L29 9 L32 10 L29 11 L28 14 L27 11 L24 10 L27 9Z" fill="#DFAA5E" opacity="0.7"/>
        {/* Skin texture dots */}
        <circle cx="20" cy="30" r="1" fill="#DFAA5E" opacity="0.4"/>
        <circle cx="36" cy="30" r="1" fill="#DFAA5E" opacity="0.4"/>
      </svg>
    ),
  },
  {
    value: "50+",
    label: "Treatment Protocols",
    sub: "Laser · Injectables · Dermatology · Hair",
    accent: "#D95CB9",
    rgb: "217,92,185",
    img: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=85",
    icon: (
      // Laser beam / treatment icon
      <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" width="48" height="48">
        <circle cx="28" cy="28" r="8" stroke="#D95CB9" strokeWidth="2" fill="none"/>
        <circle cx="28" cy="28" r="3" fill="#D95CB9"/>
        {/* 8 rays — pre-calculated, center=28, r1=12, r2=18 */}
        <line x1="40" y1="28" x2="46" y2="28" stroke="#D95CB9" strokeWidth="2" strokeLinecap="round"/>
        <line x1="36.485" y1="36.485" x2="40.728" y2="40.728" stroke="#D95CB9" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
        <line x1="28" y1="40" x2="28" y2="46" stroke="#D95CB9" strokeWidth="2" strokeLinecap="round"/>
        <line x1="19.515" y1="36.485" x2="15.272" y2="40.728" stroke="#D95CB9" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
        <line x1="16" y1="28" x2="10" y2="28" stroke="#D95CB9" strokeWidth="2" strokeLinecap="round"/>
        <line x1="19.515" y1="19.515" x2="15.272" y2="15.272" stroke="#D95CB9" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
        <line x1="28" y1="16" x2="28" y2="10" stroke="#D95CB9" strokeWidth="2" strokeLinecap="round"/>
        <line x1="36.485" y1="19.515" x2="40.728" y2="15.272" stroke="#D95CB9" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
      </svg>
    ),
  },
  {
    value: "12+",
    label: "Years of Excellence",
    sub: "Trusted by Bangalore since 2012",
    accent: "#9B6DB5",
    rgb: "155,109,181",
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=85",
    icon: (
      // Shield / certified icon
      <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" width="48" height="48">
        <path d="M28 6 L44 12 L44 28 C44 38 36 46 28 50 C20 46 12 38 12 28 L12 12 Z"
          stroke="#9B6DB5" strokeWidth="2" fill="none" strokeLinejoin="round"/>
        {/* Inner check */}
        <path d="M20 28 L25 33 L36 22" stroke="#9B6DB5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        {/* Star accent top */}
        <path d="M28 10 L29 13 L32 14 L29 15 L28 18 L27 15 L24 14 L27 13Z" fill="#9B6DB5" opacity="0.6"/>
      </svg>
    ),
  },
  {
    value: "98%",
    label: "Satisfaction Rate",
    sub: "Based on 400+ verified patient reviews",
    accent: "#5B326A",
    rgb: "91,50,106",
    img: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=85",
    icon: (
      // Heart / care icon with skin texture
      <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" width="48" height="48">
        <path d="M28 44 C28 44 10 33 10 20 C10 14 15 10 21 10 C24 10 27 12 28 14 C29 12 32 10 35 10 C41 10 46 14 46 20 C46 33 28 44 28 44Z"
          stroke="#5B326A" strokeWidth="2" fill="none" strokeLinejoin="round"/>
        {/* Inner sparkle */}
        <path d="M28 20 L29 23 L32 24 L29 25 L28 28 L27 25 L24 24 L27 23Z" fill="#5B326A" opacity="0.7"/>
        {/* Glow circles */}
        <circle cx="22" cy="18" r="2" stroke="#5B326A" strokeWidth="1.5" fill="none" opacity="0.5"/>
        <circle cx="34" cy="18" r="2" stroke="#5B326A" strokeWidth="1.5" fill="none" opacity="0.5"/>
      </svg>
    ),
  },
];

function StatCard({ s, i }: { s: typeof STATS[0]; i: number }) {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: cardRef, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="pipeline-card"
      style={{
        position: "relative",
        overflow: "hidden",
        borderRadius: "0",
        minHeight: "480px",
        cursor: "default",
      }}
    >
      {/* Background image with parallax */}
      <motion.div
        style={{ y: imgY, position: "absolute", inset: "-40px", zIndex: 1 }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={s.img}
          alt={s.label}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
        />
      </motion.div>

      {/* Dark overlay — lighter at top, heavier at bottom */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 2,
        background: `linear-gradient(to bottom,
          rgba(15,17,32,0.45) 0%,
          rgba(15,17,32,0.55) 40%,
          rgba(15,17,32,0.88) 100%)`,
      }}/>

      {/* Accent color tint overlay */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 2,
        background: `linear-gradient(135deg, rgba(${s.rgb},0.15) 0%, transparent 55%)`,
      }}/>

      {/* Top accent line */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "3px",
        background: s.accent, zIndex: 10,
      }}/>

      {/* Content */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 10,
        display: "flex", flexDirection: "column",
        padding: "36px 32px 40px",
        justifyContent: "space-between",
      }}>
        {/* Top: icon in box */}
        <div style={{
          width: "72px", height: "72px",
          borderRadius: "20px",
          background: "rgba(255,255,255,0.08)",
          backdropFilter: "blur(12px)",
          border: `1.5px solid rgba(${s.rgb},0.4)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: `0 8px 24px rgba(${s.rgb},0.2)`,
        }}>
          {s.icon}
        </div>

        {/* Bottom: stat + label */}
        <div>
          {/* Value */}
          <p style={{
            fontFamily: "'Georgia', serif",
            fontSize: "clamp(42px, 5vw, 64px)",
            fontWeight: 800,
            color: "#FFFFFF",
            lineHeight: 1,
            margin: "0 0 8px",
            letterSpacing: "-0.02em",
          }}>
            {s.value}
          </p>

          {/* Label */}
          <p style={{
            color: s.accent,
            fontSize: "14px",
            fontWeight: 800,
            letterSpacing: "0.03em",
            margin: "0 0 6px",
          }}>
            {s.label}
          </p>

          {/* Sub */}
          <p style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: "12px",
            fontWeight: 500,
            margin: 0,
            lineHeight: 1.5,
          }}>
            {s.sub}
          </p>

          {/* Accent bottom divider */}
          <div style={{
            width: "40px", height: "2px",
            background: `linear-gradient(90deg, ${s.accent}, transparent)`,
            marginTop: "20px",
            borderRadius: "100px",
          }}/>
        </div>
      </div>
    </motion.div>
  );
}

export default function ClinicPipeline() {
  return (
    <section style={{ background: "#FAF9F6", overflow: "hidden" }}>

      {/* ══════════════════ HEADER ══════════════════ */}
      <div style={{ maxWidth: "1380px", margin: "0 auto", padding: "80px 28px 64px" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "32px", flexWrap: "wrap" }}>

          {/* Left: heading */}
          <div style={{ maxWidth: "600px" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
              <div style={{ height: "1px", width: "28px", background: "#DFAA5E" }}/>
              <span style={{ color: "#DFAA5E", fontSize: "10px", fontWeight: 800, letterSpacing: "0.3em", textTransform: "uppercase" }}>
                Our Numbers
              </span>
              <div style={{ height: "1px", width: "28px", background: "#DFAA5E" }}/>
            </div>
            <h2 style={{
              fontFamily: "'Georgia', serif",
              fontSize: "clamp(28px, 4vw, 52px)",
              fontWeight: 800, color: "#292E4B",
              lineHeight: 1.1, margin: "0 0 16px",
            }}>
              Transforming Skin,{" "}
              <em style={{ color: "#DFAA5E", fontStyle: "italic" }}>
                One Patient at a Time
              </em>
            </h2>
            <p style={{ color: "#414042", fontSize: "15px", lineHeight: 1.75, margin: 0, maxWidth: "520px" }}>
              Luminox combines clinical precision with genuine care — building a legacy of visible results backed by science, trust and 12 years of expertise in Bangalore.
            </p>
          </div>

          {/* Right: NABH badge + CTA */}
          <div style={{ display: "flex", flexDirection: "column", gap: "14px", alignItems: "flex-start" }}>
            <div style={{
              display: "flex", alignItems: "center", gap: "12px",
              padding: "16px 20px", borderRadius: "14px",
              background: "#FFFFFF",
              border: "1.5px solid rgba(223,170,94,0.25)",
              boxShadow: "0 4px 20px rgba(41,46,75,0.07)",
            }}>
              {/* Award icon */}
              <div style={{
                width: "42px", height: "42px", borderRadius: "12px",
                background: "linear-gradient(135deg, #292E4B, #5B326A)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <svg viewBox="0 0 32 32" fill="none" width="22" height="22">
                  <circle cx="16" cy="13" r="8" stroke="#DFAA5E" strokeWidth="1.8"/>
                  <path d="M10 20 L8 30 L16 26 L24 30 L22 20" stroke="#DFAA5E" strokeWidth="1.8" strokeLinejoin="round" fill="none"/>
                  <path d="M16 9 L17 12 L20 13 L17 14 L16 17 L15 14 L12 13 L15 12Z" fill="#DFAA5E"/>
                </svg>
              </div>
              <div>
                <p style={{ color: "#DFAA5E", fontSize: "9px", fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 2px" }}>
                  NABH Accredited
                </p>
                <p style={{ color: "#292E4B", fontSize: "13px", fontWeight: 700, margin: 0 }}>
                  Bangalore's #1 Skin Clinic
                </p>
              </div>
            </div>

            <a href="/about" style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              color: "#292E4B", fontSize: "11px", fontWeight: 800,
              letterSpacing: "0.12em", textTransform: "uppercase",
              textDecoration: "none",
              borderBottom: "1.5px solid rgba(41,46,75,0.2)",
              paddingBottom: "2px",
              transition: "border-color 0.2s ease, color 0.2s ease",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#DFAA5E"; (e.currentTarget as HTMLElement).style.borderColor = "#DFAA5E"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#292E4B"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(41,46,75,0.2)"; }}
            >
              Our Story
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} width="12" height="12">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* ══════════════════ PIPELINE CARDS GRID ══════════════════
          Exactly like Lotus: 4 equal-width cards side by side
          Each: background photo + parallax + icon + stat + label
      ═══════════════════════════════════════════════════════════ */}
      <div
        className="pipeline-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "0",
          borderTop: "1px solid rgba(41,46,75,0.08)",
        }}
      >
        {STATS.map((s, i) => (
          <div key={s.label} style={{ borderRight: i < 3 ? "1px solid rgba(255,255,255,0.08)" : "none" }}>
            <StatCard s={s} i={i} />
          </div>
        ))}
      </div>

      {/* ══════════════════ BOTTOM STRIP ══════════════════ */}
      <div style={{
        background: "linear-gradient(135deg, #292E4B 0%, #5B326A 100%)",
        padding: "0",
      }}>
        <div style={{
          maxWidth: "1380px", margin: "0 auto", padding: "36px 28px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: "24px", flexWrap: "wrap",
        }}>
          <div>
            <p style={{ color: "#DFAA5E", fontSize: "10px", fontWeight: 800, letterSpacing: "0.28em", textTransform: "uppercase", margin: "0 0 6px" }}>
              Start Your Transformation
            </p>
            <h3 style={{
              fontFamily: "'Georgia', serif",
              fontSize: "clamp(18px, 2.5vw, 26px)",
              fontWeight: 800, color: "#FFFFFF", margin: 0,
            }}>
              Join 20,000+ patients who chose{" "}
              <em style={{ color: "#F9DB9F" }}>Luminox.</em>
            </h3>
          </div>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <a href="/contact" style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "#DFAA5E", color: "#292E4B",
              padding: "13px 28px", borderRadius: "4px",
              fontSize: "11px", fontWeight: 800, letterSpacing: "0.12em",
              textTransform: "uppercase", textDecoration: "none",
              transition: "background 0.2s ease",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#F9DB9F"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#DFAA5E"; }}
            >
              Book Free Consult
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} width="13" height="13">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </a>
            <a href="/treatments" style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              border: "1.5px solid rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.8)",
              padding: "13px 24px", borderRadius: "4px",
              fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em",
              textTransform: "uppercase", textDecoration: "none",
              transition: "all 0.2s ease",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#D95CB9"; (e.currentTarget as HTMLElement).style.color = "#D95CB9"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.25)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.8)"; }}
            >
              View All Treatments
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .pipeline-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .pipeline-card { min-height: 380px !important; }
        }
        @media (max-width: 540px) {
          .pipeline-grid {
            grid-template-columns: 1fr !important;
          }
          .pipeline-card { min-height: 320px !important; }
        }
      `}</style>
    </section>
  );
}