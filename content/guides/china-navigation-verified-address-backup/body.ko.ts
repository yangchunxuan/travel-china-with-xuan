import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "answer-first",
      "type": "lead",
      "text": "모든 여행자와 기기, 중국 도시에서 늘 이기는 지도 앱은 없습니다. 휴대전화에서 안정적으로 작동하는 앱을 작업 지도처럼 쓰되 목적지는 앱과 분리해 두세요. 공식 중국어 명칭, 도시와 구, 전체 주소, 지점·터미널, 실제 출입구, 공개 전화번호, 인근 기준점을 저장한 뒤 사용할 지도 안에서 다시 검색하고 텍스트를 오프라인으로 보관합니다. 링크가 깨지거나 앱이 바뀌고 현재 위치 점이 흔들려도 검증 주소는 남습니다."
    },
    {
      "id": "quick-answer",
      "type": "callout",
      "title": "앱보다 목적지를 먼저 확정하세요",
      "body": "중국에서 설정된 iPhone이라면 Apple 지도가 편리한 화면이 될 수 있고, Apple은 중국 지도 서비스에 Amap을 사용한다고 밝힙니다. Amap과 바이두 지도도 상세한 현지 장소 정보를 제공할 수 있지만 앱 이름만으로 특정 검색 결과가 올바른 지점이나 열린 문임이 보장되지는 않습니다. 장소 정체성을 먼저 확인하고 같은 날 쓸 두 번째 경로나 직원이 있는 기준점을 준비하세요. 이 글은 순위표가 아니라 검증 절차입니다.",
      "tone": "decision"
    },
    {
      "id": "matrix-heading",
      "type": "heading",
      "level": 2,
      "text": "확인 매트릭스로 출발 여부를 결정하세요"
    },
    {
      "id": "decision-matrix",
      "type": "table",
      "caption": "가장 약한 항목이 지금 출발해도 되는지를 정합니다",
      "columns": [
        "현재 자료",
        "확인 가능한 것",
        "남은 공백",
        "결정"
      ],
      "rows": [
        [
          "영문 호텔·명소명",
          "브랜드나 대략적인 장소",
          "중국어 지점명, 구, 번지와 출입구",
          "아직 출발하지 말고 중국어 목적지 카드를 만드세요."
        ],
        [
          "다른 앱에서 공유된 핀",
          "보낸 사람이 한 시점에 선택한 점",
          "받는 앱의 해석과 현재 열린 문",
          "함께 온 중국어 텍스트를 자기 앱에서 다시 검색하세요."
        ],
        [
          "중국어 명칭과 전체 주소",
          "도로·건물 수준의 장소 정체성",
          "교통수단이나 입장권에 맞는 문",
          "시설에 실제 출입구를 확인하세요."
        ],
        [
          "두 출처에서 주소·지점·문·전화가 일치",
          "방어 가능한 목적지 확인",
          "실시간 통제, 승차 제한과 기기 위치",
          "오프라인 화면과 대체 기준점을 갖고 출발하세요."
        ]
      ]
    },
    {
      "id": "workflow-heading",
      "type": "heading",
      "level": 2,
      "text": "Wi-Fi를 떠나기 전에 목적지 카드를 만드세요"
    },
    {
      "id": "workflow",
      "type": "list",
      "ordered": true,
      "items": [
        "시설 공식 웹사이트·공식 계정·발급된 예약·직접 메시지에서 중국어 명칭을 그대로 복사하세요. 지점, 동, 터미널, 출입구 접미사도 포함합니다.",
        "도시와 구를 따로 적으세요. 같은 이름의 호텔, 병원, 역, 식당이 다른 구나 다른 도시에 있을 수 있습니다.",
        "전체 중국어 도로 주소와 공개 전화번호를 저장하세요. 여권번호, 예약번호, 객실번호, 결제 화면은 목적지 카드에 넣지 않습니다.",
        "도착 시간에 운영하는 보행자 출입구, 차량 게이트, 승차 지점을 물으세요. 부지 중심점이 통행 가능한 문이라는 뜻은 아닙니다.",
        "실제로 사용할 지도에서 중국어 텍스트를 검색하고 업종, 구, 주소, 전화가 맞을 때만 결과를 선택하세요.",
        "두 번째 현지 지도나 시설이 보낸 동일 앱 링크로 교차 확인하세요. 좌표가 비슷해 보이는 것보다 장소 정보의 일치가 중요합니다.",
        "텍스트, 개인정보를 가린 화면, 시설 연락처, 직원이 있는 인근 기준점을 오프라인 저장하고 이동 당일 문을 다시 확인하세요."
      ]
    },
    {
      "id": "confirmation-heading",
      "type": "heading",
      "level": 2,
      "text": "세 가지 증거를 섞지 마세요"
    },
    {
      "id": "confirmation-lanes",
      "type": "comparison",
      "title": "장소·출입구·실시간 위치가 모두 맞아야 합니다",
      "columns": [
        {
          "heading": "장소 정체성",
          "items": [
            "공식 중국어 명칭과 지점",
            "도시·구·도로·건물",
            "공개 전화 또는 공식 연락 수단"
          ]
        },
        {
          "heading": "운영 출입구",
          "items": [
            "지정 문·터미널·층·승차 구역",
            "해당 시간의 입장권·차량 규칙",
            "직원에게 물을 수 있는 눈에 띄는 기준점"
          ]
        },
        {
          "heading": "실시간 내비게이션",
          "items": [
            "현재 경로와 도로 상태",
            "기기 권한과 신호",
            "두 번째 경로나 유인 대안"
          ]
        }
      ]
    },
    {
      "id": "failure-heading",
      "type": "heading",
      "level": 2,
      "text": "보이는 증상부터 진단하세요"
    },
    {
      "id": "failure-matrix",
      "type": "table",
      "caption": "장소가 틀렸을 수 있는데 좌표 보정값을 만들지 마세요",
      "columns": [
        "증상",
        "가능한 원인",
        "안전한 복구"
      ],
      "rows": [
        [
          "두 앱이 같은 링크를 대형 시설의 반대편에 표시",
          "부지 중심과 출입구 차이 또는 앱 간 전달 문제",
          "지정 출입구를 각각 검색하고 시설에 확인하세요."
        ],
        [
          "경로가 다른 구로 향함",
          "동명 다른 지점 선택",
          "안전하게 멈춰 구와 전화를 비교하고 중국어 텍스트로 목적지를 다시 만드세요."
        ],
        [
          "목적지는 맞지만 현재 위치 점이 불안정함",
          "실내 신호나 위치 권한 문제",
          "표지판을 따라 열린 기준점으로 가서 위치를 다시 잡고 목적지 핀은 옮기지 마세요."
        ],
        [
          "예정했던 문이 닫힘",
          "핀 저장 뒤 운영 접근 변경",
          "당일 공지나 직원이 있는 정문을 따르고 모든 공유 기록을 고치세요."
        ]
      ]
    },
    {
      "id": "recovery-heading",
      "type": "heading",
      "level": 2,
      "text": "하나의 잘못된 핀이 여러 사람에게 번지지 않게 복구하세요"
    },
    {
      "id": "recovery",
      "type": "list",
      "ordered": true,
      "items": [
        "안전한 공공장소에 멈추고 핀에 닿으려고 차단물, 자동차 전용도로, 공사 구역, 사유 진입로를 넘지 마세요.",
        "중국어 명칭, 구, 지점을 직원에게 보여 주거나 읽어 주세요.",
        "운전자나 여행자가 쓰는 같은 지도 앱으로 현재 출입구 링크를 보내 달라고 시설에 요청하세요.",
        "차량이 움직이고 있다면 목적지를 고치기 전에 합법적으로 정차하도록 요청하세요.",
        "휴대전화나 데이터가 끊기면 저장해 둔 유인 기준점으로 가서 현장 도움으로 마지막 구간을 해결하세요.",
        "도착 후 모든 동행자의 공유 메모에서 실패한 핀을 바꿔 같은 오류를 막으세요."
      ]
    },
    {
      "id": "scope-boundary",
      "type": "callout",
      "title": "이 안내가 보장하지 않는 것",
      "body": "Amap, Apple 지도, 바이두 지도가 특정 기기와 날짜에 모두 이용 가능하거나 같은 번역·최신성·정확도를 제공한다고 보장하지 않습니다. 앱 순위를 매기거나 좌표 변환법, 지도 규정 우회를 가르치지도 않습니다. 도로, POI, 출입구와 기능은 바뀌므로 시설의 최신 공식 주소와 현장 직원 확인이 우선이며 지도 때문에 통제·위험 구역에 들어가서는 안 됩니다.",
      "tone": "warning"
    },
    {
      "id": "next-heading",
      "type": "heading",
      "level": 2,
      "text": "출발 직전 확인"
    },
    {
      "id": "next-check",
      "type": "list",
      "items": [
        "중국어 명칭과 지점이 최신 공식 자료에서 옴",
        "도시·구·도로·건물·공개 전화가 일치",
        "도착 시간의 보행·차량 출입구 확인",
        "실제로 사용할 지도에서 다시 검색",
        "두 번째 출처나 시설이 장소를 확인",
        "텍스트·화면·유인 대체 기준점을 오프라인 저장",
        "공유 카드에 개인정보 없음"
      ]
    },
    {
      "id": "faq-heading",
      "type": "heading",
      "level": 2,
      "text": "자주 묻는 내비게이션 질문"
    },
    {
      "id": "faq-1-question",
      "type": "heading",
      "level": 3,
      "text": "Amap이 Apple 지도나 바이두 지도보다 항상 낫나요?"
    },
    {
      "id": "faq-1-answer",
      "type": "paragraph",
      "text": "아닙니다. 기기 지원, 언어, 도시 데이터와 사용 방식이 다릅니다. 검증된 중국어 주소와 출입구를 확인할 수 있고 오프라인 백업이 있는 앱이 실용적인 선택입니다."
    },
    {
      "id": "faq-2-question",
      "type": "heading",
      "level": 3,
      "text": "앱 사이에 좌표를 복사해도 되나요?"
    },
    {
      "id": "faq-2-answer",
      "type": "paragraph",
      "text": "좌표를 주된 전달 수단으로 삼지 마세요. 중국어 장소 필드를 복사해 받는 앱에서 다시 검색해야 지점과 출입구를 확인할 수 있습니다."
    },
    {
      "id": "faq-3-question",
      "type": "heading",
      "level": 3,
      "text": "택시 기사에게 무엇을 보여 주나요?"
    },
    {
      "id": "faq-3-answer",
      "type": "paragraph",
      "text": "중국어 목적지 카드와 기사 지도 안의 검색 결과를 보여 주세요. 구, 지점, 출입구를 짚고 시설 공개 전화번호도 준비합니다."
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "도착 시스템의 다른 부분도 연결하세요",
      "items": [
        {
          "label": "중국 지도 위치 차이 이해",
          "href": "/ko/guides/china-map-coordinate-offset-explained/",
          "description": "임의 보정값 없이 앱 간 핀 차이를 진단합니다."
        },
        {
          "label": "eSIM과 현지 SIM 선택",
          "href": "/ko/guides/china-esim-vs-local-sim/",
          "description": "검증한 데이터 연결과 무데이터 대안을 준비합니다."
        },
        {
          "label": "올바른 지하철역 근처 호텔 선택",
          "href": "/ko/guides/china-hotel-near-metro/",
          "description": "정확한 역 출구와 호텔 입구를 함께 확인합니다."
        },
        {
          "label": "전용 차량과 대중교통 비교",
          "href": "/ko/guides/china-private-transfer-or-public-transport/",
          "description": "승차 지점과 마지막 문을 확인한 뒤 교통수단을 고릅니다."
        },
        {
          "label": "중국에서 휴대전화를 잃었을 때 복구",
          "href": "/ko/guides/lost-phone-in-china-digital-recovery/",
          "description": "주 기기를 잃어도 주소를 찾을 수 있게 합니다."
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "공식 지도·주소 출처",
      "items": [
        {
          "label": "외국인 방문객용 디지털 지도 서비스",
          "url": "https://english.shanghai.gov.cn/en-EasyShanghai/20260713/379bcea6e1bd4defaa7db2451d68d3dd.html",
          "publisher": "상하이시 정부",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "Apple 지도 및 개인정보 보호—중국 지도 서비스",
          "url": "https://www.apple.com/legal/privacy/data/en/apple-maps/",
          "publisher": "Apple",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "지오코딩과 역지오코딩",
          "url": "https://lbs.amap.com/api/webservice/guide/api/georegeo/",
          "publisher": "Amap 오픈 플랫폼",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "장소 검색 3.0",
          "url": "https://lbsyun.baidu.com/docs/webapi?title=placev3%2Fguide%2Fwebservice-placeapiV3%2FinterfaceDocumentV3",
          "publisher": "바이두 지도 오픈 플랫폼",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "GB/T 39609-2020 주소 지오코드 규칙",
          "url": "https://std.samr.gov.cn/gb/search/gbDetailed?id=TFB%2FwAU5XAs%3D&mode=p",
          "publisher": "중국 국가표준 정보 공공서비스 플랫폼",
          "reviewedAt": "2026-08-22"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
