"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// ─── Brand Colors (60-30-10) ───────────────────────────────────────────────────
// 60% → #FFFFFF white
// 30% → #292E4B navy  #5B326A deep purple
// 10% → #DFAA5E gold  #D95CB9 pink  #F9DB9F light gold
// Neutral → #414042
// ──────────────────────────────────────────────────────────────────────────────

// ── IMAGE CONFIG ─────────────────────────────────────────────────────────────
// Option A: Single image  → set one path, delete the rest
// Option B: Cycling images → add up to 4 paths, they auto-rotate every 4s
// Your real paths go under: C:\Banglore\luminox\public\whychooseus\
// Example real path: "/whychooseus/clinic.jpg"
// ─────────────────────────────────────────────────────────────────────────────
const CLINIC_IMAGES = [
  "https://images.unsplash.com/photo-1629909615957-be38d48fbbe4?w=900&q=80", // clinic interior
  "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=900&q=80",    // skin consultation
  "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&q=80", // laser treatment
];

const REASONS = [
  {
    title: "Expert Dermatologists",
    text: "City-recognised specialists with 12+ years of combined clinical expertise across all skin types.",
    accent: "#DFAA5E",
    glow: "rgba(223,170,94,0.15)",
    number: "01",
    icon: (
      <svg viewBox="0 0 44 44" fill="none" className="w-7 h-7">
        <circle cx="22" cy="15" r="7" stroke="#DFAA5E" strokeWidth="2" fill="none"/>
        <path d="M8 40c0-8 6-14 14-14s14 6 14 14" stroke="#DFAA5E" strokeWidth="2" strokeLinecap="round" fill="none"/>
        <path d="M32 10 L33.5 14 L38 15.5 L33.5 17 L32 21 L30.5 17 L26 15.5 L30.5 14Z" fill="#DFAA5E" opacity="0.85"/>
      </svg>
    ),
  },
  {
    title: "Medical-Grade Technology",
    text: "The latest FDA-approved laser systems, RF devices and aesthetic tools for precision results.",
    accent: "#D95CB9",
    glow: "rgba(217,92,185,0.15)",
    number: "02",
    icon: (
      <svg viewBox="0 0 44 44" fill="none" className="w-7 h-7">
        <circle cx="22" cy="22" r="10" stroke="#D95CB9" strokeWidth="2" fill="none" strokeDasharray="4 3"/>
        <circle cx="22" cy="22" r="4" fill="#D95CB9"/>
        <line x1="35" y1="22" x2="38" y2="22" stroke="#D95CB9" strokeWidth="2" strokeLinecap="round"/>
        <line x1="31.1924" y1="31.1924" x2="33.3137" y2="33.3137" stroke="#D95CB9" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
        <line x1="22" y1="35" x2="22" y2="38" stroke="#D95CB9" strokeWidth="2" strokeLinecap="round"/>
        <line x1="12.8076" y1="31.1924" x2="10.6863" y2="33.3137" stroke="#D95CB9" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
        <line x1="9" y1="22" x2="6" y2="22" stroke="#D95CB9" strokeWidth="2" strokeLinecap="round"/>
        <line x1="12.8076" y1="12.8076" x2="10.6863" y2="10.6863" stroke="#D95CB9" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
        <line x1="22" y1="9" x2="22" y2="6" stroke="#D95CB9" strokeWidth="2" strokeLinecap="round"/>
        <line x1="31.1924" y1="12.8076" x2="33.3137" y2="10.6863" stroke="#D95CB9" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
      </svg>
    ),
  },
  {
    title: "Clinically Proven Safety",
    text: "Evidence-based protocols with minimal downtime — every treatment backed by peer-reviewed research.",
    accent: "#9B6DB5",
    glow: "rgba(155,109,181,0.15)",
    number: "03",
    icon: (
      <svg viewBox="0 0 44 44" fill="none" className="w-7 h-7">
        <path d="M22 4 L34 9 L34 22 C34 30 28 37 22 40 C16 37 10 30 10 22 L10 9 Z" stroke="#9B6DB5" strokeWidth="2" fill="none" strokeLinejoin="round"/>
        <path d="M16 22 L20 26 L28 18" stroke="#9B6DB5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: "Personalised Care Plans",
    text: "Every patient is unique. We craft bespoke treatment journeys — not one-size-fits-all protocols.",
    accent: "#5B326A",
    glow: "rgba(91,50,106,0.15)",
    number: "04",
    icon: (
      <svg viewBox="0 0 44 44" fill="none" className="w-7 h-7">
        <path d="M22 8 C14 8 8 14 8 22 C8 27 11 31 15 34 L22 38 L29 34 C33 31 36 27 36 22 C36 14 30 8 22 8Z" stroke="#5B326A" strokeWidth="2" fill="none"/>
        <path d="M17 22 C17 19 19 17 22 17 C25 17 27 19 27 22 C27 25 25 27 22 27 C19 27 17 25 17 22Z" stroke="#5B326A" strokeWidth="1.8" fill="none"/>
        <path d="M28 8 L29.5 12.5 L34 14 L29.5 15.5 L28 20 L26.5 15.5 L22 14 L26.5 12.5Z" fill="#5B326A" opacity="0.7"/>
      </svg>
    ),
  },
];

const STATS = [
  { value: "20K+", label: "Happy Patients" },
  { value: "98%", label: "Satisfaction Rate" },
  { value: "50+", label: "Treatments" },
];

export default function WhyChooseUs() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  const badgeY = useTransform(scrollYProgress, [0, 1], [0, -20]);
  const [imgIdx, setImgIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setImgIdx(p => (p + 1) % CLINIC_IMAGES.length), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden py-20 sm:py-28"
      style={{ background: "#FFFFFF" }}
    >
      {/* ── Ambient background blobs ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(223,170,94,0.06) 0%, transparent 65%)" }}/>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(91,50,106,0.06) 0%, transparent 65%)" }}/>
      </div>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">

        {/* ── Section header ── */}
        <div className="text-center mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-8" style={{ background: "#DFAA5E" }}/>
            <span className="text-[11px] font-bold uppercase tracking-[0.3em]" style={{ color: "#DFAA5E" }}>
              The Luminox Difference
            </span>
            <div className="h-px w-8" style={{ background: "#DFAA5E" }}/>
          </div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight"
            style={{ color: "#292E4B", fontFamily: "'Georgia', serif" }}
          >
            Why{" "}
            <span className="italic" style={{ color: "#DFAA5E" }}>Choose</span>
            {" "}Luminox?
          </h2>
          <p className="mt-4 text-sm sm:text-base max-w-lg mx-auto" style={{ color: "#414042" }}>
            We combine clinical excellence with genuine compassion — because great skin is a journey, not just a treatment.
          </p>
        </div>

        {/* ══════════════════════════════════════
            MAIN GRID — 3 columns on lg
            Col 1: reason cards (left)
            Col 2: image (center)
            Col 3: reason cards (right)
        ══════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px_1fr] gap-6 lg:gap-8 items-center">

          {/* ── LEFT column — reasons 01 & 02 ── */}
          <div className="flex flex-col gap-5">
            {REASONS.slice(0, 2).map((r, i) => (
              <motion.div
                key={r.number}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.12, duration: 0.6, ease: [0.22,1,0.36,1] }}
                whileHover={{ x: 6, transition: { duration: 0.25 } }}
                className="group relative rounded-2xl p-6 cursor-default transition-all duration-300"
                style={{
                  background: "#FFFFFF",
                  border: `1.5px solid ${r.accent}25`,
                  boxShadow: `0 4px 20px ${r.glow}`,
                }}
              >
                {/* Hover fill */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: `linear-gradient(135deg, ${r.glow}, transparent)` }}/>

                {/* Number + icon row */}
                <div className="flex items-start justify-between mb-4 relative z-10">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{ background: "linear-gradient(135deg, #292E4B 0%, #5B326A 100%)" }}
                  >
                    {r.icon}
                  </div>
                  <span
                    className="text-4xl font-extrabold leading-none"
                    style={{ color: `${r.accent}20`, fontFamily: "'Georgia', serif" }}
                  >
                    {r.number}
                  </span>
                </div>

                {/* Text */}
                <div className="relative z-10">
                  <h4
                    className="text-base font-extrabold mb-2"
                    style={{ color: "#292E4B" }}
                  >
                    {r.title}
                  </h4>
                  <p className="text-sm leading-relaxed" style={{ color: "#414042" }}>
                    {r.text}
                  </p>
                </div>

                {/* Bottom accent line */}
                <div
                  className="absolute bottom-0 left-6 right-6 h-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, ${r.accent}, transparent)` }}
                />
              </motion.div>
            ))}
          </div>

          {/* ── CENTER — image with floating badges ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.22,1,0.36,1] }}
            className="relative flex justify-center order-first lg:order-none"
          >
            {/* Decorative outer ring */}
            <div
              className="absolute inset-[-16px] rounded-[48px] pointer-events-none"
              style={{ border: "1.5px solid rgba(223,170,94,0.2)" }}
            />
            <div
              className="absolute inset-[-30px] rounded-[60px] pointer-events-none"
              style={{ border: "1px solid rgba(91,50,106,0.1)" }}
            />

            {/* Image with parallax */}
            <div className="relative w-full max-w-sm lg:max-w-none overflow-hidden rounded-[40px] shadow-2xl"
              style={{ boxShadow: "0 32px 80px rgba(41,46,75,0.25)" }}>
              <motion.div style={{ y: imageY, position: "relative", height: "560px" }}>
                {CLINIC_IMAGES.map((src, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={i}
                    src={src}
                    alt="Luminox Clinic"
                    className="w-full object-cover absolute inset-0 transition-opacity duration-1000"
                    style={{ height: "560px", opacity: i === imgIdx ? 1 : 0 }}
                  />
                ))}
                <div style={{ height: "560px" }} />
              </motion.div>
              {/* Image overlay gradient */}
              <div className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(41,46,75,0.5) 0%, transparent 50%)" }}/>
            </div>

            {/* ── Floating stats badge — top right ── */}
            <motion.div
              style={{
                y: badgeY,
                position: "absolute",
                top: "-20px",
                right: "-16px",
                zIndex: 20,
                borderRadius: "16px",
                padding: "16px 20px",
                background: "rgba(255,255,255,0.97)",
                backdropFilter: "blur(12px)",
                border: "1.5px solid rgba(223,170,94,0.3)",
                boxShadow: "0 8px 30px rgba(41,46,75,0.18)",
              }}
            >
              <div className="flex flex-col gap-3">
                {STATS.map((s) => (
                  <div key={s.label} className="flex items-center gap-3">
                    <p
                      className="text-xl font-extrabold leading-none w-14 shrink-0"
                      style={{ color: "#292E4B", fontFamily: "'Georgia', serif" }}
                    >
                      {s.value}
                    </p>
                    <p className="text-[10px] font-bold uppercase tracking-wider leading-tight" style={{ color: "#414042", opacity: 0.7 }}>
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ── Floating clinic tag — bottom left ── */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-5 -left-4 sm:left-[-20px] z-20 rounded-2xl px-5 py-4"
              style={{
                background: "linear-gradient(135deg, #292E4B 0%, #5B326A 100%)",
                boxShadow: "0 8px 30px rgba(41,46,75,0.3)",
              }}
            >
              <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color: "#DFAA5E" }}>
                NABH Accredited
              </p>
              <p className="text-white text-sm font-extrabold">Bangalore's #1 Skin Clinic</p>
            </motion.div>
          </motion.div>

          {/* ── RIGHT column — reasons 03 & 04 ── */}
          <div className="flex flex-col gap-5">
            {REASONS.slice(2).map((r, i) => (
              <motion.div
                key={r.number}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.12, duration: 0.6, ease: [0.22,1,0.36,1] }}
                whileHover={{ x: -6, transition: { duration: 0.25 } }}
                className="group relative rounded-2xl p-6 cursor-default transition-all duration-300"
                style={{
                  background: "#FFFFFF",
                  border: `1.5px solid ${r.accent}25`,
                  boxShadow: `0 4px 20px ${r.glow}`,
                }}
              >
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: `linear-gradient(135deg, ${r.glow}, transparent)` }}/>

                <div className="flex items-start justify-between mb-4 relative z-10">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                    style={{ background: "linear-gradient(135deg, #292E4B 0%, #5B326A 100%)" }}
                  >
                    {r.icon}
                  </div>
                  <span
                    className="text-4xl font-extrabold leading-none"
                    style={{ color: `${r.accent}20`, fontFamily: "'Georgia', serif" }}
                  >
                    {r.number}
                  </span>
                </div>

                <div className="relative z-10">
                  <h4 className="text-base font-extrabold mb-2" style={{ color: "#292E4B" }}>
                    {r.title}
                  </h4>
                  <p className="text-sm leading-relaxed" style={{ color: "#414042" }}>
                    {r.text}
                  </p>
                </div>

                <div
                  className="absolute bottom-0 left-6 right-6 h-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg, ${r.accent}, transparent)` }}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── Bottom CTA strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-16 sm:mt-20 rounded-3xl px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6"
          style={{
            background: "linear-gradient(135deg, #292E4B 0%, #5B326A 100%)",
            boxShadow: "0 16px 60px rgba(41,46,75,0.25)",
          }}
        >
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] mb-2" style={{ color: "#DFAA5E" }}>
              Ready to Begin?
            </p>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white" style={{ fontFamily: "'Georgia', serif" }}>
              Your best skin starts with{" "}
              <span className="italic" style={{ color: "#F9DB9F" }}>one conversation.</span>
            </h3>
          </div>
          <div className="flex gap-3 shrink-0">
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 text-xs font-extrabold uppercase tracking-widest rounded-sm transition-all duration-200"
              style={{ background: "#DFAA5E", color: "#292E4B" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#F9DB9F"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#DFAA5E"; }}
            >
              Book Free Consult
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </a>
            <a
              href="/about"
              className="inline-flex items-center gap-2 px-6 py-3 text-xs font-extrabold uppercase tracking-widest rounded-sm transition-all duration-200"
              style={{ border: "1.5px solid rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.85)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#D95CB9"; (e.currentTarget as HTMLElement).style.color = "#D95CB9"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.25)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.85)"; }}
            >
              Our Story
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
