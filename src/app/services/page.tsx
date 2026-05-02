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

// Marker style for facts Greg still needs to confirm. Mirrors the
// dashed-orange chip used on /about so missing data stays loud.
const placeholder = {
  display: "inline-block",
  padding: "1px 8px",
  borderRadius: 4,
  border: `1px dashed ${colors.accent}`,
  background: "rgba(217,106,44,0.08)",
  color: colors.accentDeep,
  fontFamily: fonts.mono,
  fontSize: "0.85em",
  letterSpacing: "0.02em",
} as const;

// The nine services C&C lists on the homepage. Each gets a deep-link
// anchor so /services#devanning etc. land at the right section. When we
// move to dedicated sub-pages (priority 4 in the backlog) the anchors
// double as the natural URL slugs.
type Service = {
  id: string;
  title: string;
  eyebrow: string;
  intro: string;
  highlights: { label: string; body: React.ReactNode }[];
};

const SERVICES: Service[] = [
  {
    id: "bonded-storage",
    title: "US Customs Bonded storage",
    eyebrow: "CBP Class 3",
    intro:
      "Hold imported cargo on bond so duty isn't owed until you're ready to enter it for consumption. Useful when Customs paperwork is still being sorted, when duty timing affects cash flow, or when goods may be re-exported and you'd rather not pay duty twice.",
    highlights: [
      {
        label: "Designation",
        body: "CBP-designated Class 3 (importer's private bonded warehouse).",
      },
      {
        label: "Inventory",
        body: "Tracked under bond with chain-of-custody documentation through release.",
      },
      {
        label: "Capacity",
        body: "3,000+ racked positions of bonded floor and rack space across two facilities.",
      },
    ],
  },
  {
    id: "go-storage",
    title: "General Order (GO) storage",
    eyebrow: "CBP-designated GO facility",
    intro:
      "When freight goes unclaimed past the 15-day window at the port, CBP moves it to a GO warehouse. We handle GO containers — receive them, hold them, and work with carriers, brokers, and CBP to get them released or disposed of properly.",
    highlights: [
      {
        label: "What we accept",
        body: "Both ocean and air GO freight, including overweights and partial-claim cargo.",
      },
      {
        label: "How we receive",
        body: "Direct from terminal under GO documentation; we coordinate the move with the carrier and CBP.",
      },
      {
        label: "Resolution",
        body: "Release to the importer once duty/charges are paid, or hand off for sale or destruction per CBP direction.",
      },
    ],
  },
  {
    id: "devanning",
    title: "Devanning",
    eyebrow: "Container unload",
    intro:
      "Hand-unload containers piece-by-piece with a piece-count audit and damage notes as we go. Useful when cargo is floor-loaded, when the bill of lading needs verification, or when you want a second set of eyes on what showed up versus what was paid for.",
    highlights: [
      {
        label: "Throughput",
        body: (
          <>
            30 containers/day at peak, scaled by container type and product mix.
          </>
        ),
      },
      {
        label: "Documentation",
        body: "Photographed exceptions, signed piece-count tally, optional video of unload on request.",
      },
      {
        label: "Disposition",
        body: "Stage to rack, cross-dock to outbound, or palletize per your SOP.",
      },
    ],
  },
  {
    id: "overweight-reworking",
    title: "Overweight container reworking",
    eyebrow: "Highway-legal redistribution",
    intro:
      "Containers that arrive over US highway weight limits get split, re-palletized, and redistributed across legal-weight loads so they can move inland. This is one of the things C&C is best known for — we built tooling and process around it because so many 3PLs send the work back.",
    highlights: [
      {
        label: "Inbound",
        body: "Receive overweight container straight off the chassis at the dock.",
      },
      {
        label: "Rework",
        body: "Re-palletize, weigh, redistribute across outbound trailers to keep each axle within FHWA limits.",
      },
      {
        label: "Outbound",
        body: "Tendered as legal-weight loads with weight tickets and BOLs ready for the driver.",
      },
    ],
  },
  {
    id: "drayage",
    title: "Drayage",
    eyebrow: "Port of Charleston",
    intro:
      "Short-haul container moves between the SC Ports Authority terminals and our facility (or yours). Low-mileage runs from Wando Welch, North Charleston Terminal, and Hugh K. Leatherman keep per-container drayage cost down.",
    highlights: [
      {
        label: "Wando Welch",
        body: "~16–24 miles from our facilities.",
      },
      {
        label: "North Charleston Terminal",
        body: "~7–14 miles from our facilities.",
      },
      {
        label: "Hugh K. Leatherman",
        body: "~6–14 miles from our facilities.",
      },
    ],
  },
  {
    id: "cross-dock",
    title: "Cross-dock",
    eyebrow: "In, sorted, out",
    intro:
      "Receive freight on one dock, sort it, and tender it back out the other side without warehousing it in between. Right when transit time matters more than storage cost — DC bypass, tight retailer windows, time-defined consolidations.",
    highlights: [
      {
        label: "Speed",
        body: "Same-day touch when inbound and outbound windows align.",
      },
      {
        label: "Sorting",
        body: "Sort by SKU, store, route, or customer — whatever the downstream system needs.",
      },
      {
        label: "Documentation",
        body: "Pallet labels, BOLs, ASNs handed off the way the downstream WMS expects them.",
      },
    ],
  },
  {
    id: "deconsolidation",
    title: "Deconsolidation",
    eyebrow: "One in, many out",
    intro:
      "Break a single inbound container or trailer into multiple outbound shipments — by customer, by store, by region. Especially useful for importers consolidating overseas to save ocean freight, then needing the cargo split once it lands.",
    highlights: [
      {
        label: "Inbound",
        body: "Receive consolidated container at the dock with master BOL.",
      },
      {
        label: "Sort",
        body: "Pull and stage by destination using the manifest and your routing rules.",
      },
      {
        label: "Outbound",
        body: "Tender separate house BOLs / LTL pickups against each destination.",
      },
    ],
  },
  {
    id: "wms",
    title: "WMS-tracked inventory",
    eyebrow: "Real-time visibility",
    intro:
      "Inventory tracked in a real warehouse management system — receive, putaway, pick, ship — with an importer portal so you can see counts and movements without calling us. Bonded, GO, and free-cargo all tracked side-by-side under one logon.",
    highlights: [
      {
        label: "Visibility",
        body: "Live counts, lot/serial tracking where applicable, and movement history.",
      },
      {
        label: "Portal",
        body: (
          <>
            Importer portal available at{" "}
            <a
              href="https://portal.candcwarehouse.com"
              style={{ color: colors.accent, textDecoration: "underline" }}
            >
              portal.candcwarehouse.com
            </a>
            .
          </>
        ),
      },
      {
        label: "Reporting",
        body: "On-hand, aging, in/out activity, and bond status pulled on demand.",
      },
    ],
  },
  {
    id: "pick-pack",
    title: "Pick & pack",
    eyebrow: "Order fulfillment",
    intro:
      "Pull stock from rack, pack it to your spec, label it, and tender it to the carrier you choose. Built for importers who land bulk through Charleston and want order fulfillment to live in the same building, on the same WMS, as their bonded inventory.",
    highlights: [
      {
        label: "Pick types",
        body: "Each, inner, case, or pallet — picks routed off the WMS.",
      },
      {
        label: "Pack",
        body: "To your packout spec; carton or pallet, labeled to your retailer / carrier rules.",
      },
      {
        label: "Carriers",
        body: "Parcel and LTL — daily pickup windows already established with the major carriers.",
      },
    ],
  },
];

export const metadata: Metadata = {
  title: "Services",
  description:
    "Bonded storage, General Order, devanning, overweight container reworking, drayage, cross-dock, deconsolidation, WMS, and pick & pack — all run out of one Ladson, SC facility minutes from the Port of Charleston.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    type: "website",
    url: "/services",
    title: `Services · ${business.name}`,
    description:
      "Bonded, GO, devanning, overweight reworking, drayage, cross-dock, deconsolidation, WMS, pick & pack — Port of Charleston.",
  },
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section
        style={{
          padding: "88px 0 56px",
          background: "linear-gradient(180deg, #fafaf7 0%, #f3efe7 100%)",
          borderBottom: `1px solid ${colors.line}`,
        }}
      >
        <div style={container}>
          <div style={eyebrow}>What we do</div>
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
            Nine services, one warehouse, built around the Port of Charleston.
          </h1>
          <p
            style={{
              fontFamily: fonts.body,
              fontSize: 18,
              lineHeight: 1.65,
              color: colors.steel,
              marginTop: 22,
              maxWidth: 760,
            }}
          >
            C&amp;C started in {business.foundedYear} as a bonded warehouse and
            grew outward from there. Today the same crew handles bonded and GO
            cargo, devans containers by hand, reworks overweights into
            highway-legal loads, runs drayage off the SC Ports Authority
            terminals, and ships orders out of a WMS-tracked floor.
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

      {/* Body: sticky TOC + service sections */}
      <section style={{ padding: "64px 0 24px" }}>
        <div
          className="services-grid"
          style={{
            ...container,
            display: "grid",
            gridTemplateColumns: "240px 1fr",
            gap: 56,
            alignItems: "start",
          }}
        >
          {/* Sticky TOC */}
          <aside
            className="services-toc"
            aria-label="On this page"
            style={{
              position: "sticky",
              top: 88, // sit below the 64px sticky header with breathing room
              alignSelf: "start",
            }}
          >
            <div style={eyebrow}>On this page</div>
            <ol
              style={{
                listStyle: "none",
                padding: 0,
                margin: "16px 0 0",
                display: "grid",
                gap: 2,
                borderLeft: `1px solid ${colors.line}`,
              }}
            >
              {SERVICES.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="toc-link"
                    style={{
                      display: "block",
                      padding: "8px 14px",
                      fontFamily: fonts.body,
                      fontSize: 14,
                      color: colors.steel,
                      textDecoration: "none",
                      borderLeft: "2px solid transparent",
                      marginLeft: -1,
                      transition: "color 120ms ease, border-color 120ms ease",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: fonts.mono,
                        color: colors.accent,
                        marginRight: 10,
                        fontSize: 12,
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </aside>

          {/* Service sections */}
          <div style={{ display: "grid", gap: 56 }}>
            {SERVICES.map((s, i) => (
              <article
                key={s.id}
                id={s.id}
                className="service-section"
                style={{
                  scrollMarginTop: 88,
                  paddingBottom: 48,
                  borderBottom:
                    i === SERVICES.length - 1
                      ? "none"
                      : `1px solid ${colors.line}`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 14,
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      fontFamily: fonts.mono,
                      fontSize: 12,
                      color: colors.accent,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")} · {s.eyebrow}
                  </span>
                </div>
                <h2
                  style={{
                    fontFamily: fonts.heading,
                    fontSize: "clamp(26px, 3vw, 34px)",
                    fontWeight: 700,
                    marginTop: 8,
                  }}
                >
                  {s.title}
                </h2>
                <p
                  style={{
                    fontFamily: fonts.body,
                    fontSize: 16.5,
                    lineHeight: 1.65,
                    color: colors.steel,
                    marginTop: 14,
                    maxWidth: 720,
                  }}
                >
                  {s.intro}
                </p>

                <div
                  style={{
                    marginTop: 26,
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: 14,
                  }}
                  className="service-highlights"
                >
                  {s.highlights.map((h) => (
                    <div
                      key={h.label}
                      style={{
                        background: colors.paper,
                        border: `1px solid ${colors.line}`,
                        borderRadius: 12,
                        padding: 16,
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
                        {h.label}
                      </div>
                      <div
                        style={{
                          fontFamily: fonts.body,
                          fontSize: 14.5,
                          lineHeight: 1.55,
                          color: colors.ink,
                          marginTop: 6,
                        }}
                      >
                        {h.body}
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          padding: "72px 0 88px",
          background: colors.paperDeep,
          borderTop: `1px solid ${colors.line}`,
          marginTop: 32,
        }}
      >
        <div style={{ ...container, textAlign: "center" }}>
          <div style={eyebrow}>Have something coming off the water?</div>
          <h2
            style={{
              fontFamily: fonts.heading,
              fontSize: "clamp(26px, 3.2vw, 36px)",
              fontWeight: 700,
              marginTop: 10,
              maxWidth: 720,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Tell us what&rsquo;s on the BOL and we&rsquo;ll tell you the
            shortest path through Charleston.
          </h2>
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
              Start a quote
            </Link>
            <Link
              href="/about"
              className="cta-secondary"
              style={buttonSecondary}
            >
              About C&amp;C
            </Link>
          </div>

          {/* Aside fact card to anchor the page in the verifiable basics */}
          <aside
            style={{
              ...cardStyle,
              maxWidth: 640,
              margin: "44px auto 0",
              textAlign: "left",
            }}
          >
            <div style={eyebrow}>The basics</div>
            <dl
              style={{
                marginTop: 18,
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                rowGap: 16,
                columnGap: 18,
                marginBlockEnd: 0,
              }}
            >
              <Fact label="Founded" value={`${business.foundedYear}`} />
              <Fact label="Ownership" value="Family-run" />
              <Fact
                label="Location"
                value={`${business.city}, ${business.state}`}
              />
              <Fact label="CBP status" value="Class 3 Bonded" />
              <Fact label="GO facility" value="CBP-designated" />
              <Fact
                label="Team experience"
                value={`${business.teamExperienceYears}+ yrs combined`}
              />
            </dl>
          </aside>
        </div>
      </section>
    </>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt
        style={{
          fontFamily: fonts.mono,
          fontSize: 11,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: colors.steel,
        }}
      >
        {label}
      </dt>
      <dd
        style={{
          fontFamily: fonts.heading,
          fontSize: 17,
          fontWeight: 600,
          color: colors.ink,
          marginTop: 4,
          marginLeft: 0,
        }}
      >
        {value}
      </dd>
    </div>
  );
}
