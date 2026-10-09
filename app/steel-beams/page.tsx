import type { Metadata } from "next";
import { ServicePage } from "@/components/service-page";
import { getService } from "@/lib/services";

const s = getService("steel-beams");

export const metadata: Metadata = {
  title: s.metaTitle,
  description: s.metaDescription,
  alternates: { canonical: `https://www.rjframing.ca/${s.slug}` },
  openGraph: {
    title: s.metaTitle,
    description: s.metaDescription,
    url: `https://www.rjframing.ca/${s.slug}`,
    type: "website",
    locale: "en_CA",
    siteName: "RJ Framing Inc.",
    images: [{ url: `https://www.rjframing.ca${s.hero.img}`, alt: s.hero.alt }],
  },
};

export default function Page() {
  return <ServicePage service={s} />;
}