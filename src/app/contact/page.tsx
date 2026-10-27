import type { Metadata } from "next";
import Link from "next/link";
import {
  business,
  businessHours,
  buttonPrimary,
  buttonSecondary,
  colors,
  container,
  eyebrow,
  fonts,
  ladsonLocation,
} from "../components/styles";
import { JsonLd } from "../components/service-blocks";

const PATH = "/contact";
const TITLE = "Contact C&C Warehouse | Ladson & Hanahan, SC";
const DESCRIPTION =
  "Call C&C Warehouse at (843) 818-2332 or email information@candcwarehouse.com. Ladson and Hanahan, SC, near the Port of Charleston. Mon–Fri 8:00 a.m.–4:30 p.m.";

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
        alt: "Contact C&C Warehouse in Ladson and Hanahan, SC",
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
      name: "Contact",
      item: "https://www.candcwarehouse.com/contact",
    },
  ],
};

export default function ContactPage() {
  return (
    <>
      <JsonLd id="breadcrumb-jsonld" data={breadcrumb} />
      <section
        style={{
          padding: "88px 0 56px",
          background: "linear-gradient(180deg, #fafaf7 0%, #f3efe7 100%)",
          borderBottom: `1px solid ${colors.line}`,
        }}
      >
        <div style={container}>
          <div style={eyebrow}>Contact</div>
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
            Contact C&amp;C Warehouse
          </h1>
          <p
            style={{
              fontFamily: fonts.heading,
              fontSize: "clamp(20px, 2.4vw, 28px)",
              lineHeight: 1.25,
              fontWeight: 500,
              color: colors.inkSoft,
              marginTop: 14,
              maxWidth: 720,
            }}
          >
            Ladson and Hanahan, South Carolina.
          </p>
          <p
            style={{
              fontFamily: fonts.body,
              fontSize: 18,
              lineHeight: 1.65,
              color: colors.steel,
              marginTop: 18,
              maxWidth: 680,
            }}
          >
            One phone number for bonded storage, General Order, devanning,
            and everything else on the floor. You talk to the warehouse, not
            a call queue.
          </p>
          <div
            style={{
              display: "flex",
              gap: 12,
              marginTop: 28,
              flexWrap: "wrap",
            }}
          >
            <a
              href={`tel:${business.phone}`}
              className="cta-primary"
              style={buttonPrimary}
            >
              Call {business.phoneDisplay}
            </a>
            <Link href="/quote" className="cta-secondary" style={buttonSecondary}>
              Request a quote
            </Link>
          </div>
        </div>
      </section>

      <section style={{ padding: "56px 0 24px" }}>
        <div style={container}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 18,
            }}
          >
            {business.facilities.map((f) => (
              <article
                key={f.street}
                style={{
                  background: colors.paper,
                  border: `1px solid ${colors.line}`,
                  borderRadius: 12,
                  padding: 22,
                }}
              >
                {f.street === ladsonLocation.street ? (
                  <Link
                    href={ladsonLocation.path}
                    style={{ ...eyebrow, textDecoration: "underline" }}
                  >
                    {f.label}
                  </Link>
                ) : (
                  <div style={eyebrow}>{f.label}</div>
                )}
                <h2
                  style={{
                    fontFamily: fonts.heading,
                    fontSize: 22,
                    fontWeight: 600,
                    marginTop: 10,
                  }}
                >
                  {f.street}
                </h2>
                <p
                  style={{
                    fontFamily: fonts.body,
                    fontSize: 16,
                    lineHeight: 1.6,
                    color: colors.steel,
                    marginTop: 8,
                  }}
                >
                  {f.city}, {f.state} {f.postal}
                </p>
              </article>
            ))}
            <article
              style={{
                background: colors.paper,
                border: `1px solid ${colors.line}`,
                borderRadius: 12,
                padding: 22,
              }}
            >
              <div style={eyebrow}>Phone and email</div>
              <h2
                style={{
                  fontFamily: fonts.heading,
                  fontSize: 22,
                  fontWeight: 600,
                  marginTop: 10,
                }}
              >
                <a href={`tel:${business.phone}`} style={{ color: colors.ink }}>
                  {business.phoneDisplay}
                </a>
              </h2>
              <p
                style={{
                  fontFamily: fonts.body,
                  fontSize: 16,
                  lineHeight: 1.6,
                  color: colors.steel,
                  marginTop: 8,
                }}
              >
                <a
                  href={`mailto:${business.email}`}
                  style={{ color: colors.accent, textDecoration: "underline" }}
                >
                  {business.email}
                </a>
              </p>
              <p
                style={{
                  fontFamily: fonts.body,
                  fontSize: 15,
                  lineHeight: 1.6,
                  color: colors.steel,
                  marginTop: 14,
                }}
              >
                {businessHours.display}{" "}
                Those hours are the same ones
                already published in the site&rsquo;s business structured
                data.
              </p>
            </article>
          </div>

          <div
            style={{
              marginTop: 36,
              maxWidth: 720,
              fontFamily: fonts.body,
              fontSize: 16.5,
              lineHeight: 1.65,
              color: colors.steel,
            }}
          >
            <p>
              For a shipment already in{" "}
              <Link
                href="/services/general-order"
                style={{ color: colors.accent, textDecoration: "underline" }}
              >
                General Order
              </Link>
              , have the bill of lading or air waybill and the container or
              waybill number when you call. For a quote on bonded storage,
              devanning, drayage, or fulfillment, the{" "}
              <Link
                href="/quote"
                style={{ color: colors.accent, textDecoration: "underline" }}
              >
                quote form
              </Link>{" "}
              collects the same facts we ask for on the phone. Inventory
              logins are at{" "}
              <a
                href="https://portal.candcwarehouse.com"
                style={{ color: colors.accent, textDecoration: "underline" }}
              >
                portal.candcwarehouse.com
              </a>
              .
            </p>
            <p>
              More answers are on the{" "}
              <Link
                href="/faq"
                style={{ color: colors.accent, textDecoration: "underline" }}
              >
                FAQ
              </Link>
              . Building details are on the{" "}
              <Link
                href="/facility"
                style={{ color: colors.accent, textDecoration: "underline" }}
              >
                facility page
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
