import type { HomegroundLocale } from "./homegroundI18n";

export interface KevinPreparationStoryImageCopy {
  alt: string;
  caption: string;
}

export interface KevinPreparationStoryCaseCopy {
  eyebrow: string;
  title: string;
  paragraphs: string[];
}

export interface KevinPreparationStorySectionCopy {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
  quote?: string;
  caseStudy?: KevinPreparationStoryCaseCopy;
}

export interface KevinPreparationStoryCheckCopy {
  number: string;
  title: string;
  body: string;
}

export interface KevinPreparationStoryCopy {
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
  hero: KevinPreparationStoryImageCopy;
  intro: string[];
  pullQuote: string;
  contentsLabel: string;
  contentsTitle: string;
  contents: Array<{
    id:
      | "quick-answer"
      | "before-pickup"
      | "fit-the-traveller"
      | "backup-route"
      | "handoff"
      | "five-checks";
    label: string;
  }>;
  quickAnswer: {
    label: string;
    title: string;
    paragraphs: string[];
  };
  beforePickup: KevinPreparationStorySectionCopy;
  fitTraveller: KevinPreparationStorySectionCopy;
  backupRoute: KevinPreparationStorySectionCopy;
  handoff: KevinPreparationStorySectionCopy;
  fiveChecks: {
    label: string;
    title: string;
    items: KevinPreparationStoryCheckCopy[];
  };
  closing: {
    title: string;
    paragraphs: string[];
  };
  editorialNoteLabel: string;
  editorialNote: string;
  caseMethodLabel: string;
  images: {
    portrait: KevinPreparationStoryImageCopy;
    action: KevinPreparationStoryImageCopy;
    rain: KevinPreparationStoryImageCopy;
  };
  ctaEyebrow: string;
  ctaTitle: string;
  ctaBody: string;
  ctaAction: string;
  relatedEyebrow: string;
  relatedTitle: string;
  studioLinkLabel: string;
  studioLinkDescription: string;
  fieldNoteLinkLabel: string;
  fieldNoteLinkDescription: string;
  schemaRole: string;
  schemaAbout: string[];
}

const copies: Record<HomegroundLocale, KevinPreparationStoryCopy> = {
  en: {
    htmlLang: "en",
    homePath: "/",
    skipLink: "Skip to the article",
    breadcrumbLabel: "Breadcrumb",
    breadcrumbHome: "Home",
    breadcrumbStudio: "Studio",
    breadcrumbCurrent: "Kevin’s pre-departure field note",
    eyebrow: "Behind the day · Meet Kevin",
    title: "Before the hotel pickup, Kevin has already started the day.",
    dek:
      "A smooth guided day is rarely improvised. Reservations, pickup points, traveller needs and backup routes are usually checked before anyone steps out of the hotel.",
    authorLabel: "The planning behind the day",
    authorName: "Kevin",
    authorRole: "Trip planner · Operations coordinator",
    readTime: "6 min read",
    updatedLabel: "Published",
    updatedDate: "23 July 2026",
    hero: {
      alt: "Kevin standing by the sea at sunset in a white shirt.",
      caption:
        "Kevin. For him, a relaxed day on the ground is built on details settled beforehand.",
    },
    intro: [
      "At the hotel lobby, a guest sees Kevin arrive and the day begin. What they do not see is the work already completed: the booking time checked, the correct entrance confirmed, the driver briefed, the guest’s needs reviewed and an alternative considered in case conditions change.",
      "Kevin studied English and began working in local guiding and trip operations while at university. Over roughly four years of practical work, he has learned that the visible part of guiding is only one part of the job.",
    ],
    pullQuote:
      "A prepared guide solves problems before they happen, instead of dealing with trouble on site.",
    contentsLabel: "Behind this guided day",
    contentsTitle: "What happens before the guest reaches the lobby",
    contents: [
      { id: "quick-answer", label: "Before the lobby" },
      { id: "before-pickup", label: "Close the gaps" },
      { id: "fit-the-traveller", label: "Fit the traveller" },
      { id: "backup-route", label: "Prepare the alternative" },
      { id: "handoff", label: "Carry the context" },
      { id: "five-checks", label: "Kevin’s five checks" },
    ],
    quickAnswer: {
      label: "Quick answer",
      title: "What has already happened before pickup?",
      paragraphs: [
        "Kevin has checked whether the reservations, opening conditions and transport still fit together. He has reviewed the traveller’s pace, dietary needs and anything that may affect walking or rest. Pickup details have been confirmed in writing, and the driver knows where and when the day begins.",
        "The guest does not need to see every check. They need the result: a day that starts with fewer unanswered questions.",
      ],
    },
    beforePickup: {
      eyebrow: "Before pickup",
      title: "The day starts after four questions are closed",
      paragraphs: [
        "Before departure, Kevin checks four parts of the day against one another:",
        "None of these details is difficult on its own. The problem appears when one detail no longer fits the others. A reservation may still be valid but clash with the transfer time. A pickup point may be correct for one entrance but inconvenient for the route being used that day.",
        "Kevin confirms important arrangements in writing the day before, then checks the pickup again on the morning of departure. This gives the traveller, driver and guide one shared version of the plan.",
      ],
      bullets: [
        "Ticket and reservation times",
        "Current opening conditions",
        "Transport and transfer schedules",
        "The exact pickup time, location and contact details",
      ],
      caseStudy: {
        eyebrow: "Before it became a problem",
        title: "A reservation conflict caught before departure",
        paragraphs: [
          "On one trip, Kevin noticed that a scenic-area reservation period no longer fitted the rest of the day’s movement. He found the conflict before departure.",
          "Instead of waiting until the group reached the entrance, he adjusted the reservation and reordered the practical parts of the day in advance. The travellers began with the revised arrangement and did not have to solve the booking conflict themselves.",
          "The most valuable part of the work was not a dramatic rescue. It was that the problem never became part of the guest’s day.",
        ],
      },
    },
    fitTraveller: {
      eyebrow: "Fit the traveller",
      title: "The same attraction list can create two very different days",
      paragraphs: [
        "A workable route is not determined by opening hours alone. Before meeting a group, Kevin also looks for details that change how the day should be paced:",
        "These are not decorative personal preferences added after the route is finished. They can affect departure time, restaurant choice, walking distance, rest stops and which part of an attraction deserves the most time.",
        "For guests who tire easily, Kevin may identify shorter walking sections and suitable places to pause. He also carries basic first-aid supplies, while treating any medical or mobility information as a reason to plan more carefully—not as a substitute for professional medical support.",
      ],
      bullets: [
        "Dietary restrictions and allergies",
        "Difficulty walking or using stairs",
        "Preferred travel pace",
        "Usual rest and bedtime habits",
        "Interests and activities the guest may not enjoy",
        "Religious customs or other practical requirements",
      ],
      quote:
        "A route can be technically possible and still be wrong for the people taking it.",
    },
    backupRoute: {
      eyebrow: "Prepare the alternative",
      title:
        "An alternative is part of the plan, not evidence that the first plan failed",
      paragraphs: [
        "Weather, traffic, queues and temporary operating conditions can change a day even when every booking was correct.",
        "Kevin usually prepares one or two realistic alternatives before departure. They are not extra attractions waiting to be added to an already full schedule. They are options that can preserve the day’s purpose if the original route stops being practical.",
        "A useful alternative must answer three questions:",
      ],
      bullets: [
        "Can it genuinely fit the remaining time?",
        "Is it suitable for this group’s energy and interests?",
        "Does changing the route create a new transport or booking problem?",
      ],
      caseStudy: {
        eyebrow: "Before it became a delay",
        title: "When road construction changed the route",
        paragraphs: [
          "Before another day began, Kevin learned that road construction was blocking the intended approach.",
          "He checked an alternative with the driver before pickup and adjusted the road plan. By the time the travellers began their day, the change had already been handled. They travelled on the revised route without having to negotiate the disruption themselves.",
          "Good preparation does not mean conditions never change. It means the traveller is not left alone to connect the pieces when they do.",
        ],
      },
    },
    handoff: {
      eyebrow: "Carry the context",
      title: "The traveller should not have to explain everything again",
      paragraphs: [
        "A multi-day or multi-city journey may involve several people, but the traveller’s important information should not disappear between them.",
        "Before a handoff, Kevin passes on only the details needed for the next part of the trip:",
        "After a day on the ground, he also notes what the original itinerary could not have predicted: the guest’s current energy level, a revised schedule or a newly mentioned need.",
        "The purpose is not to produce a long internal report. It is to prevent the next person from working with an outdated version of the traveller or the trip.",
      ],
      bullets: [
        "Confirmed bookings and relevant ticket rules",
        "Pickup and contact details",
        "Dietary, mobility or other practical needs",
        "Agreed changes to the schedule",
        "Known conditions that may affect the next day",
      ],
      quote:
        "Guests should feel that the journey remembers them, even when the person meeting them changes.",
    },
    fiveChecks: {
      label: "Kevin’s pre-departure pass",
      title: "Five checks before the day begins",
      items: [
        {
          number: "01",
          title: "Ticket and booking confirmation",
          body:
            "Are the reservations valid, correctly timed and connected to the intended entrance or experience?",
        },
        {
          number: "02",
          title: "Traveller health and dietary notes",
          body:
            "Is there anything relevant to walking, rest, food, allergies or religious practice that changes the day?",
        },
        {
          number: "03",
          title: "Driver and pickup details",
          body:
            "Do the guest, driver and guide share the same time, place and contact information?",
        },
        {
          number: "04",
          title: "Weather and backup plan",
          body:
            "What condition could disrupt the route, and which alternative would still suit this group?",
        },
        {
          number: "05",
          title: "Emergency contacts",
          body:
            "Does the working team have the necessary contact information if the day changes unexpectedly?",
        },
      ],
    },
    closing: {
      title: "The best-prepared work often looks uneventful",
      paragraphs: [
        "Travellers do not need every operational check narrated to them. They should know the important choices, understand any change that affects their experience and have someone who can explain what happens next.",
        "But many of the best outcomes are quiet: a reservation adjusted before departure, an entrance checked before the vehicle arrives, a shorter walking route ready before a guest becomes exhausted, or a road change handled before it causes a delay.",
        "That is the work Kevin values most—not making a problem look impressive after it happens, but reducing the chance that it becomes the traveller’s problem at all.",
      ],
    },
    editorialNoteLabel: "Editorial note",
    editorialNote:
      "The situations in this article have been anonymised and narratively reconstructed from Kevin’s interview. Locations, exact times and identifying details have been omitted. Live ticket rules, operating conditions and transport arrangements are checked again for each trip.",
    caseMethodLabel:
      "An anonymised case reconstructed from the interview.",
    images: {
      portrait: {
        alt:
          "Kevin smiling with his eyes closed while holding a drink in warm evening light by the coast.",
        caption:
          "Understanding a traveller’s preferred pace can turn the same attraction list into a very different day.",
      },
      action: {
        alt:
          "Kevin speaking with guests at a mountain scenic area; guest faces are blurred for privacy.",
        caption:
          "On-site communication works best when reservations, entrances and pickup details have already been confirmed.",
      },
      rain: {
        alt:
          "Kevin taking a rainy-day photo with a guest in a yellow rain poncho; the guest’s face is blurred for privacy.",
        caption:
          "Weather is one of the conditions that can change a route. The useful alternative is prepared before the day begins.",
      },
    },
    ctaEyebrow: "Let us prepare the day behind the itinerary",
    ctaTitle: "Tell us what your trip needs before the first pickup.",
    ctaBody:
      "Share your route, travel dates, preferred pace and anything that may affect food, walking or rest. Homeground will turn those details into a clear trip brief that the planning and local delivery teams can work from.",
    ctaAction: "Send my trip brief",
    relatedEyebrow: "Keep planning",
    relatedTitle: "See how preparation continues across the journey",
    studioLinkLabel: "Meet Kevin and the Homeground team",
    studioLinkDescription:
      "See how trip planning, guest communication and local operations work around one shared journey.",
    fieldNoteLinkLabel: "Tantan’s Zhangjiajie field note",
    fieldNoteLinkDescription:
      "See the attraction names, timing, hotel details and inclusions Tantan checks before a Zhangjiajie itinerary reaches the ground.",
    schemaRole: "Trip planner and operations coordinator",
    schemaAbout: [
      "Guided day preparation in China",
      "Guest preference and mobility planning",
      "Travel operations handoff",
      "Backup route planning",
    ],
  },
  zh: {
    htmlLang: "zh-CN",
    homePath: "/zh/",
    skipLink: "跳到正文",
    breadcrumbLabel: "面包屑导航",
    breadcrumbHome: "首页",
    breadcrumbStudio: "工作室",
    breadcrumbCurrent: "Kevin 的出发前现场笔记",
    eyebrow: "一天开始之前 · 认识 Kevin",
    title: "客人看到的是一天行程，Kevin 的准备从见面前就开始了。",
    dek:
      "顺利的一天很少靠临场发挥。预订、接送点、客人情况和备用路线，往往在客人走出酒店之前就已经核对过。",
    authorLabel: "一天背后的准备",
    authorName: "Kevin",
    authorRole: "行程规划师 · 执行统筹",
    readTime: "阅读约 6 分钟",
    updatedLabel: "发布于",
    updatedDate: "2026 年 7 月 23 日",
    hero: {
      alt: "Kevin 穿着白衬衫，在日落时的海边张开双臂。",
      caption:
        "Kevin。对他来说，现场的从容来自出发前已经处理好的细节。",
    },
    intro: [
      "客人在酒店大堂看到 Kevin 出现，觉得这一天从这里开始。但在见面之前，已经有不少事情完成了：预订时间核对过、正确入口确认过、司机收到接送信息、客人的需求重新看过，现场情况变化时可以使用的备选也已经想好。",
      "Kevin 是英语专业出身，从大学时期便开始参与地接、导游和行程执行工作，至今积累了约四年的实际经验。他慢慢发现，客人能够看到的讲解和陪同，只是这份工作的一部分。",
    ],
    pullQuote:
      "准备充分的导游，会在问题发生前解决它，而不是到了现场再处理麻烦。",
    contentsLabel: "这一天的背后",
    contentsTitle: "客人抵达酒店大堂之前，哪些事情已经开始",
    contents: [
      { id: "quick-answer", label: "见面之前" },
      { id: "before-pickup", label: "先把缺口关掉" },
      { id: "fit-the-traveller", label: "让路线适合客人" },
      { id: "backup-route", label: "提前准备备选" },
      { id: "handoff", label: "让信息继续往下走" },
      { id: "five-checks", label: "Kevin 的五项检查" },
    ],
    quickAnswer: {
      label: "先说结论",
      title: "见到客人之前，哪些事情已经发生了？",
      paragraphs: [
        "Kevin 已经确认预订、营业情况与交通安排能否彼此衔接；重新看过客人的节奏、饮食，以及可能影响步行和休息的情况；接送信息已经通过文字确认，司机也知道准确的时间与位置。",
        "客人不需要看到每一次检查。他们真正需要的，是一天开始时少一些没有答案的问题。",
      ],
    },
    beforePickup: {
      eyebrow: "见面之前",
      title: "一天从四个问题得到确认之后开始",
      paragraphs: [
        "出发前，Kevin 会把四类信息放在一起核对：",
        "每一项单独看都不复杂，真正的风险出现在它们互相对不上时。预约本身可能有效，却与当天的交通时间冲突；接送点可能没有写错，却不适合当天实际使用的入口。",
        "Kevin 会在前一天通过文字把重要细节确认下来，并在出发当天早上再次核对接送信息，让客人、司机与导游使用同一个版本的安排。",
      ],
      bullets: [
        "门票和预约时间",
        "景区当天的开放情况",
        "交通与换乘安排",
        "准确的接送时间、位置和联系方式",
      ],
      caseStudy: {
        eyebrow: "在问题发生之前",
        title: "在出发前发现的预约冲突",
        paragraphs: [
          "有一次，Kevin 发现某个景区的预约时段已经无法与当天后续移动顺利衔接。这个问题是在出发之前发现的。",
          "他没有等客人抵达入口后再解释，而是提前重新调整预约，并把当天需要配合的顺序一起理顺。客人直接按照更新后的安排开始行程，不需要亲自处理预约冲突。",
          "这件事最有价值的地方，不是一次多么戏剧化的“救场”，而是问题最终没有进入客人的旅行。",
        ],
      },
    },
    fitTraveller: {
      eyebrow: "适合客人的路线",
      title: "同一张景点清单，可能是完全不同的两天",
      paragraphs: [
        "一条路线是否合适，不能只看景区几点开门。见到客人之前，Kevin 还会留意一些会真正改变当天节奏的信息：",
        "这些并不是路线做完之后再加上去的“个性化装饰”。它们会直接影响出发时间、餐厅选择、步行距离、休息点，以及应该把更多时间留给哪一段体验。",
        "如果客人不适合走太久，Kevin 会提前寻找更短的步行方式和可以停下来休息的位置。他也会准备基础急救用品，但不会把这些准备当成医疗支持的替代。",
      ],
      bullets: [
        "饮食限制和过敏情况",
        "是否不适合长时间步行或上下台阶",
        "喜欢紧凑还是从容的旅行节奏",
        "是否习惯较早休息",
        "兴趣爱好，以及明确不喜欢的活动",
        "宗教习惯或其他需要提前准备的事项",
      ],
      quote:
        "一条路线可以在时间上勉强成立，却仍然不适合真正要走这条路线的人。",
    },
    backupRoute: {
      eyebrow: "准备备选",
      title: "备选不是原计划失败，而是原计划的一部分",
      paragraphs: [
        "天气、交通、排队和临时运营情况，都可能让一份预订完全正确的路线发生变化。",
        "Kevin 通常会在出发前准备一到两个现实可行的备选。它们不是等待塞进满档行程里的“额外景点”，而是在原路线不再合适时，帮助这一天保留核心体验的选择。",
        "一个真正能用的备选，需要回答三个问题：",
      ],
      bullets: [
        "剩余时间是否真的放得下？",
        "是否适合这组客人的体力和兴趣？",
        "调整后会不会产生新的交通或预约冲突？",
      ],
      caseStudy: {
        eyebrow: "在延误发生之前",
        title: "道路施工改变了原来的走法",
        paragraphs: [
          "另一次行程开始前，Kevin 得知原本准备经过的道路正在施工，原来的走法无法正常使用。",
          "他在接到客人之前便与司机确认了替代路线，并重新安排车辆行驶方式。客人开始当天行程时，这个变化已经处理完毕，不需要自己在现场协调道路问题。",
          "准备充分并不意味着现场永远不会变化，而是变化发生时，不把连接所有环节的工作留给客人。",
        ],
      },
    },
    handoff: {
      eyebrow: "信息交接",
      title: "客人不应该每换一个人，就重新解释一次自己",
      paragraphs: [
        "多日、多城市旅行可能会涉及不同成员，但与客人有关的重要信息不能在交接时消失。",
        "进入下一段行程前，Kevin 会把真正需要的信息继续传下去：",
        "完成一天后，他也会补充纸面计划无法提前知道的变化，例如客人当下的体力、已经修改的安排，以及旅途中刚刚提出的新需求。",
        "交接的目的不是写一份很长的内部报告，而是避免下一位成员拿着一个已经过期的“客人版本”继续工作。",
      ],
      bullets: [
        "已确认的预约和相关门票规则",
        "接送位置与联系方式",
        "饮食、行动或其他实际需求",
        "已经同意的行程调整",
        "可能影响下一天的已知情况",
      ],
      quote:
        "即使见到的成员发生变化，客人也应该感觉这段旅程仍然记得自己。",
    },
    fiveChecks: {
      label: "Kevin 的出发前复核",
      title: "一天开始前的五项检查",
      items: [
        {
          number: "01",
          title: "门票与预约确认",
          body:
            "预约是否有效、时间是否正确，并且对应客人真正要进入的入口和体验？",
        },
        {
          number: "02",
          title: "身体与饮食信息",
          body:
            "是否存在会影响步行、休息、饮食、过敏或宗教习惯的情况？",
        },
        {
          number: "03",
          title: "司机与接送信息",
          body:
            "客人、司机与导游是否拿到同一个时间、位置和联系方式？",
        },
        {
          number: "04",
          title: "天气与备用方案",
          body:
            "当天最可能影响路线的情况是什么？哪个备选仍然适合这组客人？",
        },
        {
          number: "05",
          title: "紧急联系方式",
          body:
            "如果行程临时变化，执行团队是否掌握必要的联系信息？",
        },
      ],
    },
    closing: {
      title: "最充分的准备，常常看起来什么都没有发生",
      paragraphs: [
        "客人不需要听见每一个后台检查过程。重要的选择应该让客人知道，真正影响体验的变化也应该说明白，并且始终有人能够解释下一步会发生什么。",
        "但许多最好的结果都是安静的：预约在出发前调整好，车辆抵达前确认正确入口，客人体力下降前已经找到更短的走法，道路问题造成延误前已经换好路线。",
        "Kevin 最重视的正是这种工作——不是在问题发生后把解决过程表现得多么精彩，而是尽量不让问题成为客人必须处理的事情。",
      ],
    },
    editorialNoteLabel: "编辑说明",
    editorialNote:
      "本文案例根据 Kevin 的采访内容进行匿名化与叙事整理，省略了具体地点、准确时间和可能识别客人的信息。每一次实际行程仍会根据当时的门票规则、运营情况和交通安排重新确认。",
    caseMethodLabel: "案例根据采访内容进行匿名化与叙事整理。",
    images: {
      portrait: {
        alt: "Kevin 在海边的暖色夕阳下拿着饮品微笑。",
        caption:
          "了解客人真正舒服的节奏，同一张景点清单也会变成完全不同的一天。",
      },
      action: {
        alt: "Kevin 在山地景区与客人沟通，客人面部已做隐私模糊处理。",
        caption:
          "当预约、入口与接送细节已经提前确认，现场沟通才真正轻松。",
      },
      rain: {
        alt:
          "Kevin 在雨天与一位穿黄色雨衣的客人合影，客人面部已做隐私模糊处理。",
        caption:
          "天气可能改变路线，真正有用的备选应该在一天开始前准备好。",
      },
    },
    ctaEyebrow: "把行程背后的准备交给我们",
    ctaTitle: "把你在意的事，提前写进行程里。",
    ctaBody:
      "告诉我们路线、旅行日期、喜欢的节奏，以及可能影响饮食、步行或休息的情况。Homeground 会把这些内容整理成清楚的旅行需求，让规划与在地执行能够围绕同一份信息工作。",
    ctaAction: "提交旅行需求",
    relatedEyebrow: "继续了解",
    relatedTitle: "看看这些准备如何贯穿整段旅程",
    studioLinkLabel: "认识 Kevin 和 Homeground 团队",
    studioLinkDescription:
      "了解行程规划、客人沟通与在地执行，如何围绕同一段旅程一起工作。",
    fieldNoteLinkLabel: "Tantan 的张家界现场笔记",
    fieldNoteLinkDescription:
      "看看张家界行程真正落地之前，Tantan 会如何核对景点名称、时间、酒店和包含项目。",
    schemaRole: "行程规划师与执行统筹",
    schemaAbout: [
      "中国导览日准备",
      "客人节奏与行动需求规划",
      "旅行执行交接",
      "备用路线规划",
    ],
  },
  ko: {
    htmlLang: "ko",
    homePath: "/ko/",
    skipLink: "본문으로 이동",
    breadcrumbLabel: "현재 위치",
    breadcrumbHome: "홈",
    breadcrumbStudio: "스튜디오",
    breadcrumbCurrent: "Kevin의 출발 전 현장 노트",
    eyebrow: "하루가 시작되기 전 · Kevin",
    title:
      "여행자가 보는 것은 하루 일정이지만, Kevin의 준비는 호텔에서 만나기 전부터 시작됩니다.",
    dek:
      "순조로운 하루는 현장에서 즉흥적으로 만들어지지 않습니다. 예약, 픽업 장소, 여행자의 상황과 대체 동선은 호텔을 나서기 전에 이미 확인됩니다.",
    authorLabel: "하루 뒤의 준비",
    authorName: "Kevin",
    authorRole: "여행 플래너 · 운영 코디네이터",
    readTime: "약 6분",
    updatedLabel: "게시일",
    updatedDate: "2026년 7월 23일",
    hero: {
      alt: "흰 셔츠를 입고 해 질 무렵 바닷가에 서 있는 Kevin.",
      caption:
        "Kevin. 현장에서의 여유는 출발 전에 정리한 디테일에서 시작됩니다.",
    },
    intro: [
      "여행자는 호텔 로비에서 Kevin을 만나며 하루가 시작된다고 느낍니다. 하지만 그 전에 이미 많은 일이 끝나 있습니다. 예약 시간을 확인하고, 정확한 입구를 찾고, 기사에게 픽업 정보를 전달하고, 여행자의 요청을 다시 살피고, 상황이 바뀔 때 사용할 대안까지 준비합니다.",
      "Kevin은 영어를 전공했으며 대학 시절부터 현지 안내와 여행 운영 업무를 시작했습니다. 약 4년 동안 실무를 경험하며, 여행자가 직접 보는 안내와 동행은 이 일의 일부에 불과하다는 것을 배웠습니다.",
    ],
    pullQuote:
      "준비된 가이드는 현장에서 문제가 생긴 뒤 수습하기보다, 문제가 생기기 전에 해결합니다.",
    contentsLabel: "이 하루의 뒤편",
    contentsTitle: "여행자가 호텔 로비에 도착하기 전에 시작되는 일",
    contents: [
      { id: "quick-answer", label: "호텔에서 만나기 전" },
      { id: "before-pickup", label: "빠진 부분 확인" },
      { id: "fit-the-traveller", label: "여행자에게 맞추기" },
      { id: "backup-route", label: "대안 준비" },
      { id: "handoff", label: "정보를 다음 담당자에게" },
      { id: "five-checks", label: "Kevin의 5가지 확인" },
    ],
    quickAnswer: {
      label: "먼저 답하기",
      title: "호텔에서 만나기 전, 무엇이 이미 준비되어 있을까요?",
      paragraphs: [
        "Kevin은 예약과 운영 상황, 교통편이 서로 맞는지 확인합니다. 여행자의 속도와 식사 조건, 걷기와 휴식에 영향을 줄 수 있는 사항을 다시 살펴봅니다. 픽업 정보는 문자로 확인하고, 기사도 정확한 시간과 장소를 공유받습니다.",
        "여행자가 모든 확인 과정을 볼 필요는 없습니다. 필요한 것은 답이 없는 문제를 줄인 상태로 하루를 시작하는 것입니다.",
      ],
    },
    beforePickup: {
      eyebrow: "픽업 전",
      title: "네 가지 확인이 끝난 뒤 하루가 시작됩니다",
      paragraphs: [
        "출발 전 Kevin은 다음 네 가지 정보를 서로 대조합니다.",
        "각 항목은 따로 보면 어렵지 않습니다. 문제는 서로 맞지 않을 때 생깁니다. 예약은 유효하지만 이동 시간과 충돌할 수 있고, 픽업 장소가 틀리지는 않았어도 당일 이용할 입구와 맞지 않을 수 있습니다.",
        "Kevin은 중요한 내용을 하루 전에 문자로 확인하고, 출발 당일 아침 픽업 정보를 다시 점검합니다. 여행자와 기사, 가이드가 같은 일정표를 보고 하루를 시작하기 위해서입니다.",
      ],
      bullets: [
        "입장권과 예약 시간",
        "당일 관광지 운영 상황",
        "교통편과 이동 일정",
        "정확한 픽업 시간, 장소와 연락처",
      ],
      caseStudy: {
        eyebrow: "문제가 되기 전에",
        title: "출발 전에 발견한 예약 시간 충돌",
        paragraphs: [
          "한 번은 관광지 예약 시간이 그날의 이동 흐름과 맞지 않는 것을 Kevin이 출발 전에 발견했습니다.",
          "그는 입구에 도착한 뒤 문제를 설명하는 대신, 미리 예약을 다시 조정하고 필요한 순서를 정리했습니다. 여행자는 수정된 일정으로 하루를 시작했고 예약 충돌을 직접 해결할 필요가 없었습니다.",
          "이 사례의 가치는 극적인 현장 대처에 있지 않습니다. 문제가 여행자의 하루에 들어오기 전에 끝났다는 데 있습니다.",
        ],
      },
    },
    fitTraveller: {
      eyebrow: "여행자에게 맞추기",
      title: "같은 관광지 목록도 사람에 따라 전혀 다른 하루가 됩니다",
      paragraphs: [
        "관광지 운영 시간만으로 좋은 동선을 만들 수는 없습니다. Kevin은 여행자를 만나기 전, 하루의 속도를 바꿀 수 있는 정보도 확인합니다.",
        "이 정보는 일정이 완성된 뒤 덧붙이는 장식이 아닙니다. 출발 시간, 식당 선택, 걷는 거리, 휴식 장소와 어느 체험에 시간을 더 배분할지를 직접 바꿉니다.",
        "오래 걷기 어려운 여행자라면 Kevin은 짧은 보행 동선과 쉴 수 있는 장소를 미리 찾습니다. 기본적인 응급용품도 준비하지만, 이런 준비를 전문적인 의료 지원의 대체로 여기지는 않습니다.",
      ],
      bullets: [
        "식사 제한과 알레르기",
        "오래 걷거나 계단을 이용하기 어려운지",
        "빠른 일정과 여유 있는 일정 중 어느 쪽을 선호하는지",
        "평소 휴식과 취침 시간",
        "관심 있는 활동과 원하지 않는 활동",
        "종교적 관습이나 미리 준비해야 할 사항",
      ],
      quote:
        "시간표상 가능하더라도, 실제로 그 길을 걷는 사람에게 맞지 않는 일정일 수 있습니다.",
    },
    backupRoute: {
      eyebrow: "대안 준비",
      title: "대안은 첫 계획의 실패가 아니라, 계획의 일부입니다",
      paragraphs: [
        "날씨와 교통, 대기 시간, 임시 운영 상황은 예약이 정확한 날에도 동선을 바꿀 수 있습니다.",
        "Kevin은 보통 출발 전에 한두 개의 현실적인 대안을 준비합니다. 이미 가득 찬 일정에 더 넣기 위한 추가 관광지가 아니라, 원래 동선이 어려워졌을 때 하루의 핵심 경험을 지키기 위한 선택지입니다.",
        "실제로 사용할 수 있는 대안은 세 가지 질문에 답해야 합니다.",
      ],
      bullets: [
        "남은 시간 안에 정말 가능한가?",
        "이 여행자의 체력과 관심사에 맞는가?",
        "변경으로 인해 새로운 교통 또는 예약 문제가 생기지 않는가?",
      ],
      caseStudy: {
        eyebrow: "지연이 되기 전에",
        title: "도로 공사로 원래 동선이 막혔을 때",
        paragraphs: [
          "다른 일정에서는 출발 전 원래 이용하려던 도로가 공사로 막혔다는 사실을 확인했습니다.",
          "Kevin은 픽업 전에 기사와 대체 도로를 점검하고 차량 동선을 바꿨습니다. 여행자가 하루를 시작했을 때는 이미 변경 사항이 처리된 뒤였습니다. 여행자가 직접 도로 문제를 조율할 필요는 없었습니다.",
          "준비가 잘됐다는 것은 상황이 절대 바뀌지 않는다는 뜻이 아닙니다. 상황이 바뀌었을 때 연결 작업을 여행자에게 맡기지 않는다는 뜻입니다.",
        ],
      },
    },
    handoff: {
      eyebrow: "정보 인계",
      title: "담당자가 바뀔 때마다 여행자가 자신을 다시 설명할 필요는 없습니다",
      paragraphs: [
        "여러 날, 여러 도시를 여행하면 서로 다른 구성원이 참여할 수 있습니다. 하지만 여행자에게 중요한 정보가 인계 과정에서 사라져서는 안 됩니다.",
        "다음 일정으로 넘어가기 전 Kevin은 그 단계에 실제로 필요한 정보를 전달합니다.",
        "하루를 마친 뒤에는 종이 일정표가 미리 알 수 없었던 내용도 더합니다. 여행자의 현재 체력, 수정된 일정, 여행 중 새롭게 요청한 사항 등입니다.",
        "인계의 목적은 긴 내부 보고서를 만드는 것이 아닙니다. 다음 담당자가 이미 달라진 여행자 상황을 모른 채 오래된 계획으로 일하지 않도록 하는 것입니다.",
      ],
      bullets: [
        "확정된 예약과 관련 입장 규정",
        "픽업 장소와 연락처",
        "식사, 보행과 기타 실질적인 요구",
        "이미 합의한 일정 변경",
        "다음 날에 영향을 줄 수 있는 알려진 상황",
      ],
      quote:
        "만나는 사람이 달라져도, 여행이 자신을 기억하고 있다는 느낌은 이어져야 합니다.",
    },
    fiveChecks: {
      label: "Kevin의 출발 전 점검",
      title: "하루가 시작되기 전 5가지 확인",
      items: [
        {
          number: "01",
          title: "입장권 및 예약 확인",
          body:
            "예약이 유효하고 시간이 정확하며, 여행자가 원하는 입구와 체험에 연결되어 있는가?",
        },
        {
          number: "02",
          title: "건강 및 식사 정보",
          body:
            "걷기, 휴식, 식사, 알레르기 또는 종교적 관습에 영향을 주는 사항이 있는가?",
        },
        {
          number: "03",
          title: "기사 및 픽업 정보",
          body:
            "여행자, 기사와 가이드가 같은 시간, 장소와 연락처를 공유하고 있는가?",
        },
        {
          number: "04",
          title: "날씨 및 대체 계획",
          body:
            "당일 동선에 가장 큰 영향을 줄 조건은 무엇이며, 이 여행자에게 맞는 대안은 무엇인가?",
        },
        {
          number: "05",
          title: "비상 연락처",
          body:
            "일정이 갑자기 바뀌었을 때 운영팀이 필요한 연락 정보를 가지고 있는가?",
        },
      ],
    },
    closing: {
      title: "가장 잘 준비된 일은 아무 일도 없었던 것처럼 보일 수 있습니다",
      paragraphs: [
        "여행자에게 모든 내부 확인 과정을 설명할 필요는 없습니다. 하지만 중요한 선택은 이해할 수 있어야 하고, 경험에 영향을 주는 변경 사항은 솔직하게 알려야 하며, 다음에 무엇이 일어날지 설명해 줄 사람이 있어야 합니다.",
        "좋은 결과 중 많은 것은 조용합니다. 출발 전 예약을 조정하고, 차량이 오기 전 입구를 확인하고, 여행자가 지치기 전 짧은 보행 동선을 준비하고, 도로 문제로 지연되기 전 다른 길을 찾는 일입니다.",
        "Kevin이 중요하게 생각하는 것도 바로 이런 준비입니다. 문제가 발생한 뒤 해결 과정을 돋보이게 만드는 것이 아니라, 그 문제가 여행자가 직접 처리해야 할 일이 되지 않도록 하는 것입니다.",
      ],
    },
    editorialNoteLabel: "편집자 주",
    editorialNote:
      "이 글의 사례는 Kevin과의 인터뷰를 바탕으로 개인정보가 드러나지 않도록 익명 처리하고 서사적으로 정리했습니다. 장소, 정확한 시각과 신원을 특정할 수 있는 정보는 생략했습니다. 실제 일정에서는 최신 입장 규정과 운영 상황, 교통편을 다시 확인합니다.",
    caseMethodLabel:
      "인터뷰 내용을 바탕으로 익명 처리하고 서사적으로 정리한 사례입니다.",
    images: {
      portrait: {
        alt: "해 질 무렵 바닷가에서 음료를 들고 눈을 감은 채 웃는 Kevin.",
        caption:
          "여행자가 편안하게 느끼는 속도를 알면 같은 관광지 목록도 전혀 다른 하루가 됩니다.",
      },
      action: {
        alt:
          "산악 관광지에서 여행객과 대화하는 Kevin. 여행객 얼굴은 개인정보 보호를 위해 흐림 처리했다.",
        caption:
          "예약과 입구, 픽업 정보가 미리 확인되어 있을 때 현장 소통도 더 자연스럽습니다.",
      },
      rain: {
        alt:
          "비 오는 날 노란 우비를 입은 여행객과 사진을 찍는 Kevin. 여행객 얼굴은 개인정보 보호를 위해 흐림 처리했다.",
        caption:
          "날씨는 동선을 바꿀 수 있습니다. 실제로 쓸 수 있는 대안은 하루가 시작되기 전에 준비합니다.",
      },
    },
    ctaEyebrow: "일정표 뒤의 준비를 Homeground와 함께하세요",
    ctaTitle: "첫 픽업 전에, 여행에 필요한 내용을 미리 알려 주세요.",
    ctaBody:
      "여행 동선과 날짜, 원하는 속도, 식사·보행·휴식에 영향을 줄 수 있는 사항을 알려 주세요. Homeground가 이를 명확한 여행 요청으로 정리해 일정 설계와 현지 운영이 같은 정보를 바탕으로 움직이도록 돕습니다.",
    ctaAction: "Homeground에 여행 요청 보내기",
    relatedEyebrow: "계속 알아보기",
    relatedTitle: "이 준비가 여행 전체로 어떻게 이어지는지 확인하세요",
    studioLinkLabel: "Kevin과 Homeground 팀 소개",
    studioLinkDescription:
      "여행 설계와 여행자 소통, 현지 운영이 하나의 여정을 중심으로 어떻게 연결되는지 만나 보세요.",
    fieldNoteLinkLabel: "Tantan의 장가계 현장 노트",
    fieldNoteLinkDescription:
      "장가계 일정이 현장에서 시작되기 전 관광지 이름과 시간, 숙소와 포함 사항을 어떻게 확인하는지 살펴보세요.",
    schemaRole: "여행 플래너 및 운영 코디네이터",
    schemaAbout: [
      "중국 가이드 일정 준비",
      "여행자 속도 및 보행 계획",
      "여행 운영 인계",
      "대체 동선 준비",
    ],
  },
};

export function getKevinPreparationStoryCopy(
  locale: HomegroundLocale = "en",
) {
  return copies[locale];
}
