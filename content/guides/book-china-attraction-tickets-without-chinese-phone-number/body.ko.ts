import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "direct-answer",
      "type": "lead",
      "text": "중국 전화번호나 위챗 없이도 일부 관광지를 예약할 수 있습니다. 관광지의 공식 외국인 경로부터 확인하세요. 고궁박물원은 영문 예매 사이트, 중국국가박물관은 영문 예약 시스템을 연결하고, 일부 장소는 직원이 돕는 현장 경로도 제공합니다. 중요한 것은 내 여권·연락처·방문 날짜를 처리할 수 있는 채널입니다. 하루를 입장권 하나에 맞춘 뒤 입력이 막히기보다 예약 오픈 전에 확인하세요."
    },
    {
      "id": "party-scenario",
      "type": "paragraph",
      "text": "부모님, 아이 또는 친구의 관람을 함께 준비한다면 휴대전화로 페이지를 여는 것은 시작일 뿐입니다. 그 채널이 각자의 여권을 받고 같은 날의 예약을 완료할 수 있어야 합니다. 예매가 열리기 전에 이 부분을 확인하면 전체 일정이 계정 문제를 기다리지 않도록 실제 예약 가능한 시간대를 선택할 수 있습니다."
    },
    {
      "id": "matching-support",
      "type": "callout",
      "tone": "decision",
      "title": "날짜를 조정할 수 있을 때 지원을 확인하세요",
      "body": "Homeground 기존 예약 대행 서비스 요금은 관광지당 1인 10,000원이며 공식 입장료는 별도입니다. 실제 채널 문제나 일행 조율이 남아 있다면 관광지·날짜·인원을 알려 주세요. 결제 전에 가능한 범위·채널·요금·약관을 서면 확인합니다. 사전 요청 기간에 따른 보장과 환불 조건은 서비스 페이지에서 확인하세요.",
      "link": {
        "href": "https://homegroundchina.com/ko/services/china-attraction-reservations/#reservation-enquiry",
        "label": "예약 지원·약관 보기"
      }
    },
    {
      "id": "routes-heading",
      "type": "heading",
      "level": 2,
      "text": "관광지마다 이용 가능한 경로가 다릅니다"
    },
    {
      "id": "routes-table",
      "type": "table",
      "caption": "관광지가 직접 안내하는 공식 채널에서 시작하세요.",
      "columns": [
        "관광지",
        "시작 경로",
        "추가 확인"
      ],
      "rows": [
        [
          "자금성",
          "공식 영문 관람 페이지 → 예매 사이트",
          "여권 경로에서 현행 등록·시간대·결제 안내 확인."
        ],
        [
          "중국국가박물관",
          "공식 영문 Admission → 예약 시스템",
          "무료 입장도 예약 완료 필요. 현행 입장 규칙 확인."
        ],
        [
          "싼싱두이박물관",
          "공식 사이트에서 시작. 영문 여권 서비스 근거 있음",
          "방문일 기준 여권·연락처·결제 경로 확인."
        ],
        [
          "이화원",
          "공식 답변에 기록된 입구 직원 지원",
          "베이징 2025년 답변: 해당 온라인 경로는 중국 번호 필요, 여권 지참 후 입구 직원의 구매 지원 가능. 방문일 기준 재확인."
        ]
      ]
    },
    {
      "id": "walk-in-boundary",
      "type": "paragraph",
      "text": "상하이박물관 동관의 일반 개인 입장은 더 간단합니다. 사전예약이 필요 없으며 유효한 신분증 원본을 지참합니다. 체험 구역·특별전은 별도 규칙을 따릅니다. 다른 관광지의 유인 창구도 하나의 대안일 뿐 휴일 입장권이나 즉시 입장을 약속하지 않습니다."
    },
    {
      "id": "barrier-heading",
      "type": "heading",
      "level": 2,
      "text": "통신 구성을 바꾸기 전에 막힌 지점을 찾으세요"
    },
    {
      "id": "barrier-list",
      "type": "list",
      "items": [
        "연결: 데이터 eSIM은 사이트에 접속하게 해도 중국 번호·문자를 제공하지 않을 수 있습니다. 접속은 첫 단계일 뿐입니다.",
        "계정·연락처: 공식 채널의 국가번호·인증 경로를 확인하세요. 중국어 화면이 외국 번호 거부를 뜻하지는 않습니다.",
        "신원: 전화번호가 받아들여져도 여권을 지원한다는 뜻은 아닙니다. 이름·신분증 입력이 불명확하면 공식 지원에 확인하세요.",
        "결제·확인: 카드 등록이나 결제 알림만으로 시간대가 배정되지 않습니다. 전원·방문 날짜가 맞는 완료된 주문이 필요합니다."
      ]
    },
    {
      "id": "stuck-heading",
      "type": "heading",
      "level": 2,
      "text": "공식 경로가 계속 막히면 어떻게 할까요?"
    },
    {
      "id": "stuck-copy",
      "type": "paragraph",
      "text": "민감 정보를 가린 오류 화면과 주문 상태를 저장한 뒤 관광지에 현행 외국 신분증 경로를 문의하세요. 이전 주문이 미해결이면 결제를 반복하지 말고, 내 여권 대신 다른 사람 신원을 쓰지 마세요. 원하는 날짜가 어렵다면 이동 일정을 확정하기 전에 다른 시간대·날짜를 살펴보세요. 중국국가박물관·싼싱두이는 공식 외국인 경로가 있으며 외부 예약 지원은 관광지별 확인이 필요합니다."
    },
    {
      "id": "preflight-copy",
      "type": "paragraph",
      "text": "변경하기 어려운 예약 오픈 전에 일행 명단·이용 가능한 공식 채널·대체 날짜 하나를 확인하세요. 해외에서 사용한 연락 계정에 계속 접근할 수 있게 하고, 완료된 예약을 오프라인 저장하며 여권 원본을 지참하세요. 이런 준비는 가족이 함께 움직이고 예약 문제가 호텔·기차·이동의 급한 변경으로 이어지는 일을 줄이는 데 도움이 됩니다."
    },
    {
      "id": "related-guides",
      "type": "internal-links",
      "title": "문제에 맞는 가이드",
      "items": [
        {
          "label": "어떤 관광지를 먼저 예약할까요?",
          "href": "/ko/guides/china-attractions-advance-booking-checklist/"
        },
        {
          "label": "중국 eSIM·현지 SIM 선택",
          "href": "/ko/guides/china-esim-vs-local-sim/"
        },
        {
          "label": "외국 카드로 중국에서 결제하기",
          "href": "/ko/guides/how-to-pay-in-china-as-a-tourist/"
        },
        {
          "label": "예약별 여권 이름 확인",
          "href": "/ko/guides/passport-name-across-china-bookings/"
        },
        {
          "label": "공식 채널·바우처·예약 상태",
          "href": "/ko/guides/official-or-reseller-china-tickets/"
        }
      ]
    },
    {
      "id": "support-heading",
      "type": "heading",
      "level": 2,
      "text": "하루 전체를 조율해야 할 때"
    },
    {
      "id": "support-copy",
      "type": "paragraph",
      "text": "예약 문제는 때로 동선 문제입니다. 가능한 박물관 시간대가 숙소 위치·출발 기차와 맞지 않을 수 있습니다. Homeground가 하루 전체에 맞는 지원을 확인해 드릴 수 있으며, 프라이빗 투어 일정 내 예약에는 별도 대행 수수료가 없습니다. 천문산·삼림공원은 독립 예약 대행 8개 도시 목록 밖이므로 기존 장가계 프라이빗 투어·가이드 서비스를 이용하세요. 가이드 요금만으로 교통·입장권이 포함되지는 않습니다."
    },
    {
      "id": "support-links",
      "type": "internal-links",
      "title": "일정 조율을 위한 서비스",
      "items": [
        {
          "label": "중국 프라이빗 투어",
          "href": "/ko/tours/",
          "description": "전체 일정 안에서 예약을 조율합니다."
        },
        {
          "label": "장가계 프라이빗 가이드",
          "href": "/ko/services/private-english-speaking-guides/#zhangjiajie",
          "description": "가이드만 제공하며 입장권·교통은 따로 확인합니다."
        }
      ]
    },
    {
      "id": "faq",
      "type": "faq",
      "title": "예약 오픈 전 자주 묻는 질문",
      "items": [
        {
          "question": "외국인은 관광지 예약에 중국 번호가 꼭 필요한가요?",
          "answer": "요건은 관광지·채널마다 다릅니다. 공식 외국인 경로와 현재 연락처 입력란을 확인한 뒤 중국 번호가 필요한지 판단하세요."
        },
        {
          "question": "위챗 없이도 예약할 수 있나요?",
          "answer": "일부는 가능합니다. 공식 영문 사이트나 안내된 직원 지원 경로부터 확인하세요. 미니 프로그램을 쓰는 곳도 있으므로 날짜 확정 전에 공식 대안을 확인하세요."
        },
        {
          "question": "데이터 eSIM이면 예약 문제가 해결되나요?",
          "answer": "접속 문제는 해결할 수 있지만 +86 번호·문자가 없을 수 있습니다. 여권 지원·결제·잔여 입장권까지 보장하지는 않습니다."
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "공식 자료와 사진 출처",
      "items": [
        {
          "label": "고궁박물원: 영문 관람·예매 안내",
          "url": "https://intl.dpm.org.cn/visit.html",
          "publisher": "The Palace Museum",
          "reviewedAt": "2026-10-08"
        },
        {
          "label": "중국국가박물관: 현행 입장 규칙·영문 예약 링크",
          "url": "https://en.chnmuseum.cn/visit_692/",
          "publisher": "National Museum of China",
          "reviewedAt": "2026-10-08"
        },
        {
          "label": "광한시 정부: 외국인 여권·영문 예매 서비스",
          "url": "https://www.guanghan.gov.cn/gk/mbjj/gjjmb/1681915.htm",
          "publisher": "Guanghan Municipal Government",
          "reviewedAt": "2026-10-08"
        },
        {
          "label": "베이징 12345: 관광지별 전화번호 조건·현장 지원",
          "url": "https://english.beijing.gov.cn/12345hotline/faqs/all/202506/t20250620_4117980.html",
          "publisher": "Beijing Municipal Government",
          "reviewedAt": "2026-10-08"
        },
        {
          "label": "상하이박물관 동관: 개인 입장·별도 예약",
          "url": "https://www.shanghaimuseum.cn/mu/frontend/pg/en/service/visit-east",
          "publisher": "Shanghai Museum",
          "reviewedAt": "2026-10-08"
        },
        {
          "label": "대표 사진: Maros M r a z 촬영 천단, CC BY-SA 3.0",
          "url": "https://commons.wikimedia.org/wiki/File:Temple_of_Heaven,_Beijing,_China_-_009.jpg",
          "publisher": "Wikimedia Commons"
        },
        {
          "label": "사진 라이선스: CC BY-SA 3.0",
          "url": "https://creativecommons.org/licenses/by-sa/3.0/",
          "publisher": "Creative Commons"
        }
      ]
    }
  ]
};

export default body;
