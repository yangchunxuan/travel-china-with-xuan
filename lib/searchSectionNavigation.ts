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
      "Destinations organizes China by regions, cities and sights. All Guides is the complete library of published articles and practical answers.",
    knowledge: {
      eyebrow: "Travel knowledge",
      title: "Browse the planning map",
      description:
        "Seven connected ways to understand where to go and how the trip works.",
    },
    destinations: {
      eyebrow: "Browse by place",
      title: "Destinations",
      description:
        "Move from regions to cities and sights, then see the routes and nearby places that connect them.",
      action: "Explore destinations",
    },
    allGuides: {
      eyebrow: "Search the library",
      title: "All Guides",
      description:
        "Search every published article and practical answer across transport, stays, entry, culture and more.",
      action: "Open all guides",
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
      "「目的地」按地区、城市和景点组织；「全部指南」是完整的文章与实用答案库。两者内容相连，但入口用途不同。",
    knowledge: {
      eyebrow: "旅行知识",
      title: "从七类旅行决定继续",
      description: "把去哪里、何时去、怎么走、住哪里和实际准备放进同一张知识地图。",
    },
    destinations: {
      eyebrow: "按地点浏览",
      title: "目的地",
      description: "从地区到城市再到景点，并查看相互连接的路线与周边目的地。",
      action: "浏览目的地",
    },
    allGuides: {
      eyebrow: "搜索完整资料库",
      title: "全部指南",
      description: "搜索所有已发布文章和实用答案，覆盖交通、住宿、入境、文化等主题。",
      action: "打开全部指南",
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
      "여행지는 지역·도시·명소 순으로 정리하고, 전체 가이드는 공개된 모든 글과 실용 답변을 모은 자료실입니다.",
    knowledge: {
      eyebrow: "여행 지식",
      title: "일곱 가지 여행 판단으로 둘러보기",
      description: "어디로 갈지부터 시기, 이동, 숙소와 실제 준비까지 하나의 지도로 연결합니다.",
    },
    destinations: {
      eyebrow: "장소별 탐색",
      title: "여행지",
      description: "지역에서 도시와 명소로 이동하며 연결 동선과 가까운 여행지를 함께 확인하세요.",
      action: "여행지 둘러보기",
    },
    allGuides: {
      eyebrow: "전체 자료 검색",
      title: "전체 가이드",
      description: "교통, 숙소, 입국, 문화 등 모든 주제의 공개 글과 실용 답변을 검색하세요.",
      action: "전체 가이드 열기",
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
