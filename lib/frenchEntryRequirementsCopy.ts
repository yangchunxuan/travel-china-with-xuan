import type { EntryRequirementsEditionCopy } from "./entryRequirementsEditionTypes.ts";

/** French translation of /guides/china-entry-requirements/. */
export const frenchEntryRequirementsCopy: EntryRequirementsEditionCopy = {
  dateLocale: "fr-FR",
  openGraphLocale: "fr_FR",
  metadata: {
    title: "Guides d’entrée en Chine : règles sans visa par passeport et itinéraire",
    description:
      "Les règles d’entrée en Chine en vigueur selon le passeport, le motif et l’itinéraire, dont l’entrée sans visa des citoyens britanniques en 2026, des repères sur le visa pour les citoyens américains et la vérification d’itinéraire pour le transit de 240 heures.",
    socialImageAlt: "La Grande Muraille franchissant une crête montagneuse près de Pékin.",
  },
  skipLink: "Aller aux guides d’entrée",
  breadcrumb: { label: "Fil d’Ariane", home: "Accueil", guides: "Guides de voyage", current: "Guides d’entrée en Chine" },
  hero: {
    eyebrow: "Homeground · formalités d’entrée",
    title: "Guides d’entrée en Chine",
    lead:
      "Les règles d’entrée en vigueur selon le passeport, le motif du voyage et l’itinéraire exact. Partez de la règle qui s’applique à votre voyage, puis construisez l’itinéraire autour de ce qui reste.",
    boundary:
      "Informations de voyage fondées uniquement sur des sources officielles. Homeground ne dépose pas de demandes de visa, ne se prononce pas sur l’admissibilité individuelle et ne demande pas le téléversement de passeports.",
  },
  checks: {
    label: "Trois vérifications pour l’entrée",
    intro: "Commencez par trois éléments",
    items: [
      { title: "Passeport", detail: "Nationalité et type exact de document" },
      { title: "Motif", detail: "Tourisme, transit, travail ou autre raison" },
      { title: "Itinéraire", detail: "Où vous entrez et où vous allez ensuite" },
    ],
  },
  collection: {
    eyebrow: "Guides d’entrée à jour",
    title: "Choisissez le passeport et l’itinéraire qui sont réellement les vôtres.",
    body:
      "Ces pages distinguent les faits publiés de leur interprétation pour préparer le voyage, et laissent leurs dates de vérification visibles.",
    latestReview: "Dernière vérification des sources",
    checked: "vérifié le {date}",
    readEnglishGuide: "Lire le guide (en anglais)",
  },
  ruleTypes: {
    eyebrow: "Pourquoi l’itinéraire compte",
    title: "« Sans visa » peut désigner deux façons d’entrer très différentes.",
    items: [
      {
        marker: "A",
        title: "Exemption liée au passeport",
        body:
          "La règle publiée part de la nationalité, du type de passeport, du motif et de la durée du séjour. Le guide actuel pour le Royaume-Uni en est un exemple.",
      },
      {
        marker: "B",
        title: "Transit lié à l’itinéraire",
        body:
          "Le pays ou la région suivante, une fois confirmée, peut déterminer si une exemption de transit s’applique. La vérification d’itinéraire pour le transit de 240 heures montre pourquoi un aller-retour et un itinéraire vers une destination suivante ne sont pas la même chose.",
      },
    ],
  },
  protocol: {
    eyebrow: "Notre méthode de publication",
    title: "Une page réglementaire doit prévoir sa péremption.",
    items: [
      "Utiliser d’abord les sources officielles des gouvernements et des ambassades.",
      "Indiquer la date à laquelle ces sources ont été vérifiées.",
      "Distinguer la règle publiée de son interprétation pour préparer l’itinéraire.",
      "Renvoyer les cas inhabituels de passeport ou les questions juridiques vers l’autorité compétente.",
    ],
  },
  cta: {
    eyebrow: "Une fois l’entrée clarifiée",
    title: "Préparez maintenant le voyage, pas les formalités.",
    body:
      "Indiquez vos dates, vos envies et l’itinéraire que vous avez déjà, quel qu’il soit. Un conseiller Homeground vous aidera à déterminer le bon périmètre de préparation avant tout travail payant.",
    action: "Parler à un conseiller voyage",
  },
  guides: {
    "do-us-citizens-need-visa-china-2026": {
      label: "Guide passeport américain",
      headline: "Les citoyens américains ont-ils besoin d’un visa pour la Chine en 2026 ?",
      description:
        "Pour des vacances ordinaires en Chine continentale, un passeport américain nécessite généralement un visa L. Comparez l’itinéraire de transit de 240 heures, la politique régionale de 30 jours de Hainan et les règles d’un aller-retour classique.",
      imageAlt: "Hall des arrivées de l’aéroport international de Shanghai Pudong, avec une signalétique bilingue en hauteur.",
    },
    "china-240-hour-visa-free-transit-route-check": {
      label: "Guide itinéraire de transit",
      headline: "Transit sans visa de 240 heures en Chine : votre itinéraire est-il éligible ?",
      description:
        "Vérifiez l’itinéraire A–Chine–C, le passeport éligible, le billet de continuation confirmé, les points d’entrée désignés et les zones de séjour autorisées pour le transit sans visa de 240 heures.",
      imageAlt: "Schéma de la règle de transit : pays ou région A, puis Chine continentale, puis un autre pays ou une autre région C.",
    },
    "do-singaporeans-need-visa-china": {
      label: "Guide passeport singapourien",
      headline: "Pas besoin de visa pour la Chine. Voici la question plus difficile.",
      description:
        "Un passeport singapourien permet d’entrer en Chine sans visa pendant 30 jours. Le visa se règle en un paragraphe ; la vraie question est de savoir quoi faire de ce temps, et où un itinéraire en Chine se gagne ou se perd.",
      imageAlt: "Piliers de grès étagés dans une vallée d’un vert profond, dans le parc forestier national de Zhangjiajie.",
    },
    "china-visa-free-uk-citizens-2026": {
      label: "Guide passeport britannique",
      headline: "Chine sans visa pour les citoyens britanniques en 2026 : quand faut-il encore un visa ?",
      description:
        "Un guide pratique de l’entrée sans visa de 30 jours en Chine pour les citoyens britanniques en 2026 : types de passeport, décompte des jours, nouvelle entrée après Hong Kong et cas où un visa reste nécessaire.",
      imageAlt: "La Grande Muraille franchissant une crête montagneuse près de Pékin, au printemps.",
    },
    "china-visa-free-canadian-citizens-2026": {
      label: "Guide passeport canadien",
      headline: "Chine sans visa pour les citoyens canadiens en 2026 : quand faut-il encore un visa ?",
      description:
        "Un guide pratique de l’entrée sans visa de 30 jours en Chine pour les citoyens canadiens en 2026 : types de passeport, décompte des jours, nouvelle entrée après Hong Kong et cas où un visa reste nécessaire.",
      imageAlt: "Les gratte-ciel contemporains de Pékin, dont la tour China Zun, par temps clair.",
    },
    "china-visa-free-new-zealand-citizens-2026": {
      label: "Guide passeport néo-zélandais",
      headline: "Chine sans visa pour les citoyens néo-zélandais en 2026 : quand faut-il encore un visa ?",
      description:
        "Un guide pratique de l’entrée sans visa de 30 jours en Chine pour les citoyens néo-zélandais en 2026 : types de passeport, décompte des jours, nouvelle entrée après Hong Kong et cas où un visa reste nécessaire.",
      imageAlt: "Frise chronologique éditoriale montrant la période de la politique chinoise d’exemption de visa pour la Nouvelle-Zélande, du 30 novembre 2024 au 31 décembre 2026.",
    },
  },
};
