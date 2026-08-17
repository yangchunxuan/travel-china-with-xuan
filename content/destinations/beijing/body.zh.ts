import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead",
      type: "lead",
      text: "北京常常是第一次中国旅行最合适的起点，因为它能在路线开始快速换城之前，先让人理解中国旅行的基本尺度。皇城中心、现代国家政治中心、胡同街区、大型园林、商务区、两座机场和八座主要铁路站，都在同一个直辖市里。这种层次是北京的优势，也是短行程最容易失控的原因：故宫、长城、颐和园和一趟离京高铁，不能被当成地图上可以随意互换的几个点。",
    },
    {
      id: "role-heading",
      type: "heading",
      level: 2,
      text: "北京在第一次中国旅行中承担什么",
    },
    {
      id: "role-1",
      type: "paragraph",
      text: "北京不能只被理解为“看历史的城市”。故宫与南北中轴线解释了皇城秩序怎样被放进城市空间；天安门广场和中国国家博物馆又把这套历史中心放回现代首都之中。鼓楼、什刹海一带的胡同是完全不同的街巷尺度，而朝阳与国贸则提醒旅客，北京并不只属于过去。",
    },
    {
      id: "role-2",
      type: "paragraph",
      text: "这也是北京适合放在行程开头的原因。国际航班抵达后，旅客可以在一个稳定住宿基地恢复时差，同时熟悉实名预约、地铁导航、大景区内部步行，以及“票面时间”和“真正完整一天”的差别。这些经验会让后续城市更容易。北京也可以放在末尾，但行程末端容错更低：从外地抵达北京、安排长城、再赶第二天国际航班，不应形成一条互相依赖的链条。",
    },
    {
      id: "who-heading",
      type: "heading",
      level: 2,
      text: "北京适合谁，谁又可以只停短短几晚",
    },
    {
      id: "who-1",
      type: "paragraph",
      text: "北京尤其适合第一次来中国的旅客、带孩子认识中国的家庭、建筑与历史爱好者、博物馆访客、喜欢步行观察街区的人，以及愿意把长城单独留出一天的团队。它也适合不想频繁换酒店的人：在北京连续住五晚，往往比把同样时间拆给两座城市、再增加一次转场更轻松。",
    },
    {
      id: "who-2",
      type: "paragraph",
      text: "北京不太适合希望每天完全临时决定的人。多个重要场馆使用分时或实名入场，城市尺度又会放大跨区临时改动的代价。不喜欢长距离步行、安检排队或早起的人仍然可以来，但每一天应减少大型景点数量。若旅行重点是热带景观、紧凑古镇或夜生活，把北京控制在三到四晚也很合理。",
    },
    {
      id: "who-3",
      type: "paragraph",
      text: "真正需要回答的不是“北京值不值得去”，而是：它在这次旅行里应当是一段三晚的入门、五晚的核心基地，还是六到七晚的文化停留。",
    },
    {
      id: "nights-heading",
      type: "heading",
      level: 2,
      text: "北京到底需要住几晚？",
    },
    {
      id: "nights-1",
      type: "paragraph",
      text: "请把住宿晚数、完整游览日、抵达或离开的半天分开计算。下午三点落地不等于拥有一个北京日；上午退房、去车站、安检和上车，也不是完整游览日。",
    },
    {
      id: "nights-table",
      type: "table",
      caption: "北京的三种停留形态，以及各自能诚实装下什么",
      columns: ["停留形态", "住宿晚数", "通常可得完整日", "能装下什么", "主要代价"],
      rows: [
        [
          "最短初访",
          "3晚",
          "2天",
          "一天中轴核心，加长城或另一个城区任务",
          "必须舍弃多个景点簇，几乎没有恢复余量",
        ],
        [
          "推荐初访",
          "4–5晚",
          "3–4天",
          "中轴、长城、颐和园或天坛，再加一个街区或博物馆时段",
          "次要景点仍需保持可选",
        ],
        [
          "深度北京",
          "6–7晚",
          "5–6天",
          "主要景点簇都能放慢，并加入街区、博物馆和天气余量",
          "需要主动克制，不要因为有时间又硬塞一座城市",
        ],
      ],
    },
    {
      id: "nights-2",
      type: "paragraph",
      text: "三晚最适合“傍晚抵达—两个完整日—较晚离开”。一天走天安门—故宫—景山，另一天去长城，这是一条成立的精简路线，但通常要放弃颐和园；一旦重点预约失败，也几乎没有可移动空间。",
    },
    {
      id: "nights-3",
      type: "paragraph",
      text: "四晚通常能换来三个真实游览日，是不少第一次中国旅行的实用下限。五晚能让长城保持独立，让西北方向不与城市中心争抢时间，也能把抵达日安排得更轻。对重视皇家建筑、博物馆、胡同或慢节奏早晨的人，六到七晚并不算多。增加的晚数买到的是选择权和恢复时间，不只是更多景点。",
    },
    {
      id: "stay-heading",
      type: "heading",
      level: 2,
      text: "住宿区域：先问它要完成什么任务",
    },
    {
      id: "stay-1",
      type: "paragraph",
      text: "在不知道首日和末日交通任务之前，北京没有一个对所有人都最好的区域。靠近著名景点的酒店，也可能因为入口在胡同深处、车辆不能到门口、同行者行李多，或离实际出发车站很远而变得不方便。比较区域时，应比较它承担的任务，而不是只看名气。",
    },
    {
      id: "stay-table",
      type: "table",
      caption: "四个北京住宿区域，按“承担什么任务”比较",
      columns: ["区域", "最适合承担的任务", "会变得更容易", "会变得更困难", "更适合谁"],
      rows: [
        [
          "王府井／东单",
          "第一次到北京的中心基地",
          "皇城中心、多方向地铁、酒店选择和晚间服务",
          "长城与西北方向仍要单独转场",
          "初访情侣、家庭、短住旅客",
        ],
        [
          "前门",
          "南中轴与老城氛围基地",
          "前门、大栅栏、天坛自然组合",
          "步行街和胡同增加行李摩擦，北部任务更远",
          "重视老城氛围、以南部中心为主的人",
        ],
        [
          "鼓楼—什刹海",
          "胡同、湖区和晚间街区基地",
          "钟鼓楼、什刹海、胡同与散步",
          "车辆进入、电梯、隔音和房型差异很大",
          "情侣、回访者、轻装旅客",
        ],
        [
          "东直门／朝阳",
          "机场、餐饮与现代城市基地",
          "PEK 方向、三里屯和现代酒店",
          "皇城景点都要主动跨城",
          "商务兼休闲、晚到 PEK、重视餐饮夜生活的人",
        ],
      ],
    },
    {
      id: "stay-2",
      type: "paragraph",
      text: "王府井与东单承担的是同一件城市级任务：降低第一次到访的不确定性。“住中心”并不代表所有景点都能步行，而是多个方向都还可控。前门适合希望南中轴连贯的人，但“前门附近”可能是大路边酒店，也可能是步行街或胡同深处的物业；对带大行李的人，这两种抵达体验完全不同。",
    },
    {
      id: "stay-3",
      type: "paragraph",
      text: "鼓楼—什刹海必须审查具体物业。四合院可以很有记忆点，但历史感并不自动等于有电梯、隔音好、房间宽敞或车辆能到门口。东直门与朝阳适合把机场、现代酒店、餐饮和晚间体验放在更高优先级的人。",
    },
    {
      id: "gulou-figure",
      type: "figure",
      src: "/images/destinations/beijing/gulou-hutong-1200.webp",
      alt: "北京鼓楼与钟楼立在灰瓦胡同屋顶之上，右侧是热闹的街巷。",
      width: 1200,
      height: 750,
      caption:
        "鼓楼—什刹海是胡同尺度。这既是它的吸引力，也是为什么决定行李、电梯和晚到是否顺利的是具体那栋建筑，而不是区域名字。",
    },
    {
      id: "stay-links",
      type: "internal-links",
      title: "用详细住宿指南比较北京住宿区域",
      items: [
        {
          label: "第一次去北京住哪里？",
          href: "/zh/guides/beijing-where-to-stay-first-trip/",
          description:
            "按行程、抵达车站、夜间安排、行李和步行负担，比较王府井、前门、三里屯与北城胡同。",
        },
        {
          label: "北京住四合院还是现代酒店？",
          href: "/zh/guides/beijing-courtyard-hotel-or-modern-hotel/",
          description: "四合院的“有味道”，具体会改变房间、电梯、隔音、采暖和车辆进入哪些条件。",
        },
      ],
    },
    {
      id: "gateways-heading",
      type: "heading",
      level: 2,
      text: "两座机场与八座铁路站怎样改变首末两天",
    },
    {
      id: "gateways-1",
      type: "paragraph",
      text: "顺序是固定的：先确认实际航班或车次，再确认航站楼或完整站名，最后决定接送方式和住宿影响。车票出现之前，不要只看地图就选一个“北京站”。",
    },
    {
      id: "gateways-table",
      type: "table",
      caption: "北京主要门户及其对行程的影响",
      columns: ["枢纽", "相对城区方向", "会改变什么"],
      rows: [
        [
          "PEK 首都国际机场",
          "东北方向；首都机场线连接东直门与三元桥",
          "晚到时更利于东直门／朝阳首晚；住东城中心仍需完整接驳时间",
        ],
        [
          "PKX 大兴国际机场",
          "远南方向；大兴机场线通往草桥",
          "更容易与前门或南侧铁路任务衔接；晚到后不宜第二天一早赶北部景点",
        ],
        ["北京站", "历史中心偏东", "实际车次使用北京站时，从东单、建国门方向出发较顺"],
        [
          "北京西站",
          "城区西侧",
          "多条向西线路会使用，包括不少西安方向车次；东部酒店需主动预留跨城时间",
        ],
        [
          "北京南站",
          "城区南侧",
          "上海、天津及东部高铁的重要门户；从前门一带出发通常比从东北部更顺",
        ],
        ["北京北站", "老城西北", "服务部分西北方向线路，但同一方向的实际车次也可能使用清河站"],
        [
          "清河站",
          "城区西北、内城之外",
          "与部分八达岭、张家口及西北高铁有关，不应默认它是中心车站",
        ],
        ["北京朝阳站", "东北方向", "东北方向高铁重要门户；从朝阳出发方便，从前门或西部则不轻松"],
        ["北京丰台站", "西南方向", "承担多种长途与高铁任务；线路分配仍以当天车票为准"],
        ["北京通州站", "东部城市副中心", "适用于部分向东城际线路；对住中心区的初访旅客通常不是默认项"],
      ],
    },
    {
      id: "gateways-2",
      type: "paragraph",
      text: "PEK 和 PKX 没有永久胜者。PEK 通常更利于东直门和东北部；PKX 可能更利于北京南部以及某些后续铁路组合。机票价格、落地时刻和下一家酒店，比单纯比较机场到市中心的距离更重要——便宜的午夜航班，往往会消耗掉第二天上午。",
    },
    {
      id: "gateways-3",
      type: "paragraph",
      text: "铁路遵循同一原则。北京南站常与上海方向联系，北京西站常与西安方向联系，但最终权威仍是车票。请同时保存中英文完整站名，并在站名确定后再安排酒店出发时间。若计划同一天“火车站转机场”，必须计算完整链条：离开站台、出站、跨城、进入正确航站楼并保留航空缓冲；两段票分开购买时，在北京多住一晚往往更理性。",
    },
    {
      id: "transport-links",
      type: "internal-links",
      title: "继续查看机场与车站详细指南",
      items: [
        {
          label: "你到底需要哪座北京火车站？",
          href: "/zh/guides/which-beijing-railway-station/",
          description: "八站选择矩阵：按车票读站名，而不是按城市名。",
        },
        {
          label: "北京南站到首都机场还是大兴机场？",
          href: "/zh/guides/beijing-south-station-to-capital-or-daxing-airport/",
          description: "同日“站到机场”是否站得住，以及什么时候应该改成住一晚。",
        },
        {
          label: "北京到慕田峪长城怎么走",
          href: "/zh/guides/beijing-to-mutianyu-great-wall-transfer/",
          description: "慕田峪一天从酒店到酒店是怎样执行的。",
        },
        {
          label: "北京到八达岭长城怎么走",
          href: "/zh/guides/beijing-to-badaling-great-wall-transfer/",
          description: "高铁、市郊铁路与公交方案，以及返程安排。",
        },
      ],
    },
    {
      id: "clusters-heading",
      type: "heading",
      level: 2,
      text: "把北京读成四个空间任务",
    },
    {
      id: "clusters-1",
      type: "paragraph",
      text: "最常见的规划错误，不是少去一个景点，而是按知名度而不是按地理与运营条件分组。",
    },
    {
      id: "clusters-table",
      type: "table",
      caption: "四个北京任务与它们诚实的时间形态",
      columns: ["空间任务", "自然顺序", "诚实的时间形态", "不应硬接什么"],
      rows: [
        [
          "天安门—故宫—景山",
          "从南向北的礼制与视觉序列",
          "一个扎实的城市中心日",
          "长城、赶飞机或远处固定时段博物馆",
        ],
        [
          "前门—天坛",
          "老城商业入口加南部礼制园林",
          "半天到一天，取决于游览深度",
          "把颐和园当作顺手增加项",
        ],
        [
          "颐和园与西北方向",
          "皇家园林、湖面与山体",
          "扎实半天，常常接近一天",
          "前后再塞一个严格限时的中心景点",
        ],
        [
          "长城",
          "选择一个段落并完成完整往返",
          "独立全天任务",
          "故宫、大型博物馆或同日离京",
        ],
      ],
    },
    {
      id: "axis-heading",
      type: "heading",
      level: 3,
      text: "天安门、故宫和景山属于同一个中轴日",
    },
    {
      id: "axis-1",
      type: "paragraph",
      text: "天安门与广场建立南部进入尺度，故宫把路线带过旧皇城中心，景山紧邻其北，让宫城规模和中轴关系变得直观。按南到北安排可以减少折返，也让城市结构自己解释历史。中国国家博物馆虽然地理上很近，但运营上是独立任务：它有自己的预约与安检逻辑，认真参观也需要真实时间。",
    },
    {
      id: "south-heading",
      type: "heading",
      level: 3,
      text: "前门与天坛构成南部任务",
    },
    {
      id: "south-1",
      type: "paragraph",
      text: "前门与大栅栏呈现旧城商业一面，天坛位于更南面，尺度是整片礼制园林而非一座殿。两者适合组合，是因为路线持续向南移动。从哪个门进入会改变园内步行顺序，应在确认同行者体力、交通方式和可用时段后再决定。",
    },
    {
      id: "northwest-heading",
      type: "heading",
      level: 3,
      text: "颐和园是一项西北方向承诺",
    },
    {
      id: "northwest-1",
      type: "paragraph",
      text: "颐和园不是一座紧凑宫殿。湖、山、多个入口和园内距离，使它成为一项相当完整的户外任务；当天本来就朝西北移动、且入口和出口支持下一段交通时会顺得多。游船开放时可以改变路线，但整天不能依赖游船。如果北京只有两个完整日，放弃颐和园是合理取舍。",
    },
    {
      id: "wall-figure",
      type: "figure",
      src: "/images/destinations/beijing/great-wall-1200.webp",
      alt: "北京以北山脊上一段经过修缮的长城，天际线上可见敌楼。",
      width: 1200,
      height: 750,
      caption:
        "长城位于中心城区游览系统之外。照片里的山脊线，就是它需要完整往返、而不是一个下午的原因。",
    },
    {
      id: "wall-heading",
      type: "heading",
      level: 3,
      text: "长城应当独立成日",
    },
    {
      id: "wall-1",
      type: "paragraph",
      text: "慕田峪和八达岭在交通、地形、设施与客流结构上不同，但都需要出发、抵达、入场、在长城上活动并返回。缆车能降低爬升，不会把长城变成可以和故宫拼在一起的半日项目。",
    },
    {
      id: "wall-2",
      type: "paragraph",
      text: "慕田峪常适合作为家庭默认候选，因为可以组合辅助上山和不同长度的步行。八达岭适合重视铁路接近性、设施完备度或希望到访最知名修缮段的人。真正想徒步的人，应依据当日开放状态、路线状况、天气、交通和自身能力选择，而不是只看宣传照片。",
    },
    {
      id: "sight-links",
      type: "internal-links",
      title: "准备预订时，打开对应的详细指南",
      items: [
        {
          label: "外国旅客怎样参观故宫",
          href: "/zh/guides/forbidden-city-for-foreign-visitors/",
          description: "护照预约、入口顺序，以及一次认真参观真正要花多少时间。",
        },
        {
          label: "天坛：从哪个门进，礼制顺序怎么读",
          href: "/zh/guides/temple-of-heaven-gates-and-ritual-sequence/",
          description: "选门方式，以及把天坛当作一整片景观来理解。",
        },
        {
          label: "颐和园：门区、路线与游船方案",
          href: "/zh/guides/summer-palace-gates-route-and-boat-plan/",
          description: "入口、园内距离，以及游船停运时仍然成立的路线。",
        },
        {
          label: "中国国家博物馆：预约与参观路线",
          href: "/zh/guides/national-museum-of-china-booking-and-route/",
          description: "它有自己的预约，不能被当作故宫的自动替代项。",
        },
      ],
    },
    {
      id: "failure-heading",
      type: "heading",
      level: 2,
      text: "预约失败时应该改结构，而不是随机换景点",
    },
    {
      id: "failure-1",
      type: "paragraph",
      text: "预约失败应改变的是当天结构，而不是触发一次随机的热门景点搜索。先保护长城日与城际出发，再把一个可移动的地理簇移入空出来的日子。",
    },
    {
      id: "failure-2",
      type: "paragraph",
      text: "若故宫没有预约成功，可以保留城市中心的地理逻辑，但不要假装体验完全相同：景山、北海或一段胡同街区可以组成连贯的一天，具体仍以当日要求为准；天坛或颐和园也可以移入完整空日。只有在中国国家博物馆自身预约成功时，它才可能成为替代项。这正是五晚明显强于三晚的地方：固定项目有另一天可以移动。",
    },
    {
      id: "scenarios-heading",
      type: "heading",
      level: 2,
      text: "两个旅客情境",
    },
    {
      id: "scenario-1-heading",
      type: "heading",
      level: 3,
      text: "情境一：四口之家，住五晚，PEK 抵达，下一站上海",
    },
    {
      id: "scenario-1",
      type: "paragraph",
      text: "一家人下午抵达首都机场，住在王府井或东单附近。第一个完整日走天安门—故宫—景山；第二天单独去慕田峪；第三天以前门和天坛为主，并按孩子体力降低密度；第四天保持弹性：状态好去颐和园，一般则安排什刹海，再加较轻的公园或博物馆时段。第五个住宿夜保护了整条路线：他们从车票所写的车站前往上海——这个方向常见北京南站，但预订前不作假设。",
    },
    {
      id: "scenario-2-heading",
      type: "heading",
      level: 3,
      text: "情境二：重文化与步行的情侣，住六晚，PKX 抵达，下一站西安",
    },
    {
      id: "scenario-2",
      type: "paragraph",
      text: "两人从大兴机场抵达，为了南中轴氛围选择前门。完整游览日分别留给故宫中轴、深入的前门—天坛、鼓楼—什刹海、颐和园，以及按步行条件而不是知名度选择的一段长城。最后一个完整日保持可移动：去西安前先确认实际出发站，并把转场日保持轻量。第六晚让长城天气不佳或故宫预约失败时仍有调整空间，不会使整条路线崩塌。",
    },
    {
      id: "next-heading",
      type: "heading",
      level: 2,
      text: "北京之后接哪一站？",
    },
    {
      id: "next-table",
      type: "table",
      caption: "北京之后的下一站选择",
      columns: ["下一站", "为什么适合接北京", "路线含义", "什么时候选它"],
      rows: [
        [
          "西安",
          "延续都城与帝国历史，但城市尺度不同",
          "高铁通常直接；不少车次使用北京西站，但必须核对",
          "历史是核心，而且还有足够住宿晚数",
        ],
        [
          "上海",
          "形成古都与现代大都会的强烈反差，也利于开放口机票",
          "高铁常实用；不少车次为北京南—上海虹桥",
          "想要清晰的首次中国路线，或从上海国际离境",
        ],
        [
          "张家界",
          "从城市纪念性切换到山地自然",
          "通常值得比较航班；铁路可能吃掉一整天",
          "自然是优先项，并已保护至少两个当地完整日",
        ],
        [
          "成都",
          "增加饮食文化、较松弛的城市节奏和熊猫主题",
          "很多路线经西安再去成都比从北京直接加更顺",
          "行程足够长，愿意先向西再转向东或南",
        ],
      ],
    },
    {
      id: "next-1",
      type: "paragraph",
      text: "西安是更连续的答案，上海是反差更强的答案。北京—西安—上海可以形成一条相对清晰的高铁路线。只有接受两次明显转场后，张家界才适合放进来。",
    },
    {
      id: "route-links",
      type: "internal-links",
      title: "继续查看详细路线指南",
      items: [
        {
          label: "北京、西安与成都：怎样排顺序",
          href: "/zh/guides/beijing-xian-chengdu-route-order/",
          description: "方向、门户，以及每种顺序真正能产生多少可用半天。",
        },
        {
          label: "北京 → 张家界 → 上海：两段交通真正会占掉多少时间",
          href: "/zh/guides/beijing-zhangjiajie-shanghai-transport/",
          description: "三城已经入选、问题变成坐飞机还是火车时，比较酒店到酒店的完整移动。",
        },
        {
          label: "北京—张家界—上海，10 天真的够吗？",
          href: "/zh/guides/beijing-zhangjiajie-shanghai-10-days/",
          description: "当“10 天”是硬约束时读这篇。",
        },
        {
          label: "你的中国行程是不是太赶了？",
          href: "/zh/guides/is-your-china-itinerary-too-rushed/",
          description: "当问题可能是换住宿点与连续转场，而不是北京本身时读这篇。",
        },
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
      text: "北京住三晚够吗？",
    },
    {
      id: "faq-1",
      type: "paragraph",
      text: "可以完成一次有明确取舍的初访，通常只有两个完整游览日。保护一个中轴日，再在长城与另一个城区任务中选择。若长城、颐和园或天坛都很重要，四到五晚更合理。",
    },
    {
      id: "faq-2-heading",
      type: "heading",
      level: 3,
      text: "应该飞 PEK 还是 PKX？",
    },
    {
      id: "faq-2",
      type: "paragraph",
      text: "先比较国际航班、落地时刻和票价，再计算地面接驳。PEK 在东北方向，经三元桥和东直门接入城市；PKX 在远南方向，经草桥接入。酒店位置与落地时刻往往比机场名称本身更重要。",
    },
    {
      id: "faq-3-heading",
      type: "heading",
      level: 3,
      text: "故宫和长城能放在同一天吗？",
    },
    {
      id: "faq-3",
      type: "paragraph",
      text: "正常初访不建议。故宫属于一个扎实的中心中轴日，长城需要独立往返。强行组合会同时压缩两处，也会让预约、道路和体力缺少缓冲。",
    },
    {
      id: "faq-4-heading",
      type: "heading",
      level: 3,
      text: "我到底需要哪座北京火车站？",
    },
    {
      id: "faq-4",
      type: "paragraph",
      text: "车票上写的那一座。北京站、北京西站、北京南站、北京北站、清河站、北京朝阳站、北京丰台站和北京通州站是不同枢纽。离开酒店前核对完整中英文站名。",
    },
    {
      id: "faq-5-heading",
      type: "heading",
      level: 3,
      text: "北京适合靠步行游览吗？",
    },
    {
      id: "faq-5",
      type: "paragraph",
      text: "每个景点簇内部适合步行，但北京不是“所有景点之间都步行”的城市。跨区使用地铁或车辆，再在中轴、前门、什刹海或颐和园内部步行。到达景区门口后，园内距离仍要计算。",
    },
    {
      id: "faq-6-heading",
      type: "heading",
      level: 3,
      text: "在北京需要换酒店吗？",
    },
    {
      id: "faq-6",
      type: "paragraph",
      text: "通常不需要。一个选对的基地，比为了靠近某一天景点而损失搬酒店时间更有价值。只有当换酒店能明确保护极早航班或火车、解决行动不便，或支持长停留中真正不同的第二阶段时，才值得考虑。",
    },
    {
      id: "cta-heading",
      type: "heading",
      level: 2,
      text: "把北京的选择放回整条中国路线",
    },
    {
      id: "cta-1",
      type: "paragraph",
      text: "如果现在只有几个城市和兴趣点、还没有稳定顺序，可先测试现有晚数更适合北京—西安、北京—上海，还是北京—张家界—上海。如果航班、城市和逐日安排已经存在，问题就不再是“北京之后去哪里”，而是“现有路线是否保护了正确的北京完整日、车站与预约”。",
    },
    {
      id: "cta-links",
      type: "internal-links",
      title: "两种继续方式",
      items: [
        {
          label: "路线查找器",
          href: "/zh/#route-finder",
          description: "用现有晚数测试哪种城市顺序真正成立。",
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
          label: "北京地铁与主要铁路站、两座机场的连接",
          url: "https://english.beijing.gov.cn/livinginbeijing/transportation/beijingsubway/202412/t20241216_3966828.html",
          publisher: "北京市人民政府",
          reviewedAt: "2026-08-16",
        },
        {
          label: "北京交通概览，含机场线服务",
          url: "https://english.beijing.gov.cn/livinginbeijing/transportation/",
          publisher: "北京市人民政府",
          reviewedAt: "2026-08-16",
        },
        {
          label: "故宫博物院预约购票规则",
          url: "https://www.dpm.org.cn/subject_booking/",
          publisher: "故宫博物院",
          reviewedAt: "2026-08-16",
        },
        {
          label: "中国国家博物馆参观预约须知",
          url: "https://en.chnmuseum.cn/visit_692/",
          publisher: "中国国家博物馆",
          reviewedAt: "2026-08-16",
        },
        {
          label: "中国铁路 12306：订票前核对完整站名",
          url: "https://www.12306.cn/en/index.html",
          publisher: "中国铁路 12306",
          reviewedAt: "2026-08-16",
        },
      ],
    },
  ],
} as const satisfies StructuredPageBody;

export default body;
