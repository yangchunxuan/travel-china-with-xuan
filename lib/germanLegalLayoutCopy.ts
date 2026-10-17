import { getHomegroundLegalCopy, type HomegroundLegalCopy, type HomegroundLegalPageId } from './homegroundLegalI18n';
import type { HomegroundPrivacyCopy } from './homegroundPrivacyI18n';
import { getGermanLegalCopy } from './germanLegalCopy';
import { homegroundBusiness as business } from './homegroundBusiness';
import { travelAgencyCertificateHolder as certificates } from './homegroundTravelAgencyCredentials';

/** Localized content for the original legal components, with their structure intact. */
export function getGermanLegalLayoutCopy(pageId: HomegroundLegalPageId): HomegroundLegalCopy {
  const source = getHomegroundLegalCopy(pageId, 'en');
  const base: HomegroundLegalCopy = {
    ...source, htmlLang: 'de', pagePath: `/de/${pageId}/`, homePath: '/de/', languageShort: 'DE',
    skipLink: 'Zum Inhalt springen',
    navigation: { homeLabel: 'Homeground China Startseite', languageLabel: 'Seitensprache', pageLabel: 'Rechtliche Hinweise', homeCta: 'Meine Reise besprechen' },
    relatedLabel: 'Informationen zum Unternehmen und unseren Leistungen',
    related: { business: 'Unternehmensangaben', terms: 'Nutzungs- und Leistungsbedingungen', refund: 'Erstattung und Übergabe', privacy: 'Datenschutz', contact: 'Kontakt aufnehmen' },
  };
  if (pageId !== 'business-information') {
    const copy = getGermanLegalCopy(pageId);
    return { ...base, metadata: copy.metadata, navigation: { ...base.navigation, pageLabel: copy.hero.eyebrow }, hero: { ...copy.hero, reviewedLabel: 'Letzte Überarbeitung des Ausgangstexts' }, callout: copy.callout, sections: copy.sections };
  }
  return {
    ...base,
    metadata: { title: 'Unternehmensangaben und Lizenz von Homeground China', description: 'Betreibergesellschaft, Registrierung und Reiseveranstalterlizenz von Homeground China, Dokumentkopien und Bestätigung vor der Zahlung.' },
    hero: { eyebrow: 'Unternehmensangaben', title: 'Wer steht hinter Homeground?', intro: 'Homeground ist eine China-Reisemarke eines rechtmäßig in Peking, Festlandchina, registrierten Reiseunternehmens. Die Lizenz umfasst Inlandstourismus und Incoming-Tourismus für Reisende aus dem Ausland.', reviewedLabel: 'Letzte Überarbeitung des Ausgangstexts', reviewedValue: '15. September 2026' },
    callout: { label: 'Von Anfang an klar', title: 'Ein überprüfbares Unternehmen und vor der Zahlung festgelegte Leistungen.', body: 'Stellen Sie uns Ihre Reisepläne vor. Wir klären Ihre Bedürfnisse und das weitere Vorgehen schriftlich. Für jede angenommene Leistung werden Inhalt, Preis, Umfang, Frist und Zahlungsmodalitäten vor der Zahlung genannt.' },
    sections: [
      { id: 'registered-details', title: 'Registrierungsangaben', facts: [
        { label: 'Eingetragener Name', value: business.registeredName },
        { label: 'Einheitlicher Sozialkreditcode', value: business.unifiedSocialCreditCode },
        { label: 'Gesetzlicher Vertreter', value: business.legalRepresentative },
        { label: 'Eingetragene Anschrift', value: business.registeredAddress },
        { label: 'Registrierungsbehörde', value: business.registrationAuthority },
        { label: 'Gründungsdatum', value: business.registrationDate },
        { label: 'Offizielles Register', value: 'Nationales chinesisches Unternehmensinformationssystem', detail: `Suchen Sie auf dieser chinesischsprachigen Website nach dem Code ${business.unifiedSocialCreditCode}.`, href: business.registryUrl, external: true },
      ] },
      { id: 'travel-agency-credentials', title: 'Lizenz und Unternehmensdokumente', paragraphs: ['Das Unternehmen hinter Homeground besitzt die folgenden Dokumente für Inlandstourismus und Incoming-Tourismus in China.'], facts: [
        { label: 'Betreibergesellschaft', value: business.registeredName, detail: business.englishName },
        { label: 'Einheitlicher Sozialkreditcode', value: business.unifiedSocialCreditCode },
        { label: 'Reiseveranstalter-Lizenznummer', value: business.travelAgencyLicenceNumber },
        { label: 'Genehmigungsreferenz', value: business.travelAgencyPermitDocumentNumber },
        { label: 'Zugelassene Tätigkeiten', value: 'Inlandstourismus in China und Incoming-Tourismus' },
        { label: 'Reiseveranstalterlizenz', value: 'Lizenz ansehen', href: certificates.travelAgencyLicencePath },
        { label: 'Gewerbelizenz', value: 'Gewerbelizenz ansehen', href: certificates.businessLicencePath },
        { label: 'Tourismuslizenz prüfen', value: 'Chinesisches Ministerium für Kultur und Tourismus', detail: 'Suchen Sie auf dieser chinesischsprachigen Website nach dem oben genannten chinesischen Unternehmensnamen.', href: business.travelAgencyRegistryUrl, external: true },
        { label: 'Registrierung prüfen', value: 'Nationales chinesisches Unternehmensinformationssystem', detail: `Suchen Sie auf dieser chinesischsprachigen Website nach dem Code ${business.unifiedSocialCreditCode}.`, href: business.registryUrl, external: true },
      ] },
      { id: 'current-services', title: 'Aktuell angebotene Leistungen', cards: [{ title: 'Reiseplanung und Unterstützung vor Ort', body: 'Teilen Sie Homeground Ihr gesamtes Vorhaben mit. Wir beginnen mit Terminen, Reisenden, Prioritäten und gewünschter Unterstützung und legen anschließend die Leistungen und einen umsetzbaren Vorschlag fest.' }], paragraphs: ['Separat verkaufte kostenpflichtige Routenprüfungen oder Routenerstellungen werden nicht mehr angeboten. Bereits angenommene Leistungen unterliegen weiterhin ihrer ursprünglichen schriftlichen Vereinbarung. Für Privatreisen werden Ablauf, enthaltene Leistungen, Preis und Zahlungsbedingungen vor der Buchung schriftlich bestätigt.'] },
      { id: 'how-it-starts', title: 'Die Schritte Ihrer Anfrage', numbered: ['Stellen Sie Ihre Reisepläne kostenlos vor.', 'Homeground klärt Ihre Bedürfnisse und die vom Team angebotenen Leistungen.', 'Vor der Zahlung erhalten Sie eine schriftliche Bestätigung mit Betreiber, Leistung, Preis und Währung, enthaltenen Leistungen, benötigten Angaben, Übergabetermin und geltenden Bedingungen.', 'Zahlungsanweisungen werden separat gesendet.', 'Die vereinbarten Leistungen beginnen nach Zahlungsbestätigung und Eingang aller erforderlichen Angaben.'] },
      { id: 'payment-records', title: 'Zahlung und Kontaktdaten', paragraphs: ['Senden Sie keine Kartendaten, Bankzugangsdaten oder Zahlungs-QR-Codes über das Websiteformular. Prüfen Sie vor der Zahlung, ob der Empfänger der schriftlichen Bestätigung entspricht. Möglichkeiten für Rechnung oder Beleg werden vor der Zahlung geklärt.'], facts: [{ label: 'Fragen zu Leistungen oder Ihren Daten', value: business.serviceEmail, href: `mailto:${business.serviceEmail}` }, { label: 'Eingetragene Anschrift', value: business.registeredAddress }] },
    ],
  };
}

/** Map the already reviewed full German notice onto the original privacy layout. */
export function getGermanPrivacyLayoutCopy(): HomegroundPrivacyCopy {
  const copy = getGermanLegalCopy('privacy');
  function section(id: string) {
    const item = copy.sections.find(s => s.id === id);
    if (!item) throw new Error(`Missing German privacy section: ${id}`);
    return item;
  }
  function rows(id: string, eyebrow: string) {
    const item = section(id);
    return { eyebrow, title: item.title, intro: item.paragraphs?.join(' ') ?? '', rows: (item.facts ?? []).map(f => ({ label: f.label, value: f.value, detail: f.detail ?? '' })) };
  }
  const flow = section('current-flow'), collection = section('collection'), choices = section('choices'), contact = section('contact');
  return {
    htmlLang: 'de', pagePath: '/de/privacy/', homePath: '/de/', languageShort: 'DE', metadata: copy.metadata, skipLink: 'Zu den Datenschutzhinweisen springen',
    navigation: { homeLabel: 'Homeground China Startseite', languageLabel: 'Sprache der Hinweise', privacyLabel: 'Datenschutz', homeCta: 'Meine Reise besprechen' },
    hero: { ...copy.hero, reviewedLabel: 'Letzte Überarbeitung des Ausgangstexts' },
    status: { eyebrow: copy.callout!.label, title: copy.callout!.title, body: copy.callout!.body, blockersTitle: 'Die wichtigsten Punkte', blockers: copy.callout!.bullets ?? [] },
    currentFlow: { title: flow.title, paragraphs: flow.paragraphs ?? [] },
    collection: { eyebrow: 'Erfasste Angaben', title: collection.title, intro: collection.paragraphs?.join(' ') ?? '', items: (collection.facts ?? []).map(f => ({ name: f.label, stage: f.value, purpose: f.detail ?? '' })) },
    reservation: rows('attraction-reservations', 'Angenommene Reservierungen'), providers: rows('providers', 'Dienstleister'), configuration: rows('configuration', 'Speicherung und Zugriff'),
    choices: { eyebrow: 'Ihre Auswahl', title: choices.title, paragraphs: choices.paragraphs ?? [], items: choices.bullets ?? [] },
    contact: { eyebrow: 'Ihre personenbezogenen Daten', title: contact.title, body: contact.paragraphs?.join(' ') ?? '', emailLabel: 'Datenschutz-E-Mail', emailPlaceholder: business.serviceEmail, addressLabel: 'Eingetragene Anschrift', addressPlaceholder: business.registeredAddress },
    footer: section('scope').paragraphs?.join(' ') ?? '',
  };
}
