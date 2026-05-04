import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
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
