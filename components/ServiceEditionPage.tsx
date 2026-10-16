import type { ServiceDetailSlug, ServiceEditionLocale } from '../lib/serviceEdition';
import { PrivateGuideServicesPage } from './PrivateGuideServicesPage';
import { PrivateCarServicesPage } from './PrivateCarServicesPage';
import { AttractionReservationsPage } from './AttractionReservationsPage';
import { FullTripSupportPage } from './FullTripSupportPage';

export function ServiceEditionPage({ language, slug }: { language: ServiceEditionLocale; slug: ServiceDetailSlug }) {
  if (slug === 'private-english-speaking-guides') return <PrivateGuideServicesPage locale="en" editionLocale={language} />;
  if (slug === 'private-car-and-driver') return <PrivateCarServicesPage locale="en" editionLocale={language} />;
  if (slug === 'china-attraction-reservations') return <AttractionReservationsPage locale="en" editionLocale={language} />;
  return <FullTripSupportPage locale="en" editionLocale={language} />;
}
