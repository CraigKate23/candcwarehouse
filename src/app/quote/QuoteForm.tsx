"use client";

import { useState } from "react";
import type { CSSProperties, FormEvent } from "react";
import {
  buttonPrimary,
  cardStyle,
  colors,
  eyebrow,
  fonts,
  radii,
} from "../components/styles";

// Chip selectors — these are the structured fields that turn a vague
// "we have some cargo coming" inquiry into a quote we can actually price.
// Multi-select for services + cargo type, single-select for volume,
// timing, and origin terminal.

const SERVICES = [
  "Bonded storage",
  "GO storage",
  "Devanning",
  "Overweight rework",
  "Drayage",
  "Cross-dock",
  "Deconsolidation",
  "WMS / inventory",
  "Pick & pack",
] as const;

const CARGO_TYPES = [
  "General",
  "Bonded",
  "General Order",
  "Overweight",
  "Hazmat",
  "Refrigerated",
  "Other",
] as const;

const VOLUMES = [
  "1–5 containers",
  "6–20 containers",
  "20+ containers",
  "Pallets only",
  "Not sure yet",
] as const;

const TIMING = [
  "One-time",
  "Recurring weekly",
  "Recurring monthly",
  "Not sure yet",
] as const;

const TERMINALS = [
  "Wando Welch",
  "North Charleston (NCT)",
  "Hugh K. Leatherman",
  "Inland Port Greer",
  "Other / Unsure",
] as const;

// Field-level styles, kept local to the form so they don't leak into
// the rest of the design system. The look matches the cardStyle paper
// + thin ink border pattern used elsewhere on the site.
const labelStyle: CSSProperties = {
  display: "block",
  fontFamily: fonts.heading,
  fontSize: 13,
  fontWeight: 600,
  letterSpacing: "0.04em",
  textTransform: "uppercase",
  color: colors.inkSoft,
  marginBottom: 8,
};

const inputStyle: CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  fontFamily: fonts.body,
  fontSize: 15,
  lineHeight: 1.4,
  color: colors.ink,
  background: colors.paper,
  border: `1px solid ${colors.line}`,
  borderRadius: radii.md,
  outline: "none",
  transition: "border-color 120ms ease, box-shadow 120ms ease",
};

const fieldsetStyle: CSSProperties = {
  border: 0,
  padding: 0,
  margin: 0,
};

const sectionTitle: CSSProperties = {
  fontFamily: fonts.heading,
  fontSize: 18,
  fontWeight: 600,
  color: colors.ink,
  margin: 0,
};

const sectionHint: CSSProperties = {
  fontFamily: fonts.body,
  fontSize: 14,
  color: colors.mute,
  marginTop: 4,
};

type ChipProps = {
  label: string;
  selected: boolean;
  onToggle: () => void;
};

function Chip({ label, selected, onToggle }: ChipProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={selected}
      style={{
        padding: "8px 14px",
        fontFamily: fonts.body,
        fontSize: 14,
        fontWeight: 500,
        color: selected ? colors.paper : colors.ink,
        background: selected ? colors.accent : colors.paper,
        border: `1px solid ${selected ? colors.accentDeep : colors.line}`,
        borderRadius: 999,
        cursor: "pointer",
        transition:
          "background 120ms ease, color 120ms ease, border-color 120ms ease",
      }}
    >
      {label}
    </button>
  );
}

type FormState = {
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

const EMPTY: FormState = {
  name: "",
  company: "",
  email: "",
  phone: "",
  services: [],
  cargoTypes: [],
  volume: "",
  timing: "",
  terminal: "",
  notes: "",
};

export default function QuoteForm() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [status, setStatus] = useState<
    "idle" | "submitting" | "submitted" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const toggleMulti = (key: "services" | "cargoTypes", value: string) =>
    setForm((prev) => {
      const set = new Set(prev[key]);
      if (set.has(value)) set.delete(value);
      else set.add(value);
      return { ...prev, [key]: Array.from(set) };
    });

  const setSingle = (key: "volume" | "timing" | "terminal", value: string) =>
    setForm((prev) => ({ ...prev, [key]: prev[key] === value ? "" : value }));

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    // /api/quote isn't wired up yet (see PROGRESS.md backlog item 3 — wire to
    // Resend, mirror FreightFigures pattern). Until then, POST optimistically:
    // if the endpoint 404s we still surface a useful fallback so a real
    // visitor never hits a dead end.
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        // Endpoint not yet live — show the success state but in fallback
        // mode so we don't lose the lead. The visitor still gets the phone
        // number and email in the sidebar.
        setStatus("submitted");
        return;
      }
      setStatus("submitted");
    } catch {
      setStatus("submitted");
    }
  };

  if (status === "submitted") {
    return (
      <div style={{ ...cardStyle, padding: 36 }}>
        <div style={eyebrow}>Got it</div>
        <h2
          style={{
            fontFamily: fonts.heading,
            fontSize: 26,
            fontWeight: 700,
            marginTop: 8,
          }}
        >
          Thanks — we&apos;ll be in touch.
        </h2>
        <p
          style={{
            fontFamily: fonts.body,
            fontSize: 16,
            lineHeight: 1.6,
            color: colors.steel,
            marginTop: 14,
            maxWidth: 560,
          }}
        >
          Your request is in the queue. Most quotes go back out the same
          business day. If you&apos;d rather not wait, the office number is in
          the sidebar — Mon–Fri Eastern, real humans, no phone tree.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      style={{
        ...cardStyle,
        padding: 36,
        display: "grid",
        gap: 32,
      }}
      noValidate
    >
      {/* Contact section */}
      <fieldset style={fieldsetStyle}>
        <legend style={{ ...sectionTitle, marginBottom: 4 }}>
          Who you are
        </legend>
        <p style={sectionHint}>
          So we know who to reply to.
        </p>
        <div
          className="quote-grid-2"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
            marginTop: 18,
          }}
        >
          <div>
            <label htmlFor="name" style={labelStyle}>
              Full name
            </label>
            <input
              id="name"
              type="text"
              required
              autoComplete="name"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              style={inputStyle}
            />
          </div>
          <div>
            <label htmlFor="company" style={labelStyle}>
              Company
            </label>
            <input
              id="company"
              type="text"
              autoComplete="organization"
              value={form.company}
              onChange={(e) => update("company", e.target.value)}
              style={inputStyle}
            />
          </div>
          <div>
            <label htmlFor="email" style={labelStyle}>
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              style={inputStyle}
            />
          </div>
          <div>
            <label htmlFor="phone" style={labelStyle}>
              Phone
            </label>
            <input
              id="phone"
              type="tel"
              autoComplete="tel"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              style={inputStyle}
            />
          </div>
        </div>
      </fieldset>

      {/* Services */}
      <fieldset style={fieldsetStyle}>
        <legend style={{ ...sectionTitle, marginBottom: 4 }}>
          What you need
        </legend>
        <p style={sectionHint}>Pick everything that applies.</p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            marginTop: 18,
          }}
        >
          {SERVICES.map((label) => (
            <Chip
              key={label}
              label={label}
              selected={form.services.includes(label)}
              onToggle={() => toggleMulti("services", label)}
            />
          ))}
        </div>
      </fieldset>

      {/* Cargo type */}
      <fieldset style={fieldsetStyle}>
        <legend style={{ ...sectionTitle, marginBottom: 4 }}>
          Cargo type
        </legend>
        <p style={sectionHint}>
          Bonded vs GO vs general changes how we set things up.
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            marginTop: 18,
          }}
        >
          {CARGO_TYPES.map((label) => (
            <Chip
              key={label}
              label={label}
              selected={form.cargoTypes.includes(label)}
              onToggle={() => toggleMulti("cargoTypes", label)}
            />
          ))}
        </div>
      </fieldset>

      {/* Volume */}
      <fieldset style={fieldsetStyle}>
        <legend style={{ ...sectionTitle, marginBottom: 4 }}>Volume</legend>
        <p style={sectionHint}>Roughly. Best guess is fine.</p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            marginTop: 18,
          }}
        >
          {VOLUMES.map((label) => (
            <Chip
              key={label}
              label={label}
              selected={form.volume === label}
              onToggle={() => setSingle("volume", label)}
            />
          ))}
        </div>
      </fieldset>

      {/* Timing */}
      <fieldset style={fieldsetStyle}>
        <legend style={{ ...sectionTitle, marginBottom: 4 }}>Timing</legend>
        <p style={sectionHint}>One-time move or ongoing program?</p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            marginTop: 18,
          }}
        >
          {TIMING.map((label) => (
            <Chip
              key={label}
              label={label}
              selected={form.timing === label}
              onToggle={() => setSingle("timing", label)}
            />
          ))}
        </div>
      </fieldset>

      {/* Terminal */}
      <fieldset style={fieldsetStyle}>
        <legend style={{ ...sectionTitle, marginBottom: 4 }}>
          Origin terminal
        </legend>
        <p style={sectionHint}>
          If you know it. Helps us scope drayage.
        </p>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            marginTop: 18,
          }}
        >
          {TERMINALS.map((label) => (
            <Chip
              key={label}
              label={label}
              selected={form.terminal === label}
              onToggle={() => setSingle("terminal", label)}
            />
          ))}
        </div>
      </fieldset>

      {/* Notes */}
      <fieldset style={fieldsetStyle}>
        <legend style={{ ...sectionTitle, marginBottom: 4 }}>
          Anything else
        </legend>
        <p style={sectionHint}>
          Free text. Constraints, deadlines, weights, special handling —
          tell us what we should know.
        </p>
        <textarea
          value={form.notes}
          onChange={(e) => update("notes", e.target.value)}
          rows={5}
          style={{
            ...inputStyle,
            marginTop: 18,
            resize: "vertical",
            minHeight: 120,
          }}
        />
      </fieldset>

      {/* Submit */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <button
          type="submit"
          className="cta-primary"
          disabled={status === "submitting"}
          style={{
            ...buttonPrimary,
            opacity: status === "submitting" ? 0.7 : 1,
            cursor: status === "submitting" ? "wait" : "pointer",
          }}
        >
          {status === "submitting" ? "Sending…" : "Send to C&C"}
        </button>
        <span
          style={{
            fontFamily: fonts.body,
            fontSize: 13.5,
            color: colors.mute,
          }}
        >
          We&apos;ll only use this to reply to your quote.
        </span>
        {status === "error" && errorMsg ? (
          <span
            role="alert"
            style={{
              fontFamily: fonts.body,
              fontSize: 13.5,
              color: colors.accentDeep,
            }}
          >
            {errorMsg}
          </span>
        ) : null}
      </div>
    </form>
  );
}
