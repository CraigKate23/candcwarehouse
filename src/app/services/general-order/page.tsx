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

const PATH = "/services/general-order";
const TITLE = "General Order (GO) Warehouse Charleston SC | CBP | C&C";
const DESCRIPTION =
  "CBP-designated General Order warehouse in Ladson & Hanahan, SC. The 15-day rule, how freight is released, and the six-month auction clock. Call (843) 818-2332.";

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
        alt: "C&C Warehouse — CBP-designated General Order warehouse near the Port of Charleston",
      },
    ],
  },
};

const FAQ: { q: string; a: string }[] = [
  {
    q: "What is a General Order (GO) warehouse?",
    a: "A General Order warehouse is a CBP-designated facility that receives freight the port could not get entered, exported, or otherwise cleared in time. It is not bonded storage. Bonded storage is voluntary — the importer chooses to hold cargo on bond. General Order is what happens when freight goes unclaimed. C&C is a CBP-designated GO facility in Ladson and Hanahan, SC, and also a CBP Class 3 bonded warehouse.",
  },
  {
    q: "What is the 15-day rule?",
    a: "The window carriers and brokers plan around is 15 days at the port. Freight that is still unclaimed after that can be moved into a General Order warehouse. We receive both ocean and air GO freight, including overweights and partial-claim cargo, under GO documentation and coordinate the move with the carrier and CBP.",
  },
  {
    q: "How is freight released from General Order?",
    a: "Release is a Customs process, not just a phone call. The importer or broker files the entry, duties and related Customs charges are paid, and the warehouse charges on that shipment are settled. CBP then authorizes the release. We hand the freight to the importer, to a truck, or into another service on our floor such as devanning or bonded storage. If CBP directs sale or destruction instead, we follow that instruction.",
  },
  {
    q: "What do GO storage and handling cost?",
    a: "We do not publish a rate card. Storage, handling, and the move from the terminal are quoted from the documents on that shipment — bill of lading or air waybill, container number if there is one, and the arrival date. Call (843) 818-2332 or email information@candcwarehouse.com and we will price the actual shipment rather than a generic fee.",
  },
  {
    q: "What is the six-month auction clock?",
    a: "In general terms, freight that stays unclaimed can be sold at public auction. The timeline warehouses and brokers plan around is six months from importation. Perishable, hazardous, or otherwise at-risk cargo can move faster when CBP directs it. We will not guess a sale date on this page. Call with the arrival documents and we will tell you where that shipment sits.",
  },
  {
    q: "Who do I call about freight already in GO?",
    a: "Call (843) 818-2332 or email information@candcwarehouse.com. Importers, customs brokers, and carriers use the same number. Have the bill of lading or air waybill, the container or AWB number, the importer of record, and which terminal or airline it arrived on.",
  },
];

export default function GeneralOrderPage() {
  return (
    <>
      <JsonLd
        id="service-jsonld"
        data={serviceJsonLd({
          path: PATH,
          serviceType: "General Order Warehouse",
          name: "General Order (GO) Warehouse near the Port of Charleston",
          audience:
            "Importers, customs brokers, and carriers with unclaimed freight at the Port of Charleston",
        })}
      />
      <JsonLd id="faq-jsonld" data={faqJsonLd(FAQ)} />
      <JsonLd
        id="breadcrumb-jsonld"
        data={breadcrumbJsonLd("General Order", PATH)}
      />

      <ServiceHero
        crumb="General Order"
        eyebrowText="CBP-designated GO facility"
        title="General Order (GO) Warehouse in Charleston, SC"
        slogan="The freight nobody else wants to hold, received and released properly."
        lede={
          <>
            C&amp;C Warehouse is a CBP-designated General Order facility in{" "}
            <LadsonLink>Ladson</LadsonLink> and <HanahanLink>Hanahan</HanahanLink>, minutes from the Port
            of Charleston. When
            freight goes unclaimed past the 15-day window at the port, CBP
            can move it to a GO warehouse. We receive it, hold it, and work
            with the carrier, the broker, and CBP until it is released or
            disposed of the way CBP directs. Family-run since{" "}
            {business.foundedYear}. This is separate from{" "}
            <Link
              href="/services/bonded-storage"
              style={{ color: colors.accent, textDecoration: "underline" }}
            >
              voluntary Class 3 bonded storage
            </Link>
            .
          </>
        }
      />

      <FactStrip
        items={[
          { label: "Designation", value: "CBP-designated GO" },
          { label: "Freight", value: "Ocean and air" },
          { label: "Port window", value: "15 days, then GO" },
          { label: "Locations", value: "Ladson and Hanahan" },
        ]}
      />

      <StepGrid
        eyebrowText="How General Order works"
        title="From unclaimed at the terminal to a decision."
        lede="The same crew that receives GO freight can devan it, rework an overweight, or move what is released. One warehouse, one phone number."
        steps={[
          {
            n: "01",
            title: "Freight sits unclaimed",
            body: "Cargo arrives at a Port of Charleston terminal, or by air, and is not entered or exported in time. The planning window is 15 days. After that, CBP can order it into General Order.",
          },
          {
            n: "02",
            title: "We receive it under GO",
            body: "We coordinate the move with the carrier and CBP and receive the freight under GO documentation — ocean containers and air freight, including overweights and partial-claim cargo.",
          },
          {
            n: "03",
            title: "It is held and tracked",
            body: "The shipment sits on our floor, tracked alongside bonded and free cargo. Storage and handling are quoted from that shipment's documents. We do not publish a flat fee.",
          },
          {
            n: "04",
            title: "Release, or CBP's direction",
            body: "Once the entry is filed and duties and warehouse charges are settled, CBP authorizes release. If the freight stays unclaimed, CBP can direct sale or destruction. The auction clock people plan around is six months from importation.",
          },
        ]}
      />

      <CardGrid
        tone="deep"
        eyebrowText="When a GO warehouse is the point"
        title="Four situations we see every month."
        items={[
          {
            label: "The 15 days ran out",
            body: "The entry was not filed before the port window closed. The freight needs a CBP-designated GO facility, not a general 3PL that will turn it away.",
          },
          {
            label: "Only part of it was claimed",
            body: "Some of the shipment was entered. The rest is still unclaimed and has to be held under GO until the broker finishes the entry or CBP directs another outcome.",
          },
          {
            label: "The container is overweight",
            body: "GO freight that cannot legally roll inland in one box. We can devan and redistribute it the same way we rework any overweight ocean container.",
          },
          {
            label: "The broker needs a person",
            body: "You have a bill of lading, a container number, and a clock. You call (843) 818-2332 and talk to the people who can see the freight, not a call center.",
          },
        ]}
      />

      <CardGrid
        eyebrowText="What we actually do with GO freight"
        title="Hold it, then move it the way CBP allows."
        items={[
          {
            label: "Ocean and air",
            body: "Both ocean and air General Order freight. Overweights and partial-claim cargo are part of the work, not exceptions we send back.",
          },
          {
            label: "Direct from the terminal",
            body: (
              <>
                Received under GO documentation. Drayage off Wando Welch,
                NCT, and Leatherman is the same desk — see{" "}
                <Link
                  href="/services/drayage"
                  style={{ color: colors.accent, textDecoration: "underline" }}
                >
                  port drayage
                </Link>
                .
              </>
            ),
          },
          {
            label: "Release",
            body: "To the importer once duty and charges are paid, or into devanning, bonded storage, or cross-dock on our floor if that is the next move.",
          },
          {
            label: "Sale or destruction",
            body: "When CBP directs it. We do not auction freight on our own. The six-month clock is the general rule people plan around; at-risk cargo can move sooner.",
          },
          {
            label: "Charges",
            body: "Quoted per shipment from the arrival documents. No rate card on this page, and no fee we have not already stated elsewhere on the site.",
          },
          {
            label: "Who to call",
            body: `${business.phoneDisplay} or ${business.email}. Importers, brokers, and carriers. Have the BOL or AWB and the container or waybill number.`,
          },
        ]}
      />

      <FaqList title="Questions brokers ask before they send the file." items={FAQ} />

      <ServiceClose
        eyebrowText="Freight already in General Order?"
        title="Call with the bill of lading. We will tell you what it takes to get it out."
      />
    </>
  );
}
