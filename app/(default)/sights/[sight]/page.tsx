import { notFound } from "next/navigation";
import { SightPage } from "../../../../components/SightsPages";
import { isSightId, sightIds } from "../../../../lib/sights";
import { buildSightMetadata } from "../../../../lib/sightsMetadata";

export const dynamicParams = false;
export const dynamic = "force-static";

export function generateStaticParams() {
  return sightIds.map((sight) => ({ sight }));
}

export async function generateMetadata({ params }: { params: Promise<{ sight: string }> }) {
  const { sight } = await params;
  if (!isSightId(sight)) notFound();
  return buildSightMetadata(sight, "en");
}

export default async function SightRoute({ params }: { params: Promise<{ sight: string }> }) {
  const { sight } = await params;
  if (!isSightId(sight)) notFound();
  return <SightPage locale="en" sightId={sight} />;
}
