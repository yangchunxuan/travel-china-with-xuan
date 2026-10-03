import type { Metadata } from "next";
import { TravelInspirationHubPage } from "../../../../components/TravelInspirationPages";
import { localizedRouteLocale } from "../../../../lib/localizedRouteLocale";
import { buildTravelInspirationMetadata } from "../../../../lib/travelInspirationMetadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildTravelInspirationMetadata(localizedRouteLocale(locale));
}
export default async function LocalizedTravelInspirationRoute({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <TravelInspirationHubPage locale={localizedRouteLocale(locale)} />;
}
