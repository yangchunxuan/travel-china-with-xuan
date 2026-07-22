import type { MetadataRoute } from "next";
import {
  getGuideEntry,
  getGuideLanguageUrls,
  guideIds,
} from "../lib/guideRegistry";

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
const studioLanguages = {
  en: `${base}/studio/`,
  ko: `${base}/ko/studio/`,
  "zh-Hans": `${base}/zh/studio/`,
  "x-default": `${base}/studio/`,
};
const guideEntries = guideIds.flatMap((guideId) => {
  const languages = getGuideLanguageUrls(guideId);

  return (["en", "zh", "ko"] as const).map((locale) => {
    const guide = getGuideEntry(guideId, locale);

    return {
      url: guide.canonicalUrl,
      lastModified: guide.dateModified,
      changeFrequency: "monthly" as const,
      priority: locale === "en" ? 0.7 : 0.65,
      alternates: { languages },
    };
  });
});

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${base}/`,
      lastModified: "2026-07-22",
      changeFrequency: "weekly",
      priority: 1,
      alternates: { languages: homepageLanguages },
    },
    {
      url: `${base}/ko/`,
      lastModified: "2026-07-22",
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: { languages: homepageLanguages },
    },
    {
      url: `${base}/zh/`,
      lastModified: "2026-07-22",
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: { languages: homepageLanguages },
    },
    {
      url: `${base}/studio/`,
      lastModified: "2026-07-22",
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: { languages: studioLanguages },
    },
    {
      url: `${base}/zh/studio/`,
      lastModified: "2026-07-22",
      changeFrequency: "monthly",
      priority: 0.65,
      alternates: { languages: studioLanguages },
    },
    {
      url: `${base}/ko/studio/`,
      lastModified: "2026-07-22",
      changeFrequency: "monthly",
      priority: 0.65,
      alternates: { languages: studioLanguages },
    },
    {
      url: `${base}/china-itinerary-review/`,
      lastModified: "2026-07-22",
      changeFrequency: "monthly",
      priority: 0.65,
    },
    ...guideEntries,
    {
      url: `${base}/privacy/`,
      lastModified: "2026-07-22",
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
