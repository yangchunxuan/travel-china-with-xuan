"use client";

import type { MouseEvent as ReactMouseEvent } from "react";
import { HomegroundHeader, type HomegroundHeaderEdition, type HomegroundPageContext } from "./HomegroundHeader";
import { usePrivateTourSelection } from "./PrivateTourSelection";
import { getHomegroundCopy } from "../lib/homegroundI18n";
import { getHomegroundNavigationModel } from "../lib/homegroundNavigationModel";
import { completeHeaderLanguagePaths } from "../lib/headerLanguagePaths";
import { spanishGuidePathBySourceId, spanishSitePagePathByEnglishPath, spanishTourPagePath } from "../lib/spanishEditionIndex";
import { frenchSitePagePathByEnglishPath } from "../lib/frenchEditionIndex";
import { japaneseContactReady, openJapaneseContact } from "../lib/japaneseContactFlow";
import { japaneseSite, type JapaneseLanguagePath } from "../lib/japaneseSite";

/**
 * The Japanese header is the English header with Japanese words, as for the
 * French, German, Spanish and Arabic editions: the same items, menus, order
 * and targets, each opening the Japanese page.
 */
const source = getHomegroundCopy("en");
const navigationSource = getHomegroundNavigationModel("en", "/", { includeCorporateTravel: false });
const japaneseItems = {
  destinations: { label: "目的地", description: "都市、旅のアイデア、定番の見どころ", href: japaneseSite.explore },
  tours: { label: "プライベートツアー", description: "公開中のプライベートツアーを比べる", href: japaneseSite.tours },
  services: { label: "サービス", description: "観光チケット、ガイド、専用車、旅全体のサポート", href: japaneseSite.services },
  guides: { label: "実用ガイド", description: "入国、移動、宿泊、時期の疑問に答えます", href: japaneseSite.guides },
  studio: { label: "私たちについて", description: "私たちの使命、チーム、許認可", href: japaneseSite.company },
} as const;
const japaneseEntries: Readonly<Record<string, { label: string; description: string; href: string }>> = {
  cities: { label: "都市から探す", description: "北京、上海、西安ほか5都市", href: japaneseSite.explore },
  inspiration: { label: "旅のアイデア", description: "テーマ別の旅のアイデアと、それに合うルート", href: japaneseSite.inspiration },
  sights: { label: "定番の見どころ", description: "万里の長城、兵馬俑など", href: japaneseSite.sights },
  "all-tours": { label: "すべてのプライベートツアー", description: "地域、日数、料金で全ルートを比べる", href: japaneseSite.tours },
  "multi-city": { label: "複数都市をめぐる定番ルート", description: "1回の旅で複数の都市へ", href: "/ja/tours/multi-city/" },
  regions: { label: "ひとつの地域をじっくり", description: "華東、西南、華南など", href: "/ja/tours/regions/" },
  seasonal: { label: "今の季節に", description: "冬の東北：ハルビン、長白山", href: "/ja/tours/seasonal/" },
  "attraction-tickets": { label: "観光チケットの予約", description: "チケットの予約はお任せください。日程が決まったら早めにご連絡を。", href: "/ja/services/china-attraction-reservations/" },
  "english-guides": { label: "プライベート英語ガイド", description: "1日単位で、4都市でご案内します", href: "/ja/services/private-english-speaking-guides/" },
  "private-car": { label: "専用車・ドライバー", description: "空港送迎と専用車での1日観光", href: "/ja/services/private-car-and-driver/" },
  "trip-support": { label: "旅全体のプランニングと現地サポート", description: "ホテル、送迎、現地でのサポート", href: "/ja/services/full-trip-support/" },
  company: { label: "私たちの使命", description: "Homeground が存在する理由と、お約束すること", href: japaneseSite.company },
  planning: { label: "旅の計画の立て方", description: "実現できる旅かどうかを Homeground がどう判断するか", href: japaneseSite.studio },
  credentials: { label: "許認可と登録情報", description: "ご自身で確認できる登録情報", href: japaneseSite.businessInformation },
};
const toggles: Readonly<Record<string, string>> = {
  destinations: "目的地メニューを開く", tours: "プライベートツアーメニューを開く",
  services: "サービスメニューを開く", studio: "「私たちについて」メニューを開く",
};
const navigation: HomegroundHeaderEdition["navigation"] = {
  mobileCta: "相談",
  items: navigationSource.items.map((item) => ({ ...item, ...japaneseItems[item.id] })),
  menus: Object.fromEntries(Object.entries(navigationSource.menus).map(([id, menu]) => [id, {
    toggle: toggles[id], entries: menu.entries.map((entry) => ({ ...entry, ...japaneseEntries[entry.id] })),
  }])),
};
const copy: HomegroundHeaderEdition["copy"] = {
  path: japaneseSite.home, businessDescriptor: "中国の旅行会社",
  navigation: {
    ...source.navigation,
    primaryLabel: "主なページ", mobileLabel: "モバイルメニュー", mobileServicesLabel: "旅のサービス",
    menuTagline: "あなたに合わせた旅を、現地の事情をふまえて計画します。", footerLabel: "フッターナビゲーション",
    languageLabel: "言語を選ぶ", languageChangeWarning: "言語を切り替えると、入力した連絡先が消去されます。続けますか？",
    homeLabel: "Homeground China 日本語トップ", planning: "旅の計画の立て方", studio: "スタジオ",
    faq: "よくある質問", visa: "入国ガイド", openMenu: "メニューを開く", closeMenu: "メニューを閉じる",
    plannerCta: { new: "旅について相談する", inProgress: "相談の入力を続ける", result: "相談内容を送る",
      disabled: "Homeground に連絡する", validationError: "入力を完了する", submitting: "送信中…",
      success: "受付内容を見る", failed: "相談内容に戻る", uncertain: "送信状況を確認する" },
  },
};

function pageContextFor(currentPath: string, onTourPage: boolean): HomegroundPageContext {
  if (onTourPage) return "tour";
  if (currentPath === japaneseSite.home) return "home";
  if (currentPath === japaneseSite.tours) return "tours";
  if (/^\/ja\/tours\/(?:multi-city|regions|seasonal)\/$/u.test(currentPath)) return "tour-collection";
  if (currentPath.startsWith(japaneseSite.services)) return "services";
  if (currentPath === japaneseSite.guides) return "guides";
  if (currentPath === japaneseSite.explore) return "destinations";
  if (currentPath.startsWith("/ja/destinations/")) return "destination";
  if (currentPath === japaneseSite.studio) return "studio";
  if (currentPath === japaneseSite.company) return "company";
  return "content";
}

export function JapaneseHeader({
  contactHref,
  currentPath,
  languagePaths,
  selectionSlug = null,
  contactMode = "dialog",
}: {
  contactHref: string;
  currentPath: string;
  languagePaths: readonly JapaneseLanguagePath[];
  selectionSlug?: string | null;
  contactMode?: "dialog" | "anchor";
}) {
  const selectedTour = usePrivateTourSelection();
  const englishPath = languagePaths.find((item) => item.lang === "en")?.path ?? "/";
  const englishTourSlug = /^\/tours\/([^/]+)\/$/.exec(englishPath)?.[1];
  const englishGuideId = /^\/guides\/([^/]+)\/$/.exec(englishPath)?.[1];
  // Spanish and French equivalents the page does not list are looked up from their edition indexes.
  const allLanguagePaths = Object.fromEntries(completeHeaderLanguagePaths({
    ...Object.fromEntries(languagePaths.map((item) => [item.lang, item.path])),
    es: languagePaths.find((item) => item.lang === "es")?.path ?? spanishSitePagePathByEnglishPath[englishPath]
      ?? (englishTourSlug ? spanishTourPagePath(englishTourSlug) : undefined)
      ?? (englishGuideId ? spanishGuidePathBySourceId[englishGuideId] : undefined),
    fr: languagePaths.find((item) => item.lang === "fr")?.path ?? frenchSitePagePathByEnglishPath[englishPath]
      ?? (englishTourSlug ? `/fr${englishPath}` : undefined),
  }).map((item) => [item.lang, item.path]));
  // The Japanese contact opens in its own dialog with the tour and the chosen package, when the page has it.
  const onPlannerClick = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (contactMode === "anchor" || contactHref === "#corporate-enquiry") return;
    if (!japaneseContactReady()) return;
    event.preventDefault();
    const href = event.currentTarget.href;
    window.setTimeout(() => {
      if (!openJapaneseContact({
        slug: selectionSlug ?? undefined,
        selection: selectionSlug && selectedTour?.slug === selectionSlug ? selectedTour.selection : undefined,
      })) window.location.assign(href);
    }, 0);
  };
  return <HomegroundHeader locale="en" pageContext={pageContextFor(currentPath, Boolean(selectionSlug))} navigationIsExact
    plannerHrefOverride={contactHref}
    languagePaths={allLanguagePaths}
    edition={{ language: "ja", copy, navigation, servicesOverview: "すべてのサービス", onPlannerClick }} />;
}
