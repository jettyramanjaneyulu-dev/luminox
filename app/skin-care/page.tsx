"use client";

import { useState } from "react";
import Link from "next/link";

// ─── Brand Color Tokens ───────────────────────────────────────────────────────
// 60% DOMINANT  → #FFFFFF white
// 30% SECONDARY → #292E4B navy + #5B326A deep purple
// 10% ACCENT    → #DFAA5E gold  #D95CB9 pink  #F9DB9F light gold
// NEUTRAL       → #414042 — body copy

// ─── Skin Care Services Data ──────────────────────────────────────────────────
const skinCareServices = [
  {
    id: 1,
    icon: "🧴",
    title: "Medical Facials & Skin Maintenance",
    subtitle: "Routine care and skin health",
    description: "Maintain healthy, refreshed skin with customized treatments:",
    bullets: [
      "Deep cleansing & detox facials",
      "Hydration-focused facials",
      "Brightening & tone-enhancing facials",
      "Acne control facials",
      "Skin polishing & exfoliation",
    ],
    result: "Best for routine care and maintaining skin health",
  },
  {
    id: 2,
    icon: "🧪",
    title: "Chemical Peels for Skin Renewal",
    subtitle: "Renew and repair skin scientifically",
    description: "Scientifically designed treatments to renew and repair skin:",
    bullets: [
      "Superficial exfoliation peels",
      "Acne-focused peeling treatments",
      "Sensitive skin-compatible peels",
      "Pigmentation and tone-correcting peels",
    ],
    result: "Improves acne, uneven tone, texture, and dullness",
  },
  {
    id: 3,
    icon: "🌟",
    title: "Advanced Skin Rejuvenation Treatments",
    subtitle: "Hydration, repair, and glow",
    description: "Modern therapies for hydration, repair, and glow:",
    bullets: [
      "Deep hydration therapies",
      "Oxygen-based infusion treatments",
      "Carbon-assisted rejuvenation procedures",
      "Light-based therapy facials",
    ],
    result: "Ideal for instant glow and skin revitalization",
  },
  {
    id: 4,
    icon: "🔍",
    title: "Acne Treatment & Oil Control",
    subtitle: "Long-term control and prevention",
    description: "Comprehensive solutions for all types of acne:",
    bullets: [
      "Customized acne treatment plans",
      "Professional extraction procedures",
      "Oil control and balancing therapies",
      "Preventive acne care programs",
    ],
    result: "Focus on long-term control and prevention",
  },
  {
    id: 5,
    icon: "🌈",
    title: "Pigmentation & Skin Tone Correction",
    subtitle: "Clear, balanced, radiant skin tone",
    description: "Restore clarity and even skin tone:",
    bullets: [
      "Pigmentation correction therapies",
      "Tone-evening treatments",
      "Under-eye dark circle care",
      "Lip tone correction",
    ],
    result: "Clear, balanced, radiant skin tone",
  },
  {
    id: 6,
    icon: "⏳",
    title: "Anti-Aging & Skin Rejuvenation",
    subtitle: "Youthful, firm, and healthy skin",
    description: "Maintain youthful, firm, and healthy skin:",
    bullets: [
      "Wrinkle reduction therapies",
      "Volume restoration procedures",
      "Regenerative skin treatments",
      "Skin tightening solutions",
    ],
    result: "Targets fine lines, wrinkles, and skin laxity",
  },
];

// ─── Hero Images ──────────────────────────────────────────────────────────────
const HeroImages = () => (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
    {[
      {
        src: "services/skin/skin1.png",
        alt: "Advanced skin care treatment",
      },
      {
        src: "services/skin/skin2.png",
        alt: "Medical facial procedure",
      },
      {
        src: "services/skin/skin3.png",
        alt: "Skin rejuvenation treatment",
      },
    ].map((img, i) => (
      <div
        key={i}
        className="relative overflow-hidden rounded-sm w-full"
        style={{ height: "320px" }}
      >
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#292E4B]/30 via-transparent to-transparent" />
        <img
          src={img.src}
          alt={img.alt}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
      </div>
    ))}
  </div>
);

// ─── Service Card ─────────────────────────────────────────────────────────────
const ServiceCard = ({ item }: { item: (typeof skinCareServices)[0] }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative bg-white border border-[#292E4B]/10 rounded-sm p-6 md:p-8 transition-all duration-300 hover:border-[#DFAA5E]/50 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
    >
      {/* Top accent line on hover */}
      <div
        className={`absolute top-0 left-0 h-[2px] bg-gradient-to-r from-[#DFAA5E] via-[#F9DB9F] to-[#D95CB9] rounded-t-sm transition-all duration-500 ${hovered ? "w-full" : "w-0"}`}
      />

      {/* Icon + Title row */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <span className="block text-[#DFAA5E] text-2xl mb-2 leading-none" aria-hidden>
            {item.icon}
          </span>
          <h3 className="text-[#292E4B] text-lg md:text-xl font-bold uppercase tracking-wide leading-tight">
            {item.title}
          </h3>
          <p className="text-[#5B326A] text-[12px] uppercase tracking-widest font-medium mt-0.5">
            {item.subtitle}
          </p>
        </div>
        <span
          className={`text-[#292E4B]/20 text-4xl font-bold leading-none select-none transition-colors duration-300 ${hovered ? "text-[#DFAA5E]/30" : ""}`}
        >
          {String(item.id).padStart(2, "0")}
        </span>
      </div>

      {/* Description */}
      <p className="text-[#414042]/80 text-sm leading-relaxed mb-3">
        {item.description}
      </p>

      {/* Bullet points */}
      <ul className="mb-5 space-y-1.5">
        {item.bullets.map((point, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-[#414042]/75 leading-relaxed">
            <span className="mt-[3px] shrink-0 w-[5px] h-[5px] rounded-full bg-[#DFAA5E] group-hover:bg-[#D95CB9] transition-colors duration-300" />
            {point}
          </li>
        ))}
      </ul>

      {/* Result pill */}
      <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest font-bold text-[#5B326A] bg-[#5B326A]/5 border border-[#5B326A]/15 px-3 py-1.5 rounded-full group-hover:bg-[#DFAA5E]/10 group-hover:text-[#292E4B] group-hover:border-[#DFAA5E]/30 transition-colors duration-300">
        <span className="text-[#DFAA5E]">→</span>
        {item.result}
      </span>
    </div>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function SkinCarePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* ── Page Top Spacer (for fixed header) ── */}
      <div className="h-20 lg:h-24" />

      {/* ── Hero Section ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-12 md:pb-16">
        {/* Page Label */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-[1px] w-8 bg-gradient-to-r from-[#DFAA5E] to-[#D95CB9]" />
          <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#5B326A]">
            Luminox · Skin Care
          </span>
        </div>

        {/* Heading */}
        <div className="mb-8 md:mb-10">
          <h1 className="text-4xl md:text-5xl lg:text-4xl font-bold text-[#292E4B] uppercase tracking-tight leading-[1.05]">
            LUMINOX – Skin
            <br />
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: "linear-gradient(90deg, #DFAA5E 0%, #D95CB9 100%)",
              }}
            >
              Advanced Skin Care for Healthy, Clear & Radiant Skin
            </span>
          </h1>
        </div>

        {/* 3-Image Grid */}
        <HeroImages />
      </section>

      {/* ── Intro / About ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left: Label */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3 lg:flex-col lg:items-start">
              <div className="h-[1px] w-8 bg-[#DFAA5E] shrink-0 lg:hidden" />
              <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#5B326A]">
                About Our Skin Care
              </span>
            </div>
            <div className="hidden lg:block mt-4 w-10 h-[2px] bg-gradient-to-r from-[#DFAA5E] to-[#D95CB9]" />
          </div>

          {/* Right: Content */}
          <div className="lg:col-span-9">
            <p className="text-[#414042] text-base md:text-lg leading-[1.8] mb-5">
              <strong>Healthy skin is built through the right diagnosis, scientific care, and consistency.</strong>
            </p>
            <p className="text-[#414042]/70 text-sm md:text-base leading-[1.8] mb-4">
              At <strong>LUMINOX</strong> we provide advanced, dermatologist-guided skin care treatments designed to restore your skin's natural clarity, balance, and radiance.
            </p>
            <p className="text-[#414042]/70 text-sm md:text-base leading-[1.8]">
              Whether you are dealing with acne, pigmentation, dull skin, uneven tone, or early signs of aging, our treatments are safe, personalized, and result-oriented.
            </p>
          </div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-[#292E4B]/15 to-transparent" />
      </div>

      {/* ── Our Skin Care Services ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8 md:mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-[1px] w-6 bg-[#DFAA5E]" />
              <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#5B326A]">
                Our Skin Care Services
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#292E4B] uppercase tracking-wide">
              🔬 Our Skin Care Services
            </h2>
          </div>
          <span className="text-[#292E4B]/20 text-4xl font-bold select-none hidden md:block">
            {skinCareServices.length} services
          </span>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-4 md:gap-5">
          {skinCareServices.map((item) => (
            <ServiceCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-[#292E4B]/15 to-transparent" />
      </div>

      {/* ── Personalized Programs + Preventive Care (side by side) ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">

          {/* ── Personalized Skin Care Programs ── */}
          <div className="group relative bg-white border border-[#292E4B]/10 rounded-sm p-6 md:p-8 transition-all duration-300 hover:border-[#DFAA5E]/50 hover:shadow-lg hover:-translate-y-1">
            <div className="absolute top-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#DFAA5E] via-[#F9DB9F] to-[#D95CB9] rounded-t-sm transition-all duration-500 group-hover:w-full" />

            <div className="mb-5">
              <span className="block text-[#DFAA5E] text-2xl mb-2 leading-none" aria-hidden>💎</span>
              <h3 className="text-[#292E4B] text-lg md:text-xl font-bold uppercase tracking-wide leading-tight">
                Personalized Skin Care Programs
              </h3>
              <p className="text-[#5B326A] text-[12px] uppercase tracking-widest font-medium mt-0.5">
                Every skin is unique
              </p>
            </div>

            <p className="text-[#414042]/80 text-sm leading-relaxed mb-4">
              At LUMINOX, treatments are tailored to your individual concerns:
            </p>

            <ul className="space-y-2">
              {[
                "Acne care programs (6–12 weeks)",
                "Pigmentation correction programs",
                "Anti-aging maintenance plans",
                "Pre-event and special skin care programs",
              ].map((point, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-[#414042]/75 leading-relaxed">
                  <span className="mt-[5px] shrink-0 w-[5px] h-[5px] rounded-full bg-[#DFAA5E] group-hover:bg-[#D95CB9] transition-colors duration-300" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* ── Preventive Skin Care & Maintenance ── */}
          <div className="group relative bg-white border border-[#292E4B]/10 rounded-sm p-6 md:p-8 transition-all duration-300 hover:border-[#DFAA5E]/50 hover:shadow-lg hover:-translate-y-1">
            <div className="absolute top-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#DFAA5E] via-[#F9DB9F] to-[#D95CB9] rounded-t-sm transition-all duration-500 group-hover:w-full" />

            <div className="mb-5">
              <span className="block text-[#DFAA5E] text-2xl mb-2 leading-none" aria-hidden>🛡️</span>
              <h3 className="text-[#292E4B] text-lg md:text-xl font-bold uppercase tracking-wide leading-tight">
                Preventive Skin Care & Maintenance
              </h3>
              <p className="text-[#5B326A] text-[12px] uppercase tracking-widest font-medium mt-0.5">
                Long-term healthy skin
              </p>
            </div>

            <ul className="mb-5 space-y-2">
              {[
                "Medical-grade skincare guidance",
                "Daily sun protection strategies",
                "Regular maintenance treatments",
                "Sensitive skin care management",
              ].map((point, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-[#414042]/75 leading-relaxed">
                  <span className="mt-[5px] shrink-0 w-[5px] h-[5px] rounded-full bg-[#DFAA5E] group-hover:bg-[#D95CB9] transition-colors duration-300" />
                  {point}
                </li>
              ))}
            </ul>

            <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest font-bold text-[#5B326A] bg-[#5B326A]/5 border border-[#5B326A]/15 px-3 py-1.5 rounded-full group-hover:bg-[#DFAA5E]/10 group-hover:text-[#292E4B] group-hover:border-[#DFAA5E]/30 transition-colors duration-300">
              <span className="text-[#DFAA5E]">→</span>
              Consistent care is key to long-term healthy skin
            </span>
          </div>

        </div>
      </section>

      {/* ── Divider ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-[#292E4B]/15 to-transparent" />
      </div>

      {/* ── Skin Care Treatments (Looking for) ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="group relative bg-white border border-[#292E4B]/10 rounded-sm p-6 md:p-8 transition-all duration-300 hover:border-[#DFAA5E]/50 hover:shadow-lg">
          <div className="absolute top-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#DFAA5E] via-[#F9DB9F] to-[#D95CB9] rounded-t-sm transition-all duration-500 group-hover:w-full" />

          <div className="grid md:grid-cols-12 gap-8 items-start">
            {/* Left label */}
            <div className="md:col-span-3">
              <span className="block text-[#DFAA5E] text-2xl mb-2 leading-none" aria-hidden>📍</span>
              <h3 className="text-[#292E4B] text-lg md:text-xl font-bold uppercase tracking-wide leading-tight">
                Skin Care Treatments
              </h3>
              <p className="text-[#5B326A] text-[12px] uppercase tracking-widest font-medium mt-0.5">
                If you are looking for
              </p>
            </div>

            {/* Right bullets */}
            <div className="md:col-span-9">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                {[
                  "Professional skin care treatments",
                  "Acne and pigmentation solutions",
                  "Skin brightening and rejuvenation",
                  "Preventive dermatology care",
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-[#414042]/75 leading-relaxed">
                    <span className="mt-[5px] shrink-0 w-[5px] h-[5px] rounded-full bg-[#DFAA5E] group-hover:bg-[#D95CB9] transition-colors duration-300" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-[#292E4B]/15 to-transparent" />
      </div>

      {/* ── Book Consultation ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12 pb-8 md:pb-12">
        <div className="relative overflow-hidden rounded-sm bg-[#292E4B] px-8 md:px-12 py-8 md:py-10">

          {/* Decorative gradient blobs */}
          <div
            className="absolute -top-16 -left-16 w-56 h-56 rounded-full opacity-20 blur-3xl pointer-events-none"
            style={{ background: "#DFAA5E" }}
          />
          <div
            className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full opacity-20 blur-3xl pointer-events-none"
            style={{ background: "#D95CB9" }}
          />

          {/* Two column layout */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">

            {/* Left: Content */}
            <div className="text-center sm:text-left">
              <span className="block text-[11px] uppercase tracking-[0.25em] font-bold text-[#F9DB9F]/70 mb-2">
                Ready to begin?
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-tight">
                Book Your Consultation
              </h2>
              <p className="text-white/50 text-sm mt-2 max-w-sm leading-relaxed">
                Experience advanced skin care treatments for clearer, smoother, and healthier skin.
              </p>
              <div className="mt-3 flex flex-col gap-1">
                <span className="text-[#F9DB9F]/60 text-[11px] uppercase tracking-widest font-bold flex items-center gap-2">
                  <span className="text-[#DFAA5E]">→</span> Visit LUMINOX – Skin | Hair | Laser
                </span>
                <span className="text-[#F9DB9F]/60 text-[11px] uppercase tracking-widest font-bold flex items-center gap-2">
                  <span className="text-[#DFAA5E]">→</span> Begin Your Skin Transformation Today
                </span>
              </div>
            </div>

            {/* Divider — visible only on md+ */}
            <div className="hidden md:block h-16 w-[1px] bg-white/10 shrink-0" />

            {/* Right: Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#DFAA5E] text-[#292E4B] text-[11px] font-bold uppercase tracking-widest rounded-sm hover:bg-[#F9DB9F] transition-colors duration-200"
              >
                Book Consultation
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>

              <Link
                href="tel:+91630991733"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-white/20 text-white text-[11px] font-bold uppercase tracking-widest rounded-sm hover:border-white/50 hover:bg-white/5 transition-all duration-200"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call Us
              </Link>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}