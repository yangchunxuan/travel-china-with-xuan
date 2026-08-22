import type { GuideEntry, GuideId } from "./guideRegistry";
import type { HomegroundLocale } from "./homegroundI18n";
import type { SearchSectionId } from "./searchPlatformI18n";

export const searchCollectionIds = [
  "explore-regions-provinces",
  "explore-cities-neighborhoods",
  "explore-attractions-nature-heritage",
  "plan-trip-length-city-order",
  "plan-traveller-theme-itineraries",
  "plan-budget-pace-decisions",
  "transport-airports-rail-hubs",
  "transport-city-pair-routes",
  "transport-last-mile-transfers",
  "timing-months-seasons",
  "timing-holidays-crowds",
  "timing-events-natural-calendar",
  "stay-city-areas",
  "stay-hotel-types-scenic-bases",
  "stay-access-foreign-guests",
  "essentials-entry-transit",
  "essentials-payments-connectivity",
  "essentials-booking-registration-recovery",
  "culture-history-people-ideas",
  "culture-regional-food",
  "culture-festivals-arts-contemporary",
  "tools-route-time",
  "tools-area-option-selectors",
  "tools-maps-calculators-reference",
  "services-guides-experiences",
  "services-transfers-hotels-bookings",
  "services-route-whole-trip",
] as const;

export type SearchCollectionId = (typeof searchCollectionIds)[number];

export interface SearchCollectionLocaleCopy {
  label: string;
  title: string;
  description: string;
}

export interface SearchCollectionDefinition {
  id: SearchCollectionId;
  section: SearchSectionId;
  slug: string;
  locales: Record<HomegroundLocale, SearchCollectionLocaleCopy>;
}

function localized(
  id: SearchCollectionId,
  section: SearchSectionId,
  slug: string,
  en: SearchCollectionLocaleCopy,
  zh: SearchCollectionLocaleCopy,
  ko: SearchCollectionLocaleCopy,
): SearchCollectionDefinition {
  return { id, section, slug, locales: { en, zh, ko } };
}

export const searchCollections: readonly SearchCollectionDefinition[] = [
  localized(
    "explore-regions-provinces", "explore", "regions-provinces",
    { label: "Regions and provinces", title: "Read China by region, not as one uniform destination", description: "Regional landscapes, provincial identities and cross-city geographies explained before they are turned into an itinerary." },
    { label: "地区与省份", title: "按地区理解中国，而不是把全国看成同一种目的地", description: "先读懂区域景观、省份差异与跨城市地理，再决定它们是否应该进入同一趟旅行。" },
    { label: "지역과 성", title: "중국을 하나의 여행지가 아니라 지역별로 읽기", description: "지역 경관과 성별 정체성, 여러 도시를 잇는 지리를 먼저 이해한 뒤 실제 일정에 넣을지 판단합니다." },
  ),
  localized(
    "explore-cities-neighborhoods", "explore", "cities-neighborhoods",
    { label: "Cities and neighbourhoods", title: "Understand how a Chinese city works at street level", description: "City form, neighbourhood character and everyday public space—not only a checklist of famous sights." },
    { label: "城市与街区", title: "从街道和日常空间理解一座中国城市", description: "关注城市如何形成、街区怎样生活，以及普通公共空间，而不只是罗列著名景点。" },
    { label: "도시와 동네", title: "거리와 일상 공간에서 중국 도시 이해하기", description: "명소 목록을 넘어 도시 구조와 동네의 성격, 사람들이 실제로 사용하는 공공 공간을 살펴봅니다." },
  ),
  localized(
    "explore-attractions-nature-heritage", "explore", "attractions-nature-heritage",
    { label: "Attractions, nature and heritage", title: "Visit major places with context and a workable sequence", description: "Heritage sites, museums and landscapes explained through meaning, booking boundaries and the order that makes a visit coherent." },
    { label: "景点、自然与遗产", title: "带着背景和合理顺序进入重要景点", description: "把遗产、博物馆和自然景观的意义、预约边界与游览顺序放在一起说明。" },
    { label: "명소·자연·유산", title: "배경과 현실적인 순서를 알고 주요 명소 방문하기", description: "유산과 박물관, 자연 경관의 의미를 예약 조건과 실제 관람 순서에 연결합니다." },
  ),
  localized(
    "plan-trip-length-city-order", "plan", "trip-length-city-order",
    { label: "Trip length and city order", title: "Choose the number of cities and put them in the right order", description: "Route structures that protect useful travel days instead of hiding transfers inside an optimistic itinerary." },
    { label: "天数与城市顺序", title: "决定去几座城市，并把顺序排对", description: "用真实转场时间建立路线，不把交通日误算成完整游览日。" },
    { label: "여행 기간과 도시 순서", title: "도시 수를 정하고 이동 순서를 제대로 배열하기", description: "이동 시간을 숨긴 낙관적인 일정이 아니라 실제 관광 시간을 지키는 노선을 설계합니다." },
  ),
  localized(
    "plan-traveller-theme-itineraries", "plan", "traveller-theme-itineraries",
    { label: "Traveller and theme itineraries", title: "Build the route around the people taking it", description: "Itineraries shaped by age, mobility, family needs and a genuine theme rather than a renamed standard tour." },
    { label: "同行人群与主题路线", title: "围绕真正出发的人来设计路线", description: "按年龄、行动能力、家庭需求和真实兴趣调整行程，而不是给标准团换一个名字。" },
    { label: "여행자와 테마 일정", title: "실제로 떠나는 사람을 중심으로 일정 만들기", description: "나이와 이동 능력, 가족의 필요와 분명한 관심사에 맞춰 표준 코스를 다시 설계합니다." },
  ),
  localized(
    "plan-budget-pace-decisions", "plan", "budget-pace-decisions",
    { label: "Budget, pace and trade-offs", title: "Spend money and time where they change the trip", description: "Practical choices about pace, comfort, risk and cost—with the trade-off made visible before booking." },
    { label: "预算、节奏与取舍", title: "把时间和预算花在真正改变旅行的地方", description: "在预订前看清节奏、舒适度、风险与费用之间的真实交换。" },
    { label: "예산·속도·선택", title: "여행을 실제로 바꾸는 곳에 시간과 비용 쓰기", description: "예약 전에 속도와 편안함, 위험과 비용 사이의 선택을 분명히 비교합니다." },
  ),
  localized(
    "transport-airports-rail-hubs", "transport", "airports-rail-hubs",
    { label: "Airports and railway hubs", title: "Choose the terminal before choosing the ticket", description: "Airports and stations compared by the city access, district and onward journey they actually serve." },
    { label: "机场与铁路枢纽", title: "先选对机场和车站，再买票", description: "按它真正服务的城区、住宿位置与下一段行程比较不同枢纽。" },
    { label: "공항과 철도 허브", title: "표를 사기 전에 알맞은 터미널부터 고르기", description: "각 공항과 역이 실제로 연결하는 도심, 숙박 지역과 다음 이동을 기준으로 비교합니다." },
  ),
  localized(
    "transport-city-pair-routes", "transport", "city-pair-routes",
    { label: "City-to-city routes", title: "Compare the complete journey between two places", description: "Rail, air, road and water routes measured from real starting point to real destination—not terminal to terminal alone." },
    { label: "城市之间的路线", title: "比较两个地方之间的完整旅程", description: "从真实出发点算到最终目的地，比较铁路、航空、公路与水路，而不只看枢纽之间。" },
    { label: "도시 간 이동", title: "두 장소 사이의 전체 이동을 비교하기", description: "터미널 사이 시간만이 아니라 실제 출발지부터 최종 목적지까지 철도·항공·도로·수로를 비교합니다." },
  ),
  localized(
    "transport-last-mile-transfers", "transport", "last-mile-transfers",
    { label: "Last-mile transfers", title: "Plan the part after the train or plane arrives", description: "Station exits, border handoffs, park gates and hotel transfers—the short segment most likely to break a good plan." },
    { label: "最后一程接驳", title: "别让到站后的最后一段毁掉整条路线", description: "解释车站出口、口岸衔接、景区入口与酒店接送这些最容易断掉的短距离环节。" },
    { label: "마지막 구간 이동", title: "열차나 비행기 도착 뒤의 마지막 구간까지 계획하기", description: "역 출구와 출입경 연결, 공원 입구와 호텔 이동처럼 좋은 일정을 흔드는 짧은 구간을 다룹니다." },
  ),
  localized(
    "timing-months-seasons", "when-to-go", "months-seasons",
    { label: "Months and seasons", title: "Choose a season by what changes on the ground", description: "Climate regions, shoulder seasons and month-level choices explained without pretending one weather rule covers all of China." },
    { label: "月份与季节", title: "按现场真正发生的变化选择季节", description: "解释气候区域、淡旺季交界与月份选择，不用一条全国天气结论概括整个中国。" },
    { label: "월별·계절별 여행", title: "현장에서 달라지는 조건으로 계절 고르기", description: "하나의 날씨 법칙으로 중국 전체를 설명하지 않고 기후권과 비수기 경계, 월별 선택을 다룹니다." },
  ),
  localized(
    "timing-holidays-crowds", "when-to-go", "holidays-crowds",
    { label: "Holidays and crowds", title: "Know when a public holiday changes the journey", description: "Holiday dates, booking pressure and crowd effects separated from vague warnings that China is simply busy." },
    { label: "假期与人流", title: "判断公共假期会怎样改变这趟旅行", description: "把放假日期、预约压力与人流影响说清楚，而不是笼统地说中国一直很拥挤。" },
    { label: "공휴일과 혼잡", title: "공휴일이 여행을 어떻게 바꾸는지 판단하기", description: "중국은 늘 붐빈다는 막연한 경고 대신 휴일 날짜와 예약 압력, 혼잡의 실제 영향을 구분합니다." },
  ),
  localized(
    "timing-events-natural-calendar", "when-to-go", "events-natural-calendar",
    { label: "Events and natural calendar", title: "Match the trip to festivals and short natural windows", description: "A home for verified flower seasons, water levels, snow, performances and events where timing genuinely changes access or meaning." },
    { label: "节庆与自然时令", title: "把旅程对准节庆与短暂的自然窗口", description: "收录花期、水位、雪季、演出与活动，但只在时间真正改变开放条件或理解方式时发布。" },
    { label: "행사와 자연 시기", title: "축제와 짧은 자연의 시기에 여행 맞추기", description: "개화와 수위, 설경, 공연과 행사처럼 시기가 접근성과 의미를 실제로 바꾸는 주제를 다룹니다." },
  ),
  localized(
    "stay-city-areas", "stay", "city-areas",
    { label: "Where to stay by area", title: "Choose the part of the city before the hotel", description: "Neighbourhood comparisons based on the visits, stations and evening life that matter to this particular trip." },
    { label: "按区域选择住宿", title: "先选城市里的位置，再选酒店", description: "围绕这趟旅行真正要去的景点、车站与夜间活动比较不同街区。" },
    { label: "도시 내 숙박 지역", title: "호텔보다 먼저 도시 안의 위치 고르기", description: "이번 여행에 중요한 명소와 역, 저녁 활동을 기준으로 동네를 비교합니다." },
  ),
  localized(
    "stay-hotel-types-scenic-bases", "stay", "hotel-types-scenic-bases",
    { label: "Hotel types and scenic bases", title: "Choose the right kind of stay and the right base", description: "Hotels, apartments, guesthouses and scenic-area bases compared by how they work, not by category labels alone." },
    { label: "住宿类型与景区基地", title: "选对住宿类型，也选对景区基地", description: "按实际使用方式比较酒店、公寓、民宿与景区住宿，而不是只看类别名称。" },
    { label: "숙소 유형과 관광 거점", title: "알맞은 숙소 유형과 관광 거점 선택하기", description: "호텔과 아파트, 민숙과 관광지 거점을 이름이 아니라 실제 이용 방식으로 비교합니다." },
  ),
  localized(
    "stay-access-foreign-guests", "stay", "access-foreign-guests",
    { label: "Access and foreign-guest checks", title: "Verify that the booked room will actually work", description: "Passport registration, accessible rooms and arrival details checked before a confirmation screen becomes a travel-day problem." },
    { label: "无障碍与外宾入住核实", title: "确认这间已预订的房在现场真的能用", description: "提前核实护照登记、无障碍房与到店细节，避免确认页面在旅行当天变成麻烦。" },
    { label: "접근성과 외국인 투숙 확인", title: "예약한 객실이 현장에서 실제로 가능한지 확인하기", description: "여권 등록과 접근 가능한 객실, 도착 조건을 미리 확인해 예약 화면이 여행 당일 문제로 바뀌지 않게 합니다." },
  ),
  localized(
    "essentials-entry-transit", "essentials", "entry-transit",
    { label: "Entry and transit", title: "Check the passport, route and entry permission together", description: "Visa-free entry, transit, customs and document recovery explained as route-specific tasks rather than passport slogans." },
    { label: "入境与过境", title: "把护照、路线与入境资格放在一起核实", description: "把免签、过境、海关与证件补救解释成具体路线任务，而不是只看一句护照口号。" },
    { label: "입국과 환승", title: "여권과 이동 경로, 입국 자격을 함께 확인하기", description: "무비자 입국과 환승, 세관과 서류 복구를 여권 문구가 아니라 실제 경로별 과제로 설명합니다." },
  ),
  localized(
    "essentials-payments-connectivity", "essentials", "payments-connectivity",
    { label: "Payments and connectivity", title: "Keep money, maps and communication working", description: "Cards, mobile payment, cash, SIM, Wi-Fi, power and maps arranged with a backup for the moment one system fails." },
    { label: "支付与通信", title: "让付款、地图与沟通在旅途中持续可用", description: "把银行卡、移动支付、现金、SIM、Wi-Fi、电源与地图组织成有备用方案的系统。" },
    { label: "결제와 통신", title: "결제와 지도, 연락 수단을 여행 중 계속 작동하게 하기", description: "카드와 모바일 결제, 현금, SIM, 와이파이, 전원과 지도를 하나가 실패해도 버틸 수 있게 준비합니다." },
  ),
  localized(
    "essentials-booking-registration-recovery", "essentials", "booking-registration-recovery",
    { label: "Booking and problem recovery", title: "Book through the right channel and keep a recovery path", description: "Identity matching, official versus reseller channels, evidence and escalation steps for bookings that do not behave as expected." },
    { label: "预约、登记与问题处理", title: "用正确渠道预订，并保留补救路径", description: "处理身份信息匹配、官方与经销渠道、证据保存，以及订单出问题后的升级步骤。" },
    { label: "예약·등록·문제 해결", title: "올바른 채널로 예약하고 문제 해결 경로 남기기", description: "신원 정보 일치와 공식·재판매 채널, 증거 보관과 예약 문제가 생겼을 때의 대응 순서를 다룹니다." },
  ),
  localized(
    "culture-history-people-ideas", "culture", "history-people-ideas",
    { label: "History, people and ideas", title: "Read the ideas and lives behind China’s material past", description: "Objects, buildings, writing and migration used to understand historical change without turning culture into decorative trivia." },
    { label: "历史、人物与思想", title: "从物质遗存读懂中国历史中的观念与生活", description: "通过器物、建筑、文字与迁徙理解历史变化，而不是把文化写成装饰性的冷知识。" },
    { label: "역사·사람·사상", title: "중국의 물질문화 뒤에 있는 생각과 삶 읽기", description: "유물과 건축, 문자와 이주를 통해 역사 변화를 이해하고 문화를 장식적인 상식으로 축소하지 않습니다." },
  ),
  localized(
    "culture-regional-food", "culture", "regional-food",
    { label: "Regional food", title: "Understand a place through how people actually eat", description: "Breakfasts, shared meals and regional cuisines connected to geography, work, family life and the rhythm of a city." },
    { label: "地方饮食", title: "从当地人怎样吃饭来理解一个地方", description: "把早餐、合餐与地方菜连接到地理、工作、家庭生活和城市节奏。" },
    { label: "지역 음식", title: "사람들이 실제로 먹는 방식으로 지역 이해하기", description: "아침 식사와 함께 먹는 상차림, 지역 요리를 지리와 노동, 가족생활과 도시의 리듬에 연결합니다." },
  ),
  localized(
    "culture-festivals-arts-contemporary", "culture", "festivals-arts-contemporary",
    { label: "Festivals, arts and contemporary life", title: "See living traditions and contemporary China in context", description: "Performances, craft, festivals, technology and popular culture explained as changing practices rather than frozen spectacles." },
    { label: "节庆、艺术与当代生活", title: "在真实语境中理解活态传统与当代中国", description: "把表演、工艺、节庆、科技与流行文化写成持续变化的实践，而不是静止的奇观。" },
    { label: "축제·예술·현대생활", title: "살아 있는 전통과 현대 중국을 맥락 속에서 보기", description: "공연과 공예, 축제와 기술, 대중문화를 고정된 구경거리가 아니라 변화하는 실천으로 설명합니다." },
  ),
  localized(
    "tools-route-time", "tools", "route-time",
    { label: "Route and time tools", title: "Route and time tools are being verified", description: "This future collection will test transfer load, usable sightseeing time and route order. It remains outside search results until its data and limits are verified." },
    { label: "路线与时间工具", title: "路线与时间工具仍在核验中", description: "这个未来集合将检查转场压力、可用游览时间与城市顺序；数据与边界核验完成前不会进入搜索结果。" },
    { label: "경로와 시간 도구", title: "경로·시간 도구를 검증하고 있습니다", description: "이 향후 모음은 이동 부담과 실제 관광 시간, 도시 순서를 점검합니다. 데이터와 한계를 확인하기 전에는 검색 결과에 공개하지 않습니다." },
  ),
  localized(
    "tools-area-option-selectors", "tools", "area-option-selectors",
    { label: "Area and option selectors", title: "Narrow a complex choice to the options that fit", description: "Selectors for hotel bases, terminals and travel styles will live here once each result can be explained and audited." },
    { label: "区域与选项选择器", title: "把复杂选择缩小到真正适合的几个选项", description: "住宿基地、交通枢纽与旅行方式选择器会在每个结果都能解释和审计后进入这里。" },
    { label: "지역·옵션 선택기", title: "복잡한 선택을 실제로 맞는 후보로 좁히기", description: "숙박 거점과 터미널, 여행 방식 선택기는 각 결과를 설명하고 검증할 수 있을 때 공개합니다." },
  ),
  localized(
    "tools-maps-calculators-reference", "tools", "maps-calculators-reference",
    { label: "Maps, calculators and reference", title: "Use structured China travel information directly", description: "Maps, calculators and reference datasets belong here when they solve a task more clearly than another long article." },
    { label: "地图、计算器与资料库", title: "直接使用结构化的中国旅行信息", description: "当地图、计算器或资料库比长文章更清楚地解决问题时，它们会进入这里。" },
    { label: "지도·계산기·자료", title: "구조화된 중국 여행 정보를 직접 사용하기", description: "긴 글보다 지도와 계산기, 참고 데이터가 문제를 더 분명히 해결할 때 이곳에 공개합니다." },
  ),
  localized(
    "services-guides-experiences", "services", "guides-experiences",
    { label: "Private guides and experiences", title: "Decide where a private guide changes the day", description: "Local interpretation and guided experiences matched to the place and traveller, not added automatically to every stop." },
    { label: "私人导游与体验", title: "判断哪些地方真正值得请私人导游", description: "按目的地与旅行者需要加入讲解和体验，而不是每一站都自动安排导游。" },
    { label: "개인 가이드와 체험", title: "개인 가이드가 하루를 실제로 바꾸는 곳 판단하기", description: "모든 장소에 자동으로 가이드를 붙이지 않고 장소와 여행자에게 필요한 해설과 체험을 연결합니다." },
  ),
  localized(
    "services-transfers-hotels-bookings", "services", "transfers-hotels-bookings",
    { label: "Transfers, hotels and booking support", title: "Add local support at the difficult handoffs", description: "Help with transfers, hotel selection and booking problems where verification and local communication reduce real risk." },
    { label: "接送、住宿与预订协助", title: "在最容易出问题的衔接处加入本地支持", description: "只在核验与本地沟通确实能降低风险时，提供接送、酒店选择与预订协助。" },
    { label: "이동·숙소·예약 지원", title: "문제가 생기기 쉬운 연결 지점에 현지 지원 더하기", description: "확인과 현지 소통이 실제 위험을 줄이는 경우에 이동과 숙소 선택, 예약 문제를 지원합니다." },
  ),
  localized(
    "services-route-whole-trip", "services", "route-whole-trip",
    { label: "Route design and whole-trip support", title: "Keep one planning thread across the whole journey", description: "Whole-trip coordination for travellers who need cities, transport, pace and local delivery to work as one plan." },
    { label: "路线设计与全程协助", title: "让整趟旅行始终由一条规划主线连接", description: "为需要把城市、交通、节奏与当地执行放进同一套方案的旅行者提供全程协调。" },
    { label: "경로 설계와 전체 여행 지원", title: "여행 전체를 하나의 계획 흐름으로 연결하기", description: "도시와 교통, 속도와 현지 진행을 하나의 계획으로 묶어야 하는 여행자를 위한 전체 일정 조율입니다." },
  ),
] as const;

const byId = new Map(searchCollections.map((collection) => [collection.id, collection]));

const guideCollectionOverrides: Partial<Record<GuideId, SearchCollectionId>> = {
  "zhangjiajie-itinerary": "plan-trip-length-city-order",
  "zhangjiajie-from-malaysia": "plan-traveller-theme-itineraries",
  "zhangjiajie-glass-bridge-vs-skywalk": "explore-attractions-nature-heritage",
  "zhangjiajie-national-forest-park-tickets-and-entrances": "explore-attractions-nature-heritage",
  "kevin-before-the-hotel-pickup": "essentials-booking-registration-recovery",
  "zhangjiajie-older-travellers": "plan-traveller-theme-itineraries",
  "best-zhangjiajie-night-show": "explore-attractions-nature-heritage",
  "beijing-zhangjiajie-shanghai-10-days": "plan-trip-length-city-order",
  "beijing-zhangjiajie-shanghai-transport": "transport-city-pair-routes",
  "is-your-china-itinerary-too-rushed": "plan-budget-pace-decisions",
  "china-itinerary-with-older-parents": "plan-traveller-theme-itineraries",
  "do-us-citizens-need-visa-china-2026": "essentials-entry-transit",
  "china-visa-free-uk-citizens-2026": "essentials-entry-transit",
  "china-visa-free-canadian-citizens-2026": "essentials-entry-transit",
  "china-visa-free-new-zealand-citizens-2026": "essentials-entry-transit",
  "china-240-hour-visa-free-transit-route-check": "essentials-entry-transit",
  "china-online-arrival-card": "essentials-entry-transit",
  "do-singaporeans-need-visa-china": "essentials-entry-transit",
  "why-are-hotels-in-china-so-cheap": "stay-hotel-types-scenic-bases",
  "do-you-need-a-tour-guide-in-china": "services-guides-experiences",
  "how-much-does-a-china-trip-cost": "plan-budget-pace-decisions",
  "china-domestic-flight-fare-bundle-baggage": "plan-budget-pace-decisions",
  "china-separate-flight-tickets-self-transfer-risk": "plan-budget-pace-decisions",
  "chengdu-greenway-city-ring": "explore-cities-neighborhoods",
  "china-tiankeng-sinkholes-explained": "explore-attractions-nature-heritage",
  "wenchang-commercial-space-city": "explore-cities-neighborhoods",
  "yiwu-market-to-factory-network": "explore-cities-neighborhoods",
  "china-booking-dispute-evidence-pack": "essentials-booking-registration-recovery",
  "china-domestic-flight-schedule-change": "essentials-booking-registration-recovery",
  "china-customs-red-green-channels": "essentials-entry-transit",
  "china-passport-validity-and-blank-pages": "essentials-entry-transit",
  "food-plants-and-animal-products-into-china": "essentials-entry-transit",
  "hong-kong-macau-mainland-reentry-count": "essentials-entry-transit",
  "lost-passport-in-china-exit-recovery": "essentials-entry-transit",
  "official-or-reseller-china-tickets": "essentials-booking-registration-recovery",
  "passport-name-across-china-bookings": "essentials-booking-registration-recovery",
  "beijing-xian-chengdu-route-order": "plan-trip-length-city-order",
  "china-arrival-day-booked-anchor-or-flexible-block": "plan-budget-pace-decisions",
  "china-hub-and-spoke-or-multi-base-route": "plan-trip-length-city-order",
  "china-last-night-before-international-flight": "plan-budget-pace-decisions",
  "china-night-train-or-daytime-high-speed-rail": "plan-budget-pace-decisions",
  "china-open-jaw-flights-route-planning": "plan-trip-length-city-order",
  "china-private-transfer-or-public-transport": "plan-budget-pace-decisions",
  "china-rail-only-route": "plan-trip-length-city-order",
  "china-regional-food-route": "plan-traveller-theme-itineraries",
  "guangzhou-shenzhen-hong-kong-route-order": "plan-trip-length-city-order",
  "kunming-dali-lijiang-shangri-la-route-order": "plan-trip-length-city-order",
  "shanghai-suzhou-hangzhou-nanjing-route-order": "plan-trip-length-city-order",
  "china-hotel-near-metro": "stay-city-areas",
  "huangshan-summit-or-gateway-base": "stay-hotel-types-scenic-bases",
  "zhangjiajie-city-or-wulingyuan-hotel-base": "stay-hotel-types-scenic-bases",
  "yangshuo-town-or-yulong-river-where-to-stay": "stay-hotel-types-scenic-bases",
  "china-climate-regions-for-trip-timing": "timing-months-seasons",
  "china-in-october-golden-week-or-later": "timing-holidays-crowds",
  "china-public-holidays-travel-calendar": "timing-holidays-crowds",
  "china-shoulder-season-value-tradeoff": "timing-months-seasons",
  "china-high-speed-train-first-time-guide": "transport-airports-rail-hubs",
  "china-itinerary-with-young-children": "plan-traveller-theme-itineraries",
  "wheelchair-accessible-china-route-planning": "plan-traveller-theme-itineraries",
};

export function getSearchCollection(id: SearchCollectionId) {
  const collection = byId.get(id);
  if (!collection) throw new Error(`Unknown search collection: ${id}`);
  return collection;
}

export function getGuideCollectionId(guide: GuideEntry): SearchCollectionId {
  const override = guideCollectionOverrides[guide.id];
  const collectionId = override ?? (
    byId.has(guide.pillar as SearchCollectionId)
      ? guide.pillar as SearchCollectionId
      : null
  );

  if (!collectionId) {
    throw new Error(`Guide ${guide.id} has no reviewed search collection assignment.`);
  }

  const collection = getSearchCollection(collectionId);
  if (guide.search && guide.search.section !== collection.section) {
    throw new Error(
      `Guide ${guide.id} is classified in section ${guide.search.section} but its reviewed collection ${collection.id} belongs to ${collection.section}.`,
    );
  }

  return collectionId;
}

export function getSearchCollectionPath(
  collection: SearchCollectionDefinition,
  locale: HomegroundLocale,
) {
  const prefix = locale === "en" ? "" : `/${locale}`;
  return `${prefix}/${collection.section}/${collection.slug}/`;
}

export function getSearchCollectionBySegments(section: string, slug: string) {
  return searchCollections.find(
    (collection) => collection.section === section && collection.slug === slug,
  );
}

export function getSearchCollectionLanguagePaths(id: SearchCollectionId) {
  const collection = getSearchCollection(id);
  return Object.fromEntries(
    (["en", "zh", "ko"] as const).map((locale) => [
      locale,
      getSearchCollectionPath(collection, locale),
    ]),
  ) as Record<HomegroundLocale, string>;
}
