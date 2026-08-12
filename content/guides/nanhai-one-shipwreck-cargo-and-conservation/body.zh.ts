import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "lead",
      "type": "lead",
      "text": "南海Ⅰ号既是沉船遗址，也是货物与船上生活的组合，还是持续进行的保护项目。只数“宝物”会遮住真正有历史价值的关系。"
    },
    {
      "id": "answer",
      "type": "callout",
      "title": "读关系，不读一个数字",
      "body": "把发现与整体打捞，和船体位置、货物组合、个人物品、保护过程连接起来；任何总数都要注明日期。",
      "tone": "decision"
    },
    {
      "id": "matrix",
      "type": "table",
      "caption": "读关系，不读一个数字",
      "columns": [
        "层次",
        "问题",
        "不能推断"
      ],
      "rows": [
        [
          "船体",
          "哪些结构与空间关系留存？",
          "一艘完整静止的船"
        ],
        [
          "货物",
          "陶瓷、金属与物资怎样共存？",
          "所有物品目的地相同"
        ],
        [
          "人员",
          "有哪些生活与工作物品？",
          "无证据识别具体人物"
        ],
        [
          "保护",
          "当前展示、处理或监测什么？",
          "状态永远不变"
        ]
      ]
    },
    {
      "id": "workflow",
      "type": "list",
      "ordered": true,
      "items": [
        "读当前展览通知。",
        "找到船体与保护空间。",
        "按位置比较货物。",
        "区分贸易品、设备与个人物品。",
        "核对任何总数的发布日期。"
      ]
    },
    {
      "id": "warning",
      "type": "callout",
      "title": "保护是动态过程",
      "body": "发掘、脱盐、加固、研究与展陈会继续变化。2019年的馆藏数字是历史记录，不是自动更新的当前总数。",
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
          "label": "Nanhai No. 1 Maritime Silk Road Museum",
          "url": "https://www.yangjiang.gov.cn/yjsywb/tourism/nanhaino1maritimesilkroadmuseum/",
          "publisher": "Yangjiang Municipal Government",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Nanhai No. 1 exhibition and research",
          "url": "https://www.gdmuseum.com/cn/col48/15353",
          "publisher": "Guangdong Museum",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Hero: Maritime Silk Road Museum by WKDx417, CC BY-SA 4.0; cropped",
          "url": "https://commons.wikimedia.org/wiki/File:Maritime_Silk_Road_Museum_of_Guangdong.jpg",
          "publisher": "Wikimedia Commons",
          "reviewedAt": "2026-08-12"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;
export default body;

