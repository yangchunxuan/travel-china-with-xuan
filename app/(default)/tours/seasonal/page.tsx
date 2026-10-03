import type { Metadata } from "next";
import { TourCollectionPage } from "../../../../components/TourCollectionsPages";
import { buildTourCollectionMetadata } from "../../../../lib/tourCollectionsMetadata";

export const metadata: Metadata = buildTourCollectionMetadata("seasonal", "en");
export default function TourCollectionRoute() { return <TourCollectionPage collectionId="seasonal" locale="en" />; }
