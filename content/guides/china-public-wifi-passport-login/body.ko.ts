import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead", type: "lead", text: "중국 공공 Wi-Fi에는 전국 공통 로그인 방식이 없습니다. 장소에 따라 SMS, 호텔 투숙 정보, 직원 발급 코드 또는 여권 키오스크를 씁니다. 베이징 공식 공항 안내는 중국 번호가 없는 여행자가 여권 스캔 기기에서 아이디와 비밀번호를 출력받는 절차를 설명하지만, 이는 특정 공항 서비스이지 모든 공항·역·카페에 대한 약속이 아닙니다. 독립적인 모바일 데이터를 준비하고 장소 Wi-Fi는 유용한 보조 수단으로 보세요." },
  { id: "answer", type: "callout", title: "중국 휴대전화 번호가 없다면", tone: "decision", body: "베이징 서우두공항에서는 공식 SSID를 확인하고 Wi-Fi 인증번호 발급기를 찾으세요. 더 최신인 다싱공항 안내는 BDIA-FREE-WIFI와 포털의 여권 사진 면 인증을 안내하며 키오스크 방식도 제공합니다. 다른 장소에서는 해외 번호 SMS, 여권 인증 또는 수동 코드 지원 여부를 물어보고, 없다면 반복 시도를 멈추고 독립 모바일 데이터를 사용하세요." },
  { id: "venue-heading", type: "heading", level: 2, text: "장소에 맞는 로그인 경로를 선택하세요" },
  { id: "venue-table", type: "table", caption: "신원 정보를 내기 전에 확인할 것", columns: ["장소", "가능한 방식", "첫 행동"], rows: [
    ["베이징 서우두공항", "중국 번호 SMS 또는 여권/신분증 인증번호 발급기", "현재 표지에서 AIRPORT-FREE-WIFI-NEW와 기기 위치 확인"],
    ["베이징 다싱공항", "여권 사진 면 포털, 키오스크, 위챗 또는 전화번호 인증", "현재 표지에서 최신 안내의 BDIA-FREE-WIFI 확인"],
    ["그 밖의 공항·대형 역", "장소별 SMS, 키오스크, 미니 프로그램 또는 서비스 데스크", "현장 최신 안내를 읽고 베이징 절차를 그대로 적용하지 않기"],
    ["호텔", "객실 번호, 성, 접속 코드 또는 프런트 지원", "프런트에서 정확한 네트워크 이름과 자격 정보 받기"],
    ["카페·쇼핑몰·관광지", "SMS, 앱, 영수증 코드 또는 게스트망 없음", "비슷한 이름의 망에 접속하기 전 직원에게 확인"],
    ["포털이 여권을 인증하지 못함", "독립 모바일 데이터", "여권 사진을 반복 업로드하지 말고 연결 방식 변경"]
  ] },
  { id: "beijing-heading", type: "heading", level: 2, text: "베이징 두 공항의 공개 로그인 경로는 서로 다릅니다" },
  { id: "beijing-list", type: "list", ordered: true, items: [
    "서우두공항 공식 안내는 AIRPORT-FREE-WIFI-NEW를 제시합니다. 기본 브라우저에서 포털을 열고 시스템이 받는 중국 번호가 있을 때 SMS를 선택하세요.",
    "서우두공항에서 중국 번호가 없으면 공식 Wi-Fi 인증번호 발급기를 찾으세요. 직원에게 ‘请问最近的无线上网身份验证自助终端在哪里？’를 보여줄 수 있습니다.",
    "여권을 사진 면으로 열고 여권 스캔이라고 표시된 단말기에만 넣으세요. 안내된 기기는 포털용 아이디와 비밀번호를 인쇄합니다.",
    "다싱공항의 2025년 최신 안내는 BDIA-FREE-WIFI와 포털의 여권 사진 면 인증을 설명하며 키오스크·위챗·전화번호 방식도 열거합니다.",
    "두 공항 모두 현장 최신 표지를 따르고 여권과 인쇄물을 즉시 회수하세요. 화면이 공개 절차와 다르면 공식 서비스 데스크에 문의하세요."
  ] },
  { id: "beijing-boundary", type: "callout", title: "인쇄형 접속 정보에는 이용 제한이 있습니다", tone: "neutral", body: "베이징 안내는 발급기 계정이 5시간 유효하고 유효 신분증 한 장으로 최대 세 번 출력할 수 있다고 설명합니다. 이는 해당 발급 경로의 제한이며 다싱 여권 포털이나 전국 규칙으로 확대하면 안 됩니다. 당일 화면을 확인하세요." },
  { id: "portal-heading", type: "heading", level: 2, text: "로그인 페이지가 뜨지 않을 때" },
  { id: "portal-table", type: "table", caption: "포털 문제와 신원 인증 문제를 나누세요", columns: ["증상", "한 번 시도", "그다음 중단하고 문의"], rows: [
    ["연결됐지만 로그인 페이지 없음", "모바일 데이터를 잠시 끄고 일반 브라우저 탭에서 공식 안내 다시 열기", "확인한 SSID를 지웠다가 다시 연결하고 직원에게 포털 주소 문의"],
    ["SMS가 오지 않음", "국가번호와 해외 번호 지원 문구 확인", "여권·수동 방식 또는 독립 데이터 사용"],
    ["여권 키오스크가 스캔을 거부", "커버를 벗기고 사진 면만 맞춰 화면 지시 따르기", "공식 데스크에 문의하고 비공식 도움자에게 여권을 맡기지 않기"],
    ["로그인 뒤 계속 같은 화면", "네트워크를 지우고 브라우저를 닫은 뒤 한 번만 새로 시도", "반복 제출을 멈추고 다른 연결 사용"],
    ["인증서·도메인 경고", "즉시 연결 해제", "직원에게 SSID와 포털을 다시 확인"]
  ] },
  { id: "safety-heading", type: "heading", level: 2, text: "진짜 네트워크라도 사설망처럼 쓰지는 마세요" },
  { id: "safety-list", type: "list", items: [
    "안내판이나 직원에게 정확한 SSID와 로그인 절차를 확인하세요. 범죄자는 비슷한 이름의 핫스폿을 만들 수 있습니다.",
    "운영체제와 브라우저를 업데이트하고 전체 주소가 맞으며 HTTPS를 쓰는지 보세요. 자물쇠는 해당 사이트와의 연결을 보호할 뿐 사이트 자체가 정직하다는 증거는 아닙니다.",
    "자체 모바일 연결이 있다면 공공 Wi-Fi에서 은행, 결제 복구, 비밀번호 재설정, 여권 업로드, 기밀 업무를 피하세요.",
    "필요 없는 파일 공유, AirDrop, 주변 공유를 끄세요. 일반 게스트 Wi-Fi 접속을 위해 임의의 구성 프로필이나 인증서를 설치하지 마세요.",
    "사용 후 네트워크를 지우고 자동 연결 설정을 의식적으로 복구해 터미널 이동 중 계속 붙어 있지 않게 하세요."
  ] },
  { id: "passport-heading", type: "heading", level: 2, text: "인증 중 여권 보호하기" },
  { id: "passport-copy", type: "paragraph", text: "실물 여권은 명확히 표시된 공식 키오스크나 데스크에서만 사용하세요. 사진 면을 가리고, 끝나면 즉시 회수하며, 자격 정보가 적힌 인쇄물은 안전하게 보관하거나 폐기하세요. 전체 여권 번호가 보이는 화면을 촬영하거나 낯선 사람에게 여권 사본을 보내거나 문제 해결 중 기기에 여권을 두고 떠나면 안 됩니다. 지원을 요청할 때는 번호를 가린 채 시간·터미널·오류만 기록하세요." },
  { id: "arrival-heading", type: "heading", level: 2, text: "공항 Wi-Fi 하나에 도착 계획 전체를 맡기지 마세요" },
  { id: "arrival-list", type: "list", ordered: true, items: [
    "출발 전 호텔 중국어 주소, 공항 이동 안내, 예약 번호, 지도 화면을 오프라인 저장하세요.",
    "안내에 따라 로밍이나 eSIM을 미리 준비하면서 계정 복구에 쓰는 번호 접근도 유지하세요.",
    "결제와 이동 계획을 공항 Wi-Fi에서 앱을 급히 내려받아야만 작동하도록 만들지 마세요.",
    "한 사람의 휴대전화만 연결될 때를 대비해 동행과 만날 장소를 정하세요.",
    "공식 네트워크 연결은 공항 직원에게 도움을 받고 민감한 계정 설정은 독립 연결에서 하세요."
  ] },
  { id: "failure", type: "callout", title: "모든 방식이 실패한다면", tone: "warning", body: "공식 안내 또는 서비스 데스크에서 현재 외국 여권 로그인 경로를 물어보세요. 없다면 로밍, eSIM, 현지 SIM 또는 동행의 신뢰할 수 있는 핫스폿을 사용하세요. 임의의 SSID를 시험하거나 낯선 사람에게 접속 정보를 사거나 검색 결과 페이지에 신원 정보를 입력하지 마세요. 잠시 연결이 불편한 편이 신원 정보 유출보다 안전합니다." },
  { id: "scope", type: "callout", title: "범위와 변동 서비스의 경계", tone: "neutral", body: "공항 네트워크 이름, 접속 제한, 키오스크 위치, 지원 여권은 터미널별로 바뀔 수 있습니다. 아래 베이징·상하이 정부 자료는 2026년 8월 12일 검토한 특정 공항 서비스를 뒷받침할 뿐 모든 장소의 제공 여부, 속도, 서비스 접근 또는 모든 여권 수용을 보장하지 않습니다. FTC 자료는 일반 공공 Wi-Fi 보안 실무를 지원합니다. 현장 최신 화면과 공식 직원 안내를 따르세요." },
  { id: "links", type: "internal-links", title: "대체 수단이 있는 연결 계획", items: [
    { label: "중국 eSIM 또는 현지 SIM", href: "/ko/guides/china-esim-vs-local-sim/", description: "도착 전 독립 모바일 데이터 경로를 정하세요." },
    { label: "여행자의 중국 결제", href: "/ko/guides/how-to-pay-in-china-as-a-tourist/", description: "알 수 없는 공공망에 의존하지 않고 결제를 준비하세요." },
    { label: "중국 고속철도 첫 이용", href: "/ko/guides/china-high-speed-train-first-time-guide/", description: "역에 들어가기 전 예약과 탑승 정보를 내려받으세요." }
  ] },
  { id: "sources", type: "sources", title: "검토한 공식·일차 출처", items: [
    { label: "연결과 필수 앱: 베이징 공항 Wi-Fi 절차 포함", url: "https://english.beijing.gov.cn/latest/specials/essentialtipsfornewarrivals/getconnected/202408/t20240830_3785643.html", publisher: "베이징시 인민정부", reviewedAt: "2026-08-12" },
    { label: "베이징 서우두공항 Wi-Fi 서비스", url: "https://english.beijing.gov.cn/specials/beijingservice/pek/wifi/", publisher: "베이징시 인민정부", reviewedAt: "2026-08-12" },
    { label: "다싱공항 여권 Wi-Fi 서비스", url: "https://english.beijing.gov.cn/latest/news/202512/t20251205_4322494.html", publisher: "베이징시 인민정부", reviewedAt: "2026-08-12" },
    { label: "푸둥공항 여권 Wi-Fi 업데이트", url: "https://english.shanghai.gov.cn/en-Latest-WhatsNew/20260424/88cde5e96ef242daa534102069450a03.html", publisher: "상하이시 인민정부", reviewedAt: "2026-08-12" },
    { label: "공공 Wi-Fi 네트워크는 안전한가요?", url: "https://consumer.ftc.gov/articles/are-public-wi-fi-networks-safe-what-you-need-know", publisher: "미국 연방거래위원회", reviewedAt: "2026-08-12" }
  ] }
] } as const satisfies StructuredPageBody;

export default body;
