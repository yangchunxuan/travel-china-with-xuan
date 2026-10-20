import { TourCollectionPage } from "../../../../../components/TourCollectionsPages";
import { buildTourCollectionEditionMetadata } from "../../../../../lib/editionPageMetadata";

export const metadata = buildTourCollectionEditionMetadata("multi-city", "ja");
export default function TourCollectionRoute() { return <TourCollectionPage collectionId="multi-city" editionLocale="ja" />; }
