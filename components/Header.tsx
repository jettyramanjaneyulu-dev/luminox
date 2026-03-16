"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

// ─── Brand Color Tokens — 60 / 30 / 10 Rule ───────────────────────────────────
// 60% DOMINANT  → #FFFFFF white
// 30% SECONDARY → #292E4B navy + #5B326A deep purple
// 10% ACCENT    → #DFAA5E gold  #D95CB9 pink  #F9DB9F light gold
// NEUTRAL       → #414042 — body copy
// ──────────────────────────────────────────────────────────────────────────────

const menuItems = [
  {
    label: "Laser Treatments",
    href: "#",
    submenu: [
      { label: "Laser Hair Removal", href: "#", desc: "Permanent hair reduction" },
      { label: "Fractional CO2 Laser", href: "#", desc: "Skin resurfacing & renewal" },
      { label: "Nd:YAG Laser", href: "#", desc: "Vascular & pigment treatment" },
      { label: "Picosecond Laser", href: "#", desc: "Tattoo & pigmentation removal" },
      { label: "IPL Photofacial", href: "#", desc: "Broad-spectrum light therapy" },
    ],
  },
  {
    label: "Injectables",
    href: "#",
    submenu: [
      { label: "Botulinum Toxin", href: "#", desc: "Dynamic wrinkle relaxation" },
      { label: "Dermal Fillers", href: "#", desc: "Volume & contouring" },
      { label: "PRP Therapy", href: "#", desc: "Platelet-rich plasma rejuvenation" },
      { label: "Skin Boosters", href: "#", desc: "Deep hydration & glow" },
      { label: "Mesotherapy", href: "#", desc: "Micronutrient infusions" },
    ],
  },
  {
    label: "Skin Care",
    href: "#",
    submenu: [
      { label: "Chemical Peels", href: "#", desc: "Exfoliation & brightening" },
      { label: "HydraFacial", href: "#", desc: "Multi-step deep cleanse" },
      { label: "Microdermabrasion", href: "#", desc: "Surface skin renewal" },
      { label: "LED Light Therapy", href: "#", desc: "Cellular repair & rejuvenation" },
      { label: "Prescription Skincare", href: "#", desc: "Clinically tailored regimens" },
    ],
  },
    {
    label: "Hair",
    href: "#",
    submenu: [
      { label: "Chemical Peels", href: "#", desc: "Exfoliation & brightening" },
      { label: "HydraFacial", href: "#", desc: "Multi-step deep cleanse" },
      { label: "Microdermabrasion", href: "#", desc: "Surface skin renewal" },
      { label: "LED Light Therapy", href: "#", desc: "Cellular repair & rejuvenation" },
      { label: "Prescription Skincare", href: "#", desc: "Clinically tailored regimens" },
    ],
  },
  {
    label: "Aesthetics",
    href: "#",
    submenu: [
      { label: "Body Contouring", href: "#", desc: "Non-surgical fat reduction" },
      { label: "Ultherapy", href: "#", desc: "Ultrasound skin tightening" },
      { label: "RF Microneedling", href: "#", desc: "Collagen induction therapy" },
      { label: "Thread Lift", href: "#", desc: "Minimally invasive lifting" },
      { label: "Cryolipolysis", href: "#", desc: "Controlled fat freezing" },
    ],
  },
  {
    label: "Medical Dermatology",
    href: "#",
    submenu: [
      { label: "Acne Treatment", href: "#", desc: "Advanced acne management" },
      { label: "Eczema & Psoriasis", href: "#", desc: "Chronic skin condition care" },
      { label: "Mole & Lesion Removal", href: "#", desc: "Safe lesion excision" },
      { label: "Vitiligo Treatment", href: "#", desc: "Repigmentation therapies" },
      { label: "Skin Cancer Screening", href: "#", desc: "Early detection & care" },
    ],
  },
  { label: "About Us", href: "#" },
  { label: "Contact", href: "#" },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 1024) setMobileOpen(false); };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileOpen]);

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(label);
  };
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setActiveMenu(null), 150);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-[70] transition-all duration-500 ${
          scrolled || mobileOpen
            ? "bg-white border-b border-[#292E4B]/12 py-3 shadow-sm"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">

          {/* ── Logo (Stays in place during mobile menu) ── */}
          <Link href="/" className="shrink-0 relative z-[80]" onClick={() => setMobileOpen(false)}>
            <Image
              src="/header/Luminox.png"
              alt="Luminox Skin Hair Laser"
              width={160}
              height={60}
              className="h-10 lg:h-12 w-auto object-contain"
              priority
            />
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden lg:flex items-center gap-0.5 text-[12.5px] font-bold uppercase tracking-wider">
            {menuItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.submenu && handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-1 px-3 py-2 rounded-sm transition-colors duration-200 whitespace-nowrap
                    ${scrolled
                      ? activeMenu === item.label ? "text-[#DFAA5E]" : "text-[#292E4B] hover:text-[#DFAA5E]"
                      : activeMenu === item.label ? "text-[#F9DB9F]" : "text-white hover:text-[#F9DB9F]"
                    }`}
                >
                  {item.label}
                  {item.submenu && (
                    <svg
                      className={`w-3 h-3 transition-transform duration-200 ${activeMenu === item.label ? "rotate-180" : ""}`}
                      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  )}
                </Link>

                {item.submenu && (
                  <div
                    className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64
                      bg-white border border-[#292E4B]/10 rounded-sm shadow-xl transition-all duration-200 origin-top
                      ${activeMenu === item.label ? "opacity-100 scale-y-100" : "opacity-0 scale-y-95 pointer-events-none"}`}
                  >
                    <div className="h-[3px] bg-gradient-to-r from-[#DFAA5E] via-[#F9DB9F] to-[#D95CB9] rounded-t-sm" />
                    <ul className="py-1.5">
                      {item.submenu.map((sub) => (
                        <li key={sub.label}>
                          <Link href={sub.href} className="group flex flex-col px-5 py-3 hover:bg-[#292E4B]/5 transition-colors">
                            <span className="text-[#292E4B] text-[12px] uppercase tracking-wider group-hover:text-[#DFAA5E] font-bold">
                              {sub.label}
                            </span>
                            <span className="text-[#414042]/55 text-[11px] capitalize font-light mt-0.5">
                              {sub.desc}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* ── Right Side: CTA + Hamburger/Close ── */}
          <div className="flex items-center gap-4 relative z-[80]">
            {/* <Link
              href="#"
              className={`hidden lg:inline-flex items-center px-5 py-2 text-[11px] font-bold uppercase tracking-widest rounded-sm transition-all duration-200
                ${scrolled
                  ? "bg-[#292E4B] text-white hover:bg-[#DFAA5E] hover:text-[#292E4B]"
                  : "bg-white/15 backdrop-blur-sm text-white border border-white/40 hover:bg-[#DFAA5E]"
                }`}
            >
              Book Now
            </Link> */}

            {/* Hamburger turns into "X" Close Button */}
            <button
              className="lg:hidden flex flex-col justify-center items-center w-10 h-10"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              <div className="flex flex-col gap-[6px] w-6">
                <span className={`block h-[2px] w-full transition-all duration-300 origin-center
                  ${scrolled || mobileOpen ? "bg-[#292E4B]" : "bg-white"}
                  ${mobileOpen ? "rotate-45 translate-y-[8px]" : ""}`}
                />
                <span className={`block h-[2px] w-full transition-all duration-300
                  ${scrolled || mobileOpen ? "bg-[#292E4B]" : "bg-white"}
                  ${mobileOpen ? "opacity-0" : ""}`}
                />
                <span className={`block h-[2px] w-full transition-all duration-300 origin-center
                  ${scrolled || mobileOpen ? "bg-[#292E4B]" : "bg-white"}
                  ${mobileOpen ? "-rotate-45 -translate-y-[8px]" : ""}`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Menu Overlay ── */}
      <div
        className={`fixed inset-0 z-[60] bg-white transition-transform duration-500 lg:hidden
          ${mobileOpen ? "translate-y-0" : "-translate-y-full"}`}
      >
        {/* Gradient Top Bar */}
        <div className="h-[3px] bg-gradient-to-r from-[#DFAA5E] via-[#F9DB9F] to-[#D95CB9] fixed top-0 left-0 w-full" />

        <div className="overflow-y-auto h-full pt-24 pb-12 px-6">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.label} className="border-b border-[#292E4B]/10 last:border-0">
                {item.submenu ? (
                  <>
                    <button
                      className={`w-full flex items-center justify-between py-4 text-sm uppercase tracking-widest font-bold transition-colors
                        ${mobileExpanded === item.label ? "text-[#DFAA5E]" : "text-[#292E4B]"}`}
                      onClick={() =>
                        setMobileExpanded(mobileExpanded === item.label ? null : item.label)
                      }
                    >
                      {item.label}
                      <svg
                        className={`w-4 h-4 transition-transform duration-200 ${mobileExpanded === item.label ? "rotate-180" : ""}`}
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    <div className={`overflow-hidden transition-all duration-300
                      ${mobileExpanded === item.label ? "max-h-[600px] pb-4" : "max-h-0"}`}>
                      <ul className="pl-4 border-l-2 border-[#5B326A]/25 space-y-1">
                        {item.submenu.map((sub) => (
                          <li key={sub.label}>
                            <Link
                              href={sub.href}
                              onClick={() => setMobileOpen(false)}
                              className="group block py-3 px-3 hover:bg-[#292E4B]/5 rounded-sm"
                            >
                              <span className="block text-[#292E4B] text-[11px] uppercase tracking-wider font-bold">
                                {sub.label}
                              </span>
                              <span className="block text-[#414042]/60 text-[10px] mt-0.5 font-light">
                                {sub.desc}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-4 text-[#292E4B] text-sm uppercase tracking-widest font-bold"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          <div className="mt-8 space-y-3">
            <Link
              href="#"
              onClick={() => setMobileOpen(false)}
              className="block w-full text-center py-4 bg-[#292E4B] text-white text-xs font-bold uppercase tracking-widest rounded-sm"
            >
              Book Appointment
            </Link>
            {/* <Link
              href="/about"
              onClick={() => setMobileOpen(false)}
              className="block w-full text-center py-4 border border-[#5B326A]/30 text-[#5B326A] text-xs font-bold uppercase tracking-widest rounded-sm"
            >
              Explore Our Clinic
            </Link> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;