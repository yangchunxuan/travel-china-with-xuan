import type { GermanTourCopy } from "../germanTourCopyTypes";
// @ts-ignore Node source tests use explicit TypeScript extensions.
import { germanTourCopyB } from "./batch-b.ts";

const day = (title: string, description: string) => ({ title, description });
const qa = (question: string, answer: string) => ({ question, answer });
const image = (label: string, alt = label, caption = label) => ({ label, alt, caption });
const scene = (day: number, ...variants: ReturnType<typeof image>[]) => ({ day, variants });

/** The 15-day classic repeats the first twelve days of the 14-day private classic. */
const classic14 = germanTourCopyB["beijing-xian-chengdu-guilin-shanghai-14-day-private-tour"];

export const germanTourCopyD: Readonly<Record<string, GermanTourCopy>> = {
  "beijing-xian-chengdu-guilin-shanghai-15-day-private-tour": {
    title: "Peking, Xi’an, Chengdu, Guilin, Shanghai und Suzhou: 15-tägige Privatreise",
    metadataTitle: "China in 15 Tagen: Privatreise von Peking bis Shanghai und Suzhou",
    metadataDescription: "15 Tage privat: Große Mauer, Terrakotta-Armee, Pandas, Li-Fluss, Shanghai und ein Tag in Suzhou. Vierzehn Nächte, zwei Zugfahrten, zwei Inlandsflüge und der Zug nach Suzhou enthalten.",
    eyebrow: "In 15 Tagen von Peking nach Shanghai, mit einem Tag für die Gärten von Suzhou",
    lede: "Das ist die klassische 14-tägige Privatreise mit einem zusätzlichen Tag: ein ganzer Tag in Shanghai und vor dem Heimflug ein Ausflug zu den Gärten von Suzhou. Zwei Zugfahrten und zwei Inlandsflüge verbinden Peking, Xi’an, Chengdu, Guilin und Shanghai. Der Preis gilt pro Person bei Doppelbelegung; internationale Flüge werden separat geplant.",
    summary: "Vierzehn Übernachtungen mit Frühstück. In jeder Stadt stehen örtliche Reiseleitung und Fahrzeug an den Besichtigungstagen nur Ihrer Gruppe zur Verfügung. Vorgesehene Eintritte, Transfers, zwei Zugfahrten in der zweiten Klasse, zwei Economy-Flüge und die Zugfahrt nach Suzhou und zurück an Tag 14 sind enthalten. An Reisetagen bringt Sie ein Fahrer zur Abfahrt und ein anderer empfängt Sie am Ziel.",
    highlights: [
      "Vier Nächte in Peking und die Große Mauer bei Mutianyu",
      "Die Terrakotta-Armee in Xi’an und Chengdus Pandas früh am Morgen, wenn sie am aktivsten sind",
      "Li-Flussfahrt nach Yangshuo und zwei Nächte in Yangshuo zwischen Karstbergen",
      "Drei Nächte in Shanghai, ein geführter Tag in der Stadt und ein Bahnausflug zu den Gärten von Suzhou",
    ],
    itinerary: [
      ...classic14.itinerary.slice(0, 12),
      day("Bund, Yu-Garten und ehemalige Französische Konzession", "Ein ganzer Tag in Shanghai mit Ihrer Reiseleitung: vormittags Yu-Garten und Altstadt, dann der Bund mit Blick auf die Hochhäuser von Pudong am anderen Ufer und nachmittags die Platanenstraßen eines Viertels der ehemaligen Französischen Konzession."),
      day("Tagesausflug zu den Gärten von Suzhou", "Mit dem Hochgeschwindigkeitszug liegt Suzhou etwa 30 Minuten von Shanghai entfernt. Besuchen Sie einen für den Tag bestätigten Garten, spazieren Sie an den Kanälen der Pingjiang Road entlang und fahren Sie zurück nach Shanghai."),
      day("Abreise aus Shanghai", "Ihr Fahrer bringt Sie zum bestätigten Flughafen oder Bahnhof Shanghai. Am Abreisetag sind keine Besichtigungen vorgesehen."),
    ],
    hotelNote: "Vierzehn Nächte mit Frühstück bei Doppelbelegung in Hotels mit Vier-Sterne-Standard (4 Diamanten auf Trip.com, auch Ctrip genannt): Peking 4, Xi’an 2, Chengdu 2, Guilin 1, Yangshuo 2 und Shanghai 3. Hotelnamen und Zimmer werden vor Zahlung bestätigt.",
    serviceNote: "An den Besichtigungstagen stehen örtliche englischsprachige Reiseleitung und Fahrzeug nur Ihrer Gruppe zur Verfügung. Enthalten sind alle Flughafen- und Bahnhofstransfers, die vorgesehenen Haupteintritte, die Li-Flussfahrt mit separatem Gepäcktransport, eine Bambusfloßfahrt auf dem Yulong und an Tag 14 die Zugfahrt in der zweiten Klasse nach Suzhou und zurück mit dem Eintritt für einen Garten. Die langen Verbindungen sind Zugfahrten Peking–Xi’an–Chengdu in der zweiten Klasse und Economy-Flüge Chengdu–Guilin sowie Guilin–Shanghai. Reiseleitungen wechseln von Stadt zu Stadt; Fahrer übernehmen die Transfers an Reisetagen. Koreanischsprachige Reiseleitungen sind je nach örtlicher Verfügbarkeit zum selben Preis möglich.",
    bookingNote: classic14.bookingNote,
    exclusions: [
      "Internationale Flüge nach und aus China",
      "Mittagessen, Abendessen und Getränke; Frühstück ist in jedem Hotel enthalten",
      "Reiseversicherung, Visa, Trinkgelder und persönliche Ausgaben",
      "Upgrades und Feiertagszuschläge",
      "Einzelzimmerzuschlag",
      "Aufgabegepäck über der Freigepäckmenge der Fluggesellschaft",
    ],
    faq: [
      qa("Was umfasst der Preis dieser 15-tägigen Privatreise?", "Der Preis pro Person hängt von der Teilnehmerzahl ab und basiert auf Doppelbelegung. Enthalten sind 14 Nächte mit Frühstück, private Reiseleitungen und Fahrzeuge an Besichtigungstagen, vorgesehene Eintritte, zwei Hochgeschwindigkeitszüge, zwei Inlandsflüge und der Zug nach Suzhou. Internationale Flüge, Mittag- und Abendessen werden separat bezahlt. Für andere Teilnehmerzahlen erstellen wir ein schriftliches Angebot."),
      qa("Worin unterscheidet sich diese Reise von der klassischen 14-tägigen Privatreise?", "Die ersten zwölf Tage sind gleich. Bei der 14-tägigen Privatreise wählen Sie für Tag 13 zwischen Shanghai und Suzhou, Tag 14 ist der Abreisetag. Diese 15-tägige Reise sieht an Tag 13 einen ganzen geführten Tag in Shanghai vor, an Tag 14 Suzhou und an Tag 15 die Abreise, mit einer dritten Hotelnacht in Shanghai."),
      qa("Welche Reisezeit empfiehlt sich?", "April–Mai und September–Oktober bieten auf dieser Route gewöhnlich die angenehmsten Wetterbedingungen. Juli–August sind in Xi’an und Guilin heiß und feucht; Pandas sind weniger aktiv. Im Winter kann Niedrigwasser die Flussfahrt verkürzen. In den ersten Wochen von Mai und Oktober sind Züge und Sehenswürdigkeiten stark besucht."),
      qa("Kann die Route geändert werden?", "Ja. Wir können eine Variante mit Zhangjiajie statt Chengdu, Hangzhou statt Suzhou oder zusätzlichen Nächten anbieten. Geänderte Route und Preis werden vor Zahlung schriftlich bestätigt."),
      qa("Gibt es Einkaufsstopps?", "Nein. Diese 15-tägige Privatreise hat keine Einkaufsstopps. Besichtigungen oder Leistungen werden nur mit Ihrer Zustimmung ergänzt."),
    ],
    heroImage: { alt: "Shanghais Skyline am Flussufer im Abendlicht", caption: "Shanghai bildet den Abschluss der Route: drei Nächte, mit einem geführten Tag in der Stadt und einem Tag in Suzhou." },
    gallery: [{ alt: "Der Bug eines Bambusfloßes auf einem ruhigen grünen Fluss in Yangshuo, mit Bambus am Ufer und Karstgipfeln dahinter", caption: "Während der zwei Nächte in Yangshuo ist eine Bambusfloßfahrt auf dem Yulong enthalten." }],
    routeMedia: [
      ...classic14.routeMedia.slice(0, 12),
      scene(13,
        image("Der Bund", "Der Bund in Shanghai", "Der Bund in Shanghai"),
        image("Yu-Garten", "Traditionelle Gebäude und Teich im Yu-Garten", "Yu-Garten und Altstadt gehören zum geführten Tag in Shanghai."),
      ),
      scene(14,
        image("Garten des bescheidenen Beamten", "Pavillon, Teich und Pflanzenlandschaft im Garten des bescheidenen Beamten in Suzhou", "Garten des bescheidenen Beamten in Suzhou. Welcher Garten an diesem Tag besucht wird, bestätigen wir schriftlich."),
        image("Pingjiang Road", "Steinbrücke und Häuser am Kanal entlang der Pingjiang Road", "Pingjiang Road in Suzhou"),
      ),
      scene(15, image("Shanghai", "Ruhige Uferpromenade gegenüber Shanghais Hochhäusern", "Shanghai · Eindruck vom Reiseziel")),
    ],
    packages: [{ id: "standard-guided", label: "Privatreise", summary: "An den Besichtigungstagen stehen Reiseleitung und Fahrzeug nur Ihrer Gruppe zur Verfügung. Hotels, Transporte, Eintritte und Reiseleitungsleistungen werden in der schriftlichen Bestätigung vor Zahlung genau aufgeführt. Keine Einkaufsstopps." }],
  },
};
