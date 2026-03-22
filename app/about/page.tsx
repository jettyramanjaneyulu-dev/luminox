"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

// ── Types ──────────────────────────────────────────────────────────────────
interface RevealRef {
  ref: React.RefObject<HTMLDivElement | null>;
}

// ── Hook: scroll reveal ────────────────────────────────────────────────────
function useReveal(): RevealRef {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("lx-visible");
          obs.unobserve(entry.target);
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref };
}

// ── Sub-components ─────────────────────────────────────────────────────────
function Eyebrow({
  children,
  center = false,
  light = false,
}: {
  children: React.ReactNode;
  center?: boolean;
  light?: boolean;
}) {
  return (
    <p
      style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: "0.68rem",
        fontWeight: 500,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: light ? "#e8c4bf" : "#c2746a",
        display: "flex",
        alignItems: "center",
        justifyContent: center ? "center" : "flex-start",
        gap: "0.65rem",
        marginBottom: "0.8rem",
      }}
    >
      <span
        style={{
          display: "block",
          width: 26,
          height: 1.5,
          background: light ? "#e8c4bf" : "#c2746a",
          flexShrink: 0,
        }}
      />
      {children}
      {center && (
        <span
          style={{
            display: "block",
            width: 26,
            height: 1.5,
            background: "#c2746a",
            flexShrink: 0,
          }}
        />
      )}
    </p>
  );
}

// ── MAIN COMPONENT ─────────────────────────────────────────────────────────
export default function About() {
  // ── Force header into "scrolled" (white) mode on this page ──
  // We dispatch a scroll event so the header's scroll listener triggers
  useEffect(() => {
    // Immediately scroll header to white by dispatching a fake scroll
    // The Header component listens to window.scrollY > 50
    // So we just ensure the page starts knowing it's dark here
    const forceHeaderWhite = () => {
      // Override: we mark <html> with a data attribute the header can read
      document.documentElement.setAttribute("data-page-dark-hero", "true");
    };
    forceHeaderWhite();
    return () => {
      document.documentElement.removeAttribute("data-page-dark-hero");
    };
  }, []);

  // Load Google Fonts
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&family=Playfair+Display:ital,wght@0,700;1,500&display=swap";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const doctorLeft  = useReveal();
  const doctorRight = useReveal();
  const missionHdr  = useReveal();
  const mv1         = useReveal();
  const mv2         = useReveal();
  const p1          = useReveal();
  const p2          = useReveal();
  const p3          = useReveal();
  const p4          = useReveal();

  const credentials = ["MD (DVL)", "Board Certified", "Fellowship Germany", "Global Practice", "UAE Experience"];
  const expertise   = [
    "Clinical Dermatology",
    "Advanced Laser Treatments",
    "Anti-Aging & Aesthetics",
    "Acne & Pigmentation",
    "Hair Restoration (PRP)",
    "Scar Revision",
    "Cosmetic Procedures",
    "Minimally Invasive Aesthetics",
  ];
  const pillars = [
    { icon: "✦", title: "Expert Care",         desc: "Board-certified dermatologist with fellowship training and international experience." },
    { icon: "◉", title: "Advanced Technology",  desc: "Modern laser and cosmetic procedures with minimal recovery time." },
    { icon: "◈", title: "Personalized Plans",   desc: "Every patient receives a tailored treatment plan built around their unique skin goals." },
    { icon: "⬡", title: "Comfortable Setting",  desc: "A calm, welcoming clinic environment designed to put every patient at ease." },
  ];

  return (
    <div
      style={{
        fontFamily: "'DM Sans', sans-serif",
        margin: 0,
        padding: 0,
        overflowX: "hidden",
        background: "#ffffff",
        color: "#1e2a3a",
      }}
    >
      {/* ── Global styles ── */}
      <style>{`
        .lx-serif   { font-family: 'Cormorant Garamond', Georgia, serif; }
        .lx-display { font-family: 'Playfair Display', Georgia, serif; }
        .lx-sans    { font-family: 'DM Sans', sans-serif; }

        @keyframes lxFadeUp {
          from { opacity: 0; transform: translateY(36px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes lxLineGrow {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }

        .lx-hero-tag   { animation: lxFadeUp .9s cubic-bezier(.22,1,.36,1) .1s both; }
        .lx-hero-title { animation: lxFadeUp .9s cubic-bezier(.22,1,.36,1) .22s both; }
        .lx-hero-line  { transform-origin: left; animation: lxLineGrow .9s cubic-bezier(.22,1,.36,1) .5s both; }

        .lx-reveal       { opacity: 0; transform: translateY(28px);  transition: opacity .75s ease, transform .75s ease; }
        .lx-reveal-left  { opacity: 0; transform: translateX(-28px); transition: opacity .8s ease, transform .8s ease; }
        .lx-reveal-right { opacity: 0; transform: translateX(28px);  transition: opacity .8s ease .15s, transform .8s ease .15s; }
        .lx-visible      { opacity: 1 !important; transform: translate(0) !important; }

        .lx-photo-frame { position: relative; border-radius: 2px; overflow: hidden; box-shadow: 0 24px 64px rgba(30,42,58,.14); }
        .lx-photo-frame img { width: 100%; height: 520px; object-fit: cover; object-position: center top; display: block; transition: transform .7s ease; }
        .lx-photo-frame:hover img { transform: scale(1.03); }
        .lx-photo-frame::before {
          content: '';
          position: absolute; top: 0; left: 0;
          width: 4px; height: 100%;
          background: linear-gradient(to bottom, #c2746a, #e8c4bf);
          z-index: 2;
        }

        .lx-pill { transition: background .2s, color .2s, border-color .2s; }
        .lx-pill:hover { background: #c2746a !important; color: #fff !important; border-color: #c2746a !important; }

        .lx-mv-card { position: relative; overflow: hidden; transition: box-shadow .3s ease, transform .3s ease; }
        .lx-mv-card::before {
          content: '';
          position: absolute; top: 0; left: 0;
          height: 3px; width: 100%;
          background: #c2746a;
          transform: scaleX(0); transform-origin: left;
          transition: transform .4s ease;
        }
        .lx-mv-card:hover { box-shadow: 0 16px 52px rgba(30,42,58,.10); transform: translateY(-3px); }
        .lx-mv-card:hover::before { transform: scaleX(1); }

        .lx-pillar { transition: box-shadow .25s; }
        .lx-pillar:hover { box-shadow: 0 8px 32px rgba(30,42,58,.09); }

        .lx-btn-primary {
          font-family: 'DM Sans', sans-serif; font-size: .78rem; font-weight: 500;
          letter-spacing: .14em; text-transform: uppercase;
          background: #c2746a; color: #fff; border: none;
          padding: 1rem 2.4rem; cursor: pointer; text-decoration: none; display: inline-block;
          transition: background .25s, transform .2s, box-shadow .25s;
        }
        .lx-btn-primary:hover { background: #d4847b; transform: translateY(-2px); box-shadow: 0 8px 28px rgba(194,116,106,.38); }

        .lx-btn-outline {
          font-family: 'DM Sans', sans-serif; font-size: .78rem; font-weight: 500;
          letter-spacing: .14em; text-transform: uppercase;
          background: transparent; color: #fff; border: 1.5px solid rgba(255,255,255,.3);
          padding: 1rem 2.2rem; cursor: pointer; text-decoration: none; display: inline-block;
          transition: border-color .25s, color .25s;
        }
        .lx-btn-outline:hover { border-color: #e8c4bf; color: #e8c4bf; }

        @media (max-width: 1024px) {
          .lx-doctor-grid { grid-template-columns: 1fr !important; gap: 3.5rem !important; }
          .lx-photo-frame img { height: 420px !important; }
          .lx-badge { right: 1rem !important; top: 1rem !important; }
          .lx-pillars-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .lx-photo-card { max-width: 480px; }
        }
        @media (max-width: 720px) {
          .lx-doctor-section  { padding: 4.5rem 5% !important; }
          .lx-mission-section { padding: 4.5rem 5% !important; }
          .lx-cta-section     { padding: 4rem 5% !important; flex-direction: column !important; align-items: flex-start !important; }
          .lx-mv-grid         { grid-template-columns: 1fr !important; gap: 1.2rem !important; }
          .lx-pillars-grid    { grid-template-columns: 1fr 1fr !important; }
          .lx-stats-strip     { grid-template-columns: 1fr 1fr !important; }
          .lx-expertise-list  { grid-template-columns: 1fr !important; }
          .lx-hero-title      { font-size: clamp(2rem, 8vw, 2.8rem) !important; }
          .lx-hero            { min-height: 220px !important; padding: 3rem 5% !important; }
          .lx-bio-heading     { font-size: 1.8rem !important; }
        }
        @media (max-width: 480px) {
          .lx-pillars-grid  { grid-template-columns: 1fr !important; }
          .lx-stats-strip   { grid-template-columns: 1fr !important; }
          .lx-cred-row      { gap: .5rem !important; }
          .lx-cta-actions   { flex-direction: column !important; align-items: stretch !important; }
          .lx-btn-primary, .lx-btn-outline { text-align: center; width: 100%; }
        }
      `}</style>

      {/* ══════════════════════════════════════════
          ✅ FIX: White spacer so fixed header
          sits on white background — not the
          dark hero. Header stays visible!
      ══════════════════════════════════════════ */}
      <div
        style={{
          height: "96px",          /* matches header height on desktop */
          background: "#ffffff",   /* matches header scrolled bg */
        }}
        className="lg:h-[96px]"
      />

      {/* ════════════════════════════════════════════
          SECTION 1 — HERO
          Now starts BELOW the header, so the
          dark navy never hides menu items.
      ════════════════════════════════════════════ */}
      <section
        className="lx-hero"
        style={{
          position: "relative",
          minHeight: 300,
          background: "linear-gradient(135deg, #1e2a3a 0%, #2e3f52 60%, #3d5166 100%)",
          display: "flex",
          alignItems: "flex-end",
          overflow: "hidden",
          padding: "3.5rem 7% 4rem",
        }}
      >
        {/* Radial glows */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: `
            radial-gradient(ellipse 60% 80% at 80% 40%, rgba(194,116,106,.18) 0%, transparent 65%),
            radial-gradient(ellipse 40% 50% at 10% 80%, rgba(194,116,106,.08) 0%, transparent 60%)
          `,
        }} />

        {/* Diagonal stripe pattern */}
        <div style={{
          position: "absolute", top: 0, right: 0, width: "38%", height: "100%", pointerEvents: "none",
          backgroundImage: "repeating-linear-gradient(-45deg, transparent, transparent 18px, rgba(255,255,255,.025) 18px, rgba(255,255,255,.025) 19px)",
        }} />

        {/* Content */}
        <div style={{ position: "relative", zIndex: 2, width: "100%" }}>
          <div
            className="lx-hero-tag"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.68rem", fontWeight: 500,
              letterSpacing: "0.22em", textTransform: "uppercase",
              color: "#e8c4bf",
              display: "flex", alignItems: "center", gap: "0.65rem",
              marginBottom: "0.8rem",
            }}
          >
            <span style={{ display: "block", width: 26, height: 1.5, background: "#e8c4bf" }} />
            Luminox Clinics
          </div>

          <h1
            className="lx-hero-title lx-display"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(2.6rem, 5vw, 4.4rem)",
              fontWeight: 700, color: "#fff",
              lineHeight: 1.05, letterSpacing: "-.01em",
            }}
          >
            Meet Our{" "}
            <em style={{ fontStyle: "italic", color: "#e8c4bf" }}>Lead Dermatologist</em>
          </h1>

          <div
            className="lx-hero-line"
            style={{ width: 48, height: 3, background: "#c2746a", marginTop: "1.1rem" }}
          />
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 2 — DOCTOR PROFILE
      ════════════════════════════════════════════ */}
      <section className="lx-doctor-section" style={{ padding: "7rem 7%", background: "#ffffff" }}>
        <div
          className="lx-doctor-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "420px 1fr",
            gap: "6rem",
            alignItems: "start",
            maxWidth: 1160,
            margin: "0 auto",
          }}
        >
          {/* ── Photo card ── */}
          <div
            ref={doctorLeft.ref as React.RefObject<HTMLDivElement>}
            className="lx-photo-card lx-reveal-left"
            style={{ position: "relative" }}
          >
            <div className="lx-photo-frame">
              <Image
                src="/home/saranya.png"
                alt="Dr. Saranya Gadde"
                width={420}
                height={520}
                style={{
                  width: "100%", height: 520,
                  objectFit: "cover", objectPosition: "center top",
                  display: "block",
                }}
                priority
              />
              {/* Name overlay */}
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                background: "linear-gradient(to top, rgba(30,42,58,.88) 0%, transparent 100%)",
                padding: "2.5rem 1.6rem 1.6rem", zIndex: 3,
              }}>
                <div style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "1.5rem", fontWeight: 600,
                  color: "#fff", letterSpacing: ".01em", lineHeight: 1.2,
                }}>
                  Dr. Saranya Gadde
                </div>
                <div style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: ".68rem", fontWeight: 500,
                  letterSpacing: ".18em", textTransform: "uppercase",
                  color: "#e8c4bf", marginTop: ".35rem",
                }}>
                  MD (DVL) · Lead Dermatologist
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div
              className="lx-badge"
              style={{
                position: "absolute", top: "1.8rem", right: "-1.5rem",
                background: "#c2746a", color: "#fff",
                padding: "1rem 1.3rem",
                boxShadow: "0 10px 36px rgba(194,116,106,.35)",
                textAlign: "center", zIndex: 10, minWidth: 110,
              }}
            >
              <span style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "2.4rem", fontWeight: 300,
                lineHeight: 1, letterSpacing: "-.02em", display: "block",
              }}>
                25+
              </span>
              <span style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: ".6rem", fontWeight: 500,
                letterSpacing: ".14em", textTransform: "uppercase",
                opacity: .9, marginTop: ".25rem", display: "block", lineHeight: 1.5,
              }}>
                Years of<br />Experience
              </span>
            </div>

            {/* Credential pills */}
            <div className="lx-cred-row" style={{ display: "flex", flexWrap: "wrap", gap: ".8rem", marginTop: "1.6rem" }}>
              {credentials.map((c) => (
                <span
                  key={c}
                  className="lx-pill"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: ".63rem", fontWeight: 500,
                    letterSpacing: ".12em", textTransform: "uppercase",
                    color: "#2e3f52", background: "#fdf6f5",
                    border: "1px solid #e8c4bf",
                    padding: ".42rem .9rem", borderRadius: 2, cursor: "default",
                  }}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* ── Bio ── */}
          <div
            ref={doctorRight.ref as React.RefObject<HTMLDivElement>}
            className="lx-reveal-right"
            style={{ paddingTop: ".5rem" }}
          >
            <Eyebrow>About the Doctor</Eyebrow>

            <h2
              className="lx-bio-heading lx-display"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(2rem, 3.2vw, 3rem)", fontWeight: 700,
                color: "#1e2a3a", lineHeight: 1.1,
                letterSpacing: "-.02em", marginBottom: "1.6rem",
              }}
            >
              The Expertise<br />Behind{" "}
              <em style={{ fontStyle: "italic", color: "#c2746a" }}>Your Glow</em>
            </h2>

            {[
              "Dr. Saranya Gadde, MD (DVL), is a highly experienced, board-certified dermatologist with over 25 years of clinical expertise in medical, cosmetic, and laser dermatology. Known for her patient-centric approach, she combines scientific precision with aesthetic artistry to deliver natural and effective results.",
              "She completed her medical degree from Dr. NTR University of Health Sciences, Andhra Pradesh, and her postgraduate specialization (MD, DVL) from Karnataka University, earning honors and recognition for her clinical and research contributions.",
            ].map((para, i) => (
              <p
                key={i}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: ".96rem", fontWeight: 300,
                  lineHeight: 1.82, color: "#4b5563", marginBottom: "1.2rem",
                }}
              >
                {para}
              </p>
            ))}

            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: ".96rem", fontWeight: 300, lineHeight: 1.82, color: "#4b5563", marginBottom: "1.2rem" }}>
              To further enhance her expertise, she pursued a{" "}
              <strong style={{ fontWeight: 500, color: "#1e2a3a" }}>Fellowship in Cosmetic and Laser Surgery</strong>{" "}
              from a reputed German institution, gaining advanced skills in minimally invasive aesthetic procedures and modern laser technologies.
            </p>

            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: ".96rem", fontWeight: 300, lineHeight: 1.82, color: "#4b5563", marginBottom: "1.6rem" }}>
              Dr. Saranya has worked with leading hospitals in India and internationally, including significant experience in the{" "}
              <strong style={{ fontWeight: 500, color: "#1e2a3a" }}>UAE healthcare system</strong>.
              She has returned to India to establish Luminox Clinics — a boutique dermatology practice offering personalized, high-quality care with global standards.
            </p>

            {/* Stats strip */}
            <div
              className="lx-stats-strip"
              style={{
                display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
                gap: 1, background: "rgba(30,42,58,.10)",
                borderTop: "1px solid rgba(30,42,58,.10)",
                borderBottom: "1px solid rgba(30,42,58,.10)",
                margin: "2.2rem 0",
              }}
            >
              {[
                { num: "25+", label: "Years Clinical Experience" },
                { num: "3",   label: "Countries Practiced" },
                { num: "1",   label: "German Fellowship" },
              ].map((s) => (
                <div key={s.label} style={{ background: "#fff", padding: "1.4rem 1rem", textAlign: "center" }}>
                  <div style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: "2.2rem", fontWeight: 600,
                    color: "#c2746a", lineHeight: 1, letterSpacing: "-.02em",
                  }}>
                    {s.num}
                  </div>
                  <div style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: ".62rem", fontWeight: 500,
                    letterSpacing: ".15em", textTransform: "uppercase",
                    color: "#6b7280", marginTop: ".35rem",
                  }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Expertise */}
            <Eyebrow>Areas of Expertise</Eyebrow>
            <ul
              className="lx-expertise-list"
              style={{
                listStyle: "none", padding: 0,
                display: "grid", gridTemplateColumns: "1fr 1fr",
                gap: ".55rem .8rem",
              }}
            >
              {expertise.map((item) => (
                <li
                  key={item}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: ".87rem", fontWeight: 300,
                    color: "#4b5563",
                    display: "flex", alignItems: "flex-start",
                    gap: ".6rem", lineHeight: 1.5,
                  }}
                >
                  <span style={{
                    width: 5, height: 5, borderRadius: "50%",
                    background: "#c2746a", flexShrink: 0, marginTop: ".48em",
                  }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 3 — MISSION & VISION
      ════════════════════════════════════════════ */}
      <section
        className="lx-mission-section"
        style={{
          background: "#faf8f6", padding: "6rem 7%",
          borderTop: "1px solid rgba(30,42,58,.06)",
        }}
      >
        {/* Header */}
        <div
          ref={missionHdr.ref as React.RefObject<HTMLDivElement>}
          className="lx-reveal"
          style={{
            textAlign: "center", marginBottom: "4rem",
            maxWidth: 620, marginLeft: "auto", marginRight: "auto",
          }}
        >
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: ".68rem", fontWeight: 500,
            letterSpacing: ".22em", textTransform: "uppercase", color: "#c2746a",
            display: "flex", alignItems: "center", justifyContent: "center",
            gap: ".65rem", marginBottom: ".8rem",
          }}>
            <span style={{ display: "block", width: 24, height: 1.5, background: "#c2746a" }} />
            What Drives Us
            <span style={{ display: "block", width: 24, height: 1.5, background: "#c2746a" }} />
          </p>
          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(1.9rem, 3vw, 2.8rem)", fontWeight: 700,
            color: "#1e2a3a", lineHeight: 1.15,
            letterSpacing: "-.02em", marginBottom: "1rem",
          }}>
            Our Mission &amp; Vision
          </h2>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: ".95rem", fontWeight: 300,
            color: "#6b7280", lineHeight: 1.78,
          }}>
            We believe every patient is unique. Our goal is to carefully examine, guide, and treat each person
            in a calm and comfortable setting — helping you achieve healthy, confident, and beautiful skin.
          </p>
        </div>

        {/* Mission / Vision cards */}
        <div
          className="lx-mv-grid"
          style={{
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: "2rem", maxWidth: 1100, margin: "0 auto 3rem",
          }}
        >
          {[
            {
              ref: mv1,
              tag: "Mission",
              title: "Personalized Care for Every Skin Type",
              desc: "We take the time to understand your concerns and create individualized treatment plans. We treat every patient with the same care and respect as we would our own family — in a calm, modern, and well-equipped clinic.",
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              ),
            },
            {
              ref: mv2,
              tag: "Vision",
              title: "Global Standards, Local Heart",
              desc: "Our vision is to be the most trusted dermatology clinic in Andhra Pradesh — combining global training and advanced technology with the warmth of a boutique practice focused on long-term skin and hair health.",
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              ),
            },
          ].map(({ ref, tag, title, desc, icon }) => (
            <div
              key={tag}
              ref={ref.ref as React.RefObject<HTMLDivElement>}
              className="lx-mv-card lx-reveal"
              style={{
                background: "#fff",
                border: "1px solid rgba(30,42,58,.10)",
                padding: "2.6rem 2.2rem",
              }}
            >
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: ".6rem", fontWeight: 500,
                letterSpacing: ".2em", textTransform: "uppercase",
                color: "#c2746a", marginBottom: ".4rem",
              }}>
                {tag}
              </p>
              <div style={{
                width: 46, height: 46, borderRadius: "50%",
                background: "#fdf6f5",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: "1.3rem", color: "#c2746a",
              }}>
                {icon}
              </div>
              <h3 style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "1.25rem", fontWeight: 600,
                color: "#1e2a3a", lineHeight: 1.3, marginBottom: ".9rem",
              }}>
                {title}
              </h3>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: ".9rem", fontWeight: 300,
                color: "#4b5563", lineHeight: 1.78,
              }}>
                {desc}
              </p>
            </div>
          ))}
        </div>

        {/* 4 Pillars */}
        <div
          className="lx-pillars-grid"
          style={{
            display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1.2rem", maxWidth: 1100, margin: "0 auto",
          }}
        >
          {pillars.map(({ icon, title, desc }, i) => {
            const refs = [p1, p2, p3, p4];
            return (
              <div
                key={title}
                ref={refs[i].ref as React.RefObject<HTMLDivElement>}
                className="lx-pillar lx-reveal"
                style={{
                  background: "#fff",
                  border: "1px solid rgba(30,42,58,.10)",
                  borderTop: "3px solid #c2746a",
                  padding: "1.6rem 1.4rem",
                  transitionDelay: `${0.1 + i * 0.1}s`,
                }}
              >
                <div style={{ fontSize: "1.3rem", color: "#c2746a", marginBottom: ".8rem" }}>
                  {icon}
                </div>
                <h4 style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: ".8rem", fontWeight: 500,
                  letterSpacing: ".08em", textTransform: "uppercase",
                  color: "#1e2a3a", marginBottom: ".5rem",
                }}>
                  {title}
                </h4>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: ".83rem", fontWeight: 300,
                  color: "#6b7280", lineHeight: 1.65,
                }}>
                  {desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ════════════════════════════════════════════
          SECTION 4 — CTA
      ════════════════════════════════════════════ */}
      <section
        className="lx-cta-section"
        style={{
          background: "#1e2a3a",
          padding: "1.5rem 7%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "3rem",
          flexWrap: "wrap",
        }}
      >
        <div>
          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(1.8rem, 3.2vw, 2.7rem)", fontWeight: 700,
            color: "#fff", lineHeight: 1.15,
            letterSpacing: "-.02em", marginBottom: ".7rem",
          }}>
            Ready for{" "}
            <em style={{ fontStyle: "italic", color: "#e8c4bf" }}>Healthier Skin?</em>
          </h2>
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: ".92rem", fontWeight: 300,
            color: "rgba(255,255,255,.65)",
            maxWidth: 460, lineHeight: 1.7,
          }}>
            We are here to listen to your concerns and provide the best possible care for your skin and overall well-being.
            Book a consultation with Dr. Saranya today.
          </p>
        </div>

        <div
          className="lx-cta-actions"
          style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}
        >
          <Link href="/contact" className="lx-btn-primary">
            Book a Consultation
          </Link>
            {/* <Link href="/laser-treatments" className="lx-btn-outline">
              View Our Services
            </Link> */}
        </div>
      </section>
    </div>
  );
}