import { getAttractionReservationCopy } from "./attractionReservationsI18n";
import { getDestinationHubEntry, type DestinationHubId } from "./destinationHubs";
import type { HomegroundLocale } from "./homegroundI18n";
import type { SightCityId } from "./sights";

/** A sight's city as the site names it: the booking service's cities, else the city page's title. */
export function sightCityName(city: SightCityId, locale: HomegroundLocale) {
  const bookingCities: Partial<Record<SightCityId, string>> = getAttractionReservationCopy(locale).cities;
  return bookingCities[city] ?? getDestinationHubEntry(city as DestinationHubId, locale).navTitle;
}
