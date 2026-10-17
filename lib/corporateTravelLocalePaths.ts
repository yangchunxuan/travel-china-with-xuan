/** Corporate editions share the same three purposes and two source itineraries. */
export const corporateLocales = ["en", "zh", "ko", "ja", "es", "fr", "de", "ar"] as const;
export type CorporateLocale = (typeof corporateLocales)[number];
export function corporateLocale(value: string): CorporateLocale {
  const code = value.trim().toLowerCase().split(/[-_]/u)[0];
  return corporateLocales.includes(code as CorporateLocale) ? code as CorporateLocale : "en";
}
export function corporatePath(locale: CorporateLocale = "en", slug?: string) {
  return `${locale === "en" ? "" : `/${locale}`}/corporate-travel/${slug ? `${slug}/` : ""}`;
}
export function corporateAlternates(slug?: string): Record<string, string> {
  return Object.fromEntries([
    ...corporateLocales.map(locale => [locale === "zh" ? "zh-Hans" : locale, corporatePath(locale, slug)]),
    ["x-default", corporatePath("en", slug)],
  ]);
}
export function corporateHeaderLanguages(slug?: string): { lang: "en" | "zh-Hans" | "ko" | "ja" | "es" | "fr" | "de" | "ar"; label: string; path: string }[] {
  const names = { en: "English", zh: "中文", ko: "한국어", ja: "日本語", es: "Español", fr: "Français", de: "Deutsch", ar: "العربية" };
  return corporateLocales.map(locale => ({ lang: locale === "zh" ? "zh-Hans" : locale, label: names[locale], path: corporatePath(locale, slug) }));
}
export const corporateHtmlLanguage = (locale: CorporateLocale) => locale === "zh" ? "zh-Hans" : locale;
export const corporateOgLocales: Record<CorporateLocale, string> = { en: "en_US", zh: "zh_CN", ko: "ko_KR", ja: "ja_JP", es: "es_ES", fr: "fr_FR", de: "de_DE", ar: "ar_SA" };
