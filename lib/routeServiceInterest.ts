import type { HomegroundLocale } from "./homegroundI18n";

export const routeServiceQueryKey = "service";

export const routeServiceIds = [
  "itinerary-review",
  "route-build",
  "full-trip-support",
] as const;

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
    "itinerary-review": {
      ...commonEnglishFields,
      label: "Review My Route",
      priceLabel: "US$69",
      finderSummary:
        "Complete the short route questions. We will keep this choice with your enquiry and ask for the working itinerary after the fit check.",
      handoffSummary:
        "Your route-review choice will be sent with this enquiry. We ask for the working itinerary only after confirming that the standard scope fits.",
      note: "Requested service: Review My Route (US$69).",
    },
    "route-build": {
      ...commonEnglishFields,
      label: "Build My Route",
      priceLabel: "US$129",
      finderSummary:
        "Complete the short route questions. We will keep this choice with your enquiry and confirm the scope and delivery date before payment.",
      handoffSummary:
        "Your route-build choice will be sent with this enquiry. We confirm the standard scope and delivery date before asking for payment.",
      note: "Requested service: Build My Route (US$129).",
    },
    "full-trip-support": {
      ...commonEnglishFields,
      label: "Full Trip Planning & Ground Support",
      priceLabel: "Custom quote",
      finderSummary:
        "Complete the short route questions so we can understand the journey and prepare the right written scope. No payment is taken here.",
      handoffSummary:
        "Your full-trip-support request will be sent with this enquiry. The written scope and quote depend on the actual journey and support required.",
      note: "Requested service: Full Trip Planning & Ground Support (custom quote).",
    },
  },
  zh: {
    "itinerary-review": {
      ...commonChineseFields,
      label: "审核我的路线",
      priceLabel: "US$69",
      finderSummary: "完成简短的路线问题后，此选择会随咨询一同保存。确认符合标准范围后，我们再向你索取完整工作路线。",
      handoffSummary: "路线审核选择会随本次咨询发送。只有确认符合标准范围后，我们才会索取完整工作路线。",
      note: "申请的服务：路线审核（US$69）。",
    },
    "route-build": {
      ...commonChineseFields,
      label: "为我规划路线",
      priceLabel: "US$129",
      finderSummary: "完成简短的路线问题后，此选择会随咨询一同保存。付款前，我们会确认服务范围与交付日期。",
      handoffSummary: "路线规划选择会随本次咨询发送。在你付款前，我们会确认标准范围与交付日期。",
      note: "申请的服务：路线规划（US$129）。",
    },
    "full-trip-support": {
      ...commonChineseFields,
      label: "全程规划与落地支持",
      priceLabel: "单独报价",
      finderSummary: "完成简短的路线问题，帮助我们理解实际旅行并准备合适的书面范围。这里不会收取付款。",
      handoffSummary: "全程旅行支持需求会随本次咨询发送。书面范围与报价取决于实际行程及所需支持。",
      note: "申请的服务：全程规划与落地支持（单独报价）。",
    },
  },
  ko: {
    "itinerary-review": {
      ...commonKoreanFields,
      label: "내 일정 검토",
      priceLabel: "US$69",
      finderSummary: "간단한 동선 질문을 완료하면 이 선택을 상담 요청과 함께 보관합니다. 표준 범위에 맞는지 확인한 뒤 전체 작업 일정을 요청합니다.",
      handoffSummary: "일정 검토 선택이 상담 요청과 함께 전송됩니다. 표준 범위에 맞는지 확인한 뒤에만 전체 작업 일정을 요청합니다.",
      note: "요청 서비스: 일정 검토(US$69).",
    },
    "route-build": {
      ...commonKoreanFields,
      label: "내 동선 설계",
      priceLabel: "US$129",
      finderSummary: "간단한 동선 질문을 완료하면 이 선택을 상담 요청과 함께 보관합니다. 결제 전에 범위와 납품일을 확인합니다.",
      handoffSummary: "동선 설계 선택이 상담 요청과 함께 전송됩니다. 결제를 요청하기 전에 표준 범위와 납품일을 확인합니다.",
      note: "요청 서비스: 동선 설계(US$129).",
    },
    "full-trip-support": {
      ...commonKoreanFields,
      label: "전체 여행 설계 및 현지 지원",
      priceLabel: "맞춤 견적",
      finderSummary: "간단한 동선 질문을 완료해 실제 여행을 이해하고 알맞은 서면 범위를 준비할 수 있게 해 주세요. 여기서는 결제하지 않습니다.",
      handoffSummary: "전체 여행 지원 요청이 상담과 함께 전송됩니다. 서면 범위와 견적은 실제 여행과 필요한 지원에 따라 달라집니다.",
      note: "요청 서비스: 전체 여행 설계 및 현지 지원(맞춤 견적).",
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
