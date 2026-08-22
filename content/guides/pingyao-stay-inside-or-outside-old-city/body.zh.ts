import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "lead",
      "type": "lead",
      "text": "如果住一晚的意义，就是在旅行团到来前和一日游客离开后仍在平遥城墙内，选城内；若晚到、箱子重、步行受限或次日车次更重要，选城外。真正的问题不是“原汁原味还是方便”，而是每天要走两次的城门到房门链条是否成立。"
    },
    {
      "id": "short-answer",
      "type": "callout",
      "title": "先给结论",
      "tone": "decision",
      "body": "住两晚、确定会早起逛街和从容过夜，而且全员能处理石板、门槛与楼梯，可选核验过的城内院落。只住一晚、深夜到、带大箱子、使用轮椅、关节不适或赶重要车次，优先住对应城门或换乘线外侧。绝不能从“古城内”推断车辆到门，必须书面取得城门名、交接点与行李方案。"
    },
    {
      "id": "canonical-scope",
      "type": "paragraph",
      "text": "本文只决定睡在城墙哪一侧，不列客栈、不售卖“古朴体验”、不固定景点时段，也不保证车辆、电瓶车或搬运行李的人能到门。平遥站与平遥古城站是两个票面名称，不能都写成含糊的“平遥接站”。"
    },
    {
      "id": "decision-matrix-heading",
      "type": "heading",
      "level": 2,
      "text": "让最弱的同行者和最难的换乘决定城墙内外"
    },
    {
      "id": "decision-matrix",
      "type": "table",
      "caption": "城内时光必须抵得过完整行李与通行成本",
      "columns": [
        "判断输入",
        "城内",
        "城外",
        "预订前证据"
      ],
      "rows": [
        [
          "清晨与深夜",
          "直接拥有安静时段，是最大收益",
          "要过一次城门，仍可前往",
          "真正会使用的两个时段"
        ],
        [
          "晚到",
          "前台与城门交接可能同时失效",
          "临路有人值守通常更简单",
          "票面车站、到达时刻、命名道路门"
        ],
        [
          "大件行李",
          "石板、人流与门槛会主导全程",
          "车到大堂可能更短",
          "搬运距离、路面、接手人与截止时刻"
        ],
        [
          "行动受限",
          "只有全链与房间核验后才可选",
          "较稳默认，但也不是保证",
          "路缘、坡道、电梯、床与卫生间尺寸"
        ],
        [
          "一晚后续行",
          "氛围可能抵不过两次交接",
          "更能保护睡眠与出发",
          "关房门到站台的缓冲计划"
        ],
        [
          "院落体验",
          "物业本身可成为住宿内容",
          "不住宿也能进城体验",
          "实际楼层、冷暖、隔音与出口"
        ]
      ]
    },
    {
      "id": "option-1-heading",
      "type": "heading",
      "level": 2,
      "text": "城内：购买能用上的安静时段，不买标签"
    },
    {
      "id": "option-1-analysis",
      "type": "paragraph",
      "text": "最适合的是两晚：早餐前散步，中途回房休息，晚饭后再进入街巷。传统院落能加强这种节奏，但老建筑也带来真实门槛：不平路面、台阶、低门、楼上房、内院和不稳定的保温隔音。要求物业从一个命名城门说明到客人入口的路线，并给实际房型照片。只回答“可以接”仍不算核验完成。"
    },
    {
      "id": "option-2-heading",
      "type": "heading",
      "level": 2,
      "text": "城外：把城墙当作游览边界"
    },
    {
      "id": "option-2-analysis",
      "type": "paragraph",
      "text": "酒店要承接晚到火车、退房后存行李或稳定车接时，城外更抗风险。要选与你反复使用的城门同侧，而不是只看离古城中心的直线距离。城外也可能被公路、铁路、地道或错误城门阻断，所以步行入口与车辆入口必须分别画。"
    },
    {
      "id": "trip-pivot",
      "type": "callout",
      "title": "城墙制造的是交接，不是品质排名",
      "tone": "neutral",
      "body": "难走巷子里的漂亮院落可能是错房，安全五分钟交接的普通城外酒店反而保住全程。把清晨与夜晚收益单独计分，也把每次抬箱、门槛和不确定接站计入成本。最弱同行者和最晚抵达者拥有否决权。"
    },
    {
      "id": "execution-heading",
      "type": "heading",
      "level": 2,
      "text": "从票面到床边逐段核验"
    },
    {
      "id": "execution-steps",
      "type": "list",
      "ordered": true,
      "items": [
        "从12306订单抄下完整到发站名，不把两个车站都简称平遥。",
        "写出两个必须睡城内才会使用的时段。",
        "向物业索要中文地址、城门名、车辆点、客人入口和晚间前台。",
        "核对真实搬运行程、路面、楼梯、房间楼层、电梯、卫生间门槛与行李协助。",
        "按真实到达时刻画站台、车辆、城门、交接、大堂与房门。",
        "完整书面链条未到手前，保留城外可取消备选。",
        "当天重查官方交通公告；离站前若交接有变，先电话确认。"
      ]
    },
    {
      "id": "failure-heading",
      "type": "heading",
      "level": 2,
      "text": "城墙打断预订时怎么恢复"
    },
    {
      "id": "failure-recovery",
      "type": "table",
      "caption": "停在安全命名点，一次恢复一段",
      "columns": [
        "失败",
        "马上处理",
        "切换标准"
      ],
      "rows": [
        [
          "司机停在另一个城门",
          "留在命名公共点并联系物业",
          "无法提供安全有人交接就用城外备选"
        ],
        [
          "电瓶车或搬运人员没来",
          "移动行李前先量实际步行",
          "最弱同行者或行李做不到就不尝试"
        ],
        [
          "院落房在楼上或不可达",
          "拆行李前看真实替代房",
          "房间和卫生间全链无法恢复就搬城外"
        ],
        [
          "晚到遇前台关闭",
          "联系平台并保存带时间消息",
          "先住最近安全有人处，再处理付款争议"
        ],
        [
          "人流管制改变出口",
          "服从现场指引前往最近开放城门",
          "当晚重画出发链并扩大缓冲"
        ]
      ]
    },
    {
      "id": "promise-boundary",
      "type": "callout",
      "title": "城内与城外都不等于保证",
      "tone": "warning",
      "body": "城内不保证安静、古建品质、合法车辆进入、电瓶车、行李协助、冷暖、独立卫生间、首层房或外宾登记。城外也不保证无障碍、真正近车站、城门开放或过街容易。价格、房态、交通管制、车站服务与物业运营均会变化。"
    },
    {
      "id": "next-step",
      "type": "callout",
      "title": "下一步：要求物业用一句话说完整",
      "tone": "decision",
      "body": "向最后候选发送：“我在[完整车站]于[时刻]到，应去哪个城门和车辆点，谁接行李，到房间多远、什么路面，交接失败怎么办？”全句都可执行才住城内，否则住匹配的城外一侧。"
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "继续规划平遥住宿",
      "items": [
        {
          "label": "返回中国住宿决策",
          "href": "/zh/stay/",
          "description": "回到不含酒店榜单的住宿决策入口。"
        },
        {
          "label": "民宿、客栈还是酒店",
          "href": "/zh/guides/minsu-homestay-or-hotel-china/",
          "description": "把物业形态与住宿区域选择分开判断。"
        },
        {
          "label": "理解仍在生活的遗产城市",
          "href": "/zh/guides/how-to-read-heritage-sites-in-china/",
          "description": "区分遗产价值与布景式氛围，规划克制的使用方式。"
        },
        {
          "label": "理解高铁站为何离城远",
          "href": "/zh/guides/why-china-high-speed-stations-are-far-away/",
          "description": "把票面车站与古城门当作两个节点。"
        },
        {
          "label": "核验无障碍客房",
          "href": "/zh/guides/china-accessible-hotel-room-verification/",
          "description": "核对下客点、房门与卫生间的连续动线。"
        },
        {
          "label": "执行酒店疏散安全检查",
          "href": "/zh/guides/china-hotel-emergency-exit-fire-safety-check/",
          "description": "检查夜间疏散动线；无法恢复安全链条时离开。"
        },
        {
          "label": "核验外宾住宿登记",
          "href": "/zh/guides/foreigners-china-hotel/",
          "description": "进入步行古城核心前，确认准确院落物业怎样办理护照登记及拒住补救。"
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "官方遗产、旅游、铁路与图片来源",
      "items": [
        {
          "label": "联合国教科文组织平遥古城遗产记录",
          "url": "https://whc.unesco.org/en/list/812",
          "publisher": "联合国教科文组织世界遗产中心",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "山西省重点景区旅游发展文件",
          "url": "https://wlt.shanxi.gov.cn/zwgk/xxgk/xxgkml/qt/202204/P020220420405006964545.pdf",
          "publisher": "山西省文化和旅游厅",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "中国铁路12306车站名称列表",
          "url": "https://www.12306.cn/mormhweb/zxdt/201305/t20130516_600.html",
          "publisher": "中国铁路12306",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "首图：林高志拍摄平遥古城，CC BY-SA 4.0",
          "url": "https://commons.wikimedia.org/wiki/File:%E4%B8%AD%E5%9C%8B%E5%B1%B1%E8%A5%BF%E5%B9%B3%E9%81%99%E5%8F%A4%E8%B9%9F470.jpg",
          "publisher": "Wikimedia Commons",
          "reviewedAt": "2026-08-22"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
