import { NextResponse } from "next/server";
import { Resend } from "resend";
import { business } from "../../components/styles";
import {
  DELIVERY_LOCATION_OPTIONS,
  FINAL_DELIVERY_SERVICE,
  FINAL_DELIVERY_SUBJECT,
  QUOTE_INBOX,
  YES_NO_UNSURE_OPTIONS,
} from "../../quote/final-delivery";

// POST /api/quote — receives the structured quote form payload from
// `src/app/quote/QuoteForm.tsx`, validates it, and emails it to Greg via
// Resend. Mirrors the FreightFigures pattern: validate, format, send,
// return a small JSON envelope so the client can flip its success/error
// state.
//
// Environment variables (set in the Vercel project, NOT committed):
//   RESEND_API_KEY  — required. Issued at https://resend.com/api-keys.
//   RESEND_FROM     — optional. Defaults to "C&C Warehouse
//                      <onboarding@resend.dev>" which works without
//                      domain verification but obviously isn't great
//                      for inbox placement. Once `candcwarehouse.com`
//                      DNS is verified in Resend, swap this to e.g.
//                      "C&C Warehouse <quotes@candcwarehouse.com>".
//   QUOTE_TO        — optional. Defaults to ashlee@candcwarehouse.com.

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.candcwarehouse.com";

export const runtime = "nodejs";
// Don't pre-render or cache — every POST is a unique submission.
export const dynamic = "force-dynamic";

// Mirror of the FormState type in QuoteForm.tsx. Kept local so this
// route stays a self-contained leaf without importing client code.
type QuotePayload = {
  name: string;
  company: string;
  email: string;
  phone: string;
  services: string[];
  cargoTypes: string[];
  volume: string;
  timing: string;
  terminal: string;
  notes: string;
  deliveryStreet: string;
  deliveryCity: string;
  deliveryState: string;
  deliveryZip: string;
  deliveryLocation: string;
  dockOrForklift: string;
  liftgate: string;
  appointment: string;
  itNumber: string;
  palletCount: string;
  palletDimensions: string;
  totalWeight: string;
};

// Same allow-lists the form uses to populate its chip selectors. Any
// value outside these lists is dropped on the floor — this stops a
// drive-by spammer from stuffing arbitrary strings into the email body.
const SERVICES = new Set([
  "Bonded storage",
  "GO storage",
  "Devanning",
  "Overweight rework",
  "Drayage",
  "Cross-dock",
  "Deconsolidation",
  "WMS / inventory",
  "Pick & pack",
  FINAL_DELIVERY_SERVICE,
]);

const DELIVERY_LOCATIONS = new Set<string>(DELIVERY_LOCATION_OPTIONS);
const YES_NO_UNSURE = new Set<string>(YES_NO_UNSURE_OPTIONS);

const CARGO_TYPES = new Set([
  "General",
  "Bonded",
  "General Order",
  "Overweight",
  "Hazmat",
  "Refrigerated",
  "Other",
]);

const VOLUMES = new Set([
  "1–5 containers",
  "6–20 containers",
  "20+ containers",
  "Pallets only",
  "Not sure yet",
]);

const TIMINGS = new Set([
  "One-time",
  "Recurring weekly",
  "Recurring monthly",
  "Not sure yet",
]);

const TERMINALS = new Set([
  "Wando Welch",
  "North Charleston (NCT)",
  "Hugh K. Leatherman",
  "Inland Port Greer",
  "Other / Unsure",
]);

// RFC-5322-ish lite. Good enough to reject obvious garbage; the SMTP
// server gives the final verdict.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Reasonable cap on free-text fields. The notes field is the only one
// where a real user might want length, but 4 KB is plenty for a quote
// inquiry and stops the email body from ballooning.
const MAX_NOTES = 4000;
const MAX_SHORT = 200;

type ValidationResult =
  | { ok: true; data: QuotePayload }
  | { ok: false; error: string };

function pickString(v: unknown, max: number): string {
  if (typeof v !== "string") return "";
  return v.trim().slice(0, max);
}

function pickAllowedArray(v: unknown, allowed: Set<string>): string[] {
  if (!Array.isArray(v)) return [];
  const seen = new Set<string>();
  for (const item of v) {
    if (typeof item !== "string") continue;
    if (allowed.has(item)) seen.add(item);
  }
  return Array.from(seen);
}

function pickAllowedSingle(v: unknown, allowed: Set<string>): string {
  if (typeof v !== "string") return "";
  return allowed.has(v) ? v : "";
}

function validate(raw: unknown): ValidationResult {
  if (!raw || typeof raw !== "object") {
    return { ok: false, error: "Invalid payload." };
  }
  const r = raw as Record<string, unknown>;

  const name = pickString(r.name, MAX_SHORT);
  const email = pickString(r.email, MAX_SHORT);
  if (!name) return { ok: false, error: "Name is required." };
  if (!email || !EMAIL_RE.test(email)) {
    return { ok: false, error: "A valid email is required." };
  }

  const services = pickAllowedArray(r.services, SERVICES);
  const finalDelivery = services.includes(FINAL_DELIVERY_SERVICE);

  // Address is required only for Final Delivery. A regular quote never
  // reaches these checks, so its validation result is unchanged.
  const deliveryStreet = finalDelivery
    ? pickString(r.deliveryStreet, MAX_SHORT)
    : "";
  const deliveryCity = finalDelivery ? pickString(r.deliveryCity, MAX_SHORT) : "";
  const deliveryState = finalDelivery
    ? pickString(r.deliveryState, MAX_SHORT)
    : "";
  const deliveryZip = finalDelivery ? pickString(r.deliveryZip, MAX_SHORT) : "";
  if (finalDelivery) {
    if (!deliveryStreet)
      return { ok: false, error: "Street address is required." };
    if (!deliveryCity) return { ok: false, error: "City is required." };
    if (!deliveryState) return { ok: false, error: "State is required." };
    if (!deliveryZip) return { ok: false, error: "ZIP code is required." };
  }

  return {
    ok: true,
    data: {
      name,
      email,
      company: pickString(r.company, MAX_SHORT),
      phone: pickString(r.phone, MAX_SHORT),
      services,
      cargoTypes: pickAllowedArray(r.cargoTypes, CARGO_TYPES),
      volume: pickAllowedSingle(r.volume, VOLUMES),
      timing: pickAllowedSingle(r.timing, TIMINGS),
      terminal: pickAllowedSingle(r.terminal, TERMINALS),
      notes: pickString(r.notes, MAX_NOTES),
      deliveryStreet,
      deliveryCity,
      deliveryState,
      deliveryZip,
      deliveryLocation: finalDelivery
        ? pickAllowedSingle(r.deliveryLocation, DELIVERY_LOCATIONS)
        : "",
      dockOrForklift: finalDelivery
        ? pickAllowedSingle(r.dockOrForklift, YES_NO_UNSURE)
        : "",
      liftgate: finalDelivery
        ? pickAllowedSingle(r.liftgate, YES_NO_UNSURE)
        : "",
      appointment: finalDelivery
        ? pickAllowedSingle(r.appointment, YES_NO_UNSURE)
        : "",
      itNumber: finalDelivery ? pickString(r.itNumber, MAX_SHORT) : "",
      palletCount: finalDelivery ? pickString(r.palletCount, MAX_SHORT) : "",
      palletDimensions: finalDelivery
        ? pickString(r.palletDimensions, MAX_SHORT)
        : "",
      totalWeight: finalDelivery ? pickString(r.totalWeight, MAX_SHORT) : "",
    },
  };
}

// Minimal HTML escape — the email body is rendered as HTML by the
// Resend SDK so any user-supplied text needs to be neutralised.
function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function row(label: string, value: string): string {
  if (!value) return "";
  return `<tr>
    <td style="padding:6px 14px 6px 0;color:#3a566f;font-weight:600;vertical-align:top;white-space:nowrap;">${esc(label)}</td>
    <td style="padding:6px 0;color:#0b1a2b;">${esc(value)}</td>
  </tr>`;
}

function rowAlways(label: string, value: string): string {
  return row(label, value || "Not provided");
}

function isFinalDelivery(data: QuotePayload): boolean {
  return data.services.includes(FINAL_DELIVERY_SERVICE);
}

function deliveryRows(data: QuotePayload): string {
  if (!isFinalDelivery(data)) return "";
  return `<tr><td colspan="2" style="padding:16px 0 4px;color:#0b1a2b;font-weight:700;">Final delivery — freight already coming through C&amp;C</td></tr>
      ${rowAlways("Delivery street", data.deliveryStreet)}
      ${rowAlways("Delivery city", data.deliveryCity)}
      ${rowAlways("Delivery state", data.deliveryState)}
      ${rowAlways("Delivery ZIP", data.deliveryZip)}
      ${rowAlways("Business or residential", data.deliveryLocation)}
      ${rowAlways("Dock or forklift available", data.dockOrForklift)}
      ${rowAlways("Liftgate needed", data.liftgate)}
      ${rowAlways("Appointment needed", data.appointment)}
      ${rowAlways("IT number", data.itNumber)}
      ${rowAlways("Pallet count", data.palletCount)}
      ${rowAlways("Pallet dimensions", data.palletDimensions)}
      ${rowAlways("Total weight", data.totalWeight)}`;
}

function buildHtml(data: QuotePayload): string {
  const services = data.services.length ? data.services.join(", ") : "";
  const cargo = data.cargoTypes.length ? data.cargoTypes.join(", ") : "";
  const notesBlock = data.notes
    ? `<div style="margin-top:18px;padding:14px 16px;background:#f3efe7;border-left:3px solid #d96a2c;font-family:Georgia,serif;color:#0b1a2b;white-space:pre-wrap;">${esc(
        data.notes,
      )}</div>`
    : "";
  const kicker = isFinalDelivery(data) ? FINAL_DELIVERY_SUBJECT : "New quote request";

  return `<!doctype html>
<html><body style="margin:0;padding:0;background:#fafaf7;font-family:'IBM Plex Sans',Helvetica,Arial,sans-serif;color:#0b1a2b;">
  <div style="max-width:640px;margin:0 auto;padding:32px 28px;">
    <div style="font-family:'Space Grotesk',Helvetica,Arial,sans-serif;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:#d96a2c;font-weight:600;">
      ${esc(kicker)} &middot; ${esc(business.name)}
    </div>
    <h1 style="font-family:'Space Grotesk',Helvetica,Arial,sans-serif;font-size:24px;font-weight:700;margin:8px 0 20px;color:#0b1a2b;">
      ${esc(data.name)}${data.company ? ` &middot; ${esc(data.company)}` : ""}
    </h1>
    <table style="border-collapse:collapse;font-size:15px;line-height:1.5;">
      ${row("Email", data.email)}
      ${row("Phone", data.phone)}
      ${row("Company", data.company)}
      ${row("Services", services)}
      ${row("Cargo type", cargo)}
      ${row("Volume", data.volume)}
      ${row("Timing", data.timing)}
      ${row("Terminal", data.terminal)}
      ${deliveryRows(data)}
    </table>
    ${notesBlock}
    <hr style="border:0;border-top:1px solid #e7e2d6;margin:28px 0;" />
    <div style="font-size:13px;color:#7a8493;">
      Sent from the quote form at <a href="${SITE_URL}/quote" style="color:#d96a2c;text-decoration:none;">${SITE_URL.replace(/^https?:\/\//, "")}/quote</a>.
      Reply directly to this email to reach ${esc(data.name)} &mdash; the reply-to is set to their address.
    </div>
  </div>
</body></html>`;
}

function buildText(data: QuotePayload): string {
  const lines = [
    isFinalDelivery(data)
      ? `${FINAL_DELIVERY_SUBJECT} — ${business.name}`
      : `New quote request — ${business.name}`,
    "",
    `Name:     ${data.name}`,
    `Email:    ${data.email}`,
  ];
  if (data.phone) lines.push(`Phone:    ${data.phone}`);
  if (data.company) lines.push(`Company:  ${data.company}`);
  if (data.services.length)
    lines.push(`Services: ${data.services.join(", ")}`);
  if (data.cargoTypes.length)
    lines.push(`Cargo:    ${data.cargoTypes.join(", ")}`);
  if (data.volume) lines.push(`Volume:   ${data.volume}`);
  if (data.timing) lines.push(`Timing:   ${data.timing}`);
  if (data.terminal) lines.push(`Terminal: ${data.terminal}`);
  if (isFinalDelivery(data)) {
    lines.push("");
    lines.push("Final delivery — freight already coming through C&C:");
    lines.push(`Street:                 ${data.deliveryStreet}`);
    lines.push(`City:                   ${data.deliveryCity}`);
    lines.push(`State:                  ${data.deliveryState}`);
    lines.push(`ZIP:                    ${data.deliveryZip}`);
    lines.push(
      `Business or residential: ${data.deliveryLocation || "Not provided"}`,
    );
    lines.push(
      `Dock or forklift:        ${data.dockOrForklift || "Not provided"}`,
    );
    lines.push(`Liftgate needed:        ${data.liftgate || "Not provided"}`);
    lines.push(
      `Appointment needed:      ${data.appointment || "Not provided"}`,
    );
    lines.push(`IT number:              ${data.itNumber || "Not provided"}`);
    lines.push(`Pallet count:           ${data.palletCount || "Not provided"}`);
    lines.push(
      `Pallet dimensions:       ${data.palletDimensions || "Not provided"}`,
    );
    lines.push(`Total weight:           ${data.totalWeight || "Not provided"}`);
  }
  if (data.notes) {
    lines.push("");
    lines.push("Notes:");
    lines.push(data.notes);
  }
  lines.push("");
  lines.push("--");
  lines.push("Sent from the C&C Warehouse quote form.");
  return lines.join("\n");
}

export async function POST(request: Request) {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Body must be valid JSON." },
      { status: 400 },
    );
  }

  const result = validate(raw);
  if (!result.ok) {
    return NextResponse.json(
      { ok: false, error: result.error },
      { status: 400 },
    );
  }
  const data = result.data;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // No API key in this environment. Log the lead for the function logs
    // and tell the form the message was not sent.
    console.warn(
      "[api/quote] RESEND_API_KEY not set — lead not emailed:",
      JSON.stringify(data),
    );
    return NextResponse.json(
      { ok: false, error: "Email transport not configured." },
      { status: 503 },
    );
  }

  const from =
    process.env.RESEND_FROM || "C&C Warehouse <onboarding@resend.dev>";
  const to = process.env.QUOTE_TO || QUOTE_INBOX;

  const subject = isFinalDelivery(data)
    ? FINAL_DELIVERY_SUBJECT
    : `Quote request — ${data.name}${
        data.company ? ` · ${data.company}` : ""
      }`;

  try {
    const resend = new Resend(apiKey);
    // Resend resolves with { data, error } on API, domain, and auth
    // failures. It does not throw for those. Success requires an id.
    const { data: sent, error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: data.email,
      subject,
      html: buildHtml(data),
      text: buildText(data),
    });
    if (error || !sent?.id) {
      console.error("[api/quote] resend rejected:", error ?? "missing id");
      return NextResponse.json(
        { ok: false, error: "Email send failed." },
        { status: 502 },
      );
    }
  } catch (err) {
    console.error("[api/quote] unexpected error:", err);
    return NextResponse.json(
      { ok: false, error: "Email send failed." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
