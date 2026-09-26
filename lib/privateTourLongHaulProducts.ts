import type {
  LocalizedStringList,
  LocalizedText,
  PrivateTourDay,
  PrivateTourFaqItem,
  PrivateTourImage,
  PrivateTourPriceTier,
  PrivateTourProduct,
} from "./privateTourProducts";

// Long-haul routes for travellers who fly in for two weeks or more. Prices are
// suggested market-positioned starting prices; each tier keeps the CNY basis
// at USD x 6.5 rounded down so every converted price stays above it.

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
const faq = (question: LocalizedText, answer: LocalizedText): PrivateTourFaqItem => ({ question, answer });

const servicePolicy = Object.freeze({
  shoppingStops: false,
  addedServicesRequirePriorAgreement: true,
} as const);

const PUBLISHED = "2026-09-25";
const MODIFIED = "2026-09-25";

const usd = (travelers: PrivateTourPriceTier["travelers"], usdPerPerson: number): PrivateTourPriceTier => ({
  travelers,
  cnyPerPerson: Math.floor((usdPerPerson * 6.5) / 10) * 10,
  usdPerPerson,
});

// Korean pages promise a Korean-speaking guide only where one is realistic.
const privatePackage = (
  prices: readonly PrivateTourPriceTier[],
  { koreanGuide = true }: { koreanGuide?: boolean } = {},
) => ({
  id: "standard-guided",
  guideMode: "standard" as const,
  label: l("Private tour package", "私家团标准版", koreanGuide ? "한국어 가이드 포함" : "프라이빗 투어"),
  summary: l(
    "On touring days, the guide and vehicle are for your party. We name the hotels, transport, admission tickets and guide service in the written confirmation before you pay. No shopping stops are scheduled.",
    "游览日的导游和车只带你们一行。酒店、交通、门票和导游服务范围，付款前会在书面确认单上列清楚。全程无购物店安排。",
    "관광일에는 가이드와 차량을 일행만 이용합니다. 호텔, 교통, 입장권과 가이드 서비스 범위는 결제 전에 서면 확인서에 적어 드립니다. 쇼핑 일정은 없습니다.",
  ),
  prices,
});

const image = (
  slug: string,
  file: "hero.webp" | "gallery-1.webp" | `route-day-${number}.webp`,
  alt: LocalizedText,
  caption: LocalizedText,
  objectPosition = "50% 50%",
): PrivateTourImage => ({
  src: `/images/tours/${slug}/${file}`,
  width: 1600,
  height: 1000,
  objectPosition,
  alt,
  caption,
});

const exclusions = (
  en: readonly string[],
  zh: readonly string[],
  ko: readonly string[],
  { cruise = false }: { cruise?: boolean } = {},
) => lists(
  [
    "International flights to and from China",
    cruise
      ? "Lunches, dinners and drinks on land (hotel breakfasts and onboard cruise meals are included)"
      : "Lunches, dinners and drinks (breakfast is included at every hotel)",
    "Travel insurance, visas, tips and personal expenses",
    "Room upgrades and public-holiday surcharges",
    ...en,
  ],
  [
    "往返中国的国际航班",
    cruise ? "陆上午餐、晚餐和饮料（酒店早餐与游轮船上餐食已含）" : "午餐、晚餐和饮料（每晚酒店均含早餐）",
    "旅行保险、签证、小费及个人消费",
    "房型升级及法定节假日附加费",
    ...zh,
  ],
  [
    "중국 왕복 국제선 항공편",
    cruise ? "육상 중식·석식·음료(호텔 조식과 크루즈 선상 식사는 포함)" : "중식·석식·음료(호텔 조식은 매일 포함)",
    "여행자 보험, 비자, 팁 및 개인 경비",
    "객실 업그레이드와 공휴일 추가금",
    ...ko,
  ],
);

const privateBookingNote = l(
  "The listed starting price is per person at the stated group size, with two sharing a room. Once we agree on the route and dates, we ask for each traveller’s passport name, number, expiry date and date of birth before Forbidden City and Terracotta Warriors tickets go on sale. You receive the flights, trains, hotel choices and final total in writing before payment.",
  "页面起价按对应人数、两人一间的每人价格算。路线和日期定下后，故宫和兵马俑开放预约前，我们会收每人的护照姓名、号码、有效期和出生日期。航班、火车、酒店选择及最终总价都会在付款前书面确认。",
  "표시 시작가는 해당 인원이 2인 1실을 쓸 때의 1인 요금입니다. 일정과 날짜가 정해지면 자금성과 병마용 입장권 발매 전에 여행자마다 여권상 이름, 번호, 만료일과 생년월일을 요청합니다. 항공편, 열차, 호텔과 최종 금액은 결제 전에 서면으로 확인합니다.",
);

// ---------------------------------------------------------------------------
// Shared day plans. "group" wording is used only by the fixed-departure tour.
// ---------------------------------------------------------------------------

type Mode = "private" | "group";

const arriveBeijing = (n: number, mode: Mode) => day(
  n,
  l("Arrive in Beijing", "抵达北京", "베이징 도착"),
  mode === "private"
    ? l(
      "At the confirmed Beijing airport or station, your driver takes you straight to the hotel. We leave the first day clear after a long flight; sightseeing begins when you have slept.",
      "到已确认的北京机场或车站后，司机直接送你去酒店。长途飞行后先休息，游览从睡过一晚再开始。",
      "확정된 베이징 공항이나 역에서 기사가 호텔로 바로 모십니다. 장거리 비행 뒤 첫날은 비워 두고, 관광은 하루 쉰 다음 시작합니다.",
    )
    : l(
      "The departure-date booking includes one pickup from Beijing Capital or Daxing airport. Meet the guide and other guests for a short briefing at the hotel that evening.",
      "团期当天含一次首都或大兴机场接机。晚上在酒店和英语导游、团友见面，简单说好第二天怎么走。",
      "출발일에는 베이징 서우두 또는 다싱 공항 픽업 1회가 포함됩니다. 그날 저녁 호텔에서 가이드와 다른 여행자를 만나 다음 날 일정을 짧게 듣습니다.",
    ),
);

const forbiddenCity = (n: number) => day(
  n,
  l("Tiananmen area and the Forbidden City", "天安门地区与故宫", "천안문 일대와 자금성"),
  l(
    "The guide takes you through the Tiananmen area and into the Forbidden City with the ticket issued for your date. The museum closes on Mondays, so we set the Beijing day order after the reservation is confirmed.",
    "导游带你走天安门地区，再按出票日期进故宫。故宫周一闭馆，因此北京几天先后怎么排，要等门票确认后定。",
    "가이드와 천안문 일대를 걷고 예약된 날짜에 자금성에 들어갑니다. 자금성은 월요일에 쉬므로 입장권이 확정된 뒤 베이징 날짜 순서를 정합니다.",
  ),
);

const greatWall = (n: number, extra: "none" | "hutong" = "none") => day(
  n,
  l("The Great Wall at Mutianyu", "慕田峪长城", "무톈위 만리장성"),
  extra === "hutong"
    ? l(
      "Mutianyu is about 90 minutes from Beijing by road. Take the included cable car or chairlift one way, then walk the restored wall at your own speed. Back in town, there is a short hutong walk near the Drum Tower.",
      "从北京市区到慕田峪约 90 分钟车程。含单程缆车或吊椅，上了长城按自己的速度走修复段；回城后再到鼓楼附近胡同走一小段。",
      "베이징에서 무톈위까지 차로 약 90분입니다. 포함된 케이블카나 리프트를 편도로 타고 복원된 성벽을 각자 속도로 걷습니다. 시내에 돌아와 고루 근처 후퉁도 잠시 걷습니다.",
    )
    : l(
      "The drive to Mutianyu takes about 90 minutes. A cable car or chairlift is included one way, leaving you to walk the restored wall at your pace. The toboggan is an extra.",
      "到慕田峪约 90 分钟车程。单程缆车或吊椅已含，长城上按自己的速度走；想坐滑道要另外付费。",
      "무톈위까지 차로 약 90분입니다. 케이블카나 리프트 편도가 포함되며 복원된 성벽은 각자 속도로 걷습니다. 슬라이드는 별도입니다.",
    ),
);

const templeAndSummerPalace = (n: number) => day(
  n,
  l("Temple of Heaven and the Summer Palace", "天坛与颐和园", "천단과 이화원"),
  l(
    "Morning is a good time for the Temple of Heaven: local residents are often exercising in the park. Then walk by the Summer Palace lake. We check seasonal boat operation on the day.",
    "上午去天坛，常能看到本地人在公园晨练。之后到颐和园沿湖走走；游船是否开，要看季节和当天运行。",
    "오전 천단 공원에서는 운동하는 주민을 자주 볼 수 있습니다. 이어 이화원 호숫가를 걷습니다. 유람선은 계절과 당일 운행을 확인합니다.",
  ),
);

const trainToXian = (n: number) => day(
  n,
  l("High-speed train to Xi'an", "高铁前往西安", "고속철도로 시안"),
  l(
    "The confirmed second-class train to Xi’an takes about 4.5–6 hours. A driver takes you to the Beijing station and another meets you in Xi’an; leave the evening free after the crossing.",
    "北京司机送站，乘已确认的二等座高铁到西安，约 4.5–6 小时。西安司机接站送酒店，晚上不再安排景点。",
    "확정된 고속철도 2등석으로 시안까지 약 4.5~6시간 걸립니다. 베이징 기사가 역까지 모시고 시안 기사가 맞이합니다. 이동 뒤 저녁은 비워 둡니다.",
  ),
);

const terracottaAndWall = (n: number) => day(
  n,
  l("Terracotta Warriors and the City Wall", "兵马俑与西安城墙", "병마용과 시안 성벽"),
  l(
    "Do not rush the Terracotta Warriors: the guide has the morning and early afternoon there. Return to Xi’an for the City Wall when the light softens; you can walk or cycle it. The Muslim Quarter is free time in the evening.",
    "兵马俑别赶，上午到午后都留给它。回西安城后趁傍晚在城墙上走或骑车；晚上想去回民街，可以自己逛。",
    "병마용은 서두르지 않고 오전부터 이른 오후까지 가이드와 봅니다. 시안에 돌아와 늦은 오후 성벽을 걷거나 자전거를 탑니다. 저녁 회민거리는 자유롭게 갈 수 있습니다.",
  ),
);

const trainToChengdu = (n: number) => day(
  n,
  l("High-speed train to Chengdu", "高铁前往成都", "고속철도로 청두"),
  l(
    "The second-class train from Xi’an to Chengdu takes about 3–4.5 hours. There is still an afternoon for tea in People’s Park and a walk along Kuanzhai Alley.",
    "西安到成都的二等座高铁约 3–4.5 小时。到了以后还来得及去人民公园喝茶，再走一走宽窄巷子。",
    "시안에서 청두까지 고속철도 2등석으로 약 3~4.5시간 갑니다. 오후에는 인민공원에서 차를 마시고 콴자이샹쯔를 걸을 시간이 남습니다.",
  ),
);

const pandas = (n: number, mode: Mode) => day(
  n,
  l("Giant pandas in Chengdu", "成都大熊猫基地", "청두 판다 기지"),
  mode === "private"
    ? l(
      "We go to the Chengdu Research Base of Giant Panda Breeding near opening, when the pandas are usually moving around. In the afternoon choose one plan before booking: Sanxingdui Museum, roughly an hour each way, or an easier walk around Wenshu Monastery.",
      "熊猫基地开园不久就去，熊猫通常这时更活跃。下午订行程前二选一：单程约一小时车程的三星堆博物馆，或在文殊院一带慢慢走。",
      "청두 판다 번식 연구기지는 개장 무렵에 갑니다. 그때 판다가 보통 더 활발합니다. 오후에는 예약 전에 한 가지를 고릅니다. 편도 약 1시간인 싼싱두이 박물관, 또는 문수원 주변의 가벼운 산책입니다.",
    )
    : l(
      "The group reaches the Chengdu Research Base of Giant Panda Breeding near opening, when pandas are usually most active. After lunch it drives about an hour to Sanxingdui Museum for the bronze masks, if the timed tickets are issued.",
      "全团开园不久到熊猫基地，这时熊猫通常最爱活动。午饭后开车约一小时去三星堆看青铜面具，能否入馆以分时段门票为准。",
      "그룹은 판다가 보통 가장 활발한 개장 무렵 청두 판다 번식 연구기지에 갑니다. 점심 뒤 차로 약 1시간 이동해 싼싱두이 박물관의 청동 가면을 봅니다. 입장은 시간대별 입장권 발급에 따릅니다.",
    ),
);

const flyToGuilin = (n: number, from: "Chengdu" | "Zhangjiajie") => day(
  n,
  from === "Chengdu"
    ? l("Fly to Guilin", "飞往桂林", "구이린으로 이동")
    : l("Zhangjiajie to Guilin", "张家界前往桂林", "장가계에서 구이린으로"),
  from === "Chengdu"
    ? l(
      "The confirmed economy flight from Chengdu to Guilin takes about 1.5 hours. Drivers handle both airport transfers. We leave the rest of the day open and stay overnight in Guilin before the river cruise.",
      "成都飞桂林的经济舱航班约 1.5 小时，去机场和到桂林后的接送都由司机负责。当天不赶景点，先在桂林住一晚，第二天再上漓江船。",
      "청두에서 구이린까지 확정된 이코노미 항공편은 약 1.5시간입니다. 양쪽 공항 이동은 기사들이 맡습니다. 이날은 관광을 넣지 않고 구이린에서 자고 다음 날 리강 배를 탑니다.",
    )
    : l(
      "The direct Zhangjiajie–Guilin high-speed train takes about seven hours. This is almost entirely a travel day; a Guilin driver meets the train and takes you to the hotel for the night.",
      "张家界到桂林的直达高铁约 7 小时，这一天几乎全在路上。桂林司机接站送酒店，晚上住桂林。",
      "장가계–구이린 직통 고속철도는 약 7시간 걸립니다. 하루 대부분을 이동에 쓰고, 구이린 기사가 역에서 맞아 호텔로 모십니다. 구이린에서 숙박합니다.",
    ),
);

const liRiver = (n: number) => day(
  n,
  l("Li River cruise to Yangshuo", "漓江游船到阳朔", "리강 유람선으로 양숴"),
  l(
    "The Li River boat takes about four hours from the pier to Yangshuo, between the karst peaks. Your main bags travel separately by road, so keep what you need on the boat with you. The rest of the Yangshuo day is free.",
    "从码头坐漓江船到阳朔，山水间约 4 小时。大件行李另车转运，上船要用的东西记得随身带；到阳朔后自由活动。",
    "리강 배는 선착장에서 양숴까지 카르스트 봉우리 사이로 약 4시간 갑니다. 큰 짐은 차량으로 따로 옮기니 배에서 쓸 물건은 챙겨 타세요. 양숴에 도착한 뒤에는 자유 시간입니다.",
  ),
);

const yulongCountryside = (n: number) => day(
  n,
  l("Yulong River countryside", "遇龙河乡村", "위룽허 전원"),
  l(
    "If the water level and operator allow, ride a bamboo raft on the booked stretch of the Yulong River. Afterward, see the countryside by bike or vehicle without a fixed walking target. Stay in Yangshuo.",
    "遇龙河水位和运营允许时，按确认的河段坐一次竹筏。之后骑车或乘车看乡村，不设一定要走多少路；晚上住阳朔。",
    "수위와 운영이 허락하면 예약된 위룽허 구간에서 대나무 뗏목을 탑니다. 그 뒤에는 자전거나 차량으로 시골을 둘러봅니다. 걸어야 하는 거리를 정해 두지 않고 양숴에서 숙박합니다.",
  ),
);

const flyToShanghai = (n: number) => day(
  n,
  l("Fly to Shanghai", "飞往上海", "상하이로 이동"),
  l(
    "First drive about 1.5 hours to Guilin airport, then take the confirmed economy flight to Shanghai, about two hours. A Shanghai driver meets you. If you still have energy, the Bund is lit after dark.",
    "先坐约 1.5 小时车到桂林机场，再乘已确认的经济舱航班飞上海，约 2 小时。上海司机接机；晚上还有精神的话，可以去看亮灯后的外滩。",
    "구이린 공항까지 차로 약 1.5시간, 상하이까지 확정된 이코노미 항공편으로 약 2시간 갑니다. 상하이 기사가 맞이합니다. 힘이 남으면 밤에 불이 켜진 와이탄을 볼 수 있습니다.",
  ),
);

const shanghaiDay = (n: number, mode: Mode) => day(
  n,
  mode === "private"
    ? l("Shanghai or Suzhou", "上海或苏州", "상하이 또는 쑤저우")
    : l("Shanghai old and new", "上海老城与外滩", "상하이 구시가와 와이탄"),
  mode === "private"
    ? l(
      "Decide before booking how to spend the day. Stay in Shanghai with a guide for the Bund, Yu Garden and an old French Concession neighbourhood, or take the high-speed train to Suzhou for one garden and Pingjiang Road.",
      "这天订之前先选好。留在上海，导游带你去外滩、豫园和原法租界街区；或坐高铁去苏州，看一座古典园林，再走平江路。",
      "예약 전에 하루 계획을 고릅니다. 상하이에 남으면 가이드와 와이탄, 예원, 옛 프랑스 조계지를 걷습니다. 쑤저우를 고르면 고속철도로 가서 정원 한 곳과 핑장루를 봅니다.",
    )
    : l(
      "With the group guide, start at Yu Garden and the old city, then cross to the Bund and a former French Concession neighbourhood. Make your own plans for the final evening.",
      "英语导游带团从豫园、老城走到外滩和原法租界街区。最后一个晚上不排活动，自己安排。",
      "그룹 가이드와 예원, 구시가를 본 뒤 와이탄과 옛 프랑스 조계지를 걷습니다. 마지막 저녁은 자유롭게 보내세요.",
    ),
);

const departShanghai = (n: number, mode: Mode) => day(
  n,
  l("Depart Shanghai", "上海返程", "상하이 출발"),
  mode === "private"
    ? l(
      "Your driver takes you to the confirmed Shanghai airport or station. We leave the departure day free of sightseeing.",
      "司机送你去已确认的上海机场或车站。返程当天不排景点。",
      "기사가 확정된 상하이 공항이나 역까지 모십니다. 출발일에는 관광을 넣지 않습니다.",
    )
    : l(
      "On the last group day, one transfer to Pudong or Hongqiao airport is included. Extra nights in Shanghai can be arranged separately.",
      "小团最后一天含一次送浦东或虹桥机场。想在上海多住几晚，我们可以另行安排。",
      "그룹 마지막 날 푸둥 또는 훙차오 공항으로 가는 이동 1회가 포함됩니다. 상하이 추가 숙박은 따로 준비할 수 있습니다.",
    ),
);

const flyXianToZhangjiajie = (n: number) => day(
  n,
  l("Fly to Zhangjiajie", "飞往张家界", "장가계로 이동"),
  l(
    "The economy flight from Xi’an to Zhangjiajie takes about 1.5 hours. From the airport, go straight to the hotel near the Wulingyuan park gates. Sightseeing starts the next day.",
    "西安飞张家界的经济舱航班约 1.5 小时。接机后直接去武陵源景区门口附近的酒店，景点留到第二天。",
    "시안에서 장가계까지 이코노미 항공편으로 약 1.5시간입니다. 공항에서 무릉원 입구 근처 호텔로 바로 가고 관광은 다음 날 시작합니다.",
  ),
);

const forestPark = (n: number) => day(
  n,
  l("Zhangjiajie National Forest Park", "张家界国家森林公园", "장가계 국가삼림공원"),
  l(
    "Zhangjiajie National Forest Park takes a full day. The guide links Yuanjiajie’s sandstone pillars, the Bailong Elevator and part of Golden Whip Stream; the order changes with the weather and the queues.",
    "张家界国家森林公园留一整天。导游会把袁家界砂岩峰林、百龙天梯和金鞭溪一段串起来，先走哪边要看天气和排队。",
    "장가계 국가삼림공원에 하루를 씁니다. 가이드와 원가계 사암 봉우리, 백룡엘리베이터, 금편계 일부를 봅니다. 순서는 날씨와 대기 줄에 맞춰 바꿉니다.",
  ),
);

const tianmenMountain = (n: number) => day(
  n,
  l("Tianmen Mountain", "天门山", "천문산"),
  l(
    "Tianmen Mountain starts from Zhangjiajie city. Up top are the cliff-side walkways and Tianmen Cave; whether the cable car comes before or after the mountain road depends on the ticket route issued for that date.",
    "天门山从张家界市区出发，上山后走悬崖栈道、看天门洞。先坐索道还是先走盘山公路，按当天出票路线来。",
    "천문산은 장가계 시내에서 출발합니다. 산 위에서 절벽 길과 천문동을 봅니다. 케이블카와 산악도로 중 무엇을 먼저 탈지는 그날 발권된 동선에 따릅니다.",
  ),
);

const trainChengduToChongqing = (n: number) => day(
  n,
  l("High-speed train to Chongqing", "高铁前往重庆", "고속철도로 충칭"),
  l(
    "It is about 1.5 hours by second-class high-speed train from Chengdu to Chongqing. Spend the afternoon around Jiefangbei and follow the riverside to Hongyadong after the lights come on. Sleep in Chongqing.",
    "成都到重庆的二等座高铁约 1.5 小时。下午走解放碑和江边，天黑亮灯后看洪崖洞；晚上住重庆。",
    "청두에서 충칭까지 고속철도 2등석으로 약 1.5시간 갑니다. 오후에는 제팡베이와 강변을 걷고 불이 켜진 뒤 훙야둥을 봅니다. 충칭에서 숙박합니다.",
  ),
);

const chongqingThenBoard = (n: number) => day(
  n,
  l("Chongqing, then board the cruise", "重庆游览后登船", "충칭 관광 후 승선"),
  l(
    "Before boarding, there is time for the monorail at Liziba and the old hillside lanes. Boarding at Chaotianmen pier opens at about 18:00, dinner is served on the ship and it sails at about 21:00. If the water level or river control moves boarding to another pier, the cruise company runs a transfer from central Chongqing and your driver takes you to it.",
    "登船前还有时间看李子坝轻轨穿楼，走一走山城老巷。朝天门码头约 18:00 开始登船，晚餐在船上吃，约 21:00 开船。如果因水位或航道管制改在别的码头登船，游轮公司会从重庆市区安排接驳车，司机送你过去。",
    "승선 전 리쯔바 건물 사이를 지나는 모노레일과 산비탈 옛 골목을 볼 시간이 있습니다. 차오톈먼 부두에서 약 18:00부터 승선하고 저녁은 배에서 먹으며 약 21:00에 출발합니다. 수위나 수로 통제로 다른 부두에서 승선하게 되면 선사가 충칭 시내에서 연결 차량을 운행하고 기사가 그곳까지 모십니다.",
  ),
);

const onTheYangtze = (n: number) => day(
  n,
  l("On the Yangtze", "长江航行", "양쯔강 항해"),
  l(
    "The included shore visit is usually Fengdu Ghost City in the morning; the rest of the day is on board. Stops such as Shuanggui Mountain and the evening show are paid options sold on the ship, and weather or the water level can change a stop.",
    "船票含的岸上游览通常是上午的丰都鬼城，其余时间在船上。双桂山、晚上的演出这类项目要在船上另外报名付费；天气或水位也可能让停靠点变动。",
    "포함된 육상 관광은 보통 오전의 펑두 귀성이고 나머지 시간은 배에서 보냅니다. 쌍계산이나 저녁 공연 같은 일정은 배에서 따로 신청하는 유료 관광이며 날씨나 수위에 따라 정박지가 바뀔 수 있습니다.",
  ),
);

const quTangAndWuGorges = (n: number) => day(
  n,
  l("Qutang Gorge and Wu Gorge", "瞿塘峡与巫峡", "구당협과 무협"),
  l(
    "Around midday the ship sails through Qutang Gorge. In the afternoon the included side trip takes a smaller boat into the Lesser Three Gorges, and Wu Gorge follows from the deck. White Emperor City in the morning and the Mini Three Gorges are paid options.",
    "中午前后船过瞿塘峡。下午船票含换小船游小三峡，之后在甲板上看巫峡。上午的白帝城和小小三峡是自费项目。",
    "정오 무렵 배가 구당협을 지납니다. 오후에는 포함 일정으로 작은 배로 갈아타고 소삼협에 가며, 이어서 갑판에서 무협을 봅니다. 오전의 백제성과 소소삼협은 유료 선택 관광입니다.",
  ),
);

const damThenFlyToShanghai = (n: number) => day(
  n,
  l("Three Gorges Dam, then on to Shanghai", "三峡大坝后前往上海", "삼협댐 관광 후 상하이로"),
  l(
    "Leave the ship at Maoping, just above the dam, at about 08:00 and visit the Three Gorges Dam. The cruise company’s coach reaches the cruise terminal in central Yichang at about 12:30, and we book the afternoon train to Shanghai, about six hours, or an evening flight from that time. Two paid add-ons sold on board get back later, at about 13:30 and 17:00; if you want one, tell us before we book. Lunch is on your own, and you reach Shanghai late.",
    "约 08:00 在大坝上游的茅坪离船，参观三峡大坝。之后坐游轮公司的大巴，约 12:30 到宜昌市区的游轮码头，我们按这个时间订下午去上海的高铁（约 6 小时）或晚班飞机。船上另卖的两个自费项目回宜昌更晚，约 13:30 和 17:00；想参加，请在我们订票前说。午餐自理，到上海一般较晚。",
    "약 08:00에 댐 상류의 마오핑에서 내려 삼협댐을 봅니다. 선사 버스로 약 12:30에 이창 시내 크루즈 터미널에 도착하며, 이 시간에 맞춰 상하이행 오후 열차(약 6시간)나 저녁 항공편을 예약합니다. 배에서 파는 유료 선택 관광 두 가지는 이창에 약 13:30, 17:00에 돌아오니 참가하려면 예약 전에 알려 주세요. 점심은 각자 해결하며 상하이에는 늦게 도착합니다.",
  ),
);

const bundAndYuGarden = (n: number) => day(
  n,
  l("The Bund and Yu Garden", "外滩与豫园", "와이탄과 예원"),
  l(
    "Start at Yu Garden and the old city with the guide. At the Bund, look across the river from the 1920s bank buildings to Pudong’s towers.",
    "导游先带你看豫园和老城。到外滩后，一边是上世纪二十年代的银行大楼，隔江就是浦东高楼。",
    "가이드와 예원과 구시가부터 봅니다. 와이탄에서는 1920년대 은행 건물 앞에서 강 건너 푸둥의 높은 건물을 바라봅니다.",
  ),
);

const suzhouDayTrip = (n: number) => day(
  n,
  l("Suzhou gardens day trip", "苏州园林一日", "쑤저우 정원 당일"),
  l(
    "The high-speed train puts Suzhou about 30 minutes from Shanghai. Visit one garden confirmed for the day, walk the canal lanes of Pingjiang Road and return to Shanghai.",
    "上海坐高铁去苏州约 30 分钟。游一座当天已确认的古典园林，走平江路水巷，再回上海。",
    "상하이에서 쑤저우까지 고속철도로 약 30분입니다. 이날 확정된 정원 한 곳과 핑장루 운하 골목을 보고 상하이로 돌아옵니다.",
  ),
);

const shanghaiOwnPace = (n: number) => day(
  n,
  l("Shanghai at your own pace", "上海轻松一天", "상하이 여유로운 하루"),
  l(
    "The guide walks you through an old French Concession neighbourhood in the morning. The afternoon is yours: a museum, some independent shopping or time to pack.",
    "上午跟导游走原法租界街区。下午空出来，想看博物馆、自己逛街，或回酒店收拾行李都行。",
    "오전에는 가이드와 옛 프랑스 조계지를 걷습니다. 오후에는 박물관에 가거나 혼자 쇼핑하고 짐을 정리할 수 있습니다.",
  ),
);

const flyXianToGuilin = (n: number) => day(
  n,
  l("Fly to Guilin", "飞往桂林", "구이린으로 이동"),
  l(
    "The economy flight from Xi’an to Guilin takes about two hours. A local driver meets you at the Guilin airport and takes you to the hotel. The evening is free; sleep in Guilin before the river boat.",
    "西安到桂林的经济舱航班约 2 小时。桂林司机接机送酒店，晚上自己安排；住桂林，第二天再坐漓江船。",
    "시안에서 구이린까지 이코노미 항공편으로 약 2시간 갑니다. 구이린 기사가 공항에서 호텔로 모십니다. 저녁은 자유 시간이고 다음 날 리강 배를 타기 전 구이린에서 숙박합니다.",
  ),
);

const flyXianToShanghai = (n: number) => day(
  n,
  l("Fly to Shanghai", "飞往上海", "상하이로 이동"),
  l(
    "If your flight leaves after lunch, the morning has time for the square around the Big Wild Goose Pagoda. Xi’an airport is about an hour from the city, and the economy flight to Shanghai takes a little over two hours. A Shanghai driver meets you; the Bund lights come on after dark.",
    "航班在午饭后的话，上午还能去大雁塔广场走走。西安机场离市区约 1 小时车程，飞上海两个多小时。上海司机接机；天黑后外滩会亮灯。",
    "항공편이 점심 이후라면 오전에 대안탑 광장을 둘러볼 수 있습니다. 시안 공항은 시내에서 차로 약 1시간이고 상하이까지 이코노미 항공편으로 2시간 남짓 걸립니다. 상하이 기사가 공항에서 맞이하며 해가 지면 와이탄에 불이 켜집니다.",
  ),
);

const trainGuilinToHongKong = (n: number) => day(
  n,
  l("High-speed train to Hong Kong", "高铁前往香港", "고속철도로 홍콩"),
  l(
    "Drive about 1.5 hours from Yangshuo to Guilin West station. Only two or three direct trains a day run to Hong Kong West Kowloon, and the ride takes about 3 hours 20 minutes, so the day is built around the confirmed departure. Mainland exit and Hong Kong entry checks both happen inside West Kowloon station. A Hong Kong driver takes you to the hotel; the evening by Victoria Harbour is yours.",
    "从阳朔坐车约 1.5 小时到桂林西站。去香港西九龙的直达车一天只有两三班，车程约 3 小时 20 分，这天就按确认的车次排。内地出境和香港入境都在西九龙站里办。香港司机送你去酒店，晚上去维多利亚港，自己安排。",
    "양숴에서 차로 약 1.5시간 걸려 구이린시역에 갑니다. 홍콩 웨스트카오룽까지 가는 직통 열차는 하루 두세 편뿐이고 약 3시간 20분 걸려 이날 일정은 확정된 열차 시간에 맞춥니다. 중국 본토 출국 심사와 홍콩 입국 심사는 모두 웨스트카오룽역 안에서 합니다. 홍콩 기사가 호텔로 모시고, 저녁은 자유 시간이라 항구 야경을 보러 가도 좋습니다.",
  ),
);

const departHongKong = (n: number) => day(
  n,
  l("Depart Hong Kong", "香港返程", "홍콩 출발"),
  l(
    "Your driver takes you to Hong Kong International Airport. If you want more time in Hong Kong, extra nights can be added before the flight; days in Hong Kong do not count toward the mainland’s 10-day visa-free limit.",
    "司机送你去香港国际机场。想在香港多玩几天，可以在回程前加住；香港的天数不算在内地 10 天免签的时限里。",
    "기사가 홍콩국제공항까지 모십니다. 홍콩에 더 머물고 싶으면 출국 전 숙박을 더할 수 있습니다. 홍콩에서 보내는 날은 중국 본토 무비자 10일 기한에 들어가지 않습니다.",
  ),
);

const flyXianToChongqingAndBoard = (n: number) => day(
  n,
  l("Fly to Chongqing and board the ship", "飞重庆，晚上登船", "충칭으로 이동 후 승선"),
  l(
    "Take a morning economy flight from Xi’an to Chongqing, about 1.5 hours. With your bags in the vehicle, the driver stops at the Liziba monorail station and Hongyadong in the afternoon. Boarding at Chaotianmen pier opens at about 18:00, dinner is on the ship and it sails at about 21:00. If the water level moves boarding to another pier, the cruise company runs a transfer from central Chongqing.",
    "上午坐经济舱航班从西安飞重庆，约 1.5 小时。行李放车上，下午司机带你去看李子坝轻轨穿楼和洪崖洞。朝天门码头约 18:00 开始登船，晚餐在船上吃，约 21:00 开船。如果因水位改在别的码头登船，游轮公司会从重庆市区安排接驳车。",
    "오전 이코노미 항공편으로 시안에서 충칭까지 약 1.5시간 갑니다. 짐은 차에 두고 오후에 기사와 리쯔바 모노레일역과 훙야둥에 들릅니다. 차오톈먼 부두에서 약 18:00부터 승선하고 저녁은 배에서 먹으며 약 21:00에 출발합니다. 수위 때문에 다른 부두에서 승선하게 되면 선사가 충칭 시내에서 연결 차량을 운행합니다.",
  ),
);

// ---------------------------------------------------------------------------
// 1. Classic China, private
// ---------------------------------------------------------------------------

const classicPrivateSlug = "beijing-xian-chengdu-guilin-shanghai-14-day-private-tour";
const classicGroupSlug = "beijing-xian-chengdu-guilin-shanghai-14-day-small-group-tour";

const classicItinerary = (mode: Mode): readonly PrivateTourDay[] => [
  arriveBeijing(1, mode),
  forbiddenCity(2),
  greatWall(3, mode === "group" ? "hutong" : "none"),
  templeAndSummerPalace(4),
  trainToXian(5),
  terracottaAndWall(6),
  trainToChengdu(7),
  pandas(8, mode),
  flyToGuilin(9, "Chengdu"),
  liRiver(10),
  yulongCountryside(11),
  flyToShanghai(12),
  shanghaiDay(13, mode),
  departShanghai(14, mode),
];

const classicHotelNote = l(
  "You share twin rooms for 13 nights in breakfast-included hotels at the four-star standard (4 diamonds on Trip.com, also called Ctrip): Beijing 4, Xi’an 2, Chengdu 2, Guilin 1, Yangshuo 2 and Shanghai 2. We name the hotels and room types before payment.",
  "两人一间，共住 13 晚含早的携程 4 钻标准酒店：北京 4 晚、西安 2 晚、成都 2 晚、桂林 1 晚、阳朔 2 晚、上海 2 晚。酒店名称和房型会在付款前确认。",
  "2인 1실로 조식 포함 씨트립 4다이아 등급 호텔에서 13박합니다. 베이징 4박, 시안 2박, 청두 2박, 구이린 1박, 양숴 2박, 상하이 2박입니다. 호텔 이름과 객실 형태는 결제 전에 확인합니다.",
);

const classicPrivate: PrivateTourProduct = {
  id: "private-tour-beijing-xian-chengdu-guilin-shanghai-14d13n",
  slug: classicPrivateSlug,
  days: 14,
  nights: 13,
  servicePolicy,
  includesDomesticFlights: true,
  title: l(
    "Beijing, Xi'an, Chengdu, Guilin & Shanghai: 14-Day Private Tour",
    "北京·西安·成都·桂林·上海 14 天 13 晚私家团",
    "베이징·시안·청두·구이린·상하이 14일 프라이빗 투어",
  ),
  metadataTitle: l(
    "2-Week China Private Tour: Beijing, Pandas, Guilin, Shanghai",
    "北京西安成都桂林上海14天私家团",
    "중국 14일 프라이빗 투어: 베이징에서 상하이까지",
  ),
  metadataDescription: l(
    "14-day private tour: Great Wall, Terracotta Warriors, pandas, Li River, Shanghai. Per person USD 3,990 for 2 travellers, 3,190 for 6; domestic flights included.",
    "14 天私家团：长城、兵马俑、大熊猫、漓江与上海。每人价格：2 人同行 ¥25,930，6 人同行 ¥20,730；含国内航班与高铁。",
    "14일 프라이빗 투어: 만리장성, 병마용, 판다, 리강, 상하이. 1인 요금 2명 ₩5,580,000, 6명 ₩4,460,000. 국내선·고속철도 포함.",
  ),
  eyebrow: l(
    "Beijing to Shanghai in 14 days, with time for pandas and the Li River",
    "14 天从北京到上海，也留时间看熊猫、坐漓江船",
    "베이징에서 상하이까지 14일, 판다와 리강에도 시간을 씁니다",
  ),
  lede: l(
    "For two sharing a twin room, our 14-day Beijing–Xi’an–Chengdu–Guilin–Shanghai private route starts at USD 3,990 each; international flights are extra. Two trains and two short domestic flights keep the long crossings from eating up the sightseeing days.",
    "2 人住一间，走北京、西安、成都、桂林到上海的 14 天私家团，每人 ¥25,930 起，国际机票另计。两段高铁和两段国内航班把跨城时间压下来，才有整天看兵马俑和坐漓江船。",
    "2명이 2인 1실로 가는 베이징·시안·청두·구이린·상하이 14일 프라이빗 투어는 1인 ₩5,580,000부터입니다. 국제선은 별도입니다. 고속철도 2번과 국내선 2번으로 도시 간 이동 시간을 줄여 병마용과 리강에 하루씩 씁니다.",
  ),
  summary: l(
    "Thirteen hotel nights include breakfast. In each city a local guide and vehicle are for your party on touring days; the named tickets, transfers, two second-class trains and two economy flights are included. On travel days, a driver sees you off and another meets you at the next stop.",
    "13 晚酒店都含早餐。游览日由当地导游和车只带你们一行；所列门票、接送、两段二等座高铁和两段经济舱航班都含。转场日由司机送站，到了下一站再由当地司机接。",
    "호텔 13박에는 모두 조식이 포함됩니다. 관광일에는 도시별 현지 가이드와 차량을 일행만 이용하며 명시된 입장권과 이동, 고속철도 2등석 2구간, 이코노미 국내선 2구간이 포함됩니다. 이동일에는 출발지와 도착지 기사가 각각 맡습니다.",
  ),
  highlights: lists(
    [
      "Four Beijing nights with the Great Wall at Mutianyu",
      "A full Terracotta Warriors day",
      "Chengdu pandas near opening time",
      "Li River cruise, domestic flights and trains included",
    ],
    [
      "北京住 4 晚，含慕田峪长城",
      "兵马俑完整一天",
      "开园不久看成都大熊猫",
      "含漓江游船、国内航班与高铁",
    ],
    [
      "베이징 4박과 무톈위 만리장성",
      "병마용 종일 일정",
      "개장 직후 청두 판다",
      "리강 유람선, 국내선과 고속철도 포함",
    ],
  ),
  itinerary: classicItinerary("private"),
  hotelNote: classicHotelNote,
  serviceNote: l(
    "On city touring days, an English-speaking local guide and vehicle serve your party only. We include every airport and station transfer, the named first-entry tickets, the Li River cruise with your luggage moved separately, and one Yulong River bamboo raft. The long crossings are second-class trains Beijing–Xi’an–Chengdu and economy flights Chengdu–Guilin and Guilin–Shanghai. Guides change by city; drivers take you to and from stations and airports on travel days. A Korean-speaking guide costs the same where available, checked city by city.",
    "各地游览日由当地导游和车只带你们一行。价格含全部机场、车站接送，所列首道门票、漓江船及行李另车转运，还有一次遇龙河竹筏。城际交通是北京—西安—成都二等座高铁，成都—桂林、桂林—上海经济舱航班。导游按城市更换，转场日由两地司机负责接送；导游语种按订单确认。",
    "도시별 관광일에는 한국어 현지 가이드와 전용 차량을 일행만 이용합니다. 공항·역 이동, 명시된 기본 입장권, 짐을 별도로 옮기는 리강 유람선과 위룽허 대나무 뗏목 1회가 포함됩니다. 베이징–시안–청두 고속철도 2등석과 청두–구이린, 구이린–상하이 이코노미 항공편도 포함됩니다. 가이드는 도시마다 바뀌고 이동일에는 양쪽 기사가 역이나 공항을 맡습니다. 한국어 가이드는 추가 요금 없이 도시별 가능 여부를 확인합니다.",
  ),
  exclusions: exclusions(
    ["Single-room supplement", "Checked baggage above the airline's included allowance", "The Day 13 option not chosen in writing"],
    ["单房差", "超出航司免费额度的托运行李", "第 13 天未书面选定的另一方案"],
    ["1인실 추가금", "항공사 무료 허용량을 넘는 위탁 수하물", "13일 차에 서면으로 선택하지 않은 다른 일정"],
  ),
  bookingNote: privateBookingNote,
  faq: [
    faq(
      l("How much does a 14-day private China tour cost?", "中国 14 天私家团大概多少钱？", "중국 14일 프라이빗 투어는 얼마인가요?"),
      l(
        "For the 14-day Beijing–Xi’an–Chengdu–Guilin–Shanghai private trip, two people sharing a twin room pay USD 3,990 each, or USD 7,980 together. Four pay USD 3,390 each; six pay USD 3,190. Your land price covers 13 hotel nights with breakfast, city guides and vehicles on touring days, named tickets, two high-speed trains and two domestic flights. Add international flights, lunches and dinners separately. Eight or more travelling together can choose their own dates at USD 2,890 each; ask us for a written price at other group sizes.",
        "北京、西安、成都、桂林到上海的 14 天私家团，2 人住一间每人 ¥25,930，两人共 ¥51,860；4 人每人 ¥22,030，6 人每人 ¥20,730。这个价格含 13 晚早餐酒店、各地游览日的私人导游和车、所列门票、两段高铁及两段国内航班。国际机票和午晚餐另付。8 人以上一起出行，可自选日期按每人 ¥18,780 走；其他人数我们书面报价。",
        "베이징·시안·청두·구이린·상하이 14일 프라이빗 투어는 2명, 2인 1실이면 1인 ₩5,580,000, 두 명 합계 ₩11,160,000입니다. 4명은 1인 ₩4,740,000, 6명은 ₩4,460,000입니다. 조식 포함 호텔 13박, 도시별 관광일의 전용 가이드와 차량, 명시된 입장권, 고속철도 2구간과 국내선 2구간이 포함됩니다. 국제선과 중식·석식은 별도입니다. 8명 이상 함께 가면 원하는 날짜에 1인 ₩4,040,000이며 다른 인원은 서면 견적을 드립니다.",
      ),
    ),
    faq(
      l("How is this different from the small-group version?", "和小团版本有什么不同？", "소규모 그룹 상품과 무엇이 다른가요?"),
      l(
        "The Beijing–Xi’an–Chengdu–Guilin–Shanghai route is available both ways. On private dates, only your party uses the guide and car, and you can adjust the pace or some stops; two travellers pay from USD 3,990 each. The 2027 small group is USD 2,890 each, with 8–12 guests on 10 April, 8 May, 11 September or 9 October. Everyone follows the same plan.",
        "北京、西安、成都、桂林到上海这条线可选私家团或小团。私家团由你选日期，导游和车只带你们，节奏及部分景点能调整；2 人同行每人 ¥25,930 起。2027 年小团每人 ¥18,780，4 月 10 日、5 月 8 日、9 月 11 日或 10 月 9 日出发，8–12 人一起按固定行程走。",
        "베이징·시안·청두·구이린·상하이 일정은 프라이빗과 소규모 그룹으로 운영합니다. 프라이빗은 날짜를 고르고 가이드와 차량을 일행만 쓰며 속도와 일부 방문지를 바꿀 수 있습니다. 2명 기준 1인 ₩5,580,000부터입니다. 2027년 소규모 그룹은 1인 ₩4,040,000으로 4월 10일, 5월 8일, 9월 11일 또는 10월 9일에 8~12명이 같은 계획으로 갑니다.",
      ),
    ),
    faq(
      l("Which 14-day China route should we choose?", "14 天中国线路该选哪条？", "14일 중국 일정은 어느 것을 고르면 되나요?"),
      l(
        "All four 14-day private routes begin in Beijing and Xi’an. For a first trip with Chengdu pandas and the Li River, the Beijing–Shanghai classic starts at USD 3,990 each for two. Zhangjiajie in place of Chengdu starts at USD 3,890; Yunnan’s old towns and Shangri-La at about 3,300 metres also start at USD 3,890. For Huangshan, West Lake and Suzhou, start at USD 3,790. Choose the stop you would regret missing.",
        "四条 14 天私家团都先走北京、西安。第一次来，想看熊猫和漓江，经典线 2 人同行每人 ¥25,930 起；想把成都换成张家界，每人 ¥25,280 起。云南古城加海拔约 3,300 米的香格里拉，也是每人 ¥25,280 起；黄山、西湖、苏州线每人 ¥24,630 起。先选你最不想错过的地方。",
        "14일 프라이빗 일정 네 가지는 모두 베이징과 시안부터 시작합니다. 첫 여행에 청두 판다와 리강을 넣는 기본 일정은 2명 기준 1인 ₩5,580,000부터입니다. 청두 대신 장가계는 ₩5,440,000부터, 윈난 고성과 해발 약 3,300미터 샹그릴라도 ₩5,440,000부터입니다. 황산·서호·쑤저우는 ₩5,300,000부터입니다. 가장 놓치기 싫은 지역을 먼저 고르세요.",
      ),
    ),
    faq(
      l("When is the best time to go?", "什么时候去最好？", "언제 가는 것이 좋은가요?"),
      l(
        "For the 14-day Beijing–Xi’an–Chengdu–Guilin–Shanghai route, April–May and September–October give the most comfortable mix of weather. July–August is hot and humid in Xi’an and Guilin, while pandas are less active. Low winter water can shorten the Li River cruise. Trains and sights are especially busy in the first weeks of May and October.",
        "北京、西安、成都、桂林到上海这条 14 天线，4–5 月或 9–10 月走最舒服。7–8 月西安、桂林又热又湿，熊猫也不太动；冬季水位低，漓江船程可能缩短。五一、国庆第一周火车和景点会更挤。",
        "베이징·시안·청두·구이린·상하이 14일 일정은 4~5월과 9~10월이 날씨를 맞추기 좋습니다. 7~8월 시안과 구이린은 덥고 습하며 판다의 활동도 적습니다. 겨울에는 낮은 수위로 리강 배 구간이 짧아질 수 있습니다. 5월과 10월 첫 주는 열차와 명소가 특히 붐빕니다.",
      ),
    ),
    faq(
      l("Can we change the route?", "可以改路线吗？", "일정을 바꿀 수 있나요?"),
      l(
        "On the 14-day Beijing–Xi’an–Chengdu–Guilin–Shanghai private tour, we can quote a version with Zhangjiajie instead of Chengdu, a Yangtze cruise or extra nights. We put the changed route and price in writing before payment.",
        "北京、西安、成都、桂林到上海的 14 天私家团可以改，比如把成都换成张家界、加长江游轮，或多住几晚。改后的路线和价格先书面发给你，确认后才付款。",
        "베이징·시안·청두·구이린·상하이 14일 프라이빗 투어는 청두 대신 장가계를 넣거나 양쯔강 크루즈와 숙박을 추가할 수 있습니다. 바뀐 일정과 요금은 결제 전에 서면으로 안내합니다.",
      ),
    ),
    faq(
      l("Are there shopping stops?", "有购物店吗？", "쇼핑 일정이 있나요?"),
      l(
        "The 14-day Beijing–Xi’an–Chengdu–Guilin–Shanghai private tour has no shopping stops. We add a visit or service only after you agree to it.",
        "北京、西安、成都、桂林到上海的 14 天私家团不进购物店。要加景点或服务，先由你同意。",
        "베이징·시안·청두·구이린·상하이 14일 프라이빗 투어에는 쇼핑 일정이 없습니다. 방문지나 서비스를 추가할 때는 먼저 동의를 받습니다.",
      ),
    ),
  ],
  heroImage: image(
    classicPrivateSlug,
    "hero.webp",
    l("Great Wall watchtower in the hills north of Beijing", "北京北部山间的长城敌楼", "베이징 북쪽 산자락의 만리장성 망루"),
    l("The Great Wall gets its own day during four nights in Beijing.", "北京连住 4 晚，慕田峪长城单独走一天。", "베이징 4박 중 하루를 만리장성에 씁니다."),
  ),
  gallery: [
    image(
      classicPrivateSlug,
      "gallery-1.webp",
      l("Terracotta Warriors in an excavation pit", "兵马俑坑中的陶俑", "발굴 갱 안의 병마용"),
      l("We keep most of the Xi’an day for the Terracotta Warriors.", "西安这天，大半时间都在兵马俑。", "시안에서는 하루 대부분을 병마용에 남겨 둡니다."),
    ),
  ],
  routeMedia: [
    {
      day: 8,
      variants: [{
        label: l("Chengdu", "成都", "청두"),
        image: image(
          classicPrivateSlug,
          "route-day-8.webp",
          l("Giant panda eating bamboo", "正在吃竹子的大熊猫", "대나무를 먹는 판다"),
          l("We get to the Chengdu panda base shortly after it opens.", "成都熊猫基地开园不久就进去。", "청두 판다 기지는 문을 연 뒤 곧 방문합니다."),
        ),
      }],
    },
    {
      day: 10,
      variants: [{
        label: l("Li River", "漓江", "리강"),
        image: image(
          classicPrivateSlug,
          "route-day-10.webp",
          l("Boats on the Li River between karst cliffs", "喀斯特山崖间漓江上的船", "카르스트 절벽 사이 리강의 배"),
          l("The Li River boat lands in Yangshuo; stay there for two nights.", "漓江船到阳朔后，就在这里住两晚。", "리강 배를 타고 양숴에 도착해 2박합니다."),
        ),
      }],
    },
  ],
  packages: [privatePackage([usd(2, 3990), usd(4, 3390), usd(6, 3190)])],
  datePublished: PUBLISHED,
  dateModified: MODIFIED,
};

// ---------------------------------------------------------------------------
// 2. Classic China, small group (fixed departures)
// ---------------------------------------------------------------------------

const classicSmallGroup: PrivateTourProduct = {
  id: "small-group-tour-beijing-xian-chengdu-guilin-shanghai-14d13n",
  slug: classicGroupSlug,
  days: 14,
  nights: 13,
  servicePolicy,
  tourFormat: "small-group",
  includesDomesticFlights: true,
  title: l(
    "Beijing, Xi'an, Chengdu, Guilin & Shanghai: 14-Day Small-Group Tour",
    "北京·西安·成都·桂林·上海 14 天 13 晚小团",
    "베이징·시안·청두·구이린·상하이 14일 소규모 그룹 투어",
  ),
  metadataTitle: l(
    "China Small-Group Tour 2027: 14 Days, Max 12 Guests",
    "中国14天小团：最多12人",
    "중국 14일 소규모 그룹 투어: 최대 12명",
  ),
  metadataDescription: l(
    "2027 small-group tour, 14 days, 8–12 guests: Beijing, Xi'an, pandas, Li River, Shanghai. USD 2,890 per person twin share; departs 10 Apr, 8 May, 11 Sep, 9 Oct.",
    "2027 年 14 天小团，8–12 人：北京、西安、成都大熊猫、漓江与上海。每人 ¥18,780（两人一间），4 月 10 日、5 月 8 日、9 月 11 日、10 月 9 日出发。",
    "2027년 14일 소규모 그룹(8~12명): 베이징, 시안, 청두 판다, 리강, 상하이. 1인 ₩4,040,000(2인 1실), 4월 10일·5월 8일·9월 11일·10월 9일 출발.",
  ),
  eyebrow: l(
    "Four 2027 departures; 8 guests to run, 12 at most",
    "2027 年四个团期，满 8 人出发，最多 12 人",
    "2027년 네 차례 출발, 8명부터 최대 12명까지",
  ),
  lede: l(
    "A twin-share place on the 2027 Beijing–Xi’an–Chengdu–Guilin–Shanghai 14-day small group starts at USD 2,890 per person; international flights are extra. It follows the 14-day private route on four fixed departures, with no more than 12 guests and an English-speaking local guide in each city.",
    "北京、西安、成都、桂林到上海的 2027 年 14 天小团，每人 ¥18,780，按两人一间计算，国际机票另付。四个固定团期走同一条经典线，每团最多 12 人，各地由英语导游带团。",
    "베이징·시안·청두·구이린·상하이 2027년 14일 소규모 그룹은 2인 1실에 1인 ₩4,040,000입니다. 국제선은 별도입니다. 네 번의 정해진 출발일에 최대 12명이 함께 가고, 도시별 영어 현지 가이드가 안내합니다.",
  ),
  summary: l(
    "Choose 10–23 April, 8–21 May, 11–24 September or 9–22 October 2027. We confirm the group once 8 people book and close it at 12. If it is still short of 8 at 45 days out, we quote a private tour for your actual party size in writing. You can accept that price and keep the dates, or take a full refund of everything paid to us.",
    "2027 年可选 4 月 10–23 日、5 月 8–21 日、9 月 11–24 日、10 月 9–22 日。满 8 人确认出发，12 人就收满。出发前 45 天还不到 8 人，我们会按实际同行人数书面报私家团价。你可接受报价按原日期走，或拿回已付给我们的全款。",
    "2027년 출발일은 4월 10~23일, 5월 8~21일, 9월 11~24일, 10월 9~22일입니다. 8명이 예약하면 출발이 확정되고 12명에서 마감합니다. 출발 45일 전에도 8명이 안 되면 실제 동행 인원에 맞춘 프라이빗 요금을 서면으로 드립니다. 그 요금으로 같은 날짜에 출발하거나 저희에게 낸 금액을 전액 환불받을 수 있습니다.",
  ),
  highlights: lists(
    [
      "Departs 10 Apr, 8 May, 11 Sep, 9 Oct 2027",
      "Runs at 8 guests, never more than 12",
      "Full refund if the group does not run",
      "Domestic flights and high-speed trains included",
    ],
    [
      "2027 年 4 月 10 日、5 月 8 日、9 月 11 日、10 月 9 日出发",
      "满 8 人成团，最多 12 人",
      "不成团全额退款",
      "含国内航班与高铁",
    ],
    [
      "2027년 4월 10일·5월 8일·9월 11일·10월 9일 출발",
      "8명부터 출발, 최대 12명",
      "인원 미달 시 전액 환불",
      "국내선 항공과 고속철도 포함",
    ],
  ),
  itinerary: classicItinerary("group"),
  hotelNote: l(
    "The 13 hotel nights include breakfast: Beijing 4, Xi’an 2, Chengdu 2, Guilin 1, Yangshuo 2 and Shanghai 2. We use the four-star standard (4 diamonds on Trip.com, also called Ctrip) and name the hotels in your confirmation. USD 2,890 is per person sharing a twin room; a room alone adds a single supplement from USD 690.",
    "13 晚酒店都含早餐：北京 4 晚、西安 2 晚、成都 2 晚、桂林 1 晚、阳朔 2 晚、上海 2 晚。按携程 4 钻标准安排，酒店名称写在确认单上。每人 ¥18,780 按两人一间算；独住单房差 ¥4,490 起。",
    "호텔 13박에는 모두 조식이 포함됩니다. 베이징 4박, 시안 2박, 청두 2박, 구이린 1박, 양숴 2박, 상하이 2박이며 씨트립 4다이아 등급 기준입니다. 호텔 이름은 확인서에 적습니다. 1인 ₩4,040,000은 2인 1실 기준이며 혼자 쓰는 객실은 추가금 ₩970,000부터입니다.",
  ),
  serviceNote: l(
    "English-speaking local guides take the group around each city on touring days. The price includes a group vehicle, one Beijing airport pickup and one Shanghai airport drop-off on the group dates, named admissions, the Li River cruise and one Yulong River raft, second-class trains Beijing–Xi’an–Chengdu, and economy flights Chengdu–Guilin and Guilin–Shanghai.",
    "各地游览由当地英语导游带团。价格含团车、按团期的一次北京接机和一次上海送机、所列门票、漓江游船与一次遇龙河竹筏、北京—西安—成都二等座高铁，以及成都—桂林和桂林—上海经济舱航班。",
    "관광일에는 도시별 영어 현지 가이드가 안내합니다. 그룹 차량, 그룹 날짜의 베이징 공항 픽업 1회와 상하이 공항 샌딩 1회, 명시된 입장권, 리강 유람선과 위룽허 뗏목 1회, 베이징–시안–청두 고속철도 2등석, 청두–구이린과 구이린–상하이 이코노미 항공편이 포함됩니다.",
  ),
  exclusions: exclusions(
    ["Single supplement, from USD 690", "Transfers on dates other than the group's arrival and departure days", "Checked baggage above the airline's included allowance"],
    ["单房差，¥4,490 起", "团期以外日期的接送", "超出航司免费额度的托运行李"],
    ["1인실 추가금(₩970,000부터)", "그룹 도착일·출발일 외 날짜의 이동", "항공사 무료 허용량을 넘는 위탁 수하물"],
  ),
  bookingNote: l(
    "USD 2,890 is the per-person starting price for one place on a fixed departure, sharing a twin room. We need 8 booked guests to run and stop at 12. At 45 days out, if fewer than 8 have booked, we quote a private tour for your actual party size in writing. You can accept it for the same dates or take a full refund of everything paid to us. A party of 8–12 may choose its own date at the small-group price; ask us for a separate quote for 13 or more. The September departure is in Xi’an for the Mid-Autumn Festival on 15 September 2027, when trains and the Terracotta Warriors are busier. We confirm hotels, flights and the total in writing before payment.",
    "每人 ¥18,780 是固定团期一个名额、两人一间的起价。满 8 人走，最多 12 人。出发前 45 天还不到 8 人，我们会按实际同行人数书面报私家团价。你可接受报价按原日期走，或拿回已付给我们的全款。8–12 人同行可自选日期按小团价单独成团；13 人及以上请另询价。9 月团在西安遇上 2027 年 9 月 15 日中秋节，火车和兵马俑会更挤。酒店、航班和最终总价在付款前书面确认。",
    "1인 ₩4,040,000은 정기 출발 1자리, 2인 1실 기준 시작가입니다. 8명이 예약하면 출발하고 12명에서 마감합니다. 출발 45일 전에도 8명이 안 되면 실제 동행 인원에 맞춘 프라이빗 요금을 서면으로 드립니다. 그 요금으로 같은 날짜에 출발하거나 저희에게 낸 금액을 전액 환불받을 수 있습니다. 8~12명 일행은 원하는 날짜에 소규모 그룹 요금으로 단독 출발할 수 있고, 13명 이상은 별도 견적이 필요합니다. 9월 그룹은 2027년 9월 15일 중추절에 시안에 있어 열차와 병마용이 더 붐빕니다. 호텔, 항공편과 최종 금액은 결제 전에 서면으로 확인합니다.",
  ),
  faq: [
    faq(
      l("What happens if the group does not reach 8 guests?", "不到 8 人怎么办？", "8명이 모이지 않으면 어떻게 되나요?"),
      l(
        "For the 2027 Beijing–Xi’an–Chengdu–Guilin–Shanghai small group, we check numbers 45 days before departure. If fewer than 8 have booked, we quote a private tour for your actual party size in writing. You can accept it for the same dates or take a full refund of everything paid to us. For two travellers, the private price is USD 3,990 each, against the USD 2,890 small-group price. Until we confirm the group, book international flights you can change or refund.",
        "2027 年北京、西安、成都、桂林到上海的小团，我们在出发前 45 天确认人数。若不足 8 人，我们会按实际同行人数书面报私家团价。你可接受报价按原日期走，或拿回已付给我们的全款。2 人私家团每人 ¥25,930，小团每人 ¥18,780；成团前建议订能改退的国际机票。",
        "2027년 베이징·시안·청두·구이린·상하이 소규모 그룹은 출발 45일 전에 인원을 확인합니다. 8명 미만이면 실제 동행 인원에 맞춘 프라이빗 요금을 서면으로 드립니다. 그 요금으로 같은 날짜에 가거나 저희에게 낸 금액을 전액 환불받을 수 있습니다. 프라이빗은 2명 기준 1인 ₩5,580,000, 그룹은 ₩4,040,000입니다. 출발 확정 전에는 변경·환불 가능한 국제선 항공권을 권합니다.",
      ),
    ),
    faq(
      l("Can I join on my own?", "一个人可以报名吗？", "혼자 참가할 수 있나요?"),
      l(
        "Solo travellers can join the 14-day Beijing–Xi’an–Chengdu–Guilin–Shanghai small group. The USD 2,890 price assumes two sharing; a room of your own costs a single supplement from USD 690. We do not assign strangers to share.",
        "一个人也能报名北京、西安、成都、桂林到上海的 14 天小团。每人 ¥18,780 是两人一间的价格；想独住，单房差 ¥4,490 起。我们不会安排陌生人拼房。",
        "베이징·시안·청두·구이린·상하이 14일 소규모 그룹에는 혼자도 참가할 수 있습니다. 1인 ₩4,040,000은 2인 1실 기준이며 혼자 객실을 쓰면 추가금이 ₩970,000부터입니다. 모르는 사람과 합실시키지 않습니다.",
      ),
    ),
    faq(
      l("We are a group of 8 or more. Can we have our own departure?", "我们有 8 人以上，可以单独成团吗？", "8명 이상인데 단독 출발이 가능한가요?"),
      l(
        "Eight to twelve travelling together can book the 14-day Beijing–Xi’an–Chengdu–Guilin–Shanghai route on their own dates at USD 2,890 per person. For 13 or more, ask us for a separate quote. We confirm the hotel rooms and tickets for those dates before booking.",
        "8–12 人同行，可以自选日期单独走北京、西安、成都、桂林到上海的 14 天路线，每人按小团价 ¥18,780 计算。13 人及以上请另询价。酒店房间和门票要先按你的日期确认。",
        "8~12명 일행이면 베이징·시안·청두·구이린·상하이 14일 일정을 원하는 날짜에 단독으로 갈 수 있습니다. 요금은 1인 ₩4,040,000이며 13명 이상은 별도 견적이 필요합니다. 해당 날짜의 호텔과 입장권을 확인합니다.",
      ),
    ),
    faq(
      l("How is this different from the private version?", "和私家团有什么不同？", "프라이빗 투어와 무엇이 다른가요?"),
      l(
        "On the Beijing–Xi’an–Chengdu–Guilin–Shanghai route, hotels and inclusions stay the same. The 2027 small group is USD 2,890 per person on fixed dates and has one Day 8 and Day 13 plan for everyone. Private dates and a guide and car just for your party start at USD 3,990 each for two travellers or USD 3,190 each for six.",
        "北京、西安、成都、桂林到上海这条线，两种版本的酒店和包含内容相同。2027 年小团按固定日期走，第 8 天和第 13 天方案统一，每人 ¥18,780。私家团可选日期，导游和车只服务你们；2 人同行每人 ¥25,930 起，6 人每人 ¥20,730。",
        "베이징·시안·청두·구이린·상하이 일정은 두 상품의 호텔과 포함 내역이 같습니다. 2027년 소규모 그룹은 정해진 날짜와 8일 차, 13일 차 계획으로 1인 ₩4,040,000입니다. 프라이빗은 날짜를 고르고 가이드와 차량을 일행만 쓰며 2명 기준 1인 ₩5,580,000, 6명 기준 ₩4,460,000부터입니다.",
      ),
    ),
    faq(
      l("Is there a tour leader for the whole trip?", "有全程领队吗？", "전 일정 동행하는 인솔자가 있나요?"),
      l(
        "The 14-day Beijing–Xi’an–Chengdu–Guilin–Shanghai small group has no single leader travelling the whole route. An English-speaking local guide takes the group around each city; drivers handle station and airport handovers. There are no shopping stops.",
        "北京、西安、成都、桂林到上海的 14 天小团没有全程领队。各地游览由英语当地导游带团，火车和航班转场由两地司机负责接送。全程不进购物店。",
        "베이징·시안·청두·구이린·상하이 14일 소규모 그룹에는 전 구간 동행 인솔자가 없습니다. 도시별 영어 현지 가이드가 관광을 맡고 역과 공항에서는 출발지와 도착지 기사가 인계합니다. 쇼핑 일정은 없습니다.",
      ),
    ),
  ],
  heroImage: image(
    classicGroupSlug,
    "hero.webp",
    l("Karst peaks along the Li River", "漓江两岸的喀斯特山峰", "리강 양쪽의 카르스트 봉우리"),
    l("Day 10 follows the Li River downstream to Yangshuo.", "第 10 天坐漓江船一路到阳朔。", "10일 차에는 리강 배를 타고 양숴까지 갑니다."),
  ),
  gallery: [
    image(
      classicGroupSlug,
      "gallery-1.webp",
      l("Giant pandas resting on a wooden platform", "在木架上休息的大熊猫", "나무 받침대에서 쉬는 판다"),
      l("An early start puts the group at the panda base near opening.", "这天早出发，赶在开园不久看熊猫。", "일찍 출발해 개장 무렵 판다 기지에 갑니다."),
    ),
  ],
  routeMedia: [
    {
      day: 3,
      variants: [{
        label: l("Great Wall", "长城", "만리장성"),
        image: image(
          classicGroupSlug,
          "route-day-3.webp",
          l("Great Wall watchtower at sunrise", "日出时的长城敌楼", "해 뜰 무렵의 만리장성 망루"),
          l("Allow about 90 minutes on the road from central Beijing to Mutianyu.", "北京市区开车去慕田峪，约 90 分钟。", "베이징 도심에서 무톈위까지 차로 약 90분입니다."),
        ),
      }],
    },
    {
      day: 6,
      variants: [{
        label: l("Xi'an", "西安", "시안"),
        image: image(
          classicGroupSlug,
          "route-day-6.webp",
          l("Terracotta general figure", "兵马俑将军俑", "병마용 장군상"),
          l("We leave the morning and early afternoon to the Terracotta Warriors.", "兵马俑安排在上午，一直看到午后。", "병마용은 오전부터 이른 오후까지 봅니다."),
        ),
      }],
    },
  ],
  packages: [{
    id: "small-group-departure",
    guideMode: "standard" as const,
    label: l("8–12 guests, fixed dates", "8–12 人，固定出发", "8~12명, 정기 출발"),
    summary: l(
      "2027 departures are 10 April, 8 May, 11 September and 9 October. The group runs with 8 guests and closes at 12; if it does not run, we refund everything paid to us. No shopping stops are scheduled.",
      "2027 年出发日为 4 月 10 日、5 月 8 日、9 月 11 日和 10 月 9 日。满 8 人走，最多 12 人；未成团就退还已付给我们的全款。全程无购物店安排。",
      "2027년 출발일은 4월 10일, 5월 8일, 9월 11일, 10월 9일입니다. 8명부터 출발하고 12명에서 마감합니다. 출발하지 못하면 저희에게 낸 금액을 전액 환불하며 쇼핑 일정은 없습니다.",
    ),
    prices: [usd(2, 2890)],
  }],
  datePublished: PUBLISHED,
  dateModified: MODIFIED,
};

// ---------------------------------------------------------------------------
// 3. China Landscapes, private (Zhangjiajie instead of Chengdu)
// ---------------------------------------------------------------------------

const landscapesSlug = "beijing-xian-zhangjiajie-guilin-shanghai-14-day-private-tour";

const landscapes: PrivateTourProduct = {
  id: "private-tour-beijing-xian-zhangjiajie-guilin-shanghai-14d13n",
  slug: landscapesSlug,
  days: 14,
  nights: 13,
  servicePolicy,
  includesDomesticFlights: true,
  title: l(
    "Beijing, Xi'an, Zhangjiajie, Guilin & Shanghai: 14-Day Private Tour",
    "北京·西安·张家界·桂林·上海 14 天 13 晚私家团",
    "베이징·시안·장가계·구이린·상하이 14일 프라이빗 투어",
  ),
  metadataTitle: l(
    "14-Day China Private Tour with Zhangjiajie and Guilin",
    "北京西安张家界桂林上海14天私家团",
    "장가계 포함 중국 14일 프라이빗 투어",
  ),
  metadataDescription: l(
    "14-day private tour: Beijing, Xi'an, Zhangjiajie, Li River, Shanghai. Per person USD 3,890 for 2 travellers, 3,090 for 6; domestic flights included.",
    "14 天私家团：北京、西安、张家界、漓江与上海。每人价格：2 人同行 ¥25,280，6 人同行 ¥20,080；含国内航班与高铁。",
    "14일 프라이빗 투어: 베이징, 시안, 장가계, 리강, 상하이. 1인 요금 2명 ₩5,440,000, 6명 ₩4,320,000. 국내선·고속철도 포함.",
  ),
  eyebrow: l(
    "Swap the panda stop for Zhangjiajie’s long walking days",
    "用张家界替换成都熊猫，山里要多走路",
    "청두 판다 대신 장가계, 산길을 더 걷는 일정",
  ),
  lede: l(
    "Two travelling together pay from USD 3,890 each, twin share, on the 14-day Beijing–Xi’an–Zhangjiajie–Guilin–Shanghai private route; international flights are extra. Zhangjiajie gets three nights, but the direct train from there to Guilin takes about seven hours. Plan on a full travel day.",
    "想走北京、西安、张家界、桂林到上海这 14 天，2 人同行、两人一间每人 ¥25,280 起，国际机票另计。张家界住三晚，但到桂林的直达高铁约 7 小时，那一天基本都在路上。",
    "장가계를 넣은 베이징·시안·구이린·상하이 14일 프라이빗 투어는 2명, 2인 1실에 1인 ₩5,440,000부터입니다. 국제선은 별도입니다. 장가계에서 3박하지만 구이린 직통 열차가 약 7시간 걸려 그날은 거의 이동에 씁니다.",
  ),
  summary: l(
    "Breakfast is included on all 13 hotel nights. The price covers local private guides and vehicles on touring days, transfers, named tickets including Tianmen Mountain, two trains and two economy flights. In Zhangjiajie, allow several hours on paths and steps even with the elevator and cable car.",
    "13 晚酒店都含早餐。游览日的当地私人导游和车、接送、天门山等所列门票、两段高铁和两段经济舱航班都在价格内。张家界有电梯和索道，但步道、台阶还是要走几个小时。",
    "호텔 13박에는 조식이 포함됩니다. 관광일의 도시별 전용 가이드와 차량, 이동, 천문산 등 명시된 입장권, 열차 2구간과 이코노미 항공 2구간이 요금에 들어 있습니다. 장가계는 엘리베이터와 케이블카를 타도 길과 계단을 몇 시간 걷습니다.",
  ),
  highlights: lists(
    [
      "Zhangjiajie National Forest Park, the peaks behind Avatar's floating mountains",
      "Tianmen Mountain and its cliff-top walkways",
      "Li River cruise and two Yangshuo nights",
      "The Forbidden City, the Great Wall and the Terracotta Warriors",
    ],
    [
      "张家界国家森林公园，《阿凡达》悬浮山的灵感来源",
      "天门山与悬崖栈道",
      "漓江游船与阳朔 2 晚",
      "故宫、长城与兵马俑",
    ],
    [
      "영화 아바타의 떠 있는 산에 영감을 준 장가계 국가삼림공원",
      "천문산과 절벽 잔도",
      "리강 유람선과 양숴 2박",
      "자금성, 만리장성과 병마용",
    ],
  ),
  itinerary: [
    arriveBeijing(1, "private"),
    forbiddenCity(2),
    greatWall(3),
    trainToXian(4),
    terracottaAndWall(5),
    flyXianToZhangjiajie(6),
    forestPark(7),
    tianmenMountain(8),
    flyToGuilin(9, "Zhangjiajie"),
    liRiver(10),
    yulongCountryside(11),
    flyToShanghai(12),
    shanghaiDay(13, "private"),
    departShanghai(14, "private"),
  ],
  hotelNote: l(
    "The 13 hotel nights include breakfast and use twin rooms at the four-star standard (4 diamonds on Trip.com/Ctrip). Sleep in Beijing 3 nights, Xi’an 2, Wulingyuan 2, Zhangjiajie city 1, Guilin 1, Yangshuo 2 and Shanghai 2. We confirm each hotel name and room type before payment.",
    "这 13 晚按两人一间，早餐都含，酒店按携程 4 钻标准选。北京 3 晚、西安 2 晚、武陵源 2 晚、张家界市区 1 晚、桂林 1 晚、阳朔 2 晚、上海 2 晚。付款前把酒店名称和房型确认给你。",
    "호텔 13박은 조식 포함 2인 1실이며 씨트립 4다이아 등급 기준입니다. 베이징 3박, 시안 2박, 무릉원 2박, 장가계 시내 1박, 구이린 1박, 양숴 2박, 상하이 2박입니다. 호텔 이름과 객실 형태는 결제 전에 확인합니다.",
  ),
  serviceNote: l(
    "On touring days, only your party uses the English-speaking local guide and vehicle. The price covers transfers and named first entries, including Zhangjiajie National Forest Park, the Bailong Elevator and Tianmen Mountain cable car. It also covers the Li River cruise with separate luggage transfer, one Yulong River raft, the second-class Beijing–Xi’an train, economy flights Xi’an–Zhangjiajie and Guilin–Shanghai, and the direct Zhangjiajie–Guilin train. Guides change with the city; one driver sees you off and another meets you after a train or flight. Korean-speaking guides are the same price where available.",
    "游览日的当地导游和车只服务你们。所列首道门票含张家界国家森林公园、百龙天梯和天门山索道；漓江船与行李另车转运、一次遇龙河竹筏也含。城际交通含北京—西安二等座高铁、西安—张家界和桂林—上海经济舱航班、张家界—桂林直达高铁。导游每城更换，转场由两地司机接送；语种按订单确认。",
    "관광일에는 한국어 현지 가이드와 전용 차량을 일행만 이용합니다. 장가계 국가삼림공원, 백룡엘리베이터, 천문산 케이블카 등 기본 입장권과 짐을 따로 옮기는 리강 배, 위룽허 뗏목 1회가 포함됩니다. 베이징–시안 고속철도 2등석, 시안–장가계와 구이린–상하이 이코노미 항공편, 장가계–구이린 직통 열차도 포함됩니다. 가이드는 도시별로 바뀌며 이동일에는 양쪽 기사가 역과 공항을 맡습니다. 한국어 가이드는 추가 요금 없이 도시별 가능 여부를 확인합니다.",
  ),
  exclusions: exclusions(
    ["Single-room supplement", "Grand Canyon Glass Bridge and other Zhangjiajie add-ons unless listed", "Checked baggage above the airline's included allowance"],
    ["单房差", "未列明的大峡谷玻璃桥等张家界加项", "超出航司免费额度的托运行李"],
    ["1인실 추가금", "명시되지 않은 대협곡 유리다리 등 장가계 추가 일정", "항공사 무료 허용량을 넘는 위탁 수하물"],
  ),
  bookingNote: privateBookingNote,
  faq: [
    faq(
      l("How much does this 14-day tour cost?", "这条 14 天线路多少钱？", "이 14일 일정은 얼마인가요?"),
      l(
        "The 14-day Beijing–Xi’an–Zhangjiajie–Guilin–Shanghai private route is USD 3,890 each for two sharing a twin room, USD 7,780 for the pair. With four it is USD 3,290 each; with six, USD 3,090. That pays for 13 breakfasts and hotel nights, private local guides and vehicles on touring days, Forest Park and Tianmen Mountain tickets, two trains and two domestic flights. International flights and lunches and dinners are separate. If eight or more go together, the own-date small-group price is USD 2,790 each. We quote other party sizes in writing.",
        "北京、西安、张家界、桂林到上海的 14 天私家团，2 人住一间每人 ¥25,280，两人共 ¥50,560；4 人每人 ¥21,380，6 人每人 ¥20,080。价格含 13 晚早餐酒店、游览日各地私人导游和车、森林公园和天门山等门票、两段高铁与两段国内航班。国际机票、午餐和晚餐不含。8 人及以上可自选日期，按小团价每人 ¥18,130；其他人数书面报价。",
        "베이징·시안·장가계·구이린·상하이 14일 프라이빗 일정은 2명, 2인 1실에 1인 ₩5,440,000, 두 명 합계 ₩10,880,000입니다. 4명은 1인 ₩4,600,000, 6명은 ₩4,320,000입니다. 조식 포함 호텔 13박과 관광일의 도시별 전용 가이드·차량, 삼림공원과 천문산 등 입장권, 열차 2구간과 국내선 2구간을 포함합니다. 국제선과 중식·석식은 별도입니다. 8명 이상이면 원하는 날짜에 1인 ₩3,900,000이며 다른 인원은 서면 견적을 드립니다.",
      ),
    ),
    faq(
      l("How is this different from the small-group version?", "和小团版本有什么不同？", "소규모 그룹 상품과 무엇이 다른가요?"),
      l(
        "The Beijing–Xi’an–Zhangjiajie–Guilin–Shanghai route is the same in both versions. Two on a private departure pay from USD 3,890 each and choose their dates, pace and some stops. The 2027 small group is USD 2,790 each on 17 April or 16 October, with 8–12 guests following one plan.",
        "北京、西安、张家界、桂林到上海，两种版本走同一条路线。2 人私家团每人 ¥25,280 起，日期、节奏和部分景点可以商量；2027 年小团每人 ¥18,130，4 月 17 日或 10 月 16 日出发，8–12 人统一行动。",
        "베이징·시안·장가계·구이린·상하이의 경로는 두 상품이 같습니다. 프라이빗은 2명 기준 1인 ₩5,440,000부터이며 날짜와 속도, 일부 방문지를 고릅니다. 2027년 소규모 그룹은 1인 ₩3,900,000으로 4월 17일 또는 10월 16일에 8~12명이 같은 일정으로 갑니다.",
      ),
    ),
    faq(
      l("Is Zhangjiajie worth adding instead of Chengdu?", "用张家界换掉成都值得吗？", "청두 대신 장가계를 넣을 만한가요?"),
      l(
        "On the 14-day Beijing–Xi’an–Zhangjiajie–Guilin–Shanghai route, choose Zhangjiajie if you would rather spend two walking days among sandstone peaks than visit Chengdu’s pandas. To include both, the 21-day private route adds Chengdu and a three-night Yangtze cruise, from USD 5,890 per person for two.",
        "北京、西安、张家界、桂林到上海这条 14 天线，适合愿意在砂岩峰林里走两天、把成都熊猫留到下次的人。想两处都看，21 天私家团还加成都和三晚长江游轮，2 人同行每人 ¥38,280 起。",
        "베이징·시안·장가계·구이린·상하이 14일 일정은 청두 판다보다 사암 봉우리 사이를 이틀 걷고 싶은 분에게 맞습니다. 둘 다 보려면 청두와 양쯔강 크루즈 3박을 더한 21일 프라이빗 투어가 있으며 2명 기준 1인 ₩8,240,000부터입니다.",
      ),
    ),
    faq(
      l("Is there a lot of walking in Zhangjiajie?", "张家界要走很多路吗？", "장가계에서는 많이 걷나요?"),
      l(
        "On the 14-day Zhangjiajie and Guilin route, allow several hours of paths and stairs on each Zhangjiajie touring day. The Bailong Elevator and cable cars take out the steepest climbs, but not the walking. Tell us about mobility limits before we choose the viewpoints.",
        "这条张家界加桂林的 14 天线，在张家界游览的每天仍要走几个小时步道和台阶。百龙天梯、索道能省掉最陡的爬升，不能代替走路；行动不便请提前说，我们再选短一些的观景路线。",
        "장가계·구이린 14일 일정은 장가계 관광일마다 길과 계단을 몇 시간 걷습니다. 백룡엘리베이터와 케이블카가 가장 가파른 오르막을 줄여 주지만 걷는 시간은 남습니다. 이동이 불편하면 전망 동선을 정하기 전에 알려 주세요.",
      ),
    ),
    faq(
      l("When is the best time to go?", "什么时候去最好？", "언제 가는 것이 좋은가요?"),
      l(
        "For the 14-day Beijing–Xi’an–Zhangjiajie–Guilin–Shanghai route, look at April–May or September–October. Zhangjiajie often has mist around the pillars; it is part of the view, so a perfectly clear day is not guaranteed. The early-May and early-October Chinese holiday weeks bring heavier crowds.",
        "北京、西安、张家界、桂林到上海这条 14 天线，优先看 4–5 月或 9–10 月。张家界山间常有云雾，不一定天天能见晴空；五一和国庆那一周人更多。",
        "베이징·시안·장가계·구이린·상하이 14일 일정은 4~5월이나 9~10월을 먼저 보세요. 장가계 봉우리에는 안개가 자주 껴 맑은 날만 기대하기는 어렵습니다. 5월 초와 10월 초 중국 연휴에는 사람이 더 많습니다.",
      ),
    ),
  ],
  heroImage: image(
    landscapesSlug,
    "hero.webp",
    l("Sandstone pillars in Zhangjiajie National Forest Park", "张家界国家森林公园的砂岩峰林", "장가계 국가삼림공원의 사암 봉우리"),
    l("Two nights by the Wulingyuan gates keep one full day for the Forest Park.", "武陵源门口附近住两晚，森林公园能走整天。", "무릉원 입구 근처에서 2박해 삼림공원에 하루를 씁니다."),
  ),
  gallery: [
    image(
      landscapesSlug,
      "gallery-1.webp",
      l("The Li River winding past karst peaks", "在喀斯特山峰间流过的漓江", "카르스트 봉우리 사이를 굽이치는 리강"),
      l("Yangshuo is where you step off the Li River boat.", "漓江船开到阳朔，这里下船。", "리강 배는 양숴에서 내립니다."),
    ),
  ],
  routeMedia: [
    {
      day: 3,
      variants: [{
        label: l("Great Wall", "长城", "만리장성"),
        image: image(
          landscapesSlug,
          "route-day-3.webp",
          l("Great Wall climbing a forested ridge", "沿着山脊延伸的长城", "숲이 우거진 능선을 따라 오르는 만리장성"),
          l("Beijing is the first three-night stop before Xi’an.", "北京先住 3 晚，再去西安。", "시안으로 가기 전 베이징에서 먼저 3박합니다."),
        ),
      }],
    },
    {
      day: 8,
      variants: [{
        label: l("Tianmen Mountain", "天门山", "천문산"),
        image: image(
          landscapesSlug,
          "route-day-8.webp",
          l("Tianmen Cave, the natural arch on Tianmen Mountain", "天门山上的天然穿山洞天门洞", "천문산의 자연 아치 천문동"),
          l("Head into Zhangjiajie city to take the Tianmen Mountain cable car.", "去张家界市区坐天门山索道。", "천문산 케이블카는 장가계 시내에서 탑니다."),
        ),
      }],
    },
  ],
  packages: [privatePackage([usd(2, 3890), usd(4, 3290), usd(6, 3090)])],
  datePublished: PUBLISHED,
  dateModified: MODIFIED,
};

// ---------------------------------------------------------------------------
// 4. China & the Yangtze, private
// ---------------------------------------------------------------------------

const yangtzeSlug = "beijing-xian-chengdu-yangtze-cruise-shanghai-17-day-private-tour";

const yangtzeLongHaul: PrivateTourProduct = {
  id: "private-tour-beijing-xian-chengdu-yangtze-shanghai-17d16n",
  slug: yangtzeSlug,
  days: 17,
  nights: 16,
  servicePolicy,
  includesDomesticFlights: true,
  title: l(
    "Beijing, Xi'an, Chengdu, Yangtze Cruise & Shanghai: 17-Day Private Tour",
    "北京·西安·成都·长江游轮·上海 17 天 16 晚私家团",
    "베이징·시안·청두·양쯔강 크루즈·상하이 17일 프라이빗 투어",
  ),
  metadataTitle: l(
    "Beijing, Xi'an & Yangtze Cruise Private Tour: 17 Days",
    "北京西安成都长江三峡上海17天私家团",
    "양쯔강 크루즈 포함 중국 17일 프라이빗 투어",
  ),
  metadataDescription: l(
    "17-day private tour with a 3-night Yangtze cruise: Beijing, Xi'an, pandas, Three Gorges, Shanghai. Per person USD 4,690 for 2 travellers, 3,790 for 6.",
    "17 天私家团含三晚长江游轮：北京、西安、成都大熊猫、三峡与上海。每人价格：2 人同行 ¥30,480，6 人同行 ¥24,630。",
    "3박 양쯔강 크루즈 포함 17일 프라이빗 투어: 베이징, 시안, 청두 판다, 삼협, 상하이. 1인 요금 2명 ₩6,560,000, 6명 ₩5,300,000.",
  ),
  eyebrow: l(
    "Three river nights break up the train journey between cities",
    "几座城市之间，留三晚在长江船上",
    "도시 이동 중간에 양쯔강 크루즈 3박",
  ),
  lede: l(
    "A pair sharing hotel rooms and a standard balcony cabin pays from USD 4,690 each on the 17-day Beijing–Xi’an–Chengdu–Yangtze–Shanghai private tour; international flights are extra. The three-night cruise runs downstream from Chongqing to Yichang, so the land route follows the sailing date.",
    "2 人走北京、西安、成都、长江到上海的 17 天私家团，酒店两人一间并住标准阳台舱，每人 ¥30,480 起，国际机票另计。游轮从重庆下水到宜昌，住三晚；陆上日期得跟着船期排。",
    "호텔 2인 1실과 기본 발코니 객실을 쓰는 2명은 베이징·시안·청두·양쯔강·상하이 17일 프라이빗 투어를 1인 ₩6,560,000부터 예약할 수 있습니다. 국제선은 별도입니다. 충칭에서 이창까지 내려가는 크루즈가 3박이어서 육상 일정도 운항일에 맞춥니다.",
  ),
  summary: l(
    "Of the 16 nights, 13 are in breakfast-included hotels and three are aboard the ship. The price covers private local guides and vehicles on land touring days, transfers, named tickets, trains, the cruise with onboard meals, and the train or flight from Yichang to Shanghai. The ship and cabin are confirmed for your sailing.",
    "16 晚中，13 晚住含早酒店，3 晚住船上。价格含陆上游览日的当地私人导游和车、接送、所列门票、高铁、船上餐食，以及宜昌到上海的火车或航班。船名和舱房按你的航期确认。",
    "16박 중 호텔 조식 포함 숙박이 13박, 선상 숙박이 3박입니다. 육상 관광일의 도시별 전용 가이드와 차량, 이동, 명시된 입장권, 열차, 선상 식사가 있는 크루즈, 이창–상하이 열차 또는 항공편이 포함됩니다. 선박과 객실은 운항일에 맞춰 확인합니다.",
  ),
  highlights: lists(
    [
      "A three-night downstream Three Gorges cruise",
      "Qutang and Wu Gorges, the Lesser Three Gorges and the Three Gorges Dam",
      "Chengdu pandas and a night in Chongqing",
      "Four Shanghai nights with a Suzhou day",
    ],
    [
      "三晚长江三峡下水游轮",
      "瞿塘峡、巫峡、小三峡与三峡大坝",
      "成都大熊猫与重庆一晚",
      "上海住 4 晚，含苏州一日",
    ],
    [
      "3박 양쯔강 삼협 하행 크루즈",
      "구당협·무협·소삼협과 삼협댐",
      "청두 판다와 충칭 1박",
      "상하이 4박과 쑤저우 당일 일정",
    ],
  ),
  itinerary: [
    arriveBeijing(1, "private"),
    forbiddenCity(2),
    greatWall(3),
    templeAndSummerPalace(4),
    trainToXian(5),
    terracottaAndWall(6),
    trainToChengdu(7),
    pandas(8, "private"),
    trainChengduToChongqing(9),
    chongqingThenBoard(10),
    onTheYangtze(11),
    quTangAndWuGorges(12),
    damThenFlyToShanghai(13),
    bundAndYuGarden(14),
    suzhouDayTrip(15),
    shanghaiOwnPace(16),
    departShanghai(17, "private"),
  ],
  hotelNote: l(
    "Of 16 nights, 13 are in breakfast-included hotels at the four-star standard (4 diamonds on Trip.com/Ctrip): Beijing 4, Xi’an 2, Chengdu 2, Chongqing 1 and Shanghai 4. The other three are in a standard balcony cabin on a five-star-rated Yangtze ship, normally with Gold Cruises. On the lowest cabin deck the balcony may be glassed in; a higher deck costs a little more. Hotel rooms are twin share; the ship, deck and cabin are set for the sailing date.",
    "16 晚里，13 晚住含早的携程 4 钻标准酒店：北京 4 晚、西安 2 晚、成都 2 晚、重庆 1 晚、上海 4 晚。另 3 晚住五星级长江游轮的标准阳台舱，通常订长江黄金游轮。最低一层舱房的阳台可能是封闭玻璃窗，住高一层要稍加钱。酒店默认两人一间，船名、楼层和舱房按航期确认。",
    "16박 중 조식 포함 씨트립 4다이아 등급 호텔이 13박입니다. 베이징 4박, 시안 2박, 청두 2박, 충칭 1박, 상하이 4박입니다. 나머지 3박은 5성급 양쯔강 크루즈의 기본 발코니 객실이며 보통 골드 크루즈를 이용합니다. 가장 낮은 객실층은 발코니가 유리로 막혀 있을 수 있고 높은 층은 요금이 조금 더 붙습니다. 호텔은 2인 1실이며 선박, 층과 객실은 운항일에 맞춰 정합니다.",
  ),
  serviceNote: l(
    "On land touring days, your party has its own English-speaking local guide and vehicle. The price covers transfers, named first entries, second-class trains Beijing–Xi’an–Chengdu–Chongqing and Shanghai–Suzhou return, plus the Yichang–Shanghai train or economy flight. The three-night ship booking includes the cabin, meals from dinner on boarding night to breakfast on the last morning, and three shore visits, usually Fengdu Ghost City, the Lesser Three Gorges by small boat and the Three Gorges Dam. Ship commentary follows the ship’s language programme. Land guides change by city, with drivers at both ends of train and flight days; Korean-speaking land guides cost the same where available.",
    "陆上游览日的当地导游和车只带你们一行。价格含全部接送、所列首道门票、北京—西安—成都—重庆和上海—苏州往返的二等座高铁、宜昌—上海的火车或经济舱航班。三晚游轮含舱房、从登船当晚晚餐到离船当天早餐的船上餐食，以及三处岸上游览，通常是丰都鬼城、换小船游小三峡和三峡大坝；船上讲解语种按船方安排。陆上导游每城更换，火车和航班转场由两地司机接送，导游语种按订单确认。",
    "육상 관광일에는 도시별 한국어 현지 가이드와 전용 차량을 일행만 이용합니다. 모든 이동과 명시된 기본 입장권, 베이징–시안–청두–충칭 및 상하이–쑤저우 왕복 고속철도 2등석, 이창–상하이 열차 또는 이코노미 항공편이 포함됩니다. 크루즈 3박에는 객실, 승선일 저녁부터 마지막 날 아침까지의 선상 식사, 그리고 보통 펑두 귀성·소삼협·삼협댐 세 곳의 육상 관광이 들어 있습니다. 선상 해설 언어는 선박 프로그램을 따릅니다. 육상 가이드는 도시별로 바뀌고 이동일에는 양쪽 기사가 맡습니다. 한국어 육상 가이드는 추가 요금 없이 도시별 가능 여부를 확인합니다.",
  ),
  exclusions: exclusions(
    ["Single-room and single-cabin supplements (a cabin for one is charged at close to twice the shared per-person cruise fare)", "Cruise gratuities, paid shore options sold on board (such as White Emperor City and the dam's ship lift) and cabin upgrades", "Peak-date cruise surcharges above the base balcony cabin"],
    ["单房差与单人舱差价（一人住一间舱，船费接近两人同住时每人价的两倍）", "游轮服务费、船上另卖的自费项目（如白帝城、升船机）与舱房升级", "旺季航期高于基础阳台舱的差价"],
    ["1인실·1인 선실 추가금(혼자 쓰는 선실은 2인 1실 1인 크루즈 요금의 두 배 가까이 받습니다)", "크루즈 봉사료, 배에서 파는 유료 선택 관광(백제성, 삼협댐 선박 리프트 등)과 객실 업그레이드", "성수기 운항 시 기본 발코니 객실 대비 차액"],
    { cruise: true },
  ),
  bookingNote: l(
    "The starting price is per person for the stated party size, with two sharing hotel rooms and a standard balcony cabin. We price the ship for your sailing date; it and the cabin, any peak-date difference and the final total appear in writing before payment. We ask for passport details before Forbidden City and Terracotta Warriors ticket sales open.",
    "页面起价按对应人数算每人，酒店两人一间，船上用标准阳台舱。船价要按你选的航期查，船名、舱房、旺季差价和最后总价都会在付款前写清楚。故宫和兵马俑门票开放预约前，我们还要收护照信息。",
    "표시 시작가는 해당 인원이 호텔 2인 1실과 기본 발코니 객실을 쓸 때의 1인 금액입니다. 배 요금은 운항일에 맞춰 확인합니다. 선박, 객실, 성수기 차액과 최종 금액은 결제 전에 서면으로 알려 드립니다. 자금성과 병마용 입장권 발매 전에는 여권 정보도 요청합니다.",
  ),
  faq: [
    faq(
      l("How much does a China tour with a Yangtze cruise cost?", "带长江游轮的中国行要多少钱？", "양쯔강 크루즈가 포함된 중국 여행은 얼마인가요?"),
      l(
        "For the 17-day Beijing–Xi’an–Chengdu–Yangtze–Shanghai private tour, two sharing hotel rooms and a standard balcony cabin pay USD 4,690 each, USD 9,380 together. The rate falls to USD 3,990 each for four and USD 3,790 for six. Included are 13 breakfast hotel nights, a three-night cruise with onboard meals and its included shore visits, local private guides and vehicles on land, tickets, high-speed trains and a train or flight from Yichang to Shanghai. Land meals and international flights cost extra; peak sailings can raise the total. Eight or more may depart on their own dates at USD 3,490 each. Other party sizes need a written quote.",
        "北京、西安、成都、长江到上海的 17 天私家团，2 人住一间并用标准阳台舱，每人 ¥30,480，两人共 ¥60,960。4 人每人 ¥25,930，6 人每人 ¥24,630。价格含 13 晚早餐酒店、三晚长江游轮及船上餐食和已含岸上项目、陆上私人导游与车、门票、高铁，以及宜昌到上海的火车或航班。国际机票、陆上午晚餐另付，旺季船期也可能加价。8 人以上可自选日期按每人 ¥22,680 走；其他人数书面报价。",
        "베이징·시안·청두·양쯔강·상하이 17일 프라이빗 투어는 호텔 2인 1실과 기본 발코니 객실 기준 2명이면 1인 ₩6,560,000, 합계 ₩13,120,000입니다. 4명은 1인 ₩5,580,000, 6명은 ₩5,300,000입니다. 조식 포함 호텔 13박, 선상 식사와 포함 육상 관광이 있는 크루즈 3박, 육상 도시별 전용 가이드와 차량, 입장권, 고속철도, 이창–상하이 열차 또는 항공편이 들어 있습니다. 국제선과 육상 중식·석식은 별도이고 성수기 운항은 요금이 높을 수 있습니다. 8명 이상은 원하는 날짜에 1인 ₩4,880,000이며 다른 인원은 서면 견적을 드립니다.",
      ),
    ),
    faq(
      l("How is this different from the small-group version?", "和小团版本有什么不同？", "소규모 그룹 상품과 무엇이 다른가요?"),
      l(
        "Both 17-day Beijing–Xi’an–Chengdu–Yangtze–Shanghai versions use a shared cruise ship. On land, the private guide and vehicle serve only your party on dates you choose, from USD 4,690 each for two. The 2027 small group costs USD 3,490 each with 8–12 guests, departing 19 May or 1 September on one fixed plan.",
        "北京、西安、成都、长江到上海的两种 17 天版本，游轮都是共乘。陆上私家团的导游和车只带你们，可选日期，2 人同行每人 ¥30,480 起；2027 年小团每人 ¥22,680，5 月 19 日或 9 月 1 日出发，8–12 人按固定行程走。",
        "베이징·시안·청두·양쯔강·상하이 17일의 두 상품 모두 크루즈 배는 다른 승객과 함께 탑니다. 육상 프라이빗은 날짜를 고르고 가이드와 차량을 일행만 쓰며 2명 기준 1인 ₩6,560,000부터입니다. 2027년 소규모 그룹은 1인 ₩4,880,000으로 5월 19일 또는 9월 1일에 8~12명이 정해진 일정으로 갑니다.",
      ),
    ),
    faq(
      l("Which way does the cruise sail?", "游轮是哪个方向？", "크루즈는 어느 방향인가요?"),
      l(
        "The Yangtze leg of the 17-day Beijing–Xi’an–Chengdu–Shanghai private tour sails downstream from Chongqing to Yichang for three nights. Going upstream takes four nights, so we use the downstream sailing to keep the entire route at 17 days.",
        "北京、西安、成都到上海的 17 天私家团，长江段从重庆下水到宜昌，船上住三晚。上水要四晚，所以这里选下水，整条线才排得进 17 天。",
        "베이징·시안·청두·상하이 17일 프라이빗 일정의 양쯔강 구간은 충칭에서 이창까지 하류로 3박합니다. 상류는 4박이라 전체 일정을 17일로 맞추려고 하류 배를 씁니다.",
      ),
    ),
    faq(
      l("Is the cruise private?", "游轮是包船吗？", "크루즈는 단독 전세인가요?"),
      l(
        "The three-night Chongqing–Yichang Yangtze cruise is on a shared ship, with a cabin for your party and the ship’s own programme. The private guide and vehicle apply to the land touring days.",
        "重庆到宜昌的三晚长江游轮是共乘船，你们有自己的舱房，船上按船方活动走。私人导游和车服务的是陆上游览日。",
        "충칭–이창 양쯔강 3박 크루즈는 다른 승객과 같은 배를 타고 일행의 객실을 씁니다. 선상 일정은 선박 운영에 따릅니다. 전용 가이드와 차량은 육상 관광일에 배정됩니다.",
      ),
    ),
    faq(
      l("When does the cruise run?", "游轮哪些月份运营？", "크루즈는 언제 운항하나요?"),
      l(
        "We normally book Gold Cruises. In its 2026 timetable, downstream ships leave Chongqing from late February to late December, with five or six sailings a week from late March to mid-December and none from late December to late February. April–May and September–October are usually the most comfortable. The 2027 timetable is not final, so we check your date first and set the 17-day land days around a confirmed sailing; if a date has no Gold Cruises sailing, we offer another five-star line and put any difference in writing.",
        "我们通常订长江黄金游轮。按它 2026 年的船期，重庆下水的船从 2 月底开到 12 月下旬，3 月下旬到 12 月中旬每周 5–6 班，12 月下旬到次年 2 月下旬停航。4–5 月和 9–10 月通常最舒服。2027 年船期还没定，我们先核对你的日期，再围绕确认的船期排 17 天陆上行程；如果那天没有黄金游轮，就给你换一家五星级游轮，差价书面写清楚。",
        "저희는 보통 골드 크루즈를 예약합니다. 2026년 운항표를 보면 충칭 출발 하행 크루즈는 2월 말부터 12월 하순까지 운항하고, 3월 하순부터 12월 중순까지는 주 5~6회 출발하며, 12월 하순부터 2월 하순까지는 운항하지 않습니다. 4~5월과 9~10월이 보통 가장 쾌적합니다. 2027년 운항표는 아직 확정되지 않아 날짜를 먼저 확인한 뒤 확정된 운항일에 맞춰 17일 육상 일정을 짭니다. 그날 골드 크루즈가 없으면 다른 5성급 선사를 제안하고 차액은 서면으로 알려 드립니다.",
      ),
    ),
    faq(
      l("Can a child or a third person share our cabin?", "孩子或第三个人能和我们同住一间舱吗？", "아이나 세 번째 일행이 같은 선실을 쓸 수 있나요?"),
      l(
        "Yes. On the 17-day Beijing–Xi’an–Chengdu–Yangtze–Shanghai tour, a standard cabin takes up to four people, children included. A third person or a child sharing the cabin pays a reduced cruise fare, and children under 2 pay only a small part of it. Hotel rooms for the same party are priced separately, and we send the whole quote in writing.",
        "可以。北京、西安、成都、长江到上海 17 天私家团的标准舱每间最多住 4 人（含儿童）。同舱的第三人或儿童船费有折扣，2 岁以下只收一小部分船费。同行的酒店房间另算，整团报价书面发你。",
        "가능합니다. 베이징·시안·청두·양쯔강·상하이 17일 투어의 기본 선실은 어린이를 포함해 최대 4명까지 묵을 수 있습니다. 같은 선실의 세 번째 승객이나 어린이는 할인된 크루즈 요금을 내고 2세 미만은 요금의 일부만 냅니다. 같은 일행의 호텔 객실은 따로 계산하며 전체 견적은 서면으로 드립니다.",
      ),
    ),
  ],
  heroImage: image(
    yangtzeSlug,
    "hero.webp",
    l("Chongqing skyline and river bridge at sunset", "日落时的重庆天际线与跨江大桥", "해 질 녘 충칭 스카이라인과 강 위의 다리"),
    l("Spend one night in Chongqing, then board the Yangtze ship.", "重庆住一晚，第二天上长江游轮。", "충칭에서 1박한 다음 양쯔강 배에 오릅니다."),
  ),
  gallery: [
    image(
      yangtzeSlug,
      "gallery-1.webp",
      l("Giant panda in Chengdu", "成都的大熊猫", "청두의 판다"),
      l("Chengdu comes first; the train takes you on to Chongqing.", "成都看完后，坐高铁继续去重庆。", "청두를 본 다음 열차로 충칭에 갑니다."),
    ),
  ],
  routeMedia: [
    {
      day: 3,
      variants: [{
        label: l("Great Wall", "长城", "만리장성"),
        image: image(
          yangtzeSlug,
          "route-day-3.webp",
          l("Great Wall watchtowers at sunset", "夕阳下的长城敌楼", "노을 속 만리장성 망루"),
          l("Four Beijing nights come before the train west to Xi’an.", "北京住 4 晚后，坐高铁去西安。", "베이징에서 4박한 뒤 열차로 시안에 갑니다."),
        ),
      }],
    },
    {
      day: 6,
      variants: [{
        label: l("Xi'an", "西安", "시안"),
        image: image(
          yangtzeSlug,
          "route-day-6.webp",
          l("Close view of a terracotta warrior", "兵马俑近景", "병마용 근접 모습"),
          l("Most of Day 6 belongs to the Terracotta Warriors.", "第 6 天的大半天，留给兵马俑。", "6일 차는 대부분 병마용을 봅니다."),
        ),
      }],
    },
  ],
  packages: [privatePackage([usd(2, 4690), usd(4, 3990), usd(6, 3790)])],
  datePublished: PUBLISHED,
  dateModified: MODIFIED,
};

const trainXianToZhangye = (n: number) => day(
  n,
  l("High-speed train to Zhangye", "高铁前往张掖", "고속철도로 장예"),
  l(
    "The second-class train west through Lanzhou to Zhangye takes about 5.5–6.5 hours. If arrival allows, drive another hour to Zhangye Danxia for the striped hills in late light. Park shuttles set the order of the viewing platforms; sleep in Zhangye.",
    "二等座高铁经兰州西行到张掖，约 5.5–6.5 小时。到站后时间允许，再坐约一小时车去张掖丹霞看傍晚的彩色山丘；观景台顺序听景区摆渡车安排，晚上住张掖。",
    "고속철도 2등석으로 란저우를 지나 장예까지 약 5.5~6.5시간 갑니다. 도착 시간이 맞으면 차로 한 시간 더 가서 늦은 빛의 장예 칠채산을 봅니다. 전망대 순서는 공원 셔틀을 따르고 장예에서 숙박합니다.",
  ),
);

const jiayuguanPass = (n: number) => day(
  n,
  l("Jiayuguan Pass", "嘉峪关", "자위관"),
  l(
    "West from Zhangye, Jiayuguan is about 1.5 hours by train or three by car. See Jiayuguan Fort at the Ming Great Wall’s western end and the nearby Overhanging Great Wall; stay in Jiayuguan.",
    "从张掖往西到嘉峪关，火车约 1.5 小时，私车约 3 小时。到后看明长城西端的嘉峪关关城和附近悬壁长城，住嘉峪关。",
    "장예에서 서쪽 자위관까지 열차는 약 1.5시간, 차량은 약 3시간입니다. 명나라 만리장성 서쪽 끝의 자위관성과 가까운 현벽장성을 보고 자위관에서 숙박합니다.",
  ),
);

const gobiToDunhuang = (n: number) => day(
  n,
  l("Across the Gobi to Dunhuang", "穿越戈壁到敦煌", "고비를 지나 둔황으로"),
  l(
    "Dunhuang is another westbound leg: about 4.5 hours by private vehicle across the Gobi, or about 2.5 hours on the afternoon train. Shazhou night market is an option only if arrival leaves time.",
    "到敦煌还要继续西行：私车穿戈壁约 4.5 小时，或乘下午火车约 2.5 小时。到得早才考虑晚上去沙洲夜市。",
    "둔황까지 더 서쪽으로 갑니다. 고비를 건너는 전용 차량은 약 4.5시간, 오후 열차는 약 2.5시간입니다. 일찍 도착하면 사주 야시장도 갈 수 있습니다.",
  ),
);

const mogaoAndDunes = (n: number) => day(
  n,
  l("Mogao Caves and the Mingsha dunes", "莫高窟与鸣沙山", "막고굴과 명사산"),
  l(
    "Mogao Caves admission follows the official ticket and time slot issued for your date; the visit begins at the Digital Exhibition Center. Later, when the heat eases, go to Mingsha Mountain and Crescent Moon Spring. Camel rides cost extra.",
    "莫高窟按出票日期和时段参观，从数字展示中心开始。等傍晚没那么热，再去鸣沙山月牙泉；骑骆驼是自费项目。",
    "막고굴은 날짜와 시간대가 적힌 공식 입장권으로 들어가며 디지털 전시센터에서 시작합니다. 더위가 누그러지는 늦은 오후에 명사산과 월아천으로 갑니다. 낙타 타기는 추가 비용이 듭니다.",
  ),
);

const trainToTurpan = (n: number) => day(
  n,
  l("High-speed train to Turpan", "高铁前往吐鲁番", "고속철도로 투루판"),
  l(
    "First drive about two hours from Dunhuang to Liuyuan South. The booked second-class train then takes about 3–4 hours to Turpan North, where a local driver meets you and takes you to the hotel.",
    "敦煌先坐约 2 小时车到柳园南站，再乘已确认的二等座高铁，约 3–4 小时到吐鲁番北站。当地司机接站送酒店，住吐鲁番。",
    "둔황에서 류위안남역까지 먼저 차로 약 2시간 갑니다. 예약된 고속철도 2등석으로 투루판북역까지 약 3~4시간 더 가면 현지 기사가 호텔로 모십니다. 투루판에서 숙박합니다.",
  ),
);

const turpanOasis = (n: number) => day(
  n,
  l("The Turpan oasis", "吐鲁番绿洲", "투루판 오아시스"),
  l(
    "Turpan’s summer afternoons are punishingly hot. We put outdoor time early or late and use the rest of the day for Jiaohe ruins, the karez museum and Emin Minaret, passing the Flaming Mountains on the road.",
    "吐鲁番夏季午后很热，户外景点尽量放在早晚。交河故城、坎儿井博物馆和苏公塔都在这天，路上会经过那片火红色的山。",
    "투루판은 여름 오후가 매우 덥습니다. 야외 방문은 이른 시간이나 늦은 시간에 두고, 교하고성 유적·카레즈 박물관·소공탑을 봅니다. 길에서 화염산도 지납니다.",
  ),
);

const trainToUrumqi = (n: number) => day(
  n,
  l("High-speed train to Urumqi", "高铁前往乌鲁木齐", "고속철도로 우루무치"),
  l(
    "Turpan to Urumqi takes about an hour by the booked train. Leave the afternoon for the Xinjiang Regional Museum and the Grand Bazaar; the museum is usually closed on Mondays. Stay in Urumqi.",
    "吐鲁番坐已确认的高铁到乌鲁木齐，约 1 小时。下午留给新疆维吾尔自治区博物馆和国际大巴扎，博物馆通常周一闭馆；住乌鲁木齐。",
    "투루판에서 우루무치까지 예약된 열차로 약 1시간 갑니다. 오후에는 신장 자치구 박물관과 국제 바자르를 봅니다. 박물관은 보통 월요일에 쉬며 우루무치에서 숙박합니다.",
  ),
);

const heavenlyLake = (n: number) => day(
  n,
  l("Heavenly Lake", "天山天池", "톈산 톈츠"),
  l(
    "Tianchi, below Bogda Peak, is about two hours by road from Urumqi. After the park shuttle, walk the lakeshore. Winter access and boat services are limited, so the day follows what is operating.",
    "从乌鲁木齐到博格达峰下的天山天池约两小时车程。乘景区摆渡车进去后沿湖走一段；冬季进山和游船服务有限，要按实际开放情况走。",
    "우루무치에서 보거다봉 아래 톈츠까지 차로 약 2시간입니다. 공원 셔틀을 탄 뒤 호숫가를 걷습니다. 겨울에는 입산과 유람선 운영이 제한돼 그날 열린 구간에 맞춥니다.",
  ),
);

const westLakeAndLongjing = (n: number) => day(
  n,
  l("West Lake and Longjing tea", "西湖与龙井茶", "서호와 용정차"),
  l(
    "Spend the Hangzhou day on West Lake: take a boat and walk part of the Su Causeway. Later, drink tea in a hillside Longjing village, or replace that stop with Lingyin Temple if a visit slot is available. Stay in Hangzhou.",
    "杭州这天先坐船看西湖，再走一段苏堤。下午可去山坡上的龙井茶村喝茶；如约到参观时段，也可改去灵隐寺。住杭州。",
    "항저우에서는 서호 배를 타고 소제 둑길 일부를 걷습니다. 오후에는 언덕의 용정차 마을에서 차를 마시거나, 예약 가능 시 영은사 방문으로 바꿀 수 있습니다. 항저우에서 숙박합니다.",
  ),
);

const suzhouGardens = (n: number) => day(
  n,
  l("Suzhou gardens", "苏州园林", "쑤저우 정원"),
  l(
    "The train to Suzhou takes roughly 40 minutes to 1.5 hours. See one garden, such as the Humble Administrator’s Garden, then walk Pingjiang Road toward evening. Stay in Suzhou.",
    "到苏州的高铁约 40 分钟到 1.5 小时。游一座园林，比如拙政园，傍晚再走平江路；住苏州。",
    "쑤저우까지 열차는 약 40분~1.5시간입니다. 졸정원 같은 정원 한 곳을 본 뒤 저녁 무렵 핑장루를 걷습니다. 쑤저우에서 숙박합니다.",
  ),
);

const waterTownThenShanghai = (n: number) => day(
  n,
  l("Water town, then Shanghai", "水乡古镇后到上海", "수향마을 후 상하이"),
  l(
    "Stop at Tongli or another confirmed water town to walk beside the canals and old houses. Shanghai is about 1.5 hours farther by car; the Bund is free for you to visit that evening.",
    "先去同里或另一处已确认的水乡古镇，看河道、走老街。再开车约 1.5 小时到上海，晚上想去外滩可以自己去。",
    "퉁리나 확정된 다른 수향마을에서 운하와 옛집을 본 뒤 차로 약 1.5시간 더 가서 상하이에 도착합니다. 저녁 와이탄은 자유롭게 방문할 수 있습니다.",
  ),
);

// ---------------------------------------------------------------------------
// 5. Beijing, Xi'an & the Silk Road, private
// ---------------------------------------------------------------------------

const silkRoadSlug = "beijing-xian-silk-road-15-day-private-tour";

const silkRoadLongHaul: PrivateTourProduct = {
  id: "private-tour-beijing-xian-silk-road-15d14n",
  slug: silkRoadSlug,
  days: 15,
  nights: 14,
  servicePolicy,
  includesDomesticFlights: true,
  title: l(
    "Beijing, Xi'an & the Silk Road: 15-Day Private Tour",
    "北京·西安·丝绸之路 15 天 14 晚私家团",
    "베이징·시안·실크로드 15일 프라이빗 투어",
  ),
  metadataTitle: l(
    "China Silk Road Private Tour: 15 Days, Xi'an to Urumqi",
    "北京西安丝绸之路15天私家团",
    "중국 실크로드 15일 프라이빗 투어",
  ),
  metadataDescription: l(
    "15-day private Silk Road tour: Beijing, Xi'an, Zhangye, Mogao Caves, Turpan, Urumqi. Per person USD 4,590 for 2 travellers, 3,690 for 6.",
    "15 天丝绸之路私家团：北京、西安、张掖、嘉峪关、莫高窟、吐鲁番与乌鲁木齐。每人价格：2 人同行 ¥29,830，6 人同行 ¥23,980。",
    "15일 실크로드 프라이빗 투어: 베이징, 시안, 장예, 자위관, 막고굴, 투루판, 우루무치. 1인 요금 2명 ₩6,420,000, 6명 ₩5,160,000.",
  ),
  eyebrow: l(
    "The old Silk Road means long westbound train and road days",
    "走丝绸之路，要留出向西赶路的时间",
    "실크로드 서쪽 길은 열차와 차량 이동이 깁니다",
  ),
  lede: l(
    "Budget from USD 4,590 each for two in twin rooms on the 15-day Beijing–Xi’an–Silk Road private journey; international flights are extra. After the capitals, the route goes west to Zhangye, Jiayuguan, the Mogao Caves, Turpan and Urumqi. Several days are built around trains and desert roads.",
    "北京、西安到丝绸之路的 15 天私家团，2 人住一间每人 ¥29,830 起，国际机票另付。过了两座古都，继续往张掖、嘉峪关、莫高窟、吐鲁番和乌鲁木齐走；其中几天主要花在火车和戈壁公路上。",
    "베이징·시안·실크로드 15일 프라이빗 여행은 2명이 2인 1실로 갈 때 1인 ₩6,420,000부터입니다. 국제선은 별도입니다. 두 옛 수도를 지나 장예, 자위관, 막고굴, 투루판, 우루무치로 갑니다. 며칠은 열차와 사막 도로 이동이 중심입니다.",
  ),
  summary: l(
    "Fourteen hotel nights include breakfast. Local private guides and vehicles on touring days, transfers, named admissions including the Mogao Caves, four second-class train journeys and the flight back east from Urumqi are included. Mogao tickets are date limited; we tell you before payment if only the four-cave emergency ticket remains.",
    "14 晚酒店都含早餐。游览日的当地私人导游和车、接送、莫高窟等所列门票、四段二等座高铁，以及乌鲁木齐飞回北京的航班都含。莫高窟按日期限量放票；如果只剩看 4 个洞窟的应急票，我们会在付款前说清楚。",
    "호텔 14박에는 조식이 포함됩니다. 관광일의 도시별 전용 가이드와 차량, 이동, 막고굴 등 명시된 입장권, 고속철도 2등석 4구간과 우루무치에서 동쪽으로 돌아오는 항공편이 포함됩니다. 막고굴 표는 날짜별 수량이 제한됩니다. 굴 4개를 보는 응급 입장권만 남으면 결제 전에 알려 드립니다.",
  ),
  highlights: lists(
    [
      "Zhangye Danxia's striped hills in late light",
      "Jiayuguan, the fort at the western end of the Great Wall",
      "The Mogao Caves and the Mingsha dunes",
      "Turpan's oasis ruins and Heavenly Lake",
    ],
    [
      "傍晚光线下的张掖七彩丹霞",
      "明长城西端的嘉峪关",
      "莫高窟与鸣沙山",
      "吐鲁番绿洲古城与天山天池",
    ],
    [
      "늦은 오후 빛 속의 장예 칠채산",
      "명나라 만리장성 서쪽 끝의 자위관",
      "막고굴과 명사산 모래언덕",
      "투루판 오아시스 유적과 톈산 톈츠(천산천지)",
    ],
  ),
  itinerary: [
    arriveBeijing(1, "private"),
    forbiddenCity(2),
    greatWall(3),
    trainToXian(4),
    terracottaAndWall(5),
    trainXianToZhangye(6),
    jiayuguanPass(7),
    gobiToDunhuang(8),
    mogaoAndDunes(9),
    trainToTurpan(10),
    turpanOasis(11),
    trainToUrumqi(12),
    heavenlyLake(13),
    day(
      14,
      l("Fly back east", "飞回东部", "동부로 이동"),
      l(
        "We match the eastbound flight to your international departure: Urumqi to Beijing takes about four hours, or to Shanghai about five. Stay near that city’s departure airport.",
        "看你的国际航班从哪里飞，再定乌鲁木齐飞北京还是上海，航程分别约 4 小时、5 小时。抵达后住在出发机场附近。",
        "국제선 출발 도시에 맞춰 우루무치에서 베이징으로 약 4시간, 상하이로 약 5시간 비행합니다. 도착 뒤 출국 공항 근처에서 숙박합니다.",
      ),
    ),
    day(
      15,
      l("Depart", "返程", "출발"),
      l(
        "A private driver takes you to the airport for the international flight. There is no sightseeing on departure day.",
        "国际航班当天由私车送机场，不排游览。",
        "국제선 출발일에는 전용 차량으로 공항에 갑니다. 관광 일정은 넣지 않습니다.",
      ),
    ),
  ],
  hotelNote: l(
    "All 14 hotel nights include breakfast and use twin rooms: Beijing 3, Xi’an 2, Zhangye 1, Jiayuguan 1, Dunhuang 2, Turpan 2, Urumqi 2 and one near the departure airport. Where available, we use the four-star standard (4 diamonds on Trip.com/Ctrip). For Zhangye, Jiayuguan and Turpan, we confirm the best-rated local option before payment.",
    "两人一间，14 晚都带早餐。北京住 3 晚；西安、敦煌、吐鲁番、乌鲁木齐各 2 晚；张掖、嘉峪关各 1 晚。最后 1 晚留在返程机场附近。有携程 4 钻标准酒店的城市按此安排，张掖、嘉峪关和吐鲁番选当地评分最好的，酒店会在付款前确认。",
    "조식이 포함된 2인 1실 숙박이 총 14박입니다. 베이징 3박, 시안·둔황·투루판·우루무치 각 2박, 장예와 자위관 각 1박을 보낸 뒤 출국 공항 근처에서 마지막 1박을 합니다. 가능한 도시에는 씨트립 4다이아 등급의 4성급 기준 호텔을 쓰고, 장예·자위관·투루판에서는 현지 평점이 가장 좋은 곳을 결제 전에 확인합니다.",
  ),
  serviceNote: l(
    "A local guide and vehicle serve only your party on touring days; guide language is checked for each city. The price includes all transfers and first-entry tickets such as Mogao Caves, Jiayuguan Fort and the Heavenly Lake shuttle. Trains are second class on Beijing–Xi’an–Zhangye, Liuyuan South–Turpan and Turpan–Urumqi; Zhangye–Jiayuguan and Jiayuguan–Dunhuang use a train or private vehicle. The eastbound economy flight from Urumqi is included. Drivers meet the station and airport handovers. Carry ID for checks at Xinjiang hotels, stations and some sights.",
    "游览日由当地导游和车只带你们一行，导游语种逐城确认。价格含全部接送和所列首道门票，包括莫高窟、嘉峪关关城、天池区间车。北京—西安—张掖、柳园南—吐鲁番、吐鲁番—乌鲁木齐坐二等座高铁；张掖—嘉峪关、嘉峪关—敦煌坐火车或私车，乌鲁木齐飞回东部的经济舱航班也含。各站有司机接送。新疆酒店、车站和部分景点会查证件、安检。",
    "관광일에는 현지 가이드와 차량을 일행만 이용하고 가이드 언어는 도시별로 확인합니다. 모든 이동과 막고굴, 자위관성, 톈츠 셔틀 등 기본 입장권이 포함됩니다. 베이징–시안–장예, 류위안남–투루판, 투루판–우루무치는 고속철도 2등석입니다. 장예–자위관과 자위관–둔황은 열차나 전용 차량을 타고 우루무치에서 동부로 가는 이코노미 항공편도 포함됩니다. 역과 공항마다 기사가 인계합니다. 신장의 호텔, 역과 일부 명소에서는 신분증 확인과 보안 검색이 있습니다.",
  ),
  exclusions: exclusions(
    ["Single-room supplement", "Camel rides, desert jeeps and other optional activities", "Checked baggage above the airline's included allowance"],
    ["单房差", "骑骆驼、沙漠越野车等自选项目", "超出航司免费额度的托运行李"],
    ["1인실 추가금", "낙타 타기, 사막 지프 등 선택 활동", "항공사 무료 허용량을 넘는 위탁 수하물"],
  ),
  bookingNote: l(
    "The starting price is per person for the stated party size, sharing a twin room. Mogao Caves releases a limited number of dated tickets; if your date has only the emergency ticket for four caves, we tell you before payment. Passport details are needed before Forbidden City and Terracotta Warriors tickets open. We also confirm the trains, flights, hotels and total in writing before you pay.",
    "页面起价按对应人数、两人一间算每人。莫高窟按日期限量放票，如果你选的日子只剩看 4 个洞窟的应急票，我们会在付款前告诉你。故宫和兵马俑开票前还要收护照信息；火车、航班、酒店和最终总价也都先书面确认。",
    "표시 시작가는 해당 인원이 2인 1실을 쓸 때의 1인 금액입니다. 막고굴은 날짜별 표가 한정되어 있습니다. 선택한 날에 굴 4개만 보는 응급 입장권만 남으면 결제 전에 알려 드립니다. 자금성과 병마용 발매 전에는 여권 정보를 요청하고 열차, 항공, 호텔과 최종 금액도 서면으로 확인합니다.",
  ),
  faq: [
    faq(
      l("How much does a Silk Road tour cost?", "丝绸之路旅行要多少钱？", "실크로드 여행은 얼마인가요?"),
      l(
        "The 15-day Beijing–Xi’an–Silk Road private tour starts at USD 4,590 each for two sharing a twin room, or USD 9,180 for the pair. Four travellers pay USD 3,890 each and six pay USD 3,690. In the land price are 14 breakfast hotel nights, private guides and vehicles on touring days, Mogao Caves and other named tickets, four high-speed train legs, the Gobi crossings by train or private car, and the flight east from Urumqi. International flights and lunches and dinners are extra. Eight or more can take their own date at USD 3,390 each; we quote other numbers in writing.",
        "北京、西安到丝绸之路的 15 天私家团，2 人住一间每人 ¥29,830，两人共 ¥59,660；4 人每人 ¥25,280，6 人每人 ¥23,980。14 晚早餐酒店、游览日私人导游和车、莫高窟等所列门票、四段高铁、戈壁路段火车或私车，以及乌鲁木齐飞回东部的航班都在价格内。国际机票和午晚餐另付。8 人及以上可自选日期按每人 ¥22,030 走，其他人数书面报价。",
        "베이징·시안·실크로드 15일 프라이빗 투어는 2명, 2인 1실에 1인 ₩6,420,000, 두 명 합계 ₩12,840,000입니다. 4명은 1인 ₩5,440,000, 6명은 ₩5,160,000입니다. 조식 포함 호텔 14박, 관광일의 전용 가이드와 차량, 막고굴 등 명시된 입장권, 고속철도 4구간, 고비 구간의 열차 또는 전용 차량, 우루무치에서 동부로 가는 항공편이 포함됩니다. 국제선과 중식·석식은 별도입니다. 8명 이상이면 원하는 날짜에 1인 ₩4,740,000이며 다른 인원은 서면으로 견적을 드립니다.",
      ),
    ),
    faq(
      l("How is this different from the small-group version?", "和小团版本有什么不同？", "소규모 그룹 상품과 무엇이 다른가요?"),
      l(
        "The 15-day Beijing–Xi’an–Silk Road private tour starts at USD 4,590 each for two, with dates you choose, a guide and car for your party, and a return flight to Beijing or Shanghai that fits your international ticket. The 2027 small group is USD 3,390 each, with 8–12 guests on 12 June or 11 September; everyone flies back to Beijing on Day 14.",
        "北京、西安到丝绸之路的 15 天私家团，2 人同行每人 ¥29,830 起，可选日期，导游和车只带你们，最后按国际机票飞回北京或上海。2027 年小团每人 ¥22,030，6 月 12 日或 9 月 11 日出发，8–12 人一起走，第 14 天统一飞回北京。",
        "베이징·시안·실크로드 15일 프라이빗 투어는 2명 기준 1인 ₩6,420,000부터이며 날짜를 고르고 가이드와 차량을 일행만 씁니다. 국제선에 맞춰 베이징이나 상하이로 돌아올 수 있습니다. 2027년 소규모 그룹은 1인 ₩4,740,000으로 6월 12일 또는 9월 11일에 8~12명이 출발해 14일 차에 함께 베이징으로 돌아옵니다.",
      ),
    ),
    faq(
      l("When is the best time for the Silk Road?", "什么季节走丝绸之路最好？", "실크로드는 언제 가는 것이 좋은가요?"),
      l(
        "For the 15-day Beijing–Xi’an–Silk Road tour, May, June, September and early October are easier months for Dunhuang and Turpan. Those two stops are very hot in July–August. Winter is cold, and access around Heavenly Lake is limited.",
        "北京、西安到丝绸之路的 15 天线，5 月、6 月、9 月或 10 月上旬更合适。7–8 月敦煌、吐鲁番很热；冬天则冷，天池进山也有限制。",
        "베이징·시안·실크로드 15일 일정은 5월, 6월, 9월과 10월 초가 낫습니다. 7~8월 둔황과 투루판은 매우 덥습니다. 겨울에는 춥고 톈츠 접근도 제한됩니다.",
      ),
    ),
    faq(
      l("Is there a lot of travel time?", "路上时间长吗？", "이동 시간이 긴가요?"),
      l(
        "The 15-day Beijing–Xi’an–Silk Road route has four legs of about 4.5–6 hours door to door, plus a flight east of about four hours. The other stops are about 1–3 hours apart. The long travel days are the main effort; most sites involve less hard walking.",
        "北京、西安到丝绸之路的 15 天线，有四段门到门约 4.5–6 小时，飞回东部约 4 小时，其余两站之间约 1–3 小时。累的主要是赶路，景点本身不太需要走难走的路。",
        "베이징·시안·실크로드 15일 일정에는 숙소에서 숙소까지 약 4.5~6시간 걸리는 구간이 네 번, 동부로 돌아오는 비행이 약 4시간 있습니다. 다른 구간은 약 1~3시간입니다. 긴 이동이 힘든 부분이고 명소에서의 걷기는 비교적 가볍습니다.",
      ),
    ),
    faq(
      l("Is Xinjiang open to foreign travellers?", "外国游客可以去新疆吗？", "외국인도 신장에 갈 수 있나요?"),
      l(
        "The 15-day Silk Road route includes Turpan, Urumqi and Heavenly Lake, which accept foreign visitors. Bring your passport each day: hotels, stations and some sites in Xinjiang check it.",
        "这条 15 天丝绸之路线会到吐鲁番、乌鲁木齐和天池，外国游客可以前往。每天带护照，新疆的酒店、车站和部分景点会查验。",
        "15일 실크로드 일정의 투루판, 우루무치와 톈츠는 외국인 방문이 가능합니다. 신장의 호텔, 역과 일부 명소에서 확인하므로 여권을 매일 지니세요.",
      ),
    ),
  ],
  heroImage: image(
    silkRoadSlug,
    "hero.webp",
    l("Statue of the monk Xuanzang outside the Big Wild Goose Pagoda", "大雁塔前纪念唐代西行取经人的雕像", "대안탑 앞의 현장 법사 상"),
    l("This route follows Xuanzang west from Xi’an along the old Silk Road.", "从西安向西走，和当年取经人走的方向一样。", "시안에서 현장 법사가 갔던 실크로드 서쪽 방향으로 갑니다."),
  ),
  gallery: [
    image(
      silkRoadSlug,
      "gallery-1.webp",
      l("Cave entrances cut into the cliff at the Mogao Caves", "莫高窟崖面上的洞窟", "막고굴 절벽의 석굴 입구"),
      l("Mogao Caves entry depends on the official time slot issued for the date.", "莫高窟只按出票的官方时段入内。", "막고굴은 발권된 공식 시간대에 입장합니다."),
    ),
  ],
  routeMedia: [
    {
      day: 3,
      variants: [{
        label: l("Great Wall", "长城", "만리장성"),
        image: image(
          silkRoadSlug,
          "route-day-3.webp",
          l("The Great Wall along a forested ridge north of Beijing", "北京北部林间山脊上的长城", "베이징 북쪽 숲 능선의 만리장성"),
          l("See the Great Wall near Beijing, then its western end at Jiayuguan.", "先在北京看长城，再到嘉峪关看西端。", "베이징에서 만리장성을 보고 자위관에서 서쪽 끝을 봅니다."),
        ),
      }],
    },
    {
      day: 5,
      variants: [{
        label: l("Xi'an", "西安", "시안"),
        image: image(
          silkRoadSlug,
          "route-day-5.webp",
          l("Xi'an City Wall", "西安城墙", "시안 성벽"),
          l("On Day 5, the City Wall is for a late walk or ride.", "第 5 天傍晚上城墙，步行或骑车都行。", "5일 차 늦은 오후에는 성벽을 걷거나 자전거를 탑니다."),
        ),
      }],
    },
  ],
  packages: [privatePackage([usd(2, 4590), usd(4, 3890), usd(6, 3690)], { koreanGuide: false })],
  datePublished: PUBLISHED,
  dateModified: MODIFIED,
};

// ---------------------------------------------------------------------------
// 6. Beijing, Xi'an & Yunnan, private
// ---------------------------------------------------------------------------

const yunnanSlug = "beijing-xian-yunnan-14-day-private-tour";

const yunnanLongHaul: PrivateTourProduct = {
  id: "private-tour-beijing-xian-yunnan-14d13n",
  slug: yunnanSlug,
  days: 14,
  nights: 13,
  servicePolicy,
  includesDomesticFlights: true,
  title: l(
    "Beijing, Xi'an & Yunnan: 14-Day Private Tour",
    "北京·西安·云南 14 天 13 晚私家团",
    "베이징·시안·윈난 14일 프라이빗 투어",
  ),
  metadataTitle: l(
    "Beijing, Xi'an & Yunnan Private Tour: 14 Days",
    "北京西安云南14天私家团",
    "베이징·시안·윈난 14일 프라이빗 투어",
  ),
  metadataDescription: l(
    "14-day private tour: Beijing, Xi'an, Dali, Lijiang, Tiger Leaping Gorge, Shangri-La. Per person USD 3,890 for 2 travellers, 3,090 for 6.",
    "14 天私家团：北京、西安、石林、大理、丽江、虎跳峡与香格里拉。每人价格：2 人同行 ¥25,280，6 人同行 ¥20,080。",
    "14일 프라이빗 투어: 베이징, 시안, 석림, 다리, 리장, 호도협, 샹그릴라. 1인 요금 2명 ₩5,440,000, 6명 ₩4,320,000.",
  ),
  eyebrow: l(
    "Old towns first, then the climb to Shangri-La",
    "先逛古城，再一路上到香格里拉",
    "고성을 지나 샹그릴라 고도로 올라갑니다",
  ),
  lede: l(
    "At USD 3,890 each for two sharing a twin room, the 14-day Beijing–Xi’an–Yunnan private tour leaves international flights to you. After the capitals, Dali and Lijiang give way to Tiger Leaping Gorge and Shangri-La at about 3,300 metres. The altitude is a real part of the route.",
    "北京、西安加云南的 14 天私家团，2 人同行住一间，每人 ¥25,280 起，国际机票自己另订。走过大理、丽江后，还要经虎跳峡上到海拔约 3,300 米的香格里拉；选这条线要把海拔算进去。",
    "베이징·시안·윈난 14일 프라이빗 투어는 2명, 2인 1실에 1인 ₩5,440,000부터입니다. 국제선은 따로 예약해야 합니다. 다리와 리장을 지나 호도협, 해발 약 3,300미터 샹그릴라까지 오릅니다. 고도를 생각하고 고를 일정입니다.",
  ),
  summary: l(
    "All 13 hotel nights include breakfast. The price covers local private guides and vehicles on touring days, transfers, named tickets, four train journeys, the drive through Tiger Leaping Gorge and two economy flights. At Jade Dragon Snow Mountain, the high cable car depends on the day’s quota and weather.",
    "13 晚酒店都含早餐。游览日的当地私人导游和车、接送、所列门票、四段高铁、经虎跳峡的私车路段和两段经济舱航班都含。玉龙雪山的大索道要看当天配额和天气。",
    "호텔 13박에는 조식이 포함됩니다. 관광일의 도시별 전용 가이드와 차량, 이동, 명시된 입장권, 열차 4구간, 호도협을 지나는 전용 차량과 이코노미 항공 2구간이 포함됩니다. 옥룡설산 높은 구간 케이블카는 당일 인원 제한과 날씨에 따릅니다.",
  ),
  highlights: lists(
    [
      "The Stone Forest's limestone pillars",
      "Erhai Lake and the Bai village of Xizhou",
      "Jade Dragon Snow Mountain above Lijiang",
      "Tiger Leaping Gorge on the way to Shangri-La",
    ],
    [
      "石林的石灰岩石柱",
      "洱海与白族村落喜洲",
      "丽江城外的玉龙雪山",
      "去香格里拉途中的虎跳峡",
    ],
    [
      "석림의 석회암 기둥",
      "얼하이 호수와 바이족 마을 시저우",
      "리장 위의 옥룡설산",
      "샹그릴라 가는 길의 호도협",
    ],
  ),
  itinerary: [
    arriveBeijing(1, "private"),
    forbiddenCity(2),
    greatWall(3),
    trainToXian(4),
    terracottaAndWall(5),
    day(
      6,
      l("Fly to Kunming", "飞往昆明", "쿤밍으로 이동"),
      l(
        "The economy flight from Xi’an to Kunming is about 2.5 hours. A Kunming driver meets you, and Green Lake Park is there for a short walk if the evening is free. Stay in Kunming.",
        "西安飞昆明的经济舱航班约 2.5 小时。昆明司机接机送酒店；傍晚有空，可以去翠湖公园走走。住昆明。",
        "시안에서 쿤밍까지 이코노미 항공편으로 약 2.5시간 갑니다. 쿤밍 기사가 호텔로 모십니다. 저녁에 시간이 남으면 취호 공원을 걷고 쿤밍에서 숙박합니다.",
      ),
    ),
    day(
      7,
      l("Stone Forest, then train to Dali", "石林后乘高铁去大理", "석림 후 고속철도로 다리"),
      l(
        "The Stone Forest is about 1.5 hours by road from Kunming. Walk among its limestone pillars in the morning, return to Kunming, then take the booked train to Dali for about 2–2.5 hours. Sleep in Dali.",
        "昆明到石林约 1.5 小时车程，上午在石柱间走走。之后回昆明，坐已订高铁约 2–2.5 小时到大理，晚上住大理。",
        "쿤밍에서 석림까지 차로 약 1.5시간입니다. 오전에 석회암 기둥 사이를 걷고 쿤밍으로 돌아와 예약된 열차로 다리까지 약 2~2.5시간 갑니다. 다리에서 숙박합니다.",
      ),
    ),
    day(
      8,
      l("Erhai Lake and Xizhou", "洱海与喜洲", "얼하이 호수와 시저우"),
      l(
        "Follow Erhai Lake by vehicle, stopping where you want to walk or cycle a short stretch. Visit the Bai courtyard houses in Xizhou, then finish in Dali Old Town and stay a second night in Dali.",
        "沿洱海坐车走，想步行或骑一段时再停。喜洲看白族院落，最后回大理古城；晚上继续住大理。",
        "얼하이 호숫가를 차량으로 따라가다 걷거나 자전거를 탈 구간에서 멈춥니다. 시저우 바이족 가옥을 보고 다리 고성에서 마칩니다. 다리에서 한 밤 더 묵습니다.",
      ),
    ),
    day(
      9,
      l("High-speed train to Lijiang", "高铁前往丽江", "고속철도로 리장"),
      l(
        "Dali to Lijiang takes about 1.5–2 hours by the booked train. In the afternoon, the guide can take you through Dayan Old Town or quieter Shuhe. Stay in Lijiang.",
        "大理到丽江的高铁约 1.5–2 小时。下午随导游走大研古城，或选安静些的束河；住丽江。",
        "다리에서 리장까지 예약된 열차로 약 1.5~2시간 갑니다. 오후에는 가이드와 다옌 고성을 걷거나 더 조용한 수허를 고릅니다. 리장에서 숙박합니다.",
      ),
    ),
    day(
      10,
      l("Jade Dragon Snow Mountain", "玉龙雪山", "옥룡설산"),
      l(
        "At Jade Dragon Snow Mountain, start with Blue Moon Valley. The high cable car reaches the glacier park at about 4,500 metres when weather and ticket quota allow; if it is full or closed, take a lower cable car instead. Pass Baisha village on the way back to Lijiang.",
        "玉龙雪山先看蓝月谷。大索道能否上约 4,500 米的冰川公园，要看天气和放票；满额或停运就改乘较低的索道。回丽江路上经过白沙古镇，住丽江。",
        "옥룡설산에서는 란웨구를 먼저 봅니다. 높은 케이블카는 날씨와 입장권 수량이 허락하면 해발 약 4,500미터 빙하공원까지 갑니다. 매진되거나 멈추면 낮은 구간 케이블카로 바꿉니다. 돌아오는 길 바이사를 지나 리장에서 숙박합니다.",
      ),
    ),
    day(
      11,
      l("Tiger Leaping Gorge to Shangri-La", "经虎跳峡到香格里拉", "호도협을 지나 샹그릴라로"),
      l(
        "The northbound drive stops at Upper Tiger Leaping Gorge. Its viewpoint is about 1,000 steps down to the Jinsha River; a paid escalator usually runs. With stops, Shangri-La at about 3,300 metres is roughly 5–6 hours away. Stay there tonight.",
        "往北开车会在上虎跳峡停。看金沙江的观景点要下约 1,000 级台阶，通常也有收费扶梯。含中途停留，到海拔约 3,300 米的香格里拉共约 5–6 小时；晚上住那里。",
        "북쪽으로 가다 상호도협에 멈춥니다. 진사강 전망대까지 약 1,000개 계단을 내려가며 보통 유료 에스컬레이터도 있습니다. 정차를 포함해 해발 약 3,300미터 샹그릴라까지 약 5~6시간이고 그곳에서 숙박합니다.",
      ),
    ),
    day(
      12,
      l("Songzanlin Monastery and Pudacuo", "松赞林寺与普达措", "송찬림사와 푸다춰"),
      l(
        "Shangri-La is already about 3,300 metres high, so we keep the walking gentle. Visit Songzanlin, Yunnan’s largest Tibetan Buddhist monastery, and take a lakeside path in Pudacuo National Park. Dukezong Old Town is free time in the evening.",
        "香格里拉海拔约 3,300 米，这天不赶路。去云南最大的藏传佛教寺院松赞林寺，再在普达措国家公园沿湖轻走；晚上独克宗古城自由逛。",
        "샹그릴라는 이미 해발 약 3,300미터라 걷는 속도를 낮춥니다. 윈난에서 가장 큰 티베트 불교 사원 송찬림사를 보고 푸다춰 국립공원 호숫길을 걷습니다. 저녁 두커쭝 고성은 자유 시간입니다.",
      ),
    ),
    day(
      13,
      l("Via Lijiang to Shanghai", "经丽江飞上海", "리장 경유 상하이로"),
      l(
        "This is a travel day: the booked train back to Lijiang takes about 1.5 hours, then the economy flight to Shanghai about 3.5 hours. Stay in Shanghai before flying internationally the next day.",
        "这天主要转场：先乘已订火车约 1.5 小时回丽江，再坐经济舱航班约 3.5 小时飞上海。上海住一晚，第二天搭国际航班。",
        "이날은 이동이 중심입니다. 예약된 열차로 리장까지 약 1.5시간 돌아간 뒤 이코노미 항공편으로 상하이까지 약 3.5시간 갑니다. 상하이에서 1박하고 다음 날 국제선을 탑니다.",
      ),
    ),
    departShanghai(14, "private"),
  ],
  hotelNote: l(
    "The 13 nights are in breakfast-included twin rooms at the four-star standard (4 diamonds on Trip.com/Ctrip). They break down as Beijing 3, Xi’an 2, Kunming 1, Dali 2, Lijiang 2, Shangri-La 2 and Shanghai 1. Hotel names and room types are written into the confirmation before payment.",
    "13 晚都含早餐，默认两人一间，按携程 4 钻标准选酒店。北京 3 晚、西安 2 晚、昆明 1 晚、大理 2 晚、丽江 2 晚、香格里拉 2 晚、上海 1 晚。酒店名称、房型在付款前写进确认单。",
    "조식 포함 씨트립 4다이아 등급 호텔에서 2인 1실로 13박합니다. 베이징 3박, 시안 2박, 쿤밍 1박, 다리 2박, 리장 2박, 샹그릴라 2박, 상하이 1박입니다. 호텔 이름과 객실 형태는 결제 전 확인서에 적습니다.",
  ),
  serviceNote: l(
    "In each city, an English-speaking local guide and vehicle are for your party on touring days. Transfers and named first-entry tickets cover the Stone Forest, Jade Dragon Snow Mountain with one cable car, Songzanlin and Pudacuo. The included crossings are second-class trains Beijing–Xi’an, Kunming–Dali–Lijiang and Shangri-La–Lijiang, a private vehicle via Tiger Leaping Gorge, and economy flights Xi’an–Kunming and Lijiang–Shanghai. Travel days use a driver at each end, while guides change by city. Korean-speaking guides cost the same where available.",
    "游览日各城当地导游和车只带你们。价格含全部接送和所列首道门票，包括石林、玉龙雪山的一段索道、松赞林寺与普达措。北京—西安、昆明—大理—丽江、香格里拉—丽江用二等座高铁；丽江经虎跳峡到香格里拉用私车，西安—昆明及丽江—上海用经济舱航班。导游每城更换，转场由两地司机接送；语种按订单确认。",
    "관광일마다 도시별 한국어 현지 가이드와 전용 차량을 일행만 이용합니다. 모든 이동과 석림, 옥룡설산 케이블카 1회, 송찬림사, 푸다춰 등 기본 입장권이 포함됩니다. 베이징–시안, 쿤밍–다리–리장, 샹그릴라–리장은 고속철도 2등석입니다. 리장에서 호도협을 거쳐 샹그릴라까지는 전용 차량, 시안–쿤밍과 리장–상하이는 이코노미 항공편입니다. 가이드는 도시마다 바뀌고 이동일에는 양쪽 기사가 맡습니다. 한국어 가이드는 추가 요금 없이 도시별 가능 여부를 확인합니다.",
  ),
  exclusions: exclusions(
    ["Single-room supplement", "Oxygen canisters, horse rides and other optional extras at altitude", "Checked baggage above the airline's included allowance"],
    ["单房差", "高原氧气瓶、骑马等自选项目", "超出航司免费额度的托运行李"],
    ["1인실 추가금", "고산 산소통, 승마 등 선택 항목", "항공사 무료 허용량을 넘는 위탁 수하물"],
  ),
  bookingNote: privateBookingNote,
  faq: [
    faq(
      l("How much does a Yunnan tour with Beijing and Xi'an cost?", "北京西安加云南要多少钱？", "베이징·시안과 윈난을 함께 가면 얼마인가요?"),
      l(
        "Two sharing a twin room on the 14-day Beijing–Xi’an–Yunnan private tour pay USD 3,890 each, or USD 7,780 together. The per-person price is USD 3,290 for four and USD 3,090 for six. It covers 13 breakfast hotel nights, local private guides and vehicles on touring days, tickets including one Jade Dragon Snow Mountain cable car, four train journeys, the private drive to Shangri-La and two domestic flights. International flights and lunches and dinners are separate. We send a written quote for other group sizes.",
        "北京、西安加云南的 14 天私家团，2 人住一间每人 ¥25,280，两人共 ¥50,560；4 人每人 ¥21,380，6 人每人 ¥20,080。价格含 13 晚早餐酒店、各地游览日的私人导游和车、玉龙雪山一段索道等门票、四段火车、去香格里拉的私车和两段国内航班。国际机票、午晚餐另计；其他人数我们书面报价。",
        "베이징·시안·윈난 14일 프라이빗 투어는 2명, 2인 1실에 1인 ₩5,440,000, 두 명 합계 ₩10,880,000입니다. 4명은 1인 ₩4,600,000, 6명은 ₩4,320,000입니다. 조식 포함 호텔 13박, 관광일의 도시별 전용 가이드와 차량, 옥룡설산 케이블카 1회 등 입장권, 열차 4구간, 샹그릴라까지 전용 차량과 국내선 2구간이 포함됩니다. 국제선과 중식·석식은 별도이며 다른 인원은 서면 견적을 드립니다.",
      ),
    ),
    faq(
      l("Will the altitude be a problem?", "会有高原反应吗？", "고산병은 괜찮을까요?"),
      l(
        "Altitude matters on the 14-day Beijing–Xi’an–Yunnan route. Lijiang is about 2,400 metres, Shangri-La about 3,300, and the Jade Dragon Snow Mountain glacier park about 4,500 for a brief visit. We keep the Shangri-La walking gentle. Ask your doctor before travel if you have a heart or lung condition.",
        "北京、西安加云南的 14 天线要考虑海拔：丽江约 2,400 米，香格里拉约 3,300 米，玉龙雪山冰川公园约 4,500 米，只短暂停留。香格里拉那天步行会放轻。有心脏或呼吸系统疾病，出发前先问医生。",
        "베이징·시안·윈난 14일 일정은 고도를 생각해야 합니다. 리장은 약 2,400미터, 샹그릴라는 약 3,300미터이며 옥룡설산 빙하공원은 약 4,500미터에 짧게 머뭅니다. 샹그릴라에서는 걷기를 가볍게 잡습니다. 심장이나 폐 질환이 있으면 출발 전에 의사와 상담하세요.",
      ),
    ),
    faq(
      l("When is the best time to visit Yunnan?", "什么时候去云南最好？", "윈난은 언제 가는 것이 좋은가요?"),
      l(
        "March–May and September–November are the clearer, more comfortable windows for the 14-day Beijing–Xi’an–Yunnan route. Expect rain around Dali and Lijiang in summer, and cold in Shangri-La from December through February.",
        "北京、西安加云南的 14 天线，3–5 月和 9–11 月通常更晴朗、舒服。夏季大理、丽江雨多；12 月到次年 2 月，香格里拉很冷。",
        "베이징·시안·윈난 14일 일정은 3~5월과 9~11월이 비교적 맑고 쾌적합니다. 여름에는 다리와 리장에 비가 많고 12~2월 샹그릴라는 춥습니다.",
      ),
    ),
    faq(
      l("Can we skip Shangri-La?", "可以不去香格里拉吗？", "샹그릴라를 빼도 되나요?"),
      l(
        "The 14-day Beijing–Xi’an–Yunnan private route can leave out Shangri-La. We can spend the freed night in Dali or Lijiang and arrange a flight out of Lijiang; we quote the changed itinerary before payment.",
        "北京、西安加云南的 14 天私家团可以不去香格里拉。空出来的一晚可留在大理或丽江，再从丽江乘机离开；改后的路线先给你书面报价。",
        "베이징·시안·윈난 14일 프라이빗 일정에서 샹그릴라를 뺄 수 있습니다. 남는 1박은 다리나 리장에 두고 리장에서 비행기로 떠나는 일정으로 바꿔 결제 전에 견적을 드립니다.",
      ),
    ),
    faq(
      l("Who is this route for?", "这条线适合谁？", "이 일정은 누구에게 맞나요?"),
      l(
        "The 14-day Beijing–Xi’an–Yunnan route suits travellers who want mountains and old towns after the two capitals. It has more altitude and driving than the 14-day Beijing–Shanghai classic, which starts at USD 3,990 each for two. If Shangri-La’s 3,300 metres worries you, ask us for the version that stops at Lijiang.",
        "北京、西安加云南的 14 天线，适合看完两座古都后想走雪山和古城的人。它比北京到上海的经典 14 天线车程更长、海拔更高；经典线 2 人同行每人 ¥25,930 起。担心香格里拉约 3,300 米的海拔，可以问我们不去香格里拉的版本。",
        "베이징·시안·윈난 14일 일정은 두 옛 수도 뒤에 산과 고성을 보고 싶은 분에게 맞습니다. 2명 기준 1인 ₩5,580,000부터인 베이징–상하이 14일 기본 일정보다 차를 오래 타고 고도도 높습니다. 샹그릴라 약 3,300미터가 걱정되면 리장에서 마치는 구성을 요청하세요.",
      ),
    ),
  ],
  heroImage: image(
    yunnanSlug,
    "hero.webp",
    l("Erhai Lake below the snow-capped Cang Mountains in Dali", "大理苍山雪顶下的洱海", "눈 덮인 창산 아래 다리의 얼하이 호수"),
    l("Dali’s two nights give you a day beside Erhai Lake.", "大理住 2 晚，洱海不用赶着看。", "다리 2박 중 하루를 얼하이 호숫가에 씁니다."),
  ),
  gallery: [
    image(
      yunnanSlug,
      "gallery-1.webp",
      l("Limestone pillars reflected in a pool at the Stone Forest", "石林石柱倒映在水中", "석림 석회암 기둥이 비치는 연못"),
      l("Stop at the Stone Forest between Kunming and the Dali train.", "昆明出发先看石林，再乘高铁去大理。", "쿤밍에서 석림을 본 뒤 다리로 가는 열차를 탑니다."),
    ),
  ],
  routeMedia: [
    {
      day: 3,
      variants: [{
        label: l("Great Wall", "长城", "만리장성"),
        image: image(
          yunnanSlug,
          "route-day-3.webp",
          l("Great Wall crossing autumn hills north of Beijing", "北京北部秋日山间的长城", "베이징 북쪽 가을 산을 넘는 만리장성"),
          l("Beijing gets three nights before this route turns southwest.", "往西南走之前，北京先住 3 晚。", "서남쪽으로 가기 전 베이징에서 3박합니다."),
        ),
      }],
    },
    {
      day: 8,
      variants: [{
        label: l("Xizhou", "喜洲", "시저우"),
        image: image(
          yunnanSlug,
          "route-day-8.webp",
          l("Gateway in the Bai village of Xizhou", "白族村落喜洲的牌坊", "바이족 마을 시저우의 패방"),
          l("Xizhou’s Bai courtyard houses fit into the Erhai Lake day.", "洱海这天，也去喜洲看白族院落。", "얼하이 호수를 보는 날 시저우 바이족 가옥도 갑니다."),
        ),
      }],
    },
  ],
  packages: [privatePackage([usd(2, 3890), usd(4, 3290), usd(6, 3090)])],
  datePublished: PUBLISHED,
  dateModified: MODIFIED,
};

// ---------------------------------------------------------------------------
// 7. Beijing, Xi'an, Yellow Mountain, Hangzhou & Shanghai, private
// ---------------------------------------------------------------------------

const huangshanSlug = "beijing-xian-huangshan-hangzhou-shanghai-14-day-private-tour";

const huangshanLongHaul: PrivateTourProduct = {
  id: "private-tour-beijing-xian-huangshan-hangzhou-shanghai-14d13n",
  slug: huangshanSlug,
  days: 14,
  nights: 13,
  servicePolicy,
  includesDomesticFlights: true,
  title: l(
    "Beijing, Xi'an, Yellow Mountain, Hangzhou & Shanghai: 14-Day Private Tour",
    "北京·西安·黄山·杭州·上海 14 天 13 晚私家团",
    "베이징·시안·황산·항저우·상하이 14일 프라이빗 투어",
  ),
  metadataTitle: l(
    "14-Day China Private Tour with Yellow Mountain & Hangzhou",
    "北京西安黄山杭州苏州上海14天私家团",
    "황산 포함 중국 14일 프라이빗 투어",
  ),
  metadataDescription: l(
    "14-day private tour: Beijing, Xi'an, Yellow Mountain, Hongcun, West Lake, Suzhou, Shanghai. Per person USD 3,790 for 2 travellers, 2,990 for 6.",
    "14 天私家团：北京、西安、黄山、宏村、西湖、苏州与上海。每人价格：2 人同行 ¥24,630，6 人同行 ¥19,430。",
    "14일 프라이빗 투어: 베이징, 시안, 황산, 훙촌, 서호, 쑤저우, 상하이. 1인 요금 2명 ₩5,300,000, 6명 ₩4,180,000.",
  ),
  eyebrow: l(
    "A full Huangshan day, then the lakes and gardens of the east",
    "黄山留整天，之后慢慢走西湖和苏州",
    "황산에서 하루를 보낸 뒤 서호와 쑤저우로",
  ),
  lede: l(
    "The 14-day Beijing–Xi’an–Yellow Mountain–Hangzhou–Shanghai private route is from USD 3,790 each when two share a twin room; international flights are extra. Two nights in Tangkou at the foot of Huangshan leave one full mountain day before the route turns to Hongcun, West Lake and Suzhou.",
    "北京、西安、黄山、杭州到上海的 14 天私家团，2 人住一间每人 ¥24,630 起，国际机票另付。在山脚汤口住两晚，留一个整天登黄山，之后再去宏村、西湖和苏州。",
    "베이징·시안·황산·항저우·상하이 14일 프라이빗 일정은 2명, 2인 1실에 1인 ₩5,300,000부터입니다. 국제선은 별도입니다. 황산 아래 탕커우에서 2박해 산에 하루를 쓰고 훙촌, 서호, 쑤저우로 이어갑니다.",
  ),
  summary: l(
    "Breakfast is included on all 13 hotel nights. Local private guides and vehicles on touring days, transfers, named tickets including the Huangshan cable cars, and the trains or flight between stops are included. The mountain walk is shortened if weather or mobility calls for it.",
    "13 晚酒店都含早餐。游览日的当地私人导游和车、接送、黄山索道等所列门票，以及城际火车或航班都含。山上天气或体力不允许时，步行路线会缩短。",
    "호텔 13박에는 조식이 포함됩니다. 관광일의 도시별 전용 가이드와 차량, 이동, 황산 케이블카 등 명시된 입장권과 도시 간 열차 또는 항공편이 포함됩니다. 산 날씨나 체력에 따라 걷는 길을 줄입니다.",
  ),
  highlights: lists(
    [
      "A full day on the summit of Huangshan",
      "Hongcun, a Huizhou village around a crescent pond",
      "West Lake and a Longjing tea village",
      "Suzhou gardens and a canal water town",
    ],
    [
      "黄山山顶完整一天",
      "围着月沼而建的徽州古村宏村",
      "西湖与龙井茶村",
      "苏州园林与江南水乡",
    ],
    [
      "황산 정상에서 보내는 하루",
      "반달 연못을 둘러싼 휘저우 마을 훙촌",
      "서호와 용정차 마을",
      "쑤저우 정원과 운하 수향마을",
    ],
  ),
  itinerary: [
    arriveBeijing(1, "private"),
    forbiddenCity(2),
    greatWall(3),
    trainToXian(4),
    terracottaAndWall(5),
    day(
      6,
      l("Xi'an to Huangshan", "西安前往黄山", "시안에서 황산으로"),
      l(
        "Allow most of the day to get from Xi’an to Huangshan: the booked high-speed train takes about 7–7.5 hours. A flight of about 2.5 hours runs roughly once a week and is an option only if dates fit. From Huangshan, drive another hour to Tangkou at the mountain foot and stay there.",
        "西安到黄山坐已订高铁约 7–7.5 小时，这天大半时间在路上。每周约一班的飞机若刚好对上日期，也可改飞，航程约 2.5 小时。到黄山后还要开车约一小时到山脚汤口，晚上住汤口。",
        "시안에서 황산까지 예약된 고속철도로 약 7~7.5시간, 하루 대부분이 이동입니다. 주 1회 정도 있는 약 2.5시간 항공편은 날짜가 맞을 때만 선택합니다. 황산에서 산 아래 탕커우까지 차로 약 한 시간 더 가서 숙박합니다.",
      ),
    ),
    day(
      7,
      l("A day on Huangshan", "黄山登顶一日", "황산 정상 하루"),
      l(
        "The cable car takes you up Huangshan, but expect several hours on stone steps between Beginning-to-Believe Peak and Bright Summit. After the summit paths, ride down and sleep in Tangkou. We shorten the loop when weather or mobility requires it.",
        "索道上黄山后，从始信峰一带走到光明顶，山上石阶还要走几个小时。再坐索道下山，晚上住汤口；天气或体力不合适，就缩短山顶路线。",
        "황산에 케이블카로 올라 시신봉과 광명정 사이의 돌계단을 몇 시간 걷습니다. 다시 케이블카로 내려와 탕커우에서 숙박합니다. 날씨나 체력에 따라 정상 동선을 줄입니다.",
      ),
    ),
    day(
      8,
      l("Hongcun, then train to Hangzhou", "宏村后乘高铁去杭州", "훙촌 후 고속철도로 항저우"),
      l(
        "Before leaving Huangshan, walk Hongcun around its crescent pond and white-walled Huizhou houses. The booked train from Huangshan North then reaches Hangzhou in about 1.5–2 hours; stay there tonight.",
        "离开黄山前先走宏村，看月沼和白墙青瓦的徽州老屋。再从黄山北站坐已订高铁，约 1.5–2 小时到杭州；晚上住杭州。",
        "황산을 떠나기 전 훙촌의 반달 모양 연못과 흰 벽의 휘저우 집을 봅니다. 황산북역에서 예약된 열차로 항저우까지 약 1.5~2시간 가서 숙박합니다.",
      ),
    ),
    westLakeAndLongjing(9),
    suzhouGardens(10),
    waterTownThenShanghai(11),
    bundAndYuGarden(12),
    shanghaiOwnPace(13),
    departShanghai(14, "private"),
  ],
  hotelNote: l(
    "Thirteen breakfast hotel nights are in twin rooms at the four-star standard (4 diamonds on Trip.com/Ctrip): Beijing 3, Xi’an 2, Tangkou 2, Hangzhou 2, Suzhou 1 and Shanghai 3. Both Huangshan-area nights are at the mountain foot in Tangkou. We confirm the exact hotels and rooms before payment.",
    "13 晚酒店都含早，默认两人一间，按携程 4 钻标准选。北京 3 晚、西安 2 晚、山脚汤口 2 晚、杭州 2 晚、苏州 1 晚、上海 3 晚。黄山段的两晚都在汤口，酒店和房型付款前确认。",
    "조식 포함 씨트립 4다이아 등급 호텔에서 2인 1실로 13박합니다. 베이징 3박, 시안 2박, 산 아래 탕커우 2박, 항저우 2박, 쑤저우 1박, 상하이 3박입니다. 황산 구간의 두 밤은 탕커우이며 호텔과 객실은 결제 전에 확인합니다.",
  ),
  serviceNote: l(
    "On touring days your party uses an English-speaking local guide and vehicle in each city. All transfers and named first entries are included: Huangshan with cable cars up and down, Hongcun, a West Lake boat and one Suzhou garden. Second-class trains cover Beijing–Xi’an, Huangshan North–Hangzhou and Hangzhou–Suzhou. Xi’an–Huangshan is by high-speed train, or economy flight when the weekly service fits your date. Guides change by city and drivers handle travel-day handovers. Korean-speaking guides cost the same where available.",
    "各城游览日由当地导游和车只带你们，全部接送也含。所列首道门票包括黄山及上下山索道、宏村、西湖游船、一座苏州园林。北京—西安、黄山北—杭州、杭州—苏州坐二等座高铁；西安—黄山默认高铁，每周航班对上日期才改飞经济舱。导游每城更换，转场由两地司机接送；语种按订单确认。",
    "관광일에는 도시별 한국어 현지 가이드와 전용 차량을 일행만 이용하며 모든 이동이 포함됩니다. 황산 왕복 케이블카, 훙촌, 서호 유람선, 쑤저우 정원 한 곳 등 기본 입장권이 들어 있습니다. 베이징–시안, 황산북–항저우, 항저우–쑤저우는 고속철도 2등석입니다. 시안–황산도 열차가 기본이며 주 1회 정도 항공편이 날짜에 맞으면 이코노미로 바꿉니다. 가이드는 도시별로 바뀌고 이동일에는 양쪽 기사가 맡습니다. 한국어 가이드는 추가 요금 없이 도시별 가능 여부를 확인합니다.",
  ),
  exclusions: exclusions(
    ["Single-room supplement", "A night on the Huangshan summit unless added in writing", "Checked baggage above the airline's included allowance"],
    ["单房差", "未书面加订的黄山山顶住宿", "超出航司免费额度的托运行李"],
    ["1인실 추가금", "서면으로 추가하지 않은 황산 정상 숙박", "항공사 무료 허용량을 넘는 위탁 수하물"],
  ),
  bookingNote: privateBookingNote,
  faq: [
    faq(
      l("How much does this 14-day tour cost?", "这条 14 天线路多少钱？", "이 14일 일정은 얼마인가요?"),
      l(
        "On the 14-day Beijing–Xi’an–Huangshan–Hangzhou–Shanghai private tour, two sharing a twin room pay USD 3,790 each, USD 7,580 together. It is USD 3,190 each for four or USD 2,990 for six. The land price includes 13 breakfast hotel nights, city guides and vehicles on touring days, named tickets and Huangshan cable cars, plus the trains between stops. Xi’an to Huangshan can be by flight if the weekly service fits your date. Add international flights and lunches and dinners separately. We quote other party sizes in writing.",
        "北京、西安、黄山、杭州到上海的 14 天私家团，2 人住一间每人 ¥24,630，两人共 ¥49,260；4 人每人 ¥20,730，6 人每人 ¥19,430。价格含 13 晚早餐酒店、各地游览日的私人导游和车、黄山索道等门票，以及城际高铁。西安到黄山若刚好对上每周航班，也可改飞。国际机票和午晚餐另付；其他人数书面报价。",
        "베이징·시안·황산·항저우·상하이 14일 프라이빗 일정은 2명, 2인 1실에 1인 ₩5,300,000, 두 명 합계 ₩10,600,000입니다. 4명은 1인 ₩4,460,000, 6명은 ₩4,180,000입니다. 조식 포함 호텔 13박, 관광일의 도시별 전용 가이드와 차량, 황산 케이블카 등 입장권과 도시 간 열차가 포함됩니다. 시안–황산은 주 1회 정도 항공편이 날짜에 맞으면 비행기로 바꿀 수 있습니다. 국제선과 중식·석식은 별도이며 다른 인원은 서면 견적을 드립니다.",
      ),
    ),
    faq(
      l("How hard is the Huangshan day?", "黄山这一天累吗？", "황산 일정은 힘든가요?"),
      l(
        "On the 14-day Beijing–Xi’an–Huangshan–Hangzhou–Shanghai route, the cable cars save the main climb, but the Huangshan summit loop still has several hours of stone steps. Active walkers usually manage it. If mobility is limited, we use shorter viewpoints near the cable-car stations.",
        "北京、西安、黄山、杭州到上海这条 14 天线，黄山上下有索道，山顶还是要走几个小时石阶。平时常走路的人一般可以走；行动不便的话，我们改走索道站附近较短的观景路线。",
        "베이징·시안·황산·항저우·상하이 14일 일정은 케이블카로 큰 오르막을 줄여도 황산 정상 돌계단을 몇 시간 걷습니다. 평소 걷는 분은 보통 다닐 수 있습니다. 이동이 불편하면 케이블카역 가까운 전망대로 동선을 줄입니다.",
      ),
    ),
    faq(
      l("Can we stay on the summit for sunrise?", "可以住山顶看日出吗？", "정상에서 자고 일출을 볼 수 있나요?"),
      l(
        "A Huangshan summit night can be quoted for the 14-day Beijing–Xi’an–Huangshan–Hangzhou–Shanghai private tour. Summit hotels are simpler and cost more than Tangkou, and the main luggage stays below. We confirm the separate price before you book.",
        "北京、西安、黄山、杭州到上海的 14 天私家团，可以另报黄山山顶住宿。山顶酒店比汤口条件简单、价格高，大件行李留在山下；费用会在预订前说清。",
        "베이징·시안·황산·항저우·상하이 14일 프라이빗 투어에는 황산 정상 숙박을 별도 견적으로 넣을 수 있습니다. 정상 호텔은 탕커우보다 시설이 단순하고 요금이 높으며 큰 짐은 산 아래 둡니다. 예약 전에 금액을 확인합니다.",
      ),
    ),
    faq(
      l("When is the best time to go?", "什么时候去最好？", "언제 가는 것이 좋은가요?"),
      l(
        "April–May and September–November are good windows for the 14-day Beijing–Xi’an–Huangshan–Hangzhou–Shanghai route. Huangshan’s mist is common even then. The mountain is especially crowded in the Chinese holiday weeks of early May and early October.",
        "北京、西安、黄山、杭州到上海这条 14 天线，4–5 月和 9–11 月比较合适。黄山这时也可能有云雾；五一、国庆那一周山上尤其挤。",
        "베이징·시안·황산·항저우·상하이 14일 일정은 4~5월과 9~11월이 좋습니다. 황산은 이때도 안개가 낄 수 있습니다. 5월 초와 10월 초 중국 연휴에는 산이 특히 붐빕니다.",
      ),
    ),
    faq(
      l("Why choose this route over the classic 14-day tour?", "为什么选这条而不是经典 14 天线？", "대표 14일 일정 대신 이 일정을 고르는 이유는?"),
      l(
        "The 14-day Beijing–Xi’an–Huangshan–Hangzhou–Shanghai route replaces Chengdu and Guilin with Huangshan, Hongcun, West Lake and Suzhou. For two sharing a twin room it starts at USD 3,790 each, against USD 3,990 for the 14-day classic. Here the extra day goes to Huangshan and eastern gardens; the classic route spends that time on pandas and the Li River.",
        "北京、西安、黄山、杭州到上海的 14 天线，用黄山、宏村、西湖和苏州代替成都、桂林。2 人同行、两人一间每人 ¥24,630 起；经典 14 天线每人 ¥25,930 起。想用整天走黄山、看江南园林，就选这条；想看熊猫和漓江，选经典线。",
        "베이징·시안·황산·항저우·상하이 14일 일정은 청두와 구이린 대신 황산, 훙촌, 서호, 쑤저우를 봅니다. 2명, 2인 1실 기준 1인 ₩5,300,000부터이고 기본 14일 일정은 ₩5,580,000부터입니다. 판다와 리강보다 황산에서 보내는 하루와 동부 정원을 원할 때 맞습니다.",
      ),
    ),
  ],
  heroImage: image(
    huangshanSlug,
    "hero.webp",
    l("Boats on West Lake in Hangzhou with lotus in the foreground", "杭州西湖上的游船与荷花", "연꽃 너머 항저우 서호의 배"),
    l("A two-night Hangzhou stop leaves a whole day for West Lake.", "杭州住 2 晚，西湖可以慢慢走一天。", "항저우에서 2박하며 서호에 하루를 씁니다."),
  ),
  gallery: [
    image(
      huangshanSlug,
      "gallery-1.webp",
      l("The Huangpu River curving past Lujiazui in Shanghai", "黄浦江弯道与陆家嘴", "상하이 루자쭈이를 휘감는 황푸강"),
      l("Shanghai is the final three-night stop.", "最后到上海住 3 晚。", "마지막 상하이에서 3박합니다."),
    ),
  ],
  routeMedia: [
    {
      day: 3,
      variants: [{
        label: l("Great Wall", "长城", "만리장성"),
        image: image(
          huangshanSlug,
          "route-day-3.webp",
          l("Watchtowers on a restored Great Wall ridge", "修复段长城山脊上的敌楼", "복원된 만리장성 능선의 망루"),
          l("The first three nights are in Beijing.", "前 3 晚都在北京。", "첫 3박은 베이징에서 합니다."),
        ),
      }],
    },
    {
      day: 7,
      variants: [{
        label: l("Huangshan", "黄山", "황산"),
        image: image(
          huangshanSlug,
          "route-day-7.webp",
          l("Early light over the Huangshan summit", "黄山山顶的清晨天光", "황산 정상의 이른 아침 빛"),
          l("An early start helps avoid the Huangshan cable-car queue.", "黄山这天早点走，少排一会儿索道。", "황산 케이블카 대기 시간을 줄이려고 일찍 출발합니다."),
        ),
      }],
    },
  ],
  packages: [privatePackage([usd(2, 3790), usd(4, 3190), usd(6, 2990)])],
  datePublished: PUBLISHED,
  dateModified: MODIFIED,
};

// ---------------------------------------------------------------------------
// 8. Grand China: 21 days with Zhangjiajie and the Yangtze, private
// ---------------------------------------------------------------------------

const grandChinaSlug = "china-grand-tour-21-day-private-tour";

const grandChina: PrivateTourProduct = {
  id: "private-tour-china-grand-tour-21d20n",
  slug: grandChinaSlug,
  days: 21,
  nights: 20,
  servicePolicy,
  includesDomesticFlights: true,
  title: l(
    "Grand China with Zhangjiajie & the Yangtze: 21-Day Private Tour",
    "中国全景：含张家界与长江游轮 21 天 20 晚私家团",
    "장가계·양쯔강 크루즈를 포함한 중국 일주 21일 프라이빗 투어",
  ),
  metadataTitle: l(
    "3-Week China Private Tour: 21 Days with Yangtze Cruise",
    "中国全景21天私家团",
    "중국 일주 21일 프라이빗 투어",
  ),
  metadataDescription: l(
    "21-day private tour: Beijing, Xi'an, pandas, Li River, Zhangjiajie, 3-night Yangtze cruise, Shanghai. Per person USD 5,890 for 2 travellers, 4,690 for 6.",
    "21 天私家团：北京、西安、大熊猫、漓江、张家界、三晚长江游轮与上海。每人价格：2 人同行 ¥38,280，6 人同行 ¥30,480。",
    "21일 프라이빗 투어: 베이징, 시안, 판다, 리강, 장가계, 3박 양쯔강 크루즈, 상하이. 1인 요금 2명 ₩8,240,000, 6명 ₩6,560,000.",
  ),
  eyebrow: l(
    "Three weeks across the cities, mountains and the Yangtze",
    "三周走城市、山水，也在长江船上住三晚",
    "3주 동안 도시와 산을 돌고 양쯔강에서 3박",
  ),
  lede: l(
    "Two sharing twin hotel rooms and a standard balcony cabin pay USD 5,890 each to take the 21-day China private tour; international flights are extra. It joins Beijing and Xi’an, Chengdu’s pandas, the Li River, Zhangjiajie and a three-night downstream Yangtze cruise. Expect several full travel days between them.",
    "走 21 天中国私家团，2 人住一间并用标准阳台舱，每人 ¥38,280 起，国际机票另付。北京、西安、成都大熊猫、漓江、张家界和三晚长江下水游轮都走到；中间也有几天几乎整天在转场。",
    "중국 21일 프라이빗 투어는 호텔 2인 1실과 기본 발코니 객실을 쓰는 2명일 때 1인 ₩8,240,000부터입니다. 국제선은 별도입니다. 베이징, 시안, 청두 판다, 리강, 장가계와 양쯔강 하행 크루즈 3박을 잇습니다. 중간에는 하루를 거의 이동에 쓰는 날도 있습니다.",
  ),
  summary: l(
    "The 20 nights comprise 17 breakfast-included hotel nights and three in a balcony cruise cabin. Local private guides and vehicles on land touring days, transfers, named tickets, trains, domestic flights and the cruise with onboard meals are included. Guides change by city; the ship runs its own programme.",
    "20 晚里，17 晚是含早酒店，3 晚在游轮阳台舱。陆上游览日的当地私人导游和车、接送、所列门票、高铁、国内航班和船上餐食都含。导游按城市更换，船上活动按船方安排。",
    "20박 중 조식 포함 호텔이 17박, 크루즈 발코니 객실이 3박입니다. 육상 관광일의 도시별 전용 가이드와 차량, 이동, 명시된 입장권, 열차, 국내선과 선상 식사가 포함됩니다. 가이드는 도시별로 바뀌고 선상 일정은 선박 운영에 따릅니다.",
  ),
  highlights: lists(
    [
      "Beijing, the Terracotta Warriors and Chengdu's pandas",
      "The Li River and two Yangshuo nights",
      "Zhangjiajie Forest Park and Tianmen Mountain",
      "A three-night Three Gorges cruise",
    ],
    [
      "北京、兵马俑与成都大熊猫",
      "漓江与阳朔 2 晚",
      "张家界森林公园与天门山",
      "三晚长江三峡游轮",
    ],
    [
      "베이징, 병마용과 청두 판다",
      "리강과 양숴 2박",
      "장가계 삼림공원과 천문산",
      "3박 삼협 크루즈",
    ],
  ),
  itinerary: [
    arriveBeijing(1, "private"),
    forbiddenCity(2),
    greatWall(3),
    templeAndSummerPalace(4),
    trainToXian(5),
    terracottaAndWall(6),
    trainToChengdu(7),
    pandas(8, "private"),
    flyToGuilin(9, "Chengdu"),
    liRiver(10),
    yulongCountryside(11),
    day(
      12,
      l("Yangshuo to Zhangjiajie", "阳朔前往张家界", "양숴에서 장가계로"),
      l(
        "First drive about 1.5 hours from Yangshuo back to Guilin. The direct high-speed train to Zhangjiajie West then takes about 7–7.5 hours, making this a full travel day. A driver takes you on to the hotel by the Wulingyuan gates.",
        "阳朔先开车约 1.5 小时回桂林，之后坐直达高铁约 7–7.5 小时到张家界西站。今天基本都在路上；到站后司机送去武陵源门口附近酒店。",
        "양숴에서 구이린까지 차로 약 1.5시간 돌아간 뒤 직통 고속철도로 장가계서역까지 약 7~7.5시간 갑니다. 하루가 거의 이동으로 끝나며 도착지 기사가 무릉원 입구 근처 호텔로 모십니다.",
      ),
    ),
    forestPark(13),
    tianmenMountain(14),
    day(
      15,
      l("High-speed train to Chongqing", "高铁前往重庆", "고속철도로 충칭"),
      l(
        "Zhangjiajie to Chongqing is about 2–3 hours on the booked high-speed train. Later, walk from Jiefangbei along the river to Hongyadong; it is lit after dark. Stay in Chongqing.",
        "张家界到重庆坐已订高铁约 2–3 小时。下午从解放碑沿江走到洪崖洞，天黑后看亮灯，住重庆。",
        "장가계에서 충칭까지 예약된 고속철도로 약 2~3시간입니다. 오후에는 제팡베이에서 강을 따라 훙야둥까지 걷고 어두워진 뒤 불 켜진 모습을 봅니다. 충칭에서 숙박합니다.",
      ),
    ),
    chongqingThenBoard(16),
    onTheYangtze(17),
    quTangAndWuGorges(18),
    damThenFlyToShanghai(19),
    shanghaiDay(20, "private"),
    departShanghai(21, "private"),
  ],
  hotelNote: l(
    "This 20-night trip has 17 breakfast-included hotel nights at the four-star standard (4 diamonds on Trip.com/Ctrip), with twin rooms: Beijing 4, Xi’an 2, Chengdu 2, Guilin 1, Yangshuo 2, Wulingyuan 2, Zhangjiajie city 1, Chongqing 1 and Shanghai 2. Three more nights are in a standard balcony cabin on a five-star-rated Yangtze ship, normally with Gold Cruises; on the lowest cabin deck the balcony may be glassed in. We confirm the hotels, ship and cabin before payment.",
    "20 晚中，17 晚住含早的携程 4 钻标准酒店，默认两人一间：北京 4 晚、西安 2 晚、成都 2 晚、桂林 1 晚、阳朔 2 晚、武陵源 2 晚、张家界市区 1 晚、重庆 1 晚、上海 2 晚。另外 3 晚住五星级长江游轮的标准阳台舱，通常订长江黄金游轮；最低一层舱房的阳台可能是封闭玻璃窗。酒店、船和舱房付款前确认。",
    "20박 중 17박은 조식 포함 씨트립 4다이아 등급 호텔 2인 1실입니다. 베이징 4박, 시안 2박, 청두 2박, 구이린 1박, 양숴 2박, 무릉원 2박, 장가계 시내 1박, 충칭 1박, 상하이 2박입니다. 3박은 5성급 양쯔강 크루즈의 기본 발코니 객실이며 보통 골드 크루즈를 이용합니다. 가장 낮은 객실층은 발코니가 유리로 막혀 있을 수 있습니다. 호텔, 선박과 객실은 결제 전에 확인합니다.",
  ),
  serviceNote: l(
    "An English-speaking local guide and vehicle serve your party on land touring days. Transfers and named first entries include Zhangjiajie National Forest Park, the Bailong Elevator and Tianmen Mountain cable car. The Li River cruise moves luggage separately, and one Yulong River bamboo raft is included. Second-class trains run Beijing–Xi’an–Chengdu, Guilin–Zhangjiajie and Zhangjiajie–Chongqing; flights are economy Chengdu–Guilin and, if chosen over rail, Yichang–Shanghai. The Yichang–Shanghai train is also included as that alternative. The ship booking covers the cabin, meals from boarding-night dinner to last-morning breakfast, and three shore visits, usually Fengdu Ghost City, the Lesser Three Gorges and the Three Gorges Dam. Guides change by city; drivers cover travel-day handovers. Korean-speaking land guides cost the same where available.",
    "陆上游览日由各地导游和车只带你们。全部接送、所列首道门票都含，包括张家界国家森林公园、百龙天梯和天门山索道。漓江船有行李另车转运，还含一次遇龙河竹筏。北京—西安—成都、桂林—张家界、张家界—重庆坐二等座高铁；成都—桂林坐经济舱航班，宜昌—上海则按确认的火车或经济舱航班走。游轮含舱房、从登船晚餐到离船早餐的船上餐食，以及三处岸上游览，通常是丰都鬼城、小三峡和三峡大坝。导游每城更换，转场由两地司机接送；陆上语种按订单确认。",
    "육상 관광일에는 도시별 한국어 현지 가이드와 전용 차량을 일행만 이용합니다. 모든 이동과 장가계 국가삼림공원, 백룡엘리베이터, 천문산 케이블카 등 기본 입장권이 포함됩니다. 리강 배의 짐 별도 이동과 위룽허 뗏목 1회도 포함됩니다. 베이징–시안–청두, 구이린–장가계, 장가계–충칭은 고속철도 2등석입니다. 청두–구이린은 이코노미 항공편, 이창–상하이는 열차 또는 이코노미 항공편을 탑니다. 크루즈 객실, 승선일 저녁부터 마지막 날 아침까지의 선상 식사, 보통 펑두 귀성·소삼협·삼협댐 세 곳의 육상 관광도 요금에 들어 있습니다. 가이드는 도시별로 바뀌고 이동일에는 양쪽 기사가 맡습니다. 한국어 육상 가이드는 추가 요금 없이 도시별 가능 여부를 확인합니다.",
  ),
  exclusions: exclusions(
    ["Single-room and single-cabin supplements (a cabin for one is charged at close to twice the shared per-person cruise fare)", "Cruise gratuities, paid shore options sold on board (such as White Emperor City and the dam's ship lift) and cabin upgrades", "Peak-date cruise surcharges above the base balcony cabin", "The Day 20 option not chosen in writing"],
    ["单房差与单人舱差价（一人住一间舱，船费接近两人同住时每人价的两倍）", "游轮服务费、船上另卖的自费项目（如白帝城、升船机）与舱房升级", "旺季航期高于基础阳台舱的差价", "第 20 天未书面选定的另一方案"],
    ["1인실·1인 선실 추가금(혼자 쓰는 선실은 2인 1실 1인 크루즈 요금의 두 배 가까이 받습니다)", "크루즈 봉사료, 배에서 파는 유료 선택 관광(백제성, 삼협댐 선박 리프트 등)과 객실 업그레이드", "성수기 운항 시 기본 발코니 객실 대비 차액", "20일 차에 서면으로 선택하지 않은 다른 일정"],
    { cruise: true },
  ),
  bookingNote: l(
    "The listed starting price is per person for the stated group size, assuming twin hotel rooms and a standard balcony cabin. Yangtze fares vary by ship and sailing date. Before payment, we put the ship, cabin, any peak-date difference and the final total in writing. We request passport details ahead of Forbidden City and Terracotta Warriors ticket sales.",
    "页面起价按对应人数算每人，酒店两人一间，游轮用标准阳台舱。长江船价随船和航期变；付款前，我们会把船名、舱房、旺季差价和最终总价写给你。故宫、兵马俑开放订票前，还要收护照信息。",
    "표시 시작가는 해당 인원이 호텔 2인 1실과 기본 발코니 객실을 쓸 때의 1인 금액입니다. 양쯔강 크루즈 요금은 배와 운항일에 따라 달라집니다. 결제 전에 선박, 객실, 성수기 차액과 최종 금액을 서면으로 확인합니다. 자금성과 병마용 입장권 발매 전에는 여권 정보를 요청합니다.",
  ),
  faq: [
    faq(
      l("How much does a three-week China tour cost?", "中国三周游要多少钱？", "중국 3주 여행은 얼마인가요?"),
      l(
        "A 21-day private China trip covering Beijing, Xi’an, Chengdu, Guilin, Zhangjiajie, the Yangtze and Shanghai is USD 5,890 each for two sharing hotel rooms and a standard balcony cabin, USD 11,780 together. Four pay USD 4,990 each and six USD 4,690. Included are 17 hotel nights with breakfast, a three-night Yangtze cruise with onboard meals, the Li River boat, local private guides and vehicles on land, tickets, route trains and domestic flights. International flights and land meals are separate; peak sailings may raise the total. Ask for a written quote for another group size.",
        "这条走北京、西安、成都、桂林、张家界、长江和上海的 21 天私家团，2 人住一间并用标准阳台舱，每人 ¥38,280，两人共 ¥76,560；4 人每人 ¥32,430，6 人每人 ¥30,480。价格含 17 晚早餐酒店、三晚长江游轮及船上餐食、漓江游船、陆上私人导游和车、门票、路线上的火车和国内航班。国际机票和陆上午晚餐另付，旺季船期可能加价；其他人数书面报价。",
        "베이징·시안·청두·구이린·장가계·양쯔강·상하이를 잇는 21일 프라이빗 투어는 호텔 2인 1실과 기본 발코니 객실 기준 2명이면 1인 ₩8,240,000, 합계 ₩16,480,000입니다. 4명은 1인 ₩6,980,000, 6명은 ₩6,560,000입니다. 조식 포함 호텔 17박, 선상 식사가 있는 양쯔강 크루즈 3박, 리강 유람선, 육상 도시별 전용 가이드와 차량, 입장권, 열차와 국내선이 포함됩니다. 국제선과 육상 중식·석식은 별도이고 성수기 운항은 요금이 높을 수 있습니다. 다른 인원은 서면으로 견적을 드립니다.",
      ),
    ),
    faq(
      l("Is three weeks too much moving?", "三周会不会太赶？", "3주는 이동이 너무 많지 않나요?"),
      l(
        "The 21-day China private tour still has several full travel days, even though most stops get at least one full day and the three Yangtze cruise nights reduce hotel changes. If that pace feels heavy, the 17-day Beijing–Xi’an–Chengdu–Yangtze–Shanghai tour leaves out Guilin and Zhangjiajie and starts at USD 4,690 each for two.",
        "21 天中国私家团多数地方至少留一个完整游览日，三晚长江游轮也省了换酒店，但仍有几天几乎都在转场。觉得太赶，可以选不去桂林和张家界的 17 天北京、西安、成都、长江到上海线，2 人同行每人 ¥30,480 起。",
        "중국 21일 프라이빗 투어는 대부분의 지역에 관광 하루 이상을 두고 양쯔강 크루즈 3박 동안 호텔을 옮기지 않습니다. 그래도 하루를 거의 이동에 쓰는 날이 있습니다. 부담스럽다면 구이린과 장가계를 뺀 베이징·시안·청두·양쯔강·상하이 17일 일정이 2명 기준 1인 ₩6,560,000부터입니다.",
      ),
    ),
    faq(
      l("When is the best time for this route?", "什么时候走这条线最好？", "이 일정은 언제가 좋은가요?"),
      l(
        "The 21-day China private route works best in April–May or September–October, when Zhangjiajie has more clear days and the heat is easier. The Yangtze ships run from late February to late December, so the cruise is rarely what limits the dates. Avoid the first weeks of May and October if you can; the holiday crowds make several stops busier.",
        "21 天中国私家团优先选 4–5 月或 9–10 月。这时张家界晴天相对多，也没那么热；长江游轮 2 月底到 12 月下旬都在开，日期很少卡在游轮上。能避开五一和国庆第一周就避开，几处景点都会更忙。",
        "중국 21일 프라이빗 일정은 4~5월과 9~10월이 좋습니다. 장가계에 맑은 날이 비교적 많고 더위도 덜합니다. 양쯔강 크루즈는 2월 말부터 12월 하순까지 운항해 크루즈 때문에 날짜가 막히는 경우는 드뭅니다. 5월과 10월 첫 주 연휴는 여러 명소가 붐비니 가능하면 피하세요.",
      ),
    ),
  ],
  heroImage: image(
    grandChinaSlug,
    "hero.webp",
    l("Mist among the sandstone peaks of Zhangjiajie", "张家界砂岩峰林间的云雾", "장가계 사암 봉우리 사이의 안개"),
    l("Between the Li River and Yangtze legs, stay three nights in Zhangjiajie.", "漓江之后、长江之前，在张家界住 3 晚。", "리강과 양쯔강 사이에 장가계에서 3박합니다."),
  ),
  gallery: [
    image(
      grandChinaSlug,
      "gallery-1.webp",
      l("Karst peaks above the Li River", "漓江边的喀斯特山峰", "리강 위의 카르스트 봉우리"),
      l("The Li River journey finishes at Yangshuo.", "漓江船的终点是阳朔。", "리강 배는 양숴까지 갑니다."),
    ),
  ],
  routeMedia: [
    {
      day: 8,
      variants: [{
        label: l("Chengdu", "成都", "청두"),
        image: image(
          grandChinaSlug,
          "route-day-8.webp",
          l("Close view of a giant panda", "大熊猫近景", "판다 근접 모습"),
          l("Visit the Chengdu panda base around opening time.", "成都熊猫基地开园时就去。", "청두 판다 기지는 개장 무렵 방문합니다."),
        ),
      }],
    },
    {
      day: 14,
      variants: [{
        label: l("Tianmen Mountain", "天门山", "천문산"),
        image: image(
          grandChinaSlug,
          "route-day-14.webp",
          l("Clouds among the peaks around Tianmen Mountain", "天门山一带的云海峰林", "천문산 주변 봉우리 사이의 구름"),
          l("The Tianmen Mountain cable car leaves from Zhangjiajie city.", "从张家界市区上天门山索道。", "천문산 케이블카는 장가계 시내에서 출발합니다."),
        ),
      }],
    },
  ],
  packages: [privatePackage([usd(2, 5890), usd(4, 4990), usd(6, 4690)])],
  datePublished: PUBLISHED,
  dateModified: MODIFIED,
};

// ---------------------------------------------------------------------------
// 9. Beijing, Xi'an, Guilin & Shanghai in 10 days, private
// ---------------------------------------------------------------------------

const classic10Slug = "beijing-xian-guilin-shanghai-10-day-private-tour";

const classicTen: PrivateTourProduct = {
  id: "private-tour-beijing-xian-guilin-shanghai-10d9n",
  slug: classic10Slug,
  days: 10,
  nights: 9,
  servicePolicy,
  includesDomesticFlights: true,
  title: l(
    "Beijing, Xi'an, Guilin & Shanghai: 10-Day Private Tour",
    "北京·西安·桂林·上海 10 天 9 晚私家团",
    "베이징·시안·구이린·상하이 10일 프라이빗 투어",
  ),
  metadataTitle: l(
    "10-Day China Private Tour: Beijing, Xi'an, Guilin, Shanghai",
    "北京西安桂林上海10天私家团",
    "구이린 포함 중국 10일 프라이빗 투어",
  ),
  metadataDescription: l(
    "10-day private tour: Great Wall, Terracotta Warriors, Li River, Shanghai. Per person USD 2,990 for 2 travellers, 2,390 for 6; domestic flights included.",
    "10 天私家团：长城、兵马俑、漓江与上海。每人价格：2 人同行 ¥19,430，6 人同行 ¥15,530；含国内航班与高铁。",
    "10일 프라이빗 투어: 만리장성, 병마용, 리강, 상하이. 1인 요금 2명 ₩4,180,000, 6명 ₩3,340,000. 국내선·고속철도 포함.",
  ),
  eyebrow: l(
    "Ten days for Beijing, Xi’an, the Li River and Shanghai",
    "10 天看北京、西安、漓江和上海",
    "10일 동안 베이징·시안·리강·상하이",
  ),
  lede: l(
    "The 10-day Beijing–Xi’an–Guilin–Shanghai private trip is priced from USD 2,990 each for two in twin rooms, excluding international flights. The route still gives the Great Wall, Terracotta Warriors and Li River their own days, but it moves on quickly after each stop.",
    "10 天从北京、西安走到桂林、上海，2 人同行住一间，每人 ¥19,430 起，国际机票另计。长城、兵马俑和漓江都各留一天，但每站看完就继续走，节奏会比 14 天线快。",
    "베이징·시안·구이린·상하이 10일 프라이빗 투어는 2명, 2인 1실에 1인 ₩4,180,000부터입니다. 국제선은 별도입니다. 만리장성, 병마용, 리강에 각각 하루를 쓰지만 각 도시에서 오래 머물지는 않습니다.",
  ),
  summary: l(
    "Nine hotel nights include breakfast. The price covers local private guides and vehicles on touring days, transfers, named tickets, the Li River cruise, one second-class train and two economy flights. If you want a rest day, the 14-day route gives you more room.",
    "9 晚酒店都含早餐。游览日的当地私人导游和车、接送、所列门票、漓江游船、一段二等座高铁和两段经济舱航班都含。想中间歇一天，14 天线更宽松。",
    "호텔 9박에는 조식이 포함됩니다. 관광일의 도시별 전용 가이드와 차량, 이동, 명시된 입장권, 리강 유람선, 고속철도 2등석 1구간과 이코노미 항공 2구간이 포함됩니다. 중간에 쉬는 날이 필요하면 14일 일정이 더 여유롭습니다.",
  ),
  highlights: lists(
    [
      "The Great Wall at Mutianyu",
      "A full Terracotta Warriors day",
      "Li River cruise to Yangshuo",
      "Domestic flights and high-speed rail included",
    ],
    [
      "慕田峪长城",
      "兵马俑完整一天",
      "漓江游船到阳朔",
      "含国内航班与高铁",
    ],
    [
      "무톈위 만리장성",
      "병마용 종일 일정",
      "양숴까지 리강 유람선",
      "국내선 항공과 고속철도 포함",
    ],
  ),
  itinerary: [
    arriveBeijing(1, "private"),
    forbiddenCity(2),
    greatWall(3, "hutong"),
    trainToXian(4),
    terracottaAndWall(5),
    flyXianToGuilin(6),
    day(
      7,
      l("Li River and the Yangshuo countryside", "漓江与阳朔乡村", "리강과 양숴 전원"),
      l(
        "The Li River boat takes about four hours to Yangshuo, while your luggage goes separately by road. Later, take a short bike ride or drive through the Yulong River countryside. Stay in Yangshuo.",
        "漓江船约 4 小时到阳朔，大件行李另车转运。下午再骑车或乘车走一小段遇龙河乡村，晚上住阳朔。",
        "리강 배로 양숴까지 약 4시간 가는 동안 짐은 차량으로 따로 옮깁니다. 오후에는 위룽허 시골길을 짧게 자전거로 가거나 차량으로 둘러봅니다. 양숴에서 숙박합니다.",
      ),
    ),
    flyToShanghai(8),
    shanghaiDay(9, "private"),
    departShanghai(10, "private"),
  ],
  hotelNote: l(
    "Nine hotel nights include breakfast and use twin rooms at the four-star standard (4 diamonds on Trip.com/Ctrip). The stays are Beijing 3, Xi’an 2, Guilin 1, Yangshuo 1 and Shanghai 2. We confirm the hotel names and room types before payment.",
    "9 晚酒店都含早，默认两人一间，按携程 4 钻标准选。北京 3 晚、西安 2 晚、桂林 1 晚、阳朔 1 晚、上海 2 晚。酒店名称和房型付款前确认。",
    "조식 포함 씨트립 4다이아 등급 호텔에서 2인 1실로 9박합니다. 베이징 3박, 시안 2박, 구이린 1박, 양숴 1박, 상하이 2박입니다. 호텔 이름과 객실 형태는 결제 전에 확인합니다.",
  ),
  serviceNote: l(
    "An English-speaking local guide and vehicle serve your party only on touring days. Transfers, named first-entry tickets and the Li River cruise are included; luggage goes to Yangshuo separately by road. Between cities, we include the second-class Beijing–Xi’an train and economy flights Xi’an–Guilin and Guilin–Shanghai. Guides change by city, with drivers at both ends of each train or flight. Korean-speaking guides cost the same where available.",
    "游览日各地导游和车只服务你们。全部接送、所列首道门票和漓江游船都含，行李另车到阳朔。城际含北京—西安二等座高铁，以及西安—桂林、桂林—上海经济舱航班。导游每城更换，坐火车或飞机时由两地司机接送；语种按订单确认。",
    "관광일에는 도시별 한국어 현지 가이드와 전용 차량을 일행만 이용합니다. 모든 이동, 명시된 기본 입장권과 리강 배가 포함되며 짐은 차량으로 양숴까지 따로 갑니다. 베이징–시안 고속철도 2등석, 시안–구이린과 구이린–상하이 이코노미 항공편도 포함됩니다. 가이드는 도시별로 바뀌고 열차·항공 이동에는 양쪽 기사가 맡습니다. 한국어 가이드는 추가 요금 없이 도시별 가능 여부를 확인합니다.",
  ),
  exclusions: exclusions(
    ["Single-room supplement", "Checked baggage above the airline's included allowance", "The Day 9 option not chosen in writing"],
    ["单房差", "超出航司免费额度的托运行李", "第 9 天未书面选定的另一方案"],
    ["1인실 추가금", "항공사 무료 허용량을 넘는 위탁 수하물", "9일 차에 서면으로 선택하지 않은 다른 일정"],
  ),
  bookingNote: privateBookingNote,
  faq: [
    faq(
      l("How much does a 10-day private China tour cost?", "中国 10 天私家团多少钱？", "중국 10일 프라이빗 투어는 얼마인가요?"),
      l(
        "The 10-day Beijing–Xi’an–Guilin–Shanghai private tour is USD 2,990 each for two sharing a twin room, or USD 5,980 for the pair. Four travellers pay USD 2,540 each; six pay USD 2,390. Nine hotel nights with breakfast, guides and vehicles in each city on touring days, entrance tickets, the Li River boat, one high-speed train and two domestic flights are included. International flights and lunches and dinners are extra. We price other party sizes in writing.",
        "北京、西安、桂林到上海的 10 天私家团，2 人住一间每人 ¥19,430，两人共 ¥38,860；4 人每人 ¥16,510，6 人每人 ¥15,530。9 晚早餐酒店、各地游览日的私人导游和车、门票、漓江游船、一段高铁与两段国内航班都含。国际机票和午晚餐不含，其他人数书面报价。",
        "베이징·시안·구이린·상하이 10일 프라이빗 투어는 2명, 2인 1실에 1인 ₩4,180,000, 두 명 합계 ₩8,360,000입니다. 4명은 1인 ₩3,550,000, 6명은 ₩3,340,000입니다. 조식 포함 호텔 9박, 도시별 관광일의 전용 가이드와 차량, 입장권, 리강 배, 고속철도 1구간과 국내선 2구간이 포함됩니다. 국제선과 중식·석식은 별도이며 다른 인원은 서면 견적을 드립니다.",
      ),
    ),
    faq(
      l("Is ten days enough for China?", "十天够玩中国吗？", "중국은 10일이면 충분한가요?"),
      l(
        "Ten days let the Beijing–Xi’an–Guilin–Shanghai private route cover four stops, with travel time between each. It is enough for the Great Wall, Terracotta Warriors and Li River, but it moves quickly. To avoid domestic flights, the 11-day Hangzhou–Suzhou train route starts at USD 2,690 each for two. With two weeks, routes adding Chengdu, Zhangjiajie, Yunnan or Huangshan start at USD 3,790.",
        "北京、西安、桂林到上海的 10 天私家团能走完四站，长城、兵马俑和漓江都留了时间，但每站之间要转场，节奏快。不想坐国内航班，经杭州、苏州的 11 天高铁线 2 人同行每人 ¥17,480 起。有两周的话，加成都、张家界、云南或黄山的线路每人 ¥24,630 起。",
        "베이징·시안·구이린·상하이 10일 프라이빗 일정은 네 지역과 그 사이 이동을 담습니다. 만리장성, 병마용, 리강을 볼 수 있지만 이동은 빠릅니다. 국내선을 피하려면 항저우·쑤저우를 지나는 11일 열차 일정이 2명 기준 1인 ₩3,760,000부터입니다. 2주가 있으면 청두, 장가계, 윈난 또는 황산을 더한 일정이 ₩5,300,000부터입니다.",
      ),
    ),
    faq(
      l("When is the best time to go?", "什么时候去最好？", "언제 가는 것이 좋은가요?"),
      l(
        "For the 10-day Beijing–Xi’an–Guilin–Shanghai route, April–May and September–October are the easier months. Winter is colder in Beijing and Xi’an but quieter; around December–February low water may shorten the Li River boat trip. Early-May and early-October Chinese holidays make trains and sights crowded.",
        "北京、西安、桂林到上海的 10 天线，4–5 月和 9–10 月更好走。冬天北京、西安冷些但人少；约 12 月到次年 2 月，漓江水位低时船程可能缩短。五一、国庆第一周火车和景点更挤。",
        "베이징·시안·구이린·상하이 10일 일정은 4~5월이나 9~10월이 다니기 좋습니다. 겨울 베이징과 시안은 춥지만 한산합니다. 대략 12~2월에는 낮은 수위로 리강 배 구간이 짧아질 수 있습니다. 5월 초와 10월 초 중국 연휴에는 열차와 명소가 붐빕니다.",
      ),
    ),
    faq(
      l("Are there shopping stops?", "有购物店吗？", "쇼핑 일정이 있나요?"),
      l(
        "The 10-day Beijing–Xi’an–Guilin–Shanghai private tour has no shopping stops. Any extra visit or service needs your agreement first.",
        "北京、西安、桂林到上海的 10 天私家团不进购物店。要加景点或服务，先由你同意。",
        "베이징·시안·구이린·상하이 10일 프라이빗 투어에는 쇼핑 일정이 없습니다. 방문지나 서비스를 추가할 때는 먼저 동의를 받습니다.",
      ),
    ),
  ],
  heroImage: image(
    classic10Slug,
    "hero.webp",
    l("Morning mist over the Li River among karst peaks", "喀斯特峰林间漓江上的晨雾", "카르스트 봉우리 사이 리강의 아침 안개"),
    l("On Day 7, the Li River boat takes you into Yangshuo.", "第 7 天坐漓江船进阳朔。", "7일 차 리강 배를 타고 양숴에 갑니다."),
  ),
  gallery: [
    image(
      classic10Slug,
      "gallery-1.webp",
      l("Hall of Prayer for Good Harvests at the Temple of Heaven", "天坛祈年殿", "천단 기년전"),
      l("Beijing takes the first three nights of the ten-day route.", "10 天线的前 3 晚住北京。", "10일 일정의 첫 3박은 베이징입니다."),
    ),
  ],
  routeMedia: [
    {
      day: 5,
      variants: [{
        label: l("Xi'an", "西安", "시안"),
        image: image(
          classic10Slug,
          "route-day-5.webp",
          l("The Bell Tower in Xi'an", "西安钟楼", "시안 종루"),
          l("After the Terracotta Warriors on Day 5, head back inside Xi’an’s walls.", "第 5 天看完兵马俑，再回西安城墙内。", "5일 차 병마용을 본 뒤 시안 성안으로 돌아옵니다."),
        ),
      }],
    },
    {
      day: 9,
      variants: [{
        label: l("Shanghai", "上海", "상하이"),
        image: image(
          classic10Slug,
          "route-day-9.webp",
          l("Historic buildings on the Bund at night", "夜色中的外滩历史建筑", "밤의 와이탄 역사 건물"),
          l("Day 9 is yours to choose: Shanghai touring or a Suzhou day trip.", "第 9 天二选一：留在上海游览，或去苏州一天。", "9일 차에는 상하이 관광과 쑤저우 당일 여행 중 고릅니다."),
        ),
      }],
    },
  ],
  packages: [privatePackage([usd(2, 2990), usd(4, 2540), usd(6, 2390)])],
  datePublished: PUBLISHED,
  dateModified: MODIFIED,
};

// ---------------------------------------------------------------------------
// 10. Beijing, Hangzhou, Suzhou & Shanghai in 11 days, private
// ---------------------------------------------------------------------------

const jiangnanSlug = "beijing-hangzhou-suzhou-shanghai-11-day-private-tour";

const beijingJiangnan: PrivateTourProduct = {
  id: "private-tour-beijing-hangzhou-suzhou-shanghai-11d10n",
  slug: jiangnanSlug,
  days: 11,
  nights: 10,
  servicePolicy,
  title: l(
    "Beijing, Hangzhou, Suzhou & Shanghai: 11-Day Private Tour",
    "北京·杭州·苏州·上海 11 天 10 晚私家团",
    "베이징·항저우·쑤저우·상하이 11일 프라이빗 투어",
  ),
  metadataTitle: l(
    "Beijing to Shanghai by Train: 11-Day Private Tour",
    "北京杭州苏州上海11天私家团",
    "베이징·항저우·쑤저우·상하이 11일 프라이빗 투어",
  ),
  metadataDescription: l(
    "11-day private tour with no domestic flights: Beijing, West Lake, Suzhou, a water town, Shanghai. Per person USD 2,690 for 2 travellers, 2,140 for 6.",
    "11 天私家团，不坐国内航班：北京、西湖、苏州、水乡古镇与上海。每人价格：2 人同行 ¥17,480，6 人同行 ¥13,910。",
    "국내선 없는 11일 프라이빗 투어: 베이징, 서호, 쑤저우, 수향마을, 상하이. 1인 요금 2명 ₩3,760,000, 6명 ₩3,000,000.",
  ),
  eyebrow: l(
    "Beijing, then Jiangnan by train; no domestic flights",
    "北京看完坐高铁去江南，全程不用国内航班",
    "베이징 뒤에는 열차로 강남을 갑니다. 국내선은 없습니다",
  ),
  lede: l(
    "For a pair in twin rooms, our 11-day Beijing–Hangzhou–Suzhou–Shanghai private route starts at USD 2,690 each; international flights are extra. There are no domestic flights. The longer Beijing-to-Hangzhou train day buys a slower stretch around West Lake, Suzhou’s gardens and a canal town.",
    "两人一间走北京、杭州、苏州到上海的 11 天私家团，每人 ¥17,480 起，国际机票另付。全程不坐国内航班；北京到杭州的高铁坐得久一些，后面换来西湖、苏州园林和水乡比较慢的节奏。",
    "2명이 2인 1실로 가는 베이징·항저우·쑤저우·상하이 11일 프라이빗 투어는 1인 ₩3,760,000부터입니다. 국제선은 별도입니다. 국내선은 타지 않습니다. 베이징에서 항저우까지 열차 이동은 길지만 뒤에는 서호, 쑤저우 정원과 수향마을을 천천히 봅니다.",
  ),
  summary: l(
    "Ten hotel nights include breakfast. Local private guides and vehicles on touring days, transfers, named tickets, a West Lake boat and two second-class train journeys are included. This route stays in eastern China after Beijing and skips Xi’an.",
    "10 晚酒店都含早餐。游览日的当地私人导游和车、接送、所列门票、西湖游船和两段二等座高铁都含。北京之后只走华东，不去西安。",
    "호텔 10박에는 조식이 포함됩니다. 관광일의 도시별 전용 가이드와 차량, 이동, 명시된 입장권, 서호 유람선과 고속철도 2등석 2구간이 포함됩니다. 베이징 이후에는 중국 동부에 머물며 시안은 가지 않습니다.",
  ),
  highlights: lists(
    [
      "Four Beijing nights with the Great Wall",
      "West Lake and a Longjing tea village",
      "A Suzhou garden and a canal water town",
      "Trains and a private car, no domestic flights",
    ],
    [
      "北京住 4 晚，含长城",
      "西湖与龙井茶村",
      "苏州园林与运河水乡",
      "只坐高铁和专车，不坐国内航班",
    ],
    [
      "베이징 4박과 만리장성",
      "서호와 용정차 마을",
      "쑤저우 정원과 운하 수향마을",
      "국내선 없이 고속철도와 전용 차량만",
    ],
  ),
  itinerary: [
    arriveBeijing(1, "private"),
    forbiddenCity(2),
    greatWall(3),
    templeAndSummerPalace(4),
    day(
      5,
      l("High-speed train to Hangzhou", "高铁前往杭州", "고속철도로 항저우"),
      l(
        "The booked second-class train from Beijing to Hangzhou takes about 4.5–6.5 hours. A Hangzhou driver takes you to the hotel; if you want a walk after sitting all day, West Lake is free time in the evening.",
        "北京到杭州坐已订二等座高铁约 4.5–6.5 小时。杭州司机接站送酒店，坐了一天车后想散步，晚上可以自己去西湖边走走。",
        "베이징에서 항저우까지 예약된 고속철도 2등석으로 약 4.5~6.5시간 갑니다. 항저우 기사가 호텔로 모십니다. 오래 앉아 있다가 걷고 싶으면 저녁에 서호 주변을 자유롭게 산책할 수 있습니다.",
      ),
    ),
    westLakeAndLongjing(6),
    suzhouGardens(7),
    waterTownThenShanghai(8),
    bundAndYuGarden(9),
    shanghaiOwnPace(10),
    departShanghai(11, "private"),
  ],
  hotelNote: l(
    "We use breakfast-included twin rooms at the four-star standard (4 diamonds on Trip.com/Ctrip) for all 10 nights: Beijing 4, Hangzhou 2, Suzhou 1 and Shanghai 3. The exact hotels and rooms are confirmed before payment.",
    "10 晚都住含早的携程 4 钻标准酒店，默认两人一间：北京 4 晚、杭州 2 晚、苏州 1 晚、上海 3 晚。具体酒店和房型在付款前确认。",
    "10박 모두 조식 포함 씨트립 4다이아 등급 호텔 2인 1실입니다. 베이징 4박, 항저우 2박, 쑤저우 1박, 상하이 3박입니다. 호텔 이름과 객실은 결제 전에 확인합니다.",
  ),
  serviceNote: l(
    "Each touring city has an English-speaking local guide and vehicle for your party. We include all transfers and named first entries, among them the West Lake boat, one Suzhou garden and the water town. Beijing–Hangzhou and Hangzhou–Suzhou trains are second class; a private vehicle takes you from Suzhou to Shanghai. Guides change by city and drivers meet each end of a train day. Korean-speaking guides cost the same where available.",
    "游览日每座城市都有只带你们的当地导游和车。价格含全部接送、所列首道门票，包括西湖游船、一座苏州园林和水乡古镇。北京—杭州、杭州—苏州坐二等座高铁，苏州到上海用私车。导游每城更换，火车转场由两地司机接送；语种按订单确认。",
    "관광일에는 도시별 한국어 현지 가이드와 전용 차량을 일행만 이용합니다. 모든 이동과 서호 유람선, 쑤저우 정원 한 곳, 수향마을 등 기본 입장권이 포함됩니다. 베이징–항저우와 항저우–쑤저우는 고속철도 2등석, 쑤저우–상하이는 전용 차량입니다. 가이드는 도시별로 바뀌고 열차 이동일에는 양쪽 기사가 맡습니다. 한국어 가이드는 추가 요금 없이 도시별 가능 여부를 확인합니다.",
  ),
  exclusions: lists(
    [
      "International flights to and from China",
      "Lunches, dinners and drinks (breakfast is included at every hotel)",
      "Travel insurance, visas, tips and personal expenses",
      "Room upgrades and public-holiday surcharges",
      "Single-room supplement",
    ],
    [
      "往返中国的国际航班",
      "午餐、晚餐和饮料（每晚酒店均含早餐）",
      "旅行保险、签证、小费及个人消费",
      "房型升级及法定节假日附加费",
      "单房差",
    ],
    [
      "중국 왕복 국제선 항공편",
      "중식·석식·음료(호텔 조식은 매일 포함)",
      "여행자 보험, 비자, 팁 및 개인 경비",
      "객실 업그레이드와 공휴일 추가금",
      "1인실 추가금",
    ],
  ),
  bookingNote: l(
    "The page's starting price is per person at the stated group size, sharing twin rooms. Once dates are settled, we ask every traveller for passport details before Forbidden City tickets open. You see the train bookings, hotels and final total in writing before payment.",
    "页面起价按对应人数、两人一间算每人。日期定了以后，故宫开票前我们会收每个人的护照信息。火车、酒店和最终总价在付款前书面给你确认。",
        "인원별 시작가는 2인 1실을 쓰는 한 사람의 금액입니다. 날짜를 정한 뒤 자금성 입장권이 열리기 전에 여행자 전원의 여권 정보를 받습니다. 예약할 열차와 호텔, 최종 금액은 결제 전에 서면으로 확인해 드립니다.",
  ),
  faq: [
    faq(
      l("How much does this 11-day tour cost?", "这条 11 天线路多少钱？", "이 11일 일정은 얼마인가요?"),
      l(
        "The 11-day Beijing–Hangzhou–Suzhou–Shanghai private route costs USD 2,690 each for two in a twin room, USD 5,380 for the pair. Four pay USD 2,290 each and six USD 2,140. Your land price covers 10 hotel nights with breakfast, local private guides and vehicles on touring days, tickets, a West Lake boat and two high-speed trains. There are no domestic flights. International flights and lunches and dinners are extra; ask us for a written quote at another group size.",
        "北京、杭州、苏州到上海的 11 天私家团，2 人住一间每人 ¥17,480，两人共 ¥34,960；4 人每人 ¥14,880，6 人每人 ¥13,910。10 晚早餐酒店、各地游览日的私人导游和车、门票、西湖游船及两段高铁都含，全程没有国内航班。国际机票和午晚餐另付；其他人数我们书面报价。",
        "베이징·항저우·쑤저우·상하이 11일 프라이빗 일정은 2명, 2인 1실에 1인 ₩3,760,000, 두 명 합계 ₩7,520,000입니다. 4명은 1인 ₩3,200,000, 6명은 ₩3,000,000입니다. 조식 포함 호텔 10박, 관광일의 도시별 전용 가이드와 차량, 입장권, 서호 유람선과 고속철도 2구간이 포함됩니다. 국내선은 없으며 국제선과 중식·석식은 별도입니다. 다른 인원은 서면 견적을 드립니다.",
      ),
    ),
    faq(
      l("Why no Xi'an on this route?", "这条线为什么不去西安？", "이 일정에는 왜 시안이 없나요?"),
      l(
        "The 11-day Beijing–Hangzhou–Suzhou–Shanghai tour stays in the east after Beijing and uses trains instead of domestic flights. That leaves time for West Lake, a Suzhou garden and a canal town. If you want the Terracotta Warriors, the 10-day route includes Xi’an from USD 2,990 per person for two sharing a twin room; the 14-day routes also include Xi’an.",
        "北京、杭州、苏州到上海的 11 天线，北京之后只走华东，城际坐高铁，不坐国内航班。这样才有时间去西湖、苏州园林和水乡。想看兵马俑，可以选含西安的 10 天线，2 人住一间每人 ¥19,430 起；14 天线路也经过西安。",
        "베이징·항저우·쑤저우·상하이 11일 일정은 베이징 뒤 중국 동부에 머물며 국내선 대신 열차를 탑니다. 그래서 서호, 쑤저우 정원과 수향마을에 시간을 쓸 수 있습니다. 병마용을 보려면 시안이 들어간 10일 일정이 2명, 2인 1실에 1인 ₩4,180,000부터이며, 14일 일정에도 시안이 있습니다.",
      ),
    ),
    faq(
      l("When is the best time to go?", "什么时候去最好？", "언제 가는 것이 좋은가요?"),
      l(
        "For the 11-day Beijing–Hangzhou–Suzhou–Shanghai train route, look at April–May or September–November. Hangzhou and Suzhou enter the rainy season in June, and July–August is hot and humid.",
        "北京、杭州、苏州到上海的 11 天高铁线，优先选 4–5 月或 9–11 月。杭州、苏州 6 月进梅雨季，7–8 月又热又潮。",
        "베이징·항저우·쑤저우·상하이 11일 열차 일정은 4~5월 또는 9~11월이 좋습니다. 항저우와 쑤저우는 6월에 장마가 시작되고 7~8월은 덥고 습합니다.",
      ),
    ),
  ],
  heroImage: image(
    jiangnanSlug,
    "hero.webp",
    l("A pavilion on the shore of West Lake in Hangzhou", "杭州西湖岸边的亭子", "항저우 서호 호숫가의 정자"),
    l("With two nights in Hangzhou, West Lake gets a full day.", "杭州连住 2 晚，西湖留整天。", "항저우에서 2박해 서호를 하루 동안 봅니다."),
  ),
  gallery: [
    image(
      jiangnanSlug,
      "gallery-1.webp",
      l("Gongchen Bridge on the Grand Canal in Hangzhou", "杭州京杭大运河上的拱宸桥", "항저우 대운하의 궁천교"),
      l("The canal towns come after the Beijing part of the trip.", "北京之后，行程转到江南的运河城镇。", "베이징 뒤에는 강남 운하 마을로 갑니다."),
    ),
  ],
  routeMedia: [
    {
      day: 4,
      variants: [{
        label: l("Summer Palace", "颐和园", "이화원"),
        image: image(
          jiangnanSlug,
          "route-day-4.webp",
          l("Seventeen-Arch Bridge at the Summer Palace", "颐和园十七孔桥", "이화원 십칠공교"),
          l("Four Beijing nights let the sights spread out over several days.", "北京住 4 晚，景点不用挤在同一天。", "베이징에서 4박해 명소를 여러 날에 나눠 봅니다."),
        ),
      }],
    },
    {
      day: 8,
      variants: [{
        label: l("Shanghai", "上海", "상하이"),
        image: image(
          jiangnanSlug,
          "route-day-8.webp",
          l("The Huangpu River and Pudong skyline", "黄浦江与浦东天际线", "황푸강과 푸둥 스카이라인"),
          l("Keep the last three nights for Shanghai.", "最后 3 晚留在上海。", "마지막 3박은 상하이에서 보냅니다."),
        ),
      }],
    },
  ],
  packages: [privatePackage([usd(2, 2690), usd(4, 2290), usd(6, 2140)])],
  datePublished: PUBLISHED,
  dateModified: MODIFIED,
};

// ---------------------------------------------------------------------------
// 11. Shanghai, Zhangjiajie, Fenghuang & Guilin in 13 days, private
// ---------------------------------------------------------------------------

const southSlug = "shanghai-zhangjiajie-fenghuang-guilin-13-day-private-tour";

const southLandscapes: PrivateTourProduct = {
  id: "private-tour-shanghai-zhangjiajie-fenghuang-guilin-13d12n",
  slug: southSlug,
  days: 13,
  nights: 12,
  servicePolicy,
  includesDomesticFlights: true,
  title: l(
    "Shanghai, Zhangjiajie, Fenghuang & Guilin: 13-Day Private Tour",
    "上海·张家界·凤凰·桂林 13 天 12 晚私家团",
    "상하이·장가계·봉황·구이린 13일 프라이빗 투어",
  ),
  metadataTitle: l(
    "Zhangjiajie, Fenghuang & Guilin Private Tour: 13 Days",
    "张家界凤凰桂林13天私家团",
    "장가계·봉황·구이린 13일 프라이빗 투어",
  ),
  metadataDescription: l(
    "13-day private tour from Shanghai: Zhangjiajie, Fenghuang, Longji rice terraces, Li River. Per person USD 3,590 for 2 travellers, 2,890 for 6.",
    "13 天私家团，从上海进出：张家界、凤凰古城、龙脊梯田与漓江。每人价格：2 人同行 ¥23,330，6 人同行 ¥18,780。",
    "상하이를 오가는 13일 프라이빗 투어: 장가계, 봉황고성, 룽지 다랑논, 리강. 1인 요금 2명 ₩5,020,000, 6명 ₩4,040,000.",
  ),
  eyebrow: l(
    "From Shanghai to Zhangjiajie, Fenghuang and the Li River",
    "从上海进出，重点走张家界、凤凰和漓江",
    "상하이에서 출발해 장가계·봉황고성·리강으로",
  ),
  lede: l(
    "The starting price for the 13-day Shanghai–Zhangjiajie–Fenghuang–Guilin private route is USD 3,590 each for two sharing a twin room; international flights are extra. It trades the northern capitals for more time in the south, including Longji’s rice terraces. The Fenghuang-to-Guilin train alone takes about six hours.",
    "上海进出，走张家界、凤凰和桂林 13 天，2 人住一间每人 ¥23,330 起，国际机票另计。它把北京、西安换成了南方山水和龙脊梯田；凤凰到桂林的直达高铁就要约 6 小时。",
    "상하이 왕복 장가계·봉황고성·구이린 13일 프라이빗 일정의 시작가는 2명, 2인 1실에 1인 ₩5,020,000입니다. 국제선은 별도입니다. 북쪽 수도 대신 룽지 다랑논까지 남쪽 풍경에 시간을 씁니다. 봉황고성에서 구이린까지 직통 열차만 약 6시간 걸립니다.",
  ),
  summary: l(
    "Twelve hotel nights include breakfast. Local private guides and vehicles on touring days, transfers, named tickets including Tianmen Mountain and the Li River cruise, two second-class trains and two economy flights are included. Zhangjiajie has long walking days, so tell us early if steps are difficult.",
    "12 晚酒店都含早餐。游览日的当地私人导游和车、接送、天门山与漓江游船等所列门票、两段二等座高铁和两段经济舱航班都含。张家界要走不少台阶，走路不方便请早点告诉我们。",
    "호텔 12박에는 조식이 포함됩니다. 관광일의 도시별 전용 가이드와 차량, 이동, 천문산과 리강 유람선 등 명시된 입장권, 고속철도 2등석 2구간과 이코노미 항공 2구간이 포함됩니다. 장가계는 계단을 많이 걸으니 걷기 어려우면 일찍 알려 주세요.",
  ),
  highlights: lists(
    [
      "Zhangjiajie Forest Park and Tianmen Mountain",
      "Two nights in the river town of Fenghuang",
      "The Longji rice terraces",
      "Li River cruise and two Yangshuo nights",
    ],
    [
      "张家界森林公园与天门山",
      "在凤凰古城住两晚",
      "龙脊梯田",
      "漓江游船与阳朔 2 晚",
    ],
    [
      "장가계 삼림공원과 천문산",
      "강변 마을 봉황고성 2박",
      "룽지 다랑논",
      "리강 유람선과 양숴 2박",
    ],
  ),
  itinerary: [
    day(
      1,
      l("Arrive in Shanghai", "抵达上海", "상하이 도착"),
      l(
        "Your driver meets you at the confirmed Shanghai airport or station and takes you to the hotel. We keep the arrival day clear; after dark the Bund is there if you want a first walk.",
        "司机在已确认的上海机场或车站接你，送到酒店。抵达日不排景点；晚上想先走走，可以去亮灯的外滩。",
        "확정된 상하이 공항이나 역에서 기사가 호텔로 모십니다. 도착일에는 관광을 넣지 않습니다. 저녁에 걷고 싶다면 불 켜진 와이탄을 볼 수 있습니다.",
      ),
    ),
    bundAndYuGarden(2),
    day(
      3,
      l("Fly to Zhangjiajie", "飞往张家界", "장가계로 이동"),
      l(
        "Shanghai to Zhangjiajie is about 2.5 hours on the booked economy flight. Your driver takes you from the airport to a hotel near the Wulingyuan gates. There is no fixed sightseeing that day.",
        "上海飞张家界的经济舱航班约 2.5 小时。司机接机后送到武陵源景区门口附近的酒店，这天不排景点。",
        "상하이에서 장가계까지 예약된 이코노미 항공편으로 약 2.5시간입니다. 기사가 공항에서 무릉원 입구 근처 호텔로 모십니다. 이날은 정해진 관광이 없습니다.",
      ),
    ),
    forestPark(4),
    tianmenMountain(5),
    day(
      6,
      l("High-speed train to Fenghuang", "高铁前往凤凰古城", "고속철도로 봉황고성"),
      l(
        "The booked train from Zhangjiajie West to Fenghuang Ancient City takes about an hour. With the guide, walk the public old-town lanes and Tuojiang riverbank; those streets have no gate ticket. Boat rides cost extra. Stay in Fenghuang.",
        "张家界西站到凤凰古城站坐已订高铁约 1 小时。导游带你走古城公共街巷和沱江边，这些公共街区不用大门票；想坐船要另外付费。住凤凰。",
        "장가계서역에서 봉황고성역까지 예약된 열차로 약 한 시간 갑니다. 가이드와 고성의 공공 골목과 퉈장 강변을 걷습니다. 이 구역은 입장권이 없고 배는 별도 요금입니다. 봉황고성에서 숙박합니다.",
      ),
    ),
    day(
      7,
      l("Fenghuang and its countryside", "凤凰与周边", "봉황과 주변"),
      l(
        "Walk Fenghuang early, before the day visitors arrive. Then drive to one nearby site confirmed for your date, such as the Southern Great Wall or a Miao village. Return for the lights along the Tuojiang and a second night in Fenghuang.",
        "趁一日游客还没到，早上先走凤凰古城。之后乘车去一处确认好的附近景点，比如南方长城或苗寨；晚上回沱江边看亮灯，再住凤凰。",
        "당일 방문객이 오기 전 아침에 봉황고성을 걷습니다. 이후 날짜에 맞춰 확정한 근처 한 곳, 남방장성이나 먀오족 마을 등에 차로 갑니다. 저녁 퉈장 강변의 불빛을 보고 봉황고성에서 한 밤 더 묵습니다.",
      ),
    ),
    day(
      8,
      l("High-speed train to Guilin", "高铁前往桂林", "고속철도로 구이린"),
      l(
        "Fenghuang Ancient City to Guilin is about six hours on the booked direct train. That leaves little time for sightseeing. A Guilin driver meets you at the station and takes you to the hotel for the night.",
        "凤凰古城站到桂林的直达高铁约 6 小时，当天不再赶景点。桂林司机接站送酒店，晚上住桂林。",
        "봉황고성역에서 구이린까지 예약된 직통 열차로 약 6시간 걸려 관광 시간은 거의 없습니다. 구이린 기사가 역에서 호텔로 모시고 그곳에서 숙박합니다.",
      ),
    ),
    day(
      9,
      l("Longji rice terraces", "龙脊梯田", "룽지 다랑논"),
      l(
        "Longji is about two hours from Guilin by road. Walk between rice-terrace viewpoints above a Zhuang or Yao village; in spring the fields hold water, in summer they are green, and before autumn harvest they turn gold. Return to Guilin to sleep.",
        "桂林开车到龙脊约 2 小时，在壮寨或瑶寨上方的梯田观景点之间走。春天看灌水，夏天看绿色稻田，秋收前看金黄；晚上回桂林。",
        "구이린에서 룽지까지 차로 약 2시간입니다. 좡족 또는 야오족 마을 위의 계단식 논 전망대 사이를 걷습니다. 봄에는 물이 차고 여름에는 초록색, 가을 수확 전에는 금빛입니다. 밤에는 구이린으로 돌아옵니다.",
      ),
    ),
    liRiver(10),
    yulongCountryside(11),
    flyToShanghai(12),
    departShanghai(13, "private"),
  ],
  hotelNote: l(
    "The 12 breakfast-included nights use twin rooms: Shanghai 2, Wulingyuan 2, Zhangjiajie city 1, Fenghuang 2, Guilin 2, Yangshuo 2 and a final Shanghai night. Where available, hotels meet the four-star standard (4 diamonds on Trip.com/Ctrip). In Fenghuang we confirm the best-rated riverside hotel before payment.",
    "12 晚都含早、默认两人一间：上海先住 2 晚、武陵源 2 晚、张家界市区 1 晚、凤凰 2 晚、桂林 2 晚、阳朔 2 晚，最后回上海住 1 晚。有携程 4 钻标准酒店的地方按 4 钻选；凤凰用当地评分最好的江边酒店，付款前确认。",
    "조식 포함 호텔에서 2인 1실로 12박합니다. 상하이 2박, 무릉원 2박, 장가계 시내 1박, 봉황고성 2박, 구이린 2박, 양숴 2박, 마지막 상하이 1박입니다. 가능한 곳은 씨트립 4다이아 등급 호텔을 쓰고 봉황고성에서는 현지 평점이 가장 좋은 강변 호텔을 결제 전에 확인합니다.",
  ),
  serviceNote: l(
    "On touring days your party has its own English-speaking local guide and vehicle. Transfers and named first entries cover Zhangjiajie National Forest Park, the Bailong Elevator, Tianmen Mountain cable car and Longji. The price also includes the Li River boat with luggage carried separately by road and one Yulong River raft. High-speed trains run Zhangjiajie–Fenghuang and Fenghuang–Guilin; economy flights run Shanghai–Zhangjiajie and Guilin–Shanghai. Guides change by city, with drivers for the station and airport handovers. Korean-speaking guides cost the same where available.",
    "游览日各地导游和车只带你们。全部接送、所列首道门票都含，包括张家界国家森林公园、百龙天梯、天门山索道和龙脊。漓江船及行李另车转运、一次遇龙河竹筏也含。张家界—凤凰、凤凰—桂林坐高铁，上海—张家界、桂林—上海坐经济舱航班。导游每城更换，转场由两地司机接送；语种按订单确认。",
    "관광일에는 도시별 한국어 현지 가이드와 전용 차량을 일행만 이용합니다. 모든 이동과 장가계 국가삼림공원, 백룡엘리베이터, 천문산 케이블카, 룽지 등 기본 입장권이 포함됩니다. 리강 배와 짐 별도 이동, 위룽허 뗏목 1회도 들어 있습니다. 장가계–봉황과 봉황–구이린은 고속철도, 상하이–장가계와 구이린–상하이는 이코노미 항공편입니다. 가이드는 도시별로 바뀌고 이동일에는 양쪽 기사가 역과 공항을 맡습니다. 한국어 가이드는 추가 요금 없이 도시별 가능 여부를 확인합니다.",
  ),
  exclusions: exclusions(
    ["Single-room supplement", "Tuojiang boat rides and paid smaller sights in Fenghuang", "Checked baggage above the airline's included allowance"],
    ["单房差", "凤凰沱江游船及收费小景点", "超出航司免费额度的托运行李"],
    ["1인실 추가금", "봉황 퉈장 유람선과 유료 소규모 명소", "항공사 무료 허용량을 넘는 위탁 수하물"],
  ),
  bookingNote: l(
    "The shown starting price is per person for the stated party size, with twin rooms. Tianmen Mountain and Zhangjiajie National Forest Park tickets specify routes and time slots, so we set those day orders after tickets are issued. Train seats, flights, hotels and the final total are confirmed in writing before payment.",
    "页面起价按对应人数、两人一间算每人。天门山和张家界国家森林公园门票带线路、时段，几天先后要按出票结果排。火车座位、航班、酒店和最终总价都会在付款前书面确认。",
    "표시 시작가는 해당 인원이 2인 1실을 쓸 때의 1인 금액입니다. 천문산과 장가계 국가삼림공원 입장권에는 동선과 시간대가 지정됩니다. 그날의 순서는 발권 뒤 정합니다. 열차 좌석, 항공편, 호텔과 최종 금액은 결제 전에 서면으로 확인합니다.",
  ),
  faq: [
    faq(
      l("How much does this 13-day tour cost?", "这条 13 天线路多少钱？", "이 13일 일정은 얼마인가요?"),
      l(
        "For the 13-day Shanghai–Zhangjiajie–Fenghuang–Guilin private route, two sharing a twin room pay USD 3,590 each, or USD 7,180 together. Four pay USD 3,040 each and six USD 2,890. The price includes 12 breakfast hotel nights, local private guides and vehicles on touring days, named tickets including Tianmen Mountain and Longji, the Li River cruise, two high-speed trains and two domestic flights. International flights and lunches and dinners cost extra; other party sizes are quoted in writing.",
        "上海进出、走张家界、凤凰和桂林的 13 天私家团，2 人住一间每人 ¥23,330，两人共 ¥46,660；4 人每人 ¥19,760，6 人每人 ¥18,780。价格含 12 晚早餐酒店、各地游览日的私人导游和车、天门山与龙脊等门票、漓江游船、两段高铁及两段国内航班。国际机票、午晚餐另付；其他人数书面报价。",
        "상하이 왕복 장가계·봉황고성·구이린 13일 프라이빗 투어는 2명, 2인 1실에 1인 ₩5,020,000, 두 명 합계 ₩10,040,000입니다. 4명은 1인 ₩4,250,000, 6명은 ₩4,040,000입니다. 조식 포함 호텔 12박, 관광일의 도시별 전용 가이드와 차량, 천문산과 룽지 등 입장권, 리강 유람선, 고속철도 2구간과 국내선 2구간이 포함됩니다. 국제선과 중식·석식은 별도이며 다른 인원은 서면 견적을 드립니다.",
      ),
    ),
    faq(
      l("Is this a good second trip to China?", "适合第二次来中国吗？", "두 번째 중국 여행으로 괜찮나요?"),
      l(
        "The 13-day Shanghai–Zhangjiajie–Fenghuang–Guilin route is a useful second China trip if you have already seen Beijing and Xi’an. It starts and ends in Shanghai, spending the middle days on mountains, Fenghuang and the Li River. For a first trip with Zhangjiajie and Guilin, the 14-day route adds Beijing and Xi’an from USD 3,890 per person for two sharing a twin room.",
        "如果北京和西安已经去过，上海进出、走张家界、凤凰和桂林的 13 天线很适合第二次来。中间的时间留给山、凤凰古城和漓江。第一次来又想去张家界、桂林，可选加了北京和西安的 14 天线，2 人住一间每人 ¥25,280 起。",
        "베이징과 시안에 이미 가 봤다면 상하이 왕복 장가계·봉황고성·구이린 13일 일정이 두 번째 중국 여행에 맞습니다. 북쪽 도시를 다시 가지 않고 산, 봉황고성과 리강에 시간을 씁니다. 첫 여행에 장가계와 구이린을 함께 보려면 베이징과 시안이 들어간 14일 일정이 2명, 2인 1실에 1인 ₩5,440,000부터입니다.",
      ),
    ),
    faq(
      l("When are the rice terraces at their best?", "龙脊梯田什么时候最好看？", "룽지 다랑논은 언제가 가장 좋나요?"),
      l(
        "Longji rice terraces on the 13-day Shanghai–Zhangjiajie–Fenghuang–Guilin route look different each season. Water reflects the sky from late April through May, the fields are green in June–August, and rice turns gold from late September to mid-October. Winter is quiet and brown.",
        "上海进出、走张家界、凤凰和桂林的 13 天线，龙脊梯田要看你想看哪种颜色。4 月下旬到 5 月田里灌水，6–8 月一片青绿，9 月下旬到 10 月中旬稻子金黄；冬天人少，田里偏黄。",
        "상하이 왕복 장가계·봉황고성·구이린 13일 일정의 룽지 다랑논은 계절마다 다릅니다. 4월 말~5월에는 물이 차고 6~8월은 초록색, 9월 말~10월 중순에는 벼가 금빛입니다. 겨울에는 한산하고 갈색 논이 보입니다.",
      ),
    ),
    faq(
      l("How much walking and travel time is there?", "要走很多路、坐很久车吗？", "걷는 시간과 이동 시간은 얼마나 되나요?"),
      l(
        "The 13-day Shanghai–Zhangjiajie–Fenghuang–Guilin route has two Zhangjiajie days with several hours of paths and stairs. The Bailong Elevator and cable cars remove the steepest climbs, while Longji has village paths between viewpoints. The longest transfer is the Fenghuang–Guilin train, about six hours. Tell us before booking if you need shorter walks; there are no shopping stops.",
        "上海进出、走张家界、凤凰和桂林的 13 天线，张家界有两天要走几个小时步道和台阶，最陡处有百龙天梯和索道；龙脊则要走村寨小路。最长转场是凤凰到桂林约 6 小时高铁。走路不方便请订前告诉我们，可选短些的观景路线。全程不进购物店。",
        "상하이 왕복 장가계·봉황고성·구이린 13일 일정에는 장가계에서 길과 계단을 몇 시간 걷는 날이 이틀 있습니다. 가장 가파른 부분은 백룡엘리베이터와 케이블카를 타고, 룽지는 마을길로 전망대 사이를 걷습니다. 가장 긴 이동은 봉황고성–구이린 열차 약 6시간입니다. 짧은 걷기가 필요하면 예약 전에 알려 주세요. 쇼핑 일정은 없습니다.",
      ),
    ),
  ],
  heroImage: image(
    southSlug,
    "hero.webp",
    l("Stilt houses and a pagoda reflected in the Tuojiang at Fenghuang", "凤凰古城沱江边的吊脚楼与塔", "봉황고성 퉈장에 비친 수상 가옥과 탑"),
    l("Two Fenghuang nights let you see the old town early and after dark.", "凤凰住 2 晚，早上和入夜后都能逛古城。", "봉황고성에서 2박해 아침과 밤의 고성을 봅니다."),
  ),
  gallery: [
    image(
      southSlug,
      "gallery-1.webp",
      l("Golden rice terraces and a village at Longji", "龙脊金色梯田与村寨", "룽지의 금빛 다랑논과 마을"),
      l("Day 9 takes you from Guilin to Longji and back.", "第 9 天从桂林去龙脊，当天回桂林。", "9일 차에 구이린에서 룽지에 다녀옵니다."),
    ),
  ],
  routeMedia: [
    {
      day: 2,
      variants: [{
        label: l("Shanghai", "上海", "상하이"),
        image: image(
          southSlug,
          "route-day-2.webp",
          l("The Huangpu River and Pudong skyline", "黄浦江与浦东天际线", "황푸강과 푸둥 스카이라인"),
          l("Shanghai is both the arrival and departure city.", "这条线从上海进，也从上海走。", "상하이에서 시작해 상하이에서 마칩니다."),
        ),
      }],
    },
    {
      day: 4,
      variants: [{
        label: l("Zhangjiajie", "张家界", "장가계"),
        image: image(
          southSlug,
          "route-day-4.webp",
          l("A sea of clouds among Zhangjiajie's peaks", "张家界峰林间的云海", "장가계 봉우리 사이의 운해"),
          l("We set aside one whole day inside Zhangjiajie National Forest Park.", "张家界国家森林公园，单独留一整天。", "장가계 국가삼림공원에 하루를 따로 씁니다."),
        ),
      }],
    },
  ],
  packages: [privatePackage([usd(2, 3590), usd(4, 3040), usd(6, 2890)])],
  datePublished: PUBLISHED,
  dateModified: MODIFIED,
};

// ---------------------------------------------------------------------------
// Small-group departures for the landscapes, Yangtze and Silk Road routes.
// They share the rules of the classic small group: runs at 8, closes at 12,
// full refund or a private departure if the group has not formed 45 days out.
// ---------------------------------------------------------------------------

const money = (usdAmount: number) => ({
  usd: `USD ${usdAmount.toLocaleString("en-US")}`,
  cny: `¥${(Math.ceil((usdAmount * 6.5) / 10) * 10).toLocaleString("en-US")}`,
  cnyFloor: `¥${(Math.floor((usdAmount * 6.5) / 10) * 10).toLocaleString("en-US")}`,
  krw: `₩${(Math.ceil((Math.floor((usdAmount * 6.5) / 10) * 10 * 215) / 10000) * 10000).toLocaleString("en-US")}`,
});

interface SmallGroupSpec {
  readonly slug: string;
  readonly id: string;
  readonly days: number;
  readonly nights: number;
  readonly title: LocalizedText;
  readonly metadataTitle: LocalizedText;
  readonly metadataDescription: LocalizedText;
  readonly lede: LocalizedText;
  readonly routeHighlight: LocalizedText;
  readonly itinerary: readonly PrivateTourDay[];
  /** Nights by stop and hotel standard, without the rooming sentence. */
  readonly hotelScope: LocalizedText;
  /** What the group price includes, as one clause list ending in a full stop. */
  readonly inclusions: LocalizedText;
  /** Full 2027 date ranges, e.g. "17–30 April and 16–29 October". */
  readonly departures: LocalizedText;
  /** Start dates only, for the first highlight. */
  readonly departureHighlight: LocalizedText;
  readonly priceUsd: number;
  /** Private-tour prices for two and six travellers on the same route. */
  readonly privateUsd: readonly [number, number];
  readonly supplementUsd: number;
  /** Which choices the private version leaves open but the group fixes. */
  readonly fixedPlan: LocalizedText;
  readonly bookingCaveat?: LocalizedText;
  readonly extraExclusions?: readonly [readonly string[], readonly string[], readonly string[]];
  /** Cruise routes list land meals separately from onboard meals. */
  readonly cruise?: true;
  readonly heroImage: PrivateTourImage;
  readonly gallery: readonly PrivateTourImage[];
  readonly routeMedia: PrivateTourProduct["routeMedia"];
}

const smallGroup = (spec: SmallGroupSpec): PrivateTourProduct => {
  const price = money(spec.priceUsd);
  const supplement = money(spec.supplementUsd);
  const privateTwo = money(spec.privateUsd[0]);
  const privateSix = money(spec.privateUsd[1]);
  const caveat = spec.bookingCaveat;
  const extra = spec.extraExclusions ?? [[], [], []];
  return {
    id: spec.id,
    slug: spec.slug,
    days: spec.days,
    nights: spec.nights,
    servicePolicy,
    tourFormat: "small-group",
    includesDomesticFlights: true,
    title: spec.title,
    metadataTitle: spec.metadataTitle,
    metadataDescription: spec.metadataDescription,
    eyebrow: l(
      "Two 2027 departures, 8 guests to run and 12 at most",
      "2027 年两个团期，满 8 人走，最多 12 人",
      "2027년 두 차례 출발, 8명부터 최대 12명",
    ),
    lede: spec.lede,
    summary: l(
      `2027 departures, each ${spec.days} days: ${spec.departures.en}. A twin-share place is ${price.usd}. We confirm the group at 8 guests and close it at 12. If fewer than 8 have booked 45 days before departure, we quote a private tour for your actual party size in writing. You can accept it for the same dates or take a full refund of everything paid to us.`,
      `2027 年出发（每团 ${spec.days} 天）：${spec.departures.zh}。两人一间，每人 ${price.cnyFloor}。满 8 人确认出发，12 人收满。出发前 45 天仍不足 8 人，我们会按实际同行人数书面报私家团价。你可接受报价按原日期走，或拿回已付给我们的全款。`,
      `2027년 출발(각 ${spec.days}일): ${spec.departures.ko}. 2인 1실에 1인 ${price.krw}입니다. 8명이 예약하면 출발을 확정하고 12명에서 마감합니다. 출발 45일 전에도 8명이 안 되면 실제 동행 인원에 맞춘 프라이빗 요금을 서면으로 드립니다. 그 요금으로 같은 날짜에 출발하거나 저희에게 낸 금액을 전액 환불받을 수 있습니다.`,
    ),
    highlights: lists(
      [spec.departureHighlight.en, "Runs at 8 guests, never more than 12", "Full refund if the group does not run", spec.routeHighlight.en],
      [spec.departureHighlight.zh, "满 8 人成团，最多 12 人", "不成团全额退款", spec.routeHighlight.zh],
      [spec.departureHighlight.ko, "8명부터 출발, 최대 12명", "인원 미달 시 전액 환불", spec.routeHighlight.ko],
    ),
    itinerary: spec.itinerary,
    hotelNote: l(
      `${spec.cruise ? `A room and a cabin to yourself have a single supplement from ${supplement.usd}, covering every hotel night and the three cruise nights` : `A room to yourself has a single supplement from ${supplement.usd}`}; the ${price.usd} per-person group fare assumes twin sharing. ${spec.hotelScope.en} We put the hotel names on your booking confirmation.`,
      `${spec.cruise ? `想独住酒店和船舱，单房差 ${supplement.cny} 起，含全部酒店晚数和三晚船舱` : `想独住，单房差 ${supplement.cny} 起`}；小团每人 ${price.cnyFloor} 按两人一间算。${spec.hotelScope.zh}酒店名称会写在确认单上。`,
      `${spec.cruise ? `호텔 객실과 선실을 혼자 쓰면 추가금이 ${supplement.krw}부터이며 모든 호텔 숙박과 크루즈 3박이 포함됩니다.` : `혼자 객실을 쓰면 1인실 추가금이 ${supplement.krw}부터입니다.`} 소규모 그룹 요금 ${price.krw}은 2인 1실 기준입니다. ${spec.hotelScope.ko} 호텔 이름은 예약 확인서에 적어 드립니다.`,
    ),
    serviceNote: l(
      `${spec.inclusions.en}`,
      `${spec.inclusions.zh}`,
      `${spec.inclusions.ko}`,
    ),
    exclusions: exclusions(
      [spec.cruise ? `Single supplement for your own room and cabin, from ${supplement.usd}` : `Single supplement, from ${supplement.usd}`, "Transfers on dates other than the group's arrival and departure days", "Checked baggage above the airline's included allowance", ...extra[0]],
      [spec.cruise ? `单房差（含单人住舱），${supplement.cny} 起` : `单房差，${supplement.cny} 起`, "团期以外日期的接送", "超出航司免费额度的托运行李", ...extra[1]],
      [spec.cruise ? `1인실·1인 선실 추가금(${supplement.krw}부터)` : `1인실 추가금(${supplement.krw}부터)`, "그룹 도착일·출발일 외 날짜의 이동", "항공사 무료 허용량을 넘는 위탁 수하물", ...extra[2]],
      { cruise: spec.cruise === true },
    ),
    bookingNote: l(
      `The ${price.usd} starting price buys one place on a fixed departure, sharing a twin room. We need 8 booked guests to run and stop at 12. At 45 days out, if fewer than 8 have booked, we quote a private tour for your actual party size in writing. You can accept it for the same dates or take a full refund of everything paid to us. A party of 8–12 may choose its own date at the small-group price; ask us for a separate quote for 13 or more.${caveat ? ` ${caveat.en}` : ""} We confirm hotels, flights and the total in writing before payment.`,
      `每人 ${price.cnyFloor} 是固定团期一个名额、两人一间的起价。满 8 人走，最多 12 人。出发前 45 天还不到 8 人，我们会按实际同行人数书面报私家团价。你可接受报价按原日期走，或拿回已付给我们的全款。8–12 人同行可自选日期按小团价单独成团；13 人及以上请另询价。${caveat ? caveat.zh : ""}酒店、航班和最终总价在付款前书面确认。`,
      `1인 ${price.krw}은 정기 출발 1자리, 2인 1실 기준 시작가입니다. 8명이 예약하면 출발하고 12명에서 마감합니다. 출발 45일 전에도 8명이 안 되면 실제 동행 인원에 맞춘 프라이빗 요금을 서면으로 드립니다. 그 요금으로 같은 날짜에 출발하거나 저희에게 낸 금액을 전액 환불받을 수 있습니다. 8~12명 일행은 원하는 날짜에 소규모 그룹 요금으로 단독 출발할 수 있고, 13명 이상은 별도 견적이 필요합니다.${caveat ? ` ${caveat.ko}` : ""} 호텔, 항공편과 최종 금액은 결제 전에 서면으로 확인합니다.`,
    ),
    faq: [
      faq(
        l("What happens if the group does not reach 8 guests?", "不到 8 人怎么办？", "8명이 모이지 않으면 어떻게 되나요?"),
        l(
          `For ${spec.title.en}, we check numbers 45 days before departure. If fewer than 8 guests have booked, we quote a private tour for your actual party size in writing. You can accept it for the same dates or take a full refund of everything paid to us. The private price for two is ${privateTwo.usd} each, against ${price.usd} for a small-group place. Until the group is confirmed, book international flights you can change or refund.`,
          `${spec.title.zh}在出发前 45 天确认人数。若不足 8 人，我们会按实际同行人数书面报私家团价。你可接受报价按原日期走，或拿回已付给我们的全款。2 人私家团每人 ${privateTwo.cnyFloor}，小团每人 ${price.cnyFloor}；成团前建议订能改退的国际机票。`,
          `${spec.title.ko}는 출발 45일 전에 인원을 확인합니다. 8명 미만이면 실제 동행 인원에 맞춘 프라이빗 요금을 서면으로 드립니다. 그 요금으로 같은 날짜에 출발하거나 저희에게 낸 금액을 전액 환불받을 수 있습니다. 프라이빗은 2명 기준 1인 ${privateTwo.krw}, 소규모 그룹은 ${price.krw}입니다. 출발 확정 전에는 변경·환불 가능한 국제선 항공권을 권합니다.`,
        ),
      ),
      faq(
        l("Can I join on my own?", "一个人可以报名吗？", "혼자 참가할 수 있나요?"),
        l(
          `Solo travellers can join ${spec.title.en}. The ${price.usd} fare assumes two sharing; ${spec.cruise ? `your own room and cabin cost a single supplement from ${supplement.usd}. We do not assign strangers to share a room or cabin.` : `your own room costs a single supplement from ${supplement.usd}. We do not assign strangers to share.`}`,
          `${spec.title.zh}一个人也能报名。每人 ${price.cnyFloor} 是两人一间的价格；${spec.cruise ? `想独住酒店和船舱，单房差 ${supplement.cny} 起。我们不会安排陌生人拼房或拼舱。` : `想独住，单房差 ${supplement.cny} 起。我们不会安排陌生人拼房。`}`,
          `${spec.title.ko}에는 혼자도 참가할 수 있습니다. 1인 ${price.krw}은 2인 1실 기준이며 ${spec.cruise ? `혼자 객실과 선실을 쓰면 추가금이 ${supplement.krw}부터입니다. 모르는 사람과 객실이나 선실을 함께 쓰도록 배정하지 않습니다.` : `혼자 객실을 쓰면 추가금이 ${supplement.krw}부터입니다. 모르는 사람과 합실시키지 않습니다.`}`,
        ),
      ),
      faq(
        l("We are a group of 8 or more. Can we have our own departure?", "我们有 8 人以上，可以单独成团吗？", "8명 이상인데 단독 출발이 가능한가요?"),
        l(
          `Eight to twelve travelling together can book ${spec.title.en} on their own dates at ${price.usd} per person. For 13 or more, ask us for a separate quote. We check hotel rooms and tickets for those dates before booking.`,
          `8–12 人同行，可自选日期单独走${spec.title.zh}，每人按小团价 ${price.cnyFloor} 计算。13 人及以上请另询价。酒店房间和门票要先按你的日期确认。`,
          `8~12명 일행이면 ${spec.title.ko}를 원하는 날짜에 단독으로 갈 수 있습니다. 요금은 1인 ${price.krw}이며 13명 이상은 별도 견적이 필요합니다. 해당 날짜의 호텔과 입장권을 확인합니다.`,
        ),
      ),
      faq(
        l("How is this different from the private version?", "和私家团有什么不同？", "프라이빗 투어와 무엇이 다른가요?"),
        l(
          `${spec.title.en} costs ${price.usd} per person on fixed 2027 dates for 8–12 guests; ${spec.fixedPlan.en}. Hotels, route and inclusions match the private version. The private tour lets your party choose dates and use its own guide and vehicle, from ${privateTwo.usd} each for two or ${privateSix.usd} for six.`,
          `${spec.title.zh}在 2027 年固定团期出发，8–12 人同行，每人 ${price.cnyFloor}，${spec.fixedPlan.zh}。酒店、路线和包含内容与私家团相同。私家团可自选日期，导游和车只服务你们，2 人每人 ${privateTwo.cnyFloor} 起，6 人每人 ${privateSix.cnyFloor}。`,
          `${spec.title.ko}는 2027년 정해진 날짜에 8~12명이 함께 가며 1인 ${price.krw}입니다. ${spec.fixedPlan.ko} 호텔, 경로와 포함 내역은 프라이빗과 같습니다. 프라이빗은 날짜를 고르고 가이드와 차량을 일행만 쓰며 2명 기준 1인 ${privateTwo.krw}, 6명 기준 ${privateSix.krw}부터입니다.`,
        ),
      ),
      faq(
        l("Is there a tour leader for the whole trip?", "有全程领队吗？", "전 일정 동행하는 인솔자가 있나요?"),
        l(
          `${spec.title.en} has no single leader travelling the whole route. English-speaking local guides handle touring days city by city, while drivers handle the station and airport handovers. There are no shopping stops.`,
          `${spec.title.zh}没有全程领队。各地游览由英语当地导游带团，火车和航班转场由两地司机接送。全程不进购物店。`,
          `${spec.title.ko}에는 전 구간 동행 인솔자가 없습니다. 도시별 영어 현지 가이드가 관광을 맡고 역과 공항에서는 출발지와 도착지 기사가 인계합니다. 쇼핑 일정은 없습니다.`,
        ),
      ),
    ],
    heroImage: spec.heroImage,
    gallery: spec.gallery,
    routeMedia: spec.routeMedia,
    packages: [{
      id: "small-group-departure",
      guideMode: "standard" as const,
      label: l("8–12 guests, fixed dates", "8–12 人，固定出发", "8~12명, 정기 출발"),
      summary: l(
        `2027 dates: ${spec.departures.en}. Eight guests confirm the group, with a limit of 12. If it does not run, we refund everything paid to us. No shopping stops are scheduled.`,
        `2027 年团期：${spec.departures.zh}。满 8 人确认出发，最多 12 人；未成团就退还已付给我们的全款。全程无购物店安排。`,
        `2027년 출발일: ${spec.departures.ko}. 8명이 예약하면 출발을 확정하고 12명에서 마감합니다. 출발하지 못하면 저희에게 낸 금액을 전액 환불하며 쇼핑 일정은 없습니다.`,
      ),
      prices: [usd(2, spec.priceUsd)],
    }],
    datePublished: PUBLISHED,
    dateModified: MODIFIED,
  };
};

const landscapesGroupSlug = "beijing-xian-zhangjiajie-guilin-shanghai-14-day-small-group-tour";

const landscapesSmallGroup = smallGroup({
  slug: landscapesGroupSlug,
  id: "small-group-tour-beijing-xian-zhangjiajie-guilin-shanghai-14d13n",
  days: 14,
  nights: 13,
  title: l(
    "Beijing, Xi'an, Zhangjiajie, Guilin & Shanghai: 14-Day Small-Group Tour",
    "北京·西安·张家界·桂林·上海 14 天 13 晚小团",
    "베이징·시안·장가계·구이린·상하이 14일 소규모 그룹 투어",
  ),
  metadataTitle: l(
    "Zhangjiajie Small-Group Tour 2027: 14 Days in China",
    "张家界桂林14天小团：最多12人",
    "장가계 포함 중국 14일 소규모 그룹 투어",
  ),
  metadataDescription: l(
    "2027 small-group tour, 14 days, 8–12 guests: Beijing, Xi'an, Zhangjiajie, Li River, Shanghai. USD 2,790 per person twin share; departs 17 Apr and 16 Oct.",
    "2027 年 14 天小团，8–12 人：北京、西安、张家界、漓江与上海。每人 ¥18,130（两人一间），4 月 17 日、10 月 16 日出发，不成团全额退款。",
    "2027년 14일 소규모 그룹(8~12명): 베이징, 시안, 장가계, 리강, 상하이. 1인 ₩3,900,000(2인 1실), 4월 17일·10월 16일 출발, 인원 미달 시 전액 환불.",
  ),
  lede: l(
    "At USD 2,790 each in twin rooms, the 2027 Beijing–Xi’an–Zhangjiajie–Guilin–Shanghai 14-day small group excludes international flights. It leaves on 17 April or 16 October with 8–12 guests. The direct Zhangjiajie–Guilin train takes about seven hours, so one day is mostly travel.",
    "2027 年北京、西安、张家界、桂林到上海的 14 天小团，按两人一间每人 ¥18,130，国际机票另付。4 月 17 日或 10 月 16 日出发，每团 8–12 人；张家界到桂林的直达高铁约 7 小时，那天主要在赶路。",
    "2027년 베이징·시안·장가계·구이린·상하이 14일 소규모 그룹은 2인 1실에 1인 ₩3,900,000입니다. 국제선은 별도입니다. 4월 17일 또는 10월 16일에 8~12명이 출발합니다. 장가계에서 구이린까지 직통 열차가 약 7시간이라 하루 대부분을 이동에 씁니다.",
  ),
  routeHighlight: l("Zhangjiajie, Tianmen Mountain and the Li River", "张家界、天门山与漓江", "장가계, 천문산과 리강"),
  itinerary: [
    arriveBeijing(1, "group"),
    forbiddenCity(2),
    greatWall(3, "hutong"),
    trainToXian(4),
    terracottaAndWall(5),
    flyXianToZhangjiajie(6),
    forestPark(7),
    tianmenMountain(8),
    flyToGuilin(9, "Zhangjiajie"),
    liRiver(10),
    yulongCountryside(11),
    flyToShanghai(12),
    shanghaiDay(13, "group"),
    departShanghai(14, "group"),
  ],
  hotelScope: l(
    "Breakfast comes with all 13 hotel nights. Beijing gets 3; Xi'an, Wulingyuan, Yangshuo and Shanghai get 2 each; Zhangjiajie city and Guilin get 1 each. Hotels follow the four-star standard, rated 4 diamonds on Trip.com (Ctrip).",
    "13 晚酒店都含早餐，按携程 4 钻标准安排。北京住 3 晚；西安、武陵源、阳朔和上海各 2 晚；张家界市区与桂林各 1 晚。",
    "호텔 13박에는 모두 조식이 포함됩니다. 베이징 3박, 시안·무릉원·양숴·상하이 각 2박, 장가계 시내와 구이린 각 1박입니다. 숙소는 씨트립 4다이아 등급의 4성급 기준으로 잡습니다.",
  ),
  inclusions: l(
    "Between cities, the fare covers the second-class train Beijing–Xi'an, the direct Zhangjiajie–Guilin train, and economy flights Xi'an–Zhangjiajie and Guilin–Shanghai. The named admissions include the Forest Park, Bailong Elevator and Tianmen Mountain cable car; the Li River cruise and one Yulong River bamboo raft are included too. On the group dates there is one Beijing arrival transfer and one Shanghai departure transfer. Touring in each city is with an English-speaking local guide and a group vehicle.",
    "跨城交通已含北京—西安二等座高铁、张家界—桂林直达高铁，以及西安—张家界、桂林—上海两段经济舱航班。所列门票中有森林公园、百龙天梯和天门山索道，漓江游船与一次遇龙河竹筏也含在内。按团期安排北京接机一次、上海送机一次；各地游览日由当地英语导游和团车带大家走。",
    "도시 간 이동에는 베이징–시안 고속철도 2등석과 장가계–구이린 직통 열차, 시안–장가계·구이린–상하이 이코노미 항공편이 포함됩니다. 명시된 입장권에는 삼림공원, 백룡엘리베이터와 천문산 케이블카가 있고 리강 유람선과 위룽허 대나무 뗏목 1회도 포함됩니다. 그룹 날짜에 베이징 도착 픽업 1회와 상하이 출발 샌딩 1회를 제공합니다. 각 도시 관광일에는 영어 현지 가이드와 그룹 차량이 함께합니다.",
  ),
  departures: l("17–30 April and 16–29 October", "4 月 17–30 日、10 月 16–29 日", "4월 17~30일, 10월 16~29일"),
  departureHighlight: l("Departs 17 April and 16 October 2027", "2027 年 4 月 17 日、10 月 16 日出发", "2027년 4월 17일, 10월 16일 출발"),
  priceUsd: 2790,
  privateUsd: [3890, 3090],
  supplementUsd: 690,
  fixedPlan: l("the Day 13 Shanghai plan is set", "第 13 天的上海安排是固定的", "13일 차 상하이 일정이 고정됩니다"),
  bookingCaveat: l(
    "The April group ends on 30 April, the eve of the May Day holiday, so book your flight home early.",
    "4 月团 4 月 30 日结束，正是五一假期前一天，回程机票请尽早订。",
    "4월 그룹은 노동절 연휴 전날인 4월 30일에 끝나므로 귀국 항공권은 일찍 예약하세요.",
  ),
  extraExclusions: [["Grand Canyon Glass Bridge and other Zhangjiajie add-ons unless listed"], ["未列明的大峡谷玻璃桥等张家界加项"], ["명시되지 않은 대협곡 유리다리 등 장가계 추가 일정"]],
  heroImage: image(
    landscapesGroupSlug,
    "hero.webp",
    l("Mist among sandstone pillars in Zhangjiajie National Forest Park", "张家界国家森林公园砂岩峰林间的云雾", "장가계 국가삼림공원 사암 봉우리 사이의 안개"),
    l("Day 7 is for Zhangjiajie National Forest Park from morning onward.", "第 7 天从早上开始走张家界国家森林公园。", "7일 차에는 아침부터 장가계 국가삼림공원을 봅니다."),
  ),
  gallery: [
    image(
      landscapesGroupSlug,
      "gallery-1.webp",
      l("A boat on the Li River below karst peaks", "喀斯特山峰下漓江上的船", "카르스트 봉우리 아래 리강의 배"),
      l("The river boat takes the group to Yangshuo.", "小团坐漓江船，到阳朔下船。", "그룹은 리강 배를 타고 양숴까지 갑니다."),
    ),
  ],
  routeMedia: [
    {
      day: 2,
      variants: [{
        label: l("Beijing", "北京", "베이징"),
        image: image(
          landscapesGroupSlug,
          "route-day-2.webp",
          l("Tiananmen Gate in Beijing", "北京天安门", "베이징 천안문"),
          l("The group enters the Forbidden City on its booked ticket.", "故宫按团体已订到的门票入内。", "그룹은 예약된 입장권으로 자금성에 들어갑니다."),
        ),
      }],
    },
    {
      day: 8,
      variants: [{
        label: l("Tianmen Mountain", "天门山", "천문산"),
        image: image(
          landscapesGroupSlug,
          "route-day-8.webp",
          l("Cliffs of Tianmen Mountain", "天门山的峭壁", "천문산의 절벽"),
          l("Tianmen Mountain’s cable car begins in central Zhangjiajie.", "天门山索道从张家界市区上车。", "천문산 케이블카는 장가계 시내에서 탑니다."),
        ),
      }],
    },
  ],
});

const yangtzeGroupSlug = "beijing-xian-chengdu-yangtze-cruise-shanghai-17-day-small-group-tour";

const yangtzeSmallGroup = smallGroup({
  slug: yangtzeGroupSlug,
  id: "small-group-tour-beijing-xian-chengdu-yangtze-shanghai-17d16n",
  days: 17,
  nights: 16,
  title: l(
    "Beijing, Xi'an, Chengdu, Yangtze Cruise & Shanghai: 17-Day Small-Group Tour",
    "北京·西安·成都·长江游轮·上海 17 天 16 晚小团",
    "베이징·시안·청두·양쯔강 크루즈·상하이 17일 소규모 그룹 투어",
  ),
  metadataTitle: l(
    "Yangtze Cruise Small-Group Tour 2027: 17 Days in China",
    "长江三峡17天小团：最多12人",
    "양쯔강 크루즈 17일 소규모 그룹 투어",
  ),
  metadataDescription: l(
    "2027 small-group Yangtze cruise tour, 17 days, 8–12 guests: Beijing, Xi'an, Chengdu, Shanghai. USD 3,490 per person twin share; departs 19 May, 1 Sep.",
    "2027 年 17 天长江游轮小团，8–12 人：北京、西安、成都与上海。每人 ¥22,680（两人一间），5 月 19 日、9 月 1 日出发，不成团全额退款。",
    "2027년 17일 크루즈 소규모 그룹(8~12명): 베이징, 시안, 청두, 상하이. 1인 ₩4,880,000(2인 1실), 5월 19일·9월 1일 출발, 인원 미달 시 전액 환불.",
  ),
  lede: l(
    "On the 2027 Beijing–Xi’an–Chengdu–Yangtze–Shanghai 17-day small group, one place costs USD 3,490 sharing a twin room and standard balcony cabin; international flights are extra. It leaves on 19 May or 1 September with 8–12 guests. On the river you share the ship and its programme with other passengers.",
    "2027 年北京、西安、成都、长江到上海的 17 天小团，酒店两人一间并住标准阳台舱，每人 ¥22,680，国际机票另计。5 月 19 日或 9 月 1 日出发，每团 8–12 人；船上和其他客人共乘，活动按船方安排。",
    "2027년 베이징·시안·청두·양쯔강·상하이 17일 소규모 그룹은 호텔 2인 1실과 기본 발코니 객실에 1인 ₩4,880,000입니다. 국제선은 별도입니다. 5월 19일 또는 9월 1일에 8~12명이 출발합니다. 강에서는 다른 승객과 같은 배와 선상 일정을 이용합니다.",
  ),
  routeHighlight: l("A three-night Three Gorges cruise", "三晚长江三峡游轮", "3박 삼협 크루즈"),
  itinerary: [
    arriveBeijing(1, "group"),
    forbiddenCity(2),
    greatWall(3),
    templeAndSummerPalace(4),
    trainToXian(5),
    terracottaAndWall(6),
    trainToChengdu(7),
    pandas(8, "group"),
    trainChengduToChongqing(9),
    chongqingThenBoard(10),
    onTheYangtze(11),
    quTangAndWuGorges(12),
    damThenFlyToShanghai(13),
    bundAndYuGarden(14),
    suzhouDayTrip(15),
    shanghaiOwnPace(16),
    departShanghai(17, "group"),
  ],
  hotelScope: l(
    "The Yangtze ship accounts for 3 of the 16 nights, in a standard balcony cabin on a five-star-rated vessel, normally with Gold Cruises. The other 13 are breakfast-included four-star standard hotels, rated 4 diamonds on Trip.com (Ctrip): 4 each in Beijing and Shanghai, 2 each in Xi'an and Chengdu, and 1 in Chongqing.",
    "16 晚里有 3 晚住五星级长江游轮的标准阳台舱，通常订长江黄金游轮。其余 13 晚是携程 4 钻标准的含早酒店：北京和上海各 4 晚，西安和成都各 2 晚，重庆 1 晚。",
    "전체 16박 중 3박은 5성급 양쯔강 크루즈의 기본 발코니 객실에서 보내며 보통 골드 크루즈를 이용합니다. 나머지 13박은 조식 포함 씨트립 4다이아 등급의 4성급 기준 호텔로, 베이징·상하이 각 4박, 시안·청두 각 2박, 충칭 1박입니다.",
  ),
  inclusions: l(
    "The Yangtze booking includes the cabin, meals aboard from dinner on boarding night to breakfast on the last morning, and three shore visits, usually Fengdu Ghost City, the Lesser Three Gorges and the Three Gorges Dam. On land, the fare covers named admissions, second-class trains Beijing–Xi'an–Chengdu–Chongqing and Shanghai–Suzhou return, then a train or economy flight from Yichang to Shanghai. There is one Beijing arrival transfer and one Shanghai departure transfer on the group dates. English-speaking local guides and a group vehicle cover land touring days in each city.",
    "长江游轮的舱房、从登船晚餐到离船早餐的船上餐食，以及三处岸上游览（通常是丰都鬼城、小三峡和三峡大坝）都在团费里。陆上另含所列门票、北京—西安—成都—重庆及上海—苏州往返的二等座高铁，还有宜昌—上海的火车或经济舱航班。按团期接北京机场一次、送上海机场一次；各地陆上游览日配当地英语导游和团车。",
    "양쯔강 크루즈 객실, 승선일 저녁부터 마지막 날 아침까지의 선상 식사, 보통 펑두 귀성·소삼협·삼협댐 세 곳의 육상 관광이 요금에 들어 있습니다. 육상에서는 명시된 입장권, 베이징–시안–청두–충칭 및 상하이–쑤저우 왕복 고속철도 2등석, 이창–상하이 열차 또는 이코노미 항공편을 이용합니다. 그룹 날짜에 베이징 도착 픽업 1회와 상하이 출발 샌딩 1회가 포함됩니다. 각 도시의 육상 관광일에는 영어 현지 가이드와 그룹 차량이 함께합니다.",
  ),
  departures: l("19 May–4 June and 1–17 September", "5 月 19 日–6 月 4 日、9 月 1–17 日", "5월 19일~6월 4일, 9월 1~17일"),
  departureHighlight: l("Departs 19 May and 1 September 2027", "2027 年 5 月 19 日、9 月 1 日出发", "2027년 5월 19일, 9월 1일 출발"),
  priceUsd: 3490,
  privateUsd: [4690, 3790],
  supplementUsd: 1090,
  cruise: true,
  fixedPlan: l("the Day 8 afternoon at Sanxingdui Museum is set", "第 8 天下午固定去三星堆博物馆", "8일 차 오후 싼싱두이 박물관 일정이 고정됩니다"),
  bookingCaveat: l(
    "Cruise cabins and the sailing are not reserved yet. We check availability for your departure, name the ship and cabin category in writing, and confirm the total before taking payment. The planned groups board on a Friday; the route or dates may need to change if the operator’s 2027 schedule differs. A party of 8–12 choosing its own date also needs a sailing from Chongqing on Day 10, which we check first. The September group is in Shanghai for the Mid-Autumn Festival on 15 September 2027, when the Bund and Yu Garden are busier.",
    "游轮船期和舱位目前尚未预留。我们会按出发日期查实舱位，书面确认船名、舱型和总价后再收款。计划中的两个团都是周五登船；如果船方 2027 年船期不同，路线或日期可能需要调整。8–12 人自选日期的团，第 10 天也需有从重庆出发的船，我们会先核对。9 月团在 2027 年 9 月 15 日中秋节时正好在上海，外滩和豫园人会更多。",
    "크루즈 일정과 객실은 아직 예약하거나 확보하지 않았습니다. 출발일별 잔여 객실을 확인한 뒤 선박명, 객실 유형과 총요금을 서면으로 알려 드리고 결제받습니다. 예정된 두 그룹은 금요일 승선이지만 선사의 2027년 운항표가 다르면 경로나 날짜를 조정해야 할 수 있습니다. 8~12명이 날짜를 직접 고르는 경우에도 10일 차 충칭 출발 크루즈가 있는지 먼저 확인합니다. 9월 그룹은 2027년 9월 15일 중추절(추석)에 상하이에 있어 와이탄과 예원이 더 붐빕니다.",
  ),
  extraExclusions: [["Cruise gratuities, paid shore options sold on board (such as White Emperor City and the dam's ship lift) and cabin upgrades"], ["游轮服务费、船上另卖的自费项目（如白帝城、升船机）与舱房升级"], ["크루즈 봉사료, 배에서 파는 유료 선택 관광(백제성, 삼협댐 선박 리프트 등)과 객실 업그레이드"]],
  heroImage: image(
    yangtzeGroupSlug,
    "hero.webp",
    l("Chongqing's river bridges lit up at night", "夜色中的重庆跨江大桥", "밤에 불 밝힌 충칭의 강 다리"),
    l("The group boards the Yangtze cruise in Chongqing on Day 10.", "第 10 天在重庆登长江游轮。", "10일 차 충칭에서 양쯔강 크루즈에 오릅니다."),
  ),
  gallery: [
    image(
      yangtzeGroupSlug,
      "gallery-1.webp",
      l("Kuanzhai Alley in Chengdu", "成都宽窄巷子", "청두 콴자이샹쯔"),
      l("Day 7 has Kuanzhai Alley after the train to Chengdu.", "第 7 天到成都，下午走宽窄巷子。", "7일 차 청두에 도착해 오후에 콴자이샹쯔를 걷습니다."),
    ),
  ],
  routeMedia: [
    {
      day: 4,
      variants: [{
        label: l("Temple of Heaven", "天坛", "천단"),
        image: image(
          yangtzeGroupSlug,
          "route-day-4.webp",
          l("Hall of Prayer for Good Harvests at the Temple of Heaven", "天坛祈年殿", "천단 기년전"),
          l("The Temple of Heaven is a morning stop.", "天坛放在上午走。", "천단은 오전에 봅니다."),
        ),
      }],
    },
    {
      day: 14,
      variants: [{
        label: l("Shanghai", "上海", "상하이"),
        image: image(
          yangtzeGroupSlug,
          "route-day-14.webp",
          l("Old Shanghai rooftops facing Lujiazui at sunset", "日落时上海老城屋顶与陆家嘴", "해 질 녘 상하이 구시가 지붕과 루자쭈이"),
          l("The final four nights are in Shanghai.", "最后在上海连住 4 晚。", "마지막 상하이에서 4박합니다."),
        ),
      }],
    },
  ],
});

const silkRoadGroupSlug = "beijing-xian-silk-road-15-day-small-group-tour";

const silkRoadSmallGroup = smallGroup({
  slug: silkRoadGroupSlug,
  id: "small-group-tour-beijing-xian-silk-road-15d14n",
  days: 15,
  nights: 14,
  title: l(
    "Beijing, Xi'an & the Silk Road: 15-Day Small-Group Tour",
    "北京·西安·丝绸之路 15 天 14 晚小团",
    "베이징·시안·실크로드 15일 소규모 그룹 투어",
  ),
  metadataTitle: l(
    "Silk Road Small-Group Tour 2027: 15 Days, Max 12 Guests",
    "丝绸之路15天小团：最多12人",
    "실크로드 15일 소규모 그룹 투어",
  ),
  metadataDescription: l(
    "2027 Silk Road small-group tour, 15 days, 8–12 guests: Beijing, Xi'an, Dunhuang, Turpan, Urumqi. USD 3,390 per person twin share; departs 12 Jun, 11 Sep.",
    "2027 年 15 天丝绸之路小团，8–12 人：北京、西安、敦煌、吐鲁番与乌鲁木齐。每人 ¥22,030（两人一间），6 月 12 日、9 月 11 日出发，不成团全额退款。",
    "2027년 15일 실크로드 소규모 그룹(8~12명): 베이징, 시안, 둔황, 투루판, 우루무치. 1인 ₩4,740,000(2인 1실), 6월 12일·9월 11일 출발, 인원 미달 시 전액 환불.",
  ),
  lede: l(
    "A 2027 Beijing–Xi’an–Silk Road 15-day small-group place is USD 3,390 per person in a twin room; international flights are extra. It leaves on 12 June or 11 September with 8–12 guests. The westbound trains and desert drives are long; Mogao Caves admission also depends on the date-limited ticket release.",
    "北京、西安到丝绸之路的 2027 年 15 天小团，按两人一间每人 ¥22,030，国际机票另付。6 月 12 日或 9 月 11 日出发，每团 8–12 人；一路向西火车、戈壁公路都坐得久，莫高窟还要看限量放票情况。",
    "베이징·시안·실크로드 2027년 15일 소규모 그룹은 2인 1실에 1인 ₩4,740,000입니다. 국제선은 별도입니다. 6월 12일 또는 9월 11일에 8~12명이 출발합니다. 서쪽으로 가는 열차와 사막 도로 이동이 길고 막고굴 입장은 날짜별 한정 입장권에 따릅니다.",
  ),
  routeHighlight: l("The Mogao Caves and the Turpan oasis", "莫高窟与吐鲁番绿洲", "막고굴과 투루판 오아시스"),
  itinerary: [
    arriveBeijing(1, "group"),
    forbiddenCity(2),
    greatWall(3, "hutong"),
    trainToXian(4),
    terracottaAndWall(5),
    trainXianToZhangye(6),
    jiayuguanPass(7),
    gobiToDunhuang(8),
    mogaoAndDunes(9),
    trainToTurpan(10),
    turpanOasis(11),
    trainToUrumqi(12),
    heavenlyLake(13),
    day(
      14,
      l("Fly to Beijing", "飞回北京", "베이징으로 이동"),
      l(
        "After about 4 hours in the air from Urumqi, the group lands in Beijing. The last hotel is positioned for the next day's airport transfer.",
        "全团从乌鲁木齐飞北京，约 4 小时，住在方便第二天去机场的酒店。",
        "그룹은 우루무치에서 베이징까지 약 4시간 비행한 뒤 다음 날 귀국편을 위해 서우두 공항 근처에서 숙박합니다.",
      ),
    ),
    day(
      15,
      l("Depart Beijing", "北京返程", "베이징 출발"),
      l(
        "On departure day, the group fare includes one ride to either Beijing Capital or Daxing airport. If you want more time in Beijing, we arrange the extra stay separately.",
        "最后一天含一次送往首都或大兴机场；想在北京多住，可以另行安排。",
        "마지막 날 서우두 또는 다싱 공항 샌딩 1회가 포함됩니다. 베이징에 더 머무는 일정은 따로 준비할 수 있습니다.",
      ),
    ),
  ],
  hotelScope: l(
    "All 14 hotel nights include breakfast. The stays are Beijing 3; Xi'an, Dunhuang, Turpan and Urumqi 2 each; Zhangye and Jiayuguan 1 each; then 1 near Beijing Capital airport. We use the four-star standard (4 diamonds on Trip.com/Ctrip) where it is available, and the best-rated local option in Zhangye, Jiayuguan and Turpan.",
    "14 晚都含早餐：北京先住 3 晚，西安、敦煌、吐鲁番和乌鲁木齐各 2 晚，张掖、嘉峪关各 1 晚，最后在首都机场附近住 1 晚。有携程 4 钻标准酒店的地方按这个标准订，张掖、嘉峪关和吐鲁番选当地评分最好的酒店。",
    "조식이 나오는 호텔에서 총 14박합니다. 베이징 3박, 시안·둔황·투루판·우루무치 각 2박, 장예와 자위관 각 1박을 보내고 마지막 1박은 베이징 서우두 공항 근처입니다. 씨트립 4다이아 등급의 4성급 기준 호텔이 있는 곳에서는 그 기준으로 잡고, 장예·자위관·투루판에서는 현지 평점이 가장 좋은 호텔을 씁니다.",
  ),
  inclusions: l(
    "Four second-class train legs carry the group along Beijing–Xi'an–Zhangye, Liuyuan South–Turpan and Turpan–Urumqi; Zhangye–Jiayuguan and Jiayuguan–Dunhuang use a train or group vehicle. The Urumqi–Beijing economy flight is included. So are the named admissions, among them Mogao Caves, Jiayuguan Fort and the Heavenly Lake shuttle, plus one Beijing arrival and one Beijing departure transfer on the group dates. Touring days use English-speaking local guides and a group vehicle. In Xinjiang, carry ID for checks at hotels, stations and some sights.",
    "四段二等座高铁走北京—西安—张掖、柳园南—吐鲁番、吐鲁番—乌鲁木齐；张掖—嘉峪关、嘉峪关—敦煌则坐火车或团车。乌鲁木齐—北京的经济舱航班也含。门票按行程所列，其中有莫高窟、嘉峪关关城和天池区间车。团期内北京接机、送机各一次，各地游览日配当地英语导游和团车。新疆的酒店、车站和部分景点需要查证件、过安检。",
    "베이징–시안–장예, 류위안남–투루판, 투루판–우루무치 구간의 고속철도 2등석 네 번이 포함됩니다. 장예–자위관과 자위관–둔황은 열차 또는 그룹 차량으로 이동하고, 우루무치–베이징은 이코노미 항공편을 탑니다. 명시된 입장권에는 막고굴, 자위관성과 톈츠 셔틀이 들어 있습니다. 그룹 날짜에 베이징 도착 픽업과 출발 샌딩을 각 1회 제공하며 관광일에는 영어 현지 가이드와 그룹 차량이 함께합니다. 신장 호텔·역·일부 명소에서는 신분증 확인과 보안 검색이 있습니다.",
  ),
  departures: l("12–26 June and 11–25 September", "6 月 12–26 日、9 月 11–25 日", "6월 12~26일, 9월 11~25일"),
  departureHighlight: l("Departs 12 June and 11 September 2027", "2027 年 6 月 12 日、9 月 11 日出发", "2027년 6월 12일, 9월 11일 출발"),
  priceUsd: 3390,
  privateUsd: [4590, 3690],
  supplementUsd: 690,
  fixedPlan: l("the group flies back to Beijing on Day 14", "第 14 天全团统一飞回北京", "14일 차에 그룹이 함께 베이징으로 돌아갑니다"),
  bookingCaveat: l(
    "Mogao Caves tickets are limited and released for set dates; if only the four-cave emergency ticket is available for the group date, we tell you before payment. The September group is in Xi'an over the Mid-Autumn Festival on 15 September 2027, when the Terracotta Warriors are busier.",
    "莫高窟门票限量并按日期放票；如果团期只有四个洞窟的应急票，我们会在付款前告诉你。9 月团在西安时赶上 2027 年 9 月 15 日中秋节，兵马俑人会更多。",
    "막고굴 입장권은 수량이 제한되어 날짜별로 풀리며, 그룹 날짜에 굴 4개만 보는 응급 입장권만 남으면 결제 전에 알려 드립니다. 9월 그룹은 2027년 9월 15일 중추절(추석)에 시안에 있어 병마용이 더 붐빕니다.",
  ),
  extraExclusions: [["Camel rides, desert jeeps and other optional activities"], ["骑骆驼、沙漠越野车等自选项目"], ["낙타 타기, 사막 지프 등 선택 활동"]],
  heroImage: image(
    silkRoadGroupSlug,
    "hero.webp",
    l("The Big Wild Goose Pagoda in Xi'an", "西安大雁塔", "시안 대안탑"),
    l("The Big Wild Goose Pagoda held scriptures brought back along the Silk Road.", "大雁塔曾收藏从丝绸之路带回的经卷。", "대안탑에는 실크로드를 따라 가져온 경전을 보관했습니다."),
  ),
  gallery: [
    image(
      silkRoadGroupSlug,
      "gallery-1.webp",
      l("Yongning Gate of the Xi'an City Wall at night", "夜色中的西安永宁门", "밤의 시안 성벽 융닝먼"),
      l("Late on Day 5, walk or cycle the Xi’an City Wall.", "第 5 天傍晚上西安城墙走走或骑车。", "5일 차 늦은 오후 시안 성벽을 걷거나 자전거를 탑니다."),
    ),
  ],
  routeMedia: [
    {
      day: 2,
      variants: [{
        label: l("Beijing", "北京", "베이징"),
        image: image(
          silkRoadGroupSlug,
          "route-day-2.webp",
          l("The bridges in front of Tiananmen Gate", "天安门前的金水桥", "천안문 앞의 금수교"),
          l("The group spends its first three nights in Beijing.", "小团前 3 晚都住北京。", "그룹은 첫 3박을 베이징에서 합니다."),
        ),
      }],
    },
    {
      day: 5,
      variants: [{
        label: l("Xi'an", "西安", "시안"),
        image: image(
          silkRoadGroupSlug,
          "route-day-5.webp",
          l("The Bell Tower in Xi'an's walled city", "西安城内的钟楼", "시안 성안의 종루"),
          l("Xi’an marks the eastern end of the old Silk Road.", "古丝绸之路从西安向西延伸。", "옛 실크로드는 시안에서 서쪽으로 이어집니다."),
        ),
      }],
    },
  ],
});

// ---------------------------------------------------------------------------
// 11. Beijing, Xi'an & Shanghai in 8 days, private
// ---------------------------------------------------------------------------

const goldenTriangle8Slug = "beijing-xian-shanghai-8-day-private-tour";

const goldenTriangleEight: PrivateTourProduct = {
  id: "private-tour-beijing-xian-shanghai-8d7n",
  slug: goldenTriangle8Slug,
  days: 8,
  nights: 7,
  servicePolicy,
  includesDomesticFlights: true,
  title: l(
    "Beijing, Xi'an & Shanghai: 8-Day Private Tour",
    "北京·西安·上海 8 天 7 晚私家团",
    "베이징·시안·상하이 8일 프라이빗 투어",
  ),
  metadataTitle: l(
    "8-Day China Private Tour: Beijing, Xi'an & Shanghai",
    "北京西安上海8天私家团",
    "베이징·시안·상하이 8일 프라이빗 투어",
  ),
  metadataDescription: l(
    "8-day private tour: Great Wall, Terracotta Warriors, Shanghai. Per person USD 2,390 for 2 travellers, 1,890 for 6; Xi'an–Shanghai flight included.",
    "8 天私家团：长城、兵马俑与上海。每人价格：2 人同行 ¥15,530，6 人同行 ¥12,280；含高铁和西安飞上海航班。",
    "8일 프라이빗 투어: 만리장성, 병마용, 상하이. 1인 요금 2명 ₩3,340,000, 6명 ₩2,650,000. 고속철도·시안–상하이 항공 포함.",
  ),
  eyebrow: l(
    "Beijing, Xi’an and Shanghai in eight days",
    "8 天走完北京、西安、上海",
    "8일 동안 베이징·시안·상하이",
  ),
  lede: l(
    "This 8-day Beijing–Xi’an–Shanghai private tour starts at USD 2,390 per person for two sharing a twin room; international flights are extra. It is the shortest way we run the three cities: three nights in Beijing, two in Xi’an and two in Shanghai, with a flight at the end instead of a six-hour train.",
    "北京、西安、上海 8 天私家团，2 人同行、两人一间，每人 ¥15,530 起，不含国际机票。这是我们走这三座城市最短的排法：北京 3 晚、西安 2 晚、上海 2 晚，西安到上海坐飞机，不坐 6 小时左右的高铁。",
    "베이징·시안·상하이 8일 프라이빗 투어는 2명, 2인 1실 기준 1인 ₩3,340,000부터이며 국제선은 별도입니다. 세 도시를 가장 짧게 도는 일정으로 베이징 3박, 시안 2박, 상하이 2박이며 시안에서 상하이까지는 6시간 안팎의 열차 대신 항공편으로 갑니다.",
  ),
  summary: l(
    "Seven hotel nights include breakfast. The price covers local private guides and vehicles on touring days, transfers, named tickets, the Beijing–Xi’an high-speed train and the Xi’an–Shanghai economy flight. The Temple of Heaven, the Summer Palace and a rest day do not fit; the 12-day version has room for them.",
    "7 晚酒店都含早餐。游览日的当地私人导游和车、接送、所列门票、北京到西安的高铁、西安飞上海的经济舱都含。天坛、颐和园和休息日这趟放不进去；想要这些，看 12 天版本。",
    "호텔 7박에는 조식이 포함됩니다. 관광일의 도시별 전용 가이드와 차량, 이동, 명시된 입장권, 베이징–시안 고속철도와 시안–상하이 이코노미 항공편이 들어 있습니다. 천단, 이화원, 쉬는 날은 넣지 못했으니 필요하면 12일 일정을 보세요.",
  ),
  highlights: lists(
    [
      "The Forbidden City on your ticket date",
      "The Great Wall at Mutianyu and a hutong walk",
      "A full Terracotta Warriors day",
      "Fly Xi’an to Shanghai instead of a six-hour train",
    ],
    [
      "按出票日期进故宫",
      "慕田峪长城和胡同",
      "兵马俑完整一天",
      "西安飞上海，省下 6 小时左右的火车",
    ],
    [
      "발권 날짜에 맞춘 자금성",
      "무톈위 만리장성과 후퉁",
      "병마용 종일 일정",
      "6시간 안팎 열차 대신 시안–상하이 항공편",
    ],
  ),
  itinerary: [
    arriveBeijing(1, "private"),
    forbiddenCity(2),
    greatWall(3, "hutong"),
    trainToXian(4),
    terracottaAndWall(5),
    flyXianToShanghai(6),
    shanghaiDay(7, "private"),
    departShanghai(8, "private"),
  ],
  hotelNote: l(
    "Seven hotel nights include breakfast, in twin rooms at the four-star standard (4 diamonds on Trip.com/Ctrip): Beijing 3, Xi’an 2 and Shanghai 2. We confirm hotel names and room types before payment.",
    "7 晚酒店都含早，默认两人一间，按携程 4 钻标准选：北京 3 晚、西安 2 晚、上海 2 晚。酒店名称和房型付款前确认。",
    "조식 포함 씨트립 4다이아 등급 호텔에서 2인 1실로 7박합니다. 베이징 3박, 시안 2박, 상하이 2박이며 호텔 이름과 객실 형태는 결제 전에 확인합니다.",
  ),
  serviceNote: l(
    "Included: an English-speaking local guide and vehicle for your party in each city on touring days, all transfers, named first admissions, the second-class train Beijing–Xi'an and the economy flight Xi'an–Shanghai. Guides work city by city: on train and flight days, a driver takes you to the station or airport and another meets you on arrival. Korean-speaking guides can be arranged at the same price, subject to availability in each city.",
    "包含：每座城市游览日只服务你们的当地导游与用车，全部接送，所列首道门票，北京—西安二等座高铁，以及西安—上海经济舱航班；导游按城市安排，火车和航班转场日由司机送站、另有司机接站，导游语种按订单确认。",
    "관광일마다 도시별 한국어 현지 가이드와 전용 차량, 모든 이동, 명시된 기본 입장권, 베이징–시안 고속철도 2등석과 시안–상하이 이코노미 항공편이 포함됩니다. 가이드는 도시별로 배정되며 열차·항공 이동일에는 기사가 역이나 공항까지 모시고 도착지에서 다른 기사가 맞이합니다. 한국어 가이드는 추가 요금 없이 배정하며 도시별 가능 여부를 확인합니다.",
  ),
  exclusions: exclusions(
    ["Single-room supplement", "Checked baggage above the airline's included allowance", "The Day 7 option not chosen in writing"],
    ["单房差", "超出航司免费额度的托运行李", "第 7 天未书面选定的另一方案"],
    ["1인실 추가금", "항공사 무료 허용량을 넘는 위탁 수하물", "7일 차에 서면으로 선택하지 않은 다른 일정"],
  ),
  bookingNote: privateBookingNote,
  faq: [
    faq(
      l("How much is an 8-day Beijing, Xi’an and Shanghai private tour?", "北京西安上海 8 天私家团多少钱？", "베이징·시안·상하이 8일 프라이빗 투어는 얼마인가요?"),
      l(
        "The 8-day Beijing–Xi’an–Shanghai private tour is USD 2,390 each for two sharing a twin room, USD 4,780 for the pair. Four travellers pay USD 2,030 each and six pay USD 1,890. Seven breakfast hotel nights, guides and vehicles in each city on touring days, entrance tickets, the Beijing–Xi’an train and the Xi’an–Shanghai flight are included. International flights, lunches and dinners are not. Other party sizes get a written quote.",
        "北京、西安、上海 8 天私家团，2 人住一间每人 ¥15,530，两人共 ¥31,060；4 人每人 ¥13,190，6 人每人 ¥12,280。7 晚早餐酒店、各地游览日的私人导游和车、门票、北京到西安的高铁和西安飞上海的航班都含。国际机票和午晚餐不含，其他人数书面报价。",
        "베이징·시안·상하이 8일 프라이빗 투어는 2명, 2인 1실에 1인 ₩3,340,000, 두 명 합계 ₩6,680,000입니다. 4명은 1인 ₩2,840,000, 6명은 ₩2,650,000입니다. 조식 포함 호텔 7박, 도시별 관광일의 전용 가이드와 차량, 입장권, 베이징–시안 고속철도와 시안–상하이 항공편이 포함됩니다. 국제선과 중식·석식은 별도이며 다른 인원은 서면 견적을 드립니다.",
      ),
    ),
    faq(
      l("Is eight days enough for Beijing, Xi’an and Shanghai?", "8 天够玩北京、西安、上海吗？", "베이징·시안·상하이는 8일이면 충분한가요?"),
      l(
        "Eight days cover the core of the Beijing–Xi’an–Shanghai route: the Forbidden City, the Great Wall at Mutianyu, the Terracotta Warriors and one full Shanghai day. What gets cut is the Temple of Heaven, the Summer Palace and any spare day. The 12-day Beijing–Xi’an–Shanghai private tour adds those from USD 2,880 each for two, and the 10-day route with the Li River starts at USD 2,990.",
        "8 天能看完北京、西安、上海这条线的重点：故宫、慕田峪长城、兵马俑，再加上海完整一天。砍掉的是天坛、颐和园和空闲日。想要这些，北京西安上海 12 天私家团 2 人同行每人 ¥18,720 起；加漓江的 10 天线每人 ¥19,430 起。",
        "8일이면 베이징·시안·상하이 일정의 핵심인 자금성, 무톈위 만리장성, 병마용과 상하이 하루를 볼 수 있습니다. 빠지는 것은 천단, 이화원, 여유 있는 하루입니다. 이것까지 원하면 베이징·시안·상하이 12일 프라이빗 투어가 2명 기준 1인 ₩4,030,000부터, 리강을 넣은 10일 일정이 ₩4,180,000부터입니다.",
      ),
    ),
    faq(
      l("Why fly from Xi’an to Shanghai?", "西安到上海为什么坐飞机？", "시안에서 상하이까지 왜 비행기로 가나요?"),
      l(
        "On the 8-day Beijing–Xi’an–Shanghai tour, the reason is time. The high-speed train between Xi’an and Shanghai takes about six hours; the flight is a little over two, plus about an hour to Xi’an airport. That leaves a free morning in Xi’an or an evening at the Bund. If you prefer the train, tell us before booking and we will requote.",
        "北京西安上海 8 天线里，坐飞机是为了省时间。西安到上海的高铁要 6 小时左右，飞机两个多小时，另加去西安机场约 1 小时车程。省下来的时间，可以在西安多一个上午，或者晚上去外滩。想坐火车，订之前告诉我们，重新报价。",
        "베이징·시안·상하이 8일 일정에서 항공편을 쓰는 이유는 시간입니다. 시안–상하이 고속철도는 약 6시간이고 항공편은 2시간 남짓에 시안 공항까지 차로 약 1시간이 더 듭니다. 그만큼 시안에서 오전을 쓰거나 저녁에 와이탄에 갈 수 있습니다. 열차를 원하면 예약 전에 알려 주세요. 다시 견적을 드립니다.",
      ),
    ),
    faq(
      l("Can the tour start in Shanghai instead?", "可以从上海开始走吗？", "상하이에서 시작할 수 있나요?"),
      l(
        "Yes. The 8-day Beijing–Xi’an–Shanghai private tour can run in reverse if your international flight lands in Shanghai and leaves from Beijing. The nights in each city stay the same. The Forbidden City is closed on Mondays, so the Beijing days are set after the ticket date is confirmed, and the price is confirmed in writing for the direction you choose.",
        "可以。国际航班如果落上海、从北京回，北京西安上海 8 天私家团可以倒着走，每站住几晚不变。故宫周一闭馆，北京几天怎么排，要等门票日期定了再定；按你选的方向，价格书面确认。",
        "가능합니다. 국제선이 상하이에 도착하고 베이징에서 출발한다면 베이징·시안·상하이 8일 프라이빗 투어를 거꾸로 진행할 수 있습니다. 도시별 숙박 수는 같습니다. 자금성은 월요일에 쉬므로 입장권 날짜가 확정된 뒤 베이징 일정을 정하고, 요금은 선택한 방향으로 서면 확인합니다.",
      ),
    ),
  ],
  heroImage: image(
    goldenTriangle8Slug,
    "hero.webp",
    l("A main hall of the Forbidden City on its marble terrace", "故宫汉白玉台基上的大殿", "자금성 대리석 기단 위의 전각"),
    l("Day 2 is for the Forbidden City, on the date your ticket is issued.", "第 2 天进故宫，日期以出票为准。", "2일 차에는 발권된 날짜에 자금성에 들어갑니다."),
  ),
  gallery: [
    image(
      goldenTriangle8Slug,
      "gallery-1.webp",
      l("Southeast corner of the Xi’an City Wall above the moat", "西安城墙东南城角与护城河", "시안 성벽 동남쪽 모서리와 해자"),
      l("Xi’an gets two nights: one on arrival, one after the Terracotta Warriors.", "西安住 2 晚：一晚到达，一晚看完兵马俑。", "시안에서는 2박합니다. 도착한 날 하루, 병마용을 본 날 하루입니다."),
    ),
  ],
  routeMedia: [
    {
      day: 5,
      variants: [{
        label: l("Xi'an", "西安", "시안"),
        image: image(
          goldenTriangle8Slug,
          "route-day-5.webp",
          l("Watchtower on top of the Xi’an City Wall", "西安城墙上的城楼", "시안 성벽 위의 누각"),
          l("On Day 5, walk or cycle the wall after the Terracotta Warriors.", "第 5 天看完兵马俑，再上城墙走走或骑车。", "5일 차 병마용을 본 뒤 성벽을 걷거나 자전거를 탑니다."),
        ),
      }],
    },
    {
      day: 7,
      variants: [{
        label: l("Shanghai", "上海", "상하이"),
        image: image(
          goldenTriangle8Slug,
          "route-day-7.webp",
          l("Old Shanghai rooftops with the Lujiazui towers lit behind", "上海老城屋顶和后面亮灯的陆家嘴", "상하이 구시가 지붕 너머 불 켜진 루자쭈이"),
          l("Day 7: stay in Shanghai with a guide, or take the train to Suzhou.", "第 7 天二选一：留在上海跟导游走，或坐高铁去苏州。", "7일 차에는 상하이 가이드 일정과 쑤저우 당일 여행 중 고릅니다."),
        ),
      }],
    },
  ],
  packages: [privatePackage([usd(2, 2390), usd(4, 2030), usd(6, 1890)])],
  datePublished: PUBLISHED,
  dateModified: MODIFIED,
};

// ---------------------------------------------------------------------------
// 12. Beijing in, Hong Kong out in 10 days, private
// ---------------------------------------------------------------------------

const hongKongExit10Slug = "beijing-xian-guilin-hong-kong-10-day-private-tour";

const hongKongExitTen: PrivateTourProduct = {
  id: "private-tour-beijing-xian-guilin-hong-kong-10d9n",
  slug: hongKongExit10Slug,
  days: 10,
  nights: 9,
  servicePolicy,
  includesDomesticFlights: true,
  title: l(
    "Beijing, Xi'an, Guilin & Hong Kong: 10-Day Private Tour",
    "北京·西安·桂林·香港 10 天 9 晚私家团",
    "베이징·시안·구이린·홍콩 10일 프라이빗 투어",
  ),
  metadataTitle: l(
    "10-Day China Tour Ending in Hong Kong: Beijing to Guilin",
    "北京进香港出10天私家团",
    "베이징 입국 홍콩 출국 10일 프라이빗 투어",
  ),
  metadataDescription: l(
    "10-day private tour, Beijing in, Hong Kong out: Great Wall, Terracotta Warriors, Li River. Per person USD 3,090 for 2, 2,470 for 6. Train to Hong Kong included.",
    "10 天私家团，北京进、香港出：长城、兵马俑、漓江。每人价格：2 人同行 ¥20,080，6 人同行 ¥16,050；含桂林到香港高铁。",
    "베이징 입국, 홍콩 출국 10일 프라이빗 투어: 만리장성, 병마용, 리강. 1인 요금 2명 ₩4,320,000, 6명 ₩3,460,000. 구이린–홍콩 고속철도 포함.",
  ),
  eyebrow: l(
    "Fly into Beijing, leave from Hong Kong",
    "北京进，香港出",
    "베이징으로 들어와 홍콩에서 출국",
  ),
  lede: l(
    "This 10-day private tour flies into Beijing and leaves from Hong Kong, from USD 3,090 per person for two sharing a twin room; international flights are extra. The mainland part ends on Day 9 with a train to Hong Kong, so travellers from the US and other eligible countries may be able to use China’s 240-hour visa-free transit instead of a tourist visa.",
    "北京进、香港出的 10 天私家团，2 人同行、两人一间，每人 ¥20,080 起，不含国际机票。内地行程在第 9 天坐高铁去香港结束，所以美国等适用国家的旅客，有机会用 240 小时过境免签，不用办旅游签证。",
    "베이징으로 들어와 홍콩에서 출국하는 10일 프라이빗 투어로, 2명, 2인 1실 기준 1인 ₩4,320,000부터이며 국제선은 별도입니다. 중국 본토 일정이 9일 차에 홍콩행 열차로 끝나므로 미국 등 대상 국가 여행자는 관광 비자 대신 240시간 경유 무비자를 쓸 수도 있습니다.",
  ),
  summary: l(
    "Nine hotel nights include breakfast, the last one in Hong Kong. The price covers local private guides and vehicles on mainland touring days, transfers, named tickets, the Li River cruise, the Beijing–Xi’an train, the Xi’an–Guilin flight and the Guilin–Hong Kong train. There is no guided sightseeing in Hong Kong; extra nights there can be added.",
    "9 晚酒店都含早餐，最后一晚住香港。内地游览日的当地私人导游和车、接送、所列门票、漓江游船、北京到西安高铁、西安飞桂林航班和桂林到香港高铁都含。香港段不安排导游游览，想多住几晚可以加。",
    "호텔 9박에는 조식이 포함되며 마지막 밤은 홍콩입니다. 본토 관광일의 도시별 전용 가이드와 차량, 이동, 명시된 입장권, 리강 유람선, 베이징–시안 고속철도, 시안–구이린 항공편, 구이린–홍콩 고속철도가 포함됩니다. 홍콩에서는 가이드 관광이 없고 숙박을 더할 수 있습니다.",
  ),
  highlights: lists(
    [
      "The Great Wall at Mutianyu and a hutong walk",
      "A full Terracotta Warriors day",
      "Li River cruise and two Yangshuo nights",
      "Direct train from Guilin to Hong Kong",
    ],
    [
      "慕田峪长城和胡同",
      "兵马俑完整一天",
      "漓江游船，阳朔住两晚",
      "桂林直达香港的高铁",
    ],
    [
      "무톈위 만리장성과 후퉁",
      "병마용 종일 일정",
      "리강 유람선과 양숴 2박",
      "구이린에서 홍콩까지 직통 고속철도",
    ],
  ),
  itinerary: [
    arriveBeijing(1, "private"),
    forbiddenCity(2),
    greatWall(3, "hutong"),
    trainToXian(4),
    terracottaAndWall(5),
    flyXianToGuilin(6),
    liRiver(7),
    yulongCountryside(8),
    trainGuilinToHongKong(9),
    departHongKong(10),
  ],
  hotelNote: l(
    "Nine hotel nights include breakfast, in twin rooms at the four-star standard (4 diamonds on Trip.com/Ctrip): Beijing 3, Xi’an 2, Guilin 1, Yangshuo 2 and Hong Kong 1. Hong Kong rooms are usually smaller than mainland rooms at the same level. We confirm hotel names and room types before payment.",
    "9 晚酒店都含早，默认两人一间，按携程 4 钻标准选：北京 3 晚、西安 2 晚、桂林 1 晚、阳朔 2 晚、香港 1 晚。同等级的香港酒店房间通常比内地小。酒店名称和房型付款前确认。",
    "조식 포함 씨트립 4다이아 등급 호텔에서 2인 1실로 9박합니다. 베이징 3박, 시안 2박, 구이린 1박, 양숴 2박, 홍콩 1박입니다. 같은 등급이라도 홍콩 객실은 보통 본토보다 작습니다. 호텔 이름과 객실 형태는 결제 전에 확인합니다.",
  ),
  serviceNote: l(
    "Included: an English-speaking local guide and vehicle for your party in each mainland city on touring days, all transfers including West Kowloon station to your Hong Kong hotel and on to the airport, named first admissions, the Li River cruise with separate luggage transfer, the second-class trains Beijing–Xi'an and Guilin–Hong Kong, and the economy flight Xi'an–Guilin. Guides work city by city: on train and flight days, a driver takes you to the station or airport and another meets you on arrival. Korean-speaking guides can be arranged in mainland cities at the same price, subject to availability.",
    "包含：内地每座城市游览日只服务你们的当地导游与用车，全部接送（含西九龙站到香港酒店、酒店到机场），所列首道门票，漓江游船及行李另车转运，北京—西安、桂林—香港二等座高铁，以及西安—桂林经济舱航班；导游按城市安排，火车和航班转场日由司机送站、另有司机接站，导游语种按订单确认。",
    "본토 관광일마다 도시별 한국어 현지 가이드와 전용 차량, 웨스트카오룽역–홍콩 호텔–공항을 포함한 모든 이동, 명시된 기본 입장권, 리강 유람선과 수하물 별도 이동, 베이징–시안과 구이린–홍콩 고속철도 2등석, 시안–구이린 이코노미 항공편이 포함됩니다. 가이드는 도시별로 배정되며 열차·항공 이동일에는 기사가 역이나 공항까지 모시고 도착지에서 다른 기사가 맞이합니다. 본토 한국어 가이드는 추가 요금 없이 배정하며 도시별 가능 여부를 확인합니다.",
  ),
  exclusions: exclusions(
    ["Single-room supplement", "Checked baggage above the airline's included allowance", "Guided sightseeing and meals in Hong Kong"],
    ["单房差", "超出航司免费额度的托运行李", "香港的导游游览和餐食"],
    ["1인실 추가금", "항공사 무료 허용량을 넘는 위탁 수하물", "홍콩 가이드 관광과 식사"],
  ),
  bookingNote: l(
    "The listed starting price is per person at the stated group size, with two sharing a room. Once dates are agreed, we ask for passport details for the Forbidden City, Terracotta Warriors and train tickets, and we book the Guilin–Hong Kong train as soon as seats go on sale. If you plan to use visa-free transit, check where you enter the mainland from and hold a confirmed onward ticket to Hong Kong before departure; we do not apply for visas. Flights, trains, hotels and the final total are confirmed in writing before payment.",
    "页面起价按对应人数、两人一间的每人价格算。日期定下后，我们收护照信息，用来订故宫、兵马俑和火车票；桂林到香港的高铁一开售就订。打算用过境免签的话，出发前要核对进入内地前从哪里出发，并拿到日期和座位已确认的赴港续程票；我们不代办签证。航班、火车、酒店和最终总价都会在付款前书面确认。",
    "표시 시작가는 해당 인원이 2인 1실을 쓸 때의 1인 요금입니다. 날짜가 정해지면 자금성, 병마용, 열차표 예약을 위해 여권 정보를 받고 구이린–홍콩 열차는 판매가 열리면 바로 예약합니다. 경유 무비자를 쓸 계획이라면 본토 입국 전 출발지를 확인하고, 출발 전에 날짜와 좌석이 확정된 홍콩행 다음 구간 표를 갖고 있어야 합니다. 저희는 비자를 대행하지 않습니다. 항공편, 열차, 호텔과 최종 금액은 결제 전에 서면으로 확인합니다.",
  ),
  faq: [
    faq(
      l("How much is the 10-day Beijing to Hong Kong private tour?", "北京进香港出 10 天私家团多少钱？", "베이징–홍콩 10일 프라이빗 투어는 얼마인가요?"),
      l(
        "The 10-day Beijing–Xi’an–Guilin–Hong Kong private tour is USD 3,090 each for two sharing a twin room, USD 6,180 for the pair. Four travellers pay USD 2,630 each and six pay USD 2,470. Nine breakfast hotel nights, mainland guides and vehicles on touring days, tickets, the Li River boat, two high-speed trains, one domestic flight and the Hong Kong transfers are included. International flights, lunches and dinners are not.",
        "北京、西安、桂林到香港的 10 天私家团，2 人住一间每人 ¥20,080，两人共 ¥40,160；4 人每人 ¥17,090，6 人每人 ¥16,050。9 晚早餐酒店、内地游览日的私人导游和车、门票、漓江游船、两段高铁、一段国内航班和香港接送都含。国际机票和午晚餐不含。",
        "베이징·시안·구이린·홍콩 10일 프라이빗 투어는 2명, 2인 1실에 1인 ₩4,320,000, 두 명 합계 ₩8,640,000입니다. 4명은 1인 ₩3,680,000, 6명은 ₩3,460,000입니다. 조식 포함 호텔 9박, 본토 관광일의 전용 가이드와 차량, 입장권, 리강 배, 고속철도 2구간, 국내선 1구간과 홍콩 이동이 포함됩니다. 국제선과 중식·석식은 별도입니다.",
      ),
    ),
    faq(
      l("Can I do this tour without a Chinese visa?", "这条线可以不办中国签证吗？", "중국 비자 없이 이 일정이 가능한가요?"),
      l(
        "Possibly. Eligible passport holders may stay up to 10 days under China's 240-hour transit rule when they enter the mainland from one country or region and leave for a different one; Hong Kong counts as a separate region. This tour plans Beijing entry on Day 1 and Hong Kong West Kowloon exit on Day 9. It is not a qualifying third-region transit if you also entered the mainland from Hong Kong. You need a confirmed onward ticket with a fixed date and seat, and the border officer decides on arrival. Check the National Immigration Administration before booking; we do not handle visas.",
        "有可能。符合中国 240 小时过境免签条件的护照持有人，须从一个国家或地区进入内地，再前往不同的第三国或地区；香港算单独的地区。这条线计划第 1 天从北京入境、第 9 天从香港西九龙离开内地。如果入境前也是从香港出发，不能仅凭这条路线作为第三地过境。你需要日期和座位已确认的续程票，能否免签由边检当场决定。订前请查国家移民管理局最新说明；我们不代办签证。",
        "가능할 수 있습니다. 중국의 240시간 경유 무비자 대상 여권이라도 본토 입국 전 출발지와 출국 목적지는 서로 다른 국가·지역이어야 합니다. 홍콩은 별도 지역입니다. 이 일정은 1일 차 베이징으로 들어와 9일 차 홍콩 웨스트카오룽으로 나가도록 계획하지만, 본토 입국 전에도 홍콩에서 출발했다면 이 경로만으로는 제3지역 환승이 되지 않습니다. 날짜와 좌석이 확정된 다음 구간 표가 필요하며 최종 입국 여부는 심사관이 결정합니다. 예약 전 국가이민관리국 규정을 확인하세요. 저희는 비자를 대행하지 않습니다.",
      ),
    ),
    faq(
      l("How do you get from Guilin to Hong Kong?", "桂林怎么去香港？", "구이린에서 홍콩까지 어떻게 가나요?"),
      l(
        "On Day 9 of the 10-day Beijing–Hong Kong private tour, a driver takes you from Yangshuo to Guilin West station, about 1.5 hours, for the direct high-speed train to Hong Kong West Kowloon, about 3 hours 20 minutes. There are only two or three direct trains a day, so we book one as soon as tickets open. You carry your own bags on the train. Immigration for both sides is done at West Kowloon, and a Hong Kong driver meets you after the checks.",
        "北京进香港出 10 天私家团的第 9 天，司机从阳朔送你到桂林西站，约 1.5 小时，再坐直达高铁到香港西九龙，约 3 小时 20 分。直达车一天只有两三班，一开售我们就订。火车上行李自己拿。两边的出入境都在西九龙站办，办完出来有香港司机接。",
        "베이징–홍콩 10일 프라이빗 투어 9일 차에 기사가 양숴에서 구이린시역까지 약 1.5시간 모시고, 직통 고속철도로 홍콩 웨스트카오룽까지 약 3시간 20분 갑니다. 직통 열차가 하루 두세 편뿐이어서 판매가 열리면 바로 예약합니다. 열차 안에서 짐은 직접 챙깁니다. 양쪽 출입국 심사는 웨스트카오룽역에서 하고, 심사를 마치면 홍콩 기사가 맞이합니다.",
      ),
    ),
    faq(
      l("How is this different from the 10-day tour ending in Shanghai?", "和上海结束的 10 天线有什么不同？", "상하이에서 끝나는 10일 일정과 무엇이 다른가요?"),
      l(
        "Both 10-day routes start in Beijing and include Xi’an and the Li River. The Beijing–Xi’an–Guilin–Shanghai tour, from USD 2,990 each for two, ends with a Shanghai or Suzhou day and flies home from Shanghai. This one, from USD 3,090, adds a second Yangshuo night and ends in Hong Kong, which is the version that can fit 240-hour visa-free transit. Flying in from and back to the same country does not qualify.",
        "两条 10 天线都从北京开始，都有西安和漓江。北京、西安、桂林到上海那条，2 人同行每人 ¥19,430 起，最后一天在上海或苏州，从上海回国。这条每人 ¥20,080 起，阳朔多住一晚，最后到香港，能配合 240 小时过境免签。从同一个国家飞来又飞回，不符合过境免签条件。",
        "두 10일 일정 모두 베이징에서 시작해 시안과 리강을 봅니다. 베이징·시안·구이린·상하이 일정은 2명 기준 1인 ₩4,180,000부터이며 상하이나 쑤저우에서 하루를 보내고 상하이에서 귀국합니다. 이 일정은 ₩4,320,000부터이며 양숴에서 하루 더 묵고 홍콩에서 끝나므로 240시간 경유 무비자에 맞출 수 있습니다. 같은 나라에서 와서 같은 나라로 돌아가는 일정은 경유 무비자 조건에 맞지 않습니다.",
      ),
    ),
  ],
  heroImage: image(
    hongKongExit10Slug,
    "hero.webp",
    l("The Li River bending past a village among karst hills", "峰林间绕过村庄的漓江", "카르스트 봉우리 사이 마을을 돌아 흐르는 리강"),
    l("Days 7 and 8 are on the Li River and in the Yangshuo countryside.", "第 7、8 天在漓江和阳朔乡村。", "7일 차와 8일 차에는 리강과 양숴 시골을 봅니다."),
  ),
  gallery: [
    image(
      hongKongExit10Slug,
      "gallery-1.webp",
      l("Corner tower of the Forbidden City reflected in the moat", "故宫角楼与护城河倒影", "해자에 비친 자금성 각루"),
      l("The trip starts with three nights in Beijing.", "行程先在北京住 3 晚。", "여행은 베이징 3박으로 시작합니다."),
    ),
  ],
  routeMedia: [
    {
      day: 7,
      variants: [{
        label: l("Li River", "漓江", "리강"),
        image: image(
          hongKongExit10Slug,
          "route-day-7.webp",
          l("A fisherman on a bamboo raft on the Li River", "漓江上的竹筏", "리강의 대나무 뗏목과 어부"),
          l("On Day 7 the boat runs about four hours to Yangshuo.", "第 7 天坐船约 4 小时到阳朔。", "7일 차에는 배로 약 4시간 걸려 양숴에 갑니다."),
        ),
      }],
    },
    {
      day: 8,
      variants: [{
        label: l("Yangshuo", "阳朔", "양숴"),
        image: image(
          hongKongExit10Slug,
          "route-day-8.webp",
          l("Karst hills and fields in the Yangshuo countryside", "阳朔乡村的峰林和田野", "양숴 시골의 봉우리와 들판"),
          l("Day 8 is a slower day around the Yulong River.", "第 8 天在遇龙河一带慢慢走。", "8일 차에는 위룽허 주변을 천천히 둘러봅니다."),
        ),
      }],
    },
  ],
  packages: [privatePackage([usd(2, 3090), usd(4, 2630), usd(6, 2470)])],
  datePublished: PUBLISHED,
  dateModified: MODIFIED,
};

// ---------------------------------------------------------------------------
// 13. Beijing, Xi'an, Yangtze & Shanghai in 12 days, private
// ---------------------------------------------------------------------------

const yangtze12Slug = "beijing-xian-yangtze-cruise-shanghai-12-day-private-tour";

const yangtzeTwelve: PrivateTourProduct = {
  id: "private-tour-beijing-xian-yangtze-shanghai-12d11n",
  slug: yangtze12Slug,
  days: 12,
  nights: 11,
  servicePolicy,
  includesDomesticFlights: true,
  title: l(
    "Beijing, Xi'an, Yangtze Cruise & Shanghai: 12-Day Private Tour",
    "北京·西安·长江游轮·上海 12 天 11 晚私家团",
    "베이징·시안·양쯔강 크루즈·상하이 12일 프라이빗 투어",
  ),
  metadataTitle: l(
    "12-Day China Tour with Yangtze Cruise: Beijing to Shanghai",
    "北京西安长江三峡上海12天私家团",
    "양쯔강 크루즈 포함 중국 12일 프라이빗 투어",
  ),
  metadataDescription: l(
    "12-day private tour with a 3-night Yangtze cruise: Beijing, Xi'an, Three Gorges, Shanghai. Per person USD 3,590 for 2 travellers, 2,890 for 6.",
    "12 天私家团含三晚长江游轮：北京、西安、三峡与上海。每人价格：2 人同行 ¥23,330，6 人同行 ¥18,780。",
    "3박 양쯔강 크루즈 포함 12일 프라이빗 투어: 베이징, 시안, 삼협, 상하이. 1인 요금 2명 ₩5,020,000, 6명 ₩4,040,000.",
  ),
  eyebrow: l(
    "The Three Gorges in twelve days",
    "12 天里放进三峡",
    "12일 안에 담은 삼협",
  ),
  lede: l(
    "This 12-day Beijing–Xi’an–Yangtze–Shanghai private tour starts at USD 3,590 per person for two sharing a twin room and a standard balcony cabin; international flights are extra. It keeps the three-night downstream cruise from Chongqing to Yichang and leaves out Chengdu, which is what the 17-day version adds.",
    "北京、西安、长江到上海的 12 天私家团，2 人同行、酒店两人一间并住标准阳台舱，每人 ¥23,330 起，不含国际机票。重庆到宜昌三晚下水游轮保留，成都拿掉；成都放在 17 天版本里。",
    "베이징·시안·양쯔강·상하이 12일 프라이빗 투어는 2명, 호텔 2인 1실과 기본 발코니 객실 기준 1인 ₩5,020,000부터이며 국제선은 별도입니다. 충칭에서 이창까지 내려가는 3박 크루즈는 그대로 두고 청두는 넣지 않았습니다. 청두는 17일 일정에 들어 있습니다.",
  ),
  summary: l(
    "Of the 11 nights, eight are in breakfast-included hotels and three are aboard the ship. The price covers private local guides and vehicles on land touring days, transfers, named tickets, the Beijing–Xi’an train, the Xi’an–Chongqing flight, the cruise with onboard meals and three included shore visits, the train or flight from Yichang to Shanghai, and the Suzhou day trip.",
    "11 晚中，8 晚住含早酒店，3 晚住船上。陆上游览日的当地私人导游和车、接送、所列门票、北京到西安高铁、西安飞重庆航班、含船上餐食和三处岸上游览的游轮、宜昌到上海的火车或航班，以及苏州一日都含。",
    "11박 중 조식 포함 호텔이 8박, 선상 숙박이 3박입니다. 육상 관광일의 도시별 전용 가이드와 차량, 이동, 명시된 입장권, 베이징–시안 고속철도, 시안–충칭 항공편, 선상 식사와 육상 관광 세 곳이 포함된 크루즈, 이창–상하이 열차 또는 항공편, 쑤저우 당일 일정이 포함됩니다.",
  ),
  highlights: lists(
    [
      "A three-night downstream Three Gorges cruise",
      "Qutang and Wu Gorges, the Lesser Three Gorges and the Three Gorges Dam",
      "The Terracotta Warriors and the Great Wall",
      "A Suzhou garden day from Shanghai",
    ],
    [
      "三晚长江三峡下水游轮",
      "瞿塘峡、巫峡、小三峡与三峡大坝",
      "兵马俑和长城",
      "从上海去苏州看园林一天",
    ],
    [
      "3박 양쯔강 삼협 하행 크루즈",
      "구당협·무협·소삼협과 삼협댐",
      "병마용과 만리장성",
      "상하이에서 가는 쑤저우 정원 하루",
    ],
  ),
  itinerary: [
    arriveBeijing(1, "private"),
    forbiddenCity(2),
    greatWall(3, "hutong"),
    trainToXian(4),
    terracottaAndWall(5),
    flyXianToChongqingAndBoard(6),
    onTheYangtze(7),
    quTangAndWuGorges(8),
    damThenFlyToShanghai(9),
    bundAndYuGarden(10),
    suzhouDayTrip(11),
    departShanghai(12, "private"),
  ],
  hotelNote: l(
    "Of 11 nights, eight are in breakfast-included hotels at the four-star standard (4 diamonds on Trip.com/Ctrip): Beijing 3, Xi’an 2 and Shanghai 3. The other three are in a standard balcony cabin on a five-star-rated Yangtze ship, normally with Gold Cruises. On the lowest cabin deck the balcony may be glassed in; a higher deck costs a little more. Hotel rooms are twin share; the ship, deck and cabin are set for the sailing date.",
    "11 晚里，8 晚住含早的携程 4 钻标准酒店：北京 3 晚、西安 2 晚、上海 3 晚。另 3 晚住五星级长江游轮的标准阳台舱，通常订长江黄金游轮。最低一层舱房的阳台可能是封闭玻璃窗，住高一层要稍加钱。酒店默认两人一间，船名、楼层和舱房按航期确认。",
    "11박 중 조식 포함 씨트립 4다이아 등급 호텔이 8박입니다. 베이징 3박, 시안 2박, 상하이 3박입니다. 나머지 3박은 5성급 양쯔강 크루즈의 기본 발코니 객실이며 보통 골드 크루즈를 이용합니다. 가장 낮은 객실층은 발코니가 유리로 막혀 있을 수 있고 높은 층은 요금이 조금 더 붙습니다. 호텔은 2인 1실이며 선박, 층과 객실은 운항일에 맞춰 정합니다.",
  ),
  serviceNote: l(
    "Included: an English-speaking local guide and vehicle for your party in each city on land touring days, all transfers, named first admissions, the second-class train Beijing–Xi'an, the economy flight Xi'an–Chongqing, the cruise cabin with meals from dinner on boarding night to breakfast on the last morning and three shore visits (usually Fengdu Ghost City, the Lesser Three Gorges and the Three Gorges Dam), the train or economy flight Yichang–Shanghai and the Shanghai–Suzhou return train. Cruise commentary follows the ship's language programme. Guides work city by city: on train and flight days, a driver takes you to the station or airport and another meets you on arrival. Korean-speaking guides can be arranged on land at the same price, subject to availability in each city.",
    "包含：陆上每座城市游览日只服务你们的当地导游与用车，全部接送，所列首道门票，北京—西安二等座高铁，西安—重庆经济舱航班，游轮舱房、从登船晚餐到离船早餐的船上餐食与三处岸上游览（通常是丰都鬼城、小三峡和三峡大坝），宜昌—上海火车或经济舱航班，以及上海—苏州往返高铁；游轮讲解语种以船方安排为准，陆上导游语种按订单确认。",
    "육상 관광일마다 도시별 한국어 현지 가이드와 전용 차량, 모든 이동, 명시된 기본 입장권, 베이징–시안 고속철도 2등석, 시안–충칭 이코노미 항공편, 크루즈 객실과 승선일 저녁부터 마지막 날 아침까지의 선상 식사, 육상 관광 세 곳(보통 펑두 귀성·소삼협·삼협댐), 이창–상하이 열차 또는 이코노미 항공편, 상하이–쑤저우 왕복 고속철도가 포함됩니다. 크루즈 해설 언어는 선박 프로그램에 따르며, 가이드는 도시별로 배정되고 열차·항공 이동일에는 기사가 역이나 공항까지 모시고 도착지에서 다른 기사가 맞이합니다. 육상 한국어 가이드는 추가 요금 없이 배정하며 도시별 가능 여부를 확인합니다.",
  ),
  exclusions: exclusions(
    ["Single-room and single-cabin supplements (a cabin for one is charged at close to twice the shared per-person cruise fare)", "Cruise gratuities, paid shore options sold on board (such as White Emperor City and the dam's ship lift) and cabin upgrades", "Peak-date cruise surcharges above the base balcony cabin"],
    ["单房差与单人舱差价（一人住一间舱，船费接近两人同住时每人价的两倍）", "游轮服务费、船上另卖的自费项目（如白帝城、升船机）与舱房升级", "旺季航期高于基础阳台舱的差价"],
    ["1인실·1인 선실 추가금(혼자 쓰는 선실은 2인 1실 1인 크루즈 요금의 두 배 가까이 받습니다)", "크루즈 봉사료, 배에서 파는 유료 선택 관광(백제성, 삼협댐 선박 리프트 등)과 객실 업그레이드", "성수기 운항 시 기본 발코니 객실 대비 차액"],
    { cruise: true },
  ),
  bookingNote: l(
    "Published amounts are per-person starting prices for the stated group size, sharing twin rooms and a standard balcony cabin. Cruise fares change by ship and sailing date, so the land days are fitted around a confirmed sailing, and the ship, cabin and any peak-date difference are confirmed in writing with the final total before payment. We also request passport details before the Forbidden City and Terracotta Warriors tickets open.",
    "页面所列价格为对应人数、两人一间并住标准阳台舱的每人起价。游轮价格随船和航期变化，陆上日期围绕确认的船期排；船名、舱房及旺季差价会和最终总价一起在付款前书面确认。故宫和兵马俑门票开放预约前，我们也会收护照信息。",
    "표시 금액은 명시된 인원이 2인 1실과 기본 발코니 객실을 쓸 때의 1인 시작가입니다. 크루즈 요금은 선박과 운항일에 따라 달라서 육상 일정은 확정된 운항일에 맞추고, 선박, 객실과 성수기 차액은 최종 금액과 함께 결제 전에 서면으로 확인합니다. 자금성과 병마용 발권 전에는 여권 정보도 요청합니다.",
  ),
  faq: [
    faq(
      l("How much is a 12-day China tour with a Yangtze cruise?", "带长江游轮的 12 天中国行多少钱？", "양쯔강 크루즈가 있는 12일 중국 여행은 얼마인가요?"),
      l(
        "The 12-day Beijing–Xi’an–Yangtze–Shanghai private tour is USD 3,590 each for two sharing hotel rooms and a standard balcony cabin, USD 7,180 together. Four pay USD 3,050 each and six pay USD 2,890. Eight breakfast hotel nights, a three-night cruise with onboard meals and its included shore visits, land guides and vehicles, tickets, trains and two domestic transfers are included. International flights and land lunches and dinners are extra, and peak sailings can cost more.",
        "北京、西安、长江到上海的 12 天私家团，2 人住一间并用标准阳台舱，每人 ¥23,330，两人共 ¥46,660。4 人每人 ¥19,820，6 人每人 ¥18,780。8 晚早餐酒店、三晚游轮及船上餐食和已含岸上项目、陆上导游与车、门票、高铁和两段国内转场都含。国际机票和陆上午晚餐另付，旺季船期可能加价。",
        "베이징·시안·양쯔강·상하이 12일 프라이빗 투어는 호텔 2인 1실과 기본 발코니 객실 기준 2명이면 1인 ₩5,020,000, 합계 ₩10,040,000입니다. 4명은 1인 ₩4,270,000, 6명은 ₩4,040,000입니다. 조식 포함 호텔 8박, 선상 식사와 포함 육상 관광이 있는 크루즈 3박, 육상 가이드와 차량, 입장권, 고속철도와 국내 이동 2구간이 포함됩니다. 국제선과 육상 중식·석식은 별도이고 성수기 운항은 요금이 높을 수 있습니다.",
      ),
    ),
    faq(
      l("Should I choose the 12-day or the 17-day Yangtze tour?", "长江线选 12 天还是 17 天？", "양쯔강 일정은 12일과 17일 중 무엇이 좋을까요?"),
      l(
        "Both use the same three-night Chongqing–Yichang cruise. The 12-day Beijing–Xi’an–Yangtze–Shanghai tour, from USD 3,590 each for two, flies from Xi’an straight to Chongqing on boarding day. The 17-day version, from USD 4,690, adds Chengdu’s pandas, a Temple of Heaven day, a night in Chongqing and a free Shanghai afternoon. Pick the 12-day route if your time off is short, and the 17-day route if you want the pandas.",
        "两条线用的都是重庆到宜昌三晚的游轮。北京、西安、长江到上海 12 天线，2 人同行每人 ¥23,330 起，登船当天从西安直接飞重庆。17 天版本每人 ¥30,480 起，多了成都大熊猫、天坛一天、重庆一晚和上海半天空闲。假期短就选 12 天，想看熊猫就选 17 天。",
        "두 일정 모두 충칭–이창 3박 크루즈를 탑니다. 베이징·시안·양쯔강·상하이 12일 일정은 2명 기준 1인 ₩5,020,000부터이며 승선일에 시안에서 충칭으로 바로 갑니다. 17일 일정은 ₩6,560,000부터이며 청두 판다, 천단 하루, 충칭 1박, 상하이 자유 오후가 더해집니다. 휴가가 짧으면 12일, 판다를 보고 싶으면 17일을 고르세요.",
      ),
    ),
    faq(
      l("When does the 12-day Yangtze tour run?", "12 天长江线什么时候能走？", "12일 양쯔강 일정은 언제 가능한가요?"),
      l(
        "The 12-day Beijing–Xi’an–Yangtze–Shanghai private tour follows the Chongqing–Yichang sailings. In the 2026 timetable of Gold Cruises, the line we normally book, ships leave Chongqing five or six evenings a week from late March to mid-December, with only a few sailings in late February, early March and late December and none in January. You board on Day 6, so most start days work once the 2027 timetable is out. April–May and September–October are usually the most comfortable; July and August are hot in Chongqing.",
        "北京、西安、长江到上海 12 天私家团跟着重庆到宜昌的船期走。按我们常用的长江黄金游轮 2026 年船期，3 月下旬到 12 月中旬每周有 5–6 个晚上从重庆开船，2 月底、3 月上旬和 12 月下旬只有少数几班，1 月停航。你第 6 天登船，等 2027 年船期公布后，多数出发日都能排上。4–5 月和 9–10 月通常最舒服，7、8 月重庆很热。",
        "베이징·시안·양쯔강·상하이 12일 프라이빗 투어는 충칭–이창 운항일에 맞춥니다. 저희가 주로 이용하는 골드 크루즈의 2026년 운항표를 보면 3월 하순부터 12월 중순까지 주 5~6회 저녁에 충칭을 출발하고, 2월 말·3월 초와 12월 하순에는 몇 편뿐이며 1월에는 운항하지 않습니다. 6일 차에 승선하므로 2027년 운항표가 나오면 대부분의 출발일이 가능합니다. 4~5월과 9~10월이 보통 가장 쾌적하고 7~8월 충칭은 덥습니다.",
      ),
    ),
    faq(
      l("What if the flight to Chongqing is late?", "飞重庆的航班晚点怎么办？", "충칭행 항공편이 늦으면 어떻게 하나요?"),
      l(
        "On the 12-day Beijing–Xi’an–Yangtze–Shanghai tour we book a morning flight from Xi’an. Boarding opens at about 18:00 and the ship sails at about 21:00, so there are several hours in hand. If a delay still puts boarding at risk, we tell you straight away and work through the options with the cruise company; what is possible depends on the ship. Travel insurance that covers missed connections is worth having for this day.",
        "12 天长江线从西安订的是上午的航班。游轮约 18:00 开始登船、约 21:00 开船，中间有好几个小时余量。万一延误影响登船，我们会马上告诉你，并和游轮公司商量办法，能怎么处理要看船方。这一天最好有含航班延误的旅行保险。",
        "베이징·시안·양쯔강·상하이 12일 일정은 시안에서 오전 항공편을 예약합니다. 승선은 약 18:00부터이고 배는 약 21:00에 출발하므로 몇 시간 여유가 있습니다. 그래도 지연으로 승선이 어려우면 바로 알리고 크루즈 회사와 방법을 찾으며, 가능한 방법은 선박에 따라 다릅니다. 이날을 위해 연결 지연을 보장하는 여행자 보험을 권합니다.",
      ),
    ),
  ],
  heroImage: image(
    yangtze12Slug,
    "hero.webp",
    l("Chongqing skyline across the river at sunset", "日落时江对岸的重庆", "해 질 녘 강 건너 충칭 스카이라인"),
    l("On Day 6 you fly into Chongqing and board the ship that evening.", "第 6 天飞到重庆，晚上上船。", "6일 차에 충칭에 도착해 저녁에 배에 오릅니다."),
  ),
  gallery: [
    image(
      yangtze12Slug,
      "gallery-1.webp",
      l("Chongqing bridges lit at night", "夜里亮灯的重庆大桥", "밤에 불 켜진 충칭의 다리"),
      l("Before boarding, there is an afternoon for the monorail and Hongyadong.", "登船前，下午可以看轻轨和洪崖洞。", "승선 전 오후에 모노레일과 훙야둥을 봅니다."),
    ),
  ],
  routeMedia: [
    {
      day: 2,
      variants: [{
        label: l("Beijing", "北京", "베이징"),
        image: image(
          yangtze12Slug,
          "route-day-2.webp",
          l("Corner tower of the Forbidden City", "故宫角楼", "자금성 각루"),
          l("Beijing comes first, with three nights before the train to Xi’an.", "先在北京住 3 晚，再坐高铁去西安。", "베이징에서 3박한 뒤 열차로 시안에 갑니다."),
        ),
      }],
    },
    {
      day: 10,
      variants: [{
        label: l("Shanghai", "上海", "상하이"),
        image: image(
          yangtze12Slug,
          "route-day-10.webp",
          l("Lujiazui towers at night", "夜里的陆家嘴高楼", "밤의 루자쭈이 고층 빌딩"),
          l("The last three nights are in Shanghai, with one day in Suzhou.", "最后 3 晚住上海，其中一天去苏州。", "마지막 3박은 상하이이며 하루는 쑤저우에 갑니다."),
        ),
      }],
    },
  ],
  packages: [privatePackage([usd(2, 3590), usd(4, 3050), usd(6, 2890)])],
  datePublished: PUBLISHED,
  dateModified: MODIFIED,
};

export const privateTourLongHaulProducts: readonly PrivateTourProduct[] = Object.freeze([
  classicPrivate,
  classicSmallGroup,
  landscapes,
  landscapesSmallGroup,
  yangtzeLongHaul,
  yangtzeSmallGroup,
  silkRoadLongHaul,
  silkRoadSmallGroup,
  yunnanLongHaul,
  huangshanLongHaul,
  grandChina,
  classicTen,
  beijingJiangnan,
  southLandscapes,
  goldenTriangleEight,
  hongKongExitTen,
  yangtzeTwelve,
]);

export const privateTourLongHaulSlugs = Object.freeze([
  classicPrivateSlug,
  classicGroupSlug,
  landscapesSlug,
  landscapesGroupSlug,
  yangtzeSlug,
  yangtzeGroupSlug,
  silkRoadSlug,
  silkRoadGroupSlug,
  yunnanSlug,
  huangshanSlug,
  grandChinaSlug,
  classic10Slug,
  jiangnanSlug,
  southSlug,
  goldenTriangle8Slug,
  hongKongExit10Slug,
  yangtze12Slug,
] as const);
