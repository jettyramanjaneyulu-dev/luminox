"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type Doctor = {
  name: string;
  spec: string;
  qual: string;
  exp: string;
  tag: string;
  accent: string;
  accentBg: string;
  accentRgb: string;
  bio: string;
  img: string;
  socials: { linkedin: string; instagram: string };
  treats: string[];
};

const DOCTORS: Doctor[] = [
  {
    name: "Dr. Aradhana Rao",
    spec: "Senior Dermatologist",
    qual: "MD (Dermatology), AIIMS Delhi",
    exp: "12+ Years",
    tag: "Laser Specialist",
    accent: "#DFAA5E",
    accentBg: "rgba(223,170,94,.18)",
    accentRgb: "223,170,94",
    bio: "Pioneer in advanced laser therapies and clinical dermatology, with over 5,000 successful procedures and multiple national awards for excellence in dermatological care.",
    img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80",
    socials: { linkedin: "#", instagram: "#" },
    treats: ["Laser Resurfacing", "Acne Scars", "Pigmentation"],
  },
  {
    name: "Dr. Sanjay Gupta",
    spec: "Trichologist",
    qual: "MD, Fellowship in Trichology",
    exp: "8+ Years",
    tag: "Hair & Scalp Expert",
    accent: "#D95CB9",
    accentBg: "rgba(217,92,185,.18)",
    accentRgb: "217,92,185",
    bio: "Leading expert in hair restoration and scalp health, combining PRP therapy with cutting-edge transplantation techniques for natural, lasting results.",
    img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80",
    socials: { linkedin: "#", instagram: "#" },
    treats: ["PRP Therapy", "Hair Transplant", "Scalp Analysis"],
  },
  {
    name: "Dr. Meera Iyer",
    spec: "Aesthetic Cosmetologist",
    qual: "MBBS, Diploma in Cosmetology",
    exp: "10+ Years",
    tag: "Rejuvenation Expert",
    accent: "#9B6DB5",
    accentBg: "rgba(155,109,181,.18)",
    accentRgb: "155,109,181",
    bio: "Renowned for her artistry in holistic skin rejuvenation and non-surgical aesthetics, delivering naturally enhanced results with precision injectables and regenerative treatments.",
    img: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=600&q=80",
    socials: { linkedin: "#", instagram: "#" },
    treats: ["Fillers", "Botox", "Skin Rejuvenation"],
  },
];

const LinkedInIcon = () => (
  <svg width="14" height="14" fill="white" viewBox="0 0 24 24">
    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstaIcon = () => (
  <svg width="14" height="14" fill="none" stroke="white" strokeWidth={2} viewBox="0 0 24 24">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="white" stroke="none" />
  </svg>
);

function DoctorCard({ doc, i }: { doc: Doctor; i: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="doctor-card-wrap"
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.15, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
      style={{ position: "relative" }}
    >
      {/* Ghost number */}
      <div style={{
        position: "absolute", top: -14, left: 18,
        fontSize: "clamp(48px,6vw,68px)",
        fontFamily: "'Cormorant Garamond',serif",
        color: "rgba(41,46,75,.04)",
        lineHeight: 1, pointerEvents: "none", zIndex: 0,
      }}>
        {String(i + 1).padStart(2, "0")}
      </div>

      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          height: "clamp(360px,38vw,430px)",
          borderRadius: 22,
          overflow: "hidden",
          position: "relative",
          cursor: "pointer",
          boxShadow: hovered
            ? `0 32px 64px rgba(${doc.accentRgb},.22)`
            : "0 8px 32px rgba(41,46,75,.10)",
          transition: "box-shadow .4s ease",
        }}
      >
        <img
          src={doc.img}
          alt={doc.name}
          style={{
            width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "top", display: "block",
            transform: hovered ? "scale(1.07)" : "scale(1)",
            transition: "transform .6s cubic-bezier(.22,1,.36,1)",
          }}
        />

        {/* Gradient */}
        <div style={{
          position: "absolute", inset: 0,
          background: hovered
            ? "linear-gradient(to top,rgba(41,46,75,.97) 0%,rgba(41,46,75,.45) 65%,transparent 100%)"
            : "linear-gradient(to top,rgba(41,46,75,.92) 0%,rgba(41,46,75,.28) 55%,transparent 100%)",
          transition: "background .4s ease",
        }} />

        {/* Social buttons */}
        <div style={{
          position: "absolute", top: 16, right: 16,
          display: "flex", gap: 8, zIndex: 10,
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(0)" : "translateY(-6px)",
          transition: "opacity .3s ease, transform .3s ease",
        }}>
          {[
            { href: doc.socials.linkedin, icon: <LinkedInIcon />, label: "LinkedIn" },
            { href: doc.socials.instagram, icon: <InstaIcon />, label: "Instagram" },
          ].map((s) => (
            <a key={s.label} href={s.href} aria-label={s.label}
              style={{
                width: 34, height: 34, borderRadius: "50%",
                background: "rgba(255,255,255,.15)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                textDecoration: "none", transition: "background .2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,.28)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,.15)")}
            >
              {s.icon}
            </a>
          ))}
        </div>

        {/* Card body */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "clamp(18px,2.5vw,26px)", color: "#fff" }}>
          {/* Tag */}
          <div style={{
            display: "inline-block", borderRadius: 100,
            padding: "4px 12px", marginBottom: 8,
            background: doc.accentBg, color: doc.accent,
            fontSize: 10, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase",
          }}>
            {doc.tag}
          </div>

          <div style={{ fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", opacity: .7, marginBottom: 3, fontWeight: 500 }}>
            {doc.spec}
          </div>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(17px,2vw,21px)", fontWeight: 700, lineHeight: 1.2, marginBottom: 3 }}>
            {doc.name}
          </div>
          <div style={{ fontSize: 11, opacity: .7, marginBottom: 2 }}>{doc.qual}</div>
          <div style={{ fontSize: 11, fontWeight: 600, color: doc.accent }}>{doc.exp} Experience</div>

          {/* Bio — visible on hover (desktop) / always visible (mobile via CSS) */}
          <div
            className="doctor-bio"
            style={{
              fontSize: 12, lineHeight: 1.65, marginTop: 12, fontWeight: 300,
              opacity: hovered ? 1 : 0,
              transform: hovered ? "translateY(0)" : "translateY(10px)",
              transition: "opacity .35s ease, transform .35s ease",
            }}
          >
            {doc.bio}
          </div>

          {/* Treat pills */}
          <div
            className="doctor-treats"
            style={{
              display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10,
              opacity: hovered ? 1 : 0,
              transform: hovered ? "translateY(0)" : "translateY(8px)",
              transition: "opacity .35s .05s ease, transform .35s .05s ease",
            }}
          >
            {doc.treats.map((t) => (
              <span key={t} style={{
                fontSize: 10, background: "rgba(255,255,255,.12)",
                border: "1px solid rgba(255,255,255,.2)", borderRadius: 100,
                padding: "3px 10px", color: "rgba(255,255,255,.85)", fontWeight: 500,
              }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Doctors() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,700;1,600&family=Jost:wght@300;400;500;700&display=swap');

        .doctors-section { font-family: 'Jost', sans-serif; }

        .doctors-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }

        /* ── Tablet ≤ 960px ── */
        @media (max-width: 960px) {
          .doctors-grid { grid-template-columns: repeat(2, 1fr); }
        }

        /* ── Mobile ≤ 600px ── */
        @media (max-width: 600px) {
          .doctors-section { padding: 52px 0 68px !important; }
          .doctors-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          /* Always show bio + treats on mobile (no hover) */
          .doctor-bio {
            opacity: 1 !important;
            transform: translateY(0) !important;
          }
          .doctor-treats {
            opacity: 1 !important;
            transform: translateY(0) !important;
          }
          .doctor-card-wrap .social-btns {
            opacity: 1 !important;
            transform: translateY(0) !important;
          }
        }

        /* ── Very small ≤ 380px ── */
        @media (max-width: 380px) {
          .doctors-grid { gap: 16px; }
        }

        /* CTA button hover */
        .cta-btn:hover {
          background: #F9DB9F !important;
          transform: translateY(-2px);
        }
      `}</style>

      <section
        className="doctors-section"
        style={{ padding: "90px 0 100px", background: "#fff" }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(16px,4vw,24px)" }}>

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "clamp(44px,6vw,68px)" }}>
            <p style={{ color: "#DFAA5E", letterSpacing: ".35em", fontSize: 11, fontWeight: 700, textTransform: "uppercase", marginBottom: 12 }}>
              Meet Our Experts
            </p>
            <h2 style={{
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: "clamp(28px,4vw,52px)",
              color: "#292E4B", fontWeight: 700, lineHeight: 1.15,
            }}>
              Science Behind the Beauty
            </h2>
            <p style={{
              maxWidth: 580, margin: "16px auto 0",
              fontSize: 14, lineHeight: 1.85, color: "#414042", fontWeight: 300,
            }}>
              Behind every transformation is dermatology expertise. Our clinical approach combines medical diagnosis, advanced technologies, and personalised treatment design to ensure every patient receives care that is thoughtful, precise, and safe.
            </p>
          </div>

          {/* Grid */}
          <div className="doctors-grid">
            {DOCTORS.map((doc, i) => (
              <DoctorCard key={doc.name} doc={doc} i={i} />
            ))}
          </div>

          {/* CTA */}
          <div style={{
            marginTop: "clamp(48px,6vw,72px)",
            borderRadius: 24,
            padding: "clamp(36px,6vw,64px) clamp(24px,5vw,64px)",
            textAlign: "center",
            background: "linear-gradient(135deg,#292E4B 0%,#5B326A 100%)",
          }}>
            <h3 style={{
              color: "#fff",
              fontFamily: "'Cormorant Garamond',serif",
              fontSize: "clamp(22px,3vw,38px)",
              fontWeight: 700, lineHeight: 1.25, marginBottom: 14,
            }}>
              Your Skin Has Potential.<br />
              <em style={{ color: "#F9DB9F", fontStyle: "italic" }}>Let's Reveal It.</em>
            </h3>
            <p style={{ color: "rgba(255,255,255,.82)", maxWidth: 500, margin: "0 auto 26px", lineHeight: 1.75, fontSize: 14, fontWeight: 300 }}>
              Experience dermatology designed for clarity, confidence, and natural beauty.
            </p>
            
           // ✅ Fixed
<a href="/contact"
  className="cta-btn"
              style={{
                display: "inline-block",
                background: "#DFAA5E", color: "#292E4B",
                padding: "15px 38px",
                fontSize: 11, letterSpacing: ".14em", fontWeight: 800,
                textTransform: "uppercase", borderRadius: 4, textDecoration: "none",
                transition: "background .2s, transform .2s",
              }}
            >
              Book Your Consultation
            </a>
          </div>

        </div>
      </section>
    </>
  );
}