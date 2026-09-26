import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    { id: "lead", type: "lead", text: "带小孩和长辈去桂林、阳朔，如果假期允许，留五天比把景点压进三天更合适。漓江游船可以作为桂林到阳朔的转场，阳朔连住两晚，乡村慢慢玩一天，再回桂林准备返程。只有三天也能去，但要减少项目；漓江游船、遇龙河竹筏、龙脊梯田都想塞进去，反而把时间花在赶路和搬行李上。" },
    { id: "decision-heading", type: "heading", level: 2, text: "先定节奏，再决定加哪些景点" },
    { id: "pace-table", type: "table", caption: "按同行人的体力和到离时间调整，不代表项目当天一定开放", columns: ["有几天", "比较稳的安排", "需要取舍的地方"], rows: [
      ["3天2晚", "选一个主要的游江体验，尽量少搬酒店，留好抵达和返程时间。", "不要把龙脊和第二项水上活动也当作必去。"],
      ["5天4晚", "桂林→阳朔→桂林，阳朔连住两晚，留一个完整的乡村游览日。", "竹筏另作可选项目，不预设全家都能乘坐。"],
      ["龙脊一定要去", "给梯田单独留时间，重新核对路线和报价。", "现有桂林阳朔五天团不包含龙脊。"],
    ] },
    { id: "five-day-heading", type: "heading", level: 2, text: "五天怎样安排，才不会天天搬行李" },
    { id: "five-day", type: "list", ordered: true, items: [
      "第1天抵达桂林：接到酒店休息，不把落地当天当成完整游览日。",
      "第2天坐漓江游船去阳朔：桂林酒店退房后前往码头，行李按事先确认的方案另车送往阳朔，晚上住阳朔。",
      "第3天留在阳朔：不换酒店，去遇龙河沿线乡村，按全家情况选一项基础家庭体验或轻骑行。",
      "第4天回桂林：带行李乘专车回去，芦笛岩或象鼻山二选一，晚上住桂林。",
      "第5天返程：只安排送机或送站，把时间留给固定的航班、火车。",
    ] },
    { id: "hotel-heading", type: "heading", level: 2, text: "累人的不一定是景点，也可能是两次换酒店" },
    { id: "hotel-copy", type: "paragraph", text: "这条路线是桂林住1晚、阳朔住2晚、再回桂林住1晚，中间要换两次酒店。最后回桂林过夜，是为了返程当天不用从阳朔赶飞机或火车；但带小孩或需要午休的家人，退房、搬箱子和重新入住同样会累。订之前把电梯、停车下客点、游船码头到酒店的行李交接、床型和房间数量逐项问清。包车能解决公路接送，不等于酒店门口没有台阶。" },
    { id: "river-heading", type: "heading", level: 2, text: "漓江游船和遇龙河竹筏，不是一张票" },
    { id: "river-compare", type: "comparison", columns: [
      { heading: "漓江游船", body: "现有五天团包含第2天桂林到阳朔的漓江游船。它也是换住宿城市的一段路。付款前应核对实际船班、舱等、码头、登船路径以及行李如何另车交接；水位和天气可能改变安排。" },
      { heading: "遇龙河竹筏", body: "这是另一个水上项目，并非已包含的漓江游船。五天团第3天含一项基础家庭体验或轻骑行；竹筏升级另计，还要按所选码头、航段与每名乘客的条件重新核实。" },
    ] },
    { id: "raft-rule", type: "callout", tone: "warning", title: "竹筏限制必须看具体码头", body: "遇龙河景区对“龙村码头—大坝桥”双人往返竹筏的须知写明：不足1米的儿童、70岁及以上长者不能乘坐，也列出健康和行动条件限制。这不是整个遇龙河所有竹筏的统一规则。选定航段后，要以该码头的当前公告、孩子现场身高、同行人状况及当天运营情况为准；不乘竹筏，也可以把乡村专车慢游和适合全家的短程散步作为当天重点。" },
    { id: "family-heading", type: "heading", level: 2, text: "下订前，先问清四件具体的事" },
    { id: "family-checks", type: "list", items: [
      "漓江游船的实际码头在哪里？家里每个人能否从车上下到码头、登船，再从阳朔码头回到车上？不要只看“适合家庭”四个字。",
      "两次换酒店会不会打断孩子午睡或长辈休息？电梯、房型、停车点和行李搬运要落实到具体酒店。",
      "如果想加竹筏，究竟是哪个码头、哪段水路？孩子身高和长辈年龄、身体状况，要按该航段规则核实。",
      "遇到水位或天气变化，原定游船或户外活动怎么办？出发前就把替代方案讲清楚。",
    ] },
    { id: "faq", type: "faq", title: "桂林阳朔三代同游常见问题", items: [
      { question: "带小孩和长辈，桂林阳朔三天够吗？", answer: "只选少数重点，三天可以去；但漓江游船、阳朔乡村、龙脊和多次换酒店不宜全塞进去。现有五天线把阳朔乡村留成完整一天，返程日也不排景点。" },
      { question: "五天私家团包含遇龙河竹筏吗？", answer: "不包含。包含的是第2天桂林到阳朔的漓江游船；第3天有一项按同行人情况确定的基础家庭体验或轻骑行。竹筏是另计的可选升级，具体航段与准乘条件必须再核实。" },
      { question: "三岁孩子或70岁长辈能坐遇龙河竹筏吗？", answer: "不能只凭年龄回答所有码头。景区对龙村码头—大坝桥往返航段规定：不足1米儿童和70岁及以上长者禁乘。其他航段要分别看当前公告，孩子应按实际身高核对。" },
      { question: "五天行程要换几次酒店？", answer: "四晚分为桂林1晚、阳朔2晚、桂林1晚，共换两次酒店。阳朔连住让乡村游览日不用打包；最后一晚住桂林则方便从桂林返程。" },
    ] },
    { id: "links", type: "internal-links", title: "把问题接到实际行程", items: [
      { label: "桂林阳朔五天四晚私家团", href: "/zh/tours/guilin-yangshuo-5-day-private-tour/", description: "查看每天怎么走、漓江游船、导游天数、住宿和不包含项目。" },
      { label: "漓江游船购票与码头", href: "/zh/guides/li-river-cruise-tickets-piers-booking/", description: "核对游船、购票渠道和行李从桂林到阳朔的交接。" },
      { label: "阳朔住县城还是遇龙河", href: "/zh/guides/yangshuo-town-or-yulong-river-where-to-stay/", description: "按酒店门口能否到车、夜间用餐与休息需求选住宿区。" },
      { label: "龙脊梯田当天往返还是住一晚", href: "/zh/guides/longji-rice-terraces-day-trip-or-overnight/", description: "如果龙脊一定要去，先判断需要增加多少时间。" },
    ] },
    { id: "inquiry", type: "callout", tone: "decision", title: "让路线按你的家人来调整", body: "告诉我们出发月份、同行人数和年龄、到离车站或机场、房间要求，以及步行或上下船有没有顾虑。若特别想坐竹筏，再补充孩子身高。这样才能在报价前核对实际码头、游船、行李交接和五天团包含的内容。" },
    { id: "sources", type: "sources", title: "2026年9月26日核对的景区资料", items: [
      { label: "龙村码头—大坝桥双人往返竹筏须知（只适用此航段）", url: "https://www.ysylh.cn/jdjs/2024/6a7d914728304f999d023243c40b8680.shtml", publisher: "遇龙河景区经营方", reviewedAt: "2026-09-26" },
      { label: "漓江景区官方票务与游船信息", url: "https://www.liriver.com.cn/page/article/lyfw.pwxx", publisher: "桂林漓江景区", reviewedAt: "2026-09-26" },
    ] },
  ],
} as const satisfies StructuredPageBody;

export default body;
