/** Guide wording shared by the Spanish pages and their lightweight contact flow. */
export const spanishGuideLanguageNote =
  "El servicio de guía incluido depende de la opción de precio elegida: algunas rutas ofrecen una versión sin guía presencial. Podemos organizar un guía de habla hispana con suplemento; la disponibilidad y el precio se confirman en el presupuesto.";

export const spanishGuideLanguageBadge = "Guía en inglés · en español con suplemento";

/** Match a contact draft's guide wording to the chosen service, if any. */
export function spanishGuideDraftLine(packageId?: string) {
  if (packageId === "no-guide") return "Sin guía presencial ni interpretación.";
  if (packageId) return "Idioma del guía (inglés, o español con suplemento):";
  return "Opción de guía preferida (según la ruta: sin guía presencial, inglés o español con suplemento):";
}
