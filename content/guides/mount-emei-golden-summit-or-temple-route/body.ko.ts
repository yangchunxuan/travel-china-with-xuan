import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body = { schemaVersion: "1.0.0", blocks: [
  { id: "lead", type: "lead", text: "어메이산에는 고도와 시간이 멀리 떨어진 두 유명한 얼굴이 있습니다. 금정은 긴 내부 교통과 마지막 상승으로 닿는 고산 아이콘입니다. 사찰과 숲의 산은 오래된 종교 공간, 돌길과 생태 고도대의 네트워크입니다. 하루 방문자는 보통 하나를 골라야 하며 둘을 깊게 보는 것은 빠른 버스가 아니라 이틀의 결정입니다." },
  { id: "answer", type: "callout", title: "바로 답하면", tone: "decision", body: "높은 전망, 정상 종교 건축과 고도감이 이유라면 현행 공식 셔틀·케이블카를 이용해 금정을 고르고 구름과 중단을 받아들이세요. 불교 경관, 숲길과 중·소 사찰이 중요하면 중저산 사찰 길을 고릅니다. 숙박, 분리된 운영 확인과 삭제 계획이 있을 때만 둘을 합치세요." },
  { id: "two-mountains-heading", type: "heading", level: 2, text: "계획에서는 어메이를 두 산으로" },
  { id: "two-mountains", type: "table", caption: "핵심 선택", columns: ["코스", "얻는 것", "포기하는 것"], rows: [["금정 중심", "고산 분위기, 정상 사찰, 대표 장면과 가능성 있는 구름·하늘", "느린 숲·사찰 연결"], ["사찰·숲 중심", "만년사/청음각 유산, 점진적 경관과 종교 공간 연결", "정상 아이콘과 긴 상승"], ["1박 조합", "높은 코스와 중저산 코스 및 회복", "단순 당일; 날씨·숙박이 일정의 일부"]] },
  { id: "heritage-heading", type: "heading", level: 2, text: "사찰 길은 열등한 선택이 아닙니다" },
  { id: "heritage", type: "paragraph", text: "유네스코는 어메이산을 중국 불교 정착과 확산의 중요한 문화경관으로 설명하고 산 환경에 통합된 30여 사찰, 만년사·청음각·보국사를 구체적으로 언급합니다. 식생도 아열대에서 아고산림까지 변합니다. 가치는 정상 조형물 하나가 아니라 건물, 길과 생태의 관계에 있습니다." },
  { id: "summit-heading", type: "heading", level: 2, text: "금정: 산악 조건을 가진 교통 사슬" },
  { id: "summit", type: "list", ordered: true, items: ["당일 개방 공지, 셔틀과 케이블카 운행을 확인합니다.", "정확한 방문자센터에서 시작하고 표, 차량 줄과 긴 상승을 계산합니다.", "입구와 정상은 기온·바람·시야가 다르므로 겹옷과 방수를 준비합니다.", "구름을 정상적 결과로 받아들이고 전망 때문에 위험한 길을 쓰지 않습니다.", "현행 하산 교통과 호텔을 지킬 마지막 결정 시각을 둡니다."] },
  { id: "summit-reality", type: "callout", title: "케이블카가 무계단·무날씨를 뜻하지 않습니다", tone: "warning", body: "큰 고도 구간을 줄여도 줄, 계단, 경사, 서기와 마지막 보행이 남습니다. 위험한 날씨에는 중단될 수 있습니다. 현행 접근성을 운영사에 확인하고 정상 사진만으로 휠체어·노약자의 전체 연결을 보장하지 마세요." },
  { id: "temple-heading", type: "heading", level: 2, text: "사찰 길: 연결된 종교 경관 하나" },
  { id: "temple", type: "comparison", title: "중저산 접근 세 가지", columns: [{ heading: "만년사 앵커", body: "사찰 유산을 중심으로 확인된 보행 한 구간을 더합니다. 불교 미술과 범위 있는 하루에 좋습니다." }, { heading: "청음각과 숲", body: "물, 숲과 정원형 사찰 관계를 우선합니다. 정상보다 경관 순서를 중시하는 보행자에게 좋습니다." }, { heading: "입구 사찰", body: "날씨, 늦은 도착이나 이동 제한으로 산이 어렵다면 보국사/복호사 주변을 낮은 위험의 대안으로 씁니다." }] },
  { id: "combine-heading", type: "heading", level: 2, text: "둘을 과장 없이 합치는 법" },
  { id: "combine", type: "table", caption: "시간표가 아닌 이틀 틀", columns: ["날", "주 임무", "삭제 규칙"], rows: [["1일", "중저산 사찰·숲 한 구간", "체크인이나 다음 날 이른 출발을 해치기 전에 종료"], ["2일", "당일 공식 교통으로 금정", "날씨/운영 실패 시 위험한 즉흥 대신 낮은 유산 대안"]] },
  { id: "wildlife", type: "callout", title: "원숭이는 야생동물이며 보장된 볼거리가 아닙니다", tone: "warning", body: "먹이를 주거나 자극·접촉하고 음식을 보이지 마세요. 표지를 따르고 거리를 두며 소지품을 고정합니다. 만남은 보장되지 않고 짧은 영상은 안전 지침이 아닙니다." },
  { id: "failure-heading", type: "heading", level: 2, text: "실제로 만난 산에서 회복하세요" },
  { id: "failure", type: "table", caption: "문제와 회복", columns: ["문제", "대응"], rows: [["정상이 구름", "종교 공간과 산 분위기 가치 판단; 하산 여유 넘겨 기다리지 않음"], ["케이블카/셔틀 중단", "폐쇄에 따르고 개방·일광이 충분할 때만 중저산 전환"], ["사찰길 미끄럽고 피로", "다음 안전한 직원 지점에서 되돌림"], ["늦은 도착", "입구 유산 또는 숙박; 정상 압축 금지"], ["고도 불편/질병", "상승을 멈추고 도움 요청; 정상은 선택"]] },
  { id: "leshan-boundary", type: "callout", title: "러산은 별도 방문일입니다", tone: "neutral", body: "어메이산과 러산대불은 같은 세계유산이지만 두 개의 분리된 경관구역입니다. 같은 등재가 촉박한 하루를 정당화하지 않습니다. 이 글은 러산 표·배·절벽 동선을 담당하지 않습니다." },
  { id: "checklist", type: "list", items: ["현행 경관 공지, 교통과 케이블카를 확인했습니다.", "실제 고도별 날씨·기온·시야를 읽었습니다.", "주 코스 하나를 고르고 둘째는 대안/다음 날입니다.", "신발, 겹옷, 음식과 안전 하산 결정을 준비했습니다.", "산 일정 지연에도 숙박과 이후 교통이 가능합니다."] },
  { id: "links", type: "internal-links", title: "어메이산 연결", items: [{ label: "청두 도시 허브", href: "/ko/destinations/chengdu/", description: "청두 일정과 숙박일 속 역할을 정합니다." }, { label: "부모님과 중국 여행", href: "/ko/guides/china-itinerary-with-older-parents/", description: "회복과 산 대안을 둡니다." }, { label: "일정이 너무 바쁜가요?", href: "/ko/guides/is-your-china-itinerary-too-rushed/", description: "경관 내부 이동도 시간으로 셉니다." }, { label: "중국 공휴일", href: "/ko/guides/china-public-holidays-travel-calendar/", description: "산 방문 전 혼잡을 확인합니다." }, { label: "중국에서 가이드가 필요한가요?", href: "/ko/guides/do-you-need-a-tour-guide-in-china/", description: "해설 가치와 기본 이동을 분리합니다." }] },
  { id: "sources", type: "sources", title: "일차 출처와 사진 크레디트", items: [{ label: "어메이산·러산대불 세계유산", url: "https://whc.unesco.org/en/list/779", publisher: "유네스코 세계유산센터", reviewedAt: "2026-08-22" }, { label: "어메이산 공식 포털", url: "https://www.ems517.com/", publisher: "어메이산 경관구역", reviewedAt: "2026-08-22" }, { label: "대표 사진: George N의 어메이산 금정, CC BY 2.0", url: "https://commons.wikimedia.org/wiki/File:%E5%B3%A8%E7%9C%89%E5%B1%B1%E9%A3%8E%E6%99%AF%E5%8C%BA_Mount_Emei_Scenic_Area_04.jpg", publisher: "Wikimedia Commons", reviewedAt: "2026-08-22" }] }
] } as const satisfies StructuredPageBody;
export default body;
