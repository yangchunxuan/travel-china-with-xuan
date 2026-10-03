import type { Metadata } from "next";
import { TourCollectionPage } from "../../../../../components/TourCollectionsPages";
import { localizedRouteLocale } from "../../../../../lib/localizedRouteLocale";
import { buildTourCollectionMetadata } from "../../../../../lib/tourCollectionsMetadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildTourCollectionMetadata("multi-city", localizedRouteLocale(locale));
}
export default async function LocalizedTourCollectionRoute({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <TourCollectionPage collectionId="multi-city" locale={localizedRouteLocale(locale)} />;
}
