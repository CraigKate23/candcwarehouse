import type { CSSProperties } from "react";

// C&C Warehouse design system — mirrors the sketches Greg shared.
// Warm, paper-based palette with an orange accent that's used sparingly
// for emphasis and CTAs. Inspired by the original hand-drawn mockups.

export const colors = {
  paper: "#fafaf7",
  paperDeep: "#f3efe7",
  ink: "#0b1a2b",
  inkSoft: "#233447",
  steel: "#3a566f",
  steelLight: "#6c7f92",
  accent: "#d96a2c",
  accentDeep: "#b8561f",
  line: "rgba(11, 26, 43, 0.12)",
  lineSoft: "rgba(11, 26, 43, 0.06)",
  mute: "#6c7f92",
  ok: "#2f7d4f",
  warn: "#c07a1f",
};

export const fonts = {
  heading: "'Space Grotesk', ui-sans-serif, system-ui, -apple-system, sans-serif",
  body: "'IBM Plex Sans', ui-sans-serif, system-ui, -apple-system, sans-serif",
  mono: "'DM Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
};

export const radii = {
  sm: 6,
  md: 10,
  lg: 16,
  xl: 22,
};

export const shadow = {
  soft: "0 1px 2px rgba(11,26,43,0.04), 0 6px 24px rgba(11,26,43,0.06)",
  lift: "0 2px 4px rgba(11,26,43,0.05), 0 10px 32px rgba(11,26,43,0.08)",
};

export const container: CSSProperties = {
  maxWidth: 1120,
  margin: "0 auto",
  padding: "0 24px",
};

export const buttonPrimary: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  padding: "12px 22px",
  fontFamily: fonts.heading,
  fontSize: 15,
  fontWeight: 600,
  letterSpacing: "0.01em",
  color: colors.paper,
  background: colors.accent,
  border: `1px solid ${colors.accentDeep}`,
  borderRadius: radii.md,
  cursor: "pointer",
  textDecoration: "none",
  transition: "transform 120ms ease, background 120ms ease",
};

export const buttonSecondary: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  padding: "12px 22px",
  fontFamily: fonts.heading,
  fontSize: 15,
  fontWeight: 600,
  letterSpacing: "0.01em",
  color: colors.ink,
  background: "transparent",
  border: `1px solid ${colors.ink}`,
  borderRadius: radii.md,
  cursor: "pointer",
  textDecoration: "none",
  transition: "background 120ms ease, color 120ms ease",
};

export const eyebrow: CSSProperties = {
  fontFamily: fonts.mono,
  fontSize: 12,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: colors.accent,
};

export const cardStyle: CSSProperties = {
  background: colors.paper,
  border: `1px solid ${colors.line}`,
  borderRadius: radii.lg,
  padding: 28,
  boxShadow: shadow.soft,
};

// Business constants used across the site. Keep verifiable facts here.
// Anything still unknown stays as a placeholder so missing data is obvious.
export const business = {
  name: "C&C Warehouse",
  legalName: "C&C Warehouse and Distribution LLC",
  tagline: "US Customs Bonded & General Order warehousing near the Port of Charleston.",
  // Homepage meta description. Kept near 155 characters so the phone
  // number is inside the snippet Google usually shows. Facts match the
  // rest of the site: Class 3, GO, both cities, port, three services.
  metaDescription:
    "Family-run CBP Class 3 bonded and GO warehouse in Ladson & Hanahan, SC, near the Port of Charleston. Devanning, overweight rework, drayage. (843) 818-2332.",
  foundedYear: 1998,
  city: "Ladson",
  state: "SC",
  postal: "29456",
  phone: "+1-843-818-2332",
  phoneDisplay: "(843) 818-2332",
  email: "information@candcwarehouse.com",
  teamExperienceYears: 50,
  facilities: [
    {
      label: "Ladson (primary)",
      street: "137 Acres Drive",
      city: "Ladson",
      state: "SC",
      postal: "29456",
    },
    {
      label: "Hanahan",
      street: "1014 Northpointe Industrial Blvd",
      city: "Hanahan",
      state: "SC",
      postal: "29410",
    },
  ],
};
