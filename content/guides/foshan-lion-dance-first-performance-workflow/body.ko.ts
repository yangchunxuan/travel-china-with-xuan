import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "lead",
      "type": "lead",
      "text": "포산의 유명 장소에 간다고 공연이 보장되지는 않습니다. 프로그램은 바뀌고 야외 공연은 조건에 좌우되며 고주는 여러 형식 중 하나입니다."
    },
    {
      "id": "answer",
      "type": "callout",
      "title": "도시를 건너가기 전에 확인",
      "body": "공식 채널에서 장소, 날짜, 회차, 입장, 날씨 대책을 확인합니다. 예전 영상은 과거 공연의 증거일 뿐입니다.",
      "tone": "decision"
    },
    {
      "id": "matrix",
      "type": "table",
      "caption": "도시를 건너가기 전에 확인",
      "columns": [
        "확인",
        "이유",
        "대안"
      ],
      "rows": [
        [
          "장소",
          "조묘·기념관·훈련장은 다름",
          "공식 안내소 문의"
        ],
        [
          "형식",
          "지상·행진·고주는 공간이 다름",
          "변경 수용"
        ],
        [
          "날씨",
          "비와 바람이 장비에 영향",
          "박물관 대안"
        ],
        [
          "시야",
          "앞줄이 전체를 가릴 수 있음",
          "연기자와 악대를 함께 보기"
        ]
      ]
    },
    {
      "id": "workflow",
      "type": "list",
      "ordered": true,
      "items": [
        "머리와 뒤 연기자를 찾습니다.",
        "눈·입·머리 움직임을 봅니다.",
        "북·징 신호와 멈춤·착지를 연결합니다.",
        "고주에서 거리와 체중 이동을 봅니다.",
        "안전선 밖에 머뭅니다."
      ]
    },
    {
      "id": "warning",
      "type": "callout",
      "title": "고주는 관람객 체험이 아닙니다",
      "body": "높이, 간격, 안전은 훈련팀의 영역이며 이 글은 관람법입니다.",
      "tone": "warning"
    },
    {
      "id": "help",
      "type": "callout",
      "title": "Homeground",
      "body": "날짜와 장소를 보내면 현지 담당자가 현재 운영·전시·프로그램을 확인합니다.",
      "tone": "decision"
    },
    {
      "id": "links",
      "type": "internal-links",
      "title": "여행 이어가기",
      "items": [
        {
          "label": "광저우 아침 차 이해",
          "href": "/ko/guides/how-guangzhou-morning-tea-works/"
        },
        {
          "label": "병마용 자유 관람",
          "href": "/ko/guides/terracotta-warriors-without-tour/"
        },
        {
          "label": "중국 여행에 가이드가 필요할까",
          "href": "/ko/guides/do-you-need-a-tour-guide-in-china/"
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "기관 자료와 이미지 크레디트",
      "items": [
        {
          "label": "Lion dance (Guangdong awakening lion)",
          "url": "https://www.ihchina.cn/project_details/12870",
          "publisher": "China Intangible Cultural Heritage",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Foshan Ancestral Temple Museum",
          "url": "https://www.fszumiao.cn/",
          "publisher": "Foshan Ancestral Temple Museum",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Hero: Foshan lion-dance show by Lukwo RuoShuma Simonz, CC BY-SA 4.0; cropped",
          "url": "https://commons.wikimedia.org/wiki/File:GD_%E5%BB%A3%E6%9D%B1_Guangdong_FS_%E4%BD%9B%E5%B1%B1_Foshan_%E5%8D%97%E6%B5%B7%E5%8D%80_Nanhai_%E8%A5%BF%E6%A8%B5%E5%B1%B1_Xiqiao_Mountain_%E9%BB%83%E9%A3%9B%E9%B4%BB%E7%8D%85%E8%97%9D%E6%AD%A6%E8%A1%93%E9%A4%A8_Wong_Fei-hong_Lion_Dance_%26_Martial_Arts_School_%E6%93%8D%E5%A0%B4_playground_square_red_%E8%A1%A8%E6%BC%94_show_time_June_2023_Px3_26.jpg",
          "publisher": "Wikimedia Commons",
          "reviewedAt": "2026-08-12"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;
export default body;

