"use client";

import { useState, useEffect, useRef, useCallback } from "react";

const SERVICES = [
  {
    id: 0,
    num: "I",
    word: "Skin",
    tag: "Clarity · Balance · Radiance",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1400&q=85",
  },
  {
    id: 1,
    num: "II",
    word: "Hair",
    tag: "Strength · Density · Vitality",
    image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1400&q=85",
  },
  {
    id: 2,
    num: "III",
    word: "Laser",
    tag: "Precision · Technology · Transformation",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1400&q=85",
  },
  {
    id: 3,
    num: "IVF",
    word: "IVF Drips",
    tag: "Restore · Revive · All Stages",
    image: "https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?w=1400&q=85",
  },
];

const AUTO_MS = 5000;

export default function ServicesSection() {
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(
      () => setActive(a => (a + 1) % SERVICES.length),
      AUTO_MS
    );
  }, []);

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [resetTimer]);

  const pick = (i: number) => { setActive(i); resetTimer(); };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,300;0,400;1,300;1,400;1,600;1,700&family=Jost:wght@200;300;400;500&display=swap');

        .lx *, .lx *::before, .lx *::after { box-sizing: border-box; }

        /* ── image crossfade ── */
        .lx-img {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          object-fit: cover;
          transition: opacity 1s cubic-bezier(.4,0,.2,1), transform 1.4s cubic-bezier(.4,0,.2,1);
        }
        .lx-img.on  { opacity: 1; transform: scale(1);    }
        .lx-img.off { opacity: 0; transform: scale(1.04); }

        /* ── row ── */
        .lx-row {
          display: flex;
          align-items: center;
          gap: clamp(10px, 2.5vw, 36px);
          padding: 0 clamp(20px, 6vw, 88px);
          border-bottom: 1px solid rgba(41,46,75,0.08);
          cursor: pointer;
          position: relative;
          overflow: hidden;
          min-height: clamp(64px, 9.5vw, 108px);
          transition: background 0.5s;
        }

        /* left accent bar */
        .lx-row::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0; width: 3px;
          background: #DFAA5E;
          transform: scaleY(0);
          transform-origin: bottom;
          transition: transform 0.5s cubic-bezier(.22,1,.36,1);
        }
        .lx-row.on::before { transform: scaleY(1); }

        /* row hover bg */
        .lx-row:not(.on):hover { background: rgba(41,46,75,0.025); }

        /* ── word animate in ── */
        @keyframes lx-word {
          from { opacity:0; transform: translateY(10px) skewX(-3deg); }
          to   { opacity:1; transform: none; }
        }
        .lx-word-in { animation: lx-word 0.5s cubic-bezier(.22,1,.36,1) both; }

        /* ── tag reveal ── */
        @keyframes lx-tag {
          from { opacity:0; transform: translateX(-8px); }
          to   { opacity:1; transform: none; }
        }
        .lx-tag-in { animation: lx-tag 0.5s ease both 0.18s; }

        /* ── progress bar ── */
        @keyframes lx-prog {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        .lx-prog-bar {
          transform-origin: left;
          animation: lx-prog ${AUTO_MS}ms linear both;
        }

        /* ── image label ── */
        @keyframes lx-label {
          from { opacity:0; transform: translateY(12px); }
          to   { opacity:1; transform: none; }
        }
        .lx-label-in { animation: lx-label 0.6s cubic-bezier(.22,1,.36,1) both 0.2s; }

        /* ── mobile: stack ── */
        @media (max-width: 760px) {
          .lx-right  { display: none !important; }
          .lx-left   { width: 100% !important; border-right: none !important; }
          .lx-mobile-img { display: block !important; }
        }
        @media (max-width: 480px) {
          .lx-num    { display: none !important; }
          .lx-arrow  { display: none !important; }
          .lx-tag    { display: none !important; }
          .lx-row {
            min-height: 58px !important;
            padding: 0 18px !important;
            gap: 10px !important;
          }
        }

        /* ── word size tweak for 4 items on small screens ── */
        @media (max-width: 600px) {
          .lx-word {
            font-size: clamp(2rem, 9vw, 4rem) !important;
          }
        }
      `}</style>

      <section
        className="lx"
        style={{ position: "relative", fontFamily: "'Jost', sans-serif", background: "#fff" }}
      >
        {/* ── MOBILE: small image strip (hidden on desktop) ── */}
        <div
          className="lx-mobile-img"
          style={{
            display: "none",
            position: "relative",
            height: 220,
            overflow: "hidden",
          }}
        >
          {SERVICES.map((s, i) => (
            <img
              key={s.id}
              src={s.image}
              alt={s.word}
              className={`lx-img ${i === active ? "on" : "off"}`}
            />
          ))}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to bottom, transparent 30%, rgba(20,22,40,0.55))",
          }} />
          {/* active label over mobile image */}
          <div style={{
            position: "absolute", bottom: 20, left: 24,
            display: "flex", alignItems: "center", gap: 10,
          }}>
            <div style={{ width: 24, height: 1, background: "#DFAA5E" }} />
            <span
              key={`mlbl-${active}`}
              className="lx-label-in"
              style={{
                fontFamily: "'Jost', sans-serif",
                fontSize: 10,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "#fff",
                fontWeight: 300,
              }}
            >
              {SERVICES[active].tag}
            </span>
          </div>
        </div>

        {/* ── MAIN BODY ── */}
        <div style={{ display: "flex", alignItems: "stretch" }}>

          {/* LEFT: text list */}
          <div
            className="lx-left"
            style={{
              width: "52%",
              flexShrink: 0,
              borderRight: "1px solid rgba(41,46,75,0.08)",
              background: "#fff",
            }}
          >
            {/* header */}
            <div style={{
              padding: "clamp(32px,5vw,80px) clamp(20px,6vw,88px) clamp(22px,3.5vw,48px)",
              borderBottom: "1px solid rgba(41,46,75,0.08)",
            }}>
              <div style={{
                display: "flex", alignItems: "center", gap: 10, marginBottom: 14,
              }}>
                <div style={{ height: 1, width: 24, background: "#DFAA5E" }} />
                <span style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: 10, letterSpacing: "0.32em",
                  textTransform: "uppercase", color: "#DFAA5E", fontWeight: 400,
                }}>
                  Luminox Derma Clinic
                </span>
              </div>
              <h2 style={{
                fontFamily: "'Cormorant', serif",
                fontStyle: "italic", fontWeight: 300,
                fontSize: "clamp(1.8rem, 4vw, 3.6rem)",
                color: "#292E4B", lineHeight: 1.05, margin: 0,
              }}>
                Our Expertise
              </h2>
            </div>

            {/* service rows */}
            {SERVICES.map((s, i) => {
              const isOn = i === active;
              return (
                <div
                  key={s.id}
                  className={`lx-row${isOn ? " on" : ""}`}
                  onClick={() => pick(i)}
                  style={{ background: isOn ? "rgba(223,170,94,0.04)" : "transparent" }}
                >
                  {/* roman numeral */}
                  <span
                    className="lx-num"
                    style={{
                      fontFamily: "'Cormorant', serif",
                      fontStyle: "italic", fontWeight: 300,
                      fontSize: "clamp(0.65rem,1vw,0.82rem)",
                      color: isOn ? "#DFAA5E" : "rgba(41,46,75,0.22)",
                      width: 22, flexShrink: 0,
                      transition: "color 0.4s",
                      userSelect: "none",
                    }}
                  >
                    {s.num}
                  </span>

                  {/* big word */}
                  <span
                    key={`w-${i}-${isOn}`}
                    className={`lx-word${isOn ? " lx-word-in" : ""}`}
                    style={{
                      fontFamily: "'Cormorant', serif",
                      fontStyle: isOn ? "italic" : "normal",
                      fontWeight: isOn ? 700 : 300,
                      fontSize: "clamp(2.2rem, 4.8vw, 5rem)",
                      color: isOn ? "#292E4B" : "rgba(41,46,75,0.28)",
                      lineHeight: 1,
                      flexShrink: 0,
                      letterSpacing: isOn ? "-0.02em" : "0.01em",
                      transition: "color 0.4s",
                      userSelect: "none",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {s.word}
                  </span>

                  {/* tag */}
                  <span
                    key={`t-${i}-${isOn}`}
                    className={`lx-tag${isOn ? " lx-tag-in" : ""}`}
                    style={{
                      fontFamily: "'Jost', sans-serif",
                      fontWeight: 200,
                      fontSize: "clamp(0.55rem, 0.9vw, 0.72rem)",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "#414042",
                      opacity: isOn ? 0.7 : 0,
                      transition: "opacity 0.4s",
                    }}
                  >
                    {s.tag}
                  </span>

                  <div style={{ flex: 1 }} />

                  {/* arrow */}
                  <span
                    className="lx-arrow"
                    style={{
                      fontFamily: "'Cormorant', serif",
                      fontSize: "clamp(0.9rem, 1.4vw, 1.15rem)",
                      color: isOn ? "#DFAA5E" : "rgba(41,46,75,0.15)",
                      display: "inline-block",
                      transition: "color 0.4s, transform 0.4s",
                      transform: isOn ? "translateX(0)" : "translateX(-5px)",
                    }}
                  >
                    →
                  </span>

                  {/* progress hairline */}
                  {isOn && (
                    <div style={{
                      position: "absolute", bottom: 0, left: 0, right: 0,
                      height: 1, overflow: "hidden",
                      background: "rgba(223,170,94,0.2)",
                    }}>
                      <div
                        key={`p-${active}`}
                        className="lx-prog-bar"
                        style={{ position: "absolute", inset: 0, background: "#DFAA5E" }}
                      />
                    </div>
                  )}
                </div>
              );
            })}

            {/* footer */}
            <div style={{
              padding: "clamp(14px,2.5vw,28px) clamp(20px,6vw,88px)",
              borderTop: "1px solid rgba(41,46,75,0.08)",
              display: "flex", alignItems: "center",
              justifyContent: "space-between", flexWrap: "wrap", gap: 12,
            }}>
              <p style={{
                fontFamily: "'Cormorant', serif", fontStyle: "italic",
                fontWeight: 300, fontSize: "clamp(0.78rem,1.1vw,0.95rem)",
                color: "rgba(41,46,75,0.38)", margin: 0,
              }}>
                Four dimensions of confidence.
              </p>
              <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
                {SERVICES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => pick(i)}
                    style={{
                      width: active === i ? 26 : 6,
                      height: 2, borderRadius: 2,
                      background: active === i ? "#DFAA5E" : "rgba(41,46,75,0.18)",
                      border: "none", cursor: "pointer", padding: 0,
                      transition: "all 0.4s cubic-bezier(.22,1,.36,1)",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: image panel */}
          <div
            className="lx-right"
            style={{ flex: 1, position: "relative", overflow: "hidden", minHeight: 520 }}
          >
            {/* images */}
            {SERVICES.map((s, i) => (
              <img
                key={s.id}
                src={s.image}
                alt={s.word}
                className={`lx-img ${i === active ? "on" : "off"}`}
              />
            ))}

            {/* subtle dark overlay */}
            <div style={{
              position: "absolute", inset: 0, zIndex: 2,
              background: "linear-gradient(to bottom, rgba(20,22,40,0.18) 0%, rgba(20,22,40,0.42) 100%)",
            }} />

            {/* active label — bottom left over image */}
            <div style={{
              position: "absolute", bottom: 36, left: 36,
              zIndex: 3,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <div style={{ width: 28, height: 1, background: "#DFAA5E" }} />
                <span
                  key={`lbl-${active}`}
                  className="lx-label-in"
                  style={{
                    fontFamily: "'Jost', sans-serif",
                    fontSize: 10, letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.75)", fontWeight: 300,
                  }}
                >
                  {SERVICES[active].tag}
                </span>
              </div>
              <p
                key={`big-${active}`}
                className="lx-label-in"
                style={{
                  fontFamily: "'Cormorant', serif",
                  fontStyle: "italic", fontWeight: 700,
                  fontSize: "clamp(2.4rem, 4.5vw, 4.8rem)",
                  color: "#fff", lineHeight: 1,
                  margin: 0, letterSpacing: "-0.02em",
                  textShadow: "0 2px 24px rgba(0,0,0,0.25)",
                }}
              >
                {SERVICES[active].word}
              </p>
            </div>

            {/* thin gold bottom border */}
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              height: 3, background: "#DFAA5E", zIndex: 3,
            }} />
          </div>

        </div>
      </section>
    </>
  );
}