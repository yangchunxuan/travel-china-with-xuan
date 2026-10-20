import { TourCollectionPage } from "../../../../../components/TourCollectionsPages";
import { buildTourCollectionEditionMetadata } from "../../../../../lib/editionPageMetadata";

export const metadata = buildTourCollectionEditionMetadata("regions", "fr");
export default function TourCollectionRoute() { return <TourCollectionPage collectionId="regions" editionLocale="fr" />; }
