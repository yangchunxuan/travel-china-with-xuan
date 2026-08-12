import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "lead",
      "type": "lead",
      "text": "周城扎染体验的价值在于你实际完成了什么，而不只是得到一块上镜的蓝布。先问每一步由谁完成、使用什么染料、何时能取件。"
    },
    {
      "id": "answer",
      "type": "callout",
      "title": "选过程，不只选花样",
      "body": "有意义的流程包括设计、缝扎或捆扎防染、浸染、接触空气氧化、清洗和拆线。短体验可能预制或省略步骤，只要事先说明即可。",
      "tone": "decision"
    },
    {
      "id": "matrix",
      "type": "table",
      "caption": "选过程，不只选花样",
      "columns": [
        "核对",
        "该问什么",
        "原因"
      ],
      "rows": [
        [
          "参与",
          "哪些步骤由我自己做？",
          "区分演示与制作"
        ],
        [
          "染料",
          "天然靛蓝、合成染料还是混用？",
          "不能仅凭蓝色推断材料"
        ],
        [
          "次数",
          "能完成几次浸染与氧化？",
          "色深与流程相关"
        ],
        [
          "取件",
          "今天能否洗净晾干？",
          "保护后续行程"
        ]
      ]
    },
    {
      "id": "workflow",
      "type": "list",
      "ordered": true,
      "items": [
        "付款前确认时长与取件。",
        "选择能完成的布料大小。",
        "染前拍下扎结状态。",
        "遵守手套与染缸规则。",
        "询问成品洗护方法。"
      ]
    },
    {
      "id": "warning",
      "type": "callout",
      "title": "传统不等于统一配方",
      "body": "白族扎染是有记录的非遗实践，但作坊、染料、纹样与游客流程会变化；不能只凭装修判断“正宗”。",
      "tone": "warning"
    },
    {
      "id": "help",
      "type": "callout",
      "title": "Homeground",
      "body": "发来日期、人数与限制，本地真人可核对实际饮食或手作方案，不把单一场馆写成全国规则。",
      "tone": "decision"
    },
    {
      "id": "links",
      "type": "internal-links",
      "title": "继续规划",
      "items": [
        {
          "label": "在中国吃第一顿共享餐",
          "href": "/zh/guides/first-shared-meal-in-china/"
        },
        {
          "label": "外国游客在中国怎么付款",
          "href": "/zh/guides/how-to-pay-in-china-as-a-tourist/"
        },
        {
          "label": "你的行程是否太赶",
          "href": "/zh/guides/is-your-china-itinerary-too-rushed/"
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "官方来源与图片署名",
      "items": [
        {
          "label": "Bai tie-dye technique",
          "url": "https://www.ihchina.cn/project_details/14304.html",
          "publisher": "China Intangible Cultural Heritage",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Bai tie-dye context",
          "url": "https://www.ynich.cn/item/91.html",
          "publisher": "Yunnan Intangible Cultural Heritage Protection Centre",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Hero still: China News Service Zhoucheng tie-dye video, CC BY 4.0; cropped",
          "url": "https://commons.wikimedia.org/wiki/File:2020%E5%B9%B45%E6%9C%885%E6%97%A5_%E6%9C%80%E7%88%B1%E5%A4%A7%E7%90%86%E7%9A%84%E9%82%A3%E2%80%9C%E4%B8%80%E6%8A%B9%E8%93%9D%E2%80%9D_%E6%9D%A5%E7%9C%8B%E7%99%BD%E6%97%8F%E6%89%8E%E6%9F%93%E5%A6%82%E4%BD%95%E5%88%B6%E6%88%90.webm",
          "publisher": "Wikimedia Commons",
          "reviewedAt": "2026-08-12"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;
export default body;

