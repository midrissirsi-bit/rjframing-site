import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.rjframing.ca";
  const lastModified = new Date();

  return [
    { url: `${base}/`, lastModified, changeFrequency: "monthly", priority: 1.0 },
    { url: `${base}/#services`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/#process`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/#work`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/#about`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/#contact`, lastModified, changeFrequency: "monthly", priority: 0.9 },
  ];
}
