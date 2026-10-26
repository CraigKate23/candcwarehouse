import Link from "next/link";
import type { ReactNode } from "react";
import {
  business,
  buttonPrimary,
  buttonSecondary,
  cardStyle,
  colors,
  container,
  eyebrow,
  fonts,
} from "./styles";

export function JsonLd({ id, data }: { id: string; data: unknown }) {
  return (
    <script
      type="application/ld+json"
      id={id}
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function ServiceHero({
  crumb,
  eyebrowText,
  title,
  slogan,
  lede,
}: {
  crumb: string;
  eyebrowText: string;
  title: string;
  slogan: string;
  lede: ReactNode;
}) {
  return (
    <section
      style={{
        padding: "88px 0 56px",
        background: "linear-gradient(180deg, #fafaf7 0%, #f3efe7 100%)",
        borderBottom: `1px solid ${colors.line}`,
      }}
    >
      <div style={container}>
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
          <Link href="/services" style={{ color: colors.steel, textDecoration: "none" }}>
            Services
          </Link>
          <span style={{ margin: "0 10px", color: colors.line }}>/</span>
          <span style={{ color: colors.accent }}>{crumb}</span>
        </nav>

        <div style={eyebrow}>{eyebrowText}</div>
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
          {title}
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
          {slogan}
        </p>
        <div
          style={{
            fontFamily: fonts.body,
            fontSize: 18,
            lineHeight: 1.65,
            color: colors.steel,
            marginTop: 18,
            maxWidth: 760,
          }}
        >
          {lede}
        </div>

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
  );
}

export function FactStrip({
  items,
}: {
  items: { label: string; value: string }[];
}) {
  return (
    <section style={{ padding: "48px 0 16px" }}>
      <div style={container}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 18,
          }}
        >
          {items.map((item) => (
            <div
              key={item.label}
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
                {item.label}
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
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function StepGrid({
  eyebrowText,
  title,
  lede,
  steps,
}: {
  eyebrowText: string;
  title: string;
  lede: string;
  steps: { n: string; title: string; body: string }[];
}) {
  return (
    <section style={{ padding: "56px 0" }}>
      <div style={container}>
        <div style={eyebrow}>{eyebrowText}</div>
        <h2
          style={{
            fontFamily: fonts.heading,
            fontSize: "clamp(26px, 3vw, 34px)",
            fontWeight: 700,
            marginTop: 10,
            maxWidth: 720,
          }}
        >
          {title}
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
          {lede}
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
          {steps.map((s) => (
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
  );
}

export function CardGrid({
  eyebrowText,
  title,
  items,
  tone = "paper",
}: {
  eyebrowText: string;
  title: string;
  items: { label: string; body: ReactNode }[];
  tone?: "paper" | "deep";
}) {
  const sectionStyle =
    tone === "deep"
      ? {
          padding: "56px 0",
          background: colors.paperDeep,
          borderTop: `1px solid ${colors.line}`,
          borderBottom: `1px solid ${colors.line}`,
        }
      : { padding: "56px 0" };

  return (
    <section style={sectionStyle}>
      <div style={container}>
        <div style={eyebrow}>{eyebrowText}</div>
        <h2
          style={{
            fontFamily: fonts.heading,
            fontSize: "clamp(26px, 3vw, 34px)",
            fontWeight: 700,
            marginTop: 10,
            maxWidth: 720,
          }}
        >
          {title}
        </h2>
        <div
          style={{
            marginTop: 28,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 18,
          }}
        >
          {items.map((item) => (
            <div
              key={item.label}
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
                {item.label}
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
                {item.body}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FaqList({
  title,
  items,
}: {
  title: string;
  items: { q: string; a: string }[];
}) {
  return (
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
          {title}
        </h2>
        <div
          style={{
            marginTop: 28,
            display: "grid",
            gap: 14,
            maxWidth: 880,
          }}
        >
          {items.map((f) => (
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
              <p
                style={{
                  fontFamily: fonts.body,
                  fontSize: 15,
                  lineHeight: 1.65,
                  color: colors.steel,
                  marginTop: 12,
                  marginBottom: 0,
                }}
              >
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServiceClose({
  eyebrowText,
  title,
}: {
  eyebrowText: string;
  title: string;
}) {
  return (
    <section
      style={{
        padding: "72px 0 88px",
        background: colors.paper,
        borderTop: `1px solid ${colors.line}`,
      }}
    >
      <div style={{ ...container, textAlign: "center" }}>
        <div style={eyebrow}>{eyebrowText}</div>
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
          {title}
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
          <a
            href={`tel:${business.phone}`}
            className="cta-secondary"
            style={buttonSecondary}
          >
            Call {business.phoneDisplay}
          </a>
          <Link href="/services" className="cta-secondary" style={buttonSecondary}>
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
            <Fact label="Location" value={`${business.city}, ${business.state}`} />
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

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

export function serviceJsonLd({
  path,
  serviceType,
  name,
  audience,
}: {
  path: string;
  serviceType: string;
  name: string;
  audience: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `https://www.candcwarehouse.com${path}#service`,
    serviceType,
    name,
    url: `https://www.candcwarehouse.com${path}`,
    provider: { "@id": "https://www.candcwarehouse.com/#localbusiness" },
    areaServed: [
      { "@type": "City", name: "Charleston" },
      { "@type": "City", name: "North Charleston" },
      { "@type": "City", name: "Mount Pleasant" },
      { "@type": "AdministrativeArea", name: "South Carolina" },
    ],
    audience: { "@type": "BusinessAudience", name: audience },
  };
}

export function breadcrumbJsonLd(crumb: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.candcwarehouse.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: "https://www.candcwarehouse.com/services",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: crumb,
        item: `https://www.candcwarehouse.com${path}`,
      },
    ],
  };
}
