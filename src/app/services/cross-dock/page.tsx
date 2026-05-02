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
// /services/devanning, /services/overweight-reworking, and
// /services/drayage so missing data stays loud and is trivial to
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

// Fifth dedicated service sub-page. Mirrors the cross-dock section on
// /services but expanded into a full page with its own H1, deeper
// metadata, a step-by-step process, "when to use it" reasons, capacity
// detail, and FAQ. Cross-dock is the speed-of-handoff service — when
// transit time matters more than storage cost. Pairs naturally with
// drayage on the inbound side and pick-pack / parcel on the outbound.

export const metadata: Metadata = {
  title:
    "Cross-Dock Services near Port of Charleston | Same-Day Sort & Tender",
  description:
    "Same-day cross-dock at the C&C Warehouse facility in Ladson, SC. Receive on one dock, sort by SKU / store / route, and tender out the other side without warehousing — for retail compliance windows, DC bypass, and time-defined consolidations.",
  alternates: {
    canonical: "/services/cross-dock",
  },
  openGraph: {
    type: "website",
    url: "/services/cross-dock",
    title: `Cross-Dock Services · ${business.name}`,
    description:
      "Same-day receive, sort, and tender at the C&C bonded warehouse near the Port of Charleston — built for retailer windows, ASN-driven outbounds, and DC-bypass moves.",
  },
};

const STEPS: { n: string; title: string; body: string }[] = [
  {
    n: "01",
    title: "Pre-receipt + dock plan",
    body: "Before the inbound arrives, we ingest the ASN or load list and sketch the dock plan — which inbound door it lands on, which outbound doors the sort flows toward, and which carriers are scheduled to pull when. The cargo is staged for movement, not for storage.",
  },
  {
    n: "02",
    title: "Receive + count",
    body: "Inbound is unloaded onto a striped staging zone, piece-counted (or pallet-counted, depending on the format) against the ASN, and any short / over / damage is flagged immediately — before the cargo gets blended into the sort.",
  },
  {
    n: "03",
    title: "Sort to outbound",
    body: "Cargo is sorted live to the destination criteria — by SKU, by store, by route, by customer, by retailer DC — labeled to the downstream WMS's spec, and walked across the dock to the outbound staging lane for the carrier that's pulling it.",
  },
  {
    n: "04",
    title: "Tender + ASN out",
    body: "Outbound carrier checks in, we generate the BOLs, fire the outbound ASN to the receiving DC, and the load leaves. Cargo touches our floor, but it doesn't dwell — clock starts at the inbound gate, ends at the outbound seal.",
  },
];

const WHEN_TO_USE: { label: string; body: string }[] = [
  {
    label: "Retailer compliance windows",
    body: "When the receiving big-box DC has a tight delivery window and the inbound from the port doesn't line up cleanly, cross-dock turns one big inbound into several appointment-perfect outbounds without paying for storage in between.",
  },
  {
    label: "DC bypass",
    body: "Cargo is already destined for known stores or regional DCs — sending it through your own warehouse first just adds touches. Cross-dock at the port instead, and outbound straight to the final stop.",
  },
  {
    label: "Time-defined consolidations",
    body: "Multiple inbounds (LCL, less-than-truckload, parcel, container loads) need to be combined into one outbound load by a specific time. We hold the dock plan open until the last piece arrives, then sort and tender as a single move.",
  },
  {
    label: "Port-direct devan + cross-dock",
    body: "Container off the chassis, devanned on the dock, and the freight moves straight to outbound staging — no put-away, no rack pull, no second touch. Pairs naturally with the same-crew drayage and devan pattern.",
  },
];

const FAQ: { q: string; a: React.ReactNode }[] = [
  {
    q: "What is cross-docking?",
    a: (
      <>
        Cross-docking is when freight comes in on one dock, gets sorted
        and immediately tendered back out on another dock — without
        being put away into rack storage in between. The cargo touches
        the warehouse floor, but it doesn&rsquo;t dwell. It&rsquo;s
        the right shape when transit time matters more than storage
        cost.
      </>
    ),
  },
  {
    q: "How fast can you turn a cross-dock?",
    a: (
      <>
        Same-day when the inbound and outbound windows align — the
        cargo is in the door, sorted, and out again before the next
        shift. When the outbound carrier doesn&rsquo;t pull until the
        following day we stage on the floor (not in rack) and tender at
        the booked appointment. Peak throughput is{" "}
        <span style={placeholder}>X loads/day TK</span>.
      </>
    ),
  },
  {
    q: "What sort criteria can you handle?",
    a: (
      <>
        By SKU, by store, by route, by customer, by retailer DC, or
        any combination — whatever the downstream system needs to
        receive cleanly. Pallet labels, carton labels, and BOLs come
        out in the format your receiving WMS expects, and ASNs fire to
        the receiving DC at tender so the dock door knows what&rsquo;s
        on the way.
      </>
    ),
  },
  {
    q: "Can the cargo come in by container and go out by truck?",
    a: (
      <>
        Yes — that&rsquo;s the most common shape. Container is{" "}
        <Link
          href="/services/drayage"
          style={{ color: colors.accent, textDecoration: "underline" }}
        >
          drayed
        </Link>{" "}
        from Wando Welch, NCT, or Leatherman, hand-unloaded at the dock
        (see{" "}
        <Link
          href="/services/devanning"
          style={{ color: colors.accent, textDecoration: "underline" }}
        >
          devanning
        </Link>
        ), and the freight moves directly to outbound staging for the
        carriers pulling that day. One handoff instead of three.
      </>
    ),
  },
  {
    q: "Can you handle retailer-compliant labeling and ASNs?",
    a: (
      <>
        Yes. We work to the receiving party&rsquo;s routing guide —
        UCC-128 / GS1-128 case labels, pallet placards, ASN (EDI 856)
        firing to the receiving DC at tender, and BOLs in the format
        the carrier and the receiver expect. If your retailer has a
        specific compliance manual, share it before the first load and
        we&rsquo;ll build the dock plan against it.
      </>
    ),
  },
  {
    q: "Can cross-dock cargo stay in bond?",
    a: (
      <>
        Yes — when the inbound is in-bond and the outbound is also a
        bonded move (e.g. headed to another bonded facility or for
        re-export), we can cross-dock under bond without breaking the
        status. See{" "}
        <Link
          href="/services/bonded-storage"
          style={{ color: colors.accent, textDecoration: "underline" }}
        >
          bonded storage
        </Link>{" "}
        for what determines whether bond carries through versus needing
        a formal entry at receipt.
      </>
    ),
  },
];

export default function CrossDockPage() {
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
            <span style={{ color: colors.accent }}>Cross-dock</span>
          </nav>

          <div style={eyebrow}>Cross-dock services</div>
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
            In one dock, sorted on the floor,
            <br />
            out the other side same day.
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
            Same-day cross-dock at our Ladson, SC facility — receive,
            sort, and tender freight back out without warehousing it in
            between. Built for retail compliance windows, DC-bypass
            moves, and time-defined consolidations near the Port of
            Charleston since {business.foundedYear}.
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
            <FactCard label="Turn time" value="Same-day when windows align" />
            <FactCard label="Sort criteria" value="SKU · store · route · DC" />
            <FactCard label="Documentation" value="Labels · BOLs · ASNs" />
            <FactCard label="Bond status" value="Carries through when both legs are bonded" />
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
            From inbound gate to outbound seal in four steps.
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
            Cross-dock isn&rsquo;t put-away in a hurry — it&rsquo;s a
            different dock plan from the start. Cargo is staged for
            movement, sort criteria are loaded before the inbound
            arrives, and the outbound carriers are sequenced against
            the sort.
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
          <div style={eyebrow}>When cross-dock earns its keep</div>
          <h2
            style={{
              fontFamily: fonts.heading,
              fontSize: "clamp(26px, 3vw, 34px)",
              fontWeight: 700,
              marginTop: 10,
              maxWidth: 720,
            }}
          >
            Four situations where the no-storage shape pays off.
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
            What you get when you cross-dock with us.
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
                  Peak cross-dock throughput at the Ladson facility:{" "}
                  <span style={placeholder}>X loads/day TK</span> across
                  inbound + outbound. Door count and dock space scale
                  with the schedule — share the volume profile and we
                  plan the dock plan to it.
                </>
              }
            />
            <CapCard
              label="Sort criteria"
              body="By SKU, by store, by route, by customer, by retailer DC. Mix as needed — the same load can split into store-level pallets for retail and route-level pallets for the rest."
            />
            <CapCard
              label="Labeling + BOLs"
              body="UCC-128 / GS1-128 case labels, pallet placards, retailer-compliant pallet build, and BOLs in the format the carrier and the receiver expect. Routing guides honored."
            />
            <CapCard
              label="ASN out"
              body="Outbound ASN (EDI 856) fired to the receiving DC at tender so the dock door knows what's on the way. EDI handled through your trading-partner setup or a third-party translator if you don't have one."
            />
            <CapCard
              label="Port-direct flow"
              body={
                <>
                  Cross-dock pairs naturally with{" "}
                  <Link
                    href="/services/drayage"
                    style={{
                      color: colors.accent,
                      textDecoration: "underline",
                    }}
                  >
                    drayage
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/services/devanning"
                    style={{
                      color: colors.accent,
                      textDecoration: "underline",
                    }}
                  >
                    devanning
                  </Link>{" "}
                  — container off the chassis, hand-unloaded on the
                  dock, sorted to outbound staging, gone same day.
                </>
              }
            />
            <CapCard
              label="Cargo insurance"
              body={
                <>
                  Warehouse legal liability and cargo coverage on
                  freight while it&rsquo;s on the dock — limits at{" "}
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
            Questions importers and retail vendors usually ask first.
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
          <div style={eyebrow}>Tight retailer window or a port-direct flow?</div>
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
            Send the routing guide, the inbound shape, and the
            outbound destinations — we&rsquo;ll quote the dock plan.
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
