import type { DestinationEditionCityContent } from "../../../lib/destinationEditionContent";

/** Chongqing in French, translated from the English city page with every fact as it states it. */
const content: DestinationEditionCityContent = {
  title: "Guide de voyage à Chongqing : 3 nuits et où loger",
  h1: "Chongqing : ruelles en escalier, deux rivières et lumières de la ville, sur trois nuits",
  description:
    "Accordez trois nuits à Chongqing pour ses ruelles en escalier, ses deux rivières et Hongyadong illuminé la nuit. Où loger, quelle gare choisir, et pourquoi Chengdu vient ensuite.",
  summary:
    "Partez du monument de la Libération et descendez la vieille rue en escalier de Shibati. À Chaotianmen, regardez la Jialing rejoindre le Yangtsé, en général la rivière la plus claire contre la plus boueuse. Après le dîner, les onze étages de Hongyadong brillent d’un éclat doré au-dessus de l’eau. Le lendemain, passez sur la rive sud, descendez tranquillement les ruelles de Danzishi et dînez au bord de l’eau, face aux tours de Yuzhong. Trois nuits vous donnent ces deux journées complètes ; ajoutez-en au moins une pour les ponts de pierre de Wulong ou les sculptures de Dazu.",
  heroAlt:
    "Les tours de Yuzhong de l’autre côté de la rivière Jialing au coucher du soleil, avec à droite le pont de Qiansimen éclairé en rouge.",
  heroCaption:
    "Les tours de Yuzhong s’illuminent de l’autre côté de la Jialing au coucher du soleil, et le pont de Qiansimen s’éclaire en rouge. À la nuit tombée, avancez jusqu’au milieu du pont et retournez-vous vers Hongyadong.",
  geography: {
    title: "Deux rivières découpent le centre de Chongqing en trois",
    caption:
      "Schéma sans échelle. Des rives qui semblent proches peuvent être séparées par un pont ou un tunnel ; Wulong et Dazu demandent chacun une journée entière.",
    legend: {
      core: "Centre-ville",
      cluster: "Une demi-journée ou plus",
      outside: "Une journée entière",
      gateway: "Aéroport et gare",
    },
    nodes: {
      yuzhong: { label: "Yuzhong · Jiefangbei", note: "Une journée entière ; Hongyadong illuminé la nuit" },
      jiangbei: { label: "Jiangbei · Guanyinqiao", note: "Shopping et dîners tardifs de l’autre côté de la rivière" },
      nanan: { label: "Nan’an · Nanshan", note: "Dîner au bord de l’eau, face à Yuzhong" },
      liziba: { label: "Liziba · côté ouest", note: "Un train à travers un immeuble ; à combiner avec Ciqikou" },
      wulong: { label: "Wulong", note: "Ponts de pierre dans une gorge ; mieux avec une nuit sur place" },
      dazu: { label: "Dazu", note: "Sculptures rupestres ; une journée entière par la route" },
      ckg: { label: "Aéroport CKG", note: "Au nord du centre ; une voiture si vous arrivez tard" },
      eaststation: { label: "Chongqing Est", note: "Rive sud ; trains vers Wulong et Zhangjiajie" },
    },
  },
  overview: {
    nights: {
      answer: "Trois nuits vous laissent deux journées complètes en ville.",
      detail:
        "Les jours d’arrivée et de départ passent surtout en trajets, et deux nuits ne laissent qu’une journée, juste assez pour Yuzhong. Les ponts de pierre de Wulong et les sculptures de Dazu demandent chacun une journée entière : ajoutez au moins une nuit pour l’un ou l’autre. Le soir de votre arrivée, repérez l’entrée de votre hôtel et dînez à proximité.",
    },
    stay: {
      answer: "Premier séjour ? Logez autour de Jiefangbei.",
      detail:
        "Hongyadong est à environ quinze minutes à pied en descendant, et Shibati comme Chaotianmen sont faciles d’accès. Guanyinqiao, de l’autre côté de la rivière, convient aux dîners tardifs et au shopping, mais la plupart de vos matinées commenceraient alors par une traversée. Les rues s’étagent sur plusieurs niveaux : demandez à quel étage se trouve la réception et où s’arrêtent les voitures.",
    },
    gateway: {
      answer: "Vérifiez laquelle des quatre grandes gares de Chongqing figure sur votre billet.",
      detail:
        "Chongqing Nord, Ouest, Shapingba et Est sont des gares distinctes, et les trains à grande vitesse pour Wulong partent de Chongqing Est, sur la rive sud. Les vols atterrissent à l’aéroport de Jiangbei, au nord du centre. Vous arrivez tard ou avec de grosses valises ? Prenez une voiture jusqu’à l’entrée des véhicules de l’hôtel, pas le métro.",
    },
    next: {
      answer: "Chengdu est le partenaire naturel, avec des trains fréquents entre les deux.",
      detail:
        "Chengdu est plus plate, avec ses pandas et ses maisons de thé ; Chongqing est escarpée et façonnée par ses rivières. Commencez par trois nuits dans chacune, puis donnez une nuit de plus à Chongqing pour Wulong, Dazu ou une croisière sur le Yangtsé, ou à Chengdu pour davantage de pandas et des excursions dans le Sichuan.",
    },
  },
  opening: {
    heading: "Pourquoi Chongqing vaut bien quelques marches",
    paragraphs: [
      "Chongqing escalade les rives escarpées où se rejoignent le Yangtsé et la Jialing, et toute la ville s’empile en couches. Des routes passent sous d’autres rues, et à Liziba, un train traverse un immeuble de part en part. À Hongyadong, on entre depuis une rue de la ville au dernier étage pour ressortir tout en bas, sur la route qui longe la rivière. Pas étonnant qu’on la surnomme la ville 8D. Les soirées se prolongent tard, avec des dîners au bord de l’eau, des rues animées et la ligne des tours illuminée de l’autre côté de la rivière.",
      "Chongqing est aussi un point de départ ou d’arrivée naturel pour un plus long voyage. Chengdu est à un trajet de train facile, la principale route des croisières sur le Yangtsé relie la ville à Yichang, et Chongqing Est propose des trains vers Wulong et certains vers Zhangjiajie. Si vous embarquez pour une croisière juste après un long vol ou un long trajet en train, dormez d’abord au moins une nuit à Chongqing. Vous aurez de la marge en cas de retard, et le temps de recevoir les dernières indications sur le quai d’embarquement.",
    ],
  },
  stayExample: [
    { id: "two-complete-days-heading", type: "heading", level: 2, text: "Deux journées complètes : descendre les marches, puis traverser la rivière" },
    {
      id: "two-complete-days-context",
      type: "paragraph",
      text: "Trois nuits dans un hôtel de Jiefangbei vous laissent deux journées entières sans train ni avion à prendre. Le jour 1 reste sur la péninsule de Yuzhong ; le jour 2 traverse la rivière jusqu’à Danzishi. Repas et pauses sont prévus : Wulong et Dazu demandent donc chacun leur propre journée.",
    },
    {
      id: "two-complete-days-plan",
      type: "table",
      caption: "Une première visite sur deux journées complètes",
      columns: ["Moment de la journée", "Jour 1 : péninsule de Yuzhong", "Jour 2 : Danzishi, rive sud"],
      rows: [
        [
          "Matin",
          "Commencez au monument de la Libération, puis descendez tranquillement la vieille rue en escalier de Shibati depuis l’entrée du haut. Si vous préférez ne pas remonter, prenez une voiture en bas.",
          "Faites-vous déposer par le chauffeur à l’entrée du haut de la vieille rue de Danzishi, puis descendez sans hâte ses cours et ses ruelles vers la route Nanbin.",
        ],
        [
          "Déjeuner et début d’après-midi",
          "Déjeunez près de Shibati, ou retournez à Jiefangbei pour déjeuner et vous reposer à l’hôtel ; par forte chaleur ou sous la pluie, faites une vraie pause à l’intérieur.",
          "Déjeunez à Danzishi, puis visitez la galerie d’exposition de l’urbanisme de Chongqing, sur la place de Danzishi, si elle est ouverte. Ses présentations de la ville, des collines et des rivières rendent la ligne des tours plus facile à lire ; vérifiez les conditions d’entrée du jour avant d’y aller.",
        ],
        [
          "Fin d’après-midi",
          "Prenez une voiture jusqu’à Chaotianmen pour une courte promenade là où la Jialing, en général la rivière la plus claire, rejoint le Yangtsé, plus boueux. Convenez avec le chauffeur d’une vraie entrée ou d’un point de prise en charge au bord de la route ; le repère de la carte à la pointe de la péninsule n’est pas un endroit où retrouver une voiture.",
          "Promenez-vous un moment le long de la route Nanbin, au bord de la rivière, puis installez-vous devant un café. Un point de vue plus haut à Danzishi signifie davantage de montée : n’y allez que si vous en avez envie.",
        ],
        [
          "Soir",
          "Après le dîner, regardez de l’extérieur les onze étages de Hongyadong briller d’un éclat doré. Vérifiez si vous passerez par la rue du haut ou par la route du bord de la rivière, et retrouvez votre voiture là où les voitures peuvent s’arrêter ; si la foule bloque l’accès, n’attendez pas pour la photo.",
          "Dînez au bord de la rivière, face aux lumières de Yuzhong, puis retrouvez votre voiture à un point convenu au bord de la route, sur cette rive. La journée est pleine sans croisière sur la rivière ni montée à Nanshan.",
        ],
      ],
    },
    {
      id: "two-complete-days-terrain",
      type: "paragraph",
      text: "Descendre évite de grimper, mais les marches restent dures pour les genoux. Si les escaliers vous sont difficiles, renoncez à descendre Shibati et Danzishi en entier ; promenez-vous sur un seul niveau dont vous savez qu’il est sans marches, prenez une voiture entre les étapes et regardez la rivière assis. Ne supposez pas qu’un ascenseur indiqué sur une carte fonctionne ou relie les deux entrées dont vous avez besoin. La galerie de l’urbanisme ferme en général le lundi : inversez les journées, ou consacrez le lundi à Danzishi, à un long déjeuner et au bord de la rivière. Par pluie continue ou forte chaleur, écourtez les parties en extérieur.",
    },
  ],
  sources: {
    "https://www.cq.gov.cn/ywdt/bmts/202512/t20251222_15262188.html": {
      publisher: "Gouvernement municipal de Chongqing",
      label: "Organisation des terminaux passagers de l’aéroport de Chongqing",
    },
    "https://www.cq.gov.cn/ywdt/jrcq/202606/t20260626_15778151.html": {
      publisher: "Gouvernement municipal de Chongqing",
      label: "Rôles des gares de Chongqing dans les horaires ferroviaires du 3e trimestre 2026",
    },
    "https://www.cq.gov.cn/ywdt/bmts/202507/t20250728_14853868.html": {
      publisher: "Gouvernement municipal de Chongqing",
      label: "Accès à la gare de Chongqing Est par la ligne 6",
    },
    "https://www.cq.gov.cn/ywdt/bmts/202206/t20220615_10817239.html": {
      publisher: "Gouvernement municipal de Chongqing",
      label: "Suspension du service voyageurs à la gare de Chongqing",
    },
  },
  guides: {
    "chengdu-chongqing-zhangjiajie-itinerary": "Chengdu, Chongqing, Zhangjiajie",
    "chongqing-upper-lower-city-orientation": "Lire les niveaux des rues de Chongqing",
    "chongqing-where-to-stay-jiefangbei-guanyinqiao-shapingba": "Chongqing : trois quartiers où loger",
    "china-tiankeng-sinkholes-explained": "Comprendre les tiankeng de Chine",
    "sichuan-opera-face-changing-with-context": "Voir l’opéra du Sichuan en contexte",
    "chongqing-railway-station-selector": "Choisir une gare à Chongqing",
  },
};

export default content;
