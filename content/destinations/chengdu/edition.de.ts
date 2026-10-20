import type { DestinationEditionCityContent } from "../../../lib/destinationEditionContent";

/** Chengdu in German, translated from the English city page with every fact as it states it. */
const content: DestinationEditionCityContent = {
  title: "Reiseführer Chengdu: 3 Nächte und wo Sie wohnen",
  h1: "Chengdu: Pandas, Teehäuser und Sichuan-Feuertopf, in drei Nächten",
  description:
    "Planen Sie drei Nächte für Chengdu ein: Pandas, Tee im Volkspark und Sichuan-Feuertopf. Wo Sie wohnen, Flughafen Tianfu oder Shuangliu und warum Chongqing folgt.",
  summary:
    "Seien Sie bei der Pandastation, wenn die Tore öffnen. Hinter einer Biegung sitzt vielleicht ein Großer Panda wie ein Mensch an einen Baumstamm gelehnt und arbeitet sich durch einen Bambusstängel, den er mit beiden Pfoten hält. An einem anderen Morgen nehmen Sie in einem Teehaus im Volkspark auf einem Bambusstuhl Platz, lassen ein, zwei Stunden verstreichen und beschließen den Tag bei einem Feuertopf. Die Pandas allein füllen einen Vormittag; drei Nächte geben Ihnen darum zwei volle Tage, je einen für beides, ohne Hetze.",
  heroAlt:
    "Menschen trinken Tee auf Bambusstühlen unter einem überdachten Holzpavillon mit roten Laternen, in einem Teehaus im Volkspark von Chengdu.",
  heroCaption:
    "Lassen Sie sich bei Ihrem Tee Zeit, und das Leben im Park zieht an Ihrem Tisch vorbei. In diesem Park, im hundertjährigen Teehaus Heming, können Sie sich sogar die Ohren reinigen lassen, wenn Sie sich trauen.",
  geography: {
    title: "Chengdus Sehenswürdigkeiten und drei Städte darüber hinaus",
    caption:
      "Nicht maßstabsgetreu. Die Pandastation liegt am Stadtrand; Dujiangyan, Sanxingdui und Leshan sind eigene Städte, jede ein ganzer Tagesausflug.",
    legend: {
      core: "Stadtzentrum",
      cluster: "Ein halber Tag oder mehr",
      outside: "Ein ganzer Tagesausflug",
      gateway: "Flughäfen und Bahnhof",
    },
    nodes: {
      centre: { label: "Volkspark · Tianfu-Platz", note: "Tee im Park, Museen, Spaziergänge im Zentrum" },
      panda: { label: "Pandastation Chengdu", note: "Am Stadtrand; ein Vormittag, am besten zur Öffnung" },
      wuhou: { label: "Wuhou-Schrein · Jinli", note: "Schrein der Drei Reiche, daneben Läden" },
      dujiangyan: { label: "Dujiangyan · Pandatal", note: "Eigene Stadt im Westen; ein ganzer Tag" },
      sanxingdui: { label: "Sanxingdui, Guanghan", note: "Bronzegesichter, im Nordosten; ein ganzer Tag" },
      leshan: { label: "Leshan", note: "Der Große Buddha, im Süden; ein langer Tag" },
      tfu: { label: "Flughafen Tianfu (TFU)", note: "Weit im Südosten; lange Fahrt in die Stadt" },
      ctu: { label: "Flughafen Shuangliu (CTU)", note: "Südwesten; meist näher am Zentrum" },
      east: { label: "Chengdu Ost", note: "Viele Hochgeschwindigkeitszüge; prüfen Sie Ihr Ticket" },
    },
  },
  overview: {
    nights: {
      answer: "Drei Nächte geben Ihnen zwei volle Tage in der Stadt.",
      detail:
        "Landen Sie am Abend, besteht der erste Tag nur aus dem Abendessen. Drei Nächte geben den Pandas einen eigenen Vormittag und dem Tee im Volkspark und dem Wuhou-Schrein einen weiteren Tag. Haben Sie abends noch Energie, kommt die Sichuan-Oper dazu. Eine vierte Nacht bringt einen Tagesausflug nach Sanxingdui, Dujiangyan oder Leshan.",
    },
    stay: {
      answer: "Zum ersten Mal hier? Wohnen Sie rund um die Chunxi Road und Taikoo Li.",
      detail:
        "Abendessen und belebte Straßen am Abend liegen vor der Tür, der Daci-Tempel ist nah, und die U-Bahn fährt in mehrere Richtungen. Ein Hotel „nahe Taikoo Li“ kann seinen Eingang tief in einem Einkaufszentrum haben; prüfen Sie den Fußweg von der U-Bahn und wo ein Auto halten kann. Für ruhige Teehausmorgen sehen Sie sich in den Kuanzhai-Gassen oder am Volkspark um.",
    },
    gateway: {
      answer: "Prüfen Sie, ob Ihr Ticket Tianfu oder Shuangliu nennt, und planen Sie dann die Fahrt.",
      detail:
        "Tianfu liegt weit im Südosten, auch mit der U-Bahn-Linie 18 eine lange Fahrt; Shuangliu im Südwesten liegt meist näher am Zentrum. Flüge wechseln zwischen den beiden, prüfen Sie also kurz vor dem Abflug noch einmal. Viele Hochgeschwindigkeitszüge fahren ab Chengdu Ost, Chengdu Süd und Chengdu West sind aber eigene Bahnhöfe.",
    },
    next: {
      answer: "Chongqing ist die natürliche nächste Station, steiler und schneller als Chengdu.",
      detail:
        "Nach ruhigen Tagen in Teehäusern und bei langen Mahlzeiten ist gerade der Kontrast der Grund hinzufahren. Möchten Sie stattdessen mehr von Sichuan sehen, übernachten Sie eine Nacht in Leshan oder Dujiangyan, damit der Ausflug kein Wettlauf wird. Jiuzhaigou, weit im Norden in den Bergen, braucht mehrere Tage und eigene Übernachtungen.",
    },
  },
  opening: {
    heading: "Warum eine Chinareise in Chengdu langsamer wird",
    paragraphs: [
      "Chengdu ist eine riesige Stadt, die Ihnen dennoch Zeit lässt. Tee im Volkspark kann einen späten Vormittag füllen, und ein langes Mittagessen zieht sich bis in den Nachmittag. Rund um den Daci-Tempel steht ein alter Tempel zwischen heutigen Geschäften, und am Wuhou-Schrein folgen Sie der Geschichte der Drei Reiche. Gehen Sie in der Dämmerung zu einer überdachten Brücke über den Jin-Fluss, sehen Sie zu, wie sich die Bürotürme im Wasser spiegeln, und lassen Sie sich von einem Feuertopf durch den Abend tragen.",
      "Nach Peking oder Xi’an lenkt Chengdu die Reise auf den Alltag, die Sichuan-Küche und die Landschaften jenseits der Stadt. Geben Sie ihm mindestens drei Nächte, damit die Pandas und die Teehäuser je einen Tag bekommen. Quetschen Sie es nur für ein Pandafoto in eine knappe Reise mit Peking, Xi’an und Shanghai, kann es zu einem teuren Umweg werden.",
    ],
  },
  stayExample: [
    { id: "first-stay-plan-heading", type: "heading", level: 2, text: "Ihre erste Reise nach Chengdu: drei Nächte, vier Tage" },
    {
      id: "first-stay-plan-intro",
      type: "paragraph",
      text: "Ankunft an Tag eins, Abreise an Tag vier, dazwischen zwei volle Tage. Geben Sie einen den Pandas, den anderen dem Tee im Volkspark und dem Wuhou-Schrein.",
    },
    {
      id: "first-stay-plan",
      type: "list",
      items: [
        "Tag 1 – Checken Sie in einem zentralen Hotel ein und essen Sie in der Nähe zu Abend. Landen Sie am Abend, ist das Abendessen schon der ganze Tag; zahlen Sie also keine Vorstellung im Voraus, die einen pünktlichen Flug voraussetzt.",
        "Tag 2 – Gehen Sie zu Ihrem gebuchten Einlass am Morgen in die Pandastation und sehen Sie den Pandas beim Frühstück zu, den Bambus in beiden Pfoten. Besuch sowie Hin- und Rückfahrt reichen für einen Tag; essen Sie in der Stadt zu Mittag und lassen Sie den Nachmittag ruhig angehen.",
        "Tag 3 – Beginnen Sie mit Tee auf einem Bambusstuhl in einem Teehaus im Volkspark, und geben Sie dann dem Wuhou-Schrein Zeit, seine Geschichte der Drei Reiche zu erzählen. Essen Sie einen Feuertopf so scharf, wie es Ihrer Gruppe schmeckt, und gehen Sie nur in die Sichuan-Oper, wenn Sie noch Energie haben und das Theater nicht weit ist.",
        "Tag 4 – Auschecken und weiterreisen. Prüfen Sie zuerst, wie lange die Fahrt zu genau dem Flughafen oder Bahnhof auf Ihrem Ticket dauert; ein Frühstück oder ein kurzer Spaziergang kommt nur dazu, wenn Zeit bleibt.",
      ],
    },
    {
      id: "first-stay-plan-extra-night",
      type: "paragraph",
      text: "Eine vierte Nacht bringt einen dritten vollen Tag. Behalten Sie beide Stadttage und ergänzen Sie einen Tagesausflug nach Sanxingdui, Dujiangyan oder Leshan, nachdem Sie den passenden Ratgeber weiter unten gelesen haben. Bei zwei Nächten behalten Sie den Pandavormittag und einen Tag in der Stadt und heben sich Tagesausflüge fürs nächste Mal auf. Bekommen Sie für Tag 2 keinen Einlass am Morgen bei den Pandas, tauschen Sie Tag 2 und 3; quetschen Sie nicht beides in einen Nachmittag.",
    },
  ],
  sources: {
    "https://www.wuhouci.net.cn/about": {
      publisher: "Museum des Wuhou-Schreins Chengdu",
      label: "Museum des Wuhou-Schreins – der Schrein und sein Hintergrund aus der Zeit der Drei Reiche",
    },
    "https://www.panda.org.cn/en/service/ticket/": {
      publisher: "Forschungsbasis für die Zucht des Großen Pandas Chengdu",
      label: "Forschungsbasis für die Zucht des Großen Pandas Chengdu – Tickets, Einlasszeiten und Dokumentenregeln",
    },
    "https://m.panda.org.cn/cn/news/notice/2026-07-16/8879.html": {
      publisher: "Forschungsbasis für die Zucht des Großen Pandas Chengdu",
      label: "Pandastation Chengdu – offizieller Hinweis zu Sommerhitze und Besichtigung in Innenräumen",
    },
    "https://m.panda.org.cn/en/service/transit/": {
      publisher: "Forschungsbasis für die Zucht des Großen Pandas Chengdu",
      label: "Pandastation Chengdu – offizielle Hinweise zur Anreise mit öffentlichen Verkehrsmitteln",
    },
  },
  guides: {
    "chengdu-chongqing-zhangjiajie-itinerary": "Chengdu, Chongqing, Zhangjiajie",
    "chengdu-panda-base-or-dujiangyan-panda-valley": "Pandastation Chengdu oder Pandatal",
    "sanxingdui-museum-booking-and-gallery-order": "Sanxingdui: Buchung und Rundgang",
    "chengdu-jiuzhaigou-transport-route": "Von Chengdu nach Jiuzhaigou",
    "leshan-giant-buddha-land-or-boat-visit": "Leshan zu Fuß oder per Boot",
    "chengdu-greenway-city-ring": "Einen Abschnitt des Chengdu-Grünrings wählen",
  },
};

export default content;
