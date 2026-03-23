"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

const NAV_LINKS = {
  Treatments: [
    { label: "Laser Treatments", href: "/laser-treatments" },
    { label: "Injectables", href: "/injectables" },
    { label: "Skin Care", href: "/skin-care" },
    { label: "Hair", href: "/hair" },
    { label: "IV Drips", href: "/ivf-drips" },
    { label: "Aesthetics", href: "/aesthetics" },
    { label: "Medical Dermatology", href: "/medical-dermatology" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    
  ],
  Clinic: [
    { label: "About Luminox", href: "/about" },
    { label: "Meet Our Doctors", href: "/about" },
    { label: "Patient Stories", href: "/home" },
    { label: "Before & After", href: "/home" },
  ],
};

const SOCIALS = [
  {
    name: "Instagram",
    link: "#",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    link: "#",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    link: "#",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    link: "#",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
];

const PhoneIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.06 6.06l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const MailIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const PinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: "2px" }}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: "2px" }}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const contactLinkStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "flex-start",
  gap: "8px",
  fontSize: "13.5px",
  color: "#5C3A14",
  textDecoration: "none",
  cursor: "pointer",
  marginBottom: "10px",
  lineHeight: "1.6",
  transition: "color 0.2s",
};

function ContactBlock() {
  return (
    <div>
      <h4 style={{ color: "#3B1F0A", fontWeight: "800", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "18px", marginTop: 0 }}>
        Contact
      </h4>
      <a href="tel:+916309917333" className="contact-link" style={contactLinkStyle}>
        <PhoneIcon /><span>+91 630 991 7333</span>
      </a>
      <a href="tel:+916309918333" className="contact-link" style={contactLinkStyle}>
        <PhoneIcon /><span>+91 630 991 8333</span>
      </a>
      <a href="mailto:luminoxdermaclinic@gmail.com" className="contact-link" style={contactLinkStyle}>
        <MailIcon /><span>luminoxdermaclinic@gmail.com</span>
      </a>
      <a href="https://maps.app.goo.gl/1y5k4zeDgatzo13X7?g_st=iw" target="_blank" rel="noopener noreferrer" className="contact-link" style={{ ...contactLinkStyle, marginBottom: "10px" }}>
        <PinIcon />
        <span>
          LUMINOX DERMA CLINIC,<br />
          #444, Floor 3, Vishnu lekha plaza,<br />
          Kesav Nagar, Srinagar Colony, Banjara Hills,<br />
          Hyderabad, Telangana – 500073
        </span>
      </a>
      <div style={{ display: "flex", alignItems: "flex-start", gap: "8px", marginTop: "4px" }}>
        <ClockIcon />
        <div>
          <p style={{ margin: 0, fontSize: "13.5px", color: "#5C3A14", lineHeight: "1.6" }}>Monday – Sunday</p>
          <p style={{ margin: 0, fontSize: "13.5px", color: "#3B1F0A", fontWeight: "700", lineHeight: "1.6" }}>10:00 AM – 8:00 PM</p>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", marginTop: "5px", background: "rgba(59,31,10,0.1)", borderRadius: "20px", padding: "2px 10px", fontSize: "11px", fontWeight: "700", color: "#3B1F0A", letterSpacing: "0.04em" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#2e7d32", display: "inline-block" }} />
            Open Every Day
          </span>
        </div>
      </div>
    </div>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3B1F0A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
      style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s ease", flexShrink: 0 }}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function AccordionSection({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid rgba(59,31,10,0.15)" }}>
      <button onClick={() => setOpen((prev) => !prev)}
        style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", background: "none", border: "none", cursor: "pointer", padding: "16px 0" }}
      >
        <span style={{ color: "#3B1F0A", fontWeight: "800", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase" }}>{title}</span>
        <ChevronIcon open={open} />
      </button>
      <div style={{ maxHeight: open ? "400px" : "0px", overflow: "hidden", transition: "max-height 0.35s ease" }}>
        <ul style={{ listStyle: "none", padding: "0 0 16px 0", margin: 0 }}>
          {links.map((l) => (
            <li key={l.label} style={{ marginBottom: "12px" }}>
              <Link href={l.href} style={{ color: "#5C3A14", textDecoration: "none", fontSize: "13.5px", cursor: "pointer" }}>{l.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   ✅ NEW: Scroll-to-top button only
   ══════════════════════════════════════ */
function ScrollToTopButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
      style={{
        position: "fixed",
        bottom: "28px",
        right: "85px",
        zIndex: 999,
        width: "44px",
        height: "44px",
        borderRadius: "50%",
        background: "#3B1F0A",
        border: "2px solid rgba(223,170,94,0.6)",
        color: "#DFAA5E",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        boxShadow: "0 4px 20px rgba(59,31,10,0.35)",
        // ✅ Show/hide with smooth fade+slide
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0)" : "translateY(12px)",
        pointerEvents: show ? "auto" : "none",
        transition: "opacity 0.3s ease, transform 0.3s ease",
      }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  );
}

// ── Main Footer ──
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      {/* ✅ Scroll-to-top button — fixed position, appears after 300px scroll */}
      <ScrollToTopButton />

      <footer style={{ position: "relative", background: "#DFAA5E" }}>

        {/* Half-moon arc curve at the top */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, overflow: "hidden", lineHeight: 0 }}>
          <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
            style={{ display: "block", width: "100%", height: "80px" }}
          >
            <path d="M0,0 L1440,0 L1440,80 Q720,-40 0,80 Z" fill="#FFFFFF" />
          </svg>
        </div>

        {/* Main content */}
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "100px 24px 40px" }}>

          {/* ── DESKTOP GRID ── */}
          <div className="footer-desktop">
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1.2fr 1.2fr 1.8fr", gap: "40px", marginBottom: "56px" }}>
              <div>
                <Image src="/header/luminox-new.png" alt="Luminox" width={160} height={60} />
                <p style={{ marginTop: "14px", fontStyle: "italic", fontFamily: "Georgia, serif", color: "#3B1F0A", fontSize: "17px", letterSpacing: "0.03em" }}>Radiance Perfected</p>
                <p style={{ marginTop: "12px", color: "#5C3A14", fontSize: "13.5px", lineHeight: "1.7" }}>
                  Advanced dermatology clinic offering skin, hair, laser and IV Drips treatments with personalised care and modern technology.
                </p>
              </div>
              <div>
                <h4 style={{ color: "#3B1F0A", fontWeight: "800", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "18px" }}>Treatments</h4>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {NAV_LINKS.Treatments.map((l) => (
                    <li key={l.label} style={{ marginBottom: "10px" }}>
                      <Link href={l.href} className="nav-link" style={{ color: "#5C3A14", textDecoration: "none", fontSize: "13.5px", cursor: "pointer" }}>{l.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 style={{ color: "#3B1F0A", fontWeight: "800", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "18px" }}>Clinic</h4>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {NAV_LINKS.Clinic.map((l) => (
                    <li key={l.label} style={{ marginBottom: "10px" }}>
                      <Link href={l.href} className="nav-link" style={{ color: "#5C3A14", textDecoration: "none", fontSize: "13.5px", cursor: "pointer" }}>{l.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <ContactBlock />
            </div>
          </div>


          {/* ── MOBILE LAYOUT ── */}
          <div className="footer-mobile" style={{ marginBottom: "40px" }}>
            <div style={{ marginBottom: "24px", paddingBottom: "24px", borderBottom: "1px solid rgba(59,31,10,0.15)" }}>
              <Image src="/header/Luminox.png" alt="Luminox" width={140} height={54} />
              <p style={{ marginTop: "12px", fontStyle: "italic", fontFamily: "Georgia, serif", color: "#3B1F0A", fontSize: "16px" }}>Radiance Perfected</p>
              <p style={{ marginTop: "10px", color: "#5C3A14", fontSize: "13px", lineHeight: "1.7" }}>
                Advanced dermatology clinic offering skin, hair, laser and IV Drips treatments with personalised care and modern technology.
              </p>
            </div>
            <AccordionSection title="Treatments" links={NAV_LINKS.Treatments} />
            <AccordionSection title="Clinic" links={NAV_LINKS.Clinic} />
            <div style={{ paddingTop: "20px", marginTop: "4px" }}>
              <ContactBlock />
            </div>
          </div>

          {/* DIVIDER */}
          <div style={{ borderTop: "1px solid rgba(59,31,10,0.2)", marginBottom: "28px" }} />

          {/* BOTTOM ROW */}
          <div className="footer-bottom" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
            <p style={{ fontSize: "12.5px", color: "#5C3A14", margin: 0 }}>
              © {year} Luminox Skin · Hair · Laser · IV Drips. All rights reserved.
            </p>
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              {SOCIALS.map((s) => (
                <a key={s.name} href={s.link} aria-label={s.name} title={s.name} className="social-icon"
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "38px", height: "38px", borderRadius: "50%", background: "rgba(59,31,10,0.12)", color: "#3B1F0A", textDecoration: "none", cursor: "pointer", transition: "background 0.2s, transform 0.2s" }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Global styles — UNCHANGED */}
        <style>{`
          .footer-mobile  { display: none; }
          .footer-desktop { display: block; }
          .nav-link:hover     { color: #3B1F0A !important; }
          .contact-link:hover { color: #3B1F0A !important; }
          .social-icon:hover  { background: rgba(59,31,10,0.28) !important; transform: translateY(-2px); }
          @media (max-width: 768px) {
            .footer-desktop { display: none; }
            .footer-mobile  { display: block; }
            .footer-bottom  { flex-direction: column !important; align-items: flex-start !important; }
          }
        `}</style>
      </footer>
    </>
  );
}
