import type { DestinationEditionLocale } from "./destinationEditions";
import type { DestinationOverviewSignalId } from "./destinationOverviewProjection";
// @ts-ignore TS5097: focused Node tests execute this module via type stripping.
import { editionEnglishMarker } from "./editionEnglishMarker.ts";
// @ts-ignore TS5097: focused Node tests execute this module via type stripping.
import { japaneseDestinationEditionUi } from "./japaneseDestinationEditionUi.ts";

/**
 * The words of the city page (components/content/DestinationHubPage.tsx) in
 * each edition: the English page's interface copy, translated, with the
 * byline, the compass of the geography diagram and the date format. The page
 * takes the rest from the editions' existing copy: the sight names and "all
 * sights" from lib/sightsEditions.ts, the theme names, home, breadcrumb and
 * tour-card words from lib/travelInspirationEditions.ts, the service rows from
 * lib/destinationEditionNavigation.ts. All five languages are here, so a
 * language's city pages need only their content files. Japanese is in its own
 * file (lib/japaneseDestinationEditionUi.ts) because it renders with the
 * Japanese font stack.
 */
export interface DestinationEditionUi {
  readonly skip: string;
  /** Before the review date in the hero's eyebrow. */
  readonly reviewed: string;
  readonly ctaLabel: string;
  readonly whatTitle: (city: string) => string;
  readonly whatBody: string;
  /** A theme the city belongs to (Travel Inspiration). */
  readonly themeLink: (name: string) => string;
  readonly toursLabel: string;
  readonly toursTitle: (city: string) => string;
  /** The card action of a tour without a published price. */
  readonly quoteTourAction: string;
  readonly toursBody: string;
  readonly bandTitle: string;
  readonly bandTitleTrip: string;
  readonly bandBodyTrip: string;
  readonly bandBody: string;
  readonly eyebrow: string;
  readonly decisionsLabel: string;
  readonly decisionsTitle: string;
  readonly decisionsBody: string;
  /** The link to the edition's practical guides. */
  readonly adviceAction: string;
  readonly signalLabels: Readonly<Record<DestinationOverviewSignalId, string>>;
  readonly detailedAnswersLabel: string;
  readonly detailedAnswers: (city: string) => string;
  readonly detailedAnswersBody: string;
  readonly evidenceSummary: string;
  readonly evidenceReviewed: string;
  readonly evidenceBody: string;
  readonly byline: { readonly by: string; readonly reviewed: string };
  readonly compass: { readonly n: string; readonly s: string; readonly w: string; readonly e: string };
  /** BCP 47 tag for the review date (Arabic keeps the Gregorian calendar and Latin digits, as its guides do). */
  readonly dateLocale: string;
}

const french: DestinationEditionUi = {
  skip: "Aller au guide",
  reviewed: "Vérifié le",
  ctaLabel: "Préparer avec une équipe locale",
  whatTitle: (city) => `Que voir à ${city}`,
  whatBody: "Ouvrez-en un pour savoir pourquoi il vaut le voyage et comment le visiter ; les quatre décisions ci-dessous montrent comment les intégrer à vos journées.",
  themeLink: (name) => `Idées de voyage : ${name}`,
  toursLabel: "Circuits privés",
  toursTitle: (city) => `Les circuits privés qui passent par ${city}`,
  quoteTourAction: "Programme et devis",
  toursBody: "Des itinéraires tout prêts, avec sur chaque page le programme et les tarifs publiés ou la demande de devis. Uniquement votre groupe, à vos dates.",
  bandTitle: "Confiez-nous tout le voyage, ou seulement une partie.",
  bandTitleTrip: "Confiez-nous tout le voyage.",
  bandBodyTrip: "Une vraie personne vous répond, à partir de vos dates et de la taille de votre groupe.",
  bandBody: "Une vraie personne répond à chaque demande, à partir de vos dates et de la taille de votre groupe.",
  eyebrow: "Guide de la ville",
  decisionsLabel: "Quatre décisions pour la ville",
  decisionsTitle: "Comprendre la ville, puis préparer les détails.",
  decisionsBody: "Combien de nuits, dans quel quartier loger, par où arriver et repartir, où aller ensuite. Comment réserver chaque étape : voyez nos conseils de voyage.",
  adviceAction: "Voir nos conseils de voyage",
  signalLabels: { nights: "Durée", stay: "Où loger", gateway: "Arrivée et départ", next: "Étape suivante" },
  detailedAnswersLabel: "Pour aller plus loin",
  detailedAnswers: (city) => `En savoir plus sur ${city}`,
  detailedAnswersBody: "Du choix du quartier aux trajets pour arriver et repartir, un guide par question.",
  evidenceSummary: "Sources et vérification",
  evidenceReviewed: "Informations vérifiées le",
  evidenceBody: "Les informations de cette page proviennent des sources officielles et de première main ci-dessous. Horaires et règles changent : vérifiez-les à nouveau avant de partir.",
  byline: { by: "Par", reviewed: "Informations vérifiées le" },
  compass: { n: "N", s: "S", w: "O", e: "E" },
  dateLocale: "fr-FR",
};

const german: DestinationEditionUi = {
  skip: "Zum Reiseführer",
  reviewed: "Geprüft am",
  ctaLabel: "Mit einem Team vor Ort planen",
  whatTitle: (city) => `Was Sie in ${city} sehen sollten`,
  whatBody: "Öffnen Sie eine, um zu erfahren, warum sie die Reise lohnt und wie Sie sie besuchen; die vier Entscheidungen weiter unten zeigen, wie sie in Ihre Tage passen.",
  themeLink: (name) => `Reiseideen: ${name}`,
  toursLabel: "Privatreisen",
  toursTitle: (city) => `Privatreisen, die ${city} einschließen`,
  quoteTourAction: "Reiseverlauf und Angebot",
  toursBody: "Fertig geplante Routen, auf jeder Seite mit Reiseverlauf und veröffentlichten Preisen oder einer Angebotsanfrage. Nur Ihre Gruppe, zu Ihren Terminen.",
  bandTitle: "Überlassen Sie uns die ganze Reise oder nur einen Teil.",
  bandTitleTrip: "Überlassen Sie uns die ganze Reise.",
  bandBodyTrip: "Ein echter Mensch antwortet Ihnen, auf Grundlage Ihrer Termine und Gruppengröße.",
  bandBody: "Auf jede Anfrage antwortet ein echter Mensch, auf Grundlage Ihrer Termine und Gruppengröße.",
  eyebrow: "Stadtführer",
  decisionsLabel: "Vier Entscheidungen zur Stadt",
  decisionsTitle: "Erst die Stadt verstehen, dann die Details planen.",
  decisionsBody: "Wie viele Nächte, in welcher Gegend wohnen, wie an- und abreisen, wohin danach. Wie Sie die einzelnen Teile buchen, steht in unseren Reisetipps.",
  adviceAction: "Reisetipps ansehen",
  signalLabels: { nights: "Dauer", stay: "Unterkunft", gateway: "An- und Abreise", next: "Nächste Station" },
  detailedAnswersLabel: "Mehr Antworten",
  detailedAnswers: (city) => `Mehr zu ${city}`,
  detailedAnswersBody: "Von der Wahl der Unterkunft bis zur An- und Abreise: ein Ratgeber pro Frage.",
  evidenceSummary: "Quellen und Prüfung",
  evidenceReviewed: "Informationen geprüft am",
  evidenceBody: "Die Angaben auf dieser Seite stammen aus den unten genannten offiziellen Quellen und Primärquellen. Öffnungszeiten und Regeln ändern sich; prüfen Sie sie vor der Reise noch einmal.",
  byline: { by: "Von", reviewed: "Informationen geprüft am" },
  compass: { n: "N", s: "S", w: "W", e: "O" },
  dateLocale: "de-DE",
};

const spanish: DestinationEditionUi = {
  skip: "Ir a la guía",
  reviewed: "Revisado el",
  ctaLabel: "Planifica con un equipo local",
  whatTitle: (city) => `Qué ver en ${city}`,
  whatBody: "Abre uno para saber por qué merece el viaje y cómo visitarlo; las cuatro decisiones de abajo muestran cómo encajarlos en tus días.",
  themeLink: (name) => `Ideas de viaje: ${name}`,
  toursLabel: "Viajes privados",
  toursTitle: (city) => `Viajes privados que incluyen ${city}`,
  quoteTourAction: "Itinerario y presupuesto",
  toursBody: "Rutas ya preparadas, con el itinerario y los precios publicados o la opción de pedir presupuesto en cada página. Solo tu grupo, en tus fechas.",
  bandTitle: "Déjanos todo el viaje, o solo una parte.",
  bandTitleTrip: "Déjanos todo el viaje.",
  bandBodyTrip: "Te responde una persona de verdad, a partir de tus fechas y del tamaño de tu grupo.",
  bandBody: "Cada solicitud la responde una persona de verdad, a partir de tus fechas y del tamaño de tu grupo.",
  eyebrow: "Guía de la ciudad",
  decisionsLabel: "Cuatro decisiones sobre la ciudad",
  decisionsTitle: "Entiende la ciudad y después planifica los detalles.",
  decisionsBody: "Cuántas noches, en qué zona alojarte, cómo llegar y salir, adónde ir después. Cómo reservar cada parte está en nuestras guías prácticas.",
  adviceAction: "Ver las guías prácticas",
  signalLabels: { nights: "Tiempo", stay: "Dónde alojarte", gateway: "Llegada y salida", next: "Siguiente destino" },
  detailedAnswersLabel: "Más respuestas",
  detailedAnswers: (city) => `Más sobre ${city}`,
  detailedAnswersBody: "De dónde alojarte a cómo entrar y salir de la ciudad, una guía para cada pregunta.",
  evidenceSummary: "Fuentes y revisión",
  evidenceReviewed: "Información revisada el",
  evidenceBody: "La información de esta página procede de las fuentes oficiales y primarias de abajo. Los horarios y las normas cambian; vuelve a comprobarlos antes de viajar.",
  byline: { by: "Por", reviewed: "Información revisada el" },
  compass: { n: "N", s: "S", w: "O", e: "E" },
  dateLocale: "es-ES",
};

const arabic: DestinationEditionUi = {
  skip: "انتقل إلى الدليل",
  reviewed: "تمت المراجعة في",
  ctaLabel: "خطّط مع فريق محلي",
  whatTitle: (city) => `ماذا ترى في ${city}`,
  whatBody: "افتح أيًّا منها لتعرف لماذا يستحق الرحلة وكيف تزوره، والقرارات الأربعة أدناه تبيّن كيف تُدرجه في أيامك.",
  themeLink: (name) => `أفكار السفر: ${name}`,
  toursLabel: "رحلات خاصة",
  toursTitle: (city) => `رحلات خاصة تشمل ${city}`,
  quoteTourAction: "البرنامج وعرض السعر",
  toursBody: "مسارات جاهزة، في كل صفحة منها البرنامج والأسعار المنشورة أو طريقة طلب عرض السعر. مجموعتك وحدها، في المواعيد التي تختارها.",
  bandTitle: "اترك لنا الرحلة كلها، أو جزءًا منها.",
  bandTitleTrip: "اترك لنا الرحلة كلها.",
  bandBodyTrip: "يردّ عليك شخص حقيقي، انطلاقًا من مواعيدك وعدد أفراد مجموعتك.",
  bandBody: "يردّ شخص حقيقي على كل طلب، انطلاقًا من مواعيدك وعدد أفراد مجموعتك.",
  eyebrow: "دليل المدينة",
  decisionsLabel: "أربعة قرارات حول المدينة",
  decisionsTitle: "افهم المدينة أولًا، ثم خطّط للتفاصيل.",
  decisionsBody: "كم ليلة، وفي أي حيّ تقيم، ومن أين تصل وتغادر، وإلى أين تذهب بعدها. أما طريقة حجز كل جزء فتجدها في دليل السفر.",
  adviceAction: "تصفّح دليل السفر",
  signalLabels: { nights: "المدة", stay: "مكان الإقامة", gateway: "الوصول والمغادرة", next: "المحطة التالية" },
  detailedAnswersLabel: "إجابات أعمق",
  detailedAnswers: (city) => `المزيد عن ${city}`,
  detailedAnswersBody: "من مكان الإقامة إلى الوصول إلى المدينة ومغادرتها، دليل لكل سؤال.",
  evidenceSummary: "المصادر وسجل المراجعة",
  evidenceReviewed: "تم التحقق من المعلومات في",
  evidenceBody: "المعلومات في هذه الصفحة مأخوذة من المصادر الرسمية والأولية أدناه. مواعيد الفتح والقواعد تتغير، فتحقّق منها مرة أخرى قبل السفر.",
  byline: { by: "بقلم", reviewed: "تم التحقق من المعلومات في" },
  compass: { n: "ش", s: "ج", w: "غ", e: "ق" },
  dateLocale: "ar-SA-u-ca-gregory-nu-latn",
};

const ui: Readonly<Record<DestinationEditionLocale, DestinationEditionUi>> = {
  fr: french,
  de: german,
  es: spanish,
  ar: arabic,
  ja: japaneseDestinationEditionUi,
};

export function getDestinationEditionUi(language: DestinationEditionLocale): DestinationEditionUi {
  return ui[language];
}

/** A link label for a page that stays English: the edition's marker ends it (Japanese without a space). */
export function withEditionEnglishMarker(language: DestinationEditionLocale, label: string) {
  return language === "ja" ? `${label}${editionEnglishMarker.ja}` : `${label} ${editionEnglishMarker[language]}`;
}
