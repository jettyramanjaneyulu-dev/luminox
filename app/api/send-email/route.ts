// app/api/send-email/route.ts
// ── Gmail SMTP via Nodemailer v8 ──

import * as nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, service, message } = body;

    if (!name || !phone || !service) {
      return NextResponse.json(
        { error: "Name, phone and service are required." },
        { status: 400 }
      );
    }

    const serviceLabels: Record<string, string> = {
      fraxel_dual:     "Fraxel DUAL",
      fraxel_co2:      "Fraxel CO₂",
      clear_brilliant: "Clear + Brilliant®",
      vbeam:           "Vbeam Perfecta",
      age_spots:       "Laser for Age Spots",
      redness:         "Laser for Redness",
      hair_removal:    "Laser Hair Removal",
      tattoo:          "Laser Tattoo Removal",
      botox_jaw:       "BOTOX® Jaw Reduction",
      botox_cosmetic:  "BOTOX® Cosmetic",
      nefertiti:       "Nefertiti Lift",
      botox_sweat:     "BOTOX® Hyperhidrosis",
      botox_migraine:  "BOTOX® Migraines",
      botox_tmj:       "BOTOX® TMJ",
      radiesse:        "Radiesse®",
      juvederm:        "JUVÉDERM®",
      belotero:        "Belotero®",
      chemical_peel:   "Chemical Peel",
      hydrafacial:     "HydraFacial MD",
      sclerotherapy:   "Sclerotherapy",
      microneedling:   "Micro-Needling",
      prp:             "PRP Therapy",
      acne:            "Acne Treatment",
      rosacea:         "Rosacea",
      eczema:          "Eczema",
      psoriasis:       "Psoriasis",
      skin_cancer:     "Skin Cancer Screening",
      mohs:            "Mohs Surgery",
      consultation:    "General Consultation",
    };

    const serviceLabel = serviceLabels[service] || service;
    const submittedAt  = new Date().toLocaleString("en-IN", {
      timeZone:  "Asia/Kolkata",
      dateStyle: "full",
      timeStyle: "short",
    });

    const whatsappNumber = process.env.WHATSAPP_NUMBER    || "919963963137";
    const clinicEmail    = process.env.CLINIC_EMAIL       || "nagaram520@gmail.com";
    const gmailUser      = process.env.GMAIL_USER         || "nagaram520@gmail.com";
    const gmailPassword  = process.env.GMAIL_APP_PASSWORD || "";

    // ── Nodemailer v8 transporter ──
    const transporter = nodemailer.createTransport({
      host:   "smtp.gmail.com",
      port:   465,
      secure: true,           // true for port 465
      auth: {
        user: gmailUser,
        pass: gmailPassword,
      },
    });

    const rows = [
      { icon: "👤", label: "Full Name", value: name },
      { icon: "📞", label: "Phone",     value: `<a href="tel:${phone}" style="color:#292E4B;font-weight:600;text-decoration:none;">${phone}</a>` },
      { icon: "✉️", label: "Email",     value: email ? `<a href="mailto:${email}" style="color:#292E4B;text-decoration:none;">${email}</a>` : "—" },
      { icon: "💉", label: "Treatment", value: `<strong>${serviceLabel}</strong>` },
      ...(message ? [{ icon: "💬", label: "Message", value: message }] : []),
    ];

    const tableRows = rows
      .map((row, i) => `
        <tr style="background:${i % 2 === 0 ? "#faf8ff" : "#fff"};">
          <td style="padding:11px 16px;font-size:12px;font-weight:600;color:#6b7280;width:110px;border-bottom:1px solid #f0eef8;white-space:nowrap;">
            ${row.icon}&nbsp;${row.label}
          </td>
          <td style="padding:11px 16px;font-size:14px;color:#1e2a3a;border-bottom:1px solid #f0eef8;">
            ${row.value}
          </td>
        </tr>
      `)
      .join("");

    const waText = encodeURIComponent(
      `Hi! Following up on appointment from ${name} (${phone}) for ${serviceLabel}.`
    );

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8"/>
          <meta name="viewport" content="width=device-width,initial-scale=1"/>
        </head>
        <body style="margin:0;padding:0;background:#f4f6fb;font-family:'Segoe UI',Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f6fb;padding:32px 16px;">
            <tr>
              <td align="center">
                <table width="100%" cellpadding="0" cellspacing="0"
                  style="max-width:580px;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 32px rgba(41,46,75,0.10);">

                  <!-- Header -->
                  <tr>
                    <td style="background:linear-gradient(135deg,#292E4B 0%,#5B326A 100%);padding:28px 32px;">
                      <h1 style="margin:0;color:#fff;font-size:20px;font-weight:700;">
                        New Appointment Request
                      </h1>
                      <p style="margin:6px 0 0;color:rgba(255,255,255,0.65);font-size:12px;">
                        Luminox Clinics &nbsp;·&nbsp; ${submittedAt}
                      </p>
                    </td>
                  </tr>

                  <!-- Body -->
                  <tr>
                    <td style="padding:28px 32px;">
                      <p style="margin:0 0 16px;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#5B326A;">
                        Patient Details
                      </p>
                      <table width="100%" cellpadding="0" cellspacing="0"
                        style="border:1.5px solid #ede8f5;border-radius:10px;overflow:hidden;">
                        ${tableRows}
                      </table>

                      <!-- WhatsApp CTA -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;">
                        <tr>
                          <td align="center">
                            <a href="https://wa.me/${whatsappNumber}?text=${waText}"
                              style="display:inline-block;background:#25D366;color:#fff;font-size:13px;font-weight:700;letter-spacing:0.05em;text-transform:uppercase;padding:13px 28px;border-radius:10px;text-decoration:none;">
                              💬 Reply on WhatsApp
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="background:#faf8ff;padding:16px 32px;border-top:1px solid #ede8f5;">
                      <p style="margin:0;font-size:11px;color:#9ca3af;text-align:center;">
                        Sent automatically by Luminox Clinics appointment system.
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `;

    // ── Send email ──
    const info = await transporter.sendMail({
      from:    `"Luminox Clinics" <${gmailUser}>`,
      to:      clinicEmail,
      replyTo: email || undefined,
      subject: `New Appointment — ${name} · ${serviceLabel}`,
      html:    htmlContent,
    });

    console.log("✅ Email sent! ID:", info.messageId);
    return NextResponse.json({ success: true, messageId: info.messageId });

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown server error.";
    console.error("❌ Email error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
