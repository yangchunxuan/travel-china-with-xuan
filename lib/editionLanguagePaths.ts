const languageLabels = { en: "EN", "zh-Hans": "中文", ko: "한국어", ja: "日本語", fr: "FR", es: "ES", de: "DE", ar: "العربية" } as const;
type LanguageTag = keyof typeof languageLabels;

/**
 * The language switch list every edition header takes, from a page's hreflang
 * paths ({ en: "/x/", fr: "/fr/x/", ... }). A language without its own version
 * of the page is left out, so the header falls back to that edition's home.
 */
export function editionLanguagePaths(paths: Readonly<Partial<Record<string, string>>>) {
  return (Object.keys(languageLabels) as LanguageTag[]).flatMap((lang) => {
    const path = paths[lang];
    return path ? [{ lang, path, label: languageLabels[lang] }] : [];
  });
}
