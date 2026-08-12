import type { StructuredPageBody } from "@/lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead",
      type: "lead",
      text: "乌日汀哆（Urtiin Duu，中文通常称“蒙古族长调民歌”）是一种蒙古族声乐传统：延展的旋律线、丰富装饰和自由节拍，能让不多的歌词在很长的时间里展开。它由蒙古国与中国共同列入 UNESCO 非遗名录。在内蒙古，第一次接触可能发生在专题音乐会、非遗展演、剧场作品或旅游演出中。判断重点不是舞台看起来够不够“传统”，而是主办方能否说清唱的是什么、谁在唱、它位于怎样的节目中。"
    },
    {
      id: "direct-answer",
      type: "callout",
      title: "第一次听，怎样选最稳妥？",
      body: "优先选择官方剧院、公共文化机构、明确的非遗项目或具名院团；当前节目单应直接写“长调”“长调民歌”或 Urtiin Duu，并至少列出歌者或曲目。综合演出只要明确标注，也可以作为可信入门，但不等于长调专场。具体日期和票务必须回到主办方复核。",
      tone: "decision"
    },
    {
      id: "distinctions-heading",
      type: "heading",
      level: 2,
      text: "先分清宣传页常混在一起的四类声音"
    },
    {
      id: "form-comparison",
      type: "comparison",
      title: "一个标签能说明什么，不能说明什么",
      columns: [
        {"heading": "长调 / Urtiin Duu", "body": "声乐乐句延展、装饰丰富、音域宽且节拍较自由，歌词推进可能很慢。地域与歌者差异都重要；马头琴可以伴奏，但不是长调标签成立的必要条件。"},
        {"heading": "短调 / Bogino Duu", "body": "UNESCO 资料所称另一类主要蒙古族歌曲形式。旋律与歌词推进更紧凑，不应被看作“没唱好的”或被缩短的长调。"},
        {"heading": "呼麦 / Khoomei", "body": "以泛音效果为核心的另一种声乐实践。它可以和长调同场出现，但一段泛音演唱并不能证明该节目就是长调。"},
        {"heading": "综合草原舞台秀", "body": "可能组合歌曲、马头琴、舞蹈、马术、杂技和扩声剧场。节目里可以有长调，但服装、布景和“草原”标题不能替代声乐形式的明确标注。"}
      ]
    },
    {
      id: "credibility-heading",
      type: "heading",
      level: 2,
      text: "买票前做六项节目核验"
    },
    {
      id: "credibility-table",
      type: "table",
      caption: "购票前应该找到的证据",
      columns: ["核验项", "较强信号", "较弱或缺失的信号"],
      rows: [
        ["主办方", "官方剧院、文化馆、非遗机构、艺术院校或具名专业院团", "匿名转售者或找不到原始机构的转载"],
        ["形式", "节目明确写长调、长调民歌或 Urtiin Duu", "只写“蒙古音乐”“民族歌曲”或“草原盛典”"],
        ["人员", "列出歌者、院团、代表性传承人或创作团队", "只有模特、服装或泛化的群演图"],
        ["内容", "至少有一首曲名、曲目说明或节目段落", "只有宣传口号，没有流程"],
        ["语境", "说明是音乐会、非遗展示、晚会节目还是综合作品", "用“原生态”概括一切，却不定义对象"],
        ["时效", "主办方当前页面给出日期、场地和票务渠道", "旧海报、无日期短视频或旅行商复制的日程" ]
      ]
    },
    {
      id: "booking-heading",
      type: "heading",
      level: 2,
      text: "用一条短流程完成选择与复核"
    },
    {
      id: "booking-list",
      type: "list",
      ordered: true,
      items: [
        "先查主办方或场馆官网，再用票务平台完成交易，并保存原始节目页。",
        "寻找“长调”“长调民歌”或 Urtiin Duu。若只出现“马头琴”，你确认的是一种乐器，不是长调。",
        "记录歌者或院团和至少一首曲名。若未公布曲目，直接问这一场是否确定包含长调节目。",
        "辨认形式。两小时综合秀里的十分钟只能提供样本；专题音乐会或专场才能比较不同作品。",
        "只在确有需要时确认语言服务。译词有帮助，但没有完整字幕时仍可从气息、旋律轮廓和装饰音聆听。",
        "出行前一天重查日期、场地、开演时间、座位、退改和实名票规则。机构仍存在，不代表旧海报仍有效。"
      ]
    },
    {
      id: "listening-heading",
      type: "heading",
      level: 2,
      text: "沿着整段演唱听，而不是寻找一个“奇观效果”"
    },
    {
      id: "listening-timeline",
      type: "table",
      caption: "第一次听长调的时间线",
      columns: ["时刻", "可以听什么", "不要急着得出什么结论"],
      rows: [
        ["第一声之前", "曲名、歌者、地域语境，以及是否公布伴奏", "仅凭服装判断地域或传承谱系"],
        ["开句", "歌者怎样进入音高、怎样延展最初的音节", "只因速度慢就认定是长调"],
        ["第一条长乐句", "持续气息、旋律扩展，以及中文常称“诺古拉”的装饰性转折", "认定所有装饰都服从全国同一模板"],
        ["中段", "音区变化、张力与释放，以及有马头琴时声部如何互动", "把乐器当作无关背景，或反过来用乐器证明声乐体裁"],
        ["收束", "乐句怎样落定、停顿并在掌声前留下余韵", "把更响、更高自动等同于更可信"],
        ["演后", "对照节目单，保留准确节目名", "因为一段长调就把整场综合秀都称为长调" ]
      ]
    },
    {
      id: "current-example",
      type: "callout",
      title: "当前实例：先看形式，再看标题",
      body: "内蒙古艺术剧院 2026 年《千古马颂》演出季公告写明 5 月 1 日至 10 月 7 日演出，并说明作品包含马术、音乐、舞蹈、杂技等多种舞台元素。因此，它首先是一部大型综合作品，不是长调专场的证据。若当前节目单明确列出长调，可把该段作为综合作品中的入门样本。演出季资料核对于 2026 年 8 月 13 日；任何具体场次仍须向主办方确认。",
      tone: "neutral"
    },
    {
      id: "scenarios-heading",
      type: "heading",
      level: 2,
      text: "两位旅客，可以有两种合适的第一场"
    },
    {
      id: "traveller-scenarios",
      type: "comparison",
      title: "让节目匹配你能投入的注意力",
      columns: [
        {"heading": "在呼和浩特只有一个晚上", "body": "选择具名剧院或公共文化场馆，并确认至少有一段长调。节目透明的综合音乐会完全可以接受。提前知道歌者或曲名，现场把时间线用在该段，不要把整晚所有节目判作同一体裁。"},
        {"heading": "以音乐为主题的旅程", "body": "寻找长调专场、艺术院校活动、非遗周，或列出多位歌者与曲目的节目。只有主办方明确身份时，才比较地域或个人唱法；另加一场马头琴演出作为相关形式，而不是把它自动替代成长调。"}
      ]
    },
    {
      id: "after-heading",
      type: "heading",
      level: 2,
      text: "掌声之后继续理解"
    },
    {
      id: "after-list",
      type: "list",
      items: [
        "保存官方节目单、节目名、歌者和日期；失去这些语境的短视频很快就无法追溯。",
        "询问场馆是否有节目册、导赏或公开工作坊解释歌词与地域传统。",
        "先听同一作品的另一位具名歌者，再判断某种装饰是不是所有人都遵守的规则。",
        "如允许拍摄，只留少量个人参考，并遵守表演者、场馆和观众规则。购买门票不等于获得公开传播权。",
        "UNESCO 和中国非遗数据库适合说明体裁层面的语境；具体舞台编排则属于该次制作的艺术选择。"
      ]
    },
    {
      id: "failure-heading",
      type: "heading",
      level: 2,
      text: "节目含糊或临时变化时怎样恢复"
    },
    {
      id: "failure-table",
      type: "table",
      caption: "常见失败与下一步",
      columns: ["问题", "恢复方法"],
      rows: [
        ["卖家只说“蒙古族演出”，说不出体裁", "索取主办方节目单；若没有长调标注，只在你仍想看综合秀时购买。"],
        ["有马头琴演奏，但没有歌者", "把它当作相关器乐演出欣赏，不要改称为长调。"],
        ["公布的歌者或曲目被替换", "索取新节目单，再判断剩余内容是否仍符合目的。"],
        ["活动取消", "回到官方剧院或文旅机构日历找下一场具名活动，不接受无来源转售者的替代承诺。"],
        ["没有译词", "关注乐句长度、音区、装饰、停顿和伴奏；演后寻找官方文本，不用自动字幕猜蒙古语歌词。"],
        ["禁止拍摄", "保存书面节目信息并专心聆听。没有自己的影像，不等于没有可靠证据。"]
      ]
    },
    {
      id: "boundary-callout",
      type: "callout",
      title: "可信不等于冻结在过去",
      body: "麦克风、音乐厅和当代编配不会自动使活态传统失真；反过来，户外草原、马匹、蒙古袍式服装或“非遗”二字，也不能保证一段声乐就是长调。Homeground 判断的是节目身份是否透明、是否可追溯，而不是给表演者或社群打“纯度分”。",
      tone: "warning"
    },
    {
      id: "links",
      type: "internal-links",
      title: "继续安排现场文化体验",
      items: [
        {"label": "浏览 Homeground 中国指南", "href": "/zh/guides/", "description": "返回完整指南集合。"},
        {"label": "选择第一场佛山醒狮表演", "href": "/zh/guides/foshan-lion-dance-first-performance-workflow/", "description": "使用另一套主办方与节目核验方法。"},
        {"label": "查看中国公共假期旅行日历", "href": "/zh/guides/china-public-holidays-travel-calendar/", "description": "预判节庆客流和排期变化。"},
        {"label": "准备在中国购买门票的支付方式", "href": "/zh/guides/how-to-pay-in-china-as-a-tourist/", "description": "购买当前演出时保留备用支付。"}
      ]
    },
    {
      id: "sources",
      type: "sources",
      title: "官方与机构来源（核对日期：2026 年 8 月 13 日）",
      items: [
        {"label": "蒙古族长调民歌 Urtiin Duu", "url": "https://ich.unesco.org/en/RL/urtiin-duu-traditional-folk-long-song-00115", "publisher": "UNESCO 非物质文化遗产", "reviewedAt": "2026-08-13"},
        {"label": "蒙古族长调民歌项目档案", "url": "https://www.ihchina.cn/project_details/12410.html", "publisher": "中国非物质文化遗产网", "reviewedAt": "2026-08-13"},
        {"label": "蒙古族马头琴音乐", "url": "https://ich.unesco.org/en/RL/traditional-music-of-the-morin-khuur-00068", "publisher": "UNESCO 非物质文化遗产", "reviewedAt": "2026-08-13"},
        {"label": "内蒙古艺术剧院", "url": "https://www.nmgysjygw.cn/", "publisher": "内蒙古艺术剧院", "reviewedAt": "2026-08-13"},
        {"label": "《千古马颂》2026 演出季公告", "url": "https://www.nmg.news.cn/20260117/43bec76a82594f209a9224759a314329/c.html", "publisher": "新华网内蒙古频道", "reviewedAt": "2026-08-13"}
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
