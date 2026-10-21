import type { ContactEdition } from './contactEdition.ts';
import type { PrivateTourInquiryContext } from './privateTourInquiryContext.ts';
import type { TourContactDraft } from './tourContactDraft.ts';
import { homegroundBusiness } from './homegroundBusiness.ts';
import { homegroundWhatsAppHref } from './tourContact.ts';
import { germanContactTourNames, germanContactPackageLabels } from './germanContactNames.ts';
import { germanLegacyZhangjiajieContactTitle, germanLegacyStayNames, germanLegacyDraftStayName } from './germanLegacyContactCopy.ts';
import { editionReplyPromise } from './editionReplyPromise.ts';

const pattern = /^\/de\/tours\/([a-z0-9-]+)\/$/u;
function tourName(context: PrivateTourInquiryContext) {
  return context.slug === 'zhangjiajie-4-day-private-tour'
    ? germanLegacyZhangjiajieContactTitle
    : germanContactTourNames[context.slug] ?? context.name;
}
function travellersLabel(count: number) { return `${count} ${count === 1 ? 'Person' : 'Personen'}`; }
function selectionLabel(context: PrivateTourInquiryContext) {
  const selected = context.selection;
  if (!selected) return null;
  const label = context.slug === 'zhangjiajie-4-day-private-tour'
    ? germanLegacyStayNames[selected.packageId as keyof typeof germanLegacyStayNames]
    : germanContactPackageLabels[`${context.slug}:${selected.packageId}`];
  return label ? `${label} · ${travellersLabel(selected.travelers)}` : null;
}
function draftText(draft?: TourContactDraft) {
  if (!draft) return '';
  const stay = germanLegacyDraftStayName(draft.stayPreference);
  return [`Geplante Ankunft: ${draft.travelDate || 'Datum noch offen'}`, draft.requestedTravelers != null ? `Reisende: ${draft.requestedTravelers}` : '', stay ? `Gewünschte Unterkunft (noch zu bestätigen): ${stay}` : '', draft.note.trim() ? `Ihre Reisepläne: ${draft.note.trim()}` : '', draft.referralSource ? `Wie haben Sie uns gefunden: ${draft.referralSource === 'friend' ? 'Empfehlung von Bekannten' : draft.referralSource === 'other' ? 'Sonstiges' : draft.referralSource}` : ''].filter(Boolean).join('\n');
}
function messageText(context: PrivateTourInquiryContext | null, path?: string, draft?: TourContactDraft) {
  const page = context ? `/de/tours/${context.slug}/` : path;
  const preferredStay = context?.customGroup?.stayId ? germanLegacyStayNames[context.customGroup.stayId] : null;
  return ['Guten Tag, ich möchte eine Reise nach China planen.', context ? tourName(context) : '', context ? selectionLabel(context) : '', preferredStay && !draft?.stayPreference ? `Gewünschte Unterkunft (noch zu bestätigen): ${preferredStay}` : '', page?.startsWith('/de/') ? `Seite: https://homegroundchina.com${page}` : '', draftText(draft), 'Gewünschte Sprache der Reiseleitung (Verfügbarkeit und Preis bitte bestätigen):'].filter(Boolean).join('\n');
}
export function germanContactWhatsAppHref(context: PrivateTourInquiryContext | null, path?: string) { return homegroundWhatsAppHref(messageText(context,path)); }

/** UI is German; the established English intake contract preserves server-side validation.
 * The source-language marker reaches the planner, and the receipt discloses English auto-email.
 */
export const germanContactEdition: ContactEdition = {
  language: 'de', intlLocale: 'de-DE', toursPath: '/de/tours/', privacyHref: '/de/privacy/', homePath: '/de/',
  tourPath: slug => `/de/tours/${slug}/`, tourSlugFromPath: path => pattern.exec(path)?.[1] ?? null,
  isGuidePath: path => /^\/de\/guides\/(?:[a-z0-9-]+\/)?$/u.test(path),
  tourName, travellersLabel, selectionLabel, messageText,
  stayPreferenceLabel: context => context.customGroup?.stayId ? germanLegacyStayNames[context.customGroup.stayId] : null,
  mailtoHref: (context, draft, guide) => `mailto:${homegroundBusiness.serviceEmail}?subject=${encodeURIComponent(context ? `Angebotsanfrage: ${tourName(context)}` : 'Meine Reisepläne für China')}&body=${encodeURIComponent(messageText(context,guide?.path,draft).replace(/\r?\n/g,'\r\n'))}`,
  noteMarker: path => `[Sent from the German page https://homegroundchina.com${path}; the traveller read it in German. German-speaking guide availability and price are not confirmed.]`,
  noteTooLong: limit => `Ihre Nachricht darf höchstens ${limit} Zeichen enthalten.`,
  frame: { title: 'Sprechen wir über Ihre Reise', close: 'Schließen' },
  card: {
    title: 'Sprechen wir über Ihre Reise', close: 'Schließen', chinaTime: 'Uhrzeit in China', tourLabel: 'Ihre Reise', guideLabel: 'Zu diesem Ratgeber',
    scanTitle: 'Das Gespräch auf Ihrem Smartphone fortsetzen', scanSteps: ['Scannen Sie diesen Code mit der Kamera Ihres Smartphones.', 'WhatsApp öffnet sich mit einer vorbereiteten Nachricht.'], qrLabel: 'QR-Code für den Kontakt mit Homeground über WhatsApp', numberLabel: 'WhatsApp', copy: 'Kopieren', copied: 'Kopiert', copyNumber: 'WhatsApp-Nummer kopieren', copyEmail: 'E-Mail-Adresse kopieren', useHere: 'WhatsApp auf diesem Computer verwenden', or: 'oder', replyFrom: 'Wir antworten von', directEmailAction: 'E-Mail schreiben', openMailApp: 'E-Mail-App öffnen', tabsLabel: 'Kontaktmöglichkeiten', tabWhatsApp: 'WhatsApp', tabEmail: 'E-Mail', tabMessenger: 'Messenger', messengerScanTitle: 'Scannen und auf Messenger schreiben', messengerSteps: ['Scannen Sie diesen Code mit Ihrem Smartphone.', 'Messenger öffnet ein Gespräch mit uns.'], messengerQrLabel: 'QR-Code für den Kontakt mit Homeground über Messenger',
  },
  desk: {
    whatsappAction: 'WhatsApp öffnen', whatsappOpensExternally: `Öffnet WhatsApp in einem neuen Tab oder in der App. Senden Sie dort Ihre Nachricht, um uns zu kontaktieren. ${editionReplyPromise.de}`, whatsappUnavailable: 'WhatsApp ist vorübergehend nicht verfügbar.', messengerAction: 'Auf Messenger schreiben', messengerOpensExternally: 'Öffnet Messenger in einem neuen Tab oder in der App. Senden Sie dort Ihre Nachricht, um uns zu kontaktieren.', emailTitle: 'Hinterlassen Sie Ihre E-Mail-Adresse', emailLabel: 'Ihre E-Mail-Adresse', emailPlaceholder: 'sie@beispiel.de', emailAction: 'Um Rückmeldung bitten', emailSubmitting: 'Wird gespeichert …', emailUse: 'Wir verwenden Ihre Adresse nur, um Ihre Anfrage zu beantworten. Sie werden in keinen Werbeverteiler aufgenommen.', privacyLead: 'So verwenden wir Ihre Daten:', privacyAction: 'Datenschutz', emailInvalid: 'Geben Sie eine gültige E-Mail-Adresse ein.', retryAction: 'Prüfen und erneut versuchen', failed: 'Ihre E-Mail-Adresse wurde nicht gespeichert. Versuchen Sie es erneut oder nutzen Sie WhatsApp.', uncertain: 'Wir können den Eingang nicht bestätigen. Versuchen Sie es mit derselben Adresse erneut, um zu prüfen, ob Ihre Anfrage angekommen ist.', emailUnavailable: 'Das Formular ist vorübergehend nicht verfügbar.',
  },
  tourContact: {
    title: 'Planen wir Ihre Reise.', intro: 'Teilen Sie uns Ihre Reisedaten mit. Wir senden Ihnen ein persönliches Angebot per E-Mail.', ask: 'Meine Reise besprechen', close: 'Formular schließen', whatsapp: 'Auf WhatsApp schreiben', email: 'E-Mail-Adresse', date: 'Geplante Ankunft', undecided: 'Meine Reisedaten stehen noch nicht fest', note: 'Was möchten Sie uns noch mitteilen?', optional: 'Optional', placeholder: 'Ihre Reisegruppe, Wünsche, Sprache der Reiseleitung oder Anpassungen an der Route …', submit: 'Angebot anfragen', sending: 'Wird gesendet …', privacy: 'Datenschutz', consent: 'Wir verwenden diese Angaben, um Ihre Anfrage zu beantworten.', manual: 'Wir prüfen die Verfügbarkeit und bestätigen den endgültigen Preis.', success: 'Ihre Anfrage wurde gespeichert.', successBody: 'Wir prüfen Ihre Reisepläne und antworten Ihnen per E-Mail.', reference: 'Referenz', done: 'Zurück zur Reise', failed: 'Ihre Anfrage wurde nicht gespeichert. Versuchen Sie es erneut oder kontaktieren Sie uns unten.', uncertain: 'Wir können den Eingang nicht bestätigen. Wählen Sie „Prüfen und erneut versuchen“, um diese Anfrage fortzusetzen.', retry: 'Prüfen und erneut versuchen', fallback: 'Möchten Sie uns direkt kontaktieren?', unavailable: `Schreiben Sie uns zu dieser Reise. Die ausgewählte Route wird in die Nachricht übernommen. ${editionReplyPromise.de}`, guideBody: `Planen Sie eine Reise nach China? Sprechen wir über Stationen, Unterkünfte und Begleitung. ${editionReplyPromise.de}`, guideEmail: 'E-Mail schreiben', tours: 'Reisen und Preise ansehen', selected: 'Ihre Reise', alternative: 'Oder auf WhatsApp schreiben',
  },
  direct: { intro: 'Schreiben Sie uns per E-Mail oder WhatsApp. Wir antworten Ihnen im selben Gespräch auf Deutsch innerhalb von 12 Stunden.', email: 'E-Mail schreiben', formIntro: 'Möchten Sie eine Rückmeldung? Hinterlassen Sie Ihre Kontaktdaten für ein persönliches Angebot.', failed: 'Ihre Anfrage wurde nicht gespeichert. Versuchen Sie es erneut oder schreiben Sie uns direkt über den Link oben.' },
  quote: { placeholder: 'Zimmer, Alter der Kinder, Ankunft und Abreise, gewünschtes Gehtempo …', source: 'Wie haben Sie uns gefunden?', blank: 'Antwort auswählen (optional)', friend: 'Empfehlung von Bekannten', other: 'Sonstiges', group: 'Wie viele Personen reisen mit?', groupHint: 'Wir erstellen das Angebot für diese Personenzahl.', groupError: 'Geben Sie zwischen 1 und 99 Reisende an.' },
  fieldErrors: { email: 'Prüfen Sie Ihre E-Mail-Adresse.', date: 'Geben Sie ein gültiges Datum ein oder wählen Sie aus, dass Ihre Reisedaten noch offen sind.', note: 'Ihre Nachricht darf höchstens 1.000 Zeichen enthalten.', control: 'Einige eingefügte Zeichen werden nicht unterstützt. Entfernen Sie diese oder geben Sie Ihre Nachricht erneut ein.' },
  labels: { stayPreference: 'Gewünschte Unterkunft (noch zu bestätigen)', guide: 'Zu diesem Ratgeber', brand: 'HOMEGROUND CHINA' },
  date: { placeholder: 'TT/MM/JJJJ', formatHint: 'Tag / Monat / Jahr (TT/MM/JJJJ)', invalid: 'Geben Sie ein gültiges Datum im Format TT/MM/JJJJ ein.', openCalendar: 'Kalender öffnen', closeCalendar: 'Kalender schließen', title: 'Datum auswählen', loadingCalendar: 'Kalender wird geladen …', calendarUnavailable: 'Der Kalender konnte nicht geladen werden. Schließen Sie ihn, um das Datum einzugeben, oder öffnen Sie ihn erneut.' },
  receipt: {
    correctionSubject: 'Meine E-Mail-Adresse korrigieren', correctionBody: 'Guten Tag, ich möchte die E-Mail-Adresse zu dieser Anfrage korrigieren.', correctionAddress: 'Richtige Adresse: ', continuationGreeting: 'Guten Tag, ich habe eine Anfrage gesendet und möchte das Gespräch hier fortsetzen.', details: 'Anfragedetails ansehen', destinations: 'Gewünschte Reiseziele', nights: 'Reisedauer (Nächte)', suppressedNext: 'Suchen Sie eine frühere Bestätigung? Prüfen Sie Ihren Spamordner und markieren Sie die Nachricht gegebenenfalls als „Kein Spam“. Sie können auch schreiben an', directNext: 'Sie können uns auch schreiben an', title: 'Wir haben Ihre Anfrage erhalten', reference: 'Referenz', email: 'Wir antworten Ihnen an', phone: 'Antwort per WhatsApp', homepage: 'Reisepläne', planner: 'Anfrage zur Reiseplanung', tour: 'Ihre Reise', selection: 'Ausgewählte Variante', date: 'Ankunftsdatum', undecided: 'Reisedaten noch offen', party: 'Reisende', boundary: 'Dies ist eine Anfrage, keine Buchung. Wir prüfen die Zusammensetzung Ihrer Reisegruppe und die Verfügbarkeit, bevor wir Ihnen ein Angebot senden.', next: 'Nach einigen Minuten noch keine Bestätigung? Prüfen Sie Ihren Spamordner. Markieren Sie die Nachricht gegebenenfalls als „Kein Spam“ und antworten Sie mit „Erhalten“. Bei Bedarf schreiben Sie uns an', whatsappNext: 'Das Homeground-Team prüft Ihre Anfrage und antwortet Ihnen auf WhatsApp.', due: 'Antwort voraussichtlich bis', zone: 'chinesische Zeit (UTC+8)', queued: 'Die Bestätigungs-E-Mail wird gesendet. Sie ist auf Englisch verfasst. Sie müssen Ihre Anfrage nicht erneut senden.', disabled: 'Ein Reiseplaner antwortet Ihnen per E-Mail. Sie müssen Ihre Anfrage nicht erneut senden.', suppressed: 'Ihre Anfrage wurde gespeichert; diesmal wird keine weitere Bestätigungs-E-Mail gesendet. Sie müssen die Anfrage nicht erneut senden.', unavailable: 'Die Bestätigungs-E-Mail konnte nicht gesendet werden. Ihre Anfrage wurde jedoch gespeichert und ein Reiseplaner wird Ihnen antworten.', correct: 'Fehler in der Adresse?', correction: 'Schreiben Sie uns mit dieser Referenz, um die Adresse korrigieren zu lassen.', emailAction: 'E-Mail schreiben', whatsappAction: 'WhatsApp', continueWhatsapp: 'Auf WhatsApp fortsetzen', typoEnd: '?', typo: 'Meinten Sie', use: 'Diese Adresse verwenden', correctionLabel: 'E-Mail-Adresse korrigieren', correctionHelp: 'Wir verwenden diese Adresse für unsere Antwort. Der Inhalt Ihrer Anfrage bleibt unverändert.', correctionSave: 'Adresse speichern', correctionCancel: 'Abbrechen', correctionSaving: 'Wird gespeichert …', correctionSaved: 'Adresse aktualisiert. Eine Bestätigung wurde möglicherweise bereits an die vorherige Adresse gesendet.', correctionInvalid: 'Geben Sie eine gültige E-Mail-Adresse ein.', correctionFailed: 'Die Adresse konnte nicht aktualisiert werden. Versuchen Sie es erneut.', correctionUncertain: 'Wir können die Änderung nicht bestätigen. Wählen Sie „Prüfen und erneut versuchen“, um fortzufahren.', correctionRetry: 'Prüfen und erneut versuchen', correctionUnavailable: 'Die Online-Korrektur ist nicht mehr verfügbar. Schreiben Sie uns unter Angabe Ihrer Referenz.', correctionConflict: 'Diese Adresse wurde an anderer Stelle geändert. Schreiben Sie uns mit Ihrer Referenz, bevor Sie es erneut versuchen.', correctionBusy: 'Eine Nachricht wird gerade gesendet. Versuchen Sie es gleich noch einmal.', correctionSame: 'Dies ist bereits Ihre aktuelle Antwortadresse.',
  },
  sheetSteps: [325,381,466], sheetHeights: [[744,792],[724,772],[703,742],[656,695]],
};
