import {
  getPrivateTourGuideLanguageBase,
  type PrivateTourGuideLanguageBase,
} from "./privateTourGuideLanguage";

// Japanese pages follow the source service notes: an English-speaking guide
// unless the route states otherwise. A Japanese-speaking guide is only ever a
// separate request, so no badge promises one.
const japaneseLabels: Readonly<Record<PrivateTourGuideLanguageBase, string>> = {
  english: "英語ガイド",
  "english-land": "陸上は英語ガイド",
  "english-or-none": "英語ガイドまたは現地ガイドなし",
  quote: "ガイド言語は見積もり時に確認",
  "driver-guide": "ドライバー兼案内役（言語は支払い前に確認）",
};

export function getJapaneseGuideLanguageLabel(slug: string): string {
  return japaneseLabels[getPrivateTourGuideLanguageBase(slug)];
}
