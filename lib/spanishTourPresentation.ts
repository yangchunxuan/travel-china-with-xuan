import type { LocalizedPrivateTourProduct } from "./privateTourProducts";
import {
  spanishTourContactNote,
  spanishEmailHref,
  spanishGuideLanguageNote,
  spanishPublishedPriceNote,
  spanishSite,
  spanishWhatsAppHref,
} from "./spanishSite";
import { getSpanishTourCopy, spanishTourPath, spanishTourSlugs } from "./spanishTourCopy";
import { spanishGuidesForTour } from "./spanishGuides";

/** Section labels of a Spanish tour page; the tour's own text comes from its copy file. */
export function spanishTourPageCopy(product: LocalizedPrivateTourProduct) {
  const publishedGroups = [...new Set(product.packages.flatMap((item) =>
    item.rows.map((row) => row.travelers),
  ))].sort((left, right) => left - right);
  const groupList = publishedGroups.length > 1
    ? `${publishedGroups.slice(0, -1).join(", ")} y ${publishedGroups.at(-1)}`
    : publishedGroups.join("");
  const duration = `${product.days} días · ${product.nights} noches`;
  const fixedRoute = product.slug === "zhangjiajie-forest-4-day-private-tour";
  return {
    htmlLang: "es",
    skipLink: "Ir a los detalles del viaje",
    breadcrumbLabel: "Ruta de navegación",
    homeLabel: "Inicio",
    productLabel: "Viajes a China",
    heroMeta: `${product.days} DÍAS / ${product.nights} NOCHES · VIAJE PRIVADO · SIN COMPRAS`,
    heroPromise: product.eyebrow,
    facts: [
      { label: "Duración", value: duration },
      { label: "Guía", value: "De habla inglesa; en español con suplemento" },
      { label: "Alojamiento", value: `${product.nights} noches · detalle confirmado por escrito` },
      {
        label: "Precio",
        value: publishedGroups.length
          ? `Publicado para ${groupList} viajeros`
          : "Presupuesto según fechas y grupo",
      },
    ],
    overviewEyebrow: "El viaje, de un vistazo",
    overviewTitle: product.eyebrow,
    overviewBody: product.summary,
    routeEyebrow: "Día a día",
    routeTitle: "Así transcurre cada día.",
    routeBody:
      "La llegada, las visitas principales y la salida se muestran día a día. Los horarios de apertura, las entradas nominativas y las condiciones locales pueden cambiar el orden. Si hay que cambiar algo importante, lo hablamos con usted.",
    serviceEyebrow: "Todo coordinado",
    serviceTitle: "Hoteles, guías y traslados funcionan juntos.",
    serviceBody:
      `La categoría del hotel, los días con guía, los traslados, el transporte de la ruta y las entradas principales se planifican juntos. Comprobamos la disponibilidad para sus fechas antes del pago. ${spanishGuideLanguageNote}`,
    hotelTitle: "Alojamiento",
    transportTitle: "Guía, transporte y entradas",
    scopeEyebrow: "Claro antes de pagar",
    scopeTitle: "Lo que va aparte y lo que confirma su presupuesto por escrito.",
    exclusionsTitle: "No incluido",
    confirmedTitle: "Confirmado por escrito",
    confirmations: [
      "Sus fechas y los datos de llegada y salida",
      "El hotel, el reparto de habitaciones y el vehículo para su grupo",
      "Las entradas que se pueden reservar y el total final antes de pagar",
    ],
    finalEyebrow: fixedRoute ? "Esta ruta fija, en sus fechas" : "Haga suyo este viaje",
    finalTitle: fixedRoute
      ? "¿Quiere comprobar esta ruta fija para sus fechas?"
      : "¿Adaptamos esta ruta a su viaje?",
    finalBody: fixedRoute
      ? "Díganos sus fechas, el número de viajeros y si prefiere la villa o el hotel de 4 estrellas. Comprobamos el alojamiento y la disponibilidad para esta ruta fija y le confirmamos el presupuesto por escrito."
      : "Díganos sus fechas, el número de viajeros y lo que más le importa. Partimos de esta ruta y la ajustamos.",
    contact: "Pedir presupuesto en español",
    email: "Escribir por correo",
  };
}

/** Price console wording; the amounts and the selection logic stay shared. */
export const spanishPriceCopy = {
  choosePackage: "Elija una opción de servicio",
  chooseGroup: "Elija el número de viajeros",
  publishedPrice: "Precio publicado para el grupo elegido",
  perPerson: "por persona",
  groupUnit: " viajeros",
  privateTour: "viaje privado",
  flightsSeparate: "vuelos no incluidos",
  internationalFlightsSeparate: "vuelos internacionales no incluidos",
  priceBasis: "Precio por persona",
  twinShare: "habitación doble compartida",
  smallGroup: "grupo reducido",
  checkDates: "Pedir presupuesto",
  otherGroups: "¿Viajan otro número de personas?",
  otherGroupsBody:
    "Confirmamos las habitaciones, el número de maletas y un vehículo adecuado antes de enviar el presupuesto por escrito.",
  requestQuote: "Consultar este viaje",
  quoteOnlyTitle: "Precio confirmado para sus fechas y su grupo",
  quoteOnlyBody:
    "Esta ruta no tiene un precio público estable. Díganos sus fechas, el número de viajeros y las habitaciones que necesita, y le damos un total por escrito antes de pagar.",
  emailLabel: "Escribir por correo",
  whatsappLabel: "O chatear por WhatsApp",
  draftNote: spanishTourContactNote,
  currencyNote: spanishPublishedPriceNote,
} as const;

/** Photo controls on a Spanish tour page. `dayPrefix` gives "Día 3". */
export const spanishPhotoCopy = {
  nextPhoto: "Ver la siguiente fotografía del viaje",
  routeLabel: "Elija un día para cambiar la fotografía del viaje",
  routeScenes: "Escenas del día",
  dayUnit: "",
  dayPrefix: "Día ",
  controls: "es",
} as const;

export const spanishPhotoCreditCopy = {
  title: "Créditos de las fotografías",
  intro:
    "Las fotografías externas de lugares concretos se acreditan a continuación. Solo se aplicaron recortes, cambios de tamaño y conversión a WebP habituales; no hay ediciones generativas. Las fotos CC BY-SA adaptadas se comparten con la misma licencia CC BY-SA enlazada.",
  by: "Foto de",
  localNote:
    "Las demás fotografías proceden de la biblioteca del proyecto Homeground y el propietario del sitio autorizó su uso en esta web. Solo se aplicaron recortes, cambios de tamaño y conversión de formato habituales.",
} as const;

export const spanishBeforeYouChooseTitle = "Antes de elegir este viaje";

export const spanishCommercialCopy = {
  productLabel: "Antes de decidir",
  productTitle: "Guías y otras rutas para comparar.",
  productBody:
    "Estas guías explican qué ver, cuántos días hacen falta y cómo se organiza cada lugar de la ruta. También puede comparar con otro viaje publicado.",
  destinations: "Destinos",
  guides: "Guías en español",
  related: "Otros viajes",
} as const;

/** Guides that lead to this tour, then the other Spanish tours and the list. */
export function spanishTourPlanningContext(slug: string) {
  return {
    destinations: [] as { id: string; href: string; label: string }[],
    guides: spanishGuidesForTour(slug).map((guide) => ({
      id: guide.slug,
      href: guide.path,
      label: guide.navTitle,
    })),
    relatedProducts: [
      ...spanishTourSlugs
        .filter((candidate) => candidate !== slug)
        .map((candidate) => ({
          id: candidate,
          href: spanishTourPath(candidate),
          label: getSpanishTourCopy(candidate)!.title,
        })),
      { id: "es-tour-hub", href: spanishSite.tours, label: "Ver todos los viajes" },
    ],
  };
}

/** Draft messages for WhatsApp and email, keyed like the Japanese contact links. */
export function spanishTourContactHrefs(product: LocalizedPrivateTourProduct) {
  const url = `https://homegroundchina.com${product.path}`;
  const whatsapp: Record<string, string> = {};
  const email: Record<string, string> = {};
  const add = (key: string, packageLabel?: string, travelers?: number) => {
    const message = [
      "Hola. Me gustaría consultar este viaje.",
      `Viaje: ${product.title}`,
      ...(packageLabel && product.packages.length > 1 ? [`Opción: ${packageLabel}`] : []),
      `Número de viajeros: ${travelers ?? ""}`,
      "Fechas aproximadas:",
      "Idioma del guía (inglés, o español con suplemento):",
      `Página de referencia: ${url}`,
    ].join("\n");
    whatsapp[key] = spanishWhatsAppHref(message);
    email[key] = spanishEmailHref(`Consulta en español: ${product.title}`, message);
  };
  add("other");
  for (const tourPackage of product.packages) {
    for (const row of tourPackage.rows) {
      add(`${tourPackage.id}:${row.travelers}`, tourPackage.label, row.travelers);
    }
  }
  return { whatsapp, email };
}
