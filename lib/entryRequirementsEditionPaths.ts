/**
 * The China entry hub and its full translations. Kept apart from the
 * translated text so client chrome and the sitemap import paths only.
 */
export const entryRequirementsEnglishPath = "/guides/china-entry-requirements/";
export const entryRequirementsEditionLocales = ["ja", "fr", "es", "de", "ar"] as const;
export type EntryRequirementsEditionLocale = (typeof entryRequirementsEditionLocales)[number];
/** Chinese and Korean, inside the main site's own header and footer. */
export const entryRequirementsLocalizedLocales = ["zh", "ko"] as const;
export type EntryRequirementsLocalizedLocale = (typeof entryRequirementsLocalizedLocales)[number];
export type EntryRequirementsPageLocale = EntryRequirementsEditionLocale | EntryRequirementsLocalizedLocale;

export function isEntryRequirementsEditionLocale(language: string): language is EntryRequirementsEditionLocale {
  return (entryRequirementsEditionLocales as readonly string[]).includes(language);
}

export function entryRequirementsEditionPath(language: EntryRequirementsPageLocale) {
  return `/${language}/${language === "es" ? "guias" : "guides"}/china-entry-requirements/`;
}

/** English, its seven translations and x-default. */
export function entryRequirementsAlternates(): Record<string, string> {
  return {
    en: entryRequirementsEnglishPath,
    "zh-Hans": entryRequirementsEditionPath("zh"),
    ko: entryRequirementsEditionPath("ko"),
    ...Object.fromEntries(entryRequirementsEditionLocales.map((language) => [language, entryRequirementsEditionPath(language)])),
    "x-default": entryRequirementsEnglishPath,
  };
}
