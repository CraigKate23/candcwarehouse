import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "../components/service-blocks";
import { locationsHubJsonLd } from "../components/structured-data";
import {
  business,
  buttonPrimary,
  buttonSecondary,
  cardStyle,
  colors,
  container,
  eyebrow,
  fonts,
  hanahanLocation,
  ladsonLocation,
  locationsPath,
  terminalsGuidePath,
} from "../components/styles";

const PATH = locationsPath;
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.candcwarehouse.com";

const TITLE =
  "Charleston Area Warehouse Locations | Ladson & Hanahan | C&C";
const DESCRIPTION = `Two operating warehouses in the Charleston metro, not space for lease. ${ladsonLocation.badge} building: ${ladsonLocation.sqft} sq ft in ${ladsonLocation.city}. ${hanahanLocation.badge} building: ${hanahanLocation.sqft} sq ft in ${hanahanLocation.city}.`;
const H1 = `Warehouse locations in ${ladsonLocation.city} and ${hanahanLocation.city}, ${ladsonLocation.state}`;

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    type: "website",
    siteName: business.name,
    locale: "en_US",
    url: PATH,
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: `${business.name} warehouses in ${ladsonLocation.city} and ${hanahanLocation.city}, ${ladsonLocation.state}`,
      },
    ],
  },
};

const pageJsonLd = locationsHubJsonLd(SITE_URL, {
  name: TITLE,
  description: DESCRIPTION,
  listName: H1,
});

const linkStyle = {
  color: colors.accent,
  textDecoration: "underline",
} as const;

const buildings = [ladsonLocation, hanahanLocation] as const;

export default function LocationsPage() {
  return (
    <>
      <JsonLd id="locations-jsonld" data={pageJsonLd} />

      <section
        style={{
          padding: "88px 0 56px",
          background: "linear-gradient(180deg, #fafaf7 0%, #f3efe7 100%)",
          borderBottom: `1px solid ${colors.line}`,
        }}
      >
        <div style={container}>
          <nav
            aria-label="Breadcrumb"
            style={{
              fontFamily: fonts.mono,
              fontSize: 12,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: colors.steel,
              marginBottom: 18,
            }}
          >
            <Link href="/" style={{ color: colors.steel, textDecoration: "none" }}>
              Home
            </Link>
            <span style={{ margin: "0 10px", color: colors.line }}>/</span>
            <span style={{ color: colors.accent }}>Locations</span>
          </nav>

          <div style={eyebrow}>Charleston metro</div>
          <h1
            style={{
              fontFamily: fonts.heading,
              fontSize: "clamp(36px, 5vw, 56px)",
              lineHeight: 1.08,
              fontWeight: 700,
              marginTop: 16,
              maxWidth: 880,
            }}
          >
            {H1}
          </h1>
          <p
            style={{
              fontFamily: fonts.body,
              fontSize: 18,
              lineHeight: 1.65,
              color: colors.steel,
              marginTop: 18,
              maxWidth: 760,
            }}
          >
            {business.name} operates two warehouses in the Charleston metro:
            the{" "}
            <Link href={ladsonLocation.path} style={linkStyle}>
              {ladsonLocation.query}
            </Link>{" "}
            and the{" "}
            <Link href={hanahanLocation.path} style={linkStyle}>
              {hanahanLocation.query}
            </Link>
            . These are operating warehouses, not a commercial listing of
            space for lease. The company has been family-run since{" "}
            {business.foundedYear}.
          </p>
          <p
            style={{
              fontFamily: fonts.body,
              fontSize: 18,
              lineHeight: 1.65,
              color: colors.steel,
              marginTop: 14,
              maxWidth: 760,
            }}
          >
            {business.name} is a CBP Class 3 bonded warehouse — an
            importer&apos;s private bonded warehouse — and a CBP-designated
            General Order facility in {ladsonLocation.city} and{" "}
            {hanahanLocation.city}.
          </p>
          <p
            style={{
              fontFamily: fonts.body,
              fontSize: 18,
              lineHeight: 1.65,
              color: colors.steel,
              marginTop: 14,
              maxWidth: 760,
            }}
          >
            The two-building overview lives on the{" "}
            <Link href="/facility" style={linkStyle}>
              facility page
            </Link>
            . Published drive distances for both buildings are also on the{" "}
            <Link href={terminalsGuidePath} style={linkStyle}>
              Port of Charleston terminals
            </Link>{" "}
            guide. The services already listed on the site are on the{" "}
            <Link href="/services" style={linkStyle}>
              services page
            </Link>
            . To ask about a load, use the{" "}
            <Link href="/quote" style={linkStyle}>
              quote form
            </Link>
            .
          </p>
          <div
            style={{
              display: "flex",
              gap: 12,
              marginTop: 28,
              flexWrap: "wrap",
            }}
          >
            <Link href="/quote" className="cta-primary" style={buttonPrimary}>
              Request a quote
            </Link>
            <Link
              href="/services"
              className="cta-secondary"
              style={buttonSecondary}
            >
              See what we do
            </Link>
          </div>
        </div>
      </section>

      <section style={{ padding: "72px 0 40px" }}>
        <div style={container}>
          <div style={eyebrow}>The two buildings</div>
          <div
            style={{
              marginTop: 28,
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 440px), 1fr))",
              gap: 28,
            }}
          >
            {buildings.map((location) => (
              <LocationCard key={location.path} location={location} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function LocationCard({
  location,
}: {
  location: (typeof buildings)[number];
}) {
  return (
    <article
      style={{
        ...cardStyle,
        padding: 0,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Image
        src={location.image}
        alt={location.imageAlt}
        width={1500}
        height={747}
        style={{
          width: "100%",
          height: 220,
          objectFit: "cover",
          display: "block",
          borderBottom: `1px solid ${colors.line}`,
        }}
      />
      <div style={{ padding: 28, display: "flex", flexDirection: "column", flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <h2
            style={{
              fontFamily: fonts.heading,
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            {location.facilityName}
          </h2>
          <span
            style={{
              fontFamily: fonts.mono,
              fontSize: 11,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: colors.accent,
              border: `1px solid ${colors.accent}`,
              borderRadius: 4,
              padding: "2px 8px",
            }}
          >
            {location.badge} building
          </span>
        </div>
        <address
          style={{
            fontFamily: fonts.body,
            fontSize: 15,
            fontStyle: "normal",
            color: colors.steel,
            marginTop: 8,
            lineHeight: 1.5,
          }}
        >
          {location.street}
          <br />
          {location.city}, {location.state} {location.postal}
        </address>
        <p
          style={{
            fontFamily: fonts.heading,
            fontSize: 32,
            fontWeight: 700,
            color: colors.ink,
            marginTop: 16,
          }}
        >
          {location.sqft} sq ft
        </p>
        <Link
          href={location.path}
          style={{
            display: "inline-block",
            marginTop: 16,
            fontFamily: fonts.heading,
            fontSize: 18,
            fontWeight: 700,
            color: colors.accent,
            textDecoration: "underline",
            textUnderlineOffset: 3,
          }}
        >
          {location.query}
        </Link>
        <h3
          style={{
            fontFamily: fonts.heading,
            fontSize: 16,
            fontWeight: 600,
            marginTop: 26,
          }}
        >
          Published drive distances
        </h3>
        <p
          style={{
            fontFamily: fonts.body,
            fontSize: 14,
            lineHeight: 1.5,
            color: colors.steel,
            marginTop: 6,
          }}
        >
          Published drive distances from this address.
        </p>
        <dl
          style={{
            marginTop: 14,
            display: "grid",
            gap: 10,
            marginBlockEnd: 0,
          }}
        >
          {location.drives.map((drive) => (
            <div key={drive.label}>
              <dt
                style={{
                  fontFamily: fonts.heading,
                  fontSize: 15,
                  fontWeight: 600,
                  color: colors.ink,
                }}
              >
                {drive.name}
              </dt>
              <dd
                style={{
                  margin: "2px 0 0",
                  fontFamily: fonts.body,
                  fontSize: 14,
                  lineHeight: 1.45,
                  color: colors.steel,
                }}
              >
                {drive.distance} — {drive.route}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </article>
  );
}
