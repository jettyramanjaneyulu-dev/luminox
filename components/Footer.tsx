"use client";

import Link from "next/link";
import Image from "next/image";

// ─── Brand Colors ─────────────────────────────────────────────────────────────
// 60% → dark navy bg: #1A1D2E (footer dark variant of #292E4B)
// 30% → #292E4B navy  #5B326A deep purple
// 10% → #DFAA5E gold  #D95CB9 pink  #F9DB9F light gold
// Neutral → #414042
// ─────────────────────────────────────────────────────────────────────────────

const NAV_LINKS = {
  Treatments: [
    { label: "Laser Treatments", href: "/treatments/laser" },
    { label: "Injectables & Fillers", href: "/treatments/injectables" },
    { label: "Skin Care", href: "/treatments/skin" },
    { label: "Hair Restoration", href: "/treatments/hair" },
    { label: "Medical Dermatology", href: "/treatments/medical" },
    { label: "Aesthetic Packages", href: "/treatments/aesthetics" },
  ],
  Clinic: [
    { label: "About Luminox", href: "/about" },
    { label: "Meet Our Doctors", href: "/doctors" },
    { label: "Patient Stories", href: "/testimonials" },
    { label: "Before & After", href: "/results" },
    { label: "Blog & Tips", href: "/blog" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Use", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "NABH Accreditation", href: "/accreditation" },
  ],
};

const CONTACT = {
  phone: "+91 80 4567 8900",
  email: "hello@luminoxclinic.com",
  address: "12th Floor, UB City,\nVittal Mallya Road,\nBangalore – 560001, Karnataka",
  timings: [
    { day: "Mon – Sat", time: "10:00 AM – 8:00 PM" },
    { day: "Sunday", time: "11:00 AM – 5:00 PM" },
  ],
};

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <circle cx="12" cy="12" r="4"/>
        <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/>
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M22.54 6.42a2.78 2.78 0 00-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.94 1.95C5.12 20 12 20 12 20s6.88 0 8.6-.47a2.78 2.78 0 001.94-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58z"/>
        <polygon fill="#1A1D2E" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/918045678900",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.115.549 4.099 1.51 5.831L.018 23.944l6.265-1.644A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.372l-.36-.213-3.717.976.992-3.624-.234-.373A9.818 9.818 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182c5.42 0 9.818 4.398 9.818 9.818 0 5.42-4.398 9.818-9.818 9.818z"/>
      </svg>
    ),
  },
];

// Phone / Email / Location / Clock icons
const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
  </svg>
);
const MailIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);
const PinIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);
const ClockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="15" height="15">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer style={{ background: "#0F1120", color: "#FFFFFF", position: "relative", overflow: "hidden" }}>

      {/* ── Decorative background elements ── */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {/* Top gold accent line */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "2px",
          background: "linear-gradient(90deg, transparent 0%, #DFAA5E 30%, #D95CB9 70%, transparent 100%)",
        }}/>
        {/* Radial glow top-left */}
        <div style={{
          position: "absolute", top: "-120px", left: "-80px",
          width: "500px", height: "500px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(223,170,94,0.06) 0%, transparent 65%)",
        }}/>
        {/* Radial glow bottom-right */}
        <div style={{
          position: "absolute", bottom: "-100px", right: "-60px",
          width: "400px", height: "400px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(91,50,106,0.12) 0%, transparent 65%)",
        }}/>
        {/* Faint grid pattern */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}/>
      </div>

      {/* ══════════════════════════════════════
          TOP BAND — Logo + Caption + Socials
      ══════════════════════════════════════ */}
      <div style={{
        position: "relative",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        padding: "52px 0 40px",
      }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}
          className="footer-top-inner">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "32px", flexWrap: "wrap" }}>

            {/* Logo + caption */}
            <div>
              <Image
                src="/header/Luminox.png"
                alt="Luminox Skin · Hair · Laser"
                width={180}
                height={72}
                style={{ objectFit: "contain", marginBottom: "14px" }}
              />
              {/* Caption */}
              <p style={{
                fontFamily: "'Georgia', serif",
                fontStyle: "italic",
                fontSize: "clamp(18px, 2vw, 24px)",
                fontWeight: 400,
                color: "transparent",
                backgroundImage: "linear-gradient(90deg, #DFAA5E 0%, #F9DB9F 50%, #DFAA5E 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                letterSpacing: "0.04em",
                margin: 0,
              }}>
                Radiance Perfected
              </p>
            </div>

            {/* Social icons */}
            <div>
              <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "10px", fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", marginBottom: "14px" }}>
                Follow Us
              </p>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    style={{
                      width: "42px", height: "42px", borderRadius: "50%",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "rgba(255,255,255,0.6)",
                      textDecoration: "none",
                      transition: "all 0.25s ease",
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.background = "#DFAA5E";
                      (e.currentTarget as HTMLElement).style.borderColor = "#DFAA5E";
                      (e.currentTarget as HTMLElement).style.color = "#292E4B";
                      (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.06)";
                      (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
                      (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)";
                      (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                    }}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          MAIN CONTENT — 5 columns
          [Contact] [Treatments] [Clinic] [Legal] [Map/Hours]
      ══════════════════════════════════════ */}
      <div style={{ position: "relative", padding: "56px 0 48px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
          <div className="footer-main-grid" style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr 1fr 0.8fr 1.2fr",
            gap: "48px",
          }}>

            {/* COL 1 — Contact */}
            <div>
              <h4 style={{ color: "#DFAA5E", fontSize: "10px", fontWeight: 800, letterSpacing: "0.28em", textTransform: "uppercase", marginBottom: "24px" }}>
                Get In Touch
              </h4>
              <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>

                {/* Phone */}
                <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                  style={{ display: "flex", alignItems: "flex-start", gap: "12px", textDecoration: "none", color: "inherit" }}
                  className="footer-contact-link"
                >
                  <div style={{
                    width: "32px", height: "32px", borderRadius: "8px", flexShrink: 0,
                    background: "linear-gradient(135deg, rgba(223,170,94,0.2), rgba(223,170,94,0.05))",
                    border: "1px solid rgba(223,170,94,0.25)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#DFAA5E",
                  }}>
                    <PhoneIcon />
                  </div>
                  <div>
                    <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 2px" }}>Phone</p>
                    <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "14px", fontWeight: 600, margin: 0, letterSpacing: "0.02em" }}>{CONTACT.phone}</p>
                  </div>
                </a>

                {/* Email */}
                <a href={`mailto:${CONTACT.email}`}
                  style={{ display: "flex", alignItems: "flex-start", gap: "12px", textDecoration: "none", color: "inherit" }}
                  className="footer-contact-link"
                >
                  <div style={{
                    width: "32px", height: "32px", borderRadius: "8px", flexShrink: 0,
                    background: "linear-gradient(135deg, rgba(217,92,185,0.2), rgba(217,92,185,0.05))",
                    border: "1px solid rgba(217,92,185,0.25)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#D95CB9",
                  }}>
                    <MailIcon />
                  </div>
                  <div>
                    <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 2px" }}>Email</p>
                    <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "13px", fontWeight: 600, margin: 0 }}>{CONTACT.email}</p>
                  </div>
                </a>

                {/* Address */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                  <div style={{
                    width: "32px", height: "32px", borderRadius: "8px", flexShrink: 0,
                    background: "linear-gradient(135deg, rgba(155,109,181,0.2), rgba(155,109,181,0.05))",
                    border: "1px solid rgba(155,109,181,0.25)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#9B6DB5",
                  }}>
                    <PinIcon />
                  </div>
                  <div>
                    <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 2px" }}>Location</p>
                    <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "13px", fontWeight: 500, margin: 0, lineHeight: 1.6, whiteSpace: "pre-line" }}>{CONTACT.address}</p>
                  </div>
                </div>

                {/* Timings */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
                  <div style={{
                    width: "32px", height: "32px", borderRadius: "8px", flexShrink: 0,
                    background: "linear-gradient(135deg, rgba(249,219,159,0.2), rgba(249,219,159,0.05))",
                    border: "1px solid rgba(249,219,159,0.25)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#F9DB9F",
                  }}>
                    <ClockIcon />
                  </div>
                  <div>
                    <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "9px", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", margin: "0 0 6px" }}>Clinic Hours</p>
                    {CONTACT.timings.map((t) => (
                      <div key={t.day} style={{ display: "flex", gap: "8px", marginBottom: "3px", alignItems: "baseline" }}>
                        <span style={{ color: "rgba(255,255,255,0.45)", fontSize: "11px", fontWeight: 600, minWidth: "64px" }}>{t.day}</span>
                        <span style={{ color: "rgba(255,255,255,0.8)", fontSize: "12px", fontWeight: 500 }}>{t.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* COL 2 — Treatments */}
            <div>
              <h4 style={{ color: "#DFAA5E", fontSize: "10px", fontWeight: 800, letterSpacing: "0.28em", textTransform: "uppercase", marginBottom: "24px" }}>
                Treatments
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                {NAV_LINKS.Treatments.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} style={{
                      color: "rgba(255,255,255,0.5)", fontSize: "13px", fontWeight: 500,
                      textDecoration: "none", display: "flex", alignItems: "center", gap: "8px",
                      transition: "color 0.2s ease",
                    }}
                    className="footer-nav-link"
                    >
                      <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#DFAA5E", flexShrink: 0, opacity: 0.4 }}/>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* COL 3 — Clinic */}
            <div>
              <h4 style={{ color: "#D95CB9", fontSize: "10px", fontWeight: 800, letterSpacing: "0.28em", textTransform: "uppercase", marginBottom: "24px" }}>
                Clinic
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                {NAV_LINKS.Clinic.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} style={{
                      color: "rgba(255,255,255,0.5)", fontSize: "13px", fontWeight: 500,
                      textDecoration: "none", display: "flex", alignItems: "center", gap: "8px",
                      transition: "color 0.2s ease",
                    }}
                    className="footer-nav-link"
                    >
                      <span style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#D95CB9", flexShrink: 0, opacity: 0.4 }}/>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* COL 4 — Legal */}
            <div>
              <h4 style={{ color: "rgba(255,255,255,0.35)", fontSize: "10px", fontWeight: 800, letterSpacing: "0.28em", textTransform: "uppercase", marginBottom: "24px" }}>
                Legal
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                {NAV_LINKS.Legal.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} style={{
                      color: "rgba(255,255,255,0.35)", fontSize: "12px", fontWeight: 500,
                      textDecoration: "none", transition: "color 0.2s ease",
                    }}
                    className="footer-nav-link"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* NABH badge */}
              <div style={{
                marginTop: "32px", padding: "14px 16px", borderRadius: "12px",
                background: "rgba(223,170,94,0.08)",
                border: "1px solid rgba(223,170,94,0.2)",
              }}>
                <p style={{ color: "#DFAA5E", fontSize: "9px", fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 4px" }}>NABH Accredited</p>
                <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "11px", margin: 0, lineHeight: 1.5 }}>Certified for patient safety & quality care standards</p>
              </div>
            </div>

            {/* COL 5 — Book CTA */}
            <div>
              <h4 style={{ color: "#9B6DB5", fontSize: "10px", fontWeight: 800, letterSpacing: "0.28em", textTransform: "uppercase", marginBottom: "24px" }}>
                Book Now
              </h4>

              {/* CTA card */}
              <div style={{
                borderRadius: "20px", overflow: "hidden",
                background: "linear-gradient(135deg, #292E4B 0%, #5B326A 100%)",
                border: "1px solid rgba(223,170,94,0.2)",
                padding: "28px 24px",
              }}>
                <p style={{
                  fontFamily: "'Georgia', serif", fontStyle: "italic",
                  fontSize: "16px", color: "#FFFFFF", lineHeight: 1.5,
                  margin: "0 0 20px",
                }}>
                  Your skin journey starts with one conversation.
                </p>
                <a
                  href="/contact"
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                    background: "#DFAA5E", color: "#292E4B",
                    padding: "12px 20px", borderRadius: "6px",
                    fontSize: "11px", fontWeight: 800, letterSpacing: "0.12em",
                    textTransform: "uppercase", textDecoration: "none",
                    transition: "background 0.2s ease",
                    marginBottom: "12px",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#F9DB9F"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#DFAA5E"; }}
                >
                  Book Free Consult
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} width="13" height="13">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                  </svg>
                </a>
                <a
                  href={`https://wa.me/918045678900`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                    background: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.15)",
                    color: "rgba(255,255,255,0.75)",
                    padding: "11px 20px", borderRadius: "6px",
                    fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em",
                    textTransform: "uppercase", textDecoration: "none",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "#25D366"; (e.currentTarget as HTMLElement).style.color = "#25D366"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.15)"; (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.75)"; }}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.115.549 4.099 1.51 5.831L.018 23.944l6.265-1.644A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.006-1.372l-.36-.213-3.717.976.992-3.624-.234-.373A9.818 9.818 0 012.182 12C2.182 6.58 6.58 2.182 12 2.182c5.42 0 9.818 4.398 9.818 9.818 0 5.42-4.398 9.818-9.818 9.818z"/>
                  </svg>
                  WhatsApp Us
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════
          BOTTOM BAR — copyright + links
      ══════════════════════════════════════ */}
      <div style={{
        position: "relative",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "22px 0",
      }}>
        <div style={{
          maxWidth: "1280px", margin: "0 auto", padding: "0 24px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          flexWrap: "wrap", gap: "12px",
        }}>
          <p style={{ color: "rgba(255,255,255,0.25)", fontSize: "12px", margin: 0 }}>
            © {year} Luminox Skin · Hair · Laser. All rights reserved.
          </p>
          {/* <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "11px", margin: 0 }}>
            Bangalore's #1 NABH-Accredited Skin Clinic
          </p> */}
          <div style={{ display: "flex", gap: "24px" }}>
            {["Privacy Policy", "Terms of Use", "Cookie Policy"].map(t => (
              <Link key={t} href="#" style={{ color: "rgba(255,255,255,0.25)", fontSize: "11px", textDecoration: "none" }}
                className="footer-bottom-link"
              >{t}</Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── Global hover styles for links ── */}
      <style>{`
        .footer-nav-link:hover { color: rgba(255,255,255,0.9) !important; }
        .footer-contact-link:hover p:last-child { color: #DFAA5E !important; }
        .footer-bottom-link:hover { color: rgba(255,255,255,0.6) !important; }
        @media (max-width: 1100px) {
          .footer-main-grid {
            grid-template-columns: 1fr 1fr 1fr !important;
          }
        }
        @media (max-width: 700px) {
          .footer-main-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .footer-top-inner {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
        }
        @media (max-width: 480px) {
          .footer-main-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}