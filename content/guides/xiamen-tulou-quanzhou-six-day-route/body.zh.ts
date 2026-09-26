import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "answer", type: "lead",
      text: "如果从厦门进出，在福建玩六天，五晚可以这样住：厦门首尾各一晚，南靖、安溪、泉州各一晚。第二天看永定承启楼一带，第三天再看南靖田螺坑。把两个土楼区域拆开，才有时间好好走，而不是一天坐车赶两张照片。"
    },
    { id: "night-heading", type: "heading", level: 2, text: "住宿顺着第二天的路走" },
    {
      id: "nights", type: "table", caption: "现有六天私家团的五晚住宿顺序",
      columns: ["第几晚", "住哪里", "这样住解决什么问题"],
      rows: [
        ["1", "厦门", "抵达后先安顿。若航班够早、船班已确认，再安排鼓浪屿。"],
        ["2", "南靖", "白天从厦门走永定土楼，晚上住到第二天南靖游览的方向。"],
        ["3", "安溪", "看完田螺坑再去茶山，不必折回厦门。"],
        ["4", "泉州", "古城留一个晚上，第二天还有时间看海丝文化。"],
        ["5", "厦门", "从泉州返回，离境当天从厦门出发。"]
      ]
    },
    { id: "day-one-heading", type: "heading", level: 2, text: "抵达当天，先算能不能赶上鼓浪屿" },
    {
      id: "day-one", type: "paragraph",
      text: "现有六天团把鼓浪屿放在接机后，但晚到的航班不能当成完整游岛日。先核对落地时间、出机场的时间、上船码头和已订船班；如果接不上，就商量换到别的时段，或者把抵达日改得轻松一点。调整顺序可能要舍掉另一项游览，不能口头说“都塞得下”。订票和码头怎么选，另有一篇专门说明。"
    },
    { id: "cut-heading", type: "heading", level: 2, text: "少于六天，先决定最想保留什么" },
    {
      id: "cut-options", type: "list", items: [
        "主要想看土楼：永定或南靖选一处认真看。压成一天跨两个区域，车上时间会吃掉参观时间。",
        "更想喝茶、逛泉州：留下安溪和泉州，土楼缩成一个区域，再按新路线重新报价。",
        "不想频繁换酒店：可以讨论厦门连住，但每天往返的车程会增加，这已经不是网页上那条五晚环线。",
        "从厦门飞走：尽量保留最后一晚厦门。返程早上才从泉州赶机场，容错空间小。"
      ]
    },
    {
      id: "fit", type: "callout", tone: "decision", title: "这条路线适合谁",
      body: "想把鼓浪屿、两个土楼区域、安溪茶和泉州连在一起，而且能接受换住宿的人，可以看六天环线。若同行有人走得慢，先按最慢的那个人调整；删减后的路线要重新核价，不能直接拿六天价减一天。"
    },
    {
      id: "faq", type: "faq", title: "订之前常问的事", items: [
        { question: "五晚都住厦门行不行？", answer: "可以提出这样的需求，但现有六天产品是厦门两晚、南靖一晚、安溪一晚、泉州一晚。每天从厦门往返会多占车程，行程和报价都要重新确认。" },
        { question: "永定和南靖土楼是同一天吗？", answer: "不是。现有路线第 2 天看永定承启楼一带，第 3 天看南靖田螺坑。如果只有一天看土楼，先从这两个地理区域里选一处。" },
        { question: "抵达厦门当天一定能上鼓浪屿吗？", answer: "不能保证。要看航班实际落地、已确认的船票和当天运行情况。预订前把上岛时间写清楚，晚到就不要把这天算成完整游览日。" }
      ]
    },
    {
      id: "links", type: "internal-links", title: "接着看具体安排", items: [
        { label: "厦门、土楼、安溪、泉州六天私家团", href: "/zh/tours/xiamen-tulou-quanzhou-6-day-private-tour/", description: "看实际住宿、包含项目和咨询方式。" },
        { label: "福建土楼群怎么选", href: "/zh/guides/fujian-tulou-cluster-selection/", description: "只留一个土楼日时，先挑地理区域。" },
        { label: "厦门到鼓浪屿的码头与船票", href: "/zh/guides/xiamen-hubs-to-gulangyu-ferry-terminal/", description: "知道抵达时间后再核对码头与船班。" }
      ]
    },
    {
      id: "sources", type: "sources", title: "路线与官方资料", items: [
        { label: "福建土楼世界遗产", url: "https://whc.unesco.org/en/list/1113/", publisher: "联合国教科文组织", reviewedAt: "2026-09-26" },
        { label: "泉州世界遗产", url: "https://whc.unesco.org/en/list/1561/", publisher: "联合国教科文组织", reviewedAt: "2026-09-26" },
        { label: "厦门轮渡运营公告", url: "https://www.xmferry.com/", publisher: "厦门轮渡有限公司", reviewedAt: "2026-09-26" },
        { label: "封面实拍：Jakob Montrasio 拍摄鼓浪屿，CC BY 2.0", url: "https://commons.wikimedia.org/wiki/File:Gulangyu.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-09-26" }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
