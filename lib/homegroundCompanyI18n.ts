import type { HomegroundLocale } from "./homegroundI18n";

/**
 * /company/ (what Homeground is for and why) beside /studio/ (who plans your
 * trip) and /business-information/ (the registered details). The position,
 * agreed with the owner on 2026-10-05: we back people who want to see China
 * their own way — no tour group, and the hard parts are ours. The page stays
 * noindex and out of the sitemap until the owner approves the copy. Every
 * claim here is one the owner confirmed or the licences already state.
 */
interface CopyItem {
  title: string;
  body: string;
}

export interface HomegroundCompanyCopy {
  path: string;
  metadata: {
    title: string;
    description: string;
    openGraphTitle: string;
  };
  /** The header menu's own label for this page. */
  navLabel: string;
  eyebrow: string;
  title: string;
  /** Where the title may break, for Chinese, which has no spaces to break at. */
  titleLines?: readonly string[];
  intro: string;
  teamAction: string;
  credentialsAction: string;
  proof: {
    label: string;
    since: string;
    people: string;
    tours: string;
    languages: string;
  };
  reasons: {
    eyebrow: string;
    title: string;
    items: readonly CopyItem[];
  };
  help: {
    eyebrow: string;
    title: string;
    tickets: CopyItem & { link: string };
    guide: CopyItem & { link: string };
    trip: CopyItem & { link: string };
  };
  why: {
    eyebrow: string;
    title: string;
    body: string;
    values: readonly CopyItem[];
  };
  cities: {
    eyebrow: string;
    title: string;
    intro: string;
  };
  timeline: {
    eyebrow: string;
    title: string;
    items: readonly (CopyItem & { date: string })[];
  };
  next: {
    eyebrow: string;
    title: string;
    team: CopyItem;
    credentials: CopyItem;
    careers: CopyItem;
  };
}

/**
 * The year the owner's travel business began (confirmed 2026-10-05). The
 * licensed Beijing agency itself was registered in 2025; the timeline says so.
 */
export const HOMEGROUND_IN_TRAVEL_SINCE = 2003;

const companyCopy: Record<HomegroundLocale, HomegroundCompanyCopy> = {
  en: {
    path: "/company/",
    metadata: {
      title: "About Homeground China: Our Mission and Values",
      description:
        "Homeground China is a licensed Beijing travel agency (L-BJ10587), in travel since 2003. See China your way and leave the hard parts to us: why you can count on us, how much help you can ask for, and why we do this.",
      openGraphTitle: "About Homeground China",
    },
    navLabel: "Our Mission",
    eyebrow: "Company",
    title: "See China your way. Leave the hard parts to us.",
    intro:
      "Homeground China is a licensed travel agency in Beijing. We back people who want to see China their own way: if all you need is a ticket, we book it; if you want a guide, you book one by the day; if you want to hand over the whole trip, one person looks after it from your first email until you fly home.",
    teamAction: "Meet the team",
    credentialsAction: "Licences and registration",
    proof: {
      label: "Homeground in numbers",
      since: "The year we started in travel",
      people: "People on the team",
      tours: "Published private tours",
      languages: "Languages on this site",
    },
    reasons: {
      eyebrow: "Why you can count on us",
      title: "Six things you can count on",
      items: [
        { title: "One person, start to finish", body: "From your first email until you fly home, the same planner looks after you. No hand-offs." },
        { title: "Always reachable", body: "If anything comes up while you are in China, message us directly on WeChat or WhatsApp." },
        { title: "Our own guides and drivers", body: "We assign guides and drivers ourselves and never pass your trip to another ground agency." },
        { title: "No shopping stops, no hidden costs", body: "Every quote says exactly what it includes, and no itinerary has shopping stops." },
        { title: "A licensed travel agency", body: "盛世美达（北京）国际旅行社有限公司, travel agency licence L-BJ10587, issued by the Beijing Municipal Culture and Tourism Bureau." },
        { title: "Pay the company, balance on arrival", body: "A 30% deposit goes to the company's Alipay merchant account. The balance is paid after you arrive in China." },
      ],
    },
    help: {
      eyebrow: "How much help",
      title: "You decide how much help you need",
      tickets: {
        title: "Just one ticket",
        body: "For sights that need a real-name booking, like the Forbidden City or the Terracotta Warriors, we book them with your passport.",
        link: "Attraction tickets",
      },
      guide: {
        title: "A guide by the day",
        body: "A licensed private guide, booked by the day, in Shanghai, Beijing, Xi'an or Zhangjiajie.",
        link: "Private English-speaking guides",
      },
      trip: {
        title: "The whole trip",
        body: "Route, hotels, car, guide and tickets arranged together, and someone there for you once you are in China.",
        link: "Full trip planning & ground support",
      },
    },
    why: {
      eyebrow: "Why we do this",
      title: "A friend has come from afar.",
      body: "We believe that the more people travel and meet, the fewer misunderstandings there are between them. The best way is to come and walk it yourself, and see the China where ordinary people live. What we do is help more people dare to travel that way.",
      values: [
        { title: "Truth first", body: "What a place is really like, what it costs and what we can't do: we tell you before you pay." },
        { title: "Hosted like a friend", body: "Planned around your pace, your interests and the people you travel with, the way we would for a friend visiting home." },
        { title: "Feet on the ground", body: "Homeground means home ground. China is ours: when something comes up, someone is here." },
      ],
    },
    cities: {
      eyebrow: "Where we work",
      title: "Our home ground",
      intro: "Each one has a published city guide and private tours on this site.",
    },
    timeline: {
      eyebrow: "Our story so far",
      title: "How we got here",
      items: [
        { date: "2003", title: "Into the travel business", body: "Ever since, we have worked in travel: domestic, outbound and inbound." },
        { date: "January 2025", title: "Our Beijing agency is registered", body: "盛世美达（北京）国际旅行社有限公司 is registered with the Changping District market regulator." },
        { date: "2025", title: "Travel agency licence L-BJ10587", body: "Licensed by the Beijing Municipal Culture and Tourism Bureau for domestic and inbound travel." },
        { date: "2026", title: "homegroundchina.com goes live", body: "City guides, travel advice and private tours in English, Chinese and Korean." },
        { date: "October 2026", title: "Building the team", body: "We start hiring travel advisors, guides and content staff across China." },
      ],
    },
    next: {
      eyebrow: "Keep reading",
      title: "See who we are, and check our papers",
      team: { title: "Meet the team", body: "The planners behind your trip, and how we judge a workable plan." },
      credentials: { title: "Licences and registration", body: "Our registered details, with the official registries where you can check them." },
      careers: { title: "Careers (in Chinese)", body: "We are hiring travel advisors, guides and content staff." },
    },
  },
  zh: {
    path: "/zh/company/",
    metadata: {
      title: "关于 Homeground：我们的使命与理念",
      description:
        "Homeground China 是北京的持证旅行社（许可证 L-BJ10587），从 2003 年起一直在做旅游。按你的方式游中国，难的部分交给我们：靠得住的理由、要多少帮助由你定，以及我们为什么做这件事。",
      openGraphTitle: "关于 Homeground China",
    },
    navLabel: "使命与理念",
    eyebrow: "公司",
    title: "按你的方式游中国，难的部分交给我们。",
    titleLines: ["按你的方式游中国，", "难的部分交给我们。"],
    intro:
      "Homeground China 是北京的持证旅行社。我们给想按自己方式游中国的人当靠山：只差一张门票，我们帮你约；想请一位导游，可以按天订；想整趟交出来，从第一封邮件到你回国，都是同一个人管。",
    teamAction: "认识团队",
    credentialsAction: "资质与登记",
    proof: {
      label: "Homeground 的几个数字",
      since: "开始做旅游",
      people: "团队成员",
      tours: "已上线的私家团",
      languages: "网站语言",
    },
    reasons: {
      eyebrow: "为什么靠得住",
      title: "靠得住，靠这六件事",
      items: [
        { title: "一个人管到底", body: "从第一封邮件到你回国，同一位规划师跟进，中间不换人。" },
        { title: "随时找得到人", body: "人在中国期间有事，直接在微信或 WhatsApp 上找我们。" },
        { title: "自己的导游和司机", body: "导游和司机由我们直接安排，不转包给别的地接社。" },
        { title: "没有购物店，没有隐藏费用", body: "报价写清楚包含什么，行程里不安排购物点。" },
        { title: "持证旅行社", body: "盛世美达（北京）国际旅行社有限公司，许可证号 L-BJ10587，北京市文化和旅游局核发。" },
        { title: "钱付给公司，尾款到了再付", body: "30% 定金付到公司的支付宝商户账户，尾款到中国以后再付。" },
      ],
    },
    help: {
      eyebrow: "你需要多少帮助",
      title: "要多少帮助，你来定",
      tickets: {
        title: "只差一张票",
        body: "故宫、兵马俑这类要实名预约的景点，用你的护照帮你约好。",
        link: "景点代预约",
      },
      guide: {
        title: "按天请一位导游",
        body: "上海、北京、西安、张家界，持证私人导游，按天预订。",
        link: "私人英文导游",
      },
      trip: {
        title: "整趟交给我们",
        body: "路线、酒店、车、导游、门票一起安排，到了中国也有人在。",
        link: "全程规划与落地支持",
      },
    },
    why: {
      eyebrow: "我们为什么做",
      title: "有朋自远方来。",
      body: "我们相信，世界上的人多走动、多交流，彼此就少一些误会。最好的办法，是让人自己来、自己走，亲眼看见普通人生活的中国。我们做的，是让更多人敢这样走。",
      values: [
        { title: "先说实话", body: "一个地方实际怎么样、要花多少钱、哪些我们做不到，付款前讲清楚。" },
        { title: "当朋友招待", body: "按你的节奏、兴趣和同行的人来安排，就像朋友来家里玩。" },
        { title: "踏实落地", body: "Homeground 是「主场」的意思。中国是我们的主场，有事就有人在。" },
      ],
    },
    cities: {
      eyebrow: "我们在哪里",
      title: "我们的主场",
      intro: "每座城市都有我们上线的城市指南和私家团。",
    },
    timeline: {
      eyebrow: "我们的故事",
      title: "一路走来",
      items: [
        { date: "2003 年", title: "开始做旅游", body: "从这一年起，我们一直在做旅游，国内、出境、入境都在做。" },
        { date: "2025 年 1 月", title: "在北京设立持证旅行社", body: "盛世美达（北京）国际旅行社有限公司在北京市昌平区市场监督管理局登记注册。" },
        { date: "2025 年", title: "取得旅行社业务经营许可证", body: "许可证号 L-BJ10587，北京市文化和旅游局核发，经营境内旅游和入境旅游业务。" },
        { date: "2026 年", title: "homegroundchina.com 上线", body: "英文、中文、韩文三种语言的城市指南、实用指南和私家团。" },
        { date: "2026 年 10 月", title: "开始组建团队", body: "在全国各地招募旅行顾问、导游和内容运营。" },
      ],
    },
    next: {
      eyebrow: "继续了解",
      title: "看看我们是谁，查查我们的资质",
      team: { title: "认识团队", body: "为你规划行程的人，以及我们怎样判断一条行程是否可行。" },
      credentials: { title: "资质与登记", body: "公司登记信息，以及可以自行核查的官方查询平台。" },
      careers: { title: "加入我们", body: "我们正在招旅行顾问、导游和内容运营。" },
    },
  },
  ko: {
    path: "/ko/company/",
    metadata: {
      title: "Homeground China 소개: 우리의 사명과 가치",
      description:
        "Homeground China는 베이징의 허가 여행사(L-BJ10587)로, 2003년부터 여행업을 해 왔습니다. 원하는 방식으로 중국을 여행하고, 어려운 부분은 저희에게: 믿을 수 있는 이유, 필요한 도움의 범위, 그리고 이 일을 하는 이유를 소개합니다.",
      openGraphTitle: "Homeground China 소개",
    },
    navLabel: "사명과 가치",
    eyebrow: "회사",
    title: "원하는 방식으로 중국을 여행하세요. 어려운 부분은 저희에게 맡기세요.",
    intro:
      "Homeground China는 베이징의 허가 여행사입니다. 중국을 자기 방식대로 여행하고 싶은 분들의 든든한 뒷배가 되어 드립니다. 입장권 한 장만 필요하면 예약해 드리고, 가이드가 필요하면 하루 단위로 예약할 수 있으며, 여행 전체를 맡기고 싶다면 첫 이메일부터 귀국하는 날까지 한 사람이 끝까지 챙깁니다.",
    teamAction: "팀 소개",
    credentialsAction: "허가 및 등록 정보",
    proof: {
      label: "숫자로 보는 Homeground",
      since: "여행업을 시작한 해",
      people: "팀 구성원",
      tours: "공개된 프라이빗 투어",
      languages: "사이트 언어",
    },
    reasons: {
      eyebrow: "믿을 수 있는 이유",
      title: "믿고 맡길 수 있는 여섯 가지",
      items: [
        { title: "한 사람이 끝까지", body: "첫 이메일부터 귀국하는 날까지 같은 플래너가 담당하며, 중간에 사람이 바뀌지 않습니다." },
        { title: "언제든 연락이 닿습니다", body: "중국에 머무는 동안 일이 생기면 위챗이나 WhatsApp으로 바로 연락하세요." },
        { title: "직접 배정하는 가이드와 기사", body: "가이드와 기사는 저희가 직접 배정하며, 다른 현지 여행사에 넘기지 않습니다." },
        { title: "쇼핑 없음, 숨은 비용 없음", body: "견적에 포함 내역을 분명히 적고, 일정에 쇼핑 장소를 넣지 않습니다." },
        { title: "허가받은 여행사", body: "盛世美达（北京）国际旅行社有限公司, 여행사 허가번호 L-BJ10587, 베이징시 문화관광국 발급." },
        { title: "회사로 결제, 잔금은 도착 후", body: "30% 예약금은 회사 명의 알리페이 가맹점 계좌로 받고, 잔금은 중국에 도착한 뒤 결제합니다." },
      ],
    },
    help: {
      eyebrow: "필요한 도움",
      title: "얼마나 도움을 받을지는 직접 정하세요",
      tickets: {
        title: "입장권 한 장만",
        body: "고궁, 병마용처럼 실명 예약이 필요한 명소를 여권 정보로 예약해 드립니다.",
        link: "관광지 예약 대행",
      },
      guide: {
        title: "하루 단위 가이드",
        body: "상하이·베이징·시안·장가계에서 허가받은 프라이빗 가이드를 하루 단위로 예약합니다.",
        link: "프라이빗 영어 가이드",
      },
      trip: {
        title: "여행 전체를 맡기기",
        body: "동선, 호텔, 차량, 가이드, 입장권을 함께 준비하고, 중국에 도착한 뒤에도 곁에 사람이 있습니다.",
        link: "전체 여행 설계 및 현지 지원",
      },
    },
    why: {
      eyebrow: "우리가 이 일을 하는 이유",
      title: "벗이 먼 곳에서 찾아오니.",
      body: "세상 사람들이 더 많이 오가고 교류할수록 서로에 대한 오해는 줄어든다고 믿습니다. 가장 좋은 방법은 직접 와서 직접 걸으며, 평범한 사람들이 사는 중국을 눈으로 보는 것입니다. 저희가 하는 일은 더 많은 사람이 그렇게 여행할 용기를 내도록 돕는 것입니다.",
      values: [
        { title: "먼저 사실대로", body: "그곳이 실제로 어떤지, 비용이 얼마인지, 저희가 할 수 없는 것은 무엇인지 결제 전에 분명히 말씀드립니다." },
        { title: "친구처럼 맞이합니다", body: "여행의 속도와 관심사, 함께 가는 분들에 맞춰, 친구가 집에 놀러 온 것처럼 준비합니다." },
        { title: "현장에서 든든하게", body: "Homeground는 '홈그라운드'라는 뜻입니다. 중국은 저희의 홈그라운드이고, 일이 생기면 사람이 있습니다." },
      ],
    },
    cities: {
      eyebrow: "우리가 일하는 곳",
      title: "우리의 홈그라운드",
      intro: "모든 도시에 이 사이트에서 공개한 도시 가이드와 프라이빗 투어가 있습니다.",
    },
    timeline: {
      eyebrow: "지금까지의 이야기",
      title: "걸어온 길",
      items: [
        { date: "2003년", title: "여행업을 시작하다", body: "이때부터 국내, 해외, 인바운드 여행을 모두 해 왔습니다." },
        { date: "2025년 1월", title: "베이징에 허가 여행사 설립", body: "盛世美达（北京）国际旅行社有限公司가 베이징시 창핑구 시장감독관리국에 등록되었습니다." },
        { date: "2025년", title: "여행사 허가 L-BJ10587", body: "베이징시 문화관광국으로부터 국내 여행 및 인바운드 여행 업무 허가를 받았습니다." },
        { date: "2026년", title: "homegroundchina.com 오픈", body: "영어, 중국어, 한국어로 도시 가이드, 실용 가이드, 프라이빗 투어를 제공합니다." },
        { date: "2026년 10월", title: "팀을 키우는 중", body: "중국 각지에서 여행 상담원, 가이드, 콘텐츠 담당자를 모집합니다." },
      ],
    },
    next: {
      eyebrow: "더 알아보기",
      title: "저희가 누구인지 보고, 서류를 확인하세요",
      team: { title: "팀 소개", body: "여행을 설계하는 사람들과, 실현 가능한 일정을 판단하는 방법." },
      credentials: { title: "허가 및 등록 정보", body: "회사 등록 정보와 직접 확인할 수 있는 공식 조회처." },
      careers: { title: "채용 (중국어)", body: "여행 상담원, 가이드, 콘텐츠 담당자를 모집합니다." },
    },
  },
};

export function getHomegroundCompanyCopy(locale: HomegroundLocale) {
  return companyCopy[locale];
}

export function getCompanyLanguagePaths() {
  return {
    en: companyCopy.en.path,
    "zh-Hans": companyCopy.zh.path,
    ko: companyCopy.ko.path,
    "x-default": companyCopy.en.path,
  };
}
