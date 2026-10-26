import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Apex → www. permanent (308). Vercel's domain setting can still
      // answer with a 307 before this rule runs; if a crawl still shows
      // 307, that dashboard redirect has to change. This rule is what
      // Next.js emits when the request reaches the app.
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "candcwarehouse.com",
          },
        ],
        destination: "https://www.candcwarehouse.com/:path*",
        permanent: true,
      },
      // Old Squarespace paths → new equivalents.
      // Keeps Google rankings and bookmarks alive after cutover.
      // /summery was ranking #2 for "customs bonded warehouse Charleston SC"
      {
        source: "/summery",
        destination: "/",
        permanent: true,
      },
      {
        source: "/project-gallery-page",
        destination: "/facility",
        permanent: true,
      },
      {
        source: "/project-gallery",
        destination: "/facility",
        permanent: true,
      },
      {
        source: "/get-a-quote",
        destination: "/quote",
        permanent: true,
      },
      {
        source: "/new-page",
        destination: "/quote",
        permanent: true,
      },
      {
        source: "/status-update",
        destination: "https://portal.candcwarehouse.com",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
