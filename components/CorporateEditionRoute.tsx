import { notFound } from "next/navigation";
import { CorporateTravelHubPage, CorporateTripPage } from "./CorporateTravelPages";
import { getCorporateTrip } from "../lib/corporateTravel";
import { buildCorporateTravelMetadata, corporateTravelSchema } from "../lib/corporateTravelMetadata";
import type { CorporateLocale } from "../lib/corporateTravelTypes";

function tripFor(locale: CorporateLocale, slug: string) {
  const trip = getCorporateTrip(slug, locale);
  if (!trip) notFound();
  return trip;
}

export function corporateEditionMetadata(locale: CorporateLocale, slug?: string) {
  return buildCorporateTravelMetadata(slug ? tripFor(locale, slug) : undefined, locale);
}

export function CorporateEditionRoute({ locale, slug }: { locale: CorporateLocale; slug?: string }) {
  const trip = slug ? tripFor(locale, slug) : undefined;
  return <>
    {trip ? <CorporateTripPage locale={locale} trip={trip} /> : <CorporateTravelHubPage locale={locale} />}
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(corporateTravelSchema(trip, locale)).replace(/</g, "\\u003c") }} />
  </>;
}
