import type { Metadata } from "next";
import Link from "next/link";
import { FaqList, FactStrip, JsonLd, faqJsonLd } from "../components/service-blocks";
import { threePlPageJsonLd } from "../components/structured-data";
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
  ladsonOperatingLine,
  serviceLinks,
  terminalsGuidePath,
  threePlPath,
} from "../components/styles";

// Facts on this page are restated from pages and data already on the site:
// business / ladsonLocation / hanahanLocation in styles.ts,
// ladsonOperatingLine, /facility, /services, /services/wms, /faq, /quote,
// /contact (hours), and the location pages. No fee, certification, customer,
// rating, or turnaround figure is added here.

const PATH = threePlPath;
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.candcwarehouse.com";

const TITLE = "3PL Warehouse Charleston SC | Third-Party Logistics | C&C";
const H1 = "3PL Warehouse in Charleston, SC";
const CRUMB = "3PL warehouse in Charleston";
const DESCRIPTION = `3PL warehouse in Charleston, SC. Third-party logistics, family-run since ${business.foundedYear}. CBP Class 3 bonded and General Order storage in ${ladsonLocation.city} and ${hanahanLocation.city}. ${business.phoneDisplay}.`;

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}${PATH}` },
  openGraph: {
    type: "website",
    siteName: business.name,
    locale: "en_US",
    url: `${SITE_URL}${PATH}`,
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "C&C Warehouse — bonded and General Order buildings in Ladson and Hanahan, SC, near the Port of Charleston",
      },
    ],
  },
};

// Short summaries already printed on /services. Keyed by the live service
// URL so a new service in `serviceLinks` fails here instead of shipping
// without a link.
const SERVICE_SUMMARY: Record<string, string> = {
  "/services/bonded-storage":
    "Hold imported cargo on bond so duty isn't owed until you're ready to enter it for consumption. CBP-designated Class 3 — an importer's private bonded warehouse. Inventory is tracked under bond with chain-of-custody documentation through release.",
  "/services/general-order":
    "When freight goes unclaimed past the 15-day window at the port, CBP moves it to a GO warehouse. Ocean and air GO freight, including overweights and partial-claim cargo. C&C receives it and works with carriers, brokers, and CBP to get it released or disposed of properly.",
  "/services/devanning":
    "Hand-unload containers piece-by-piece with a piece-count audit and damage notes as we go. 30 containers/day at peak, scaled by container type and product mix. Photographed exceptions and a signed piece-count tally.",
  "/services/overweight-reworking":
    "Containers that arrive over US highway weight limits get split, re-palletized, and redistributed across legal-weight loads so they can move inland. Tendered as legal-weight loads with weight tickets and BOLs ready for the driver.",
  "/services/drayage":
    "Short-haul container moves between the SC Ports Authority terminals and the warehouse. Low-mileage runs from Wando Welch, North Charleston Terminal, and Hugh K. Leatherman.",
  "/services/cross-dock":
    "Receive freight on one dock, sort it, and tender it back out the other side without warehousing it in between. Same-day touch when inbound and outbound windows align. Sort by SKU, store, route, or customer.",
  "/services/deconsolidation":
    "Break a single inbound container or trailer into multiple outbound shipments — by customer, by store, by region. Receive the consolidated container with a master BOL, then tender separate house BOLs or LTL pickups against each destination.",
  "/services/wms":
    "Inventory tracked in a warehouse management system — receive, putaway, pick, ship — with an importer portal so you can see counts and movements without calling. Bonded, GO, and free cargo are tracked side-by-side under one logon.",
  "/services/pick-pack":
    "Pull stock from rack, pack it to your spec, label it, and tender it to the carrier you choose. Each, inner, case, or pallet picks are routed off the WMS. Parcel and LTL, from the same building as the bonded inventory.",
  "/services/fba-prep":
    "Amazon stopped prepping seller inventory at its US fulfillment centers on January 1, 2026. We inspect, FNSKU-label, polybag, bundle, and forward your product to Amazon's network from the same dock where your container lands.",
};

const services = serviceLinks.map((service) => {
  const summary = SERVICE_SUMMARY[service.href];
  if (!summary) {
    throw new Error(`Missing 3PL summary for ${service.href}`);
  }
  return { ...service, summary };
});

type PublishedDrive = {
  label: string;
  name: string;
  about: string;
};

function publishedDrive(
  drives: readonly PublishedDrive[],
  label: string,
): PublishedDrive {
  const drive = drives.find((item) => item.label === label);
  if (!drive) {
    throw new Error(`Missing published drive for ${label}`);
  }
  return drive;
}

const OCEAN_LABELS = ["Wando Welch", "NCT", "Leatherman"] as const;

const terminals = OCEAN_LABELS.map((label) => ({
  label,
  ladson: publishedDrive(ladsonLocation.drives, label),
  hanahan: publishedDrive(hanahanLocation.drives, label),
}));

const ladsonGreer = publishedDrive(ladsonLocation.drives, "Inland Port Greer");
const hanahanGreer = publishedDrive(hanahanLocation.drives, "Inland Port Greer");

const [wando, nct, leatherman] = terminals;

const FAQ: { q: string; a: string }[] = [
  {
    q: "What is a 3PL warehouse in Charleston, SC?",
    a: `${business.name} is a third-party logistics warehouse near the Port of Charleston. The company has been family-run since ${business.foundedYear}. It is a CBP Class 3 bonded warehouse — an importer's private bonded warehouse — and a CBP-designated General Order facility in ${ladsonLocation.city} and ${hanahanLocation.city}. The phone number is ${business.phoneDisplay}.`,
  },
  {
    q: "How long has this third-party logistics warehouse been family-run?",
    a: `${business.name} has been family-run since ${business.foundedYear}, and the team carries ${business.teamExperienceYears}+ years of combined warehouse experience.`,
  },
  {
    q: "Where are the Charleston warehouse buildings?",
    a: `Two buildings. The primary is ${ladsonLocation.sqft} sq ft at ${ladsonLocation.street}, ${ladsonLocation.city}, ${ladsonLocation.state} ${ladsonLocation.postal}. The secondary is ${hanahanLocation.sqft} sq ft at ${hanahanLocation.street}, ${hanahanLocation.city}, ${hanahanLocation.state} ${hanahanLocation.postal}. Together that is 90,000+ sq ft, with 3,000+ racked pallet positions across both buildings, plus floor-load capacity for oversized cargo. These are operating warehouses, not commercial listings of space for lease. Inventory moves between both buildings as needed. Same WMS, same crew, same phone number.`,
  },
  {
    q: "Which services does this Charleston 3PL run?",
    a: `Ten, already listed on the site: ${serviceLinks.map((service) => service.label).join(", ")}. Peak throughput across both locations is 30 containers/day. Devanning, reworking, and cross-dock are scaled by product mix.`,
  },
  {
    q: "Does this 3PL warehouse in Charleston, SC transload containers from the port?",
    a: `The port-direct version of cross-dock — container off the chassis, devanned on the dock, freight straight to outbound staging — is container transloading near the Port of Charleston. It runs at the buildings in ${ladsonLocation.city} and ${hanahanLocation.city}.`,
  },
  {
    q: "How does drayage from the Port of Charleston terminals work?",
    a: `Drayage is the short-haul between the SC Ports Authority terminals and the warehouse. The ocean terminals are ${wando.ladson.name}, ${nct.ladson.name}, and ${leatherman.ladson.name}. Both facilities sit within 25 miles of all three. From ${ladsonLocation.city}: ${wando.ladson.name} is ${wando.ladson.about}, ${nct.ladson.name} is ${nct.ladson.about}, and ${leatherman.ladson.name} is ${leatherman.ladson.about}. From ${hanahanLocation.city}: ${wando.hanahan.name} is ${wando.hanahan.about}, ${nct.hanahan.name} is ${nct.hanahan.about}, and ${leatherman.hanahan.name} is ${leatherman.hanahan.about}. Inland Port Greer is ${ladsonGreer.about} from ${ladsonLocation.city} and ${hanahanGreer.about} from ${hanahanLocation.city}.`,
  },
  {
    q: "How do I see inventory?",
    a: `The customer portal is ${business.portalHost}. Inventory is received, put away, picked, and shipped in a warehouse management system. On-hand, aging, in-and-out activity, and bond status are pulled on demand. Bonded, General Order, and free cargo show under one logon, for both ${ladsonLocation.city} and ${hanahanLocation.city}. Lot and serial numbers are tracked when the product has them. The phone number is still ${business.phoneDisplay} when the portal is not the right tool.`,
  },
  {
    q: "How do I request a quote?",
    a: `This page does not publish a price. Quotes come from the documents on the shipment, through the quote form or by phone at ${business.phoneDisplay}. Email ${business.email}. Hours published on the site are ${businessHours.display}. The quote page says the more you can tell us up front, the tighter the quote. If you are not sure of a number, leave it blank.`,
  },
];

const pageJsonLd = threePlPageJsonLd(SITE_URL, {
  name: TITLE,
  description: DESCRIPTION,
  crumb: CRUMB,
  serviceName: H1,
});

const linkStyle = {
  color: colors.accent,
  textDecoration: "underline",
} as const;

const h2Style = {
  fontFamily: fonts.heading,
  fontSize: "clamp(26px, 3vw, 34px)",
  fontWeight: 700,
  marginTop: 10,
  maxWidth: 720,
} as const;

const ledeStyle = {
  fontFamily: fonts.body,
  fontSize: 16.5,
  lineHeight: 1.65,
  color: colors.steel,
  marginTop: 14,
  maxWidth: 760,
} as const;

export default function ThreePlCharlestonPage() {
  return (
    <>
      <JsonLd id="3pl-jsonld" data={pageJsonLd} />
      <JsonLd id="faq-jsonld" data={faqJsonLd(FAQ)} />

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
            <span style={{ color: colors.accent }}>{CRUMB}</span>
          </nav>

          <div style={eyebrow}>
            Third-party logistics · Port of Charleston
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
            {H1}
          </h1>
          <h2
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
            Bonded and General Order warehousing in {ladsonLocation.city} and{" "}
            {hanahanLocation.city}, {ladsonLocation.state}.
          </h2>
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
            {business.name} is a third-party logistics (3PL) warehouse near the
            Port of Charleston. The company has been family-run since{" "}
            {business.foundedYear}, and the team carries{" "}
            {business.teamExperienceYears}+ years of combined warehouse
            experience. {ladsonOperatingLine}
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
            The secondary building is {hanahanLocation.sqft} sq ft at{" "}
            {hanahanLocation.street}, {hanahanLocation.city},{" "}
            {hanahanLocation.state} {hanahanLocation.postal}, closer to the
            port terminals — the shortest drayage runs in our network. Both
            facilities are US Customs Bonded. Inventory moves between both
            buildings as needed. Same WMS, same crew, same phone number,{" "}
            {business.phoneDisplay}. Peak throughput across both locations is
            30 containers/day. Devanning, reworking, and cross-dock are scaled
            by product mix.
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

      <FactStrip
        items={[
          { label: "Primary", value: `${ladsonLocation.sqft} sq ft` },
          { label: "Secondary", value: `${hanahanLocation.sqft} sq ft` },
          { label: "Positions", value: "3,000+ racked" },
          { label: "Peak", value: "30 containers/day" },
          { label: "Bond", value: "CBP Class 3" },
          { label: "General Order", value: "CBP-designated" },
        ]}
      />

      <section style={{ padding: "56px 0" }}>
        <div style={container}>
          <div style={eyebrow}>Ten services</div>
          <h2 style={h2Style}>The work already listed on this site.</h2>
          <p style={ledeStyle}>
            These are the ten services already listed on the site. Each
            summary is the short version already printed on the{" "}
            <Link href="/services" style={linkStyle}>
              services
            </Link>{" "}
            page. The link on each card is that service&rsquo;s own page.
            The port-direct version of cross-dock — container off the
            chassis, devanned on the dock, freight straight to outbound
            staging — is{" "}
            <Link href="/services/transloading" style={linkStyle}>
              container transloading near the Port of Charleston
            </Link>
            .
          </p>
          <div
            style={{
              marginTop: 28,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: 16,
            }}
          >
            {services.map((service, index) => (
              <article
                key={service.href}
                style={{
                  background: colors.paper,
                  border: `1px solid ${colors.line}`,
                  borderRadius: 12,
                  padding: 20,
                }}
              >
                <div
                  style={{
                    fontFamily: fonts.mono,
                    fontSize: 12,
                    color: colors.accent,
                    letterSpacing: "0.14em",
                  }}
                >
                  {String(index + 1).padStart(2, "0")}
                </div>
                <h3
                  style={{
                    fontFamily: fonts.heading,
                    fontSize: 19,
                    fontWeight: 600,
                    marginTop: 8,
                  }}
                >
                  <Link href={service.href} style={linkStyle}>
                    {service.label}
                  </Link>
                </h3>
                <p
                  style={{
                    fontFamily: fonts.body,
                    fontSize: 15,
                    lineHeight: 1.6,
                    color: colors.steel,
                    marginTop: 10,
                    marginBottom: 0,
                  }}
                >
                  {service.summary}
                </p>
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
          <div style={eyebrow}>Two buildings</div>
          <h2 style={h2Style}>Ladson and Hanahan, one crew.</h2>
          <p style={ledeStyle}>
            The primary building is the{" "}
            <Link href={ladsonLocation.path} style={linkStyle}>
              {ladsonLocation.query}
            </Link>
            , {ladsonLocation.sqft} sq ft at {ladsonLocation.street},{" "}
            {ladsonLocation.city}, {ladsonLocation.state}{" "}
            {ladsonLocation.postal}. The secondary building is the{" "}
            <Link href={hanahanLocation.path} style={linkStyle}>
              {hanahanLocation.query}
            </Link>
            , {hanahanLocation.sqft} sq ft at {hanahanLocation.street},{" "}
            {hanahanLocation.city}, {hanahanLocation.state}{" "}
            {hanahanLocation.postal}. Together that is 90,000+ sq ft, with
            3,000+ racked pallet positions across both buildings, plus
            floor-load capacity for oversized cargo. The{" "}
            <Link href="/facility" style={linkStyle}>
              facility page
            </Link>{" "}
            says inventory moves between both buildings as needed — same WMS,
            same crew, same phone number. This is warehousing in{" "}
            {ladsonLocation.city} and {hanahanLocation.city},{" "}
            {ladsonLocation.state}, not a commercial listing of space for
            lease.
          </p>
        </div>
      </section>

      <section style={{ padding: "56px 0" }}>
        <div style={container}>
          <div style={eyebrow}>From the terminals</div>
          <h2 style={h2Style}>Drayage from the Port of Charleston.</h2>
          <p style={ledeStyle}>
            Drayage is the short-haul between the SC Ports Authority terminals
            and the warehouse. The ocean terminals are {wando.ladson.name},{" "}
            {nct.ladson.name}, and {leatherman.ladson.name}. Both facilities
            sit within 25 miles of all three. The miles below are the
            per-building figures already published on the location pages. Side
            by side, they are on the{" "}
            <Link href={terminalsGuidePath} style={linkStyle}>
              Port of Charleston terminals
            </Link>{" "}
            guide. The service itself is{" "}
            <Link href="/services/drayage" style={linkStyle}>
              drayage
            </Link>
            . Inland Port Greer is {ladsonGreer.about} from{" "}
            {ladsonLocation.city} and {hanahanGreer.about} from{" "}
            {hanahanLocation.city}.
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
            {terminals.map((terminal) => (
              <div
                key={terminal.label}
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
                    fontSize: 17,
                    fontWeight: 600,
                    color: colors.ink,
                  }}
                >
                  {terminal.ladson.name}
                </dt>
                <dd
                  style={{
                    fontFamily: fonts.body,
                    fontSize: 15,
                    lineHeight: 1.55,
                    color: colors.steel,
                    margin: "8px 0 0",
                  }}
                >
                  {ladsonLocation.city}: {terminal.ladson.about}.{" "}
                  {hanahanLocation.city}: {terminal.hanahan.about}.
                </dd>
              </div>
            ))}
          </dl>
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
          <div style={eyebrow}>Inventory</div>
          <h2 style={h2Style}>Counts on the WMS and the customer portal.</h2>
          <p style={ledeStyle}>
            Inventory is received, put away, picked, and shipped in a warehouse
            management system, not on a spreadsheet. The customer portal is{" "}
            <a href={business.portalUrl} style={linkStyle}>
              {business.portalHost}
            </a>
            . On-hand, aging, in-and-out activity, and bond status are pulled
            on demand. Bonded, General Order, and free cargo show under one
            logon, for both {ladsonLocation.city} and {hanahanLocation.city}.
            Lot and serial numbers are tracked when the product has them. That
            service is{" "}
            <Link href="/services/wms" style={linkStyle}>
              WMS-tracked inventory
            </Link>
            . Order fulfillment off those counts is{" "}
            <Link href="/services/pick-pack" style={linkStyle}>
              pick &amp; pack
            </Link>
            . The phone number is still {business.phoneDisplay} when the portal
            is not the right tool.
          </p>
        </div>
      </section>

      <section style={{ padding: "56px 0" }}>
        <div style={container}>
          <div style={eyebrow}>Quote</div>
          <h2 style={h2Style}>The quote comes from the shipment documents.</h2>
          <p style={ledeStyle}>
            This page does not publish a price. Quotes come from the documents
            on that shipment, through the{" "}
            <Link href="/quote" style={linkStyle}>
              quote form
            </Link>{" "}
            or by phone at {business.phoneDisplay}. Email{" "}
            <a href={`mailto:${business.email}`} style={linkStyle}>
              {business.email}
            </a>
            . Hours published on the site are {businessHours.display}. The
            quote page says the more you can tell us up front, the tighter the
            quote. If you are not sure of a number, leave it blank.
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

      <FaqList title="3PL warehouse in Charleston, SC" items={FAQ} />
    </>
  );
}
