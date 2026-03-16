"use client";

import { useEffect, useRef, useState } from "react";

// ── Hook: Intersection Observer ────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

// ── Watch SVG illustration ─────────────────────────────────────────────────
function WatchIllustration({ size = 260 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 260 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="104" y="8" width="52" height="36" rx="6" fill="#1e2240" stroke="#DFAA5E" strokeWidth="1" strokeOpacity="0.4" />
      <rect x="104" y="216" width="52" height="36" rx="6" fill="#1e2240" stroke="#DFAA5E" strokeWidth="1" strokeOpacity="0.4" />
      <circle cx="130" cy="130" r="110" fill="#1a1f38" stroke="#DFAA5E" strokeWidth="2" strokeOpacity="0.5" />
      <circle cx="130" cy="130" r="100" fill="none" stroke="#DFAA5E" strokeWidth="0.75" strokeOpacity="0.25" strokeDasharray="4 6" />
      <circle cx="130" cy="130" r="88" fill="url(#watchFaceAbout)" stroke="#2a2f4a" strokeWidth="4" />
      <circle cx="130" cy="130" r="72" fill="none" stroke="#DFAA5E" strokeWidth="1" strokeOpacity="0.35" />
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const r1 = 72, r2 = i % 3 === 0 ? 60 : 65;
        return (
          <line key={i}
            x1={130 + r1 * Math.sin(angle)} y1={130 - r1 * Math.cos(angle)}
            x2={130 + r2 * Math.sin(angle)} y2={130 - r2 * Math.cos(angle)}
            stroke="#DFAA5E" strokeWidth={i % 3 === 0 ? 2.5 : 1.2}
            strokeOpacity={i % 3 === 0 ? 0.9 : 0.5}
          />
        );
      })}
      {[0, 90, 180, 270].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        return (
          <circle key={deg}
            cx={130 + 58 * Math.sin(rad)} cy={130 - 58 * Math.cos(rad)}
            r={4} fill="#DFAA5E" opacity={0.85}
          />
        );
      })}
      <line x1="130" y1="88" x2="130" y2="130" stroke="#F2EDE8" strokeWidth="4" strokeLinecap="round" />
      <line x1="130" y1="72" x2="162" y2="130" stroke="#DFAA5E" strokeWidth="3" strokeLinecap="round" />
      <line x1="130" y1="148" x2="118" y2="130" stroke="#E85555" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="130" cy="130" r="6" fill="#DFAA5E" />
      <circle cx="130" cy="130" r="3" fill="#1a1f38" />
      <text x="130" y="108" textAnchor="middle" fontFamily="'Bebas Neue', sans-serif" fontSize="10" fill="#F2EDE8" letterSpacing="4">LUMINOX</text>
      <text x="130" y="120" textAnchor="middle" fontFamily="'Barlow Condensed', sans-serif" fontSize="7" fill="#DFAA5E" letterSpacing="2.5">NAVY SEAL</text>
      <rect x="218" y="122" width="14" height="16" rx="3" fill="#1e2240" stroke="#DFAA5E" strokeWidth="1" strokeOpacity="0.5" />
      <defs>
        <radialGradient id="watchFaceAbout" cx="35%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#2e3560" />
          <stop offset="100%" stopColor="#080c1a" />
        </radialGradient>
      </defs>
    </svg>
  );
}

// ── MAIN COMPONENT ─────────────────────────────────────────────────────────
export default function About() {
  const heroRef   = useInView(0.1);
  const doctorRef = useInView(0.12);
  const mvRef     = useInView(0.12);
  const ctaRef    = useInView(0.15);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel  = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow+Condensed:wght@300;400;600;700&family=Barlow:wght@300;400;500&display=swap";
    document.head.appendChild(link);
  }, []);

  // ── helpers ──
  const Tag = ({ children, center = false }: { children: React.ReactNode; center?: boolean }) => (
    <p style={{
      fontFamily: "'Barlow Condensed', sans-serif", fontSize: "0.72rem", fontWeight: 600,
      letterSpacing: "0.32em", textTransform: "uppercase", color: "#DFAA5E",
      marginBottom: "0.6rem", display: "flex", alignItems: "center",
      justifyContent: center ? "center" : "flex-start", gap: "0.7rem",
    }}>
      <span style={{ width: 28, height: 1.5, background: "#DFAA5E", display: "inline-block" }} />
      {children}
      {center && <span style={{ width: 28, height: 1.5, background: "#DFAA5E", display: "inline-block" }} />}
    </p>
  );

  const Heading = ({ children, light = false }: { children: React.ReactNode; light?: boolean }) => (
    <h2 style={{
      fontFamily: "'Bebas Neue', sans-serif", fontSize: "clamp(2.2rem, 3.5vw, 3.4rem)",
      lineHeight: 1, letterSpacing: "0.06em",
      color: light ? "#F2EDE8" : "#292E4B",
      marginBottom: "0.4rem", position: "relative", display: "inline-block",
    }}>
      {children}
      <span style={{ position: "absolute", bottom: -10, left: 0, width: 52, height: 3, background: "#DFAA5E" }} />
    </h2>
  );

  return (
    <div style={{ fontFamily: "'Barlow', sans-serif", margin: 0, padding: 0, overflowX: "hidden" }}>

      <style>{`
        @keyframes spin    { to { transform: rotate(360deg);  } }
        @keyframes spinRev { to { transform: rotate(-360deg); } }
        .btn-gold {
          font-family:'Barlow Condensed',sans-serif; font-size:.82rem; font-weight:700;
          letter-spacing:.18em; text-transform:uppercase;
          background:#DFAA5E; color:#1A1D30; border:none;
          padding:1rem 2.6rem; cursor:pointer;
          transition:background .25s,transform .2s,box-shadow .25s;
        }
        .btn-gold:hover { background:#e8b96e; transform:translateY(-2px); box-shadow:0 8px 28px rgba(223,170,94,.35); }
        .btn-navy {
          font-family:'Barlow Condensed',sans-serif; font-size:.82rem; font-weight:600;
          letter-spacing:.18em; text-transform:uppercase;
          background:transparent; color:#292E4B;
          border:1.5px solid rgba(41,46,75,.3);
          padding:1rem 2.6rem; cursor:pointer;
          transition:border-color .25s,color .25s;
        }
        .btn-navy:hover { border-color:#DFAA5E; color:#DFAA5E; }
        .mv-card { position:relative; overflow:hidden; }
        .mv-card:hover .mv-bar { width:100% !important; }
        @media(max-width:900px){
          .g2   { grid-template-columns:1fr !important; }
          .g4   { grid-template-columns:1fr 1fr !important; }
          .hw   { display:none !important; }
          .cta-r{ transform:none !important; }
        }
        @media(max-width:580px){
          .g4 { grid-template-columns:1fr !important; }
        }
      `}</style>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 1 — HERO  (dark navy)
      ══════════════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef.ref}
        className="g2"
        style={{
          minHeight: "88vh", display: "grid",
          gridTemplateColumns: "1fr 1fr", alignItems: "center",
          padding: "6rem 8% 5rem", gap: "4rem",
          background: "#1A1D30", position: "relative", overflow: "hidden",
        }}
      >
        {/* bg radial glows */}
        <div style={{ position:"absolute", inset:0, pointerEvents:"none",
          background:"radial-gradient(ellipse 55% 65% at 75% 50%,rgba(41,46,75,.8) 0%,transparent 70%),radial-gradient(ellipse 35% 45% at 15% 85%,rgba(223,170,94,.07) 0%,transparent 60%)" }} />
        <div style={{ position:"absolute", top:0, left:"8%", width:1, height:"100%",
          background:"linear-gradient(to bottom,transparent,rgba(223,170,94,.1),transparent)", pointerEvents:"none" }} />

        {/* copy */}
        <div style={{
          position:"relative", zIndex:2,
          opacity: heroRef.inView ? 1 : 0,
          transform: heroRef.inView ? "translateY(0)" : "translateY(32px)",
          transition: "opacity .85s ease, transform .85s ease",
        }}>
          <Tag>Our Story</Tag>
          <h1 style={{
            fontFamily:"'Bebas Neue',sans-serif",
            fontSize:"clamp(4rem,7vw,7.5rem)", lineHeight:.92,
            letterSpacing:".04em", color:"#F2EDE8", margin:".4rem 0 1.8rem",
          }}>
            BORN IN<br />THE<br /><span style={{ color:"#DFAA5E" }}>DARK</span>
          </h1>
          <p style={{ fontSize:"1.05rem", fontWeight:300, lineHeight:1.78,
            color:"#C8C4BE", maxWidth:460, marginBottom:"2.5rem" }}>
            Luminox was created for those who operate where light fails. Since 1989 we've
            equipped the world's most elite forces with timepieces that never sleep, never
            fail, and never go dark.
          </p>
          <div style={{ display:"flex", gap:"1.2rem", flexWrap:"wrap" }}>
            <button className="btn-gold">Explore Collections</button>
            <button style={{
              fontFamily:"'Barlow Condensed',sans-serif", fontSize:".82rem",
              fontWeight:600, letterSpacing:".16em", textTransform:"uppercase",
              background:"transparent", color:"#F2EDE8",
              border:"1.5px solid rgba(242,237,232,.25)",
              padding:"1rem 2.4rem", cursor:"pointer",
            }}>Watch Technology</button>
          </div>
          {/* mini stat strip */}
          <div style={{
            display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"1rem",
            marginTop:"3rem", paddingTop:"2rem",
            borderTop:"1px solid rgba(223,170,94,.15)",
          }}>
            {[{v:"35+",l:"Years"},{v:"25yr",l:"Tube Life"},{v:"200m",l:"Water Resist."}].map(s=>(
              <div key={s.l} style={{ textAlign:"center" }}>
                <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"2rem",
                  color:"#DFAA5E", letterSpacing:".04em" }}>{s.v}</div>
                <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:".65rem",
                  fontWeight:600, letterSpacing:".2em", textTransform:"uppercase",
                  color:"#C8C4BE", marginTop:".2rem" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* animated watch */}
        <div className="hw" style={{
          display:"flex", alignItems:"center", justifyContent:"center",
          position:"relative", zIndex:2,
          opacity: heroRef.inView ? 1 : 0,
          transform: heroRef.inView ? "scale(1)" : "scale(.88)",
          transition: "opacity 1s ease .35s, transform 1s ease .35s",
        }}>
          <div style={{ position:"relative" }}>
            <div style={{ position:"absolute", top:"50%", left:"50%",
              width:300, height:300, marginLeft:-150, marginTop:-150,
              borderRadius:"50%", border:"1px solid rgba(223,170,94,.14)",
              animation:"spin 30s linear infinite" }} />
            <div style={{ position:"absolute", top:"50%", left:"50%",
              width:360, height:360, marginLeft:-180, marginTop:-180,
              borderRadius:"50%", border:"1px dashed rgba(223,170,94,.07)",
              animation:"spinRev 22s linear infinite" }} />
            <WatchIllustration size={265} />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 2 — ABOUT THE DOCTOR  (white)
      ══════════════════════════════════════════════════════════════════ */}
      <section
        ref={doctorRef.ref}
        className="g2"
        style={{
          display:"grid", gridTemplateColumns:"1fr 1fr",
          alignItems:"center", gap:"5rem",
          padding:"7rem 8%", background:"#ffffff",
        }}
      >
        {/* photo card */}
        <div style={{
          position:"relative",
          opacity: doctorRef.inView ? 1 : 0,
          transform: doctorRef.inView ? "translateX(0)" : "translateX(-28px)",
          transition: "opacity .85s ease, transform .85s ease",
        }}>
          <div style={{
            width:"100%", aspectRatio:"4/5",
            background:"linear-gradient(160deg,#1e2342 0%,#0b0e1e 100%)",
            display:"flex", flexDirection:"column",
            alignItems:"center", justifyContent:"center",
            position:"relative", overflow:"hidden",
          }}>
            {/* faint watch watermark */}
            <div style={{ opacity:.07, transform:"scale(1.4)", position:"absolute" }}>
              <WatchIllustration size={280} />
            </div>
            {/* avatar circle */}
            <div style={{
              position:"absolute", width:120, height:120, borderRadius:"50%",
              background:"rgba(41,46,75,.85)", border:"3px solid #DFAA5E",
              display:"flex", alignItems:"center", justifyContent:"center",
              top:"50%", left:"50%", transform:"translate(-50%,-50%)",
            }}>
              <span style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"2.6rem",
                letterSpacing:".1em", color:"#DFAA5E" }}>DL</span>
            </div>
            {/* bottom fade */}
            <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"45%",
              background:"linear-gradient(to top,rgba(10,12,22,.92),transparent)" }} />
            {/* name bar */}
            <div style={{ position:"absolute", bottom:"1.8rem", left:"2rem" }}>
              <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"1.6rem",
                letterSpacing:".08em", color:"#F2EDE8" }}>Dr. David Laurent</div>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:".72rem",
                fontWeight:600, letterSpacing:".2em", textTransform:"uppercase",
                color:"#DFAA5E", marginTop:".2rem" }}>Founder & Chief Horologist</div>
            </div>
          </div>

          {/* floating credential badge */}
          <div style={{
            position:"absolute", top:"1.8rem", right:"-1.8rem",
            background:"#292E4B", padding:"1.2rem 1.4rem",
            boxShadow:"0 12px 40px rgba(0,0,0,.2)", minWidth:130,
          }}>
            <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"2rem",
              color:"#DFAA5E", letterSpacing:".04em", lineHeight:1 }}>30+</div>
            <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:".62rem",
              fontWeight:700, letterSpacing:".18em", textTransform:"uppercase",
              color:"#C8C4BE", marginTop:".3rem" }}>Years in<br/>Watchmaking</div>
          </div>
        </div>

        {/* bio */}
        <div style={{
          opacity: doctorRef.inView ? 1 : 0,
          transform: doctorRef.inView ? "translateX(0)" : "translateX(28px)",
          transition: "opacity .85s ease .15s, transform .85s ease .15s",
        }}>
          <Tag>About the Doctor</Tag>
          <div style={{ marginTop:".4rem" }}>
            <Heading>The Mind Behind<br />the Movement</Heading>
          </div>

          <p style={{ fontSize:"1rem", fontWeight:300, lineHeight:1.8,
            color:"#414042", marginTop:"1.8rem", marginBottom:"1.4rem" }}>
            Dr. David Laurent began his career at the Swiss Federal Institute of Technology,
            where his doctoral research on self-luminous materials laid the groundwork for what
            would become Luminox's signature tritium gas tube technology.
          </p>
          <p style={{ fontSize:"1rem", fontWeight:300, lineHeight:1.8,
            color:"#414042", marginBottom:"1.4rem" }}>
            With over three decades in precision horology, David has collaborated with U.S. Navy
            SEAL commanders, commercial aviation engineers, and deep-sea exploration teams —
            translating extreme operational demands into refined Swiss craft.
          </p>
          <p style={{ fontSize:"1rem", fontWeight:300, lineHeight:1.8,
            color:"#414042", marginBottom:"2.5rem" }}>
            His philosophy is simple:{" "}
            <em style={{ color:"#292E4B", fontStyle:"normal", fontWeight:500 }}>
              "A watch that fails its wearer in the dark has failed its only purpose."
            </em>{" "}
            That conviction still drives every design decision at Luminox today.
          </p>

          {/* credential pills */}
          <div style={{ display:"flex", flexWrap:"wrap", gap:".7rem" }}>
            {["ETH Zürich PhD","Swiss Master Horologist","SEAL Advisory Council","ISO 6425 Certified"].map(tag=>(
              <span key={tag} style={{
                fontFamily:"'Barlow Condensed',sans-serif", fontSize:".7rem",
                fontWeight:600, letterSpacing:".14em", textTransform:"uppercase",
                color:"#292E4B", background:"rgba(41,46,75,.06)",
                border:"1px solid rgba(41,46,75,.18)",
                padding:".45rem 1rem",
              }}>{tag}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 3 — MISSION & VISION  (off-white)
      ══════════════════════════════════════════════════════════════════ */}
      <section
        ref={mvRef.ref}
        style={{ padding:"7rem 8%", background:"#f8f7f5" }}
      >
        {/* centred header */}
        <div style={{
          textAlign:"center", marginBottom:"4.5rem",
          opacity: mvRef.inView ? 1 : 0,
          transform: mvRef.inView ? "translateY(0)" : "translateY(24px)",
          transition: "opacity .8s ease, transform .8s ease",
        }}>
          <Tag center>What Drives Us</Tag>
          <h2 style={{
            fontFamily:"'Bebas Neue',sans-serif",
            fontSize:"clamp(2.4rem,4vw,3.8rem)", lineHeight:1,
            letterSpacing:".06em", color:"#292E4B", margin:"0 auto .4rem",
          }}>Mission &amp; Vision</h2>
          <div style={{ width:52, height:3, background:"#DFAA5E", margin:".9rem auto 0" }} />
        </div>

        {/* Mission / Vision side-by-side */}
        <div className="g2" style={{
          display:"grid", gridTemplateColumns:"1fr 1fr",
          gap:"2px", background:"rgba(223,170,94,.12)", marginBottom:"3.5rem",
        }}>
          {/* MISSION */}
          <div className="mv-card" style={{
            background:"#ffffff", padding:"3.5rem 3rem",
            opacity: mvRef.inView ? 1 : 0,
            transform: mvRef.inView ? "translateY(0)" : "translateY(24px)",
            transition: "opacity .75s ease .1s, transform .75s ease .1s",
          }}>
            {/* gold top bar that grows on hover */}
            <div className="mv-bar" style={{
              position:"absolute", top:0, left:0, height:3,
              width:"100%", background:"#DFAA5E",
              transition:"width .4s ease",
            }} />
            {/* icon */}
            <div style={{
              width:52, height:52, background:"#292E4B",
              display:"flex", alignItems:"center", justifyContent:"center",
              marginBottom:"1.6rem",
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                stroke="#DFAA5E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
            <p style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:".78rem",
              fontWeight:700, letterSpacing:".28em", textTransform:"uppercase",
              color:"#DFAA5E", marginBottom:".5rem" }}>Mission</p>
            <h3 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"1.75rem",
              letterSpacing:".06em", color:"#292E4B", lineHeight:1.05,
              marginBottom:"1.2rem" }}>
              Engineer Timepieces That Perform When Everything Else Fails
            </h3>
            <p style={{ fontSize:".93rem", fontWeight:300, lineHeight:1.78, color:"#414042" }}>
              We build exclusively for the extremes. Every Luminox watch undergoes the same
              rigorous testing demanded by military operators — Navy SEALs, USAF pilots, and
              mountain rescue units — before it ever reaches a civilian wrist. Our mission is
              non-negotiable:{" "}
              <strong style={{ fontWeight:500, color:"#292E4B" }}>
                always visible, always accurate, always ready.
              </strong>
            </p>
            <ul style={{ listStyle:"none", margin:"1.8rem 0 0", padding:0,
              display:"flex", flexDirection:"column", gap:".8rem" }}>
              {[
                "Self-powered tritium illumination — no charging required",
                "Swiss-certified movement accuracy in every model",
                "Issued to special operations forces across 50+ nations",
              ].map(pt=>(
                <li key={pt} style={{ display:"flex", gap:".75rem", alignItems:"flex-start",
                  fontSize:".87rem", fontWeight:300, color:"#414042", lineHeight:1.6 }}>
                  <span style={{ width:6, height:6, borderRadius:"50%",
                    background:"#DFAA5E", flexShrink:0, marginTop:".45rem" }} />
                  {pt}
                </li>
              ))}
            </ul>
          </div>

          {/* VISION */}
          <div className="mv-card" style={{
            background:"#ffffff", padding:"3.5rem 3rem",
            opacity: mvRef.inView ? 1 : 0,
            transform: mvRef.inView ? "translateY(0)" : "translateY(24px)",
            transition: "opacity .75s ease .22s, transform .75s ease .22s",
          }}>
            <div className="mv-bar" style={{
              position:"absolute", top:0, left:0, height:3,
              width:"100%", background:"#292E4B",
              transition:"width .4s ease",
            }} />
            <div style={{
              width:52, height:52, background:"#292E4B",
              display:"flex", alignItems:"center", justifyContent:"center",
              marginBottom:"1.6rem",
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                stroke="#DFAA5E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            </div>
            <p style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:".78rem",
              fontWeight:700, letterSpacing:".28em", textTransform:"uppercase",
              color:"#DFAA5E", marginBottom:".5rem" }}>Vision</p>
            <h3 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"1.75rem",
              letterSpacing:".06em", color:"#292E4B", lineHeight:1.05,
              marginBottom:"1.2rem" }}>
              To Define the Global Standard for Professional Timepieces
            </h3>
            <p style={{ fontSize:".93rem", fontWeight:300, lineHeight:1.78, color:"#414042" }}>
              We envision a world where every professional who relies on a watch — in the
              ocean, at altitude, or in the dark — reaches for Luminox without question. Not
              because of marketing, but because of{" "}
              <strong style={{ fontWeight:500, color:"#292E4B" }}>
                proven, uncompromising performance
              </strong>{" "}
              earned in the field over three decades.
            </p>
            <ul style={{ listStyle:"none", margin:"1.8rem 0 0", padding:0,
              display:"flex", flexDirection:"column", gap:".8rem" }}>
              {[
                "The benchmark watch for all professional environments",
                "Sustainable Swiss manufacturing by 2030",
                "Next-generation materials pushing beyond current limits",
              ].map(pt=>(
                <li key={pt} style={{ display:"flex", gap:".75rem", alignItems:"flex-start",
                  fontSize:".87rem", fontWeight:300, color:"#414042", lineHeight:1.6 }}>
                  <span style={{ width:6, height:6, borderRadius:"50%",
                    background:"#292E4B", flexShrink:0, marginTop:".45rem" }} />
                  {pt}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 4-value strip */}
        <div className="g4" style={{
          display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"1.5rem",
        }}>
          {[
            { icon:"◉", title:"Always Visible",  desc:"25-year tritium tubes. Zero-effort illumination." },
            { icon:"◈", title:"Swiss Precision",  desc:"Every movement certified to Swiss chronometric standards." },
            { icon:"⬡", title:"Built to Endure",  desc:"Carbon compound cases tested beyond MIL-SPEC requirements." },
            { icon:"✦", title:"Field Proven",     desc:"Trusted by SEALs, pilots, and rescue teams worldwide." },
          ].map((v,i)=>(
            <div key={v.title} style={{
              background:"#ffffff", padding:"2rem 1.6rem",
              border:"1px solid rgba(41,46,75,.08)",
              borderTop:"3px solid #DFAA5E",
              opacity: mvRef.inView ? 1 : 0,
              transform: mvRef.inView ? "translateY(0)" : "translateY(20px)",
              transition:`opacity .7s ease ${.3+i*.1}s, transform .7s ease ${.3+i*.1}s`,
            }}>
              <div style={{ fontSize:"1.4rem", color:"#DFAA5E", marginBottom:".9rem" }}>{v.icon}</div>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:".88rem",
                fontWeight:700, letterSpacing:".12em", textTransform:"uppercase",
                color:"#292E4B", marginBottom:".5rem" }}>{v.title}</div>
              <div style={{ fontSize:".84rem", fontWeight:300, lineHeight:1.65,
                color:"#414042" }}>{v.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════
          SECTION 4 — CTA  (white)
      ══════════════════════════════════════════════════════════════════ */}
      <section
        ref={ctaRef.ref}
        className="g2"
        style={{
          display:"grid", gridTemplateColumns:"1fr 1fr",
          alignItems:"center", gap:"5rem",
          padding:"6rem 8%", background:"#ffffff",
          borderTop:"1px solid rgba(41,46,75,.1)",
          position:"relative", overflow:"hidden",
        }}
      >
        {/* gold left border accent */}
        <div style={{ position:"absolute", top:0, left:0, width:4, height:"100%",
          background:"linear-gradient(to bottom,#DFAA5E,rgba(223,170,94,.1))" }} />

        {/* heading side */}
        <div style={{
          opacity: ctaRef.inView ? 1 : 0,
          transform: ctaRef.inView ? "translateY(0)" : "translateY(22px)",
          transition: "opacity .85s ease, transform .85s ease",
        }}>
          <Tag>Ready to Equip</Tag>
          <h2 style={{
            fontFamily:"'Bebas Neue',sans-serif",
            fontSize:"clamp(2.4rem,4.5vw,4rem)", lineHeight:1,
            letterSpacing:".06em", color:"#292E4B",
            marginTop:".4rem", marginBottom:"1.2rem",
          }}>
            FIND YOUR<br /><span style={{ color:"#DFAA5E" }}>LUMINOX</span>
          </h2>
          <p style={{ fontSize:".97rem", fontWeight:300, lineHeight:1.78,
            color:"#414042", maxWidth:440 }}>
            Whether you're a professional operator or a passionate collector, there is a
            Luminox built to your standard. Explore the full lineup and discover the watch
            that will never leave you in the dark.
          </p>
        </div>

        {/* buttons side */}
        <div className="cta-r" style={{
          display:"flex", flexDirection:"column", gap:"1rem",
          opacity: ctaRef.inView ? 1 : 0,
          transform: ctaRef.inView ? "translateX(0)" : "translateX(24px)",
          transition: "opacity .85s ease .2s, transform .85s ease .2s",
        }}>
          {[
            { label:"Shop All Collections",    primary:true  },
            { label:"Find a Dealer Near You",   primary:false },
            { label:"Download Brand Catalogue", primary:false },
          ].map(btn=>(
            <button
              key={btn.label}
              className={btn.primary ? "btn-gold" : "btn-navy"}
              style={{
                display:"flex", alignItems:"center",
                justifyContent:"space-between",
                padding:"1.05rem 1.8rem", width:"100%", textAlign:"left",
              }}
            >
              {btn.label}
              <span style={{ opacity:.6, marginLeft:"1rem" }}>→</span>
            </button>
          ))}

          {/* social proof strip */}
          <div style={{
            display:"flex", alignItems:"center", gap:"1.2rem",
            paddingTop:"1.2rem", marginTop:".4rem",
            borderTop:"1px solid rgba(41,46,75,.1)",
          }}>
            <div style={{ display:"flex" }}>
              {["TM","SK","JR","MW"].map((init,i)=>(
                <div key={init} style={{
                  width:34, height:34, borderRadius:"50%",
                  background:"#292E4B", border:"2px solid #fff",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  marginLeft: i===0 ? 0 : -10, zIndex:4-i,
                  fontFamily:"'Bebas Neue',sans-serif",
                  fontSize:".7rem", letterSpacing:".06em", color:"#DFAA5E",
                }}>{init}</div>
              ))}
            </div>
            <div>
              <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:".8rem",
                fontWeight:700, letterSpacing:".1em", color:"#292E4B" }}>
                Trusted by 2M+ professionals
              </div>
              <div style={{ fontSize:".75rem", fontWeight:300, color:"#414042" }}>
                across 50+ countries worldwide
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}