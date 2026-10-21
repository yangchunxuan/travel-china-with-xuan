import { arabicSitePagePathByEnglishPath } from './arabicEditionIndex.ts';
import { germanSitePagePathByEnglishPath } from './germanEditionIndex.ts';
import type { Metadata } from 'next';
import { frenchSitePagePathByEnglishPath } from './frenchEditionIndex';
import { homegroundBusiness } from './homegroundBusiness';
import { editionReplyPromise } from './editionReplyPromise.ts';

export const spanishSite = { home: '/es/', tours: '/es/tours/', guides: '/es/guias/', services: '/es/services/', studio: '/es/studio/', contact: '/es/#planner-contact' } as const;
export interface SpanishNavLink { readonly href: string; readonly label: string; readonly description: string; }
export const spanishPrimaryLinks: readonly SpanishNavLink[] = [
  { href: spanishSite.home, label: 'Inicio', description: 'Tu viaje a China empieza aquí' },
  { href: spanishSite.tours, label: 'Viajes', description: 'Itinerarios y precios publicados' },
  { href: spanishSite.services, label: 'Servicios', description: 'La ayuda que necesitas en China' },
  { href: spanishSite.guides, label: 'Guías prácticas', description: 'Qué ver y cómo organizarlo' },
  { href: spanishSite.studio, label: 'Nuestro equipo', description: 'Conoce a Homeground' },
];
export const spanishLegalLinks = [
  { href: '/es/business-information/', label: 'Información de la empresa' },
  { href: '/es/terms/', label: 'Condiciones de servicio' },
  { href: '/es/privacy/', label: 'Privacidad' },
  { href: '/es/refund-delivery/', label: 'Cancelaciones y reembolsos' },
];
export interface SpanishLanguagePath { readonly label: string; readonly lang: string; readonly path: string; }
export function spanishLanguagePaths(enPath: string, esPath: string, overrides: Partial<Record<'zh'|'ko'|'ja'|'fr', string>> = {}): readonly SpanishLanguagePath[] {
  const slug = /^\/tours\/([^/]+)\/$/.exec(enPath)?.[1];
  const ar = slug ? `/ar${enPath}` : arabicSitePagePathByEnglishPath[enPath];
  const de = slug ? `/de${enPath}` : germanSitePagePathByEnglishPath[enPath];
  const fr = overrides.fr ?? (slug ? `/fr${enPath}` : frenchSitePagePathByEnglishPath[enPath]);
  const ja = overrides.ja ?? (/\/guides\/.+/.test(enPath) ? undefined : `/ja${enPath}`);
  return [
    { label: 'ES', lang: 'es', path: esPath }, { label: 'EN', lang: 'en', path: enPath },
    { label: '中文', lang: 'zh-Hans', path: overrides.zh ?? `/zh${enPath}` },
    { label: '한국어', lang: 'ko', path: overrides.ko ?? `/ko${enPath}` },
    ...(ja ? [{ label: '日本語', lang: 'ja', path: ja }] : []),
    ...(fr ? [{ label: 'FR', lang: 'fr', path: fr }] : []),
    ...(de ? [{ label: 'DE', lang: 'de', path: de }] : []),
    ...(ar ? [{ label: 'العربية', lang: 'ar', path: ar }] : []),
  ];
}
export function spanishAlternates(enPath: string, esPath: string, overrides: Partial<Record<'zh'|'ko'|'ja'|'fr', string>> = {}) {
  return { ...Object.fromEntries(spanishLanguagePaths(enPath, esPath, overrides).map(item => [item.lang, item.path])), 'x-default': enPath };
}
export function withSpanishAlternate<T extends { alternates?: { languages?: object | null } | null }>(metadata: T, esPath: string | undefined): T {
  if (!esPath) return metadata;
  const alternates = metadata.alternates ?? {};
  return { ...metadata, alternates: { ...alternates, languages: { ...(alternates.languages ?? {}), es: esPath } } };
}
export const spanishGuideLanguageNote = 'Los precios publicados corresponden a los servicios descritos en cada viaje. El guía en español, si lo prefieres, tiene suplemento.';
export const spanishGuideLanguageBadge = 'Guía en español en todas las ciudades, con suplemento';
export const spanishDraftNote = `${editionReplyPromise.es} WhatsApp y el correo abren un borrador. El mensaje no se envía hasta que lo envíes desde la aplicación.`;
export const spanishTourContactNote = `${editionReplyPromise.es} El formulario confirma en pantalla que tu consulta se ha guardado. WhatsApp y el correo abren un borrador que debes enviar desde la aplicación.`;
export const spanishPublishedPriceNote = 'Precios por persona para la opción, el número de viajeros y la temporada indicados, en la moneda mostrada: dólares estadounidenses (USD) salvo que se indique otra, no euros ni pesos. Se mantienen las condiciones de temporada, habitaciones y servicios de cada viaje. El total final y las condiciones de pago se confirman por escrito antes de pagar.';
export function spanishWhatsAppHref(message: string) {
  const configured = process.env.NEXT_PUBLIC_HOMEGROUND_WHATSAPP_NUMBER || '8613174215999';
  const number = /^\d{7,15}$/.test(configured) ? configured : '8613174215999';
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
export function spanishEmailHref(subject: string, message: string) { return `mailto:${homegroundBusiness.serviceEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`; }
export function spanishGeneralContactHrefs(sourcePath: string) {
  const message = ['Hola. Me gustaría organizar un viaje a China.', 'Lugares o viaje que me interesan:', 'Fechas aproximadas:', 'Número de viajeros:', 'Guía en español (con suplemento):', `Página de referencia: https://homegroundchina.com${sourcePath}`].join('\n');
  return { whatsapp: spanishWhatsAppHref(message), email: spanishEmailHref('Consulta en español: viaje a China', message) };
}
export function buildSpanishSocialMetadata({ title, description, url, type = 'website', image = { url: 'https://homegroundchina.com/images/home/beijing-hero-2400.jpg', width: 2400, height: 1600, alt: 'Torre de esquina de la Ciudad Prohibida de Pekín reflejada en el foso' } }: { title: string; description: string; url: string; type?: 'website'|'article'; image?: { url: string; width: number; height: number; alt: string } }) {
  return { openGraph: { siteName: 'Homeground China', title, description, type, locale: 'es_ES', url, images: [image] }, twitter: { card: 'summary_large_image' as const, title, description, images: [{ url: image.url, alt: image.alt }] } };
}
export function buildSpanishMetadata(title: string, description: string, path: string, languages?: Record<string,string>): Metadata {
  return { title: { absolute: `${title} | Homeground China` }, description, alternates: { canonical: path, ...(languages ? { languages } : {}) }, robots: { index: true, follow: true }, ...buildSpanishSocialMetadata({ title, description, url: path }) };
}