import type { HomegroundLocale } from "./homegroundI18n";

export const routeServiceQueryKey = "service";

// Historical service identities remain available to audit existing records.
export const historicalRouteServiceIds = ["itinerary-review", "route-build", "full-trip-support"] as const;

export const routeServiceIds = ["full-trip-support"] as const;

export type RouteServiceId = (typeof routeServiceIds)[number];

export interface RouteServiceInterest {
  id: RouteServiceId;
  label: string;
  priceLabel: string;
  finderSummary: string;
  handoffSummary: string;
  note: string;
  selectedServiceAriaLabel: string;
  finderLabel: string;
  handoffLabel: string;
  contextNoteLabel: string;
  tripContextLabel: string;
  optionalLabel: string;
  tripContextHint: string;
  tripContextError: string;
  tripContextServerError: string;
}

type LocalizedServiceFields = Omit<RouteServiceInterest, "id">;

const commonEnglishFields = {
  selectedServiceAriaLabel: "Selected Homeground planning service",
  finderLabel: "Planning request",
  handoffLabel: "Service requested",
  contextNoteLabel: "Traveller context",
  tripContextLabel: "Route outline or important constraints",
  optionalLabel: "Optional",
  tripContextHint:
    "Paste a concise day-by-day outline or a shareable route link. Do not include passport or ID images, payment details, QR codes or unredacted booking references. We can request the full file after the fit check.",
  tripContextError:
    "Keep this note under 1,500 characters and remove unsupported control characters.",
  tripContextServerError:
    "Check the trip context and remove unsupported characters.",
} as const;

const commonChineseFields = {
  selectedServiceAriaLabel: "已选择的 Homeground 路线规划服务",
  finderLabel: "规划需求",
  handoffLabel: "申请的服务",
  contextNoteLabel: "旅行者补充信息",
  tripContextLabel: "路线摘要或重要限制",
  optionalLabel: "选填",
  tripContextHint:
    "可粘贴简短的逐日路线或可访问的分享链接。请勿填写护照或证件图片、付款信息、二维码或未遮盖的预订编号。确认需求适合后，我们可以再索取完整文件。",
  tripContextError: "请将补充信息控制在 1,500 个字符以内，并删除不支持的控制字符。",
  tripContextServerError: "请检查路线补充信息，并删除不支持的字符。",
} as const;

const commonKoreanFields = {
  selectedServiceAriaLabel: "선택한 Homeground 일정 설계 서비스",
  finderLabel: "설계 요청",
  handoffLabel: "요청 서비스",
  contextNoteLabel: "여행자 추가 정보",
  tripContextLabel: "일정 요약 또는 중요한 제약",
  optionalLabel: "선택",
  tripContextHint:
    "간단한 일별 일정이나 공유 링크를 붙여 넣으세요. 여권·신분증 이미지, 결제 정보, QR 코드 또는 가리지 않은 예약 번호는 포함하지 마세요. 적합성을 확인한 뒤 전체 파일을 요청할 수 있습니다.",
  tripContextError: "추가 정보는 1,500자 이내로 작성하고 지원하지 않는 제어 문자를 삭제해 주세요.",
  tripContextServerError: "일정 추가 정보를 확인하고 지원하지 않는 문자를 삭제해 주세요.",
} as const;

const routeServiceInterestByLocale: Record<
  HomegroundLocale,
  Record<RouteServiceId, LocalizedServiceFields>
> = {
  en: {
    "full-trip-support": {
      ...commonEnglishFields,
      label: "Full Trip Planning & Ground Support",
      priceLabel: "Custom quote",
      finderSummary:
        "Complete the short route questions so Homeground can understand the whole journey and shape the right planning, booking and ground-support scope with you.",
      handoffSummary:
        "Your full-trip request and contact details will reach Homeground for a human follow-up, proposed scope and custom quote.",
      note: "Requested path: Full Trip Planning & Ground Support.",
    },
  },
  zh: {
    "full-trip-support": {
      ...commonChineseFields,
      label: "全程规划与落地支持",
      priceLabel: "单独报价",
      finderSummary: "完成简短的路线问题，帮助 Homeground 理解整趟旅行，并与你梳理合适的规划、预订与落地支持范围。",
      handoffSummary: "全程旅行需求与联系方式会发送给 Homeground，由人工继续沟通、确认服务范围并提供单独报价。",
      note: "申请路径：全程规划与落地支持。",
    },
  },
  ko: {
    "full-trip-support": {
      ...commonKoreanFields,
      label: "전체 여행 설계 및 현지 지원",
      priceLabel: "맞춤 견적",
      finderSummary: "간단한 동선 질문으로 Homeground가 여행 전체를 이해하고 알맞은 플래닝, 예약 준비와 현지 지원 범위를 함께 정합니다.",
      handoffSummary: "전체 여행 요청과 연락처가 Homeground에 전달되며 사람 플래너가 범위와 맞춤 견적을 이어서 안내합니다.",
      note: "요청 경로: 전체 여행 설계 및 현지 지원.",
    },
  },
};

export function getRouteServiceInterest(
  value: string | null | undefined,
  locale: HomegroundLocale = "en",
): RouteServiceInterest | null {
  if (!value || !routeServiceIds.includes(value as RouteServiceId)) {
    return null;
  }

  const id = value as RouteServiceId;
  return { id, ...routeServiceInterestByLocale[locale][id] };
}

export function buildRouteServiceContactHref(
  homePath: string,
  serviceId: RouteServiceId,
): string {
  const parameters = new URLSearchParams({
    [routeServiceQueryKey]: serviceId,
  });
  return `${homePath}?${parameters.toString()}#planner-contact`;
}
