import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead",
      type: "lead",
      text: "广州同时是三件事：重要的国际到达城市、岭南城市文化的历史中心，以及珠三角和港澳方向的铁路枢纽。第一个决定不是去哪里，而是这座城市要不要拿到属于自己的住宿夜，还是只当飞机落地的地方。",
    },
    {
      id: "decision-heading",
      type: "heading",
      level: 2,
      text: "广州要不要住，还是只中转？",
    },
    {
      id: "decision-1",
      type: "paragraph",
      text: "如果你真的在意粤菜饮食文化、江河贸易、宗族建筑、街区生活，以及一座老商业城市与当代区域中心之间的反差，就给它住宿夜；也可以把它当作前往深圳、香港或澳门的内地起点或终点。如果订它只是因为机票便宜，而且转机时间根本走不出机场与铁路走廊，那就不必单独停留。",
    },
    {
      id: "decision-2",
      type: "paragraph",
      text: "两晚能换来一个扎实的老城日；三晚才能让岭南广州和更新的珠江轴线同时成立，而不是互相挤压。番禺的长隆是独立的一整天；佛山或顺德是会消耗额外时间的延伸，而不是广州的另一个街区。",
    },
    {
      id: "nights-table",
      type: "table",
      caption: "不同停留长度能诚实装下什么",
      columns: ["在广州的时间", "现实能覆盖什么", "应该舍弃什么", "在路线中的角色"],
      rows: [
        [
          "一晚",
          "抵达、一个选对区域的晚上，再加一个紧凑的上午簇",
          "把老城、广州塔、琶洲和长隆一次扫完",
          "后续火车或航班之前的门户停留",
        ],
        [
          "两晚",
          "一个完整老城日，加珠江新轴线或一个真实的抵达缓冲",
          "完整的长隆日，除非几乎其他都不要了",
          "更大中国行程中的一段有意义的引入",
        ],
        [
          "三晚",
          "荔湾、北京路与越秀、新中轴，以及不让早茶吞掉整趟行程的时间",
          "佛山、顺德和长隆仍在抢同一批小时",
          "广州作为独立目的地",
        ],
        [
          "三晚加长隆",
          "两个中心日，加一个受保护的番禺乐园日，通常还要多一晚",
          "为了守住一间酒店而跨城早起赶开园",
          "以家庭为主的广州停留",
        ],
        [
          "四晚以上加佛山或顺德",
          "广州核心，加一条有明确理由的区域延伸",
          "把珠三角每座城市都说成广州一日游",
          "区域基地或更慢的华南停留",
        ],
      ],
    },
    {
      id: "nights-note",
      type: "paragraph",
      text: "数的是可用小时，不是“两天”这个标签。下午中段抵达再加取行李和入住并不等于一个下午；早上从广州南站出发，时间在开车前很久就已经被吃掉。",
    },
    {
      id: "stay-heading",
      type: "heading",
      level: 2,
      text: "住哪里：按任务选，而不是按区域名气",
    },
    {
      id: "stay-table",
      type: "table",
      caption: "五个广州基地，按承担任务比较",
      columns: ["区域", "最适合", "会变得更容易", "会变得更困难"],
      rows: [
        [
          "荔湾／沙面",
          "第一次的文化型停留、老街与更慢的晚上",
          "陈家祠、永庆坊与沙面可以排成一条线；早茶文化",
          "天河的商务地址、琶洲的展会与番禺的早出发",
        ],
        [
          "北京路／越秀",
          "兼顾中心可达性的均衡首住",
          "北京路已发掘的路面层、越秀景点、博物馆、跨城地铁",
          "既不靠广州南站也不靠机场；部分酒店位于繁忙步行街",
        ],
        [
          "天河／珠江新城",
          "商务延伸与当代城市",
          "新中轴、花城广场、国际化酒店",
          "荔湾的老城肌理从“晚上散步”变成“专门安排一趟”",
        ],
        [
          "海珠／琶洲",
          "广交会或安排很紧的展会行程",
          "会展中心与琶洲的会面",
          "休闲夜晚需要移动；展会期间房价与房量剧烈波动",
        ],
        [
          "番禺",
          "长隆或广州南站的衔接",
          "早入园与南侧出发",
          "历史中心和滨江都不在旁边；“广州酒店”可能藏着一次长距离横穿",
        ],
      ],
    },
    {
      id: "stay-1",
      type: "paragraph",
      text: "荔湾和沙面相关但不等同：沙面是一座紧凑的历史小岛，荔湾是大得多的生活城区。请核对酒店真实的地铁出入口和步行路线，而不是只看区域名。北京路与越秀构成一个实用的中心，有可见的旧路面层、城市史、公园和博物馆。",
    },
    {
      id: "shamian-figure",
      type: "figure",
      src: "/images/destinations/guangzhou/shamian-1200.webp",
      alt: "广州沙面岛上一栋二十世纪初的洋楼，安静街道两旁是高大的榕树。",
      width: 1200,
      height: 750,
      caption:
        "沙面是一座有自己尺度和安静感的小岛。把它当成整个荔湾，是最快误判西部老城需要多少时间的方式。",
    },
    {
      id: "stay-2",
      type: "paragraph",
      text: "天河与珠江新城适合商务和新中轴，但它们替代不了老城——请主动保留一段荔湾或越秀的时间。琶洲是任务型的：只有需要反复参展时才值得住在场馆旁。番禺在以长隆或广州南站为锚点时成立，但拆分住宿会多出退房、行李和再一次入住。",
    },
    {
      id: "stay-network-links",
      type: "internal-links",
      title: "选定广州基地后，再核验具体物业",
      items: [
        {
          label: "酒店是真的靠近地铁吗？",
          href: "/zh/guides/china-hotel-near-metro/",
          description: "核对真正有用的出入口、步行街路线、过街与大堂，不只看地图半径。",
        },
        {
          label: "核验真正可用的无障碍客房",
          href: "/zh/guides/china-accessible-hotel-room-verification/",
          description: "为从街道到客房的完整路线索要对应房型的尺寸与证据。",
        },
        {
          label: "外宾预订、住宿登记与被拒恢复",
          href: "/zh/guides/foreigners-china-hotel/",
          description: "分清全国规则、平台页面与这家物业前台实际能够完成的流程。",
        },
        {
          label: "决定国际航班前最后一晚住哪里",
          href: "/zh/guides/china-last-night-before-international-flight/",
          description: "从准确航站楼与后备链比较广州市区最后一晚和白云机场侧缓冲住宿。",
        },
      ],
    },
    {
      id: "stay-quote-handoff",
      type: "callout",
      title: "需要人工核对住宿区和房型吗？",
      tone: "decision",
      body: "请提供旅行日期、人数、房间数与床型要求、准确的抵离机场或火车站、重点行程、住宿预算及币种、行李情况，以及儿童、老人、行动不便或无障碍需求。Homeground 可以人工核验区域、物业事实并取得当次书面报价。书面报价不代表实时房态、最终价格或该物业一定能够为外宾办理登记；付款和抵达前仍须向具名物业再次确认。",
    },
    {
      id: "airport-heading",
      type: "heading",
      level: 2,
      text: "白云机场：T1 已经关闭，地面方案随之改变",
    },
    {
      id: "airport-1",
      type: "paragraph",
      text: "这是旧广州攻略里最容易过时的一条。2026 年 5 月 7 日起，白云机场 11 家国内航司从 T1 全部转场至 T3，服役近二十二年的 T1 停止客运并进入改造。2026 年 7 月已确定改造设计方案，但没有公布复航日期，因此不能按“快要重开”来规划。与此同时，与 T1 相连的地铁机场南站和城际白云机场南站也不再停靠办客。",
    },
    {
      id: "airport-table",
      type: "table",
      caption: "2026 年 5 月调整后的白云各航站楼与轨道衔接",
      columns: ["航站楼", "客运角色", "可比较的轨道衔接", "规划规则"],
      rows: [
        [
          "T1",
          "2026 年 5 月 7 日起停止客运，正在改造",
          "地铁机场南站与城际白云机场南站不再办客",
          "不要按旧地图、收藏的定位点或 5 月之前的说明前往 T1",
        ],
        [
          "T2",
          "在用的客运航站楼",
          "地铁 3 号线机场北站，城际白云机场北站",
          "先确认实际承运航司，再按酒店选地铁、城际还是道路",
        ],
        [
          "T3",
          "在用的国内、国际与地区航站楼",
          "城际白云机场东站；没有直连地铁站",
          "机场自己的建议是地铁 3 号线或 9 号线到高增站，再换机场巴士",
        ],
      ],
    },
    {
      id: "airport-2",
      type: "paragraph",
      text: "遇到代码共享航班，先确定实际承运航司，再从最新行程单读出是 T2 还是 T3，出行当天再核对一次，并保存中文航站楼名称。带多件行李的家庭即使知道有轨道方案，仍可能更愿意直接坐官方出租车，而不是在高增站换乘。",
    },
    {
      id: "airport-links",
      type: "internal-links",
      title: "把航站楼决定交给对应 owner",
      items: [
        {
          label: "广州白云机场：T2 还是 T3？",
          href: "/zh/guides/guangzhou-baiyun-airport-t2-t3/",
          description: "航司分配、详细地面交通，以及走错航站楼之后怎么补救。",
        },
      ],
    },
    {
      id: "stations-heading",
      type: "heading",
      level: 2,
      text: "五个火车站，其中一个在 2026 年 1 月换了角色",
    },
    {
      id: "stations-1",
      type: "paragraph",
      text: "路线里写“广州”是不够的。票面运行时间可能看起来很高效，而酒店到车站那一段会毁掉整趟行程。2026 年 1 月的调图还在其中两个车站之间调换了任务，所以旧资料可能错得很有底气。",
    },
    {
      id: "stations-table",
      type: "table",
      caption: "广州主要车站及各自的用途",
      columns: ["车站", "角色", "优先核对的方向", "常见错误"],
      rows: [
        [
          "广州南站",
          "位于番禺、历史中心以南的大型高铁枢纽",
          "香港西九龙、深圳、长沙南、珠海及多条全国线路",
          "把它当作市中心，没给进站路程和站内步行留够时间",
        ],
        [
          "广州东站",
          "天河一侧的枢纽，进城方便",
          "深圳，以及按日期存在的香港或向东方向车次",
          "默认所有去香港或深圳的车都走南站",
        ],
        [
          "广州站",
          "2026 年 1 月 26 日起不再办理普速列车始发终到，转而承接京广高铁列车",
          "京广、贵广、南广、广汕方向高铁",
          "还在用把它描述成普速终点站的旧攻略",
        ],
        [
          "广州白云站",
          "现聚焦普速列车、广湛高铁动车，并新增跨省动车组",
          "普速长途以及西南方向",
          "把它和白云机场混淆，或仍指望已经挪到广州站的京广高铁",
        ],
        [
          "广州北站",
          "花都区、位于中心城区以北的车站",
          "在具体车次合适时的部分北向线路",
          "因为“北”听起来顺路就下单，却没核对进城那段长距离接驳",
        ],
      ],
    },
    {
      id: "stations-2",
      type: "paragraph",
      text: "去香港，先搜广州南，再按具体日期单独搜广州东。去深圳，让广州这一端的车站去匹配深圳那一端的落点，而不是凭习惯。证件、行李和乘车流程属于高铁指南；本页只负责车站层面的总览。",
    },
    {
      id: "station-links",
      type: "internal-links",
      title: "继续交给交通 owner",
      items: [
        {
          label: "第一次坐中国高铁",
          href: "/zh/guides/china-high-speed-train-first-time-guide/",
          description: "12306、证件、席别、行李、安检与检票上车。",
        },
        {
          label: "广州到香港怎么走",
          href: "/zh/guides/guangzhou-hong-kong-transport-route/",
          description: "车站选择、口岸流程，以及诚实的门到门比较。",
        },
        {
          label: "广州到澳门怎么走",
          href: "/zh/guides/guangzhou-macau-transport-route/",
          description: "拱北与横琴两条口岸链路的比较。",
        },
      ],
    },
    {
      id: "clusters-heading",
      type: "heading",
      level: 2,
      text: "把广州读成西边的老城与东边的新轴",
    },
    {
      id: "cluster-1-heading",
      type: "heading",
      level: 3,
      text: "陈家祠、永庆坊与沙面",
    },
    {
      id: "cluster-1",
      type: "paragraph",
      text: "这三处同在广州西部，但不是一个连续景区。陈家祠是一次集中的建筑参观，永庆坊是更新后的历史街区，沙面则是一座独立的江中小岛。先安排开放时间约束最硬的一处，再以街区节奏穿过荔湾，把沙面放在稍晚的时段。",
    },
    {
      id: "cluster-2-heading",
      type: "heading",
      level: 3,
      text: "北京路与越秀",
    },
    {
      id: "cluster-2",
      type: "paragraph",
      text: "北京路是一条仍在营业的商业街，脚下叠着已发掘的旧路面；越秀提供更大的城市与历史语境。把这条街当作证据来读，而不是当作购物清单，并把它和越秀的博物馆或公园搭配，而不是立刻跨城赶下一个点。",
    },
    {
      id: "cluster-3-heading",
      type: "heading",
      level: 3,
      text: "珠江新城与广州塔",
    },
    {
      id: "cluster-3",
      type: "paragraph",
      text: "珠江新城在当代中轴的北岸，广州塔在江对面的海珠。两者从相反方向解释同一个新中心。登塔票是可选项——请判断付费高空视角是否比滨江本身多给你东西。这里的价值在于与荔湾、越秀的反差，而不是高度。",
    },
    {
      id: "zjnt-figure",
      type: "figure",
      src: "/images/destinations/guangzhou/zhujiang-new-town-1200.webp",
      alt: "隔着珠江看广州珠江新城天际线，滨江一侧是成片高层建筑。",
      width: 1200,
      height: 750,
      caption:
        "新中轴最好从对岸理解。一边给你视野，另一边把你放进去——两边都走一次才是重点，而不是那张登塔票。",
    },
    {
      id: "cluster-4-heading",
      type: "heading",
      level: 3,
      text: "琶洲，以及作为独立片区的长隆",
    },
    {
      id: "cluster-4",
      type: "paragraph",
      text: "琶洲在海珠更东侧，围绕会议与展览组织。没有展会时它不是初访的当然优先项；有展会时它会改变全城的房价与交通需求。长隆是中心以南的番禺亲子片区，需要一整天，而不是塞在老城上午和天河晚上之间的一个空档。",
    },
    {
      id: "extensions-heading",
      type: "heading",
      level: 2,
      text: "佛山、顺德、深圳、香港与澳门",
    },
    {
      id: "extensions-table",
      type: "table",
      caption: "当日延伸还是下一站",
      columns: ["地点", "适合当日延伸的情况", "更适合作为下一站的情况", "必须讲清的边界"],
      rows: [
        [
          "佛山",
          "只以一两处岭南文化点为目的",
          "想看多个片区或继续往粤西走",
          "佛山是独立城市，不是广州的一个街区",
        ],
        [
          "顺德",
          "以饮食为主、并且地理安排克制的一天",
          "饮食文化是行程主题，且在意晚上",
          "顺德是佛山的一个区；有名的吃并不代表店挨得近",
        ],
        [
          "深圳",
          "某一项具体活动值得一天的交通成本",
          "当代城市或商务值得真实时间",
          "不要只因为它在去香港的路上就加一晚深圳",
        ],
        [
          "香港",
          "很少——口岸密集的休闲一日游不是好的首选",
          "作为目的地或国际门户，至少住一晚",
          "特别行政区，有独立入境流程，不是普通广东城市",
        ],
        [
          "澳门",
          "只有在时间充裕、且口岸链路选得仔细时",
          "历史城区、路氹或后续航班值得过夜",
          "从广州买的车票不会替你过关",
        ],
      ],
    },
    {
      id: "extension-links",
      type: "internal-links",
      title: "区域顺序交给对应 owner",
      items: [
        {
          label: "广州、深圳与香港：顺序怎么排",
          href: "/zh/guides/guangzhou-shenzhen-hong-kong-route-order/",
          description: "深圳值不值得一间酒店，以及不住时该选哪种过境方式。",
        },
        {
          label: "广州早茶是怎么运作的",
          href: "/zh/guides/how-guangzhou-morning-tea-works/",
          description: "点单、分享、茶位费，以及这顿饭背后的社交文化。",
        },
        {
          label: "地铁施工遇上考古时会发生什么",
          href: "/zh/guides/when-metro-construction-meets-archaeology/",
          description: "北京路可见路面层这类现场背后的证据框架。",
        },
      ],
    },
    {
      id: "recheck-heading",
      type: "heading",
      level: 2,
      text: "临行前必须重新核对的几件事",
    },
    {
      id: "recheck-list",
      type: "list",
      items: [
        "每一段白云航班的实际承运航司和航站楼——T1 已关闭，T2 与 T3 的轨道衔接不同。",
        "T3 的“轨道＋摆渡”方案是否仍与机场当前建议一致，以及带大件行李时意味着什么。",
        "每张车票上的确切车站——广州站与广州白云站在 2026 年 1 月互换了任务。",
        "如果行程靠近广交会会期，请查官方展期，房价与交通需求会全城变化。",
        "前往香港或澳门的入境资格与口岸流程，它们与内地出行是分开的。",
      ],
    },
    {
      id: "faq-heading",
      type: "heading",
      level: 2,
      text: "常见问题",
    },
    {
      id: "faq-1-heading",
      type: "heading",
      level: 3,
      text: "广州值得单独住几晚，还是只中转？",
    },
    {
      id: "faq-1",
      type: "paragraph",
      text: "当粤菜饮食文化、岭南城市史或华南路线对你重要时，就住下来。两晚能形成一个扎实的城市日，三晚能让老城与珠江轴线并存。只有当整条路线已经排满时，才只做中转。",
    },
    {
      id: "faq-2-heading",
      type: "heading",
      level: 3,
      text: "白云机场我应该用哪个航站楼？",
    },
    {
      id: "faq-2",
      type: "paragraph",
      text: "用你这趟航班被分配的那个，只会是 T2 或 T3。T1 自 2026 年 5 月 7 日起停止客运，且未公布复航日期。T2 有直连地铁与城际站；T3 有城际站但没有直连地铁，机场建议坐 3 号线或 9 号线到高增站再换摆渡巴士。",
    },
    {
      id: "faq-3-heading",
      type: "heading",
      level: 3,
      text: "去香港该从哪个广州车站走？",
    },
    {
      id: "faq-3",
      type: "paragraph",
      text: "先搜广州南到香港西九龙，再按你的日期单独查广州东。然后比较酒店到车站这一段：正确答案是那趟真实存在、并且让整趟出行最顺的车。",
    },
    {
      id: "faq-4-heading",
      type: "heading",
      level: 3,
      text: "广州站是不是变了？",
    },
    {
      id: "faq-4",
      type: "paragraph",
      text: "是。2026 年 1 月 26 日起，它不再办理普速列车始发终到，转而承接原本在广州白云站始发的京广高铁；广州白云站则转向普速列车与其他高铁方向。请按当前运行图订票，不要按旧描述。",
    },
    {
      id: "faq-5-heading",
      type: "heading",
      level: 3,
      text: "去长隆一定要单独订酒店吗？",
    },
    {
      id: "faq-5",
      type: "paragraph",
      text: "不一定。在番禺住一晚可以保住早入园或第二天广州南站的车，但会多一次搬行李。只有当省下的那趟接驳大于退房和入住的成本时才拆分。无论怎样，长隆都是独立的一整天。",
    },
    {
      id: "faq-6-heading",
      type: "heading",
      level: 3,
      text: "普通游客遇到广交会该怎么办？",
    },
    {
      id: "faq-6",
      type: "paragraph",
      text: "更早订房、保留可取消条款，并预期琶洲与商务片区周边需求更紧。只有需要反复参展时才住在会场附近；否则让酒店贴着你的游览安排，并查官方展期。",
    },
    {
      id: "faq-7-heading",
      type: "heading",
      level: 3,
      text: "广州最后一晚应该搬到白云机场酒店吗？",
    },
    {
      id: "faq-7",
      type: "paragraph",
      text: "先确认航班使用 T2 还是 T3，再核对值机截止时间、市区酒店出发的完整链条与后备方案。若这条链很脆弱，尤其是国际早班机、带儿童老人或行李较多时，机场侧住宿更合理；若已核实出发当天的转场，且最后一个广州夜晚仍有价值，就可保留市区酒店。使用上方全国末晚指南的方法，“机场区域”标签本身不能证明去航站楼方便。",
    },
    {
      id: "cta-heading",
      type: "heading",
      level: 2,
      text: "把广州的选择放回整条路线",
    },
    {
      id: "cta-1",
      type: "paragraph",
      text: "如果现在还只是一串城市，先测试现有晚数装得下哪种顺序。如果航班和逐日安排已经存在，更好的问题是：航站楼、车站和酒店是不是当成一条链一起选的。",
    },
    {
      id: "cta-links",
      type: "internal-links",
      title: "两种继续方式",
      items: [
        {
          label: "免费人工规划初查",
          href: "/zh/#planner-contact",
          description: "提交路线与住宿限制，先由人工免费查看；不会预先选择任何付费服务。",
        },
        {
          label: "中国行程点评",
          href: "/zh/china-itinerary-review/",
          description: "把已有的逐日路线交上来，让人帮你找出薄弱环节。",
        },
      ],
    },
    {
      id: "sources",
      type: "sources",
      title: "官方来源与复核记录",
      items: [
        {
          label: "白云 T1 航司转场至 T3，与 T1 相连的轨道车站自 2026 年 5 月 7 日起不再办客",
          url: "https://www.eguangzhou.gov.cn/gzlatest/content/post_42957.html",
          publisher: "广州市人民政府外事办公室",
          reviewedAt: "2026-08-17",
        },
        {
          label: "T1 停止运行；T3 无直连地铁，机场建议 3 号线或 9 号线到高增站再换摆渡",
          url: "https://www.eguangzhou.gov.cn/gzlatest/content/post_43024.html",
          publisher: "广州市人民政府外事办公室",
          reviewedAt: "2026-08-17",
        },
        {
          label: "2026 年 1 月 26 日起广州站不再办理普速列车始发终到业务",
          url: "https://www.gz.gov.cn/zwfw/zxfw/jtfw/content/post_10648700.html",
          publisher: "广州市人民政府",
          reviewedAt: "2026-08-17",
        },
        {
          label: "广州站转入高铁运营，广州白云站承接普速列车",
          url: "https://www.gz.gov.cn/zwfw/zxfw/jtfw/content/post_10675644.html",
          publisher: "广州市人民政府",
          reviewedAt: "2026-08-17",
        },
        {
          label: "中国铁路 12306：订票前核对完整站名",
          url: "https://www.12306.cn/en/index.html",
          publisher: "中国铁路 12306",
          reviewedAt: "2026-08-17",
        },
        {
          label: "首图：陈家祠，摄影 Shujianyang，CC BY-SA 4.0；已裁切转码",
          url: "https://commons.wikimedia.org/wiki/File:Chen_Clan_Ancestral_Hall_2025.06_01.jpg",
          publisher: "Wikimedia Commons",
          reviewedAt: "2026-08-17",
        },
        {
          label: "沙面照片，摄影 xiquinhosilva，CC BY 2.0；已裁切转码",
          url: "https://commons.wikimedia.org/wiki/File:Shamian_Island_03111-Guangzhou_(32831146512).jpg",
          publisher: "Wikimedia Commons",
          reviewedAt: "2026-08-17",
        },
        {
          label: "珠江新城照片，摄影 Nissangeniss，CC BY-SA 4.0；已裁切转码",
          url: "https://commons.wikimedia.org/wiki/File:The_architectural_complex_of_the_Zhujiang_New_Town_in_2017_12(2).jpg",
          publisher: "Wikimedia Commons",
          reviewedAt: "2026-08-17",
        },
        {
          label: "许可：CC BY-SA 4.0",
          url: "https://creativecommons.org/licenses/by-sa/4.0/",
          publisher: "Creative Commons",
          reviewedAt: "2026-08-17",
        },
        {
          label: "许可：CC BY 2.0",
          url: "https://creativecommons.org/licenses/by/2.0/",
          publisher: "Creative Commons",
          reviewedAt: "2026-08-17",
        },
      ],
    },
  ],
} as const satisfies StructuredPageBody;

export default body;
