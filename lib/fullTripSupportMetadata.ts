import type { Metadata } from "next";
import type { HomegroundLocale } from "./homegroundI18n";
import { fullTripSupportPath } from "./fullTripSupport";
import { getFullTripSupportCopy } from "./fullTripSupportI18n";
import { buildHomegroundSocialMetadata } from "./homegroundSocialMetadata";
import { resolvePageTitle } from "./pageTitle";

export function buildFullTripSupportMetadata(locale: HomegroundLocale): Metadata {
  const copy = getFullTripSupportCopy(locale);
  return {
    title: resolvePageTitle(copy.metadata.title, locale),
    description: copy.metadata.description,
    ...buildHomegroundSocialMetadata({ locale, ...copy.metadata, url: fullTripSupportPath[locale] }),
    alternates: { canonical: fullTripSupportPath[locale], languages: {
      en: fullTripSupportPath.en, "zh-Hans": fullTripSupportPath.zh,
      ko: fullTripSupportPath.ko, "x-default": fullTripSupportPath.en,
    } },
    robots: { index: true, follow: true },
  };
}
