/** Published service equivalents using the shared service templates. */
export type ServiceEditionLocale = 'fr' | 'es' | 'de' | 'ar' | 'ja';
export const serviceDetailSlugs = ['private-english-speaking-guides', 'private-car-and-driver', 'china-attraction-reservations', 'full-trip-support'] as const;
export type ServiceDetailSlug = typeof serviceDetailSlugs[number];

export function serviceEditionPath(language: ServiceEditionLocale, slug: string) {
  return `/${language}/services/${slug}/`;
}
export const serviceEditionLabels = {
  ja: { home: 'ホーム', skipLink: '本文へ移動' },
  ar: { home: 'الرئيسية', skipLink: 'انتقل إلى المحتوى' },
  de: { home: 'Startseite', skipLink: 'Zum Inhalt' },
  fr: { home: 'Accueil', skipLink: 'Aller au contenu' },
  es: { home: 'Inicio', skipLink: 'Saltar al contenido' },
} as const;
export function serviceEditionPaths(language: ServiceEditionLocale) {
  const home = `/${language}/`;
  return {
    home, services: `${home}services/`, tours: `${home}tours/`,
    guides: language === 'es' ? '/es/guias/' : `/${language}/guides/`,
    privacy: `${home}privacy/`, terms: `${home}terms/`, business: `${home}business-information/`,
    guide: serviceEditionPath(language, 'private-english-speaking-guides'),
    car: serviceEditionPath(language, 'private-car-and-driver'),
    reservations: serviceEditionPath(language, 'china-attraction-reservations'),
    support: serviceEditionPath(language, 'full-trip-support'),
    comparison: `${home}tours/zhangjiajie-4-day-private-tour/${language === "ja" ? "" : "#zhangjiajie-route-comparison-title"}`,
  };
}
export function serviceDetailAlternates(slug: string) {
  const en = `/services/${slug}/`;
  return { en, 'zh-Hans': `/zh${en}`, ko: `/ko${en}`, ja: `/ja${en}`, fr: `/fr${en}`, es: `/es${en}`, de: `/de${en}`, ar: `/ar${en}`, 'x-default': en };
}
export function serviceDetailLanguagePaths(slug: string) {
  const paths = serviceDetailAlternates(slug);
  return [
    { label: 'EN', lang: 'en', path: paths.en },
    { label: '中文', lang: 'zh-Hans', path: paths['zh-Hans'] },
    { label: '한국어', lang: 'ko', path: paths.ko },
    { label: '日本語', lang: 'ja', path: paths.ja },
    { label: 'FR', lang: 'fr', path: paths.fr },
    { label: 'ES', lang: 'es', path: paths.es },
    { label: 'DE', lang: 'de', path: paths.de },
    { label: 'العربية', lang: 'ar', path: paths.ar },
  ] as const;
}
export function serviceDetailSlugFromPath(path: string): ServiceDetailSlug | undefined {
  const slug = /^(?:\/(?:zh|ko|ja|fr|es|de|ar))?\/services\/([^/]+)\/$/.exec(path)?.[1];
  return serviceDetailSlugs.find(candidate => candidate === slug);
}
