import type { Metadata } from "next";
import "./globals.css";
import { LenisProvider } from "@/components/lenis-provider";

export const metadata: Metadata = {
  title: "RJ Framing — Rough Carpentry. Custom home framing & steel in the GTA.",
  description:
    "Custom home framing, additions, and structural steel installation across the Greater Toronto Area and Barrie. We take the framing other crews turn down — cantilevers, high-load steel, tight infill lots. 5+ years, 100% inspection pass.",
  metadataBase: new URL("https://www.rjframing.ca"),
  alternates: {
    canonical: "https://www.rjframing.ca/",
  },
  authors: [{ name: "RJ Framing Inc." }],
  keywords: [
    "framing contractor GTA",
    "custom home framing Toronto",
    "structural steel installation Ontario",
    "home addition framing Vaughan",
    "rough carpentry Barrie",
    "residential framer Aurora",
    "Richmond Hill framing crew",
  ],
  openGraph: {
    title: "RJ Framing — Rough Carpentry",
    description:
      "We frame what others can't. Custom homes, additions, structural steel. GTA & Barrie.",
    type: "website",
    locale: "en_CA",
    url: "https://www.rjframing.ca/",
    siteName: "RJ Framing Inc.",
    images: [
      {
        url: "https://www.rjframing.ca/wp-content/uploads/2025/05/DJI_20250323050347_0143_D-HDR.jpeg",
        width: 1200,
        height: 630,
        alt: "Drone view of a custom home framed by RJ Framing in southern Ontario",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RJ Framing — Rough Carpentry",
    description: "We frame what others can't.",
    images: [
      "https://www.rjframing.ca/wp-content/uploads/2025/05/DJI_20250323050347_0143_D-HDR.jpeg",
    ],
  },
  other: {
    "geo.region": "CA-ON",
    "geo.placename": "Greater Toronto Area",
    "geo.position": "43.6532;-79.3832",
    "ICBM": "43.6532, -79.3832",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  "@id": "https://www.rjframing.ca/#business",
  name: "RJ Framing Inc.",
  alternateName: "RJ Framing",
  image: "https://www.rjframing.ca/wp-content/uploads/2025/05/RJ-Framing-LOGO_4-300x169.jpg",
  logo: "https://www.rjframing.ca/wp-content/uploads/2025/05/RJ-Framing-LOGO_4-300x169.jpg",
  url: "https://www.rjframing.ca/",
  telephone: "+1-289-688-5951",
  email: "info@rjframing.ca",
  priceRange: "$$$",
  address: {
    "@type": "PostalAddress",
    addressRegion: "ON",
    addressCountry: "CA",
    addressLocality: "Greater Toronto Area",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 43.6532,
    longitude: -79.3832,
  },
  areaServed: [
    { "@type": "City", name: "Toronto" },
    { "@type": "City", name: "Vaughan" },
    { "@type": "City", name: "Aurora" },
    { "@type": "City", name: "Richmond Hill" },
    { "@type": "City", name: "Barrie" },
    { "@type": "AdministrativeArea", name: "Greater Toronto Area" },
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "19:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "08:00",
      closes: "14:00",
    },
  ],
  sameAs: ["https://www.instagram.com/rj.framing/"],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Framing Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Custom Home Framing",
          description:
            "Foundation-to-roof framing for new residential builds 2,000–8,000 sq ft across the GTA.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Home Additions",
          description:
            "Second-storey additions, rear extensions, kitchen blowouts with seamless tie-ins to existing structure.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Structural Steel Installation",
          description:
            "W-flange beams, columns, and moment frames installed to engineering spec for open-concept residential and commercial builds.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Commercial Framing",
          description:
            "Retail buildouts, office shells, and warehouse interiors. Fast, cost-controlled, on schedule.",
        },
      },
    ],
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "12",
    bestRating: "5",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-CA">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
