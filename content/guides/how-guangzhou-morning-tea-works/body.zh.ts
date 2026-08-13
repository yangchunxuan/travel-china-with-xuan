import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "answer-first",
      type: "lead",
      text:
        "广州早茶不只是喝茶，也不只是吃早餐。它是把茶、广式点心和同桌相处的时间放在一起慢慢享用的一顿饭。粤语里的“饮茶”是整项活动，“点心”则是桌上的食物。第一次去时，要预期可能按人收取茶位费、餐厅各有不同点单方式，而且这顿饭通常比外带早餐慢得多。",
    },
    {
      id: "three-terms-heading",
      type: "heading",
      level: 2,
      text: "三个互有关联、但不能完全互换的词",
    },
    {
      id: "three-terms",
      type: "comparison",
      columns: [
        {
          heading: "早茶",
          body:
            "指广州这整套用餐和社交场景：茶、点心、谈话以及茶楼围绕它们提供的服务。有些餐厅会把早茶做到午间，所以“早茶”这个名字本身不能证明具体供应时段。",
        },
        {
          heading: "饮茶／Yum cha",
          body:
            "“饮茶”是粤语说法，英语常写作 yum cha。日常邀请别人“去饮茶”，通常是去完成一顿茶配点心的聚会，不是只点一杯茶。",
        },
        {
          heading: "点心／Dim sum",
          body:
            "指茶桌上的小份咸甜食物，可以蒸、焗、炸，也可以是肠粉、粥等形式。点心是饮茶的一部分，不是与饮茶完全同义的词。",
        },
      ],
    },
    {
      id: "regional-scope",
      type: "callout",
      title: "这是地方习俗，不是“所有中国人都这样”",
      body:
        "广府饮茶习俗形成于广州和珠江三角洲，并传播到香港、澳门和海外广府文化社区。这些地方共享不少词汇和点心，但服务、配方和礼俗并不完全相同。本文只解释广州场景，不把一个区域的生活方式写成全中国统一规则。",
      tone: "neutral",
    },
    {
      id: "history-heading",
      type: "heading",
      level: 2,
      text: "历史资料能证明什么，不能证明什么",
    },
    {
      id: "history-intro",
      type: "paragraph",
      text:
        "目前没有可靠文献能证明某个人在某一天“发明”了广州早茶。较稳妥的地方史叙述把现代早茶形态追溯到晚清广州：一厘馆、二厘馆等价钱平实的场所提供茶、简单食物，也让劳工、商人和过路人休息、交换消息。学术研究同样把它放在清代背景中，并把茶楼扩张与广州的港口和商业生活联系起来。这是一段逐步形成的历史，不是单一的起源传奇。",
    },
    {
      id: "history-timeline",
      type: "table",
      caption: "谨慎表述的广州早茶时间线",
      columns: ["时期", "有记录的事实", "应怎样理解"],
      rows: [
        [
          "晚清咸丰、同治年间",
          "广州官方非遗资料把一厘馆、二厘馆视为现代茶楼的前身，并说明茶配点心的饮茶风气在这一时期逐渐形成。",
          "这是现代习俗较可靠的起点，不等于更早以前完全不存在茶与小食的聚会。",
        ],
        [
          "晚清至二十世纪初",
          "规模更大的茶居、茶楼发展起来，面向不同客群，茶桌兼具休闲、家庭相聚、交换信息和谈生意等功能。",
          "茶楼既是餐饮生意，也是城市公共生活的一部分；它从来不只属于某一个年龄或阶层。",
        ],
        [
          "2022 年",
          "广府饮茶习俗列入广东省第八批省级非物质文化遗产代表性项目名录。",
          "非遗认定保护的是持续变化的生活习俗，并没有把某一种餐厅装修或点单方式永久固定下来。",
        ],
        [
          "2026 年",
          "《广州早茶传承保护规定》自 5 月 1 日起施行；7 月又启动自愿参加的广州早茶传统店评价。",
          "早茶今天既是日常餐饮，也成为制度化保护的城市文化。",
        ],
      ],
    },
    {
      id: "fact-levels",
      type: "callout",
      title: "本文如何区分事实层级",
      body:
        "日期、非遗状态和 2026 年经营要求以政府或 UNESCO 记录为准；茶楼的社会作用采用学术和文化研究解释；帝王创造某个手势的故事只标作传说；点多少菜等建议则明确属于 Homeground 的旅行编辑判断，不伪装成历史规矩。",
      tone: "decision",
    },
    {
      id: "table-flow-heading",
      type: "heading",
      level: 2,
      text: "坐下一张早茶桌后，通常会发生什么",
    },
    {
      id: "table-flow",
      type: "list",
      ordered: true,
      items: [
        "先核对餐厅当天的早茶供应时间，再按它的方式排队或预约。“早茶”这个名称不保证全天都有完整菜单。",
        "入座后先选茶。茶位费通常按人数而不是按一壶收取，所以点单前要问清每位费用和包含的服务。",
        "按餐厅当天使用的方式点单：纸质勾选单、盖章点心卡、二维码菜单、服务员点单，或少数传统大厅里的点心车。",
        "小份点心共同分享，吃完再加。蒸笼或碟子常见二至四件，但数量和大小差别很大，不能套用一个万能公式。",
        "需要时请服务员续热水。把壶盖错开是有记录的地方信号，但在现代餐厅，服务铃或直接开口可能更清楚。",
        "付款前看清明细，包括茶位费和不同点心档次的价格。",
      ],
    },
    {
      id: "ordering-systems",
      type: "comparison",
      title: "经典印象与现实中的不同点单方式",
      columns: [
        {
          heading: "点心车与盖章卡",
          body:
            "服务员推着做好的点心巡台、报菜名，再在点心卡上盖章或记数。这是很有辨识度的传统服务形式，有些大厅仍保留，但不能预设每家都有。",
        },
        {
          heading: "纸质勾选单",
          body:
            "客人在纸单上标数量，再交给服务员。提前把三四个想吃菜名的汉字存进手机，比到了现场翻译整张菜单更实用。",
        },
        {
          heading: "二维码或 App",
          body:
            "许多当代餐厅采用电子菜单，也可能与人工点单并存。外国游客仍要准备联网手机和支付备用，而且页面不一定有英文。",
        },
      ],
    },
    {
      id: "regulation-heading",
      type: "heading",
      level: 2,
      text: "广州在 2026 年发生了什么变化",
    },
    {
      id: "regulation-summary",
      type: "paragraph",
      text:
        "《广州早茶传承保护规定》对一种地方饮食习俗给出了少见的具体保护规则。规定自 2026 年 5 月 1 日起施行，把广州早茶定义为产生、发展并流行于广州地区，以饮茶搭配广式点心为核心，融合岭南饮食文化、社交习俗与传统技艺的地域性饮食消费形态；同时要求菜单、价签和自助点餐应用上的收费项目与计价方式清晰一致。",
    },
    {
      id: "regulation-details",
      type: "table",
      caption: "2026 年规定中与旅行者直接有关的部分；核对日期：2026 年 8 月 10 日",
      columns: ["规则", "客人可能看到什么", "不能过度推断什么"],
      rows: [
        [
          "茶位费",
          "经营者收取茶位费时，应提供红茶、绿茶、乌龙茶、普洱茶、菊花茶等供选择，并做好相应茶饮服务。",
          "规定没有统一全市价格，也没有保证每家餐厅采用完全相同的续水方式。",
        ],
        [
          "点心怎样制作",
          "菜单或其他显著位置应说明早茶食品是以传统方式现场制作，还是以非传统方式制作。",
          "同一种食品的两种制作方式可以采用不同价格。",
        ],
        [
          "制作到食用的时间",
          "标为传统方式现场制作的早茶食品，一般从制成到提供食用不超过 24 小时。",
          "如果传统技艺本身需要超过 24 小时，餐饮相关行业协会等可以另行明确例外。",
        ],
        [
          "制作过程展示",
          "经营者应通过透明式、开放式、视频监控式厨房或参观通道等形式展示广式点心加工制作。",
          "具体形式要看场地，并不等于每位客人都能进入厨房参观。",
        ],
        [
          "广州早茶传统店",
          "自愿参加的第三方评价在 2026 年 7 月启动，获认证店铺可以得到牌匾。",
          "老字号不会自动获得认证；没有牌匾也不能单独证明一家店“不正宗”。",
        ],
      ],
    },
    {
      id: "dishes-heading",
      type: "heading",
      level: 2,
      text: "记住几个菜单坐标，比背一张百项清单有用",
    },
    {
      id: "dish-table",
      type: "table",
      caption: "广州早茶常见点心与饮食限制提醒",
      columns: ["菜单名称", "通常是什么", "需要注意"],
      rows: [
        [
          "虾饺 — har gow",
          "澄面皮蒸制的半透明饺子，以虾为主要馅料，也可能加入竹笋和猪油。",
          "核心是甲壳类；外皮透明不代表天然无麸质或一定不含猪肉成分。",
        ],
        [
          "干蒸烧卖 — siu mai",
          "广州常见的是开口蒸点，馅料多为猪肉与虾。",
          "通常含猪肉，也可能含甲壳类，具体配方随店而变。",
        ],
        [
          "叉烧包 — char siu bao",
          "蒸或焗制的面包点心，内馅是甜咸口的广式叉烧。",
          "含猪肉和小麦，酱汁成分也要另问。",
        ],
        [
          "肠粉 — cheung fun",
          "薄米浆皮卷入虾、牛肉、叉烧或其他馅料，蒸好后淋豉油。",
          "看似清淡的肠粉仍可能含肉汤、大豆、海鲜或共享厨房交叉接触。",
        ],
        [
          "糯米鸡 — lo mai gai",
          "糯米包入荷叶蒸制，常见鸡肉、猪肉、香菇等咸鲜馅料。",
          "“糯”描述米的黏性，不等于可以忽略酱汁、馅料和过敏原。",
        ],
        [
          "蛋挞 — egg tart",
          "酥皮或挞皮盛蛋奶馅焗制，也反映出广式点心不断吸收外来技法的历史。",
          "通常含蛋、奶和小麦。",
        ],
      ],
    },
    {
      id: "dietary-warning",
      type: "callout",
      title: "不要只凭外观判断能不能吃",
      body:
        "猪油、虾米、鲜虾、蚝油、肉汤和共享加工环境都可能藏在外国游客意想不到的点心里。有食物过敏时，应把过敏原用书面中文给餐厅看，同时询问配方与交叉接触。素食、清真、犹太洁食或其他要求也应选择能明确回答的餐厅，不能把“蔬菜馅”当作充分证明。",
      tone: "warning",
    },
    {
      id: "etiquette-heading",
      type: "heading",
      level: 2,
      text: "礼俗：有记录的信号、普通礼貌和好听的传说",
    },
    {
      id: "etiquette-table",
      type: "table",
      caption: "几种早茶动作分别能说得多确定",
      columns: ["做法", "事实层级", "旅行者怎样回应"],
      rows: [
        [
          "先给同桌人斟茶，再给自己倒",
          "共享茶桌上常见的礼貌，但不是法律条文，也不是每个群体都以完全相同方式执行。",
          "茶壶在手边时可以先示意为别人倒；有本地主人时跟随对方节奏即可。",
        ],
        [
          "别人斟茶后，用弯曲的两指轻叩桌面",
          "扣指茶礼确实是广府饮茶习俗中有记录的动作；乾隆皇帝微服出行而产生此礼的故事属于地方传说，不是可证明的起源。",
          "同桌人使用时可以轻叩回应；直接说谢谢也没有问题，游客不会因为少做一个手势而“失礼考试不及格”。",
        ],
        [
          "错开或揭开壶盖表示要续水",
          "揭盖续水已写入省级非遗资料；关于它最初怎样出现的故事有多个版本，不能当成定论。",
          "只有在该餐厅明显理解这个信号时再用；不确定就叫服务员或按服务铃。",
        ],
        [
          "别人夹菜时不要转动转盘",
          "这是共享餐桌上的普通礼貌，不是广州独有的神秘仪式。",
          "等对方取完食物，再轻轻转动。",
        ],
      ],
    },
    {
      id: "etiquette-callout",
      type: "callout",
      title: "观察比背诵更可靠",
      body:
        "第一次去最稳妥的方法很简单：看同桌和服务员怎样运转，把共享点心放在大家都拿得到的位置，需要时斟茶或传递，不明白信号就开口问。知道乾隆传说，远不如别在别人夹菜时突然转桌来得重要。",
      tone: "decision",
    },
    {
      id: "one-bowl-heading",
      type: "heading",
      level: 2,
      text: "“一盅两件”是文化缩写，不是固定套餐",
    },
    {
      id: "one-bowl-explanation",
      type: "paragraph",
      text:
        "广州文化主管部门对“一盅两件”的解释是：一盅茶配两笼点心。这个传统说法说明了茶与小点为什么一直连在一起，但它不是现代餐厅必须出售的统一套餐，也不是要求客人只能点两笼。今天的菜单既有克制的传统点心，也有运用新食材与新造型的产品。",
    },
    {
      id: "social-life-heading",
      type: "heading",
      level: 2,
      text: "为什么这顿饭在现代城市里仍然重要",
    },
    {
      id: "social-life",
      type: "paragraph",
      text:
        "早茶给家庭叙旧、朋友见面、商务交谈，甚至一个人看报和反复续水留出了一张公共桌子。这种社交用途解释了为什么许多小份点心可以让一个热闹大厅运行很久。但把广州人都写成“每天必去茶楼”仍然是刻板印象：工作时间、年龄、预算、居住区和家庭习惯都会改变谁在什么时候出现。",
    },
    {
      id: "living-culture",
      type: "paragraph",
      text:
        "习俗延续，不等于它从不变化。很多餐厅的点心车被勾选单和二维码取代，传统点心旁边出现新口味，政府保护规则也开始区分传统现场制作与其他方式。真正延续的是茶、共享小食、师傅技艺和社交时间之间的关系，而不是一套永不改变的装修和菜单。",
    },
    {
      id: "unesco-clarification",
      type: "callout",
      title: "广州早茶已经列入 UNESCO 吗？还不是一个独立项目",
      body:
        "截至 2026 年 8 月 10 日，UNESCO 人类非物质文化遗产代表作名录收录的是中国更广泛的“中国传统制茶技艺及其相关习俗”，于 2022 年列入。广府饮茶习俗目前是广东省级非遗项目。广州 2026 年规定写的是推动广州早茶申报 UNESCO，这是一项目标，不等于申报已经成功。",
      tone: "warning",
    },
    {
      id: "first-visit-heading",
      type: "heading",
      level: 2,
      text: "第一次去，可以这样准备",
    },
    {
      id: "first-visit-plan",
      type: "list",
      ordered: true,
      items: [
        "用餐厅当前菜单、近期服务信息和实际位置选择广州茶楼或粤菜餐厅，不依赖多年未更新的“最正宗”榜单。",
        "在它公布的早茶时段到店，并为这顿饭留出比快餐早餐更多的时间。排队和点心售罄情况要看具体日期。",
        "把三四个真正想吃的菜名汉字和一种茶存进手机，比背一张上百项菜单更有效。",
        "两个人初次去，Homeground 的保守起点是一壶茶配三至四份小点，再逐步加单。这只是防止浪费的点单经验，不是“一盅两件”的定义。",
        "提交订单前确认每人茶位费、每份件数以及过敏或饮食限制。",
        "一个人去可以先问有没有小份；吃不到那么多种是正常的，打包剩余点心也比为了拍照而过量点单更合理。",
      ],
    },
    {
      id: "not-assume-heading",
      type: "heading",
      level: 2,
      text: "进茶楼前，先放下五个预设",
    },
    {
      id: "not-assume-list",
      type: "list",
      items: [
        "饮茶和点心是完全相同的概念。",
        "广州每一家餐厅都还在推点心车。",
        "每位本地人每天都吃早茶，也都会做齐所有手势。",
        "广州早茶已经作为独立项目列入 UNESCO 名录。",
        "点心外皮看起来清淡，就一定是素食、不含猪肉或不会引发过敏。",
      ],
    },
    {
      id: "final-connection",
      type: "callout",
      title: "用一顿饭读懂一部分广州",
      body:
        "安排得合适的一顿早茶，比再看一张通用景点清单更能解释广州的食物技艺、社交节奏和商业历史。如果你想把真实的茶楼体验放进更大的中国路线，可以向 Homeground 真人规划师讨论背景与交通；具体餐厅的营业时间、菜单和饮食限制处理仍应直接向店家核实。",
      tone: "neutral",
    },
    {
      id: "internal-links",
      type: "internal-links",
      title: "继续规划广州与中国行程",
      items: [
        {
          label: "确认白云机场该去 T2 还是 T3",
          href: "/zh/guides/guangzhou-baiyun-airport-t2-t3/",
          description: "先按航班确认航站楼，再选择正确的地铁、城际铁路或接驳方式。",
        },
        {
          label: "检查中国行程是否排得太赶",
          href: "/zh/guides/is-your-china-itinerary-too-rushed/",
          description: "给早茶、交通和临时调整留出真实可用的时间。",
        },
        {
          label: "判断中国旅行是否需要导游",
          href: "/zh/guides/do-you-need-a-tour-guide-in-china/",
          description: "把真人协助放在最需要背景讲解或现场协调的环节。",
        },
        { label: "选择一处茶乡景观", href: "/zh/guides/tea-landscape-regions-of-china/", description: "不按名茶排名，而是从现场能看见的景观、工序与社区关系，选择适合自己的中国茶产地。" },
      ],
    },
    {
      id: "official-sources",
      type: "sources",
      title: "2026 年 8 月核对的官方、学术与图片资料",
      items: [
        {
          label: "《广州早茶传承保护规定》——2026 年 5 月 1 日起施行",
          url: "https://wglj.gz.gov.cn/gkmlpt/content/10/10753/post_10753247.html",
          publisher: "广州市文化广电旅游局",
          reviewedAt: "2026-08-10",
        },
        {
          label: "广州早茶传统店自愿评价工作通知——2026 年 7 月 9 日",
          url: "https://scjgj.gz.gov.cn/zwdt/tzgg/content/post_10894364.html",
          publisher: "广州市市场监督管理局",
          reviewedAt: "2026-08-10",
        },
        {
          label: "广州市政府：广府饮茶习俗列入广东省级非遗代表性项目名录",
          url: "https://www.gz.gov.cn/zt/jrshts/2022n/dwj/tpxw/content/post_8293092.html",
          publisher: "广州市人民政府",
          reviewedAt: "2026-08-10",
        },
        {
          label: "Guo 等：《Cantonese morning tea (Yum Cha): a bite of Cantonese culture》",
          url: "https://link.springer.com/article/10.1186/s42779-023-00180-9",
          publisher: "Journal of Ethnic Foods / Springer Nature",
          reviewedAt: "2026-08-10",
        },
        {
          label: "UNESCO：中国传统制茶技艺及其相关习俗",
          url: "https://ich.unesco.org/en/RL/traditional-tea-processing-techniques-and-associated-social-practices-in-china-01884?RL=01884",
          publisher: "UNESCO 非物质文化遗产",
          reviewedAt: "2026-08-10",
        },
        {
          label: "广州市政府：2026 广式早茶与经典点心介绍",
          url: "https://www.gz.gov.cn/zt/jrshts/2026n/nwzgz/nwgz/content/post_10689712.html",
          publisher: "广州市人民政府",
          reviewedAt: "2026-08-10",
        },
        {
          label: "广州文化主管部门：茶楼文化、“一盅两件”与广式点心演变",
          url: "https://wglj.gz.gov.cn/ztmb/gzhyn/whgz/content/post_8832957.html",
          publisher: "广州市文化广电旅游局",
          reviewedAt: "2026-08-10",
        },
        {
          label: "香港旅游发展局：粤式点心英文通行名称参考",
          url: "https://www.discoverhongkong.com/eng/food-and-drink/must-try-street-food-in-hong-kong.html",
          publisher: "香港旅游发展局",
          reviewedAt: "2026-08-10",
        },
        {
          label: "主图：MeiOLA 2290 WMENSZ 摄广州泮溪酒家点心桌，CC0；已裁切并转为 WebP",
          url: "https://commons.wikimedia.org/wiki/File:GD_%E5%BB%A3%E6%9D%B1_Guangdong_%E5%BB%A3%E5%B7%9E_Guangzhou_%E8%8D%94%E7%81%A3%E5%8D%80_Liwan_%E9%BE%8D%E6%B4%A5%E8%A5%BF%E8%B7%AF_Longjin_West_Road_shop_%E6%B3%AE%E6%BA%AA%E9%85%92%E5%AE%B6_Pan_Xi_Restaurant_%E9%BB%9E%E5%BF%83_dim_sum_June_2025_R12S_30.jpg",
          publisher: "Wikimedia Commons",
          reviewedAt: "2026-08-11",
        },
      ],
    },
  ],
};

export default body;
