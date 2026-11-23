import { NextRequest, NextResponse } from "next/server";

const PRODUCTION_HOST = "www.candcwarehouse.com";

/**
 * Redirect the public Vercel alias and production deployment URLs
 * to www so Google does not index a duplicate host. Branch previews
 * (VERCEL_ENV=preview) are not redirected; Vercel Authentication
 * already covers them, and redirecting them showed production instead
 * of the branch.
 *
 * Apex (candcwarehouse.com) → www is a permanent redirect. next.config.ts
 * emits 308 when the request reaches Next.js. This middleware repeats
 * that 308 in case the request is handled here first. Vercel's domain
 * setting can still answer with 307 before either of those runs.
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

  // The public project alias (candcwarehouse.vercel.app) and production
  // deployment URLs are duplicates of www. Branch previews set
  // VERCEL_ENV=preview and are already behind Vercel Authentication, so
  // they stay on their own host — otherwise the PR preview link sends
  // reviewers to production.
  if (
    hostname.endsWith(".vercel.app") &&
    process.env.VERCEL_ENV !== "preview"
  ) {
    return NextResponse.redirect(
      `https://${PRODUCTION_HOST}${pathname}${search}`,
      308
    );
  }

  // Apex → www. 308 matches the permanent redirect in next.config.ts.
  if (hostname === "candcwarehouse.com") {
    return NextResponse.redirect(
      `https://${PRODUCTION_HOST}${pathname}${search}`,
      308
    );
  }

  return NextResponse.next();
}

export const config = {
  // Run on all paths except Next.js internals and static files
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
