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
  process.env.NEXT_PUBLIC_SITE_URL || "https://candcwarehouse.vercel.app";

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
  },
  twitter: {
    card: "summary_large_image",
    title: business.name,
    description: business.tagline,
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const localBusinessJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#localbusiness`,
    name: business.name,
    legalName: business.legalName,
    description: business.tagline,
    url: SITE_URL,
    telephone: business.phone,
    email: business.email,
    foundingDate: `${business.foundedYear}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: business.city,
      addressRegion: business.state,
      postalCode: business.postal,
      addressCountry: "US",
    },
    areaServed: [
      {
        "@type": "City",
        name: "Charleston",
      },
      {
        "@type": "AdministrativeArea",
        name: "South Carolina",
      },
    ],
    knowsAbout: [
      "US Customs Bonded Warehousing",
      "General Order Storage",
      "Container Devanning",
      "Overweight Container Reworking",
      "Drayage",
      "Cross-dock",
    ],
  };

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
