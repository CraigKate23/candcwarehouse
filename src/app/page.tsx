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
} from "./components/styles";

const VALUES = [
  {
    title: "US Customs Bonded",
    body: "Class 3 bonded storage so your cargo can wait on duty, not on the clock.",
  },
  {
    title: "General Order approved",
    body: "CBP-designated GO facility — we handle the cargo nobody else wants to.",
  },
  {
    title: "Minutes from the port",
    body: "Low-mileage drayage from Wando Welch, NCT, and Leatherman terminals.",
  },
  {
    title: "Family-run since 1998",
    body: "One phone call, one team. You talk to the people making decisions.",
  },
];

const SERVICES = [
  "Bonded storage",
  "General Order (GO) storage",
  "Devanning",
  "Overweight container reworking",
  "Drayage",
  "Cross-dock",
  "Deconsolidation",
  "WMS-tracked inventory",
  "Pick & pack",
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section
        style={{
          padding: "96px 0 72px",
          background:
            "linear-gradient(180deg, #fafaf7 0%, #f3efe7 100%)",
          borderBottom: `1px solid ${colors.line}`,
        }}
      >
        <div
          className="hero-grid"
          style={{
            ...container,
            display: "grid",
            gridTemplateColumns: "1.1fr 0.9fr",
            gap: 56,
            alignItems: "center",
          }}
        >
          <div>
            <div style={eyebrow}>Ladson, South Carolina · Since {business.foundedYear}</div>
            <h1
              style={{
                fontFamily: fonts.heading,
                fontSize: "clamp(40px, 5.4vw, 64px)",
                lineHeight: 1.05,
                fontWeight: 700,
                marginTop: 16,
              }}
            >
              Bonded &amp; General Order<br />
              warehousing, built for<br />
              the Port of Charleston.
            </h1>
            <p
              style={{
                fontFamily: fonts.body,
                fontSize: 18,
                lineHeight: 1.6,
                color: colors.steel,
                marginTop: 22,
                maxWidth: 560,
              }}
            >
              C&amp;C Warehouse is a family-run US Customs Bonded and General
              Order facility minutes from the SC Ports Authority terminals.
              We handle the cargo other warehouses send back — overweight
              containers, GO freight, and everything in between.
            </p>

            <div style={{ display: "flex", gap: 12, marginTop: 32, flexWrap: "wrap" }}>
              <Link href="/quote" className="cta-primary" style={buttonPrimary}>
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

            <div
              style={{
                marginTop: 44,
                display: "flex",
                gap: 32,
                flexWrap: "wrap",
                fontFamily: fonts.mono,
                fontSize: 12,
                color: colors.steel,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              <span>CBP Bonded Class 3</span>
              <span>General Order facility</span>
              <span>{business.teamExperienceYears}+ yrs combined team experience</span>
            </div>
          </div>

          {/* Paper-style card with quick stats */}
          <div
            style={{
              ...cardStyle,
              padding: 32,
              background: colors.paper,
            }}
          >
            <div style={eyebrow}>At a glance</div>
            <div
              style={{
                marginTop: 18,
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                rowGap: 22,
                columnGap: 18,
              }}
            >
              <Stat label="Founded" value={`${business.foundedYear}`} />
              <Stat label="Team experience" value={`${business.teamExperienceYears}+ yrs`} />
              <Stat label="Location" value="Ladson, SC" />
              <Stat label="Ownership" value="Family-run" />
            </div>

            <div
              style={{
                marginTop: 28,
                paddingTop: 20,
                borderTop: `1px dashed ${colors.line}`,
                display: "grid",
                gap: 8,
              }}
            >
              <div style={eyebrow}>Talk to us</div>
              <a
                href={`tel:${business.phone}`}
                style={{
                  fontFamily: fonts.heading,
                  fontSize: 22,
                  fontWeight: 700,
                  color: colors.ink,
                }}
              >
                {business.phoneDisplay}
              </a>
              <a
                href={`mailto:${business.email}`}
                style={{
                  fontFamily: fonts.body,
                  fontSize: 15,
                  color: colors.steel,
                }}
              >
                {business.email}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section style={{ padding: "88px 0" }}>
        <div style={container}>
          <div style={eyebrow}>Why importers pick us</div>
          <h2
            style={{
              fontFamily: fonts.heading,
              fontSize: "clamp(28px, 3.4vw, 40px)",
              fontWeight: 700,
              marginTop: 12,
              maxWidth: 720,
            }}
          >
            The closest bonded warehouse to your container — run by
            people who answer the phone.
          </h2>

          <div
            className="value-grid"
            style={{
              marginTop: 48,
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 20,
            }}
          >
            {VALUES.map((v) => (
              <article
                key={v.title}
                className="value-card"
                style={{
                  background: colors.paper,
                  border: `1px solid ${colors.line}`,
                  borderRadius: 16,
                  padding: 24,
                }}
              >
                <h3
                  style={{
                    fontFamily: fonts.heading,
                    fontSize: 18,
                    fontWeight: 600,
                  }}
                >
                  {v.title}
                </h3>
                <p
                  style={{
                    fontFamily: fonts.body,
                    fontSize: 14.5,
                    lineHeight: 1.55,
                    color: colors.steel,
                    marginTop: 10,
                  }}
                >
                  {v.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Services strip */}
      <section
        style={{
          padding: "72px 0",
          background: colors.paperDeep,
          borderTop: `1px solid ${colors.line}`,
          borderBottom: `1px solid ${colors.line}`,
        }}
      >
        <div style={container}>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              gap: 24,
              flexWrap: "wrap",
            }}
          >
            <div>
              <div style={eyebrow}>Services</div>
              <h2
                style={{
                  fontFamily: fonts.heading,
                  fontSize: 30,
                  fontWeight: 700,
                  marginTop: 10,
                }}
              >
                Nine ways we move your freight.
              </h2>
            </div>
            <Link
              href="/services"
              className="cta-secondary"
              style={buttonSecondary}
            >
              Full service list
            </Link>
          </div>

          <ul
            style={{
              marginTop: 36,
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 0,
              listStyle: "none",
              padding: 0,
              borderTop: `1px solid ${colors.line}`,
            }}
          >
            {SERVICES.map((s, i) => (
              <li
                key={s}
                style={{
                  padding: "18px 8px",
                  borderBottom: `1px solid ${colors.line}`,
                  borderRight:
                    (i + 1) % 3 === 0 ? "none" : `1px solid ${colors.line}`,
                  fontFamily: fonts.heading,
                  fontSize: 17,
                  fontWeight: 500,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <span
                  style={{
                    fontFamily: fonts.mono,
                    fontSize: 12,
                    color: colors.accent,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "96px 0 40px" }}>
        <div
          style={{
            ...container,
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontFamily: fonts.heading,
              fontSize: "clamp(28px, 3.4vw, 40px)",
              fontWeight: 700,
              maxWidth: 720,
              margin: "0 auto",
            }}
          >
            Got a container coming into Charleston?
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
            Tell us the particulars — commodity, size, bonded or not — and
            we&rsquo;ll get you a same-day quote.
          </p>
          <div style={{ marginTop: 28, display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap" }}>
            <Link href="/quote" className="cta-primary" style={buttonPrimary}>
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

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div
        style={{
          fontFamily: fonts.mono,
          fontSize: 11,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: colors.steel,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: fonts.heading,
          fontSize: 22,
          fontWeight: 700,
          color: colors.ink,
          marginTop: 4,
        }}
      >
        {value}
      </div>
    </div>
  );
}
