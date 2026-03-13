"use client";

import { useEffect, useRef, useState } from "react";

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
    image:
      "https://api.lotuspharm.com/storage/sections/home/our-pipeline/01K8WAVSM0FWPKJ2VA414GHKM0.png",
    fallback:
      "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&q=80",
  },
  {
    number: "80+",
    label: "R&D Pipelines",
    image:
      "https://api.lotuspharm.com/storage/sections/home/our-pipeline/01K8WAVSM18SJS6HW2GC8BN6K6.png",
    fallback:
      "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&q=80",
  },
  {
    number: "100+",
    label: "Global Partnerships",
    image:
      "https://api.lotuspharm.com/storage/sections/home/our-pipeline/getty-images-ulToeFfq338-unsplash.jpg",
    fallback:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80",
  },
  {
    number: "265+",
    label: "Licensing Deals Signed",
    image:
      "https://api.lotuspharm.com/storage/sections/home/our-pipeline/gabrielle-henderson-HJckKnwCXxQ-unsplash.jpg.jpg",
    fallback:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80",
  },
];

type AnimatedNumberProps = {
  target: string;
  triggerKey: string;
  duration?: number;
};

function AnimatedNumber({
  target,
  triggerKey,
  duration = 1600,
}: AnimatedNumberProps) {
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

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [triggerKey, numeric, suffix, duration]);

  return <span>{display}</span>;
}

// Slot visual config
const SLOT_CONFIG = [
  {
    size: 120,
    numSize: "1.5rem",
    labelSize: "0.68rem",
    opacity: 0.45,
    shadow: "0 2px 8px rgba(0,0,0,0.07)",
  },
  {
    size: 155,
    numSize: "1.9rem",
    labelSize: "0.75rem",
    opacity: 0.65,
    shadow: "0 3px 14px rgba(0,0,0,0.09)",
  },
  {
    size: 230,
    numSize: "3rem",
    labelSize: "0.85rem",
    opacity: 1,
    shadow: "0 10px 48px rgba(0,0,0,0.16)",
  },
  {
    size: 140,
    numSize: "1.7rem",
    labelSize: "0.72rem",
    opacity: 0.55,
    shadow: "0 2px 10px rgba(0,0,0,0.08)",
  },
];

export default function OurPipeline() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  const [inView, setInView] = useState(false);
  const [active, setActive] = useState(0);
  const [imgSrcs, setImgSrcs] = useState(STATS.map((s) => s.image));

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) obs.observe(sectionRef.current);

    return () => obs.disconnect();
  }, []);

  const handleImgError = (i: number) => {
    setImgSrcs((prev) => {
      const next = [...prev];
      next[i] = STATS[i].fallback;
      return next;
    });
  };

  const others = STATS.map((_, i) => i).filter((i) => i !== active);

  const displayOrder = [others[0], others[1], active, others[2]];

  return (
    <section
      ref={sectionRef}
      style={{
        width: "100%",
        backgroundColor: "#fff",
        padding: "80px 24px 100px",
        fontFamily: "Arial, sans-serif",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          textAlign: "center",
          maxWidth: "720px",
          margin: "0 auto 72px",
        }}
      >
        <h2
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: "clamp(1.6rem,3vw,2.4rem)",
            fontWeight: 700,
            color: "#1a1a2e",
          }}
        >
          Our Pipeline: Innovating for a Healthier Tomorrow
        </h2>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "40px",
        }}
      >
        {displayOrder.map((statIdx, slot) => {
          const stat = STATS[statIdx];
          const cfg = SLOT_CONFIG[slot];
          const isCenter = slot === 2;

          return (
            <div
              key={statIdx}
              onClick={() => !isCenter && setActive(statIdx)}
              style={{ textAlign: "center", cursor: "pointer" }}
            >
              <div
                style={{
                  width: cfg.size,
                  height: cfg.size,
                  borderRadius: "50%",
                  overflow: "hidden",
                }}
              >
                <img
                  src={imgSrcs[statIdx]}
                  alt={stat.label}
                  onError={() => handleImgError(statIdx)}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>

              <div
                style={{
                  fontSize: cfg.numSize,
                  fontWeight: 700,
                  marginTop: 10,
                }}
              >
                {inView ? (
                  <AnimatedNumber
                    target={stat.number}
                    triggerKey={`${statIdx}-${isCenter}`}
                  />
                ) : (
                  "0+"
                )}
              </div>

              <div
                style={{
                  fontSize: cfg.labelSize,
                  color: "#777",
                }}
              >
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}