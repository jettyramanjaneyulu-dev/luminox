"use client";

import { useState, useEffect } from "react";

const doctor = {
  name: "Dr. Saranya Gadde",
  spec: "Dermatologist & Cosmetologist",
  qual: "MD DVL",
  reg: "Reg No TGMC/FMR/73867",
  tag: "Laser Specialist",
  accent: "#DFAA5E",
  accentBg: "rgba(223,170,94,.15)",
  accentRgb: "223,170,94",
  bio: "Pioneer in advanced laser therapies and clinical dermatology, with over 5,000 successful procedures and multiple national awards for excellence in dermatological care. Dr. Rao blends deep scientific expertise with an artist's eye — ensuring every patient's outcome is both medically sound and aesthetically refined.",
  img: "/home/saranya.png",
  socials: { linkedin: "#", instagram: "#" },
  treats: ["Laser Resurfacing", "Acne Scars", "Pigmentation", "Skin Rejuvenation"],
  stats: [
    { value: "5,000+", label: "Procedures" },
    { value: "12+", label: "Years Exp." },
    { value: "98%", label: "Satisfaction" },
    { value: "15+", label: "Awards" },
  ],
};

const LinkedInIcon = () => (
  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstaIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const CalendarIcon = () => (
  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const StarIcon = () => (
  <svg width="14" height="14" fill="#DFAA5E" viewBox="0 0 24 24">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export default function DoctorProfile() {
  const [visible, setVisible] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,500&family=DM+Sans:wght@300;400;500&display=swap');

        /* ── All variables scoped to this component only ── */
        .doctor-section {
          --gold: #DFAA5E;
          --gold-light: #F9DB9F;
          --gold-dark: #B8843A;
          --navy: #292E4B;
          --navy-light: #3D4369;
          --cream: #FAF7F2;
          --white: #FFFFFF;
          --text-muted: #7A7D8C;
          --border: rgba(41,46,75,.08);
        }

        /* ── Scoped box-sizing — only affects children of this component ── */
        .doctor-section *,
        .doctor-section *::before,
        .doctor-section *::after {
          box-sizing: border-box;
        }

        /* ── Prevent horizontal overflow only within this section ── */
        .doctor-section {
          overflow-x: hidden;
        }

        /* ── Entrance animations ── */
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(28px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity:0; }
          to   { opacity:1; }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes pulse-ring {
          0%   { transform:scale(.95); box-shadow:0 0 0 0 rgba(223,170,94,.5); }
          70%  { transform:scale(1);   box-shadow:0 0 0 12px rgba(223,170,94,0); }
          100% { transform:scale(.95); box-shadow:0 0 0 0 rgba(223,170,94,0); }
        }

        .section-enter { animation: fadeIn .6s ease both; }
        .card-enter    { animation: fadeUp .7s cubic-bezier(.22,1,.36,1) both; }
        .delay-1 { animation-delay: .1s; }
        .delay-2 { animation-delay: .2s; }
        .delay-3 { animation-delay: .3s; }
        .delay-4 { animation-delay: .4s; }
        .delay-5 { animation-delay: .5s; }

        /* ── Section ── */
        .doctor-section {
          font-family: 'DM Sans', sans-serif;
          background: var(--cream);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: clamp(48px,8vw,100px) clamp(16px,5vw,48px);
        }

        /* ── Outer wrapper ── */
        .doctor-wrapper {
          width: 100%;
          max-width: 1120px;
          margin: 0 auto;
        }

        /* ── Header text ── */
        .section-eyebrow {
          color: var(--gold);
          letter-spacing: .35em;
          font-size: 11px;
          font-weight: 500;
          text-transform: uppercase;
          text-align: center;
          margin-bottom: 10px;
        }
        .section-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(30px,4.5vw,54px);
          font-weight: 700;
          color: var(--navy);
          text-align: center;
          line-height: 1.12;
          margin-bottom: clamp(40px,6vw,72px);
        }

        /* ── Card ── */
        .doctor-card {
          background: var(--white);
          border-radius: 28px;
          overflow: hidden;
          display: grid;
          grid-template-columns: 1fr 1fr;
          box-shadow:
            0 2px 4px rgba(41,46,75,.04),
            0 12px 40px rgba(41,46,75,.08),
            0 40px 80px rgba(41,46,75,.06);
          position: relative;
        }

        /* ── Image pane ── */
        .doctor-image-pane {
          position: relative;
          min-height: clamp(400px, 52vw, 620px);
          overflow: hidden;
        }
        .doctor-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top center;
          display: block;
          transition: transform .7s cubic-bezier(.22,1,.36,1);
        }
        .doctor-image-pane:hover .doctor-img {
          transform: scale(1.04);
        }
        .img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            160deg,
            transparent 40%,
            rgba(41,46,75,.55) 100%
          );
          pointer-events: none;
        }

        /* Gold decorative bar on image */
        .img-accent-bar {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 5px;
          background: linear-gradient(90deg, var(--gold-dark), var(--gold), var(--gold-light));
        }

        /* Social icons overlaid on image */
        .img-socials {
          position: absolute;
          top: 24px;
          right: 24px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          z-index: 10;
        }
        .social-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255,255,255,.18);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255,255,255,.3);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          transition: background .25s, transform .25s;
          cursor: pointer;
        }
        .social-btn:hover {
          background: rgba(223,170,94,.7);
          transform: scale(1.1);
        }

        /* Tag badge on image */
        .img-tag {
          position: absolute;
          bottom: 24px;
          left: 24px;
          background: var(--gold);
          color: var(--navy);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .18em;
          text-transform: uppercase;
          border-radius: 100px;
          padding: 6px 14px;
        }

        /* ── Info pane ── */
        .doctor-info-pane {
          padding: clamp(32px,4vw,56px) clamp(28px,4vw,52px);
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 0;
          position: relative;
        }

        /* Decorative corner accent */
        .info-corner-accent {
          position: absolute;
          top: -2px;
          right: -2px;
          width: 120px;
          height: 120px;
          background: radial-gradient(circle at top right, rgba(223,170,94,.12), transparent 70%);
          pointer-events: none;
        }

        .info-speciality {
          font-size: 11px;
          font-weight: 500;
          letter-spacing: .25em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 8px;
        }
        .info-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(28px,3.2vw,42px);
          font-weight: 700;
          color: var(--navy);
          line-height: 1.1;
          margin-bottom: 6px;
        }
        .info-qual-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 6px;
          flex-wrap: wrap;
        }
        .info-qual {
          font-size: 13px;
          color: var(--text-muted);
          font-weight: 400;
        }
        .info-reg {
          font-size: 11px;
          color: var(--text-muted);
          font-weight: 400;
          letter-spacing: .04em;
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .reg-icon {
          width: 14px;
          height: 14px;
          flex-shrink: 0;
          color: var(--gold-dark);
        }

        /* Divider */
        .info-divider {
          height: 1px;
          background: linear-gradient(90deg, var(--gold), transparent);
          margin-bottom: 20px;
          opacity: .35;
        }

        /* Stars + review line */
        .stars-row {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-bottom: 16px;
        }
        .stars-label {
          font-size: 12px;
          color: var(--text-muted);
          margin-left: 6px;
        }

        /* Bio */
        .info-bio {
          font-size: 14px;
          line-height: 1.85;
          color: #4E5268;
          font-weight: 300;
          margin-bottom: 24px;
        }

        /* Stats row */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: var(--border);
          border-radius: 16px;
          overflow: hidden;
          margin-bottom: 24px;
          border: 1px solid var(--border);
        }
        .stat-cell {
          background: var(--white);
          padding: 16px 8px;
          text-align: center;
          transition: background .2s;
        }
        .stat-cell:hover { background: rgba(223,170,94,.06); }
        .stat-value {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(18px,2vw,26px);
          font-weight: 700;
          color: var(--navy);
          line-height: 1;
          margin-bottom: 4px;
        }
        .stat-label {
          font-size: 10px;
          letter-spacing: .1em;
          text-transform: uppercase;
          color: var(--text-muted);
          font-weight: 400;
        }

        /* Treats */
        .treats-label {
          font-size: 10px;
          letter-spacing: .2em;
          text-transform: uppercase;
          color: var(--text-muted);
          font-weight: 500;
          margin-bottom: 10px;
        }
        .treats-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 28px;
        }
        .treat-chip {
          font-size: 11px;
          border-radius: 100px;
          padding: 5px 14px;
          background: rgba(223,170,94,.1);
          color: var(--gold-dark);
          font-weight: 500;
          border: 1px solid rgba(223,170,94,.25);
          transition: background .2s, border-color .2s;
          cursor: default;
        }
        .treat-chip:hover {
          background: rgba(223,170,94,.2);
          border-color: var(--gold);
        }

        /* CTA Buttons */
        .cta-row {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
        }
        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--navy);
          color: #fff;
          border: none;
          border-radius: 100px;
          padding: 13px 28px;
          font-size: 13px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          letter-spacing: .04em;
          cursor: pointer;
          transition: background .25s, transform .2s, box-shadow .25s;
          box-shadow: 0 4px 20px rgba(41,46,75,.18);
          text-decoration: none;
        }
        .btn-primary:hover {
          background: var(--navy-light);
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(41,46,75,.25);
        }
        .btn-secondary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          color: var(--navy);
          border: 1.5px solid rgba(41,46,75,.2);
          border-radius: 100px;
          padding: 13px 28px;
          font-size: 13px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          letter-spacing: .04em;
          cursor: pointer;
          transition: border-color .25s, background .25s, transform .2s;
          text-decoration: none;
        }
        .btn-secondary:hover {
          border-color: var(--gold);
          background: rgba(223,170,94,.06);
          transform: translateY(-2px);
        }

        /* Availability indicator */
        .availability-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #4CAF7D;
          animation: pulse-ring 2.2s ease-in-out infinite;
          flex-shrink: 0;
          display: inline-block;
        }
        .availability-text {
          font-size: 12px;
          color: #4CAF7D;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 16px;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 768px) {
          .doctor-card {
            grid-template-columns: 1fr;
          }
          .doctor-image-pane {
            min-height: clamp(280px, 70vw, 400px);
          }
          .img-socials {
            flex-direction: row;
            top: 16px;
            right: 16px;
          }
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .cta-row {
            flex-direction: column;
          }
          .btn-primary, .btn-secondary {
            justify-content: center;
          }
        }

        @media (max-width: 400px) {
          .doctor-info-pane {
            padding: 24px 20px;
          }
        }
      `}</style>

      <section className={`doctor-section${visible ? " section-enter" : ""}`}>
        <div className="doctor-wrapper">

          {/* Section Header */}
          <p className={`section-eyebrow${visible ? " card-enter" : ""}`}>
            Meet Our Expert
          </p>
          <h2 className={`section-title${visible ? " card-enter delay-1" : ""}`}>
            Science Behind the Beauty
          </h2>

          {/* Card */}
          <div className={`doctor-card${visible ? " card-enter delay-2" : ""}`}>

            {/* ── Image Pane ── */}
            <div className="doctor-image-pane">
              {/* <img
                className="doctor-img"
                src={doctor.img}
                alt={doctor.name}
                onLoad={() => setImgLoaded(true)}
                style={{ opacity: imgLoaded ? 1 : 0, transition: "opacity .5s ease" }}
              /> */}

              <img
  className="doctor-img"
  src={doctor.img}
  alt={doctor.name}
/>
              <div className="img-overlay" />
              <div className="img-accent-bar" />

              {/* Socials */}
              <div className="img-socials">
                <a href={doctor.socials.linkedin} aria-label="LinkedIn" className="social-btn">
                  <LinkedInIcon />
                </a>
                <a href={doctor.socials.instagram} aria-label="Instagram" className="social-btn">
                  <InstaIcon />
                </a>
              </div>

              {/* Tag */}
              <span className="img-tag">{doctor.tag}</span>
            </div>

            {/* ── Info Pane ── */}
            <div className="doctor-info-pane">
              <div className="info-corner-accent" />

              <p className="info-speciality">{doctor.spec}</p>
              <h3 className="info-name">{doctor.name}</h3>

              {/* Qual row — exp removed */}
              <div className="info-qual-row">
                <span className="info-qual">{doctor.qual}</span>
              </div>

              {/* Registration number */}
              <div className="info-reg">
                <svg className="reg-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {doctor.reg}
              </div>

              <div className="info-divider" />

              {/* Stars */}
              <div className="stars-row">
                {[1,2,3,4,5].map(i => <StarIcon key={i} />)}
                <span className="stars-label">4.9 · 320+ patient reviews</span>
              </div>

              {/* Availability */}
              <div className="availability-text">
                <span className="availability-dot" />
                Available for consultations this week
              </div>

              {/* Bio */}
              <p className="info-bio">{doctor.bio}</p>

              {/* Stats */}
              <div className="stats-grid">
                {doctor.stats.map((s) => (
                  <div className="stat-cell" key={s.label}>
                    <div className="stat-value">{s.value}</div>
                    <div className="stat-label">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Treats */}
              <p className="treats-label">Specialises In</p>
              <div className="treats-row">
                {doctor.treats.map((t) => (
                  <span className="treat-chip" key={t}>{t}</span>
                ))}
              </div>

              {/* CTA */}
              <div className="cta-row">
                <a href="/contact" className="btn-primary">
                  <CalendarIcon />
                  Book Consultation
                </a>
                <a href="/about" className="btn-secondary">
                  View Full Profile
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}