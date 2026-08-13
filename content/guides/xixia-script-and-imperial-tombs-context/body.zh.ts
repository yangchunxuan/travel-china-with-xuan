import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead",
      type: "lead",
      text: "西夏陵（Xīxià Líng）并没有把一部完整王朝史刻在同一座纪念物上。贺兰山东麓分布着不同保存状态的夯土陵塔、陪葬墓、防洪设施、建筑遗迹、出土器物和西夏文字残片。该遗产于 2025 年列入《世界遗产名录》。现场阅读的关键，是把这些线索接起来，又始终区分三层：今天能直接看见什么、考古发掘记录了什么、研究者据此推断了什么。"
    },
    {
      id: "direct-answer",
      type: "callout",
      title: "残缺证据能复原一个文明吗？",
      body: "可以建立相互关联、但不完整的认识。可辨读的文字能够确认语言、称谓、年代或制度表达；器物说明材料、工艺和仪式语境；陵区景观显示皇家墓地如何规划。但三类证据都不能自动认定每座墓的主人，也不能完整复原所有仪式或概括全部西夏人的信仰。",
      tone: "decision"
    },
    {
      id: "triangle-heading",
      type: "heading",
      level: 2,
      text: "先建立文字—器物—景观证据三角"
    },
    {
      id: "evidence-triangle",
      type: "comparison",
      title: "三类证据回答不同问题",
      columns: [
        {"heading": "文字", "body": "西夏文和汉文铭刻在残片可读时，能够留下姓名、称谓、日期、宗教或制度用语。残片只能支持可辨文字和有记录的出土语境；博物馆译文属于释读，不是原物表面本身。"},
        {"heading": "器物", "body": "建筑构件、雕塑残件、陶瓷、金属器和随葬品可说明制作、交流、身份与实践。器物最强的解释力来自发掘层位和共存关系，不能只凭它像某件后世作品。"},
        {"heading": "景观", "body": "世界遗产范围包括 9 座帝陵、271 座陪葬墓、北端建筑遗址和 32 处防洪工程。它们的分布显示贺兰山麓经过规划的使用方式，但平面布局本身不能给每位使用者和每场活动命名。"}
      ]
    },
    {
      id: "confidence-heading",
      type: "heading",
      level: 2,
      text: "讲故事前先给结论标置信度"
    },
    {
      id: "confidence-table",
      type: "table",
      caption: "读展签、听讲解和做笔记都能使用的证据等级",
      columns: ["标签", "成立条件", "合适表述"],
      rows: [
        ["现场可见", "遗迹或器物可直接观察，且身份由场馆说明", "“现存夯土芯体……”"],
        ["发掘记录", "正式考古资料记录了语境、尺寸或出土物", "“发掘记录显示……”"],
        ["相互印证", "不同类型证据指向同一结论", "“铭文与出土语境共同支持……”"],
        ["归属判断", "研究者以间接证据判断人物、年代或功能", "“被推定为……”或“可能属于……”"],
        ["研究推测", "解释合理，但仍可被新材料修正", "“该建筑群被推测为……”"],
        ["尚不明确", "现存资料无法解决问题", "写“尚无可靠认定”，不要替证据补空白"]
      ]
    },
    {
      id: "site-order-heading",
      type: "heading",
      level: 2,
      text: "先在博物馆读证据，再到户外读地平线"
    },
    {
      id: "site-order",
      type: "list",
      ordered: true,
      items: [
        "先看遗址总图，确认贺兰山、9 座帝陵、陪葬墓区、北端建筑遗址和防洪体系的位置，不要一开始只追逐最上镜的陵塔。",
        "找一件西夏文字实例并与汉文对照。可以观察它独立的字形系统，但不能凭外形假装自己已经译出字符。",
        "挑一件出土地点清楚的器物，记录材质、墓号或遗址号，并确认展出的是原件、复制品还是复原品。",
        "到户外后，把原有遗存、保护加固、参观栈道分开。整齐的边缘、台阶或平台可能是现代管理设施。",
        "借山势和防洪工程理解选址与环境适应。空间关系是证据；若要声称所有轴线都有同一种象征意义，则需要明确出处。",
        "结束前回看一条展签，判断它的结论来自文字、器物、空间比较，还是几类证据合用。"
      ]
    },
    {
      id: "cases-heading",
      type: "heading",
      level: 2,
      text: "四个实例说明措辞为什么重要"
    },
    {
      id: "cases-table",
      type: "table",
      caption: "官方记录能确认什么，又在哪里止步",
      columns: ["案例", "官方证据支持的内容", "仍须保留的边界"],
      rows: [
        ["3 号陵", "2000—2001 年对地面建筑遗存的清理发掘，进一步明确了部分形制与营造方法", "建筑形制本身不能完整复原每项仪式"],
        ["6 号陵", "1972—1975 年及 2007—2008 年进行过发掘；相关铭文被用来推定其与李德明有关", "墓主人应写成“推定”或“归属判断”，不应当作毫无争议的认定"],
        ["北端建筑遗址", "发掘记录了一组高等级建筑，并在该区域发现西夏文和汉文碑刻残片", "“祖庙遗址”是研究解释，不是原建筑留存下来的名称牌"],
        ["鎏金铜牛", "出土于 MIII-107 号陪葬墓，可证明特定墓葬语境和精湛金属工艺", "一件精英随葬器不能代表普通家庭，也不能证明单一、固定的“民族风格”"]
      ]
    },
    {
      id: "misread-callout",
      type: "callout",
      title: "不要让“复原”在观看中隐身",
      body: "复原图、模型、数字场景或补出的轮廓能帮助理解已消失建筑，但必须明确标注。应继续追问：哪些部分依据发掘基址，哪些来自比较研究，哪些只是为了可视化而做的选择。世界遗产材料强调遗址原位环境与存留材质，不等于游客今天看见的每个表面都是未经干预的中世纪原构。",
      tone: "warning"
    },
    {
      id: "scenarios-heading",
      type: "heading",
      level: 2,
      text: "两种可执行的参观方案"
    },
    {
      id: "traveller-scenarios",
      type: "comparison",
      title: "按时间选择证据深度",
      columns: [
        {"heading": "第一次来、只有两小时", "body": "在博物馆学会读一件文字残片和一件出土地点明确的器物，再去一处帝陵区域和能看见贺兰山背景的观察点。目标是完成证据三角，而不是匆忙集齐九座帝陵。"},
        {"heading": "考古兴趣较强", "body": "出发前下载 UNESCO 地图并记录遗址编号。看展时逐项记发掘批次、出土地点、修复状态和置信度措辞；到场后询问实际开放区域，不要假定申遗范围全部都能进入。"}
      ]
    },
    {
      id: "recovery-heading",
      type: "heading",
      level: 2,
      text: "遇到常见证据失误时怎样恢复"
    },
    {
      id: "recovery-list",
      type: "list",
      items: [
        "若讲解员十分确定地说出墓主人，追问是哪条铭文或哪份发掘记录支持，并看官方展签是否写着“推定”。没有答案时宁可保留未知。",
        "若器物在展柜里离开了出土语境，在允许范围内记下藏品号、墓号或遗址号；造型相似不能代替来源。",
        "若复原画面看起来十分完整，寻找图例，把有考古依据的部分和推测部分分别记录。",
        "若有人把西夏文说成完全无人能读的“神秘文字”，要知道学者已能阅读大量西夏文献；陵区的困难常在残片保存和语境，而不是文字从未被释读。",
        "若天气、保护工程或路线调整导致户外区域关闭，就在博物馆完成文字与器物两边，再用官方地图补空间关系；不要跨越围栏“核实”。",
        "行前再次核对博物馆现名、票务、接驳、开放陵区和临时保护公告。运营信息最后核对于 2026 年 8 月 13 日。"
      ]
    },
    {
      id: "final-check",
      type: "callout",
      title: "离开前写下五行",
      body: "记一条可辨文字支持的结论、一件来源清楚的器物、一项景观关系、一条带置信度标签的解释，以及一个仍未解决的问题。这五行比用无标记猜测拼成的顺滑故事，更接近诚实的西夏文明复原。",
      tone: "decision"
    },
    {
      id: "links",
      type: "internal-links",
      title: "继续进行证据导向的遗产参观",
      items: [
        {"label": "浏览 Homeground 中国指南", "href": "/zh/guides/", "description": "返回完整指南集合。"},
        {"label": "安排良渚古城遗址公园与博物院顺序", "href": "/zh/guides/liangzhu-ruins-park-and-museum-sequence/", "description": "比较另一组博物馆—遗址景观证据链。"},
        {"label": "读懂青铜礼器与铭文", "href": "/zh/guides/ritual-bronze-vessels-and-inscriptions/", "description": "练习把文字、器物和考古语境放在一起。"},
        {"label": "选择云冈石窟洞窟与博物馆顺序", "href": "/zh/guides/yungang-grottoes-cave-order-and-museum/", "description": "在另一处大型遗产中应用证据和保护边界。"}
      ]
    },
    {
      id: "sources",
      type: "sources",
      title: "官方来源（核对日期：2026 年 8 月 13 日）",
      items: [
        {"label": "西夏陵世界遗产项目", "url": "https://whc.unesco.org/en/list/1736", "publisher": "UNESCO 世界遗产中心", "reviewedAt": "2026-08-13"},
        {"label": "西夏陵申报档案", "url": "https://whc.unesco.org/en/documents/206074", "publisher": "UNESCO 世界遗产中心", "reviewedAt": "2026-08-13"},
        {"label": "西夏陵考古工作概述", "url": "https://whhlyt.nx.gov.cn/xxfb/wlyw/202311/t20231113_4347356_zzb.html", "publisher": "宁夏回族自治区文化和旅游厅", "reviewedAt": "2026-08-13"},
        {"label": "西夏考古与碑刻残片", "url": "https://www.nopss.gov.cn/n1/2026/0121/c461625-40649844.html", "publisher": "全国哲学社会科学工作办公室", "reviewedAt": "2026-08-13"},
        {"label": "西夏陵博物馆参观概览", "url": "https://www.yinchuan.gov.cn/sshc/lyjd/zdwbcs/202511/t20251125_5090985.html", "publisher": "银川市人民政府", "reviewedAt": "2026-08-13"},
        { label: "题图：西夏陵区景观，Thebrainchamber1（CC BY-SA 4.0）", url: "https://commons.wikimedia.org/wiki/File:Western_Xia_mausoleums_3.jpg", publisher: "维基共享资源", reviewedAt: "2026-08-13" }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
