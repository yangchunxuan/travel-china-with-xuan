import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body: StructuredPageBody = {schemaVersion: "1.0.0", blocks: [
  {id: "answer-first", type: "lead", text: "一些中国高铁站远离老城，是因为铁路、车站和未来城区需要同时满足不同约束：快速通过的线路走向、土地与建设成本、站台容量、换乘规划、拆迁限制和地方发展目标。并非所有高铁站都在郊外，远站也不自动等于规划成功。旅行者真正该做的是比较准确车站到酒店的完整链路。"},
  {id: "forces", type: "table", caption: "哪些力量会把车站推向老城之外", columns: ["因素", "外缘选址的好处", "代价"], rows: [
    ["线路走向", "在密集城区外更容易布置顺直进路和通过线路。", "市内接驳变长。"], ["土地与拆迁", "大站和股道需要连续空间。", "便宜土地不会自动产生客流连接。"], ["容量", "外缘用地可容纳更多站台和扩建。", "大站厅也会增加步行和找出口时间。"], ["综合换乘", "新枢纽可规划地铁、公交和区域铁路。", "连接可能晚于车站开通，或实际不如规划方便。"], ["城市发展", "车站可以带动新区。", "开发滞后时，站区仍可能孤立。"], ["既有铁路", "利用中心站可保留可达性。", "旧线进路可能限制速度、容量或施工。"]
  ]},
  {id: "not-one-actor", type: "heading", level: 2, text: "站址不是铁路一家决定"},
  {id: "not-one-actor-copy", type: "paragraph", text: "关于中国站址的研究描述了铁路目标、客流需求与地方开发利益之间的协商。国家规划文件要求统筹车站周边土地，并建设与建成区及其他枢纽的快速连接。这恰好说明：外围站的效益取决于市内接驳，不能只靠“建在新区”本身实现。"},
  {id: "suffix-rule", type: "callout", title: "方位后缀就是票面名称的一部分", body: "“东、西、南、北、新”不是模糊片区，而是不同车站。火车票、酒店路线和出租车目的地必须使用完整中英文站名。城市有多座车站时，绝不能只写城市名。", tone: "warning"},
  {id: "door-to-door", type: "list", ordered: true, items: ["从真实车次结果复制完整出发站和到达站。", "从酒店入口规划到正确车站入口，不只看车站中心点。", "计入退房、道路或地铁、进站安检、站厅步行和合理余量。", "到达后计入出站、行李移动、换乘等待和最后到酒店。", "对使用另一车站的备选车次重新计算；铁路时间较长，反而可能更早到酒店。", "付款前和出行当天再次核对地铁、公交与车站通知。"]},
  {id: "scenarios", type: "comparison", title: "铁路时间相同，整段旅程可以不同", columns: [
    {heading: "酒店有直达地铁、行李轻", body: "如果一条地铁直达酒店，而且末班时间安全覆盖到达，外围站也可能很高效。"}, {heading: "老城酒店、家庭行李、晚到", body: "中心站或运行更慢的车次可能门到门更快；换乘、电梯和夜间道路时间都应纳入选车。"}
  ]},
  {id: "change-table", type: "table", caption: "哪些新信息会改变答案", columns: ["新条件", "重新计算什么"], rows: [
    ["列车在常规公共交通后抵达", "核对夜间连接，或估算道路接驳。"], ["地铁需要两次长换乘", "比较更中心的车站或直达车辆。"], ["更换酒店", "从新入口重新开始，‘市中心’过于宽泛。"], ["老人或大件行李", "计入电梯、步行和站台到车辆的移动。"], ["另有独立联程票", "保护车站间转移时间和误车风险。"]
  ]},
  {id: "recovery", type: "callout", title: "如果已经买到不方便的车站", body: "不要假设同城另一座车站也能使用这张票。先在铁路官方渠道核对改签或退票规则；若保留原票，就确认前往准确车站的接驳并提早离开酒店。到达票则先把完整站名和预计时间发给酒店，再选最后一公里。", tone: "decision"},
  {id: "internal-links", type: "internal-links", title: "把机制应用到真实行程", items: [
    {label: "北京应该选哪座火车站", href: "/zh/guides/which-beijing-railway-station/", description: "用五站矩阵解决北京的具体选择。"}, {label: "第一次乘中国高铁指南", href: "/zh/guides/china-high-speed-train-first-time-guide/", description: "票务、证件与乘车留在全国指南。"}, {label: "中国包车接送还是公共交通", href: "/zh/guides/china-private-transfer-or-public-transport/", description: "按人数和行李选择最后一公里。"}
  ]},
  {id: "sources", type: "sources", title: "官方与独立来源", items: [
    {label: "铁路客站周边规划建设指导意见", url: "https://www.ndrc.gov.cn/xxgk/zcfb/tz/201805/t20180507_962719.html", publisher: "国家发展和改革委员会", reviewedAt: "2026-08-13"}, {label: "综合交通枢纽规划指导", url: "https://www.ndrc.gov.cn/xxgk/zcfb/tz/201605/W020190905516928367231.pdf", publisher: "国家发展和改革委员会", reviewedAt: "2026-08-13"}, {label: "多主体高铁站址研究", url: "https://ir.pku.edu.cn/handle/20.500.11897/620610", publisher: "北京大学机构知识库", reviewedAt: "2026-08-13"}, {label: "站点距离与城市影响研究", url: "https://ces.xmu.edu.cn/CN/abstract/abstract802.shtml", publisher: "中国经济问题", reviewedAt: "2026-08-13"}, {label: "既有站与新建站的权衡", url: "https://www.ort.shu.edu.cn/CN/10.15960/j.cnki.issn.1007-6093.2023.02.005", publisher: "运筹与管理", reviewedAt: "2026-08-13"}
  ]}
]}; export default body;
