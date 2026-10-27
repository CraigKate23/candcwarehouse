import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd, faqJsonLd } from "../../components/service-blocks";
import { ladsonBranchJsonLd } from "../../components/structured-data";
import {
  business,
  businessHours,
  buttonPrimary,
  buttonSecondary,
  colors,
  container,
  eyebrow,
  fonts,
  ladsonLocation,
  serviceLinks,
} from "../../components/styles";

const PATH = ladsonLocation.path;
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.candcwarehouse.com";

const TITLE = "Ladson SC Warehouse | 60,000 sq ft Bonded | C&C";
const DESCRIPTION = `Warehouse in Ladson, SC at ${ladsonLocation.street}: ${ladsonLocation.sqft} sq ft, CBP Class 3 bonded and General Order. Terminal miles, hours, and phone. ${business.phoneDisplay}.`;

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
        alt: `C&C Warehouse primary facility at ${ladsonLocation.street}, ${ladsonLocation.city}, ${ladsonLocation.state}`,
      },
    ],
  },
};

const [wando, nct, leatherman, greer] = ladsonLocation.drives;

const FAQ: { q: string; a: string }[] = [
  {
    q: "Where is the warehouse in Ladson, SC?",
    a: `The primary ${business.name} building is ${ladsonLocation.street}, ${ladsonLocation.city}, ${ladsonLocation.state} ${ladsonLocation.postal}. The building is ${ladsonLocation.sqft} sq ft. Hanahan is a separate address, covered on the facility page.`,
  },
  {
    q: "Is there a bonded warehouse in Ladson, SC?",
    a: `Yes. This Ladson building is a CBP Class 3 bonded warehouse — an importer's private bonded warehouse — and a CBP-designated General Order facility. ${business.name} has been family-run since ${business.foundedYear}.`,
  },
  {
    q: "How far is the Ladson warehouse from the port terminals?",
    a: `Published drive distances from this address: ${wando.name} is ${wando.about}, ${nct.name} is ${nct.about}, ${leatherman.name} is ${leatherman.about}, and ${greer.name} is ${greer.about}.`,
  },
  {
    q: "Which services run from the Ladson facility?",
    a: `${serviceLinks.map((s) => s.label).join(", ")}. Customer inventory is on ${business.portalHost}. Hanahan is the other building when a load is handled there; the phone number is the same.`,
  },
  {
    q: "What are the hours and phone number?",
    a: `${businessHours.display} Call ${business.phoneDisplay} or email ${business.email}. Quotes use the same quote page as the rest of the site.`,
  },
];

const breadcrumb = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Facility",
      item: `${SITE_URL}/facility`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Ladson",
      item: `${SITE_URL}${PATH}`,
    },
  ],
};

const placeJsonLd = {
  "@context": "https://schema.org",
  ...ladsonBranchJsonLd(SITE_URL),
};

const linkStyle = {
  color: colors.accent,
  textDecoration: "underline",
} as const;

export default function LadsonLocationPage() {
  return (
    <>
      <JsonLd id="place-jsonld" data={placeJsonLd} />
      <JsonLd id="faq-jsonld" data={faqJsonLd(FAQ)} />
      <JsonLd id="breadcrumb-jsonld" data={breadcrumb} />

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
            <Link
              href="/facility"
              style={{ color: colors.steel, textDecoration: "none" }}
            >
              Facility
            </Link>
            <span style={{ margin: "0 10px", color: colors.line }}>/</span>
            <span style={{ color: colors.accent }}>Ladson</span>
          </nav>

          <div style={eyebrow}>
            {ladsonLocation.city}, {ladsonLocation.state} · Primary building
          </div>
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
            Warehouse in Ladson, SC
          </h1>
          <p
            style={{
              fontFamily: fonts.heading,
              fontSize: "clamp(20px, 2.4vw, 28px)",
              lineHeight: 1.25,
              fontWeight: 500,
              color: colors.inkSoft,
              marginTop: 14,
              maxWidth: 760,
            }}
          >
            {ladsonLocation.sqft} sq ft at {ladsonLocation.street}. Bonded
            storage and General Order, at the primary address.
          </p>
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
            {business.name}{" "}
            keeps its main floor in Ladson. The building is a
            CBP Class 3 bonded warehouse — an importer&rsquo;s private bonded
            warehouse — and a CBP-designated General Order facility. The
            company has been family-run since {business.foundedYear}, and the
            team carries {business.teamExperienceYears}+ years of combined
            warehouse experience. The Hanahan building is separate; the
            two-building overview lives on the{" "}
            <Link href="/facility" style={linkStyle}>
              facility page
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
            <a
              href={`tel:${business.phone}`}
              className="cta-secondary"
              style={buttonSecondary}
            >
              Call {business.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      <section style={{ padding: "56px 0 16px" }}>
        <div
          className="hero-grid"
          style={{
            ...container,
            display: "grid",
            gridTemplateColumns: "1.15fr 0.85fr",
            gap: 28,
            alignItems: "start",
          }}
        >
          <Image
            src={ladsonLocation.image}
            alt={ladsonLocation.imageAlt}
            width={1500}
            height={746}
            priority
            unoptimized
            style={{
              width: "100%",
              height: "auto",
              borderRadius: 16,
              border: `1px solid ${colors.line}`,
            }}
          />
          <address
            style={{
              background: colors.paper,
              border: `1px solid ${colors.line}`,
              borderRadius: 16,
              padding: 28,
              fontStyle: "normal",
            }}
          >
            <div style={eyebrow}>Visit</div>
            <h2
              style={{
                fontFamily: fonts.heading,
                fontSize: 26,
                fontWeight: 700,
                marginTop: 10,
              }}
            >
              {ladsonLocation.street}
            </h2>
            <p
              style={{
                fontFamily: fonts.body,
                fontSize: 17,
                lineHeight: 1.55,
                color: colors.steel,
                marginTop: 6,
              }}
            >
              {ladsonLocation.city}, {ladsonLocation.state}{" "}
              {ladsonLocation.postal}
            </p>
            <p
              style={{
                fontFamily: fonts.body,
                fontSize: 14,
                color: colors.steel,
                marginTop: 8,
              }}
            >
              {business.legalName}
            </p>
            <dl
              style={{
                marginTop: 22,
                display: "grid",
                gap: 14,
                marginBlockEnd: 0,
              }}
            >
              <div>
                <dt
                  style={{
                    fontFamily: fonts.mono,
                    fontSize: 11,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: colors.accent,
                  }}
                >
                  Phone
                </dt>
                <dd style={{ margin: "4px 0 0" }}>
                  <a
                    href={`tel:${business.phone}`}
                    style={{
                      fontFamily: fonts.heading,
                      fontSize: 20,
                      fontWeight: 700,
                      color: colors.ink,
                    }}
                  >
                    {business.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div>
                <dt
                  style={{
                    fontFamily: fonts.mono,
                    fontSize: 11,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: colors.accent,
                  }}
                >
                  Email
                </dt>
                <dd style={{ margin: "4px 0 0" }}>
                  <a href={`mailto:${business.email}`} style={linkStyle}>
                    {business.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt
                  style={{
                    fontFamily: fonts.mono,
                    fontSize: 11,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: colors.accent,
                  }}
                >
                  Hours
                </dt>
                <dd
                  style={{
                    margin: "4px 0 0",
                    fontFamily: fonts.body,
                    fontSize: 16,
                    color: colors.ink,
                  }}
                >
                  {businessHours.display}
                </dd>
              </div>
              <div>
                <dt
                  style={{
                    fontFamily: fonts.mono,
                    fontSize: 11,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: colors.accent,
                  }}
                >
                  Inventory
                </dt>
                <dd style={{ margin: "4px 0 0" }}>
                  <a href={business.portalUrl} style={linkStyle}>
                    {business.portalHost}
                  </a>
                </dd>
              </div>
            </dl>
          </address>
        </div>
      </section>

      <section style={{ padding: "36px 0 8px" }}>
        <div style={container}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 18,
            }}
          >
            <Fact label="Size" value={`${ladsonLocation.sqft} sq ft`} />
            <Fact label="Bond" value="CBP Class 3" />
            <Fact label="General Order" value="CBP-designated" />
            <Fact label="Family-run since" value={`${business.foundedYear}`} />
          </div>
        </div>
      </section>

      <section style={{ padding: "56px 0" }}>
        <div style={container}>
          <div style={eyebrow}>Services at this address</div>
          <h2
            style={{
              fontFamily: fonts.heading,
              fontSize: "clamp(26px, 3vw, 34px)",
              fontWeight: 700,
              marginTop: 10,
              maxWidth: 720,
            }}
          >
            The same ten services, booked for the Ladson floor.
          </h2>
          <p
            style={{
              fontFamily: fonts.body,
              fontSize: 16.5,
              lineHeight: 1.65,
              color: colors.steel,
              marginTop: 14,
              maxWidth: 720,
            }}
          >
            These are the services already listed on the site. Ladson is the
            primary building for that work. If a shipment is handled in
            Hanahan instead, the list and the phone number do not change.
            Racked pallet positions are published as 3,000+ across both
            buildings, not as a Ladson-only count — see the{" "}
            <Link href="/facility" style={linkStyle}>
              facility page
            </Link>{" "}
            for that combined figure. Fees are not listed here. Ask on the{" "}
            <Link href="/quote" style={linkStyle}>
              quote form
            </Link>{" "}
            or by phone.
          </p>
          <ul
            style={{
              marginTop: 28,
              padding: 0,
              listStyle: "none",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 10,
              maxWidth: 880,
            }}
          >
            {serviceLinks.map((service, i) => (
              <li key={service.href}>
                <Link
                  href={service.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "14px 16px",
                    background: colors.paper,
                    border: `1px solid ${colors.line}`,
                    borderRadius: 12,
                    fontFamily: fonts.heading,
                    fontSize: 16,
                    fontWeight: 600,
                    color: colors.ink,
                    textDecoration: "none",
                  }}
                >
                  <span
                    style={{
                      fontFamily: fonts.mono,
                      fontSize: 12,
                      color: colors.accent,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {service.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        style={{
          padding: "56px 0",
          background: colors.paperDeep,
          borderTop: `1px solid ${colors.line}`,
          borderBottom: `1px solid ${colors.line}`,
        }}
      >
        <div style={container}>
          <div style={eyebrow}>From this building</div>
          <h2
            style={{
              fontFamily: fonts.heading,
              fontSize: "clamp(26px, 3vw, 34px)",
              fontWeight: 700,
              marginTop: 10,
              maxWidth: 720,
            }}
          >
            Published drive distances from Ladson.
          </h2>
          <p
            style={{
              fontFamily: fonts.body,
              fontSize: 16.5,
              lineHeight: 1.65,
              color: colors.steel,
              marginTop: 14,
              maxWidth: 720,
            }}
          >
            These miles are the Ladson figures already published on the site.
            {` ${wando.name} is ${wando.about} on ${wando.road}. ${nct.name} is ${nct.about} on ${nct.road}. ${leatherman.name} is ${leatherman.about} on ${leatherman.road}. ${greer.name} is ${greer.about} on ${greer.road}.`}{" "}
            Hanahan&rsquo;s shorter terminal runs are a different set of
            numbers and stay on the{" "}
            <Link href="/facility" style={linkStyle}>
              facility page
            </Link>
            . Drayage from these terminals is the{" "}
            <Link href="/services/drayage" style={linkStyle}>
              drayage service
            </Link>
            .
          </p>
          <dl
            style={{
              marginTop: 28,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: 14,
              marginBlockEnd: 0,
            }}
          >
            {ladsonLocation.drives.map((drive) => (
              <div
                key={drive.label}
                style={{
                  background: colors.paper,
                  border: `1px solid ${colors.line}`,
                  borderRadius: 12,
                  padding: 18,
                }}
              >
                <dt
                  style={{
                    fontFamily: fonts.heading,
                    fontSize: 16,
                    fontWeight: 600,
                    color: colors.ink,
                  }}
                >
                  {drive.name}
                </dt>
                <dd
                  style={{
                    margin: "8px 0 0",
                    fontFamily: fonts.body,
                    fontSize: 15,
                    lineHeight: 1.5,
                    color: colors.steel,
                  }}
                >
                  {drive.about}
                  <br />
                  {drive.road}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section style={{ padding: "56px 0 24px" }}>
        <div style={container}>
          <div style={eyebrow}>FAQ</div>
          <h2
            style={{
              fontFamily: fonts.heading,
              fontSize: "clamp(26px, 3vw, 34px)",
              fontWeight: 700,
              marginTop: 10,
              maxWidth: 720,
            }}
          >
            Ladson warehouse questions.
          </h2>
          <div
            style={{
              marginTop: 28,
              display: "grid",
              gap: 14,
              maxWidth: 880,
            }}
          >
            {FAQ.map((item) => (
              <details
                key={item.q}
                style={{
                  background: colors.paper,
                  border: `1px solid ${colors.line}`,
                  borderRadius: 12,
                  padding: "18px 22px",
                }}
              >
                <summary
                  style={{
                    fontFamily: fonts.heading,
                    fontSize: 17,
                    fontWeight: 600,
                    color: colors.ink,
                    cursor: "pointer",
                    listStyle: "none",
                  }}
                >
                  {item.q}
                </summary>
                <p
                  style={{
                    fontFamily: fonts.body,
                    fontSize: 15,
                    lineHeight: 1.65,
                    color: colors.steel,
                    marginTop: 12,
                    marginBottom: 0,
                  }}
                >
                  {item.a}
                </p>
              </details>
            ))}
          </div>
          <p
            style={{
              fontFamily: fonts.body,
              fontSize: 15,
              lineHeight: 1.6,
              color: colors.steel,
              marginTop: 22,
              maxWidth: 720,
            }}
          >
            More answers are on the{" "}
            <Link href="/faq" style={linkStyle}>
              FAQ
            </Link>
            . The company story is on{" "}
            <Link href="/about" style={linkStyle}>
              About
            </Link>
            . To reach the warehouse directly, use{" "}
            <Link href="/contact" style={linkStyle}>
              contact
            </Link>
            .
          </p>
        </div>
      </section>

      <section style={{ padding: "48px 0 40px" }}>
        <div style={{ ...container, textAlign: "center" }}>
          <h2
            style={{
              fontFamily: fonts.heading,
              fontSize: "clamp(26px, 3.2vw, 36px)",
              fontWeight: 700,
              maxWidth: 680,
              margin: "0 auto",
            }}
          >
            Send the Ladson building a load.
          </h2>
          <p
            style={{
              fontFamily: fonts.body,
              fontSize: 17,
              color: colors.steel,
              marginTop: 14,
              maxWidth: 560,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Use the quote form or call {business.phoneDisplay}. Hours are{" "}
            {businessHours.display}
          </p>
          <div
            style={{
              marginTop: 26,
              display: "flex",
              justifyContent: "center",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <Link href="/quote" className="cta-primary" style={buttonPrimary}>
              Request a quote
            </Link>
            <a
              href={`tel:${business.phone}`}
              className="cta-secondary"
              style={buttonSecondary}
            >
              Call {business.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        background: colors.paper,
        border: `1px solid ${colors.line}`,
        borderRadius: 12,
        padding: 18,
      }}
    >
      <div
        style={{
          fontFamily: fonts.mono,
          fontSize: 11,
          color: colors.steel,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: fonts.heading,
          fontSize: 18,
          fontWeight: 600,
          color: colors.ink,
          marginTop: 6,
        }}
      >
        {value}
      </div>
    </div>
  );
}
