import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    { id: "lead", type: "lead", text: "上海去苏州当天往返可以，但先把返程留好，再决定当天看什么。火车上的时间不等于一日游所需时间：上海酒店到车站、进站候车、苏州市内接驳和晚上回酒店都要算进去。第一次去，先选一座园林和平江路，比列出一长串景点更容易玩得完整。" },
    { id: "answer", type: "callout", tone: "decision", title: "先定返程，再定游览顺序", body: "选好想去的园林，核对出行当天的停止入园时间，再倒推一班能从正确苏州车站赶上的返程车。若可行的返程让游览时间过短，不如在苏州住一晚。" },
    { id: "stations-heading", type: "heading", level: 2, text: "上海和苏州分别选哪个站？" },
    { id: "stations", type: "table", caption: "两张车票都要看完整站名", columns: ["决定", "怎么核对"], rows: [
      ["从上海出发", "把上海站和上海虹桥站到你酒店或机场的路程，与 12306 当天实际有票的车次一起比较。它们不是同一座车站。"],
      ["到达苏州", "苏州站较适合衔接古城园林片区；苏州北站是另一座车站。不能只看列车运行时间，还要算下车后的市内交通。"],
      ["回到上海", "返程的苏州出发站、上海到达站都要单独确认。晚上回错上海站，省下的车程可能又花在回酒店的路上。"],
    ] },
    { id: "station-source", type: "paragraph", text: "苏州市政府的出站指南列有苏州站前往拙政园一带和平江路的地铁方式，因此苏州站值得优先比较，但不是所有车次或酒店的固定答案。购票前仍以 12306 出行日的车次和完整站名为准。" },
    { id: "clock-heading", type: "heading", level: 2, text: "把完整的一天算清楚" },
    { id: "clock", type: "list", ordered: true, items: ["上海酒店到正确出发站；带行李或早高峰时留出余量。", "进站、安检、候车、上车及已订列车。", "苏州到达站到第一个景点；园林内步行和排队也要算。", "最后一个景点到正确的苏州返程站，并预留进站时间。", "回到上海后，从到达站再到酒店；晚归时尤其要核对。"] },
    { id: "day-heading", type: "heading", level: 2, text: "一天怎么排，才不会一直赶路？" },
    { id: "day-plan", type: "paragraph", text: "先去一座园林，例如拙政园，出发前查这座园林当天的入园规定和停止入园时间。之后留一段时间吃饭、走平江路。寒山寺只有在火车、园林和市内交通都留有余量时再加；否则删掉。这是安排顺序的建议，不是保证能按固定时刻游完或已替你订票。" },
    { id: "day-tradeoff", type: "comparison", title: "两种更清楚的安排", columns: [
      { heading: "自己安排当天往返", body: "自行订高铁和园林门票，一座园林配一条附近的街，晚上回上海原来的酒店。" },
      { heading: "苏州住一晚", body: "想再看一座园林、放慢晚间节奏或去博物馆，就考虑住一晚。苏州博物馆本馆目前实行分时预约，其他馆区规则可能不同；加进路线前先看当期公告。" },
    ] },
    { id: "products-heading", type: "heading", level: 2, text: "我们的现有私家路线怎么安排苏州？" },
    { id: "products", type: "paragraph", text: "Homeground 的上海—苏州 5 天私家团，4 晚都住上海同一家酒店；苏州那天包含高铁二等座往返、两端私车接驳、导游服务，以及拙政园、寒山寺和平江路。这是完整 5 天产品，不是单卖苏州一天的价格。上海—苏州—杭州 6 天线会在苏州住一晚，再继续前往杭州，交通和景点安排不同。比较价格前，先核对出发日期、人数及书面包含项目。" },
    { id: "product-links", type: "internal-links", title: "比较两条实际在售路线", items: [
      { label: "上海—苏州 5 天私家团", href: "/zh/tours/shanghai-suzhou-5-day-private-tour/", description: "连住上海 4 晚，其中一天往返苏州。" },
      { label: "上海—苏州—杭州 6 天私家团", href: "/zh/tours/shanghai-suzhou-hangzhou-6-day-private-tour/", description: "苏州住一晚，再前往杭州。" },
      { label: "先选一座值得看的苏州园林", href: "/zh/guides/how-to-read-a-suzhou-garden/", description: "把有限的游览时间留给最感兴趣的一座。" },
    ] },
    { id: "faq", type: "faq", title: "订车票前常问的问题", items: [
      { question: "从上海去苏州一天够吗？", answer: "够做一次目标明确的初访，不够把所有主要园林和老街都看完。先留一座园林和平江路，再看门到门往返时间是否值得。" },
      { question: "苏州站就是苏州北站吗？", answer: "不是。车票上的完整站名很重要。苏州站有通往古城景点的官方地铁指引；从苏州北站出发则要单独计算市内接驳。" },
      { question: "园林或苏州博物馆需要预约吗？", answer: "先查具体园林的入园规则和停止入园时间。苏州博物馆本馆目前实行分时预约，其他馆区规则可能不同，须看当期公告。博物馆不在我们已发布的 5 天往返行程内。" },
      { question: "Homeground 单卖这一天的苏州团吗？", answer: "已公开的方案是含苏州一日行程的上海 5 天私家团。若要单独安排一天，需另定服务范围与报价；不能把 5 天产品的价格当作一天价格。" },
    ] },
    { id: "sources", type: "sources", title: "官方行程资料与图片来源", items: [
      { label: "按日期查车次和完整站名", url: "https://www.12306.cn/index/", publisher: "中国铁路 12306", reviewedAt: "2026-09-23" },
      { label: "苏州站出站接驳指南", url: "https://www.suzhou.gov.cn/szsrmzf/mszx/202604/568a4eac0636443c968cfc195b9a3e29.shtml", publisher: "苏州市人民政府", reviewedAt: "2026-09-23" },
      { label: "园林入园须知", url: "https://ylj.suzhou.gov.cn/szsylj/ryxz/nav_list.shtml", publisher: "苏州市园林和绿化管理局", reviewedAt: "2026-09-23" },
      { label: "园林开放与停止检票时间", url: "https://ylj.suzhou.gov.cn/szsylj/kfsj/wztt.shtml", publisher: "苏州市园林和绿化管理局", reviewedAt: "2026-09-23" },
      { label: "园林近期公告", url: "https://ylj.suzhou.gov.cn/szsylj/tzgg/list.shtml", publisher: "苏州市园林和绿化管理局", reviewedAt: "2026-09-23" },
      { label: "苏州博物馆各馆区预约公告", url: "https://www.suzhou.gov.cn/szsrmzf/mszx/202609/2d1a50ec4496485d9f5c332de585dfdc.shtml", publisher: "苏州市人民政府", reviewedAt: "2026-09-23" },
      { label: "平江路照片，kevinmcgill 摄，CC BY-SA 2.0", url: "https://commons.wikimedia.org/wiki/File:A_stone_arch_bridge_in_Pingjiang_Road,_Suzhou.jpg", publisher: "维基共享资源", reviewedAt: "2026-09-23" },
    ] },
  ],
} satisfies StructuredPageBody;

export default body;
