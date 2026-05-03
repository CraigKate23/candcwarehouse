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

// Ethos cards — what we tell people about how we operate. These are
// verifiable claims, not invented numbers.
const ETHOS = [
  {
    title: "Family-run",
    body: "Same owners since 1998. When you call, you talk to the people making the decisions — not a node in someone's call center.",
  },
  {
    title: "Bonded first",
    body: "We built the business around US Customs Bonded and General Order cargo — the kind of freight a lot of 3PLs don't want to deal with.",
  },
  {
    title: "Port-proximate",
    body: "Ladson, SC puts us minutes from Wando Welch, North Charleston Terminal, and Hugh K. Leatherman. Drayage miles stay low.",
  },
  {
    title: "Hands-on",
    body: "Devanning, reworking overweights, piece-count audits — we do the warehouse floor work ourselves, not through a second vendor.",
  },
];

type Milestone = { year: string; title: string; body: React.ReactNode };
const TIMELINE: Milestone[] = [
  {
    year: "1998",
    title: "C&C Warehouse founded",
    body: "Pam and Jimmy Connelly opened C&C Warehouse in North Charleston, SC — a family-run operation serving importers coming through the Port of Charleston.",
  },
  {
    year: "2001",
    title: "US Customs Bonded designation",
    body: "Became a CBP-designated Class 3 Bonded Warehouse, allowing importers to store cargo on bond until they're ready to enter it for consumption.",
  },
  {
    year: "2010",
    title: "Acres Drive facility completed",
    body: "Moved into our 60,000 sq ft primary facility at 137 Acres Drive in Ladson, SC — purpose-built for bonded and General Order storage with direct interstate access.",
  },
  {
    year: "2020",
    title: "Greg Cate takes the helm",
    body: "Greg Cate returned to the company and took over day-to-day operations, bringing the next generation of leadership to C&C Warehouse.",
  },
  {
    year: "2023",
    title: "Northpointe facility added",
    body: "Expanded with a 30,000 sq ft secondary facility at 1014 Northpointe Industrial Blvd in Hanahan — closer to the port terminals and bringing total capacity to 90,000+ sq ft.",
  },
  {
    year: "Today",
    title: "Charleston's bonded + GO specialist",
    body: (
      <>
        Running 90,000+ sq ft across two facilities with 3,000+ racked
        positions and a team carrying {business.teamExperienceYears}+ years of
        combined warehouse experience.
      </>
    ),
  },
];

type TeamMember = {
  name: string;
  role: string;
  bio: string;
};
const TEAM: TeamMember[] = [
  {
    name: "Pam Connelly",
    role: "Co-Founder",
    bio: "Co-founded C&C Warehouse in 1998 and helped build the company from a single North Charleston location into the bonded and GO operation it is today.",
  },
  {
    name: "Jimmy Connelly",
    role: "Co-Founder",
    bio: "Co-founded C&C Warehouse alongside Pam in 1998, growing the business around the specialized freight that other warehouses turned away.",
  },
  {
    name: "Greg Cate",
    role: "Operations",
    bio: "Returned to C&C Warehouse in 2020 and has been at the helm ever since, overseeing the expansion to two facilities and 90,000+ sq ft of capacity.",
  },
];

export const metadata: Metadata = {
  title: "About C&C Warehouse",
  description: `Family-run US Customs Bonded and General Order warehouse in Ladson, SC, serving Port of Charleston importers since ${business.foundedYear}.`,
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    type: "website",
    url: "/about",
    title: `About · ${business.name}`,
    description: `Family-run US Customs Bonded and General Order warehouse in Ladson, SC, since ${business.foundedYear}.`,
  },
};

export default function AboutPage() {
  return (
    <>
      {/* Intro / hero */}
      <section
        style={{
          padding: "88px 0 64px",
          background: "linear-gradient(180deg, #fafaf7 0%, #f3efe7 100%)",
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
            alignItems: "start",
          }}
        >
          <div>
            <div style={eyebrow}>About</div>
            <h1
              style={{
                fontFamily: fonts.heading,
                fontSize: "clamp(36px, 4.8vw, 56px)",
                lineHeight: 1.08,
                fontWeight: 700,
                marginTop: 16,
              }}
            >
              A family-run warehouse, built around the Port of Charleston.
            </h1>
            <p
              style={{
                fontFamily: fonts.body,
                fontSize: 18,
                lineHeight: 1.65,
                color: colors.steel,
                marginTop: 22,
                maxWidth: 600,
              }}
            >
              C&amp;C Warehouse was founded in {business.foundedYear} by Pam
              and Jimmy Connelly in North Charleston, South Carolina. We
              started out handling the cargo other 3PLs sent back —
              overweight containers, General Order freight, bonded shipments
              stuck in limbo — and built a business around doing that work
              well.
            </p>
            <p
              style={{
                fontFamily: fonts.body,
                fontSize: 17,
                lineHeight: 1.65,
                color: colors.steel,
                marginTop: 14,
                maxWidth: 600,
              }}
            >
              Almost three decades later we&rsquo;re still family-run. Same
              phone number, same team making the calls, same focus on the
              freight that comes off the water at Wando Welch and North
              Charleston.
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

          {/* Fact card — verifiable facts only */}
          <aside
            style={{
              ...cardStyle,
              background: colors.paper,
            }}
          >
            <div style={eyebrow}>The short version</div>
            <dl
              style={{
                marginTop: 18,
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                rowGap: 20,
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
              <Fact
                label="Team experience"
                value={`${business.teamExperienceYears}+ yrs combined`}
              />
              <Fact label="CBP status" value="Class 3 Bonded" />
              <Fact label="GO facility" value="CBP-designated" />
            </dl>
            <div
              style={{
                marginTop: 24,
                paddingTop: 18,
                borderTop: `1px dashed ${colors.line}`,
                display: "grid",
                gap: 6,
              }}
            >
              <div style={eyebrow}>Talk to us</div>
              <a
                href={`tel:${business.phone}`}
                style={{
                  fontFamily: fonts.heading,
                  fontSize: 20,
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
          </aside>
        </div>
      </section>

      {/* Ethos */}
      <section style={{ padding: "80px 0" }}>
        <div style={container}>
          <div style={eyebrow}>How we operate</div>
          <h2
            style={{
              fontFamily: fonts.heading,
              fontSize: "clamp(26px, 3.2vw, 36px)",
              fontWeight: 700,
              marginTop: 10,
              maxWidth: 700,
            }}
          >
            Four things we&rsquo;ve stuck to since {business.foundedYear}.
          </h2>

          <div
            className="value-grid"
            style={{
              marginTop: 40,
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 20,
            }}
          >
            {ETHOS.map((v) => (
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

      {/* Timeline */}
      <section
        style={{
          padding: "72px 0",
          background: colors.paperDeep,
          borderTop: `1px solid ${colors.line}`,
          borderBottom: `1px solid ${colors.line}`,
        }}
      >
        <div style={container}>
          <div style={eyebrow}>Timeline</div>
          <h2
            style={{
              fontFamily: fonts.heading,
              fontSize: "clamp(26px, 3.2vw, 36px)",
              fontWeight: 700,
              marginTop: 10,
            }}
          >
            The C&amp;C story, so far.
          </h2>
          <ol
            style={{
              marginTop: 36,
              listStyle: "none",
              padding: 0,
              display: "grid",
              gap: 0,
              borderTop: `1px solid ${colors.line}`,
            }}
          >
            {TIMELINE.map((m) => (
              <li
                key={m.title}
                style={{
                  display: "grid",
                  gridTemplateColumns: "120px 1fr",
                  gap: 24,
                  padding: "22px 0",
                  borderBottom: `1px solid ${colors.line}`,
                }}
              >
                <div
                  style={{
                    fontFamily: fonts.mono,
                    fontSize: 14,
                    letterSpacing: "0.08em",
                    color: colors.accent,
                    textTransform: "uppercase",
                    paddingTop: 2,
                  }}
                >
                  {m.year}
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: fonts.heading,
                      fontSize: 19,
                      fontWeight: 600,
                    }}
                  >
                    {m.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: fonts.body,
                      fontSize: 15.5,
                      lineHeight: 1.6,
                      color: colors.steel,
                      marginTop: 6,
                    }}
                  >
                    {m.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: "80px 0" }}>
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
              <div style={eyebrow}>Team</div>
              <h2
                style={{
                  fontFamily: fonts.heading,
                  fontSize: "clamp(26px, 3.2vw, 36px)",
                  fontWeight: 700,
                  marginTop: 10,
                }}
              >
                The people you&rsquo;ll actually talk to.
              </h2>
            </div>
            <p
              style={{
                fontFamily: fonts.body,
                fontSize: 15,
                color: colors.steel,
                maxWidth: 320,
              }}
            >
              Three generations of warehouse experience. One phone number.
            </p>
          </div>

          <div
            className="value-grid"
            style={{
              marginTop: 36,
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 20,
            }}
          >
            {TEAM.map((p, i) => (
              <article
                key={i}
                style={{
                  background: colors.paper,
                  border: `1px solid ${colors.line}`,
                  borderRadius: 16,
                  padding: 24,
                }}
              >
                <div
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    background:
                      "linear-gradient(135deg, #e7e2d6 0%, #d9d0c0 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: fonts.heading,
                    fontSize: 28,
                    fontWeight: 700,
                    color: colors.steel,
                  }}
                >
                  {typeof p.name === "string" ? p.name.charAt(0) : ""}
                </div>
                <h3
                  style={{
                    fontFamily: fonts.heading,
                    fontSize: 18,
                    fontWeight: 600,
                    marginTop: 18,
                  }}
                >
                  {p.name}
                </h3>
                <div
                  style={{
                    fontFamily: fonts.mono,
                    fontSize: 12,
                    color: colors.accent,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    marginTop: 4,
                  }}
                >
                  {p.role}
                </div>
                <p
                  style={{
                    fontFamily: fonts.body,
                    fontSize: 14.5,
                    lineHeight: 1.55,
                    color: colors.steel,
                    marginTop: 12,
                  }}
                >
                  {p.bio}
                </p>
              </article>
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
            Work with a warehouse where the owners still answer the phone.
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
            Tell us what&rsquo;s coming off the water and we&rsquo;ll tell
            you the shortest path to getting it handled.
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
