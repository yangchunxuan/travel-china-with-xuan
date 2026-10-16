'use client';
import { frenchContactEdition } from '../lib/frenchContactEdition';
import { frenchConsentCopy } from '../lib/frenchConsentCopy';
import { AnalyticsConsent } from './AnalyticsConsent';
import { NavigationFeedback } from './NavigationFeedback';
import { ContactCardHost } from './ContactCardHost';
import { TourContactPanel } from './TourContactPanel';
export function FrenchContactHost() {
  return <><NavigationFeedback locale="en" /><AnalyticsConsent locale="en" edition={{ copy: frenchConsentCopy, privacyHref: '/fr/privacy/' }} /><TourContactPanel locale="en" edition={frenchContactEdition} /><ContactCardHost locale="en" edition={frenchContactEdition} /></>;
}
