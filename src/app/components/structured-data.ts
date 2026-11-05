import {
  business,
  businessHours,
  hanahanLocation,
  hanahanOperatingLine,
  ladsonLocation,
  ladsonOperatingLine,
} from "./styles";

export const areaServed = [
  { "@type": "City", name: "Charleston" },
  { "@type": "City", name: "North Charleston" },
  { "@type": "City", name: "Mount Pleasant" },
  { "@type": "City", name: "Ladson" },
  { "@type": "City", name: "Hanahan" },
  { "@type": "AdministrativeArea", name: "South Carolina" },
];

export function openingHoursSpecification() {
  return [
    {
      "@type": "OpeningHoursSpecification" as const,
      dayOfWeek: businessHours.dayOfWeek,
      opens: businessHours.opens,
      closes: businessHours.closes,
    },
  ];
}

export function postalAddress(loc: {
  street: string;
  city: string;
  state: string;
  postal: string;
}) {
  return {
    "@type": "PostalAddress" as const,
    streetAddress: loc.street,
    addressLocality: loc.city,
    addressRegion: loc.state,
    postalCode: loc.postal,
    addressCountry: "US",
  };
}

export function geoCoordinates(geo: { latitude: number; longitude: number }) {
  return {
    "@type": "GeoCoordinates" as const,
    latitude: geo.latitude,
    longitude: geo.longitude,
  };
}

// Both buildings are locations of the same organization. Service pages
// and the root graph point at these @ids; do not rename them.
export function facilityRefs(siteUrl: string) {
  return [
    { "@id": `${siteUrl}/#facility-ladson` },
    { "@id": `${siteUrl}/#facility-hanahan` },
  ];
}

function organizationRef(siteUrl: string) {
  return { "@id": `${siteUrl}/#organization` };
}

// Ladson branch. @id matches the node the root layout has always emitted.
// url and mainEntityOfPage point at the dedicated Ladson page. Warehouse
// is the Place type for this building. branchOf and parentOrganization
// both point at the legal entity so the building is a location of the
// business, not a separate company.
export function ladsonBranchJsonLd(siteUrl: string) {
  const pageUrl = `${siteUrl}${ladsonLocation.path}`;
  return {
    "@type": ["LocalBusiness", "Place", "Warehouse"] as [
      "LocalBusiness",
      "Place",
      "Warehouse",
    ],
    "@id": `${siteUrl}/#facility-ladson`,
    name: `${business.name} — Ladson Facility`,
    description: ladsonOperatingLine,
    url: pageUrl,
    mainEntityOfPage: { "@id": `${pageUrl}#webpage` },
    telephone: business.phone,
    email: business.email,
    image: `${siteUrl}${ladsonLocation.image}`,
    priceRange: "$$",
    address: postalAddress(ladsonLocation),
    geo: geoCoordinates(ladsonLocation.geo),
    openingHoursSpecification: openingHoursSpecification(),
    branchOf: organizationRef(siteUrl),
    parentOrganization: organizationRef(siteUrl),
    areaServed,
  };
}

// Hanahan branch. @id matches the node the root layout has always emitted.
// url and mainEntityOfPage point at the dedicated Hanahan page. Warehouse
// is the Place type for this building. branchOf and parentOrganization
// both point at the legal entity so the building is a location of the
// business, not a separate company.
export function hanahanBranchJsonLd(siteUrl: string) {
  const pageUrl = `${siteUrl}${hanahanLocation.path}`;
  return {
    "@type": ["LocalBusiness", "Place", "Warehouse"] as [
      "LocalBusiness",
      "Place",
      "Warehouse",
    ],
    "@id": `${siteUrl}/#facility-hanahan`,
    name: `${business.name} — Hanahan Facility`,
    description: hanahanOperatingLine,
    url: pageUrl,
    mainEntityOfPage: { "@id": `${pageUrl}#webpage` },
    telephone: business.phone,
    email: business.email,
    image: `${siteUrl}${hanahanLocation.image}`,
    priceRange: "$$",
    address: postalAddress(hanahanLocation),
    geo: geoCoordinates(hanahanLocation.geo),
    openingHoursSpecification: openingHoursSpecification(),
    branchOf: organizationRef(siteUrl),
    parentOrganization: organizationRef(siteUrl),
    areaServed,
  };
}

// Page graph for one location URL. The WebPage names that building as
// its main entity, and the breadcrumb uses the city query as the current
// crumb so it matches the visible trail.
export function locationPageJsonLd(
  siteUrl: string,
  which: "ladson" | "hanahan",
  page: { name: string; description: string },
) {
  const location = which === "ladson" ? ladsonLocation : hanahanLocation;
  const branch =
    which === "ladson"
      ? ladsonBranchJsonLd(siteUrl)
      : hanahanBranchJsonLd(siteUrl);
  const pageUrl = `${siteUrl}${location.path}`;
  const pageId = `${pageUrl}#webpage`;
  const breadcrumbId = `${pageUrl}#breadcrumb`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": pageId,
        url: pageUrl,
        name: page.name,
        description: page.description,
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": branch["@id"] },
        mainEntity: { "@id": branch["@id"] },
        breadcrumb: { "@id": breadcrumbId },
        primaryImageOfPage: {
          "@type": "ImageObject",
          url: `${siteUrl}${location.image}`,
        },
        inLanguage: "en-US",
      },
      {
        "@type": "BreadcrumbList",
        "@id": breadcrumbId,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Facility",
            item: `${siteUrl}/facility`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: location.query,
            item: pageUrl,
          },
        ],
      },
      branch,
    ],
  };
}
