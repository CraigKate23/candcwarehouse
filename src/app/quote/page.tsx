import type { Metadata } from "next";
import {
  business,
  cardStyle,
  colors,
  container,
  eyebrow,
  fonts,
} from "../components/styles";
import QuoteForm from "./QuoteForm";

const PAGE_PATH = "/quote";
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://candcwarehouse.vercel.app";

export const metadata: Metadata = {
  title: "Request a quote",
  description:
    "Tell us about your cargo and we'll come back with a bonded, GO, or general warehousing quote. Family-run, port-proximate, hands-on.",
  alternates: { canonical: `${SITE_URL}${PAGE_PATH}` },
  openGraph: {
    title: "Request a quote — C&C Warehouse",
    description:
      "Bonded, General Order, devanning, overweight reworking, drayage, and pick & pack — get a real quote from a real person near the Port of Charleston.",
    url: `${SITE_URL}${PAGE_PATH}`,
    type: "website",
  },
};

// Why-us bullets shown alongside the form so visitors understand what
// makes a C&C quote different from a generic 3PL response. Verifiable
// claims only — no invented numbers.
const WHY_US = [
  {
    title: "You talk to the owners",
    body:
      "Greg and team answer the phone. No call-center tier-one routing, no tickets bouncing for a week.",
  },
  {
    title: "Bonded & GO are our day job",
    body:
      "We started in 1998 and built the business around the cargo other warehouses send back — bonded, General Order, overweights.",
  },
  {
    title: "Port-proximate drayage",
    body:
      "Ladson, SC sits minutes from Wando Welch, NCT, and Leatherman terminals. Drayage miles stay low.",
  },
  {
    title: "We respond fast",
    body:
      "Most quote requests come back the same business day. If it's complex (bonded transfers, GO transfers, overweight rework) we'll call you to scope it properly.",
  },
];

export default function QuotePage() {
  return (
    <>
      {/* Hero */}
      <section
        style={{
          padding: "88px 0 56px",
          background:
            "linear-gradient(180deg, #fafaf7 0%, #f3efe7 100%)",
          borderBottom: `1px solid ${colors.line}`,
        }}
      >
        <div style={container}>
          <div style={eyebrow}>Step 1 · Tell us about your cargo</div>
          <h1
            style={{
              fontFamily: fonts.heading,
              fontSize: "clamp(36px, 4.4vw, 52px)",
              lineHeight: 1.08,
              fontWeight: 700,
              marginTop: 14,
              maxWidth: 820,
            }}
          >
            Request a quote.
          </h1>
          <p
            style={{
              fontFamily: fonts.body,
              fontSize: 18,
              lineHeight: 1.6,
              color: colors.steel,
              marginTop: 18,
              maxWidth: 720,
            }}
          >
            The more you can tell us up front, the tighter the quote. If
            you&apos;re not sure of a number, leave it blank — we&apos;d
            rather call you and ask than guess.
          </p>
        </div>
      </section>

      {/* Form + sidebar */}
      <section
        style={{
          padding: "64px 0 88px",
          background: colors.paper,
        }}
      >
        <div
          className="quote-grid"
          style={{
            ...container,
            display: "grid",
            gridTemplateColumns: "1.4fr 0.9fr",
            gap: 48,
            alignItems: "start",
          }}
        >
          <QuoteForm />

          <aside style={{ display: "grid", gap: 20 }}>
            <div
              className="quote-aside"
              style={{
                ...cardStyle,
                background: colors.paperDeep,
                border: `1px solid ${colors.line}`,
              }}
            >
              <div style={eyebrow}>Why C&amp;C</div>
              <h2
                style={{
                  fontFamily: fonts.heading,
                  fontSize: 22,
                  lineHeight: 1.2,
                  fontWeight: 600,
                  marginTop: 8,
                }}
              >
                What you&apos;re going to get.
              </h2>
              <ul
                style={{
                  margin: "20px 0 0",
                  padding: 0,
                  listStyle: "none",
                  display: "grid",
                  gap: 18,
                }}
              >
                {WHY_US.map((item) => (
                  <li key={item.title}>
                    <div
                      style={{
                        fontFamily: fonts.heading,
                        fontSize: 15,
                        fontWeight: 600,
                        color: colors.ink,
                      }}
                    >
                      {item.title}
                    </div>
                    <div
                      style={{
                        fontFamily: fonts.body,
                        fontSize: 14.5,
                        lineHeight: 1.55,
                        color: colors.steel,
                        marginTop: 4,
                      }}
                    >
                      {item.body}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="quote-aside"
              style={{
                ...cardStyle,
                padding: 24,
              }}
            >
              <div style={eyebrow}>Prefer to talk?</div>
              <div
                style={{
                  fontFamily: fonts.heading,
                  fontSize: 26,
                  fontWeight: 700,
                  marginTop: 6,
                }}
              >
                <a
                  href={`tel:${business.phone}`}
                  className="footer-link"
                  style={{ color: colors.ink }}
                >
                  {business.phoneDisplay}
                </a>
              </div>
              <div
                style={{
                  fontFamily: fonts.body,
                  fontSize: 14.5,
                  lineHeight: 1.55,
                  color: colors.steel,
                  marginTop: 8,
                }}
              >
                Mon–Fri, business hours Eastern. Or email{" "}
                <a
                  href={`mailto:${business.email}`}
                  className="footer-link"
                  style={{ color: colors.accentDeep, fontWeight: 600 }}
                >
                  {business.email}
                </a>
                .
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
