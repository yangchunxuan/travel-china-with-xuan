import { buildGermanMetadata } from './germanSite';
import type { Metadata } from 'next';
import { serviceDetailAlternates, serviceEditionPath, type ServiceDetailSlug, type ServiceEditionLocale } from './serviceEdition';
import { getPrivateGuideServiceEditionCopy } from './privateGuideServiceEditions';
import { getPrivateCarServiceEditionCopy } from './privateCarServiceEditions';
import { getAttractionReservationEditionCopy } from './attractionReservationEditions';
import { getFullTripSupportEditionCopy } from './fullTripSupportEditions';
import { attractionReservationServiceFeeCny } from './attractionReservations';
import { fillReservationCopy } from './attractionReservationsI18n';
import { buildFrenchMetadata } from './frenchSite';
import { buildSpanishMetadata } from './spanishSite';

export function buildServiceEditionMetadata(language: ServiceEditionLocale, slug: ServiceDetailSlug): Metadata {
  const copy = slug === 'private-english-speaking-guides' ? getPrivateGuideServiceEditionCopy(language)
    : slug === 'private-car-and-driver' ? getPrivateCarServiceEditionCopy(language)
    : slug === 'china-attraction-reservations' ? getAttractionReservationEditionCopy(language)
    : getFullTripSupportEditionCopy(language);
  const fee = new Intl.NumberFormat(language === 'de' ? 'de-DE' : language === 'fr' ? 'fr-FR' : 'es-ES', { style: 'currency', currency: 'CNY', currencyDisplay: 'code', maximumFractionDigits: 0 }).format(attractionReservationServiceFeeCny);
  const description = fillReservationCopy(copy.metadata.description, { fee });
  const build = language === 'de' ? buildGermanMetadata : language === 'fr' ? buildFrenchMetadata : buildSpanishMetadata;
  return build(copy.metadata.title, description, serviceEditionPath(language, slug), serviceDetailAlternates(slug));
}
