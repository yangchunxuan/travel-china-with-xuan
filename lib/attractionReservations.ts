import type { HomegroundLocale } from "./homegroundI18n";
import type { GuideId } from "./guideRegistry";
import type { DestinationHubId } from "./destinationHubs";
// @ts-ignore TS5097: focused Node tests execute this module via type stripping.
import { PRIVATE_TOUR_PRICE_CONVERSION } from "./privateTourProducts.ts";
// @ts-ignore TS5097: focused Node tests execute this module via type stripping.
import { ATTRACTION_RESERVATION_GUARANTEE_LEAD_DAYS } from "./attractionReservationGuarantee.ts";
// @ts-ignore TS5097: focused Node tests execute this module via type stripping.
import { formatAttractionReservationFeeDisplay, type AttractionReservationFeeDisplay } from "./attractionReservationFeeFormat.ts";

export { ATTRACTION_RESERVATION_GUARANTEE_LEAD_DAYS };

/**
 * Attraction reservation service (代预约 / 예약 대행).
 *
 * Every fact below is copied from a Homeground guide that already cites the
 * attraction's own official source; `source` names that guide and
 * `verifiedAt` is the date the guide recorded for the check. A row with no
 * source guide has `verifiedAt: null` and prompts a date-specific rule check; it
 * never carries a date no guide recorded. A field the guide does not state
 * is `null` and renders as "confirmed when you enquire". Never fill a null
 * from memory, a reseller listing or a blog.
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
 * Sales copy says only what Homeground does: it submits each reservation on
 * the attraction's own official system in the traveller's own name, never
 * resells tickets or adds a mark-up, and charges tickets at face value. It
 * never claims to be an authorised seller, agent or partner of an
 * attraction, and never quotes operators' statements about third parties;
 * those facts stay in the source guides. A request sent and paid at least
 * ATTRACTION_RESERVATION_GUARANTEE_LEAD_DAYS days before the visit is a
 * guaranteed booking at every offered attraction. The owner removed the
 * attraction-specific exclusion on 2026-10-18. If a booking fails,
 * Homeground refunds the service fee and ticket money in full.
 */

/**
 * Service cities, in table order. Not every one has a destination hub
 * (Suzhou, Guilin and Lijiang do not); a hub links to the service only when
 * its id is listed here.
 */
export const attractionReservationCityIds = [
  "beijing",
  "shanghai",
  "suzhou",
  "hangzhou",
  "xian",
  "chengdu",
  "guilin",
  "lijiang",
  "datong",
] as const satisfies readonly (DestinationHubId | "suzhou" | "guilin" | "lijiang" | "datong")[];

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
  /** The source guide's check date; null exactly when `source` is null. */
  readonly verifiedAt: string | null;
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
      en: "Basic admission is free; paid special exhibitions are separate. Closed most Mondays.",
      zh: "基本陈列免费，收费特展另计。通常周一闭馆。",
      ko: "기본 관람은 무료이며 유료 특별전은 별도입니다. 대체로 월요일에 휴관합니다.",
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
      en: "Tickets are reserved in each visitor's own passport name. We do not resell tickets or add a mark-up; admission is charged at face value. The museum's real-name and cancellation rules apply.",
      zh: "以每位游客本人的护照实名预约。不转售、不加价，门票按票面价收取。故宫的实名与退改规则照常适用。",
      ko: "방문자 본인의 여권 실명으로 예약합니다. 표를 되팔거나 금액을 더하지 않으며, 입장료는 공식 가격 그대로 받습니다. 박물원의 실명 확인과 취소 규칙이 적용됩니다.",
    },
    disclosure: {
      en: "Tickets are reserved in each visitor's own passport name. We do not resell tickets or add a mark-up: tickets are charged at face value, and the museum's real-name and cancellation rules apply.",
      zh: "以每位游客本人的护照实名预约。不转售、不加价，门票按票面价收取；故宫的实名与退改规则照常适用。",
      ko: "방문자 본인의 여권 실명으로 예약합니다. 표를 되팔거나 금액을 더하지 않고 입장료는 공식 가격 그대로 받으며, 박물원의 실명 확인과 취소 규칙이 적용됩니다.",
    },
    verifiedAt: "2026-08-22",
    source: "forbidden-city-for-foreign-visitors",
  },
  {
    id: "great-wall-badaling",
    city: "beijing",
    status: "offered",
    name: { en: "Badaling Great Wall", zh: "八达岭长城", ko: "팔달령 만리장성" },
    channels: null,
    passportAccepted: null,
    realName: null,
    release: null,
    price: null,
    notes: {
      en: "Your ticket options and entry requirements are confirmed for your visit date before you book.",
      zh: "预订前，会按你的参观日期确认票种和入园要求。",
      ko: "예약 전에 방문 날짜에 맞는 입장권 종류와 입장 조건을 확인해 드립니다.",
    },
    verifiedAt: "2026-08-13",
    source: "beijing-to-badaling-great-wall-transfer",
  },
  {
    id: "great-wall-mutianyu",
    city: "beijing",
    status: "offered",
    name: { en: "Mutianyu Great Wall", zh: "慕田峪长城", ko: "무톈위 만리장성" },
    channels: ["official-website"],
    passportAccepted: true,
    realName: true,
    release: {
      en: "Up to 30 days before the visit",
      zh: "参观前 30 天内可订",
      ko: "방문 30일 전부터 예약 가능",
    },
    price: {
      kind: "cny",
      amount: 40,
      basis: {
        en: "adult standard admission; the shuttle (CNY 15 return) and the cable car (CNY 100 one way, CNY 140 return) are separate",
        zh: "成人普通门票；摆渡车（往返 ¥15）和缆车（单程 ¥100、往返 ¥140）另计",
        ko: "성인 일반 입장권 기준, 셔틀버스(왕복 15위안)와 케이블카(편도 100위안, 왕복 140위안)는 별도",
      },
    },
    notes: {
      en: "Admission, the shuttle and the cable car are separate tickets. Admission is real-name, one ticket per passport per day, with entry by time window. Tell us whether you also want the shuttle and the cable car.",
      zh: "门票、摆渡车与缆车分别购票。门票实名制，每本护照每天限购一张，按入园时段入园。请告诉我们是否同时需要摆渡车和缆车。",
      ko: "입장권, 셔틀버스, 케이블카는 각각 별도입니다. 입장권은 실명제이며 여권 하나로 하루 한 장, 지정 시간대에 입장합니다. 셔틀버스와 케이블카도 필요한지 알려 주세요.",
    },
    verifiedAt: "2026-10-11",
    source: "mutianyu-great-wall-tickets",
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
      en: "Individual visitors enter free without a reservation or service fee. Bring your original ID to the B1 east entrance. Closed most Tuesdays.",
      zh: "个人观众免费、无需预约，不收服务费。携带证件原件从 B1 东入口入馆。通常周二闭馆。",
      ko: "개인 방문객은 무료이며 예약이나 서비스 수수료가 필요 없습니다. 신분증 원본을 지참해 B1 동쪽 입구로 입장하세요. 대체로 화요일에 휴관합니다.",
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
      en: "Each area needs its own advance reservation. Foreign-passport requirements are confirmed before you book.",
      zh: "两个区域均需单独提前预约。预订前，会确认外国护照的预约要求。",
      ko: "두 구역은 각각 사전 예약이 필요합니다. 외국 여권으로 예약할 때의 조건은 예약 전에 확인해 드립니다.",
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
      en: "From 9 July 2026 to 14 November 2027 it shows one ticketed special exhibition. The price and booking requirements are confirmed for your visit date.",
      zh: "2026 年 7 月 9 日至 2027 年 11 月 14 日只展出一个售票特展。票价与预约要求按你的参观日期确认。",
      ko: "2026년 7월 9일~2027년 11월 14일에는 유료 특별전 하나만 열립니다. 방문 날짜에 맞는 가격과 예약 조건을 확인해 드립니다.",
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
      en: "Your ticket options and entry requirements are confirmed for your visit date before you book.",
      zh: "预订前，会按你的参观日期确认票种和入园要求。",
      ko: "예약 전에 방문 날짜에 맞는 입장권 종류와 입장 조건을 확인해 드립니다.",
    },
    verifiedAt: null,
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
      en: "One ticket covers the museum and Lishan Garden, with the shuttle between them. Sales can stop at capacity.",
      zh: "一张门票含兵马俑博物馆和丽山园及两地间摆渡车。满额即停售。",
      ko: "한 장으로 박물관과 여산원, 그 사이 셔틀까지 포함됩니다. 정원이 차면 판매가 중단됩니다.",
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
      en: "Basic admission stays free. We do not resell tickets; our service fee covers booking in your own passport name. The Tang mural gallery needs a separate paid ticket, charged at face value. No-shows get a 180-day booking restriction.",
      zh: "基本陈列仍然免费。我们不转售门票，服务费为以你本人护照实名预约的费用。唐代壁画珍品馆另需购票，按票面价收取。爽约会被限制预约 180 天。",
      ko: "기본 관람은 그대로 무료입니다. 표를 되팔지 않으며, 서비스 수수료는 본인 여권 실명으로 예약해 드리는 비용입니다. 당대 벽화관은 별도 유료 입장권이 필요하며 공식 가격 그대로 받습니다. 노쇼 시 180일 동안 예약이 제한됩니다.",
    },
    disclosure: {
      en: "Basic admission stays free. We do not resell tickets; the service fee covers booking in your own passport name.",
      zh: "基本陈列仍然免费。我们不转售门票，服务费为以你本人护照实名预约的费用。",
      ko: "기본 관람은 그대로 무료입니다. 표를 되팔지 않으며, 서비스 수수료는 본인 여권 실명으로 예약해 드리는 비용입니다.",
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
    name: { en: "Huaqing Palace", zh: "华清宫", ko: "화청지" },
    channels: null,
    passportAccepted: null,
    realName: null,
    release: null,
    price: null,
    notes: {
      en: "Your ticket options and entry requirements are confirmed for your visit date before you book.",
      zh: "预订前，会按你的参观日期确认票种和入园要求。",
      ko: "예약 전에 방문 날짜에 맞는 입장권 종류와 입장 조건을 확인해 드립니다.",
    },
    verifiedAt: null,
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
      ko: "도강언 판다밸리와 별도이며 기지 입장권은 그곳에서 쓸 수 없습니다. 현장 판매는 특별한 경우에만 가능합니다.",
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
      en: "The museum has an inbound-visitor ticket pool and accepts passports for booking.",
      zh: "博物馆设有入境游客票池，可用护照预约。",
      ko: "박물관은 외국인 방문객용 예약 정원을 운영하며, 여권으로 예약할 수 있습니다.",
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
      en: "Your ticket options and entry requirements are confirmed for your visit date before you book.",
      zh: "预订前，会按你的参观日期确认票种和入园要求。",
      ko: "예약 전에 방문 날짜에 맞는 입장권 종류와 입장 조건을 확인해 드립니다.",
    },
    verifiedAt: null,
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
    passportAccepted: true,
    realName: true,
    release: null,
    price: { kind: "free-reservation" },
    notes: {
      en: "Admission is currently free, but every visitor needs a real-name timed reservation, and a passport is accepted. There is no same-day booking, and on-site registration ended on 1 February 2026.",
      zh: "目前景区免票，但每位游客都须实名分时预约，可用护照预约。不接受当日预约，2026 年 2 月 1 日起也取消了现场登记。",
      ko: "현재 입장은 무료이지만 방문자마다 실명 시간대 예약이 필요하며, 여권으로 예약할 수 있습니다. 당일 예약은 받지 않고, 2026년 2월 1일부터 현장 등록도 없어졌습니다.",
    },
    verifiedAt: "2026-09-26",
    source: "first-china-trip-jiangnan-6-or-beijing-11-days",
  },
  {
    id: "west-lake-boat",
    city: "hangzhou",
    status: "offered",
    name: { en: "West Lake boats", zh: "西湖游船", ko: "서호 유람선" },
    channels: null,
    passportAccepted: null,
    realName: null,
    release: null,
    price: null,
    notes: {
      en: "Boat services, traffic controls and crowd measures vary by date. Sailing times and any access restrictions are confirmed for your date before you book.",
      zh: "游船、交通管制与限流措施按日期变化。预订前，会按你的日期确认游船班次和通行限制。",
      ko: "유람선 운항, 교통 통제와 인파 관리 조치는 날짜마다 다릅니다. 예약 전에 방문 날짜의 운항 시간과 통행 제한을 확인해 드립니다.",
    },
    verifiedAt: null,
    source: null,
  },
  // Suzhou
  {
    id: "humble-administrators-garden",
    city: "suzhou",
    status: "offered",
    name: { en: "Humble Administrator's Garden", zh: "拙政园", ko: "졸정원" },
    channels: ["wechat"],
    passportAccepted: null,
    realName: true,
    release: {
      en: "1–7 days before the visit; no daily release time confirmed",
      zh: "参观前 1–7 天可订；未确认每日放票时间",
      ko: "방문 1~7일 전 예약 가능; 매일 오픈 시각은 확인되지 않음",
    },
    price: {
      kind: "cny",
      amount: 80,
      basis: {
        en: "adult, April, May and July–October (CNY 70 in the other months)",
        zh: "成人，4 月、5 月及 7–10 月（其他月份 ¥70）",
        ko: "성인, 4·5월 및 7~10월(그 외 달 70위안)",
      },
    },
    notes: {
      en: "A real-name ticket for a named visitor, date and entry slot. Suzhou Museum needs a separate reservation. Passport requirements are confirmed for your date before you book.",
      zh: "实名门票对应游客姓名、日期和入园时段。苏州博物馆需另行预约。预订前，会按你的日期确认护照预约要求。",
      ko: "방문자 이름, 날짜, 입장 시간대가 지정되는 실명 입장권입니다. 쑤저우박물관은 따로 예약해야 합니다. 방문 날짜에 맞는 여권 예약 조건은 예약 전에 확인해 드립니다.",
    },
    disclosure: {
      en: "A real-name ticket for a set date and entry slot. Suzhou Museum needs its own separate reservation.",
      zh: "实名门票须指定日期和入园时段；苏州博物馆需另行预约。",
      ko: "날짜와 입장 시간대가 지정된 실명 입장권입니다. 쑤저우박물관은 따로 예약해야 합니다.",
    },
    verifiedAt: "2026-09-26",
    source: "humble-administrators-garden-tickets-entry",
  },
  // Guilin
  {
    id: "li-river-cruise",
    city: "guilin",
    status: "offered",
    name: { en: "Li River cruise (Guilin to Yangshuo)", zh: "漓江游船（桂林—阳朔）", ko: "이강 유람선(계림–양삭)" },
    channels: ["wechat"],
    passportAccepted: null,
    realName: true,
    release: {
      en: "No general release rule confirmed; the 2026 National Day notice opened full-route boats 15 days ahead",
      zh: "未确认统一放票规则；2026 年国庆公告为全程游船提前 15 天开放",
      ko: "일반 오픈 규칙은 확인되지 않음; 2026년 국경절 공지는 전 구간 유람선을 15일 전에 오픈",
    },
    price: {
      kind: "cny",
      amount: 215,
      basis: {
        en: "adult, 3-star boat (4-star boat CNY 360), August 2026 list",
        zh: "成人三星船（四星船 ¥360），2026 年 8 月价目",
        ko: "성인 3성 유람선(4성 360위안), 2026년 8월 요금표",
      },
    },
    notes: {
      en: "3-star boats board at Mopanshan and 4-star boats at Zhujiang; tell us the boat class you want. We confirm foreign-passport acceptance and ticket collection before you book. High water can suspend sailings at short notice.",
      zh: "三星船在磨盘山客运港上船，四星船在竹江码头上船；请告诉我们想坐哪一种。预订前，会确认外国护照能否使用及取票方式。汛期可能临时停航。",
      ko: "3성 유람선은 모판산, 4성 유람선은 주장 선착장에서 출발합니다. 원하는 등급을 알려 주세요. 예약 전에 외국 여권 사용 가능 여부와 발권 방법을 확인해 드립니다. 물이 불어나면 운항이 갑자기 중단될 수 있습니다.",
    },
    disclosure: {
      en: "Choose a 3-star or 4-star boat: they board at different Guilin piers. High water can suspend sailings at short notice.",
      zh: "请选三星船或四星船，两者在桂林的上船码头不同；汛期可能临时停航。",
      ko: "3성 또는 4성 유람선을 골라 주세요. 계림의 승선 선착장이 서로 다릅니다. 물이 불어나면 운항이 갑자기 중단될 수 있습니다.",
    },
    verifiedAt: "2026-09-26",
    source: "li-river-cruise-tickets-piers-booking",
  },
  // Lijiang
  {
    id: "jade-dragon-snow-mountain",
    city: "lijiang",
    status: "offered",
    name: { en: "Jade Dragon Snow Mountain (entry and cable cars)", zh: "玉龙雪山（进山票与索道）", ko: "옥룡설산(입장권·케이블카)" },
    channels: ["wechat-mini-program"],
    passportAccepted: null,
    realName: true,
    release: {
      en: "Cable cars for the next 7 days: Glacier Park daily at 20:00, Spruce Meadow at 21:00; entry up to 7 days ahead",
      zh: "索道可订未来 7 天：冰川公园大索道每天 20:00、云杉坪索道 21:00 放票；进山票最多提前 7 天",
      ko: "케이블카는 향후 7일분: 빙천공원 매일 20:00, 윈산핑 21:00 오픈; 입장권은 최대 7일 전",
    },
    price: {
      kind: "cny",
      amount: 100,
      basis: {
        en: "entry, plus CNY 20 eco-bus; cable cars extra: Glacier Park CNY 120, Spruce Meadow CNY 40 (2026 list)",
        zh: "进山门票，另加环保车 ¥20；索道另计：冰川公园大索道 ¥120、云杉坪索道 ¥40（2026 年价目）",
        ko: "입장권, 친환경 버스 20위안 별도; 케이블카 별도: 빙천공원 120위안, 윈산핑 40위안(2026년 요금표)",
      },
    },
    notes: {
      en: "Entry and each cable car need separate tickets; cable cars require real-name and face-recognition checks. The Yak Meadow cable car has been closed for rebuilding since 4 March 2026. Wind or weather can suspend a cable car; the operator's change or refund rule then applies. Passport booking requirements are confirmed before you book.",
      zh: "进山票和各条索道须分别购票；索道实行实名和人脸核验。牦牛坪索道自 2026 年 3 月 4 日起停运改建。大风或天气可能让索道停运，届时按运营方的改签或退款规则处理。预订前，会确认护照预约要求。",
      ko: "입장권과 각 케이블카 표는 별도이며, 케이블카는 실명과 안면 인식 확인이 필요합니다. 야크 메도 케이블카는 2026년 3월 4일부터 재건축으로 운행이 중단됐습니다. 바람이나 날씨로 운행이 중단되면 운영사의 변경·환불 규칙이 적용됩니다. 여권 예약 조건은 예약 전에 확인해 드립니다.",
    },
    disclosure: {
      en: "Entry and each cable car need separate tickets. Wind or weather can suspend a cable car; the operator's change or refund rule then applies.",
      zh: "进山票和各条索道须分别购票；大风或天气可能让索道停运，届时按运营方的改签或退款规则处理。",
      ko: "입장권과 각 케이블카 표는 별도입니다. 바람이나 날씨로 운행이 중단되면 운영사의 변경·환불 규칙이 적용됩니다.",
    },
    verifiedAt: "2026-09-26",
    source: "jade-dragon-snow-mountain-cable-car-booking",
  },
  // Datong
  {
    id: "hanging-temple",
    city: "datong",
    status: "offered",
    name: { en: "Hanging Temple (upper-level admission ticket)", zh: "悬空寺（登临票）", ko: "현공사(상층부 관람권)" },
    channels: ["wechat-mini-program", "ticket-window"],
    passportAccepted: null,
    realName: true,
    release: {
      en: "Upper-level admission tickets up to 7 days ahead online, 07:20–21:00; on site same day only, from half an hour before opening and from 12:00",
      zh: "登临票线上可订 7 日内，每天 7:20–21:00；现场只卖当日票，开园前半小时和 12:00 两批开售",
      ko: "상층부 관람권은 온라인 7일 이내, 매일 07:20~21:00; 현장은 당일권만, 개장 30분 전과 12:00에 판매",
    },
    price: {
      kind: "cny",
      amount: 100,
      basis: {
        en: "upper-level admission ticket; distant-view entry ticket CNY 15 (2026 news reports)",
        zh: "登临票；远观入园票 ¥15（2026 年新闻报道）",
        ko: "상층부 관람권; 원경 관람 입장권 15위안(2026년 보도)",
      },
    },
    notes: {
      en: "Since 1 April 2026, upper-level admission tickets are capped at 2,475 a day, including 1,200 online. Since 2 June 2026, online booking requires each traveller to pass face verification. Foreign-passport requirements are confirmed before you book.",
      zh: "2026 年 4 月 1 日起，登临票每天限 2,475 张，其中线上 1,200 张。2026 年 6 月 2 日起，线上购票须每位游客通过人脸核验。预订前，会确认外国护照的预约要求。",
      ko: "2026년 4월 1일부터 상층부 관람권은 하루 2,475장으로 제한되며, 그중 온라인은 1,200장입니다. 2026년 6월 2일부터 온라인 예약 시 여행자마다 얼굴 인증이 필요합니다. 외국 여권 예약 조건은 예약 전에 확인해 드립니다.",
    },
    disclosure: {
      en: "Upper-level admission tickets are capped at 2,475 a day, and online booking requires each traveller to pass face verification. If we cannot secure yours, the service fee and ticket money are refunded in full. The CNY 15 entry ticket for the view from below needs no booking.",
      zh: "登临票每天限 2,475 张，线上购票须每位游客通过人脸核验。如未能约到，全额退还服务费和门票款。只在下面看的 15 元入园票无需预约。",
      ko: "상층부 관람권은 하루 2,475장으로 제한되며, 온라인 예약 시 여행자마다 얼굴 인증이 필요합니다. 예약하지 못하면 수수료와 입장료를 전액 환불합니다. 아래에서 보는 15위안 입장권은 예약이 필요 없습니다.",
    },
    verifiedAt: "2026-10-10",
    source: "hanging-temple-datong",
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
 * each one preselects. Only `offered` rules appear here. The CTA shows the
 * rule's `disclosure` beside the offer where the rule has one.
 *
 * The Badaling and Mutianyu transfer guides are left out on purpose: the
 * high-intent CTA ownership registry blocks specialised CTAs on them. The
 * Jiangnan route-comparison guide is only the Lingyin rule's source; its
 * footer belongs to the private tours it compares, so it carries no CTA.
 */
export const attractionReservationGuideTargets = {
  "forbidden-city-for-foreign-visitors": "forbidden-city",
  "mutianyu-great-wall-tickets": "great-wall-mutianyu",
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
  "humble-administrators-garden-tickets-entry": "humble-administrators-garden",
  "li-river-cruise-tickets-piers-booking": "li-river-cruise",
  "jade-dragon-snow-mountain-cable-car-booking": "jade-dragon-snow-mountain",
  "hanging-temple-datong": "hanging-temple",
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
export function attractionReservationFeeDisplay(cny: number, locale: HomegroundLocale): AttractionReservationFeeDisplay {
  if (!Number.isSafeInteger(cny) || cny <= 0) throw new RangeError("The fee must be a positive whole CNY amount.");
  return {
    amount:
      locale === "en"
        ? Math.ceil(cny / PRIVATE_TOUR_PRICE_CONVERSION.cnyPerUsd)
        : locale === "ko"
          ? Math.ceil((cny * PRIVATE_TOUR_PRICE_CONVERSION.krwPerCny) / 1_000) * 1_000
          : cny,
    currency: locale === "en" ? "USD" : locale === "ko" ? "KRW" : "CNY",
    numberLocale: numberLocales[locale],
    currencyDisplay: locale === "en" ? "code" : "symbol",
  };
}

export function formatAttractionReservationFee(cny: number, locale: HomegroundLocale) {
  return formatAttractionReservationFeeDisplay(attractionReservationFeeDisplay(cny, locale));
}

/** Official face value, always in the attraction's own currency (CNY). */
export function formatAttractionFaceValue(cny: number, locale: HomegroundLocale) {
  if (locale === "zh") return `¥${cny}`;
  if (locale === "ko") return `${cny}위안`;
  return `CNY ${cny}`;
}
