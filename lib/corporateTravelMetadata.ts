import type { Metadata } from "next";
import type { CorporateLocale, CorporateTrip } from "./corporateTravelTypes";
import { corporateHubPathFor, corporateLocales, corporateTripPathFor } from "./corporateTravelTypes";
import { getCorporateHubCopy } from "./corporateTravelHub";
import { getCorporateTrips } from "./corporateTravel";
import { homegroundBusiness } from "./homegroundBusiness";

const site = "https://homegroundchina.com";
const absolute = (path: string) => `${site}${path}`;
const provider = {
  "@type": "TravelAgency", "@id": `${site}/#organization`,
  name: homegroundBusiness.brand, legalName: homegroundBusiness.englishName,
  url: site, email: homegroundBusiness.serviceEmail,
};
/** The site writes simplified Chinese as zh-Hans in hreflang and the content manifest. */
export const corporateHreflang = (locale: CorporateLocale) => (locale === "zh" ? "zh-Hans" : locale);
const pathFor = (locale: CorporateLocale, trip?: CorporateTrip) => (trip ? corporateTripPathFor(locale, trip.slug) : corporateHubPathFor(locale));

/** Canonical, equivalent language alternates and social cards for one page. */
export function buildCorporateTravelMetadata(trip?: CorporateTrip, locale: CorporateLocale = "en"): Metadata {
  const copy = getCorporateHubCopy(locale);
  const path = pathFor(locale, trip);
  const title = trip?.seoTitle ?? copy.seoTitle;
  const description = trip?.description ?? copy.description;
  const image = trip?.hero ?? getCorporateTrips(locale)[0].hero;
  const languages = Object.fromEntries([...corporateLocales.map((code) => [corporateHreflang(code), pathFor(code, trip)]), ["x-default", pathFor("en", trip)]]);
  return {
    title: { absolute: trip ? title : `${title} | Homeground China` }, description,
    alternates: { canonical: path, languages },
    openGraph: { title, description, url: absolute(path), type: "website", locale: copy.ogLocale, siteName: homegroundBusiness.brand, images: [{ url: absolute(image.src), alt: image.alt }] },
    twitter: { card: "summary_large_image", title, description, images: [absolute(image.src)] },
  };
}

export function corporateTravelSchema(trip?: CorporateTrip, locale: CorporateLocale = "en") {
  const copy = getCorporateHubCopy(locale);
  const trips = getCorporateTrips(locale);
  const path = pathFor(locale, trip);
  const url = absolute(path);
  const faqs = trip?.faqs ?? copy.faqs;
  const homePath = locale === "en" ? "/" : `/${locale}/`;
  const crumbs = [
    { "@type": "ListItem", position: 1, name: copy.ui.home, item: absolute(homePath) },
    { "@type": "ListItem", position: 2, name: copy.ui.breadcrumb, item: absolute(corporateHubPathFor(locale)) },
    ...(trip ? [{ "@type": "ListItem", position: 3, name: trip.title, item: url }] : []),
  ];
  return { "@context": "https://schema.org", "@graph": [
    { "@type": trip ? "WebPage" : "CollectionPage", "@id": `${url}#webpage`, url, name: trip?.title ?? copy.h1, description: trip?.description ?? copy.description, inLanguage: copy.htmlLang, isPartOf: { "@id": `${site}/#website` }, mainEntity: { "@id": `${url}${trip ? "#sample-trip" : "#programmes"}` } },
    { "@type": "BreadcrumbList", "@id": `${url}#breadcrumb`, itemListElement: crumbs },
    provider,
    { "@type": "Service", "@id": `${url}#service`, name: trip?.title ?? copy.h1, serviceType: "Company travel planning and ground arrangements in China", provider: { "@id": provider["@id"] }, areaServed: { "@type": "Country", name: "China" }, url },
    trip ? { "@type": "TouristTrip", "@id": `${url}#sample-trip`, name: trip.title, description: trip.description, url, touristType: ["Company teams", "Incentive travel groups"], provider: { "@id": provider["@id"] }, image: absolute(trip.hero.src), itinerary: { "@type": "ItemList", itemListElement: trip.days.map((day, index) => ({ "@type": "ListItem", position: index + 1, name: `${copy.ui.day.replace("{n}", String(index + 1))}: ${day.title}`, description: day.summary })) } } : { "@type": "ItemList", "@id": `${url}#programmes`, name: copy.samples.eyebrow, numberOfItems: trips.length, itemListElement: trips.map((sample, index) => ({ "@type": "ListItem", position: index + 1, name: sample.title, url: absolute(corporateTripPathFor(locale, sample.slug)) })) },
    { "@type": "FAQPage", "@id": `${url}#faq`, mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) },
  ] };
}
