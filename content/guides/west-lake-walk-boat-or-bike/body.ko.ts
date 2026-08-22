import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead", type: "lead", text: "서호는 지도 속 파란 선을 도는 체력시험이 아니라 구간별로 읽는 경관입니다. 호숫가, 제방, 섬, 언덕과 도시 경계가 서로 다릅니다. 첫 방문에는 걷기·배·자전거 중 하나를 주 방식으로, 둘째는 연결로만 쓰세요. 목표는 출구가 있는 일관된 반나절이지 완주가 아닙니다." },
  { id: "answer", type: "callout", title: "바로 답하면", tone: "decision", body: "이야기, 정원과 호숫가 디테일이 중요하면 걷습니다. 물 위 시선이나 섬이 목적이면 당일 공식 운항을 확인한 배를 탑니다. 자전거는 허용된 길의 짧은 연결에만 쓰고 호수 전체를 붙어 도는 코스로 보지 마세요. 첫 방문에는 집중 산책과 한 번의 배 또는 대중교통 출구가 가장 현실적입니다." },
  { id: "mode-heading", type: "heading", level: 2, text: "방식마다 해결하는 문제가 다릅니다" },
  { id: "mode", type: "table", caption: "주 방식 선택", columns: ["방식", "보이는 것", "숨은 비용"], rows: [["걷기", "제방 규모, 정원, 다리, 비문과 호수·산 관계", "더위, 혼잡과 우회를 지도 거리가 감추며 피로 누적"], ["배", "수면 시선, 섬 접근과 호숫가 사이 전환", "노선, 선착장, 날씨, 줄과 막차가 동적"], ["자전거", "선택한 육지 구간 사이 빠른 연결", "주차구역, 금지구간, 교통과 앱 결제가 중단 가능"]] },
  { id: "anchor-heading", type: "heading", level: 2, text: "호숫가 이야기 하나를 고르세요" },
  { id: "anchors", type: "comparison", title: "첫 방문 앵커 세 가지", columns: [{ heading: "도시 쪽과 단교", body: "도심, 호수와 백제·고산 방향 관계가 즉시 보이고 줄이기 쉽지만 자주 붐빕니다." }, { heading: "소제와 서쪽", body: "긴 물·산 전망, 정원과 느린 경관에 좋으며 거리는 사진보다 큽니다." }, { heading: "남쪽과 뇌봉탑", body: "뇌봉탑, 저녁 빛이나 남쪽 동선이 앵커일 때 좋고 유료 장소가 호숫가 시간을 소모할 수 있습니다." }] },
  { id: "walk-heading", type: "heading", level: 2, text: "걷기에는 멈춤 규칙이 필요합니다" },
  { id: "walk", type: "paragraph", text: "강한 출구 두 곳 사이의 단방향 산책을 만드세요. 도시 쪽에서 고산까지 가고 나가거나, 소제 일부만 걷고 버스·차량으로 나옵니다. 기온, 보행 압력과 정원 체류시간을 알기 전에 호수 전체를 약속하지 마세요." },
  { id: "boat-heading", type: "heading", level: 2, text: "배는 동선을 바꿔야 합니다" },
  { id: "boat", type: "paragraph", text: "의미 있는 수면 시선, 이름 있는 섬 또는 다음 활동에 맞는 반대편으로 이동할 때만 배를 넣습니다. 당일 운영사, 정확한 선착장, 노선, 표 조건과 마지막 운항을 확인하세요. 작은 배·관광선·섬 노선은 탑승과 귀환이 다를 수 있습니다." },
  { id: "bike-heading", type: "heading", level: 2, text: "자전거는 합법적 단절이 있는 연결 수단" },
  { id: "bike", type: "callout", title: "물가에 바로 한 바퀴 선을 그리지 마세요", tone: "warning", body: "보행구역, 경관 통제, 붐비는 제방, 반납 규칙과 도로 교통이 연속 순환을 끊습니다. 현재 표지가 허용하는 곳만 타고 혼잡·금지 구간은 내려서 이동하며 지정 구역에 반납하세요. 앱이나 반납 실패를 위한 대중교통 대안을 둡니다." },
  { id: "plans-heading", type: "heading", level: 2, text: "실용적인 반나절 세 가지" },
  { id: "plans", type: "table", caption: "하나만 고르세요", columns: ["계획", "순서", "적합"], rows: [["고전 첫인상", "도시 쪽 호수→백제/고산 산책→교통으로 나감", "전체를 돌지 않는 첫 방문"], ["물과 정원", "서/남쪽 정원→운항 시 공식 배→짧은 반대편 산책", "경관 구성과 앉는 회복을 중시"], ["빠른 연결", "집중 산책→합법 자전거/대중교통→마지막 전망", "재방문자 또는 시간 예약 장소"]] },
  { id: "exit-heading", type: "heading", level: 2, text: "시작 전에 출구를 설계하세요" },
  { id: "exit", type: "list", items: ["중국어 교통/합법 픽업 출구 두 곳을 저장합니다.", "첫 제방이나 장소 뒤 날씨·피로 점검을 둡니다.", "배가 실제 어느 선착장으로 가는지 확인합니다.", "자전거는 금지구역 전 합법 반납점을 확인합니다.", "식사, 화장실과 앉는 구간을 일정에 포함합니다."] },
  { id: "weather", type: "table", caption: "날씨가 방식을 바꿉니다", columns: ["상황", "나은 대응"], rows: [["덥고 습함", "짧은 그늘 산책, 이른/늦은 시간, 앉는 이동"], ["비", "미끄럼 방지 신발, 노출 제방 축소, 배 재확인"], ["강풍·폭풍 경보", "공식 폐쇄를 따르고 항저우 실내 일정"], ["극심한 혼잡", "덜 압축된 한 구간과 대중교통 우회"]] },
  { id: "recovery", type: "callout", title: "이미 어긋났다면 방식을 더하지 마세요", tone: "decision", body: "배가 멈추거나 자전거 계정이 실패하거나 발이 아프면 다른 야심찬 순환으로 보상하지 마세요. 가장 가까운 강한 호숫가 이야기를 남기고 대중교통이나 합법 픽업으로 나와 다음 식사·열차·체크인을 지킵니다." },
  { id: "boundary", type: "callout", title: "모든 서호 명소의 주인이 아닙니다", tone: "neutral", body: "이 글은 걷기·배·자전거 선택과 출구만 담당합니다. 박물관, 탑, 사찰, 공연과 계절 행사는 각 운영 규칙을 따릅니다. 백사전 글은 전설과 항저우–전장 맥락을 담당합니다." },
  { id: "links", type: "internal-links", title: "항저우 계획 이어가기", items: [{ label: "항저우 도시 허브", href: "/ko/destinations/hangzhou/", description: "숙박일, 지역과 나머지 도시를 정합니다." }, { label: "백사전", href: "/ko/guides/white-snake-legend-hangzhou-zhenjiang/", description: "호숫가 장소의 문화적 의미를 읽습니다." }, { label: "상하이–항저우 교통", href: "/ko/guides/shanghai-hangzhou-transport-route/", description: "호수 방문과 도시 간 환승을 분리합니다." }, { label: "상하이·쑤저우·항저우·난징 순서", href: "/ko/guides/shanghai-suzhou-hangzhou-nanjing-route-order/", description: "장난 루트에서 항저우를 배치합니다." }, { label: "일정이 너무 바쁜가요?", href: "/ko/guides/is-your-china-itinerary-too-rushed/", description: "걷기, 출구와 깊이를 계산합니다." }] },
  { id: "sources", type: "sources", title: "일차 출처와 사진 크레디트", items: [{ label: "서호 풍경명승구 공식 포털", url: "https://westlake.hangzhou.gov.cn/", publisher: "항저우 서호 풍경명승구 관리위원회", reviewedAt: "2026-08-22" }, { label: "서호 문화경관", url: "https://whc.unesco.org/en/list/1334", publisher: "유네스코 세계유산센터", reviewedAt: "2026-08-22" }, { label: "대표 사진: Windmemories, CC BY-SA 4.0", url: "https://commons.wikimedia.org/wiki/File:20260424_West_Lake_and_Hangzhou_Skyline.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-22" }] }
] } as const satisfies StructuredPageBody;
export default body;
