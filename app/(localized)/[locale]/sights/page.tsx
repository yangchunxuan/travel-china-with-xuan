import type { Metadata } from "next";
import { SightsHubPage } from "../../../../components/SightsPages";
import { localizedRouteLocale } from "../../../../lib/localizedRouteLocale";
import { buildSightsMetadata } from "../../../../lib/sightsMetadata";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return buildSightsMetadata(localizedRouteLocale(locale));
}
export default async function LocalizedSightsRoute({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <SightsHubPage locale={localizedRouteLocale(locale)} />;
}
