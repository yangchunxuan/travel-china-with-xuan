import type { MetadataRoute } from "next";
import {
  getGuideEntry,
  getGuideLanguageUrls,
  guideIds,
} from "../lib/guideRegistry";
import {
  VISA_FREE_ENTRY_MODIFIED,
  VISA_FREE_ENTRY_URL,
} from "../lib/visaFreeEntry";

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
const guideHubLanguages = {
  en: `${base}/guides/`,
  ko: `${base}/ko/guides/`,
  "zh-Hans": `${base}/zh/guides/`,
  "x-default": `${base}/guides/`,
};
const itineraryReviewLanguages = {
  en: `${base}/china-itinerary-review/`,
  ko: `${base}/ko/china-itinerary-review/`,
  "zh-Hans": `${base}/zh/china-itinerary-review/`,
  "x-default": `${base}/china-itinerary-review/`,
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
      url: `${base}/guides/`,
      lastModified: "2026-07-23",
      changeFrequency: "weekly",
      priority: 0.8,
      alternates: { languages: guideHubLanguages },
    },
    {
      url: `${base}/zh/guides/`,
      lastModified: "2026-07-23",
      changeFrequency: "weekly",
      priority: 0.75,
      alternates: { languages: guideHubLanguages },
    },
    {
      url: `${base}/ko/guides/`,
      lastModified: "2026-07-23",
      changeFrequency: "weekly",
      priority: 0.75,
      alternates: { languages: guideHubLanguages },
    },
    {
      url: `${base}/china-itinerary-review/`,
      lastModified: "2026-07-22",
      changeFrequency: "monthly",
      priority: 0.65,
      alternates: { languages: itineraryReviewLanguages },
    },
    {
      url: VISA_FREE_ENTRY_URL,
      lastModified: VISA_FREE_ENTRY_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.75,
    },
    {
      url: `${base}/zh/china-itinerary-review/`,
      lastModified: "2026-07-22",
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: { languages: itineraryReviewLanguages },
    },
    {
      url: `${base}/ko/china-itinerary-review/`,
      lastModified: "2026-07-22",
      changeFrequency: "monthly",
      priority: 0.6,
      alternates: { languages: itineraryReviewLanguages },
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
