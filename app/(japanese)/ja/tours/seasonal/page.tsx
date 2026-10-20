import { TourCollectionPage } from "../../../../../components/TourCollectionsPages";
import { buildTourCollectionEditionMetadata } from "../../../../../lib/editionPageMetadata";

export const metadata = buildTourCollectionEditionMetadata("seasonal", "ja");
export default function TourCollectionRoute() { return <TourCollectionPage collectionId="seasonal" editionLocale="ja" />; }
