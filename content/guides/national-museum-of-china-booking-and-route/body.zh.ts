import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {
  schemaVersion: "1.0.0",
  blocks: [
    { id: "answer-first", type: "lead", text: "参观中国国家博物馆，要把它当成一次有预约、有入口、有取舍的博物馆任务，而不是逛完天安门广场顺便进去。先用当天会携带的证件预约免费基本陈列，按预约时段从北门观众入口核验；进馆后只定一个主展，再选一个次要主题。国博大到不适合“全部看完”，而且国博预约也不等于周边每一处场所都已预约。" },
    { id: "booking-heading", type: "heading", level: 2, text: "先预约国博本身" },
    { id: "booking-rules", type: "table", caption: "2026年8月12日核验的国博现行规则", columns: ["环节", "官方规则", "实际影响"], rows: [
      ["预约", "基本陈列免费，可在参观日前7日内通过官网及官方微信渠道实名预约。", "从国博官方英文预约页进入，不要把搜索广告或其他天安门服务当成票务入口。"],
      ["放票", "每日17:00放出新票，入馆分三个预约时段。", "日期固定时要按放票时间准备，不要把当天余票当作方案。"],
      ["证件", "预约须使用有效身份证件，入馆时核验预约所用证件原件。", "护照信息要按证件准确填写，当天带同一本原件。"],
      ["入口", "已预约观众须在预约时段从北门观众参观入口入馆。", "许多照片中的西立面是建筑正面，不要据此把它当游客入口。"],
      ["周一", "通常周一闭馆，国家法定节假日另有公告时除外。", "碰到节假日周一，应看当周正式公告，而不是自行推断开闭馆。"],
    ] },
    { id: "separate-systems", type: "callout", title: "国博与天安门不是同一套预约", body: "国博管理自己的预约与北门入馆。天安门广场及周边纪念场所可能采用各自的预约和安检规则。国博确认信息只证明国博这一项；其他场所要分别查官方渠道，并给广场周边的安检与绕行留时间。", tone: "warning" },
    { id: "time-heading", type: "heading", level: 2, text: "先决定参观多久，再决定看什么" },
    { id: "time-options", type: "comparison", columns: [
      { heading: "约两小时", body: "只选一个主展：古代中国基本陈列，或一场你真正重视的当期特展。安检、找路和离场也要算时间，不要再塞进另一座大型博物馆。" },
      { heading: "约三小时", body: "看一个完整主展，中间真正休息一次，再加一个小范围主题。对下午或晚上另有安排的初访者，这是最平衡的做法。" },
      { heading: "四小时以上", body: "只有当博物馆本身就是旅行重点时，再增加第二个大型主题。此时限制你的往往是注意力和馆内距离，而不只是闭馆时间。" },
    ] },
    { id: "route-heading", type: "heading", level: 2, text: "一条承认国博很大的路线" },
    { id: "route-list", type: "list", items: [
      "过安检后先看当天楼层图，再去找网上见过的名品；临展与展厅开放情况会变。",
      "想建立时间线，就把古代中国基本陈列作为主展。重点看序言、分期转换和少数代表展柜，不必逐柜读完。",
      "提前定三个观察点：一件早期文明器物、一组帝国时期展品，以及一件与你此行其他城市有关的对象。",
      "进入第二个主题前坐下休息。十分钟恢复注意力，通常比多赶一个展厅更值。",
      "剩余时间只给一场当期展览或一个近现代主题，并在闭馆前预留找出口与取物时间。",
    ] },
    { id: "paid-exhibitions", type: "callout", title: "免费入馆不等于所有展览都免费", body: "国博基本参观免费预约，但当期收费特展可能有独立票价和购票规则。以具体展览公告为准：不要误以为基本陈列需要买票，也不要以为免费预约包含每一场临展。", tone: "neutral" },
    { id: "hours-heading", type: "heading", level: 2, text: "季节和特殊日期会改变什么" },
    { id: "hours", type: "paragraph", text: "常规开放时间为09:00—17:00，16:00停止入馆；现行规则下，6月1日至10月31日延长至17:30闭馆、16:30停止入馆。国博也可能通过日期明确的公告临时在周一开放或调整节假日安排。这些是本稿核验到的2026年事实，不是以后每次旅行的保证；出发前要重新打开“参观”页与最新公告。" },
    { id: "practical-heading", type: "heading", level: 2, text: "避免预约白费的几个细节" },
    { id: "practical", type: "list", items: [
      "离线保存预约成功信息，并让每位旅客自己掌握预约所用证件原件。",
      "预约时段是到门口核验的要求，不是从酒店出发的时间。",
      "尽量轻装。安检与存包是流程的一部分，展厅也限制自拍杆、三脚架等物品。",
      "同行者年满60岁时，绿色通道仍需预约、预约证件原件及相应优待证明。",
      "行程改变要在官方截止时间前取消。国博限制预约频次，并会对多次爽约证件采取限制。",
    ] },
    { id: "final-check", type: "callout", title: "前一晚只核对五件事", body: "预约日期与时段、护照拼写、北门入口、当天开放公告、唯一主展。五项都清楚，国博就可执行；五项不清楚，再加十个展厅名称也救不了当天安排。", tone: "decision" },
    { id: "internal-links", type: "internal-links", title: "把国博放进北京行程", items: [
      { label: "第一次去北京住哪里", href: "/zh/guides/beijing-where-to-stay-first-trip/", description: "按整段行程选择住宿区域，不要只围绕一处地标订酒店。" },
      { label: "外国游客如何参观故宫", href: "/zh/guides/forbidden-city-for-foreign-visitors/", description: "把故宫的门票与入口流程和国博预约严格分开。" },
      { label: "带父母去中国旅行", href: "/zh/guides/china-itinerary-with-older-parents/", description: "把大型室内博物馆与步行量、休息和恢复时间配平。" },
      { label: "你的中国行程是不是太赶", href: "/zh/guides/is-your-china-itinerary-too-rushed/", description: "不要把多个北京重头景点堆进同一个疲惫的白天。" },
      { label: "核验中国景点门票", href: "/zh/guides/official-or-reseller-china-tickets/", description: "先识别景点票务运营方，再比较经销商支持、库存状态、实名传递与退改条款，最后核验真正可入园的订单。" },
    ] },
    { id: "consultation", type: "callout", title: "需要把北京一天串成真实顺序？", body: "如果国博必须衔接另一项定时预约、长辈节奏或当天车站转移，可以让 Homeground 真人旅行顾问按实际时间检查顺序与缓冲。请先提供已经确认的预约时段和酒店区域。", tone: "neutral" },
    { id: "sources", type: "sources", title: "已核验的官方与图片来源", items: [
      { label: "参观服务：开放时间、预约时段、北门与核验规则", url: "https://www.chnmuseum.cn/cg/", publisher: "中国国家博物馆", reviewedAt: "2026-08-12" },
      { label: "国博官方英文预约系统", url: "https://pcticket.chnmuseum.cn/museum-en/", publisher: "中国国家博物馆", reviewedAt: "2026-08-12" },
      { label: "临时开放公告：说明日期公告可覆盖常规周一安排", url: "https://www.chnmuseum.cn/gbgg/202607/t20260720_280985.shtml", publisher: "中国国家博物馆", reviewedAt: "2026-08-12" },
      { label: "首图：中国国家博物馆西立面，Daniel Case，CC BY-SA 3.0；经裁切并转为WebP", url: "https://commons.wikimedia.org/wiki/File:National_Museum_of_China_west_facade,_straight_view.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-12" },
    ] },
  ],
};

export default body;
