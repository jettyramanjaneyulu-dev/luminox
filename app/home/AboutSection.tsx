"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// ─── Brand Colors (60-30-10) ───────────────────────────────────────────────────
// 60% → #FFFFFF white
// 30% → #292E4B navy  #5B326A purple
// 10% → #DFAA5E gold  #D95CB9 pink  #F9DB9F light gold
// Neutral → #414042
// ──────────────────────────────────────────────────────────────────────────────

const AboutSection = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Outer ring rotates forward
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  // Inner detail ring rotates backward
  const rotateReverse = useTransform(scrollYProgress, [0, 1], [0, -270]);

  return (
    <section
      ref={containerRef}
      className="relative w-full bg-white overflow-hidden"
    >
      {/* ── Subtle bg decorations ── */}
      <div
        className="absolute top-0 left-0 w-72 h-72 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(91,50,106,0.06) 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(223,170,94,0.08) 0%, transparent 70%)" }}
      />

      <div className="flex flex-col md:flex-row min-h-[600px] lg:min-h-[680px]">

        {/* ══════════════════════════════════
            LEFT — Content
        ══════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="w-full md:w-1/2 flex items-center justify-center
                     px-6 py-16 sm:px-10 md:px-14 lg:px-20
                     order-2 md:order-1"
        >
          <div className="max-w-md w-full">

            {/* Eyebrow */}
            <div className="inline-flex items-center gap-3 mb-5">
              <div className="h-px w-8" style={{ background: "#DFAA5E" }} />
              <span
                className="text-[11px] font-bold uppercase tracking-[0.3em]"
                style={{ color: "#DFAA5E" }}
              >
                Who We Are
              </span>
            </div>

            {/* Heading */}
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-6"
              style={{ color: "#292E4B", fontFamily: "'Georgia', serif" }}
            >
              Luminox —{" "}
              <span className="italic" style={{ color: "#5B326A" }}>Where</span>{" "}
              <br className="hidden sm:block" />
              Science Meets{" "}
              <span style={{ color: "#DFAA5E" }}>Beauty</span>
            </h2>

            {/* Body */}
            <p
              className="text-sm sm:text-base leading-relaxed mb-6"
              style={{ color: "#414042" }}
            >
              At Luminox, we believe that confidence begins with skin you love.
              As a leading skin, hair and laser clinic, we combine the latest
              clinical technologies with personalised care — delivering real,
              lasting results for every patient who walks through our doors.
            </p>
            <p
              className="text-sm sm:text-base leading-relaxed mb-10"
              style={{ color: "#414042", opacity: 0.8 }}
            >
              Our team of specialist dermatologists and aesthetic physicians has
              collectively treated thousands of patients across all skin types —
              with evidence-based protocols and a genuine passion for your wellbeing.
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 mb-10">
              {[
                { value: "12+", label: "Years of Excellence" },
                { value: "20K+", label: "Happy Patients" },
                { value: "50+", label: "Treatments Offered" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p
                    className="text-2xl sm:text-3xl font-extrabold"
                    style={{ color: "#292E4B" }}
                  >
                    {stat.value}
                  </p>
                  <p
                    className="text-[10px] uppercase tracking-widest mt-1 leading-tight"
                    style={{ color: "#414042", opacity: 0.6 }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <a
                href="/about"
                className="inline-flex items-center gap-2 px-7 py-3 text-xs font-extrabold uppercase tracking-widest rounded-sm transition-all duration-200"
                style={{ background: "#292E4B", color: "#FFFFFF" }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = "#DFAA5E";
                  (e.currentTarget as HTMLElement).style.color = "#292E4B";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = "#292E4B";
                  (e.currentTarget as HTMLElement).style.color = "#FFFFFF";
                }}
              >
                Our Story
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 px-7 py-3 text-xs font-extrabold uppercase tracking-widest rounded-sm transition-all duration-200"
                style={{ border: "1.5px solid #5B326A", color: "#5B326A" }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "#D95CB9";
                  (e.currentTarget as HTMLElement).style.color = "#D95CB9";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = "#5B326A";
                  (e.currentTarget as HTMLElement).style.color = "#5B326A";
                }}
              >
                Book Consultation
              </a>
            </div>
          </div>
        </motion.div>

        {/* ══════════════════════════════════
            CENTER — Rotating Divider Badge
            Hidden on mobile, shown md+
        ══════════════════════════════════ */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center">

          {/* Outer rotating ring — dashed gold */}
          <motion.div
            style={{ rotate }}
            className="absolute w-36 h-36 lg:w-44 lg:h-44 rounded-full"
            aria-hidden
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle
                cx="50" cy="50" r="46"
                fill="none"
                stroke="#DFAA5E"
                strokeWidth="1.5"
                strokeDasharray="6 4"
                strokeLinecap="round"
              />
            </svg>
          </motion.div>

          {/* Inner counter-rotating ring — solid purple */}
          <motion.div
            style={{ rotate: rotateReverse }}
            className="absolute w-24 h-24 lg:w-32 lg:h-32 rounded-full"
            aria-hidden
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle
                cx="50" cy="50" r="44"
                fill="none"
                stroke="#5B326A"
                strokeWidth="1"
                strokeDasharray="3 8"
                strokeLinecap="round"
                opacity="0.5"
              />
              {/* Small dot accents at cardinal points — pre-calculated */}
              <circle cx="94" cy="50" r="3" fill="#D95CB9" />
              <circle cx="50" cy="94" r="3" fill="#D95CB9" />
              <circle cx="6" cy="50" r="3" fill="#D95CB9" />
              <circle cx="50" cy="6" r="3" fill="#D95CB9" />
            </svg>
          </motion.div>

          {/* Center badge — navy bg with Luminox star icon */}
          <div
            className="relative w-16 h-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center shadow-2xl z-10"
            style={{
              background: "linear-gradient(135deg, #292E4B 0%, #5B326A 100%)",
              boxShadow: "0 0 30px rgba(223,170,94,0.35), 0 0 60px rgba(91,50,106,0.2)",
            }}
          >
            {/* Luminox-style star/sparkle SVG */}
            <svg viewBox="0 0 40 40" fill="none" className="w-8 h-8 lg:w-10 lg:h-10">
              {/* 4-point star */}
              <path
                d="M20 4 L22.5 17.5 L36 20 L22.5 22.5 L20 36 L17.5 22.5 L4 20 L17.5 17.5Z"
                fill="#DFAA5E"
              />
              {/* Small inner star */}
              <path
                d="M20 14 L21 19 L26 20 L21 21 L20 26 L19 21 L14 20 L19 19Z"
                fill="#F9DB9F"
              />
            </svg>
          </div>
        </div>

        {/* ══════════════════════════════════
            RIGHT — Image
        ══════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="w-full md:w-1/2 relative h-72 sm:h-96 md:h-auto
                     order-1 md:order-2 overflow-hidden"
        >
          {/* Dummy placeholder image — replace with your actual path */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=900&q=80"
            alt="Luminox clinic — expert skin and laser care"
            className="w-full h-full object-cover object-center"
          />

          {/* Gradient overlay — left edge fades into white for seamless join */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/60 via-transparent to-transparent hidden md:block" />
          {/* Bottom gradient for mobile */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/50 via-transparent to-transparent md:hidden" />

          {/* Floating badge — top-left corner of image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="absolute top-6 left-6 md:top-8 md:left-10 rounded-xl px-4 py-3 backdrop-blur-sm"
            style={{
              background: "rgba(41,46,75,0.85)",
              border: "1px solid rgba(223,170,94,0.3)",
            }}
          >
            <p className="text-[10px] uppercase tracking-widest mb-0.5" style={{ color: "#DFAA5E" }}>
              Certified Clinic
            </p>
            <p className="text-white text-xs font-bold">NABH Accredited</p>
          </motion.div>

          {/* Floating badge — bottom-right corner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.65, duration: 0.5 }}
            className="absolute bottom-6 right-6 rounded-xl px-4 py-3 backdrop-blur-sm"
            style={{
              background: "rgba(91,50,106,0.85)",
              border: "1px solid rgba(217,92,185,0.3)",
            }}
          >
            <p className="text-[10px] uppercase tracking-widest mb-0.5" style={{ color: "#D95CB9" }}>
              Est. 2012
            </p>
            <p className="text-white text-xs font-bold">Bangalore, India</p>
          </motion.div>

          {/* Decorative circle overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-10">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="0" cy="100" r="60" fill="none" stroke="white" strokeWidth="0.4" />
              <circle cx="0" cy="100" r="40" fill="none" stroke="white" strokeWidth="0.3" />
            </svg>
          </div>
        </motion.div>
      </div>

      {/* ── Mobile rotating badge (shown below content on small screens) ── */}
      <div className="flex md:hidden justify-center py-8">
        <div className="relative w-24 h-24 flex items-center justify-center">
          <motion.div style={{ rotate }} className="absolute w-24 h-24 rounded-full">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="50" cy="50" r="46" fill="none" stroke="#DFAA5E" strokeWidth="1.5" strokeDasharray="6 4" />
            </svg>
          </motion.div>
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center z-10"
            style={{ background: "linear-gradient(135deg, #292E4B 0%, #5B326A 100%)" }}
          >
            <svg viewBox="0 0 40 40" fill="none" className="w-7 h-7">
              <path d="M20 4 L22.5 17.5 L36 20 L22.5 22.5 L20 36 L17.5 22.5 L4 20 L17.5 17.5Z" fill="#DFAA5E" />
              <path d="M20 14 L21 19 L26 20 L21 21 L20 26 L19 21 L14 20 L19 19Z" fill="#F9DB9F" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
