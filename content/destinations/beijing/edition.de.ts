import type { DestinationEditionCityContent } from "../../../lib/destinationEditionContent";

/** Beijing in German, translated from the English city page with every fact as it states it. */
const content: DestinationEditionCityContent = {
  title: "Reiseführer Peking: 4 bis 5 Nächte und wo Sie wohnen",
  h1: "Peking: Paläste, die Große Mauer und Hutongs, in vier oder fünf Nächten",
  description:
    "Planen Sie vier oder fünf Nächte für Peking ein: Verbotene Stadt, Große Mauer, Hutongs. Wo Sie wohnen, welcher Flughafen und welcher Bahnhof und wohin es danach geht.",
  summary:
    "Gehen Sie vom Tian’anmen nach Norden durch die Verbotene Stadt, steigen Sie auf den Jingshan, und ein ganzes Feld golden glasierter Dächer breitet sich unter Ihnen aus. Geben Sie der Großen Mauer auf ihren Bergkämmen vor der Stadt einen weiteren Tag, und verbringen Sie die Abende mit Essen und Bummeln in den Hutong-Gassen rund um den Trommelturm. Jede der großen Sehenswürdigkeiten Pekings braucht einen halben bis ganzen Tag; vier oder fünf Nächte bringen Ihnen darum drei oder vier echte Tage ohne Hetze.",
  heroAlt:
    "Der Trommelturm und der Glockenturm von Peking über den grau gedeckten Dächern der Hutongs, rechts eine belebte Gasse.",
  heroCaption:
    "Unterhalb von Trommel- und Glockenturm erstrecken sich die grau gedeckten Hutongs in alle Richtungen. Kommen Sie am späten Nachmittag, essen Sie in den Gassen und gehen Sie dann in wenigen Minuten zu den Seen von Shichahai.",
  geography: {
    title: "Pekings Sehenswürdigkeiten liegen in fünf Richtungen",
    caption:
      "Nicht maßstabsgetreu. Was in derselben Richtung liegt, passt in einen Tag; die Große Mauer braucht einen ganzen Tag für sich.",
    legend: {
      core: "Stadtzentrum",
      cluster: "Ein halber Tag oder mehr",
      outside: "Ein ganzer Tag",
      gateway: "Flughafen",
    },
    nodes: {
      axis: { label: "Tian’anmen · Verbotene Stadt · Jingshan", note: "Ein ganzer Tag, zu Fuß von Süden nach Norden" },
      south: { label: "Qianmen · Himmelstempel", note: "Ein halber bis ganzer Tag" },
      northwest: { label: "Sommerpalast · Nordwesten", note: "Mindestens ein halber Tag, oft fast ein ganzer" },
      gulou: { label: "Gulou · Shichahai", note: "Hutong-Spaziergänge und Abendessen" },
      chaoyang: { label: "Chaoyang · CBD", note: "Abendessen, Nachtleben, bequem nach einem späten Flug" },
      wall: { label: "Große Mauer", note: "Hin und zurück dauert den ganzen Tag; planen Sie nichts anderes ein" },
      pek: { label: "PEK", note: "Nordosten; Flughafenzug nach Dongzhimen" },
      pkx: { label: "PKX", note: "Weit im Süden; Flughafenzug nach Caoqiao" },
    },
  },
  overview: {
    nights: {
      answer: "Vier oder fünf Nächte bringen Ihnen drei oder vier volle Tage.",
      detail:
        "An- und Abreisetag gehen größtenteils für die Fahrt drauf. Drei Nächte reichen noch für die Verbotene Stadt und die Große Mauer, aber der Sommerpalast fällt meist weg, und wenn eine Reservierung nicht klappt, bleibt kein freier Tag zum Ausweichen.",
    },
    stay: {
      answer: "Zum ersten Mal hier? Wohnen Sie rund um Wangfujing oder Dongdan.",
      detail:
        "Die Verbotene Stadt ist nah, U-Bahn-Linien fahren in alle Richtungen, und ein Restaurant fürs Abendessen ist schnell gefunden. Für ein Hofhaus-Hotel in den Hutongs suchen Sie rund um Gulou und Shichahai; fragen Sie aber vorher, ob es einen Aufzug gibt und ob ein Auto bis vor die Tür fahren kann.",
    },
    gateway: {
      answer: "Prüfen Sie, welchen Flughafen und welchen Bahnhof Ihre Tickets nennen, und buchen Sie dann das Hotel.",
      detail:
        "Peking hat zwei Flughäfen, Capital und Daxing, und acht große Bahnhöfe, alle weit voneinander entfernt. Sie landen spät in Capital? Verbringen Sie die erste Nacht nahe Dongzhimen. Züge nach Shanghai fahren oft ab Peking Süd, Züge nach Xi’an oft ab Peking West. Planen Sie am Abreisetag keine großen Sehenswürdigkeiten ein.",
    },
    next: {
      answer: "Xi’an schließt sich am natürlichsten an; Shanghai bietet den größten Kontrast.",
      detail:
        "Ein Hochgeschwindigkeitszug bringt Sie weiter nach Xi’an zur Terrakotta-Armee und zur alten Stadtmauer. Shanghai tauscht die alte Hauptstadt gegen Wolkenkratzer. Mit genug Zeit verbinden sich Peking, Xi’an und Shanghai per Hochgeschwindigkeitszug zu einer einzigen Linie.",
    },
  },
  opening: {
    heading: "Warum so viele erste Chinareisen in Peking beginnen",
    paragraphs: [
      "Eine einzige Stadt vereint einen Kaiserpalast, die Große Mauer, Hutong-Gassen und gläserne Türme. Sie können den Vormittag in den Höfen verbringen, in denen die Kaiser lebten, in einem Hutong zu Abend essen und den Abend rund um Guomao oder Sanlitun im heutigen Peking ausklingen lassen.",
      "Hier zu beginnen hat noch einen Vorteil. Ein paar Tage im selben Hotel geben Ihnen Zeit, den Jetlag zu überwinden und zu verstehen, wie China vor Ort funktioniert: Sehenswürdigkeiten mit dem Reisepass reservieren, U-Bahn fahren, und wie weit man in den großen Anlagen zu Fuß geht. Jede weitere Stadt fällt danach leichter. Kommt Peking zuletzt, reihen Sie nicht die Ankunft aus einer anderen Stadt, einen Tag an der Großen Mauer und einen frühen internationalen Flug direkt aneinander; eine einzige Verspätung, und alles Weitere bricht zusammen.",
    ],
  },
  sources: {
    "https://www.beijing.gov.cn/ywdt/gzdt/202512/t20251229_4374283.html": {
      publisher: "Stadtregierung Peking",
      label: "Pekings System aus acht Bahnhöfen und zwei Flughäfen nach der Eröffnung von Tongzhou",
    },
    "https://english.beijing.gov.cn/livinginbeijing/transportation/railway/202512/t20251231_4381067.html": {
      publisher: "Stadtregierung Peking",
      label: "Der Bahnhof Peking Tongzhou hat am 30. Dezember 2025 den Personenverkehr aufgenommen",
    },
    "https://english.beijing.gov.cn/livinginbeijing/transportation/airport/202005/t20200516_1899219.html": {
      publisher: "Stadtregierung Peking",
      label: "Strecke des Capital Airport Express über Sanyuanqiao und Dongzhimen",
    },
    "https://english.beijing.gov.cn/travellinginbeijing/transportation/airport/202005/t20200516_1899220.html": {
      publisher: "Stadtregierung Peking",
      label: "Strecke des Daxing Airport Express nach Caoqiao",
    },
  },
  guides: {
    "china-10-day-itinerary": "China in 10 Tagen",
    "beijing-where-to-stay-first-trip": "Wohnen in Peking",
    "beijing-courtyard-hotel-or-modern-hotel": "Hofhaus oder modernes Hotel",
    "which-beijing-railway-station": "Welcher Bahnhof in Peking?",
    "beijing-south-station-to-capital-or-daxing-airport": "Von Peking Süd zu PEK oder PKX",
    "great-wall-section-selector-from-beijing": "Welcher Abschnitt der Großen Mauer?",
  },
};

export default content;
