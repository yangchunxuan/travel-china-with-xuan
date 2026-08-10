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
  if (entry.contentId.startsWith("hub-")) return entry.locale === "en" ? 0.75 : 0.7;
  if (entry.contentId.startsWith("guide-")) return entry.locale === "en" ? 0.7 : 0.65;
  if (entry.contentId === "system-studio") return entry.locale === "en" ? 0.7 : 0.65;
  if (entry.contentId === "system-itinerary-review") return entry.locale === "en" ? 0.65 : 0.6;
  return 0.3;
}

function changeFrequency(entry: ContentManifestEntry) {
  if (
    entry.contentId === "system-home" ||
    entry.contentId === "system-guides" ||
    entry.contentId === "system-entry-requirements" ||
    entry.contentId.startsWith("hub-")
  ) {
    return "weekly" as const;
  }
  return "monthly" as const;
}

export default function sitemap(): MetadataRoute.Sitemap {
  return getIndexableManifestEntries(searchPlatformManifest).map((entry) => ({
    url: `${base}${entry.canonicalPath}`,
    lastModified:
      entry.dates.dateModified ?? entry.dates.datePublished ?? entry.dates.lastReviewed,
    changeFrequency: changeFrequency(entry),
    priority: sitemapPriority(entry),
    alternates: { languages: absoluteManifestAlternates(entry) },
  }));
}
