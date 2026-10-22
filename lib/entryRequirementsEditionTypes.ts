/** Guides listed by the English entry hub (the "entry-rules" pillar). */
export const entryRequirementsGuideIds = [
  "do-us-citizens-need-visa-china-2026",
  "china-240-hour-visa-free-transit-route-check",
  "do-singaporeans-need-visa-china",
  "china-visa-free-uk-citizens-2026",
  "china-visa-free-canadian-citizens-2026",
  "china-visa-free-new-zealand-citizens-2026",
] as const;
export type EntryRequirementsGuideId = (typeof entryRequirementsGuideIds)[number];

/**
 * One full translation of /guides/china-entry-requirements/. Sections follow
 * the English page in the same order; `{date}` is replaced by a formatted date.
 */
export interface EntryRequirementsEditionCopy {
  readonly dateLocale: string;
  readonly openGraphLocale: string;
  readonly metadata: { readonly title: string; readonly description: string; readonly socialImageAlt: string };
  readonly skipLink: string;
  readonly breadcrumb: { readonly label: string; readonly home: string; readonly guides: string; readonly current: string };
  readonly hero: { readonly eyebrow: string; readonly title: string; readonly lead: string; readonly boundary: string };
  readonly checks: {
    readonly label: string;
    readonly intro: string;
    readonly items: readonly { readonly title: string; readonly detail: string }[];
  };
  readonly collection: {
    readonly eyebrow: string;
    readonly title: string;
    readonly body: string;
    readonly latestReview: string;
    /** Card date line, e.g. "checked {date}". */
    readonly checked: string;
    /** Card action for a guide only published in English, so it carries the page's English marker. */
    readonly readEnglishGuide: string;
    /** Card action for a guide published in the page's own language (Chinese and Korean). */
    readonly readGuide?: string;
  };
  readonly ruleTypes: {
    readonly eyebrow: string;
    readonly title: string;
    readonly items: readonly { readonly marker: string; readonly title: string; readonly body: string }[];
  };
  readonly protocol: { readonly eyebrow: string; readonly title: string; readonly items: readonly string[] };
  readonly cta: { readonly eyebrow: string; readonly title: string; readonly body: string; readonly action: string };
  readonly guides: Readonly<Record<EntryRequirementsGuideId, {
    readonly label: string;
    readonly headline: string;
    readonly description: string;
    readonly imageAlt: string;
  }>>;
}
