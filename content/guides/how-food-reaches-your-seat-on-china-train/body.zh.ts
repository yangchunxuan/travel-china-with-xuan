import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {schemaVersion: "1.0.0", blocks: [
  {id: "answer-first", type: "lead", text: "12306 列车餐食配送是一场按时刻衔接的接力，不是外卖员追着列车跑。当前平台会根据你输入的行程，显示可配送的车站和商家：商家制作餐食，车站配送人员完成受控交接，再由铁路工作人员或车站配送链把餐食送到记录的车厢和座位。如果当前行程没有返回可选服务，就不要把另一趟列车或旧车站清单套用过来。"},
  {id: "relay", type: "table", caption: "订单会在明确节点之间交接", columns: ["环节", "发生什么", "主要失败风险"], rows: [
    ["匹配行程", "输入真实车次和日期，或选择与订单关联的行程。", "车次、日期或乘车人记录选错。"],
    ["选择配送站", "只能从当前平台返回的车站中选择。", "误以为每个停靠站都能供餐。"],
    ["商家备餐", "被选商家接受订单并制作餐食。", "商家截止时间更早，或商品售罄。"],
    ["车站交接", "餐食赶在列车到来前进入车站铁路配送流程。", "备餐过晚或列车运行受扰。"],
    ["列车交接", "餐食按车次、车厢和座位匹配。", "座位或联系方式错误。"],
    ["送到座位", "餐食按服务流程送到记录的位置。", "换座或联系不上乘客，导致识别延误。"]
  ]},
  {id: "cutoff", type: "callout", title: "社会商家的 60 分钟规则，以配送站为基准", body: "当前 12306 餐饮服务协议规定，社会商家供应的餐食或特产，在列车从配送站正点开车前 60 分钟内不能下单或退单；商家还可以设定更早的截止时间。这不是从你的出发站开车前 60 分钟，也不能推广成所有铁路自营餐食的统一规则。请以实际商品页面显示的截止时间为准。", tone: "warning"},
  {id: "order-method", type: "list", ordered: true, items: [
    "打开当前铁路 12306 的餐饮·特产入口，并匹配实际行程。",
    "只使用系统为该车次和日期返回的配送站及商家。",
    "核对列车从配送站开出的时间，以及商家页面显示的截止时间。",
    "付款前确认乘车人、可正常接听的手机号、车厢和座位；无座旅客须填写车次、车厢和联系电话。",
    "保存订单记录，并查看商家接受还是拒绝订单。协议规定，商家在营业时间内有 10 分钟确认；已付款订单逾时未确认会自动拒单并退款。",
    "车次、车厢或座位发生变化时，单独打开餐食订单核对配送记录；不要以为车票变更会自动更新餐单。"
  ]},
  {id: "not-guaranteed", type: "heading", level: 2, text: "先判断餐食配送是增加选择，还是已经变成不可失败的依赖"},
  {id: "not-guaranteed-copy", type: "comparison", title: "配送适合增加选择；失败后果严重时应自带餐食", columns: [
    {heading: "可以考虑配送", items: ["当前行程返回了后续可配送车站和商家。", "联系方式、支付、车次、车厢和座位信息均能正常使用。", "你能使用结账页当前提供的支付方式，并接受平台规定的售后流程。"]},
    {heading: "更适合携带已确认的餐食", items: ["严重过敏、严格饮食或服药时间使这餐不能失败。", "联系方式或支付验证不确定。", "唯一可用的配送站时间很紧，或行程可能变更。"]}
  ]},
  {id: "fallback", type: "table", caption: "订单不顺利时的安全备选", columns: ["问题", "应怎样处理"], rows: [
    ["没有出现可配送车站", "预留安检和检票时间，在上车前从已确认的商家购买食物；也可使用已经确认存在的车上售卖服务。"],
    ["支付或联系方式验证失败", "不要编造联系方式。12306 协议列出支付宝和微信支付，较早的上海市英文说明还提到银行卡；只相信当前结账页实际接受的方法。"],
    ["车票改签或退票", "餐单是独立订单，不能直接转到新车次。必须在允许时限内自行取消，再看新行程能否重新下单。"],
    ["列车运行受扰", "协议只为特定情况规定自动取消或退款，包括列车停运、配送站取消办理客运，或列车在配送站晚点超过 30 分钟；按订单通知处理。"],
    ["餐食还没送到", "查看订单状态，并请列车工作人员协助，不要离开列车寻找。无座旅客应在订单记录的车厢等候或联系配送人员，并以订单手机号后五位核验领取。"],
    ["停站时间看起来很长", "不要下车临时找食物；停站时间和检票控制都可能变化。"]
  ]},
  {id: "dynamic-boundary", type: "callout", title: "核验日期：2026 年 8 月 13 日", body: "本文在该日期核验了服务协议和官方说明。可参与的行程、车站、菜单、界面、商家截止时间和配送条件仍会动态变化。最保守的备选，是从出发站随身带上餐食，而不是在中途站临时跑下车购买。", tone: "decision"},
  {id: "help", type: "callout", title: "需要一起核对长途铁路出行日的用餐安排？", body: "把日期、车次、上下车站、人数、饮食限制，以及是否有儿童、长者或固定服药时间发给 Homeground。我们可以判断哪一段自带餐食比依赖配送更稳妥；实时服务和履约仍由 12306 与商家决定。", tone: "neutral"},
  {id: "internal-links", type: "internal-links", title: "铁路行程本身请使用对应指南", items: [
    {label: "第一次乘中国高铁指南", href: "/zh/guides/china-high-speed-train-first-time-guide/", description: "购票、证件和乘车流程请参考这篇首次乘车指南。"},
    {label: "航班和火车的充电宝规定", href: "/zh/guides/china-power-bank-rules-flights-trains/", description: "长途出行前核对当前电源携带规则。"},
    {label: "在中国吃第一顿合餐", href: "/zh/guides/first-shared-meal-in-china/", description: "把更完整的饮食体验放在非换乘日。"}
  ]},
  {id: "sources", type: "sources", title: "官方与独立来源", items: [
    {label: "餐饮及特产预订服务协议", url: "https://kyfw.12306.cn/otn/gonggao/excater.html", publisher: "中国铁路 12306", reviewedAt: "2026-08-13"},
    {label: "高铁列车餐食预订说明", url: "https://english.shanghai.gov.cn/en-Transportation/20241213/1a3e604aa23140619e06d90e8d3004f4.html", publisher: "上海市人民政府", reviewedAt: "2026-08-13"},
    {label: "北京南站网络订餐服务动态", url: "https://www.bjwmb.gov.cn/yw/10119254.html", publisher: "首都文明网", reviewedAt: "2026-08-13"},
    {label: "铁路餐食配送链", url: "https://www.ndrc.gov.cn/xwdt/ztzl/cjsjyth1/xwzx/202111/t20211115_1303935_ext.html", publisher: "国家发展和改革委员会", reviewedAt: "2026-08-13"},
    {label: "高铁按需订餐优化研究", url: "https://www.hznu.edu.cn/upload/resources/file/2023/05/06/7774953.pdf", publisher: "杭州师范大学机构知识库", reviewedAt: "2026-08-13"}
  ]}
]};

export default body;
