import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const base = "https://homegroundchina.com";
const homepageLanguages = {
  en: `${base}/`,
  ko: `${base}/ko/`,
  "zh-Hans": `${base}/zh/`,
  "x-default": `${base}/`,
};
const privacyLanguages = {
  en: `${base}/privacy/`,
  ko: `${base}/ko/privacy/`,
  "zh-Hans": `${base}/zh/privacy/`,
  "x-default": `${base}/privacy/`,
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
    {
      url: `${base}/privacy/`,
      lastModified: "2026-07-19",
      changeFrequency: "monthly",
      priority: 0.3,
      alternates: { languages: privacyLanguages },
    },
    {
      url: `${base}/ko/privacy/`,
      lastModified: "2026-07-19",
      changeFrequency: "monthly",
      priority: 0.3,
      alternates: { languages: privacyLanguages },
    },
    {
      url: `${base}/zh/privacy/`,
      lastModified: "2026-07-19",
      changeFrequency: "monthly",
      priority: 0.3,
      alternates: { languages: privacyLanguages },
    },
  ];
}
