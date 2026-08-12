import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "answer-first",
      "type": "lead",
      "text": "휴대전화가 해야 할 일부터 정하세요. 여행 eSIM은 데이터만 필요할 때 간단할 수 있고, 중국 본토 SIM은 본토 번호를 제공합니다. 듀얼 SIM은 기존 번호를 유지하면서 한 회선을 더할 수 있습니다. 기기 지원, 개통 절차와 네트워크 동작은 제품별로 다르므로 결제 전 최신 조건을 확인해야 합니다."
    },
    {
      "id": "decision-map",
      "type": "table",
      "caption": "네 가지 필요 중 하나에서 시작하세요",
      "columns": [
        "상황",
        "경로",
        "행동"
      ],
      "rows": [
        [
          "데이터만 필요",
          "여행 eSIM 또는 자국 통신사 로밍",
          "출국 전 설치하고 구매 QR을 오프라인 저장."
        ],
        [
          "중국 본토 번호 필요",
          "통신사 영업점의 현지 SIM",
          "여권 원본과 실명 등록 필요."
        ],
        [
          "둘 다 필요",
          "기존 회선 + 데이터 eSIM 또는 현지 SIM",
          "정확한 모델·지역판·동시 활성 회선 수 확인."
        ],
        [
          "휴대전화가 비호환 또는 잠금",
          "언락 예비폰, 포켓 Wi-Fi 또는 로밍",
          "잠금과 주파수 지원을 확인한 뒤 구매."
        ]
      ]
    },
    {
      "id": "detail-heading",
      "type": "heading",
      "level": 2,
      "text": "각 선택지가 실제로 주는 것"
    },
    {
      "id": "detail-list",
      "type": "list",
      "items": [
        "여행 eSIM은 데이터 전용인 경우가 많아 +86 본토 번호, 일반 통화 또는 SMS를 제공하지 않을 수 있습니다. eSIM이라는 이름만으로 기능을 추정하지 마세요.",
        "본토 통신사 SIM은 보통 현지 번호를 주며 실명 등록이 필요합니다. 베이징시 안내는 여권 원본을 들고 차이나모바일·차이나유니콤·차이나텔레콤 영업점을 방문하라고 설명합니다.",
        "현지 번호는 본토 SMS를 요구하는 시설·배송·계정에서 유용할 수 있지만 모든 여행자 업무에 필수는 아닙니다. 공식 결제 안내는 주요 결제 앱에 외국 또는 중국 번호를 등록할 수 있다고 설명합니다.",
        "듀얼 SIM 표시는 아무 두 회선이나 동시에 쓸 수 있다는 뜻이 아닙니다. 정확한 모델 번호와 판매 지역판, 통신사 잠금 여부를 확인하세요."
      ]
    },
    {
      "id": "steps-heading",
      "type": "heading",
      "level": 2,
      "text": "한 회선에만 의존하지 않는 설정"
    },
    {
      "id": "steps",
      "type": "list",
      "ordered": true,
      "items": [
        "출국 전 마케팅 이름이 아닌 모델 번호로 eSIM, 물리 SIM, 동시 활성 회선과 통신사 잠금을 확인합니다.",
        "여행 eSIM은 안정적인 Wi-Fi에서 설치하되 활성화 시점은 공급자 지침을 따릅니다. QR, 주문번호, 지원 경로를 오프라인 저장합니다.",
        "현지 SIM은 공식 통신사 영업점에서 여권 원본으로 개통하고 번호, 만료, 충전과 해지 조건을 적어 달라고 합니다.",
        "은행이나 계정 코드를 받는 기존 번호는 유지하되, 통신사 조건에 따라 비싼 데이터 로밍은 끕니다.",
        "데이터·통화·SMS를 각각 테스트합니다. 웹 접속이 된다고 음성, +86 번호 또는 인증문자가 보장되지는 않습니다."
      ]
    },
    {
      "id": "failure-backup",
      "type": "callout",
      "title": "첫 계획이 실패하면",
      "body": "eSIM 메뉴가 없으면 정확한 기기 모델, 판매 지역과 잠금 상태를 다시 확인한 뒤 물리 SIM, 로밍, 포켓 Wi-Fi 또는 호환 예비폰으로 바꾸세요. 현지 SIM 개통 실패는 공식 영업점에서 여권 입력을 확인합니다. 데이터는 되지만 특정 앱이 안 되면 앱 또는 라우팅 문제로 따로 진단해야 하며 모든 eSIM이나 현지 SIM의 공통 결과로 일반화하지 마세요.",
      "tone": "warning"
    },
    {
      "id": "scope-boundary",
      "type": "callout",
      "title": "적용 범위와 최신 규정",
      "body": "2026년 8월 12일 검토 기준, 중국 본토 통신사 eSIM은 기기와 통신사별입니다. Apple은 특정 본토판 iPhone만 본토 통신사 eSIM 대상으로 안내하며 해외 구매 iPhone에는 해당 프로필을 설치할 수 없다고 설명합니다. 이는 여행 eSIM이나 모든 Android 기기의 보편 규칙이 아닙니다. 정확한 모델과 상품의 공식 페이지를 확인하세요.",
      "tone": "neutral"
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "계속 계획하기",
      "items": [
        {
          "label": "중국 결제 준비",
          "href": "/ko/guides/how-to-pay-in-china-as-a-tourist/",
          "description": "전화번호 등록과 결제 수단은 별도 결정입니다."
        },
        {
          "label": "입국 요건 확인",
          "href": "/guides/china-entry-requirements/",
          "description": "여권과 도착 서류를 준비하세요."
        },
        {
          "label": "첫 중국 고속철도",
          "href": "/ko/guides/china-high-speed-train-first-time-guide/",
          "description": "역에 가기 전 필요한 도구를 확인하세요."
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "검토한 공식 출처",
      "items": [
        {
          "label": "MIIT real-name registration rules (2026 republication)",
          "url": "https://sdca.miit.gov.cn/zwgk/fgbz/art/2026/art_9b270ddb59cc4643b0a9c6811c4e750d.html",
          "publisher": "Ministry of Industry and Information Technology",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Purchasing SIM cards in Beijing",
          "url": "https://english.beijing.gov.cn/quickguideservices/purchasingsimcards/",
          "publisher": "Beijing Municipal Government",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Using eSIM while traveling in China mainland",
          "url": "https://support.apple.com/en-us/118227",
          "publisher": "Apple Support",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "China mainland carrier eSIM on iPhone",
          "url": "https://support.apple.com/en-mide/123879",
          "publisher": "Apple Support",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Foreign and Chinese phone numbers for mobile payment registration",
          "url": "https://nsd.mofcom.gov.cn/tzyts/art/2024/art_a08888d0b9da42f083b00223edaf1de7.html",
          "publisher": "Ministry of Commerce",
          "reviewedAt": "2026-08-12"
        }
      ]
    }
  ]
};

export default body;
