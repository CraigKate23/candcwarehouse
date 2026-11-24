import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "../components/service-blocks";
import { guidesHubJsonLd } from "../components/structured-data";
import {
  business,
  buttonPrimary,
  buttonSecondary,
  cardStyle,
  colors,
  container,
  eyebrow,
  fonts,
  guides,
  guidesPath,
  hanahanLocation,
  ladsonLocation,
  threePlPath,
} from "../components/styles";

const PATH = guidesPath;
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.candcwarehouse.com";

const TITLE = "Port of Charleston Importer Guides | C&C Warehouse";
const DESCRIPTION =
  "Importer guides for the Port of Charleston: terminal distances, Amazon FBA, General Order, transloading, and container deconsolidation at C&C.";
const H1 = "Port of Charleston importer guides";

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
        alt: `${business.name} importer guides for the Port of Charleston`,
      },
    ],
  },
};

const pageJsonLd = guidesHubJsonLd(SITE_URL, {
  name: TITLE,
  description: DESCRIPTION,
  listName: H1,
});

const linkStyle = {
  color: colors.accent,
  textDecoration: "underline",
} as const;

export default function GuidesPage() {
  return (
    <>
      <JsonLd id="guides-jsonld" data={pageJsonLd} />

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
            <span style={{ color: colors.accent }}>Guides</span>
          </nav>

          <div style={eyebrow}>Importer guides</div>
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
            {business.name}, family-run since {business.foundedYear}, keeps
            two buildings in the Charleston metro: the{" "}
            <Link href={ladsonLocation.path} style={linkStyle}>
              {ladsonLocation.query}
            </Link>{" "}
            and the{" "}
            <Link href={hanahanLocation.path} style={linkStyle}>
              {hanahanLocation.query}
            </Link>
            . The guides below restate facts already published on the service
            and location pages.
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
            The services already listed on the site are on the{" "}
            <Link href="/services" style={linkStyle}>
              services page
            </Link>
            . Both buildings run those services as the{" "}
            <Link href={threePlPath} style={linkStyle}>
              3PL warehouse in Charleston, SC
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
          <div style={eyebrow}>The guides</div>
          <div
            style={{
              marginTop: 28,
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 440px), 1fr))",
              gap: 28,
            }}
          >
            {guides.map((guide) => (
              <GuideCard key={guide.path} guide={guide} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function GuideCard({ guide }: { guide: (typeof guides)[number] }) {
  return (
    <article
      style={{
        ...cardStyle,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div style={eyebrow}>{guide.footerLabel}</div>
      <h2
        style={{
          fontFamily: fonts.heading,
          fontSize: 22,
          fontWeight: 700,
          lineHeight: 1.25,
          marginTop: 12,
        }}
      >
        <Link
          href={guide.path}
          style={{
            color: colors.ink,
            textDecoration: "underline",
            textUnderlineOffset: 3,
          }}
        >
          {guide.title}
        </Link>
      </h2>
      <p
        style={{
          fontFamily: fonts.body,
          fontSize: 16,
          lineHeight: 1.65,
          color: colors.steel,
          marginTop: 12,
        }}
      >
        {guide.summary}
      </p>
      <p
        style={{
          fontFamily: fonts.body,
          fontSize: 15,
          lineHeight: 1.6,
          color: colors.steel,
          marginTop: "auto",
          paddingTop: 18,
        }}
      >
        The service page is{" "}
        <Link href={guide.service.href} style={linkStyle}>
          {guide.service.label}
        </Link>
        .
      </p>
    </article>
  );
}
