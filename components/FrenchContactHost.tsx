'use client';
import { useEffect } from 'react';
import { frenchContactEdition } from '../lib/frenchContactEdition';
import { setConsentBannerPending } from '../lib/siteOverlayState';
import { ContactCardHost } from './ContactCardHost';
import { TourContactPanel } from './TourContactPanel';
export function FrenchContactHost() {
  useEffect(() => { setConsentBannerPending(false); }, []);
  return <><TourContactPanel locale="en" edition={frenchContactEdition} /><ContactCardHost locale="en" edition={frenchContactEdition} /></>;
}
