import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body: StructuredPageBody = {schemaVersion: "1.0.0", blocks: [
  {id: "answer-first", type: "lead", text: "12306 列车外卖是一场按时刻衔接的接力，不是外卖员追着火车跑。当前平台会按输入的真实行程返回可供餐车站和商家；商家制作后，餐食进入车站受控交接，再由铁路工作人员或站内配送链送到填写的车厢和座位。若系统没有为这趟车返回可订选项，就不能套用其他车次或旧车站清单。"},
  {id: "relay", type: "table", caption: "餐食经过的六个交接点", columns: ["阶段", "发生什么", "主要失败风险"], rows: [
    ["匹配行程", "输入真实车次和日期，或选择订单中的行程。", "车次、日期或乘客记录错误。"], ["选择供餐站", "只从当前平台返回的车站中选择。", "误以为每个停站都能供餐。"], ["商家制作", "所选商家接单并备餐。", "商家截止时间更早或缺货。"], ["车站交接", "列车到达前进入铁路站内配送流程。", "备餐延迟或列车运行受扰。"], ["上车交接", "按车次、车厢和座位匹配餐包。", "座位或联系方式错误。"], ["送达座位", "按服务流程送到记录位置。", "换座或联系失败导致识别延迟。"]
  ]},
  {id: "cutoff", type: "callout", title: "60 分钟按供餐站计算", body: "12306 当前餐饮协议规定，距离列车在供餐站计划开车时间 60 分钟以内，平台不接受订餐或退订；商家另有更早要求的，以商家要求为准。这不是从你的始发站开车前 60 分钟。商家和运行条件还会缩短窗口，应以订单页为准。", tone: "warning"},
  {id: "order-method", type: "list", ordered: true, items: ["进入当前铁路 12306 的餐饮·特产入口，并匹配真实行程。", "只使用系统为该车次和日期返回的供餐站与商家。", "核对供餐站开车时间和商家页面的截止时间。", "付款前确认乘客、手机号、车厢和座位。", "保存订单记录并留意平台或铁路消息。", "换座后通过官方订单或客服处理，不要让无关外卖员尝试进站。"]},
  {id: "scenarios", type: "comparison", title: "两种常见下单时机", columns: [
    {heading: "上车前下单", body: "有更多时间比较系统返回的供餐站和商家，但必须确保行程和座位信息已经最终确定。"}, {heading: "车上临时下单", body: "只选择系统显示的未来可供餐站；下一站可能已经进入截止期，网络不稳也会让窗口消失。"}
  ]},
  {id: "not-guaranteed", type: "heading", level: 2, text: "可用性由行程实时返回，不靠永久清单"},
  {id: "not-guaranteed-copy", type: "paragraph", text: "官方说明可以证明订餐入口和配送概念，但车站、车次、商家、菜单、手机号要求和界面都会变化。服务协议管理交易和投诉，当前平台决定输入行程能提供什么。不要承诺某家餐厅、固定配送费或每趟高铁都能送餐。"},
  {id: "fallback", type: "table", caption: "下单失败时的安全回退", columns: ["问题", "应对"], rows: [
    ["没有可供餐站", "进站前购买，或使用已确认存在的车上售卖。"], ["付款或联系方式验证失败", "不要编造联系人；从始发站自带食物并保存失败记录。"], ["列车晚点或变更", "关注平台消息，走官方餐饮客服或退款渠道。"], ["餐食未送到", "查订单状态并询问列车工作人员，不要下车寻找。"], ["长停站看似可以买吃的", "不要下车冒险；停站时间和乘降控制可能变化。"]
  ]},
  {id: "dynamic-boundary", type: "callout", title: "核验日期：2026 年 8 月 13 日", body: "本文在该日核验了服务协议与官方说明。参与车次、车站、菜单、界面、商家截止时间和配送条件仍会变化。最稳妥的备用方案是从始发站自带餐食，而不是临时跑下站台。", tone: "decision"},
  {id: "internal-links", type: "internal-links", title: "把铁路旅程留在正确指南中", items: [
    {label: "第一次乘中国高铁指南", href: "/zh/guides/china-high-speed-train-first-time-guide/", description: "订票、证件和乘车请看 canonical 指南。"}, {label: "飞机与火车充电宝规则", href: "/zh/guides/china-power-bank-rules-flights-trains/", description: "长途出行前核对当前电源规则。"}, {label: "在中国的第一顿共享餐", href: "/zh/guides/first-shared-meal-in-china/", description: "把更完整的饮食体验放在非转场日。"}
  ]},
  {id: "sources", type: "sources", title: "官方与独立来源", items: [
    {label: "餐饮·特产预订平台用户服务协议", url: "https://kyfw.12306.cn/otn/gonggao/excater.html", publisher: "中国铁路 12306", reviewedAt: "2026-08-13"}, {label: "高铁订餐方法", url: "https://english.shanghai.gov.cn/en-Transportation/20241213/1a3e604aa23140619e06d90e8d3004f4.html", publisher: "上海市人民政府", reviewedAt: "2026-08-13"}, {label: "北京南站网络订餐动态", url: "https://www.bjwmb.gov.cn/yw/10119254.html", publisher: "首都文明办", reviewedAt: "2026-08-13"}, {label: "铁路餐食配送链", url: "https://www.ndrc.gov.cn/xwdt/ztzl/cjsjyth1/xwzx/202111/t20211115_1303935_ext.html", publisher: "国家发展和改革委员会", reviewedAt: "2026-08-13"}, {label: "高铁按需订餐优化研究", url: "https://www.hznu.edu.cn/upload/resources/file/2023/05/06/7774953.pdf", publisher: "杭州师范大学资料库", reviewedAt: "2026-08-13"}
  ]}
]}; export default body;
