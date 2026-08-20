import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TantanZhangjiajieStoryPage } from "../../../../../components/TantanZhangjiajieStoryPage";
import {
  getGuideEntry,
  getGuideLanguagePaths,
} from "../../../../../lib/guideRegistry";
import type { HomegroundLocale } from "../../../../../lib/homegroundI18n";
import {
  getTantanZhangjiajieStoryCopy,
  ZHANGJIAJIE_GLASS_BRIDGE_HERO,
} from "../../../../../lib/tantanZhangjiajieStoryI18n";

type LocalizedLocale = Exclude<HomegroundLocale, "en">;

function localizedLocale(value: string): LocalizedLocale {
  if (value === "zh" || value === "ko") return value;
  notFound();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: routeLocale } = await params;
  const locale = localizedLocale(routeLocale);
  const guide = getGuideEntry("zhangjiajie-glass-bridge-vs-skywalk", locale);
  const copy = getTantanZhangjiajieStoryCopy(locale);

  return {
    title: copy.title,
    description: copy.dek,
    alternates: {
      canonical: guide.canonicalPath,
      languages: getGuideLanguagePaths(guide.id),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      title: copy.title,
      description: copy.dek,
      type: "article",
      locale: guide.openGraphLocale,
      alternateLocale:
        locale === "zh" ? ["en_US", "ko_KR"] : ["en_US", "zh_CN"],
      url: guide.canonicalPath,
      publishedTime: guide.datePublished,
      modifiedTime: guide.dateModified,
      authors: ["Tantan"],
      images: [
        {
          url: ZHANGJIAJIE_GLASS_BRIDGE_HERO.url,
          width: ZHANGJIAJIE_GLASS_BRIDGE_HERO.width,
          height: ZHANGJIAJIE_GLASS_BRIDGE_HERO.height,
          alt: copy.heroAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.dek,
      images: [ZHANGJIAJIE_GLASS_BRIDGE_HERO.url],
    },
  };
}

export default async function LocalizedTantanZhangjiajieStoryRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: routeLocale } = await params;
  const locale = localizedLocale(routeLocale);

  return <TantanZhangjiajieStoryPage locale={locale} />;
}
