import type { Metadata } from "next";
import type { HomegroundLocale } from "./homegroundI18n";
import { privateCarServicePath } from "./privateCarServices";
import { getPrivateCarServiceCopy } from "./privateCarServicesI18n";
import { buildHomegroundSocialMetadata } from "./homegroundSocialMetadata";
import { resolvePageTitle } from "./pageTitle";

export function buildPrivateCarServiceMetadata(locale: HomegroundLocale): Metadata {
  const copy = getPrivateCarServiceCopy(locale);
  return {
    title: resolvePageTitle(copy.metadata.title, locale),
    description: copy.metadata.description,
    ...buildHomegroundSocialMetadata({ locale, ...copy.metadata, url: privateCarServicePath[locale] }),
    alternates: {
      canonical: privateCarServicePath[locale],
      languages: {
        en: privateCarServicePath.en, "zh-Hans": privateCarServicePath.zh,
        ko: privateCarServicePath.ko, "x-default": privateCarServicePath.en,
      },
    },
    robots: { index: true, follow: true },
  };
}
