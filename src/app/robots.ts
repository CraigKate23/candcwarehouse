import type { MetadataRoute } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://candcwarehouse.vercel.app";

// While we're on the vercel.app staging URL, tell crawlers they can index
// (the site is public and we want Lighthouse / SEO tools to be able to run
// against it). When Greg cuts over to candcwarehouse.com, NEXT_PUBLIC_SITE_URL
// in Vercel should be updated to the production domain and this file keeps
// pointing at the right canonical.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
