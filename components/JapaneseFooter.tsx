"use client";

import { HomegroundFooter } from "./HomegroundFooter";
import { getHomegroundCopy } from "../lib/homegroundI18n";
import { destinationEditionFooterCityLinks, destinationsHubEditionPath, hasAllDestinationEditionCities } from "../lib/destinationEditions";
import { japaneseSite } from "../lib/japaneseSite";

/**
 * The Japanese footer is the English footer with Japanese words, as for the
 * French, German, Spanish and Arabic editions: the same sections and links,
 * each opening the Japanese page.
 */
export function JapaneseFooter({ currentPath, variant = "default" }: { currentPath: string; variant?: "default" | "homepage" }) {
  const source = getHomegroundCopy("en");
  // The city links open the Japanese city pages; the list stops saying "in English" once all eight are Japanese.
  const localCities = hasAllDestinationEditionCities("ja");
  const copy = { ...source, htmlLang: "ja", path: japaneseSite.home, businessDescriptor: "中国の旅行会社", navigation: { ...source.navigation, studio: "スタジオ", faq: "よくある質問", visa: "入国ガイド" }, cities: { ...source.cities, listLabel: localCities ? "目的地" : "目的地（ガイドは英語）" }, footer: { ...source.footer, copyright: (year: number) => `© ${year} Homeground China. All rights reserved.` } };
  const names: Record<string, string> = { beijing: "北京", shanghai: "上海", xian: "西安", chengdu: "成都", guangzhou: "広州", hangzhou: "杭州", zhangjiajie: "張家界", chongqing: "重慶" };
  const pageContext = variant === "homepage" ? "home"
    : currentPath === japaneseSite.tours ? "tours"
      : currentPath === japaneseSite.guides ? "guides"
        : currentPath === japaneseSite.studio ? "studio"
          : currentPath === japaneseSite.company ? "company" : "content";
  return <HomegroundFooter locale="en" pageContext={pageContext} variant={variant} edition={{
    copy,
    sectionLabels: { guides: "実用ガイド", services: "サービス一覧", fullTripSupport: "旅行プランニング", attractionReservations: "観光チケットを予約する", legalLabel: "事業者情報・サービス情報", legalHeading: "事業者情報・規約", exploreHeading: "旅を探す", destinationsHeading: localCities ? "目的地" : "目的地（英語）", homegroundHeading: "Homeground", socialLabel: "Homeground の公式アカウント", privateTours: "プライベートツアー", allDestinations: "すべての目的地", operatorPrefix: "Homeground China は", operatorSuffix: "が運営しています。", codeLabel: "統一社会信用コード", licenceLabel: "旅行業許可番号（中国）" },
    related: { business: "事業者情報", terms: "利用規約", refund: "返金・提供条件", privacy: "プライバシーポリシー", contact: "お問い合わせ" },
    company: { path: japaneseSite.company, navLabel: "私たちの使命" }, manageConsent: "プライバシー設定",
    cityLinks: destinationEditionFooterCityLinks("ja", names),
    paths: { privacy: japaneseSite.privacy, business: japaneseSite.businessInformation, terms: japaneseSite.terms, refund: japaneseSite.refundDelivery, services: japaneseSite.services, fullTripSupport: "/ja/services/full-trip-support/", reservations: "/ja/services/china-attraction-reservations/", guides: japaneseSite.guides, tours: japaneseSite.tours, destinations: destinationsHubEditionPath.ja, studio: japaneseSite.studio, entry: "/ja/guides/china-entry-requirements/" },
  }} />;
}
