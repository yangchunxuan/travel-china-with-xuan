import {
  getPrivateTourGuideLanguageBase,
  type PrivateTourGuideLanguageBase,
} from "./privateTourGuideLanguage";

// The authored six-day Jiangnan offer includes a Japanese-speaking guide.
// Other source offers keep their actual guide language and price basis.
const japaneseLabels: Readonly<Record<PrivateTourGuideLanguageBase, string>> = {
  english: "英語ガイド",
  "english-land": "陸上は英語ガイド",
  "english-or-none": "英語ガイドまたは現地ガイドなし",
  quote: "ガイド言語は見積もり時に確認",
  "driver-guide": "英語対応のドライバー兼案内役",
};

export function getJapaneseGuideLanguageLabel(slug: string): string {
  if (slug === "shanghai-suzhou-hangzhou-6-day-private-tour") return "日本語ガイド込み";
  if (slug === "zhangjiajie-4-day-private-tour") return "英語ガイド（2・3日目）";
  return japaneseLabels[getPrivateTourGuideLanguageBase(slug)];
}

/** Visible by the price and in service details, including quote-only routes. */
export function getJapaneseGuidePriceNote(slug: string, smallGroup = false): string {
  if (slug === "shanghai-suzhou-hangzhou-6-day-private-tour") {
    return "このコースの掲載料金には、到着時と2～5日目の日本語ガイドが含まれます。ご希望日の空き状況は予約前に確認します。";
  }
  if (smallGroup) {
    return "固定出発ツアーのガイドは英語です。日本語での案内をご希望の場合は、プライベート旅行として別途お見積もりし、ガイドの空き状況と追加料金を予約前に確認します。";
  }
  return "日本語ガイドをご希望の場合は別途お見積もりします。手配の可否と追加料金を、ご希望の日程に合わせて予約前に確認します。";
}
