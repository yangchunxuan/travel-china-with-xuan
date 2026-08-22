import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "answer-first",
      "type": "lead",
      "text": "在交通枢纽、景点、商场、公园或有工作人员的公共设施寻找分性别、通用/家庭或无障碍厕所标准图形，并在变得紧急前就询问。进门后先查看可用厕位，选择自己能安全使用的类型。纸巾、洗手液、挂架和垃圾桶会因地点而异，随身带纸巾、免洗洗手液和小垃圾袋。"
    },
    {
      "id": "quick-answer",
      "type": "callout",
      "title": "简短答案",
      "body": "蹲厕通常面向凸起遮挡或管道端，双脚完整踩在防滑踏面上，并把衣物收好离地。若平衡、关节、身体状态、衣物或行李让下蹲不安全，就选坐厕。绝不能站到坐便器座圈上。无障碍或家庭卫生间应优先留给需要其设施的人。",
      "tone": "decision"
    },
    {
      "id": "matrix-heading",
      "type": "heading",
      "level": 2,
      "text": "进入前选择合适厕位"
    },
    {
      "id": "decision-matrix",
      "type": "table",
      "caption": "安全选择取决于现场器具、地面和个人行动能力。",
      "columns": [
        "选项",
        "适合情况",
        "先检查",
        "不要做"
      ],
      "rows": [
        [
          "蹲厕",
          "能稳定下蹲和起身",
          "地面干燥、防滑，门锁和冲水可用，有处放物",
          "踩光滑边缘、猜方向或把散物放地上"
        ],
        [
          "坐厕",
          "需要或偏好坐姿",
          "座圈稳定清洁、冲水可用、行李有安全位置",
          "站立或蹲在座圈上"
        ],
        [
          "无障碍厕所",
          "需要扶手、回转空间、低位设施或陪护",
          "是否有人、紧急拉绳位置、房间是否开放",
          "当作行李间，或有其他可用厕位时长期占用"
        ],
        [
          "家庭/通用卫生间",
          "陪护、儿童或隐私需求适用",
          "现场标识、门锁和换护设施",
          "假设每个车站或公园都有"
        ]
      ]
    },
    {
      "id": "workflow-heading",
      "type": "heading",
      "level": 2,
      "text": "寻找、检查、使用、离开"
    },
    {
      "id": "workflow",
      "type": "list",
      "ordered": true,
      "items": [
        "不要等到非常急才找。向工作人员展示‘公共卫生间/洗手间在哪里？’，并以当前实体标识为准，不只依赖旧地图点。",
        "入口处查看分性别、无障碍、家庭、排队或临时关闭标识。有管理员时遵循现场排队和收费说明，不假设一定免费或有人值守。",
        "关门前检查门锁、地面、器具类型、冲水、纸巾/垃圾桶和干燥挂架或置物板。脚下或门锁不安全就换一间。",
        "收好手机、护照、衣带和衣物下摆。行李放上挂架、置物板或由同伴拿着，不把贵重物品放湿地或水箱。",
        "使用蹲厕时，双脚完全踩在标记/防滑踏面，面向凸起或管道端，只下蹲到平衡允许程度，并仅使用设计为支撑的墙面或扶手，不抓松动管线。",
        "使用现场所示按钮、拉杆、脚踏或感应冲水，并检查已完成。卫生纸和卫生用品按垃圾桶标识处理；湿巾、卫生巾和大件绝不冲入。",
        "有洗手液时用流水洗手，免洗液只是备用，手上明显脏污时不能替代。为下一位整理厕位，并向工作人员报告危险积水或坏锁。"
      ]
    },
    {
      "id": "confirmation-heading",
      "type": "heading",
      "level": 2,
      "text": "三项安全检查"
    },
    {
      "id": "confirmation-lanes",
      "type": "comparison",
      "title": "器具、平衡与用品",
      "columns": [
        {
          "heading": "器具",
          "body": "使用前认清蹲厕、坐厕或无障碍设备及冲水方式。具体房间决定动作。"
        },
        {
          "heading": "平衡",
          "body": "选择不需跳跃、攀爬或依靠松动管线即可进入和起身的姿势；没有把握就换厕位。"
        },
        {
          "heading": "用品",
          "body": "自带纸巾和免洗液，并检查垃圾桶与洗手区。同一建筑内供应也可能不同。"
        }
      ]
    },
    {
      "id": "failure-heading",
      "type": "heading",
      "level": 2,
      "text": "第一处设施无法使用时"
    },
    {
      "id": "failure-matrix",
      "type": "table",
      "caption": "转到最近有人值守或设备更完善的备选。",
      "columns": [
        "问题",
        "立即动作",
        "下一备选"
      ],
      "rows": [
        [
          "只有蹲厕且下蹲不安全",
          "向工作人员问‘坐便/无障碍卫生间’，并展示图形",
          "尝试附近有工作人员的交通枢纽、商场、酒店大堂或景点服务中心"
        ],
        [
          "没有纸或洗手液",
          "用自备纸和免洗液，并在下一个有条件的洗手池认真洗手",
          "下一段长途前补充随身包"
        ],
        [
          "地面湿滑或门锁损坏",
          "不要使用该厕位",
          "换房间或找管理员，并报告风险"
        ],
        [
          "无障碍厕所上锁",
          "问官方工作人员能否开锁或提供其他无障碍设施",
          "去已核实备选，不强行开门"
        ],
        [
          "地图点错误或设施关闭",
          "向附近人员展示文字并跟实体标识",
          "前往最近的大型有工作人员公共建筑，不追孤立地图点"
        ]
      ]
    },
    {
      "id": "recovery-heading",
      "type": "heading",
      "level": 2,
      "text": "精简备用方案"
    },
    {
      "id": "recovery",
      "type": "list",
      "ordered": true,
      "items": [
        "在外侧口袋放一小包无香纸巾、旅行装免洗液和两个不透明小垃圾袋。",
        "长途铁路、巴士、公园或遗址段之前，在最后一个大站、景点入口或商场使用已知设施。",
        "需要坐厕或无障碍厕位的旅客，应为当天保存两个有工作人员的核实地点，而不是一个地图点。",
        "衣物或包接触湿地后放入备用袋隔离，处理食物或证件前洗手。",
        "若失去平衡或跌倒，不要仓促起身；呼叫帮助，有紧急拉绳就使用，受伤时找工作人员或医疗帮助。",
        "每天晚上补齐已用物品，并在次日出发前告诉同伴需要哪些无障碍功能或额外停靠。"
      ]
    },
    {
      "id": "scope-boundary",
      "type": "callout",
      "title": "设施会随地点变化",
      "body": "本指南不能保证厕所位置、开放、清洁、纸巾、洗手液、坐厕或无障碍厕位、免费进入或维护状态。现场标识与工作人员控制使用。本文是一般实用信息，不是医疗或行动能力建议；请按个人需要选择协助和设备。",
      "tone": "warning"
    },
    {
      "id": "next-heading",
      "type": "heading",
      "level": 2,
      "text": "离开酒店前"
    },
    {
      "id": "next-check",
      "type": "list",
      "items": [
        "已带纸巾",
        "已带免洗液",
        "已带两个垃圾袋",
        "已保存问路文字",
        "认识无障碍图形",
        "已找第一处大型设施",
        "同伴知道行动需要",
        "不把贵重物品放地面"
      ]
    },
    {
      "id": "faq-heading",
      "type": "heading",
      "level": 2,
      "text": "公共厕所常见问题"
    },
    {
      "id": "faq-1-question",
      "type": "heading",
      "level": 3,
      "text": "中国公共厕所全是蹲厕吗？"
    },
    {
      "id": "faq-1-answer",
      "type": "paragraph",
      "text": "不是。器具组合因地而异。查看标识和厕位，需要坐厕或无障碍设施时向工作人员询问。"
    },
    {
      "id": "faq-2-question",
      "type": "heading",
      "level": 3,
      "text": "使用蹲厕时面向哪边？"
    },
    {
      "id": "faq-2-answer",
      "type": "paragraph",
      "text": "通常面向凸起遮挡或可见管道端。以现场器具形状和脚踏面为准，不照搬其他布局。"
    },
    {
      "id": "faq-3-question",
      "type": "heading",
      "level": 3,
      "text": "卫生纸放马桶还是垃圾桶？"
    },
    {
      "id": "faq-3-answer",
      "type": "paragraph",
      "text": "遵循现场标识和器具说明。湿巾、卫生巾和大件用品绝不冲入；不清楚时询问工作人员。"
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "相关无障碍与路线主题",
      "items": [
        {
          "label": "中国轮椅无障碍路线规划",
          "href": "/zh/guides/wheelchair-accessible-china-route-planning/",
          "description": "把无障碍停靠纳入整体路线。"
        },
        {
          "label": "无障碍酒店客房核实",
          "href": "/zh/guides/china-accessible-hotel-room-verification/",
          "description": "核实重要的浴室与客房功能。"
        },
        {
          "label": "带年长父母游中国",
          "href": "/zh/guides/china-itinerary-with-older-parents/",
          "description": "把休息和如厕放进每日节奏。"
        },
        {
          "label": "第一次坐中国高铁",
          "href": "/zh/guides/china-high-speed-train-first-time-guide/",
          "description": "了解长途出行的车站流程。"
        },
        {
          "label": "地址核实与导航备份",
          "href": "/zh/guides/china-navigation-verified-address-backup/",
          "description": "保存真实设施或有人值守建筑备选。"
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "官方来源",
      "items": [
        {
          "label": "北京公共厕所问答",
          "url": "https://english.beijing.gov.cn/contactus/faqs/list/202006/t20200627_1932963.html",
          "publisher": "北京市人民政府",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "旅游厕所管理指导",
          "url": "https://zwgk.mct.gov.cn/zfxxgkml/ggfw/202306/t20230619_944567.html",
          "publisher": "文化和旅游部",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "公共厕所分类标准",
          "url": "https://openstd.samr.gov.cn/bzgk/std/newGbInfo?hcno=D42230CAB628FB034C8DCD795553B9D9",
          "publisher": "国家标准化管理委员会",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "公共信息图形符号标准",
          "url": "https://www.sz.gov.cn/attachment/1/1522/1522388/11901081.pdf",
          "publisher": "深圳市人民政府发布的国家标准",
          "reviewedAt": "2026-08-22"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
