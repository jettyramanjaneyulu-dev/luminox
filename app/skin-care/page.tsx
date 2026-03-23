"use client";

import { useState } from "react";
import Link from "next/link";

// Updated Hero images specifically for Skin Care context
const HeroImages = () => (
  <div className="grid grid-cols-3 gap-3 md:gap-4">
    {[
      {
        src: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80",
        alt: "Professional facial treatment and dermatology",
      },
      {
        src: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&q=80",
        alt: "Advanced skincare technology and serums",
      },
      {
        src: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=800&q=80",
        alt: "Clinical skin rejuvenation therapy",
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

export default function HairPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="h-20 lg:h-24" />

      {/* Header Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 pb-12 md:pb-16">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-[1px] w-8 bg-gradient-to-r from-[#DFAA5E] to-[#D95CB9]" />
          <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#5B326A]">
            Luminox · Skin
          </span>
        </div>
        <div className="mb-8 md:mb-10">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#292E4B] uppercase tracking-tight leading-[1.05]">
            Skin
            <br />
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: "linear-gradient(90deg, #DFAA5E 0%, #D95CB9 100%)",
              }}
            >
              Care
            </span>
          </h1>
        </div>
        <HeroImages />
      </section>

      {/* About Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 md:py-14">
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3 lg:flex-col lg:items-start">
              <div className="h-[1px] w-8 bg-[#DFAA5E] shrink-0 lg:hidden" />
              <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#5B326A]">
                About Skin Care
              </span>
            </div>
            <div className="hidden lg:block mt-4 w-10 h-[2px] bg-gradient-to-r from-[#DFAA5E] to-[#D95CB9]" />
          </div>
          <div className="lg:col-span-9">
            <p className="text-[#414042] text-base md:text-lg leading-[1.8] mb-5">
              At Luminox – Skin|Hair|Laser, our skin treatments are designed to go beyond surface-level care, combining advanced dermatology with aesthetic precision. From acne and pigmentation to anti-ageing and skin rejuvenation, every treatment is tailored to your unique skin profile using clinically proven technologies and medical expertise.
            </p>
            <p className="text-[#414042]/70 text-sm md:text-base leading-[1.8]">
              We focus on restoring skin health, enhancing natural radiance, and delivering visible, long-lasting results with safety and sophistication at the core.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-[#292E4B]/15 to-transparent" />
      </div>

      {/* Footer / Call to Action Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-16">
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
                Speak with our skin specialists to discover the perfect treatment plan for your skin type and concerns.
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