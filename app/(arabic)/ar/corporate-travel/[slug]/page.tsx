import { CorporateEditionRoute, corporateEditionMetadata } from "../../../../../components/CorporateEditionRoute";
import { corporateTrips } from "../../../../../lib/corporateTravel";
export const dynamicParams = false;
export function generateStaticParams() { return corporateTrips.map(trip => ({ slug: trip.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; return corporateEditionMetadata("ar", slug); }
export default async function Page({ params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; return <CorporateEditionRoute locale={"ar"} slug={slug} />; }
