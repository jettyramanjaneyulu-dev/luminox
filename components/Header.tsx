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
    href: "/laser-treatments",
    submenu: [
      { label: "Fraxel DUAL", href: "/laser-treatments", desc: "" },
      { label: "Fraxel CO2", href: "/laser-treatments", desc: "" },
      { label: "Clear + Brilliant", href: "/laser-treatments", desc: "" },
      { label: "Vbeam Perfecta", href: "/laser-treatments", desc: "" },
      { label: "Laser for Age Spots", href: "/laser-treatments", desc: "" },
      { label: "Laser for Redness", href: "/laser-treatments", desc: "" },
      { label: "Laser Hair Removal", href: "/laser-treatments", desc: "" },
      { label: "Laser Tattoo Removal", href: "/laser-treatments", desc: "" },
    ],
  },
  {
    label: "Injectables",
    href: "/injectables",
    submenu: [
      { label: "BOTOX for Non-Surgical Jaw Reduction", href: "/injectables", desc: "" },
      { label: "BOTOX Cosmetic", href: "/injectables", desc: "" },
      { label: "Nefertiti Lift", href: "/injectables", desc: "" },
      { label: "BOTOX for Hyperhidrosis", href: "/injectables", desc: "" },
      { label: "BOTOX for Migraines", href: "/injectables", desc: "" },
      { label: "BOTOX for TMD/TMJ", href: "/injectables", desc: "" },
      { label: "Radiesse", href: "/injectables", desc: "" },
      { label: "JUVÉDERM", href: "/injectables", desc: "" },
      { label: "JUVÉDERM VOLUMA", href: "/injectables", desc: "" },
      { label: "JUVÉDERM VOLLURE XC", href: "/injectables", desc: "" },
      { label: "Belotero", href: "/injectables", desc: "" },
    ],
  },
  {
    label: "Skin Care",
    href: "/skin-care",
  },
    {
    label: "Hair",
    href: "-#",
    },
     {
    label: "IV Drips",
    href: "-#",
  },
  {
    label: "Aesthetics",
    href: "/aesthetics",
    submenu: [
      { label: "Chemical Peels", href: "/aesthetics", desc: "" },
      { label: "HydraFacial MD", href: "/aesthetics", desc: "" },
      { label: "Sclerotherapy", href: "/aesthetics", desc: "" },
      { label: "Micro-Needling", href: "/aesthetics", desc: "" },
      { label: "PRP Therapy ", href: "/aesthetics", desc: "" },
    ],
  },
  {
    label: "Medical Dermatology",
    href: "/medical-dermatology",
    submenu: [
      { label: "Mohs Surgery", href: "/medical-dermatology", desc: "" },
      { label: "Skin Cancer", href: "/medical-dermatology", desc: "" },
      { label: "Acne", href: "/medical-dermatology", desc: "" },
      { label: "Acne Scars", href: "/medical-dermatology", desc: "" },
      { label: "Rosacea", href: "/medical-dermatology", desc: "" },
      { label: "Moles", href: "/medical-dermatology", desc: "" },
      { label: "Warts", href: "/medical-dermatology", desc: "" },
      { label: "Eczema", href: "/medical-dermatology", desc: "" },
      { label: "Psoriasis", href: "/medical-dermatology", desc: "" },
    ],
  },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
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
              src="/header/luminox-new.png"
              alt="Luminox Skin Hair Laser IV-Drips"
              width={160}
              height={60}
              className="h-10 lg:h-17 w-auto object-contain"
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
                      : activeMenu === item.label ? "text-[#F9DB9F]" : "text-[#292E4B] hover:text-[#F9DB9F]"
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