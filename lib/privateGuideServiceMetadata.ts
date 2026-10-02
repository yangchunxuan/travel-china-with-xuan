import type { Metadata } from "next";
import type { HomegroundLocale } from "./homegroundI18n";
import { privateGuideServicePath } from "./privateGuideServices";
import { getPrivateGuideServiceCopy } from "./privateGuideServicesI18n";
import { buildHomegroundSocialMetadata } from "./homegroundSocialMetadata";
import { resolvePageTitle } from "./pageTitle";

export function buildPrivateGuideServiceMetadata(locale: HomegroundLocale): Metadata {
  const copy = getPrivateGuideServiceCopy(locale);
  return {
    title: resolvePageTitle(copy.metadata.title, locale),
    description: copy.metadata.description,
    ...buildHomegroundSocialMetadata({ locale, ...copy.metadata, url: privateGuideServicePath[locale] }),
    alternates: { canonical: privateGuideServicePath[locale], languages: {
      en: privateGuideServicePath.en, "zh-Hans": privateGuideServicePath.zh,
      ko: privateGuideServicePath.ko, "x-default": privateGuideServicePath.en,
    } },
    robots: { index: true, follow: true },
  };
}
