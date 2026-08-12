import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "lead",
      "type": "lead",
      "text": "只看轮廓，是误读红山玉器最快的方式。形制重要，但出土地点、墓中位置、伴出器物，以及博物馆对结论有多大把握，往往更重要。"
    },
    {
      "id": "answer",
      "type": "callout",
      "title": "从证据向外读",
      "body": "先确认标签和来源，再描述材质与形制，然后追问考古语境真正支持什么。把“玉猪龙”等现代命名和宏大象征放到最后。",
      "tone": "decision"
    },
    {
      "id": "passes-heading",
      "type": "heading",
      "level": 2,
      "text": "围绕一件玉器读四遍"
    },
    {
      "id": "passes",
      "type": "table",
      "caption": "围绕一件玉器读四遍",
      "columns": [
        "层次",
        "看什么",
        "支持什么"
      ],
      "rows": [
        [
          "身份",
          "馆名、年代、出土地与藏品号",
          "机构展示哪件器物及其定名"
        ],
        [
          "形制",
          "孔洞、弧线、穿孔、边缘与抛光",
          "器物如何被观看或悬挂"
        ],
        [
          "语境",
          "墓葬、人体位置与伴出物",
          "对埋藏和社会差异作有限判断"
        ],
        [
          "比较",
          "有可靠出土记录的同类器",
          "识别模式，而非固定含义"
        ]
      ]
    },
    {
      "id": "workflow",
      "type": "list",
      "ordered": true,
      "items": [
        "先记录完整标签，再拍细节。",
        "确认科学发掘、征集、捐赠或未说明出土地。",
        "读解释牌前先写肉眼特征。",
        "比较不同出土语境的器物。",
        "保留没有答案的问题。"
      ]
    },
    {
      "id": "status",
      "type": "callout",
      "title": "预备名单不是正式列入",
      "body": "UNESCO 页面是中国2013年提交的世界遗产预备名单材料，并非已列入《世界遗产名录》；价值论证仍是提交国的主张。",
      "tone": "warning"
    },
    {
      "id": "help",
      "type": "callout",
      "title": "Homeground",
      "body": "告诉 Homeground 博物馆与考古兴趣。本地真人可围绕当前有标签的器物设计动线，不制造没有证据的确定性。",
      "tone": "decision"
    },
    {
      "id": "links",
      "type": "internal-links",
      "title": "继续谨慎理解中国",
      "items": [
        {
          "label": "读懂一座苏州园林",
          "href": "/zh/guides/how-to-read-a-suzhou-garden/"
        },
        {
          "label": "自由行参观兵马俑",
          "href": "/zh/guides/terracotta-warriors-without-tour/"
        },
        {
          "label": "中国旅行需要导游吗",
          "href": "/zh/guides/do-you-need-a-tour-guide-in-china/"
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "机构来源与图片署名",
      "items": [
        {
          "label": "Sites of Hongshan Culture tentative-list entry",
          "url": "https://whc.unesco.org/en/tentativelists/5804/",
          "publisher": "UNESCO World Heritage Centre",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Hongshan culture exhibition",
          "url": "https://en.chnmuseum.cn/exhibition/exhibition_series/temporary_exhibitions/selected_historical_artifacts_exhibitions/202010/t20201016_247873.html",
          "publisher": "National Museum of China",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Hero: Hongshan Jade Dragon 2 by Gary Todd, CC0; cropped",
          "url": "https://commons.wikimedia.org/wiki/File:Hongshan_Jade_Dragon_2.jpg",
          "publisher": "Wikimedia Commons",
          "reviewedAt": "2026-08-12"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;
export default body;

