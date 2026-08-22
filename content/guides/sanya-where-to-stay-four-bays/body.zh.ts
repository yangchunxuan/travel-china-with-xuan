import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "lead",
      "type": "lead",
      "text": "三亚湾最适合需要机场、城市吃饭与混合日程的第一次旅行；大东海能把沙滩和城市生活压缩在同一天；亚龙湾适合把海滩度假与物业内长时间停留当主线；海棠湾适合刻意选择的度假区、购物或东边景点组合，但每次离开物业都要提前计划。"
    },
    {
      "id": "short-answer",
      "type": "callout",
      "title": "先给结论",
      "tone": "decision",
      "body": "晚到、早班机、连续城市吃饭或混合行程，选三亚湾；想在沙滩、吃饭与城市生活之间步行切换，选大东海；想让度假物业本身撑起一天，选亚龙湾；具体度假设施、免税购物或东边景点反复出现，选海棠湾。绝不因“保证能下海”或“水质一直好”的宣传选择海湾。"
    },
    {
      "id": "canonical-scope",
      "type": "paragraph",
      "text": "本文只比较四个基地，不排度假酒店、不报实时价格房态，不承诺海滩进入、游泳安全、平静海况、接驳车或外宾接待。每个海湾内部的道路、岸线进入与物业模式都不同。"
    },
    {
      "id": "decision-matrix-heading",
      "type": "heading",
      "level": 2,
      "text": "四个海湾，四套失败恢复"
    },
    {
      "id": "decision-matrix",
      "type": "table",
      "caption": "看海滩计划变化后还剩什么价值",
      "columns": [
        "决策",
        "三亚湾",
        "大东海",
        "亚龙湾",
        "海棠湾"
      ],
      "rows": [
        [
          "最适合",
          "机场/城市/混合初访",
          "紧凑城市海滩假期",
          "沙滩主导度假",
          "东边自成体系度假/景点"
        ],
        [
          "不计划吃饭",
          "城市选择最多",
          "紧凑选择较多",
          "常依赖度假物业",
          "常依赖物业/综合体"
        ],
        [
          "机场摩擦",
          "通常最先测试",
          "增加市内段",
          "增加海湾度假段",
          "四项中东边暴露最长"
        ],
        [
          "反复海滩日",
          "城市海岸兼城市生活",
          "最易海滩城市切换",
          "海滩主线最强",
          "为物业组合选，不只为沙"
        ],
        [
          "坏天气备选",
          "城市替代与搬离最容易",
          "吃饭/城市备选紧凑",
          "物业必须有室内价值",
          "物业/综合体必须撑起整天"
        ],
        [
          "无车独立旅行",
          "最宽容的起点",
          "核验路线后通常可行",
          "每次出度假区都要确认",
          "所有重要外出都预先安排"
        ],
        [
          "早晚移动",
          "机场侧风险保护最强",
          "与城市连接较均衡",
          "必须确认合法接送",
          "需要最强接送计划"
        ]
      ]
    },
    {
      "id": "option-1-heading",
      "type": "heading",
      "level": 2,
      "text": "三亚湾：为航班周边弹性买单"
    },
    {
      "id": "option-1-analysis",
      "type": "paragraph",
      "text": "三亚湾把城市海岸、城市服务与三亚机场一侧结合，适合第一晚、最后一晚、混合观光与不想每餐依赖度假酒店的人。海湾很长，同样写“三亚湾”的地址可能东西相差很远。必须从具体物业入口重算海滩口、城市与航班路线，不能把整条岸线当成一个区域。"
    },
    {
      "id": "option-2-heading",
      "type": "heading",
      "level": 2,
      "text": "大东海：把海滩与城市压缩进一天"
    },
    {
      "id": "option-2-analysis",
      "type": "paragraph",
      "text": "想下楼吃饭、去沙滩几小时、回房休息后仍有城市晚上，大东海最匹配；也可能减少对酒店接驳或包车的依赖。这不保证安静、空旷沙滩或安全游泳。要问哪个公共海滩口当前可用、房间朝向，以及关闭或预警时还有哪些室内选择。"
    },
    {
      "id": "option-3-heading",
      "type": "heading",
      "level": 2,
      "text": "亚龙湾：让度假物业本身成为日程"
    },
    {
      "id": "option-3-analysis",
      "type": "paragraph",
      "text": "早餐、泳池或岸边、长休息与早晚餐都在本地完成，亚龙湾最强。若每天都想去市区吃饭、夜市或多个远端景点，它会变弱。付款前核验真正包含的项目、具体日期开放、独立旅客如何离开度假区，以及没有海滩的一天能做什么。"
    },
    {
      "id": "option-4-heading",
      "type": "heading",
      "level": 2,
      "text": "海棠湾：主动接受东边自成体系"
    },
    {
      "id": "option-4-analysis",
      "type": "paragraph",
      "text": "具体度假物业、购物、亲子景点或康养活动反复出现，海棠湾才赚回额外距离。规模与东边位置让临时回市区付出更高时间和协调成本。物业看似自足，但天气关闭室外设施或餐饮/接驳需预约时可能失效。必须拿到室内日计划、清楚接送与现实离店余量。"
    },
    {
      "id": "trip-pivot",
      "type": "callout",
      "title": "最好的海湾，是海滩关闭后仍能住的海湾",
      "tone": "neutral",
      "body": "官方监测与临时关闭说明，没有照片或旧评论能保证下海。预先问：若水域、海上活动或室外设施停一天，全组如何度过？剩余方案仍像假期，选择才站得住。"
    },
    {
      "id": "execution-heading",
      "type": "heading",
      "level": 2,
      "text": "带天气分支选一个海湾"
    },
    {
      "id": "execution-steps",
      "type": "list",
      "ordered": true,
      "items": [
        "在实时地图标出准确机场航站楼、已订景点与物业外餐饮。",
        "统计真正要求海滩就在门口的天数，而非计划去一次海滩。",
        "先选正常日节奏合适的海湾，再为它写完整坏天气日。",
        "向物业核对车行入口、岸线进入、吃饭、室内空间、前台与当前设施条款。",
        "所有接驳按日期、方向、预约、行李与备选核验；未回复视为不可用。",
        "临行与每个海滩日前查官方天气、海滩与水质公告。",
        "只有具体航班与预警证明时，才用时间余量或换基地保护最后一晚。"
      ]
    },
    {
      "id": "failure-heading",
      "type": "heading",
      "level": 2,
      "text": "海湾无法完成原本任务时"
    },
    {
      "id": "failure-recovery",
      "type": "table",
      "caption": "在安全切换点改变，不等团队被困",
      "columns": [
        "失败",
        "立即恢复",
        "何时搬离"
      ],
      "rows": [
        [
          "海滩/浴场关闭",
          "服从主管部门并使用预写室内日",
          "物业和区域剩余内容无法接受"
        ],
        [
          "度假区接驳没有或满位",
          "用已确认合法备选并记录原承诺",
          "反复必要出行没有可靠路线"
        ],
        [
          "三亚湾地址在岸线很远一端",
          "从准确门口重画机场与城市段",
          "连续几个固定移动受损"
        ],
        [
          "亚龙湾/海棠湾吃饭计划失败",
          "晚饭前要求物业落实说明过的替代",
          "饮食或现实需要无法安全满足"
        ],
        [
          "台风预警影响离开",
          "服从官方指令，保护避险与航班联系",
          "只有主管部门与安全交通窗口支持才搬"
        ]
      ]
    },
    {
      "id": "promise-boundary",
      "type": "callout",
      "title": "不做永久海滩与天气承诺",
      "tone": "warning",
      "body": "本文不保证晴天、可下海、水质、浪况、救生员、公共入口、设施开放、接驳座位、交通时长、房间景观、价格房态或外宾登记。恶劣天气指令与实时运营信息始终优先。"
    },
    {
      "id": "next-step",
      "type": "callout",
      "title": "下一步：写两个完整的一天",
      "tone": "decision",
      "body": "为最后两个海湾各写一个正常海滩日，再写一个完全不能使用海滩的日子，加入每餐、休息与返程。两版都成立且未核验接驳最少的海湾，才是更好选择。"
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "继续规划三亚住宿",
      "items": [
        {
          "label": "返回中国住宿决策",
          "href": "/zh/stay/",
          "description": "回到不含酒店榜单的住宿决策入口。"
        },
        {
          "label": "保护国际航班前最后一晚",
          "href": "/zh/guides/china-last-night-before-international-flight/",
          "description": "只有具体航班与天气风险证明时才移动最后一晚。"
        },
        {
          "label": "核验“地铁附近”到底多近",
          "href": "/zh/guides/china-hotel-near-metro/",
          "description": "把同样的门到门核验用于度假区接驳、出租车下客点和房源宣称的交通连接。"
        },
        {
          "label": "核验无障碍客房",
          "href": "/zh/guides/china-accessible-hotel-room-verification/",
          "description": "核对下客点、房门与卫生间的连续动线。"
        },
        {
          "label": "核验外宾住宿登记",
          "href": "/zh/guides/foreigners-china-hotel/",
          "description": "安排深夜度假区接驳或跨海湾分段住前，先核实全国护照登记与拒住恢复流程。"
        },
        {
          "label": "民宿、客栈还是酒店",
          "href": "/zh/guides/minsu-homestay-or-hotel-china/",
          "description": "把物业形态与住宿区域选择分开判断。"
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "三亚官方、环境与图片来源",
      "items": [
        {
          "label": "三亚市政府大东海说明",
          "url": "https://english.sanya.gov.cn/syen/attractions/202505/028169f20cfd488899b76b002858ae3a.shtml",
          "publisher": "三亚市人民政府",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "海棠区官方概览",
          "url": "https://ht.sanya.gov.cn/htqsite/quqing/202603/a242509256864e8f84be07ee684c1429.shtml",
          "publisher": "三亚市海棠区人民政府",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "三亚市政府海棠湾度假区说明",
          "url": "https://english.sanya.gov.cn/syen/news/202508/991449a20ef84f4b9b8a70a2212195c7.shtml",
          "publisher": "三亚市人民政府",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "三亚市2026年6月海水浴场水质监测",
          "url": "https://hbj.sanya.gov.cn/sthjsite/hjzl/202606/6e654ea5ac6f473db07a91db7ba4dc7a.shtml",
          "publisher": "三亚市生态环境局",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "首图：Zhangmoon618 拍摄三亚湾，CC BY-SA 3.0",
          "url": "https://commons.wikimedia.org/wiki/File:Sanya_Bay_01.jpg",
          "publisher": "Wikimedia Commons",
          "reviewedAt": "2026-08-22"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
