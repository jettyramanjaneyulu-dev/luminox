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

// ── Slot visual config (desktop → tablet → mobile via CSS) ──
const SLOT_CONFIG = [
  { numSize: "1.45rem", labelSize: "0.67rem", opacity: 0.45 },
  { numSize: "1.85rem", labelSize: "0.74rem", opacity: 0.65 },
  { numSize: "3rem",    labelSize: "0.86rem", opacity: 1    },
  { numSize: "1.65rem", labelSize: "0.70rem", opacity: 0.55 },
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
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const numeric = parseInt(target.replace(/\D/g, ""), 10);
  const suffix = target.replace(/[0-9]/g, "");

  useEffect(() => {
    startRef.current = null;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const animate = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const progress = Math.min((ts - startRef.current) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.floor(eased * numeric) + suffix);
      if (progress < 1) rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [triggerKey, numeric, suffix, duration]);

  return <span>{display}</span>;
}

export default function OurPipeline() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  const [active, setActive] = useState(2); // index in STATS
  const [imgSrcs, setImgSrcs] = useState(STATS.map((s) => s.image));
  // triggerKey per stat to re-fire animation on click
  const [triggerKeys, setTriggerKeys] = useState(STATS.map((_, i) => `${i}-0`));

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  const handleImgError = (i: number) => {
    setImgSrcs((prev) => { const n = [...prev]; n[i] = STATS[i].fallback; return n; });
  };

  const handleSelect = useCallback((statIdx: number) => {
    setActive(statIdx);
    // Re-trigger all number animations on selection
    setTriggerKeys((prev) =>
      prev.map((k, i) => {
        const [idx, count] = k.split("-");
        return i === statIdx ? `${idx}-${parseInt(count) + 1}` : k;
      })
    );
  }, []);

  const others = STATS.map((_, i) => i).filter((i) => i !== active);
  const displayOrder = [others[0], others[1], active, others[2]];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Jost:wght@300;400;500&display=swap');

        .pipeline-bubble-circle {
          border-radius: 50%;
          overflow: hidden;
          transition:
            width 0.28s cubic-bezier(0.34,1.56,0.64,1),
            height 0.28s cubic-bezier(0.34,1.56,0.64,1),
            box-shadow 0.28s ease,
            opacity 0.28s ease;
        }

        .pipeline-bubble-circle img {
          width: 100%; height: 100%; object-fit: cover; display: block;
          transition: transform 0.35s ease;
        }

        .pipeline-bubble-item:hover .pipeline-bubble-circle img { transform: scale(1.05); }
        .pipeline-bubble-item {
          transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1);
        }
        .pipeline-bubble-item:hover { transform: translateY(-5px); }

        /* Desktop slots */
        .pipeline-slot-0 .pipeline-bubble-circle { width: 118px; height: 118px; }
        .pipeline-slot-1 .pipeline-bubble-circle { width: 155px; height: 155px; }
        .pipeline-slot-2 .pipeline-bubble-circle { width: 232px; height: 232px; }
        .pipeline-slot-3 .pipeline-bubble-circle { width: 138px; height: 138px; }

        /* Tablet */
        @media (max-width: 860px) {
          .pipeline-slot-0 .pipeline-bubble-circle { width: 86px;  height: 86px;  }
          .pipeline-slot-1 .pipeline-bubble-circle { width: 110px; height: 110px; }
          .pipeline-slot-2 .pipeline-bubble-circle { width: 164px; height: 164px; }
          .pipeline-slot-3 .pipeline-bubble-circle { width: 100px; height: 100px; }
          .pipeline-bubbles-row { gap: 20px !important; }
          .pipeline-slot-0 .pipeline-num { font-size: 1.1rem !important; }
          .pipeline-slot-1 .pipeline-num { font-size: 1.4rem !important; }
          .pipeline-slot-2 .pipeline-num { font-size: 2.1rem !important; }
          .pipeline-slot-3 .pipeline-num { font-size: 1.25rem !important; }
        }

        /* Mobile */
        @media (max-width: 560px) {
          .pipeline-slot-0 { display: none !important; }
          .pipeline-bubbles-row { gap: 14px !important; }
          .pipeline-slot-1 .pipeline-bubble-circle { width: 90px;  height: 90px;  }
          .pipeline-slot-2 .pipeline-bubble-circle { width: 140px; height: 140px; }
          .pipeline-slot-3 .pipeline-bubble-circle { width: 84px;  height: 84px;  }
          .pipeline-slot-1 .pipeline-num { font-size: 1.15rem !important; }
          .pipeline-slot-2 .pipeline-num { font-size: 1.75rem !important; }
          .pipeline-slot-3 .pipeline-num { font-size: 1.1rem  !important; }
          .pipeline-slot-1 .pipeline-label { font-size: 0.62rem !important; }
          .pipeline-slot-3 .pipeline-label { font-size: 0.62rem !important; }
        }

        @media (max-width: 380px) {
          .pipeline-slot-1 .pipeline-bubble-circle { width: 76px;  height: 76px;  }
          .pipeline-slot-2 .pipeline-bubble-circle { width: 118px; height: 118px; }
          .pipeline-slot-2 .pipeline-num { font-size: 1.5rem !important; }
          .pipeline-slot-3 .pipeline-bubble-circle { width: 70px;  height: 70px;  }
        }
      `}</style>

      <section
        ref={sectionRef}
        style={{
          width: "100%",
          backgroundColor: "#fff",
          padding: "72px 24px 90px",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", maxWidth: 680, margin: "0 auto 64px" }}>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.5rem,3vw,2.4rem)",
              fontWeight: 700,
              color: "#1a1a2e",
              lineHeight: 1.25,
            }}
          >
            Our Pipeline: Innovating for a Healthier Tomorrow
          </h2>
          <p
            style={{
              fontFamily: "'Jost', sans-serif",
              fontWeight: 300,
              fontSize: "0.88rem",
              color: "#888",
              marginTop: 12,
              lineHeight: 1.75,
            }}
          >
            Driven by science, powered by partnerships — delivering better outcomes across the globe.
          </p>
        </div>

        {/* Bubbles row */}
        <div
          className="pipeline-bubbles-row"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 32,
            flexWrap: "nowrap",
          }}
        >
          {displayOrder.map((statIdx, slot) => {
            const stat = STATS[statIdx];
            const cfg = SLOT_CONFIG[slot];
            const isCenter = slot === 2;

            return (
              <div
                key={statIdx}
                className={`pipeline-bubble-item pipeline-slot-${slot}`}
                onClick={() => !isCenter && handleSelect(statIdx)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  cursor: isCenter ? "default" : "pointer",
                }}
              >
                {/* Circle */}
                <div
                  className="pipeline-bubble-circle"
                  style={{
                    opacity: cfg.opacity,
                    boxShadow: isCenter
                      ? "0 0 0 3px #fff, 0 0 0 5px #DFAA5E, 0 12px 48px rgba(0,0,0,0.18)"
                      : "0 4px 16px rgba(0,0,0,0.09)",
                  }}
                >
                  <img
                    src={imgSrcs[statIdx]}
                    alt={stat.label}
                    onError={() => handleImgError(statIdx)}
                  />
                </div>

                {/* Number */}
                <div
                  className="pipeline-num"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontWeight: 700,
                    fontSize: cfg.numSize,
                    color: "#1a1a2e",
                    opacity: cfg.opacity,
                    marginTop: 10,
                    lineHeight: 1,
                    transition: "font-size 0.25s ease, opacity 0.25s ease",
                  }}
                >
                  {inView ? (
                    <AnimatedNumber
                      target={stat.number}
                      triggerKey={triggerKeys[statIdx]}
                      duration={isCenter ? 900 : 600}
                    />
                  ) : "0+"}
                </div>

                {/* Label */}
                <div
                  className="pipeline-label"
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: cfg.labelSize,
                    fontWeight: isCenter ? 500 : 400,
                    color: isCenter ? "#555" : "#999",
                    marginTop: 5,
                    letterSpacing: "0.03em",
                    textAlign: "center",
                    transition: "font-size 0.25s ease, color 0.25s ease",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}