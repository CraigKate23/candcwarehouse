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
// /services/devanning, and /services/overweight-reworking so missing
// data stays loud and is trivial to find-and-replace later.
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

// Fourth dedicated service sub-page. Mirrors the drayage section on
// /services but expanded into a full page with its own H1, deeper
// metadata, a step-by-step process, "when to use it" reasons, capacity
// detail, and FAQ. Drayage is the connective tissue between the SC
// Ports Authority terminals and the bonded floor — and the first
// service where the per-terminal mile placeholders on /services would
// get filled in once Greg confirms the numbers.

export const metadata: Metadata = {
  title:
    "Port of Charleston Drayage | Container Moves from Wando Welch, NCT, and Leatherman",
  description:
    "Short-haul container drayage between the SC Ports Authority terminals (Wando Welch, NCT, Hugh K. Leatherman) and the C&C Warehouse bonded floor in Ladson, SC. In-bond capable, per-diem aware, same crew unloads at the dock.",
  alternates: {
    canonical: "/services/drayage",
  },
  openGraph: {
    type: "website",
    url: "/services/drayage",
    title: `Port of Charleston Drayage · ${business.name}`,
    description:
      "Short-haul container moves between Wando Welch, NCT, and Leatherman and the C&C bonded warehouse — in-bond capable, heavy-haul chassis available, devan ready at the dock.",
  },
};

const STEPS: { n: string; title: string; body: string }[] = [
  {
    n: "01",
    title: "Booking + terminal appointment",
    body: "Once the container is available at the SC Ports Authority terminal, we book the appointment, line up the right chassis (standard, tri-axle, or heavy-haul), and dispatch the move so the cargo doesn't sit accruing per diem or demurrage.",
  },
  {
    n: "02",
    title: "Terminal pickup",
    body: "Driver pulls off the stack at Wando Welch, NCT, or Leatherman, takes possession of the container, and confirms the seal is intact before leaving the gate. Any seal anomaly is photographed and reported before transit, not after.",
  },
  {
    n: "03",
    title: "Short-haul to the dock",
    body: "Container moves directly to one of our dock doors in Ladson, SC. Same crew that drove it can hand it straight to devan — no intermediate yard, no second handoff, no hours of dwell on a chassis you're paying per-diem on.",
  },
  {
    n: "04",
    title: "Empty return + chassis split",
    body: "After the container is unloaded — whether that's same-day devan, bonded receipt, or staged for a later pull — we coordinate the empty return and chassis split back to the originating terminal so the loop closes cleanly.",
  },
];

const WHEN_TO_USE: { label: string; body: string }[] = [
  {
    label: "Port-direct devan",
    body: "When the cargo is going to be unloaded right off the chassis — devan, audit, or rework — drayage and devan from the same dock and same crew avoids the cost and exposure of a second move.",
  },
  {
    label: "In-bond moves",
    body: "Cargo moving from the port to a bonded warehouse without entering US commerce yet — we run drayage as an in-bond move under CBP procedures so the bond status carries through to the bonded floor.",
  },
  {
    label: "Per-diem / demurrage pressure",
    body: "When the free-time clock is ticking and the receiving DC can't take the load yet, pulling the container off the terminal and onto our paper avoids per-diem and demurrage piling up at the steamship line's rate.",
  },
  {
    label: "Overweight or reefer",
    body: "Heavy-haul chassis for overweight ocean containers, reefer-capable for temperature-controlled cargo. The right equipment shows up at the terminal so the move doesn't get refused at the gate.",
  },
];

const FAQ: { q: string; a: React.ReactNode }[] = [
  {
    q: "What is drayage?",
    a: (
      <>
        Drayage is the short-haul truck move between an ocean container
        terminal and a nearby destination — typically a warehouse, a
        rail ramp, or an inland DC. It&rsquo;s a separate leg from the
        long-haul outbound. We handle the port-to-warehouse leg out of
        the SC Ports Authority terminals into our Ladson, SC facility.
      </>
    ),
  },
  {
    q: "How far is your facility from the terminals?",
    a: (
      <>
        We&rsquo;re in Ladson, SC, minutes from all three SC Ports
        Authority container terminals. Approximate drive distances:
        Wando Welch <span style={placeholder}>~XX miles TK</span>,
        North Charleston Terminal{" "}
        <span style={placeholder}>~XX miles TK</span>, and Hugh K.
        Leatherman <span style={placeholder}>~XX miles TK</span>. The
        short distances keep per-container drayage cost down vs. inland
        DCs that have to drag containers across the metro.
      </>
    ),
  },
  {
    q: "Can you handle in-bond moves?",
    a: (
      <>
        Yes. We&rsquo;re a CBP-designated Class 3 bonded warehouse, so
        we can take an in-bond container off the terminal under bond and
        receive it onto the bonded floor without breaking the bond
        status. See{" "}
        <Link
          href="/services/bonded-storage"
          style={{ color: colors.accent, textDecoration: "underline" }}
        >
          bonded storage
        </Link>{" "}
        for what happens once the cargo is on our floor.
      </>
    ),
  },
  {
    q: "What container types do you handle?",
    a: (
      <>
        Standard 20&prime;, 40&prime;, 40&prime; high-cube, and 45&prime;
        ocean containers, plus reefer (refrigerated) and flat-rack /
        open-top equipment. Overweight ocean containers are handled on
        heavy-haul chassis — see{" "}
        <Link
          href="/services/overweight-reworking"
          style={{ color: colors.accent, textDecoration: "underline" }}
        >
          overweight reworking
        </Link>{" "}
        for the unload-and-redistribute pattern that pairs with
        overweight drayage.
      </>
    ),
  },
  {
    q: "Do you provide chassis?",
    a: (
      <>
        Yes — we coordinate chassis through the standard pool providers
        (CCM, Direct, TRAC) plus heavy-haul chassis for overweight
        ocean containers. Chassis split-and-return back to the
        originating terminal is part of the drayage scope, not a
        separate add-on.
      </>
    ),
  },
  {
    q: "Can you handle overweight containers?",
    a: (
      <>
        Yes. The drayage move runs on a heavy-haul chassis under permit
        from the terminal straight to our dock. Once the container is
        on the floor, we hand-unload and redistribute the cargo across
        legal-weight outbound loads — see{" "}
        <Link
          href="/services/overweight-reworking"
          style={{ color: colors.accent, textDecoration: "underline" }}
        >
          overweight reworking
        </Link>{" "}
        for the full process and{" "}
        <Link
          href="/services/devanning"
          style={{ color: colors.accent, textDecoration: "underline" }}
        >
          devanning
        </Link>{" "}
        for the unload-and-audit pattern.
      </>
    ),
  },
];

export default function DrayagePage() {
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
            <span style={{ color: colors.accent }}>Drayage</span>
          </nav>

          <div style={eyebrow}>Port of Charleston drayage</div>
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
            Off the terminal, onto our dock,
            <br />
            in one short hop.
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
            Short-haul container drayage between Wando Welch, North
            Charleston Terminal, Hugh K. Leatherman, and our bonded
            warehouse in Ladson, SC. In-bond capable, heavy-haul
            chassis on call, same crew unloads at the dock — since{" "}
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
            <FactCard label="Origin" value="Wando Welch · NCT · Leatherman" />
            <FactCard label="Equipment" value="Standard, tri-axle, heavy-haul" />
            <FactCard label="Containers" value="20′ · 40′ · 45′ · HC · Reefer" />
            <FactCard label="In-bond" value="Class 3 — bond carries through" />
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
            From the terminal stack to our dock door.
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
            Same crew that drays the container can devan, audit, or
            rework it once it&rsquo;s on the dock — so the seal record,
            the count, and the chain of custody come from one party,
            not three handoffs.
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
          <div style={eyebrow}>When port-direct drayage earns its keep</div>
          <h2
            style={{
              fontFamily: fonts.heading,
              fontSize: "clamp(26px, 3vw, 34px)",
              fontWeight: 700,
              marginTop: 10,
              maxWidth: 720,
            }}
          >
            Four situations where the short hop pays off.
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
            What you get when you dray with us.
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
              label="Terminal coverage"
              body={
                <>
                  All three SC Ports Authority container terminals —
                  Wando Welch, North Charleston Terminal, and Hugh K.
                  Leatherman. Approximate distances from C&amp;C:{" "}
                  <span style={placeholder}>XX / XX / XX miles TK</span>.
                </>
              }
            />
            <CapCard
              label="Chassis options"
              body="Standard 20′/40′ chassis, tri-axles for overweight redistribution, heavy-haul chassis for overweight ocean containers, reefer-capable equipment for temperature-controlled cargo."
            />
            <CapCard
              label="Container types"
              body="Standard 20′ / 40′ / 45′ / high-cube, reefer (refrigerated), flat-rack and open-top — same dispatch desk handles all of it."
            />
            <CapCard
              label="In-bond capable"
              body={
                <>
                  In-bond moves direct from the terminal to our bonded
                  floor under CBP procedures — see{" "}
                  <Link
                    href="/services/bonded-storage"
                    style={{
                      color: colors.accent,
                      textDecoration: "underline",
                    }}
                  >
                    bonded storage
                  </Link>{" "}
                  for what happens once cargo arrives.
                </>
              }
            />
            <CapCard
              label="Per-diem mitigation"
              body="When free time is running out, pulling the container off the terminal onto our paper stops the steamship-line per-diem clock — your cargo can then sit on our bonded or general floor at a known per-day rate while you sort destinations."
            />
            <CapCard
              label="Cargo insurance"
              body={
                <>
                  Warehouse legal liability and cargo coverage on stored
                  inventory once it&rsquo;s off the chassis — limits at{" "}
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
          <div style={eyebrow}>Container coming into Charleston?</div>
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
            Send the booking, vessel ETA, and destination —
            we&rsquo;ll quote drayage end-to-end.
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
