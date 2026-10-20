import type { DestinationEditionCityContent } from "../../../lib/destinationEditionContent";

/** Guangzhou (Canton) in French, translated from the English city page with every fact as it states it. */
const content: DestinationEditionCityContent = {
  title: "Guide de voyage à Canton : 3 nuits et où loger",
  h1: "Canton : thé du matin, vieilles ruelles et rivière des Perles, sur trois nuits",
  description:
    "Accordez trois nuits à Canton pour le thé du matin, les vieilles ruelles et la tour de Canton la nuit. Où loger, quel terminal et quelle gare choisir, et où aller ensuite.",
  summary:
    "Commencez la journée par le thé du matin à Liwan, la table couverte de paniers vapeur en bambou remplis de dim sum. Levez ensuite les yeux vers le temple ancestral du clan Chen, dont les faîtes de toit fourmillent de figurines d’argile, et flânez dans les ruelles de Yongqingfang jusqu’à la rue tranquille de Shamian, sous les camphriers. À la nuit tombée, la tour de Canton s’illumine au-dessus de la rivière des Perles. L’arrivée et le départ prennent plus de temps qu’on ne le pense : trois nuits vous laissent profiter de la vieille ville comme de la ville nouvelle au bord de la rivière, sans presser ni l’une ni l’autre.",
  heroAlt:
    "Des dim sum dans des paniers vapeur en bambou, des rouleaux de pâte de riz rouges, une théière, une bouilloire en laiton et une gourde en osier sur une table ronde du restaurant Pan Xi.",
  heroCaption:
    "Thé du matin au restaurant Pan Xi, à Liwan, les paniers partagés autour de la table. Consacrez ensuite la journée au vieil ouest, du temple ancestral du clan Chen jusqu’à Shamian en fin d’après-midi, en passant par Yongqingfang.",
  geography: {
    title: "Le vieux Canton à l’ouest, la ville nouvelle à l’est",
    caption:
      "Schéma sans échelle. Le vieil ouest se fait facilement à pied en une journée ; Chimelong, au sud à Panyu, demande une journée entière à lui seul.",
    legend: {
      core: "Vieille ville",
      cluster: "Une demi-journée ou plus",
      outside: "Une journée entière",
      gateway: "Aéroport et gares",
    },
    nodes: {
      liwan: { label: "Liwan · Shamian", note: "Thé du matin, vieilles ruelles, Shamian au crépuscule" },
      yuexiu: { label: "Rue Beijing · Yuexiu", note: "Anciennes chaussées visibles sous la rue ; musées" },
      tianhe: { label: "Tianhe · Zhujiang New Town", note: "Les gratte-ciel ; la tour de Canton de l’autre côté de la rivière" },
      pazhou: { label: "Pazhou", note: "Halls de la Foire de Canton ; les foires font grimper les prix des hôtels" },
      panyu: { label: "Chimelong, Panyu", note: "Une journée entière en famille ; n’ajoutez rien d’autre" },
      baiyun: { label: "Aéroport de Baiyun", note: "T2 ou T3 uniquement ; le T1 est fermé" },
      gzstation: { label: "Gare de Canton", note: "Trains à grande vitesse vers Pékin depuis 2026" },
      east: { label: "Canton Est", note: "Côté Tianhe ; trains vers Shenzhen" },
      south: { label: "Canton Sud", note: "Immense gare à Panyu ; trains vers Hong Kong" },
    },
  },
  overview: {
    nights: {
      answer: "Trois nuits vous laissent deux journées complètes en ville.",
      detail:
        "Deux nuits vous donnent une bonne journée dans le vieil ouest, plus la ville nouvelle au bord de la rivière ou une arrivée sans hâte, mais pas les deux. Chimelong demande une journée entière à lui seul : les familles ajoutent souvent une nuit pour y aller. Une journée gourmande à Shunde ou une visite à Foshan en demande une de plus.",
    },
    stay: {
      answer: "Premier séjour ? Logez à Liwan, ou autour de la rue Beijing à Yuexiu.",
      detail:
        "À Liwan, le thé du matin est à portée de main ; le temple ancestral du clan Chen, Yongqingfang et Shamian forment une journée facile à pied, et les soirées sont tranquilles. La rue Beijing est plus centrale, avec des musées tout près et des lignes de métro dans toute la ville. Vérifiez le vrai trajet à pied entre l’hôtel et le métro, pas seulement le quartier.",
    },
    gateway: {
      answer: "Vérifiez le terminal de votre vol et la gare de votre train, puis réservez l’hôtel.",
      detail:
        "L’aéroport de Baiyun n’utilise plus que les terminaux T2 et T3 ; le T1 est fermé aux passagers depuis mai 2026. Le T3 n’a pas de station de métro à lui : prenez la ligne 3 ou 9 jusqu’à Gaozeng puis la navette de l’aéroport, ou un taxi avec de gros bagages. Pour Hong Kong, regardez d’abord Canton Sud, excentrée à Panyu, et prévoyez le temps de vous y rendre.",
    },
    next: {
      answer: "Hong Kong est l’étape suivante naturelle ; accordez-lui au moins une nuit.",
      detail:
        "Des trains à grande vitesse relient Canton Sud à Hong Kong West Kowloon, mais Hong Kong a sa propre procédure d’entrée : l’aller-retour dans la journée n’est donc pas une bonne idée. Pour une excursion d’une journée, choisissez Foshan ou Shunde, et Shunde si c’est la cuisine qui vous attire. Shenzhen se trouve sur le chemin ; n’y dormez que pour quelque chose que vous tenez vraiment à faire.",
    },
  },
  opening: {
    heading: "Pourquoi Canton mérite plus qu’une escale",
    paragraphs: [
      "La cuisine cantonaise suffit à justifier un séjour, et chaque journée peut commencer par elle : le thé servi autour d’une grande table, les paniers de dim sum partagés. La rue Beijing est une rue commerçante animée, posée sur des chaussées plus anciennes, mises au jour et laissées visibles. Passez un petit pont pour entrer à Shamian, dont les grilles de fer étaient autrefois fermées la nuit, et le bruit de la circulation s’éloigne. À la nuit tombée, traversez le pont courbe de Haixin jusqu’à la rive nord, et retournez-vous. La tour de Canton brille au-dessus de la rivière des Perles, son reflet sous elle.",
      "Beaucoup de voyages passent de toute façon par Canton. C’est une grande ville d’arrivée internationale, avec des trains qui continuent vers Hong Kong et Macao : elle fait une première ou une dernière étape facile en Chine continentale. Comptez toutefois les heures réelles. Atterrissez en milieu d’après-midi, récupérez vos bagages et installez-vous à l’hôtel, et l’après-midi est passé. Partez le matin en train de Canton Sud, et une bonne partie de la matinée s’écoule avant le départ du train.",
    ],
  },
  sources: {
    "https://www.eguangzhou.gov.cn/gzlatest/content/post_42957.html": {
      publisher: "Bureau des affaires étrangères du gouvernement municipal de Canton",
      label: "Les compagnies du T1 de Baiyun transférées au T3, et les gares reliées au T1 sans arrêt, à partir du 7 mai 2026",
    },
    "https://www.eguangzhou.gov.cn/gzlatest/content/post_43024.html": {
      publisher: "Bureau des affaires étrangères du gouvernement municipal de Canton",
      label: "Le T1 a cessé ses activités ; le T3 n’a pas de liaison directe en métro et l’aéroport conseille la ligne 3 ou la ligne 9 jusqu’à Gaozeng, puis la navette",
    },
    "https://www.gz.gov.cn/zwfw/zxfw/jtfw/content/post_10648700.html": {
      publisher: "Gouvernement populaire de la municipalité de Canton",
      label: "À partir du 26 janvier 2026, la gare de Canton n’est plus ni l’origine ni le terminus de trains classiques",
    },
    "https://www.gz.gov.cn/zwfw/zxfw/jtfw/content/post_10675644.html": {
      publisher: "Gouvernement populaire de la municipalité de Canton",
      label: "La gare de Canton passe à la grande vitesse tandis que Canton Baiyun reprend les trains classiques",
    },
  },
  guides: {
    "guangzhou-baiyun-airport-t2-t3": "Aéroport de Canton : T2 ou T3",
    "guangzhou-hong-kong-transport-route": "De Canton à Hong Kong",
    "guangzhou-macau-transport-route": "De Canton à Macao",
    "guangzhou-shenzhen-hong-kong-route-order": "Canton, Shenzhen, Hong Kong",
    "how-guangzhou-morning-tea-works": "Comment se passe le thé du matin à Canton",
    "when-metro-construction-meets-archaeology": "Quand les travaux du métro rencontrent l’archéologie",
  },
};

export default content;
