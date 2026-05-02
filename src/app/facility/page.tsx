import type { Metadata } from "next";
import Link from "next/link";
import {
  business,
  buttonPrimary,
  buttonSecondary,
  cardStyle,
  colors,
  container,
  eyebrow,
  fonts,
} from "../components/styles";

export const metadata: Metadata = {
  title: "Facility | 90,000+ sq ft across Ladson & Hanahan, SC",
  description:
    "Two facilities totaling 90,000+ sq ft with 3,000+ racked pallet positions, minutes from the Port of Charleston terminals. US Customs Bonded, General Order approved.",
  alternates: {
    canonical: "/facility",
  },
  openGraph: {
    type: "website",
    url: "/facility",
    title: `Facility · ${business.name}`,
    description:
      "Two facilities totaling 90,000+ sq ft near the Port of Charleston. Bonded, GO-approved, 3,000+ racked positions.",
  },
};

const LOCATIONS = [
  {
    name: "Ladson facility",
    badge: "Primary",
    address: "137 Acres Drive",
    cityState: "Ladson, SC 29456",
    sqft: "60,000",
    highlights: [
      {
        label: "Size",
        body: "60,000 sq ft of bonded and general warehousing space.",
      },
      {
        label: "Designation",
        body: "CBP Class 3 Bonded Warehouse. General Order approved.",
      },
      {
        label: "Wando Welch",
        body: "~24 miles — short-haul drayage via I-526.",
      },
      {
        label: "NCT",
        body: "~14 miles — quick run down I-26.",
      },
      {
        label: "Leatherman",
        body: "~14 miles — direct access off I-26.",
      },
      {
        label: "Inland Port Greer",
        body: "~199 miles — I-26 straight shot upstate.",
      },
    ],
  },
  {
    name: "Hanahan facility",
    badge: "Secondary",
    address: "1014 Northpointe Industrial Blvd",
    cityState: "Hanahan, SC 29410",
    sqft: "30,000",
    highlights: [
      {
        label: "Size",
        body: "30,000 sq ft of additional warehouse capacity.",
      },
      {
        label: "Location advantage",
        body: "Closer to the port terminals — shortest drayage runs in our network.",
      },
      {
        label: "Wando Welch",
        body: "~16 miles — across I-526.",
      },
      {
        label: "NCT",
        body: "~7 miles — minutes away.",
      },
      {
        label: "Leatherman",
        body: "~6 miles — the closest terminal to this facility.",
      },
      {
        label: "Inland Port Greer",
        body: "~201 miles — I-26 upstate.",
      },
    ],
  },
];

const CAPABILITIES = [
  {
    label: "US Customs Bonded",
    body: "CBP Class 3 designation. Hold imported cargo on bond until you're ready to enter it for consumption.",
  },
  {
    label: "General Order approved",
    body: "CBP-designated GO facility. We receive, hold, and manage the release process for unclaimed freight.",
  },
  {
    label: "3,000+ racked positions",
    body: "Combined racked pallet positions across both facilities, plus floor-load capacity for oversized cargo.",
  },
  {
    label: "30 containers/day",
    body: "Peak throughput across both locations. Devanning, reworking, and cross-dock scaled by product mix.",
  },
  {
    label: "WMS-tracked inventory",
    body: "Real-time inventory with lot tracking, FIFO/FEFO rotation, and customer portal access.",
  },
  {
    label: "Port-proximate",
    body: "Both facilities sit within 25 miles of all three SC Ports Authority ocean terminals.",
  },
];

export default function FacilityPage() {
  return (
    <>
      {/* Hero */}
      <section
        style={{
          padding: "88px 0 64px",
          background:
            "linear-gradient(180deg, #fafaf7 0%, #f3efe7 100%)",
          borderBottom: `1px solid ${colors.line}`,
        }}
      >
        <div style={container}>
          <div style={eyebrow}>Facility</div>
          <h1
            style={{
              fontFamily: fonts.heading,
              fontSize: "clamp(36px, 4.8vw, 56px)",
              lineHeight: 1.08,
              fontWeight: 700,
              marginTop: 16,
              maxWidth: 820,
            }}
          >
            90,000+ sq ft across two locations, minutes from the port.
          </h1>
          <p
            style={{
              fontFamily: fonts.body,
              fontSize: 18,
              lineHeight: 1.65,
              color: colors.steel,
              marginTop: 22,
              maxWidth: 680,
            }}
          >
            C&amp;C Warehouse operates out of two facilities in the
            Charleston metro — a 60,000 sq ft primary location in Ladson and
            a 30,000 sq ft facility in Hanahan. Both are US Customs Bonded
            and sit within easy drayage range of Wando Welch, NCT, and Hugh
            K. Leatherman terminals.
          </p>
          <div
            style={{
              display: "flex",
              gap: 12,
              marginTop: 28,
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/quote"
              className="cta-primary"
              style={buttonPrimary}
            >
              Request a quote
            </Link>
            <Link
              href="/services"
              className="cta-secondary"
              style={buttonSecondary}
            >
              See what we do
            </Link>
          </div>
        </div>
      </section>

      {/* Location cards */}
      <section style={{ padding: "80px 0" }}>
        <div style={container}>
          <div style={eyebrow}>Our locations</div>
          <h2
            style={{
              fontFamily: fonts.heading,
              fontSize: "clamp(26px, 3.2vw, 36px)",
              fontWeight: 700,
              marginTop: 10,
              maxWidth: 700,
            }}
          >
            Two facilities, one team.
          </h2>
          <p
            style={{
              fontFamily: fonts.body,
              fontSize: 16,
              lineHeight: 1.6,
              color: colors.steel,
              marginTop: 12,
              maxWidth: 620,
            }}
          >
            Inventory moves between both buildings as needed. Same WMS, same
            crew, same phone number.
          </p>

          <div
            style={{
              marginTop: 48,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(440px, 1fr))",
              gap: 28,
            }}
          >
            {LOCATIONS.map((loc) => (
              <article
                key={loc.name}
                style={{
                  ...cardStyle,
                  padding: 0,
                  overflow: "hidden",
                }}
              >
                {/* Photo placeholder */}
                <div
                  style={{
                    height: 200,
                    background:
                      "linear-gradient(135deg, #f3efe7 0%, #ece4d3 100%)",
                    borderBottom: `1px solid ${colors.line}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: fonts.mono,
                    fontSize: 12,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: colors.steelLight,
                  }}
                >
                  Facility photo TK
                </div>

                <div style={{ padding: 28 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: fonts.heading,
                        fontSize: 22,
                        fontWeight: 700,
                      }}
                    >
                      {loc.name}
                    </h3>
                    <span
                      style={{
                        fontFamily: fonts.mono,
                        fontSize: 11,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: colors.accent,
                        border: `1px solid ${colors.accent}`,
                        borderRadius: 4,
                        padding: "2px 8px",
                      }}
                    >
                      {loc.badge}
                    </span>
                  </div>

                  <div
                    style={{
                      fontFamily: fonts.body,
                      fontSize: 15,
                      color: colors.steel,
                      marginTop: 6,
                      lineHeight: 1.5,
                    }}
                  >
                    {loc.address}
                    <br />
                    {loc.cityState}
                  </div>

                  <div
                    style={{
                      fontFamily: fonts.heading,
                      fontSize: 32,
                      fontWeight: 700,
                      color: colors.ink,
                      marginTop: 18,
                    }}
                  >
                    {loc.sqft} sq ft
                  </div>

                  <div
                    style={{
                      marginTop: 22,
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(180px, 1fr))",
                      gap: 14,
                    }}
                  >
                    {loc.highlights.map((h) => (
                      <div
                        key={h.label}
                        style={{
                          padding: "12px 14px",
                          background: colors.paperDeep,
                          borderRadius: 8,
                        }}
                      >
                        <div
                          style={{
                            fontFamily: fonts.mono,
                            fontSize: 11,
                            letterSpacing: "0.12em",
                            textTransform: "uppercase",
                            color: colors.accent,
                          }}
                        >
                          {h.label}
                        </div>
                        <div
                          style={{
                            fontFamily: fonts.body,
                            fontSize: 14,
                            color: colors.steel,
                            marginTop: 4,
                            lineHeight: 1.45,
                          }}
                        >
                          {h.body}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities strip */}
      <section
        style={{
          padding: "72px 0",
          background: colors.paperDeep,
          borderTop: `1px solid ${colors.line}`,
          borderBottom: `1px solid ${colors.line}`,
        }}
      >
        <div style={container}>
          <div style={eyebrow}>Combined capabilities</div>
          <h2
            style={{
              fontFamily: fonts.heading,
              fontSize: "clamp(26px, 3.2vw, 36px)",
              fontWeight: 700,
              marginTop: 10,
            }}
          >
            What both facilities share.
          </h2>

          <div
            style={{
              marginTop: 36,
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 18,
            }}
          >
            {CAPABILITIES.map((c) => (
              <div
                key={c.label}
                style={{
                  background: colors.paper,
                  border: `1px solid ${colors.line}`,
                  borderRadius: 12,
                  padding: 22,
                }}
              >
                <div
                  style={{
                    fontFamily: fonts.heading,
                    fontSize: 16,
                    fontWeight: 600,
                    color: colors.ink,
                  }}
                >
                  {c.label}
                </div>
                <div
                  style={{
                    fontFamily: fonts.body,
                    fontSize: 14.5,
                    lineHeight: 1.55,
                    color: colors.steel,
                    marginTop: 6,
                  }}
                >
                  {c.body}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 0 40px" }}>
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
            Come see the facility — or just call us.
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
            We&rsquo;re happy to walk you through the operation. Drop by
            during business hours or give us a ring.
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
            <Link
              href="/quote"
              className="cta-primary"
              style={buttonPrimary}
            >
              Start a quote
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
