import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body: StructuredPageBody = {schemaVersion: "1.0.0", blocks: [
  {id: "answer-first", type: "lead", text: "중국의 공익 완행열차는 고속철도와 도로가 지역 이동을 완전히 대체하지 못한 작은 마을을 연결하기 위해 유지되는 일반 여객열차입니다. 같은 열차에 학생, 장터 상인, 근로자, 병원 방문자와 가족을 만나러 가는 승객이 함께 탈 수 있습니다. 농촌의 어려움을 전시하는 관광열차나 연출된 복고 체험이 아닙니다."},
  {id: "function-table", type: "table", caption: "이 서비스가 다른 이유", columns: ["특징", "공공 기능", "여행자가 알아둘 점"], rows: [
    ["많은 작은 역", "빠른 열차가 지나치는 마을을 연결합니다.", "여정이 길어 속도보다 시간표 확인이 중요합니다."], ["낮은 비용 지향", "필수 이동의 부담을 낮춥니다.", "오래된 기사 속 요금은 현재 가격이 아닙니다."], ["생활과 여객 이동", "통학, 일, 장터와 가족 방문을 지원합니다.", "바구니와 물건은 일상이지 촬영 세트가 아닙니다."], ["일부 차량의 공간 조정", "노선에 따라 물품이나 학습 공간을 마련합니다.", "시설은 노선과 날짜마다 다릅니다."], ["철도의 공공서비스", "수요만으로 빠른 서비스를 유지하기 어려운 곳을 연결합니다.", "느린 열차 번호라고 모두 공익열차는 아닙니다."]
  ]},
  {id: "not-nostalgia", type: "heading", level: 2, text: "고속철도 국가에 완행열차가 남는 이유"},
  {id: "not-nostalgia-copy", type: "paragraph", text: "고속철도는 큰 중심지 사이 이동을 해결하고 공익 완행열차는 작은 역과 현·지역 중심지의 접근성을 해결합니다. 중국 국가철도국 자료는 통학, 장터와 기본 이동을 기록하며 학술 연구는 이를 농촌 대중교통의 보완 수단으로 봅니다. 가치의 기준은 고속열차와의 속도 경쟁이 아니라 정차역과 꾸준한 접근성입니다."},
  {id: "dated-number", type: "callout", title: "날짜가 있는 전국 자료", body: "중국 국가철도국은 2024년 3월 공익 완행열차 81쌍을 보고했습니다. 당시 규모를 보여 줄 뿐 2026년 실시간 목록은 아닙니다. 노선, 열차 번호, 정차역과 판매 상태는 공식 철도 채널에서 다시 확인해야 합니다.", tone: "warning"},
  {id: "ordinary-passenger", type: "heading", level: 2, text: "일반 여행자도 탈 수 있을까"},
  {id: "ordinary-passenger-copy", type: "paragraph", text: "공식 철도 시스템에서 특정 열차가 판매되고 본인의 신분증으로 예약할 수 있다면 주민 전용 전시가 아니라 여객열차입니다. 다만 작은 역이나 일부 서비스는 넓은 검색에서 쉽게 드러나지 않을 수 있습니다. 오래된 다큐멘터리의 노선만 믿고 역으로 가지 말고 정확한 열차, 날짜, 역과 판매 채널을 확인하세요."},
  {id: "two-scenarios", type: "comparison", title: "책임 있는 두 가지 판단", columns: [
    {heading: "실제 여정에 맞는 열차", body: "확인된 열차가 필요한 두 장소를 잇고 하루 일정이 성립할 때 이용하세요. 다른 통근열차처럼 자리를 지키고 절제해 촬영합니다."}, {heading: "열차를 구경거리로만 보는 경우", body: "승객 자리를 빼앗거나 물품 공간을 막고 어린이와 상인을 빈곤 서사의 소재로 촬영하지 마세요. 이동 목적이 없다면 다른 문화 체험을 고릅니다."}
  ]},
  {id: "respect-checklist", type: "list", ordered: true, items: ["공식 철도 시스템에서 열차 번호, 날짜, 출발역과 도착역을 확인합니다.", "선택한 작은 역에서 해당 열차 승하차가 가능한지 봅니다.", "확인된 여정에 맞춰 음식, 물과 전원을 준비합니다. 차량 시설은 제각각입니다.", "통로, 출입문, 학습 공간과 지정 물품 공간을 막지 않습니다.", "특히 어린이를 촬영하기 전에 동의를 구하고 거절을 존중합니다.", "오래된 요금·시간표·사회적 역할을 영구적인 전국 규칙으로 쓰지 않습니다."]},
  {id: "failure-recovery", type: "callout", title: "열차를 확인할 수 없다면", body: "그 열차를 중심으로 하루를 짜지 마세요. 공식 역이나 중국철도 서비스 채널에 열차와 날짜를 문의한 뒤 일반 여객열차 또는 도로 연결을 비교합니다. 정부 기사는 보도 당시 운행을 증명할 뿐 여행 날짜의 좌석을 보장하지 않습니다.", tone: "decision"},
  {id: "internal-links", type: "internal-links", title: "실제 여행에 맞는 철도 안내", items: [
    {label: "중국 고속철도 첫 이용 가이드", href: "/ko/guides/china-high-speed-train-first-time-guide/", description: "전국 예약과 탑승 절차는 해당 대표 가이드에서 확인합니다."}, {label: "야간열차와 주간 고속철도 비교", href: "/ko/guides/china-night-train-or-daytime-high-speed-rail/", description: "낭만적 이름보다 시간, 수면과 도착을 비교합니다."}, {label: "중국 철도만 이용하는 경로", href: "/ko/guides/china-rail-only-route/", description: "모든 구간에 철도가 실제로 맞는지 확인합니다."}
  ]},
  {id: "sources", type: "sources", title: "공식 및 독립 자료", items: [
    {label: "공익 완행열차 전국 기사", url: "https://www.nra.gov.cn/xwzx/tpsp/tpxx/202403/t20240321_344881.shtml", publisher: "중국 국가철도국", reviewedAt: "2026-08-13"}, {label: "철도 여객서비스 품질 감독 규정", url: "https://www.nra.gov.cn/xxgk/gkml/ztjg/gfzd/bmgz/202305/t20230519_341667.shtml", publisher: "중국 국가철도국", reviewedAt: "2026-08-13"}, {label: "다량산 공익열차 현황", url: "https://www.nra.gov.cn/tlfc/yxfc/202506/t20250623_349047.shtml", publisher: "중국 국가철도국", reviewedAt: "2026-08-13"}, {label: "7272 열차 대학 현장조사", url: "https://stte.csu.edu.cn/info/1047/4083.htm", publisher: "중난대학교", reviewedAt: "2026-08-13"}, {label: "농촌 이동성과 보완 대중교통 연구", url: "https://ir.pku.edu.cn/handle/20.500.11897/610349", publisher: "베이징대학교 기관 리포지터리", reviewedAt: "2026-08-13"}
  ]}
]}; export default body;
