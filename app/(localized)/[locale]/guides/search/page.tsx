import type { Metadata } from "next";
import { GuideSearchResultsPage } from "../../../../../components/GuideSearchResultsPage";
import {
  getGuideSearchCopy,
  getGuideSearchLanguagePaths,
} from "../../../../../lib/guideSearchI18n";
import { localizedRouteLocale } from "../../../../../lib/localizedRouteLocale";

export const dynamic = "force-static";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: routeLocale } = await params;
  const locale = localizedRouteLocale(routeLocale);
  const copy = getGuideSearchCopy(locale);

  return {
    title: copy.page.metadataTitle,
    description: copy.page.metadataDescription,
    referrer: "origin",
    alternates: {
      canonical: copy.path,
      languages: getGuideSearchLanguagePaths(),
    },
    robots: {
      index: false,
      follow: true,
      googleBot: {
        index: false,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      title: copy.page.metadataTitle,
      description: copy.page.metadataDescription,
      type: "website",
      locale: locale === "zh" ? "zh_CN" : "ko_KR",
      alternateLocale:
        locale === "zh" ? ["en_US", "ko_KR"] : ["en_US", "zh_CN"],
      url: copy.path,
    },
    twitter: {
      card: "summary",
      title: copy.page.metadataTitle,
      description: copy.page.metadataDescription,
    },
  };
}

export default async function LocalizedGuideSearchPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: routeLocale } = await params;
  const locale = localizedRouteLocale(routeLocale);

  return <GuideSearchResultsPage locale={locale} />;
}
