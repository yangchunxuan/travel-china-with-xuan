import type { DestinationEditionCityContent } from "../../../lib/destinationEditionContent";

/** Zhangjiajie in French, translated from the English city page with every fact as it states it. */
const content: DestinationEditionCityContent = {
  title: "Guide de voyage à Zhangjiajie : 4 à 5 nuits et où loger",
  h1: "Zhangjiajie : des piliers de grès dans les nuages, sur quatre ou cinq nuits",
  description:
    "Accordez quatre ou cinq nuits à Zhangjiajie pour les piliers de grès et le mont Tianmen. Où loger, quel aéroport et quelle gare choisir, et où aller ensuite.",
  summary:
    "Avancez jusqu’au bord du plateau à Yuanjiajie, et le sol se dérobe. Des centaines de piliers de grès jaillissent à pic de la forêt en contrebas, des pins accrochés à leur sommet. Descendez ensuite au ruisseau du Fouet d’or pour marcher au fond de la vallée, en les regardant d’en bas. Un autre jour, gravissez les 999 marches du mont Tianmen jusqu’à une ouverture qui traverse la falaise de part en part. Le parc forestier mérite deux jours, et Tianmen un. Quatre nuits vous donnent ces trois journées complètes ; cinq en laissent une de réserve au cas où le brouillard cacherait la vue.",
  heroAlt:
    "De hauts piliers de grès gris et fauves coiffés d’arbres, avec une brume blanche qui flotte entre eux, dans le parc forestier national de Zhangjiajie.",
  heroCaption:
    "Après la pluie, les nuages montent des vallées et dérivent entre les piliers : des colonnes entières disparaissent puis réapparaissent sous vos yeux. Tentez votre chance un matin comme celui-ci au bord de Yuanjiajie ou du mont Tianzi.",
  geography: {
    title: "Les sites de Zhangjiajie se répartissent en trois zones",
    caption:
      "Schéma sans échelle. Tianmen, le parc forestier et le Grand Canyon sont éloignés les uns des autres : accordez à chacun sa propre journée. L’aéroport et la gare sont près de la ville.",
    legend: {
      core: "Ville de Zhangjiajie",
      cluster: "Une demi-journée ou plus",
      outside: "Une journée à lui seul",
      gateway: "Aéroport et gare",
    },
    nodes: {
      city: { label: "Ville de Zhangjiajie", note: "Près de Tianmen ; pratique après une arrivée tardive" },
      wulingyuan: { label: "Wulingyuan", note: "Près de la porte Est ; logez ici pour le parc" },
      yuanjiajie: { label: "Yuanjiajie", note: "Le pont de pierre et le pilier d’Avatar" },
      tianzi: { label: "Mont Tianzi", note: "La vue la plus large sur les piliers" },
      tianmen: { label: "Mont Tianmen", note: "L’arche et les sentiers à flanc de falaise ; une journée entière" },
      grandcanyon: { label: "Grand Canyon", note: "Le pont de verre, puis la descente vers les cascades" },
      dyg: { label: "Aéroport DYG", note: "Près de la ville ; à un trajet en voiture du parc" },
      weststation: { label: "Zhangjiajie Ouest", note: "Trains à grande vitesse, près de la ville" },
    },
  },
  overview: {
    nights: {
      answer: "Quatre ou cinq nuits vous laissent trois ou quatre journées complètes.",
      detail:
        "Les jours d’arrivée et de départ passent surtout en trajets. Trois journées complètes en donnent deux au parc forestier et une au mont Tianmen ; avec deux seulement, soit le parc se réduit à une journée, soit Tianmen saute. Une quatrième journée permet d’attendre que le brouillard se lève, de ralentir ou de voir le pont de verre du Grand Canyon.",
    },
    stay: {
      answer: "Logez à Wulingyuan, juste devant la porte Est du parc forestier.",
      detail:
        "Vous vous réveillez à côté du parc et pouvez franchir l’entrée tôt les deux jours de visite. L’aéroport, la gare et Tianmen sont tous près de la ville : dormez-y après une arrivée tardive, avant un départ matinal ou pour votre journée à Tianmen. Ne changez d’hôtel que si le trajet économisé vaut la peine de refaire vos bagages.",
    },
    gateway: {
      answer: "L’aéroport DYG et la gare de Zhangjiajie Ouest sont tous deux près de la ville.",
      detail:
        "Aucun des deux n’est au parc : une fois descendu de l’avion ou du train, il reste un trajet en voiture jusqu’à Wulingyuan. Vous arrivez tard ? Dormez en ville et partez le matin. Ayez le nom et l’adresse de votre hôtel en chinois sous la main, et ne montez que dans une voiture autorisée.",
    },
    next: {
      answer: "Après les montagnes, passez une nuit dans la vieille ville de Fenghuang.",
      detail:
        "Le trajet est un voyage en soi : ce n’est donc pas une escapade rapide pour une soirée. Arrivez pour la soirée, passez la nuit sur place et parcourez à nouveau la vieille ville le lendemain matin. Vous partez plutôt vers Pékin ou Shanghai ? Comparez avions et trains sur l’ensemble du trajet, de porte à porte.",
    },
  },
  opening: {
    heading: "Pourquoi Zhangjiajie ne ressemble à aucun autre lieu en Chine",
    paragraphs: [
      "Zhangjiajie est une forêt de pierre. Des milliers de piliers de grès s’élèvent de vallées boisées, et beaucoup dépassent la hauteur d’une tour de 60 étages. Vous pouvez traverser à pied un pont de pierre naturel à plus de 300 mètres au-dessus de la vallée et, par temps de brume, comprendre pourquoi un pilier a été rebaptisé d’après le film Avatar. Vers début novembre, les pentes du mont Tianzi virent en général au rouge et à l’or. Les jours humides, les nuages s’engouffrent dans la grande arche du mont Tianmen et se déversent de l’autre côté.",
      "Zhangjiajie est loin de Pékin comme de Shanghai, en avion comme en train : donnez-vous du temps. Si vous l’intercalez entre les deux, ne comptez que les jours que vous passerez dans les montagnes. Le vol ou le train pour venir, la route jusqu’à Wulingyuan et un éventuel changement d’hôtel s’y ajoutent. Pour un voyage très court en Chine, ne venez que si ces piliers sont ce que vous voulez voir avant tout. Gardez si possible une journée de réserve, pour qu’un seul jour de brouillard ne vous prive pas de la vue.",
    ],
  },
  sources: {
    "https://whc.unesco.org/en/list/640/": {
      publisher: "Centre du patrimoine mondial de l’UNESCO",
      label: "Région d’intérêt panoramique et historique de Wulingyuan",
    },
    "https://www.zjj.gov.cn/": {
      publisher: "Gouvernement populaire de la municipalité de Zhangjiajie",
      label: "Gouvernement municipal de Zhangjiajie",
    },
    "https://www.12306.cn/en/index.html": {
      publisher: "China Railway 12306",
      label: "Recherche par date sur China Railway 12306",
    },
    "https://www.caac.gov.cn/": {
      publisher: "Administration de l’aviation civile de Chine",
      label: "Identification de l’aéroport de Zhangjiajie Hehua",
    },
  },
  guides: {
    "chengdu-chongqing-zhangjiajie-itinerary": "Chengdu, Chongqing, Zhangjiajie",
    "zhangjiajie-itinerary": "Guide de Zhangjiajie",
    "avatar-mountains-zhangjiajie": "Les montagnes d’Avatar",
    "zhangjiajie-national-forest-park-tickets-and-entrances": "Parc de Zhangjiajie : billets et entrées",
    "zhangjiajie-city-or-wulingyuan-hotel-base": "Où loger à Zhangjiajie",
    "zhangjiajie-glass-bridge-vs-skywalk": "Le carnet de terrain de Tantan à Zhangjiajie",
  },
};

export default content;
