// app/hair/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";

const hairServices = [
  {
    id: 1,
    title: "PRP Hair Restoration",
    subtitle: "Platelet Rich Plasma therapy",
    description:
      "PRP therapy uses your blood's natural growth factors to stimulate dormant hair follicles and promote new hair growth. Safe, effective, and completely natural — no chemicals or surgery involved.",
    tags: ["Hair Loss", "Natural Growth", "No Surgery", "3–6 Sessions"],
    icon: "✦",
  },
  {
    id: 2,
    title: "Laser Hair Removal",
    subtitle: "Permanent hair reduction",
    description:
      "Our Gentlelase system safely removes up to 80% of unwanted hair permanently after five monthly treatments. Equipped with a cryogen cooling system for skin protection during the process.",
    tags: ["80% Permanent", "5 Sessions", "All Body Areas", "Cooling System"],
    icon: "◈",
  },
  {
    id: 3,
    title: "Hair Loss Consultation",
    subtitle: "Expert diagnosis & treatment plan",
    description:
      "A thorough scalp and hair analysis by our dermatologist to identify the root cause of your hair loss — whether hormonal, nutritional, or stress-related — and create a personalised treatment plan.",
    tags: ["Diagnosis", "Personalised Plan", "Hormonal", "Nutritional"],
    icon: "◇",
  },
  {
    id: 4,
    title: "Scalp Micro-Needling",
    subtitle: "Collagen induction for scalp",
    description:
      "Micro-needling on the scalp stimulates collagen production and improves blood circulation to hair follicles, encouraging stronger, thicker hair growth over time.",
    tags: ["Scalp Health", "Collagen Boost", "Circulation", "Thicker Hair"],
    icon: "⬡",
  },
  {
    id: 5,
    title: "Nutrafol Hair Wellness",
    subtitle: "Science-backed nutraceuticals",
    description:
      "Clinically effective oral supplements that target the root causes of hair thinning — stress, hormones, nutrition, and metabolism — for visibly thicker, stronger, faster-growing hair.",
    tags: ["Supplements", "Root Cause", "Hormonal Balance", "Clinically Proven"],
    icon: "◉",
  },
];

const HeroImages = () => (
  <div className="grid grid-cols-3 gap-3 md:gap-4">
    {[
      {
        src: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&q=80",
        alt: "Hair restoration treatment",
      },
      {
        src: "https://images.unsplash.com/photo-1560869713-7d0a29430803?w=800&q=80",
        alt: "PRP hair therapy",
      },
      {
        src: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=800&q=80",
        alt: "Hair care clinic",
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

const ServiceCard = ({ service }: { service: (typeof hairServices)[0] }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative bg-white border border-[#292E4B]/10 rounded-sm p-6 md:p-8 transition-all duration-300 hover:border-[#DFAA5E]/50 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
    >
      <div
        className={`absolute top-0 left-0 h-[2px] bg-gradient-to-r from-[#DFAA5E] via-[#F9DB9F] to-[#D95CB9] rounded-t-sm transition-all duration-500 ${
          hovered ? "w-full" : "w-0"
        }`}
      />
      <div className="flex items-start justify-between mb-4">
        <div>
          <span className="block text-[#DFAA5E] text-2xl mb-2 leading-none" aria-hidden>
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
      <p className="text-[#414042]/80 text-sm leading-relaxed mb-5">
        {service.description}
      </p>
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

export default function HairPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="h-20 lg:h-24" />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-12 md:pb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-[1px] w-8 bg-gradient-to-r from-[#DFAA5E] to-[#D95CB9]" />
          <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#5B326A]">
            Luminox · Hair
          </span>
        </div>
        <div className="mb-8 md:mb-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#292E4B] uppercase tracking-tight leading-[1.05]">
            Hair
            <br />
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: "linear-gradient(90deg, #DFAA5E 0%, #D95CB9 100%)",
              }}
            >
              Treatments
            </span>
          </h1>
        </div>
        <HeroImages />
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3 lg:flex-col lg:items-start">
              <div className="h-[1px] w-8 bg-[#DFAA5E] shrink-0 lg:hidden" />
              <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#5B326A]">
                About Hair Care
              </span>
            </div>
            <div className="hidden lg:block mt-4 w-10 h-[2px] bg-gradient-to-r from-[#DFAA5E] to-[#D95CB9]" />
          </div>
          <div className="lg:col-span-9">
            <p className="text-[#414042] text-base md:text-lg leading-[1.8] mb-5">
              At Luminox, we understand that hair loss and thinning can deeply
              affect your confidence and wellbeing. Our hair specialists combine
              advanced clinical treatments with science-backed wellness solutions
              to address hair concerns at the root level.
            </p>
            <p className="text-[#414042]/70 text-sm md:text-base leading-[1.8]">
              From PRP therapy and scalp micro-needling to laser hair removal
              and Nutrafol supplements — every treatment is personalised to your
              hair type, lifestyle, and goals.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-[#292E4B]/15 to-transparent" />
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="flex items-center justify-between mb-8 md:mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-[1px] w-6 bg-[#DFAA5E]" />
              <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#5B326A]">
                Our Services
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#292E4B] uppercase tracking-wide">
              All Hair Treatments
            </h2>
          </div>
          <span className="text-[#292E4B]/20 text-4xl font-bold select-none hidden md:block">
            {hairServices.length} treatments
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
          {hairServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-8 md:pb-12">
        <div className="relative overflow-hidden rounded-sm bg-[#292E4B] px-8 md:px-12 py-8 md:py-10">
          <div
            className="absolute -top-16 -left-16 w-56 h-56 rounded-full opacity-20 blur-3xl pointer-events-none"
            style={{ background: "#DFAA5E" }}
          />
          <div
            className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full opacity-20 blur-3xl pointer-events-none"
            style={{ background: "#D95CB9" }}
          />
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <span className="block text-[11px] uppercase tracking-[0.25em] font-bold text-[#F9DB9F]/70 mb-2">
                Ready to begin?
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-tight">
                Book a Consultation
              </h2>
              <p className="text-white/50 text-sm mt-2 max-w-sm leading-relaxed">
                Speak with our hair specialists to find the right treatment for your hair type and goals.
              </p>
            </div>
            <div className="hidden md:block h-16 w-[1px] bg-white/10 shrink-0" />
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
                href="tel:+919963963137"
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