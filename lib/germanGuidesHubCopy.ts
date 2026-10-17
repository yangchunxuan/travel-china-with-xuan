import type { GuidesHubCopy } from '../app/(default)/guides/guidesHubI18n';
import type { GuidesHubEdition } from '../components/GuidesHubPage';

export const germanGuidesHubCopy: GuidesHubCopy = {
  path: '/de/guides/',
  metadata: {
    title: 'China-Reise vorbereiten: praktische Tipps | Homeground',
    description: 'Einreise nach China, Zahlungen, Apps, Transport, Hotels und Routen: Finden Sie passende Reisetipps. Übersicht auf Deutsch, ausführliche Artikel auf Englisch.',
    openGraphTitle: 'Praktische Tipps für Ihre China-Reise',
  },
  eyebrow: 'Konkrete Antworten für Ihre Reise', title: 'Ihre China-Reise gut vorbereiten',
  introduction: 'Einreise, Zahlungen, Telefon, Transport, Hotels oder Reisetempo: Beginnen Sie mit Ihrer nächsten Frage. Diese deutsche Übersicht führt zu unseren ausführlichen englischsprachigen Artikeln.',
  languageLabel: 'Sprache der Ratgeber', destinationAction: 'Reiseziel wählen (auf Englisch)',
  catalogEyebrow: 'Ratgeber durchstöbern', catalogTitle: 'Einen ganzen Tag planen, nicht nur einen Besuch.',
  catalogIntroduction: 'Was ist an einem Tag realistisch? Was kostet die Fahrt? Welches Detail verändert den weiteren Verlauf? Unsere Artikel helfen bei konkreten Entscheidungen. Die Artikel und weiteren Seiten der Sammlung sind auf Englisch.',
  guideCount: (count) => `${count} Ratgeber auf Englisch`,
  pagination: {
    label: 'Seiten der englischsprachigen Ratgebersammlung',
    status: (page, pages, count) => `Seite ${page} von ${pages} · ${count} Ratgeber`,
    previous: 'Zurück', next: 'Weiter (auf Englisch)',
    page: (page) => `Seite ${page}`, pageTitle: (page) => `Seite ${page}`,
  },
  libraryNav: { label: 'Sammlungen durchstöbern', planning: 'Routen und Vorbereitung', entry: 'Einreise nach China und Visumbefreiungen' },
  countryGuide: {
    eyebrow: 'Sechs Wege zur passenden Antwort', title: 'Beginnen Sie mit der Frage, die jetzt ansteht.',
    introduction: 'Wählen Sie den Ratgeber für Ihre nächste Entscheidung. Wenn Sie noch unsicher sind, wohin Sie reisen möchten, beginnen Sie bei den Reisezielen.',
    decisions: {
      plan: { title: 'Zählen Sie die verfügbaren Tage, bevor Sie Städte ergänzen.', body: 'Planen Sie Zeit für Ankunft, Abreise und lange Fahrten ein. Wählen Sie dann eine Städtefolge, die auch Pausen zulässt.' },
      'when-to-go': { title: 'Prüfen Sie die Termine vor der Buchung.', body: 'Feiertage, Wetter, Saison und Besucherandrang können die Reise verändern. Prüfen Sie, was für Ihre Termine wichtig ist.' },
      transport: { title: 'Vergleichen Sie Wege von Tür zu Tür.', body: 'Rechnen Sie die Fahrt zum Bahnhof oder Flughafen, Kontrollen und Wartezeiten zur reinen Zug- oder Flugzeit hinzu.' },
      stay: { title: 'Wählen Sie das Viertel vor dem Hotel.', body: 'Berücksichtigen Sie tägliche Wege ab Ihrer Unterkunft und die Anmeldung mit einem ausländischen Reisepass.' },
      essentials: { title: 'Bereiten Sie Einreise, Zahlungen und Telefon vor.', body: 'Prüfen Sie Formalitäten, mobilen Zugang und Zahlungsmittel vor den Buchungen, die davon abhängen.' },
      culture: { title: 'Verbinden Sie Ihre Entdeckungen mit einem Thema.', body: 'Lokale Küche, Geschichte oder lebendige Traditionen: Wählen Sie Ihre Interessen als Verbindung zwischen den Stationen.' },
    },
  },
  entrySection: {
    eyebrow: 'Bevor die Route feststeht', title: 'Prüfen Sie die für Sie geltenden Einreisebedingungen.',
    introduction: 'Konsultieren Sie offizielle Quellen passend zu Ihrem Reisepass, Reisezweck und Ihren Flügen. Homeground stellt keine Visumanträge und beurteilt nicht Ihre individuelle Einreiseberechtigung.',
    action: 'Ratgeber lesen (auf Englisch)',
  },
  updatedLabel: 'Aktualisiert am', readLabel: 'Artikel lesen (auf Englisch)',
  formatLabels: { itinerary: 'Reiseverlauf', 'route-analysis': 'Route wählen', transport: 'Transport', 'decision-guide': 'Entscheidungshilfe', 'field-note': 'Notizen vor Ort', 'planning-guide': 'Reisevorbereitung' },
  topicLabels: { design: 'Route', pace: 'Reisetempo', transport: 'Transport', attractions: 'Besichtigungen', evenings: 'Am Abend', 'trip-planning': 'Vorbereitung', 'on-the-ground': 'Vor Ort', accommodation: 'Unterkunft' },
  destinationLabels: { china: 'China', beijing: 'Peking', xian: 'Xi’an', zhangjiajie: 'Zhangjiajie', shanghai: 'Shanghai' },
  cta: {
    eyebrow: 'Sie wünschen einen Blick von vor Ort?', title: 'Sprechen wir über Ihre Reisepläne.',
    body: 'Senden Sie Termine, Teilnehmerzahl und Fragen per WhatsApp oder E-Mail. Wir klären passende Leistungen, ihren Umfang und Preis, bevor kostenpflichtige Arbeit beginnt.',
    action: 'Meine Reise besprechen',
  },
};

export const germanGuideSectionLabels: Readonly<Record<string, string>> = {
  explore: 'Reiseziele (auf Englisch)', plan: 'Reiseplanung (auf Englisch)',
  transport: 'Transport (auf Englisch)', 'when-to-go': 'Reisezeit (auf Englisch)',
  stay: 'Übernachten (auf Englisch)', essentials: 'Praktische Hinweise (auf Englisch)',
  culture: 'Kultur und Küche (auf Englisch)', tools: 'Hilfsmittel (auf Englisch)', services: 'Leistungen (auf Englisch)',
};

export const germanGuideCardCopy: GuidesHubEdition['guideCopy'] = {
  'zhangjiajie-itinerary': {
    headline: 'Zhangjiajie in 2, 3 oder 4 Tagen: Was ist realistisch?',
    description: 'Realistische Routen für zwei, drei oder vier Tage: Besuchsreihenfolge, volle Parktage, Übernachtungen, auszulassende Stationen und eine mögliche Ergänzung um Fenghuang.',
    cardImageAlt: 'Sandsteinsäulen ragen im Zhangjiajie-Waldpark aus dem Nebel.', cardTags: ['Zhangjiajie', 'Route', 'Reisetempo'],
  },
  'tianmen-mountain-tickets-and-routes': {
    headline: 'Tianmen-Berg: Tickets, geöffnete Routen, Preise und Zugang',
    description: 'Seit dem 13. Oktober 2026 wird nur Route C verkauft. Ticket- und Seilbahnpreise, Sperrungen, Ausgangspunkt und Hinweise zur Buchung mit ausländischem Reisepass.',
    cardImageAlt: 'Steintreppe zwischen Felswänden zur Tianmen-Höhle.', cardTags: ['Preise', 'Routen A, B und C', 'Zugang'],
  },
  'guilin-airport-or-railway-station-arrival-guide': {
    headline: 'Ankunft in Guilin: Welcher Flughafen oder Bahnhof passt?',
    description: 'Für Guilins Zentrum prüfen Sie zuerst zeitlich passende Züge zum Bahnhof Guilin. Für Yangshuo berechnen Sie den gesamten Weg bis zum Hotel, bevor Sie Bahnhof oder Flughafen wählen.',
    cardImageAlt: 'Fassade des Bahnhofs Guilin mit chinesischem und englischem Namen über dem Eingang.', cardTags: ['Guilin', 'Flughafen', 'Bahnhöfe'],
  },
  'zhangjiajie-national-forest-park-tickets-and-entrances': {
    headline: 'Zhangjiajie-Waldpark: Tickets, Eingänge und Transport',
    description: 'Im August 2026 geprüfte Preise: 165 RMB Eintritt, 236 RMB mit Shuttles, vier Tage gültig. Wählen Sie zuerst den Eingang und prüfen Sie dann Reisepass, Seilbahnen und Aufzüge.',
    cardImageAlt: 'Quarzsandsteinsäulen im Zhangjiajie-Waldpark im August 2016.', cardTags: ['Zhangjiajie', 'Parktickets', 'Eingänge'],
  },
  'china-private-tour-prices': {
    headline: 'Was kostet eine Privatreise durch China?',
    description: 'Vergleichen Sie veröffentlichte Preise von 43 Privatreisen mit 4 bis 21 Tagen: von 250 USD pro Person bei sechs Reisenden bis 5.920 USD bei zwei, einschließlich Tageskosten.',
    cardImageAlt: 'Haupthalle der Verbotenen Stadt über ihren Marmorterrassen.', cardTags: ['Veröffentlichte Preise', 'Nach Teilnehmerzahl', 'Pro Person, Leistungen vor Ort'],
  },
  'yangshuo-china': {
    headline: 'Yangshuo: West Street, Yulong, Xingping und passende Übernachtungszahl',
    description: 'Südlich von Guilin liegt eine kleine Stadt zwischen Li-Fluss und Karstbergen. Welche Besuche sind kostenlos, was kosten Flöße und Abendshows und wie viele Nächte sind sinnvoll?',
    cardImageAlt: 'Alte Steinbrücke spiegelt sich vor Karstbergen in Yangshuos Landschaft im Wasser.', cardTags: ['Guangxi', 'Yangshuo', 'Li-Fluss'],
  },
  'china-family-private-tours': {
    headline: 'China mit der Familie: Privatreisen mit Kindern',
    description: 'Fünf Routen mit 8 bis 14 Tagen ab 1.190 USD pro Person bei sechs Reisenden. Reiseleitung, Fahrzeug und Tempo für Ihre Familie; Kinderpreise richten sich nach dem Alter.',
    cardImageAlt: 'Junger Panda auf einer Holzplattform in Chengdu.', cardTags: ['Mit der Familie', 'Veröffentlichte Preise', 'Private Reiseleitung'],
  },
  'mutianyu-great-wall-tickets': {
    headline: 'Große Mauer bei Mutianyu: Tickets, Seilbahn und Reisepass',
    description: 'Laut offiziellem Ticketverkauf, geprüft am 11. Oktober 2026: Eintritt 40 RMB, Shuttle 15 RMB, Seilbahn 100 oder 140 RMB. Erläuterungen zu Reisepass, Erstattungen und Zeiten.',
    cardImageAlt: 'Wachturm der Großen Mauer bei Mutianyu auf einem bewaldeten Kamm in Herbstfarben.', cardTags: ['Preise', 'Seilbahn', 'Buchung mit Reisepass'],
  },
  'zhangjiajie-glass-bridge-tickets': {
    headline: 'Glasbrücke Zhangjiajie: Tickets, Routen und Reisepass',
    description: 'Ticketpreis 175 RMB im offiziellen Shop, geprüft am 11. Oktober 2026. Routen A und B, Öffnungszeiten, Buchung, Erstattungen und Aktivitäten gegen Aufpreis.',
    cardImageAlt: 'Besucher auf der weißen Brücke über den Grand Canyon von Zhangjiajie.', cardTags: ['Preise', 'Routen A und B', 'Buchung mit Reisepass'],
  },
  'singapore-to-zhangjiajie-itinerary': {
    headline: 'Von Singapur nach Zhangjiajie: Routen für 5, 6 oder 7 Tage',
    description: 'Ankunft über Changsha oder direkt in Zhangjiajie: Planen Sie volle Parktage, die passende Zahl an Nächten und eine Rückreise, die zu Ihren Flügen passt.',
    cardImageAlt: 'Zhangjiajies Felssäulen und grüne Täler im August 2016.', cardTags: ['Ab Singapur', '5, 6 oder 7 Tage', 'Flug und Bahn'],
  },
  'do-you-need-a-tour-guide-in-china': {
    headline: 'Brauchen Sie in China Reiseleitung oder andere Unterstützung?',
    description: 'Nicht unbedingt jeden Tag. Reiseleitung kann Verbotene Stadt oder Terrakotta-Armee bereichern; anderswo helfen Fahrer oder Organisationshilfe mehr. So wählen Sie passend.',
    cardImageAlt: 'Alte buddhistische Steinskulpturen in Longmen nahe Luoyang.', cardTags: ['China', 'Private Reiseleitung', 'Reiseorganisation'],
  },
  'avatar-mountains-zhangjiajie': {
    headline: 'Die Avatar-Berge in Zhangjiajie: Wohin und wie lange?',
    description: 'Wo liegt der Hallelujah-Pfeiler, was kostet der Besuch und was ermöglicht die offizielle Tagesroute? Orientierung für Ihre Aufenthaltsdauer zwischen diesen Sandsteinsäulen.',
    cardImageAlt: 'Steile Sandsteinsäulen, Kiefern und Nebel in Zhangjiajie.', cardTags: ['Zhangjiajie', 'Avatar', 'Yuanjiajie'],
  },
  'changbai-mountain-heaven-lake': {
    headline: 'Changbaishan: Himmelssee, Bergseiten, Tickets und Winterbesuch',
    description: 'Ein Kratersee auf einem ruhenden Vulkan in Jilin. Vergleichen Sie Nord- und Westseite, Tickets und Shuttles, Reservierung und Bedingungen für einen Winterbesuch.',
    cardImageAlt: 'Tiefblauer Himmelssee unter klarem Himmel mit Schnee am gegenüberliegenden Kraterrand.', cardTags: ['Jilin', 'Changbaishan', 'Himmelssee'],
  },
  'dali-old-town-erhai-lake': {
    headline: 'Dali: Altstadt, Erhai-See und Drei Pagoden in drei Tagen',
    description: 'In Yunnan zwischen Cangshan-Gebirge und Erhai-See: kostenlose Besuche, Preise für Pagoden und Seilbahn sowie Zeitbedarf je Station.',
    cardImageAlt: 'Drei Pagoden des Chongsheng-Tempels vor den schneebedeckten Cangshan-Gipfeln.', cardTags: ['Yunnan', 'Dali', 'Erhai-See'],
  },
  'dazu-rock-carvings': {
    headline: 'Dazu-Felsbilder: Baodingshan oder Beishan, Tickets und Besuch ab Chongqing',
    description: 'UNESCO-geschützte Felsskulpturen aus dem 9. bis 13. Jahrhundert. Welche der fünf Gruppen wählen, welche Tickets und Zeiten einplanen und wie den Tag ab Chongqing organisieren?',
    cardImageAlt: 'Bemalte sitzende und stehende Skulpturen auf mehreren Ebenen unter einem Felsvorsprung in Baodingshan.', cardTags: ['Chongqing', 'Dazu', 'Welterbe'],
  },
  'dunhuang-china': {
    headline: 'Dunhuang: Mogao, Mondsichelsee und die westliche Wüste',
    description: 'Was sollte man in dieser Seidenstraßen-Oase zuerst buchen? Preise, Öffnungszeiten, Wüstenausflug nach Westen und sinnvolle Aufenthaltsdauer.',
    cardImageAlt: 'Mondsichelsee und Pavillon von den Mingsha-Dünen aus gesehen, mit Besuchern unterhalb.', cardTags: ['Gansu', 'Dunhuang', 'Seidenstraße'],
  },
  'fenghuang-ancient-town': {
    headline: 'Fenghuang: kostenlose Besuche, Tickets und Anreise ab Zhangjiajie',
    description: 'Altstadtstraßen sind kostenlos; einige Sehenswürdigkeiten und Bootsfahrten auf dem Tuo kosten Eintritt. Preise, Zeiten, Magnetschwebebahn zum Bahnhof und Aufenthaltsdauer.',
    cardImageAlt: 'Hölzerne Pfahlhäuser und Wanming-Pagode spiegeln sich morgens im Tuo-Fluss.', cardTags: ['Hunan', 'Fenghuang', 'Tickets'],
  },
  'furong-ancient-town': {
    headline: 'Furong, die Stadt am Wasserfall: Wann ab Zhangjiajie besuchen?',
    description: 'Eine Altstadt über einem 60 Meter hohen Wasserfall im Westen Hunans. Ticket, Öffnung von 8 Uhr bis Mitternacht, Anreise, Beleuchtung und Gründe für eine Übernachtung.',
    cardImageAlt: 'Hölzerne Pfahlhäuser über Wasserfall und Fluss in Furong unter bewölktem Himmel.', cardTags: ['Hunan', 'Furong', 'Abendbesuch'],
  },
  'halal-food-muslim-travel-china': {
    headline: 'Als Muslim durch China reisen: Halal-Essen, Moscheen und Routen',
    description: 'Viele Möglichkeiten in Xi’an, rund um Niujie in Peking und im Nordwesten, weniger in Naturgebieten. Halal-Kennzeichnung, vier Anforderungsstufen, Flugmahlzeiten und Reiseorganisation.',
    cardImageAlt: 'Nasse Pflasterstraße im muslimischen Viertel von Xi’an unter großen Bäumen, mit Schildern für Rindfleischnudeln, Roujiamo und Lammsuppe.', cardTags: ['Halal-Essen', 'Muslimische Reisende', 'Küche'],
  },
  'hanging-temple-datong': {
    headline: 'Hängendes Kloster bei Datong: Zugang, Tickets 2026 und Blick ohne Aufstieg',
    description: 'Seit April 2026 sind täglich nur 2.475 Aufstiegstickets verfügbar. Die beiden Ticketarten, Hinweise für ausländische Besucher und Einbindung in Ihre Route.',
    cardImageAlt: 'Glasierte Dächer und Holzbalkone des Hängenden Klosters an der Felswand mit Besuchern in den Galerien.', cardTags: ['Datong', 'Hängendes Kloster', 'Tickets'],
  },
  'harbin-ice-festival': {
    headline: 'Harbin-Eisfestival 2026–2027: Eröffnung, Preise und Besuch',
    description: 'In den letzten drei Saisons lag die Eröffnung zwischen dem 17. und 21. Dezember. Das Erwachsenenticket kostete letzten Winter 328 RMB. Orientierung zu Terminen, Preisen, Wetter und Reiseplanung.',
    cardImageAlt: 'Lange Eisrutschen der Saison 2025–2026 von oben, mit dem gefrorenen Songhua-Fluss im Hintergrund.', cardTags: ['Harbin', 'Ice and Snow World', 'Dezember bis Februar'],
  },
  'huangshan-yellow-mountain': {
    headline: 'Huangshan, die Gelben Berge: Tickets 2026, Seilbahnen und Hongcun',
    description: 'Ein Granitmassiv und Welterbe in Anhui. Preise 2026, Eingänge, Zeit auf dem Berg und die Einbindung des Dorfes Hongcun in Ihre Reise.',
    cardImageAlt: 'Granitgipfel und Kiefern über einem Wolkenmeer im flachen Sonnenlicht am Huangshan.', cardTags: ['Anhui', 'Huangshan', 'Hongcun'],
  },
  'jingdezhen-china': {
    headline: 'Jingdezhen: Welterbe 2026, Besichtigungen und Aufenthaltsdauer',
    description: 'Tausend Jahre Porzellangeschichte in Jiangxi. Was die UNESCO-Aufnahme vom Juli 2026 umfasst, Preise, Zeiten und sinnvoller Zeitbedarf vor Ort.',
    cardImageAlt: 'Alter holzbefeuerter Ziegelofen unter einem Dachstuhl mit Brennholz und tönernen Brennkapseln.', cardTags: ['Jiangxi', 'Jingdezhen', 'Welterbe'],
  },
  'jiuzhaigou-valley': {
    headline: 'Jiuzhaigou: Reservierung, Budget, Saison und Route durch drei Täler',
    description: 'Hochsaison: 190 RMB Eintritt und 90 RMB für den Bus, begrenzt auf 41.000 Besucher täglich. Reisepass, Zeiten, beste Reisezeit und Tagesroute.',
    cardImageAlt: 'Türkisfarbenes Wasser und versunkene Baumstämme im Fünf-Blumen-See, umgeben von Herbstwald.', cardTags: ['Jiuzhaigou', 'Tickets', 'Sichuan'],
  },
};
