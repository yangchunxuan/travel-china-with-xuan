import type { DestinationEditionCityContent } from "../../../lib/destinationEditionContent";

/** Shanghai in French, translated from the English city page with every fact as it states it. */
const content: DestinationEditionCityContent = {
  title: "Guide de voyage à Shanghai : 4 nuits et où loger",
  h1: "Shanghai : le Bund au crépuscule, vieilles ruelles et gratte-ciel, sur quatre nuits",
  description:
    "Accordez quatre nuits à Shanghai pour le Bund au crépuscule, le jardin Yu et les vieilles ruelles. Où loger, Pudong ou Hongqiao, et pourquoi Hangzhou vient ensuite.",
  summary:
    "Flânez dans le jardin Yu et les ruelles marchandes de la vieille ville, puis continuez à pied jusqu’au Bund quand la lumière baisse. Les banques de pierre centenaires se dressent derrière vous, les tours de verre de Pudong s’élèvent de l’autre côté du fleuve, puis les deux rives s’illuminent. Consacrez une autre journée aux rues arborées de l’ancienne concession française, avec leurs maisons de ruelle, leurs boutiques et leurs cafés. Les jours d’arrivée et de départ passent surtout en trajets : quatre nuits vous laissent donc trois journées complètes, et une sortie à Disneyland ou à Suzhou en occupe une entière.",
  heroAlt:
    "Deux ponts franchissent la rivière Suzhou au crépuscule, avec d’anciens bâtiments de Puxi au premier plan et, au-delà, la tour de la Perle de l’Orient et la tour de Shanghai.",
  heroCaption:
    "D’anciens bâtiments de Puxi bordent la rivière Suzhou, avec au-delà la tour de la Perle de l’Orient et la tour de Shanghai. Suivez la rivière jusqu’au Huangpu, puis descendez le Bund vers le sud à l’heure où les lumières s’allument.",
  geography: {
    title: "Les sites de Shanghai, sur les deux rives du Huangpu",
    caption:
      "Schéma sans échelle. La plupart des journées d’un premier séjour se passent à l’ouest du fleuve, à Puxi ; Disneyland demande une journée entière à lui seul.",
    legend: {
      core: "Centre-ville",
      cluster: "Une demi-journée ou plus",
      outside: "Une journée entière",
      gateway: "Aéroports et gare",
    },
    nodes: {
      bund: { label: "Le Bund", note: "Promenade au bord du fleuve ; idéale du crépuscule à la nuit" },
      oldcity: { label: "Vieille ville · jardin Yu", note: "Jardin et ruelles marchandes ; continuez à pied jusqu’au Bund" },
      square: { label: "Place du Peuple · rue de Nanjing Est", note: "Nœud du métro ; rue commerçante jusqu’au Bund" },
      jingan: { label: "Jing’an · ancienne concession française", note: "Rues arborées, maisons de ruelle, cafés" },
      lujiazui: { label: "Lujiazui", note: "Au milieu des tours, face au Bund" },
      hongqiao: { label: "Pôle de Hongqiao", note: "Loin à l’ouest ; aéroport SHA et gare à grande vitesse" },
      pvg: { label: "PVG", note: "À l’est ; la plupart des vols long-courriers y atterrissent" },
      disney: { label: "Disneyland", note: "Une journée entière ; impossible à caser dans une soirée" },
    },
  },
  overview: {
    nights: {
      answer: "Quatre nuits vous laissent trois journées complètes.",
      detail:
        "Les jours d’arrivée et de départ passent surtout en trajets. Trois nuits laissent encore deux journées complètes : l’une pour le Bund, la vieille ville et le jardin Yu, l’autre pour la place du Peuple avec Jing’an ou Lujiazui. Disneyland ou une sortie à Suzhou prend une journée entière : ajoutez une nuit si vous voulez garder trois journées en ville.",
    },
    stay: {
      answer: "Premier séjour ? Logez au centre de Puxi, autour de la place du Peuple.",
      detail:
        "Les lignes de métro s’y croisent, et la rue de Nanjing Est vous mène à pied jusqu’au Bund. Pour les rues arborées et les dîners en ville, essayez Jing’an ou l’ancienne concession française, mais vérifiez quelle station de métro est vraiment proche. Traversez le fleuve pour les tours de Lujiazui ; la plupart des journées d’un premier séjour se passent à Puxi.",
    },
    gateway: {
      answer: "Vérifiez vos billets : Pudong et Hongqiao sont aux deux extrémités de la ville.",
      detail:
        "La plupart des vols long-courriers atterrissent à Pudong (PVG), à l’est du centre. Loin à l’ouest, Hongqiao réunit le second aéroport (SHA) et la principale gare à grande vitesse, même si certains trains partent de la gare de Shanghai, plus proche de la place du Peuple. Après un long vol avec de gros bagages, un taxi est souvent plus simple que la ligne 2 du métro.",
    },
    next: {
      answer: "Hangzhou est l’étape suivante naturelle ; Suzhou se fait dans la journée.",
      detail:
        "À Hangzhou, le lac de l’Ouest, les collines de thé et le temple Lingyin sont dispersés, et le lac mérite d’être vu tôt le matin comme en fin de journée : restez au moins une nuit. Les incontournables de Suzhou sont plus rapprochés, et un jardin avec les vieilles rues font une belle journée au départ de Shanghai. Si Nanjing figure sur votre liste, accordez-lui son propre séjour.",
    },
  },
  opening: {
    heading: "Pourquoi un voyage en Chine mérite quelques jours à Shanghai",
    paragraphs: [
      "À Shanghai, l’ancien et le nouveau se font face de part et d’autre du Huangpu. La plupart des banques et des hôtels de pierre du Bund ont été construits il y a environ un siècle, et toutes les tours de la rive opposée ont surgi depuis 1990. Prenez le ferry public avec les gens qui vont travailler, retournez-vous sur le pont, et tout le Bund se déploie derrière vous. Montez ensuite dans la tour de Shanghai : l’ascenseur grimpe 546 mètres en moins d’une minute, et même les autres gratte-ciel restent sous vos pieds.",
      "Shanghai convient au début comme à la fin d’un voyage en Chine. La plupart des vols long-courriers vers la ville atterrissent à Pudong, et quelques nuits dans le même hôtel vous laissent prendre vos marques avant qu’un train à grande vitesse vous emmène à Hangzhou ou à Suzhou. Placée à la fin, elle vous offre un large choix de vols retour. Quand c’est possible, arrivez par une ville et repartez par une autre, Pékin et Shanghai par exemple, pour ne pas revenir sur vos pas.",
    ],
  },
  stayExample: [
    { id: "five-day-heading", type: "heading", level: 2, text: "Un itinéraire de cinq jours à Shanghai" },
    {
      id: "five-day-intro",
      type: "paragraph",
      text: "L’arrivée et le départ passent surtout en trajets : quatre nuits laissent donc trois journées complètes, deux en ville et une excursion. Organisez-les en fonction de vos vols et de vos réservations.",
    },
    {
      id: "five-day-plan",
      type: "list",
      ordered: true,
      items: [
        "Arrivée et repos, avec une petite promenade dans le quartier si vous en avez l’énergie.",
        "Flânez dans le jardin Yu et les ruelles de la vieille ville, puis rejoignez le Bund au crépuscule pour voir les deux rives s’illuminer. L’entrée du jardin est payante ; vérifiez d’abord les conditions d’accès.",
        "Associez un musée aux rues arborées de l’ancienne concession française, ou traversez en ferry et regardez le Bund depuis Lujiazui. Les deux sites du musée de Shanghai ferment des jours différents ; vérifiez avant d’y aller.",
        "Choisissez une option : un jardin de Suzhou et les vieilles rues au bord des canaux, le bourg d’eau de Zhujiajiao, ou une journée entière à Disneyland. Pour Suzhou, comptez le temps d’aller aux gares et d’en revenir.",
        "Libérez la chambre en gardant une bonne marge : Pudong et Hongqiao sont aux deux extrémités de la ville.",
      ],
    },
    {
      id: "five-full-days",
      type: "paragraph",
      text: "Avec cinq journées complètes en plus de l’arrivée et du départ, accordez-en trois à la ville, une à Suzhou ou à Zhujiajiao, et gardez-en une pour la pluie, la fatigue ou Disneyland. Pour ajouter Hangzhou, prévoyez d’y dormir.",
    },
  ],
  dayTripLinks: {
    title: "Excursions d’une journée depuis Shanghai",
    items: [
      { label: "De Shanghai à Suzhou dans la journée", description: "Choisissez les gares, une journée ciblée à Suzhou et un retour réaliste." },
      { label: "De Shanghai à Hangzhou en train", description: "Comparez les couples de gares avant de choisir entre l’aller-retour dans la journée et une nuit sur place." },
    ],
  },
  sources: {
    "https://english.shanghai.gov.cn/en-Transportation/20241231/f66f14bbd4b549ab88e6f3aec375790c.html": {
      publisher: "Gouvernement municipal de Shanghai ; source : métro de Shanghai",
      label: "Stations, correspondances et informations de trajet de l’Airport Link",
    },
    "https://english.shanghai.gov.cn/en-Transportation/20231214/649e06ea38f74aaeb573fa2debbe97d3.html": {
      publisher: "Gouvernement municipal de Shanghai ; source : Shanghai Airport Authority",
      label: "Rôles de Pudong et de Hongqiao, terminaux, métro, taxi et liaisons entre les deux aéroports",
    },
    "https://www.shanghaidisneyresort.com/en/information/transportation": {
      publisher: "Shanghai Disney Resort",
      label: "Shanghai Disney Resort — informations officielles sur les transports",
    },
    "https://www.shanghai.gov.cn/xbhygq/20240514/45ef2426bf66467d96a2a2927cf53579.html": {
      publisher: "Gouvernement municipal de Shanghai",
      label: "La gare de Songjiang Sud renommée Shanghai Songjiang à partir du 22 mai 2024",
    },
  },
  guides: {
    "china-10-day-itinerary": "La Chine en 10 jours",
    "shanghai-where-to-stay-first-trip": "Quartiers pour un premier séjour à Shanghai",
    "shanghai-pudong-or-hongqiao-airport": "Aéroport de Pudong ou de Hongqiao ?",
    "pudong-airport-to-shanghai-disneyland": "De l’aéroport de Pudong à Shanghai Disneyland",
    "shanghai-hangzhou-transport-route": "De Shanghai à Hangzhou",
    "shanghai-suzhou-hangzhou-nanjing-route-order": "Dans quel ordre visiter le delta du Yangtsé",
  },
};

export default content;
