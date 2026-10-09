import type { MetadataRoute } from "next";
import { services } from "@/lib/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.rjframing.ca";
  const lastModified = new Date();

  // #fragment URLs aren't separate pages to a search engine, so only real routes are listed.
  return [
    { url: `${base}/`, lastModified, changeFrequency: "monthly", priority: 1.0 },
    ...services.map((s) => ({
      url: `${base}/${s.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
