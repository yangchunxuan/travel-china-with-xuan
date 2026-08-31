import type { HomegroundLocale } from "./homegroundI18n";

export const privateTourInquiryQueryKey = "tour";

export const privateTourInquirySlugs = [
  "shanghai-suzhou-hangzhou-6-day-private-tour",
  "chengdu-pandas-sanxingdui-5-day-private-tour",
  "xian-terracotta-warriors-5-day-private-tour",
  "chongqing-wulong-5-day-private-tour",
  "guilin-yangshuo-5-day-private-tour",
  "harbin-winter-5-day-private-tour",
  "shanghai-suzhou-5-day-private-tour",
  "beijing-highlights-5-day-private-tour",
  "zhangjiajie-forest-4-day-private-tour",
  "zhangjiajie-4-day-private-tour",
] as const;

export type PrivateTourInquirySlug =
  (typeof privateTourInquirySlugs)[number];

export interface PrivateTourInquiryContext {
  readonly slug: PrivateTourInquirySlug;
  readonly name: string;
}

const privateTourInquiryNames: Readonly<
  Record<PrivateTourInquirySlug, Readonly<Record<HomegroundLocale, string>>>
> = {
  "shanghai-suzhou-hangzhou-6-day-private-tour": {
    en: "Shanghai, Suzhou & Hangzhou: 6-Day Private Tour",
    zh: "上海·苏州·杭州 6 天 5 晚私家团",
    ko: "상하이·쑤저우·항저우 6일 프라이빗 투어",
  },
  "chengdu-pandas-sanxingdui-5-day-private-tour": {
    en: "Chengdu, Pandas & Sanxingdui: 5-Day Private Tour",
    zh: "成都·大熊猫·三星堆 5 天 4 晚私家团",
    ko: "청두·판다·싼싱두이 5일 프라이빗 투어",
  },
  "xian-terracotta-warriors-5-day-private-tour": {
    en: "Xi'an & the Terracotta Warriors: 5-Day Private Tour",
    zh: "西安·兵马俑 5 天 4 晚私家团",
    ko: "시안·병마용 5일 프라이빗 투어",
  },
  "chongqing-wulong-5-day-private-tour": {
    en: "Chongqing & Wulong: 5-Day Private Tour",
    zh: "重庆·武隆 5 天 4 晚私家团",
    ko: "충칭·우룽 5일 프라이빗 투어",
  },
  "guilin-yangshuo-5-day-private-tour": {
    en: "Guilin & Yangshuo: 5-Day Private Tour",
    zh: "桂林·阳朔 5 天 4 晚私家团",
    ko: "구이린·양숴 5일 프라이빗 투어",
  },
  "harbin-winter-5-day-private-tour": {
    en: "Harbin Ice & Snow: 5-Day Private Tour",
    zh: "哈尔滨冰雪 5 天 4 晚私家团",
    ko: "하얼빈 빙설 5일 프라이빗 투어",
  },
  "shanghai-suzhou-5-day-private-tour": {
    en: "Shanghai & Suzhou: 5-Day Private Tour",
    zh: "上海·苏州 5 天 4 晚私家团",
    ko: "상하이·쑤저우 5일 프라이빗 투어",
  },
  "beijing-highlights-5-day-private-tour": {
    en: "Beijing Highlights: 5-Day Private Tour",
    zh: "北京经典 5 天 4 晚私家团",
    ko: "베이징 핵심 5일 프라이빗 투어",
  },
  "zhangjiajie-forest-4-day-private-tour": {
    en: "Zhangjiajie Forest: 4-Day Fixed-Route Private Tour",
    zh: "张家界森林公园 4 天 3 晚固定路线私家团",
    ko: "장자제 국립삼림공원 4일 고정 코스 프라이빗 투어",
  },
  "zhangjiajie-4-day-private-tour": {
    en: "Zhangjiajie in 4 Days: Peaks, Glass Bridge and Tianmen Mountain",
    zh: "张家界4天3晚：峰林、玻璃桥与天门山",
    ko: "장자제 4일 3박: 사암 봉우리와 유리다리, 톈먼산",
  },
};

export const privateTourInquiryContactCopy = {
  en: {
    surfaceLabel: "Tour selected",
    whatsappLine: "I’m asking about this private tour",
    emailSubject: "Private tour enquiry",
    emailBody: "I’m asking about this private tour",
    referenceLabel: "Product reference",
    genericEmailSubject: "China trip enquiry",
    genericEmailBody:
      "Hello Homeground, I’m planning a trip to China and would like to talk.",
  },
  zh: {
    surfaceLabel: "已选择的私家团",
    whatsappLine: "我想咨询这条私家团路线",
    emailSubject: "私家团咨询",
    emailBody: "我想咨询这条私家团路线",
    referenceLabel: "产品编号",
    genericEmailSubject: "中国旅行咨询",
    genericEmailBody: "你好 Homeground，我正在计划中国旅行，想先和你们聊聊。",
  },
  ko: {
    surfaceLabel: "선택한 프라이빗 투어",
    whatsappLine: "이 프라이빗 투어에 관해 문의합니다",
    emailSubject: "프라이빗 투어 문의",
    emailBody: "이 프라이빗 투어에 관해 문의합니다",
    referenceLabel: "상품 식별자",
    genericEmailSubject: "중국 여행 문의",
    genericEmailBody:
      "안녕하세요 Homeground, 중국 여행을 계획 중이라 먼저 상담하고 싶습니다.",
  },
} as const satisfies Record<HomegroundLocale, Record<string, string>>;

export function isPrivateTourInquirySlug(
  value: string | null | undefined,
): value is PrivateTourInquirySlug {
  return Boolean(
    value &&
      privateTourInquirySlugs.includes(value as PrivateTourInquirySlug),
  );
}

export function getPrivateTourInquiryContext(
  value: string | null | undefined,
  locale: HomegroundLocale,
): PrivateTourInquiryContext | null {
  if (!isPrivateTourInquirySlug(value)) return null;
  return {
    slug: value,
    name: privateTourInquiryNames[value][locale],
  };
}

export function buildPrivateTourInquiryHref(
  homePath: string,
  slug: PrivateTourInquirySlug,
  source: "private_tour" | "private_tour_product" | "product_preview",
): string {
  const parameters = new URLSearchParams({
    [privateTourInquiryQueryKey]: slug,
    utm_source: source,
    utm_medium: "website",
    utm_campaign: slug,
  });
  return `${homePath}?${parameters.toString()}#planner-contact`;
}

export function buildPrivateTourMailtoHref(
  email: string,
  locale: HomegroundLocale,
  context: PrivateTourInquiryContext | null,
): string {
  const copy = privateTourInquiryContactCopy[locale];
  const subject = context
    ? `${copy.emailSubject}: ${context.name}`
    : copy.genericEmailSubject;
  const body = context
    ? `${copy.emailBody}: ${context.name}\n${copy.referenceLabel}: ${context.slug}`
    : copy.genericEmailBody;
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
