"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Brand Colors ─────────────────────────────────────────────────────────────
// 60% → #FFFFFF / #FAF9F6
// 30% → #292E4B navy  #5B326A deep purple
// 10% → #DFAA5E gold  #D95CB9 pink  #F9DB9F light gold
// Neutral → #414042
// ─────────────────────────────────────────────────────────────────────────────

// ── Swap these Unsplash URLs with: /public/doctors/doc1.jpg etc. ─────────────
const DOCTORS = [
  {
    name: "Dr. Aradhana Rao",
    spec: "Senior Dermatologist",
    qual: "MD (Dermatology), AIIMS Delhi",
    exp: "12+ Years",
    tag: "Laser Specialist",
    accent: "#DFAA5E",
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
    accentRgb: "155,109,181",
    bio: "Renowned for her artistry in holistic skin rejuvenation and non-surgical aesthetics, delivering naturally enhanced results with precision injectables and regenerative treatments.",
    img: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=600&q=80",
    socials: { linkedin: "#", instagram: "#" },
    treats: ["Fillers", "Botox", "Skin Rejuvenation"],
  },
];

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
  </svg>
);

const GradCapIcon = ({ color }: { color: string }) => (
  <svg viewBox="0 0 24 24" fill={color} width="14" height="14">
    <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/>
    <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z"/>
  </svg>
);

function DoctorCard({ doc, i }: { doc: typeof DOCTORS[0]; i: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: "relative", cursor: "default" }}
    >
      {/* ── Image container ── */}
      <div
        style={{
          position: "relative",
          height: "420px",
          borderRadius: "24px",
          overflow: "hidden",
          boxShadow: hovered
            ? `0 32px 64px rgba(${doc.accentRgb},0.25), 0 8px 24px rgba(41,46,75,0.15)`
            : "0 8px 32px rgba(41,46,75,0.10)",
          transition: "box-shadow 0.5s ease",
        }}
      >
        {/* Doctor photo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={doc.img}
          alt={doc.name}
          style={{
            width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "top",
            transform: hovered ? "scale(1.07)" : "scale(1)",
            filter: hovered ? "grayscale(0%)" : "grayscale(20%)",
            transition: "transform 0.7s ease, filter 0.7s ease",
          }}
        />

        {/* Dark overlay — always present, deepens on hover */}
        <div style={{
          position: "absolute", inset: 0,
          background: hovered
            ? `linear-gradient(to top, rgba(41,46,75,0.95) 0%, rgba(41,46,75,0.4) 50%, transparent 100%)`
            : `linear-gradient(to top, rgba(41,46,75,0.70) 0%, rgba(41,46,75,0.05) 60%, transparent 100%)`,
          transition: "background 0.5s ease",
        }}/>

        {/* Tag pill — top left */}
        <div style={{
          position: "absolute", top: "20px", left: "20px",
          background: doc.accent,
          color: "#292E4B",
          fontSize: "10px", fontWeight: 800,
          letterSpacing: "0.12em", textTransform: "uppercase",
          padding: "6px 14px", borderRadius: "100px",
          zIndex: 10,
          transform: hovered ? "translateY(0)" : "translateY(-4px)",
          opacity: hovered ? 1 : 0.85,
          transition: "transform 0.4s ease, opacity 0.4s ease",
        }}>
          {doc.tag}
        </div>

        {/* Exp badge — top right */}
        <div style={{
          position: "absolute", top: "20px", right: "20px",
          background: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.2)",
          color: "#FFFFFF",
          fontSize: "10px", fontWeight: 700,
          letterSpacing: "0.1em", textTransform: "uppercase",
          padding: "6px 12px", borderRadius: "100px",
          zIndex: 10,
        }}>
          {doc.exp}
        </div>

        {/* Bottom content — always shows name, expands on hover */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          padding: "28px 28px 24px",
          zIndex: 10,
        }}>
          {/* Name + spec — always visible */}
          <p style={{
            color: "rgba(255,255,255,0.7)", fontSize: "10px",
            fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase",
            marginBottom: "4px",
          }}>
            {doc.spec}
          </p>
          <h3 style={{
            color: "#FFFFFF", fontFamily: "'Georgia', serif",
            fontSize: "20px", fontWeight: 800, lineHeight: 1.2,
            margin: 0,
          }}>
            {doc.name}
          </h3>

          {/* Qualification line */}
          <div style={{
            display: "flex", alignItems: "center", gap: "6px",
            marginTop: "8px",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 0.4s ease 0.05s, transform 0.4s ease 0.05s",
          }}>
            <GradCapIcon color={doc.accent} />
            <span style={{ color: "rgba(255,255,255,0.65)", fontSize: "11px", fontWeight: 600 }}>
              {doc.qual}
            </span>
          </div>

          {/* Bio */}
          <p style={{
            color: "rgba(255,255,255,0.75)", fontSize: "13px", lineHeight: 1.65,
            marginTop: "12px",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.4s ease 0.1s, transform 0.4s ease 0.1s",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}>
            {doc.bio}
          </p>

          {/* Treatment pills */}
          <div style={{
            display: "flex", flexWrap: "wrap", gap: "6px",
            marginTop: "14px",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(10px)",
            transition: "opacity 0.4s ease 0.15s, transform 0.4s ease 0.15s",
          }}>
            {doc.treats.map((t) => (
              <span key={t} style={{
                background: `rgba(${doc.accentRgb},0.18)`,
                border: `1px solid rgba(${doc.accentRgb},0.4)`,
                color: doc.accent,
                fontSize: "10px", fontWeight: 700,
                padding: "4px 10px", borderRadius: "100px",
                letterSpacing: "0.05em",
              }}>
                {t}
              </span>
            ))}
          </div>

          {/* Social buttons */}
          <div style={{
            display: "flex", gap: "8px", marginTop: "16px",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(10px)",
            transition: "opacity 0.4s ease 0.2s, transform 0.4s ease 0.2s",
          }}>
            {[
              { icon: <LinkedInIcon />, href: doc.socials.linkedin, label: "LinkedIn" },
              { icon: <InstagramIcon />, href: doc.socials.instagram, label: "Instagram" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                style={{
                  width: "36px", height: "36px", borderRadius: "50%",
                  background: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#FFFFFF", textDecoration: "none",
                  transition: "background 0.2s ease, border-color 0.2s ease",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = doc.accent;
                  (e.currentTarget as HTMLElement).style.borderColor = doc.accent;
                  (e.currentTarget as HTMLElement).style.color = "#292E4B";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.12)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.2)";
                  (e.currentTarget as HTMLElement).style.color = "#FFFFFF";
                }}
              >
                {s.icon}
              </a>
            ))}
            <a
              href="#"
              style={{
                marginLeft: "auto",
                display: "flex", alignItems: "center", gap: "6px",
                background: doc.accent, color: "#292E4B",
                fontSize: "10px", fontWeight: 800, letterSpacing: "0.1em",
                textTransform: "uppercase", textDecoration: "none",
                padding: "8px 16px", borderRadius: "100px",
                transition: "opacity 0.2s ease",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = "0.85"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
            >
              Book
              <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} width="12" height="12">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Accent corner bracket — bottom right */}
        <div style={{
          position: "absolute", bottom: "20px", right: "0px",
          width: "28px", height: "28px",
          borderBottom: `2px solid ${doc.accent}`,
          borderRight: `2px solid ${doc.accent}`,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.4s ease 0.1s",
          zIndex: 11,
        }}/>
        <div style={{
          position: "absolute", top: "0px", left: "20px",
          width: "28px", height: "28px",
          borderTop: `2px solid ${doc.accent}`,
          borderLeft: `2px solid ${doc.accent}`,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.4s ease 0.1s",
          zIndex: 11,
        }}/>
      </div>

      {/* ── Number tag below image ── */}
      <div style={{
        position: "absolute", top: "-16px", left: "28px",
        fontFamily: "'Georgia', serif",
        fontSize: "72px", fontWeight: 800, lineHeight: 1,
        color: "rgba(41,46,75,0.04)",
        userSelect: "none", pointerEvents: "none",
        zIndex: 0,
      }}>
        {String(i + 1).padStart(2, "0")}
      </div>
    </motion.div>
  );
}

export default function Doctors() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ background: "#FFFFFF", padding: "80px 0 100px" }}
    >
      {/* ── Subtle background blobs ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div style={{
          position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)",
          width: "900px", height: "400px",
          background: "radial-gradient(ellipse, rgba(223,170,94,0.04) 0%, transparent 70%)",
        }}/>
        <div style={{
          position: "absolute", bottom: 0, right: 0,
          width: "400px", height: "400px",
          background: "radial-gradient(circle, rgba(91,50,106,0.05) 0%, transparent 65%)",
        }}/>
      </div>

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 20px", position: "relative" }}>

        {/* ── Section header ── */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: "64px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "14px" }}>
            <div style={{ height: "1px", width: "32px", background: "#DFAA5E" }}/>
            <span style={{
              color: "#DFAA5E", fontWeight: 700, fontSize: "11px",
              letterSpacing: "0.3em", textTransform: "uppercase",
            }}>
              The Experts Behind Your Glow
            </span>
            <div style={{ height: "1px", width: "32px", background: "#DFAA5E" }}/>
          </div>
          <h2 style={{
            color: "#292E4B", fontFamily: "'Georgia', serif",
            fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 800,
            lineHeight: 1.15, textAlign: "center", margin: 0,
          }}>
            Meet Our{" "}
            <em style={{ color: "#DFAA5E", fontStyle: "italic" }}>Specialists</em>
          </h2>
          <p style={{
            color: "#414042", fontSize: "15px", maxWidth: "500px",
            textAlign: "center", lineHeight: 1.7, margin: "14px 0 0",
          }}>
            Board-certified experts with a combined legacy of 30+ years, delivering precision care and visible transformations.
          </p>
        </div>

        {/* ── Doctor cards grid ── */}
        <div
          className="doctors-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "28px",
            alignItems: "start",
          }}
        >
          {DOCTORS.map((doc, i) => (
            <DoctorCard key={doc.name} doc={doc} i={i} />
          ))}
        </div>

        {/* ── Bottom CTA strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          style={{
            marginTop: "64px",
            borderRadius: "24px",
            padding: "36px 48px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "24px",
            background: "linear-gradient(135deg, #292E4B 0%, #5B326A 100%)",
            boxShadow: "0 16px 60px rgba(41,46,75,0.22)",
          }}
          className="cta-strip"
        >
          <div>
            <p style={{ color: "#DFAA5E", fontSize: "11px", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: "6px" }}>
              Ready to Meet Your Doctor?
            </p>
            <h3 style={{
              color: "#FFFFFF", fontFamily: "'Georgia', serif",
              fontSize: "clamp(18px, 2.5vw, 26px)", fontWeight: 800, margin: 0,
            }}>
              Book a free consultation with our{" "}
              <em style={{ color: "#F9DB9F" }}>specialists today.</em>
            </h3>
          </div>
          <a
            href="/contact"
            style={{
              display: "inline-flex", alignItems: "center", gap: "10px",
              background: "#DFAA5E", color: "#292E4B",
              padding: "14px 28px", borderRadius: "4px",
              fontSize: "11px", fontWeight: 800, letterSpacing: "0.12em",
              textTransform: "uppercase", textDecoration: "none",
              whiteSpace: "nowrap", flexShrink: 0,
              transition: "background 0.2s ease",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#F9DB9F"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#DFAA5E"; }}
          >
            Book Free Consult
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} width="14" height="14">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
            </svg>
          </a>
        </motion.div>
      </div>

      {/* ── Responsive styles ── */}
      <style>{`
        @media (max-width: 900px) {
          .doctors-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 580px) {
          .doctors-grid {
            grid-template-columns: 1fr !important;
          }
          .cta-strip {
            flex-direction: column !important;
            text-align: center;
            padding: 32px 24px !important;
          }
        }
      `}</style>
    </section>
  );
}