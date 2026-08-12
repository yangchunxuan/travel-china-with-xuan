import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = { schemaVersion: "1.0.0", blocks: [
  { id: "answer-first", type: "lead", text: "颐和园没有对所有人都最好的入口。东宫门适合从宫廷建筑走向长廊与湖面；北宫门靠近地铁4号线，通常从苏州街和万寿山一侧进入；新建宫门则最接近十七孔桥与开阔湖景。入口应由你的重点和出口决定。游船只当可选连接，因为季节、风雨、预警和排队都可能让它无法使用。" },
  { id: "gate-heading", type: "heading", level: 2, text: "三个最实用的入口怎么选" },
  { id: "gate-table", type: "table", caption: "第一次参观的入口选择", columns: ["入口", "适合什么", "代价"], rows: [
    ["东宫门", "按宫廷区—长廊—万寿山—昆明湖的顺序理解颐和园。", "从地铁4号线西苑站还要步行；若原路返回会产生较多折返。"],
    ["北宫门", "从北宫门站到达，经过苏州街、山路或绕行路线去石舫与长廊。", "若直接翻山会有坡道和台阶；它并不天然等于最省体力。"],
    ["新建宫门", "把十七孔桥、南湖岛与东南湖岸作为开场。", "对初访者来说宫廷建筑顺序不够直观，地铁到门区也可能需要地面接驳。"],
  ] },
  { id: "ticket-heading", type: "heading", level: 2, text: "门票、联票还是单独加购" },
  { id: "ticket-comparison", type: "comparison", columns: [
    { heading: "门票", body: "进入主园区，足以游览长廊、昆明湖岸、桥梁、山脚与大量园林空间。" },
    { heading: "联票", body: "在门票基础上包含官方列出的园中园，目前包括佛香阁、德和园、苏州街和颐和园博物馆。" },
    { heading: "按需加购", body: "如果时间、台阶或兴趣不支持全部园中园，门票加一个重点往往更合理。联票提供进入资格，不保证你能赶在各处关门前全部使用。" },
  ] },
  { id: "passport", type: "callout", title: "外籍游客有官方线上与现场路径", body: "北京市官方访客指南说明，外籍游客可在“颐和园”微信公众号使用护照或外国人永久居留身份证预约；官方票务说明也给出门区综合服务窗口凭有效护照办理现场购票的方式。当天携带预约所用证件原件，出发前重新核验实际渠道。", tone: "neutral" },
  { id: "routes-heading", type: "heading", level: 2, text: "三种路线形状，不是一张强制打卡表" },
  { id: "routes", type: "table", caption: "三条可执行的颐和园路线", columns: ["路线", "主要顺序", "适合谁"], rows: [
    ["宫廷到湖面", "东宫门→仁寿殿一带→长廊→万寿山中央区域取舍→石舫或湖岸→北宫门。", "第一次来、希望建筑与山水关系清晰，并接受异门离开的旅客。"],
    ["地铁到地铁的山路", "北宫门→苏州街取舍→翻山或缓坡绕行→长廊→东宫门。", "重视地铁4号线接驳的人；入园前要决定走台阶还是更长的绕行。"],
    ["低爬升湖景线", "新建宫门→十七孔桥→南湖岛取舍→东堤→文昌阁一带→东宫门。", "更看重水面、桥梁和开阔景观，而不是登万寿山核心建筑的人。"],
  ] },
  { id: "boat-heading", type: "heading", level: 2, text: "游船用来连接，不用来拯救过满路线" },
  { id: "boat-rules", type: "list", items: [
    "官方常规运营期为3月中旬至11月中旬，具体开航与停航日期另行公布。",
    "现行大型摆渡船营业时间为08:30—17:30，但各航线多为单程，也不会自动连接你想象中的所有景点。",
    "购票前看清码头起终点。例如官方明确苏州街至宿云檐航线无返程。",
    "四级以上大风、大雨、气象预警或突发恶劣天气时会停航。",
    "周末和节假日可能长时间排队；若等船耗掉了水上节省的时间，就按预设湖岸路线步行。",
  ] },
  { id: "boat-plan-b", type: "callout", title: "每条船线都要配一条步行双胞胎", body: "入园前先找出能抵达同一下一重点的岸线步道。停航时不要横穿全园追另一个码头，直接切换步行方案并删掉最低优先级园中园，才能保住出口和后续交通。", tone: "decision" },
  { id: "hours-heading", type: "heading", level: 2, text: "公园与园中园不是同一只时钟" },
  { id: "hours", type: "paragraph", text: "主园区现行旺季（4月1日至10月31日）06:00—20:00开放，19:00停止入园；淡季06:30—19:00开放，18:00停止入园。园中园更早关闭，通常周一关闭，重点节假日除外。因此，赶得上主园区晚入园，不等于还赶得上佛香阁、博物馆或苏州街。出发当天要查官网，因为维护和专项公告可能进一步限制开放。" },
  { id: "final-check", type: "list", items: ["用中英文记下入口和不同出口。", "按实际路线买门票或联票，不因怕错过而盲目打包。", "先核对最早关闭的园中园。", "只保存一条明确码头对的船线，并配好步行替代。", "复核天气、游船公告和最后一段返程交通。"] },
  { id: "internal-links", type: "internal-links", title: "继续安排北京", items: [
    { label: "第一次去北京住哪里", href: "/zh/guides/beijing-where-to-stay-first-trip/", description: "把酒店区域与入口、出口及其他北京日程放在一起比较。" },
    { label: "外国游客如何参观故宫", href: "/zh/guides/forbidden-city-for-foreign-visitors/", description: "故宫另用一套明确的南进北出流程。" },
    { label: "带父母去中国旅行", href: "/zh/guides/china-itinerary-with-older-parents/", description: "判断坡道、台阶和异门离开是否适合家人的真实节奏。" },
  ] },
  { id: "consultation", type: "callout", title: "需要把入口匹配到真实的一天？", body: "Homeground 真人旅行顾问可以按酒店、步行限制、季节和下一项定时安排检查路线。请提供最想看的内容、入园时间、行动限制，以及游船究竟是重点还是锦上添花。", tone: "neutral" },
  { id: "sources", type: "sources", title: "已核验的官方与图片来源", items: [
    { label: "开放时间、票价与现行游船航线", url: "https://summerpalace.net.cn/index.html", publisher: "颐和园", reviewedAt: "2026-08-12" },
    { label: "外籍护照预约、交通与官方路线示例", url: "https://english.beijing.gov.cn/specials/parktours/guidevisitors/summerpalace/", publisher: "北京市人民政府", reviewedAt: "2026-08-12" },
    { label: "门区综合服务窗口等官方票务说明", url: "https://english.beijing.gov.cn/specials/ticketing/parks/202407/t20240719_3753037.html", publisher: "北京市人民政府", reviewedAt: "2026-08-12" },
    { label: "首图：Regina800809拍摄的夏季昆明湖，CC BY-SA 3.0；经裁切并转为WebP", url: "https://commons.wikimedia.org/wiki/File:Kunming_Lake_(Summer_Palace,_Beijing)_in_summer.JPG", publisher: "Wikimedia Commons", reviewedAt: "2026-08-12" },
  ] },
] };
export default body;
