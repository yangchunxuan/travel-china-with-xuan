import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GuidesHubPage } from "../../../../../components/GuidesHubPage";
import {
  getGuidesHubPageCount,
  getGuidesHubPageLanguagePaths,
  getGuidesHubPagePath,
  getGuidesHubPagination,
  getGuidesHubStaticPageNumbers,
} from "../../../../../lib/guidesHubPagination";
import { getGuidesHubCopy } from "../../guidesHubI18n";

export const dynamicParams = false;

export function generateStaticParams() {
  return getGuidesHubStaticPageNumbers("en").map((page) => ({
    page: String(page),
  }));
}

function resolvedPage(value: string) {
  if (!/^(?:[2-9]|[1-9]\d+)$/.test(value)) notFound();
  const page = Number(value);
  if (page > getGuidesHubPageCount("en")) notFound();
  return page;
}

function paginationDescription(
  page: number,
  pageCount: number,
  startIndex: number,
  pageGuideCount: number,
  totalGuideCount: number,
) {
  const firstGuide = startIndex + 1;
  const lastGuide = startIndex + pageGuideCount;

  return `Browse page ${page} of ${pageCount}, covering China travel guides ${firstGuide}–${lastGuide} of ${totalGuideCount}: practical answers on entry, transport, stays, timing and trip planning.`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ page: string }>;
}): Promise<Metadata> {
  const { page: pageParam } = await params;
  const page = resolvedPage(pageParam);
  const copy = getGuidesHubCopy("en");
  const canonicalPath = getGuidesHubPagePath("en", page);
  const pageLabel = copy.pagination.pageTitle(page);
  const pagination = getGuidesHubPagination("en", page);
  const socialImage = pagination.pageGuides[0];
  const description = paginationDescription(
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
      locale: "en_US",
      alternateLocale: ["zh_CN", "ko_KR"],
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

export default async function PaginatedGuidesPage({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page: pageParam } = await params;
  return <GuidesHubPage locale="en" page={resolvedPage(pageParam)} />;
}
