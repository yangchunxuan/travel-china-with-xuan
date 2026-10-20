import type { DestinationEditionCityContent } from "../../../lib/destinationEditionContent";

/** Beijing in French, translated from the English city page with every fact as it states it. */
const content: DestinationEditionCityContent = {
  title: "Guide de voyage à Pékin : 4 à 5 nuits et où loger",
  h1: "Pékin : palais, Grande Muraille et hutongs, sur quatre ou cinq nuits",
  description:
    "Accordez quatre ou cinq nuits à Pékin : la Cité interdite, la Grande Muraille, les hutongs. Où loger, quel aéroport et quelle gare choisir, et où aller ensuite.",
  summary:
    "Marchez vers le nord depuis Tiananmen à travers la Cité interdite, montez sur la colline de Jingshan, et tout un champ de toits aux tuiles dorées s’étend sous vos pieds. Consacrez une autre journée à la Grande Muraille, sur ses crêtes montagneuses hors de la ville, et passez vos soirées à dîner et à flâner dans les hutongs autour de la tour du Tambour. Chacun des grands sites de Pékin demande d’une demi-journée à une journée entière : quatre ou cinq nuits vous laissent donc trois ou quatre vraies journées, sans courir.",
  heroAlt:
    "La tour du Tambour et la tour de la Cloche de Pékin au-dessus des toits de tuiles grises des hutongs, avec une ruelle animée à droite.",
  heroCaption:
    "Au pied de la tour du Tambour et de la tour de la Cloche, les hutongs aux tuiles grises s’étendent dans toutes les directions. Venez en fin d’après-midi, dînez dans les ruelles, puis rejoignez à pied, en quelques minutes, les lacs de Shichahai.",
  geography: {
    title: "Les sites de Pékin se répartissent dans cinq directions",
    caption:
      "Schéma sans échelle. Les sites d’une même direction tiennent dans une même journée ; la Grande Muraille demande une journée entière à elle seule.",
    legend: {
      core: "Centre-ville",
      cluster: "Une demi-journée ou plus",
      outside: "Une journée entière",
      gateway: "Aéroport",
    },
    nodes: {
      axis: { label: "Tiananmen · Cité interdite · Jingshan", note: "Une journée entière, à pied du sud vers le nord" },
      south: { label: "Qianmen · temple du Ciel", note: "D’une demi-journée à une journée entière" },
      northwest: { label: "Palais d’Été · nord-ouest", note: "Au moins une demi-journée, souvent presque une journée" },
      gulou: { label: "Gulou · Shichahai", note: "Balades dans les hutongs et dîners" },
      chaoyang: { label: "Chaoyang · CBD", note: "Dîners, sorties, pratique après un vol tardif" },
      wall: { label: "Grande Muraille", note: "L’aller-retour prend toute la journée ; n’ajoutez rien d’autre" },
      pek: { label: "PEK", note: "Au nord-est ; train de l’aéroport jusqu’à Dongzhimen" },
      pkx: { label: "PKX", note: "Loin au sud ; train de l’aéroport jusqu’à Caoqiao" },
    },
  },
  overview: {
    nights: {
      answer: "Quatre ou cinq nuits vous laissent trois ou quatre journées complètes.",
      detail:
        "Les jours d’arrivée et de départ passent surtout en trajets. Trois nuits suffisent encore pour la Cité interdite et la Grande Muraille, mais le Palais d’Été saute en général, et si une réservation échoue, il ne reste aucune journée libre pour la reporter.",
    },
    stay: {
      answer: "Premier séjour ? Logez du côté de Wangfujing ou de Dongdan.",
      detail:
        "La Cité interdite est proche, les lignes de métro partent dans toutes les directions et l’on trouve facilement où dîner. Pour un hôtel à cour carrée dans les hutongs, cherchez autour de Gulou et de Shichahai, mais demandez d’abord s’il y a un ascenseur et si une voiture peut arriver jusqu’à la porte.",
    },
    gateway: {
      answer: "Vérifiez l’aéroport et la gare indiqués sur vos billets, puis réservez l’hôtel.",
      detail:
        "Pékin compte deux aéroports, Capitale et Daxing, et huit grandes gares, toutes très éloignées les unes des autres. Vous atterrissez tard à Capitale ? Passez la première nuit près de Dongzhimen. Les trains pour Shanghai partent souvent de Pékin Sud, ceux pour Xi’an souvent de Pékin Ouest. Ne prévoyez aucun grand site le jour de votre départ.",
    },
    next: {
      answer: "Xi’an est la suite la plus naturelle ; Shanghai, le plus grand contraste.",
      detail:
        "Un train à grande vitesse vous emmène à Xi’an pour l’armée de terre cuite et les anciens remparts. Shanghai remplace la vieille capitale par les gratte-ciel. Avec assez de temps, Pékin, Xi’an et Shanghai s’enchaînent sur une seule ligne en train à grande vitesse.",
    },
  },
  opening: {
    heading: "Pourquoi tant de premiers voyages en Chine commencent à Pékin",
    paragraphs: [
      "Une seule ville réunit un palais impérial, la Grande Muraille, les ruelles des hutongs et des tours de verre. Vous pouvez passer la matinée dans les cours où vivaient les empereurs, dîner dans un hutong et finir la soirée du côté de Guomao ou de Sanlitun, dans le Pékin d’aujourd’hui.",
      "Commencer ici a un autre avantage. Quelques jours dans le même hôtel vous laissent le temps de récupérer du décalage horaire et de comprendre comment la Chine fonctionne sur place : réserver les sites avec votre passeport, prendre le métro, mesurer ce que l’on marche dans les grands sites. Chaque ville suivante paraît ensuite plus simple. Si Pékin vient en dernier, n’enchaînez pas une arrivée depuis une autre ville, une journée à la Grande Muraille et un vol international tôt le matin : au premier retard, tout ce qui suit s’effondre.",
    ],
  },
  sources: {
    "https://www.beijing.gov.cn/ywdt/gzdt/202512/t20251229_4374283.html": {
      publisher: "Gouvernement municipal de Pékin",
      label: "Le réseau de huit gares et deux aéroports de Pékin après l’ouverture de Tongzhou",
    },
    "https://english.beijing.gov.cn/livinginbeijing/transportation/railway/202512/t20251231_4381067.html": {
      publisher: "Gouvernement municipal de Pékin",
      label: "La gare de Pékin Tongzhou a ouvert au service voyageurs le 30 décembre 2025",
    },
    "https://english.beijing.gov.cn/livinginbeijing/transportation/airport/202005/t20200516_1899219.html": {
      publisher: "Gouvernement municipal de Pékin",
      label: "Le trajet de l’Airport Express de Capitale par Sanyuanqiao et Dongzhimen",
    },
    "https://english.beijing.gov.cn/travellinginbeijing/transportation/airport/202005/t20200516_1899220.html": {
      publisher: "Gouvernement municipal de Pékin",
      label: "Le trajet de l’Airport Express de Daxing jusqu’à Caoqiao",
    },
  },
  guides: {
    "china-10-day-itinerary": "La Chine en 10 jours",
    "beijing-where-to-stay-first-trip": "Où loger à Pékin",
    "beijing-courtyard-hotel-or-modern-hotel": "Hôtel à cour carrée ou hôtel moderne",
    "which-beijing-railway-station": "Quelle gare à Pékin ?",
    "beijing-south-station-to-capital-or-daxing-airport": "De Pékin Sud à PEK ou PKX",
    "great-wall-section-selector-from-beijing": "Quelle section de la Grande Muraille ?",
  },
};

export default content;
