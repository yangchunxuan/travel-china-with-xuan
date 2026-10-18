import { notFound } from "next/navigation";
import { JapaneseCorporateTripPage } from "../../../../../components/JapaneseCorporateTravelPages";
import { getJapaneseCorporateTrip, japaneseCorporateTrips } from "../../../../../lib/japaneseCorporateTravel";
import { buildJapaneseCorporateTravelMetadata, japaneseCorporateTravelSchema } from "../../../../../lib/japaneseCorporateTravelMetadata";

export const dynamicParams = false;
export function generateStaticParams() { return japaneseCorporateTrips.map((trip) => ({ slug: trip.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const trip = getJapaneseCorporateTrip((await params).slug);
  if (!trip) notFound();
  return buildJapaneseCorporateTravelMetadata(trip);
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const trip = getJapaneseCorporateTrip((await params).slug);
  if (!trip) notFound();
  return <><JapaneseCorporateTripPage trip={trip} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(japaneseCorporateTravelSchema(trip)).replace(/</g, "\\u003c") }} /></>;
}
