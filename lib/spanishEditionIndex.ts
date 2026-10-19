// @ts-ignore Node source tests use explicit TypeScript extensions.
import { privateTourInquiryIndex } from './privateTourInquiryIndex.ts';
/**
 * Which tours and guides have a Spanish page. Kept apart from the Spanish
 * text so the modules that only need the hreflang link stay small; a test
 * holds this index to the Spanish copy and guide registries.
 */
export const spanishTourPageSlugs: readonly string[] = Object.freeze(privateTourInquiryIndex.filter(product => product.visibility !== 'preview').map(product => product.slug));

/** English guide id → its Spanish page. */
export const spanishGuidePathBySourceId: Readonly<Record<string, string>> = Object.freeze({
  "how-to-pay-in-china-as-a-tourist": "/es/guias/como-pagar-en-china/",
  "china-online-arrival-card": "/es/guias/tarjeta-de-llegada-china/",
  "great-wall-section-selector-from-beijing": "/es/guias/muralla-china-desde-pekin/",
  "terracotta-warriors-without-tour": "/es/guias/guerreros-de-terracota-xian/",
  "chengdu-panda-base-or-dujiangyan-panda-valley": "/es/guias/osos-panda-chengdu/",
  "avatar-mountains-zhangjiajie": "/es/guias/montanas-de-avatar-china/",
  "yangshuo-china": "/es/guias/yangshuo-que-ver/",
  "beijing-where-to-stay-first-trip": "/es/guias/donde-alojarse-en-pekin/",
  "guangzhou-baiyun-airport-t2-t3": "/es/guias/aeropuerto-guangzhou-baiyun/",
  "best-zhangjiajie-night-show": "/es/guias/espectaculos-nocturnos-zhangjiajie/",
  "zhangjiajie-glass-bridge-vs-skywalk": "/es/guias/puente-de-cristal-zhangjiajie/",
  "harbin-ice-festival": "/es/guias/festival-de-hielo-de-harbin/",
  "passport-name-across-china-bookings": "/es/guias/pasaporte-nombre-billetes-china/",
});

/** English site pages that have a Spanish equivalent. */
export const spanishSitePagePathByEnglishPath: Readonly<Record<string, string>> = Object.freeze({
  "/": "/es/",
  "/tours/": "/es/tours/",
  "/guides/": "/es/guias/",
  "/services/": "/es/services/", "/studio/": "/es/studio/", "/business-information/": "/es/business-information/",
  "/terms/": "/es/terms/", "/privacy/": "/es/privacy/", "/refund-delivery/": "/es/refund-delivery/",
});

export function spanishTourPagePath(slug: string): string | undefined {
  return (spanishTourPageSlugs.includes(slug) || slug === "zhangjiajie-4-day-private-tour" || slug === "xian-terracotta-warriors-half-day-private-tour") ? `/es/tours/${slug}/` : undefined;
}
