import type { Metadata } from "next";
import { attractionReservationPath, attractionReservationServiceFeeCny, formatAttractionReservationFee } from "./attractionReservations";
import { fillReservationCopy, getAttractionReservationCopy } from "./attractionReservationsI18n";
import type { HomegroundLocale } from "./homegroundI18n";
import { buildHomegroundSocialMetadata } from "./homegroundSocialMetadata";
import { resolvePageTitle } from "./pageTitle";
import { serviceDetailAlternates } from "./serviceEdition";

export function buildAttractionReservationMetadata(locale: HomegroundLocale): Metadata {
  const copy = getAttractionReservationCopy(locale);
  const description = fillReservationCopy(copy.metadata.description, {
    fee: formatAttractionReservationFee(attractionReservationServiceFeeCny, locale),
  });
  const canonical = attractionReservationPath[locale];
  return {
    title: resolvePageTitle(copy.metadata.title, locale),
    description,
    ...buildHomegroundSocialMetadata({ locale, title: copy.metadata.title, description, url: canonical }),
    alternates: {
      canonical,
      languages: serviceDetailAlternates('china-attraction-reservations'),
    },
    robots: { index: true, follow: true },
  };
}
