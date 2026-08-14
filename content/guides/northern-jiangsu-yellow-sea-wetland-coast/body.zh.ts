import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {schemaVersion: "1.0.0", blocks: [
  {id: "answer-first", type: "lead", text: "先选一种公众湿地体验，再住到它附近。想去条子泥，东台最实用；想理解麋鹿保护，大丰更合适；想先看黄海湿地博物馆，再另行安排丹顶鹤湿地生态旅游区，盐城市区更方便。这些地点属于同一个保护故事，却不是一个可以步行连通的公园。野生动物会自由移动，任何负责任的向导都不能保证某种鸟、鸟群、潮汐奇观或近距离相遇。"},
  {id: "serial-map", type: "callout", title: "世界遗产是分散组成的受保护区域", body: "UNESCO 的中国黄（渤）海候鸟栖息地由多个分离组件组成，不是一条连续的游客栈道。世界遗产边界可能包含不向普通游客开放的栖息地。用 UNESCO 地图理解保护系统；出发前再向当前场地管理方确认哪些区域对游客开放。", tone: "neutral"},
  {id: "components-heading", type: "heading", level: 2, text: "把组件地图翻译成公众能够执行的选择"},
  {id: "component-matrix", type: "table", caption: "苏北湿地组成与公众选择", columns: ["区域", "游客可以做什么", "开放边界"], rows: [
    ["东台／条子泥", "在景区当时向游客开放的线路或观鸟设施理解潮间带并观鸟。", "出发前向当前管理方确认入口、道路、观测点与接驳是否开放；附近修复区或繁殖地不是进入邀请。"],
    ["大丰／中华麋鹿园", "通过受控游客系统理解麋鹿保护并观察动物。", "参观麋鹿园不等于在国家级保护区自由活动；动物位置和能见度会变化。"],
    ["射阳沿海／丹顶鹤湿地生态旅游区", "在公众旅游区内了解湿地与季节性鸟类。", "生态旅游区只是大保护区的一部分；冬季也不保证看到野生丹顶鹤。"],
    ["盐城市区／黄海湿地博物馆", "在室内先理解迁徙、滩涂和世界遗产全貌，再选一段海岸。", "博物馆只能定向，不能证明远处保护区道路、观鸟屋或滩涂开放。"],
    ["无名海堤、养殖道路或地图点", "除非有主管单位确认，否则不能视为可靠的公众入口。", "不能因为观鸟帖子带坐标，就在作业道路停车、跨门或走进滩涂。"]
  ]},
  {id: "base-heading", type: "heading", level: 2, text: "用一个问题选择基地"},
  {id: "base-selector", type: "list", items: [
    "非去条子泥海岸不可，就住东台附近，并在出发前向当前管理方确认使用中的入口和最后公路接驳。",
    "非麋鹿保护解说不可，就住大丰；不要因为都在黄海地图上，顺手再塞进条子泥。",
    "重视整体背景、铁路抵达或不怕天气的第一天，就住盐城市区，先去湿地博物馆。",
    "目标是某个迁徙物种，就根据官方监测和迁徙资料选日期，同时接受仍可能不出现。",
    "只有一天时，不要把两个遥远海岸产品硬拼在一起，除非有书面车程、当前开放确认和天黑前返程。"
  ]},
  {id: "scenarios", type: "table", caption: "常见旅客情境", columns: ["旅客", "建议基地", "安排"], rows: [
    ["没有专业光学设备的第一次访客", "盐城市区或大丰", "先用博物馆建立背景，或选择受控的麋鹿园；把理解生态而不是稀有物种照片作为成功标准。"],
    ["带单筒望远镜、卡着迁徙窗口的资深观鸟者", "向当地确认后选东台", "预订合规观测服务，说明目标物种但不要求保证，并取得潮汐、入口和集合点详情。"],
    ["遇到下雨或强风的家庭", "盐城市区", "把博物馆安排成完整一天；只有场地管理方确认安全开放时，才把海岸放到后面。"]
  ]},
  {id: "ethics-heading", type: "heading", level: 2, text: "观赏规范比打卡清单更重要"},
  {id: "ethics", type: "list", items: [
    "留在指定道路、栈道和观鸟屋；现场标识与工作人员指示优先于观鸟 App。",
    "不播放鸟鸣、不飞无人机、不打强光、不投喂、不追近；繁殖、栖息和觅食中的鸟需要距离。",
    "降低音量和连拍噪声，鸟离开时不要跟随。",
    "不捡鸟蛋、羽毛、植物或滩涂动物；盐城滨海湿地条例禁止猎捕、捡蛋和破坏鸟巢。",
    "不公开巢址或敏感实时坐标，通过符合保护要求的渠道分享记录。",
    "导游能帮你留在允许开放的区域并理解所见，不是逼迫动物靠近镜头。",
    "接受远距离识别或无法识别；望远镜里看到不等于手机能拍到。"
  ]},
  {id: "season", type: "paragraph", text: "长期规律是迁徙、越冬、繁殖、潮汐、风和能见度都会改变观察结果。盐城 2026 年官方资料记录了条子泥春季繁殖以及丹顶鹤、麋鹿的季节活动，但它们是生态条件记录，不是与某只动物的预约。Homeground 的判断是先选栖息地与学习体验，再把每次目击当作额外收获。"},
  {id: "failure-heading", type: "heading", level: 2, text: "即使没看到鸟，这一天也应成立"},
  {id: "failure-recovery", type: "table", caption: "天气不好或没有目击时的替代", columns: ["发生了什么", "更好的替代", "不要做"], rows: [
    ["雨、雾或强海风", "去黄海湿地博物馆，并询问当前管理方稍后是否有安全窗口。", "不要为了救行程走暴露海堤或泥滩。"],
    ["目标物种没有出现", "观察栖息地、常见物种、痕迹和解说，并记录环境条件。", "不要让司机搜索无标识保护区道路。"],
    ["潮汐或入口时间改变", "按景区当时调整后的公众线路走，或缩短参观。", "不要跨越围挡接近水线。"],
    ["一个区域关闭", "留在同一基地：盐城看博物馆，东台改去当前确认开放的室内场馆或森林参访，大丰在城镇休息。", "不要用未经确认的“秘境湿地”替代。"],
    ["动物离得很远", "用双筒或单筒望远镜，把保持距离视为成功的低干扰观察。", "不要靠近、投喂或用无人机做比例。"]
  ]},
  {id: "route", type: "callout", title: "一次负责任的两段式游览", body: "先到基地，并向当前管理方确认次日开放通知、潮汐或天气、入口与返程；第二天只参观一个公众区域，留在管理线路内，再回到同一基地。只有车程合理时，才把湿地博物馆放在海岸前后；不要把博物馆、条子泥、麋鹿和丹顶鹤包装成一个湿地一日冲刺。", tone: "decision"},
  {id: "final-check", type: "list", items: [
    "选好一个基地和一个不可替代的公众组件。",
    "出发前确认准确入口、当前管理方联系方式、护照／门票方法与开放时间。",
    "出发前再看一次潮汐、天气、道路与保护区通知。",
    "不保证物种、鸟群数量或近距离照片。",
    "排除播放鸟鸣、无人机、投喂和越过围挡。",
    "返程交通和看不到目标物种时的室内替代已准备。",
    "不会发布敏感位置数据。"
  ]},
  {id: "internal-links", type: "internal-links", title: "把湿地基地接入整段旅行", items: [
    {label: "探索中国", href: "/zh/explore/", description: "增加另一个海岸停留前，先比较目的地角色。"},
    {label: "单一基地还是多地换酒店", href: "/zh/guides/china-hub-and-spoke-or-multi-base-route/", description: "判断是否值得为东台或大丰多换一次酒店。"},
    {label: "中国全程铁路路线", href: "/zh/guides/china-rail-only-route/", description: "把城际铁路与最后海岸公路接驳分开。"},
    {label: "中国肩季价值取舍", href: "/zh/guides/china-shoulder-season-value-tradeoff/", description: "季节价值是取舍，不是野生动物保证。"},
    { label: "比较湿地保护与荒漠治理的证据", href: "/zh/guides/desert-restoration-travellers-can-see/", description: "在明确地点与日期下，核验管理边界、用水权衡、治理主张和公众准入。" },
    { label: "比较城市海绵设施与滨海湿地水系统", href: "/zh/guides/how-to-read-a-chinese-sponge-city/", description: "按机制和边界核验，不把一片绿色空间直接当作蓄水、排水或生态成效的证明。" }
  ]},
  {id: "consultation", type: "callout", title: "需要按日期匹配海岸基地？", body: "Homeground 真人旅行顾问可以比较你日期下更实用的基地、当时开放的公众区域、公路接驳和坏天气替代。请说明你最看重栖息地、摄影、麋鹿还是某个迁徙窗口。", tone: "neutral"},
  {id: "sources", type: "sources", title: "2026 年 8 月 13 日核验的官方来源", items: [
    {label: "黄（渤）海候鸟栖息地世界遗产及组件地图", url: "https://whc.unesco.org/en/list/1606/", publisher: "UNESCO 世界遗产中心", reviewedAt: "2026-08-13"},
    {label: "盐城黄海湿地官方网站", url: "https://www.yellowsea-wetland.cn/", publisher: "盐城市黄海湿地世界自然遗产管理办公室", reviewedAt: "2026-08-13"},
    {label: "2026 年公众湿地景区与科普产品", url: "https://www.yancheng.gov.cn/art/2026/4/26/art_34154_4420721.html", publisher: "盐城市人民政府", reviewedAt: "2026-08-13"},
    {label: "条子泥繁殖栖息地保护动态", url: "https://wap.yancheng.gov.cn/art/2026/5/9/art_45136_4424125.html", publisher: "盐城市人民政府", reviewedAt: "2026-08-13"},
    {label: "盐城市黄海湿地保护条例", url: "https://www.yancheng.gov.cn/art/2019/10/25/art_13184_3279209.html", publisher: "盐城市人民政府", reviewedAt: "2026-08-13"},
    {label: "首图：zhangshen 于 2021 年 9 月 8 日拍摄的盐城滨海盐沼与远处麋鹿", url: "https://commons.wikimedia.org/wiki/File:P%C3%A8_David%27s_Deer_imported_from_iNaturalist_photo_162354434_on_24_January_2024.jpg", publisher: "Wikimedia Commons / zhangshen", reviewedAt: "2026-08-13"},
    {label: "首图许可：知识共享署名 4.0", url: "https://creativecommons.org/licenses/by/4.0/", publisher: "Creative Commons", reviewedAt: "2026-08-13"}
  ]}
]};

export default body;
