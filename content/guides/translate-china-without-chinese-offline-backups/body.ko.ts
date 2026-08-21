import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "answer-first",
      "type": "lead",
      "text": "번역은 초안으로 쓰고 권위 있는 답으로 보지 마세요. 메뉴는 음식명·가격·선택 표시를 한 화면에 담고, 앱 오류는 사라지기 전에 원본 화면을 캡처합니다. 표지판은 글자만이 아니라 그 표지가 지시하는 문·승강장·창구까지 함께 찍으세요. 한 번 번역한 뒤 알레르기, 승차권, 결제, 의료, 안전 의미는 직원이나 두 번째 방법으로 확인합니다. 네트워크가 끊겨도 대화할 수 있도록 짧은 오프라인 문장 카드를 준비하세요."
    },
    {
      "id": "quick-answer",
      "type": "callout",
      "title": "맥락을 남기고 번역한 뒤 확인하세요",
      "body": "카메라는 눈앞의 글자, 스크린샷은 사라지는 화면, 직접 입력은 정확한 이름과 숫자, 전체 화면 한 문장은 옆 사람과의 대화에 적합합니다. 지원 언어를 미리 내려받고 출국 전 테스트하되 카메라·음성·앱 기능 일부가 연결을 요구하거나 기기별로 달라질 수 있다고 가정하세요. 결과가 중요한 내용은 사람이 확인해야 합니다.",
      "tone": "decision"
    },
    {
      "id": "matrix-heading",
      "type": "heading",
      "level": 2,
      "text": "증거를 보존하는 입력 방식을 고르세요"
    },
    {
      "id": "decision-matrix",
      "type": "table",
      "caption": "자료마다 틀리는 방식이 다릅니다",
      "columns": [
        "자료",
        "첫 캡처",
        "함께 담을 것",
        "확인 방법"
      ],
      "rows": [
        [
          "종이 메뉴·메뉴판",
          "정면에서 반사 없이 촬영",
          "음식 제목, 가격, 양, 선택 표시와 주변 주석",
          "정확한 항목을 가리키고 수량과 식이 제한을 다시 말해 달라고 하세요."
        ],
        [
          "QR 메뉴·앱 화면",
          "원본 스크린샷",
          "페이지 제목, 선택 옵션, 장바구니 수량, 수수료와 제출 버튼",
          "결제 전에 직원이나 동행자와 최종 주문을 확인하세요."
        ],
        [
          "역·출입구·경고 표지",
          "맥락 전체 사진과 글자 근접 사진",
          "화살표, 층, 문 번호, 시간 조건과 표지가 적용되는 장소",
          "현재 공식 표지를 따르고 충돌하면 제복 직원을 찾으세요."
        ],
        [
          "짧은 대화",
          "한 가지 요청을 적은 전체 화면 문장",
          "필요한 행동, 정확한 명칭·숫자, 예/아니오 확인",
          "막연한 끄덕임 대신 상대가 가리키거나 입력하거나 결정을 반복하게 하세요."
        ]
      ]
    },
    {
      "id": "workflow-heading",
      "type": "heading",
      "level": 2,
      "text": "두 겹의 번역 키트를 준비하세요"
    },
    {
      "id": "workflow",
      "type": "list",
      "ordered": true,
      "items": [
        "출발 전 익숙한 도구만 설치하고, 지원된다면 간체 중국어와 출력 언어를 내려받은 뒤 인쇄된 중국어 예문으로 비행기 모드에서 시험하세요.",
        "호텔 주소, '입력해 주세요', 알레르기·식이 제한, '올바른 문을 보여 주세요', '시설에 전화해 주세요', 긴급 연락처의 여섯 카드를 저장하세요. 카드마다 요청은 하나뿐이어야 합니다.",
        "중국어 이름과 숫자를 번역문 옆에 그대로 남기고 기계 출력이 원문을 덮어쓰지 않게 하세요.",
        "카메라를 반듯하게 두고 반사를 피하며 글자가 읽히게 채운 뒤 주변 맥락을 보여 주는 넓은 사진을 하나 더 찍으세요.",
        "화면 번역 전에 원본을 캡처하세요. 오류, 주문 상태, 날짜·시간, 민감하지 않은 참조는 남기고 비밀번호·인증코드·결제정보는 가립니다.",
        "부정어, 알레르기 항목, 날짜, 단위, 출입구, 환불 조건이 빠지지 않았는지 확인하세요. 이 정보는 누락 시 결과가 큽니다.",
        "직원이나 두 번째 번역 경로로 행동을 확인하고 현장에서 실제로 통했던 중국어 문구를 저장하세요."
      ]
    },
    {
      "id": "confirmation-heading",
      "type": "heading",
      "level": 2,
      "text": "각 층의 한계를 구분하세요"
    },
    {
      "id": "confirmation-lanes",
      "type": "comparison",
      "title": "독립된 증거가 일치할 때 번역 신뢰도가 높아집니다",
      "columns": [
        {
          "heading": "기계 출력",
          "items": [
            "첫 이해에 유용",
            "배치·부정·현지 약어를 놓칠 수 있음",
            "법률·의료·알레르기 안전을 확정하지 못함"
          ]
        },
        {
          "heading": "원본 맥락",
          "items": [
            "화살표·가격·제목·선택 상태 보존",
            "직원이 정확한 원문을 볼 수 있음",
            "매끄럽지만 맥락 없는 번역을 견제"
          ]
        },
        {
          "heading": "사람의 확인",
          "items": [
            "문장을 실제 행동과 연결",
            "문·음식·선택지를 가리킬 수 있음",
            "결과가 중요하면 기록도 남겨야 함"
          ]
        }
      ]
    },
    {
      "id": "failure-heading",
      "type": "heading",
      "level": 2,
      "text": "번역이 이상할 때 입력부터 바꾸세요"
    },
    {
      "id": "failure-matrix",
      "type": "table",
      "caption": "같은 도구에 같은 자료를 반복해서 추측하게 하지 마세요",
      "columns": [
        "문제",
        "원인",
        "복구"
      ],
      "rows": [
        [
          "카메라가 메뉴 순서를 뒤섞음",
          "다단·세로쓰기·반사가 읽기 순서를 깨뜨림",
          "한 구역을 정면 촬영하고 음식명과 인접 옵션을 따로 번역하세요."
        ],
        [
          "버튼은 번역됐지만 선택 상태가 사라짐",
          "인터페이스를 일반 문장으로 처리",
          "손대지 않은 원본과 비교하고 직원에게 장바구니·예약 요약을 확인받으세요."
        ],
        [
          "음성 번역이 엉뚱한 단어를 만듦",
          "소음·억양·이름·겹친 발화",
          "짧은 입력문으로 바꾸고 핵심 명사나 숫자를 상대가 입력하게 하세요."
        ],
        [
          "오프라인에서 카메라·대화 기능이 없음",
          "언어팩·기기·현재 기능 지원 차이",
          "오프라인 텍스트와 저장 카드로 전환하고 유인 도움을 찾으세요."
        ]
      ]
    },
    {
      "id": "recovery-heading",
      "type": "heading",
      "level": 2,
      "text": "결과가 큰 오해를 복구하는 순서"
    },
    {
      "id": "recovery",
      "type": "list",
      "ordered": true,
      "items": [
        "되돌리기 어려운 단계 전에 거래, 식사, 이동, 양식 작성을 멈추세요.",
        "수정하지 않은 원본 사진이나 화면을 보여 주고 문제의 단어·줄·버튼·항목을 정확히 가리키세요.",
        "요청을 한 문장, 한 숫자 또는 한 선택으로 줄이고 관용구·농담·복합 조건을 피하세요.",
        "두 번째 번역기를 쓰거나 직원에게 중국어 답을 입력해 달라고 하되 충돌하는 두 결과의 중간값을 만들지 마세요.",
        "알레르기, 의료, 안전, 출입국, 승차권, 결제 결과가 달린 문제는 담당 직원에게 올리고 지배하는 공식 기록을 따르세요.",
        "확인된 중국어 문장과 결과를 저장하되 다른 사람의 개인정보는 남기지 마세요."
      ]
    },
    {
      "id": "scope-boundary",
      "type": "callout",
      "title": "번역이 보장하지 못하는 것",
      "body": "카메라·스크린샷·음성·오프라인 번역은 정확성, 가용성, 안전한 해석을 보장하지 않습니다. 지원 언어와 기기 기능은 바뀌고 오프라인 결과는 기능이 약할 수 있습니다. 이 안내는 알레르기 없는 음식, 의료 지시, 비자 상태, 계약, 환불권, 안전한 경로를 확정하지 않습니다. 실수의 결과가 크다면 중국어 원문과 책임 있는 담당자가 결정해야 합니다.",
      "tone": "warning"
    },
    {
      "id": "next-heading",
      "type": "heading",
      "level": 2,
      "text": "키트에 의존하기 전 확인"
    },
    {
      "id": "next-check",
      "type": "list",
      "items": [
        "입력·출력 언어를 비행기 모드에서 시험",
        "중국어 원문을 번역 옆에 보존",
        "맥락 전체와 읽기 쉬운 근접 사진 보유",
        "민감 화면은 공유 전에 가림",
        "한 가지 요청의 여섯 문장 카드를 저장",
        "두 번째 방법과 유인 도움 경로 확보",
        "중요한 의미는 끄덕임이 아닌 명시적 확인 필요"
      ]
    },
    {
      "id": "faq-heading",
      "type": "heading",
      "level": 2,
      "text": "자주 묻는 번역 질문"
    },
    {
      "id": "faq-1-question",
      "type": "heading",
      "level": 3,
      "text": "메뉴 전체를 한 번에 번역할까요?"
    },
    {
      "id": "faq-1-answer",
      "type": "paragraph",
      "text": "전체 사진으로 배치를 파악한 뒤 주문할 음식 줄과 주변 옵션을 따로 번역하세요. 전체 페이지 오버레이는 열 순서를 바꾸거나 가격을 다른 음식에 붙일 수 있습니다."
    },
    {
      "id": "faq-2-question",
      "type": "heading",
      "level": 3,
      "text": "언어를 내려받으면 카메라 기능도 전부 오프라인인가요?"
    },
    {
      "id": "faq-2-answer",
      "type": "paragraph",
      "text": "항상 그렇지는 않습니다. 도구, 언어, 기기, 버전에 따라 달라지므로 출발 전에 비행기 모드에서 카메라·스크린샷·입력·대화를 각각 시험하세요."
    },
    {
      "id": "faq-3-question",
      "type": "heading",
      "level": 3,
      "text": "번역한 알레르기 카드면 충분한가요?"
    },
    {
      "id": "faq-3-answer",
      "type": "paragraph",
      "text": "대화를 시작할 수 있지만 재료, 조리, 교차 접촉을 보장하지 못합니다. 특정 음식에 대해 직원의 확인을 받고 불확실하면 주문하지 마세요."
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "번역을 실제 여행 과업과 연결하세요",
      "items": [
        {
          "label": "잘못된 지도 핀 진단",
          "href": "/ko/guides/china-map-coordinate-offset-explained/",
          "description": "번역된 장소명을 검증 주소와 연결합니다."
        },
        {
          "label": "데이터 연결 준비",
          "href": "/ko/guides/china-esim-vs-local-sim/",
          "description": "어떤 번역 기능이 네트워크를 요구하는지 확인합니다."
        },
        {
          "label": "공공 Wi-Fi 안전하게 사용",
          "href": "/ko/guides/china-public-wifi-passport-login/",
          "description": "민감한 화면은 신뢰할 수 있는 경로로만 보냅니다."
        },
        {
          "label": "첫 중국식 공동 식사 익히기",
          "href": "/ko/guides/first-shared-meal-in-china/",
          "description": "메뉴 번역을 주문·식사 속도·공유 방식과 연결합니다."
        },
        {
          "label": "공식 티켓 채널 확인",
          "href": "/ko/guides/official-or-reseller-china-tickets/",
          "description": "매끄러운 번역이 비공식 화면을 권위로 바꾸게 두지 마세요."
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "공식 번역·외국인 서비스 출처",
      "items": [
        {
          "label": "iPhone에서 텍스트·음성·대화 번역",
          "url": "https://support.apple.com/guide/iphone/translate-text-voice-and-conversations-iphd74cb450f/ios",
          "publisher": "Apple 지원",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "iPhone 앱·사진 속 텍스트 번역",
          "url": "https://support.apple.com/en-gb/guide/iphone/iphab4dcff1d/ios",
          "publisher": "Apple 지원",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "오프라인 사용을 위한 언어 다운로드",
          "url": "https://support.google.com/translate/answer/6142473?hl=en-GB-0",
          "publisher": "Google 번역 도움말",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "중국의 외국인 디지털 관광·번역 서비스 개선",
          "url": "https://english.www.gov.cn/news/202602/05/content_WS69849d8ac6d00ca5f9a08eff.html",
          "publisher": "중국 국무원",
          "reviewedAt": "2026-08-22"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
