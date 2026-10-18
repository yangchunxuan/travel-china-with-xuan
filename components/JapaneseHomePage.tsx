import type { HomepagePrivateTourItem } from "../lib/homepagePrivateTourCatalog";
import { getHomepageSearchDemos } from "../lib/homepageEditorial";
import { getJapaneseHomepageGuideChapters } from "../lib/japaneseHomepageEditorial";
import { japaneseHomeCopy } from "../lib/japaneseHomeCopy";
import { JapaneseHomePageClient } from "./JapaneseHomePageClient";

export function JapaneseHomePage({ products, teamFaces }: {
  products: readonly HomepagePrivateTourItem[];
  teamFaces: readonly { id: string; src: string }[];
}) {
  const schema = {
    "@context": "https://schema.org", "@type": "WebPage", "@id": "https://homegroundchina.com/ja/#webpage",
    url: "https://homegroundchina.com/ja/", name: japaneseHomeCopy.metadata.title,
    description: japaneseHomeCopy.metadata.description, inLanguage: "ja",
    isPartOf: { "@id": "https://homegroundchina.com/#website" }, about: { "@id": "https://homegroundchina.com/#organization" },
  };
  return <><JapaneseHomePageClient products={products} teamFaces={teamFaces} guideChapters={getJapaneseHomepageGuideChapters()} searchDemos={getHomepageSearchDemos("en")} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
  </>;
}
