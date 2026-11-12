import type { Metadata } from "next";
import Link from "next/link";
import { HanahanLink } from "../../components/HanahanLink";
import { LadsonLink } from "../../components/LadsonLink";
import { areaServed } from "../../components/structured-data";
import {
  business,
  buttonPrimary,
  buttonSecondary,
  cardStyle,
  colors,
  container,
  eyebrow,
  fonts,
  hanahanLocation,
  ladsonLocation,
  terminalsGuidePath,
  transloadGuidePath,
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

// Absolute title so the layout template does not append another brand
// suffix. The three query phrases lead: container devanning, Charleston, SC,
// and the Port of Charleston.
const TITLE = "Container Devanning in Charleston, SC | Port of Charleston";
const DESCRIPTION =
  "Container devanning in Charleston, SC near the Port of Charleston. Piece-count audit, signed tally, and bonded-floor unload at C&C Warehouse.";

export const metadata: Metadata = {
  title: {
    absolute: TITLE,
  },
  description: DESCRIPTION,
  alternates: {
    canonical: "/services/devanning",
  },
  openGraph: {
    type: "website",
    siteName: business.name,
    locale: "en_US",
    url: "/services/devanning",
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "C&C Warehouse — container devanning and piece-count audit near the Port of Charleston",
      },
    ],
  },
};

// Per-page Service JSON-LD (added 2026-05-09 daily SEO pass).
// provider.@id points at the parent LocalBusiness defined in src/app/layout.tsx.
const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.candcwarehouse.com/services/devanning#service",
  "serviceType": "Container Devanning",
  "name": "Container Devanning in Charleston, SC at the Port of Charleston",
  "description": DESCRIPTION,
  "url": "https://www.candcwarehouse.com/services/devanning",
  // Same #localbusiness node the root layout emits. That node's
  // parentOrganization is the legal entity at #organization.
  "provider": {
    "@id": "https://www.candcwarehouse.com/#localbusiness"
  },
  "areaServed": areaServed,
  "audience": {
    "@type": "BusinessAudience",
    "name": "Importers, freight forwarders, and customs brokers using the Port of Charleston"
  }
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

type PublishedDrive = {
  label: string;
  name: string;
  about: string;
  route: string;
  distance: string;
};

function oceanDrives(drives: readonly PublishedDrive[]) {
  return drives.filter((drive) => drive.label !== "Inland Port Greer");
}

function oceanMilesSentence(drives: readonly PublishedDrive[]) {
  return oceanDrives(drives)
    .map((drive) => {
      const route = drive.route.endsWith(".")
        ? drive.route.slice(0, -1)
        : drive.route;
      return `${drive.name} is ${drive.about}, ${route}`;
    })
    .join(". ");
}

// Plain-text answers. The visible FAQ and the FAQPage JSON-LD both read
// these strings, so the two copies cannot drift.
const WHERE_ANSWER = `Container devanning in Charleston, SC is done at two buildings. The primary building is ${ladsonLocation.sqft} sq ft at ${ladsonLocation.street}, ${ladsonLocation.city}, ${ladsonLocation.state} ${ladsonLocation.postal}. The secondary building is ${hanahanLocation.sqft} sq ft at ${hanahanLocation.street}, ${hanahanLocation.city}, ${hanahanLocation.state} ${hanahanLocation.postal}. Ladson and Hanahan are in the Charleston metro, the same metro as North Charleston, Summerville, and Goose Creek. The unload is at those two warehouse addresses.`;

const PORT_ANSWER = `Yes. We dray the container from Wando Welch, North Charleston Terminal, and Hugh K. Leatherman, then hand-unload it with a piece-count audit and a signed tally. Published drive distances from ${ladsonLocation.city}: ${oceanMilesSentence(ladsonLocation.drives)}. From ${hanahanLocation.city}: ${oceanMilesSentence(hanahanLocation.drives)}. Both facilities sit within 25 miles of all three SC Ports Authority ocean terminals. Peak throughput is 30 containers/day, scaled by container type and product mix. Bonded containers can be devanned on the bonded floor without breaking the bond.`;

const PORT_FAQS: { q: string; a: string }[] = [
  {
    q: "Where do you do container devanning in Charleston, SC?",
    a: WHERE_ANSWER,
  },
  {
    q: "Can you devan containers from the Port of Charleston?",
    a: PORT_ANSWER,
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
          href="/services/overweight-reworking"
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
  ...PORT_FAQS,
];

// FAQPage JSON-LD built verbatim from the on-page FAQ copy below
// (plain-text mirror). Keep in sync if the FAQ answers change.
// Breadcrumb structured data mirroring the visible Services / Devanning trail.
const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.candcwarehouse.com",
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Services",
      "item": "https://www.candcwarehouse.com/services",
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Devanning",
      "item": "https://www.candcwarehouse.com/services/devanning",
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What does devanning mean?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Devanning (sometimes called stripping or destuffing) is the process of unloading cargo from an ocean container at a warehouse rather than at the port terminal. At C&C, devanning specifically means a hand-unload with a piece-count audit and exception documentation against the bill of lading."
      }
    },
    {
      "@type": "Question",
      "name": "How long does it take to devan a container?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It depends on how the container was loaded. A palletized, slip-sheet, or pre-stacked load can come out in an hour or two. A floor-loaded 40' HC of mixed cartons typically takes most of a shift. Counts and damage notes are completed in the same window."
      }
    },
    {
      "@type": "Question",
      "name": "Can you devan bonded cargo?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. We're a CBP-designated Class 3 bonded warehouse, so bonded containers can be devanned under bond into bonded inventory without breaking the bond."
      }
    },
    {
      "@type": "Question",
      "name": "What documentation do we get back?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A signed piece-count tally reconciled against the BOL, a list of exceptions (shortage, overage, mis-mark, damage) with photographs, and the original seal number recorded before the seal was broken. We send the package the same day the container is unloaded."
      }
    },
    {
      "@type": "Question",
      "name": "What if the container arrives overweight?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Devanning and overweight reworking pair naturally — devan into our warehouse, redistribute the cargo across legal-weight outbound loads, and the overweight problem is solved at the same time the piece count is done."
      }
    },
    {
      "@type": "Question",
      "name": "What kinds of cargo do you handle?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "General merchandise — palletized goods, floor-loaded cartons, automotive parts, consumer goods, industrial equipment, drums and totes. We don't handle hazardous materials, cold-chain, or live animals. If you're not sure whether your cargo fits, call and we'll tell you straight."
      }
    },
    ...PORT_FAQS.map((item) => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a,
      },
    })),
  ]
};

export default function DevanningPage() {
  return (
    <>
      <script
        type="application/ld+json"
        id="service-jsonld"
        dangerouslySetInnerHTML={{ __html: jsonLdHtml(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        id="faq-jsonld"
        dangerouslySetInnerHTML={{ __html: jsonLdHtml(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        id="breadcrumb-jsonld"
        dangerouslySetInnerHTML={{ __html: jsonLdHtml(breadcrumbJsonLd) }}
      />
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
            Container Devanning in Charleston, SC
          </h1>
          <p
            style={{
              fontFamily: fonts.heading,
              fontSize: "clamp(20px, 2.4vw, 28px)",
              lineHeight: 1.25,
              fontWeight: 500,
              color: colors.inkSoft,
              marginTop: 14,
              maxWidth: 760,
            }}
          >
            Hand-unloaded, counted, documented — so what arrived matches what
            was billed.
          </p>
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
            Container devanning here is a hand-unload of ocean containers
            piece by piece. We audit the count against your bill of lading
            as we go and photograph any exception we find. You get a signed
            tally and a clean exception report the same day — minutes from
            the Port of Charleston, since {business.foundedYear}. The
            primary floor is our{" "}
            <LadsonLink>{ladsonLocation.query}</LadsonLink>. The secondary
            floor is the <HanahanLink>{hanahanLocation.query}</HanahanLink>.
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

      {/* Charleston and the port — facts already published on /facility,
          the location pages, and the terminals guide. */}
      <section
        style={{
          padding: "56px 0",
          borderTop: `1px solid ${colors.line}`,
        }}
      >
        <div style={container}>
          <div style={eyebrow}>Port of Charleston</div>
          <h2
            style={{
              fontFamily: fonts.heading,
              fontSize: "clamp(26px, 3vw, 34px)",
              fontWeight: 700,
              marginTop: 10,
              maxWidth: 760,
            }}
          >
            Container devanning in Charleston, SC, from both buildings.
          </h2>
          <p
            style={{
              fontFamily: fonts.body,
              fontSize: 16.5,
              lineHeight: 1.65,
              color: colors.steel,
              marginTop: 14,
              maxWidth: 760,
            }}
          >
            Container devanning in Charleston runs from two floors in the
            Charleston metro, minutes from the Port of Charleston. The
            primary building is the{" "}
            <LadsonLink>{ladsonLocation.query}</LadsonLink>,{" "}
            {ladsonLocation.sqft} sq ft at {ladsonLocation.street},{" "}
            {ladsonLocation.city}, {ladsonLocation.state}{" "}
            {ladsonLocation.postal}. The secondary building is the{" "}
            <HanahanLink>{hanahanLocation.query}</HanahanLink>,{" "}
            {hanahanLocation.sqft} sq ft at {hanahanLocation.street},{" "}
            {hanahanLocation.city}, {hanahanLocation.state}{" "}
            {hanahanLocation.postal}. Ladson and Hanahan are in that metro
            with North Charleston, Summerville, and Goose Creek. The unload
            is at those two warehouse addresses. Inbound{" "}
            <Link
              href="/services/drayage"
              style={{ color: colors.accent, textDecoration: "underline" }}
            >
              drayage
            </Link>{" "}
            is from Wando Welch, North Charleston Terminal, and Hugh K.
            Leatherman. Each container gets a piece-count audit against the
            bill of lading and a signed tally. Bonded containers are
            devanned on the bonded floor — see{" "}
            <Link
              href="/services/bonded-storage"
              style={{ color: colors.accent, textDecoration: "underline" }}
            >
              bonded storage
            </Link>
            . The miles below are the per-building figures already published
            on the{" "}
            <Link
              href="/facility"
              style={{ color: colors.accent, textDecoration: "underline" }}
            >
              facility page
            </Link>{" "}
            and the{" "}
            <Link
              href={terminalsGuidePath}
              style={{ color: colors.accent, textDecoration: "underline" }}
            >
              Port of Charleston terminals
            </Link>{" "}
            guide.
          </p>
          <div
            style={{
              marginTop: 28,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 18,
            }}
          >
            <OceanMiles
              heading="Ladson — primary building"
              href={ladsonLocation.path}
              drives={ladsonLocation.drives}
            />
            <OceanMiles
              heading="Hanahan — closer to the terminals"
              href={hanahanLocation.path}
              drives={hanahanLocation.drives}
            />
          </div>
          <p
            style={{
              fontFamily: fonts.body,
              fontSize: 16.5,
              lineHeight: 1.65,
              color: colors.steel,
              marginTop: 18,
              maxWidth: 760,
            }}
          >
            Both facilities sit within 25 miles of all three SC Ports
            Authority ocean terminals. Peak throughput is 30 containers/day,
            scaled by container type and product mix.
          </p>
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
                  30 containers/day at peak, scaled by container type and
                  product mix. Typical mixed-carton 40&prime; HC turns inside
                  one shift.
                </>
              }
            />
            <CapCard
              label="Documentation"
              body="Photographed exceptions, signed piece-count tally against the BOL, and the original seal number recorded before the seal is broken. Optional unload video on request."
            />
            <CapCard
              label="Disposition"
              body={
                <>
                  Cargo staged to rack, sent through{" "}
                  <Link
                    href="/services/cross-dock"
                    style={{
                      color: colors.accent,
                      textDecoration: "underline",
                    }}
                  >
                    cross-dock in Charleston
                  </Link>{" "}
                  to your outbound carrier, or palletized per your SOP —
                  sorted by SKU as it comes off so no double-handling later.
                  When the freight moves straight to outbound staging with
                  no put-away, that handoff is{" "}
                  <Link
                    href="/services/cross-dock"
                    style={{
                      color: colors.accent,
                      textDecoration: "underline",
                    }}
                  >
                    transloading
                  </Link>
                  . The plain-language page for that handoff is the{" "}
                  <Link
                    href={transloadGuidePath}
                    style={{
                      color: colors.accent,
                      textDecoration: "underline",
                    }}
                  >
                    transloading Charleston
                  </Link>{" "}
                  guide. When one container has to leave as separate shipments by
                  customer, store, or region, that next step is{" "}
                  <Link
                    href="/services/deconsolidation"
                    style={{
                      color: colors.accent,
                      textDecoration: "underline",
                    }}
                  >
                    container deconsolidation Charleston
                  </Link>
                  .
                </>
              }
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
                  $2,000,000.
                </>
              }
            />
            <CapCard
              label="Amazon FBA prep"
              body={
                <>
                  Selling on Amazon? Devanned cargo can go straight to the
                  prep line — inspection, FNSKU labeling, polybagging, and
                  forwarding to the FC — see{" "}
                  <Link
                    href="/services/fba-prep"
                    style={{
                      color: colors.accent,
                      textDecoration: "underline",
                    }}
                  >
                    FBA prep
                  </Link>{" "}
                  for the full process.
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

function jsonLdHtml(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

function OceanMiles({
  heading,
  href,
  drives,
}: {
  heading: string;
  href: string;
  drives: readonly PublishedDrive[];
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
      <h3
        style={{
          fontFamily: fonts.heading,
          fontSize: 18,
          fontWeight: 600,
          margin: 0,
        }}
      >
        <Link
          href={href}
          style={{ color: colors.ink, textDecoration: "underline" }}
        >
          {heading}
        </Link>
      </h3>
      <dl style={{ margin: "14px 0 0" }}>
        {oceanDrives(drives).map((drive) => (
          <div key={drive.label} style={{ marginTop: 10 }}>
            <dt
              style={{
                fontFamily: fonts.heading,
                fontSize: 15,
                fontWeight: 600,
                color: colors.ink,
              }}
            >
              {drive.name}
            </dt>
            <dd
              style={{
                margin: "4px 0 0",
                fontFamily: fonts.body,
                fontSize: 14.5,
                lineHeight: 1.5,
                color: colors.steel,
              }}
            >
              {drive.distance} — {drive.route}
            </dd>
          </div>
        ))}
      </dl>
    </div>
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
