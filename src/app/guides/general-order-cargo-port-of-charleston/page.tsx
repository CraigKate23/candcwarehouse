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
} from "../../components/styles";

// Facts on this page are restated from pages already on the site:
// /services/general-order, the General Order section of /services,
// /services/bonded-storage, /faq, /services/wms, /services/drayage,
// /facility, and the location pages. No fee, rate, regulation citation,
// or timeline is added here. GO fees stay unpublished.

const PATH = goGuidePath;
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.candcwarehouse.com";

const TITLE = "General Order Cargo at the Port of Charleston | C&C";
const DESCRIPTION =
  "Unclaimed Port of Charleston freight and General Order: the 15-day window, what release requires, and the six-month clock. GO fees are quoted, not published.";

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
        alt: "C&C Warehouse — guide to General Order cargo and unclaimed freight at the Port of Charleston",
      },
    ],
  },
};

const RELATED: { href: string; label: string }[] = [
  { href: "/services/general-order", label: "General Order" },
  { href: "/services/bonded-storage", label: "Bonded storage" },
  { href: "/faq", label: "FAQ" },
  { href: terminalsGuidePath, label: "Terminal distances" },
  { href: "/services/drayage", label: "Drayage" },
  { href: "/quote", label: "Request a quote" },
  { href: ladsonLocation.path, label: ladsonLocation.query },
  { href: hanahanLocation.path, label: hanahanLocation.query },
];

const FAQ: { q: string; a: string }[] = [
  {
    q: "What happens when cargo goes to General Order?",
    a: "A General Order warehouse is a CBP-designated facility that receives freight the port could not get entered, exported, or otherwise cleared in time. General Order is what happens when freight goes unclaimed. It is not bonded storage. C&C Warehouse is a CBP-designated GO facility in Ladson and Hanahan, SC, and also a CBP Class 3 bonded warehouse. The warehouse receives the freight, holds it, and works with the carrier, the broker, and CBP until it is released or disposed of the way CBP directs.",
  },
  {
    q: "What is the 15-day window for unclaimed freight at the Port of Charleston?",
    a: "The window carriers and brokers plan around is 15 days at the port. Cargo arrives at a Port of Charleston terminal, or by air, and is not entered or exported in time. Freight that is still unclaimed after that can be moved into a General Order warehouse. The General Order page says CBP can order it into General Order. The services page states that when freight goes unclaimed past the 15-day window, CBP moves it to a GO warehouse.",
  },
  {
    q: "How is General Order different from voluntary bonded storage?",
    a: "Bonded storage is voluntary: the importer or their broker elects to place cargo on bond. General Order is involuntary. Bonded storage is the voluntary alternative, used before freight ever becomes unclaimed. On the bonded storage page, imported merchandise can sit without import duty at arrival. Duty is owed when the cargo is withdrawn for US consumption, or not at all if it is re-exported under bond. Under the standard CBP rule stated there, bonded cargo can remain up to five years from the date of importation. That five-year window is the bonded rule. The General Order clock people plan around is six months from importation.",
  },
  {
    q: "How do you release General Order freight in Charleston?",
    a: "Release is a Customs process, not just a phone call. Release generally means a Customs entry, duties and related charges paid, and the warehouse charges on that shipment settled. The importer or broker files the entry, duties and related Customs charges are paid, and the warehouse charges on that shipment are settled. CBP then authorizes the release. The freight can go to the importer, to a truck, or into another service on the floor such as devanning, bonded storage, or cross-dock. If CBP directs sale or destruction instead, the warehouse follows that instruction.",
  },
  {
    q: "What is the six-month General Order clock, and can cargo move sooner?",
    a: "In general terms, freight that stays unclaimed can be sold at public auction. The timeline warehouses and brokers plan around is six months from importation. Perishable, hazardous, or otherwise at-risk cargo can move faster when CBP directs it. C&C does not auction freight on its own. This page will not guess a sale date. Call with the arrival documents.",
  },
  {
    q: "What kinds of General Order freight does C&C accept, and how is it received?",
    a: "Both ocean and air General Order freight, including overweights and partial-claim cargo. Receipt is under GO documentation, and the move is coordinated with the carrier and CBP. Ocean freight can come direct from the terminal. Drayage off Wando Welch, North Charleston Terminal, and Hugh K. Leatherman is the same desk. If only part of a shipment was claimed, the rest stays under GO until the broker finishes the entry or CBP directs another outcome. GO freight that cannot legally roll inland in one box can be devanned and redistributed the same way any overweight ocean container is reworked.",
  },
  {
    q: "Are General Order fees published?",
    a: `No. ${business.name} does not publish a rate card or a GO fee. Storage, handling, and the move from the terminal are quoted from the documents on that shipment — the bill of lading or air waybill, the container number if there is one, and the arrival date. Call ${business.phoneDisplay} or email ${business.email}. Importers, customs brokers, and carriers use the same number. For freight already in General Order, have the bill of lading or air waybill, the container or AWB number, the importer of record, and which terminal or airline it arrived on.`,
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
      name: "General Order",
      item: `${SITE_URL}/services/general-order`,
    },
    {
      "@type": "ListItem",
      position: 3,
      name: "General Order cargo",
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

export default function GeneralOrderCargoGuidePage() {
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
              href="/services/general-order"
              style={{ color: colors.steel, textDecoration: "none" }}
            >
              General Order
            </Link>
            <span style={{ margin: "0 10px", color: colors.line }}>/</span>
            <span style={{ color: colors.accent }}>General Order cargo</span>
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
            What happens when cargo goes to General Order
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
            Unclaimed freight at the Port of Charleston, the 15-day window,
            and how a release works.
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
            {business.name}, family-run since {business.foundedYear}, is a
            CBP-designated General Order facility and a CBP Class 3 bonded
            warehouse — an importer&apos;s private bonded warehouse. The
            primary building is the{" "}
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
            This page restates the{" "}
            <Link href="/services/general-order" style={linkStyle}>
              General Order
            </Link>
            ,{" "}
            <Link href="/services/bonded-storage" style={linkStyle}>
              bonded storage
            </Link>
            , and{" "}
            <Link href="/faq" style={linkStyle}>
              FAQ
            </Link>{" "}
            pages. It does not publish a GO fee. Storage, handling, and the
            move from the terminal are quoted from the documents on that
            shipment. Use the{" "}
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
            <Fact label="Port window" value="15 days, then GO" />
            <Fact label="How it starts" value="Involuntary" />
            <Fact label="Unclaimed clock" value="Six months" />
            <Fact label="Freight" value="Ocean and air" />
          </div>
        </div>
      </section>

      <section style={{ padding: "56px 0" }}>
        <div style={container}>
          <div style={eyebrow}>1 · What it is</div>
          <h2 style={h2Style}>General Order is unclaimed freight.</h2>
          <p style={ledeStyle}>
            A General Order warehouse is a CBP-designated facility that
            receives freight the port could not get entered, exported, or
            otherwise cleared in time. That is the definition on the{" "}
            <Link href="/services/general-order" style={linkStyle}>
              General Order page
            </Link>
            . General Order is what happens when freight goes unclaimed. It
            is not bonded storage. {business.name} is a CBP-designated GO
            facility in {ladsonLocation.city} and {hanahanLocation.city},
            SC, and also a CBP Class 3 bonded warehouse.
          </p>
          <p style={ledeStyle}>
            The services page describes the same work in fewer words. When
            freight goes unclaimed past the 15-day window at the port, CBP
            moves it to a GO warehouse. The warehouse receives it, holds
            it, and works with the carrier, the broker, and CBP until it
            is released or disposed of the way CBP directs. The General
            Order page says CBP can order that move.
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
          <div style={eyebrow}>2 · The 15-day window</div>
          <h2 style={h2Style}>Unclaimed at the port, then General Order.</h2>
          <p style={ledeStyle}>
            The window carriers and brokers plan around is 15 days at the
            port. Cargo arrives at a Port of Charleston terminal, or by
            air, and is not entered or exported in time. Freight that is
            still unclaimed after that can be moved into a General Order
            warehouse. The{" "}
            <Link href="/faq" style={linkStyle}>
              FAQ
            </Link>{" "}
            states it the same way: when freight sits unclaimed at the port
            past the 15-day window, CBP can move it to a GO warehouse.
          </p>
          <p style={ledeStyle}>
            One situation the General Order page names is the entry that
            was not filed before the port window closed. That freight needs
            a CBP-designated GO facility. Another is a partial claim. Some
            of the shipment was entered. The rest is still unclaimed and
            has to be held under GO until the broker finishes the entry or
            CBP directs another outcome.
          </p>
        </div>
      </section>

      <section style={{ padding: "56px 0" }}>
        <div style={container}>
          <div style={eyebrow}>3 · Two different holds</div>
          <h2 style={h2Style}>
            Voluntary bonded storage, involuntary General Order.
          </h2>
          <p style={ledeStyle}>
            On the{" "}
            <Link href="/services/bonded-storage" style={linkStyle}>
              bonded storage page
            </Link>
            , bonded storage is voluntary: the importer or their broker
            elects to place cargo on bond. General Order is involuntary.
            The FAQ calls bonded storage the voluntary alternative, used
            before freight ever becomes unclaimed. {business.name} handles
            both. They are not the same status, and the site keeps them on
            separate pages.
          </p>
          <p style={ledeStyle}>
            Class 3 is the importer&apos;s private bonded warehouse
            classification. Imported merchandise can sit without import
            duty at arrival. Duty is owed when the cargo is withdrawn for
            US consumption, or not at all if it is re-exported under bond.
            Under the standard CBP rule stated on the bonded page, cargo
            can remain up to five years from the date of importation. That
            five-year window is the bonded rule. It is not the General
            Order clock. The clock people plan around for unclaimed GO
            freight is six months from importation, below.
          </p>
          <div
            style={{
              marginTop: 28,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 14,
            }}
          >
            <CompareCard
              title="Bonded storage"
              body="Voluntary. The importer or broker elects it. Duty is owed when the cargo is withdrawn for US consumption, or not at all if it is re-exported under bond. The bonded page states up to five years from importation."
            />
            <CompareCard
              title="General Order"
              body="Involuntary. Unclaimed freight past the 15-day window at the port can be moved to a GO warehouse. Release generally means a Customs entry, duties and warehouse charges settled, and CBP authorization. The planning clock for freight that stays unclaimed is six months from importation."
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
          <div style={eyebrow}>4 · What comes in</div>
          <h2 style={h2Style}>
            Ocean and air, received under GO documentation.
          </h2>
          <p style={ledeStyle}>
            The services page and the General Order page agree on what is
            accepted: both ocean and air GO freight, including overweights
            and partial-claim cargo. Overweights and partial-claim cargo
            are part of the work, not exceptions sent back.
          </p>
          <p style={ledeStyle}>
            Receipt is direct from the terminal under GO documentation. The
            warehouse coordinates the move with the carrier and CBP. For
            ocean freight, drayage off Wando Welch, North Charleston
            Terminal, and Hugh K. Leatherman is the same desk.{" "}
            <Link href="/services/drayage" style={linkStyle}>
              Drayage
            </Link>{" "}
            is the short-haul between those SC Ports Authority terminals
            and the warehouse. Published miles from both buildings are on
            the{" "}
            <Link href={terminalsGuidePath} style={linkStyle}>
              terminal distances
            </Link>{" "}
            guide. The facility page states that both buildings sit within
            25 miles of all three ocean terminals. Air GO freight is
            received as well. The documents the General Order page names
            are the bill of lading or the air waybill.
          </p>
          <p style={ledeStyle}>
            An overweight that cannot legally roll inland in one box can be
            devanned and redistributed the same way any overweight ocean
            container is reworked. Once the freight is in the building, it
            sits on the floor, tracked alongside bonded and free cargo. The{" "}
            <Link href="/services/wms" style={linkStyle}>
              WMS page
            </Link>{" "}
            says bonded, General Order, and free cargo show under one logon
            at{" "}
            <a href={business.portalUrl} style={linkStyle}>
              {business.portalHost}
            </a>
            . Storage and handling are quoted from that shipment&apos;s
            documents. A flat fee is not published.
          </p>
        </div>
      </section>

      <section style={{ padding: "56px 0" }}>
        <div style={container}>
          <div style={eyebrow}>5 · How it leaves</div>
          <h2 style={h2Style}>
            Release, or the outcome CBP directs.
          </h2>
          <p style={ledeStyle}>
            Release is a Customs process, not just a phone call. The{" "}
            <Link href="/faq" style={linkStyle}>
              FAQ
            </Link>{" "}
            says release generally means a Customs entry, duties and
            related charges paid, and the warehouse charges on that
            shipment settled. The{" "}
            <Link href="/services/general-order" style={linkStyle}>
              General Order page
            </Link>{" "}
            spells out the same sequence: the importer or broker files the
            entry, duties and related Customs charges are paid, the
            warehouse charges on that shipment are settled, and CBP
            authorizes the release.
          </p>
          <p style={ledeStyle}>
            After that authorization, the freight can be handed to the
            importer, to a truck, or into another service on the floor such
            as{" "}
            <Link href="/services/devanning" style={linkStyle}>
              devanning
            </Link>
            ,{" "}
            <Link href="/services/bonded-storage" style={linkStyle}>
              bonded storage
            </Link>
            , or{" "}
            <Link href="/services/cross-dock" style={linkStyle}>
              cross-dock
            </Link>
            .
          </p>
          <p style={ledeStyle}>
            If the freight stays unclaimed, CBP can direct sale or
            destruction. {business.name} follows that instruction and does
            not auction freight on its own. In general terms, freight that
            stays unclaimed can be sold at public auction. The timeline
            warehouses and brokers plan around is six months from
            importation. Perishable, hazardous, or otherwise at-risk cargo
            can move faster when CBP directs it. This page will not guess
            a sale date. Call with the arrival documents and the warehouse
            will say where that shipment sits.
          </p>
          <p style={ledeStyle}>
            GO fees are not published. There is no rate card. Storage,
            handling, and the move from the terminal are quoted from the
            documents on that shipment — the bill of lading or air waybill,
            the container number if there is one, and the arrival date.
            Importers, customs brokers, and carriers use the same number,{" "}
            {business.phoneDisplay}, or {business.email}. For freight
            already in General Order, have the bill of lading or air
            waybill, the container or AWB number, the importer of record,
            and which terminal or airline it arrived on.
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
            The service page is{" "}
            <Link href="/services/general-order" style={linkStyle}>
              General Order
            </Link>
            . The voluntary alternative is{" "}
            <Link href="/services/bonded-storage" style={linkStyle}>
              bonded storage
            </Link>
            . Short answers are on the{" "}
            <Link href="/faq" style={linkStyle}>
              FAQ
            </Link>
            . Terminal miles are on the{" "}
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

      <section style={{ padding: "56px 0 24px" }}>
        <div style={container}>
          <div style={eyebrow}>FAQ</div>
          <h2 style={h2Style}>Questions about unclaimed freight.</h2>
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
            Call with the bill of lading.
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
            GO fees are not printed on this page. Use the quote form or
            call {business.phoneDisplay}. Hours are {businessHours.display}.
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
