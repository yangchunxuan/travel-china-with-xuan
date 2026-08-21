import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "answer-first",
      "type": "lead",
      "text": "수하물 벨트가 끝난 뒤에도 위탁 가방이 없거나 눈에 띄게 파손됐다면 접근 규정이 허용하는 한 수하물 수취·세관 구역을 나가기 전 담당 항공사 또는 수하물 서비스 데스크에 신고하세요. 수하물표, 탑승권과 여권을 내고 벨트·공지, 가방·파손을 촬영해 여행을 이어가기 전에 서면 번호를 받습니다. 일반 분실물 글이 아니라 해당 운항사 번호로 추적하고 수령 가능한 주소를 갱신하세요."
    },
    {
      "id": "quick-answer",
      "type": "callout",
      "title": "짧은 답",
      "body": "먼저 위탁 가방 미도착, 위탁 가방 파손 또는 기내·터미널 물품 분실로 분류합니다. 앞의 두 가지가 이 절차 대상입니다. 영수증 없이 원 수하물표나 파손 가방을 넘기지 말고 항공사 기록 전 수리·폐기하지 마세요. 급한 구매도 증거 사슬을 지우면 안 됩니다. 이 안내는 법적 책임, 배상 또는 기한을 판단하지 않습니다.",
      "tone": "decision"
    },
    {
      "id": "matrix-heading",
      "type": "heading",
      "level": 2,
      "text": "사건을 올바른 담당자에게 보내기"
    },
    {
      "id": "decision-matrix",
      "type": "table",
      "caption": "물건을 마지막으로 통제한 곳이 첫 신고처를 정합니다.",
      "columns": [
        "사건",
        "첫 담당",
        "제시 증거",
        "나가기 전"
      ],
      "rows": [
        [
          "위탁표 발행, 가방 미도착",
          "도착 구간 실제 운항사 수하물 서비스",
          "수하물표, 탑승권, 여권, 가방 설명과 여정",
          "비정상·추적 번호와 배송·연락 기록 받기"
        ],
        [
          "찢김·압착·젖음·외부 부품 누락",
          "출구 전 운항사 수하물 서비스",
          "가방, 태그, 전체 방향 사진과 내용물 영향",
          "보이는 상태 기록, 긴급 수리 전 질문"
        ],
        [
          "다른 벨트에 있거나 태그 이상",
          "수하물 홀 직원과 운항사",
          "실물 태그와 클레임 태그",
          "미확인 가방을 가져가지 않고 직원이 번호 대조"
        ],
        [
          "기내·터미널 물품 분실",
          "항공사 기내 서비스 또는 공항 분실물·보안",
          "좌석/구역, 시간, 물품 설명",
          "알맞은 분실물 절차로 전환, 위탁 보고서 미작성"
        ]
      ]
    },
    {
      "id": "workflow-heading",
      "type": "heading",
      "level": 2,
      "text": "쓸 수 있는 공항 신고서 만들기"
    },
    {
      "id": "workflow",
      "type": "list",
      "ordered": true,
      "items": [
        "항공편 표시가 닫히거나 직원이 하역 완료를 확인할 때까지 지정 벨트에 머뭅니다. 대형·특수 수하물과 근처 벨트를 보되 확인되지 않은 가방을 가져가지 마세요.",
        "벨트 번호, 항공편 화면과 서비스 공지를 촬영합니다. 파손은 받은 자리에서 가방 전체, 태그, 손상부, 바퀴·손잡이와 영향받은 내용물을 변경 전에 찍습니다.",
        "통제 구역 안 도착 구간 실제 운항사 또는 계약 수하물 데스크로 갑니다. 세관 동선이 접근에 영향을 주면 출구 전 제복 직원에게 신고 위치를 묻습니다.",
        "원 클레임 태그, 탑승권, 여권과 전체 여정을 제시합니다. 색, 브랜드, 크기, 소재와 특징으로 설명하고 확인 못 하는 내용물을 추측하지 마세요.",
        "생성된 신고서의 승객·연락, 태그번호, 항공편·날짜, 가방 설명, 미도착·파손 분류와 배송 주소를 줄마다 확인하고 서명·출발 전 오류를 고칩니다.",
        "사건 번호, 읽을 수 있는 종이·전자 신고서, 공식 추적·지원 채널과 호텔·다음 도시 주소 변경 방법을 받습니다. 직원이 원본을 보관하면 서면 영수증을 받아야 합니다.",
        "파손은 수리·포장 폐기 전 항공사가 요구하는 검사, 견적 또는 보관을 묻습니다. 넘기는 물품을 촬영하고 영수증을 받으세요.",
        "출구 전 여정·주소 변경 방법과 반환 가방 배송·수령 장소를 묻습니다. 호텔 수령 가능 여부와 투숙객 이름·번호를 확인하세요."
      ]
    },
    {
      "id": "confirmation-heading",
      "type": "heading",
      "level": 2,
      "text": "추적 가능한 사고 기록 만들기"
    },
    {
      "id": "confirmation-lanes",
      "type": "comparison",
      "title": "가방 신원·상태·인계",
      "columns": [
        {
          "heading": "가방 신원",
          "body": "클레임 태그번호, 실물 설명, 항공편과 승객을 맞춥니다. 출발 전 가방 사진이 구분을 돕습니다."
        },
        {
          "heading": "사고 상태",
          "body": "수리·폐기·추가 취급으로 증거가 바뀌기 전 미도착·파손, 시간과 사진을 기록합니다."
        },
        {
          "heading": "복구 인계",
          "body": "운항사 번호, 추적 채널과 연락 가능한 배송·수령 주소를 확인하고 일정 이동 때 갱신합니다."
        }
      ]
    },
    {
      "id": "failure-heading",
      "type": "heading",
      "level": 2,
      "text": "첫 신고가 불완전할 때"
    },
    {
      "id": "failure-matrix",
      "type": "table",
      "caption": "사실이나 법적 주장을 만들지 말고 증거 기록을 고칩니다.",
      "columns": [
        "문제",
        "행동",
        "여행 지속 대안"
      ],
      "rows": [
        [
          "데스크가 태그를 찾지 못함",
          "탑승 기록·태그 사진을 보여 주고 최종 운항사에 접수·환승 스캔 확인 요청",
          "신고 불가 대화 정보를 남기고 공식 수하물 채널 연락"
        ],
        [
          "데스크 폐쇄 또는 이미 나옴",
          "폐쇄 데스크·위치를 촬영하고 공식 경로로 즉시 항공사·공항 연락",
          "서면 지시와 번호 요청, 여행 끝까지 기다리지 않기"
        ],
        [
          "배송 주소 변경 예정",
          "공식 채널로 사건을 갱신하고 새 호텔 수령 확인",
          "배송 수령 불확실하면 운항사 직접 수령 선택"
        ],
        [
          "필수 약·장비가 가방 안",
          "데스크에 정확히 알리고 약사·의료기관·장비 담당 연락",
          "건강·안전 이동에 대체가 필요하면 가방을 기다리지 않기"
        ],
        [
          "항공사가 파손 가방 보관 요청",
          "촬영, 인계 내용물 목록, 서명·전자 영수증 받기",
          "필수품과 모든 문서 사본 휴대"
        ],
        [
          "추적 페이지 변화 없음",
          "사건 번호로 담당 운항사에 현재 추적 메모 요청",
          "필수품 예산으로 여행 지속, 배송 시간 미보장"
        ]
      ]
    },
    {
      "id": "recovery-heading",
      "type": "heading",
      "level": 2,
      "text": "사건이 열린 채 여행 이어가기"
    },
    {
      "id": "recovery",
      "type": "list",
      "ordered": true,
      "items": [
        "실제 필요에 따라 24시간 필수품을 정합니다. 적절한 전문가를 통한 약 대체, 기본 세면품, 옷 한 벌과 필요한 충전·접근성 물품입니다.",
        "지출 전 담당 항공사·보험사에 필요한 증거와 승인을 묻고 답을 환급 약속이 아니라 처리 지침으로 봅니다.",
        "비례해 구매하고 품목별 영수증, 결제 기록과 사진을 보관합니다. 필수품과 편의·고가품 대체를 구분하세요.",
        "날짜, 시간, 채널, 직원·상담원 식별, 사건번호와 사실 업데이트를 연락 기록에 적고 이전 화면을 덮어쓰지 않습니다.",
        "호텔·도시 변경 전 배송 지시를 갱신하고 예약 투숙객명, 날짜, 프런트 연락과 거절 때 처리 방법을 포함합니다.",
        "가방 반환 시 수령 전 봉인·상태를 촬영하고 태그·내용을 비교하며 새 파손·누락은 기존 공식 사건에 빨리 추가합니다.",
        "실물 수령과 거래 질문이 모두 맞은 뒤 기록을 닫고 별도 항공사·보험·법률 절차를 위해 사본을 보관합니다."
      ]
    },
    {
      "id": "scope-boundary",
      "type": "callout",
      "title": "책임·배상·시간을 판단하지 않습니다",
      "body": "이 실무 안내는 법적 책임, 협약 적용, 청구 기한, 배상, 환급, 수리 가치 또는 배송 시간을 판단하지 않습니다. 여정, 운송약관, 적용 법, 증거와 권한 있는 결정자에 따라 달라집니다. 이런 질문은 항공사와 자격 있는 법률·보험 전문가에게 문의하세요. 여기서는 신속 신고, 증거 보존, 추적 가능한 인계와 안전한 여행 지속이 우선입니다.",
      "tone": "warning"
    },
    {
      "id": "next-heading",
      "type": "heading",
      "level": 2,
      "text": "수하물 홀을 나설 때"
    },
    {
      "id": "next-check",
      "type": "list",
      "items": [
        "정확한 사건·추적 번호",
        "신고서 사본",
        "원 태그 또는 보관 물품 영수증",
        "가방·파손·벨트 사진",
        "공식 추적·지원 채널",
        "연락 가능한 배송·수령 계획",
        "주소 갱신 방법",
        "필수품 증거 규칙 확인"
      ]
    },
    {
      "id": "faq-heading",
      "type": "heading",
      "level": 2,
      "text": "위탁 수하물 사고 질문"
    },
    {
      "id": "faq-1-question",
      "type": "heading",
      "level": 3,
      "text": "수하물 홀을 나온 뒤 나중에 신고해도 되나요?"
    },
    {
      "id": "faq-1-answer",
      "type": "paragraph",
      "text": "통제 구역 규정이 허용하면 나가기 전 신고하세요. 데스크가 닫혔거나 접근 불가하면 사실을 기록하고 공식 채널로 담당 운항사에 즉시 연락합니다."
    },
    {
      "id": "faq-2-question",
      "type": "heading",
      "level": 3,
      "text": "공항 분실물 센터가 위탁 가방을 추적하나요?"
    },
    {
      "id": "faq-2-answer",
      "type": "paragraph",
      "text": "위탁 가방은 담당 실제 운항사 또는 계약 수하물 서비스부터 시작합니다. 기내·터미널 물품은 별도 항공사·공항 분실물 절차입니다."
    },
    {
      "id": "faq-3-question",
      "type": "heading",
      "level": 3,
      "text": "항공사가 대체품 비용을 지급하나요?"
    },
    {
      "id": "faq-3-answer",
      "type": "paragraph",
      "text": "이 페이지는 약속할 수 없습니다. 항공사·보험사의 현재 증거 요건을 묻고 품목별 기록을 보존하세요. 책임·환급은 개별 판단입니다."
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "관련 수하물·증거·여행 복구 주제",
      "items": [
        {
          "label": "중국 국내선 운임·수하물 묶음",
          "href": "/ko/guides/china-domestic-flight-fare-bundle-baggage/",
          "description": "출발 전 구매 수하물 조건을 확인하세요."
        },
        {
          "label": "분리 발권 셀프 환승 위험",
          "href": "/ko/guides/china-separate-flight-tickets-self-transfer-risk/",
          "description": "셀프 환승에서 가방 담당자를 확인하세요."
        },
        {
          "label": "예약 분쟁 증거 묶음",
          "href": "/ko/guides/china-booking-dispute-evidence-pack/",
          "description": "미해결 항공사·결제 기록을 정리하세요."
        },
        {
          "label": "중국 공항 경유 판단",
          "href": "/ko/guides/china-airport-layover-immigration-bags-airside-overnight/",
          "description": "경유 전 수하물 수취·환승을 확인하세요."
        },
        {
          "label": "중국에서 여권 분실 후 출국 복구",
          "href": "/ko/guides/lost-passport-in-china-exit-recovery/",
          "description": "가방이 아니라 여권을 잃었다면 신분증 안내를 보세요."
        },
        {
          "label": "국제선 전 마지막 밤",
          "href": "/ko/guides/china-last-night-before-international-flight/",
          "description": "출국 자료와 필수품을 접근 가능하게 두세요."
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "공식 출처",
      "items": [
        {
          "label": "중국 민항 승객·수하물 규정",
          "url": "https://www.caac.gov.cn/big5/www.caac.gov.cn/English/News/202305/W020230515366504232292.pdf",
          "publisher": "중국민용항공국",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "에어차이나 수하물 이상 안내",
          "url": "https://webresource.airchina.com.cn/en-US/content/c/2022-10-21/5411.shtml?hySource=airchina-pc&hyUploadType=series",
          "publisher": "에어차이나",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "에어차이나 수하물 추적",
          "url": "https://www.airchina.com.cn/flight/query-services/baggage-loss-and-delay",
          "publisher": "에어차이나",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "중국남방항공 수하물 추적",
          "url": "https://www.csair.com/en/online/outbaggage/?orderChannel=FWDT-ZJC",
          "publisher": "중국남방항공",
          "reviewedAt": "2026-08-22"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
