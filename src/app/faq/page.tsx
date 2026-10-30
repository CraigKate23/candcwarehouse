import type { Metadata } from "next";
import Link from "next/link";
import {
  business,
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
} from "../components/styles";
import { JsonLd, faqJsonLd } from "../components/service-blocks";

const PATH = "/faq";
const TITLE = "Warehouse FAQ | Bonded, GO & Charleston Port | C&C";
const DESCRIPTION =
  "Answers on C&C Warehouse's CBP Class 3 bonded storage, General Order, devanning, drayage, and the Ladson and Hanahan, SC facilities near the Port of Charleston.";

const FAQ: { q: string; a: string }[] = [
  {
    q: "Where is C&C Warehouse?",
    a: "Two facilities. The primary building is 137 Acres Drive, Ladson, SC 29456 (60,000 sq ft). The second is 1014 Northpointe Industrial Blvd, Hanahan, SC 29410 (30,000 sq ft). Together that is 90,000+ sq ft, with 3,000+ racked pallet positions. Both are in the Charleston metro, within drayage range of Wando Welch, North Charleston Terminal, and Hugh K. Leatherman.",
  },
  {
    q: "What kind of warehouse is this?",
    a: "A family-run warehouse opened in 1998. C&C is a CBP Class 3 bonded warehouse — an importer's private bonded warehouse — and a CBP-designated General Order facility. The phone number is (843) 818-2332. The email is information@candcwarehouse.com.",
  },
  {
    q: "What is Class 3 bonded storage?",
    a: "Bonded storage lets imported cargo wait on bond so duty is not paid until the goods are entered for consumption. It is voluntary: the importer or broker elects it. Under the standard CBP rule, cargo can remain in a bonded warehouse for up to five years from importation. Partial withdrawals are allowed. C&C handles the bonded paperwork with the receipt.",
  },
  {
    q: "What is General Order, and how is it different from bonded storage?",
    a: "General Order is involuntary. When freight sits unclaimed at the port past the 15-day window, CBP can move it to a GO warehouse. Release generally means a Customs entry, duties and related charges paid, and the warehouse charges on that shipment settled. Unclaimed freight can be sold at public auction; the clock people plan around is six months from importation, and at-risk cargo can move sooner when CBP directs it. We do not publish GO fees — they are quoted from the shipment documents. Bonded storage is the voluntary alternative, used before freight ever becomes unclaimed.",
  },
  {
    q: "Which services do you actually perform?",
    a: "Ten. US Customs bonded storage, General Order storage, container devanning with a piece-count audit, overweight container reworking, drayage from Wando Welch, NCT, and Leatherman, cross-dock, deconsolidation, WMS-tracked inventory, pick and pack, and Amazon FBA prep. The services page is the index. Each one has its own page.",
  },
  {
    q: "How close are the buildings to the port terminals?",
    a: "Published drive distances: from Ladson, Wando Welch is about 24 miles, North Charleston Terminal about 14, and Hugh K. Leatherman about 14. From Hanahan, Wando Welch is about 16 miles, NCT about 7, and Leatherman about 6. Inland Port Greer is about 199 miles from Ladson and about 201 from Hanahan.",
  },
  {
    q: "Do you devan containers and rework overweight loads?",
    a: "Yes. Devanning is a hand unload with a piece count against the bill of lading, photographed exceptions, and a tally. The services page states peak throughput of 30 containers a day, scaled by container type and product mix. Overweight ocean containers are split, re-palletized, and redistributed onto legal-weight outbound loads, with weight tickets and bills of lading for the driver.",
  },
  {
    q: "How do I reach someone or request a quote?",
    a: "Call (843) 818-2332, email information@candcwarehouse.com, or use the quote form. Hours published on the site are Monday through Friday, 8:00 a.m. to 4:30 p.m. The customer portal for inventory is portal.candcwarehouse.com.",
  },
];

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
        alt: "C&C Warehouse — frequently asked questions about bonded and General Order warehousing near Charleston",
      },
    ],
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
      item: "https://www.candcwarehouse.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "FAQ",
      item: "https://www.candcwarehouse.com/faq",
    },
  ],
};

const LINKS: { href: string; label: string }[] = [
  { href: "/services/bonded-storage", label: "Bonded storage" },
  { href: "/services/general-order", label: "General Order" },
  { href: "/services/devanning", label: "Devanning" },
  { href: "/services/overweight-reworking", label: "Overweight reworking" },
  { href: "/services/drayage", label: "Drayage" },
  { href: "/services/cross-dock", label: "Cross-dock" },
  { href: "/services/deconsolidation", label: "Deconsolidation" },
  { href: "/services/wms", label: "WMS inventory" },
  { href: "/services/pick-pack", label: "Pick and pack" },
  { href: "/services/fba-prep", label: "FBA prep" },
  { href: "/facility", label: "Facility" },
  { href: terminalsGuidePath, label: "Port of Charleston terminals" },
  { href: fbaGuidePath, label: "Port of Charleston to Amazon FBA" },
  { href: ladsonLocation.path, label: "Ladson warehouse" },
  { href: hanahanLocation.path, label: "Hanahan warehouse" },
  { href: "/contact", label: "Contact" },
];

export default function FaqPage() {
  return (
    <>
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
          <div style={eyebrow}>FAQ</div>
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
            Bonded &amp; General Order Warehouse FAQ
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
            Charleston, Ladson, and Hanahan, South Carolina.
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
            Short answers from what this site already states. Square footage,
            terminal miles, and the service list match the facility and
            services pages. Fees that are not printed there are not printed
            here either. Per-building terminal miles are also on the{" "}
            <Link
              href={terminalsGuidePath}
              style={{ color: colors.accent, textDecoration: "underline" }}
            >
              Port of Charleston terminals
            </Link>{" "}
            guide.
          </p>
        </div>
      </section>

      <section style={{ padding: "56px 0 24px" }}>
        <div style={container}>
          <div style={{ display: "grid", gap: 14, maxWidth: 880 }}>
            {FAQ.map((f) => (
              <details
                key={f.q}
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
                  {f.q}
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
                  {f.a}
                </p>
              </details>
            ))}
          </div>

          <h2
            style={{
              fontFamily: fonts.heading,
              fontSize: 26,
              fontWeight: 700,
              marginTop: 48,
            }}
          >
            Read the full page
          </h2>
          <ul
            style={{
              marginTop: 16,
              padding: 0,
              listStyle: "none",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 8,
              maxWidth: 880,
            }}
          >
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  style={{
                    fontFamily: fonts.body,
                    fontSize: 15,
                    color: colors.accentDeep,
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  {l.label} →
                </Link>
              </li>
            ))}
          </ul>

          <div
            style={{
              display: "flex",
              gap: 12,
              marginTop: 36,
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
