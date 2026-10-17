"use client";

import { HomegroundHeader, type HomegroundHeaderEdition, type HomegroundPageContext } from './HomegroundHeader';
import { getHomegroundCopy } from '../lib/homegroundI18n';
import { getHomegroundNavigationModel } from '../lib/homegroundNavigationModel';
import { frenchLanguagePaths, frenchSite, type FrenchLanguagePath } from '../lib/frenchSite';
import { getPrivateTourInquiryContext } from '../lib/privateTourInquiryContext';
import { openTourContactForContext } from '../lib/tourContact';
import { usePrivateTourSelection } from './PrivateTourSelection';

const source = getHomegroundCopy('en');
const navigationSource = getHomegroundNavigationModel('en', '/');
const frenchItems = {
  destinations: { label: 'Destinations (en anglais)', description: 'Villes, idées de voyage et sites incontournables — guides en anglais', href: '/explore/' },
  tours: { label: 'Circuits', description: 'Comparer les itinéraires et les tarifs publiés', href: '/fr/tours/' },
  services: { label: 'Services', description: 'Billets, guides, chauffeurs et organisation du séjour', href: '/fr/services/' },
  guides: { label: 'Conseils', description: 'Formalités, transports, hébergements et choix des dates', href: '/fr/guides/' },
  studio: { label: 'À propos', description: 'Notre équipe, notre méthode et nos licences', href: '/fr/studio/' },
} as const;
const frenchEntries: Readonly<Record<string, { label: string; description: string; href: string }>> = {
  cities: { label: 'Les villes (en anglais)', description: 'Pékin, Shanghai, Xi’an et cinq autres destinations', href: '/explore/' },
  inspiration: { label: 'Idées de voyage (en anglais)', description: 'Des envies, des thèmes et les itinéraires qui leur correspondent', href: '/inspiration/' },
  sights: { label: 'Sites incontournables (en anglais)', description: 'La Grande Muraille, l’armée de terre cuite et bien d’autres', href: '/sights/' },
  'all-tours': { label: 'Tous nos circuits', description: 'Comparer les régions, les durées et les prix', href: '/fr/tours/' },
  'multi-city': { label: 'D’une ville à l’autre (en anglais)', description: 'Plusieurs grandes étapes dans un même voyage', href: '/tours/multi-city/' },
  regions: { label: 'Une région à la fois (en anglais)', description: 'Chine de l’Est, du Sud-Ouest, du Sud et autres régions', href: '/tours/regions/' },
  seasonal: { label: 'Cette saison (en anglais)', description: 'L’hiver dans le Nord-Est : Harbin et le mont Changbai', href: '/tours/seasonal/' },
  'attraction-tickets': { label: 'Billets et réservations', description: 'Un créneau d’entrée réservé au nom de votre passeport', href: '/fr/services/china-attraction-reservations/' },
  'english-guides': { label: 'Guides anglophones privés', description: 'Un guide à la journée dans quatre villes ; guide francophone en supplément', href: '/fr/services/private-english-speaking-guides/' },
  'private-car': { label: 'Voiture avec chauffeur', description: 'Transferts aéroport et journées en véhicule privé', href: '/fr/services/private-car-and-driver/' },
  'trip-support': { label: 'Organisation du séjour', description: 'Hôtels, transferts et coordination sur place', href: '/fr/services/full-trip-support/' },
  company: { label: 'Notre engagement (en anglais)', description: 'Pourquoi Homeground existe et ce que nous vous promettons', href: '/company/' },
  planning: { label: 'Notre équipe et notre méthode', description: 'Comment nous concevons un voyage qui fonctionne sur place', href: '/fr/studio/' },
  credentials: { label: 'Licences et immatriculation', description: 'Les informations officielles que vous pouvez vérifier', href: '/fr/business-information/' },
};
const toggles: Readonly<Record<string, string>> = {
  destinations: 'Ouvrir le menu des destinations', tours: 'Ouvrir le menu des circuits',
  services: 'Ouvrir le menu des services', studio: 'Ouvrir le menu À propos',
};
const navigation: HomegroundHeaderEdition['navigation'] = {
  mobileCta: 'Mon projet',
  items: navigationSource.items.map(item => ({ ...item, ...frenchItems[item.id] })),
  menus: Object.fromEntries(Object.entries(navigationSource.menus).map(([id, menu]) => [id, {
    toggle: toggles[id], entries: menu.entries.map(entry => ({ ...entry, ...frenchEntries[entry.id] })),
  }])),
};
const copy: HomegroundHeaderEdition['copy'] = {
  path: '/fr/', businessDescriptor: 'Agence de voyages en Chine',
  navigation: {
    ...source.navigation,
    primaryLabel: 'Navigation principale', mobileLabel: 'Menu principal', mobileServicesLabel: 'Services',
    menuTagline: 'La Chine à votre façon. Nous sommes à vos côtés.', footerLabel: 'Navigation de pied de page',
    languageLabel: 'Choisir une langue', languageChangeWarning: 'Changer de langue peut effacer les informations non envoyées. Voulez-vous continuer ?',
    homeLabel: 'Homeground China — accueil en français', planning: 'Préparer mon voyage', studio: 'Notre équipe',
    faq: 'Questions fréquentes', visa: 'Formalités d’entrée (en anglais)', openMenu: 'Ouvrir le menu', closeMenu: 'Fermer le menu',
    plannerCta: { new: 'Préparer mon voyage', inProgress: 'Continuer mon projet', result: 'Voir mon projet',
      disabled: 'Préparer mon voyage', validationError: 'Vérifier mes informations', submitting: 'Envoi en cours…',
      success: 'Voir ma demande', failed: 'Réessayer', uncertain: 'Vérifier ma demande' },
  },
};

export function FrenchSiteHeader({
  contactHref = frenchSite.contact, currentPath, languagePaths, tourSlug,
}: {
  contactHref?: string;
  currentPath: string;
  languagePaths: readonly FrenchLanguagePath[];
  tourSlug?: string;
}) {
  const selected = usePrivateTourSelection();
  const pageContext: HomegroundPageContext = tourSlug ? 'tour'
    : currentPath === '/fr/' ? 'home'
      : currentPath === '/fr/tours/' ? 'tours'
        : currentPath.startsWith('/fr/services/') ? 'services'
          : currentPath === '/fr/guides/' ? 'guides'
            : currentPath === '/fr/studio/' ? 'studio' : 'content';
  return <HomegroundHeader locale="en" pageContext={pageContext} navigationIsExact
    plannerHrefOverride={contactHref}
    languagePaths={Object.fromEntries(languagePaths.map(item => [item.lang, item.path]))}
    edition={{ language: 'fr', copy, navigation, servicesOverview: 'Tous nos services',
      onPlannerClick: (event, returnFocus) => {
        if (!tourSlug) return;
        openTourContactForContext(event, getPrivateTourInquiryContext(tourSlug, 'en',
          selected?.slug === tourSlug ? selected.selection : undefined), returnFocus);
      },
    }} />;
}

export function FrenchTourHeader({ tourSlug }: { tourSlug: string }) {
  const currentPath = `/fr/tours/${tourSlug}/`;
  return <FrenchSiteHeader currentPath={currentPath} tourSlug={tourSlug}
    contactHref={`${currentPath}#contact`} languagePaths={frenchLanguagePaths(`/tours/${tourSlug}/`, currentPath)} />;
}
