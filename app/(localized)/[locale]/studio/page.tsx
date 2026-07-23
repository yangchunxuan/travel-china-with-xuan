import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomegroundStudioPage } from "../../../../components/HomegroundStudioPage";
import type { HomegroundLocale } from "../../../../lib/homegroundI18n";
import {
  getHomegroundStudioCopy,
  getStudioLanguagePaths,
} from "../../../../lib/homegroundStudioI18n";

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
  const copy = getHomegroundStudioCopy(locale);

  return {
    title: copy.metadata.title,
    description: copy.metadata.description,
    alternates: {
      canonical: copy.path,
      languages: getStudioLanguagePaths(),
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
          url: "/images/studio/evan-bookshop.jpg",
          width: 1200,
          height: 1600,
          alt: copy.members[0].image.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.metadata.openGraphTitle,
      description: copy.metadata.description,
      images: ["/images/studio/evan-bookshop.jpg"],
    },
  };
}

export default async function LocalizedStudioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: routeLocale } = await params;
  const locale = localizedLocale(routeLocale);

  return <HomegroundStudioPage locale={locale} />;
}
