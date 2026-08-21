import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead-001",
      type: "lead",
      text: "重庆难规划，不是因为景点不够多，而是因为几种地理关系同时叠在一张地图上：两条大江、陡峭江岸、上下重叠的道路、同一栋建筑位于不同楼层的入口，以及一个大到既包含超大城市核心区、也包含遥远世界遗产地的直辖市。"
    },
    {
      id: "paragraph-002",
      type: "paragraph",
      text: "第一次来重庆，真正有用的问题不是“要收集哪些网红机位”，而是：重庆的哪一部分值得放进这条中国路线，应该住在哪里，车票上写的究竟是哪座交通枢纽，以及同行者能够承受多少坡度、换乘和步行。"
    },
    {
      id: "paragraph-003",
      type: "paragraph",
      text: "这篇指南帮助你做这些整体决策。它不替代逐街逐层的方向教程，不重写完整住宿区比较，也不承担天坑地质正文或川剧完整指南。"
    },
    {
      id: "heading-004",
      type: "heading",
      level: 2,
      text: "一分钟做决定"
    },
    {
      id: "list-005",
      type: "list",
      ordered: false,
      items: [
        "两晚通常只能保护出一个完整市区日。把行程集中在渝中核心区和一个邻近夜间区域，不要加入武隆或大足。",
        "三晚通常能得到两个完整白天。这是第一次来重庆时，兼顾中心城区与一个跨江或跨区选择的实用最低配置。",
        "四至五晚才适合加入一个远郊延伸。武隆是自然景观优先的一整天，有时值得住一晚；大足是文化遗产优先的一整天，目前仍主要依赖公路往返。",
        "解放碑最适合以核心景点为主的首次到访；观音桥适合现代商业生活与较晚的夜间活动；南岸适合明确要看南岸江景的人；沙坪坝主要是铁路和西部行程任务驱动的选择。",
        "必须读车票上的完整站名。重庆北站、重庆西站、沙坪坝站和重庆东站是不同枢纽。",
        "地图上的短直线不等于可承诺的步行时间。先核对江岸、街道层级、实际入口和上下连接方式。"
      ]
    },
    {
      id: "heading-006",
      type: "heading",
      level: 2,
      text: "1. 重庆在中国路线中的角色"
    },
    {
      id: "river-confluence",
      type: "figure",
      src: "/images/destinations/chongqing/confluence-1200.webp",
      alt: "重庆渝中半岛下方的长江与嘉陵江交汇处。",
      width: 1200,
      height: 800,
      caption: "两江交汇的地理关系说明：地图上看似相邻的区域，仍可能需要过桥、穿隧道或乘轨道交通。"
    },
    {
      id: "paragraph-007",
      type: "paragraph",
      text: "重庆是中国四个直辖市之一，在行政层级上直接连接中国国家层级，而不是四川省内的一座城市。“重庆”既可能指中心城区，也可能指范围大得多的重庆市域，还可能指通往数小时之外景区的门户。"
    },
    {
      id: "paragraph-008",
      type: "paragraph",
      text: "城市位于长江与嘉陵江交汇处，在旅行路线中通常承担三种角色："
    },
    {
      id: "list-009",
      type: "list",
      ordered: true,
      items: [
        "成渝双城中的城市目的地。 重庆和成都之间铁路选择多、组合自然，但两城不能互相替代。成都更平坦，常用于熊猫、茶馆及四川省内支线；重庆更陡峭，以江河结构、立体城市景观和长江门户角色见长。",
        "长江上游游轮的起点或终点。 三峡游轮主流市场仍以重庆—宜昌产品为核心，但不同公司也可能使用不同登船地和线路版本。游轮应当被视为一项独立交通产品，最终由运营方分配码头，而不是默认所有船都从朝天门某一个固定泊位出发。",
        "西南地区与武陵山区之间的连接点。 当前铁路格局包括从重庆东站向武隆南、黔江延伸的渝东南走廊，也有部分张家界方向列车。芙蓉镇和凤凰必须按具体日期重新核对；已经获批但尚未建成的黔江—吉首铁路不能当作当前连接使用。"
      ]
    },
    {
      id: "heading-010",
      type: "heading",
      level: 3,
      text: "决策表：重庆是否适合你的路线？"
    },
    {
      id: "table-011",
      type: "table",
      caption: "决策表：重庆是否适合你的路线？",
      columns: [
        "主要兴趣",
        "匹配度",
        "为什么适合",
        "主要提醒"
      ],
      rows: [
        [
          "立体城市与基础设施",
          "很强",
          "江河、桥梁、轨道和陡岸本身就是体验的一部分",
          "只按照片打卡会掩盖真实路线逻辑"
        ],
        [
          "美食与夜间城市生活",
          "很强",
          "社区餐饮密集，商业区夜间活跃",
          "习惯早睡的旅客未必能利用这一优势"
        ],
        [
          "夜景",
          "强，但应放在第二层",
          "白天先理解江河与岸线，夜景才更有意义",
          "不要让一个排队机位控制整段停留"
        ],
        [
          "自然景观",
          "加时间后很强",
          "武隆提供重要喀斯特延伸",
          "武隆不在市中心"
        ],
        [
          "佛教艺术与文化遗产",
          "需要专门一天时很强",
          "大足石刻值得独立安排",
          "石刻群不属于中心城区行程"
        ],
        [
          "低步行量城市短住",
          "可以，但必须重设计",
          "轨道、车辆、电梯和坐式观景可降低消耗",
          "“看起来近”不等于平坦或无障碍"
        ]
      ]
    },
    {
      id: "heading-012",
      type: "heading",
      level: 2,
      text: "2. 重庆需要住几晚？"
    },
    {
      id: "paragraph-013",
      type: "paragraph",
      text: "计算的是完整可游览白天，而不只是酒店夜数。深夜抵达、清早离开，可能把三晚压缩成一个真正可用的白天。重庆也很适合把抵达晚间留轻：先找到正确酒店入口、在附近吃饭，通常比抵达后硬塞一串跨城景点更合理。"
    },
    {
      id: "heading-014",
      type: "heading",
      level: 3,
      text: "决策表：停留晚数怎样分配"
    },
    {
      id: "table-015",
      type: "table",
      caption: "决策表：停留晚数怎样分配",
      columns: [
        "时间",
        "能保护什么",
        "合理范围",
        "应当放弃"
      ],
      rows: [
        [
          "2晚",
          "通常1个完整白天",
          "解放碑—洪崖洞—朝天门，再从十八梯/山城步道或邻近夜景中选一个",
          "武隆、大足，以及李子坝—磁器口—南山的大串联"
        ],
        [
          "3晚",
          "通常2个完整白天",
          "一天渝中核心区；另一天安排一个跨江或跨区主题",
          "同时加入两个远郊延伸"
        ],
        [
          "4晚",
          "通常3个完整白天",
          "两个市区日，加武隆或大足二选一",
          "假装远郊日结束后仍有完整市区日"
        ],
        [
          "5晚",
          "3至4个完整白天",
          "两个市区日，加武隆并可考虑过夜；或更从容的大足日",
          "除非衔接条件异常理想，否则不要同时塞入两个远郊"
        ],
        [
          "6晚以上",
          "真正的“城市＋市域”停留",
          "中心城区、一至两个远郊地区和恢复时间",
          "没有明确收益的反复换酒店"
        ]
      ]
    },
    {
      id: "paragraph-016",
      type: "paragraph",
      text: "两个市区夜晚适合把重庆当作更长中国路线中的浓缩停靠点，并不能代表整个重庆市域。对大多数第一次来的人，三晚是最合适的最低起点。加入武隆后，旅行性质变成“城市＋自然景观”：进出车站、景区接驳、内部交通、天气和步行仍会占用一个完整运营日。加入大足则形成文化与遗产主题日，应以出行日期核实后的交通与开放信息为准；本 Hub 不依赖尚未落地的未来基础设施。"
    },
    {
      id: "heading-017",
      type: "heading",
      level: 2,
      text: "3. 用四个问题读懂重庆"
    },
    {
      id: "crown-escalator",
      type: "figure",
      src: "/images/destinations/chongqing/crown-escalator-1200.webp",
      alt: "连接重庆两个街道高度的皇冠大扶梯。",
      width: 1200,
      height: 750,
      caption: "在重庆，真实的垂直连接方式比地图直线距离更有用。"
    },
    {
      id: "paragraph-018",
      type: "paragraph",
      text: "开始走路前，先问四件事："
    },
    {
      id: "list-019",
      type: "list",
      ordered: true,
      items: [
        "我在哪一侧江岸？ 渝中、江北和南岸在地图上可能隔水相望，但实际需要桥梁、隧道、轮渡或轨道连接。",
        "目的地在哪一个高度层级？ 一条路可能从另一条街下方穿过，同一栋楼也可能在相差多层的位置连接不同街道。",
        "哪个入口真正可用？ 酒店、商场、车站或景点的不同入口，可能对应完全不同的爬升和绕行。",
        "上下连接靠什么完成？ 轨道、电梯、扶梯、楼梯、坡道、车辆落客点或室内通道，可能直接决定路线是否成立。"
      ]
    },
    {
      id: "paragraph-020",
      type: "paragraph",
      text: "把重庆叫作“立体山城”，并不能告诉旅客怎样到达酒店大堂、最后一段是否有台阶，也不能解释为什么两个地图点之间的直线会变成长绕行。完整的江岸—层级—入口—连接方法、垂直交通和动态关闭提醒，可继续阅读《重庆上下城方向指南》；本篇只保留整段旅行所需的判断框架。"
    },
    {
      id: "heading-021",
      type: "heading",
      level: 2,
      text: "4. 住哪里：按任务选择，不按名气选择"
    },
    {
      id: "paragraph-022",
      type: "paragraph",
      text: "住宿区的价值在于减少整条行程中的重复移动。在重庆，具体酒店的入口条件几乎和所属商圈同样重要。付款前应核对车辆实际到达的道路、大堂所在楼层、实用的轨道入口，以及拖着行李完成最后一段的真实路径。"
    },
    {
      id: "heading-023",
      type: "heading",
      level: 3,
      text: "决策表：住宿基地怎样选"
    },
    {
      id: "table-024",
      type: "table",
      caption: "决策表：住宿基地怎样选",
      columns: [
        "基地",
        "最适合",
        "主要优势",
        "主要代价",
        "预订前核对"
      ],
      rows: [
        [
          "解放碑",
          "以中心城区为主的首次到访",
          "解放碑、洪崖洞、朝天门和十八梯之间衔接较强",
          "人流多，最后一段可能陡峭",
          "大堂准确楼层和车辆入口"
        ],
        [
          "观音桥",
          "现代购物、餐饮、夜生活和北部基地需求",
          "社区生活活跃，连接江北、渝北较方便",
          "前往老渝中会反复跨江",
          "大多数早晨是否仍要从对岸开始"
        ],
        [
          "南岸",
          "南岸天际线、南滨路、南坪或南山优先",
          "能从另一侧理解江河与渝中",
          "“南岸”内部其实是多个不同基地",
          "明确子区域，并测试每日重复路线"
        ],
        [
          "沙坪坝",
          "成都方向铁路、西部到达或磁器口任务",
          "当车站或西侧活动已固定时很方便",
          "不利于反复返回解放碑过夜生活",
          "确认沙坪坝站还是重庆西站"
        ]
      ]
    },
    {
      id: "paragraph-025",
      type: "paragraph",
      text: "前两个早晨都围绕渝中核心区时，选解放碑。更重视现代商业生活、晚间餐饮和北部交通时，选观音桥。不要把南岸当成一个单一基地：南滨路、南坪、弹子石和南山解决的是不同任务。只有当车票、抵达方向、西侧日程或磁器口真正重要时，沙坪坝才值得优先。"
    },
    {
      id: "paragraph-026",
      type: "paragraph",
      text: "完整的解放碑—观音桥—沙坪坝三地比较和具体酒店核对，可继续阅读《重庆住哪里：解放碑、观音桥还是沙坪坝》。南岸仍放在这篇全城比较中，因为最合适的子区域必须结合整条路线判断。"
    },
    {
      id: "heading-027",
      type: "heading",
      level: 2,
      text: "5. 机场和铁路站：以票面为准"
    },
    {
      id: "chongqing-east-station",
      type: "figure",
      src: "/images/destinations/chongqing/chongqing-east-station-1200.webp",
      alt: "重庆东站站房前的交通空间。",
      width: 1200,
      height: 750,
      caption: "重庆东站是独立票面车站，不是北站或西站的另一个名字。"
    },
    {
      id: "paragraph-028",
      type: "paragraph",
      text: "“重庆站”四个字不够精确。中国铁路车票会显示具体车站，而列车分工会随全国调图改变。先按旅行日期查询铁路12306，再计算酒店到该站的完整时间。"
    },
    {
      id: "heading-029",
      type: "heading",
      level: 3,
      text: "决策表：当前主要交通枢纽"
    },
    {
      id: "table-030",
      type: "table",
      caption: "决策表：当前主要交通枢纽",
      columns: [
        "枢纽",
        "规划角色",
        "常见错误"
      ],
      rows: [
        [
          "重庆江北国际机场（CKG）",
          "位于渝中核心区以北的国际与国内航空门户",
          "使用过时的T2航站楼分配，或把T3B误当成独立陆侧航站楼"
        ],
        [
          "重庆北站",
          "成熟且规模最大的铁路枢纽，覆盖广泛区域和长途线路",
          "误去重庆西站"
        ],
        [
          "重庆西站",
          "西侧重要长途与高速铁路枢纽",
          "低估从解放碑前往该站的完整转移"
        ],
        [
          "沙坪坝站",
          "位于城区、规模较小，但有重要成渝走廊服务",
          "以为所有成都列车都从这里发车"
        ],
        [
          "重庆东站",
          "位于南岸茶园方向的新枢纽，承担渝东南走廊和部分城际服务",
          "仍按旧指南忽略它，或把未来地铁线路当成已经开通"
        ]
      ]
    },
    {
      id: "heading-031",
      type: "heading",
      level: 3,
      text: "CKG机场"
    },
    {
      id: "paragraph-032",
      type: "paragraph",
      text: "自2025年12月23日起，CKG计划国内、国际及地区客运航班统一使用T3体系。旅客仍应以航空公司显示的航站楼和登机口为准，不要依赖旧攻略。机场有轨道交通连接；不过在行李多、落地较晚或酒店最后一段复杂时，车辆接送可能更合适。航班运营属于动态事实，安排接送前应再次核对航空公司订单。"
    },
    {
      id: "heading-033",
      type: "heading",
      level: 3,
      text: "重庆北、重庆西、沙坪坝和重庆东"
    },
    {
      id: "paragraph-034",
      type: "paragraph",
      text: "不要先决定车站，再去找一趟勉强匹配的列车。应先按路线和日期搜索，比较可行班次，再计算完整门到门时间。重庆北站与重庆西站承担最大客流；若班次匹配，沙坪坝站对成都方向很高效；重庆东站已经成为渝东南走廊的重要枢纽，并在2026年运行图中出现涉及武隆南、黔江和张家界西的服务。"
    },
    {
      id: "paragraph-035",
      type: "paragraph",
      text: "一份合格的接送交接信息，应包括中文站名、车次、已确认的入口信息和计划从酒店出发的时间。“去重庆火车站”不是有效说明。菜园坝的重庆站在2026年仍处于改造建设阶段，不是当前客运替代站；其附近的重庆汽车站则是另一种完全不同的设施。"
    },
    {
      id: "heading-036",
      type: "heading",
      level: 2,
      text: "6. 市区主要地点怎样形成空间关系"
    },
    {
      id: "liziba-geography",
      type: "figure",
      src: "/images/destinations/chongqing/liziba-1200.webp",
      alt: "重庆李子坝附近叠加的道路、轨道设施与江岸地形。",
      width: 1200,
      height: 800,
      caption: "李子坝属于向西的独立分区，不在中心半岛步行线内。"
    },
    {
      id: "heading-037",
      type: "heading",
      level: 3,
      text: "解放碑—洪崖洞—朝天门"
    },
    {
      id: "paragraph-038",
      type: "paragraph",
      text: "三者属于同一个大范围中心组团，但并不是一条平坦步行街。解放碑是商业核心；洪崖洞贴近陡峭江岸，多个入口位于不同层级；朝天门则向半岛尖端和两江交汇方向延伸。按方向和高度组织，而不是按社交媒体排序。一次连贯通过加一个夜间视角通常已经足够，不需要多次折返洪崖洞。"
    },
    {
      id: "heading-039",
      type: "heading",
      level: 3,
      text: "十八梯与山城步道"
    },
    {
      id: "paragraph-040",
      type: "paragraph",
      text: "这些区域能帮助旅客理解依坡而建的旧城形态，路线本身比单个照片点更重要。它们会增加台阶、不平路面，以及炎热或降雨暴露。核对入口后，选择一条连贯的上行或下行逻辑；不要把几个互不相连的地图点拼成所谓“步行路线”。"
    },
    {
      id: "heading-041",
      type: "heading",
      level: 3,
      text: "南岸与南山"
    },
    {
      id: "paragraph-042",
      type: "paragraph",
      text: "南岸提供“从对岸回看渝中”的视角。南滨路、弹子石、南坪和南山处于不同层级。南山不是江边简单向上的一层楼，前往某个观景点可能需要单独公路行程。只有当这个视角值得一次跨江和返程时，才应加入。"
    },
    {
      id: "heading-043",
      type: "heading",
      level: 3,
      text: "李子坝及其他跨区地点"
    },
    {
      id: "paragraph-044",
      type: "paragraph",
      text: "李子坝是轨道与建筑结合的典型案例，但不属于渝中半岛核心步行环线。可以把它与另一个向西任务组合，也可以只当作短暂交通停靠。施工和出口关闭必须按当天核对。磁器口、动物园和观音桥也分别属于其他组团；全部塞进同一天，实际会变成一个交通日。"
    },
    {
      id: "heading-045",
      type: "heading",
      level: 2,
      text: "7. 美食、夜景与演出怎样放进路线"
    },
    {
      id: "paragraph-046",
      type: "paragraph",
      text: "把餐饮安排成酒店附近的社区餐、提前预订的目的地餐，或一个可机动的晚间选择，而不是必须完成的单一“火锅打卡”。至少保留一餐不锁死，让当天安排能根据体力和天气调整。"
    },
    {
      id: "paragraph-047",
      type: "paragraph",
      text: "夜景在白天已经解释过两江和岸线后更有价值。一次江面高度视角、一次较高视角，或一次有座位的游船，往往已经足够。观光船、小型轮渡和主题航次可能使用不同码头和时刻，必须核对具体产品与登船点。"
    },
    {
      id: "paragraph-048",
      type: "paragraph",
      text: "川剧属于更广泛的川渝文化区域，但“变脸”并不是一场完整演出的说明。《川剧变脸：放回完整语境》会帮助旅客选择有名称的节目，并重新核对场馆、演员、节目顺序、字幕和摄影规则。"
    },
    {
      id: "heading-049",
      type: "heading",
      level: 2,
      text: "8. 武隆和大足不是市中心景点"
    },
    {
      id: "wulong-landscape",
      type: "figure",
      src: "/images/destinations/chongqing/wulong-1200.webp",
      alt: "重庆市武隆喀斯特的天生桥。",
      width: 1200,
      height: 800,
      caption: "武隆是独立的自然景观日，需要计入本地接驳、步行与天气。"
    },
    {
      id: "dazu-heritage",
      type: "figure",
      src: "/images/destinations/chongqing/dazu-1200.webp",
      alt: "重庆市大足宝顶山石刻。",
      width: 1200,
      height: 800,
      caption: "大足是专门的文化遗产延伸，不是重庆市中心景点。"
    },
    {
      id: "paragraph-050",
      type: "paragraph",
      text: "两者都位于重庆市域内。行政上属于重庆，并不等于它们是中心城区景点。"
    },
    {
      id: "heading-051",
      type: "heading",
      level: 3,
      text: "决策表：武隆还是大足？"
    },
    {
      id: "table-052",
      type: "table",
      caption: "决策表：武隆还是大足？",
      columns: [
        "决策维度",
        "武隆",
        "大足"
      ],
      rows: [
        [
          "核心理由",
          "喀斯特地貌、天生桥、峡谷、洞穴与山地环境",
          "石刻、宗教艺术、历史与保护"
        ],
        [
          "最适合的旅客",
          "自然景观优先，并能接受受天气影响的长日程",
          "文化优先，愿意拿出完整公路日"
        ],
        [
          "一日往返",
          "可行，但需要较早出发，并协调铁路/公路与当地接驳",
          "可通过公路完成，但必须明确参观石刻群顺序"
        ],
        [
          "过夜",
          "若要多个景区、慢节奏或增加天气弹性，更值得",
          "组合多个石刻群时可选，但并非通常必需"
        ],
        [
          "体力需求",
          "接驳、台阶、坡度和天气暴露因路线而变",
          "仍有步行和台阶，但不是同等强度的自然地形日"
        ],
        [
          "应放弃的条件",
          "只有两个完整市区日，而且重庆本城是主目标",
          "对文化遗产兴趣不强，或公路日会挤掉唯一从容市区日"
        ]
      ]
    },
    {
      id: "paragraph-053",
      type: "paragraph",
      text: "买到武隆南站的车票，并不等于已经到达天生三桥入口。先决定具体景区，再围绕车站接驳、游客中心、景区内部交通和步行设计。《中国天坑与陷穴说明》负责解释天坑与陷穴的地质背景；本篇帮助你判断武隆是否值得占用一天或住一晚。"
    },
    {
      id: "paragraph-054",
      type: "paragraph",
      text: "规划大足时，应围绕具体石刻群。宝顶山通常是第一次到访的首要选择；若加入北山或其他石刻点，交通和参观时间都会改变。出发前需核对当前保护工程、活动和开放安排。"
    },
    {
      id: "heading-055",
      type: "heading",
      level: 2,
      text: "9. 两种体力与行李情境"
    },
    {
      id: "heading-056",
      type: "heading",
      level: 3,
      text: "情境A：带两只大行李箱抵达"
    },
    {
      id: "paragraph-057",
      type: "paragraph",
      text: "你从重庆西站抵达，酒店在解放碑附近。最后一段包含拥堵道路、建筑裙楼，以及一个与第一个地图定位不同的实际入口。"
    },
    {
      id: "paragraph-058",
      type: "paragraph",
      text: "更好的做法：预约车辆到酒店准确的车辆入口，发送酒店中文名，并询问前台位于哪一层。第一晚只在酒店真实可步行范围内活动。不要拖着行李去测试一条未经确认的多层捷径。"
    },
    {
      id: "heading-059",
      type: "heading",
      level: 3,
      text: "情境B：同行有老人、幼儿或当天体力较低"
    },
    {
      id: "paragraph-060",
      type: "paragraph",
      text: "原清单把十八梯、山城步道、李子坝、磁器口、洪崖洞和南山全部放进一天。每一个地点单独都可行，但组合后意味着反复上下、跨区换乘和对夜间人流的耐受。"
    },
    {
      id: "paragraph-061",
      type: "paragraph",
      text: "更好的做法：每半天尽量保持在一侧江岸和一个主要高度层级。组团之间用车，保护一个有座位的午餐与休息段，并在南岸观景和游船之间二选一。重新核对电梯、扶梯、轨道出口与登船台阶。某一个设施正常运行，并不能证明整条路线无障碍。"
    },
    {
      id: "heading-062",
      type: "heading",
      level: 2,
      text: "10. 重庆之后去哪里"
    },
    {
      id: "heading-063",
      type: "heading",
      level: 3,
      text: "决策表：下一站关系"
    },
    {
      id: "table-064",
      type: "table",
      caption: "决策表：下一站关系",
      columns: [
        "下一站",
        "重庆承担的角色",
        "规划规则"
      ],
      rows: [
        [
          "成都",
          "铁路选择多、组合自然的双城搭配",
          "比较准确车站和酒店到酒店总时间，再按兴趣分配晚数"
        ],
        [
          "张家界",
          "从渝东南进入武陵地区的过渡点；目前有部分直达服务使用重庆东站",
          "按具体日期核对12306，并为整个转移保留完整时间块"
        ],
        [
          "芙蓉镇",
          "更大湘西路线中的后续基地",
          "把它当作新的过夜基地，通常与张家界顺序协调"
        ],
        [
          "凤凰",
          "更进一步的湘西基地，并有独立的车站到古城接驳",
          "不要围绕尚未建成的黔江—吉首铁路规划"
        ],
        [
          "长江游轮",
          "主流重庆—宜昌航线的上游登船城市",
          "确认运营方、船名、分配码头和登船时间"
        ]
      ]
    },
    {
      id: "paragraph-065",
      type: "paragraph",
      text: "对成都与重庆，先从各住三晚开始最均衡。若要武隆、大足或长江游轮，把额外一晚给重庆；若要熊猫和更多四川支线，则把额外一晚给成都。"
    },
    {
      id: "paragraph-066",
      type: "paragraph",
      text: "2026年运行图已经出现部分张家界西—重庆东服务，但线路图和车次格局仍在快速变化，必须查具体日期。芙蓉镇和凤凰通常接在张家界之后形成湘西顺序，或需要另一个经核实的连接；它们不是重庆一日支线。"
    },
    {
      id: "paragraph-067",
      type: "paragraph",
      text: "若从国际航班或长途列车抵达后接长江游轮，至少在重庆先住一晚。这能保护船期，也给运营方发送最终码头通知留出时间。真正决定路线的是已购买产品，而不是地图上的通用码头图标。"
    },
    {
      id: "heading-068",
      type: "heading",
      level: 2,
      text: "11. 当前规划文章与下一步入口"
    },
    {
      id: "paragraph-069",
      type: "paragraph",
      text: "以下五篇专题指南负责更具体的判断："
    },
    {
      id: "list-070",
      type: "list",
      ordered: false,
      items: [
        "重庆上下城方向指南——江岸、层级、入口、连接和垂直通行逻辑。",
        "重庆住哪里：解放碑、观音桥还是沙坪坝——完整三基地比较与具体酒店核对。",
        "中国天坑与陷穴说明——地质术语与受管理访问边界。",
        "川剧变脸：放回完整语境——演出选择与文化理解。",
        "重庆应该用哪个火车站？——按日期、票面车站、酒店接驳和错站预防执行。"
      ]
    },
    {
      id: "paragraph-071",
      type: "paragraph",
      text: "五个专题 URL 已于2026年8月21日核实在线。城市层面的判断进入车站、住宿、地质、演出或垂直动线执行时，请使用下方相应链接。"
    },
    {
      id: "heading-072",
      type: "heading",
      level: 2,
      text: "常见问题"
    },
    {
      id: "heading-073",
      type: "heading",
      level: 3,
      text: "重庆需要住几晚？"
    },
    {
      id: "paragraph-074",
      type: "paragraph",
      text: "大多数第一次到访者以三晚为实用最低配置，因为通常能保护两个完整市区日。两晚适合一个浓缩日。加入武隆或大足，至少再增加一晚。"
    },
    {
      id: "heading-075",
      type: "heading",
      level: 3,
      text: "住解放碑还是观音桥？"
    },
    {
      id: "paragraph-076",
      type: "paragraph",
      text: "核心渝中占主导时选解放碑；重视现代社区生活、较晚餐饮和北部交通时选观音桥。无论哪一区，都要核对具体酒店入口。"
    },
    {
      id: "heading-077",
      type: "heading",
      level: 3,
      text: "应该使用哪座重庆火车站？"
    },
    {
      id: "paragraph-078",
      type: "paragraph",
      text: "以所选车票上打印的车站为准。重庆北、重庆西、沙坪坝和重庆东是不同枢纽。规划接送前，按日期查询铁路12306。"
    },
    {
      id: "heading-079",
      type: "heading",
      level: 3,
      text: "为什么地图看起来很近，步行却很远？"
    },
    {
      id: "paragraph-080",
      type: "paragraph",
      text: "地图可能隐藏跨江、陡岸、重叠道路、不同楼层入口或关闭的垂直连接。核对江岸、层级、入口和连接；绝不能把直线距离直接换算成承诺步行时间。"
    },
    {
      id: "heading-081",
      type: "heading",
      level: 3,
      text: "只有两个完整白天，应该去武隆吗？"
    },
    {
      id: "paragraph-082",
      type: "paragraph",
      text: "第一次来通常不建议。武隆会占掉一天，只剩一天看重庆本城。只有当喀斯特自然景观就是你来重庆的首要理由时才应优先。"
    },
    {
      id: "heading-083",
      type: "heading",
      level: 3,
      text: "武隆还是大足？"
    },
    {
      id: "paragraph-084",
      type: "paragraph",
      text: "想看大型自然景观，并能接受受天气影响的完整运营日，选武隆；想看雕塑、宗教艺术与文化遗产，选大足。两者都不在市中心，都需要专门一天。"
    },
    {
      id: "heading-085",
      type: "heading",
      level: 3,
      text: "老人、儿童或大件行李怎样调整？"
    },
    {
      id: "paragraph-086",
      type: "paragraph",
      text: "减少一天中的组团数量，用车辆处理明显高度变化，核对实际入口，并预留有座位的休息。行李应送到车辆入口。无障碍必须按端到端路线核实，而不是看某一部电梯。"
    },
    {
      id: "heading-087",
      type: "heading",
      level: 3,
      text: "重庆和成都怎样分配时间？"
    },
    {
      id: "paragraph-088",
      type: "paragraph",
      text: "先从两城各三晚开始。武隆、大足或游轮需要给重庆加时间；熊猫和四川支线需要给成都加时间。列车运行时间只是整个转移日的一部分。"
    },
    {
      id: "heading-089",
      type: "heading",
      level: 3,
      text: "可以直接到朝天门登长江游轮吗？"
    },
    {
      id: "paragraph-090",
      type: "paragraph",
      text: "许多航次会使用中心江岸，但具体码头、甚至实际登船城市，都可能随运营方、船只、线路和运营条件变化。必须遵循最终书面登船通知。"
    },
    {
      id: "heading-091",
      type: "heading",
      level: 2,
      text: "最后的规划规则"
    },
    {
      id: "paragraph-092",
      type: "paragraph",
      text: "当每天都能回答四个问题——在哪一侧江岸、在哪一个层级、使用哪个入口、靠什么连接——重庆就不再是一组难以理解的网红画面，而会变成一条真正可执行的旅行路线。"
    },
    {
      id: "canonical-owner-links",
      type: "internal-links",
      title: "下一步需要细节时，继续阅读对应指南",
      items: [
        {
          label: "读懂重庆的江岸与高差",
          href: "/zh/guides/chongqing-upper-lower-city-orientation/",
          description: "开始步行前，先按江岸—高度—入口—连接方式核对路线。"
        },
        {
          label: "选择重庆住宿基地",
          href: "/zh/guides/chongqing-where-to-stay-jiefangbei-guanyinqiao-shapingba/",
          description: "比较解放碑、观音桥与沙坪坝，再核对具体物业入口。"
        },
        {
          label: "理解武隆天坑地貌",
          href: "/zh/guides/china-tiankeng-sinkholes-explained/",
          description: "通过专题地质指南了解地貌术语和景区管理边界。"
        },
        {
          label: "有上下文地选择川剧",
          href: "/zh/guides/sichuan-opera-face-changing-with-context/",
          description: "比较有名称的节目，不把变脸当成整门艺术。"
        },
        {
          label: "选择正确的重庆铁路站",
          href: "/zh/guides/chongqing-railway-station-selector/",
          description: "按日期、车票、酒店和下一段方向比较北站、西站、沙坪坝站与东站。"
        }
      ]
    },
    {
      id: "stay-owner-links",
      type: "internal-links",
      title: "预订前核对具体酒店",
      items: [
        {
          label: "核对“地铁附近”是否真的有用",
          href: "/zh/guides/china-hotel-near-metro/",
          description: "确认具体出口，以及从出口到酒店大堂的完整路线。"
        },
        {
          label: "核对真正可用的无障碍客房",
          href: "/zh/guides/china-accessible-hotel-room-verification/",
          description: "付款前检查从抵达到客房的整条路径。"
        },
        {
          label: "外国旅客能入住中国任何酒店吗？",
          href: "/zh/guides/foreigners-china-hotel/",
          description: "区分法律规则、平台展示和具体物业当下的登记操作。"
        },
        {
          label: "规划国际航班前的最后一晚",
          href: "/zh/guides/china-last-night-before-international-flight/",
          description: "从明确的 CKG 航站楼和值机要求倒推。"
        }
      ]
    },
    {
      id: "stay-quote-handoff",
      type: "callout",
      title: "申请人工核对重庆住宿匹配度",
      body: "通用规划入口只用于第一次联系。初始表单可以填写旅行日期、比较中的城市或区域、旅客人数、房间数，以及自愿提供的大致住宿预算。可以说明之后希望讨论家庭或无障碍安排，但不要提交儿童具体年龄、行动、医疗或无障碍细节、护照或其他证件资料、订单或付款记录，也不要上传准备交给酒店、地接社或其他供应商的可识别材料。团队会另行安排人工跟进；只有在确有需要并取得适当同意后才讨论这些细节。未经另行、针对明确目的的同意，不会把信息交给供应商。这里不是实时库存，且不保证价格、不保证房态、不保证外宾接待、不保证房型，也不保证无障碍适用性。",
      tone: "decision"
    },
    {
      id: "planning-links",
      type: "internal-links",
      title: "把重庆选择放回整条中国路线",
      items: [
        {
          label: "检查行程是否太赶",
          href: "/zh/guides/is-your-china-itinerary-too-rushed/",
          description: "计入进站、行李、垂直移动和再次换酒店的成本。"
        },
        {
          label: "人工复核现有中国行程",
          href: "/zh/china-itinerary-review/",
          description: "带上当前逐日路线，找出有证据的薄弱环节。"
        },
        {
          label: "请 Homeground 规划完整旅行",
          href: "/zh/#planner-contact",
          description: "确定城市、日期与主要限制后，再使用通用旅行简报入口。"
        }
      ]
    },
    {
      id: "official-sources",
      type: "sources",
      title: "官方来源与图片记录",
      items: [
        {
          label: "重庆机场客运航站楼安排",
          url: "https://www.cq.gov.cn/ywdt/bmts/202512/t20251222_15262188.html",
          publisher: "重庆市人民政府",
          reviewedAt: "2026-08-21"
        },
        {
          label: "2026 年第三季度重庆铁路运行图与车站分工",
          url: "https://www.cq.gov.cn/ywdt/jrcq/202606/t20260626_15778151.html",
          publisher: "重庆市人民政府",
          reviewedAt: "2026-08-21"
        },
        {
          label: "重庆东站轨道交通 6 号线接驳",
          url: "https://www.cq.gov.cn/ywdt/bmts/202507/t20250728_14853868.html",
          publisher: "重庆市人民政府",
          reviewedAt: "2026-08-21"
        },
        {
          label: "重庆站暂停办理客运业务",
          url: "https://www.cq.gov.cn/ywdt/bmts/202206/t20220615_10817239.html",
          publisher: "重庆市人民政府",
          reviewedAt: "2026-08-21"
        },
        {
          label: "重庆站改造工程进展",
          url: "https://jtysw.cq.gov.cn/sy_240/jdtp/202607/t20260715_15825144.html",
          publisher: "重庆市交通运输委员会",
          reviewedAt: "2026-08-21"
        },
        {
          label: "李子坝施工与分阶段出入口关闭",
          url: "https://wap.cq.gov.cn/ywdt/jrcq/202606/t20260613_15751500.html",
          publisher: "重庆市人民政府",
          reviewedAt: "2026-08-21"
        },
        {
          label: "武隆因天气调整运营的通知",
          url: "https://www.cq.gov.cn/ywdt/bmts/202606/t20260608_15737519.html",
          publisher: "重庆市人民政府",
          reviewedAt: "2026-08-21"
        },
        {
          label: "武隆喀斯特官方概览",
          url: "https://english.cq.gov.cn/aboutchongqing/culture/NaturalHeritage/202606/t20260612_15751145.html",
          publisher: "重庆市人民政府",
          reviewedAt: "2026-08-21"
        },
        {
          label: "大足石刻官方概览",
          url: "https://english.cq.gov.cn/aboutchongqing/travel/5ALevelTouristAttraction/202606/t20260611_15745500.html",
          publisher: "重庆市人民政府",
          reviewedAt: "2026-08-21"
        },
        {
          label: "重庆游轮市场运营背景",
          url: "https://admin.cq.gov.cn/ywdt/jrcq/202607/t20260712_15816815.html",
          publisher: "重庆市人民政府",
          reviewedAt: "2026-08-21"
        },
        {
          label: "首图：渝中，摄影 Kingswang192，CC BY 4.0；已裁切、缩放并转码",
          url: "https://commons.wikimedia.org/wiki/File:Yuzhong,_Chongqing.jpg",
          publisher: "Wikimedia Commons",
          reviewedAt: "2026-08-21"
        },
        {
          label: "长江—嘉陵江交汇处，摄影 Tauno Tõhk，CC BY-SA 2.0；已裁切、缩放并转码",
          url: "https://commons.wikimedia.org/wiki/File:The_junction_of_Yangtze_River_and_Jialing_River.jpg",
          publisher: "Wikimedia Commons",
          reviewedAt: "2026-08-21"
        },
        {
          label: "皇冠大扶梯，摄影 Siyuwj，CC BY-SA 3.0；已裁切、缩放并转码",
          url: "https://commons.wikimedia.org/wiki/File:Crown_Escalator,_Chongqing,_2017-09-21.jpg",
          publisher: "Wikimedia Commons",
          reviewedAt: "2026-08-21"
        },
        {
          label: "重庆东站，摄影 Renek78，CC0 1.0；已裁切、缩放并转码",
          url: "https://commons.wikimedia.org/wiki/File:September_2025_at_Chongqing_East_Railway_Station_02.jpg",
          publisher: "Wikimedia Commons",
          reviewedAt: "2026-08-21"
        },
        {
          label: "李子坝，摄影 MNXANL，CC BY-SA 4.0；已裁切、缩放并转码",
          url: "https://commons.wikimedia.org/wiki/File:201908_Liziba,_Chongqing.jpg",
          publisher: "Wikimedia Commons",
          reviewedAt: "2026-08-21"
        },
        {
          label: "武隆天生桥，摄影 Brookqi，作者已释放至公有领域；已裁切、缩放并转码",
          url: "https://commons.wikimedia.org/wiki/File:Wulongtianshengsanqiao.JPG",
          publisher: "Wikimedia Commons",
          reviewedAt: "2026-08-21"
        },
        {
          label: "大足宝顶山，摄影 JL Cogburn，CC BY-SA 2.0；已裁切、缩放并转码",
          url: "https://commons.wikimedia.org/wiki/File:Dazu_rock_carvings_-_Baodingshan,_大足石刻-宝顶山摩崖造像,_Chongqing,_2023_(53563776088).jpg",
          publisher: "Wikimedia Commons",
          reviewedAt: "2026-08-21"
        },
        {
          label: "许可：CC BY 4.0",
          url: "https://creativecommons.org/licenses/by/4.0/",
          publisher: "Creative Commons",
          reviewedAt: "2026-08-21"
        },
        {
          label: "许可：CC BY-SA 2.0",
          url: "https://creativecommons.org/licenses/by-sa/2.0/",
          publisher: "Creative Commons",
          reviewedAt: "2026-08-21"
        },
        {
          label: "许可：CC BY-SA 3.0",
          url: "https://creativecommons.org/licenses/by-sa/3.0/",
          publisher: "Creative Commons",
          reviewedAt: "2026-08-21"
        },
        {
          label: "许可：CC BY-SA 4.0",
          url: "https://creativecommons.org/licenses/by-sa/4.0/",
          publisher: "Creative Commons",
          reviewedAt: "2026-08-21"
        },
        {
          label: "权利声明：CC0 1.0",
          url: "https://creativecommons.org/publicdomain/zero/1.0/",
          publisher: "Creative Commons",
          reviewedAt: "2026-08-21"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
