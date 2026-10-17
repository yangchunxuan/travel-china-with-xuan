'use client';
import { arabicContactEdition } from '../lib/arabicContactEdition';
import { arabicConsentCopy } from '../lib/arabicConsentCopy';
import { AnalyticsConsent } from './AnalyticsConsent';
import { NavigationFeedback } from './NavigationFeedback';
import { ContactCardHost } from './ContactCardHost';
import { TourContactPanel } from './TourContactPanel';
export function ArabicContactHost() {
  return <><NavigationFeedback locale="en" /><AnalyticsConsent locale="en" edition={{ copy: arabicConsentCopy, privacyHref: '/ar/privacy/' }} /><TourContactPanel locale="en" edition={arabicContactEdition} /><ContactCardHost locale="en" edition={arabicContactEdition} /></>;
}
