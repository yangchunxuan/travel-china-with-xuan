import { TourCollectionPage } from "../../../../../components/TourCollectionsPages";
import { buildTourCollectionEditionMetadata } from "../../../../../lib/editionPageMetadata";

export const metadata = buildTourCollectionEditionMetadata("seasonal", "ar");
export default function TourCollectionRoute() { return <TourCollectionPage collectionId="seasonal" editionLocale="ar" />; }
