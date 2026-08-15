import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead",
      type: "lead",
      text: "湄洲妈祖祖庙既是机构，也是多层次建筑群、活态信仰中心和面向访客的展示空间。若把这些全部压成一座笼统的“千年古庙”，最重要的区别反而消失。本文把四种证据分开，再给非信众一套低干扰观察方法：不预设能进入仪式，也不把信众当成视觉素材。这不是抵达攻略、开放时间页或仪式预告。"
    },
    {
      id: "direct-answer",
      type: "callout",
      title: "先记住这四问",
      body: "祖庙机构如何介绍自己？有据可查的建造沿革支持什么？UNESCO与中国非遗资料如何描述活态信俗？哪些内容属于传统叙事或现代旅游展示？先给眼前场景贴对证据标签，再作解释，通常比追求一句“到底真不真、到底古不古”更准确。",
      tone: "decision"
    },
    {
      id: "layers-heading",
      type: "heading",
      level: 2,
      text: "四个文化证据层分别是什么？"
    },
    {
      id: "layers-table",
      type: "table",
      caption: "彼此相关、但不能合并的四个层次",
      columns: ["层次", "证据可以支持", "证据不能证明"],
      rows: [
        ["机构与建筑沿革", "有明确名称的祖庙机构、国家级文保单位，以及有记录的重建和扩建阶段", "每一座可见殿堂都是原存千年建筑"],
        ["妈祖信俗", "2009年列入UNESCO代表作名录、包含口头传统、宗教仪式与民俗实践的活态体系", "普通参观日一定有仪式，或旁观者可以加入"],
        ["传统叙事", "信仰共同体关于妈祖生平、德行、救助和纪念的叙述", "每个叙事细节都已经成为独立核实的世俗传记"],
        ["现代旅游展示", "面向当代访客的景观、展览设施、纪念性空间与解释语言", "建筑年代、仪式真实性，或画面中人物的信仰身份"]
      ]
    },
    {
      id: "institution-heading",
      type: "heading",
      level: 2,
      text: "这里的“祖庙”到底指什么？"
    },
    {
      id: "institution-context",
      type: "paragraph",
      text: "祖庙官网把建筑群定位在湄洲岛北部宫下村，并分别介绍西轴线和南轴线。因此，“湄洲妈祖祖庙”不只是一间殿堂；它也可指机构、信仰共同体和机构管理的完整建筑群。确认机构名称的牌子，不能顺便给下一扇门里的材料断代。阅读时，把文保单位名、单体建筑名和建造说法拆成三条信息。"
    },
    {
      id: "axis-figure",
      type: "figure",
      src: "/images/guides/meizhou-mazu-ancestral-temple-reading-guide/ancestral-temple-axis-1400.webp",
      alt: "湄洲妈祖祖庙内一条沿坡展开的台阶轴线，两侧是多层建筑。",
      width: 1400,
      height: 1050,
      caption: "2012年9月23日的湄洲妈祖祖庙。江上清风1961摄，CC BY 3.0；Homeground缩放。文件可确认地点，不能给画面中的建筑断代。"
    },
    {
      id: "chronology-heading",
      type: "heading",
      level: 2,
      text: "今天看到的建筑有多老？"
    },
    {
      id: "chronology",
      type: "paragraph",
      text: "祖庙官方沿革先叙述了创建、修整和扩建的长期历史，又给出一个关键的现代边界：今天所见西轴线建筑群，主要来自20世纪80年代起的重建，至1994年全部建成；新建南轴线于1998年开工，2002年建成。这些日期不会抹掉地点更早的历史，却说明机构延续、文保身份和可见构件的物质年代并不是同一件事。"
    },
    {
      id: "protection-record",
      type: "paragraph",
      text: "国务院第六批全国重点文物保护单位名单把莆田的“妈祖庙”列为编号Ⅲ-300，时代栏为“清”。这是一条保护单位的法定名录记录，不是给视野内每片屋顶、门楼、台阶和展陈统一贴上的年代。若要判断某个具体构件，应优先找单体文保说明、维修记录或建造标牌，不能只凭外观看起来“古”。"
    },
    {
      id: "rebuild-warning",
      type: "callout",
      title: "起源久远，不等于眼前材料全部久远",
      body: "一个地点可以延续数百年的机构记忆与信仰谱系，同时拥有大量修整、重建和新建建筑。机构层可在有据时写“历史悠久的祖庙”；现有西轴线要保留20世纪80年代至1994年的重建边界，南轴线要保留1998至2002年的建设边界。不要把整个可见建筑群写成原存千年木构。",
      tone: "warning"
    },
    {
      id: "architecture-reading",
      type: "list",
      ordered: true,
      items: [
        "先读完整文保牌或地点牌：记下发布者、保护单位全名和名录时代。",
        "再读单体说明：殿、门、楼、台与展览建筑可能各有建造和干预日期。",
        "分清“始建”“重建”“修缮”和“建成”；它们回答的不是同一个历史问题。",
        "“仿宋”等词首先是设计语言，除非标牌明确说某段原构仍存。",
        "没有单体年代时，只描述可见形式，把年代问题留白。"
      ]
    },
    {
      id: "drum-figure",
      type: "figure",
      src: "/images/guides/meizhou-mazu-ancestral-temple-reading-guide/drum-tower-1400.webp",
      alt: "湄洲妈祖祖庙内一座红白相间、覆红色瓦顶的楼，远处可见海面。",
      width: 1400,
      height: 789,
      caption: "2012年9月23日湄洲妈祖祖庙内、由文件名标识为鼓楼的建筑。江上清风1961摄，CC BY 3.0；Homeground缩放。照片不能证明建筑年代。"
    },
    {
      id: "drum-boundary",
      type: "paragraph",
      text: "Commons文件名把画面主体标作鼓楼；坐标与分类确认祖庙地点，文件资料确认2012年的拍摄日期。屋顶形状、颜色和表面状态都不能单独证明这座楼的建造年代。文件识别可以负责“它是什么”，单体建筑说明或文保记录才应负责“它有多老”。"
    },
    {
      id: "belief-heading",
      type: "heading",
      level: 2,
      text: "非物质文化遗产名录保护的是什么？"
    },
    {
      id: "belief-context",
      type: "paragraph",
      text: "UNESCO于2009年把妈祖信俗列入人类非物质文化遗产代表作名录，其说明涉及沿海社群中的口头传统、宗教仪式和民俗实践。中国非遗项目页把它归入社会实践、仪式和节庆活动。被保护的并不只是一尊像或一栋建筑，也包括由共同体承载的知识、记忆、关系与行动。访客看到的，只是这套活态系统在某个时刻的一小部分。"
    },
    {
      id: "tradition-heading",
      type: "heading",
      level: 2,
      text: "妈祖生平传统应当怎样写？"
    },
    {
      id: "tradition-table",
      type: "table",
      caption: "让信仰传统与世俗证据各居其位",
      columns: ["来源语言或说法", "稳妥读法", "不应升级成"],
      rows: [
        ["UNESCO写妈祖“被相信”曾在10世纪生活于湄洲岛", "按信仰传统和共同体叙事转述", "“UNESCO证实了妈祖传记中的每件事”"],
        ["中国非遗与祖庙叙述救助、离世和建庙纪念", "标明是谁的叙述，并解释其中承载的价值", "把每个行为细节写成独立核实的世俗历史"],
        ["有日期的国家名录记录保护单位及时代", "只用于它实际给出的法定文保身份", "顺便证明全部信仰叙事或全部可见建筑"],
        ["当代解释强调慈爱、助人和社会联结", "把它读作活态意义与公共记忆", "推断每位当地人或访客都持同一种信仰"]
      ]
    },
    {
      id: "tradition-callout",
      type: "callout",
      title: "准确归因不会削弱传统",
      body: "“信众相信”“传统叙述”“祖庙官方沿革记载”等表达，说明知识属于谁，也避免把纪念性叙事误装成完全核实的世俗传记。保留这种归因，恰恰能让传统在自己的语境里被认真对待。",
      tone: "neutral"
    },
    {
      id: "practice-heading",
      type: "heading",
      level: 2,
      text: "为什么说它是活态实践，而不只是静态展陈？"
    },
    {
      id: "practice-context",
      type: "paragraph",
      text: "UNESCO说明举到庙会、日常规模较小的礼敬、供品、巡游等共同体实践。这些例子解释项目的广度，不是祖庙2026年的活动日历。一间殿堂可能从访客通行空间转为正在使用的信仰空间；画面中的人首先是参与者，不是内容素材。不要从服饰、供品或站位推断一个人的信仰、身份、情绪或来历。若要写某场具体活动对访客开放，需要主办方带日期的最新通知。"
    },
    {
      id: "observer-heading",
      type: "heading",
      level: 2,
      text: "非信众的低干扰观察框架"
    },
    {
      id: "observer-method",
      type: "list",
      ordered: true,
      items: [
        "在活动空间边缘先停一下，让信众、队伍与工作人员决定现场流线，再选择站位。",
        "不要挡住通道、门槛、供桌和视线。更好的取景角度不是挤走参与者的理由。",
        "看不懂的动作可以不模仿、不加入。参与应来自清楚邀请或现场指引，而不是跟做。",
        "在负责该空间或活动的机构给出当日明确答复前，把相机收好。",
        "不要触碰、移动供品、仪式物件或造像来测试材质、方便拍摄或辅助讲解。",
        "若现场变得拥挤、安静或出现队列，主动后退；共同体使用优先于完成观察清单。"
      ]
    },
    {
      id: "observer-table",
      type: "table",
      caption: "按现场信号响应，不把编辑顺序冒充官方路线",
      columns: ["你看到的情况", "低干扰做法", "不要假定"],
      rows: [
        ["有人持供品或香排队", "除非工作人员明确引导，否则留在队列外", "这是一项游客体验或开放参与环节"],
        ["诵念、音乐、钟声或移动队伍出现", "停止穿越流线，为队伍让出空间", "活动按固定时间演出，或允许录制"],
        ["围栏、关闭的门或工作人员改道", "接受边界，只在获指引的区域继续", "网上有照片就代表可以进入"],
        ["一间看似安静的殿堂", "先读告示，在公共通行范围观察", "安静就等于允许摄影、触摸或进入"],
        ["没有外语说明", "记下牌子上的准确名称，之后再核实", "仅凭气氛就能认定仪式名称或房间年代"]
      ]
    },
    {
      id: "observer-boundary",
      type: "callout",
      title: "这是编辑最低线，不是祖庙官方礼仪守则",
      body: "截至复核日，指定官方页面没有给出覆盖普通动线、室内摄影、视频、闪光灯、脚架、无人机与仪式旁观的完整现行规则。到场后应向负责机构询问。官网没有写，不等于允许；旧照片有Commons许可，也不等于现在获得场地方拍摄许可。",
      tone: "warning"
    },
    {
      id: "tourism-heading",
      type: "heading",
      level: 2,
      text: "现代旅游展示从哪里进入？"
    },
    {
      id: "tourism-context",
      type: "paragraph",
      text: "祖庙官网在信仰建筑之外，也介绍景点、广场、展览馆、纪念性雕塑与观景空间。这些材料可以说明机构如何同时面对当代香客和游客，却不能用来给相邻构件断代，也不能把活态实践写成保证出现的表演。一个景观可以同时属于现代展示、文保地点和信仰环境；最终该用哪个词，取决于你正在提出哪种主张。"
    },
    {
      id: "operations-exclusion",
      type: "callout",
      title: "本文刻意不写的运营信息",
      body: "本文不发布固定开放时间、船班、外国护照预约路径、无障碍路线、摄影许可、仪式时间表、演出保证或未经实测的参观时长。这些都需要由相应运营方或现场机构提供当前证据。即使运营改变，文化证据框架仍然有效。",
      tone: "warning"
    },
    {
      id: "photo-heading",
      type: "heading",
      level: 2,
      text: "这三张照片能证明什么？"
    },
    {
      id: "photo-boundary",
      type: "paragraph",
      text: "三张照片均由江上清风1961摄于2012年9月23日，并在Wikimedia Commons以CC BY 3.0发布。Commons坐标和“Mazu Temple, Meizhou Island”分类支持地点身份；鼓楼这一单体名称只由文件名支持。Homeground对hero做了居中裁切，并把三张已提供的衍生图确定性转换为WebP。图片不能证明2026年开放状态、摄影规则、仪式安排、人物身份或每个可见构件的年代。本文使用0张AI生成或AI辅助图片。"
    },
    {
      id: "terms-heading",
      type: "heading",
      level: 2,
      text: "看牌子和继续检索时可用的词"
    },
    {
      id: "terms-table",
      type: "table",
      caption: "让对象和证据类型一直留在表达里",
      columns: ["词", "用于", "证据边界"],
      rows: [
        ["湄洲妈祖祖庙", "有明确名称的祖庙机构与建筑群", "不是单体建筑年代"],
        ["西轴线 / 南轴线", "官方沿革中的两组建筑", "不是官方访客路线"],
        ["妈祖信俗", "活态信仰与民俗项目", "不是某天必有仪式的承诺"],
        ["传统叙事", "共同体与信仰语境中的叙述", "不会自动成为已核实的世俗传记"],
        ["重建 / 修缮 / 新建", "不同类型的建筑干预", "不要一律压成“古”或“假”"],
        ["旅游展示", "当代景观与解释呈现", "不能证明物质年代或参与者信仰"]
      ]
    },
    {
      id: "internal-links",
      type: "internal-links",
      title: "继续阅读以证据为中心的文化指南",
      items: [
        {
          label: "分清原存、修缮、重建与迁建",
          href: "/zh/guides/how-to-read-heritage-sites-in-china/",
          description: "把同一套建筑干预词汇带到其他中国遗产地。"
        },
        {
          label: "参观考古遗址博物馆时分开读遗址与展陈",
          href: "/zh/guides/how-to-visit-an-archaeological-site-museum/",
          description: "继续练习区分原址、复原、遗物和说明牌。"
        },
        {
          label: "理解春节习俗与访客边界",
          href: "/zh/guides/lunar-new-year-customs-for-visitors/",
          description: "把活态家庭和共同体实践与旅游表演分开。"
        }
      ]
    },
    {
      id: "closing-note",
      type: "paragraph",
      text: "认真阅读祖庙，不是逼它在“真的古”与“只是现代”之间二选一，而是继续追问：哪一种延续属于机构，哪一段材料有明确年代，哪种叙述属于信仰传统，哪项行动是共同体的活态实践，哪幅景观面向当代访客。词越准确，越能同时给历史与尊重留下空间。"
    },
    {
      id: "sources",
      type: "sources",
      title: "官方来源与图片记录（复核于2026年8月15日）",
      items: [
        {
          label: "妈祖信俗",
          url: "https://ich.unesco.org/en/RL/mazu-belief-and-customs-00227",
          publisher: "UNESCO非物质文化遗产",
          reviewedAt: "2026-08-15"
        },
        {
          label: "妈祖信俗中国非遗名录记录",
          url: "https://www.ihchina.cn/directory_details/11811",
          publisher: "中国非物质文化遗产网 / 中国非物质文化遗产保护中心",
          reviewedAt: "2026-08-15"
        },
        {
          label: "湄洲妈祖祖庙简介与建设沿革",
          url: "https://www.mzmz.org.cn/mzmzzm.html",
          publisher: "湄洲妈祖祖庙",
          reviewedAt: "2026-08-15"
        },
        {
          label: "妈祖祖庙景点介绍",
          url: "https://mzd.putian.gov.cn/jggk/jdjs/202301/t20230120_1796135.htm",
          publisher: "湄洲岛管委会",
          reviewedAt: "2026-08-15"
        },
        {
          label: "第六批全国重点文物保护单位名单",
          url: "https://zwgk.mct.gov.cn/zfxxgkml/qt/202012/t20201206_918486.html",
          publisher: "文化和旅游部 / 国务院记录",
          reviewedAt: "2026-08-15"
        },
        {
          label: "Commons文件编号80751919 — 江上清风1961，CC BY 3.0",
          url: "https://commons.wikimedia.org/wiki/File:%E5%8F%A4%E5%A6%88%E7%A5%96%E5%BA%99_-_panoramio_(1).jpg",
          publisher: "Wikimedia Commons",
          reviewedAt: "2026-08-15"
        },
        {
          label: "Commons文件编号80751927 — 江上清风1961，CC BY 3.0",
          url: "https://commons.wikimedia.org/wiki/File:%E5%8F%A4%E5%A6%88%E7%A5%96%E5%BA%99_-_panoramio.jpg",
          publisher: "Wikimedia Commons",
          reviewedAt: "2026-08-15"
        },
        {
          label: "Commons文件编号80752235 — 江上清风1961，CC BY 3.0",
          url: "https://commons.wikimedia.org/wiki/File:%E5%8F%A4%E5%A6%88%E7%A5%96%E9%BC%93%E6%A5%BC_-_panoramio.jpg",
          publisher: "Wikimedia Commons",
          reviewedAt: "2026-08-15"
        },
        {
          label: "三张湄洲照片适用的CC BY 3.0许可",
          url: "https://creativecommons.org/licenses/by/3.0/",
          publisher: "Creative Commons",
          reviewedAt: "2026-08-15"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
