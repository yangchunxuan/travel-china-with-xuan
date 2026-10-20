import { arabicSitePagePathByEnglishPath } from './arabicEditionIndex';
import { homegroundBusiness } from "./homegroundBusiness";
import { germanSitePagePathByEnglishPath } from './germanEditionIndex';
import { frenchSitePagePathByEnglishPath } from './frenchEditionIndex';
import { spanishSitePagePathByEnglishPath } from "./spanishEditionIndex";

/** Japanese site routes outside the article system. */
export const japaneseSite = {
  home: "/ja/",
  tours: "/ja/tours/",
  guides: "/ja/guides/",
  explore: "/ja/explore/",
  sights: "/ja/sights/",
  inspiration: "/ja/inspiration/",
  services: "/ja/services/",
  studio: "/ja/studio/",
  company: "/ja/company/",
  author: "/ja/studio/evan/",
  businessInformation: "/ja/business-information/",
  terms: "/ja/terms/",
  refundDelivery: "/ja/refund-delivery/",
  privacy: "/ja/privacy/",
  contact: "/ja/#contact",
} as const;


export interface JapaneseLanguagePath {
  readonly label: string;
  readonly lang: "en" | "zh-Hans" | "ko" | "ja" | "de" | "ar" | "fr" | "es";
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
  const germanPath = germanSitePagePathByEnglishPath[enPath] ?? (/^\/tours\/[^/]+\/$/.test(enPath) ? `/de${enPath}` : undefined);
  return [
    { label: "EN", lang: "en", path: enPath },
    { label: "中文", lang: "zh-Hans", path: overrides.zh ?? `/zh/${suffix}` },
    { label: "한국어", lang: "ko", path: overrides.ko ?? `/ko/${suffix}` },
    { label: "日本語", lang: "ja", path: jaPath },
    ...(germanPath ? [{ label: "DE" as const, lang: "de" as const, path: germanPath }, {label:"العربية" as const,lang:"ar" as const,path:germanPath.replace(/^\/de/,"/ar")}] : []),
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
  const es = spanishSitePagePathByEnglishPath[jaPath.replace(/^\/ja/, "") || "/"];
  return {
    ...metadata,
    alternates: { ...alternates, languages: { ...(alternates.languages ?? {}), ja: jaPath, ...(arabicSitePagePathByEnglishPath[jaPath.replace(/^\/ja/, "") || "/"] ? {ar:arabicSitePagePathByEnglishPath[jaPath.replace(/^\/ja/, "") || "/"]} : {}), ...(germanSitePagePathByEnglishPath[jaPath.replace(/^\/ja/, "") || "/"] ? { de: germanSitePagePathByEnglishPath[jaPath.replace(/^\/ja/, "") || "/"] } : {}), ...(es ? { es } : {}), ...(frenchSitePagePathByEnglishPath[jaPath.replace(/^\/ja/, "") || "/"] ? { fr: frenchSitePagePathByEnglishPath[jaPath.replace(/^\/ja/, "") || "/"] } : {}) } },
  };
}

/** Distinguishes a saved on-site inquiry from an external unsent draft. */
export const japaneseDraftNote =
  "サイト内の相談フォームでは、送信後に受付番号が表示されます。メールアプリや WhatsApp を開いた場合は下書きのままなので、内容を確認してからご自身で送信してください。";

/** hreflang map for page metadata, matching the language switcher. */
export function japaneseAlternates(
  enPath: string,
  jaPath: string,
  overrides: Partial<Record<"zh" | "ko", string>> = {},
) {
  const [en, zh, ko, ja] = japaneseLanguagePaths(enPath, jaPath, overrides);
  // The home and guides pages also have a Spanish page; hreflang only.
  const es = spanishSitePagePathByEnglishPath[enPath];
  const fr = frenchSitePagePathByEnglishPath[enPath];
  const de = germanSitePagePathByEnglishPath[enPath];
  const ar = arabicSitePagePathByEnglishPath[enPath];
  return {
    en: en.path,
    "zh-Hans": zh.path,
    ko: ko.path,
    ja: ja.path,
    ...(es ? { es } : {}),
    ...(fr ? { fr } : {}),
    ...(de ? { de } : {}),
    ...(ar ? { ar } : {}),
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
