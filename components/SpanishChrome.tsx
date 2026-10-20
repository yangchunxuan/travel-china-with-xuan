"use client";
import { HomegroundFooter } from './HomegroundFooter';
import { getHomegroundCopy } from '../lib/homegroundI18n';
import { footerDestinationLinks } from '../lib/footerDestinationLinks';
export { SpanishSiteHeader, SpanishTourHeader } from './SpanishHeader';
export function SpanishSiteFooter({ currentPath, variant = 'default' }: { currentPath: string; variant?: 'default' | 'homepage' }) {
  const source = getHomegroundCopy('en');
  const copy = { ...source, htmlLang: 'es', path: '/es/', businessDescriptor: 'Agencia de viajes en China', navigation: { ...source.navigation, studio: 'Nuestro equipo', faq: 'Preguntas frecuentes', visa: 'Requisitos de entrada (en inglés)' }, cities: { ...source.cities, listLabel: 'Destinos — guías en inglés' }, footer: { ...source.footer, copyright: (year: number) => `© ${year} Homeground China. Todos los derechos reservados.` } };
  const names: Record<string,string> = { beijing: 'Pekín', shanghai: 'Shanghái', xian: 'Xi’an', chengdu: 'Chengdu', guangzhou: 'Cantón', hangzhou: 'Hangzhou', zhangjiajie: 'Zhangjiajie', chongqing: 'Chongqing' };
  return <HomegroundFooter locale="en" pageContext={variant === 'homepage' ? 'home' : currentPath === '/es/tours/' ? 'tours' : currentPath === '/es/guias/' ? 'guides' : currentPath === '/es/studio/' ? 'studio' : 'content'} variant={variant} edition={{
    copy,
    sectionLabels: { guides: 'Guías prácticas', services: 'Todos los servicios', fullTripSupport: 'Viaje a medida', attractionReservations: 'Encárganos tus entradas', legalLabel: 'Información legal y servicios', legalHeading: 'Información legal', exploreHeading: 'Explorar', destinationsHeading: 'Destinos · en inglés', homegroundHeading: 'Homeground', socialLabel: 'Sigue a Homeground', privateTours: 'Nuestros viajes', allDestinations: 'Todos los destinos (en inglés)', operatorPrefix: 'Homeground es una marca operada por', operatorSuffix: '.', codeLabel: 'Código unificado de crédito social', licenceLabel: 'Licencia de agencia de viajes' },
    related: { business: 'Información de la empresa', terms: 'Condiciones de servicio', refund: 'Reembolsos y entrega', privacy: 'Privacidad', contact: 'Escríbenos' },
    company: { path: '/es/company/', navLabel: 'Nuestra propuesta' }, manageConsent: 'Preferencias de privacidad',
    cityLinks: footerDestinationLinks.en.map(city => ({ ...city, label: names[city.id] ?? city.label })),
    paths: { privacy: '/es/privacy/', business: '/es/business-information/', terms: '/es/terms/', refund: '/es/refund-delivery/', services: '/es/services/', fullTripSupport: '/es/services/full-trip-support/', reservations: '/es/services/china-attraction-reservations/', guides: '/es/guias/', tours: '/es/tours/', destinations: '/explore/', studio: '/es/studio/' },
  }} />;
}