import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TransitRouteCheckPage } from "../../../../../components/TransitRouteCheckPage";
import {
  getGuideEntry,
  getGuideLanguagePaths,
} from "../../../../../lib/guideRegistry";
import type { HomegroundLocale } from "../../../../../lib/homegroundI18n";

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
  const guide = getGuideEntry("china-240-hour-visa-free-transit-route-check", locale);

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
        locale === "zh" ? ["en_US", "ko_KR"] : ["en_US", "zh_CN"],
      url: guide.canonicalPath,
      publishedTime: guide.datePublished,
      modifiedTime: guide.dateModified,
      images: [
        {
          url: guide.heroImageUrl,
          width: 1200,
          height: 630,
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

export default async function LocalizedTransitRouteCheckRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: routeLocale } = await params;
  const locale = localizedLocale(routeLocale);

  return <TransitRouteCheckPage locale={locale} />;
}
