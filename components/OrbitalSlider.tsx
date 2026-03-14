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

  const getArcStyle = (index: number) => {
    const total = SERVICES.length;
    const arcSpread = 140;
    const startAngle = -arcSpread / 2;
    const offset = active - 1;
    const shiftedIndex = index - offset;
    const angle = startAngle + (shiftedIndex / (total - 1)) * arcSpread;
    const radiusPx = 400;
    const rad = ((angle - 90) * Math.PI) / 180;
    const x = Math.cos(rad) * radiusPx;
    const y = Math.sin(rad) * radiusPx;
    return { x, y, angle };
  };

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
          padding: 8px 16px;
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

        /* ── Tablet ≤ 860px ── */
        @media (max-width: 860px) {
          .arc-desktop-labels { display: none !important; }
          .arc-svg-bg { display: none !important; }
          .labels-row { display: flex !important; }
          .luminox-section { padding-top: 36px !important; padding-bottom: 36px !important; }
          .luminox-header { margin-bottom: 20px !important; }
          .arc-stage { height: 380px !important; }
        }

        /* ── Mobile ≤ 560px ── */
        @media (max-width: 560px) {
          .luminox-section { padding-top: 28px !important; padding-bottom: 28px !important; }
          .luminox-header { margin-bottom: 14px !important; }
          .image-card { width: 96vw !important; }
          .slide-content-pad { padding: 14px 18px 44px !important; }
          .arc-stage { height: 320px !important; }
          .labels-row { margin-bottom: 12px !important; }
        }

        /* ── Very small ≤ 380px ── */
        @media (max-width: 380px) {
          .luminox-section { padding-top: 20px !important; padding-bottom: 20px !important; }
          .arc-stage { height: 280px !important; }
          .slide-content-pad { padding: 10px 14px 36px !important; }
        }
      `}</style>

      <section
        className="luminox-section relative w-full bg-white overflow-hidden"
        style={{ paddingTop: 64, paddingBottom: 72 }}
      >
        {/* HEADER */}
        <div
          className="luminox-header text-center px-4"
          style={{ marginBottom: 40 }}
        >
          <h2
            style={{
              color: "#1a1a2e",
              fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
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
              fontSize: "clamp(0.78rem, 1.2vw, 0.88rem)",
              maxWidth: "520px",
              margin: "10px auto 0",
              lineHeight: 1.75,
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
          style={{ display: "none", justifyContent: "center", marginBottom: 18 }}
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
          className="arc-stage"
          style={{
            position: "relative",
            width: "min(1000px, 100%)",
            height: isMobile ? "380px" : "520px",
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
                      fontSize: "clamp(1rem, 2vw, 1.55rem)",
                      fontWeight: 600,
                      marginBottom: 10,
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
                      fontSize: "clamp(0.72rem, 1.2vw, 0.88rem)",
                      lineHeight: 1.7,
                      maxWidth: 420,
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
                bottom: 16,
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                gap: 8,
                zIndex: 20,
              }}
            >
              {SERVICES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  style={{
                    height: 6,
                    width: active === i ? 22 : 6,
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