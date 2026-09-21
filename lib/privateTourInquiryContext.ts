import type { HomegroundLocale } from "./homegroundI18n";
// @ts-ignore Source-TypeScript tests require the explicit extension.
import { privateTourProducts, type PrivateTourPriceTier } from "./privateTourProducts.ts";
// @ts-ignore Source-TypeScript tests require the explicit extension.
import { tourContactDraftText, type TourContactDraft } from "./tourContactDraft.ts";

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
  "zhangjiajie-furong-fenghuang-7-day-private-tour",
  "zhangjiajie-4-day-private-tour",
  "chengdu-jiuzhaigou-huanglong-6-day-private-tour",
  "kunming-dali-lijiang-8-day-private-tour",
  "guizhou-huangguoshu-libo-miao-7-day-private-tour",
  "xiamen-tulou-quanzhou-6-day-private-tour",
  "chaozhou-shantou-nanao-5-day-private-tour",
  "chengdu-chongqing-8-day-private-tour",
  "guangzhou-shunde-foshan-5-day-private-tour",
  "huangshan-hongcun-huizhou-5-day-private-tour",
  "jingdezhen-wuyuan-wangxian-6-day-private-tour",
  "changbaishan-yanji-winter-6-day-private-tour",
  "shanghai-disneyland-5-day-private-tour",
  "luoyang-dengfeng-kaifeng-6-day-private-tour",
  "datong-pingyao-6-day-private-tour",
  "zhangye-jiayuguan-dunhuang-7-day-private-tour",
  "chongqing-yangtze-cruise-6-day-private-tour",
  "xinjiang-ili-sayram-8-day-private-tour",
  "hulunbuir-7-day-private-tour",
  "kunming-jianshui-yuanyang-6-day-private-tour",
  "shenzhen-family-tech-4-day-private-tour",
  "beijing-xian-shanghai-12-day-private-tour",
] as const;

export type PrivateTourInquirySlug =
  (typeof privateTourInquirySlugs)[number];

export interface PrivateTourInquiryContext {
  readonly slug: PrivateTourInquirySlug;
  readonly name: string;
  readonly selection?: PrivateTourInquirySelection;
}

export interface PrivateTourInquirySelection {
  readonly packageId: string;
  readonly travelers: PrivateTourPriceTier["travelers"];
}

export const privateTourInquirySelectionQueryKeys = {
  packageId: "package",
  travelers: "travelers",
} as const;

const packageLabels = {
  "standard-guided": { en: "Private tour", zh: "私家团标准版", ko: "프라이빗 투어" },
  "standard-guided-winter": { en: "Private tour", zh: "私家团标准版", ko: "프라이빗 투어" },
  "english-guided": { en: "English-guided", zh: "含英语导游", ko: "영어 가이드 포함" },
  "no-guide": { en: "No on-site guide", zh: "无现场导游", ko: "현장 가이드 없음" },
  "fixed-route-english-guided": { en: "Fixed route with English guide", zh: "固定路线英语导游版", ko: "한국어 가이드 포함 고정 코스" },
} as const;

const phaseTwoKoreanGuideSlugs: ReadonlySet<PrivateTourInquirySlug> =
  new Set([
    // Phase-two Korean pages publish a Korean-speaking guide at the same base
    // price. The locale is persisted with the controlled slug and package id,
    // so the customer and notification labels must preserve that exact scope.
    "shanghai-disneyland-5-day-private-tour",
    "luoyang-dengfeng-kaifeng-6-day-private-tour",
    "datong-pingyao-6-day-private-tour",
    "zhangye-jiayuguan-dunhuang-7-day-private-tour",
    "chongqing-yangtze-cruise-6-day-private-tour",
    "xinjiang-ili-sayram-8-day-private-tour",
    "hulunbuir-7-day-private-tour",
    "kunming-jianshui-yuanyang-6-day-private-tour",
    "shenzhen-family-tech-4-day-private-tour",
    "beijing-xian-shanghai-12-day-private-tour",
  ] satisfies readonly PrivateTourInquirySlug[]);

function usesKoreanGuideStandardPackage(slug: PrivateTourInquirySlug): boolean {
  return slug === "zhangjiajie-furong-fenghuang-7-day-private-tour" ||
    phaseTwoKoreanGuideSlugs.has(slug);
}

export function getPrivateTourInquirySelection(
  slug: string | null | undefined,
  packageValue: string | null | undefined,
  travelersValue: string | number | null | undefined,
): PrivateTourInquirySelection | null {
  if (!isPrivateTourInquirySlug(slug) || !packageValue) return null;
  const travelers = Number(travelersValue);
  if (!Number.isInteger(travelers) || travelers < 2 || travelers > 9) return null;
  if (
    typeof travelersValue === "string" &&
    travelersValue !== String(travelers)
  ) return null;
  const product = privateTourProducts.find((candidate) => candidate.slug === slug);
  const tourPackage = product?.packages.find(
    (candidate) => candidate.id === packageValue,
  );
  if (
    !tourPackage?.prices.some((row) => row.travelers === travelers)
  ) return null;
  return {
    packageId: packageValue,
    travelers: travelers as PrivateTourPriceTier["travelers"],
  };
}

export function getPrivateTourDetailSelectionFromSearchParams(
  slug: string,
  parameters: URLSearchParams,
): PrivateTourInquirySelection | null {
  const { packageId, travelers } = privateTourInquirySelectionQueryKeys;
  if (parameters.getAll(packageId).length !== 1 || parameters.getAll(travelers).length !== 1) return null;
  return getPrivateTourInquirySelection(slug, parameters.get(packageId), parameters.get(travelers));
}

export function buildPrivateTourDetailHref(
  path: string,
  slug: string,
  selection: PrivateTourInquirySelection,
): string {
  const validated = getPrivateTourInquirySelection(slug, selection.packageId, selection.travelers);
  if (!validated) throw new Error("Invalid private tour selection");
  const url = new URL(path, "https://homegroundchina.com");
  url.searchParams.set(privateTourInquirySelectionQueryKeys.packageId, validated.packageId);
  url.searchParams.set(privateTourInquirySelectionQueryKeys.travelers, String(validated.travelers));
  return `${url.pathname}${url.search}${url.hash}`;
}

export function privateTourInquirySelectionLabel(
  context: PrivateTourInquiryContext,
  locale: HomegroundLocale,
): string | null {
  const selection = context.selection;
  if (!selection) {
    return locale === "ko" && phaseTwoKoreanGuideSlugs.has(context.slug)
      ? "한국어 가이드 포함"
      : null;
  }
  const packageLabel =
    locale === "ko" &&
    usesKoreanGuideStandardPackage(context.slug) &&
    selection.packageId === "standard-guided"
      ? "한국어 가이드 포함"
      : packageLabels[selection.packageId as keyof typeof packageLabels]?.[locale];
  if (!packageLabel) return null;
  const group = locale === "zh" ? `${selection.travelers} 人同行`
    : locale === "ko" ? `${selection.travelers}명 기준`
      : `${selection.travelers} travellers`;
  return `${packageLabel} · ${group}`;
}

/**
 * Traffic summaries combine all page languages into one package bucket, so
 * the forest tour's legacy package identifier cannot safely be displayed as
 * an English-guide promise in the admin view. Individual enquiries still use
 * their recorded locale and the precise label above.
 */
export function privateTourAggregateSelectionLabel(
  context: PrivateTourInquiryContext,
): string | null {
  const selection = context.selection;
  if (!selection) return null;
  if (
    context.slug === "zhangjiajie-forest-4-day-private-tour" &&
    selection.packageId === "fixed-route-english-guided"
  ) {
    return `固定路线导游版（语种按页面） · ${selection.travelers} 人同行`;
  }
  return privateTourInquirySelectionLabel(context, "zh");
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
  "zhangjiajie-furong-fenghuang-7-day-private-tour": {
    en: "Zhangjiajie, Furong Town & Fenghuang: 7-Day Private Tour",
    zh: "张家界、芙蓉镇与凤凰 7 天 6 晚私家团",
    ko: "장자제, 푸룽전, 펑황 6박 7일 프라이빗 투어",
  },
  "zhangjiajie-4-day-private-tour": {
    en: "Zhangjiajie in 4 Days: Peaks, Glass Bridge and Tianmen Mountain",
    zh: "张家界4天3晚：峰林、玻璃桥与天门山",
    ko: "장자제 4일 3박: 사암 봉우리와 유리다리, 톈먼산",
  },
  "chengdu-jiuzhaigou-huanglong-6-day-private-tour": {
    en: "Chengdu, Jiuzhaigou & Huanglong: 6-Day Private Tour",
    zh: "成都·九寨沟·黄龙 6 天 5 晚私家团",
    ko: "청두·주자이거우·황룽 6일 프라이빗 투어",
  },
  "kunming-dali-lijiang-8-day-private-tour": {
    en: "Kunming, Dali & Lijiang: 8-Day Private Tour",
    zh: "昆明·大理·丽江 8 天 7 晚私家团",
    ko: "쿤밍·다리·리장 8일 프라이빗 투어",
  },
  "guizhou-huangguoshu-libo-miao-7-day-private-tour": {
    en: "Guiyang, Huangguoshu, Libo, Xijiang & Zhenyuan: 7-Day Private Tour",
    zh: "贵阳·黄果树·荔波·西江苗寨·镇远 7 天 6 晚私家团",
    ko: "구이양·황궈수·리보·시장·전위안 7일 프라이빗 투어",
  },
  "xiamen-tulou-quanzhou-6-day-private-tour": {
    en: "Xiamen, Fujian Tulou, Anxi & Quanzhou: 6-Day Private Tour",
    zh: "厦门·福建土楼·安溪·泉州 6 天 5 晚私家团",
    ko: "샤먼·푸젠 토루·안시·취안저우 6일 프라이빗 투어",
  },
  "chaozhou-shantou-nanao-5-day-private-tour": {
    en: "Shantou, Nan'ao & Chaozhou: 5-Day Private Tour",
    zh: "汕头·南澳·潮州 5 天 4 晚私家团",
    ko: "산터우·난아오·차오저우 5일 프라이빗 투어",
  },
  "chengdu-chongqing-8-day-private-tour": {
    en: "Chengdu, Leshan, Chongqing, Wulong & Dazu: 8-Day Private Tour",
    zh: "成都·乐山·重庆·武隆·大足 8 天 7 晚私家团",
    ko: "청두·러산·충칭·우룽·대족 8일 프라이빗 투어",
  },
  "guangzhou-shunde-foshan-5-day-private-tour": {
    en: "Guangzhou, Shunde & Foshan: 5-Day Private Tour",
    zh: "广州·顺德·佛山 5 天 4 晚私家团",
    ko: "광저우·순더·포산 5일 프라이빗 투어",
  },
  "huangshan-hongcun-huizhou-5-day-private-tour": {
    en: "Huangshan, Hongcun & Huizhou: 5-Day Private Tour",
    zh: "黄山·宏村·徽州 5 天 4 晚私家团",
    ko: "황산·홍춘·후이저우 5일 프라이빗 투어",
  },
  "jingdezhen-wuyuan-wangxian-6-day-private-tour": {
    en: "Jingdezhen, Wuyuan, Sanqingshan & Wangxian Valley: 6-Day Private Tour",
    zh: "景德镇·婺源·三清山·望仙谷 6 天 5 晚私家团",
    ko: "징더전·우위안·삼청산·왕셴구 6일 프라이빗 투어",
  },
  "changbaishan-yanji-winter-6-day-private-tour": {
    en: "Changbaishan Resort, North Slope & Yanji: 6-Day Winter Private Tour",
    zh: "长白山度假区·北坡·延吉 6 天 5 晚冬季私家团",
    ko: "창바이산·북파·옌지 6일 겨울 프라이빗 투어",
  },
  "shanghai-disneyland-5-day-private-tour": {
    en: "Shanghai & Disneyland: 5-Day Private Tour",
    zh: "上海与迪士尼 5 天 4 晚私家团",
    ko: "상하이·디즈니랜드 5일 프라이빗 투어",
  },
  "luoyang-dengfeng-kaifeng-6-day-private-tour": {
    en: "Luoyang, Dengfeng & Kaifeng: 6-Day Private Tour",
    zh: "洛阳·登封·开封 6 天 5 晚私家团",
    ko: "뤄양·덩펑·카이펑 6일 프라이빗 투어",
  },
  "datong-pingyao-6-day-private-tour": {
    en: "Datong & Pingyao: 6-Day Private Tour",
    zh: "大同·平遥 6 天 5 晚私家团",
    ko: "다퉁·핑야오 6일 프라이빗 투어",
  },
  "zhangye-jiayuguan-dunhuang-7-day-private-tour": {
    en: "Zhangye, Jiayuguan & Dunhuang: 7-Day Private Tour",
    zh: "张掖·嘉峪关·敦煌 7 天 6 晚私家团",
    ko: "장예·자위관·둔황 7일 프라이빗 투어",
  },
  "chongqing-yangtze-cruise-6-day-private-tour": {
    en: "Chongqing & Yangtze Three Gorges: 6-Day Private Tour",
    zh: "重庆与长江三峡游轮 6 天 5 晚私家团",
    ko: "충칭·창장삼협 크루즈 6일 프라이빗 투어",
  },
  "xinjiang-ili-sayram-8-day-private-tour": {
    en: "Ili, Sayram Lake & Nalati: 8-Day Private Tour",
    zh: "伊犁·赛里木湖·那拉提 8 天 7 晚私家团",
    ko: "이리·싸이리무호·나라티 8일 프라이빗 투어",
  },
  "hulunbuir-7-day-private-tour": {
    en: "Hulunbuir Grassland & Forest: 7-Day Private Tour",
    zh: "呼伦贝尔草原与森林 7 天 6 晚私家团",
    ko: "후룬베이얼 초원·숲 7일 프라이빗 투어",
  },
  "kunming-jianshui-yuanyang-6-day-private-tour": {
    en: "Kunming, Jianshui & Yuanyang: 6-Day Private Tour",
    zh: "昆明·建水·元阳 6 天 5 晚私家团",
    ko: "쿤밍·젠수이·위안양 6일 프라이빗 투어",
  },
  "shenzhen-family-tech-4-day-private-tour": {
    en: "Shenzhen Family Science & Technology: 4-Day Private Tour",
    zh: "深圳亲子科技 4 天 3 晚私家团",
    ko: "선전 가족 과학·기술 4일 프라이빗 투어",
  },
  "beijing-xian-shanghai-12-day-private-tour": {
    en: "Beijing, Xi'an & Shanghai: 12-Day Private Tour",
    zh: "北京·西安·上海 12 天 11 晚私家团",
    ko: "베이징·시안·상하이 12일 프라이빗 투어",
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
    emailSelectionSuccessBody:
      "The tour, service option and group size shown above have been saved. A Homeground planner can now reply about your selection.",
  },
  zh: {
    surfaceLabel: "已选择的私家团",
    whatsappLine: "我想咨询这条私家团路线",
    emailSubject: "私家团咨询",
    emailBody: "我想咨询这条私家团路线",
    referenceLabel: "产品编号",
    genericEmailSubject: "中国旅行咨询",
    genericEmailBody: "你好 Homeground，我正在计划中国旅行，想先和你们聊聊。",
    emailSelectionSuccessBody:
      "已同时记录上方的路线、服务版本和人数，Homeground 规划师可以据此回复你。",
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
    emailSelectionSuccessBody:
      "위에 표시된 코스, 서비스 유형과 인원이 함께 저장되었습니다. Homeground 플래너가 선택하신 내용을 바탕으로 답장할 수 있습니다.",
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
  selection?: PrivateTourInquirySelection,
): PrivateTourInquiryContext | null {
  if (!isPrivateTourInquirySlug(value)) return null;
  const validatedSelection = selection
    ? getPrivateTourInquirySelection(value, selection.packageId, selection.travelers)
    : null;
  if (selection && !validatedSelection) return null;
  const structuredProduct = privateTourProducts.find(
    (candidate) => candidate.slug === value,
  );
  return {
    slug: value,
    name: structuredProduct?.title[locale] ?? privateTourInquiryNames[value][locale],
    ...(validatedSelection ? { selection: validatedSelection } : {}),
  };
}

export function getPrivateTourInquiryContextFromSearchParams(
  parameters: URLSearchParams,
  locale: HomegroundLocale,
): PrivateTourInquiryContext | null {
  const keys = [privateTourInquiryQueryKey, ...Object.values(privateTourInquirySelectionQueryKeys)];
  if (keys.some((key) => parameters.getAll(key).length > 1)) return null;
  const slug = parameters.get(privateTourInquiryQueryKey);
  const packageId = parameters.get(privateTourInquirySelectionQueryKeys.packageId);
  const travelers = parameters.get(privateTourInquirySelectionQueryKeys.travelers);
  if (packageId === null && travelers === null) return getPrivateTourInquiryContext(slug, locale);
  const selection = getPrivateTourInquirySelection(slug, packageId, travelers);
  return selection ? getPrivateTourInquiryContext(slug, locale, selection) : null;
}

export function buildPrivateTourInquiryHref(
  homePath: string,
  slug: PrivateTourInquirySlug,
  source: "private_tour" | "private_tour_product" | "product_preview",
  selection?: PrivateTourInquirySelection,
): string {
  const parameters = new URLSearchParams({
    [privateTourInquiryQueryKey]: slug,
    utm_source: source,
    utm_medium: "website",
    utm_campaign: slug,
  });
  if (selection) {
    const validated = getPrivateTourInquirySelection(slug, selection.packageId, selection.travelers);
    if (!validated) throw new Error("Invalid private tour selection");
    parameters.set(privateTourInquirySelectionQueryKeys.packageId, validated.packageId);
    parameters.set(privateTourInquirySelectionQueryKeys.travelers, String(validated.travelers));
  }
  return `${homePath}?${parameters.toString()}#planner-contact`;
}

export function buildPrivateTourMailtoHref(
  email: string,
  locale: HomegroundLocale,
  context: PrivateTourInquiryContext | null,
  draft?: TourContactDraft,
): string {
  const copy = privateTourInquiryContactCopy[locale];
  const subject = context
    ? `${copy.emailSubject}: ${context.name}`
    : copy.genericEmailSubject;
  const body = context
    ? `${copy.emailBody}: ${context.name}\n${copy.referenceLabel}: ${context.slug}${privateTourInquirySelectionLabel(context, locale) ? `\n${privateTourInquirySelectionLabel(context, locale)}` : ""}`
    : copy.genericEmailBody;
  const completeBody = [body, tourContactDraftText(locale, draft)].filter(Boolean).join("\n\n");
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(completeBody)}`;
}
