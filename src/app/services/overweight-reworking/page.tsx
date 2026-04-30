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
} from "../../components/styles";

// Marker style for facts Greg still needs to confirm. Mirrors the
// dashed-orange chip used on /about, /services, /services/bonded-storage,
// and /services/devanning so missing data stays loud and is trivial to
// find-and-replace later.
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

// Third dedicated service sub-page. Mirrors the overweight-reworking
// section on /services but expanded into a full page with its own H1,
// deeper metadata, a step-by-step process, "when to use it" reasons,
// capacity detail, and FAQ. Overweight rework is a differentiator that
// many 3PLs send back to the port — leaning into it on the SEO side.

export const metadata: Metadata = {
  title:
    "Overweight Container Reworking | Highway-Legal Redistribution near Port of Charleston",
  description:
    "Overweight ocean containers split, re-palletized, and redistributed across legal-weight outbound loads at C&C Warehouse in Ladson, SC. Weight tickets and BOLs in hand — minutes from the Port of Charleston.",
  alternates: {
    canonical: "/services/overweight-reworking",
  },
  openGraph: {
    type: "website",
    url: "/services/overweight-reworking",
    title: `Overweight Container Reworking · ${business.name}`,
    description:
      "Split, re-palletize, and redistribute overweight ocean containers into FHWA legal-weight outbound loads — with certified weight tickets and BOLs ready for the driver.",
  },
};

const STEPS: { n: string; title: string; body: string }[] = [
  {
    n: "01",
    title: "Container drays straight to our dock",
    body: "We pull the overweight container from Wando Welch, NCT, or Leatherman on a heavy-haul chassis and bring it directly to one of our dock doors — no intermediate yard stop where it can age and accrue per diem.",
  },
  {
    n: "02",
    title: "Plan the redistribution",
    body: "Crew checks the container weight, the cargo manifest, and the outbound destinations. We work backward from US highway limits — 80,000 lb gross, 34,000 lb tandem — to lay out how many outbound loads it splits across.",
  },
  {
    n: "03",
    title: "Hand-unload, re-palletize, weigh",
    body: "Cargo comes off piece by piece, gets re-palletized to the redistribution plan, and each outbound pallet or load is weighed on a certified scale. Any in-transit damage is photographed at the same time the count is reconciled to the BOL.",
  },
  {
    n: "04",
    title: "Tender legal-weight outbound",
    body: "Each split load goes out as a separately-tendered legal-weight shipment with its own weight ticket and BOL. The driver leaves the dock already in compliance with no permit needed.",
  },
];

const WHEN_TO_USE: { label: string; body: string }[] = [
  {
    label: "Heavy commodities",
    body: "Steel coils, tile, stone, ceramics, beverages, brake parts, machined castings — anything where a fully-loaded ocean container blows past 44,000 lb of cargo and lands the rig over US highway gross.",
  },
  {
    label: "Destinations that won't take permits",
    body: "Plenty of inland DCs and big-box receivers refuse overweight permits at the gate. Splitting the load at the port-adjacent rework facility avoids a turnaround later in the lane.",
  },
  {
    label: "Multi-stop outbound consolidation",
    body: "When the container's contents are bound for several inland destinations, redistributing them across legal-weight outbound trailers at devan saves a second touch downstream.",
  },
  {
    label: "Avoid permit fees + escort costs",
    body: "Overweight permits, route restrictions, and escort costs add up across a multi-state lane. A one-time rework at C&C usually pencils out cheaper than permit-and-escort over the road.",
  },
];

const FAQ: { q: string; a: React.ReactNode }[] = [
  {
    q: "What is overweight container reworking?",
    a: (
      <>
        It&rsquo;s the process of taking an ocean container that&rsquo;s
        too heavy to move legally on US highways, hand-unloading it, and
        redistributing the cargo across two or more outbound truckloads
        that each comply with FHWA gross- and axle-weight limits. We do
        the unload, the re-palletization, the weighing, and the tendering
        in one stop at our Ladson, SC dock.
      </>
    ),
  },
  {
    q: "What's a legal weight in the US?",
    a: (
      <>
        On the federal Interstate System, the limits are 80,000 lb gross
        vehicle weight, 20,000 lb on a single axle, and 34,000 lb on a
        tandem. State and local roads can be tighter. We plan
        redistributions to the federal limits and pull tighter where the
        outbound lane requires it.
      </>
    ),
  },
  {
    q: "Can you handle heavy commodities like steel, tile, or stone?",
    a: (
      <>
        Yes — heavy commodities are the typical use case. We have the
        forklift capacity, the floor loading, and the dock height to
        receive and re-palletize dense cargo straight off the chassis.
        If you&rsquo;re not sure whether your cargo fits, call and
        we&rsquo;ll tell you straight.
      </>
    ),
  },
  {
    q: "Do you provide weight tickets?",
    a: (
      <>
        Yes. Every outbound load leaves with a certified weight ticket
        and a BOL that match. The driver has documentation in hand at
        the dock — no &ldquo;run it past the scale on your way out and
        hope&rdquo; situations.
      </>
    ),
  },
  {
    q: "Can the cargo stay bonded during rework?",
    a: (
      <>
        Yes. We&rsquo;re a CBP-designated Class 3 bonded warehouse, so
        an overweight rework can happen under bond without breaking the
        bond status. See{" "}
        <Link
          href="/services/bonded-storage"
          style={{ color: colors.accent, textDecoration: "underline" }}
        >
          bonded storage
        </Link>{" "}
        for the full picture, and{" "}
        <Link
          href="/services/devanning"
          style={{ color: colors.accent, textDecoration: "underline" }}
        >
          devanning
        </Link>{" "}
        for the unload-and-audit pattern that overweight rework
        builds on.
      </>
    ),
  },
  {
    q: "How fast can you turn an overweight container?",
    a: (
      <>
        Most reworks finish inside a single shift once the container
        is on our dock. The driving variables are how the cargo was
        loaded (palletized vs. floor-loaded), how dense it is, and how
        many outbound legal-weight loads it splits across. We&rsquo;ll
        scope the timing on the quote so the outbound carrier can be
        booked accordingly.
      </>
    ),
  },
];

export default function OverweightReworkingPage() {
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
          {/* Breadcrumb */}
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
            <Link
              href="/services"
              style={{ color: colors.steel, textDecoration: "none" }}
            >
              Services
            </Link>
            <span style={{ margin: "0 10px", color: colors.line }}>/</span>
            <span style={{ color: colors.accent }}>Overweight reworking</span>
          </nav>

          <div style={eyebrow}>Highway-legal redistribution</div>
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
            Overweight in. Legal-weight out.
            <br />
            Weight tickets in hand at the dock.
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
            We split overweight ocean containers across legal-weight
            outbound loads — re-palletized, weighed on a certified scale,
            and tendered with BOLs and weight tickets ready for the
            driver. One of the things C&amp;C is best known for, since{" "}
            {business.foundedYear}.
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

      {/* The basics — fact strip */}
      <section style={{ padding: "48px 0 16px" }}>
        <div style={container}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 18,
            }}
          >
            <FactCard label="Method" value="Hand-unload, redistribute" />
            <FactCard label="Target" value="FHWA legal-weight outbound" />
            <FactCard
              label="Documentation"
              value="Certified weight tickets + BOLs"
            />
            <FactCard
              label="Bonded capable"
              value="Class 3 — rework under bond"
            />
          </div>
        </div>
      </section>

      {/* How it works — 4-step sequence */}
      <section style={{ padding: "56px 0" }}>
        <div style={container}>
          <div style={eyebrow}>How it works</div>
          <h2
            style={{
              fontFamily: fonts.heading,
              fontSize: "clamp(26px, 3vw, 34px)",
              fontWeight: 700,
              marginTop: 10,
              maxWidth: 720,
            }}
          >
            From overweight chassis to legal-weight outbound.
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
            Same crew handles drayage, devan, rework, and outbound
            tender — so the count, the weight tickets, and the
            chain-of-custody documentation come from one party, not
            three handoffs.
          </p>

          <ol
            style={{
              listStyle: "none",
              padding: 0,
              margin: "32px 0 0",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 18,
            }}
          >
            {STEPS.map((s) => (
              <li
                key={s.n}
                style={{
                  background: colors.paper,
                  border: `1px solid ${colors.line}`,
                  borderRadius: 12,
                  padding: 22,
                }}
              >
                <div
                  style={{
                    fontFamily: fonts.mono,
                    fontSize: 12,
                    color: colors.accent,
                    letterSpacing: "0.16em",
                  }}
                >
                  STEP {s.n}
                </div>
                <h3
                  style={{
                    fontFamily: fonts.heading,
                    fontSize: 19,
                    fontWeight: 600,
                    marginTop: 8,
                    color: colors.ink,
                  }}
                >
                  {s.title}
                </h3>
                <p
                  style={{
                    fontFamily: fonts.body,
                    fontSize: 14.5,
                    lineHeight: 1.6,
                    color: colors.steel,
                    marginTop: 10,
                  }}
                >
                  {s.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* When to use it */}
      <section
        style={{
          padding: "56px 0",
          background: colors.paperDeep,
          borderTop: `1px solid ${colors.line}`,
          borderBottom: `1px solid ${colors.line}`,
        }}
      >
        <div style={container}>
          <div style={eyebrow}>When overweight rework earns its keep</div>
          <h2
            style={{
              fontFamily: fonts.heading,
              fontSize: "clamp(26px, 3vw, 34px)",
              fontWeight: 700,
              marginTop: 10,
              maxWidth: 720,
            }}
          >
            Four situations where redistributing at the port pays off.
          </h2>

          <div
            style={{
              marginTop: 28,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 18,
            }}
          >
            {WHEN_TO_USE.map((w) => (
              <div
                key={w.label}
                style={{
                  background: colors.paper,
                  border: `1px solid ${colors.line}`,
                  borderRadius: 12,
                  padding: 20,
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
                  {w.label}
                </div>
                <p
                  style={{
                    fontFamily: fonts.body,
                    fontSize: 15,
                    lineHeight: 1.6,
                    color: colors.ink,
                    marginTop: 8,
                  }}
                >
                  {w.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capacity / what we offer */}
      <section style={{ padding: "56px 0" }}>
        <div style={container}>
          <div style={eyebrow}>Capacity & coverage</div>
          <h2
            style={{
              fontFamily: fonts.heading,
              fontSize: "clamp(26px, 3vw, 34px)",
              fontWeight: 700,
              marginTop: 10,
              maxWidth: 720,
            }}
          >
            What you get when you rework with us.
          </h2>

          <div
            style={{
              marginTop: 28,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 18,
            }}
          >
            <CapCard
              label="Throughput"
              body={
                <>
                  <span style={placeholder}>XX overweight containers/day TK</span>{" "}
                  at peak. Most reworks finish inside one shift, dependent
                  on cargo density and the outbound split count.
                </>
              }
            />
            <CapCard
              label="Weight documentation"
              body="Certified scale on site. Every outbound load leaves with a weight ticket and a BOL that match — driver has compliance documentation in hand before pulling away from the dock."
            />
            <CapCard
              label="Re-palletization"
              body="Pallets, slip-sheets, banding, shrink-wrap, corner board, edge protection — outbound presentation built to the carrier's tender requirements, not just the legal weight target."
            />
            <CapCard
              label="Drayage included"
              body="Direct moves from SC Ports Authority terminals (Wando Welch, NCT, Leatherman) on heavy-haul chassis so the container only changes hands once."
            />
            <CapCard
              label="Bonded-floor capable"
              body={
                <>
                  Rework under bond without breaking the bond status — see{" "}
                  <Link
                    href="/services/bonded-storage"
                    style={{
                      color: colors.accent,
                      textDecoration: "underline",
                    }}
                  >
                    bonded storage
                  </Link>{" "}
                  for the full picture.
                </>
              }
            />
            <CapCard
              label="Cargo insurance"
              body={
                <>
                  Warehouse legal liability and cargo coverage on stored
                  inventory once it&rsquo;s off the container — limits at{" "}
                  <span style={placeholder}>$X,XXX,XXX TK</span>.
                </>
              }
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        style={{
          padding: "56px 0 72px",
          background: colors.paperDeep,
          borderTop: `1px solid ${colors.line}`,
        }}
      >
        <div style={container}>
          <div style={eyebrow}>FAQ</div>
          <h2
            style={{
              fontFamily: fonts.heading,
              fontSize: "clamp(26px, 3vw, 34px)",
              fontWeight: 700,
              marginTop: 10,
              maxWidth: 720,
            }}
          >
            Questions importers usually ask first.
          </h2>

          <div
            style={{
              marginTop: 28,
              display: "grid",
              gap: 14,
              maxWidth: 880,
            }}
          >
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
                <div
                  style={{
                    fontFamily: fonts.body,
                    fontSize: 15,
                    lineHeight: 1.65,
                    color: colors.steel,
                    marginTop: 12,
                  }}
                >
                  {f.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        style={{
          padding: "72px 0 88px",
          background: colors.paper,
          borderTop: `1px solid ${colors.line}`,
        }}
      >
        <div style={{ ...container, textAlign: "center" }}>
          <div style={eyebrow}>Overweight container coming in?</div>
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
            Send us the BOL, weight, and outbound destinations —
            we&rsquo;ll quote the rework end-to-end.
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
              href="/services"
              className="cta-secondary"
              style={buttonSecondary}
            >
              All services
            </Link>
          </div>

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

function FactCard({ label, value }: { label: string; value: string }) {
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

function CapCard({
  label,
  body,
}: {
  label: string;
  body: React.ReactNode;
}) {
  return (
    <div
      style={{
        background: colors.paper,
        border: `1px solid ${colors.line}`,
        borderRadius: 12,
        padding: 20,
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
          fontFamily: fonts.body,
          fontSize: 15,
          lineHeight: 1.6,
          color: colors.ink,
          marginTop: 8,
        }}
      >
        {body}
      </div>
    </div>
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
