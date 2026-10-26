import type { Metadata } from "next";
import Link from "next/link";
import {
  business,
  buttonPrimary,
  buttonSecondary,
  colors,
  container,
  eyebrow,
  fonts,
} from "./components/styles";

export const metadata: Metadata = {
  title: { absolute: "Page not found | C&C Warehouse" },
  description:
    "That page is not on the C&C Warehouse site. Browse services, or call (843) 818-2332.",
  robots: { index: false, follow: true },
  // Replace the layout alternates entirely so a homepage canonical cannot
  // be inherited by unmatched URLs.
  alternates: { canonical: null },
};

export default function NotFound() {
  return (
    <section
      style={{
        padding: "96px 0 72px",
        background: "linear-gradient(180deg, #fafaf7 0%, #f3efe7 100%)",
        borderBottom: `1px solid ${colors.line}`,
      }}
    >
      <div style={container}>
        <div style={eyebrow}>404</div>
        <h1
          style={{
            fontFamily: fonts.heading,
            fontSize: "clamp(36px, 5vw, 56px)",
            lineHeight: 1.08,
            fontWeight: 700,
            marginTop: 16,
            maxWidth: 720,
          }}
        >
          Page not found
        </h1>
        <p
          style={{
            fontFamily: fonts.body,
            fontSize: 18,
            lineHeight: 1.65,
            color: colors.steel,
            marginTop: 18,
            maxWidth: 640,
          }}
        >
          That address is not on this site. The link may be out of date, or
          the page may have moved. Bonded storage, General Order, and the
          rest of the work are still one phone call away.
        </p>
        <div
          style={{
            display: "flex",
            gap: 12,
            marginTop: 28,
            flexWrap: "wrap",
          }}
        >
          <Link href="/services" className="cta-primary" style={buttonPrimary}>
            Browse services
          </Link>
          <Link href="/contact" className="cta-secondary" style={buttonSecondary}>
            Contact
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
