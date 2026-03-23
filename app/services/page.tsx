"use client";

import { useEffect, useRef, useState } from "react";

/* ══════════════════════════════════════════
   BRAND TOKENS
══════════════════════════════════════════ */
// #292E4B — deep navy
// #DFAA5E — gold
// #FAF7F2 — cream

/* ─── Fade-up on scroll ─────────────────── */
function useFadeUp(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

/* ─── Services data ─────────────────────── */
const SERVICES = [
  {
    id: "skin",
    number: "01",
    category: "Dermatology",
    title: "Skin Treatments",
    subtitle: "Restore. Rejuvenate. Radiate.",
    body: "At Luminox – Skin|Hair|Laser, our skin treatments are designed to go beyond surface-level care, combining advanced dermatology with aesthetic precision. From acne and pigmentation to anti-ageing and skin rejuvenation, every treatment is tailored to your unique skin profile using clinically proven technologies and medical expertise. We focus on restoring skin health, enhancing natural radiance, and delivering visible, long-lasting results with safety and sophistication at the core.",
    image: "/services/skin.png",
    fallbackGradient: "linear-gradient(135deg, #f0e6d3 0%, #e8d5b7 50%, #d4b896 100%)",
    tags: ["Acne & Scars", "Pigmentation", "Anti-Ageing", "Skin Rejuvenation", "Laser Resurfacing"],
    cta: "Explore Skin Treatments",
    ctaHref: "/skin-care",
    accent: "#DFAA5E",
    stat: { value: "50+", label: "Treatments" },
  },
  {
    id: "hair",
    number: "02",
    category: "Trichology",
    title: "Hair Treatments",
    subtitle: "Strengthen. Restore. Regrow.",
    body: "Healthy, confident hair begins with the right diagnosis and targeted care. Our hair treatments address concerns such as hair fall, thinning, dandruff, and scalp disorders through a blend of medical science and advanced procedures. Whether it's PRP therapy, growth stimulation, or customized treatment plans, we aim to strengthen hair from the roots, improve scalp health, and promote natural regrowth—helping you regain both volume and confidence.",
    image: "/services/hair.png",
    fallbackGradient: "linear-gradient(135deg, #e8dff5 0%, #d4c9e8 50%, #b8a8d4 100%)",
    tags: ["Hair Fall", "PRP Therapy", "Scalp Health", "Growth Stimulation", "Hair Thinning"],
    cta: "Explore Hair Treatments",
    ctaHref: "/hair",
    accent: "#9B7EC8",
    stat: { value: "98%", label: "Satisfaction" },
  },
  {
    id: "iv",
    number: "03",
    category: "Wellness",
    title: "IV Drip Therapy",
    subtitle: "Nourish. Glow. Revitalize.",
    body: "Our IV drip therapies are formulated to deliver essential vitamins, antioxidants, and nutrients directly into your bloodstream for maximum absorption and immediate benefits. Designed to support skin glow, hydration, detoxification, and overall wellness, these drips offer a quick and effective boost from within. At Luminox, each IV therapy is carefully curated and administered under medical supervision, ensuring safety, efficiency, and a revitalized you—inside and out.",
    image: "/services/iv.png",
    fallbackGradient: "linear-gradient(135deg, #d4e8f0 0%, #b8d5e4 50%, #8fb8cc 100%)",
    tags: ["Skin Glow", "Hydration", "Detox", "Vitamin Boost", "Immunity"],
    cta: "Explore IV Drips",
    ctaHref: "/IV-drips",
    accent: "#5BA0B8",
    stat: { value: "15+", label: "Drip Formulas" },
  },
];

/* ─── Service Card ──────────────────────── */
function ServiceCard({ service, index }: { service: typeof SERVICES[0]; index: number }) {
  const { ref, visible } = useFadeUp(0.08);
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(48px)",
        transition: `opacity 0.8s cubic-bezier(.22,1,.36,1) ${index * 0.15}s, transform 0.8s cubic-bezier(.22,1,.36,1) ${index * 0.15}s`,
      }}
    >
      <div className={`service-card service-card-${service.id}`}>

        {/* ── Image pane ── */}
        <div className={`service-image-pane ${isEven ? "order-image-first" : "order-image-last"}`}>
          <div className="service-image-inner">
            <img
              src={service.image}
              alt={service.title}
              className="service-img"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            {/* Fallback gradient bg */}
            <div
              className="service-img-fallback"
              style={{ background: service.fallbackGradient }}
            />
            {/* Number watermark */}
            <div className="service-number-watermark">{service.number}</div>
            {/* Stat badge */}
            <div className="service-stat-badge" style={{ background: service.accent }}>
              <span className="stat-value">{service.stat.value}</span>
              <span className="stat-label">{service.stat.label}</span>
            </div>
          </div>
        </div>

        {/* ── Content pane ── */}
        <div className="service-content-pane">
          {/* Category eyebrow */}
          <div className="service-eyebrow">
            <div className="eyebrow-line" style={{ background: service.accent }} />
            <span className="eyebrow-text" style={{ color: service.accent }}>
              {service.category}
            </span>
          </div>

          {/* Title */}
          <h2 className="service-title">{service.title}</h2>

          {/* Subtitle */}
          <p className="service-subtitle" style={{ color: service.accent }}>
            {service.subtitle}
          </p>

          {/* Gold divider */}
          <div className="service-divider" style={{ background: `linear-gradient(90deg, ${service.accent}, transparent)` }} />

          {/* Body */}
          <p className="service-body">{service.body}</p>

          {/* Tags */}
          <div className="service-tags">
            {service.tags.map((tag) => (
              <span
                key={tag}
                className="service-tag"
                style={{
                  borderColor: `${service.accent}40`,
                  color: service.accent,
                  background: `${service.accent}10`,
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA */}
          <a
            href={service.ctaHref}
            className="service-cta"
            style={{
              background: service.accent,
              color: service.id === "skin" ? "#292E4B" : "#fff",
            }}
          >
            {service.cta}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>

      </div>
    </div>
  );
}

/* ─── Hero Section ──────────────────────── */
function ServicesHero({ visible }: { visible: boolean }) {
  return (
    <div className="services-hero">
      {/* Background decoration */}
      <div className="hero-bg-orb hero-orb-1" />
      <div className="hero-bg-orb hero-orb-2" />

      <div className="hero-inner">
        {/* Eyebrow */}
        <div
          className="hero-eyebrow"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
          }}
        >
          <div className="hero-eyebrow-line" />
          <span>Luminox Derma Clinic</span>
          <div className="hero-eyebrow-line" />
        </div>

        {/* Main heading */}
        <h1
          className="hero-heading"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.9s ease 0.25s, transform 0.9s ease 0.25s",
          }}
        >
          Our{" "}
          <span className="hero-heading-accent">Services</span>
        </h1>

        {/* Shimmer rule */}
        <div
          className="hero-rule"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.7s ease 0.4s",
          }}
        />

        {/* Sub-copy */}
        <p
          className="hero-sub"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.8s ease 0.5s, transform 0.8s ease 0.5s",
          }}
        >
          Where science meets beauty — three pillars of care, crafted for you.
        </p>

        {/* Stat strip */}
        <div
          className="hero-stats"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.8s ease 0.65s, transform 0.8s ease 0.65s",
          }}
        >
          {[
            { val: "5,000+", label: "Procedures Done" },
            { val: "12+", label: "Years Experience" },
            { val: "98%", label: "Patient Satisfaction" },
          ].map((s) => (
            <div key={s.label} className="hero-stat">
              <span className="hero-stat-val">{s.val}</span>
              <span className="hero-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── CTA Banner ────────────────────────── */
function CTABanner() {
  const { ref, visible } = useFadeUp(0.1);
  return (
    <div
      ref={ref}
      className="cta-banner"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
      }}
    >
      <div className="cta-banner-inner">
        <div className="cta-content">
          <p className="cta-eyebrow">Ready to Begin?</p>
          <h3 className="cta-heading">Your Skin Deserves Expert Care</h3>
          <p className="cta-sub">Book a consultation with our specialists and receive a personalised treatment plan.</p>
        </div>
        <div className="cta-actions">
          <a href="/contact" className="cta-btn-primary">
            Book Consultation
          </a>
          <a href="tel:+916309917333" className="cta-btn-secondary">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.68 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6.07 6.07l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
            Call Now
          </a>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════ */
export default function ServicesPage() {
  const [heroIn, setHeroIn] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setHeroIn(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --navy:   #292E4B;
          --gold:   #DFAA5E;
          --cream:  #FAF7F2;
          --body:   #414042;
          --muted:  #7A7D8C;
        }

        body { overflow-x: hidden; }

        /* ── Page wrapper ── */
        .services-page {
          font-family: 'DM Sans', system-ui, sans-serif;
          background: var(--cream);
          min-height: 100vh;
          /* ✅ FIX: fixed navbar height clear చేయడానికి */
          padding-top: 80px;
        }

        /* ══ HERO ══ */
        .services-hero {
          position: relative;
          overflow: hidden;
          padding: clamp(60px, 8vw, 100px) clamp(20px, 6vw, 80px) clamp(60px, 8vw, 100px);
          text-align: center;
          background: linear-gradient(160deg, #f9f5ef 0%, #f2ebe0 55%, #ece3d4 100%);
        }
        .hero-bg-orb {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }
        .hero-orb-1 {
          width: clamp(300px, 50vw, 600px);
          height: clamp(300px, 50vw, 600px);
          top: -20%;
          left: -10%;
          background: radial-gradient(circle, rgba(223,170,94,0.12) 0%, transparent 65%);
        }
        .hero-orb-2 {
          width: clamp(200px, 35vw, 420px);
          height: clamp(200px, 35vw, 420px);
          bottom: -10%;
          right: -8%;
          background: radial-gradient(circle, rgba(41,46,75,0.07) 0%, transparent 65%);
        }
        .hero-inner {
          position: relative;
          z-index: 2;
          max-width: 760px;
          margin: 0 auto;
        }
        .hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
          color: var(--gold);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.35em;
          text-transform: uppercase;
        }
        .hero-eyebrow-line {
          height: 1px;
          width: 32px;
          background: var(--gold);
        }
        .hero-heading {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(3rem, 8vw, 6.5rem);
          font-weight: 700;
          color: var(--navy);
          line-height: 1.0;
          letter-spacing: -0.02em;
          margin-bottom: 20px;
        }
        .hero-heading-accent {
          font-style: italic;
          background: linear-gradient(90deg, #DFAA5E, #F9DB9F, #DFAA5E);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero-rule {
          width: 80px;
          height: 2.5px;
          margin: 0 auto 20px;
          border-radius: 9999px;
          background: linear-gradient(90deg, #DFAA5E 0%, #f5d898 45%, #DFAA5E 60%, #c8913e 100%);
          background-size: 300px 100%;
          animation: shimmer 3s infinite linear;
        }
        @keyframes shimmer {
          0%   { background-position: -300px 0; }
          100% { background-position:  300px 0; }
        }
        .hero-sub {
          font-size: clamp(15px, 2vw, 18px);
          color: var(--body);
          font-weight: 300;
          line-height: 1.7;
          max-width: 480px;
          margin: 0 auto 40px;
        }
        .hero-stats {
          display: flex;
          justify-content: center;
          gap: clamp(24px, 5vw, 60px);
          flex-wrap: wrap;
        }
        .hero-stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
        }
        .hero-stat-val {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.6rem, 3vw, 2.4rem);
          font-weight: 700;
          color: var(--navy);
          line-height: 1;
        }
        .hero-stat-label {
          font-size: 10px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--muted);
          font-weight: 500;
        }

        /* ══ SERVICES SECTION ══ */
        .services-section {
          max-width: 1200px;
          margin: 0 auto;
          padding: clamp(48px, 8vw, 100px) clamp(20px, 5vw, 48px);
          display: flex;
          flex-direction: column;
          gap: clamp(64px, 10vw, 120px);
        }

        /* ── Service Card ── */
        .service-card {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(32px, 5vw, 72px);
          align-items: center;
        }

        /* Image pane */
        .service-image-pane {
          position: relative;
        }
        .order-image-first { order: 0; }
        .order-image-last  { order: 1; }

        .service-image-inner {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          aspect-ratio: 4/3;
          box-shadow: 0 24px 64px rgba(41,46,75,0.14), 0 8px 24px rgba(41,46,75,0.08);
        }
        .service-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
          transition: transform 0.7s cubic-bezier(.22,1,.36,1);
          z-index: 1;
        }
        .service-image-inner:hover .service-img {
          transform: scale(1.04);
        }
        .service-img-fallback {
          position: absolute;
          inset: 0;
          z-index: 0;
        }
        .service-number-watermark {
          position: absolute;
          bottom: -20px;
          right: -16px;
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(80px, 12vw, 140px);
          font-weight: 700;
          color: rgba(41,46,75,0.06);
          line-height: 1;
          pointer-events: none;
          z-index: 2;
          user-select: none;
        }
        .service-stat-badge {
          position: absolute;
          top: 20px;
          left: 20px;
          z-index: 3;
          border-radius: 14px;
          padding: 10px 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        }
        .stat-value {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(20px, 2.5vw, 28px);
          font-weight: 700;
          color: #fff;
          line-height: 1;
        }
        .stat-label {
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.85);
        }

        /* Content pane */
        .service-content-pane {
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .service-eyebrow {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 16px;
        }
        .eyebrow-line {
          height: 1px;
          width: 28px;
        }
        .eyebrow-text {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.3em;
          text-transform: uppercase;
        }
        .service-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-size: clamp(2rem, 4vw, 3.2rem);
          font-weight: 700;
          color: var(--navy);
          line-height: 1.1;
          margin-bottom: 10px;
        }
        .service-subtitle {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(15px, 1.8vw, 19px);
          font-style: italic;
          font-weight: 500;
          margin-bottom: 20px;
        }
        .service-divider {
          height: 2px;
          width: 60px;
          border-radius: 9999px;
          margin-bottom: 20px;
          opacity: 0.5;
        }
        .service-body {
          font-size: clamp(13.5px, 1.4vw, 15px);
          color: var(--body);
          line-height: 1.85;
          font-weight: 300;
          margin-bottom: 24px;
        }
        .service-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 32px;
        }
        .service-tag {
          font-size: 11px;
          font-weight: 500;
          padding: 5px 14px;
          border-radius: 9999px;
          border: 1px solid;
          letter-spacing: 0.03em;
          transition: all 0.2s;
          cursor: default;
        }
        .service-tag:hover {
          opacity: 0.8;
        }
        .service-cta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: clamp(12px, 1.5vw, 15px) clamp(24px, 3vw, 32px);
          border-radius: 9999px;
          font-size: clamp(11px, 1.2vw, 13px);
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          text-decoration: none;
          transition: opacity 0.25s, transform 0.25s;
          align-self: flex-start;
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        }
        .service-cta:hover {
          opacity: 0.88;
          transform: translateY(-2px);
        }

        /* ══ CTA BANNER ══ */
        .cta-banner {
          background: var(--navy);
          margin: 0 clamp(20px, 5vw, 48px) clamp(48px, 8vw, 100px);
          border-radius: 28px;
          overflow: hidden;
          position: relative;
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
        }
        .cta-banner::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(223,170,94,0.12) 0%, transparent 60%);
          pointer-events: none;
        }
        .cta-banner-inner {
          position: relative;
          z-index: 1;
          padding: clamp(40px, 6vw, 72px) clamp(28px, 6vw, 72px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
          flex-wrap: wrap;
        }
        .cta-content { flex: 1; min-width: 240px; }
        .cta-eyebrow {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--gold);
          margin-bottom: 12px;
        }
        .cta-heading {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.8rem, 3.5vw, 3rem);
          font-weight: 700;
          color: #fff;
          line-height: 1.15;
          margin-bottom: 12px;
        }
        .cta-sub {
          font-size: clamp(13px, 1.4vw, 15px);
          color: rgba(255,255,255,0.65);
          font-weight: 300;
          line-height: 1.7;
          max-width: 400px;
        }
        .cta-actions {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          flex-shrink: 0;
        }
        .cta-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--gold);
          color: var(--navy);
          padding: clamp(12px, 1.5vw, 15px) clamp(24px, 2.5vw, 32px);
          border-radius: 9999px;
          font-size: clamp(11px, 1.2vw, 13px);
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          text-decoration: none;
          transition: opacity 0.25s, transform 0.25s;
          box-shadow: 0 4px 20px rgba(223,170,94,0.4);
        }
        .cta-btn-primary:hover { opacity: 0.9; transform: translateY(-2px); }
        .cta-btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.1);
          color: #fff;
          border: 1.5px solid rgba(255,255,255,0.25);
          padding: clamp(12px, 1.5vw, 15px) clamp(24px, 2.5vw, 32px);
          border-radius: 9999px;
          font-size: clamp(11px, 1.2vw, 13px);
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          text-decoration: none;
          backdrop-filter: blur(8px);
          transition: background 0.25s, transform 0.25s;
        }
        .cta-btn-secondary:hover {
          background: rgba(255,255,255,0.18);
          transform: translateY(-2px);
        }

        /* ══ RESPONSIVE ══ */
        @media (max-width: 900px) {
          .service-card {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .order-image-first,
          .order-image-last {
            order: 0 !important;
          }
          .service-image-inner {
            aspect-ratio: 16/9;
          }
          .service-cta {
            align-self: stretch;
            justify-content: center;
          }
        }

        @media (max-width: 600px) {
          .hero-stats {
            gap: 20px;
          }
          .cta-banner-inner {
            flex-direction: column;
          }
          .cta-actions {
            width: 100%;
            flex-direction: column;
          }
          .cta-btn-primary,
          .cta-btn-secondary {
            justify-content: center;
            text-align: center;
          }
          .service-number-watermark {
            font-size: 80px;
          }
        }
      `}</style>

      <main className="services-page">

        {/* ── Hero ── */}
        <ServicesHero visible={heroIn} />

        {/* ── Service Cards ── */}
        <section className="services-section">
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </section>

        {/* ── CTA Banner ── */}
        <div style={{ padding: "0 clamp(20px, 5vw, 48px)", paddingBottom: "clamp(48px, 8vw, 100px)", maxWidth: "1296px", margin: "0 auto" }}>
          <CTABanner />
        </div>

      </main>
    </>
  );
}