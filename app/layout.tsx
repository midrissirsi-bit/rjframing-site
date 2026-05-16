import type { Metadata } from "next";
import "./globals.css";
import { LenisProvider } from "@/components/lenis-provider";

export const metadata: Metadata = {
  title: "RJ Framing — Rough Carpentry. Big custom builds, framed right.",
  description:
    "Custom home framing, additions, and structural steel install across the GTA and Barrie. We take the framing other crews turn down.",
  metadataBase: new URL("https://www.rjframing.ca"),
  openGraph: {
    title: "RJ Framing — Rough Carpentry",
    description: "We frame what others can't. Custom homes, additions, structural steel. GTA & Barrie.",
    type: "website",
    url: "https://www.rjframing.ca/",
    images: [
      "https://www.rjframing.ca/wp-content/uploads/2025/05/DJI_20250323050347_0143_D-HDR.jpeg",
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
};

const schema = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: "RJ Framing Inc.",
  image: "https://www.rjframing.ca/wp-content/uploads/2025/05/RJ-Framing-LOGO_4-300x169.jpg",
  telephone: "+1-289-688-5951",
  email: "info@rjframing.ca",
  url: "https://www.rjframing.ca/",
  areaServed: ["Greater Toronto Area", "Barrie", "Ontario"],
  address: { "@type": "PostalAddress", addressRegion: "ON", addressCountry: "CA" },
  openingHours: ["Mo-Fr 08:00-19:00", "Sa 08:00-14:00"],
  sameAs: ["https://www.instagram.com/rj.framing/"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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
