import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ZhangjiajieGuidePage } from "../../../../../components/ZhangjiajieGuidePage";
import {
  getGuideEntry,
  getGuideLanguagePaths,
} from "../../../../../lib/guideRegistry";
import type { HomegroundLocale } from "../../../../../lib/homegroundI18n";
import { getZhangjiajieGuideCopy } from "../../../../../lib/zhangjiajieGuideI18n";

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
  const guide = getGuideEntry("zhangjiajie-itinerary", locale);
  const copy = getZhangjiajieGuideCopy(locale);

  return {
    title: copy.metadata.title,
    description: copy.metadata.description,
    alternates: {
      canonical: guide.canonicalPath,
      languages: getGuideLanguagePaths("zhangjiajie-itinerary"),
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
      title: copy.metadata.title,
      description: copy.metadata.description,
      type: "article",
      locale: guide.openGraphLocale,
      alternateLocale:
        locale === "zh" ? ["en_US", "ko_KR"] : ["en_US", "zh_CN"],
      url: guide.canonicalPath,
      publishedTime: guide.datePublished,
      modifiedTime: guide.dateModified,
      images: [
        {
          url: guide.heroImageUrl,
          width: 1600,
          height: 954,
          alt: guide.heroAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.metadata.title,
      description: copy.metadata.description,
      images: [guide.heroImageUrl],
    },
  };
}

export default async function LocalizedZhangjiajieItineraryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: routeLocale } = await params;
  const locale = localizedLocale(routeLocale);

  return <ZhangjiajieGuidePage locale={locale} />;
}
