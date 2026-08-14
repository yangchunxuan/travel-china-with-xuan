import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead",
      type: "lead",
      text:
        "在中国遗产地，同一视野里可能同时出现原存材料、修缮部位、依据档案重建的建筑、迁建构件，以及采用传统外观的新建筑。不要把参观压缩成“真还是假”。先确定你在看哪个构件、它经历了什么干预、证据来自哪里。殷墟、箭扣长城和永定门说明，地下遗存、修缮后的历史材料与有档案依据的现代重建，需要的是三套不同问题。",
    },
    {
      id: "answer",
      type: "callout",
      title: "直接答案",
      body:
        "旧材料不是承载真实性的唯一方式，修缮也不会自动把遗产变“假”。应追问：这里表达的价值是什么；证据针对材料、设计、功能、工艺、位置还是环境；哪些部分发生过改变；由谁记录、如何记录。列入世界遗产，确认的是特定遗产及其申报价值，不等于范围内每块砖、每片瓦和每座可见建筑都是古代原物。",
      tone: "decision",
    },
    {
      id: "question-heading",
      type: "heading",
      level: 2,
      text: "别只问“真实吗”：先给眼前对象贴对七种标签",
    },
    {
      id: "labels",
      type: "table",
      caption: "判断眼前物质对象时可使用的七种标签",
      columns: ["标签", "工作定义", "应寻找的证据", "外观不能证明什么"],
      rows: [
        [
          "原构（原存历史材料）",
          "仍然存在的历史材料、结构或考古层；它们可能经过日常维护或局部替换。",
          "构件测绘、考古记录、材料分析，或指向具体构件的正式说明牌。",
          "相邻所有部分都属于同一年代，或从未修过。",
        ],
        [
          "原址保留",
          "遗存留在历史位置上，可能露天展示、覆盖保护，也可能保护性回填。",
          "发掘平面图、回填记录，以及解释地表展示方式的现场说明。",
          "地面的绿篱、轮廓线或铺装本身就是古代材料。",
        ],
        [
          "保护性修缮",
          "为稳定结构、改善排水、加固危险部位或减缓劣化所做的工程；必要时可能使用相容的新材料。",
          "病害调查、批准的工程方法、修前修后记录，以及竣工或验收记录。",
          "修缮等于整段替换，或“看起来很旧”就代表完全没有新构件。",
        ],
        [
          "复原",
          "依据证据，把某一构件恢复到已知的较早状态；新增与移除内容应可识别。",
          "目标年代、文献或物证依据，以及保留、移除和新增部分清单。",
          "“恢复历史风貌”天然对应某个唯一年代，或能说明新旧材料比例。",
        ],
        [
          "重建",
          "已经大部或全部消失的建筑或结构被重新建造，主体通常是新材料。",
          "损毁记录、设计依据、考古资料、建造日期和材料说明。",
          "采用原轮廓、原位置或传统工艺，就会让新材料变成古代原物。",
        ],
        [
          "迁建",
          "建筑被拆解或移动后，在新地点重新组装，通常同时包含保留构件与替换构件。",
          "新旧址测绘、构件编号、拆解记录和替换清单。",
          "“整体迁移”代表构件和环境完全没有改变。",
        ],
        [
          "现代仿古",
          "为展示、商业或景观而采用传统外观的新建筑，并非对某一有完整证据的已失遗产对象进行重建。",
          "规划审批、运营主体和设计任务书。",
          "瓦顶、匾额或做旧表面属于历史建筑。",
        ],
      ],
    },
    {
      id: "nara-heading",
      type: "heading",
      level: 2,
      text: "《奈良真实性文件》究竟说了什么",
    },
    {
      id: "nara-p1",
      type: "paragraph",
      text:
        "《奈良真实性文件》不是一部给建筑判定“真伪”的法律。UNESCO档案中可靠的身份是资料文件 WHC-94/CONF.003/INF.008，日期为1994年11月21日，提交世界遗产委员会第十八届会议。它记录了1994年11月1日至6日在奈良举行的专家会议，并说明文件建立在1964年《威尼斯宪章》基础之上。UNESCO目录中的116018号条目也是真实条目，但核对会议身份和年份时，应以这份委员会资料文件为准。",
    },
    {
      id: "nara-p2",
      type: "paragraph",
      text:
        "文件真正有用的原则是“放回文化语境”：遗产价值以及支撑这些价值的信息来源，必须在相关文化背景中理解。现行《实施〈世界遗产公约〉操作指南》把可能承载真实性的属性列得更具体，包括形制与设计、材料与实体、用途与功能、传统、技术和管理体系、位置与环境、语言及其他非物质遗产，以及精神与感受。指南同时对重建设置很高门槛：考古遗址、历史建筑或街区只能在特殊情况下重建，必须有完整、详细的记录，而不能依靠猜测。",
    },
    {
      id: "nara-callout",
      type: "callout",
      title: "奈良文件不等于“什么都可以算真实”",
      body:
        "文化语境让证据维度更丰富，并没有取消可信来源的必要性。传统工艺可以是重要属性，但用这种工艺新做出的构件仍然是新材料；原址可能十分重要，但地表标识仍可能是现代展示。可靠的解说会明确：每项判断针对哪一种价值和哪一种属性。",
      tone: "warning",
    },
    {
      id: "field-heading",
      type: "heading",
      level: 2,
      text: "下结论前，先做四问现场测试",
    },
    {
      id: "field-p1",
      type: "paragraph",
      text:
        "从你能准确命名的最小对象开始。“永定门城楼”“王陵区M1400号大墓的地表展示”“箭扣五期某段城墙”都是可用单位，“古代中国”不是。先拍下场所名称和干预说明，再拍好看的角度。如果说明只有朝代和赞美词，继续寻找保护工程牌、考古说明或构件标签。",
    },
    {
      id: "field",
      type: "list",
      ordered: true,
      items: [
        "价值：这里重要的是什么——材料证据、城市轴线、建筑形制、使用功能、工艺传统、环境，还是几者并存？",
        "对象：判断究竟针对哪个考古层、建筑、文物或表面？把地基与模型、城台与城楼、原匾与复制匾分开。",
        "干预：它是发掘展示、保护性回填、抢险加固、局部复原、重建、迁建，还是后来新增？开工、完工与验收是不同节点，分别记录。",
        "信息来源：判断来自考古、工程档案、构件标签、历史图纸、口述传统，还是只有旅游文案？证据不足时记录“不确定”，不要猜。",
      ],
    },
    {
      id: "yinxu-heading",
      type: "heading",
      level: 2,
      text: "在殷墟，最重要的证据可能被保护在地下",
    },
    {
      id: "yinxu-p1",
      type: "paragraph",
      text:
        "安阳殷墟会打破一种直觉：真实的古都不一定要有完整耸立的宫殿。UNESCO对这座商代晚期都城的说明，包括建筑基址、王陵、考古堆积、甲骨刻辞和出土文物。其真实性说明写明，遗址和出土遗物会尽可能原址保护；发掘结束后，遗址可以回填保护，并在地面以植被表示；重要文物则进入博物馆获得专业保护。因此，保护有时让证据看起来不那么“壮观”，却不等于证据更不真实。",
    },
    {
      id: "yinxu-marker-figure",
      type: "figure",
      src: "/images/guides/how-to-read-heritage-sites-in-china/yinxu-world-heritage-marker-1400.webp",
      alt: "刻有殷墟名称的世界文化遗产标志碑",
      width: 1400,
      height: 900,
      caption:
        "殷墟世界遗产标志，xiquinhosilva摄于2019年9月15日；由CC BY 2.0原图裁切和缩放。它可以确认照片所在遗产地的身份，不能证明任何考古层的年代。",
    },
    {
      id: "yinxu-p2",
      type: "paragraph",
      text:
        "现场至少要区分三种观看方式。露出的遗存让你看到原址材料，但只有说明牌才能告诉你遗迹性质和保护处理。回填后的遗存把考古证据保存在地下；绿篱或轮廓线可以表达平面，却不是商代原构。博物馆里的文物可能是真品，也有明确出土位置，但已经离开发现点。阅读标签时，留意出土地点、文物编号、原件或复制品标注，以及尚未确定的解释。不要把每个凹坑都叫墓葬，也不要把每条地面线都当宫殿原基。",
    },
    {
      id: "yinxu-museum-figure",
      type: "figure",
      src: "/images/guides/how-to-read-heritage-sites-in-china/yinxu-museum-1200.webp",
      alt: "殷墟博物馆深绿色现代外墙与前方水池",
      width: 1200,
      height: 900,
      caption:
        "殷墟博物馆，유신예摄于2024年11月24日；由CC BY-SA 4.0原图裁切和缩放。现代博物馆是保护与阐释设施，不是商代宫殿的重建。",
    },
    {
      id: "yinxu-field",
      type: "callout",
      title: "殷墟现场动作",
      body:
        "每到一处写三行：眼前可见的表面、被保护的证据、现场采用的解释方式。如果遗迹已经回填，不要把“看不见”当成失败；应确认平面图、说明牌、文物出土信息或博物馆单元，能否把地下遗存重新接回都城整体。",
      tone: "decision",
    },
    {
      id: "jiankou-heading",
      type: "heading",
      level: 2,
      text: "在箭扣，修缮是一连串有记录的选择",
    },
    {
      id: "jiankou-p1",
      type: "paragraph",
      text:
        "箭扣长城适合用来理解修缮，因为官方记录呈现的是不断调整的保护决策，而不是一套永远不变的公式。系统性修缮始于2016年。前几期从抢险加固逐步转向更少使用新材料，也更谨慎地清理植被。北京市政府2025年的资料称，五期工程从牛犄角边至正北楼，长约915米，涉及6座敌楼和5段墙体；考古与修缮同步进行，持续数字化记录，旧砖经清理后重复利用，并在需要时补入相容材料。这些信息都不能推出“每块砖都是旧砖”。",
    },
    {
      id: "jiankou-figure",
      type: "figure",
      src: "/images/guides/how-to-read-heritage-sites-in-china/jiankou-before-phase-five-1400.webp",
      alt: "2017年箭扣长城植被间受损的敌楼和向下延伸的墙体",
      width: 1400,
      height: 1050,
      caption:
        "箭扣长城，Sindarus摄于2017年10月4日；由CC BY-SA 4.0原图缩放。拍摄时间早于五期工程，只提供地点环境，不能据此识别117—122号敌楼，也不能证明后来工程使用了哪些材料。",
    },
    {
      id: "jiankou-p2",
      type: "paragraph",
      text:
        "“最小干预”不是保证什么都不做。在长城上，它可能意味着稳固危险坍塌、恢复排水、保留不平整表面、只清出维护所需宽度，并在技术条件允许时重复利用可用旧料。传统工艺有助于相容修缮和知识延续，但不是让新构件回到古代的“时间机器”。最有力的是证据链：病害记录、考古发现、批准的处理方案、材料记录和完工文件。一张表面整齐的修后照片，本身几乎不能说明真实性。",
    },
    {
      id: "jiankou-field",
      type: "callout",
      title: "箭扣现场动作",
      body:
        "不要进入施工区检查砌体。应在获准展示或正式工程资料中寻找期数、敌楼编号、项目日期和管理机构。问清修的是什么问题——坍塌、排水、墙体不稳还是维护通道——而不是只问修后是否“够野”。",
      tone: "decision",
    },
    {
      id: "jiankou-warning",
      type: "callout",
      title: "当前状态核对：2026年8月14日",
      body:
        "怀柔区政府2026年4月27日发布的资料称，一至四期已经完成，五期仍在施工，计划于2026年底完工，六期方案设计已经启动。截至本次核对日期，没有找到五期正式完工验收通知。工程状态不等于游客开放状态：普通游览应选择官方开放的长城段；本文把箭扣作为保护案例，不把它推荐成徒步路线。",
      tone: "warning",
    },
    {
      id: "yong-heading",
      type: "heading",
      level: 2,
      text: "在永定门，一座重建建筑也会形成自己的修缮史",
    },
    {
      id: "yong-p1",
      type: "paragraph",
      text:
        "北京中轴线南端的历史永定门建筑群在20世纪50年代被拆除；UNESCO和ICOMOS资料通常以1957年作为城门拆除年份。今天的城楼是21世纪重建，依据包括历史测绘、照片、考古工作和传统营造资料。不同工程年份描述的是不同节点，不必强行选一个：重建工程在2004年展开，2005年10月完工，之后还有行政验收记录。现在可见的上部城楼，不是1553年留存至今的建筑。",
    },
    {
      id: "yong-figure",
      type: "figure",
      src: "/images/guides/how-to-read-heritage-sites-in-china/yongdingmen-reconstruction-2024-1400.webp",
      alt: "2024年10月蓝天下正面所见的重建永定门城楼",
      width: 1400,
      height: 788,
      caption:
        "21世纪重建的永定门城楼，xiquinhosilva摄于2024年10月11日；由CC BY 4.0原图裁切和缩放。照片早于2026年系统修缮，也不展示古代城楼原构；远处人物只是环境元素，无法识别身份。",
    },
    {
      id: "yong-p2",
      type: "paragraph",
      text:
        "永定门也说明，“重建”不是建筑履历的终点。东城区2026年3月称，2005年完成的重建城楼因构件开裂、屋面渗漏和电气系统老化，开始重建后的首次系统性修缮，工程涉及屋面、木结构、墙体、油饰、消防和监测。7月的官方报道仍称其为修缮施工现场；截至8月14日没有找到完工通知。这是在保护一座现代重建建筑，不能写成“修缮明代原城楼”。",
    },
    {
      id: "yong-field",
      type: "callout",
      title: "永定门现场动作",
      body:
        "做一张四日期卡：历史建造、拆除、重建、最近一次修缮。再分开判断价值：城楼形制、中轴线南端位置、档案依据和重新形成的城市标志都可能有意义，但它的材料年代仍是现代。北京文物资料还明确区分了首都博物馆收藏的原石匾，与城楼上安装的复制匾。",
      tone: "decision",
    },
    {
      id: "wh-heading",
      type: "heading",
      level: 2,
      text: "世界遗产标签对应的是特定遗产及其价值，不是一切可见构件",
    },
    {
      id: "wh-p1",
      type: "paragraph",
      text:
        "北京中轴线在2024年以建筑群整体列入世界遗产。世界遗产委员会的决定，从中轴线的延续性、位置、格局、城市特征、营造技术和持续功能等方面判断真实性，同时承认其中部分要素经历了拆除、重建和改造。ICOMOS对永定门单一构成要素的判断更严格：它认为2005年重建不符合《操作指南》第86段所说的特殊情况，因此该构成要素的真实性受损，但仍接受申报遗产整体的真实性。两种判断并不矛盾，因为评价尺度不同。",
    },
    {
      id: "wh-table",
      type: "table",
      caption: "没有证据时，不要把一个尺度的结论移到另一个尺度",
      columns: ["判断尺度", "可以确认什么", "不能自动确认什么"],
      rows: [
        [
          "世界遗产整体",
          "得到承认的突出普遍价值、范围、属性，以及整体完整性与真实性评估。",
          "范围内每座建筑和游客设施的年代或材料身份。",
        ],
        [
          "具名构成要素",
          "有自身记录的城门、墓葬、某段城墙或博物馆文物。",
          "相邻构件或整个遗产地的状态。",
        ],
        [
          "单件材料或表面",
          "只有测绘、标签或材料记录指向它时，才能确认年代、来源或干预。",
          "只凭颜色、磨损、工艺样式或所处位置推断朝代。",
        ],
      ],
    },
    {
      id: "scenario-heading",
      type: "heading",
      level: 2,
      text: "现场信息不清楚时，选择正确的恢复动作",
    },
    {
      id: "scenario-table",
      type: "table",
      caption: "现场失败与恢复",
      columns: ["遇到的问题", "恢复方法", "可以安全得出的结论"],
      rows: [
        [
          "考古遗迹已经回填，现场看不见。",
          "寻找发掘平面、地表展示图例和文物出土信息；确认地下保护的是哪一层。",
          "没有露出砌体可能是保护决定，不代表没有证据。",
        ],
        [
          "说明只写“恢复历史原貌”。",
          "继续找目标年代、设计依据、保留构件与完工报告。",
          "这句话本身不能区分局部复原、重建或现代仿古。",
        ],
        [
          "新旧砌体看不出边界。",
          "查构件图、材料清单或管理方说明；绝不只按颜色分类。",
          "证据未指出前，记录为“材料边界未确认”。",
        ],
        [
          "著名地点正在修缮或关闭。",
          "查看管理方通知，改用博物馆或阐释设施；不要越过围挡找证据。",
          "施工中不等于已完工、已验收或默认开放。",
        ],
        [
          "复制品、数字模型或主题街看起来很有说服力。",
          "查制作方、制作时间、证据基础和用途，再单独与原始记录比较。",
          "它可以解释一种复原方案，却不会因此成为已经消失的原物。",
        ],
      ],
    },
    {
      id: "scenario-recovery",
      type: "callout",
      title: "两个旅客情境",
      body:
        "如果你在殷墟只有一小时逛博物馆，应优先阅读把出土地点、原件身份和受保护遗址联系起来的标签，而不是寻找一幅完整宫殿图景。如果你拿八达岭现场与一张箭扣照片比较，不要按墙面平整或残破程度给真实性排序；应比较有名称的干预工程与开放状态，实际步行选择官方开放段，箭扣只作为保护背景阅读。",
      tone: "decision",
    },
    {
      id: "photo-heading",
      type: "heading",
      level: 2,
      text: "离开现场前，留下一份可复核的证据笔记",
    },
    {
      id: "photo-list",
      type: "list",
      ordered: true,
      items: [
        "拍全场所名、构件名、发布机构，以及修订日期或工程日期。",
        "记录拍摄日期和视角；注明施工、脚手架或临时关闭是否改变了画面。",
        "把材料身份标签与依据分开记录，不让照片证明超过它实际呈现的内容。",
        "博物馆文物应记录编号、出土地点、原件或复制品标签，以及当前是否展出。",
        "重建或迁建对象应同时记录原物损失或旧址、新工程或新址；如有资料，再记保留与替换构件。",
        "分享人物、仪式、室内、地图或工程文件前，分别核查版权、场馆规定和参与者同意。",
      ],
    },
    {
      id: "dynamic",
      type: "callout",
      title: "动态事实核对：2026年8月14日",
      body:
        "官方资料在2026年4月仍将箭扣五期描述为施工中，并计划年底完工；永定门2026年修缮在7月的报道中仍是施工现场。截至本次核对，没有找到更新的正式完工通知。开放区域、脚手架、博物馆展品和摄影规则都可能变化，出发前应向具名管理机构复核。",
      tone: "warning",
    },
    {
      id: "evidence",
      type: "callout",
      title: "本文怎样区分事实与编辑方法",
      body:
        "文件身份、世界遗产评估和三处案例史来自UNESCO、ICOMOS以及中国政府或文物机构记录。七类标签、四问现场测试、旅客情境和证据笔记流程，是Homeground的编辑工具。图片说明只确认具体对象和拍摄日期，刻意不从外观推断材料年代。",
      tone: "neutral",
    },
    {
      id: "links",
      type: "internal-links",
      title: "继续使用地点专属的阅读方法",
      items: [
        {
          label: "读懂中国城墙的城门、防御和城市秩序",
          href: "/zh/guides/chinese-city-walls-gates-and-urban-order/",
          description: "从材料身份继续观察城墙、城门和街道组成的城市系统。",
        },
        {
          label: "怎样参观考古遗址博物馆",
          href: "/zh/guides/how-to-visit-an-archaeological-site-museum/",
          description: "把原址遗存、出土位置、展出文物和保护决定重新连接起来。",
        },
        {
          label: "当地铁施工遇到考古发现",
          href: "/zh/guides/when-metro-construction-meets-archaeology/",
          description: "理解发现、保护、发掘、设计响应和公共展示，不假定所有发现都会长期露天可见。",
        },
      ],
    },
    {
      id: "consultation",
      type: "callout",
      title: "想安排一条不混淆证据层的遗产路线？",
      body:
        "告诉Homeground你正在考虑哪些遗产地，以及你更关心考古、建筑还是保护实践。真人规划师可以把当前开放状态与合适的博物馆或阐释点连接起来，同时不会把重建材料误写成古代原构。",
      tone: "neutral",
    },
    {
      id: "sources",
      type: "sources",
      title: "已核对的官方、遗产与图片来源",
      items: [
        {
          label: "《奈良真实性文件》— WHC-94/CONF.003/INF.008",
          url: "https://whc.unesco.org/archive/nara94.htm",
          publisher: "UNESCO世界遗产中心",
          reviewedAt: "2026-08-14",
        },
        {
          label: "UNESCO目录记录116018 —《奈良真实性文件》",
          url: "https://whc.unesco.org/en/documents/116018",
          publisher: "UNESCO世界遗产中心",
          reviewedAt: "2026-08-14",
        },
        {
          label: "2025年《操作指南》第79—86段及附件4",
          url: "https://whc.unesco.org/document/222376",
          publisher: "UNESCO世界遗产中心",
          reviewedAt: "2026-08-14",
        },
        {
          label: "殷墟—突出普遍价值与真实性说明",
          url: "https://whc.unesco.org/en/list/1114",
          publisher: "UNESCO世界遗产中心",
          reviewedAt: "2026-08-14",
        },
        {
          label: "箭扣五期考古与保护，2024年",
          url: "https://www.beijing.gov.cn/ywdt/gqrd/202410/t20241016_3921803.html",
          publisher: "北京市人民政府",
          reviewedAt: "2026-08-14",
        },
        {
          label: "箭扣五期工程范围与方法，2025年",
          url: "https://www.beijing.gov.cn/ywdt/gzdt/202505/t20250514_4088536.html",
          publisher: "北京市人民政府",
          reviewedAt: "2026-08-14",
        },
        {
          label: "箭扣工程当前状态，2026年4月27日",
          url: "https://www.bjhr.gov.cn/ywdt/rdgz/202604/t20260427_4615576.html",
          publisher: "北京市怀柔区人民政府",
          reviewedAt: "2026-08-14",
        },
        {
          label: "ICOMOS对北京中轴线的评估",
          url: "https://whc.unesco.org/document/208501",
          publisher: "ICOMOS／UNESCO世界遗产中心",
          reviewedAt: "2026-08-14",
        },
        {
          label: "第46 COM 8B.15号决定—北京中轴线",
          url: "https://whc.unesco.org/en/decisions/8607",
          publisher: "世界遗产委员会",
          reviewedAt: "2026-08-14",
        },
        {
          label: "永定门拆除、重建与匾额记录",
          url: "https://wwj.beijing.gov.cn/bjww/362760/362767/bjzzxwhycccycxds/dsxw/11156748/",
          publisher: "北京市文物局",
          reviewedAt: "2026-08-14",
        },
        {
          label: "永定门重建后首次系统性修缮",
          url: "https://www.bjdch.gov.cn/ywdt/dcyw/202603/t20260320_4562576.html",
          publisher: "北京市东城区人民政府",
          reviewedAt: "2026-08-14",
        },
        {
          label: "永定门修缮施工状态，2026年7月10日",
          url: "https://www.bjdch.gov.cn/ywdt/dcyw/202607/t20260710_4756233.html",
          publisher: "北京市东城区人民政府",
          reviewedAt: "2026-08-14",
        },
        {
          label: "图片：殷墟王陵M1400号大墓",
          url: "https://commons.wikimedia.org/wiki/File:Yinxu_-_%E6%AE%B7%E5%A2%9F_(5067245178).jpg",
          publisher: "Wikimedia Commons — tak.wing，CC BY-SA 2.0",
          reviewedAt: "2026-08-14",
        },
        {
          label: "图片：殷墟世界遗产标志",
          url: "https://commons.wikimedia.org/wiki/File:Yinxu_Royal_Tombs_(53565240593).jpg",
          publisher: "Wikimedia Commons — xiquinhosilva，CC BY 2.0",
          reviewedAt: "2026-08-14",
        },
        {
          label: "图片：殷墟博物馆",
          url: "https://commons.wikimedia.org/wiki/File:Yin_Xu_Museum.jpg",
          publisher: "Wikimedia Commons — 유신예，CC BY-SA 4.0",
          reviewedAt: "2026-08-14",
        },
        {
          label: "图片：2017年箭扣长城",
          url: "https://commons.wikimedia.org/wiki/File:Tower_and_path_in_disrepair_-_Great_Wall_of_China_at_Jiankou.jpg",
          publisher: "Wikimedia Commons — Sindarus，CC BY-SA 4.0",
          reviewedAt: "2026-08-14",
        },
        {
          label: "图片：2024年永定门",
          url: "https://commons.wikimedia.org/wiki/File:%E6%B0%B8%E5%AE%9A%E9%97%A8_2024-10-11.jpg",
          publisher: "Wikimedia Commons — xiquinhosilva，CC BY 4.0",
          reviewedAt: "2026-08-14",
        },
      ],
    },
  ],
} as const satisfies StructuredPageBody;

export default body;
