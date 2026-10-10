import type { Metadata } from "next";
import { JapaneseHomePage } from "../../../components/JapaneseHomePage";
import { japaneseHomeCopy } from "../../../lib/japaneseHomeCopy";
import { buildJapaneseSocialMetadata, japaneseAlternates, japaneseSite } from "../../../lib/japaneseSite";
import { homepagePrivateTourSlugs, type HomepagePrivateTourItem } from "../../../lib/homepagePrivateTourCatalog";
import { getHomepageTeamFaces } from "../../../lib/homegroundStudioI18n";
import { localizeJapanesePrivateTourProduct } from "../../../lib/localizeJapanesePrivateTourProduct";
import { getPrivateTourProduct } from "../../../lib/privateTourProducts";
import { getPrivateTourStartingPrice, getPrivateTourTwoTravellerPrice } from "../../../lib/privateTourStartingPrice";
import { japaneseTourEntryHref } from "../../../lib/japaneseTourCatalog";

const copy = japaneseHomeCopy;

export const metadata: Metadata = {
  title: { absolute: copy.metadata.title },
  description: copy.metadata.description,
  alternates: { canonical: japaneseSite.home, languages: japaneseAlternates("/", japaneseSite.home) },
  robots: { index: true, follow: true },
  ...buildJapaneseSocialMetadata({
    title: copy.metadata.title,
    description: copy.metadata.description,
    url: japaneseSite.home,
  }),
};

/** The same six featured routes as the English homepage, from the Japanese product copy. */
function japaneseHomepageProducts(): HomepagePrivateTourItem[] {
  return homepagePrivateTourSlugs.flatMap((slug) => {
    const product = getPrivateTourProduct(slug);
    if (!product) return [];
    const tour = localizeJapanesePrivateTourProduct(product);
    const starting = getPrivateTourStartingPrice(tour);
    const twoTravellers = getPrivateTourTwoTravellerPrice(tour);
    return [{
      id: tour.slug,
      kind: "tour" as const,
      title: tour.title,
      appeal: tour.lede,
      days: tour.days,
      nights: tour.nights,
      href: japaneseTourEntryHref(tour),
      startingPrice: starting ? {
        formatted: starting.formatted,
        travelers: starting.travelers,
        serviceLabel: starting.serviceLabel,
        selection: starting.selection,
      } : null,
      ...(twoTravellers ? { twoTravellerPrice: { formatted: twoTravellers.formatted } } : {}),
      image: {
        src: tour.heroImage.src,
        alt: tour.heroImage.alt,
        width: tour.heroImage.width,
        height: tour.heroImage.height,
        objectPosition: tour.heroImage.objectPosition,
      },
    }];
  });
}

export default function JapaneseHome() {
  return <JapaneseHomePage products={japaneseHomepageProducts()} teamFaces={getHomepageTeamFaces("en")} />;
}
