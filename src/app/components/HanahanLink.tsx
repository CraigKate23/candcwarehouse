import Link from "next/link";
import type { ReactNode } from "react";
import { colors, hanahanLocation } from "./styles";

export function HanahanLink({ children }: { children: ReactNode }) {
  return (
    <Link
      href={hanahanLocation.path}
      style={{ color: colors.accent, textDecoration: "underline" }}
    >
      {children}
    </Link>
  );
}
