import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead",
      type: "lead",
      text: "变脸是川剧的一部分，却不能替代整种艺术。一次有用的初看，应让你注意演员如何说、唱、走动并塑造角色，不论现场有没有快速换脸。选择时应看有名称的剧团、剧目片段和节目形式，而不是售票页上最大的面具照片。只要节目如实说明内容，游客向演出也可以成为容易进入的第一次接触。",
    },
    {
      id: "direct-answer",
      type: "callout",
      tone: "decision",
      title: "先核对语境，再追求奇观",
      body: "优先选择写清制作方或剧团、场馆、日期、剧目或节目、约略时长和购票条款的页面。若还提供演员、梗概和语言辅助，证据更完整。现场演出会换演员、调节目，入场前仍应通过一手渠道复核当日安排。",
    },
    {
      id: "three-questions",
      type: "list",
      ordered: true,
      items: [
        "演出者是哪家剧团、公司或制作方？",
        "这是川剧折子戏、游客向综合节目，还是篇幅较长的完整制作？",
        "目前包含哪些有名称的场次或其他表演元素？",
      ],
    },
    { id: "formats-heading", type: "heading", level: 2, text: "三种形式，不是三档“纯正度”" },
    {
      id: "formats",
      type: "table",
      caption: "先弄清节目承诺，再决定是否购买",
      columns: ["形式", "通常能看到什么", "更适合谁", "主要局限"],
      rows: [
        ["完整剧目或篇幅较长的制作", "连续故事、人物发展、唱念与整体配合", "愿意先读梗概并跟随一部作品的观众", "语言和时长门槛较高，而且未必有变脸"],
        ["折子戏或以川剧为主的精选晚会", "多个有名称的片段，用来呈现不同角色或技艺", "最稳妥的普通初看选择", "片段间的剧情可能被压缩，要核对提供多少背景"],
        ["游客向综合节目", "短川剧片段或绝活，与音乐、木偶、杂技等组合", "时间有限或同行兴趣不同的旅客", "不能因此声称看过一部完整川剧"],
      ],
    },
    {
      id: "formats-boundary",
      type: "paragraph",
      text: "这些是节目形式，不是“真假”排名。训练扎实的演员可能在不同形式中工作，游客场景也不能证明表演者缺乏专业训练。反过来，华丽装修和“正宗变脸”四个字同样没有说明剧目。三个问题暂时答不上来，不等于演员不好，只说明买家还无法判断节目。诚实的形式标签比场馆看起来多传统更重要。",
    },
    { id: "context-heading", type: "heading", level: 2, text: "变脸周围还有什么" },
    {
      id: "context-vocabulary",
      type: "paragraph",
      text: "国家级非遗记录以高腔、胡琴、弹戏、昆曲和灯调五种主要声腔来描述川剧。这并不表示每晚都要把五种声腔轮流展示；一部戏或一个片段会按剧情与制作需要选择，地区传承和不同剧团的声音也不相同。官方记录提供的是理解词汇，不是让初看者仅凭耳朵给每一段分类。",
    },
    {
      id: "context-actor",
      type: "paragraph",
      text: "除了旋律，还应听念白如何推动情节与身份，唱腔怎样改变人物情绪，打击乐如何标记出场、动作、紧张和喜剧节奏。步幅、目光、行走方式、衣袖、扇子等，也可能在翻译梗概追上以前就建立角色。川剧以演员为中心，声音、节奏与受控制的身段共同工作。没有节目自身解释时，不要把每种服装颜色都解码成全国固定符号。",
    },
    {
      id: "face-changing-boundary",
      type: "callout",
      tone: "warning",
      title: "一种技艺，不是整种川剧",
      body: "变脸只是较大表演词汇中的一种特殊技艺。它的戏剧价值取决于角色与场景，而不是换了多少次。Homeground 不解释受到保护的操作机制，也不鼓励逐帧拍摄，更不会用绝活清单代替剧目名称。",
    },
    { id: "timeline-heading", type: "heading", level: 2, text: "按六个时间点观看" },
    {
      id: "timeline",
      type: "table",
      caption: "从节目身份走到一条可核实的观察",
      columns: ["时间点", "该做什么", "避免什么误区"],
      rows: [
        ["开场前", "保存一手节目页，记录剧团、剧目或片段、场馆与时长，并读一段短梗概", "只依赖转售标题，或试图背完所有人物生平"],
        ["入场时", "看现场通知或询问演员与节目是否仍按公布安排", "把正常的现场替换归咎于整种艺术"],
        ["开场几分钟", "观察步速、姿态、目光、出场和乐师或其他演员的反应", "没看演员就先把场景简化成服装符号"],
        ["唱念开始", "跟踪谁对谁说话、声腔何时变化、对方如何回应", "整场盯着机器翻译屏幕"],
        ["绝活出现", "问场景里的身份、情绪、威胁、隐藏或揭示发生了什么变化", "只数效果而不理解表演作用"],
        ["谢幕后", "记录一个有名称的片段、一个演员选择和一个声音或动作提示", "最后只记得“面具换得很快”"],
      ],
    },
    { id: "credibility-heading", type: "heading", level: 2, text: "用一条克制的证据梯子判断节目" },
    {
      id: "credibility",
      type: "comparison",
      title: "身份信息比华丽宣传更有用",
      columns: [
        { heading: "较强识别", items: ["有名称的剧团或制作方", "有名称的剧目或片段", "在提供时列出演员", "场馆、日期与一手公告或预订渠道"] },
        { heading: "有用辅助", items: ["剧情梗概或节目单", "约略时长", "语言辅助与摄影规则", "如实标明综合节目或折子戏形式"] },
        { heading: "单独看很弱的信号", items: ["华丽的仿古剧场装修", "不附剧目的“数百年历史”", "面具特写照片", "转售评论或礼宾人员保证"] },
      ],
    },
    {
      id: "repertoire-check",
      type: "paragraph",
      text: "四川省艺术研究院项目维护的川剧剧目辞典，可帮助核对一个中文标题是否属于已有记录的剧目，却不能保证你将看到哪个版本、长度、舞台处理或演员。带日期的专业节目可以证明当时公布过某个制作，不能冻结未来场次。官方名录确认川剧这一艺术形式，也不会替每场商业演出认证。",
    },
    { id: "scenarios-heading", type: "heading", level: 2, text: "两种实际的首看选择" },
    {
      id: "scenarios",
      type: "comparison",
      title: "按准备程度与时间选择",
      columns: [
        { heading: "只有一晚，中文有限", body: "选择有一手渠道、写明时长并提供梗概或介绍的折子戏或综合节目。把变脸当作其中一段，再刻意观察一个唱段或喜剧片段里的身段与打击乐。这是合理入门，不代表已经全面看过川剧。" },
        { heading: "愿意为戏剧做准备", body: "寻找公开发布且写明剧名与演员的专业剧团制作。先读梗概、留出更长晚上，也接受最佳选择可能没有变脸。连续剧情能让人物与音乐判断逐步发展，而不是几分钟就重置一次。" },
      ],
    },
    { id: "recovery-heading", type: "heading", level: 2, text: "现场与售票页不一致时如何恢复" },
    {
      id: "recovery",
      type: "table",
      caption: "保护观看任务，不替过期销售文案责怪演员",
      columns: ["问题", "立即处理", "证据边界"],
      rows: [
        ["宣传的变脸节目取消", "询问是否公布变更及售方明示的退换条款；若留下，转看一个有名称的片段", "节目调整不能否定其他演员或整种川剧"],
        ["没有英文字幕", "索取中文节目单或获准使用的梗概，入场前确认人物名与基本冲突", "机器翻译只用于定位，不是权威剧本"],
        ["把综合节目误当完整川剧", "记录哪些片段被明确标为川剧，以剧团或片段名称寻找下一次长演出", "一手页面如实说明时，不能事后称其欺诈"],
        ["打击乐或人群令人不适", "演前询问远离音箱的座位与能否临时离场，必要时自备听力保护", "小剧场或茶馆不等于安静"],
        ["禁止拍摄", "遵守场馆与演员规则，使用授权节目册或获准的官方媒体", "别人拍摄不等于你获得许可"],
      ],
    },
    { id: "conclusion-heading", type: "heading", level: 2, text: "证据允许你得出什么结论" },
    {
      id: "conclusion",
      type: "paragraph",
      text: "非遗记录支持已有声腔、表演特征和技艺的存在；带日期的节目只能证明某个制作在当时被公布；场馆一手说明只支持其在复核日公开的内容。它们都不能证明未来演员不变、某场“最正宗”或一段绝活代表全部传统。演出结束后，如果能说出节目形式、至少一个片段或剧团，并解释变脸在戏剧情境内或情境外起了什么作用，你得到的就是下一次观看的基础，而不只是一张传播图片。",
    },
    {
      id: "help",
      type: "callout",
      tone: "neutral",
      title: "需要核对当期演出？",
      body: "把日期、城市、语言需求和可接受的演出时长告诉 Homeground，真人策划者可以复核一手节目，而不会承诺一种绝活代表整种川剧。节目、演员、时间、语言辅助、票务与摄影规则于 2026 年 8 月 13 日复核，仍须按演出日期再次确认。",
    },
    {
      id: "links",
      type: "internal-links",
      title: "继续在语境中理解现场表演",
      items: [
        { label: "选择第一次内蒙古长调演出", href: "/zh/guides/inner-mongolia-long-song-first-performance/", description: "同样从形式、表演者和聆听任务开始核验。" },
        { label: "看懂第一次佛山醒狮表演", href: "/zh/guides/foshan-lion-dance-first-performance-workflow/", description: "不要让一种传播性技艺代替整项传统。" },
        { label: "安排北京、西安与成都的顺序", href: "/zh/guides/beijing-xian-chengdu-route-order/", description: "判断成都的演出晚上适合放在整段行程哪里。" },
        { label: "看懂安顺地戏脸子与第一场表演", href: "/zh/guides/anshun-dixi-mask-performance-guide/", description: "从脸子、遮面、声音、锣鼓和身体读另一种面具表演，不让单一视觉效果代替全貌。" },
      ],
    },
    {
      id: "sources",
      type: "sources",
      title: "官方与独立来源",
      items: [
        { label: "川剧国家级非物质文化遗产记录", url: "https://www.ihchina.cn/Article/Index/detail?id=13161", publisher: "中国非物质文化遗产网", reviewedAt: "2026-08-13" },
        { label: "四川省艺术研究院", url: "https://www.scyishu.org.cn/", publisher: "四川省艺术研究院", reviewedAt: "2026-08-13" },
        { label: "2023 年四川省首届川剧汇演剧目评论", url: "https://www.scyishu.org.cn/index.php?a=show&c=index&catid=112&id=497&m=content", publisher: "四川省艺术研究院", reviewedAt: "2026-08-13" },
        { label: "2026川剧百台大戏", url: "https://www.yscz.org.cn/Home/News?id=db65b602-adf7-4c54-a144-8c7f09c2e270", publisher: "国家艺术基金项目中心", reviewedAt: "2026-08-13" },
        { label: "四川文化和旅游官方渠道", url: "https://wlt.sc.gov.cn/", publisher: "四川省文化和旅游厅", reviewedAt: "2026-08-13" },
        { label: "川剧演员技艺研究章节", url: "https://academic.oup.com/hong-kong-scholarship-online/book/22201/chapter-abstract/182370455", publisher: "Oxford Academic", reviewedAt: "2026-08-13" },
        { label: "首图来源：2018 年成都川剧演出实拍", url: "https://commons.wikimedia.org/wiki/File:Sichuan_opera_Chengdu.jpg", publisher: "Wikimedia Commons／Xiquinho Silva", reviewedAt: "2026-08-13" },
        { label: "首图的 CC BY 2.0 许可", url: "https://creativecommons.org/licenses/by/2.0/", publisher: "Creative Commons", reviewedAt: "2026-08-13" },
      ],
    },
  ],
} as const satisfies StructuredPageBody;

export default body;
