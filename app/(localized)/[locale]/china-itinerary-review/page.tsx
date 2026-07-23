import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChinaItineraryReviewPage } from "../../../../components/ChinaItineraryReviewPage";
import {
  getChinaItineraryReviewCopy,
  getChinaItineraryReviewLanguagePaths,
} from "../../../../lib/chinaItineraryReviewI18n";
import type { HomegroundLocale } from "../../../../lib/homegroundI18n";

type LocalizedLocale = Exclude<HomegroundLocale, "en">;

function localizedLocale(value: string): LocalizedLocale {
  if (value === "zh" || value === "ko") return value;
  notFound();
}

const socialImage =
  "/images/guides/china-itinerary-reality/transfer-platform-soft-focus-1200.webp";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: routeLocale } = await params;
  const locale = localizedLocale(routeLocale);
  const copy = getChinaItineraryReviewCopy(locale);

  return {
    title: copy.metadata.title,
    description: copy.metadata.description,
    alternates: {
      canonical: copy.path,
      languages: getChinaItineraryReviewLanguagePaths(),
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
      description: copy.metadata.openGraphDescription,
      type: "website",
      locale: locale === "zh" ? "zh_CN" : "ko_KR",
      alternateLocale:
        locale === "zh" ? ["en_US", "ko_KR"] : ["en_US", "zh_CN"],
      url: copy.path,
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.metadata.title,
      description: copy.metadata.description,
      images: [socialImage],
    },
  };
}

export default async function LocalizedChinaItineraryReviewRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: routeLocale } = await params;
  const locale = localizedLocale(routeLocale);

  return <ChinaItineraryReviewPage locale={locale} />;
}
