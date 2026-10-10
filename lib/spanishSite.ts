import { homegroundBusiness } from "./homegroundBusiness";

/**
 * Spanish edition: a small set of tour pages and the guides that lead to
 * them. It has its own routes and chrome, like the Japanese pages, and does
 * not go through the English, Chinese and Korean locale system.
 */
export const spanishSite = {
  home: "/es/",
  tours: "/es/tours/",
  guides: "/es/guias/",
  // The same link the main site uses for "talk to a planner": the contact card
  // answers it on every Spanish page, and without JavaScript it lands on the
  // home page's contact section.
  contact: "/es/#planner-contact",
} as const;

export interface SpanishNavLink {
  readonly href: string;
  readonly label: string;
  readonly description: string;
}

export const spanishPrimaryLinks: readonly SpanishNavLink[] = [
  { href: spanishSite.home, label: "Inicio", description: "Viajes a China en español" },
  { href: spanishSite.tours, label: "Viajes", description: "Rutas privadas con precio publicado" },
  { href: spanishSite.guides, label: "Guías", description: "Qué ver, cuántos días y cómo organizarlo" },
];

/** The legal pages exist in English only; the label says so. */
export const spanishLegalLinks: readonly { href: string; label: string }[] = [
  { href: "/business-information/", label: "Información de la empresa (en inglés)" },
  { href: "/terms/", label: "Condiciones (en inglés)" },
  { href: "/privacy/", label: "Privacidad (en inglés)" },
  { href: "/refund-delivery/", label: "Reembolsos (en inglés)" },
];

export interface SpanishLanguagePath {
  readonly label: "ES" | "EN" | "中文" | "한국어";
  readonly lang: "es" | "en" | "zh-Hans" | "ko";
  readonly path: string;
}

/**
 * Language switcher targets for a Spanish page whose English page is
 * `enPath`. Chinese and Korean use the usual prefixes unless overridden.
 */
export function spanishLanguagePaths(
  enPath: string,
  esPath: string,
  overrides: Partial<Record<"zh" | "ko", string>> = {},
): readonly SpanishLanguagePath[] {
  const suffix = enPath.replace(/^\//, "");
  return [
    { label: "ES", lang: "es", path: esPath },
    { label: "EN", lang: "en", path: enPath },
    { label: "中文", lang: "zh-Hans", path: overrides.zh ?? `/zh/${suffix}` },
    { label: "한국어", lang: "ko", path: overrides.ko ?? `/ko/${suffix}` },
  ];
}

/** hreflang map for a Spanish page's metadata. */
export function spanishAlternates(
  enPath: string,
  esPath: string,
  overrides: Partial<Record<"zh" | "ko" | "ja", string>> = {},
) {
  const suffix = enPath.replace(/^\//, "");
  return {
    en: enPath,
    "zh-Hans": overrides.zh ?? `/zh/${suffix}`,
    ko: overrides.ko ?? `/ko/${suffix}`,
    ...(overrides.ja ? { ja: overrides.ja } : {}),
    es: esPath,
    "x-default": enPath,
  } as const;
}

/**
 * Adds the Spanish page to another language's hreflang set (head only; the
 * visible language switcher on those pages is unchanged).
 */
export function withSpanishAlternate<
  T extends { alternates?: { languages?: object | null } | null },
>(metadata: T, esPath: string | undefined): T {
  if (!esPath) return metadata;
  const alternates = metadata.alternates ?? {};
  return {
    ...metadata,
    alternates: { ...alternates, languages: { ...(alternates.languages ?? {}), es: esPath } },
  };
}

/** The published price includes an English-speaking guide; a Spanish-speaking one costs more. */
export const spanishGuideLanguageNote =
  "El precio publicado incluye guía de habla inglesa. Podemos organizar un guía de habla hispana con suplemento; la disponibilidad y el precio se confirman en el presupuesto.";

export const spanishGuideLanguageBadge = "Guía en inglés · en español con suplemento";

/** Says the contact buttons open a draft that the traveller sends. */
export const spanishDraftNote =
  "WhatsApp y el correo abren un borrador: no se envía nada hasta que usted lo envíe.";

/** Tour pages also open the on-site quote form, which says on screen when it has saved. */
export const spanishTourContactNote =
  "El formulario del sitio confirma en pantalla cuando su consulta queda guardada. WhatsApp y el correo solo abren un borrador que usted mismo envía.";

/** Spanish wording of the price note the owner approved for the tour pages. */
export const spanishPublishedPriceNote =
  "Precio por persona desde, para el número de viajeros indicado. Los festivos, el tamaño del grupo y el tipo de habitación lo modifican; el precio final es el del presupuesto por escrito, antes de pagar. Los importes en USD son orientativos; el presupuesto también confirma la moneda y el tipo de cambio.";

function whatsappNumber() {
  const configured = process.env.NEXT_PUBLIC_HOMEGROUND_WHATSAPP_NUMBER || "8613174215999";
  return /^\d{7,15}$/.test(configured) ? configured : "8613174215999";
}

export function spanishWhatsAppHref(message: string) {
  return `https://wa.me/${whatsappNumber()}?text=${encodeURIComponent(message)}`;
}

export function spanishEmailHref(subject: string, message: string) {
  return `mailto:${homegroundBusiness.serviceEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
}

/**
 * General Spanish enquiry (no tour chosen yet). The message is a draft the
 * traveller edits and sends; opening it sends nothing and stores nothing.
 */
export function spanishGeneralContactHrefs(sourcePath: string) {
  const message = [
    "Hola. Me gustaría consultar un viaje a China.",
    "Lugares o viaje que me interesan:",
    "Fechas aproximadas:",
    "Número de viajeros:",
    "Idioma del guía (inglés, o español con suplemento):",
    `Página de referencia: https://homegroundchina.com${sourcePath}`,
  ].join("\n");
  return {
    whatsapp: spanishWhatsAppHref(message),
    email: spanishEmailHref("Consulta en español: viaje a China", message),
  } as const;
}

/** Open Graph and Twitter fields for Spanish pages. */
export function buildSpanishSocialMetadata({
  title,
  description,
  url,
  type = "website",
  image = {
    url: "https://homegroundchina.com/images/home/beijing-hero-2400.jpg",
    width: 2400,
    height: 1600,
    alt: "Torre de esquina de la Ciudad Prohibida de Pekín reflejada en el foso",
  },
}: {
  title: string;
  description: string;
  url: string;
  type?: "website" | "article";
  image?: { url: string; width: number; height: number; alt: string };
}) {
  return {
    openGraph: {
      siteName: "Homeground China",
      title,
      description,
      type,
      locale: "es_ES",
      url,
      images: [image],
    },
    twitter: {
      card: "summary_large_image" as const,
      title,
      description,
      images: [{ url: image.url, alt: image.alt }],
    },
  };
}
