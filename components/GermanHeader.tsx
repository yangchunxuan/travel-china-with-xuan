"use client";

import { HomegroundHeader, type HomegroundHeaderEdition, type HomegroundPageContext } from './HomegroundHeader';
import { getHomegroundCopy } from '../lib/homegroundI18n';
import { getHomegroundNavigationModel } from '../lib/homegroundNavigationModel';
import { germanLanguagePaths, germanSite, type GermanLanguagePath } from '../lib/germanSite';
import { getPrivateTourInquiryContext } from '../lib/privateTourInquiryContext';
import { openTourContactForContext } from '../lib/tourContact';
import { usePrivateTourSelection } from './PrivateTourSelection';
import { destinationsHubEditionPath, hasAllDestinationEditionCities } from '../lib/destinationEditions';

const source = getHomegroundCopy('en');
const navigationSource = getHomegroundNavigationModel('en', '/', { includeCorporateTravel: false });
const germanItems = {
  // The hub and, once every city page is German, the city guides are local: the item loses its English marker.
  destinations: { label: 'Reiseziele', description: hasAllDestinationEditionCities('de') ? 'Städte, Reiseideen und Sehenswürdigkeiten' : 'Städte, Reiseideen und Sehenswürdigkeiten – Ratgeber auf Englisch', href: destinationsHubEditionPath.de },
  tours: { label: 'Reisen', description: 'Routen und veröffentlichte Preise vergleichen', href: '/de/tours/' },
  services: { label: 'Leistungen', description: 'Tickets, Reiseleitung, Fahrer und Reiseorganisation', href: '/de/services/' },
  guides: { label: 'Reisetipps', description: 'Einreise, Verkehr, Unterkünfte und Reisezeit', href: '/de/guides/' },
  studio: { label: 'Über uns', description: 'Unser Team, unsere Arbeitsweise und unsere Lizenzen', href: '/de/studio/' },
} as const;
const germanEntries: Readonly<Record<string, { label: string; description: string; href: string }>> = {
  cities: { label: 'Städte', description: 'Peking, Shanghai, Xi’an und fünf weitere Reiseziele', href: destinationsHubEditionPath.de },
  inspiration: { label: 'Reiseideen', description: 'Reisewünsche, Themen und passende Routen', href: '/de/inspiration/' },
  sights: { label: 'Sehenswürdigkeiten', description: 'Die Große Mauer, die Terrakotta-Armee und vieles mehr', href: '/de/sights/' },
  'all-tours': { label: 'Alle Reisen', description: 'Regionen, Reisedauer und Preise vergleichen', href: '/de/tours/' },
  'multi-city': { label: 'Rundreisen (Englisch)', description: 'Mehrere große Reiseziele in einer Reise verbinden', href: '/tours/multi-city/' },
  regions: { label: 'Regionen (Englisch)', description: 'Ostchina, Südwestchina, Südchina und weitere Regionen', href: '/tours/regions/' },
  seasonal: { label: 'Saisonreisen (Englisch)', description: 'Winter im Nordosten: Harbin und das Changbai-Gebirge', href: '/tours/seasonal/' },
  'attraction-tickets': { label: 'Tickets und Reservierungen', description: 'Wir buchen Ihre Tickets. Melden Sie sich, sobald Ihre Termine feststehen.', href: '/de/services/china-attraction-reservations/' },
  'english-guides': { label: 'Private englischsprachige Reiseleitung', description: 'Private Tagesführungen auf Englisch in vier Städten', href: '/de/services/private-english-speaking-guides/' },
  'private-car': { label: 'Privatwagen mit Fahrer', description: 'Flughafentransfers und Tagesfahrten im Privatwagen', href: '/de/services/private-car-and-driver/' },
  'trip-support': { label: 'Reiseorganisation', description: 'Hotels, Transfers und Koordination vor Ort', href: '/de/services/full-trip-support/' },
  company: { label: 'Unser Anspruch (Englisch)', description: 'Warum es Homeground gibt und wofür wir stehen', href: '/company/' },
  planning: { label: 'Unser Team und unsere Arbeitsweise', description: 'So planen wir Reisen, die vor Ort funktionieren', href: '/de/studio/' },
  credentials: { label: 'Lizenzen und Registrierung', description: 'Offizielle Angaben zum Nachprüfen', href: '/de/business-information/' },
};
const toggles: Readonly<Record<string, string>> = {
  destinations: 'Menü Reiseziele öffnen', tours: 'Menü Reisen öffnen',
  services: 'Menü Leistungen öffnen', studio: 'Menü Über uns öffnen',
};
const navigation: HomegroundHeaderEdition['navigation'] = {
  mobileCta: 'Planen',
  items: navigationSource.items.map(item => ({ ...item, ...germanItems[item.id] })),
  menus: Object.fromEntries(Object.entries(navigationSource.menus).map(([id, menu]) => [id, {
    toggle: toggles[id], entries: menu.entries.map(entry => ({ ...entry, ...germanEntries[entry.id] })),
  }])),
};
const copy: HomegroundHeaderEdition['copy'] = {
  path: '/de/', businessDescriptor: 'Reiseveranstalter in China',
  navigation: {
    ...source.navigation,
    primaryLabel: 'Hauptnavigation', mobileLabel: 'Hauptmenü', mobileServicesLabel: 'Leistungen',
    menuTagline: 'China auf Ihre Art. Wir sind an Ihrer Seite.', footerLabel: 'Navigation in der Fußzeile',
    languageLabel: 'Sprache auswählen', languageChangeWarning: 'Beim Sprachwechsel können nicht gesendete Angaben verloren gehen. Möchten Sie fortfahren?',
    homeLabel: 'Homeground China – deutsche Startseite', planning: 'Reise planen', studio: 'Unser Team',
    faq: 'Häufige Fragen', visa: 'Einreise (Englisch)', openMenu: 'Menü öffnen', closeMenu: 'Menü schließen',
    plannerCta: { new: 'Reise planen', inProgress: 'Planung fortsetzen', result: 'Meine Planung ansehen',
      disabled: 'Reise planen', validationError: 'Angaben prüfen', submitting: 'Wird gesendet …',
      success: 'Meine Anfrage ansehen', failed: 'Erneut versuchen', uncertain: 'Meine Anfrage prüfen' },
  },
};

export function GermanSiteHeader({
  contactHref = germanSite.contact, currentPath, languagePaths, tourSlug,
}: {
  contactHref?: string;
  currentPath: string;
  languagePaths: readonly GermanLanguagePath[];
  tourSlug?: string;
}) {
  const selected = usePrivateTourSelection();
  const pageContext: HomegroundPageContext = tourSlug ? 'tour'
    : currentPath === '/de/' ? 'home'
      : currentPath === '/de/tours/' ? 'tours'
        : currentPath.startsWith('/de/services/') ? 'services'
          : currentPath === '/de/guides/' ? 'guides'
            : currentPath === '/de/studio/' ? 'studio' : 'content';
  return <HomegroundHeader locale="en" pageContext={pageContext} navigationIsExact
    plannerHrefOverride={contactHref}
    languagePaths={Object.fromEntries(languagePaths.map(item => [item.lang, item.path]))}
    edition={{ language: 'de', copy, navigation, servicesOverview: 'Alle Leistungen',
      onPlannerClick: (event, returnFocus) => {
        if (!tourSlug) return;
        openTourContactForContext(event, getPrivateTourInquiryContext(tourSlug, 'en',
          selected?.slug === tourSlug ? selected.selection : undefined), returnFocus);
      },
    }} />;
}

export function GermanTourHeader({ tourSlug }: { tourSlug: string }) {
  const currentPath = `/de/tours/${tourSlug}/`;
  return <GermanSiteHeader currentPath={currentPath} tourSlug={tourSlug}
    contactHref={`${currentPath}#contact`} languagePaths={germanLanguagePaths(`/tours/${tourSlug}/`, currentPath)} />;
}
