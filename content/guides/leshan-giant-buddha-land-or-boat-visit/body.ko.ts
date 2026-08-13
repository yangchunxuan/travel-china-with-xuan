import type { StructuredPageBody } from "../../../lib/content-system/page-body";
const body:StructuredPageBody={schemaVersion:"1.0.0",blocks:[
{id:"answer-first",type:"lead",text:"사찰과 절벽길을 걷고 가까이에서 대불의 압도적인 크기를 느끼고 싶다면 육로 관람을 고르세요. 대불의 전신과 절벽·강이 이루는 전체 풍경이 우선이라면 낮 유람선이 맞습니다. 하루를 온전히 쓸 수 있고 두 운영 상황을 모두 확인했을 때만 두 방식을 함께 넣으세요. 입장권과 이동 과정은 각각 따로이며, 유람선이 중단돼도 귀환 계획은 유지돼야 합니다."},
{id:"compare-heading",type:"heading",level:2,text:"두 관람은 다른 질문에 답합니다"},
{id:"compare",type:"table",caption:"육로와 유람선 관람 비교",columns:["방식","얻는 것","주의할 변수"],rows:[
["산길 관람 游山","가까운 크기 변화, 링윈산 환경, 개방 시 발 쪽 하강.","계단, 일방 통제, 더위, 대기, 보존 폐쇄와 불각 플랫폼 임시 폐쇄."],
["낮 강 유람 游江","정면의 완전한 좌상과 절벽·물의 전체 관계.","수위, 안개, 바람, 폭풍, 안전 통제, 부두 변경, 대기와 운항 중단."],
["둘 다","같은 기념물을 가까이와 멀리서 읽기.","두 표·확인 체계와 구역 간 지상 이동. 하나의 연속 순환 코스가 아닙니다."],
]},
{id:"separate-ticket",type:"callout",title:"배를 산길 표에 포함된 것으로 보지 마세요",body:"공식 운영 자료는 산길 입장과 낮 수상 관광을 서로 다른 상품, 표, 승선 지점으로 설명합니다. 실시간 공식 구매 페이지를 읽으세요. 제3자 묶음은 실제 상품·부두·환불 규정을 가릴 수 있습니다.",tone:"warning"},
{id:"land-heading",type:"heading",level:2,text:"현실적인 산길 순서"},
{id:"land",type:"list",items:["현재 예매 내역에 적힌 입구로 들어가 링윈 사찰·절벽 구역을 찾습니다.","하강 전 머리와 상부 절벽을 봅니다. 대불 발치 관람 구역이 열리지 않아도 가까이에서 크기감을 느낄 수 있습니다.","당일 계단 방향, 대불 발치 관람 구역 개방과 귀환 흐름을 확인합니다. 보존과 관람객 분산 운영에 따라 달라질 수 있습니다.","모두가 가파르고 좁은 계단과 이후 상승을 감당할 때만 내려갑니다. 일방 구간에서는 되돌아갈 수 없을 수 있습니다.","대불을 고립된 조각이 아니라 보호된 산·강 유산의 일부로 봅니다."]},
{id:"boat-heading",type:"heading",level:2,text:"배는 전망이자 운영 결정입니다"},
{id:"boat",type:"list",items:["비슷한 야간 크루즈나 횡단이 아니라 낮 강 유람인지 확인합니다.","승선 부두, 매표·확인점, 하선점을 중국어로 저장합니다.","당일 수시 출발인지 고정 출발인지 묻고 오래된 시간표를 복사하지 않습니다.","예매에 사용한 신분증과 하선 뒤 도로 이동 시간을 확보합니다.","운항 중단 시 육로 관람으로 전환하거나 시내 일정으로 바꾸고, 청두행 열차가 있으면 무한정 기다리지 않습니다."]},
{id:"dynamic",type:"callout",title:"수위와 날씨는 실제 운영 변수입니다",body:"러산 공식 방문 자료는 출항 시각이 수위와 날씨에 따라 바뀔 수 있다고 밝힙니다. 정부 공지는 개별 부두나 횡단 상품이 중단될 수 있음도 보여 줍니다. 여행 아침과 부두 도착 전 공식 포털·위챗을 확인하세요.",tone:"decision"},
{id:"who",type:"comparison",columns:[
{heading:"부모님·계단 제한",body:"배는 오르막이 적은 전체 전망을 줄 수 있지만 승선 계단과 부두 도보를 확인해야 합니다. 운영자 답 없이 무장애를 약속하지 않습니다."},
{heading:"사진 우선",body:"배는 고전적인 전체상을 주지만 좋은 빛과 위치에 멈출 보장은 없습니다. 산길은 세부와 규모를 줍니다. 어느 쪽도 무인 사진을 보장하지 않습니다."},
{heading:"청두 출발 짧은 날",body:"한 방식만 고르세요. 두 방식과 역 이동은 배가 즉시 떠나지 않을 때 특히 취약합니다."}
]},
{id:"time-heading",type:"heading",level:2,text:"관광지 이름이 아니라 사용 가능한 시간으로 고르세요"},
{id:"time-matrix",type:"table",caption:"반나절과 하루 전체가 가능한 약속은 다릅니다",columns:["가능한 시간","방어 가능한 선택","약속하지 말 것"],rows:[
["청두행 고정 열차가 있는 짧은 방문","도착 전에 한 방식을 정하고 역 귀환 여유를 둡니다","두 방식, 보장된 출항, 대불 발치 플랫폼"],
["러산에서 하루 전체","육로를 먼저 하고 실시간 운항과 이동이 맞을 때만 배를 더합니다","한 표나 한 입구가 두 상품을 연결함"],
["더위·비·계단 제약","현재 승선이 적합하면 배로 등반을 줄이고 아니면 짧은 육로를 택합니다","운영사 확인 없는 무장애나 쉬운 승선"],
["사진 우선","배는 전체 모습, 육로는 규모와 세부를 봅니다","움직이는 배에서 고정 정지·각도·빛·무인 장면"],
]},
{id:"land-check",type:"callout",title:"내려가기 전에 돌아올 오르막을 평가하세요",body:"절벽길은 발치로 내려가기만 하는 길이 아닙니다. 여행자는 관리된 경로를 마치고 관광지를 나와야 합니다. 가파른 구간에 들어가기 전에 당일 통행 방향, 이동이 가장 제한된 사람의 균형과 체력, 더위나 젖은 바닥, 이후 필요한 시간을 확인합니다. 하부가 닫혔거나 맞지 않아도 머리, 사찰 구역, 상부 절벽은 의미 있는 육로 방문이 될 수 있습니다.",tone:"decision"},
{id:"boat-expectations",type:"paragraph",text:"낮 유람선은 공동 운항 서비스이지 개인 사진 플랫폼이 아닙니다. 탑승 대기, 안전 안내, 좌석·서 있는 위치, 수위, 배의 움직임이 관람과 촬영을 바꿉니다. 정확한 낮 상품과 부두의 중국어 이름을 저장하고 예약 서류를 지니며, 안전 때문에 운영사가 조정하거나 중단할 수 있음을 받아들입니다. 이름이 비슷한 야간 유람이나 지역 도선은 낮 대불 관람 상품을 대신하지 않습니다."},
{id:"both-heading",type:"heading",level:2,text:"둘 다 한다면 사이의 이동을 적으세요"},
{id:"both-plan",type:"list",ordered:true,items:["어느 상품을 먼저 하고 왜 그런지 정하며 당일 운항을 확인하기 전에 둘 다 사지 않습니다.","첫 상품의 출구와 두 번째 상품의 정확한 입구·부두를 저장합니다.","사이에 도로 이동, 표 수령, 대기, 식사·휴식을 더합니다.","귀로가 작동하는 동안 두 번째 상품을 포기할 마지막 시각을 정합니다.","한 방식만으로도 가치 있게 만들어 날씨·수위·보호 통제가 다른 하나를 없애도 하루가 성립하게 합니다."]},
{id:"return",type:"callout",title:"두 번째 방식을 더하기 전에 귀환을 지키세요",body:"마지막 지상 교통 지점, 러산역까지의 도로 이동시간과 철도 여유를 먼저 정합니다. 유람선 영업 종료 시각이 그 시각의 출항이나 즉시 하선을 보장하지는 않습니다. 열차가 중요하면 기다리기를 포기할 기준 시각과 택시·공식 지상 대안을 정해 두세요.",tone:"neutral"},
{id:"final-check",type:"list",items:["예매 내역에 육로 관람·낮 유람선·두 방식 모두 중 무엇인지 명확히 적혀 있습니다.","최신 공식 공지에서 대불 발치 관람 구역 개방과 낮 유람선 운항 여부를 확인했습니다.","정확한 입구·부두·하선점을 저장했습니다.","모두 계단·승선 요구를 받아들입니다.","배 없이도 여유 있게 역에 갈 수 있습니다."]},
{id:"internal-links",type:"internal-links",title:"러산을 쓰촨 일정에 연결하기",items:[
{label:"중국 고속철 첫 이용",href:"/ko/guides/china-high-speed-train-first-time-guide/",description:"러산 귀환과 역·여권 절차를 따로 준비합니다."},
{label:"중국 여행에 가이드가 필요한가",href:"/ko/guides/do-you-need-a-tour-guide-in-china/",description:"교통 외에 현장 해설이 가치를 더하는지 판단합니다."},
{label:"부모님과 함께하는 중국 여행",href:"/ko/guides/china-itinerary-with-older-parents/",description:"계단, 승선과 회복을 전체 일정에 넣습니다."}
]},
{id:"consultation",type:"callout",title:"여행일에 맞는 방식을 확인해야 하나요?",body:"Homeground 여행 상담가는 최신 운영, 이동 제한, 청두 연결과 대기 중단 시각을 검토할 수 있습니다. 날짜, 그룹 속도, 선호 전망과 귀환 열차를 알려 주세요.",tone:"neutral"},
{id:"sources",type:"sources",title:"확인한 공식·이미지 출처",items:[
{label:"관리위원회가 안내한 공식 관광정보 포털",url:"http://www.lsdf517.com/web/list/97",publisher:"Leshan Giant Buddha Scenic Area",reviewedAt:"2026-08-12"},
{label:"육로 관람·낮 유람선·강 횡단 서비스를 안내하는 러산 공식 방문 가이드",url:"https://www.leshan.gov.cn/lsswszf/jgjj/92337818/687756313100357.html",publisher:"Leshan Municipal People's Government",reviewedAt:"2026-08-12"},
{label:"계절별 산길·수상 운영 공식 국제 방문 자료",url:"https://www.hi-leshan.com/index.php?a=index&aid=660&c=View&m=home",publisher:"Hi Leshan",reviewedAt:"2026-08-12"},
{label:"부두·횡단 상품 중단 가능성을 보여 주는 정부 공지",url:"https://www.leshan.gov.cn/lsswszf/bmdt/92337815/3e865b0e7eee473a94ee6972e.html",publisher:"Leshan Giant Buddha Scenic Area Management Committee",reviewedAt:"2026-08-12"},
{label:"대표 사진: Suicasmo의 러산대불, CC0, 크롭 및 WebP 변환",url:"https://commons.wikimedia.org/wiki/File:Leshan_Giant_Buddha_20260514-5.jpg",publisher:"Wikimedia Commons",reviewedAt:"2026-08-12"}
]}
]};export default body;
