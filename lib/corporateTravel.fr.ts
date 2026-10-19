import type { CorporateTrip } from "./corporateTravelTypes";

const zhangjiajieImages = "/images/tours/zhangjiajie-furong-fenghuang-7-day-private-tour/";
const shanghaiImages = "/images/tours/shanghai-suzhou-5-day-private-tour/";

export const corporateTripsFr: CorporateTrip[] = [
  {
    slug: "zhangjiajie-4-day-team-trip",
    title: "Voyage d’entreprise à Zhangjiajie : quatre jours au milieu des pics",
    seoTitle: "Voyage d’entreprise à Zhangjiajie | 4 jours, 3 nuits | Homeground China",
    description: "Un voyage d’entreprise de 4 jours à Zhangjiajie pour 10 à 30 personnes : trois nuits à Wulingyuan, une journée parmi les pics, une balade dans la vallée et un dîner d’équipe. Programme et devis adaptés à votre groupe.",
    eyebrow: "Voyages d’entreprise · Voyages de récompense",
    lede: "Trois nuits dans un même hôtel de Wulingyuan, une journée entière parmi les piliers de grès, une balade plus douce le long du ruisseau du Fouet d’or et un dîner d’équipe pour terminer le voyage.",
    duration: "4 jours, 3 nuits",
    groupSize: "Environ 10 à 30 personnes",
    base: "Un hôtel à Wulingyuan",
    format: "Voyages du personnel et voyages de récompense",
    hero: {
      src: `${zhangjiajieImages}wulingyuan-peaks-1600.webp`,
      alt: "Piliers de grès et forêt verdoyante à Wulingyuan, Zhangjiajie",
      caption: "Wulingyuan, Zhangjiajie.",
    },
    storyTitle: "Un paysage que toute l’équipe partage.",
    story: "Les pics de Zhangjiajie font partie de ces paysages dont un groupe se souvient ensemble : chacun s’arrête au même belvédère, prend la même photo et en reparle au dîner. Trois nuits dans un seul hôtel simplifient le voyage, et la troisième journée est plus douce, pour que les collègues de différents niveaux de forme physique en profitent.",
    highlights: [
      { title: "Un hôtel, trois nuits", text: "Pas de valises à refaire ni de changement d’hôtel. Nous choisissons l’hôtel de Wulingyuan selon la répartition des chambres, l’accès en autocar et votre budget." },
      { title: "La grande journée, bien préparée", text: "Le mont Tianzi et Yuanjiajie avec votre guide, avec les navettes du parc, l’ascenseur et le téléphérique organisés à l’avance." },
      { title: "Une soirée pour remercier l’équipe", text: "Un dernier dîner d’équipe dans un salon privé, avec des discours ou une remise de prix si vous le souhaitez." },
    ],
    days: [
      {
        title: "Arrivée et installation",
        place: "Aéroport ou gare de Zhangjiajie → Wulingyuan",
        summary: "Nous accueillons chaque participant à son arrivée et conduisons le groupe à l’hôtel de Wulingyuan. Si tout le monde arrive à temps, le voyage commence par un dîner de bienvenue.",
        details: [
          "Les accueils sont organisés selon chaque vol et chaque train, pour éviter des heures d’attente aux personnes arrivées plus tôt.",
          "Des chambres individuelles, à deux lits ou une combinaison des deux, dans le même hôtel pour les trois nuits.",
          "Un après-midi libre pour se reposer du trajet.",
        ],
        image: { src: `${zhangjiajieImages}wulingyuan-peaks-1600.webp`, alt: "Piliers de grès couverts de végétation dans la région de Wulingyuan, à Zhangjiajie", caption: "Wulingyuan, votre lieu de séjour pour les trois nuits." },
      },
      {
        title: "Une journée parmi les pics du parc",
        place: "Parc forestier national de Zhangjiajie · Mont Tianzi et Yuanjiajie",
        summary: "La grande journée du voyage. Votre guide accompagne le groupe parmi les piliers de grès du mont Tianzi et de Yuanjiajie, avec un déjeuner dans le parc et du temps aux plus beaux points de vue.",
        details: [
          "Les entrées du parc, les navettes, l’ascenseur et le téléphérique sont réservés avant votre arrivée.",
          "Il y a des marches et des trajets à pied entre les belvédères. Un parcours plus facile est prévu pour ceux qui préfèrent une journée plus courte.",
          "Retour à l’hôtel en fin d’après-midi ; dîner en groupe ou libre, selon votre choix.",
        ],
        image: { src: `${zhangjiajieImages}tianzi-mountain-panorama-1600.webp`, alt: "Vue panoramique sur la forêt et les piliers de grès du mont Tianzi", caption: "Mont Tianzi." },
      },
      {
        title: "Balade dans la vallée et dîner d’équipe",
        place: "Ruisseau du Fouet d’or → hôtel → dîner d’équipe",
        summary: "Une matinée plus douce le long du ruisseau du Fouet d’or, au pied des pics que vous avez vus d’en haut. L’après-midi est libre ou consacré à une courte réunion, avant le dîner d’équipe.",
        details: [
          "Nous parcourons une portion du sentier adaptée au groupe, sans faire tout le chemin.",
          "Si vous souhaitez une réunion, nous réservons une salle avec l’agencement et le matériel nécessaires.",
          "Le dernier dîner se tient dans un salon privé, avec les menus et le plan de table convenus à l’avance.",
        ],
        image: { src: `${zhangjiajieImages}golden-whip-stream-1600.webp`, alt: "Forêt verdoyante au bord du ruisseau du Fouet d’or, à Zhangjiajie", caption: "Ruisseau du Fouet d’or." },
      },
      {
        title: "Petit-déjeuner et poursuite du voyage",
        place: "Wulingyuan → aéroport ou gare de Zhangjiajie",
        summary: "Petit-déjeuner, départ de l’hôtel et transferts adaptés aux horaires de chaque vol ou train.",
        details: [
          "Les départs sont regroupés selon les horaires des vols et des trains.",
          "Une nuit supplémentaire ou un départ tardif de l’hôtel peut être ajouté au devis.",
        ],
        image: { src: `${zhangjiajieImages}zhangjiajie-hehua-airport-1600.webp`, alt: "L’aéroport de Zhangjiajie Hehua avec les montagnes à l’arrière-plan", caption: "Aéroport de Zhangjiajie Hehua." },
      },
    ],
    stay: {
      title: "Un hôtel à Wulingyuan pour trois nuits.",
      body: "Nous choisissons l’hôtel selon la répartition des chambres, l’accès en autocar et votre budget, avec le petit-déjeuner chaque matin et une salle privée pour une réunion ou un dîner si vous en avez besoin.",
      details: [
        "Les tarifs en chambres individuelles, à deux lits ou combinant les deux sont présentés côte à côte pour vous permettre de comparer.",
        "Le nom de l’hôtel, les catégories et le nombre de chambres sont confirmés dans la proposition.",
        "Une salle de réunion ou un salon privé pour le dîner sur demande.",
      ],
    },
    scope: [
      "Trois nuits dans un hôtel de Wulingyuan avec petit-déjeuner",
      "Un autocar privé pour les transferts et les visites",
      "Un guide local les jours de visites",
      "Les entrées du parc forestier, les navettes, l’ascenseur et le téléphérique",
      "Le dîner de bienvenue, les déjeuners des jours de visites et le dîner d’équipe",
      "Un interlocuteur sur WhatsApp pendant tout le voyage",
    ],
    options: [
      "Une salle de réunion le jour 3, avec matériel et pauses avec rafraîchissements",
      "L’installation pour la remise de prix, un microphone et un plus grand salon privé pour le dîner",
      "Un photographe pendant une partie du voyage",
      "Des nuits supplémentaires, des transferts supplémentaires ou une journée avec moins de marche",
    ],
    notIncluded: [
      "Les vols ou trains à destination et au départ de Zhangjiajie, sauf ajout au devis",
      "Les boissons, les suppléments en chambre et les dépenses personnelles",
      "L’assurance voyage et les visas",
    ],
    planningNotes: [
      { title: "Deux jours de visites et deux jours de trajet", body: "Les jours 1 et 4 suivent vos horaires de vols et de trains. Une arrivée matinale ou un départ tardif permet d’ajouter d’autres activités." },
      { title: "Des niveaux de forme physique différents", body: "La journée dans le parc comprend des marches et des promenades en plein air. Indiquez-nous qui préfère une journée plus facile : nous préparerons une alternative." },
      { title: "Un programme adapté à la météo", body: "Le temps change en montagne. Nous convenons avec vous d’une alternative en cas de pluie dans la proposition." },
    ],
    faqs: [
      { question: "À qui s’adresse ce voyage d’entreprise à Zhangjiajie ?", answer: "À environ 10 à 30 collègues voyageant en un seul groupe privé, pour un voyage annuel du personnel ou un voyage de récompense. Pour d’autres effectifs, nous adaptons l’autocar, l’hôtel et les guides." },
      { question: "Que comprend le programme de quatre jours ?", answer: "L’arrivée à Zhangjiajie, trois nuits à Wulingyuan, une journée au mont Tianzi et à Yuanjiajie, une balade le long du ruisseau du Fouet d’or, un dîner d’équipe et les transferts de départ. Le mont Tianmen et le pont de verre peuvent être ajoutés avec une journée supplémentaire." },
      { question: "Pouvons-nous organiser une réunion ou un dîner de remise de prix ?", answer: "Oui. Nous réservons une salle de réunion pour une partie du jour 3 et un salon privé pour le dernier dîner, avec des discours ou une remise de prix. Votre entreprise anime les séances." },
      { question: "Combien coûte un voyage d’entreprise à Zhangjiajie ?", answer: "Nous établissons le devis selon vos dates, l’effectif et la répartition des chambres. Les chambres individuelles ou partagées, les repas et les éventuelles réunions influent sur le total. Chaque option est chiffrée séparément." },
      { question: "Le voyage convient-il à des collègues de différents niveaux de forme physique ?", answer: "Oui, avec une bonne préparation. La journée dans le parc comprend des marches et des trajets à pied. Signalez-nous les personnes qui préfèrent une journée plus facile : nous prévoyons un parcours plus court ou une alternative." },
      { question: "Les vols sont-ils inclus et le parc est-il privatisé ?", answer: "Les vols et les trains ne sont pas inclus, sauf si vous nous demandez de les ajouter. Votre autocar et votre guide sont réservés à votre entreprise ; le parc national reste ouvert au public." },
    ],
    relatedGuides: [
      { href: "/guides/zhangjiajie-city-or-wulingyuan-hotel-base/", label: "Ville de Zhangjiajie ou Wulingyuan : où séjourner (en anglais)" },
      { href: "/guides/zhangjiajie-national-forest-park-tickets-and-entrances/", label: "Billets, accès et navettes du parc forestier (en anglais)" },
      { href: "/guides/zhangjiajie-older-travellers/", label: "Zhangjiajie à un rythme plus doux pour les voyageurs moins actifs (en anglais)" },
    ],
  },
  {
    slug: "shanghai-suzhou-4-day-company-retreat",
    title: "Séminaire d’entreprise à Shanghai et Suzhou : quatre jours, un seul hôtel",
    seoTitle: "Séminaire d’entreprise à Shanghai et Suzhou | 4 jours | Homeground China",
    description: "Un séjour d’entreprise de 4 jours à Shanghai et Suzhou pour 10 à 24 personnes : trois nuits dans un hôtel de Shanghai, une journée dans un jardin de Suzhou et une réunion d’une demi-journée en option. Programme et devis adaptés au groupe.",
    eyebrow: "Voyages d’entreprise · Petites réunions et séminaires",
    lede: "Trois nuits dans un même hôtel du centre de Shanghai, une matinée pour votre propre réunion si nécessaire, le Bund l’après-midi et une journée parmi les jardins et les canaux de Suzhou.",
    duration: "4 jours, 3 nuits",
    groupSize: "Environ 10 à 24 personnes",
    base: "Un hôtel dans le centre de Shanghai",
    format: "Voyages du personnel et séminaires d’équipe",
    hero: {
      src: `${shanghaiImages}hero-shanghai-clocktower-1600.webp`,
      alt: "La tour de l’horloge du Bund et les gratte-ciel modernes de Shanghai au crépuscule",
      caption: "Le Bund, Shanghai.",
    },
    storyTitle: "L’énergie d’une ville, le calme d’un jardin.",
    story: "Shanghai offre à une équipe de nombreux sujets de découverte et de conversation : le fleuve, les gratte-ciel et les rues où la ville ancienne reste visible. Suzhou ralentit le rythme, avec des jardins, de l’eau et de la pierre à une échelle plus intime. Trois nuits dans un même hôtel évitent de refaire les valises, et une demi-journée de réunion trouve sa place sans presser le reste du séjour.",
    highlights: [
      { title: "Un hôtel, trois nuits", text: "Le centre de Shanghai comme point de départ, Suzhou en excursion à la journée. Une seule installation à l’hôtel, une seule fois les valises à défaire." },
      { title: "Une réunion qui trouve sa place", text: "La matinée du jour 2 est consacrée à votre séance de travail ou à la ville. Vous choisissez avant de réserver." },
      { title: "Du temps ensemble, du temps libre", text: "Le Bund, un jardin de Suzhou et un dîner d’équipe, avec du temps libre pour explorer à votre rythme." },
    ],
    days: [
      {
        title: "Arrivée à Shanghai",
        place: "Aéroport ou gare de Shanghai → centre de Shanghai",
        summary: "Nous accueillons chaque participant à Pudong, Hongqiao ou à la gare et le conduisons à l’hôtel. Si le groupe arrive à temps, la soirée est consacrée à un dîner de bienvenue.",
        details: [
          "Des accueils organisés selon chaque vol et chaque train, depuis les deux aéroports de Shanghai si nécessaire.",
          "Le même hôtel pour les trois nuits, avec des chambres individuelles, à deux lits ou une combinaison des deux.",
          "Un dîner de bienvenue dans un restaurant que nous réservons pour le groupe.",
        ],
        image: { src: `${shanghaiImages}arrival-shanghai-dusk-1600.webp`, alt: "Les gratte-ciel de Shanghai au bord du fleuve dans la lumière du soir", caption: "Shanghai au crépuscule." },
      },
      {
        title: "Votre réunion, puis la ville",
        place: "Réunion en option → le Bund et le centre de Shanghai",
        summary: "Une réunion matinale dans une salle que nous réservons, ou une matinée tranquille en ville. L’après-midi, votre guide accompagne le groupe sur le Bund et dans les rues qui se trouvent derrière.",
        details: [
          "Une salle de réunion avec l’agencement, l’écran et les pauses avec rafraîchissements demandés ; votre entreprise anime la séance.",
          "Sans réunion, la matinée est consacrée à un quartier de Shanghai choisi pour votre équipe.",
          "Soirée libre, ou croisière sur le fleuve ou dîner en terrasse sur un toit ajoutés au devis.",
        ],
        image: { src: `${shanghaiImages}shanghai-skyline-1600.webp`, alt: "La tour Shanghai et le Centre mondial des finances dominant les gratte-ciel de Shanghai", caption: "Les gratte-ciel de Pudong." },
      },
      {
        title: "Une journée à Suzhou",
        place: "Shanghai → jardin de Suzhou et rue Pingjiang → Shanghai",
        summary: "Un autocar privé vous conduit à Suzhou pour visiter un jardin classique, déjeuner ensemble et vous promener le long des canaux de la rue Pingjiang, avant de rentrer à Shanghai pour le dîner d’équipe.",
        details: [
          "Le jardin de l’Humble Administrateur, avec les billets réservés à l’avance.",
          "Un jardin que l’on prend le temps de découvrir, plutôt que plusieurs visites précipitées.",
          "Retour à Shanghai pour le dernier dîner d’équipe, avec des discours ou une remise de prix si vous le souhaitez.",
        ],
        image: { src: `${shanghaiImages}suzhou-humble-garden-1600.webp`, alt: "Un pavillon, un étang et des galeries couvertes dans le jardin de l’Humble Administrateur à Suzhou", caption: "Jardin de l’Humble Administrateur, Suzhou." },
      },
      {
        title: "Petit-déjeuner et départs",
        place: "Centre de Shanghai → votre aéroport ou gare",
        summary: "Petit-déjeuner, départ de l’hôtel et transferts adaptés à chaque horaire de départ.",
        details: [
          "Les départs sont regroupés par aéroport et par horaire.",
          "Les collègues qui prolongent leur séjour peuvent ajouter des nuits et leur propre transfert au devis.",
        ],
        image: { src: `${shanghaiImages}departure-shanghai-1600.webp`, alt: "Une plateforme au bord du fleuve face aux gratte-ciel de Shanghai", caption: "Les berges du Huangpu." },
      },
    ],
    stay: {
      title: "Un hôtel dans le centre de Shanghai pour trois nuits.",
      body: "Nous recherchons des hôtels autour de la place du Peuple et de Jing’an, proches des principaux axes vers les aéroports et de bons restaurants, avec une salle de réunion si nécessaire.",
      details: [
        "Trois nuits dans le même hôtel ; Suzhou se visite à la journée.",
        "Des tarifs présentés côte à côte pour des chambres individuelles, à deux lits ou combinant les deux.",
        "La capacité, l’agencement et le matériel de la salle de réunion sont vérifiés avec l’hôtel.",
      ],
    },
    scope: [
      "Trois nuits dans un hôtel de Shanghai avec petit-déjeuner",
      "Les transferts aux aéroports et aux gares pour chaque arrivée et chaque départ",
      "Un autocar privé les jours de visites, y compris pour Suzhou",
      "Un guide local les jours de visites",
      "Les billets d’entrée au jardin de Suzhou",
      "Le dîner de bienvenue, les déjeuners des jours de visites et le dîner d’équipe",
      "Un interlocuteur sur WhatsApp pendant tout le voyage",
    ],
    options: [
      "Une salle de réunion pour une demi-journée le jour 2, avec matériel et pauses avec rafraîchissements",
      "L’installation pour la remise de prix, un microphone et un salon privé pour le dîner",
      "Une croisière sur le Huangpu ou un dîner en terrasse sur un toit",
      "Des nuits supplémentaires et des départs séparés",
    ],
    notIncluded: [
      "Les vols ou trains à destination et au départ de Shanghai, sauf ajout au devis",
      "Les boissons, les suppléments en chambre et les dépenses personnelles",
      "L’assurance voyage et les visas",
    ],
    planningNotes: [
      { title: "Deux journées de programme et deux jours de trajet", body: "Les jours 1 et 4 suivent vos horaires de vols. Ajouter Hangzhou ou une autre ville demande au moins une journée supplémentaire." },
      { title: "Bien préparer la réunion", body: "Précisez l’effectif, l’agencement et le matériel. Votre entreprise se charge du contenu." },
      { title: "Une journée réaliste à Suzhou", body: "Un jardin et une rue le long du canal, en autocar privé, avec le temps de profiter des deux." },
    ],
    faqs: [
      { question: "À qui s’adresse ce séminaire d’entreprise à Shanghai et Suzhou ?", answer: "À environ 10 à 24 collègues qui souhaitent découvrir la ville, passer une journée dans un jardin de Suzhou et partager du temps ensemble, pour un voyage du personnel ou un petit séminaire avec une réunion d’une demi-journée." },
      { question: "Dormons-nous à Suzhou ?", answer: "Non. Les trois nuits se passent dans un même hôtel de Shanghai. Suzhou est une excursion à la journée en autocar privé le jour 3." },
      { question: "La salle de réunion est-elle comprise dans le prix ?", answer: "La réunion est proposée en option le matin du jour 2. Nous chiffrons séparément la salle, le matériel et les pauses avec rafraîchissements. Votre entreprise anime la séance." },
      { question: "Pouvez-vous chiffrer des chambres individuelles et des chambres à deux lits partagées ?", answer: "Oui. Nous présentons côte à côte les tarifs en chambres individuelles, à deux lits ou combinant les deux, pour vous permettre de comparer avant de confirmer." },
      { question: "Les collègues peuvent-ils arriver à Pudong et à Hongqiao ?", answer: "Oui. Envoyez le vol ou le train de chaque personne et nous organisons les accueils aux deux aéroports et aux gares." },
      { question: "Que se passe-t-il s’il pleut le jour de Suzhou ?", answer: "Les jardins sont beaux sous la pluie et disposent de galeries couvertes. En cas de mauvais temps, nous convenons avec vous d’une autre visite à l’intérieur." },
    ],
    relatedGuides: [
      { href: "/fr/guides/shanghai-where-to-stay-first-trip/", label: "Où séjourner à Shanghai" },
      { href: "/guides/shanghai-to-suzhou-day-trip/", label: "Une excursion à Suzhou depuis Shanghai (en anglais)" },
      { href: "/guides/how-to-read-a-suzhou-garden/", label: "Comment découvrir un jardin de Suzhou (en anglais)" },
      { href: "/guides/shanghai-pudong-or-hongqiao-airport/", label: "Pudong ou Hongqiao : quel aéroport choisir (en anglais)" },
    ],
  },
];
