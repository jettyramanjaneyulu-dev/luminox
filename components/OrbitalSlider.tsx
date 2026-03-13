"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Brand Colors (60-30-10) ───────────────────────────────────────────────────
// 60% → #FFFFFF white bg
// 30% → #292E4B navy  #5B326A deep purple
// 10% → #DFAA5E gold  #D95CB9 pink  #F9DB9F light gold
// Neutral → #414042
// ──────────────────────────────────────────────────────────────────────────────

const TREATMENTS = [
  {
    id: 0,
    tag: "01 — Laser",
    title: "Laser\nTreatments",
    headline: "Precision Light,\nPerfect Skin",
    desc: "From hair removal to pigmentation correction, our medical-grade laser systems target concerns at the cellular level — revealing visibly smoother, clearer skin in fewer sessions.",
    features: ["Laser Hair Removal", "CO2 Resurfacing", "Picosecond Tattoo Removal", "IPL Photofacial"],
    accent: "#DFAA5E",
    glow: "rgba(223,170,94,0.15)",
    href: "/laser-treatments",
    // Inline SVG icon
    icon: (
      <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <circle cx="28" cy="28" r="20" stroke="#DFAA5E" strokeWidth="1.5" fill="none" strokeDasharray="4 3" />
        <circle cx="28" cy="28" r="10" stroke="#DFAA5E" strokeWidth="2" fill="none" />
        <circle cx="28" cy="28" r="3" fill="#DFAA5E" />
        {/* Laser rays — pre-calculated to avoid SSR/CSR hydration mismatch */}
        <line x1="41" y1="28" x2="50" y2="28" stroke="#DFAA5E" strokeWidth="1.5" strokeLinecap="round" opacity="1"/>
        <line x1="37.1924" y1="37.1924" x2="43.5563" y2="43.5563" stroke="#DFAA5E" strokeWidth="0.8" strokeLinecap="round" opacity="0.5"/>
        <line x1="28" y1="41" x2="28" y2="50" stroke="#DFAA5E" strokeWidth="1.5" strokeLinecap="round" opacity="1"/>
        <line x1="18.8076" y1="37.1924" x2="12.4437" y2="43.5563" stroke="#DFAA5E" strokeWidth="0.8" strokeLinecap="round" opacity="0.5"/>
        <line x1="15" y1="28" x2="6" y2="28" stroke="#DFAA5E" strokeWidth="1.5" strokeLinecap="round" opacity="1"/>
        <line x1="18.8076" y1="18.8076" x2="12.4437" y2="12.4437" stroke="#DFAA5E" strokeWidth="0.8" strokeLinecap="round" opacity="0.5"/>
        <line x1="28" y1="15" x2="28" y2="6" stroke="#DFAA5E" strokeWidth="1.5" strokeLinecap="round" opacity="1"/>
        <line x1="37.1924" y1="18.8076" x2="43.5563" y2="12.4437" stroke="#DFAA5E" strokeWidth="0.8" strokeLinecap="round" opacity="0.5"/>
      </svg>
    ),
    // Dummy image
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=700&q=80",
  },
  {
    id: 1,
    tag: "02 — Injectables",
    title: "Injectables\n& Fillers",
    headline: "Sculpt. Refine.\nReveal.",
    desc: "Expert-administered botulinum toxin, dermal fillers, and biostimulators that restore youthful volume and smooth expression lines — with results that look natural, never overdone.",
    features: ["Botulinum Toxin", "Dermal Fillers", "Skin Boosters", "PRP Therapy"],
    accent: "#D95CB9",
    glow: "rgba(217,92,185,0.15)",
    href: "/injectables",
    icon: (
      <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Syringe body */}
        <rect x="14" y="24" width="24" height="8" rx="4" stroke="#D95CB9" strokeWidth="1.8" fill="none" />
        {/* Plunger */}
        <line x1="10" y1="28" x2="14" y2="28" stroke="#D95CB9" strokeWidth="2.5" strokeLinecap="round" />
        {/* Needle */}
        <line x1="38" y1="28" x2="46" y2="28" stroke="#D95CB9" strokeWidth="1.5" strokeLinecap="round" />
        <polygon points="46,28 43,26 43,30" fill="#D95CB9" />
        {/* Fill indicator */}
        <rect x="18" y="26" width="10" height="4" rx="2" fill="#D95CB9" opacity="0.4" />
        {/* Sparkle drops */}
        <circle cx="42" cy="22" r="2" fill="#D95CB9" opacity="0.6" />
        <circle cx="46" cy="18" r="1.2" fill="#D95CB9" opacity="0.4" />
        <circle cx="38" cy="18" r="1.5" fill="#D95CB9" opacity="0.3" />
      </svg>
    ),
    image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=700&q=80",
  },
  {
    id: 2,
    tag: "03 — Skin Care",
    title: "Advanced\nSkin Care",
    headline: "Glow Deeper.\nStay Longer.",
    desc: "Medical-grade peels, HydraFacials, and prescription regimens that work at every layer of the skin — addressing texture, tone, hydration, and ageing with proven clinical efficacy.",
    features: ["Chemical Peels", "HydraFacial", "LED Therapy", "Prescription Skincare"],
    accent: "#9B6DB5",
    glow: "rgba(155,109,181,0.15)",
    href: "/skin-care",
    icon: (
      <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Face */}
        <circle cx="28" cy="30" r="16" stroke="#9B6DB5" strokeWidth="1.8" fill="none" />
        {/* Eyes */}
        <circle cx="22" cy="28" r="2.5" fill="#9B6DB5" />
        <circle cx="34" cy="28" r="2.5" fill="#9B6DB5" />
        {/* Smile */}
        <path d="M22 35 Q28 40 34 35" stroke="#9B6DB5" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        {/* Glow rings */}
        <circle cx="28" cy="30" r="20" stroke="#9B6DB5" strokeWidth="0.8" strokeDasharray="3 5" fill="none" opacity="0.5" />
        {/* Sparkle top */}
        <path d="M28 8 L29.2 12 L33 13.2 L29.2 14.4 L28 18.4 L26.8 14.4 L23 13.2 L26.8 12Z" fill="#9B6DB5" opacity="0.8" />
      </svg>
    ),
    image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=700&q=80",
  },
  {
    id: 3,
    tag: "04 — Medical Derm",
    title: "Medical\nDermatology",
    headline: "Clinical Care.\nReal Results.",
    desc: "Comprehensive medical dermatology for acne, eczema, pigmentation and complex skin conditions — underpinned by dermatologist expertise and evidence-based treatment protocols.",
    features: ["Acne & Scarring", "Eczema & Psoriasis", "Vitiligo", "Skin Cancer Screening"],
    accent: "#5B326A",
    glow: "rgba(91,50,106,0.15)",
    href: "/medical-dermatology",
    icon: (
      <svg viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Cross / medical symbol */}
        <rect x="23" y="10" width="10" height="36" rx="5" stroke="#5B326A" strokeWidth="1.8" fill="none" />
        <rect x="10" y="23" width="36" height="10" rx="5" stroke="#5B326A" strokeWidth="1.8" fill="none" />
        {/* Center fill */}
        <rect x="23" y="23" width="10" height="10" fill="#5B326A" opacity="0.3" />
        {/* Outer ring */}
        <circle cx="28" cy="28" r="24" stroke="#5B326A" strokeWidth="0.8" strokeDasharray="4 4" fill="none" opacity="0.4" />
      </svg>
    ),
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=700&q=80",
  },
];

export default function TreatmentShowcase() {
  const [active, setActive] = useState(0);
  const [animDir, setAnimDir] = useState(1);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setAnimDir(1);
      setActive((prev) => (prev + 1) % TREATMENTS.length);
    }, 5500);
  };

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const goTo = (idx: number) => {
    setAnimDir(idx > active ? 1 : -1);
    setActive(idx);
    startTimer();
  };

  const current = TREATMENTS[active];

  return (
    <section
      className="relative w-full overflow-hidden py-20 sm:py-28"
      style={{ background: "#FFFFFF" }}
    >
      {/* ── Background radial decorations ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(223,170,94,0.07) 0%, transparent 65%)" }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(91,50,106,0.07) 0%, transparent 65%)" }}
        />
        {/* Subtle arc line — the "orbital path" concept */}
        <svg className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[140%] opacity-5" viewBox="0 0 1400 400" fill="none">
          <ellipse cx="700" cy="500" rx="680" ry="400" stroke="#292E4B" strokeWidth="1" />
          <ellipse cx="700" cy="500" rx="520" ry="310" stroke="#292E4B" strokeWidth="0.8" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">

        {/* ── Section header ── */}
        <div className="text-center mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-8" style={{ background: "#DFAA5E" }} />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em]" style={{ color: "#DFAA5E" }}>
              Our Expertise
            </span>
            <div className="h-px w-8" style={{ background: "#DFAA5E" }} />
          </div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight"
            style={{ color: "#292E4B", fontFamily: "'Georgia', serif" }}
          >
            Advancing Skin{" "}
            <span className="italic" style={{ color: "#DFAA5E" }}>With Every</span>
            <br />
            <span style={{ color: "#5B326A" }}>Treatment</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base max-w-xl mx-auto" style={{ color: "#414042" }}>
            Four pillars of skin science — each backed by clinical expertise, premium technology, and a commitment to your results.
          </p>
        </div>

        {/* ── Tab selector (the "orbital titles") ── */}
        <div className="flex justify-center mb-12">
          <div
            className="inline-flex flex-wrap justify-center gap-2 sm:gap-1 p-1.5 rounded-2xl"
            style={{ background: "#F7F5FA", border: "1px solid rgba(91,50,106,0.1)" }}
          >
            {TREATMENTS.map((t, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="relative px-4 sm:px-5 py-2.5 text-xs font-bold uppercase tracking-widest rounded-xl transition-all duration-300 whitespace-nowrap"
                style={{
                  color: active === i ? "#FFFFFF" : "#414042",
                  background: active === i
                    ? `linear-gradient(135deg, #292E4B 0%, ${t.accent} 100%)`
                    : "transparent",
                  boxShadow: active === i ? `0 4px 16px ${t.glow}` : "none",
                }}
              >
                {/* Small icon dot */}
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full mr-2 align-middle"
                  style={{ background: active === i ? "#FFFFFF" : t.accent }}
                />
                {t.tag}
              </button>
            ))}
          </div>
        </div>

        {/* ── Main content panel ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: animDir * 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: animDir * -30 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center"
          >
            {/* LEFT — Text content */}
            <div className="order-2 lg:order-1">

              {/* Tag */}
              <p
                className="text-[11px] font-bold uppercase tracking-[0.3em] mb-4"
                style={{ color: current.accent }}
              >
                {current.tag}
              </p>

              {/* Big headline */}
              <h3
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-3 whitespace-pre-line"
                style={{ color: "#292E4B", fontFamily: "'Georgia', serif" }}
              >
                {current.headline}
              </h3>

              {/* Accent line */}
              <div
                className="w-12 h-[3px] rounded-full mb-6"
                style={{ background: `linear-gradient(90deg, ${current.accent}, transparent)` }}
              />

              {/* Description */}
              <p className="text-sm sm:text-base leading-relaxed mb-8" style={{ color: "#414042" }}>
                {current.desc}
              </p>

              {/* Feature pills */}
              <div className="flex flex-wrap gap-2 mb-10">
                {current.features.map((f) => (
                  <span
                    key={f}
                    className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider rounded-full"
                    style={{
                      background: current.glow,
                      border: `1px solid ${current.accent}40`,
                      color: current.accent,
                    }}
                  >
                    {f}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <a
                href={current.href}
                className="inline-flex items-center gap-2 px-7 py-3 text-xs font-extrabold uppercase tracking-widest rounded-sm transition-all duration-200"
                style={{ background: "#292E4B", color: "#FFFFFF" }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = current.accent;
                  (e.currentTarget as HTMLElement).style.color = "#292E4B";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = "#292E4B";
                  (e.currentTarget as HTMLElement).style.color = "#FFFFFF";
                }}
              >
                Explore {current.title.replace("\n", " ")}
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

            {/* RIGHT — Image + floating icon card */}
            <div className="order-1 lg:order-2 relative">

              {/* Image */}
              <div
                className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden"
                style={{ boxShadow: `0 20px 60px ${current.glow}` }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={current.image}
                  alt={current.tag}
                  className="w-full h-full object-cover object-center"
                />
                {/* Color tint overlay */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{ background: `linear-gradient(135deg, ${current.accent}, transparent 60%)` }}
                />
                {/* Bottom gradient */}
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              {/* Floating icon card — overlaps image bottom-left */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, x: -10 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 0.25, duration: 0.4 }}
                className="absolute -bottom-5 -left-4 sm:-left-6 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center p-4"
                style={{
                  background: "linear-gradient(135deg, #292E4B 0%, #5B326A 100%)",
                  boxShadow: `0 8px 30px ${current.glow}, 0 0 0 4px #FFFFFF`,
                }}
              >
                {current.icon}
              </motion.div>

              {/* Floating stat badge — top-right */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.4 }}
                className="absolute -top-4 -right-2 sm:-right-4 rounded-2xl px-4 py-3 backdrop-blur-sm"
                style={{
                  background: "rgba(255,255,255,0.95)",
                  border: `1.5px solid ${current.accent}50`,
                  boxShadow: `0 8px 24px ${current.glow}`,
                }}
              >
                <p className="text-[10px] uppercase tracking-widest mb-0.5" style={{ color: current.accent }}>
                  Trusted by
                </p>
                <p className="text-lg font-extrabold leading-none" style={{ color: "#292E4B" }}>
                  20,000+
                </p>
                <p className="text-[10px] font-medium" style={{ color: "#414042", opacity: 0.7 }}>
                  happy patients
                </p>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── Progress dots ── */}
        <div className="flex items-center justify-center gap-3 mt-14">
          {TREATMENTS.map((t, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to ${t.tag}`}
              className="relative h-[3px] rounded-full overflow-hidden transition-all duration-400"
              style={{
                width: active === i ? 40 : 16,
                background: active === i ? t.accent : "rgba(41,46,75,0.15)",
              }}
            >
              {active === i && (
                <span
                  className="absolute inset-y-0 left-0 rounded-full"
                  style={{
                    background: t.accent,
                    animation: "progressFill 5.5s linear forwards",
                    width: "100%",
                    transformOrigin: "left",
                  }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes progressFill {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
      `}</style>
    </section>
  );
}
