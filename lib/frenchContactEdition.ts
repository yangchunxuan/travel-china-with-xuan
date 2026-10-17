import type { ContactEdition } from './contactEdition.ts';
import type { PrivateTourInquiryContext } from './privateTourInquiryContext.ts';
import type { TourContactDraft } from './tourContactDraft.ts';
import { isFiveCitySmallGroup, smallGroupInquiryCopy, smallGroupInquiryText } from './smallGroupInquiry.ts';
import { homegroundBusiness } from './homegroundBusiness.ts';
import { homegroundWhatsAppHref } from './tourContact.ts';
import { frenchContactTourNames, frenchContactPackageLabels } from './frenchContactNames.ts';
import { frenchLegacyZhangjiajieContactTitle, frenchLegacyStayNames, frenchLegacyDraftStayName } from './frenchLegacyContactCopy.ts';

const pattern = /^\/fr\/tours\/([a-z0-9-]+)\/$/u;
function tourName(context: PrivateTourInquiryContext) {
  return context.slug === 'zhangjiajie-4-day-private-tour'
    ? frenchLegacyZhangjiajieContactTitle
    : frenchContactTourNames[context.slug] ?? context.name;
}
function travellersLabel(count: number) { return `${count} ${count === 1 ? 'voyageur' : 'voyageurs'}`; }
function selectionLabel(context: PrivateTourInquiryContext) {
  const selected = context.selection;
  if (!selected) return null;
  const label = context.slug === 'zhangjiajie-4-day-private-tour'
    ? frenchLegacyStayNames[selected.packageId as keyof typeof frenchLegacyStayNames]
    : frenchContactPackageLabels[`${context.slug}:${selected.packageId}`];
  return label ? `${label} · ${isFiveCitySmallGroup(context.slug) && selected.packageId === 'small-group-departure' ? 'tarif en chambre partagée à deux' : travellersLabel(selected.travelers)}` : null;
}
function draftText(draft?: TourContactDraft) {
  if (!draft) return '';
  const stay = frenchLegacyDraftStayName(draft.stayPreference);
  return [draft.smallGroup ? smallGroupInquiryText('fr', draft.smallGroup, draft.requestedTravelers) : `Arrivée prévue : ${draft.travelDate || 'dates à définir'}`, !draft.smallGroup && draft.requestedTravelers != null ? `Voyageurs : ${draft.requestedTravelers}` : '', stay ? `Hébergement souhaité (à confirmer) : ${stay}` : '', draft.note.trim() ? `Votre projet : ${draft.note.trim()}` : '', draft.referralSource ? `Comment vous nous avez connus : ${draft.referralSource === 'friend' ? 'Recommandation d’un proche' : draft.referralSource === 'other' ? 'Autre' : draft.referralSource}` : ''].filter(Boolean).join('\n');
}
function messageText(context: PrivateTourInquiryContext | null, path?: string, draft?: TourContactDraft) {
  const page = context ? `/fr/tours/${context.slug}/` : path;
  const preferredStay = context?.customGroup?.stayId ? frenchLegacyStayNames[context.customGroup.stayId] : null;
  return [isFiveCitySmallGroup(context?.slug) ? smallGroupInquiryCopy.fr.opening : 'Bonjour, je souhaite préparer un voyage en Chine.', context ? tourName(context) : '', context ? selectionLabel(context) : '', preferredStay && !draft?.stayPreference ? `Hébergement souhaité (à confirmer) : ${preferredStay}` : '', page?.startsWith('/fr/') ? `Page : https://homegroundchina.com${page}` : '', draftText(draft), 'Guide francophone souhaité (supplément sur devis) :'].filter(Boolean).join('\n');
}
export function frenchContactWhatsAppHref(context: PrivateTourInquiryContext | null, path?: string) { return homegroundWhatsAppHref(messageText(context,path)); }

/** UI is French; the established English intake contract preserves server-side validation.
 * The source-language marker reaches the planner, and the receipt discloses English auto-email.
 */
export const frenchContactEdition: ContactEdition = {
  language: 'fr', intlLocale: 'fr-FR', toursPath: '/fr/tours/', privacyHref: '/fr/privacy/', homePath: '/fr/',
  tourPath: slug => `/fr/tours/${slug}/`, tourSlugFromPath: path => pattern.exec(path)?.[1] ?? null,
  isGuidePath: path => /^\/fr\/guides\/(?:[a-z0-9-]+\/)?$/u.test(path),
  tourName, travellersLabel, selectionLabel, messageText,
  stayPreferenceLabel: context => context.customGroup?.stayId ? frenchLegacyStayNames[context.customGroup.stayId] : null,
  mailtoHref: (context, draft, guide) => `mailto:${homegroundBusiness.serviceEmail}?subject=${encodeURIComponent(context ? `${isFiveCitySmallGroup(context.slug) ? smallGroupInquiryCopy.fr.subject : 'Demande de devis'} : ${tourName(context)}` : 'Mon projet de voyage en Chine')}&body=${encodeURIComponent(messageText(context,guide?.path,draft).replace(/\r?\n/g,'\r\n'))}`,
  noteMarker: path => `[Sent from the French page https://homegroundchina.com${path}; the traveller read it in French. French-speaking guide is quoted separately.]`,
  noteTooLong: limit => `Votre message ne doit pas dépasser ${limit} caractères.`,
  frame: { title: 'Parlons de votre voyage', close: 'Fermer' },
  card: {
    title: 'Parlons de votre voyage', close: 'Fermer', chinaTime: 'Heure en Chine', tourLabel: 'Votre circuit', guideLabel: 'À propos de ce guide',
    scanTitle: 'Poursuivre la conversation sur votre téléphone', scanSteps: ['Scannez ce code avec l’appareil photo de votre téléphone.', 'WhatsApp s’ouvre avec un message prêt à envoyer.'], qrLabel: 'Code QR pour contacter Homeground sur WhatsApp', numberLabel: 'WhatsApp', copy: 'Copier', copied: 'Copié', copyNumber: 'Copier le numéro WhatsApp', copyEmail: 'Copier l’adresse e-mail', useHere: 'Utiliser WhatsApp sur cet ordinateur', or: 'ou', replyFrom: 'Nous répondons depuis', directEmailAction: 'Nous écrire par e-mail', openMailApp: 'Ouvrir votre messagerie', tabsLabel: 'Moyens de nous contacter', tabWhatsApp: 'WhatsApp', tabEmail: 'E-mail', tabMessenger: 'Messenger', messengerScanTitle: 'Scannez pour discuter sur Messenger', messengerSteps: ['Scannez ce code avec votre téléphone.', 'Messenger ouvre une conversation avec nous.'], messengerQrLabel: 'Code QR pour contacter Homeground sur Messenger',
  },
  desk: {
    whatsappAction: 'Ouvrir WhatsApp', whatsappOpensExternally: 'Ouvre WhatsApp dans un nouvel onglet ou dans l’application. Vous devez envoyer votre message dans cette application pour nous contacter.', whatsappUnavailable: 'La discussion WhatsApp est momentanément indisponible.', messengerAction: 'Écrire sur Messenger', messengerOpensExternally: 'Ouvre Messenger dans un nouvel onglet ou dans l’application. Vous devez envoyer votre message dans cette application pour nous contacter.', emailTitle: 'Laissez-nous votre adresse e-mail', emailLabel: 'Votre adresse e-mail', emailPlaceholder: 'vous@exemple.fr', emailAction: 'Demander à être recontacté', emailSubmitting: 'Enregistrement…', emailUse: 'Votre adresse sert uniquement à répondre à votre demande. Vous ne serez inscrit à aucune liste commerciale.', privacyLead: 'Utilisation de vos données :', privacyAction: 'Confidentialité', emailInvalid: 'Saisissez une adresse e-mail valide.', retryAction: 'Vérifier et réessayer', failed: 'Votre adresse e-mail n’a pas été enregistrée. Réessayez ou utilisez WhatsApp.', uncertain: 'Nous ne pouvons pas confirmer la réception. Réessayez avec la même adresse pour vérifier si votre demande nous est parvenue.', emailUnavailable: 'Le formulaire est momentanément indisponible.',
  },
  tourContact: {
    title: 'Préparons votre voyage.', intro: 'Indiquez vos dates. Nous vous enverrons un devis personnalisé par e-mail.', ask: 'Parler de mon projet', close: 'Fermer le formulaire', whatsapp: 'Discuter sur WhatsApp', email: 'Adresse e-mail', date: 'Date d’arrivée prévue', undecided: 'Mes dates ne sont pas encore fixées', note: 'Que souhaitez-vous nous préciser ?', optional: 'Facultatif', placeholder: 'Votre groupe, vos envies, la langue du guide ou un ajustement du circuit…', submit: 'Demander mon devis', sending: 'Envoi…', privacy: 'Confidentialité', consent: 'Nous utilisons ces informations pour répondre à votre demande.', manual: 'Nous vérifierons les disponibilités et confirmerons le prix final.', success: 'Votre demande est enregistrée.', successBody: 'Nous examinerons votre projet et vous répondrons par e-mail.', reference: 'Référence', done: 'Revenir au circuit', failed: 'Votre demande n’a pas été enregistrée. Réessayez ou contactez-nous ci-dessous.', uncertain: 'Nous ne pouvons pas confirmer la réception. Utilisez « Vérifier et réessayer » pour reprendre cette demande.', retry: 'Vérifier et réessayer', fallback: 'Vous préférez nous contacter directement ?', unavailable: 'Écrivez-nous au sujet de ce voyage. Le message contiendra le circuit choisi.', guideBody: 'Vous préparez un voyage en Chine ? Échangeons sur les étapes, les hébergements et l’accompagnement.', guideEmail: 'Nous écrire', tours: 'Voir les circuits et les tarifs', selected: 'Votre circuit', alternative: 'Ou discuter sur WhatsApp',
  },
  direct: { intro: 'Écrivez-nous depuis votre messagerie ou sur WhatsApp. Nous vous répondrons dans la même conversation.', email: 'Nous écrire par e-mail', formIntro: 'Vous préférez être recontacté ? Laissez vos coordonnées pour recevoir un devis personnalisé.', failed: 'Votre demande n’a pas été enregistrée. Réessayez ou écrivez-nous directement avec le lien ci-dessus.' },
  quote: { placeholder: 'Chambres, âge des enfants, arrivée et départ, rythme de marche souhaité…', source: 'Comment nous avez-vous connus ?', blank: 'Choisir une réponse (facultatif)', friend: 'Recommandation d’un proche', other: 'Autre', group: 'Combien de personnes voyagent ?', groupHint: 'Nous établirons le devis pour ce nombre de personnes.', groupError: 'Indiquez entre 1 et 99 voyageurs.' },
  fieldErrors: { email: 'Vérifiez votre adresse e-mail.', date: 'Saisissez une date valide ou indiquez que vos dates restent à définir.', note: 'Votre message ne doit pas dépasser 1 000 caractères.', control: 'Certains caractères copiés ne sont pas acceptés. Supprimez-les ou saisissez à nouveau votre message.' },
  labels: { stayPreference: 'Hébergement souhaité (à confirmer)', guide: 'À propos de ce guide', brand: 'HOMEGROUND CHINA' },
  date: { placeholder: 'JJ/MM/AAAA', formatHint: 'Jour / mois / année (JJ/MM/AAAA)', invalid: 'Saisissez une date valide au format JJ/MM/AAAA.', openCalendar: 'Ouvrir le calendrier', closeCalendar: 'Fermer le calendrier', title: 'Choisissez une date', loadingCalendar: 'Chargement du calendrier…', calendarUnavailable: 'Le calendrier n’a pas pu être chargé. Fermez-le pour saisir la date ou rouvrez-le pour réessayer.' },
  receipt: {
    correctionSubject: 'Corriger mon adresse e-mail', correctionBody: 'Bonjour, je souhaite corriger l’adresse e-mail de cette demande.', correctionAddress: 'Adresse correcte : ', continuationGreeting: 'Bonjour, j’ai envoyé une demande et souhaite poursuivre ici.', details: 'Voir les détails de la demande', destinations: 'Destinations souhaitées', nights: 'Durée du voyage (nuits)', suppressedNext: 'Vous cherchez une confirmation précédente ? Regardez dans vos courriers indésirables et, si elle s’y trouve, indiquez qu’il ne s’agit pas d’un spam. Vous pouvez aussi écrire à', directNext: 'Vous pouvez aussi nous écrire à', title: 'Nous avons reçu votre demande', reference: 'Référence', email: 'Nous vous répondrons à', phone: 'Réponse par WhatsApp', homepage: 'Projet de voyage', planner: 'Demande de préparation de voyage', tour: 'Votre circuit', selection: 'Formule choisie', date: 'Date d’arrivée', undecided: 'Dates à définir', party: 'Voyageurs', boundary: 'Il s’agit d’une demande, pas d’une réservation. Nous vérifions la composition du groupe et les disponibilités avant de vous adresser un devis.', next: 'Vous ne trouvez pas la confirmation après quelques minutes ? Regardez dans vos courriers indésirables. Si elle s’y trouve, indiquez qu’il ne s’agit pas d’un spam, puis répondez « Bien reçu ». Si besoin, écrivez-nous à', whatsappNext: 'L’équipe Homeground examinera votre demande et vous répondra sur WhatsApp.', due: 'Réponse attendue avant le', zone: 'heure de Chine (UTC+8)', queued: 'L’e-mail de confirmation est en cours d’envoi. Il est rédigé en anglais ; vous pouvez nous répondre en français. Inutile de renvoyer votre demande.', disabled: 'Un conseiller vous répondra par e-mail. Vous pouvez nous écrire en français. Inutile de renvoyer votre demande.', suppressed: 'Votre demande est enregistrée ; aucun nouvel e-mail de confirmation n’est envoyé cette fois. Inutile de la renvoyer.', unavailable: 'L’e-mail de confirmation n’a pas pu être envoyé, mais votre demande est enregistrée et un conseiller vous répondra.', correct: 'Une erreur dans l’adresse ?', correction: 'Écrivez-nous avec cette référence pour demander la correction.', emailAction: 'Nous écrire', whatsappAction: 'WhatsApp', continueWhatsapp: 'Poursuivre sur WhatsApp', typoEnd: ' ?', typo: 'Vouliez-vous écrire', use: 'Utiliser cette adresse', correctionLabel: 'Corriger l’adresse e-mail', correctionHelp: 'Nous utiliserons cette adresse pour vous répondre. Le contenu de votre demande reste inchangé.', correctionSave: 'Enregistrer l’adresse', correctionCancel: 'Annuler', correctionSaving: 'Enregistrement…', correctionSaved: 'Adresse mise à jour. Une confirmation a peut-être déjà été envoyée à l’ancienne adresse.', correctionInvalid: 'Saisissez une adresse e-mail valide.', correctionFailed: 'L’adresse n’a pas pu être mise à jour. Réessayez.', correctionUncertain: 'Nous ne pouvons pas confirmer la modification. Utilisez « Vérifier et réessayer » pour la reprendre.', correctionRetry: 'Vérifier et réessayer', correctionUnavailable: 'La correction en ligne n’est plus disponible. Écrivez-nous avec votre référence.', correctionConflict: 'Cette adresse a été modifiée ailleurs. Écrivez-nous avec votre référence avant de réessayer.', correctionBusy: 'Un message est en cours d’envoi. Réessayez dans un instant.', correctionSame: 'C’est déjà votre adresse de réponse actuelle.',
  },
  sheetSteps: [325,381,466], sheetHeights: [[744,792],[724,772],[703,742],[656,695]],
};
