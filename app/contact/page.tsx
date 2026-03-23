"use client";

import { useEffect, useRef, useState } from "react";

function useFadeUp() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-3">
      <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#DFAA5E]" />
      <svg width="13" height="13" viewBox="0 0 14 14">
        <path d="M7 0L8.2 5.2 14 7 8.2 8.8 7 14 5.8 8.8 0 7 5.8 5.2Z" fill="#DFAA5E" />
      </svg>
      <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#DFAA5E]" />
    </div>
  );
}

function InfoCard({
  icon, label, children, href, delay = "0ms",
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
  href?: string;
  delay?: string;
}) {
  const { ref, visible } = useFadeUp();

  const card = (
    <div
      ref={ref}
      style={{ transitionDelay: delay }}
      className={`
        group relative overflow-hidden rounded-2xl border border-[#DFAA5E]/20
        bg-white h-full p-6 sm:p-7
        shadow-[0_2px_18px_rgba(41,46,75,0.07)]
        hover:shadow-[0_8px_36px_rgba(41,46,75,0.14)]
        hover:-translate-y-1
        transition-all duration-500 ease-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-7"}
      `}
    >
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#DFAA5E]/20 via-[#DFAA5E] to-[#DFAA5E]/20 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      <div className="absolute -bottom-8 -right-8 w-28 h-28 rounded-full bg-[#DFAA5E]/5 group-hover:bg-[#DFAA5E]/10 transition-colors duration-500" />
      <div className="flex items-start gap-4">
        <div className="w-11 h-11 rounded-xl bg-[#292E4B] flex items-center justify-center text-[#DFAA5E] flex-shrink-0 shadow-md group-hover:scale-105 transition-transform duration-300">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] uppercase tracking-[0.22em] text-[#DFAA5E] font-bold mb-1.5 font-sans">{label}</p>
          <div className="h-[2px] w-7 bg-[#DFAA5E] rounded-full mb-3 group-hover:w-12 transition-all duration-400" />
          <div className="text-[#414042] text-sm leading-relaxed font-sans">{children}</div>
        </div>
      </div>
    </div>
  );

  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className="block h-full">{card}</a>
  ) : card;
}

function MapSection() {
  const { ref, visible } = useFadeUp();
  return (
    <div ref={ref} style={{ transitionDelay: "320ms" }}
      className={`w-full transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-7"}`}
    >
      <div
        className="w-full rounded-2xl overflow-hidden border border-[#DFAA5E]/25 relative"
        style={{ boxShadow: "0 16px 50px rgba(41,46,75,0.13), 0 4px 14px rgba(41,46,75,0.08)" }}
      >
        {/* Top header bar */}
        <div className="bg-[#292E4B] px-4 py-3 sm:px-5 sm:py-3.5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <span className="w-2 h-2 rounded-full bg-[#DFAA5E] animate-pulse flex-shrink-0" />
            <span className="font-sans text-[12px] sm:text-sm text-white/80 truncate tracking-wide">
              Luminox Derma Clinic — Srinagar Colony, Hyderabad
            </span>
          </div>
          <a
            href="https://maps.app.goo.gl/1y5k4zeDgatzo13X7?g_st=iw"
            target="_blank" rel="noopener noreferrer"
            className="flex-shrink-0 flex items-center gap-2 rounded-full px-3 py-1.5 border border-[#DFAA5E]/40 hover:bg-[#DFAA5E]/20 transition-all duration-300"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#DFAA5E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="3 11 22 2 13 21 11 13 3 11" />
            </svg>
            <span className="text-[#DFAA5E] text-[10px] font-bold uppercase tracking-[0.15em] font-sans hidden sm:inline">Directions</span>
          </a>
        </div>

        {/* Map Container */}
        <div className="relative w-full h-[380px] sm:h-[420px]">
          <iframe
            title="Luminox Derma Clinic Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.626940501426!2d78.444879!3d17.429682!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb915b8b6dcaa1%3A0x1bcbc00c25f76d8!2sLUMINOX%20DERMA%20CLINIC!5e0!3m2!1sen!2sin!4v1773680409956!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0, display: "block" }}
            allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
          />

          {/* ✅ Floating Address Card - Fixed Alignment & Height */}
          <div
            className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-10 rounded-xl overflow-hidden text-left"
            style={{
              background: "rgba(41,46,75,0.96)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(223,170,94,0.3)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
              maxWidth: "230px",
              width: "calc(100% - 24px)",
            }}
          >
            <div style={{ height: 3, background: "linear-gradient(90deg,#B8843A,#DFAA5E,#F9DB9F,#DFAA5E,#B8843A)" }} />
            
            <div className="p-3 sm:p-4 flex flex-col items-start w-full gap-2 sm:gap-2.5">
              
              {/* Label */}
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-lg bg-[#DFAA5E]/15 border border-[#DFAA5E]/30 flex items-center justify-center flex-shrink-0">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#DFAA5E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <p className="text-[#DFAA5E] text-[9px] font-bold uppercase tracking-[0.18em] font-sans">Our Location</p>
              </div>

              {/* Address - Forced Left Alignment */}
              <div className="w-full text-left">
                <address className="not-italic text-white/90 text-[10px] sm:text-[11px] leading-[1.4] sm:leading-[1.6] font-sans block">
                  444, Floor 3, Vishnu Lekha Plaza,<br />
                  Kesav Nagar, Srinagar Colony,<br />
                  <span className="text-white font-semibold">Hyderabad — 500073</span>
                </address>
              </div>

              {/* Status & CTA - Combined for space saving on mobile */}
              <div className="w-full flex flex-col gap-2 mt-0.5">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0 animate-pulse" />
                  <span className="text-emerald-400 text-[9px] font-sans font-medium">Open · 10 AM – 8 PM</span>
                </div>

                <a
                  href="https://maps.app.goo.gl/1y5k4zeDgatzo13X7?g_st=iw"
                  target="_blank" rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 rounded-lg py-1.5 sm:py-2 font-sans text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.12em] transition-all hover:brightness-110"
                  style={{ background: "#DFAA5E", color: "#292E4B" }}
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="3 11 22 2 13 21 11 13 3 11" />
                  </svg>
                  Directions
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   HERO BANNER — only this component changed
   ✅ Fix: full-width bleed, no right-cut
   ══════════════════════════════════════════ */
function HeroBanner({ heroIn }: { heroIn: boolean }) {
  return (
    <div
      className={`
        transition-all duration-1000 ease-out
        ${heroIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
      `}
      style={{
        transitionDelay: "80ms",
        // ✅ FIX: break out of max-w-5xl container padding — full viewport width
        marginLeft: "calc(-50vw + 50%)",
        marginRight: "calc(-50vw + 50%)",
        width: "100vw",
        // ✅ Top space — navbar కింద banner start అవుతుంది
        marginTop: "clamp(12px, 10vw, 24px)",
        marginBottom: "clamp(48px, 6vw, 64px)",
        position: "relative",
        overflow: "hidden",
        // ✅ No rounded corners so edges go flush to screen
        borderRadius: 0,
        minHeight: "clamp(220px, 38vw, 460px)",
        boxShadow: "0 24px 80px rgba(41,46,75,0.22), 0 6px 24px rgba(41,46,75,0.12)",
      }}
    >
      {/* Background image — full cover, never cut */}
      <img
        src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1600&q=85"
        alt="Luminox Derma Clinic — modern dermatology interior"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center center",
          display: "block",
        }}
        loading="eager"
      />

      {/* Layered overlays — UNCHANGED */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#292E4B]/88 via-[#292E4B]/55 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1a1f36]/70 via-transparent to-transparent" />

      {/* Gold accent bar — top — UNCHANGED */}
      <div className="absolute top-0 left-0 right-0 h-[4px]"
        style={{ background: "linear-gradient(90deg, #B8843A 0%, #DFAA5E 40%, #F9DB9F 60%, #DFAA5E 80%, #B8843A 100%)" }}
      />

      {/* Gold accent bar — bottom — UNCHANGED */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] opacity-60"
        style={{ background: "linear-gradient(90deg, transparent, #DFAA5E 30%, #F9DB9F 50%, #DFAA5E 70%, transparent)" }}
      />

      {/* Decorative circles — UNCHANGED */}
      <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full opacity-10"
        style={{ background: "radial-gradient(circle, #DFAA5E 0%, transparent 70%)" }}
      />
      <div className="absolute right-8 bottom-8 w-32 h-32 rounded-full opacity-8"
        style={{ background: "radial-gradient(circle, #DFAA5E 0%, transparent 70%)" }}
      />

      {/* Content — constrained to max-width so text stays readable on wide screens */}
      <div
        className="relative z-10 flex flex-col justify-center h-full px-8 sm:px-12 lg:px-16 py-10 sm:py-14"
        style={{
          minHeight: "clamp(220px, 38vw, 460px)",
          maxWidth: "1120px",   // ✅ text doesn't stretch on ultra-wide
          margin: "0 auto",     // ✅ centered
        }}
      >
        {/* Eyebrow — UNCHANGED */}
        <div className="flex items-center gap-2.5 mb-4">
          <span className="h-px w-6 bg-[#DFAA5E]" />
          <span className="font-sans text-[10px] uppercase tracking-[0.35em] font-semibold" style={{ color: "#DFAA5E" }}>
            Hyderabad's Trusted Skin Experts
          </span>
        </div>

        {/* Headline — UNCHANGED */}
        <h2
          className="font-display font-bold leading-[1.08] tracking-tight mb-4"
          style={{ color: "#FFFFFF", fontSize: "clamp(1.7rem, 4.5vw, 3.6rem)", maxWidth: "600px", textShadow: "0 2px 20px rgba(0,0,0,0.3)" }}
        >
          Where Science Meets<br />
          <span className="italic" style={{
            background: "linear-gradient(90deg, #DFAA5E, #F9DB9F, #DFAA5E)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            Radiant Beauty
          </span>
        </h2>

        {/* Sub-copy — UNCHANGED */}
        <p className="font-sans font-light leading-relaxed mb-7"
          style={{ color: "rgba(255,255,255,0.78)", fontSize: "clamp(0.85rem, 1.8vw, 1.05rem)", maxWidth: "420px" }}
        >
          Advanced laser treatments, clinical dermatology &amp; aesthetic care —
          all under one roof in Srinagar Colony, Hyderabad.
        </p>

        {/* CTA Buttons — UNCHANGED */}
        <div className="flex flex-wrap gap-3">
          <a href="tel:+916309917333"
            className="group inline-flex items-center gap-2.5 rounded-full font-sans font-semibold transition-all duration-300 hover:-translate-y-0.5"
            style={{ background: "#DFAA5E", color: "#292E4B", fontSize: "clamp(0.7rem, 1.5vw, 0.82rem)", letterSpacing: "0.06em", padding: "clamp(8px,1.5vw,13px) clamp(18px,2.5vw,28px)", boxShadow: "0 4px 20px rgba(223,170,94,0.45)" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.68 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6.07 6.07l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            Book a Consultation
          </a>
          <a href="https://wa.me/916309918333" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full font-sans font-semibold transition-all duration-300 hover:-translate-y-0.5"
            style={{ background: "rgba(255,255,255,0.12)", color: "#FFFFFF", border: "1.5px solid rgba(255,255,255,0.3)", backdropFilter: "blur(8px)", fontSize: "clamp(0.7rem, 1.5vw, 0.82rem)", letterSpacing: "0.06em", padding: "clamp(8px,1.5vw,13px) clamp(18px,2.5vw,28px)" }}
          >
            WhatsApp Us
          </a>
        </div>

        {/* Stats strip — UNCHANGED */}
        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-8">
          {[{ val: "5,000+", label: "Procedures" }, { val: "12+", label: "Years Exp." }, { val: "98%", label: "Satisfaction" }].map((s) => (
            <div key={s.label} className="flex items-baseline gap-1.5">
              <span className="font-display font-bold" style={{ color: "#DFAA5E", fontSize: "clamp(1.1rem, 2.2vw, 1.5rem)" }}>{s.val}</span>
              <span className="font-sans uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.55)", fontSize: "clamp(0.6rem, 1vw, 0.7rem)" }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   MAIN PAGE — UNCHANGED
   ══════════════════════════════════════════ */
export default function ContactPage() {
  const [heroIn, setHeroIn] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setHeroIn(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; }
        :root { --heading:#292E4B; --body:#414042; --gold:#DFAA5E; }
        .font-display { font-family:'Playfair Display',Georgia,serif; }
        .font-sans    { font-family:'DM Sans',system-ui,sans-serif; }

        @keyframes shimmer {
          0%   { background-position:-500px 0; }
          100% { background-position: 500px 0; }
        }
        .gold-shimmer {
          background:linear-gradient(90deg,#DFAA5E 0%,#f5d898 45%,#DFAA5E 60%,#c8913e 100%);
          background-size:500px 100%;
          animation:shimmer 3s infinite linear;
        }
        @keyframes drift {
          0%,100% { transform:translate(0,0) scale(1); }
          33%      { transform:translate(6px,-10px) scale(1.03); }
          66%      { transform:translate(-5px,7px) scale(0.98); }
        }
        .orb-1 { animation:drift 15s ease-in-out infinite 0s; }
        .orb-2 { animation:drift 19s ease-in-out infinite 5s; }
        .orb-3 { animation:drift 12s ease-in-out infinite 8s; }
        .orb-4 { animation:drift 17s ease-in-out infinite 2s; }
        .orb-5 { animation:drift 21s ease-in-out infinite 4s; }

        .draw-line { position:relative; display:inline-block; }
        .draw-line::after {
          content:''; position:absolute; left:0; right:0; bottom:-5px;
          height:3px; background:var(--gold); border-radius:2px;
          transform:scaleX(0); transform-origin:left center;
          transition:transform 0.75s cubic-bezier(.22,1,.36,1) 0.65s;
        }
        .draw-line.active::after { transform:scaleX(1); }

        .grain-overlay::before {
          content:''; position:fixed; inset:0; pointer-events:none; z-index:1; opacity:0.025;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }

        /* ✅ Prevent horizontal scrollbar from full-bleed banner */
        body { overflow-x: hidden; }
      `}</style>

      <main
        className="grain-overlay min-h-screen font-sans relative overflow-x-hidden"
        style={{ background: "linear-gradient(148deg,#f9f5ef 0%,#f1ebe0 52%,#ece3d4 100%)" }}
      >
        {/* Ambient orbs — UNCHANGED */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
          <div className="orb-1 absolute rounded-full" style={{ width:420,height:420,top:"2%",left:"-10%",background:"radial-gradient(circle,rgba(223,170,94,0.12) 0%,transparent 68%)" }} />
          <div className="orb-2 absolute rounded-full" style={{ width:280,height:280,top:"60%",right:"-8%",background:"radial-gradient(circle,rgba(223,170,94,0.12) 0%,transparent 68%)" }} />
          <div className="orb-3 absolute rounded-full" style={{ width:180,height:180,top:"30%",left:"68%",background:"radial-gradient(circle,rgba(223,170,94,0.12) 0%,transparent 68%)" }} />
          <div className="orb-4 absolute rounded-full" style={{ width:100,height:100,top:"82%",left:"20%",background:"radial-gradient(circle,rgba(223,170,94,0.12) 0%,transparent 68%)" }} />
          <div className="orb-5 absolute rounded-full" style={{ width:480,height:480,top:"38%",left:"-14%",background:"radial-gradient(circle,rgba(41,46,75,0.055) 0%,transparent 65%)" }} />
        </div>

        {/* Content wrapper — UNCHANGED */}
        <div className="relative z-10 w-full max-w-5xl mx-auto px-5 sm:px-8 lg:px-10 py-10 sm:py-26">

          {/* ══ HERO BANNER ══ */}
          <HeroBanner heroIn={heroIn} />

          {/* ══ SECTION HEADER — UNCHANGED ══ */}
          <header className={`w-full text-center mb-10 sm:mb-14 transition-all duration-1000 ease-out ${heroIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
            style={{ transitionDelay: "200ms" }}
          >
            <div className="inline-flex items-center gap-2.5 mb-5">
              <span className="h-px w-8 bg-[#DFAA5E]" />
              <span className="font-sans text-[10px] uppercase tracking-[0.35em] text-[#DFAA5E] font-semibold">Luminox Derma Clinic</span>
              <span className="h-px w-8 bg-[#DFAA5E]" />
            </div>
            <h1 className="font-display font-bold leading-[1.05] tracking-tight mb-3"
              style={{ color:"var(--heading)", fontSize:"clamp(2.8rem,7vw,5.5rem)" }}
            >
              Get in{" "}
              <span className={`draw-line italic ${heroIn ? "active" : ""}`}>Touch</span>
            </h1>
            <div className="mx-auto mt-5 mb-5 h-[2.5px] w-24 rounded-full gold-shimmer" />
            <p className="font-sans text-base sm:text-lg max-w-md mx-auto leading-relaxed font-light" style={{ color:"var(--body)" }}>
              We're here to help you look and feel your best. Reach out — we'd love to hear from you.
            </p>
            <GoldDivider />
          </header>

          {/* ══ INFO CARDS — UNCHANGED ══ */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-5">
            <InfoCard delay="0ms" label="Our Location" icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
            }>
              <address className="not-italic leading-7" style={{ color:"var(--body)" }}>
                444, Floor 3, Vishnu Lekha Plaza,<br />
                Kesav Nagar, Srinagar Colony,<br />
                <strong style={{ color:"var(--heading)", fontWeight:600 }}>Hyderabad — 500073</strong>
              </address>
            </InfoCard>

            <InfoCard delay="90ms" label="Clinic Hours" icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
              </svg>
            }>
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span style={{ color:"var(--body)" }} className="text-sm">Monday – Sunday</span>
                  <span className="text-sm font-semibold px-3 py-0.5 rounded-full border"
                    style={{ color:"var(--heading)", background:"rgba(223,170,94,0.10)", borderColor:"rgba(223,170,94,0.35)" }}>
                    10 AM – 8 PM
                  </span>
                </div>
                <p className="text-xs flex items-center gap-1.5" style={{ color:"#7a7a7a" }}>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block animate-pulse" />
                  Open all 7 days a week
                </p>
              </div>
            </InfoCard>

            <InfoCard delay="180ms" label="Call Us" href="tel:+916309917333" icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.68 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6.07 6.07l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            }>
              <p className="font-display text-[1.3rem] font-semibold leading-snug" style={{ color:"var(--heading)" }}>+91 63099 17333</p>
              <p className="text-xs mt-1.5" style={{ color:"var(--gold)" }}>Tap to call directly →</p>
            </InfoCard>

            <InfoCard delay="270ms" label="WhatsApp" href="https://wa.me/916309918333" icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style={{ color:"#DFAA5E" }}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
              </svg>
            }>
              <p className="font-display text-[1.3rem] font-semibold leading-snug" style={{ color:"var(--heading)" }}>+91 63099 18333</p>
              <p className="text-xs mt-1.5" style={{ color:"var(--gold)" }}>Chat with us on WhatsApp →</p>
            </InfoCard>

            <div className="sm:col-span-2">
              <InfoCard delay="360ms" label="Email Us" href="mailto:luminoxdermaclinic@gmail.com" icon={
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                </svg>
              }>
                <p className="font-display text-[1.15rem] font-semibold leading-snug break-all" style={{ color:"var(--heading)" }}>luminoxdermaclinic@gmail.com</p>
                <p className="text-xs mt-1.5" style={{ color:"var(--gold)" }}>Send us an email →</p>
              </InfoCard>
            </div>
          </div>

          {/* ══ MAP — UNCHANGED ══ */}
          <MapSection />

          {/* ══ FOOTER — UNCHANGED ══ */}
          <footer className="text-center mt-14">
            <GoldDivider />
            <p className="font-display italic text-lg mt-4" style={{ color:"var(--gold)" }}>"Radiant skin, crafted with care."</p>
            <p className="font-sans text-[11px] mt-2 tracking-[0.22em] uppercase" style={{ color:"#b09878" }}>© Luminox Derma Clinic · Hyderabad</p>
          </footer>

        </div>
      </main>
    </>
  );
}