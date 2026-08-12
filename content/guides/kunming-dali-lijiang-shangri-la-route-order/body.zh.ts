import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "lead-answer",
      "type": "lead",
      "text": "较容易成立的默认结构是昆明—大理—丽江—香格里拉，或完全反向，目的是减少折返，不是证明四站都必须去。航班条件可能让昆明只承担门户功能；香格里拉则增加更高海拔下的恢复问题，不能靠照抄住宿晚数解决。"
    },
    {
      "id": "decision-frame",
      "type": "comparison",
      "title": "先给每一站分配作用",
      "columns": [
        {
          "heading": "昆明",
          "body": "可以是航空门户；没有独立重点时不必硬留游览时间。"
        },
        {
          "heading": "大理与丽江",
          "body": "是不同的基地，但要先判断你想做的事是否重复。"
        },
        {
          "heading": "香格里拉",
          "body": "它是需要主动选择的高海拔延伸，不是免费的第四站。"
        }
      ]
    },
    {
      "id": "evidence-heading",
      "type": "heading",
      "level": 2,
      "text": "铁路改善连续性，不会增加个人体力"
    },
    {
      "id": "evidence",
      "type": "paragraph",
      "text": "丽江至香格里拉铁路开通后，南北串联更可行；但进出车站、换酒店、天气和到达更高海拔后的反应仍然存在。交通可行与旅行舒适必须分开判断。"
    },
    {
      "id": "decision-table",
      "type": "table",
      "caption": "不同方向适合什么门户",
      "columns": [
        "结构",
        "适合情况",
        "主要风险"
      ],
      "rows": [
        [
          "昆明向北",
          "从昆明抵达，能从北部离开或继续前往下一地。",
          "因为顺路就把所有站都加上。"
        ],
        [
          "香格里拉向南",
          "可以先抵达香格里拉，并希望逐步下降。",
          "第一天负担高，却没有恢复空间。"
        ],
        [
          "昆明往返",
          "同城往返机票明显更合适且时间充足。",
          "同一条走廊重复付出时间。"
        ]
      ]
    },
    {
      "id": "warning",
      "type": "callout",
      "tone": "warning",
      "title": "不要从路线图推出健康承诺",
      "body": "不同旅客对高海拔的反应不同。本文只提供节奏判断，不提供医疗许可；有健康顾虑者应寻求合适的专业建议，并让首个高海拔日保持弹性。"
    },
    {
      "id": "method-heading",
      "type": "heading",
      "level": 2,
      "text": "用五个决定搭路线"
    },
    {
      "id": "method",
      "type": "list",
      "ordered": true,
      "items": [
        "先固定真实抵达与离开的机场。",
        "每一站都写出一个不可替代的保留理由。",
        "比较大理与丽江是否重复你的体验与节奏。",
        "只有恢复空间和离开方案都可信时才加入香格里拉。",
        "先整站删减，不要把每站都压缩。"
      ]
    },
    {
      "id": "cut-heading",
      "type": "heading",
      "level": 2,
      "text": "更干净的删法是删整站"
    },
    {
      "id": "cut-rule",
      "type": "paragraph",
      "text": "不要为了保住城市清单，把四地变成四次匆忙入住。昆明若只是航空门户就顺路通过；香格里拉若只是一个知名地名，就留到有足够余量的旅程。"
    },
    {
      "id": "scope",
      "type": "callout",
      "tone": "neutral",
      "title": "不免费交付私人行程单",
      "body": "本文不分配晚数，也不安排景点。实时交通、季节、身体情况、行李与航班都会改变答案。"
    },
    {
      "id": "help-cta",
      "type": "callout",
      "tone": "decision",
      "title": "需要人工检查这条走廊？",
      "body": "留下日期、人数、大致预算与进出机场，我们可以指出最薄弱的环节，但不承诺实时车票。"
    },
    {
      "id": "more-planning",
      "type": "internal-links",
      "title": "继续规划",
      "items": [
        {
          "label": "选择丽江古城还是束河",
          "href": "/zh/guides/lijiang-old-town-or-shuhe-where-to-stay/",
          "description": "先确定丽江的作用，再选住宿片区。"
        },
        {
          "label": "准备第一次乘中国高铁",
          "href": "/zh/guides/china-high-speed-train-first-time-guide/",
          "description": "路线确定后再核对乘车流程。"
        },
        {
          "label": "检查路线是否太赶",
          "href": "/zh/guides/is-your-china-itinerary-too-rushed/",
          "description": "扣除交通与恢复时间后再看可用天数。"
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "已核对的官方来源",
      "items": [
        {
          "label": "丽江至香格里拉铁路开通",
          "url": "https://www.nra.gov.cn/xwzx/tpsp/tpxx/202312/t20231229_344290.shtml",
          "publisher": "National Railway Administration",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "云南综合交通网络资料",
          "url": "https://jtyst.yn.gov.cn/html/2025/xingyexinwen_0218/3133736.html",
          "publisher": "Yunnan Department of Transport",
          "reviewedAt": "2026-08-12"
        }
      ]
    }
  ]
} satisfies StructuredPageBody;

export default body;
