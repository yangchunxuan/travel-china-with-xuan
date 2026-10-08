import type {
  LocalizedStringList,
  LocalizedText,
  PrivateTourDay,
  PrivateTourImage,
  PrivateTourProduct,
  PrivateTourRouteMediaGroup,
} from "./privateTourProducts";

const l = (en: string, zh: string, ko: string): LocalizedText => ({ en, zh, ko });
const lists = (
  en: readonly string[],
  zh: readonly string[],
  ko: readonly string[],
): LocalizedStringList => ({ en, zh, ko });
const day = (
  number: number,
  title: LocalizedText,
  description: LocalizedText,
): PrivateTourDay => ({ day: number, title, description });
const image = (
  src: string,
  width: number,
  height: number,
  alt: LocalizedText,
  caption: LocalizedText,
): PrivateTourImage => ({ src, width, height, alt, caption });
const routeImage = (
  number: number,
  label: LocalizedText,
  photo: PrivateTourImage,
): PrivateTourRouteMediaGroup => ({
  day: number,
  variants: [{ label, image: photo }],
});

const wallPhoto = image(
  "/images/guides/beijing-to-mutianyu-great-wall-transfer/hero-1600.webp",
  1600,
  1000,
  l(
    "Visitors walking on the Mutianyu section of the Great Wall.",
    "游客走在慕田峪长城的城墙上。",
    "무톈위 만리장성 성벽을 걷는 방문객들.",
  ),
  l(
    "The Mutianyu Great Wall is the first full sightseeing day on this route.",
    "第一个完整游览日去慕田峪长城。",
    "첫 종일 관광일에는 무톈위 만리장성을 방문합니다.",
  ),
);
const warriorsPhoto = image(
  "/images/guides/terracotta-warriors-without-tour/hero-1600.webp",
  1600,
  1000,
  l(
    "Rows of Terracotta Warriors in Pit 1 near Xi'an.",
    "西安附近兵马俑一号坑中的陶俑队列。",
    "시안 근교 병마용 1호 갱의 도용 행렬.",
  ),
  l(
    "The Xi'an day makes room for the Terracotta Warriors and the Big Wild Goose Pagoda grounds.",
    "西安这天留出时间看兵马俑，再到大雁塔院区。",
    "시안 일정에서 병마용을 충분히 보고 대안탑 경내도 방문합니다.",
  ),
);
const liRiverPhoto = image(
  "/images/tours/guilin-yangshuo-5-day-private-tour/li-river-cruise-1600.webp",
  1600,
  1000,
  l(
    "A sightseeing boat on the Li River among Guilin's karst hills.",
    "桂林喀斯特山水间的漓江游船。",
    "계림 카르스트 산 사이 이강을 지나는 유람선.",
  ),
  l(
    "The Li River day continues through Yangshuo and returns to Guilin for the night.",
    "漓江游船后游阳朔，当晚回桂林住宿。",
    "이강 유람선 뒤 양삭을 둘러보고 계림으로 돌아와 숙박합니다.",
  ),
);
const bundPhoto = image(
  "/images/destinations/shanghai/bund-architecture-1200.webp",
  1200,
  750,
  l(
    "Historic buildings and the Customs House clock tower on Shanghai's Bund.",
    "上海外滩的历史建筑与海关大楼钟楼。",
    "상하이 와이탄의 역사적 건물과 해관대루 시계탑.",
  ),
  l(
    "Walk along the Bund after arriving in Shanghai.",
    "抵达上海后沿外滩散步。",
    "상하이에 도착한 뒤 와이탄을 걷습니다.",
  ),
);
const pandaPhoto = image(
  "/images/tours/beijing-xian-chengdu-guilin-shanghai-14-day-private-tour/route-day-8.webp",
  1600,
  1000,
  l(
    "A giant panda eating bamboo.",
    "正在吃竹子的大熊猫。",
    "대나무를 먹는 자이언트판다.",
  ),
  l(
    "The panda base is planned for the morning, when pandas are often more active.",
    "上午去熊猫基地，通常更容易看到大熊猫活动。",
    "판다가 비교적 활발한 오전에 판다 기지를 방문합니다.",
  ),
);

/**
 * A public route based on a date-specific private-group plan. Both choices are
 * quoted afresh, so the client's negotiated fare is never a website price.
 */
export const fiveCityPrivateTour: PrivateTourProduct = {
  id: "private-tour-beijing-xian-chengdu-guilin-shanghai-13d12n",
  slug: "beijing-xian-chengdu-guilin-shanghai-13-day-private-tour",
  days: 13,
  nights: 12,
  routePhotoFallback: false,
  servicePolicy: {
    shoppingStops: false,
    addedServicesRequirePriorAgreement: true,
  },
  includesDomesticFlights: true,
  facts: {
    en: [
      { label: "Route", value: "Beijing · Xi'an · Chengdu · Guilin · Shanghai" },
      { label: "Travel", value: "2 trains + 2 domestic flights, quoted together" },
      { label: "Stay", value: "12 nights · hotel or self-booked choice" },
      { label: "Price", value: "Written quote for your dates and group" },
    ],
    zh: [
      { label: "路线", value: "北京 · 西安 · 成都 · 桂林 · 上海" },
      { label: "城际交通", value: "2 段高铁 + 2 段国内航班，合并报价" },
      { label: "住宿", value: "12 晚 · 可选含酒店或自行预订" },
      { label: "价格", value: "按日期与人数书面报价" },
    ],
    ko: [
      { label: "동선", value: "베이징 · 시안 · 청두 · 계림 · 상하이" },
      { label: "도시간 이동", value: "고속철도 2회 + 국내선 2회, 함께 견적" },
      { label: "숙박", value: "12박 · 호텔 포함 또는 개별 예약" },
      { label: "가격", value: "날짜와 인원에 따른 서면 견적" },
    ],
  },
  title: l(
    "Beijing, Xi'an, Chengdu, Guilin & Shanghai: 13-Day Private Tour",
    "北京·西安·成都·桂林·上海 13 天 12 晚私家团",
    "베이징·시안·청두·계림·상하이 13일 프라이빗 투어",
  ),
  metadataTitle: l(
    "13-Day China Private Tour | Beijing, Xi'an, Chengdu, Guilin & Shanghai",
    "北京西安成都桂林上海 13 天私家团｜长城到外滩",
    "중국 13일 프라이빗 투어｜베이징·시안·청두·계림·상하이",
  ),
  metadataDescription: l(
    "13-day China private tour: Mutianyu Great Wall, Terracotta Warriors, Chengdu pandas, Li River cruise and Shanghai. Hotels optional; quote on request.",
    "13 天走北京、西安、成都、桂林、上海：慕田峪长城、兵马俑、熊猫、漓江游船与外滩。可选含酒店或自订酒店，按日期书面报价。",
    "13일 동안 무톈위 만리장성, 병마용, 청두 판다, 이강 유람선과 상하이를 잇습니다. 호텔 포함 또는 개별 예약을 선택하고 서면 견적을 받으세요.",
  ),
  eyebrow: l(
    "Five cities in 13 days, from the Great Wall to the Bund",
    "13 天走五城，从长城到外滩",
    "13일 동안 다섯 도시, 만리장성에서 와이탄까지",
  ),
  lede: l(
    "Start in Beijing, cross to Xi'an and Chengdu, cruise the Li River from Guilin, and finish in Shanghai. You can include twelve hotel nights or arrange your own stays. We quote both choices for your group and travel dates.",
    "从北京出发，依次走西安、成都、桂林漓江，最后到上海。12 晚酒店可由我们安排，也可自行预订；两种方案都按实际日期和人数报价。",
    "베이징에서 시작해 시안과 청두를 지나 계림 이강을 유람하고 상하이에서 마칩니다. 12박 호텔을 포함하거나 직접 예약할 수 있으며, 두 방식 모두 여행 날짜와 인원에 맞춰 견적을 드립니다.",
  ),
  summary: l(
    "The route stays three nights in Beijing, two in Xi'an, two in Chengdu, three in Guilin and two in Shanghai. The plan uses two second-class high-speed trains and two economy domestic flights, with English-speaking local guides on sightseeing days, named admissions and eight lunches. Specific transport and the total are confirmed in a written quote before payment.",
    "北京住 3 晚、西安 2 晚、成都 2 晚、桂林 3 晚、上海 2 晚。方案安排两段高铁二等座、两段国内经济舱航班，各地游览日配英语导游，并包含列明门票与 8 顿午餐。具体交通和总价在付款前书面确认。",
    "베이징 3박, 시안 2박, 청두 2박, 계림 3박, 상하이 2박입니다. 고속철도 2등석 2회와 국내선 이코노미 2회, 관광일의 현지 영어 가이드, 명시된 입장권과 점심 8회로 구성합니다. 교통편과 총액은 결제 전에 서면으로 확정합니다.",
  ),
  highlights: lists(
    [
      "Mutianyu Great Wall with the cable car up and down",
      "Terracotta Warriors and Chengdu's Giant Panda Base",
      "Three nights in Guilin with a Li River cruise to Yangshuo",
      "A full Shanghai sightseeing day after arriving from Guilin",
    ],
    [
      "慕田峪长城，含往返缆车",
      "兵马俑与成都大熊猫基地",
      "桂林连住 3 晚，坐漓江游船到阳朔",
      "从桂林抵达上海后，还有一整天游览",
    ],
    [
      "왕복 케이블카가 포함된 무톈위 만리장성",
      "병마용과 청두 판다 기지",
      "계림 3박과 양삭으로 가는 이강 유람선",
      "계림에서 상하이로 이동한 뒤 하루 종일 관광",
    ],
  ),
  itinerary: [
    day(1,
      l("Arrive in Beijing", "抵达北京", "베이징 도착"),
      l(
        "Meet your local representative at the agreed Beijing airport and transfer to the hotel. Keep the rest of the day free after your flight.",
        "在约定的北京机场由当地工作人员接机，专车送到酒店。长途飞行后，余下时间休息。",
        "약속한 베이징 공항에서 현지 담당자를 만나 호텔로 이동합니다. 비행 뒤 남은 시간은 쉬도록 비워 둡니다.",
      ),
    ),
    day(2,
      l("Mutianyu Great Wall and Olympic Park", "慕田峪长城与奥林匹克公园", "무톈위 만리장성과 올림픽공원"),
      l(
        "Drive to Mutianyu with your guide. The cable car takes you up and back down; walk the restored wall between rides. Lunch is included near the Wall. On the return, stop at Olympic Park to see the Bird's Nest and Water Cube from outside.",
        "导游陪同乘车前往慕田峪，坐缆车上、下长城，中间在修复段步行。长城附近含午餐；回城途中在奥林匹克公园短暂停留，从外面看鸟巢和水立方。",
        "가이드와 무톈위로 이동해 케이블카로 올라갔다가 내려오며 그사이 복원된 성벽을 걷습니다. 장성 부근 점심이 포함됩니다. 돌아오는 길에는 올림픽공원에서 냐오차오와 수이리팡 외관을 봅니다.",
      ),
    ),
    day(3,
      l("Tiananmen, the Forbidden City and Temple of Heaven", "天安门、故宫与天坛", "천안문·자금성·천단"),
      l(
        "Cross Tiananmen Square and visit the Forbidden City with your guide and advance-booked, passport-name admission. After the included lunch, continue to the Temple of Heaven. The order depends on opening days and ticket confirmation.",
        "走过天安门广场，由导游带领参观提前按护照实名预约的故宫。含午餐后游天坛；具体先后按开放日与门票确认调整。",
        "천안문광장을 지나 가이드와 자금성을 둘러봅니다. 입장권은 여권 이름으로 사전 예약합니다. 포함된 점심 뒤 천단에 갑니다. 순서는 개관일과 입장권 확정에 따라 조정합니다.",
      ),
    ),
    day(4,
      l("High-speed train to Xi'an", "乘高铁前往西安", "고속철도로 시안 이동"),
      l(
        "Take a second-class high-speed train from Beijing to Xi'an. Your Xi'an guide meets you at the station. After the included lunch, walk on the Ming City Wall and explore the Muslim Quarter; dinner is your choice.",
        "乘二等座高铁从北京到西安，当地导游在车站接站。含午餐后登明城墙步行，再逛回民街；晚餐自行选择。",
        "베이징에서 고속철도 2등석으로 시안에 갑니다. 시안 가이드가 역에서 맞이합니다. 포함된 점심 뒤 명대 성벽을 걷고 회민거리를 둘러봅니다. 저녁은 자유롭게 선택합니다.",
      ),
    ),
    day(5,
      l("Terracotta Warriors and Big Wild Goose Pagoda", "兵马俑与大雁塔院区", "병마용과 대안탑 경내"),
      l(
        "Visit the Terracotta Warriors with your guide; the site shuttle and audio headsets are included. After the included lunch, see the Big Wild Goose Pagoda in the Da Ci'en Temple grounds. The planned admission covers the grounds, not a climb inside the pagoda.",
        "由导游陪同参观兵马俑，含景区接驳车和讲解耳机。含午餐后游大慈恩寺内的大雁塔院区；计划门票为院区参观，不含登塔。",
        "가이드와 병마용을 관람하며 경내 셔틀과 오디오 헤드셋이 포함됩니다. 포함된 점심 뒤 대자은사 경내 대안탑을 봅니다. 계획된 입장권은 경내 방문이며 탑 내부 등반은 포함하지 않습니다.",
      ),
    ),
    day(6,
      l("Xi'an morning and train to Chengdu", "西安自由上午，高铁前往成都", "시안 자유 오전과 청두행 열차"),
      l(
        "The Xi'an morning is free. Have lunch at your own expense, then transfer to the station for a second-class high-speed train to Chengdu. A local driver meets you on arrival and takes you to your hotel.",
        "上午在西安自由活动，午餐自行安排。之后送站，乘二等座高铁前往成都；抵达后由当地司机接站送往酒店。",
        "시안에서 오전 자유 시간을 보내고 점심은 개별 부담입니다. 역으로 이동해 고속철도 2등석으로 청두에 갑니다. 도착하면 현지 기사가 호텔로 모십니다.",
      ),
    ),
    day(7,
      l("Chengdu pandas, lanes and teahouse", "成都熊猫、宽窄巷子与茶馆", "청두 판다·관착항자·찻집"),
      l(
        "Reach the Giant Panda Base early, when the pandas are often more active; its park shuttle is included. After the included lunch, walk Kuanzhai Alley and have tea in People's Park. An evening Sichuan-opera show is optional and costs extra.",
        "早些到成都大熊猫基地，通常更容易看到熊猫活动；含园内接驳车。含午餐后逛宽窄巷子，在人民公园喝茶。晚上的川剧表演为自费选项。",
        "판다가 비교적 활발한 이른 시간에 청두 판다 기지에 가며 경내 셔틀이 포함됩니다. 포함된 점심 뒤 관착항자를 걷고 인민공원에서 차를 마십니다. 저녁 쓰촨 오페라는 별도 비용의 선택 일정입니다.",
      ),
    ),
    day(8,
      l("Chengdu city and flight to Guilin", "成都街区，飞往桂林", "청두 시내와 계림행 항공편"),
      l(
        "Spend the morning around Taikoo Li, Daci Temple and Chunxi Road, including the panda sculpture on the IFS building. Later transfer to the airport for an economy flight to Guilin, where a local driver meets you.",
        "上午走太古里、大慈寺与春熙路，看 IFS 楼上的熊猫雕塑。随后送机场，乘经济舱航班飞桂林；抵达后由当地司机接机。",
        "오전에는 타이쿠리·다츠사·춘시루를 걷고 IFS 건물의 판다 조형물을 봅니다. 이후 공항으로 이동해 이코노미 항공편으로 계림에 가고 현지 기사가 맞이합니다.",
      ),
    ),
    day(9,
      l("Li River cruise and Yangshuo", "漓江游船与阳朔", "이강 유람선과 양삭"),
      l(
        "Cruise the Li River toward Yangshuo on a three-star sightseeing boat, with lunch on board. Continue by private vehicle to Moon Hill and West Street, then return to Guilin to sleep. In low-water periods, the boat may run a shorter Yangdi section; the onward Yangshuo visit continues by road.",
        "乘三星标准游船沿漓江前往阳朔，船上午餐已含。之后乘专车游月亮山和西街，当晚返回桂林。枯水期游船可能改为杨堤一带较短航段，再乘车继续去阳朔。",
        "3성급 관광선으로 이강을 따라 양삭 방향으로 이동하며 선상 점심이 포함됩니다. 전용차로 월량산과 서가를 방문한 뒤 계림으로 돌아와 숙박합니다. 수위가 낮으면 배가 양디 구간만 짧게 운항할 수 있으며 이후 양삭은 차량으로 이동합니다.",
      ),
    ),
    day(10,
      l("Reed Flute Cave and Guilin lakes", "芦笛岩、象鼻山与桂林湖畔", "노적암·상비산·계림 호수"),
      l(
        "Visit Reed Flute Cave in the morning. After the included lunch, see Elephant Trunk Hill and walk by the lakes for an exterior view of the Sun and Moon Pagodas. Entry inside the pagodas is not part of this plan.",
        "上午游芦笛岩，含午餐后到象鼻山，再沿湖散步，从外面欣赏日月双塔。本行程不含登塔门票。",
        "오전 노적암을 방문합니다. 포함된 점심 뒤 상비산을 보고 호숫가를 걸으며 일월쌍탑 외관을 감상합니다. 탑 내부 입장권은 이 일정에 포함되지 않습니다.",
      ),
    ),
    day(11,
      l("Fly to Shanghai, then the Bund", "飞往上海，游外滩", "상하이행 항공편과 와이탄"),
      l(
        "Fly from Guilin to Shanghai in economy class. Your Shanghai guide meets you and takes you to the Bund and Nanjing Road after arrival. The evening is free; any special event or dinner is arranged separately.",
        "乘经济舱航班从桂林飞上海，当地导游接机后带你走外滩与南京路。晚间自由活动；特别活动或晚餐另行安排。",
        "계림에서 이코노미 항공편으로 상하이에 갑니다. 현지 가이드가 맞아 와이탄과 난징루를 안내합니다. 저녁은 자유 시간이며 특별 행사와 식사는 별도로 예약합니다.",
      ),
    ),
    day(12,
      l("Yu Garden and Shanghai streets", "豫园与上海街巷", "예원과 상하이 거리"),
      l(
        "Visit Yu Garden and walk the City God Temple area's public lanes with your guide. After the included lunch, continue through the former French Concession: Wukang Road, Anfu Road and Xintiandi.",
        "由导游陪同游豫园，走城隍庙一带公共街巷。含午餐后到原法租界，依次走武康路、安福路与新天地。",
        "가이드와 예원을 방문하고 성황묘 일대의 공공 골목을 걷습니다. 포함된 점심 뒤 옛 프랑스 조계지의 우캉루·안푸루·신톈디를 둘러봅니다.",
      ),
    ),
    day(13,
      l("Depart Shanghai", "上海送机离开", "상하이 출발"),
      l(
        "Your driver transfers you to the agreed Shanghai airport. Breakfast is included only when you choose the hotel package; departure time follows your flight.",
        "司机按约定送往上海机场。只有选择含酒店方案才含早餐；送机时间按航班确定。",
        "기사가 약속한 상하이 공항으로 모십니다. 조식은 호텔 포함 상품을 선택한 경우에만 포함되며 이동 시간은 항공편에 맞춥니다.",
      ),
    ),
  ],
  hotelNote: l(
    "Choose twelve breakfast-included hotel nights at a proposed four-star standard (four diamonds on Trip.com): Beijing 3, Xi'an 2, Chengdu 2, Guilin 3 and Shanghai 2. We send actual hotel names and room types for agreement before payment. With the without-hotels option, you book all twelve nights and breakfasts yourself; pickup locations must fit the confirmed transfer plan.",
    "可选含早的 12 晚酒店，拟按携程 4 钻标准：北京 3 晚、西安 2 晚、成都 2 晚、桂林 3 晚、上海 2 晚。具体酒店与房型在付款前发给你确认。若选不含酒店方案，12 晚住宿及早餐都由你自行预订，接送地点须符合最终确认的行车安排。",
    "조식 포함 호텔 12박을 선택할 수 있으며 예정 기준은 트립닷컴 4다이아급입니다. 베이징 3박, 시안 2박, 청두 2박, 계림 3박, 상하이 2박입니다. 실제 호텔과 객실 유형은 결제 전에 합의합니다. 호텔 제외 상품에서는 12박과 조식을 직접 예약하며 픽업 장소는 확정된 이동 계획에 맞아야 합니다.",
  ),
  serviceNote: l(
    "Both quote options are built around a private vehicle sized to your party, English-speaking local guides on sightseeing days, the listed transfers and admissions, eight lunches (Days 2, 3, 4, 5, 7, 9, 10 and 12), travel accident cover during the China tour. No shopping stops are scheduled. The planned long journeys are two second-class high-speed trains and two economy flights within China. We confirm seats, schedules, baggage allowance, ticket scope, vehicle size and the final total in the written quote; a full-trip escort is an optional extra.",
    "两种询价方案均按实际人数配专车，各地游览日由英语导游陪同，含行程所列接送与门票，以及第 2、3、4、5、7、9、10、12 天共 8 顿午餐、中国行程期间旅游意外险，无购物店安排。跨城计划为两段高铁二等座和两段国内经济舱航班。座位、时刻、行李额度、门票范围、车型及总价都在书面报价中确认；全程陪同领队另计。",
    "두 견적 방식 모두 인원에 맞춘 전용차, 관광일의 현지 영어 가이드, 명시된 픽업·샌딩과 입장권, 2·3·4·5·7·9·10·12일차 점심 8회, 중국 여행 기간의 여행 상해 보장으로 구성합니다. 쇼핑 일정은 없습니다. 도시간 이동은 고속철도 2등석 2회와 국내선 이코노미 2회로 계획합니다. 좌석·시간·수하물 한도·입장권 범위·차량 크기와 총액은 서면 견적에서 확인하며 전 일정 동행 인솔자는 별도 선택 사항입니다.",
  ),
  exclusions: lists(
    [
      "International flights to and from China",
      "Dinners, drinks and lunches other than the eight specified days",
      "Tips, visas, personal medical/cancellation insurance and personal spending",
      "Single-room supplements and optional evening shows or meals",
      "All hotels and hotel breakfasts in the without-hotels option",
      "Anything added outside the confirmed itinerary",
    ],
    [
      "往返中国的国际航班",
      "晚餐、饮料及上述 8 天以外的午餐",
      "司导小费、签证、个人医疗及取消保障保险和个人消费",
      "单房差以及自选的夜间演出或餐食",
      "不含酒店方案中的全部住宿与酒店早餐",
      "最终确认行程以外新增的服务",
    ],
    [
      "중국 왕복 국제선 항공편",
      "저녁 식사·음료 및 명시된 8일 외의 점심",
      "팁·비자·개인 의료 및 취소 보험·개인 경비",
      "1인실 추가금과 선택 저녁 공연·식사",
      "호텔 제외 상품의 모든 숙박과 호텔 조식",
      "확정 일정 밖에 추가하는 서비스",
    ],
  ),
  bookingNote: l(
    "This route is quote-only. Send your travel dates, party size, room needs, arrival and departure details, and luggage count. We will check each hotel or pickup address, local guide, vehicle, admission and intercity seat, then send both package totals and the booking terms in writing before any deposit. Your inquiry does not hold flights, trains or timed-entry tickets.",
    "本线路按需报价。请发来出行日期、人数、房间需求、到离信息和行李数量。我们逐项核对酒店或自订住宿接送地址、导游、车型、门票与跨城座位，再在收取定金前书面发出两种方案的总价及预订条款。咨询本身不会占住机票、火车票或实名预约门票。",
    "이 여행은 날짜와 인원에 맞춰 견적을 안내합니다. 여행 날짜, 인원, 객실 구성, 도착·출발 정보와 수하물 수량을 알려 주세요. 호텔 또는 직접 예약한 숙소의 픽업 주소, 가이드, 차량, 입장권과 도시간 좌석을 확인한 뒤 계약금 전에 두 상품의 총액과 예약 조건을 서면으로 안내합니다. 문의만으로 항공편·열차·시간 지정 입장권이 확보되지는 않습니다.",
  ),
  faq: [
    {
      question: l("Why is there no fixed public price?", "为什么网页没有固定价格？", "왜 공개된 고정 가격이 없나요?"),
      answer: l(
        "The route includes two domestic flights, two trains and up to twelve hotel nights. Their fares and availability change by date, and the vehicle and guide cost changes with group size. We quote both hotel choices for your actual dates and party before payment.",
        "路线含两段国内航班、两段高铁，并可含 12 晚酒店；票价和房态随日期变化，车导费用也随人数变化。我们按实际日期与人数为两种住宿方案书面报价。",
        "국내선 2회와 고속철도 2회, 선택에 따라 호텔 12박이 들어갑니다. 날짜에 따라 운임과 예약 가능 여부가 달라지고 차량·가이드 비용은 인원에 따라 바뀝니다. 두 숙박 방식 모두 실제 날짜와 인원으로 결제 전에 견적을 드립니다.",
      ),
    },
    {
      question: l("What changes if we arrange our own hotels?", "如果我们自己订酒店，会有哪些变化？", "호텔을 직접 예약하면 무엇이 달라지나요?"),
      answer: l(
        "The route, planned city guides, transfers, admissions, intercity travel and eight lunches remain in the quote. You arrange and pay for twelve hotel nights and breakfasts. We check your addresses before pricing transfers; a different pickup route may change the quote.",
        "行程、各地计划的导游与接送、门票、城际交通和 8 顿午餐仍放进报价。12 晚酒店及早餐由你自行预订和付款。报价前我们会核对酒店地址；接送路线变化可能影响费用。",
        "여정, 현지 가이드·이동, 입장권, 도시간 교통과 점심 8회는 견적에 그대로 넣습니다. 호텔 12박과 조식은 직접 예약하고 결제합니다. 이동 요금을 내기 전에 숙소 주소를 확인하며 픽업 동선이 달라지면 견적도 달라질 수 있습니다.",
      ),
    },
    {
      question: l("Which meals and tickets are included?", "具体包含哪几顿饭和哪些门票？", "어떤 식사와 입장권이 포함되나요?"),
      answer: l(
        "Lunch is included on Days 2, 3, 4, 5, 7, 9, 10 and 12; Day 9 lunch is on the Li River boat. The named admissions include Mutianyu with return cable car and shuttle, Forbidden City, Temple of Heaven, Xi'an City Wall, Terracotta Warriors with shuttle and headsets, Big Wild Goose Pagoda grounds, Panda Base with shuttle, Li River cruise, Moon Hill, Reed Flute Cave and Yu Garden. Sun and Moon Pagodas are seen from outside; dinners and other lunches are separate.",
        "含第 2、3、4、5、7、9、10、12 天午餐；第 9 天为漓江船餐。所列门票含慕田峪及往返缆车、接驳车，故宫、天坛、西安城墙、兵马俑及接驳车和讲解耳机、大雁塔院区、熊猫基地及接驳车、漓江游船、月亮山、芦笛岩和豫园。日月双塔从外面看；晚餐及其余午餐另计。",
        "2·3·4·5·7·9·10·12일차 점심이 포함되며 9일차는 이강 선상 식사입니다. 명시된 입장권에는 무톈위 왕복 케이블카·셔틀, 자금성, 천단, 시안 성벽, 병마용 셔틀·헤드셋, 대안탑 경내, 판다 기지 셔틀, 이강 유람선, 월량산, 노적암과 예원이 들어갑니다. 일월쌍탑은 외관을 보며 저녁과 다른 점심은 별도입니다.",
      ),
    },
    {
      question: l("What happens if the Li River is low?", "漓江枯水时怎么办？", "이강 수위가 낮으면 어떻게 되나요?"),
      answer: l(
        "The operator may shorten the winter cruise to a round trip on the Yangdi stretch. We check conditions shortly before sailing and continue to Yangshuo by road if needed; the visit to Moon Hill and West Street stays in the plan.",
        "冬季水位低时，船方可能只运行杨堤一带较短的往返航段。我们会在开船前核对，必要时再乘车去阳朔，月亮山和西街仍按计划游览。",
        "겨울 수위가 낮으면 운영사가 양디 구간 왕복으로 유람선을 단축할 수 있습니다. 출항 직전에 확인하고 필요하면 차량으로 양삭에 이어 가며 월량산과 서가 방문은 유지합니다.",
      ),
    },
    {
      question: l("Is one escort with us throughout?", "全程由同一位领队陪同吗？", "같은 인솔자가 전 일정에 동행하나요?"),
      answer: l(
        "Local English-speaking guides handle the sightseeing in their own cities; drivers handle the transfer-only legs. A single escort travelling with you from Beijing to Shanghai can be quoted separately if you want one.",
        "游览日由各城市的当地英语导游负责，纯转场部分由司机接送。如果需要一位领队从北京一直陪到上海，我们可以另行报价。",
        "관광일에는 각 도시의 현지 영어 가이드가 안내하고 관광 없는 이동 구간은 기사가 맡습니다. 베이징부터 상하이까지 계속 동행하는 인솔자가 필요하면 별도로 견적을 드립니다.",
      ),
    },
  ],
  heroImage: wallPhoto,
  gallery: [warriorsPhoto, liRiverPhoto, bundPhoto],
  routeMedia: [
    routeImage(2, l("Mutianyu Great Wall", "慕田峪长城", "무톈위 만리장성"), wallPhoto),
    routeImage(5, l("Terracotta Warriors", "兵马俑", "병마용"), warriorsPhoto),
    routeImage(7, l("Giant Panda Base", "大熊猫基地", "판다 기지"), pandaPhoto),
    routeImage(9, l("Li River cruise", "漓江游船", "이강 유람선"), liRiverPhoto),
    routeImage(11, l("The Bund", "上海外滩", "상하이 와이탄"), bundPhoto),
  ],
  packages: [
    {
      id: "with-hotels",
      guideMode: "standard",
      label: l("With hotels and breakfast", "含酒店与早餐", "호텔·조식 포함"),
      summary: l(
        "Twelve breakfast-included hotel nights at a proposed four-star standard, plus the listed private services, eight lunches, tickets and intercity journeys. Exact hotels and total are confirmed in your written quote.",
        "拟按四星标准安排 12 晚含早酒店，另含所列私家服务、8 顿午餐、门票与城际交通。具体酒店及总价以书面报价为准。",
        "예정된 4성급 기준의 조식 포함 호텔 12박, 명시된 전용 서비스·점심 8회·입장권·도시간 교통이 포함됩니다. 실제 호텔과 총액은 서면 견적에서 확정합니다.",
      ),
      quoteOnly: true,
      prices: [],
    },
    {
      id: "without-hotels",
      guideMode: "standard",
      label: l("Arrange your own hotels", "自行预订酒店", "호텔 개별 예약"),
      summary: l(
        "The same planned guides, vehicle, transfers, eight lunches, tickets and intercity journeys; you arrange and pay for all twelve hotel nights and breakfasts. Pickup addresses and the total are confirmed in your written quote.",
        "仍含计划中的导游、用车、接送、8 顿午餐、门票及城际交通；全部 12 晚酒店与早餐由你自行预订和付款。接送地址与总价以书面报价为准。",
        "계획된 가이드·차량·이동·점심 8회·입장권·도시간 교통은 같으며, 호텔 12박과 조식은 직접 예약하고 결제합니다. 픽업 주소와 총액은 서면 견적에서 확정합니다.",
      ),
      quoteOnly: true,
      prices: [],
    },
  ],
  datePublished: "2026-10-09",
  dateModified: "2026-10-09",
  lastReviewed: "2026-10-09",
};
