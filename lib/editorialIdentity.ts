import { getHomegroundStudioCopy } from "./homegroundStudioI18n";
import {
  HOMEGROUND_BRAND_NAME,
  HOMEGROUND_BRAND_SLOGAN,
  type HomegroundLocale,
} from "./homegroundI18n";
import { getHomegroundSocialProfileUrls } from "./homegroundSocial";

export const EDITORIAL_AUTHOR_ID = "evan" as const;
export const EDITORIAL_PERSON_ID =
  "https://homegroundchina.com/studio/evan/#person";
export const EDITORIAL_ORGANIZATION_ID =
  "https://homegroundchina.com/#organization";
export const EDITORIAL_WEBSITE_ID =
  "https://homegroundchina.com/#website";

const EDITORIAL_SITE_URL = "https://homegroundchina.com/";
const EDITORIAL_LOGO_URL =
  "https://homegroundchina.com/icon.svg";

const profilePaths: Record<HomegroundLocale, string> = {
  en: "/studio/evan/",
  zh: "/zh/studio/evan/",
  ko: "/ko/studio/evan/",
};

const profileCopy = {
  en: {
    title: "Evan — China travel writer and trip planner | Homeground",
    h1: "Evan",
    eyebrow: "Writer · fact reviewer · trip planner",
    introduction:
      "Evan writes and reviews Homeground’s China travel guides with a focus on the decisions international travellers face before and during a trip.",
    methodTitle: "How Evan reviews a Homeground guide",
    method: [
      "Start with the real question a traveller is trying to solve, not a generic destination summary.",
      "Separate stable context from booking rules, schedules and access details that must be checked again.",
      "Connect the answer to the whole journey: who is travelling, where they start, what follows and what happens if the first plan fails.",
    ],
    focusTitle: "Editorial focus",
    focus: ["Multi-city route design", "Transport and arrival decisions", "Cross-cultural first-trip questions", "English and Korean communication"],
    articlesTitle: "Recently reviewed guides",
    studioLink: "Meet the full Homeground studio",
  },
  zh: {
    title: "Evan｜中国旅行作者与行程规划师｜Homeground",
    h1: "Evan",
    eyebrow: "作者 · 事实核验 · 行程规划",
    introduction:
      "Evan 负责撰写和核对 Homeground 的中国旅行指南，重点回答国际旅客在出发前和旅途中真正需要做出的选择。",
    methodTitle: "Evan 如何核对一篇 Homeground 指南",
    method: [
      "先找出旅客真正想解决的问题，而不是先写一篇通用目的地简介。",
      "把稳定背景与必须重新核实的预约、班次和开放信息明确分开。",
      "把答案放回整趟旅行：谁在出发、从哪里开始、下一站是什么，以及第一方案失败后怎么办。",
    ],
    focusTitle: "主要关注领域",
    focus: ["多城市路线设计", "交通与抵达选择", "第一次来中国的跨文化问题", "英文与韩文沟通"],
    articlesTitle: "近期核对的指南",
    studioLink: "认识 Homeground 完整团队",
  },
  ko: {
    title: "Evan — 중국 여행 작가·여행 플래너 | Homeground",
    h1: "Evan",
    eyebrow: "작성 · 사실 검토 · 여행 설계",
    introduction:
      "Evan은 해외 여행자가 중국 여행 전과 현지에서 실제로 내려야 하는 결정을 중심으로 Homeground의 중국 여행 가이드를 작성하고 검토합니다.",
    methodTitle: "Evan이 Homeground 가이드를 검토하는 방법",
    method: [
      "일반적인 여행지 소개보다 여행자가 실제로 해결하려는 질문에서 시작합니다.",
      "안정적인 배경 정보와 다시 확인해야 하는 예약·운행·입장 정보를 분리합니다.",
      "누가 여행하고 어디서 출발하며 다음 일정이 무엇인지, 첫 계획이 실패하면 어떻게 할지까지 전체 여정에 연결합니다.",
    ],
    focusTitle: "주요 편집 분야",
    focus: ["여러 도시를 잇는 일정 설계", "교통과 도착 결정", "첫 중국 여행의 문화 간 질문", "영어·한국어 소통"],
    articlesTitle: "최근 검토한 가이드",
    studioLink: "Homeground 전체 팀 만나기",
  },
} as const;

export function getEditorialAuthor(locale: HomegroundLocale) {
  const studio = getHomegroundStudioCopy(locale);
  const member = studio.members.find((candidate) => candidate.id === EDITORIAL_AUTHOR_ID);
  if (!member) throw new Error(`Missing ${EDITORIAL_AUTHOR_ID} in studio copy for ${locale}.`);
  return {
    id: EDITORIAL_AUTHOR_ID,
    name: member.name,
    role: member.role,
    bio: member.bio,
    tags: member.tags,
    image: member.image,
    path: profilePaths[locale],
    copy: profileCopy[locale],
  };
}

export function getEditorialAuthorLanguagePaths() {
  return { ...profilePaths };
}

export function editorialPersonSchema(locale: HomegroundLocale) {
  const author = getEditorialAuthor(locale);
  return {
    "@type": "Person",
    "@id": EDITORIAL_PERSON_ID,
    name: author.name,
    url: `https://homegroundchina.com${author.path}`,
    image: `https://homegroundchina.com${author.image.src}`,
    jobTitle: author.role,
    description: author.bio,
    knowsLanguage: ["English", "Korean", "Chinese"],
    worksFor: { "@id": EDITORIAL_ORGANIZATION_ID },
  };
}

export function editorialOrganizationSchema() {
  return {
    "@type": "TravelAgency",
    "@id": EDITORIAL_ORGANIZATION_ID,
    name: HOMEGROUND_BRAND_NAME,
    alternateName: ["Homeground China Journeys", "homegroundchina.com"],
    url: EDITORIAL_SITE_URL,
    slogan: HOMEGROUND_BRAND_SLOGAN,
    logo: {
      "@type": "ImageObject",
      "@id": `${EDITORIAL_SITE_URL}#logo`,
      url: EDITORIAL_LOGO_URL,
      contentUrl: EDITORIAL_LOGO_URL,
      width: 256,
      height: 256,
      caption: HOMEGROUND_BRAND_NAME,
    },
    areaServed: { "@type": "Country", name: "China" },
    sameAs: getHomegroundSocialProfileUrls(),
  };
}

export function editorialWebsiteSchema() {
  return {
    "@type": "WebSite",
    "@id": EDITORIAL_WEBSITE_ID,
    name: HOMEGROUND_BRAND_NAME,
    alternateName: "homegroundchina.com",
    url: EDITORIAL_SITE_URL,
    inLanguage: ["en", "zh-Hans", "ko"],
    publisher: { "@id": EDITORIAL_ORGANIZATION_ID },
  };
}
