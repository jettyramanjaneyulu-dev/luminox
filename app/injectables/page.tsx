"use client";

import { useState } from "react";
import Link from "next/link";

// ─── Brand Color Tokens ───────────────────────────────────────────────────────
// 60% DOMINANT  → #FFFFFF white
// 30% SECONDARY → #292E4B navy + #5B326A deep purple
// 10% ACCENT    → #DFAA5E gold  #D95CB9 pink  #F9DB9F light gold
// NEUTRAL       → #414042 — body copy

const injectableServices = [
  {
    id: 1,
    title: "BOTOX® Jaw Reduction",
    subtitle: "Non-surgical facial slimming",
    description:
      "Botox injected into the masseter muscle reduces facial width, softening a square jaw into a more heart-shaped appearance. Dr. Kim tailors treatment strength for the longest-lasting, most natural results.",
    tags: ["Jaw Slimming", "Masseter", "Lower Face", "Natural Look"],
    icon: "✦",
  },
  {
    id: 2,
    title: "BOTOX® Cosmetic",
    subtitle: "Wrinkle reduction & prevention",
    description:
      "The most commonly performed cosmetic procedure. Minimally invasive injections reduce forehead lines, crow's feet, and lines between the eyes — with advanced areas including chin, neck, and lower face.",
    tags: ["Forehead Lines", "Crow's Feet", "Bunny Lines", "Neck"],
    icon: "◈",
  },
  {
    id: 3,
    title: "Nefertiti Lift",
    subtitle: "Non-surgical jawline lift",
    description:
      "Botox injected along the jawline and neck relaxes the platysma muscle, enhancing the jaw, softening jowls, and lifting the corners of the mouth — a minimally invasive alternative to surgery.",
    tags: ["Jawline", "Jowls", "Neck Lift", "Mini Lift Effect"],
    icon: "◇",
  },
  {
    id: 4,
    title: "BOTOX® Hyperhidrosis",
    subtitle: "Excessive sweating treatment",
    description:
      "Botox blocks acetylcholine to safely reduce excessive sweating in underarms, hands, and feet for six months or longer — with minimal side effects and no impact on body temperature regulation.",
    tags: ["Underarms", "Hands & Feet", "6+ Months", "Minimal Side Effects"],
    icon: "⬡",
  },
  {
    id: 5,
    title: "BOTOX® for Migraines",
    subtitle: "FDA-approved chronic migraine relief",
    description:
      "FDA-approved Botox injections around the head and neck prevent chronic migraines at 12-week intervals. Dr. Kim customises each treatment to target the patient's specific migraine focus areas.",
    tags: ["FDA Approved", "12-Week Cycle", "Chronic Migraine", "Preventive"],
    icon: "◉",
  },
  {
    id: 6,
    title: "BOTOX® for TMD/TMJ",
    subtitle: "Jaw pain & grinding relief",
    description:
      "Botox placed in the masseter muscle relaxes the jaw, stops persistent grinding and clenching, and relieves radiating discomfort through the jaw, neck, and lower face — without bulky oral appliances.",
    tags: ["TMJ", "Teeth Grinding", "Jaw Pain", "No Appliance"],
    icon: "◎",
  },
  {
    id: 7,
    title: "Radiesse®",
    subtitle: "Next-generation dermal filler",
    description:
      "Calcium hydroxylapatite microspheres in a gel solution treat deep facial lines, smile lines, marionette lines, and nasolabial folds. Also ideal for hand rejuvenation and soft tissue loss.",
    tags: ["Deep Lines", "Smile Lines", "Hand Rejuvenation", "No Allergy Test"],
    icon: "✧",
  },
  {
    id: 8,
    title: "JUVÉDERM®",
    subtitle: "Hyaluronic acid volume filler",
    description:
      "FDA-approved dermal filler that restores volume and fullness with smooth, natural-looking results lasting eight months or longer. Frequently used on lips, nasolabial folds, and lines around the mouth.",
    tags: ["Lips", "Nasolabial Folds", "8+ Months", "No Pre-Testing"],
    icon: "⬧",
  },
  {
    id: 9,
    title: "JUVÉDERM® VOLUMA",
    subtitle: "Cheek volume restoration",
    description:
      "The first and only filler proven to last up to 2 years in the cheek area. VYCROSS technology provides a high concentration of crosslinked hyaluronic acid to correct age-related volume loss.",
    tags: ["Cheeks", "Up to 2 Years", "VYCROSS Tech", "Volume Loss"],
    icon: "✦",
  },
  {
    id: 10,
    title: "JUVÉDERM VOLLURE™ XC",
    subtitle: "Nasolabial & marionette lines",
    description:
      "Revolutionary injectable gel that visibly reduces moderate to severe wrinkles around the nose and mouth. Immediate results with an average longevity of one to two years.",
    tags: ["Marionette Lines", "Nasolabial Folds", "1–2 Years", "Immediate"],
    icon: "◈",
  },
  {
    id: 11,
    title: "Belotero®",
    subtitle: "Collagen-stimulating filler",
    description:
      "Replenishes hyaluronic acid to restore volume, improve skin elasticity, and reduce facial wrinkles. Quick injections with minimal downtime and immediate results — one of the leading dermal fillers worldwide.",
    tags: ["Collagen Boost", "Elasticity", "No Pretesting", "Immediate Results"],
    icon: "◇",
  },
];

const HeroImages = () => (
  <div className="grid grid-cols-3 gap-3 md:gap-4">
    {[
      {
        src: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80",
        alt: "Injectable treatment at clinic",
      },
      {
        src: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80",
        alt: "Facial filler procedure",
      },
      {
        src: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80",
        alt: "Botox cosmetic treatment",
      },
    ].map((img, i) => (
      <div
        key={i}
        className="relative overflow-hidden rounded-sm"
        style={{ aspectRatio: "3/4" }}
      >
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

const ServiceCard = ({
  service,
}: {
  service: (typeof injectableServices)[0];
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative bg-white border border-[#292E4B]/10 rounded-sm p-6 md:p-8 transition-all duration-300 hover:border-[#DFAA5E]/50 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
    >
      {/* Top accent line on hover */}
      <div
        className={`absolute top-0 left-0 h-[2px] bg-gradient-to-r from-[#DFAA5E] via-[#F9DB9F] to-[#D95CB9] rounded-t-sm transition-all duration-500 ${
          hovered ? "w-full" : "w-0"
        }`}
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
          className={`text-[#292E4B]/20 text-4xl font-bold leading-none select-none transition-colors duration-300 ${
            hovered ? "text-[#DFAA5E]/30" : ""
          }`}
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

export default function InjectablesPage() {
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
            Luminox · Injectables
          </span>
        </div>

        {/* Heading */}
        <div className="mb-8 md:mb-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#292E4B] uppercase tracking-tight leading-[1.05]">
            Injectables
            <br />
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, #DFAA5E 0%, #D95CB9 100%)",
              }}
            >
              & Fillers
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
                About Injectables
              </span>
            </div>
            <div className="hidden lg:block mt-4 w-10 h-[2px] bg-gradient-to-r from-[#DFAA5E] to-[#D95CB9]" />
          </div>

          {/* Right: Content */}
          <div className="lg:col-span-9">
            <p className="text-[#414042] text-base md:text-lg leading-[1.8] mb-5">
              At Luminox, our injectable treatments are performed by
              board-certified specialists who combine medical expertise with a
              refined aesthetic eye. Whether you're looking to soften wrinkles,
              restore lost volume, define your jawline, or address a medical
              concern like migraines or excessive sweating — we have a
              personalised solution for you.
            </p>
            <p className="text-[#414042]/70 text-sm md:text-base leading-[1.8]">
              We offer the full spectrum of BOTOX® treatments and premium dermal
              fillers including JUVÉDERM®, Radiesse®, and Belotero®. Every
              treatment is tailored to your unique facial anatomy with a focus
              on natural, refreshed results — never overdone.
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
              All Injectable Treatments
            </h2>
          </div>
          <span className="text-[#292E4B]/20 text-4xl font-bold select-none hidden md:block">
            {injectableServices.length} treatments
          </span>
        </div>

        {/* 2-column responsive grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
          {injectableServices.map((service) => (
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