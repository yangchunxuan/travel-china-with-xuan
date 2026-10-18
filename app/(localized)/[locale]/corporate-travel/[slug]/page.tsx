import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CorporateTripPage } from "../../../../../components/CorporateTravelPages";
import { corporateTrips, getCorporateTrip } from "../../../../../lib/corporateTravel";
import { buildCorporateTravelMetadata, corporateTravelSchema } from "../../../../../lib/corporateTravelMetadata";
import { localizedRouteLocale } from "../../../../../lib/localizedRouteLocale";

export const dynamicParams = false;
export function generateStaticParams() { return corporateTrips.map((trip) => ({ slug: trip.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale: routeLocale, slug } = await params;
  const locale = localizedRouteLocale(routeLocale);
  const trip = getCorporateTrip(slug, locale);
  if (!trip) notFound();
  return buildCorporateTravelMetadata(trip, locale);
}

export default async function LocalizedCorporateTripRoute({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale: routeLocale, slug } = await params;
  const locale = localizedRouteLocale(routeLocale);
  const trip = getCorporateTrip(slug, locale);
  if (!trip) notFound();
  return <><CorporateTripPage locale={locale} trip={trip} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(corporateTravelSchema(trip, locale)).replace(/</g, "\\u003c") }} /></>;
}
