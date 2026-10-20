/**
 * How each edition marks a link to a page that exists only in English: the
 * marker ends the link's text, and the link carries hrefLang="en"
 * (supabase/tests/localized-guide-links.test.mjs holds the convention).
 */
export const editionEnglishMarker = {
  fr: "(en anglais)",
  es: "(en inglés)",
  de: "(Englisch)",
  ar: "(بالإنجليزية)",
  ja: "（英語）",
} as const;
