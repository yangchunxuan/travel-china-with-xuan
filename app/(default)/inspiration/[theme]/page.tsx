import { notFound } from "next/navigation";
import { TravelInspirationThemePage } from "../../../../components/TravelInspirationPages";
import { isTravelInspirationThemeId, travelInspirationThemeIds } from "../../../../lib/travelInspiration";
import { buildTravelInspirationThemeMetadata } from "../../../../lib/travelInspirationMetadata";

export const dynamicParams = false;
export const dynamic = "force-static";

export function generateStaticParams() {
  return travelInspirationThemeIds.map((theme) => ({ theme }));
}

export async function generateMetadata({ params }: { params: Promise<{ theme: string }> }) {
  const { theme } = await params;
  if (!isTravelInspirationThemeId(theme)) notFound();
  return buildTravelInspirationThemeMetadata(theme, "en");
}

export default async function TravelInspirationThemeRoute({ params }: { params: Promise<{ theme: string }> }) {
  const { theme } = await params;
  if (!isTravelInspirationThemeId(theme)) notFound();
  return <TravelInspirationThemePage locale="en" themeId={theme} />;
}
