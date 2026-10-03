import { notFound } from "next/navigation";
import { SightPage } from "../../../../../components/SightsPages";
import { localizedRouteLocale } from "../../../../../lib/localizedRouteLocale";
import { isSightId, sightIds } from "../../../../../lib/sights";
import { buildSightMetadata } from "../../../../../lib/sightsMetadata";

export const dynamicParams = false;
export const dynamic = "force-static";

export function generateStaticParams() {
  return (["zh", "ko"] as const).flatMap((locale) => sightIds.map((sight) => ({ locale, sight })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; sight: string }> }) {
  const { locale, sight } = await params;
  if (!isSightId(sight)) notFound();
  return buildSightMetadata(sight, localizedRouteLocale(locale));
}

export default async function LocalizedSightRoute({ params }: { params: Promise<{ locale: string; sight: string }> }) {
  const { locale, sight } = await params;
  if (!isSightId(sight)) notFound();
  return <SightPage locale={localizedRouteLocale(locale)} sightId={sight} />;
}
