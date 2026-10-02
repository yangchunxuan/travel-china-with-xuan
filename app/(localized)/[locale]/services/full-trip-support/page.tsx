import type { Metadata } from "next";
import { FullTripSupportPage } from "../../../../../components/FullTripSupportPage";
import { buildFullTripSupportMetadata } from "../../../../../lib/fullTripSupportMetadata";
import { localizedRouteLocale } from "../../../../../lib/localizedRouteLocale";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildFullTripSupportMetadata(localizedRouteLocale(locale));
}
export default async function LocalizedFullTripSupportRoute({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <FullTripSupportPage locale={localizedRouteLocale(locale)} />;
}
