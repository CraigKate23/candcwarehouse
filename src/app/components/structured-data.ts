import {
  business,
  businessHours,
  guides,
  guidesPath,
  hanahanLocation,
  hanahanOperatingLine,
  ladsonLocation,
  ladsonOperatingLine,
  locationsPath,
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
// its main entity, and the breadcrumb matches the visible trail:
// Home, then Locations, then this page.
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
            name: "Locations",
            item: `${siteUrl}${locationsPath}`,
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

// Hub for both buildings. ItemList entries point at the facility @ids
// the root layout already emits, so this graph does not repeat those nodes.
export function locationsHubJsonLd(
  siteUrl: string,
  page: { name: string; description: string; listName: string },
) {
  const pageUrl = `${siteUrl}${locationsPath}`;
  const pageId = `${pageUrl}#webpage`;
  const breadcrumbId = `${pageUrl}#breadcrumb`;
  const listId = `${pageUrl}#locations`;
  const [ladsonRef, hanahanRef] = facilityRefs(siteUrl);
  const items = [
    { location: ladsonLocation, ref: ladsonRef },
    { location: hanahanLocation, ref: hanahanRef },
  ];
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
        about: items.map((item) => item.ref),
        mainEntity: { "@id": listId },
        breadcrumb: { "@id": breadcrumbId },
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
            name: "Locations",
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "ItemList",
        "@id": listId,
        name: page.listName,
        numberOfItems: items.length,
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.location.query,
          item: item.ref,
        })),
      },
    ],
  };
}

// Hub for the importer guides. ItemList entries are the guide URLs from
// `guides`, so a guide added there is included here without a second list.
export function guidesHubJsonLd(
  siteUrl: string,
  page: { name: string; description: string; listName: string },
) {
  const pageUrl = `${siteUrl}${guidesPath}`;
  const pageId = `${pageUrl}#webpage`;
  const breadcrumbId = `${pageUrl}#breadcrumb`;
  const listId = `${pageUrl}#guides`;
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
        about: organizationRef(siteUrl),
        mainEntity: { "@id": listId },
        breadcrumb: { "@id": breadcrumbId },
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
            name: "Guides",
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "ItemList",
        "@id": listId,
        name: page.listName,
        numberOfItems: guides.length,
        itemListElement: guides.map((guide, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: guide.title,
          item: `${siteUrl}${guide.path}`,
        })),
      },
    ],
  };
}
