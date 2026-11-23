import { NextRequest, NextResponse } from "next/server";

const PRODUCTION_HOST = "www.candcwarehouse.com";

/**
 * Redirect the public Vercel alias (candcwarehouse.vercel.app) to www so
 * Google does not index a duplicate host. Branch aliases and deployment
 * URLs on this team stay put so a PR preview is the branch, not production.
 * Those hosts are recognized by name only. Do not read process.env here:
 * a runtime VERCEL_ENV read in this Edge middleware failed the Vercel build.
 *
 * Apex (candcwarehouse.com) → www is a permanent redirect. next.config.ts
 * emits 308 when the request reaches Next.js. This middleware repeats
 * that 308 in case the request is handled here first. Vercel's domain
 * setting can still answer with 307 before either of those runs.
 */

// candcwarehouse-git-<branch>-craigkate23s-projects.vercel.app
// candcwarehouse-<deployment>-craigkate23s-projects.vercel.app
// The public alias candcwarehouse.vercel.app does not use this suffix.
const TEAM_DEPLOYMENT_SUFFIX = "-craigkate23s-projects.vercel.app";

export function middleware(request: NextRequest) {
  const { hostname, pathname, search } = request.nextUrl;
  const host = hostname.toLowerCase();

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

  // Public *.vercel.app hosts → production. Team preview and deployment
  // hosts are the exception and are served as themselves.
  if (host.endsWith(".vercel.app") && !host.endsWith(TEAM_DEPLOYMENT_SUFFIX)) {
    return NextResponse.redirect(
      `https://${PRODUCTION_HOST}${pathname}${search}`,
      308
    );
  }

  // Apex → www. 308 matches the permanent redirect in next.config.ts.
  if (host === "candcwarehouse.com") {
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
