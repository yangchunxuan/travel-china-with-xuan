import { getHomegroundCopy, type HomegroundCopy } from './homegroundI18n';
import { getHomepageShowcaseCopy } from './homepageShowcaseI18n';
import { getHomepagePlanningDeskCopy, type HomepagePlanningDeskCopy } from './homepagePlanningDesk';
import type { HomepageProductShowcaseTemplateCopy } from '../components/HomepageProductShowcase';
import type { PlanningScopeCopy } from './homegroundPlanningScopeI18n';
import { germanContactEdition } from './germanContactEdition';
import { germanGuideLanguageNote } from './germanSite';

const original = getHomegroundCopy('en');

/** The original home layout reads these fields; intake still uses its established locale contract. */
export const germanHomeCopy: HomegroundCopy = {
  ...original,
  htmlLang: 'de', path: '/de/', languageName: 'Deutsch', languageShort: 'DE',
  skipLink: 'Zum Inhalt springen',
  businessDescriptor: 'Reiseveranstalter in China',
  brandTagline: 'China auf Ihre Art. Wir begleiten Sie.',
  schemaDescription: `Homeground China ist ein Reiseveranstalter in China für individuelle Privatreisen: Routen, Unterkünfte, Reservierungen, Transport und Unterstützung vor Ort. ${germanGuideLanguageNote}`,
  hero: {
    ...original.hero,
    eyebrow: 'Individuelle Privatreisen durch China',
    title: 'China auf Ihre Art. Wir begleiten Sie.',
    socialImageAlt: 'Ein Eckturm der Verbotenen Stadt in Peking spiegelt sich im Wassergraben',
  },
  guides: { ...original.guides, viewAllLabel: 'Alle Reisetipps' },
  faq: {
    eyebrow: 'Ihre Fragen', title: 'Orientierung vor der Reise.', intro: '',
    items: [
      {
        question: 'Sind die Reisen privat oder in einer Kleingruppe?',
        answer: `Die meisten unserer Reisen sind privat: Reiseleitung und Fahrzeug stehen Ihnen und Ihren Mitreisenden exklusiv zur Verfügung. Als Kleingruppe gekennzeichnete Reisen starten zu festen Terminen mit weiteren Gästen. Manche Privatreisen enthalten auch Züge, Kreuzfahrten oder gemeinsam genutzte Verkehrsmittel innerhalb von Sehenswürdigkeiten. Diese Strecken werden auf der Reiseseite und in der schriftlichen Bestätigung genannt. Reiseart, Leistungen und Preis werden vor der Zahlung bestätigt. Ohne Ihre Zustimmung ordnen wir Sie keiner gemeinsamen Gruppe zu. ${germanGuideLanguageNote}`,
      },
      {
        question: 'Was passiert nach meiner ersten Nachricht?',
        answer: 'Eine Ansprechperson klärt zunächst Ihr Vorhaben und wobei Sie Unterstützung wünschen. Wenn Sie mit uns weiterplanen möchten, bestätigen wir Leistungen, Umfang und Preis, bevor kostenpflichtige Arbeit beginnt.',
      },
      {
        question: 'Wer übernimmt Buchungen und Leistungen vor Ort?',
        answer: 'Das hängt von der gewählten Unterstützung ab. Vor Beginn halten wir schriftlich fest, was Homeground übernimmt, welche Leistungen örtliche Partner erbringen und welche Buchungen bei Ihnen bleiben.',
      },
      {
        question: 'Können Sie die Reise an Kinder, ältere Eltern oder eingeschränkte Mobilität anpassen?',
        answer: 'Ja. Teilen Sie uns Ihre Bedürfnisse früh mit: Gehzeiten, Treppen, frühe Abfahrten, Zimmeraufteilung, Essen oder Pausen. Wir berücksichtigen sie bei der Route und der Planung jedes Tages.',
      },
      {
        question: 'Kann ich Sie kontaktieren, wenn meine Pläne noch offen sind?',
        answer: 'Natürlich. Nennen Sie Ihre Termine, Teilnehmerzahl und bereits feststehende Städte, falls vorhanden. Im Gespräch können wir den Rest der Reise gemeinsam konkretisieren.',
      },
      {
        question: 'Was, wenn ich Flüge, Hotels oder Teile der Reise schon gebucht habe?',
        answer: 'Sie müssen nicht von vorn beginnen. Wir planen die übrige Route um Ihre bestätigten Buchungen herum und weisen auf unpassende Zeiten, schwierige Transfers oder noch fehlende Teile hin.',
      },
      {
        question: 'Helfen Sie auch bei nur einem Teil der Reise?',
        answer: 'Ja. Sie können uns die ganze Reise oder nur die Teile anvertrauen, die schwer zu organisieren sind: die Wahl der Stationen, Anschlüsse, Übernachtungsorte oder einen bestimmten Routenabschnitt.',
      },
    ],
  },
};

export const germanHomepageShowcaseCopy: ReturnType<typeof getHomepageShowcaseCopy> = {
  heroBody: 'Wählen Sie eine Route, die zu Ihnen passt. Gemeinsam stimmen wir sie auf Ihre Termine ab.',
  heroHeadline: {
    fixedLines: ['China auf Ihre Art.'], joiner: ' ',
    phrases: ['Wir begleiten Sie.', 'Gut geplant unterwegs.', 'Zeit zum Entdecken.', 'Wir kümmern uns um den Rest.'],
  },
  heroPrimary: 'Privatreisen vergleichen', heroSecondary: 'Meine Reise besprechen',
  heroDestinationPrompt: 'Ihre Stationen stehen noch nicht fest?', heroDestinationAction: 'Reiseziele entdecken',
  guidePaths: { listLabel: 'Tipps zur Planung Ihrer China-Reise', items: [
    { id: 'stay', title: 'Den passenden Übernachtungsort wählen' },
    { id: 'transport', title: 'Die Ankunft vorbereiten' },
    { id: 'plan', title: 'Das richtige Tempo finden' },
  ] },
  planning: {
    eyebrow: 'Ein Team vor Ort, wenn Sie es brauchen',
    title: 'Behalten Sie Ihre Buchungen. Wir planen den Rest.',
    body: 'Homeground ist ein Reiseveranstalter in China für individuelle Privatreisen. Behalten Sie bereits gebuchte Flüge oder Hotels: Wir können die übrige Reise organisieren oder bei einer einzelnen schwierigen Etappe helfen.',
    teamAction: 'Das Homeground-Team kennenlernen',
  },
};

export const germanHomepageProductCopy: HomepageProductShowcaseTemplateCopy = {
  eyebrow: 'Reisen als Ausgangspunkt',
  title: 'Von alten Hauptstädten zu den Flüssen des Südens.',
  intro: `Vergleichen Sie Stationen und Preise und entdecken Sie die passende Reise. ${germanGuideLanguageNote}`,
  countLabel: '{count} Reisen', durationLabel: '{days} Tage · {nights} Nächte',
  productLabel: 'Privatreise', startingPriceLabel: 'Veröffentlichter Preis ab',
  quoteOnlyLabel: 'Auf Anfrage', quoteOnlyNote: 'Für Ihre Termine und Gruppengröße',
  perPersonLabel: 'pro Person', groupBasis: 'bei {travelers} Reisenden',
  actionLabel: 'Diese Reise entdecken', hubActionLabel: 'Alle China Rundreisen vergleichen',
  productListLabel: 'Homeground China Privatreisen',
};

export const germanPlanningScopeCopy: PlanningScopeCopy = {
  htmlLang: 'de',
  title: 'Ihre China-Reise, von Anfang bis Ende durchdacht.',
  titleLines: ['Ihre China-Reise, ', 'von Anfang bis Ende durchdacht.'],
  body: 'Wir planen die Reihenfolge der Stationen, passende Stadtviertel zum Übernachten, Fahrten zwischen den Städten, Reservierungen und den Tagesrhythmus nach Ihren Terminen, Interessen und Mitreisenden.',
  values: ['Stationen passend zur verfügbaren Zeit', 'Gut aufeinander abgestimmte Wege', 'Ein Tempo, das Ihrer Gruppe entspricht'],
  cta: 'Meine Reise besprechen',
};

const originalDesk = getHomepagePlanningDeskCopy('en');
export const germanHomepagePlanningCopy: HomepagePlanningDeskCopy = {
  ...originalDesk,
  contactPanelLabel: 'WhatsApp, Messenger oder E-Mail',
  contactNoPayment: 'Die Kontaktaufnahme ist kostenlos.',
  contactStart: {
    ...originalDesk.contactStart,
    ...germanContactEdition.desk,
    whatsappEyebrow: 'Direkt im Gespräch', whatsappTitle: 'Auf WhatsApp schreiben',
    messengerLead: 'Lieber über Facebook?', emailEyebrow: 'Nur eine Angabe',
    emailSuccessTitle: 'Ihre E-Mail-Adresse wurde gespeichert.',
    emailSuccessBody: 'Eine Homeground-Ansprechperson kann Ihnen nun antworten. Reisedetails wurden hier noch nicht erfasst.',
    referenceLabel: 'Referenz', emailFallbackAction: 'Direkt schreiben',
  },
};
