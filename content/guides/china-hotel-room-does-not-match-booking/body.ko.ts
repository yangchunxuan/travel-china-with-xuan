import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "lead",
      "type": "lead",
      "text": "객실 문에서 잠시 멈추세요. 침대나 욕실을 쓰기 전에 확인서를 저장하고 배정 객실을 한 번의 연속 영상으로 기록합니다. 침대 수, 흡연 여부, 창문, 접근 기능, 투숙 인원이나 위험·사용 불가 상태 같은 중대한 차이와 단순 선호를 구분하세요. 당직 책임자에게 실행 가능한 수정 하나와 짧은 서면 시한을 요청하고 필수 조건을 안전하게 복구할 수 없을 때만 이동합니다."
    },
    {
      "id": "short-answer",
      "type": "callout",
      "title": "짧은 결론",
      "tone": "decision",
      "body": "객실 이름만으로 예약 속성을 설명하지 못할 수 있으므로 먼저 확인합니다. 중대한 차이라면 확인서를 보여 주고 예약 객실 또는 모든 필수 조건을 지키는 구체적 동등 객실 하나를 요청하세요. 짐을 옮기기 전에 대체 객실을 봅니다. 안전 문제, 사용 가능한 객실 부재 또는 적어 둔 시한까지 책임 있는 답이 없으면 합리적인 근처 대체 숙소를 확보하고 원주문과 새 영수증을 보존합니다. 객실 변경, 환불이나 비용 보전은 자동이 아닙니다."
    },
    {
      "id": "canonical-scope",
      "type": "paragraph",
      "text": "현장 복구 절차이며 손해액 계산이나 법률 판단이 아닙니다. 업그레이드, 무료 숙박, 현금 환불, 결제 취소나 12315 결과를 보장하지 않습니다. 층, 장식이나 넓은 ‘전망’ 선호는 확인된 침대 수, 금연, 접근 기능이나 다른 필수 계약 조건과 자동으로 같지 않습니다. 실제 서면 기록을 비교하세요."
    },
    {
      "id": "triage-heading",
      "type": "heading",
      "level": 2,
      "text": "위험과 중요도로 다음 행동을 고르세요"
    },
    {
      "id": "triage-matrix",
      "type": "table",
      "caption": "증거가 있는 요청 하나 뒤 시한을 사용합니다",
      "columns": [
        "확인된 차이",
        "검증",
        "객실 변경",
        "이동"
      ],
      "rows": [
        [
          "객실 라벨이 모호",
          "직원에게 예약 속성과 대조 요청",
          "확인 속성이 없을 때만",
          "숙소에 합리적 설명 기회 제공 후"
        ],
        [
          "침대 수·인원 구성 오류",
          "확인서와 객실 번호 제시",
          "예약 또는 진짜 동등 구성 요청",
          "일행이 합법·안전하게 잘 수 없으면"
        ],
        [
          "금연·창·필수 접근 기능 없음",
          "객실과 정확한 확인 문구 기록",
          "맞는 대안 하나를 먼저 확인",
          "필수 조건을 복구 못 하면"
        ],
        [
          "빠르게 고칠 청결 문제",
          "사용 전 기록",
          "청소로 복구 못 하면 변경",
          "심각·반복·위험하면 이동"
        ],
        [
          "전망·층·장식 차이",
          "보장인지 예시 사진인지 확인",
          "선호를 확정 조건으로 주장하지 않고 문의",
          "보통 다른 필수 실패가 함께 있을 때"
        ],
        [
          "즉각적 안전 위험",
          "완벽한 증거를 위해 머물지 않음",
          "안전이 확인되는 대안만",
          "안전한 유인 숙소 이동·위급 시 긴급기관 연락"
        ]
      ]
    },
    {
      "id": "workflow-1-heading",
      "type": "heading",
      "level": 2,
      "text": "예약과 배정 상태를 고정하세요"
    },
    {
      "id": "workflow-1-context",
      "type": "paragraph",
      "text": "책임자가 답할 수 있을 만큼 비교를 좁힙니다. 다른 투숙객을 촬영하거나 여권·결제 정보를 노출하지 마세요."
    },
    {
      "id": "workflow-1-steps",
      "type": "list",
      "ordered": true,
      "items": [
        "전체 확인서, 객실 설명, 선택 옵션, 인원, 날짜, 총액, 판매자·공급자 이름을 현재 시각과 함께 저장합니다.",
        "문에서 객실 번호부터 침대·창문·욕실·빠진 기능까지 연속 촬영하고 필요한 부분만 사진을 추가합니다.",
        "‘예약: __. 배정: __. 필수인 이유: __.’ 한 줄을 쓰고 동기나 사기를 추정하지 않습니다.",
        "안전하면 짐을 풀지 않은 채 프런트로 돌아가 당직 책임자의 이름·직책과 앱 또는 서면 케이스를 받습니다."
      ]
    },
    {
      "id": "workflow-2-heading",
      "type": "heading",
      "level": 2,
      "text": "검사 가능한 수정 하나를 요청하세요"
    },
    {
      "id": "workflow-2-context",
      "type": "paragraph",
      "text": "숙소를 먼저 복구하면 처음부터 막연한 보상을 요구하는 것보다 실행과 사후 판단이 쉽습니다."
    },
    {
      "id": "workflow-2-steps",
      "type": "list",
      "ordered": true,
      "items": [
        "예약 객실을 먼저 요청하고 불가하면 높은 등급명이 아니라 침대 수와 필수 속성으로 동등 객실을 정의합니다.",
        "시각, 일행 필요와 안전한 주변 대안을 기준으로 현실적인 짧은 시한을 정해 현지 날짜·시간을 씁니다.",
        "원래 케이스를 닫기 전 대체 객실의 냄새, 창, 욕실, 접근 동선, 잠금과 빠진 기능을 확인합니다.",
        "수락하면 새 객실 번호·등급과 가격 처리를 서면으로 받고 원본 증거는 공개하지 않고 보관합니다."
      ]
    },
    {
      "id": "workflow-3-heading",
      "type": "heading",
      "level": 2,
      "text": "증거 흐름을 끊지 않고 이동하세요"
    },
    {
      "id": "workflow-3-context",
      "type": "paragraph",
      "text": "금전 문제보다 안전한 숙박을 먼저 확보합니다. 위험하지 않다면 숙소·플랫폼이 원하는 주문 처리를 기록하기 전 스스로 취소하거나 키를 버리지 마세요."
    },
    {
      "id": "workflow-3-steps",
      "type": "list",
      "ordered": true,
      "items": [
        "차이, 요청한 수정, 시한, 받은 답과 사용 가능한 방이 없으면 합리적 대체 숙소를 얻겠다는 마지막 사실 메시지를 보냅니다.",
        "원주문에서 플랫폼 케이스를 열어 번호를 받고 숙소 취소, 본인 취소 또는 주문 유지 중 무엇인지 묻습니다.",
        "실패한 필수 조건을 충족하되 불필요한 고급 상승이 없는 주변 대안을 골라 약관과 상세 영수증을 저장합니다.",
        "모두 안전해진 뒤 전체 분쟁 증거 파일을 만들고 사실에 맞는 판매자·플랫폼·결제·감독 채널을 씁니다."
      ]
    },
    {
      "id": "failure-heading",
      "type": "heading",
      "level": 2,
      "text": "첫 수정도 실패했을 때"
    },
    {
      "id": "failure-recovery",
      "type": "table",
      "caption": "수면과 안전을 보호하며 기록을 일관되게 유지합니다",
      "columns": [
        "문제",
        "즉시 대응",
        "경계"
      ],
      "rows": [
        [
          "직원이 객실이 ‘같다’고 함",
          "객실명 대신 확정 속성을 비교",
          "수정이 없으면 서면 거절 요청"
        ],
        [
          "대체 객실에도 다른 결함",
          "사용 전 기록하고 책임자에게 한 번 더 복귀",
          "무한 반복하지 말고 시한 적용"
        ],
        [
          "호텔과 플랫폼이 서로 미룸",
          "한 타임라인에 양쪽 메시지·케이스 번호 기록",
          "시한 후 숙소부터 확보, 책임은 나중"
        ],
        [
          "비싼 대안만 남음",
          "합리적 검색 범위와 저렴한 대안 실패 이유 캡처",
          "비용을 비례적으로 유지, 보전은 보장 안 됨"
        ],
        [
          "개인 안전 악화",
          "증거 작업을 멈추고 공공 유인 안전 장소 이동",
          "즉각 위험은 소비 채널이 아닌 현지 긴급 서비스"
        ]
      ]
    },
    {
      "id": "promise-boundary",
      "type": "callout",
      "title": "증거는 판단을 돕지만 구제 결과를 보장하지 않습니다",
      "tone": "warning",
      "body": "확인 문구, 배정 객실, 숙소 답, 플랫폼 약관, 결제 경로와 적용 절차에 따라 결과가 달라집니다. 객실 재고, 업그레이드, 환불, 비용 보전, 민원 수리나 특정 법률 결과를 보장하지 않습니다. 완벽한 사건 파일 때문에 즉각적 안전, 사생활이나 필요한 수면을 희생하지 마세요."
    },
    {
      "id": "next-step",
      "type": "callout",
      "title": "다음 단계: 네 줄 요청을 보내세요",
      "tone": "decision",
      "body": "‘주문 __은 __을 확인합니다. 객실 __은 __입니다. 빠진 필수 조건은 __입니다. 현지 시각 __까지 맞는 객실을 보여 주거나 없다는 사실을 서면 확인해 주세요. 그러면 합리적 대체 숙소를 확보하겠습니다.’라고 보내고 답을 저장한 뒤 시한에 확인 또는 이동하세요."
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "호텔 복구 절차 이어가기",
      "items": [
        {
          "label": "예약 분쟁 증거 파일 만들기",
          "href": "/ko/guides/china-booking-dispute-evidence-pack/",
          "description": "숙박을 안정시킨 뒤 주문·대화·결제 기록을 정리합니다."
        },
        {
          "label": "중국 숙소 결정 모아보기",
          "href": "/ko/stay/",
          "description": "호텔 순위가 아닌 숙소 의사결정 모음으로 돌아갑니다."
        },
        {
          "label": "접근 가능한 객실 검증하기",
          "href": "/ko/guides/china-accessible-hotel-room-verification/",
          "description": "하차 지점부터 객실·욕실까지 이어지는 동선을 검증합니다."
        },
        {
          "label": "호텔 비상 대피 동선 점검",
          "href": "/ko/guides/china-hotel-emergency-exit-fire-safety-check/",
          "description": "객실 불일치 분쟁 중에도 화재 안전은 멈추지 않습니다. 배정 층을 확인하고 대피가 불가능하면 이동하세요."
        },
        {
          "label": "외국인 숙박 등록 확인",
          "href": "/ko/guides/foreigners-china-hotel/",
          "description": "객실 조건 분쟁은 여권 등록이나 입실 거절 문제와 분리해 처리하세요."
        },
        {
          "label": "다음 호텔 형태 다시 고르기",
          "href": "/ko/guides/international-chain-or-local-hotel-china/",
          "description": "브랜드가 모든 오류를 막는다고 보지 말고 운영 적합성과 검증 품질로 고릅니다."
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "공식 소비자법·민원·이미지 출처",
      "items": [
        {
          "label": "중화인민공화국 소비자권익보호법",
          "url": "https://www.samr.gov.cn/zfjcj/tzgg/art/2023/art_615af9ed6bcd4974bf853dd2e02bc663.html",
          "publisher": "국가시장감독관리총국",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "소비자권익보호법 실시조례",
          "url": "https://app.www.gov.cn/govdata/gov/202403/19/513111/article.html",
          "publisher": "국무원·중국정부망",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "시장감독관리 민원·신고 처리방법",
          "url": "https://www.samr.gov.cn/zw/zfxxgk/fdzdgknr/fgs/art/2026/art_e4d03a20c0fd49769e408c7bf3791ff5.html",
          "publisher": "국가시장감독관리총국",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "대표 이미지: Edo-biscuit의 상하이 호텔 객실 사진, CC BY-SA 4.0",
          "url": "https://commons.wikimedia.org/wiki/File:Room_of_Toy_Story_Hotel_Shanghai.jpg",
          "publisher": "Wikimedia Commons",
          "reviewedAt": "2026-08-22"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
