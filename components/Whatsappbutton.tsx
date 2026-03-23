"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const WHATSAPP_NUMBER = "916309918333"; // Replace with your actual WhatsApp number (with country code, no +)
const DEFAULT_MESSAGE = "Hi"; // Default message when opening WhatsApp

export default function WhatsAppButton() {
  const [open, setOpen] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const handleStartChat = () => {
    const encodedMessage = encodeURIComponent(DEFAULT_MESSAGE);
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`,
      "_blank"
    );
    setOpen(false);
  };

  return (
    <>
      {/* ─── WhatsApp Sticky Button ─── */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Chat on WhatsApp"
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 9997,
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: "#25D366",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 20px rgba(37,211,102,0.45)",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.1)";
          (e.currentTarget as HTMLButtonElement).style.boxShadow =
            "0 6px 28px rgba(37,211,102,0.6)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
          (e.currentTarget as HTMLButtonElement).style.boxShadow =
            "0 4px 20px rgba(37,211,102,0.45)";
        }}
      >
        <WhatsAppIcon />
      </button>

      {/* ─── Backdrop ─── */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9998,
          }}
        />
      )}

      {/* ─── WhatsApp Popup Card ─── */}
      <div
        style={{
          position: "fixed",
          bottom: 92,
          right: 24,
          zIndex: 9999,
          width: 300,
          borderRadius: 16,
          overflow: "hidden",
          boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
          transform: open ? "translateY(0) scale(1)" : "translateY(16px) scale(0.95)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition:
            "transform 0.25s cubic-bezier(0.34,1.3,0.64,1), opacity 0.2s ease",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "#075E54",
            padding: "16px 20px",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          {/* Avatar */}
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              overflow: "hidden",
            }}
          >
         <Image
  src="/header/Luminox.png"
  alt="Logo"
  width={40}
  height={40}
  style={{ objectFit: "contain" }}
/>
            
          </div>
          <div>
            <p
              style={{
                color: "#fff",
                fontWeight: 700,
                fontSize: 15,
                margin: 0,
                lineHeight: 1.3,
              }}
            >
              Luminox Clinic
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 2 }}>
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#25D366",
                  display: "inline-block",
                }}
              />
              <span style={{ color: "rgba(255,255,255,0.8)", fontSize: 12 }}>
                online
              </span>
            </div>
          </div>
          {/* Close */}
          <button
            onClick={() => setOpen(false)}
            aria-label="Close WhatsApp chat"
            style={{
              marginLeft: "auto",
              background: "none",
              border: "none",
              color: "rgba(255,255,255,0.7)",
              fontSize: 20,
              cursor: "pointer",
              lineHeight: 1,
              padding: 0,
            }}
          >
            ×
          </button>
        </div>

        {/* Chat bubble area */}
        <div
          style={{
            background: "#ECE5DD",
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d4cdc6' fill-opacity='0.4'%3E%3Cpath d='M20 20.5V18H0v5h5v5H0v5h20v-9.5zm-2 4.5h-1v-1h1v1zm0-4h-1v-1h1v1zm0-4h-1v-1h1v1zm0-4h-1v-1h1v1zm-4 12h-1v-1h1v1zm0-4h-1v-1h1v1zm0-4h-1v-1h1v1zm0-4h-1v-1h1v1zm-4 12h-1v-1h1v1zm0-4h-1v-1h1v1zm0-4h-1v-1h1v1zm0-4h-1v-1h1v1zm-4 12h-1v-1h1v1zm0-4h-1v-1h1v1zm0-4h-1v-1h1v1zm0-4h-1v-1h1v1z'/%3E%3C/g%3E%3C/svg%3E\")",
            padding: "16px 14px 12px",
            minHeight: 100,
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "0 10px 10px 10px",
              padding: "10px 14px",
              maxWidth: "85%",
              boxShadow: "0 1px 2px rgba(0,0,0,0.12)",
              display: "inline-block",
            }}
          >
            <p
              style={{
                fontSize: 14,
                color: "#303030",
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              Luminox Clinic
            </p>
            <p
              style={{
                fontSize: 14,
                color: "#303030",
                margin: "4px 0 0",
                lineHeight: 1.5,
              }}
            >
              Hi,
              <br />
              How can I help you ?
            </p>
          </div>
        </div>

        {/* Start Chat Button */}
        <button
          onClick={handleStartChat}
          style={{
            width: "100%",
            background: "#25D366",
            border: "none",
            color: "#fff",
            fontSize: 15,
            fontWeight: 700,
            padding: "14px 20px",
            cursor: "pointer",
            letterSpacing: "0.02em",
            transition: "background 0.2s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.background = "#1ebe5d")
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.background = "#25D366")
          }
        >
          <WhatsAppIcon size={20} color="#fff" />
          Start chat
        </button>
      </div>
    </>
  );
}

// ─── WhatsApp SVG Icon ───────────────────────────────────
function WhatsAppIcon({
  size = 28,
  color = "#fff",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 3C8.82 3 3 8.82 3 16c0 2.42.67 4.69 1.83 6.63L3 29l6.55-1.79A12.93 12.93 0 0016 29c7.18 0 13-5.82 13-13S23.18 3 16 3z"
        fill={color}
      />
      <path
        d="M21.9 18.7c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.02 1-1.02 2.43s1.05 2.82 1.19 3.02c.15.2 2.05 3.13 4.98 4.39.7.3 1.24.48 1.66.62.7.22 1.34.19 1.84.12.56-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z"
        fill="#075E54"
      />
    </svg>
  );
}