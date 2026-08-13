import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead",
      type: "lead",
      text: "一顿典型南昌早餐，通常把两个独立项目放在一起：南昌拌粉，是煮好的米粉沥水后拌入底料和配菜；瓦罐汤，则是在小陶罐中煨制并连罐上桌的汤。南昌政府餐饮介绍多次把两者列为代表性本地早餐。它能证明这种搭配具有地方辨识度，却不能证明全城只有一种配方、一家店或一种汤。到柜台后，你真正要做的是确认米粉形式、按食材选择现有汤品，并在拌粉前决定辣度与份量。"
    },
    {
      id: "direct-answer",
      type: "callout",
      title: "第一次吃，直接点什么？",
      body: "先点一份南昌拌粉，再选一罐主料看得懂、当天有货的汤。肉饼汤、萝卜排骨汤或莲藕排骨汤在门店确有供应时，都是编辑判断上较容易理解的起点，不是官方排名。拌粉前先说少辣；若同行者只想尝味道，可以先两人分享一组，再决定是否加粉。",
      tone: "decision"
    },
    {
      id: "menu-heading",
      type: "heading",
      level: 2,
      text: "先读懂菜单上的“粉”"
    },
    {
      id: "menu-table",
      type: "table",
      caption: "几个相近名称，会端来不同早餐",
      columns: ["菜单用词", "实际上桌", "可以问"],
      rows: [
        ["南昌拌粉 / 拌粉", "米粉沥水后拌入调味底料和各店不同的配菜", "“辣椒已经拌进去了吗？”"],
        ["炒粉", "在锅里炒制，而不是沥水后拌底料；油感、温度和是否现炒由门店决定", "“这个是炒的吗？”"],
        ["汤粉", "米粉直接放在汤里，作为一碗上桌", "“这个本来就带汤吗？”"],
        ["瓦罐汤", "另点的小陶罐煨汤，不是煲仔饭或广义的砂锅菜", "“现在哪些瓦罐汤还有？”"]
      ]
    },
    {
      id: "meal-heading",
      type: "heading",
      level: 2,
      text: "按柜台顺序组成一顿早餐"
    },
    {
      id: "meal-workflow",
      type: "list",
      ordered: true,
      items: [
        "找到“南昌拌粉”或“拌粉”，直接指给店员看。只说“米粉”，可能得到炒粉或汤粉。",
        "在店员拌匀前决定辣度：少辣说“少辣”，完全不要说“不要辣椒”，想自己控制则说“辣椒另外放”。再确认底料里是否已经有辣椒油或辣酱。",
        "从汤单里找主料明确的选项。某家可核验南昌连锁的菜单列有肉饼、排骨、萝卜、莲藕、海带、茶树菇和鸡蛋等组合，但不同分店、日期的库存和做法都会变化。",
        "询问这一刻哪些汤还有。固定灯箱或线上产品页仍显示，不代表这罐汤当天未售罄。",
        "决定数量：食量正常的成人一粉一汤最直观；食量小的两人先分享一组，试吃风险更低。不要假设大小份，先问本店是否能选。",
        "按本店当日流程付款，收好号码牌或小票，并确认粉和汤是否需要在不同窗口领取。",
        "觉得味淡前先把粉彻底拌匀。底料常沉在米粉下面；另放的辣椒要逐步加，不要一次倒完。"
      ]
    },
    {
      id: "soup-heading",
      type: "heading",
      level: 2,
      text: "按食材与食量选汤，不设全城通用等级"
    },
    {
      id: "soup-comparison",
      type: "comparison",
      title: "三类实用选择",
      columns: [
        {"heading": "肉饼类", "body": "某家当前一手菜单可见纯肉饼、鸡蛋肉饼、香菇肉饼和皮蛋肉饼等。名字能明确主要蛋白，但仍可能有未写出的调味或配料；对鸡蛋、菌菇或加工肉有要求时要继续问。"},
        {"heading": "排骨类", "body": "萝卜、莲藕、海带或茶树菇可以和排骨搭配。可先选熟悉的蔬菜，并确认是带骨猪肉。菜名并不能证明它一定清淡、低盐或遵守一套固定汤底。"},
        {"heading": "陌生或时令瓦罐", "body": "点单前问清两个主要食材。手写菜名和时令汤可能很好吃，但不能凭照片、罐子颜色或邻桌外观判断肉类、过敏原或价格。"}
      ]
    },
    {
      id: "phrases-heading",
      type: "heading",
      level: 2,
      text: "六句话解决柜台上的实际问题"
    },
    {
      id: "phrases-table",
      type: "table",
      caption: "环境嘈杂时直接展示中文",
      columns: ["需求", "中文", "用途"],
      rows: [
        ["基本组合", "一份南昌拌粉，再要一罐这个汤。", "点一份粉和指中的一罐汤"],
        ["少辣", "拌粉少辣，谢谢。", "减少拌入的辣椒"],
        ["完全不辣", "不要辣椒，底料也不要辣。", "同时排除表面辣椒和辣底料"],
        ["辣椒另放", "辣椒另外放。", "自己逐步添加"],
        ["询问库存", "这个汤还有吗？没有的话，现在哪个有？", "从售罄项切换到现有汤"],
        ["询问食材", "这个汤里有什么？有花生、蛋或者猪肉吗？", "核对常见饮食限制" ]
      ]
    },
    {
      id: "scenarios-heading",
      type: "heading",
      level: 2,
      text: "两顿不靠猜的早餐"
    },
    {
      id: "traveller-scenarios",
      type: "comparison",
      title: "用同一组地方搭配适应不同旅客",
      columns: [
        {"heading": "一人出行、平时吃得清淡", "body": "点一份辣椒另放的拌粉，再从当天有货的汤里选一个熟悉食材。若想记住菜名，优先拍菜单文字而不是只拍食物；先尝拌匀后的底味，再加辣。"},
        {"heading": "家庭或多人试吃", "body": "第一轮粉的份数少于人数；只有店员确认食材后，才选两种不同瓦罐汤。全桌都把辣椒另放。看过实际份量再加粉，不要让一个人的耐辣度变成全组设定。"}
      ]
    },
    {
      id: "recovery-heading",
      type: "heading",
      level: 2,
      text: "汤卖完、太辣或点错时怎样恢复"
    },
    {
      id: "recovery-table",
      type: "table",
      caption: "不用推倒重来，先做下一件有效的事",
      columns: ["失败", "恢复方法"],
      rows: [
        ["想要的汤售罄", "问哪些罐子实际还有。可以在已知类别内换成另一种排骨汤或肉饼汤，但先确认新增食材。"],
        ["所有瓦罐汤都卖完", "仍想吃拌粉就保留并降低辣度，不要接受把无关汤品改叫“瓦罐汤”。另选一天再完成组合。"],
        ["粉比要求的辣很多", "停止加酱，从底部充分拌匀，并询问能否重做不放调料的一份。喝汤能调整整餐感受，却不能保证消除已经拌入的辣椒。"],
        ["拿到炒粉或汤粉", "把菜单或保存的“拌粉”文字给店员看。要求重做前先决定是否愿意保留当前菜，不要坚持所有米粉形式可以互换。"],
        ["份量比预期大", "先分享，不再追加。询问是否可打包并使用干净容器，不要把已经分享的食物倒回公共调料区。"],
        ["食材或过敏原仍不明确", "不要从照片推断。请店员核对配方，或换成标签更清楚的选项；厨房和共用器具仍可能发生交叉接触。"]
      ]
    },
    {
      id: "evidence-boundary",
      type: "callout",
      title: "有代表性，不等于全城都一样",
      body: "政府资料能够支持“拌粉配瓦罐汤”是有辨识度的南昌早餐，也记录了地方餐饮标准化和推广工作。它不能证明每家店配方相同、每种汤都有货，或获评品牌必然最好。本文汤品例子来自一家经营者官网在 2026 年 8 月 13 日可见的菜单；它是单店菜单证据，不是全市汤品清单。",
      tone: "warning"
    },
    {
      id: "final-check",
      type: "list",
      items: [
        "出发前核对具体分店是否仍在早餐时段供应拌粉与瓦罐汤；本文不假设全城统一营业时间。",
        "在菜单前确认“拌粉”、辣度、汤名、现货、数量和价格，再付款。",
        "有饮食限制时要询问底料、配菜和汤的完整食材，不只看菜名里写出的那一样。",
        "保存食物照片时，同时记店名、日期和小票或菜单上的准确名称。店员未确认的汤，只能标作“未识别瓦罐汤”。",
        "菜单、库存、份量、价格和分店营业时间最后核对于 2026 年 8 月 13 日，仍属动态信息。"
      ]
    },
    {
      id: "links",
      type: "internal-links",
      title: "继续学习地方早餐与餐桌方法",
      items: [
        {"label": "浏览 Homeground 中国指南", "href": "/zh/guides/", "description": "返回完整指南集合。"},
        {"label": "安排武汉热干面与豆皮早餐路线", "href": "/zh/guides/wuhan-breakfast-hot-dry-noodles-doupi-route/", "description": "比较另一种米粉/面食早餐和不同点单节奏。"},
        {"label": "选择一顿均衡的湖南菜", "href": "/zh/guides/hunan-cuisine-balanced-first-meal/", "description": "用另一套地域饮食方法管理辣度与菜品组合。"},
        {"label": "处理在中国的第一顿共享餐", "href": "/zh/guides/first-shared-meal-in-china/", "description": "把点菜、分享和付款方法带到多人正餐。"}
      ]
    },
    {
      id: "sources",
      type: "sources",
      title: "官方与一手来源（核对日期：2026 年 8 月 13 日）",
      items: [
        {"label": "南昌早餐：拌粉与瓦罐汤", "url": "https://sgj.nc.gov.cn/ncsgj/mlnc/202105/abbc06c46e8e47518fde111b31cae22f.shtml", "publisher": "南昌市市场监督管理局", "reviewedAt": "2026-08-13"},
        {"label": "南昌美食介绍", "url": "https://www.nc.gov.cn/ncszf/jrnc/202601/f817b2e448964eb59971056204e053cd.shtml", "publisher": "南昌市人民政府", "reviewedAt": "2026-08-13"},
        {"label": "关于推动南昌市餐饮业发展的实施意见", "url": "https://www.nc.gov.cn/ncszf/xxgkzcwj/201806/9c230f5447d44de184cf2da71eee89be.shtml", "publisher": "南昌市人民政府", "reviewedAt": "2026-08-13"},
        {"label": "当前产品菜单", "url": "https://www.wanfangyuan.com/chanpinzhongxin", "publisher": "万方圆", "reviewedAt": "2026-08-13"},
        { label: "题图左侧：南昌拌粉，N509FZ（CC BY-SA 4.0）", url: "https://commons.wikimedia.org/wiki/File:Stirred_rice_noodles_in_Nanchang_(20190619174747).jpg", publisher: "维基共享资源", reviewedAt: "2026-08-13" },
        { label: "题图右侧：南昌瓦罐汤早餐，Qa003qa003（CC BY-SA 4.0）", url: "https://commons.wikimedia.org/wiki/File:%E7%93%A6%E7%BD%90%E6%B1%A4_20150119_085552.jpg", publisher: "维基共享资源", reviewedAt: "2026-08-13" }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
