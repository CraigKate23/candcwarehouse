import { NextRequest, NextResponse } from "next/server";

const PRODUCTION_HOST = "www.candcwarehouse.com";

/**
 * Redirect the public Vercel alias (candcwarehouse.vercel.app) to the
 * canonical production URL so Google does not index a duplicate host.
 * Branch aliases and deployment URLs for this team end in
 * "-craigkate23s-projects.vercel.app" and are served as themselves.
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

  // Public *.vercel.app hosts → production. The team suffix is the
  // branch alias and the deployment URL, which must stay on that host.
  if (
    hostname.endsWith(".vercel.app") &&
    !hostname.endsWith("-craigkate23s-projects.vercel.app")
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
