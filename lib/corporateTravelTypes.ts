export type CorporateTripSlug =
  | "zhangjiajie-4-day-team-trip"
  | "shanghai-suzhou-4-day-company-retreat";

/** Published company-page editions share the same two programmes. */
export type CorporateLocale = "en" | "zh" | "ko" | "ja" | "es" | "fr" | "de" | "ar";
export const corporateLocales: readonly CorporateLocale[] = ["en", "zh", "ko", "ja", "es", "fr", "de", "ar"];

export interface CorporateImage {
  src: string;
  alt: string;
  caption: string;
}
export interface CorporateFaq { question: string; answer: string }
export interface CorporateTrip {
  slug: CorporateTripSlug;
  title: string;
  seoTitle: string;
  description: string;
  eyebrow: string;
  lede: string;
  duration: string;
  groupSize: string;
  base: string;
  format: string;
  hero: CorporateImage;
  storyTitle: string;
  story: string;
  highlights: { title: string; text: string }[];
  days: {
    title: string;
    place: string;
    summary: string;
    details: string[];
    image: CorporateImage;
  }[];
  stay: { title: string; body: string; details: string[] };
  scope: string[];
  options: string[];
  notIncluded: string[];
  planningNotes: { title: string; body: string }[];
  faqs: CorporateFaq[];
  relatedGuides: { href: string; label: string }[];
}
export const corporateHubPath = "/corporate-travel/";
export function corporateTripPath(slug: CorporateTripSlug) {
  return `${corporateHubPath}${slug}/`;
}
export function corporateHubPathFor(locale: CorporateLocale) {
  return locale === "en" ? corporateHubPath : `/${locale}${corporateHubPath}`;
}
export function corporateTripPathFor(locale: CorporateLocale, slug: CorporateTripSlug) {
  return `${corporateHubPathFor(locale)}${slug}/`;
}

