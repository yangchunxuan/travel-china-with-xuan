import type { EditorialAuthorProfileCopy } from "./japaneseAuthorCopy";

/**
 * Evan's author page in the French, German, Spanish and Arabic editions
 * (/fr/studio/evan/, /de/studio/evan/, /es/studio/evan/, /ar/studio/evan/).
 * The profile text is a translation of the English entry in
 * editorialIdentity.ts and follows the Japanese page (japaneseAuthorCopy.ts);
 * name, role, bio, tags and photo come from each edition's studio copy, as
 * getEditorialAuthor takes them from the studio copy. This module has no
 * runtime imports, so Node tests can read it directly.
 */

export const editionAuthorLanguages = ["fr", "de", "es", "ar"] as const;
export type EditionAuthorLanguage = typeof editionAuthorLanguages[number];

/**
 * Evan's page in every edition outside English, Chinese and Korean. One
 * person, one page per language; editorialIdentity.ts lists them with the
 * English, Chinese and Korean pages.
 */
export const EDITORIAL_AUTHOR_EDITION_PATHS = {
  ja: "/ja/studio/evan/",
  fr: "/fr/studio/evan/",
  es: "/es/studio/evan/",
  de: "/de/studio/evan/",
  ar: "/ar/studio/evan/",
} as const;

export const editionAuthorProfileCopy: Readonly<Record<EditionAuthorLanguage, EditorialAuthorProfileCopy>> = {
  fr: {
    title: "Evan — rédacteur de guides sur la Chine et concepteur de voyages | Homeground China",
    h1: "Evan",
    eyebrow: "Rédaction · vérification des faits · conception de voyages",
    introduction:
      "Evan rédige et vérifie les guides de voyage de Homeground sur la Chine, en se concentrant sur les décisions que les voyageurs internationaux doivent prendre avant et pendant leur voyage.",
    methodTitle: "Comment Evan vérifie un guide Homeground",
    method: [
      "Partir de la vraie question que le voyageur cherche à résoudre, et non d’une présentation générale de la destination.",
      "Séparer le contexte stable des règles de réservation, des horaires et des conditions d’accès, qui doivent être vérifiés à nouveau.",
      "Relier la réponse à l’ensemble du voyage : qui voyage, d’où l’on part, ce qui vient ensuite et ce qui se passe si le premier plan échoue.",
    ],
    focusTitle: "Thèmes éditoriaux",
    focus: [
      "Conception d’itinéraires entre plusieurs villes",
      "Choix de transport et d’arrivée",
      "Questions interculturelles d’un premier voyage en Chine",
      "Communication en anglais et en coréen",
    ],
    articlesTitle: "Guides vérifiés récemment",
    studioLink: "Découvrir l’équipe Homeground",
  },
  de: {
    title: "Evan – Autor von China-Reiseführern und Reiseplaner | Homeground China",
    h1: "Evan",
    eyebrow: "Schreiben · Faktenprüfung · Reiseplanung",
    introduction:
      "Evan schreibt und prüft die China-Reiseführer von Homeground. Im Mittelpunkt stehen die Entscheidungen, die internationale Reisende vor und während einer Reise treffen müssen.",
    methodTitle: "So prüft Evan einen Homeground-Reiseführer",
    method: [
      "Bei der konkreten Frage ansetzen, die Reisende lösen möchten, statt bei einer allgemeinen Beschreibung des Reiseziels.",
      "Beständiges Hintergrundwissen von Buchungsregeln, Fahrplänen und Zugangsbedingungen trennen, die erneut geprüft werden müssen.",
      "Die Antwort mit der ganzen Reise verbinden: wer reist, wo die Reise beginnt, was danach folgt und was geschieht, wenn der erste Plan scheitert.",
    ],
    focusTitle: "Redaktionelle Schwerpunkte",
    focus: [
      "Routenplanung über mehrere Städte",
      "Entscheidungen zu Verkehrsmitteln und Ankunft",
      "Interkulturelle Fragen zur ersten China-Reise",
      "Kommunikation auf Englisch und Koreanisch",
    ],
    articlesTitle: "Zuletzt geprüfte Reiseführer",
    studioLink: "Das Homeground-Team kennenlernen",
  },
  es: {
    title: "Evan — autor de guías de viaje por China y planificador de viajes | Homeground China",
    h1: "Evan",
    eyebrow: "Redacción · verificación de datos · planificación de viajes",
    introduction:
      "Evan escribe y revisa las guías de viaje por China de Homeground, con especial atención a las decisiones que los viajeros internacionales deben tomar antes y durante el viaje.",
    methodTitle: "Cómo revisa Evan una guía de Homeground",
    method: [
      "Partir de la pregunta real que el viajero intenta resolver, no de un resumen genérico del destino.",
      "Separar el contexto estable de las normas de reserva, los horarios y las condiciones de acceso, que deben comprobarse de nuevo.",
      "Conectar la respuesta con todo el viaje: quién viaja, desde dónde sale, qué viene después y qué ocurre si el primer plan falla.",
    ],
    focusTitle: "Enfoque editorial",
    focus: [
      "Diseño de rutas por varias ciudades",
      "Decisiones de transporte y llegada",
      "Dudas interculturales del primer viaje a China",
      "Comunicación en inglés y coreano",
    ],
    articlesTitle: "Guías revisadas recientemente",
    studioLink: "Conocer al equipo de Homeground",
  },
  ar: {
    title: "Evan — كاتب أدلة السفر إلى الصين ومخطط رحلات | Homeground China",
    h1: "Evan",
    eyebrow: "الكتابة · التحقق من المعلومات · تخطيط الرحلات",
    introduction:
      "يكتب Evan أدلة Homeground للسفر إلى الصين ويراجعها، مع التركيز على القرارات التي يواجهها المسافرون الدوليون قبل الرحلة وخلالها.",
    methodTitle: "كيف يراجع Evan دليلًا من أدلة Homeground",
    method: [
      "البدء من السؤال الحقيقي الذي يحاول المسافر حلّه، لا من نبذة عامة عن الوجهة.",
      "الفصل بين المعلومات الأساسية الثابتة وبين قواعد الحجز والمواعيد وشروط الدخول التي يجب التحقق منها من جديد.",
      "ربط الإجابة بالرحلة كلها: من يسافر، ومن أين يبدأ، وما الذي يأتي بعد ذلك، وماذا يحدث إذا لم تنجح الخطة الأولى.",
    ],
    focusTitle: "محاور التركيز التحريري",
    focus: [
      "تصميم مسارات متعددة المدن",
      "قرارات التنقل والوصول",
      "الأسئلة بين الثقافات في الرحلة الأولى إلى الصين",
      "التواصل بالإنجليزية والكورية",
    ],
    articlesTitle: "أدلة راجعها مؤخرًا",
    studioLink: "تعرّف على فريق Homeground",
  },
};

/**
 * Strings and routes the English component does not read from the author
 * entry: text hard-coded in EditorialAuthorPage.tsx, the edition's own
 * studio page, and the note under the guide list that the Japanese page
 * also carries. English links end with the edition's English marker.
 */
export const editionAuthorComponentStrings = {
  fr: {
    htmlLang: "fr",
    dir: "ltr",
    openGraphLocale: "fr_FR",
    studioHref: "/fr/studio/",
    skipLink: "Aller au contenu",
    methodEyebrow: "Méthode éditoriale Homeground",
    otherGuidesNote: "Les autres guides vérifiés par Evan sont publiés en anglais, en chinois et en coréen.",
    englishProfileLabel: "Profil d’Evan (en anglais)",
    arrow: "→",
  },
  de: {
    htmlLang: "de",
    dir: "ltr",
    openGraphLocale: "de_DE",
    studioHref: "/de/studio/",
    skipLink: "Zum Inhalt springen",
    methodEyebrow: "Homeground-Redaktion",
    otherGuidesNote: "Weitere von Evan geprüfte Reiseführer erscheinen auf Englisch, Chinesisch und Koreanisch.",
    englishProfileLabel: "Evans Profil (Englisch)",
    arrow: "→",
  },
  es: {
    htmlLang: "es",
    dir: "ltr",
    openGraphLocale: "es_ES",
    studioHref: "/es/studio/",
    skipLink: "Ir al contenido",
    methodEyebrow: "Método editorial de Homeground",
    otherGuidesNote: "Otras guías revisadas por Evan se publican en inglés, chino y coreano.",
    englishProfileLabel: "Perfil de Evan (en inglés)",
    arrow: "→",
  },
  ar: {
    htmlLang: "ar",
    dir: "rtl",
    openGraphLocale: "ar_SA",
    studioHref: "/ar/studio/",
    skipLink: "انتقل إلى المحتوى",
    methodEyebrow: "منهج Homeground التحريري",
    otherGuidesNote: "تُنشر الأدلة الأخرى التي راجعها Evan بالإنجليزية والصينية والكورية.",
    englishProfileLabel: "ملف Evan الشخصي (بالإنجليزية)",
    arrow: "←",
  },
} as const satisfies Record<EditionAuthorLanguage, {
  htmlLang: EditionAuthorLanguage;
  dir: "ltr" | "rtl";
  openGraphLocale: string;
  studioHref: string;
  skipLink: string;
  methodEyebrow: string;
  otherGuidesNote: string;
  englishProfileLabel: string;
  arrow: string;
}>;

/** The English profile, linked (and marked as English) from each edition page. */
export const ENGLISH_AUTHOR_PATH = "/studio/evan/";

// Adaptation notes:
// - "reviews" / "reviewed" is vérifier, prüfen, revisar and راجع (checks),
//   never a word for formal supervision, as on the Japanese page.
// - eyebrow "Writer · fact reviewer · trip planner" names three activities,
//   as the Chinese, Korean and Japanese pages do.
// - title keeps the English pattern (name, dash, what Evan does) and the
//   " | Homeground China" suffix every edition page uses.
// - focus keeps "English and Korean" only: it describes Evan's own languages.
// - studioLink "Meet the full Homeground studio" drops "full", as the
//   Japanese page does: the edition studio pages introduce five people.
// - methodEyebrow "Homeground editorial" names Homeground's editorial method.
// - The guide list shows the six guides published in the edition's
//   language; the note under it and the link to the English profile follow
//   the Japanese page. No credentials, experience or contact details are
//   added; role and bio are the edition studio pages' published text.
