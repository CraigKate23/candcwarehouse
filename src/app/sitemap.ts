import type { MetadataRoute } from "next";

// List only routes that are actually live. As new pages ship (services,
// about, facility, quote, portal, resources) they should be appended here
// with their own `lastModified` so search engines can pick them up.
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://candcwarehouse.vercel.app";

type Entry = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

const ROUTES: Entry[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
