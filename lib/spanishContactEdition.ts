import type { ContactEdition } from "./contactEdition";
// @ts-ignore Source-TypeScript tests require the explicit extension.
import { homegroundBusiness } from "./homegroundBusiness.ts";
import type { PrivateTourInquiryContext } from "./privateTourInquiryContext";
// @ts-ignore Source-TypeScript tests require the explicit extension.
import { homegroundWhatsAppHref } from "./tourContact.ts";
// @ts-ignore Source-TypeScript tests require the explicit extension.
import { referralSources, type TourContactDraft } from "./tourContactDraft.ts";

/**
 * Spanish tour names as the Spanish tour pages show them. Kept here, apart
 * from the tours' full copy, so the contact flow does not carry ten
 * itineraries; a test holds the two lists together.
 */
export const spanishContactTourNames: Readonly<Record<string, string>> = {
  "beijing-xian-shanghai-8-day-private-tour": "Pekín, Xi'an y Shanghái: viaje privado de 8 días",
  "beijing-xian-guilin-shanghai-10-day-private-tour": "Pekín, Xi'an, Guilin y Shanghái: viaje privado de 10 días",
  "beijing-xian-zhangjiajie-guilin-shanghai-14-day-private-tour": "Pekín, Xi'an, Zhangjiajie, Guilin y Shanghái: viaje privado de 14 días",
  "beijing-xian-chengdu-guilin-shanghai-14-day-private-tour": "Pekín, Xi'an, Chengdu, Guilin y Shanghái: viaje privado de 14 días",
  "zhangjiajie-forest-4-day-private-tour": "Zhangjiajie: viaje privado de 4 días con ruta fija",
  "zhangjiajie-furong-fenghuang-7-day-private-tour": "Zhangjiajie, Furong y Fenghuang: viaje privado de 7 días",
  "guilin-yangshuo-5-day-private-tour": "Guilin y Yangshuo: viaje privado de 5 días",
  "beijing-highlights-5-day-private-tour": "Lo esencial de Pekín: viaje privado de 5 días",
  "xian-terracotta-warriors-5-day-private-tour": "Xi'an y los Guerreros de Terracota: viaje privado de 5 días",
  "chengdu-pandas-sanxingdui-5-day-private-tour": "Chengdu, pandas y Sanxingdui: viaje privado de 5 días",
};

/** Service options as the Spanish price tables name them. */
export const spanishContactPackageLabels: Readonly<Record<string, string>> = {
  "standard-guided": "Viaje privado",
  "fixed-route-english-guided": "Ruta fija con guía en inglés",
  "english-guided": "Con guía en inglés",
  "no-guide": "Sin guía presencial",
};

const tourPathPattern = /^\/es\/tours\/([a-z0-9-]+)\/$/u;
const guidePathPattern = /^\/es\/guias\/[a-z0-9-]+\/$/u;
const guideLanguageLine = "Idioma del guía (inglés, o español con suplemento):";

function tourName(context: PrivateTourInquiryContext) {
  return spanishContactTourNames[context.slug] ?? context.name;
}

function travellersLabel(count: number) {
  return count === 1 ? "1 viajero" : `${count} viajeros`;
}

function selectionLabel(context: PrivateTourInquiryContext) {
  const selection = context.selection;
  const packageLabel = selection ? spanishContactPackageLabels[selection.packageId] : undefined;
  return selection && packageLabel ? `${packageLabel} · ${travellersLabel(selection.travelers)}` : null;
}

function draftText(draft?: TourContactDraft) {
  if (!draft) return "";
  const source = referralSources.find((value) => value === draft.referralSource);
  const sourceLabel = source === "friend" ? "Amigos o familia" : source === "other" ? "Otro" : source;
  return [
    `Llegada prevista: ${draft.travelDate || "aún sin fechas"}`,
    draft.requestedTravelers != null ? `Viajeros en nuestro grupo: ${draft.requestedTravelers}` : "",
    draft.note.trim() ? `Detalles del viaje: ${draft.note.trim()}` : "",
    sourceLabel ? `Cómo conocí Homeground: ${sourceLabel}` : "",
  ].filter(Boolean).join("\n");
}

function pageUrl(context: PrivateTourInquiryContext | null, path?: string) {
  const publicPath = context ? `/es/tours/${context.slug}/` : path;
  return publicPath && (tourPathPattern.test(publicPath) || guidePathPattern.test(publicPath))
    ? `https://homegroundchina.com${publicPath}`
    : null;
}

function messageText(context: PrivateTourInquiryContext | null, path?: string, draft?: TourContactDraft) {
  return [
    "Hola. Me gustaría organizar un viaje privado a China.",
    context ? tourName(context) : null,
    context ? selectionLabel(context) : null,
    pageUrl(context, path),
    draftText(draft),
    guideLanguageLine,
  ].filter(Boolean).join("\n");
}

function mailtoHref(
  context: PrivateTourInquiryContext | null,
  draft?: TourContactDraft,
  guide?: { title: string; path: string },
) {
  const subject = context ? `Consulta de viaje privado: ${tourName(context)}` : "Consulta de viaje a China";
  const body = context
    ? [
        `Consulto por este viaje privado: ${tourName(context)}`,
        selectionLabel(context),
        `Página: https://homegroundchina.com/es/tours/${context.slug}/`,
      ].filter(Boolean).join("\n")
    : [
        "Hola, Homeground: estoy planeando un viaje a China y me gustaría hablar con ustedes.",
        guide?.title,
        guide ? pageUrl(null, guide.path) : null,
      ].filter(Boolean).join("\n");
  const completeBody = [body, draftText(draft), guideLanguageLine].filter(Boolean).join("\n\n");
  return `mailto:${homegroundBusiness.serviceEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(completeBody.replace(/\r?\n/g, "\r\n"))}`;
}

/** A WhatsApp link with the Spanish draft, for links outside the dialogs. */
export function spanishContactWhatsAppHref(context: PrivateTourInquiryContext | null, path?: string) {
  return homegroundWhatsAppHref(messageText(context, path));
}

/**
 * The main contact flow in Spanish. Enquiries saved from Spanish pages are
 * filed under the English contract (the intake service does not know Spanish
 * yet), so a saved quote starts with a line that says which Spanish page it
 * came from, and the receipt says the confirmation email is in English.
 */
export const spanishContactEdition: ContactEdition = {
  language: "es",
  intlLocale: "es-ES",
  toursPath: "/es/tours/",
  privacyHref: "/privacy/",
  homePath: "/es/",
  tourPath: (slug) => `/es/tours/${slug}/`,
  tourSlugFromPath: (path) => tourPathPattern.exec(path)?.[1] ?? null,
  isGuidePath: (path) => guidePathPattern.test(path),
  tourName,
  selectionLabel,
  travellersLabel,
  messageText,
  mailtoHref,
  noteMarker: (path) => `[Sent from the Spanish page https://homegroundchina.com${path}; the traveller read it in Spanish]`,
  noteTooLong: (limit) => `El mensaje no puede superar los ${limit} caracteres.`,
  frame: { title: "Consulte su viaje a China", close: "Cerrar" },
  card: {
    title: "Consulte su viaje a China",
    close: "Cerrar",
    chinaTime: "Hora de China",
    tourLabel: "Su itinerario",
    guideLabel: "Sobre esta guía",
    scanTitle: "Escanee para chatear desde el móvil",
    scanSteps: [
      "Apunte la cámara del móvil al código.",
      "WhatsApp se abre con el mensaje listo para enviar.",
    ],
    qrLabel: "Código QR que abre un chat de WhatsApp con Homeground",
    numberLabel: "WhatsApp",
    copy: "Copiar",
    copied: "Copiado",
    copyNumber: "Copiar el número de WhatsApp",
    copyEmail: "Copiar la dirección de correo",
    useHere: "Usar WhatsApp en este ordenador",
    or: "o",
    replyFrom: "Respondemos desde",
    directEmailAction: "Escribirnos por correo",
    openMailApp: "Abrir su aplicación de correo",
    tabsLabel: "Formas de contactarnos",
    tabWhatsApp: "WhatsApp",
    tabEmail: "Correo",
    tabMessenger: "Messenger",
    messengerScanTitle: "Escanee para chatear por Messenger",
    messengerSteps: ["Apunte la cámara del móvil al código.", "Messenger abre un chat con nosotros."],
    messengerQrLabel: "Código QR que abre Homeground en Messenger",
  },
  desk: {
    whatsappAction: "Abrir WhatsApp",
    whatsappOpensExternally: "Abre WhatsApp en una pestaña nueva o en la aplicación. No se envía nada a este sitio web.",
    whatsappUnavailable: "El chat directo por WhatsApp no está disponible por el momento.",
    messengerAction: "Escribirnos por Messenger",
    messengerOpensExternally: "Abre Messenger en una pestaña nueva o en la aplicación. No se envía nada a este sitio web.",
    emailTitle: "Deje su correo",
    emailLabel: "Su dirección de correo",
    emailPlaceholder: "usted@ejemplo.com",
    emailAction: "Quiero que Homeground me escriba",
    emailSubmitting: "Guardando su correo…",
    emailUse: "Solo se usa para responder a esta consulta. No es una suscripción comercial.",
    privacyLead: "Cómo tratamos estos datos:",
    privacyAction: "Aviso de privacidad (en inglés)",
    emailInvalid: "Escriba una dirección de correo completa.",
    retryAction: "Comprobar y reintentar",
    failed: "Su correo no se guardó. Inténtelo de nuevo o use WhatsApp.",
    uncertain: "No pudimos confirmar si su correo se guardó. Reintente con el mismo correo para comprobarlo sin duplicarlo.",
    emailUnavailable: "El formulario de correo no está disponible por el momento.",
  },
  tourContact: {
    title: "Planifiquemos su viaje.",
    intro: "Díganos cuándo le gustaría viajar. Le enviaremos un presupuesto personal por correo.",
    ask: "Consultar a un planificador",
    close: "Cerrar la consulta",
    whatsapp: "Chatear por WhatsApp",
    email: "Dirección de correo",
    date: "Fecha de llegada prevista",
    undecided: "Aún no tengo fechas",
    note: "¿Algo que debamos saber?",
    optional: "Opcional",
    placeholder: "Su grupo, sus intereses, el idioma del guía o un cambio en este itinerario…",
    submit: "Pedir mi presupuesto",
    sending: "Enviando…",
    privacy: "Aviso de privacidad (en inglés)",
    consent: "Usaremos estos datos para responder a su consulta.",
    manual: "Su planificador confirmará la disponibilidad y el precio final.",
    success: "Su consulta está guardada.",
    successBody: "Revisaremos su plan y le responderemos por correo.",
    reference: "Referencia",
    done: "Volver al itinerario",
    failed: "No pudimos guardar su consulta. Inténtelo de nuevo o contáctenos por las vías de abajo.",
    uncertain: "No pudimos confirmar si su consulta se guardó. Compruébelo de nuevo para reintentar la misma solicitud sin duplicarla.",
    retry: "Comprobar y reintentar",
    fallback: "¿Prefiere contactarnos directamente?",
    unavailable: "Envíenos un mensaje sobre este viaje. Incluirá su itinerario.",
    guideBody: "¿Está planeando un viaje a China? Hable con nuestro equipo sobre rutas, alojamientos y viajes privados.",
    guideEmail: "Enviarnos un correo",
    tours: "Ver itinerarios y precios",
    selected: "Su itinerario",
    alternative: "O chatear por WhatsApp",
  },
  direct: {
    intro: "Escríbanos desde su propio correo o por WhatsApp. Le responderemos en la misma conversación.",
    email: "Escribirnos por correo",
    formIntro: "¿Prefiere que le escribamos nosotros? Deje sus datos y le enviaremos un presupuesto personal.",
    failed: "No pudimos guardar su consulta. Inténtelo de nuevo o escríbanos con la opción de correo de arriba.",
  },
  quote: {
    placeholder: "Habitaciones, edades de los niños, llegada y salida, o necesidades al caminar…",
    source: "¿Cómo nos encontró?",
    blank: "Elija una opción si lo desea",
    friend: "Amigos o familia",
    other: "Otro",
    group: "¿Cuántas personas viajan?",
    groupHint: "Indique el tamaño de su grupo para contactarnos; el presupuesto será para ese grupo.",
    groupError: "Indique un grupo de entre 1 y 99 personas.",
  },
  fieldErrors: {
    email: "Revise su dirección de correo.",
    date: "Escriba una fecha de llegada válida o marque que aún no tiene fechas.",
    note: "El mensaje no puede superar los 1.000 caracteres.",
    control: "Elimine del mensaje los caracteres de control que se hayan copiado.",
  },
  labels: {
    stayPreference: "Alojamiento preferido (por confirmar)",
    guide: "Sobre esta guía",
    brand: "HOMEGROUND CHINA",
  },
  date: {
    placeholder: "DD/MM/AAAA",
    formatHint: "Día / mes / año (DD/MM/AAAA)",
    invalid: "Escriba una fecha válida con el formato DD/MM/AAAA.",
    openCalendar: "Abrir el calendario",
    closeCalendar: "Cerrar el calendario",
    title: "Elija una fecha de viaje",
    loadingCalendar: "Cargando el calendario…",
    calendarUnavailable: "No se pudo cargar el calendario. Ciérrelo para escribir la fecha o ábralo de nuevo para reintentar.",
  },
  receipt: {
    correctionSubject: "Corregir el correo de mi consulta",
    correctionBody: "Hola, Homeground: necesito corregir la dirección de correo de esta consulta.",
    correctionAddress: "Dirección de correo correcta: ",
    continuationGreeting: "Hola, Homeground: he enviado una consulta y me gustaría continuar por aquí.",
    details: "Ver los datos de la consulta",
    destinations: "Destinos solicitados",
    nights: "Duración del viaje (noches)",
    suppressedNext: "¿Busca una confirmación anterior? Mire en Spam o Correo no deseado y márquela como «No es spam». También puede escribirnos directamente a",
    directNext: "También puede escribirnos directamente a",
    title: "Hemos recibido su consulta",
    reference: "Referencia",
    email: "Le responderemos a",
    phone: "Respuesta por WhatsApp",
    homepage: "Consulta de viaje",
    planner: "Consulta de planificación de viaje",
    tour: "Su viaje",
    selection: "Opción de precio",
    date: "Fecha de llegada",
    undecided: "Aún sin fechas",
    party: "Viajeros",
    boundary: "Esto es una consulta, no una reserva. Confirmaremos el tamaño de su grupo y la disponibilidad antes de enviarle un presupuesto.",
    next: "¿No lo ve en su bandeja tras unos minutos? Mire en Spam o Correo no deseado, márquelo como «No es spam» y responda «Recibido»: así nuestras respuestas llegarán a su bandeja de entrada. ¿Sigue sin aparecer? Escríbanos a",
    whatsappNext: "El equipo de Homeground revisará su solicitud y le responderá por WhatsApp.",
    due: "Respuesta antes de",
    zone: "hora de China (UTC+8)",
    queued: "Le estamos enviando un correo de confirmación; ese correo llega en inglés y puede respondernos en español. No hace falta que envíe la consulta otra vez.",
    disabled: "Un planificador le responderá por correo; puede escribirnos en español. No hace falta que envíe la consulta otra vez.",
    suppressed: "Su consulta está guardada; esta vez no enviaremos otro correo de confirmación. No hace falta que la envíe otra vez.",
    unavailable: "No pudimos enviar el correo de confirmación, pero su consulta está guardada y un planificador le responderá igualmente.",
    correct: "¿Dirección equivocada?",
    correction: "Escríbanos con esta referencia para pedir la corrección.",
    emailAction: "Escribirnos por correo",
    whatsappAction: "WhatsApp",
    continueWhatsapp: "Continuar por WhatsApp",
    typoEnd: "?",
    typo: "¿Quiso decir",
    use: "Usar esta dirección",
    correctionLabel: "Corregir la dirección de correo",
    correctionHelp: "Usaremos la nueva dirección para esta consulta. Los datos de su viaje no cambian.",
    correctionSave: "Guardar el correo",
    correctionCancel: "Cancelar",
    correctionSaving: "Guardando…",
    correctionSaved: "Correo actualizado. Puede que una confirmación anterior ya se haya enviado a la dirección antigua.",
    correctionInvalid: "Escriba una dirección de correo válida.",
    correctionFailed: "No pudimos actualizar la dirección. Inténtelo de nuevo.",
    correctionUncertain: "No pudimos confirmar el cambio. Compruebe y reintente este mismo cambio.",
    correctionRetry: "Comprobar y reintentar",
    correctionUnavailable: "La corrección en línea ya no está disponible. Escríbanos por correo con su referencia.",
    correctionConflict: "Esta dirección se cambió en otro lugar. Escríbanos por correo con su referencia antes de intentarlo de nuevo.",
    correctionBusy: "Se está enviando un mensaje. Espere un momento y reinténtelo.",
    correctionSame: "Esta ya es su dirección de respuesta actual.",
  },
  // Measured on the Spanish sheet at every width from 320 px (see ContactCardFrame).
  sheetSteps: [325, 381, 466],
  sheetHeights: [[744, 792], [724, 772], [703, 742], [656, 695]],
};
