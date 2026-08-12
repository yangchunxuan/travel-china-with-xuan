import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "lead-answer",
      "type": "lead",
      "text": "两段票价相加更低，不代表自助转机真的便宜。民航局提示，非联程航班通常分别独立出票并适用各自条件。要把节省金额与第一段变动时可能损失的后续机票、酒店、景点和国际离境一起比较。"
    },
    {
      "id": "decision-frame",
      "type": "comparison",
      "title": "计算三个层次",
      "columns": [
        {
          "heading": "现金节省",
          "body": "使用包含行李和选座后的最终支付额。"
        },
        {
          "heading": "失败敞口",
          "body": "加上所有依赖第二段成行的不可退价值。"
        },
        {
          "heading": "恢复时间",
          "body": "检查路线中是否有更晚航班或可接受的一晚。"
        }
      ]
    },
    {
      "id": "evidence-heading",
      "type": "heading",
      "level": 2,
      "text": "保障缺口是明确存在的"
    },
    {
      "id": "evidence",
      "type": "paragraph",
      "text": "民航局提示，分别出票的非联程航班通常形成两个或以上运输合同，一段变化不会自动改变另一段；每张票适用对应承运人的条件。这支持保守判断，但不能推出全国统一的安全转机分钟数。"
    },
    {
      "id": "decision-table",
      "type": "table",
      "caption": "什么时候节省才真实",
      "columns": [
        "情况",
        "默认判断",
        "原因"
      ],
      "rows": [
        [
          "同机场、手提行李、次日弹性",
          "可能成立。",
          "失败步骤少，暴露价值低。"
        ],
        [
          "托运行李或航站楼不确定",
          "需要很宽缓冲。",
          "提取、重托运和截止时间增加依赖。"
        ],
        [
          "跨机场或衔接国际离境",
          "优先过夜或联程保障。",
          "地面交通与高损失上限让恢复很弱。"
        ]
      ]
    },
    {
      "id": "warning",
      "type": "callout",
      "tone": "warning",
      "title": "不要借用航空公司的最短衔接时间",
      "body": "公布的最短时间可能只适用于受保障的联程票和特定航站楼流程，不能证明两张独立票安全。"
    },
    {
      "id": "method-heading",
      "type": "heading",
      "level": 2,
      "text": "做一次自助转机检验"
    },
    {
      "id": "method",
      "type": "list",
      "ordered": true,
      "items": [
        "确认两段是否在同一张联程票上。",
        "列出行李提取、入境、航站楼和跨机场步骤。",
        "加总错过第二段会失效的所有预订价值。",
        "找到最后一班可接受的恢复航班。",
        "若损失上限高于节省，改为过夜。"
      ]
    },
    {
      "id": "cut-heading",
      "type": "heading",
      "level": 2,
      "text": "应该先删什么"
    },
    {
      "id": "cut-rule",
      "type": "paragraph",
      "text": "先删自助转机，不要删国际离境缓冲。小幅票价节省不值得把整个旅程押在一次无保障抵达上。"
    },
    {
      "id": "scope",
      "type": "callout",
      "tone": "neutral",
      "title": "没有全国统一安全缓冲",
      "body": "答案取决于机场、行李、护照、航站楼、承运人与日期；本文不读取实时航班，也不提供法律意见。"
    },
    {
      "id": "help-cta",
      "type": "callout",
      "tone": "decision",
      "title": "需要人工检查风险敞口？",
      "body": "留下日期、人数、大致预算、机场、行李情况和已遮盖个人信息的票务截图。"
    },
    {
      "id": "more-planning",
      "type": "internal-links",
      "title": "继续规划",
      "items": [
        {
          "label": "保护国际离境前最后一晚",
          "href": "/zh/guides/china-last-night-before-international-flight/",
          "description": "不要让自助转机成为离境前唯一故障点。"
        },
        {
          "label": "核对上海具体机场",
          "href": "/zh/guides/shanghai-pudong-or-hongqiao-airport/",
          "description": "跨机场不是普通转机。"
        },
        {
          "label": "比较国内机票套餐",
          "href": "/zh/guides/china-domestic-flight-fare-bundle-baggage/",
          "description": "先计入行李与改签条件，再判断是否便宜。"
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "已核对的官方来源",
      "items": [
        {
          "label": "航空旅行购票提示",
          "url": "https://app.caac.gov.cn/INDEX/HLFW/HKLXCS/",
          "publisher": "Civil Aviation Administration of China",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "公共航空运输旅客服务管理规定",
          "url": "https://www.caac.gov.cn/XXGK/XXGK/MHGZ/202103/t20210315_206814.html",
          "publisher": "Civil Aviation Administration of China",
          "reviewedAt": "2026-08-12"
        }
      ]
    }
  ]
} satisfies StructuredPageBody;

export default body;
