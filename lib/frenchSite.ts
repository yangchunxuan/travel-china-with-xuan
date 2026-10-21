import { arabicSitePagePathByEnglishPath } from './arabicEditionIndex.ts';
import { germanSitePagePathByEnglishPath } from './germanEditionIndex.ts';
import type { Metadata } from 'next';
import { homegroundBusiness } from './homegroundBusiness.ts';
import { editionReplyPromise } from './editionReplyPromise.ts';
import { spanishTourPagePath, spanishSitePagePathByEnglishPath } from './spanishEditionIndex.ts';

export const frenchSite = { home: '/fr/', tours: '/fr/tours/', guides: '/fr/guides/', services: '/fr/services/', studio: '/fr/studio/', contact: '/fr/#planner-contact' } as const;
export const frenchPrimaryLinks = [
  { href: frenchSite.home, label: 'Accueil', description: 'Préparer votre voyage en Chine' },
  { href: frenchSite.tours, label: 'Circuits', description: 'Itinéraires et tarifs publiés' },
  { href: frenchSite.services, label: 'Services', description: 'Choisir votre accompagnement' },
  { href: frenchSite.guides, label: 'Conseils', description: 'Préparer votre départ' },
  { href: frenchSite.studio, label: 'Notre équipe', description: 'Faire connaissance avec Homeground' },
];
export const frenchLegalLinks = [
  { href: '/fr/business-information/', label: 'Informations légales' },
  { href: '/fr/terms/', label: 'Conditions de réservation' },
  { href: '/fr/privacy/', label: 'Confidentialité' },
  { href: '/fr/refund-delivery/', label: 'Annulations et remboursements' },
];
export interface FrenchLanguagePath { readonly label: string; readonly lang: string; readonly path: string; }
export function frenchLanguagePaths(enPath: string, frPath: string): readonly FrenchLanguagePath[] {
  const slug = /^\/tours\/([^/]+)\/$/.exec(enPath)?.[1];
  const ar = slug ? `/ar${enPath}` : arabicSitePagePathByEnglishPath[enPath];
  const de = slug ? `/de${enPath}` : germanSitePagePathByEnglishPath[enPath];
  const es = slug ? spanishTourPagePath(slug) : spanishSitePagePathByEnglishPath[enPath];
  return [{ label: 'FR', lang: 'fr', path: frPath }, { label: 'EN', lang: 'en', path: enPath }, { label: '中文', lang: 'zh-Hans', path: `/zh${enPath}` }, { label: '한국어', lang: 'ko', path: `/ko${enPath}` },
    {label:'日本語',lang:'ja',path:`/ja${enPath}`},
    ...(es ? [{label:'ES',lang:'es',path:es}] : []),
    ...(de ? [{ label: 'DE', lang: 'de', path: de }] : []),
    ...(ar ? [{ label: 'العربية', lang: 'ar', path: ar }] : []),
  ];
}
export const frenchGuideLanguageNote = 'Les prix affichés correspondent à la formule décrite. Un guide francophone n’est pas inclus : il est proposé en supplément, sur devis, selon les villes, vos dates et les disponibilités. Ce supplément est confirmé avant toute réservation.';
export const frenchGuideLanguageBadge = 'Guide francophone : supplément sur devis';
export const frenchDraftNote = `${editionReplyPromise.fr} WhatsApp et votre messagerie ouvrent un brouillon. Aucun message n’est envoyé tant que vous ne l’avez pas envoyé vous-même.`;
export const frenchTourContactNote = `${editionReplyPromise.fr} Le formulaire confirme à l’écran l’enregistrement de votre demande. WhatsApp et votre messagerie ouvrent un brouillon que vous envoyez vous-même.`;
export const frenchPublishedPriceNote = 'Tarifs par personne pour la formule, le nombre de voyageurs et la période indiqués, dans la devise affichée. Il ne s’agit pas de prix en euros. Les conditions saisonnières, les chambres et les prestations restent celles de chaque circuit. Le total final et les modalités de paiement sont confirmés par écrit avant règlement.';
export function frenchWhatsAppHref(message: string) {
  const configured = process.env.NEXT_PUBLIC_HOMEGROUND_WHATSAPP_NUMBER || '8613174215999';
  const number = /^\d{7,15}$/.test(configured) ? configured : '8613174215999';
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
export function frenchEmailHref(subject: string, message: string) {
  return `mailto:${homegroundBusiness.serviceEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
}
export function frenchGeneralContactHrefs(path: string) {
  const message = ['Bonjour, je souhaite préparer un voyage en Chine.', 'Destinations ou circuit :', 'Dates approximatives :', 'Nombre de voyageurs :', 'Guide francophone souhaité (supplément sur devis) :', `Page consultée : https://homegroundchina.com${path}`].join('\n');
  return { whatsapp: frenchWhatsAppHref(message), email: frenchEmailHref('Mon projet de voyage en Chine', message) };
}
export function buildFrenchMetadata(title: string, description: string, path: string, languages?: Record<string, string>): Metadata {
  return { title: { absolute: `${title} | Homeground China` }, description,
    alternates: { canonical: path, ...(languages ? { languages } : {}) },
    robots: { index: true, follow: true },
    openGraph: { title, description, url: path, siteName: 'Homeground China', locale: 'fr_FR', type: 'website', images: [{ url: '/images/home/beijing-hero-2400.jpg', width: 2400, height: 1600, alt: 'Une tour de la Cité interdite se reflète dans les douves à Pékin' }] },
    twitter: { card: 'summary_large_image', title, description, images: ['/images/home/beijing-hero-2400.jpg'] },
  };
}
