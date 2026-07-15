import { NextRequest, NextResponse } from "next/server";

const PRODUCTION_HOST = "www.candcwarehouse.com";

/**
 * Redirect any request hitting the Vercel preview domain
 * (candcwarehouse.vercel.app) to the canonical production URL.
 * This prevents Google from indexing the duplicate .vercel.app host.
 *
 * Also upgrades the bare apex (candcwarehouse.com) → www redirect
 * from Vercel's default 307 to a 301, which is better for SEO
 * consolidation.
 */
export function middleware(request: NextRequest) {
  const { hostname, pathname, search } = request.nextUrl;

  // Force HTTPS. Vercel normally upgrades http→https at the edge, but a
  // plain-HTTP 200 was observed on the homepage (2026-07-15 SEO report),
  // and Google has shown http:// C&C URLs in results. Belt-and-suspenders:
  // 301 anything that arrives over http to the canonical https host.
  const proto = request.headers.get("x-forwarded-proto");
  if (proto === "http") {
    return NextResponse.redirect(
      `https://${PRODUCTION_HOST}${pathname}${search}`,
      301
    );
  }

  // Redirect vercel.app preview domain → production (308 permanent)
  if (hostname.endsWith(".vercel.app")) {
    return NextResponse.redirect(
      `https://${PRODUCTION_HOST}${pathname}${search}`,
      308
    );
  }

  // Upgrade bare apex → www from 307 to 301
  if (hostname === "candcwarehouse.com") {
    return NextResponse.redirect(
      `https://${PRODUCTION_HOST}${pathname}${search}`,
      301
    );
  }

  return NextResponse.next();
}

export const config = {
  // Run on all paths except Next.js internals and static files
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
