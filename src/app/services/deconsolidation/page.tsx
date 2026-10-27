import type { Metadata } from "next";
import Link from "next/link";
import { LadsonLink } from "../../components/LadsonLink";
import { business, colors } from "../../components/styles";
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
  serviceJsonLd,
} from "../../components/service-blocks";

const PATH = "/services/deconsolidation";
const TITLE = "Container Deconsolidation Charleston SC | C&C Warehouse";
const DESCRIPTION =
  "Deconsolidate containers in Charleston, SC. One inbound load split into outbound shipments by customer, store, or region at C&C Warehouse in Ladson and Hanahan.";

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
        alt: "C&C Warehouse — container deconsolidation near the Port of Charleston",
      },
    ],
  },
};

const FAQ: { q: string; a: string }[] = [
  {
    q: "What is container deconsolidation?",
    a: "Deconsolidation breaks one inbound container or trailer into multiple outbound shipments — by customer, by store, or by region. Importers often consolidate overseas to save ocean freight, then need the cargo split once it lands at the Port of Charleston. We do that split on our floor in Ladson and Hanahan.",
  },
  {
    q: "How is deconsolidation different from cross-dock?",
    a: "Cross-dock is about speed: freight in one side and out the other, often the same day, with little or no dwell. Deconsolidation is about the split itself. One master bill becomes several outbound shipments, each with its own house BOL. A load can be deconsolidated and then cross-docked, or it can sit until each destination is ready.",
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

export default function DeconsolidationPage() {
  return (
    <>
      <JsonLd
        id="service-jsonld"
        data={serviceJsonLd({
          path: PATH,
          serviceType: "Container Deconsolidation",
          name: "Container Deconsolidation near the Port of Charleston",
          audience:
            "Importers consolidating overseas who need cargo split after it lands in Charleston",
        })}
      />
      <JsonLd id="faq-jsonld" data={faqJsonLd(FAQ)} />
      <JsonLd
        id="breadcrumb-jsonld"
        data={breadcrumbJsonLd("Deconsolidation", PATH)}
      />

      <ServiceHero
        crumb="Deconsolidation"
        eyebrowText="One in, many out"
        title="Container Deconsolidation in Charleston, SC"
        slogan="One ocean box. As many outbound shipments as the manifest says."
        lede={
          <>
            Importers consolidate overseas to save ocean freight, then need
            the cargo split once it lands. We receive the container at{" "}
            <LadsonLink>Ladson</LadsonLink> or Hanahan, sort it by customer,
            store, or region, and
            tender separate outbound shipments. Floor-loaded boxes start
            with a{" "}
            <Link
              href="/services/devanning"
              style={{ color: colors.accent, textDecoration: "underline" }}
            >
              piece-count devan
            </Link>
            . Same-day turns that should not dwell at all belong on{" "}
            <Link
              href="/services/cross-dock"
              style={{ color: colors.accent, textDecoration: "underline" }}
            >
              cross-dock
            </Link>
            .
          </>
        }
      />

      <FactStrip
        items={[
          { label: "Inbound", value: "Master BOL" },
          { label: "Sort", value: "Customer, store, region" },
          { label: "Outbound", value: "House BOLs and LTL" },
          { label: "Floor", value: "Ladson and Hanahan" },
        ]}
      />

      <StepGrid
        eyebrowText="How deconsolidation works"
        title="From one container to a dock full of destinations."
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
        title="Built for cargo that was combined on the water."
        items={[
          {
            label: "Overseas consolidation",
            body: "One container left the origin with several customers or stores inside it. Charleston is where that container has to become separate shipments.",
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
        title="A split you can reconcile to the master bill."
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
                <Link
                  href="/services/bonded-storage"
                  style={{ color: colors.accent, textDecoration: "underline" }}
                >
                  bonded storage
                </Link>
                .
              </>
            ),
          },
          {
            label: "Port-side",
            body: "Ladson and Hanahan, minutes from Wando Welch, North Charleston Terminal, and Hugh K. Leatherman. The split happens before a long inland haul.",
          },
          {
            label: "Then fulfillment, if you need it",
            body: (
              <>
                Orders that have to be picked down to the each live on the
                same WMS. That work is{" "}
                <Link
                  href="/services/pick-pack"
                  style={{ color: colors.accent, textDecoration: "underline" }}
                >
                  pick and pack
                </Link>
                , not this page.
              </>
            ),
          },
        ]}
      />

      <FaqList title="Questions importers ask before the first split." items={FAQ} />

      <ServiceClose
        eyebrowText="A consolidated container headed for Charleston?"
        title="Send the manifest and the destinations. We will quote the split."
      />
    </>
  );
}
