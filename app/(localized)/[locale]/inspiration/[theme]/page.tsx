import { notFound } from "next/navigation";
import { TravelInspirationThemePage } from "../../../../../components/TravelInspirationPages";
import { localizedRouteLocale } from "../../../../../lib/localizedRouteLocale";
import { isTravelInspirationThemeId, travelInspirationThemeIds } from "../../../../../lib/travelInspiration";
import { buildTravelInspirationThemeMetadata } from "../../../../../lib/travelInspirationMetadata";

export const dynamicParams = false;
export const dynamic = "force-static";

export function generateStaticParams() {
  return (["zh", "ko"] as const).flatMap((locale) =>
    travelInspirationThemeIds.map((theme) => ({ locale, theme })),
  );
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; theme: string }> }) {
  const { locale, theme } = await params;
  if (!isTravelInspirationThemeId(theme)) notFound();
  return buildTravelInspirationThemeMetadata(theme, localizedRouteLocale(locale));
}

export default async function LocalizedTravelInspirationThemeRoute({ params }: { params: Promise<{ locale: string; theme: string }> }) {
  const { locale, theme } = await params;
  if (!isTravelInspirationThemeId(theme)) notFound();
  return <TravelInspirationThemePage locale={localizedRouteLocale(locale)} themeId={theme} />;
}
