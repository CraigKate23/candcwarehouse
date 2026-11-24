"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  buttonPrimary,
  buttonSecondary,
  cardStyle,
  colors,
  eyebrow,
  fonts,
  radii,
} from "../components/styles";
import {
  DELIVERY_LOCATION_OPTIONS,
  FINAL_DELIVERY_QUOTE_HREF,
  FINAL_DELIVERY_SERVICE,
  QUOTE_INBOX,
  YES_NO_UNSURE_OPTIONS,
  finalDeliveryFieldErrors,
} from "./final-delivery";
import type { FinalDeliveryFieldErrors } from "./final-delivery";

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

const errorText: CSSProperties = {
  fontFamily: fonts.body,
  fontSize: 13,
  color: colors.accentDeep,
  marginTop: 6,
};

const optionalMark: CSSProperties = {
  textTransform: "none",
  letterSpacing: "0.01em",
  fontWeight: 500,
  color: colors.mute,
  marginLeft: 8,
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

// Contact typed on /quote has to survive a navigation to
// /quote?service=final-delivery. That navigation can remount the form,
// so the four fields are kept in this tab only.
const CONTACT_DRAFT_KEY = "ccw-quote-contact";

type ContactDraft = Pick<FormState, "name" | "company" | "email" | "phone">;

const EMPTY_CONTACT: ContactDraft = {
  name: "",
  company: "",
  email: "",
  phone: "",
};

function readContactDraft(): ContactDraft {
  if (typeof window === "undefined") return EMPTY_CONTACT;
  try {
    const raw = window.sessionStorage.getItem(CONTACT_DRAFT_KEY);
    if (!raw) return EMPTY_CONTACT;
    const parsed = JSON.parse(raw) as Partial<ContactDraft>;
    return {
      name: typeof parsed.name === "string" ? parsed.name : "",
      company: typeof parsed.company === "string" ? parsed.company : "",
      email: typeof parsed.email === "string" ? parsed.email : "",
      phone: typeof parsed.phone === "string" ? parsed.phone : "",
    };
  } catch {
    return EMPTY_CONTACT;
  }
}

function rememberContact(key: keyof ContactDraft, value: string) {
  if (typeof window === "undefined") return;
  const next = { ...readContactDraft(), [key]: value };
  window.sessionStorage.setItem(CONTACT_DRAFT_KEY, JSON.stringify(next));
}

function clearContactDraft() {
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem(CONTACT_DRAFT_KEY);
}

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
  deliveryStreet: "",
  deliveryCity: "",
  deliveryState: "",
  deliveryZip: "",
  deliveryLocation: "",
  dockOrForklift: "",
  liftgate: "",
  appointment: "",
  itNumber: "",
  palletCount: "",
  palletDimensions: "",
  totalWeight: "",
};

const FIELD_IDS: Record<keyof FinalDeliveryFieldErrors, string> = {
  name: "name",
  email: "email",
  deliveryStreet: "delivery-street",
  deliveryCity: "delivery-city",
  deliveryState: "delivery-state",
  deliveryZip: "delivery-zip",
};

type SingleField =
  | "volume"
  | "timing"
  | "terminal"
  | "deliveryLocation"
  | "dockOrForklift"
  | "liftgate"
  | "appointment";

function generalPayload(form: FormState) {
  return {
    name: form.name,
    company: form.company,
    email: form.email,
    phone: form.phone,
    services: form.services,
    cargoTypes: form.cargoTypes,
    volume: form.volume,
    timing: form.timing,
    terminal: form.terminal,
    notes: form.notes,
  };
}

function deliveryPayload(form: FormState) {
  return {
    name: form.name,
    company: form.company,
    email: form.email,
    phone: form.phone,
    services: [FINAL_DELIVERY_SERVICE],
    cargoTypes: [] as string[],
    volume: "",
    timing: "",
    terminal: "",
    notes: form.notes,
    deliveryStreet: form.deliveryStreet,
    deliveryCity: form.deliveryCity,
    deliveryState: form.deliveryState,
    deliveryZip: form.deliveryZip,
    deliveryLocation: form.deliveryLocation,
    dockOrForklift: form.dockOrForklift,
    liftgate: form.liftgate,
    appointment: form.appointment,
    itNumber: form.itNumber,
    palletCount: form.palletCount,
    palletDimensions: form.palletDimensions,
    totalWeight: form.totalWeight,
  };
}

export default function QuoteForm({
  preselectFinalDelivery = false,
}: {
  preselectFinalDelivery?: boolean;
}) {
  const router = useRouter();
  const priorServices = useRef<string[] | null>(null);
  const [mode, setMode] = useState<"quote" | "delivery">(
    preselectFinalDelivery ? "delivery" : "quote",
  );
  // The page can change ?service= without remounting this form. Follow that
  // flag only. Contact fields, chips, and the shipment-details toggle stay.
  useEffect(() => {
    setMode(preselectFinalDelivery ? "delivery" : "quote");
  }, [preselectFinalDelivery]);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY);
  useEffect(() => {
    const saved = readContactDraft();
    if (!saved.name && !saved.company && !saved.email && !saved.phone) return;
    setForm((prev) => ({
      ...prev,
      name: prev.name || saved.name,
      company: prev.company || saved.company,
      email: prev.email || saved.email,
      phone: prev.phone || saved.phone,
    }));
  }, []);
  const [fieldErrors, setFieldErrors] = useState<FinalDeliveryFieldErrors>({});
  const [formError, setFormError] = useState("");
  const [status, setStatus] = useState<
    "idle" | "submitting" | "submitted" | "error"
  >("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    if (
      key === "name" ||
      key === "company" ||
      key === "email" ||
      key === "phone"
    ) {
      rememberContact(key, String(value));
    }
    setForm((prev) => ({ ...prev, [key]: value }));
    setFieldErrors((prev) => {
      const field = key as keyof FinalDeliveryFieldErrors;
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const toggleMulti = (key: "services" | "cargoTypes", value: string) => {
    setForm((prev) => {
      const set = new Set(prev[key]);
      if (set.has(value)) set.delete(value);
      else set.add(value);
      return { ...prev, [key]: Array.from(set) };
    });
  };

  const setSingle = (key: SingleField, value: string) =>
    setForm((prev) => ({ ...prev, [key]: prev[key] === value ? "" : value }));

  const finalDelivery = mode === "delivery";

  const enterDelivery = () => {
    setForm((prev) => {
      priorServices.current = prev.services.filter(
        (service) => service !== FINAL_DELIVERY_SERVICE,
      );
      return prev;
    });
    setMode("delivery");
    setFieldErrors({});
    setFormError("");
    router.replace(FINAL_DELIVERY_QUOTE_HREF, { scroll: false });
  };

  const leaveDelivery = () => {
    setForm((prev) => ({
      ...prev,
      services: priorServices.current ?? prev.services,
    }));
    priorServices.current = null;
    setMode("quote");
    setFieldErrors({});
    setFormError("");
    router.replace("/quote", { scroll: false });
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (finalDelivery) {
      const errors = finalDeliveryFieldErrors(form);
      if (Object.keys(errors).length > 0) {
        setFieldErrors(errors);
        setFormError(
          "Add your name, email, and the full delivery address to send this request.",
        );
        setStatus("idle");
        const first = (Object.keys(errors) as (keyof FinalDeliveryFieldErrors)[])[0];
        document.getElementById(FIELD_IDS[first])?.focus();
        return;
      }
    }
    setFieldErrors({});
    setFormError("");
    setStatus("submitting");
    setErrorMsg("");

    // Form state is left as the visitor typed it. Success replaces the
    // form; a failed send stays on this screen with those values.
    const fail = (message: string) => {
      setStatus("error");
      setErrorMsg(message);
    };

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalDelivery ? deliveryPayload(form) : generalPayload(form)),
      });
      let body: { ok?: unknown } | null = null;
      try {
        body = (await res.json()) as { ok?: unknown };
      } catch {
        body = null;
      }
      if (!res.ok || !body || body.ok !== true) {
        fail("We couldn't send this request. Your details are still here.");
        return;
      }
      clearContactDraft();
      setStatus("submitted");
    } catch {
      fail("We couldn't send this request. Your details are still here.");
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

  const sendError =
    status === "error" && errorMsg ? (
      <div
        id="quote-send-error"
        role="alert"
        style={{ flexBasis: "100%", display: "grid", gap: 12 }}
      >
        <p style={{ ...errorText, marginTop: 0 }}>{errorMsg}</p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <button
            type="submit"
            className="cta-secondary"
            style={{ ...buttonSecondary, minHeight: 48 }}
          >
            Retry
          </button>
          <a
            href={`mailto:${QUOTE_INBOX}`}
            className="footer-link"
            style={{
              fontFamily: fonts.body,
              fontSize: 15,
              fontWeight: 600,
              color: colors.accentDeep,
            }}
          >
            {QUOTE_INBOX}
          </a>
        </div>
      </div>
    ) : null;

  if (finalDelivery) {
    return (
      <form
        onSubmit={onSubmit}
        style={{
          ...cardStyle,
          padding: 28,
          display: "grid",
          gap: 28,
          border: `1px solid ${colors.accent}`,
          borderTop: `4px solid ${colors.accent}`,
        }}
        noValidate
      >
        <div>
          <div style={eyebrow}>Freight already coming through C&amp;C</div>
          <h2
            style={{
              fontFamily: fonts.heading,
              fontSize: 26,
              fontWeight: 700,
              marginTop: 8,
            }}
          >
            Final delivery
          </h2>
          <p style={{ ...sectionHint, fontSize: 15, maxWidth: 560 }}>
            A short request. Name, email, and the full delivery address are
            required. Everything else can wait.
          </p>
          <button
            type="button"
            id="back-to-general-quote"
            onClick={leaveDelivery}
            style={{
              marginTop: 12,
              padding: 0,
              border: 0,
              background: "transparent",
              fontFamily: fonts.body,
              fontSize: 15,
              fontWeight: 600,
              color: colors.accentDeep,
              cursor: "pointer",
              textDecoration: "underline",
              textUnderlineOffset: 3,
            }}
          >
            Back to a general quote
          </button>
        </div>

        <fieldset style={fieldsetStyle}>
          <legend style={{ ...sectionTitle, marginBottom: 4 }}>
            Contact and destination
          </legend>
          <div
            className="quote-grid-2"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 16,
              marginTop: 18,
            }}
          >
            <DeliveryInput
              id="name"
              label="Full name"
              required
              autoComplete="name"
              value={form.name}
              error={fieldErrors.name}
              onChange={(value) => update("name", value)}
            />
            <DeliveryInput
              id="email"
              label="Email"
              required
              type="email"
              autoComplete="email"
              value={form.email}
              error={fieldErrors.email}
              onChange={(value) => update("email", value)}
            />
            <DeliveryInput
              id="company"
              label="Company"
              autoComplete="organization"
              value={form.company}
              onChange={(value) => update("company", value)}
            />
            <DeliveryInput
              id="phone"
              label="Phone"
              type="tel"
              autoComplete="tel"
              value={form.phone}
              onChange={(value) => update("phone", value)}
            />
          </div>
          <div style={{ display: "grid", gap: 16, marginTop: 16 }}>
            <DeliveryInput
              id="delivery-street"
              label="Street address"
              required
              autoComplete="street-address"
              value={form.deliveryStreet}
              error={fieldErrors.deliveryStreet}
              onChange={(value) => update("deliveryStreet", value)}
            />
            <div
              className="quote-grid-address"
              style={{
                display: "grid",
                gridTemplateColumns: "1.4fr 0.6fr 0.8fr",
                gap: 16,
              }}
            >
              <DeliveryInput
                id="delivery-city"
                label="City"
                required
                autoComplete="address-level2"
                value={form.deliveryCity}
                error={fieldErrors.deliveryCity}
                onChange={(value) => update("deliveryCity", value)}
              />
              <DeliveryInput
                id="delivery-state"
                label="State"
                required
                autoComplete="address-level1"
                value={form.deliveryState}
                error={fieldErrors.deliveryState}
                onChange={(value) => update("deliveryState", value)}
              />
              <DeliveryInput
                id="delivery-zip"
                label="ZIP"
                required
                autoComplete="postal-code"
                value={form.deliveryZip}
                error={fieldErrors.deliveryZip}
                onChange={(value) => update("deliveryZip", value)}
              />
            </div>
          </div>
        </fieldset>

        <fieldset style={fieldsetStyle}>
          <legend style={{ ...sectionTitle, marginBottom: 4 }}>
            At the delivery site
          </legend>
          <p style={sectionHint}>Optional. Not sure is a fine answer.</p>
          <div style={{ display: "grid", gap: 16, marginTop: 18 }}>
            <ChoiceGroup
              label="Business or residential"
              options={DELIVERY_LOCATION_OPTIONS}
              value={form.deliveryLocation}
              onToggle={(value) => setSingle("deliveryLocation", value)}
            />
            <ChoiceGroup
              label="Dock or forklift available"
              options={YES_NO_UNSURE_OPTIONS}
              value={form.dockOrForklift}
              onToggle={(value) => setSingle("dockOrForklift", value)}
            />
            <ChoiceGroup
              label="Liftgate needed"
              options={YES_NO_UNSURE_OPTIONS}
              value={form.liftgate}
              onToggle={(value) => setSingle("liftgate", value)}
            />
            <ChoiceGroup
              label="Appointment needed"
              options={YES_NO_UNSURE_OPTIONS}
              value={form.appointment}
              onToggle={(value) => setSingle("appointment", value)}
            />
          </div>
        </fieldset>

        <div>
          <button
            type="button"
            id="shipment-details-toggle"
            aria-expanded={detailsOpen}
            aria-controls="shipment-details"
            onClick={() => setDetailsOpen((open) => !open)}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
              minHeight: 48,
              padding: "12px 14px",
              fontFamily: fonts.heading,
              fontSize: 15,
              fontWeight: 600,
              color: colors.ink,
              background: colors.paperDeep,
              border: `1px solid ${colors.line}`,
              borderRadius: radii.md,
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            <span>
              Shipment details
              <span style={{ ...optionalMark, display: "inline" }}>
                optional
              </span>
            </span>
            <span aria-hidden="true">{detailsOpen ? "Hide" : "Add"}</span>
          </button>
          {detailsOpen ? (
            <div
              id="shipment-details"
              role="region"
              aria-labelledby="shipment-details-toggle"
              style={{ display: "grid", gap: 16, marginTop: 16 }}
            >
              <div
                className="quote-grid-2"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 16,
                }}
              >
                <DeliveryInput
                  id="it-number"
                  label="IT number"
                  autoComplete="off"
                  value={form.itNumber}
                  onChange={(value) => update("itNumber", value)}
                />
                <DeliveryInput
                  id="pallet-count"
                  label="Pallet count"
                  inputMode="numeric"
                  value={form.palletCount}
                  onChange={(value) => update("palletCount", value)}
                />
                <DeliveryInput
                  id="pallet-dimensions"
                  label="Pallet dimensions"
                  value={form.palletDimensions}
                  onChange={(value) => update("palletDimensions", value)}
                />
                <DeliveryInput
                  id="total-weight"
                  label="Total weight"
                  value={form.totalWeight}
                  onChange={(value) => update("totalWeight", value)}
                />
              </div>
              <div>
                <label htmlFor="delivery-notes" style={labelStyle}>
                  Notes
                  <span style={optionalMark}>optional</span>
                </label>
                <textarea
                  id="delivery-notes"
                  value={form.notes}
                  onChange={(e) => update("notes", e.target.value)}
                  rows={4}
                  style={{ ...inputStyle, resize: "vertical", minHeight: 96 }}
                />
              </div>
            </div>
          ) : null}
        </div>

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
              minHeight: 48,
              opacity: status === "submitting" ? 0.7 : 1,
              cursor: status === "submitting" ? "wait" : "pointer",
            }}
          >
            {status === "submitting" ? "Sending…" : "Request delivery quote"}
          </button>
          {formError ? (
            <span id="quote-form-error" role="alert" style={errorText}>
              {formError}
            </span>
          ) : null}
          {sendError}
        </div>
      </form>
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
      <div
        style={{
          background: colors.paperDeep,
          borderLeft: `4px solid ${colors.accent}`,
          borderRadius: radii.md,
          padding: "16px 18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <div>
          <div style={eyebrow}>Freight already coming through C&amp;C</div>
          <p style={{ ...sectionHint, marginTop: 6 }}>
            Request final delivery instead of a warehousing quote.
          </p>
        </div>
        <button
          type="button"
          id="switch-to-final-delivery"
          className="cta-secondary"
          onClick={enterDelivery}
          style={{ ...buttonSecondary, minHeight: 48 }}
        >
          Request final delivery
        </button>
      </div>

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
              aria-invalid={fieldErrors.name ? true : undefined}
              aria-describedby={fieldErrors.name ? "name-error" : undefined}
              style={
                fieldErrors.name
                  ? { ...inputStyle, borderColor: colors.accentDeep }
                  : inputStyle
              }
            />
            {fieldErrors.name ? (
              <p id="name-error" style={errorText}>
                {fieldErrors.name}
              </p>
            ) : null}
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
              aria-invalid={fieldErrors.email ? true : undefined}
              aria-describedby={fieldErrors.email ? "email-error" : undefined}
              style={
                fieldErrors.email
                  ? { ...inputStyle, borderColor: colors.accentDeep }
                  : inputStyle
              }
            />
            {fieldErrors.email ? (
              <p id="email-error" style={errorText}>
                {fieldErrors.email}
              </p>
            ) : null}
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
        {formError ? (
          <span id="quote-form-error" role="alert" style={errorText}>
            {formError}
          </span>
        ) : null}
        {sendError}
      </div>
    </form>
  );
}

function DeliveryInput({
  id,
  label,
  value,
  onChange,
  required,
  error,
  autoComplete,
  inputMode,
  type = "text",
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
  autoComplete?: string;
  inputMode?: "numeric" | "text" | "email" | "tel";
  type?: "text" | "email" | "tel";
}) {
  return (
    <div>
      <label htmlFor={id} style={labelStyle}>
        {label}
        <span style={optionalMark}>{required ? "required" : "optional"}</span>
      </label>
      <input
        id={id}
        type={type}
        required={required}
        maxLength={200}
        autoComplete={autoComplete}
        inputMode={inputMode}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        style={
          error ? { ...inputStyle, borderColor: colors.accentDeep } : inputStyle
        }
      />
      {error ? (
        <p id={`${id}-error`} style={errorText}>
          {error}
        </p>
      ) : null}
    </div>
  );
}

function ChoiceGroup({
  label,
  options,
  value,
  onToggle,
}: {
  label: string;
  options: readonly string[];
  value: string;
  onToggle: (value: string) => void;
}) {
  return (
    <div>
      <div style={labelStyle}>
        {label}
        <span style={optionalMark}>optional</span>
      </div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 8,
        }}
      >
        {options.map((option) => (
          <Chip
            key={option}
            label={option}
            selected={value === option}
            onToggle={() => onToggle(option)}
          />
        ))}
      </div>
    </div>
  );
}
