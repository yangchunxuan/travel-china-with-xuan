import type { Metadata } from "next";
import type { CorporateTrip } from "./corporateTravelTypes";
import { corporateHubPath, corporateTripPath } from "./corporateTravelTypes";
import { corporateHubTitle, corporateHubDescription, corporateHubFaqs } from "./corporateTravelHub";
import { corporateTrips } from "./corporateTravel";
import { homegroundBusiness } from "./homegroundBusiness";

const site = "https://homegroundchina.com";
const absolute = (path: string) => `${site}${path}`;
const provider = {
  "@type": "TravelAgency", "@id": `${site}/#organization`,
  name: homegroundBusiness.brand, legalName: homegroundBusiness.englishName,
  url: site, email: homegroundBusiness.serviceEmail,
};
export function buildCorporateTravelMetadata(trip?: CorporateTrip): Metadata {
  const path = trip ? corporateTripPath(trip.slug) : corporateHubPath;
  const title = trip?.seoTitle ?? corporateHubTitle;
  const description = trip?.description ?? corporateHubDescription;
  const image = trip?.hero ?? corporateTrips[0].hero;
  return {
    title: { absolute: trip ? title : `${title} | Homeground China` }, description,
    alternates: { canonical: path, languages: { en: path, "x-default": path } },
    openGraph: { title, description, url: absolute(path), type: "website", locale: "en_US", siteName: homegroundBusiness.brand, images: [{ url: absolute(image.src), alt: image.alt }] },
    twitter: { card: "summary_large_image", title, description, images: [absolute(image.src)] },
  };
}

export function corporateTravelSchema(trip?: CorporateTrip) {
  const path = trip ? corporateTripPath(trip.slug) : corporateHubPath;
  const url = absolute(path);
  const faqs = trip?.faqs ?? corporateHubFaqs;
  const crumbs = [
    { "@type": "ListItem", position: 1, name: "Home", item: `${site}/` },
    { "@type": "ListItem", position: 2, name: "For Companies", item: absolute(corporateHubPath) },
    ...(trip ? [{ "@type": "ListItem", position: 3, name: trip.title, item: url }] : []),
  ];
  return { "@context": "https://schema.org", "@graph": [
    { "@type": trip ? "WebPage" : "CollectionPage", "@id": `${url}#webpage`, url, name: trip?.title ?? corporateHubTitle, description: trip?.description ?? corporateHubDescription, inLanguage: "en", isPartOf: { "@id": `${site}/#website` }, mainEntity: { "@id": `${url}${trip ? "#sample-trip" : "#programmes"}` } },
    { "@type": "BreadcrumbList", "@id": `${url}#breadcrumb`, itemListElement: crumbs },
    provider,
    { "@type": "Service", "@id": `${url}#service`, name: trip?.title ?? corporateHubTitle, serviceType: "Company travel planning and ground arrangements in China", provider: { "@id": provider["@id"] }, areaServed: { "@type": "Country", name: "China" }, url },
    trip ? { "@type": "TouristTrip", "@id": `${url}#sample-trip`, name: trip.title, description: `Sample programme, tailored quotation required. ${trip.description}`, url, touristType: ["Company teams", "Incentive travel groups"], provider: { "@id": provider["@id"] }, image: absolute(trip.hero.src), itinerary: { "@type": "ItemList", itemListElement: trip.days.map((day, index) => ({ "@type": "ListItem", position: index + 1, name: `Day ${index + 1}: ${day.title}`, description: day.summary })) } } : { "@type": "ItemList", "@id": `${url}#programmes`, name: "Sample company trip programmes", numberOfItems: corporateTrips.length, itemListElement: corporateTrips.map((sample, index) => ({ "@type": "ListItem", position: index + 1, name: sample.title, url: absolute(corporateTripPath(sample.slug)) })) },
    { "@type": "FAQPage", "@id": `${url}#faq`, mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) },
  ] };
}
