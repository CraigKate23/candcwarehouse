import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Old Squarespace paths → new equivalents.
      // Keeps Google rankings and bookmarks alive after cutover.
      {
        source: "/project-gallery-page",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/get-a-quote",
        destination: "/quote",
        permanent: true,
      },
      {
        source: "/new-page",
        destination: "/",
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
