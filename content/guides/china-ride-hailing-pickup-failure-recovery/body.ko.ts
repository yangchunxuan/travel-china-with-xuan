import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "answer-first",
      "type": "lead",
      "text": "차량이 배정됐지만 만나지 못하면 움직이는 지도 아이콘을 따라 걷지 마세요. 안전하고 합법적이며 식별 가능한 곳에 서서 앱 핀과 실제 승차 구역 이름을 비교하고 주문 채널로 정확한 랜드마크 하나를 보냅니다. 번호판과 주요 차량·기사 정보가 배정 기록과 맞을 때만 탑승하며 빨리 맞출 수 없으면 증거를 남겨 플랫폼 취소·지원 절차를 쓰고 직원 있는 공식 교통 대안으로 전환하세요."
    },
    {
      "id": "quick-answer",
      "type": "callout",
      "title": "짧은 답",
      "body": "배정 차량, 앱 승차 지점, 눈앞의 물리적 랜드마크를 세 방향으로 맞추세요. 기사가 타라고 하는 말은 일치 증거가 아닙니다. 다른 번호판 차량, 차도·장벽 횡단, 결제·여권 자격정보 공유로 픽업을 해결하지 마세요. 이 페이지는 주문 뒤부터 시작하며 앱 순위나 호출 방법은 다루지 않습니다.",
      "tone": "decision"
    },
    {
      "id": "matrix-heading",
      "type": "heading",
      "level": 2,
      "text": "만남 지점 실패 진단"
    },
    {
      "id": "decision-matrix",
      "type": "table",
      "caption": "기사와 승객이 계속 돌지 않도록 한 번에 하나만 바꿉니다.",
      "columns": [
        "신호",
        "가능한 불일치",
        "유용한 메시지",
        "결정"
      ],
      "rows": [
        [
          "기사 아이콘은 가깝지만 차량 안 보임",
          "다른 도로 층·문·분리도로 반대편",
          "입구/층, 랜드마크 이름과 얼굴 없는 현장 사진",
          "기사가 같은 랜드마크를 확인할 때까지 머무르기"
        ],
        [
          "앱 핀이 건물 안·진입 제한 도로",
          "GPS 오차 또는 승차 금지 지점",
          "플랫폼·시설 지정 승차 구역 선택 또는 직원에게 위치 문의",
          "안전한 보행로로만 이동 후 기사에게 갱신"
        ],
        [
          "차가 왔지만 번호판·정보 다름",
          "잘못된 차량 또는 미확인 대체",
          "배정 정보와 다르다고 명확히 전달",
          "탑승하지 않고 앱 안전·지원 연락"
        ],
        [
          "연락 안 되고 대기·취소 경고 증가",
          "기사가 접근 못 하거나 주문 정지",
          "주문 채팅에 마지막 정확 위치 전송",
          "증거 저장 후 플랫폼 취소·지원, 전환"
        ]
      ]
    },
    {
      "id": "workflow-heading",
      "type": "heading",
      "level": 2,
      "text": "짧은 제어 반복으로 픽업 복구"
    },
    {
      "id": "workflow",
      "type": "list",
      "ordered": true,
      "items": [
        "이동을 멈춥니다. 조명과 직원이 있거나 지정된 대기 구역 중 차도·출구·보안 장벽을 피한 곳에 서고 동행·아이·짐을 함께 둡니다.",
        "다가오는 낯선 차가 아니라 주문을 봅니다. 배정 번호판, 표시된 차종·색, 기사 식별정보와 주문 연락 채널을 확인하고 현재 핀과 함께 저장합니다.",
        "터미널·층, 역 출구 번호, 호텔 입구, 쇼핑몰 문 또는 표시된 호출차 구역처럼 시설의 물리 위치를 말합니다. 파란 점만으로는 도로 층을 알 수 없습니다.",
        "앱 핀과 실제 장소를 비교합니다. 틀렸다면 플랫폼·시설이 제공하는 합법 승차점만 선택하고 장벽 너머 정차 금지 구역으로 핀을 끌지 마세요.",
        "보이는 랜드마크, 도로 쪽·층과 원한다면 옷·가방 색을 한 메시지로 보냅니다. 앱 번역이나 저장된 중국어 문장을 쓰고 주문 채널에 남으세요.",
        "차량이 오면 접근 전에 번호판을 읽고 나머지 정보를 맞춥니다. 무관한 개인정보 없이 앱 목적지를 확인해 달라고 합니다.",
        "차량 불일치, 문 상태 불안, 플랫폼 이탈 요구 또는 위험 횡단이 필요하면 타지 않습니다. 직원 있는 안전 지점으로 돌아가 지원을 씁니다.",
        "여정에 맞는 시간 한계를 정합니다. 지나면 연락, 핀·차량 증거를 저장하고 실제 취소 사유를 사용해 지하철, 공식 택시 줄, 호텔 데스크 또는 새 검증 주문으로 갑니다."
      ]
    },
    {
      "id": "confirmation-heading",
      "type": "heading",
      "level": 2,
      "text": "탑승 삼각 확인"
    },
    {
      "id": "confirmation-lanes",
      "type": "comparison",
      "title": "차량·장소·주문",
      "columns": [
        {
          "heading": "차량",
          "body": "실물 번호판과 차량 정보가 배정 기록과 일치합니다. 기록이 다르면 말로 하는 대체를 받지 않습니다."
        },
        {
          "heading": "장소",
          "body": "양쪽이 같은 합법 승차 구역, 입구, 층과 도로 쪽을 말합니다. 물리 표지가 지도 모호성을 풉니다."
        },
        {
          "heading": "주문",
          "body": "활성 앱 주문, 목적지와 지원 연락이 유지됩니다. 먼저 취소하고 사적으로 거래하라는 요청은 증거 사슬을 끊습니다."
        }
      ]
    },
    {
      "id": "failure-heading",
      "type": "heading",
      "level": 2,
      "text": "픽업 실패와 안전한 종료"
    },
    {
      "id": "failure-matrix",
      "type": "table",
      "caption": "목표는 아무 차에 타는 것이 아니라 검증된 탑승입니다.",
      "columns": [
        "실패",
        "즉시 할 일",
        "종료 경로"
      ],
      "rows": [
        [
          "다른 번호판 도착",
          "거리를 두고 배정 번호판 불일치 전달",
          "플랫폼 안전·지원에 신고하고 직원 있는 곳 대기"
        ],
        [
          "탑승 전 앱 밖 현금·취소 요구",
          "지원에 묻는 동안 주문 유지",
          "사적 운송 거절 후 공식 택시 줄·새 검증 주문"
        ],
        [
          "핀이 다른 층",
          "정확한 층·문을 보내고 공식 보행 표지 이용",
          "공항·역·몰 직원에게 지정 호출차 구역 문의"
        ],
        [
          "차도로 나오라고 함",
          "차도·장벽으로 가지 않기",
          "합법 승차점 선택 또는 위치 증거로 취소"
        ],
        [
          "전화·데이터 중단",
          "마지막 안전 지점에서 시설 Wi-Fi·전화·직원 도움",
          "공식 택시 줄 또는 입구를 실제 확인한 대중교통"
        ],
        [
          "위협을 느낌",
          "사람·직원·보안 쪽으로 이동하고 차량과 대치하지 않기",
          "상황에 맞게 현지 긴급 도움과 플랫폼 안전 채널 이용"
        ]
      ]
    },
    {
      "id": "recovery-heading",
      "type": "heading",
      "level": 2,
      "text": "실패 주문을 닫고 다음 주문 만들기"
    },
    {
      "id": "recovery",
      "type": "list",
      "ordered": true,
      "items": [
        "주문이 보일 때 지도 핀, 승차점 이름, 배정 번호판, 기사 연락과 시간을 저장합니다.",
        "접근·기사·픽업 실패를 정확히 설명하는 취소 사유를 고르고 수수료 회피를 위해 꾸미지 않습니다.",
        "수수료가 생기면 주문 기록과 증거로 플랫폼 검토를 요청합니다. 수수료는 개인 안전과 다음 이동에서 분리하세요.",
        "새 주문 전 대체 승차점으로 이동해 안정적이고 합법적인 위치에서 새 핀을 시작합니다.",
        "공식 택시는 표시된 줄과 배차 차량을 쓰고, 지하철·버스는 입구와 막차 제한을 확인합니다.",
        "동행·호텔 데스크에 새 교통수단과 목적지를 알립니다. 길가에서 다투지 말고 첫 주문 최종 상태는 나중에 정리합니다."
      ]
    },
    {
      "id": "scope-boundary",
      "type": "callout",
      "title": "이 복구가 보장하지 않는 것",
      "body": "이 안내는 차량 신원, 기사 행동, 승차 접근, 취소 수수료 환급, 도착 시간, 경로 또는 안전을 보장하지 않습니다. 플랫폼, 시설, 기사와 실시간 도로 규칙이 통제합니다. 번호판 불일치 차량, 교통 장벽 우회, 앱 밖 거래 또는 무관한 여권·은행·인증정보 제공을 하지 마세요.",
      "tone": "warning"
    },
    {
      "id": "next-heading",
      "type": "heading",
      "level": 2,
      "text": "차량으로 가기 전"
    },
    {
      "id": "next-check",
      "type": "list",
      "items": [
        "대기점 안전·합법",
        "물리 구역 이름과 앱 일치",
        "번호판 완전 일치",
        "차량·기사 정보 일관",
        "목적지가 활성 주문에 남음",
        "연락이 주문 채널 안",
        "전환 기준·대안 위치 파악"
      ]
    },
    {
      "id": "faq-heading",
      "type": "heading",
      "level": 2,
      "text": "차량 픽업 질문"
    },
    {
      "id": "faq-1-question",
      "type": "heading",
      "level": 3,
      "text": "움직이는 기사 아이콘 쪽으로 걸어가야 하나요?"
    },
    {
      "id": "faq-1-answer",
      "type": "paragraph",
      "text": "보통 아닙니다. 안전한 물리 랜드마크를 정해 기사와 확인하세요. 아이콘은 다른 도로 층이거나 지연될 수 있습니다."
    },
    {
      "id": "faq-2-question",
      "type": "heading",
      "level": 3,
      "text": "기사가 앱 번호판이 틀렸다고 하면요?"
    },
    {
      "id": "faq-2-answer",
      "type": "paragraph",
      "text": "번호판이 다른 차량에 타지 마세요. 안전한 곳에서 플랫폼 안전·지원으로 확인하거나 취소합니다."
    },
    {
      "id": "faq-3-question",
      "type": "heading",
      "level": 3,
      "text": "배정 뒤 핀을 옮길 수 있나요?"
    },
    {
      "id": "faq-3-answer",
      "type": "paragraph",
      "text": "플랫폼이 지원하는 변경과 합법적인 시설 승차점만 사용하세요. 기사에게 물리 랜드마크를 말하고 주문을 지키려 차도로 나가지 마세요."
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "관련 지도·결제·복구 주제",
      "items": [
        {
          "label": "주소 확인·내비게이션 백업",
          "href": "/ko/guides/china-navigation-verified-address-backup/",
          "description": "픽업에 쓸 중국어 랜드마크·지도 증거를 준비하세요."
        },
        {
          "label": "전용 차량 또는 대중교통",
          "href": "/ko/guides/china-private-transfer-or-public-transport/",
          "description": "호출 주문이 불가능할 때 대체 교통을 고르세요."
        },
        {
          "label": "여행객의 중국 결제 방법",
          "href": "/ko/guides/how-to-pay-in-china-as-a-tourist/",
          "description": "결제 설정과 픽업 안전을 구분하세요."
        },
        {
          "label": "휴대전화 분실 후 디지털 복구",
          "href": "/ko/guides/lost-phone-in-china-digital-recovery/",
          "description": "주문 기기를 잃으면 디지털 복구 안내로 전환하세요."
        },
        {
          "label": "지하철 가까운 호텔",
          "href": "/ko/guides/china-hotel-near-metro/",
          "description": "호텔 가까이에 독립 대중교통 대안을 두세요."
        },
        {
          "label": "중국 로보택시 구역",
          "href": "/ko/guides/china-robotaxi-zones-explained/",
          "description": "운영 구역·서비스 경계는 해당 안내를 보세요."
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "공식 출처",
      "items": [
        {
          "label": "상하이 디디 이용 안내",
          "url": "https://english.shanghai.gov.cn/en-UsefulApps/20240206/976515bc601f4803b9ce2f64ae9f0cd3.html",
          "publisher": "상하이시 인민정부",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "2025 중국 생활·업무 안내",
          "url": "https://english.www.gov.cn/2025special/bizexpatsinchina2025",
          "publisher": "중국 국무원",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "디디 안전 안내",
          "url": "https://www.didiglobal.com/science/security",
          "publisher": "디디 글로벌",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "베이징 교통 안내",
          "url": "https://english.beijing.gov.cn/travellinginbeijing/transportation/202006/t20200623_1931439.html",
          "publisher": "베이징시 인민정부",
          "reviewedAt": "2026-08-22"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
