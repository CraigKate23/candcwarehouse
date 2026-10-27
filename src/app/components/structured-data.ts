import {
  business,
  businessHours,
  hanahanLocation,
  ladsonLocation,
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

// Ladson branch. @id matches the node the root layout has always emitted.
// url points at the dedicated Ladson page. Place is included because this
// node is a physical facility, not only the parent organization.
export function ladsonBranchJsonLd(siteUrl: string) {
  return {
    "@type": ["LocalBusiness", "Place"] as ["LocalBusiness", "Place"],
    "@id": `${siteUrl}/#facility-ladson`,
    name: `${business.name} — Ladson Facility`,
    url: `${siteUrl}${ladsonLocation.path}`,
    telephone: business.phone,
    email: business.email,
    image: `${siteUrl}${ladsonLocation.image}`,
    priceRange: "$$",
    address: postalAddress(ladsonLocation),
    geo: geoCoordinates(ladsonLocation.geo),
    openingHoursSpecification: openingHoursSpecification(),
    branchOf: { "@id": `${siteUrl}/#organization` },
    areaServed,
  };
}

export function hanahanBranchJsonLd(siteUrl: string) {
  return {
    "@type": "LocalBusiness" as const,
    "@id": `${siteUrl}/#facility-hanahan`,
    name: `${business.name} — Hanahan Facility`,
    url: `${siteUrl}/facility`,
    telephone: business.phone,
    email: business.email,
    image: `${siteUrl}${hanahanLocation.image}`,
    priceRange: "$$",
    address: postalAddress(hanahanLocation),
    geo: geoCoordinates(hanahanLocation.geo),
    openingHoursSpecification: openingHoursSpecification(),
    branchOf: { "@id": `${siteUrl}/#organization` },
    areaServed,
  };
}
