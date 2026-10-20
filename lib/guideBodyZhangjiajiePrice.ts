// @ts-ignore Source-TypeScript tests read the JSON with an import attribute.
import pricing from "../content/product-previews/zhangjiajie-4-day-private-tour/pricing.json" with { type: "json" };
// @ts-ignore Source-TypeScript tests require the explicit extension.
import { formatPrivateTourPrice } from "./privateTourProducts.ts";

/**
 * The Zhangjiajie 4-day private tour keeps its prices in its own pricing.json,
 * outside the structured tour table that lib/guideBodyPrices reads. Guide
 * bodies quote it from here, so the text cannot drift from the tour page.
 */
type BodyLocale = "en" | "zh";

const tier = pricing.tiers.find((candidate: { featured?: boolean }) => candidate.featured);
if (!tier || typeof tier.from_price_per_person !== "number" || typeof tier.six_person_price_per_person !== "number") {
  throw new Error("The Zhangjiajie 4-day pricing has no featured tier with both group prices.");
}

/** Per-person price: "two-to-four" adults share one rate; "six" is the six-adult rate. */
export function bodyZhangjiajieFourDayPrice(party: "two-to-four" | "six", locale: BodyLocale): string {
  const cny = party === "six" ? tier.six_person_price_per_person : tier.from_price_per_person;
  return formatPrivateTourPrice(cny, locale).formatted;
}

/** The last travel date the published prices cover, e.g. "30 December 2026" or "2026 年 12 月 30 日". */
export function bodyZhangjiajieFourDayValidUntil(locale: BodyLocale): string {
  const date = new Date(pricing.valid_until);
  if (locale === "zh") {
    // Site style for Chinese dates: "2026 年 12 月 30 日".
    const parts = new Intl.DateTimeFormat("en-CA", { year: "numeric", month: "numeric", day: "numeric", timeZone: "Asia/Shanghai" }).formatToParts(date);
    const part = (type: string) => parts.find((item) => item.type === type)?.value;
    return `${part("year")} 年 ${Number(part("month"))} 月 ${Number(part("day"))} 日`;
  }
  return new Intl.DateTimeFormat("en-GB", {
    year: "numeric", month: "long", day: "numeric", timeZone: "Asia/Shanghai",
  }).format(date);
}

export const bodyZhangjiajieFourDayPath: Readonly<Record<BodyLocale, string>> = {
  en: "/tours/zhangjiajie-4-day-private-tour/",
  zh: "/zh/tours/zhangjiajie-4-day-private-tour/",
};
