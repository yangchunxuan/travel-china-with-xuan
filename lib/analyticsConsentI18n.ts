import type { HomegroundLocale } from "./homegroundI18n";

export interface AnalyticsConsentCopy {
  bannerTitle: string;
  bannerBody: string;
  acceptAll: string;
  necessaryOnly: string;
  manage: string;
  dialogTitle: string;
  dialogBody: string;
  necessaryTitle: string;
  necessaryBody: string;
  alwaysOn: string;
  analyticsTitle: string;
  analyticsBody: string;
  marketingTitle: string;
  marketingBody: string;
  optional: string;
  save: string;
  close: string;
  privacyNotice: string;
}

const copy: Record<HomegroundLocale, AnalyticsConsentCopy> = {
  en: {
    bannerTitle: "Your privacy choices",
    bannerBody:
      "Necessary storage keeps the trip planner working. With your permission, analytics helps us understand which pages and buttons are useful, while marketing measurement helps us assess Meta campaigns. We never send trip answers, contact details or messages to these tools.",
    acceptAll: "Allow all",
    necessaryOnly: "Necessary only",
    manage: "Manage choices",
    dialogTitle: "Manage privacy choices",
    dialogBody:
      "Choose the optional tools Homeground may use in this browser. You can change this choice at any time from the footer.",
    necessaryTitle: "Necessary",
    necessaryBody:
      "Keeps core website and trip-planner features working and remembers this choice.",
    alwaysOn: "Always on",
    analyticsTitle: "Analytics",
    analyticsBody:
      "Measures anonymous page and button activity with Google Analytics and Homeground’s first-party event service.",
    marketingTitle: "Marketing measurement",
    marketingBody:
      "Allows Meta Pixel to measure visits and confirmed enquiries from Facebook or Instagram campaigns.",
    optional: "Optional",
    save: "Save choices",
    close: "Close",
    privacyNotice: "Read the privacy notice",
  },
  zh: {
    bannerTitle: "你的隐私选择",
    bannerBody:
      "必要存储用于维持旅行规划功能。经你同意后，分析统计可帮助我们了解哪些页面和按钮更有用；营销衡量则用于评估 Meta 活动效果。我们不会把旅行答案、联系方式或消息发送给这些工具。",
    acceptAll: "全部允许",
    necessaryOnly: "仅使用必要功能",
    manage: "管理选择",
    dialogTitle: "管理隐私选择",
    dialogBody:
      "选择 Homeground 可以在此浏览器中使用的可选工具。你随时可以从页脚重新更改。",
    necessaryTitle: "必要功能",
    necessaryBody: "用于网站和旅行规划器的核心功能，并记住本次选择。",
    alwaysOn: "始终启用",
    analyticsTitle: "分析统计",
    analyticsBody:
      "通过 Google Analytics 和 Homeground 第一方事件服务统计匿名页面与按钮活动。",
    marketingTitle: "营销衡量",
    marketingBody:
      "允许 Meta Pixel 衡量来自 Facebook 或 Instagram 活动的访问与已确认咨询。",
    optional: "可选",
    save: "保存选择",
    close: "关闭",
    privacyNotice: "阅读隐私说明",
  },
  ko: {
    bannerTitle: "개인정보 선택",
    bannerBody:
      "필수 저장 기능은 여행 플래너가 작동하는 데 사용됩니다. 동의하면 분석을 통해 유용한 페이지와 버튼을 파악하고, 마케팅 측정으로 Meta 캠페인의 효과를 확인할 수 있습니다. 여행 답변, 연락처 또는 메시지는 이러한 도구로 보내지 않습니다.",
    acceptAll: "모두 허용",
    necessaryOnly: "필수 기능만",
    manage: "선택 관리",
    dialogTitle: "개인정보 선택 관리",
    dialogBody:
      "Homeground가 이 브라우저에서 사용할 수 있는 선택 기능을 정하세요. 바닥글에서 언제든 변경할 수 있습니다.",
    necessaryTitle: "필수 기능",
    necessaryBody:
      "웹사이트와 여행 플래너의 핵심 기능을 유지하고 이 선택을 기억합니다.",
    alwaysOn: "항상 사용",
    analyticsTitle: "분석",
    analyticsBody:
      "Google Analytics와 Homeground의 자체 이벤트 서비스로 익명 페이지 및 버튼 활동을 측정합니다.",
    marketingTitle: "마케팅 측정",
    marketingBody:
      "Meta Pixel이 Facebook 또는 Instagram 캠페인에서 발생한 방문과 확인된 문의를 측정하도록 허용합니다.",
    optional: "선택",
    save: "선택 저장",
    close: "닫기",
    privacyNotice: "개인정보 처리 안내 보기",
  },
};

export function getAnalyticsConsentCopy(locale: HomegroundLocale) {
  return copy[locale];
}
