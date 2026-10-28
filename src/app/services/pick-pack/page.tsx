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

const PATH = "/services/pick-pack";
const TITLE = "Pick & Pack Charleston SC | Order Fulfillment | C&C";
const DESCRIPTION =
  "Pick and pack fulfillment in Charleston, SC. Each, case, or pallet picks packed to your spec and tendered parcel or LTL from Ladson and Hanahan.";

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
        alt: "C&C Warehouse — pick and pack fulfillment near the Port of Charleston",
      },
    ],
  },
};

const FAQ: { q: string; a: string }[] = [
  {
    q: "What is pick and pack?",
    a: "Pick and pack is order fulfillment. We pull stock from the rack at the quantity you ordered — each, inner, case, or pallet — pack it to your spec, label it, and tender it to the carrier you choose. The picks are routed off the WMS, so the count and the order stay on the same record.",
  },
  {
    q: "Can you fulfill from bonded inventory?",
    a: "Yes. That is the reason the work lives here. Importers land bulk through Charleston and want orders shipped from the same building as their bonded inventory. A pick does not go out against cartons that are still on bond until the withdrawal is done.",
  },
  {
    q: "Which carriers do you tender to?",
    a: "Parcel and LTL. Daily pickup windows are already in place with the major carriers. We do not publish a carrier rate card; freight cost is quoted with the order profile.",
  },
  {
    q: "Do you pack to a retailer spec?",
    a: "Yes. Carton or pallet, labeled to your retailer or carrier rules. If the spec is a routing guide, send it with the account setup so the first order is not the one that teaches us the label.",
  },
  {
    q: "Is Amazon FBA prep the same service?",
    a: "No. FBA prep is labeling, polybagging, and forwarding to Amazon's network to Amazon's spec. Pick and pack is your orders to your customers or DCs. Both can run in the same building. They are booked as different work.",
  },
  {
    q: "How do I see what was picked?",
    a: "The same importer portal that shows on-hand inventory shows the movement. portal.candcwarehouse.com. If a count looks wrong, call (843) 818-2332 with the order number.",
  },
];

export default function PickPackPage() {
  return (
    <>
      <JsonLd
        id="service-jsonld"
        data={serviceJsonLd({
          path: PATH,
          serviceType: "Pick and Pack Fulfillment",
          name: "Pick and Pack Fulfillment near the Port of Charleston",
          audience:
            "Importers who land bulk in Charleston and want orders shipped from the same warehouse",
        })}
      />
      <JsonLd id="faq-jsonld" data={faqJsonLd(FAQ)} />
      <JsonLd
        id="breadcrumb-jsonld"
        data={breadcrumbJsonLd("Pick and pack", PATH)}
      />

      <ServiceHero
        crumb="Pick and pack"
        eyebrowText="Order fulfillment"
        title="Pick and Pack Fulfillment in Charleston, SC"
        slogan="Orders pulled from the same floor as the container they came in on."
        lede={
          <>
            Bulk lands at the Port of Charleston. Orders leave as parcel or
            LTL from <LadsonLink>Ladson</LadsonLink> and <HanahanLink>Hanahan</HanahanLink>. Picks are routed off the{" "}
            <Link
              href="/services/wms"
              style={{ color: colors.accent, textDecoration: "underline" }}
            >
              WMS
            </Link>{" "}
            — each, inner, case, or pallet — packed to your spec, and
            tendered on carriers that already pick up here. Units that have
            to meet Amazon&rsquo;s labeling rules are{" "}
            <Link
              href="/services/fba-prep"
              style={{ color: colors.accent, textDecoration: "underline" }}
            >
              FBA prep
            </Link>
            , not this service.
          </>
        }
      />

      <FactStrip
        items={[
          { label: "Picks", value: "Each, inner, case, pallet" },
          { label: "Pack", value: "Your spec" },
          { label: "Tender", value: "Parcel and LTL" },
          { label: "Record", value: "Same WMS as the inventory" },
        ]}
      />

      <StepGrid
        eyebrowText="How an order moves"
        title="From a balance on the portal to a carrier scan."
        lede="Fulfillment stays in the building with the inventory so the pick and the count are the same conversation."
        steps={[
          {
            n: "01",
            title: "The order hits the WMS",
            body: "Each, inner, case, or pallet. The pick is routed off the system that holds the on-hand balance, including bond status.",
          },
          {
            n: "02",
            title: "We pull it",
            body: "Stock comes off the rack at the quantity on the order. Cartons still on bond are not picked for a domestic order until they are withdrawn.",
          },
          {
            n: "03",
            title: "We pack to your spec",
            body: "Carton or pallet, labeled to your retailer or carrier rules. The packout spec is part of the account, not a guess at the pack table.",
          },
          {
            n: "04",
            title: "We tender it",
            body: "Parcel or LTL, on daily pickup windows already set with the major carriers. The shipment closes against the WMS balance.",
          },
        ]}
      />

      <CardGrid
        tone="deep"
        eyebrowText="When pick and pack belongs at the port"
        title="Built for importers, not for a separate fulfillment shed."
        items={[
          {
            label: "Bulk in, orders out",
            body: "The container is devanned here. The orders should not have to move to a second warehouse just to be picked.",
          },
          {
            label: "Bonded stock",
            body: "Some of the inventory is still on bond. Fulfillment on the same floor means a pick can respect that status.",
          },
          {
            label: "Retailer labels",
            body: "Carton or pallet, labeled the way the routing guide says. Send the guide before the first order.",
          },
          {
            label: "Not an FBA forward",
            body: "Amazon's prep rules are a different service. Pick and pack is your order, your customer, your carrier.",
          },
        ]}
      />

      <CardGrid
        eyebrowText="What is included"
        title="Labor on top of a count you can already see."
        items={[
          {
            label: "Pick types",
            body: "Each, inner, case, or pallet. The WMS routes the pick. We do not pull from a paper list that can drift from the balance.",
          },
          {
            label: "Packout",
            body: "To your spec. Carton or pallet. Labels follow your retailer or carrier rules.",
          },
          {
            label: "Carriers",
            body: "Parcel and LTL, with daily pickups already established. Carrier cost is quoted with the order profile, not listed as a rate card here.",
          },
          {
            label: "Same buildings",
            body: "Ladson and Hanahan. The facility page is the square footage; this page is the labor that ships from it.",
          },
          {
            label: "Portal",
            body: "Movements show on portal.candcwarehouse.com, the same login as on-hand inventory.",
          },
          {
            label: "Related, not included",
            body: (
              <>
                Container unload is{" "}
                <Link
                  href="/services/devanning"
                  style={{ color: colors.accent, textDecoration: "underline" }}
                >
                  devanning
                </Link>
                . A one-box-to-many-destinations split is{" "}
                <Link
                  href="/services/deconsolidation"
                  style={{ color: colors.accent, textDecoration: "underline" }}
                >
                  deconsolidation
                </Link>
                .
              </>
            ),
          },
        ]}
      />

      <FaqList title="Questions before the first order file." items={FAQ} />

      <ServiceClose
        eyebrowText="Orders that should ship from Charleston?"
        title="Send the order profile and the pack spec. We will quote the pick."
      />
    </>
  );
}
