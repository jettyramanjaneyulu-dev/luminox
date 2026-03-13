"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

// ─── Brand Color Tokens — 60 / 30 / 10 Rule ───────────────────────────────────
// 60% DOMINANT  → #FFFFFF white  — page backgrounds, header bg (scrolled), cards
// 30% SECONDARY → #292E4B navy + #5B326A deep purple  — nav text, headings, borders
// 10% ACCENT    → #DFAA5E gold  #D95CB9 pink  #F9DB9F light gold  — CTAs, hovers,
//                 gradient bars, active states, highlights
// NEUTRAL       → #414042 — body copy, muted labels, descriptions
// ──────────────────────────────────────────────────────────────────────────────

const menuItems = [
  {
    label: "Laser Treatments",
    href: "/laser-treatments",
    submenu: [
      { label: "Laser Hair Removal", href: "/laser-treatments/hair-removal", desc: "Permanent hair reduction" },
      { label: "Fractional CO2 Laser", href: "/laser-treatments/fractional-co2", desc: "Skin resurfacing & renewal" },
      { label: "Nd:YAG Laser", href: "/laser-treatments/nd-yag", desc: "Vascular & pigment treatment" },
      { label: "Picosecond Laser", href: "/laser-treatments/picosecond", desc: "Tattoo & pigmentation removal" },
      { label: "IPL Photofacial", href: "/laser-treatments/ipl", desc: "Broad-spectrum light therapy" },
    ],
  },
  {
    label: "Injectables",
    href: "/injectables",
    submenu: [
      { label: "Botulinum Toxin", href: "/injectables/botox", desc: "Dynamic wrinkle relaxation" },
      { label: "Dermal Fillers", href: "/injectables/fillers", desc: "Volume & contouring" },
      { label: "PRP Therapy", href: "/injectables/prp", desc: "Platelet-rich plasma rejuvenation" },
      { label: "Skin Boosters", href: "/injectables/skin-boosters", desc: "Deep hydration & glow" },
      { label: "Mesotherapy", href: "/injectables/mesotherapy", desc: "Micronutrient infusions" },
    ],
  },
  {
    label: "Skin Care",
    href: "/skin-care",
    submenu: [
      { label: "Chemical Peels", href: "/skin-care/chemical-peels", desc: "Exfoliation & brightening" },
      { label: "HydraFacial", href: "/skin-care/hydrafacial", desc: "Multi-step deep cleanse" },
      { label: "Microdermabrasion", href: "/skin-care/microdermabrasion", desc: "Surface skin renewal" },
      { label: "LED Light Therapy", href: "/skin-care/led-therapy", desc: "Cellular repair & rejuvenation" },
      { label: "Prescription Skincare", href: "/skin-care/prescription", desc: "Clinically tailored regimens" },
    ],
  },
  {
    label: "Aesthetics",
    href: "/aesthetics",
    submenu: [
      { label: "Body Contouring", href: "/aesthetics/body-contouring", desc: "Non-surgical fat reduction" },
      { label: "Ultherapy", href: "/aesthetics/ultherapy", desc: "Ultrasound skin tightening" },
      { label: "RF Microneedling", href: "/aesthetics/rf-microneedling", desc: "Collagen induction therapy" },
      { label: "Thread Lift", href: "/aesthetics/thread-lift", desc: "Minimally invasive lifting" },
      { label: "Cryolipolysis", href: "/aesthetics/cryolipolysis", desc: "Controlled fat freezing" },
    ],
  },
  {
    label: "Medical Dermatology",
    href: "/medical-dermatology",
    submenu: [
      { label: "Acne Treatment", href: "/medical-dermatology/acne", desc: "Advanced acne management" },
      { label: "Eczema & Psoriasis", href: "/medical-dermatology/eczema-psoriasis", desc: "Chronic skin condition care" },
      { label: "Mole & Lesion Removal", href: "/medical-dermatology/mole-removal", desc: "Safe lesion excision" },
      { label: "Vitiligo Treatment", href: "/medical-dermatology/vitiligo", desc: "Repigmentation therapies" },
      { label: "Skin Cancer Screening", href: "/medical-dermatology/skin-cancer", desc: "Early detection & care" },
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
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            // SCROLLED: white bg (60% dominant), navy border (30% secondary)
            ? "bg-white/97 backdrop-blur-md border-b border-[#292E4B]/12 py-3 shadow-sm"
            // HERO TOP: fully transparent over hero image/video
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">

          {/* ── Logo ── */}
          <Link href="/" className="shrink-0">
            <Image
              src="/header/Luminox.png"
              alt="Luminox Skin Hair Laser"
              width={160}
              height={60}
              className="h-12 w-auto object-contain"
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
                      // Scrolled → 30% navy text, 10% gold hover
                      ? activeMenu === item.label ? "text-[#DFAA5E]" : "text-[#292E4B] hover:text-[#DFAA5E]"
                      // Transparent hero → white text, 10% gold hover
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

                {/* ── Dropdown ── white bg (60%), navy text (30%), gold/pink accents (10%) */}
                {item.submenu && (
                  <div
                    className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64
                      bg-white border border-[#292E4B]/10 rounded-sm
                      shadow-xl shadow-[#292E4B]/10
                      transition-all duration-200 origin-top
                      ${activeMenu === item.label
                        ? "opacity-100 scale-y-100 pointer-events-auto"
                        : "opacity-0 scale-y-95 pointer-events-none"
                      }`}
                    onMouseEnter={() => handleMouseEnter(item.label)}
                    onMouseLeave={handleMouseLeave}
                  >
                    {/* 10% accent — gold-to-pink gradient bar */}
                    <div className="h-[3px] bg-gradient-to-r from-[#DFAA5E] via-[#F9DB9F] to-[#D95CB9] rounded-t-sm" />
                    <ul className="py-1.5">
                      {item.submenu.map((sub) => (
                        <li key={sub.label}>
                          <Link
                            href={sub.href}
                            className="group flex flex-col px-5 py-3 hover:bg-[#292E4B]/5 transition-colors duration-150"
                          >
                            {/* 30% navy label → 10% gold on hover */}
                            <span className="text-[#292E4B] text-[12px] uppercase tracking-wider group-hover:text-[#DFAA5E] transition-colors duration-150 font-bold">
                              {sub.label}
                            </span>
                            {/* Neutral #414042 desc */}
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

          {/* ── Right Actions ── */}
          <div className="flex items-center gap-3 shrink-0">
            {/* "Book Now" CTA — 10% accent, desktop only */}
            <Link
              href="/contact"
              className={`hidden lg:inline-flex items-center px-5 py-2 text-[11px] font-bold uppercase tracking-widest rounded-sm transition-all duration-200
                ${scrolled
                  // Scrolled: solid navy (30%) → gold on hover (10%)
                  ? "bg-[#292E4B] text-white hover:bg-[#DFAA5E] hover:text-[#292E4B]"
                  // Over hero: ghost white → gold fill on hover
                  : "bg-white/15 backdrop-blur-sm text-white border border-white/40 hover:bg-[#DFAA5E] hover:text-[#292E4B] hover:border-[#DFAA5E]"
                }`}
            >
              Book Now
            </Link>

            {/* Hamburger — color adapts to scrolled state */}
            <button
              className="lg:hidden flex flex-col justify-center gap-[5px] w-8 h-8 p-1"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <span className={`block h-[1.5px] transition-all duration-300 origin-center
                ${scrolled ? "bg-[#292E4B]" : "bg-white"}
                ${mobileOpen ? "rotate-45 translate-y-[6.5px]" : ""}`}
              />
              <span className={`block h-[1.5px] transition-all duration-300
                ${scrolled ? "bg-[#292E4B]" : "bg-white"}
                ${mobileOpen ? "opacity-0 scale-x-0" : ""}`}
              />
              <span className={`block h-[1.5px] transition-all duration-300 origin-center
                ${scrolled ? "bg-[#292E4B]" : "bg-white"}
                ${mobileOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* ══════════════════════════════════════════════
          Mobile Menu Overlay
          60% → white background
          30% → navy text, purple border accents
          10% → gold/pink CTA + gradient bar
      ══════════════════════════════════════════════ */}
      <div
        className={`fixed inset-0 z-40 bg-white transition-all duration-300 lg:hidden
          ${mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        {/* 10% accent top bar */}
        <div className="h-[3px] bg-gradient-to-r from-[#DFAA5E] via-[#F9DB9F] to-[#D95CB9]" />

        <div className="overflow-y-auto h-full pt-20 pb-12 px-6">

          {/* Mobile logo */}
          <div className="mb-6">
            <Image
              src="/header/Luminox.png"
              alt="Luminox Skin Hair Laser"
              width={140}
              height={52}
              className="h-11 w-auto object-contain"
            />
          </div>

          {/* 30% purple thin divider */}
          <div className="h-px bg-[#5B326A]/20 mb-5" />

          <ul>
            {menuItems.map((item) => (
              <li key={item.label} className="border-b border-[#292E4B]/10">
                {item.submenu ? (
                  <>
                    <button
                      className={`w-full flex items-center justify-between py-4 text-sm uppercase tracking-widest font-bold transition-colors
                        ${mobileExpanded === item.label ? "text-[#DFAA5E]" : "text-[#292E4B] hover:text-[#DFAA5E]"}`}
                      onClick={() =>
                        setMobileExpanded(mobileExpanded === item.label ? null : item.label)
                      }
                    >
                      {item.label}
                      <svg
                        className="w-4 h-4 transition-transform duration-200"
                        style={{ transform: mobileExpanded === item.label ? "rotate(180deg)" : "rotate(0deg)" }}
                        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    <div className={`overflow-hidden transition-all duration-300
                      ${mobileExpanded === item.label ? "max-h-[500px] pb-3" : "max-h-0"}`}>
                      {/* 30% purple left border */}
                      <ul className="pl-4 border-l-2 border-[#5B326A]/25">
                        {item.submenu.map((sub) => (
                          <li key={sub.label}>
                            <Link
                              href={sub.href}
                              onClick={() => setMobileOpen(false)}
                              className="group block py-2.5 px-3 hover:bg-[#292E4B]/5 rounded-sm transition-colors"
                            >
                              {/* 30% navy → 10% gold hover */}
                              <span className="block text-[#292E4B] text-xs uppercase tracking-wider group-hover:text-[#DFAA5E] transition-colors font-bold">
                                {sub.label}
                              </span>
                              {/* Neutral body text */}
                              <span className="block text-[#414042]/50 text-[11px] mt-0.5 font-light capitalize">
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
                    className="block py-4 text-[#292E4B] text-sm uppercase tracking-widest font-bold hover:text-[#DFAA5E] transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>

          {/* Mobile CTAs (10% accent) */}
          <div className="mt-8 space-y-2">
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="block w-full text-center py-3.5 bg-[#292E4B] text-white text-sm font-bold uppercase tracking-widest hover:bg-[#DFAA5E] hover:text-[#292E4B] transition-colors duration-200 rounded-sm"
            >
              Book Now
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileOpen(false)}
              className="block w-full text-center py-3 border border-[#5B326A]/30 text-[#5B326A] text-xs font-bold uppercase tracking-widest hover:border-[#D95CB9] hover:text-[#D95CB9] transition-colors duration-200 rounded-sm"
            >
              Learn About Us
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
