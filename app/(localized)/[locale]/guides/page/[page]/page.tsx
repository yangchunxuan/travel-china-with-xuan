import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuidesHubPage } from "../../../../../../components/GuidesHubPage";
import {
  getGuidesHubPageCount,
  getGuidesHubPageLanguagePaths,
  getGuidesHubPagePath,
  getGuidesHubPagination,
  getGuidesHubStaticPageNumbers,
} from "../../../../../../lib/guidesHubPagination";
import type { HomegroundLocale } from "../../../../../../lib/homegroundI18n";
import { getGuidesHubCopy } from "../../../../../(default)/guides/guidesHubI18n";

type LocalizedLocale = Exclude<HomegroundLocale, "en">;
const localizedLocales = ["zh", "ko"] as const;

export const dynamicParams = false;

export function generateStaticParams() {
  return localizedLocales.flatMap((locale) =>
    getGuidesHubStaticPageNumbers(locale).map((page) => ({
      locale,
      page: String(page),
    })),
  );
}

function localizedLocale(value: string): LocalizedLocale {
  if (value === "zh" || value === "ko") return value;
  notFound();
}

function resolvedPage(value: string, locale: LocalizedLocale) {
  if (!/^(?:[2-9]|[1-9]\d+)$/.test(value)) notFound();
  const page = Number(value);
  if (page > getGuidesHubPageCount(locale)) notFound();
  return page;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; page: string }>;
}): Promise<Metadata> {
  const { locale: localeParam, page: pageParam } = await params;
  const locale = localizedLocale(localeParam);
  const page = resolvedPage(pageParam, locale);
  const copy = getGuidesHubCopy(locale);
  const canonicalPath = getGuidesHubPagePath(locale, page);
  const pageLabel = copy.pagination.pageTitle(page);
  const socialImage = getGuidesHubPagination(locale, page).pageGuides[0];

  return {
    title: `${copy.metadata.title} | ${pageLabel}`,
    description: copy.metadata.description,
    alternates: {
      canonical: canonicalPath,
      languages: getGuidesHubPageLanguagePaths(page),
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
      title: `${copy.metadata.openGraphTitle} — ${pageLabel}`,
      description: copy.metadata.description,
      type: "website",
      locale: locale === "zh" ? "zh_CN" : "ko_KR",
      alternateLocale:
        locale === "zh" ? ["en_US", "ko_KR"] : ["en_US", "zh_CN"],
      url: canonicalPath,
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
      title: `${copy.metadata.openGraphTitle} — ${pageLabel}`,
      description: copy.metadata.description,
      images: [socialImage.heroImageUrl],
    },
  };
}

export default async function LocalizedPaginatedGuidesPage({
  params,
}: {
  params: Promise<{ locale: string; page: string }>;
}) {
  const { locale: localeParam, page: pageParam } = await params;
  const locale = localizedLocale(localeParam);
  const page = resolvedPage(pageParam, locale);

  return <GuidesHubPage locale={locale} page={page} />;
}
