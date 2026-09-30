import type { HomegroundLocale } from "./homegroundI18n";
import type { GuideId } from "./guideRegistry";
import type { DestinationHubId } from "./destinationHubs";
// @ts-ignore TS5097: focused Node tests execute this module via type stripping.
import { PRIVATE_TOUR_PRICE_CONVERSION } from "./privateTourProducts.ts";

/**
 * Attraction reservation service (代预约 / 예약 대행).
 *
 * Every fact below is copied from a Homeground guide that already cites the
 * attraction's own official source; `source` names that guide and
 * `verifiedAt` is the date the guide recorded for the check. A field the
 * guide does not state is `null` and renders as "confirmed when you
 * enquire". Never fill a null from memory, a reseller listing or a blog.
 *
 * `status`:
 *   offered     — Homeground submits the reservation on the attraction's own
 *                 official system in each traveller's own name. Where the
 *                 guides record no booking rule yet, every rule field stays
 *                 null and the planner checks the live rule before the
 *                 written confirmation.
 *   not-needed  — the guide says individual visitors enter free without an
 *                 advance reservation, so there is nothing to book or charge.
 *
 * Homeground is not an authorised ticket seller or agent of any attraction
 * and never resells tickets. Where an operator says it has not authorised
 * third-party agents, that statement stays in `notes` and `disclosure`; it
 * is never removed or contradicted.
 */

export const attractionReservationCityIds = [
  "beijing",
  "shanghai",
  "xian",
  "chengdu",
  "hangzhou",
] as const satisfies readonly DestinationHubId[];

export type AttractionReservationCityId =
  (typeof attractionReservationCityIds)[number];

export type AttractionReservationStatus = "offered" | "not-needed";

export type AttractionReservationChannelType =
  | "official-website"
  | "wechat"
  | "wechat-mini-program"
  | "douyin-mini-program"
  | "meituan"
  | "partner-platform"
  | "ticket-window"
  | "email";

type Localized<T = string> = Readonly<Record<HomegroundLocale, T>>;

export type AttractionReservationPrice =
  | { readonly kind: "free-reservation" }
  | { readonly kind: "free-walk-in" }
  | { readonly kind: "cny"; readonly amount: number; readonly basis: Localized };

export interface AttractionReservationRule {
  readonly id: string;
  readonly city: AttractionReservationCityId;
  readonly status: AttractionReservationStatus;
  readonly name: Localized;
  /** Official channels named by the source guide, most useful first. */
  readonly channels: readonly AttractionReservationChannelType[] | null;
  readonly passportAccepted: boolean | null;
  readonly realName: boolean | null;
  /** How far ahead and when inventory opens, as the guide states it. */
  readonly release: Localized | null;
  readonly price: AttractionReservationPrice | null;
  readonly notes: Localized;
  /**
   * What a traveller must know before paying for this attraction, repeated
   * beside every offer of it outside the rules table (the guide CTA).
   */
  readonly disclosure?: Localized;
  readonly verifiedAt: string;
  readonly source: GuideId | null;
}

export const attractionReservationServiceFeeCny = 45;

export const attractionReservationPath: Localized = {
  en: "/services/china-attraction-reservations/",
  zh: "/zh/services/china-attraction-reservations/",
  ko: "/ko/services/china-attraction-reservations/",
};

export const attractionReservationEnquiryAnchor = "reservation-enquiry";
export const attractionReservationQueryKey = "attraction";

export const attractionReservationRules = [
  // Beijing
  {
    id: "national-museum-of-china",
    city: "beijing",
    status: "offered",
    name: { en: "National Museum of China", zh: "中国国家博物馆", ko: "중국 국가박물관" },
    channels: ["official-website", "wechat"],
    passportAccepted: true,
    realName: true,
    release: {
      en: "Up to 7 days ahead; new inventory daily at 17:00 Beijing time; three entry windows",
      zh: "可预约 7 天内；每天北京时间 17:00 放出新名额；分三个入馆时段",
      ko: "7일 이내 예약; 매일 베이징 시간 17:00 신규 오픈; 입장 시간대 3개",
    },
    price: { kind: "free-reservation" },
    notes: {
      en: "Basic admission is free; paid special exhibitions are separate. Closed most Mondays. The museum warns against unofficial booking routes, so we use only its own reservation system.",
      zh: "基本陈列免费，收费特展另计。通常周一闭馆。博物馆提醒勿用非官方预约渠道，我们只使用其官方预约系统。",
      ko: "기본 관람은 무료이며 유료 특별전은 별도입니다. 대체로 월요일 휴관. 박물관이 비공식 예약 경로를 경고하므로 공식 예약 시스템만 사용합니다.",
    },
    verifiedAt: "2026-08-12",
    source: "national-museum-of-china-booking-and-route",
  },
  {
    id: "summer-palace",
    city: "beijing",
    status: "offered",
    name: { en: "Summer Palace", zh: "颐和园", ko: "이화원" },
    channels: ["wechat", "ticket-window"],
    passportAccepted: true,
    realName: true,
    release: null,
    price: null,
    notes: {
      en: "Admission or combined ticket; choose from the route you will walk. Carry the passport used for the booking.",
      zh: "可选门票或联票，按实际路线选择。携带预约时使用的护照。",
      ko: "입장권 또는 통합권 중 실제 동선에 맞게 선택합니다. 예약에 쓴 여권을 지참하세요.",
    },
    verifiedAt: "2026-08-12",
    source: "summer-palace-gates-route-and-boat-plan",
  },
  {
    id: "temple-of-heaven",
    city: "beijing",
    status: "offered",
    name: { en: "Temple of Heaven", zh: "天坛", ko: "천단" },
    channels: ["wechat", "ticket-window"],
    passportAccepted: true,
    realName: true,
    release: null,
    price: null,
    notes: {
      en: "A park-only ticket does not include the three core sights; the combo ticket does. Core sights normally close on Mondays.",
      zh: "公园门票不含三处核心景点，联票包含。核心景点通常周一关闭。",
      ko: "공원 입장권에는 핵심 명소 3곳이 포함되지 않고 통합권에는 포함됩니다. 핵심 명소는 대체로 월요일 휴무.",
    },
    verifiedAt: "2026-08-12",
    source: "temple-of-heaven-gates-and-ritual-sequence",
  },
  {
    id: "tiananmen-square",
    city: "beijing",
    status: "offered",
    name: { en: "Tiananmen Square", zh: "天安门广场", ko: "톈안먼 광장" },
    channels: ["official-website"],
    passportAccepted: null,
    realName: true,
    release: null,
    price: null,
    notes: {
      en: "Covers the open square only, not Tiananmen Rostrum or the Palace Museum. Security and temporary controls still apply.",
      zh: "只适用于广场本身，不含天安门城楼和故宫。安检与临时管控照常适用。",
      ko: "광장만 해당하며 톈안먼 성루와 고궁박물원은 포함되지 않습니다. 보안 검색과 임시 통제는 그대로 적용됩니다.",
    },
    verifiedAt: "2026-08-22",
    source: "forbidden-city-for-foreign-visitors",
  },
  {
    id: "forbidden-city",
    city: "beijing",
    status: "offered",
    name: { en: "Forbidden City (Palace Museum)", zh: "故宫博物院", ko: "자금성(고궁박물원)" },
    channels: ["official-website", "wechat-mini-program", "email"],
    passportAccepted: true,
    realName: true,
    release: {
      en: "7 days ahead at 20:00 China time; no same-day tickets",
      zh: "提前 7 天北京时间 20:00 开放；不售当日票",
      ko: "7일 전 중국 시간 20:00 오픈; 당일권 없음",
    },
    price: null,
    notes: {
      en: "The Palace Museum says it has not authorised third parties to act as its ticket or reservation agents. We are not its agent and do not sell its tickets: we submit each reservation on the museum's own official channel in the visitor's own passport name, and the museum's real-name and cancellation rules apply. You can also book it yourself with our guide.",
      zh: "故宫博物院声明未授权第三方代理门票或展览预约。我们不是故宫的代理，也不销售故宫门票：我们只在故宫官方渠道以每位游客本人的护照实名提交预约，故宫的实名与退改规则照常适用。你也可以按我们的攻略自行预约。",
      ko: "고궁박물원은 제3자에게 입장권·전시 예약 대행을 승인하지 않았다고 밝힙니다. 저희는 박물원의 대리점이 아니며 입장권을 판매하지 않습니다. 박물원 공식 채널에서 방문자 본인의 여권 실명으로 예약을 제출할 뿐이며, 박물원의 실명 확인과 취소 규칙이 그대로 적용됩니다. 가이드를 보고 직접 예약하셔도 됩니다.",
    },
    disclosure: {
      en: "The Palace Museum says it has not authorised third parties to act as its ticket or reservation agents. We are not its agent and do not resell tickets: we submit your reservation on the museum's own official channel in your own passport name, and its real-name and cancellation rules apply.",
      zh: "故宫博物院声明未授权第三方代理门票或展览预约。我们不是故宫的代理，不转售门票，只在故宫官方渠道以你本人的护照实名提交预约，故宫的实名与退改规则照常适用。",
      ko: "고궁박물원은 제3자에게 입장권·전시 예약 대행을 승인하지 않았다고 밝힙니다. 저희는 박물원의 대리점이 아니며 표를 되팔지 않습니다. 박물원 공식 채널에서 본인 여권 실명으로 예약을 제출하며, 박물원의 실명 확인과 취소 규칙이 그대로 적용됩니다.",
    },
    verifiedAt: "2026-08-22",
    source: "forbidden-city-for-foreign-visitors",
  },
  {
    id: "great-wall-badaling",
    city: "beijing",
    status: "offered",
    name: { en: "Badaling Great Wall", zh: "八达岭长城", ko: "바다링 만리장성" },
    channels: null,
    passportAccepted: null,
    realName: null,
    release: null,
    price: null,
    notes: {
      en: "Our guides cover transport, not the admission booking rule, so we check the official rule for your date before the written confirmation.",
      zh: "我们的攻略只核实了交通，未核实门票预约规则；书面确认前，我们会按你的日期核实官方规则。",
      ko: "가이드는 교통만 다루고 입장 예약 규칙은 확인하지 않았으므로, 서면 확인 전에 날짜 기준으로 공식 규칙을 확인합니다.",
    },
    verifiedAt: "2026-08-13",
    source: "beijing-to-badaling-great-wall-transfer",
  },
  {
    id: "great-wall-mutianyu",
    city: "beijing",
    status: "offered",
    name: { en: "Mutianyu Great Wall", zh: "慕田峪长城", ko: "무톈위 만리장성" },
    channels: null,
    passportAccepted: null,
    realName: null,
    release: null,
    price: null,
    notes: {
      en: "Admission, shuttle and cable car are separate purchases. Our guides do not record the booking rule yet, so we check it for your date before the written confirmation.",
      zh: "门票、摆渡车与缆车分开购买。攻略尚未核实预约规则；书面确认前，我们会按你的日期核实。",
      ko: "입장권, 셔틀, 케이블카는 따로 구매합니다. 예약 규칙은 아직 가이드에서 확인하지 않았으므로 서면 확인 전에 날짜 기준으로 확인합니다.",
    },
    verifiedAt: "2026-08-13",
    source: "beijing-to-mutianyu-great-wall-transfer",
  },
  // Shanghai
  {
    id: "shanghai-museum-east",
    city: "shanghai",
    status: "not-needed",
    name: { en: "Shanghai Museum East (general entry)", zh: "上海博物馆东馆（普通入馆）", ko: "상하이박물관 동관(일반 입장)" },
    channels: null,
    passportAccepted: null,
    realName: true,
    release: null,
    price: { kind: "free-walk-in" },
    notes: {
      en: "Free walk-in for individual visitors: there is no reservation to make, so there is nothing to book and no fee. Bring your original ID to the B1 east entrance. Closed most Tuesdays.",
      zh: "个人观众免费、无需预约，没有需要代订的内容，也不收服务费。携带证件原件从 B1 东入口入馆。通常周二闭馆。",
      ko: "개인 방문객은 무료이며 예약할 것이 없으므로 대행도 수수료도 없습니다. 신분증 원본을 지참해 B1 동쪽 입구로 입장하세요. 대체로 화요일 휴관.",
    },
    verifiedAt: "2026-09-26",
    source: "shanghai-museum-east-entry-reservations",
  },
  {
    id: "shanghai-museum-east-experience-areas",
    city: "shanghai",
    status: "offered",
    name: {
      en: "Shanghai Museum East: Curio-City and Digital Gallery",
      zh: "上海博物馆东馆：古代文明探索宫、数字馆",
      ko: "상하이박물관 동관: 고대문명탐색궁·디지털관",
    },
    channels: ["wechat"],
    passportAccepted: null,
    realName: null,
    release: null,
    price: null,
    notes: {
      en: "These two areas need separate advance bookings in the museum's special-reservation section. How a foreign passport is handled is confirmed with the museum.",
      zh: "这两个区域需在博物馆“特别预约”中单独提前预约。外国护照的处理方式需向博物馆确认。",
      ko: "두 구역은 박물관 특별 예약 메뉴에서 따로 사전 예약해야 합니다. 외국 여권 처리 방식은 박물관에 확인합니다.",
    },
    verifiedAt: "2026-09-26",
    source: "shanghai-museum-east-entry-reservations",
  },
  {
    id: "shanghai-museum-peoples-square",
    city: "shanghai",
    status: "offered",
    name: { en: "Shanghai Museum, People's Square", zh: "上海博物馆人民广场馆", ko: "상하이박물관 인민광장관" },
    channels: null,
    passportAccepted: null,
    realName: null,
    release: null,
    price: null,
    notes: {
      en: "From 9 July 2026 to 14 November 2027 it shows one ticketed special exhibition. Our guide does not record its price or booking terms, so we confirm them when you enquire.",
      zh: "2026 年 7 月 9 日至 2027 年 11 月 14 日只展出一个售票特展。攻略未核实票价与预约条件，在你询问时确认。",
      ko: "2026년 7월 9일~2027년 11월 14일에는 유료 특별전 하나만 열립니다. 가격과 예약 조건은 가이드에서 확인하지 않았으므로 문의 시 확인합니다.",
    },
    verifiedAt: "2026-09-26",
    source: "shanghai-museum-east-entry-reservations",
  },
  {
    id: "shanghai-tower",
    city: "shanghai",
    status: "offered",
    name: { en: "Shanghai Tower observation deck", zh: "上海中心大厦观光厅", ko: "상하이 타워 전망대" },
    channels: null,
    passportAccepted: null,
    realName: null,
    release: null,
    price: null,
    notes: {
      en: "Our guides do not record a booking rule yet, so a planner checks the official rule for your date before the written confirmation.",
      zh: "攻略尚无已核实的预约规则；书面确认前，规划师会按你的日期核实官方规则。",
      ko: "가이드에 확인된 예약 규칙이 아직 없으므로, 서면 확인 전에 플래너가 날짜 기준으로 공식 규칙을 확인합니다.",
    },
    verifiedAt: "2026-09-29",
    source: null,
  },
  // Xi'an
  {
    id: "terracotta-warriors",
    city: "xian",
    status: "offered",
    name: {
      en: "Terracotta Warriors (Emperor Qinshihuang's Mausoleum Site Museum)",
      zh: "兵马俑（秦始皇帝陵博物院）",
      ko: "병마용(진시황제릉박물원)",
    },
    channels: ["official-website", "wechat", "partner-platform"],
    passportAccepted: true,
    realName: true,
    release: null,
    price: {
      kind: "cny",
      amount: 120,
      basis: { en: "standard adult", zh: "成人标准票", ko: "성인 일반" },
    },
    notes: {
      en: "One ticket covers the museum and Lishan Garden, with the shuttle between them. The museum's English ticket link routes to Trip.com. Sales can stop at capacity.",
      zh: "一张门票含兵马俑博物馆和丽山园及两地间摆渡车。官网英文购票入口转至携程。满额即停售。",
      ko: "한 장으로 박물관과 리산위안, 그 사이 셔틀까지 포함됩니다. 박물원 영문 예매 링크는 Trip.com으로 연결됩니다. 정원이 차면 판매가 중단됩니다.",
    },
    verifiedAt: "2026-08-11",
    source: "terracotta-warriors-without-tour",
  },
  {
    id: "shaanxi-history-museum",
    city: "xian",
    status: "offered",
    name: {
      en: "Shaanxi History Museum (incl. Tang mural gallery)",
      zh: "陕西历史博物馆（含唐代壁画珍品馆）",
      ko: "산시역사박물관(당대 벽화관 포함)",
    },
    channels: ["wechat"],
    passportAccepted: true,
    realName: true,
    release: {
      en: "5 days ahead at 17:00 (checked 12 August 2026)",
      zh: "提前 5 天 17:00 放票（2026 年 8 月 12 日核实）",
      ko: "5일 전 17:00 오픈(2026년 8월 12일 확인)",
    },
    price: { kind: "free-reservation" },
    notes: {
      en: "The museum says it has not authorised third-party platforms, agencies or individuals to sell or bundle its tickets. We are not its agent and do not resell tickets: basic admission stays free, our fee is for the reservation work, and we submit it on the museum's official WeChat system in your own passport name. The Tang mural gallery is a separate paid ticket. No-shows get a 180-day booking restriction. You can also book it yourself with our guide.",
      zh: "博物馆声明未授权第三方平台、旅行社或个人销售、捆绑本馆门票。我们不是博物馆的代理，也不转售门票：基本陈列仍然免费，服务费是预约工作的费用，我们在博物馆官方微信系统以你本人的护照实名提交预约。唐代壁画珍品馆另需购票。爽约会被限制预约 180 天。你也可以按我们的攻略自行预约。",
      ko: "박물관은 입장권을 판매하거나 묶어 파는 제3자 플랫폼, 여행사 또는 개인을 승인하지 않았다고 밝힙니다. 저희는 박물관의 대리점이 아니며 표를 되팔지 않습니다. 기본 관람은 그대로 무료이고 수수료는 예약 업무에 대한 것이며, 박물관 공식 위챗 시스템에서 본인 여권 실명으로 예약을 제출합니다. 당대 벽화관은 별도 유료 입장권입니다. 노쇼 시 180일 예약 제한. 가이드를 보고 직접 예약하셔도 됩니다.",
    },
    disclosure: {
      en: "The museum says it has not authorised third-party platforms, agencies or individuals to sell or bundle its tickets. We are not its agent and do not resell tickets: basic admission stays free, the fee is for our reservation work on the museum's official WeChat system in your own passport name, and you can also book it yourself.",
      zh: "博物馆声明未授权第三方平台、旅行社或个人销售、捆绑本馆门票。我们不是博物馆的代理，不转售门票：基本陈列仍然免费，服务费是我们在博物馆官方微信系统以你本人护照实名预约的工作费用，你也可以自行预约。",
      ko: "박물관은 입장권을 판매하거나 묶어 파는 제3자 플랫폼, 여행사 또는 개인을 승인하지 않았다고 밝힙니다. 저희는 박물관의 대리점이 아니며 표를 되팔지 않습니다. 기본 관람은 그대로 무료이고, 수수료는 박물관 공식 위챗 시스템에서 본인 여권 실명으로 예약하는 업무에 대한 것이며, 직접 예약하셔도 됩니다.",
    },
    verifiedAt: "2026-08-12",
    source: "shaanxi-history-museum-booking-and-collection-plan",
  },
  {
    id: "xian-city-wall",
    city: "xian",
    status: "offered",
    name: { en: "Xi'an City Wall", zh: "西安城墙", ko: "시안 성벽" },
    channels: ["douyin-mini-program", "meituan", "ticket-window"],
    passportAccepted: null,
    realName: null,
    release: null,
    price: {
      kind: "cny",
      amount: 54,
      basis: { en: "government full fare", zh: "政府定价全票", ko: "정부 고시 일반 요금" },
    },
    notes: {
      en: "Walk-up windows also sell tickets: foreign visitors can buy at a staffed window and get a paper pass, and no advance-reservation requirement was verified, so booking ahead is optional. An online booking is still exchanged for a paper pass at a window before the gate.",
      zh: "现场窗口同样售票：外国游客可在人工窗口购票并领取纸质入场凭证；未核实有提前预约要求，提前预约并非必需。网上预订后仍须先到窗口换取纸质入场凭证再入闸。",
      ko: "현장 창구에서도 표를 판매합니다. 외국인은 유인 창구에서 표를 사고 종이 입장권을 받을 수 있으며, 사전 예약 의무가 확인되지 않았으므로 미리 예약하는 것은 선택입니다. 온라인 예약도 입구에 가기 전에 창구에서 종이 입장권으로 바꿔야 합니다.",
    },
    disclosure: {
      en: "Walk-up windows also sell tickets: foreign visitors can buy at a staffed window and get a paper pass, so booking ahead is optional. An online booking is still exchanged for a paper pass at a window.",
      zh: "现场窗口同样售票：外国游客可在人工窗口购票并领取纸质入场凭证，提前预约并非必需。网上预订后仍须到窗口换取纸质入场凭证。",
      ko: "현장 창구에서도 표를 판매합니다. 외국인은 유인 창구에서 표를 사고 종이 입장권을 받을 수 있으므로 미리 예약하는 것은 선택입니다. 온라인 예약도 창구에서 종이 입장권으로 바꿔야 합니다.",
    },
    verifiedAt: "2026-09-26",
    source: "xian-city-wall-tickets-gates-walk-or-bike",
  },
  {
    id: "huaqing-palace",
    city: "xian",
    status: "offered",
    name: { en: "Huaqing Palace", zh: "华清宫", ko: "화칭궁" },
    channels: null,
    passportAccepted: null,
    realName: null,
    release: null,
    price: null,
    notes: {
      en: "Our guides do not record a booking rule yet, so a planner checks the official rule for your date before the written confirmation.",
      zh: "攻略尚无已核实的预约规则；书面确认前，规划师会按你的日期核实官方规则。",
      ko: "가이드에 확인된 예약 규칙이 아직 없으므로, 서면 확인 전에 플래너가 날짜 기준으로 공식 규칙을 확인합니다.",
    },
    verifiedAt: "2026-09-29",
    source: null,
  },
  // Chengdu
  {
    id: "chengdu-panda-base",
    city: "chengdu",
    status: "offered",
    name: {
      en: "Chengdu Research Base of Giant Panda Breeding",
      zh: "成都大熊猫繁育研究基地",
      ko: "청두 판다기지",
    },
    channels: ["official-website"],
    passportAccepted: true,
    realName: true,
    release: {
      en: "Online, up to 14 days ahead, subject to availability; morning or afternoon entry",
      zh: "网上预约，最多提前 14 天，视余量而定；分上午、下午入园",
      ko: "온라인, 최대 14일 전까지, 잔여분에 따라; 오전·오후 입장",
    },
    price: {
      kind: "cny",
      amount: 55,
      basis: { en: "adult", zh: "成人", ko: "성인" },
    },
    notes: {
      en: "Separate from Panda Valley in Dujiangyan; the city-base ticket is not valid there. On-site sales are only for special cases.",
      zh: "与都江堰熊猫谷分开售票，基地门票在熊猫谷无效。现场售票只面向特殊情况。",
      ko: "두장옌 판다밸리와 별도이며 기지 입장권은 그곳에서 쓸 수 없습니다. 현장 판매는 특별한 경우에만 가능합니다.",
    },
    verifiedAt: "2026-08-11",
    source: "chengdu-panda-base-or-dujiangyan-panda-valley",
  },
  {
    id: "sanxingdui-museum",
    city: "chengdu",
    status: "offered",
    name: { en: "Sanxingdui Museum", zh: "三星堆博物馆", ko: "싼싱두이박물관" },
    channels: ["official-website", "wechat", "wechat-mini-program"],
    passportAccepted: true,
    realName: true,
    release: null,
    price: null,
    notes: {
      en: "The museum offers an inbound-visitor ticket pool and English booking pages using passports. It warns against unofficial channels, so we use only its own.",
      zh: "博物馆设有入境游客票池和可用护照的英文预约页面。馆方提醒勿用非官方渠道，我们只用其官方渠道。",
      ko: "박물관은 입국 여행객용 티켓 풀과 여권으로 쓰는 영문 예약 페이지를 운영합니다. 비공식 채널을 경고하므로 공식 채널만 사용합니다.",
    },
    verifiedAt: "2026-08-13",
    source: "sanxingdui-museum-booking-and-gallery-order",
  },
  {
    id: "jinsha-site-museum",
    city: "chengdu",
    status: "offered",
    name: { en: "Jinsha Site Museum", zh: "金沙遗址博物馆", ko: "진사유적박물관" },
    channels: null,
    passportAccepted: null,
    realName: null,
    release: null,
    price: null,
    notes: {
      en: "Our guides do not record a booking rule yet, so a planner checks the official rule for your date before the written confirmation.",
      zh: "攻略尚无已核实的预约规则；书面确认前，规划师会按你的日期核实官方规则。",
      ko: "가이드에 확인된 예약 규칙이 아직 없으므로, 서면 확인 전에 플래너가 날짜 기준으로 공식 규칙을 확인합니다.",
    },
    verifiedAt: "2026-09-29",
    source: null,
  },
  // Hangzhou
  {
    id: "liangzhu",
    city: "hangzhou",
    status: "offered",
    name: {
      en: "Liangzhu Museum and Archaeological Ruins Park",
      zh: "良渚博物院与良渚古城遗址公园",
      ko: "량주박물관과 량주 고성 유적공원",
    },
    channels: ["official-website", "wechat"],
    passportAccepted: null,
    realName: null,
    release: null,
    price: null,
    notes: {
      en: "Two venues with separate arrangements; one confirmation does not cover the other. We check each venue's current admission or reservation status for your date.",
      zh: "两处场馆安排各自独立，一处的确认不覆盖另一处。我们按你的日期分别核实入馆或预约要求。",
      ko: "두 곳은 운영이 따로이며 한 곳의 확인이 다른 곳에 적용되지 않습니다. 날짜 기준으로 각 장소의 입장·예약 조건을 확인합니다.",
    },
    verifiedAt: "2026-08-13",
    source: "liangzhu-ruins-park-and-museum-sequence",
  },
  {
    id: "lingyin-feilai-peak",
    city: "hangzhou",
    status: "offered",
    name: { en: "Lingyin Temple and Feilai Peak", zh: "灵隐寺与飞来峰", ko: "영은사와 비래봉" },
    channels: null,
    passportAccepted: null,
    realName: null,
    release: null,
    price: null,
    notes: {
      en: "Our Hangzhou guide lists access, reservation and separate tickets as a date check, so we check them for your date before the written confirmation.",
      zh: "我们的杭州指南把入口、预约和分开购票列为出行前核实项；书面确认前，我们会按你的日期核实。",
      ko: "항저우 가이드는 입장·예약·별도 티켓을 날짜별 확인 항목으로 두므로, 서면 확인 전에 날짜 기준으로 확인합니다.",
    },
    verifiedAt: "2026-09-29",
    source: null,
  },
  {
    id: "west-lake-boat",
    city: "hangzhou",
    status: "offered",
    name: { en: "West Lake boats", zh: "西湖游船", ko: "시후 유람선" },
    channels: null,
    passportAccepted: null,
    realName: null,
    release: null,
    price: null,
    notes: {
      en: "Boats, traffic controls and crowd measures change by date, so a planner checks them for your date before the written confirmation.",
      zh: "游船、交通管制与限流措施按日期变化；书面确认前，规划师会按你的日期核实。",
      ko: "유람선, 교통 통제와 인파 조치는 날짜마다 달라지므로, 서면 확인 전에 플래너가 날짜 기준으로 확인합니다.",
    },
    verifiedAt: "2026-09-29",
    source: null,
  },
] as const satisfies readonly AttractionReservationRule[];

export type AttractionReservationId =
  (typeof attractionReservationRules)[number]["id"];

export function getAttractionReservationRule(id: string | null | undefined) {
  return (attractionReservationRules as readonly AttractionReservationRule[]).find((rule) => rule.id === id) ?? null;
}

/** Attractions a traveller can select in the enquiry. */
export function getBookableAttractionReservationRules(): readonly AttractionReservationRule[] {
  return (attractionReservationRules as readonly AttractionReservationRule[]).filter((rule) => rule.status === "offered");
}

/**
 * Guides that explain an attraction Homeground can book, and the attraction
 * each one preselects. Only `offered` rules appear here. Where the operator
 * says it has not authorised third-party agents, the guide keeps that
 * statement and the CTA shows the rule's `disclosure` beside the offer.
 *
 * The Badaling and Mutianyu transfer guides are left out on purpose: the
 * high-intent CTA ownership registry blocks specialised CTAs on them.
 */
export const attractionReservationGuideTargets = {
  "forbidden-city-for-foreign-visitors": "forbidden-city",
  "national-museum-of-china-booking-and-route": "national-museum-of-china",
  "summer-palace-gates-route-and-boat-plan": "summer-palace",
  "temple-of-heaven-gates-and-ritual-sequence": "temple-of-heaven",
  "terracotta-warriors-without-tour": "terracotta-warriors",
  "shaanxi-history-museum-booking-and-collection-plan": "shaanxi-history-museum",
  "xian-city-wall-tickets-gates-walk-or-bike": "xian-city-wall",
  "chengdu-panda-base-or-dujiangyan-panda-valley": "chengdu-panda-base",
  "sanxingdui-museum-booking-and-gallery-order": "sanxingdui-museum",
  "liangzhu-ruins-park-and-museum-sequence": "liangzhu",
  "shanghai-museum-east-entry-reservations": "shanghai-museum-east-experience-areas",
} as const satisfies Partial<Record<GuideId, AttractionReservationId>>;

export function getGuideAttractionReservationTarget(guideId: string) {
  const id = (attractionReservationGuideTargets as Record<string, AttractionReservationId>)[guideId];
  const rule = getAttractionReservationRule(id);
  return rule && rule.status === "offered" ? rule : null;
}

export function attractionReservationHref(locale: HomegroundLocale, attractionId?: string | null) {
  const rule = getAttractionReservationRule(attractionId);
  const query = rule && rule.status === "offered" ? `?${attractionReservationQueryKey}=${rule.id}` : "";
  return `${attractionReservationPath[locale]}${query}#${attractionReservationEnquiryAnchor}`;
}

const numberLocales: Localized = { en: "en-US", zh: "zh-CN", ko: "ko-KR" };

/**
 * The service fee in the page language's single display currency (USD on
 * English, CNY on Chinese, KRW on Korean), using the private-tour conversion
 * rates. Tours round to USD 10 / KRW 10,000 because they cost hundreds of
 * dollars; a CNY 45 fee would then read as USD 10, far above the fee, so this
 * rounds up to the whole dollar and KRW 1,000 instead. It never shows less
 * than the CNY amount charged.
 */
export function formatAttractionReservationFee(cny: number, locale: HomegroundLocale) {
  if (!Number.isSafeInteger(cny) || cny <= 0) throw new RangeError("The fee must be a positive whole CNY amount.");
  const currency = locale === "en" ? "USD" : locale === "ko" ? "KRW" : "CNY";
  const amount =
    locale === "en"
      ? Math.ceil(cny / PRIVATE_TOUR_PRICE_CONVERSION.cnyPerUsd)
      : locale === "ko"
        ? Math.ceil((cny * PRIVATE_TOUR_PRICE_CONVERSION.krwPerCny) / 1_000) * 1_000
        : cny;
  return new Intl.NumberFormat(numberLocales[locale], {
    style: "currency",
    currency,
    currencyDisplay: locale === "en" ? "code" : "symbol",
    maximumFractionDigits: 0,
  }).format(amount);
}

/** Official face value, always in the attraction's own currency (CNY). */
export function formatAttractionFaceValue(cny: number, locale: HomegroundLocale) {
  if (locale === "zh") return `¥${cny}`;
  if (locale === "ko") return `${cny}위안`;
  return `CNY ${cny}`;
}
