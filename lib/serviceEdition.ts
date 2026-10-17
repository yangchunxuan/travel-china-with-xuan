/** Published service equivalents. Japanese service detail pages do not yet exist. */
export type ServiceEditionLocale = 'fr' | 'es';
export const serviceDetailSlugs = ['private-english-speaking-guides', 'private-car-and-driver', 'china-attraction-reservations', 'full-trip-support'] as const;
export type ServiceDetailSlug = typeof serviceDetailSlugs[number];

export function serviceEditionPath(language: ServiceEditionLocale, slug: string) {
  return `/${language}/services/${slug}/`;
}
export const serviceEditionLabels = {
  fr: { home: 'Accueil', skipLink: 'Aller au contenu' },
  es: { home: 'Inicio', skipLink: 'Saltar al contenido' },
} as const;
export function serviceEditionPaths(language: ServiceEditionLocale) {
  const home = `/${language}/`;
  return {
    home, services: `${home}services/`, tours: `${home}tours/`,
    guides: language === 'fr' ? '/fr/guides/' : '/es/guias/',
    privacy: `${home}privacy/`, terms: `${home}terms/`, business: `${home}business-information/`,
    guide: serviceEditionPath(language, 'private-english-speaking-guides'),
    car: serviceEditionPath(language, 'private-car-and-driver'),
    reservations: serviceEditionPath(language, 'china-attraction-reservations'),
    support: serviceEditionPath(language, 'full-trip-support'),
    comparison: `${home}tours/zhangjiajie-4-day-private-tour/#zhangjiajie-route-comparison-title`,
  };
}
export function serviceDetailAlternates(slug: string) {
  const en = `/services/${slug}/`;
  return { en, 'zh-Hans': `/zh${en}`, ko: `/ko${en}`, fr: `/fr${en}`, es: `/es${en}`, 'x-default': en };
}
export function serviceDetailLanguagePaths(slug: string) {
  const paths = serviceDetailAlternates(slug);
  return [
    { label: 'EN', lang: 'en', path: paths.en },
    { label: '中文', lang: 'zh-Hans', path: paths['zh-Hans'] },
    { label: '한국어', lang: 'ko', path: paths.ko },
    { label: 'FR', lang: 'fr', path: paths.fr },
    { label: 'ES', lang: 'es', path: paths.es },
  ];
}
export function serviceDetailSlugFromPath(path: string): ServiceDetailSlug | undefined {
  const slug = /^(?:\/(?:zh|ko|fr|es))?\/services\/([^/]+)\/$/.exec(path)?.[1];
  return serviceDetailSlugs.find(candidate => candidate === slug);
}
