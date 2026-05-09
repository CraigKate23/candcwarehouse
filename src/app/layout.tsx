import type { Metadata, Viewport } from "next";
import { Space_Grotesk, IBM_Plex_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { business } from "./components/styles";

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

const OG_IMAGE = {
  url: "/images/og-default.jpg",
  width: 1200,
  height: 630,
  alt: "C&C Warehouse facility in Ladson, SC — US Customs Bonded & General Order warehousing near the Port of Charleston",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${business.name} — Bonded & General Order Warehousing near the Port of Charleston`,
    template: `%s · ${business.name}`,
  },
  description: business.tagline,
  applicationName: business.name,
  authors: [{ name: business.legalName }],
  keywords: [
    "US Customs Bonded Warehouse",
    "General Order warehouse",
    "Port of Charleston",
    "Ladson SC warehouse",
    "bonded storage",
    "devanning",
    "drayage",
    "cross dock",
    "container reworking",
    "3PL Charleston",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: business.name,
    title: `${business.name} — Bonded & GO Warehousing, Port of Charleston`,
    description: business.tagline,
    locale: "en_US",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: business.name,
    description: business.tagline,
    images: [OG_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
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
const LADSON_ID = `${SITE_URL}/#facility-ladson`;
const HANAHAN_ID = `${SITE_URL}/#facility-hanahan`;

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

const sharedAreaServed = [
  { "@type": "City", name: "Charleston" },
  { "@type": "City", name: "North Charleston" },
  { "@type": "City", name: "Mount Pleasant" },
  { "@type": "City", name: "Ladson" },
  { "@type": "City", name: "Hanahan" },
  { "@type": "AdministrativeArea", name: "South Carolina" },
];

const sharedHours = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "08:00",
    closes: "17:00",
  },
];

const ladsonBranch = {
  "@type": "LocalBusiness",
  "@id": LADSON_ID,
  name: `${business.name} — Ladson Facility`,
  url: `${SITE_URL}/facility`,
  telephone: business.phone,
  email: business.email,
  image: `${SITE_URL}/images/facility-exterior.webp`,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "137 Acres Drive",
    addressLocality: "Ladson",
    addressRegion: "SC",
    postalCode: "29456",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 32.9837,
    longitude: -80.1062,
  },
  openingHoursSpecification: sharedHours,
  branchOf: { "@id": ORG_ID },
  areaServed: sharedAreaServed,
};

const hanahanBranch = {
  "@type": "LocalBusiness",
  "@id": HANAHAN_ID,
  name: `${business.name} — Hanahan Facility`,
  url: `${SITE_URL}/facility`,
  telephone: business.phone,
  email: business.email,
  image: `${SITE_URL}/images/facility-interior.webp`,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1014 Northpointe Industrial Blvd",
    addressLocality: "Hanahan",
    addressRegion: "SC",
    postalCode: "29410",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 32.9182,
    longitude: -79.9928,
  },
  openingHoursSpecification: sharedHours,
  branchOf: { "@id": ORG_ID },
  areaServed: sharedAreaServed,
};

// Primary LocalBusiness node referenced by Service schema across the site
// as `provider`. Points at the Ladson address (the primary facility),
// with the Hanahan branch surfaced via `department` plus a separate
// Place node above.
const localBusinessNode = {
  "@type": ["LocalBusiness", "Organization"],
  "@id": LOCAL_BIZ_ID,
  name: business.name,
  legalName: business.legalName,
  description: business.tagline,
  url: SITE_URL,
  telephone: business.phone,
  email: business.email,
  foundingDate: `${business.foundedYear}`,
  image: `${SITE_URL}/images/og-default.jpg`,
  logo: `${SITE_URL}/images/og-default.jpg`,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "137 Acres Drive",
    addressLocality: "Ladson",
    addressRegion: "SC",
    postalCode: "29456",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 32.9837,
    longitude: -80.1062,
  },
  openingHoursSpecification: sharedHours,
  areaServed: sharedAreaServed,
  knowsAbout: sharedKnowsAbout,
  department: [{ "@id": HANAHAN_ID }],
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
  description: business.tagline,
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
