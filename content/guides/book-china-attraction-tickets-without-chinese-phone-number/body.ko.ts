import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "direct-answer",
      "type": "lead",
      "text": "중국 전화번호나 위챗이 없어도 중국의 주요 관광지 일부는 예약할 수 있습니다. 관광지가 직접 안내하는 외국인 경로부터 시작하세요. 고궁박물원은 영문 예매 사이트, 중국국가박물관은 영문 예약 시스템으로 연결되고, 일부 관광지는 입구에서 직원이 구매를 도와줍니다. 핵심은 그 채널이 내 여권, 연락처, 방문 날짜를 처리할 수 있는지이므로, 예약이 열리기 전에 충분히 확인해 두세요."
    },
    {
      "id": "party-scenario",
      "type": "paragraph",
      "text": "부모님, 아이, 친구의 예약까지 함께 한다면 휴대전화로 페이지를 여는 것은 시작일 뿐입니다. 채널이 모든 여권을 받아 같은 날 모두의 예약을 완료할 수 있어야 합니다. 이 부분을 미리 정리해 두면 계정 문제로 일정 전체가 멈추지 않고, 실제로 남아 있는 시간대 중에서 고를 수 있습니다."
    },
    {
      "id": "routes-heading",
      "type": "heading",
      "level": 2,
      "text": "관광지의 공식 경로부터 시작하세요"
    },
    {
      "id": "routes-table",
      "type": "table",
      "caption": "외국인 방문객을 위한 공식 시작점",
      "columns": [
        "관광지",
        "시작할 곳",
        "확인할 점"
      ],
      "rows": [
        [
          "자금성",
          "공식 영문 Visit 페이지 → Book Tickets",
          "여권 경로를 이용하고 현재 로그인, 시간대, 결제 안내를 따르세요."
        ],
        [
          "중국국가박물관",
          "공식 영문 Admission 페이지 → 예약 시스템",
          "입장은 무료지만 현행 규칙상 예약이 확정되어야 합니다."
        ],
        [
          "싼싱두이박물관",
          "공식 사이트에서 시작, 영문 여권 서비스 근거 있음",
          "방문 날짜 기준 여권, 연락처, 결제 절차를 확인하세요."
        ],
        [
          "이화원",
          "공원 입구 직원 지원",
          "베이징시의 2025년 공식 답변에 따르면 온라인 경로는 중국 본토 번호가 필요했고, 여권 소지자는 입구에서 직원 도움으로 구매할 수 있었습니다. 방문 날짜에 맞춰 다시 확인하세요."
        ]
      ]
    },
    {
      "id": "walk-in-boundary",
      "type": "callout",
      "tone": "neutral",
      "title": "예약이 필요 없는 곳도 있습니다",
      "body": "상하이박물관 동관은 더 간단합니다. 일반 개인 입장은 예약 없이 유효한 신분증 원본만 지참하면 됩니다. 체험 구역과 특별전은 각자의 규칙을 따릅니다. 다른 관광지의 유인 창구는 유용한 대안이지만, 연휴에 표가 있거나 바로 입장할 수 있다는 보장은 아닙니다."
    },
    {
      "id": "barrier-heading",
      "type": "heading",
      "level": 2,
      "text": "실제로 어디에서 막혔는지 찾으세요"
    },
    {
      "id": "barrier-intro",
      "type": "paragraph",
      "text": "‘중국 번호가 없다’는 말은 네 가지 다른 문제일 수 있습니다. 어느 쪽인지 먼저 확인한 뒤 통신 구성을 바꿀지 정하세요."
    },
    {
      "id": "barrier-list",
      "type": "list",
      "items": [
        "연결: 데이터 eSIM으로 접속은 할 수 있어도 중국 본토 번호나 문자를 받지 못할 수 있습니다. 접속은 첫 단계일 뿐입니다.",
        "계정·연락처: 관광지가 실제로 지원하는 국가번호와 인증 방식을 확인하세요. 중국어 화면이라고 외국 번호를 거부하는 것은 아닙니다.",
        "신원: 전화번호가 통과되어도 양식이 여권을 받는다는 뜻은 아닙니다. 이름이나 신분증 입력란이 불분명하면 관광지 공식 지원 창구에 문의하세요.",
        "결제·확인: 카드 등록이나 결제 알림만으로 자리가 생기지 않습니다. 방문자 전원과 방문 날짜가 맞는 완료된 주문이 필요합니다."
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
      "text": "개인 정보를 가린 오류 화면과 주문 상태를 저장한 뒤, 관광지에 현재의 외국 신분증 경로를 문의하세요. 이전 주문이 해결되지 않았다면 다시 결제하지 말고, 내 여권 대신 다른 사람의 신원으로 예약하지 마세요. 원하는 날짜가 가득 찼다면 이동 일정을 확정하기 전에 다른 시간대나 날짜를 살펴보세요."
    },
    {
      "id": "preflight-copy",
      "type": "callout",
      "tone": "neutral",
      "title": "예약이 열리기 전에",
      "body": "일행 명단, 사용 가능한 공식 채널, 대체 날짜 하나를 확인하세요. 해외에서 쓰는 연락 계정에 계속 접근할 수 있게 하고, 완료된 예약은 오프라인으로 저장하며, 여권 원본을 지참하세요. 미리 준비해 두면 일행이 한 계획으로 움직이고, 예약 문제가 호텔·기차·이동의 급한 변경으로 번지지 않습니다."
    },
    {
      "id": "related-guides",
      "type": "internal-links",
      "title": "문제별로 이어서 볼 가이드",
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
      "text": "Homeground가 도울 수 있는 일"
    },
    {
      "id": "support-copy",
      "type": "paragraph",
      "text": "때로는 입장권보다 그날 하루의 연결이 더 큰 문제입니다. 박물관 시간대, 숙소 위치, 떠나는 기차가 서로 맞지 않을 수 있습니다. 여행 날짜, 일행, 가고 싶은 곳을 알려 주시면 관광지별로 맞는 서비스를 확인하고, 결제 전에 범위와 비용, 대안을 서면으로 안내해 드립니다."
    },
    {
      "id": "reservation-service",
      "type": "callout",
      "tone": "decision",
      "title": "채널이나 일행 예약이 막혔을 때",
      "body": "예약 대행 서비스는 8개 도시의 일부 관광지를 대상으로 합니다. 요금은 관광지당 1인 10,000원이고, 공식 입장료는 웃돈 없이 정가 그대로 별도로 받습니다. 중국국가박물관이나 싼싱두이처럼 외국인 공식 경로가 있는 곳은 그 경로에서 시작하고, 결제 전에 가능한 지원을 확인해 드립니다.",
      "link": {
        "href": "https://homegroundchina.com/ko/services/china-attraction-reservations/#reservation-enquiry",
        "label": "예약 대행 서비스·조건 보기"
      }
    },
    {
      "id": "support-links",
      "type": "internal-links",
      "title": "여행 전체를 계획하시나요?",
      "items": [
        {
          "label": "중국 프라이빗 투어",
          "href": "/ko/tours/",
          "description": "일정에 포함된 관광지 예약은 추가 서비스 요금 없이 전체 동선과 함께 조율합니다."
        },
        {
          "label": "장가계 프라이빗 가이드",
          "href": "/ko/services/private-english-speaking-guides/#zhangjiajie",
          "description": "천문산과 국가삼림공원은 8개 도시 예약 대행 대상이 아니므로 장가계 프라이빗 투어나 가이드로 계획하세요. 가이드 요금에는 교통과 입장권이 포함되지 않습니다."
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
          "answer": "항상 그렇지는 않습니다. 요건은 관광지와 채널마다 다릅니다. 관광지의 공식 외국인 경로와 현재 연락처 입력란을 확인한 뒤 중국 본토 번호가 필요한지 판단하세요."
        },
        {
          "question": "위챗 없이도 예약할 수 있나요?",
          "answer": "일부 관광지는 가능합니다. 관광지가 연결한 영문 사이트나 안내된 직원 지원 경로부터 확인하세요. 위챗 미니 프로그램을 쓰는 곳도 있으니 날짜를 확정하기 전에 공식 대안을 확인하세요."
        },
        {
          "question": "데이터 eSIM이면 예약 문제가 해결되나요?",
          "answer": "접속은 해결될 수 있지만 +86 번호나 문자는 없을 수 있습니다. 여권 인정, 결제, 잔여 입장권 문제까지 해결해 주지는 않습니다."
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
