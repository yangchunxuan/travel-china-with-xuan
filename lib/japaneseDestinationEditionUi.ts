import type { DestinationEditionUi } from "./destinationEditionUi";
import { japaneseServiceMenu } from "./japaneseMenuEntries.ts";

/**
 * The city page's words in Japanese (see lib/destinationEditionUi.ts). Kept in
 * a Japanese-only file so its text stays out of the Chinese serif font subset.
 */
export const japaneseDestinationEditionUi: DestinationEditionUi = {
  skip: "ガイドへ移動",
  reviewed: "確認日",
  ctaLabel: "現地チームと計画する",
  whatTitle: (city) => `${city}で見たいもの`,
  whatBody: "開くと、訪れる価値と行き方がわかります。日程への組み込み方は、下の4つの判断をご覧ください。",
  themeLink: (name) => `旅のアイデア：${name}`,
  toursLabel: "プライベートツアー",
  toursTitle: (city) => `${city}を訪れるプライベートツアー`,
  quoteTourAction: "行程とお見積もり",
  toursBody: "各ページで行程と公開料金、またはお見積もりの方法をご確認いただける既成のコースです。ご一行だけで、ご希望の日程で。",
  bandTitle: "旅のすべて、または一部だけをお任せください。",
  bandTitleTrip: "旅のすべてをお任せください。",
  bandBodyTrip: "日程と人数をもとに、担当者が直接お返事します。",
  bandBody: "どのご依頼にも、日程と人数をもとに担当者が直接お返事します。",
  eyebrow: "都市ガイド",
  decisionsLabel: "都市について決める4つのこと",
  decisionsTitle: "まず都市を知り、それから細部を計画しましょう。",
  decisionsBody: "何泊するか、どのエリアに泊まるか、どこから入りどこから出るか、次にどこへ行くか。それぞれの予約方法は実用ガイドでご確認ください。",
  adviceAction: "実用ガイドを見る",
  signalLabels: { nights: "滞在日数", stay: "宿泊エリア", gateway: "空港・駅", next: "次の目的地" },
  detailedAnswersLabel: "さらに詳しく",
  detailedAnswers: (city) => `${city}をもっと知る`,
  detailedAnswersBody: "宿泊エリアから街への出入りまで、ひとつの疑問にひとつのガイドで答えます。",
  evidenceSummary: "出典と確認記録",
  evidenceReviewed: "情報確認日",
  evidenceBody: "このページの情報は、下記の公式・一次情報に基づいています。開館時間や規則は変わることがあるため、出発前にもう一度ご確認ください。",
  byline: { by: "執筆", reviewed: "情報確認日" },
  compass: { n: "北", s: "南", w: "西", e: "東" },
  dateLocale: "ja-JP",
};

/**
 * The service rows of the Japanese city pages (lib/destinationEditionNavigation.ts):
 * the Japanese Services menu rows. The Destinations step of the breadcrumb
 * opens /ja/explore/.
 */
export const japaneseDestinationEditionNavigation = {
  destinationsHref: "/ja/explore/",
  services: japaneseServiceMenu,
} as const;
