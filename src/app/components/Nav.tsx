"use client";

import Link from "next/link";
import { useState } from "react";
import { colors, container, fonts } from "./styles";

const links = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/facility", label: "Facility" },
  { href: "/portal", label: "Portal" },
];

export default function Nav() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 30,
        background: "rgba(250,250,247,0.85)",
        backdropFilter: "saturate(140%) blur(10px)",
        WebkitBackdropFilter: "saturate(140%) blur(10px)",
        borderBottom: `1px solid ${colors.line}`,
      }}
    >
      <div
        style={{
          ...container,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 64,
        }}
      >
        <Link
          href="/"
          style={{
            display: "inline-flex",
            alignItems: "baseline",
            gap: 10,
            textDecoration: "none",
            color: colors.ink,
          }}
        >
          <span
            style={{
              fontFamily: fonts.heading,
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: "-0.01em",
            }}
          >
            C&amp;C Warehouse
          </span>
          <span
            style={{
              fontFamily: fonts.mono,
              fontSize: 11,
              color: colors.accent,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}
          >
            Ladson, SC
          </span>
        </Link>

        <nav
          aria-label="Primary"
          style={{ display: "flex", alignItems: "center", gap: 28 }}
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onMouseEnter={() => setHovered(l.href)}
              onMouseLeave={() => setHovered(null)}
              style={{
                fontFamily: fonts.body,
                fontSize: 15,
                color: hovered === l.href ? colors.accent : colors.inkSoft,
                textDecoration: "none",
                transition: "color 120ms ease",
              }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/quote"
            style={{
              fontFamily: fonts.heading,
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: "0.01em",
              padding: "9px 18px",
              color: colors.paper,
              background: colors.ink,
              borderRadius: 8,
              textDecoration: "none",
            }}
          >
            Get a Quote
          </Link>
        </nav>
      </div>
    </header>
  );
}
