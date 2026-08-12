import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "lead",
      "type": "lead",
      "text": "斗拱是许多中国木建筑中位于柱头与屋架之间的层叠构件。它只是整套构架的一部分，不是装饰标志，也不是让所有古建绝对抗震的魔法。"
    },
    {
      "id": "answer",
      "type": "callout",
      "title": "追踪受力路径",
      "body": "先退后找柱网，再沿柱向上看梁、斗拱、檩和屋面。靠近观察节点，但不要假定每块彩绘木件承担同样的力。",
      "tone": "decision"
    },
    {
      "id": "matrix",
      "type": "table",
      "caption": "追踪受力路径",
      "columns": [
        "构件",
        "问题",
        "不要假定"
      ],
      "rows": [
        [
          "台基与柱",
          "开间柱网从哪里开始？",
          "墙承担全部重量"
        ],
        [
          "梁与枋",
          "哪些水平构件连接柱？",
          "每根梁都是原件"
        ],
        [
          "斗拱",
          "怎样出挑或传递荷载？",
          "各时代作用完全一样"
        ],
        [
          "檩与椽",
          "屋面怎样被承托？",
          "只靠斗拱支撑"
        ]
      ]
    },
    {
      "id": "workflow",
      "type": "list",
      "ordered": true,
      "items": [
        "先读年代与修缮说明。",
        "拍完整立面。",
        "沿一个转角向上追踪。",
        "比较明间与转角。",
        "询问原构、修补和复原。"
      ]
    },
    {
      "id": "warning",
      "type": "callout",
      "title": "抗震必须有边界",
      "body": "柔性咬合的木构体系可以形成韧性，但不能证明某座建筑今天必然安全，也不能把效果只归给斗拱。",
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
      "title": "继续读建筑遗产",
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
          "label": "Chinese timber-framed architectural craftsmanship",
          "url": "https://ich.unesco.org/en/RL/chinese-traditional-architectural-craftsmanship-for-timber-framed-structures-00223?RL=00223",
          "publisher": "UNESCO Intangible Cultural Heritage",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Wooden Structures of Liao Dynasty tentative-list entry",
          "url": "https://whc.unesco.org/en/tentativelists/5803/",
          "publisher": "UNESCO World Heritage Centre",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Hero: Fogong temple corner dougong by Gisling, CC BY 3.0; cropped",
          "url": "https://commons.wikimedia.org/wiki/File:Fogong_temple_corner_dougong.JPG",
          "publisher": "Wikimedia Commons",
          "reviewedAt": "2026-08-12"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;
export default body;

