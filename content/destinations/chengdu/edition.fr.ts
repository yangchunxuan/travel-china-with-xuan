import type { DestinationEditionCityContent } from "../../../lib/destinationEditionContent";

/** Chengdu in French, translated from the English city page with every fact as it states it. */
const content: DestinationEditionCityContent = {
  title: "Guide de voyage à Chengdu : 3 nuits et où loger",
  h1: "Chengdu : pandas, maisons de thé et fondue du Sichuan, sur trois nuits",
  description:
    "Accordez trois nuits à Chengdu pour les pandas, le thé au parc du Peuple et la fondue du Sichuan. Où loger, Tianfu ou Shuangliu, et pourquoi Chongqing vient ensuite.",
  summary:
    "Soyez à la base des pandas dès l’ouverture des portes. Au détour d’un sentier, vous tomberez peut-être sur un panda géant adossé à un tronc comme une personne, en train de venir à bout d’une tige de bambou tenue à deux pattes. Un autre matin, prenez place sur une chaise en bambou dans une maison de thé du parc du Peuple et laissez filer une heure ou deux, puis terminez la journée autour d’une fondue. Les pandas occupent à eux seuls une matinée : trois nuits vous laissent donc deux journées complètes, une pour chacun, sans courir.",
  heroAlt:
    "Des gens boivent du thé sur des chaises en bambou sous un pavillon de bois couvert, orné de lanternes rouges, dans une maison de thé du parc du Peuple de Chengdu.",
  heroCaption:
    "Prenez le temps de boire votre thé, et la vie du parc défile devant votre table. Dans ce parc, à la maison de thé Heming, centenaire, on peut même se faire nettoyer les oreilles, si l’on ose.",
  geography: {
    title: "Les sites de Chengdu, et trois villes au-delà",
    caption:
      "Schéma sans échelle. La base des pandas est en bordure de la ville ; Dujiangyan, Sanxingdui et Leshan sont d’autres villes, chacune à une journée entière.",
    legend: {
      core: "Centre-ville",
      cluster: "Une demi-journée ou plus",
      outside: "Une journée entière hors de la ville",
      gateway: "Aéroports et gare",
    },
    nodes: {
      centre: { label: "Parc du Peuple · place Tianfu", note: "Thé au parc, musées, promenades au centre" },
      panda: { label: "Base des pandas de Chengdu", note: "En bordure de la ville ; une matinée, de préférence à l’ouverture" },
      wuhou: { label: "Temple Wuhou · Jinli", note: "Temple des Trois Royaumes, boutiques à côté" },
      dujiangyan: { label: "Dujiangyan · vallée des pandas", note: "Une autre ville, à l’ouest ; une journée entière" },
      sanxingdui: { label: "Sanxingdui, Guanghan", note: "Visages de bronze, au nord-est ; une journée entière" },
      leshan: { label: "Leshan", note: "Le Grand Bouddha, au sud ; une longue journée" },
      tfu: { label: "Aéroport TFU de Tianfu", note: "Loin au sud-est ; un long trajet jusqu’au centre" },
      ctu: { label: "Aéroport CTU de Shuangliu", note: "Au sud-ouest ; en général plus proche du centre" },
      east: { label: "Chengdu Est", note: "Beaucoup de trains à grande vitesse ; vérifiez votre billet" },
    },
  },
  overview: {
    nights: {
      answer: "Trois nuits vous laissent deux journées complètes en ville.",
      detail:
        "Si vous atterrissez le soir, la première journée se résume au dîner. Trois nuits offrent aux pandas une matinée à eux, et au thé du parc du Peuple et au temple Wuhou une autre journée. Ajoutez l’opéra du Sichuan le soir s’il vous reste de l’énergie. Une quatrième nuit permet une excursion d’une journée, à Sanxingdui, à Dujiangyan ou à Leshan.",
    },
    stay: {
      answer: "Premier séjour ? Logez autour de la rue Chunxi et de Taikoo Li.",
      detail:
        "Les dîners et les rues animées du soir sont à votre porte, le temple Daci est tout près et le métro part dans plusieurs directions. Un hôtel « près de Taikoo Li » peut avoir son entrée au fond d’un centre commercial : vérifiez le trajet à pied depuis le métro et l’endroit où une voiture peut s’arrêter. Pour des matinées tranquilles dans les maisons de thé, regardez du côté des ruelles Kuanzhai ou du parc du Peuple.",
    },
    gateway: {
      answer: "Vérifiez si votre billet indique Tianfu ou Shuangliu, puis prévoyez le trajet.",
      detail:
        "Tianfu se trouve loin au sud-est, à un long trajet du centre même avec la ligne 18 du métro ; Shuangliu, au sud-ouest, est en général plus proche du centre. Des vols passent d’un aéroport à l’autre : vérifiez à nouveau peu avant de partir. Beaucoup de trains à grande vitesse partent de Chengdu Est, mais Chengdu Sud et Chengdu Ouest sont des gares distinctes.",
    },
    next: {
      answer: "Chongqing est l’étape suivante naturelle, plus escarpée et plus rapide que Chengdu.",
      detail:
        "Après des journées lentes entre maisons de thé et longs repas, le contraste est justement la raison d’y aller. Pour voir davantage le Sichuan, dormez plutôt une nuit à Leshan ou à Dujiangyan, pour que l’excursion ne tourne pas à la course. Jiuzhaigou, dans les montagnes loin au nord, demande plusieurs jours et ses propres nuits sur place.",
    },
  },
  opening: {
    heading: "Pourquoi Chengdu est l’étape où un voyage en Chine ralentit",
    paragraphs: [
      "Chengdu est une ville immense qui vous laisse pourtant prendre votre temps. Le thé au parc du Peuple peut occuper une fin de matinée, et un long déjeuner s’étirer jusque dans l’après-midi. Autour du temple Daci, un vieux temple se dresse au milieu des boutiques d’aujourd’hui, et au temple Wuhou, vous pouvez suivre l’histoire des Trois Royaumes. Au crépuscule, marchez jusqu’à un pont couvert sur la rivière Jin, regardez les tours de bureaux se refléter dans l’eau, et laissez une fondue occuper toute votre soirée.",
      "Après Pékin ou Xi’an, Chengdu tourne le voyage vers la vie quotidienne, la cuisine du Sichuan et les paysages au-delà de la ville. Accordez-lui au moins trois nuits, pour que les pandas et les maisons de thé aient chacun leur journée. Glissée dans un voyage serré entre Pékin, Xi’an et Shanghai juste pour une photo de panda, elle peut devenir un détour coûteux.",
    ],
  },
  stayExample: [
    { id: "first-stay-plan-heading", type: "heading", level: 2, text: "Votre premier séjour à Chengdu : trois nuits, quatre jours" },
    {
      id: "first-stay-plan-intro",
      type: "paragraph",
      text: "Arrivez le premier jour et repartez le quatrième, avec deux journées complètes entre les deux. Accordez-en une aux pandas, l’autre au thé du parc du Peuple et au temple Wuhou.",
    },
    {
      id: "first-stay-plan",
      type: "list",
      items: [
        "Jour 1 — Installez-vous dans un hôtel du centre et dînez à proximité. Si vous atterrissez le soir, le dîner résume la journée : ne payez pas d’avance un spectacle qui suppose un vol à l’heure.",
        "Jour 2 — Rendez-vous à la base des pandas à votre créneau d’entrée du matin et regardez les pandas prendre leur petit-déjeuner, le bambou entre les deux pattes. La visite et le trajet aller-retour suffisent pour la journée : déjeunez en ville et prenez l’après-midi tranquillement.",
        "Jour 3 — Commencez par un thé sur une chaise en bambou dans une maison de thé du parc du Peuple, puis laissez au temple Wuhou le temps de raconter son histoire des Trois Royaumes. Commandez une fondue aussi épicée que votre groupe l’apprécie, et n’ajoutez l’opéra du Sichuan que s’il vous reste de l’énergie et que le théâtre n’est pas loin.",
        "Jour 4 — Libérez la chambre et poursuivez votre route. Vérifiez d’abord le temps qu’il faut pour rejoindre l’aéroport ou la gare exacts indiqués sur votre billet ; n’ajoutez un petit-déjeuner ou une courte promenade que s’il reste du temps.",
      ],
    },
    {
      id: "first-stay-plan-extra-night",
      type: "paragraph",
      text: "Une quatrième nuit ajoute une troisième journée complète. Gardez les deux journées en ville et ajoutez une excursion à Sanxingdui, à Dujiangyan ou à Leshan, après avoir lu le guide correspondant ci-dessous. Avec deux nuits, gardez la matinée des pandas et une journée en ville, et laissez les excursions pour une prochaine fois. Si vous n’obtenez pas d’entrée du matin pour les pandas le jour 2, inversez les jours 2 et 3 ; ne tassez pas les deux dans un seul après-midi.",
    },
  ],
  sources: {
    "https://www.wuhouci.net.cn/about": {
      publisher: "Musée du temple Wuhou de Chengdu",
      label: "Musée du temple Wuhou — le temple et son contexte des Trois Royaumes",
    },
    "https://www.panda.org.cn/en/service/ticket/": {
      publisher: "Base de recherche sur l’élevage du panda géant de Chengdu",
      label: "Base de recherche sur l’élevage du panda géant de Chengdu — billets, créneaux d’entrée et règles sur les documents",
    },
    "https://m.panda.org.cn/cn/news/notice/2026-07-16/8879.html": {
      publisher: "Base de recherche sur l’élevage du panda géant de Chengdu",
      label: "Base des pandas de Chengdu — avis officiel sur la chaleur estivale et l’observation en intérieur",
    },
    "https://m.panda.org.cn/en/service/transit/": {
      publisher: "Base de recherche sur l’élevage du panda géant de Chengdu",
      label: "Base des pandas de Chengdu — indications officielles pour les transports en commun",
    },
  },
  guides: {
    "chengdu-chongqing-zhangjiajie-itinerary": "Chengdu, Chongqing, Zhangjiajie",
    "chengdu-panda-base-or-dujiangyan-panda-valley": "Base des pandas de Chengdu ou vallée des pandas",
    "sanxingdui-museum-booking-and-gallery-order": "Sanxingdui : réservation et parcours",
    "chengdu-jiuzhaigou-transport-route": "De Chengdu à Jiuzhaigou",
    "leshan-giant-buddha-land-or-boat-visit": "Leshan à pied ou en bateau",
    "chengdu-greenway-city-ring": "Choisir une section de la voie verte de Chengdu",
  },
};

export default content;
