/**
 * /zh/careers/: Chinese only, because the people we hire read Chinese first.
 * Draft skeleton, 2026-10-04, for the owner to rewrite; the page stays
 * noindex until approved. Applications go only through WeChat.
 */
export interface HomegroundCareerRole {
  id: "advisor" | "guide" | "content";
  title: string;
  summary: string;
  duties: readonly string[];
  requirements: readonly string[];
}

export const homegroundCareersCopy = {
  path: "/zh/careers/",
  metadata: {
    title: "加入 Homeground：招募旅行顾问、导游和内容运营",
    description:
      "Homeground China 正在招募旅行顾问/销售、持证导游和内容/运营。加微信 homeground101 报名。",
    openGraphTitle: "加入 Homeground China",
  },
  /** The header menu's label for this page. */
  navLabel: "加入我们",
  navDescription: "旅行顾问、导游、内容运营",
  eyebrow: "加入我们",
  title: "和我们一起，把真实的中国带给远方的朋友。",
  /** Where the title may break; Chinese has no spaces to break at. */
  titleLines: ["和我们一起，", "把真实的中国", "带给远方的朋友。"],
  intro:
    "我们接待来自世界各地的客人，按他们的节奏安排私人行程。现在我们在找认同这件事的人：会聊天的旅行顾问、带得好团的导游、会讲故事的内容伙伴。",
  applyAction: "加微信报名",
  companyAction: "先看看我们的理念",
  roles: {
    eyebrow: "正在招募",
    title: "三个岗位",
    dutiesLabel: "你会做什么",
    requirementsLabel: "我们希望你",
    items: [
      {
        id: "advisor",
        title: "旅行顾问 / 销售",
        summary: "回复外国客人的咨询，把他们的想法变成一份可行的行程，跟进到付定金。",
        duties: [
          "用英文（或韩文）通过邮件和 WhatsApp 跟客人沟通",
          "按客人的天数、预算和兴趣搭配行程和报价",
          "跟进到客人确认，付款后交给落地团队",
        ],
        requirements: [
          "英文读写流利，能写得体的商务邮件；会韩文加分",
          "对中国各地的交通、景点和住宿有基本了解",
          "诚实，不夸大，不为成交乱承诺",
        ],
      },
      {
        id: "guide",
        title: "导游",
        summary: "在你的城市带外国客人，把这座城真实的样子讲给他们听。",
        duties: [
          "按行程接待客人，讲解景点、历史和日常生活",
          "照顾好客人的节奏、饮食和安全",
          "行程中和规划团队保持沟通，有变化及时反馈",
        ],
        requirements: [
          "持有有效导游证",
          "英文或韩文讲解流利",
          "熟悉所在城市，接待过外国客人更好",
        ],
      },
      {
        id: "content",
        title: "内容 / 运营",
        summary: "把我们的行程、城市和客人故事写好、拍好，让更多人看到。",
        duties: [
          "撰写和整理网站上的城市指南、行程页面（中英文）",
          "整理照片和短视频素材，运营社交账号",
          "跟踪内容数据，提出改进",
        ],
        requirements: [
          "中英文写作好，事实准确，不写夸张的话",
          "会基础的拍照、修图或剪辑",
          "对中国旅行有兴趣，做事细心",
        ],
      },
    ] satisfies readonly HomegroundCareerRole[],
  },
  why: {
    eyebrow: "为什么加入",
    title: "在这里做事是什么样",
    items: [
      { title: "真实的客人", body: "客人来自世界各地，每一单都是一趟真实的旅行。" },
      { title: "诚实做事", body: "不夸大，不藏费用；你推荐的行程，客人到了现场也经得起看。" },
      { title: "规则先讲清", body: "合作方式和收入，在开始合作前就讲清楚。" },
      { title: "一起成长", body: "公司还小，你的想法会直接变成网站上的内容和客人的行程。" },
    ],
  },
  apply: {
    eyebrow: "怎么报名",
    title: "加微信，聊一聊",
    wechatLabel: "微信号",
    wechatId: "homeground101",
    copy: "复制微信号",
    copied: "已复制",
    copyFailed: "复制失败，请手动输入微信号",
    note: "添加时请备注：报名 + 岗位 + 所在城市",
    steps: [
      { title: "加微信 homeground101", body: "备注：报名 + 岗位 + 所在城市。" },
      { title: "发一份简介", body: "简历、带团经历或作品，能说明你的都可以。" },
      { title: "微信上聊一次", body: "了解你的时间和擅长的方向。" },
      { title: "从第一单开始", body: "先合作一单，双方都满意再长期合作。" },
    ],
  },
  faq: {
    eyebrow: "常见问题",
    title: "报名前你可能想问",
    items: [
      { question: "不在北京可以吗？", answer: "可以。导游按所在城市合作；其他岗位在微信沟通时再确认。" },
      { question: "收入怎么算？", answer: "按岗位和城市不同，在微信沟通时讲清楚。" },
    ],
  },
} as const;

/** Careers is published in Chinese only; the other languages link here. */
export function getCareersLanguagePaths() {
  return { "zh-Hans": homegroundCareersCopy.path };
}
