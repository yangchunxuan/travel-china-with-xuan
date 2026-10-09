import type { Metadata } from "next";
import type { HomegroundLocale } from "./homegroundI18n";
import { buildHomegroundSocialMetadata } from "./homegroundSocialMetadata";
import { resolvePageTitle } from "./pageTitle";
import { fillTicketReleaseCopy, getTicketReleaseMetadataCopy, getTicketReleaseTimeCopy } from "./ticketReleaseTimeI18n";
import { ticketReleaseRules, ticketReleaseToolPath } from "./ticketReleaseTimes";

const SITE_URL = "https://homegroundchina.com";
const htmlLangs: Record<HomegroundLocale, string> = { en: "en", zh: "zh-Hans", ko: "ko" };

/** Attractions whose checked release rule the tool page lists as text (in this order). */
export const ticketReleaseOtherAttractionIds = [
  "national-museum-of-china",
  "shaanxi-history-museum",
  "jade-dragon-snow-mountain",
] as const;

export function buildTicketReleaseMetadata(locale: HomegroundLocale): Metadata {
  const meta = getTicketReleaseMetadataCopy(locale);
  return {
    title: resolvePageTitle(meta.title, locale),
    description: meta.description,
    ...buildHomegroundSocialMetadata({ locale, ...meta, url: ticketReleaseToolPath[locale] }),
    alternates: {
      canonical: ticketReleaseToolPath[locale],
      languages: {
        en: ticketReleaseToolPath.en, "zh-Hans": ticketReleaseToolPath.zh,
        ko: ticketReleaseToolPath.ko, "x-default": ticketReleaseToolPath.en,
      },
    },
    robots: { index: true, follow: true },
  };
}

export function buildTicketReleaseStructuredData(locale: HomegroundLocale) {
  const copy = getTicketReleaseTimeCopy(locale);
  const rule = ticketReleaseRules["forbidden-city"];
  const fill = (template: string) => fillTicketReleaseCopy(template, { days: rule.daysBefore, time: rule.chinaTime });
  const url = SITE_URL + ticketReleaseToolPath[locale];
  const home = SITE_URL + (locale === "en" ? "/" : `/${locale}/`);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage", "@id": url + "#webpage", url,
        name: getTicketReleaseMetadataCopy(locale).title, description: getTicketReleaseMetadataCopy(locale).description,
        inLanguage: htmlLangs[locale],
        isPartOf: { "@id": SITE_URL + "/#website" },
        breadcrumb: { "@id": url + "#breadcrumb" },
        mainEntity: { "@id": url + "#tool" },
      },
      {
        "@type": "WebApplication", "@id": url + "#tool", url,
        name: copy.h1, description: fill(copy.calculator.rule),
        applicationCategory: "TravelApplication", operatingSystem: "Any",
        isAccessibleForFree: true,
        offers: { "@type": "Offer", price: 0, priceCurrency: "USD" },
        provider: { "@id": SITE_URL + "/#organization" },
      },
      {
        "@type": "BreadcrumbList", "@id": url + "#breadcrumb",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: copy.home, item: home },
          { "@type": "ListItem", position: 2, name: copy.tools, item: home + "tools/" },
          { "@type": "ListItem", position: 3, name: copy.name, item: url },
        ],
      },
      {
        "@type": "FAQPage", "@id": url + "#faq",
        mainEntity: copy.faq.map((item) => ({
          "@type": "Question", name: item.question,
          acceptedAnswer: { "@type": "Answer", text: fill(item.answer) },
        })),
      },
    ],
  };
}
