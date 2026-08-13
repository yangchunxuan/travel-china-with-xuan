import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "answer-first",
      type: "lead",
      text:
        "如果你想把《清明上河图》转化成可步行、可观看表演的空间体验，清明上河园（Qingming Riverside Landscape Garden，也称 Millennium City Park 或 Qingming Shanghe Garden）的门票就有价值；但它不是保存至今的北宋开封城。画卷记录经过选择的交通与商业活动，现代园区把图像母题变成娱乐空间，州桥则在原有城市交叉点提供物质证据。三者可以合读，却不能彼此代为证明。本文提供一条3—4小时园区路线、物证优先的替代选择，以及演出或考古参观条件变化时的恢复方案。",
    },
    {
      id: "names-heading",
      type: "heading",
      level: 2,
      text: "Millennium City Park 就是画卷中的宋代城市吗？",
    },
    {
      id: "names-paragraph",
      type: "paragraph",
      text:
        "不是。以上三个英文名指向开封同一景点，中文称“清明上河园”。它于1998年开放，是受张择端《清明上河图》（Along the River During the Qingming Festival）启发而建的现代主题公园。园内建筑并非完整保存下来的北宋街区，画卷也不是施工图。园区的价值在别处：只要把它当作阐释而非出土或留存的原物，河道、桥梁、城门和街市就获得了可步行感受的尺度。",
    },
    {
      id: "evidence-layers",
      type: "table",
      caption: "在开封参观时必须分开的四层证据",
      columns: ["层次", "可以确立什么", "不能确立什么"],
      rows: [
        [
          "历史与考古",
          "州桥的原始位置、材料、营建阶段和地下城市关系。",
          "完整街景或所有已消失建筑。",
        ],
        [
          "作为艺术品的画卷",
          "张择端在长卷中选择并组织的内容。",
          "地块测绘或每座建筑无争议的坐标。",
        ],
        [
          "现代旅游呈现",
          "园区如何把母题转化为空间、演出与服务。",
          "主题建筑就是原物或经过认证的一比一复原。",
        ],
        [
          "Homeground 规划判断",
          "哪种顺序能回答你的问题，以及条件变化时怎样恢复。",
          "新的历史事实或保证开放。",
        ],
      ],
    },
    {
      id: "short-answer",
      type: "callout",
      title: "直接答案",
      body:
        "想要空间化故事、表演和适合家庭的阐释，可以选清明上河园；更在意原始位置、历史层位和文物，就选择已确认可参观的州桥或开封博物馆。时间足够时，让园区先提出问题，再用物质证据限制历史判断。",
      tone: "decision",
    },
    {
      id: "scroll-heading",
      type: "heading",
      level: 2,
      text: "《清明上河图》究竟能证明什么？",
    },
    {
      id: "scroll-object",
      type: "paragraph",
      text:
        "故宫博物院将其定为北宋张择端所作绢本长卷，纵24.8厘米、横528厘米。官方介绍依次经过郊野、汴河与虹桥，再进入城门和街市。船工、脚夫、车马、牲畜与店面记录的是画家选择呈现的内容。但长卷没有单一固定视点，而是带领目光经过连续、压缩的场景。故宫学者余辉称其反映“真实情况”而不是一个“实景”；这是具名阐释，不等于可以把每个细节都斥为想象。",
    },
    {
      id: "scroll-observation",
      type: "list",
      items: [
        "按城外、河道与桥、城门和密集街市的顺序看，比寻找一个现代地址更有用。",
        "在画中虹桥留意放倒的桅杆、桥上人群和上下交通：这是一套城市系统，不只是桥梁肖像。",
        "职业、车辆和店招是经过选择的图像细节，不能证明园内每件服装或店面都准确。",
        "原作为故宫博物院馆藏，但不保证你的旅行日期展出；园内浮雕是现代复制品。",
      ],
    },
    {
      id: "park-relief-figure",
      type: "figure",
      src: "/images/guides/kaifeng-song-dynasty-urban-landscape/park-scroll-relief-1280.webp",
      alt: "清明上河园内的现代浮雕，表现画中虹桥周围拥挤的场面。",
      width: 1280,
      height: 853,
      caption:
        "这幅园内浮雕放大了画卷中的桥梁场面，便于公众观看。它可以帮助定位画面，却不是北宋文物，也不是故宫收藏的原作。",
    },
    {
      id: "scroll-boundary",
      type: "callout",
      title: "不要把长卷当成地籍图",
      body:
        "研究者仍在讨论画卷的地理位置、季节和目的。稳妥的结论更窄：具体的城市观察经过了艺术安排。画卷可以引出交通与贸易问题，却不能单独授权逐栋复原开封。",
      tone: "warning",
    },
    {
      id: "bridges-heading",
      type: "heading",
      level: 2,
      text: "为什么画中虹桥、园内虹桥和州桥是三座不同的桥？",
    },
    {
      id: "bridges-table",
      type: "table",
      caption: "三座桥，三种证据",
      columns: ["桥", "它是什么", "应该问什么"],
      rows: [
        [
          "画中的虹桥",
          "张择端构图中心的木拱桥；故宫资料又称“上土桥”。",
          "船只、放倒的桅杆和人群如何组织？",
        ],
        [
          "园内的虹桥",
          "把画中母题变成游客路线的现代桥梁。",
          "它怎样承载今天的游客并把场面变成三维空间？",
        ],
        [
          "州桥",
          "御街—汴河交会处的考古桥址，在今中山路—自由路交叉口以南。",
          "哪些材料与层位属于哪个时期？",
        ],
      ],
    },
    {
      id: "modern-hongqiao-figure",
      type: "figure",
      src: "/images/guides/kaifeng-song-dynasty-urban-landscape/modern-hongqiao-1280.webp",
      alt: "清明上河园内横跨水道的现代红色虹桥。",
      width: 1280,
      height: 853,
      caption:
        "园内虹桥是现代游客设施。可以比较它如何让人跨越水面，但不要把它标成保存至今的北宋桥梁或州桥。Photo: Windmemories / Wikimedia Commons, CC BY-SA 4.0; resized.",
    },
    {
      id: "bridge-reading",
      type: "paragraph",
      text:
        "两套机构资料确立了区别：故宫把画中桥称为虹桥或上土桥，河南考古机构则把州桥定位在御街交叉点；园区又增加了第三座现代虹桥。这是根据官方证据作出的编辑推论，不表示围绕画卷地理位置的所有争议都已解决。",
    },
    {
      id: "zhouqiao-heading",
      type: "heading",
      level: 2,
      text: "州桥考古提供了哪些园区无法提供的证据？",
    },
    {
      id: "zhouqiao-evidence",
      type: "paragraph",
      text:
        "州桥提供原始城市坐标与地层。考古机构记录了御街—汴河交会处的一座桥，它跨朝代使用或重建，1642年被洪水泥沙掩埋。2018年以来的发掘揭示了河道、桥梁和河岸遗存。研究院推测北宋州桥为柱梁式平桥，桥体已经不存；发掘主体拱桥属于明代早期，建在宋代基础上。北宋石岸雕有波涛间神兽海马、仙鹤与祥云。应问“这是哪一层？”，而不是把所有遗存统称为完整宋桥。",
    },
    {
      id: "zhouqiao-observation",
      type: "list",
      items: [
        "定位南北向御街与东西向汴河的交会；城市位置比它像不像画中虹桥更重要。",
        "从标牌核对年代与材料：宋代基础上的明代拱桥，与宋代河岸相关但不同。",
        "寻找河宽、河岸和洪水沉积说明：考古通过地层复原变化。",
        "若能看到石刻，确认它是原件、移置品还是复制品，以及保护是否限制距离。",
      ],
    },
    {
      id: "zhouqiao-figure",
      type: "figure",
      src: "/images/guides/kaifeng-song-dynasty-urban-landscape/zhouqiao-excavation-1400.webp",
      alt: "保护棚内露出的开封州桥砖石桥体、河壁和地层堆积。",
      width: 1400,
      height: 1050,
      caption:
        "裸露的桥体、河壁与叠压地层属于考古证据。可见桥体是建在宋代基础上的明代早期结构，并非已经消失的北宋原桥；它既不能确定画中虹桥的位置，也不能为园内虹桥的准确性背书。2025年的照片同样不能证明当前开放。照片：Yumeto / Wikimedia Commons，CC BY-SA 4.0；缩放并转为WebP，衍生图继续采用CC BY-SA 4.0。",
    },
    {
      id: "zhouqiao-dynamic",
      type: "callout",
      title: "不要假定州桥考古区一定开放",
      body:
        "考古报告足以确立州桥的重要性，却不能闭合2026年普通游客入场、预约、票务和外国护照处理的信息链。请向运营或保护单位确认。若不能进入，留在合法公共空间，并以开封博物馆补充更广的物质史；绝不要跨越围挡。",
      tone: "warning",
    },
    {
      id: "park-heading",
      type: "heading",
      level: 2,
      text: "现代清明上河园实际建造了什么？",
    },
    {
      id: "park-history",
      type: "paragraph",
      text:
        "龙亭区政府记录显示，园区于1998年开放，2005年二期把街市图景延伸到内城与皇家园林主题，2023年三期又加入当代游乐设施。这段历史说明，园区并非一次性按画卷完整复制出来的空间。政府和运营方有时使用“1:1复原”，但这是项目定位语言，不是对每处平面、材料或立面都与画卷一致的考古认证。",
    },
    {
      id: "park-growth",
      type: "list",
      items: [
        "画卷衍生层：浮雕、名为虹桥的桥，以及可从画中识别的母题。",
        "更宽泛的宋城主题：城门、街道和殿堂构成超出一幅长卷的连续空间。",
        "皇家与娱乐主题：后期加入宫苑意象、游乐设施与夜间产品——是合理的主题公园内容，不是古代原物。",
        "运营层：商店、舞台和服务路线回应今天的安全与容量，不是历史证据。",
      ],
    },
    {
      id: "linshui-figure",
      type: "figure",
      src: "/images/guides/kaifeng-song-dynasty-urban-landscape/linshui-hall-1280.webp",
      alt: "清明上河园内现代临水大殿建筑群的正立面与成组殿宇。",
      width: 1280,
      height: 960,
      caption:
        "临水大殿属于园区扩展后的主题景观。它可以帮助你观察景区如何超出画卷继续创作，却不能被说成保存至今的宋代建筑或画中某座建筑的精确对应物。Photo: Yumeto / Wikimedia Commons, CC BY-SA 4.0.",
    },
    {
      id: "park-onsite-heading",
      type: "heading",
      level: 2,
      text: "现场怎样阅读园区，而不是追完每一个项目？",
    },
    {
      id: "park-route-intro",
      type: "paragraph",
      text:
        "即使节目安排改变，也沿用一条证据路线：浮雕、现代虹桥、城门与街道，最后是扩展的宫苑式景观。它从二维艺术品走向可步行阐释，再进入后期添加。每一站都问：依据是画卷、其他资料、现代设计还是运营？只有建筑名称，不等于有复原证据。",
    },
    {
      id: "relief-stop-heading",
      type: "heading",
      level: 3,
      text: "第1站：把园内浮雕当作视觉索引",
    },
    {
      id: "relief-stop",
      type: "paragraph",
      text:
        "用15—20分钟找出郊野、河道、城市和中心桥梁。一幅适合近距离展读的长卷变成公共浮雕，更方便多人同看，次序、表面与观看方式却都改变了。选两个细节，例如放倒的桅杆与桥上人群，留到后面追踪。绝不要把浮雕标成故宫原作。",
    },
    {
      id: "bridge-stop-heading",
      type: "heading",
      level: 3,
      text: "第2站：在现代虹桥比较人和船怎样移动",
    },
    {
      id: "bridge-stop",
      type: "paragraph",
      text:
        "为虹桥留25—35分钟。观察游客怎样通过和停留，再看水面。画卷把险些相撞的船、放倒的桅杆与围观者压缩成节点；现代桥梁则须管理安全通行。比较两者怎样组织流动，不要用相似轮廓证明结构准确。拥堵时不停留地通过，改从允许停留的岸边看。",
    },
    {
      id: "gate-stop-heading",
      type: "heading",
      level: 3,
      text: "第3站：让上善门检验你的标签",
    },
    {
      id: "gate-stop",
      type: "paragraph",
      text:
        "故宫资料称画中城门为“东角子门”，园区建筑则名为“上善门”。相似的河岸到城市功能不会让两者变成同一对象。阅读现场陈述的依据，再看立面与店铺怎样引导今天的人流。“宋式”可能只是风格参照，不等于留存宋代木构或考古复原。Homeground 的木构指南可帮助你问结构问题，而不是凭外观猜年代。",
    },
    {
      id: "shangshan-figure",
      type: "figure",
      src: "/images/guides/kaifeng-song-dynasty-urban-landscape/shangshan-gate-1280.webp",
      alt: "清明上河园内的现代上善门及游客通行路线。",
      width: 1280,
      height: 853,
      caption:
        "上善门帮助园区营造进入主题城市的空间转换。不要把它改称画中的东角子门，也不要把它介绍为保存至今的北宋城门。Photo: Windmemories / Wikimedia Commons, CC BY-SA 4.0; resized.",
    },
    {
      id: "extension-stop-heading",
      type: "heading",
      level: 3,
      text: "第4站：认出园区有意超出画卷的地方",
    },
    {
      id: "extension-stop",
      type: "paragraph",
      text:
        "只有当后期宫苑式或娱乐区域吸引你时，才在这里花约30分钟。殿堂、园林和游乐设施把内容扩展为更宽泛的“宋都”故事。不要再为每栋建筑寻找画中对应；改看标牌引用什么来源，哪些设计服务于当代观演与通行。只关注画卷的人可在城门与街道后折返。",
    },
    {
      id: "performance-heading",
      type: "heading",
      level: 2,
      text: "园区演出可以教会你什么，又永远不能证明什么？",
    },
    {
      id: "performance-paragraph",
      type: "paragraph",
      text:
        "演出能让冲突、服装和动作更易记住，也显露园区的内容重点。现行节目混合历史人物场景、杂技、武侠、科技型娱乐、游乐项目和夜间产品：这是当代娱乐系统，不是北宋生活录像。选一个感兴趣的形式即可，并追问哪些内容为现代观众改编或创作、官方介绍是否说明来源。",
    },
    {
      id: "performance-check",
      type: "list",
      items: [
        "查看运营方当前节目页，不要采用旧博客时间表。",
        "当天确认演出场地，以及所购票种是否包含该节目；我们未核实一条适用于2026年所有票种的统一规则。",
        "除非说明牌提供证据，否则把服装和情节视为舞台阐释。",
        "遵守摄影标识；公开演出不自动授予特写的发表权。",
      ],
    },
    {
      id: "performance-dynamic",
      type: "callout",
      title: "设计一条演出取消后仍然成立的路线",
      body:
        "运营方提示，天气或其他情况可能调整或取消演出。选定节目若消失，继续“浮雕—虹桥—城门—扩展景观”；空间比较不需要演员或固定时间。",
      tone: "warning",
    },
    {
      id: "decision-heading",
      type: "heading",
      level: 2,
      text: "怎样组成一次3—4小时参观，门票又是否适合你？",
    },
    {
      id: "sequence",
      type: "list",
      ordered: true,
      items: [
        "定位，15—20分钟：找出画卷次序，并选两个细节追踪。",
        "虹桥，25—35分钟：比较桥面与水面移动；若停留妨碍他人，就从岸边看。",
        "城门与街道，40—50分钟：检验名称，把主题商业与关于原有建筑遗存的主张分开。",
        "一个弹性演出时段：当天确认时长、场地与票种包含关系；如有变化就跳过。",
        "扩展区域，约30分钟：辨认园区从哪里超出画卷；疲劳时首先缩短这一段。",
        "机动时间，30—45分钟：应对排队、天气与休息。只有真正想看现行夜间产品时才留到晚上。",
      ],
    },
    {
      id: "visitor-scenarios",
      type: "comparison",
      title: "按你想让这个地方回答的问题来选择",
      columns: [
        {
          heading: "园区优先型旅客",
          items: [
            "你想要可步行的入门体验，或带着孩子旅行。",
            "你喜欢舞台互动，但能把氛围与证据分开。",
            "先走园区路线，再用博物馆或已确认开放的州桥作物证纠偏。",
          ],
        },
        {
          heading: "物证优先型旅客",
          items: [
            "你主要想看原始位置、文物、营建阶段或地层。",
            "主题建筑和高音量演出会降低你的兴趣。",
            "核实州桥或从开封博物馆开始；跳过园区不等于跳过全部宋代历史。",
          ],
        },
        {
          heading: "时间有限型旅客",
          items: [
            "只选一个：园区负责阐释；已确认开放的州桥或博物馆负责证据。",
            "不要为全部完成而在三者之间赶路。",
            "开放不确定时，把重新核对预约与展览的博物馆作为恢复候选。",
          ],
        },
      ],
    },
    {
      id: "ticket-decision",
      type: "callout",
      title: "什么情况下园区门票价值明确",
      body:
        "园区适合想看画卷大尺度转译、需要家庭友好空间或喜欢演出的游客；只寻找宋代原物，或排斥主题公园声响与互动的人则不太合适。可访问的2026年官方资料未能闭合当前价格、护照处理、包含项目或日夜产品关系；付款前请核对运营方当前销售渠道。",
      tone: "decision",
    },
    {
      id: "mistakes-heading",
      type: "heading",
      level: 2,
      text: "这次参观中哪些结论绝不能想当然？",
    },
    {
      id: "mistakes",
      type: "list",
      items: [
        "园内建筑不是在原址保存至今的北宋原物。",
        "画卷不能逐栋对应今天的园区。",
        "画中虹桥、园内现代虹桥和州桥是三座桥。",
        "建在宋代基础上的明代早期拱桥不是完整宋桥；推测的宋代桥体已不存。",
        "演出不是北宋生活的直接证据。",
        "不要期待在开封看到原作，也不要假定故宫当前正在展出它。",
      ],
    },
    {
      id: "photography-rights",
      type: "paragraph",
      text:
        "允许拍摄与允许发表是两回事。遵守现行标识，并在把可识别的演员或儿童作为主要拍摄对象前取得同意。本文未复制故宫原画，因为网页图片不自动获得发表授权。为自己的照片准确记录日期和地点，绝不要把园内浮雕、复制品或后建桥梁标成原件。",
    },
    {
      id: "recovery-heading",
      type: "heading",
      level: 2,
      text: "如果演出取消、州桥不能参观或时间被压缩，怎么办？",
    },
    {
      id: "recovery-table",
      type: "table",
      caption: "仍能保住核心任务的失败恢复选择",
      columns: ["变化", "恢复方案", "不要声称什么"],
      rows: [
        [
          "原定演出改期或取消",
          "完成浮雕、虹桥、城门街道和扩展路线；只有另一场有用时才替换。",
          "少一场节目不等于园区失去阐释价值。",
        ],
        [
          "州桥不向普通游客开放",
          "留在围挡外，利用合法城市环境，并在重新核查后以开封博物馆补充历史。",
          "园区不能替代考古；也不保证某个博物馆展厅开放。",
        ],
        [
          "园内虹桥拥挤",
          "不停留地通过，从允许的岸边观察；通行缓和后再返回。",
          "不要堵桥或攀爬拍照。",
        ],
        [
          "不到两小时",
          "只走“浮雕—虹桥—城门”，或只去一个已确认的物证地点。",
          "不要在无关证据类型之间赶路。",
        ],
        [
          "雨天或高温降低体力",
          "优先看浮雕与桥，在允许的空间休息，并缩短后段区域。",
          "以当天运营与节目公告为准。",
        ],
      ],
    },
    {
      id: "final-checklist",
      type: "list",
      items: [
        "付款前：确认官方票种、护照处理、包含项目和另售夜间项目。",
        "确定州桥前：确认普通游客准入、预约、可见范围和证件。",
        "出发前：复核当天节目和天气变化，并保存无演出路线。",
        "面对每个对象：说明它属于考古、艺术、旅游呈现还是规划判断。",
        "分享前：核对图像对象、日期、地点和许可。",
      ],
    },
    {
      id: "consultation",
      type: "callout",
      title: "想把这次证据优先的参观放入更长的中国行程？",
      body:
        "Homeground 可以根据你的兴趣、节奏与限制，判断开封的主题园、考古遗址和博物馆是否适合路线，并在临近出发时复核动态衔接，而不是套用预选产品。",
      tone: "neutral",
    },
    {
      id: "internal-links",
      type: "internal-links",
      title: "继续使用 Homeground 规划",
      items: [
        {
          label: "读懂中国城墙、城门与城市秩序",
          href: "/zh/guides/chinese-city-walls-gates-and-urban-order/",
          description: "在另一类城市遗址中，继续把实物证据、重建与城市规划分层理解。",
        },
        {
          label: "学习观察斗拱与中国木构",
          href: "/zh/guides/dougong-and-chinese-timber-frame-reading/",
          description: "提出结构问题，而不是只凭建筑轮廓判断年代。",
        },
        {
          label: "从日常城市史理解大运河",
          href: "/zh/guides/grand-canal-everyday-urban-history/",
          description: "把水道与城市运行系统放在装饰性运河意象之前。",
        },
        {
          label: "核对中国公共假期旅行日历",
          href: "/zh/guides/china-public-holidays-travel-calendar/",
          description: "临近假期时重新核查客流压力与景点动态运营。",
        },
      ],
    },
    {
      id: "sources",
      type: "sources",
      title: "本指南核查的核心来源",
      items: [
        {
          label: "张择端《清明上河图》藏品记录",
          url: "https://www.dpm.org.cn/collection/paint/228226.html",
          publisher: "故宫博物院",
          reviewedAt: "2026-08-13",
        },
        {
          label: "故宫关于《清明上河图》解读的讲座",
          url: "https://www.dpm.org.cn/forum_detail/99722.html",
          publisher: "故宫博物院",
          reviewedAt: "2026-08-13",
        },
        {
          label: "《清明上河图》未决问题研究讨论",
          url: "https://www.dpm.org.cn/study_detail/100187.html",
          publisher: "故宫博物院",
          reviewedAt: "2026-08-13",
        },
        {
          label: "开封州桥考古项目概况",
          url: "https://www.hnswwkgyjy.cn/NewsView.php?News_ID=1985",
          publisher: "河南省文物考古研究院",
          reviewedAt: "2026-08-13",
        },
        {
          label: "2020年州桥考古发掘记录",
          url: "https://hnswwkgyjy.cn/NewsView.php?News_ID=2051",
          publisher: "河南省文物考古研究院",
          reviewedAt: "2026-08-13",
        },
        {
          label: "开封城市考古：进展与认识",
          url: "https://discovery.ucl.ac.uk/10183429/1/Manuscript_with_author_details_revised.pdf",
          publisher: "Archaeological Research in Asia / UCL Discovery",
          reviewedAt: "2026-08-13",
        },
        {
          label: "清明上河园建设发展概况",
          url: "https://www.longting.gov.cn/ltq/c00044/pc/content/content_2003660780649967616.html",
          publisher: "开封市龙亭区人民政府",
          reviewedAt: "2026-08-13",
        },
        {
          label: "园区现行建筑目录",
          url: "https://www.qmsyun.com/Mobile_page/q_building.php",
          publisher: "清明上河园",
          reviewedAt: "2026-08-13",
        },
        {
          label: "园区现行节目表与调整提示",
          url: "https://www.qmsyun.com/Mobile_page/o_program.php",
          publisher: "清明上河园",
          reviewedAt: "2026-08-13",
        },
        {
          label: "开封博物馆预约渠道说明",
          url: "https://www.kaifeng.gov.cn/kfsrmzfwz/whty/pc/content/content_1873557496836997120.html",
          publisher: "开封市人民政府 / 开封博物馆",
          reviewedAt: "2026-08-13",
        },
      ],
    },
  ],
};

export default body;
