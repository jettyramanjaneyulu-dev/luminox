"use client";

import { useState } from "react";
import Link from "next/link";

// ─── Brand Color Tokens ───────────────────────────────────────────────────────
// 60% DOMINANT  → #FFFFFF white
// 30% SECONDARY → #292E4B navy + #5B326A deep purple
// 10% ACCENT    → #DFAA5E gold  #D95CB9 pink  #F9DB9F light gold
// NEUTRAL       → #414042 — body copy

// ─── Hair Care Services Data ──────────────────────────────────────────────────
const hairCareServices = [
  {
    id: 1,
    icon: "💧",
    title: "Hair Fall Control Treatments",
    subtitle: "Reduce shedding, strengthen roots",
    description: "Designed to reduce excessive hair fall and strengthen hair roots:",
    bullets: [
      "Hair fall assessment and diagnosis",
      "Root-strengthening therapies",
      "Nutritional and scalp correction treatments",
      "Preventive hair fall programs",
    ],
    result: "Focus on reducing hair shedding and improving hair strength",
  },
  {
    id: 2,
    icon: "🌱",
    title: "Hair Growth & Regrowth Treatments",
    subtitle: "Stimulate density and regrowth",
    description: "Stimulate natural hair growth and improve density:",
    bullets: [
      "Scalp stimulation therapies",
      "Growth activation treatments",
      "Regenerative hair therapies",
      "Hair density improvement programs",
    ],
    result: "Helps improve thickness and promote regrowth",
  },
  {
    id: 3,
    icon: "🧴",
    title: "Dandruff & Scalp Treatments",
    subtitle: "Restore a healthy scalp environment",
    description: "Restore scalp health and eliminate recurring issues:",
    bullets: [
      "Dandruff and flaky scalp treatment",
      "Itchy scalp and irritation control",
      "Scalp detox and cleansing therapies",
      "Oil balance and hydration treatments",
    ],
    result: "Essential for maintaining a healthy scalp environment",
  },
  {
    id: 4,
    icon: "🧪",
    title: "Advanced Hair Therapies",
    subtitle: "Long-term hair restoration",
    description: "Target deeper causes of hair thinning and hair loss:",
    bullets: [
      "Regenerative scalp treatments",
      "Follicle-strengthening procedures",
      "Hair root nourishment therapies",
      "Combination treatment protocols",
    ],
    result: "Designed for long-term hair restoration",
  },
  {
    id: 5,
    icon: "🔍",
    title: "Hair Thinning & Pattern Hair Loss Management",
    subtitle: "Early intervention for better outcomes",
    description: "Early intervention gives better outcomes:",
    bullets: [
      "Hair thinning assessment",
      "Pattern hair loss management",
      "Preventive and maintenance programs",
      "Hair density preservation",
    ],
    result: "Slows progression and supports healthier hair",
  },
  {
    id: 6,
    icon: "✨",
    title: "Hair Texture & Quality Improvement",
    subtitle: "Healthier, smoother, manageable hair",
    description: "Enhance overall hair appearance and manageability:",
    bullets: [
      "Hair strengthening treatments",
      "Damage repair therapies",
      "Frizz control solutions",
      "Shine and smoothness enhancement",
    ],
    result: "Healthier, smoother, more manageable hair",
  },
];

// ─── Why Choose Data ──────────────────────────────────────────────────────────
const whyChoose = [
  { icon: "◈", point: "Personalized scalp and hair analysis" },
  { icon: "◉", point: "Evidence-based medical treatments" },
  { icon: "◎", point: "Focus on root cause, not just symptoms" },
  { icon: "✦", point: "Advanced hair restoration techniques" },
  { icon: "◇", point: "Long-term hair health and maintenance plans" },
  { icon: "✧", point: "Safe, hygienic, and patient-focused care" },
];

// ─── Hero Image (single) ──────────────────────────────────────────────────────
const HeroImage = () => (
  <div
    className="relative overflow-hidden rounded-sm w-full"
    style={{ height: "420px" }}
  >
    <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#292E4B]/30 via-transparent to-transparent" />
    <img
      src="services/hair/hair.png"
      alt="Advanced hair care and restoration treatment"
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
    />
  </div>
);
const whyChooseLuminox = [
  {
    id: 1,
    icon: "🔬",
    title: "Why Choose LUMINOX",
    subtitle: "Excellence in Hair Care",
    description: "Our core philosophy for delivering superior results:",
    bullets: [
      "Personalized scalp and hair analysis",
      "Evidence-based medical treatments",
      "Focus on root cause, not just symptoms",
      "Advanced hair restoration techniques",
      "Long-term hair health and maintenance",
      "Safe, hygienic, and patient-focused care",
    ],
    result: "Scientifically backed approach to hair health",
  },
  {
    id: 2,
    icon: "💧",
    title: "Hair Fall Control Treatments",
    subtitle: "Reduce shedding, strengthen roots",
    description: "Designed to reduce excessive hair fall and strengthen hair roots:",
    bullets: [
      "Hair fall assessment and diagnosis",
      "Root-strengthening therapies",
      "Nutritional and scalp correction treatments",
      "Preventive hair fall programs",
    ],
    result: "Focus on reducing hair shedding and improving hair strength",
  },
  {
    id: 3,
    icon: "🌱",
    title: "Hair Growth & Regrowth Treatments",
    subtitle: "Stimulate density and regrowth",
    description: "Stimulate natural hair growth and improve density:",
    bullets: [
      "Scalp stimulation therapies",
      "Growth activation treatments",
      "Regenerative hair therapies",
      "Hair density improvement programs",
    ],
    result: "Helps improve thickness and promote regrowth",
  },
  {
    id: 4,
    icon: "🧴",
    title: "Dandruff & Scalp Treatments",
    subtitle: "Restore a healthy scalp environment",
    description: "Restore scalp health and eliminate recurring issues:",
    bullets: [
      "Dandruff and flaky scalp treatment",
      "Itchy scalp and irritation control",
      "Scalp detox and cleansing therapies",
      "Oil balance and hydration treatments",
    ],
    result: "Essential for maintaining a healthy scalp environment",
  },
  {
    id: 5,
    icon: "🧪",
    title: "Advanced Hair Therapies",
    subtitle: "Long-term hair restoration",
    description: "Target deeper causes of hair thinning and hair loss:",
    bullets: [
      "Regenerative scalp treatments",
      "Follicle-strengthening procedures",
      "Hair root nourishment therapies",
      "Combination treatment protocols",
    ],
    result: "Designed for long-term hair restoration",
  },
  {
    id: 6,
    icon: "🔍",
    title: "Hair Thinning & Pattern Hair Loss Management",
    subtitle: "Early intervention for better outcomes",
    description: "Early intervention gives better outcomes:",
    bullets: [
      "Hair thinning assessment",
      "Pattern hair loss management",
      "Preventive and maintenance programs",
      "Hair density preservation",
    ],
    result: "Slows progression and supports healthier hair",
  },
  {
    id: 7,
    icon: "✨",
    title: "Hair Texture & Quality Improvement",
    subtitle: "Healthier, smoother, manageable hair",
    description: "Enhance overall hair appearance and manageability:",
    bullets: [
      "Hair strengthening treatments",
      "Damage repair therapies",
      "Frizz control solutions",
      "Shine and smoothness enhancement",
    ],
    result: "Healthier, smoother, more manageable hair",
  },
  {
    id: 8,
    icon: "👨‍⚕️",
    title: "Hair Transplantation",
    subtitle: "Permanent Hair Restoration",
    description: "Permanent solution for advanced hair loss and baldness:",
    bullets: [
      "Natural hairline design",
      "Advanced follicle extraction & implantation",
      "Minimal downtime procedures",
      "High graft survival and natural results",
    ],
    result: "Natural-looking, long-lasting hair restoration",
  },
  {
    id: 9,
    icon: "💎",
    title: "Personalized Hair Care Programs",
    subtitle: "Tailored to individual needs",
    description: "Every plan is customized for your specific hair journey:",
    bullets: [
      "Hair fall control programs",
      "Hair regrowth and restoration plans",
      "Scalp treatment programs",
      "Pre- and post-hair transplant care",
    ],
    result: "Customized solutions for every individual",
  },
  {
    id: 10,
    icon: "🛡️",
    title: "Preventive Hair Care & Maintenance",
    subtitle: "Consistency is key to long-term health",
    description: "Ongoing support to maintain your hair results:",
    bullets: [
      "Medical-grade hair care guidance",
      "Scalp hygiene and care routines",
      "Nutritional support advice",
      "Regular follow-up and maintenance",
    ],
    result: "Ensuring long-term hair health and density",
  },
];
// ─── Service Card ─────────────────────────────────────────────────────────────
const ServiceCard = ({ item }: { item: (typeof hairCareServices)[0] }) => {
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
export default function HairCarePage() {
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
            Luminox · Hair Care
          </span>
        </div>

        {/* Heading */}
        <div className="mb-8 md:mb-10">
          <h1 className="text-4xl md:text-5xl lg:text-4xl font-bold text-[#292E4B] uppercase tracking-tight leading-[1.05]">
            LUMINOX – Hair
            <br />
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: "linear-gradient(90deg, #DFAA5E 0%, #D95CB9 100%)",
              }}
            >
              Advanced Hair Care & Hair Restoration for Healthy, Strong & Fuller Hair
            </span>
          </h1>
        </div>

        {/* Single Hero Image */}
        <HeroImage />
      </section>

      {/* ── Intro / About ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left: Label */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3 lg:flex-col lg:items-start">
              <div className="h-[1px] w-8 bg-[#DFAA5E] shrink-0 lg:hidden" />
              <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#5B326A]">
                About Our Hair Care
              </span>
            </div>
            <div className="hidden lg:block mt-4 w-10 h-[2px] bg-gradient-to-r from-[#DFAA5E] to-[#D95CB9]" />
          </div>

          {/* Right: Content */}
          <div className="lg:col-span-9">
            <p className="text-[#414042] text-base md:text-lg leading-[1.8] mb-5">
              <strong>Healthy hair begins with a healthy scalp, proper diagnosis, and the right treatment approach.</strong>
            </p>
            <p className="text-[#414042]/70 text-sm md:text-base leading-[1.8] mb-4">
              At <strong>LUMINOX – Skin | Hair | Laser,</strong> we provide advanced, dermatologist-guided hair care and restoration treatments, including non-surgical therapies and hair transplantation, to help you regain confidence and natural hair growth.
            </p>
            <p className="text-[#414042]/70 text-sm md:text-base leading-[1.8]">
              Whether you are experiencing hair fall, thinning, dandruff, scalp issues, or patterned hair loss, our treatments are safe, personalized, and result-oriented.
            </p>
          </div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-[#292E4B]/15 to-transparent" />
      </div>

  {/* ── NEW BOXES DESIGN (11 Boxes Grid) ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        

        {/* 11 Boxes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-6">
          {whyChooseLuminox.map((item) => (
            <ServiceCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-[#292E4B]/15 to-transparent" />
      </div>

      {/* ── Our Hair Care Services ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8 md:mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-[1px] w-6 bg-[#DFAA5E]" />
              <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#5B326A]">
                Our Hair Care & Restoration Services
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#292E4B] uppercase tracking-wide">
              🔬 Our Hair Care Solutions
            </h2>
          </div>
          <span className="text-[#292E4B]/20 text-4xl font-bold select-none hidden md:block">
            {hairCareServices.length} services
          </span>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-2 gap-4 md:gap-5">
          {hairCareServices.map((item) => (
            <ServiceCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-[#292E4B]/15 to-transparent" />
      </div>

      {/* ── Hair Transplantation ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="group relative bg-white border border-[#292E4B]/10 rounded-sm p-6 md:p-10 transition-all duration-300 hover:border-[#DFAA5E]/50 hover:shadow-lg">
          <div className="absolute top-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#DFAA5E] via-[#F9DB9F] to-[#D95CB9] rounded-t-sm transition-all duration-500 group-hover:w-full" />

          {/* Header */}
          <div className="mb-6">
            <span className="block text-[#DFAA5E] text-2xl mb-2 leading-none" aria-hidden>🔬</span>
            <h3 className="text-[#292E4B] text-xl md:text-2xl font-bold uppercase tracking-wide leading-tight">
              Hair Transplantation
            </h3>
            <p className="text-[#5B326A] text-[12px] uppercase tracking-widest font-medium mt-0.5">
              Permanent & Natural Hair Restoration
            </p>
            <p className="text-[#414042]/70 text-sm md:text-base leading-[1.8] mt-4 max-w-3xl">
              Hair transplantation is a permanent solution for advanced hair loss and baldness, designed to restore natural hair growth and hairline.
            </p>
          </div>

          {/* Two columns: What We Offer + Suitable For */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {/* What We Offer */}
            <div>
              <p className="text-[#292E4B] text-[11px] uppercase tracking-widest font-bold mb-3 flex items-center gap-2">
                <span className="text-[#DFAA5E]">✔</span> What We Offer
              </p>
              <ul className="space-y-2">
                {[
                  "Natural hairline design",
                  "Advanced follicle extraction and implantation techniques",
                  "Minimal downtime procedures",
                  "High graft survival and natural results",
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-[#414042]/75 leading-relaxed">
                    <span className="mt-[5px] shrink-0 w-[5px] h-[5px] rounded-full bg-[#DFAA5E] group-hover:bg-[#D95CB9] transition-colors duration-300" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {/* Suitable For */}
            <div>
              <p className="text-[#292E4B] text-[11px] uppercase tracking-widest font-bold mb-3 flex items-center gap-2">
                <span className="text-[#DFAA5E]">✔</span> Suitable For
              </p>
              <ul className="space-y-2">
                {[
                  "Male and female pattern baldness",
                  "Receding hairline",
                  "Thinning crown area",
                  "Beard and eyebrow restoration (if required)",
                ].map((point, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-[#414042]/75 leading-relaxed">
                    <span className="mt-[5px] shrink-0 w-[5px] h-[5px] rounded-full bg-[#DFAA5E] group-hover:bg-[#D95CB9] transition-colors duration-300" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Result pill */}
          <div className="mt-6">
            <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest font-bold text-[#5B326A] bg-[#5B326A]/5 border border-[#5B326A]/15 px-3 py-1.5 rounded-full group-hover:bg-[#DFAA5E]/10 group-hover:text-[#292E4B] group-hover:border-[#DFAA5E]/30 transition-colors duration-300">
              <span className="text-[#DFAA5E]">→</span>
              Focus: Natural-looking, long-lasting hair restoration
            </span>
          </div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-[#292E4B]/15 to-transparent" />
      </div>

      {/* ── Personalized Programs + Preventive Care ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">

          {/* ── Personalized Hair Care Programs ── */}
          <div className="group relative bg-white border border-[#292E4B]/10 rounded-sm p-6 md:p-8 transition-all duration-300 hover:border-[#DFAA5E]/50 hover:shadow-lg hover:-translate-y-1">
            <div className="absolute top-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#DFAA5E] via-[#F9DB9F] to-[#D95CB9] rounded-t-sm transition-all duration-500 group-hover:w-full" />

            <div className="mb-5">
              <span className="block text-[#DFAA5E] text-2xl mb-2 leading-none" aria-hidden>💎</span>
              <h3 className="text-[#292E4B] text-lg md:text-xl font-bold uppercase tracking-wide leading-tight">
                Personalized Hair Care Programs
              </h3>
              <p className="text-[#5B326A] text-[12px] uppercase tracking-widest font-medium mt-0.5">
                Every plan tailored to individual needs
              </p>
            </div>

            <p className="text-[#414042]/80 text-sm leading-relaxed mb-4">
              At LUMINOX, every plan is tailored to individual needs:
            </p>

            <ul className="space-y-2">
              {[
                "Hair fall control programs",
                "Hair regrowth and restoration plans",
                "Scalp treatment programs",
                "Pre- and post-hair transplant care",
              ].map((point, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-[#414042]/75 leading-relaxed">
                  <span className="mt-[5px] shrink-0 w-[5px] h-[5px] rounded-full bg-[#DFAA5E] group-hover:bg-[#D95CB9] transition-colors duration-300" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* ── Preventive Hair Care & Maintenance ── */}
          <div className="group relative bg-white border border-[#292E4B]/10 rounded-sm p-6 md:p-8 transition-all duration-300 hover:border-[#DFAA5E]/50 hover:shadow-lg hover:-translate-y-1">
            <div className="absolute top-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#DFAA5E] via-[#F9DB9F] to-[#D95CB9] rounded-t-sm transition-all duration-500 group-hover:w-full" />

            <div className="mb-5">
              <span className="block text-[#DFAA5E] text-2xl mb-2 leading-none" aria-hidden>🛡️</span>
              <h3 className="text-[#292E4B] text-lg md:text-xl font-bold uppercase tracking-wide leading-tight">
                Preventive Hair Care & Maintenance
              </h3>
              <p className="text-[#5B326A] text-[12px] uppercase tracking-widest font-medium mt-0.5">
                Consistency is key to long-term hair health
              </p>
            </div>

            <ul className="mb-5 space-y-2">
              {[
                "Medical-grade hair care guidance",
                "Scalp hygiene and care routines",
                "Nutritional support advice",
                "Regular follow-up and maintenance",
              ].map((point, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm text-[#414042]/75 leading-relaxed">
                  <span className="mt-[5px] shrink-0 w-[5px] h-[5px] rounded-full bg-[#DFAA5E] group-hover:bg-[#D95CB9] transition-colors duration-300" />
                  {point}
                </li>
              ))}
            </ul>

            <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-widest font-bold text-[#5B326A] bg-[#5B326A]/5 border border-[#5B326A]/15 px-3 py-1.5 rounded-full group-hover:bg-[#DFAA5E]/10 group-hover:text-[#292E4B] group-hover:border-[#DFAA5E]/30 transition-colors duration-300">
              <span className="text-[#DFAA5E]">→</span>
              Consistency is key to long-term hair health
            </span>
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
                Take the first step towards stronger, healthier, and fuller hair.
              </p>
              <div className="mt-3 flex flex-col gap-1">
                <span className="text-[#F9DB9F]/60 text-[11px] uppercase tracking-widest font-bold flex items-center gap-2">
                  <span className="text-[#DFAA5E]">→</span> Visit LUMINOX – Skin | Hair | Laser
                </span>
                <span className="text-[#F9DB9F]/60 text-[11px] uppercase tracking-widest font-bold flex items-center gap-2">
                  <span className="text-[#DFAA5E]">→</span> Schedule your consultation today
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