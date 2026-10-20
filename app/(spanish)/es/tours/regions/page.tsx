import { TourCollectionPage } from "../../../../../components/TourCollectionsPages";
import { buildTourCollectionEditionMetadata } from "../../../../../lib/editionPageMetadata";

export const metadata = buildTourCollectionEditionMetadata("regions", "es");
export default function TourCollectionRoute() { return <TourCollectionPage collectionId="regions" editionLocale="es" />; }
