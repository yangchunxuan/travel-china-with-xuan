import type { EntryRequirementsEditionCopy } from "./entryRequirementsEditionTypes.ts";

/** Chinese translation of /guides/china-entry-requirements/. */
export const chineseEntryRequirementsCopy: EntryRequirementsEditionCopy = {
  dateLocale: "zh-CN",
  openGraphLocale: "zh_CN",
  metadata: {
    title: "中国入境指南：按护照和路线查看免签规则",
    description:
      "按护照、出行目的和路线查看现行中国入境规则，包括 2026 年英国公民免签入境、美国护照签证指南和 240 小时过境免签路线核对。",
    socialImageAlt: "北京附近山脊上的长城。",
  },
  skipLink: "跳到入境指南",
  breadcrumb: { label: "面包屑导航", home: "首页", guides: "指南", current: "中国入境指南" },
  hero: {
    eyebrow: "Homeground 入境资讯",
    title: "中国入境指南",
    lead:
      "按护照、出行目的和具体路线整理的现行入境规则。先确认适用于你这趟行程的规则，再在这个范围内安排行程。",
    boundary:
      "只提供基于官方来源的出行信息。Homeground 不代办签证申请，不判断个人是否符合条件，也不要求上传护照。",
  },
  checks: {
    label: "入境前的三项核对",
    intro: "先确认三件事",
    items: [
      { title: "护照", detail: "国籍和证件的具体类型" },
      { title: "目的", detail: "旅游、过境、工作或其他原因" },
      { title: "路线", detail: "从哪里入境，接下来去哪里" },
    ],
  },
  collection: {
    eyebrow: "现行入境指南",
    title: "按你实际的护照和路线来选。",
    body: "这些页面把官方公布的事实和行程规划上的解读分开，并标明核对日期。",
    latestReview: "最近一次核对来源",
    checked: "{date}核对",
    readEnglishGuide: "阅读指南（英文）",
    readGuide: "阅读指南",
  },
  ruleTypes: {
    eyebrow: "为什么路线很重要",
    title: "“免签”可能指两种完全不同的入境方式。",
    items: [
      {
        marker: "A",
        title: "按护照免签",
        body: "公布的规则以国籍、护照类型、出行目的和停留时间为前提。现行的英国公民指南就是一个例子。",
      },
      {
        marker: "B",
        title: "按路线过境",
        body:
          "已确认的下一站国家或地区，可能决定过境免签是否适用。240 小时过境路线核对说明了为什么往返行程和前往第三地的行程并不相同。",
      },
    ],
  },
  protocol: {
    eyebrow: "我们如何发布",
    title: "政策类页面要养成定期复核的习惯。",
    items: [
      "优先使用政府和使领馆的官方来源。",
      "标明这些来源的核对日期。",
      "把公布的规则和路线规划上的解读分开。",
      "特殊的护照或法律情况，请交由主管部门判断。",
    ],
  },
  cta: {
    eyebrow: "入境问题确认之后",
    title: "接下来要规划的是旅程，而不是手续。",
    body:
      "告诉我们你的日期、想去的地方，以及已经定下的路线。在任何收费工作开始之前，Homeground 的规划师会先帮你确定合适的规划范围。",
    action: "和旅行规划师聊聊",
  },
  guides: {
    "do-us-citizens-need-visa-china-2026": {
      label: "美国护照指南",
      headline: "2026 年，美国护照去中国还需要签证吗？",
      description:
        "美国护照普通中国大陆旅行通常需要 L 签。本指南对比 240 小时过境免签、海南 30 天区域免签与标准往返行程。",
      imageAlt: "上海浦东国际机场到达层，头顶是中英双语指示牌。",
    },
    "china-240-hour-visa-free-transit-route-check": {
      label: "过境路线指南",
      headline: "中国 240 小时过境免签：你的路线符合条件吗？",
      description:
        "核对 A—中国—C 路线、适用普通护照、已确认续程票、指定口岸与许可停留区域，判断 240 小时过境免签条件。",
      imageAlt: "过境规则示意图：国家或地区 A，中国大陆，另一个不同的国家或地区 C。",
    },
    "do-singaporeans-need-visa-china": {
      label: "新加坡护照指南",
      headline: "去中国不需要签证。更难的问题在这里。",
      description:
        "新加坡普通护照可免签进入中国大陆 30 天。本文核对入境规则、入境卡填写方式，以及怎样把这段时间排成真正可执行的中国路线。",
      imageAlt: "张家界国家森林公园内，层层砂岩石柱耸立于深绿色山谷之中。",
    },
    "china-visa-free-uk-citizens-2026": {
      label: "英国护照指南",
      headline: "2026 年英国公民赴华免签：什么情况下仍需签证？",
      description:
        "2026 年英国公民赴华 30 天免签入境实用指南：护照类型、天数计算、经香港再入境，以及仍需办理签证的情况。",
      imageAlt: "春天，长城沿着北京附近的山脊延伸。",
    },
    "china-visa-free-canadian-citizens-2026": {
      label: "加拿大护照指南",
      headline: "2026 年加拿大公民赴华免签：什么情况下仍需签证？",
      description:
        "2026 年加拿大公民赴华 30 天免签入境实用指南：护照类型、天数计算、经香港再入境，以及仍需办理签证的情况。",
      imageAlt: "晴朗白天里的北京现代天际线，可以看到中信大厦（中国尊）。",
    },
    "china-visa-free-new-zealand-citizens-2026": {
      label: "新西兰护照指南",
      headline: "2026 年新西兰公民赴华免签：什么情况下仍需签证？",
      description:
        "2026 年新西兰公民赴华 30 天免签入境实用指南：护照类型、天数计算、经香港再入境，以及仍需办理签证的情况。",
      imageAlt: "编辑示意时间线：新西兰公民赴华免签政策期限，自 2024 年 11 月 30 日至 2026 年 12 月 31 日。",
    },
  },
};
