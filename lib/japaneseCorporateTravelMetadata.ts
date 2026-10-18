import type { Metadata } from "next";
import { homegroundBusiness } from "./homegroundBusiness";
import { corporateHubPath, corporateTripPath, type CorporateTrip } from "./corporateTravelTypes";
import { japaneseCorporateHubDescription, japaneseCorporateHubFaqs, japaneseCorporateHubPath, japaneseCorporateHubTitle, japaneseCorporateTripPath, japaneseCorporateTrips } from "./japaneseCorporateTravel";

const site = "https://homegroundchina.com";
const absolute = (path: string) => `${site}${path}`;
export function buildJapaneseCorporateTravelMetadata(trip?: CorporateTrip): Metadata {
  const path = trip ? japaneseCorporateTripPath(trip.slug) : japaneseCorporateHubPath;
  const en = trip ? corporateTripPath(trip.slug) : corporateHubPath;
  const title = trip?.seoTitle ?? `${japaneseCorporateHubTitle}｜Homeground China`;
  const description = trip?.description ?? japaneseCorporateHubDescription;
  const image = trip?.hero ?? japaneseCorporateTrips[0].hero;
  return {
    title: { absolute: title }, description,
    alternates: { canonical: path, languages: { en, ja: path, "x-default": en } },
    openGraph: { title, description, url: absolute(path), type: "website", locale: "ja_JP", siteName: homegroundBusiness.brand, images: [{ url: absolute(image.src), alt: image.alt }] },
    twitter: { card: "summary_large_image", title, description, images: [absolute(image.src)] },
  };
}

export function japaneseCorporateTravelSchema(trip?: CorporateTrip) {
  const path = trip ? japaneseCorporateTripPath(trip.slug) : japaneseCorporateHubPath;
  const url = absolute(path);
  const faqs = trip?.faqs ?? japaneseCorporateHubFaqs;
  const title = trip?.title ?? japaneseCorporateHubTitle;
  const provider = { "@type": "TravelAgency", "@id": `${site}/#organization`, name: homegroundBusiness.brand, legalName: homegroundBusiness.englishName, url: site, email: homegroundBusiness.serviceEmail };
  return { "@context": "https://schema.org", "@graph": [
    { "@type": trip ? "WebPage" : "CollectionPage", "@id": `${url}#webpage`, url, name: title, description: trip?.description ?? japaneseCorporateHubDescription, inLanguage: "ja", isPartOf: { "@id": `${site}/#website` }, mainEntity: { "@id": `${url}${trip ? "#sample-trip" : "#programmes"}` } },
    { "@type": "BreadcrumbList", "@id": `${url}#breadcrumb`, itemListElement: [
      { "@type": "ListItem", position: 1, name: "ホーム", item: `${site}/ja/` },
      { "@type": "ListItem", position: 2, name: "企業向け旅行", item: absolute(japaneseCorporateHubPath) },
      ...(trip ? [{ "@type": "ListItem", position: 3, name: trip.title, item: url }] : []),
    ] }, provider,
    { "@type": "Service", "@id": `${url}#service`, name: title, serviceType: "中国の社員旅行・報奨旅行・チーム合宿の企画と現地手配", provider: { "@id": provider["@id"] }, areaServed: { "@type": "Country", name: "China" }, url },
    trip ? { "@type": "TouristTrip", "@id": `${url}#sample-trip`, name: trip.title, description: `日程と人数に合わせて見積もるモデルプランです。${trip.description}`, url, touristType: ["企業のチーム", "インセンティブ旅行"], provider: { "@id": provider["@id"] }, image: absolute(trip.hero.src), itinerary: { "@type": "ItemList", itemListElement: trip.days.map((day, index) => ({ "@type": "ListItem", position: index + 1, name: `${index + 1}日目：${day.title}`, description: day.summary })) } }
      : { "@type": "ItemList", "@id": `${url}#programmes`, name: "企業向け旅行のモデルプラン", numberOfItems: japaneseCorporateTrips.length, itemListElement: japaneseCorporateTrips.map((sample, index) => ({ "@type": "ListItem", position: index + 1, name: sample.title, url: absolute(japaneseCorporateTripPath(sample.slug)) })) },
    { "@type": "FAQPage", "@id": `${url}#faq`, inLanguage: "ja", mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) },
  ] };
}
