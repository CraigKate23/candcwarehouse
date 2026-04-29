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
// dashed-orange chip used on /about, /services, and /services/bonded-storage
// so missing data stays loud and is trivial to find-and-replace later.
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

// Second dedicated service sub-page. Mirrors the devanning section on
// /services but expanded into a full page with its own H1, deeper
// metadata, a step-by-step process, "when to use it" reasons, capacity
// detail, and FAQ. Devanning is one of the things C&C is best known for —
// piece-count audits and damage documentation on hand-unloaded containers.

export const metadata: Metadata = {
  title:
    "Container Devanning | Hand-Unload & Piece-Count Audit near Port of Charleston",
  description:
    "Hand-unload containers piece-by-piece at C&C Warehouse in Ladson, SC. Documented piece counts, photographed exceptions, and damage notes against your bill of lading — minutes from the Port of Charleston.",
  alternates: {
    canonical: "/services/devanning",
  },
  openGraph: {
    type: "website",
    url: "/services/devanning",
    title: `Container Devanning · ${business.name}`,
    description:
      "Piece-by-piece container unload with documented counts, damage notes, and photographed exceptions — minutes from the Port of Charleston.",
  },
};

const STEPS: { n: string; title: string; body: string }[] = [
  {
    n: "01",
    title: "Container delivered to dock",
    body: "We dray the container straight from Wando Welch, NCT, or Leatherman to one of our dock doors. The container is sealed, photographed, and the seal number recorded against the BOL before it's broken.",
  },
  {
    n: "02",
    title: "Hand-unload, piece by piece",
    body: "Crew unloads floor-loaded or palletized cargo by hand. Each carton, drum, or piece is counted as it crosses the dock — no shortcut tallies from a packing list.",
  },
  {
    n: "03",
    title: "Audit against the BOL",
    body: "Counts are reconciled in real time against the bill of lading. Shortages, overages, mis-marks, and damaged pieces are flagged, photographed, and noted on the unload report.",
  },
  {
    n: "04",
    title: "Disposition",
    body: "Cargo is staged to rack, cross-docked to your outbound carrier, or palletized per your SOP. The signed piece-count tally and exception photos go to you the same day.",
  },
];

const WHEN_TO_USE: { label: string; body: string }[] = [
  {
    label: "Floor-loaded containers",
    body: "Cargo loaded loose to maximize cube — cartons stacked floor-to-ceiling — has to come out by hand. We're set up for it as a routine, not a one-off.",
  },
  {
    label: "BOL needs verification",
    body: "When the count on the bill of lading is the count of record for customs, claims, or downstream invoicing, a documented piece-count audit at devan is the right place to catch a discrepancy.",
  },
  {
    label: "Damage / claims exposure",
    body: "If there's any chance the cargo arrived damaged, photographed exceptions at devan are the cleanest evidence for a carrier or insurance claim. Catching it later is harder.",
  },
  {
    label: "Mixed-SKU consolidations",
    body: "Multi-SKU or multi-PO containers benefit from a sort-as-you-unload pass so each SKU lands on its own pallet (or rack location) instead of being broken back out later.",
  },
];

const FAQ: { q: string; a: React.ReactNode }[] = [
  {
    q: "What does devanning mean?",
    a: (
      <>
        Devanning (sometimes called &ldquo;stripping&rdquo; or
        &ldquo;destuffing&rdquo;) is the process of unloading cargo from an
        ocean container at a warehouse rather than at the port terminal. At
        C&amp;C, devanning specifically means a hand-unload with a piece-count
        audit and exception documentation against the bill of lading.
      </>
    ),
  },
  {
    q: "How long does it take to devan a container?",
    a: (
      <>
        It depends on how the container was loaded. A palletized, slip-sheet,
        or pre-stacked load can come out in an hour or two. A floor-loaded
        40&prime; HC of mixed cartons typically takes most of a shift. Counts
        and damage notes are completed in the same window.
      </>
    ),
  },
  {
    q: "Can you devan bonded cargo?",
    a: (
      <>
        Yes. We&rsquo;re a CBP-designated Class 3 bonded warehouse, so
        bonded containers can be devanned under bond into bonded inventory
        without breaking the bond.{" "}
        <Link
          href="/services/bonded-storage"
          style={{ color: colors.accent, textDecoration: "underline" }}
        >
          Bonded storage details here.
        </Link>
      </>
    ),
  },
  {
    q: "What documentation do we get back?",
    a: (
      <>
        A signed piece-count tally reconciled against the BOL, a list of
        exceptions (shortage / overage / mis-mark / damage) with photographs,
        and the original seal number recorded before the seal was broken. We
        send the package the same day the container is unloaded.
      </>
    ),
  },
  {
    q: "What if the container arrives overweight?",
    a: (
      <>
        Devanning and overweight reworking pair naturally — devan into our
        warehouse, redistribute the cargo across legal-weight outbound
        loads, and the overweight problem is solved at the same time the
        piece count is done. See{" "}
        <Link
          href="/services#overweight-reworking"
          style={{ color: colors.accent, textDecoration: "underline" }}
        >
          overweight reworking
        </Link>{" "}
        for the full process.
      </>
    ),
  },
  {
    q: "What kinds of cargo do you handle?",
    a: (
      <>
        General merchandise — palletized goods, floor-loaded cartons,
        automotive parts, consumer goods, industrial equipment, drums and
        totes. We don&rsquo;t handle hazardous materials, cold-chain, or
        live animals. If you&rsquo;re not sure whether your cargo fits,
        call and we&rsquo;ll tell you straight.
      </>
    ),
  },
];

export default function DevanningPage() {
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
            <span style={{ color: colors.accent }}>Devanning</span>
          </nav>

          <div style={eyebrow}>Container unload · piece-count audit</div>
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
            Hand-unloaded, counted, documented —
            <br />
            so what arrived matches what was billed.
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
            We devan ocean containers piece by piece, audit the count against
            your bill of lading as we go, and photograph any exception we
            find. You get a signed tally and a clean exception report the
            same day — minutes from the Port of Charleston, since{" "}
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
            <FactCard label="Method" value="Hand-unload, piece-count" />
            <FactCard label="Audit" value="Reconciled against BOL" />
            <FactCard label="Documentation" value="Signed tally + photos" />
            <FactCard
              label="Bonded capable"
              value="Class 3 — devan under bond"
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
            From sealed container to signed tally.
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
            Same crew handles drayage, devan, and disposition — so the count
            and the chain-of-custody documentation come from one party, not
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
          <div style={eyebrow}>When devanning earns its keep</div>
          <h2
            style={{
              fontFamily: fonts.heading,
              fontSize: "clamp(26px, 3vw, 34px)",
              fontWeight: 700,
              marginTop: 10,
              maxWidth: 720,
            }}
          >
            Four situations where a documented unload is worth doing right.
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
            What you get when you devan with us.
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
                  <span style={placeholder}>XX containers/day TK</span> at
                  peak, scaled by container type and product mix. Typical
                  mixed-carton 40&prime; HC turns inside one shift.
                </>
              }
            />
            <CapCard
              label="Documentation"
              body="Photographed exceptions, signed piece-count tally against the BOL, and the original seal number recorded before the seal is broken. Optional unload video on request."
            />
            <CapCard
              label="Disposition"
              body="Cargo staged to rack, cross-docked to your outbound carrier, or palletized per your SOP — sorted by SKU as it comes off so no double-handling later."
            />
            <CapCard
              label="Drayage included"
              body="Direct moves from SC Ports Authority terminals (Wando Welch, NCT, Leatherman) so the container only changes hands once."
            />
            <CapCard
              label="Bonded-floor capable"
              body={
                <>
                  Devan straight into bonded inventory without breaking the
                  bond — see{" "}
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
          <div style={eyebrow}>Container coming in for devan?</div>
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
            Send us the BOL and ETA — we&rsquo;ll quote the unload, audit,
            and disposition.
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
