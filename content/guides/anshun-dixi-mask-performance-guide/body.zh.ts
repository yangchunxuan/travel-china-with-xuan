import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead",
      type: "lead",
      text:
        "安顺地戏的木雕面孔并没有“戴错位置”。演员用青巾蒙住头脸，把木雕“脸子”置于额上；角色随后由雕刻、唱腔、帮腔、锣鼓、兵器和全身动作共同生成。这个佩戴关系可以直接观察，但它最初为何形成，并不是已经解决的历史事实。先读完整的表演系统，再去理解一种颜色或一种起源说法。",
    },
    {
      id: "answer",
      type: "callout",
      title: "第一次看，先抓住三个关系",
      body:
        "先看额上脸子与蒙面演员的关系，再听领唱与众人帮腔的关系，最后看兵器、靠旗如何随身体行动。然后把故事识别为英雄征战文学，不要当成逐字还原的战场档案。地戏实践者顾家顺把额戴解释为对所演人物的尊重；这应保留为一位具名实践者的解释，不能写成已经证明的佩戴起源。",
      tone: "decision",
    },
    {
      id: "identity-heading",
      type: "heading",
      level: 2,
      text: "先确认你看到的是安顺地戏",
    },
    {
      id: "identity",
      type: "paragraph",
      text:
        "中国国家级非物质文化遗产名录把安顺地戏列为传统戏剧项目Ⅳ-90，2006年列入第一批名录，保护单位为安顺市文化馆。官方项目页把它放在安顺屯堡军屯历史语境中，并记录了可见的表演语法：首蒙青巾、额戴假面、腰围战裙、手执兵器、随口而唱、一人领唱众人伴和，并以一锣一鼓伴奏。这些特征足以建立可靠的观看框架；非遗身份并不意味着每支村寨戏队、每场游客短场和每个现代编创都有同样的时长、演员和功能。",
    },
    {
      id: "history-heading",
      type: "heading",
      level: 2,
      text: "军屯背景有据可查，唯一准确的诞生时间却没有",
    },
    {
      id: "history",
      type: "paragraph",
      text:
        "安顺屯堡社区与明代军屯制度有清楚的历史联系，地戏的征战题材与尚武动作也应放回这一背景理解。但这不能推出“今天的地戏就是明代军营操练原样保存”。贵州大学的研究指出，地戏形成时间没有直接文献记载，已有推断横跨多个时期。更诚实的结论是：军屯历史很重要，具体形成时间以及此后的每次变化仍属于研究问题。",
    },
    {
      id: "forehead-heading",
      type: "heading",
      level: 2,
      text: "脸子为什么在演员额头上？",
    },
    {
      id: "forehead",
      type: "paragraph",
      text:
        "要把证据能回答和不能回答的部分分开。它可以确认这种佩戴规范：官方记录明确写到演员首蒙青巾并把假面置于额前。它也能保存一种活态解释：顾家顺在2025年的具名采访中说，这个位置表达对所演人物的尊重。但现有材料不能证明一个获得历史与学界一致认可的最初原因。观众是否看得更清楚、声音如何传出、演员从哪里观察等实际现象，都不应在缺少合格来源时被升级成起源结论。",
    },
    {
      id: "mask-display-figure",
      type: "figure",
      src: "/images/guides/anshun-dixi-mask-performance-guide/tianlong-mask-display-1400.webp",
      alt: "2017年天龙屯堡石墙上陈列的一组彩色木雕面具",
      width: 1400,
      height: 1050,
      caption:
        "天龙屯堡旅游空间中的面具陈列，Huangdan2060摄于2017年8月8日；由CC BY 3.0原图缩放。原文件能确认地点和日期，不能证明每件面具的角色、年代、作者或当前陈列状态。",
    },
    {
      id: "system-heading",
      type: "heading",
      level: 2,
      text: "把六条通道一起读，不要拆成六个孤立符号",
    },
    {
      id: "system",
      type: "table",
      caption: "第一次观看的观察框架",
      columns: ["通道", "看什么", "它如何参与表演", "不要推定"],
      rows: [
        [
          "脸子（木雕面孔）",
          "轮廓、雕刻表情、头盔、耳部装饰、胡须，以及脸子在青巾上方的角度",
          "让远处观众识别角色，并在身体变化中维持固定的视觉身份",
          "一种颜色在所有戏堂都有统一含义，或外观可以证明年代",
        ],
        [
          "青巾（蒙面）",
          "演员的脸和颈部如何隐去，呼吸、观察与动作却继续发生",
          "把可见的角色面孔与下方演员本人的脸分开",
          "遮面抹去了演员，或单靠遮面就能解释全部仪式意义",
        ],
        [
          "领唱与帮腔",
          "谁推进叙事，周围声音何时回应",
          "把故事组织成集体声场，而不是一人独唱",
          "听不懂语言就意味着声音不重要，或每句唱词都属于一个角色",
        ],
        [
          "锣与鼓",
          "起止、速度变化、入场和武打重音",
          "用精简的声音系统组织注意力与身体节奏",
          "越响越快就一定是高潮",
        ],
        [
          "兵器与靠旗",
          "方向、伸展、间距、平衡，以及转身后柔性部件的延迟",
          "延长身体线条，让征战关系更容易看见",
          "表演兵器就是历史兵器实证，或游客可以触摸试用",
        ],
        [
          "全身与围场",
          "重心、步法、进退、同伴距离和观众边界",
          "提供固定木雕面孔无法逐刻变化的表达",
          "十分钟短场等同于村寨仪式的完整社会空间",
        ],
      ],
    },
    {
      id: "passes-heading",
      type: "heading",
      level: 2,
      text: "第一场演出，用五轮注意力去看",
    },
    {
      id: "passes",
      type: "list",
      ordered: true,
      items: [
        "第一分钟只看“脸上之脸”：你的注意力何时落在木雕上，又何时被青巾后的身体接走？",
        "选一位演员，跟随一次转身或交手，从脚、躯干一路看到兵器、靠旗和脸子如何连接。",
        "听完一组完整的领唱与帮腔，标记锣鼓在何处启动、打断或释放动作。",
        "找出一组角色关系：挑战、逼近、后退、护卫或对抗。先读间距和回应，再猜角色名。",
        "最后再查具名剧目或剧情简介，用节目证据修正观察，不要把每个动作都硬套进自己熟悉的故事。",
      ],
    },
    {
      id: "roles-heading",
      type: "heading",
      level: 2,
      text: "从角色类型提问，不照搬万能颜色表",
    },
    {
      id: "roles",
      type: "paragraph",
      text:
        "研究与实践者介绍常把不少地戏脸子归入文将、武将、老将、少将、女将等角色类型，不同剧目还会出现其他人物。这个分类应当带来一个问题，而不是一张速查表：在这部具名剧目中，哪种雕刻、头盔、胡须、姿态和行动让角色成立？不能把京剧脸谱规则直接套到木雕脸子上。需要准确识别时，应当查剧目、角色名和该戏堂自己的说明。",
    },
    {
      id: "story-heading",
      type: "heading",
      level: 2,
      text: "剧目是英雄征战文学，不是历史原始档案",
    },
    {
      id: "story",
      type: "paragraph",
      text:
        "国家非遗项目页列举的地戏题材包括三国、杨家将、岳家将等英雄征战传统。观看时可追踪一场戏怎样分配忠义、号令、冲突与回归；一段简短剧情梗概通常比很长的朝代年表更有用。一个舞台人物可能同时来自历史、传奇、通俗文学和地方传承。应记录实际唱本、剧目或折子的名称，不能把舞台动作当作“事情当年就是这样发生”的证据。",
    },
    {
      id: "lane-figure",
      type: "figure",
      src: "/images/guides/anshun-dixi-mask-performance-guide/tianlong-lane-1050.webp",
      alt: "2017年天龙屯堡水渠旁的石木建筑和公共巷道",
      width: 1050,
      height: 1400,
      caption:
        "天龙屯堡公共巷道，Huangdan2060摄于2017年8月8日；由CC BY 3.0原图轻微裁切和缩放。照片只提供有日期的地点环境，不能证明某栋建筑的年代、保护身份或当前开放状态。",
    },
    {
      id: "nuo-heading",
      type: "heading",
      level: 2,
      text: "地戏与傩戏：保留关系，不强画等号",
    },
    {
      id: "nuo",
      type: "paragraph",
      text:
        "国家名录给傩戏项目编号Ⅳ-89，给安顺地戏编号Ⅳ-90。这能证明两个独立的官方项目身份，不能证明二者在文化上完全隔绝。学界长期存在相反分类：有代表性论文题名主张安顺地戏并非傩戏，也有著作把贵州地戏放在“军傩”框架中；贵州大学的著作介绍还讨论了地戏与更广义傩仪式原型的关系。对游客最有用的做法是保留“安顺地戏”这个本地名称，只描述有证据的特征，不把“完全等同”或“彻底分离”写成定论。",
    },
    {
      id: "contexts-heading",
      type: "heading",
      level: 2,
      text: "不要让一种场景代表所有地戏",
    },
    {
      id: "contexts",
      type: "comparison",
      title: "四种相互关联但并不相同的场景",
      columns: [
        {
          heading: "村寨仪式序列",
          items: [
            "建立在社区与戏堂关系之中",
            "可能包含开场、正戏、收束等超出戏剧情节的环节",
            "不是随到随看的旅游商品，也不等于外来者可以进入私人仪式空间",
          ],
        },
        {
          heading: "天龙游客短场",
          items: [
            "近期官方报道描述过约十分钟的定时折子戏",
            "适合第一次辨认脸子、声音与身体动作",
            "不能替代完整村寨仪式，也不保证你抵达时一定有演出",
          ],
        },
        {
          heading: "受邀公共展演",
          items: [
            "可能为节庆、剧场、校园或公共节目调整",
            "应记录主办方、戏堂、剧目和明确标注的形式",
            "按公布的节目判断，不自动称为“完整”或“假”",
          ],
        },
        {
          heading: "现代编创",
          items: [
            "可能把地戏面具、动作或声音放入新编舞台作品",
            "应标明当代作品及其创作者",
            "不能把新创作描述为村寨仪式原样再现",
          ],
        },
      ],
    },
    {
      id: "tourism-context",
      type: "paragraph",
      text:
        "这种区分不是简单的“真/假”排名。关于天龙的同行评审研究记录了旅游如何让地戏在不同空间中移动，并改变演员、社区和运营主体之间的关系；研究还记载了早期演出地点之后，2009年建成专用的新演武堂。这段历史说明，地点、时长、观众和制度环境都应写进描述。游客短场可以是有价值的入门窗口，同时仍然不同于村寨仪式序列。",
    },
    {
      id: "dynamic",
      type: "callout",
      title: "天龙演出信息复核于2026年8月15日",
      body:
        "国家民委2026年7月3日的报道写到，天龙屯堡景区“演武堂”每天定时上演约十分钟地戏折子戏，但没有公布具体时刻、取消规则、语言支持，也没有承诺某个抵达时间一定能看到。它只能证明近期存在过这种游客短场，不能充当保证。若要让演出决定交通或后续预订，应先向当前运营方复核当天节目和准确场地。",
      tone: "warning",
    },
    {
      id: "before-heading",
      type: "heading",
      level: 2,
      text: "出发前，只复核真正影响决定的事实",
    },
    {
      id: "before",
      type: "list",
      ordered: true,
      items: [
        "确认当天项目究竟是地戏折子、完整舞台剧、讲解展示，还是没有演出。",
        "记录日期、准确场地、公布时长和运营方来源；转载日历或旧节庆报道不能替代当日确认。",
        "即使票务说明写着“含地戏”，也要把演出可用性单独核对；包含项目不等于每个到达时刻都有节目。",
        "询问中文剧目或折子名称，以及是否有剧情简介或口头介绍；不要默认提供英语或韩语支持。",
        "现场确认当期摄影和录像规则。本文不声称买票、公共场所或往年游客照片等于获得许可。",
        "准备一个即使没有演出仍值得完成的备选。若整趟行程只为看戏，应等到直接确认后再安排，而不是靠推断。",
      ],
    },
    {
      id: "recovery-heading",
      type: "heading",
      level: 2,
      text: "没有演出时，不要用陈列品制造一场“演出”",
    },
    {
      id: "recovery",
      type: "table",
      caption: "信息缺口下的安全回退",
      columns: ["发生什么", "可执行的下一步", "必须保留的边界"],
      rows: [
        [
          "无法确认当前演出",
          "如果公共空间本身仍符合路线，就把天龙当作地点参观；否则跳过",
          "不能把排练、商店陈列或旧视频说成今天的节目",
        ],
        [
          "看到没有物件标签的脸子陈列",
          "只描述可见雕刻和有日期的地点，再找作者、角色与陈列主体记录",
          "不能仅凭颜色推定年代、仪式使用史或具体人物",
        ],
        [
          "折子比预期短",
          "按它实际公布的形式命名，并使用六通道观察框架",
          "不能说短场完整再现村寨仪式",
        ],
        [
          "听不懂剧情",
          "先识别一组人物关系、一组帮腔和一个动作段落，再查剧目名",
          "不能根据服装或固定木雕表情编造翻译",
        ],
        [
          "摄影受限或规则不明",
          "收起相机，之后使用授权节目资料或有许可图片",
          "不能把入场当作肖像同意或发表许可",
        ],
      ],
    },
    {
      id: "respect-heading",
      type: "heading",
      level: 2,
      text: "观看不等于获准进入实践的每一层",
    },
    {
      id: "respect",
      type: "callout",
      title: "把参与者与物件边界看在眼里",
      body:
        "除非负责的实践者明确邀请，不要触摸脸子、兵器、戏服箱或仪式物件。村寨活动、开场或收束环节即使能从公共道路看到，也不等于可以直接进入。拍摄可识别人物、录制完整演出、发布儿童影像或复制节目单前都应另行询问。场馆规则、参与者同意和版权是彼此独立的许可。",
      tone: "warning",
    },
    {
      id: "after-heading",
      type: "heading",
      level: 2,
      text: "离场时留下六行可核验笔记",
    },
    {
      id: "after",
      type: "list",
      items: [
        "准确场景：村寨仪式、游客短场、受邀展演或现代编创。",
        "日期、场地、主办方或戏堂，以及发布节目的当期来源。",
        "具名剧目、折子，或者如实写“未获得剧目名”。",
        "脸子、青巾、唱腔、锣鼓、兵器与身体之间一个实际观察到的连接。",
        "节目单、实践者或物件标签说的一件事，与自己的观察分开记录。",
        "角色身份、脸子作者、拍摄许可或场次等未解决问题，继续保持未解决，不猜。",
      ],
    },
    {
      id: "evidence",
      type: "callout",
      title: "本文怎样区分证据与编辑方法",
      body:
        "项目身份和表演形态来自国家非遗项目页；形成时间的不确定性和仪式语境来自贵州大学研究；旅游空间变化来自同行评审地理学论文；近期天龙短场来自有明确日期的2026年国家部门报道。顾家顺的解释始终具名归于本人。六通道观察法、五轮注意力和回退表是Homeground编辑工具，不冒充实践者训练或专家审稿。",
      tone: "neutral",
    },
    {
      id: "links",
      type: "internal-links",
      title: "继续阅读有证据边界的表演指南",
      items: [
        {
          label: "把川剧变脸放回完整表演语境",
          href: "/zh/guides/sichuan-opera-face-changing-with-context/",
          description: "分清技法、舞台和当期节目证据，不把整场表演缩成“揭秘机关”。",
        },
        {
          label: "准备第一次看佛山醒狮",
          href: "/zh/guides/foshan-lion-dance-first-performance-workflow/",
          description: "用另一套初看流程复核团队身份、节目形式、声音、动作与安全边界。",
        },
        {
          label: "看懂中国遗产地的干预与证据",
          href: "/zh/guides/how-to-read-heritage-sites-in-china/",
          description: "继续练习把可见物件、所在语境与附着其上的文献主张分开。",
        },
      ],
    },
    {
      id: "consultation",
      type: "callout",
      title: "要在排日程前复核当前演出吗？",
      body:
        "把安顺日期、路线、语言需求，以及“十分钟短场是否足够”告诉Homeground。真人规划师可以核对当前运营方当天的信息，并保留一个仍值得走的备选，但不会承诺未经确认的演出或私人村寨访问。",
      tone: "neutral",
    },
    {
      id: "sources",
      type: "sources",
      title: "已复核的官方、保护机构、学术与图片来源",
      items: [
        {
          label: "安顺地戏——国家级非遗项目Ⅳ-90",
          url: "https://www.ihchina.cn/project_details/13391/",
          publisher: "中国非物质文化遗产网",
          reviewedAt: "2026-08-15",
        },
        {
          label: "傩戏（临武傩戏）——国家级项目Ⅳ-89",
          url: "https://www.ihchina.cn/project_details/13389/",
          publisher: "中国非物质文化遗产网",
          reviewedAt: "2026-08-15",
        },
        {
          label: "安顺地戏的社会文化解读",
          url: "https://acc.gzu.edu.cn/2013/1017/c5649a42597/page.htm",
          publisher: "贵州大学·张定贵",
          reviewedAt: "2026-08-15",
        },
        {
          label: "《屯堡地戏与屯堡族群社会：基于仪式视角的研究》",
          url: "https://press.gzu.edu.cn/2020/0303/c1503a131754/page.htm",
          publisher: "贵州大学出版社",
          reviewedAt: "2026-08-15",
        },
        {
          label: "《从仪式到展演：屯堡地戏的功能嬗变探赜》",
          url: "https://gzmz.cbpt.cnki.net/portal/journal/portal/client/paper/a4ad4c5c7b28c64de23b449b5823fe98",
          publisher: "《贵州民族大学学报》2025年第1期",
          reviewedAt: "2026-08-15",
        },
        {
          label: "《旅游背景下传统仪式空间生产的三元互动实践》",
          url: "https://www.geog.com.cn/CN/abstract/article/0375-5444/47828",
          publisher: "《地理学报》2020年第8期",
          reviewedAt: "2026-08-15",
        },
        {
          label: "《贵州安顺屯堡 六百年金戈铁马犹在耳》",
          url: "https://www.neac.gov.cn/seac/xwzx/202607/1192282.shtml",
          publisher: "国家民族事务委员会／中国民族报",
          reviewedAt: "2026-08-15",
        },
        {
          label: "顾家顺具名采访",
          url: "https://rb.gywb.cn/epaper/gyrb/res/2025-06/04/A08/gyrbgyrb20250604A08.pdf",
          publisher: "《贵阳日报》2025年6月4日",
          reviewedAt: "2026-08-15",
        },
        {
          label: "头图：贵州屯堡村寨蒙面地戏演员",
          url: "https://commons.wikimedia.org/wiki/File:Zhaopian01.jpg",
          publisher: "Yinwang888／Wikimedia Commons，CC BY-SA 4.0",
          reviewedAt: "2026-08-15",
        },
        {
          label: "图片：天龙旅游空间面具陈列",
          url: "https://commons.wikimedia.org/wiki/File:China_Guizhou_Tianlong_Tunpu_ancient_town8.jpg",
          publisher: "Huangdan2060／Wikimedia Commons，CC BY 3.0",
          reviewedAt: "2026-08-15",
        },
        {
          label: "图片：天龙屯堡公共巷道",
          url: "https://commons.wikimedia.org/wiki/File:China_Guizhou_Tianlong_Tunpu_ancient_town5.jpg",
          publisher: "Huangdan2060／Wikimedia Commons，CC BY 3.0",
          reviewedAt: "2026-08-15",
        },
        {
          label: "头图使用的CC BY-SA 4.0许可",
          url: "https://creativecommons.org/licenses/by-sa/4.0/",
          publisher: "Creative Commons",
          reviewedAt: "2026-08-15",
        },
        {
          label: "两张天龙实拍使用的CC BY 3.0许可",
          url: "https://creativecommons.org/licenses/by/3.0/",
          publisher: "Creative Commons",
          reviewedAt: "2026-08-15",
        },
      ],
    },
  ],
} as const satisfies StructuredPageBody;

export default body;
