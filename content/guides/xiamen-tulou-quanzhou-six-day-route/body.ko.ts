import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "answer", type: "lead",
      text: "샤먼으로 들어와 샤먼에서 나가는 6일 여행이라면 숙박은 5박입니다. 첫날과 마지막 밤은 샤먼, 그 사이에는 난징현·안시·취안저우에서 각각 1박합니다. 융딩 청치러우 일대와 난징 톈뤄컹은 서로 다른 날에 보세요. 두 지역을 하루에 몰아넣으면 관광보다 차 안에서 보내는 시간이 길어집니다."
    },
    { id: "night-heading", type: "heading", level: 2, text: "다음 날 동선을 따라 숙소를 옮기세요" },
    {
      id: "nights", type: "table", caption: "현재 6일 프라이빗 투어의 5박 숙소 순서",
      columns: ["숙박", "지역", "이곳에서 자는 이유"],
      rows: [
        ["1박째", "샤먼", "도착 후 쉬어 갑니다. 일찍 도착하고 배편이 확정되었을 때만 구랑위를 넣습니다."],
        ["2박째", "난징현", "융딩 토루를 본 뒤 다음 날 난징 지역 관광에 가까운 곳에서 잡니다."],
        ["3박째", "안시", "톈뤄컹을 보고 차 산지로 이어 가며 샤먼까지 되돌아가지 않습니다."],
        ["4박째", "취안저우", "구시가에서 저녁을 보내고 다음 날 해상 교류의 흔적을 더 봅니다."],
        ["5박째", "샤먼", "취안저우에서 돌아와 출국편을 타는 도시에서 마지막 밤을 보냅니다."]
      ]
    },
    { id: "day-one-heading", type: "heading", level: 2, text: "도착일의 구랑위행 배편부터 확인하세요" },
    {
      id: "day-one", type: "paragraph",
      text: "공개된 6일 투어는 공항 픽업 후 구랑위를 방문합니다. 하지만 늦은 비행기로 도착한다면 섬에서 하루를 보내는 일정으로 볼 수 없습니다. 실제 착륙 시각, 공항을 나오는 시간, 승선 부두와 예약된 배편을 먼저 맞춰야 합니다. 맞지 않으면 구랑위를 다른 시간으로 옮기거나 도착일을 가볍게 바꾸되, 다른 방문지를 덜어내야 할 수도 있습니다. 배표와 부두 선택은 별도 안내에서 확인할 수 있습니다."
    },
    { id: "cut-heading", type: "heading", level: 2, text: "6일보다 짧다면 무엇을 남길지 먼저 정하세요" },
    {
      id: "cut-options", type: "list", items: [
        "토루가 첫째라면 융딩 또는 난징 한 지역을 충분히 보세요. 서로 떨어진 두 지역을 하루에 찍고 지나가면 체험보다 이동이 길어집니다.",
        "차와 취안저우가 더 중요하다면 안시·취안저우를 남기고 토루 지역은 한 곳으로 줄인 새 견적을 요청하세요.",
        "호텔을 자주 옮기기 싫다면 샤먼 연박 동선을 따로 검토할 수 있습니다. 왕복 차량 이동이 늘어나므로 공개된 5박 순환 일정과는 다른 여행입니다.",
        "샤먼에서 귀국한다면 마지막 샤먼 숙박을 지키는 편이 편합니다. 출국일 아침에 취안저우에서 바로 공항으로 가면 여유가 적습니다."
      ]
    },
    {
      id: "fit", type: "callout", tone: "decision", title: "이 동선이 맞는 여행자",
      body: "구랑위, 서로 다른 두 토루 지역, 안시 차와 취안저우를 모두 보고 싶고 숙소를 옮기는 데 무리가 없다면 6일 순환 일정이 맞습니다. 일행 중 걷는 속도가 느린 분이 있다면 그분을 기준으로 방문지를 줄이세요. 짧게 바꾼 일정은 별도로 견적을 내야 합니다."
    },
    {
      id: "faq", type: "faq", title: "예약 전에 확인할 것", items: [
        { question: "5박 모두 샤먼에서 머물 수 있나요?", answer: "새 일정으로 요청할 수 있습니다. 현재 공개된 투어는 샤먼 2박, 난징현·안시·취안저우 각 1박입니다. 매일 샤먼으로 돌아가면 차량 이동이 늘어나므로 동선과 가격을 다시 확인해야 합니다." },
        { question: "융딩과 난징 토루를 같은 날 보나요?", answer: "아니요. 현재 동선은 2일 차에 융딩 청치러우 일대, 3일 차에 난징 톈뤄컹을 봅니다. 토루에 하루만 쓸 수 있다면 두 지역 중 하나를 고르세요." },
        { question: "샤먼에 도착한 날 구랑위에 꼭 갈 수 있나요?", answer: "보장할 수 없습니다. 실제 도착 시각과 확정된 배편, 당일 운항 상황에 달려 있습니다. 예약 전에 방문 시간을 서면으로 확인하고 늦게 도착한다면 그날을 종일 섬 관광으로 계산하지 마세요." }
      ]
    },
    {
      id: "links", type: "internal-links", title: "다음 계획에 필요한 페이지", items: [
        { label: "샤먼·토루·안시·취안저우 6일 프라이빗 투어", href: "/ko/tours/xiamen-tulou-quanzhou-6-day-private-tour/", description: "실제 숙박, 포함 항목과 문의 방법을 확인하세요." },
        { label: "푸젠 토루 군락 고르기", href: "/ko/guides/fujian-tulou-cluster-selection/", description: "토루에 하루만 쓸 때 어느 지역을 볼지 결정하세요." },
        { label: "샤먼에서 구랑위로 가는 배편", href: "/ko/guides/xiamen-hubs-to-gulangyu-ferry-terminal/", description: "도착편에 맞는 부두와 배표를 확인하세요." }
      ]
    },
    {
      id: "sources", type: "sources", title: "동선과 공식 자료", items: [
        { label: "푸젠 토루 세계유산", url: "https://whc.unesco.org/en/list/1113/", publisher: "유네스코 세계유산센터", reviewedAt: "2026-09-26" },
        { label: "취안저우 세계유산", url: "https://whc.unesco.org/en/list/1561/", publisher: "유네스코 세계유산센터", reviewedAt: "2026-09-26" },
        { label: "샤먼 여객선 운항 공지", url: "https://www.xmferry.com/", publisher: "샤먼 여객선", reviewedAt: "2026-09-26" },
        { label: "표지 사진: Jakob Montrasio의 구랑위 사진, CC BY 2.0", url: "https://commons.wikimedia.org/wiki/File:Gulangyu.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-09-26" }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
