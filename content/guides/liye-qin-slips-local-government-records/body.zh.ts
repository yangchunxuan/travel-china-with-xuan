import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "lead",
      "type": "lead",
      "text": "里耶秦简让帝国在县级层面可见：文书传递、粮食核算、官吏汇报。日常性正是力量，但一处档案不能代表秦代所有地方和年份。"
    },
    {
      "id": "answer",
      "type": "callout",
      "title": "先读档案，再谈帝国",
      "body": "确认迁陵县文书类型、发件者、收件者和动作，再判断行政实践，最后才放大到帝国。",
      "tone": "decision"
    },
    {
      "id": "matrix",
      "type": "table",
      "caption": "先读档案，再谈帝国",
      "columns": [
        "线索",
        "动作",
        "边界"
      ],
      "rows": [
        [
          "发收记录",
          "追踪送达",
          "一条路径不是整个网络"
        ],
        [
          "账目",
          "核算粮食或物资",
          "数字可能不完整"
        ],
        [
          "官职地名",
          "显示机构关系",
          "称谓会变"
        ],
        [
          "涂改",
          "显示真实办公",
          "一名书吏不代表所有人"
        ]
      ]
    },
    {
      "id": "workflow",
      "type": "list",
      "ordered": true,
      "items": [
        "抄下馆藏名与编号。",
        "使用机构释文。",
        "找日期、地点、官署和动词。",
        "只陈述狭窄动作。",
        "加上“此时此地”。"
      ]
    },
    {
      "id": "warning",
      "type": "callout",
      "title": "文件名不等于学术定名",
      "body": "首图英文文件名误写“Qing”，但 Commons 分类与展陈均识别为里耶秦简；正文采用机构定名。",
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
          "label": "Story of a Small Town: Qin bamboo slips from Liye",
          "url": "https://en.chnmuseum.cn/exhibition/traveling_exhibitions/202104/t20210429_249982.html",
          "publisher": "National Museum of China",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Liye Qin Slips Museum context",
          "url": "https://www.enghunan.gov.cn/hneng/Services/Live/Community/LMEH/202510/t20251030_33836965.html",
          "publisher": "Hunan Provincial Government",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Hero: Liye Qin Slips by Ddayzzz, CC BY 4.0; cropped",
          "url": "https://commons.wikimedia.org/wiki/File:Liye_Qing_Slips,_containing_%22A_set_of_envelopes_were_delivered_from_Dongting_Commandery_to_Qianling_county%22.jpg",
          "publisher": "Wikimedia Commons",
          "reviewedAt": "2026-08-12"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;
export default body;

