"use client";
import { HomegroundHeader, type HomegroundHeaderEdition, type HomegroundPageContext } from './HomegroundHeader';
import { getHomegroundCopy } from '../lib/homegroundI18n';
import { getHomegroundNavigationModel } from '../lib/homegroundNavigationModel';
import { spanishLanguagePaths, spanishSite, type SpanishLanguagePath } from '../lib/spanishSite';
import { getPrivateTourInquiryContext } from '../lib/privateTourInquiryContext';
import { openTourContactForContext } from '../lib/tourContact';
import { usePrivateTourSelection } from './PrivateTourSelection';

const source = getHomegroundCopy('en');
const navigationSource = getHomegroundNavigationModel('en', '/', { includeCorporateTravel: false });
const items = {
  destinations: { label: 'Destinos (en inglés)', description: 'Ciudades, ideas de viaje y lugares imprescindibles', href: '/explore/' },
  tours: { label: 'Viajes', description: 'Compara itinerarios y precios publicados', href: '/es/tours/' },
  services: { label: 'Servicios', description: 'Entradas, guías, traslados y organización del viaje', href: '/es/services/' },
  guides: { label: 'Guías prácticas', description: 'Documentación, transportes, alojamiento y fechas', href: '/es/guias/' },
  studio: { label: 'Nosotros', description: 'Nuestro equipo, cómo trabajamos y nuestras licencias', href: '/es/studio/' },
} as const;
const entries: Readonly<Record<string, { label: string; description: string; href: string }>> = {
  cities: { label: 'Ciudades (en inglés)', description: 'Pekín, Shanghái, Xi’an y otros cinco destinos', href: '/explore/' },
  inspiration: { label: 'Ideas de viaje (en inglés)', description: 'Intereses, experiencias y rutas para darles forma', href: '/inspiration/' },
  sights: { label: 'Lugares imprescindibles (en inglés)', description: 'La Gran Muralla, los Guerreros de Terracota y mucho más', href: '/sights/' },
  'all-tours': { label: 'Todos los viajes', description: 'Compara regiones, duración y precios', href: '/es/tours/' },
  'multi-city': { label: 'Varias ciudades (en inglés)', description: 'Grandes etapas de China en un mismo viaje', href: '/tours/multi-city/' },
  regions: { label: 'Una región a fondo (en inglés)', description: 'El este, el suroeste, el sur y otras regiones de China', href: '/tours/regions/' },
  seasonal: { label: 'Viajes de temporada (en inglés)', description: 'Invierno en el noreste: Harbin y la montaña Changbai', href: '/tours/seasonal/' },
  'attraction-tickets': { label: 'Entradas y reservas', description: 'Reservamos tus entradas. Escríbenos en cuanto tengas fechas.', href: '/es/services/china-attraction-reservations/' },
  'english-guides': { label: 'Guías privados en inglés', description: 'En inglés desde 900 CNY al día; en español, con suplemento', href: '/es/services/private-english-speaking-guides/' },
  'private-car': { label: 'Vehículo con conductor', description: 'Traslados de aeropuerto y recorridos en vehículo privado', href: '/es/services/private-car-and-driver/' },
  'trip-support': { label: 'Organización del viaje', description: 'Hoteles, traslados y coordinación durante el viaje', href: '/es/services/full-trip-support/' },
  company: { label: 'Nuestro compromiso (en inglés)', description: 'Por qué existe Homeground y qué puedes esperar de nosotros', href: '/company/' },
  planning: { label: 'Nuestro equipo y nuestra forma de trabajar', description: 'Cómo preparamos un viaje que funcione sobre el terreno', href: '/es/studio/' },
  credentials: { label: 'Licencias y registro', description: 'Información oficial que puedes comprobar', href: '/es/business-information/' },
};
const toggles: Readonly<Record<string,string>> = { destinations: 'Abrir el menú de destinos', tours: 'Abrir el menú de viajes', services: 'Abrir el menú de servicios', studio: 'Abrir el menú sobre Homeground' };
const navigation: HomegroundHeaderEdition['navigation'] = {
  mobileCta: 'Mi viaje',
  items: navigationSource.items.map(item => ({ ...item, ...items[item.id] })),
  menus: Object.fromEntries(Object.entries(navigationSource.menus).map(([id, menu]) => [id, { toggle: toggles[id], entries: menu.entries.map(entry => ({ ...entry, ...entries[entry.id] })) }])),
};
const copy: HomegroundHeaderEdition['copy'] = {
  path: '/es/', businessDescriptor: 'Agencia de viajes en China',
  navigation: {
    ...source.navigation, primaryLabel: 'Navegación principal', mobileLabel: 'Menú principal', mobileServicesLabel: 'Servicios',
    menuTagline: 'China, a tu manera. Estamos a tu lado.', footerLabel: 'Navegación del pie de página', languageLabel: 'Elegir idioma',
    languageChangeWarning: 'Al cambiar de idioma puedes perder los datos que aún no has enviado. ¿Quieres continuar?',
    homeLabel: 'Homeground China — inicio en español', planning: 'Preparar mi viaje', studio: 'Nuestro equipo', faq: 'Preguntas frecuentes', visa: 'Requisitos de entrada (en inglés)', openMenu: 'Abrir el menú', closeMenu: 'Cerrar el menú',
    plannerCta: { new: 'Preparar mi viaje', inProgress: 'Continuar mi plan', result: 'Ver mi plan', disabled: 'Preparar mi viaje', validationError: 'Revisar mis datos', submitting: 'Enviando…', success: 'Ver mi consulta', failed: 'Volver a intentar', uncertain: 'Comprobar mi consulta' },
  },
};
export function SpanishSiteHeader({ contactHref = spanishSite.contact, currentPath, languagePaths, tourSlug }: { contactHref?: string; currentPath: string; languagePaths: readonly SpanishLanguagePath[]; tourSlug?: string }) {
  const selected = usePrivateTourSelection();
  const pageContext: HomegroundPageContext = tourSlug ? 'tour' : currentPath === '/es/' ? 'home' : currentPath === '/es/tours/' ? 'tours' : currentPath.startsWith('/es/services/') ? 'services' : currentPath === '/es/guias/' ? 'guides' : currentPath === '/es/studio/' ? 'studio' : 'content';
  return <HomegroundHeader locale="en" pageContext={pageContext} navigationIsExact plannerHrefOverride={contactHref}
    languagePaths={Object.fromEntries(languagePaths.map(item => [item.lang, item.path]))}
    edition={{ language: 'es', copy, navigation, servicesOverview: 'Todos los servicios', onPlannerClick: (event, returnFocus) => {
      if (!tourSlug) return;
      openTourContactForContext(event, getPrivateTourInquiryContext(tourSlug, 'en', selected?.slug === tourSlug ? selected.selection : undefined), returnFocus);
    } }} />;
}
export function SpanishTourHeader({ tourSlug }: { tourSlug: string }) {
  const currentPath = `/es/tours/${tourSlug}/`;
  return <SpanishSiteHeader currentPath={currentPath} tourSlug={tourSlug} contactHref={`${currentPath}#contact`} languagePaths={spanishLanguagePaths(`/tours/${tourSlug}/`, currentPath)} />;
}
