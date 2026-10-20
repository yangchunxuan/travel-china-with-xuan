import type { DestinationEditionCityContent } from "../../../lib/destinationEditionContent";

/** Xi'an in German, translated from the English city page with every fact as it states it. */
const content: DestinationEditionCityContent = {
  title: "Reiseführer Xi’an: 3 Nächte und wo Sie wohnen",
  h1: "Xi’an: Terrakotta-Armee, Stadtmauer und Essensgassen, in drei Nächten",
  description:
    "Planen Sie drei Nächte für Xi’an ein: einen Tag für die Terrakotta-Armee, einen für Stadtmauer und Essensgassen. Wo Sie wohnen, welcher Bahnhof und wohin es danach geht.",
  summary:
    "Betreten Sie in Lintong die Halle über Grube 1, und plötzlich liegt die Armee unter Ihnen: lebensgroße Tonsoldaten, Reihe um Reihe, deren Gesichter und Bärte sich von einem zum nächsten unterscheiden. Zurück in der Stadt gehen Sie oben auf der Mauer, breit wie eine Straße, und beschließen den Abend rund um Glocken- und Trommelturm beim Essen in den Gassen des muslimischen Viertels. Die Krieger brauchen den größten Teil eines Tages; drei Nächte geben Ihnen darum einen vollen Tag für sie und einen für Xi’an selbst.",
  heroAlt: "Der Glockenturm von Xi’an golden beleuchtet vor tiefblauem Abendhimmel, davor Lichtspuren des Verkehrs.",
  heroCaption:
    "Der Glockenturm steht im Herzen der ummauerten Stadt. Gehen Sie am Trommelturm vorbei zum Essen in die Gassen des muslimischen Viertels, oder in fünfzehn Minuten die Südstraße hinunter, um am Südtor auf die Mauer zu steigen.",
  geography: {
    title: "Xi’ans Sehenswürdigkeiten liegen südlich und östlich der Mauer",
    caption:
      "Nicht maßstabsgetreu. Die Altstadt und das Museum südlich davon brauchen je einen halben Tag; die Krieger füllen den größten Teil eines Tages, der Huashan einen ganzen.",
    legend: {
      core: "Altstadtzentrum",
      cluster: "Ein halber Tag oder mehr",
      outside: "Ein Tag außerhalb der Stadt",
      gateway: "Flughafen und Bahnhöfe",
    },
    nodes: {
      wall: { label: "Stadtmauer · Glocken- und Trommelturm", note: "Mauerspaziergänge und Abendessen im muslimischen Viertel" },
      south: { label: "Shaanxi-Geschichtsmuseum · Dayanta", note: "Ein halber Tag: erst das Museum, dann die Pagode" },
      lintong: { label: "Lintong · Terrakotta-Armee", note: "Der größte Teil eines Tages, mit Hin- und Rückfahrt" },
      huashan: { label: "Huashan", note: "Ein ganzer Tag, oder Übernachtung in der Nähe" },
      north: { label: "Xi’an Nord", note: "Wichtigster Hochgeschwindigkeitsbahnhof, nördlich des Zentrums" },
      xiy: { label: "Flughafen XIY", note: "Nordwesten, auf der Seite von Xianyang" },
      east: { label: "Xi’an Ost", note: "Östlicher Bahnhof, seit Juni 2026 in Betrieb" },
    },
  },
  overview: {
    nights: {
      answer: "Drei Nächte geben Ihnen einen vollen Tag für die Krieger und einen für die Stadt.",
      detail:
        "An- und Abreisetag gehen größtenteils für die Fahrt drauf. Bei zwei Nächten verbringen die meisten ihren einzigen vollen Tag bei der Terrakotta-Armee; eine dritte Nacht gibt der Stadt einen eigenen Tag. Kommt der Huashan dazu? Er braucht einen weiteren ganzen Tag, planen Sie also vier Nächte.",
    },
    stay: {
      answer: "Zum ersten Mal hier? Wohnen Sie nahe dem Glockenturm, innerhalb der Stadtmauer.",
      detail:
        "Der Trommelturm und die Essensgassen des muslimischen Viertels sind nur ein paar Schritte entfernt, das Abendessen ist also einfach. Es ist voll und laut; bitten Sie um ein Zimmer zur ruhigen Seite und prüfen Sie, ob ein Auto bis vor die Tür kommt. Sind das Museum und die Große Wildganspagode Ihr Hauptziel, wohnen Sie besser in Dayanta oder Xiaozhai.",
    },
    gateway: {
      answer: "Prüfen Sie, welcher der drei großen Bahnhöfe von Xi’an auf Ihrem Ticket steht.",
      detail:
        "Xi’an Nord, der wichtigste Hochgeschwindigkeitsbahnhof, ist vom Glockenturm aus eine Fahrt, kein Spaziergang. Der Bahnhof Xi’an liegt direkt nördlich der alten Stadtmauer, und Xi’an Ost wurde im Juni 2026 eröffnet, ältere Reiseführer kennen ihn deshalb womöglich nicht. Sie fliegen? XIY liegt im Nordwesten, Richtung Xianyang; gehen Sie zu dem Terminal, das Ihre Fluggesellschaft nennt.",
    },
    next: {
      answer: "Fahren Sie weiter nach Chengdu oder Peking; Xi’an liegt auf der Linie dazwischen.",
      detail:
        "Peking, Xi’an und Chengdu bilden eine Linie, in beide Richtungen. Chengdu tauscht Tonsoldaten und Stadtmauern gegen Sichuan-Küche und Leben im Viertel; Peking springt weiter zur Hauptstadt der späteren Kaiser Chinas. Sie kommen spät in Chengdu an? Planen Sie am nächsten Morgen keine Besuche mit fester Uhrzeit.",
    },
  },
  opening: {
    heading: "Warum so viele erste Chinareisen über Xi’an führen",
    paragraphs: [
      "Xi’an führt Sie weiter in die Vergangenheit zurück als Peking. Oben auf der Stadtmauer ist die Altstadt unter Ihnen nur etwa ein Siebtel von Chang’an, der Hauptstadt der Tang; der Rest liegt unter der modernen Stadt jenseits davon. Im Shaanxi-Geschichtsmuseum lassen Wandmalereien aus Tang-Gräbern diesen Hof in Farbe wieder aufleben: Polospieler im vollen Galopp, Musiker, Tänzerinnen und ausländische Gesandte, einer davon aus Korea. Eine kurze Fahrt entfernt steht die Große Wildganspagode, ursprünglich erbaut, um die Schriften aufzubewahren, die der Mönch Xuanzang aus Indien mitbrachte.",
      "Xi’an liegt an wichtigen Bahnstrecken zwischen Peking und Chengdu, darum lässt es sich ohne Umweg in eine erste Reise einbauen. Dafür verlangt es Zeit. Geben Sie ihm mindestens einen vollen Tag, der weder An- noch Abreisetag ist. Kommen Sie spät an und reisen am nächsten Morgen früh ab, sehen Sie Ihr Hotel und sehr wenig von Xi’an.",
    ],
  },
  sources: {
    "http://www.xa.gov.cn/xw/zwzx/msyw/2072145741715947521.html": {
      publisher: "Volksregierung der Stadt Xi’an",
      label: "Der Bahnhof Xi’an Ost ging am 30. Juni 2026 mit der Schnellfahrstrecke Xi’an–Shiyan in Betrieb",
    },
    "https://en.xa.gov.cn/CultureTravel/Transportation/1873656097505083393.html": {
      publisher: "Volksregierung der Stadt Xi’an",
      label: "Terminal 5 des internationalen Flughafens Xi’an Xianyang",
    },
    "https://www.bmy.com.cn/guide/": {
      publisher: "Museum des Mausoleums von Kaiser Qin Shihuang",
      label: "Ein Ticket für die Gruben der Terrakotta-Armee und den Lishan-Garten, der kostenlose Shuttlebus und die Reservierung mit Reisepass",
    },
    "https://www.sxhm.com/guide.h": {
      publisher: "Shaanxi-Geschichtsmuseum",
      label: "Besuchs- und Reservierungshinweise des Shaanxi-Geschichtsmuseums",
    },
  },
  guides: {
    "china-10-day-itinerary": "China in 10 Tagen",
    "terracotta-warriors-without-tour": "Besuch der Terrakotta-Armee",
    "shaanxi-history-museum-booking-and-collection-plan": "Plan für das Shaanxi-Geschichtsmuseum",
    "xian-where-to-stay-city-wall-or-dayanta": "Wohngegenden in Xi’an",
    "beijing-xian-chengdu-route-order": "Peking, Xi’an, Chengdu: die Reihenfolge",
    "chinese-city-walls-gates-and-urban-order": "Chinesische Stadtmauern verstehen",
  },
};

export default content;
