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
// dashed-orange chip used on /about and /services so missing data
// stays loud and is trivial to find-and-replace later.
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

// First dedicated service sub-page. Mirrors the bonded-storage section of
// /services but expanded into a full page with its own H1, deeper
// metadata, a step-by-step "how it works" sequence, a "when to use it"
// section, and an FAQ. Built for SEO depth on the highest-intent term
// for C&C — "bonded warehouse" / "bonded storage" + Port of Charleston.

export const metadata: Metadata = {
  title: "US Customs Bonded Warehouse | Class 3 Storage near Port of Charleston",
  description:
    "C&C Warehouse is a CBP-designated Class 3 bonded warehouse in Ladson, SC, minutes from the Port of Charleston. Hold imported cargo on bond and defer duty until you're ready to enter the goods for consumption.",
  alternates: {
    canonical: "/services/bonded-storage",
  },
  openGraph: {
    type: "website",
    url: "/services/bonded-storage",
    title: `US Customs Bonded Warehouse · ${business.name}`,
    description:
      "CBP Class 3 bonded storage near the Port of Charleston. Defer duty, keep cargo under bond, release when you're ready.",
  },
};

const STEPS: { n: string; title: string; body: string }[] = [
  {
    n: "01",
    title: "Cargo lands in Charleston",
    body: "Container clears the terminal and is drayed to our Ladson facility — typically a same-day move from Wando Welch, NCT, or Leatherman.",
  },
  {
    n: "02",
    title: "Receipt under bond",
    body: "We log the container into the bonded inventory under CBP supervision. The cargo is now on bond — duty isn't owed until it's entered for consumption.",
  },
  {
    n: "03",
    title: "Stored on the bonded floor",
    body: "Goods sit in racked or floor-stored bonded space, tracked in our WMS with chain-of-custody documentation through the entire dwell.",
  },
  {
    n: "04",
    title: "Withdrawn or re-exported",
    body: "When you're ready, we file the withdrawal with CBP. Pay duty and release for consumption, or re-export under bond and avoid duty entirely.",
  },
];

const WHEN_TO_USE: { label: string; body: string }[] = [
  {
    label: "Cash flow",
    body: "Defer the duty hit until the goods are actually moving into the US market — useful when import volumes are seasonal or when downstream sales pace the duty payment.",
  },
  {
    label: "Re-export likely",
    body: "If some portion of the inbound container is bound for Canada, Mexico, or onward export, bonded storage avoids paying US duty on cargo that never enters US commerce.",
  },
  {
    label: "Documentation in flight",
    body: "Customs paperwork, classification questions, or PGA reviews still in motion — bonded storage holds the cargo legally while the entry is sorted.",
  },
  {
    label: "Inventory staging",
    body: "Land in bulk through Charleston, hold under bond, and pull duty-paid releases as your distribution plan firms up.",
  },
];

const FAQ: { q: string; a: React.ReactNode }[] = [
  {
    q: "What is a US Customs Bonded Warehouse?",
    a: (
      <>
        A bonded warehouse is a facility approved and supervised by US Customs
        and Border Protection (CBP) where imported merchandise can be stored
        without paying import duty at the time of arrival. Duty is owed only
        when the cargo is withdrawn for US consumption — or never, if it&rsquo;s
        re-exported. C&amp;C operates as a CBP-designated Class 3 bonded
        warehouse, which is the importer&rsquo;s private bonded warehouse
        classification.
      </>
    ),
  },
  {
    q: "How long can cargo stay in a bonded warehouse?",
    a: (
      <>
        Up to five years from the date of importation under the standard CBP
        rule. That window covers nearly every legitimate use case — staging
        inventory, deferring duty across a fiscal year, or holding cargo while
        downstream paperwork resolves.
      </>
    ),
  },
  {
    q: "What's the difference between bonded storage and General Order (GO)?",
    a: (
      <>
        Bonded storage is voluntary — the importer (or their broker) elects to
        place cargo on bond. General Order is involuntary: when cargo sits at
        the port unclaimed past the 15-day window, CBP moves it to a
        GO-designated facility. C&amp;C handles both, and{" "}
        <Link
          href="/services#go-storage"
          style={{ color: colors.accent, textDecoration: "underline" }}
        >
          our GO services page
        </Link>{" "}
        covers the GO side specifically.
      </>
    ),
  },
  {
    q: "Can I withdraw partial quantities?",
    a: (
      <>
        Yes. Bonded inventory is tracked at the SKU / lot level, and CBP
        permits partial withdrawals against the original entry. Pull a few
        pallets for a domestic order, leave the rest on bond.
      </>
    ),
  },
  {
    q: "Do you handle the CBP paperwork?",
    a: (
      <>
        We coordinate with your customs broker on the entry, withdrawal, and
        re-export documentation, and we maintain the warehouse-side
        recordkeeping CBP requires (receipt, location, withdrawal, balance).
        If you don&rsquo;t already have a broker we can recommend one familiar
        with the Port of Charleston.
      </>
    ),
  },
  {
    q: "What kinds of cargo do you accept on bond?",
    a: (
      <>
        General merchandise — palletized goods, floor-loaded containers,
        overweights, automotive parts, consumer goods, industrial equipment.
        We don&rsquo;t handle hazardous materials, cold-chain, or live animals.
        If you&rsquo;re not sure whether your cargo fits, call and we&rsquo;ll
        tell you straight.
      </>
    ),
  },
];

export default function BondedStoragePage() {
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
            <span style={{ color: colors.accent }}>Bonded storage</span>
          </nav>

          <div style={eyebrow}>CBP Class 3</div>
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
            US Customs Bonded warehousing,
            <br />
            minutes from the Port of Charleston.
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
            Hold imported cargo on bond so duty isn&rsquo;t owed until you&rsquo;re
            ready to enter it for consumption. C&amp;C is a CBP-designated
            Class 3 bonded warehouse — the importer&rsquo;s private bonded
            classification — operating in Ladson, SC since {business.foundedYear}.
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
            <FactCard label="Designation" value="CBP Class 3" />
            <FactCard label="Type" value="Importer's private bonded" />
            <FactCard
              label="Max dwell"
              value="5 years from importation"
            />
            <FactCard label="Location" value={`${business.city}, ${business.state}`} />
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
            From terminal to release, end to end.
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
            We move the container off the terminal, log it under bond, and
            keep it tracked through every withdrawal — so you have one party
            accountable from arrival through release.
          </p>

          <ol
            className="bonded-steps"
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
          <div style={eyebrow}>When bonded storage pays off</div>
          <h2
            style={{
              fontFamily: fonts.heading,
              fontSize: "clamp(26px, 3vw, 34px)",
              fontWeight: 700,
              marginTop: 10,
              maxWidth: 720,
            }}
          >
            Four common reasons importers put cargo on bond.
          </h2>

          <div
            className="bonded-when-grid"
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
            What you get when you put cargo on our bonded floor.
          </h2>

          <div
            className="bonded-cap-grid"
            style={{
              marginTop: 28,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 18,
            }}
          >
            <CapCard
              label="Bonded floor & rack"
              body={
                <>
                  3,000+ racked positions of bonded floor and rack space
                  across two facilities, plus floor-load capacity for oversized
                  or palletized loose cargo.
                </>
              }
            />
            <CapCard
              label="Inventory tracking"
              body="Receipt, location, withdrawal, and balance tracked in our WMS — bonded inventory always reconciled against the entry."
            />
            <CapCard
              label="Drayage included"
              body="Direct moves from SC Ports Authority terminals (Wando Welch, NCT, Leatherman) so the container only changes hands once."
            />
            <CapCard
              label="Devanning if you need it"
              body={
                <>
                  Hand-unload bonded containers piece-by-piece with a
                  documented count and damage notes — see{" "}
                  <Link
                    href="/services#devanning"
                    style={{
                      color: colors.accent,
                      textDecoration: "underline",
                    }}
                  >
                    devanning
                  </Link>{" "}
                  for the full process.
                </>
              }
            />
            <CapCard
              label="Cargo insurance"
              body={
                <>
                  Warehouse legal liability and cargo coverage on stored
                  inventory — limits at{" "}
                  <span style={placeholder}>$X,XXX,XXX TK</span>.
                </>
              }
            />
            <CapCard
              label="Withdrawal support"
              body="We coordinate with your customs broker on entry, withdrawal, and re-export filings — and on the warehouse-side recordkeeping CBP requires."
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
          <div style={eyebrow}>Have a container coming in?</div>
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
            Tell us what&rsquo;s on the BOL and we&rsquo;ll quote a bonded
            stay.
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
