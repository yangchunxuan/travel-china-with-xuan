import { CorporateEditionRoute, corporateEditionMetadata } from "../../../../../components/CorporateEditionRoute";
import { corporateTrips } from "../../../../../lib/corporateTravel";

export const dynamicParams = false;
export function generateStaticParams() { return corporateTrips.map((trip) => ({ slug: trip.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { return corporateEditionMetadata("ar", (await params).slug); }
export default async function CorporateTripRoute({ params }: { params: Promise<{ slug: string }> }) { return <CorporateEditionRoute locale="ar" slug={(await params).slug} />; }
