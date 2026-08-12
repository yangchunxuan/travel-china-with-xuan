import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "lead",
      "type": "lead",
      "text": "“过早”是武汉人处理早餐的日常方式，不是一次吃遍所有名小吃的任务。选一个主食、一个共享小食和一杯饮品，够吃就停。"
    },
    {
      "id": "answer",
      "type": "callout",
      "title": "先选早餐结构",
      "body": "热干面是浓郁芝麻酱拌面；三鲜豆皮是豆蛋皮包糯米馅；面窝是米豆浆油炸圈。两人先各点一份主食，只共享一种加餐。",
      "tone": "decision"
    },
    {
      "id": "matrix",
      "type": "table",
      "caption": "先选早餐结构",
      "columns": [
        "食物",
        "角色",
        "怎么问"
      ],
      "rows": [
        [
          "热干面",
          "主食碗",
          "趁热拌匀，确认辣椒"
        ],
        [
          "三鲜豆皮",
          "扎实共享小份",
          "有小份就先点小份"
        ],
        [
          "面窝",
          "油炸口感对比",
          "先买一个新鲜的"
        ],
        [
          "饮品或清汤",
          "缓冲",
          "确认是否加糖"
        ]
      ]
    },
    {
      "id": "workflow",
      "type": "list",
      "ordered": true,
      "items": [
        "尽量早上去，单店可能售罄。",
        "指菜名和数量，不只给照片。",
        "明确能否吃辣。",
        "先共享，再决定加单。",
        "保留店名并准备第二支付方式。"
      ]
    },
    {
      "id": "warning",
      "type": "callout",
      "title": "没有全国统一的收摊时间",
      "body": "开门与售罄时间随门店和日期变化；地图营业状态只是线索。",
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
          "label": "Wuhan breakfast culture",
          "url": "https://english.wuhan.gov.cn/H_1/NWP/202601/t20260128_2719906.shtml",
          "publisher": "Wuhan Municipal Government",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Wuhan food introduction",
          "url": "https://english.wuhan.gov.cn/H_1/NWP/202309/t20230921_2268292.shtml",
          "publisher": "Wuhan Municipal Government",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Hero: Hot Dry Noodles by ZhengZhou, CC BY-SA 4.0; cropped",
          "url": "https://commons.wikimedia.org/wiki/File:Hot_Dry_Noodles.jpg",
          "publisher": "Wikimedia Commons",
          "reviewedAt": "2026-08-12"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;
export default body;

