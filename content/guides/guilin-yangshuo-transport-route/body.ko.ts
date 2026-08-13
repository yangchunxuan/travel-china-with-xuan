import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead", type: "lead", text: "구이린과 양숴에는 각각 여러 출발·도착 지점이 있습니다. 구이린에는 공항과 여러 기차역이 있고, 양숴역은 대부분의 양숴 숙소와 떨어진 싱핑에 있습니다. 리강 유람선을 이용하려면 출발 선착장과 수하물 계획도 따로 세워야 합니다." },
  { id: "answer", type: "callout", title: "양쪽 주소와 하루의 목적을 기준으로 선택한다", tone: "decision", body: "문 앞 이동과 짐이 가장 중요하면 도로 이동을 비교한다. 정확한 역을 맞추고 양숴에서 숙소까지 갈 차량을 정한 뒤에 열차를 비교한다. 리강 자체를 하루의 경험으로 삼고 싶을 때 유람선을 선택하며, 지도상 빠른 셔틀처럼 보인다는 이유로 고르지 않는다." },
  { id: "matrix-heading", type: "heading", level: 2, text: "소요 시간 하나로 비교할 수 없는 세 가지 이동 방식" },
  { id: "matrix", type: "table", caption: "각 선택은 다른 곳에서 시작하고 끝난다", columns: ["선택", "잘 맞음", "빠진 구간", "확인"], rows: [
    ["양숴역 열차", "직통 열차나 편리한 구이린역과 연결", "양숴 쪽 역에서 호텔까지 도로 이동", "정확한 역, 당일 열차와 확인된 픽업"],
    ["사전 예약 차량 또는 현재 운행하는 정기 교통", "공항/호텔 양쪽, 가족이나 여러 가방", "도로, 정확한 승차와 여러 하차 지점", "현재 운영사, 양쪽 위치, 짐과 체크인 마감"],
    ["리강 관광 유람선", "강 여행 자체가 하루의 목적일 때", "구이린 쪽 선착장 접근, 편도 유람선의 짐 보관 부재와 도착 뒤 호텔 이동", "모판산 또는 주장 출발, 룽터우산 도착, 운항일과 공지"],
  ]},
  { id: "warning", type: "callout", title: "양숴역은 대부분의 양숴 숙소 바로 옆이 아니다", tone: "warning", body: "구매 전에 역과 숙소를 따로 표시한다. 구이린 출발역이나 양숴의 마지막 도로 이동이 맞지 않으면 짧은 열차 구간의 장점이 사라진다." },
  { id: "direction-heading", type: "heading", level: 2, text: "강 관광은 방향이 중요하다" },
  { id: "direction", type: "paragraph", text: "리강 공식 안내에 따르면 핵심 유람선은 약 60km, 약 4시간의 편도 일정이다. 3성급 유람선은 모판산 여객항, 4성급 유람선은 주장 여객항에서 출발하며 모두 양숴 룽터우산 선착장에 내린다. 구이린의 두 출발항은 서로 다른 장소이고 왕복 교통편도 아니다." },
  { id: "groups", type: "comparison", title: "여행자에 맞는 연결", columns: [
    { heading: "공항 도착", items: ["항공 지연에 대비한 여유 확보", "도로가 두 번의 환승을 줄일 수 있음", "늦으면 호텔에 알리기"] },
    { heading: "철도 통과", items: ["정확한 양숴 정차 검색", "역 픽업 확인", "이유 없이 구이린 시내로 우회하지 않기"] },
    { heading: "풍경과 여유", items: ["강을 하루의 목적으로", "짐 보관이 있다고 가정하지 않기", "날씨와 수위에 따른 대안 유지"] },
  ]},
  { id: "recovery-heading", type: "heading", level: 2, text: "양쪽 위치가 맞지 않을 때" },
  { id: "recovery", type: "list", ordered: true, items: ["예약의 전체 역, 선착장 또는 정류장명을 읽는다.", "정확한 호텔 위치를 정식 운영사에 보낸다.", "교통을 바꾸기 전에 체크인과 다음 고정 열차 일정을 먼저 확인한다.", "실시간 변경은 철도와 현지 교통 공식 공지로 확인한다.", "양숴라고 적힌 이름 없는 길가 차량을 타지 않는다."] },
  { id: "facts", type: "callout", title: "변경 가능 정보 확인일: 2026년 8월 13일", tone: "neutral", body: "리강 공식 안내는 핵심 유람선을 약 60km, 약 4시간의 편도 일정으로 설명하며 3성급과 4성급 유람선의 출발항이 다르고 도착지는 양숴 룽터우산 선착장이라고 안내한다. 공식 안내는 성수기에는 적어도 하루 전 구매를 권하며, 선착장까지 가는 교통과 양숴에서 돌아오는 교통은 포함되지 않고 편도 유람선에 짐 보관 서비스가 없다고 밝힌다. 열차 정차는 날짜별로 12306에서 확인해야 한다. 양숴역에서 숙소까지의 현재 공식 고정 시간표나 요금은 찾지 못했으므로 오래된 가격이나 시간에 기대지 말고 따로 확인한다." },
  { id: "help", type: "callout", title: "양쪽 목적지를 비교할까요?", tone: "decision", body: "날짜, 구이린 도착 지점, 양숴 호텔, 인원, 짐과 강 이동이 교통인지 경험인지 보내 주세요. Homeground는 각 이동 구간을 비교하고 출발 전에 다시 확인할 정보를 정리해 드릴 수 있습니다." },
  { id: "links", type: "internal-links", title: "계속 계획하기", items: [
    { label: "중국 고속철도 첫 이용 안내", href: "/ko/guides/china-high-speed-train-first-time-guide/", description: "역을 고른 뒤 철도를 준비합니다." },
    { label: "중국 일정이 너무 빠듯한가요?", href: "/ko/guides/is-your-china-itinerary-too-rushed/", description: "강이나 도로 하루에 충분한 공간을 둡니다." },
    { label: "중국 여행자 결제", href: "/ko/guides/how-to-pay-in-china-as-a-tourist/", description: "마지막 구간의 결제 대안을 둡니다." },
    { label: "중국 호텔과 지하철", href: "/ko/guides/china-hotel-near-metro/", description: "역 이름이 숙소에 언제 도움이 되는지 봅니다." },
  ]},
  { id: "sources", type: "sources", title: "공식 출처와 사진 표기", items: [
    { label: "리강 교통과 선착장 공식 안내", url: "https://en.liriver.com.cn/page/article/lyfw.jtcx", publisher: "구이린 리강 풍경명승구", reviewedAt: "2026-08-13" },
    { label: "리강 공식 구매 채널", url: "https://en.liriver.com.cn/page/article/lyfw.pwxx", publisher: "구이린 리강 풍경명승구", reviewedAt: "2026-08-13" },
    { label: "편도 운항, 후속 교통과 짐 보관 부재에 관한 공식 안내", url: "https://www.liriver.com.cn/page/article/zxlj.jqdt/126", publisher: "구이린 리강 풍경명승구", reviewedAt: "2026-08-13" },
    { label: "철도 공식 예매 채널", url: "https://www.12306.cn/en/index.html", publisher: "중국철도 12306", reviewedAt: "2026-08-13" },
    { label: "양숴역 연결 도로가 싱핑진에 있음을 확인하는 공식 토지 공고", url: "https://dnr.gxzf.gov.cn/villageNews/show/450321?id=1240", publisher: "광시좡족자치구 자연자원청", reviewedAt: "2026-08-13" },
    { label: "대표 사진: Rat2의 양숴역, CC BY-SA 4.0, 크롭 편집", url: "https://commons.wikimedia.org/wiki/File:Yangshuo_Railway_Station_202102.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-12" },
    { label: "대표 사진 편집본 라이선스: CC BY-SA 4.0", url: "https://creativecommons.org/licenses/by-sa/4.0/", publisher: "Creative Commons", reviewedAt: "2026-08-12" },
  ]},
] } as const satisfies StructuredPageBody;
export default body;
