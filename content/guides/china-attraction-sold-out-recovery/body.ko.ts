import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "answer-first",
      "type": "lead",
      "text": "공식 관광지 채널이 매진이라면 날짜, 회차, 방문객 유형과 입구가 맞는지 먼저 확인하세요. 이후 관광지가 인정하는 방법만 사용합니다. 공식 규정에 따른 추가·취소표, 다른 공식 날짜·회차 또는 다른 장소를 선택하세요. 모르는 사람의 실명 티켓, 여권 대여, 암표 구매나 실명 확인 우회 안내는 사용하지 마세요."
    },
    {
      "id": "quick-answer",
      "type": "callout",
      "title": "짧은 답",
      "body": "원래 관광지는 제한된 한 번의 공식 재확인만 하고 하루를 보호하세요. 매진 증거를 저장하고 공식 공지의 추가·취소표 규칙을 본 뒤 전환 시간을 정합니다. 합법적인 재고가 없으면 존재하지 않는 티켓 때문에 교통과 식사까지 무너지기 전에 공식 대안으로 옮기세요.",
      "tone": "decision"
    },
    {
      "id": "matrix-heading",
      "type": "heading",
      "level": 2,
      "text": "합법적인 복구 경로 선택"
    },
    {
      "id": "decision-matrix",
      "type": "table",
      "caption": "재고는 실제여야 하고 실명 방문객이 사용할 수 있어야 합니다.",
      "columns": [
        "확인 결과",
        "합법적 행동",
        "신원 확인",
        "중단 조건"
      ],
      "rows": [
        [
          "공식 채널에 다른 날짜·회차",
          "그 공식 재고 중심으로 일정 재구성",
          "허용된 예약 절차에 실제 방문객 전원 등록",
          "새 시간이 교통·고정 일정을 깨면 중단"
        ],
        [
          "공식 규정에 취소·추가표 설명",
          "명시된 시간·채널에서만 재확인",
          "반환 표를 실제 여행자 기록으로 발행할 수 있는지 확인",
          "계획한 창이 끝나면 중단, 종일 새로고침 금지"
        ],
        [
          "공식 결합·가이드 상품",
          "관광지가 인정하는 채널에서 포함 내용 확인",
          "방문객·문서 전원 합법 등록",
          "신원 확인 없음·숨은 입구 주장 시 거절"
        ],
        [
          "공식 사용 가능 재고 없음",
          "공식 재고 있는 다른 관광지·동네 산책·박물관 선택",
          "대안의 실제 규정으로 예약",
          "원래 시도를 닫고 일정 이동"
        ]
      ]
    },
    {
      "id": "workflow-heading",
      "type": "heading",
      "level": 2,
      "text": "비공식 재고를 쫓지 않고 일정 복구"
    },
    {
      "id": "workflow",
      "type": "list",
      "ordered": true,
      "items": [
        "'매진'이 목표 관광지, 날짜, 회차, 방문객 유형과 입구에 적용되는지 확인합니다. 공식 URL, 확인 시간과 메시지를 기록하며 재판매 페이지만으로 공식 재고를 판단하지 않습니다.",
        "관광지의 최신 공식 티켓 공지를 읽고 지정 판매 채널, 예약 기간, 실명 요건, 표 공개 방식, 취소·반환 규정과 당일 현장 판매 여부를 찾습니다.",
        "공식 공지가 후속·반환 재고를 설명할 때만 한두 번의 재확인 시간을 둡니다. 정확한 여행자 정보를 쓰고 기록 잠금·중복 결제를 부를 동시 주문은 하지 마세요.",
        "패키지·투어·결합권은 공식 사이트에서 검증합니다. 관광지가 상품을 인정하고 정확한 입장이 포함되며 방문객 실명 등록과 취소 조건이 명확한지 확인하세요.",
        "당일 이동에 맞춰 전환 시간을 정합니다. 그때까지 공식 재고가 없으면 조건 안에서 관련 교통·식사를 취소하고 대안을 시작합니다.",
        "대안의 공식 또는 승인 경로로 예약하고 확인서를 저장합니다. 같은 지역을 우선해 급한 도시 횡단을 피하세요.",
        "인정되지 않은 상대에게 이미 결제했다면 신분증 이미지나 추가 금액을 보내지 마세요. 판매 글, 메시지, 영수증과 약속을 보존해 결제·분쟁 절차로 갑니다."
      ]
    },
    {
      "id": "confirmation-heading",
      "type": "heading",
      "level": 2,
      "text": "두 부분 유효성 검사"
    },
    {
      "id": "confirmation-lanes",
      "type": "comparison",
      "title": "재고와 신원이 모두 통과해야 함",
      "columns": [
        {
          "heading": "공식 재고",
          "body": "관광지 또는 명시적으로 인정한 채널이 정확한 날짜·회차·상품을 확인합니다. 캡처나 판매자 메시지는 실시간 재고가 아닙니다."
        },
        {
          "heading": "실명 방문객 유효성",
          "body": "실제 여행자와 허용 문서가 현행 규정으로 등록됩니다. 양도 가능해 보이는 QR도 실명 확인에서 거절될 수 있습니다."
        },
        {
          "heading": "하루 전체 적합성",
          "body": "교통, 운영 시간과 다른 고정 예약이 여전히 맞아야 합니다. 유효한 회차라도 가는 동안 하루가 무너지면 복구가 아닙니다."
        }
      ]
    },
    {
      "id": "failure-heading",
      "type": "heading",
      "level": 2,
      "text": "시도를 끝내야 할 위험 신호"
    },
    {
      "id": "failure-matrix",
      "type": "table",
      "caption": "영리한 우회가 아니라 대안 전환이 필요한 신호입니다.",
      "columns": [
        "위험 신호",
        "실패 이유",
        "안전한 대응"
      ],
      "rows": [
        [
          "여권 정보 대여·수정 요구",
          "실명 방문객 기록을 훼손하고 신원 위험 발생",
          "문서를 보내지 말고 공식 채널·대안 이용"
        ],
        [
          "옆문·내부 직원·무스캔 약속",
          "통제된 입장을 우회하려는 제안",
          "거절하고 공식 매진 결과 보관"
        ],
        [
          "방문객 이름 주문 없이 QR만 제공",
          "취소·중복·신원 확인 거절 가능",
          "구매하지 말고 공식 주문 검증 요구"
        ],
        [
          "'곧 마감'이라며 추가 결제 압박",
          "희소성 압박이 검증·분쟁 보호를 막음",
          "멈춰 독립 확인하고 원래 관광지 포기"
        ],
        [
          "공식 공지가 제3자 대행사 없다고 경고",
          "관광지가 주장 채널을 명시적으로 부정",
          "공식 목록만 쓰고 필요하면 사칭 신고"
        ]
      ]
    },
    {
      "id": "recovery-heading",
      "type": "heading",
      "level": 2,
      "text": "매진된 핵심 일정을 작동하는 하루로 바꾸기"
    },
    {
      "id": "recovery",
      "type": "list",
      "ordered": true,
      "items": [
        "없는 티켓 주변의 추가 지출을 멈추고 아직 무료 취소 가능한 연결 예약을 적습니다.",
        "명성보다 지리와 운영 확실성으로 대안을 고릅니다. 같은 지역, 확인된 입장과 현실적인 이동 시간이 기준입니다.",
        "대안 확인서를 받은 뒤 유동 식사·교통을 옮기고 새 핵심 일정 주변에 미예약 완충 시간을 둡니다.",
        "동행에게 무엇을 바꾸고 어떤 예약을 포기했는지 알려 중복·비공식 구매를 막습니다.",
        "원래 공식 채널에 나중에 유효 재고가 생겨도 확정 대안과 비교한 뒤 다시 바꿔 두 번째 연쇄 실패를 만들지 않습니다.",
        "연결된 환불 가능 예약을 위해 매진 화면과 취소 기록을 보관하되 매진 자체가 배상 권리를 만들지는 않는다고 봅니다."
      ]
    },
    {
      "id": "scope-boundary",
      "type": "callout",
      "title": "숨은 티켓을 약속하지 않습니다",
      "body": "이 안내는 재고를 만들거나 취소표, 재판매자, 미래 공개분 또는 입장을 보장하지 않습니다. 암표, 신분 대여, 허위 정보, 자동화된 대기열 남용, 비공식 입구나 다른 실명제 우회를 절대 권하지 않습니다. 현재 관광지 규정과 인정 채널이 입장을 통제합니다.",
      "tone": "warning"
    },
    {
      "id": "next-heading",
      "type": "heading",
      "level": 2,
      "text": "15분 복구 체크리스트"
    },
    {
      "id": "next-check",
      "type": "list",
      "items": [
        "정확한 공식 날짜·회차·유형 매진 확인",
        "공식 공개·취소 규정 확인",
        "제한된 재확인 창 하나 설정",
        "신원·옆문 우회 거절",
        "공식 재고 있는 대안 선택",
        "마감 전 연결 예약 확인",
        "실제 결제 분쟁 증거 보관"
      ]
    },
    {
      "id": "faq-heading",
      "type": "heading",
      "level": 2,
      "text": "관광지 매진 질문"
    },
    {
      "id": "faq-1-question",
      "type": "heading",
      "level": 3,
      "text": "공식 사이트 매진 뒤 호텔이나 가이드가 표를 구할 수 있나요?"
    },
    {
      "id": "faq-1-answer",
      "type": "paragraph",
      "text": "관광지가 현재 인정하는 상품·채널이고 실제 방문객이 등록되는 경우만 신뢰하세요. 누군가의 자신감은 재고 증거가 아닙니다."
    },
    {
      "id": "faq-2-question",
      "type": "heading",
      "level": 3,
      "text": "다른 사람 티켓이나 여권 정보를 써도 되나요?"
    },
    {
      "id": "faq-2-answer",
      "type": "paragraph",
      "text": "안 됩니다. 신원을 빌리거나 타인의 실명 티켓을 사거나 기록을 바꾸지 마세요. 접근·신원 위험이 있고 규정을 위반할 수 있습니다."
    },
    {
      "id": "faq-3-question",
      "type": "heading",
      "level": 3,
      "text": "하루 종일 새로고침해야 하나요?"
    },
    {
      "id": "faq-3-answer",
      "type": "paragraph",
      "text": "공식 공지가 추가·반환 재고를 설명할 때만 제한된 시간에 재확인하세요. 그렇지 않으면 쓸 수 있는 하루를 위해 일찍 전환합니다."
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "관련 티켓·일정 주제",
      "items": [
        {
          "label": "공식 또는 재판매 티켓",
          "href": "/ko/guides/official-or-reseller-china-tickets/",
          "description": "결제·신분 자료 전송 전 채널을 검증하세요."
        },
        {
          "label": "외국인 고궁 방문",
          "href": "/ko/guides/forbidden-city-for-foreign-visitors/",
          "description": "고궁 전체 방문 계획은 해당 안내를 보세요."
        },
        {
          "label": "중국국가박물관 예약·동선",
          "href": "/ko/guides/national-museum-of-china-booking-and-route/",
          "description": "공식 재고와 가까운 대안을 확인하세요."
        },
        {
          "label": "싼싱두이 예약·관람 순서",
          "href": "/ko/guides/sanxingdui-museum-booking-and-gallery-order/",
          "description": "해당 박물관 공개·관람 절차는 전용 안내를 보세요."
        },
        {
          "label": "도착일 고정 일정 또는 유동 블록",
          "href": "/ko/guides/china-arrival-day-booked-anchor-or-flexible-block/",
          "description": "차질 위험이 큰 시간에 희소 티켓을 두지 마세요."
        },
        {
          "label": "예약 분쟁 증거 묶음",
          "href": "/ko/guides/china-booking-dispute-evidence-pack/",
          "description": "비공식 판매자 결제 뒤 분쟁 증거를 보관하세요."
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "공식 출처",
      "items": [
        {
          "label": "고궁박물원 티켓 안내",
          "url": "https://intl.dpm.org.cn/ticket_details.html",
          "publisher": "고궁박물원",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "중국국가박물관 비공식 티켓 채널 경고",
          "url": "https://en.chnmuseum.cn/home_527/news/202602/t20260203_278439.html",
          "publisher": "중국국가박물관",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "중국국가박물관 예약 시스템",
          "url": "https://pcticket.chnmuseum.cn/museum-en/",
          "publisher": "중국국가박물관",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "둔황연구원 공식 채널 경고",
          "url": "https://www.dha.ac.cn/info/1018/7786.htm",
          "publisher": "둔황연구원",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "온라인 관광 서비스 잠정 규정",
          "url": "https://www.mct.gov.cn/preview/whhlyqyzcxxfw/zhgl/202012/t20201222_919903.html",
          "publisher": "중국 문화여유부",
          "reviewedAt": "2026-08-22"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
