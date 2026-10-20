/**
 * The China entry hub and its full translations. Kept apart from the
 * translated text so client chrome and the sitemap import paths only.
 */
export const entryRequirementsEnglishPath = "/guides/china-entry-requirements/";
export const entryRequirementsEditionLocales = ["ja", "fr", "es", "de", "ar"] as const;
export type EntryRequirementsEditionLocale = (typeof entryRequirementsEditionLocales)[number];

export function isEntryRequirementsEditionLocale(language: string): language is EntryRequirementsEditionLocale {
  return (entryRequirementsEditionLocales as readonly string[]).includes(language);
}

export function entryRequirementsEditionPath(language: EntryRequirementsEditionLocale) {
  return `/${language}/${language === "es" ? "guias" : "guides"}/china-entry-requirements/`;
}

/** The hub has no Chinese or Korean page, so neither appears as an alternate. */
export function entryRequirementsAlternates(): Record<string, string> {
  return {
    en: entryRequirementsEnglishPath,
    ...Object.fromEntries(entryRequirementsEditionLocales.map((language) => [language, entryRequirementsEditionPath(language)])),
    "x-default": entryRequirementsEnglishPath,
  };
}
