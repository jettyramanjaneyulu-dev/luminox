"use client";

import { useState } from "react";

// ─── Update this with your WhatsApp number (country code + number, no +) ───
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210";

interface FormData {
  name: string;
  phone: string;
  email: string;
  service: string;
}

const initialForm: FormData = {
  name: "",
  phone: "",
  email: "",
  service: "",
};

const serviceLabels: Record<string, string> = {
  fraxel_dual: "Fraxel DUAL",
  fraxel_co2: "Fraxel CO₂",
  clear_brilliant: "Clear + Brilliant®",
  vbeam: "Vbeam Perfecta",
  age_spots: "Laser for Age Spots",
  redness: "Laser for Redness",
  hair_removal: "Laser Hair Removal",
  tattoo: "Laser Tattoo Removal",
  botox_jaw: "BOTOX® Jaw Reduction",
  botox_cosmetic: "BOTOX® Cosmetic",
  nefertiti: "Nefertiti Lift",
  botox_sweat: "BOTOX® Hyperhidrosis",
  botox_migraine: "BOTOX® Migraines",
  botox_tmj: "BOTOX® TMJ",
  radiesse: "Radiesse®",
  juvederm: "JUVÉDERM®",
  belotero: "Belotero®",
  chemical_peel: "Chemical Peel",
  hydrafacial: "HydraFacial MD",
  sclerotherapy: "Sclerotherapy",
  microneedling: "Micro-Needling",
  prp: "PRP Therapy",
  acne: "Acne Treatment",
  rosacea: "Rosacea",
  eczema: "Eczema",
  psoriasis: "Psoriasis",
  skin_cancer: "Skin Cancer Screening",
  mohs: "Mohs Surgery",
  consultation: "General Consultation",
};

const inputBase: React.CSSProperties = {
  width: "100%",
  border: "1.5px solid #e5e7eb",
  borderRadius: 14,
  padding: "13px 16px",
  fontSize: 14,
  color: "#1f2937",
  background: "#f9fafb",
  outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s, background 0.2s",
  boxSizing: "border-box",
  fontFamily: "inherit",
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{
        fontSize: 11, fontWeight: 700, color: "#292E4B",
        textTransform: "uppercase", letterSpacing: "0.08em",
      }}>
        {label}
      </label>
      {children}
    </div>
  );
}

function Spinner() {
  return (
    <>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <span style={{
        display: "inline-block", width: 16, height: 16,
        border: "2px solid rgba(255,255,255,0.35)",
        borderTopColor: "#fff", borderRadius: "50%",
        animation: "spin 0.7s linear infinite",
      }} />
    </>
  );
}

function focusInput(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) {
  e.currentTarget.style.borderColor = "#5B326A";
  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(91,50,106,0.10)";
  e.currentTarget.style.background = "#fff";
}
function blurInput(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) {
  e.currentTarget.style.borderColor = "#e5e7eb";
  e.currentTarget.style.boxShadow = "none";
  e.currentTarget.style.background = "#f9fafb";
}

export default function Appointment() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setError(null);
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // ── 1. Send Email via API route ──
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to submit. Please try again.");

      // ── 2. Open WhatsApp with pre-filled message ──
      const serviceLabel = serviceLabels[form.service] || form.service;
      const waMessage = encodeURIComponent(
        `Hi Luminox! I'd like to book an appointment.\n\n` +
        `👤 Name: ${form.name}\n` +
        `📞 Phone: ${form.phone}\n` +
        `💉 Treatment: ${serviceLabel}\n` +
        `${form.email ? `✉️ Email: ${form.email}\n` : ""}`
      );
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`, "_blank", "noopener,noreferrer");

      // ── 3. Show success ──
      setSubmitted(true);

    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setError(null);
    setForm(initialForm);
  };

  return (
    <>
      <style>{`
        .appt-parallax {
          background-image: url('https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2000');
          background-attachment: fixed;
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .appt-left  { animation: fadeUp 0.65s cubic-bezier(0.22,1,0.36,1) both; }
        .appt-right { animation: fadeUp 0.65s cubic-bezier(0.22,1,0.36,1) 0.12s both; }
        .appt-stat  {
          transition: transform 0.2s, background 0.2s;
        }
        .appt-stat:hover {
          transform: translateY(-3px);
          background: rgba(255,255,255,0.18) !important;
        }
        .appt-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 14px 36px rgba(41,46,75,0.42) !important;
        }
        .appt-submit:active:not(:disabled) {
          transform: translateY(0);
        }
        @media (max-width: 900px) {
          .appt-grid { grid-template-columns: 1fr !important; }
          .appt-left  { text-align: center; align-items: center !important; }
          .appt-stats { justify-content: center !important; }
          .appt-parallax { background-attachment: scroll !important; }
        }
        @media (max-width: 540px) {
          .appt-card { padding: 28px 18px 32px !important; border-radius: 20px !important; }
          .appt-card-header { padding: 22px 18px 18px !important; }
          .appt-two-col { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <section
        className="appt-parallax"
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px 24px",
          overflow: "hidden",
        }}
      >
        {/* Overlay */}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(135deg, rgba(41,46,75,0.72) 0%, rgba(91,50,106,0.55) 100%)",
          zIndex: 0,
        }} />

        {/* Decorative blobs */}
        <div style={{
          position: "absolute", top: -120, left: -120, width: 480, height: 480,
          borderRadius: "50%", background: "rgba(91,50,106,0.18)", zIndex: 0,
          filter: "blur(60px)",
        }} />
        <div style={{
          position: "absolute", bottom: -80, right: -80, width: 340, height: 340,
          borderRadius: "50%", background: "rgba(41,46,75,0.22)", zIndex: 0,
          filter: "blur(50px)",
        }} />

        {/* Main grid */}
        <div
          className="appt-grid"
          style={{
            position: "relative", zIndex: 1,
            maxWidth: 1100, width: "100%",
            display: "grid", gridTemplateColumns: "1fr 1fr",
            gap: 56, alignItems: "center",
          }}
        >
          {/* ── LEFT: Hero text ── */}
          <div
            className="appt-left"
            style={{ display: "flex", flexDirection: "column", gap: 20, color: "#fff" }}
          >
            {/* Pill badge */}
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 7,
              background: "rgba(255,255,255,0.12)",
              border: "1px solid rgba(255,255,255,0.2)",
              backdropFilter: "blur(8px)",
              borderRadius: 40, padding: "6px 16px",
              fontSize: 12, fontWeight: 600, letterSpacing: "0.06em",
              color: "rgba(255,255,255,0.88)",
              width: "fit-content",
            }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#6effa0", flexShrink: 0, boxShadow: "0 0 6px #6effa0" }} />
              Expert Dermatology Clinic
            </span>

            <h1 style={{
              fontSize: "clamp(34px, 5vw, 58px)",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-1.5px",
              margin: 0,
              fontFamily: "Georgia, 'Times New Roman', serif",
            }}>
              Premium Care<br />
              <span style={{
                background: "linear-gradient(90deg, #e9c9ff, #a78bfa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                Tailored to You.
              </span>
            </h1>

            <p style={{
              fontSize: 16, color: "rgba(255,255,255,0.75)",
              lineHeight: 1.7, maxWidth: 400, margin: 0,
            }}>
              Experience world-class skin treatments in a relaxing environment.
              Book your consultation today and meet our expert dermatologists.
            </p>

            {/* Stats */}
            <div className="appt-stats" style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 8 }}>
              {[
                { value: "15k+", label: "Happy Patients" },
                { value: "12+",  label: "Expert Doctors" },
                { value: "98%",  label: "Satisfaction" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="appt-stat"
                  style={{
                    background: "rgba(255,255,255,0.10)",
                    border: "1px solid rgba(255,255,255,0.18)",
                    backdropFilter: "blur(8px)",
                    borderRadius: 14, padding: "14px 20px",
                    cursor: "default",
                  }}
                >
                  <p style={{ fontSize: 26, fontWeight: 800, margin: 0, letterSpacing: "-0.5px" }}>{s.value}</p>
                  <p style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.6)", margin: "3px 0 0" }}>{s.label}</p>
                </div>
              ))}
            </div>

            {/* Trust badges */}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 4 }}>
              {["✉️ Email Notification", "💬 WhatsApp Confirmation", "🔒 100% Secure"].map((b) => (
                <span key={b} style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: 30, padding: "5px 12px",
                  fontSize: 11, color: "rgba(255,255,255,0.78)",
                  fontWeight: 500,
                }}>{b}</span>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Form card ── */}
          <div
            className="appt-right appt-card"
            style={{
              background: "#fff",
              borderRadius: 28,
              overflow: "hidden",
              boxShadow: "0 40px 100px rgba(10,18,40,0.35)",
            }}
          >
            {/* Card header */}
            <div
              className="appt-card-header"
              style={{
                background: "linear-gradient(135deg, #292E4B 0%, #5B326A 60%, #7B3F80 100%)",
                padding: "26px 32px 22px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Decorative circles */}
              <div style={{ position: "absolute", right: -24, top: -24, width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
              <div style={{ position: "absolute", right: 50, bottom: -18, width: 60, height: 60, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />

              <div style={{ display: "flex", alignItems: "center", gap: 12, position: "relative" }}>
                <div style={{
                  width: 42, height: 42, borderRadius: 12,
                  background: "rgba(255,255,255,0.15)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 20,
                }}>🩺</div>
                <div>
                  <h2 style={{ color: "#fff", fontSize: 19, fontWeight: 700, margin: 0, letterSpacing: "-0.3px" }}>
                    Book an Appointment
                  </h2>
                  <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, margin: "3px 0 0" }}>
                    We'll call back &amp; send WhatsApp confirmation
                  </p>
                </div>
              </div>
            </div>

            {/* Card body */}
            <div style={{ padding: "28px 32px 32px" }}>
              {submitted ? (
                // ── Success ──
                <div style={{
                  textAlign: "center", padding: "28px 12px",
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
                }}>
                  <div style={{
                    width: 68, height: 68, borderRadius: "50%",
                    background: "linear-gradient(135deg, #292E4B, #5B326A)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 32, marginBottom: 6,
                  }}>✅</div>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: "#292E4B", margin: 0 }}>
                    Request Submitted!
                  </h3>
                  <p style={{ color: "#6b7280", fontSize: 14, lineHeight: 1.65, maxWidth: 300, margin: 0 }}>
                    Thank you, <strong>{form.name || "there"}</strong>!<br />
                    📧 Confirmation email sent to our team.<br />
                    💬 WhatsApp opened with your details.
                  </p>
                  <button
                    onClick={handleReset}
                    style={{
                      marginTop: 12,
                      background: "linear-gradient(135deg, #292E4B, #5B326A)",
                      color: "#fff", border: "none", borderRadius: 12,
                      padding: "12px 32px", fontSize: 14, fontWeight: 700,
                      cursor: "pointer", letterSpacing: "0.04em",
                    }}
                  >
                    Book Another
                  </button>
                </div>
              ) : (
                // ── Form ──
                <form
                  onSubmit={handleSubmit}
                  style={{ display: "flex", flexDirection: "column", gap: 16 }}
                >
                  {/* Full Name */}
                  <Field label="Full Name *">
                    <input
                      type="text"
                      name="name"
                      placeholder="Your full name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      style={inputBase}
                      onFocus={focusInput}
                      onBlur={blurInput}
                    />
                  </Field>

                  {/* Phone + Email */}
                  <div
                    className="appt-two-col"
                    style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
                  >
                    <Field label="Phone *">
                      <input
                        type="tel"
                        name="phone"
                        placeholder="+91 98765 43210"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        style={inputBase}
                        onFocus={focusInput}
                        onBlur={blurInput}
                      />
                    </Field>
                    <Field label="Email (optional)">
                      <input
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={handleChange}
                        style={inputBase}
                        onFocus={focusInput}
                        onBlur={blurInput}
                      />
                    </Field>
                  </div>

                  {/* Service */}
                  <Field label="Select Treatment *">
                    <div style={{ position: "relative" }}>
                      <select
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        required
                        style={{ ...inputBase, appearance: "none", paddingRight: 40, cursor: "pointer" }}
                        onFocus={focusInput}
                        onBlur={blurInput}
                      >
                        <option value="" disabled>Choose a treatment...</option>
                        <optgroup label="Laser Treatments">
                          <option value="fraxel_dual">Fraxel DUAL</option>
                          <option value="fraxel_co2">Fraxel CO₂</option>
                          <option value="clear_brilliant">Clear + Brilliant®</option>
                          <option value="vbeam">Vbeam Perfecta</option>
                          <option value="age_spots">Laser for Age Spots</option>
                          <option value="redness">Laser for Redness</option>
                          <option value="hair_removal">Laser Hair Removal</option>
                          <option value="tattoo">Laser Tattoo Removal</option>
                        </optgroup>
                        <optgroup label="Injectables">
                          <option value="botox_jaw">BOTOX® Jaw Reduction</option>
                          <option value="botox_cosmetic">BOTOX® Cosmetic</option>
                          <option value="nefertiti">Nefertiti Lift</option>
                          <option value="botox_sweat">BOTOX® Hyperhidrosis</option>
                          <option value="botox_migraine">BOTOX® Migraines</option>
                          <option value="botox_tmj">BOTOX® TMJ</option>
                          <option value="radiesse">Radiesse®</option>
                          <option value="juvederm">JUVÉDERM®</option>
                          <option value="belotero">Belotero®</option>
                        </optgroup>
                        <optgroup label="Aesthetics">
                          <option value="chemical_peel">Chemical Peel</option>
                          <option value="hydrafacial">HydraFacial MD</option>
                          <option value="sclerotherapy">Sclerotherapy</option>
                          <option value="microneedling">Micro-Needling</option>
                          <option value="prp">PRP Therapy</option>
                        </optgroup>
                        <optgroup label="Medical Dermatology">
                          <option value="acne">Acne Treatment</option>
                          <option value="rosacea">Rosacea</option>
                          <option value="eczema">Eczema</option>
                          <option value="psoriasis">Psoriasis</option>
                          <option value="skin_cancer">Skin Cancer Screening</option>
                          <option value="mohs">Mohs Surgery</option>
                        </optgroup>
                        <option value="consultation">General Consultation</option>
                      </select>
                      <span style={{
                        position: "absolute", right: 14, top: "50%",
                        transform: "translateY(-50%)", pointerEvents: "none",
                        color: "#9ca3af", fontSize: 10,
                      }}>▼</span>
                    </div>
                  </Field>

                  {/* Error */}
                  {error && (
                    <div style={{
                      background: "#fff1f1", border: "1px solid #fca5a5",
                      borderRadius: 10, padding: "10px 14px",
                      fontSize: 13, color: "#dc2626",
                      display: "flex", alignItems: "center", gap: 8,
                    }}>
                      ⚠️ {error}
                    </div>
                  )}

                  {/* Info note */}
                  <div style={{
                    background: "#f0fdf4", border: "1px solid #bbf7d0",
                    borderRadius: 10, padding: "10px 14px",
                    fontSize: 12, color: "#166534",
                    display: "flex", alignItems: "flex-start", gap: 8,
                  }}>
                    <span style={{ fontSize: 14, flexShrink: 0 }}>💡</span>
                    <span>
                      Submitting will <strong>email our clinic team</strong> and{" "}
                      <strong>open WhatsApp</strong> with your details pre-filled.
                    </span>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="appt-submit"
                    style={{
                      background: loading
                        ? "#9ca3af"
                        : "linear-gradient(135deg, #292E4B 0%, #5B326A 100%)",
                      color: "#fff", border: "none", borderRadius: 14,
                      padding: "15px 20px", fontSize: 14, fontWeight: 700,
                      letterSpacing: "0.06em", textTransform: "uppercase",
                      cursor: loading ? "not-allowed" : "pointer",
                      transition: "transform 0.18s, box-shadow 0.2s",
                      boxShadow: loading ? "none" : "0 8px 24px rgba(41,46,75,0.3)",
                      display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                      width: "100%",
                    }}
                  >
                    {loading ? <><Spinner /> Submitting...</> : <>📞 Request Appointment</>}
                  </button>

                  <p style={{ textAlign: "center", fontSize: 11, color: "#9ca3af", margin: 0 }}>
                    🔒 Your information is 100% secure and never shared.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}