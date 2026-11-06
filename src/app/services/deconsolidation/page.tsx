import type { Metadata } from "next";
import Link from "next/link";
import { HanahanLink } from "../../components/HanahanLink";
import { LadsonLink } from "../../components/LadsonLink";
import {
  business,
  colors,
  container,
  eyebrow,
  fonts,
  hanahanLocation,
  ladsonLocation,
  terminalsGuidePath,
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

const PATH = "/services/deconsolidation";
const TITLE =
  "Charleston Container Deconsolidation | Port of Charleston | C&C";
const DESCRIPTION =
  "Warehouse container deconsolidation at the Port of Charleston. Split one inbound ocean container by customer, store, or region in Ladson and Hanahan, SC.";

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
        alt: "C&C Warehouse — container deconsolidation at the Port of Charleston",
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

const WHERE_ANSWER = `Container deconsolidation in Charleston, SC is a warehouse split at two buildings near the Port of Charleston. The primary building is the ${ladsonLocation.facilityName}, ${ladsonLocation.sqft} sq ft at ${ladsonLocation.street}, ${ladsonLocation.city}, ${ladsonLocation.state} ${ladsonLocation.postal}. The secondary building is the ${hanahanLocation.facilityName}, ${hanahanLocation.sqft} sq ft at ${hanahanLocation.street}, ${hanahanLocation.city}, ${hanahanLocation.state} ${hanahanLocation.postal}. Hanahan is closer to the port terminals — the shortest drayage runs in our network. The split happens at those two warehouse addresses, before a long inland haul.`;

const PORT_ANSWER = `Yes. Drayage from Wando Welch, North Charleston Terminal, and Hugh K. Leatherman can be part of the same move into either building. Published drive distances from ${hanahanLocation.city}: ${oceanSentence(hanahanLocation.drives)}. From ${ladsonLocation.city}: ${oceanSentence(ladsonLocation.drives)}. Both facilities sit within 25 miles of all three SC Ports Authority ocean terminals.`;

const PROCESS_ANSWER =
  "The container or trailer arrives at the dock with the master bill of lading. Drayage from Wando Welch, NCT, or Leatherman can be part of the same move. Palletized freight is checked against the manifest. Floor-loaded freight is hand-unloaded and piece-counted before anything is blended into a destination. Cartons and pallets are staged by customer, store, or region using the manifest and the routing rules you sent with the booking. Each destination leaves on its own house BOL, as LTL or truckload. Pallet labels match what the receiving DC expects.";

const FAQ: { q: string; a: string }[] = [
  {
    q: "Is Charleston deconsolidation the same as school-district deconsolidation?",
    a: `No. On this page, Charleston deconsolidation means container deconsolidation at a Port of Charleston warehouse. ${business.name} splits one inbound container or trailer into outbound shipments by customer, store, or region on the floor in Ladson and Hanahan. The company is ${business.legalName}. School-district deconsolidation is a different topic and is not a service offered here.`,
  },
  {
    q: "What is container deconsolidation?",
    a: "Container deconsolidation breaks one inbound container or trailer into multiple outbound shipments — by customer, by store, or by region. Importers often consolidate overseas to save ocean freight, then need the cargo split once it lands at the Port of Charleston. We do that split on our warehouse floor in Ladson and Hanahan.",
  },
  {
    q: "Who is Port of Charleston container deconsolidation for?",
    a: "Importers consolidating overseas to save ocean freight, then needing the cargo split once it lands at the Port of Charleston. One container may hold several customers or stores. The same SKU set may need to land at more than one DC or store group. We build the outbound to those stops, using the manifest and the routing rules sent with the booking, instead of sending the whole box inland.",
  },
  {
    q: "How does container deconsolidation work?",
    a: PROCESS_ANSWER,
  },
  {
    q: "How is deconsolidation different from cross-dock?",
    a: "Cross-dock is about speed: freight in one side and out the other, often the same day, with little or no dwell. Deconsolidation is about the split itself. One master bill becomes several outbound shipments, each with its own house BOL. A load can be deconsolidated and then cross-docked, or it can sit until each destination is ready.",
  },
  {
    q: "How is deconsolidation different from devanning?",
    a: "Devanning is the hand-unload of an ocean container at the warehouse, with a piece-count audit against the bill of lading. Deconsolidation is the split that turns one inbound into several outbound shipments. Floor-loaded freight is devanned and piece-counted first, then sorted to destination. Palletized freight is broken down only as far as the manifest requires. After a devan, cargo can be staged to rack, cross-docked to an outbound carrier, or palletized per your SOP. Deconsolidation is the path that leaves as separate house bills of lading and LTL or truckload pickups.",
  },
  {
    q: "Where do you deconsolidate containers in Charleston, SC?",
    a: WHERE_ANSWER,
  },
  {
    q: "Can you deconsolidate containers from the Port of Charleston?",
    a: PORT_ANSWER,
  },
  {
    q: "What documents do you need inbound?",
    a: "A master bill of lading and a manifest that shows which cartons or pallets belong to which destination. If you have routing rules — by store, by DC, by customer — send those with the booking. We stage to those rules rather than inventing a sort.",
  },
  {
    q: "Can you deconsolidate floor-loaded containers?",
    a: "Yes. Floor-loaded freight is devanned first, with a piece-count against the bill of lading, and then sorted to destination. Palletized freight is broken down only as far as the manifest requires.",
  },
  {
    q: "Can deconsolidated freight stay in bond?",
    a: "Yes. We are a CBP Class 3 bonded warehouse. Cargo that is still in bond can be deconsolidated on the bonded floor and withdrawn, or re-exported, by destination. General Order freight is a different status — that has its own page.",
  },
  {
    q: "What goes out the door?",
    a: "Separate house bills of lading and LTL or truckload pickups against each destination. Parcel is a pick-and-pack question, not a deconsolidation one. Labels and BOLs are handed off the way the downstream warehouse expects them.",
  },
];

const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `https://www.candcwarehouse.com${PATH}#service`,
  serviceType: "Container Deconsolidation",
  name: "Container Deconsolidation at the Port of Charleston",
  description: DESCRIPTION,
  url: `https://www.candcwarehouse.com${PATH}`,
  provider: { "@id": "https://www.candcwarehouse.com/#localbusiness" },
  areaServed: [
    { "@type": "City", name: "Ladson" },
    { "@type": "City", name: "Hanahan" },
    { "@type": "City", name: "Charleston" },
    { "@type": "City", name: "North Charleston" },
    { "@type": "City", name: "Mount Pleasant" },
    { "@type": "AdministrativeArea", name: "South Carolina" },
  ],
  audience: {
    "@type": "BusinessAudience",
    name: "Importers consolidating overseas who need an ocean container split after it lands at the Port of Charleston",
  },
};

export default function DeconsolidationPage() {
  return (
    <>
      <JsonLd id="service-jsonld" data={serviceJsonLd} />
      <JsonLd id="faq-jsonld" data={faqJsonLd(FAQ)} />
      <JsonLd
        id="breadcrumb-jsonld"
        data={breadcrumbJsonLd("Container deconsolidation", PATH)}
      />

      <ServiceHero
        crumb="Container deconsolidation"
        eyebrowText="One ocean container, many outbound shipments"
        title="Container Deconsolidation at the Port of Charleston"
        slogan="One ocean box. As many outbound shipments as the manifest says."
        lede={
          <>
            Container deconsolidation is the warehouse split after a
            consolidated ocean container lands at the Port of Charleston.
            Importers consolidate overseas to save ocean freight, then need
            the cargo split once it lands. We receive the container at the{" "}
            <LadsonLink>{ladsonLocation.query}</LadsonLink> or the{" "}
            <HanahanLink>{hanahanLocation.query}</HanahanLink>, sort it by
            customer, store, or region, and tender separate outbound
            shipments. Floor-loaded boxes start with a piece-count unload —{" "}
            <Link href="/services/devanning" style={linkStyle}>
              container devanning in Charleston
            </Link>
            . Same-day turns that should not dwell at all belong on{" "}
            <Link href="/services/cross-dock" style={linkStyle}>
              cross-dock in Charleston
            </Link>
            .
          </>
        }
      />

      <FactStrip
        items={[
          { label: "Inbound", value: "Container or trailer" },
          { label: "Sort", value: "Customer, store, region" },
          { label: "Outbound", value: "House BOLs and LTL" },
          { label: "Warehouses", value: "Ladson and Hanahan" },
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
            Port of Charleston container deconsolidation, from both
            buildings.
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
            Container deconsolidation in Charleston runs from both warehouse
            floors. The primary building is the{" "}
            <LadsonLink>{ladsonLocation.query}</LadsonLink>,{" "}
            {ladsonLocation.sqft} sq ft at {ladsonLocation.street},{" "}
            {ladsonLocation.city}, {ladsonLocation.state}{" "}
            {ladsonLocation.postal}. The{" "}
            <HanahanLink>{hanahanLocation.query}</HanahanLink>,{" "}
            {hanahanLocation.sqft} sq ft at {hanahanLocation.street},{" "}
            {hanahanLocation.city}, {hanahanLocation.state}{" "}
            {hanahanLocation.postal}, is closer to the port terminals — the
            shortest drayage runs in our network. Inventory moves between
            both buildings as needed. Same WMS, same crew, same phone number.
            Inbound{" "}
            <Link href="/services/drayage" style={linkStyle}>
              drayage
            </Link>{" "}
            is from Wando Welch, North Charleston Terminal, and Hugh K.
            Leatherman. The miles below are the per-building figures already
            published on the{" "}
            <Link href="/facility" style={linkStyle}>
              facility page
            </Link>{" "}
            and the{" "}
            <Link href={terminalsGuidePath} style={linkStyle}>
              Port of Charleston terminals
            </Link>{" "}
            guide. The split happens on the warehouse floor before a long
            inland haul.
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
            Authority ocean terminals. Cargo that is still on bond can be
            deconsolidated on the Class 3 floor. See{" "}
            <Link href="/services/bonded-storage" style={linkStyle}>
              bonded storage
            </Link>
            .
          </p>
        </div>
      </section>

      <StepGrid
        eyebrowText="How container deconsolidation works"
        title="From one Port of Charleston container to a dock full of destinations."
        lede="The sort follows your manifest and routing rules. We do not guess which cartons belong together."
        steps={[
          {
            n: "01",
            title: "Receive the consolidated load",
            body: "The container or trailer arrives at the dock with the master bill of lading. Drayage from Wando Welch, NCT, or Leatherman can be part of the same move.",
          },
          {
            n: "02",
            title: "Unload and identify",
            body: "Palletized freight is checked against the manifest. Floor-loaded freight is hand-unloaded and piece-counted before anything is blended into a destination.",
          },
          {
            n: "03",
            title: "Stage by destination",
            body: "Cartons and pallets are pulled and staged by customer, store, or region using the manifest and the routing rules you sent with the booking.",
          },
          {
            n: "04",
            title: "Tender each shipment",
            body: "Each destination leaves on its own house BOL, as LTL or truckload. Pallet labels match what the receiving DC expects.",
          },
        ]}
      />

      <CardGrid
        tone="deep"
        eyebrowText="When the split pays for itself"
        title="Built for an ocean container that was combined on the water."
        items={[
          {
            label: "Overseas consolidation",
            body: "One container left the origin with several customers or stores inside it. The Port of Charleston is where that container has to become separate shipments.",
          },
          {
            label: "Multi-stop retail",
            body: "The same SKU set has to land at more than one DC or store group. We build the outbound to those stops instead of sending the whole box inland.",
          },
          {
            label: "Bonded until entry",
            body: "The cargo is still on bond. It can be deconsolidated on the Class 3 floor and withdrawn by destination when each entry is ready.",
          },
          {
            label: "Not a same-day cross-dock",
            body: "Destinations are not all ready the day the box lands. Deconsolidation lets each outbound leave when that receiver can take it.",
          },
        ]}
      />

      <CardGrid
        eyebrowText="What you get"
        title="A warehouse split you can reconcile to the master bill."
        items={[
          {
            label: "Master in, houses out",
            body: "One inbound master BOL. Separate house BOLs on the way out, one per destination.",
          },
          {
            label: "Your routing rules",
            body: "Sort by customer, store, or region. The manifest is the instruction, not a suggestion.",
          },
          {
            label: "Floor-loaded or palletized",
            body: "Floor-loads are devanned and counted first. Palletized freight is broken down only as far as the split requires.",
          },
          {
            label: "In bond if it needs to be",
            body: (
              <>
                Class 3 bonded floor, so the split does not have to break
                the bond. See{" "}
                <Link href="/services/bonded-storage" style={linkStyle}>
                  bonded storage
                </Link>
                .
              </>
            ),
          },
          {
            label: "Port of Charleston warehouse",
            body: "Ladson and Hanahan, minutes from Wando Welch, North Charleston Terminal, and Hugh K. Leatherman. The split happens before a long inland haul.",
          },
          {
            label: "Then fulfillment, if you need it",
            body: (
              <>
                Orders that have to be picked down to the each live on the
                same WMS. That work is{" "}
                <Link href="/services/pick-pack" style={linkStyle}>
                  pick and pack
                </Link>
                , not this page.
              </>
            ),
          },
        ]}
      />

      <FaqList
        title="Questions importers ask before the first container split."
        items={FAQ}
      />

      <ServiceClose
        eyebrowText="A consolidated container headed for the Port of Charleston?"
        title="Send the manifest and the destinations. We will quote the split."
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
        <Link href={href} style={{ color: colors.ink, textDecoration: "underline" }}>
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
