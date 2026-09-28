export type InquirySummaryLocale = "en" | "zh" | "ko" | "ja";

const destinations: Readonly<Record<string, readonly [string, string, string, string]>> = {
  "beijing-great-wall": ["Beijing & Great Wall", "北京与长城", "베이징·만리장성", "北京・万里の長城"],
  shanghai: ["Shanghai", "上海", "상하이", "上海"], xian: ["Xi’an", "西安", "시안", "西安"],
  chengdu: ["Chengdu", "成都", "청두", "成都"], chongqing: ["Chongqing", "重庆", "충칭", "重慶"],
  zhangjiajie: ["Zhangjiajie", "张家界", "장자제", "張家界"],
  "guilin-yangshuo": ["Guilin & Yangshuo", "桂林与阳朔", "구이린·양숴", "桂林・陽朔"],
  "hangzhou-suzhou": ["Hangzhou & Suzhou", "杭州与苏州", "항저우·쑤저우", "杭州・蘇州"],
  "yunnan-dali-lijiang": ["Yunnan · Dali & Lijiang", "云南·大理与丽江", "윈난·다리·리장", "雲南・大理・麗江"],
  "guangzhou-shenzhen": ["Guangzhou & Shenzhen", "广州与深圳", "광저우·선전", "広州・深圳"],
};

/** Shared website/email summary: no arbitrary destinations, otherPlace, or notes. */
export function safeInquiryDestinationNames(value: unknown, locale: InquirySummaryLocale): string[] {
  if (!Array.isArray(value)) return [];
  const languageIndex = ["en", "zh", "ko", "ja"].indexOf(locale);
  if (languageIndex < 0) return [];
  return [...new Set(value.filter((id): id is string => typeof id === "string" && Object.hasOwn(destinations, id)))]
    .map((id) => destinations[id][languageIndex]);
}

export function safeInquiryNights(value: unknown): number | null {
  if (typeof value !== "number" && typeof value !== "string") return null;
  if (!/^\d{1,2}$/.test(String(value))) return null;
  const nights = Number(value);
  return Number.isInteger(nights) && nights >= 1 && nights <= 60 ? nights : null;
}
