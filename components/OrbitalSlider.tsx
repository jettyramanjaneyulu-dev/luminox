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

// Gap between inner and outer arc circles (tight, like in reference)
const ARC_SPREAD_DEG = 160;
const INNER_ARC_RADIUS = 340;
const OUTER_ARC_RADIUS = 390; // was 490 — reduced to tighten the gap
const STAGE_W = 1100;

function getLabelPosition(index: number, total: number, activeIndex: number) {
  const halfSpread = ARC_SPREAD_DEG / 2;
  const baseAngle = -halfSpread + (index / (total - 1)) * ARC_SPREAD_DEG;
  const activeBase = -halfSpread + (activeIndex / (total - 1)) * ARC_SPREAD_DEG;
  const angle = baseAngle - activeBase;
  const labelRadius = (INNER_ARC_RADIUS + OUTER_ARC_RADIUS) / 2;
  const rad = (angle * Math.PI) / 180;
  const x = Math.sin(rad) * labelRadius;
  const y = -Math.cos(rad) * labelRadius;
  return { x, y, angle };
}

export default function ServicesArc() {
  const [active, setActive] = useState(0);
  const [viewportW, setViewportW] = useState(1100);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const update = () => setViewportW(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % SERVICES.length);
    }, 6000);
  };

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const handleSelect = (i: number) => { setActive(i); startTimer(); };

  // Breakpoints
  const isMobile = viewportW <= 860;
  const isSmall = viewportW <= 560;
  const isTiny = viewportW <= 380;

  // Responsive card dimensions
  // On desktop: fixed 680×340
  // On tablet/mobile: scale with viewport
  let cardWidth: number;
  let cardHeight: number;
  if (isTiny) {
    cardWidth = viewportW * 0.92;
  } else if (isSmall) {
    cardWidth = viewportW * 0.92;
  } else if (isMobile) {
    cardWidth = Math.min(600, viewportW * 0.9);
  } else {
    cardWidth = INNER_ARC_RADIUS * 2; // 680
  }
  cardHeight = cardWidth / 2;

  // Stage height on desktop must accommodate outer arc label zone above inner arc top
  // inner arc top is at: stageH - INNER_ARC_RADIUS (from bottom)
  // outer arc top is at: stageH - OUTER_ARC_RADIUS
  // we need a little buffer above outer arc for the label text
  const LABEL_CLEARANCE = 36; // px above outer arc circle top
  const desktopStageH = OUTER_ARC_RADIUS + LABEL_CLEARANCE;
  const mobileStageH = cardHeight + 10;

  const stageHeight = isMobile ? mobileStageH : desktopStageH;

  // Content padding inside the card (responsive)
  const contentPadH = isSmall ? 16 : isMobile ? 36 : 60;
  const contentPadB = isTiny ? 28 : isSmall ? 36 : 38;
  const headlineFontSize = isSmall
    ? "clamp(0.95rem, 5vw, 1.2rem)"
    : isMobile
    ? "clamp(1rem, 3.5vw, 1.4rem)"
    : "clamp(1rem, 2vw, 1.55rem)";
  const descFontSize = isSmall
    ? "clamp(0.68rem, 3vw, 0.8rem)"
    : "clamp(0.72rem, 1.2vw, 0.88rem)";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Jost:wght@300;400;500&display=swap');
        .luminox-section { font-family: 'Cormorant Garamond', serif; }
        .arc-label-btn {
          background: none; border: none; cursor: pointer;
          font-family: 'Jost', sans-serif; font-size: 11px;
          letter-spacing: 0.3em; text-transform: uppercase;
          white-space: nowrap; position: absolute;
          transform-origin: center center;
          transition: color 0.4s ease, font-weight 0.3s ease, opacity 0.4s ease;
          z-index: 30; padding: 0;
        }
        .row-label-btn {
          background: none; border: none; cursor: pointer;
          font-family: 'Jost', sans-serif; font-size: 11px;
          letter-spacing: 0.3em; text-transform: uppercase;
          padding: 8px 16px; transition: color 0.3s; position: relative;
        }
        .row-label-btn.active::after {
          content: ''; position: absolute; bottom: 0; left: 50%;
          transform: translateX(-50%); width: 20px; height: 2px;
          background: #DFAA5E; border-radius: 2px;
        }
        .slide-content-inner {
          opacity: 0; transform: translateY(18px);
          transition: opacity 0.5s, transform 0.5s;
        }
        .slide-active .slide-content-inner { opacity: 1; transform: translateY(0); }
        .slide-active .slide-content-inner:nth-child(2) { transition-delay: 0.15s; }

        /* === DESKTOP: arc labels visible, row labels hidden === */
        .arc-desktop-labels { display: block; }
        .labels-row { display: none; }

        /* === TABLET / MOBILE: arc hidden, row visible === */
        @media (max-width: 860px) {
          .arc-desktop-labels { display: none !important; }
          .arc-svg-bg { display: none !important; }
          .labels-row { display: flex !important; }
          .luminox-section { padding-top: 36px !important; padding-bottom: 36px !important; }
          .luminox-header { margin-bottom: 20px !important; }
        }

        @media (max-width: 560px) {
          .luminox-section { padding-top: 28px !important; padding-bottom: 28px !important; }
          .luminox-header { margin-bottom: 14px !important; }
          .labels-row { margin-bottom: 12px !important; }
        }

        @media (max-width: 380px) {
          .luminox-section { padding-top: 20px !important; }
        }
      `}</style>

      <section
        className="luminox-section relative w-full bg-white overflow-hidden"
        style={{ paddingTop: isTiny ? 20 : isSmall ? 28 : isMobile ? 36 : 64, paddingBottom: 0 }}
      >
        {/* HEADER */}
        <div
          className="luminox-header text-center px-4"
          style={{ marginBottom: isTiny ? 14 : isSmall ? 14 : isMobile ? 20 : 40 }}
        >
          <h2
            style={{
              color: "#1a1a2e",
              fontSize: isTiny ? "1.3rem" : isSmall ? "1.45rem" : "clamp(1.5rem, 3vw, 2.5rem)",
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
              fontSize: isTiny ? "0.74rem" : isSmall ? "0.78rem" : "clamp(0.78rem, 1.2vw, 0.88rem)",
              maxWidth: "520px",
              margin: "10px auto 0",
              lineHeight: 1.75,
            }}
          >
            Together, these form the philosophy of{" "}
            <b style={{ fontWeight: 500, color: "#555" }}>Luminox – Skin | Hair | Laser</b>.
            Three focused disciplines working together to restore confidence, beauty, and long-term skin health.
          </p>
        </div>

        {/* MOBILE LABEL ROW */}
        <div
          className="labels-row"
          style={{ justifyContent: "center", marginBottom: isSmall ? 12 : 18 }}
        >
          {SERVICES.map((s, i) => (
            <button
              key={s.id}
              className={`row-label-btn${active === i ? " active" : ""}`}
              onClick={() => handleSelect(i)}
              style={{ color: active === i ? "#1a1a2e" : "#bbb", fontWeight: active === i ? 600 : 400 }}
            >
              {s.tag}
            </button>
          ))}
        </div>

        {/* ARC STAGE */}
        <div
          style={{
            position: "relative",
            width: isMobile ? "100%" : `min(${STAGE_W}px, 100%)`,
            height: stageHeight,
            margin: "0 auto",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          {/* SVG ARC LINES — desktop only */}
          <div
            className="arc-svg-bg"
            style={{
              position: "absolute",
              bottom: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: "100%",
              height: stageHeight,
              pointerEvents: "none",
              zIndex: 1,
            }}
          >
            <svg
              viewBox={`0 0 ${STAGE_W} ${desktopStageH}`}
              preserveAspectRatio="xMidYMax meet"
              style={{ width: "100%", height: "100%" }}
            >
              {/* Outer arc — tighter gap now */}
              <circle
                cx={STAGE_W / 2}
                cy={desktopStageH}
                r={OUTER_ARC_RADIUS}
                fill="none"
                stroke="#b8b8b8"
                strokeWidth="0.9"
                strokeDasharray="6 12"
                opacity="0.65"
              />
              {/* Inner arc */}
              <circle
                cx={STAGE_W / 2}
                cy={desktopStageH}
                r={INNER_ARC_RADIUS}
                fill="none"
                stroke="#c0c0c0"
                strokeWidth="0.9"
                opacity="0.55"
              />
            </svg>
          </div>

          {/* ARC LABELS — desktop only */}
          <div className="arc-desktop-labels" style={{ position: "absolute", inset: 0, zIndex: 30 }}>
            {SERVICES.map((s, i) => {
              const { x, y, angle } = getLabelPosition(i, SERVICES.length, active);
              const isActive = active === i;
              // Scale positions to the actual rendered stage width
              const stageRenderedW = Math.min(STAGE_W, viewportW);
              const leftPx = STAGE_W / 2 + x;
              const bottomPx = -y;
              return (
                <button
                  key={s.id}
                  className="arc-label-btn"
                  onClick={() => handleSelect(i)}
                  style={{
                    left: `calc(${(leftPx / STAGE_W) * 100}%)`,
                    bottom: bottomPx,
                    transform: `translateX(-50%) rotate(${angle}deg)`,
                    color: isActive ? "#1a1a2e" : "#aaa",
                    fontWeight: isActive ? 700 : 400,
                    opacity: isActive ? 1 : 0.7,
                  }}
                >
                  {s.tag}
                </button>
              );
            })}
          </div>

          {/* IMAGE CARD — semicircle */}
          <div
            className="image-card-wrap"
            style={{
              position: "relative",
              width: cardWidth,
              height: cardHeight,
              borderRadius: `${cardWidth / 2}px ${cardWidth / 2}px 0 0`,
              overflow: "hidden",
              zIndex: 10,
              boxShadow: "0 16px 60px rgba(0,0,0,0.14)",
              flexShrink: 0,
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
                  style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.52)" }}
                />
                <div style={{ position: "absolute", inset: 0, background: "rgba(10,10,30,0.18)" }} />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: `18px ${contentPadH}px ${contentPadB}px`,
                  }}
                >
                  <div
                    className="slide-content-inner"
                    style={{
                      color: "#fff",
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: headlineFontSize,
                      fontWeight: 600,
                      marginBottom: isSmall ? 6 : 10,
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
                      fontSize: descFontSize,
                      lineHeight: 1.7,
                      maxWidth: isSmall ? 280 : 400,
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
                bottom: 14,
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