import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body: StructuredPageBody = {schemaVersion: "1.0.0", blocks: [
  {id: "answer-first", type: "lead", text: "12306 열차 음식 배달은 배달원이 열차를 쫓는 서비스가 아니라 시간에 맞춘 인계 체계입니다. 현재 플랫폼이 입력한 실제 여정에 맞는 공급역과 상점을 보여 주면 상점이 음식을 준비하고 역의 통제된 인계를 거쳐 철도 직원 또는 역 배송망이 입력된 객차와 좌석으로 전달합니다. 해당 열차에 선택지가 나타나지 않으면 다른 열차나 오래된 역 목록을 적용하면 안 됩니다."},
  {id: "relay", type: "table", caption: "정해진 지점에서 이어지는 여섯 단계", columns: ["단계", "작업", "주요 실패 위험"], rows: [
    ["여정 일치", "실제 열차와 날짜를 입력하거나 예약에 연결된 여정을 고릅니다.", "열차·날짜·승객 기록 오류."], ["공급역 선택", "현재 플랫폼이 보여 주는 역에서 선택합니다.", "모든 정차역이 음식을 공급한다고 생각함."], ["상점 준비", "선택한 상점이 주문을 받고 준비합니다.", "상점 마감이 더 빠르거나 재고가 없음."], ["역 인계", "열차 도착 전에 역의 철도 배송 절차로 들어갑니다.", "준비 지연 또는 열차 운행 변경."], ["열차 인계", "열차·객차·좌석에 맞춰 포장을 분류합니다.", "좌석이나 연락처 오류."], ["좌석 전달", "서비스 절차에 따라 기록된 위치로 전달합니다.", "좌석 변경이나 연락 실패."]
  ]},
  {id: "cutoff", type: "callout", title: "60분은 공급역 기준이다", body: "현재 12306 음식 서비스 약관은 열차가 공급역에서 출발할 예정 시각 60분 이내에는 주문이나 취소를 받지 않는다고 정합니다. 상점이 더 이른 마감을 요구하면 그 시간이 적용됩니다. 여행자의 출발역 출발 60분 전이 아니며, 주문 화면에서 실제 마감을 다시 확인해야 합니다.", tone: "warning"},
  {id: "order-method", type: "list", ordered: true, items: ["현재 철도 12306의 음식·특산품 메뉴에서 실제 여정을 연결합니다.", "해당 열차와 날짜에 시스템이 반환한 공급역과 상점만 사용합니다.", "공급역 출발 시각과 상점의 표시 마감을 확인합니다.", "결제 전에 승객, 휴대전화, 객차와 좌석을 확인합니다.", "주문 기록을 저장하고 플랫폼·철도 메시지를 봅니다.", "좌석을 바꿨다면 공식 주문·지원 채널을 사용하고 외부 배달원에게 역 진입을 요청하지 않습니다."]},
  {id: "scenarios", type: "comparison", title: "두 가지 주문 시점", columns: [
    {heading: "탑승 전 주문", body: "공급역과 상점을 비교할 시간이 많지만 여정과 좌석 정보가 최종 상태인지 확인해야 합니다."}, {heading: "탑승 후 주문", body: "현재 시스템이 표시한 앞으로의 공급역만 사용하세요. 다음 역은 이미 마감 안에 들어왔거나 연결 문제로 주문 창이 사라질 수 있습니다."}
  ]},
  {id: "not-guaranteed", type: "heading", level: 2, text: "이용 가능 여부는 여정이 결정하며 영구 목록이 아니다"},
  {id: "not-guaranteed-copy", type: "paragraph", text: "공식 안내는 주문 메뉴와 전달 개념을 보여 주지만 역, 열차, 상점, 메뉴, 전화번호 요구와 화면은 바뀝니다. 약관은 거래와 민원 절차를 정하고 실시간 플랫폼이 입력한 여정의 제공 항목을 결정합니다. 특정 식당, 고정 배달비 또는 모든 고속열차 배달을 약속하지 마세요."},
  {id: "fallback", type: "table", caption: "주문이 안 될 때 안전한 대안", columns: ["문제", "대응"], rows: [
    ["공급역이 없음", "역에 들어가기 전에 구입하거나 확인된 차내 판매를 이용합니다."], ["결제·연락처 인증 실패", "연락처를 꾸며내지 말고 출발역에서 음식을 준비하고 실패 기록을 보관합니다."], ["열차 지연·변경", "플랫폼 메시지를 따르고 공식 음식 지원·환불 경로를 씁니다."], ["음식이 오지 않음", "주문 상태를 확인하고 열차 직원에게 문의하며 하차하지 않습니다."], ["긴 정차로 보임", "음식을 찾으러 내리지 마세요. 정차 시간과 승차 통제가 바뀔 수 있습니다."]
  ]},
  {id: "dynamic-boundary", type: "callout", title: "확인일: 2026년 8월 13일", body: "서비스 약관과 공식 안내를 이 날짜에 확인했습니다. 참여 여정, 역, 메뉴, 화면, 상점 마감과 배송 조건은 계속 변합니다. 가장 안전한 대안은 출발역에서 준비한 음식이지 즉흥적인 승강장 외출이 아닙니다.", tone: "decision"},
  {id: "internal-links", type: "internal-links", title: "철도 여행 자체는 대표 가이드에서", items: [
    {label: "중국 고속철도 첫 이용 가이드", href: "/ko/guides/china-high-speed-train-first-time-guide/", description: "예약, 신분증과 탑승은 대표 가이드에서 확인합니다."}, {label: "비행기·열차 보조배터리 규정", href: "/ko/guides/china-power-bank-rules-flights-trains/", description: "긴 이동 전에 최신 전원 규정을 확인합니다."}, {label: "중국에서 처음 함께 먹는 식사", href: "/ko/guides/first-shared-meal-in-china/", description: "더 풍부한 음식 경험은 이동일 밖에 계획합니다."}
  ]},
  {id: "sources", type: "sources", title: "공식 및 독립 자료", items: [
    {label: "음식·특산품 주문 서비스 약관", url: "https://kyfw.12306.cn/otn/gonggao/excater.html", publisher: "중국철도 12306", reviewedAt: "2026-08-13"}, {label: "고속열차 음식 주문 방법", url: "https://english.shanghai.gov.cn/en-Transportation/20241213/1a3e604aa23140619e06d90e8d3004f4.html", publisher: "상하이시 인민정부", reviewedAt: "2026-08-13"}, {label: "베이징남역 인터넷 음식 서비스", url: "https://www.bjwmb.gov.cn/yw/10119254.html", publisher: "베이징 문명판공실", reviewedAt: "2026-08-13"}, {label: "철도 음식 배송망", url: "https://www.ndrc.gov.cn/xwdt/ztzl/cjsjyth1/xwzx/202111/t20211115_1303935_ext.html", publisher: "중국 국가발전개혁위원회", reviewedAt: "2026-08-13"}, {label: "고속철도 주문형 음식 최적화 연구", url: "https://www.hznu.edu.cn/upload/resources/file/2023/05/06/7774953.pdf", publisher: "항저우사범대학교 리포지터리", reviewedAt: "2026-08-13"}
  ]}
]}; export default body;
