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
  deconsolidationGuidePath,
  eyebrow,
  fonts,
  hanahanLocation,
  ladsonLocation,
  locationsPath,
  terminalsGuidePath,
} from "../../components/styles";

// Facts on this page are restated from pages already on the site:
// /services/deconsolidation, the deconsolidation section of /services,
// /services/devanning, /services/cross-dock, /services/transloading,
// /services/bonded-storage, /services/drayage, /services/pick-pack,
// /services/general-order, /facility, /faq, /quote, /contact, /locations,
// and the location pages. Mile strings come from ladsonLocation.drives
// and hanahanLocation.drives. No rate, fee, turnaround, or capacity
// figure is added here.

const PATH = deconsolidationGuidePath;
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.candcwarehouse.com";

const TITLE = "Container Deconsolidation at the Port of Charleston | C&C";
const DESCRIPTION =
  "Guide to container deconsolidation at the Port of Charleston. Split one inbound by customer, store, or region in Ladson and Hanahan. No rate is published.";

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
        alt: "C&C Warehouse — guide to container deconsolidation at the Port of Charleston, in Ladson and Hanahan, SC",
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

const OCEAN_LABELS = ["Wando Welch", "NCT", "Leatherman"] as const;

function buildingMiles(drives: readonly Drive[]) {
  return OCEAN_LABELS.map((label) => {
    const drive = driveByLabel(drives, label);
    const route = drive.route.endsWith(".")
      ? drive.route.slice(0, -1)
      : drive.route;
    return `${drive.name} is ${drive.about}, ${route}`;
  }).join(". ");
}

const ladsonMiles = buildingMiles(ladsonLocation.drives);
const hanahanMiles = buildingMiles(hanahanLocation.drives);

const RELATED: { href: string; label: string }[] = [
  { href: "/services/deconsolidation", label: "Port of Charleston deconsolidation" },
  { href: "/services/devanning", label: "Container devanning in Charleston" },
  { href: "/services/cross-dock", label: "Cross-dock" },
  { href: "/services/transloading", label: "Container transloading" },
  { href: "/services/bonded-storage", label: "Bonded storage" },
  { href: "/services/drayage", label: "Drayage" },
  { href: locationsPath, label: "Locations" },
  { href: ladsonLocation.path, label: ladsonLocation.query },
  { href: hanahanLocation.path, label: hanahanLocation.query },
  { href: terminalsGuidePath, label: "Terminal distances" },
  { href: "/quote", label: "Request a quote" },
];

const FAQ: { q: string; a: string }[] = [
  {
    q: "What is container deconsolidation at the Port of Charleston?",
    a: "Container deconsolidation breaks one inbound container or trailer into multiple outbound shipments — by customer, by store, or by region. Importers often consolidate overseas to save ocean freight, then need the cargo split once it lands at the Port of Charleston. That split is done on the warehouse floor in Ladson and Hanahan. One master bill becomes several outbound shipments, each with its own house bill of lading.",
  },
  {
    q: "Is Charleston deconsolidation the same as school-district deconsolidation?",
    a: `No. On this site, Charleston deconsolidation means container deconsolidation at a Port of Charleston warehouse. ${business.name} splits one inbound container or trailer into outbound shipments by customer, store, or region on the floor in Ladson and Hanahan. The company is ${business.legalName}. School-district deconsolidation is a different topic and is not a service offered here.`,
  },
  {
    q: "How is deconsolidation different from devanning, cross-dock, and transloading?",
    a: "Devanning is the hand-unload of an ocean container at the warehouse, with a piece-count audit against the bill of lading. Floor-loaded freight is devanned and piece-counted first, then sorted to destination. Palletized freight is broken down only as far as the manifest requires. Cross-dock is about speed: freight in one side and out the other, often the same day, with little or no dwell. Deconsolidation is about the split itself. One master bill becomes several outbound shipments, each with its own house BOL. A load can be deconsolidated and then cross-docked, or it can sit until each destination is ready. Transloading is the port-direct version of that cross-dock: the container comes off the chassis, is devanned on the dock, and the freight moves straight to outbound staging, with no put-away.",
  },
  {
    q: "Can deconsolidated freight stay in bond?",
    a: `Yes. ${business.name} is a CBP Class 3 bonded warehouse — an importer's private bonded warehouse. Cargo that is still in bond can be deconsolidated on the bonded floor and withdrawn, or re-exported, by destination. The split does not have to break the bond. A Class 3 warehouse can take an in-bond container off the terminal and receive it onto the bonded floor without breaking the bond. Duty is owed when the cargo is withdrawn for US consumption, or not at all if it is re-exported under bond. General Order freight is a different status and has its own page.`,
  },
  {
    q: "Where do you deconsolidate containers in Charleston, SC?",
    a: `Container deconsolidation in Charleston, SC is a warehouse split at two buildings near the Port of Charleston. The primary building is the ${ladsonLocation.facilityName}, ${ladsonLocation.sqft} sq ft at ${ladsonLocation.street}, ${ladsonLocation.city}, ${ladsonLocation.state} ${ladsonLocation.postal}. The secondary building is the ${hanahanLocation.facilityName}, ${hanahanLocation.sqft} sq ft at ${hanahanLocation.street}, ${hanahanLocation.city}, ${hanahanLocation.state} ${hanahanLocation.postal}. Hanahan is closer to the port terminals — the shortest drayage runs in our network. Drayage from Wando Welch, North Charleston Terminal, and Hugh K. Leatherman can be part of the same move into either building. Both facilities sit within 25 miles of all three SC Ports Authority ocean terminals.`,
  },
  {
    q: "What should I send, and is a rate published?",
    a: `No rate is published on this page. Send a master bill of lading, a manifest that shows which cartons or pallets belong to which destination, and any routing rules — by store, by DC, or by customer. The deconsolidation page says to send the manifest and the destinations, and the split is quoted from those. The quote page says the more you can tell us up front, the tighter the quote, and if you are not sure of a number, leave it blank. Call ${business.phoneDisplay}, email ${business.email}, or use the quote form. Hours published on the site are ${businessHours.display}.`,
  },
];

const article = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: TITLE,
  description: DESCRIPTION,
  url: `${SITE_URL}${PATH}`,
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${SITE_URL}${PATH}`,
  },
  image: `${SITE_URL}/images/og-default.jpg`,
  inLanguage: "en-US",
  author: {
    "@type": "Organization",
    name: business.legalName,
    url: SITE_URL,
  },
  publisher: {
    "@type": "Organization",
    name: business.legalName,
    url: SITE_URL,
  },
};

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
      name: "Deconsolidation",
      item: `${SITE_URL}/services/deconsolidation`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Container deconsolidation",
      item: `${SITE_URL}${PATH}`,
    },
  ],
};

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

export default function ContainerDeconsolidationGuidePage() {
  return (
    <>
      <JsonLd id="article-jsonld" data={article} />
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
              href="/services/deconsolidation"
              style={{ color: colors.steel, textDecoration: "none" }}
            >
              Deconsolidation
            </Link>
            <span style={{ margin: "0 10px", color: colors.line }}>/</span>
            <span style={{ color: colors.accent }}>Container deconsolidation</span>
          </nav>

          <div style={eyebrow}>Importer guide</div>
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
            What container deconsolidation is at the Port of Charleston
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
            Break a single inbound container or trailer into multiple
            outbound shipments — by customer, by store, by region.
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
            Especially useful for importers consolidating overseas to save
            ocean freight, then needing the cargo split once it lands.{" "}
            {business.name}, family-run since {business.foundedYear}, keeps
            two buildings in the Charleston metro. The primary building is
            the{" "}
            <Link href={ladsonLocation.path} style={linkStyle}>
              {ladsonLocation.query}
            </Link>
            , {ladsonLocation.sqft} sq ft at {ladsonLocation.street},{" "}
            {ladsonLocation.city}. The secondary building is the{" "}
            <Link href={hanahanLocation.path} style={linkStyle}>
              {hanahanLocation.query}
            </Link>
            , {hanahanLocation.sqft} sq ft at {hanahanLocation.street},{" "}
            {hanahanLocation.city}. Together the buildings are 90,000+ sq ft.
            Both are US Customs Bonded: a CBP Class 3 bonded warehouse — an
            importer&apos;s private bonded warehouse — and a CBP-designated
            General Order facility. This guide explains container
            deconsolidation at the Port of Charleston. The service page is{" "}
            <Link href="/services/deconsolidation" style={linkStyle}>
              Port of Charleston deconsolidation
            </Link>
            . It does not publish a rate. Use the{" "}
            <Link href="/quote" style={linkStyle}>
              quote form
            </Link>{" "}
            or call {business.phoneDisplay}.
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
            <Fact label="Inbound" value="Container or trailer" />
            <Fact label="Sort" value="Customer, store, region" />
            <Fact label="Outbound" value="House BOLs and LTL" />
            <Fact label="Warehouses" value="Ladson and Hanahan" />
          </div>
        </div>
      </section>

      <section style={{ padding: "56px 0" }}>
        <div style={container}>
          <div style={eyebrow}>1 · What it is</div>
          <h2 style={h2Style}>
            One master bill, then a house bill for each destination.
          </h2>
          <p style={ledeStyle}>
            Container deconsolidation breaks one inbound container or
            trailer into multiple outbound shipments — by customer, by
            store, or by region. That is the definition on the{" "}
            <Link href="/services/deconsolidation" style={linkStyle}>
              deconsolidation page
            </Link>
            . The warehouse does that split on the floor in Ladson and
            Hanahan, before a long inland haul. One master bill becomes
            several house bills of lading, tendered as LTL or truckload.
            The{" "}
            <Link href="/services" style={linkStyle}>
              services page
            </Link>{" "}
            calls the same work one in, many out. On this site, Charleston
            deconsolidation means that warehouse split. The company is{" "}
            {business.legalName}. School-district deconsolidation is a
            different topic and is not a service offered here.
          </p>
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
          <div style={eyebrow}>2 · When importers use it</div>
          <h2 style={h2Style}>
            Several customers, several stops, or freight still on bond.
          </h2>
          <p style={ledeStyle}>
            One container may hold several customers or stores. The same
            SKU set may need to land at more than one DC or store group.
            The outbound is built to those stops from the manifest and the
            routing rules sent with the booking, instead of sending the
            whole box inland. Each destination leaves on its own house BOL,
            as LTL or truckload. Parcel is a{" "}
            <Link href="/services/pick-pack" style={linkStyle}>
              pick and pack
            </Link>{" "}
            question, not a deconsolidation one.
          </p>
          <p style={ledeStyle}>
            In general industry language, a full container loaded for more
            than one customer is sometimes called an FCL consolidation,
            freight that shared a box is sometimes called LCL, and a split
            across several customers is sometimes called multi-consignee.
            Those names are not separate services on this site. The pages
            describe one inbound container or trailer. The{" "}
            <Link href="/services/cross-dock" style={linkStyle}>
              cross-dock page
            </Link>{" "}
            uses LCL for the opposite movement: several inbounds, including
            LCL, less-than-truckload, parcel, and container loads, combined
            into one outbound by a specific time.
          </p>
          <p style={ledeStyle}>
            One container may have left the origin with several customers
            or stores inside it. If the destinations are not all ready the
            day the box lands, each outbound leaves when that receiver can
            take it. Cargo that is still on bond can be deconsolidated on
            the Class 3 floor and withdrawn by destination when each entry
            is ready.
          </p>
        </div>
      </section>

      <section style={{ padding: "56px 0" }}>
        <div style={container}>
          <div style={eyebrow}>3 · How the words differ</div>
          <h2 style={h2Style}>
            Devanning, cross-dock, transloading, and bonded storage.
          </h2>
          <p style={ledeStyle}>
            These words sit next to each other on the site, and they are
            not interchangeable.{" "}
            <Link href="/services/devanning" style={linkStyle}>
              Devanning
            </Link>
            , sometimes called stripping or destuffing, is the hand-unload
            of an ocean container at the warehouse rather than at the port
            terminal, with a piece-count audit against the bill of lading.
            The devanning page says the seal number is recorded against the
            bill of lading before the seal is broken.
            Floor-loaded freight is devanned and piece-counted first, then
            sorted to destination. Palletized freight is broken down only
            as far as the manifest requires. After a devan, cargo can be
            staged to rack, cross-docked to an outbound carrier, or
            palletized per the SOP. Deconsolidation is the path that
            leaves as separate house bills of lading and LTL or truckload
            pickups.
          </p>
          <p style={ledeStyle}>
            <Link href="/services/cross-dock" style={linkStyle}>
              Cross-dock
            </Link>{" "}
            is about speed: freight in one side and out the other, often
            the same day, with little or no dwell. Deconsolidation is
            about the split itself. A load can be deconsolidated and then
            cross-docked, or it can sit until each destination is ready.
            When one inbound container has to become several house BOLs,
            the cross-dock page calls that split deconsolidation.{" "}
            <Link href="/services/transloading" style={linkStyle}>
              Container transloading
            </Link>{" "}
            is the port-direct version of cross-dock. The container comes
            off the chassis, is devanned on the dock, and the freight
            moves straight to outbound staging — no put-away, no rack
            pull, no second touch.
          </p>
          <p style={ledeStyle}>
            <Link href="/services/bonded-storage" style={linkStyle}>
              Bonded storage
            </Link>{" "}
            is voluntary: the importer or the broker elects to place cargo
            on bond. {business.name} is a CBP Class 3 bonded warehouse —
            an importer&apos;s private bonded warehouse. The{" "}
            <Link href="/services/drayage" style={linkStyle}>
              drayage
            </Link>{" "}
            page says a Class 3 warehouse can take an in-bond container
            off the terminal and receive it onto the bonded floor without
            breaking the bond. Cargo that is still in bond can be
            deconsolidated on that floor and withdrawn, or re-exported, by
            destination. The split does not have to break the bond. Duty
            is owed when the cargo is withdrawn for US consumption, or not
            at             all if it is re-exported under bond. Under the standard CBP
            rule on the bonded page, bonded cargo can remain up to five
            years from importation. That window is the bonded rule, not a
            time for the split.{" "}
            <Link href="/services/general-order" style={linkStyle}>
              General Order
            </Link>{" "}
            is unclaimed freight, a different status.
          </p>
          <div
            style={{
              marginTop: 28,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 14,
            }}
          >
            <CompareCard
              title="Devanning"
              body="Hand-unload and piece-count at the warehouse. Floor-loaded freight is counted, then sorted. Palletized freight is broken down only as far as the manifest requires."
            />
            <CompareCard
              title="Cross-dock"
              body="In one side and out the other, often the same day. A load can be deconsolidated and then cross-docked, or it can sit until each destination is ready."
            />
            <CompareCard
              title="Transloading"
              body="Port-direct cross-dock: off the chassis, devanned on the dock, straight to outbound staging. No put-away, no rack pull, no second touch."
            />
            <CompareCard
              title="Bonded storage"
              body="Voluntary Class 3 hold. In-bond cargo can be split on that floor and withdrawn, or re-exported, by destination without having to break the bond."
            />
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
          <div style={eyebrow}>4 · Ladson and Hanahan</div>
          <h2 style={h2Style}>
            The split happens on the warehouse floor, before a long inland haul.
          </h2>
          <p style={ledeStyle}>
            Container deconsolidation in Charleston, SC runs from both
            buildings named above.{" "}
            <Link href={hanahanLocation.path} style={linkStyle}>
              {hanahanLocation.city}
            </Link>{" "}
            is closer to the port terminals — the shortest drayage runs in
            our network. Inventory moves between the buildings as needed.
            Same WMS, same crew, same phone number, {business.phoneDisplay}.
            Both are on the{" "}
            <Link href={locationsPath} style={linkStyle}>
              locations
            </Link>{" "}
            page. The primary floor is the{" "}
            <Link href={ladsonLocation.path} style={linkStyle}>
              {ladsonLocation.facilityName}
            </Link>
            .
          </p>
          <p style={ledeStyle}>
            <Link href="/services/drayage" style={linkStyle}>
              Drayage
            </Link>{" "}
            from Wando Welch, North Charleston Terminal, and Hugh K.
            Leatherman can be part of the same move into either building.
            From {ladsonLocation.street}, {ladsonLocation.city}:{" "}
            {ladsonMiles}. From {hanahanLocation.street},{" "}
            {hanahanLocation.city}: {hanahanMiles}. Both facilities sit
            within 25 miles of all three SC Ports Authority ocean
            terminals. The{" "}
            <Link href="/facility" style={linkStyle}>
              facility page
            </Link>{" "}
            states that figure, and the per-building miles are on the{" "}
            <Link href={terminalsGuidePath} style={linkStyle}>
              terminal distances
            </Link>{" "}
            guide.
          </p>
          <p style={ledeStyle}>
            The container or trailer arrives at the dock with the master
            bill of lading. Palletized freight is checked against the
            manifest. Floor-loaded freight is hand-unloaded and
            piece-counted before anything is blended into a destination.
            Cartons and pallets are staged by customer, store, or region
            using the manifest and the routing rules sent with the booking.
            The warehouse does not guess which cartons belong together.
            Each destination leaves on its own house BOL, as LTL or
            truckload. Pallet labels match what the receiving DC expects.
          </p>
          <p style={ledeStyle}>
            Send a master bill of lading, a manifest that shows which
            cartons or pallets belong to which destination, and routing
            rules by store, DC, or customer. No rate is printed on this
            page. The split is quoted from those documents. The{" "}
            <Link href="/quote" style={linkStyle}>
              quote page
            </Link>{" "}
            says the more you can tell us up front, the tighter the quote,
            and to leave a number blank if you are not sure. Call{" "}
            {business.phoneDisplay} or email {business.email}. Hours are{" "}
            {businessHours.display}.
          </p>
        </div>
      </section>

      <section style={{ padding: "56px 0" }}>
        <div style={container}>
          <div style={eyebrow}>Related pages</div>
          <h2 style={h2Style}>The pages this walkthrough is drawn from.</h2>
          <p style={ledeStyle}>
            The service page is{" "}
            <Link href="/services/deconsolidation" style={linkStyle}>
              Port of Charleston deconsolidation
            </Link>
            . The unload is{" "}
            <Link href="/services/devanning" style={linkStyle}>
              container devanning in Charleston
            </Link>
            . Freight in one side and out the other is{" "}
            <Link href="/services/cross-dock" style={linkStyle}>
              cross-dock
            </Link>
            . The port-direct handoff is{" "}
            <Link href="/services/transloading" style={linkStyle}>
              container transloading
            </Link>
            . The voluntary hold is{" "}
            <Link href="/services/bonded-storage" style={linkStyle}>
              bonded storage
            </Link>
            . Both buildings are on the{" "}
            <Link href={locationsPath} style={linkStyle}>
              locations
            </Link>{" "}
            page. A number for a specific shipment starts at the{" "}
            <Link href="/quote" style={linkStyle}>
              quote form
            </Link>
            .
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
            {RELATED.map((item) => (
              <li key={item.href}>
                <TextLink href={item.href} label={item.label} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        style={{
          padding: "56px 0 24px",
          background: colors.paperDeep,
          borderTop: `1px solid ${colors.line}`,
        }}
      >
        <div style={container}>
          <div style={eyebrow}>FAQ</div>
          <h2 style={h2Style}>
            Questions about container deconsolidation in Charleston.
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
          <p style={{ ...ledeStyle, marginTop: 22 }}>
            More answers are on the{" "}
            <Link href="/faq" style={linkStyle}>
              FAQ
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
            Send the manifest and the destinations.
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
            A rate is not printed on this page. The split is quoted from
            the documents on that shipment. Use the quote form or call{" "}
            {business.phoneDisplay}. Hours are {businessHours.display}.
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

function CompareCard({ title, body }: { title: string; body: string }) {
  return (
    <div
      style={{
        background: colors.paper,
        border: `1px solid ${colors.line}`,
        borderRadius: 12,
        padding: 20,
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
        {title}
      </h3>
      <p
        style={{
          fontFamily: fonts.body,
          fontSize: 15,
          lineHeight: 1.6,
          color: colors.steel,
          marginTop: 8,
          marginBottom: 0,
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
