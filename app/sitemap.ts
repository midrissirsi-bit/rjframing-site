import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.rjframing.ca";
  const lastModified = new Date();

  // Single-page site: search engines ignore #fragment URLs, so the homepage is
  // the only real indexable URL. (Listing #anchors as separate URLs is a no-op.)
  return [
    { url: `${base}/`, lastModified, changeFrequency: "monthly", priority: 1.0 },
  ];
}
