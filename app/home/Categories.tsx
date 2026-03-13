"use client";

import { motion, Variants } from "framer-motion";

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
    accentColor: "#DFAA5E",
    glowColor: "rgba(223,170,94,0.18)",
    borderColor: "rgba(223,170,94,0.35)",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <circle cx="24" cy="26" r="14" stroke="#DFAA5E" strokeWidth="2" />
        <circle cx="19" cy="24" r="2" fill="#DFAA5E" />
        <circle cx="29" cy="24" r="2" fill="#DFAA5E" />
        <path d="M19 30 Q24 34 29 30" stroke="#DFAA5E" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M8 10 L9.2 13 L12 14.2 L9.2 15.4 L8 18.4 L6.8 15.4 L4 14.2 L6.8 13Z" fill="#F9DB9F" />
        <path d="M38 6 L38.8 8.2 L41 9 L38.8 9.8 L38 12 L37.2 9.8 L35 9 L37.2 8.2Z" fill="#DFAA5E" opacity="0.7" />
      </svg>
    ),
  },
  {
    title: "Hair",
    subtitle: "Hair Care Treatment",
    description:
      "Advanced laser and nourishing treatments that restore strength, density, and natural shine from root to tip.",
    accentColor: "#D95CB9",
    glowColor: "rgba(217,92,185,0.18)",
    borderColor: "rgba(217,92,185,0.35)",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <path
          d="M24 6 C16 6 11 12 11 20 C11 26 14 31 19 33 L19 38 L29 38 L29 33 C34 31 37 26 37 20 C37 12 32 6 24 6Z"
          stroke="#D95CB9"
          strokeWidth="2"
        />
        <path d="M16 14 C14 10 18 7 21 9" stroke="#D95CB9" strokeWidth="1.5" />
        <path d="M24 8 C24 5 27 4 28 7" stroke="#D95CB9" strokeWidth="1.5" />
        <path d="M30 12 C33 9 36 11 34 15" stroke="#D95CB9" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: "You",
    subtitle: "Transforming You",
    description:
      "Bespoke aesthetic and wellness journeys that honour your individuality — because true beauty is uniquely yours.",
    accentColor: "#9B6DB5",
    glowColor: "rgba(91,50,106,0.20)",
    borderColor: "rgba(155,109,181,0.40)",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" className="w-10 h-10">
        <circle cx="24" cy="14" r="6" stroke="#9B6DB5" strokeWidth="2" />
        <path
          d="M12 38 C12 30 17 26 24 26 C31 26 36 30 36 38"
          stroke="#9B6DB5"
          strokeWidth="2"
        />
      </svg>
    ),
  },
];

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.18 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function TreatmentSection() {
  return (
    <section
      className="relative w-full py-20 sm:py-28 px-5 sm:px-8 overflow-hidden"
      style={{ background: "#FFFFFF" }}
    >
      <div className="relative max-w-6xl mx-auto">

        <div className="text-center mb-14 sm:mb-20">
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight"
            style={{ color: "#292E4B", fontFamily: "'Georgia', serif" }}
          >
            Skin. <span style={{ color: "#5B326A" }}>Hair.</span>{" "}
            <span className="italic" style={{ color: "#DFAA5E" }}>
              You.
            </span>
          </h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8"
        >
          {CATEGORIES.map((item, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.3, ease: "easeOut" } }}
              className="group relative flex flex-col items-center text-center rounded-2xl cursor-default"
              style={{
                background: "#FFFFFF",
                border: `1.5px solid ${item.borderColor}`,
                boxShadow: `0 4px 28px ${item.glowColor}`,
                padding: "2.5rem 2rem",
              }}
            >
              <div className="mb-5">{item.icon}</div>

              <h3
                className="text-4xl font-extrabold"
                style={{ color: item.accentColor }}
              >
                {item.title}
              </h3>

              <p className="text-xs uppercase tracking-widest mt-1">
                {item.subtitle}
              </p>

              <p className="mt-4 text-sm text-[#414042]">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}