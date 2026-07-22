import type { HomegroundLocale } from "./homegroundI18n";

export interface StudioMember {
  id: string;
  name: string;
  role: string;
  value: string;
  bio: string;
  tags: readonly string[];
  image: {
    src: string;
    width: number;
    height: number;
    smallSrc: string;
    smallWidth: number;
    smallHeight: number;
    alt: string;
    position?: string;
  };
}

export interface HomegroundStudioCopy {
  path: string;
  metadata: {
    title: string;
    description: string;
    openGraphTitle: string;
  };
  eyebrow: string;
  title: string;
  intro: string;
  collageLabel: string;
  peopleEyebrow: string;
  peopleTitle: string;
  peopleIntro: string;
  members: readonly StudioMember[];
  trust: {
    eyebrow: string;
    title: string;
    body: string;
    points: readonly { title: string; detail: string }[];
  };
  cta: {
    label: string;
    title: string;
    body: string;
    button: string;
  };
  homeLink: string;
}

const images = {
  evan: {
    src: "/images/studio/evan-bookshop.jpg",
    width: 1200,
    height: 1600,
    smallSrc: "/images/studio/evan-bookshop-small.jpg",
    smallWidth: 750,
    smallHeight: 1000,
  },
  yoyo: {
    src: "/images/studio/yoyo-mountains.jpg",
    width: 1080,
    height: 1440,
    smallSrc: "/images/studio/yoyo-mountains-small.jpg",
    smallWidth: 750,
    smallHeight: 1000,
  },
  tantan: {
    src: "/images/studio/tantan-elephant.jpg",
    width: 1012,
    height: 1800,
    smallSrc: "/images/studio/tantan-elephant-small.jpg",
    smallWidth: 562,
    smallHeight: 1000,
  },
  kevin: {
    src: "/images/studio/kevin-malaysia.jpg",
    width: 1440,
    height: 1080,
    smallSrc: "/images/studio/kevin-malaysia-small.jpg",
    smallWidth: 1000,
    smallHeight: 750,
  },
  vivi: {
    src: "/images/studio/vivi-travel.jpg",
    width: 1200,
    height: 1600,
    smallSrc: "/images/studio/vivi-travel-small.jpg",
    smallWidth: 750,
    smallHeight: 1000,
  },
} as const;

export const homegroundStudioCopy: Record<
  HomegroundLocale,
  HomegroundStudioCopy
> = {
  en: {
    path: "/studio/",
    metadata: {
      title: "Meet the Homeground trip-planning studio",
      description:
        "Meet the people who shape Homeground China trips, review destination details and coordinate the handoffs that make a route workable.",
      openGraphTitle: "The people behind Homeground China",
    },
    eyebrow: "A small studio with shared field experience",
    title: "The people who plan—and help deliver your trip.",
    intro:
      "Every trip begins with a considered match. We look at language, who is travelling, the complexity of the route and which destinations matter most. A journey centred on one region may be led by the teammate who knows it best; a wider cross-China trip may need someone strongest at connecting multiple cities. That lead planner is responsible for the complete route and the planning conversation—not just passing messages between the traveller and local teams.",
    collageLabel: "The five people in the Homeground studio",
    peopleEyebrow: "Who does what",
    peopleTitle: "Different strengths. One planning thread.",
    peopleIntro:
      "The useful question is not only where someone has travelled. It is what they notice before your journey reaches the ground.",
    members: [
      {
        id: "evan",
        name: "Evan",
        role: "Studio Lead & Cross-cultural Trip Planner",
        value:
          "Turns the uncertainty of a first China trip into clear choices you can discuss.",
        bio:
          "Evan graduated from Sogang University in Korea and has also lived in Taiwan, Thailand and Malaysia. That cross-cultural experience helps him understand what overseas travelers actually worry about on a first China trip: which cities to keep, whether the transfers are realistic and whether communication will hold together. He shapes the overall direction and can explain complex decisions in English or Korean.",
        tags: ["English", "Korean", "Cross-cultural planning", "Multi-city trips"],
        image: {
          ...images.evan,
          alt: "Evan reading in a bookshop",
          position: "50% 46%",
        },
      },
      {
        id: "yoyo",
        name: "Yoyo",
        role: "Trip Planner & Detail Coordinator",
        value: "Turns scattered travel wishes into a route that holds together.",
        bio:
          "Yoyo’s accounting background gives her a naturally structured way of thinking. She turns loose ideas into a workable route, checking the number of nights, connections between cities and details that are easy to overlook. Her experience supporting travelers in destinations including Beijing also keeps her focused on whether a plan genuinely suits the people taking the trip.",
        tags: ["Route structure", "Night allocation", "Detail review", "City connections"],
        image: {
          ...images.yoyo,
          alt: "Yoyo beside a mountain lake while travelling in China",
          position: "50% 42%",
        },
      },
      {
        id: "tantan",
        name: "Tantan",
        role: "Trip Planner & Hunan Local Coordinator",
        value: "Brings local reality into every Zhangjiajie-area plan.",
        bio:
          "Tantan works across both trip planning and local coordination in Hunan, with practical experience around Zhangjiajie, Changsha and Fenghuang. She knows that a route that looks simple on paper can change once driving time, queues and weather are involved. Her role is to make sure the plan can work in the real world, not only on a screen.",
        tags: ["Zhangjiajie", "Changsha", "Fenghuang", "Hunan coordination"],
        image: {
          ...images.tantan,
          alt: "Tantan smiling beside an elephant during a trip in Thailand",
          position: "50% 57%",
        },
      },
      {
        id: "kevin",
        name: "Kevin",
        role: "Trip Planner & Operations Coordinator",
        value: "Spots operational gaps before they become travel-day problems.",
        bio:
          "Kevin studied English and began working in local guiding and trip operations while at university, building around four years of practical experience. He understands the journey from arrival and city transfers to on-the-ground communication and delivery. That experience helps him find weak handoffs early and keep a good-looking plan workable once the traveler arrives.",
        tags: ["English support", "Local operations", "Process control", "Delivery review"],
        image: {
          ...images.kevin,
          alt: "Kevin travelling in front of Putra Mosque in Malaysia",
          position: "70% 42%",
        },
      },
      {
        id: "vivi",
        name: "Vivi",
        role: "Guest Care & Local Operations",
        value: "Helps travelers feel heard, informed and looked after.",
        bio:
          "Vivi brings strong local guest-service experience and a naturally warm way of communicating. She looks beyond the attraction list to whether replies arrive on time, handoffs are clear and requests from the traveler are actually heard. She supports guest communication and local coordination, adding care and reassurance to the practical side of the trip.",
        tags: ["Guest communication", "Local coordination", "Clear handoffs", "On-trip support"],
        image: {
          ...images.vivi,
          alt: "Vivi relaxing with a drink while travelling",
          position: "50% 40%",
        },
      },
    ],
    trust: {
      eyebrow: "How the team works",
      title: "One point of contact. More than one person’s experience.",
      body:
        "A second planner reviews the journey as a whole, including its pace, transitions and practical demands. When the plan moves into local delivery, team members with relevant guest-handling experience—or the selected local team—check current operating conditions, handover details and who is responsible for what. This keeps one clear direction across the trip without pretending that one person knows every part of China equally well.",
      points: [
        {
          title: "Matched to the trip",
          detail: "We choose the lead around your route—not simply whoever is available. If one destination is central, a teammate who knows it well may take the lead.",
        },
        {
          title: "One view of the whole journey",
          detail: "The lead connects cities, transport, pace and personal priorities into one coherent plan and remains your main planning contact.",
        },
        {
          title: "Reviewed from two angles",
          detail: "A second planner checks the overall rhythm; destination-experienced members or the local team confirm current conditions and responsibilities.",
        },
      ],
    },
    cta: {
      label: "Start with your real wishlist",
      title: "Tell us the places you do not want to miss.",
      body:
        "Check how your destinations fit your nights first. If you contact us, the same brief comes to the team—so you do not have to start again.",
      button: "Check my China wishlist",
    },
    homeLink: "Meet the people behind the plan",
  },
  zh: {
    path: "/zh/studio/",
    metadata: {
      title: "认识 Homeground 中国旅行规划团队",
      description:
        "认识参与 Homeground 中国旅行规划、目的地复核与执行协调的团队成员。",
      openGraphTitle: "Homeground China 背后的旅行规划团队",
    },
    eyebrow: "共享一线经验的小型工作室",
    title: "真正参与规划与落地的人。",
    intro:
      "每段旅程都从匹配合适的主规划师开始。我们会一起看沟通语言、同行者、路线复杂度和最重要的目的地：如果旅程主要围绕某一地区，可以由熟悉当地接待的成员牵头；如果要串联多个城市，则由更擅长统筹全程的人负责。主规划师负责整条路线和规划沟通，而不是在客人和地接之间转发消息。",
    collageLabel: "Homeground 工作室的五位成员",
    peopleEyebrow: "每个人负责什么",
    peopleTitle: "不同的经验，一条完整的规划主线。",
    peopleIntro:
      "真正重要的不只是一个人去过哪里，而是他能否在行程落地之前，发现对应的问题。",
    members: [
      {
        id: "evan",
        name: "Evan",
        role: "工作室负责人 · 跨文化行程规划",
        value: "把第一次中国旅行中的陌生感，变成清楚、可以讨论的选择。",
        bio:
          "Evan 毕业于韩国西江大学，也曾在台湾、泰国和马来西亚生活。长期跨文化生活让他更能理解海外客人第一次来中国时真正担心什么：城市怎么取舍、移动是否现实、沟通会不会断层。他负责梳理整体方向，并用英文或韩文把复杂问题说明白。",
        tags: ["英文沟通", "韩文沟通", "跨文化规划", "多城市路线"],
        image: {
          ...images.evan,
          alt: "Evan 在书店里阅读",
          position: "50% 46%",
        },
      },
      {
        id: "yoyo",
        name: "Yoyo",
        role: "行程规划师 · 细节协调",
        value: "把零散的旅行愿望，整理成前后能够衔接的路线。",
        bio:
          "Yoyo 的会计专业背景让她习惯把复杂问题拆清楚。她擅长将零散愿望整理成有节奏、能执行的路线，核对住宿晚数、城市衔接和容易遗漏的细节。她曾参与北京等地的客人服务，在规划阶段尤其重视行程是否真正适合同游者。",
        tags: ["路线结构", "晚数核对", "细节复核", "多城市衔接"],
        image: {
          ...images.yoyo,
          alt: "Yoyo 在中国旅行时站在山间湖泊旁",
          position: "50% 42%",
        },
      },
      {
        id: "tantan",
        name: "Tantan",
        role: "行程规划师 · 湖南在地协调",
        value: "把张家界一带真实的现场条件，带进行程规划里。",
        bio:
          "Tantan 同时参与行程规划和湖南地区的在地执行，熟悉张家界、长沙、凤凰一带的实际接待。她知道纸面上看似顺路的安排，落地后可能受到车程、排队和天气影响。她的工作是让路线不只看起来合理，也能在现场顺利完成。",
        tags: ["张家界", "长沙", "凤凰", "湖南在地协调"],
        image: {
          ...images.tantan,
          alt: "Tantan 在泰国旅行时与大象合影",
          position: "50% 57%",
        },
      },
      {
        id: "kevin",
        name: "Kevin",
        role: "行程规划师 · 执行统筹",
        value: "在问题变成旅行当天的麻烦之前，先把执行缺口找出来。",
        bio:
          "Kevin 是英语专业出身，从大学时期开始参与地接与导游服务，至今已有约四年经验。他熟悉客人抵达、城市衔接、现场沟通到行程执行的整体流程，因此规划时会提前发现容易出问题的环节，让方案不仅好看，也能在真实旅行中顺利落地。",
        tags: ["英文沟通", "地接经验", "流程统筹", "执行复核"],
        image: {
          ...images.kevin,
          alt: "Kevin 在马来西亚布特拉清真寺前旅行",
          position: "70% 42%",
        },
      },
      {
        id: "vivi",
        name: "Vivi",
        role: "客户关怀 · 在地执行协调",
        value: "让客人在陌生环境里，始终知道有人听见并在跟进。",
        bio:
          "Vivi 拥有扎实的在地接待经验，也很擅长让客人在陌生环境里感到被照顾。她关注的不只是景点清单，还包括回复是否及时、交接是否清楚、现场需求有没有被听见。她参与客人沟通与执行协调，为旅程补上温度和安心感。",
        tags: ["客户沟通", "在地协调", "行程交接", "旅行中支持"],
        image: {
          ...images.vivi,
          alt: "Vivi 在旅行中喝饮料休息",
          position: "50% 40%",
        },
      },
    ],
    trust: {
      eyebrow: "团队如何协作",
      title: "一位联系人，不止一个人的经验。",
      body:
        "另一位规划师会从全程角度复核旅行节奏、城市衔接和现实负担。进入当地执行时，有相关接待经验的成员或选定的当地团队再确认实时条件、交接细节和各方分工。这样既保留一条清楚的全程主线，也不假装一个人同样熟悉中国所有地方。",
      points: [
        {
          title: "按旅程匹配主规划师",
          detail: "不是简单交给当时有空的人。若一地是行程核心，熟悉当地的成员可以直接牵头。",
        },
        {
          title: "一位主规划师统筹全程",
          detail: "把城市、交通、节奏和个人优先级连成一条路线，并作为主要规划联系人。",
        },
        {
          title: "从两个角度共同复核",
          detail: "另一位规划师检查整体逻辑，当地经验成员或执行团队确认现场条件和分工。",
        },
      ],
    },
    cta: {
      label: "从真实愿望开始",
      title: "先告诉我们，你不想错过哪些地方。",
      body:
        "先检查目的地和住宿晚数是否匹配。你选择联系后，同一份旅行需求会直接交给团队，无需重新填写。",
      button: "检查我的旅行愿望",
    },
    homeLink: "认识参与规划与落地的人",
  },
  ko: {
    path: "/ko/studio/",
    metadata: {
      title: "Homeground 중국 여행 플래닝 팀 소개",
      description:
        "Homeground의 중국 여행 설계, 목적지 검토와 현지 운영 연결을 담당하는 팀을 만나보세요.",
      openGraphTitle: "Homeground China를 만드는 여행 플래닝 팀",
    },
    eyebrow: "현장 경험을 공유하는 소규모 스튜디오",
    title: "여행을 설계하고, 실제 실행까지 연결하는 사람들.",
    intro:
      "모든 여행은 적합한 담당 플래너를 정하는 것에서 시작합니다. 고객의 언어, 동행 구성, 동선의 복잡성과 가장 중요한 목적지를 함께 살펴봅니다. 특정 지역이 중심인 여행이라면 그 지역을 잘 아는 구성원이 계획을 이끌 수 있고, 여러 도시를 연결하는 여행이라면 전체 동선을 조율하는 데 강한 플래너가 맡을 수 있습니다. 담당 플래너는 단순히 고객과 현지 팀 사이에서 메시지를 전달하는 사람이 아니라, 전체 여정과 계획 과정에 책임을 지는 사람입니다.",
    collageLabel: "Homeground 스튜디오의 다섯 멤버",
    peopleEyebrow: "누가 무엇을 맡는지",
    peopleTitle: "서로 다른 강점, 하나로 이어지는 여행 설계.",
    peopleIntro:
      "중요한 것은 단지 어디를 여행했는지가 아니라, 실제 여행 전에 어떤 문제를 먼저 발견할 수 있는가입니다.",
    members: [
      {
        id: "evan",
        name: "Evan",
        role: "스튜디오 리드 · 다문화 여행 플래너",
        value: "첫 중국 여행의 막막함을 이해하기 쉬운 선택지로 바꿉니다.",
        bio:
          "Evan은 한국 서강대학교를 졸업했으며 대만, 태국, 말레이시아에서도 생활했습니다. 여러 문화권에서 지낸 경험 덕분에 첫 중국 여행을 준비하는 해외 여행자가 무엇을 어려워하는지 잘 이해합니다. 도시 선택과 이동 흐름을 정리하고, 복잡한 내용을 영어 또는 한국어로 명확하게 설명하는 역할을 맡습니다.",
        tags: ["영어", "한국어", "다문화 여행 설계", "다도시 일정"],
        image: {
          ...images.evan,
          alt: "서점에서 책을 읽는 Evan",
          position: "50% 46%",
        },
      },
      {
        id: "yoyo",
        name: "Yoyo",
        role: "여행 플래너 · 디테일 코디네이터",
        value: "흩어진 여행 희망을 서로 자연스럽게 이어지는 일정으로 정리합니다.",
        bio:
          "Yoyo는 회계학 전공에서 익힌 구조적 사고로 복잡한 여행 요청을 정리합니다. 흩어진 희망 사항을 실행 가능한 일정으로 바꾸고, 숙박 일수와 도시 간 연결, 놓치기 쉬운 세부 사항을 꼼꼼히 검토합니다. 베이징 등에서 여행객을 지원한 경험을 바탕으로, 일정이 실제 동행자에게 맞는지를 중요하게 봅니다.",
        tags: ["일정 구조", "숙박 일수", "세부 검토", "도시 간 연결"],
        image: {
          ...images.yoyo,
          alt: "중국 여행 중 산과 호수를 배경으로 선 Yoyo",
          position: "50% 42%",
        },
      },
      {
        id: "tantan",
        name: "Tantan",
        role: "여행 플래너 · 후난 현지 코디네이터",
        value: "장자제 지역의 실제 현장 조건을 일정 설계에 반영합니다.",
        bio:
          "Tantan은 일정 설계와 후난 지역 현지 운영에 함께 참여하며 장자제, 창사, 펑황 일대의 실제 여행 흐름을 잘 압니다. 지도에서는 간단해 보이는 이동도 교통, 대기 시간, 날씨에 따라 달라질 수 있음을 고려합니다. 계획이 화면에서만 그럴듯한 것이 아니라 현장에서도 실행 가능하도록 조정합니다.",
        tags: ["장자제", "창사", "펑황", "후난 현지 운영"],
        image: {
          ...images.tantan,
          alt: "태국 여행 중 코끼리 옆에서 웃는 Tantan",
          position: "50% 57%",
        },
      },
      {
        id: "kevin",
        name: "Kevin",
        role: "여행 플래너 · 운영 코디네이터",
        value: "운영상의 빈틈이 여행 당일의 문제가 되기 전에 미리 찾아냅니다.",
        bio:
          "Kevin은 영어를 전공했고 대학 시절부터 현지 안내와 여행 운영 업무를 시작해 약 4년의 실무 경험을 쌓았습니다. 도착, 도시 간 이동, 현장 소통, 일정 실행까지 전체 흐름을 이해하기 때문에 계획 단계에서 문제 가능성을 미리 찾아 현실적으로 조정합니다.",
        tags: ["영어 소통", "현지 운영", "전체 흐름 관리", "실행 검토"],
        image: {
          ...images.kevin,
          alt: "말레이시아 푸트라 모스크 앞을 여행하는 Kevin",
          position: "70% 42%",
        },
      },
      {
        id: "vivi",
        name: "Vivi",
        role: "고객 케어 · 현지 운영",
        value: "낯선 여행지에서도 자신의 요청이 전달되고 있다는 안심을 줍니다.",
        bio:
          "Vivi는 현지 여행 운영 경험을 바탕으로 낯선 환경에서도 여행자가 편안함을 느끼도록 돕습니다. 단순히 명소 목록만 보는 것이 아니라 답변이 제때 전달되는지, 인수인계가 명확한지, 현장 요청이 제대로 반영되는지를 세심하게 살핍니다. 따뜻한 소통과 실행 조율을 담당합니다.",
        tags: ["고객 소통", "현지 조율", "명확한 인수인계", "여행 중 지원"],
        image: {
          ...images.vivi,
          alt: "여행 중 음료를 마시며 쉬는 Vivi",
          position: "50% 40%",
        },
      },
    ],
    trust: {
      eyebrow: "팀이 일하는 방식",
      title: "연락 창구는 한 명, 그 뒤의 경험은 한 사람 이상입니다.",
      body:
        "다른 플래너가 여행의 전체 속도와 이동 연결, 현실적인 부담을 한 번 더 검토합니다. 계획이 현지 운영 단계로 넘어가면 관련 고객 응대 경험이 있는 구성원이나 선정된 현지 팀이 현재 운영 조건, 인계 내용과 역할 분담을 확인합니다. 한 사람이 중국의 모든 지역을 똑같이 잘 안다고 말하지 않으면서도, 여행 전체에는 하나의 분명한 방향이 유지되도록 하는 방식입니다.",
      points: [
        {
          title: "여행에 맞는 담당자 배정",
          detail: "단순히 가능한 사람에게 맡기지 않습니다. 한 지역이 여행의 중심이라면 그곳을 잘 아는 구성원이 전체 계획을 이끌 수 있습니다.",
        },
        {
          title: "전체 여정을 보는 한 명의 플래너",
          detail: "담당 플래너는 도시 간 이동, 여행 속도와 고객의 우선순위를 하나의 계획으로 연결하고 주요 연락 창구가 됩니다.",
        },
        {
          title: "서로 다른 관점의 검토",
          detail: "다른 플래너가 전체 흐름을 살펴본 뒤, 해당 지역 경험이 있는 구성원이나 현지 운영팀이 운영 조건과 역할 분담을 확인합니다.",
        },
      ],
    },
    cta: {
      label: "진짜 희망 목록에서 시작하세요",
      title: "놓치고 싶지 않은 장소를 먼저 알려 주세요.",
      body:
        "목적지와 숙박일수가 맞는지 먼저 확인하세요. 문의를 선택하면 같은 여행 요청서가 팀에 전달되어 다시 작성할 필요가 없습니다.",
      button: "나의 여행 희망 목록 확인",
    },
    homeLink: "여행을 설계하고 실행하는 팀 만나기",
  },
};

export function getHomegroundStudioCopy(
  locale: HomegroundLocale,
): HomegroundStudioCopy {
  return homegroundStudioCopy[locale];
}

export function getStudioLanguagePaths() {
  return {
    en: "/studio/",
    "zh-Hans": "/zh/studio/",
    ko: "/ko/studio/",
    "x-default": "/studio/",
  };
}
