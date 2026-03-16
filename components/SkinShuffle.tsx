"use client";

import { useEffect, useRef, useState, useCallback } from "react";

type Stat = {
  number: string;
  label: string;
  image: string;
  fallback: string;
};

const STATS: Stat[] = [
  {
    number: "250+",
    label: "Commercial Products",
    image: "https://api.lotuspharm.com/storage/sections/home/our-pipeline/01K8WAVSM0FWPKJ2VA414GHKM0.png",
    fallback: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&q=80",
  },
  {
    number: "80+",
    label: "R&D Pipelines",
    image: "https://api.lotuspharm.com/storage/sections/home/our-pipeline/01K8WAVSM18SJS6HW2GC8BN6K6.png",
    fallback: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&q=80",
  },
  {
    number: "100+",
    label: "Global Partnerships",
    image: "https://api.lotuspharm.com/storage/sections/home/our-pipeline/getty-images-ulToeFfq338-unsplash.jpg",
    fallback: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80",
  },
  {
    number: "265+",
    label: "Licensing Deals Signed",
    image: "https://api.lotuspharm.com/storage/sections/home/our-pipeline/gabrielle-henderson-HJckKnwCXxQ-unsplash.jpg.jpg",
    fallback: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80",
  },
];

// ── Animated counter ──
function AnimatedNumber({
  target,
  triggerKey,
  duration = 900,
}: {
  target: string;
  triggerKey: string;
  duration?: number;
}) {
  const [display, setDisplay] = useState("0");
  const rafRef   = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const numeric  = parseInt(target.replace(/\D/g, ""), 10);
  const suffix   = target.replace(/[0-9]/g, "");

  useEffect(() => {
    startRef.current = null;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const tick = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const p = Math.min((ts - startRef.current) / duration, 1);
      setDisplay(Math.floor((1 - Math.pow(1 - p, 3)) * numeric) + suffix);
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [triggerKey, numeric, suffix, duration]);

  return <span>{display}</span>;
}

// ─────────────────────────────────────────────────────────────────
// Each STAT has a fixed "position index" in a circular track:
//   position 0 = far-left (smallest)
//   position 1 = mid-left
//   position 2 = CENTER  (largest)
//   position 3 = mid-right
//
// We store `centerIdx` (which STAT is at center) and compute
// each stat's position from that.  On click we just change centerIdx
// and every stat slides to its new position via CSS transform.
//
// Track layout (desktop px from section center-x):
//   pos 0: -340px   size 112   opacity 0.38
//   pos 1: -190px   size 150   opacity 0.58
//   pos 2:    0px   size 230   opacity 1.00   ← center
//   pos 3: +195px   size 130   opacity 0.48
//
// Each stat sits at its OWN absolute position calculated from center.
// ─────────────────────────────────────────────────────────────────

const POSITIONS = [
  // [translateX from center,  circleSize,  numSize,  labelSize, opacity, zIndex]
  { x: -345, size: 112, num: "1.2rem",  label: "0.62rem", op: 0.38, z: 1 },
  { x: -192, size: 150, num: "1.65rem", label: "0.70rem", op: 0.58, z: 2 },
  { x:    0, size: 230, num: "2.85rem", label: "0.85rem", op: 1.00, z: 4 },
  { x:  197, size: 130, num: "1.38rem", label: "0.65rem", op: 0.48, z: 2 },
];

// tablet positions
const POSITIONS_MD = [
  { x: -248, size:  82, num: "1.0rem",  label: "0.60rem", op: 0.38, z: 1 },
  { x: -138, size: 108, num: "1.3rem",  label: "0.67rem", op: 0.58, z: 2 },
  { x:    0, size: 166, num: "2.1rem",  label: "0.80rem", op: 1.00, z: 4 },
  { x:  143, size:  94, num: "1.15rem", label: "0.62rem", op: 0.48, z: 2 },
];

// mobile positions (3 visible, slot-0 hidden)
const POSITIONS_SM = [
  { x: -999, size:  0,   num: "0",       label: "0",       op: 0,    z: 0 }, // hidden
  { x: -112, size:  86, num: "1.05rem", label: "0.60rem", op: 0.58, z: 2 },
  { x:    0, size: 140, num: "1.7rem",  label: "0.78rem", op: 1.00, z: 4 },
  { x:  116, size:  80, num: "1.0rem",  label: "0.60rem", op: 0.48, z: 2 },
];

// Given centerIdx and statIdx, return that stat's slot position (0–3)
function getSlot(statIdx: number, centerIdx: number): number {
  // center = slot 2, going left: slot 1, slot 0; going right: slot 3
  // distance = (statIdx - centerIdx + 4) % 4
  const dist = (statIdx - centerIdx + STATS.length) % STATS.length;
  // dist 0 → slot 2 (center)
  // dist 1 → slot 3 (right)
  // dist 2 → slot 0 (far-left)  ← "opposite side"
  // dist 3 → slot 1 (mid-left)
  const map: Record<number, number> = { 0: 2, 1: 3, 2: 0, 3: 1 };
  return map[dist];
}

export default function OurPipeline() {
  const sectionRef                    = useRef<HTMLDivElement | null>(null);
  const [inView,      setInView]      = useState(false);
  const [centerIdx,   setCenterIdx]   = useState(2);          // which STAT is center
  const [imgSrcs,     setImgSrcs]     = useState(STATS.map((s) => s.image));
  const [triggerKeys, setTriggerKeys] = useState(STATS.map((_, i) => `${i}-0`));
  const [entered,     setEntered]     = useState(false);
  const [breakpoint,  setBreakpoint]  = useState<"lg" | "md" | "sm">("lg");

  // breakpoint detector
  useEffect(() => {
    const measure = () => {
      const w = window.innerWidth;
      setBreakpoint(w <= 580 ? "sm" : w <= 860 ? "md" : "lg");
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // intersection observer — entrance once
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); setTimeout(() => setEntered(true), 80); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const handleImgError = (i: number) =>
    setImgSrcs((p) => { const n = [...p]; n[i] = STATS[i].fallback; return n; });

  const handleSelect = useCallback((statIdx: number) => {
    if (statIdx === centerIdx) return;
    setCenterIdx(statIdx);
    setTriggerKeys((prev) =>
      prev.map((k, i) => {
        const [idx, c] = k.split("-");
        return i === statIdx ? `${idx}-${parseInt(c) + 1}` : k;
      })
    );
  }, [centerIdx]);

  const posTable =
    breakpoint === "sm" ? POSITIONS_SM :
    breakpoint === "md" ? POSITIONS_MD :
    POSITIONS;

  // track height = tallest circle + text area
  const trackH =
    breakpoint === "sm" ? 220 :
    breakpoint === "md" ? 280 :
    360;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Jost:wght@300;400;500;600&display=swap');

        .lp-wrap {
          width: 100%;
          background: #fff;
          padding: 80px 0 96px;
          overflow: hidden;
          position: relative;
        }
        .lp-wrap::before {
          content: '';
          position: absolute;
          top: 0; left: 50%;
          transform: translateX(-50%);
          width: 72px; height: 2px;
          background: linear-gradient(90deg, transparent, #DFAA5E, transparent);
        }

        /* Header */
        .lp-hd {
          text-align: center;
          max-width: 620px;
          margin: 0 auto 64px;
          padding: 0 24px;
        }
        .lp-eye {
          font-family: 'Jost', sans-serif;
          font-size: 0.68rem;
          font-weight: 600;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #DFAA5E;
          margin-bottom: 12px;
        }
        .lp-ttl {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.55rem, 3vw, 2.45rem);
          font-weight: 700;
          color: #1a1a2e;
          line-height: 1.2;
          margin: 0 0 14px;
        }
        .lp-desc {
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          font-size: 0.875rem;
          color: #888;
          line-height: 1.8;
          margin: 0;
        }

        /*
          TRACK — a relative container whose center is the reference point.
          Each bubble is absolutely positioned with translateX from center.
          On centerIdx change, all bubbles slide to their new X + resize.
          This is what gives the true carousel feel.
        */
        .lp-track {
          position: relative;
          width: 100%;
          /* height set inline */
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Each bubble is absolute, centered at 50% then shifted by X */
        .lp-bubble {
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
          /* ALL positional + size changes animate together — single smooth motion */
          transition:
            transform  0.6s cubic-bezier(0.4, 0, 0.2, 1),
            opacity    0.6s cubic-bezier(0.4, 0, 0.2, 1),
            z-index    0s;
        }

        /* Entrance: bubbles start invisible+below, slide up once */
        .lp-bubble {
          --entrance-y: 48px;
        }
        .lp-bubble.pre-enter {
          opacity: 0 !important;
          transform: var(--tx) translateY(var(--entrance-y)) !important;
        }
        .lp-bubble.entered {
          /* transform and opacity are driven by inline style + transition */
        }

        .lp-bubble.clickable { cursor: pointer; }

        /* Circle */
        .lp-circ {
          border-radius: 50%;
          overflow: hidden;
          flex-shrink: 0;
          transition:
            width      0.6s cubic-bezier(0.4, 0, 0.2, 1),
            height     0.6s cubic-bezier(0.4, 0, 0.2, 1),
            box-shadow 0.5s ease-out;
          will-change: width, height;
        }
        .lp-circ img {
          width: 100%; height: 100%;
          object-fit: cover; display: block;
          transition: transform 0.55s ease-out;
        }
        .lp-bubble.clickable:hover .lp-circ img { transform: scale(1.05); }
        .lp-bubble.clickable:hover .lp-circ {
          box-shadow: 0 18px 48px rgba(0,0,0,0.14) !important;
        }

        /* Gold ring breathe — center only */
        @keyframes lp-breathe {
          0%,100% { box-shadow: 0 0 0 3px #fff, 0 0 0 5px #DFAA5E,             0 14px 50px rgba(0,0,0,0.15); }
          50%     { box-shadow: 0 0 0 3px #fff, 0 0 0 9px rgba(223,170,94,0.35), 0 14px 50px rgba(0,0,0,0.15); }
        }
        .lp-circ-center { animation: lp-breathe 3.2s ease-in-out infinite; }

        /* Number */
        .lp-num {
          font-family: 'Cormorant Garamond', serif;
          font-weight: 700;
          color: #1a1a2e;
          line-height: 1;
          margin-top: 12px;
          transition:
            font-size 0.6s cubic-bezier(0.4, 0, 0.2, 1),
            opacity   0.6s cubic-bezier(0.4, 0, 0.2, 1);
          white-space: nowrap;
        }

        /* Label */
        .lp-lbl {
          font-family: 'Jost', sans-serif;
          margin-top: 5px;
          letter-spacing: 0.04em;
          text-align: center;
          transition:
            font-size   0.6s cubic-bezier(0.4, 0, 0.2, 1),
            color       0.6s cubic-bezier(0.4, 0, 0.2, 1),
            opacity     0.6s cubic-bezier(0.4, 0, 0.2, 1),
            max-width   0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Dot nav */
        .lp-dots {
          display: flex;
          gap: 7px;
          justify-content: center;
          margin-top: 44px;
        }
        .lp-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #ddd;
          cursor: pointer;
          transition: background 0.35s ease, transform 0.35s ease;
        }
        .lp-dot.on {
          background: #DFAA5E;
          transform: scale(1.5);
        }

        @media (max-width: 580px) {
          .lp-wrap { padding: 56px 0 72px; }
          .lp-hd   { margin-bottom: 44px; }
        }
      `}</style>

      <section ref={sectionRef} className="lp-wrap">

        {/* Header */}
        <div className="lp-hd">
          {/* <p className="lp-eye">Our Pipeline</p> */}
          <h2 className="lp-ttl">Our Happy Customers</h2>
          <p className="lp-desc">
            Driven by science, powered by partnerships — delivering better outcomes
            across the globe through an optimised, sustainable pipeline.
          </p>
        </div>

        {/* ── Carousel Track ── */}
        <div className="lp-track" style={{ height: trackH }}>
          {STATS.map((stat, statIdx) => {
            const slot       = getSlot(statIdx, centerIdx);
            const pos        = posTable[slot];
            const isCenter   = slot === 2;
            const isHidden   = breakpoint === "sm" && slot === 0;

            // entrance stagger: center first
            const stagger =
              slot === 2 ? 0    :
              slot === 1 ? 0.10 :
              slot === 3 ? 0.16 :
              0.22;

            // The bubble translates to its slot's X position from center
            const tx = `translateX(${pos.x}px)`;

            return (
              <div
                key={statIdx}
                className={[
                  "lp-bubble",
                  entered ? "entered" : "pre-enter",
                  !isCenter ? "clickable" : "",
                ].join(" ")}
                style={{
                  // position from center of track
                  left:      "50%",
                  transform: entered
                    ? `translateX(calc(-50% + ${pos.x}px))`
                    : `translateX(calc(-50% + ${pos.x}px)) translateY(48px)`,
                  opacity:   entered ? (isHidden ? 0 : pos.op) : 0,
                  zIndex:    pos.z,
                  transitionDelay: entered ? `${stagger}s` : "0s",
                  pointerEvents: isHidden ? "none" : "auto",
                  // width anchors the bubble column
                  width: pos.size + 40,
                }}
                onClick={() => !isCenter && handleSelect(statIdx)}
                role={isCenter ? undefined : "button"}
                tabIndex={isCenter ? undefined : 0}
                aria-label={isCenter ? undefined : `Select ${stat.label}`}
                onKeyDown={(e) => {
                  if (!isCenter && (e.key === "Enter" || e.key === " ")) handleSelect(statIdx);
                }}
              >
                {/* Circle */}
                <div
                  className={["lp-circ", isCenter ? "lp-circ-center" : ""].join(" ")}
                  style={{
                    width:     pos.size,
                    height:    pos.size,
                    boxShadow: isCenter ? undefined : "0 4px 16px rgba(0,0,0,0.09)",
                  }}
                >
                  <img
                    src={imgSrcs[statIdx]}
                    alt={stat.label}
                    onError={() => handleImgError(statIdx)}
                    loading="lazy"
                  />
                </div>

                {/* Number */}
                <div
                  className="lp-num"
                  style={{ fontSize: pos.num, opacity: pos.op }}
                >
                  {inView ? (
                    <AnimatedNumber
                      target={stat.number}
                      triggerKey={triggerKeys[statIdx]}
                      duration={isCenter ? 950 : 650}
                    />
                  ) : "0+"}
                </div>

                {/* Label */}
                <div
                  className="lp-lbl"
                  style={{
                    fontSize:   pos.label,
                    fontWeight: isCenter ? 500 : 400,
                    color:      isCenter ? "#555" : "#999",
                    opacity:    pos.op,
                    maxWidth:   isCenter ? 140 : 90,
                  }}
                >
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Dot nav */}
        <div className="lp-dots" role="tablist">
          {STATS.map((stat, i) => (
            <div
              key={i}
              className={["lp-dot", centerIdx === i ? "on" : ""].join(" ")}
              onClick={() => handleSelect(i)}
              role="tab"
              aria-selected={centerIdx === i}
              aria-label={stat.label}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") handleSelect(i);
              }}
            />
          ))}
        </div>

      </section>
    </>
  );
}
