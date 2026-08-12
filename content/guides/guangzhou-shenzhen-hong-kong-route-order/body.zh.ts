import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "lead-answer",
      "type": "lead",
      "text": "如果是单向旅行，广州—深圳—香港或反向通常最顺路；但这不等于深圳一定要住一晚。先确认国际进出门户，再写下一个你愿意为深圳保留的明确体验，最后判断换酒店和过境是否真的换来了足够的可用时间。"
    },
    {
      "id": "decision-frame",
      "type": "comparison",
      "title": "路线由三个问题决定",
      "columns": [
        {
          "heading": "进出门户",
          "body": "票价和入境条件合适时，从一端进入、另一端离开。"
        },
        {
          "heading": "深圳的理由",
          "body": "只有存在无法顺带完成的明确重点，才值得换一次酒店。"
        },
        {
          "heading": "过境日",
          "body": "把证件检查、进站和行李处理算作交通时段，不算完整游览日。"
        }
      ]
    },
    {
      "id": "evidence-heading",
      "type": "heading",
      "level": 2,
      "text": "距离短，不代表过境成本低"
    },
    {
      "id": "evidence",
      "type": "paragraph",
      "text": "官方资料显示，深港之间有多个口岸，也有以香港西九龙为端点的跨境高铁。不同选择会改变你在两座城市的落点、接驳距离和证件流程。因此，先比较两端位置，再比较列车本身；不能把某一种方式写成永远最快。"
    },
    {
      "id": "decision-table",
      "type": "table",
      "caption": "三种路线何时成立",
      "columns": [
        "路线",
        "适合",
        "不适合"
      ],
      "rows": [
        [
          "广州 → 深圳 → 香港",
          "从广州一侧抵达、从香港离境。",
          "最后仍要回内地机场。"
        ],
        [
          "香港 → 深圳 → 广州",
          "先到香港，之后继续向北或向西。",
          "固定从香港离境，需要长距离折返。"
        ],
        [
          "广州与香港住宿，深圳当天往返",
          "深圳只有一个集中目标，行李可留在酒店。",
          "所选口岸带来过多市内接驳。"
        ]
      ]
    },
    {
      "id": "warning",
      "type": "callout",
      "tone": "warning",
      "title": "不要把过境当成普通城市通勤",
      "body": "口岸时间、入境资格和车票库存都可能变化。必须核对具体口岸或西九龙流程，并在固定预约前留出缓冲。"
    },
    {
      "id": "method-heading",
      "type": "heading",
      "level": 2,
      "text": "不照抄行程，也能做决定"
    },
    {
      "id": "method",
      "type": "list",
      "ordered": true,
      "items": [
        "写清楚实际抵达与离开的机场或铁路门户。",
        "分别写下三座城市即使删减也要保留的一件事。",
        "按两端酒店位置选口岸，不只看车上时间。",
        "把每次换酒店和过境流程都计入可用时间损失。",
        "若深圳停留只是为了增加城市数量，就删掉这一晚。"
      ]
    },
    {
      "id": "cut-heading",
      "type": "heading",
      "level": 2,
      "text": "最先删什么"
    },
    {
      "id": "cut-rule",
      "type": "paragraph",
      "text": "先删没有明确目标的一晚深圳。广州与香港之间直接移动，再安排一次有目的的深圳当天行程，通常比三家酒店更容易调整。"
    },
    {
      "id": "scope",
      "type": "callout",
      "tone": "neutral",
      "title": "本文不提供什么",
      "body": "本文不分配住宿晚数、不判断个人签证，也不选择实时车次；这些取决于日期、护照、酒店和你的优先事项。"
    },
    {
      "id": "help-cta",
      "type": "callout",
      "tone": "decision",
      "title": "需要人工检查路线？",
      "body": "留下日期、人数、大致预算和实际进出门户，我们可以帮你找出受过境影响最大的环节，但不会承诺实时库存。"
    },
    {
      "id": "more-planning",
      "type": "internal-links",
      "title": "继续规划",
      "items": [
        {
          "label": "比较广州—香港交通",
          "href": "/guides/guangzhou-hong-kong-transport-route/",
          "description": "先定城市顺序，再选车站与交通方式。"
        },
        {
          "label": "选择深圳—香港过境方式",
          "href": "/guides/shenzhen-hong-kong-transport-route/",
          "description": "按酒店位置和后续安排选择口岸。"
        },
        {
          "label": "判断是否使用开口航班",
          "href": "/guides/china-open-jaw-flights-route-planning/",
          "description": "判断异地进出能否减少回头路。"
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "已核对的官方来源",
      "items": [
        {
          "label": "跨境高铁行程规划",
          "url": "https://www.highspeed.mtr.com.hk/en/latest-news/trip-planner.html",
          "publisher": "MTR High Speed Rail",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "香港管制站资料",
          "url": "https://www.sb.gov.hk/eng/special/bound/control.html",
          "publisher": "Hong Kong Security Bureau",
          "reviewedAt": "2026-08-12"
        }
      ]
    }
  ]
} satisfies StructuredPageBody;

export default body;
