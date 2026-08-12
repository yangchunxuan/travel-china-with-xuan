import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "lead-answer",
      "type": "lead",
      "text": "当铁路连接的是你真正重视的地点时，纯铁路路线才成立；不能为了一个口号强迫所有目的地加入。每一站都要从酒店门算到下一家酒店门。有车站的城市仍可能需要很长的公路接驳，而路线边缘的一段航班有时能保住一整个可用日。"
    },
    {
      "id": "decision-frame",
      "type": "comparison",
      "title": "三个检验",
      "columns": [
        {
          "heading": "铁路主轴",
          "body": "下一处重要目的地位于连续、向前的铁路走廊上。"
        },
        {
          "heading": "白天成本",
          "body": "完整交通块不会吃掉你本来要保护的游览时间。"
        },
        {
          "heading": "最后一公里",
          "body": "进出车站和公路末段适合同行者与行李。"
        }
      ]
    },
    {
      "id": "evidence-heading",
      "type": "heading",
      "level": 2,
      "text": "官方库存只对具体日期成立"
    },
    {
      "id": "evidence",
      "type": "paragraph",
      "text": "12306是查询当前列车与客运规则的官方服务。铁路地图只能证明基础设施存在，不能证明你的日期有合适车次、座位或车站组合。先搭概念，再在真实售票窗口逐段核验。"
    },
    {
      "id": "decision-table",
      "type": "table",
      "caption": "何时坚持或打破纯铁路",
      "columns": [
        "情况",
        "决定",
        "原因"
      ],
      "rows": [
        [
          "同一走廊上的大城市",
          "以铁路为主轴。",
          "市中心落点和较少机场流程可能更合适。"
        ],
        [
          "铁路门户后的偏远景区",
          "接受公路末段。",
          "铁路不会开到景区门口。"
        ],
        [
          "超长跨区跳跃",
          "比较一次飞行。",
          "形式上坚持纯铁路可能损失整天或带来糟糕夜车。"
        ]
      ]
    },
    {
      "id": "warning",
      "type": "callout",
      "tone": "warning",
      "title": "纯铁路从来不等于零接驳",
      "body": "车站可能远离酒店，一座城市可能有多个车站，景区也常需巴士或汽车。必须逐段计算。"
    },
    {
      "id": "method-heading",
      "type": "heading",
      "level": 2,
      "text": "设计铁路路线"
    },
    {
      "id": "method",
      "type": "list",
      "ordered": true,
      "items": [
        "只列出有明确保留理由的地点。",
        "在进出门户之间画一条向前的铁路主轴。",
        "加入酒店到车站、车站到酒店的时间。",
        "标出只能走公路的末段并检查同行者限制。",
        "若一段飞行能保住完整可用时段，就允许打破规则。"
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
      "text": "先删掉为了一个较弱重点而长距离往返的支线。不要为了保住地图上的偏远地点，把每个核心城市都压缩。"
    },
    {
      "id": "scope",
      "type": "callout",
      "tone": "neutral",
      "title": "不提供实时列车方案",
      "body": "本文不选车次、不承诺座位，也不生成按天路线；这些需要具体日期和12306实时核对。"
    },
    {
      "id": "help-cta",
      "type": "callout",
      "tone": "decision",
      "title": "需要人工检查铁路主轴？",
      "body": "留下日期、人数、大致预算和候选城市，我们可以指出铁路不再合理的那一段。"
    },
    {
      "id": "more-planning",
      "type": "internal-links",
      "title": "继续规划",
      "items": [
        {
          "label": "第一次乘坐中国高铁",
          "href": "/guides/china-high-speed-train-first-time-guide/",
          "description": "路线通过铁路检验后，再处理乘车流程。"
        },
        {
          "label": "比较夜车与白天高铁",
          "href": "/guides/china-night-train-or-daytime-high-speed-rail/",
          "description": "有意识地保护睡眠或白天游览时间。"
        },
        {
          "label": "判断是否只在路线两端飞行",
          "href": "/guides/china-open-jaw-flights-route-planning/",
          "description": "异地进出可让铁路主轴不必折返。"
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
