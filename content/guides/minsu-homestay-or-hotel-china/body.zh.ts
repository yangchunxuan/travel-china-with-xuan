import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead",
      type: "lead",
      text: "“民宿”常被译为homestay，但房源可能是主人参与的乡村住宿、小型专业物业，也可能只是平台分类。这个词本身不承诺共餐、当地互动、许可、住宿登记或酒店式服务。",
    },
    {
      id: "answer",
      type: "callout",
      title: "先给结论",
      tone: "decision",
      body: "最重视稳定前台、行李、晚到和问题处理，选酒店；住宿场景、主人沟通和在地设计本身就是目的，且运营方已确认登记、进入与支持，才选民宿。不要因为英文homestay就推断会与家庭同住。",
    },
    {
      id: "layers",
      type: "table",
      caption: "越过标签看真实需求",
      columns: ["问题", "偏酒店需求", "偏民宿适配"],
      rows: [
        ["抵达", "24小时或明确前台", "可接受预约房东交接"],
        ["位置", "枢纽与车辆进入重要", "乡村、古镇或景区环境是目的"],
        ["服务", "日常前台与标准化处理", "接受物业特定的有限服务"],
        ["证明", "确认运营方与登记", "分别确认运营方、进入和登记"],
      ],
    },
    {
      id: "verify",
      type: "callout",
      title: "官方等级不等于每个平台标签",
      tone: "warning",
      body: "中国有旅游民宿国家标准和A/B级评定，但平台上自称“民宿”不代表已经官方评定。询问运营主体、声称的类别或等级、护照登记、值守时间、冷暖设备与行李进入。",
    },
    {
      id: "facts",
      type: "callout",
      title: "政策信息核验于2026年8月12日",
      tone: "neutral",
      body: "国家市场监管总局标准平台列有GB/T 41648-2022《旅游民宿基本要求与等级划分》，文化和旅游部发布官方等级公告；住宿登记义务仍按实际住宿模式适用。这些官方体系不能验证每个互联网标签。",
    },
    {
      id: "links",
      type: "internal-links",
      title: "继续规划",
      items: [
        {
          label: "北京四合院酒店还是现代酒店",
          href: "/zh/guides/beijing-courtyard-hotel-or-modern-hotel/",
          description: "不浪漫化标签地检验历史住宿。",
        },
        {
          label: "黄山住宿基地",
          href: "/zh/guides/huangshan-summit-or-gateway-base/",
          description: "先选择环境，再选择物业类型。",
        },
        {
          label: "商业公寓酒店或短租",
          href: "/zh/guides/commercial-aparthotel-or-residential-rental-china/",
          description: "分开平台展示与真实运营。",
        },
      ],
    },
    {
      id: "sources",
      type: "sources",
      title: "官方来源",
      items: [
        {
          label: "GB/T 41648-2022旅游民宿标准记录",
          url: "https://openstd.samr.gov.cn/bzgk/std/newGbInfo?hcno=2E96A4B6C7B13B97FC67FD71736EAF01",
          publisher: "国家市场监督管理总局",
          reviewedAt: "2026-08-12",
        },
        {
          label: "当前A/B级旅游民宿官方公告",
          url: "https://zwgk.mct.gov.cn/zfxxgkml/scgl/202601/t20260126_964398.html",
          publisher: "文化和旅游部",
          reviewedAt: "2026-08-12",
        },
        {
          label: "境外人员住宿登记官方解读",
          url: "https://s.nia.gov.cn/mps/zcjd/202601/t20260750_1012.html",
          publisher: "国家移民管理局",
          reviewedAt: "2026-08-12",
        },
      ],
    },
  ],
} as const satisfies StructuredPageBody;
export default body;
