import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "lead",
      "type": "lead",
      "text": "青铜礼器不只是装饰华丽的容器。器形、耳足、纹饰、铸造和铭文可能指向饮食、礼仪、家族记忆与事件，但必须有标签和研究支持。"
    },
    {
      "id": "answer",
      "type": "callout",
      "title": "按四遍来读",
      "body": "先认器形，再判断可能任务，然后观察纹饰布局，最后读机构铭文释文。目测相似不能代替来源和古文字研究。",
      "tone": "decision"
    },
    {
      "id": "matrix",
      "type": "table",
      "caption": "按四遍来读",
      "columns": [
        "层次",
        "问题",
        "边界"
      ],
      "rows": [
        [
          "器形",
          "鼎、簋、爵、尊还是其他器类？",
          "具体年代和使用仍会不同"
        ],
        [
          "功能",
          "盛食、液体、加热还是陈设？",
          "礼仪和随葬用途可能重叠"
        ],
        [
          "纹饰",
          "兽面、动物和扉棱在哪里？",
          "现代名称不是古人的解释"
        ],
        [
          "铭文",
          "铸在哪里，释文说什么？",
          "短族徽与长篇记录是不同证据"
        ]
      ]
    },
    {
      "id": "workflow",
      "type": "list",
      "ordered": true,
      "items": [
        "读完标签和年代范围。",
        "允许时换角度观察。",
        "先找口、耳、足，再看纹饰。",
        "把拓片与释文对照。",
        "比较另一类器形。"
      ]
    },
    {
      "id": "warning",
      "type": "callout",
      "title": "漂亮表面不等于可靠来源",
      "body": "拍卖说明与未核验帖子不能证明出土语境、真伪或铭文释读。",
      "tone": "warning"
    },
    {
      "id": "help",
      "type": "callout",
      "title": "Homeground",
      "body": "把计划参观地点发给 Homeground。本地真人可连接当前展陈与可见证据，不制造确定性。",
      "tone": "decision"
    },
    {
      "id": "links",
      "type": "internal-links",
      "title": "继续文化遗产阅读",
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
          "label": "Ancient Chinese bronzes",
          "url": "https://www.shanghaimuseum.cn/mu/frontend/pg/article/id/RI00004046",
          "publisher": "Shanghai Museum",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Bronze civilization exhibition",
          "url": "https://en.chnmuseum.cn/exhibition/traveling_exhibitions/202112/t20211230_253354.html",
          "publisher": "National Museum of China",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Hero: Early Western Zhou Bronze Gui by Gary Todd, CC0; cropped",
          "url": "https://commons.wikimedia.org/wiki/File:Early_Western_Zhou_Bronze_Gui_(47409866492).jpg",
          "publisher": "Wikimedia Commons",
          "reviewedAt": "2026-08-12"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;
export default body;

