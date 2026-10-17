import { arabicSitePagePathByEnglishPath } from './arabicEditionIndex.ts';
import type { Metadata } from 'next';
import { homegroundBusiness } from './homegroundBusiness.ts';
import { spanishTourPagePath, spanishSitePagePathByEnglishPath } from './spanishEditionIndex.ts';
import { frenchSitePagePathByEnglishPath } from './frenchEditionIndex.ts';

export const germanSite = { home: '/de/', tours: '/de/tours/', guides: '/de/guides/', services: '/de/services/', studio: '/de/studio/', contact: '/de/#planner-contact' } as const;
export const germanPrimaryLinks = [
  { href: germanSite.home, label: 'Startseite', description: 'Ihre Reise nach China planen' },
  { href: germanSite.tours, label: 'Rundreisen', description: 'Reiseverläufe und veröffentlichte Preise' },
  { href: germanSite.services, label: 'Reiseservices', description: 'Passende Unterstützung wählen' },
  { href: germanSite.guides, label: 'Reisetipps', description: 'Gut vorbereitet nach China' },
  { href: germanSite.studio, label: 'Unser Team', description: 'Homeground kennenlernen' },
];
export const germanLegalLinks = [
  { href: '/de/business-information/', label: 'Unternehmensangaben' },
  { href: '/de/terms/', label: 'Buchungsbedingungen' },
  { href: '/de/privacy/', label: 'Datenschutz' },
  { href: '/de/refund-delivery/', label: 'Stornierung und Erstattung' },
];
export interface GermanLanguagePath { readonly label: string; readonly lang: string; readonly path: string; }
export function germanLanguagePaths(enPath: string, dePath: string): readonly GermanLanguagePath[] {
  const slug = /^\/tours\/([^/]+)\/$/.exec(enPath)?.[1];
  const ar = slug ? `/ar${enPath}` : arabicSitePagePathByEnglishPath[enPath];
  const es = slug ? spanishTourPagePath(slug) : spanishSitePagePathByEnglishPath[enPath];
  const fr = slug ? `/fr${enPath}` : frenchSitePagePathByEnglishPath[enPath];
  return [{ label: 'DE', lang: 'de', path: dePath }, { label: 'EN', lang: 'en', path: enPath }, { label: '中文', lang: 'zh-Hans', path: `/zh${enPath}` }, { label: '한국어', lang: 'ko', path: `/ko${enPath}` },
    ...(slug === 'xian-terracotta-warriors-half-day-private-tour' ? [] : [{label:'日本語',lang:'ja',path:`/ja${enPath}`}]),
    ...(ar ? [{label:'العربية',lang:'ar',path:ar}] : []), ...(fr ? [{label:'FR',lang:'fr',path:fr}] : []), ...(es ? [{label:'ES',lang:'es',path:es}] : []),
  ];
}
export const germanGuideLanguageNote = 'Es gelten die Leistungen und die Sprache der Reiseleitung der beschriebenen Variante. Deutschsprachige Reiseleitung ist nicht im veröffentlichten Preis enthalten. Falls Sie diese wünschen, müssen Verfügbarkeit und ein gesondertes Angebot vor der Buchung schriftlich bestätigt werden.';
export const germanGuideLanguageBadge = 'Deutschsprachige Reiseleitung nicht im Preis enthalten';
export const germanDraftNote = 'WhatsApp und Ihr E-Mail-Programm öffnen einen Entwurf. Eine Nachricht wird erst versendet, wenn Sie sie dort selbst abschicken.';
export const germanTourContactNote = 'Das Formular bestätigt auf dem Bildschirm, dass Ihre Anfrage gespeichert wurde. WhatsApp und Ihr E-Mail-Programm öffnen einen Entwurf, den Sie selbst versenden.';
export const germanPublishedPriceNote = 'Preise pro Person für die angegebene Variante, Gruppengröße und Reisezeit in der angezeigten Währung, nicht in Euro. Saisonbedingungen, Zimmer und Leistungen richten sich nach der jeweiligen Reise. Gesamtpreis und Zahlungsbedingungen werden vor der Zahlung schriftlich bestätigt.';
export function germanWhatsAppHref(message: string) {
  const configured = process.env.NEXT_PUBLIC_HOMEGROUND_WHATSAPP_NUMBER || '8613174215999';
  const number = /^\d{7,15}$/.test(configured) ? configured : '8613174215999';
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
export function germanEmailHref(subject: string, message: string) {
  return `mailto:${homegroundBusiness.serviceEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
}
export function germanGeneralContactHrefs(path: string) {
  const message = ['Hallo, ich möchte eine Reise nach China planen.', 'Reiseziele oder Rundreise:', 'Ungefähre Reisedaten:', 'Anzahl der Reisenden:', 'Gewünschte Sprache der Reiseleitung (Verfügbarkeit und Kosten bitte bestätigen):', `Angesehene Seite: https://homegroundchina.com${path}`].join('\n');
  return { whatsapp: germanWhatsAppHref(message), email: germanEmailHref('Meine Reise nach China', message) };
}
export function buildGermanMetadata(title: string, description: string, path: string, languages?: Record<string, string>): Metadata {
  return { title: { absolute: `${title} | Homeground China` }, description,
    alternates: { canonical: path, ...(languages ? { languages } : {}) }, robots: { index: true, follow: true },
    openGraph: { title, description, url: path, siteName: 'Homeground China', locale: 'de_DE', type: 'website', images: [{ url: '/images/home/beijing-hero-2400.jpg', width: 2400, height: 1600, alt: 'Ein Turm der Verbotenen Stadt spiegelt sich im Wassergraben in Peking' }] },
    twitter: { card: 'summary_large_image', title, description, images: ['/images/home/beijing-hero-2400.jpg'] },
  };
}
