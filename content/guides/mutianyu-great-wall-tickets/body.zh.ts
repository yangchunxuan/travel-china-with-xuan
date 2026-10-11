import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    { id: "lead", type: "lead", text: "去慕田峪长城，要分开买三样：门票40元；服务区到长城入口的摆渡车，往返15元；缆车，单程100元或往返140元。官网购票系统可以单买，也可以买200元的套票（2026年10月11日读取）。门票实名制，可以用护照订，提前30天开放预约。不想自己折腾，也可以交给我们：每人服务费¥45，另加官方票价，用你本人护照实名代订。" },
    { id: "price-table", type: "table", caption: "慕田峪长城官网购票系统价格（2026年10月11日）", columns: ["票种", "成人价格", "包含内容"], rows: [
      ["普通门票", "40元", "进入长城景区，日场开放1至20号敌楼"],
      ["明信片门票", "45元", "同样的入园权益，游览后可在票务服务中心换取纪念明信片"],
      ["摆渡车票", "15元", "服务区至游览区往返，共6公里"],
      ["缆车票", "单程100元，往返140元", "持缆车票从北检票口入园"],
      ["明信片门票+摆渡车", "60元", "门票加摆渡车往返"],
      ["明信片门票+摆渡车+缆车双程", "200元", "全含套票"]
    ] },
    { id: "price-copy", type: "paragraph", text: "景区规则写明，门票政策仅限长城门票。摆渡车、缆车、索道和滑道都要另外付费。摆渡车服务区站距离门票检票口大约三公里，所以购票系统建议乘坐摆渡车。" },
    { id: "handoff-options", type: "comparison", title: "想省事？可以交给我们", columns: [
      { heading: "代订门票：每人¥45", body: "另加官方票价，不加价。", items: ["在官方系统用每位游客本人的护照实名预约，日期和入园时段按你选的来。", "付款前，先把要订的内容和总金额书面发给你确认。", "参观日前至少8天提交需求并付款，保证约到；约不到，服务费和门票钱全额退还。"] },
      { heading: "加一位当天的导游：¥1,200", body: "持证英语私人导游，北京每天最多8小时。按导游计价，不是按人；旺季日期¥1,400。", items: ["导游会和你一起定好从哪个检票口进、怎么上山、几点往回走，并在长城上边走边讲。", "交通、你的门票和餐费另行报价。"] },
      { heading: "报私家团：代预约已包含", body: "预订 Homeground 私家团，行程内景点的预约不另收服务费。", items: ["北京5天私家团4人同行每人USD 669起，2人同行每人USD 839。公布的行程去的是八达岭长城。"] }
    ] },
    { id: "concession-callout", type: "callout", tone: "neutral", title: "优惠票的适用范围比看上去窄", body: "购票系统列有20元的学生票和老人票，但学生票要出示学生证，老人票注明仅支持中国大陆和港澳台游客购买。规则里写明，身高1.2米以上、6周岁以上至18周岁的外籍未成年人适用优惠门票；我们读取时购票系统里没有对应的票种，请到票务服务中心询问。摆渡车和缆车方面，身高1.2米及以下儿童免费，其他人一律全价。" },
    { id: "toboggan-heading", type: "heading", level: 2, text: "买了缆车票，能坐滑道吗？" },
    { id: "toboggan-copy", type: "paragraph", text: "不能。景区规则写明，缆车公司与索道、滑道公司是两家公司，票不通用。买缆车双程票的游客要原路返回。预订索道及滑道的游客只能从滑道检票口入园，预订缆车票的游客只能从北检票口入园。我们读取时，官网购票系统里没有索道和滑道的票，想坐滑道下山，要先确认卖家和价格。" },
    { id: "booking-heading", type: "heading", level: 2, text: "外国护照能订票吗？" },
    { id: "booking-copy", type: "paragraph", text: "按景区自己的规则，可以。门票实行实名制预约购票，每个证件（身份证、外国人永久居留身份证或护照）每日限购一张门票。下单时用外籍护照的游客不用换票，凭预订证件原件到预订的检票口验证入园。我们读取了购票系统，没有注册账号，所以不能确认境外手机号能否注册，也不能确认支持哪些支付方式。" },
    { id: "booking-list", type: "list", ordered: true, items: [
      "选日期。门票可提前30天预订，购票系统会显示每天门票和缆车票的余量。",
      "选入园时段。10月13日可选的是08:30-12:00和12:00-17:00两档。",
      "逐个添加游客，姓名和护照号码按证件原样填写。一个手机号注册一个用户，每张票都要录入游客本人的身份信息。",
      "摆渡车和缆车可以现在一起买，也可以当天再买；它们是单独的票，也有套票。",
      "记住退改规则：未检票的门票，可在预约参观日当天24点前在购票平台申请退款或改签；超过时限不能退改，也不能入园。"
    ] },
    {
      "id": "reservation-pretrip-reminder",
      "type": "callout",
      "title": "买哪种票，决定从哪个检票口进",
      "body": "缆车票走北检票口，索道或滑道票走滑道检票口。先定好怎么上山，再和司机约碰头地点和返程时间。",
      "tone": "decision",
      "link": {
        "href": "https://homegroundchina.com/zh/guides/china-attractions-advance-booking-checklist/",
        "label": "查看赴华前需要准备的景点预约"
      }
    },
    { id: "hours-heading", type: "heading", level: 2, text: "淡旺季开放时间" },
    { id: "hours-table", type: "table", caption: "慕田峪长城开放时间", columns: ["季节", "日期", "时间"], rows: [
      ["旺季", "3月16日至11月15日", "周一至周五7:30-18:00；周六、周日7:30-18:30"],
      ["淡季", "11月16日至次年3月15日", "8:00-17:30"]
    ] },
    { id: "hours-copy", type: "paragraph", text: "闭园前一小时停止售票，闭园前半小时停止检票。缆车运营时间与景区相同。日场开放1至20号敌楼，夜场开放10至15号敌楼。遇雷电、雨雪、大雾、暴雨、大风等天气，景区会临时关闭或部分关闭，并在景区公告页发布，出发当天早上先看一眼。" },
    { id: "faq", type: "faq", title: "购票前常见问题", items: [
      { question: "慕田峪长城门票多少钱？", answer: "官网购票系统上，成人普通门票40元，明信片门票45元（2026年10月11日读取）。摆渡车往返15元，缆车单程100元、往返140元。明信片门票加摆渡车加缆车双程的套票200元。" },
      { question: "有人能帮我订慕田峪长城门票吗？", answer: "可以。Homeground 在官方系统用每位游客本人的护照实名预约慕田峪门票，每人服务费¥45，另加官方票价，付款前先书面确认总金额。参观日前至少8天提交需求并付款，保证约到；约不到，服务费和门票钱全额退还。需要的话，当天的英语私人导游¥1,200，最多8小时。" },
      { question: "慕田峪缆车多少钱？", answer: "官网购票系统上单程100元、往返140元（2026年10月11日读取）。缆车票和门票分开卖，儿童和老人没有优惠，只有身高1.2米及以下儿童免费。持缆车票的游客从北检票口入园。" },
      { question: "外国人能用护照订慕田峪门票吗？", answer: "能。景区规则把护照列为实名预约可用的证件，每本护照每天限购一张门票；下单时用外籍护照的游客不用换票，凭护照原件在检票口验证入园。我们没有实际验证用境外手机号注册和付款。" },
      { question: "慕田峪门票可以提前多久订？", answer: "按景区规则，可提前30天预订。官网购票系统会显示每天门票和缆车票的余量，并按入园时段售票，例如08:30-12:00和12:00-17:00。" },
      { question: "门票能退、能改期吗？", answer: "未检票的门票可以。规则允许在预约参观日当天24点前在购票平台申请退款或改签，票款在7个工作日内原路退回。超过时限后不能退款、不能改签，也不能入园。" },
      { question: "缆车票包含滑道吗？", answer: "不包含。景区规则写明，缆车与索道、滑道分属两家公司，票不通用。预订滑道的游客从滑道检票口入园。我们读取时，官网购票系统里没有滑道票。" },
      { question: "慕田峪长城几点开门、几点关门？", answer: "3月16日至11月15日：周一至周五7:30-18:00，周六、周日7:30-18:30。11月16日至次年3月15日：8:00-17:30。闭园前一小时停止售票，前半小时停止检票，缆车运营时间相同。" },
      { question: "一定要坐摆渡车吗？", answer: "不是必须，但摆渡车服务区站距离门票检票口大约三公里，官网购票系统建议乘坐。往返票15元，身高1.2米及以下儿童免费，没有其他优惠。" },
    ] },
    { id: "next-links", type: "internal-links", title: "安排长城这一天的其他事", items: [
      { label: "北京到慕田峪：交通方式比较", href: "/zh/guides/beijing-to-mutianyu-great-wall-transfer/" },
      { label: "从北京去哪段长城", href: "/zh/guides/great-wall-section-selector-from-beijing/" },
      { label: "外国游客预约故宫", href: "/zh/guides/forbidden-city-for-foreign-visitors/" }
    ] },
    { id: "sources", type: "sources", title: "票价与规则参考", items: [
      { label: "官网购票系统：价格、日期与入园时段", url: "https://fx.mutianyugreatwall.com/fore/index", publisher: "慕田峪长城景区", reviewedAt: "2026-10-11" },
      { label: "官网游客须知：预约、证件、退改与开放规则", url: "https://www.mutianyugreatwall.com/cnInformation", publisher: "慕田峪长城景区", reviewedAt: "2026-10-11" },
      { label: "景区公告（含临时闭园）", url: "https://www.mutianyugreatwall.com/cnNotices", publisher: "慕田峪长城景区", reviewedAt: "2026-10-11" },
      { label: "首图：Francesco Bini (Sailko) 拍摄的秋季慕田峪，CC BY-SA 4.0，已缩小", url: "https://commons.wikimedia.org/wiki/File:Mutianyu,_grande_muraglia_cinese,_veduta_(autunno_2024)_11.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-10-11" },
      { label: "首图衍生文件许可证：CC BY-SA 4.0", url: "https://creativecommons.org/licenses/by-sa/4.0/", publisher: "Creative Commons", reviewedAt: "2026-10-11" }
    ] }
  ]
} satisfies StructuredPageBody;

export default body;
