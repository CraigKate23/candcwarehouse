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

// Sixth dedicated service sub-page. Mirrors the structure of
// /services/devanning: hero, fact strip, 4-step process, when-to-use,
// capacity cards, FAQ (with FAQPage JSON-LD), CTA. New service line
// launched July 2026 on the back of Amazon ending its own US FBA prep
// & labeling service on Jan 1, 2026 — sellers must now arrive prepped
// or hire a third party. Pricing is intentionally NOT published
// (Greg's call, 7/12/26) — quote-driven like every other service page.

export const metadata: Metadata = {
  title: {
    absolute: "Amazon FBA Prep Charleston SC | Devan & Forward | C&C",
  },
  description:
    "FBA prep, FNSKU labeling, polybagging, and forwarding at C&C Warehouse in Ladson, SC — minutes from the Port of Charleston. Amazon ended its FBA prep services in January 2026; we devan your container, prep to Amazon's spec, and forward to the FC.",
  alternates: {
    canonical: "/services/fba-prep",
  },
  openGraph: {
    type: "website",
    siteName: business.name,
    locale: "en_US",
    url: "/services/fba-prep",
    title: "Amazon FBA Prep Charleston SC | Devan & Forward | C&C",
    description:
      "Container devan + FBA prep + forwarding in one facility, minutes from the Port of Charleston. Inspection, FNSKU labeling, polybagging, bundling — prepped to Amazon's spec inside a CBP Class 3 bonded warehouse.",
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "C&C Warehouse — Amazon FBA prep and forwarding near the Port of Charleston",
      },
    ],
  },
};

// Per-page Service JSON-LD. provider.@id points at the parent
// LocalBusiness defined in src/app/layout.tsx.
const serviceJsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.candcwarehouse.com/services/fba-prep#service",
  "serviceType": "Amazon FBA Prep",
  "name": "Amazon FBA Prep at the Port of Charleston",
  "url": "https://www.candcwarehouse.com/services/fba-prep",
  "provider": {
    "@id": "https://www.candcwarehouse.com/#localbusiness"
  },
  "areaServed": [
    {
      "@type": "City",
      "name": "Charleston"
    },
    {
      "@type": "City",
      "name": "North Charleston"
    },
    {
      "@type": "City",
      "name": "Mount Pleasant"
    },
    {
      "@type": "AdministrativeArea",
      "name": "South Carolina"
    }
  ],
  "audience": {
    "@type": "BusinessAudience",
    "name": "Amazon FBA sellers, wholesale and private-label brands importing through the Port of Charleston"
  }
};

const STEPS: { n: string; title: string; body: string }[] = [
  {
    n: "01",
    title: "Send it here",
    body: "Container from the port, LTL from your supplier, or parcel from anywhere. We receive against your packing list and photograph exceptions as we go — same discipline as our devan piece-count audits.",
  },
  {
    n: "02",
    title: "We prep to Amazon's spec",
    body: "Inspection, FNSKU labeling, polybagging with suffocation warnings, bubble wrap, bundling — Amazon's prep rules treated as production specs, not suggestions.",
  },
  {
    n: "03",
    title: "You see everything",
    body: "Live counts and photos in the customer portal. You create the shipment plan; we confirm the numbers match before anything ships.",
  },
  {
    n: "04",
    title: "We forward to the FC",
    body: "Carton or pallet, labeled and tendered on Amazon partnered-carrier rates. Signed tally, same day.",
  },
];

const WHEN_TO_USE: { label: string; body: string }[] = [
  {
    label: "You import through Charleston",
    body: "Every other prep option means a freight leg from the port to somewhere else. We're minutes from the terminals — your product is prepped the same week it clears.",
  },
  {
    label: "Amazon was doing your prep",
    body: "Amazon ended its own FBA prep and labeling service on January 1, 2026. Unprepped shipments no longer qualify for damage reimbursement, and inbound defect fees run about $0.60 per unit. You need a replacement that treats compliance as non-negotiable.",
  },
  {
    label: "Heavy, oversized, or automotive",
    body: "Most prep centers cap out at shoebox-sized. Oversize, heavy, and awkward is our normal — auto parts, hardware, and industrial goods are what we've racked for 25+ years.",
  },
  {
    label: "You want inventory on bond",
    body: "Feed FBA in tranches and defer duty on the rest. This is the one thing a CBP Class 3 bonded warehouse can do that no ordinary prep center can.",
  },
];

const FAQ: { q: string; a: React.ReactNode }[] = [
  {
    q: "What did Amazon change in 2026?",
    a: (
      <>
        As of January 1, 2026, Amazon no longer labels, bags, or preps
        inventory at its US fulfillment centers. Everything you send must
        arrive prepped to spec — or it doesn&rsquo;t qualify for damage
        reimbursement. Amazon&rsquo;s own guidance to sellers is to prep it
        yourself or hire a third-party prep provider. That&rsquo;s us.
      </>
    ),
  },
  {
    q: "Do you work with new Amazon sellers?",
    a: (
      <>
        Yes. No setup fee and no monthly minimum to start. Per-unit pricing
        is tiered by monthly volume — tell us what you sell and how it
        arrives, and you&rsquo;ll have a quote the same day.
      </>
    ),
  },
  {
    q: "Can you prep directly out of my import container?",
    a: (
      <>
        That&rsquo;s the point. We devan with a piece-count audit, flag
        damage with photos, prep what&rsquo;s sellable, and forward it to
        Amazon — one facility, one invoice.{" "}
        <Link
          href="/services/devanning"
          style={{ color: colors.accent, textDecoration: "underline" }}
        >
          Devanning details here.
        </Link>
      </>
    ),
  },
  {
    q: "What does Amazon require for polybags and labels?",
    a: (
      <>
        Bags with a 5-inch or larger opening need a suffocation warning,
        barcodes must scan through the bag, and every unit needs its FNSKU.
        We treat Amazon&rsquo;s prep rules as production specs — it&rsquo;s
        how our clients avoid inbound defect fees.
      </>
    ),
  },
  {
    q: "Can inventory stay on bond before going to FBA?",
    a: (
      <>
        Yes — that&rsquo;s our Class 3 designation. Duty is owed when goods
        enter for consumption, not while they sit here.{" "}
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
    q: "What kinds of products do you prep?",
    a: (
      <>
        General merchandise — including the oversize, heavy, and automotive
        product most prep centers refuse. We don&rsquo;t handle hazardous
        materials, cold-chain, or live animals. If you&rsquo;re not sure
        whether your product fits, call and we&rsquo;ll tell you straight.
      </>
    ),
  },
];

// FAQPage JSON-LD built verbatim from the on-page FAQ copy above
// (plain-text mirror). Keep in sync if the FAQ answers change.
// Breadcrumb structured data mirroring the visible Services / Amazon FBA prep trail.
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
      "name": "Amazon FBA prep",
      "item": "https://www.candcwarehouse.com/services/fba-prep",
    },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What did Amazon change in 2026?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "As of January 1, 2026, Amazon no longer labels, bags, or preps inventory at its US fulfillment centers. Everything you send must arrive prepped to spec — or it doesn't qualify for damage reimbursement. Amazon's own guidance to sellers is to prep it yourself or hire a third-party prep provider."
      }
    },
    {
      "@type": "Question",
      "name": "Do you work with new Amazon sellers?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. No setup fee and no monthly minimum to start. Per-unit pricing is tiered by monthly volume — tell us what you sell and how it arrives, and you'll have a quote the same day."
      }
    },
    {
      "@type": "Question",
      "name": "Can you prep directly out of my import container?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. We devan with a piece-count audit, flag damage with photos, prep what's sellable, and forward it to Amazon — one facility, one invoice."
      }
    },
    {
      "@type": "Question",
      "name": "What does Amazon require for polybags and labels?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Bags with a 5-inch or larger opening need a suffocation warning, barcodes must scan through the bag, and every unit needs its FNSKU. We treat Amazon's prep rules as production specs — it's how our clients avoid inbound defect fees."
      }
    },
    {
      "@type": "Question",
      "name": "Can inventory stay on bond before going to FBA?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes — that's our Class 3 designation. Duty is owed when goods enter for consumption, not while they sit here."
      }
    },
    {
      "@type": "Question",
      "name": "What kinds of products do you prep?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "General merchandise — including the oversize, heavy, and automotive product most prep centers refuse. We don't handle hazardous materials, cold-chain, or live animals. If you're not sure whether your product fits, call and we'll tell you straight."
      }
    }
  ]
};

export default function FbaPrepPage() {
  return (
    <>
      <script
        type="application/ld+json"
        id="service-jsonld"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        id="faq-jsonld"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        id="breadcrumb-jsonld"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
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
            <span style={{ color: colors.accent }}>FBA prep</span>
          </nav>

          <div style={eyebrow}>Amazon FBA prep · Port of Charleston</div>
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
            Amazon FBA Prep in Charleston, SC
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
            Amazon stopped prepping your inventory. We didn&rsquo;t.
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
            As of January 1, 2026, Amazon no longer labels, bags, or preps
            inventory at its fulfillment centers — everything you send must
            arrive prepped. We inspect, label, bag, bundle, and forward your
            product to Amazon&rsquo;s network, from the same dock where your
            container lands. Minutes from the Port of Charleston, inside a
            CBP Class 3 bonded warehouse.
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
            <FactCard label="Prep" value="Inspect, FNSKU, polybag" />
            <FactCard label="Inbound" value="Container, LTL, or parcel" />
            <FactCard label="Oversize" value="Accepted — our specialty" />
            <FactCard
              label="Bonded capable"
              value="Class 3 — store on bond"
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
            From your supplier to Amazon&rsquo;s network in four steps.
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
            Most prep centers are a middle stop. We&rsquo;re the first stop
            after the terminal — drayage, devan, prep, and forwarding from
            one crew, so nothing gets re-handled and nothing gets lost
            between vendors.
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
          <div style={eyebrow}>When C&amp;C is the right prep center</div>
          <h2
            style={{
              fontFamily: fonts.heading,
              fontSize: "clamp(26px, 3vw, 34px)",
              fontWeight: 700,
              marginTop: 10,
              maxWidth: 720,
            }}
          >
            Four situations where prepping in Charleston wins.
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
          <div style={eyebrow}>Capacity &amp; coverage</div>
          <h2
            style={{
              fontFamily: fonts.heading,
              fontSize: "clamp(26px, 3vw, 34px)",
              fontWeight: 700,
              marginTop: 10,
              maxWidth: 720,
            }}
          >
            What you get when you prep with us.
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
              label="Container to FC, one facility"
              body={
                <>
                  Your import lands at Wando Welch, NCT, or Leatherman. We
                  dray it, hand-unload it with a{" "}
                  <Link
                    href="/services/devanning"
                    style={{
                      color: colors.accent,
                      textDecoration: "underline",
                    }}
                  >
                    piece-count audit
                  </Link>
                  , prep it, and forward it — no second warehouse, no
                  freight leg between your devan provider and your prep
                  center.
                </>
              }
            />
            <CapCard
              label="The freight others won't take"
              body="Oversize, heavy, and awkward is our normal. Auto parts, hardware, industrial goods — the product garage prep centers refuse is the product we've racked for 25+ years."
            />
            <CapCard
              label="Bonded storage behind the prep line"
              body={
                <>
                  CBP Class 3 designation means imported inventory can sit
                  on bond — duty deferred — until you&rsquo;re ready to feed
                  it into FBA. Almost no prep center in the country can
                  offer this. See{" "}
                  <Link
                    href="/services/bonded-storage"
                    style={{
                      color: colors.accent,
                      textDecoration: "underline",
                    }}
                  >
                    bonded storage
                  </Link>
                  .
                </>
              }
            />
            <CapCard
              label="Documentation"
              body="Receiving against your packing list with photographed exceptions, live counts in the customer portal, and shipment-level confirmation before anything tenders to Amazon."
            />
            <CapCard
              label="Forwarding"
              body="Carton or pallet forwarding, labeled and tendered on Amazon partnered-carrier rates. Signed tally the same day it ships."
            />
            <CapCard
              label="Cargo insurance"
              body={
                <>
                  Warehouse legal liability and cargo coverage on stored
                  inventory — limits at $2,000,000.
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
            Questions Amazon sellers usually ask first.
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
          <div style={eyebrow}>Selling on Amazon?</div>
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
            Your container is already coming to Charleston. Your prep center
            should be here too.
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
              <Fact label="Setup fee" value="None" />
              <Fact label="Monthly minimum" value="None to start" />
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
