"use client";

import { useState } from "react";
import Link from "next/link";

// ─── Brand Color Tokens ───────────────────────────────────────────────────────
// 60% DOMINANT  → #FFFFFF white
// 30% SECONDARY → #292E4B navy + #5B326A deep purple
// 10% ACCENT    → #DFAA5E gold  #D95CB9 pink  #F9DB9F light gold
// NEUTRAL       → #414042 — body copy

const laserServices = [
  {
    id: 1,
    title: "Fraxel DUAL",
    subtitle: "Two lasers in one system",
    description:
      "The Fraxel Dual uses fractionated technology with two wavelengths (1550nm & 1927nm) to treat age spots, acne scars, precancerous lesions, and sun damage — all with minimal downtime.",
    tags: ["Age Spots", "Acne Scars", "Pigmentation", "Sun Damage"],
    icon: "✦",
  },
  {
    id: 2,
    title: "Fraxel CO₂",
    subtitle: "Ablative resurfacing",
    description:
      "One of the best methods for improving sun damage, wrinkles and texture. By removing microscopic columns of tissue, collagen is stimulated and untouched skin enables rapid healing.",
    tags: ["Sun Damage", "Wrinkles", "Texture", "Resurfacing"],
    icon: "◈",
  },
  {
    id: 3,
    title: "Clear + Brilliant®",
    subtitle: "Zero downtime refresh",
    description:
      "Gentle fractionated laser for early texture, tone and pigmentary aging. Minimal to no downtime, suitable for all skin tones. Patients report smoother, more radiant, younger-looking skin.",
    tags: ["No Downtime", "All Skin Types", "Tone & Texture", "Radiance"],
    icon: "◇",
  },
  {
    id: 4,
    title: "Vbeam Perfecta",
    subtitle: "Vascular lesion laser",
    description:
      "The most powerful pulsed dye laser for anything vascular and red — rosacea, red scars, stretch marks, spider veins and hemangiomas. Selectively destroys blood vessels without harming surrounding tissue.",
    tags: ["Rosacea", "Spider Veins", "Red Scars", "Stretch Marks"],
    icon: "⬡",
  },
  {
    id: 5,
    title: "Laser for Age Spots",
    subtitle: "Targeted pigment removal",
    description:
      "Our Medlite laser system specifically targets sun freckles (lentigines) and brown growths (sebhorrheic keratoses) on the face, back of hands, and chest.",
    tags: ["Lentigines", "Brown Spots", "Face & Hands", "Chest"],
    icon: "◉",
  },
  {
    id: 6,
    title: "Laser for Redness",
    subtitle: "KTP Diolite laser",
    description:
      "The KTP Diolite laser is highly effective for rosacea, redness and broken capillaries. Minimal discomfort, only slight pinkness for a few hours to a day or two. Complications are extremely rare.",
    tags: ["Rosacea", "Capillaries", "Face & Neck", "Low Downtime"],
    icon: "◎",
  },
  {
    id: 7,
    title: "Laser Hair Removal",
    subtitle: "Permanent hair reduction",
    description:
      "Our Gentlelase system safely removes up to 80% of hair permanently after five monthly treatments. Includes a cryogen spray cooling system for skin protection during the process.",
    tags: ["80% Permanent", "5 Sessions", "All Body Areas", "Safe"],
    icon: "✧",
  },
  {
    id: 8,
    title: "Laser Tattoo Removal",
    subtitle: "Medlite Nd:Yag system",
    description:
      "Our Medlite Nd:Yag laser can effectively treat most tattoos in 4 to 12 sessions. Works on a wide range of ink colors and skin types. Consultation with the doctor helps gauge expectations.",
    tags: ["4–12 Sessions", "Most Colors", "All Skin Types", "Expert Consult"],
    icon: "⬧",
  },
];

const HeroImages = () => (
  <div className="grid grid-cols-3 gap-3 md:gap-4">
    {[
      {
        src: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&q=80",
        alt: "Laser skin treatment in clinic",
      },
      {
        src: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&q=80",
        alt: "Dermatology laser procedure",
      },
      {
        src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80",
        alt: "Skin care treatment",
      },
    ].map((img, i) => (
      <div
        key={i}
        className="relative overflow-hidden rounded-sm"
        style={{ aspectRatio: "3/4" }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#292E4B]/30 via-transparent to-transparent" />
        <img
          src={img.src}
          alt={img.alt}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
      </div>
    ))}
  </div>
);

const ServiceCard = ({ service }: { service: (typeof laserServices)[0] }) => {
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
          <span
            className="block text-[#DFAA5E] text-2xl mb-2 leading-none"
            aria-hidden
          >
            {service.icon}
          </span>
          <h3 className="text-[#292E4B] text-lg md:text-xl font-bold uppercase tracking-wide leading-tight">
            {service.title}
          </h3>
          <p className="text-[#5B326A] text-[12px] uppercase tracking-widest font-medium mt-0.5">
            {service.subtitle}
          </p>
        </div>
        <span
          className={`text-[#292E4B]/20 text-4xl font-bold leading-none select-none transition-colors duration-300 ${hovered ? "text-[#DFAA5E]/30" : ""}`}
        >
          {String(service.id).padStart(2, "0")}
        </span>
      </div>

      {/* Description */}
      <p className="text-[#414042]/80 text-sm leading-relaxed mb-5">
        {service.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {service.tags.map((tag) => (
          <span
            key={tag}
            className="text-[10px] uppercase tracking-widest font-bold px-3 py-1 bg-[#292E4B]/5 text-[#292E4B]/70 rounded-full border border-[#292E4B]/8 group-hover:bg-[#DFAA5E]/10 group-hover:text-[#292E4B] group-hover:border-[#DFAA5E]/30 transition-colors duration-300"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default function LaserTreatmentsPage() {
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
            Luminox · Skin Treatments
          </span>
        </div>

        {/* Heading */}
        <div className="mb-8 md:mb-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#292E4B] uppercase tracking-tight leading-[1.05]">
            Laser
            <br />
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #DFAA5E 0%, #D95CB9 100%)",
              }}
            >
              Treatments
            </span>
          </h1>
        </div>

        {/* 3-Image Grid */}
        <HeroImages />
      </section>

      {/* ── Writeup / Intro ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left: Label */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3 lg:flex-col lg:items-start">
              <div className="h-[1px] w-8 bg-[#DFAA5E] shrink-0 lg:hidden" />
              <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#5B326A]">
                About Our Lasers
              </span>
            </div>
            <div className="hidden lg:block mt-4 w-10 h-[2px] bg-gradient-to-r from-[#DFAA5E] to-[#D95CB9]" />
          </div>

          {/* Right: Content */}
          <div className="lg:col-span-9">
            <p className="text-[#414042] text-base md:text-lg leading-[1.8] mb-5">
              At Luminox, we offer the most advanced laser systems available in
              dermatology today. Our board-certified specialists use
              fractionated, ablative, and vascular laser technologies to treat a
              wide spectrum of skin conditions — from early signs of aging and
              sun damage, to acne scars, rosacea, unwanted hair, and beyond.
            </p>
            <p className="text-[#414042]/70 text-sm md:text-base leading-[1.8]">
              Every treatment plan is personalised to your skin type, concerns,
              and lifestyle. We combine clinical precision with a commitment to
              natural, beautiful results — with minimal downtime wherever
              possible. Explore our full range of laser treatments below.
            </p>
          </div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-[#292E4B]/15 to-transparent" />
      </div>

      {/* ── Services Grid ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8 md:mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-[1px] w-6 bg-[#DFAA5E]" />
              <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#5B326A]">
                Our Services
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#292E4B] uppercase tracking-wide">
              All Laser Treatments
            </h2>
          </div>
          <span className="text-[#292E4B]/20 text-4xl font-bold select-none hidden md:block">
            {laserServices.length} treatments
          </span>
        </div>

        {/* 2×2 / responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-4 md:gap-5">
          {laserServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      {/* ── Book Consultation ── */}
<section className="max-w-7xl mx-auto px-4 sm:px-6 pb-8 md:pb-12">
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

    {/* ── Two column layout ── */}
    <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">

      {/* Left: Content */}
      <div className="text-center sm:text-left">
        <span className="block text-[11px] uppercase tracking-[0.25em] font-bold text-[#F9DB9F]/70 mb-2">
          Ready to begin?
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-tight">
          Book a Consultation
        </h2>
        <p className="text-white/50 text-sm mt-2 max-w-sm leading-relaxed">
          Speak with our specialists to find the right treatment for your skin type and goals.
        </p>
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