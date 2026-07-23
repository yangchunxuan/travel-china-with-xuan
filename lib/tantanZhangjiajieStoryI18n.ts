import type { HomegroundLocale } from "./homegroundI18n";

interface StorySection {
  title: string;
  paragraphs: string[];
  bullets?: string[];
  quote?: string;
}

export interface TantanZhangjiajieStoryCopy {
  htmlLang: string;
  homePath: string;
  skipLink: string;
  breadcrumbLabel: string;
  breadcrumbHome: string;
  breadcrumbStudio: string;
  breadcrumbCurrent: string;
  eyebrow: string;
  title: string;
  dek: string;
  authorLabel: string;
  authorName: string;
  authorRole: string;
  readTime: string;
  updatedLabel: string;
  updatedDate: string;
  heroAlt: string;
  heroCaption: string;
  intro: string[];
  pullQuote: string;
  contentsLabel: string;
  contentsTitle: string;
  sections: StorySection[];
  mountainAlt: string;
  mountainCaption: string;
  restAlt: string;
  restCaption: string;
  closingTitle: string;
  closing: string[];
  closingQuote: string;
  checklistLabel: string;
  checklistTitle: string;
  checklistItems: string[];
  ctaEyebrow: string;
  ctaTitle: string;
  ctaBody: string;
  ctaAction: string;
  relatedEyebrow: string;
  relatedTitle: string;
  routeLinkLabel: string;
  routeLinkDescription: string;
  studioLinkLabel: string;
  studioLinkDescription: string;
  schemaRole: string;
  schemaAbout: string[];
}

const copies: Record<HomegroundLocale, TantanZhangjiajieStoryCopy> = {
  en: {
    htmlLang: "en",
    homePath: "/",
    skipLink: "Skip to the article",
    breadcrumbLabel: "Breadcrumb",
    breadcrumbHome: "Home",
    breadcrumbStudio: "Studio",
    breadcrumbCurrent: "Tantan’s Zhangjiajie field note",
    eyebrow: "Field note · Zhangjiajie",
    title:
      "The Glass Bridge Is Not the Glass Skywalk: 7 Things Tantan Checks Before a Zhangjiajie Trip",
    dek:
      "In a destination where similar English names can lead to very different places, clear expectations matter just as much as a beautiful route.",
    authorLabel: "On-the-ground notes by",
    authorName: "Tantan",
    authorRole: "Trip planner · Hunan local coordination",
    readTime: "8 min read",
    updatedLabel: "Published",
    updatedDate: "23 July 2026",
    heroAlt:
      "Tantan smiling while using a wooden pestle beneath a bamboo-roofed shelter.",
    heroCaption:
      "Tantan brings an unhurried, attentive approach to helping international guests make sense of a Zhangjiajie journey.",
    intro: [
      "In Zhangjiajie, the “Glass Bridge” and the “glass skywalk” may sound like two names for the same attraction. On the ground, they are two very different experiences.",
      "The Zhangjiajie Grand Canyon Glass Bridge is inside the Grand Canyon scenic area. The glass skywalks at Tianmen Mountain belong to a separate mountaintop route. Zhangjiajie National Forest Park—with Yuanjiajie, Tianzi Mountain and other well-known areas—is another part of the destination altogether.",
      "For a first-time visitor relying on English itinerary descriptions, terms such as Glass Bridge, Glass Skywalk and National Forest Park can easily blur together. A misunderstanding that looks minor on a screen can change an entire day once the traveller arrives.",
      "Tantan has spent the past few years providing English-language guest service and local trip coordination across Zhangjiajie, Fenghuang and Changsha. She has worked with English-speaking travellers from Europe, North America, Southeast Asia and beyond.",
    ],
    pullQuote:
      "Does the trip a guest thinks they have booked match what they will actually experience?",
    contentsLabel: "In this field note",
    contentsTitle: "Seven checks before the trip reaches the ground",
    sections: [
      {
        title: "Does the attraction name match the experience?",
        paragraphs: [
          "A traveller once asked Tantan to look over an itinerary they had already received. Their priority was the Zhangjiajie Grand Canyon Glass Bridge. When they saw “National Forest Park” on the itinerary, they assumed the bridge was included. It was not: the itinerary referred to Zhangjiajie National Forest Park, home to areas such as Yuanjiajie and Tianzi Mountain.",
          "Because the misunderstanding was caught before arrival, Tantan could explain the difference and help the guest reconsider how to use their available time. She sees this less as finding fault with someone else’s itinerary and more as translating the words on a page into the journey that will happen on the ground.",
        ],
      },
      {
        title: "Being there is not the same as experiencing it",
        paragraphs: [
          "Seeing an attraction listed on an itinerary only confirms that its name appears on the page. Some itineraries look impressive because they contain many places, but allow little more than a brief stop at each one.",
          "Tantan prefers to make the pace clear in advance. For most long-haul travellers, simply being able to say “I was there” is not the same as having enough time to appreciate the place.",
        ],
        bullets: [
          "How much time is actually available?",
          "Which entrance or section will the guest visit?",
          "What route will they follow?",
          "Is there enough time for the experience they care about most?",
        ],
      },
      {
        title: "A realistic day includes more than opening hours",
        paragraphs: [
          "International guests may still be adjusting to jet lag when they reach Zhangjiajie. A day can also involve hotel pick-up, transfers between scenic areas, ticket checks, queues, internal shuttles, reservations and luggage arrangements.",
          "A route that technically fits into one day on paper may feel very different in practice. That sometimes means removing an extra stop or choosing one experience over another. A shorter itinerary can be the better trip when it gives guests enough time to enjoy what they came for.",
        ],
        quote: "Travelling this far should leave time for more than a hurried look.",
      },
      {
        title: "Hotel location can matter more than the star rating",
        paragraphs: [
          "For consecutive days in Zhangjiajie National Forest Park, staying around Wulingyuan is often practical. Downtown Zhangjiajie can be more convenient for Tianmen Mountain and for guests who would like to walk out for dinner, browse shops or explore in the evening.",
          "Neither area is automatically better. Tantan has seen hotels that looked appealing in photographs but were inconvenient for the planned itinerary. She checks the exact hotel, room type, location, facilities and how well the property fits the guest’s daily plans.",
        ],
      },
      {
        title: "The main ticket may not cover every experience",
        paragraphs: [
          "Depending on the scenic area and chosen route, travellers may encounter cable cars, elevators, boat rides, zip-lines, performances or other optional activities. It can be reasonable to leave some choices open because guests have different interests, budgets, ages and mobility needs.",
          "Optional experiences are easier to enjoy when they feel like informed choices, not last-minute surprises.",
        ],
        bullets: [
          "What is already included?",
          "What is not included?",
          "Which experiences are optional upgrades?",
          "What might need to be paid for locally?",
          "How would each choice change the route or the day?",
        ],
      },
      {
        title: "Turn service labels into specific arrangements",
        paragraphs: [
          "Phrases such as “English-speaking service,” “private transfer” and “four-star hotel” sound reassuring, but each one can still mean several different things. Reliable service does not need more attractive adjectives. It needs enough detail for the guest to understand what they are arranging before making a payment.",
        ],
        bullets: [
          "Who will be the guest’s main English-speaking contact?",
          "Are the driver and English-language guest contact the same person?",
          "Is the vehicle suitable for the group and its luggage?",
          "Which hotel and room type are actually being booked?",
          "Are any shopping stops built into the itinerary?",
          "Who should the guest contact if the plan changes?",
        ],
      },
      {
        title: "Before paying, read the whole journey once more",
        paragraphs: [
          "The last review is not about adding more. It is a check that every promise on the page still describes one coherent, workable journey—and that the guest understands the important choices before paying.",
        ],
      },
    ],
    mountainAlt:
      "Tantan with guests against the forested mountain landscape of Zhangjiajie; guest faces are blurred for privacy.",
    mountainCaption:
      "In Zhangjiajie, small differences in attraction names, routes and timing can change the shape of an entire day.",
    restAlt:
      "Tantan accompanying two international guests during a local visit; guest faces are blurred for privacy.",
    restCaption:
      "Good local coordination often comes down to details: travel time, route order, luggage arrangements and what each ticket includes.",
    closingTitle: "Protect the experiences that matter most",
    closing: [
      "Tantan sometimes jokes that she “spoils her guests a little.” That does not mean agreeing to every request regardless of the circumstances. It means protecting the experiences that matter most whenever time, safety and local conditions allow—and explaining the situation honestly when an adjustment is needed.",
      "For someone visiting China for the first time, it is unrealistic to expect them to understand every local place name, ticket category and transport arrangement in advance. The most useful itinerary is not necessarily the one with the longest list of attractions. It is the one the guest can understand—and the one that reflects the trip they genuinely hope to take.",
    ],
    closingQuote:
      "The best itinerary is not the one with the longest list. It is the one the guest understands and can genuinely experience.",
    checklistLabel: "Tantan’s final pass",
    checklistTitle: "Seven things to read again before paying",
    checklistItems: [
      "Exact attraction names and priority experiences",
      "Realistic visiting time for each day",
      "Transfers between scenic areas and luggage arrangements",
      "Hotel names, room types and locations",
      "Included, optional and locally paid items",
      "Driver, English-language guest service and vehicle arrangements",
      "Insurance, group size and change terms",
    ],
    ctaEyebrow: "Bring us the trip you are considering",
    ctaTitle: "Start with the trip brief. We’ll confirm the right review path.",
    ctaBody:
      "Tell us how many days you have, which places matter most and what pace feels right. A planner first confirms fit, scope, delivery timing and price at no charge. A complete human itinerary review begins after you approve the US$69 Review My Route service and payment is confirmed.",
    ctaAction: "Start my free trip brief",
    relatedEyebrow: "Keep planning",
    relatedTitle: "Put the field note into context",
    routeLinkLabel: "Zhangjiajie in 2, 3 or 4 days",
    routeLinkDescription:
      "See what actually fits, which scenic areas belong together and when Fenghuang makes sense as the next stop.",
    studioLinkLabel: "Meet Tantan and the Homeground team",
    studioLinkDescription:
      "See how trip planners and local experience come together around one journey.",
    schemaRole: "Trip planner and Hunan local coordinator",
    schemaAbout: [
      "Zhangjiajie Grand Canyon Glass Bridge",
      "Tianmen Mountain Glass Skywalk",
      "Zhangjiajie trip planning",
    ],
  },
  zh: {
    htmlLang: "zh-CN",
    homePath: "/zh/",
    skipLink: "跳到正文",
    breadcrumbLabel: "面包屑导航",
    breadcrumbHome: "首页",
    breadcrumbStudio: "工作室",
    breadcrumbCurrent: "Tantan 的张家界现场笔记",
    eyebrow: "现场笔记 · 张家界",
    title: "玻璃桥不是玻璃栈道：Tantan 在张家界替客人核对的 7 个细节",
    dek:
      "在一个相似英文名称可能指向完全不同景点的目的地，清楚的预期与漂亮的路线同样重要。",
    authorLabel: "现场经验来自",
    authorName: "Tantan",
    authorRole: "行程规划 · 湖南在地协调",
    readTime: "阅读约 8 分钟",
    updatedLabel: "发布于",
    updatedDate: "2026 年 7 月 23 日",
    heroAlt: "Tantan 在竹棚下体验用木杵舂制食物。",
    heroCaption:
      "旅行中的 Tantan。她把这种不匆忙、愿意观察细节的方式，也带进了客人的行程。",
    intro: [
      "在张家界，“玻璃桥”和“玻璃栈道”听起来像是同一个景点的两种叫法，但到了现场，它们是两段完全不同的体验。",
      "张家界大峡谷玻璃桥位于大峡谷景区；天门山玻璃栈道属于另一条山顶线路；包含袁家界、天子山等区域的张家界国家森林公园，又是另一部分。",
      "对第一次来中国、主要依靠英文行程单判断的客人来说，Glass Bridge、Glass Skywalk 和 National Forest Park 很容易混在一起。屏幕上看似很小的误解，到了现场可能改变一整天。",
      "过去两三年里，Tantan 一直参与张家界、凤凰、长沙一带的英语客人接待与在地行程协调，服务过来自欧美、东南亚等地区的英语客群。比起只告诉客人张家界有多美，她更在意一个实际问题。",
    ],
    pullQuote: "客人以为自己预订的旅程，是否和现场真正会发生的事情一致？",
    contentsLabel: "这篇现场笔记",
    contentsTitle: "行程落地之前，要核对的 7 件事",
    sections: [
      {
        title: "景点名称必须对应具体体验",
        paragraphs: [
          "一位客人曾请 Tantan 帮忙看已经拿到的行程。客人最想去的是张家界大峡谷玻璃桥，看到行程里写有“国家森林公园”，便以为玻璃桥也包含在内。但行程指的是拥有袁家界、天子山等区域的张家界国家森林公园，并不是大峡谷。",
          "好在误解在客人抵达前被发现，Tantan 可以先解释两者的区别，再根据已有时间一起调整。她并不把这件事看成挑别人的行程毛病，更像是把纸面上的词，翻译成客人到了现场真正会经历的旅程。",
        ],
      },
      {
        title: "“去过”不等于真正游览过",
        paragraphs: [
          "景点名字出现在行程单里，只能说明这一行字被写进去了。有些行程看起来景点很多，真正留给每个地方的却只是匆匆停留。",
          "Tantan 更愿意提前把节奏说清楚。对长途来到中国的客人而言，“我到过这里”和“我有时间感受这里”不是同一件事。",
        ],
        bullets: [
          "现场究竟有多少可用时间？",
          "从哪个入口进入、会到哪个区域？",
          "实际游览顺序是什么？",
          "最在意的体验是否真的有时间完成？",
        ],
      },
      {
        title: "行程不能只计算景区开放时间",
        paragraphs: [
          "国际客人抵达张家界时，可能还在适应时差。一天里还有酒店接送、景区间移动、验票排队、景区交通、预约时段和行李安排。",
          "纸面上勉强塞进一天的路线，现场体感可能完全不同。有时少放一个景点、在两个体验中做取舍，反而会让真正想看的地方有足够时间。",
        ],
        quote: "远赴千里，不应该只换来匆匆一瞥。",
      },
      {
        title: "酒店位置有时比星级更重要",
        paragraphs: [
          "连续游览张家界国家森林公园时，住在武陵源通常更方便；准备去天门山，或希望晚上能出门吃饭、散步、逛一逛，张家界市区可能更合适。",
          "没有一个区域永远更好，关键是它是否匹配路线和客人的生活方式。Tantan 见过照片很好看、实际却离当天动线很远的酒店，所以她会继续核对准确酒店、房型、位置、设施，以及它与每天安排是否真正合拍。",
        ],
      },
      {
        title: "基础门票不一定涵盖所有体验",
        paragraphs: [
          "根据景区和具体路线，客人可能遇到索道、电梯、游船、滑索、演出等可选体验。把一部分选择留到客人了解后再决定，本身并没有问题，因为兴趣、预算、年龄和行动条件都不同。",
          "重要的是，选择应该来自提前了解，而不是到了现场才发现还有一笔意料之外的费用。",
        ],
        bullets: [
          "现在的价格已经包含什么？",
          "哪些项目不包含？",
          "哪些是可以自由选择的升级？",
          "哪些可能需要现场付款？",
          "每个选择会怎样改变路线和时间？",
        ],
      },
      {
        title: "服务名称需要变成具体承诺",
        paragraphs: [
          "“英语服务”“私人用车”“四星酒店”听起来很清楚，实际仍可能有多种含义。可靠的服务不需要更多漂亮形容词，而是需要足够具体，让客人在付款前知道自己买到什么。",
        ],
        bullets: [
          "谁是旅途中主要的英语沟通人？",
          "司机与英语服务人员是否为同一人？",
          "车辆能否容纳同行人数和行李？",
          "具体预订哪家酒店、什么房型？",
          "行程是否含购物停留？",
          "安排变化时，客人应该联系谁？",
        ],
      },
      {
        title: "付款前，把整段旅程重新读一遍",
        paragraphs: [
          "最后一次复核不是为了继续加东西，而是确认行程上的每一项承诺，仍然属于同一段连贯、可执行的旅行；客人在付款前，也真正理解了所有重要选择。",
        ],
      },
    ],
    mountainAlt:
      "Tantan 与同行客人在张家界山景前合影，客人面部已做隐私模糊处理。",
    mountainCaption:
      "在张家界，景点名称、路线与时间上的细小差异，可能改变一整天的体验。",
    restAlt:
      "Tantan 在当地行程中陪同两位国际客人，客人面部已做隐私模糊处理。",
    restCaption:
      "真正的在地协调，往往落在交通时间、游览顺序、行李和门票包含项这些细节上。",
    closingTitle: "把客人真正在意的体验留在行程里",
    closing: [
      "Tantan 有时会笑着说，自己“比较宠客人”。这并不是不顾现场条件答应所有要求，而是在时间、安全和在地情况允许时，尽量保护客人最期待的体验；需要调整时，也把原因与选择说清楚。",
      "第一次来中国的客人，不可能提前弄懂每一个本地地名、门票类型和交通安排。最有用的行程不一定拥有最长的景点清单，而是客人看得懂、到了现场也确实能够经历的那一份。",
    ],
    closingQuote:
      "最好的行程不是景点最多，而是客人看得懂，也真的能够经历。",
    checklistLabel: "Tantan 的最后一遍复核",
    checklistTitle: "付款前，再读一次这 7 项",
    checklistItems: [
      "准确景点名称与最优先的体验",
      "每天真正可用的游览时间",
      "景区间交通与行李安排",
      "酒店名称、房型与位置",
      "已包含、可选与现场付款项目",
      "司机、英语服务人员与车辆安排",
      "保险、团队规模与变更条件",
    ],
    ctaEyebrow: "把你正在考虑的行程带来",
    ctaTitle: "先提交旅行简报，再确认适合怎样审核。",
    ctaBody:
      "告诉我们旅行天数、最想去的地方和喜欢的节奏。规划师会先免费确认是否适合、服务范围、交付时间和价格；完整的人工路线审核会在你确认 69 美元「审核我的路线」服务并完成付款后开始。",
    ctaAction: "免费提交旅行简报",
    relatedEyebrow: "继续规划",
    relatedTitle: "把现场经验放回整段路线",
    routeLinkLabel: "张家界 2、3、4 天分别能安排什么",
    routeLinkDescription:
      "查看哪些景区适合放在一起、时间到底够不够，以及什么时候适合把凤凰作为下一站。",
    studioLinkLabel: "认识 Tantan 和 Homeground 团队",
    studioLinkDescription: "看看行程规划与真实在地经验，如何围绕同一段旅程协作。",
    schemaRole: "行程规划师与湖南在地协调成员",
    schemaAbout: ["张家界大峡谷玻璃桥", "天门山玻璃栈道", "张家界行程规划"],
  },
  ko: {
    htmlLang: "ko",
    homePath: "/ko/",
    skipLink: "본문으로 이동",
    breadcrumbLabel: "현재 위치",
    breadcrumbHome: "홈",
    breadcrumbStudio: "스튜디오",
    breadcrumbCurrent: "탄탄의 장가계 현장 노트",
    eyebrow: "현장 노트 · 장가계",
    title: "유리다리와 유리잔도는 다릅니다: 탄탄이 장가계 여행 전 확인하는 7가지",
    dek:
      "비슷한 영어 이름이 서로 다른 장소를 가리키는 여행지에서는, 아름다운 동선만큼 정확한 기대도 중요합니다.",
    authorLabel: "현장 경험",
    authorName: "Tantan",
    authorRole: "여행 플래너 · 후난 현지 일정 조율",
    readTime: "약 8분",
    updatedLabel: "게시일",
    updatedDate: "2026년 7월 23일",
    heroAlt: "대나무 지붕 아래에서 긴 나무 공이로 절구 체험을 하는 탄탄.",
    heroCaption:
      "여행지에서 현지 체험을 즐기는 탄탄. 서두르지 않고 디테일을 살피는 태도를 여행 일정에도 담습니다.",
    intro: [
      "장가계에서 ‘유리다리’와 ‘유리잔도’는 이름만 들으면 비슷해 보이지만, 서로 다른 장소에서 만나는 별개의 여행 코스입니다.",
      "장가계 대협곡 유리다리는 대협곡 관광지에 있습니다. 반면 천문산 유리잔도는 천문산 코스 안에 있습니다. 원가계와 천자산 등이 있는 장가계 국가삼림공원은 또 다른 관광지입니다.",
      "중국을 처음 찾는 여행자가 영문 일정표에서 Glass Bridge, Glass Skywalk, National Forest Park 같은 표현만 본다면 모두 한 관광지 안에 있다고 생각하기 쉽습니다. 화면에서 작아 보인 오해가 현장에서는 하루 전체를 바꿀 수도 있습니다.",
      "탄탄은 지난 2~3년 동안 장가계와 봉황고성, 창사 등 후난성 여러 지역에서 영어로 여행객을 응대하고 현지 일정을 조율해 왔습니다. 그가 아름다운 풍경을 소개하는 일만큼 중요하게 여기는 질문이 있습니다.",
    ],
    pullQuote:
      "여행자가 예약했다고 생각한 일정과 현장에서 실제로 경험할 일정이 같은지, 그걸 먼저 확인해요.",
    contentsLabel: "이 현장 노트에서",
    contentsTitle: "여행이 현장에 닿기 전 확인하는 7가지",
    sections: [
      {
        title: "관광지 이름이 원하는 경험과 정확히 연결되는지",
        paragraphs: [
          "탄탄은 한 여행자가 미리 준비한 일정을 함께 살펴본 적이 있습니다. 그 여행자가 가장 기대한 곳은 대협곡 유리다리였습니다. 일정표에 ‘국가삼림공원’이 적혀 있어 유리다리도 포함된 것으로 이해했지만, 실제로는 원가계와 천자산 등을 둘러보는 장가계 국가삼림공원을 뜻했습니다.",
          "현지 도착 전에 차이를 확인했기 때문에, 탄탄은 두 관광지의 위치와 경험을 설명하고 확보된 시간에 맞춰 동선을 다시 조율할 수 있었습니다. 그에게 이 과정은 종이 위의 이름을 현장에서 실제로 만날 경험으로 풀어 주는 일에 가깝습니다.",
        ],
      },
      {
        title: "일정표에 있다는 것과 제대로 둘러보는 것은 다릅니다",
        paragraphs: [
          "일정에 관광지 이름이 한 줄 들어갔다고 해서 그곳을 충분히 둘러볼 수 있다고 단정하기는 어렵습니다. 방문지가 많아 보여도 각 장소에서 쓸 수 있는 시간이 지나치게 짧을 수 있습니다.",
          "탄탄은 방문지 개수보다 여행자가 기대한 경험을 여유 있게 할 수 있는지를 더 중요하게 봅니다.",
        ],
        bullets: [
          "실제로 머물 수 있는 시간은 얼마나 되는지",
          "관광지 안에서 어느 구역까지 들어가는지",
          "어떤 순서와 동선으로 둘러보는지",
          "가장 기대한 체험을 실제로 할 수 있는지",
        ],
      },
      {
        title: "관광지 운영 시간만으로 하루를 계산하지 않습니다",
        paragraphs: [
          "해외에서 중국에 도착한 여행자는 시차에 적응할 시간이 필요할 수 있습니다. 관광지 사이 이동, 대기, 예약과 입장 절차, 내부 교통, 짐 보관과 이동도 함께 고려해야 합니다.",
          "종이 위에서는 하루 안에 가능해 보여도 현장에서는 체력 부담이 클 수 있습니다. 때로는 한 곳을 덜 넣는 편이 가장 기대한 장소를 제대로 경험하는 더 좋은 여행이 됩니다.",
        ],
        quote: "멀리까지 온 여행인데, 잠깐 보고 서둘러 나오는 일정으로 끝나면 아쉽잖아요.",
      },
      {
        title: "호텔은 별점보다 위치가 더 중요할 때가 있습니다",
        paragraphs: [
          "무릉원은 장가계 국가삼림공원을 여러 날 둘러보기에 편리한 편입니다. 장가계 시내는 천문산으로 이동하기 좋고, 저녁에 산책하거나 식사와 쇼핑을 즐기고 싶은 여행자에게 더 잘 맞을 수 있습니다.",
          "어느 지역이 무조건 더 좋은 것은 아닙니다. 탄탄은 정확한 호텔명과 객실 유형, 실제 위치, 시설, 저녁 이동의 편의성까지 일정과 함께 확인합니다.",
        ],
      },
      {
        title: "기본 입장권이 모든 체험을 포함하는 것은 아닙니다",
        paragraphs: [
          "관광지 안에는 케이블카, 엘리베이터, 유람선, 짚라인, 공연처럼 별도로 선택할 수 있는 체험이 있을 수 있습니다. 관심사와 예산, 연령, 몸 상태에 따라 선택이 달라지므로 처음부터 모두 포함하는 것이 꼭 적합한 것은 아닙니다.",
          "중요한 것은 현장에서 처음 듣는 추가 비용이 아니라, 미리 이해한 뒤 스스로 선택할 수 있는 항목이 되는 것입니다.",
        ],
        bullets: [
          "기본 일정과 가격에 무엇이 포함되는지",
          "포함되지 않은 항목은 무엇인지",
          "자유롭게 선택할 추가 체험은 무엇인지",
          "현장에서 별도로 결제할 가능성이 있는지",
          "각 선택이 동선과 시간에 어떤 영향을 주는지",
        ],
      },
      {
        title: "서비스 이름은 구체적인 내용으로 확인합니다",
        paragraphs: [
          "‘영어 응대’, ‘전용 차량’, ‘4성급 호텔’은 명확해 보이지만 실제 범위를 이해하려면 더 구체적인 확인이 필요합니다. 신뢰는 화려한 표현보다, 결제 전에 자신이 받게 될 서비스를 이해할 수 있을 때 생깁니다.",
        ],
        bullets: [
          "여행 중 주로 소통할 담당자는 누구인지",
          "기사와 영어 응대 담당자가 같은 사람인지",
          "차량이 인원수와 짐의 양에 적합한지",
          "정확히 어느 호텔의 어떤 객실인지",
          "쇼핑 일정이 포함되어 있는지",
          "일정이 바뀔 때 누구에게 연락하면 되는지",
        ],
      },
      {
        title: "결제 전에 전체 일정을 처음부터 다시 읽습니다",
        paragraphs: [
          "마지막 확인은 더 많은 장소를 넣기 위한 단계가 아닙니다. 일정표의 약속이 하나의 자연스럽고 실행 가능한 여정을 설명하는지, 여행자가 중요한 선택을 이해했는지 다시 보는 과정입니다.",
        ],
      },
    ],
    mountainAlt:
      "장가계의 산악 풍경을 배경으로 서 있는 탄탄과 여행객들. 여행객 얼굴은 개인정보 보호를 위해 흐림 처리했다.",
    mountainCaption:
      "장가계에서는 관광지 이름과 동선, 시간의 작은 차이가 하루 전체의 경험을 바꿀 수 있습니다.",
    restAlt:
      "현지 일정 중 두 명의 여행객과 함께한 탄탄. 여행객 얼굴은 개인정보 보호를 위해 흐림 처리했다.",
    restCaption:
      "좋은 현지 조율은 이동 시간, 방문 순서, 짐과 입장권 포함 항목 같은 디테일에서 드러납니다.",
    closingTitle: "가장 기대한 경험을 일정에 남겨 두는 일",
    closing: [
      "탄탄은 자신이 ‘여행자를 조금 많이 챙기는 편’이라고 웃으며 말합니다. 현장 조건과 관계없이 모든 요청을 받아들인다는 뜻은 아닙니다. 안전과 시간, 현지 상황이 허락하는 범위에서 가장 기대한 경험을 지키고, 조정이 필요할 때 이유와 선택지를 솔직히 설명한다는 뜻입니다.",
      "중국을 처음 찾는 사람에게 모든 관광지 이름과 현지 운영 방식을 미리 이해하라고 하기는 어렵습니다. 가장 유용한 일정은 항목이 가장 많은 일정이 아니라, 여행자가 이해할 수 있고 현장에서 실제로 경험할 수 있는 일정입니다.",
    ],
    closingQuote:
      "좋은 일정은 장소가 가장 많은 일정이 아니라, 여행자가 이해하고 실제로 경험할 수 있는 일정입니다.",
    checklistLabel: "탄탄의 마지막 확인",
    checklistTitle: "결제 전 다시 읽어 볼 7가지",
    checklistItems: [
      "정확한 관광지 이름과 핵심 체험",
      "하루에 실제로 사용할 수 있는 관광 시간",
      "관광지 사이 이동과 짐 처리 방식",
      "호텔명, 객실 유형과 위치",
      "포함 항목, 선택 항목과 현장 결제 항목",
      "기사, 영어 응대 담당자와 차량 배정",
      "보험, 일행 규모와 일정 변경 조건",
    ],
    ctaEyebrow: "검토 중인 일정을 보여 주세요",
    ctaTitle: "여행 브리프부터 보내고, 맞는 검토 경로를 확인하세요.",
    ctaBody:
      "여행 기간과 가장 가고 싶은 장소, 편안한 속도를 알려 주세요. 플래너가 적합성, 범위, 납기와 가격을 먼저 무료로 확인합니다. 전체 사람 검토는 US$69 ‘내 일정 검토’ 서비스를 확인하고 결제가 완료된 뒤 시작됩니다.",
    ctaAction: "무료 여행 브리프 시작하기",
    relatedEyebrow: "계속 계획하기",
    relatedTitle: "현장 노트를 전체 여정에 연결해 보세요",
    routeLinkLabel: "장가계 2·3·4일에 실제로 가능한 일정",
    routeLinkDescription:
      "어떤 관광지를 함께 묶을지, 시간이 충분한지, 봉황고성을 다음 목적지로 넣을 조건을 확인하세요.",
    studioLinkLabel: "탄탄과 Homeground 팀 소개",
    studioLinkDescription:
      "여행 설계와 실제 현지 경험이 하나의 여정을 중심으로 어떻게 연결되는지 만나 보세요.",
    schemaRole: "여행 플래너 및 후난 현지 일정 조율 담당",
    schemaAbout: ["장가계 대협곡 유리다리", "천문산 유리잔도", "장가계 여행 계획"],
  },
};

export function getTantanZhangjiajieStoryCopy(
  locale: HomegroundLocale = "en",
) {
  return copies[locale];
}
