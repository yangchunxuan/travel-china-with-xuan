import type { FullTripSupportCopy } from './fullTripSupportI18n';
import { editionReplyPromise } from './editionReplyPromise.ts';
export const germanFullTripSupportCopy: FullTripSupportCopy = {
  metadata: { title: 'China-Reise planen lassen: Reiseorganisation und Betreuung vor Ort', description: 'Planen Sie Ihre China-Reise mit Homeground. Erstberatung kostenlos; Leistungen, Gesamtpreis und Zahlungsempfänger werden vor der Zahlung schriftlich bestätigt.' },
  breadcrumb: 'Seitennavigation', home: 'Startseite', services: 'Alle Leistungen', name: 'Organisation Ihrer gesamten Reise', eyebrow: 'Ein Angebot für Ihre Reise',
  h1: 'Ihre China-Reise, von Anfang bis Ende.', h1Lines: ['Ihre China-Reise,', 'von Anfang bis Ende.'], lede: 'Sie müssen keine fertige Rundreise auswählen: Wir planen die Reise passend zu Ihrem Budget.',
  brief: {
    title: 'Ihre Reisepläne', clauses: { party: 'Eine Reise für {travellers},', length: 'für {days} Tage in China,', lengthOne: 'für {days} Tag in China,', budget: 'mit einem Budget von {amount} {currency} {basis},', month: 'mit Reisebeginn im {month},', cities: 'Reiseziele: {cities}', note: 'Außerdem: {note}' }, monthIsNumber: false,
    travellersLabel: 'Anzahl der Reisenden', daysLabel: 'Anzahl der Tage in China', amountLabel: 'Budgetbetrag', monthLabel: 'Geplanter Reisemonat', citiesLabel: 'Städte, die Sie entdecken möchten', noteLabel: 'Weitere Angaben', monthHint: 'Monat', citiesHint: 'Peking, Xi’an, Shanghai … oder noch offen', noteHint: 'Mitreisende, Interessen, Ernährungsbedürfnisse', currencyLabel: 'Währung', basisLabel: 'Budget pro Person oder für die gesamte Gruppe', basis: { person: 'pro Person', group: 'für die gesamte Gruppe' }, note: 'Lassen Sie offen, was noch nicht feststeht. Das Budget umfasst keine internationalen Flüge.',
  },
  handlesTitle: 'Wir organisieren die gesamte Reise',
  needs: {
    route: { title: 'Die Route', body: 'Reihenfolge der Städte, Übernachtungen an jeder Station und ein realistisches Tempo' },
    hotels: { title: 'Die Unterkünfte', body: 'Hotels, die passend zu Ihrer Route ausgewählt und gebucht werden' },
    tickets: { title: 'Besichtigungsreservierungen', body: 'Ihre Wunschbesichtigungen im Plan behalten: Wir übernehmen die Buchungen auf Ihren Passnamen' },
    guides: { title: 'Private englischsprachige Reiseleitung', body: 'An den Tagen, an denen Sie Begleitung benötigen. Deutschsprachige Reiseleitung ist nicht automatisch enthalten; Verfügbarkeit und Preis müssten separat bestätigt werden.' },
    transfers: { title: 'Wagen und Transfers', body: 'Ankunfts- und Abreisetransfers an Flughäfen und Bahnhöfen sowie Tage mit Privatfahrzeug' },
    ground: { title: 'Koordination vor Ort', body: 'Abstimmung mit den in Ihrem Angebot vorgesehenen Anbietern während Ihres Aufenthalts in China' },
  },
  stepsTitle: 'So funktioniert die Planung', steps: [
    { title: 'Teilen Sie uns Ihre Pläne mit', body: 'Reisedaten, Mitreisende, gewünschte Ziele und benötigte Unterstützung. Die Anfrage ist kostenlos und löst keine Buchung aus.' },
    { title: 'Wir besprechen die Reise gemeinsam', body: 'Ein Reiseplaner prüft mit Ihnen Route, Bedürfnisse, Prioritäten und gewünschte Begleitung und schlägt konkrete nächste Schritte vor.' },
    { title: 'Sie erhalten einen Reisevorschlag und ein Angebot', body: 'Vor der Zahlung wird alles schriftlich festgehalten. Die Einzelheiten finden Sie unten.' },
    { title: 'Buchungen beginnen nach der Zahlung', body: 'Sobald Sie das Angebot angenommen und bezahlt haben, beginnen wir mit Buchungen und Organisation.' },
  ],
  writtenTitle: 'Vor der Zahlung steht alles schriftlich fest', writtenTitleLines: ['Vor der Zahlung', 'steht alles schriftlich fest'], writtenBody: 'Jedes Angebot bestätigt diese Punkte schriftlich vor jeder Zahlung.',
  written: ['Enthaltene Leistungen', 'Verantwortlicher Anbieter jeder Leistung', 'Das Unternehmen, mit dem Sie den Vertrag schließen', 'Was übernommen wird und was ausgeschlossen ist', 'Gesamtpreis und Währung', 'Zahlungsempfänger und Zahlungsweise', 'Stornierungs- und Erstattungsbedingungen'],
  noOnlinePayment: 'Auf dieser Website können Sie nicht online bezahlen. Senden Sie keine Karten- oder Bankkontodaten in Nachrichten oder Formularen.', otherTitle: 'Benötigen Sie nur einzelne Leistungen?',
  compare: {
    tours: { title: 'Unsere Privatreisen', body: 'Bereits geplante Routen mit veröffentlichten Einstiegspreisen und einem detaillierten Tagesprogramm.', action: 'Privatreisen ansehen' },
    single: { title: 'Einzelne Leistungen', body: 'Nur einige Tickets nötig? Senden Sie Ihre Termine, sobald sie feststehen, damit wir vor der Ticketfreigabe bereit sind. Reiseleitung und Wagen mit Fahrer lassen sich ebenfalls einzeln buchen.', tickets: 'Besichtigungen reservieren', guides: 'Private englischsprachige Reiseleitung' },
  },
  faqTitle: 'Fragen zur Reiseorganisation', faq: [
    { question: 'Wie wird der Preis berechnet?', answer: 'Wir erstellen ein Angebot für Ihre Reise. Nach Klärung von Route und gewünschter Unterstützung nennt Ihr Reiseplaner im schriftlichen Vorschlag den Gesamtpreis, die Währung und den Zahlungsempfänger. Sie zahlen erst nach Annahme des Angebots.' },
    { question: 'Kostet es etwas, Ihnen meine Reisepläne zu senden?', answer: 'Nein. Ihre Anfrage und die erste Antwort des Reiseplaners sind kostenlos und lösen keine Buchung aus.' },
    { question: 'Können Sie mit einem vorgegebenen Budget planen?', answer: 'Ja. Nennen Sie Budget, Personenzahl und geplante Dauer. Wir prüfen eine Route innerhalb dieses Betrags: Städte, Hotelkategorie, Tage mit Reiseleitung und enthaltene Leistungen. Wenn noch kein Betrag feststeht, lassen Sie das Budget offen; wir schlagen einen realistischen Rahmen vor.' },
    { question: 'Mein Budget liegt unter Ihren veröffentlichten Reisepreisen. Kann ich trotzdem anfragen?', answer: 'Ja. Der Preis jeder Reise gehört zu einer bestimmten Kombination aus Hotels, Privatfahrzeug und Reiseleitung. Für Ihr Budget können wir eine andere Hotelkategorie, weniger geführte Tage oder eine andere Städtekombination prüfen. Nennen Sie den Betrag, und wir erklären Ihnen, was sich damit organisieren lässt.' },
    { question: 'Kann ich direkt auf der Website bezahlen?', answer: 'Nein. Die Website bietet keine Online-Zahlung an. Geben Sie keine Karten- oder Bankkontodaten in Formularen oder Nachrichten an.' },
    { question: 'Kann ich nur einzelne Abschnitte organisieren lassen?', answer: 'Ja. Wählen Sie die benötigten Leistungen. Der Vorschlag nennt, was wir übernehmen und was außerhalb unseres Auftrags bleibt. Für Tickets allein senden Sie Ihre Termine früh über unseren Reservierungsservice. Englischsprachige Reiseleitung können Sie auch tageweise buchen.' },
    { question: 'Wer ist für die Leistungen verantwortlich?', answer: 'Homeground wird von {operator} betrieben. Der Vorschlag nennt für jede Leistung den verantwortlichen Anbieter und das Unternehmen, mit dem Sie den Vertrag schließen.' },
    { question: 'Ist deutschsprachige Reiseleitung enthalten?', answer: 'Nein, nicht automatisch. Die hier beschriebene Reiseleitung ist englischsprachig. Falls Sie Deutsch wünschen, nennen Sie dies in Ihrer Anfrage. Verfügbarkeit und ein gesonderter Preis müssten vor der Zahlung schriftlich bestätigt werden.' },
  ],
  enquiry: { whatsapp: 'Per WhatsApp senden', free: `Kostenlose Anfrage, keine Buchung. ${editionReplyPromise.de}`, email: 'Lieber per E-Mail schreiben', privacy: 'Datenschutz', message: { opening: 'Guten Tag, ich möchte meine China-Reise von Homeground organisieren lassen', openingJoin: ': ', sentenceEnd: '.', party: '{count} Reisende', partyOne: '{count} reisende Person', length: 'Dauer in Tagen: {days}', month: 'Geplanter Reisebeginn: {month}', cities: 'Gewünschte Städte: {cities}', noteLabel: 'Weitere Angaben', budgetPart: 'Budget: {budget} {basis}', budgetOpen: 'Budget noch offen', partSeparator: ', ', flights: 'Das Budget bezieht sich auf den Aufenthalt in China, ohne internationale Flüge.', subject: 'Anfrage zur Organisation einer China-Reise', labelSeparator: ': ' } },
};
