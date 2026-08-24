import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PrivateToursHubPage } from "../../../../components/PrivateToursHubPage";
import type { HomegroundLocale } from "../../../../lib/homegroundI18n";
import {
  getPrivateTourHubCopy,
  getPrivateTourHubLanguagePaths,
} from "../../../../lib/privateTourHubI18n";
import { getPublishedPrivateTourCatalog } from "../../../../lib/publishedPrivateTourCatalog";

type LocalizedLocale = Exclude<HomegroundLocale, "en">;

function localizedLocale(value: string): LocalizedLocale {
  if (value === "zh" || value === "ko") return value;
  notFound();
}

export const dynamicParams = false;
export const dynamic = "force-static";

export function generateStaticParams() {
  return [{ locale: "zh" }, { locale: "ko" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: routeLocale } = await params;
  const locale = localizedLocale(routeLocale);
  const publishedTours = getPublishedPrivateTourCatalog(locale);
  const copy = getPrivateTourHubCopy(locale, publishedTours.length);
  const socialTour = publishedTours[0];

  return {
    title: copy.metadata.title,
    description: copy.metadata.description,
    alternates: {
      canonical: copy.path,
      languages: getPrivateTourHubLanguagePaths(),
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
          url: socialTour.image.src,
          width: socialTour.image.width,
          height: socialTour.image.height,
          alt: socialTour.image.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.metadata.openGraphTitle,
      description: copy.metadata.description,
      images: [socialTour.image.src],
    },
  };
}

export default async function LocalizedPrivateToursPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: routeLocale } = await params;
  const locale = localizedLocale(routeLocale);

  return <PrivateToursHubPage locale={locale} />;
}
