"use client";

import Link from "next/link";
import { business, colors, container, fonts } from "./styles";

export default function Footer() {
  return (
    <footer
      style={{
        marginTop: 120,
        borderTop: `1px solid ${colors.line}`,
        background: colors.paperDeep,
      }}
    >
      <div
        style={{
          ...container,
          padding: "48px 24px 32px",
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr 1fr 1fr",
          gap: 32,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: fonts.heading,
              fontSize: 18,
              fontWeight: 700,
              color: colors.ink,
            }}
          >
            {business.name}
          </div>
          <p
            style={{
              fontFamily: fonts.body,
              fontSize: 14,
              lineHeight: 1.6,
              color: colors.steel,
              margin: "10px 0 0",
              maxWidth: 320,
            }}
          >
            Family-run US Customs Bonded & General Order warehouse near the
            Port of Charleston. Serving importers since {business.foundedYear}.
          </p>
        </div>

        <FooterCol title="Company">
          <FooterLink href="/about">About</FooterLink>
          <FooterLink href="/facility">Facility</FooterLink>
          <FooterLink href="/services">Services</FooterLink>
        </FooterCol>

        <FooterCol title="Work with us">
          <FooterLink href="/quote">Request a quote</FooterLink>
          <FooterLink href="/portal">Customer portal</FooterLink>
          <FooterLink href={`mailto:${business.email}`}>
            {business.email}
          </FooterLink>
        </FooterCol>

        <FooterCol title="Visit">
          <div
            style={{
              fontFamily: fonts.body,
              fontSize: 14,
              color: colors.steel,
              lineHeight: 1.6,
            }}
          >
            {business.city}, {business.state}
            <br />
            {business.phoneDisplay}
          </div>
        </FooterCol>
      </div>

      <div
        style={{
          borderTop: `1px solid ${colors.line}`,
          padding: "18px 24px",
        }}
      >
        <div
          style={{
            ...container,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontFamily: fonts.mono,
            fontSize: 12,
            letterSpacing: "0.08em",
            color: colors.steel,
            textTransform: "uppercase",
          }}
        >
          <span>
            &copy; {new Date().getFullYear()} {business.legalName}
          </span>
          <span>US Customs Bonded &middot; General Order</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div
        style={{
          fontFamily: fonts.mono,
          fontSize: 11,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: colors.accent,
          marginBottom: 10,
        }}
      >
        {title}
      </div>
      <div style={{ display: "grid", gap: 6 }}>{children}</div>
    </div>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      style={{
        fontFamily: fonts.body,
        fontSize: 14,
        color: colors.steel,
        textDecoration: "none",
      }}
      className="footer-link"
    >
      {children}
    </Link>
  );
}
