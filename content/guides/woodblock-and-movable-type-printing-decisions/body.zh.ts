import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "lead",
      "type": "lead",
      "text": "活字出现后没有简单淘汰雕版。真正有用的比较是流程：刻制或选字、排版、校改、印刷、保存与重印。"
    },
    {
      "id": "answer",
      "type": "callout",
      "title": "比较任务，不选赢家",
      "body": "雕版能保存稳定版面反复印刷；活字可以重组文字，却需要庞大有序的字库和细致排版。",
      "tone": "decision"
    },
    {
      "id": "matrix",
      "type": "table",
      "caption": "比较任务，不选赢家",
      "columns": [
        "决策",
        "雕版",
        "活字"
      ],
      "rows": [
        [
          "准备",
          "整页雕刻",
          "选字并排版"
        ],
        [
          "校改",
          "挖补或重刻",
          "换字并重排"
        ],
        [
          "保存",
          "存整页版片",
          "分类保存活字"
        ],
        [
          "重印",
          "复用同一版面",
          "拆版后需重排"
        ]
      ]
    },
    {
      "id": "workflow",
      "type": "list",
      "ordered": true,
      "items": [
        "找到实物版片或字盘。",
        "确认原件、复制品或演示品。",
        "追踪从文字到印张的流程。",
        "询问服务哪类书或记录。",
        "不要写成单线替代史。"
      ]
    },
    {
      "id": "warning",
      "type": "callout",
      "title": "活态实践不等于全部历史",
      "body": "UNESCO 瑞安木活字项目记录的是今天仍传承的宗谱印刷实践，不能证明历史上所有作坊工具和流程相同。",
      "tone": "warning"
    },
    {
      "id": "help",
      "type": "callout",
      "title": "Homeground",
      "body": "发来日期与地点，本地真人可核对当前开放、展陈或节目，不承诺未核实条件。",
      "tone": "decision"
    },
    {
      "id": "links",
      "type": "internal-links",
      "title": "继续规划",
      "items": [
        {
          "label": "广州早茶怎么运作",
          "href": "/zh/guides/how-guangzhou-morning-tea-works/"
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
          "label": "Wooden movable type printing of China",
          "url": "https://ich.unesco.org/en/usl/wooden-movable-type-printing-of-china-00322",
          "publisher": "UNESCO Intangible Cultural Heritage",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "China Printing Museum introduction",
          "url": "https://english.visitbeijing.com.cn/article/47OMvX0dE0F",
          "publisher": "Beijing Municipal Culture and Tourism Bureau",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Hero: wooden movable types by Popolon, CC BY-SA 4.0; cropped",
          "url": "https://commons.wikimedia.org/wiki/File:Beijing_printing_museum.wooden_movable_types.jpg",
          "publisher": "Wikimedia Commons",
          "reviewedAt": "2026-08-12"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;
export default body;

