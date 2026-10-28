import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JsonLd, faqJsonLd } from "../../components/service-blocks";
import { hanahanBranchJsonLd } from "../../components/structured-data";
import {
  business,
  businessHours,
  buttonPrimary,
  buttonSecondary,
  colors,
  container,
  eyebrow,
  fonts,
  hanahanLocation,
  ladsonLocation,
  serviceLinks,
} from "../../components/styles";

const PATH = hanahanLocation.path;
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.candcwarehouse.com";

const TITLE = "Hanahan SC Warehouse | Port of Charleston | C&C";
const DESCRIPTION = `Hanahan SC warehouse at ${hanahanLocation.street}: ${hanahanLocation.sqft} sq ft near the Port of Charleston. CBP Class 3 bonded and General Order. ${business.phoneDisplay}.`;

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
        alt: `C&C Warehouse secondary facility at ${hanahanLocation.street}, ${hanahanLocation.city}, ${hanahanLocation.state}`,
      },
    ],
  },
};

const [wando, nct, leatherman, greer] = hanahanLocation.drives;

const FAQ: { q: string; a: string }[] = [
  {
    q: "Where is the warehouse in Hanahan, SC?",
    a: `The secondary ${business.name} building is ${hanahanLocation.street}, ${hanahanLocation.city}, ${hanahanLocation.state} ${hanahanLocation.postal}. The building is ${hanahanLocation.sqft} sq ft. Ladson, at ${ladsonLocation.street}, is the primary address.`,
  },
  {
    q: "Is there a bonded warehouse in Hanahan, SC?",
    a: `Both facilities are US Customs Bonded. ${business.name} is a CBP Class 3 bonded warehouse — an importer's private bonded warehouse — and a CBP-designated General Order facility in ${ladsonLocation.city} and ${hanahanLocation.city}. The company has been family-run since ${business.foundedYear}.`,
  },
  {
    q: "How far is the Hanahan warehouse from the port terminals?",
    a: `Published drive distances from this address: ${wando.name} is ${wando.about}, ${nct.name} is ${nct.about}, ${leatherman.name} is ${leatherman.about}, and ${greer.name} is ${greer.about}.`,
  },
  {
    q: "Which services run from the Hanahan facility?",
    a: `${serviceLinks.map((s) => s.label).join(", ")}. Those are the services already listed on the site. If a load is handled in Hanahan instead of Ladson, the list and the phone number do not change. Customer inventory is on ${business.portalHost}.`,
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
      name: "Hanahan",
      item: `${SITE_URL}${PATH}`,
    },
  ],
};

const placeJsonLd = {
  "@context": "https://schema.org",
  ...hanahanBranchJsonLd(SITE_URL),
};

const linkStyle = {
  color: colors.accent,
  textDecoration: "underline",
} as const;

export default function HanahanLocationPage() {
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
            <span style={{ color: colors.accent }}>Hanahan</span>
          </nav>

          <div style={eyebrow}>
            {hanahanLocation.city}, {hanahanLocation.state} · Secondary building
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
            Warehouse in Hanahan, SC
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
            {hanahanLocation.sqft} sq ft at {hanahanLocation.street}. Additional
            capacity, closer to the port terminals.
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
            {business.name} keeps a second floor in Hanahan. The building is{" "}
            {hanahanLocation.sqft} sq ft of additional warehouse capacity,
            closer to the port terminals — the shortest drayage runs in our
            network. Both facilities are US Customs Bonded. The company is a
            CBP Class 3 bonded warehouse and a CBP-designated General Order
            facility in {ladsonLocation.city} and {hanahanLocation.city},
            family-run since {business.foundedYear}, with a team carrying{" "}
            {business.teamExperienceYears}+ years of combined warehouse
            experience. Together the buildings are 90,000+ sq ft. The primary
            building is the{" "}
            <Link href={ladsonLocation.path} style={linkStyle}>
              warehouse in Ladson, SC
            </Link>
            . The two-building overview lives on the{" "}
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
            src={hanahanLocation.image}
            alt={hanahanLocation.imageAlt}
            width={1500}
            height={994}
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
              {hanahanLocation.street}
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
              {hanahanLocation.city}, {hanahanLocation.state}{" "}
              {hanahanLocation.postal}
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
            <Fact label="Size" value={`${hanahanLocation.sqft} sq ft`} />
            <Fact label="Role" value={hanahanLocation.badge} />
            <Fact label="Bond" value="US Customs Bonded" />
            <Fact label="General Order" value="CBP-designated" />
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
            The same ten services, when a load is handled in Hanahan.
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
            These are the services already listed on the site. The{" "}
            <Link href="/facility" style={linkStyle}>
              facility page
            </Link>{" "}
            says inventory moves between both buildings as needed — same WMS,
            same crew, same phone number. Racked pallet positions are published
            as 3,000+ across both buildings, not as a Hanahan-only count. The
            primary building is in{" "}
            <Link href={ladsonLocation.path} style={linkStyle}>
              Ladson
            </Link>
            . Fees are not listed here. Ask on the{" "}
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
            Published drive distances from Hanahan.
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
            These miles are the Hanahan figures already published on the site.
            {` ${wando.name} is ${wando.about}, ${wando.detail}. ${nct.name} is ${nct.about}, ${nct.detail}. ${leatherman.name} is ${leatherman.about} — ${leatherman.detail}. ${greer.name} is ${greer.about}, ${greer.detail}.`}{" "}
            The facility page also states that both facilities sit within 25
            miles of all three SC Ports Authority ocean terminals. Ladson&rsquo;s
            terminal runs are a different set of numbers and stay on the{" "}
            <Link href={ladsonLocation.path} style={linkStyle}>
              Ladson warehouse page
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
            {hanahanLocation.drives.map((drive) => (
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
                  {drive.detail}
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
            Hanahan warehouse questions.
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
            Send the Hanahan building a load.
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
