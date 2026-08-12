import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "lead-answer",
      "type": "lead",
      "text": "适合孩子的中国路线，不是把成人行程的晚餐提前。要围绕最难熬的一小时设计：抵达后的午睡、大车站内的长距离步行、突然要上厕所，或抱着睡着的孩子完成最后一段换乘。少换基地和保留恢复时间，通常比多加一座名城更重要。"
    },
    {
      "id": "decision-frame",
      "type": "comparison",
      "title": "先保护三个家庭系统",
      "columns": [
        {
          "heading": "睡眠",
          "body": "抵达日与换城日不要安排不可替代的固定项目。"
        },
        {
          "heading": "移动",
          "body": "计算楼梯、车站规模、收折推车和由谁拿行李。"
        },
        {
          "heading": "吃饭与如厕",
          "body": "在酒店附近和长队之前安排可预期的选择。"
        }
      ]
    },
    {
      "id": "evidence-heading",
      "type": "heading",
      "level": 2,
      "text": "儿童票只是其中一层"
    },
    {
      "id": "evidence",
      "type": "paragraph",
      "text": "12306公布按年龄划分的儿童票规则，包括何时可不单独占座免费乘车、何时应购买儿童优惠票。规则允许，不等于座位安排舒适；应核对最新条款、证件信息，并判断家庭是否需要独立座位。"
    },
    {
      "id": "decision-table",
      "type": "table",
      "caption": "家庭限制对应什么路线调整",
      "columns": [
        "限制",
        "路线回应",
        "错误捷径"
      ],
      "rows": [
        [
          "依赖午睡",
          "每天一个主要重点，附近时间保持可选。",
          "抵达后立刻安排固定预约。"
        ],
        [
          "推车与行李",
          "减少换酒店；必要时用真正解决障碍的门到门交通。",
          "假设所有通道都无障碍。"
        ],
        [
          "两个孩子或一名成人",
          "减少同时要管理的行李、牵手和车票。",
          "因为车程短就加一座城市。"
        ]
      ]
    },
    {
      "id": "warning",
      "type": "callout",
      "tone": "warning",
      "title": "无障碍条件必须逐点核实",
      "body": "车站、入口、景区和临时施工的条件都不同。应确认具体地点并准备抱行备用方案，不能承诺全国都方便推车。"
    },
    {
      "id": "method-heading",
      "type": "heading",
      "level": 2,
      "text": "搭建亲子路线"
    },
    {
      "id": "method",
      "type": "list",
      "ordered": true,
      "items": [
        "写下孩子不可妥协的睡眠与吃饭时间。",
        "每次换乘都计算成人、行李、推车和空着的手。",
        "按每天的摩擦成本选酒店，不只看景点距离。",
        "每次大移动后留一个弹性恢复时段。",
        "超载时先删一个基地，不要压缩每一天。"
      ]
    },
    {
      "id": "cut-heading",
      "type": "heading",
      "level": 2,
      "text": "先删移动，不删休息"
    },
    {
      "id": "cut-rule",
      "type": "paragraph",
      "text": "如果路线过载，先删掉那座只为一项活动却要换酒店的城市。不要为了保护城市清单，牺牲午睡、吃饭和离境前缓冲。"
    },
    {
      "id": "scope",
      "type": "callout",
      "tone": "neutral",
      "title": "没有通用年龄模板",
      "body": "同龄孩子的旅行状态也不同。本文需要结合你家孩子的作息、行动能力和最新票务规则，不输出照抄的亲子行程。"
    },
    {
      "id": "help-cta",
      "type": "callout",
      "tone": "decision",
      "title": "需要人工检查亲子路线？",
      "body": "留下日期、人数与年龄、大致预算和考虑中的城市。"
    },
    {
      "id": "more-planning",
      "type": "internal-links",
      "title": "继续规划",
      "items": [
        {
          "label": "准备第一次乘中国高铁",
          "href": "/guides/china-high-speed-train-first-time-guide/",
          "description": "路线确定后再处理证件、车票与车站流程。"
        },
        {
          "label": "选择真正方便交通的酒店",
          "href": "/guides/china-hotel-near-metro/",
          "description": "减少每天步行与换乘，而不只看地图距离。"
        },
        {
          "label": "检查真正可用的游览日",
          "href": "/guides/is-your-china-itinerary-too-rushed/",
          "description": "如实扣除抵达、交通与恢复时间。"
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "已核对的官方来源",
      "items": [
        {
          "label": "铁路儿童票规则",
          "url": "https://kyfw.12306.cn/otn/gonggao/children.html",
          "publisher": "China Railway 12306",
          "reviewedAt": "2026-08-12"
        }
      ]
    }
  ]
} satisfies StructuredPageBody;

export default body;
