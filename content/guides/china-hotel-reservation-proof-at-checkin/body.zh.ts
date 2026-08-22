import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "answer-first",
      type: "lead",
      text: "你站在前台，护照放在台面上，手机里是确认函——店员却说查不到预订。先不要争论，也不要急着重新订房。按顺序走完前十五分钟：确认物业和分店没有走错，核对日期和姓名拼写，问清对方查的是哪个系统，然后把出票平台和它的供应商链条拉进来一起查。绝大多数案例只有四种结局：订单藏在另一个渠道里、姓名不匹配、平台侧确认延迟送达，或者这一晚真的失败——那就先解决今晚的住宿，再谈退款和追偿。",
    },
    {
      id: "first-heading",
      type: "heading",
      level: 2,
      text: "到店后的前十五分钟，按顺序做",
    },
    {
      id: "first-list",
      type: "list",
      ordered: true,
      items: [
        "确认物业与分店正确。连锁、关联门店和同名旅舍常常隔几个街区；以预订应用里的地图定位为准，别靠记忆或出租车司机的判断。",
        "用当地时间重新核对入住日期，特别是乘夜间航班跨时区抵达后可能已经偏移一天。",
        "逐字核对住客姓名：姓与名的先后次序写反、漏掉中间名、昵称拼写都会让检索失败。",
        "在预订应用里查看订单状态：已确认、处理中、已取消、待支付——每种状态对应不同的修法。",
        "先出示订单号，再出示确认邮件或凭证；请前台分别按订单号、姓名、手机号后几位各查一次。",
        "请前台不要只看一个屏幕：自己的物业管理系统、平台端（外网/传真）队列、连锁集团的中央预订部都要看。",
        "当着前台联系平台的在线客服，请平台确认供应商是否已把预订发到物业，并把书面确认同时发给你和酒店。",
      ],
    },
    {
      id: "cause-heading",
      type: "heading",
      level: 2,
      text: "判断你遇到的是哪种故障",
    },
    {
      id: "cause-table",
      type: "table",
      caption: "查不到预订的八种原因，以及各自最快的修复方",
      columns: ["原因", "典型表现", "谁修得最快"],
      rows: [
        ["物业或分店搞错", "前台什么都查不到；应用地图指向另一处；同名酒店接了电话。", "你自己——前往正确地址；也可请平台复核地址。"],
        ["姓名或证件不匹配", "存在近似拼写的订单，或护照姓名顺序与预订不一致。", "前台加平台；改名可能需要供应商重发。"],
        ["订单尚未同步", "平台显示已确认，物业却无记录。低价预付房价经批发商流转时常见。", "平台去追批发商；部分房价要在下单数小时后才到达物业。"],
        ["付款或担保失败", "订单显示未支付、卡片授权失败或担保卡被拒。", "你和发卡行；款项理顺后平台可重试或重订。"],
        ["酒店超售", "订单真实存在，但约定价格档已无房。", "值班经理主导换店安置；平台按其保障条款施压。"],
        ["订单被上游取消", "状态显示已取消——有时因扣款失败或担保过期被静默触发。", "平台解释取消原因；按现价重订可能难以避免。"],
        ["外宾接待问题", "有房，但员工称系统无法登记外国护照。", "这是登记兼容性问题，归外国护照专文管，不是丢订单。"],
        ["房型不符", "能办入住，但分配的房间与凭证不符。", "归房型不符专文管；开箱前在门口解决。"],
      ],
    },
    {
      id: "owner-heading",
      type: "heading",
      level: 2,
      text: "谁真正有能力帮你解决",
    },
    {
      id: "owner-comparison",
      type: "comparison",
      title: "五个台面，五种权限",
      columns: [
        {
          heading: "前台",
          items: [
            "掌握今晚的房卡，只能看到接入本店的系统。",
            "可以查其他渠道、致电预订部、标记无房赶客情况。",
            "看不到批发商队列，也不能替平台付款；追问时要说清“您查过哪些”。",
          ],
        },
        {
          heading: "酒店预订部",
          items: [
            "保管团队价、协议价和延迟同步的订单，夜班屏幕上未必可见。",
            "请前台当着你的面打电话过去；许多同步缺口就此解决。",
          ],
        },
        {
          heading: "OTA 平台",
          items: [
            "拥有你的订单记录，以及与实际卖房价的供应商之间的关系。",
            "按中国在线旅游规章，平台应积极协助旅游者维权，国家鼓励平台先行赔付。",
            "部分平台对“确认后被供应商取消”公布了明确保障——读你的那份，它决定你该要求什么。",
          ],
        },
        {
          heading: "批发商 / 床位供应商",
          items: [
            "许多预付房价背后的隐形中间层，经常正是没把房单送到物业的一方。",
            "你通常不直接联系它——由平台出面。请平台提供供应商的确认链路。",
          ],
        },
        {
          heading: "发卡行",
          items: [
            "处理支付争议：未获得服务的扣款、重复扣款、退款未到。",
            "在住宿安顿之后介入；保存全部收据和聊天记录作为输入。",
          ],
        },
      ],
    },
    {
      id: "overbooking-heading",
      type: "heading",
      level: 2,
      text: "超售之后：换店安置，不讲童话",
    },
    {
      id: "overbooking-p1",
      type: "paragraph",
      text: "当酒店承认订单存在但原价位已无房，问题就从“找不到订单”变成“供应失败”。向值班经理提出换店安置：今晚就近安排同等或更好的房间，交通由酒店安排或报销，差价由责任方承担——然后要求把这三条写成文字。替代住宿、交通和差价究竟由谁承担，取决于你的合同链条和现场处理结果；中国对航班超售规定了必须公布的处置程序，但酒店没有对应的全国统一标准，善意之外的一切都落在平台保障和酒店自身政策上。",
    },
    {
      id: "overbooking-callout",
      type: "callout",
      title: "具体要什么",
      body: "步行可达或短车程内的同等或更好房间；车费有人付；差价退还或吸收；写明批准人；拿到新的确认号。如果替代房间需要你先付，两张收据都留好——原订单扣款和新预订是两条独立的追偿线，直到有人把它们合并。",
      tone: "decision",
    },
    {
      id: "night-heading",
      type: "heading",
      level: 2,
      text: "深夜仍未解决：先安全，再算账",
    },
    {
      id: "night-list",
      type: "list",
      ordered: true,
      items: [
        "给自己设一个时限：比如并行沟通三十分钟后仍查无订单、也没有换店方案，就停止争论，自己订下最近一间深夜可入住的房间。",
        "安全优先于最优：照明良好、电梯门锁正常、那个钟点打车或地铁可达。完美等到天亮再追求。",
        "保全每一份证据：带时间戳的查询失败截图、与平台的聊天记录、替住房间的水单、打车票、差价凭证。",
        "不要接受深夜没有任何记录的现金“私了”；书面或在应用内留痕对双方都是保护。",
        "第二天上午冷静重启案件：正式取消或兑现原订单，主张有据可查的额外支出，若响应停滞就走上证据包升级路线。",
      ],
    },
    {
      id: "answers-heading",
      type: "heading",
      level: 2,
      text: "听懂前台：三种标准答复与对应动作",
    },
    {
      id: "answers-comparison",
      type: "comparison",
      title: "答复的措辞预示着修法",
      columns: [
        {
          heading: "我们系统里没有",
          items: [
            "含义：所有可见渠道都没有收到你的订单——上游同步或投递失败。",
            "下一步：当着前台打开平台客服，请平台确认是否已投递到这家确切名称的物业，并致电该物业自己的预订部。",
            "注意：屏幕上若出现近似拼写的订单，问题就转化为改名修正。",
          ],
        },
        {
          heading: "你的房价来自第三方，我们看不到",
          items: [
            "含义：物业在等某个批发商队列投递房单，而它还没到。",
            "下一步：向平台索要供应商确认链路和直接确认号；请前台先以凭证号作临时参考。",
            "注意：若对方拒绝留下任何记录，坚持要求书面记下时间、订单号和你出示过的证件，再离开柜台。",
          ],
        },
        {
          heading: "我们今晚满了",
          items: [
            "含义：订单存在，但你价位的房没了——这是超售，不是丢单。",
            "下一步：从“找订单”切换到“谈安置”：就近同等或更好房间、交通有人管、差价有人担，全部由值班经理书面确认。",
            "注意：未经你同意被安排去明显更差且很远的酒店时，可以拒绝不合理安置，改为就原订单索赔。",
          ],
        },
      ],
    },
    {
      id: "phrases-heading",
      type: "heading",
      level: 2,
      text: "前台两句话：中英对照可直接使用",
    },
    {
      id: "phrases-list",
      type: "list",
      items: [
        "中文：我通过携程有一个已确认的预订，订单号在这里，住客姓名与护照一致。请先按订单号查一次，再按我的姓查一次好吗？ — English: I have a confirmed booking through Trip.com, order number shown here, guest name exactly as printed. Could you search by the order number first, then by my family name?",
        "中文：您刚才查的是哪个系统？可以再给预订部打个电话，并查看今晚到店的平台端队列吗？ — English: Which system did you check? Could you also call your reservations office and look at the platform extranet queue for tonight's arrivals?",
        "中文：如果确实找不到订单，请书面记录我在某时间出示了有效确认。之后我会要求平台安排同等住宿。 — English: If the booking truly cannot be located, please note in writing that I presented a valid confirmation at [time]. I will then ask the platform to arrange equivalent lodging.",
      ],
    },
    {
      id: "faq-heading",
      type: "heading",
      level: 2,
      text: "此刻最常被问到的四个问题",
    },
    {
      id: "faq-list",
      type: "list",
      items: [
        "前台能不能不登记直接给我房卡？不能。在中国，每位过夜住客都必须凭有效身份证件登记，小旅馆墙上的提示牌写得明明白白：一人一证。主动提出跳过登记的前台，是在给你制造风险，不是在帮你解决问题。",
        "房间明明有，员工却说系统登记不了外国护照。那问题出在接待能力，不在你的订单。请他们尝试手工录入护照信息，或致电预订部；如果仍被拒绝，就换一家酒店，并把原订单当作供应失败来追偿。",
        "我现在就自己付钱另订一间，还是等平台处理？给自己设个时限：并行沟通三十到四十五分钟。既没有订单、也没有书面换店方案时，就自己订下备用房间并保留所有收据——今晚确定的床，比明天早上完美的案卷更值钱。",
        "酒店查不到我，平台会自动退款吗？不会自动。退款遵循你购买的产品条款加上平台公布的供应失败保障。打开客服对话，按时间线陈述事实，并追问适用订单的哪一条款——模糊的投诉只会得到模糊的答复。",
      ],
    },
    {
      id: "boundary-heading",
      type: "heading",
      level: 2,
      text: "本页不能承诺的事",
    },
    {
      id: "boundary-list",
      type: "list",
      items: [
        "没有任何规则强迫一家酒店兑现它查不到的订单，也没有规则保证失败之夜的退款金额——结果取决于你的合同链条和平台的产品级保障。",
        "换店安置的标准（距离、品质、交通、差价）是一事一议的协商结果，不是法定权利。",
        "任何人都无法在本页承诺实时房态；备用房间取决于当时的库存。",
        "除合法登记流程外，不要把护照、完整卡号或验证码交给任何人；正经找订单的人不需要这些。",
      ],
    },
    {
      id: "internal-links",
      type: "internal-links",
      title: "让恢复继续推进",
      items: [
        { "label": "外国护照与中国酒店", "href": "/guides/foreigners-china-hotel/", "description": "在前台区分接待能力问题与订单丢失问题。" },
        { "label": "整理预订争议证据包", "href": "/guides/china-booking-dispute-evidence-pack/", "description": "把今晚的时间戳和聊天记录变成明天的案卷。" },
        { "label": "国际连锁还是本土酒店", "href": "/guides/international-chain-or-local-hotel-china/", "description": "连锁中央预订的行为方式与独立前台不同。" },
        { "label": "游客在中国的支付指南", "href": "/guides/how-to-pay-in-china-as-a-tourist/", "description": "为备用房间准备好可用的支付方式。" },
      ],
    },
    {
      id: "sources",
      type: "sources",
      title: "已核验的一手来源",
      items: [
        { "label": "Trip.com Terms and Conditions（下单时库存提示；供应商条款独立；证件不符排除条款）", "url": "https://www.trip.com/contents/service-guideline/terms.html", "publisher": "Trip.com", "reviewedAt": "2026-08-22" },
        { "label": "Booking Guarantee（确认后被供应商取消：全额退款外加不低于订单总额 20% 的补偿）", "url": "https://us.trip.com/pages/customer-service/", "publisher": "Trip.com", "reviewedAt": "2026-08-22" },
        { "label": "《在线旅游经营服务管理暂行规定》（平台积极协助义务；鼓励先行赔付）", "url": "https://zwgk.mct.gov.cn/zfxxgkml/zcfg/bmgz/202012/t20201204_905349.html", "publisher": "中华人民共和国文化和旅游部", "reviewedAt": "2026-08-22" },
        { "label": "《公共航空运输旅客服务管理规定》（承运人须公布超售处置规定——引用以对照说明酒店无同等全国标准）", "url": "https://www.caac.gov.cn/XXGK/XXGK/MHGZ/202103/t20210315_206814.html", "publisher": "中国民用航空局", "reviewedAt": "2026-08-22" },
      ],
    },
  ],
};

export default body;

