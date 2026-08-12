import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "lead-answer",
      "type": "lead",
      "text": "搜索页上最低的国内票价，未必是最低的可用成本。民航局提醒旅客仔细阅读退票、改期和行李规则，因为不同产品条件不同。所有选项都用同一篮子比较：旅客、行李、座位需求、最终支付额，以及后续预订依赖抵达时的改签成本。"
    },
    {
      "id": "decision-frame",
      "type": "comparison",
      "title": "使用同一个比较篮子",
      "columns": [
        {
          "heading": "必需项目",
          "body": "同行者真实需要携带的托运与手提行李。"
        },
        {
          "heading": "风险",
          "body": "在可能做决定的时间点看退票和改签条件。"
        },
        {
          "heading": "后续依赖",
          "body": "按时抵达所关联的酒店、列车或景点价值。"
        }
      ]
    },
    {
      "id": "evidence-heading",
      "type": "heading",
      "level": 2,
      "text": "产品条件就是价格的一部分"
    },
    {
      "id": "evidence",
      "type": "paragraph",
      "text": "中国旅客服务规则要求承运人公布涵盖退改签与行李的运输条件，但没有规定所有航空公司、所有票价都有同一免费额度。应记录具体日期和产品显示的条件，不要复制一份笼统的公司规则。"
    },
    {
      "id": "decision-table",
      "type": "table",
      "caption": "公平比较机票",
      "columns": [
        "项目",
        "记录什么",
        "不要假设"
      ],
      "rows": [
        [
          "基础价与税费",
          "同一货币的最终支付额。",
          "搜索卡片数字就是最终价。"
        ],
        [
          "行李与座位",
          "该产品为该旅客包含什么。",
          "所有经济舱额度一样。"
        ],
        [
          "退改",
          "相关时间段的手续费与价差。",
          "写着灵活就能免费改。"
        ]
      ]
    },
    {
      "id": "warning",
      "type": "callout",
      "tone": "warning",
      "title": "票价截图很快过期",
      "body": "可以保留带日期的截图用于自己的预订决策，但不要把它变成长期公开票价表；产品与条件会变化。"
    },
    {
      "id": "method-heading",
      "type": "heading",
      "level": 2,
      "text": "付款前这样比"
    },
    {
      "id": "method",
      "type": "list",
      "ordered": true,
      "items": [
        "打开具体产品条件，而不只看搜索结果。",
        "为所有同行者加入行李、座位与支付费用。",
        "按可能变更的时间点阅读退改规则。",
        "加入依赖按时抵达的预订价值。",
        "选择风险调整后的最低总成本。"
      ]
    },
    {
      "id": "cut-heading",
      "type": "heading",
      "level": 2,
      "text": "怎样省得更安全"
    },
    {
      "id": "cut-rule",
      "type": "paragraph",
      "text": "先删可选座位或不必要行李，不要先买会危及昂贵后续路线的僵硬票价。若抵达后没有固定预订，灵活性的价值可能较低；这是行程条件，不是航空公司排名。"
    },
    {
      "id": "scope",
      "type": "callout",
      "tone": "neutral",
      "title": "不提供实时票价表",
      "body": "本文不报价、不排名，也不承诺行李额度；付款前必须重查具体条件。"
    },
    {
      "id": "help-cta",
      "type": "callout",
      "tone": "decision",
      "title": "需要人工检查机票比较？",
      "body": "留下日期、人数、大致预算、行李和已匿名化的产品条款。"
    },
    {
      "id": "more-planning",
      "type": "internal-links",
      "title": "继续规划",
      "items": [
        {
          "label": "检查分开出票风险",
          "href": "/guides/china-separate-flight-tickets-self-transfer-risk/",
          "description": "便宜套餐仍可能让后续行程失去保障。"
        },
        {
          "label": "理解中国旅行成本",
          "href": "/guides/how-much-does-a-china-trip-cost/",
          "description": "把机票选择放回整体预算。"
        },
        {
          "label": "比较影响路线结构的航班",
          "href": "/guides/china-open-jaw-flights-route-planning/",
          "description": "更高票价有时能消除昂贵折返。"
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
          "label": "关于改进民航票务服务工作的通知",
          "url": "https://www.caac.gov.cn/XXGK/XXGK/ZFGW/201807/t20180717_189399.html",
          "publisher": "Civil Aviation Administration of China",
          "reviewedAt": "2026-08-12"
        }
      ]
    }
  ]
} satisfies StructuredPageBody;

export default body;
