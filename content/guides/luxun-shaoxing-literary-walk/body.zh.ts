import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead",
      type: "lead",
      text: "在绍兴读鲁迅，最有用的问题不是“这些是不是都来自同一本书”。周家新台门有鲁迅出生、成长的生活关系，三味书屋是有据可查的求学现场；周家老台门主要帮助你理解周氏家族和当时的社会空间。百草园是真实地点，但鲁迅后来把它写进回忆性散文，并不是在园中即时完成的一份植物清单。孔乙己则是小说人物，今天的咸亨酒店主要属于作品的后世接受和游客消费空间。按“家族—求学—居住—记忆中的园子—纪念馆—小说与商业”的顺序读，时间可长可短。截至2026年8月14日复核，仍没有足以证明所有旅客都能完成固定2—3小时动线的现行官方资料。"
    },
    {
      id: "direct-answer",
      type: "callout",
      title: "每进一道门，先贴对四种标签",
      body: "“在这里生活或求学”指有文献支持的生活现场；“在文字中回忆这里”指真实地点经过回忆散文重组；“在作品中创造这里”指文学人物或空间；“后来在这里呈现”指纪念馆、修复陈设、雕像、商店或旅游场景。同一院落可以同时存在多层，先读说明牌，再判断什么是原有材料。",
      tone: "decision"
    },
    {
      id: "layers-heading",
      type: "heading",
      level: 2,
      text: "哪些属于历史、回忆散文、小说或现代呈现？"
    },
    {
      id: "layers-table",
      type: "table",
      caption: "这条步行需要分开的四层证据",
      columns: ["层级", "可以支持什么", "不能据此推出什么"],
      rows: [
        ["历史", "鲁迅有据可查的居住与求学关系、受保护建筑、带日期的修缮与建馆史", "每件家具、每面墙和每个房间陈设都未经改变地留自童年"],
        ["文学", "回忆散文中的百草园—三味书屋结构；小说中的孔乙己与鲁镇", "即时日记、历史居民名册或可以逐街对应的地图"],
        ["旅游呈现", "展览、复原环境、孔乙己雕像、主题商店和今日咸亨参观场景", "晚清生活的直接实证或小说酒楼的原始面貌"],
        ["编辑判断", "Homeground建议的“生活—记忆—纪念馆—小说”阅读顺序", "景区官方单向动线或适合所有人的统一时长"]
      ]
    },
    {
      id: "layers-method",
      type: "paragraph",
      text: "这样分层，并不是要把一座城市简单分成“真的旧城”和“假的新景”。修复后的房间可以帮助理解空间尺度；新建纪念馆可能比旧卧室保存了更多文献；商业雕像也能说明虚构人物如何进入公共记忆。真正要问的是：谁在何时对哪一件材料作出什么判断。文保牌、修缮说明、馆方展签、文学文本和旅游宣传，各自只能承担不同重量的证据。"
    },
    {
      id: "sequence-heading",
      type: "heading",
      level: 2,
      text: "第一次来，怎样安排顺序最容易读懂？"
    },
    {
      id: "sequence-comparison",
      type: "comparison",
      title: "先完成核心现场，再决定要不要加入后世呈现",
      columns: [
        {
          heading: "生活证据核心",
          items: [
            "先看现行地图和入口告示。",
            "把老台门读成家族背景。",
            "用三味书屋理解求学经历。",
            "在新台门分清遗存与修复陈设。"
          ]
        },
        {
          heading: "记忆与纪念核心",
          items: [
            "把百草园读成真实地点与后来回忆。",
            "在纪念馆用年表、版本和文献物件补足生平。",
            "让当前说明牌，而不是记忆中的课本插图，识别现场细节。"
          ]
        },
        {
          heading: "可选的接受史结尾",
          items: [
            "看完生活现场后再走向咸亨。",
            "把孔乙己当作小说人物，而不是地方人物传记。",
            "把商店和雕像看成有年代的当代解释。",
            "拥挤或开放受限时可以跳过这一段。"
          ]
        }
      ]
    },
    {
      id: "sequence-note",
      type: "paragraph",
      text: "入口管控、施工或房间关闭，都可能改变实际行走顺序。此时保留“理解顺序”即可：即使工作人员先把你引向百草园，也要记住它是“地点＋回忆写作”；三味书屋开放后，再回到求学现场的证据。允许时拍下当天的场地图。运营方网页上旧有的一小时、两小时、三小时线路带有早年发布日期，不能当作2026年的即时通行承诺。"
    },
    {
      id: "old-taimen-heading",
      type: "heading",
      level: 2,
      text: "周家老台门说明什么，又不说明什么？"
    },
    {
      id: "old-taimen-text",
      type: "paragraph",
      text: "周家老台门最重要的功能，是补上周氏家族和社会环境。它提醒你：1881年出生、原名周树人的鲁迅，生活在一个更大的宗族与家庭世界里，并不是从一间孤立的“作家房间”里长出来的。这里必须守住一条边界：老台门是祖居，不能笼统写成鲁迅每一段个人童年和教育经历的发生地。先读入口身份、文保信息和房间用途说明。若室内用陈设解释祭祖、家庭秩序或绍兴居住生活，而说明牌没有给出明确年代和原状依据，就应称为“当前展陈”，不能直接当成鲁迅童年的原样房间。"
    },
    {
      id: "old-taimen-figure",
      type: "figure",
      src: "/images/guides/luxun-shaoxing-literary-walk/zhou-family-old-taimen-1600.webp",
      alt: "绍兴周家老台门入口，门额标明这里是鲁迅祖居。",
      width: 1600,
      height: 1067,
      caption: "老台门提供家族和社会背景；入口名称不能把院内每个房间都变成鲁迅个人生活空间。"
    },
    {
      id: "old-taimen-checklist",
      type: "list",
      items: [
        "看装饰性陈设之前，先确认场所的正式名称。",
        "可以观察院落与房间关系，但无展签时不要自行指定晚清用途。",
        "原状保存、维修、修复、复建、场景陈设等词，要按现场原文记录。",
        "状态不清时，只写“现陈列于祖居院落内”，不要猜年代。"
      ]
    },
    {
      id: "sanwei-heading",
      type: "heading",
      level: 2,
      text: "三味书屋为何是生活现场，而一张书桌仍需谨慎？"
    },
    {
      id: "sanwei-text",
      type: "paragraph",
      text: "三味书屋位于寿家台门内。绍兴官方资料把它记为鲁迅约十二岁入读、前后学习约五年的私塾，因此它与求学经历的关系，比影视布景或泛称的“老教室”更有依据。进门后先看房间尺度、先生与学生座位的关系、匾额和馆方说明。这些空间信息足以帮助你理解鲁迅后来在散文中安排园中观察与书塾生活的对照，不需要现场再演一遍课文。"
    },
    {
      id: "sanwei-figure",
      type: "figure",
      src: "/images/guides/luxun-shaoxing-literary-walk/sanwei-study-1600.webp",
      alt: "三味书屋内部，可见桌椅、匾额和标示鲁迅座位的馆方说明。",
      width: 1600,
      height: 1067,
      caption: "书屋是有据可查的求学现场；具体物件故事仍需依赖当日展签与来源说明。"
    },
    {
      id: "sanwei-caution",
      type: "paragraph",
      text: "著名的“早”字书桌还要多核一步。浙江文旅部门2024年的报道和纪念馆工作人员采访都说，馆方认定的原物曾因保护需要撤出三味书屋，入库修缮后在纪念馆展出；但后来的报道并没有始终说清三味书屋所见课桌是原物还是复制品。因此，今天具体看到的物件、展签与位置仍须现场核对。若当天看得到，应按展签原文记录；允许拍照时拍全说明。即使馆方认定的原物已经轮换撤下，三味书屋仍是求学现场；不要拿另一张桌子代替，也不要把故事升级成完整来源证明。"
    },
    {
      id: "new-taimen-heading",
      type: "heading",
      level: 2,
      text: "周家新台门今天究竟保留了什么？"
    },
    {
      id: "new-taimen-text",
      type: "paragraph",
      text: "周家新台门与鲁迅出生、青少年生活的关系有官方资料支持，但“故居”不等于整座院落原封不动到今天。绍兴市政协的一份史料记载，周家在1918年出售房产，1920—1922年间较大范围改建，同时指出特定居室和厨房等部分得以保留。机构史料又记录了2003年的工程：拆除旧展厅、恢复新台门环境，并建设新的纪念馆。这里真正值得理解的是“部分遗存—后续改动—保护修复—当代解释”的连续过程，而不是一座封存的童年住宅。"
    },
    {
      id: "new-taimen-figure",
      type: "figure",
      src: "/images/guides/luxun-shaoxing-literary-walk/zhou-family-new-taimen-1600.webp",
      alt: "绍兴周家新台门西轴的一处建筑，属于有鲁迅生活关系的故居组群。",
      width: 1600,
      height: 1067,
      caption: "新台门既有明确的生活现场关系，也经历出售、改建、部分保留和后续修复。"
    },
    {
      id: "new-taimen-method",
      type: "list",
      ordered: true,
      items: [
        "先确认建筑或房间名称；“鲁迅故里”是参观区域名，不是统一建成年代。",
        "进入家具陈设之前，先找文保牌或修缮说明。",
        "把建筑材料与家具、照片、后来加入的解释设施分开。",
        "只用证据支持的最窄动词：遗存、维修、修复、复建或现作展陈。",
        "若没有干预史，不能凭木头颜色、瓦片或氛围判断年代。"
      ]
    },
    {
      id: "baicao-heading",
      type: "heading",
      level: 2,
      text: "百草园是真实地点，还是文学记忆？"
    },
    {
      id: "baicao-text",
      type: "paragraph",
      text: "两者都是，但含义不同。百草园位于故居后方，属于周家生活空间的一部分；《从百草园到三味书屋》则是收入《朝花夕拾》的回忆性散文。鲁迅在1926年以成年作者的眼光重新组织童年经验。它不是小说，却也不是当时当天写成的日记，更不是园林修缮报告。记忆会选择：植物、游戏、恐惧、长辈讲述与书塾生活之所以形成鲜明节奏，是因为作者后来把它们安排成了文字。"
    },
    {
      id: "baicao-figure",
      type: "figure",
      src: "/images/guides/luxun-shaoxing-literary-walk/baicao-garden-1600.webp",
      alt: "绍兴鲁迅故里参观区内写有“百草园”的园门。",
      width: 1600,
      height: 1067,
      caption: "门额标明了散文记忆所对应的真实园子，却不能证明园门年代或重现鲁迅童年的视野。"
    },
    {
      id: "baicao-method",
      type: "paragraph",
      text: "到现场不要强迫每一株现有植物对应一行课文。只抓两个物质锚点更可靠：百草园与新台门的位置关系，以及泥墙根、石井栏等带身份说明的细节。每一处都继续问：展签有没有说明年代、维修或关联？然后再比较散文把什么写得最突出，而机构能用材料证明什么。人多时，这种“两锚点”读法比等待一张无人的“课本复刻照”更诚实，也更容易记住。"
    },
    {
      id: "museum-heading",
      type: "heading",
      level: 2,
      text: "1953年建立的纪念馆，为旧房间增加了什么？"
    },
    {
      id: "museum-text",
      type: "paragraph",
      text: "绍兴鲁迅纪念馆采用1953年建馆的机构口径，国家发改委的场馆介绍也支持这一年代。这个年份属于机构史，不能变成每间现展厅的建造年代。纪念馆的价值恰恰在于完成旧住宅做不到的工作：建立生平时间线，识别版本、照片和文献，解释鲁迅在不同城市之间的经历，以及作品如何出版和被阅读。一件手稿复制件或版本也要凭自己的展签和权利信息成立，不能因为放在故居旁边就自动变成原件。"
    },
    {
      id: "museum-figure",
      type: "figure",
      src: "/images/guides/luxun-shaoxing-literary-walk/lu-xun-memorial-museum-1600.webp",
      alt: "绍兴受保护生活遗址旁的现代鲁迅纪念馆建筑。",
      width: 1600,
      height: 1067,
      caption: "纪念馆是1953年建立、负责文献与解释的机构，不是另一处鲁迅童年住宅。"
    },
    {
      id: "museum-method",
      type: "paragraph",
      text: "给纪念馆留出足够时间，让它纠正你从场景化房间获得的第一印象。重点找附日期的文献、初版本、家庭照片和保护工程信息，分清原件、复制件和展览引文。若人多或物件轮换，优先完成一条生平年表和一件说明清楚的出版物。即使没有看到预期展品，这组证据仍能把作家与作品连接起来，不必假装看见了缺席的物件。"
    },
    {
      id: "fiction-heading",
      type: "heading",
      level: 2,
      text: "小说从哪里开始，今天的咸亨酒店又能证明什么？"
    },
    {
      id: "fiction-text",
      type: "paragraph",
      text: "《孔乙己》初刊于1919年，是短篇小说。潦倒读书人、叙述者和鲁镇酒楼都属于文学创作，即使鲁迅从熟悉的社会生活中取材，也不能把孔乙己写成有户籍可查的绍兴居民。后来的“原型”猜测或人物归属说法，也不能把一个复合的小说人物压缩成唯一真人。这一点在现场尤其重要：孔乙己如今出现在店招、雕像和饮食空间中，这些实物证明作品的接受力很强，却不把小说变成了地方人物传记。"
    },
    {
      id: "xianheng-figure",
      type: "figure",
      src: "/images/guides/luxun-shaoxing-literary-walk/xianheng-hotel-1600.webp",
      alt: "绍兴今日咸亨酒店门面，入口旁可见孔乙己塑像。",
      width: 1600,
      height: 1067,
      caption: "今日酒店与雕像属于现代文学接受和商业空间，不是小说酒楼未经改变的原现场。"
    },
    {
      id: "fiction-boundary",
      type: "paragraph",
      text: "绍兴当前官方旅游材料会用《孔乙己》的关联介绍咸亨酒店；酒店在2025年发布的自述年表称，它于1981年恢复营业，后来扩建时保留了运营方所谓的“堂吃”部分，其他区域则拆除重建。这是经营方自述，不是独立的文物保护调查，却足以排除“现有整座建筑未经改变地保留自晚清”的说法。浙江文旅部门2025年的报道还记录了片区内新增的文学IP商店和场景建设。观察时应看建成时间与解释文字；不要把今日室内写成小说酒楼原貌，也不要把雕像称为真人肖像。酒店关闭或拥挤时，跳过它仍不影响前面的生活现场与写作理解。"
    },
    {
      id: "walk-heading",
      type: "heading",
      level: 2,
      text: "入口、排队或房间变化时，怎样把这条线走完？"
    },
    {
      id: "walk-sequence",
      type: "list",
      ordered: true,
      items: [
        "抵达后先看当天的官方地图、预约提示、入口和摄影标识。运营方旧网页的一小时、两小时、三小时线路，不能直接当成现行时间表。",
        "动线允许时从老台门开始，只让它承担一个任务：说明家族和社会背景。若关闭，把这层留到纪念馆补，不要转嫁给新台门。",
        "在三味书屋先读空间和展签，再找“早”字书桌。归属物件不在展时，记录有据可查的求学地点即可。",
        "在新台门找一条遗存/修复状态说明和一条房间用途说明，避免家具陈设被合并成“全部原状”。",
        "百草园使用“两锚点”：与故居的位置关系，加一个有说明的物质细节。季节种植不同，阅读仍然成立。",
        "到纪念馆建立年代、作品和后续保护脉络。时间收紧时，一条可靠年表加一件出版物，比匆忙扫完所有展厅更有用。",
        "只有想理解后世接受时，才把咸亨和新文学街区放在结尾；它是可选的现代尾声，不是童年现场的证据。"
      ]
    },
    {
      id: "walk-recovery",
      type: "list",
      items: [
        "预约失败：不要把外观参观说成完整核心游览；可先读公共街区，再寻找官方后续时段。",
        "房间关闭：使用带日期的机构介绍或纪念馆年表，不虚构室内观察。",
        "施工改道：脚下可以换顺序，笔记中的证据顺序不要混。",
        "百草园拥挤：选两处有说明的细节，不必复刻一张无人的课本画面。",
        "存在行动障碍：向工作人员询问当天无障碍线；若无法覆盖全组，优先纪念馆和一处确认可进入的生活现场。",
        "禁止摄影：手记物件名称、发布机构和展签日期；未获现场允许，不默认可用闪光灯、脚架或近距离拍摄。"
      ]
    },
    {
      id: "fit-heading",
      type: "heading",
      level: 2,
      text: "谁适合走完整路线，所有人又应复核什么？"
    },
    {
      id: "fit-comparison",
      type: "comparison",
      title: "按自己的问题决定深度",
      columns: [
        {
          heading: "已经读过鲁迅",
          body: "走完整证据顺序，把散文组织的记忆与现场材料标签比较。只有关心接受史时才加入咸亨。"
        },
        {
          heading: "第一次接触鲁迅",
          body: "优先新台门、三味书屋和纪念馆，前后读一篇短文即可。不要把旅程变成摘句打卡或漫长生平课。"
        },
        {
          heading: "关注建筑或保护",
          body: "优先老、新台门，记录干预词和2003年工程史。把家具与氛围当成问题，不当成年代。"
        },
        {
          heading: "只想吃饭或拍照",
          body: "可以单独去咸亨，也可以跳过深度步行；但不能用商业场景概括整个鲁迅绍兴。"
        }
      ]
    },
    {
      id: "dont-mistake",
      type: "callout",
      title: "不要混淆这六组关系",
      body: "回忆散文不等于即时日记；小说人物不等于历史居民；受保护遗址不等于每个表面从未改变；归属给“早”字故事的书桌不等于已完全证实或永不轮换；恢复环境不等于完整原院落；今日咸亨酒店不等于小说酒楼未经改变的原状。",
      tone: "warning"
    },
    {
      id: "dynamic-note",
      type: "paragraph",
      text: "临行前应向直接运营方复核常规开放时间、免费与收费范围、预约和外国护照处理、施工关闭、单向流线、无障碍进入、展品轮换和室内摄影。研究期间能找到的2026年通知只涉及特定节假日调整，不能据此推出日常规则。若无法事先取得直接确认，保持弹性，带好护照证件，给人工窗口询问留时间，并把咸亨视为可选项。动态信息失效时，不能顺手把证据边界也抹掉。"
    },
    {
      id: "local-review",
      type: "callout",
      title: "本文没有替现场作出的保证",
      body: "Homeground 中央编辑已于 2026 年 8 月 14 日完成三语结构、专名、来源边界和图片署名的桌面复核；这不是现场踏查，也不代表已取得具名绍兴本地或鲁迅研究者背书。文中的步行顺序只是编辑逻辑，实际开放范围、房间动线和物件归属应以当天地图、展签和工作人员指引为准。",
      tone: "neutral"
    },
    {
      id: "links",
      type: "internal-links",
      title: "继续用证据读旅行现场",
      items: [
        {
          label: "怎样选择木版印刷或活字印刷参观",
          href: "/zh/guides/woodblock-and-movable-type-printing-decisions/",
          description: "看纪念馆版本与印刷物时，继续使用对象、工序和证据分开的办法。"
        },
        {
          label: "按中国公众假期安排旅程",
          href: "/zh/guides/china-public-holidays-travel-calendar/",
          description: "把拥挤和特殊开放通知与文学解释分开处理。"
        },
        {
          label: "核对官方与第三方票务渠道",
          href: "/zh/guides/official-or-reseller-china-tickets/",
          description: "若遗址区需要预约，应使用当前运营方来源复核。"
        },
        {
          label: "分清淄博聊斋背后的不同层次",
          href: "/zh/guides/liaozhai-zibo-former-residence-liqu-liaozhai-city/",
          description: "在另一段作家与地点之旅中，分开故居、文学、活态表演与现代景区呈现。"
        }
      ]
    },
    {
      id: "sources",
      type: "sources",
      title: "资料与图片署名复核至2026年8月14日",
      items: [
        {"label": "鲁迅故里组成及1953年建馆口径", "url": "https://www.ndrc.gov.cn/xwdt/ztzl/qghsly/202105/t20210524_1301639.html", "publisher": "国家发展和改革委员会", "reviewedAt": "2026-08-13"},
        {"label": "新台门与三味书屋的生活、求学关系", "url": "https://sxlz.sx.gov.cn/art/2022/2/14/art_1483623_58923289.html", "publisher": "绍兴官方地方史平台", "reviewedAt": "2026-08-13"},
        {"label": "绍兴鲁迅纪念馆机构介绍", "url": "https://sxlz.sx.gov.cn/art/2022/11/14/art_1229701440_58924111.html", "publisher": "绍兴官方地方史平台", "reviewedAt": "2026-08-13"},
        {"label": "新台门出售、改建与遗存部分", "url": "https://sxzx.sx.gov.cn/art/2011/7/13/art_1486822_17724937.html", "publisher": "绍兴市政协", "reviewedAt": "2026-08-13"},
        {"label": "2003年保护与建馆工程史", "url": "https://www.zjds.org.cn/sx/37464.jhtml", "publisher": "浙江省党史和文献研究机构", "reviewedAt": "2026-08-13"},
        {"label": "护栏调整与归属“早”字故事书桌的展示", "url": "https://ct.zj.gov.cn/art/2024/3/20/art_1652992_59019865.html", "publisher": "浙江省文化广电和旅游厅", "reviewedAt": "2026-08-13"},
        {"label": "纪念馆工作人员说明“早”字桌的保护与2024年展出", "url": "https://www.chinanews.com.cn/sh/2024/04-10/10196078.shtml", "publisher": "中国新闻网", "reviewedAt": "2026-08-14"},
        {"label": "《从百草园到三味书屋》文本", "url": "https://www.chinawriter.com.cn/news/2013/2013-02-06/153980.html", "publisher": "中国作家网／中国作家协会", "reviewedAt": "2026-08-13"},
        {"label": "《朝花夕拾》的回忆写作属性", "url": "https://www.chinawriter.com.cn/n1/2022/0428/c419384-32410615.html", "publisher": "中国作家网／中国作家协会", "reviewedAt": "2026-08-13"},
        {"label": "《孔乙己》文本与发表背景", "url": "https://www.chinawriter.com.cn/n1/2021/0907/c440988-32220179.html", "publisher": "中国作家网／中国作家协会", "reviewedAt": "2026-08-13"},
        {"label": "咸亨酒店的当前旅游呈现", "url": "https://sxwg.sx.gov.cn/art/2024/9/3/art_1644765_59016443.html", "publisher": "绍兴文化旅游主管部门", "reviewedAt": "2026-08-13"},
        {"label": "咸亨酒店运营方年表：1981年复业及后期局部保留、其余拆建", "url": "https://www.xianheng.com/index.php?a=show&c=index&catid=151&id=1&m=content", "publisher": "咸亨酒店", "reviewedAt": "2026-08-14"},
        {"label": "2025年文学IP片区呈现", "url": "https://ct.zj.gov.cn/art/2025/10/14/art_1673778_59028174.html", "publisher": "浙江省文化广电和旅游厅", "reviewedAt": "2026-08-14"},
        {"label": "官方一、二、三小时游线页；仅作有日期的方位参考，不作为今日时刻表", "url": "https://sxlxmuseum.com/gcyx.htm", "publisher": "绍兴鲁迅故里沈园景区", "reviewedAt": "2026-08-14"},
        {"label": "2026年2月特定节假日开放调整与预约通知", "url": "https://www.thepaper.cn/newsDetail_forward_32587318", "publisher": "The Paper转载场馆通知", "reviewedAt": "2026-08-13"},
        {"label": "首图：Yumeto拍摄新台门小堂前；已裁切，CC BY-SA 4.0", "url": "https://commons.wikimedia.org/wiki/File:20250717_Small_reception_room_of_the_former_residence_of_Lu_Xun.jpg", "publisher": "Wikimedia Commons", "reviewedAt": "2026-08-13"},
        {"label": "正文图：Gisling拍摄老台门入口；已裁切，CC BY 3.0", "url": "https://commons.wikimedia.org/wiki/File:Ancestral_home_of_Luxun.JPG", "publisher": "Wikimedia Commons", "reviewedAt": "2026-08-13"},
        {"label": "正文图：Yumeto拍摄三味书屋；已裁切，CC BY-SA 4.0", "url": "https://commons.wikimedia.org/wiki/File:20250717_Sanwei_Shuwu.jpg", "publisher": "Wikimedia Commons", "reviewedAt": "2026-08-13"},
        {"label": "正文图：猫猫的日记本拍摄新台门西轴建筑；已裁切，CC BY-SA 4.0", "url": "https://commons.wikimedia.org/wiki/File:Former_Residence_of_Lu_Xun_in_Shaoxing_01_2018-09.jpg", "publisher": "Wikimedia Commons", "reviewedAt": "2026-08-13"},
        {"label": "正文图：Yiwen122拍摄百草园园门；采用无人裁切，CC BY-SA 4.0", "url": "https://commons.wikimedia.org/wiki/File:Baicao_garden.jpg", "publisher": "Wikimedia Commons", "reviewedAt": "2026-08-14"},
        {"label": "正文图：Huanokinhejo拍摄绍兴鲁迅纪念馆；已裁切，CC BY-SA 4.0", "url": "https://commons.wikimedia.org/wiki/File:Lu_Xun_memorial,_Shaoxing.jpg", "publisher": "Wikimedia Commons", "reviewedAt": "2026-08-13"},
        {"label": "正文图：Amarespeco拍摄咸亨酒店；已裁切，CC BY-SA 4.0", "url": "https://commons.wikimedia.org/wiki/File:%E5%92%B8%E4%BA%A8%E9%85%92%E5%BA%972017.jpg", "publisher": "Wikimedia Commons", "reviewedAt": "2026-08-13"},
        {"label": "以上裁切衍生图适用的CC BY-SA 4.0许可", "url": "https://creativecommons.org/licenses/by-sa/4.0/", "publisher": "Creative Commons", "reviewedAt": "2026-08-13"},
        {"label": "老台门裁切衍生图适用的CC BY 3.0许可", "url": "https://creativecommons.org/licenses/by/3.0/", "publisher": "Creative Commons", "reviewedAt": "2026-08-13"}
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
