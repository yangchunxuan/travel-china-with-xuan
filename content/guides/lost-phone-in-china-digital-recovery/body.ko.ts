import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "answer-first",
      "type": "lead",
      "text": "선택지를 보존하는 순서로 움직이세요. 기기를 찾고 잠근 뒤 전화번호와 기본 계정, 결제수단을 보호하고 여행 접근을 복구합니다. 원격 삭제는 데이터를 지키지만 추적을 끝내거나 회수를 어렵게 할 수 있어 자동 첫 단계가 아닙니다."
    },
    {
      "id": "decision-map",
      "type": "table",
      "caption": "위험별 첫 행동",
      "columns": [
        "상황",
        "경로",
        "행동"
      ],
      "rows": [
        [
          "근처에 있을 가능성",
          "신뢰 기기에서 소리·위치 확인",
          "도난 의심자를 직접 만나지 않기."
        ],
        [
          "잠금이 없거나 이동 중",
          "즉시 분실 표시·기기 보호",
          "호텔 방이나 여권 정보 없이 안전 연락처만 표시."
        ],
        [
          "도난·신변 위험",
          "110 신고와 경찰 기록",
          "기기 식별자와 증거 제공, 추적 금지."
        ],
        [
          "회수 가능성 낮음",
          "SIM 중지, 계정 보호, 삭제 검토",
          "삭제가 추적을 중단할 수 있음을 이해."
        ]
      ]
    },
    {
      "id": "detail-heading",
      "type": "heading",
      "level": 2,
      "text": "복구 열쇠부터 보호하세요"
    },
    {
      "id": "detail-list",
      "type": "list",
      "items": [
        "신뢰할 기기와 공식 도메인에서 Apple Find My 또는 Google Find Hub를 사용합니다. 찾았다는 메시지는 계정 암호를 노리는 피싱일 수 있습니다.",
        "침해 가능성이 있으면 기본 계정 암호를 바꾸되 기기가 계정과 활성화 보호에 남도록 플랫폼 안내를 따릅니다.",
        "통신사에 SIM/eSIM 중지를 요청하되 은행·지갑·예약이 번호에 의존할 수 있으므로 영구 해지 대신 번호 재발급을 묻습니다.",
        "공식 경로로 카드사와 결제 앱에 연락해 위험에 따라 동결·모니터링하고 최근 거래를 봅니다.",
        "이메일·인쇄물·동행 기기에서 항공·철도·호텔·보험 정보를 정리합니다."
      ]
    },
    {
      "id": "steps-heading",
      "type": "heading",
      "level": 2,
      "text": "최소 여행용 휴대전화를 복구"
    },
    {
      "id": "steps",
      "type": "list",
      "ordered": true,
      "items": [
        "신뢰할 예비 기기에 교통·숙소·연락에 필요한 계정만 복원합니다.",
        "저장한 백업 코드나 보안키를 사용하고 낯선 사람에게 코드를 받아 달라고 하지 않습니다.",
        "가능하면 통신사에서 같은 번호를 재발급받고 SMS와 계정 복구를 시험합니다.",
        "호텔과 운송사에 안전 연락처 변경을 알립니다.",
        "경찰 기록, 일련번호/IMEI, 구매 증명과 보험 지침을 모읍니다."
      ]
    },
    {
      "id": "failure-backup",
      "type": "callout",
      "title": "2단계 인증이 분실폰에만 있다면",
      "body": "공식 계정 복구, 백업 코드, 신뢰 기기 또는 보안키를 사용하세요. 지원팀 지시 없이 새 신원을 만들어 기존 구매·예약을 끊지 마세요. 동행자나 호텔에는 인터넷만 부탁하고 계정 통제권은 넘기지 않습니다.",
      "tone": "warning"
    },
    {
      "id": "scope-boundary",
      "type": "callout",
      "title": "적용 범위와 최신 규정",
      "body": "원격 위치·삭제는 배터리, 연결, 사전 설정과 플랫폼 상태에 달렸고 Apple과 Google은 항상 실시간 위치를 보장하지 않습니다. 경찰은 도난을, 플랫폼과 통신사는 계정·회선을 담당합니다. 삭제는 되돌릴 수 없습니다.",
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
          "description": "대체 연결을 선택하세요."
        },
        {
          "label": "중국 결제",
          "href": "/ko/guides/how-to-pay-in-china-as-a-tourist/",
          "description": "백업으로 결제를 복구하세요."
        },
        {
          "label": "중국 예약의 여권 이름",
          "href": "/ko/guides/passport-name-across-china-bookings/",
          "description": "교통 기록을 정확히 재구성하세요."
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "검토한 공식 출처",
      "items": [
        {
          "label": "Find, secure or erase a lost Android device",
          "url": "https://support.google.com/android/answer/6160491?hl=en",
          "publisher": "Google Support",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Prepare Android for a lost device",
          "url": "https://support.google.com/android/answer/3265955?hl=en-en",
          "publisher": "Google Support",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "If your iPhone or iPad is lost or stolen",
          "url": "https://support.apple.com/en-us/101593",
          "publisher": "Apple Support",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Stolen device protection and account safety",
          "url": "https://support.apple.com/en-la/120837",
          "publisher": "Apple Support",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "China emergency numbers",
          "url": "https://english.www.gov.cn/2025special/bizexpatsinchina2025",
          "publisher": "State Council of China",
          "reviewedAt": "2026-08-12"
        }
      ]
    }
  ]
};

export default body;
