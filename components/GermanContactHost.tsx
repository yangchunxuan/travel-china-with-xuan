'use client';
import { germanContactEdition } from '../lib/germanContactEdition';
import { germanConsentCopy } from '../lib/germanConsentCopy';
import { AnalyticsConsent } from './AnalyticsConsent';
import { NavigationFeedback } from './NavigationFeedback';
import { ContactCardHost } from './ContactCardHost';
import { TourContactPanel } from './TourContactPanel';
export function GermanContactHost() {
  return <><NavigationFeedback locale="en" /><AnalyticsConsent locale="en" edition={{ copy: germanConsentCopy, privacyHref: '/de/privacy/' }} /><TourContactPanel locale="en" edition={germanContactEdition} /><ContactCardHost locale="en" edition={germanContactEdition} /></>;
}
