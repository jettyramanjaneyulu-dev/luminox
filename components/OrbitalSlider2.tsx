"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Brand Colors ─────────────────────────────────────────────────────────────
// 60% → #FFFFFF / #FAF9F6
// 30% → #292E4B navy  #5B326A deep purple
// 10% → #DFAA5E gold  #D95CB9 pink  #F9DB9F light gold
// ─────────────────────────────────────────────────────────────────────────────

const TREATMENTS = [
  {
    id: "laser",
    num: "01",
    label: "Laser Treatments",
    headline: "Precision Light,",
    headline2: "Flawless Skin",
    desc: "State-of-the-art laser systems targeting pigmentation, scars, texture and hair with zero compromise on safety.",
    pills: ["Laser Hair Removal", "CO₂ Resurfacing", "Laser Toning", "Fractional Laser"],
    accent: "#DFAA5E",
    rgb: "223,170,94",
    bg: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1400&q=90",
    result: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&q=80",
    stat: "15K+", statLabel: "Procedures",
  },
  {
    id: "skin",
    num: "02",
    label: "Skin Care",
    headline: "Deep Repair,",
    headline2: "Deep Radiance",
    desc: "Clinical protocols engineered to restore your skin barrier — from HydraFacials to regenerative peels.",
    pills: ["HydraFacial MD", "Chemical Peels", "PRP Glow", "LED Therapy"],
    accent: "#D95CB9",
    rgb: "217,92,185",
    bg: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=1400&q=90",
    result: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&q=80",
    stat: "50+", statLabel: "Protocols",
  },
  {
    id: "injectables",
    num: "03",
    label: "Injectables",
    headline: "Sculpted,",
    headline2: "Naturally You",
    desc: "FDA-approved fillers and neuromodulators — results so natural, only you'll know. Administered by board-certified specialists.",
    pills: ["Botox", "Lip Fillers", "Jawline Sculpt", "Under-eye"],
    accent: "#9B6DB5",
    rgb: "155,109,181",
    bg: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1400&q=90",
    result: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=500&q=80",
    stat: "8K+", statLabel: "Patients",
  },
  {
    id: "hair",
    num: "04",
    label: "Hair Restoration",
    headline: "Roots Restored,",
    headline2: "Confidence Back",
    desc: "PRP, GFC and advanced transplantation — personalised trichology plans that bring real density back.",
    pills: ["PRP Therapy", "GFC Treatment", "FUE Transplant", "DHI Technique"],
    accent: "#DFAA5E",
    rgb: "223,170,94",
    bg: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1400&q=90",
    result: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80",
    stat: "5K+", statLabel: "Restored",
  },
];

export default function TreatmentShowcase2() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const t = TREATMENTS[active];

  const start = (idx: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (progRef.current) clearInterval(progRef.current);
    setProgress(0);
    let p = 0;
    progRef.current = setInterval(() => {
      p += 100 / (5000 / 40);
      setProgress(Math.min(p, 100));
    }, 40);
    timerRef.current = setInterval(() => {
      setActive(n => (n + 1) % TREATMENTS.length);
    }, 5000);
  };

  useEffect(() => { start(active); return () => { clearInterval(timerRef.current!); clearInterval(progRef.current!); }; }, [active]);

  const go = (i: number) => { if (i === active) return; setActive(i); };

  return (
    <section style={{ background: "#FAF9F6", overflow: "hidden" }}>

      {/* ══════════════════ TOP HEADER ══════════════════ */}
      <div style={{ maxWidth: "1380px", margin: "0 auto", padding: "72px 28px 0" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "20px", marginBottom: "52px" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <div style={{ height: "1px", width: "28px", background: "#DFAA5E" }} />
              <span style={{ color: "#DFAA5E", fontSize: "10px", fontWeight: 800, letterSpacing: "0.3em", textTransform: "uppercase" }}>
                What We Treat
              </span>
            </div>
            <h2 style={{ fontFamily: "'Georgia', serif", fontSize: "clamp(30px, 4vw, 52px)", fontWeight: 800, color: "#292E4B", margin: 0, lineHeight: 1.1 }}>
              Skin. Hair. <em style={{ color: "#DFAA5E", fontStyle: "italic" }}>You.</em>
            </h2>
          </div>
          <a href="/treatments" style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            border: "1.5px solid rgba(41,46,75,0.2)", color: "#292E4B",
            padding: "12px 24px", borderRadius: "4px",
            fontSize: "11px", fontWeight: 800, letterSpacing: "0.12em",
            textTransform: "uppercase", textDecoration: "none",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#292E4B"; (e.currentTarget as HTMLElement).style.color = "#DFAA5E"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "#292E4B"; }}
          >
            All Treatments
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} width="13" height="13">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>

        {/* ══════════════════ MAIN GRID ══════════════════
            LEFT: vertical tab list
            CENTER: big image + headline overlay
            RIGHT: detail panel
        ═══════════════════════════════════════════════ */}
        <div style={{ display: "grid", gridTemplateColumns: "220px 1fr 340px", gap: "0", minHeight: "620px" }}
          className="ts2-grid">

          {/* ─── LEFT: vertical tabs ─── */}
          <div style={{
            display: "flex", flexDirection: "column",
            borderRight: "1px solid rgba(41,46,75,0.08)",
            paddingRight: "0",
          }}>
            {TREATMENTS.map((tr, i) => (
              <button
                key={tr.id}
                onClick={() => go(i)}
                style={{
                  all: "unset",
                  cursor: "pointer",
                  padding: "22px 28px",
                  borderBottom: "1px solid rgba(41,46,75,0.07)",
                  position: "relative",
                  overflow: "hidden",
                  display: "block",
                  transition: "background 0.3s ease",
                  background: active === i ? "#FFFFFF" : "transparent",
                }}
              >
                {/* Active left bar */}
                <div style={{
                  position: "absolute", left: 0, top: 0, bottom: 0,
                  width: "3px",
                  background: active === i ? tr.accent : "transparent",
                  transition: "background 0.3s ease",
                }} />

                {/* Progress fill */}
                {active === i && (
                  <div style={{
                    position: "absolute", bottom: 0, left: 0,
                    height: "2px", width: `${progress}%`,
                    background: `rgba(${tr.rgb},0.4)`,
                    transition: "none",
                  }} />
                )}

                <p style={{
                  fontSize: "10px", fontWeight: 700, letterSpacing: "0.2em",
                  textTransform: "uppercase", margin: "0 0 4px",
                  color: active === i ? tr.accent : "rgba(41,46,75,0.3)",
                  transition: "color 0.3s ease",
                }}>
                  {tr.num}
                </p>
                <p style={{
                  fontSize: "14px", fontWeight: active === i ? 700 : 500,
                  color: active === i ? "#292E4B" : "rgba(41,46,75,0.45)",
                  margin: 0, transition: "all 0.3s ease",
                  lineHeight: 1.3,
                }}>
                  {tr.label}
                </p>
              </button>
            ))}

            {/* Bottom spacer stat */}
            <div style={{ flex: 1, padding: "28px", borderTop: "1px solid rgba(41,46,75,0.07)", marginTop: "auto", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
              <p style={{ color: "rgba(41,46,75,0.3)", fontSize: "9px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 6px" }}>
                Est. 2012
              </p>
              <p style={{ fontFamily: "'Georgia', serif", fontSize: "28px", fontWeight: 800, color: "#292E4B", margin: "0 0 2px" }}>
                20K+
              </p>
              <p style={{ color: "#414042", fontSize: "11px", fontWeight: 600, margin: 0 }}>Happy Patients</p>
            </div>
          </div>

          {/* ─── CENTER: hero image panel ─── */}
          <div style={{ position: "relative", overflow: "hidden" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={`img-${active}`}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                style={{ position: "absolute", inset: 0 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={t.bg} alt={t.label}
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }} />
                {/* gradient for text legibility */}
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(15,17,32,0.75) 0%, rgba(15,17,32,0.15) 55%, transparent 100%)" }} />
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, rgba(${t.rgb},0.12) 0%, transparent 60%)`, transition: "background 0.8s" }} />
              </motion.div>
            </AnimatePresence>

            {/* Headline over image */}
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "40px 40px 36px", zIndex: 10 }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`hl-${active}`}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: "8px",
                    background: t.accent, color: "#0F1120",
                    fontSize: "9px", fontWeight: 800, letterSpacing: "0.2em",
                    textTransform: "uppercase", padding: "5px 14px", borderRadius: "100px",
                    marginBottom: "14px",
                  }}>
                    {t.label}
                  </div>
                  <h3 style={{
                    fontFamily: "'Georgia', serif",
                    fontSize: "clamp(28px, 4vw, 52px)",
                    fontWeight: 800, color: "#FFFFFF",
                    lineHeight: 1.1, margin: 0,
                  }}>
                    {t.headline}<br />
                    <em style={{ color: t.accent }}>{t.headline2}</em>
                  </h3>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dot nav top-right */}
            <div style={{ position: "absolute", top: "24px", right: "24px", zIndex: 10, display: "flex", gap: "6px" }}>
              {TREATMENTS.map((_, i) => (
                <button key={i} onClick={() => go(i)} style={{
                  width: active === i ? "24px" : "8px",
                  height: "8px", borderRadius: "100px",
                  background: active === i ? t.accent : "rgba(255,255,255,0.35)",
                  border: "none", cursor: "pointer",
                  transition: "all 0.35s ease", padding: 0,
                }} />
              ))}
            </div>
          </div>

          {/* ─── RIGHT: detail panel ─── */}
          <div style={{
            background: "#FFFFFF",
            borderLeft: "1px solid rgba(41,46,75,0.08)",
            display: "flex", flexDirection: "column",
            overflow: "hidden",
          }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={`detail-${active}`}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                style={{ flex: 1, display: "flex", flexDirection: "column", padding: "40px 36px" }}
              >
                {/* Result image */}
                <div style={{
                  width: "100%", height: "180px",
                  borderRadius: "16px", overflow: "hidden",
                  marginBottom: "28px",
                  boxShadow: `0 8px 32px rgba(${t.rgb},0.2)`,
                }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={t.result} alt="Result" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }} />
                </div>

                {/* Stat */}
                <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "24px", paddingBottom: "24px", borderBottom: "1px solid rgba(41,46,75,0.07)" }}>
                  <div>
                    <p style={{ fontFamily: "'Georgia', serif", fontSize: "38px", fontWeight: 800, color: "#292E4B", margin: 0, lineHeight: 1 }}>{t.stat}</p>
                    <p style={{ color: "#414042", fontSize: "11px", fontWeight: 600, margin: 0, opacity: 0.6 }}>{t.statLabel}</p>
                  </div>
                  <div style={{ width: "1px", height: "40px", background: "rgba(41,46,75,0.1)" }} />
                  <p style={{ color: "#414042", fontSize: "13px", lineHeight: 1.6, margin: 0 }}>{t.desc}</p>
                </div>

                {/* Treatment pills */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "28px" }}>
                  {t.pills.map(p => (
                    <span key={p} style={{
                      background: `rgba(${t.rgb},0.08)`,
                      border: `1px solid rgba(${t.rgb},0.25)`,
                      color: "#292E4B", fontSize: "11px", fontWeight: 600,
                      padding: "6px 14px", borderRadius: "100px",
                    }}>{p}</span>
                  ))}
                </div>

                {/* CTA */}
                <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "10px" }}>
                  <a href="/contact" style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                    background: `linear-gradient(135deg, #292E4B, #5B326A)`,
                    color: "#FFFFFF", padding: "14px 20px", borderRadius: "6px",
                    fontSize: "11px", fontWeight: 800, letterSpacing: "0.12em",
                    textTransform: "uppercase", textDecoration: "none",
                    transition: "opacity 0.2s ease",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "0.85"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
                  >
                    Book Consultation
                  </a>
                  <a href={`/treatments/${t.id}`} style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
                    border: `1.5px solid rgba(${t.rgb},0.3)`,
                    color: t.accent, padding: "12px 20px", borderRadius: "6px",
                    fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em",
                    textTransform: "uppercase", textDecoration: "none",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = `rgba(${t.rgb},0.08)`; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
                  >
                    Explore Treatments
                    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} width="12" height="12">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ══════════════════ BOTTOM BAND ══════════════════ */}
      <div style={{ maxWidth: "1380px", margin: "0 auto", padding: "0 28px" }}>
        <div style={{ borderTop: "1px solid rgba(41,46,75,0.08)", display: "grid", gridTemplateColumns: "repeat(4,1fr)" }} className="ts2-stats">
          {[
            { v: "20K+", l: "Patients Transformed", c: "#DFAA5E" },
            { v: "50+", l: "Treatment Protocols", c: "#D95CB9" },
            { v: "12+", l: "Years of Excellence", c: "#9B6DB5" },
            { v: "98%", l: "Satisfaction Rate", c: "#5B326A" },
          ].map((s, i) => (
            <div key={i} style={{
              padding: "32px 28px",
              borderRight: i < 3 ? "1px solid rgba(41,46,75,0.08)" : "none",
              display: "flex", alignItems: "center", gap: "16px",
            }}>
              <div style={{ width: "3px", height: "40px", borderRadius: "100px", background: s.c, flexShrink: 0 }} />
              <div>
                <p style={{ fontFamily: "'Georgia', serif", fontSize: "30px", fontWeight: 800, color: "#292E4B", margin: "0 0 2px", lineHeight: 1 }}>{s.v}</p>
                <p style={{ color: "#414042", fontSize: "11px", fontWeight: 600, margin: 0, opacity: 0.6 }}>{s.l}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .ts2-grid { grid-template-columns: 180px 1fr !important; }
          .ts2-grid > div:last-child { display: none !important; }
        }
        @media (max-width: 700px) {
          .ts2-grid { grid-template-columns: 1fr !important; }
          .ts2-grid > div:first-child { flex-direction: row !important; overflow-x: auto; border-right: none !important; border-bottom: 1px solid rgba(41,46,75,0.08); }
          .ts2-stats { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>
    </section>
  );
}
