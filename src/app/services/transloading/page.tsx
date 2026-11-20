import type { Metadata } from "next";
import Link from "next/link";
import { HanahanLink } from "../../components/HanahanLink";
import { LadsonLink } from "../../components/LadsonLink";
import { areaServed } from "../../components/structured-data";
import {
  business,
  businessHours,
  colors,
  container,
  eyebrow,
  fonts,
  hanahanLocation,
  ladsonLocation,
  terminalsGuidePath,
  transloadGuidePath,
  transloadServicePath,
} from "../../components/styles";
import {
  CardGrid,
  FactStrip,
  FaqList,
  JsonLd,
  ServiceClose,
  ServiceHero,
  StepGrid,
  breadcrumbJsonLd,
  faqJsonLd,
} from "../../components/service-blocks";

// Facts on this page are restated from pages already on the site:
// /services/cross-dock, /guides/transloading-port-of-charleston,
// /services/devanning, /services/drayage, /services/deconsolidation,
// /services/bonded-storage, /facility, /faq, and the location pages.
// No rate, fee, turn time, capacity, certification, or customer is added.

const PATH = transloadServicePath;
const TITLE = "Container Transloading in Charleston, SC | C&C";
const DESCRIPTION =
  "Container transloading near the Port of Charleston. A container off the chassis at Ladson or Hanahan, devanned on the dock, and straight to outbound staging.";

const linkStyle = {
  color: colors.accent,
  textDecoration: "underline",
} as const;

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
        alt: "C&C Warehouse — container transloading near the Port of Charleston",
      },
    ],
  },
};

type PublishedDrive = {
  label: string;
  name: string;
  distance: string;
  about: string;
  route: string;
};

function oceanDrives(drives: readonly PublishedDrive[]) {
  return drives.filter((drive) => drive.label !== "Inland Port Greer");
}

function driveSentence(drive: PublishedDrive) {
  const route = drive.route.endsWith(".")
    ? drive.route.slice(0, -1)
    : drive.route;
  return `${drive.name} is ${drive.about}, ${route}`;
}

function oceanSentence(drives: readonly PublishedDrive[]) {
  return oceanDrives(drives).map(driveSentence).join(". ");
}

const WHAT_ANSWER =
  "Container transloading near the Port of Charleston is the port-direct devan and cross-dock. The ocean container comes off the chassis at the warehouse dock, the freight is unloaded there, and it goes straight to outbound staging. There is no put-away, no rack pull, and no second touch. It pairs with drayage and the devan done by the same crew. The cargo touches the floor, and it does not dwell.";

const WHERE_ANSWER = `Transloading runs at both buildings. The primary floor is the ${ladsonLocation.facilityName}, ${ladsonLocation.sqft} sq ft at ${ladsonLocation.street}, ${ladsonLocation.city}, ${ladsonLocation.state} ${ladsonLocation.postal}. The ${hanahanLocation.facilityName}, ${hanahanLocation.sqft} sq ft at ${hanahanLocation.street}, ${hanahanLocation.city}, ${hanahanLocation.state} ${hanahanLocation.postal}, sits closer to the port terminals and has the shortest drayage runs in the network. Freight can move between the buildings. The WMS, the crew, and the phone number stay the same.`;

const PORT_ANSWER = `The inbound leg is drayage from Wando Welch, North Charleston Terminal, and Hugh K. Leatherman into either building. From ${hanahanLocation.city}: ${oceanSentence(hanahanLocation.drives)}. From ${ladsonLocation.city}: ${oceanSentence(ladsonLocation.drives)}. Both facilities sit within 25 miles of all three SC Ports Authority ocean terminals.`;

const COMPARE_ANSWER =
  "Cross-dock is the speed pattern: freight comes in one side and goes out the other, often the same day, with little or no dwell. Transloading is that pattern when the inbound is an ocean container taken off the chassis at the dock. Devanning is the hand unload itself, with a piece-count audit against the bill of lading. After a devan, freight can go to a rack, to an outbound carrier, or onto pallets. Straight to outbound staging, with no put-away, is the transload. Deconsolidation is the split: one master bill becomes several outbound shipments, each on its own house BOL. A load can be split and then cross-docked, or it can wait until each destination is ready.";

const CREW_ANSWER =
  "Drayage is the short haul from a SC Ports Authority terminal to the warehouse. Once the container is available, the appointment is booked and the chassis is lined up — standard, tri-axle, or heavy-haul — so the box is not left accruing per diem or demurrage. The driver takes possession and confirms the seal is intact before the gate. A seal anomaly is photographed and reported before the drive. At the dock, that same crew can hand the container straight to the unload. There is no intermediate yard in that pattern.";

const BOND_ANSWER = `Yes, when the inbound is in bond and the outbound is also a bonded move, such as a move to another bonded facility or a re-export. That freight can cross the dock under bond without breaking the status. A Class 3 warehouse can also take an in-bond container off the terminal onto the bonded floor without breaking the bond. ${business.name} is a CBP Class 3 bonded warehouse — an importer's private bonded warehouse — and a CBP-designated General Order facility in ${ladsonLocation.city} and ${hanahanLocation.city}.`;

const TURN_ANSWER =
  "Same-day when the inbound and outbound windows align. If the outbound carrier does not pull until the following day, the freight is staged on the floor, not in the rack, and tendered at the booked appointment. Peak throughput across both locations is 30 containers/day. Devanning, reworking, and cross-dock are scaled by product mix.";

const QUOTE_ANSWER = `This page does not publish a rate. A quote starts from the routing guide, the inbound shape, and the outbound destinations. If a retailer has a compliance manual, share it before the first load. Call ${business.phoneDisplay}, email ${business.email}, or use the quote form. Hours published on the site are ${businessHours.display}.`;

const FAQ: { q: string; a: string }[] = [
  {
    q: "What is container transloading near the Port of Charleston?",
    a: WHAT_ANSWER,
  },
  {
    q: "Where do you transload containers in Charleston, SC?",
    a: WHERE_ANSWER,
  },
  {
    q: "Which Port of Charleston terminals feed a transload?",
    a: PORT_ANSWER,
  },
  {
    q: "How does transloading pair with drayage?",
    a: CREW_ANSWER,
  },
  {
    q: "How is transloading different from cross-dock, devanning, and deconsolidation?",
    a: COMPARE_ANSWER,
  },
  {
    q: "Can transload freight stay in bond?",
    a: BOND_ANSWER,
  },
  {
    q: "How fast can a transload turn?",
    a: TURN_ANSWER,
  },
  {
    q: "Do you publish a transload rate?",
    a: QUOTE_ANSWER,
  },
];

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `https://www.candcwarehouse.com${PATH}#service`,
  serviceType: "Container Transloading",
  name: "Container Transloading near the Port of Charleston",
  alternateName: [
    "Charleston transload",
    "Container transloading in Charleston",
  ],
  description: DESCRIPTION,
  url: `https://www.candcwarehouse.com${PATH}`,
  provider: { "@id": "https://www.candcwarehouse.com/#localbusiness" },
  areaServed,
  audience: {
    "@type": "BusinessAudience",
    name: "Importers, freight forwarders, and customs brokers using the Port of Charleston",
  },
};

export default function TransloadingPage() {
  return (
    <>
      <JsonLd id="service-jsonld" data={serviceJsonLd} />
      <JsonLd id="faq-jsonld" data={faqJsonLd(FAQ)} />
      <JsonLd
        id="breadcrumb-jsonld"
        data={breadcrumbJsonLd("Transloading", PATH)}
      />

      <ServiceHero
        crumb="Transloading"
        eyebrowText="Container transloading"
        title="Container Transloading near the Port of Charleston"
        slogan="Off the chassis, devanned on the dock, straight to outbound staging."
        lede={
          <>
            Container transloading near the Port of Charleston is the
            port-direct devan and cross-dock. The container comes off the
            chassis, is unloaded on the dock, and the freight moves to
            outbound staging — no put-away, no rack pull, no second touch.
            It runs from the{" "}
            <LadsonLink>{ladsonLocation.query}</LadsonLink> and the{" "}
            <HanahanLink>{hanahanLocation.query}</HanahanLink>, and it pairs
            with{" "}
            <Link href="/services/drayage" style={linkStyle}>
              drayage
            </Link>{" "}
            and{" "}
            <Link href="/services/devanning" style={linkStyle}>
              container devanning in Charleston
            </Link>{" "}
            done by the same crew. Freight that comes in one side and goes
            out the other is{" "}
            <Link href="/services/cross-dock" style={linkStyle}>
              cross-dock in Charleston
            </Link>
            . {business.name} has been family-run since {business.foundedYear}.
          </>
        }
      />

      <FactStrip
        items={[
          { label: "Handoff", value: "Chassis to outbound staging" },
          { label: "Turn", value: "Same-day when windows align" },
          { label: "Buildings", value: "Ladson and Hanahan" },
          { label: "Bond", value: "Holds when both legs are bonded" },
        ]}
      />

      <section
        id="port-of-charleston"
        style={{
          padding: "56px 0",
          borderTop: `1px solid ${colors.line}`,
        }}
      >
        <div style={container}>
          <div style={eyebrow}>Port of Charleston</div>
          <h2
            style={{
              fontFamily: fonts.heading,
              fontSize: "clamp(26px, 3vw, 34px)",
              fontWeight: 700,
              marginTop: 10,
              maxWidth: 760,
            }}
          >
            Container transloading from both Charleston buildings.
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
            The primary building is the{" "}
            <LadsonLink>{ladsonLocation.facilityName}</LadsonLink>,{" "}
            {ladsonLocation.sqft} sq ft at {ladsonLocation.street},{" "}
            {ladsonLocation.city}, {ladsonLocation.state}{" "}
            {ladsonLocation.postal}. The{" "}
            <HanahanLink>{hanahanLocation.facilityName}</HanahanLink>,{" "}
            {hanahanLocation.sqft} sq ft at {hanahanLocation.street},{" "}
            {hanahanLocation.city}, {hanahanLocation.state}{" "}
            {hanahanLocation.postal}, is closer to the port terminals — the
            shortest drayage runs in the network. Inventory moves between the
            buildings as needed. Inbound{" "}
            <Link href="/services/drayage" style={linkStyle}>
              drayage
            </Link>{" "}
            is from Wando Welch, North Charleston Terminal, and Hugh K.
            Leatherman. The miles below are the per-building figures already
            published on the location pages and the{" "}
            <Link href={terminalsGuidePath} style={linkStyle}>
              Port of Charleston terminals
            </Link>{" "}
            guide.
          </p>
          <div
            style={{
              marginTop: 28,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 18,
            }}
          >
            <OceanMiles
              heading="Hanahan — closer to the terminals"
              href={hanahanLocation.path}
              drives={hanahanLocation.drives}
            />
            <OceanMiles
              heading="Ladson — primary building"
              href={ladsonLocation.path}
              drives={ladsonLocation.drives}
            />
          </div>
          <p
            style={{
              fontFamily: fonts.body,
              fontSize: 16.5,
              lineHeight: 1.65,
              color: colors.steel,
              marginTop: 18,
              maxWidth: 760,
            }}
          >
            Both facilities sit within 25 miles of all three SC Ports
            Authority ocean terminals. A longer walkthrough of the handoff
            is the{" "}
            <Link href={transloadGuidePath} style={linkStyle}>
              transloading Charleston
            </Link>{" "}
            guide.
          </p>
        </div>
      </section>

      <StepGrid
        eyebrowText="How a transload moves"
        title="From the terminal stack to outbound staging."
        lede="The container is drayed in, unloaded on the dock, and staged to leave. It is not put away in between."
        steps={[
          {
            n: "01",
            title: "Book the terminal pull",
            body: "Once the container is available at Wando Welch, North Charleston Terminal, or Hugh K. Leatherman, the appointment is booked and a chassis is lined up — standard, tri-axle, or heavy-haul — so the box is not left accruing per diem or demurrage.",
          },
          {
            n: "02",
            title: "Confirm the seal at the gate",
            body: "The driver takes possession off the stack and checks that the seal is intact before leaving the terminal. A seal anomaly is photographed and reported before the drive, not after it.",
          },
          {
            n: "03",
            title: "Devann on the dock",
            body: "The container comes off the chassis at a dock door in Ladson or Hanahan and is hand-unloaded. The count is checked against the bill of lading. The same crew that drayed the box can hand it straight to that unload.",
          },
          {
            n: "04",
            title: "Stage outbound, then return the empty",
            body: "Freight moves straight to outbound staging. Same-day when the inbound and outbound windows align. If the carrier pulls the next day, the freight stays on the floor, not in the rack, until the booked appointment. The empty goes back, and the chassis is split to the terminal that released the box.",
          },
        ]}
      />

      <CardGrid
        tone="deep"
        eyebrowText="How the words differ"
        title="Transload, cross-dock, devan, and a split."
        items={[
          {
            label: "Cross-dock",
            body: (
              <>
                Freight in one side and out the other, often the same day,
                with little or no dwell. That work is{" "}
                <Link href="/services/cross-dock" style={linkStyle}>
                  cross-dock in Charleston
                </Link>
                . Transloading is the same handoff when the inbound is a
                container taken off the chassis.
              </>
            ),
          },
          {
            label: "Devanning",
            body: (
              <>
                The hand unload at the warehouse, with a piece-count against
                the bill of lading. After the count, freight can go to a
                rack, to an outbound carrier, or onto pallets. Straight to
                outbound staging is the transload. See{" "}
                <Link href="/services/devanning" style={linkStyle}>
                  container devanning in Charleston
                </Link>
                .
              </>
            ),
          },
          {
            label: "Deconsolidation",
            body: (
              <>
                The split. One master bill becomes several outbound
                shipments, each with its own house BOL, by customer, store,
                or region. A load can be split and then cross-docked. That
                page is{" "}
                <Link href="/services/deconsolidation" style={linkStyle}>
                  Port of Charleston deconsolidation
                </Link>
                .
              </>
            ),
          },
          {
            label: "Storage",
            body: "Freight for a transload is staged to move. If the outbound carrier does not pull until the following day, it waits on the floor, not in the rack. The rack is for freight that is put away.",
          },
        ]}
      />

      <CardGrid
        eyebrowText="What the move includes"
        title="A port-direct handoff, from either building."
        items={[
          {
            label: "Both buildings",
            body: `Ladson at ${ladsonLocation.street} is the primary floor. Hanahan at ${hanahanLocation.street} is closer to the terminals. Same WMS, same crew, same phone number.`,
          },
          {
            label: "Same-crew drayage",
            body: "The short haul from Wando Welch, North Charleston Terminal, or Hugh K. Leatherman can end at the same dock that unloads the box. No intermediate yard on that pattern.",
          },
          {
            label: "Same-day when it lines up",
            body: "When the inbound and outbound windows align, the freight is in and out the same day. Peak throughput across both locations is 30 containers/day. Devanning, reworking, and cross-dock are scaled by product mix.",
          },
          {
            label: "In bond when both legs are",
            body: "An in-bond inbound headed to another bonded facility, or for re-export, can cross the dock without breaking the bond. The buildings are a CBP Class 3 bonded warehouse — an importer's private bonded warehouse — and a CBP-designated General Order facility.",
          },
          {
            label: "Sort on the way across",
            body: "On a cross-dock, freight can be sorted by SKU, store, route, customer, or retailer DC, with labels, BOLs, and an outbound ASN in the form the receiver expects. A transload uses that same dock sequence with the container as the inbound.",
          },
          {
            label: "Quote from the documents",
            body: `No rate is published here. The dock plan is quoted from the routing guide, the inbound shape, and the outbound destinations. Call ${business.phoneDisplay} or use the quote form.`,
          },
        ]}
      />

      <FaqList
        title="Questions about container transloading in Charleston."
        items={FAQ}
      />

      <ServiceClose
        eyebrowText="A container coming off a Charleston terminal?"
        title="Send the routing guide, the inbound shape, and the outbound destinations."
      />
    </>
  );
}

function OceanMiles({
  heading,
  href,
  drives,
}: {
  heading: string;
  href: string;
  drives: readonly PublishedDrive[];
}) {
  const ocean = oceanDrives(drives);
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
          fontWeight: 600,
          margin: 0,
        }}
      >
        <Link
          href={href}
          style={{ color: colors.ink, textDecoration: "underline" }}
        >
          {heading}
        </Link>
      </h3>
      <dl style={{ margin: "14px 0 0" }}>
        {ocean.map((drive) => (
          <div key={drive.label} style={{ marginTop: 10 }}>
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
                margin: "4px 0 0",
                fontFamily: fonts.body,
                fontSize: 14.5,
                lineHeight: 1.5,
                color: colors.steel,
              }}
            >
              {drive.distance} — {drive.route}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
