import { TourCollectionPage } from "../../../../../components/TourCollectionsPages";
import { buildTourCollectionEditionMetadata } from "../../../../../lib/editionPageMetadata";

export const metadata = buildTourCollectionEditionMetadata("seasonal", "de");
export default function TourCollectionRoute() { return <TourCollectionPage collectionId="seasonal" editionLocale="de" />; }
