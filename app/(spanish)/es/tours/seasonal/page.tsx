import { TourCollectionPage } from "../../../../../components/TourCollectionsPages";
import { buildTourCollectionEditionMetadata } from "../../../../../lib/editionPageMetadata";

export const metadata = buildTourCollectionEditionMetadata("seasonal", "es");
export default function TourCollectionRoute() { return <TourCollectionPage collectionId="seasonal" editionLocale="es" />; }
