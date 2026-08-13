import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead",
      type: "lead",
      text: "中国语境里的“15分钟社区”首先是一套规划和服务组织思路，不是保证每个人恰好走15分钟就能获得全部服务。一套官方框架更侧重居民身边的商业与便民服务；更广义的社区生活圈还会考虑教育、医疗、照护、文化、公园和就业。旅行者可以借它读懂普通城市生活如何被支撑，但必须亲自核对真实路线、开放时间和准入对象。这里是居民生活的社区，不是主题景点，也不能拿一个案例证明全国都按同一模式运转。"
    },
    {
      id: "direct-answer",
      type: "callout",
      title: "旅行者实际会看到什么？",
      body: "你看到的通常不是带统一标识的“15分钟街区”，而是叠在一起的服务层：沿街商店和菜市场、维修和快递、公园与步道，有时还有照护或社区服务设施。有些面向所有顾客，有些只服务登记居民、儿童、老人或预约者。“15分钟”通常是以假定步行者计算的近似规划尺度；围墙、过街、坡度、个人行动能力和营业时段都可能让你的可用生活圈变小或发生变化。",
      tone: "decision"
    },
    {
      id: "terms-heading",
      type: "heading",
      level: 2,
      text: "英文标签背后至少有两组相关概念"
    },
    {
      id: "terms",
      type: "comparison",
      title: "不要把中文术语压成一个项目",
      columns: [
        {
          heading: "城市一刻钟便民生活圈",
          body: "商务部将其描述为以社区居民为服务对象、在大约15分钟步行范围内形成的商业和生活服务集聚。建设指南既包括便利店、菜市场、维修、快递等基本保障，也涉及养老托幼、休闲等提升型服务。"
        },
        {
          heading: "15分钟社区生活圈",
          body: "空间规划中的广义社区生活圈还可覆盖教育、文化、健康、照护、休闲、就业与公共空间。上海以“宜居、宜业、宜游、宜学、宜养”五个维度表达这一框架，因此它并不只是商业网点的步行半径。"
        },
        {
          heading: "一地一种落实方式",
          body: "地方可能发布社区地图、更新菜市场、利用旧建筑，或根据居民意见补上服务点。边界、名称和数字工具都属于地方实施方式。上海某个社区的地图既不是全国目录，也不是进入社区设施的通行证。"
        }
      ]
    },
    {
      id: "framework-heading",
      type: "heading",
      level: 2,
      text: "这是一项持续建设的政策，不是已经普遍实现的现状"
    },
    {
      id: "framework",
      type: "paragraph",
      text: "国家层面的便民生活圈建设采用试点、评估和分批扩围。2023年行动计划面向“有条件的地级以上城市”，要求“一圈一策”，并没有规定所有地方复制相同布局。2026年7月发布的通知仍把不同批次放在建设、验收或推广阶段，并把2026年完成一万个便民生活圈列为年度目标。目标不能写成已经完成的数量。该通知也主张小规模、渐进式更新，明确反对一刀切和大拆大建。"
    },
    {
      id: "layers",
      type: "table",
      caption: "先读懂每一层服务，再评价社区",
      columns: ["服务层", "可能看到的设施", "不能据此推断"],
      rows: [
        ["日常基本需求", "便利店、生鲜市场、药店或早餐铺", "商品、语言和支付方式一定适合外国旅行者"],
        ["维修与物流", "修理摊、洗衣、家政和快递站", "一定接受临时上门或能处理境外包裹"],
        ["照护与支持", "长者助餐、托育、健康或社区服务点", "游客可以进入、使用补贴或预约照护"],
        ["公共生活", "公园、步道、座椅、图书室或文化空间", "公共门面后的所有房间都可自由进入"],
        ["参与和数字工具", "公告栏、居民议事、社区地图或小程序", "工具一定支持外国手机号或英文界面"]
      ]
    },
    {
      id: "reality-heading",
      type: "heading",
      level: 2,
      text: "规划目标与真实日常可能并不重合"
    },
    {
      id: "reality",
      type: "callout",
      title: "地图上的圈，不等于你走出来的结果",
      body: "针对中国城市的研究发现，中心城区与郊区、不同城市和不同人群之间的服务可达性存在差异；设施供给也可能没有对上不同年龄居民的真实需求。这些研究只能说明总体格局，不能为某条街认证，更不能证明某位旅行者可以走到哪里。对轮椅使用者、带老人或幼童的人，真正有用的尺度是连续可用的路线，以及这个具体的人需要多少时间。",
      tone: "warning"
    },
    {
      id: "cases-heading",
      type: "heading",
      level: 2,
      text: "三个地方案例说明它没有统一外观"
    },
    {
      id: "cases",
      type: "table",
      caption: "把具名案例当例子，不当全国模板",
      columns: ["案例", "建设方式", "旅行者应读出的信息"],
      rows: [
        ["上海曹杨", "在成熟社区中结合公共空间更新、不同年龄服务和本地数字地图", "地图可帮助定向，但当前准入和App注册条件仍须核验"],
        ["重庆民主村", "通过老社区微更新组合市场、维修、助餐、阅读和健康相关空间", "坡度与过街条件可能和设施清单同样重要"],
        ["雄安文华社区", "在较新的社区里统筹教育、健康、文化、照护和日常商业", "新建社区与改造中的老社区不应按同一种视觉标准评价"]
      ]
    },
    {
      id: "walk-heading",
      type: "heading",
      level: 2,
      text: "怎样核验一条真实路线"
    },
    {
      id: "walk",
      type: "list",
      ordered: true,
      items: [
        "从地铁口、公共公园、普通街道或市场入口等公共锚点开始，不要把试图进入居民小区作为第一步。",
        "选三种生活需求，而不是三个拍照点，例如生鲜、维修或快递，再加一处可休息空间。这样看到的是连接关系，不是门面收藏。",
        "画出实际人行路径，记录合法过街点、门禁、坡度、路缘、楼梯、电梯、遮阴和座椅，不要只画一个直线半径。",
        "在每处设施核对招牌和当前时间。地图点位或旧报道不能证明运营者、入口和服务时段仍然相同。",
        "分清公共街道、公园、商店与居民服务室、学校、诊所、照护设施。任何不确定空间都先询问，对方拒绝后立即离开。",
        "只在允许时拍建筑和公共导视。避免拍到可识别居民，尤其是儿童和正在接受照护的人，也不要拍居民名单、门卡或健康信息。",
        "普通观察已经回答问题时就结束，不跟随居民穿过门禁，也不要把别人的日常生活变成表演。"
      ]
    },
    {
      id: "access-heading",
      type: "heading",
      level: 2,
      text: "看得见，不一定代表可以使用"
    },
    {
      id: "access",
      type: "table",
      caption: "一套实用的准入判断",
      columns: ["遇到什么", "默认做法", "需要核验的问题"],
      rows: [
        ["沿街商店或公共市场", "营业时像普通顾客一样使用", "这个入口和支付方式现在是否可用？"],
        ["公共公园或有标识的公共步道", "停留在开放路线并遵守现场规则", "是否有门禁、分区或限时开放？"],
        ["社区食堂", "不默认对公众开放或给游客优惠", "非本社区居民能否按普通价格用餐？"],
        ["社区中心、诊所或服务台", "越过接待点前先询问", "这是公共服务、预约服务还是仅限居民？"],
        ["学校、托育、养老或住宅内部", "除非明确受邀，否则视为私人或受控空间", "不要仅为了观察或拍照申请进入"]
      ]
    },
    {
      id: "scenarios-heading",
      type: "heading",
      level: 2,
      text: "旅行者本身会改变生活圈"
    },
    {
      id: "scenarios",
      type: "comparison",
      title: "让人和路线改变结论",
      columns: [
        {
          heading: "独自走访曹杨的旅行者",
          body: "他从公共交通站点出发，只把官方地方地图作为定向参考，再串联公园、市场外沿和普通沿街服务。一间社区活动室不接待非居民，他便留在公共空间。即使没有进入每项设施，这段步行仍能说明服务网络如何组织。"
        },
        {
          heading: "轮椅使用者带老人走访重庆",
          body: "地图上的市场和服务中心看似很近，但陡坡、路缘和绕行过街点打断了原定路线。他们改为核验更短的无台阶公共路段，并把附近普通商店作为备用。实际可用范围小于规划图，正是应该得出的实用结论。"
        }
      ]
    },
    {
      id: "conditions-heading",
      type: "heading",
      level: 2,
      text: "哪些条件会改变答案"
    },
    {
      id: "conditions",
      type: "list",
      items: [
        "地形、宽阔道路、小区围墙和稀少的过街点，会把很短的直线距离变成长路线。",
        "个人步速、轮椅路线、休息需求或带儿童出行，会改变用时和可用入口。",
        "早市、助餐、诊所和社区活动室可能只有很窄的服务窗口。",
        "设施即使获得公共支持，也可能只服务符合条件的居民或预约对象。",
        "地方App可能要求中国手机号、实名账号或中文能力；它只是可选证据，不等于社区本身。",
        "施工、运营者更换和新增门禁，都可能让近期发布的地方地图失准。"
      ]
    },
    {
      id: "failure-heading",
      type: "heading",
      level: 2,
      text: "原定路线或设施不能使用时怎么办"
    },
    {
      id: "failure",
      type: "table",
      caption: "不向居民和工作人员施压的恢复方式",
      columns: ["遇到的问题", "可行处理", "不要这样做"],
      rows: [
        ["设施关闭或已经搬迁", "看有日期的通知，再使用附近开放的公共商店、公园或市场", "把旧地图当成服务承诺"],
        ["前台说只限居民", "向工作人员道谢并离开，只观察公共门面", "声称政府支持的设施必须接待游客"],
        ["App无法注册外国手机号", "改看街面标识、官方网站，或现场简单询问", "借用他人的身份或账号"],
        ["路线并非无台阶", "退回最近的安全过街点，改走更短且已核验的路段", "为了保住“15分钟”而走机动车道或危险路缘"],
        ["拍摄让他人不适", "收起相机，不拍照继续行程", "把居民当成风景或某种社会标签的证据"]
      ]
    },
    {
      id: "verify-heading",
      type: "heading",
      level: 2,
      text: "一次真实社区步行的核验清单"
    },
    {
      id: "verify",
      type: "list",
      items: [
        "写明社区和城市的准确名称，不把普通街景误标为已认定的生活圈。",
        "记录官方规划或地方地图的来源与发布日期。",
        "核对公共起点、合法过街点和连续可用路线。",
        "凡是步行中的关键设施，都确认当前营业时间和运营者。",
        "询问准入是面向公众、仅限居民、限年龄，还是需要预约。",
        "针对具体旅行者测试无台阶通路和休息需求，不套用抽象步行者。",
        "图片必须有可追溯地点、作者、许可和隐私核验。",
        "临近到访再次核查准入、App、施工和开放信息。本文核心与动态事实复核日期为2026年8月13日。"
      ]
    },
    {
      id: "scope",
      type: "callout",
      title: "本文能说明什么，不能说明什么",
      body: "本文解释规划术语，并提供尊重社区的实地观察方法；它不认证任何社区，不替你测量个人步行时间，不授予居民设施准入，也不对中国社区排名。现行推荐性社区生活圈行业指南与未来拟制的国家标准并非同一件事；在称后者已经生效前，应重新核查国家标准信息平台。",
      tone: "neutral"
    },
    {
      id: "links",
      type: "internal-links",
      title: "把社区观察接回实际行程规划",
      items: [
        {
          label: "核实社区食堂是否真的对公众开放",
          href: "/zh/guides/china-community-canteens-explained/",
          description: "针对生活圈中的一项具体服务，逐店核对准入、普通价格和饭卡要求。"
        },
        {
          label: "核验中国轮椅无障碍路线",
          href: "/zh/guides/wheelchair-accessible-china-route-planning/",
          description: "用连续、适合具体旅行者的无障碍链替代名义半径。"
        },
        {
          label: "规划带低龄儿童的中国行程",
          href: "/zh/guides/china-itinerary-with-young-children/",
          description: "按家庭日程重新判断步行、休息和服务条件。"
        },
        {
          label: "确认中国地图点位偏移",
          href: "/zh/guides/china-map-coordinate-offset-explained/",
          description: "交叉核对准确入口，不只相信导入地图中的一个标记。"
        }
      ]
    },
    {
      id: "sources",
      type: "sources",
      title: "2026年8月13日复核的官方与学术来源",
      items: [
        {
          label: "城市一刻钟便民生活圈建设指南",
          url: "https://www.mofcom.gov.cn/zwgk/gztz/art/2021/art_04807f8fe711403485c7d962a83a1172.html",
          publisher: "中华人民共和国商务部",
          reviewedAt: "2026-08-13"
        },
        {
          label: "城市一刻钟便民生活圈建设三年行动计划",
          url: "https://www.mofcom.gov.cn/ghjh/art/2023/art_a1495044fd694f0c920f1430b4dca1de.html",
          publisher: "中华人民共和国商务部",
          reviewedAt: "2026-08-13"
        },
        {
          label: "2026年便民生活圈建设与试点工作通知",
          url: "https://www.mofcom.gov.cn/zwgk/gztz/art/2026/art_ad0a1e1608be4bcd8ebf6e76ed8dbfbe.html",
          publisher: "中华人民共和国商务部",
          reviewedAt: "2026-08-13"
        },
        {
          label: "TD/T 1062-2021《社区生活圈规划技术指南》公告",
          url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/qtwj/202204/t20220407_2668427.html",
          publisher: "北京市人民政府／自然资源部",
          reviewedAt: "2026-08-13"
        },
        {
          label: "上海《15分钟社区生活圈行动指南》",
          url: "https://ghzyj.sh.gov.cn/nw2431/20230606/2a4788a79cd447a0af84a14a7642ebf0.html",
          publisher: "上海市规划和自然资源局",
          reviewedAt: "2026-08-13"
        },
        {
          label: "上海曹杨社区生活圈地图",
          url: "https://ghzyj.sh.gov.cn/nw2448/20230823/bdd2c719962f4547924f404d9a93b824.html",
          publisher: "上海市规划和自然资源局",
          reviewedAt: "2026-08-13"
        },
        {
          label: "曹杨社区更新案例",
          url: "https://ghzyj.sh.gov.cn/pt/20260306/f392035387c04945bbe2886d4126d2cd.html",
          publisher: "上海市规划和自然资源局",
          reviewedAt: "2026-08-13"
        },
        {
          label: "重庆民主村便民生活圈更新案例",
          url: "https://ltfzs.mofcom.gov.cn/jyjl/art/2024/art_290d7db13cc54dd794f2b48ed5cda1fe.html",
          publisher: "中华人民共和国商务部",
          reviewedAt: "2026-08-13"
        },
        {
          label: "雄安文华社区服务网络案例",
          url: "https://www.xiongan.gov.cn/20260404/852e71ea182f4f3db753c69e3da97821/c.html",
          publisher: "雄安新区管理委员会",
          reviewedAt: "2026-08-13"
        },
        {
          label: "中国四座超大城市公共服务水平差异研究",
          url: "https://www.nature.com/articles/s41599-023-01812-w",
          publisher: "Humanities and Social Sciences Communications",
          reviewedAt: "2026-08-13"
        },
        {
          label: "上海15分钟步行可达性的社会差异研究",
          url: "https://doi.org/10.1016/j.jth.2019.05.005",
          publisher: "Journal of Transport & Health",
          reviewedAt: "2026-08-13"
        },
        {
          label: "《城乡社区生活圈规划》国家标准计划",
          url: "https://std.samr.gov.cn/gb/search/gbDetailed?id=3E68E420F12A352EE06397BE0A0ACBAE",
          publisher: "全国标准信息公共服务平台",
          reviewedAt: "2026-08-13"
        },
        {
          label: "首图：LaouZEI bOENFUOO拍摄深圳华侨城社区中心，CC0；已裁切缩放",
          url: "https://commons.wikimedia.org/wiki/File:SZ_%E6%B7%B1%E5%9C%B3_Shenzhen_%E5%8D%97%E5%B1%B1%E5%8D%80_Nanshan_%E6%B7%B1%E5%8D%97%E5%A4%A7%E9%81%93_Shennan_Blvd_OCT_community_center_July_2024_R12S_01.jpg",
          publisher: "维基共享资源",
          reviewedAt: "2026-08-13"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
