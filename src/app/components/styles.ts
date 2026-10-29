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

// Hours already published in layout JSON-LD (08:00–16:30) and on /contact.
export const businessHours = {
  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  opens: "08:00",
  closes: "16:30",
  display: "Monday–Friday, 8:00 a.m. to 4:30 p.m.",
};

// Primary building. Drive lines match the Ladson card on /facility exactly
// (`distance` + `route`). `name` / `about` match the longer terminal names
// and "about N miles" wording already used on /faq.
export const ladsonLocation = {
  path: "/locations/ladson-sc",
  label: "Ladson (primary)",
  facilityName: "Ladson facility",
  badge: "Primary",
  street: "137 Acres Drive",
  city: "Ladson",
  state: "SC",
  postal: "29456",
  sqft: "60,000",
  image: "/images/facility-exterior.webp",
  imageAlt: "C&C Warehouse exterior in Ladson, SC",
  geo: { latitude: 32.9837, longitude: -80.1062 },
  drives: [
    {
      label: "Wando Welch",
      name: "Wando Welch",
      distance: "~24 miles",
      about: "about 24 miles",
      route: "short-haul drayage via I-526.",
      road: "I-526",
    },
    {
      label: "NCT",
      name: "North Charleston Terminal",
      distance: "~14 miles",
      about: "about 14 miles",
      route: "quick run down I-26.",
      road: "I-26",
    },
    {
      label: "Leatherman",
      name: "Hugh K. Leatherman",
      distance: "~14 miles",
      about: "about 14 miles",
      route: "direct access off I-26.",
      road: "I-26",
    },
    {
      label: "Inland Port Greer",
      name: "Inland Port Greer",
      distance: "~199 miles",
      about: "about 199 miles",
      route: "I-26 straight shot upstate.",
      road: "I-26",
    },
  ],
};

// Secondary building. Drive lines match the Hanahan card on /facility
// exactly (`distance` + `route`). `name` / `about` match the longer
// terminal names and "about N miles" wording already used on /faq.
export const hanahanLocation = {
  path: "/locations/hanahan-sc",
  label: "Hanahan",
  facilityName: "Hanahan facility",
  badge: "Secondary",
  street: "1014 Northpointe Industrial Blvd",
  city: "Hanahan",
  state: "SC",
  postal: "29410",
  sqft: "30,000",
  image: "/images/facility-interior.webp",
  imageAlt: "C&C Warehouse interior floor with racked inventory",
  geo: { latitude: 32.9182, longitude: -79.9928 },
  drives: [
    {
      label: "Wando Welch",
      name: "Wando Welch",
      distance: "~16 miles",
      about: "about 16 miles",
      route: "across I-526.",
      detail: "across I-526",
    },
    {
      label: "NCT",
      name: "North Charleston Terminal",
      distance: "~7 miles",
      about: "about 7 miles",
      route: "minutes away.",
      detail: "minutes away",
    },
    {
      label: "Leatherman",
      name: "Hugh K. Leatherman",
      distance: "~6 miles",
      about: "about 6 miles",
      route: "the closest terminal to this facility.",
      detail: "the closest terminal to this facility",
    },
    {
      label: "Inland Port Greer",
      name: "Inland Port Greer",
      distance: "~201 miles",
      about: "about 201 miles",
      route: "I-26 upstate.",
      detail: "I-26 upstate",
    },
  ],
};

// Guide that restates the terminal miles already published on /facility
// and /faq. Distances stay on the location objects above.
export const terminalsGuidePath = "/guides/port-of-charleston-terminals";

// The ten services on the homepage, in that order.
export const serviceLinks: { label: string; href: string }[] = [
  { label: "Bonded storage", href: "/services/bonded-storage" },
  { label: "General Order (GO) storage", href: "/services/general-order" },
  { label: "Devanning", href: "/services/devanning" },
  { label: "Overweight container reworking", href: "/services/overweight-reworking" },
  { label: "Drayage", href: "/services/drayage" },
  { label: "Cross-dock", href: "/services/cross-dock" },
  { label: "Deconsolidation", href: "/services/deconsolidation" },
  { label: "WMS-tracked inventory", href: "/services/wms" },
  { label: "Pick & pack", href: "/services/pick-pack" },
  { label: "Amazon FBA prep", href: "/services/fba-prep" },
];

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
  city: ladsonLocation.city,
  state: ladsonLocation.state,
  postal: ladsonLocation.postal,
  phone: "+1-843-818-2332",
  phoneDisplay: "(843) 818-2332",
  email: "information@candcwarehouse.com",
  portalUrl: "https://portal.candcwarehouse.com",
  portalHost: "portal.candcwarehouse.com",
  teamExperienceYears: 50,
  facilities: [
    {
      label: ladsonLocation.label,
      street: ladsonLocation.street,
      city: ladsonLocation.city,
      state: ladsonLocation.state,
      postal: ladsonLocation.postal,
      path: ladsonLocation.path,
    },
    {
      label: hanahanLocation.label,
      street: hanahanLocation.street,
      city: hanahanLocation.city,
      state: hanahanLocation.state,
      postal: hanahanLocation.postal,
      path: hanahanLocation.path,
    },
  ],
};
