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
