/** UI destinations only: homepage fallbacks must never become hreflang alternates. */
export const headerLanguageEditions = [
  { lang: "en", label: "English", home: "/" },
  { lang: "zh-Hans", label: "中文", home: "/zh/" },
  { lang: "ko", label: "한국어", home: "/ko/" },
  { lang: "ja", label: "日本語", home: "/ja/" },
  { lang: "es", label: "Español", home: "/es/" },
  { lang: "fr", label: "Français", home: "/fr/" },
  { lang: "de", label: "Deutsch", home: "/de/" },
  { lang: "ar", label: "العربية", home: "/ar/" },
] as const;

export type HeaderLanguage = (typeof headerLanguageEditions)[number]["lang"];

/** A homepage fallback must not inherit another page's tour/package choices. */
export function isEquivalentTourLanguagePath(path: string, slug: string) {
  return path.split(/[?#]/u)[0].endsWith(`/tours/${slug}/`);
}

/** Fixed order, endonyms and a working way into every edition, on every page. */
export function completeHeaderLanguagePaths(paths: Partial<Record<HeaderLanguage | "zh", string>>) {
  return headerLanguageEditions.map(({ lang, label, home }) => ({
    lang,
    label,
    path: paths[lang] || (lang === "zh-Hans" ? paths.zh : undefined) || home,
  }));
}
