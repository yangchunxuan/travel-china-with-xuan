"use client";
import type { HomepageGuideChapter, HomepageSearchDemo } from "../lib/homepageEditorial";
import type { HomepagePrivateTourItem } from "../lib/homepagePrivateTourCatalog";
import { HomegroundHomePage, type HomepageEdition } from "./HomegroundHomePage";
import { JapaneseSiteHeader } from "./JapaneseTourChrome";
import { JapaneseFooter } from "./JapaneseFooter";
import { JapaneseHomeContact } from "./JapaneseHomeContact";
import { japaneseGeneralContactHrefs, japaneseLanguagePaths, japaneseSite } from "../lib/japaneseSite";
import { japaneseHomeCopy } from "../lib/japaneseHomeCopy";
import { japaneseHomepageEditionCopy, japaneseHomepageGuideSearchCopy, japaneseHomepageShowcaseCopy } from "../lib/japaneseHomepageEdition";

export function JapaneseHomePageClient({ products, guideChapters, searchDemos, teamFaces }: {
  products: readonly HomepagePrivateTourItem[]; guideChapters: readonly HomepageGuideChapter[];
  searchDemos: readonly HomepageSearchDemo[]; teamFaces: readonly { id: string; src: string }[];
}) {
  const contact = japaneseGeneralContactHrefs(japaneseSite.home);
  const edition: HomepageEdition = {
    language: "ja", copy: japaneseHomepageEditionCopy, showcase: japaneseHomepageShowcaseCopy,
    paths: { tours: japaneseSite.tours, guides: japaneseSite.guides, destinations: japaneseSite.explore, studio: japaneseSite.studio },
    products: { language: "ja", copy: japaneseHomeCopy.showcase, hubHref: japaneseSite.tours },
    guideSearch: { copy: japaneseHomepageGuideSearchCopy, topicPaths: { plan: "/ja/guides/how-much-does-a-china-trip-cost/", transport: "/ja/guides/shanghai-hangzhou-transport-route/", stay: "/stay/" } },
    planningScope: { language: "ja", copy: japaneseHomeCopy.planningScope, ctaHref: "#planner-contact" },
    header: <JapaneseSiteHeader contactHref="#planner-contact" currentPath={japaneseSite.home} languagePaths={japaneseLanguagePaths("/", japaneseSite.home)} />,
    footer: <JapaneseFooter currentPath={japaneseSite.home} variant="homepage" />,
    contactPanel: <JapaneseHomeContact emailHref={contact.email} whatsappHref={contact.whatsapp} />,
  };
  return <HomegroundHomePage locale="en" edition={edition} destinationHubItems={[]} guideChapters={guideChapters} privateTourItems={products} searchDemos={searchDemos} teamFaces={teamFaces} />;
}
