import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuidesHubPage } from "../../../../components/GuidesHubPage";
import { getGuideEntry } from "../../../../lib/guideRegistry";
import type { HomegroundLocale } from "../../../../lib/homegroundI18n";
import {
  getGuidesHubCopy,
  getGuidesHubLanguagePaths,
} from "../../../(default)/guides/guidesHubI18n";

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
  const copy = getGuidesHubCopy(locale);
  const socialImage = getGuideEntry(
    "is-your-china-itinerary-too-rushed",
    locale,
  );

  return {
    title: copy.metadata.title,
    description: copy.metadata.description,
    alternates: {
      canonical: copy.path,
      languages: getGuidesHubLanguagePaths(),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: copy.metadata.openGraphTitle,
      description: copy.metadata.description,
      type: "website",
      locale: locale === "zh" ? "zh_CN" : "ko_KR",
      alternateLocale:
        locale === "zh" ? ["en_US", "ko_KR"] : ["en_US", "zh_CN"],
      url: copy.path,
      images: [
        {
          url: socialImage.heroImageUrl,
          width: socialImage.imageWidth,
          height: socialImage.imageHeight,
          alt: socialImage.heroAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.metadata.openGraphTitle,
      description: copy.metadata.description,
      images: [socialImage.heroImageUrl],
    },
  };
}

export default async function LocalizedGuidesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: routeLocale } = await params;
  const locale = localizedLocale(routeLocale);

  return <GuidesHubPage locale={locale} />;
}
