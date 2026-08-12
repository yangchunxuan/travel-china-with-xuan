import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "lead",
      "type": "lead",
      "text": "到佛山著名场馆不等于必然有演出。节目会变，户外表演受现场条件影响，高桩也只是其中一种形式。"
    },
    {
      "id": "answer",
      "type": "callout",
      "title": "跨城前先核对",
      "body": "通过官方渠道确认场馆、日期、场次、入场和天气预案。旧视频只能证明过去演过。",
      "tone": "decision"
    },
    {
      "id": "matrix",
      "type": "table",
      "caption": "跨城前先核对",
      "columns": [
        "核对",
        "原因",
        "恢复"
      ],
      "rows": [
        [
          "场馆",
          "祖庙、纪念馆与训练馆不同",
          "询问官方服务台"
        ],
        [
          "形式",
          "地面、巡游、高桩场地不同",
          "接受节目调整"
        ],
        [
          "天气",
          "湿滑与大风影响器械",
          "准备博物馆替代"
        ],
        [
          "视角",
          "前排可能看不全桩阵",
          "同时看到演员与乐队"
        ]
      ]
    },
    {
      "id": "workflow",
      "type": "list",
      "ordered": true,
      "items": [
        "辨认头部与后部演员。",
        "观察眼、口和头部动作。",
        "把鼓锣钹与停顿、落点对应。",
        "看高桩时关注试距与重心转移。",
        "留在围栏外。"
      ]
    },
    {
      "id": "warning",
      "type": "callout",
      "title": "高桩不是游客体验",
      "body": "桩高、间距与安全属于训练团队；本文只教观看，不教模仿。",
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
          "label": "Lion dance (Guangdong awakening lion)",
          "url": "https://www.ihchina.cn/project_details/12870",
          "publisher": "China Intangible Cultural Heritage",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Foshan Ancestral Temple Museum",
          "url": "https://www.fszumiao.cn/",
          "publisher": "Foshan Ancestral Temple Museum",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Hero: Foshan lion-dance show by Lukwo RuoShuma Simonz, CC BY-SA 4.0; cropped",
          "url": "https://commons.wikimedia.org/wiki/File:GD_%E5%BB%A3%E6%9D%B1_Guangdong_FS_%E4%BD%9B%E5%B1%B1_Foshan_%E5%8D%97%E6%B5%B7%E5%8D%80_Nanhai_%E8%A5%BF%E6%A8%B5%E5%B1%B1_Xiqiao_Mountain_%E9%BB%83%E9%A3%9B%E9%B4%BB%E7%8D%85%E8%97%9D%E6%AD%A6%E8%A1%93%E9%A4%A8_Wong_Fei-hong_Lion_Dance_%26_Martial_Arts_School_%E6%93%8D%E5%A0%B4_playground_square_red_%E8%A1%A8%E6%BC%94_show_time_June_2023_Px3_26.jpg",
          "publisher": "Wikimedia Commons",
          "reviewedAt": "2026-08-12"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;
export default body;

