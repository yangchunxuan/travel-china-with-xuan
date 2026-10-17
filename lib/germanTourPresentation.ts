import type { LocalizedPrivateTourProduct } from './privateTourProducts';
import { germanGuideLanguageNote, germanTourContactNote, germanPublishedPriceNote, germanEmailHref, germanWhatsAppHref } from './germanSite';

export function germanTourPageCopy(product: LocalizedPrivateTourProduct) {
  const groups = [...new Set(product.packages.flatMap(p => p.rows.map(r => r.travelers)))].sort((a,b) => a-b);
  const format = product.tourFormat === 'small-group' ? 'KLEINGRUPPENREISE' : 'PRIVATREISE';
  const fixed = product.slug === 'zhangjiajie-forest-4-day-private-tour';
  return {
    htmlLang: 'de', skipLink: 'Zum Reiseverlauf', breadcrumbLabel: 'Seitennavigation', homeLabel: 'Startseite', productLabel: 'China-Rundreisen',
    heroMeta: `${product.days} TAGE / ${product.nights} NÄCHTE · ${format} · OHNE VERKAUFSSTOPPS`, heroPromise: product.eyebrow,
    facts: product.facts?.length ? product.facts : [
      { label: 'Dauer', value: `${product.days} Tage · ${product.nights} Nächte` },
      { label: 'Reiseleitung', value: 'Gemäß gewählter Variante · Deutsch nicht im Preis enthalten' },
      { label: 'Unterkunft', value: `${product.nights} Nächte · Hotels werden schriftlich bestätigt` },
      { label: 'Preis', value: groups.length ? `Preise für ${groups.join(', ')} Reisende` : 'Angebot für Ihre Reisedaten' },
    ],
    overviewEyebrow: 'Die Reise im Überblick', overviewTitle: product.eyebrow, overviewBody: product.summary,
    routeEyebrow: 'Tag für Tag', routeTitle: 'Ihr Reiseverlauf.',
    routeBody: 'Ankunft, Besichtigungen und Abreise sind unten im Einzelnen beschrieben. Fahrpläne, personalisierte Reservierungen und Bedingungen vor Ort können Anpassungen erfordern. Wesentliche Änderungen besprechen wir mit Ihnen.',
    serviceEyebrow: 'Die Details', serviceTitle: 'Unterkünfte, Transport und Reiseleitung.',
    serviceBody: `Es gelten die Leistungen und geführten Tage der gewählten Variante. Die Verfügbarkeit zu Ihren Reisedaten prüfen wir vor der Zahlung. ${germanGuideLanguageNote}`,
    hotelTitle: 'Ihre Unterkünfte', transportTitle: 'Reiseleitung, Fahrten und Besichtigungen',
    scopeEyebrow: 'Vor der Buchung', scopeTitle: 'Was Sie selbst bezahlen und was wir bestätigen.', exclusionsTitle: 'Nicht enthalten', confirmedTitle: 'Schriftlich bestätigt',
    confirmations: ['Ihre Reisedaten sowie Ankunft und Abreise', 'Unterkünfte, Zimmeraufteilung und Verkehrsmittel', 'Verfügbare Leistungen, Sprache der Reiseleitung und Gesamtpreis vor der Zahlung'],
    finalEyebrow: 'Der nächste Schritt', finalTitle: fixed ? 'Passt diese Route? Wir prüfen Ihre Termine.' : 'Sprechen wir über Ihre Reise.',
    finalBody: fixed ? 'Nennen Sie uns Ihre Reisedaten, die Anzahl der Reisenden und Ihre Unterkunftswünsche. Wir prüfen die Verfügbarkeit dieser Variante und erstellen ein schriftliches Angebot.' : 'Teilen Sie uns Ihre Reisedaten, die Anzahl der Reisenden und Ihre Wünsche mit. Wir prüfen die Möglichkeiten und senden Ihnen ein detailliertes Angebot.',
    contact: 'Angebot anfragen', email: 'E-Mail schreiben',
  };
}
export const germanPriceCopy = {
  choosePackage: 'Reisevariante wählen', chooseGroup: 'Anzahl der Reisenden', publishedPrice: 'Preis der gewählten Variante', perPerson: 'pro Person', groupUnit: ' Reisende', privateTour: 'Privatreise', flightsSeparate: 'Flüge nicht enthalten', internationalFlightsSeparate: 'Internationale Flüge nicht enthalten', priceBasis: 'Preis pro Person', twinShare: 'bei Belegung mit zwei Personen pro Zimmer', smallGroup: 'Kleingruppe', checkDates: 'Reisetermine prüfen', otherGroups: 'Andere Gruppengröße?', otherGroupsBody: 'Wir prüfen die benötigten Zimmer und die Fahrzeugkapazität einschließlich Gepäck, bevor wir Ihnen ein Angebot senden.', requestQuote: 'Angebot anfragen', quoteOnlyTitle: 'Ein Angebot für Ihre Termine und Ihre Gruppe', quoteOnlyBody: 'Für diese Reise erstellen wir ein individuelles Angebot. Nennen Sie uns Ihre Reisedaten, die Anzahl der Reisenden und Ihre Zimmerwünsche. Sie erhalten vor jeder Zahlung einen schriftlichen Vorschlag.', emailLabel: 'E-Mail schreiben', whatsappLabel: 'Auf WhatsApp schreiben', draftNote: germanTourContactNote, currencyNote: `${germanPublishedPriceNote} ${germanGuideLanguageNote}`,
} as const;
export const germanPhotoCopy = { nextPhoto: 'Nächstes Foto', routeLabel: 'Wählen Sie einen Reisetag, um die Fotos anzusehen', routeScenes: 'Im Bild', dayUnit: '', dayPrefix: 'Tag ', controls: 'de' } as const;
export const germanPhotoCreditCopy = { title: 'Bildnachweise', intro: 'Die Quellen externer Fotos sind unten aufgeführt. Änderungen beschränken sich auf Zuschnitt, Größenanpassung und Dateiformat. Bearbeitete Fotos unter CC BY-SA behalten die angegebene Lizenz.', by: 'Foto:', localNote: 'Die übrigen Bilder stammen aus der Homeground-Bildsammlung und wurden vom Websiteinhaber zur Nutzung auf dieser Website freigegeben.' };
export const germanCommercialCopy = { productLabel: 'Weiter planen', productTitle: 'Hilfreich für Ihre Entscheidung.', productBody: 'Hier finden Sie Hinweise zur Vorbereitung, die angebotenen Reiseservices und weitere veröffentlichte Routen.', destinations: 'Reiseziele', guides: 'Reisevorbereitung', related: 'Rundreisen vergleichen' };
export function germanTourPlanningContext(_slug: string) {
  return { destinations: [] as {id:string;href:string;label:string}[], guides: [{id:'de-guides',href:'/de/guides/',label:'Wichtige Fragen vor der Buchung'},{id:'de-services',href:'/de/services/',label:'Unterstützung für Ihre Chinareise wählen'}], relatedProducts: [{id:'de-tour-hub',href:'/de/tours/',label:'Alle Rundreisen und Preise'}] };
}
export function germanTourContactHrefs(product: LocalizedPrivateTourProduct) {
  const whatsapp: Record<string,string> = {}, email: Record<string,string> = {};
  const add = (key: string, option = '', travelers?: number) => {
    const message = ['Hallo, ich interessiere mich für diese Reise.',`Reise: ${product.title}`,option ? `Variante: ${option}` : '',`Anzahl der Reisenden: ${travelers ?? ''}`,'Ungefähre Reisedaten:','Gewünschte Sprache der Reiseleitung (Verfügbarkeit und Kosten bitte bestätigen):',`Seite: https://homegroundchina.com${product.path}`].filter(Boolean).join('\n');
    whatsapp[key] = germanWhatsAppHref(message); email[key] = germanEmailHref(`Reiseanfrage: ${product.title}`, message);
  };
  add('other');
  product.packages.forEach(p => p.rows.forEach(r => add(`${p.id}:${r.travelers}`,p.label,r.travelers)));
  return { whatsapp, email };
}
