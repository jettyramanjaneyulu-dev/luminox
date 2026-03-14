"use client";

import { useState, useEffect, useRef } from "react";

const SERVICES = [
  {
    id: 0,
    tag: "SKIN",
    headline: "Clarity. Balance. Radiance.",
    desc: "Treatments designed to restore healthy skin from within. From pigmentation and acne correction to rejuvenation therapies, our dermatology-led approach focuses on long-term skin health and visible radiance.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80",
  },
  {
    id: 1,
    tag: "HAIR",
    headline: "Strength. Density. Vitality.",
    desc: "Modern hair restoration solutions guided by dermatology science. Our treatments address hair thinning, hair loss, and scalp health with advanced medical therapies and regenerative solutions.",
    image: "https://images.unsplash.com/photo-1594824475544-3c6e2d62c3f4?w=1200&q=80",
  },
  {
    id: 2,
    tag: "LASER",
    headline: "Precision. Technology. Transformation.",
    desc: "Advanced laser treatments for smoother, clearer, refined skin. From laser hair reduction to pigmentation and skin resurfacing, our technology delivers safe, precise results.",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&q=80",
  },
];

export default function ServicesArc() {
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 860);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % SERVICES.length);
    }, 6000);
  };

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleSelect = (i: number) => {
    setActive(i);
    startTimer();
  };

  // Arc label positions — active label is always center (index 1 position)
  const getArcStyle = (index: number) => {
    const total = SERVICES.length;
    const arcSpread = 140;
    const startAngle = -arcSpread / 2;
    // Shift so active is always in center slot
    const offset = active - 1;
    const shiftedIndex = index - offset;
    const angle = startAngle + (shiftedIndex / (total - 1)) * arcSpread;
    const radiusPx = 400;
    const rad = ((angle - 90) * Math.PI) / 180;
    const x = Math.cos(rad) * radiusPx;
    const y = Math.sin(rad) * radiusPx;
    return { x, y, angle };
  };

  const current = SERVICES[active];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Jost:wght@300;400;500&display=swap');

        .luminox-section { font-family: 'Cormorant Garamond', serif; }

        .arc-label-btn {
          background: none;
          border: none;
          cursor: pointer;
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          white-space: nowrap;
          position: absolute;
          transform-origin: center bottom;
          transition: color 0.4s, font-weight 0.3s;
          z-index: 30;
        }

        .row-label-btn {
          background: none;
          border: none;
          cursor: pointer;
          font-family: 'Jost', sans-serif;
          font-size: 11px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          padding: 10px 20px;
          transition: color 0.3s;
          position: relative;
        }

        .row-label-btn.active::after {
          content: '';
          position: absolute;
          bottom: 0; left: 50%;
          transform: translateX(-50%);
          width: 20px; height: 2px;
          background: #DFAA5E;
          border-radius: 2px;
        }

        .slide-content-inner {
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.5s, transform 0.5s;
        }
        .slide-active .slide-content-inner {
          opacity: 1;
          transform: translateY(0);
        }
        .slide-active .slide-content-inner:nth-child(2) {
          transition-delay: 0.15s;
        }

        @media (max-width: 860px) {
          .arc-desktop-labels { display: none !important; }
          .arc-svg-bg { display: none !important; }
          .labels-row { display: flex !important; }
        }

        @media (max-width: 560px) {
          .image-card { width: 92vw !important; }
          .slide-content-pad { padding: 16px 20px 48px !important; }
        }
      `}</style>

      <section
        className="luminox-section relative w-full bg-white py-16 overflow-hidden"
      >
        {/* HEADER */}
        <div className="text-center mb-12 px-4">
          <h2
            style={{
              color: "#1a1a2e",
              fontSize: "clamp(1.6rem, 3vw, 2.5rem)",
              fontWeight: 700,
              letterSpacing: "0.02em",
            }}
          >
            Three Dimensions of Confidence
          </h2>
          <p
            style={{
              color: "#777",
              fontFamily: "'Jost', sans-serif",
              fontWeight: 300,
              fontSize: "0.88rem",
              maxWidth: "560px",
              margin: "12px auto 0",
              lineHeight: 1.8,
            }}
          >
            Together, these form the philosophy of{" "}
            <b style={{ fontWeight: 500, color: "#555" }}>Luminox – Skin | Hair | Laser</b>.
            Three focused disciplines working together to restore confidence,
            beauty, and long-term skin health.
          </p>
        </div>

        {/* MOBILE/TABLET LABEL ROW */}
        <div
          className="labels-row"
          style={{ display: "none", justifyContent: "center", marginBottom: 24 }}
        >
          {SERVICES.map((s, i) => (
            <button
              key={s.id}
              className={`row-label-btn${active === i ? " active" : ""}`}
              onClick={() => handleSelect(i)}
              style={{
                color: active === i ? "#1a1a2e" : "#bbb",
                fontWeight: active === i ? 600 : 400,
              }}
            >
              {s.tag}
            </button>
          ))}
        </div>

        {/* ARC STAGE */}
        <div
          style={{
            position: "relative",
            width: "min(1000px, 100%)",
            height: isMobile ? "460px" : "560px",
            margin: "0 auto",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          {/* ARC SVG BACKGROUND */}
          <div
            className="arc-svg-bg"
            style={{
              position: "absolute",
              bottom: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: 900,
              height: 900,
              pointerEvents: "none",
              zIndex: 1,
            }}
          >
            <svg viewBox="0 0 1000 1000" style={{ width: "100%", height: "100%", opacity: 0.15 }}>
              <circle cx="500" cy="1000" r="430" fill="none" stroke="#414042" strokeWidth="1" />
              <circle cx="500" cy="1000" r="450" fill="none" stroke="#414042" strokeWidth="0.5" strokeDasharray="8 12" />
            </svg>
          </div>

          {/* ARC LABELS (desktop only) */}
          <div className="arc-desktop-labels" style={{ position: "absolute", inset: 0, zIndex: 30 }}>
            {SERVICES.map((s, i) => {
              const { x, y, angle } = getArcStyle(i);
              return (
                <button
                  key={s.id}
                  className="arc-label-btn"
                  onClick={() => handleSelect(i)}
                  style={{
                    left: `calc(50% + ${x}px)`,
                    bottom: -y,
                    transform: `translateX(-50%) rotate(${angle}deg)`,
                    color: active === i ? "#1a1a2e" : "#aaa",
                    fontWeight: active === i ? 700 : 400,
                  }}
                >
                  {s.tag}
                </button>
              );
            })}
          </div>

          {/* IMAGE CARD */}
          <div
            className="image-card"
            style={{
              position: "relative",
              width: "min(680px, 88vw)",
              aspectRatio: "1 / 0.72",
              borderRadius: "50% 50% 0 0 / 100% 100% 0 0",
              overflow: "hidden",
              zIndex: 10,
              boxShadow: "0 20px 80px rgba(0,0,0,0.18)",
            }}
          >
            {SERVICES.map((s, i) => (
              <div
                key={s.id}
                className={i === active ? "slide-active" : ""}
                style={{
                  position: "absolute",
                  inset: 0,
                  opacity: i === active ? 1 : 0,
                  transition: "opacity 0.9s ease",
                }}
              >
                <img
                  src={s.image}
                  alt={s.tag}
                  style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.62)" }}
                />
                <div style={{ position: "absolute", inset: 0, background: "rgba(10,10,30,0.22)" }} />
                <div
                  className="slide-content-pad"
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: "30px 60px 55px",
                  }}
                >
                  <div
                    className="slide-content-inner"
                    style={{
                      color: "#fff",
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "clamp(1.1rem, 2vw, 1.55rem)",
                      fontWeight: 600,
                      marginBottom: 12,
                      letterSpacing: "0.03em",
                    }}
                  >
                    {s.headline}
                  </div>
                  <div
                    className="slide-content-inner"
                    style={{
                      color: "rgba(255,255,255,0.88)",
                      fontFamily: "'Jost', sans-serif",
                      fontWeight: 300,
                      fontSize: "clamp(0.78rem, 1.2vw, 0.88rem)",
                      lineHeight: 1.75,
                      maxWidth: 440,
                    }}
                  >
                    {s.desc}
                  </div>
                </div>
              </div>
            ))}

            {/* DOTS */}
            <div
              style={{
                position: "absolute",
                bottom: 20,
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                gap: 10,
                zIndex: 20,
              }}
            >
              {SERVICES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  style={{
                    height: 7,
                    width: active === i ? 24 : 7,
                    borderRadius: 999,
                    background: active === i ? "#DFAA5E" : "rgba(255,255,255,0.4)",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.35s",
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