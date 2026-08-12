import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "lead-answer",
      "type": "lead",
      "text": "只住一家酒店不一定更慢，向前移动也不一定更高效。中心基地省去打包与入住，却会重复往返车站；多个基地减少地理折返，却增加行李、退房空档和故障点。要比较完整的门到门交通块。"
    },
    {
      "id": "decision-frame",
      "type": "comparison",
      "title": "三种可以成立的结构",
      "columns": [
        {
          "heading": "一个基地",
          "body": "周边目的地集中、进站方便，而且团队非常需要住宿稳定。"
        },
        {
          "heading": "多个基地",
          "body": "路线持续向前，每次移动能解锁多个重点。"
        },
        {
          "heading": "混合结构",
          "body": "先用一个稳定区域基地，再主动移动到下一条走廊。"
        }
      ]
    },
    {
      "id": "evidence-heading",
      "type": "heading",
      "level": 2,
      "text": "全国不存在统一当天往返半径"
    },
    {
      "id": "evidence",
      "type": "paragraph",
      "text": "只有日期和车站确定后，12306才能核对当前车次。短车程前可能有很长地铁，抵达后也可能远离景点。因此，当天往返应按酒店出门、固定返程与实际可用时间定义，而不是按公里数。"
    },
    {
      "id": "decision-table",
      "type": "table",
      "caption": "时间分别损失在哪里",
      "columns": [
        "成本",
        "中心基地",
        "多基地"
      ],
      "rows": [
        [
          "酒店摩擦",
          "低",
          "每次退房与搬行李都会增加"
        ],
        [
          "重复地面交通",
          "可能很高",
          "向前串联时较低"
        ],
        [
          "受扰后恢复",
          "稳定房间有帮助",
          "后续酒店与车票可能连锁失效"
        ]
      ]
    },
    {
      "id": "warning",
      "type": "callout",
      "tone": "warning",
      "title": "不要只比较车上时间",
      "body": "还要加入进站、等待、到达接驳和必须返程。40分钟列车也可能形成很长的一天。"
    },
    {
      "id": "method-heading",
      "type": "heading",
      "level": 2,
      "text": "选择路线结构"
    },
    {
      "id": "method",
      "type": "list",
      "ordered": true,
      "items": [
        "把重点按真实地理位置分组。",
        "逐条计算当天往返的门到门时间。",
        "计算换酒店次数和需要多少只手拿行李。",
        "检查每个基地是否至少服务两个重点。",
        "一次移动能消除多次折返时采用混合结构。"
      ]
    },
    {
      "id": "cut-heading",
      "type": "heading",
      "level": 2,
      "text": "删减规则"
    },
    {
      "id": "cut-rule",
      "type": "paragraph",
      "text": "删掉只服务一个弱重点的基地，或删掉反复经过漫长进站流程的支线。不要因为一个省打包、一个看起来线性就同时保留。"
    },
    {
      "id": "scope",
      "type": "callout",
      "tone": "neutral",
      "title": "这里只解决结构",
      "body": "本文不规定城市、晚数或当天往返；日期、酒店和当前交通才决定最终形状。"
    },
    {
      "id": "help-cta",
      "type": "callout",
      "tone": "decision",
      "title": "需要人工数清折返？",
      "body": "留下日期、人数、大致预算、行李限制和候选基地。"
    },
    {
      "id": "more-planning",
      "type": "internal-links",
      "title": "继续规划",
      "items": [
        {
          "label": "检查路线是否太赶",
          "href": "/guides/is-your-china-itinerary-too-rushed/",
          "description": "用真实可用日检验最终结构。"
        },
        {
          "label": "选择真正方便交通的酒店",
          "href": "/guides/china-hotel-near-metro/",
          "description": "基地每天出发方便，结构才成立。"
        },
        {
          "label": "判断是否异地进出",
          "href": "/guides/china-open-jaw-flights-route-planning/",
          "description": "异地进出可把反复往返改为向前串联。"
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "已核对的官方来源",
      "items": [
        {
          "label": "中国铁路官方客运服务",
          "url": "https://www.12306.cn/en/index.html",
          "publisher": "China Railway 12306",
          "reviewedAt": "2026-08-12"
        }
      ]
    }
  ]
} satisfies StructuredPageBody;

export default body;
