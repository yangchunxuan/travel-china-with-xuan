import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead",
      type: "lead",
      text: "长住的关键不是面积，而是物业能否支持日常生活，并提供清楚的运营方、合同和问题处理流程。",
    },
    {
      id: "answer",
      type: "callout",
      title: "先给结论",
      tone: "decision",
      body: "已核实的做饭、洗衣、工作空间、独立生活空间和隐私比每日酒店服务重要，可选服务式公寓；更重视有人值守、日常支持、短期灵活性和行李处理，选酒店。即使中段住公寓，首末夜也可能更适合酒店。",
    },
    {
      id: "matrix",
      type: "table",
      caption: "核实服务而非名称",
      columns: ["需求", "问公寓", "问酒店"],
      rows: [
        ["厨房", "准确电器、餐具、通风", "是否有真正小厨房房型"],
        ["清洁", "频率、床品、耗材", "包含频率与长住更换"],
        ["合同", "押金、水电、退款、开票主体", "房价条款、续住、提前离开"],
        ["支持", "前台时间、门锁、维修", "24小时支持范围与升级"],
      ],
    },
    {
      id: "verify",
      type: "callout",
      title: "“服务式”只是商业描述",
      tone: "warning",
      body: "它不能证明酒店式值守或登记。询问运营企业、护照登记、访客规则、押金收款方、水电、清洁、厨房清单与书面取消条款，并保存订单和对话。",
    },
    {
      id: "facts",
      type: "callout",
      title: "政策信息核验于2026年8月12日",
      tone: "neutral",
      body: "移民管理官方资料按真实住宿模式分配登记责任：酒店为住客登记，非酒店住宿按属地流程办理。平台标题不能决定类别，地方流程和物业执行可能不同，应在取消截止前分别确认。",
    },
    {
      id: "links",
      type: "internal-links",
      title: "继续规划",
      items: [
        {
          label: "商业公寓酒店还是住宅短租",
          href: "/zh/guides/commercial-aparthotel-or-residential-rental-china/",
          description: "识别底层运营模式。",
        },
        {
          label: "上海首次住宿区域",
          href: "/zh/guides/shanghai-where-to-stay-first-trip/",
          description: "把长住放在重复路程附近。",
        },
        {
          label: "如何判断靠近地铁",
          href: "/zh/guides/china-hotel-near-metro/",
          description: "核对每天最后一段步行。",
        },
      ],
    },
    {
      id: "sources",
      type: "sources",
      title: "官方来源",
      items: [
        {
          label: "住宿登记官方政策解读",
          url: "https://s.nia.gov.cn/mps/zcjd/202601/t20260750_1012.html",
          publisher: "国家移民管理局",
          reviewedAt: "2026-08-12",
        },
        {
          label: "网上登记试点英文政府公告",
          url: "https://english.www.gov.cn/services/visitchina/202603/21/content_WS69ce124cc6d00ca5f9a0a368.html",
          publisher: "中国政府网",
          reviewedAt: "2026-08-12",
        },
        {
          label: "国家企业信用信息公示系统",
          url: "https://www.gsxt.gov.cn/",
          publisher: "国家市场监督管理总局",
          reviewedAt: "2026-08-12",
        },
      ],
    },
  ],
} as const satisfies StructuredPageBody;
export default body;
