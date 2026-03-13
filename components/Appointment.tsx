"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Brand Colors (60-30-10) ───────────────────────────────────────────────────
// 60% → #FFFFFF / #FAF9F6 white/off-white
// 30% → #292E4B navy  #5B326A deep purple
// 10% → #DFAA5E gold  #D95CB9 pink  #F9DB9F light gold
// Neutral → #414042
// ──────────────────────────────────────────────────────────────────────────────

// ── Swap these URLs with your real clinic images ──────────────────────────────
const BG_IMAGES = [
  "https://images.unsplash.com/photo-1629909615957-be38d48fbbe4?w=1200&q=80", // clinic interior
  "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80", // laser treatment
  "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=1200&q=80", // skin care
  "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=1200&q=80",   // consultation
];

const TREATMENTS = [
  { value: "", label: "Select a Treatment" },
  { value: "laser-hair-removal", label: "Laser Hair Removal" },
  { value: "fractional-co2", label: "Fractional CO2 Laser" },
  { value: "botox", label: "Botulinum Toxin (Botox)" },
  { value: "dermal-fillers", label: "Dermal Fillers" },
  { value: "hydrafacial", label: "HydraFacial" },
  { value: "chemical-peel", label: "Chemical Peel" },
  { value: "prp", label: "PRP Therapy" },
  { value: "acne", label: "Acne Treatment" },
  { value: "skin-consultation", label: "General Skin Consultation" },
];

const SLOTS = ["9:00 AM", "10:30 AM", "12:00 PM", "2:00 PM", "3:30 PM", "5:00 PM"];

export default function Appointment() {
  const [bgIndex, setBgIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "", phone: "", email: "", treatment: "", slot: "", message: "",
  });

  // Auto-cycle bg images every 5s
  useEffect(() => {
    const t = setInterval(() => setBgIndex((p) => (p + 1) % BG_IMAGES.length), 5000);
    return () => clearInterval(t);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="relative w-full overflow-hidden min-h-screen flex items-center">

      {/* ══════════════════════════════════════
          FULL-BLEED BACKGROUND — cycling images
      ══════════════════════════════════════ */}
      <div className="absolute inset-0 z-0">
        {BG_IMAGES.map((src, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-1000"
            style={{ opacity: i === bgIndex ? 1 : 0 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src} alt="" className="w-full h-full object-cover object-center" />
          </div>
        ))}
        {/* Dark overlay — left side darker for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#292E4B]/90 via-[#292E4B]/70 to-[#292E4B]/30" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#292E4B]/60 to-transparent" />
      </div>

      {/* Image dot indicators — bottom left */}
      <div className="absolute bottom-6 left-6 z-10 flex gap-2">
        {BG_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setBgIndex(i)}
            className="h-[3px] rounded-full transition-all duration-400"
            style={{
              width: i === bgIndex ? 28 : 10,
              background: i === bgIndex ? "#DFAA5E" : "rgba(255,255,255,0.35)",
            }}
            aria-label={`Background ${i + 1}`}
          />
        ))}
      </div>

      {/* ══════════════════════════════════════
          CONTENT LAYER
      ══════════════════════════════════════ */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">

          {/* ── LEFT — Hero copy ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-white"
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="h-px w-8" style={{ background: "#DFAA5E" }} />
              <span className="text-[11px] font-bold uppercase tracking-[0.3em]" style={{ color: "#DFAA5E" }}>
                Book Your Visit
              </span>
            </div>

            {/* Heading */}
            <h2
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6"
              style={{ fontFamily: "'Georgia', serif" }}
            >
              Start Your
              <br />
              <span className="italic" style={{ color: "#DFAA5E" }}>Skin Journey</span>
              <br />
              <span style={{ color: "#F9DB9F", fontSize: "0.65em" }}>Today.</span>
            </h2>

            <p className="text-base sm:text-lg leading-relaxed mb-10 max-w-md" style={{ color: "rgba(255,255,255,0.7)" }}>
              Book a consultation with our specialist dermatologists. Personalised care, clinically proven treatments, and results you'll love.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4">
              {[
                { icon: "✦", text: "NABH Accredited" },
                { icon: "✦", text: "20,000+ Patients" },
                { icon: "✦", text: "12+ Years of Excellence" },
              ].map((b) => (
                <div
                  key={b.text}
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider"
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    backdropFilter: "blur(8px)",
                    color: "rgba(255,255,255,0.85)",
                  }}
                >
                  <span style={{ color: "#DFAA5E" }}>{b.icon}</span>
                  {b.text}
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT — Form card ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="rounded-3xl overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.97)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 32px 80px rgba(41,46,75,0.4), 0 0 0 1px rgba(255,255,255,0.1)",
              }}
            >
              {/* Card header bar */}
              <div
                className="px-7 pt-7 pb-5 border-b"
                style={{ borderColor: "rgba(41,46,75,0.08)" }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.3em] mb-1" style={{ color: "#DFAA5E" }}>
                      Luminox Clinic
                    </p>
                    <h3
                      className="text-xl sm:text-2xl font-extrabold"
                      style={{ color: "#292E4B", fontFamily: "'Georgia', serif" }}
                    >
                      Request an Appointment
                    </h3>
                  </div>
                  {/* Small logo mark */}
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "linear-gradient(135deg, #292E4B, #5B326A)" }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                      <path d="M12 2 L13.5 9 L20 12 L13.5 15 L12 22 L10.5 15 L4 12 L10.5 9Z" fill="#DFAA5E"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Form body */}
              <div className="p-7">
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="py-10 text-center"
                    >
                      <div
                        className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                        style={{ background: "rgba(223,170,94,0.15)", border: "2px solid #DFAA5E" }}
                      >
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="#DFAA5E" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                        </svg>
                      </div>
                      <h4 className="text-xl font-extrabold mb-2" style={{ color: "#292E4B", fontFamily: "'Georgia', serif" }}>
                        Appointment Requested!
                      </h4>
                      <p className="text-sm mb-6" style={{ color: "#414042" }}>
                        Our team will confirm your slot within 2 hours. <br/>
                        Check your phone for a confirmation SMS.
                      </p>
                      <button
                        onClick={() => { setSubmitted(false); setForm({ name:"", phone:"", email:"", treatment:"", slot:"", message:"" }); }}
                        className="text-xs font-bold uppercase tracking-widest transition-colors"
                        style={{ color: "#DFAA5E" }}
                      >
                        Book Another →
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      className="space-y-4"
                    >
                      {/* Name + Phone */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="relative">
                          <input
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            type="text"
                            placeholder="Full Name"
                            className="w-full px-4 py-3 text-sm rounded-xl transition-all duration-200 outline-none"
                            style={{
                              background: "#F7F5FA",
                              border: "1.5px solid rgba(41,46,75,0.1)",
                              color: "#292E4B",
                            }}
                            onFocus={e => { e.currentTarget.style.borderColor = "#DFAA5E"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(223,170,94,0.12)"; }}
                            onBlur={e => { e.currentTarget.style.borderColor = "rgba(41,46,75,0.1)"; e.currentTarget.style.boxShadow = "none"; }}
                          />
                        </div>
                        <div className="relative">
                          <input
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                            required
                            type="tel"
                            placeholder="Phone Number"
                            className="w-full px-4 py-3 text-sm rounded-xl transition-all duration-200 outline-none"
                            style={{
                              background: "#F7F5FA",
                              border: "1.5px solid rgba(41,46,75,0.1)",
                              color: "#292E4B",
                            }}
                            onFocus={e => { e.currentTarget.style.borderColor = "#DFAA5E"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(223,170,94,0.12)"; }}
                            onBlur={e => { e.currentTarget.style.borderColor = "rgba(41,46,75,0.1)"; e.currentTarget.style.boxShadow = "none"; }}
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <input
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        type="email"
                        placeholder="Email Address (optional)"
                        className="w-full px-4 py-3 text-sm rounded-xl transition-all duration-200 outline-none"
                        style={{
                          background: "#F7F5FA",
                          border: "1.5px solid rgba(41,46,75,0.1)",
                          color: "#292E4B",
                        }}
                        onFocus={e => { e.currentTarget.style.borderColor = "#DFAA5E"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(223,170,94,0.12)"; }}
                        onBlur={e => { e.currentTarget.style.borderColor = "rgba(41,46,75,0.1)"; e.currentTarget.style.boxShadow = "none"; }}
                      />

                      {/* Treatment select */}
                      <div className="relative">
                        <select
                          name="treatment"
                          value={form.treatment}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 text-sm rounded-xl transition-all duration-200 outline-none appearance-none"
                          style={{
                            background: "#F7F5FA",
                            border: "1.5px solid rgba(41,46,75,0.1)",
                            color: form.treatment ? "#292E4B" : "#9CA3AF",
                          }}
                          onFocus={e => { e.currentTarget.style.borderColor = "#DFAA5E"; }}
                          onBlur={e => { e.currentTarget.style.borderColor = "rgba(41,46,75,0.1)"; }}
                        >
                          {TREATMENTS.map((t) => (
                            <option key={t.value} value={t.value} disabled={t.value === ""}>
                              {t.label}
                            </option>
                          ))}
                        </select>
                        <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                          style={{ color: "#DFAA5E" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
                        </svg>
                      </div>

                      {/* Time slot pills */}
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-widest mb-3" style={{ color: "#414042", opacity: 0.6 }}>
                          Preferred Time Slot
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {SLOTS.map((slot) => (
                            <button
                              key={slot}
                              type="button"
                              onClick={() => setForm((p) => ({ ...p, slot }))}
                              className="px-3 py-1.5 text-xs font-bold rounded-full transition-all duration-200"
                              style={{
                                background: form.slot === slot ? "#292E4B" : "#F7F5FA",
                                color: form.slot === slot ? "#FFFFFF" : "#414042",
                                border: `1.5px solid ${form.slot === slot ? "#292E4B" : "rgba(41,46,75,0.1)"}`,
                              }}
                            >
                              {slot}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Message */}
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={2}
                        placeholder="Any specific concerns? (optional)"
                        className="w-full px-4 py-3 text-sm rounded-xl transition-all duration-200 outline-none resize-none"
                        style={{
                          background: "#F7F5FA",
                          border: "1.5px solid rgba(41,46,75,0.1)",
                          color: "#292E4B",
                        }}
                        onFocus={e => { e.currentTarget.style.borderColor = "#DFAA5E"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(223,170,94,0.12)"; }}
                        onBlur={e => { e.currentTarget.style.borderColor = "rgba(41,46,75,0.1)"; e.currentTarget.style.boxShadow = "none"; }}
                      />

                      {/* Submit */}
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-4 text-sm font-extrabold uppercase tracking-widest rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                        style={{ background: "linear-gradient(135deg, #292E4B 0%, #5B326A 100%)", color: "#FFFFFF" }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "linear-gradient(135deg, #DFAA5E 0%, #D95CB9 100%)"; (e.currentTarget as HTMLElement).style.color = "#292E4B"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "linear-gradient(135deg, #292E4B 0%, #5B326A 100%)"; (e.currentTarget as HTMLElement).style.color = "#FFFFFF"; }}
                      >
                        Confirm Appointment
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                        </svg>
                      </motion.button>

                      <p className="text-center text-[11px]" style={{ color: "#414042", opacity: 0.5 }}>
                        No payment required · Free consultation · Confirm within 2 hrs
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}