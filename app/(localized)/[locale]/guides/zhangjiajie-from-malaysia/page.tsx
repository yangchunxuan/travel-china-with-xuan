import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ZhangjiajieFromMalaysiaPage } from "../../../../../components/ZhangjiajieFromMalaysiaPage";
import {
  getGuideEntry,
  getGuideLanguagePaths,
} from "../../../../../lib/guideRegistry";
import type { HomegroundLocale } from "../../../../../lib/homegroundI18n";
import { malaysiaZhangjiajieGuideId } from "../../../../../lib/zhangjiajieFromMalaysiaGuide";

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
  const guide = getGuideEntry(malaysiaZhangjiajieGuideId, locale);

  return {
    title: guide.title,
    description: guide.description,
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
      title: guide.title,
      description: guide.description,
      type: "article",
      locale: guide.openGraphLocale,
      alternateLocale:
        locale === "zh"
          ? ["en_MY", "ko_KR"]
          : ["en_MY", "zh_MY"],
      url: guide.canonicalPath,
      publishedTime: guide.datePublished,
      modifiedTime: guide.dateModified,
      images: [
        {
          url: guide.heroImageUrl,
          width: guide.imageWidth,
          height: guide.imageHeight,
          alt: guide.heroAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: guide.title,
      description: guide.description,
      images: [guide.heroImageUrl],
    },
  };
}

export default async function LocalizedZhangjiajieFromMalaysiaRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: routeLocale } = await params;
  const locale = localizedLocale(routeLocale);

  return <ZhangjiajieFromMalaysiaPage locale={locale} />;
}
