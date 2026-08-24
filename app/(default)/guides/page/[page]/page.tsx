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
  const socialImage = getGuidesHubPagination("en", page).pageGuides[0];

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
      description: copy.metadata.description,
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
