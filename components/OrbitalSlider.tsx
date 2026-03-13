"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SERVICES = [
  {
    id: 0,
    tag: "SKIN",
    headline: "Clarity. Balance. Radiance.",
    desc: "Treatments designed to restore healthy skin from within. From pigmentation and acne correction to rejuvenation therapies, our dermatology-led approach focuses on long-term skin health and visible radiance.",
    accent: "#DFAA5E",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80",
  },
  {
    id: 1,
    tag: "HAIR",
    headline: "Strength. Density. Vitality.",
    desc: "Modern hair restoration solutions guided by dermatology science. Our treatments address hair thinning, hair loss, and scalp health with advanced medical therapies and regenerative solutions.",
    accent: "#5B326A",
    image:
      "https://images.unsplash.com/photo-1594824475544-3c6e2d62c3f4?w=1200&q=80",
  },
  {
    id: 2,
    tag: "LASER",
    headline: "Precision. Technology. Transformation.",
    desc: "Advanced laser treatments for smoother, clearer, refined skin. From laser hair reduction to pigmentation and skin resurfacing, our technology delivers safe, precise results.",
    accent: "#292E4B",
    image:
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&q=80",
  },
];

export default function ServicesArc() {
  const [active, setActive] = useState(0);
  const timerRef = useRef(null);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % SERVICES.length);
    }, 6000);
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current);
  }, []);

  const current = SERVICES[active];

  const getLabelStyle = (index) => {
    const total = SERVICES.length;
    const arcSpread = 160;
    const startAngle = -arcSpread / 2;
    const angle = startAngle + (index / (total - 1)) * arcSpread;
    const radiusPx = 420;

    const rad = ((angle - 90) * Math.PI) / 180;
    const x = Math.cos(rad) * radiusPx;
    const y = Math.sin(rad) * radiusPx;

    return {
      position: "absolute",
      left: `calc(50% + ${x}px)`,
      bottom: `${-y + 0}px`,
      transform: `translateX(-50%) rotate(${angle}deg)`,
      transformOrigin: "center bottom",
      color: active === index ? "#1a1a2e" : "#A1A1A1",
      fontWeight: active === index ? "700" : "400",
      letterSpacing: "0.25em",
      fontSize: "11px",
    };
  };

  return (
    <section
      style={{ fontFamily: "'Georgia', serif" }}
      className="relative w-full bg-white py-24 overflow-hidden"
    >
      {/* HEADER */}
      <div className="text-center mb-14 px-4">
        <h2
          style={{
            color: "#1a1a2e",
            fontSize: "clamp(1.7rem,3vw,2.6rem)",
            fontWeight: "700",
          }}
        >
          Three Dimensions of Confidence
        </h2>

        <p
          style={{
            color: "#777",
            fontFamily: "Arial",
            fontSize: "0.92rem",
            maxWidth: "620px",
            margin: "14px auto 0",
            lineHeight: "1.7",
          }}
        >
          Together, these form the philosophy of <b>Luminox – Skin | Hair | Laser</b>.
          Three focused disciplines working together to restore confidence,
          beauty, and long-term skin health.
        </p>
      </div>

      {/* ARC SECTION */}
      <div
        className="relative mx-auto flex items-end justify-center"
        style={{
          maxWidth: "1000px",
          height: "580px",
        }}
      >
        {/* ARC SVG */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            width: "960px",
            height: "960px",
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          <svg
            viewBox="0 0 1000 1000"
            style={{ width: "100%", height: "100%", opacity: 0.18 }}
          >
            <circle
              cx="500"
              cy="1000"
              r="430"
              fill="none"
              stroke="#414042"
              strokeWidth="1"
            />
            <circle
              cx="500"
              cy="1000"
              r="448"
              fill="none"
              stroke="#414042"
              strokeWidth="0.5"
              strokeDasharray="8 12"
            />
          </svg>
        </div>

        {/* LABELS */}
        {SERVICES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => {
              setActive(i);
              startTimer();
            }}
            style={{
              ...getLabelStyle(i),
              background: "none",
              border: "none",
              cursor: "pointer",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              zIndex: 30,
              transition: "all 0.4s",
            }}
          >
            {s.tag}
          </button>
        ))}

        {/* IMAGE CARD */}
        <div
          style={{
            position: "relative",
            width: "min(680px, 90vw)",
            aspectRatio: "1 / 0.72",
            borderRadius: "50% 50% 0 0 / 100% 100% 0 0",
            overflow: "hidden",
            zIndex: 10,
            boxShadow: "0 20px 80px rgba(0,0,0,0.18)",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9 }}
              style={{ position: "absolute", inset: 0 }}
            >
              <img
                src={current.image}
                alt={current.tag}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "brightness(0.65)",
                }}
              />

              {/* overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(10,10,30,0.25)",
                }}
              />

              {/* TEXT */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  padding: "40px 80px 60px",
                }}
              >
                <motion.h3
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  style={{
                    color: "white",
                    fontSize: "clamp(1.2rem,2vw,1.6rem)",
                    marginBottom: "12px",
                  }}
                >
                  {current.headline}
                </motion.h3>

                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  style={{
                    color: "rgba(255,255,255,0.9)",
                    fontFamily: "Arial",
                    fontSize: "0.9rem",
                    lineHeight: "1.7",
                    maxWidth: "480px",
                  }}
                >
                  {current.desc}
                </motion.p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* DOTS */}
          <div
            style={{
              position: "absolute",
              bottom: "22px",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: "10px",
              zIndex: 20,
            }}
          >
            {SERVICES.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setActive(i);
                  startTimer();
                }}
                style={{
                  height: "8px",
                  width: active === i ? "26px" : "8px",
                  borderRadius: "999px",
                  background:
                    active === i ? "#DFAA5E" : "rgba(255,255,255,0.45)",
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
  );
}