import type {
  LocalizedStringList,
  LocalizedText,
  PrivateTourDay,
  PrivateTourImage,
  PrivateTourProduct,
  PrivateTourRouteMediaGroup,
} from "./privateTourProducts";
import type { PrivateTourPhotoCredit } from "./privateTourPhotoCredits";

const l = (en: string, zh: string, ko: string): LocalizedText => ({ en, zh, ko });
const lists = (
  en: readonly string[],
  zh: readonly string[],
  ko: readonly string[],
): LocalizedStringList => ({ en, zh, ko });
const day = (dayNumber: number, title: LocalizedText, description: LocalizedText): PrivateTourDay => ({
  day: dayNumber,
  title,
  description,
});
const photo = (
  src: string,
  width: number,
  height: number,
  alt: LocalizedText,
  caption: LocalizedText,
  objectPosition = "50% 50%",
): PrivateTourImage => ({ src, width, height, objectPosition, alt, caption });
const routePhoto = (
  dayNumber: number,
  label: LocalizedText,
  image: PrivateTourImage,
): PrivateTourRouteMediaGroup => ({ day: dayNumber, variants: [{ label, image }] });

const slug = "suzhou-tongli-hangzhou-shanghai-12-day-private-tour";

const westLakePhoto = photo(
  "/images/home/hangzhou-1600.jpg",
  1600,
  1066,
  l("West Lake water and wooded hills in Hangzhou", "杭州西湖湖面与远山", "항저우 서호의 물과 숲이 우거진 산"),
  l(
    "Two nights in Hangzhou leave time to explore West Lake and the nearby tea hills.",
    "杭州连住两晚，为西湖与附近茶山留出时间。",
    "항저우에서 2박하며 서호와 인근 차밭을 살펴볼 시간을 남깁니다.",
  ),
);
const bundPhoto = photo(
  "/images/destinations/shanghai/bund-architecture-1200.webp",
  1200,
  750,
  l("Historic buildings along Shanghai's Bund", "上海外滩沿线的历史建筑", "상하이 와이탄의 역사 건축물"),
  l(
    "Shanghai closes the route with its historic waterfront and modern city across the river.",
    "行程以外滩历史建筑和黄浦江对岸的新城收尾。",
    "상하이에서는 와이탄의 역사 건축과 강 건너 현대 도시를 함께 봅니다.",
  ),
);
const pudongPhoto = photo(
  "/images/tours/shanghai-suzhou-5-day-private-tour/shanghai-skyline-1600.webp",
  1600,
  1000,
  l("Modern towers in Shanghai's Pudong skyline at dusk", "黄昏时上海浦东的现代高楼", "해 질 무렵 상하이 푸둥의 고층 건물"),
  l(
    "The later Shanghai days connect the older districts with Pudong's planned skyline.",
    "行程后段把上海老街区与浦东新城连起来看。",
    "상하이 후반 일정에서는 옛 동네와 계획적으로 개발된 푸둥의 스카이라인을 함께 봅니다.",
  ),
);

/** The public route is adapted from a dated private proposal; prices and rooms are requoted. */
export const jiangnanArtPrivateTour: PrivateTourProduct = {
  id: "private-tour-suzhou-tongli-hangzhou-shanghai-12d11n",
  slug,
  days: 12,
  nights: 11,
  routePhotoFallback: false,
  servicePolicy: { shoppingStops: false, addedServicesRequirePriorAgreement: true },
  title: l(
    "Suzhou, Tongli, Hangzhou & Shanghai: 12-Day Private Tour",
    "苏州·同里·杭州·上海 12 天 11 晚私家团",
    "쑤저우·퉁리·항저우·상하이 12일 프라이빗 투어",
  ),
  metadataTitle: l(
    "Suzhou, Tongli, Hangzhou & Shanghai: 12-Day Private Tour",
    "苏州同里杭州上海 12 天私家团｜园林、水乡与西湖",
    "쑤저우·퉁리·항저우·상하이 12일 프라이빗 투어",
  ),
  metadataDescription: l(
    "Suzhou gardens, a Tongli overnight stay, Hangzhou's West Lake and tea hills, and old and new Shanghai on an 11-night private tour. Quote by date.",
    "江南 12 天 11 晚私家路线：苏州园林、同里住一晚、杭州西湖与茶山、上海老城与现代街区。按日期和房间需求询价。",
    "쑤저우 정원, 퉁리 1박, 항저우 서호와 차밭, 상하이의 옛 거리와 현대 도시를 잇는 11박 프라이빗 일정. 날짜별 견적.",
  ),
  eyebrow: l(
    "Gardens, a water town, tea hills and Shanghai",
    "园林、水乡、茶山，再到上海",
    "정원과 수향마을, 차밭을 지나 상하이까지",
  ),
  lede: l(
    "Begin with Suzhou's gardens, sleep inside Tongli, follow the Grand Canal and West Lake in Hangzhou, then see how Shanghai recast Jiangnan's architecture and commerce.",
    "从苏州园林开始，在同里住一晚，经杭州大运河、西湖和茶山，再到上海理解江南传统如何走进现代城市。",
    "쑤저우 정원에서 시작해 퉁리에서 하룻밤을 보내고, 항저우 대운하와 서호를 거쳐 상하이에서 강남의 전통이 현대 도시로 이어지는 모습을 봅니다.",
  ),
  summary: l(
    "A 12-day, 11-night private journey in one direction: Suzhou 3 nights, Tongli 1, Hangzhou 2 and Shanghai 5. The route has eight full guided days, a half-day in Tongli and one open day in Shanghai; the final services and price are confirmed for your dates.",
    "单向串起苏州 3 晚、同里 1 晚、杭州 2 晚、上海 5 晚。路线安排 8 个全天导览日、同里半天导览，以及上海 1 天自由活动；实际服务与总价按你的日期书面确认。",
    "쑤저우 3박, 퉁리 1박, 항저우 2박, 상하이 5박으로 이어지는 12일 일정입니다. 전일 가이드 8일, 퉁리 반일 가이드와 상하이 자유일 1일로 구성하며, 실제 서비스와 가격은 날짜에 맞춰 서면으로 확정합니다.",
  ),
  highlights: lists(
    [
      "Read Suzhou's classical gardens with a local guide",
      "Stay overnight in Tongli, beyond a brief water-town stop",
      "Walk Hangzhou's Grand Canal, West Lake and tea hills",
      "Trace old-city, Bund, Hongkou and Pudong stories in Shanghai",
      "Keep a full open day in Shanghai for your own interests",
    ],
    [
      "由当地导游带着读懂苏州古典园林",
      "同里住一晚，留出傍晚与清晨看水乡",
      "杭州走大运河、西湖与茶山",
      "从老城、外滩、虹口到浦东看上海的变化",
      "上海留出完整一天按自己的兴趣安排",
    ],
    [
      "현지 가이드와 쑤저우 전통 정원을 깊이 살펴보기",
      "퉁리에서 하룻밤을 머무는 수향마을 일정",
      "항저우 대운하·서호·차밭 걷기",
      "상하이 구시가·와이탄·훙커우·푸둥의 변화 읽기",
      "상하이에서 온전히 자유롭게 쓰는 하루",
    ],
  ),
  itinerary: [
    day(1, l("Arrive at Hongqiao; transfer to Suzhou", "抵达虹桥，前往苏州", "훙차오 도착, 쑤저우 이동"), l(
      "Meet your driver at Shanghai Hongqiao and travel to Suzhou. Check in and rest; if arrival time allows, walk the canalside lanes of Pingjiang Road. A Pudong arrival can be quoted as a route adjustment.",
      "司机在上海虹桥接站或接机，送往苏州入住休息。若抵达时间合适，可在平江路沿河街巷散步；从浦东抵达也可另行调整接送并报价。",
      "상하이 훙차오에서 기사를 만나 쑤저우로 이동합니다. 체크인 후 시간이 남으면 핑장루 운하 골목을 걷습니다. 푸둥 도착은 이동 구성을 조정해 별도 견적을 드립니다.",
    )),
    day(2, l("The Humble Administrator's Garden and Suzhou Museum", "拙政园与苏州博物馆", "졸정원과 쑤저우 박물관"), l(
      "Start at the Humble Administrator's Garden as early as the confirmed opening permits. Visit Suzhou Museum for its architecture and Wu-school art, then walk Pingjiang Road. A short canal boat can be included when operating and agreed in the final plan; an evening Kunqu or pingtan performance is an extra option.",
      "按确认后的开放时间尽早游览拙政园，再到苏州博物馆看建筑与吴门绘画，下午步行平江路。若游船运营并写入最终行程，可安排短途坐船；晚间昆曲或评弹演出可另加。",
      "확정된 개장 시간에 맞춰 졸정원을 일찍 방문하고 쑤저우 박물관에서 건축과 오파 회화를 봅니다. 오후에는 핑장루를 걷습니다. 운항 중인 짧은 운하 보트는 최종 일정에 포함해 조정할 수 있으며, 저녁 곤극·평탄 공연은 별도 선택입니다.",
    )),
    day(3, l("Yipu and everyday Suzhou", "艺圃与苏州日常街巷", "이포와 쑤저우의 일상"), l(
      "Visit Yipu, the Garden of Cultivation, and pause at its teahouse. Choose Canglang Pavilion or Shantang Street with your guide, then explore the small Kunqu and Pingtan museums and the Guanqian Street–Xuanmiao Temple area, subject to opening hours.",
      "游览艺圃，在园中茶室停一停；与导游商量选沧浪亭或山塘街。下午看昆曲、评弹两座小博物馆，再走观前街与玄妙观一带，具体以开放情况为准。",
      "이포(예포)를 둘러보고 찻집에서 잠시 쉽니다. 가이드와 상의해 창랑정 또는 산탕제 중 한 곳을 고른 뒤 곤극·평탄 박물관과 관첸제·현묘관 일대를 방문합니다. 개관 여부에 따라 순서를 조정합니다.",
    )),
    day(4, l("Tongli: stay inside the water town", "同里：在水乡住一晚", "퉁리: 수향마을에서 1박"), l(
      "Drive from Suzhou to Tongli. With a half-day local guide, see Tuisi Garden, the three bridges and an old merchant house, and take the planned canal boat if operating. Stay in town for its evening and early morning; dinner in Tongli is included.",
      "从苏州驱车到同里。当地导游半天带你看退思园、三桥与一处旧商宅，并在游船运营时乘坐行程内的小船。当天住在古镇，留出傍晚与清晨；包含一顿同里晚餐。",
      "쑤저우에서 퉁리로 이동합니다. 현지 가이드와 반나절 동안 퇴사원, 세 다리와 옛 상인 가옥을 보고, 운항 시 일정에 포함된 운하 보트를 탑니다. 마을 안에서 1박해 저녁과 이른 아침을 보내며 퉁리 석식 한 번이 포함됩니다.",
    )),
    day(5, l("Hangzhou and the working Grand Canal", "杭州：作为生活水道的大运河", "항저우와 생활의 수로 대운하"), l(
      "Travel by private vehicle to Hangzhou. Spend the afternoon around Gongchen Bridge, Qiaoxi and Xiaohe Street, following the Grand Canal's warehouses, waterside homes and trading lanes.",
      "专车前往杭州，下午走拱宸桥、桥西与小河直街，看大运河沿线的仓库、河边民居和旧时商贸街巷。",
      "전용 차량으로 항저우로 이동합니다. 오후에는 궁천교, 차오시와 샤오허제를 걸으며 대운하의 창고, 물가 주택과 옛 상업 골목을 살펴봅니다.",
    )),
    day(6, l("West Lake and the Longjing tea hills", "西湖与龙井茶山", "서호와 룽징 차밭"), l(
      "Walk from Broken Bridge along Bai Causeway to Solitary Hill and Xiling Seal Society, take the planned lake boat if operating, and continue along part of Su Causeway. After lunch, visit the tea hills near Wengjiashan and Longjing village, a grower's home when available, and the China National Tea Museum. One Hangzhou dinner is included. Tea picking is seasonal and is not promised.",
      "从断桥沿白堤步行到孤山、西泠印社；游船运营时乘坐行程内的西湖船，再走一段苏堤。午后到翁家山、龙井村一带茶山，在可安排时拜访茶农，并参观中国茶叶博物馆。包含一顿杭州晚餐；采茶随季节而定，不作保证。",
      "단교에서 백제를 따라 고산과 서령인사까지 걷고, 운항 시 일정에 포함된 서호 보트를 탄 뒤 소제 일부를 걷습니다. 오후에는 웡자산과 룽징 마을 인근 차밭, 가능한 경우 차 농가, 중국 차 박물관을 찾습니다. 항저우 석식 한 번이 포함되며 찻잎 따기는 계절에 따라 달라집니다.",
    )),
    day(7, l("Fast train to Shanghai; old city and Yu Garden", "高铁到上海：老城与豫园", "고속철로 상하이 이동, 구시가와 예원"), l(
      "Take the fast train from Hangzhou to Shanghai, with private transfers arranged at each end. Spend the afternoon in the old walled-city area and Yu Garden, comparing its merchant setting with Suzhou's scholar gardens.",
      "乘高铁从杭州前往上海，两端安排私车接送。下午走老城厢并参观豫园，对照它的商埠背景与苏州文人园林。",
      "항저우에서 고속철로 상하이에 가며 양쪽 역 이동은 전용 차량으로 잇습니다. 오후에는 옛 성곽 도시 구역과 예원을 방문해 상업 도시의 정원과 쑤저우 문인 정원을 비교합니다.",
    )),
    day(8, l("Former French Concession and the Bund's buildings", "梧桐街区与外滩建筑", "옛 프랑스 조계지와 와이탄 건축"), l(
      "Walk Wukang Road, Sinan Road and lived-in lilong lanes around Bugaoli and Jianyeli, then make a brief stop in Xintiandi. At the Bund, look beyond the promenade to its building histories; access to interiors such as the Peace Hotel, the former HSBC hall and the former Shanghai Club is checked for your date.",
      "步行武康路、思南路与步高里、建业里附近仍有人生活的里弄，在新天地短暂停留。下午不只看外滩江景，也了解建筑内外的历史；和平饭店、原汇丰银行大厅与原上海总会等内部空间能否进入，按出行日期核对。",
      "우캉루·쓰난루와 부가오리·젠예리 주변 리룽 골목을 걷고 신톈디에 잠깐 들릅니다. 오후에는 와이탄의 강변뿐 아니라 건물의 역사도 살펴봅니다. 피스 호텔, 옛 HSBC 홀, 옛 상하이 클럽 등의 내부 출입은 여행 날짜에 맞춰 확인합니다.",
    )),
    day(9, l("Hongkou's Jewish refuge history", "虹口：犹太难民与街区历史", "훙커우의 유대인 피난 역사"), l(
      "Visit the Shanghai Jewish Refugees Museum and walk Zhoushan Road, Huoshan Park and Tilanqiao. Continue to Shanghai History Museum to connect the neighbourhood's story with the city's wider changes. Museum access and sequence are confirmed for the date.",
      "参观上海犹太难民纪念馆，步行舟山路、霍山公园和提篮桥；再到上海市历史博物馆，把街区故事放进城市发展脉络。开放情况与参观顺序按日期确认。",
      "상하이 유대인 난민 박물관을 방문하고 저우산루, 훠산공원과 티란차오를 걷습니다. 이어 상하이 역사박물관에서 이 동네의 이야기를 도시 변화와 연결합니다. 개관과 방문 순서는 날짜별로 확인합니다.",
    )),
    day(10, l("Shanghai Museum East, Pudong and the Bund after dark", "上海博物馆东馆、浦东与夜外滩", "상하이 박물관 동관·푸둥·밤의 와이탄"), l(
      "Explore selected Jiangnan-related collections at Shanghai Museum East, then cross Pudong to understand its modern planning. If visibility and tickets suit your day, add an observation-deck stop at Top of Shanghai. End with an evening walk on the Bund; the deck visit is confirmed in the final quote.",
      "在上海博物馆东馆选看与江南相关的展品，再到浦东理解现代城区规划。若当天能见度与门票条件合适，可加入上海之巅观景；夜晚步行外滩。观景台是否纳入，以最终报价确认为准。",
      "상하이 박물관 동관에서 강남과 관련된 소장품을 골라 보고, 푸둥으로 이동해 현대 도시 계획을 살펴봅니다. 날씨와 티켓이 맞으면 상하이 타워 전망대를 더할 수 있습니다. 밤에는 와이탄을 걷고 전망대 포함 여부는 최종 견적에서 확인합니다.",
    )),
    day(11, l("An open day in Shanghai", "上海自由活动日", "상하이 자유일"), l(
      "Keep the day for your own interests. One self-guided idea is the Yangpu riverfront's former industrial stretch. A guide and car can be added only if requested and quoted separately; there is no fixed sightseeing today.",
      "这一天按自己的兴趣安排；若想散步，可自行走杨浦滨江的旧工业沿线。导游与车辆只在提出需求并另行报价后添加，当天没有固定景点。",
      "하루를 자유롭게 씁니다. 스스로 걷기 좋은 선택지로 옛 산업시설이 남은 양푸 강변이 있습니다. 가이드와 차량은 요청 후 별도 견적에만 추가하며 고정 관광은 없습니다.",
    )),
    day(12, l("Depart from Shanghai Pudong", "上海浦东送机", "상하이 푸둥 출발"), l(
      "Check out and travel by private vehicle to Shanghai Pudong Airport. The pickup time follows your confirmed flight; no sightseeing is fixed on departure day.",
      "退房后乘私车前往上海浦东机场，接送时间按确认航班安排；返程日不设固定游览。",
      "체크아웃 후 전용 차량으로 상하이 푸둥 공항으로 이동합니다. 픽업 시간은 확정된 항공편에 맞추며 출발일에는 고정 관광이 없습니다.",
    )),
  ],
  hotelNote: l(
    "Suggested properties for 11 breakfast-included nights are Suzhou 3 (Yihe Songmaoju), Tongli 1 (Yinlu Tongli House), Hangzhou 2 (Canopy by Hilton Hangzhou West Lake) and Shanghai 5 (Atour S Hotel, Pudong Avenue, Lujiazui). No rooms are held by this page. We check the exact hotel, room type and rate for your dates before payment; single occupancy or room sharing is quoted to your request.",
    "11 晚含早住宿的候选酒店为：苏州 3 晚（Yihe Songmaoju）、同里 1 晚（Yinlu Tongli House）、杭州 2 晚（Canopy by Hilton Hangzhou West Lake）、上海 5 晚（Atour S Hotel, Pudong Avenue, Lujiazui）。网页并未预留房间；准确酒店、房型及价格会在付款前按日期核对，单住或同住依你的需求报价。",
    "조식 포함 11박의 후보 숙소는 쑤저우 3박(Yihe Songmaoju), 퉁리 1박(Yinlu Tongli House), 항저우 2박(Canopy by Hilton Hangzhou West Lake), 상하이 5박(Atour S Hotel, Pudong Avenue, Lujiazui)입니다. 이 페이지에서 객실을 잡아 두지는 않았습니다. 날짜별 호텔·객실·요금은 결제 전에 확인하고 1인실이나 공동 객실은 요청에 맞춰 견적을 드립니다.",
  ),
  serviceNote: l(
    "The base scope includes local English-speaking guides on eight full touring days (Days 2, 3, 5–10) and a half-day in Tongli (Day 4), private vehicles and drivers on the named touring and transfer days, the Hangzhou–Shanghai fast train, planned admissions and boats confirmed in the written itinerary, breakfast on 11 hotel nights, and two dinners (Tongli and Hangzhou). Days 1 and 12 are driver transfers; Day 11 is open. Guide language and any substitutions are agreed before payment. No shopping stops are scheduled.",
    "基础服务含 8 个全天导览日（第 2、3、5–10 天）的当地英语导游、第 4 天同里半天导游、所列游览和接送日的私车与司机、杭州至上海高铁、书面确认行程内的门票和游船、11 晚住宿早餐，以及同里和杭州各一顿晚餐。第 1、12 天为司机接送，第 11 天自由活动。导游语种和任何替换在付款前商定；无购物店安排。",
    "기본 서비스에는 전일 일정 8일(2·3·5~10일 차)의 현지 영어 가이드, 4일 차 퉁리 반일 가이드, 명시된 관광·이동일의 전용 차량과 기사, 항저우–상하이 고속철, 서면 일정에서 확정한 입장권과 보트, 호텔 11박 조식, 퉁리와 항저우 석식 각 1회가 포함됩니다. 1·12일 차는 기사 이동, 11일 차는 자유일입니다. 가이드 언어와 대체 사항은 결제 전에 협의하며 쇼핑 일정은 없습니다.",
  ),
  exclusions: lists(
    [
      "Flights, visas and travel insurance",
      "Lunches and dinners other than the two listed dinners, and drinks unless confirmed",
      "Evening shows, the Huangpu River cruise and other optional experiences",
      "A guide or private car on the open Shanghai day unless added to the written quote",
      "Tips, personal purchases and services outside the confirmed itinerary",
    ],
    [
      "机票、签证与旅行保险",
      "午餐、同里和杭州两顿指定晚餐之外的其他晚餐，以及未确认包含的饮料",
      "晚间演出、黄浦江游船及其他可选体验",
      "上海自由日的导游和私车，书面报价另加的除外",
      "小费、个人消费和确认行程外的服务",
    ],
    [
      "항공편, 비자와 여행자 보험",
      "중식, 명시된 퉁리·항저우 석식 2회를 제외한 석식, 별도 확정되지 않은 음료",
      "저녁 공연, 황푸강 유람선과 기타 선택 체험",
      "서면 견적에 추가하지 않은 상하이 자유일의 가이드와 전용 차량",
      "팁, 개인 구매와 확정 일정 밖의 서비스",
    ],
  ),
  bookingNote: l(
    "Request a date-based quote; this route has no current published price. Send your preferred dates, traveller count, rooming choice, arrival and departure details, and luggage count. We check live hotels, guides, train and attraction availability, then send the exact services and final price in writing before any payment.",
    "请按出行日期询价；这条路线目前没有公开固定价。提供意向日期、人数、房间配置、到离信息与行李数量后，我们核对酒店、导游、高铁及景点实时余量，在付款前书面确认具体服务和最终总价。",
    "여행 날짜별 견적을 요청해 주세요. 이 일정에는 현재 공개 고정 요금이 없습니다. 희망 날짜, 인원, 객실 구성, 도착·출발편과 짐 개수를 알려 주시면 호텔, 가이드, 열차와 관광지 예약 가능 여부를 확인한 뒤 결제 전에 서비스와 최종 가격을 서면으로 보내 드립니다.",
  ),
  heroImage: westLakePhoto,
  gallery: [pudongPhoto],
  routeMedia: [
    routePhoto(1, l("Pingjiang Road", "平江路", "핑장루"), photo(
      "/images/tours/shanghai-suzhou-hangzhou-6-day-private-tour/pingjiang-road-1600.webp",
      1600,
      1000,
      l("A bridge, canal and houses along Suzhou's Pingjiang Road", "苏州平江路的石桥、河道与临水民居", "쑤저우 핑장루의 다리와 운하, 물가 주택"),
      l("A Pingjiang walk is possible if your arrival time allows.", "抵达时间合适时，可在平江路散步。", "도착 시간이 허락하면 핑장루를 걸을 수 있습니다."),
    )),
    routePhoto(2, l("Humble Administrator's Garden", "拙政园", "졸정원"), photo(
      "/images/tours/shanghai-suzhou-5-day-private-tour/suzhou-humble-garden-1600.webp",
      1600,
      1000,
      l("Pavilion and pond in Suzhou's Humble Administrator's Garden", "苏州拙政园的亭子与池水", "쑤저우 졸정원의 정자와 연못"),
      l("Visit time and admission are confirmed for your travel date.", "参观时段和门票按实际出行日期确认。", "방문 시간과 입장권은 여행 날짜에 맞춰 확인합니다."),
    )),
    routePhoto(5, l("Gongchen Bridge", "拱宸桥", "궁천교"), photo(
      "/images/guides/grand-canal-everyday-urban-history/hero-1600.webp",
      1600,
      1000,
      l("Gongchen Bridge crossing the Grand Canal in Hangzhou", "杭州拱宸桥横跨大运河", "항저우 대운하를 가로지르는 궁천교"),
      l("The Hangzhou canal afternoon follows Gongchen Bridge and nearby old streets.", "杭州的大运河下午从拱宸桥延伸到周边老街。", "항저우 대운하 오후 일정은 궁천교와 주변 옛 거리를 잇습니다."),
    )),
    routePhoto(6, l("West Lake", "西湖", "서호"), westLakePhoto),
    routePhoto(8, l("The Bund", "外滩", "와이탄"), bundPhoto),
  ],
  packages: [{
    id: "private-guided",
    guideMode: "guided",
    label: l("Private guided journey — request a quote", "私人导览行程——按日期询价", "프라이빗 가이드 여행 — 날짜별 견적"),
    summary: l(
      "Eleven breakfast-included nights, the stated guide and vehicle days, Hangzhou–Shanghai fast train, agreed admissions and boats, and two dinners. Hotel names and the final total are checked for your dates.",
      "基础范围含 11 晚住宿早餐、所列导游与用车日、杭州至上海高铁、确认的门票与游船，以及两顿晚餐；酒店和最终总价按日期核对。",
      "조식 포함 11박, 명시된 가이드·차량 일정, 항저우–상하이 고속철, 확정 입장권과 보트, 석식 2회가 기본 범위입니다. 호텔과 최종 가격은 날짜별로 확인합니다.",
    ),
    quoteOnly: true,
    prices: [],
  }],
  faq: [
    {
      question: l("How is this tour priced?", "这条路线如何报价？", "이 투어 가격은 어떻게 정하나요?"),
      answer: l(
        "We quote for your actual dates, number of travellers and rooming choice after checking live availability. There is no current public fare; the final written quote comes before payment.",
        "按你的实际日期、人数与房间配置，核对实时余量后报价。目前没有公开固定价；付款前会收到最终书面报价。",
        "실제 여행 날짜, 인원과 객실 구성을 기준으로 예약 가능 여부를 확인한 뒤 견적을 드립니다. 현재 공개 고정 요금은 없으며 결제 전에 최종 서면 견적을 받습니다.",
      ),
    },
    {
      question: l("Are the suggested hotels guaranteed?", "页面所列酒店是否保证入住？", "안내된 호텔은 확정인가요?"),
      answer: l(
        "No rooms are held by this page. The four named properties show the intended style and location; we confirm availability, room type and any agreed alternative with you before payment.",
        "网页并未预留房间。四家候选酒店说明路线希望采用的住宿风格和位置；我们会在付款前与你确认余房、房型及任何商定的替代方案。",
        "이 페이지에서 객실을 미리 잡아 두지는 않았습니다. 네 후보 호텔은 원하는 위치와 스타일을 보여 주며, 결제 전에 객실 가능 여부·유형과 합의한 대안을 확인합니다.",
      ),
    },
    {
      question: l("Can I see the Longjing tea harvest?", "能看到龙井采茶吗？", "룽징 차 수확을 볼 수 있나요?"),
      answer: l(
        "Tea picking is seasonal and cannot be promised. The tea day focuses on the hills, a grower visit when available and the Tea Museum; tell us your dates if seeing a harvest matters to you.",
        "采茶具有季节性，无法保证。茶日重点是茶山、可安排时的茶农拜访与茶叶博物馆；如果采收景象对你重要，请先告诉我们出行日期。",
        "찻잎 따기는 계절에 따라 달라 보장할 수 없습니다. 차밭과 가능한 경우 농가 방문, 차 박물관에 초점을 맞추며, 수확을 보는 것이 중요하다면 여행 날짜를 먼저 알려 주세요.",
      ),
    },
    {
      question: l("What is included on the open Shanghai day?", "上海自由日包含什么？", "상하이 자유일에는 무엇이 포함되나요?"),
      answer: l(
        "Day 11 is yours to plan and has no scheduled guide or car. We can add either service if requested, with the extra cost agreed in your written quote.",
        "第 11 天由你自行安排，不预设导游或车辆。若需要，我们可在书面报价中增加并明确费用。",
        "11일 차는 자유 일정으로 가이드나 차량이 기본 포함되지 않습니다. 요청하시면 추가 비용을 서면 견적에 명시해 드립니다.",
      ),
    },
  ],
  datePublished: "2026-10-09",
  dateModified: "2026-10-09",
};

/** Credits for the three third-party route photographs reused above. */
export const jiangnanArtPrivateTourPhotoCreditsBySlug: Readonly<
  Record<string, readonly PrivateTourPhotoCredit[]>
> = {
  [slug]: [
    {
      subject: l("Pingjiang Road, Suzhou", "苏州平江路", "쑤저우 핑장루"),
      author: "kevinmcgill",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:A_stone_arch_bridge_in_Pingjiang_Road,_Suzhou.jpg",
      licenseLabel: "CC BY-SA 2.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
    },
    {
      subject: l("Humble Administrator's Garden, Suzhou", "苏州拙政园", "쑤저우 졸정원"),
      author: "Chainwit.",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Humble_Administrator%27s_Garden_Suzhou_(2024)_-_img_01.jpg",
      licenseLabel: "CC BY 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by/4.0/",
    },
    {
      subject: l("Gongchen Bridge, Hangzhou", "杭州拱宸桥", "항저우 궁천교"),
      author: "Windmemories",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:20231122_Gongchen_Bridge_01.jpg",
      licenseLabel: "CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    },
  ],
};
