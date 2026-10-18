import { TerracottaHalfDayPage } from "./TerracottaHalfDayPage";
import { TerracottaHalfDaySend } from "./TerracottaHalfDaySend";
import { JapaneseSiteFooter, JapaneseSiteHeader } from "./JapaneseTourChrome";
import { japaneseLanguagePaths } from "../lib/japaneseSite";
import { japaneseHalfDayCopy as copy, japaneseHalfDayGuideNote, japaneseHalfDayMessage, japaneseHalfDayPath as path } from "../lib/japaneseTerracottaHalfDay";

export function JapaneseTerracottaHalfDayPage() {
  const url = `https://homegroundchina.com${path}`;
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "WebPage", "@id": `${url}#webpage`, url, name: copy.title, description: copy.description, inLanguage: "ja" },
    { "@type": "TouristTrip", "@id": `${url}#trip`, url, name: copy.title, description: copy.description, touristType: "プライベート旅行", itinerary: { "@type": "ItemList", itemListElement: copy.stops.map((stop, index) => ({ "@type": "ListItem", position: index + 1, name: stop.title, description: stop.body })) } },
    { "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "ホーム", item: "https://homegroundchina.com/ja/" },
      { "@type": "ListItem", position: 2, name: "ツアー一覧", item: "https://homegroundchina.com/ja/tours/" },
      { "@type": "ListItem", position: 3, name: copy.title, item: url },
    ] },
    { "@type": "FAQPage", "@id": `${url}#faq`, inLanguage: "ja", mainEntity: copy.faq.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) },
  ] };
  return <>
    <TerracottaHalfDayPage locale="en" edition={{
      language: "ja", copy, homePath: "/ja/", guideNote: japaneseHalfDayGuideNote,
      header: <JapaneseSiteHeader currentPath={path} contactHref="#half-day-enquiry" contactMode="anchor" languagePaths={japaneseLanguagePaths(path.replace(/^\/ja/, ""), path)} />,
      footer: <JapaneseSiteFooter currentPath={path} />,
      send: <TerracottaHalfDaySend locale="en" edition={{ language: "ja", copy, message: japaneseHalfDayMessage(), homePath: "/ja/" }} />,
    }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
  </>;
}
