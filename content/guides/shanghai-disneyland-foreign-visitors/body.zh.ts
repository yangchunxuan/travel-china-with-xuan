import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead", type: "lead", text: "外国游客可以自己安排上海迪士尼，但一天里有两套系统：入园前是实名身份，入园后是项目优先级。护照记录、订单和官方渠道必须一致；进园后，官方App才是实时运营层。任何静态文章都不能保证你当天的项目、排队、演出或尊享卡产品。" },
  { id: "answer", type: "callout", title: "直接结论", tone: "decision", body: "只从上海迪士尼当前列明的官方渠道或授权合作方购票；护照信息逐字核对，并携带订单所用的护照原件。出发前安装官方App。选三个来自不同风险类型的必做体验，每个附近再配一个室内或低摩擦替代项；进园后让实时App决定顺序，不照搬旧攻略。" },
  { id: "before-heading", type: "heading", level: 2, text: "付款前：把正确的人绑定到正确日期" },
  { id: "identity", type: "table", caption: "实名链条", columns: ["记录", "检查", "意义"], rows: [["官方或授权订单", "园区、日期、产品和人数正确", "支付成功不代表每位游客实名完成"], ["护照", "姓名、号码和有效期与订单一致", "实名政策要求出示指定有效证件原件"], ["官方App账号", "能够登录并找到当前绑定或求助入口", "不同产品的绑定步骤可能变化"], ["同行分工", "明确谁的账号、订单和证件控制入园", "一部手机没电不能拖垮全组"]] },
  { id: "channels", type: "callout", title: "不要让搜索广告定义“官方”", tone: "warning", body: "度假区当前列出官网、App、微信公众号、预订中心以及指定官方商店和合作伙伴。应从度假区自己的渠道页开始。商家使用迪士尼图片或在标题里写“官方”，并不等于获得授权。" },
  { id: "passport", type: "list", ordered: true, items: ["按护照证件页输入姓名和号码，不用昵称或自行翻译名。", "付款前逐人核对日期和证件。", "保存订单号和官方客服入口，不传播清晰护照图。", "携带同一本护照原件；照片和复印件不能当作稳妥替代。", "查不到订单时，在前往闸机前通过原购买渠道或官方游客服务解决。"] },
  { id: "app-heading", type: "heading", level: 2, text: "准备App，但不要把一天押在一个按钮上" },
  { id: "app", type: "paragraph", text: "在酒店网络下安装并更新上海迪士尼度假区官方App，准备符合中国交通规定的充电宝。先熟悉营业时间、项目状态、娱乐演出、地图和游客服务入口。绑定、同行组队和付费通行流程可能随购票产品不同，应遵循实时提示，不要强行套用论坛截图。" },
  { id: "priorities-heading", type: "heading", level: 2, text: "建立“优先级三角”，不要做项目排名" },
  { id: "priorities", type: "comparison", title: "选择三种不同的记忆点", columns: [{ heading: "一个标志项目", body: "选即使其他计划改变也值得来的一项，并在当前App核对身高、健康和无障碍条件。" }, { heading: "一个氛围或角色目标", body: "主题区、巡游、角色或城堡时刻能在项目暂停时保住体验；时段和供应仍是实时事实。" }, { heading: "一个全组可参加体验", body: "真正适合全体同行者。不要假设儿童、长者或晕动者能快速恢复。" }] },
  { id: "morning", type: "paragraph", text: "进园后先开实时地图再走。如果标志项目运行且路径合理，就从那里开始；若暂停，立即转去附近预设替代项，不和同样等消息的人群一起耗着。上午尽量完成一个片区，别因为排队数字短暂下降而横穿全园。" },
  { id: "midday", type: "paragraph", text: "中午要真正吃饭并重新评估同行者。炎热、降雨、湿衣、低血糖和手机电量都能毁掉理论上的高效率。保留一个室内或坐下休息段，晚些时候再攻剩余必做项。夜间演出不能成为唯一可接受的结局。" },
  { id: "day-shapes", type: "table", caption: "三种可行的一日风格", columns: ["风格", "保住", "接受"], rows: [["首次精选", "一项标志项目、城堡/主题区氛围和一个演出目标", "不可能完成所有热门项目"], ["亲子节奏", "身高适配项目、吃饭、厕所、遮阴和安静恢复", "成人可能短时分组体验"], ["刺激项目优先", "两三项适合本人的高需求项目和就近路线", "角色、购物或完整巡游位置会减少"]] },
  { id: "failure-heading", type: "heading", level: 2, text: "恢复能力比完美顺序更重要" },
  { id: "failure", type: "table", caption: "计划出错时", columns: ["问题", "处理"], rows: [["护照与订单不符", "不要临时换身份；联系购买渠道或正门游客服务"], ["App找不到订单", "保留订单与护照，按对应产品的官方绑定帮助处理"], ["必做项目暂停", "先去附近替代项，稍后再看；暂停不等于承诺重开"], ["雨热改变行程", "转入预备的室内/坐下环节，先保安全和补水"], ["手机失效", "用第二部已充电设备、纸面订单信息和游客服务，不向陌生人交账号"]] },
  { id: "paid-access", type: "callout", title: "尊享卡是可选动态产品，救不了错误实名", tone: "neutral", body: "供应、包含项目、价格和条件都会变化。只有读完实时条款后，从度假区当前指定的直接渠道购买。付费产品不保证项目运行，也不会取消项目限制或替代购票护照。" },
  { id: "transport-boundary", type: "callout", title: "浦东机场到迪士尼由独立页面负责", tone: "neutral", body: "本页只管乐园当天，不重复机场接驳、不承诺末班地铁，也不鼓励把乐园和当日航班压在一起。请使用专门机场指南并留酒店备选。" },
  { id: "final-check", type: "list", items: ["每位游客都有日期与护照信息正确的确认订单。", "护照原件由同行者自己控制。", "官方App已更新登录，尽量准备第二部有电设备。", "当天日历、营业时间、项目限制和天气已重查。", "全组知道三个优先项、附近替代项、吃饭休息和返程方案。"] },
  { id: "links", type: "internal-links", title: "继续规划上海", items: [{ label: "浦东机场到上海迪士尼", href: "/zh/guides/pudong-airport-to-shanghai-disneyland/", description: "选择正确接驳终点和延误备选。" }, { label: "上海城市Hub", href: "/zh/destinations/shanghai/", description: "安排夜数、区域及乐园与市区关系。" }, { label: "浦东还是虹桥机场", href: "/zh/guides/shanghai-pudong-or-hongqiao-airport/", description: "为整个旅程选机场。" }, { label: "中国充电宝规则", href: "/zh/guides/china-power-bank-rules-flights-trains/", description: "让App有电，同时符合交通规定。" }, { label: "中国公共假期", href: "/zh/guides/china-public-holidays-travel-calendar/", description: "购票前检查高压日期。" }, { label: "上海住哪里", href: "/zh/guides/shanghai-where-to-stay-first-trip/", description: "平衡乐园日与其余市区任务。" }] },
  { id: "sources", type: "sources", title: "官方来源与图片署名", items: [{ label: "官方票务、授权渠道和证件原件规则", url: "https://www.shanghaidisneyresort.com/en/ticket/", publisher: "上海迪士尼度假区", reviewedAt: "2026-08-22" }, { label: "上海政府关于实名制的说明", url: "https://english.shanghai.gov.cn/en-Latest-WhatsNew/20241121/16891d39bb1e4c0aa66e65254027adc3.html", publisher: "上海市人民政府", reviewedAt: "2026-08-22" }, { label: "头图：Fayhoo拍摄的奇幻童话城堡，CC BY-SA 3.0", url: "https://commons.wikimedia.org/wiki/File:Enchanted_Storybook_Castle_of_Shanghai_Disneyland.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-22" }] }
] } as const satisfies StructuredPageBody;
export default body;
