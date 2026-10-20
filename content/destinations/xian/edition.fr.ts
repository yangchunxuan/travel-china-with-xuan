import type { DestinationEditionCityContent } from "../../../lib/destinationEditionContent";

/** Xi'an in French, translated from the English city page with every fact as it states it. */
const content: DestinationEditionCityContent = {
  title: "Guide de voyage à Xi’an : 3 nuits et où loger",
  h1: "Xi’an : l’armée de terre cuite, les remparts et les ruelles gourmandes, sur trois nuits",
  description:
    "Accordez trois nuits à Xi’an : une journée pour l’armée de terre cuite, une pour les remparts et les ruelles gourmandes. Où loger, quelle gare choisir et où aller ensuite.",
  summary:
    "Entrez dans le hall qui couvre la fosse 1 à Lintong, et l’armée apparaît soudain sous vos yeux : des soldats d’argile grandeur nature, rang après rang, dont les visages et les barbes changent de l’un à l’autre. De retour en ville, marchez au sommet des remparts, larges comme une route, puis finissez la soirée autour des tours de la Cloche et du Tambour, en mangeant dans les ruelles du quartier musulman. Les guerriers prennent l’essentiel d’une journée : trois nuits vous laissent donc une journée complète pour eux et une pour Xi’an même.",
  heroAlt:
    "La tour de la Cloche de Xi’an illuminée de doré sur un ciel bleu profond du soir, avec devant elle les traînées de lumière de la circulation.",
  heroCaption:
    "La tour de la Cloche se dresse au cœur de la ville fortifiée. Passez devant la tour du Tambour pour aller manger dans les ruelles du quartier musulman, ou descendez la rue du Sud en quinze minutes pour monter sur les remparts à la porte Sud.",
  geography: {
    title: "Les sites de Xi’an s’étendent au sud et à l’est des remparts",
    caption:
      "Schéma sans échelle. La vieille ville et le musée situé au sud demandent chacun une demi-journée ; les guerriers occupent l’essentiel d’une journée, le mont Hua une journée entière.",
    legend: {
      core: "Centre de la vieille ville",
      cluster: "Une demi-journée ou plus",
      outside: "Une journée hors de la ville",
      gateway: "Aéroport et gares",
    },
    nodes: {
      wall: { label: "Remparts · tours de la Cloche et du Tambour", note: "Promenades sur les remparts et dîners dans le quartier musulman" },
      south: { label: "Musée d’histoire du Shaanxi · Dayanta", note: "Une demi-journée : le musée, puis la pagode" },
      lintong: { label: "Lintong · armée de terre cuite", note: "L’essentiel d’une journée, trajets compris" },
      huashan: { label: "Mont Hua", note: "Une journée entière, ou une nuit sur place" },
      north: { label: "Xi’an Nord", note: "Principale gare à grande vitesse, au nord du centre" },
      xiy: { label: "Aéroport XIY", note: "Au nord-ouest, du côté de Xianyang" },
      east: { label: "Xi’an Est", note: "Gare de l’est, ouverte depuis juin 2026" },
    },
  },
  overview: {
    nights: {
      answer: "Trois nuits vous laissent une journée complète pour les guerriers et une pour la ville.",
      detail:
        "Les jours d’arrivée et de départ passent surtout en trajets. Avec deux nuits, la plupart des voyageurs consacrent leur seule journée complète à l’armée de terre cuite ; une troisième nuit offre à la ville une journée à elle. Vous ajoutez le mont Hua ? Il demande une autre journée entière : prévoyez quatre nuits.",
    },
    stay: {
      answer: "Premier séjour ? Logez près de la tour de la Cloche, à l’intérieur des remparts.",
      detail:
        "La tour du Tambour et les ruelles gourmandes du quartier musulman sont à quelques pas : dîner est facile. Le quartier est animé et bruyant ; demandez une chambre côté calme et vérifiez qu’une voiture peut arriver jusqu’à la porte. Si vous venez surtout pour le musée et la grande pagode de l’Oie sauvage, logez plutôt à Dayanta ou à Xiaozhai.",
    },
    gateway: {
      answer: "Vérifiez laquelle des trois grandes gares de Xi’an figure sur votre billet.",
      detail:
        "Xi’an Nord, la principale gare à grande vitesse, est à un trajet en voiture de la tour de la Cloche, pas à une promenade. La gare de Xi’an se trouve juste au nord des remparts, et Xi’an Est a ouvert en juin 2026 : les guides plus anciens peuvent l’oublier. En avion ? XIY est au nord-ouest, vers Xianyang ; rendez-vous au terminal indiqué par votre compagnie.",
    },
    next: {
      answer: "Continuez vers Chengdu ou Pékin ; Xi’an est sur la ligne qui les relie.",
      detail:
        "Pékin, Xi’an et Chengdu forment une seule ligne, dans un sens ou dans l’autre. Chengdu troque les soldats d’argile et les remparts contre la cuisine du Sichuan et la vie de quartier ; Pékin vous fait avancer dans le temps, jusqu’à la capitale des empereurs des dernières dynasties. Vous arrivez tard à Chengdu ? Ne prévoyez aucune visite à horaire fixe le lendemain matin.",
    },
  },
  opening: {
    heading: "Pourquoi tant de premiers voyages en Chine passent par Xi’an",
    paragraphs: [
      "Xi’an vous fait remonter le temps plus loin que Pékin. Du haut des remparts, la vieille ville à vos pieds ne représente qu’environ un septième de Chang’an, la capitale des Tang ; le reste se trouve sous la ville moderne, au-delà. Au musée d’histoire du Shaanxi, les peintures murales des tombes Tang rendent ses couleurs à cette cour : joueurs de polo au grand galop, musiciens, danseuses et envoyés étrangers, dont l’un venu de Corée. À peu de distance de là se dresse la grande pagode de l’Oie sauvage, construite à l’origine pour abriter les écritures que le moine Xuanzang avait rapportées d’Inde.",
      "Xi’an se trouve entre Pékin et Chengdu sur de grandes lignes ferroviaires : vous pouvez l’ajouter à un premier voyage sans détour. En échange, elle demande du temps. Accordez-lui au moins une journée complète qui ne soit ni un jour d’arrivée ni un jour de départ. Arrivez tard et repartez tôt le lendemain matin, et vous verrez votre hôtel, mais très peu de Xi’an.",
    ],
  },
  sources: {
    "http://www.xa.gov.cn/xw/zwzx/msyw/2072145741715947521.html": {
      publisher: "Gouvernement populaire municipal de Xi’an",
      label: "La gare de Xi’an Est est entrée en service le 30 juin 2026 avec la ligne à grande vitesse Xi’an–Shiyan",
    },
    "https://en.xa.gov.cn/CultureTravel/Transportation/1873656097505083393.html": {
      publisher: "Gouvernement populaire municipal de Xi’an",
      label: "Le terminal 5 de l’aéroport international de Xi’an Xianyang",
    },
    "https://www.bmy.com.cn/guide/": {
      publisher: "Musée du mausolée de l’empereur Qin Shi Huang",
      label: "Un seul billet pour les fosses de l’armée de terre cuite et le jardin du Lishan, la navette gratuite et la réservation avec passeport",
    },
    "https://www.sxhm.com/guide.h": {
      publisher: "Musée d’histoire du Shaanxi",
      label: "Guide de visite et de réservation du musée d’histoire du Shaanxi",
    },
  },
  guides: {
    "china-10-day-itinerary": "La Chine en 10 jours",
    "terracotta-warriors-without-tour": "Visiter l’armée de terre cuite",
    "shaanxi-history-museum-booking-and-collection-plan": "Préparer le musée d’histoire du Shaanxi",
    "xian-where-to-stay-city-wall-or-dayanta": "Où loger à Xi’an",
    "beijing-xian-chengdu-route-order": "Pékin, Xi’an, Chengdu : dans quel ordre",
    "chinese-city-walls-gates-and-urban-order": "Comprendre les remparts des villes chinoises",
  },
};

export default content;
