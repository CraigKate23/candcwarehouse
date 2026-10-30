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
  fbaGuidePath,
  fonts,
  hanahanLocation,
  ladsonLocation,
  terminalsGuidePath,
} from "../../components/styles";

// Facts on this page are restated from pages already on the site:
// /services/fba-prep, /services/drayage, /services/devanning,
// /services/bonded-storage, /services/wms, /facility, /faq,
// /locations/ladson-sc, /locations/hanahan-sc, and the terminals guide.
// Mile strings come from ladsonLocation.drives and hanahanLocation.drives.
// Combined ranges are the strings already printed on /services/drayage.
// No rate is printed here.

const PATH = fbaGuidePath;
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.candcwarehouse.com";

const TITLE = "Port of Charleston to Amazon FBA | Importer Guide | C&C";
const DESCRIPTION =
  "How a Port of Charleston container moves to Amazon FBA: terminal drayage, piece-count devan, Class 3 bond, prep, and portal counts at C&C.";

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
        alt: "C&C Warehouse — importer guide from the Port of Charleston terminals to Amazon FBA prep in Ladson and Hanahan, SC",
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

// Ranges already printed on /services and /services/drayage. En dash
// matches those pages.
const PUBLISHED_RANGE: Record<(typeof OCEAN_LABELS)[number], string> = {
  "Wando Welch": "~16\u201324 miles",
  NCT: "~7\u201314 miles",
  Leatherman: "~6\u201314 miles",
};

const TERMINALS = OCEAN_LABELS.map((label) => ({
  label,
  ladson: driveByLabel(ladsonLocation.drives, label),
  hanahan: driveByLabel(hanahanLocation.drives, label),
  range: PUBLISHED_RANGE[label],
}));

function headingFor(label: string, name: string) {
  if (label === "NCT") return `${name} (NCT)`;
  return name;
}

function buildingMiles(drives: readonly Drive[]) {
  return TERMINALS.map((terminal) => {
    const drive = driveByLabel(drives, terminal.label);
    return `${drive.name} is ${drive.about}`;
  }).join(", ");
}

const ladsonMiles = buildingMiles(ladsonLocation.drives);
const hanahanMiles = buildingMiles(hanahanLocation.drives);

const RELATED: { href: string; label: string }[] = [
  { href: "/services/fba-prep", label: "Amazon FBA prep" },
  { href: "/services/drayage", label: "Drayage" },
  { href: "/services/devanning", label: "Devanning" },
  { href: "/services/bonded-storage", label: "Bonded storage" },
  { href: "/services/wms", label: "WMS-tracked inventory" },
  { href: ladsonLocation.path, label: `${ladsonLocation.city} warehouse` },
  { href: hanahanLocation.path, label: `${hanahanLocation.city} warehouse` },
  { href: terminalsGuidePath, label: "Terminal distances" },
  { href: "/quote", label: "Request a quote" },
];

const FAQ: { q: string; a: string }[] = [
  {
    q: "Which Port of Charleston terminals can you pick a container up from, and how far are the warehouses?",
    a: `Drayage is the short-haul container move between the SC Ports Authority terminals and the warehouse. The drayage page names Wando Welch, North Charleston Terminal (NCT), and Hugh K. Leatherman. Ranges printed for both buildings: Wando Welch ${PUBLISHED_RANGE["Wando Welch"]}, North Charleston Terminal ${PUBLISHED_RANGE.NCT}, and Hugh K. Leatherman ${PUBLISHED_RANGE.Leatherman}. From ${ladsonLocation.street}, ${ladsonLocation.city}: ${ladsonMiles}. From ${hanahanLocation.street}, ${hanahanLocation.city}: ${hanahanMiles}. The facility page states that both buildings sit within 25 miles of all three ocean terminals.`,
  },
  {
    q: "What does the piece-count devan include before anything is prepped for FBA?",
    a: "On the devanning page, devanning means a hand-unload at the warehouse, with a piece-count audit and exception documentation against the bill of lading. The container is photographed and the seal number is recorded against the BOL before the seal is broken. Each carton, drum, or piece is counted as it crosses the dock. Shortages, overages, mis-marks, and damaged pieces are flagged, photographed, and noted. You get a signed piece-count tally, the exception list with photographs, and the original seal number, sent the same day the container is unloaded. An unload video is optional on request. Bonded containers can be devanned under bond into bonded inventory without breaking the bond. Timing depends on the load: a palletized, slip-sheet, or pre-stacked load can come out in an hour or two, and a floor-loaded 40-foot HC of mixed cartons typically takes most of a shift. Counts and damage notes are completed in that same window.",
  },
  {
    q: "Can the goods stay on bond before they are entered and sent to Amazon FBA?",
    a: "Yes. Bonded storage is voluntary: the importer or their broker elects to place cargo on bond. C&C is a CBP-designated Class 3 bonded warehouse, the importer's private bonded warehouse classification. Duty is owed when the cargo is withdrawn for US consumption, not while it sits. Under the standard CBP rule, cargo can remain up to five years from the date of importation. Bonded inventory is tracked at the SKU and lot level, and partial withdrawals are allowed, so some of a container can go to FBA while the rest stays on bond. The bonded storage page describes holding imported inventory on bond and withdrawing it in tranches as Amazon needs it, with duty deferred on the rest. Drayage can run as an in-bond move so that status carries from the terminal onto the bonded floor.",
  },
  {
    q: "Which FBA prep steps does C&C already list?",
    a: "The FBA prep page lists inspection, FNSKU labeling, polybagging with suffocation warnings, bubble wrap, and bundling, and says Amazon's prep rules are treated as production specs. Bags with a 5-inch or larger opening need a suffocation warning, barcodes must scan through the bag, and every unit needs its FNSKU. Oversize, heavy, and automotive product is accepted. Hazardous materials, cold-chain, and live animals are not. Inbound can be a container, LTL, or parcel. Forwarding is carton or pallet, labeled and tendered on Amazon partnered-carrier rates, with a signed tally the same day it ships. You create the shipment plan; the warehouse confirms the numbers match before anything ships. That page also states that as of January 1, 2026, Amazon no longer labels, bags, or preps inventory at its US fulfillment centers, and that inventory which does not arrive prepped does not qualify for damage reimbursement.",
  },
  {
    q: "How do I see inventory while it is in the warehouse?",
    a: `Counts live in a warehouse management system, not a spreadsheet. The importer portal is ${business.portalHost}. On-hand, aging, in-and-out activity, and bond status are pulled on demand. Bonded, General Order, and free cargo show under one logon, for both ${ladsonLocation.city} and ${hanahanLocation.city}. Lot and serial numbers are tracked when the product has them. The FBA prep page also describes live counts and photos in the customer portal. The phone number is still ${business.phoneDisplay} when the portal is not the right tool.`,
  },
  {
    q: "How do I get a price for drayage, devan, bond, or FBA prep?",
    a: `This page does not publish a rate. Use the quote form or call ${business.phoneDisplay}. Hours published on the site are ${businessHours.display}. Email is ${business.email}.`,
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
      name: "Amazon FBA prep",
      item: `${SITE_URL}/services/fba-prep`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Port to Amazon FBA",
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

export default function PortOfCharlestonToAmazonFbaPage() {
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
              href="/services/fba-prep"
              style={{ color: colors.steel, textDecoration: "none" }}
            >
              Amazon FBA prep
            </Link>
            <span style={{ margin: "0 10px", color: colors.line }}>/</span>
            <span style={{ color: colors.accent }}>Port to Amazon FBA</span>
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
            From the Port of Charleston to Amazon FBA
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
            Terminal pickup, a piece-count devan, an optional bond hold, then
            the prep and forwarding already listed for FBA.
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
            Bonded: a CBP Class 3 bonded warehouse — an importer&apos;s
            private bonded warehouse — and a CBP-designated General Order
            facility. This walkthrough is for an importer whose container
            lands at the Port of Charleston and whose goods are headed to
            Amazon FBA. The steps follow the{" "}
            <Link href="/services/drayage" style={linkStyle}>
              drayage
            </Link>
            ,{" "}
            <Link href="/services/devanning" style={linkStyle}>
              devanning
            </Link>
            ,{" "}
            <Link href="/services/bonded-storage" style={linkStyle}>
              bonded storage
            </Link>
            , and{" "}
            <Link href="/services/fba-prep" style={linkStyle}>
              FBA prep
            </Link>{" "}
            pages. A rate is not printed here. Use the{" "}
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
            <Fact label="Wando Welch" value={PUBLISHED_RANGE["Wando Welch"]} />
            <Fact label="North Charleston" value={PUBLISHED_RANGE.NCT} />
            <Fact label="Leatherman" value={PUBLISHED_RANGE.Leatherman} />
            <Fact label="Bond" value="Class 3, voluntary" />
          </div>
        </div>
      </section>

      <section style={{ padding: "56px 0" }}>
        <div style={container}>
          <div style={eyebrow}>1 · Terminal pickup</div>
          <h2 style={h2Style}>Dray the container off the terminal.</h2>
          <p style={ledeStyle}>
            Drayage is the short-haul between an ocean terminal and the
            warehouse. The{" "}
            <Link href="/services/drayage" style={linkStyle}>
              drayage page
            </Link>{" "}
            names Wando Welch, North Charleston Terminal, and Hugh K.
            Leatherman. Once the container is available, that page says the
            appointment is booked, the chassis is lined up (standard,
            tri-axle, or heavy-haul), and the move is dispatched so the
            cargo does not sit accruing per diem or demurrage. The driver
            pulls the container off the stack, takes possession, and
            confirms the seal is intact before leaving the gate. A seal
            anomaly is photographed and reported before transit, not after.
            Chassis are coordinated through the pool providers named there
            — CCM, Direct, and TRAC — plus heavy-haul chassis for
            overweight ocean containers. Split-and-return of the chassis
            to the originating terminal is part of that drayage scope.
          </p>
          <p style={ledeStyle}>
            The process step on the drayage page brings the container to a
            dock door in Ladson. Both buildings publish drive distances,
            and the{" "}
            <Link href="/facility" style={linkStyle}>
              facility page
            </Link>{" "}
            states that both sit within 25 miles of all three SC Ports
            Authority ocean terminals. Hanahan is described there as closer
            to the port terminals — the shortest drayage runs in the
            network. Per-building miles, including Inland Port Greer, are
            on the{" "}
            <Link href={terminalsGuidePath} style={linkStyle}>
              terminal distances
            </Link>{" "}
            guide. The ranges under each terminal below are the ones the
            drayage page prints for both buildings.
          </p>
          <p style={ledeStyle}>
            Cargo that is not entering US commerce yet can move in bond.
            The drayage page says a Class 3 warehouse can take an in-bond
            container off the terminal and receive it onto the bonded floor
            without breaking the bond. After the unload — same-day devan,
            bonded receipt, or a later pull — the empty is returned and
            the chassis is split back to the originating terminal. If free
            time is running out, that page says pulling the container off
            the terminal onto the warehouse&apos;s paper stops the
            steamship-line per-diem clock, and the cargo can sit on the
            bonded or general floor while destinations are sorted. The
            rate for that time is not printed here.
          </p>
          <div
            style={{
              marginTop: 28,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
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
                <dl
                  style={{
                    marginTop: 14,
                    display: "grid",
                    gap: 12,
                    marginBlockEnd: 0,
                  }}
                >
                  <DriveLine
                    building={ladsonLocation.city}
                    href={ladsonLocation.path}
                    drive={terminal.ladson}
                  />
                  <DriveLine
                    building={hanahanLocation.city}
                    href={hanahanLocation.path}
                    drive={terminal.hanahan}
                  />
                </dl>
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
          <div style={eyebrow}>2 · Devanning</div>
          <h2 style={h2Style}>Unload it and audit the piece count.</h2>
          <p style={ledeStyle}>
            The{" "}
            <Link href="/services/devanning" style={linkStyle}>
              devanning page
            </Link>{" "}
            defines the word the way this warehouse uses it: a hand-unload
            at the warehouse, not at the terminal, with a piece-count audit
            and exception documentation against the bill of lading. The
            container is photographed, and the seal number is recorded
            against the BOL before the seal is broken. Floor-loaded or
            palletized cargo comes out by hand. Each carton, drum, or piece
            is counted as it crosses the dock — the page says there is no
            shortcut tally taken from a packing list.
          </p>
          <p style={ledeStyle}>
            Counts are reconciled in real time against the bill of lading.
            Shortages, overages, mis-marks, and damaged pieces are flagged,
            photographed, and noted on the unload report. What comes back
            is a signed piece-count tally reconciled against the BOL, the
            exception list with photographs, and the original seal number.
            That package is sent the same day the container is unloaded.
            An unload video is available on request. Cargo is then staged
            to rack, cross-docked to the outbound carrier, or palletized
            per the SOP.
          </p>
          <p style={ledeStyle}>
            How long the unload takes depends on how the container was
            loaded. The devanning page says a palletized, slip-sheet, or
            pre-stacked load can come out in an hour or two, and a
            floor-loaded 40-foot HC of mixed cartons typically takes most
            of a shift. Counts and damage notes are completed in that same
            window. Bonded containers can be devanned under bond into
            bonded inventory without breaking the bond. For freight that
            is going to Amazon, the{" "}
            <Link href="/services/fba-prep" style={linkStyle}>
              FBA prep page
            </Link>{" "}
            says the receipt is against the packing list, exceptions are
            photographed as the crew goes, and the discipline is the same
            as the devan piece-count audit. Sellable units are prepped and
            forwarded from that facility.
          </p>
        </div>
      </section>

      <section style={{ padding: "56px 0" }}>
        <div style={container}>
          <div style={eyebrow}>3 · On bond, if you want it</div>
          <h2 style={h2Style}>Hold the goods before entry.</h2>
          <p style={ledeStyle}>
            This step is optional. On the{" "}
            <Link href="/services/bonded-storage" style={linkStyle}>
              bonded storage page
            </Link>
            , bonded storage is voluntary: the importer or their broker
            elects to place cargo on bond. General Order is the other
            path, and it is involuntary — cargo that sits at the port
            unclaimed past the 15-day window can be moved by CBP to a
            GO-designated facility. {business.name} handles both. This
            guide is the voluntary hold, used before freight becomes
            unclaimed.
          </p>
          <p style={ledeStyle}>
            Class 3 is the importer&apos;s private bonded warehouse
            classification. Imported merchandise can sit without import
            duty at arrival. Duty is owed when the cargo is withdrawn for
            US consumption, or not at all if it is re-exported under bond.
            The FBA prep page says the same thing in fewer words: duty is
            owed when goods enter for consumption, not while they sit
            here. Under the standard CBP rule stated on the bonded page,
            cargo can remain up to five years from the date of importation.
          </p>
          <p style={ledeStyle}>
            Bonded inventory is tracked at the SKU and lot level, and the
            bonded page says CBP permits partial withdrawals against the
            original entry. Pull some of the freight and leave the rest on
            bond. That is the FBA use the same page describes: hold
            imported inventory on bond and withdraw it in tranches as
            Amazon needs it, with duty deferred on the rest. The warehouse
            coordinates with the customs broker on entry, withdrawal, and
            re-export filings, and keeps the warehouse-side record CBP
            requires — receipt, location, withdrawal, and balance. When
            the importer is ready, the bonded page says the withdrawal is
            filed with CBP: pay duty and release for consumption, or
            re-export under bond.
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
          <div style={eyebrow}>4 · FBA prep</div>
          <h2 style={h2Style}>Inspect, label, bag, bundle, and forward.</h2>
          <p style={ledeStyle}>
            The{" "}
            <Link href="/services/fba-prep" style={linkStyle}>
              FBA prep page
            </Link>{" "}
            lists the work after the count: inspection, FNSKU labeling,
            polybagging with suffocation warnings, bubble wrap, and
            bundling. Amazon&apos;s prep rules are treated as production
            specs. The details that page already prints: bags with a
            5-inch or larger opening need a suffocation warning, barcodes
            must scan through the bag, and every unit needs its FNSKU.
          </p>
          <p style={ledeStyle}>
            The same page states the 2026 change it is written around. As
            of January 1, 2026, Amazon no longer labels, bags, or preps
            inventory at its US fulfillment centers. Everything sent must
            arrive prepped, or it does not qualify for damage
            reimbursement. The guidance stated there is to prep it
            yourself or hire a third-party prep provider. For importers
            through Charleston, that page says the product is prepped the
            same week it clears.
          </p>
          <div
            style={{
              marginTop: 28,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 14,
            }}
          >
            <PrepCard
              title="What gets prepped"
              body="Inspection, FNSKU labeling, polybagging with suffocation warnings, bubble wrap, and bundling. Oversize, heavy, and automotive product is accepted. Hazardous materials, cold-chain, and live animals are not."
            />
            <PrepCard
              title="How it can arrive"
              body="A container from the port, LTL from a supplier, or parcel. The FBA page says the container path is devan and prep in one facility."
            />
            <PrepCard
              title="How it leaves"
              body="Carton or pallet, labeled and tendered on Amazon partnered-carrier rates. You create the shipment plan. The warehouse confirms the numbers match before anything ships. A signed tally goes out the same day it ships."
            />
          </div>
        </div>
      </section>

      <section style={{ padding: "56px 0" }}>
        <div style={container}>
          <div style={eyebrow}>5 · Visibility</div>
          <h2 style={h2Style}>Read the count in the portal.</h2>
          <p style={ledeStyle}>
            The{" "}
            <Link href="/services/wms" style={linkStyle}>
              WMS page
            </Link>{" "}
            says receive, putaway, pick, and ship are tracked in a
            warehouse management system. Bonded, General Order, and free
            cargo show under one logon at{" "}
            <a href={business.portalUrl} style={linkStyle}>
              {business.portalHost}
            </a>
            . On-hand, aging, in-and-out activity, and bond status are
            pulled on demand. Lot and serial numbers are tracked when the
            product has them. Both{" "}
            <Link href={ladsonLocation.path} style={linkStyle}>
              {ladsonLocation.city}
            </Link>{" "}
            and{" "}
            <Link href={hanahanLocation.path} style={linkStyle}>
              {hanahanLocation.city}
            </Link>{" "}
            are on the system. The facility page states 3,000+ racked
            pallet positions across the two buildings, plus floor-load
            space for oversized cargo. The portal shows what is actually
            on hand.
          </p>
          <p style={ledeStyle}>
            Bond status travels with putaway, so bonded cartons are not
            mixed into a free-cargo pick face. That matters when part of
            a container is still on bond and part has been withdrawn for
            FBA. The FBA prep page adds live counts and photos in the
            customer portal, and says the shipment plan is yours to
            create — the warehouse confirms the numbers match before
            anything ships. The phone number on the WMS page is still{" "}
            {business.phoneDisplay} when the portal is not the right tool.
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
          <div style={eyebrow}>Related pages</div>
          <h2 style={h2Style}>The pages this walkthrough is drawn from.</h2>
          <p style={ledeStyle}>
            Drayage, devanning, bonded storage, and FBA prep each have
            their own page. So do the two buildings, the published
            terminal miles, and the quote form.
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

      <section style={{ padding: "56px 0 24px" }}>
        <div style={container}>
          <div style={eyebrow}>FAQ</div>
          <h2 style={h2Style}>Questions on the port-to-FBA path.</h2>
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
            Send the container details when you want a number.
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
            Rates are not printed on this page. Use the quote form or call{" "}
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

function PrepCard({ title, body }: { title: string; body: string }) {
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
