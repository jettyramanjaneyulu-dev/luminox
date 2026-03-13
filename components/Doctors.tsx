"use client";

import { useState } from "react";
import { motion } from "framer-motion";

// ── Doctor Data ─────────────────────────────────────────
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

// ── Card Component ──────────────────────────────────────
function DoctorCard({ doc, i }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: i * 0.15, duration: 0.7 }}
      viewport={{ once: true }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ position: "relative" }}
    >
      <div
        style={{
          height: "420px",
          borderRadius: "24px",
          overflow: "hidden",
          position: "relative",
          boxShadow: hovered
            ? `0 32px 64px rgba(${doc.accentRgb},0.25)`
            : "0 8px 32px rgba(41,46,75,0.10)",
        }}
      >
        <img
          src={doc.img}
          alt={doc.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: hovered ? "scale(1.07)" : "scale(1)",
            transition: "0.6s",
          }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to top, rgba(41,46,75,0.9), rgba(41,46,75,0.3), transparent)",
          }}
        />

        <div
          style={{
            position: "absolute",
            bottom: 0,
            padding: "28px",
            color: "#fff",
          }}
        >
          <p
            style={{
              fontSize: "11px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              opacity: 0.8,
            }}
          >
            {doc.spec}
          </p>

          <h3
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "20px",
              fontWeight: 800,
              margin: 0,
            }}
          >
            {doc.name}
          </h3>

          <p
            style={{
              fontSize: "12px",
              marginTop: "6px",
              opacity: 0.8,
            }}
          >
            {doc.qual}
          </p>

          <p
            style={{
              fontSize: "13px",
              marginTop: "10px",
              lineHeight: 1.6,
              opacity: hovered ? 1 : 0,
              transform: hovered ? "translateY(0)" : "translateY(10px)",
              transition: "0.3s",
            }}
          >
            {doc.bio}
          </p>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          top: "-18px",
          left: "20px",
          fontSize: "72px",
          fontFamily: "Georgia, serif",
          color: "rgba(41,46,75,0.04)",
        }}
      >
        {String(i + 1).padStart(2, "0")}
      </div>
    </motion.div>
  );
}

// ── Main Section ────────────────────────────────────────
export default function Doctors() {
  return (
    <section
      style={{
        padding: "100px 0",
        background: "#FFFFFF",
      }}
    >
      <div
        style={{
          maxWidth: "1280px",
          margin: "auto",
          padding: "0 20px",
        }}
      >
        {/* HEADER */}
        <div style={{ textAlign: "center", marginBottom: "70px" }}>
          <p
            style={{
              color: "#DFAA5E",
              letterSpacing: "0.35em",
              fontSize: "11px",
              fontWeight: 700,
              textTransform: "uppercase",
            }}
          >
            DOCTOR SECTION
          </p>

          <h2
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "clamp(34px,4vw,56px)",
              color: "#292E4B",
              marginTop: "10px",
            }}
          >
            Science Behind the Beauty
          </h2>

          <p
            style={{
              maxWidth: "620px",
              margin: "20px auto 0",
              fontSize: "15px",
              lineHeight: 1.8,
              color: "#414042",
            }}
          >
            Behind every transformation is dermatology expertise.
            <br />
            <br />
            Our clinical approach combines medical diagnosis, advanced
            technologies, and personalised treatment design to ensure every
            patient receives care that is thoughtful, precise, and safe.
            <br />
            <br />
            Because true dermatology is not about trends — it is about
            understanding skin deeply.
          </p>
        </div>

        {/* DOCTORS GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: "30px",
          }}
          className="doctors-grid"
        >
          {DOCTORS.map((doc, i) => (
            <DoctorCard key={doc.name} doc={doc} i={i} />
          ))}
        </div>

        {/* FINAL CTA */}
        <div
          style={{
            marginTop: "80px",
            borderRadius: "24px",
            padding: "60px",
            textAlign: "center",
            background:
              "linear-gradient(135deg,#292E4B 0%, #5B326A 100%)",
          }}
        >
          <h3
            style={{
              color: "#fff",
              fontFamily: "Georgia, serif",
              fontSize: "clamp(26px,3vw,36px)",
              marginBottom: "14px",
            }}
          >
            Your Skin Has Potential.
            <br />
            <em style={{ color: "#F9DB9F" }}>Let's Reveal It.</em>
          </h3>

          <p
            style={{
              color: "rgba(255,255,255,0.85)",
              maxWidth: "520px",
              margin: "0 auto 30px",
              lineHeight: 1.7,
            }}
          >
            Experience dermatology designed for clarity, confidence,
            and natural beauty.
          </p>

          <a
            href="/contact"
            style={{
              display: "inline-block",
              background: "#DFAA5E",
              color: "#292E4B",
              padding: "16px 36px",
              fontSize: "12px",
              letterSpacing: "0.12em",
              fontWeight: 800,
              textTransform: "uppercase",
              borderRadius: "4px",
              textDecoration: "none",
            }}
          >
            Book Your Consultation
          </a>
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width:900px){
          .doctors-grid{
            grid-template-columns: repeat(2,1fr);
          }
        }

        @media (max-width:580px){
          .doctors-grid{
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}