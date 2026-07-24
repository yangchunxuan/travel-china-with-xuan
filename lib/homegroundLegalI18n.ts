import { homegroundBusiness } from "./homegroundBusiness";
import type { HomegroundLocale } from "./homegroundI18n";

export const homegroundLegalPageIds = [
  "business-information",
  "terms",
  "refund-delivery",
] as const;

export type HomegroundLegalPageId =
  (typeof homegroundLegalPageIds)[number];

interface LegalFact {
  label: string;
  value: string;
  detail?: string;
  href?: string;
  external?: boolean;
}

interface LegalCard {
  title: string;
  body: string;
}

interface LegalSection {
  id: string;
  title: string;
  paragraphs?: readonly string[];
  bullets?: readonly string[];
  numbered?: readonly string[];
  facts?: readonly LegalFact[];
  cards?: readonly LegalCard[];
}

export interface HomegroundLegalCopy {
  htmlLang: string;
  locale: HomegroundLocale;
  pageId: HomegroundLegalPageId;
  pagePath: string;
  homePath: string;
  languageShort: string;
  metadata: {
    title: string;
    description: string;
  };
  navigation: {
    homeLabel: string;
    languageLabel: string;
    pageLabel: string;
    homeCta: string;
  };
  skipLink: string;
  hero: {
    eyebrow: string;
    title: string;
    intro: string;
    reviewedLabel: string;
    reviewedValue: string;
  };
  callout?: {
    label: string;
    title: string;
    body: string;
  };
  sections: readonly LegalSection[];
  relatedLabel: string;
  related: {
    business: string;
    terms: string;
    refund: string;
    privacy: string;
    contact: string;
  };
}

const reviewed = {
  en: "24 July 2026",
  zh: "2026 年 7 月 24 日",
  ko: "2026년 7월 24일",
} as const;

const languageShort = {
  en: "EN",
  zh: "中文",
  ko: "한국어",
} as const;

const htmlLang = {
  en: "en",
  zh: "zh-Hans",
  ko: "ko",
} as const;

function localePrefix(locale: HomegroundLocale) {
  return locale === "en" ? "/" : `/${locale}/`;
}

export function getHomegroundLegalPath(
  pageId: HomegroundLegalPageId,
  locale: HomegroundLocale,
) {
  return `${localePrefix(locale)}${pageId}/`;
}

export function getHomegroundLegalLanguagePaths(
  pageId: HomegroundLegalPageId,
) {
  return {
    en: getHomegroundLegalPath(pageId, "en"),
    "zh-Hans": getHomegroundLegalPath(pageId, "zh"),
    ko: getHomegroundLegalPath(pageId, "ko"),
    "x-default": getHomegroundLegalPath(pageId, "en"),
  };
}

function shared(locale: HomegroundLocale, pageId: HomegroundLegalPageId) {
  const homePath = localePrefix(locale);
  const sharedByLocale = {
    en: {
      homeLabel: "Homeground China home",
      languageLabel: "Choose page language",
      homeCta: "Start my trip brief",
      skipLink: "Skip to main content",
      reviewedLabel: "Last reviewed",
      relatedLabel: "Business and service information",
      related: {
        business: "Business information",
        terms: "Terms of service",
        refund: "Refund & delivery",
        privacy: "Privacy notice",
        contact: "Email Homeground",
      },
    },
    zh: {
      homeLabel: "Homeground China 首页",
      languageLabel: "选择页面语言",
      homeCta: "开始填写旅行简报",
      skipLink: "跳到正文",
      reviewedLabel: "最近复核",
      relatedLabel: "经营与服务信息",
      related: {
        business: "经营主体信息",
        terms: "服务条款",
        refund: "退款与交付",
        privacy: "隐私说明",
        contact: "发送邮件",
      },
    },
    ko: {
      homeLabel: "Homeground China 홈",
      languageLabel: "페이지 언어 선택",
      homeCta: "여행 브리프 시작하기",
      skipLink: "본문으로 바로가기",
      reviewedLabel: "최근 검토",
      relatedLabel: "사업자 및 서비스 안내",
      related: {
        business: "사업자 정보",
        terms: "서비스 이용약관",
        refund: "환불 및 제공 안내",
        privacy: "개인정보 안내",
        contact: "이메일 보내기",
      },
    },
  } as const;

  return {
    htmlLang: htmlLang[locale],
    locale,
    pageId,
    pagePath: getHomegroundLegalPath(pageId, locale),
    homePath,
    languageShort: languageShort[locale],
    skipLink: sharedByLocale[locale].skipLink,
    relatedLabel: sharedByLocale[locale].relatedLabel,
    related: sharedByLocale[locale].related,
    navigation: {
      homeLabel: sharedByLocale[locale].homeLabel,
      languageLabel: sharedByLocale[locale].languageLabel,
      homeCta: sharedByLocale[locale].homeCta,
    },
  };
}

function businessCopy(locale: HomegroundLocale): HomegroundLegalCopy {
  const base = shared(locale, "business-information");
  const copy = {
    en: {
      metadata: {
        title: "Business information | Homeground",
        description:
          "The registered operator behind Homeground, current service boundaries and how written consultation payments are confirmed.",
      },
      pageLabel: "Business information",
      hero: {
        eyebrow: "Business information",
        title: "Who operates Homeground",
        intro:
          "Homeground is the public-facing brand of the registered individual business shown below in Zhangjiajie, Hunan, China. From one Homeground entry point, travellers can request a US$69 route review, a US$129 route build or custom full-trip planning and ground support.",
      },
      callout: {
        label: "A clear way to begin",
        title: "A real registered operator, with the scope confirmed before payment.",
        body:
          "Start with one trip brief. Homeground will clarify what you need and confirm the next step in writing. For accepted work, the service, price, scope, delivery timing and payment details are set out before you pay.",
      },
      sections: [
        {
          id: "registered-details",
          title: "Registered details",
          facts: [
            {
              label: "Registered name",
              value: homegroundBusiness.registeredName,
            },
            { label: "Legal form", value: homegroundBusiness.legalForm },
            {
              label: "Composition form",
              value: homegroundBusiness.compositionForm,
            },
            {
              label: "Unified Social Credit Code",
              value: homegroundBusiness.unifiedSocialCreditCode,
            },
            {
              label: "Registered operator",
              value: homegroundBusiness.operator,
            },
            {
              label: "Registered place of business",
              value: homegroundBusiness.registeredAddress,
            },
            {
              label: "Relevant registered business scope",
              value: homegroundBusiness.relevantBusinessScope,
              detail:
                "This is the registered business item relevant to Homeground’s current written-consultation services.",
            },
            {
              label: "Registration authority",
              value: homegroundBusiness.registrationAuthority,
            },
            {
              label: "Registration date",
              value: homegroundBusiness.registrationDate,
            },
            {
              label: "Licence issue date",
              value: homegroundBusiness.licenceIssueDate,
            },
            {
              label: "Official public registry",
              value: "National Enterprise Credit Information Publicity System",
              detail: `Open the official registry and search ${homegroundBusiness.unifiedSocialCreditCode}. A direct authorised electronic-licence display link has not yet been connected to this website.`,
              href: homegroundBusiness.registryUrl,
              external: true,
            },
          ],
        },
        {
          id: "current-services",
          title: "What this operator currently offers",
          cards: [
            {
              title: "Review My Route — US$69",
              body:
                "A fixed-scope written consultation reviewing one usable day-by-day route.",
            },
            {
              title: "Build My Route — US$129",
              body:
                "A fixed-scope written consultation creating one workable city order, night allocation and day-level route structure.",
            },
            {
              title: "Full Trip Planning & Ground Support",
              body:
                "Bring the whole trip to Homeground. We begin by understanding your dates, travellers, priorities and the support you want, then confirm a workable next step, service scope and proposal.",
            },
          ],
          paragraphs: [
            "The US$69 and US$129 options are fixed-scope written consultations. Full-trip support is discussed and scoped separately. For accepted work, written service and payment details are sent after the trip brief is reviewed.",
          ],
        },
        {
          id: "how-it-starts",
          title: "How a paid consultation begins",
          numbered: [
            "You submit a trip brief at no charge.",
            "Homeground checks whether the request fits the published scope.",
            "Before payment, you receive a written confirmation stating the operator, service, price and currency, included work, required materials, delivery date and applicable terms.",
            "Payment instructions are sent separately.",
            "Work begins after payment is confirmed and the required materials are complete.",
          ],
        },
        {
          id: "payment-records",
          title: "Payment records and contact",
          paragraphs: [
            "Do not send card details, bank credentials or payment QR codes through the website enquiry form. Before paying, check that the named recipient matches the written service confirmation. Available invoice or receipt information will be confirmed before payment.",
          ],
          facts: [
            {
              label: "Service and privacy email",
              value: homegroundBusiness.serviceEmail,
              href: `mailto:${homegroundBusiness.serviceEmail}`,
            },
            {
              label: "Postal contact",
              value: homegroundBusiness.registeredAddress,
            },
          ],
        },
      ],
    },
    zh: {
      metadata: {
        title: "经营主体信息 | Homeground",
        description:
          "查看 Homeground 的登记经营主体、当前服务边界，以及书面咨询服务如何确认与付款。",
      },
      pageLabel: "经营主体信息",
      hero: {
        eyebrow: "经营主体信息",
        title: "谁在运营 Homeground",
        intro:
          "Homeground 是由下方张家界登记个体工商户运营的对外品牌。通过同一个 Homeground 入口，旅行者可以申请 69 美元路线审核、129 美元路线规划，或按实际行程定制的全程规划与落地支持。",
      },
      callout: {
        label: "清楚地开始",
        title: "真实登记的经营主体，付款前把服务范围说清楚。",
        body:
          "先提交一份旅行简报，Homeground 会梳理你的需求，并以书面方式确认下一步。对于确认承接的服务，付款前会清楚列明服务内容、价格、范围、交付时间与付款信息。",
      },
      sections: [
        {
          id: "registered-details",
          title: "登记信息",
          facts: [
            { label: "登记名称", value: homegroundBusiness.registeredName },
            { label: "主体类型", value: homegroundBusiness.legalForm },
            { label: "组成形式", value: homegroundBusiness.compositionForm },
            {
              label: "统一社会信用代码",
              value: homegroundBusiness.unifiedSocialCreditCode,
            },
            { label: "经营者", value: homegroundBusiness.operator },
            {
              label: "经营场所",
              value: homegroundBusiness.registeredAddress,
            },
            {
              label: "与本网站相关的登记经营范围",
              value: homegroundBusiness.relevantBusinessScope,
              detail:
                "这是与 Homeground 当前书面路线咨询服务相关的登记经营项目。",
            },
            {
              label: "登记机关",
              value: homegroundBusiness.registrationAuthority,
            },
            { label: "注册日期", value: homegroundBusiness.registrationDate },
            {
              label: "发照日期",
              value: homegroundBusiness.licenceIssueDate,
            },
            {
              label: "官方公示系统",
              value: "国家企业信用信息公示系统",
              detail: `打开官方系统并搜索统一社会信用代码 ${homegroundBusiness.unifiedSocialCreditCode}。本网站尚未接入经授权的电子营业执照“亮照”直达链接。`,
              href: homegroundBusiness.registryUrl,
              external: true,
            },
          ],
        },
        {
          id: "current-services",
          title: "当前提供的服务",
          cards: [
            {
              title: "审核我的路线 — 69 美元",
              body: "对一份已经可以阅读的逐日路线进行固定范围书面审核。",
            },
            {
              title: "为我规划路线 — 129 美元",
              body:
                "建立一份可执行的城市顺序、住宿夜数分配和每日路线骨架。",
            },
            {
              title: "全程规划与落地支持",
              body:
                "把整趟旅行的需求交给 Homeground。我们先了解日期、同行者、旅行重点与希望获得的支持，再确认可执行的下一步、服务范围和方案。",
            },
          ],
          paragraphs: [
            "69 美元与 129 美元是固定范围的书面路线咨询；全程支持会根据实际需求另行沟通与确认。旅行简报审核后，我们会为确认承接的服务发送书面服务与付款信息。",
          ],
        },
        {
          id: "how-it-starts",
          title: "书面咨询如何开始",
          numbered: [
            "免费提交旅行简报。",
            "Homeground 核对是否符合公开标准范围。",
            "付款前，以书面方式确认经营主体、服务项目、价格与币种、包含内容、所需材料、交付日期和适用条款。",
            "另行发送付款方式。",
            "款项确认且所需材料完整后开始制作。",
          ],
        },
        {
          id: "payment-records",
          title: "付款记录与联系",
          paragraphs: [
            "请勿通过网站咨询表单发送银行卡资料、银行登录信息或付款二维码。付款前请核对收款方是否与书面服务确认一致。该笔交易可提供的发票或收据方式会在付款前说明。",
          ],
          facts: [
            {
              label: "服务与隐私邮箱",
              value: homegroundBusiness.serviceEmail,
              href: `mailto:${homegroundBusiness.serviceEmail}`,
            },
            { label: "通信地址", value: homegroundBusiness.registeredAddress },
          ],
        },
      ],
    },
    ko: {
      metadata: {
        title: "사업자 정보 | Homeground",
        description:
          "Homeground 운영 사업자, 현재 서비스 범위와 서면 컨설팅 결제 절차를 안내합니다.",
      },
      pageLabel: "사업자 정보",
      hero: {
        eyebrow: "사업자 정보",
        title: "Homeground 운영 사업자",
        intro:
          "Homeground는 중국 후난성 장자제에 등록된 아래 개인사업자가 운영하는 브랜드입니다. 하나의 Homeground 창구에서 US$69 일정 검토, US$129 동선 설계 또는 맞춤 전체 여행 설계 및 현지 지원을 요청할 수 있습니다.",
      },
      callout: {
        label: "명확한 시작",
        title: "등록된 실제 사업자가 결제 전에 서비스 범위를 명확히 안내합니다.",
        body:
          "여행 브리프 하나로 시작하세요. Homeground가 필요한 내용을 정리하고 다음 단계를 서면으로 확인합니다. 수락한 업무는 결제 전에 서비스 내용, 가격, 범위, 제공 일정과 결제 정보를 안내합니다.",
      },
      sections: [
        {
          id: "registered-details",
          title: "등록 정보",
          facts: [
            { label: "등록 사업자명", value: homegroundBusiness.registeredName },
            { label: "사업자 유형", value: homegroundBusiness.legalForm },
            { label: "운영 형태", value: homegroundBusiness.compositionForm },
            {
              label: "통일사회신용코드",
              value: homegroundBusiness.unifiedSocialCreditCode,
            },
            { label: "경영자", value: homegroundBusiness.operator },
            {
              label: "등록 사업장 주소",
              value: homegroundBusiness.registeredAddress,
            },
            {
              label: "현재 웹사이트와 관련된 등록 업무 범위",
              value: homegroundBusiness.relevantBusinessScope,
              detail:
                "Homeground의 현재 서면 일정 컨설팅과 관련된 등록 업무 항목입니다.",
            },
            {
              label: "등록 기관",
              value: homegroundBusiness.registrationAuthority,
            },
            { label: "등록일", value: homegroundBusiness.registrationDate },
            {
              label: "등록증 발급일",
              value: homegroundBusiness.licenceIssueDate,
            },
            {
              label: "공식 공시 시스템",
              value: "중국 국가기업신용정보공시시스템",
              detail: `공식 시스템에서 통일사회신용코드 ${homegroundBusiness.unifiedSocialCreditCode}를 검색하세요. 승인된 전자 사업자등록증 직접 표시 링크는 아직 이 웹사이트에 연결되지 않았습니다.`,
              href: homegroundBusiness.registryUrl,
              external: true,
            },
          ],
        },
        {
          id: "current-services",
          title: "현재 제공하는 서비스",
          cards: [
            {
              title: "내 일정 검토 — US$69",
              body:
                "사용 가능한 일자별 일정 한 건을 정해진 범위에서 서면 검토합니다.",
            },
            {
              title: "내 동선 설계 — US$129",
              body:
                "실행 가능한 도시 순서, 숙박일 배분과 일자별 동선 골격 한 건을 만듭니다.",
            },
            {
              title: "전체 여행 설계 및 현지 지원",
              body:
                "전체 여행에 필요한 내용을 Homeground에 알려 주세요. 날짜, 일행, 우선순위와 원하는 지원을 먼저 파악한 뒤 실행 가능한 다음 단계, 서비스 범위와 제안을 확인합니다.",
            },
          ],
          paragraphs: [
            "US$69와 US$129는 범위가 정해진 서면 일정 컨설팅이며 전체 여행 지원은 실제 필요에 따라 별도로 논의하고 확정합니다. 브리프를 검토한 뒤 수락한 서비스의 서면 안내와 결제 정보를 보내 드립니다.",
          ],
        },
        {
          id: "how-it-starts",
          title: "유료 서면 컨설팅 진행 절차",
          numbered: [
            "여행 브리프를 무료로 제출합니다.",
            "Homeground가 공개된 서비스 범위에 맞는지 확인합니다.",
            "결제 전에 운영 사업자, 서비스, 가격과 통화, 포함 내용, 필요한 자료, 제공 예정일과 적용 조건을 서면으로 확인합니다.",
            "결제 방법은 별도로 안내합니다.",
            "결제가 확인되고 필요한 자료가 모두 준비된 뒤 작업을 시작합니다.",
          ],
        },
        {
          id: "payment-records",
          title: "결제 기록 및 연락처",
          paragraphs: [
            "웹사이트 문의 양식에 카드 정보, 은행 로그인 정보 또는 결제 QR 코드를 보내지 마세요. 결제 전에 수취인이 서면 서비스 확인의 이름과 일치하는지 확인하세요. 제공 가능한 인보이스 또는 영수증 방식은 결제 전에 안내합니다.",
          ],
          facts: [
            {
              label: "서비스 및 개인정보 이메일",
              value: homegroundBusiness.serviceEmail,
              href: `mailto:${homegroundBusiness.serviceEmail}`,
            },
            {
              label: "우편 연락처",
              value: homegroundBusiness.registeredAddress,
            },
          ],
        },
      ],
    },
  } as const;

  return {
    ...base,
    metadata: copy[locale].metadata,
    navigation: {
      ...base.navigation,
      pageLabel: copy[locale].pageLabel,
    },
    hero: {
      ...copy[locale].hero,
      reviewedLabel: {
        en: "Last reviewed",
        zh: "最近复核",
        ko: "최근 검토",
      }[locale],
      reviewedValue: reviewed[locale],
    },
    callout: copy[locale].callout,
    sections: copy[locale].sections,
  };
}

function termsCopy(locale: HomegroundLocale): HomegroundLegalCopy {
  const base = shared(locale, "terms");
  const copy = {
    en: {
      metadata: {
        title: "Terms of service | Homeground",
        description:
          "Terms for Homeground website use and accepted fixed-scope written China itinerary consultation services.",
      },
      pageLabel: "Terms of service",
      hero: {
        eyebrow: "Service terms",
        title: "Clear scope before payment",
        intro:
          "These terms apply to use of this website and to fixed-scope written consultation services expressly accepted by the registered operator.",
      },
      callout: {
        label: "First principle",
        title: "Submitting a trip brief is not an order.",
        body:
          "A paid consultation begins only after Homeground sends a written service confirmation, you accept it and payment is received as instructed.",
      },
      sections: [
        {
          id: "consultation-scope",
          title: "1. Fixed-price consultation scope",
          cards: [
            {
              title: "Review My Route — US$69",
              body: "Review of one usable day-by-day route.",
            },
            {
              title: "Build My Route — US$129",
              body:
                "Creation of one workable city order, night allocation and day-level route structure.",
            },
          ],
          paragraphs: [
            "The published standard scope is up to 10 travel days, up to four overnight bases and one shared route for 1–4 travellers. Homeground confirms that the request fits this scope before payment.",
          ],
        },
        {
          id: "not-included",
          title: "2. What is not included",
          paragraphs: [
            "Unless a written confirmation expressly says otherwise, the fixed-price services exclude reservations, ticket purchases or holds, live fare and availability monitoring, supplier contact, large hotel or activity shortlists, unlimited revisions, continuous messaging, emergency help and support during travel.",
          ],
        },
        {
          id: "full-trip",
          title: "3. Full-trip planning and support",
          paragraphs: [
            "A Full Trip Planning & Ground Support submission starts a planning conversation. Homeground first clarifies the route, travellers, priorities and support required.",
            "If the request moves forward, the written proposal identifies the services, responsible provider, contracting party, scope, price and payment recipient before payment.",
          ],
        },
        {
          id: "confirmation",
          title: "4. Written confirmation before payment",
          bullets: [
            "The registered operator and service",
            "Confirmed scope and exclusions",
            "Total price and currency",
            "Materials required from the traveller",
            "Delivery date and format",
            "Included corrections or revisions",
            "Payment recipient and method",
            "Cancellation, refund and delivery terms",
          ],
          paragraphs: [
            "This website does not currently provide online checkout. Never submit payment credentials through the enquiry form.",
          ],
        },
        {
          id: "traveller-responsibilities",
          title: "5. Traveller responsibilities",
          paragraphs: [
            "Provide complete and accurate trip information, clearly mark existing bookings and deadlines, and tell us promptly if dates, party, destinations or constraints change. Only share material you have the right to use.",
            "Do not submit passport or ID images, bank or card details, payment QR codes or unredacted booking references through the website form.",
          ],
        },
        {
          id: "delivery",
          title: "6. Delivery and corrections",
          paragraphs: [
            "Delivery follows the date stated in the written confirmation after both payment and required materials are complete. Report clear errors or omissions within the agreed scope promptly. They are handled under the Refund & delivery policy and the transaction confirmation.",
          ],
        },
        {
          id: "changing-information",
          title: "7. Changing travel information",
          paragraphs: [
            "Transport, opening hours, availability, weather, entry rules and third-party prices can change. A consultation may identify items to recheck, but it does not guarantee admission, inventory, fares, weather or third-party performance.",
            "Nothing in these terms limits rights that cannot lawfully be excluded.",
          ],
        },
        {
          id: "personal-use",
          title: "8. Personal use",
          paragraphs: [
            "A paid route document is licensed for the traveller’s personal trip planning. It may be shared with the traveller’s own companions and relevant booked providers, but may not be resold, republished or presented as another planner’s work.",
          ],
        },
        {
          id: "privacy-contact",
          title: "9. Privacy and contact",
          paragraphs: [
            `Personal information is handled under the Privacy notice. Questions about a transaction should be sent to ${homegroundBusiness.serviceEmail} with the enquiry or order reference.`,
          ],
        },
      ],
    },
    zh: {
      metadata: {
        title: "服务条款 | Homeground",
        description:
          "适用于 Homeground 网站使用及明确接受的固定范围中国路线书面咨询服务。",
      },
      pageLabel: "服务条款",
      hero: {
        eyebrow: "服务条款",
        title: "付款前先把范围说清楚",
        intro:
          "本条款适用于网站使用，以及登记经营主体明确接受的固定范围书面咨询服务。",
      },
      callout: {
        label: "首要原则",
        title: "提交旅行简报不等于下单。",
        body:
          "只有 Homeground 发出书面服务确认、客户接受确认且款项按说明到账后，付费咨询才开始成立。",
      },
      sections: [
        {
          id: "consultation-scope",
          title: "1. 固定价格服务范围",
          cards: [
            {
              title: "审核我的路线 — 69 美元",
              body: "审核一份已经可以阅读的逐日路线。",
            },
            {
              title: "为我规划路线 — 129 美元",
              body:
                "建立一份可执行的城市顺序、住宿夜数分配和每日路线骨架。",
            },
          ],
          paragraphs: [
            "公开标准范围为：最多 10 个旅行日、最多 4 个过夜住宿地、1–4 位同行者共用一条路线。付款前由 Homeground 确认请求是否符合该范围。",
          ],
        },
        {
          id: "not-included",
          title: "2. 不包含的内容",
          paragraphs: [
            "除非书面确认另有明确约定，固定价格服务不包含预订或占位、购买票务、实时监控价格与余位、联系供应商、大量酒店或活动候选清单、无限修改、持续聊天、紧急帮助或旅途中支持。",
          ],
        },
        {
          id: "full-trip",
          title: "3. 全程规划与支持",
          paragraphs: [
            "提交“全程规划与落地支持”会开启一次规划沟通。Homeground 会先梳理路线、同行者、旅行重点与所需支持。",
            "如需求继续推进，付款前的书面方案会明确服务项目、实际负责方、合同主体、服务范围、价格与收款方。",
          ],
        },
        {
          id: "confirmation",
          title: "4. 付款前书面确认",
          bullets: [
            "登记经营主体和服务项目",
            "确认范围与排除内容",
            "总价和币种",
            "客户需要提供的材料",
            "交付日期与形式",
            "包含的更正或修改",
            "收款方和付款方式",
            "取消、退款与交付规则",
          ],
          paragraphs: [
            "本网站当前没有在线收银台。请勿通过咨询表单提交银行卡、银行账户或付款凭证信息。",
          ],
        },
        {
          id: "traveller-responsibilities",
          title: "5. 客户责任",
          paragraphs: [
            "请提供完整、准确的旅行信息，明确标记已预订内容和硬性期限；日期、同行者、目的地或限制变化时应及时告知。只能提交有权使用的材料。",
            "请勿在网站表单中发送护照或证件图片、银行卡资料、付款二维码或未遮盖的预订编号。",
          ],
        },
        {
          id: "delivery",
          title: "6. 交付与更正",
          paragraphs: [
            "付款和所需材料均完整后，按照书面确认中的日期交付。发现约定范围内明显错误或遗漏时，请及时联系；处理方式以《退款与交付》及该笔交易的书面确认为准。",
          ],
        },
        {
          id: "changing-information",
          title: "7. 动态旅行信息",
          paragraphs: [
            "交通、营业时间、余位、天气、入境规则及第三方价格都可能变化。书面咨询可以标记应再次核实的项目，但不保证入场、库存、价格、天气或第三方履约。",
            "本条款不限制依法不能被排除的消费者权利。",
          ],
        },
        {
          id: "personal-use",
          title: "8. 个人使用",
          paragraphs: [
            "付费路线文件供客户本人规划该次旅行使用，可与同游者及相关已预订服务方分享，但不得转售、公开转载或冒充其他规划师的成果。",
          ],
        },
        {
          id: "privacy-contact",
          title: "9. 隐私与联系",
          paragraphs: [
            `个人信息按照《隐私说明》处理。交易相关问题请发送至 ${homegroundBusiness.serviceEmail}，并附上咨询或订单编号。`,
          ],
        },
      ],
    },
    ko: {
      metadata: {
        title: "서비스 이용약관 | Homeground",
        description:
          "Homeground 웹사이트 이용과 수락된 정액 중국 여행 동선 서면 컨설팅에 적용되는 약관입니다.",
      },
      pageLabel: "서비스 이용약관",
      hero: {
        eyebrow: "서비스 이용약관",
        title: "결제 전에 범위를 명확하게",
        intro:
          "본 약관은 웹사이트 이용과 등록 사업자가 명시적으로 수락한 정액 서면 일정 컨설팅에 적용됩니다.",
      },
      callout: {
        label: "첫 번째 원칙",
        title: "여행 브리프 제출은 주문이 아닙니다.",
        body:
          "Homeground가 서면 서비스 확인을 보내고 고객이 이를 수락한 뒤 안내된 결제가 확인되어야 유료 컨설팅이 시작됩니다.",
      },
      sections: [
        {
          id: "consultation-scope",
          title: "1. 정액 컨설팅 범위",
          cards: [
            {
              title: "내 일정 검토 — US$69",
              body: "사용할 수 있는 일자별 일정 한 건을 검토합니다.",
            },
            {
              title: "내 동선 설계 — US$129",
              body:
                "실행 가능한 도시 순서, 숙박일 배분과 일자별 동선 골격 한 건을 만듭니다.",
            },
          ],
          paragraphs: [
            "공개된 표준 범위는 최대 10일, 최대 4개 숙박 거점, 1–4명이 함께 사용하는 한 개의 동선입니다. 결제 전에 Homeground가 표준 범위 적합성을 확인합니다.",
          ],
        },
        {
          id: "not-included",
          title: "2. 포함되지 않는 항목",
          paragraphs: [
            "서면 확인에 별도 명시하지 않는 한 예약·발권·좌석 확보, 실시간 요금 및 재고 확인, 공급업체 연락, 대량의 호텔·활동 후보, 무제한 수정, 지속적인 메시지 상담, 긴급 지원과 여행 중 지원은 포함하지 않습니다.",
          ],
        },
        {
          id: "full-trip",
          title: "3. 전체 여행 설계 및 지원",
          paragraphs: [
            "전체 여행 설계 및 현지 지원을 제출하면 플래닝 대화가 시작됩니다. Homeground가 먼저 동선, 일행, 우선순위와 필요한 지원을 정리합니다.",
            "요청을 계속 진행하는 경우 결제 전 서면 제안에 서비스, 실제 담당자, 계약 당사자, 범위, 가격과 결제 수취인을 명확히 안내합니다.",
          ],
        },
        {
          id: "confirmation",
          title: "4. 결제 전 서면 확인",
          bullets: [
            "등록 사업자와 서비스명",
            "확정 범위 및 제외 항목",
            "총액과 통화",
            "고객이 제공해야 할 자료",
            "제공 예정일과 형식",
            "포함된 수정 또는 보완",
            "결제 수취인과 결제 방법",
            "취소·환불·제공 조건",
          ],
          paragraphs: [
            "현재 웹사이트에는 온라인 결제가 없습니다. 문의 양식에 카드, 계좌 또는 결제 인증 정보를 입력하지 마세요.",
          ],
        },
        {
          id: "traveller-responsibilities",
          title: "5. 고객이 제공할 정보",
          paragraphs: [
            "완전하고 정확한 여행 정보를 제공하고, 이미 예약한 항목과 변경하기 어려운 기한을 표시해 주세요. 날짜, 일행, 목적지 또는 조건이 바뀌면 신속히 알려야 합니다. 사용할 권리가 있는 자료만 보내 주세요.",
            "웹사이트 양식에는 여권·신분증 이미지, 카드·계좌 정보, 결제 QR 코드 또는 가리지 않은 예약 번호를 제출하지 마세요.",
          ],
        },
        {
          id: "delivery",
          title: "6. 제공과 수정",
          paragraphs: [
            "결제와 필요한 자료가 모두 준비된 뒤 서면 확인에 적힌 날짜에 맞춰 제공합니다. 합의 범위 안의 명확한 오류나 누락은 즉시 알려 주세요. 처리 방법은 환불 및 제공 안내와 해당 거래의 서면 확인을 따릅니다.",
          ],
        },
        {
          id: "changing-information",
          title: "7. 변동되는 여행 정보",
          paragraphs: [
            "교통, 운영 시간, 좌석, 날씨, 입국 규정과 제3자 가격은 바뀔 수 있습니다. 다시 확인할 항목을 표시할 수는 있지만 입장, 재고, 요금, 날씨 또는 제3자의 이행을 보장하지 않습니다.",
            "법률상 배제할 수 없는 권리는 본 약관으로 제한되지 않습니다.",
          ],
        },
        {
          id: "personal-use",
          title: "8. 개인 사용",
          paragraphs: [
            "유료 동선 문서는 고객의 개인 여행 계획을 위해 사용할 수 있습니다. 동행자 및 관련 예약 서비스 제공자와 공유할 수 있지만 재판매, 공개 재게시 또는 다른 플래너의 작업인 것처럼 표시할 수 없습니다.",
          ],
        },
        {
          id: "privacy-contact",
          title: "9. 개인정보 및 연락처",
          paragraphs: [
            `개인정보는 개인정보 안내에 따라 처리됩니다. 거래 관련 질문은 문의 또는 주문 번호와 함께 ${homegroundBusiness.serviceEmail}로 보내 주세요.`,
          ],
        },
      ],
    },
  } as const;

  return {
    ...base,
    metadata: copy[locale].metadata,
    navigation: {
      ...base.navigation,
      pageLabel: copy[locale].pageLabel,
    },
    hero: {
      ...copy[locale].hero,
      reviewedLabel: {
        en: "Last reviewed",
        zh: "最近复核",
        ko: "최근 검토",
      }[locale],
      reviewedValue: reviewed[locale],
    },
    callout: copy[locale].callout,
    sections: copy[locale].sections,
  };
}

function refundCopy(locale: HomegroundLocale): HomegroundLegalCopy {
  const base = shared(locale, "refund-delivery");
  const copy = {
    en: {
      metadata: {
        title: "Refund & delivery | Homeground",
        description:
          "Delivery, cancellation, correction and refund stages for accepted Homeground written itinerary consultations.",
      },
      pageLabel: "Refund & delivery",
      hero: {
        eyebrow: "Refund & delivery",
        title: "The date and terms come before payment",
        intro:
          "The website takes no payment. For an accepted US$69 or US$129 consultation, the exact delivery date, required materials and cancellation terms are confirmed in writing before payment.",
      },
      callout: {
        label: "Current checkout status",
        title: "There is no online checkout on this website.",
        body:
          "A trip brief is free to submit. Payment instructions are sent separately only after scope, price, delivery and refund terms have been confirmed in writing.",
      },
      sections: [
        {
          id: "delivery",
          title: "1. Delivery process",
          numbered: [
            "Submit a trip brief at no charge.",
            "Homeground checks scope and fit.",
            "Receive a written service confirmation before payment.",
            "Work begins only after payment and all required materials are complete.",
            "The deliverable is sent to the agreed email in the format stated in the confirmation.",
          ],
          paragraphs: [
            "There is no universal turnaround promise. The transaction-specific delivery date is confirmed before payment. If required information is supplied late or the request changes materially, a revised date or scope must be agreed.",
            "If Homeground expects a delay, it will explain the reason and offer a revised date or another remedy available under the service confirmation and applicable law.",
          ],
        },
        {
          id: "cancellation",
          title: "2. Cancellation and refund stages",
          cards: [
            {
              title: "Before payment",
              body:
                "No payment has been taken, so the traveller may stop without charge.",
            },
            {
              title: "After payment, before work begins",
              body:
                "The traveller may cancel by email. Any consultation fee already received will be refunded.",
            },
            {
              title: "After personalised work begins",
              body:
                "Any refund is assessed against the work already completed and the written confirmation. A non-refundable stage or amount cannot be introduced after payment if it was not disclosed beforehand.",
            },
            {
              title: "If Homeground cannot deliver",
              body:
                "Homeground will refund the fee paid for the undelivered consultation.",
            },
          ],
        },
        {
          id: "corrections",
          title: "3. Corrections and changed travel plans",
          cards: [
            {
              title: "The agreed scope was materially missed",
              body:
                "Contact Homeground promptly. A clear error or omission within scope will be corrected first. If a material problem cannot reasonably be corrected, an appropriate partial or full refund will be considered under the written confirmation and applicable law.",
            },
            {
              title: "The traveller changes the trip",
              body:
                "A later change to dates, destinations, party or priorities may require a new scope, price or delivery date. It is not automatically a failure of the original service.",
            },
            {
              title: "Third-party information changes",
              body:
                "A later change in fares, availability, opening rules, weather or third-party operations is not by itself a delivery failure when the information was accurately dated or marked for rechecking.",
            },
          ],
        },
        {
          id: "request",
          title: "4. Requesting a refund or correction",
          paragraphs: [
            `Email ${homegroundBusiness.serviceEmail} from the contact used for the transaction where possible. Include the order reference, service purchased and a concise description of the issue.`,
            "Approved refunds are returned to the original payment method where possible. The processing estimate will be confirmed when the refund is approved. These rules do not limit rights that apply mandatorily under law.",
          ],
        },
      ],
    },
    zh: {
      metadata: {
        title: "退款与交付 | Homeground",
        description:
          "适用于 Homeground 已接受书面路线咨询的交付、取消、更正与退款阶段。",
      },
      pageLabel: "退款与交付",
      hero: {
        eyebrow: "退款与交付",
        title: "先确认日期和条件，再付款",
        intro:
          "本网站不收款。对于被确认接受的 69 美元或 129 美元咨询，具体交付日期、所需材料和取消条件会在付款前书面确认。",
      },
      callout: {
        label: "当前付款状态",
        title: "本网站目前没有在线收银台。",
        body:
          "旅行简报可以免费提交。只有在范围、价格、交付与退款条件书面确认后，才会另行发送付款方式。",
      },
      sections: [
        {
          id: "delivery",
          title: "1. 交付流程",
          numbered: [
            "免费提交旅行简报。",
            "Homeground 核对范围和适合度。",
            "付款前收到书面服务确认。",
            "款项到账且所需材料完整后开始制作。",
            "按书面确认中的形式发送到约定邮箱。",
          ],
          paragraphs: [
            "网站不作统一的固定时效承诺，每笔服务的交付日期会在付款前确认。客户迟交必要材料或实质改变需求时，需要重新确认日期或服务范围。",
            "如果预计无法按期交付，Homeground 会说明原因，并根据书面确认和适用法律提供新的日期或其他处理方式。",
          ],
        },
        {
          id: "cancellation",
          title: "2. 取消与退款阶段",
          cards: [
            {
              title: "付款前",
              body: "尚未收取任何款项，客户可以直接停止，不产生费用。",
            },
            {
              title: "已付款但尚未开始制作",
              body: "客户可以通过邮件取消，已收取的咨询费将退回。",
            },
            {
              title: "个性化工作已经开始",
              body:
                "退款会结合已经完成的工作和付款前的书面确认处理。付款前没有披露的不可退款阶段或金额，不能在付款后新增。",
            },
            {
              title: "Homeground 无法交付",
              body: "对尚未交付的咨询服务，退还已收取的服务费。",
            },
          ],
        },
        {
          id: "corrections",
          title: "3. 更正与旅行变化",
          cards: [
            {
              title: "交付成果实质偏离约定范围",
              body:
                "请及时联系 Homeground。对于约定范围内的明显错误或遗漏，优先进行更正；如重大问题无法合理修正，则依据书面确认和适用法律处理部分或全部退款。",
            },
            {
              title: "客户改变旅行",
              body:
                "制作开始后，日期、目的地、同行者或重点发生变化，可能需要重新确认范围、价格或交付日期；这不会自动构成原服务未履行。",
            },
            {
              title: "第三方动态信息发生变化",
              body:
                "如原文已准确注明核验日期或标记需要再次核实，后续票价、余位、营业规则、天气或第三方运营变化，本身不代表书面咨询没有交付。",
            },
          ],
        },
        {
          id: "request",
          title: "4. 申请退款或更正",
          paragraphs: [
            `请尽可能使用交易时的联系邮箱发送至 ${homegroundBusiness.serviceEmail}，并附上订单编号、所购服务和简要问题说明。`,
            "获批退款原则上退回原付款方式，具体到账时间会在批准退款时说明。本规则不限制法律强制适用的消费者权利。",
          ],
        },
      ],
    },
    ko: {
      metadata: {
        title: "환불 및 제공 안내 | Homeground",
        description:
          "수락된 Homeground 서면 일정 컨설팅의 제공, 취소, 수정 및 환불 단계를 안내합니다.",
      },
      pageLabel: "환불 및 제공 안내",
      hero: {
        eyebrow: "환불 및 제공",
        title: "결제 전에 날짜와 조건을 확인합니다",
        intro:
          "웹사이트에서는 결제를 받지 않습니다. 수락된 US$69 또는 US$129 컨설팅은 결제 전에 제공 예정일, 필요한 자료와 취소 조건을 서면으로 확인합니다.",
      },
      callout: {
        label: "현재 결제 상태",
        title: "이 웹사이트에는 온라인 결제가 없습니다.",
        body:
          "여행 브리프는 무료로 제출할 수 있습니다. 범위, 가격, 제공 및 환불 조건을 서면으로 확인한 뒤에만 결제 방법을 별도로 안내합니다.",
      },
      sections: [
        {
          id: "delivery",
          title: "1. 제공 절차",
          numbered: [
            "여행 브리프를 무료로 제출합니다.",
            "Homeground가 범위와 적합성을 확인합니다.",
            "결제 전에 서면 서비스 확인을 받습니다.",
            "결제와 필요한 자료가 모두 확인된 뒤 작업을 시작합니다.",
            "확인서에 적힌 형식으로 합의한 이메일에 결과물을 보냅니다.",
          ],
          paragraphs: [
            "모든 주문에 적용되는 고정 소요 시간을 약속하지 않습니다. 거래별 제공 예정일은 결제 전에 확인합니다. 고객이 필요한 자료를 늦게 보내거나 요청을 크게 바꾸면 날짜 또는 범위를 다시 합의해야 합니다.",
            "Homeground가 지연을 예상하면 이유를 설명하고 서면 확인 및 적용 법률에 따라 변경된 날짜 또는 가능한 해결 방법을 안내합니다.",
          ],
        },
        {
          id: "cancellation",
          title: "2. 취소 및 환불 단계",
          cards: [
            {
              title: "결제 전",
              body: "결제된 금액이 없으므로 비용 없이 중단할 수 있습니다.",
            },
            {
              title: "결제 후, 작업 시작 전",
              body:
                "이메일로 취소할 수 있으며 이미 받은 컨설팅 비용은 환불합니다.",
            },
            {
              title: "맞춤 작업 시작 후",
              body:
                "환불은 이미 완료한 작업과 결제 전 서면 확인을 기준으로 판단합니다. 결제 전에 알리지 않은 환불 불가 단계나 금액을 결제 후 새로 적용하지 않습니다.",
            },
            {
              title: "Homeground가 제공할 수 없는 경우",
              body:
                "제공하지 못한 컨설팅에 대해 받은 서비스 비용을 환불합니다.",
            },
          ],
        },
        {
          id: "corrections",
          title: "3. 수정 및 여행 조건 변경",
          cards: [
            {
              title: "결과물이 합의한 범위를 중대하게 충족하지 못한 경우",
              body:
                "신속히 연락해 주세요. 합의 범위 안의 명확한 오류나 누락을 먼저 수정합니다. 중대한 문제를 합리적으로 수정할 수 없다면 서면 확인과 적용 법률에 따라 적절한 일부 또는 전액 환불을 검토합니다.",
            },
            {
              title: "고객이 여행 조건을 변경한 경우",
              body:
                "작업 시작 후 날짜, 목적지, 일행 또는 우선순위가 바뀌면 새로운 범위, 가격 또는 제공일이 필요할 수 있습니다. 이런 변경만으로 기존 서비스의 불이행이 되는 것은 아닙니다.",
            },
            {
              title: "제3자 정보가 바뀐 경우",
              body:
                "정보의 확인일 또는 재확인 필요성이 정확히 표시되었다면 이후 요금, 재고, 운영 규칙, 날씨나 제3자 운영 변경만으로 서면 컨설팅 미제공이 되지는 않습니다.",
            },
          ],
        },
        {
          id: "request",
          title: "4. 환불 또는 수정 요청",
          paragraphs: [
            `가능하면 거래에 사용한 연락처에서 ${homegroundBusiness.serviceEmail}로 이메일을 보내고 주문 번호, 구매한 서비스와 문제를 간단히 적어 주세요.`,
            "승인된 환불은 가능한 경우 원래 결제 수단으로 반환합니다. 처리 예상 기간은 환불 승인 시 안내합니다. 본 안내는 법률상 강제 적용되는 권리를 제한하지 않습니다.",
          ],
        },
      ],
    },
  } as const;

  return {
    ...base,
    metadata: copy[locale].metadata,
    navigation: {
      ...base.navigation,
      pageLabel: copy[locale].pageLabel,
    },
    hero: {
      ...copy[locale].hero,
      reviewedLabel: {
        en: "Last reviewed",
        zh: "最近复核",
        ko: "최근 검토",
      }[locale],
      reviewedValue: reviewed[locale],
    },
    callout: copy[locale].callout,
    sections: copy[locale].sections,
  };
}

export function getHomegroundLegalCopy(
  pageId: HomegroundLegalPageId,
  locale: HomegroundLocale,
): HomegroundLegalCopy {
  if (pageId === "business-information") return businessCopy(locale);
  if (pageId === "terms") return termsCopy(locale);
  return refundCopy(locale);
}
