"use client";

import { useState, useEffect } from "react";

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

export default function BookAppointmentButton() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call — replace with your actual submission logic
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    setSubmitted(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setSubmitted(false);
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
          background: "linear-gradient(160deg, #1a3a6b 0%, #0e2147 100%)",
          color: "#fff",
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          padding: "20px 11px",
          borderRadius: "0 8px 8px 0",
          border: "none",
          cursor: "pointer",
          boxShadow: "-4px 0 20px rgba(14,33,71,0.35)",
          transition: "padding 0.2s ease, box-shadow 0.2s ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.paddingTop = "26px";
          (e.currentTarget as HTMLButtonElement).style.boxShadow =
            "-6px 0 28px rgba(14,33,71,0.5)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.paddingTop = "20px";
          (e.currentTarget as HTMLButtonElement).style.boxShadow =
            "-4px 0 20px rgba(14,33,71,0.35)";
        }}
      >
        📅 Book Appointment
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
          {/* Header */}
          <div
            style={{
              background: "linear-gradient(135deg, #0e2147 0%, #1a3a6b 60%, #1e4d9b 100%)",
              borderRadius: "20px 20px 0 0",
              padding: "28px 28px 24px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Decorative circles */}
            <div
              style={{
                position: "absolute",
                right: -30,
                top: -30,
                width: 120,
                height: 120,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.06)",
              }}
            />
            <div
              style={{
                position: "absolute",
                right: 40,
                bottom: -20,
                width: 70,
                height: 70,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.04)",
              }}
            />
            <button
              onClick={handleClose}
              aria-label="Close"
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                background: "rgba(255,255,255,0.15)",
                border: "none",
                color: "#fff",
                width: 32,
                height: 32,
                borderRadius: "50%",
                fontSize: 18,
                lineHeight: 1,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.background =
                  "rgba(255,255,255,0.28)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.background =
                  "rgba(255,255,255,0.15)")
              }
            >
              ×
            </button>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: "rgba(255,255,255,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                }}
              >
                🩺
              </div>
              <div>
                <h2
                  style={{
                    color: "#fff",
                    fontSize: 20,
                    fontWeight: 700,
                    margin: 0,
                    letterSpacing: "-0.3px",
                  }}
                >
                  Book an Appointment
                </h2>
                <p
                  style={{
                    color: "rgba(255,255,255,0.7)",
                    fontSize: 13,
                    margin: "3px 0 0",
                  }}
                >
                  Our team will call you back shortly
                </p>
              </div>
            </div>
          </div>

          {/* Body */}
          <div style={{ padding: "24px 28px 28px" }}>
            {submitted ? (
              // ── Success State ──
              <div
                style={{
                  textAlign: "center",
                  padding: "32px 16px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg,#0e2147,#1e4d9b)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 34,
                    marginBottom: 8,
                  }}
                >
                  ✅
                </div>
                <h3
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    color: "#0e2147",
                    margin: 0,
                  }}
                >
                  Appointment Requested!
                </h3>
                <p
                  style={{
                    color: "#6b7280",
                    fontSize: 14,
                    lineHeight: 1.6,
                    maxWidth: 320,
                    margin: 0,
                  }}
                >
                  Thank you, <strong>{form.name || "there"}</strong>! We've
                  received your request and will call you at{" "}
                  <strong>{form.phone}</strong> within 24 hours.
                </p>
                <button
                  onClick={handleClose}
                  style={{
                    marginTop: 16,
                    background: "linear-gradient(135deg,#0e2147,#1e4d9b)",
                    color: "#fff",
                    border: "none",
                    borderRadius: 12,
                    padding: "12px 32px",
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: "pointer",
                    letterSpacing: "0.04em",
                  }}
                >
                  Close
                </button>
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
                    placeholder="John Doe"
                    value={form.name}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                  />
                </Field>

                {/* Phone + Email */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
                    gap: 12,
                  }}
                >
                  <Field label="Phone Number">
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+91 98765 43210"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      style={inputStyle}
                    />
                  </Field>
                  <Field label="Email (optional)">
                    <input
                      type="email"
                      name="email"
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={handleChange}
                      style={inputStyle}
                    />
                  </Field>
                </div>

                {/* Service */}
                <Field label="Select Treatment">
                  <div style={{ position: "relative" }}>
                    <select
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      required
                      style={{ ...inputStyle, appearance: "none", paddingRight: 40 }}
                    >
                      <option value="" disabled>
                        Choose a treatment...
                      </option>
                      <option value="laser">Laser Hair Removal</option>
                      <option value="facial">Hydra Facial</option>
                      <option value="botox">Botox Treatment</option>
                      <option value="peel">Chemical Peel</option>
                      <option value="mnrf">MNRF Therapy</option>
                      <option value="microneedling">
                        Scalp Micro-Needling
                      </option>
                      <option value="fillers">Dermal Fillers</option>
                      <option value="consultation">General Consultation</option>
                    </select>
                    <span
                      style={{
                        position: "absolute",
                        right: 14,
                        top: "50%",
                        transform: "translateY(-50%)",
                        pointerEvents: "none",
                        color: "#9ca3af",
                        fontSize: 12,
                      }}
                    >
                      ▼
                    </span>
                  </div>
                </Field>

                {/* Message */}
                {/* <Field label="Message (optional)">
                  <textarea
                    name="message"
                    placeholder="Any specific concerns or preferred time..."
                    value={form.message}
                    onChange={handleChange}
                    rows={3}
                    style={{
                      ...inputStyle,
                      resize: "vertical",
                      minHeight: 80,
                    }}
                  />
                </Field> */}

                {/* Divider */}
                <div
                  style={{
                    height: 1,
                    background:
                      "linear-gradient(90deg,transparent,#e5e7eb,transparent)",
                    margin: "2px 0",
                  }}
                />

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    background: loading
                      ? "#93a3c0"
                      : "linear-gradient(135deg,#0e2147 0%,#1e4d9b 100%)",
                    color: "#fff",
                    border: "none",
                    borderRadius: 14,
                    padding: "15px 20px",
                    fontSize: 14,
                    fontWeight: 700,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    cursor: loading ? "not-allowed" : "pointer",
                    transition: "transform 0.15s, box-shadow 0.2s",
                    boxShadow: loading
                      ? "none"
                      : "0 8px 24px rgba(14,33,71,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      (e.currentTarget as HTMLButtonElement).style.transform =
                        "translateY(-1px)";
                      (
                        e.currentTarget as HTMLButtonElement
                      ).style.boxShadow =
                        "0 12px 32px rgba(14,33,71,0.4)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.transform =
                      "translateY(0)";
                    (e.currentTarget as HTMLButtonElement).style.boxShadow =
                      "0 8px 24px rgba(14,33,71,0.3)";
                  }}
                >
                  {loading ? (
                    <>
                      <Spinner /> Submitting...
                    </>
                  ) : (
                    <>📞 Request Call Back</>
                  )}
                </button>

                <p
                  style={{
                    textAlign: "center",
                    fontSize: 12,
                    color: "#9ca3af",
                    margin: 0,
                  }}
                >
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
function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        style={{
          display: "block",
          fontSize: 11,
          fontWeight: 700,
          color: "#1a3a6b",
          textTransform: "uppercase",
          letterSpacing: "0.07em",
          marginBottom: 6,
        }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

// ─── Helper: Spinner ─────────────────────────────────────
function Spinner() {
  return (
    <span
      style={{
        display: "inline-block",
        width: 16,
        height: 16,
        border: "2px solid rgba(255,255,255,0.3)",
        borderTopColor: "#fff",
        borderRadius: "50%",
        animation: "spin 0.7s linear infinite",
      }}
    />
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