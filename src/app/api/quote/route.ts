import { NextResponse } from "next/server";
import { Resend } from "resend";
import { business } from "../../components/styles";

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
//   QUOTE_TO        — optional. Defaults to greg@candcwarehouse.com.

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
]);

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

  return {
    ok: true,
    data: {
      name,
      email,
      company: pickString(r.company, MAX_SHORT),
      phone: pickString(r.phone, MAX_SHORT),
      services: pickAllowedArray(r.services, SERVICES),
      cargoTypes: pickAllowedArray(r.cargoTypes, CARGO_TYPES),
      volume: pickAllowedSingle(r.volume, VOLUMES),
      timing: pickAllowedSingle(r.timing, TIMINGS),
      terminal: pickAllowedSingle(r.terminal, TERMINALS),
      notes: pickString(r.notes, MAX_NOTES),
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

function buildHtml(data: QuotePayload): string {
  const services = data.services.length ? data.services.join(", ") : "";
  const cargo = data.cargoTypes.length ? data.cargoTypes.join(", ") : "";
  const notesBlock = data.notes
    ? `<div style="margin-top:18px;padding:14px 16px;background:#f3efe7;border-left:3px solid #d96a2c;font-family:Georgia,serif;color:#0b1a2b;white-space:pre-wrap;">${esc(
        data.notes,
      )}</div>`
    : "";

  return `<!doctype html>
<html><body style="margin:0;padding:0;background:#fafaf7;font-family:'IBM Plex Sans',Helvetica,Arial,sans-serif;color:#0b1a2b;">
  <div style="max-width:640px;margin:0 auto;padding:32px 28px;">
    <div style="font-family:'Space Grotesk',Helvetica,Arial,sans-serif;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;color:#d96a2c;font-weight:600;">
      New quote request &middot; ${esc(business.name)}
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
    </table>
    ${notesBlock}
    <hr style="border:0;border-top:1px solid #e7e2d6;margin:28px 0;" />
    <div style="font-size:13px;color:#7a8493;">
      Sent from the quote form at <a href="https://candcwarehouse.vercel.app/quote" style="color:#d96a2c;text-decoration:none;">candcwarehouse.vercel.app/quote</a>.
      Reply directly to this email to reach ${esc(data.name)} &mdash; the reply-to is set to their address.
    </div>
  </div>
</body></html>`;
}

function buildText(data: QuotePayload): string {
  const lines = [
    `New quote request — ${business.name}`,
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
    // No API key set in this environment — log the lead so it lands in
    // the Vercel function logs and Greg can pull it manually if needed,
    // and tell the client we couldn't send. The form already falls back
    // to a "Got it" success state on non-2xx, so the user still sees
    // the phone number and email rather than a dead end.
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
  const to = process.env.QUOTE_TO || business.email;

  const subject = `Quote request — ${data.name}${
    data.company ? ` · ${data.company}` : ""
  }`;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: data.email,
      subject,
      html: buildHtml(data),
      text: buildText(data),
    });
    if (error) {
      console.error("[api/quote] resend error:", error);
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
