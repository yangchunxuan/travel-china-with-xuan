import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const base = "https://homegroundchina.com";
const homepageLanguages = {
  en: `${base}/`,
  ko: `${base}/ko/`,
  "zh-Hans": `${base}/zh/`,
  "x-default": `${base}/`,
};

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${base}/`,
      lastModified: "2026-07-18",
      changeFrequency: "weekly",
      priority: 1,
      alternates: { languages: homepageLanguages },
    },
    {
      url: `${base}/ko/`,
      lastModified: "2026-07-18",
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: { languages: homepageLanguages },
    },
    {
      url: `${base}/zh/`,
      lastModified: "2026-07-18",
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: { languages: homepageLanguages },
    },
  ];
}
