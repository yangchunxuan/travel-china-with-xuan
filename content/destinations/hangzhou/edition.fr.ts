import type { DestinationEditionCityContent } from "../../../lib/destinationEditionContent";

/** Hangzhou in French, translated from the English city page with every fact as it states it. */
const content: DestinationEditionCityContent = {
  title: "Guide de voyage à Hangzhou : 2 nuits ou une journée depuis Shanghai",
  h1: "Hangzhou : le lac de l’Ouest, Lingyin et les villages de thé de Longjing, sur deux nuits",
  description:
    "Accordez deux nuits à Hangzhou plutôt qu’une journée : le lac de l’Ouest à l’aube et au crépuscule, Lingyin et les villages de thé de Longjing. Où loger, quelle gare, et la suite.",
  summary:
    "Soyez tôt sur la digue Su, quand la brume flotte encore sur l’eau et que les saules y laissent traîner leurs branches. Partez en bateau jusqu’aux trois petites pagodes de pierre représentées au dos du billet de un yuan. Consacrez une matinée à Lingyin, où un ruisseau limpide coule au pied d’une falaise couverte de bouddhas sculptés, puis arrêtez-vous dans les villages de Longjing pour un thé cultivé sur les pentes qui vous entourent. Une journée depuis Shanghai ne peut pas tout contenir : deux nuits vous offrent aussi le lac au crépuscule et à l’aube.",
  heroAlt: "Des petits bateaux traversent le lac de l’Ouest à Hangzhou, sous des collines boisées et la brume.",
  heroCaption:
    "Des petits bateaux traversent le lac de l’Ouest au pied de collines basses et boisées. Quand la rive devient trop fréquentée, partez vers l’ouest, au pied des collines, où la foule se disperse entre les bras d’eau et les bois.",
  geography: {
    title: "Autour du lac de l’Ouest, et deux lieux plus au nord",
    caption:
      "Schéma sans échelle. Découvrez le lac une rive à la fois ; Liangzhu, à environ 25 km au nord-ouest, demande une journée entière à lui seul.",
    legend: {
      core: "Centre-ville au bord du lac",
      cluster: "Une demi-journée ou plus",
      outside: "Une journée entière",
      gateway: "Aéroport et gare",
    },
    nodes: {
      east: { label: "Hubin · rive est", note: "Hôtels, dîners et promenades du soir au bord du lac" },
      north: { label: "Beishan · rive nord", note: "Digue Bai, pont Brisé et Gushan" },
      south: { label: "Rive sud · pagode Leifeng", note: "Montez dans la pagode pour voir tout le lac à vos pieds" },
      west: { label: "Lingyin · Longjing", note: "Bouddhas sculptés, encens et villages de thé" },
      canal: { label: "Grand Canal", note: "Une voie d’eau en activité, au nord de la ville" },
      liangzhu: { label: "Liangzhu", note: "Une cité vieille de 5 000 ans au milieu des rizières" },
      hgh: { label: "Aéroport HGH", note: "À Xiaoshan, hors du centre de Hangzhou" },
      eaststation: { label: "Hangzhou Est", note: "Souvent le plus de trains, dont beaucoup pour Shanghai" },
    },
  },
  overview: {
    nights: {
      answer: "Deux nuits vous offrent le lac au crépuscule et à l’aube, ainsi que les collines de l’ouest.",
      detail:
        "Une journée depuis Shanghai permet une portion du lac, un autre arrêt et le train du retour. Deux nuits vous laissent longer la rive le soir puis tôt le lendemain matin, avec encore du temps pour Lingyin ou les villages de thé de Longjing. N’ajoutez une troisième nuit que si Liangzhu ou le Grand Canal est la raison de votre venue.",
    },
    stay: {
      answer: "Premier séjour ? Logez sur la rive est du lac de l’Ouest, autour de Hubin.",
      detail:
        "C’est là que la ville rejoint le lac : hôtels, boutiques et restaurants sont proches, et la rive est juste là pour une promenade du soir. C’est aussi le côté le plus fréquenté, et les chambres avec vue sur le lac sont souvent chères pour ce qu’elles offrent. Pour le calme, regardez du côté de Lingyin et de Longjing, mais attendez-vous à moins de liaisons en métro et à des routes de colline chargées.",
    },
    gateway: {
      answer: "Vérifiez la gare indiquée sur votre billet ; Hangzhou Ouest n’est pas près du lac.",
      detail:
        "Hangzhou compte l’aéroport de Xiaoshan (HGH) et quatre grandes gares : Hangzhou, Est, Ouest et Sud. La gare Est a souvent le plus de trains, dont beaucoup pour Shanghai, mais de là, il faut traverser la ville pour rejoindre le lac. Pour une journée depuis Shanghai, choisissez votre train de retour avant de réserver celui de l’aller.",
    },
    next: {
      answer: "Shanghai est le partenaire naturel ; allez à Suzhou pour les jardins et les canaux.",
      detail:
        "Des trains rapides relient les deux villes, et c’est à Shanghai que commencent et finissent de nombreux voyages dans cette partie de la Chine. Suzhou est une ville distincte, qui mérite sa propre étape pour ses jardins et ses canaux. Vous repartez de Shanghai en avion ? Vérifiez s’il s’agit de Pudong ou de Hongqiao, car le trajet depuis Hangzhou n’est pas le même pour l’un et pour l’autre.",
    },
  },
  opening: {
    heading: "Pourquoi Hangzhou mérite plus qu’une journée depuis Shanghai",
    paragraphs: [
      "À Hangzhou, la ville descend jusqu’à l’eau. Le lac de l’Ouest n’a ni billet ni portail, et toute sa rive, longue d’environ 15 kilomètres, est ouverte jour et nuit. Le poète Su Dongpo fit draguer la vase du fond du lac pour l’entasser en une digue plantée de saules et de pêchers, qui porte son nom. Les collines sont basses et le paysage tout en douceur, et c’est ce calme qui fait tout. Partez vers l’ouest dans ces collines : l’encens flotte sur les cours de Lingyin, et le thé pousse sur les pentes autour de Longjing.",
      "Le train rapide depuis Shanghai fait passer Hangzhou pour une excursion facile. Pourtant, le trajet n’est qu’une partie de la journée : il faut encore aller de la gare au lac, puis revenir à temps pour votre train. Si le lac de l’Ouest vous suffit, une journée fera l’affaire. Restez, et vous pourrez longer la rive le soir puis tôt le lendemain matin. Et si un vol depuis l’aéroport de Hangzhou convient à votre itinéraire, vous n’aurez même pas à repasser par Shanghai.",
    ],
  },
  sources: {
    "https://whc.unesco.org/en/list/1334/": {
      publisher: "Centre du patrimoine mondial de l’UNESCO",
      label: "Paysage culturel du lac de l’Ouest de Hangzhou",
    },
    "https://westlake.hangzhou.gov.cn/": {
      publisher: "Comité de gestion de la zone pittoresque du lac de l’Ouest de Hangzhou",
      label: "Autorité de la zone pittoresque du lac de l’Ouest et avis en vigueur",
    },
    "https://www.hzairport.com/en/guide/metro.html": {
      publisher: "Aéroport international de Hangzhou Xiaoshan",
      label: "Accès en métro à l’aéroport HGH",
    },
    "https://www.12306.cn/en/index.html": {
      publisher: "China Railway 12306",
      label: "Recherche par date sur China Railway 12306",
    },
  },
  guides: {
    "shanghai-hangzhou-transport-route": "De Shanghai à Hangzhou",
    "shanghai-suzhou-hangzhou-nanjing-route-order": "Dans quel ordre visiter le delta du Yangtsé",
    "liangzhu-ruins-park-and-museum-sequence": "Liangzhu : musée et parc",
    "white-snake-legend-hangzhou-zhenjiang": "Le Serpent blanc : Hangzhou ou Zhenjiang",
    "grand-canal-everyday-urban-history": "La vie au fil du Grand Canal",
    "tea-landscape-regions-of-china": "Comparer quatre paysages de thé",
  },
};

export default content;
