import { notFound } from "next/navigation";
import { CorporateTripPage } from "../../../../components/CorporateTravelPages";
import { corporateTrips, getCorporateTrip } from "../../../../lib/corporateTravel";
import { buildCorporateTravelMetadata, corporateTravelSchema } from "../../../../lib/corporateTravelMetadata";

export const dynamicParams = false;
export function generateStaticParams() { return corporateTrips.map((trip) => ({ slug: trip.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const trip = getCorporateTrip((await params).slug);
  if (!trip) notFound();
  return buildCorporateTravelMetadata(trip);
}
export default async function CorporateTripRoute({ params }: { params: Promise<{ slug: string }> }) {
  const trip = getCorporateTrip((await params).slug);
  if (!trip) notFound();
  return <><CorporateTripPage trip={trip} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(corporateTravelSchema(trip)).replace(/</g, "\\u003c") }} /></>;
}
