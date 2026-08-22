import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "lead",
      "type": "lead",
      "text": "第一次去成都、住两到四晚，春熙路通常是最稳的默认项：中心观光、吃饭与晚归可以共用一个基地。若更看重安静的社区清晨，文殊院更合适；若西边老城氛围连续出现在两天以上，才优先宽窄巷子。宽窄巷子最实用的房间往往在可通车边缘，而不是最热闹的步行巷内。"
    },
    {
      "id": "short-answer",
      "type": "callout",
      "title": "先给结论",
      "tone": "decision",
      "body": "短途初访、晚间选择多或每天方向不同，先看春熙路；想慢下来、早晨逛寺院与街巷、晚上不追热闹，先看文殊院；连续几次把西边老城当作早晚场景，再看宽窄巷子。无论选哪处，付款前都要拿到中文入口、可用地铁口和行李下客点；区域名不会自动把箱子送进大堂。"
    },
    {
      "id": "canonical-scope",
      "type": "paragraph",
      "text": "本文只比较三个中心生活圈，不列酒店、不报实时房价房态、不承诺外宾登记，也不代替无障碍核验。它更不会把某一个成都景点默认成所有人的行程中心。"
    },
    {
      "id": "decision-matrix-heading",
      "type": "heading",
      "level": 2,
      "text": "让反复出现的半天决定住宿区"
    },
    {
      "id": "decision-matrix",
      "type": "table",
      "caption": "先比较完整住宿节奏，再核验具体物业",
      "columns": [
        "决策信号",
        "春熙路",
        "文殊院",
        "宽窄巷子",
        "门口要核验"
      ],
      "rows": [
        [
          "第一次短住",
          "最稳的综合默认项",
          "安静清晨优先时合适",
          "西边老城反复出现时合适",
          "算完整路线，不看名气"
        ],
        [
          "晚上",
          "吃饭、购物与返程选择最多",
          "节奏较早较静，临时晚间选择较少",
          "步行氛围强，也可能有游客噪声",
          "房间朝向与最晚可用入口"
        ],
        [
          "早晨",
          "方便向不同方向出发",
          "寺院与街巷慢启动最强",
          "可在高峰前逛老城街巷",
          "早餐与真实集合点"
        ],
        [
          "大行李或晚到",
          "优先有前台、临路物业",
          "核验入口后通常可控",
          "步行段可能增加摩擦",
          "合法车辆能否停到正确门口"
        ],
        [
          "老人、孩子或行动需要",
          "只有完整楼宇链可用才算便利",
          "街面可能较缓，但房间仍不同",
          "石板、门槛与院落可能增加障碍",
          "路缘、地面、电梯、走廊、卫生间"
        ],
        [
          "反复东行或西行",
          "混合路线或偏东更灵活",
          "北中心较均衡",
          "只有西边安排反复时才占优",
          "比较最晚返程，不只看白天一次"
        ]
      ]
    },
    {
      "id": "option-1-heading",
      "type": "heading",
      "level": 2,
      "text": "春熙路：选可用生活圈，不选最亮的外立面"
    },
    {
      "id": "option-1-analysis",
      "type": "paragraph",
      "text": "春熙路的价值在于可替换性：团队能分头吃饭，雨天能换方案，从不同方向回来也不必再解决一次复杂接驳。但如果物业藏在商场塔楼、位于深夜步行街上方，或离真正可用的地铁口很远，这个优势会迅速消失。要问清楼栋名、大堂楼层、车行入口与房间朝向；“太古里附近”不是到店指令。"
    },
    {
      "id": "option-2-heading",
      "type": "heading",
      "level": 2,
      "text": "文殊院：买的是慢一点的清晨，不是绝对安静"
    },
    {
      "id": "option-2-analysis",
      "type": "paragraph",
      "text": "文殊院适合让早餐、喝茶、寺院周边与社区街巷决定一天节奏的人。它能保留中心位置，同时减少主商圈感，但不是隔绝噪声的封闭区域，也不会消除向东、南、西出行。小型客栈仍可能有楼梯、前台时段或巷内下客问题，核验力度不能比宽窄巷子低。"
    },
    {
      "id": "option-3-heading",
      "type": "heading",
      "level": 2,
      "text": "宽窄巷子：只有西边氛围反复出现才住"
    },
    {
      "id": "option-3-analysis",
      "type": "paragraph",
      "text": "当老城质感连续占据几个清晨或晚上，且西边中心节点反复出现，宽窄巷子才真正省力。只去一次拍照，不值得让它决定每一晚。遗产街区也可能带来最难的行李链：车辆管理、铺装、人流与有台阶的院落。住在步行核心外缘，常能保留位置收益，又恢复清楚的车行入口。"
    },
    {
      "id": "trip-pivot",
      "type": "callout",
      "title": "成都中心区通常不必拆成两段住宿",
      "tone": "neutral",
      "body": "这三个区域距离不足以让多数短途频繁换酒店。选一个入口清楚、房间链已核验的基地，个别行程当天往返即可。只有后半程的清晨与晚间重心真的整体移动，才值得换住；不要为少坐一次车或换一种街景搬箱子。"
    },
    {
      "id": "execution-heading",
      "type": "heading",
      "level": 2,
      "text": "七步确定成都住宿基地"
    },
    {
      "id": "execution-steps",
      "type": "list",
      "ordered": true,
      "items": [
        "写出反复出现的三段：最早出门、最晚回来、离店当天交接。",
        "用当前官方线网放入三个区域，淘汰会造成重复跨城的选项。",
        "在较安静且临路的位置筛物业，保存完整中文楼栋与入口名。",
        "问清下客点、可用地铁口、步行路面、大堂楼层与行李交接。",
        "按真实到达时刻核对前台、房间朝向、电梯和卫生间。",
        "保留取消条件，对最后两个门口做同题比较，不比区域均价或旧截图。",
        "出发前重确认入口与到达时间，并保留一个白天可切换的备选。"
      ]
    },
    {
      "id": "failure-heading",
      "type": "heading",
      "level": 2,
      "text": "成都地址不符时怎么恢复"
    },
    {
      "id": "failure-recovery",
      "type": "table",
      "caption": "先修复最后一公里，不要立刻推翻整段行程",
      "columns": [
        "失败",
        "马上处理",
        "何时换订"
      ],
      "rows": [
        [
          "定位落在塔楼另一侧",
          "联系物业索要中文车行入口和大堂楼层",
          "路线依赖已关闭商场或无法使用的楼梯"
        ],
        [
          "宽窄巷子内要长距离拖箱",
          "到约定下客点并要求落实已承诺行李协助",
          "没有安全现实的行李交接"
        ],
        [
          "春熙路房间正对深夜街面",
          "未拆行李前看已确认的安静朝向替代房",
          "无法恢复预订中的睡眠条件"
        ],
        [
          "文殊院客栈出现未披露楼梯",
          "把现场路线与书面证据对照",
          "必要行动条件无法满足"
        ],
        [
          "晚到后地铁方案失效",
          "用合法门到门方式去已核验入口",
          "前台或进入方式不再确认"
        ]
      ]
    },
    {
      "id": "promise-boundary",
      "type": "callout",
      "title": "不能承诺的边界",
      "tone": "warning",
      "body": "任何区域都不保证安静、无障碍、全天前台、合法路边停车、外宾登记、固定车费与时长、指定房型、价格或房态。地铁口与街区管理会变。只有具体物业确认了从下客到进房的全链条，区域判断才落地。"
    },
    {
      "id": "next-step",
      "type": "callout",
      "title": "下一步：只比较两个门口",
      "tone": "decision",
      "body": "保留一个春熙路候选，再保留一个最符合反复日程的区域候选。向两家发送完全相同的入口、行李、到达、房间与取消问题。即使另一个定位看起来更中心，也优先选书面链条更清楚的一家。"
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "继续规划成都住宿",
      "items": [
        {
          "label": "返回中国住宿决策",
          "href": "/zh/stay/",
          "description": "回到不含酒店榜单的住宿决策入口。"
        },
        {
          "label": "规划完整成都行程",
          "href": "/zh/destinations/chengdu/",
          "description": "先确定夜数、熊猫日、美食与后续路线，再落住宿区域。"
        },
        {
          "label": "核验“地铁附近”到底多近",
          "href": "/zh/guides/china-hotel-near-metro/",
          "description": "按可用出口、路面与大堂门核验，不只看地图半径。"
        },
        {
          "label": "核验无障碍客房",
          "href": "/zh/guides/china-accessible-hotel-room-verification/",
          "description": "核对下客点、房门与卫生间的连续动线。"
        },
        {
          "label": "核验外宾住宿登记",
          "href": "/zh/guides/foreigners-china-hotel/",
          "description": "晚到或入住巷内物业前，按全国专题核实护照登记与拒住补救。"
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
      "title": "官方规划、运营方与图片来源",
      "items": [
        {
          "label": "成都市“中优”十四五规划",
          "url": "https://mpnr.chengdu.gov.cn/ghhzrzyj/zxghgb/2021-07/06/e67c4752beaf43c4af7e18d1709d0346/files/afe553f019c04cfc90d451bd3ff30719.pdf",
          "publisher": "成都市规划和自然资源局",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "成都市国土空间总体规划",
          "url": "https://mpnr.chengdu.gov.cn/ghhzrzyj/ztgh/2024-12/02/904b2d22ae354bb3872ca524ceb272d6/files/3f2d36f2041a49ebaf6bf7e8e2fd936b.pdf",
          "publisher": "成都市规划和自然资源局",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "成都轨道官方站点与游客客流说明",
          "url": "https://www.chengdurail.com/info/1151/56632.htm",
          "publisher": "成都轨道交通集团",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "首图：Gong Chen 与 Mlogic 的春熙路照片，CC BY-SA 4.0",
          "url": "https://commons.wikimedia.org/wiki/File:Chunxi_Road_seen_from_viaduct,_Chengdu.jpg",
          "publisher": "Wikimedia Commons",
          "reviewedAt": "2026-08-22"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
