/**
 * Which tours and guides have a Spanish page. Kept apart from the Spanish
 * text so the modules that only need the hreflang link stay small; a test
 * holds this index to the Spanish copy and guide registries.
 */
export const spanishTourPageSlugs: readonly string[] = Object.freeze([
  "beijing-xian-shanghai-8-day-private-tour",
  "beijing-xian-zhangjiajie-guilin-shanghai-14-day-private-tour",
  "zhangjiajie-forest-4-day-private-tour",
  "guilin-yangshuo-5-day-private-tour",
]);

/** English guide id → its Spanish page. */
export const spanishGuidePathBySourceId: Readonly<Record<string, string>> = Object.freeze({
  "avatar-mountains-zhangjiajie": "/es/guias/montanas-de-avatar-china/",
  "yangshuo-china": "/es/guias/yangshuo-que-ver/",
});

/** English site pages that have a Spanish equivalent. */
export const spanishSitePagePathByEnglishPath: Readonly<Record<string, string>> = Object.freeze({
  "/": "/es/",
  "/tours/": "/es/tours/",
  "/guides/": "/es/guias/",
});

export function spanishTourPagePath(slug: string): string | undefined {
  return spanishTourPageSlugs.includes(slug) ? `/es/tours/${slug}/` : undefined;
}
