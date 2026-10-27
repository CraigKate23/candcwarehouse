import Link from "next/link";
import type { ReactNode } from "react";
import { colors, ladsonLocation } from "./styles";

export function LadsonLink({ children }: { children: ReactNode }) {
  return (
    <Link
      href={ladsonLocation.path}
      style={{ color: colors.accent, textDecoration: "underline" }}
    >
      {children}
    </Link>
  );
}
