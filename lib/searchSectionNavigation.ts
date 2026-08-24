import type { HomegroundLocale } from "./homegroundI18n";
import type { SearchSectionId } from "./searchPlatformI18n";

export const searchKnowledgeSectionIds = [
  "explore",
  "plan",
  "transport",
  "when-to-go",
  "stay",
  "essentials",
  "culture",
] as const satisfies readonly SearchSectionId[];

export const searchUtilitySectionId = "tools" as const satisfies SearchSectionId;
export const searchAssistanceSectionId =
  "services" as const satisfies SearchSectionId;

interface NavigationEntryCopy {
  eyebrow: string;
  title: string;
  description: string;
  action: string;
}

interface NavigationGroupCopy {
  eyebrow: string;
  title: string;
  description: string;
}

interface SearchSectionNavigationCopy {
  ariaLabel: string;
  eyebrow: string;
  title: string;
  introduction: string;
  knowledge: NavigationGroupCopy;
  destinations: NavigationEntryCopy;
  allGuides: NavigationEntryCopy;
  utility: NavigationGroupCopy;
  assistance: NavigationGroupCopy;
  currentLabel: string;
}

const copies: Record<HomegroundLocale, SearchSectionNavigationCopy> = {
  en: {
    ariaLabel: "Choose how to explore Homeground China",
    eyebrow: "Find your way around China",
    title: "Start with a place—or with the question.",
    introduction:
      "Destinations is the place directory for choosing cities and connections. Travel Advice is the searchable library for solving entry, transport, stay and timing questions.",
    knowledge: {
      eyebrow: "Travel knowledge",
      title: "Browse travel questions",
      description:
        "Seven connected ways to understand where to go and how the trip works.",
    },
    destinations: {
      eyebrow: "Browse by place",
      title: "Destinations",
      description:
        "Choose a city or place, then see nights, stay areas, arrival points and sensible next stops.",
      action: "Explore destinations",
    },
    allGuides: {
      eyebrow: "Solve a travel problem",
      title: "Travel Advice",
      description:
        "Search practical answers across entry, transport, stays, timing, culture and first-trip planning.",
      action: "Open Travel Advice",
    },
    utility: {
      eyebrow: "Utility",
      title: "Tools",
      description: "Use a focused calculator, selector or reference to complete a task.",
    },
    assistance: {
      eyebrow: "Assistance",
      title: "Local help",
      description: "Find guides, transfers and trip support when a person is useful.",
    },
    currentLabel: "Current section",
  },
  zh: {
    ariaLabel: "选择如何浏览 Homeground 中国旅行内容",
    eyebrow: "选择查找方式",
    title: "按地点找，或按问题找。",
    introduction:
      "“目的地”是按城市与连接关系组织的地点目录；“实用指南”用于搜索入境、交通、住宿和时间等旅行问题。",
    knowledge: {
      eyebrow: "旅行知识",
      title: "按旅行问题继续",
      description: "把去哪里、何时去、怎么走、住哪里和实际准备放进同一张知识地图。",
    },
    destinations: {
      eyebrow: "按地点浏览",
      title: "目的地",
      description: "选择城市或地点，再查看停留晚数、住宿区域、进出门户和合理的下一站。",
      action: "浏览目的地",
    },
    allGuides: {
      eyebrow: "解决旅行问题",
      title: "实用指南",
      description: "搜索入境、交通、住宿、出行时间、文化和第一次旅行规划的明确答案。",
      action: "打开实用指南",
    },
    utility: {
      eyebrow: "实用功能",
      title: "工具",
      description: "用计算、选择和查询工具直接完成一项旅行任务。",
    },
    assistance: {
      eyebrow: "需要真人时",
      title: "当地协助",
      description: "需要导游、接送或行程支持时，再查看合适的本地协助。",
    },
    currentLabel: "当前栏目",
  },
  ko: {
    ariaLabel: "Homeground 중국 여행 콘텐츠 탐색 방법 선택",
    eyebrow: "찾는 방법을 선택하세요",
    title: "장소에서 시작하거나, 질문에서 시작하세요.",
    introduction:
      "여행지는 도시와 연결 관계를 고르는 장소 디렉터리이고, 실용 가이드는 입국·교통·숙소·시기 문제를 푸는 검색 자료실입니다.",
    knowledge: {
      eyebrow: "여행 지식",
      title: "여행 질문별로 둘러보기",
      description: "어디로 갈지부터 시기, 이동, 숙소와 실제 준비까지 하나의 지도로 연결합니다.",
    },
    destinations: {
      eyebrow: "장소별 탐색",
      title: "여행지",
      description: "도시나 장소를 고른 뒤 숙박일, 숙소 지역, 도착 지점과 다음 여행지를 확인하세요.",
      action: "여행지 둘러보기",
    },
    allGuides: {
      eyebrow: "여행 문제 해결",
      title: "실용 가이드",
      description: "입국, 교통, 숙소, 여행 시기, 문화와 첫 여행 계획에 관한 명확한 답을 검색하세요.",
      action: "실용 가이드 열기",
    },
    utility: {
      eyebrow: "실용 기능",
      title: "도구",
      description: "계산기, 선택 도구와 조회 자료로 한 가지 여행 작업을 바로 해결하세요.",
    },
    assistance: {
      eyebrow: "사람의 도움이 필요할 때",
      title: "현지 도움",
      description: "가이드, 픽업이나 일정 지원이 필요할 때 적절한 현지 도움을 확인하세요.",
    },
    currentLabel: "현재 섹션",
  },
};

export function getSearchSectionNavigationCopy(
  locale: HomegroundLocale = "en",
) {
  return copies[locale];
}

export function getAllGuidesPath(locale: HomegroundLocale = "en") {
  return locale === "en" ? "/guides/" : `/${locale}/guides/`;
}
