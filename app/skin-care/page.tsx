"use client";

import Link from "next/link";

// ─── Brand Color Tokens ───────────────────────────────────────────────────────
// 60% DOMINANT  → #FFFFFF white
// 30% SECONDARY → #292E4B navy + #5B326A deep purple
// 10% ACCENT    → #DFAA5E gold  #D95CB9 pink  #F9DB9F light gold
// NEUTRAL       → #414042 — body copy

const skincareBrands = [
  {
    id: 1,
    name: "ALASTIN",
    tagline: "by Galderma",
    description:
      "Clinically proven formulas that work with your skin's biology to prepare, protect, and enhance treatment results.",
    shopLink: "https://www.alastin.com",
    shopLabel: "Shop Alastin Skin Care",
    accent: "#292E4B",
    svg: (
      <svg viewBox="0 0 220 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[200px]">
        {/* Hexagon molecule icon */}
        <g stroke="#292E4B" strokeWidth="2" fill="none">
          <polygon points="28,10 38,10 43,18 38,26 28,26 23,18" />
          <polygon points="48,26 58,26 63,34 58,42 48,42 43,34" />
          <polygon points="8,26 18,26 23,34 18,42 8,42 3,34" />
          <line x1="38" y1="26" x2="43" y2="34" />
          <line x1="23" y1="26" x2="18" y2="34" />
        </g>
        {/* ALASTIN text */}
        <text x="75" y="28" fontFamily="Georgia, serif" fontSize="22" fontWeight="700" fill="#292E4B" letterSpacing="3">ALASTIN</text>
        <text x="82" y="46" fontFamily="Georgia, serif" fontSize="11" fill="#414042" letterSpacing="2">by GALDERMA</text>
      </svg>
    ),
  },
  {
    id: 2,
    name: "SkinCeuticals",
    tagline: "Advanced Skincare",
    description:
      "Pharmaceutical-grade antioxidants, retinols, and acids backed by decades of research for visible skin transformation.",
    shopLink: null,
    shopLabel: null,
    accent: "#1A1A1A",
    svg: (
      <svg viewBox="0 0 220 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[220px]">
        {/* S icon box */}
        <rect x="2" y="8" width="52" height="64" rx="2" fill="none" stroke="#1A1A1A" strokeWidth="2.5"/>
        <text x="8" y="52" fontFamily="Georgia, serif" fontSize="42" fontWeight="700" fill="#1A1A1A">S</text>
        {/* Brand name */}
        <text x="64" y="36" fontFamily="Georgia, serif" fontSize="18" fontWeight="700" fill="#1A1A1A" letterSpacing="1">SKIN</text>
        <text x="64" y="58" fontFamily="Georgia, serif" fontSize="18" fontWeight="700" fill="#1A1A1A" letterSpacing="1">CEUTICALS</text>
      </svg>
    ),
  },
  {
    id: 3,
    name: "SkinMedica",
    tagline: "Science-Driven Skincare",
    description:
      "Award-winning formulas developed by leading dermatologists, targeting fine lines, discolouration, and texture.",
    shopLink: null,
    shopLabel: null,
    accent: "#1A1A1A",
    svg: (
      <svg viewBox="0 0 240 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[240px]">
        <text x="0" y="42" fontFamily="Arial, sans-serif" fontSize="32" fontWeight="800" fill="#1A1A1A" letterSpacing="2">SKINMEDICA</text>
        <text x="2" y="56" fontFamily="Arial, sans-serif" fontSize="9" fill="#888" letterSpacing="4">®</text>
      </svg>
    ),
  },
  {
    id: 4,
    name: "EltaMD",
    tagline: "Skincare",
    description:
      "Dermatologist-recommended sunscreens and skincare products formulated to protect and nourish all skin types.",
    shopLink: null,
    shopLabel: null,
    accent: "#C0392B",
    svg: (
      <svg viewBox="0 0 200 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[180px]">
        <text x="0" y="46" fontFamily="Arial, sans-serif" fontSize="40" fontWeight="300" fill="#1A1A1A" letterSpacing="-1">elta</text>
        <text x="86" y="46" fontFamily="Arial, sans-serif" fontSize="40" fontWeight="800" fill="#C0392B" letterSpacing="-1">MD</text>
        <text x="2" y="64" fontFamily="Arial, sans-serif" fontSize="11" fill="#888" letterSpacing="4">SKINCARE</text>
        <text x="132" y="64" fontFamily="Arial, sans-serif" fontSize="9" fill="#888">®</text>
      </svg>
    ),
  },
  {
    id: 5,
    name: "Nutrafol",
    tagline: "Hair Wellness",
    description:
      "Clinically effective nutraceuticals that target the root causes of hair thinning for visibly thicker, stronger hair.",
    shopLink: null,
    shopLabel: null,
    accent: "#3ABFB1",
    svg: (
      <svg viewBox="0 0 200 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[160px]">
        {/* Concentric circles */}
        <circle cx="100" cy="56" r="50" stroke="#3ABFB1" strokeWidth="2.5" fill="none"/>
        <circle cx="100" cy="56" r="40" stroke="#3ABFB1" strokeWidth="2.5" fill="none"/>
        <circle cx="100" cy="56" r="30" stroke="#3ABFB1" strokeWidth="2.5" fill="none"/>
        <circle cx="100" cy="56" r="20" stroke="#3ABFB1" strokeWidth="2.5" fill="none"/>
        <circle cx="100" cy="56" r="10" stroke="#3ABFB1" strokeWidth="2.5" fill="none"/>
        {/* Brand name inside */}
        <text x="100" y="60" fontFamily="Arial, sans-serif" fontSize="9" fontWeight="600" fill="#1A1A1A" textAnchor="middle" letterSpacing="1">NUTRAFOL</text>
        <text x="100" y="110" fontFamily="Arial, sans-serif" fontSize="9" fill="#888" textAnchor="middle" letterSpacing="2">HAIR WELLNESS</text>
      </svg>
    ),
  },
  {
    id: 6,
    name: "Biocorneum",
    tagline: "Advanced Scar Treatment",
    description:
      "The only FDA-cleared silicone scar treatment with SPF 30, clinically proven to soften, flatten, and fade scars.",
    shopLink: null,
    shopLabel: null,
    accent: "#5B326A",
    svg: (
      <svg viewBox="0 0 240 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[230px]">
        {/* Dot cluster icon */}
        <circle cx="10" cy="20" r="5" fill="#5B326A"/>
        <circle cx="24" cy="14" r="5" fill="#5B326A"/>
        <circle cx="24" cy="30" r="5" fill="#8B5EA0" opacity="0.7"/>
        <circle cx="10" cy="36" r="4" fill="#5B326A" opacity="0.5"/>
        {/* Brand name */}
        <text x="38" y="30" fontFamily="Arial, sans-serif" fontSize="22" fontWeight="700" fill="#1A1A1A" letterSpacing="1">BIOCORNEUM</text>
        <text x="39" y="46" fontFamily="Arial, sans-serif" fontSize="9" fill="#888" letterSpacing="1">®</text>
      </svg>
    ),
  },
];

const BrandCard = ({ brand }: { brand: (typeof skincareBrands)[0] }) => (
  <div className="group relative bg-white border border-[#292E4B]/10 rounded-sm p-8 md:p-12 flex flex-col items-center justify-between gap-6 transition-all duration-300 hover:border-[#DFAA5E]/40 hover:shadow-md min-h-[260px]">
    {/* Top accent line on hover */}
    <div className="absolute top-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#DFAA5E] via-[#F9DB9F] to-[#D95CB9] rounded-t-sm transition-all duration-500 group-hover:w-full" />

    {/* Logo SVG area */}
    <div className="flex-1 flex items-center justify-center w-full py-4">
      {brand.svg}
    </div>

    {/* Description — visible on hover via opacity */}
    <p className="text-[#414042]/70 text-xs text-center leading-relaxed max-w-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute bottom-16 left-6 right-6">
      {brand.description}
    </p>

    {/* Shop button (only for Alastin) */}
    {brand.shopLink && brand.shopLabel && (
      <a
        href={brand.shopLink}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center px-6 py-2.5 bg-[#292E4B] text-white text-[11px] font-bold uppercase tracking-widest rounded-sm hover:bg-[#DFAA5E] hover:text-[#292E4B] transition-colors duration-200"
      >
        {brand.shopLabel}
      </a>
    )}
  </div>
);

const BrandCardFull = ({ brand }: { brand: (typeof skincareBrands)[0] }) => (
  <div className="group relative bg-white border border-[#292E4B]/10 rounded-sm overflow-hidden transition-all duration-300 hover:border-[#DFAA5E]/40 hover:shadow-md">
    {/* Top accent line on hover */}
    <div className="absolute top-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#DFAA5E] via-[#F9DB9F] to-[#D95CB9] rounded-t-sm transition-all duration-500 group-hover:w-full" />

    {/* Logo area */}
    <div className="flex items-center justify-center min-h-[200px] md:min-h-[240px] p-10 md:p-14">
      {brand.svg}
    </div>

    {/* Divider */}
    <div className="h-[1px] bg-[#292E4B]/8 mx-8" />

    {/* Description + CTA */}
    <div className="px-8 py-6 flex flex-col items-center gap-4">
      <p className="text-[#414042]/70 text-xs text-center leading-relaxed max-w-xs">
        {brand.description}
      </p>
      {brand.shopLink && brand.shopLabel && (
        <a
          href={brand.shopLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-6 py-2.5 bg-[#292E4B] text-white text-[11px] font-bold uppercase tracking-widest rounded-sm hover:bg-[#DFAA5E] hover:text-[#292E4B] transition-colors duration-200"
        >
          {brand.shopLabel}
          <svg className="w-3 h-3 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      )}
    </div>
  </div>
);

export default function SkinCarePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* ── Page Top Spacer (for fixed header) ── */}
      <div className="h-20 lg:h-24" />

      {/* ── Hero Section ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-6 md:pb-10">
        {/* Page Label */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-[1px] w-8 bg-gradient-to-r from-[#DFAA5E] to-[#D95CB9]" />
          <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#5B326A]">
            Luminox · Skin Care
          </span>
        </div>

        {/* Heading */}
        <div className="mb-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#292E4B] uppercase tracking-tight leading-[1.05]">
            Skin
            <br />
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #DFAA5E 0%, #D95CB9 100%)",
              }}
            >
              Care
            </span>
          </h1>
        </div>
      </section>

      {/* ── Writeup / Intro ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-10 md:pb-14">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left: Label */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3 lg:flex-col lg:items-start">
              <div className="h-[1px] w-8 bg-[#DFAA5E] shrink-0 lg:hidden" />
              <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#5B326A]">
                Our Brands
              </span>
            </div>
            <div className="hidden lg:block mt-4 w-10 h-[2px] bg-gradient-to-r from-[#DFAA5E] to-[#D95CB9]" />
          </div>

          {/* Right: Content */}
          <div className="lg:col-span-9">
            <p className="text-[#414042] text-base md:text-lg leading-[1.8] mb-5">
              The following brands have been hand-selected by our specialists
              for their science-backed formulas and proven clinical results. We
              carry these products in our office, and you are welcome to sample
              them at your next visit.
            </p>
            <p className="text-[#414042]/70 text-sm md:text-base leading-[1.8]">
              Each product line has been carefully evaluated for safety,
              efficacy, and compatibility with our treatment protocols — so you
              can trust what you're putting on your skin.
            </p>
          </div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-[#292E4B]/15 to-transparent" />
      </div>

      {/* ── Brands Section Header ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-[1px] w-6 bg-[#DFAA5E]" />
              <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#5B326A]">
                Featured Brands
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#292E4B] uppercase tracking-wide">
              Our Curated Product Lines
            </h2>
          </div>
          <span className="text-[#292E4B]/20 text-4xl font-bold select-none hidden md:block">
            {skincareBrands.length} brands
          </span>
        </div>
      </section>

      {/* ── Brands Grid ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 md:pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
          {skincareBrands.map((brand) => (
            <BrandCardFull key={brand.id} brand={brand} />
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