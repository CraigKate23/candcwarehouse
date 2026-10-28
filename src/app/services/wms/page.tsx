import type { Metadata } from "next";
import Link from "next/link";
import { HanahanLink } from "../../components/HanahanLink";
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

const PATH = "/services/wms";
const TITLE = "WMS Inventory Tracking Charleston SC | C&C Warehouse";
const DESCRIPTION =
  "WMS-tracked inventory in Ladson and Hanahan, SC. Live counts for bonded, General Order, and free cargo, plus an importer portal near the Port of Charleston.";

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
        alt: "C&C Warehouse — WMS-tracked inventory near the Port of Charleston",
      },
    ],
  },
};

const FAQ: { q: string; a: string }[] = [
  {
    q: "What does WMS-tracked inventory mean here?",
    a: "Inventory is received, put away, picked, and shipped in a warehouse management system, not on a spreadsheet we email once a week. You can see counts and movements without calling us. Bonded cargo, General Order cargo, and free cargo sit side by side under one logon.",
  },
  {
    q: "Where do I look up my inventory?",
    a: "The importer portal is at portal.candcwarehouse.com. On-hand, aging, in-and-out activity, and bond status are pulled on demand. The phone number is still (843) 818-2332 when the portal is not the right tool.",
  },
  {
    q: "Do you track lots and serials?",
    a: "Lot and serial tracking where the product needs it, plus movement history. We do not claim lot tracking on freight that arrived with no lot data. If your SOP requires it, say so when the first receipt is booked.",
  },
  {
    q: "Is bonded inventory in the same system as domestic?",
    a: "Yes. Bonded, General Order, and free cargo are tracked side by side. Bond status is visible so a pick does not accidentally pull cartons that are still on bond.",
  },
  {
    q: "Can the WMS drive pick and pack?",
    a: "Yes. Each, inner, case, and pallet picks are routed off the WMS. That fulfillment work is the pick-and-pack service. The WMS is the record; pick and pack is the labor.",
  },
  {
    q: "How much inventory can the system see?",
    a: "Both buildings. The facility page states 3,000+ racked pallet positions across Ladson and Hanahan, plus floor-load space for oversized cargo. The portal shows what is actually on hand, not a marketing capacity number.",
  },
];

export default function WmsPage() {
  return (
    <>
      <JsonLd
        id="service-jsonld"
        data={serviceJsonLd({
          path: PATH,
          serviceType: "WMS Inventory Tracking",
          name: "WMS-Tracked Warehouse Inventory near the Port of Charleston",
          audience:
            "Importers who need live counts of bonded, General Order, and free cargo in Charleston",
        })}
      />
      <JsonLd id="faq-jsonld" data={faqJsonLd(FAQ)} />
      <JsonLd
        id="breadcrumb-jsonld"
        data={breadcrumbJsonLd("WMS inventory", PATH)}
      />

      <ServiceHero
        crumb="WMS inventory"
        eyebrowText="Real-time visibility"
        title="WMS Inventory Tracking in Charleston, SC"
        slogan="Counts you can open yourself, including what is still on bond."
        lede={
          <>
            Receive, putaway, pick, and ship are tracked in a warehouse
            management system. Bonded, General Order, and free cargo show
            up under one logon at{" "}
            <a
              href="https://portal.candcwarehouse.com"
              style={{ color: colors.accent, textDecoration: "underline" }}
            >
              portal.candcwarehouse.com
            </a>
            . The floor behind that portal is the same <LadsonLink>Ladson</LadsonLink> and{" "}
            <HanahanLink>Hanahan</HanahanLink> buildings — 3,000+ racked positions — minutes from the
            Port of Charleston.
          </>
        }
      />

      <FactStrip
        items={[
          { label: "Record", value: "WMS, not a spreadsheet" },
          { label: "Statuses", value: "Bonded, GO, and free" },
          { label: "Portal", value: "portal.candcwarehouse.com" },
          { label: "Positions", value: "3,000+ racked" },
        ]}
      />

      <StepGrid
        eyebrowText="How inventory is tracked"
        title="From the dock door to a count you can see."
        lede="Every status we warehouse — bonded, General Order, and free — is on the same system so a mixed building does not become two sets of books."
        steps={[
          {
            n: "01",
            title: "Receive",
            body: "Freight is received against the bill of lading or inbound notice. Exceptions are recorded at the dock, not discovered a week later when someone asks for a count.",
          },
          {
            n: "02",
            title: "Putaway",
            body: "Product is put away to a location. Bond status travels with it, so bonded cartons are not mixed into a free-cargo pick face.",
          },
          {
            n: "03",
            title: "Look it up",
            body: "On-hand, aging, movement history, and bond status are available in the importer portal. Lot and serial numbers are tracked when the product has them.",
          },
          {
            n: "04",
            title: "Pick and ship",
            body: "Picks are routed off the WMS — each, inner, case, or pallet — and the shipment closes the balance. That labor is pick and pack; the record is the WMS.",
          },
        ]}
      />

      <CardGrid
        tone="deep"
        eyebrowText="When the portal matters"
        title="You should not have to call for a count."
        items={[
          {
            label: "Mixed bond status",
            body: "Some of your cargo is on bond, some is General Order, some is already entered. One logon shows which is which.",
          },
          {
            label: "More than one building",
            body: "Ladson and Hanahan are both on the system. You are not reconciling two email threads to learn where a pallet is.",
          },
          {
            label: "Orders off the same stock",
            body: "Fulfillment lives in the same building as the bonded inventory, on the same WMS, so a pick cannot drift away from the count.",
          },
          {
            label: "A broker asking for status",
            body: "Bond status and on-hand are the two questions we get pulled into. Both are on the portal before anyone picks up the phone.",
          },
        ]}
      />

      <CardGrid
        eyebrowText="What the system shows"
        title="Visibility, not a software pitch."
        items={[
          {
            label: "Live counts",
            body: "On-hand quantity, not a weekly spreadsheet. Movement history shows how a balance got there.",
          },
          {
            label: "Lot and serial",
            body: "Tracked where the product has lot or serial data. We do not invent lot numbers that were not on the inbound.",
          },
          {
            label: "Bond status",
            body: (
              <>
                Bonded,{" "}
                <Link
                  href="/services/general-order"
                  style={{ color: colors.accent, textDecoration: "underline" }}
                >
                  General Order
                </Link>
                , and free cargo side by side, so status is part of the count.
              </>
            ),
          },
          {
            label: "Aging and activity",
            body: "On-hand, aging, and in-and-out activity, pulled on demand from the portal.",
          },
          {
            label: "Importer portal",
            body: "portal.candcwarehouse.com. The same place the customer portal link in the header goes.",
          },
          {
            label: "Picks off the record",
            body: (
              <>
                Order fulfillment that uses these counts is{" "}
                <Link
                  href="/services/pick-pack"
                  style={{ color: colors.accent, textDecoration: "underline" }}
                >
                  pick and pack
                </Link>
                . Amazon-bound units are{" "}
                <Link
                  href="/services/fba-prep"
                  style={{ color: colors.accent, textDecoration: "underline" }}
                >
                  FBA prep
                </Link>
                .
              </>
            ),
          },
        ]}
      />

      <FaqList title="Questions people ask before we send a portal login." items={FAQ} />

      <ServiceClose
        eyebrowText="Need a login, or a count before the first receipt?"
        title="Call and we will walk through what the portal shows for your account."
      />
    </>
  );
}
