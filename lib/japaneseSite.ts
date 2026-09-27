import { homegroundBusiness } from "./homegroundBusiness";

/** Japanese site routes outside the article system. */
export const japaneseSite = {
  home: "/ja/",
  tours: "/ja/tours/",
  explore: "/ja/explore/",
  services: "/ja/services/",
  studio: "/ja/studio/",
  author: "/ja/studio/evan/",
  businessInformation: "/ja/business-information/",
  terms: "/ja/terms/",
  refundDelivery: "/ja/refund-delivery/",
  privacy: "/ja/privacy/",
  contact: "/ja/#contact",
} as const;


export interface JapaneseNavLink {
  readonly href: string;
  readonly label: string;
  readonly description: string;
}

export const japanesePrimaryLinks: readonly JapaneseNavLink[] = [
  { href: japaneseSite.home, label: "ホーム", description: "日本語の旅のご案内" },
  { href: japaneseSite.tours, label: "ツアー一覧", description: "中国各地の旅を見る" },
  { href: japaneseSite.explore, label: "目的地から探す", description: "都市ごとに旅を探す" },
  { href: japaneseSite.services, label: "サービス", description: "ご相談から旅行中まで" },
  { href: japaneseSite.studio, label: "私たちについて", description: "計画の進め方とチーム" },
];

export const japaneseLegalLinks: readonly { href: string; label: string }[] = [
  { href: japaneseSite.businessInformation, label: "事業者情報" },
  { href: japaneseSite.terms, label: "利用規約" },
  { href: japaneseSite.privacy, label: "プライバシーポリシー" },
  { href: japaneseSite.refundDelivery, label: "返金・提供条件" },
];

export interface JapaneseLanguagePath {
  readonly label: "EN" | "中文" | "한국어" | "日本語";
  readonly lang: "en" | "zh-Hans" | "ko" | "ja";
  readonly path: string;
}

/**
 * Language switcher targets for a page whose English path is `enPath`
 * ("/" style) and whose Chinese and Korean versions use the usual prefixes.
 */
export function japaneseLanguagePaths(
  enPath: string,
  jaPath: string,
  overrides: Partial<Record<"zh" | "ko", string>> = {},
): readonly JapaneseLanguagePath[] {
  const suffix = enPath.replace(/^\//, "");
  return [
    { label: "EN", lang: "en", path: enPath },
    { label: "中文", lang: "zh-Hans", path: overrides.zh ?? `/zh/${suffix}` },
    { label: "한국어", lang: "ko", path: overrides.ko ?? `/ko/${suffix}` },
    { label: "日本語", lang: "ja", path: jaPath },
  ];
}

/**
 * Adds the Japanese page to an English, Chinese or Korean page's hreflang
 * set (head only; the visible language switcher is unchanged).
 */
export function withJapaneseAlternate<
  T extends { alternates?: { languages?: object | null } | null },
>(metadata: T, jaPath: string): T {
  const alternates = metadata.alternates ?? {};
  return {
    ...metadata,
    alternates: { ...alternates, languages: { ...(alternates.languages ?? {}), ja: jaPath } },
  };
}

/** Shown under every Japanese WhatsApp/email button: they open a draft, nothing is sent yet. */
export const japaneseDraftNote =
  "ボタンを押しても、すぐには送信されません。WhatsApp またはメールアプリに相談内容の下書きが開くので、内容を確認・編集してからご自身で送信してください。";

/** hreflang map for page metadata, matching the language switcher. */
export function japaneseAlternates(
  enPath: string,
  jaPath: string,
  overrides: Partial<Record<"zh" | "ko", string>> = {},
) {
  const [en, zh, ko, ja] = japaneseLanguagePaths(enPath, jaPath, overrides);
  return {
    en: en.path,
    "zh-Hans": zh.path,
    ko: ko.path,
    ja: ja.path,
    "x-default": en.path,
  } as const;
}

function whatsappNumber() {
  const configured = process.env.NEXT_PUBLIC_HOMEGROUND_WHATSAPP_NUMBER || "8613174215999";
  return /^\d{7,15}$/.test(configured) ? configured : "8613174215999";
}

/**
 * General Japanese consultation (no tour chosen yet). The message is a draft
 * the traveller edits and sends themselves; opening it sends nothing.
 */
export function japaneseGeneralContactHrefs(sourcePath: string) {
  const message = [
    "こんにちは。日本語で中国旅行の相談をしたいです。",
    "行きたい場所・気になるツアー：",
    "旅行予定の時期：",
    "参加人数：",
    "希望するガイドの言語：",
    `参照ページ：https://homegroundchina.com${sourcePath}`,
  ].join("\n");
  return {
    whatsapp: `https://wa.me/${whatsappNumber()}?text=${encodeURIComponent(message)}`,
    email: `mailto:${homegroundBusiness.serviceEmail}?subject=${encodeURIComponent("日本語での中国旅行のご相談")}&body=${encodeURIComponent(message)}`,
  } as const;
}

/** Open Graph and Twitter fields for Japanese pages, using the site-wide social image. */
export function buildJapaneseSocialMetadata({
  title,
  description,
  url,
  type = "website",
  image = {
    url: "https://homegroundchina.com/images/home/beijing-hero-2400.jpg",
    width: 2400,
    height: 1600,
    alt: "北京・紫禁城の角楼がお堀の水面に映る景色",
  },
}: {
  title: string;
  description: string;
  url: string;
  type?: "website" | "article" | "profile";
  image?: { url: string; width: number; height: number; alt: string };
}) {
  return {
    openGraph: {
      siteName: "Homeground China",
      title,
      description,
      type,
      locale: "ja_JP",
      url,
      images: [image],
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      images: [{ url: image.url, alt: image.alt }],
    },
  };
}
