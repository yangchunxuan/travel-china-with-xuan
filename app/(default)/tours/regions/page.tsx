import type { Metadata } from "next";
import { TourCollectionPage } from "../../../../components/TourCollectionsPages";
import { buildTourCollectionMetadata } from "../../../../lib/tourCollectionsMetadata";

export const metadata: Metadata = buildTourCollectionMetadata("regions", "en");
export default function TourCollectionRoute() { return <TourCollectionPage collectionId="regions" locale="en" />; }
