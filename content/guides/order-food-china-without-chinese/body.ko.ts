import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "answer-first",
      "type": "lead",
      "text": "한 번에 하나씩 결정하세요. 식당의 현재 메뉴에서 음식을 찾고 정확한 항목을 보여 준 뒤 수량, 매장 식사·포장, 표시 총액을 확인하고 결제합니다. 가장 간단한 직원 카운터나 종이 메뉴부터 시작해 필요할 때 QR로 옮기세요. 배달은 검증된 주소, 작동하는 연락 방법과 인계 문제를 풀 시간이 있을 때만 대안으로 씁니다."
    },
    {
      "id": "quick-answer",
      "type": "callout",
      "title": "짧은 답",
      "body": "번역 옆에 중국어 원문 음식명을 남기고 결제 전 직원에게 최종 주문을 가리켜 달라고 하세요. '맵지 않은 것'이라는 넓은 요청보다 구체적인 음식 사진이 낫습니다. 알레르기 등 결과가 큰 제한은 번역 카드만으로 확인할 수 없습니다. 담당 직원에게 재료·조리를 확인하고 답을 얻지 못하면 주문하지 마세요.",
      "tone": "decision"
    },
    {
      "id": "matrix-heading",
      "type": "heading",
      "level": 2,
      "text": "마찰이 가장 적은 주문 방식 고르기"
    },
    {
      "id": "decision-matrix",
      "type": "table",
      "caption": "현재 방식으로 주문을 끝낼 수 없을 때만 다음 단계로 옮깁니다.",
      "columns": [
        "주문 방식",
        "적합한 때",
        "확인 순간",
        "대안 전환 신호"
      ],
      "rows": [
        [
          "직원 카운터/진열",
          "음식이 보이고 직원이 가리킬 수 있음",
          "정확한 항목과 숫자 수량을 보여 주고 계산대 총액 확인",
          "품절 또는 QR로만 안내"
        ],
        [
          "종이·벽 메뉴",
          "이름, 사진 또는 가격을 맞출 수 있음",
          "중국어 이름을 찍고 직원에게 선택 줄 표시 요청",
          "현재 가격 없음, 품절 표시, 양 불명"
        ],
        [
          "테이블 QR 메뉴",
          "전화·네트워크·지원 결제가 작동",
          "제출 전 장바구니, 수량, 테이블 번호와 총액 확인",
          "페이지 오류, 테이블 오류, 결제 불가"
        ],
        [
          "배달",
          "검증된 핀·주소와 연락처 준비",
          "매장, 음식, 주소, 메모와 인계 지점 확인",
          "주소 검증 불가 또는 도착 시간이 중요"
        ]
      ]
    },
    {
      "id": "workflow-heading",
      "type": "heading",
      "level": 2,
      "text": "다섯 부분 주문 인계"
    },
    {
      "id": "workflow",
      "type": "list",
      "ordered": true,
      "items": [
        "카운터, 종이 메뉴, 테이블 코드 또는 배달 플랫폼 중 주문 방식을 확인합니다. QR이 결제 전용이라고 추정하지 마세요.",
        "원문을 저장합니다. 현재 중국어 음식명, 가격, 크기·옵션을 촬영하고 그 정확한 선택만 번역하되 직원에게 보여 줄 원문을 남깁니다.",
        "한 번에 한 항목을 선택하고 줄·화면을 가리키며 숫자로 수량을 표시합니다. 나눠 먹을 때는 모르는 음식을 여러 개 시키기 전 양을 물으세요.",
        "매장 식사, 포장 또는 배달을 정합니다. QR 식사는 테이블 번호, 포장은 수령 위치와 번호·이름을 확인하세요.",
        "식이 제한은 취향과 분리합니다. 재료·조리 위험을 적은 짧은 이중언어 카드를 보여 주고 담당 직원에게 예/아니오 확인을 받습니다. 교차접촉과 조리법은 여전히 불확실할 수 있습니다.",
        "음식, 옵션, 수량, 추가, 서비스 방식과 총액을 다시 봅니다. QR 제출 전 화면을 저장해 중복·누락을 추적하세요.",
        "주문이 보인 뒤 결제합니다. 영수증·주문번호를 보관하고 로딩 화면이나 은행 알림만이 아니라 접수 상태를 확인합니다.",
        "인계 때 번호와 품목을 맞춥니다. 포장은 줄을 막지 않는 가까운 곳에서 열어 명백한 오류를 바로 확인하세요."
      ]
    },
    {
      "id": "confirmation-heading",
      "type": "heading",
      "level": 2,
      "text": "세 단계에서 의미 확인"
    },
    {
      "id": "confirmation-lanes",
      "type": "comparison",
      "title": "음식·거래·인계",
      "columns": [
        {
          "heading": "음식",
          "body": "현재 중국어 메뉴 줄, 크기와 옵션이 의도와 맞습니다. 번역은 비교를 돕고 실제 조리는 식당이 확인합니다."
        },
        {
          "heading": "거래",
          "body": "장바구니, 테이블/주소, 수량, 총액과 접수 상태가 보입니다. 결제 알림만으로 주방 주문을 증명하지 못할 수 있습니다."
        },
        {
          "heading": "인계",
          "body": "주문번호·이름, 서비스 방식과 수령·배달 지점이 맞습니다. 배달에는 연락 가능한 경로도 필요합니다."
        }
      ]
    },
    {
      "id": "failure-heading",
      "type": "heading",
      "level": 2,
      "text": "흔한 주문 실패"
    },
    {
      "id": "failure-matrix",
      "type": "table",
      "caption": "정확한 항목과 거래 증거를 보존한 채 인터페이스를 바꿉니다.",
      "columns": [
        "실패",
        "즉시 확인",
        "작동하는 대안"
      ],
      "rows": [
        [
          "QR 페이지 안 열림",
          "코드가 현재 것인지 매장 Wi-Fi가 필요한지 직원에게 문의",
          "종이·메뉴 사진 또는 카운터 직원 입력"
        ],
        [
          "번역이 이해되지 않음",
          "중국어 원문으로 돌아가 더 작은 표현·옵션만 번역",
          "직원이 사진·진열을 가리키게 하고 단순한 음식 선택"
        ],
        [
          "계좌 출금됐지만 주문 없음",
          "매장, 시간, 금액과 거래 상태를 직원에게 제시",
          "식당이 주문·결제 기록을 확인할 때까지 재결제 금지"
        ],
        [
          "테이블·수량 오류",
          "장바구니·주문 내역에서 제출 기록 제시",
          "조리 전 직원 수정 요청, 취소 불가능할 수 있음 인정"
        ],
        [
          "식이 제한 확인 불가",
          "담당 직원에게 특정 재료·조리를 한 번 더 질문",
          "밀봉 라벨 제품이나 다른 식당 선택, 안전 추정 금지"
        ],
        [
          "기사와 인계 실패",
          "검증된 중국어 주소, 랜드마크와 현재 핀 전송",
          "합의한 안전하고 눈에 띄는 지점 또는 허용 시 호텔 프런트 수령"
        ]
      ]
    },
    {
      "id": "recovery-heading",
      "type": "heading",
      "level": 2,
      "text": "상태 불명 주문을 두 번 하지 않고 복구"
    },
    {
      "id": "recovery",
      "type": "list",
      "ordered": true,
      "items": [
        "화면을 유지하고 주문번호, 매장, 금액, 테이블/주소와 상태를 촬영합니다.",
        "주방·주문은 식당 카운터, 배차는 배달 지원, 거래는 결제 제공자라는 한 담당자에게 묻습니다.",
        "전체 대화를 다시 번역하지 말고 정확한 중국어 항목을 보여 주며 누락·중복·오류를 표시합니다.",
        "취소·수정·접수 상태가 명확해진 뒤 대체 주문을 냅니다. 해결 불가하면 첫 상태를 기록한 뒤 결제·음식을 바꾸세요.",
        "배달 인계 실패 때 가능한 한 공식 주문 채팅을 사용하고 무관한 여권·결제 자격정보를 보내지 않습니다.",
        "청구와 받은 음식이 맞을 때까지 영수증·화면을 보관하고 중요한 미해결 중복은 플랫폼·결제 분쟁 절차를 씁니다."
      ]
    },
    {
      "id": "scope-boundary",
      "type": "callout",
      "title": "언어 도구가 확인할 수 없는 것",
      "body": "이 안내는 메뉴 번역 정확성, 재료 부재, 알레르기 안전, 교차접촉 방지, 재고, 가격, 결제 승인, 배달 시간 또는 환불을 보장하지 않습니다. 현재 메뉴, 담당 식당 직원, 플랫폼과 결제사가 통제합니다. 건강에 중요한 제한을 명확히 확인하지 못하면 주문하지 마세요.",
      "tone": "warning"
    },
    {
      "id": "next-heading",
      "type": "heading",
      "level": 2,
      "text": "휴대용 주문 도구"
    },
    {
      "id": "next-check",
      "type": "list",
      "items": [
        "오프라인 화면 저장",
        "중국어 음식명 보존",
        "숫자 수량 준비",
        "매장/포장 표현 준비",
        "필요 시 구체적 제한 카드",
        "두 번째 결제 수단",
        "검증된 배달 주소·랜드마크",
        "영수증·주문번호 보관"
      ]
    },
    {
      "id": "faq-heading",
      "type": "heading",
      "level": 2,
      "text": "음식 주문 질문"
    },
    {
      "id": "faq-1-question",
      "type": "heading",
      "level": 3,
      "text": "모든 QR 메뉴에 중국 전화번호가 필요한가요?"
    },
    {
      "id": "faq-1-answer",
      "type": "paragraph",
      "text": "모든 식당에 같은 규칙은 없습니다. 현재 흐름을 시도하고 사용할 수 없는 로그인·결제가 필요하면 직원에게 카운터·종이 주문을 요청하세요."
    },
    {
      "id": "faq-2-question",
      "type": "heading",
      "level": 3,
      "text": "번역으로 알레르기 안전을 확인할 수 있나요?"
    },
    {
      "id": "faq-2-answer",
      "type": "paragraph",
      "text": "아닙니다. 원문을 보존하고 담당 직원에게 특정 재료·조리를 물으세요. 확인하지 못하면 다른 선택을 합니다."
    },
    {
      "id": "faq-3-question",
      "type": "heading",
      "level": 3,
      "text": "배달을 기본으로 쓰면 되나요?"
    },
    {
      "id": "faq-3-answer",
      "type": "paragraph",
      "text": "주소, 핀, 연락과 인계가 믿을 만할 때만 사용하세요. 연결·주소 확신이 낮으면 가까운 직원 카운터가 더 쉽습니다."
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "관련 음식·결제·주소 주제",
      "items": [
        {
          "label": "중국어 없이 번역하기",
          "href": "/ko/guides/translate-china-without-chinese-offline-backups/",
          "description": "메뉴에서 쓸 화면·오프라인 텍스트 방법을 준비하세요."
        },
        {
          "label": "여행객의 중국 결제 방법",
          "href": "/ko/guides/how-to-pay-in-china-as-a-tourist/",
          "description": "식당 줄에 서기 전 결제를 준비·확인하세요."
        },
        {
          "label": "주소 확인·내비게이션 백업",
          "href": "/ko/guides/china-navigation-verified-address-backup/",
          "description": "배달용 중국어 주소와 랜드마크를 준비하세요."
        },
        {
          "label": "중국에서 첫 공동 식사",
          "href": "/ko/guides/first-shared-meal-in-china/",
          "description": "양, 공동 요리와 식사 흐름을 계획하세요."
        },
        {
          "label": "중국 지역 음식 동선",
          "href": "/ko/guides/china-regional-food-route/",
          "description": "지역 음식을 전체 일정에 배치하세요."
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "공식 출처",
      "items": [
        {
          "label": "상하이 음식 배달 앱 안내",
          "url": "https://english.shanghai.gov.cn/en-UsefulApps/20240109/89844b5729d64b199463a156bc8ef43d.html",
          "publisher": "상하이시 인민정부",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "메뉴 번역 서비스 안내",
          "url": "https://english.shanghai.gov.cn/en-CIIE2025Service-Onsite/20251016/a8cde7a821ae4df5a957b6014f7c3814.html",
          "publisher": "상하이시 인민정부",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "해외 방문객 결제 안내",
          "url": "https://english.www.gov.cn/news/202404/11/content_WS6617c858c6d0868f4e8e5f4d.html",
          "publisher": "중국 국무원",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "문명 식사 안내",
          "url": "https://zwgk.mct.gov.cn/zfxxgkml/qt/202210/t20221017_936555.html",
          "publisher": "중국 문화여유부",
          "reviewedAt": "2026-08-22"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
