import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "lead-answer",
      "type": "lead",
      "text": "如果能从走廊一端进入、另一端离开，南京—苏州—上海—杭州或反向是较干净的铁路串联。若国际航班都在上海，一个基地可能更轻松，但要先算重复进站成本。车上时间最短，不等于旅行日最短。"
    },
    {
      "id": "decision-frame",
      "type": "comparison",
      "title": "先选路线结构",
      "columns": [
        {
          "heading": "单向串联",
          "body": "异地进出能消除返回上海时最有价值。"
        },
        {
          "heading": "以上海为基地",
          "body": "少换酒店比反复去车站更重要时成立。"
        },
        {
          "heading": "两段混合",
          "body": "只换一次基地，再安排一次明确的当天往返。"
        }
      ]
    },
    {
      "id": "evidence-heading",
      "type": "heading",
      "level": 2,
      "text": "车站地理会改变答案"
    },
    {
      "id": "evidence",
      "type": "paragraph",
      "text": "上海有多个大型铁路客站，具体使用哪一个取决于车次与酒店位置；苏州也不只有一个铁路落点。全国地图上很紧凑的路线，仍可能在市内接驳上损失大量时间，所以应比较门到门交通块，而不是宣传页上的车程。"
    },
    {
      "id": "decision-table",
      "type": "table",
      "caption": "三种结构的隐藏成本",
      "columns": [
        "结构",
        "优势",
        "隐藏成本"
      ],
      "rows": [
        [
          "南京 → 苏州 → 上海 → 杭州",
          "门户合适时不走回头路。",
          "每城住宿会产生三次换酒店。"
        ],
        [
          "以上海为基地",
          "只住一家酒店，行李简单。",
          "重复进站并受返程车次约束。"
        ],
        [
          "两个基地",
          "兼顾行李稳定和区域覆盖。",
          "分界必须有理由，不能机械平分晚数。"
        ]
      ]
    },
    {
      "id": "warning",
      "type": "callout",
      "tone": "warning",
      "title": "不要把四个车站名当成四个完整游览日",
      "body": "实时车次与停靠站会变化。要在12306核对具体始发、到达站，并把两端酒店接驳都算进去。"
    },
    {
      "id": "method-heading",
      "type": "heading",
      "level": 2,
      "text": "五步检验路线"
    },
    {
      "id": "method",
      "type": "list",
      "ordered": true,
      "items": [
        "固定实际上海机场和可用的其他门户。",
        "把南京与杭州放在走廊两端比较。",
        "判断苏州需要住宿还是一次集中游览。",
        "用时间而不只用钱计算每次换酒店。",
        "分配晚数前先保留强制折返更少的结构。"
      ]
    },
    {
      "id": "cut-heading",
      "type": "heading",
      "level": 2,
      "text": "塞不下时删什么"
    },
    {
      "id": "cut-rule",
      "type": "paragraph",
      "text": "先删理由最弱的住宿，不是删知名度最低的城市。苏州有时适合集中游览；若南京或杭州的重点分散，则更需要作为基地。删减取决于活动与门户。"
    },
    {
      "id": "scope",
      "type": "callout",
      "tone": "neutral",
      "title": "这是路线框架",
      "body": "本文不提供四城逐日安排、不读取实时车次，也不把某城固定写成当天往返。"
    },
    {
      "id": "help-cta",
      "type": "callout",
      "tone": "decision",
      "title": "需要人工检查路线几何？",
      "body": "留下日期、人数、大致预算、酒店偏好和航班机场，我们可以人工复核。"
    },
    {
      "id": "more-planning",
      "type": "internal-links",
      "title": "继续规划",
      "items": [
        {
          "label": "规划上海—杭州交通",
          "href": "/zh/guides/shanghai-hangzhou-transport-route/",
          "description": "城市顺序确定后再选车站。"
        },
        {
          "label": "理解苏州园林的游览方式",
          "href": "/zh/guides/how-to-read-a-suzhou-garden/",
          "description": "先明确苏州体验，再决定是否住宿。"
        },
        {
          "label": "选择浦东还是虹桥机场",
          "href": "/zh/guides/shanghai-pudong-or-hongqiao-airport/",
          "description": "实际机场可能改变最佳方向。"
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "已核对的官方来源",
      "items": [
        {
          "label": "上海铁路客站指南",
          "url": "https://english.shanghai.gov.cn/en-Transportation/20250126/484b92f86eeb49d7b26086d25010d782.html",
          "publisher": "Shanghai Municipal Government",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "苏州铁路网络资料",
          "url": "https://jtj.suzhou.gov.cn/szjt/tjgl/202501/4cbd95cd41d747d98bc277a1916c1ad7.shtml",
          "publisher": "Suzhou Transport Bureau",
          "reviewedAt": "2026-08-12"
        }
      ]
    }
  ]
} satisfies StructuredPageBody;

export default body;
