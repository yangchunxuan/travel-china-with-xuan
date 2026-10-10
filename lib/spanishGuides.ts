// @ts-ignore Source-TypeScript tests require the explicit extension.
import { montanasDeAvatarChina } from "./spanish-guides/montanas-de-avatar-china.ts";
// @ts-ignore Source-TypeScript tests require the explicit extension.
import { visadoChinaEspanoles } from "./spanish-guides/visado-china-espanoles.ts";
// @ts-ignore Source-TypeScript tests require the explicit extension.
import { yangshuoQueVer } from "./spanish-guides/yangshuo-que-ver.ts";
import type { SpanishGuide } from "./spanishGuideTypes";

export type { SpanishGuide } from "./spanishGuideTypes";

/** Spanish guides, in the order the Spanish guides page lists them. */
export const spanishGuides: readonly SpanishGuide[] = Object.freeze([
  visadoChinaEspanoles,
  montanasDeAvatarChina,
  yangshuoQueVer,
]);

export function spanishGuidePath(slug: string): string {
  return `/es/guias/${slug}/`;
}

export function getSpanishGuide(slug: string): SpanishGuide | undefined {
  return spanishGuides.find((guide) => guide.slug === slug);
}

/** Spanish page of an English guide, if one exists (for hreflang). */
export function getSpanishGuidePathForSource(guideId: string): string | undefined {
  const guide = spanishGuides.find((candidate) => candidate.sourceGuideId === guideId);
  return guide ? spanishGuidePath(guide.slug) : undefined;
}

/** Guides that lead to a tour, in catalogue order. */
export function spanishGuidesForTour(tourSlug: string) {
  return spanishGuides
    .filter((guide) => guide.tourSlugs.includes(tourSlug))
    .map((guide) => ({ slug: guide.slug, path: spanishGuidePath(guide.slug), navTitle: guide.navTitle }));
}
