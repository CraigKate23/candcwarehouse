import type { Metadata, Viewport } from "next";
import { Space_Grotesk, IBM_Plex_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { business, ladsonLocation } from "./components/styles";
import {
  areaServed,
  geoCoordinates,
  hanahanBranchJsonLd,
  ladsonBranchJsonLd,
  openingHoursSpecification,
  postalAddress,
} from "./components/structured-data";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const dmMono = DM_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.candcwarehouse.com";

const HOME_TITLE =
  "Bonded & General Order Warehouse | Charleston, SC | C&C";

const OG_IMAGE = {
  url: "/images/og-default.jpg",
  width: 1200,
  height: 630,
  alt: "C&C Warehouse facility in Ladson, SC — US Customs Bonded & General Order warehousing near the Port of Charleston",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: HOME_TITLE,
    template: `%s · ${business.name}`,
  },
  description: business.metaDescription,
  applicationName: business.name,
  authors: [{ name: business.legalName }],
  keywords: [
    "US Customs Bonded Warehouse",
    "General Order warehouse",
    "Port of Charleston",
    "Ladson SC warehouse",
    "Hanahan SC warehouse",
    "bonded storage",
    "devanning",
    "drayage",
    "cross dock",
    "container reworking",
    "3PL Charleston",
  ],
  // Canonical is set per page. A sitewide canonical of "/" was inherited
  // by the 404 and told Google every unknown URL was the homepage.
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: business.name,
    title: HOME_TITLE,
    description: business.metaDescription,
    locale: "en_US",
    images: [OG_IMAGE],
  },
  twitter: {
    // title/description intentionally omitted so each route's own <title>
    // and description flow through to the Twitter card instead of a
    // generic sitewide string.
    card: "summary_large_image",
    images: [OG_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#fafaf7",
  width: "device-width",
  initialScale: 1,
};

// Two physical facilities — Ladson (primary) and Hanahan (secondary).
// Both are CBP Class 3 Bonded and GO-designated. Schema-wise we expose
// the parent Organization as the @id used across pages, with two
// LocalBusiness branches keyed by their street addresses. Service-level
// pages reference @id "#localbusiness" (the parent) as their provider so
// the Service schema doesn't need to repeat addresses.
const ORG_ID = `${SITE_URL}/#organization`;
const LOCAL_BIZ_ID = `${SITE_URL}/#localbusiness`;
const sharedKnowsAbout = [
  "US Customs Bonded Warehousing",
  "General Order Storage",
  "Container Devanning",
  "Overweight Container Reworking",
  "Drayage",
  "Cross-dock",
  "Deconsolidation",
  "Pick and Pack Fulfillment",
];

const ladsonBranch = ladsonBranchJsonLd(SITE_URL);
const hanahanBranch = hanahanBranchJsonLd(SITE_URL);

// Primary LocalBusiness node referenced by Service schema across the site
// as `provider`. Points at the Ladson address (the primary facility),
// with the Hanahan branch surfaced via `department` plus a separate
// Place node above.
const localBusinessNode = {
  "@type": ["LocalBusiness", "Organization"],
  "@id": LOCAL_BIZ_ID,
  name: business.name,
  legalName: business.legalName,
  description: business.metaDescription,
  url: SITE_URL,
  telephone: business.phone,
  email: business.email,
  foundingDate: `${business.foundedYear}`,
  image: `${SITE_URL}/images/og-default.jpg`,
  logo: `${SITE_URL}/images/og-default.jpg`,
  priceRange: "$$",
  address: postalAddress(ladsonLocation),
  geo: geoCoordinates(ladsonLocation.geo),
  openingHoursSpecification: openingHoursSpecification(),
  areaServed,
  knowsAbout: sharedKnowsAbout,
  department: [{ "@id": `${SITE_URL}/#facility-hanahan` }],
  parentOrganization: { "@id": ORG_ID },
};

const organizationNode = {
  "@type": "Organization",
  "@id": ORG_ID,
  name: business.legalName,
  url: SITE_URL,
  logo: `${SITE_URL}/images/og-default.jpg`,
  foundingDate: `${business.foundedYear}`,
  email: business.email,
  telephone: business.phone,
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: business.phone,
      email: business.email,
      areaServed: "US",
      availableLanguage: ["English"],
    },
  ],
};

const websiteNode = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: business.name,
  description: business.metaDescription,
  publisher: { "@id": ORG_ID },
  inLanguage: "en-US",
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    organizationNode,
    websiteNode,
    localBusinessNode,
    ladsonBranch,
    hanahanBranch,
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${ibmPlexSans.variable} ${dmMono.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
        />
        <Nav />
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
