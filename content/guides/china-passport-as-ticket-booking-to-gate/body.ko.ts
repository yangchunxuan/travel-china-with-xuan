import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "answer-first",
      "type": "lead",
      "text": "합법적인 예약이 완료된 뒤에는 주문에 연결된 정확한 여권을 신원 키이자 복구 키로 다루세요. 확정 주문과 여행자 기록을 저장하고 유효한 여권 원본을 지참하며, 자동 판독기가 인식하지 못할 경우 직원 확인 통로를 이용할 시간을 확보합니다. 화면 캡처는 주문 조회를 도울 뿐 신분증 원본을 대체하거나 유효한 티켓을 만들지 못합니다."
    },
    {
      "id": "quick-answer",
      "type": "callout",
      "title": "짧은 답",
      "body": "확정 주문 → 정확한 문서 기록 → 여권 원본 → 공식 검문 지점이라는 한 사슬을 유지하세요. 출발 전 주문의 문서 번호와 여정·방문 정보를 실제 여권과 대조합니다. 현장에서 안내된 통로를 한 번 이용한 뒤 실패하면 반복 스캔, 다른 사람 신분증 사용이나 뒤따라 통과를 하지 말고 직원에게 주문 조회를 요청하세요.",
      "tone": "decision"
    },
    {
      "id": "matrix-heading",
      "type": "heading",
      "level": 2,
      "text": "각 자료가 증명하는 것"
    },
    {
      "id": "decision-matrix",
      "type": "table",
      "caption": "서로 다른 증거가 인계의 다른 문제를 풉니다.",
      "columns": [
        "자료",
        "증명하는 것",
        "대체할 수 없는 것",
        "사용 위치"
      ],
      "rows": [
        [
          "예약에 쓴 여권 원본",
          "신원과 연결 문서 번호",
          "누락·취소·날짜 오류 주문",
          "신분증 판독기 또는 직원 확인 지점"
        ],
        [
          "공식 확정 주문",
          "상품, 날짜/시간, 여행자, 주문 상태",
          "신분증 원본",
          "출발 전 확인과 직원 조회"
        ],
        [
          "화면 캡처 또는 오프라인 PDF",
          "연결이 없을 때 읽을 수 있는 참조 정보",
          "실시간 유효성 또는 입장 권리",
          "직원 조회 보조 자료"
        ],
        [
          "종이 바우처 또는 수령 안내",
          "공식 발행자가 준 채널별 지시",
          "실명 확인을 우회하는 보편적 허가",
          "명시된 수령·입장 지점에서만"
        ]
      ]
    },
    {
      "id": "workflow-heading",
      "type": "heading",
      "level": 2,
      "text": "예약부터 게이트까지 인계하기"
    },
    {
      "id": "workflow",
      "type": "list",
      "ordered": true,
      "items": [
        "기존 공식 또는 승인 판매 채널에서 합법적인 예약이 확정된 뒤에만 시작합니다. 이 안내는 판매자 선택이나 이름 입력을 다루지 않습니다.",
        "최종 주문에서 운영사/시설, 날짜, 시간, 서비스, 출발·입구, 표시된 여행자 이름, 가려진 문서 번호, 주문 번호와 상태를 기록합니다.",
        "연결 문서와 휴대할 여권 원본을 비교합니다. 여권 갱신·재발급·분실 신고·오입력이 있다면 게이트 수정을 기대하지 말고 출발 전 발행사에 연락하세요.",
        "공식 확인서를 오프라인 저장하고 수령 안내가 있으면 보관합니다. 올바른 역 입구, 터미널 또는 관광지 게이트 경로와 같은 여행 폴더에 둡니다.",
        "운영사의 현재 도착·신원 확인 지침을 확인합니다. 보안검색, 수동 문서 판독과 직원 줄을 위한 시간을 두며 외국 여권은 현지 신분증과 다른 통로를 쓸 수 있습니다.",
        "검문 지점에서 안내대로 여권 원본을 제시합니다. 직원 요청 때만 커버를 벗기고 문서를 시야에 두며 비공식 도우미에게 건네지 마세요.",
        "판독이 한 번 실패하면 여권 원본과 주문번호를 들고 직원 통로로 갑니다. 변경 전에 주문 기록, 문서 유형과 정확한 입장 지점을 확인해 달라고 요청하세요.",
        "입장·탑승 뒤에도 운영사가 지정한 차내·전시관·출구 재확인에 대비해 여권과 주문을 보관합니다."
      ]
    },
    {
      "id": "confirmation-heading",
      "type": "heading",
      "level": 2,
      "text": "검증과 복구를 구분하기"
    },
    {
      "id": "confirmation-lanes",
      "type": "comparison",
      "title": "세 기록을 일치시키기",
      "columns": [
        {
          "heading": "신원 기록",
          "body": "여권 원본과 확정 주문에 연결된 정확한 문서 항목입니다. 교체·정정은 발행사의 공식 절차를 따릅니다."
        },
        {
          "heading": "이용 권리 기록",
          "body": "확정 서비스, 날짜/시간, 여행자와 주문 상태입니다. 여권이 보류·날짜 오류 주문을 유효하게 만들지는 않습니다."
        },
        {
          "heading": "접근 지시",
          "body": "현재 역·공항·시설 통로와 직원 대안입니다. 기계 실패는 통로를 바꿀 뿐 신원 요건을 없애지 않습니다."
        }
      ]
    },
    {
      "id": "failure-heading",
      "type": "heading",
      "level": 2,
      "text": "여권으로 게이트가 열리지 않을 때"
    },
    {
      "id": "failure-matrix",
      "type": "table",
      "caption": "증상에 맞는 기록 담당자를 찾습니다.",
      "columns": [
        "증상",
        "확인할 기록",
        "복구"
      ],
      "rows": [
        [
          "주문 조회 안 됨",
          "주문번호, 날짜, 발행 채널",
          "운영사 직원 창구에 공식 확인서를 제시하고 미확정이면 발행사 연락"
        ],
        [
          "문서 인식 안 됨",
          "문서 유형·번호와 판독기/통로",
          "지원되는 수동 확인을 요청하고 다른 사람 신분증을 쓰지 않기"
        ],
        [
          "이름 또는 여권번호 불일치",
          "확정 주문의 신원 기록",
          "발행사 공식 정정·재발행 규정 사용; 불일치 시 접근 거절 가능"
        ],
        [
          "역·입구·시간대 오류",
          "접근 지시와 현재 위치",
          "공식 직원에게 합법적 이동·재예약 여부 문의, 통제 게이트 넘지 않기"
        ],
        [
          "여권 분실·손상",
          "실물 신분증",
          "이 절차를 멈추고 여권 분실·교체 안내와 운영사 지시 따르기"
        ]
      ]
    },
    {
      "id": "recovery-heading",
      "type": "heading",
      "level": 2,
      "text": "직원 통로에서 깔끔하게 복구하기"
    },
    {
      "id": "recovery",
      "type": "list",
      "ordered": true,
      "items": [
        "반복 시도로 줄을 막거나 오류 상태를 복잡하게 하지 않도록 판독기에서 비켜섭니다.",
        "공식 확인서를 열고 '이 여권으로 이 주문을 확인해 주세요'라는 한 가지 정확한 요청을 합니다.",
        "직원이 여권 원본, 문서 유형, 주문번호, 서비스와 날짜를 비교하게 하고 어떤 필드·입구가 실패했는지 기록합니다.",
        "운영사가 수동 검증하면 지정 직원 통로를 따르고 발급된 결과·대체 증표를 보관합니다.",
        "발행사 정정·재발행이 필요하면 공식 채널만 쓰고 다시 결제하기 전 원주문 처리 방식을 묻습니다.",
        "시간이 지나면 거절·오류 기록과 영수증을 보관해 해당 환불·분쟁 절차에 쓰고 신원 우회를 시도하지 않습니다."
      ]
    },
    {
      "id": "scope-boundary",
      "type": "callout",
      "title": "여권 연동 주문이 보장하지 않는 것",
      "body": "이 절차는 합법적 예약 완료 뒤부터 시작합니다. 판매자를 검증하거나 이름 입력을 지시하지 않고, 입장·탑승, 보안·신원 확인 면제 또는 직원의 불일치 수정을 보장하지 않습니다. 현재 운영 규정과 확정 주문이 접근을 통제합니다. 신분증을 빌리거나 기록을 편집하거나 통제 게이트를 우회하지 마세요.",
      "tone": "warning"
    },
    {
      "id": "next-heading",
      "type": "heading",
      "level": 2,
      "text": "출발 전 5분 확인"
    },
    {
      "id": "next-check",
      "type": "list",
      "items": [
        "주문 상태 확정",
        "날짜·시간·서비스·입구 일치",
        "예약 여권 원본 유효 및 소지",
        "문서 기록과 여권 일치",
        "공식 확인서 오프라인 저장",
        "직원 확인 위치 파악",
        "수동 처리 시간 확보"
      ]
    },
    {
      "id": "faq-heading",
      "type": "heading",
      "level": 2,
      "text": "여권 연동 티켓 질문"
    },
    {
      "id": "faq-1-question",
      "type": "heading",
      "level": 3,
      "text": "여권 사진만으로 되나요?"
    },
    {
      "id": "faq-1-answer",
      "type": "paragraph",
      "text": "아닙니다. 조회에는 도움이 되지만 운영사는 보통 주문에 연결된 신분증 원본을 요구합니다. 최신 공식 지침을 따르세요."
    },
    {
      "id": "faq-2-question",
      "type": "heading",
      "level": 3,
      "text": "자동 게이트가 외국 여권을 읽지 못하면요?"
    },
    {
      "id": "faq-2-answer",
      "type": "paragraph",
      "text": "정상 시도 뒤 멈추고 직원 통로로 가세요. 여권 원본과 확정 주문을 제시해 지원되는 확인 절차를 이용합니다."
    },
    {
      "id": "faq-3-question",
      "type": "heading",
      "level": 3,
      "text": "구여권으로 예약한 뒤 신여권을 바로 쓸 수 있나요?"
    },
    {
      "id": "faq-3-answer",
      "type": "paragraph",
      "text": "연결이 자동 이전된다고 보지 마세요. 출발 전 공식 발행사에 연락해 정정·재발행 규정을 따릅니다."
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "관련 신원·접근 주제",
      "items": [
        {
          "label": "중국 예약의 여권 이름",
          "href": "/ko/guides/passport-name-across-china-bookings/",
          "description": "이름 입력과 일관성 판단은 해당 안내를 보세요."
        },
        {
          "label": "공식 또는 재판매 티켓",
          "href": "/ko/guides/official-or-reseller-china-tickets/",
          "description": "이 절차 전에 구매 채널을 선택·검증하세요."
        },
        {
          "label": "첫 중국 고속철",
          "href": "/ko/guides/china-high-speed-train-first-time-guide/",
          "description": "신원 확인 뒤 역·열차 절차를 이어서 확인하세요."
        },
        {
          "label": "중국에서 여권 분실 후 출국 복구",
          "href": "/ko/guides/lost-passport-in-china-exit-recovery/",
          "description": "여권 원본이 없으면 즉시 해당 복구 안내로 전환하세요."
        },
        {
          "label": "외국인 고궁 방문",
          "href": "/ko/guides/forbidden-city-for-foreign-visitors/",
          "description": "전체 방문 계획은 관광지 안내를 보세요."
        },
        {
          "label": "예약 분쟁 증거 묶음",
          "href": "/ko/guides/china-booking-dispute-evidence-pack/",
          "description": "접근 거절 시 인계 실패 증거를 보관하세요."
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "공식 출처",
      "items": [
        {
          "label": "12306 신분증 FAQ",
          "url": "https://www.12306.cn/en/faq.html?item=2",
          "publisher": "중국철도 12306",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "12306 영문 FAQ",
          "url": "https://www.12306.cn/en/faq.html",
          "publisher": "중국철도 12306",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "2025 중국 생활·업무 안내",
          "url": "https://english.www.gov.cn/2025special/bizexpatsinchina2025",
          "publisher": "중국 국무원",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "고궁박물원 티켓 안내",
          "url": "https://intl.dpm.org.cn/ticket_details.html",
          "publisher": "고궁박물원",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "베이징 서우두공항 승객 안내",
          "url": "https://www.bcia.com.cn/lkxz.html",
          "publisher": "베이징 서우두 국제공항",
          "reviewedAt": "2026-08-22"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
