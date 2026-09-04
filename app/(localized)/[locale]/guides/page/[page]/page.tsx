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

function paginationDescription(
  locale: LocalizedLocale,
  page: number,
  pageCount: number,
  startIndex: number,
  pageGuideCount: number,
  totalGuideCount: number,
) {
  const firstGuide = startIndex + 1;
  const lastGuide = startIndex + pageGuideCount;

  if (locale === "zh") {
    return `浏览 Homeground 中国旅行实用指南第 ${page}/${pageCount} 页（第 ${firstGuide}–${lastGuide} 篇，共 ${totalGuideCount} 篇）：继续查找入境、交通、住宿、出行时间与路线规划的明确答案。`;
  }

  return `Homeground 중국 여행 실용 가이드 ${page}/${pageCount}페이지(전체 ${totalGuideCount}편 중 ${firstGuide}–${lastGuide}편)입니다. 입국·교통·숙소·여행 시기·일정 계획에 관한 답을 계속 살펴보세요.`;
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
  const pagination = getGuidesHubPagination(locale, page);
  const socialImage = pagination.pageGuides[0];
  const description = paginationDescription(
    locale,
    page,
    pagination.pageCount,
    pagination.startIndex,
    pagination.pageGuides.length,
    pagination.guides.length,
  );

  return {
    title: `${copy.metadata.title} | ${pageLabel}`,
    description,
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
      description,
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
      description,
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
