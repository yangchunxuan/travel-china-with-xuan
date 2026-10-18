import { getArabicTourCopy } from "./arabicTourCopy";
import { arabicLegacyZhangjiajieContactTitle } from "./arabicLegacyContactCopy";
import { getAuthorizedGuideServiceCta } from "./existingContentCommercialLinks";
import { getFrenchTourCopy } from "./frenchTourCopy";
import { frenchLegacyZhangjiajieContactTitle } from "./frenchLegacyContactCopy";
import { getGermanTourCopy } from "./germanTourCopy";
import { germanLegacyZhangjiajieContactTitle } from "./germanLegacyContactCopy";
import { getGuideTourCard, type GuideTourCardData } from "./guideTourCard";
import { jaPilot } from "./jaPilot";
import { jaPilotCopy } from "./jaPilotCopy";
import { japaneseLegacyZhangjiajieCopy } from "./japaneseLegacyZhangjiajieProduct";
import { japaneseReservationGuideCommercialCopy } from "./japaneseReservationGuideCommercialCopy";
import { getJapaneseTourCopy } from "./japaneseTourCopy";
import { getGuideServiceCta } from "./privateGuideServiceCta";
import { privateGuideHours, privateGuideRates } from "./privateGuideServices";
import { isReservationGuideEditionSlug, type ReservationGuideEditionLocale } from "./reservationGuideEditionPaths";
import { serviceEditionPath } from "./serviceEdition";
import { getSpanishTourCopy } from "./spanishTourCopy";
import { spanishLegacyZhangjiajieContactTitle } from "./spanishLegacyContactCopy";

export interface ReservationGuideFooterCopy {
  readonly label: string;
  readonly title: string;
  readonly body: string;
  readonly button: string;
}

interface CommercialCopy {
  readonly relatedRoute: string;
  readonly viewItinerary: string;
  readonly legacyImageAlt: string;
  readonly cities: Readonly<Record<"beijing" | "zhangjiajie", string>>;
  readonly guide: {
    readonly label: string;
    readonly title: string;
    readonly body: string;
    readonly action: string;
  };
  readonly footer: ReservationGuideFooterCopy;
  readonly authorizedService: ReservationGuideFooterCopy;
}

/** Translates existing cards only; the English selectors retain product and service ownership. */
const copy: Readonly<Record<ReservationGuideEditionLocale, CommercialCopy>> = {
  ja: japaneseReservationGuideCommercialCopy,
  fr: {
    relatedRoute: "Circuit privé associé",
    viewItinerary: "Voir l’itinéraire",
    legacyImageAlt: "Pics de grès baignés de soleil et profondes ravines boisées dans le parc forestier national de Zhangjiajie.",
    cities: { beijing: "Pékin", zhangjiajie: "Zhangjiajie" },
    guide: {
      label: "Service de guide privé",
      title: "Ajoutez un guide anglophone titulaire d’une licence à {city}",
      body: "{rate} par guide pour une durée maximale de {hours} heures, uniquement pour le guide. Les transports, les billets d’entrée et les repas sont confirmés séparément dans votre devis écrit.",
      action: "Voir le service de guide",
    },
    footer: {
      label: "Préparez votre voyage avec une équipe locale",
      title: "Parlez-nous du voyage que vous envisagez.",
      body: "Indiquez vos dates, le nombre de voyageurs et votre budget approximatif. Un membre de notre équipe vous aidera à définir un itinéraire réaliste et l’aide dont vous avez réellement besoin.",
      button: "Parler à un conseiller voyage",
    },
    authorizedService: {
      label: "Service de préparation de voyage existant",
      title: "Besoin de vérifier ce choix d’hébergement dans votre itinéraire complet ?",
      body: "La planification complète du voyage et l’assistance sur place peuvent intégrer ce choix d’hébergement dans un périmètre défini par écrit et un devis personnalisé. Ce service ne garantit ni chambres disponibles en temps réel, ni tarif hôtelier fixe, ni acceptation des voyageurs par l’établissement.",
      button: "Voir l’assistance complète au périmètre défini",
    },
  },
  es: {
    relatedRoute: "Ruta privada relacionada",
    viewItinerary: "Ver el itinerario",
    legacyImageAlt: "Pilares de arenisca iluminados por el sol y profundos barrancos boscosos en el Parque Forestal Nacional de Zhangjiajie.",
    cities: { beijing: "Pekín", zhangjiajie: "Zhangjiajie" },
    guide: {
      label: "Servicio de guía privado",
      title: "Añade un guía de habla inglesa con licencia en {city}",
      body: "{rate} por guía para un máximo de {hours} horas, solo servicio de guía. El transporte, las entradas y las comidas se confirman por separado en el presupuesto escrito.",
      action: "Ver el servicio de guía",
    },
    footer: {
      label: "Planifica con un equipo local",
      title: "Cuéntanos el viaje que estás considerando.",
      body: "Comparte tus fechas, el número de viajeros y un presupuesto aproximado. Una persona de nuestro equipo te ayudará a definir una ruta razonable y el apoyo que realmente necesitas.",
      button: "Hablar con un asesor de viajes",
    },
    authorizedService: {
      label: "Servicio de planificación existente",
      title: "¿Quieres comprobar esta elección de alojamiento dentro de la ruta completa?",
      body: "El servicio de planificación integral y apoyo en destino puede incluir esta decisión de alojamiento dentro de un alcance escrito y un presupuesto personalizado. No garantiza habitaciones disponibles en tiempo real, un precio fijo de hotel ni la aceptación de huéspedes por parte del establecimiento.",
      button: "Ver el apoyo integral con alcance definido",
    },
  },
  de: {
    relatedRoute: "Passende Privatreise",
    viewItinerary: "Reiseverlauf ansehen",
    legacyImageAlt: "Sonnenbeschienene Sandsteinsäulen und tiefe bewaldete Schluchten im Nationalwaldpark Zhangjiajie.",
    cities: { beijing: "Peking", zhangjiajie: "Zhangjiajie" },
    guide: {
      label: "Privater Guideservice",
      title: "Buchen Sie zusätzlich einen lizenzierten englischsprachigen Guide in {city}",
      body: "{rate} pro Guide für bis zu {hours} Stunden, nur für den Guideservice. Transport, Eintrittskarten und Mahlzeiten werden in Ihrem schriftlichen Angebot separat bestätigt.",
      action: "Guideservice ansehen",
    },
    footer: {
      label: "Mit einem Team vor Ort planen",
      title: "Erzählen Sie uns von der Reise, die Sie planen.",
      body: "Teilen Sie uns Ihre Termine, die Gruppengröße und Ihr ungefähres Budget mit. Ein persönlicher Ansprechpartner hilft Ihnen, eine sinnvolle Route und die tatsächlich benötigte Unterstützung zu bestimmen.",
      button: "Mit einem Reiseplaner sprechen",
    },
    authorizedService: {
      label: "Bestehender Reiseplanungsservice",
      title: "Soll diese Unterkunftswahl im Rahmen Ihrer gesamten Route geprüft werden?",
      body: "Die vollständige Reiseplanung und Unterstützung vor Ort kann diese Unterkunftsentscheidung in einen schriftlich festgelegten Leistungsumfang und ein individuelles Angebot einbeziehen. Sie garantiert weder aktuell verfügbare Zimmer noch einen festen Hotelpreis oder die Aufnahme der Reisenden durch das Hotel.",
      button: "Reiseunterstützung mit festgelegtem Umfang ansehen",
    },
  },
  ar: {
    relatedRoute: "رحلة خاصة ذات صلة",
    viewItinerary: "عرض برنامج الرحلة",
    legacyImageAlt: "أعمدة من الحجر الرملي تضيئها الشمس وأخاديد عميقة تغطيها الغابات في منتزه تشانغجياجيه الوطني للغابات.",
    cities: { beijing: "بكين", zhangjiajie: "تشانغجياجيه" },
    guide: {
      label: "خدمة مرشد خاص",
      title: "أضف مرشدًا مرخّصًا ناطقًا بالإنجليزية في {city}",
      body: "{rate} لكل مرشد لمدة تصل إلى {hours} ساعات، وتشمل خدمة المرشد فقط. يُؤكَّد النقل وتذاكر الدخول والوجبات بشكل منفصل في عرض السعر المكتوب.",
      action: "اطّلع على خدمة المرشد",
    },
    footer: {
      label: "خطّط مع فريق محلي",
      title: "أخبرنا عن الرحلة التي تفكر فيها.",
      body: "شاركنا التواريخ وعدد المسافرين والميزانية التقريبية. سيساعدك أحد أفراد فريقنا في تحديد مسار مناسب والدعم الذي تحتاج إليه فعلًا.",
      button: "تحدث مع مخطط رحلات",
    },
    authorizedService: {
      label: "خدمة التخطيط الحالية",
      title: "هل تريد مراجعة اختيار الإقامة ضمن مسار الرحلة الكامل؟",
      body: "يمكن لخدمة تخطيط الرحلة بالكامل والدعم الميداني أن تشمل قرار الإقامة هذا ضمن نطاق مكتوب وعرض سعر مخصص. وهي لا تضمن توافر غرف في الوقت الفعلي أو سعرًا ثابتًا للفندق أو قبول المنشأة للمسافرين.",
      button: "اطّلع على دعم الرحلة الكامل ضمن نطاق محدد",
    },
  },
};

const tourCopyGetters = {
  ja: getJapaneseTourCopy,
  fr: getFrenchTourCopy,
  es: getSpanishTourCopy,
  de: getGermanTourCopy,
  ar: getArabicTourCopy,
} as const;

const legacyTitles = {
  ja: japaneseLegacyZhangjiajieCopy.title,
  fr: frenchLegacyZhangjiajieContactTitle,
  es: spanishLegacyZhangjiajieContactTitle,
  de: germanLegacyZhangjiajieContactTitle,
  ar: arabicLegacyZhangjiajieContactTitle,
} as const;

/** The same titles used by the already-published product pages, including the legacy four-day tour. */
export function localizedReservationTourTitle(language: ReservationGuideEditionLocale, slug: string): string | undefined {
  if (language === "ja" && slug === jaPilot.tourSlug) return jaPilotCopy.tour.title;
  return slug === "zhangjiajie-4-day-private-tour"
    ? legacyTitles[language]
    : tourCopyGetters[language](slug)?.title;
}

export function getReservationGuideTourCard(slug: string, language: ReservationGuideEditionLocale): GuideTourCardData {
  if (!isReservationGuideEditionSlug(slug)) throw new Error(`Unsupported reservation guide: ${slug}`);
  const source = getGuideTourCard(slug, "en");
  const text = copy[language];
  const translatedText: Readonly<Record<string, string>> = {
    "Related private route": text.relatedRoute,
    "View itinerary": text.viewItinerary,
  };
  const translate = (value: string) => {
    const translated = translatedText[value];
    if (!translated) throw new Error(`Untranslated reservation guide card copy: ${slug}: ${value}`);
    return translated;
  };
  const title = localizedReservationTourTitle(language, source.ctaId);
  const imageAlt = source.ctaId === "zhangjiajie-4-day-private-tour"
    ? text.legacyImageAlt
    : tourCopyGetters[language](source.ctaId)?.heroImage.alt;
  if (!title || !imageAlt || !source.href.startsWith("/tours/")) {
    throw new Error(`Missing published reservation guide product equivalent: ${language}: ${source.ctaId}`);
  }
  return {
    ...source,
    label: translate(source.label),
    title,
    // The six reviewed source cards currently have no note. Fail rather than silently drop a future source caveat.
    ...(source.note ? { note: translate(source.note) } : {}),
    action: translate(source.action),
    // Prefixing the existing href retains its exact selection parameters and fragment.
    href: `/${language}${source.href}`,
    image: { ...source.image, alt: imageAlt },
  };
}

export type ReservationGuideEditionServiceCta = Omit<NonNullable<ReturnType<typeof getGuideServiceCta>>, "label" | "action"> & {
  readonly label: string;
  readonly action: string;
};

/** Only the original Palace and Tianmen guide cards; no new service targets. */
export function getReservationGuideEditionServiceCta(slug: string, language: ReservationGuideEditionLocale): ReservationGuideEditionServiceCta | null {
  if (slug !== "forbidden-city-for-foreign-visitors" && slug !== "tianmen-mountain-tickets-and-routes") return null;
  const source = getGuideServiceCta(slug, "en");
  if (!source || (source.city !== "beijing" && source.city !== "zhangjiajie")) {
    throw new Error(`Unexpected reservation guide service target: ${slug}`);
  }
  const text = copy[language];
  const rate = `CNY ${new Intl.NumberFormat(language, { numberingSystem: "latn" }).format(privateGuideRates[source.city].standardCny)}`;
  const fill = (template: string) => template
    .replace("{city}", text.cities[source.city as "beijing" | "zhangjiajie"])
    .replace("{rate}", rate)
    .replace("{hours}", String(privateGuideHours));
  return {
    ...source,
    label: text.guide.label,
    title: fill(text.guide.title),
    body: fill(text.guide.body),
    action: text.guide.action,
    href: `${serviceEditionPath(language, "private-english-speaking-guides")}#${source.city}`,
  };
}

export const reservationGuideFooterCopy: Readonly<Record<ReservationGuideEditionLocale, ReservationGuideFooterCopy>> = {
  ja: copy.ja.footer,
  fr: copy.fr.footer,
  es: copy.es.footer,
  de: copy.de.footer,
  ar: copy.ar.footer,
};

/** Preserve the authorized service, query and fragment while opening the published home in this language. */
export function getReservationGuideAuthorizedServiceCta(slug: string, language: ReservationGuideEditionLocale) {
  if (!isReservationGuideEditionSlug(slug)) return null;
  const source = getAuthorizedGuideServiceCta(slug, "en");
  if (!source) return null;
  if (slug !== "shanghai-where-to-stay-first-trip" || source.serviceId !== "full-trip-support") {
    throw new Error(`Untranslated authorized reservation guide service: ${slug}`);
  }
  return { ...source, ...copy[language].authorizedService, href: `/${language}${source.href}` };
}
