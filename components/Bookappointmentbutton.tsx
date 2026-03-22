"use client";

import { useState, useEffect } from "react";

// ─── Update this with your WhatsApp number (country code + number, no +) ───
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919876543210";

interface FormData {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
}

const initialForm: FormData = {
  name: "",
  phone: "",
  email: "",
  service: "",
  message: "",
};

const serviceLabels: Record<string, string> = {
  laser: "Laser Hair Removal",
  facial: "Hydra Facial",
  botox: "Botox Treatment",
  peel: "Chemical Peel",
  mnrf: "MNRF Therapy",
  microneedling: "Scalp Micro-Needling",
  fillers: "Dermal Fillers",
  consultation: "General Consultation",
};

export default function BookAppointmentButton() {
  const [open, setOpen]           = useState(false);
  const [form, setForm]           = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState<string | null>(null);

  // Lock body scroll when modal open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
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

      if (!res.ok) {
        throw new Error(json.error || "Failed to submit. Please try again.");
      }

      // ── 2. Open WhatsApp with pre-filled message ──
      const serviceLabel = serviceLabels[form.service] || form.service;
      const waMessage = encodeURIComponent(
        `Hi Luminox! I'd like to book an appointment.\n\n` +
        `👤 Name: ${form.name}\n` +
        `📞 Phone: ${form.phone}\n` +
        `💉 Treatment: ${serviceLabel}\n` +
        `${form.email ? `✉️ Email: ${form.email}\n` : ""}` +
        `${form.message ? `💬 Message: ${form.message}` : ""}`
      );
      const waURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${waMessage}`;

      // Open WhatsApp in new tab
      window.open(waURL, "_blank", "noopener,noreferrer");

      // ── 3. Show success ──
      setSubmitted(true);

    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setSubmitted(false);
      setError(null);
      setForm(initialForm);
    }, 300);
  };

  return (
    <>
      {/* ─── Sticky Side Button ─── */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Book an Appointment"
        style={{
          position: "fixed",
          right: 0,
          top: "50%",
          transform: "translateY(-50%) rotate(180deg)",
          writingMode: "vertical-rl",
          textOrientation: "mixed",
          zIndex: 9998,
          background: "linear-gradient(160deg, #292E4B 0%, #5B326A 100%)",
          color: "#fff",
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          padding: "20px 11px",
          borderRadius: "0 8px 8px 0",
          border: "none",
          cursor: "pointer",
          boxShadow: "-4px 0 20px rgba(41,46,75,0.35)",
          transition: "padding 0.2s ease, box-shadow 0.2s ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.paddingTop = "26px";
          (e.currentTarget as HTMLButtonElement).style.boxShadow = "-6px 0 28px rgba(41,46,75,0.5)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.paddingTop = "20px";
          (e.currentTarget as HTMLButtonElement).style.boxShadow = "-4px 0 20px rgba(41,46,75,0.35)";
        }}
      >
        Book Appointment
      </button>

      {/* ─── Backdrop ─── */}
      <div
        onClick={handleClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(10,18,40,0.55)",
          backdropFilter: "blur(4px)",
          zIndex: 9999,
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.25s ease",
        }}
      />

      {/* ─── Modal ─── */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Book an Appointment"
        style={{
          position: "fixed",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10000,
          padding: "16px",
          pointerEvents: open ? "auto" : "none",
        }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            background: "#fff",
            borderRadius: 20,
            width: "100%",
            maxWidth: 520,
            maxHeight: "90vh",
            overflowY: "auto",
            boxShadow: "0 32px 80px rgba(10,18,40,0.28)",
            transform: open ? "translateY(0) scale(1)" : "translateY(24px) scale(0.97)",
            opacity: open ? 1 : 0,
            transition: "transform 0.3s cubic-bezier(0.34,1.3,0.64,1), opacity 0.25s ease",
          }}
        >
          {/* ── Modal Header ── */}
          <div
            style={{
              background: "linear-gradient(135deg, #292E4B 0%, #5B326A 60%, #7B3F80 100%)",
              borderRadius: "20px 20px 0 0",
              padding: "28px 28px 24px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Decorative circles */}
            <div style={{ position: "absolute", right: -30, top: -30, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
            <div style={{ position: "absolute", right: 40, bottom: -20, width: 70, height: 70, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />

            {/* Close button */}
            <button
              onClick={handleClose}
              aria-label="Close"
              style={{
                position: "absolute", top: 16, right: 16,
                background: "rgba(255,255,255,0.15)", border: "none",
                color: "#fff", width: 32, height: 32, borderRadius: "50%",
                fontSize: 18, lineHeight: 1, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.28)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.15)")}
            >
              ×
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: "rgba(255,255,255,0.15)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 22,
              }}>
                🩺
              </div>
              <div>
                <h2 style={{ color: "#fff", fontSize: 20, fontWeight: 700, margin: 0, letterSpacing: "-0.3px" }}>
                  Book an Appointment
                </h2>
                <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 13, margin: "3px 0 0" }}>
                  We'll call you back &amp; send a WhatsApp confirmation
                </p>
              </div>
            </div>

            {/* Submission method badges */}
            <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
              <span style={{
                background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.85)",
                fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 20,
                display: "flex", alignItems: "center", gap: 4,
              }}>
                ✉️ Email notification
              </span>
              <span style={{
                background: "rgba(37,211,102,0.2)", color: "#6effa0",
                fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 20,
                display: "flex", alignItems: "center", gap: 4,
              }}>
                💬 WhatsApp message
              </span>
            </div>
          </div>

          {/* ── Modal Body ── */}
          <div style={{ padding: "24px 28px 28px" }}>
            {submitted ? (
              // ── Success State ──
              <div style={{
                textAlign: "center", padding: "32px 16px",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
              }}>
                <div style={{
                  width: 72, height: 72, borderRadius: "50%",
                  background: "linear-gradient(135deg, #292E4B, #5B326A)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 34, marginBottom: 8,
                }}>
                  ✅
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: "#292E4B", margin: 0 }}>
                  Request Submitted!
                </h3>
                <p style={{ color: "#6b7280", fontSize: 14, lineHeight: 1.6, maxWidth: 320, margin: 0 }}>
                  Thank you, <strong>{form.name || "there"}</strong>! We've received your request.<br />
                  📧 A confirmation email has been sent to our team.<br />
                  💬 WhatsApp has opened with your details.
                </p>
                <div style={{ display: "flex", gap: 10, marginTop: 16, flexWrap: "wrap", justifyContent: "center" }}>
                  <button
                    onClick={handleClose}
                    style={{
                      background: "linear-gradient(135deg, #292E4B, #5B326A)",
                      color: "#fff", border: "none", borderRadius: 12,
                      padding: "12px 28px", fontSize: 14, fontWeight: 700,
                      cursor: "pointer", letterSpacing: "0.04em",
                    }}
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              // ── Form ──
              <form
                onSubmit={handleSubmit}
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
              >
                {/* Full Name */}
                <Field label="Full Name">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your full name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#5B326A";
                      e.currentTarget.style.boxShadow = "0 0 0 3px rgba(91,50,106,0.10)";
                      e.currentTarget.style.background = "#fff";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "#e5e7eb";
                      e.currentTarget.style.boxShadow = "none";
                      e.currentTarget.style.background = "#f9fafb";
                    }}
                  />
                </Field>

                {/* Phone + Email */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12 }}>
                  <Field label="Phone Number *">
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      style={inputStyle}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = "#5B326A";
                        e.currentTarget.style.boxShadow = "0 0 0 3px rgba(91,50,106,0.10)";
                        e.currentTarget.style.background = "#fff";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = "#e5e7eb";
                        e.currentTarget.style.boxShadow = "none";
                        e.currentTarget.style.background = "#f9fafb";
                      }}
                    />
                  </Field>
                  <Field label="Email (optional)">
                    <input
                      type="email"
                      name="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={handleChange}
                      style={inputStyle}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = "#5B326A";
                        e.currentTarget.style.boxShadow = "0 0 0 3px rgba(91,50,106,0.10)";
                        e.currentTarget.style.background = "#fff";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = "#e5e7eb";
                        e.currentTarget.style.boxShadow = "none";
                        e.currentTarget.style.background = "#f9fafb";
                      }}
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
                      style={{ ...inputStyle, appearance: "none", paddingRight: 40 }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = "#5B326A";
                        e.currentTarget.style.boxShadow = "0 0 0 3px rgba(91,50,106,0.10)";
                        e.currentTarget.style.background = "#fff";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = "#e5e7eb";
                        e.currentTarget.style.boxShadow = "none";
                        e.currentTarget.style.background = "#f9fafb";
                      }}
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
                      color: "#9ca3af", fontSize: 11,
                    }}>▼</span>
                  </div>
                </Field>

                {/* Error message */}
                {error && (
                  <div style={{
                    background: "#fff1f1", border: "1px solid #fca5a5",
                    borderRadius: 10, padding: "10px 14px",
                    fontSize: 13, color: "#dc2626", display: "flex",
                    alignItems: "center", gap: 8,
                  }}>
                    ⚠️ {error}
                  </div>
                )}

                {/* Divider */}
                <div style={{ height: 1, background: "linear-gradient(90deg,transparent,#e5e7eb,transparent)", margin: "2px 0" }} />

                {/* Info note */}
                <div style={{
                  background: "#f0fdf4", border: "1px solid #bbf7d0",
                  borderRadius: 10, padding: "10px 14px",
                  fontSize: 12, color: "#166534",
                  display: "flex", alignItems: "flex-start", gap: 8,
                }}>
                  <span style={{ fontSize: 14, flexShrink: 0 }}>💡</span>
                  <span>
                    Submitting this form will <strong>send an email</strong> to our clinic team
                    and <strong>open WhatsApp</strong> with your details pre-filled for instant confirmation.
                  </span>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    background: loading
                      ? "#9ca3af"
                      : "linear-gradient(135deg, #292E4B 0%, #5B326A 100%)",
                    color: "#fff", border: "none", borderRadius: 14,
                    padding: "15px 20px", fontSize: 14, fontWeight: 700,
                    letterSpacing: "0.06em", textTransform: "uppercase",
                    cursor: loading ? "not-allowed" : "pointer",
                    transition: "transform 0.15s, box-shadow 0.2s",
                    boxShadow: loading ? "none" : "0 8px 24px rgba(41,46,75,0.3)",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)";
                      (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 12px 32px rgba(41,46,75,0.4)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 24px rgba(41,46,75,0.3)";
                  }}
                >
                  {loading ? (
                    <><Spinner /> Submitting...</>
                  ) : (
                    <>📞 Request Appointment</>
                  )}
                </button>

                <p style={{ textAlign: "center", fontSize: 11, color: "#9ca3af", margin: 0 }}>
                  🔒 Your information is 100% secure and never shared.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

// ─── Helper: Field wrapper ───────────────────────────────
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={{
        display: "block", fontSize: 11, fontWeight: 700,
        color: "#292E4B", textTransform: "uppercase",
        letterSpacing: "0.07em", marginBottom: 6,
      }}>
        {label}
      </label>
      {children}
    </div>
  );
}

// ─── Helper: Spinner ─────────────────────────────────────
function Spinner() {
  return (
    <>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <span style={{
        display: "inline-block", width: 16, height: 16,
        border: "2px solid rgba(255,255,255,0.3)",
        borderTopColor: "#fff", borderRadius: "50%",
        animation: "spin 0.7s linear infinite",
      }} />
    </>
  );
}

// ─── Shared input style ──────────────────────────────────
const inputStyle: React.CSSProperties = {
  width: "100%",
  border: "1.5px solid #e5e7eb",
  borderRadius: 12,
  padding: "12px 14px",
  fontSize: 14,
  color: "#1f2937",
  background: "#f9fafb",
  outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s, background 0.2s",
  boxSizing: "border-box",
};
