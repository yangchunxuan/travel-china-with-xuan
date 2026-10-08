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
  "driver-guide": "英語対応のドライバー兼案内役",
};

export function getJapaneseGuideLanguageLabel(slug: string): string {
  if (slug === "zhangjiajie-4-day-private-tour") return "英語ガイド（2・3日目）";
  return japaneseLabels[getPrivateTourGuideLanguageBase(slug)];
}
