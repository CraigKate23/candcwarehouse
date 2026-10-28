import type { MetadataRoute } from "next";
import { hanahanLocation, ladsonLocation } from "./components/styles";

// List only routes that are actually live. As new pages ship (facility,
// portal, resources) they should be appended here with their own
// `lastModified` so search engines can pick them up.
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.candcwarehouse.com";

type Entry = {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

const ROUTES: Entry[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/services", changeFrequency: "monthly", priority: 0.9 },
  { path: "/services/bonded-storage", changeFrequency: "monthly", priority: 0.85 },
  { path: "/services/general-order", changeFrequency: "monthly", priority: 0.85 },
  { path: "/services/devanning", changeFrequency: "monthly", priority: 0.85 },
  { path: "/services/overweight-reworking", changeFrequency: "monthly", priority: 0.85 },
  { path: "/services/drayage", changeFrequency: "monthly", priority: 0.85 },
  { path: "/services/cross-dock", changeFrequency: "monthly", priority: 0.85 },
  { path: "/services/deconsolidation", changeFrequency: "monthly", priority: 0.85 },
  { path: "/services/wms", changeFrequency: "monthly", priority: 0.85 },
  { path: "/services/pick-pack", changeFrequency: "monthly", priority: 0.85 },
  { path: "/services/fba-prep", changeFrequency: "monthly", priority: 0.85 },
  { path: "/quote", changeFrequency: "monthly", priority: 0.9 },
  { path: ladsonLocation.path, changeFrequency: "monthly", priority: 0.85 },
  { path: hanahanLocation.path, changeFrequency: "monthly", priority: 0.85 },
  { path: "/facility", changeFrequency: "monthly", priority: 0.8 },
  { path: "/about", changeFrequency: "monthly", priority: 0.8 },
  { path: "/faq", changeFrequency: "monthly", priority: 0.6 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.7 },
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
