import type { HomegroundLocale } from "./homegroundI18n";

export const privateGuideCities = ["shanghai", "beijing", "xian", "zhangjiajie"] as const;
export type PrivateGuideCity = (typeof privateGuideCities)[number];
export const privateGuideHours = 8;
export const privateGuideEnquiryAnchor = "guide-enquiry";

/** Owner-approved retail rates. They do not imply unlimited party size or availability. */
export const privateGuideRates: Record<PrivateGuideCity, { standardCny: number; peakMinCny: number; peakMaxCny: number }> = {
  shanghai: { standardCny: 1200, peakMinCny: 1400, peakMaxCny: 1600 },
  beijing: { standardCny: 1200, peakMinCny: 1400, peakMaxCny: 1400 },
  xian: { standardCny: 900, peakMinCny: 1100, peakMaxCny: 1100 },
  zhangjiajie: { standardCny: 900, peakMinCny: 1100, peakMaxCny: 1100 },
};

export const privateGuideServicePath: Record<HomegroundLocale, string> = {
  en: "/services/private-english-speaking-guides/",
  zh: "/zh/services/private-english-speaking-guides/",
  ko: "/ko/services/private-english-speaking-guides/",
};

export function formatPrivateGuidePrice(amount: number, locale: HomegroundLocale) {
  const number = new Intl.NumberFormat(locale === "zh" ? "zh-CN" : locale === "ko" ? "ko-KR" : "en-GB").format(amount);
  return locale === "zh" ? `人民币 ${number}` : `CNY ${number}`;
}

export function privateGuidePeakPrice(city: PrivateGuideCity, locale: HomegroundLocale) {
  const rate = privateGuideRates[city];
  if (rate.peakMinCny === rate.peakMaxCny) return formatPrivateGuidePrice(rate.peakMinCny, locale);
  return `${formatPrivateGuidePrice(rate.peakMinCny, locale)}–${new Intl.NumberFormat("en-GB").format(rate.peakMaxCny)}`;
}
