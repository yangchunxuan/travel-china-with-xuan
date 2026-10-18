import { PrivateToursHubPage, type PrivateToursHubEdition } from "./PrivateToursHubPage";
import { JapaneseTourFooter, JapaneseTourHeader } from "./JapaneseTourChrome";
import { getJapanesePublishedTourCatalog } from "../lib/japanesePublishedTourCatalog";
import { getJapaneseToursHubFacets, getJapaneseToursHubCopy, japaneseToursPriorityCopy, japaneseToursPriorityReasons, japaneseToursArrivalPlanning } from "../lib/japaneseToursHubEdition";
import { terracottaHalfDaySlug } from "../lib/terracottaHalfDayTour";

export function JapaneseToursHubPage() {
  const products = getJapanesePublishedTourCatalog();
  const edition: PrivateToursHubEdition = {
    language: "ja", products, home: { path: "/ja/", skipLink: "ツアー一覧へ移動" },
    header: <JapaneseTourHeader tourSlug={null} />, footer: <JapaneseTourFooter tourSlug={null} />,
    facets: getJapaneseToursHubFacets(products), copy: getJapaneseToursHubCopy(products.length),
    priorityCopy: japaneseToursPriorityCopy, priorityReasons: japaneseToursPriorityReasons,
    arrivalPlanning: japaneseToursArrivalPlanning, plannerPath: "/ja/#planner-contact",
    originalImageSlugs: [terracottaHalfDaySlug],
  };
  return <PrivateToursHubPage locale="zh" edition={edition} />;
}
