import type {
  LocalizedStringList,
  LocalizedText,
  PrivateTourDay,
  PrivateTourImage,
  PrivateTourPriceTier,
  PrivateTourProduct,
} from "./privateTourProducts";

const l = (en: string, zh: string, ko: string): LocalizedText => ({ en, zh, ko });
const lists = (
  en: readonly string[],
  zh: readonly string[],
  ko: readonly string[],
): LocalizedStringList => ({ en, zh, ko });
const day = (
  dayNumber: number,
  title: LocalizedText,
  description: LocalizedText,
): PrivateTourDay => ({ day: dayNumber, title, description });

const servicePolicy = Object.freeze({
  shoppingStops: false,
  addedServicesRequirePriorAgreement: true,
} as const);

const PUBLISHED = "2026-09-21";
const MODIFIED = "2026-09-21";

const packageLabel = l(
  "Private tour package",
  "私家团标准版",
  "한국어 가이드 포함",
);

const packageSummary = l(
  "Private transport, the listed guide service, transfers, admissions and accommodation are supplied only as named in the written booking confirmation. No shopping stops.",
  "私车、导游服务、接送、门票与住宿只按书面确认单列明范围提供，无购物店安排。",
  "전용 차량, 가이드 서비스, 이동, 입장권과 숙박은 서면 예약 확인서에 명시된 범위로만 제공되며 쇼핑 일정은 없습니다.",
);

const standardPackage = (
  prices: readonly PrivateTourPriceTier[],
) => ({
  id: "standard-guided",
  guideMode: "standard" as const,
  label: packageLabel,
  summary: packageSummary,
  ...(prices.length === 0 ? { quoteOnly: true as const } : {}),
  prices,
});

const image = (
  slug: string,
  file: "hero.webp" | "gallery-1.webp" | `route-day-${number}.webp`,
  width: number,
  height: number,
  alt: LocalizedText,
  caption: LocalizedText,
  objectPosition = "50% 50%",
): PrivateTourImage => ({
  src: `/images/tours/${slug}/${file}`,
  width,
  height,
  objectPosition,
  alt,
  caption,
});

const commonExclusions = (
  en: readonly string[],
  zh: readonly string[],
  ko: readonly string[],
) => lists(
  [
    "International and domestic flights, and any intercity transport not named in the written confirmation",
    "Lunches, dinners and drinks unless a specific meal is listed",
    "Travel insurance, visas, tips and personal expenses",
    "Single-room supplements, room upgrades and holiday surcharges",
    ...en,
  ],
  [
    "国际及中国境内航班，以及书面确认单未列明的跨城交通",
    "午餐、晚餐和饮料，逐日明确列出的餐食除外",
    "旅行保险、签证、司导小费及个人消费",
    "单房差、房型升级及节假日附加费",
    ...zh,
  ],
  [
    "국제선·중국 국내선 항공편 및 서면 확인서에 명시되지 않은 도시 간 교통",
    "일정에 특정 식사가 명시된 경우를 제외한 중식·석식·음료",
    "여행자 보험, 비자, 기사·가이드 팁 및 개인 경비",
    "1인실 추가금, 객실 업그레이드 및 공휴일 추가금",
    ...ko,
  ],
);

const pricingNote = l(
  "Published amounts are per-person starting prices for the stated group size and base scope. Send your dates, rooming, arrival details and luggage count; hotels, transport, guide language, seasonal supplements and the final total are confirmed in writing before payment.",
  "页面数字为对应人数与基础服务范围的每人起价。请提供日期、房间配置、到离信息和行李数量；酒店、交通、导游语种、旺季附加费与最终总价会在付款前书面确认。",
  "표시 금액은 명시된 인원과 기본 서비스 범위의 1인 시작가입니다. 날짜, 객실 구성, 도착·출발 정보와 수하물 수량을 보내 주시면 호텔, 교통, 가이드 언어, 성수기 추가금과 최종 금액을 결제 전에 서면으로 확인합니다.",
);

const quoteNote = l(
  "This is an enquiry-only route. We prepare the quote after the travel date and live inventory are checked. Send your dates, rooming, arrival details and luggage count; we confirm the operating route, hotels, transport, guide language and final total in writing before payment.",
  "这条路线须按出发日期与实时库存报价。请提供日期、房间配置、到离信息和行李数量；我们会在付款前书面确认实际运行路线、酒店、交通、导游语种与最终总价。",
  "이 일정은 출발일과 실시간 재고를 확인한 뒤 견적을 드립니다. 날짜, 객실 구성, 도착·출발 정보와 수하물 수량을 보내 주시면 실제 운행 일정, 호텔, 교통, 가이드 언어와 최종 금액을 결제 전에 서면으로 확인합니다.",
);

const classicChinaBookingNote = l(
  "Published amounts are per-person starting prices for the stated group size and base scope. After the route and dates are agreed, we request each traveller's full passport name, passport number, expiry date and date of birth before the Forbidden City and Terracotta Warriors ticket windows open. Ticket inventory and the final total are confirmed in writing before payment.",
  "页面数字为对应人数与基础服务范围的每人起价。路线与日期确定后，我们会在故宫与兵马俑门票开放前收集每位客人的护照姓名、护照号码、有效期与出生日期；门票库存和最终总价会在付款前书面确认。",
  "표시 금액은 명시된 인원과 기본 서비스 범위의 1인 시작가입니다. 일정과 날짜를 정한 뒤 자금성과 병마용 발권 전에 각 여행자의 여권상 성명, 여권 번호, 만료일과 생년월일을 요청합니다. 입장권 재고와 최종 금액은 결제 전에 서면으로 확인합니다.",
);

const shanghaiDisneySlug = "shanghai-disneyland-5-day-private-tour";
const shanghaiDisney: PrivateTourProduct = {
  id: "private-tour-shanghai-disneyland-5d4n",
  slug: shanghaiDisneySlug,
  days: 5,
  nights: 4,
  servicePolicy,
  title: l(
    "Shanghai & Disneyland: 5-Day Private Tour",
    "上海与迪士尼 5 天 4 晚私家团",
    "상하이·디즈니랜드 5일 프라이빗 투어",
  ),
  metadataTitle: l(
    "Shanghai Disneyland Private Tour: 5 Days",
    "上海迪士尼5天私家团",
    "상하이 디즈니랜드 5일 프라이빗 투어",
  ),
  metadataDescription: l(
    "Five days in one Shanghai hotel with a full Disneyland day, private transfers and two light city touring days. Date-based quote only.",
    "上海同一家酒店连住 4 晚，安排迪士尼完整一天、专车接送与两段轻松城市游览；按日期询价。",
    "상하이 한 호텔에서 4박하며 디즈니랜드 종일 일정, 전용 이동과 가벼운 도심 관광 이틀을 담았습니다.",
  ),
  eyebrow: l(
    "One Shanghai hotel, one full park day and room to breathe",
    "上海同一家酒店连住，迪士尼留足一天",
    "상하이 한 호텔, 디즈니랜드 하루, 여유 있는 흐름",
  ),
  lede: l(
    "Keep one Shanghai base, see the Bund and old city at a comfortable pace, devote a full day to Shanghai Disneyland and leave one lighter day for neighbourhoods and free time.",
    "上海同一家酒店连住，以从容节奏看外滩与老城，把完整一天留给迪士尼，再用一天轻松逛街区并保留自由时间。",
    "상하이 한 호텔에 머물며 와이탄과 구시가를 여유롭게 보고, 디즈니랜드에 하루를 온전히 쓰고, 하루는 동네 산책과 자유 시간으로 남깁니다.",
  ),
  summary: l(
    "Four breakfast-included nights in Shanghai, private airport or station transfers, guided city touring on Days 2 and 4, and round-trip Disneyland transport. Park tickets are confirmed against the date-based official calendar.",
    "上海 4 晚含早，包含机场或车站接送、第 2 与第 4 天城市导游服务及迪士尼往返用车；乐园门票按官方日期票价确认。",
    "상하이 4박 조식, 공항·역 이동, 2일·4일 차 도심 가이드와 디즈니랜드 왕복 차량을 포함하며 입장권은 공식 날짜별 요금으로 확인합니다.",
  ),
  highlights: lists(
    ["One Shanghai hotel for all four nights", "A full day for Shanghai Disneyland", "The Bund and Yu Garden without rushing", "A lighter neighbourhood day with free time"],
    ["上海同一家酒店连住 4 晚", "迪士尼安排完整一天", "外滩与豫园不赶场", "街区轻旅行并保留自由时间"],
    ["상하이 한 호텔에서 4박", "디즈니랜드 종일 일정", "와이탄과 예원을 여유롭게", "동네 산책과 자유 시간"],
  ),
  itinerary: [
    day(1, l("Arrive in Shanghai", "抵达上海", "상하이 도착"), l("Meet the driver at the confirmed airport or station and transfer to the hotel. No fixed sightseeing is planned, protecting the day from flight or train delays.", "在已确认的机场或车站接站，私车送往酒店。当天不安排固定景点，为航班或列车延误留出余量。", "확정된 공항 또는 역에서 기사를 만나 호텔로 이동합니다. 항공편이나 열차 지연에 대비해 고정 관광은 넣지 않습니다.")),
    day(2, l("The Bund, Yu Garden and the old city", "外滩、豫园与老城", "와이탄·예원·구시가"), l("Explore the Bund, Yu Garden and nearby old-city lanes with a private guide. The exact order is adjusted to reservation times, traffic and walking pace.", "在私人导游陪同下游览外滩、豫园与周边老城街巷，具体顺序按预约时段、交通与步行节奏调整。", "전용 가이드와 와이탄, 예원과 주변 구시가 골목을 둘러보며 예약 시간, 교통과 걷는 속도에 맞춰 순서를 조정합니다.")),
    day(3, l("Shanghai Disneyland", "上海迪士尼完整一天", "상하이 디즈니랜드 종일"), l("Private transfer to and from Shanghai Disneyland. Park admission is booked only after the travel date and passport details are confirmed; the day is otherwise self-paced inside the park.", "专车往返上海迪士尼。确认出发日期与护照信息后购买日期票，入园后以自由游玩为主。", "전용 차량으로 디즈니랜드를 왕복합니다. 날짜와 여권 정보를 확인한 뒤 날짜 지정권을 예약하며, 입장 후에는 자유 일정입니다.")),
    day(4, l("Former French Concession and free afternoon", "梧桐街区与自由下午", "프랑스 조계지 산책과 자유 오후"), l("Take a gentle guided walk through a confirmed former French Concession neighbourhood, then keep the afternoon free for shopping, a museum reservation or rest.", "在已确认的梧桐街区轻松步行，下午保留给购物、预约博物馆或休息。", "확정된 프랑스 조계지 동네를 가볍게 걷고 오후는 쇼핑, 박물관 예약 또는 휴식에 씁니다.")),
    day(5, l("Depart Shanghai", "上海送机或送站", "상하이 출발"), l("Check out and transfer by private vehicle to the confirmed airport or railway station. No sightseeing is fixed on departure day.", "退房后乘私车前往已确认的机场或车站，返程日不安排固定游览。", "체크아웃 후 전용 차량으로 확정된 공항 또는 역에 이동하며 출발일에는 고정 관광이 없습니다.")),
  ],
  hotelNote: l("Four nights in one breakfast-included Shanghai hotel, twin sharing. The exact hotel, room type, child bedding and single supplement are confirmed before payment.", "上海同一家含早酒店连住 4 晚，默认双人同住；具体酒店、房型、儿童占床与单房差在付款前确认。", "상하이의 조식 포함 호텔 한 곳에서 4박, 2인 1실 기준입니다. 호텔, 객실, 어린이 침대와 1인실 추가금은 결제 전에 확인합니다."),
  serviceNote: l("Days 2 and 4 include a private English-speaking guide and vehicle. Day 3 includes round-trip private transport but no in-park guide unless separately confirmed.", "第 2 与第 4 天包含私人英语导游与用车；第 3 天包含迪士尼往返专车，园内导游须另行确认。", "2일·4일 차는 한국어 가이드와 전용 차량을 포함합니다. 3일 차는 디즈니랜드 왕복 차량을 포함하며, 파크 안 가이드는 별도 확인이 필요합니다."),
  exclusions: commonExclusions(["Disney Premier Access, paid shows and in-park meals unless listed"], ["迪士尼尊享卡、收费演出与园内餐食，确认单列明的除外"], ["디즈니 프리미어 액세스, 유료 공연과 파크 내 식사(확인서에 명시된 경우 제외)"]),
  bookingNote: quoteNote,
  heroImage: image(shanghaiDisneySlug, "hero.webp", 1600, 899, l("Enchanted Storybook Castle at Shanghai Disneyland", "上海迪士尼奇幻童话城堡", "상하이 디즈니랜드 스토리북 성"), l("Disneyland receives a full day; tickets are tied to the confirmed visit date.", "迪士尼安排完整一天，门票与已确认日期绑定。", "디즈니랜드에는 하루를 온전히 쓰며 입장권은 확정 날짜에 맞춰 예약합니다.")),
  gallery: [image(shanghaiDisneySlug, "gallery-1.webp", 1600, 1067, l("Shanghai skyline from the Bund", "从外滩看上海天际线", "와이탄에서 본 상하이 스카이라인"), l("The city days keep the Bund and neighbourhoods separate from the full park day.", "城市游览与迪士尼完整一天分开安排。", "도심 일정은 디즈니랜드 종일 일정과 나누어 구성합니다."))],
  routeMedia: [{ day: 2, variants: [{ label: l("Yu Garden", "豫园", "예원"), image: image(shanghaiDisneySlug, "route-day-3.webp", 1600, 1068, l("Traditional buildings and pond in Yu Garden", "豫园传统建筑与池塘", "예원의 전통 건축과 연못"), l("Yu Garden is visited with the old city on the guided Shanghai day.", "豫园与老城安排在上海导游日。", "예원은 상하이 가이드 일정에 구시가와 함께 방문합니다.")) }] }],
  packages: [standardPackage([])],
  datePublished: PUBLISHED,
  dateModified: MODIFIED,
};

const henanSlug = "luoyang-dengfeng-kaifeng-6-day-private-tour";
const henan: PrivateTourProduct = {
  id: "private-tour-luoyang-dengfeng-kaifeng-6d5n",
  slug: henanSlug,
  days: 6,
  nights: 5,
  servicePolicy,
  title: l("Luoyang, Dengfeng & Kaifeng: 6-Day Private Tour", "洛阳·登封·开封 6 天 5 晚私家团", "뤄양·덩펑·카이펑 6일 프라이빗 투어"),
  metadataTitle: l("Henan Heritage Private Tour: 6 Days", "河南洛阳登封开封6天私家团", "허난 뤄양·덩펑·카이펑 6일 투어"),
  metadataDescription: l("A six-day Henan private route linking Kaifeng, Shaolin Temple and Longmen Grottoes with five hotel nights, private transport and guide service.", "河南 6 天私家路线，串联开封、少林寺与龙门石窟，含 5 晚住宿、私车与导游服务。", "카이펑, 소림사와 용문석굴을 잇는 허난 6일 프라이빗 일정으로 5박, 전용 차량과 가이드가 포함됩니다."),
  eyebrow: l("Three historic capitals, one route without backtracking", "三座古都顺路串联，尽量不折返", "세 역사 도시를 되돌아가지 않고 연결"),
  lede: l("Enter through Zhengzhou, give Kaifeng one full day, cross Dengfeng for Shaolin Temple and finish with two substantial Luoyang touring days.", "从郑州进入，给开封一个完整游览日，经登封看少林寺，最后用两个充足的游览日看洛阳。", "정저우로 들어와 카이펑에 하루를 쓰고 덩펑 소림사를 거쳐 뤄양에서 이틀간 핵심 유적을 봅니다."),
  summary: l("Five breakfast-included nights: one in Zhengzhou, one in Kaifeng and three in Luoyang. Private guide and vehicle service runs on Days 2–5.", "共 5 晚含早：郑州 1 晚、开封 1 晚、洛阳 3 晚；第 2–5 天安排私人导游与用车。", "조식 포함 5박으로 정저우 1박, 카이펑 1박, 뤄양 3박이며 2~5일 차에 전용 가이드와 차량을 제공합니다."),
  highlights: lists(["Longmen Grottoes with time to walk the site", "Shaolin Temple and Pagoda Forest", "A full Kaifeng heritage day", "One-way flow from Zhengzhou to Luoyang"], ["龙门石窟留足步行时间", "少林寺与塔林", "开封完整人文游览日", "郑州进、洛阳出减少折返"], ["용문석굴을 충분히 걷는 일정", "소림사와 탑림", "카이펑 역사 문화 종일 일정", "정저우에서 뤄양으로 이어지는 동선"]),
  itinerary: [
    day(1, l("Arrive in Zhengzhou", "抵达郑州", "정저우 도착"), l("Meet the driver at the confirmed airport or station and transfer to the Zhengzhou hotel. No fixed sightseeing is planned.", "在已确认的机场或车站接站，私车送往郑州酒店，当天不安排固定景点。", "확정된 공항 또는 역에서 기사를 만나 정저우 호텔로 이동하며 고정 관광은 없습니다.")),
    day(2, l("Kaifeng's Song-dynasty heritage", "开封宋文化游览", "카이펑 송대 문화"), l("Drive to Kaifeng for the confirmed old-city circuit, including Kaifeng Prefecture or Qingming Riverside Landscape Garden according to the written booking, then stay overnight in Kaifeng.", "前往开封，按书面确认游览开封府或清明上河园等老城线路，并在开封住一晚。", "카이펑으로 이동해 서면 확인에 따라 개봉부 또는 청명상하원 중심의 구시가 일정을 진행하고 카이펑에서 숙박합니다.")),
    day(3, l("Dengfeng and Shaolin Temple", "登封与少林寺", "덩펑과 소림사"), l("Travel via Dengfeng to Shaolin Temple and Pagoda Forest. Continue to Luoyang after the visit; any martial-arts performance is subject to the operating timetable.", "经登封游览少林寺与塔林，结束后前往洛阳；武术表演以当天运行时刻为准。", "덩펑 소림사와 탑림을 둘러본 뒤 뤄양으로 이동합니다. 무술 공연은 당일 운영 시간표에 따릅니다.")),
    day(4, l("Longmen Grottoes", "龙门石窟", "용문석굴"), l("Give Longmen Grottoes the main part of the day, using the operating visitor route and shuttle plan. Finish with a measured old-town walk if time and energy allow.", "把当天主要时间留给龙门石窟，按开放游线与景区接驳安排参观；时间与体力允许时再走洛阳老城。", "용문석굴에 하루의 중심을 두고 운영 중인 관람 동선과 셔틀을 이용합니다. 시간과 체력이 되면 뤄양 구시가를 걷습니다.")),
    day(5, l("White Horse Temple and Luoyang", "白马寺与洛阳", "백마사와 뤄양"), l("Visit White Horse Temple and one confirmed Luoyang museum or city stop. Museum closures and reservations are checked against the travel date.", "游览白马寺，并安排一处已确认的洛阳博物馆或城市景点；闭馆日与预约按出发日期核对。", "백마사와 확정된 뤄양 박물관 또는 도심 명소 한 곳을 방문하며 휴관일과 예약은 여행 날짜에 맞춰 확인합니다.")),
    day(6, l("Depart Luoyang or Zhengzhou", "洛阳或郑州送站", "뤄양 또는 정저우 출발"), l("Transfer to the confirmed Luoyang station or Zhengzhou airport. The longer Zhengzhou airport transfer is timed only after the departure schedule is known.", "送往已确认的洛阳车站或郑州机场；郑州机场长距离接送须在确认返程班次后安排。", "확정된 뤄양역 또는 정저우공항으로 이동하며 정저우공항 장거리 이동은 출발 편이 정해진 뒤 시간을 확정합니다.")),
  ],
  hotelNote: l("Five breakfast-included nights, twin sharing: Zhengzhou 1, Kaifeng 1 and Luoyang 3. Exact four-star standard hotels and room types are confirmed before payment.", "共 5 晚含早，默认双人同住：郑州 1 晚、开封 1 晚、洛阳 3 晚；具体 4 星标准酒店与房型在付款前确认。", "조식 포함 5박, 2인 1실 기준으로 정저우 1박, 카이펑 1박, 뤄양 3박입니다. 4성급 기준 호텔과 객실은 결제 전에 확인합니다."),
  serviceNote: l("Days 2–5 include a private English-speaking guide, driver, vehicle and the first admissions named in the written itinerary. Korean pages use a Korean-speaking guide at the same base price, subject to date availability.", "第 2–5 天包含私人英语导游、司机、用车及书面行程列明的首道门票；具体语种按订单确认。", "2~5일 차에는 한국어 가이드, 기사, 전용 차량과 서면 일정에 명시된 첫 입장권을 포함합니다. 한국어 가이드는 같은 기본 가격으로 날짜별 가능 여부를 확인합니다."),
  exclusions: commonExclusions(["Optional performances, night shows and battery-car upgrades not listed"], ["确认单未列明的自选演出、夜游与电瓶车升级"], ["확인서에 명시되지 않은 선택 공연, 야간 관람과 전동차 업그레이드"]),
  bookingNote: pricingNote,
  heroImage: image(henanSlug, "hero.webp", 1600, 1200, l("Buddhist carvings at Longmen Grottoes", "龙门石窟佛教造像", "용문석굴 불상"), l("Longmen receives the main part of Day 4 rather than a short photo stop.", "第 4 天把主要时间留给龙门石窟，而不是匆匆打卡。", "4일 차에는 용문석굴을 짧은 사진 정류장이 아니라 핵심 일정으로 봅니다.")),
  gallery: [image(henanSlug, "gallery-1.webp", 800, 1200, l("Shaolin Temple complex", "少林寺建筑", "소림사 경내"), l("Shaolin Temple and Pagoda Forest are visited while crossing Dengfeng.", "经登封前往洛阳时游览少林寺与塔林。", "덩펑을 지나며 소림사와 탑림을 방문합니다."))],
  routeMedia: [{ day: 2, variants: [{ label: l("Kaifeng", "开封", "카이펑"), image: image(henanSlug, "route-day-5.webp", 1600, 1067, l("Historic gate in Kaifeng", "开封古城门", "카이펑 옛 성문"), l("Kaifeng is given a full touring day and one overnight stay.", "开封安排完整游览日并住一晚。", "카이펑에는 종일 관광과 1박을 배정합니다.")) }] }],
  packages: [standardPackage([{ travelers: 2, cnyPerPerson: 8980, usdPerPerson: 1390 }, { travelers: 4, cnyPerPerson: 6480, usdPerPerson: 1000 }, { travelers: 6, cnyPerPerson: 6280 }])],
  datePublished: PUBLISHED,
  dateModified: MODIFIED,
};

const shanxiSlug = "datong-pingyao-6-day-private-tour";
const shanxi: PrivateTourProduct = {
  id: "private-tour-datong-pingyao-6d5n",
  slug: shanxiSlug,
  days: 6,
  nights: 5,
  servicePolicy,
  title: l("Datong & Pingyao: 6-Day Private Tour", "大同·平遥 6 天 5 晚私家团", "다퉁·핑야오 6일 프라이빗 투어"),
  metadataTitle: l("Datong & Pingyao Private Tour: 6 Days", "大同平遥6天私家团", "다퉁·핑야오 6일 프라이빗 투어"),
  metadataDescription: l("Six days from Datong to Pingyao and Taiyuan with Yungang Grottoes, Hanging Temple, five hotel nights, private vehicle and guide service.", "从大同经悬空寺到平遥与太原的 6 天私家路线，含云冈石窟、5 晚住宿、私车与导游服务。", "다퉁에서 현공사, 핑야오와 타이위안으로 이어지는 6일 일정으로 운강석굴, 5박, 전용 차량과 가이드를 포함합니다."),
  eyebrow: l("Datong in, Taiyuan out, with Pingyao in between", "大同进、太原出，中间连住平遥", "다퉁에서 시작해 핑야오를 거쳐 타이위안으로"),
  lede: l("Start with Yungang and Datong's old city, cross south via Hanging Temple and Yingxian, stay two nights in Pingyao and finish in Taiyuan without driving back north.", "先看云冈石窟与大同古城，经悬空寺和应县一路向南，在平遥连住两晚，最后从太原离开，不再向北折返。", "운강석굴과 다퉁 구시가에서 시작해 현공사와 잉셴을 거쳐 남쪽으로 이동하고 핑야오 2박 후 타이위안에서 마칩니다."),
  summary: l("Five breakfast-included nights: Datong 2, Pingyao 2 and Taiyuan 1. Private guide and vehicle service operates on Days 2–6 as the departure time allows.", "共 5 晚含早：大同 2 晚、平遥 2 晚、太原 1 晚；第 2–6 天按返程时间安排私人导游与用车。", "조식 포함 5박으로 다퉁 2박, 핑야오 2박, 타이위안 1박이며 출발 시간에 맞춰 2~6일 차에 전용 가이드와 차량을 제공합니다."),
  highlights: lists(["Yungang Grottoes with a full morning", "Hanging Temple on the southbound transfer", "Two nights inside or beside Pingyao", "Taiyuan departure avoids a return drive"], ["云冈石窟安排完整上午", "南下转场途中看悬空寺", "平遥古城内外连住两晚", "太原离开避免折返"], ["운강석굴에 충분한 오전 시간", "남쪽 이동 중 현공사 방문", "핑야오에서 2박", "타이위안 출발로 되돌아가지 않는 동선"]),
  itinerary: [
    day(1, l("Arrive in Datong", "抵达大同", "다퉁 도착"), l("Meet the driver at the confirmed airport or railway station and transfer to the Datong hotel.", "在已确认的大同机场或车站接站，私车送往酒店。", "확정된 다퉁 공항 또는 역에서 기사를 만나 호텔로 이동합니다.")),
    day(2, l("Yungang Grottoes and Datong old city", "云冈石窟与大同古城", "운강석굴과 다퉁 구시가"), l("Spend the morning at Yungang Grottoes, then visit the confirmed old-city sites such as Huayan Temple and Nine-Dragon Screen. Site order follows opening hours and crowd controls.", "上午游览云冈石窟，下午按确认安排华严寺、九龙壁等古城景点；顺序随开放时间与客流调整。", "오전에는 운강석굴, 오후에는 화엄사와 구룡벽 등 확정된 구시가 명소를 둘러보며 운영 시간과 혼잡에 맞춰 순서를 조정합니다.")),
    day(3, l("Hanging Temple and Yingxian to Pingyao", "悬空寺、应县与平遥", "현공사·잉셴을 거쳐 핑야오"), l("Drive south for Hanging Temple and the confirmed Yingxian stop, then continue to Pingyao. Access to elevated temple sections depends on the site's same-day controls.", "一路向南游览悬空寺与已确认的应县景点，再前往平遥；悬空寺高处区域能否进入以当天管控为准。", "남쪽으로 이동해 현공사와 확정된 잉셴 명소를 본 뒤 핑야오로 갑니다. 현공사 상부 구역 입장은 당일 통제에 따릅니다.")),
    day(4, l("Pingyao Ancient City", "平遥古城完整一天", "핑야오고성 종일"), l("Walk Pingyao's city wall, courtyards, lanes and one confirmed financial-house museum with the guide. The day is kept in one compact area rather than adding another long drive.", "在导游陪同下游览平遥城墙、院落、街巷与一处已确认的票号博物馆，不再增加长距离转场。", "가이드와 핑야오 성벽, 안뜰, 골목과 확정된 표호 박물관 한 곳을 둘러보며 장거리 이동은 넣지 않습니다.")),
    day(5, l("Shanxi courtyard and Taiyuan", "晋商大院与太原", "산시 상인 저택과 타이위안"), l("Leave Pingyao for one confirmed merchant-family courtyard, then continue to Taiyuan for the final night. The exact courtyard is fixed in the written itinerary.", "离开平遥，游览一处书面确认的晋商大院，再前往太原住最后一晚。", "핑야오를 떠나 서면 일정에 확정된 산시 상인 저택 한 곳을 보고 타이위안에서 마지막 밤을 보냅니다.")),
    day(6, l("Jinci and departure", "晋祠与返程", "진사와 출발"), l("Visit Jinci only when the confirmed departure time leaves a safe buffer, then transfer to Taiyuan airport or railway station.", "只有在返程班次留有安全余量时才安排晋祠，随后送往太原机场或车站。", "확정된 출발 시간에 충분한 여유가 있을 때만 진사를 방문한 뒤 타이위안 공항 또는 역으로 이동합니다.")),
  ],
  hotelNote: l("Five breakfast-included nights, twin sharing: Datong 2, Pingyao 2 and Taiyuan 1. Traditional Pingyao rooms vary in stairs, bed type and sound insulation, so the exact room is confirmed before payment.", "共 5 晚含早，默认双人同住：大同 2 晚、平遥 2 晚、太原 1 晚。平遥传统客栈的楼梯、床型与隔音差异较大，具体房型须提前确认。", "조식 포함 5박, 2인 1실 기준으로 다퉁 2박, 핑야오 2박, 타이위안 1박입니다. 핑야오 전통 숙소는 계단, 침대와 방음이 달라 객실을 미리 확인합니다."),
  serviceNote: l("The base scope includes a private English-speaking guide, driver, vehicle and named first admissions. Korean pages use a Korean-speaking guide at the same base price, subject to availability.", "基础范围包含私人英语导游、司机、用车与所列首道门票；导游语种按订单确认。", "기본 범위에는 한국어 가이드, 기사, 전용 차량과 명시된 첫 입장권이 포함되며 한국어 가이드는 같은 기본 가격으로 날짜별 가능 여부를 확인합니다."),
  exclusions: commonExclusions(["Optional folk performances and any elevated access closed by the site"], ["自选民俗演出及景区当天关闭的高处区域"], ["선택 민속 공연과 관광지가 당일 폐쇄한 상부 구역"]),
  bookingNote: quoteNote,
  heroImage: image(shanxiSlug, "hero.webp", 1600, 1200, l("Sculptures inside Yungang Grottoes", "云冈石窟造像", "운강석굴 조각"), l("Yungang receives a full morning on the first touring day.", "第一个游览日上午留给云冈石窟。", "첫 관광일 오전을 운강석굴에 배정합니다.")),
  gallery: [image(shanxiSlug, "gallery-1.webp", 1600, 398, l("Aerial view of Pingyao Ancient City", "平遥古城俯瞰", "핑야오고성 전경"), l("Two nights in Pingyao make the old city more than a transfer stop.", "平遥连住两晚，不把古城当成转场打卡点。", "핑야오에서 2박하며 고성을 이동 중 잠깐 보는 곳으로 만들지 않습니다."))],
  routeMedia: [{ day: 3, variants: [{ label: l("Hanging Temple", "悬空寺", "현공사"), image: image(shanxiSlug, "route-day-3.webp", 1600, 1200, l("Hanging Temple on the cliff near Datong", "大同附近悬崖上的悬空寺", "다퉁 인근 절벽의 현공사"), l("The temple is visited while travelling south; access can be limited on the day.", "悬空寺安排在南下途中，进入高处区域以当天管控为准。", "남쪽 이동 중 방문하며 상부 구역 입장은 당일 통제에 따릅니다.")) }] }],
  packages: [standardPackage([])],
  datePublished: PUBLISHED,
  dateModified: MODIFIED,
};

const silkRoadSlug = "zhangye-jiayuguan-dunhuang-7-day-private-tour";
const silkRoad: PrivateTourProduct = {
  id: "private-tour-zhangye-jiayuguan-dunhuang-7d6n",
  slug: silkRoadSlug,
  days: 7,
  nights: 6,
  servicePolicy,
  title: l("Zhangye, Jiayuguan & Dunhuang: 7-Day Private Tour", "张掖·嘉峪关·敦煌 7 天 6 晚私家团", "장예·자위관·둔황 7일 프라이빗 투어"),
  metadataTitle: l("Hexi Corridor Private Tour: 7 Days", "张掖嘉峪关敦煌7天私家团", "장예·자위관·둔황 7일 프라이빗 투어"),
  metadataDescription: l("A seven-day private route from Zhangye to Dunhuang via Jiayuguan, with six hotel nights, private transport, guide service and named admissions.", "从张掖经嘉峪关到敦煌的 7 天私家路线，含 6 晚住宿、私车、导游及所列门票。", "장예에서 자위관을 거쳐 둔황으로 가는 7일 일정으로 6박, 전용 차량, 가이드와 명시된 입장권을 포함합니다."),
  eyebrow: l("Follow the Hexi Corridor west, without returning to the start", "沿河西走廊一路向西，不走回头路", "허시회랑을 따라 서쪽으로, 출발지로 되돌아가지 않는 동선"),
  lede: l("Begin with Zhangye's landforms, cross Jiayuguan and keep three nights in Dunhuang for Mogao Caves, the desert and a buffer against ticket or weather changes.", "从张掖丹霞出发，经嘉峪关一路向西，在敦煌连住三晚，为莫高窟、沙漠与票务或天气变化留出余量。", "장예 단샤에서 시작해 자위관을 거쳐 서쪽으로 이동하고 둔황에서 3박하며 막고굴, 사막과 예약·날씨 변동에 여유를 둡니다."),
  summary: l("Six breakfast-included nights: Zhangye 2, Jiayuguan 1 and Dunhuang 3. Days 2–6 include private guide and vehicle service.", "共 6 晚含早：张掖 2 晚、嘉峪关 1 晚、敦煌 3 晚；第 2–6 天包含私人导游与用车。", "조식 포함 6박으로 장예 2박, 자위관 1박, 둔황 3박이며 2~6일 차에 전용 가이드와 차량이 포함됩니다."),
  highlights: lists(["Zhangye Danxia at a workable light window", "Jiayuguan Fort and the western frontier", "Mogao Caves with reservation-specific planning", "Three Dunhuang nights for a steadier finish"], ["按合适光线时段看张掖丹霞", "嘉峪关关城与西部边塞", "莫高窟按预约票种规划", "敦煌连住三晚更从容"], ["적절한 빛 시간대의 장예 단샤", "자위관 성과 서부 관문", "예약 유형에 맞춘 막고굴", "둔황 3박으로 안정적인 마무리"]),
  itinerary: [
    day(1, l("Arrive in Zhangye", "抵达张掖", "장예 도착"), l("Meet the driver at the confirmed airport or railway station and transfer to the Zhangye hotel.", "在已确认的张掖机场或车站接站，私车送往酒店。", "확정된 장예 공항 또는 역에서 기사를 만나 호텔로 이동합니다.")),
    day(2, l("Zhangye Danxia and Giant Buddha Temple", "张掖丹霞与大佛寺", "장예 단샤와 대불사"), l("Visit Giant Buddha Temple and Zhangye Danxia at the confirmed light and entry window. The exact platform sequence follows the operating shuttle route.", "游览大佛寺，并在已确认的光线与入园时段进入张掖丹霞；观景台顺序按当天景区车路线安排。", "대불사와 확정된 입장·빛 시간대의 장예 단샤를 방문하며 전망대 순서는 당일 셔틀 동선에 따릅니다.")),
    day(3, l("Pingshanhu and transfer to Jiayuguan", "平山湖与前往嘉峪关", "핑산후와 자위관 이동"), l("Visit Pingshanhu Grand Canyon when operating, then drive west to Jiayuguan. A simpler Zhangye alternative is used if weather or access closes the canyon.", "景区开放时游览平山湖大峡谷，随后向西前往嘉峪关；如天气或管控导致关闭，则改用张掖备用行程。", "운영 시 핑산후 대협곡을 본 뒤 자위관으로 이동하며 날씨나 통제로 폐쇄되면 장예 대체 일정을 사용합니다.")),
    day(4, l("Jiayuguan Fort and drive to Dunhuang", "嘉峪关关城与前往敦煌", "자위관성과 둔황 이동"), l("Visit Jiayuguan Fort and one confirmed frontier site, then continue through the Gobi to Dunhuang for the first of three nights.", "游览嘉峪关关城与一处已确认的边塞景点，再穿过戈壁前往敦煌，开始连住三晚。", "자위관성과 확정된 변방 유적 한 곳을 본 뒤 고비를 지나 둔황으로 이동해 3박을 시작합니다.")),
    day(5, l("Mogao Caves and Shazhou night market", "莫高窟与沙洲夜市", "막고굴과 사주 야시장"), l("Visit Mogao Caves using the confirmed official ticket type and time slot. Cave access and language service follow the issued ticket; the evening is free at Shazhou night market.", "按已确认的官方票种与时段游览莫高窟，开放洞窟与讲解语种以出票信息为准；晚上自由逛沙洲夜市。", "확정된 공식 입장권 유형과 시간에 막고굴을 방문하며 관람 동굴과 언어 서비스는 발권 내용에 따릅니다. 저녁은 사주 야시장에서 자유 시간입니다.")),
    day(6, l("Mingsha Mountain and Crescent Moon Spring", "鸣沙山与月牙泉", "명사산과 월아천"), l("Visit Mingsha Mountain and Crescent Moon Spring at a weather-aware time. Camel rides, helicopter flights and other optional activities are not part of the base package.", "按天气与温度选择时段游览鸣沙山月牙泉；骑骆驼、直升机等自选项目不在基础套餐内。", "날씨와 기온을 고려한 시간에 명사산과 월아천을 방문하며 낙타, 헬기 등 선택 체험은 기본 패키지에 포함되지 않습니다.")),
    day(7, l("Depart Dunhuang", "敦煌返程", "둔황 출발"), l("Transfer by private vehicle to the confirmed Dunhuang airport or railway station. No fixed sightseeing is planned.", "私车送往已确认的敦煌机场或车站，返程日不安排固定游览。", "전용 차량으로 확정된 둔황 공항 또는 역에 이동하며 고정 관광은 없습니다.")),
  ],
  hotelNote: l("Six breakfast-included nights, twin sharing: Zhangye 2, Jiayuguan 1 and Dunhuang 3. Hotel standard, room type and seasonal supplements are confirmed before payment.", "共 6 晚含早，默认双人同住：张掖 2 晚、嘉峪关 1 晚、敦煌 3 晚；酒店标准、房型与旺季附加费在付款前确认。", "조식 포함 6박, 2인 1실 기준으로 장예 2박, 자위관 1박, 둔황 3박입니다. 호텔 등급, 객실과 성수기 추가금은 결제 전에 확인합니다."),
  serviceNote: l("Days 2–6 include a private English-speaking guide, driver, vehicle, named first admissions and required scenic shuttles. Korean pages use a Korean-speaking guide at the same base price, subject to availability.", "第 2–6 天包含私人英语导游、司机、用车、所列首道门票与必要景区车；具体语种按订单确认。", "2~6일 차에는 한국어 가이드, 기사, 전용 차량, 명시된 첫 입장권과 필수 셔틀이 포함됩니다. 한국어 가이드는 같은 기본 가격으로 가능 여부를 확인합니다."),
  exclusions: commonExclusions(["Optional desert activities and any upgraded Mogao ticket or special cave"], ["沙漠自选项目，以及升级莫高窟票种或特窟费用"], ["사막 선택 체험, 업그레이드 막고굴 입장권 또는 특별굴 비용"]),
  bookingNote: pricingNote,
  heroImage: image(silkRoadSlug, "hero.webp", 1600, 1067, l("Colourful landforms at Zhangye Danxia", "张掖七彩丹霞", "장예 칠채단하"), l("The route begins in Zhangye and continues west through the Hexi Corridor.", "路线从张掖开始，沿河西走廊一路向西。", "장예에서 시작해 허시회랑을 따라 서쪽으로 이동합니다.")),
  gallery: [image(silkRoadSlug, "gallery-1.webp", 1600, 994, l("Jiayuguan Fort", "嘉峪关关城", "자위관성"), l("Jiayuguan is an overnight stop rather than a rushed roadside visit.", "嘉峪关安排住宿，不作为匆忙路过的打卡点。", "자위관에서 숙박하며 급하게 지나가는 정류장으로 만들지 않습니다."))],
  routeMedia: [{ day: 6, variants: [{ label: l("Mingsha Mountain", "鸣沙山月牙泉", "명사산 월아천"), image: image(silkRoadSlug, "route-day-6.webp", 1600, 1067, l("Mingsha Mountain and Crescent Moon Spring", "鸣沙山与月牙泉", "명사산과 월아천"), l("The desert visit is timed around weather and temperature.", "沙漠游览时段按天气与温度调整。", "사막 방문 시간은 날씨와 기온에 맞춰 조정합니다.")) }] }],
  packages: [standardPackage([{ travelers: 2, cnyPerPerson: 9620, usdPerPerson: 1480 }, { travelers: 4, cnyPerPerson: 8580, usdPerPerson: 1320 }, { travelers: 6, cnyPerPerson: 8380 }])],
  datePublished: PUBLISHED,
  dateModified: MODIFIED,
};

const yangtzeSlug = "chongqing-yangtze-cruise-6-day-private-tour";
const yangtze: PrivateTourProduct = {
  id: "private-tour-chongqing-yangtze-cruise-6d5n",
  slug: yangtzeSlug,
  days: 6,
  nights: 5,
  servicePolicy,
  title: l("Chongqing & Yangtze Three Gorges: 6-Day Private Tour", "重庆与长江三峡游轮 6 天 5 晚私家团", "충칭·창장삼협 크루즈 6일 프라이빗 투어"),
  metadataTitle: l("Chongqing & Yangtze Cruise: 6 Days", "重庆长江三峡游轮6天私家团", "충칭·창장삼협 크루즈 6일 투어"),
  metadataDescription: l("Two nights in Chongqing followed by a three-night Yangtze cruise to Yichang. Ship, cabin, sailing direction and shore excursions are date-checked.", "重庆住 2 晚，再乘三晚长江游轮到宜昌；船型、舱房、航向与岸上项目按日期确认。", "충칭 2박 후 3박 창장 크루즈로 이창까지 이동하며 선박, 객실, 운항 방향과 육상 관광은 날짜별 확인합니다."),
  eyebrow: l("Two Chongqing nights, then three nights on the river", "重庆住两晚，再在游轮住三晚", "충칭 2박 뒤 강 위에서 3박"),
  lede: l("See Chongqing before boarding a date-confirmed downstream cruise, then pass the Three Gorges and finish in Yichang without retracing the route.", "先看重庆，再登上按日期确认的下水游轮，穿过长江三峡后从宜昌离开，不走回头路。", "충칭을 둘러본 뒤 날짜가 확정된 하행 크루즈에 승선해 삼협을 지나 이창에서 마칩니다."),
  summary: l("Five nights based on twin sharing: two in a Chongqing hotel and three in a balcony cruise cabin. Sailing date, ship, pier, cabin and included shore excursions must be confirmed before payment.", "共 5 晚，默认双人同住：重庆酒店 2 晚、带阳台游轮舱房 3 晚；航期、船名、码头、舱型与所含岸上项目须在付款前确认。", "2인 1실 기준 5박으로 충칭 호텔 2박과 발코니 크루즈 객실 3박입니다. 운항일, 선박, 부두, 객실과 포함 육상 관광은 결제 전에 확인합니다."),
  highlights: lists(["Two Chongqing city nights before boarding", "A three-night downstream cruise", "Qutang and Wu Gorges from the river", "Finish in Yichang rather than returning to Chongqing"], ["登船前在重庆住两晚", "三晚下水游轮", "从江上看瞿塘峡与巫峡", "宜昌离开，不返回重庆"], ["승선 전 충칭 2박", "3박 하행 크루즈", "강 위에서 보는 구당협과 무협", "충칭으로 돌아가지 않고 이창에서 종료"]),
  itinerary: [
    day(1, l("Arrive in Chongqing", "抵达重庆", "충칭 도착"), l("Meet the driver at the confirmed airport or station and transfer to the Chongqing hotel.", "在已确认的机场或车站接站，私车送往重庆酒店。", "확정된 공항 또는 역에서 기사를 만나 충칭 호텔로 이동합니다.")),
    day(2, l("Chongqing city day", "重庆城市游览", "충칭 도심"), l("Explore a confirmed city route such as Liziba, Shancheng lanes, Jiefangbei and the riverside. The guide adjusts the order to traffic and walking conditions.", "按确认路线游览李子坝、山城巷、解放碑与江边等地，导游根据交通与步行条件调整顺序。", "리쯔바, 산청 골목, 제팡베이와 강변 등 확정된 도심 동선을 보며 교통과 보행 상황에 맞춰 순서를 조정합니다.")),
    day(3, l("Dazu or a lighter Chongqing day, then board", "大足或重庆轻松游览后登船", "대족 또는 가벼운 충칭 일정 후 승선"), l("Use the day for the confirmed Dazu Rock Carvings excursion or a shorter Chongqing alternative, then transfer to the operating pier and board the confirmed cruise in the evening.", "按书面确认选择大足石刻一日游或重庆轻松备用行程，傍晚送往当天运行码头并登上已确认游轮。", "서면 확인에 따라 대족석각 당일 일정 또는 짧은 충칭 대체 일정을 진행한 뒤 운항 부두로 이동해 저녁에 확정된 크루즈에 승선합니다.")),
    day(4, l("First cruise day and shore excursion", "首个游轮日与岸上项目", "첫 크루즈 날과 육상 관광"), l("Follow the ship's published programme for the included shore excursion and onboard meals. Exact stops differ by ship and waterway operations.", "按船方当天公布的计划参加所含岸上项目与船上餐食；具体停靠点随船型与航道运行调整。", "선사가 발표한 일정에 따라 포함 육상 관광과 선상 식사를 이용하며 정박지는 선박과 수로 운영에 따라 달라집니다.")),
    day(5, l("Qutang Gorge and Wu Gorge", "瞿塘峡与巫峡", "구당협과 무협"), l("Sail through the main gorge section and join the included tributary or shore programme named in the booking. Optional excursions remain separate unless listed.", "航行穿过主要峡谷段，并参加确认单列明的支流或岸上项目；未列明的自费项目不包含。", "주요 협곡 구간을 항해하고 예약서에 명시된 지류 또는 육상 관광에 참여하며 선택 관광은 따로입니다.")),
    day(6, l("Three Gorges Dam and Yichang departure", "三峡大坝与宜昌返程", "삼협댐과 이창 출발"), l("Disembark for the included dam programme named by the cruise operator, then transfer to the confirmed Yichang station or airport. Departure timing is checked against the ship schedule.", "离船后参加船方列明的所含大坝项目，再送往已确认的宜昌车站或机场；返程班次须与游轮时刻核对。", "하선 후 선사가 명시한 포함 댐 일정을 진행하고 이창역 또는 공항으로 이동합니다. 출발편은 크루즈 시간표와 맞춰 확인합니다.")),
  ],
  hotelNote: l("Two breakfast-included Chongqing hotel nights plus three cruise nights in a twin balcony cabin. Ship, deck, cabin size, single supplement and service fee are date-dependent.", "重庆含早酒店 2 晚，加三晚双人阳台游轮舱房；船名、楼层、舱房面积、单房差与服务费均随日期确认。", "충칭 조식 포함 호텔 2박과 2인 발코니 크루즈 객실 3박입니다. 선박, 갑판, 객실 크기, 1인실 추가금과 서비스 비용은 날짜별 확인합니다."),
  serviceNote: l("Chongqing Days 1–3 include private transfers and English-speaking guide service as listed. Cruise language, meals and shore excursions follow the confirmed ship programme; Korean-language support is confirmed separately for the sailing date.", "重庆第 1–3 天按所列范围包含私车接送与英语导游；游轮讲解语种、餐食与岸上项目以已确认船方计划为准。", "충칭 1~3일 차에는 명시된 전용 이동과 한국어 가이드 서비스를 포함합니다. 크루즈 언어, 식사와 육상 관광은 확정된 선박 프로그램에 따르며 한국어 지원은 운항일별 확인합니다."),
  exclusions: commonExclusions(["Cruise service fees, optional shore excursions and cabin upgrades unless listed"], ["确认单未列明的游轮服务费、自选岸上项目与舱房升级"], ["확인서에 명시되지 않은 크루즈 서비스 비용, 선택 육상 관광과 객실 업그레이드"]),
  bookingNote: quoteNote,
  heroImage: image(yangtzeSlug, "hero.webp", 1600, 1067, l("Qutang Gorge on the Yangtze River", "长江瞿塘峡", "창장 구당협"), l("The cruise portion passes the main gorge section before finishing in Yichang.", "游轮穿过主要峡谷段后在宜昌结束。", "크루즈는 주요 협곡 구간을 지나 이창에서 마칩니다.")),
  gallery: [image(yangtzeSlug, "gallery-1.webp", 1600, 1200, l("Yangtze River cruise ship", "长江游轮", "창장 크루즈 선박"), l("The actual ship and cabin are confirmed for the selected sailing date.", "实际船名与舱房按所选航期确认。", "실제 선박과 객실은 선택한 운항일에 맞춰 확인합니다."))],
  routeMedia: [{ day: 2, variants: [{ label: l("Chongqing", "重庆", "충칭"), image: image(yangtzeSlug, "route-day-1.webp", 1600, 1067, l("Chongqing skyline at night", "重庆夜景", "충칭 야경"), l("Two city nights come before the cruise embarkation.", "登船前先在重庆住两晚。", "크루즈 승선 전에 충칭에서 2박합니다.")) }] }],
  packages: [standardPackage([])],
  datePublished: PUBLISHED,
  dateModified: MODIFIED,
};

const iliSlug = "xinjiang-ili-sayram-8-day-private-tour";
const ili: PrivateTourProduct = {
  id: "private-tour-xinjiang-ili-sayram-8d7n",
  slug: iliSlug,
  days: 8,
  nights: 7,
  servicePolicy,
  title: l("Ili, Sayram Lake & Nalati: 8-Day Private Tour", "伊犁·赛里木湖·那拉提 8 天 7 晚私家团", "이리·싸이리무호·나라티 8일 프라이빗 투어"),
  metadataTitle: l("Ili & Sayram Lake Private Tour: 8 Days", "新疆伊犁赛里木湖8天私家团", "신장 이리·싸이리무호 8일 투어"),
  metadataDescription: l("An eight-day seasonal Ili route linking Sayram Lake, Yining, Tekes and Nalati. Road openings, pasture access and hotels are checked by date.", "8 天季节性伊犁路线，串联赛里木湖、伊宁、特克斯与那拉提；道路、草原开放与酒店按日期核对。", "싸이리무호, 이닝, 터커스와 나라티를 잇는 계절형 8일 일정으로 도로, 초원 개방과 호텔을 날짜별 확인합니다."),
  eyebrow: l("A seasonal circuit with a written road-closure alternative", "季节性环线，同时准备封路备用方案", "도로 폐쇄 대안을 함께 준비하는 계절형 순환 일정"),
  lede: l("Travel from Urumqi to Sayram Lake, Yining, Tekes and Nalati, while keeping the exact grassland and return road flexible around seasonal opening conditions.", "从乌鲁木齐进入赛里木湖、伊宁、特克斯与那拉提，并按季节开放情况调整具体草原与返程道路。", "우루무치에서 싸이리무호, 이닝, 터커스와 나라티를 잇되 계절별 개방에 맞춰 초원과 귀환 도로를 조정합니다."),
  summary: l("Seven breakfast-included nights across the circuit. The route is date-checked because mountain roads, grassland access, lavender and hotel inventory change sharply by season.", "环线共 7 晚含早。山区道路、草原开放、薰衣草花期与酒店库存季节变化明显，因此须按日期核对。", "순환 일정 7박 조식을 포함하며 산악 도로, 초원 접근, 라벤더 시기와 호텔 재고가 계절에 따라 크게 달라 날짜별 확인합니다."),
  highlights: lists(["Sayram Lake with an unhurried lakeside stop", "Yining and the Ili River valley", "Tekes or a confirmed grassland alternative", "Nalati with seasonal road contingencies"], ["赛里木湖留足湖畔时间", "伊宁与伊犁河谷", "特克斯或已确认草原替代线", "那拉提与季节性道路备用方案"], ["싸이리무호 호숫가 여유 시간", "이닝과 이리강 계곡", "터커스 또는 확정된 초원 대안", "나라티와 계절 도로 대체안"]),
  itinerary: [
    day(1, l("Arrive in Urumqi", "抵达乌鲁木齐", "우루무치 도착"), l("Meet the driver and transfer to the Urumqi hotel. The guide checks the latest road and weather notices before the circuit begins.", "接机或接站后前往乌鲁木齐酒店；环线开始前由工作人员复核最新道路与天气信息。", "기사와 만나 우루무치 호텔로 이동하며 순환 일정 시작 전에 최신 도로와 날씨를 확인합니다.")),
    day(2, l("Urumqi to Sayram Lake", "乌鲁木齐前往赛里木湖", "우루무치에서 싸이리무호"), l("Travel west by the confirmed road or rail-plus-road plan and stay near Sayram Lake or in Bole. The final transport mode is fixed after the date is known.", "按已确认的公路或高铁加接驳方案向西前往赛里木湖，在湖区附近或博乐住宿；交通方式在日期确定后锁定。", "확정된 도로 또는 열차+차량 계획으로 서쪽으로 이동해 싸이리무호 인근이나 보러에서 숙박합니다.")),
    day(3, l("Sayram Lake and Yining", "赛里木湖与伊宁", "싸이리무호와 이닝"), l("Spend the main part of the day around the open lake circuit, then continue through the Guozigou corridor to Yining. Vehicle-access fees and any cruise are confirmed separately.", "把当天主要时间留给开放的环湖路线，再经果子沟前往伊宁；车辆进景区费用与游船是否包含分别确认。", "개방된 호수 순환 구간에 충분한 시간을 쓰고 과자구를 지나 이닝으로 이동합니다. 차량 진입 비용과 유람선 포함 여부는 따로 확인합니다.")),
    day(4, l("Yining to Tekes", "伊宁前往特克斯", "이닝에서 터커스"), l("See a confirmed Yining neighbourhood before continuing to Tekes. Seasonal lavender fields are included only when the date and bloom conditions are suitable.", "先看一处已确认的伊宁街区，再前往特克斯；只有日期与花期合适时才安排薰衣草。", "확정된 이닝 동네를 본 뒤 터커스로 이동하며 라벤더는 날짜와 개화 상태가 맞을 때만 포함합니다.")),
    day(5, l("Grassland route to Nalati", "草原路线前往那拉提", "초원 길로 나라티"), l("Use the confirmed Kalajun, Kurding or replacement grassland route, then continue to Nalati. The choice follows seasonal access and driving time.", "按开放情况选择喀拉峻、库尔德宁或替代草原路线，再前往那拉提；具体选择以季节通行与车程为准。", "계절 개방과 이동 시간을 보고 카라준, 쿠얼더닝 또는 대체 초원 중 확정된 곳을 거쳐 나라티로 갑니다.")),
    day(6, l("Nalati at a measured pace", "那拉提从容游览", "나라티를 여유롭게"), l("Give Nalati a full day on the operating scenic route. Horse riding and other pasture activities are optional and weather-dependent.", "把完整一天留给那拉提，按当天运行的景区路线游览；骑马等草原项目为自选且受天气影响。", "나라티에서 하루를 보내며 운영 중인 관광 동선을 이용합니다. 승마 등 초원 체험은 선택 사항이며 날씨에 따라 달라집니다.")),
    day(7, l("Return to Urumqi", "返回乌鲁木齐", "우루무치 귀환"), l("Return to Urumqi by the confirmed seasonal road or alternate transport plan. No sightseeing is promised on this long transfer day.", "按已确认的季节性公路或替代交通方案返回乌鲁木齐；长距离转场日不承诺固定景点。", "확정된 계절 도로 또는 대체 교통으로 우루무치에 돌아가며 장거리 이동일에는 고정 관광을 약속하지 않습니다.")),
    day(8, l("Depart Urumqi", "乌鲁木齐返程", "우루무치 출발"), l("Transfer to the confirmed airport or railway station. A city stop is added only if the departure time leaves a safe buffer.", "送往已确认的机场或车站；只有返程时间留有安全余量时才增加城市景点。", "확정된 공항 또는 역으로 이동하며 출발 시간에 여유가 있을 때만 도심 정류장을 추가합니다.")),
  ],
  hotelNote: l("Seven breakfast-included nights across Urumqi, the Sayram or Bole area, Yining, Tekes and Nalati. Remote-area hotel standards, heating or cooling and room type are confirmed for the season.", "共 7 晚含早，分住乌鲁木齐、赛里木湖或博乐、伊宁、特克斯与那拉提；偏远地区酒店标准、冷暖设备与房型按季节确认。", "우루무치, 싸이리무호 또는 보러, 이닝, 터커스와 나라티에서 조식 포함 7박입니다. 외곽 지역 호텔 등급, 냉난방과 객실은 계절별 확인합니다."),
  serviceNote: l("Days 3–6 include a private English-speaking guide, driver, vehicle and named first admissions. Days 1–2 and 7–8 are driver and transfer days unless the written confirmation says otherwise. Korean-language guide availability is checked for the exact dates. Road closures trigger the written alternative, not an improvised surcharge.", "第 3–6 天包含私人英语导游、司机、用车与所列首道门票；第 1–2 天及第 7–8 天默认是司机接送与转场，书面确认另有列明的除外。导游语种按准确日期核对，遇封路时使用书面备用方案，不临时加价改线。", "3~6일 차에는 한국어 가이드, 기사, 전용 차량과 명시된 첫 입장권이 포함됩니다. 1~2일 차와 7~8일 차는 서면 확인서에 달리 적지 않는 한 기사 이동·환승 일정입니다. 도로 폐쇄 시 즉석 추가금 대신 서면 대안을 적용합니다."),
  exclusions: commonExclusions(["Horse riding, cruises and other optional grassland activities unless listed"], ["确认单未列明的骑马、游船与其他草原自选项目"], ["확인서에 명시되지 않은 승마, 유람선과 기타 초원 선택 체험"]),
  bookingNote: quoteNote,
  heroImage: image(iliSlug, "hero.webp", 1600, 1200, l("Sayram Lake in Xinjiang", "新疆赛里木湖", "신장 싸이리무호"), l("Sayram Lake anchors the western side of the seasonal circuit.", "赛里木湖是季节性环线西侧的核心停留。", "싸이리무호는 계절형 순환 일정 서쪽의 핵심입니다.")),
  gallery: [image(iliSlug, "gallery-1.webp", 1600, 1200, l("Nalati grassland", "那拉提草原", "나라티 초원"), l("The exact scenic route depends on seasonal access and weather.", "具体景区路线取决于季节开放与天气。", "세부 관광 동선은 계절 개방과 날씨에 따릅니다."))],
  routeMedia: [{ day: 4, variants: [{ label: l("Ili River valley", "伊犁河谷", "이리강 계곡"), image: image(iliSlug, "route-day-3.webp", 1600, 738, l("Ili River at Yining", "伊宁伊犁河", "이닝의 이리강"), l("Yining breaks the journey between Sayram Lake and Tekes.", "伊宁承担赛里木湖与特克斯之间的中段住宿。", "이닝은 싸이리무호와 터커스 사이의 중간 숙박지입니다.")) }] }],
  packages: [standardPackage([])],
  datePublished: PUBLISHED,
  dateModified: MODIFIED,
};

const hulunbuirSlug = "hulunbuir-7-day-private-tour";
const hulunbuir: PrivateTourProduct = {
  id: "private-tour-hulunbuir-7d6n",
  slug: hulunbuirSlug,
  days: 7,
  nights: 6,
  servicePolicy,
  title: l("Hulunbuir Grassland & Forest: 7-Day Private Tour", "呼伦贝尔草原与森林 7 天 6 晚私家团", "후룬베이얼 초원·숲 7일 프라이빗 투어"),
  metadataTitle: l("Hulunbuir Private Tour: 7 Days", "呼伦贝尔7天私家团", "후룬베이얼 7일 프라이빗 투어"),
  metadataDescription: l("A seven-day seasonal route from Hailar through grassland, wetland, forest villages and Manzhouli. Rooms, activities and road access are date-checked.", "从海拉尔出发，串联草原、湿地、森林村落与满洲里的 7 天季节性路线；住宿、体验与道路按日期确认。", "하이라얼에서 초원, 습지, 숲 마을과 만저우리로 이어지는 계절형 7일 일정입니다."),
  eyebrow: l("Grassland, wetland, forest and border city in one circuit", "草原、湿地、森林与边城一次走完", "초원·습지·숲·국경 도시를 한 순환 코스로"),
  lede: l("Travel from Hailar to the Mergel River, Erguna, forest settlements and Manzhouli, with summer road and accommodation details confirmed before sale.", "从海拉尔进入莫日格勒河、额尔古纳、森林村落与满洲里，并在售前确认夏季道路与住宿细节。", "하이라얼에서 모리거러강, 얼구나, 숲 마을과 만저우리로 이어지며 여름 도로와 숙박 세부를 판매 전에 확인합니다."),
  summary: l("Six nights across the circuit, with private vehicle and guide service. Rural rooms, toilets, air-conditioning and any grassland activity are confirmed item by item.", "环线共 6 晚，包含私车与导游服务。乡村住宿的卫浴、空调与草原体验逐项确认。", "순환 일정 6박과 전용 차량, 가이드 서비스를 포함하며 외곽 숙소의 욕실, 냉방과 초원 체험을 항목별 확인합니다."),
  highlights: lists(["Mergel River grassland", "Erguna wetland and forest settlements", "A border-road journey to Manzhouli", "Optional grassland activities kept separate"], ["莫日格勒河草原", "额尔古纳湿地与森林村落", "边境公路前往满洲里", "草原自选项目单独列明"], ["모리거러강 초원", "얼구나 습지와 숲 마을", "국경 도로를 따라 만저우리로", "초원 선택 체험을 별도 구분"]),
  itinerary: [
    day(1, l("Arrive in Hailar", "抵达海拉尔", "하이라얼 도착"), l("Meet the driver and transfer to the Hailar hotel. The guide confirms the next day's road and grassland access.", "接机或接站后前往海拉尔酒店，并复核次日道路与草原开放情况。", "기사와 만나 하이라얼 호텔로 이동하고 다음 날 도로와 초원 접근을 확인합니다.")),
    day(2, l("Mergel River and Erguna", "莫日格勒河与额尔古纳", "모리거러강과 얼구나"), l("Enter the open grassland route toward the Mergel River, then continue to Erguna. Exact viewpoints depend on road conditions and local access.", "沿开放草原路线前往莫日格勒河，再到额尔古纳；具体观景点随道路与当地开放情况调整。", "개방된 초원 길로 모리거러강을 보고 얼구나로 이동하며 전망지는 도로와 현지 접근 상황에 따릅니다.")),
    day(3, l("Wetland, reindeer culture and forest country", "湿地、驯鹿文化与森林地带", "습지·순록 문화·숲 지역"), l("Visit the confirmed wetland or reindeer-cultural site, then continue through the forest country toward Genhe or Shiwei. Animal encounters are never guaranteed.", "游览已确认的湿地或驯鹿文化点，再穿过森林地带前往根河或室韦；不承诺固定动物互动。", "확정된 습지 또는 순록 문화 장소를 보고 숲 지역을 지나 건허 또는 스웨이로 이동합니다. 동물 만남은 보장하지 않습니다.")),
    day(4, l("Forest village to Heishantou", "森林村落前往黑山头", "숲 마을에서 헤이산터우"), l("Travel through a confirmed forest or border village and continue to Heishantou. Rural room conditions and luggage handling are checked before booking.", "经一处已确认的森林或边境村落前往黑山头；乡村住宿条件与行李搬运在预订前确认。", "확정된 숲 또는 국경 마을을 거쳐 헤이산터우로 이동하며 외곽 숙소와 수하물 조건을 예약 전에 확인합니다.")),
    day(5, l("Border road to Manzhouli", "边境公路前往满洲里", "국경 도로로 만저우리"), l("Follow the open border-road route to Manzhouli with scenic stops selected for the day's conditions. Paid riding, archery and grass sliding remain optional.", "沿开放的边境公路前往满洲里，按当天条件选择停靠点；骑马、射箭与滑草等收费体验为自选。", "개방된 국경 도로를 따라 만저우리로 이동하며 당일 조건에 맞춰 정차합니다. 승마, 양궁과 초원 썰매는 선택 체험입니다.")),
    day(6, l("Hulun Lake and return to Hailar", "呼伦湖与返回海拉尔", "후룬호와 하이라얼 귀환"), l("Visit the confirmed Hulun Lake viewpoint and return to Hailar. Wind, road works or access changes may replace the lakeside stop.", "前往已确认的呼伦湖观景点，再返回海拉尔；如遇大风、施工或管控，则使用替代停靠点。", "확정된 후룬호 전망지를 보고 하이라얼로 돌아갑니다. 강풍, 도로 공사나 통제 시 대체 정류장을 이용합니다.")),
    day(7, l("Depart Hailar", "海拉尔返程", "하이라얼 출발"), l("Transfer to the confirmed airport or railway station. No fixed sightseeing is promised on departure day.", "送往已确认的机场或车站，返程日不承诺固定游览。", "확정된 공항 또는 역으로 이동하며 출발일에는 고정 관광을 약속하지 않습니다.")),
  ],
  hotelNote: l("Six breakfast-included nights across Hailar, Erguna, forest or border villages, Heishantou and Manzhouli. Rural bathrooms, beds, heating or cooling and accessibility are confirmed before payment.", "共 6 晚含早，分住海拉尔、额尔古纳、森林或边境村落、黑山头与满洲里；乡村住宿的卫浴、床型、冷暖设备与无障碍条件须提前确认。", "하이라얼, 얼구나, 숲 또는 국경 마을, 헤이산터우와 만저우리에서 조식 포함 6박입니다. 외곽 숙소의 욕실, 침대, 냉난방과 접근성을 미리 확인합니다."),
  serviceNote: l("Days 2–6 include a private English-speaking guide, driver, vehicle and named first admissions. Days 1 and 7 are driver transfer days unless the written confirmation says otherwise. Korean-language guide availability is checked for the exact summer dates.", "第 2–6 天包含私人英语导游、司机、用车与所列首道门票；第 1 天与第 7 天默认是司机接送日，书面确认另有列明的除外。导游语种按准确夏季日期核对。", "2~6일 차에는 한국어 가이드, 기사, 전용 차량과 명시된 첫 입장권이 포함됩니다. 1일 차와 7일 차는 서면 확인서에 달리 적지 않는 한 기사 이동일이며 한국어 가이드는 정확한 여름 날짜에 가능 여부를 확인합니다."),
  exclusions: commonExclusions(["Horse riding, archery, bonfires, grass sliding and other optional activities unless listed"], ["确认单未列明的骑马、射箭、篝火、滑草与其他自选项目"], ["확인서에 명시되지 않은 승마, 양궁, 모닥불, 초원 썰매와 기타 선택 체험"]),
  bookingNote: quoteNote,
  heroImage: image(hulunbuirSlug, "hero.webp", 1600, 1067, l("Camels on the Hulunbuir grassland", "呼伦贝尔草原上的骆驼", "후룬베이얼 초원의 낙타"), l("Grassland activities and animal encounters are optional and seasonal.", "草原体验与动物互动均为季节性自选项目。", "초원 체험과 동물 만남은 계절형 선택 사항입니다.")),
  gallery: [image(hulunbuirSlug, "gallery-1.webp", 900, 600, l("Horses on the Hulunbuir grassland", "呼伦贝尔草原上的马群", "후룬베이얼 초원의 말"), l("The private route keeps paid riding separate from the base package.", "基础套餐不把收费骑马写成默认包含。", "유료 승마는 기본 패키지와 구분합니다."))],
  routeMedia: [{ day: 4, variants: [{ label: l("Forest and border village", "森林与边境村落", "숲과 국경 마을"), image: image(hulunbuirSlug, "route-day-4.webp", 1600, 900, l("Village and grassland near Erguna", "额尔古纳附近村落与草原", "얼구나 인근 마을과 초원"), l("Rural accommodation details are confirmed before booking.", "乡村住宿细节在预订前逐项确认。", "외곽 숙소 세부는 예약 전에 확인합니다.")) }] }],
  packages: [standardPackage([])],
  datePublished: PUBLISHED,
  dateModified: MODIFIED,
};

const yuanyangSlug = "kunming-jianshui-yuanyang-6-day-private-tour";
const yuanyang: PrivateTourProduct = {
  id: "private-tour-kunming-jianshui-yuanyang-6d5n",
  slug: yuanyangSlug,
  days: 6,
  nights: 5,
  servicePolicy,
  title: l("Kunming, Jianshui & Yuanyang: 6-Day Private Tour", "昆明·建水·元阳 6 天 5 晚私家团", "쿤밍·젠수이·위안양 6일 프라이빗 투어"),
  metadataTitle: l("Jianshui & Yuanyang Private Tour: 6 Days", "昆明建水元阳6天私家团", "쿤밍·젠수이·위안양 6일 투어"),
  metadataDescription: l("A six-day private route through Kunming, Jianshui and Yuanyang rice terraces, with two Yuanyang nights, private transport and guide service.", "昆明、建水与元阳梯田 6 天私家路线，元阳连住两晚，含私车与导游服务。", "쿤밍, 젠수이와 위안양 계단식 논을 잇는 6일 일정으로 위안양 2박, 전용 차량과 가이드를 포함합니다."),
  eyebrow: l("Two Yuanyang nights give weather a second chance", "元阳连住两晚，为天气留出第二次机会", "위안양 2박으로 날씨에 두 번의 기회"),
  lede: l("Link Kunming's gateway, Jianshui's courtyards and two nights among Yuanyang's cultural landscape, without promising a particular sunrise, cloud sea or reflection.", "串联昆明门户、建水院落与元阳文化景观连住两晚，不承诺固定日出、云海或倒影。", "쿤밍, 젠수이의 안뜰과 위안양 문화 경관 2박을 잇되 특정 일출, 운해나 반영을 보장하지 않습니다."),
  summary: l("Five breakfast-included nights: Kunming 2, Jianshui 1 and Yuanyang 2. Days 2–5 include private guide and vehicle service.", "共 5 晚含早：昆明 2 晚、建水 1 晚、元阳 2 晚；第 2–5 天包含私人导游与用车。", "조식 포함 5박으로 쿤밍 2박, 젠수이 1박, 위안양 2박이며 2~5일 차에 전용 가이드와 차량이 포함됩니다."),
  highlights: lists(["Stone Forest on the southbound journey", "Jianshui courtyards and old-town life", "Two nights in Yuanyang", "Weather-aware terrace viewpoints and villages"], ["南下途中游览石林", "建水院落与古城生活", "元阳连住两晚", "按天气选择梯田观景点与村落"], ["남쪽 이동 중 석림", "젠수이 안뜰과 고성 생활", "위안양 2박", "날씨에 맞춘 계단식 논 전망지와 마을"]),
  itinerary: [
    day(1, l("Arrive in Kunming", "抵达昆明", "쿤밍 도착"), l("Meet the driver and transfer to the Kunming hotel. A Green Lake walk is added only when the arrival time allows.", "接机或接站后前往昆明酒店；只有抵达时间合适时才增加翠湖散步。", "기사와 만나 쿤밍 호텔로 이동하며 도착 시간이 맞을 때만 취호 산책을 추가합니다.")),
    day(2, l("Stone Forest and Jianshui", "石林与建水", "석림과 젠수이"), l("Visit the open Stone Forest route, then continue south to Jianshui for the night. The guide chooses a workable path for the group's walking ability.", "游览当天开放的石林路线，再向南前往建水住宿；导游按同行者步行能力选择合适游线。", "개방된 석림 동선을 본 뒤 젠수이로 이동하며 가이드가 일행의 걷기 능력에 맞춰 길을 고릅니다.")),
    day(3, l("Jianshui to Yuanyang", "建水前往元阳", "젠수이에서 위안양"), l("See confirmed Jianshui sites such as Zhu Family Garden, the Confucian Temple or Double Dragon Bridge, then drive to Yuanyang for the first terrace window.", "游览朱家花园、文庙或双龙桥等已确认建水景点，再前往元阳，视天气看第一段梯田时光。", "주가화원, 문묘 또는 쌍룡교 등 확정된 젠수이 명소를 본 뒤 위안양으로 이동해 날씨에 맞춰 첫 계단식 논을 봅니다.")),
    day(4, l("Yuanyang terraces and Hani villages", "元阳梯田与哈尼村寨", "위안양 계단식 논과 하니족 마을"), l("Spend a full day among open terrace viewpoints and one confirmed village. Viewpoint order changes with cloud, light, road access and local life.", "用完整一天走开放的梯田观景点与一处已确认村寨；顺序随云雾、光线、道路与当地生活调整。", "개방된 계단식 논 전망지와 확정된 마을 한 곳에서 하루를 보내며 구름, 빛, 도로와 주민 생활에 맞춰 순서를 바꿉니다.")),
    day(5, l("Second terrace window and return to Kunming", "第二次梯田时段与返回昆明", "두 번째 계단식 논 시간과 쿤밍 귀환"), l("Use the morning for a second weather-aware terrace or market window, then return to Kunming. A sunrise is attempted only when conditions and departure time support it.", "上午为第二次梯田或集市时段留出机会，再返回昆明；只有天气与出发时间合适时才尝试日出。", "오전에는 날씨에 맞춘 두 번째 계단식 논 또는 시장 시간을 두고 쿤밍으로 돌아갑니다. 일출은 조건과 출발 시간이 맞을 때만 시도합니다.")),
    day(6, l("Depart Kunming", "昆明返程", "쿤밍 출발"), l("Transfer to the confirmed airport or railway station. A city stop is possible only with a safe departure buffer.", "送往已确认的机场或车站；只有返程班次留有安全余量时才增加城市景点。", "확정된 공항 또는 역으로 이동하며 출발 시간에 충분한 여유가 있을 때만 도심 정류장을 추가합니다.")),
  ],
  hotelNote: l("Five breakfast-included nights, twin sharing: Kunming 2, Jianshui 1 and Yuanyang 2. Yuanyang room location, stairs, heating or cooling and view are confirmed before payment.", "共 5 晚含早，默认双人同住：昆明 2 晚、建水 1 晚、元阳 2 晚；元阳房间位置、楼梯、冷暖设备与景观在付款前确认。", "조식 포함 5박, 2인 1실 기준으로 쿤밍 2박, 젠수이 1박, 위안양 2박입니다. 위안양 객실 위치, 계단, 냉난방과 전망은 결제 전에 확인합니다."),
  serviceNote: l("Days 2–5 include private English-speaking guide, driver, vehicle, named first admissions and required local shuttles. Korean pages use a Korean-speaking guide at the same base price, subject to availability.", "第 2–5 天包含私人英语导游、司机、用车、所列首道门票与必要接驳；导游语种按订单确认。", "2~5일 차에는 한국어 가이드, 기사, 전용 차량, 명시된 첫 입장권과 필수 셔틀이 포함되며 한국어 가이드는 같은 기본 가격으로 가능 여부를 확인합니다."),
  exclusions: commonExclusions(["Photography permits, private village activities and any unlisted sunrise transfer"], ["摄影许可、私人村寨活动及确认单未列明的日出接送"], ["촬영 허가, 비공개 마을 체험과 확인서에 명시되지 않은 일출 이동"]),
  bookingNote: pricingNote,
  heroImage: image(yuanyangSlug, "hero.webp", 1598, 946, l("Yuanyang rice terraces photographed in December 2007", "2007 年 12 月拍摄的元阳梯田", "2007년 12월에 촬영한 위안양 계단식 논"), l("This photograph was taken in December. Terrace water and colour change by season; two nights create more than one weather window, but no reflection or sunrise is guaranteed.", "这张照片拍摄于 12 月。梯田水面与颜色随季节变化；连住两晚增加天气窗口，但不保证倒影或日出。", "이 사진은 12월에 촬영했습니다. 계단식 논의 물과 색은 계절에 따라 달라지며, 2박으로 날씨 기회를 늘리지만 반영이나 일출을 보장하지 않습니다.")),
  gallery: [image(yuanyangSlug, "gallery-1.webp", 1600, 1200, l("Jianshui Confucian Temple", "建水文庙", "젠수이 문묘"), l("Jianshui gives the route a cultural stop between Kunming and Yuanyang.", "建水为昆明与元阳之间增加人文停留。", "젠수이는 쿤밍과 위안양 사이에 문화 일정을 더합니다."))],
  routeMedia: [{ day: 1, variants: [{ label: l("Kunming", "昆明", "쿤밍"), image: image(yuanyangSlug, "route-day-1.webp", 1600, 1200, l("Green Lake in Kunming", "昆明翠湖", "쿤밍 취호"), l("Kunming is used as the arrival and departure base.", "昆明承担抵达与返程住宿。", "쿤밍은 도착과 출발 거점입니다.")) }] }],
  packages: [standardPackage([{ travelers: 2, cnyPerPerson: 7280, usdPerPerson: 1120 }, { travelers: 4, cnyPerPerson: 6880, usdPerPerson: 1060 }, { travelers: 6, cnyPerPerson: 6680 }])],
  datePublished: PUBLISHED,
  dateModified: MODIFIED,
};

const shenzhenSlug = "shenzhen-family-tech-4-day-private-tour";
const shenzhen: PrivateTourProduct = {
  id: "private-tour-shenzhen-family-tech-4d3n",
  slug: shenzhenSlug,
  days: 4,
  nights: 3,
  servicePolicy,
  title: l("Shenzhen Family Science & Technology: 4-Day Private Tour", "深圳亲子科技 4 天 3 晚私家团", "선전 가족 과학·기술 4일 프라이빗 투어"),
  metadataTitle: l("Shenzhen Family Tech Tour: 4 Days", "深圳亲子科技4天私家团", "선전 가족 과학 4일 프라이빗 투어"),
  metadataDescription: l("A four-day Shenzhen family route with the Science and Technology Museum, Huaqiangbei and flexible city activities. Enterprise visits are never assumed.", "深圳 4 天亲子科技路线，包含科学技术馆、华强北与灵活城市活动；企业参访不默认承诺。", "선전과학기술관, 화창베이와 유연한 도심 체험을 담은 4일 가족 일정이며 기업 방문은 기본 약속이 아닙니다."),
  eyebrow: l("Public science venues first; enterprise visits only when confirmed", "先用稳定可预约的公共场馆，企业参访确认后再写入", "공공 과학관을 중심으로, 기업 방문은 확정될 때만"),
  lede: l("Build the family trip around Shenzhen Science and Technology Museum and Huaqiangbei, then add an age-appropriate city or coastal day instead of promising hard-to-book corporate visits.", "以深圳科学技术馆与华强北为核心，再按孩子年龄加入城市或海边一天，不把难预约的企业参访写成默认包含。", "선전과학기술관과 화창베이를 중심으로 아이 나이에 맞는 도심 또는 해안 하루를 더하며 예약이 어려운 기업 방문을 기본 포함으로 약속하지 않습니다."),
  summary: l("Three breakfast-included nights in one Shenzhen hotel. Days 2–3 include private guide and vehicle service, with venue reservations checked for the exact ages and date.", "深圳同一家含早酒店连住 3 晚；第 2–3 天包含私人导游与用车，场馆预约按孩子年龄与日期核对。", "선전 한 호텔에서 조식 포함 3박하며 2~3일 차에 전용 가이드와 차량을 포함하고 장소 예약은 아이 나이와 날짜에 맞춰 확인합니다."),
  highlights: lists(["Shenzhen Science and Technology Museum", "Huaqiangbei electronics district", "An age-matched city or coast day", "One hotel and buffered arrival and departure"], ["深圳科学技术馆", "华强北电子街区", "按年龄选择城市或海边一天", "同一家酒店与宽松抵离日"], ["선전과학기술관", "화창베이 전자 상권", "나이에 맞춘 도심 또는 해안 하루", "한 호텔과 여유 있는 도착·출발"]),
  itinerary: [
    day(1, l("Arrive in Shenzhen", "抵达深圳", "선전 도착"), l("Meet the driver at the confirmed airport or railway station and transfer to the hotel. No fixed activity is planned.", "在已确认的机场或车站接站，私车送往酒店，当天不安排固定活动。", "확정된 공항 또는 역에서 기사를 만나 호텔로 이동하며 고정 활동은 없습니다.")),
    day(2, l("Science and Technology Museum", "深圳科学技术馆", "선전과학기술관"), l("Use the confirmed museum reservation for an age-matched four-to-five-hour visit including lunch and rest breaks. The route focuses on selected floors rather than trying to complete every exhibit.", "按已确认预约安排约 4–5 小时的适龄参观，时间包含午餐与休息；只选重点楼层，不追求一次看完所有展项。", "확정된 예약으로 점심과 휴식을 포함해 약 4~5시간 동안 나이에 맞는 층을 골라 관람하며 모든 전시를 한 번에 보려 하지 않습니다.")),
    day(3, l("Huaqiangbei and a family-choice afternoon", "华强北与亲子自选下午", "화창베이와 가족 선택 오후"), l("Spend about two to three hours exploring Huaqiangbei with context rather than treating it as a shopping stop, then choose a confirmed museum, park or coastal activity suited to the children. Enterprise visits are added only after written approval.", "在讲解中用约 2–3 小时认识华强北，而不是安排购物站；下午按孩子年龄选择已确认的博物馆、公园或海边活动。企业参访只有书面确认后才加入。", "화창베이를 쇼핑 정류장이 아니라 약 2~3시간 동안 맥락 있게 둘러보고, 오후에는 아이 나이에 맞는 박물관, 공원 또는 해안 활동을 선택합니다. 기업 방문은 서면 확정 후에만 추가합니다.")),
    day(4, l("Depart Shenzhen", "深圳返程", "선전 출발"), l("Transfer to the confirmed airport or station. A short city stop is possible only when the departure time and luggage plan leave a safe buffer.", "送往已确认的机场或车站；只有返程时间与行李安排留有安全余量时才增加短时城市活动。", "확정된 공항 또는 역으로 이동하며 출발 시간과 수하물 계획에 여유가 있을 때만 짧은 도심 활동을 추가합니다.")),
  ],
  hotelNote: l("Three breakfast-included nights in one Shenzhen hotel, twin sharing. The standard route is best suited to school-age children; younger children receive a shorter, break-led version. Plan for about 4–6 km of walking on each of Days 2 and 3; a coastal afternoon may require more. Family rooms, connecting rooms, child bedding, tickets and breakfast rules are confirmed against each child's age and hotel policy before payment.", "深圳同一家含早酒店连住 3 晚，默认双人同住。标准路线更适合学龄儿童，低龄儿童会改为更短、休息更多的版本。第 2、3 天通常按每天约 4–6 公里步行准备，选择海边下午时可能更多；家庭房、连通房、儿童占床、门票与早餐规则按孩子年龄和酒店政策在付款前确认。", "선전 한 호텔에서 조식 포함 3박, 2인 1실 기준입니다. 기본 일정은 학령기 아동에게 가장 잘 맞으며 어린 아이는 더 짧고 휴식이 많은 일정으로 조정합니다. 2~3일 차는 하루 약 4~6km 걷기를 예상하며 해안 오후를 고르면 더 걸을 수 있습니다. 가족실, 연결 객실, 어린이 침대, 입장권과 조식 규정은 아이 나이와 호텔 정책에 따라 결제 전에 확인합니다."),
  serviceNote: l("Days 2–3 include a private English-speaking guide, driver, vehicle and named admissions. Korean pages use a Korean-speaking guide at the same base price, subject to availability. Corporate showrooms, robotaxis and private workshops are included only when separately confirmed.", "第 2–3 天包含私人英语导游、司机、用车与所列门票；导游语种按订单确认。企业展厅、无人车与私营课程只有另行确认后才包含。", "2~3일 차에는 한국어 가이드, 기사, 전용 차량과 명시된 입장권이 포함되며 한국어 가이드는 같은 기본 가격으로 가능 여부를 확인합니다. 기업 전시장, 로보택시와 사설 수업은 별도 확정 시에만 포함됩니다."),
  exclusions: commonExclusions(["Corporate visits, robotaxi rides, workshops and paid special exhibitions unless listed"], ["确认单未列明的企业参访、无人车、课程与收费特展"], ["확인서에 명시되지 않은 기업 방문, 로보택시, 수업과 유료 특별전"]),
  bookingNote: pricingNote,
  heroImage: image(shenzhenSlug, "hero.webp", 1600, 1200, l("Futian skyline in Shenzhen", "深圳福田天际线", "선전 푸톈 스카이라인"), l("The family route uses central Shenzhen as one hotel base.", "亲子路线以深圳市区同一家酒店为基地。", "가족 일정은 선전 도심 한 호텔을 거점으로 합니다.")),
  gallery: [image(shenzhenSlug, "gallery-1.webp", 1600, 1200, l("Inside Shenzhen Science and Technology Museum", "深圳科学技术馆内部", "선전과학기술관 내부"), l("The museum day is built around confirmed reservations and the children's ages.", "科学馆一天按预约与孩子年龄安排。", "과학관 일정은 예약과 아이 나이에 맞춰 구성합니다."))],
  routeMedia: [{ day: 3, variants: [{ label: l("Huaqiangbei", "华强北", "화창베이"), image: image(shenzhenSlug, "route-day-2.webp", 899, 1200, l("Huaqiangbei and central Shenzhen", "华强北与深圳市区", "화창베이와 선전 도심"), l("Huaqiangbei is presented as an urban technology district, not a compulsory shopping stop.", "华强北以城市科技街区游览，不安排强制购物。", "화창베이는 의무 쇼핑이 아닌 도시 기술 상권으로 소개합니다.")) }] }],
  packages: [standardPackage([{ travelers: 2, cnyPerPerson: 3980, usdPerPerson: 620 }, { travelers: 4, cnyPerPerson: 2880, usdPerPerson: 450 }, { travelers: 6, cnyPerPerson: 2680 }])],
  datePublished: PUBLISHED,
  dateModified: MODIFIED,
};

const classicChinaSlug = "beijing-xian-shanghai-12-day-private-tour";
const classicChina: PrivateTourProduct = {
  id: "private-tour-beijing-xian-shanghai-12d11n",
  slug: classicChinaSlug,
  days: 12,
  nights: 11,
  servicePolicy,
  title: l("Beijing, Xi'an & Shanghai: 12-Day Private Tour", "北京·西安·上海 12 天 11 晚私家团", "베이징·시안·상하이 12일 프라이빗 투어"),
  metadataTitle: l("Beijing, Xi'an & Shanghai: 12 Days", "北京西安上海12天私家团", "베이징·시안·상하이 12일 투어"),
  metadataDescription: l("A 12-day first-China private route with four Beijing nights, three Xi'an nights and four Shanghai nights, plus confirmed high-speed rail between cities.", "第一次来中国的 12 天私家路线：北京 4 晚、西安 3 晚、上海 4 晚，并确认两段跨城高铁。", "중국 첫 여행을 위한 12일 일정으로 베이징 4박, 시안 3박, 상하이 4박과 도시 간 고속철도를 포함합니다."),
  eyebrow: l("Four Beijing nights, three Xi'an nights and four Shanghai nights", "北京 4 晚、西安 3 晚、上海 4 晚", "베이징 4박, 시안 3박, 상하이 4박"),
  lede: l("Give Beijing, Xi'an and Shanghai enough time to stand on their own, then connect them by confirmed high-speed rail instead of turning the trip into a sequence of airport days.", "让北京、西安与上海各自拥有充足时间，再用已确认高铁串联，避免把旅行变成连续赶机场。", "베이징, 시안과 상하이에 충분한 시간을 두고 고속철도로 연결해 공항 이동만 반복하지 않습니다."),
  summary: l("Eleven breakfast-included nights: Beijing 4, Xi'an 3 and Shanghai 4. Private city guiding, transfers and confirmed second-class high-speed rail are included in the base scope.", "共 11 晚含早：北京 4 晚、西安 3 晚、上海 4 晚；基础范围包含城市私人导游、接送与已确认二等座高铁。", "조식 포함 11박으로 베이징 4박, 시안 3박, 상하이 4박이며 도심 전용 가이드, 이동과 확정된 고속철도 2등석이 기본 범위에 포함됩니다."),
  highlights: lists(["Four nights each in Beijing and Shanghai", "Three Xi'an nights with a full Terracotta Warriors day", "Confirmed high-speed rail between cities", "Arrival and departure days kept light"], ["北京与上海各住 4 晚", "西安 3 晚并给兵马俑完整一天", "两段跨城高铁确认后包含", "抵达与返程日保持轻松"], ["베이징과 상하이 각 4박", "시안 3박과 병마용 종일 일정", "도시 간 확정 고속철도", "가벼운 도착일과 출발일"]),
  itinerary: [
    day(1, l("Arrive in Beijing", "抵达北京", "베이징 도착"), l("Meet the driver at the confirmed airport or station and transfer to the Beijing hotel. No fixed sightseeing is planned.", "在已确认的机场或车站接站，私车送往北京酒店，当天不安排固定景点。", "확정된 공항 또는 역에서 기사를 만나 베이징 호텔로 이동하며 고정 관광은 없습니다.")),
    day(2, l("Tiananmen area and Forbidden City", "天安门地区与故宫", "톈안먼 일대와 자금성"), l("Visit the confirmed Tiananmen-area route and Forbidden City reservation. The order and fallback plan depend on issued tickets and current access rules.", "按已确认预约游览天安门地区与故宫，顺序与备用方案取决于实际出票和当期通行规则。", "확정된 톈안먼 일대와 자금성 예약으로 방문하며 순서와 대안은 발권과 현행 출입 규정에 따릅니다.")),
    day(3, l("Great Wall day", "长城一日", "만리장성 하루"), l("Travel by private vehicle to the confirmed Great Wall section. Cable-car or toboggan tickets are included only when named in the written booking.", "私车前往已确认的长城段；索道或滑车只有书面确认列明时才包含。", "전용 차량으로 확정된 만리장성 구간을 방문하며 케이블카나 슬라이드는 서면 예약에 명시될 때만 포함됩니다.")),
    day(4, l("Temple of Heaven and Summer Palace", "天坛与颐和园", "천단과 이화원"), l("Visit the confirmed Temple of Heaven route and Summer Palace. Any boat ride is subject to season and same-day operation.", "游览已确认的天坛路线与颐和园；游船受季节与当天运行影响。", "확정된 천단 동선과 이화원을 방문하며 유람선은 계절과 당일 운영에 따릅니다.")),
    day(5, l("High-speed rail to Xi'an", "高铁前往西安", "고속철도로 시안"), l("Transfer to the station, take the confirmed second-class high-speed train to Xi'an and meet the local driver for the hotel transfer.", "送往车站，乘已确认的二等座高铁前往西安，由当地司机接站送往酒店。", "역으로 이동해 확정된 고속철도 2등석으로 시안에 간 뒤 현지 기사와 만나 호텔로 이동합니다.")),
    day(6, l("Terracotta Warriors", "兵马俑完整一天", "병마용 종일"), l("Give the Terracotta Warriors the main part of the day with the private guide. Huaqing Palace or another stop is included only if confirmed without cutting the museum short.", "把当天主要时间留给兵马俑；只有在不压缩博物馆时间且已确认时，才加入华清宫或其他停靠点。", "병마용에 하루의 중심을 두며 관람 시간을 줄이지 않고 확정된 경우에만 화청궁 등 다른 정류장을 추가합니다.")),
    day(7, l("Xi'an City Wall and old-city quarters", "西安城墙与古城街区", "시안 성벽과 구시가"), l("Visit the City Wall and a confirmed old-city route around the Great Mosque, Muslim Quarter or nearby lanes, paced to the group.", "游览西安城墙，并按同行者节奏走大清真寺、回民街或周边已确认古城路线。", "시안 성벽과 대청진사, 회민거리 또는 주변 확정 구시가 동선을 일행 속도에 맞춰 봅니다.")),
    day(8, l("High-speed rail to Shanghai", "高铁前往上海", "고속철도로 상하이"), l("Transfer to Xi'an North, take the confirmed second-class train to Shanghai and meet the driver for the hotel transfer. No major sightseeing is fixed.", "送往西安北站，乘已确认二等座高铁前往上海，由司机接站送往酒店；当天不安排大型景点。", "시안북역에서 확정된 고속철도 2등석으로 상하이에 가고 기사와 만나 호텔로 이동합니다. 큰 관광 일정은 넣지 않습니다.")),
    day(9, l("The Bund, Yu Garden and old Shanghai", "外滩、豫园与上海老城", "와이탄·예원·상하이 구시가"), l("Explore the Bund, Yu Garden and a confirmed old-city route with the private guide. The order follows reservation and traffic conditions.", "在私人导游陪同下游览外滩、豫园与已确认的老城路线，顺序按预约与交通调整。", "전용 가이드와 와이탄, 예원과 확정된 구시가 동선을 보고 예약과 교통에 맞춰 순서를 조정합니다.")),
    day(10, l("Shanghai neighbourhoods", "上海街区日", "상하이 동네 하루"), l("Walk a measured route through a confirmed former French Concession neighbourhood and one museum or design stop. Museum reservations are date-checked.", "在已确认的梧桐街区轻松步行，并选择一处博物馆或设计类景点；预约按日期核对。", "확정된 프랑스 조계지 동네를 걷고 박물관 또는 디자인 명소 한 곳을 선택하며 예약은 날짜별 확인합니다.")),
    day(11, l("Flexible Shanghai day", "上海弹性一天", "상하이 선택 하루"), l("Choose one confirmed option: Zhujiajiao water town, a Suzhou day trip or free time in Shanghai. Intercity tickets and admissions are included only for the option written into the booking.", "在朱家角水乡、苏州一日或上海自由活动中确认一项；跨城票与门票只按书面选择包含。", "주자자오 수향마을, 쑤저우 당일 여행 또는 상하이 자유 시간 중 하나를 확정하며 교통권과 입장권은 서면 선택에 따라 포함됩니다.")),
    day(12, l("Depart Shanghai", "上海返程", "상하이 출발"), l("Transfer by private vehicle to the confirmed airport or railway station. No fixed sightseeing is planned.", "私车送往已确认的机场或车站，返程日不安排固定游览。", "전용 차량으로 확정된 공항 또는 역에 이동하며 고정 관광은 없습니다.")),
  ],
  hotelNote: l("Eleven breakfast-included nights, twin sharing: Beijing 4, Xi'an 3 and Shanghai 4. Exact four-star standard hotels, room types and single supplement are confirmed before payment.", "共 11 晚含早，默认双人同住：北京 4 晚、西安 3 晚、上海 4 晚；具体 4 星标准酒店、房型与单房差在付款前确认。", "조식 포함 11박, 2인 1실 기준으로 베이징 4박, 시안 3박, 상하이 4박입니다. 4성급 기준 호텔, 객실과 1인실 추가금은 결제 전에 확인합니다."),
  serviceNote: l("The base scope includes private English-speaking local guides and vehicles on the named touring days, arrival and departure transfers, named first admissions and confirmed second-class Beijing–Xi'an–Shanghai high-speed rail. Korean pages use Korean-speaking guides at the same base price, subject to city-by-city availability.", "基础范围包含所列游览日的私人英语当地导游与用车、抵离接送、所列首道门票，以及已确认的北京—西安—上海二等座高铁；导游语种按订单确认。", "기본 범위에는 명시된 관광일의 한국어 현지 가이드와 전용 차량, 도착·출발 이동, 명시된 첫 입장권과 확정된 베이징–시안–상하이 고속철도 2등석이 포함됩니다. 한국어 가이드는 같은 기본 가격으로 도시별 가능 여부를 확인합니다."),
  exclusions: commonExclusions(["Optional Day 11 transport and admissions until one option is confirmed"], ["第 11 天自选方案在书面确认前的交通与门票"], ["11일 차 선택안이 서면 확정되기 전의 교통과 입장권"]),
  bookingNote: classicChinaBookingNote,
  heroImage: image(classicChinaSlug, "hero.webp", 1600, 800, l("Forbidden City seen from Jingshan", "从景山看故宫", "경산에서 본 자금성"), l("Four Beijing nights protect three full touring days and a light arrival day.", "北京连住 4 晚，保留 3 个完整游览日与轻松抵达日。", "베이징 4박으로 종일 관광 3일과 가벼운 도착일을 확보합니다.")),
  gallery: [image(classicChinaSlug, "gallery-1.webp", 1600, 1200, l("Terracotta Warriors in Xi'an", "西安兵马俑", "시안 병마용"), l("Xi'an receives three nights and a full Terracotta Warriors day.", "西安住 3 晚，并把完整一天留给兵马俑。", "시안에서 3박하고 병마용에 하루를 온전히 씁니다."))],
  routeMedia: [{ day: 9, variants: [{ label: l("Shanghai", "上海", "상하이"), image: image(classicChinaSlug, "route-day-9.webp", 1600, 901, l("Shanghai skyline from the Bund", "从外滩看上海天际线", "와이탄에서 본 상하이 스카이라인"), l("Four Shanghai nights leave one flexible day after the core city route.", "上海连住 4 晚，核心城市游览后仍保留一个弹性日。", "상하이 4박으로 핵심 도심 일정 뒤 선택 하루를 남깁니다.")) }] }],
  packages: [standardPackage([{ travelers: 2, cnyPerPerson: 18720, usdPerPerson: 2880 }, { travelers: 4, cnyPerPerson: 14300, usdPerPerson: 2200 }, { travelers: 6, cnyPerPerson: 14100 }])],
  datePublished: PUBLISHED,
  dateModified: MODIFIED,
};

export const privateTourExpansionPhaseTwoProducts: readonly PrivateTourProduct[] =
  Object.freeze([
    shanghaiDisney,
    henan,
    shanxi,
    silkRoad,
    yangtze,
    ili,
    hulunbuir,
    yuanyang,
    shenzhen,
    classicChina,
  ]);
