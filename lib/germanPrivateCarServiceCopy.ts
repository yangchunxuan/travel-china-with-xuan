import type { PrivateCarServiceCopy } from './privateCarServicesI18n';
import { germanGuideLanguageNote } from './germanSite.ts';

export const germanPrivateCarServiceCopy: PrivateCarServiceCopy = {
  metadata: { title: 'Privatwagen mit Fahrer in China: Transfers und individuelle Angebote', description: 'Flughafen- und Bahnhofstransfers, Besichtigungen und Fahrten zwischen Städten in China. Homeground prüft Ihre Route und bestätigt Leistungen und Preis schriftlich.' },
  name: 'Privatwagen mit Fahrer in China', h1: 'Ein Wagen mit Fahrer für Ihre geplante Route.', eyebrow: 'Privater Transport · China',
  lede: 'Eine Abholung am Flughafen, ein Wagen für Besichtigungen oder eine Fahrt zwischen zwei Städten? Teilen Sie uns Ziel, Datum und Personenzahl mit. Wir prüfen die Route und erstellen ein Angebot für Ihre Reise.',
  home: 'Startseite', services: 'Alle Leistungen', breadcrumb: 'Seitennavigation', ask: 'Transportangebot anfragen',
  facts: ['Ein Transfer oder ein Teil Ihrer Reise', 'Angebot passend zur Route', 'Leistungen vor der Zahlung schriftlich bestätigt'],
  kindsTitle: 'Welche Fahrt möchten Sie organisieren?', kindsBody: 'Wählen Sie den Teil Ihrer Reise, bei dem Sie Unterstützung benötigen. Datum, Abholort, Personenzahl und Gepäck bestimmen die Planung.',
  kinds: {
    transfer: { title: 'Flughafen- oder Bahnhofstransfer', body: 'Fragen Sie einen Transfer bei Ankunft oder Abreise an. Nennen Sie Flughafen oder Bahnhof, Flug- oder Zugnummer und den anderen Endpunkt der Fahrt.' },
    sightseeing: { title: 'Privatwagen für Besichtigungen', body: 'Behalten Sie Ihr gebuchtes Hotel und fragen Sie einen Wagen mit Fahrer für Ihre gewünschten Besichtigungen an. Nennen Sie Route, Abholort und gewünschte Zeiten.' },
    intercity: { title: 'Fahrt zwischen Städten', body: 'Teilen Sie uns Städte, Zwischenstopps und geplante Zeiten mit. Wir prüfen Machbarkeit und Fahrzeiten, bevor wir ein Angebot erstellen. Eine Anfrage bestätigt noch keine Verfügbarkeit.' },
  },
  quoteTitle: 'Zuerst die Route klären, dann den Preis.', quoteBody: 'Der Transport wird passend zu Ihrer Route kalkuliert. Sie können uns nur einen Abschnitt überlassen und den übrigen Reiseplan beibehalten.',
  written: ['Datum, Route, Abholorte und Zeiten', 'Reisende, Gepäck und vorgesehenes Fahrzeug', 'Verantwortlicher Anbieter, vorgesehene Leistungen und enthaltene Kosten', 'Gesamtpreis, Zahlungsweise und geltende Bedingungen'],
  quoteNote: 'Diese Punkte werden vor jeder Zahlung schriftlich bestätigt. Eine Anfrage beginnt das Gespräch und bestätigt keine Buchung.',
  relatedTitle: 'Benötigen Sie mehr als den Transport?', guideTitle: 'Reiseleitung separat anfragen',
  guideBody: `Ein Wagen mit Fahrer umfasst keine Reiseleitung. Englischsprachige Begleitung wird separat angefragt und angeboten. ${germanGuideLanguageNote}`,
  guideLink: 'Private englischsprachige Reiseleitung', fullTripTitle: 'Die gesamte Reise planen', fullTripBody: 'Wenn Sie auch Unterstützung bei Hotels, Reiseleitung und mehreren aufeinander abgestimmten Stationen wünschen, erfahren Sie mehr über unsere Reiseplanung und Betreuung vor Ort.', fullTripLink: 'Reiseplanung und Betreuung vor Ort',
  companyLink: 'Unternehmen und Reiseveranstalterlizenz', termsLink: 'Leistungsbedingungen', faqTitle: 'Vor Ihrer Anfrage.',
  faq: [
    { question: 'Kann ich nur einen Flughafen- oder Bahnhofstransfer anfragen?', answer: 'Ja. Sie können nur den benötigten Transport anfragen und Ihre Hotels sowie sonstigen Buchungen beibehalten. Nennen Sie beide Endpunkte, das Datum und Ihre Flug- oder Zugdaten.' },
    { question: 'Gibt es einen festen Tagespreis?', answer: 'Das Angebot wird anhand Ihrer Route erstellt. Dafür prüfen wir Datum, Strecke, Zeiten, Personenzahl und Gepäck. Vor der Zahlung bestätigt das schriftliche Angebot die Leistungen und den Gesamtpreis.' },
    { question: 'Kann ich eine Fahrt zwischen mehreren Städten anfragen?', answer: 'Ja. Nennen Sie Städte, mögliche Stopps und gewünschte Zeiten. Wir prüfen die Machbarkeit, bevor wir den Transport kalkulieren. Eine Anfrage bestätigt keine Verfügbarkeit und reserviert kein Fahrzeug.' },
    { question: 'Übernimmt der Fahrer auch die Führungen auf Englisch?', answer: `Reiseleitung wird separat vom Wagen mit Fahrer angeboten. Geben Sie an, ob Sie eine Reiseleitung oder eine bestimmte Kommunikationssprache benötigen, damit die Vereinbarungen vor der Buchung bestätigt werden können. ${germanGuideLanguageNote}` },
    { question: 'Wie wird das Fahrzeug ausgewählt?', answer: 'Nennen Sie die Personenzahl und beschreiben Sie Ihr Gepäck. Wir prüfen das passende Fahrzeug für die Strecke und bestätigen die vorgeschlagene Organisation im schriftlichen Angebot.' },
    { question: 'Wird der Wagen durch das Öffnen der WhatsApp-Nachricht oder E-Mail reserviert?', answer: 'Nein. Diese Felder bereiten eine Nachricht vor, die Sie selbst in WhatsApp oder Ihrer E-Mail-App senden. Das Vorbereiten oder Öffnen des Entwurfs sendet keine Anfrage an diese Website und bestätigt keine Buchung.' },
  ],
  enquiry: {
    title: 'Erzählen Sie uns von Ihrer Route.', body: 'Tragen Sie die wichtigsten Angaben ein und öffnen Sie die Nachricht in WhatsApp oder Ihrer E-Mail-App. Noch offene Einzelheiten können wir anschließend gemeinsam klären.',
    requiredNotice: 'Transportart, Stadt oder Städte, Personenzahl und Datum sind erforderlich. Sie können „Datum noch offen“ wählen. Die übrigen Felder sind optional.',
    optional: 'Optional', kind: 'Gewünschter Transport', chooseKind: 'Leistung auswählen', cities: 'Stadt oder Städte', citiesPlaceholder: 'Zum Beispiel: Peking, Shanghai', date: 'Beginn der Leistung', undecided: 'Datum noch offen', travellers: 'Anzahl der Reisenden', luggage: 'Gepäck', luggagePlaceholder: 'Zum Beispiel: 2 Koffer und 2 kleine Taschen', pickup: 'Abholort', pickupPlaceholder: 'Name oder Adresse von Flughafen, Bahnhof oder Hotel', pickupTime: 'Abholzeit oder Flug- / Zugdaten', timePlaceholder: 'Zum Beispiel: Flugankunft um 15:30 Uhr', route: 'Route und Zwischenstopps', routePlaceholder: 'Zielort und gewünschte Stopps unterwegs', note: 'Weitere Wünsche', notePlaceholder: 'Zum Beispiel: Reiseleitung, Kommunikationssprache oder zeitliche Einschränkungen', whatsapp: 'WhatsApp-Nachricht vorbereiten', email: 'E-Mail vorbereiten', privacy: 'Datenschutz',
    draftNote: 'Es wird nichts gesendet, bis Sie die Nachricht in WhatsApp oder Ihrer E-Mail-App abschicken. Dieses Formular erstellt nur einen Entwurf; es speichert keine Anfrage und bestätigt keine Buchung.',
    message: { opening: 'Guten Tag Homeground, ich möchte ein Angebot für einen Privatwagen mit Fahrer.', subject: 'Anfrage: Privatwagen mit Fahrer', kind: 'Gewünschter Transport', cities: 'Stadt oder Städte', date: 'Beginn der Leistung', travellers: 'Reisende', luggage: 'Gepäck', pickup: 'Abholort', pickupTime: 'Uhrzeit / Flug- oder Zugdaten', route: 'Route und Stopps', note: 'Weitere Wünsche', none: 'Noch zu bestätigen', datesOpen: 'Datum noch offen', confirmation: 'Bitte prüfen Sie die Machbarkeit der Route und bestätigen Sie vor der Zahlung schriftlich den verantwortlichen Anbieter, das vorgesehene Fahrzeug, die Leistungen, enthaltene Kosten, den Gesamtpreis und die Bedingungen. Reiseleitung ist vom Transport getrennt. Falls ich deutschsprachige Reiseleitung wünsche, bestätigen Sie bitte zuerst Verfügbarkeit und einen gesonderten Preis; die englischsprachigen Tarife gelten dafür nicht.', separator: ': ' },
  },
};
