import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead", type: "lead", text: "구이린과 양숴는 각각 하나의 위치가 아니다. 구이린에는 공항과 여러 기차역이 있고 양숴역은 교통 지점이지 양숴 호텔이 아니다. 강 이동도 별도 선착장과 짐 연결이 있다." },
  { id: "answer", type: "callout", title: "양쪽 주소와 하루의 목적을 기준으로", tone: "decision", body: "공항이나 호텔 위치와 짐이 중요하면 도로 이동을 비교한다. 정확한 역과 후속 차량이 자연스럽게 이어지면 열차를 쓴다. 리강 유람선은 빠른 셔틀이 아니라 하루의 동선 자체를 바꾸는 관광 경험으로 본다." },
  { id: "matrix-heading", type: "heading", level: 2, text: "소요 시간 하나로 비교할 수 없는 세 가지 이동 방식" },
  { id: "matrix", type: "table", caption: "각 선택은 다른 곳에서 시작하고 끝난다", columns: ["선택", "잘 맞음", "빠진 구간", "확인"], rows: [
    ["양숴역 열차", "직통 열차나 편리한 구이린역과 연결", "양숴 쪽 역에서 호텔까지 도로 이동", "정확한 역, 당일 열차와 확인된 픽업"],
    ["사전 예약 차량 또는 현재 운행하는 정기 교통", "공항/호텔 양쪽, 가족이나 여러 가방", "도로, 정확한 승차와 여러 하차 지점", "현재 운영사, 양쪽 위치, 짐과 체크인 마감"],
    ["리강 관광 유람선", "강 여행 자체가 하루의 목적일 때", "구이린 쪽 선착장 접근, 편도 유람선의 짐 보관 부재와 도착 뒤 호텔 이동", "모판산 또는 주장 출발, 룽터우산 도착, 운항일과 공지"],
  ]},
  { id: "warning", type: "callout", title: "양숴역은 싱핑에 있으며 숙소 앞이 아니다", tone: "warning", body: "구매 전에 역과 숙소를 따로 표시한다. 구이린 출발역이나 양숴 도로 환승이 틀리면 짧은 열차 구간의 장점이 사라진다." },
  { id: "direction-heading", type: "heading", level: 2, text: "강 관광은 방향이 중요하다" },
  { id: "direction", type: "paragraph", text: "리강 공식 안내에 따르면 핵심 유람선은 약 60km, 약 4시간의 편도 일정이다. 3성급 유람선은 모판산 여객항, 4성급 유람선은 주장 여객항에서 출발하며 모두 양숴 룽터우산 선착장에 내린다. 구이린의 두 출발항은 서로 다른 장소이고 왕복 교통편도 아니다." },
  { id: "groups", type: "comparison", title: "여행자에 맞는 연결", columns: [
    { heading: "공항 도착", items: ["항공 지연에 대비한 여유 확보", "도로가 두 번의 환승을 줄일 수 있음", "늦으면 호텔에 알리기"] },
    { heading: "철도 통과", items: ["정확한 양숴 정차 검색", "역 픽업 확인", "이유 없이 구이린 시내로 우회하지 않기"] },
    { heading: "풍경과 여유", items: ["강을 하루의 목적으로", "짐 보관이 있다고 가정하지 않기", "날씨와 수위에 따른 대안 유지"] },
  ]},
  { id: "recovery-heading", type: "heading", level: 2, text: "양쪽 위치가 맞지 않을 때" },
  { id: "recovery", type: "list", ordered: true, items: ["예약의 전체 역, 선착장 또는 정류장명을 읽는다.", "정확한 호텔 위치를 정식 운영사에 보낸다.", "교통을 바꾸기 전에 체크인과 다음 고정 열차 일정을 먼저 확인한다.", "실시간 변경은 철도와 현지 교통 공식 공지로 확인한다.", "양숴라고 적힌 이름 없는 길가 차량을 타지 않는다."] },
  { id: "facts", type: "callout", title: "동적 교통 정보 확인일: 2026년 8월 12일", tone: "neutral", body: "리강 공식 안내는 핵심 유람선을 약 60km, 약 4시간의 편도 일정으로 설명하며 3성급과 4성급 유람선의 출발항이 다르고 도착지는 양숴 룽터우산 선착장이라고 안내한다. 공식 사이트는 사전 판매를 운영하고 당일 표는 소량만 남기며 수위에 따른 운항 중단과 재개 공지를 게시한다. 열차 정차는 날짜별로 12306에서 확인해야 한다. 양숴역과 시내 사이의 현재 공식 여객 시간표는 찾지 못했으므로 오래된 고정 요금이나 시간에 기대지 말고 해당 구간을 별도로 확인한다." },
  { id: "help", type: "callout", title: "양쪽 목적지를 비교할까요?", tone: "decision", body: "날짜, 구이린 도착 지점, 양숴 호텔, 인원, 짐과 강 이동이 교통인지 경험인지 보내 주세요. Homeground는 환승과 다시 확인할 사실을 표시할 수 있습니다." },
  { id: "links", type: "internal-links", title: "계속 계획하기", items: [
    { label: "중국 고속철도 첫 이용 안내", href: "/ko/guides/china-high-speed-train-first-time-guide/", description: "역을 고른 뒤 철도를 준비합니다." },
    { label: "중국 일정이 너무 빠듯한가요?", href: "/ko/guides/is-your-china-itinerary-too-rushed/", description: "강이나 도로 하루에 충분한 공간을 둡니다." },
    { label: "중국 여행자 결제", href: "/ko/guides/how-to-pay-in-china-as-a-tourist/", description: "마지막 구간의 결제 대안을 둡니다." },
    { label: "중국 호텔과 지하철", href: "/ko/guides/china-hotel-near-metro/", description: "역 이름이 숙소에 언제 도움이 되는지 봅니다." },
  ]},
  { id: "sources", type: "sources", title: "공식 출처와 사진 표기", items: [
    { label: "리강 유람선 출발·도착 지점과 교통 공식 안내", url: "https://en.liriver.com.cn/page/article/lyfw.jtcx", publisher: "구이린 리강 풍경명승구", reviewedAt: "2026-08-12" },
    { label: "유람선 운항 공식 공지", url: "https://www.liriver.com.cn/mobile/article/zxlj.tzgg", publisher: "구이린 리강 풍경명승구", reviewedAt: "2026-08-12" },
    { label: "편도 운항과 짐 보관 부재에 관한 공식 안내", url: "https://www.liriver.com.cn/page/article/zxlj.jqdt/126", publisher: "구이린 리강 풍경명승구", reviewedAt: "2026-08-12" },
    { label: "현재 광시 철도 운행 안내", url: "https://jtt.gxzf.gov.cn/xwdt/zwxmtxx/t27417062.shtml", publisher: "광시좡족자치구 교통운수청", reviewedAt: "2026-08-12" },
    { label: "싱핑에 위치한 양숴역", url: "https://m.qlgl.gov.cn/article-3-43849-1.html", publisher: "구이린시 기율검사위원회", reviewedAt: "2026-08-12" },
    { label: "철도 공식 예매 채널", url: "https://www.12306.cn/en/index.html", publisher: "중국철도 12306", reviewedAt: "2026-08-12" },
    { label: "대표 사진: Rat2의 양숴역, CC BY-SA 4.0, 크롭 편집", url: "https://commons.wikimedia.org/wiki/File:Yangshuo_Railway_Station_202102.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-12" },
    { label: "대표 사진 편집본 라이선스: CC BY-SA 4.0", url: "https://creativecommons.org/licenses/by-sa/4.0/", publisher: "Creative Commons", reviewedAt: "2026-08-12" },
  ]},
] } as const satisfies StructuredPageBody;
export default body;
