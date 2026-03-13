"use client";

import Link from "next/link";
import Image from "next/image";

const NAV_LINKS = {
  Treatments: [
    { label: "Laser Treatments", href: "/treatments/laser" },
    { label: "Injectables & Fillers", href: "/treatments/injectables" },
    { label: "Skin Care", href: "/treatments/skin" },
    { label: "Hair Restoration", href: "/treatments/hair" },
    { label: "Medical Dermatology", href: "/treatments/medical" },
  ],
  Clinic: [
    { label: "About Luminox", href: "/about" },
    { label: "Meet Our Doctors", href: "/doctors" },
    { label: "Patient Stories", href: "/testimonials" },
    { label: "Before & After", href: "/results" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Use", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
};

const SOCIALS = [
  { name: "Instagram", link: "#" },
  { name: "Facebook", link: "#" },
  { name: "YouTube", link: "#" },
  { name: "LinkedIn", link: "#" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "#FFFFFF",
        borderTop: "1px solid #eee",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "auto",
          padding: "80px 24px 40px",
        }}
      >
        {/* TOP */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "40px",
            marginBottom: "60px",
          }}
        >
          {/* LOGO */}
          <div style={{ maxWidth: "260px" }}>
            <Image
              src="/header/Luminox.png"
              alt="Luminox"
              width={180}
              height={70}
            />

            <p
              style={{
                marginTop: "16px",
                fontStyle: "italic",
                fontFamily: "Georgia, serif",
                color: "#5B326A",
                fontSize: "18px",
              }}
            >
              Radiance Perfected
            </p>

            <p
              style={{
                marginTop: "14px",
                color: "#414042",
                fontSize: "14px",
                lineHeight: "1.6",
              }}
            >
              Advanced dermatology clinic offering skin, hair and laser
              treatments with personalised care and modern technology.
            </p>
          </div>

          {/* TREATMENTS */}
          <div>
            <h4
              style={{
                color: "#292E4B",
                fontWeight: "800",
                fontSize: "13px",
                marginBottom: "16px",
              }}
            >
              Treatments
            </h4>

            <ul style={{ listStyle: "none", padding: 0 }}>
              {NAV_LINKS.Treatments.map((l) => (
                <li key={l.label} style={{ marginBottom: "10px" }}>
                  <Link
                    href={l.href}
                    style={{
                      color: "#414042",
                      textDecoration: "none",
                      fontSize: "14px",
                    }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CLINIC */}
          <div>
            <h4
              style={{
                color: "#292E4B",
                fontWeight: "800",
                fontSize: "13px",
                marginBottom: "16px",
              }}
            >
              Clinic
            </h4>

            <ul style={{ listStyle: "none", padding: 0 }}>
              {NAV_LINKS.Clinic.map((l) => (
                <li key={l.label} style={{ marginBottom: "10px" }}>
                  <Link
                    href={l.href}
                    style={{
                      color: "#414042",
                      textDecoration: "none",
                      fontSize: "14px",
                    }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4
              style={{
                color: "#292E4B",
                fontWeight: "800",
                fontSize: "13px",
                marginBottom: "16px",
              }}
            >
              Contact
            </h4>

            <p style={{ fontSize: "14px", color: "#414042" }}>
              +91 80 4567 8900
            </p>

            <p style={{ fontSize: "14px", color: "#414042" }}>
              hello@luminoxclinic.com
            </p>

            <p
              style={{
                fontSize: "14px",
                color: "#414042",
                marginTop: "10px",
              }}
            >
              UB City, Vittal Mallya Road
              <br />
              Bangalore, India
            </p>
          </div>
        </div>

        {/* SOCIAL */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "24px",
            marginBottom: "40px",
          }}
        >
          {SOCIALS.map((s) => (
            <a
              key={s.name}
              href={s.link}
              style={{
                color: "#292E4B",
                fontSize: "14px",
                textDecoration: "none",
              }}
            >
              {s.name}
            </a>
          ))}
        </div>

        {/* BOTTOM */}
        <div
          style={{
            borderTop: "1px solid #eee",
            paddingTop: "20px",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontSize: "13px",
              color: "#777",
            }}
          >
            © {year} Luminox Skin · Hair · Laser. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}