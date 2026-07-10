import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const base = "https://homegroundchina.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${base}/`,
      lastModified: "2026-07-11",
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/ko/`,
      lastModified: "2026-07-11",
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${base}/zh/`,
      lastModified: "2026-07-11",
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${base}/china-visa-free-uk-canada/`,
      lastModified: "2026-07-10",
      changeFrequency: "monthly",
      priority: 0.9,
    },
  ];
}
