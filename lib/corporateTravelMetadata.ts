import type { Metadata } from "next";
import type { CorporateTrip } from "./corporateTravelTypes";
import { corporateHubPath, corporateTripPath } from "./corporateTravelTypes";
import { corporateHubTitle, corporateHubDescription, corporateHubFaqs } from "./corporateTravelHub";
import { corporateTrips } from "./corporateTravel";
import { homegroundBusiness } from "./homegroundBusiness";
import { getCorporateEdition, corporateTranslator } from "./corporateTravelEditions";
import { corporatePath, corporateAlternates, corporateHtmlLanguage, corporateOgLocales, type CorporateLocale } from "./corporateTravelLocalePaths";

const site = "https://homegroundchina.com";
const absolute = (path: string) => `${site}${path}`;
const provider = {
  "@type": "TravelAgency", "@id": `${site}/#organization`,
  name: homegroundBusiness.brand, legalName: homegroundBusiness.englishName,
  url: site, email: homegroundBusiness.serviceEmail,
};
export function buildCorporateTravelMetadata(trip?: CorporateTrip, locale: CorporateLocale = "en"): Metadata {
  const edition = getCorporateEdition(locale);
  const path = corporatePath(locale, trip?.slug);
  const title = trip?.seoTitle ?? edition.hub.title;
  const description = trip?.description ?? edition.hub.description;
  const image = trip?.hero ?? edition.trips[0].hero;
  return {
    title: { absolute: trip ? title : `${title} | Homeground China` }, description,
    alternates: { canonical: path, languages: corporateAlternates(trip?.slug) },
    openGraph: { title, description, url: absolute(path), type: "website", locale: corporateOgLocales[locale], siteName: homegroundBusiness.brand, images: [{ url: absolute(image.src), alt: image.alt }] },
    twitter: { card: "summary_large_image", title, description, images: [absolute(image.src)] },
  };
}

export function corporateTravelSchema(trip?: CorporateTrip, locale: CorporateLocale = "en") {
  const edition = getCorporateEdition(locale), t = corporateTranslator(edition.ui);
  const path = corporatePath(locale, trip?.slug);
  const url = absolute(path);
  const faqs = trip?.faqs ?? edition.hub.faqs;
  const crumbs = [
    { "@type": "ListItem", position: 1, name: t("Home"), item: `${site}${locale === "en" ? "/" : `/${locale}/`}` },
    { "@type": "ListItem", position: 2, name: t("For companies"), item: absolute(corporatePath(locale)) },
    ...(trip ? [{ "@type": "ListItem", position: 3, name: trip.title, item: url }] : []),
  ];
  return { "@context": "https://schema.org", "@graph": [
    { "@type": trip ? "WebPage" : "CollectionPage", "@id": `${url}#webpage`, url, name: trip?.title ?? edition.hub.title, description: trip?.description ?? edition.hub.description, inLanguage: corporateHtmlLanguage(locale), isPartOf: { "@id": `${site}/#website` }, mainEntity: { "@id": `${url}${trip ? "#sample-trip" : "#programmes"}` } },
    { "@type": "BreadcrumbList", "@id": `${url}#breadcrumb`, itemListElement: crumbs },
    provider,
    { "@type": "Service", "@id": `${url}#service`, name: trip?.title ?? edition.hub.title, serviceType: t("Company travel planning and ground arrangements in China"), provider: { "@id": provider["@id"] }, areaServed: { "@type": "Country", name: "China" }, url },
    trip ? { "@type": "TouristTrip", "@id": `${url}#sample-trip`, name: trip.title, description: `${t("Sample programme, tailored quotation required.")} ${trip.description}`, url, touristType: [t("Company teams"), t("Incentive travel groups")], provider: { "@id": provider["@id"] }, image: absolute(trip.hero.src), itinerary: { "@type": "ItemList", itemListElement: trip.days.map((day, index) => ({ "@type": "ListItem", position: index + 1, name: `${t("Day {day}").replace("{day}", String(index + 1))}: ${day.title}`, description: day.summary })) } } : { "@type": "ItemList", "@id": `${url}#programmes`, name: t("Sample company trip programmes"), numberOfItems: edition.trips.length, itemListElement: edition.trips.map((sample, index) => ({ "@type": "ListItem", position: index + 1, name: sample.title, url: absolute(corporatePath(locale, sample.slug)) })) },
    { "@type": "FAQPage", "@id": `${url}#faq`, mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) },
  ] };
}
