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
  goGuidePath,
  hanahanLocation,
  ladsonLocation,
  terminalsGuidePath,
  transloadGuidePath,
} from "../../components/styles";

// Facts on this page are restated from pages already on the site:
// /services/cross-dock, /services (cross-dock section), /services/devanning,
// /services/deconsolidation, /services/drayage, /services/bonded-storage,
// /facility, /faq, /quote, /contact, and the location pages.
// Mile strings come from ladsonLocation.drives and hanahanLocation.drives.
// Combined ranges are the strings already printed on /services and
// /services/drayage. No rate, fee, or new throughput figure is added here.

const PATH = transloadGuidePath;
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.candcwarehouse.com";

const TITLE = "Transloading Charleston SC | Port of Charleston | C&C";
const DESCRIPTION =
  "Port of Charleston transload warehouse for container transloading in Charleston, SC. Off the chassis, devanned on the dock, quoted from the documents.";

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
        alt: "C&C Warehouse — guide to container transloading at the Port of Charleston, from the terminals to Ladson and Hanahan, SC",
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
    const route = drive.route.endsWith(".")
      ? drive.route.slice(0, -1)
      : drive.route;
    return `${drive.name} is ${drive.about}, ${route}`;
  }).join(". ");
}

const ladsonMiles = buildingMiles(ladsonLocation.drives);
const hanahanMiles = buildingMiles(hanahanLocation.drives);

const RELATED: { href: string; label: string }[] = [
  { href: "/services/cross-dock", label: "Cross-dock and transload" },
  { href: "/services/devanning", label: "Container devanning in Charleston" },
  { href: "/services/deconsolidation", label: "Port of Charleston deconsolidation" },
  { href: "/services/drayage", label: "Drayage" },
  { href: "/services/bonded-storage", label: "Bonded storage" },
  { href: "/facility", label: "Facility" },
  { href: terminalsGuidePath, label: "Terminal distances" },
  { href: ladsonLocation.path, label: ladsonLocation.query },
  { href: hanahanLocation.path, label: hanahanLocation.query },
  { href: "/quote", label: "Request a quote" },
];

const FAQ: { q: string; a: string }[] = [
  {
    q: "What is container transloading in Charleston?",
    a: "Container transloading in Charleston is the port-direct devan and cross-dock. The container comes off the chassis, is devanned on the dock, and the freight moves straight to outbound staging — no put-away, no rack pull, no second touch. It pairs with the same-crew drayage and devan pattern. The cargo touches the warehouse floor, but it doesn't dwell. The services page calls transloading the port-direct version of cross-dock, and the FAQ lists the service as cross-dock (transload).",
  },
  {
    q: "How is transloading different from cross-dock and from storage?",
    a: "Cross-docking is when freight comes in on one dock, gets sorted, and is immediately tendered back out on another dock — without being put away into rack storage in between. The cargo touches the warehouse floor, but it doesn't dwell. It is the right shape when transit time matters more than storage cost. The cross-dock page names retailer compliance windows, DC bypass, and time-defined consolidations, and it says those consolidations can combine LCL, less-than-truckload, parcel, and container loads. Transloading is the container, port-direct version of that work. Storage is the other path. Cross-dock cargo is staged for movement, not for storage. If the outbound carrier does not pull until the following day, the freight is staged on the floor, not in rack, and tendered at the booked appointment. The facility page states 3,000+ racked pallet positions across both buildings, plus floor-load capacity for oversized cargo. That rack is for freight that is put away. Transloading does not use it. Bonded storage is a separate, voluntary hold: the importer or broker elects to place cargo on bond.",
  },
  {
    q: "How is transloading different from devanning and deconsolidation?",
    a: "Devanning, sometimes called stripping or destuffing, is the hand-unload of an ocean container at the warehouse rather than at the port terminal, with a piece-count audit and exception documentation against the bill of lading. After a devan, the devanning page says cargo can be staged to rack, cross-docked to an outbound carrier, or palletized per the SOP. When the freight moves straight to outbound staging with no put-away, that handoff is transloading. Deconsolidation is the split. The deconsolidation page says cross-dock is about speed — freight in one side and out the other, often the same day, with little or no dwell — and deconsolidation is about the split itself. One master bill becomes several outbound shipments, each with its own house BOL. A load can be deconsolidated and then cross-docked, or it can sit until each destination is ready. The cross-dock page says that when one inbound container has to become several house BOLs, that split is deconsolidation.",
  },
  {
    q: "How does a container move from the Port of Charleston terminals to Ladson or Hanahan and back out?",
    a: `Drayage is the short-haul between the SC Ports Authority terminals and the warehouse. The terminals named for that inbound leg are Wando Welch, North Charleston Terminal, and Hugh K. Leatherman. Once the container is available, the appointment is booked, the chassis is lined up (standard, tri-axle, or heavy-haul), and the move is dispatched so the cargo does not sit accruing per diem or demurrage. The driver pulls the container off the stack, takes possession, and confirms the seal is intact before leaving the gate. A seal anomaly is photographed and reported before transit. The process step on the drayage page brings the container to a dock door in Ladson. The cross-dock page says that same drayage is the inbound leg into either building. Ranges printed for both buildings: Wando Welch ${PUBLISHED_RANGE["Wando Welch"]}, North Charleston Terminal ${PUBLISHED_RANGE.NCT}, and Hugh K. Leatherman ${PUBLISHED_RANGE.Leatherman}. From ${ladsonLocation.street}, ${ladsonLocation.city}: ${ladsonMiles}. From ${hanahanLocation.street}, ${hanahanLocation.city}: ${hanahanMiles}. Both buildings sit within 25 miles of all three ocean terminals. On the dock the container comes off the chassis, is devanned, and the freight moves straight to outbound staging. Same-day when the inbound and outbound windows align. After the unload, the empty is returned and the chassis is split back to the originating terminal.`,
  },
  {
    q: "What should I have ready when I request a transload quote?",
    a: `This page does not publish a rate. Quotes come from the documents on that shipment. The cross-dock page asks for the routing guide, the inbound shape, and the outbound destinations, and says the dock plan is quoted from those. If a retailer has a compliance manual, share it before the first load. The drayage page asks for the booking, the vessel ETA, and the destination. The devanning page asks for the bill of lading and the ETA. If one container has to leave as separate shipments, the deconsolidation page asks for a master bill of lading, a manifest that shows which cartons or pallets belong to which destination, and any routing rules — by store, by DC, or by customer. The quote page says the more you can tell us up front, the tighter the quote, and if you are not sure of a number, leave it blank. Call ${business.phoneDisplay}, email ${business.email}, or use the quote form. Hours published on the site are ${businessHours.display}.`,
  },
  {
    q: "Can transload freight stay in bond?",
    a: `Yes, when the inbound is in-bond and the outbound is also a bonded move, such as a move to another bonded facility or a re-export. The cross-dock page says that freight can be cross-docked under bond without breaking the status. The drayage page says a Class 3 warehouse can take an in-bond container off the terminal and receive it onto the bonded floor without breaking the bond. ${business.name} is a CBP Class 3 bonded warehouse — an importer's private bonded warehouse — and a CBP-designated General Order facility in ${ladsonLocation.city} and ${hanahanLocation.city}.`,
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
      name: "Cross-dock",
      item: `${SITE_URL}/services/cross-dock`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "Transloading",
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

export default function TransloadingPortOfCharlestonPage() {
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
              href="/services/cross-dock"
              style={{ color: colors.steel, textDecoration: "none" }}
            >
              Cross-dock
            </Link>
            <span style={{ margin: "0 10px", color: colors.line }}>/</span>
            <span style={{ color: colors.accent }}>Transloading</span>
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
            What transloading is at the Port of Charleston
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
            A container off the chassis, devanned on the dock, and straight
            to outbound staging.
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
            two buildings in the Charleston metro. The primary building is the{" "}
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
            General Order facility. This page restates the{" "}
            <Link href="/services/cross-dock" style={linkStyle}>
              cross-dock
            </Link>
            ,{" "}
            <Link href="/services/devanning" style={linkStyle}>
              container devanning in Charleston
            </Link>
            ,{" "}
            <Link href="/services/deconsolidation" style={linkStyle}>
              deconsolidation
            </Link>
            , and{" "}
            <Link href="/services/drayage" style={linkStyle}>
              drayage
            </Link>{" "}
            pages. It does not publish a rate. Quotes come from the documents
            on that shipment. Use the{" "}
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
            <Fact label="Turn" value="Same-day when windows align" />
          </div>
        </div>
      </section>

      <section style={{ padding: "56px 0" }}>
        <div style={container}>
          <div style={eyebrow}>1 · What it is</div>
          <h2 style={h2Style}>
            Container transloading is the port-direct devan and cross-dock.
          </h2>
          <p style={ledeStyle}>
            The{" "}
            <Link href="/services/cross-dock#transloading" style={linkStyle}>
              cross-dock page
            </Link>{" "}
            states the definition in one place. Container transloading in
            Charleston is the port-direct devan and cross-dock. The container
            comes off the chassis, is devanned on the dock, and the freight
            moves straight to outbound staging — no put-away, no rack pull,
            no second touch. It pairs with the same-crew drayage and devan
            pattern. The cargo touches the warehouse floor, but it
            doesn&apos;t dwell.
          </p>
          <p style={ledeStyle}>
            The{" "}
            <Link href="/services" style={linkStyle}>
              services page
            </Link>{" "}
            says the same thing in fewer words. Cross-dock receives freight
            on one dock, sorts it, and tenders it back out the other side
            without warehousing it in between. Container transloading is the
            port-direct version: container off the chassis, devanned on the
            dock, freight straight to outbound staging, no put-away. The{" "}
            <Link href="/faq" style={linkStyle}>
              FAQ
            </Link>{" "}
            lists it inside that service, as cross-dock (transload), one of
            the ten services. This page does not publish a rate.
          </p>
          <p style={ledeStyle}>
            The cross-dock page names retailer compliance windows, DC
            bypass, and time-defined consolidations as situations for
            cross-dock. A time-defined consolidation, on that page, can
            combine LCL, less-than-truckload, parcel, and container loads
            into one outbound by a specific time. The port-direct case is
            listed on its own: container off the chassis, devanned on the
            dock, freight straight to outbound staging. That is the
            transload, and it pairs with drayage off the Port of Charleston.
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
          <div style={eyebrow}>2 · How the words differ</div>
          <h2 style={h2Style}>
            Cross-dock, storage, devanning, and deconsolidation.
          </h2>
          <p style={ledeStyle}>
            These words sit next to each other on the site, and they are not
            interchangeable. Cross-docking, on the cross-dock page, is freight
            in on one dock, sorted, and immediately tendered back out on
            another dock — without being put away into rack storage in
            between. It is the right shape when transit time matters more
            than storage cost. Transloading is that shape when the inbound is
            a container off the port: off the chassis, devanned on the dock,
            straight to outbound staging.
          </p>
          <p style={ledeStyle}>
            Storage is the put-away the cross-dock page is written against.
            Cargo for a cross-dock is staged for movement, not for storage.
            When the outbound carrier does not pull until the following day,
            that page says the freight is staged on the floor, not in rack,
            and tendered at the booked appointment. The{" "}
            <Link href="/facility" style={linkStyle}>
              facility page
            </Link>{" "}
            states 3,000+ racked pallet positions across both buildings, plus
            floor-load capacity for oversized cargo. That rack is for freight
            that is put away. The{" "}
            <Link href="/services/wms" style={linkStyle}>
              WMS page
            </Link>{" "}
            says receive, putaway, pick, and ship are tracked in a warehouse
            management system. Putaway is the step the cross-dock page leaves
            out: transloading is no put-away, no rack pull, no second touch.{" "}
            <Link href="/services/bonded-storage" style={linkStyle}>
              Bonded storage
            </Link>{" "}
            is a different hold again: voluntary, elected by the importer or
            the broker, not this handoff. The involuntary path, when
            freight goes unclaimed, is the{" "}
            <Link href={goGuidePath} style={linkStyle}>
              General Order cargo
            </Link>{" "}
            guide.
          </p>
          <p style={ledeStyle}>
            <Link href="/services/devanning" style={linkStyle}>
              Devanning
            </Link>{" "}
            is the unload. The devanning page says it is sometimes called
            stripping or destuffing: unloading an ocean container at the
            warehouse rather than at the port terminal, by hand, with a
            piece-count audit and exception documentation against the bill of
            lading. The container is photographed, and the seal number is
            recorded against the BOL before the seal is broken. Each carton,
            drum, or piece is counted as it crosses the dock. Shortages,
            overages, mis-marks, and damaged pieces are flagged, photographed,
            and noted. A signed piece-count tally, the exception list, and
            the original seal number go out the same day the container is
            unloaded. After that count, the same page says cargo can be
            staged to rack, cross-docked to the outbound carrier, or
            palletized per the SOP. When the freight moves straight to
            outbound staging with no put-away, that handoff is transloading.
          </p>
          <p style={ledeStyle}>
            <Link href="/services/deconsolidation" style={linkStyle}>
              Deconsolidation
            </Link>{" "}
            is the split. The deconsolidation page says cross-dock is about
            speed — freight in one side and out the other, often the same
            day, with little or no dwell — and deconsolidation is about the
            split itself. One master bill becomes several outbound shipments,
            each with its own house BOL. A load can be deconsolidated and
            then cross-docked, or it can sit until each destination is ready.
            The cross-dock page points at the same line: when one inbound
            container has to become several house BOLs, that split is
            deconsolidation. Floor-loaded freight is devanned and
            piece-counted first, then sorted to destination. Palletized
            freight is broken down only as far as the manifest requires.
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
              title="Cross-dock"
              body="In on one dock, sorted, and tendered out on another without rack storage in between. Transloading is the port-direct container version of that work."
            />
            <CompareCard
              title="Storage"
              body="Put-away into rack. The buildings have 3,000+ racked pallet positions. If the outbound carrier does not pull until the following day, the freight stays on the floor, not in rack. Bonded storage is a voluntary hold, separate from this handoff."
            />
            <CompareCard
              title="Devanning"
              body="The hand-unload and piece-count at the warehouse, against the bill of lading. After the count, freight can go to rack, to a cross-dock, or onto pallets. Straight to outbound staging, with no put-away, is transloading."
            />
            <CompareCard
              title="Deconsolidation"
              body="The split of one inbound into several house bills of lading, by customer, store, or region. A load can be deconsolidated and then cross-docked, or it can sit until each destination is ready."
            />
          </div>
        </div>
      </section>

      <section style={{ padding: "56px 0" }}>
        <div style={container}>
          <div style={eyebrow}>3 · Terminal to the floor, then back out</div>
          <h2 style={h2Style}>
            From Wando Welch, North Charleston Terminal, or Leatherman.
          </h2>
          <p style={ledeStyle}>
            <Link href="/services/drayage" style={linkStyle}>
              Drayage
            </Link>{" "}
            is the short-haul between an ocean terminal and the warehouse.
            The drayage page names Wando Welch, North Charleston Terminal,
            and Hugh K. Leatherman. Once the container is available at the
            SC Ports Authority terminal, that page says the appointment is
            booked, the chassis is lined up (standard, tri-axle, or
            heavy-haul), and the move is dispatched so the cargo does not
            sit accruing per diem or demurrage. Chassis are coordinated
            through the pool providers named there — CCM, Direct, and TRAC —
            plus heavy-haul chassis for overweight ocean containers.
            Split-and-return of the chassis to the originating terminal is
            part of that drayage scope.
          </p>
          <p style={ledeStyle}>
            The driver pulls the container off the stack, takes possession,
            and confirms the seal is intact before leaving the gate. A seal
            anomaly is photographed and reported before transit, not after.
            The process step on the drayage page brings the container to a
            dock door in Ladson. The same crew that drove it can hand it
            straight to devan — no intermediate yard, no second handoff. The{" "}
            <Link href="/services/cross-dock" style={linkStyle}>
              cross-dock page
            </Link>{" "}
            says drayage from those three terminals is the inbound leg into
            either building. Hanahan is described on the facility page as
            closer to the port terminals — the shortest drayage runs in the
            network. Per-building miles, including Inland Port Greer, are on
            the{" "}
            <Link href={terminalsGuidePath} style={linkStyle}>
              terminal distances
            </Link>{" "}
            guide. The ranges under each terminal below are the ones the
            drayage page prints for both buildings. The{" "}
            <Link href="/facility" style={linkStyle}>
              facility page
            </Link>{" "}
            states that both buildings sit within 25 miles of all three SC
            Ports Authority ocean terminals.
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
          <p style={ledeStyle}>
            On the dock, the transload is the cross-dock sequence with the
            container still the inbound. Before the freight arrives, the
            cross-dock page says the ASN or load list is in hand and the
            dock plan is sketched: which inbound door, which outbound doors,
            and which carriers are scheduled to pull. The cargo is staged
            for movement, not for storage.             Inbound is unloaded onto a
            striped staging zone and piece-counted, or pallet-counted, against
            the ASN. A short, an over, or damage is flagged before the freight
            is blended into the sort. For the container itself, the
            devanning page is the unload: hand-unload at the warehouse, seal
            recorded against the bill of lading before it is broken, and a
            piece count as the freight crosses the dock. That page says a
            palletized, slip-sheet, or pre-stacked load can come out in an
            hour or two, and a floor-loaded 40-foot HC of mixed cartons
            typically takes most of a shift.
          </p>
          <p style={ledeStyle}>
            The sort on the cross-dock page is by SKU, by store, by route,
            by customer, by retailer DC, or a combination. Freight is
            labeled to the downstream WMS&apos;s spec and walked to the
            outbound staging lane for the carrier that is pulling it. The
            most common shape named there is a container in and a truck out:
            drayed from Wando Welch, NCT, or Leatherman, hand-unloaded at
            the dock, and moved directly to outbound staging for the
            carriers pulling that day. One handoff instead of three. When
            the carrier checks in, BOLs are generated and the outbound ASN
            goes to the receiving DC. Labeling on that page can follow the
            receiving party&apos;s routing guide — UCC-128 / GS1-128 case
            labels, pallet placards, an ASN (EDI 856) at tender, and BOLs
            in the format the carrier and the receiver expect. The cargo
            touches the floor, but it doesn&apos;t dwell. The clock on that
            page starts at the inbound gate and ends at the outbound seal.
          </p>
          <p style={ledeStyle}>
            Same-day when the inbound and outbound windows align — in the
            door, sorted, and out again before the next shift. When the
            outbound carrier does not pull until the following day, the
            freight is staged on the floor, not in rack, and tendered at
            the booked appointment. The facility page states peak throughput
            across both locations of 30 containers/day. Devanning, reworking,
            and cross-dock are scaled by product mix.             Inventory moves
            between the two buildings as needed. The cross-dock page says
            both floors use the same WMS, the same crew, and the same phone
            number, {business.phoneDisplay}.
          </p>
          <p style={ledeStyle}>
            The empty goes back to the terminal. After the unload — same-day
            devan, bonded receipt, or a later pull — the drayage page says
            the empty is returned and the chassis is split back to the
            originating terminal. When free time is running out and the
            receiving DC cannot take the load yet, that page says pulling
            the container off the terminal and onto the warehouse&apos;s
            paper avoids per-diem and demurrage piling up at the steamship
            line&apos;s rate. The rate for the warehouse time is not printed
            here.
          </p>
          <p style={ledeStyle}>
            Cargo that is still in bond can move on that status. The drayage
            page says a Class 3 warehouse can take an in-bond container off
            the terminal and receive it onto the bonded floor without
            breaking the bond. The cross-dock page says the same for the
            handoff: when the inbound is in-bond and the outbound is also a
            bonded move — another bonded facility, or a re-export — the
            freight can be cross-docked under bond without breaking the
            status. What decides whether the bond carries through, or a
            formal entry is needed at receipt, is on the{" "}
            <Link href="/services/bonded-storage" style={linkStyle}>
              bonded storage
            </Link>{" "}
            page.
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
          <div style={eyebrow}>4 · What to send</div>
          <h2 style={h2Style}>
            Quotes come from the documents on that shipment.
          </h2>
          <p style={ledeStyle}>
            No rate is printed on this page. The{" "}
            <Link href="/services/cross-dock" style={linkStyle}>
              cross-dock page
            </Link>{" "}
            says to send the routing guide, the inbound shape, and the
            outbound destinations, and the dock plan is quoted from those.
            If a retailer has a specific compliance manual, that page says
            to share it before the first load. The{" "}
            <Link href="/services/drayage" style={linkStyle}>
              drayage page
            </Link>{" "}
            asks for the booking, the vessel ETA, and the destination. The{" "}
            <Link href="/services/devanning" style={linkStyle}>
              devanning page
            </Link>{" "}
            asks for the bill of lading and the ETA. If the container has
            to leave as separate shipments, the{" "}
            <Link href="/services/deconsolidation" style={linkStyle}>
              deconsolidation page
            </Link>{" "}
            asks for a master bill of lading, a manifest that shows which
            cartons or pallets belong to which destination, and the routing
            rules — by store, by DC, or by customer — sent with the booking.
          </p>
          <p style={ledeStyle}>
            The{" "}
            <Link href="/quote" style={linkStyle}>
              quote form
            </Link>{" "}
            is the same path the{" "}
            <Link href="/contact" style={linkStyle}>
              contact page
            </Link>{" "}
            points to. That form includes cross-dock among the services it
            asks about. Transloading, on the cross-dock page, is the
            port-direct version of that service. The quote page says the
            more you can tell us up front, the tighter the quote. If you
            are not sure of a number, leave it blank — the page says the
            warehouse would rather call and ask than guess. Most quote
            requests, on that page, come back the same business day. Call{" "}
            {business.phoneDisplay} or email {business.email}. Hours are{" "}
            {businessHours.display}.
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
              title="Dock plan"
              body="Routing guide, inbound shape, and outbound destinations. A retailer compliance manual, if there is one, before the first load. The cross-dock page quotes the dock plan from those."
            />
            <CompareCard
              title="The inbound move"
              body="Booking, vessel ETA, and destination for the dray. Bill of lading and ETA for the unload. The quote page says to leave a number blank if you are not sure."
            />
            <CompareCard
              title="A split, if there is one"
              body="Master bill of lading, a manifest that shows which cartons or pallets belong to which destination, and routing rules by store, DC, or customer. That split is deconsolidation."
            />
          </div>
        </div>
      </section>

      <section style={{ padding: "56px 0" }}>
        <div style={container}>
          <div style={eyebrow}>Related pages</div>
          <h2 style={h2Style}>The pages this walkthrough is drawn from.</h2>
          <p style={ledeStyle}>
            The service page is{" "}
            <Link href="/services/cross-dock" style={linkStyle}>
              cross-dock
            </Link>
            . The unload is{" "}
            <Link href="/services/devanning" style={linkStyle}>
              container devanning in Charleston
            </Link>
            . The split is{" "}
            <Link href="/services/deconsolidation" style={linkStyle}>
              Port of Charleston deconsolidation
            </Link>
            . The terminal move is{" "}
            <Link href="/services/drayage" style={linkStyle}>
              drayage
            </Link>
            . Miles are on the{" "}
            <Link href={terminalsGuidePath} style={linkStyle}>
              terminal distances
            </Link>{" "}
            guide. A number for a specific shipment starts at the{" "}
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
          <h2 style={h2Style}>Questions about transloading in Charleston.</h2>
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
            Send the routing guide and the inbound shape.
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
            A rate is not printed on this page. Quotes come from the
            documents on that shipment. Use the quote form or call{" "}
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
