import type { Metadata } from "next";
import type { HomegroundLocale } from "./homegroundI18n";
import { privateGuideServicePath } from "./privateGuideServices";
import { getPrivateGuideServiceCopy } from "./privateGuideServicesI18n";
import { buildHomegroundSocialMetadata } from "./homegroundSocialMetadata";
import { resolvePageTitle } from "./pageTitle";
import { serviceDetailAlternates } from "./serviceEdition";

export function buildPrivateGuideServiceMetadata(locale: HomegroundLocale): Metadata {
  const copy = getPrivateGuideServiceCopy(locale);
  return {
    title: resolvePageTitle(copy.metadata.title, locale),
    description: copy.metadata.description,
    ...buildHomegroundSocialMetadata({ locale, ...copy.metadata, url: privateGuideServicePath[locale] }),
    alternates: { canonical: privateGuideServicePath[locale], languages: serviceDetailAlternates('private-english-speaking-guides') },
    robots: { index: true, follow: true },
  };
}
