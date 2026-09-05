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
  overview: {
    title: string;
    stages: readonly {
      label: string;
      title: string;
      detail: string;
    }[];
    termsLabel: string;
    termsTitle: string;
    terms: readonly { label: string; value: string }[];
  };
  collageLabel: string;
  peopleEyebrow: string;
  peopleTitle: string;
  peopleIntro: string;
  peopleDetailsLabel: string;
  members: readonly StudioMember[];
  trust: {
    eyebrow: string;
    title: string;
    body: string;
    inputsTitle: string;
    inputs: readonly string[];
    stepsTitle: string;
    points: readonly { title: string; detail: string }[];
    deliverablesTitle: string;
    deliverables: readonly string[];
    boundary: string;
  };
  cta: {
    label: string;
    title: string;
    body: string;
    button: string;
    secondaryButton: string;
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
      title: "How Homeground Plans China Trips",
      description:
        "See how Homeground turns real dates, travellers, priorities and fixed bookings into a coherent China route, written scope and usable plan.",
      openGraphTitle: "How Homeground Plans a China Trip",
    },
    eyebrow: "How we plan your China trip",
    title: "From your real constraints to a plan you can use.",
    intro:
      "Tell us what is fixed, what matters and what is still open. One lead planner turns that brief into a coherent route, checks it against real travel conditions and confirms the exact work before anything paid begins.",
    overview: {
      title: "The whole planning thread, at a glance",
      stages: [
        {
          label: "01 / Inputs",
          title: "Your trip as it really is",
          detail:
            "Dates, travellers, must-sees, pace, mobility needs, fixed bookings and open questions.",
        },
        {
          label: "02 / Steps",
          title: "Brief → fit check → written work",
          detail:
            "A human planner checks what connects, what conflicts and which decisions come first.",
        },
        {
          label: "03 / Deliverables",
          title: "Your private-tour scope and arrangements",
          detail:
            "You receive the written output agreed for the service, not a generic attraction list.",
        },
      ],
      termsLabel: "04 / Timing",
      termsTitle: "Confirm the delivery date before paid work begins",
      terms: [
        {
          label: "Timing",
          value: "Delivery date confirmed before payment",
        },
      ],
    },
    collageLabel: "The five people at Homeground China",
    peopleEyebrow: "Who does what",
    peopleTitle: "Different strengths. One planning thread.",
    peopleIntro:
      "Your lead planner keeps one conversation moving. The wider team contributes route, destination, operations and guest-care experience when the trip needs it.",
    peopleDetailsLabel: "Read background and experience",
    members: [
      {
        id: "evan",
        name: "Evan",
        role: "Lead & Cross-cultural Trip Planner",
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
      eyebrow: "The working method",
      title: "What happens after you share the trip basics.",
      body:
        "You keep one clear conversation with a lead planner who knows the whole journey. The trip agreement confirms the arrangements Homeground will handle and the support included during travel.",
      inputsTitle: "What to send",
      inputs: [
        "Travel dates and arrival or departure points",
        "Who is travelling, preferred pace and mobility or room needs",
        "Must-see places and ideas you would be comfortable dropping",
        "Fixed bookings, useful budget context and any decision deadline",
      ],
      stepsTitle: "What we do",
      points: [
        {
          title: "Read the brief",
          detail:
            "A planner identifies what is fixed, what is flexible and which missing details affect the route.",
        },
        {
          title: "Test the whole journey",
          detail:
            "City order, nights, transfers, pace and on-the-ground constraints are checked as one connected trip.",
        },
        {
          title: "Confirm before paid work",
          detail:
            "We reply with the suitable service, written scope, trip quotation and next steps.",
        },
      ],
      deliverablesTitle: "What you receive",
      deliverables: [
        "Full Trip: a trip-specific written scope for planning, arrangements and ground support",
        "Clear assumptions, trade-offs and next decisions for the agreed service",
      ],
      boundary:
        "The initial private-tour enquiry is free. We confirm the arrangements, inclusions and quotation for your dates and group before booking.",
    },
    cta: {
      label: "Next step",
      title: "Tell us the places you do not want to miss.",
      body:
        "Use WhatsApp or leave your email. A planner can ask what is still open and explain the suitable next step; paid work begins only after scope, fee and delivery timing are confirmed.",
      button: "Talk to a China trip planner",
      secondaryButton: "Compare planning services",
    },
    homeLink: "Meet the people behind the plan",
  },
  zh: {
    path: "/zh/studio/",
    metadata: {
      title: "Homeground 如何规划中国旅行",
      description:
        "了解 Homeground 怎样把真实日期、同行者、优先事项与已有预订整理成连贯路线、明确服务范围和可执行方案。",
      openGraphTitle: "Homeground 怎样规划一趟中国旅行",
    },
    eyebrow: "我们怎样规划你的中国旅行",
    title: "从真实限制出发，做成一份你能使用的方案。",
    intro:
      "告诉我们哪些已经确定、什么最重要、还有哪些问题没有答案。一位主规划师会把这些信息整理成连贯路线，结合真实旅行条件复核，并在任何付费工作开始前确认具体服务。",
    overview: {
      title: "一眼看懂完整规划流程",
      stages: [
        {
          label: "01 / 输入信息",
          title: "从你的真实行程出发",
          detail: "日期、同行者、必去地点、节奏、行动需求、已订项目与待定问题。",
        },
        {
          label: "02 / 规划步骤",
          title: "简报 → 人工确认 → 书面成果",
          detail: "规划师判断哪些能顺利衔接、哪里有冲突，以及哪些决定最优先。",
        },
        {
          label: "03 / 交付成果",
          title: "私家团范围与具体安排",
          detail: "你收到的是双方确认过的书面成果，不是一份通用景点清单。",
        },
      ],
      termsLabel: "04 / 交付时间",
      termsTitle: "开始付费工作前，先确认预计交付时间",
      terms: [
        {
          label: "交付时间",
          value: "付款前确认预计交付日期",
        },
      ],
    },
    collageLabel: "Homeground China 的五位成员",
    peopleEyebrow: "每个人负责什么",
    peopleTitle: "不同的经验，一条完整的规划主线。",
    peopleIntro:
      "主规划师负责一条清楚的沟通主线；路线、目的地、执行与客户关怀经验会在行程需要时进入同一份方案。",
    peopleDetailsLabel: "查看背景与经验",
    members: [
      {
        id: "evan",
        name: "Evan",
        role: "主规划师 · 跨文化行程规划",
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
      eyebrow: "具体工作方式",
      title: "发来旅行基本信息后，会发生什么。",
      body:
        "你始终和一位了解全程的主规划师沟通。Homeground 负责的具体安排及旅行中包含的支持，以旅行约定为准。",
      inputsTitle: "你需要提供什么",
      inputs: [
        "旅行日期、抵达与离开地点",
        "同行者、理想节奏、行动或房间需求",
        "一定想去的地方，以及可以舍弃的想法",
        "已确定的预订、可选预算背景与决定期限",
      ],
      stepsTitle: "我们会怎样处理",
      points: [
        {
          title: "阅读旅行简报",
          detail: "规划师先分清哪些已经确定、哪些可以调整，以及哪些缺失信息会影响路线。",
        },
        {
          title: "把全程放在一起复核",
          detail: "城市顺序、住宿晚数、交通衔接、节奏和现场条件会作为同一段旅程一起检查。",
        },
        {
          title: "付费工作前先确认",
          detail: "我们会回复合适的服务、书面范围、旅行报价和下一步。",
        },
      ],
      deliverablesTitle: "你会收到什么",
      deliverables: [
        "全程服务：针对实际旅程书面确认规划、安排与落地支持范围",
        "在约定服务内清楚标出假设、取舍与下一步决定",
      ],
      boundary:
        "初次私家团询价免费。具体安排、包含项和报价会根据日期与同行人数在预订前确认。",
    },
    cta: {
      label: "下一步",
      title: "先告诉我们，你不想错过哪些地方。",
      body:
        "可以通过 WhatsApp 直接聊，或只留下一个邮箱。规划师会继续确认必要信息并说明适合怎样继续；任何付费工作开始前都会先确认范围、费用和交付时间。",
      button: "联系旅行规划师",
      secondaryButton: "比较旅行规划服务",
    },
    homeLink: "认识参与规划与落地的人",
  },
  ko: {
    path: "/ko/studio/",
    metadata: {
      title: "Homeground의 중국 여행 설계 방식",
      description:
        "실제 날짜, 여행자, 우선순위와 확정 예약을 Homeground가 어떻게 자연스러운 중국 동선, 명확한 작업 범위와 실행 가능한 계획으로 만드는지 확인하세요.",
      openGraphTitle: "Homeground가 중국 여행을 설계하는 방법",
    },
    eyebrow: "중국 여행을 설계하는 방법",
    title: "실제 조건에서 출발해 바로 활용할 수 있는 계획으로.",
    intro:
      "확정된 것, 가장 중요한 것, 아직 열려 있는 질문을 알려 주세요. 한 명의 전담 플래너가 이를 자연스러운 동선으로 연결하고 실제 여행 조건에 맞춰 검토한 뒤, 유료 작업 전에 정확한 서비스 내용을 먼저 확인합니다.",
    overview: {
      title: "전체 설계 과정을 한눈에",
      stages: [
        {
          label: "01 / 입력 정보",
          title: "여행의 실제 조건부터",
          detail: "날짜, 동행자, 필수 장소, 속도, 이동 지원, 확정 예약과 열린 질문을 받습니다.",
        },
        {
          label: "02 / 진행 단계",
          title: "브리프 → 적합성 확인 → 서면 작업",
          detail: "플래너가 연결되는 부분과 충돌하는 부분, 먼저 결정할 항목을 확인합니다.",
        },
        {
          label: "03 / 결과물",
          title: "프라이빗 투어 범위와 준비 사항",
          detail: "일반적인 명소 목록이 아니라 합의한 서비스에 맞는 서면 결과물을 받습니다.",
        },
      ],
      termsLabel: "04 / 납품 일정",
      termsTitle: "유료 작업 전에 예상 납품일을 먼저 확인합니다",
      terms: [
        {
          label: "납품 일정",
          value: "결제 전에 예상 납품일 확인",
        },
      ],
    },
    collageLabel: "Homeground China의 다섯 멤버",
    peopleEyebrow: "누가 무엇을 맡는지",
    peopleTitle: "서로 다른 강점, 하나로 이어지는 여행 설계.",
    peopleIntro:
      "전담 플래너가 하나의 명확한 대화를 이어 갑니다. 필요할 때 동선, 목적지, 운영과 고객 케어 경험이 같은 계획에 더해집니다.",
    peopleDetailsLabel: "배경과 경험 보기",
    members: [
      {
        id: "evan",
        name: "Evan",
        role: "리드 플래너 · 다문화 여행 설계",
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
      eyebrow: "실제 진행 방식",
      title: "여행 기본 정보를 보낸 다음 진행되는 일.",
      body:
        "전체 여정을 아는 전담 플래너와 한 흐름으로 소통합니다. Homeground가 맡을 준비와 여행 중 포함되는 지원은 여행 약정에서 확인합니다.",
      inputsTitle: "보내 주실 정보",
      inputs: [
        "여행 날짜와 도착·출발 지점",
        "동행자, 원하는 속도, 이동 또는 객실 관련 요구",
        "꼭 가고 싶은 장소와 포기해도 괜찮은 아이디어",
        "확정 예약, 선택적 예산 정보와 결정 기한",
      ],
      stepsTitle: "저희가 하는 일",
      points: [
        {
          title: "여행 브리프 확인",
          detail: "확정된 것과 조정 가능한 것, 동선에 영향을 주는 누락 정보를 먼저 구분합니다.",
        },
        {
          title: "여정 전체 검토",
          detail: "도시 순서, 숙박 일수, 이동, 속도와 현지 조건을 하나로 연결된 여행으로 확인합니다.",
        },
        {
          title: "유료 작업 전 확인",
          detail: "알맞은 서비스, 서면 범위, 여행 견적과 다음 단계을 안내합니다.",
        },
      ],
      deliverablesTitle: "받게 되는 결과물",
      deliverables: [
        "전체 여행: 실제 여정에 맞춘 계획·준비·현지 지원의 서면 범위",
        "합의한 서비스 안에서 명확히 표시한 가정, 선택의 영향과 다음 결정",
      ],
      boundary:
        "첫 프라이빗 투어 문의는 무료입니다. 여행 날짜와 인원에 따른 준비, 포함 사항과 견적은 예약 전에 확인합니다.",
    },
    cta: {
      label: "다음 단계",
      title: "놓치고 싶지 않은 장소를 먼저 알려 주세요.",
      body:
        "WhatsApp으로 바로 문의하거나 이메일을 남겨 주세요. 플래너가 필요한 내용을 이어서 확인하고 알맞은 다음 단계를 안내합니다. 유료 작업 전에는 범위, 요금과 납품 일정을 먼저 확인합니다.",
      button: "중국 여행 플래너와 상담하기",
      secondaryButton: "여행 설계 서비스 비교",
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
