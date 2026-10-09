import type { HomegroundLocale } from "./homegroundI18n";

export function zhangjiajieTourComparisonHref(locale: HomegroundLocale) {
  const prefix = locale === "en" ? "" : `/${locale}`;
  return `${prefix}/tours/zhangjiajie-4-day-private-tour/#zhangjiajie-route-comparison-title`;
}
