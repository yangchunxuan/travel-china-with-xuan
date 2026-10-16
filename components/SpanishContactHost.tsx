'use client';
import { spanishContactEdition } from '../lib/spanishContactEdition';
import { spanishConsentCopy } from '../lib/spanishConsentCopy';
import { AnalyticsConsent } from './AnalyticsConsent';
import { NavigationFeedback } from './NavigationFeedback';
import { ContactCardHost } from './ContactCardHost';
import { TourContactPanel } from './TourContactPanel';
export function SpanishContactHost() {
  return <><NavigationFeedback locale="en" /><AnalyticsConsent locale="en" edition={{ copy: spanishConsentCopy, privacyHref: '/es/privacy/' }} /><TourContactPanel locale="en" edition={spanishContactEdition} /><ContactCardHost locale="en" edition={spanishContactEdition} /></>;
}
