import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "answer-first",
      "type": "lead",
      "text": "중국 공공 Wi-Fi에 전국 공통 로그인은 없습니다. 일부 주요 공항은 여권 키오스크나 스캔 접속을 안내하지만 다른 네트워크는 SMS, 객실 정보 또는 직원 코드를 씁니다. Wi-Fi를 장소 서비스로 보고 유일한 연결로 의존하지 마세요."
    },
    {
      "id": "decision-map",
      "type": "table",
      "caption": "장소의 로그인 방식에 맞추세요",
      "columns": [
        "상황",
        "경로",
        "행동"
      ],
      "rows": [
        [
          "여권 키오스크·스캐너 공항",
          "공식 단말 또는 포털",
          "여권은 손에 두고 공항 표지에서 네트워크 이름 확인."
        ],
        [
          "호텔",
          "프런트에 공식 SSID와 로그인 문의",
          "객실번호·성·코드가 필요할 수 있음."
        ],
        [
          "SMS 요구 장소",
          "포털이 받는 번호 사용",
          "외국 번호 지원을 가정하지 않기."
        ],
        [
          "로그인 불가",
          "eSIM·현지 SIM·로밍·포켓 Wi-Fi",
          "확인되지 않은 유사 포털에 여권 정보 입력 금지."
        ]
      ]
    },
    {
      "id": "detail-heading",
      "type": "heading",
      "level": 2,
      "text": "여권 로그인은 장소별 서비스입니다"
    },
    {
      "id": "detail-list",
      "type": "list",
      "items": [
        "베이징 수도·다싱 공항과 상하이 푸둥 공항은 각각 여권 Wi-Fi 절차를 공개했습니다. 모든 공항·역·카페가 같다는 뜻은 아닙니다.",
        "키오스크가 여행문서를 스캔한 뒤 자격정보를 표시하거나 출력할 수 있습니다. 여권을 가리고 출력물을 회수하세요.",
        "공식 표지나 직원에게 SSID를 확인합니다. 그럴듯한 이름도 가짜 핫스팟일 수 있습니다.",
        "공공 Wi-Fi는 신뢰하지 않는 네트워크로 취급해 HTTPS를 쓰고 민감한 계정 변경, 파일 공유를 피하며 사용 후 삭제하세요."
      ]
    },
    {
      "id": "steps-heading",
      "type": "heading",
      "level": 2,
      "text": "안전한 연결 순서"
    },
    {
      "id": "steps",
      "type": "list",
      "ordered": true,
      "items": [
        "자동 연결을 끄고 공식 표지나 직원에게 정확한 네트워크 이름을 묻습니다.",
        "공식 캡티브 포털을 열고 키오스크가 있으면 SMS를 반복하기 전에 그 절차를 씁니다.",
        "요청하는 신원정보를 읽고 도메인·인증서·화면이 이상하면 중단합니다.",
        "저위험 필수 업무만 처리하고 은행·비밀번호 복구·신분증 업로드는 개인 데이터로 전환합니다.",
        "사용 후 네트워크를 지우고 의도하지 않은 프로필을 삭제합니다."
      ]
    },
    {
      "id": "failure-backup",
      "type": "callout",
      "title": "포털이 반복되거나 여권을 거부하면",
      "body": "확인되지 않은 페이지에 여러 문서 형식을 반복 입력하지 마세요. 공항·호텔 안내데스크에 외국 여권 단말, 수동 코드나 서비스 창구를 묻고 없으면 독립 데이터로 전환합니다. 오류 화면을 보낼 때 여권번호를 가리세요.",
      "tone": "warning"
    },
    {
      "id": "scope-boundary",
      "type": "callout",
      "title": "적용 범위와 최신 규정",
      "body": "여권 Wi-Fi와 절차는 장소별이며 변할 수 있습니다. 인용한 공식 공항 페이지는 2026년 8월 12일 검토된 특정 서비스를 뒷받침할 뿐, 커버리지·속도·서비스 접근 또는 모든 문서 수용을 보장하지 않습니다.",
      "tone": "neutral"
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "계속 계획하기",
      "items": [
        {
          "label": "중국 eSIM 또는 현지 SIM",
          "href": "/ko/guides/china-esim-vs-local-sim/",
          "description": "독립 데이터 백업을 만드세요."
        },
        {
          "label": "중국 결제",
          "href": "/ko/guides/how-to-pay-in-china-as-a-tourist/",
          "description": "공공 Wi-Fi를 결제 전제로 삼지 마세요."
        },
        {
          "label": "첫 중국 고속철도",
          "href": "/ko/guides/china-high-speed-train-first-time-guide/",
          "description": "역에 가기 전 표와 안내를 내려받으세요."
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "검토한 공식 출처",
      "items": [
        {
          "label": "Beijing airports connectivity guide",
          "url": "https://english.beijing.gov.cn/latest/specials/essentialtipsfornewarrivals/getconnected/202408/t20240830_3785643.html",
          "publisher": "Beijing Municipal Government",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Beijing Capital Airport Wi-Fi",
          "url": "https://english.beijing.gov.cn/specials/beijingservice/pek/wifi/",
          "publisher": "Beijing Municipal Government",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Daxing Airport passport Wi-Fi service",
          "url": "https://english.beijing.gov.cn/latest/news/202512/t20251205_4322494.html",
          "publisher": "Beijing Municipal Government",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Pudong Airport passport Wi-Fi update",
          "url": "https://english.shanghai.gov.cn/en-Latest-WhatsNew/20260424/88cde5e96ef242daa534102069450a03.html",
          "publisher": "Shanghai Municipal Government",
          "reviewedAt": "2026-08-12"
        }
      ]
    }
  ]
};

export default body;
