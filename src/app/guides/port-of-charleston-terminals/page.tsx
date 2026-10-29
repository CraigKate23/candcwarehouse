import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd, faqJsonLd } from "../../components/service-blocks";
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
  terminalsGuidePath,
} from "../../components/styles";

// Distances, routes, and "about N miles" lines come from
// ladsonLocation.drives and hanahanLocation.drives — the same source as
// the facility cards and the FAQ. Combined ranges are the strings already
// printed on /services and /services/drayage. This page does not add a
// measurement.

const PATH = terminalsGuidePath;
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.candcwarehouse.com";

const TITLE = "Port of Charleston Terminal Distances | C&C";
const DESCRIPTION =
  "Published miles from C&C Warehouse in Ladson and Hanahan to Wando Welch, North Charleston Terminal, Hugh K. Leatherman, and Inland Port Greer.";

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
        alt: "C&C Warehouse — published drive distances from Ladson and Hanahan, SC to Wando Welch, North Charleston Terminal, Hugh K. Leatherman, and Inland Port Greer",
      },
    ],
  },
};

type Drive = {
  label: string;
  name: string;
  distance: string;
  about: string;
  route: string;
};

function driveByLabel(drives: readonly Drive[], label: string): Drive {
  const drive = drives.find((item) => item.label === label);
  if (!drive) {
    throw new Error(`Missing published drive for ${label}`);
  }
  return drive;
}

const TERMINAL_LABELS = [
  "Wando Welch",
  "NCT",
  "Leatherman",
  "Inland Port Greer",
] as const;

// Ranges already printed on /services and /services/drayage for the three
// ocean terminals. En dash matches those pages. Greer has no combined range.
const PUBLISHED_RANGE: Record<string, string> = {
  "Wando Welch": "~16\u201324 miles",
  NCT: "~7\u201314 miles",
  Leatherman: "~6\u201314 miles",
};

const TERMINALS = TERMINAL_LABELS.map((label) => ({
  label,
  ladson: driveByLabel(ladsonLocation.drives, label),
  hanahan: driveByLabel(hanahanLocation.drives, label),
  range: PUBLISHED_RANGE[label],
}));

const OCEAN = TERMINALS.filter((terminal) => terminal.label !== "Inland Port Greer");

function requiredTerminal(label: (typeof TERMINAL_LABELS)[number]) {
  const terminal = TERMINALS.find((item) => item.label === label);
  if (!terminal) {
    throw new Error(`Missing published drive for ${label}`);
  }
  return terminal;
}

const GREER = requiredTerminal("Inland Port Greer");

const RELATED_HREFS = [
  "/services/drayage",
  "/services/bonded-storage",
  "/services/general-order",
  "/services/devanning",
  "/services/overweight-reworking",
  "/services/cross-dock",
];

const relatedServices = RELATED_HREFS.map((href) => {
  const service = serviceLinks.find((item) => item.href === href);
  if (!service) {
    throw new Error(`Missing service link ${href}`);
  }
  return service;
});

function headingFor(label: string, name: string) {
  if (label === "NCT") return `${name} (NCT)`;
  return name;
}

function milesSentence(drive: Drive) {
  const route = drive.route.endsWith(".")
    ? drive.route.slice(0, -1)
    : drive.route;
  return `${drive.name} is ${drive.about}, ${route}`;
}

const ladsonOcean = OCEAN.map((terminal) => milesSentence(terminal.ladson)).join(
  ". ",
);
const hanahanOcean = OCEAN.map((terminal) =>
  milesSentence(terminal.hanahan),
).join(". ");

const FAQ: { q: string; a: string }[] = [
  {
    q: "How far is the Ladson warehouse from Wando Welch, North Charleston Terminal, and Leatherman?",
    a: `Published drive distances from ${ladsonLocation.street}, ${ladsonLocation.city}, ${ladsonLocation.state}: ${ladsonOcean}. The facility page states that both buildings sit within 25 miles of all three SC Ports Authority ocean terminals.`,
  },
  {
    q: "How far is the Hanahan warehouse from Wando Welch, NCT, and Hugh K. Leatherman?",
    a: `Published drive distances from ${hanahanLocation.street}, ${hanahanLocation.city}, ${hanahanLocation.state}: ${hanahanOcean}. Hanahan is the secondary building, closer to the port terminals — the shortest drayage runs in our network.`,
  },
  {
    q: "What are the Port of Charleston terminal drayage distances from both buildings?",
    a: `The services and drayage pages summarize both buildings as Wando Welch ${PUBLISHED_RANGE["Wando Welch"]}, North Charleston Terminal ${PUBLISHED_RANGE.NCT}, and Hugh K. Leatherman ${PUBLISHED_RANGE.Leatherman}. Those ranges sit on top of the per-building miles above. Drayage is the short-haul container move between the SC Ports Authority terminals and the warehouse.`,
  },
  {
    q: "How far is Inland Port Greer from the Ladson and Hanahan warehouses?",
    a: `From Ladson, ${milesSentence(GREER.ladson)}. From Hanahan, ${milesSentence(GREER.hanahan)}. Inland Port Greer is on the same published drive lists as the ocean terminals. The facility page's within-25-miles line names Wando Welch, North Charleston Terminal, and Hugh K. Leatherman. The quote form also lists Inland Port Greer as a terminal choice, with Wando Welch, North Charleston (NCT), and Hugh K. Leatherman.`,
  },
  {
    q: "Which services does the site list for freight from these terminals?",
    a: `Drayage from Wando Welch, NCT, and Leatherman is one of the ten services. The same list includes US Customs bonded storage, General Order storage, container devanning with a piece-count audit, overweight container reworking, and cross-dock. ${business.name} is a CBP Class 3 bonded warehouse — an importer's private bonded warehouse — and a CBP-designated General Order facility in ${ladsonLocation.city} and ${hanahanLocation.city}.`,
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
      name: "Terminal distances",
      item: `${SITE_URL}${PATH}`,
    },
  ],
};

const linkStyle = {
  color: colors.accent,
  textDecoration: "underline",
} as const;

export default function PortOfCharlestonTerminalsPage() {
  return (
    <>
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
            <span style={{ color: colors.accent }}>Terminal distances</span>
          </nav>

          <div style={eyebrow}>Port of Charleston</div>
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
            Warehouse distances to the Port of Charleston terminals
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
            Published miles from Ladson and Hanahan to Wando Welch, North
            Charleston Terminal, Hugh K. Leatherman, and Inland Port Greer.
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
            {business.name}, family-run since {business.foundedYear}, keeps
            two buildings in the Charleston metro. The primary building is{" "}
            {ladsonLocation.sqft} sq ft at{" "}
            <Link href={ladsonLocation.path} style={linkStyle}>
              {ladsonLocation.street}, {ladsonLocation.city}
            </Link>
            . The secondary building is {hanahanLocation.sqft} sq ft at{" "}
            <Link href={hanahanLocation.path} style={linkStyle}>
              {hanahanLocation.street}, {hanahanLocation.city}
            </Link>
            . Together the buildings are 90,000+ sq ft. Both are US Customs
            Bonded: a CBP Class 3 bonded warehouse and a CBP-designated
            General Order facility in {ladsonLocation.city} and{" "}
            {hanahanLocation.city}. The{" "}
            <Link href="/facility" style={linkStyle}>
              facility page
            </Link>{" "}
            states that both sit within 25 miles of all three SC Ports
            Authority ocean terminals — Wando Welch, North Charleston
            Terminal (NCT), and Hugh K. Leatherman.
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

      <section style={{ padding: "36px 0 8px" }}>
        <div style={container}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 18,
            }}
          >
            <Fact
              label="Ladson · Wando Welch"
              value={driveByLabel(ladsonLocation.drives, "Wando Welch").distance}
            />
            <Fact
              label="Hanahan · Wando Welch"
              value={driveByLabel(hanahanLocation.drives, "Wando Welch").distance}
            />
            <Fact
              label="Hanahan · Leatherman"
              value={driveByLabel(hanahanLocation.drives, "Leatherman").distance}
            />
            <Fact
              label="Ladson · Inland Port Greer"
              value={GREER.ladson.distance}
            />
          </div>
        </div>
      </section>

      <section style={{ padding: "56px 0" }}>
        <div style={container}>
          <div style={eyebrow}>Published drive distances</div>
          <h2
            style={{
              fontFamily: fonts.heading,
              fontSize: "clamp(26px, 3vw, 34px)",
              fontWeight: 700,
              marginTop: 10,
              maxWidth: 720,
            }}
          >
            The same miles already printed for each building.
          </h2>
          <p
            style={{
              fontFamily: fonts.body,
              fontSize: 16.5,
              lineHeight: 1.65,
              color: colors.steel,
              marginTop: 14,
              maxWidth: 760,
            }}
          >
            Each line below is the facility-page drive note for that
            building: the published distance, then the published route.
            The services page and the{" "}
            <Link href="/services/drayage" style={linkStyle}>
              drayage page
            </Link>{" "}
            also print one range per ocean terminal that covers both
            buildings. Inland Port Greer stays on the drive lists and is
            outside that three-terminal range.
          </p>
          <div
            style={{
              marginTop: 28,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 14,
            }}
          >
            {TERMINALS.map((terminal) => (
              <article
                key={terminal.label}
                style={{
                  background: colors.paper,
                  border: `1px solid ${colors.line}`,
                  borderRadius: 12,
                  padding: 18,
                }}
              >
                <h3
                  style={{
                    fontFamily: fonts.heading,
                    fontSize: 18,
                    fontWeight: 700,
                    color: colors.ink,
                  }}
                >
                  {headingFor(terminal.label, terminal.ladson.name)}
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
                  {terminal.range
                    ? "One of the three SC Ports Authority ocean terminals named on the facility page. Both buildings sit within 25 miles of all three."
                    : "Published on the facility-page and FAQ drive lists, with its own miles."}
                </p>
                <dl
                  style={{
                    marginTop: 14,
                    display: "grid",
                    gap: 12,
                    marginBlockEnd: 0,
                  }}
                >
                  <DriveLine
                    building="Ladson"
                    href={ladsonLocation.path}
                    drive={terminal.ladson}
                  />
                  <DriveLine
                    building="Hanahan"
                    href={hanahanLocation.path}
                    drive={terminal.hanahan}
                  />
                </dl>
                {terminal.range ? (
                  <p
                    style={{
                      fontFamily: fonts.body,
                      fontSize: 14,
                      lineHeight: 1.5,
                      color: colors.steel,
                      marginTop: 14,
                      marginBottom: 0,
                    }}
                  >
                    Both buildings, on the drayage page: {terminal.range}.
                  </p>
                ) : null}
              </article>
            ))}
          </div>
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
          <div style={eyebrow}>From each building</div>
          <h2
            style={{
              fontFamily: fonts.heading,
              fontSize: "clamp(26px, 3vw, 34px)",
              fontWeight: 700,
              marginTop: 10,
              maxWidth: 720,
            }}
          >
            Ladson and Hanahan, in the wording already on the site.
          </h2>
          <div
            style={{
              marginTop: 28,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 18,
            }}
          >
            <BuildingCopy
              title={`${ladsonLocation.city} warehouse`}
              href={ladsonLocation.path}
              body={`${ladsonLocation.facilityName}, ${ladsonLocation.street}, ${ladsonLocation.city}, ${ladsonLocation.state} ${ladsonLocation.postal}. ${ladsonOcean}. ${milesSentence(GREER.ladson)}.`}
            />
            <BuildingCopy
              title={`${hanahanLocation.city} warehouse`}
              href={hanahanLocation.path}
              body={`${hanahanLocation.facilityName}, ${hanahanLocation.street}, ${hanahanLocation.city}, ${hanahanLocation.state} ${hanahanLocation.postal}. ${hanahanOcean}. ${milesSentence(GREER.hanahan)}. The facility page describes Hanahan as closer to the port terminals — the shortest drayage runs in our network.`}
            />
          </div>
        </div>
      </section>

      <section style={{ padding: "56px 0" }}>
        <div style={container}>
          <div style={eyebrow}>Related pages</div>
          <h2
            style={{
              fontFamily: fonts.heading,
              fontSize: "clamp(26px, 3vw, 34px)",
              fontWeight: 700,
              marginTop: 10,
              maxWidth: 720,
            }}
          >
            Services and buildings already on the site.
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
            Drayage from Wando Welch, NCT, and Leatherman is the short-haul
            between those terminals and the warehouse. Bonded storage,
            General Order, devanning, overweight container reworking, and
            cross-dock are the related services on the services list. The
            two addresses have their own pages.
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
            {relatedServices.map((service) => (
              <li key={service.href}>
                <TextLink href={service.href} label={service.label} />
              </li>
            ))}
            <li>
              <TextLink
                href={ladsonLocation.path}
                label={`${ladsonLocation.city} warehouse`}
              />
            </li>
            <li>
              <TextLink
                href={hanahanLocation.path}
                label={`${hanahanLocation.city} warehouse`}
              />
            </li>
            <li>
              <TextLink href="/facility" label="Facility" />
            </li>
          </ul>
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
            Terminal distance questions.
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
            Send a terminal move to either building.
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

function DriveLine({
  building,
  href,
  drive,
}: {
  building: string;
  href: string;
  drive: Drive;
}) {
  return (
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
        <Link href={href} style={{ color: colors.accent, textDecoration: "underline" }}>
          {building}
        </Link>
      </dt>
      <dd
        style={{
          margin: "4px 0 0",
          fontFamily: fonts.body,
          fontSize: 15,
          lineHeight: 1.5,
          color: colors.steel,
        }}
      >
        {drive.distance} — {drive.route}
      </dd>
    </div>
  );
}

function BuildingCopy({
  title,
  href,
  body,
}: {
  title: string;
  href: string;
  body: string;
}) {
  return (
    <div
      style={{
        background: colors.paper,
        border: `1px solid ${colors.line}`,
        borderRadius: 12,
        padding: 22,
      }}
    >
      <h3
        style={{
          fontFamily: fonts.heading,
          fontSize: 20,
          fontWeight: 700,
        }}
      >
        <Link href={href} style={{ color: colors.ink, textDecoration: "underline" }}>
          {title}
        </Link>
      </h3>
      <p
        style={{
          fontFamily: fonts.body,
          fontSize: 15,
          lineHeight: 1.65,
          color: colors.steel,
          marginTop: 10,
        }}
      >
        {body}
      </p>
    </div>
  );
}

function TextLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      style={{
        display: "flex",
        alignItems: "center",
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
      {label}
    </Link>
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
