import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead", type: "lead", text: "샤먼에서 구랑위로 갈 때는 네 곳의 이름이 정확히 맞아야 한다. 중국 본토 도착 지점, 표에 적힌 샤먼 출발 터미널, 섬 도착 선착장, 그리고 숙소다. 이 가운데 하나라도 잘못 연결하면 엉뚱한 페리 터미널로 갈 수 있다." },
  { id: "answer", type: "callout", title: "날짜가 정해진 페리를 먼저 예약하고 육상 교통을 연결한다", tone: "decision", body: "샤먼 페리의 최신 안내부터 확인한다. 현재 FAQ는 위챗 공식 계정 `xmferry` 또는 알리페이 생활계정 ‘屿见厦门轮渡’를 공식 구매 경로로 안내한다. 좌석이 있는 노선과 양쪽 터미널명을 확인한 뒤 샤먼공항, 샤먼역 또는 샤먼북역에서의 이동을 계산한다. 오래된 지도에서 가까워 보이는 시내 선착장으로 임의로 바꾸지 않는다." },
  { id: "matrix-heading", type: "heading", level: 2, text: "출발 지점이 중국 본토 이동을 바꾼다" },
  { id: "matrix", type: "table", caption: "페리 표가 터미널을 결정한다", columns: ["출발", "주요 부담", "대비 방법"], rows: [
    ["샤먼공항", "항공 지연, 짐 찾기, 도로와 수속 마감", "늦은 페리나 샤먼섬 숙박 대안"],
    ["샤먼역", "출구, 도로 승차 지점과 시내 교통", "정확한 터미널 위치와 충분한 수속 시간"],
    ["샤먼북역", "긴 시내 이동과 큰 기차역", "철도 지연 여유와 확인된 직접 픽업"],
    ["샤먼 호텔", "짧은 지도 거리에도 도로와 혼잡이 있음", "가장 가까운 배가 아니라 표의 터미널"],
  ]},
  { id: "warning", type: "callout", title: "터미널명은 운행 사실이다", tone: "warning", body: "관광객 노선, 주민 노선, 주간 운영과 임시 변경은 서로 바꿀 수 없다. 현재 예약에서 샤먼과 구랑위의 전체 중국어 터미널명을 복사해 기사에게 둘 다 보여 준다." },
  { id: "chain-heading", type: "heading", level: 2, text: "섬 호텔까지 전체 동선을 계획한다" },
  { id: "chain", type: "list", ordered: true, items: ["도착 지점에서 예약에 적힌 터미널의 정확한 입구까지.", "여권 또는 승선증 확인과 검표 마감 전 충분한 시간.", "예약한 페리로 지정된 섬 선착장까지.", "선착장에서 숙소까지의 실제 도보와 짐 이동.", "귀환 자격, 중국 본토 후속 교통과 날씨 대안."] },
  { id: "groups", type: "comparison", title: "짐이 섬 도착을 바꾼다", columns: [
    { heading: "당일, 가벼운 짐", items: ["더 많이 걸을 수 있음", "귀환 좌석 계속 확인", "예약 이름 준비"] },
    { heading: "섬 호텔", items: ["호텔에 권장 도착 선착장 문의", "짐 운반 도움은 별도 확인", "차량이 페리 도착에 맞춰 기다린다고 가정하지 않기"] },
    { heading: "가족 또는 큰 가방", items: ["가장 빠듯한 연결 피하기", "각 여행자가 신분 서류 소지", "늦으면 샤먼섬 첫날 밤 고려"] },
  ]},
  { id: "recovery-heading", type: "heading", level: 2, text: "터미널이 틀리거나 배를 놓치면" },
  { id: "recovery", type: "table", caption: "거리 안내보다 운영사 기록을 사용", columns: ["문제", "대응"], rows: [
    ["기사가 다른 선착장에 도착", "표의 전체 터미널과 맞기 전 짐을 내리지 않기"],
    ["항공/열차 지연", "페리 공식 변경 채널을 사용하고 필요하면 샤먼섬 숙박부터 확보"],
    ["표와 신분 불일치", "공식 직원에게 묻고 다른 사람 신분에 묶인 재판매 표 사지 않기"],
    ["날씨 중단", "샤먼 페리 공지를 따르고 경로 변경 전 섬 숙소에 알리기"],
  ]},
  { id: "facts", type: "callout", title: "변경 가능 정보 확인일: 2026년 8월 13일", tone: "neutral", body: "현재 FAQ는 온라인 구매자를 공식 위챗 또는 알리페이 채널로 안내한다. 외국인은 실명 인증된 알리페이 계정에 여권 정보를 입력할 수 있지만 일부 서류는 현장 확인이 필요하다. 예매 기간은 승선일을 포함해 15일이며 매일 오전 9시에 15일째 표가 열린다. 검표는 출항 20분 전에 시작하고 10분 전에 마감한다. 출도 표에는 보통 20일 안에 현재 관광객 노선 규정에 맞는 무료 귀환 1회가 포함되지만 귀환 시간이나 선착장을 미리 확정해 주는 것은 아니다. 같은 FAQ 안에 오래된 안내도 남아 있어 결제 전 최신 채널과 노선을 다시 확인해야 한다." },
  { id: "help", type: "callout", title: "도착 지점과 페리를 맞출까요?", tone: "decision", body: "날짜, 항공편이나 열차, 표의 양쪽 터미널, 섬 호텔, 인원과 짐을 보내 주세요. Homeground는 환승과 지연에 대비한 여유를 확인할 수 있으며 좌석은 공식 운영사가 관리합니다." },
  { id: "links", type: "internal-links", title: "계속 계획하기", items: [
    { label: "중국 고속철도 첫 이용 안내", href: "/ko/guides/china-high-speed-train-first-time-guide/", description: "페리 환승 전 철도 도착을 준비합니다." },
    { label: "국제선 전 중국에서의 마지막 밤", href: "/ko/guides/china-last-night-before-international-flight/", description: "섬에서 돌아오는 교통 때문에 출국편이 위험해지지 않게 합니다." },
    { label: "중국 일정이 너무 빠듯한가요?", href: "/ko/guides/is-your-china-itinerary-too-rushed/", description: "철도, 도로와 페리 수속 마감을 지나치게 압축하지 않습니다." },
    { label: "중국 여행자 결제", href: "/ko/guides/how-to-pay-in-china-as-a-tourist/", description: "중국 본토 교통의 결제 대안을 둡니다." },
  ]},
  { id: "sources", type: "sources", title: "공식 출처와 사진 표기", items: [
    { label: "공식 온라인 구매 FAQ: 최신 채널, 여권, 귀환 유효기간", url: "https://xmferry.com/wybm/wshlk/wlgpp/index.htm", publisher: "샤먼 페리", reviewedAt: "2026-08-13" },
    { label: "2026년 공식 공지: 예매 기간 15일", url: "https://www.xmferry.com/xwzx/zxgg/32338.htm", publisher: "샤먼 페리", reviewedAt: "2026-08-13" },
    { label: "공식 검표 및 귀환 FAQ", url: "https://xmferry.com/wybm/wshlk/chch/index.htm", publisher: "샤먼 페리", reviewedAt: "2026-08-13" },
    { label: "대표 사진: HualinXMN의 크루즈센터 버스 구역, CC BY 4.0, 크롭 편집", url: "https://commons.wikimedia.org/wiki/File:Cruise_Center_Bus_Station(Xiamen)._20190203.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-12" },
    { label: "대표 사진 편집본 라이선스: CC BY 4.0", url: "https://creativecommons.org/licenses/by/4.0/", publisher: "Creative Commons", reviewedAt: "2026-08-12" },
  ]},
] } as const satisfies StructuredPageBody;
export default body;
