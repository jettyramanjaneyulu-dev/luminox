"use client";

import { motion } from "framer-motion";

// ─── Brand Colors (60-30-10) ───────────────────────────────────────────────────
// 60% → #FFFFFF white bg
// 30% → #292E4B navy  #5B326A purple  — headings, borders, structure
// 10% → #DFAA5E gold  #D95CB9 pink  #F9DB9F light gold — accents, icons, hovers
// Neutral → #414042 body text
// ──────────────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  {
    title: "Skin",
    subtitle: "Skin Care Treatments",
    description:
      "Clinically proven therapies that restore clarity, even tone, and luminous texture — tailored to your skin's unique needs.",
    accentColor: "#DFAA5E",           // gold
    glowColor: "rgba(223,170,94,0.18)",
    borderColor: "rgba(223,170,94,0.35)",
    // Custom SVG — face / skin sparkle icon
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        {/* Face outline */}
        <circle cx="24" cy="26" r="14" stroke="#DFAA5E" strokeWidth="2" fill="none" />
        {/* Eyes */}
        <circle cx="19" cy="24" r="2" fill="#DFAA5E" />
        <circle cx="29" cy="24" r="2" fill="#DFAA5E" />
        {/* Smile */}
        <path d="M19 30 Q24 34 29 30" stroke="#DFAA5E" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        {/* Sparkle top-left */}
        <path d="M8 10 L9.2 13 L12 14.2 L9.2 15.4 L8 18.4 L6.8 15.4 L4 14.2 L6.8 13Z" fill="#F9DB9F" />
        {/* Sparkle top-right small */}
        <path d="M38 6 L38.8 8.2 L41 9 L38.8 9.8 L38 12 L37.2 9.8 L35 9 L37.2 8.2Z" fill="#DFAA5E" opacity="0.7" />
        {/* Leaf / glow arc */}
        <path d="M24 12 C20 8 14 10 14 14 C14 16 17 17 19 15" stroke="#DFAA5E" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />
      </svg>
    ),
  },
  {
    title: "Hair",
    subtitle: "Hair Care Treatment",
    description:
      "Advanced laser and nourishing treatments that restore strength, density, and natural shine from root to tip.",
    accentColor: "#D95CB9",           // pink
    glowColor: "rgba(217,92,185,0.18)",
    borderColor: "rgba(217,92,185,0.35)",
    // Custom SVG — hair strand / laser comb icon
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        {/* Head silhouette */}
        <path
          d="M24 6 C16 6 11 12 11 20 C11 26 14 31 19 33 L19 38 L29 38 L29 33 C34 31 37 26 37 20 C37 12 32 6 24 6Z"
          stroke="#D95CB9" strokeWidth="2" fill="none"
        />
        {/* Hair lines flowing */}
        <path d="M16 14 C14 10 18 7 21 9" stroke="#D95CB9" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <path d="M24 8 C24 5 27 4 28 7" stroke="#D95CB9" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <path d="M30 12 C33 9 36 11 34 15" stroke="#D95CB9" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        {/* Shine sparkle */}
        <path d="M39 6 L40 8.5 L42.5 9.5 L40 10.5 L39 13 L38 10.5 L35.5 9.5 L38 8.5Z" fill="#D95CB9" opacity="0.8" />
        {/* Small dot accent */}
        <circle cx="9" cy="18" r="1.5" fill="#D95CB9" opacity="0.5" />
      </svg>
    ),
  },
  {
    title: "You",
    subtitle: "Transforming You",
    description:
      "Bespoke aesthetic and wellness journeys that honour your individuality — because true beauty is uniquely yours.",
    accentColor: "#9B6DB5",           // purple
    glowColor: "rgba(91,50,106,0.20)",
    borderColor: "rgba(155,109,181,0.40)",
    // Custom SVG — person with transformation glow icon
    icon: (
      <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
        {/* Person body */}
        <circle cx="24" cy="14" r="6" stroke="#9B6DB5" strokeWidth="2" fill="none" />
        <path d="M12 38 C12 30 17 26 24 26 C31 26 36 30 36 38" stroke="#9B6DB5" strokeWidth="2" strokeLinecap="round" fill="none" />
        {/* Transformation arcs */}
        <path d="M6 24 C4 18 6 10 12 7" stroke="#9B6DB5" strokeWidth="1.5" strokeLinecap="round" fill="none" strokeDasharray="3 2" opacity="0.6" />
        <path d="M42 24 C44 18 42 10 36 7" stroke="#9B6DB5" strokeWidth="1.5" strokeLinecap="round" fill="none" strokeDasharray="3 2" opacity="0.6" />
        {/* Sparkle left */}
        <path d="M5 32 L5.8 34.5 L8.5 35.5 L5.8 36.5 L5 39 L4.2 36.5 L1.5 35.5 L4.2 34.5Z" fill="#D95CB9" opacity="0.8" />
        {/* Sparkle right */}
        <path d="M43 32 L43.8 34.5 L46.5 35.5 L43.8 36.5 L43 39 L42.2 36.5 L39.5 35.5 L42.2 34.5Z" fill="#DFAA5E" opacity="0.8" />
      </svg>
    ),
  },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function TreatmentSection() {
  return (
    <section
      className="relative w-full py-20 sm:py-28 px-5 sm:px-8 overflow-hidden"
      // 60% → white background
      style={{ background: "#FFFFFF" }}
    >
      {/* ── Subtle background decorations (30% navy/purple tones) ── */}
      <div
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(91,50,106,0.07) 0%, transparent 70%)" }}
      />
      <div
        className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(41,46,75,0.07) 0%, transparent 70%)" }}
      />

      <div className="relative max-w-6xl mx-auto">

        {/* ── Section Header ── */}
        <div className="text-center mb-14 sm:mb-20">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-8 bg-[#DFAA5E]" />
            <span
              className="text-[11px] font-bold uppercase tracking-[0.3em]"
              style={{ color: "#DFAA5E" }}
            >
              Our Specialities
            </span>
            <div className="h-px w-8 bg-[#DFAA5E]" />
          </div>

          {/* Heading — 30% navy */}
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight"
            style={{ color: "#292E4B", fontFamily: "'Georgia', serif" }}
          >
            Skin.{" "}
            <span style={{ color: "#5B326A" }}>Hair.</span>{" "}
            <span
              className="italic"
              style={{ color: "#DFAA5E" }}
            >
              You.
            </span>
          </h2>

          {/* Sub */}
          <p
            className="mt-4 text-sm sm:text-base max-w-xl mx-auto leading-relaxed"
            style={{ color: "#414042" }}
          >
            Three pillars of transformative care — delivered with clinical precision
            and a personal touch at every step.
          </p>
        </div>

        {/* ── Cards Grid ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8"
        >
          {CATEGORIES.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.3, ease: "easeOut" } }}
              className="group relative flex flex-col items-center text-center rounded-2xl cursor-default"
              style={{
                // 60% white card bg
                background: "#FFFFFF",
                border: `1.5px solid ${item.borderColor}`,
                boxShadow: `0 4px 28px ${item.glowColor}`,
                padding: "2.5rem 2rem",
              }}
            >
              {/* Hover fill overlay */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                style={{ background: `linear-gradient(145deg, ${item.glowColor}, transparent)` }}
              />

              {/* ── Icon Ring ── */}
              <div className="relative mb-7 z-10">
                {/* Outer glow ring */}
                <div
                  className="absolute inset-0 rounded-full blur-xl opacity-60 group-hover:opacity-90 transition-opacity duration-500"
                  style={{ background: item.glowColor, width: 80, height: 80, margin: "auto" }}
                />
                {/* Icon container */}
                <div
                  className="relative w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-400 group-hover:scale-110"
                  style={{
                    // 30% navy tinted bg for icon box
                    background: `linear-gradient(135deg, #292E4B 0%, #5B326A 100%)`,
                    boxShadow: `0 8px 24px ${item.glowColor}`,
                  }}
                >
                  {item.icon}
                </div>
              </div>

              {/* ── Title ── */}
              <div className="z-10 space-y-1 mb-4">
                <h3
                  className="text-4xl sm:text-5xl font-extrabold leading-none"
                  style={{
                    fontFamily: "'Georgia', serif",
                    color: item.accentColor,
                  }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-[11px] font-bold uppercase tracking-[0.2em]"
                  style={{ color: "#292E4B" }}
                >
                  {item.subtitle}
                </p>
              </div>

              {/* ── Divider line ── */}
              <div
                className="w-10 h-[2px] mb-4 rounded-full z-10 transition-all duration-300 group-hover:w-16"
                style={{ background: item.accentColor }}
              />

              {/* ── Description ── */}
              <p
                className="z-10 text-sm leading-relaxed"
                style={{ color: "#414042" }}
              >
                {item.description}
              </p>

              {/* ── Learn more link ── */}
              <a
                href={`/${item.title.toLowerCase()}`}
                className="z-10 mt-6 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest transition-colors duration-200"
                style={{ color: item.accentColor }}
              >
                Explore
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Bottom CTA strip ── */}
        <div className="mt-14 sm:mt-20 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/laser-treatments"
            className="inline-flex items-center gap-2 px-8 py-3 text-xs font-extrabold uppercase tracking-widest transition-all duration-200 rounded-sm"
            style={{ background: "#292E4B", color: "#FFFFFF" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#DFAA5E"; (e.currentTarget as HTMLElement).style.color = "#292E4B"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#292E4B"; (e.currentTarget as HTMLElement).style.color = "#FFFFFF"; }}
          >
            View All Treatments
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 text-xs font-extrabold uppercase tracking-widest transition-all duration-200 rounded-sm"
            style={{ border: "1.5px solid #5B326A", color: "#5B326A" }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#D95CB9"; (e.currentTarget as HTMLElement).style.color = "#D95CB9"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "#5B326A"; (e.currentTarget as HTMLElement).style.color = "#5B326A"; }}
          >
            Book a Consultation
          </a>
        </div>
      </div>
    </section>
  );
}