import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "lead-answer",
      "type": "lead",
      "text": "中国并不存在全国统一的两个“平季月份”。只有当较低总成本仍能买到你专程而来的体验，平季才是好交易。同一个日期，山地路线、园林城市与热带海岸可能处在完全不同的天气与运营过渡期。"
    },
    {
      "id": "decision-frame",
      "type": "comparison",
      "title": "价值有三个面",
      "columns": [
        {
          "heading": "节省",
          "body": "计算整条路线总额，而不是一家打折酒店。"
        },
        {
          "heading": "体验",
          "body": "写清必须保住的户外通行、能见度或活动。"
        },
        {
          "heading": "弹性",
          "body": "判断关闭或坏天气是否有你真正接受的替代。"
        }
      ]
    },
    {
      "id": "evidence-heading",
      "type": "heading",
      "level": 2,
      "text": "区域差异让全国标签失效"
    },
    {
      "id": "evidence",
      "type": "paragraph",
      "text": "中国气象局资料说明，纬度、季风与地形造成明显区域差异；官方公众假期又叠加了独立的人流因素。一个日期在某地区可能是季节过渡，在全国层面却可能是集中出行期。"
    },
    {
      "id": "decision-table",
      "type": "table",
      "caption": "平季何时真正有价值",
      "columns": [
        "条件",
        "好价值",
        "假省钱"
      ],
      "rows": [
        [
          "核心活动正常运营",
          "节省可换更好位置或弹性。",
          "旅行失去最主要目的。"
        ],
        [
          "天气有替代方案",
          "室内外重点可以互换。",
          "所有重点都依赖同一种天气。"
        ],
        [
          "通过假期筛选",
          "低需求日期仍然可信。",
          "全国或地方活动推翻淡季标签。"
        ]
      ]
    },
    {
      "id": "warning",
      "type": "callout",
      "tone": "warning",
      "title": "不要承诺人少",
      "body": "需求随城市、星期、活动和具体景点变化。使用官方日期和当前预订条件，不制造拥挤指数。"
    },
    {
      "id": "method-heading",
      "type": "heading",
      "level": 2,
      "text": "检验一份平季方案"
    },
    {
      "id": "method",
      "type": "list",
      "ordered": true,
      "items": [
        "写下旅行必须实现的一项体验。",
        "核对其官方季节运营与进入规则。",
        "筛选区域气候与日照需求。",
        "叠加已公布官方假期，不猜未来日期。",
        "比较总节省与替代或取消成本。"
      ]
    },
    {
      "id": "cut-heading",
      "type": "heading",
      "level": 2,
      "text": "何时应多付钱或换路线"
    },
    {
      "id": "cut-rule",
      "type": "paragraph",
      "text": "核心体验没有可接受替代时就换日期；另一地区能以更少运营限制满足同一旅行目的时就换路线。只有两种牺牲都不重要时才保留低价。"
    },
    {
      "id": "scope",
      "type": "callout",
      "tone": "neutral",
      "title": "没有全国统一平季月份",
      "body": "本文不报实时价格、不预测人流，也不创建城市×月份页面；必须重查具体运营方与日期。"
    },
    {
      "id": "help-cta",
      "type": "callout",
      "tone": "decision",
      "title": "需要人工检查价值取舍？",
      "body": "留下日期、人数、大致预算、候选区域和绝不愿牺牲的一项体验。"
    },
    {
      "id": "more-planning",
      "type": "internal-links",
      "title": "继续规划",
      "items": [
        {
          "label": "按气候分区筛选路线",
          "href": "/guides/china-climate-regions-for-trip-timing/",
          "description": "判断一个时间窗能否保护最难的一站。"
        },
        {
          "label": "核对官方公众假期",
          "href": "/guides/china-public-holidays-travel-calendar/",
          "description": "所谓淡季可能被全国性假期完全改变。"
        },
        {
          "label": "把时间选择放回整体预算",
          "href": "/guides/how-much-does-a-china-trip-cost/",
          "description": "把交通、酒店与灵活性一起比较。"
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "已核对的官方来源",
      "items": [
        {
          "label": "中国气候概况",
          "url": "https://www.cma.gov.cn/2011xzt/2012zhuant/20120302/2012030205/201203020501/201103/t20110314_3096052.html",
          "publisher": "China Meteorological Administration",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "中国公众假期安排",
          "url": "https://www.gov.cn/zhengce/zhengceku/202511/content_7047091.htm",
          "publisher": "State Council / Homeground source record",
          "reviewedAt": "2026-08-12"
        }
      ]
    }
  ]
} satisfies StructuredPageBody;

export default body;
