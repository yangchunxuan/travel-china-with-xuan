import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "decision-lead",
      type: "lead",
      text: "北京站、北京西站、北京南站、北京北站、清河站、北京朝阳站、北京丰台站和北京通州站，是分布在城市不同方向的8座主要铁路客站。车票出票后，必须前往票面写明的那座车站；购票前，则应把车站、酒店和完整的门到门路线放在一起比较。",
    },
    {
      id: "quick-answer",
      type: "callout",
      title: "先看结论",
      tone: "decision",
      body: "北京站常见部分东向、东北向列车；去天津及京沪方向通常先比较北京南站；西站与丰台站分担许多南向、西向和西南向列车；北京北站与清河站是主要的西北向组合；朝阳站常见东北向列车；通州站则有一组新的东向城际列车。这只是判断是否合理的方向规律，不是购票规则。付款或离开酒店前，必须以实时行程中的中文站名、车次和日期为准。",
    },
    {
      id: "scope-callout",
      type: "callout",
      title: "这是一篇车站决策指南，不再重复全国高铁流程",
      tone: "neutral",
      body: "购票渠道、铁路12306账户、护照核验、席别、铁路行李限制、安检、进站和检票上车，已经收录在Homeground的第一次坐中国高铁指南。本页只比较北京8座主要车站：票面站名、线路方向、酒店位置、早晚班、携带行李和走错站后如何处理。",
    },
    {
      id: "ticket-heading",
      type: "heading",
      level: 2,
      text: "先读火车票，再打开北京地图",
    },
    {
      id: "ticket-checklist",
      type: "list",
      ordered: true,
      items: [
        "从已出票的行程中复制完整出发站或到达站，不要自行简写成“北京”。",
        "优先核对中文站名：北京站、北京西站、北京南站、北京北站、清河站、北京朝阳站、北京丰台站或北京通州站。英文界面可能把北京南站写成Beijing South或Beijingnan，把北京西站写成Beijing West或Beijingxi。",
        "同时核对车次和日期。较早搜索时保存的截图，不能证明最终出票车站没有变化。",
        "在地图中选择铁路客站，不要误选同名或近似名称的地铁站、行政区或笼统的城市定位。",
        "准备出发时，应在车票显示检票口或车站发布适用进站路线后，再保存具体进站口或落客点。",
      ],
    },
    {
      id: "name-warning",
      type: "callout",
      title: "最容易漏看“北京”二字的是清河站",
      tone: "warning",
      body: "票面写的是Qinghe / 清河站，不是“北京清河站”，但它仍是北京8座主要铁路客站之一。矩阵中的8个站名都对应不同车站，任何两座都不能相互替代。",
    },
    {
      id: "matrix-heading",
      type: "heading",
      level: 2,
      text: "北京8站决策矩阵",
    },
    {
      id: "station-matrix",
      type: "table",
      caption: "方向只用于初步筛选8座车站，最终以实时车票为准",
      columns: ["票面与地图名称", "常见铁路方向", "市内位置与酒店匹配", "直达地铁与实际摩擦"],
      rows: [
        [
          "北京站 / Beijing Railway Station",
          "东向和东北向：常见开往河北东部、辽宁，以及部分南京、上海方向列车",
          "位于老城东缘；从前门、王府井和东城中心出发往往最顺",
          "地铁2号线直达；站区道路交通和从正确出口步行至车站仍需留时间",
        ],
        [
          "北京南站 / Beijing South（也可能显示Beijingnan）",
          "东南方向：天津、山东、南京、苏州、杭州和上海是常见线路",
          "位于老城南侧；前门、西单，或能简单连接地铁4号线、14号线的酒店通常更顺手",
          "4号线和14号线与火车站一体接驳；大型候车厅、按检票口选择入口及站内步行仍需留时间",
        ],
        [
          "北京西站 / Beijing West（也可能显示Beijingxi）",
          "南向和西向：常见郑州、武汉、长沙、广州、香港、西安等长途线路",
          "位于中心游览区西南侧；西单、金融街、军事博物馆或能方便接入7号线、9号线的酒店相对有利",
          "7号线和9号线；南北广场、多个上车区及二层候车空间，使选对方向格外重要",
        ],
        [
          "北京北站 / Beijing North（也可能显示Beijingbei）",
          "西北方向：常见八达岭和张家口，部分列车继续开往更远的西北方向",
          "紧邻西直门；北东城、西城北部，以及容易接入2号线、4号线或13号线的酒店更匹配",
          "利用西直门的2号线、4号线和13号线换乘，进站时跟随铁路客站标识，不要只设置笼统的西直门定位",
        ],
        [
          "北京朝阳站 / Beijing Chaoyang",
          "东北方向：常见承德、沈阳、大连、长春、长白山和哈尔滨",
          "位于北京东部偏东北；住三里屯、工人体育场附近或容易接入3号线时，优势最明显",
          "3号线现已直达交通枢纽地下一层进站口；从中西部或南部酒店出发仍可能是较长的跨城路线",
        ],
        [
          "北京丰台站 / Beijing Fengtai",
          "西南和西向：不少列车通往山西、河南、陕西、江西和福建，部分目的地也可能从西站出发",
          "位于北京西南；即使地图显示一条地铁线可到，从中心或东部酒店出发也要比较完整时间",
          "10号线和16号线与枢纽一体连接；车站体量大、垂直层次多，高铁与普速列车动线并不完全相同",
        ],
        [
          "清河站 / Qinghe",
          "西北方向：常见八达岭、张家口、呼和浩特和大同；部分前往中西部的长途列车也使用清河站",
          "位于海淀西北、上地附近；北京北部、西北部酒店，以及13号线、昌平线沿线更匹配",
          "13号线和昌平线与车站一体接驳；从中心、南部或东部酒店出发，会把较短铁路行程变成长距离首段交通",
        ],
        [
          "北京通州站 / Beijing Tongzhou",
          "东向城际：初期常见唐山、秦皇岛和天津北辰方向",
          "位于通州；住在通州或环球度假区一侧时最匹配，不默认适合中心或西部酒店",
          "地铁6号线与枢纽一体接驳；从历史城区出发时，跨城进站可能比城际铁路本身更耗时",
        ],
      ],
    },
    {
      id: "matrix-note",
      type: "paragraph",
      text: "北京官方8站网络按大方向分工：南站面向东南；西站与丰台站承担西南方向；朝阳站承担东向与东北方向；北站与清河站承担西北方向；北京站承担部分东向列车；通州站则服务一组新的东向城际列车。铁路运行图会调整，同一个目的地也可能由多个北京车站发车。不要用背下来的城市名单替代出行当天的车站核对。",
    },
    {
      id: "station-figure",
      type: "figure",
      src: "/images/guides/which-beijing-railway-station/chaoyang-line-3-b1-1440.webp",
      alt: "北京朝阳站综合交通枢纽内的地铁入口。",
      width: 1440,
      height: 960,
      caption: "北京朝阳站综合交通枢纽将铁路客站与地铁连在一起。照片：N509FZ／Wikimedia Commons，CC BY-SA 4.0；已裁切。",
    },
    {
      id: "south-west-comparison",
      type: "comparison",
      title: "南站和西站看起来都不算远，但绝不能互换",
      columns: [
        {
          heading: "北京南站",
          body: "第一次来北京的旅客最常把它与京沪、京津方向联系在一起。",
          items: [
            "从西单等南北向位置出发，4号线可能更方便",
            "从南部或东南部轨道网络出发，14号线可能更合适",
            "2026年官方指南按不同检票口给出不同进站口建议；叫车前应先看实时检票口",
            "不要把地下快速进站厅理解成可以晚到的理由",
          ],
        },
        {
          heading: "北京西站",
          body: "它是南向和西向的重要门户，Homeground的北京—张家界—上海交通案例也使用北京西站。",
          items: [
            "从珠市口和老城南缘出发，7号线较有价值",
            "9号线连接北京西部及多条南北向地铁",
            "南北进站口属于同一座车站，但公路落客路线可能完全不同",
            "只在网约车中搜索笼统的“北京西站”，可能增加拖行李的距离",
          ],
        },
      ],
    },
    {
      id: "outer-hubs-comparison",
      type: "comparison",
      title: "朝阳站、丰台站和清河站更考验酒店位置",
      columns: [
        {
          heading: "北京朝阳站",
          body: "东北高铁门户；住在三里屯或北京东部，且3号线方便时最匹配。",
          items: [
            "3号线进入交通枢纽并连接地下一层进站口",
            "公路送站使用北进站口或南进站口，高架落客平台只能即停即走",
            "不要把北京朝阳站与面积很大的朝阳区或朝阳门混为一谈",
          ],
        },
        {
          heading: "北京丰台站",
          body: "西南枢纽；有些目的地与西站重合，但在北京城内要走完全不同的方向。",
          items: [
            "10号线和16号线在枢纽内接驳",
            "从东部酒店出发，即使10号线不换乘，也可能绕行很长一段",
            "2026年启用的地下快捷进站厅只适用于符合条件的普速旅客，不是通用高铁捷径",
          ],
        },
        {
          heading: "清河站",
          body: "西北门户，常用于八达岭、张家口及长城以北方向的线路。",
          items: [
            "13号线和昌平线直达一体化车站",
            "西直门、海淀和北京北部酒店，通常比前门或南城更匹配",
            "去长城仍要按出行日期确认真正的车次和发车站",
          ],
        },
      ],
    },
    {
      id: "hotel-heading",
      type: "heading",
      level: 2,
      text: "用酒店门口测试车站，不要只看行政区名称",
    },
    {
      id: "hotel-table",
      type: "table",
      caption: "常见首次北京住宿位置怎样改变进站测试",
      columns: ["酒店位置", "通常应先比较的车站", "容易被忽略的摩擦"],
      rows: [
        [
          "前门或南中轴线",
          "南站可比较4号线、14号线接驳；从珠市口乘7号线去西站也可能实用",
          "酒店可能离有效地铁口并不近；胡同边缘道路和步行街还会影响车辆上门",
        ],
        [
          "王府井或东城中心",
          "没有绝对赢家；南站和西站通常需要一次有计划的换乘，朝阳站则取决于能否方便接入3号线",
          "地图上看似不远，实际可能包含两段地铁、地铁安检和大型火车站内步行",
        ],
        [
          "三里屯或工人体育场",
          "朝阳站拥有最清楚的3号线直达优势",
          "10号线理论上可以不换乘到丰台站，但会绕行北京很大一圈；南站、西站和清河站则要另做路线",
        ],
        [
          "北城胡同",
          "可通过3号线方向比较朝阳站；如果真正从北京北部出发，清河站也可能变得合理",
          "“北京北边”范围太大，仍要核对酒店到第一条有效地铁线的步行，以及车辆能否进入行李上车街道",
        ],
        [
          "海淀、西直门或上地",
          "通常应先比较清河站；西站也可能适合北京西部的轨道接驳",
          "去南站、朝阳站或丰台站要穿越北京不同区域，铁路车程的优势可能被门到门交通抵消",
        ],
      ],
    },
    {
      id: "hotel-rule",
      type: "callout",
      title: "不要因为一趟火车就自动搬动整个北京住宿",
      tone: "decision",
      body: "如果只有一次早班车对车站位置敏感，可以比较提前安排车辆、最后一晚换酒店，以及住在不利于观光区域所付出的代价。多数首次北京之旅，住宿首先要服务好几天的游览，再从这个住宿点设计正确的进站路线。Homeground的北京住宿区域指南会在整段行程中比较王府井、前门、三里屯和北城胡同。",
    },
    {
      id: "early-late-heading",
      type: "heading",
      level: 2,
      text: "早晚班车会把地铁路线变成运营时间问题",
    },
    {
      id: "early-late-table",
      type: "table",
      caption: "要计算酒店到站台，或站台到酒店的完整链路",
      columns: ["场景", "需要计算什么", "实用判断"],
      rows: [
        [
          "当天很早的首批列车",
          "酒店实际使用的地铁站首班服务、换乘是否开放、火车站内步行及正常进站余量",
          "任何一环过紧，都应安排前往已核实进站口的公路接驳，不要把计划建立在奔跑上",
        ],
        [
          "深夜到达北京",
          "全组真正通过铁路出站、找到地铁或上车区，并赶上最后一段有效交通的时间",
          "火车到达时间不等于末班地铁上车时间；提前准备出租车或网约车备选",
        ],
        [
          "周末或节假日客流高峰",
          "仅对特定日期发布的地铁延时、站区管制、出租车排队和道路限制",
          "把延长运营视为有日期的例外，不要当作日常时刻表",
        ],
        [
          "下车后当天还有景点或航班",
          "出站、行李交接和跨城交通能否赶上下一项固定截止时间",
          "买票前先比较完整链路，不要只选择从北京另一侧出发、铁路时刻看起来更快的车次",
        ],
      ],
    },
    {
      id: "hours-warning",
      type: "callout",
      title: "地铁直达不等于24小时接驳",
      tone: "warning",
      body: "北京有时会在节假日出行高峰延长部分地铁线路运营，但涉及的线路和日期都会变化。请在出行日期查看官方网络或实时地图中的首末班服务，不要用旧的节假日公告规划普通工作日，也不要假设铁路晚点后末班地铁会等待。",
    },
    {
      id: "luggage-heading",
      type: "heading",
      level: 2,
      text: "带行李时，数换乘动作，不要只数彩色线路",
    },
    {
      id: "luggage-copy",
      type: "paragraph",
      text: "本页不重复全国铁路行李规定。比较北京8站时，真正要判断的是：每位同行者能否把所有行李带过酒店步行、地铁安检、换乘、火车站进站口和候车厅。少一次换乘、找到明确的进站口，往往比地图上少几分钟更重要。",
    },
    {
      id: "luggage-comparison",
      type: "comparison",
      title: "让最困难的交接环节决定市内交通",
      columns: [
        {
          heading: "适合地铁",
          items: [
            "酒店入口确实靠近有效线路，而不只是地图上靠近地铁",
            "路线没有困难换乘，或已经确认电梯动线",
            "每位旅客都能在安检和人群中控制自己的行李",
          ],
        },
        {
          heading: "适合汽车",
          items: [
            "多件大行李、婴儿车或行动较慢的同行者让换乘变得脆弱",
            "首末班地铁无法留下安全的火车站进站余量",
            "能够准确定位车站进站口，且当时道路状况仍可接受",
          ],
        },
        {
          heading: "需要提前安排协助",
          items: [
            "如需铁路协助，应提前向负责的运营方申请",
            "如果酒店位于步行街或胡同，要问清车辆真正能停在哪里",
            "把中文车站名和进站口名称保存给司机及工作人员查看",
          ],
        },
      ],
    },
    {
      id: "wrong-heading",
      type: "heading",
      level: 2,
      text: "走错北京火车站后，按这个顺序恢复",
    },
    {
      id: "wrong-warning",
      type: "callout",
      title: "走错车站和走错进站口，是两种问题",
      tone: "warning",
      body: "如果已在正确火车站，只是到了错误广场、楼层或进站口，应先跟随站内标识或询问工作人员，不要急着离开整个枢纽。如果到了另一座铁路客站，则不存在类似机场空侧的内部换乘，也不能假设同一张车票可在那里上车。第一步是先判断自己属于哪种情况。",
    },
    {
      id: "recovery-steps",
      type: "list",
      ordered: true,
      items: [
        "先停止继续移动，打开已经出票的车票，核对中文出发站、车次、日期和发车时间。",
        "把站名给铁路或地铁工作人员看，确认自己是在同一铁路枢纽的错误入口，还是到了完全不同的火车站。",
        "如果正确车站在别处，而且确实还有充足时间，再比较实时地铁路线与准确定位的汽车路线。把等待、道路交通、搬运行李和正常进站余量都算进去，不要把网上固定的站间时间当作保证。",
        "如果时间余量并不安全，应立即联系中国铁路12306、车站服务台或购票渠道，了解这张票当前可以采用的改签或退票办法。不要让同行人分散在不同车站，并把护照与行李分开。",
        "票务状态明确后，再重新安排酒店、景点、航班或后续交通。没有可用车票却继续匆忙穿城，只会制造第二个问题。",
      ],
    },
    {
      id: "recovery-table",
      type: "table",
      caption: "按真正发生的错误选择恢复动作",
      columns: ["发生了什么", "立即怎么做", "不要想当然"],
      rows: [
        [
          "车站正确，进站口或广场错误",
          "跟随站内标识或询问工作人员前往正确候车区域，离开整个枢纽前先问清楚",
          "不要因为地图定位不同，就马上叫车穿越北京",
        ],
        [
          "车站错误，但经核实时间充足",
          "全组一起按实时地铁或公路路线前往，到站后再次核对站名",
          "不要只从发车时间中减去车辆行驶时间",
        ],
        [
          "车站错误，时间紧张或无法判断",
          "一边向铁路或购票渠道询问票务选择，一边判断继续赶往正确车站是否仍然合理",
          "不要期待列车等待，也不要认为同一张票能在错误车站检票上车",
        ],
        [
          "列车已经开出",
          "按这张票和该车次的当前状态，向官方渠道询问处理办法",
          "不要依赖旧攻略给出的通用改签或退款承诺",
        ],
      ],
    },
    {
      id: "recovery-figure",
      type: "figure",
      src: "/images/guides/which-beijing-railway-station/fengtai-qinghe-transfer-1440.webp",
      alt: "北京丰台站中央大厅。",
      width: 1440,
      height: 960,
      caption: "在北京丰台站这样的大型枢纽，改变路线前先核对车站名、大厅和当日标识。照片：N509FZ／Wikimedia Commons，CC BY-SA 4.0；已裁切。",
    },
    {
      id: "verify-heading",
      type: "heading",
      level: 2,
      text: "付款或离开酒店前的最终检查",
    },
    {
      id: "verification-list",
      type: "list",
      ordered: true,
      items: [
        "实时行程中的完整中文出发站与到达站",
        "车次、出行日期及已经出票的状态",
        "常见线路方向只能用来检查是否合理，不能当作证明",
        "酒店门口到第一座有效地铁入口或合法车辆上车点的路线",
        "地铁当天首末班时间，以及每一次必须完成的换乘",
        "车票显示检票口后，与之适合的铁路进站口、广场或落客定位",
        "行李箱、婴儿车、儿童和行动较慢同行者在整条链路中的交接",
        "走错站时的止损线：什么时候应停止继续穿城，先询问票务处理",
      ],
    },
    {
      id: "fact-check-box",
      type: "callout",
      title: "动态车站信息核查于2026年8月11日",
      tone: "neutral",
      body: "截至本次核查，北京站接驳地铁2号线；南站接驳4号线、14号线；西站接驳7号线、9号线；北站可通过西直门换乘2号线、4号线和13号线；朝阳站接驳3号线；丰台站接驳10号线、16号线；清河站接驳13号线、昌平线；通州站接驳6号线。铁路停站安排、地铁运营时间、进站口、检票口和道路管制仍需按出行日期核对。",
    },
    {
      id: "help-callout",
      type: "callout",
      title: "需要人工核对车站是否匹配？",
      tone: "decision",
      body: "请提供出行日期、车次或准备购买的路线、完整票面站名、酒店名称、同行人数、行李，以及下车后的固定截止时间。Homeground可以标出哪些车站—酒店交接需要重点核对；铁路实时余票和市内交通仍需按具体日期确认。",
    },
    {
      id: "internal-links",
      type: "internal-links",
      title: "继续处理行程中正确的那一部分",
      items: [
        {
          label: "第一次坐中国高铁完整指南",
          href: "/zh/guides/china-high-speed-train-first-time-guide/",
          description: "确认车站后，再了解铁路12306、护照、席别、行李规定、安检和乘车流程。",
        },
        {
          label: "比较北京—张家界—上海交通",
          href: "/zh/guides/beijing-zhangjiajie-shanghai-transport/",
          description: "在真实的城市组合决策中查看北京西站的门到门作用。",
        },
        {
          label: "第一次去北京住哪里",
          href: "/zh/guides/beijing-where-to-stay-first-trip/",
          description: "按完整行程比较王府井、前门、三里屯和北城胡同，而不是只为一趟火车选住宿。",
        },
        {
          label: "检查整个中国行程是否过于赶",
          href: "/zh/guides/is-your-china-itinerary-too-rushed/",
          description: "把进站交通和错误恢复时间计入真正的交通日。",
        },
      ],
    },
    {
      id: "sources",
      type: "sources",
      title: "官方来源与图片授权",
      items: [
        {
          label: "北京铁路枢纽方向分工与八站网络",
          url: "https://www.beijing.gov.cn/ywdt/gzdt/202512/t20251227_4368256.html",
          publisher: "北京市人民政府；来源：北京日报",
          reviewedAt: "2026-08-11",
        },
        {
          label: "北京通州站开通、接驳地铁6号线及初期城际列车方向",
          url: "https://english.beijing.gov.cn/livinginbeijing/transportation/railway/202512/t20251231_4381067.html",
          publisher: "北京国际门户网站",
          reviewedAt: "2026-08-11",
        },
        {
          label: "北京各铁路客站常见目的地方向与直达地铁线路",
          url: "https://english.beijing.gov.cn/latest/news/202412/t20241225_3973421.html",
          publisher: "北京国际门户网站；来源：北京日报客户端",
          reviewedAt: "2026-08-11",
        },
        {
          label: "2026年3月发布的北京铁路客站进站口、地铁接驳与检票口指南",
          url: "https://www.beijing.gov.cn/fuwu/bmfw/sy/jrts/202603/t20260311_4554596.html",
          publisher: "北京市人民政府；来源：北京日报",
          reviewedAt: "2026-08-11",
        },
        {
          label: "地铁3号线接入北京朝阳站及2024年发布的铁路客站地铁接驳",
          url: "https://english.beijing.gov.cn/livinginbeijing/transportation/beijingsubway/202412/t20241216_3966828.html",
          publisher: "北京国际门户网站",
          reviewedAt: "2026-08-11",
        },
        {
          label: "北京朝阳站交通枢纽进站口、3号线与车辆区域",
          url: "https://english.beijing.gov.cn/livinginbeijing/transportation/railway/202412/t20241217_3967615.html",
          publisher: "北京国际门户网站",
          reviewedAt: "2026-08-11",
        },
        {
          label: "北京丰台站2026年5月启用地下快捷进站厅",
          url: "https://english.beijing.gov.cn/latest/news/202605/t20260514_4650790.html",
          publisher: "北京国际门户网站；来源：北京发布",
          reviewedAt: "2026-08-11",
        },
        {
          label: "北京主要铁路客站出租车与网约车上车指南",
          url: "https://english.beijing.gov.cn/travellinginbeijing/transportation/railway/202510/t20251011_4221239.html",
          publisher: "北京国际门户网站；来源：国铁北京局",
          reviewedAt: "2026-08-11",
        },
        {
          label: "中国铁路12306实时车次查询",
          url: "https://www.12306.cn/en/index.html",
          publisher: "中国铁路12306",
          reviewedAt: "2026-08-11",
        },
        {
          label: "按日期调整地铁运营时间的节假日公告示例",
          url: "https://english.beijing.gov.cn/latest/news/202602/t20260224_4537348.html",
          publisher: "北京国际门户网站",
          reviewedAt: "2026-08-11",
        },
        {
          label: "铁路12306重点旅客预约服务说明",
          url: "https://kyfw.12306.cn/otn/view/icentre_qxyyInfo.html",
          publisher: "中国铁路12306",
          reviewedAt: "2026-08-11",
        },
        {
          label: "首图：Beijing Chaoyang Railway Station (20251220131259)，摄影 N509FZ，CC BY-SA 4.0",
          url: "https://commons.wikimedia.org/wiki/File:Beijing_Chaoyang_Railway_Station_(20251220131259).jpg",
          publisher: "Wikimedia Commons",
          reviewedAt: "2026-08-11",
        },
        {
          label: "正文图：Entrance of Metro Chaoyang Railway Station (20241215172322)，摄影 N509FZ，CC BY-SA 4.0",
          url: "https://commons.wikimedia.org/wiki/File:Entrance_of_Metro_Chaoyang_Railway_Station_(20241215172322).jpg",
          publisher: "Wikimedia Commons",
          reviewedAt: "2026-08-11",
        },
        {
          label: "正文图：Central lobby of Beijing Fengtai Railway Station (20220620140021)，摄影 N509FZ，CC BY-SA 4.0",
          url: "https://commons.wikimedia.org/wiki/File:Central_lobby_of_Beijing_Fengtai_Railway_Station_(20220620140021).jpg",
          publisher: "Wikimedia Commons",
          reviewedAt: "2026-08-11",
        },
      ],
    },
  ],
} as const satisfies StructuredPageBody;

export default body;
