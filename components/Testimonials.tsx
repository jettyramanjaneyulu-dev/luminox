"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Brand Colors ─────────────────────────────────────────────────────────────
// 60% → #FFFFFF / #FAF9F6 white/cream
// 30% → #292E4B navy  #5B326A deep purple
// 10% → #DFAA5E gold  #D95CB9 pink  #F9DB9F light gold
// Neutral → #414042
// ─────────────────────────────────────────────────────────────────────────────

// ── Swap these Unsplash URLs with real client images from /public/testimonials/
const REVIEWS = [
  {
    id: 1,
    name: "Aditi Sharma",
    role: "Skin Care Patient",
    treatment: "HydraFacial + Chemical Peel",
    text: "The skin rejuvenation treatment at Luminox completely transformed my complexion. My skin hasn't felt this radiant in years — the specialists genuinely care about your results.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&q=80",
    accent: "#DFAA5E",
    accentLight: "rgba(223,170,94,0.12)",
  },
  {
    id: 2,
    name: "Vikram Mehta",
    role: "Hair Treatment Patient",
    treatment: "Laser Hair Removal",
    text: "I was skeptical about laser treatments, but the precision and care here are truly unmatched. Minimal downtime and the results speak for themselves. Absolutely recommend.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80",
    accent: "#D95CB9",
    accentLight: "rgba(217,92,185,0.12)",
  },
  {
    id: 3,
    name: "Sana Khan",
    role: "Bridal Package",
    treatment: "Bridal Glow + Injectables",
    text: "Their bridal transformation package is absolutely worth every rupee. They don't just treat the skin — they nurture your confidence. I felt like royalty on my wedding day.",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&q=80",
    accent: "#9B6DB5",
    accentLight: "rgba(155,109,181,0.12)",
  },
  {
    id: 4,
    name: "Priya Nair",
    role: "Medical Dermatology",
    treatment: "Acne Scar Revision",
    text: "After struggling with persistent acne for 10 years, Luminox gave me my confidence back. The dermatologist designed a plan specifically for my skin — completely life-changing.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&q=80",
    accent: "#5B326A",
    accentLight: "rgba(91,50,106,0.12)",
  },
];

function Stars() {
  return (
    <div style={{ display: "flex", gap: "3px" }}>
      {[...Array(5)].map((_, i) => (
        <svg key={i} viewBox="0 0 16 16" width="14" height="14" fill="#DFAA5E">
          <path d="M8 1l1.85 3.75L14 5.5l-3 2.92.71 4.13L8 10.5l-3.71 1.95L5 8.42 2 5.5l4.15-.75z"/>
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const current = REVIEWS[active];

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setDir(1);
      setActive(p => (p + 1) % REVIEWS.length);
    }, 6000);
  };

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const goTo = (i: number) => {
    setDir(i > active ? 1 : -1);
    setActive(i);
    resetTimer();
  };

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ background: "#FAF9F6", paddingTop: "80px", paddingBottom: "80px" }}
    >
      {/* ── Background decoration ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div style={{
          position: "absolute", top: "-80px", right: "-80px",
          width: "500px", height: "500px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(223,170,94,0.06) 0%, transparent 65%)"
        }}/>
        <div style={{
          position: "absolute", bottom: "-80px", left: "-80px",
          width: "400px", height: "400px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(91,50,106,0.06) 0%, transparent 65%)"
        }}/>
        {/* Giant decorative quotation mark */}
        <svg
          style={{ position: "absolute", top: "24px", left: "24px", opacity: 0.035 }}
          width="220" height="180" viewBox="0 0 220 180" fill="#292E4B"
        >
          <path d="M0 110C0 50 38 8 88 8L88 50C62 50 46 68 46 110L86 110L86 180L0 180Z"/>
          <path d="M120 110C120 50 158 8 208 8L208 50C182 50 166 68 166 110L206 110L206 180L120 180Z"/>
        </svg>
      </div>

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 20px" }}>

        {/* ── Section header ── */}
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
            <div style={{ height: "1px", width: "32px", background: "#DFAA5E" }}/>
            <span style={{ color: "#DFAA5E", fontWeight: 700, fontSize: "11px", letterSpacing: "0.3em", textTransform: "uppercase" }}>
              Client Stories
            </span>
            <div style={{ height: "1px", width: "32px", background: "#DFAA5E" }}/>
          </div>
          <h2 style={{
            color: "#292E4B", fontFamily: "'Georgia', serif",
            fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800,
            lineHeight: 1.15, margin: 0,
          }}>
            Real People.{" "}
            <em style={{ color: "#DFAA5E", fontStyle: "italic" }}>Real Results.</em>
          </h2>
          <p style={{ color: "#414042", fontSize: "15px", maxWidth: "480px", margin: "14px auto 0", lineHeight: 1.7 }}>
            Thousands of patients have transformed their skin and confidence at Luminox. Here are a few of their stories.
          </p>
        </div>

        {/* ══════════════════════════
            MAIN CARD — full-width
        ══════════════════════════ */}
        <div
          style={{
            borderRadius: "32px",
            overflow: "hidden",
            boxShadow: "0 24px 80px rgba(41,46,75,0.12)",
            background: "#FFFFFF",
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "520px" }}
               className="testimonial-grid"
          >
            {/* ── LEFT: Image panel ── */}
            <div style={{ position: "relative", overflow: "hidden", minHeight: "400px" }}>

              {/* Stacked ghost cards behind */}
              {[1, 2].map(offset => {
                const ghostIdx = (active + offset) % REVIEWS.length;
                return (
                  <div key={ghostIdx} style={{
                    position: "absolute", inset: 0,
                    transform: `scale(${1 - offset * 0.03}) translateY(${offset * -12}px)`,
                    transformOrigin: "bottom center",
                    zIndex: 2 - offset,
                    opacity: 0.3,
                  }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={REVIEWS[ghostIdx].image} alt=""
                      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
                    />
                    <div style={{ position: "absolute", inset: 0, background: "rgba(41,46,75,0.55)" }}/>
                  </div>
                );
              })}

              {/* Active image */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                  style={{ position: "absolute", inset: 0, zIndex: 3 }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={current.image} alt={current.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
                  />
                  {/* Bottom gradient overlay */}
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(to top, rgba(41,46,75,0.88) 0%, rgba(41,46,75,0.1) 55%, transparent 100%)"
                  }}/>

                  {/* Name overlay at bottom */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`name-${active}`}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "32px" }}
                    >
                      <div style={{
                        display: "inline-flex", alignItems: "center", gap: "8px",
                        background: current.accent, borderRadius: "100px",
                        padding: "5px 14px", marginBottom: "12px",
                      }}>
                        <span style={{ color: "#292E4B", fontSize: "10px", fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase" }}>
                          {current.treatment}
                        </span>
                      </div>
                      <p style={{ color: "#FFFFFF", fontWeight: 800, fontSize: "22px", lineHeight: 1.2, margin: 0 }}>
                        {current.name}
                      </p>
                      <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "12px", fontWeight: 600, marginTop: "4px", letterSpacing: "0.05em" }}>
                        {current.role}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              </AnimatePresence>

              {/* Thumbnail strip — bottom right */}
              <div style={{
                position: "absolute", bottom: "28px", right: "20px",
                zIndex: 20, display: "flex", flexDirection: "column", gap: "8px",
              }}>
                {REVIEWS.map((r, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    style={{
                      width: i === active ? "48px" : "40px",
                      height: i === active ? "48px" : "40px",
                      borderRadius: "50%",
                      overflow: "hidden",
                      border: i === active ? `2.5px solid ${r.accent}` : "2px solid rgba(255,255,255,0.3)",
                      padding: 0, cursor: "pointer",
                      transition: "all 0.3s ease",
                      opacity: i === active ? 1 : 0.6,
                      flexShrink: 0,
                    }}
                    aria-label={r.name}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={r.image} alt={r.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top" }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* ── RIGHT: Content panel ── */}
            <div style={{
              padding: "clamp(32px, 5vw, 60px)",
              display: "flex", flexDirection: "column", justifyContent: "space-between",
              background: "#FFFFFF",
            }}>

              {/* Top: stars + quote icon */}
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "32px" }}>
                <Stars />
                {/* Big decorative quote mark */}
                <div style={{
                  width: "56px", height: "56px", borderRadius: "16px",
                  background: "linear-gradient(135deg, #292E4B, #5B326A)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <svg viewBox="0 0 28 22" width="22" height="22" fill="white">
                    <path d="M0 14C0 6 5 1 12 1L12 6C8 6 6 9 6 14L11 14L11 22L0 22Z"/>
                    <path d="M16 14C16 6 21 1 28 1L28 6C24 6 22 9 22 14L27 14L27 22L16 22Z"/>
                  </svg>
                </div>
              </div>

              {/* Quote text */}
              <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
                <AnimatePresence mode="wait">
                  <motion.blockquote
                    key={`quote-${active}`}
                    initial={{ opacity: 0, x: dir * 28 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: dir * -28 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      fontFamily: "'Georgia', serif",
                      fontSize: "clamp(17px, 2vw, 22px)",
                      fontStyle: "italic",
                      color: "#292E4B",
                      lineHeight: 1.75,
                      margin: 0,
                    }}
                  >
                    &ldquo;{current.text}&rdquo;
                  </motion.blockquote>
                </AnimatePresence>
              </div>

              {/* Divider */}
              <div style={{ height: "1px", background: "rgba(41,46,75,0.08)", margin: "28px 0" }}/>

              {/* Bottom: nav + google strip */}
              <div>
                {/* Dot nav + arrows */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
                  {/* Dots */}
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    {REVIEWS.map((r, i) => (
                      <button
                        key={i}
                        onClick={() => goTo(i)}
                        style={{
                          height: "4px", borderRadius: "100px", border: "none", cursor: "pointer",
                          width: i === active ? "32px" : "10px",
                          background: i === active ? r.accent : "rgba(41,46,75,0.15)",
                          transition: "all 0.4s ease", padding: 0,
                        }}
                        aria-label={`Review ${i + 1}`}
                      />
                    ))}
                    <span style={{ color: "#414042", opacity: 0.4, fontSize: "11px", fontWeight: 700, marginLeft: "8px" }}>
                      {String(active + 1).padStart(2, "0")} / {String(REVIEWS.length).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Arrows */}
                  <div style={{ display: "flex", gap: "8px" }}>
                    {[
                      { fn: () => goTo((active - 1 + REVIEWS.length) % REVIEWS.length), label: "Prev", icon: "M15 19l-7-7 7-7" },
                      { fn: () => goTo((active + 1) % REVIEWS.length), label: "Next", icon: "M9 5l7 7-7 7" },
                    ].map((btn, bi) => (
                      <button
                        key={bi}
                        onClick={btn.fn}
                        aria-label={btn.label}
                        style={{
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: bi === 1 ? "#292E4B" : "transparent",
  border: bi === 0 ? "1.5px solid rgba(41,46,75,0.2)" : "none",
  color: bi === 1 ? "#FFFFFF" : "#292E4B",
  transition: "all 0.2s ease",
}}
                        onMouseEnter={e => {
                          if (bi === 1) (e.currentTarget as HTMLElement).style.background = current.accent;
                          else { (e.currentTarget as HTMLElement).style.background = "#292E4B"; (e.currentTarget as HTMLElement).style.color = "#FFF"; }
                        }}
                        onMouseLeave={e => {
                          if (bi === 1) (e.currentTarget as HTMLElement).style.background = "#292E4B";
                          else { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "#292E4B"; }
                        }}
                      >
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d={btn.icon}/>
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Google rating strip */}
                <div style={{
                  display: "flex", alignItems: "center", gap: "14px",
                  background: "#FAF9F6", borderRadius: "16px", padding: "14px 18px",
                  border: "1.5px solid rgba(41,46,75,0.07)",
                }}>
                  <svg viewBox="0 0 24 24" width="22" height="22" style={{ flexShrink: 0 }}>
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <Stars />
                      <span style={{ color: "#292E4B", fontWeight: 800, fontSize: "13px" }}>4.9</span>
                    </div>
                    <p style={{ color: "#414042", opacity: 0.55, fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", margin: "2px 0 0" }}>
                      400+ Google Reviews
                    </p>
                  </div>
                  <div style={{ width: "1px", height: "32px", background: "rgba(41,46,75,0.1)", margin: "0 4px" }}/>
                  <div style={{ textAlign: "center" }}>
                    <p style={{ color: "#292E4B", fontWeight: 800, fontSize: "16px", fontFamily: "'Georgia', serif", margin: 0 }}>98%</p>
                    <p style={{ color: "#414042", opacity: 0.55, fontSize: "9px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", margin: "2px 0 0" }}>
                      Recommend Us
                    </p>
                  </div>
                  <div style={{ width: "1px", height: "32px", background: "rgba(41,46,75,0.1)", margin: "0 4px" }}/>
                  <div style={{ textAlign: "center" }}>
                    <p style={{ color: "#292E4B", fontWeight: 800, fontSize: "16px", fontFamily: "'Georgia', serif", margin: 0 }}>20K+</p>
                    <p style={{ color: "#414042", opacity: 0.55, fontSize: "9px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", margin: "2px 0 0" }}>
                      Happy Patients
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Responsive CSS ── */}
        <style>{`
          @media (max-width: 768px) {
            .testimonial-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </div>
    </section>
  );
}