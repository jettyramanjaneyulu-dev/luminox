"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Brand Colors (60-30-10) ───────────────────────────────────────────────────
// 60% → #FAF9F6 off-white bg
// 30% → #292E4B navy  #5B326A deep purple
// 10% → #DFAA5E gold  #D95CB9 pink  #F9DB9F light gold
// Neutral → #414042
// ──────────────────────────────────────────────────────────────────────────────

const JOURNEY = [
  {
    phase: "Consult",
    title: "Expert Consultation",
    desc: "A personalised skin analysis with our dermatologist to map your unique skin journey and understand your goals.",
    accent: "#DFAA5E",
    step: "01",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7">
        <circle cx="20" cy="14" r="6" stroke="#DFAA5E" strokeWidth="2" fill="none"/>
        <path d="M8 36c0-7 5-12 12-12s12 5 12 12" stroke="#DFAA5E" strokeWidth="2" strokeLinecap="round" fill="none"/>
        <path d="M28 8 L29.2 11 L32 12.2 L29.2 13.4 L28 16.4 L26.8 13.4 L24 12.2 L26.8 11Z" fill="#DFAA5E" opacity="0.9"/>
      </svg>
    ),
  },
  {
    phase: "Diagnose",
    title: "Clinical Diagnosis",
    desc: "Advanced imaging and assessment tools to identify underlying skin conditions with clinical precision before any treatment.",
    accent: "#D95CB9",
    step: "02",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7">
        <circle cx="18" cy="18" r="10" stroke="#D95CB9" strokeWidth="2" fill="none"/>
        <line x1="25" y1="25" x2="34" y2="34" stroke="#D95CB9" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="18" y1="12" x2="18" y2="24" stroke="#D95CB9" strokeWidth="1.8" strokeLinecap="round"/>
        <line x1="12" y1="18" x2="24" y2="18" stroke="#D95CB9" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    phase: "Treat",
    title: "Targeted Treatment",
    desc: "Medical-grade laser, injectable, or skincare protocol — precision-chosen and calibrated exclusively for your skin type.",
    accent: "#9B6DB5",
    step: "03",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7">
        <circle cx="20" cy="20" r="10" stroke="#9B6DB5" strokeWidth="2" fill="none" strokeDasharray="4 3"/>
        <circle cx="20" cy="20" r="4" fill="#9B6DB5"/>
        <line x1="33" y1="20" x2="36" y2="20" stroke="#9B6DB5" strokeWidth="2" strokeLinecap="round"/>
        <line x1="26.5" y1="31.2583" x2="28" y2="33.8564" stroke="#9B6DB5" strokeWidth="2" strokeLinecap="round"/>
        <line x1="13.5" y1="31.2583" x2="12" y2="33.8564" stroke="#9B6DB5" strokeWidth="2" strokeLinecap="round"/>
        <line x1="7" y1="20" x2="4" y2="20" stroke="#9B6DB5" strokeWidth="2" strokeLinecap="round"/>
        <line x1="13.5" y1="8.7417" x2="12" y2="6.1436" stroke="#9B6DB5" strokeWidth="2" strokeLinecap="round"/>
        <line x1="26.5" y1="8.7417" x2="28" y2="6.1436" stroke="#9B6DB5" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    phase: "Maintain",
    title: "Lasting Results",
    desc: "Ongoing care plans, prescription skincare and scheduled follow-ups to protect and preserve your skin's radiant results.",
    accent: "#5B326A",
    step: "04",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7">
        <path d="M20 4 L22.5 15 L34 20 L22.5 25 L20 36 L17.5 25 L6 20 L17.5 15Z" fill="#5B326A"/>
        <path d="M20 11 L21.5 18 L28 20 L21.5 22 L20 29 L18.5 22 L12 20 L18.5 18Z" fill="#F9DB9F" opacity="0.8"/>
      </svg>
    ),
  },
];

export default function SkinPipeline() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActiveStep((p) => (p + 1) % JOURNEY.length), 3500);
    return () => clearInterval(t);
  }, []);

  const current = JOURNEY[activeStep];

  return (
    <section
      className="relative w-full overflow-hidden py-20 sm:py-28"
      style={{ background: "#FAF9F6" }}
    >
      {/* ── Background decorations ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(223,170,94,0.07) 0%, transparent 65%)" }}/>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(91,50,106,0.06) 0%, transparent 65%)" }}/>
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">

        {/* ── Section Header ── */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-8" style={{ background: "#DFAA5E" }}/>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em]" style={{ color: "#DFAA5E" }}>
              The Luminox Journey
            </span>
            <div className="h-px w-8" style={{ background: "#DFAA5E" }}/>
          </div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight"
            style={{ color: "#292E4B", fontFamily: "'Georgia', serif" }}
          >
            Your Skin.{" "}
            <span className="italic" style={{ color: "#DFAA5E" }}>Our Pipeline.</span>
            <br />
            <span style={{ color: "#5B326A" }}>Your Results.</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base max-w-xl mx-auto" style={{ color: "#414042" }}>
            From your first consultation to lasting results — every step crafted around your skin.
          </p>
        </div>

        {/* ══════════════════════════════════
            Main Panel — two-column layout
            Left: large active step detail
            Right: step selector list
        ══════════════════════════════════ */}
        <div
          className="rounded-3xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #292E4B 0%, #5B326A 100%)",
            boxShadow: "0 24px 80px rgba(41,46,75,0.3)",
          }}
        >
          <div className="flex flex-col lg:flex-row">

            {/* ── LEFT — Active step detail ── */}
            <div className="relative w-full lg:w-[55%] p-8 sm:p-12 flex flex-col justify-between min-h-[340px] lg:min-h-[460px]">

              {/* Decorative arcs */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <svg className="absolute -bottom-10 -left-10 w-80 h-80 opacity-[0.07]" viewBox="0 0 200 200">
                  <circle cx="0" cy="200" r="130" fill="none" stroke="white" strokeWidth="1"/>
                  <circle cx="0" cy="200" r="90" fill="none" stroke="white" strokeWidth="0.7"/>
                  <circle cx="0" cy="200" r="55" fill="none" stroke="white" strokeWidth="0.5"/>
                </svg>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 24 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="relative z-10"
                >
                  {/* Step counter */}
                  <p className="text-[11px] font-bold uppercase tracking-[0.35em] mb-5"
                     style={{ color: current.accent }}>
                    Step {current.step} — of 04
                  </p>

                  {/* Icon + heading row */}
                  <div className="flex items-start gap-4 mb-6">
                    <div
                      className="shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center"
                      style={{
                        background: `${current.accent}20`,
                        border: `1.5px solid ${current.accent}50`,
                      }}
                    >
                      {current.icon}
                    </div>
                    <div>
                      <span
                        className="inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full mb-2"
                        style={{
                          background: `${current.accent}25`,
                          border: `1px solid ${current.accent}60`,
                          color: current.accent,
                        }}
                      >
                        {current.phase}
                      </span>
                      <h3
                        className="text-2xl sm:text-3xl font-extrabold text-white leading-tight"
                        style={{ fontFamily: "'Georgia', serif" }}
                      >
                        {current.title}
                      </h3>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm sm:text-base leading-relaxed max-w-md"
                     style={{ color: "rgba(255,255,255,0.62)" }}>
                    {current.desc}
                  </p>

                  {/* Progress bar */}
                  <div className="mt-8 h-[3px] rounded-full overflow-hidden w-full max-w-xs"
                       style={{ background: "rgba(255,255,255,0.1)" }}>
                    <motion.div
                      key={`bar-${activeStep}`}
                      className="h-full rounded-full"
                      style={{ background: current.accent }}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 3.5, ease: "linear" }}
                    />
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* CTA */}
              <div className="mt-10 relative z-10">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 text-[11px] font-extrabold uppercase tracking-widest rounded-sm transition-all duration-200"
                  style={{ background: "#DFAA5E", color: "#292E4B" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#F9DB9F"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#DFAA5E"; }}
                >
                  Start Your Journey
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* ── RIGHT — Step selector list ── */}
            <div className="w-full lg:w-[45%] flex flex-col lg:border-l"
                 style={{ borderColor: "rgba(255,255,255,0.08)" }}>
              {JOURNEY.map((step, i) => (
                <motion.button
                  key={i}
                  onClick={() => setActiveStep(i)}
                  className="group relative flex items-start gap-4 p-6 sm:p-7 text-left transition-all duration-300"
                  style={{
                    background: activeStep === i ? "rgba(255,255,255,0.09)" : "transparent",
                    borderBottom: i < JOURNEY.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none",
                  }}
                  whileHover={{ background: "rgba(255,255,255,0.05)" }}
                >
                  {/* Active left bar */}
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 w-[3px]"
                    style={{ background: step.accent }}
                    animate={{ opacity: activeStep === i ? 1 : 0, scaleY: activeStep === i ? 1 : 0.3 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Icon */}
                  <div
                    className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center mt-0.5 transition-all duration-300"
                    style={{
                      background: activeStep === i ? `${step.accent}22` : "rgba(255,255,255,0.06)",
                      border: `1px solid ${activeStep === i ? `${step.accent}50` : "rgba(255,255,255,0.1)"}`,
                    }}
                  >
                    {step.icon}
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="text-[10px] font-bold uppercase tracking-[0.25em]"
                        style={{ color: activeStep === i ? step.accent : "rgba(255,255,255,0.28)" }}
                      >
                        {step.step}
                      </span>
                      <span
                        className="text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider"
                        style={{
                          background: activeStep === i ? `${step.accent}20` : "transparent",
                          color: activeStep === i ? step.accent : "rgba(255,255,255,0.22)",
                        }}
                      >
                        {step.phase}
                      </span>
                    </div>
                    <p
                      className="text-sm font-extrabold text-white"
                      style={{ opacity: activeStep === i ? 1 : 0.4 }}
                    >
                      {step.title}
                    </p>
                  </div>

                  {/* Chevron arrow */}
                  <svg
                    className="shrink-0 w-4 h-4 mt-1 transition-all duration-200"
                    style={{
                      color: activeStep === i ? step.accent : "rgba(255,255,255,0.2)",
                      transform: activeStep === i ? "translateX(3px)" : "none",
                    }}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
                  </svg>
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Dot nav below (mobile-friendly) ── */}
        <div className="flex justify-center gap-2 mt-8">
          {JOURNEY.map((step, i) => (
            <button
              key={i}
              onClick={() => setActiveStep(i)}
              className="h-[3px] rounded-full transition-all duration-400"
              style={{
                width: activeStep === i ? 36 : 14,
                background: activeStep === i ? step.accent : "rgba(41,46,75,0.2)",
              }}
              aria-label={`Go to step ${i + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
