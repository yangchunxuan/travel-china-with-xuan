import type { LocalizedPrivateTourProduct } from './privateTourProducts';
import { frenchGuideLanguageNote, frenchTourContactNote, frenchPublishedPriceNote, frenchEmailHref, frenchWhatsAppHref } from './frenchSite';

export function frenchTourPageCopy(product: LocalizedPrivateTourProduct) {
  const groups = [...new Set(product.packages.flatMap(p => p.rows.map(r => r.travelers)))].sort((a,b) => a-b);
  const format = product.tourFormat === 'small-group' ? 'PETIT GROUPE' : 'CIRCUIT PRIVÉ';
  const fixed = product.slug === 'zhangjiajie-forest-4-day-private-tour';
  return {
    htmlLang: 'fr', skipLink: 'Aller au circuit', breadcrumbLabel: 'Fil d’Ariane', homeLabel: 'Accueil', productLabel: 'Circuits en Chine',
    heroMeta: `${product.days} JOURS / ${product.nights} NUITS · ${format} · SANS ARRÊT COMMERCIAL`, heroPromise: product.eyebrow,
    facts: product.facts?.length ? product.facts : [
      { label: 'Durée', value: `${product.days} jours · ${product.nights} nuits` },
      { label: 'Accompagnement', value: 'Selon la formule · guide francophone en supplément' },
      { label: 'Hébergement', value: `${product.nights} nuits · hôtels confirmés par écrit` },
      { label: 'Tarif', value: groups.length ? `Tarifs pour ${groups.join(', ')} voyageurs` : 'Sur devis selon vos dates' },
    ],
    overviewEyebrow: 'L’esprit du voyage', overviewTitle: product.eyebrow, overviewBody: product.summary,
    routeEyebrow: 'Au fil des jours', routeTitle: 'Votre itinéraire, jour après jour.',
    routeBody: 'Arrivée, visites et départ : chaque étape est détaillée ci-dessous. Les horaires, les réservations nominatives et les conditions sur place peuvent nécessiter un ajustement. Toute modification importante est discutée avec vous.',
    serviceEyebrow: 'Les détails qui comptent', serviceTitle: 'Hébergements, déplacements et accompagnement.',
    serviceBody: `Les prestations et les journées guidées sont celles de la formule choisie. Nous vérifions leur disponibilité pour vos dates avant paiement. ${frenchGuideLanguageNote}`,
    hotelTitle: 'Où vous séjournerez', transportTitle: 'Guides, transports et visites',
    scopeEyebrow: 'Avant de réserver', scopeTitle: 'Ce qui est à votre charge et ce que nous confirmons.', exclusionsTitle: 'Non compris', confirmedTitle: 'Confirmé par écrit',
    confirmations: ['Vos dates et les modalités d’arrivée et de départ', 'Les hébergements, la répartition des chambres et les transports', 'Les prestations disponibles, la langue du guide et le montant total avant paiement'],
    finalEyebrow: 'Votre prochaine étape', finalTitle: fixed ? 'Ce parcours vous convient ? Vérifions vos dates.' : 'Parlons de votre voyage.',
    finalBody: fixed ? 'Indiquez vos dates, le nombre de voyageurs et vos préférences d’hébergement. Nous vérifions la disponibilité de cette formule et vous adressons un devis écrit.' : 'Partagez vos dates, le nombre de voyageurs et vos envies. Nous vérifions les possibilités et vous envoyons un devis détaillé.',
    contact: 'Demander un devis', email: 'Nous écrire',
  };
}
export const frenchPriceCopy = {
  choosePackage: 'Choisissez votre formule', chooseGroup: 'Nombre de voyageurs', publishedPrice: 'Prix pour la formule choisie', perPerson: 'par personne', groupUnit: ' voyageurs', privateTour: 'circuit privé', flightsSeparate: 'vols non compris', internationalFlightsSeparate: 'vols internationaux non compris', priceBasis: 'Tarif par personne', twinShare: 'sur la base de deux personnes par chambre', smallGroup: 'petit groupe', checkDates: 'Vérifier mes dates', otherGroups: 'Un autre nombre de voyageurs ?', otherGroupsBody: 'Nous vérifions les chambres, les bagages et le véhicule adapté à votre groupe avant de vous adresser un devis.', requestQuote: 'Demander un devis', quoteOnlyTitle: 'Un devis pour vos dates et votre groupe', quoteOnlyBody: 'Ce voyage est proposé sur devis. Indiquez vos dates, le nombre de voyageurs et les chambres souhaitées : nous vous enverrons une proposition écrite avant tout paiement.', emailLabel: 'Nous écrire', whatsappLabel: 'Échanger sur WhatsApp', draftNote: frenchTourContactNote, currencyNote: `${frenchPublishedPriceNote} ${frenchGuideLanguageNote}`,
} as const;
export const frenchPhotoCopy = { nextPhoto: 'Voir la photo suivante', routeLabel: 'Choisissez une journée pour voir les photos', routeScenes: 'En images', dayUnit: '', dayPrefix: 'Jour ', controls: 'fr' } as const;
export const frenchPhotoCreditCopy = { title: 'Crédits photographiques', intro: 'Les photographies externes sont attribuées ci-dessous. Les modifications se limitent au recadrage, au redimensionnement et à la conversion de format. Les adaptations de photos CC BY-SA conservent la licence indiquée.', by: 'Photo :', localNote: 'Les autres images proviennent de la photothèque Homeground, dont l’utilisation sur ce site est autorisée par son propriétaire.' };
export const frenchCommercialCopy = { productLabel: 'Pour aller plus loin', productTitle: 'Pour vous aider à choisir.', productBody: 'Retrouvez les conseils de préparation, les modalités d’accompagnement et les autres itinéraires publiés.', destinations: 'Destinations', guides: 'Préparer son voyage', related: 'Comparer les circuits' };
export function frenchTourPlanningContext(_slug: string) {
  return { destinations: [] as {id:string;href:string;label:string}[], guides: [{id:'fr-guides',href:'/fr/guides/',label:'Les questions à se poser avant de réserver'},{id:'fr-services',href:'/fr/services/',label:'Choisir son accompagnement en Chine'}], relatedProducts: [{id:'fr-tour-hub',href:'/fr/tours/',label:'Tous les circuits et leurs tarifs'}] };
}
export function frenchTourContactHrefs(product: LocalizedPrivateTourProduct) {
  const whatsapp: Record<string,string> = {}, email: Record<string,string> = {};
  const add = (key: string, option = '', travelers?: number) => {
    const message = ['Bonjour, ce circuit m’intéresse.',`Circuit : ${product.title}`,option ? `Formule : ${option}` : '',`Nombre de voyageurs : ${travelers ?? ''}`,'Dates approximatives :','Guide francophone souhaité (supplément sur devis) :',`Page : https://homegroundchina.com${product.path}`].filter(Boolean).join('\n');
    whatsapp[key] = frenchWhatsAppHref(message); email[key] = frenchEmailHref(`Demande de devis : ${product.title}`, message);
  };
  add('other');
  product.packages.forEach(p => p.rows.forEach(r => add(`${p.id}:${r.travelers}`,p.label,r.travelers)));
  return { whatsapp, email };
}
