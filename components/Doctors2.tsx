"use client";

import { useState, useEffect, useRef, useCallback } from "react";
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
  // {
  //   name: "Dr. Sanjay Gupta",
  //   spec: "Trichologist",
  //   qual: "MD, Fellowship in Trichology",
  //   exp: "8+ Years",
  //   tag: "Hair & Scalp Expert",
  //   accent: "#D95CB9",
  //   accentBg: "rgba(217,92,185,.18)",
  //   accentRgb: "217,92,185",
  //   bio: "Leading expert in hair restoration and scalp health, combining PRP therapy with cutting-edge transplantation techniques for natural, lasting results.",
  //   img: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600&q=80",
  //   socials: { linkedin: "#", instagram: "#" },
  //   treats: ["PRP Therapy", "Hair Transplant", "Scalp Analysis"],
  // },
  // {
  //   name: "Dr. Meera Iyer",
  //   spec: "Aesthetic Cosmetologist",
  //   qual: "MBBS, Diploma in Cosmetology",
  //   exp: "10+ Years",
  //   tag: "Rejuvenation Expert",
  //   accent: "#9B6DB5",
  //   accentBg: "rgba(155,109,181,.18)",
  //   accentRgb: "155,109,181",
  //   bio: "Renowned for her artistry in holistic skin rejuvenation and non-surgical aesthetics, delivering naturally enhanced results with precision injectables and regenerative treatments.",
  //   img: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=600&q=80",
  //   socials: { linkedin: "#", instagram: "#" },
  //   treats: ["Fillers", "Botox", "Skin Rejuvenation"],
  // },
  // {
  //   name: "Dr. Rohan Mehta",
  //   spec: "Cosmetic Surgeon",
  //   qual: "MS (Surgery), FACS",
  //   exp: "14+ Years",
  //   tag: "Surgical Artistry",
  //   accent: "#5B9BD5",
  //   accentBg: "rgba(91,155,213,.18)",
  //   accentRgb: "91,155,213",
  //   bio: "A meticulous cosmetic surgeon celebrated for his sculptor's eye, Dr. Mehta blends anatomical expertise with refined aesthetics to deliver natural, harmonious outcomes across face and body.",
  //   img: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&q=80",
  //   socials: { linkedin: "#", instagram: "#" },
  //   treats: ["Rhinoplasty", "Liposuction", "Eyelid Surgery"],
  // },
  // {
  //   name: "Dr. Priya Nambiar",
  //   spec: "Clinical Dermatologist",
  //   qual: "MD, DNB (Dermatology)",
  //   exp: "9+ Years",
  //   tag: "Skin Health Expert",
  //   accent: "#5EBF9A",
  //   accentBg: "rgba(94,191,154,.18)",
  //   accentRgb: "94,191,154",
  //   bio: "Specialising in chronic skin conditions and evidence-based dermatology, Dr. Nambiar is known for her compassionate approach and transformative results in complex skin cases.",
  //   img: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=600&q=80",
  //   socials: { linkedin: "#", instagram: "#" },
  //   treats: ["Eczema", "Psoriasis", "Vitiligo"],
  // },
  // {
  //   name: "Dr. Aditya Sharma",
  //   spec: "Anti-Ageing Specialist",
  //   qual: "MBBS, Fellowship in Aesthetic Medicine",
  //   exp: "11+ Years",
  //   tag: "Youth Architect",
  //   accent: "#E0735A",
  //   accentBg: "rgba(224,115,90,.18)",
  //   accentRgb: "224,115,90",
  //   bio: "Internationally trained in regenerative and anti-ageing medicine, Dr. Sharma crafts personalised longevity protocols that restore youthful vitality through cutting-edge, minimally invasive techniques.",
  //   img: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=600&q=80",
  //   socials: { linkedin: "#", instagram: "#" },
  //   treats: ["Thread Lifts", "Vampire Facial", "Collagen Induction"],
  // },
];

const AUTO_PLAY_INTERVAL = 4000;

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

const ChevronLeft = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRight = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

function DoctorCard({ doc }: { doc: Doctor }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        height: "clamp(360px,42vw,440px)",
        borderRadius: 22,
        overflow: "hidden",
        position: "relative",
        cursor: "pointer",
        boxShadow: hovered
          ? `0 32px 64px rgba(${doc.accentRgb},.25)`
          : "0 8px 32px rgba(41,46,75,.10)",
        transition: "box-shadow .4s ease",
        width: "100%",
        flexShrink: 0,
      }}
    >
      <img
        src={doc.img}
        alt={doc.name}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "top",
          display: "block",
          transform: hovered ? "scale(1.07)" : "scale(1)",
          transition: "transform .6s cubic-bezier(.22,1,.36,1)",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: hovered
            ? "linear-gradient(to top,rgba(41,46,75,.97) 0%,rgba(41,46,75,.45) 65%,transparent 100%)"
            : "linear-gradient(to top,rgba(41,46,75,.92) 0%,rgba(41,46,75,.28) 55%,transparent 100%)",
          transition: "background .4s ease",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: 16,
          right: 16,
          display: "flex",
          gap: 8,
          zIndex: 10,
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(0)" : "translateY(-6px)",
          transition: "opacity .3s ease, transform .3s ease",
        }}
      >
        {[
          { href: doc.socials.linkedin, icon: <LinkedInIcon />, label: "LinkedIn" },
          { href: doc.socials.instagram, icon: <InstaIcon />, label: "Instagram" },
        ].map((s) => (
          <a
            key={s.label}
            href={s.href}
            aria-label={s.label}
            style={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              background: "rgba(255,255,255,.15)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255,255,255,.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none",
              transition: "background .2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,.28)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,.15)")}
          >
            {s.icon}
          </a>
        ))}
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "clamp(18px,2.5vw,26px)",
          color: "#fff",
        }}
      >
        <div
          style={{
            display: "inline-block",
            borderRadius: 100,
            padding: "4px 12px",
            marginBottom: 8,
            background: doc.accentBg,
            color: doc.accent,
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: ".12em",
            textTransform: "uppercase",
          }}
        >
          {doc.tag}
        </div>

        <div
          style={{
            fontSize: 10,
            letterSpacing: ".2em",
            textTransform: "uppercase",
            opacity: 0.7,
            marginBottom: 3,
            fontWeight: 500,
          }}
        >
          {doc.spec}
        </div>
        <div
          style={{
            fontFamily: "'Cormorant Garamond',serif",
            fontSize: "clamp(17px,2vw,21px)",
            fontWeight: 700,
            lineHeight: 1.2,
            marginBottom: 3,
          }}
        >
          {doc.name}
        </div>
        <div style={{ fontSize: 11, opacity: 0.7, marginBottom: 2 }}>{doc.qual}</div>
        <div style={{ fontSize: 11, fontWeight: 600, color: doc.accent }}>{doc.exp} Experience</div>

        <div
          className="doctor-bio"
          style={{
            fontSize: 12,
            lineHeight: 1.65,
            marginTop: 12,
            fontWeight: 300,
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(10px)",
            transition: "opacity .35s ease, transform .35s ease",
          }}
        >
          {doc.bio}
        </div>

        <div
          className="doctor-treats"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
            marginTop: 10,
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(8px)",
            transition: "opacity .35s .05s ease, transform .35s .05s ease",
          }}
        >
          {doc.treats.map((t) => (
            <span
              key={t}
              style={{
                fontSize: 10,
                background: "rgba(255,255,255,.12)",
                border: "1px solid rgba(255,255,255,.2)",
                borderRadius: 100,
                padding: "3px 10px",
                color: "rgba(255,255,255,.85)",
                fontWeight: 500,
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Doctors() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setVisibleCount(w <= 600 ? 1 : w <= 960 ? 2 : 3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const total = DOCTORS.length;
  const maxIdx = total - visibleCount;

  const next = useCallback(() => {
    setActiveIdx((prev) => (prev >= maxIdx ? 0 : prev + 1));
  }, [maxIdx]);

  const prev = useCallback(() => {
    setActiveIdx((prev) => (prev <= 0 ? maxIdx : prev - 1));
  }, [maxIdx]);

  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(next, AUTO_PLAY_INTERVAL);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isPlaying, next]);

  const pauseAndResume = useCallback(() => {
    setIsPlaying(false);
    setTimeout(() => setIsPlaying(true), 8000);
  }, []);

  const handlePrev = () => { pauseAndResume(); prev(); };
  const handleNext = () => { pauseAndResume(); next(); };
  const handleDot = (i: number) => {
    pauseAndResume();
    setActiveIdx(Math.max(0, Math.min(i, maxIdx)));
  };

  const touchStartX = useRef(0);
  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) { if (diff > 0) handleNext(); else handlePrev(); }
  };

  const gapPx = 24;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,700;1,600&family=Jost:wght@300;400;500;700&display=swap');

        @keyframes progressFill {
          from { width: 0%; }
          to   { width: 100%; }
        }

        /*
          ROOT FIX: Clip any overflow at the html/body level so the page
          never gets a horizontal scrollbar regardless of child positioning.
        */
        html, body { overflow-x: hidden; }

        .doctors-section {
          font-family: 'Jost', sans-serif;
          /* Also clip at section level as a safety net */
          overflow: hidden;
        }

        /* Mobile: always show bio + treats */
        @media (max-width: 600px) {
          .doctor-bio    { opacity: 1 !important; transform: translateY(0) !important; }
          .doctor-treats { opacity: 1 !important; transform: translateY(0) !important; }
          .doctors-section { padding: 52px 0 68px !important; }
        }

        .nav-btn:hover { background: rgba(41,46,75,1) !important; }
        .dot-btn:hover { transform: scale(1.2); }
        .cta-btn:hover { background: #F9DB9F !important; transform: translateY(-2px); }
      `}</style>

      <section
        className="doctors-section"
        style={{ padding: "90px 0 100px", background: "#fff" }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 clamp(16px,4vw,48px)" }}>

          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "clamp(44px,6vw,68px)" }}>
            <p
              style={{
                color: "#DFAA5E",
                letterSpacing: ".35em",
                fontSize: 11,
                fontWeight: 700,
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              Meet Our Experts
            </p>
            <h2
              style={{
                fontFamily: "'Cormorant Garamond',serif",
                fontSize: "clamp(28px,4vw,52px)",
                color: "#292E4B",
                fontWeight: 700,
                lineHeight: 1.15,
              }}
            >
              Science Behind the Beauty
            </h2>
            <p
              style={{
                maxWidth: 580,
                margin: "16px auto 0",
                fontSize: 14,
                lineHeight: 1.85,
                color: "#414042",
                fontWeight: 300,
              }}
            >
              Behind every transformation is dermatology expertise. Our clinical approach combines
              medical diagnosis, advanced technologies, and personalised treatment design to ensure
              every patient receives care that is thoughtful, precise, and safe.
            </p>
          </div>

          {/*
            ── CAROUSEL WRAPPER ──────────────────────────────────────────────────
            KEY FIX: In the original code the nav arrows used `left: -20px` and
            `right: -20px`. Those negative offsets placed the buttons OUTSIDE the
            container bounds, which caused the browser to extend the scrollable
            area and create a horizontal scrollbar.

            Solution: add `padding: "0 52px"` to this wrapper so the arrow buttons
            have a dedicated lane to sit in (left:0 / right:0 within the padded box)
            and can never escape the container width. The slide window sits inside
            that padding and clips its own overflow normally.
          */}
          <div
            style={{
              position: "relative",
              width: "100%",
              padding: "0 52px",
              boxSizing: "border-box",
            }}
          >
            {/* Left arrow — anchored inside padding lane */}
            <button
              className="nav-btn"
              onClick={handlePrev}
              aria-label="Previous"
              style={{
                position: "absolute",
                left: 0,
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 20,
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: "rgba(41,46,75,.85)",
                border: "1px solid rgba(255,255,255,.12)",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                backdropFilter: "blur(8px)",
                transition: "background .2s",
                boxShadow: "0 4px 16px rgba(41,46,75,.25)",
              }}
            >
              <ChevronLeft />
            </button>

            {/* Right arrow — anchored inside padding lane */}
            <button
              className="nav-btn"
              onClick={handleNext}
              aria-label="Next"
              style={{
                position: "absolute",
                right: 0,
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 20,
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: "rgba(41,46,75,.85)",
                border: "1px solid rgba(255,255,255,.12)",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                backdropFilter: "blur(8px)",
                transition: "background .2s",
                boxShadow: "0 4px 16px rgba(41,46,75,.25)",
              }}
            >
              <ChevronRight />
            </button>

            {/* Slide window — clips the moving strip */}
            <div
              style={{ overflow: "hidden", borderRadius: 8, width: "100%" }}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <motion.div
                animate={{
                  /*
                    FIX: translate is based on the slide-window width (100%),
                    not the outer wrapper width, so the math stays correct at
                    every breakpoint. Each step moves exactly one card width
                    plus its share of the gap.
                  */
                  x: `calc(-${activeIdx * (100 / visibleCount)}% - ${(activeIdx * gapPx) / visibleCount}px)`,
                }}
                transition={{ type: "spring", stiffness: 280, damping: 30 }}
                style={{ display: "flex", gap: gapPx }}
              >
                {DOCTORS.map((doc, i) => (
                  <div
                    key={doc.name}
                    style={{
                      /*
                        FIX: card width = (100% of slide-window minus all gaps) ÷ visibleCount
                        Using both minWidth AND maxWidth (and flexShrink:0) prevents
                        any card from growing or shrinking and leaking outside the window.
                      */
                      minWidth: `calc((100% - ${gapPx * (visibleCount - 1)}px) / ${visibleCount})`,
                      maxWidth: `calc((100% - ${gapPx * (visibleCount - 1)}px) / ${visibleCount})`,
                      flexShrink: 0,
                    }}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 36 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                      viewport={{ once: true }}
                    >
                      <DoctorCard doc={doc} />
                    </motion.div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Dots */}
          <div
            style={{
              marginTop: 32,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              {Array.from({ length: maxIdx + 1 }).map((_, i) => (
                <button
                  key={i}
                  className="dot-btn"
                  onClick={() => handleDot(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  style={{
                    width: i === activeIdx ? 28 : 8,
                    height: 8,
                    borderRadius: 4,
                    background:
                      i === activeIdx
                        ? DOCTORS[activeIdx + Math.floor(visibleCount / 2)]?.accent ?? "#DFAA5E"
                        : "rgba(41,46,75,.2)",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    transition: "width .3s ease, background .3s ease, transform .2s",
                  }}
                />
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
