import type { MetadataRoute } from "next";
import { getIndexableManifestEntries } from "../lib/content-system/manifest";
import type { ContentManifestEntry } from "../lib/content-system/types";
import {
  absoluteManifestAlternates,
  searchPlatformManifest,
} from "../lib/searchPlatformManifest";

export const dynamic = "force-static";

const base = "https://homegroundchina.com";

function sitemapPriority(entry: ContentManifestEntry) {
  if (entry.contentId === "system-home") return entry.locale === "en" ? 1 : 0.8;
  if (entry.contentId === "system-guides") return entry.locale === "en" ? 0.8 : 0.75;
  if (entry.contentId === "system-entry-requirements") return 0.8;
  if (entry.contentId.startsWith("destination-")) {
    return entry.locale === "en" ? 0.78 : 0.73;
  }
  if (entry.contentId.startsWith("hub-")) return entry.locale === "en" ? 0.75 : 0.7;
  if (entry.contentId.startsWith("collection-")) return entry.locale === "en" ? 0.72 : 0.67;
  if (entry.contentId.startsWith("guide-")) return entry.locale === "en" ? 0.7 : 0.65;
  if (entry.contentId === "system-studio") return entry.locale === "en" ? 0.7 : 0.65;
  if (entry.contentId === "system-author-evan") return entry.locale === "en" ? 0.68 : 0.63;
  if (entry.contentId === "system-itinerary-review") return entry.locale === "en" ? 0.65 : 0.6;
  if (entry.contentId === "system-zhangjiajie-4-day-private-tour") {
    return entry.locale === "en" ? 0.75 : 0.7;
  }
  return 0.3;
}

function changeFrequency(entry: ContentManifestEntry) {
  if (
    entry.contentId === "system-home" ||
    entry.contentId === "system-guides" ||
    entry.contentId === "system-entry-requirements" ||
    entry.contentId === "system-zhangjiajie-4-day-private-tour" ||
    entry.contentId.startsWith("hub-") ||
    entry.contentId.startsWith("collection-") ||
    entry.contentId.startsWith("destination-")
  ) {
    return "weekly" as const;
  }
  return "monthly" as const;
}

/**
 * Sitemap lastmod is a public-change signal. A review can be newer without
 * changing the rendered document, so lastReviewed must not manufacture a
 * lastmod date. Build and deployment time are deliberately excluded too.
 */
export function sitemapLastModified(entry: ContentManifestEntry) {
  return entry.dates.dateModified ?? entry.dates.datePublished ?? undefined;
}

export default function sitemap(): MetadataRoute.Sitemap {
  return getIndexableManifestEntries(searchPlatformManifest).map((entry) => {
    const lastModified = sitemapLastModified(entry);

    return {
      url: `${base}${entry.canonicalPath}`,
      ...(lastModified ? { lastModified } : {}),
      changeFrequency: changeFrequency(entry),
      priority: sitemapPriority(entry),
      alternates: { languages: absoluteManifestAlternates(entry) },
    };
  });
}
