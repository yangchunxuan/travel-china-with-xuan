import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead",
      type: "lead",
      text: "一个“公寓”图标不能说明谁在运营、谁查验护照、是否有前台，也不能说明门锁失效时谁处理。应比较真实运营流程，而不是平台分类。",
    },
    {
      id: "answer",
      type: "callout",
      title: "先给结论",
      tone: "decision",
      body: "需要有人接待、清楚的住宿登记、行李协助、发票或晚到后的问题处理，优先商业公寓酒店；更重视隐私和家庭空间时，只有房东书面确认合规运营、大楼进入、境外人员住宿登记、支持和取消条款，才比较住宅短租。",
    },
    {
      id: "layers",
      type: "table",
      caption: "把三层信息分开",
      columns: ["层级", "能说明", "不能说明"],
      rows: [
        [
          "官方规则",
          "酒店为住宿外国人登记；非酒店住宿另有属地登记义务",
          "某个房源一定会正确执行",
        ],
        [
          "平台展示",
          "设施、卖家文字与订单记录",
          "法律状态、登记能力或保证进入",
        ],
        [
          "物业执行",
          "真实前台、钥匙、运营方、登记和支持",
          "不能把一次经历变成全国规则",
        ],
      ],
    },
    {
      id: "verify",
      type: "callout",
      title: "发送一条书面核验消息",
      tone: "warning",
      body: "询问运营企业全名、有人值守的入住地点与时间、能否用护照完成所需住宿登记、晚到和门锁故障如何处理、押金收款主体是谁。保存答复和房源页面。平台标签只能证明展示内容，不能证明合法性。",
    },
    {
      id: "facts",
      type: "callout",
      title: "政策信息核验于2026年8月12日",
      tone: "neutral",
      body: "国家移民管理局资料区分酒店住宿——由酒店办理外国人住宿登记——与非酒店住宿，后者由外国人本人或留宿人于入住后24小时内向当地公安机关办理登记。2026年3月上线的网上申报试点仅适用于指定地区，并非全国自动适用；具体流程与物业执行可能不同。",
    },
    {
      id: "links",
      type: "internal-links",
      title: "继续规划",
      items: [
        {
          label: "服务式公寓还是酒店",
          href: "/zh/guides/serviced-apartment-or-hotel-china/",
          description: "为长住比较服务与合同。",
        },
        {
          label: "深圳住宿区域",
          href: "/zh/guides/shenzhen-where-to-stay-futian-luohu-nanshan/",
          description: "把运营形式放到合适区域。",
        },
        {
          label: "核对酒店日常进入",
          href: "/zh/guides/china-hotel-near-metro/",
          description: "选好运营模式后再核对最后一段步行。",
        },
      ],
    },
    {
      id: "sources",
      type: "sources",
      title: "官方来源",
      items: [
        {
          label: "境外人员住宿登记与2026年网上试点政策解读",
          url: "https://s.nia.gov.cn/mps/zcjd/202601/t20260750_1012.html",
          publisher: "国家移民管理局",
          reviewedAt: "2026-08-12",
        },
        {
          label: "网上住宿登记服务英文政府公告",
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
