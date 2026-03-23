"use client";
import React from "react";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const REVIEWS = [
  {
    id: 1,
    name: "Aditi Sharma",
    role: "Skin Care Patient",
    treatment: "HydraFacial + Chemical Peel",
    text: "The skin rejuvenation treatment at Luminox completely transformed my complexion. My skin hasn't felt this radiant in years — the specialists genuinely care about your results.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&q=80",
    accent: "#DFAA5E",
  },
  {
    id: 2,
    name: "Vikram Mehta",
    role: "Hair Treatment Patient",
    treatment: "Laser Hair Removal",
    text: "I was skeptical about laser treatments, but the precision and care here are truly unmatched. Minimal downtime and the results speak for themselves. Absolutely recommend.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&q=80",
    accent: "#D95CB9",
  },
  {
    id: 3,
    name: "Sana Khan",
    role: "Bridal Package",
    treatment: "Bridal Glow + Injectables",
    text: "Their bridal transformation package is absolutely worth every rupee. They don't just treat the skin — they nurture your confidence. I felt like royalty on my wedding day.",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=500&q=80",
    accent: "#9B6DB5",
  },
  {
    id: 4,
    name: "Priya Nair",
    role: "Medical Dermatology",
    treatment: "Acne Scar Revision",
    text: "After struggling with persistent acne for 10 years, Luminox gave me my confidence back. The dermatologist designed a plan specifically for my skin — completely life-changing.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500&q=80",
    accent: "#5B326A",
  },
];

function Stars({ color = "#DFAA5E", size = 13 }: { color?: string; size?: number }) {
  return (
    <div style={{ display: "flex", gap: 3 }}>
      {[...Array(5)].map((_, i) => (
        <svg key={i} viewBox="0 0 16 16" width={size} height={size} fill={color}>
          <path d="M8 1l1.85 3.75L14 5.5l-3 2.92.71 4.13L8 10.5l-3.71 1.95L5 8.42 2 5.5l4.15-.75z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const current = REVIEWS[active];

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setDir(1);
      setActive((p) => (p + 1) % REVIEWS.length);
    }, 6000);
  };

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const goTo = (i: number) => {
    setDir(i > active ? 1 : -1);
    setActive(i);
    resetTimer();
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,700;1,600&family=Jost:wght@300;400;500;700&display=swap');

        .t-section { font-family: 'Jost', sans-serif; }

        .t-card-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: 380px;
        }

        .t-thumbs {
          position: absolute;
          bottom: 20px;
          right: 12px;
          z-index: 20;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .t-arrow-prev:hover { background: #292E4B !important; color: #fff !important; }
        .t-arrow-next:hover { background: #DFAA5E !important; }

        @media (max-width: 860px) {
          .t-card-grid { grid-template-columns: 1fr !important; }
          .t-img-panel { min-height: 240px !important; max-height: 280px !important; }
          .t-thumbs {
            flex-direction: row !important;
            bottom: 10px !important;
            right: 50% !important;
            transform: translateX(50%) !important;
          }
        }

        @media (max-width: 600px) {
          .t-section {
            padding: 40px 0 48px !important;
          }
          .t-header { margin-bottom: 28px !important; }
          .t-img-panel { min-height: 200px !important; max-height: 240px !important; }
          .t-content-panel {
            padding: 16px 14px 20px !important;
          }
          .t-google-strip { flex-wrap: wrap !important; gap: 8px !important; }
          .t-strip-divider { display: none !important; }
          .t-strip-stat { flex: 1; min-width: 55px; }
          .t-nav-row { flex-direction: column !important; gap: 10px !important; align-items: flex-start !important; }
        }

        @media (max-width: 400px) {
          .t-img-panel { min-height: 180px !important; max-height: 210px !important; }
        }
      `}</style>

      {/* 
        FIX: 
        1. z-index: 99 removed — idi scroll chestunappudu section ni header tho overlap chesindi
        2. position: relative matrame set chesamu — "sticky" behaviour undadu
        3. isolation: isolate add chesamu — inner z-index stacking context correct ga untundi
        4. background blobs div ki position:absolute + inset:0 correct ga set chesamu
      */}
      <section
        className="t-section"
        style={{
          position: "relative",
          isolation: "isolate",
          width: "100%",
          overflow: "hidden",
          backgroundColor: "#FFFFFF",
          padding: "60px 0",
        }}
      >
        {/* Background blobs */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            overflow: "hidden",
            zIndex: 0,
          }}
        >
          <div style={{ position:"absolute",top:-80,right:-80,width:500,height:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(223,170,94,.07) 0%,transparent 65%)" }}/>
          <div style={{ position:"absolute",bottom:-80,left:-80,width:400,height:400,borderRadius:"50%",background:"radial-gradient(circle,rgba(91,50,106,.07) 0%,transparent 65%)" }}/>
          <svg style={{ position:"absolute",top:24,left:24,opacity:.03 }} width="200" height="170" viewBox="0 0 220 180" fill="#292E4B">
            <path d="M0 110C0 50 38 8 88 8L88 50C62 50 46 68 46 110L86 110L86 180L0 180Z"/>
            <path d="M120 110C120 50 158 8 208 8L208 50C182 50 166 68 166 110L206 110L206 180L120 180Z"/>
          </svg>
        </div>

        {/* Content wrapper — z-index 1 so it sits above blobs but below nothing else */}
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1280, margin: "0 auto", padding: "0 20px" }}>

          {/* Header */}
          <div className="t-header" style={{ textAlign:"center", marginBottom:36 }}>
            <div style={{ display:"inline-flex",alignItems:"center",gap:12,marginBottom:12 }}>
              <div style={{ height:1,width:32,background:"#DFAA5E" }}/>
              <span style={{ color:"#DFAA5E",fontWeight:700,fontSize:11,letterSpacing:".3em",textTransform:"uppercase" }}>Client Stories</span>
              <div style={{ height:1,width:32,background:"#DFAA5E" }}/>
            </div>
            <h2 style={{ color:"#292E4B",fontFamily:"'Cormorant Garamond',serif",fontSize:"clamp(24px,4vw,40px)",fontWeight:700,lineHeight:1.15 }}>
              Real People.{" "}
              <em style={{ color:"#DFAA5E",fontStyle:"italic" }}>Real Results.</em>
            </h2>
            <p style={{ color:"#414042",fontSize:13,maxWidth:460,margin:"10px auto 0",lineHeight:1.7,fontWeight:300 }}>
              Thousands of patients have transformed their skin and confidence at Luminox. Here are a few of their stories.
            </p>
          </div>

          {/* Card */}
          <div style={{ borderRadius:24,overflow:"hidden",background:"#fff" }}>
            <div className="t-card-grid">

              {/* ── LEFT: Image panel ── */}
              <div className="t-img-panel" style={{ position:"relative",overflow:"hidden",minHeight:340 }}>

                {/* Ghost cards */}
                {[1,2].map((offset) => {
                  const gIdx = (active + offset) % REVIEWS.length;
                  return (
                    <div key={gIdx} style={{
                      position:"absolute",inset:0,
                      transform:`scale(${1-offset*.03}) translateY(${offset*-10}px)`,
                      transformOrigin:"bottom center",
                      zIndex:2-offset, opacity:.28,
                    }}>
                      <img src={REVIEWS[gIdx].image} alt="" style={{ width:"100%",height:"100%",objectFit:"cover",objectPosition:"top" }}/>
                      <div style={{ position:"absolute",inset:0,background:"rgba(41,46,75,.55)" }}/>
                    </div>
                  );
                })}

                {/* Active image */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity:0,scale:1.06 }}
                    animate={{ opacity:1,scale:1 }}
                    exit={{ opacity:0 }}
                    transition={{ duration:.6,ease:[.22,1,.36,1] }}
                    style={{ position:"absolute",inset:0,zIndex:3 }}
                  >
                    <img src={current.image} alt={current.name}
                      style={{ width:"100%",height:"100%",objectFit:"cover",objectPosition:"top" }}/>
                    <div style={{ position:"absolute",inset:0,background:"linear-gradient(to top,rgba(41,46,75,.88) 0%,rgba(41,46,75,.1) 55%,transparent 100%)" }}/>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`info-${active}`}
                        initial={{ opacity:0,y:14 }}
                        animate={{ opacity:1,y:0 }}
                        exit={{ opacity:0,y:-8 }}
                        transition={{ duration:.35,delay:.2 }}
                        style={{ position:"absolute",bottom:0,left:0,right:0,padding:"clamp(14px,2.5vw,22px)",zIndex:5 }}
                      >
                        <div style={{ display:"inline-flex",alignItems:"center",borderRadius:100,padding:"4px 12px",background:current.accent,marginBottom:8 }}>
                          <span style={{ color:"#292E4B",fontSize:9,fontWeight:800,letterSpacing:".15em",textTransform:"uppercase" }}>
                            {current.treatment}
                          </span>
                        </div>
                        <div style={{ color:"#fff",fontWeight:700,fontSize:"clamp(14px,1.8vw,18px)",lineHeight:1.2 }}>{current.name}</div>
                        <div style={{ color:"rgba(255,255,255,.6)",fontSize:11,fontWeight:500,marginTop:3,letterSpacing:".05em" }}>{current.role}</div>
                      </motion.div>
                    </AnimatePresence>
                  </motion.div>
                </AnimatePresence>

                {/* Thumbnails */}
                <div className="t-thumbs">
                  {REVIEWS.map((r, i) => (
                    <button key={i} onClick={() => goTo(i)} aria-label={r.name}
                      style={{
                        width: i===active ? 40 : 32,
                        height: i===active ? 40 : 32,
                        borderRadius:"50%",overflow:"hidden",padding:0,cursor:"pointer",
                        border: i===active ? `2.5px solid ${r.accent}` : "2px solid rgba(255,255,255,.3)",
                        opacity: i===active ? 1 : 0.55,
                        flexShrink:0,
                        transition:"all .3s ease",
                      }}
                    >
                      <img src={r.image} alt={r.name} style={{ width:"100%",height:"100%",objectFit:"cover",objectPosition:"top",display:"block" }}/>
                    </button>
                  ))}
                </div>
              </div>

              {/* ── RIGHT: Content panel ── */}
              <div className="t-content-panel" style={{
                padding:"clamp(20px,4vw,40px)",
                display:"flex",flexDirection:"column",justifyContent:"space-between",background:"#fff"
              }}>
                <div>
                  {/* Top row: stars + icon */}
                  <div style={{ display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:16 }}>
                    <Stars />
                    <div style={{ width:44,height:44,borderRadius:12,background:"linear-gradient(135deg,#292E4B,#5B326A)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                      <svg viewBox="0 0 28 22" width="18" height="18" fill="white">
                        <path d="M0 14C0 6 5 1 12 1L12 6C8 6 6 9 6 14L11 14L11 22L0 22Z"/>
                        <path d="M16 14C16 6 21 1 28 1L28 6C24 6 22 9 22 14L27 14L27 22L16 22Z"/>
                      </svg>
                    </div>
                  </div>

                  {/* Quote */}
                  <div style={{ display:"flex",alignItems:"center",minHeight:100 }}>
                    <AnimatePresence mode="wait">
                      <motion.blockquote
                        key={`q-${active}`}
                        initial={{ opacity:0,x:dir*24 }}
                        animate={{ opacity:1,x:0 }}
                        exit={{ opacity:0,x:dir*-24 }}
                        transition={{ duration:.45,ease:[.22,1,.36,1] }}
                        style={{
                          fontFamily:"'Cormorant Garamond',serif",
                          fontSize:"clamp(14px,1.6vw,19px)",
                          fontStyle:"italic",
                          color:"#292E4B",
                          lineHeight:1.7,
                          margin:0,
                        }}
                      >
                        &ldquo;{current.text}&rdquo;
                      </motion.blockquote>
                    </AnimatePresence>
                  </div>
                </div>

                <div>
                  <div style={{ height:1,background:"rgba(41,46,75,.08)",margin:"16px 0" }}/>

                  {/* Nav row */}
                  <div className="t-nav-row" style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14 }}>
                    {/* Dots + counter */}
                    <div style={{ display:"flex",alignItems:"center",gap:7 }}>
                      {REVIEWS.map((r, i) => (
                        <button key={i} onClick={() => goTo(i)} aria-label={`Review ${i+1}`}
                          style={{
                            height:4,borderRadius:100,border:"none",cursor:"pointer",padding:0,
                            width: i===active ? 28 : 9,
                            background: i===active ? r.accent : "rgba(41,46,75,.15)",
                            transition:"all .35s ease",
                          }}
                        />
                      ))}
                      <span style={{ color:"#414042",opacity:.4,fontSize:11,fontWeight:700,marginLeft:6 }}>
                        {String(active+1).padStart(2,"0")} / {String(REVIEWS.length).padStart(2,"0")}
                      </span>
                    </div>

                    {/* Arrows */}
                    <div style={{ display:"flex",gap:7 }}>
                      {[
                        { fn:()=>goTo((active-1+REVIEWS.length)%REVIEWS.length), label:"Prev", icon:"M15 19l-7-7 7-7", cls:"t-arrow-prev", bg:"transparent", border:"1.5px solid rgba(41,46,75,.2)", color:"#292E4B" },
                        { fn:()=>goTo((active+1)%REVIEWS.length), label:"Next", icon:"M9 5l7 7-7 7", cls:"t-arrow-next", bg:"#292E4B", border:"none", color:"#fff" },
                      ].map((btn, bi) => (
                        <button key={bi} onClick={btn.fn} aria-label={btn.label}
                          className={btn.cls}
                          style={{ width:36,height:36,borderRadius:"50%",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",background:btn.bg,border:btn.border,color:btn.color,transition:"all .2s ease" }}
                        >
                          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d={btn.icon}/>
                          </svg>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Google strip */}
                  <div className="t-google-strip" style={{ display:"flex",alignItems:"center",gap:12,background:"#FAF9F6",borderRadius:12,padding:"10px 14px",border:"1.5px solid rgba(41,46,75,.07)" }}>
                    <svg viewBox="0 0 24 24" width="20" height="20" style={{ flexShrink:0 }}>
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <div>
                      <div style={{ display:"flex",alignItems:"center",gap:5 }}><Stars /><span style={{ color:"#292E4B",fontWeight:800,fontSize:12 }}>4.9</span></div>
                      <div style={{ color:"#414042",opacity:.55,fontSize:9,fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",marginTop:2 }}>400+ Google Reviews</div>
                    </div>
                    {[
                      { num:"98%",  label:"Recommend Us" },
                      { num:"20K+", label:"Happy Patients" },
                    ].map((s,i) => (
                      <React.Fragment key={i}>
                        <div className="t-strip-divider" style={{ width:1,height:28,background:"rgba(41,46,75,.1)",flexShrink:0 }}/>
                        <div className="t-strip-stat" style={{ textAlign:"center" }}>
                          <div style={{ color:"#292E4B",fontWeight:700,fontSize:14,fontFamily:"'Cormorant Garamond',serif" }}>{s.num}</div>
                          <div style={{ color:"#414042",opacity:.55,fontSize:9,fontWeight:700,letterSpacing:".08em",textTransform:"uppercase",marginTop:1 }}>{s.label}</div>
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}