import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {schemaVersion:"1.0.0",blocks:[
  {id:"lead",type:"lead",text:"대운하는 통째로 보존된 옛 물길도, 제국의 토목사만을 보여 주는 유적도 아니다. 긴 수계에는 보호 대상인 갑문과 다리, 지금도 화물을 나르는 항로, 재정비된 산책로, 주택과 상점, 주민이 매일 쓰는 지름길이 겹쳐 있다. 여행자가 할 일은 눈앞의 장면이 어느 층위의 증거인지 먼저 확인하고 물길이 이동과 동네 생활을 지금도 어떻게 바꾸는지 읽는 것이다. 활기찬 강변을 모두 ‘변하지 않은 역사’라고 부르는 것은 아니다."},
  {id:"answer",type:"callout",title:"세 층위를 함께 읽기",body:"먼저 ① UNESCO에 등재된 유산 요소, ② 지금도 작동하는 운송·수리 체계, ③ 물길과 이어지는 오늘의 거리 생활을 구분한다. 세 층위가 함께 보이는 짧은 구간 하나를 고르면, 여러 ‘수향마을’을 훑는 것보다 대운하를 더 정확히 이해할 수 있다.",tone:"decision"},
  {id:"layers-heading",type:"heading",level:2,text:"먼저 장면을 세 층위로 분류한다"},
  {id:"layers",type:"table",caption:"무엇을 보고 있으며 무엇을 단정할 수 없는가",columns:["층위","확인 가능한 것","현장에서 볼 것","단정하지 말 것"],rows:[
    ["등재 유산","UNESCO 등재 자산은 선택된 수로 구간과 유산 요소로 이루어진 연속 유산이다.","갑문, 제방, 다리, 창고, 물길과 도시 조직의 관계","운하 옆의 모든 오래된 건물이 등재 유산이라는 주장"],
    ["작동하는 수계","일부 구간은 여전히 화물 운송, 배수, 홍수 관리와 도시 수변 기능을 수행한다.","선박 규격, 갑문 대기, 작업 구역, 도로와 물류의 연결","공공 보행로에서 보이는 모습만으로 운영 규칙을 추정하는 것"],
    ["오늘의 동네","주민, 시장, 상점과 공공 공간은 물과 새 방식으로 관계를 맺는다.","물길을 가로지르는 동선, 아침과 저녁의 이용, 수변과 뒷골목의 차이","새로 조성된 상권을 그대로 전통 생활이라고 부르는 것"]
  ]},
  {id:"system-heading",type:"heading",level:2,text:"운하를 하나의 선이 아니라 도시 시스템으로 본다"},
  {id:"system",type:"paragraph",text:"물길만 따라 걷지 말고 수직으로 한 번 빠져나가 보자. 다리나 나루터 흔적에서 시작해 수변 도로, 상업 거리, 주거 골목, 대중교통 정류장까지 이동하면 운하가 어디에서 경계가 되고 어디에서 연결축이 되는지 보인다. 반대로 관광 정비 구역 안에만 머물면 조명과 외관은 보아도 도시의 물류와 생활 구조는 놓치기 쉽다. 작업 선박이나 갑문은 반드시 합법적인 공개 지점에서만 관찰한다."},
  {id:"change-heading",type:"heading",level:2,text:"‘살아 있다’와 ‘옛 모습 그대로’는 같은 말이 아니다"},
  {id:"change",type:"comparison",title:"두 가지 잘못된 기대를 피하기",columns:[
    {heading:"박제된 유산을 기대할 때",items:["변화: 현대식 제방, 아파트, 도로를 방해물로 본다.","일상: 노점이나 빨래 같은 장면을 ‘진정성’의 증거로 소비한다.","해석: 옛 분위기만으로 역사성을 판단한다."]},
    {heading:"진짜 운하 도시를 읽을 때",items:["변화: 어떤 기능이 남고 무엇이 재편되었는지 질문한다.","일상: 주민의 사생활을 존중하고 공공 공간의 이용 패턴을 관찰한다.","해석: 명판, 유산 목록, 도시 계획과 운영 자료로 층위를 확인한다."]}
  ]},
  {id:"places-heading",type:"heading",level:2,text:"도시 이름보다 관찰 과제를 고른다"},
  {id:"places",type:"table",caption:"서로 다른 공개 구간이 답할 수 있는 질문",columns:["관찰 과제","적합한 공개 환경","현장에서 확인할 관계"],rows:[
    ["제국 수도와 수운의 종점","베이징 통저우처럼 운하의 북단과 현대 수변이 겹치는 구간","종점의 상징, 창고·부두 기억, 새 공공 공간"],
    ["강남 도시 조직","쑤저우·항저우의 공개 수변과 오래된 가로망이 만나는 구간","다리 간격, 평행·수직 골목, 상업과 주거의 배치"],
    ["현재의 화물 항운","장쑤 북부 등 합법적 전망 지점이 확인되는 항로","바지선 흐름, 갑문·항만 체계, 육상 물류 연결"],
    ["보존과 재생의 긴장","박물관·산업 유산·새 수변 공원이 가까운 구간","보존 건물, 재사용 공간, 철거·신축의 경계"]
  ]},
  {id:"walk-heading",type:"heading",level:2,text:"90분 현장 읽기"},
  {id:"walk",type:"list",items:["공식 명칭과 등재 또는 보호 지위를 확인한 다리·갑문·부두 흔적 한 곳에서 시작한다.","같은 위치에서 물길 폭, 제방, 선박과 횡단 방식을 기록한다. 작업 구역에는 들어가지 않는다.","물과 나란한 길을 20~30분 걷되 정비된 전면과 생활용 뒷면을 구분한다.","다리 하나를 건너 양안의 토지 이용과 보행 밀도를 비교한다.","운하와 수직인 거리로 10~15분 이동해 시장·주택·교통이 물과 어떻게 연결되는지 본다.","공식 해설판이나 박물관 자료로 첫 관찰을 다시 검증한다. 현장 인상과 확인된 사실을 따로 적는다."]},
  {id:"scenarios-heading",type:"heading",level:2,text:"두 여행자라면 구간도 달라진다"},
  {id:"scenarios",type:"comparison",title:"관심에 따라 시간을 배분하기",columns:[
    {heading:"도시사에 관심 있는 첫 방문자",items:["핵심: 다리·옛 가로망·시장 관계가 읽히는 도심 구간","보조: 지역 박물관 또는 공식 유산 해설","피할 것: 비슷한 상업화 수변을 여러 곳 반복"]},
    {heading:"현대 인프라에 관심 있는 재방문자",items:["핵심: 공개 지점에서 현대 항운과 수변 재편을 볼 수 있는 구간","보조: 항운·수리 자료와 합법적인 갑문·선박 관찰","피할 것: 항만이나 통제 구역에 접근해 ‘더 진짜’인 장면을 찾는 행동"]}
  ]},
  {id:"staged-heading",type:"heading",level:2,text:"연출된 수변을 쓸모 있게 읽는 법"},
  {id:"staged",type:"list",items:["복원된 외관, 새 포장, 조명, 입점 업종을 각각 관찰한다. 한꺼번에 ‘가짜’라고 결론내리지 않는다.","오래된 구조물의 재료와 새 장식 요소를 구분하고 공식 설명에서 복원 시점을 찾는다.","낮과 저녁의 이용자가 달라지는지 보되 한 번의 방문을 보편적 생활로 일반화하지 않는다.","상업 구역을 벗어난 공공 거리와 비교하되 주민을 전시물처럼 촬영하지 않는다.","재생 사업도 현대 운하사의 일부라는 점을 인정하면서, 그것을 전통의 연속성 증거로 바꾸지 않는다."]},
  {id:"recovery-heading",type:"heading",level:2,text:"계획이 어긋났을 때의 복구"},
  {id:"recovery",type:"table",caption:"현장 실패를 정보로 바꾸기",columns:["상황","대체 행동","그래도 얻는 것"],rows:[
    ["공사나 홍수 관리로 수변이 닫힘","안전한 다리 전망과 수직 거리 관찰로 전환하고 공식 공지를 확인","운하가 도시 이동과 관리에 만드는 경계"],
    ["선박이 보이지 않음","갑문·제방·창고·도로 접속을 읽고 운영 자료로 보완","교통 시스템의 물리적 구조"],
    ["관광 상업만 두드러짐","한 블록 뒤의 평행 거리와 대중교통 연결을 비교","재생 수변과 일상 도시의 공간 차이"],
    ["비나 폭염으로 긴 걷기가 어려움","박물관 한 곳과 짧은 공개 수변 구간만 선택","무리하지 않고 재료 증거와 도시 형태를 읽는 방법"]
  ]},
  {id:"check-heading",type:"heading",level:2,text:"출발 전 최종 확인"},
  {id:"check",type:"list",items:["구간 또는 유산 요소의 정확한 중국어 명칭과 지도 핀","등재 구성 요소인지, 완충·맥락 구역인지, 단지 인근인지","현재 공개 출입, 공사, 홍수 관리와 행사 공지","박물관·유람선·시설 운영 시간을 운영자 채널에서 확인","작업 항만·갑문·화물 구간을 볼 수 있는 합법적 공개 지점","우천 또는 선박이 없을 때의 대안 한 가지","주민과 작업자를 가까이 촬영할 때의 동의와 사생활 원칙"]},
  {id:"help",type:"callout",title:"전체 일정에 맞는 운하 구간이 필요하다면",body:"이미 가는 도시와 관심사가 토목, 도시사, 현재의 물류, 동네 생활 중 무엇인지 Homeground에 알려 달라. 실제 플래너가 최신 공개 조건을 다시 확인해 물의 도시를 체크리스트로 만들지 않는 구간을 고를 수 있다.",tone:"neutral"},
  {id:"links",type:"internal-links",title:"맥락을 더 넓히기",items:[
    {label:"상하이–쑤저우–항저우–난징 순서 정하기",href:"/ko/guides/shanghai-suzhou-hangzhou-nanjing-route-order/",description:"운하 테마를 더하기 전에 강남의 어느 도시가 일정에 필요한지 정한다."},
    {label:"두공으로 중국 목조건축 읽기",href:"/ko/guides/dougong-and-chinese-timber-frame-reading/",description:"옛 분위기가 아니라 구조 증거를 읽는다."},
    {label:"목판과 활자 인쇄 비교하기",href:"/ko/guides/woodblock-and-movable-type-printing-decisions/",description:"물질과 생산 시스템이 도시 교류를 만든 방식을 본다."}
  ]},
  {id:"sources",type:"sources",title:"공식·독립 자료",items:[
    {label:"대표 이미지 — 2023-11-22 촬영한 궁천교, 대운하 물길과 수변 공공 공간. 현재 행사나 통행 상태의 증거는 아님",url:"https://commons.wikimedia.org/wiki/File:20231122_Gongchen_Bridge_01.jpg",publisher:"Windmemories — CC BY-SA 4.0; 출처 표기일 뿐 Homeground에 대한 지지를 뜻하지 않음",reviewedAt:"2026-08-13"},
    {label:"대표 이미지 라이선스 — CC BY-SA 4.0",url:"https://creativecommons.org/licenses/by-sa/4.0/",publisher:"Creative Commons",reviewedAt:"2026-08-13"},
    {label:"대운하 세계유산 등재 자산",url:"https://whc.unesco.org/en/list/1443/",publisher:"UNESCO World Heritage Centre",reviewedAt:"2026-08-13"},
    {label:"현대 화물축으로서 장쑤 북부 운하",url:"https://www.mot.gov.cn/xinwen/jiaotongyaowen/202601/t20260113_4197211.html",publisher:"중국 교통운수부",reviewedAt:"2026-08-13"},
    {label:"항저우 대운하 핵심구역 공간 관리",url:"https://www.hangzhou.gov.cn/art/2023/2/6/art_1229063387_1829308.html",publisher:"항저우시 인민정부",reviewedAt:"2026-08-13"},
    {label:"Location, Urban Fabric and Transportation",url:"https://www.taylorfrancis.com/chapters/edit/10.4324/9780429244605-38/location-urban-fabric-transportation-fang-wang-bingyu-lin-qingyin-liu",publisher:"Routledge",reviewedAt:"2026-08-13"},
    {label:"Heritage Modernity: the Grand Canal and everyday life in Hangzhou",url:"https://escholarship.org/uc/item/7jj0h5hn",publisher:"University of California eScholarship",reviewedAt:"2026-08-13"}
  ]}
]} as const satisfies StructuredPageBody;

export default body;
