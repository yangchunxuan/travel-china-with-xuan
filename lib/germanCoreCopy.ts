import { homegroundBusiness as business } from './homegroundBusiness.ts';
import { germanGuideLanguageNote } from './germanSite.ts';
export type GermanCoreSection = { title: string; paragraphs: readonly string[]; links?: readonly {href:string;label:string}[] };
export const germanCoreCopy = {
  services: {
    title: 'China Reise nach Maß: unsere Leistungen',
    description: 'Rundreisen, Reiseleitung, Transfers, Unterkünfte und Reservierungen: Wählen Sie die Leistungen für Ihre China-Reise. Deutschsprachige Reiseleitung nur nach Verfügbarkeitsprüfung und gesondertem Angebot.',
    eyebrow: 'Unterstützung passend zu Ihrer Reise',
    intro: 'Sie müssen nicht alles abgeben. Wir beginnen mit dem, was Sie bereits organisiert haben, und schauen gemeinsam, wo ein Team vor Ort Ihre Reise erleichtern kann.',
    sections: [
      { title: 'Ein genauer Reiseplan, ein klares Budget', paragraphs: ['Jede Rundreise zeigt die Tagesetappen, vorgesehenen Unterkünfte, enthaltenen Leistungen und zusätzlichen Kosten. Wir kennzeichnen, ob Sie privat oder zu einem festen Kleingruppentermin reisen. Manche Varianten enthalten keine Reiseleitung vor Ort; ihre Bedingungen sind gesondert aufgeführt.', 'Wählen Sie zunächst eine Route, die Sie anspricht. Danach prüfen wir Termine, Zimmer, Reisetempo und Verfügbarkeit, bevor Sie ein Angebot erhalten.'], links: [{href:'/de/tours/',label:'Rundreisen und Preise vergleichen'}] },
      { title: 'Reiseleitung an den Tagen, an denen sie Ihnen hilft', paragraphs: ['Private Reiseleitung kann an einem vollen Tag, an einer großen historischen Stätte oder auf einer allein schwer zu organisierenden Etappe hilfreich sein. Sie begleitet Sie nicht zwangsläufig während der ganzen Reise: Jede Variante nennt die Zahl der geführten Tage.', germanGuideLanguageNote, 'Die Verfügbarkeit wird für jede Stadt geprüft. Ihre Reiseleitung kann deshalb zwischen den Stationen wechseln; das Angebot nennt die bestätigten Sprachen und begleiteten Tage.'], links: [{href:'/de/services/private-english-speaking-guides/',label:'Preise und Bedingungen für englischsprachige Reiseleitung'}] },
      { title: 'Unterkünfte, Transfers und Reservierungen', paragraphs: ['Wir wählen Unterkünfte passend zu den Besichtigungen und Ihren Ankunftszeiten, um unnötige Wege zu vermeiden. Hotels, Zimmerkategorien, Fahrzeug und Transfers werden für die gewählte Route schriftlich bestätigt.', 'Wenn Sie nur eine Eintrittskarte benötigen, buchen wir über offizielle Kanäle auf den Namen des Reisenden. Bitte lesen Sie die Bedingungen dieses Services: Eine Anfrage garantiert noch kein Ticket.'], links: [{href:'/de/services/china-attraction-reservations/',label:'Reservierung von Sehenswürdigkeiten: Ablauf und Gebühren'}] },
      { title: 'Ihre gesamte Reise koordinieren', paragraphs: ['Wenn Sie Flüge oder Hotels gebucht haben oder bereits eine erste Route im Kopf haben, teilen Sie uns diese mit. Gemeinsam klären wir, was feststeht, was noch geprüft werden muss und was unser Team übernehmen kann.', 'Kostenpflichtige Leistungen, Zuständigkeiten und Preis werden vor Beginn vereinbart. Beschreiben Sie uns Ihr Vorhaben; wir helfen Ihnen, passende Leistungen auszuwählen.'], links: [{href:'/de/services/full-trip-support/',label:'Koordination vor Ort im Detail'},{href:'/de/contact/',label:'Reisevorhaben beschreiben'}] },
    ],
  },
  studio: {
    title: 'Homeground China: ein Team vor Ort für Ihre Reise',
    description: 'So plant Homeground China Ihre Reise: Ihre Wünsche, eine umsetzbare Route, eine feste Ansprechperson und vor der Zahlung vereinbarte Leistungen.',
    eyebrow: 'Lernen Sie uns kennen',
    intro: 'Eine gute Reise beginnt mit Zuhören: Was haben Sie bereits gebucht, was möchten Sie sehen und wie viel Zeit möchten Sie für sich behalten?',
    sections: [
      { title: 'Ihre Wünsche und Ausgangslage als Anfang', paragraphs: ['Ihre Termine, Teilnehmerzahl, Wunschziele, Ihr Tempo, Ihre Gehfähigkeit und bestehende Buchungen bilden unseren Ausgangspunkt. Eine feste Ansprechperson sammelt diese Informationen und entwickelt eine Route, die tatsächliche Fahrzeiten berücksichtigt.', 'Sie erhalten einen konkreten Ablauf mit sinnvoll verbundenen Etappen, erklärten Entscheidungen und klaren Zuständigkeiten. Wir unterscheiden bestätigte Leistungen von Punkten, die noch geprüft werden müssen.'] },
      { title: 'Die Menschen hinter den Nachrichten', paragraphs: ['Homeground stellt sein Team und seine Arbeitsweise auf der Website vor. Evan, Yoyo, Tantan, Kevin und Vivi, ihre Porträts und Aufgaben finden Sie auf der ausführlichen Teamseite.'], links: [{href:'/studio/',label:'Porträts und Erfahrungen des Teams kennenlernen (auf Englisch)'}] },
      { title: 'Was vor der Zahlung vereinbart wird', paragraphs: ['Ein schriftliches Angebot nennt den Reiseumfang, enthaltene Leistungen, Ausschlüsse und den zu zahlenden Betrag. Das Lesen einer Seite oder Absenden eines Formulars bestätigt weder Verfügbarkeit noch Buchung.', germanGuideLanguageNote] },
      { title: 'Überprüfbare Unternehmensangaben', paragraphs: [`Homeground China ist ein Angebot von ${business.englishName} (${business.registeredName}). Die chinesische Reiseveranstalterlizenz lautet ${business.travelAgencyLicenceNumber}.`, 'Unternehmensangaben und veröffentlichte Dokumente sind zugänglich, damit Sie diese vor der Buchung prüfen können.'], links: [{href:'/de/business-information/',label:'Unternehmensangaben ansehen'},{href:'/de/contact/',label:'Mit unserem Team sprechen'}] },
    ],
  },
  'business-information': {
    title: 'Unternehmensangaben und Lizenz von Homeground China',
    description: `Betreiber von Homeground China, Registrierungsnummer ${business.unifiedSocialCreditCode}, Lizenz ${business.travelAgencyLicenceNumber} und Kontaktdaten.`,
    eyebrow: 'Bevor Sie uns Ihre Reise anvertrauen',
    intro: 'Hier finden Sie die Angaben zum Unternehmen hinter Homeground China und die Referenzen für Ihre Prüfung.',
    sections: [
      { title: 'Betreibergesellschaft', paragraphs: [`Eingetragener Name: ${business.registeredName}`, `Englischer Name: ${business.englishName}`, `Einheitlicher Sozialkreditcode: ${business.unifiedSocialCreditCode}`, `Gesetzlicher Vertreter: ${business.legalRepresentative}`, `Registrierungsdatum: ${business.registrationDate}`, `Eingetragene Anschrift: ${business.registeredAddress}`, 'Dies ist die eingetragene Unternehmensanschrift. Bitte vereinbaren Sie vor einem Besuch einen Termin.'] },
      { title: 'Reiseveranstalterlizenz', paragraphs: [`Lizenznummer: ${business.travelAgencyLicenceNumber}`, `Genehmigungsreferenz: ${business.travelAgencyPermitDocumentNumber}`, 'Zugelassene Tätigkeiten: Inlandstourismus in China und Incoming-Tourismus für Reisende aus dem Ausland.', `Ausstellende Behörde: ${business.travelAgencyLicenceAuthority}`], links: [{href:'/business-information/',label:'Dokumente und ausführliche Angaben ansehen (auf Englisch)'},{href:business.registryUrl,label:'Nationales chinesisches Unternehmensregister'},{href:business.travelAgencyRegistryUrl,label:'Plattform des chinesischen Ministeriums für Kultur und Tourismus'}] },
      { title: 'Angebote, Bedingungen und personenbezogene Daten', paragraphs: [`Kontakt: ${business.serviceEmail}`, 'Das schriftliche Angebot nennt die gewählten Leistungen, das vertragschließende Unternehmen, Zahlungsmodalitäten und geltende Bedingungen. Nachfolgend finden Sie Buchungsbedingungen, Stornierung und Erstattung sowie unsere Datenschutzhinweise.'], links: [{href:'/de/terms/',label:'Buchungsbedingungen'},{href:'/de/refund-delivery/',label:'Stornierung und Erstattung'},{href:'/de/privacy/',label:'Datenschutz'}] },
    ],
  },
  guides: {
    title: 'China-Reise planen: Route, Budget und Reiseleitung',
    description: 'So wählen Sie Ihre China Rundreise, verstehen Preise, planen Fahrten und klären die Sprache der Reiseleitung. Hinweise für eine konkrete Angebotsanfrage.',
    eyebrow: 'Orientierung vor der Reise',
    intro: 'Überlegen Sie vor der Routenwahl, was Sie erleben möchten. Entscheidend ist weniger die Anzahl der Städte als die Zeit, die Ihnen an jedem Ort bleibt.',
    sections: [
      { title: 'Wie viele Stationen sind sinnvoll?', paragraphs: ['Beginnen Sie mit Ankunft und Abreise und zählen Sie die tatsächlich verfügbaren Tage vor Ort. Ein Stadtwechsel nimmt einen Teil des Tages ein. Planen Sie diese Zeit zusätzlich zu den Besichtigungen ein.', 'Die veröffentlichten Routen reichen von konzentrierten Aufenthalten in einer Region bis zu langen Reisen durch China. Der Tagesablauf zeigt, wann Züge, Flüge, Besichtigungen und freie Zeit vorgesehen sind.'], links: [{href:'/de/tours/',label:'Reisedauer und Stationen vergleichen'}] },
      { title: 'Wie liest man einen veröffentlichten Preis?', paragraphs: ['Prüfen Sie zuerst Teilnehmerzahl, Leistungsvariante und Zeitraum. Ein Pro-Person-Preis für sechs Reisende gilt nicht automatisch für ein Paar. Bei einer Kleingruppenreise stehen Fahrzeug und Reiseleitung nicht ausschließlich Ihrer eigenen Reisegesellschaft zur Verfügung.', 'Preise gelten in der angegebenen Währung, je nach Route meist US-Dollar (USD) oder chinesische Yuan (CNY), nicht in Euro. Zimmerdetails, Termine und Leistungen werden vor der Zahlung im schriftlichen Angebot bestätigt.', germanGuideLanguageNote] },
      { title: 'Wo übernachten und wie reisen?', paragraphs: ['Die Lage einer Unterkunft wird zusammen mit der Route gewählt: Nähe zu Sehenswürdigkeiten, Bahnhofsanbindung, Fahrzeiten und Wege zu Fuß. Die angegebene Kategorie ersetzt nicht die Bestätigung von Hotelname und Zimmer.', 'Lesen Sie die enthaltenen Transportleistungen einzeln. Manche großen Rundreisen enthalten Inlandsflüge, andere schließen sie aus. Ein Fahrer bedeutet nicht automatisch, dass an jeder Station auch eine Reiseleitung dabei ist.'] },
      { title: 'Welche Einreiseformalitäten sind zu prüfen?', paragraphs: ['Einreisebedingungen hängen von Reisepass, Reisezweck und Terminen ab. Prüfen Sie diese vor der Buchung bei den zuständigen Konsularbehörden. Eine allgemeine Seite kann Ihren persönlichen Fall nicht bestätigen.', 'Unsere ausführlichen Artikel zu Einreise, Zahlungen und Reservierungen sind weiterhin auf Englisch verfügbar. Beachten Sie das Aktualisierungsdatum und die verlinkten offiziellen Quellen.'], links: [{href:'/guides/china-entry-requirements/',label:'Einreise nach China: Ratgeber und offizielle Quellen (auf Englisch)'},{href:'/guides/',label:'Alle praktischen Ratgeber (auf Englisch)'}] },
      { title: 'Was benötigen wir für ein genaues Angebot?', paragraphs: ['Ihre Termine oder einen ungefähren Zeitraum, die Anzahl der Erwachsenen und das Alter der Kinder, Ankunfts- und Abreiseorte, gewünschte Stationen, Zimmerwünsche, Gehfähigkeit und gewünschte Sprache der Reiseleitung.', 'Wenn Sie noch keine Tickets gekauft haben, sagen Sie uns das einfach. Wir können zunächst über die passende Route sprechen. Eine Angebotsanfrage ist keine Buchung.'], links: [{href:'/de/contact/',label:'Mein Reisevorhaben vorstellen'}] },
    ],
  },
  contact: {
    title: 'Kontakt zu Homeground für Ihre China-Reise',
    description: 'Teilen Sie Homeground China Ihre Termine, Gruppengröße und Wünsche mit. Individuelles Angebot und schriftlich bestätigte Leistungen vor der Zahlung.',
    eyebrow: 'Beginnen wir mit Ihrem Reisevorhaben',
    intro: 'Eine Route gefällt Ihnen oder Sie schwanken noch zwischen Regionen? Schreiben Sie uns, was Sie bereits wissen. Die Sprache der weiteren Kommunikation stimmen wir mit Ihnen ab.',
    sections: [
      { title: 'Hilfreiche Angaben', paragraphs: ['Nennen Sie den gewünschten Zeitraum, Teilnehmerzahl, Alter der Kinder, interessante Städte und bestehende Buchungen. Ergänzen Sie Unterkunftswünsche, Ihr Reisetempo und die gewünschte Sprache der Reiseleitung.', germanGuideLanguageNote] },
      { title: 'Wie es danach weitergeht', paragraphs: ['Wir prüfen Ihr Vorhaben und die Verfügbarkeit und halten Route und Leistungen in einem schriftlichen Angebot fest. Endpreis und Buchungsmodalitäten werden vor der Zahlung bestätigt.', 'WhatsApp- und E-Mail-Links bereiten eine Nachricht vor, die Sie in der geöffneten Anwendung noch absenden müssen. Auf einer Reiseseite zeigt das Formular eine Bestätigung, wenn Ihre Anfrage gespeichert wurde. Die automatische Empfangsbestätigung ist derzeit auf Englisch.'] },
    ],
  },
} satisfies Record<string, {title:string;description:string;eyebrow:string;intro:string;sections:readonly GermanCoreSection[]}>;
export type GermanCorePageId = keyof typeof germanCoreCopy;
