import type { HomegroundLocale } from "./homegroundI18n";
import type { PrivateCarServiceCopy } from "./privateCarServicesI18n";

export const privateCarServiceKinds = ["transfer", "sightseeing", "intercity"] as const;
export type PrivateCarServiceKind = (typeof privateCarServiceKinds)[number];
export const privateCarServiceEnquiryAnchor = "car-enquiry";
export const privateCarServicePath: Record<HomegroundLocale, string> = {
  en: "/services/private-car-and-driver/",
  zh: "/zh/services/private-car-and-driver/",
  ko: "/ko/services/private-car-and-driver/",
};

const SITE_URL = "https://homegroundchina.com";

/** A custom-quote service, with no invented price, vehicle capacity or availability. */
export function buildPrivateCarServiceStructuredData(
  locale: HomegroundLocale,
  copy: PrivateCarServiceCopy,
  htmlLang = locale === "zh" ? "zh-CN" : locale,
) {
  const url = SITE_URL + privateCarServicePath[locale];
  const home = SITE_URL + (locale === "en" ? "/" : "/" + locale + "/");
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage", "@id": url + "#webpage", url,
        name: copy.metadata.title, description: copy.metadata.description,
        inLanguage: htmlLang,
        isPartOf: { "@id": SITE_URL + "/#website" },
        about: { "@id": url + "#service" },
        breadcrumb: { "@id": url + "#breadcrumb" },
      },
      {
        "@type": "Service", "@id": url + "#service", url,
        name: copy.name, serviceType: copy.name, description: copy.lede,
        provider: { "@id": SITE_URL + "/#organization" },
        areaServed: { "@type": "Country", name: "China" },
      },
      {
        "@type": "BreadcrumbList", "@id": url + "#breadcrumb",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: copy.home, item: home },
          { "@type": "ListItem", position: 2, name: copy.services, item: home + "services/" },
          { "@type": "ListItem", position: 3, name: copy.name, item: url },
        ],
      },
      {
        "@type": "FAQPage", "@id": url + "#faq",
        mainEntity: copy.faq.map((item) => ({
          "@type": "Question", name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };
}
