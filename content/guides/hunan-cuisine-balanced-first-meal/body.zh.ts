import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "lead",
      "type": "lead",
      "text": "湘菜常从“辣”开始介绍，但第一顿共享餐更需要鲜椒、酸腌、烟熏、蒸菜和蔬菜形成对比。"
    },
    {
      "id": "answer",
      "type": "callout",
      "title": "点层次，不点十种辣椒",
      "body": "三至四人先点一道代表性荤菜、一道蒸或焖菜、一道蔬菜或豆腐和米饭；全桌愿意再加烟熏或酸味。",
      "tone": "decision"
    },
    {
      "id": "matrix",
      "type": "table",
      "caption": "点层次，不点十种辣椒",
      "columns": [
        "位置",
        "方向",
        "平衡问题"
      ],
      "rows": [
        [
          "鲜辣",
          "鲜椒肉或鱼",
          "能否只让一道菜承担主辣？"
        ],
        [
          "酸腌",
          "泡椒或腌菜",
          "是否同时很咸？"
        ],
        [
          "烟熏腊味",
          "腊肉类",
          "搭配清淡菜"
        ],
        [
          "缓冲",
          "蒸蛋、豆腐或青菜",
          "明确少辣"
        ]
      ]
    },
    {
      "id": "workflow",
      "type": "list",
      "ordered": true,
      "items": [
        "告诉服务员谁不能吃辣，而不只说偏好。",
        "使用“微辣”“少放辣椒”“完全不辣”，但接受厨房差异。",
        "过敏必须单独说明；不辣不是过敏控制。",
        "第一轮就点米饭和蔬菜。",
        "全桌尝过后再加单。"
      ]
    },
    {
      "id": "warning",
      "type": "callout",
      "title": "湘菜并非每道同样辣",
      "body": "地区、家庭、餐厅与厨师都会不同。少辣可能改变菜品，也不能保证零辣、无辣油接触或过敏原隔离。",
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
          "label": "Hunan cuisine traditions",
          "url": "https://hunan.gov.cn/topic/ccjhl/djz/202107/t20210716_19935053.html",
          "publisher": "Hunan Provincial Government",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Hunan delicacies and methods",
          "url": "https://whhlyt.hunan.gov.cn/whhlyt/english/Culture/Delicacies/202403/t20240315_33249620.html",
          "publisher": "Hunan Provincial Department of Culture and Tourism",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Hero: Hunan home-style fried tofu by Huangdan2060, CC BY 3.0; cropped",
          "url": "https://commons.wikimedia.org/wiki/File:Hunan_cuisine,_Fried_Tofu,_Home_Style.jpg",
          "publisher": "Wikimedia Commons",
          "reviewedAt": "2026-08-12"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;
export default body;

