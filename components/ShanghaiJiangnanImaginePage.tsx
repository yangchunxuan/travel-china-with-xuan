import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, Check, Mail } from "lucide-react";
import { homegroundBusiness } from "../lib/homegroundBusiness";
import {
  localizePrivateTourProduct,
  type LocalizedPrivateTourProduct,
  type PrivateTourLocale,
  type PrivateTourProduct,
} from "../lib/privateTourProducts";
import {
  getLocalizedPrivateTourPhotoCredits,
  privateTourPhotoCreditCopy,
} from "../lib/privateTourPhotoCredits";
import { PrivateTourSelectionBoundary, SelectedPrivateTourCta, SelectedPrivateTourEmailLink } from "./PrivateTourSelection";
import { getPrivateTourStartingPrice } from "../lib/privateTourStartingPrice";
import { HomegroundFooter } from "./HomegroundFooter";
import { HomegroundHeader } from "./HomegroundHeader";
import localeStyles from "./LocaleRoot.module.css";
import { PrivateTourMotion } from "./PrivateTourMotion";
import { ZhangjiajieTourComparisonLink } from "./ZhangjiajieTourComparisonLink";
import {
  buildPrivateTourInquiryHref,
  buildPrivateTourMailtoHref,
  getPrivateTourInquiryContext,
  getPrivateTourInquirySelection,
} from "../lib/privateTourInquiryContext";
import {
  ShanghaiJiangnanHeroDeck,
  ShanghaiJiangnanPriceConsole,
  ShanghaiJiangnanRouteExplorer,
} from "./ShanghaiJiangnanImagineInteractive";
import styles from "./ShanghaiJiangnanImaginePage.module.css";
import { JiangnanTourComparison, JiangnanBookingTrust } from "./JiangnanTourComparison";
import { isJiangnanTour } from "../lib/tourContactDraft";
import {
  getExistingContentCommercialCopy,
  getPreviewProductPlanningContext,
  getProductPlanningContext,
} from "../lib/existingContentCommercialLinks";
import { jaPilot, jaPilotEmailHref, jaPilotWhatsAppHref } from "../lib/jaPilot";
import { japaneseDraftNote } from "../lib/japaneseSite";
import { japaneseCurrencyNote } from "../lib/japaneseCurrencyNote";
import { jaPilotCopy } from "../lib/jaPilotCopy";
import { localizeJapanesePrivateTourProduct } from "../lib/localizeJapanesePrivateTourProduct";
import type { JapaneseTourCopy } from "../lib/japaneseTourCopy";
import { japaneseTourContactHrefs } from "../lib/japaneseTourContact";
import { JapaneseTourContactLink, type JapaneseContactHrefs } from "./JapaneseJiangnanInteraction";
import { JiangnanArtStory, JiangnanArtStays } from "./JiangnanArtEditorial";
import jaStyles from "./JapaneseJiangnanPage.module.css";

export const SHANGHAI_JIANGNAN_TOUR_SLUG =
  "shanghai-suzhou-hangzhou-6-day-private-tour";
const JIANGNAN_ART_TOUR_SLUG = "suzhou-tongli-hangzhou-shanghai-12-day-private-tour";

const beforeYouChooseTitle: Record<PrivateTourLocale, string> = {
  en: "Before you choose",
  zh: "选择这条路线前",
  ko: "이 일정을 선택하기 전에",
};

const jiangnanPageCopy: Record<
  PrivateTourLocale,
  {
    htmlLang: string;
    skipLink: string;
    breadcrumbLabel: string;
    homeLabel: string;
    productLabel: string;
    heroMeta: string;
    heroPromise: string;
    facts: readonly { label: string; value: string }[];
    overviewEyebrow: string;
    overviewTitle: string;
    overviewBody: string;
    routeEyebrow: string;
    routeTitle: string;
    routeBody: string;
    serviceEyebrow: string;
    serviceTitle: string;
    serviceBody: string;
    hotelTitle: string;
    transportTitle: string;
    scopeEyebrow: string;
    scopeTitle: string;
    exclusionsTitle: string;
    confirmedTitle: string;
    confirmations: readonly string[];
    finalEyebrow: string;
    finalTitle: string;
    finalBody: string;
    contact: string;
    email: string;
  }
> = {
  en: {
    htmlLang: "en",
    skipLink: "Skip to the tour details",
    breadcrumbLabel: "Breadcrumb",
    homeLabel: "Home",
    productLabel: "Private tours",
    heroMeta: "6 DAYS / 5 NIGHTS · PRIVATE TOUR · NO SHOPPING",
    heroPromise: "Three cities. One unhurried route.",
    facts: [
      { label: "Route", value: "Shanghai → Suzhou → Hangzhou" },
      { label: "Guided touring", value: "Days 2–5" },
      { label: "Stay", value: "5 nights · breakfast included" },
      { label: "Public prices", value: "2, 4 or 6 travellers" },
    ],
    overviewEyebrow: "The shape of the journey",
    overviewTitle: "Shanghai, Suzhou and Hangzhou each get their own pace.",
    overviewBody:
      "The route moves in one direction. Arrival and departure days protect the four core touring days, while luggage and intercity transport are handled as part of the same journey.",
    routeEyebrow: "Day by day",
    routeTitle: "One direction, no backtracking.",
    routeBody:
      "Enter through Shanghai, continue through Suzhou and finish in Hangzhou. Arrival and departure stay unhurried, leaving four guided touring days, including the moves between cities.",
    serviceEyebrow: "Travel made seamless",
    serviceTitle: "Hotels, guides and transfers work together.",
    serviceBody:
      "Your hotel level, guided days, transfers and principal admissions are planned together. We check availability for your dates before payment.",
    hotelTitle: "Stay",
    transportTitle: "Guide, transport and admissions",
    scopeEyebrow: "Clear before payment",
    scopeTitle: "What is separate—and what your written quote will confirm.",
    exclusionsTitle: "Not included",
    confirmedTitle: "Confirmed in writing",
    confirmations: [
      "Your dates, arrival and departure details",
      "The hotel, room arrangement and vehicle for the actual group",
      "Bookable admissions and the final total before payment",
    ],
    finalEyebrow: "Make this six-day journey yours",
    finalTitle: "Ready to shape this route around your trip?",
    finalBody:
      "Share your dates, group size and what matters most to you. We will start with this route and work from there.",
    contact: "Request your tailored proposal",
    email: "Email us",
  },
  zh: {
    htmlLang: "zh-Hans",
    skipLink: "跳到产品详情",
    breadcrumbLabel: "面包屑导航",
    homeLabel: "首页",
    productLabel: "私家团产品",
    heroMeta: "6 天 5 晚 · 私家团 · 全程不进购物店",
    heroPromise: "江南三城，一路向前，不走回头路。",
    facts: [
      { label: "路线", value: "上海 → 苏州 → 杭州" },
      { label: "导游", value: "第 2–5 天英语导游" },
      { label: "住宿", value: "5 晚 · 含早餐" },
      { label: "公开报价", value: "2 人、4 人或 6 人" },
    ],
    overviewEyebrow: "这条路线的价值",
    overviewTitle: "上海、苏州、杭州，各自都有完整的节奏。",
    overviewBody:
      "路线按一个方向推进。抵达与返程日为四个核心游览日留足余量，跨城交通和行李衔接也放在同一套安排里处理。",
    routeEyebrow: "每日安排",
    routeTitle: "一路向前，不走回头路。",
    routeBody:
      "从上海进入，经苏州一路前往杭州。抵达与返程日留出余量，中间四天由导游串联游览与跨城衔接。",
    serviceEyebrow: "服务标准",
    serviceTitle: "抵达之前，住宿、用车和游览已经接顺。",
    serviceBody:
      "酒店等级、导游天数、接送、跨城交通和主要门票组成同一套产品。付款前会按真实日期逐项核对可订情况。",
    hotelTitle: "住宿",
    transportTitle: "导游、交通与门票",
    scopeEyebrow: "付款前看清楚",
    scopeTitle: "哪些另计，哪些会写进你的最终确认方案。",
    exclusionsTitle: "不包含",
    confirmedTitle: "书面确认",
    confirmations: [
      "真实出行日期及到离航班或车次",
      "具体酒店、房型与适合实际人数和行李的车辆",
      "可订门票及付款前的最终总金额",
    ],
    finalEyebrow: "把这六天变成你的旅行",
    finalTitle: "想按你的日期走这条路线吗？",
    finalBody:
      "告诉我们日期、人数和最在意的体验，我们就从这条路线开始调整。",
    contact: "获取你的专属方案",
    email: "发送邮件",
  },
  ko: {
    htmlLang: "ko",
    skipLink: "투어 상세로 이동",
    breadcrumbLabel: "현재 위치",
    homeLabel: "홈",
    productLabel: "프라이빗 투어",
    heroMeta: "5박 6일 · 프라이빗 투어 · 쇼핑 일정 없음",
    heroPromise: "세 도시를 한 방향으로, 서두르지 않게.",
    facts: [
      { label: "동선", value: "상하이 → 쑤저우 → 항저우" },
      { label: "가이드", value: "2–5일차 영어 가이드" },
      { label: "숙박", value: "5박 · 조식 포함" },
      { label: "공개 가격", value: "2명·4명 또는 6명" },
    ],
    overviewEyebrow: "여정의 구조",
    overviewTitle: "세 도시의 매력을 서두르지 않고 이어 갑니다.",
    overviewBody:
      "한 방향으로 이동하며 도착일과 출발일에는 여유를 둡니다. 나머지 4일은 핵심 관광에 집중하고, 도시 간 이동은 실제 일행과 수하물에 맞춰 준비합니다.",
    routeEyebrow: "날짜별 일정",
    routeTitle: "되돌아가지 않는 한 방향 여정.",
    routeBody:
      "상하이에서 시작해 쑤저우를 거쳐 항저우에서 마칩니다. 도착일과 출발일에는 여유를 두고, 중간 4일에는 가이드와 관광하며 도시 간 이동도 진행합니다.",
    serviceEyebrow: "서비스 기준",
    serviceTitle: "도착 전에 숙박과 이동, 관광을 하나로 연결합니다.",
    serviceBody:
      "호텔 등급, 가이드 동행일, 픽업·샌딩, 도시 간 이동과 주요 입장권을 하나의 상품으로 구성합니다. 결제 전 실제 날짜의 예약 가능 여부를 확인합니다.",
    hotelTitle: "숙박",
    transportTitle: "가이드, 이동과 입장권",
    scopeEyebrow: "결제 전 확인",
    scopeTitle: "별도 비용과 결제 전에 확인할 내용을 살펴보세요.",
    exclusionsTitle: "불포함",
    confirmedTitle: "결제 전 서면 확인",
    confirmations: [
      "실제 여행 날짜와 도착·출발편 정보",
      "이용 가능한 호텔과 객실 구성, 인원·수하물에 맞는 차량",
      "예약 가능한 입장권과 결제 전 최종 총액",
    ],
    finalEyebrow: "이 6일 여정을 나의 여행으로",
    finalTitle: "내 날짜에 맞춰 이 여정을 만들어 볼까요?",
    finalBody:
      "날짜와 인원, 가장 기대하는 경험을 알려 주시면 이 일정을 바탕으로 함께 조정합니다.",
    contact: "맞춤 제안 요청하기",
    email: "이메일 보내기",
  },
};

type ImaginePageCopy = (typeof jiangnanPageCopy)[PrivateTourLocale];

const jiangnanArtPageCopy: Record<PrivateTourLocale | "ja", Partial<ImaginePageCopy>> = {
  en: {
    facts: [
      { label: "Route", value: "Suzhou 3 · Tongli 1 · Hangzhou 2 · Shanghai 5 nights" },
      { label: "Length", value: "12 days / 11 nights" },
      { label: "Guided time", value: "8 full days + Tongli half-day" },
      { label: "Price", value: "Quoted for your dates and group" },
    ],
    routeEyebrow: "Twelve days, four places",
    routeTitle: "A story you can actually travel.",
    routeBody: "The named places and service days are the proposed route; the order can move around museum closures, weather and your pace. Each day's final reservations are checked for your dates.",
    serviceEyebrow: "The practical side of the story",
    serviceTitle: "A beautiful route needs careful arrangements.",
    serviceBody: "Here is the proposed service scope behind the journey. We check the four hotels, guides, train, admission and boats for your dates before issuing the written price.",
    hotelTitle: "The proposed stays",
    transportTitle: "Guides, transport and admissions",
  },
  zh: {
    facts: [
      { label: "路线", value: "苏州 3 晚 · 同里 1 晚 · 杭州 2 晚 · 上海 5 晚" },
      { label: "天数", value: "12 天 11 晚" },
      { label: "导览", value: "8 个全天 + 同里半天" },
      { label: "价格", value: "按日期与人数报价" },
    ],
    routeEyebrow: "十二天，四处落脚",
    routeTitle: "把故事落到每天的路上。",
    routeBody: "这里写清拟访地点与服务日。遇到博物馆闭馆、天气变化或你想放慢脚步，可以调整先后；实际预约与门票按出行日期核对。",
    serviceEyebrow: "诗意背后的安排",
    serviceTitle: "走得从容，靠的是把细节接好。",
    serviceBody: "四处住宿、导游、私车、高铁、门票与游船会按你的日期逐项核实；确认可订后，再给出书面的服务范围与价格。",
    hotelTitle: "候选住宿",
    transportTitle: "导游、交通与门票",
  },
  ko: {
    facts: [
      { label: "동선", value: "쑤저우 3박 · 퉁리 1박 · 항저우 2박 · 상하이 5박" },
      { label: "기간", value: "11박 12일" },
      { label: "가이드", value: "전일 8일 + 퉁리 반일" },
      { label: "가격", value: "날짜와 인원별 견적" },
    ],
    routeEyebrow: "12일, 네 도시",
    routeTitle: "이야기를 실제 여행 동선으로 엮었습니다.",
    routeBody: "방문 장소와 서비스일을 날짜별로 보여 드립니다. 박물관 휴관, 날씨, 여행 속도에 따라 순서를 조정할 수 있으며 실제 예약은 출발 날짜에 맞춰 확인합니다.",
    serviceEyebrow: "여정 뒤의 세심한 준비",
    serviceTitle: "편안한 여행을 위해 필요한 것을 잇습니다.",
    serviceBody: "네 숙소, 가이드, 전용 차량, 열차, 입장권과 보트의 가능 여부를 날짜별로 확인한 뒤 서비스 범위와 금액을 서면으로 안내합니다.",
    hotelTitle: "후보 숙소",
    transportTitle: "가이드, 교통과 입장권",
  },
  ja: {
    facts: [
      { label: "行程", value: "蘇州3泊 · 同里1泊 · 杭州2泊 · 上海5泊" },
      { label: "日数", value: "12日間／11泊" },
      { label: "案内", value: "終日8日間＋同里半日" },
      { label: "料金", value: "日程と人数に応じた見積もり" },
    ],
    routeEyebrow: "十二日間、四つの土地",
    routeTitle: "物語を、一日ずつ歩く旅へ。",
    routeBody: "訪問候補とサービス日を示しています。休館日や天候、歩くペースに合わせて順序を調整し、予約内容は実際の旅行日に確認します。",
    serviceEyebrow: "旅を支える手配",
    serviceTitle: "ゆとりある旅は、細やかな準備から。",
    serviceBody: "四つの宿、ガイド、専用車、列車、入場券と船を日程に合わせて確認し、サービスと料金を書面でご案内します。",
    hotelTitle: "宿泊候補",
    transportTitle: "ガイド・交通・入場券",
  },
};

const jiangnanRouteStops = [
  { id: "jiangnan-suzhou", days: "01–03", nights: 3, city: { en: "Suzhou", zh: "苏州", ko: "쑤저우", ja: "蘇州" } },
  { id: "jiangnan-tongli", days: "04", nights: 1, city: { en: "Tongli", zh: "同里", ko: "퉁리", ja: "同里" } },
  { id: "jiangnan-hangzhou", days: "05–06", nights: 2, city: { en: "Hangzhou", zh: "杭州", ko: "항저우", ja: "杭州" } },
  { id: "jiangnan-shanghai", days: "07–12", nights: 5, city: { en: "Shanghai", zh: "上海", ko: "상하이", ja: "上海" } },
] as const;

const jiangnanRouteNavLabel: Record<PrivateTourLocale | "ja", string> = {
  en: "Jump to a city in this journey",
  zh: "跳转到行程中的城市",
  ko: "여정의 도시로 이동",
  ja: "旅の各都市へ移動",
};

function jiangnanNightLabel(nights: number, locale: PrivateTourLocale | "ja"): string {
  switch (locale) {
    case "zh": return `${nights} 晚`;
    case "ko": return `${nights}박`;
    case "ja": return `${nights}泊`;
    default: return `${nights} ${nights === 1 ? "night" : "nights"}`;
  }
}

const forestFinalCopy: Record<PrivateTourLocale, Pick<ImaginePageCopy, "finalEyebrow" | "finalTitle" | "finalBody" | "contact">> = {
  en: {
    finalEyebrow: "This fixed route on your dates",
    finalTitle: "Want to check this fixed route for your dates?",
    finalBody: "Share your travel dates, group size and preferred villa or 4-star hotel. We will check accommodation and availability for this fixed route, then confirm your quote in writing.",
    contact: "Check dates and request a quote",
  },
  zh: {
    finalEyebrow: "按你的日期核对固定路线",
    finalTitle: "想按你的日期走这条固定路线吗？",
    finalBody: "告诉我们出行日期、人数，以及想住别墅还是四星酒店。我们按这条固定路线核对住宿与可安排情况，再书面确认报价。",
    contact: "核对日期与报价",
  },
  ko: {
    finalEyebrow: "내 날짜로 고정 코스 확인",
    finalTitle: "내 날짜에 이 고정 코스가 가능한지 확인할까요?",
    finalBody: "여행 날짜, 인원, 빌라 또는 4성급 호텔 중 선호하는 숙소를 알려 주세요. 이 고정 코스를 기준으로 숙소와 예약 가능 여부를 확인한 뒤 견적을 서면으로 안내합니다.",
    contact: "날짜 확인 및 견적 요청",
  },
};

function japanesePageCopy(): ImaginePageCopy {
  const tour = jaPilotCopy.tour;
  const copy = tour.presentation;
  return {
    htmlLang: "ja",
    skipLink: copy.skipLink,
    breadcrumbLabel: copy.breadcrumbLabel,
    homeLabel: copy.breadcrumbHome,
    productLabel: copy.breadcrumbTours,
    heroMeta: copy.heroMeta,
    heroPromise: copy.heroPromise,
    facts: copy.facts,
    overviewEyebrow: copy.overviewEyebrow,
    overviewTitle: copy.overviewTitle,
    overviewBody: copy.overviewBody,
    routeEyebrow: copy.routeEyebrow,
    routeTitle: copy.routeTitle,
    routeBody: copy.routeBody,
    serviceEyebrow: copy.serviceEyebrow,
    serviceTitle: copy.serviceTitle,
    serviceBody: copy.serviceBody,
    hotelTitle: copy.hotelTitle,
    transportTitle: copy.transportTitle,
    scopeEyebrow: copy.scopeEyebrow,
    scopeTitle: copy.scopeTitle,
    exclusionsTitle: copy.exclusionsTitle,
    confirmedTitle: copy.confirmedTitle,
    confirmations: copy.confirmations,
    finalEyebrow: copy.finalEyebrow,
    finalTitle: tour.ctaTitle,
    finalBody: tour.ctaBody,
    contact: tour.ctaLabel,
    email: copy.emailLabel,
  };
}

function genericJapanesePageCopy(product: LocalizedPrivateTourProduct): ImaginePageCopy {
  const smallGroup = product.tourFormat === "small-group";
  const publishedGroups = [...new Set(product.packages.flatMap((item) =>
    item.rows.map((row) => row.travelers),
  ))].sort((left, right) => left - right);
  return {
    htmlLang: "ja",
    skipLink: "ツアーの詳細へ移動",
    breadcrumbLabel: "パンくずリスト",
    homeLabel: "ホーム",
    productLabel: "中国ツアー一覧",
    heroMeta: `${product.days}日間・${product.nights}泊 · ${smallGroup ? "出発日指定の少人数グループ" : "プライベートツアー"} · 買い物目的の立ち寄りなし`,
    heroPromise: product.eyebrow,
    facts: [
      { label: "日程", value: `${product.days}日間・${product.nights}泊` },
      { label: "旅行形態", value: smallGroup ? "出発日指定の少人数グループ" : "プライベートツアー" },
      { label: "サービス", value: "ガイド・移動・宿泊の内容は下記をご確認ください" },
      { label: "料金", value: smallGroup ? "2名1室利用時の1名料金" : publishedGroups.length ? `${publishedGroups.join("・")}名参加時の掲載料金` : "日程と人数に応じてお見積もり" },
    ],
    overviewEyebrow: "この旅の見どころ",
    overviewTitle: product.eyebrow,
    overviewBody: product.summary,
    routeEyebrow: "日ごとの行程",
    routeTitle: "各日の観光と移動",
    routeBody: "立ち寄る順番や利用条件は、旅行日と予約状況に合わせてご案内します。",
    serviceEyebrow: "サービス内容",
    serviceTitle: "ホテル・移動・ガイドの内容",
    serviceBody: smallGroup
      ? "この固定出発グループの現地ガイドは英語です。日本語での案内をご希望なら、プライベート旅行としてご相談ください。"
      : "掲載料金に含まれるガイド言語は、下記のサービス内容をご確認ください。日本語ガイドの手配可否と料金は予約前に確認します。",
    hotelTitle: "宿泊",
    transportTitle: "ガイド・移動・観光",
    scopeEyebrow: "お申し込み前に確認",
    scopeTitle: "別料金となるものと、予約前に確認すること",
    exclusionsTitle: "料金に含まれないもの",
    confirmedTitle: "事前に確認すること",
    confirmations: [
      "旅行日程と到着・出発の予定",
      "利用する宿泊施設とお部屋の条件",
      "手配可能なサービスと最終料金",
    ],
    finalEyebrow: smallGroup ? "出発日について相談" : "この旅について相談",
    finalTitle: smallGroup ? "参加できる出発日を確認しますか？" : "ご希望の日程で旅を考えてみませんか？",
    finalBody: smallGroup ? "希望する出発日と人数をお知らせください。空き状況とプランの内容をご案内します。" : "旅行日程と人数、ご希望をお知らせください。この行程をもとにご案内します。",
    contact: "日本語で相談する",
    email: "メールで相談",
  };
}

function buildGenericPageCopy(
  product: LocalizedPrivateTourProduct,
): ImaginePageCopy {
  const publishedGroups = [
    ...new Set(
      product.packages.flatMap((tourPackage) =>
        tourPackage.rows.map((row) => row.travelers),
      ),
    ),
  ].sort((left, right) => left - right);
  const smallGroup = product.tourFormat === "small-group";
  const priceFact = smallGroup
    ? (product.locale === "zh"
        ? "双人同住每人价"
        : product.locale === "ko"
          ? "2인 1실 기준 1인 요금"
          : "Per person, sharing a twin room")
    : product.locale === "zh"
    ? (publishedGroups.length
        ? `${publishedGroups.join("、")} 人公开价`
        : "按日期与人数报价")
    : product.locale === "ko"
      ? (publishedGroups.length
          ? `${publishedGroups.join("·")}명 공개 가격`
          : "날짜와 인원별 견적")
      : (publishedGroups.length
          ? `Published for ${publishedGroups.join(", ")} travellers`
          : "Quoted for your dates and group");
  if (product.locale === "zh") {
    return {
      htmlLang: "zh-Hans",
      skipLink: "跳到产品详情",
      breadcrumbLabel: "面包屑导航",
      homeLabel: "首页",
      productLabel: smallGroup ? "线路" : "私家团产品",
      heroMeta: `${product.days} 天 ${product.nights} 晚 · ${smallGroup ? "小团" : "私家团"} · 全程不进购物店`,
      heroPromise: product.eyebrow,
      facts: [
        { label: "行程", value: `${product.days} 天 ${product.nights} 晚` },
        { label: "游览", value: "导游与用车服务日书面确认" },
        { label: "住宿", value: `${product.nights} 晚 · 范围书面确认` },
        { label: "价格", value: priceFact },
      ],
      overviewEyebrow: "这条路线的价值",
      overviewTitle: product.eyebrow,
      overviewBody: product.summary,
      routeEyebrow: "每日安排",
      routeTitle: "每天怎么走，完整写清楚。",
      routeBody:
        "抵达、核心游览与返程逐日展开。开放时间、实名门票和当地情况可能调整先后顺序；重要内容需要调整时，我们会与你沟通。",
      serviceEyebrow: "服务标准",
      serviceTitle: "抵达之前，住宿、用车和游览已经接顺。",
      serviceBody:
        "酒店等级、导游天数、接送、行程交通和主要门票组成同一套产品。付款前会按真实日期逐项核对可订情况。",
      hotelTitle: "住宿",
      transportTitle: "导游、交通与门票",
      scopeEyebrow: "付款前看清楚",
      scopeTitle: "哪些另计，哪些会写进你的最终确认方案。",
      exclusionsTitle: "不包含",
      confirmedTitle: "书面确认",
      confirmations: [
        "真实出行日期及到离航班或车次",
        "具体酒店、房型与适合实际人数和行李的车辆",
        "可订门票及付款前的最终总金额",
      ],
      finalEyebrow: "把这条路线变成你的旅行",
      finalTitle: "想按你的日期走这条路线吗？",
      finalBody:
        "告诉我们日期、人数和最在意的体验，我们就从这条路线开始调整。",
      contact: "获取你的专属方案",
      email: "发送邮件",
    };
  }

  if (product.locale === "ko") {
    return {
      htmlLang: "ko",
      skipLink: "투어 상세로 이동",
      breadcrumbLabel: "현재 위치",
      homeLabel: "홈",
      productLabel: smallGroup ? "투어" : "프라이빗 투어",
      heroMeta: `${product.nights}박 ${product.days}일 · ${smallGroup ? "소규모 그룹" : "프라이빗 투어"} · 쇼핑 일정 없음`,
      heroPromise: product.eyebrow,
      facts: [
        { label: "일정", value: `${product.nights}박 ${product.days}일` },
        { label: "관광", value: "가이드·차량 서비스일 서면 확인" },
        { label: "숙박", value: `${product.nights}박 · 범위 서면 확인` },
        { label: "가격", value: priceFact },
      ],
      overviewEyebrow: "여정의 가치",
      overviewTitle: product.eyebrow,
      overviewBody: product.summary,
      routeEyebrow: "날짜별 일정",
      routeTitle: "날짜별 이동과 관광을 한눈에 보여 드립니다.",
      routeBody:
        "도착, 핵심 관광과 출발 일정을 날짜별로 확인할 수 있습니다. 운영 시간, 이름을 등록해야 하는 입장권과 현지 상황에 따라 순서는 달라질 수 있습니다. 중요한 내용이 달라져야 할 때는 고객과 상의합니다.",
      serviceEyebrow: "서비스 기준",
      serviceTitle: "도착 전에 숙박과 이동, 관광을 하나로 연결합니다.",
      serviceBody:
        "호텔 등급, 가이드 동행일, 픽업·샌딩, 일정 내 이동과 주요 입장권을 하나의 상품으로 구성합니다. 결제 전 실제 날짜의 예약 가능 여부를 확인합니다.",
      hotelTitle: "숙박",
      transportTitle: "가이드, 이동과 입장권",
      scopeEyebrow: "결제 전 확인",
      scopeTitle: "별도 비용과 결제 전에 확인할 내용을 살펴보세요.",
      exclusionsTitle: "불포함",
      confirmedTitle: "결제 전 서면 확인",
      confirmations: [
        "실제 여행 날짜와 도착·출발편 정보",
        "이용 가능한 호텔과 객실 구성, 인원·수하물에 맞는 차량",
        "예약 가능한 입장권과 결제 전 최종 총액",
      ],
      finalEyebrow: "이 여정을 나의 여행으로",
      finalTitle: "내 날짜에 맞춰 이 여정을 만들어 볼까요?",
      finalBody:
        "날짜와 인원, 가장 기대하는 경험을 알려 주시면 이 일정을 바탕으로 함께 조정합니다.",
      contact: "맞춤 제안 요청하기",
      email: "이메일 보내기",
    };
  }

  return {
    htmlLang: "en",
    skipLink: "Skip to the tour details",
    breadcrumbLabel: "Breadcrumb",
    homeLabel: "Home",
    productLabel: smallGroup ? "Tours" : "Private tours",
    heroMeta: `${product.days} DAYS / ${product.nights} NIGHTS · ${smallGroup ? "SMALL GROUP" : "PRIVATE TOUR"} · NO SHOPPING`,
    heroPromise: product.eyebrow,
    facts: [
      {
        label: "Journey",
        value: `${product.days} days / ${product.nights} nights`,
      },
      { label: "Touring", value: "Guide and vehicle days confirmed in writing" },
      { label: "Stay", value: `${product.nights} nights · scope confirmed in writing` },
      { label: "Price", value: priceFact },
    ],
    overviewEyebrow: "The shape of the journey",
    overviewTitle: product.eyebrow,
    overviewBody: product.summary,
    routeEyebrow: "Day by day",
    routeTitle: "See how each day unfolds.",
    routeBody:
      "Arrival, core touring and departure are shown day by day. Opening hours, named-entry tickets and local conditions may change the order. If anything important needs to change, we discuss it with you.",
    serviceEyebrow: "Travel made seamless",
    serviceTitle: "Hotels, guides and transfers work together.",
    serviceBody:
      "Your hotel level, guided days, transfers, route transport and principal admissions are planned together. We check availability for your dates before payment.",
    hotelTitle: "Stay",
    transportTitle: "Guide, transport and admissions",
    scopeEyebrow: "Clear before payment",
    scopeTitle: "What is separate—and what your written quote will confirm.",
    exclusionsTitle: "Not included",
    confirmedTitle: "Confirmed in writing",
    confirmations: [
      "Your dates, arrival and departure details",
      "The hotel, room arrangement and vehicle for the actual group",
      "Bookable admissions and the final total before payment",
    ],
    finalEyebrow: "Make this journey yours",
    finalTitle: "Ready to shape this route around your trip?",
    finalBody:
      "Share your dates, group size and what matters most to you. We will start with this route and work from there.",
    contact: "Request your tailored proposal",
    email: "Email us",
  };
}

function getPageCopy(product: LocalizedPrivateTourProduct): ImaginePageCopy {
  if (product.visibility === "preview") return buildPreviewPageCopy(product);
  if (product.slug === SHANGHAI_JIANGNAN_TOUR_SLUG) return jiangnanPageCopy[product.locale];
  const copy = buildGenericPageCopy(product);
  return product.slug === "zhangjiajie-forest-4-day-private-tour"
    ? { ...copy, ...forestFinalCopy[product.locale] }
    : copy;
}

/**
 * Preview products are unconfirmed supplier proposals served by a
 * driver-guide. The generic copy promises guided days, transfers and no
 * shopping stops, so previews state only what their own data publishes.
 */
function buildPreviewPageCopy(
  product: LocalizedPrivateTourProduct,
): ImaginePageCopy {
  const generic = buildGenericPageCopy(product);
  const facts = product.facts ?? generic.facts;
  if (product.locale === "zh") {
    return {
      ...generic,
      heroMeta: `${product.days} 天 ${product.nights} 晚 · 私家团 · 司机兼向导`,
      facts,
      routeBody:
        "每日安排依据地接方案逐日列出。东北冬季的开放日期、路况和天气可能调整先后顺序；重要内容需要调整时，我们会与你沟通。",
      serviceEyebrow: "服务范围",
      serviceTitle: "私车加司机兼向导：市区陪同，景区自由玩。",
      serviceBody:
        "车辆按人数安排，只服务你们一行；司机兼向导会说中文和英语，负责开车、安排当天行程，市区景点陪同游览。冰雪大世界这类大景区由你们自己游玩，滑雪由雪场的专业教练指导。",
      transportTitle: "车辆、司机兼向导与包含项目",
      exclusionsTitle: "书面报价未列明则不包含",
      confirmedTitle: "付款前书面确认",
      confirmations: [
        "出行日期，以及适用淡季价还是旺季价",
        "酒店、房间安排与适合实际人数的车辆",
        "包含哪些门票和接送",
        "儿童价、单房差与取消条款",
      ],
      finalEyebrow: "咨询这条路线",
      finalTitle: "想按你的日期走这条路线吗？",
      finalBody:
        "告诉我们日期、人数和同行儿童的年龄。我们先与地接核对路线，再在你付款前发出书面报价。",
      contact: "获取书面报价",
    };
  }
  if (product.locale === "ko") {
    return {
      ...generic,
      heroMeta: `${product.nights}박 ${product.days}일 · 프라이빗 투어 · 운전기사 겸 안내인`,
      facts,
      routeBody:
        "날짜별 일정은 현지 협력사의 제안을 따릅니다. 동북의 겨울에는 운영 기간, 도로와 날씨에 따라 순서가 바뀔 수 있으며, 중요한 내용이 달라져야 할 때는 고객과 상의합니다.",
      serviceEyebrow: "서비스 범위",
      serviceTitle: "전용 차량과 운전기사 겸 안내인: 시내는 함께, 큰 관광지는 자유롭게.",
      serviceBody:
        "일행 인원에 맞춘 전용 차량을 이용하며, 영어로 소통하는 운전기사 겸 안내인이 운전과 하루 일정을 챙기고 시내 명소는 함께 둘러봅니다. 하얼빈 빙설대세계 같은 큰 관광지는 자유롭게 둘러보며, 스키 강습은 스키장 소속 강사가 맡습니다. 한국어 안내는 포함되지 않습니다.",
      transportTitle: "차량, 운전기사 겸 안내인과 포함 항목",
      exclusionsTitle: "서면 견적에 없으면 불포함",
      confirmedTitle: "결제 전 서면 확인",
      confirmations: [
        "여행 날짜와 비수기·성수기 요금 적용 여부",
        "호텔과 객실 구성, 실제 인원에 맞는 차량",
        "포함되는 입장권과 이동",
        "아동 요금, 1인실 추가금과 취소 규정",
      ],
      finalEyebrow: "이 코스 문의하기",
      finalTitle: "내 날짜에 맞춰 이 코스로 여행할까요?",
      finalBody:
        "날짜와 인원, 동반 아동의 나이를 알려 주세요. 현지 협력사와 코스를 확인한 뒤 결제 전에 서면 견적을 보내 드립니다.",
      contact: "서면 견적 요청하기",
    };
  }
  return {
    ...generic,
    heroMeta: `${product.days} DAYS / ${product.nights} NIGHTS · PRIVATE TOUR · DRIVER-GUIDE`,
    facts,
    routeBody:
      "The day plan follows our local partner's proposal. Opening dates, roads and weather in a Northeast winter can change the order; if anything important has to change, we discuss it with you.",
    serviceEyebrow: "What the service covers",
    serviceTitle: "Your own vehicle and an English-speaking driver-guide.",
    serviceBody:
      "Your party has its own vehicle, sized to the group, and an English-speaking driver-guide who drives, runs the day's timings and goes with you around the city sights. At large scenic areas such as Harbin Ice and Snow World you explore at your own pace, and any ski instruction is by the resort's own instructors.",
    transportTitle: "Vehicle, driver-guide and inclusions",
    exclusionsTitle: "Not included unless your written quote lists it",
    confirmedTitle: "Confirmed in writing before payment",
    confirmations: [
      "Your dates, and whether low- or peak-season prices apply",
      "Hotels, room arrangement and the vehicle for your actual group",
      "Which admissions and transfers are included",
      "Children's prices, single-room supplement and cancellation terms",
    ],
    finalEyebrow: "Ask about this route",
    finalTitle: "Want this route for your dates?",
    finalBody:
      "Share your dates, group size and the ages of any children. We check the route with our local partner and send a written quote before you pay.",
    contact: "Request a written quote",
  };
}

function offerGroupLabel(locale: PrivateTourLocale | "ja", travelers: number) {
  if (locale === "zh") return `${travelers} 人同行`;
  if (locale === "ko") return `${travelers}명 기준`;
  if (locale === "ja") return `${travelers}名で参加`;
  return `${travelers} travellers`;
}

function schemaLanguage(locale: PrivateTourLocale | "ja") {
  return locale === "zh" ? "zh-Hans" : locale;
}

const compactChineseRouteTitleSlugs = new Set([
  "beijing-xian-shanghai-8-day-private-tour",
  "beijing-xian-guilin-hong-kong-10-day-private-tour",
  "beijing-xian-yangtze-cruise-shanghai-12-day-private-tour",
]);

function displayTourTitle(
  title: string,
  locale: PrivateTourLocale | "ja",
  slug: string,
) {
  if (slug === JIANGNAN_ART_TOUR_SLUG) {
    const separator = title.includes("｜") ? "｜" : ": ";
    const [name, route] = title.split(separator);
    if (name && route) {
      const chineseRoute = locale === "zh" ? route.match(/^(.+) (12 天私家旅程)$/u) : null;
      return <>
        <span className={styles.jiangnanArtName}>{name}</span>{" "}
        <span className={styles.jiangnanArtRoute}>{chineseRoute ? <>
          <span className={styles.jiangnanArtCities}>{chineseRoute[1]}</span>{" "}
          <span className={styles.jiangnanArtLength}>{chineseRoute[2]}</span>
        </> : route}</span>
      </>;
    }
  }
  if (
    locale === "zh" &&
    slug === "zhangjiajie-furong-fenghuang-7-day-private-tour"
  ) {
    return (
      <>
        <span className={styles.titleUnit}>张家界</span>、
        <span className={styles.titleUnit}>芙蓉镇</span>与
        <span className={styles.titleUnit}>凤凰</span>{" "}
        <span className={styles.titleUnit}>7 天 6 晚</span>
        <span className={styles.titleUnit}>私家团</span>
      </>
    );
  }
  if (locale === "zh" && compactChineseRouteTitleSlugs.has(slug)) {
    const match = title.match(/^(.+) (\d+ 天 \d+ 晚)(私家团)$/u);
    if (match) {
      const cities = match[1].split("·");
      const firstLine = cities.length > 3
        ? `${cities.slice(0, 2).join("·")}·`
        : cities.join("·");
      const secondLine = cities.length > 3
        ? cities.slice(2).join("·")
        : "";
      return (
        <>
          <span className={styles.compactTitleLine}>{firstLine}</span>
          {secondLine && <span className={styles.compactTitleLine}>{secondLine}</span>}{" "}
          <span className={styles.compactTitleLine}>{match[2]}{match[3]}</span>
        </>
      );
    }
  }
  return title.replace(/(\d+)-Day/g, "$1‑Day");
}

export function ShanghaiJiangnanImaginePage({
  product,
  locale,
  japaneseChrome,
  japaneseCopyOverride,
}: {
  product: PrivateTourProduct;
  locale: PrivateTourLocale | "ja";
  japaneseChrome?: Readonly<{ header: ReactNode; footer: ReactNode }>;
  japaneseCopyOverride?: JapaneseTourCopy;
}) {
  const japanese = locale === "ja";
  const japanesePilot = japanese && product.slug === jaPilot.tourSlug && !japaneseCopyOverride;
  if (japanese && !japaneseChrome) throw new Error("Japanese tour requires its localized site chrome");
  const sourceLocale = japanese ? "en" : locale;
  const localized = japanese
    ? localizeJapanesePrivateTourProduct(product, japaneseCopyOverride)
    : localizePrivateTourProduct(product, sourceLocale);
  const startingPrice = getPrivateTourStartingPrice(localized);
  const baseCopy = japanese ? japanesePilot ? japanesePageCopy() : genericJapanesePageCopy(localized) : getPageCopy(localized);
  const jiangnanArt = product.slug === JIANGNAN_ART_TOUR_SLUG;
  const copy = jiangnanArt ? { ...baseCopy, ...jiangnanArtPageCopy[locale] } : baseCopy;
  const jaPresentation = jaPilotCopy.tour.presentation;
  const photoCreditCopy = japanese ? {
    title: japanesePilot ? jaPresentation.photoCreditsTitle : "写真クレジット",
    intro: japanesePilot ? jaPresentation.photoCreditsIntro : "写真の出典と利用条件を掲載しています。",
    by: japanesePilot ? jaPresentation.photoCreditsBy : "撮影者：",
    localNote: "",
  } : privateTourPhotoCreditCopy[sourceLocale];
  const photoCredits = getLocalizedPrivateTourPhotoCredits(product.slug, sourceLocale)
    .map((credit, index) => japanese ? {
      ...credit,
      subject: japanesePilot ? jaPilotCopy.tour.photoCreditSubjects[index] ?? credit.subject : `写真 ${index + 1}`,
    } : credit);
  const planningContext = japanesePilot ? {
    destinations: [],
    guides: [{ id: jaPilot.guideId, href: jaPilot.guide, label: jaPresentation.planningGuideLabel }],
    relatedProducts: [],
  } : japanese ? {
    destinations: [],
    guides: [],
    relatedProducts: [{ id: "ja-tour-hub", href: "/ja/tours/", label: "中国ツアー一覧を見る" }],
  } : localized.visibility === "preview"
    ? getPreviewProductPlanningContext(sourceLocale)
    : getProductPlanningContext(
      product.slug as Parameters<typeof getProductPlanningContext>[0],
      sourceLocale,
    );
  const commercialCopy = japanesePilot ? {
    ...getExistingContentCommercialCopy("en"),
    productLabel: jaPresentation.planningEyebrow,
    productTitle: jaPresentation.planningTitle,
    productBody: jaPresentation.planningBody,
    guides: jaPresentation.planningGuides,
  } : japanese ? {
    ...getExistingContentCommercialCopy("en"),
    productLabel: "ほかの旅も見る",
    productTitle: "中国各地の旅を比べる。",
    productBody: "行き先や日数の異なるツアーもご覧いただけます。",
    related: "ツアー一覧",
  } : getExistingContentCommercialCopy(sourceLocale);
  const homePath = locale === "en" ? "/" : `/${locale}/`;
  const tourHubPath = japanesePilot ? homePath : `${homePath}tours/`;
  const pageUrl = `https://homegroundchina.com${localized.path}`;
  const inquiryContext = japanese ? null : getPrivateTourInquiryContext(product.slug, sourceLocale);
  if (!japanese && !inquiryContext) {
    throw new Error(`Missing controlled inquiry context for ${product.slug}.`);
  }
  const inquiryHref = japanese ? `${localized.path}#contact` : buildPrivateTourInquiryHref(
    homePath,
    product.slug as Parameters<typeof buildPrivateTourInquiryHref>[1],
    "private_tour_product",
  );
  const jaPriceCopy = japanese ? {
    choosePackage: japanesePilot ? "サービスを選ぶ" : "プランを選ぶ",
    chooseGroup: jaPresentation.priceChooseGroup,
    publishedPrice: japanesePilot ? jaPresentation.priceSelected : "選択したプランの掲載料金",
    perPerson: jaPresentation.pricePerPerson,
    groupUnit: jaPresentation.priceGroupUnit,
    privateTour: japanesePilot ? jaPresentation.pricePrivateTour : "プライベートツアー",
    flightsSeparate: japanesePilot ? jaPresentation.priceFlightsSeparate : "航空券は別料金",
    internationalFlightsSeparate: "国際線は別料金",
    priceBasis: "1名あたりの料金",
    twinShare: "2名1室",
    smallGroup: "少人数グループ",
    checkDates: japanesePilot ? jaPilotCopy.tour.ctaLabel : "日程と空き状況を確認",
    otherGroups: japanesePilot ? jaPresentation.otherGroups : "別の人数をご希望ですか？",
    otherGroupsBody: japanesePilot ? jaPresentation.otherGroupsBody : "人数やお部屋の条件を確認し、お見積もりをご案内します。",
    requestQuote: japanesePilot ? jaPresentation.otherGroupsAction : "日本語で相談する",
    quoteOnlyTitle: "旅行日程と人数に合わせてお見積もり",
    quoteOnlyBody: "この行程には固定の公開料金がありません。日程と人数をお知らせください。",
    emailLabel: jaPresentation.emailLabel,
    draftNote: japaneseDraftNote,
    currencyNote: japaneseCurrencyNote,
  } : undefined;
  const jaPhotoCopy = japanese ? jaPilotCopy.tour.photoInteraction : undefined;
  const japaneseContactHrefs: JapaneseContactHrefs | undefined = japanesePilot ? {
    whatsapp: {
      2: jaPilotWhatsAppHref("tour", 2),
      4: jaPilotWhatsAppHref("tour", 4),
      6: jaPilotWhatsAppHref("tour", 6),
      other: jaPilotWhatsAppHref("tour"),
    },
    email: {
      2: jaPilotEmailHref("tour", 2),
      4: jaPilotEmailHref("tour", 4),
      6: jaPilotEmailHref("tour", 6),
      other: jaPilotEmailHref("tour"),
    },
  } : japanese ? japaneseTourContactHrefs(localized) : undefined;
  const rows = localized.packages.flatMap((tourPackage) => tourPackage.rows);
  const lowestRow = rows.length
    ? rows.reduce((lowest, row) =>
        row.amount < lowest.amount ? row : lowest,
      )
    : null;
  const highestRow = rows.length
    ? rows.reduce((highest, row) =>
        row.amount > highest.amount ? row : highest,
      )
    : null;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: localized.metadataTitle,
        description: localized.metadataDescription,
        inLanguage: schemaLanguage(locale),
        datePublished: localized.datePublished,
        dateModified: localized.dateModified,
        mainEntity: { "@id": localized.entityIds.product },
      },
      {
        "@type": "TouristTrip",
        "@id": localized.entityIds.product,
        name: localized.title,
        description: localized.summary,
        url: pageUrl,
        image: `https://homegroundchina.com${localized.heroImage.src}`,
        provider: {
          "@type": "Organization",
          "@id": "https://homegroundchina.com/#organization",
          name: "Homeground China",
          url: "https://homegroundchina.com/",
        },
        itinerary: {
          "@type": "ItemList",
          numberOfItems: localized.itinerary.length,
          itemListElement: localized.itinerary.map((day) => ({
            "@type": "ListItem",
            position: day.day,
            name: day.title,
            description: day.description,
          })),
        },
        ...(lowestRow && highestRow
          ? {
              offers: {
                "@type": "AggregateOffer",
                priceCurrency: lowestRow.currency,
                lowPrice: lowestRow.amount,
                highPrice: highestRow.amount,
                offerCount: rows.length,
                url: pageUrl,
                // One offer per published row, priced per person; private rows
                // also state the party size so a 6-traveller price is not quoted to a couple.
                offers: localized.packages.flatMap((tourPackage) =>
                  tourPackage.rows.map((row) => ({
                    "@type": "Offer",
                    name:
                      localized.tourFormat === "small-group"
                        ? tourPackage.label
                        : `${tourPackage.label} · ${offerGroupLabel(locale, row.travelers)}`,
                    price: row.amount,
                    priceCurrency: row.currency,
                    ...(localized.tourFormat === "small-group"
                      ? {}
                      : {
                          eligibleQuantity: {
                            "@type": "QuantitativeValue",
                            value: row.travelers,
                            unitText: "travellers",
                          },
                        }),
                    priceSpecification: {
                      "@type": "UnitPriceSpecification",
                      price: row.amount,
                      priceCurrency: row.currency,
                      referenceQuantity: {
                        "@type": "QuantitativeValue",
                        value: 1,
                        unitCode: "IE",
                        unitText: "person",
                      },
                    },
                    url: pageUrl,
                  })),
                ),
              },
            }
          : {}),
      },
      ...(localized.faq?.length
        ? [
            {
              "@type": "FAQPage",
              "@id": `${pageUrl}#faq`,
              url: pageUrl,
              inLanguage: schemaLanguage(locale),
              isPartOf: { "@id": `${pageUrl}#webpage` },
              mainEntity: localized.faq.map((item) => ({
                "@type": "Question",
                name: item.question,
                acceptedAnswer: { "@type": "Answer", text: item.answer },
              })),
            },
          ]
        : []),
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: copy.homeLabel,
            item: `https://homegroundchina.com${homePath}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: copy.productLabel,
            item: `https://homegroundchina.com${tourHubPath}`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: localized.title,
            item: pageUrl,
          },
        ],
      },
    ],
  };

  return (
    <PrivateTourSelectionBoundary
      key={product.slug}
      slug={product.slug as Parameters<typeof PrivateTourSelectionBoundary>[0]["slug"]}
      initialSelection={japanese
        ? japanesePilot
          ? getPrivateTourInquirySelection(product.slug, "standard-guided", 2)
          : startingPrice?.selection ?? null
        : startingPrice?.selection ?? null}
    >
    <div
      className={`${localeStyles.root} hg-locale-root ${styles.page}${jiangnanArt ? ` ${styles.jiangnanArtPage}` : ""}${japanese ? ` ${jaStyles.productPage}` : ""}`}
      data-homeground-locale={locale}
      lang={copy.htmlLang}
    >
      <a className={styles.skipLink} href="#tour-details">
        {copy.skipLink}
      </a>
      {japanese ? japaneseChrome?.header : <HomegroundHeader
        languagePaths={localized.visibility === "preview"
          // A preview has no Japanese page, so the switch offers no Japanese link.
          ? localized.paths
          : {
            ...localized.paths,
            ja: product.slug === jaPilot.tourSlug
              ? jaPilot.tour
              : `/ja/tours/${product.slug}/`,
          }}
        locale={sourceLocale}
        pageContext="tour"
        plannerHrefOverride={inquiryHref}
      />}

      <main id="tour-details">
        <section aria-labelledby="product-title" className={`${styles.hero}${jiangnanArt ? ` ${styles.jiangnanArtHero}` : ""}`}>
          <div className={styles.heroGrid}>
            <div className={styles.heroCopy}>
              <nav
                aria-label={copy.breadcrumbLabel}
                className={styles.breadcrumb}
              >
                <ol>
                  <li>
                    <Link href={homePath}>{copy.homeLabel}</Link>
                    <span aria-hidden="true">/</span>
                  </li>
                  <li>
                    <Link href={tourHubPath}>{copy.productLabel}</Link>
                    <span aria-hidden="true">/</span>
                  </li>
                  <li aria-current="page">{localized.title}</li>
                </ol>
              </nav>
              <p className={styles.heroMeta}>{copy.heroMeta}</p>
              <h1
                id="product-title"
                className={jiangnanArt
                  ? styles.jiangnanArtTitle
                  : locale === "zh" && compactChineseRouteTitleSlugs.has(product.slug)
                    ? styles.compactRouteTitle
                    : undefined}
              >
                {displayTourTitle(localized.title, locale, product.slug)}
              </h1>
              <p className={styles.heroPromise}>{copy.heroPromise}</p>
              <p className={styles.heroLede}>{localized.lede}</p>
            </div>
            <div className={styles.priceSlot}>
              <ShanghaiJiangnanPriceConsole
                inquiryHref={inquiryHref}
                product={localized}
                japaneseCopy={jaPriceCopy}
                japaneseContactHrefs={japaneseContactHrefs}
              />
            </div>
            <ShanghaiJiangnanHeroDeck product={localized} photoCopy={jaPhotoCopy} />
          </div>
        </section>

        <dl className={styles.factsRail}>
          {copy.facts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>

        {jiangnanArt ? <nav aria-label={jiangnanRouteNavLabel[locale]} className={styles.jiangnanRouteNav}>
          <ol>
            {jiangnanRouteStops.map((stop) => <li key={stop.id}>
              <a href={`#${stop.id}`}>
                <span className={styles.jiangnanNavDays}>{stop.days}</span>
                <strong>{stop.city[locale]}</strong>
                <small>{jiangnanNightLabel(stop.nights, locale)}</small>
              </a>
            </li>)}
          </ol>
        </nav> : null}

        {jiangnanArt ? <JiangnanArtStory locale={locale} /> : <section className={styles.section} data-tour-reveal>
          <div className={styles.sectionInner}>
            <div className={styles.sectionHeading}>
              <p className={styles.sectionEyebrow}>{copy.overviewEyebrow}</p>
              <h2>{copy.overviewTitle}</h2>
              <p>{copy.overviewBody}</p>
            </div>
            <ol className={styles.highlightList}>
              {localized.highlights.map((highlight, index) => (
                <li key={highlight}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{highlight}</h3>
                </li>
              ))}
            </ol>
          </div>
        </section>}

        <section
          className={`${styles.section} ${styles.routeSection}`}
          data-tour-reveal
        >
          <div className={styles.sectionInner}>
            <div className={`${styles.sectionHeading} ${styles.routeHeading}${japanese ? ` ${jaStyles.routeHeading}` : ""}`}>
              <p className={styles.sectionEyebrow}>{copy.routeEyebrow}</p>
              <h2>{copy.routeTitle}</h2>
              <p>{copy.routeBody}</p>
            </div>
            <ShanghaiJiangnanRouteExplorer product={localized} photoCopy={jaPhotoCopy} />
          </div>
        </section>

        {jiangnanArt ? <JiangnanArtStays locale={locale} /> : null}

        <section className={styles.section} data-tour-reveal>
          <div className={styles.sectionInner}>
            <div className={styles.sectionHeading}>
              <p className={styles.sectionEyebrow}>{copy.serviceEyebrow}</p>
              <h2>{copy.serviceTitle}</h2>
              <p>{copy.serviceBody}</p>
            </div>
            <div className={styles.serviceGrid}>
              <article>
                <span>01</span>
                <h3>{copy.hotelTitle}</h3>
                <p>{localized.hotelNote}</p>
              </article>
              <article>
                <span>02</span>
                <h3>{copy.transportTitle}</h3>
                <p>{localized.serviceNote}</p>
              </article>
            </div>
          </div>
        </section>

        {isJiangnanTour(product.slug) && (!japanese || japanesePilot) ? <JiangnanTourComparison locale={locale} currentSlug={product.slug} japaneseCopy={japanese ? jaPresentation.comparison : undefined} /> : null}

        {localized.faq?.length ? (
          <section
            className={styles.section}
            aria-labelledby="tour-choice-title"
          >
            <div className={styles.sectionInner}>
              <div className={`${styles.sectionHeading} ${styles.faqHeading}`}>
                <h2 id="tour-choice-title">{japanese ? japanesePilot ? jaPresentation.beforeChooseTitle : "この旅を選ぶ前に" : beforeYouChooseTitle[sourceLocale]}</h2>
              </div>
              <div className={`${styles.serviceGrid} ${styles.faqGrid}`}>
                {localized.faq.map((item) => (
                  isJiangnanTour(product.slug) ? <details className={styles.answerItem} key={item.question}>
                    <summary>{item.question}</summary>
                    <p>{item.answer}</p>
                  </details> : <article key={item.question}>
                    <h3>{item.question}</h3>
                    <p>{item.answer}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section
          className={`${styles.section} ${styles.scopeSection}`}
          id="tour-price-details"
          data-tour-reveal
        >
          <div className={styles.sectionInner}>
            <div className={styles.sectionHeading}>
              <p className={styles.sectionEyebrow}>{copy.scopeEyebrow}</p>
              <h2>{copy.scopeTitle}</h2>
              <p>
                {localized.bookingNote}
              </p>
            </div>
            {product.slug === "zhangjiajie-forest-4-day-private-tour" && !japanese ? (
              <ZhangjiajieTourComparisonLink currentRoute="forest" locale={sourceLocale} />
            ) : null}
            {product.slug === "zhangjiajie-furong-fenghuang-7-day-private-tour" && !japanese ? (
              <ZhangjiajieTourComparisonLink currentRoute="ancientTowns" locale={sourceLocale} />
            ) : null}
            <div className={styles.scopeGrid}>
              <section>
                <h3>{copy.exclusionsTitle}</h3>
                <ul>
                  {localized.exclusions.map((item) => (
                    <li key={item}>
                      <span aria-hidden="true">—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
              <section>
                <h3>{copy.confirmedTitle}</h3>
                <ul>
                  {copy.confirmations.map((item) => (
                    <li key={item}>
                      <Check aria-hidden="true" size={17} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
            {isJiangnanTour(product.slug) && (!japanese || japanesePilot) ? <JiangnanBookingTrust locale={locale} japaneseCopy={japanese ? {
              trust: jaPresentation.bookingTrust.title,
              trustBody: jaPresentation.bookingTrust.body,
              business: jaPresentation.bookingTrust.business,
              terms: jaPresentation.bookingTrust.terms,
            } : undefined} /> : null}
          </div>
        </section>

        <section className={styles.section} data-tour-reveal>
          <div className={styles.sectionInner}>
            <div className={styles.sectionHeading}>
              <p className={styles.sectionEyebrow}>{commercialCopy.productLabel}</p>
              <h2>{commercialCopy.productTitle}</h2>
              <p>{commercialCopy.productBody}</p>
            </div>
            <div className={`${styles.scopeGrid} ${styles.planningLinks}`}>
              {planningContext.destinations.length > 0 ? (
                <section>
                  <h3>{commercialCopy.destinations}</h3>
                  <ul>
                    {planningContext.destinations.map((link) => (
                      <li key={link.id}>
                        <Link href={link.href}>
                          <span>{link.label}</span>
                          <ArrowRight aria-hidden="true" size={17} />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}
              {planningContext.guides.length > 0 ? <section>
                <h3>{commercialCopy.guides}</h3>
                <ul>
                  {planningContext.guides.map((link) => (
                    <li key={link.id}>
                      <Link href={link.href}>
                        <span>{link.label}</span>
                        <ArrowRight aria-hidden="true" size={17} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </section> : null}
              {planningContext.relatedProducts.length > 0 ? (
                <section>
                  <h3>{commercialCopy.related}</h3>
                  <ul>
                    {planningContext.relatedProducts.map((link) => (
                      <li key={link.id}>
                        <Link href={link.href}>
                          <span>{link.label}</span>
                          <ArrowRight aria-hidden="true" size={17} />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.creditSection}`}>
          <div className={styles.sectionInner}>
            <details className={styles.photoCredits}>
              <summary>{photoCreditCopy.title}</summary>
              <div className={styles.photoCreditBody}>
                <p>{photoCreditCopy.intro}</p>
                {photoCredits.length > 0 ? (
                  <ul>
                    {photoCredits.map((item) => (
                      <li key={item.sourceUrl}>
                        <a
                          href={item.sourceUrl}
                          rel="noreferrer"
                          target="_blank"
                        >
                          {item.subject}
                        </a>
                        <span>
                          {photoCreditCopy.by} {item.author} ·{" "}
                          <a href={item.licenseUrl} rel="license">
                            {item.licenseLabel}
                          </a>
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : null}
                {photoCreditCopy.localNote ? <p>{photoCreditCopy.localNote}</p> : null}
              </div>
            </details>
          </div>
        </section>

        <aside className={styles.finalCta} data-tour-reveal id={japanese ? "contact" : undefined}>
          <div className={styles.finalInner}>
            <div>
              <p className={styles.finalEyebrow}>{copy.finalEyebrow}</p>
              <h2>{copy.finalTitle}</h2>
              <p>{copy.finalBody}</p>
            </div>
            <div className={styles.finalActions}>
              {japanese ? <>
                <JapaneseTourContactLink className={styles.finalPrimary} hrefs={japaneseContactHrefs!}>
                  {copy.contact}<ArrowRight aria-hidden="true" size={18} />
                </JapaneseTourContactLink>
                <JapaneseTourContactLink channel="email" className={styles.finalEmail} hrefs={japaneseContactHrefs!}>
                  <Mail aria-hidden="true" size={16} />{copy.email}
                </JapaneseTourContactLink>
                <p className={styles.draftNote}>{japaneseDraftNote}</p>
              </> : <>
              <SelectedPrivateTourCta
                className={styles.finalPrimary}
                guideId={localized.id}
                href={inquiryHref}
                locale={sourceLocale}
                position="footer"
              >
                {copy.contact}
                <ArrowRight aria-hidden="true" size={18} />
              </SelectedPrivateTourCta>
              <SelectedPrivateTourEmailLink
                className={styles.finalEmail}
                email={homegroundBusiness.serviceEmail}
                locale={sourceLocale}
                href={buildPrivateTourMailtoHref(
                  homegroundBusiness.serviceEmail,
                  sourceLocale,
                  inquiryContext!,
                )}
              >
                <Mail aria-hidden="true" size={16} />
                {copy.email}
              </SelectedPrivateTourEmailLink>
              </>}
            </div>
          </div>
        </aside>
      </main>

      {japanese ? japaneseChrome?.footer : <HomegroundFooter locale={sourceLocale} pageContext="tour" />}
      <PrivateTourMotion />
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
        type="application/ld+json"
      />
    </div>
    </PrivateTourSelectionBoundary>
  );
}
