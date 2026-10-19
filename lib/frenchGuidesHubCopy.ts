import type { GuidesHubCopy } from '../app/(default)/guides/guidesHubI18n';
import type { GuidesHubEdition } from '../components/GuidesHubPage';

export const frenchGuidesHubCopy: GuidesHubCopy = {
  path: '/fr/guides/',
  metadata: {
    title: 'Préparer son voyage en Chine : nos conseils pratiques | Homeground',
    description: 'Entrée en Chine, paiements, applications, transports, hôtels et itinéraires : trouvez le bon conseil. Six guides complets en français ; les autres articles sont en anglais.',
    openGraphTitle: 'Conseils pratiques pour voyager en Chine',
  },
  eyebrow: 'Des réponses concrètes pour votre voyage', title: 'Bien préparer son voyage en Chine',
  introduction: 'Formalités d’entrée, paiements, téléphone, transports, hôtels ou rythme du voyage : partez de votre prochaine question. Retrouvez ci-dessous six guides complets en français ; les articles non traduits s’ouvrent en anglais.',
  languageLabel: 'Langue des guides', destinationAction: 'Choisir une destination (en anglais)',
  catalogEyebrow: 'Parcourir les guides', catalogTitle: 'Prévoir une journée, pas seulement une visite.',
  catalogIntroduction: 'Que peut-on vraiment faire dans une journée ? Combien coûte le trajet ? Quel détail change la suite du voyage ? Nos articles vous aident à trancher ces questions concrètes. Les six guides traduits ci-dessus sont disponibles en français ; les autres articles et les pages suivantes de la bibliothèque sont en anglais.',
  guideCount: (count) => `${count} guides`,
  pagination: {
    label: 'Pages de la bibliothèque de guides en anglais',
    status: (page, pages, count) => `Page ${page} sur ${pages} · ${count} guides`,
    previous: 'Précédent', next: 'Suite (en anglais)',
    page: (page) => `Page ${page}`, pageTitle: (page) => `Page ${page}`,
  },
  libraryNav: { label: 'Parcourir les collections', planning: 'Itinéraires et préparation', entry: 'Entrée en Chine et exemptions de visa' },
  countryGuide: {
    eyebrow: 'Six choix pour gagner du temps', title: 'Commencez par la question qui se pose aujourd’hui.',
    introduction: 'Choisissez le conseil qui répond à votre prochaine décision. Si vous hésitez encore sur les lieux à visiter, commencez par les destinations.',
    decisions: {
      plan: { title: 'Comptez les jours disponibles avant d’ajouter des villes.', body: 'Réservez du temps pour l’arrivée, le départ et les longs trajets, puis choisissez un enchaînement de villes qui laisse aussi le temps de souffler.' },
      'when-to-go': { title: 'Vérifiez les dates avant de réserver.', body: 'Jours fériés, météo, saison et affluence peuvent changer le séjour. Vérifiez ce qui compte pour vos dates.' },
      transport: { title: 'Comparez les trajets de porte à porte.', body: 'Ajoutez l’accès à la gare ou à l’aéroport, les contrôles et l’attente au temps passé dans le train ou l’avion.' },
      stay: { title: 'Choisissez le quartier avant l’hôtel.', body: 'Pensez aux trajets quotidiens depuis votre hébergement et aux formalités d’accueil avec un passeport étranger.' },
      essentials: { title: 'Préparez l’entrée en Chine, les paiements et le téléphone.', body: 'Vérifiez les formalités, l’accès mobile et les moyens de paiement avant les réservations qui en dépendent.' },
      culture: { title: 'Donnez un fil conducteur aux découvertes.', body: 'Cuisine locale, histoire ou traditions vivantes : choisissez ce qui vous intéresse pour relier les étapes du voyage.' },
    },
  },
  entrySection: {
    eyebrow: 'Avant de fixer l’itinéraire', title: 'Vérifiez les conditions d’entrée qui vous concernent.',
    introduction: 'Consultez les sources officielles selon votre passeport, le motif du séjour et vos vols. Homeground ne dépose pas de demande de visa et ne détermine pas votre admissibilité individuelle.',
    action: 'Consulter le guide',
  },
  updatedLabel: 'Mis à jour le', readLabel: 'Lire l’article (en anglais)',
  formatLabels: { itinerary: 'Itinéraire', 'route-analysis': 'Choisir son parcours', transport: 'Transports', 'decision-guide': 'Faire le bon choix', 'field-note': 'Notes de terrain', 'planning-guide': 'Préparer son voyage' },
  topicLabels: { design: 'Itinéraire', pace: 'Rythme', transport: 'Transports', attractions: 'Visites', evenings: 'En soirée', 'trip-planning': 'Préparation', 'on-the-ground': 'Sur place', accommodation: 'Hébergement' },
  destinationLabels: { china: 'Chine', beijing: 'Pékin', xian: 'Xi’an', zhangjiajie: 'Zhangjiajie', shanghai: 'Shanghai' },
  cta: {
    eyebrow: 'Besoin d’un regard local ?', title: 'Parlons du voyage que vous préparez.',
    body: 'Envoyez-nous vos dates, le nombre de voyageurs et vos questions par WhatsApp ou par e-mail. Nous préciserons les services utiles, ce qu’ils comprennent et leur prix avant toute prestation payante.',
    action: 'Parler de mon voyage',
  },
};

export const frenchGuideSectionLabels: Readonly<Record<string, string>> = {
  explore: 'Destinations (en anglais)', plan: 'Préparer le voyage (en anglais)',
  transport: 'Transports (en anglais)', 'when-to-go': 'Quand partir (en anglais)',
  stay: 'Où dormir (en anglais)', essentials: 'Informations pratiques (en anglais)',
  culture: 'Culture et cuisine (en anglais)', tools: 'Outils (en anglais)', services: 'Services (en anglais)',
};

export const frenchGuideCardCopy: GuidesHubEdition['guideCopy'] = {
  'zhangjiajie-itinerary': {
    headline: 'Zhangjiajie en 2, 3 ou 4 jours : ce que l’on peut vraiment faire',
    description: 'Des parcours réalistes sur deux, trois ou quatre jours : ordre des visites, journées entières dans les parcs, nombre de nuits, étapes à laisser de côté et place éventuelle de Fenghuang.',
    cardImageAlt: 'Piliers de grès émergeant de la brume dans le parc forestier de Zhangjiajie.', cardTags: ['Zhangjiajie', 'Itinéraire', 'Rythme'],
  },
  'tianmen-mountain-tickets-and-routes': {
    headline: 'Mont Tianmen : billets, parcours ouverts, tarifs et accès',
    description: 'Depuis le 13 octobre 2026, seul le parcours C est en vente. Prix des billets et téléphériques, fermetures, point de départ et vérifications pour réserver avec un passeport étranger.',
    cardImageAlt: 'Escalier de pierre montant vers la grotte de Tianmen, entre les falaises.', cardTags: ['Tarifs', 'Parcours A, B et C', 'Accès'],
  },
  'guilin-airport-or-railway-station-arrival-guide': {
    headline: 'Arriver à Guilin : quel aéroport ou quelle gare choisir ?',
    description: 'Pour le centre de Guilin, regardez d’abord les trains desservant la gare de Guilin dont les horaires vous conviennent. Pour Yangshuo, calculez tout le trajet jusqu’à l’hôtel avant de choisir votre gare ou votre aéroport.',
    cardImageAlt: 'Façade de la gare de Guilin, avec son nom en chinois et en anglais au-dessus de l’entrée.', cardTags: ['Guilin', 'Aéroport', 'Gares'],
  },
  'zhangjiajie-national-forest-park-tickets-and-entrances': {
    headline: 'Parc forestier de Zhangjiajie : billets, entrées et transports',
    description: 'Tarifs vérifiés en août 2026 : 165 RMB pour l’entrée, 236 RMB avec les navettes, valables quatre jours. Choisissez d’abord votre porte d’entrée, puis vérifiez passeport, téléphériques et ascenseurs.',
    cardImageAlt: 'Piliers de grès quartzitique du parc forestier de Zhangjiajie en août 2016.', cardTags: ['Zhangjiajie', 'Billets du parc', 'Entrées'],
  },
  'china-private-tour-prices': {
    headline: 'Combien coûte un voyage privé en Chine ?',
    description: 'Comparez les prix publiés de 43 circuits privés de 4 à 21 jours : de 250 USD par personne pour six voyageurs à 5 920 USD par personne pour deux, avec aussi le coût par jour.',
    cardImageAlt: 'Pavillon principal de la Cité interdite au-dessus de ses terrasses de marbre.', cardTags: ['Prix publiés', 'Selon le nombre de voyageurs', 'Par personne, prestations terrestres'],
  },
  'yangshuo-china': {
    headline: 'Yangshuo : rue de l’Ouest, rivière Yulong, Xingping et nombre de nuits',
    description: 'Au sud de Guilin, une petite ville entre rivière Li et reliefs karstiques. Quelles visites sont gratuites, combien coûtent radeaux et spectacles du soir, et combien de nuits prévoir ?',
    cardImageAlt: 'Vieux pont de pierre se reflétant dans l’eau, devant les reliefs karstiques de la campagne de Yangshuo.', cardTags: ['Guangxi', 'Yangshuo', 'Rivière Li'],
  },
  'china-family-private-tours': {
    headline: 'Voyager en Chine en famille : des circuits privés avec les enfants',
    description: 'Cinq itinéraires de 8 à 14 jours, à partir de 1 190 USD par personne pour six voyageurs. Guide, véhicule et rythme propres à votre famille ; tarifs enfants selon leur âge.',
    cardImageAlt: 'Jeune panda sur une plateforme de bois à Chengdu.', cardTags: ['En famille', 'Prix publiés', 'Guide privé'],
  },
  'mutianyu-great-wall-tickets': {
    headline: 'Grande Muraille à Mutianyu : billets, téléphérique et passeport',
    description: 'D’après la billetterie officielle consultée le 11 octobre 2026 : entrée à 40 RMB, navette à 15 RMB, téléphérique à 100 ou 140 RMB. Passeport, remboursements et horaires expliqués.',
    cardImageAlt: 'Tour de guet de la Grande Muraille de Mutianyu sur une crête boisée aux couleurs d’automne.', cardTags: ['Tarifs', 'Téléphérique', 'Réservation avec passeport'],
  },
  'zhangjiajie-glass-bridge-tickets': {
    headline: 'Pont de verre de Zhangjiajie : billets, parcours et passeport',
    description: 'Billet à 175 RMB sur la boutique officielle consultée le 11 octobre 2026. Parcours A et B, horaires, réservation, remboursements et activités en supplément.',
    cardImageAlt: 'Visiteurs sur le pont blanc qui traverse le Grand Canyon de Zhangjiajie.', cardTags: ['Tarifs', 'Parcours A et B', 'Réservation avec passeport'],
  },
  'singapore-to-zhangjiajie-itinerary': {
    headline: 'De Singapour à Zhangjiajie : itinéraires de 5, 6 ou 7 jours',
    description: 'Arrivée via Changsha ou directement à Zhangjiajie : prévoyez de vraies journées dans le parc, le bon nombre de nuits et un retour compatible avec vos vols.',
    cardImageAlt: 'Piliers de Zhangjiajie et vallées verdoyantes en août 2016.', cardTags: ['Départ de Singapour', '5, 6 ou 7 jours', 'Avion et train'],
  },
  'do-you-need-a-tour-guide-in-china': {
    headline: 'Faut-il un guide en Chine, ou une autre forme d’aide ?',
    description: 'Pas nécessairement chaque jour. Un guide peut enrichir la Cité interdite ou l’armée de terre cuite ; ailleurs, un chauffeur ou une aide à l’organisation sera parfois plus utile. Comment choisir ?',
    cardImageAlt: 'Sculptures bouddhiques anciennes taillées dans la pierre à Longmen, près de Luoyang.', cardTags: ['Chine', 'Guide privé', 'Organisation du voyage'],
  },
  'avatar-mountains-zhangjiajie': {
    headline: 'Les montagnes d’Avatar à Zhangjiajie : où aller et combien de temps rester ?',
    description: 'Où se trouve le pilier Hallelujah, combien coûte la visite et que permet le parcours officiel d’une journée ? Retrouvez les repères pour choisir votre durée de séjour parmi ces colonnes de grès.',
    cardImageAlt: 'Piliers escarpés de grès, pins et brume à Zhangjiajie.', cardTags: ['Zhangjiajie', 'Avatar', 'Yuanjiajie'],
  },
  'changbai-mountain-heaven-lake': {
    headline: 'Changbaishan : lac du Ciel, versants, billets et visite en hiver',
    description: 'Dans le Jilin, un lac de cratère au sommet d’un volcan endormi. Comparez les versants nord et ouest, les billets et navettes, la réservation et les conditions d’une visite hivernale.',
    cardImageAlt: 'Lac du Ciel d’un bleu profond sous un ciel clair, avec de la neige sur le bord opposé du cratère.', cardTags: ['Jilin', 'Changbaishan', 'Lac du Ciel'],
  },
  'dali-old-town-erhai-lake': {
    headline: 'Dali : vieille ville, lac Erhai et Trois Pagodes en trois jours',
    description: 'Au Yunnan, entre les monts Cangshan et le lac Erhai : visites gratuites, prix des pagodes et du téléphérique, et temps à consacrer à chaque étape.',
    cardImageAlt: 'Trois Pagodes du temple Chongsheng avec les sommets enneigés de Cangshan en arrière-plan.', cardTags: ['Yunnan', 'Dali', 'Lac Erhai'],
  },
  'dazu-rock-carvings': {
    headline: 'Sculptures de Dazu : Baodingshan ou Beishan, billets et visite depuis Chongqing',
    description: 'Des sculptures rupestres du IXe au XIIIe siècle inscrites à l’UNESCO. Quels sites choisir parmi les cinq ensembles, quels billets et horaires prévoir, et comment organiser la journée depuis Chongqing ?',
    cardImageAlt: 'Sculptures peintes, assises et debout sur plusieurs niveaux, sous une avancée rocheuse de Baodingshan.', cardTags: ['Chongqing', 'Dazu', 'Patrimoine mondial'],
  },
  'dunhuang-china': {
    headline: 'Dunhuang : Mogao, lac du Croissant et désert de l’Ouest',
    description: 'Dans cette oasis de la route de la soie, que réserver en premier ? Prix, horaires, excursion dans le désert à l’ouest et nombre de jours à prévoir.',
    cardImageAlt: 'Lac du Croissant et son pavillon vus depuis les dunes de Mingsha, avec des visiteurs en contrebas.', cardTags: ['Gansu', 'Dunhuang', 'Route de la soie'],
  },
  'fenghuang-ancient-town': {
    headline: 'Fenghuang : visites gratuites, billets et accès depuis Zhangjiajie',
    description: 'Les rues de la vieille ville sont gratuites ; certains sites et les promenades en bateau sur la Tuo sont payants. Prix, horaires, liaison avec la gare par train à sustentation magnétique et durée du séjour.',
    cardImageAlt: 'Maisons de bois sur pilotis et pagode Wanming se reflétant dans la rivière Tuo au matin.', cardTags: ['Hunan', 'Fenghuang', 'Billets'],
  },
  'furong-ancient-town': {
    headline: 'Furong, le village sur la cascade : quand venir depuis Zhangjiajie ?',
    description: 'Dans l’ouest du Hunan, une vieille ville au-dessus d’une cascade de 60 mètres. Billet, ouverture de 8 h à minuit, accès, illuminations et intérêt d’y passer la nuit.',
    cardImageAlt: 'Maisons de bois sur pilotis au-dessus de la cascade et de la rivière de Furong, sous un ciel couvert.', cardTags: ['Hunan', 'Furong', 'Visite en soirée'],
  },
  'halal-food-muslim-travel-china': {
    headline: 'Voyager en Chine en tant que musulman : repas halal, mosquées et itinéraires',
    description: 'Les options sont nombreuses à Xi’an, autour de Niujie à Pékin et dans le Nord-Ouest, mais plus rares dans les sites naturels. Enseignes halal, quatre niveaux d’exigence halal, repas en avion et organisation du séjour.',
    cardImageAlt: 'Rue pavée humide du quartier musulman de Xi’an, sous de grands arbres, bordée d’enseignes de nouilles au bœuf, roujiamo et soupe d’agneau.', cardTags: ['Repas halal', 'Voyageurs musulmans', 'Cuisine'],
  },
  'hanging-temple-datong': {
    headline: 'Temple suspendu près de Datong : accès, billets 2026 et vue sans billet de montée',
    description: 'Depuis avril 2026, seuls 2 475 billets de montée sont disponibles par jour. Les deux types de billets, les informations pour les visiteurs étrangers et l’intégration à votre itinéraire.',
    cardImageAlt: 'Toits vernissés et balcons de bois du temple suspendu contre la falaise, avec des visiteurs dans les galeries.', cardTags: ['Datong', 'Temple suspendu', 'Billets'],
  },
  'harbin-ice-festival': {
    headline: 'Festival de glace de Harbin 2026–2027 : ouverture, prix et visite',
    description: 'Au cours des trois dernières saisons, l’ouverture a eu lieu entre le 17 et le 21 décembre. Le billet adulte coûtait 328 RMB l’hiver dernier. Repères sur les dates, les tarifs, la météo et l’organisation du voyage.',
    cardImageAlt: 'Longs toboggans de glace de la saison 2025–2026 vus d’en haut, avec la rivière Songhua gelée à l’arrière-plan.', cardTags: ['Harbin', 'Ice and Snow World', 'Décembre à février'],
  },
  'huangshan-yellow-mountain': {
    headline: 'Huangshan, les montagnes Jaunes : billets 2026, téléphériques et Hongcun',
    description: 'Dans l’Anhui, un massif de granit inscrit au patrimoine mondial. Tarifs 2026, portes d’entrée, temps sur la montagne et place du village de Hongcun dans votre voyage.',
    cardImageAlt: 'Pics de granit et pins au-dessus d’une mer de nuages, dans la lumière rasante du soleil à Huangshan.', cardTags: ['Anhui', 'Huangshan', 'Hongcun'],
  },
  'jingdezhen-china': {
    headline: 'Jingdezhen : patrimoine mondial en 2026, visites et nombre de jours',
    description: 'Au Jiangxi, mille ans d’histoire de la porcelaine. Ce que couvre l’inscription à l’UNESCO de juillet 2026, les prix, les horaires et le temps à prévoir sur place.',
    cardImageAlt: 'Ancien four à bois en briques, abrité sous une charpente, avec du bois de chauffe et des cazettes en terre cuite.', cardTags: ['Jiangxi', 'Jingdezhen', 'Patrimoine mondial'],
  },
  'jiuzhaigou-valley': {
    headline: 'Jiuzhaigou : réservation, budget, saison et parcours dans les trois vallées',
    description: 'En haute saison : 190 RMB pour l’entrée et 90 RMB pour le bus, avec une limite de 41 000 visiteurs par jour. Passeport, horaires, meilleure période et itinéraire d’une journée.',
    cardImageAlt: 'Eau turquoise et troncs immergés du lac aux Cinq Fleurs, entouré d’une forêt aux couleurs d’automne.', cardTags: ['Jiuzhaigou', 'Billets', 'Sichuan'],
  },
};
