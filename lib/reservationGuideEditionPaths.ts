/** Full translations of the six guides with owner-approved reservation offers. */
export const reservationGuideEditionLocales = ["ja", "fr", "es", "de", "ar"] as const;
export type ReservationGuideEditionLocale = typeof reservationGuideEditionLocales[number];
export const reservationGuideEditionSlugs = ["food-plants-and-animal-products-into-china", "yangshuo-town-or-yulong-river-where-to-stay", "shanghai-where-to-stay-first-trip", "tianmen-mountain-tickets-and-routes", "li-river-cruise-tickets-piers-booking", "forbidden-city-for-foreign-visitors"] as const;
export type ReservationGuideEditionSlug = typeof reservationGuideEditionSlugs[number];
export function isReservationGuideEditionSlug(slug: string): slug is ReservationGuideEditionSlug {
  return (reservationGuideEditionSlugs as readonly string[]).includes(slug);
}
export function reservationGuideEditionPath(language: ReservationGuideEditionLocale, slug: string) {
  return `/${language}/${language === "es" ? "guias" : "guides"}/${slug}/`;
}
export function reservationGuideEditionAlternates(slug: string): Record<string, string> {
  if (!isReservationGuideEditionSlug(slug)) return {};
  const en = `/guides/${slug}/`;
  return { en, "zh-Hans": `/zh${en}`, ko: `/ko${en}`, ...Object.fromEntries(reservationGuideEditionLocales.map(language => [language, reservationGuideEditionPath(language, slug)])), "x-default": en };
}
