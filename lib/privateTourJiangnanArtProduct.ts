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
const scene = (label: LocalizedText, image: PrivateTourImage) => ({ label, image });
const routePhoto = (
  dayNumber: number,
  ...variants: ReturnType<typeof scene>[]
): PrivateTourRouteMediaGroup => ({ day: dayNumber, variants });

const slug = "suzhou-tongli-hangzhou-shanghai-12-day-private-tour";

const pingjiangPhoto = photo(
  "/images/tours/shanghai-suzhou-hangzhou-6-day-private-tour/pingjiang-road-1600.webp",
  1600,
  1000,
  l("A stone bridge, canal and white-walled houses on Pingjiang Road, Suzhou", "苏州平江路的石桥、河道与白墙民居", "쑤저우 핑장루의 돌다리와 운하, 흰 벽의 집들"),
  l("Pingjiang Road is at its best in the last hour of daylight.", "平江路，天黑前最后一小时最好看。", "핑장루는 해 지기 전 마지막 한 시간이 가장 아름답습니다."),
);
const humbleGardenPhoto = photo(
  "/images/tours/shanghai-suzhou-5-day-private-tour/suzhou-humble-garden-1600.webp",
  1600,
  1000,
  l("A pavilion and pond in the Humble Administrator's Garden, Suzhou", "苏州拙政园的亭子与池水", "쑤저우 졸정원의 정자와 연못"),
  l("Go in as the gates open, before the tour groups.", "一开门就进，赶在旅行团前头。", "문이 열리자마자, 단체 관광객보다 먼저 들어갑니다."),
);
const suzhouMuseumPhoto = photo(
  "/images/tours/shanghai-suzhou-hangzhou-6-day-private-tour/suzhou-museum-1600.webp",
  1600,
  1000,
  l("White walls, grey frames and a pond in a courtyard of the Suzhou Museum", "苏州博物馆庭院里的白墙、灰框与水池", "쑤저우박물관 안뜰의 흰 벽과 회색 틀, 연못"),
  l("Right next door: I. M. Pei's answer to the garden.", "就在隔壁：贝聿铭给园林的回答。", "바로 옆, 정원에 대한 I. M. 페이의 대답."),
);
const yipuPhoto = photo(
  "/images/tours/suzhou-tongli-hangzhou-shanghai-12-day-private-tour/yipu-1600.webp",
  1600,
  1201,
  l("The pond at Yipu, Suzhou, with a long waterside hall across the water", "苏州艺圃的池水，对岸是一排临水的长屋", "쑤저우 예포의 연못과 건너편 물가의 긴 건물"),
  l("Yipu is small and quiet; locals come here for tea.", "艺圃小而安静，本地人来这里喝茶。", "예포는 작고 조용한 정원으로, 현지인들이 차를 마시러 옵니다."),
);
const tongliCanalPhoto = photo(
  "/images/tours/suzhou-tongli-hangzhou-shanghai-12-day-private-tour/tongli-canal-1600.webp",
  1600,
  900,
  l("Wooden boats moored along a stone-lined canal in Tongli", "同里石砌河道里停靠的木船", "퉁리의 돌 운하에 정박한 나무배들"),
  l("As day visits wind down, you stay the night.", "傍晚一日游的客人渐少，你还在镇上住一晚。", "저녁에 당일치기 방문객이 줄어들어도, 여러분은 마을에 머뭅니다."),
);
const tuisiGardenPhoto = photo(
  "/images/tours/suzhou-tongli-hangzhou-shanghai-12-day-private-tour/tongli-tuisi-1600.webp",
  1600,
  1067,
  l("Pavilions and a pond in Tuisi Garden, Tongli", "同里退思园的亭阁与池水", "퉁리 퇴사원의 누각과 연못"),
  l("Tuisi Garden, the Retreat and Reflection Garden.", "退思园，取「退思补过」之意。", "퇴사원, '물러나 돌아본다'는 뜻을 담은 정원."),
);
const jewishRefugeesMuseumPhoto = photo(
  "/images/tours/suzhou-tongli-hangzhou-shanghai-12-day-private-tour/jewish-refugees-museum-1600.webp",
  1600,
  1064,
  l("The former Ohel Moshe Synagogue seen from the courtyard of the Shanghai Jewish Refugees Museum", "从上海犹太难民纪念馆庭院看原摩西会堂", "상하이 유대인 난민 기념관 안뜰에서 본 옛 오헬 모세 회당"),
  l("The museum is in the former Ohel Moshe Synagogue, in Hongkou.", "纪念馆就在虹口的原摩西会堂里。", "기념관은 훙커우의 옛 오헬 모세 회당에 있습니다."),
);
const yangshupuWaterworksPhoto = photo(
  "/images/tours/suzhou-tongli-hangzhou-shanghai-12-day-private-tour/yangshupu-waterworks-1600.webp",
  1600,
  1195,
  l("The castle-style gatehouse of the Yangshupu Waterworks in Shanghai", "上海杨树浦水厂城堡式的大门", "상하이 양푸 상수도 공장의 성채 모양 정문"),
  l("One idea for your open day: the Yangpu riverfront, starting from the 1883 waterworks.", "自由日的一个建议：从 1883 年的杨树浦水厂开始走杨浦滨江。", "자유일 제안: 1883년 상수도 공장에서 양푸 강변 산책을 시작해 보세요."),
);
const gongchenPhoto = photo(
  "/images/guides/grand-canal-everyday-urban-history/hero-1600.webp",
  1600,
  1000,
  l("The three stone arches of Gongchen Bridge over the Grand Canal in Hangzhou", "杭州大运河上拱宸桥的三孔石拱", "항저우 대운하 위 궁천교의 세 돌 아치"),
  l("The canal afternoon begins at Gongchen Bridge.", "运河的下午，从拱宸桥开始。", "운하에서 보내는 오후는 궁천교에서 시작합니다."),
);
const brokenBridgePhoto = photo(
  "/images/tours/beijing-hangzhou-suzhou-shanghai-11-day-private-tour/route-day-6-extra.webp",
  1600,
  1000,
  l("Broken Bridge at the eastern end of Bai Causeway on a misty morning on West Lake", "薄雾中的西湖断桥，白堤东端", "옅은 안개 속 서호 백제 동쪽 끝의 단교"),
  l("Broken Bridge at 7:30, before the lake fills up.", "早上 7:30 的断桥，湖边还没热闹起来。", "아침 7시 30분의 단교, 호숫가가 붐비기 전입니다."),
);
const teaHillsPhoto = photo(
  "/images/tours/shanghai-suzhou-hangzhou-6-day-private-tour/gallery-hangzhou-tea-1600.webp",
  1600,
  1000,
  l("A stone path under old trees through tea terraces in the West Lake hills", "西湖群山里，老树下穿过茶垄的石板路", "서호 주변 산자락, 오래된 나무 아래 차밭 사이로 난 돌길"),
  l("The afternoon is for the tea hills; a grower visit is arranged if available.", "下午走茶山；能否到茶农家做客，要按日期确认。", "오후에는 차밭을 걷습니다. 차 농가 방문은 가능 여부에 따라 준비합니다."),
);
const yuGardenPhoto = photo(
  "/images/tours/shanghai-disneyland-5-day-private-tour/route-day-3.webp",
  1600,
  1068,
  l("Traditional halls and a pond in Yu Garden, Shanghai", "上海豫园的厅堂与池塘", "상하이 예원의 전통 건물과 연못"),
  l("A merchant city's garden, best seen straight after Suzhou.", "商埠里的园子，刚看完苏州再来最有味道。", "상인의 도시가 가꾼 정원, 쑤저우 바로 다음에 볼 때 가장 흥미롭습니다."),
);
const frenchConcessionPhoto = photo(
  "/images/tours/shanghai-disneyland-5-day-private-tour/route-day-4-extra.webp",
  1600,
  1000,
  l("Plane trees and old houses on Yanqing Road in Shanghai's former French Concession, photographed in 2013", "上海原法租界延庆路的梧桐与老房子（2013 年摄）", "상하이 옛 프랑스 조계지 옌칭루의 플라타너스와 옛 주택(2013년 촬영)"),
  l("The morning is a slow walk under the plane trees.", "上午在梧桐树下慢慢走。", "오전에는 플라타너스 아래를 천천히 걷습니다."),
);
const bundPhoto = photo(
  "/images/destinations/shanghai/bund-architecture-1200.webp",
  1200,
  750,
  l("The domed former HSBC building and the Custom House clock tower on Shanghai's Bund", "外滩的原汇丰银行大楼穹顶与海关钟楼", "와이탄의 옛 HSBC 건물 돔과 세관 시계탑"),
  l("In the afternoon you go inside these buildings, not just past them.", "下午走进这些大楼里面，而不只是从门前经过。", "오후에는 이 건물들 앞을 지나치는 대신 안으로 들어갑니다."),
);
const museumEastPhoto = photo(
  "/images/guides/shanghai-museum-east-entry-reservations/hero-1600.webp",
  1600,
  1000,
  l("The white exterior of Shanghai Museum East in Pudong", "浦东上海博物馆东馆的白色外观", "푸둥에 있는 상하이박물관 동관의 흰 외관"),
  l("Two hours with the ceramics, the painting and the Jiangnan crafts.", "两个小时，看陶瓷、书画和江南造物。", "도자기, 서화, 강남 공예를 두 시간 동안 봅니다."),
);
const bundNightPhoto = photo(
  "/images/tours/shanghai-suzhou-5-day-private-tour/gallery-shanghai-night-1600.webp",
  1600,
  1000,
  l("Pudong's lit towers across the Huangpu River at night", "夜色中黄浦江对岸亮灯的浦东高楼", "밤에 황푸강 건너 불을 밝힌 푸둥의 고층 빌딩"),
  l("The journey closes on foot along the Bund after dark.", "天黑后沿外滩步行，为旅程收尾。", "어두워진 뒤 와이탄을 걸으며 여정을 마무리합니다."),
);
const departurePhoto = photo(
  "/images/tours/shanghai-suzhou-5-day-private-tour/departure-shanghai-1600.webp",
  1600,
  1000,
  l("A quiet riverside terrace facing Shanghai's skyline", "面对上海天际线的安静滨江平台", "상하이 스카이라인을 바라보는 조용한 강변 테라스"),
  l("Departure day is kept clear: just the drive to Pudong Airport.", "离开当天只送机，不排别的。", "출발일에는 푸둥 공항 이동만 있습니다."),
);

const westLakePhoto = photo(
  "/images/home/hangzhou-1600.jpg",
  1600,
  1066,
  l("West Lake water and wooded hills in Hangzhou", "杭州西湖湖面与远山", "항저우 서호의 물과 숲이 우거진 산"),
  l(
    "Two nights in Hangzhou: the Grand Canal one day, West Lake and the tea hills the next.",
    "杭州住两晚：一天看大运河，一天给西湖和茶山。",
    "항저우 2박: 하루는 대운하, 다음 날은 서호와 차밭입니다.",
  ),
);
const pudongPhoto = photo(
  "/images/tours/shanghai-suzhou-5-day-private-tour/shanghai-skyline-1600.webp",
  1600,
  1000,
  l("Modern towers in Shanghai's Pudong skyline at dusk", "黄昏时上海浦东的现代高楼", "해 질 무렵 상하이 푸둥의 고층 건물"),
  l(
    "Shanghai comes last, and makes more sense for it.",
    "上海放在最后，看起来才更明白。",
    "상하이를 마지막에 두면, 이 도시가 더 잘 보입니다.",
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
    "Jiangnan, The Art of Living: 12 Days in Suzhou, Tongli, Hangzhou & Shanghai",
    "江南，生活的艺术｜苏州·同里·杭州·上海 12 天私家旅程",
    "중국 강남, 물길에 머무는 12일｜쑤저우·퉁리·항저우·상하이 프라이빗 여행",
  ),
  metadataTitle: l(
    "Jiangnan Art of Living: 12-Day Suzhou–Shanghai Private Tour",
    "江南生活的艺术｜苏州·同里·杭州·上海 12 天私家游",
    "중국 강남 12일 프라이빗 여행｜쑤저우·퉁리·항저우·상하이",
  ),
  metadataDescription: l(
    "12-day private Jiangnan tour: Suzhou gardens at opening time, a night in Tongli, West Lake and the tea hills, five nights in Shanghai. Quoted by date.",
    "江南 12 天 11 晚私家旅程：拙政园开门即入，同里住一晚，西湖与龙井茶山，最后在上海住五晚，从老城走到浦东。按你的日期报价。",
    "개장 시간의 쑤저우 정원, 퉁리에서의 하룻밤, 서호와 용정 차밭, 그리고 상하이 5박. 강남을 잇는 12일 프라이빗 여행을 날짜별로 견적해 드립니다.",
  ),
  eyebrow: l(
    "Scholars' gardens, a night in a water town, the tea hills, and Shanghai last",
    "先读园林、夜宿水乡、走进茶山，最后才到上海",
    "문인의 정원과 수향마을의 밤, 차밭을 지나 마지막에 상하이로",
  ),
  lede: l(
    "Walk into the Humble Administrator's Garden as the gates open, ahead of the tour groups. Stay the night in Tongli as day visits wind down, and see its quieter canals at dusk and again in the morning. Reach Broken Bridge at 7:30, before West Lake fills up. Then let Shanghai show you what it made of all this.",
    "拙政园一开门就进去，赶在旅行团前头。一日游的客人渐渐散去，你还住在同里，能看见傍晚和清晨更安静的河道。早上 7:30 走到断桥，西湖还没热闹起来。最后到上海，看这座城把江南变成了什么样。",
    "졸정원 문이 열리자마자 단체 관광객보다 먼저 들어갑니다. 당일치기 방문객이 줄어드는 저녁에도 퉁리에 머물며, 이튿날 아침의 한결 조용한 운하를 만납니다. 아침 7시 30분, 서호가 붐비기 전에 단교에 닿습니다. 그리고 마지막으로 상하이에서, 이 도시가 강남을 어떻게 새로 만들었는지 봅니다.",
  ),
  summary: l(
    "A 12-day, 11-night private journey in one direction: Suzhou 3 nights, Tongli 1, Hangzhou 2 and Shanghai 5. A local English-speaking guide in each city for eight full days and a Tongli half-day, with a private car and driver on transfer and guided touring days. Shanghai has one open day without a guide or car, and there are no shopping stops. Quoted for your dates and group.",
    "12 天 11 晚单向私家旅程：苏州 3 晚、同里 1 晚、杭州 2 晚、上海 5 晚。每座城市一位当地英语导游，共 8 个全天加同里半天；接送和导览日安排私车司机。上海留 1 天无导游、无车的自由活动，不进购物店。按你的日期和人数报价。",
    "쑤저우 3박, 퉁리 1박, 항저우 2박, 상하이 5박을 한 방향으로 잇는 11박 12일 프라이빗 여행입니다. 도시마다 현지 영어 가이드가 전일 8일과 퉁리 반일을 함께하며, 이동일과 가이드 동행 관광일에는 전용 차량과 기사가 배정됩니다. 상하이 자유일에는 가이드와 차량이 없으며 쇼핑 일정도 없습니다. 날짜와 인원에 맞춰 견적을 드립니다.",
  ),
  highlights: lists(
    [
      "The Humble Administrator's Garden as the gates open",
      "A night inside Tongli, as day visits wind down",
      "West Lake at 7:30, then a walk in the tea hills",
      "Shanghai from the inside: Bund halls, lilong lanes, Hongkou",
    ],
    [
      "拙政园开门即入，赶在旅行团之前",
      "在同里住一晚，看看游客渐少后的水乡",
      "7:30 的西湖，再到茶山走一走",
      "走进上海：外滩大楼、石库门里弄与虹口",
    ],
    [
      "개장과 동시에 들어가는 졸정원",
      "당일치기 방문객이 줄어든 뒤 퉁리에서 보내는 하룻밤",
      "아침 7시 30분의 서호, 그리고 차밭 산책",
      "안에서 보는 상하이: 와이탄 건물, 리룽 골목, 훙커우",
    ],
  ),
  itinerary: [
    day(1, l("Arrive at Hongqiao; on to Suzhou", "抵达虹桥，前往苏州", "훙차오 도착, 쑤저우로"), l(
      "Your driver meets you at Shanghai Hongqiao, and about an hour and a quarter later you are in Suzhou. Check in near Pingjiang Road and rest. Then go out for the last hour of daylight, when the light on the canal softens and the lane fills with people walking home. Dinner is your own; we send you a few good places within a short walk.",
      "司机在上海虹桥接你，车程约一小时一刻钟到苏州。在平江路附近入住，先歇一歇。傍晚再出门，赶上天黑前最后一小时：河面上的光柔下来，巷子里都是走路回家的人。晚餐自理，我们会发几家走几分钟就到的好馆子给你。",
      "상하이 훙차오에서 기사가 맞이하고, 1시간 15분쯤 달리면 쑤저우입니다. 핑장루 근처에서 체크인하고 잠시 쉬세요. 해 지기 전 마지막 한 시간에 밖으로 나가면, 운하 위의 빛이 부드러워지고 골목은 집으로 걸어가는 사람들로 채워집니다. 저녁 식사는 자유이며, 걸어서 몇 분 거리의 괜찮은 식당 몇 곳을 보내 드립니다.",
    )),
    day(2, l("The Humble Administrator's Garden, read slowly", "拙政园，慢慢读", "천천히 읽는 졸정원"), l(
      "Be at the Humble Administrator's Garden as the gates open, ahead of the tour groups. A Ming official built it after leaving office and named it, with a shrug, for the humble work of tending a garden. Your guide is there to help you read it, not hurry you through: the window that frames a single stand of bamboo, the path that hides the next view until you turn. Then the Suzhou Museum next door, where I. M. Pei answered the garden in white walls and glass, with Wu-school painting inside. The afternoon is on foot through the Pingjiang lanes, with a teahouse where locals actually sit and a short canal boat if you feel like it. In the evening you can add Kunqu and pingtan, performed in the halls of the Master of the Nets Garden.",
      "拙政园一开门就进，赶在旅行团之前。明代官员王献臣辞官回乡造了这座园，笑称浇园种菜也算「拙者之为政」，便叫它拙政园。导游是来帮你读园的，不是赶着你逛：一扇窗只框住一丛竹，一条路要转过弯才把下一景交给你。接着去隔壁的苏州博物馆，看贝聿铭怎样用白墙和玻璃回应园林，馆里还有吴门画派。下午步行穿过平江路一带的巷子，进一家本地人真会去坐的茶馆；想坐船，就坐一小段河。晚上可以另加网师园厅堂里的昆曲和评弹。",
      "졸정원 문이 열리자마자, 단체 관광객보다 먼저 들어갑니다. 명나라 관리 왕헌신은 벼슬을 내려놓고 이 정원을 지은 뒤, 채소밭 가꾸는 일도 '서툰 사람의 정치'라며 스스로를 낮춰 이름을 붙였습니다. 가이드는 서둘러 지나가는 대신 정원을 읽어 줍니다. 대나무 한 무더기만 담은 창, 모퉁이를 돌아야 다음 풍경을 보여 주는 길. 이어 바로 옆 쑤저우박물관에서 I. M. 페이가 흰 벽과 유리로 정원에 답한 건축과 오문화파의 그림을 봅니다. 오후에는 핑장루 골목을 걸어 현지인이 실제로 앉는 찻집에 들르고, 원하면 짧게 운하 배도 탑니다. 저녁에는 망사원 전각에서 열리는 곤극과 평탄 공연을 추가할 수 있습니다.",
    )),
    day(3, l("Yipu, and the ordinary city", "艺圃，和寻常的苏州", "예포, 그리고 평범한 쑤저우"), l(
      "Today is smaller, and that is the point. Yipu, a Ming garden at the end of an ordinary lane, has a waterside pavilion where Suzhou people come to drink tea, and you sit there with them. Then Canglang Pavilion or Shantang Street, chosen with your guide on the day. In the afternoon, the small Kunqu and Pingtan museums, a few lanes from Pingjiang Road, where you hear what Suzhou sounds like. End at Guanqian Street and Xuanmiao Temple, where everyday Suzhou shops and prays.",
      "今天往小处走，这正是用意。艺圃是一座明代小园，藏在一条普通巷子的尽头；临水的延光阁是苏州人喝茶的地方，你也坐进去，和他们一起喝一杯。之后去沧浪亭或山塘街，当天和导游商量着选。下午去昆曲博物馆和评弹博物馆，就在平江路边的小巷里，听听苏州是什么声音。最后走到观前街和玄妙观，寻常苏州人在这里买东西、烧香。",
      "오늘은 작은 것들을 봅니다. 그것이 이날의 의미입니다. 평범한 골목 끝에 숨은 명나라 정원 예포에는 물가 누각이 있어 쑤저우 사람들이 차를 마시러 오고, 여러분도 그 사이에 앉습니다. 이어 창랑정과 산탕제 중 한 곳을 그날 가이드와 함께 고릅니다. 오후에는 핑장루 옆 골목의 작은 곤극 박물관과 평탄 박물관에서 쑤저우의 소리를 듣고, 관첸제와 현묘관에서 평범한 쑤저우 사람들이 장을 보고 향을 올리는 모습으로 하루를 마칩니다.",
    )),
    day(4, l("Tongli: a night in the water town", "同里：在水乡住一晚", "퉁리: 수향마을에서 하룻밤"), l(
      "Forty minutes by car. Cars stop outside the old town, so your bags are carried in for you. A local guide walks with you for half a day: Tuisi Garden, the Retreat and Reflection Garden, built by an official sent home from his post; the three bridges that local wedding parties still walk across for luck; an old merchant house; and a boat, so the canals read as streets, not scenery. Your guide leaves in the early afternoon. As day visits taper off, you can see a quieter evening and morning in town. Dinner in town is included.",
      "车程四十分钟。车开不进古镇，行李会有人帮你送进去。当地导游陪你走半天：退思园，一位丢了官职回乡的官员所造，名字取「退思补过」；太平、吉利、长庆三座桥，本地人办喜事至今还要走一遍讨个吉利；一处商人老宅；再坐一段船，让河道读起来像街道，而不是风景。导游午后离开。傍晚一日游的客人渐渐少了，你留在镇上，看较安静的夜晚和第二天清晨。镇上晚餐包含在内。",
      "차로 40분. 차는 옛 마을 안으로 들어갈 수 없어, 짐은 따로 옮겨 드립니다. 현지 가이드가 반나절 함께 걷습니다. 벼슬에서 물러난 관리가 지은 퇴사원, 지금도 결혼 행렬이 복을 빌며 건너는 태평·길리·장경 세 다리, 옛 상인의 집 한 채, 그리고 배. 배 위에서 보면 운하는 풍경이 아니라 거리입니다. 가이드는 이른 오후에 떠납니다. 늦은 오후에는 당일치기 방문객이 줄어들고, 여러분은 마을에 머물며 한결 조용한 저녁과 이튿날 아침을 맞습니다. 마을에서의 저녁 식사가 포함됩니다.",
    )),
    day(5, l("To Hangzhou: the Grand Canal at work", "去杭州：干活的大运河", "항저우로: 일하는 대운하"), l(
      "Two hours by car, with the same driver who met you at Hongqiao, so your bags never come out of the car. You are in Hangzhou by late morning. The afternoon is at Gongchen Bridge, Qiaoxi and Xiaohe Street: warehouses, boatmen's houses and the shops that once served the barges. This is water as work. Tomorrow is water as landscape.",
      "车程两小时，还是在虹桥接你的那位司机，行李一路不用下车。上午晚些时候到杭州。下午去拱宸桥、桥西和小河直街：仓库、船工住过的房子，还有当年做运河船生意的铺子。今天看的是靠水吃饭，明天看的是水成了风景。",
      "차로 두 시간. 훙차오에서 맞이한 그 기사가 그대로 모시기 때문에 짐을 차에서 내릴 일이 없습니다. 오전 늦게 항저우에 닿습니다. 오후에는 궁천교, 차오시, 샤오허제를 걷습니다. 창고와 뱃사람들이 살던 집, 그리고 운하의 배들을 상대하던 가게들. 오늘은 일하는 물을, 내일은 풍경이 된 물을 봅니다.",
    )),
    day(6, l("West Lake at 7:30, then the tea hills", "7:30 的西湖，然后上茶山", "아침 7시 30분의 서호, 그리고 차밭"), l(
      "Start at Broken Bridge at 7:30, before the lake fills with people, and walk Bai Causeway to Solitary Hill and the Xiling Seal Society while your guide brings the poems written about this water for more than a thousand years. Take a boat to the island, then walk a stretch of Su Causeway. After lunch, walk the tea terraces above Wengjiashan and Longjing village. If a grower can host you on your dates, sit down for about an hour over tea; otherwise, spend more time in the hills and at the China National Tea Museum. We skip stops that exist to sell you tea. A proper Hangzhou dinner is included.",
      "早上 7:30 从断桥出发，赶在湖边热闹起来之前；沿白堤走到孤山和西泠印社，导游一路讲一千多年来写给这片湖的诗。坐船上湖心的岛，再走一段苏堤。午饭后走翁家山、龙井村一带的茶山。若茶农在你的日期方便接待，就坐下来喝约一小时茶；否则在茶山和中国茶叶博物馆多留些时间。专门卖茶的点，我们不去。晚上一顿地道的杭州菜，包含在内。",
      "아침 7시 30분, 호숫가가 붐비기 전에 단교에서 시작해 백제를 따라 고산과 서령인사까지 걷습니다. 가이드는 천 년 넘게 이 호수를 두고 쓰인 시들을 들려줍니다. 배를 타고 호수 가운데 섬에 들른 뒤 소제의 한 구간을 걷습니다. 점심 후에는 옹가산과 용정촌 일대의 차밭을 걷습니다. 날짜에 맞춰 차 농가 방문이 가능하면 약 한 시간 동안 차를 마시고, 그렇지 않으면 차밭과 중국차엽박물관에서 더 시간을 보냅니다. 차 판매를 목적으로 한 곳에는 들르지 않습니다. 저녁에는 포함된 항저우 요리를 즐깁니다.",
    )),
    day(7, l("Fast train to Shanghai; the old city and Yu Garden", "高铁到上海：老城厢与豫园", "고속철로 상하이, 옛 성안과 예원"), l(
      "About an hour on the fast train, with a car waiting at both ends. The afternoon is in the old walled city and Yu Garden, and seeing it straight after Suzhou is the point. A Ming official built it for his parents; in the Qing dynasty the city's merchants bought it back, and by the late 1800s more than twenty trade guilds kept their halls here. A garden in a trading port, not a scholar's retreat, and it shows.",
      "高铁约一小时，两头都有车等着。下午走老城厢和豫园，刚看完苏州就来，正好对照。豫园是明代一位官员为父母修的；到了清代，城里的商人集资把它买了回来，十九世纪后期园里设了二十多家行业公所。这是商埠里的园子，不是文人退隐的园子，一看就不一样。",
      "고속철로 약 한 시간, 양쪽 역에는 차량이 기다립니다. 오후에는 옛 성곽 도심과 예원을 걷습니다. 쑤저우를 막 보고 온 지금이 예원을 보기 가장 좋은 때입니다. 명나라 관리가 부모를 위해 지은 정원을 청나라 때 상하이 상인들이 돈을 모아 되찾았고, 19세기 후반에는 스무 곳이 넘는 동업 조합이 이곳에 회관을 두었습니다. 은거한 문인의 정원이 아니라 무역항의 정원, 그 차이가 눈에 보입니다.",
    )),
    day(8, l("Plane trees, lilong lanes, and inside the Bund", "梧桐、里弄，再走进外滩", "플라타너스, 리룽 골목, 그리고 와이탄 안으로"), l(
      "A long, slow walk under the plane trees of Wukang Road and Sinan Road, then the shikumen lanes at Bugaoli and Jianyeli. Bugaoli is still home to families, so you look from the street. Five minutes at Xintiandi, to see what 'preserved' can mean. In the afternoon, go inside the Bund instead of photographing it from the promenade: the lobby of the Peace Hotel, the mosaic dome of the old HSBC hall, the Long Bar at the former Shanghai Club.",
      "在武康路、思南路的梧桐树下慢慢走一大段，再去看步高里和建业里的石库门里弄。步高里至今住着人家，所以只在街上看。在新天地停五分钟，看看「保护」还可以是什么意思。下午走进外滩，而不是站在江边拍它：和平饭店的大堂、原汇丰银行大厅的马赛克穹顶、原上海总会的 Long Bar。",
      "우캉루와 쓰난루의 플라타너스 아래를 천천히 오래 걷고, 부가오리와 젠예리의 석고문 골목으로 갑니다. 부가오리에는 지금도 주민이 살고 있어 거리에서만 봅니다. 신톈디에서는 5분만 머물며 '보존'이 어떤 의미일 수 있는지 봅니다. 오후에는 강변 산책로에서 사진만 찍는 대신 와이탄 건물 안으로 들어갑니다. 피스 호텔 로비, 옛 HSBC 홀의 모자이크 돔, 옛 상하이 클럽의 롱 바.",
    )),
    day(9, l("Hongkou: the streets that sheltered refugees", "虹口：难民落脚的街巷", "훙커우: 피난민을 품었던 거리"), l(
      "Start at the Shanghai Jewish Refugees Museum, in the former Ohel Moshe Synagogue, which tells how Jewish families escaping Europe in the 1930s and 40s found shelter in this corner of Shanghai. Then walk the streets the museum describes: Zhoushan Road, Huoshan Park, Tilanqiao. People still live in those houses, which is the point of walking them. In the afternoon, ninety minutes at the Shanghai History Museum to put the politics and the money in order.",
      "先去上海犹太难民纪念馆，它就在原摩西会堂里，讲的是上世纪三四十年代逃离欧洲的犹太家庭，怎样在上海这一角找到落脚之处。然后去走纪念馆里讲到的那些街：舟山路、霍山公园、提篮桥。那些房子里至今住着人，这正是要走一走的原因。下午在上海市历史博物馆待一个半小时，把这座城的政治和金钱脉络理一理。",
      "옛 오헬 모세 회당에 자리한 상하이 유대인 난민 기념관에서 시작합니다. 1930~40년대 유럽을 떠난 유대인 가족들이 상하이의 이 한 귀퉁이에서 피난처를 찾은 이야기를 듣습니다. 이어 기념관이 이야기하는 바로 그 거리, 저우산루와 훠산 공원, 티란차오를 걷습니다. 그 집들에는 지금도 사람이 살고, 그래서 직접 걸어 보는 의미가 있습니다. 오후에는 상하이시 역사박물관에서 한 시간 반 동안 이 도시의 정치와 돈의 흐름을 정리합니다.",
    )),
    day(10, l("Shanghai Museum East, Pudong and the Bund at night", "上博东馆、浦东与夜外滩", "상하이박물관 동관, 푸둥, 그리고 밤의 와이탄"), l(
      "Two hours at Shanghai Museum East with the ceramics, the painting and the Jiangnan crafts gallery, so Suzhou and Hangzhou come back to you as objects. Then Pudong as a plan: what stood here in 1990, and who decided what would replace it. If the air is clear, add Top of Shanghai at dusk. After dark, walk the Bund to close the journey.",
      "在上海博物馆东馆待两个小时，看陶瓷、书画和江南造物馆，让苏州和杭州以器物的样子再回到你眼前。然后把浦东当成一份规划来看：1990 年这里是什么，又是谁决定了它变成今天的样子。天气通透的话，傍晚可以另加上海之巅；天黑后步行走外滩，为整趟旅程收尾。",
      "상하이박물관 동관에서 두 시간 동안 도자기와 서화, 강남 공예관을 둘러보면, 쑤저우와 항저우가 유물의 모습으로 다시 돌아옵니다. 이어 푸둥을 하나의 계획으로 읽습니다. 1990년 이곳에는 무엇이 있었고, 누가 무엇으로 바꾸기로 했는지. 하늘이 맑으면 해 질 녘 상하이 타워 전망대를 추가할 수 있습니다. 어두워진 뒤 와이탄을 걸으며 여정을 마무리합니다.",
    )),
    day(11, l("An open day in Shanghai", "上海自由日", "상하이 자유일"), l(
      "We have left this one empty on purpose. Go back to a street you loved, sleep late, follow your own interest. If you want one idea, walk the Yangpu riverfront, Shanghai's old industrial mile: the 1883 waterworks, the cotton mills and the power station, now joined by a public path along the Huangpu. A guide and car are extra, and only if you want them.",
      "这一天我们故意空着。回到你喜欢的那条街，睡到自然醒，或者去追自己的兴趣。如果想要一个建议：去走杨浦滨江，上海的老工业岸线，1883 年的自来水厂、纱厂和发电厂，如今由一条沿黄浦江的公共步道连在一起。导游和车可以另加，只在你需要时安排。",
      "이날은 일부러 비워 두었습니다. 마음에 들었던 거리로 돌아가도, 늦잠을 자도, 자신만의 관심사를 따라가도 좋습니다. 한 가지 제안한다면 상하이의 옛 공업 지대인 양푸 강변을 걸어 보세요. 1883년의 상수도 공장과 방적 공장, 발전소가 이제 황푸강을 따라 이어진 공공 산책로로 연결되어 있습니다. 가이드와 차량은 원하실 때만 별도 비용으로 추가합니다.",
    )),
    day(12, l("Depart from Pudong", "浦东送机", "푸둥에서 출발"), l(
      "Your driver takes you from the hotel to Pudong Airport in good time for your flight. Nothing else is planned today, so the journey ends without a race to the gate.",
      "司机按你的航班时间，从酒店送你去浦东机场，时间留得宽裕。这一天不安排别的，旅程收尾不用赶。",
      "항공편 시간에 맞춰 여유 있게 기사가 호텔에서 푸둥 공항까지 모셔다 드립니다. 이날은 다른 일정을 넣지 않아, 서두르지 않고 여정을 마칩니다.",
    )),
  ],
  hotelNote: l(
    "Old houses in Suzhou and Tongli, where the point is to sleep inside the old town; modern hotels in Hangzhou and Shanghai, where everything simply works. Suzhou, 3 nights: Yihe Songmaoju, a century-old mansion with its own garden, a short walk from Pingjiang Road. Tongli, 1 night: Yinlu Tongli House, a few rooms around an old courtyard, with a housekeeper who looks after you. Hangzhou, 2 nights: Canopy by Hilton Hangzhou West Lake, by Longxiangqiao station and about ten minutes on foot from the lakeshore. Shanghai, 5 nights: Atour S Hotel, Pudong Avenue, Lujiazui, a four-star on the Pudong side of the river. Breakfast every morning, and a room each or shared, as you prefer. Before you pay, we confirm these hotels for your dates, or one of the same standard.",
    "苏州和同里住老宅子，为的是睡在古城里；杭州和上海住新式酒店，一切都省心。苏州 3 晚：Yihe Songmaoju，一座自带园子的百年老宅，走几分钟就到平江路。同里 1 晚：Yinlu Tongli House，老院子里只有几间房，有管家照应。杭州 2 晚：Canopy by Hilton Hangzhou West Lake，靠近地铁站，步行十分钟左右到湖边。上海 5 晚：Atour S Hotel, Pudong Avenue, Lujiazui，浦东一侧的四星酒店。每天含早餐，一人一间或两人同住都可以。付款前，我们按你的日期确认这几家酒店，或同等标准的替代。",
    "쑤저우와 퉁리에서는 옛집에 묵습니다. 옛 마을 안에서 잠드는 것이 핵심이기 때문입니다. 항저우와 상하이는 모든 것이 편한 현대식 호텔입니다. 쑤저우 3박: Yihe Songmaoju, 정원을 품은 백 년 된 저택으로 핑장루까지 걸어서 몇 분입니다. 퉁리 1박: Yinlu Tongli House, 옛 안뜰을 둘러싼 몇 개의 객실과 투숙객을 챙기는 하우스키퍼가 있습니다. 항저우 2박: Canopy by Hilton Hangzhou West Lake, 룽샹차오역 옆이며 호숫가까지 걸어서 10분 정도입니다. 상하이 5박: Atour S Hotel, Pudong Avenue, Lujiazui, 강 건너 푸둥 쪽의 4성급 호텔입니다. 매일 조식이 포함되며, 1인 1실과 2인 1실 중 원하시는 대로 정합니다. 결제 전에 여행 날짜에 맞춰 이 호텔들, 또는 같은 등급의 호텔을 확정합니다.",
  ),
  serviceNote: l(
    "A local English-speaking guide in each city: one in Suzhou who can read a garden, one in Hangzhou who knows the lake's poems and the tea villages, one in Shanghai for the architecture and the Hongkou story. Eight full days, plus a half-day in Tongli. A private car and driver for every transfer and touring day, with fuel, tolls and parking; the same driver from Hongqiao to Hangzhou, so your bags stay in the car, and a second in Shanghai. The fast train from Hangzhou to Shanghai. Every entrance ticket and boat in the plan, with the passport-name reservations made for you. Dinner in Tongli and in Hangzhou. Us on WhatsApp for the whole trip. No shopping stops, and no one on this trip is paid to take you into a shop.",
    "每座城市一位当地英语导游：苏州的会读园林，杭州的懂西湖的诗和茶村，上海的讲建筑和虹口的故事。共 8 个全天，加同里半天。每个接送日和游览日都有私车和司机，油费、过路费、停车费都含；从虹桥到杭州是同一位司机，行李一直在车上，到上海再换一位。杭州到上海的高铁。行程里每一张门票、每一段船，以及需要护照实名的预约，都由我们办好。同里和杭州各一顿晚餐。全程在 WhatsApp 上有人回你。无购物店安排，这趟旅程里也没有人靠带你进店拿钱。",
    "도시마다 현지 영어 가이드가 함께합니다. 쑤저우에는 정원을 읽어 줄 가이드, 항저우에는 서호의 시와 차 마을을 아는 가이드, 상하이에는 건축과 훙커우 이야기를 들려줄 가이드. 전일 8일에 퉁리 반일이 더해집니다. 모든 이동일과 관광일에 전용 차량과 기사가 있으며 유류비, 통행료, 주차비가 포함됩니다. 훙차오에서 항저우까지는 같은 기사가 모셔 짐이 계속 차에 있고, 상하이에서는 다른 기사가 맡습니다. 항저우–상하이 고속철, 일정 속 모든 입장권과 배, 여권 실명 예약까지 저희가 처리합니다. 퉁리와 항저우에서 저녁 식사 각 1회. 여행 내내 WhatsApp으로 저희와 연락할 수 있습니다. 쇼핑 일정은 없습니다. 이 여행에서 여러분을 상점에 데려가고 돈을 받는 사람도 없습니다.",
  ),
  exclusions: lists(
    [
      "Flights, your China visa and travel insurance",
      "Lunches and the other dinners; your guides will take you where they eat",
      "Evening performances, the river cruise and Top of Shanghai, unless you add them",
      "A guide and car on the open day, unless you add them",
      "Tips and personal spending",
    ],
    [
      "机票、中国签证和旅行保险",
      "午餐和其余晚餐；导游会带你去他们自己常吃的地方",
      "晚间演出、黄浦江游船和上海之巅，另加才有",
      "自由日的导游和用车，另加才有",
      "小费和个人消费",
    ],
    [
      "항공권, 중국 비자와 여행자 보험",
      "점심과 나머지 저녁 식사(가이드가 자신이 즐겨 찾는 식당으로 안내합니다)",
      "저녁 공연, 황푸강 유람선, 상하이 타워 전망대(추가 신청 시)",
      "자유일의 가이드와 차량(추가 신청 시)",
      "팁과 개인 경비",
    ],
  ),
  bookingNote: l(
    "This journey is quoted rather than sold at a fixed price, because rooms, guides and trains depend on your dates. Tell us when you would like to travel, how many of you are coming, whether you want a room each, and your arrival and departure flights. We check every hotel, guide and ticket, then send you the exact plan and the full price in writing before you pay anything.",
    "这条路线按日期报价，不设固定价，因为房间、导游和车次都取决于你的出行日期。告诉我们想哪天出发、几个人、要不要一人一间，以及到达和离开的航班。我们逐一核对酒店、导游和门票，在你付任何钱之前，把具体安排和总价书面发给你。",
    "이 여행은 고정 가격 대신 날짜별 견적으로 안내합니다. 객실, 가이드, 열차가 모두 여행 날짜에 따라 달라지기 때문입니다. 희망 날짜, 인원, 1인 1실 여부, 도착·출발 항공편을 알려 주세요. 호텔, 가이드, 입장권을 하나하나 확인한 뒤, 결제 전에 정확한 일정과 총액을 서면으로 보내 드립니다.",
  ),
  heroImage: westLakePhoto,
  gallery: [pudongPhoto],
  routeMedia: [
    routePhoto(1, scene(l("Pingjiang Road", "平江路", "핑장루"), pingjiangPhoto)),
    routePhoto(
      2,
      scene(l("Humble Administrator's Garden", "拙政园", "졸정원"), humbleGardenPhoto),
      scene(l("Suzhou Museum", "苏州博物馆", "쑤저우박물관"), suzhouMuseumPhoto),
    ),
    routePhoto(3, scene(l("Yipu", "艺圃", "예포"), yipuPhoto)),
    routePhoto(
      4,
      scene(l("Tongli canals", "同里河道", "퉁리 운하"), tongliCanalPhoto),
      scene(l("Tuisi Garden", "退思园", "퇴사원"), tuisiGardenPhoto),
    ),
    routePhoto(5, scene(l("Gongchen Bridge", "拱宸桥", "궁천교"), gongchenPhoto)),
    routePhoto(
      6,
      scene(l("Broken Bridge", "断桥", "단교"), brokenBridgePhoto),
      scene(l("Tea hills", "茶山", "차밭"), teaHillsPhoto),
    ),
    routePhoto(7, scene(l("Yu Garden", "豫园", "예원"), yuGardenPhoto)),
    routePhoto(
      8,
      scene(l("Plane-tree streets", "梧桐街区", "플라타너스 거리"), frenchConcessionPhoto),
      scene(l("The Bund", "外滩", "와이탄"), bundPhoto),
    ),
    routePhoto(9, scene(l("Jewish Refugees Museum", "犹太难民纪念馆", "유대인 난민 기념관"), jewishRefugeesMuseumPhoto)),
    routePhoto(
      10,
      scene(l("Shanghai Museum East", "上海博物馆东馆", "상하이박물관 동관"), museumEastPhoto),
      scene(l("The Bund after dark", "夜外滩", "밤의 와이탄"), bundNightPhoto),
    ),
    routePhoto(11, scene(l("Yangshupu Waterworks", "杨树浦水厂", "양푸 상수도 공장"), yangshupuWaterworksPhoto)),
    routePhoto(12, scene(l("Departure", "送机", "출발"), departurePhoto)),
  ],
  packages: [{
    id: "private-guided",
    guideMode: "guided",
    label: l("Private guided journey — request a quote", "私人导览行程——按日期询价", "프라이빗 가이드 여행 — 날짜별 견적"),
    summary: l(
      "Eleven nights with breakfast, a local English-speaking guide in each city (eight full days and a Tongli half-day), a private car and driver, the Hangzhou–Shanghai fast train, every ticket and boat in the plan, and two dinners. Quoted for your dates.",
      "含 11 晚住宿和早餐、每城一位当地英语导游（8 个全天加同里半天）、私车司机、杭州到上海高铁、行程内全部门票和游船，以及两顿晚餐。按日期报价。",
      "조식 포함 11박, 도시별 현지 영어 가이드(전일 8일과 퉁리 반일), 전용 차량과 기사, 항저우–상하이 고속철, 일정 속 모든 입장권과 배, 저녁 식사 2회가 포함됩니다. 날짜에 맞춰 견적을 드립니다.",
    ),
    quoteOnly: true,
    prices: [],
  }],
  faq: [
    {
      question: l("What is the route, and how many nights are spent in each place?", "路线怎么走？每个地方住几晚？", "일정 순서와 도시별 숙박 일수는 어떻게 되나요?"),
      answer: l(
        "The route runs in one direction over 12 days and 11 nights: Suzhou for 3 nights (Days 1–3), Tongli for 1 night (Day 4), Hangzhou for 2 nights (Days 5–6) and Shanghai for 5 nights (Days 7–11). You arrive at Shanghai Hongqiao and leave from Shanghai Pudong on Day 12. There is no backtracking between cities.",
        "全程单向，共 12 天 11 晚：苏州 3 晚（第 1–3 天）、同里 1 晚（第 4 天）、杭州 2 晚（第 5–6 天）、上海 5 晚（第 7–11 天）。从上海虹桥进，第 12 天从上海浦东走，城市之间不走回头路。",
        "일정은 한 방향으로 11박 12일 동안 이어집니다. 쑤저우 3박(1~3일 차), 퉁리 1박(4일 차), 항저우 2박(5~6일 차), 상하이 5박(7~11일 차)이며, 상하이 훙차오로 도착해 12일 차에 상하이 푸둥에서 출발합니다. 도시 사이를 되돌아가지 않습니다.",
      ),
    },
    {
      question: l("Is a guide with us every day?", "每天都有导游陪同吗？", "매일 가이드가 동행하나요?"),
      answer: l(
        "On eight full touring days (Days 2, 3 and 5–10) and for half a day in Tongli on Day 4. Days 1 and 12 are transfers with your driver, and Day 11 is yours, with no guide or car unless you ask us to add them.",
        "8 个全天游览日（第 2、3、5–10 天）和第 4 天同里半天有导游。第 1、12 天由司机接送；第 11 天归你自己安排，不配导游和车，需要的话可以另加。",
        "전일 관광 8일(2·3·5~10일 차)과 4일 차 퉁리 반일에 가이드가 함께합니다. 1·12일 차는 기사가 이동을 맡고, 11일 차는 자유일로 가이드와 차량이 없으며 원하시면 추가할 수 있습니다.",
      ),
    },
    {
      question: l("Why spend a night in Tongli rather than visit for a few hours?", "为什么在同里住一晚，而不是半日往返？", "퉁리에서 당일치기 대신 왜 1박하나요?"),
      answer: l(
        "Because Tongli changes as day visits wind down. With your half-day guide you see Tuisi Garden and the three bridges; by staying the night you also have the town at dusk, and again in the quieter morning. It keeps the route moving forward from Suzhou to Hangzhou, too, with no doubling back.",
        "一日游的客人渐少时，同里有另一种节奏。半天导览看退思园和三桥；住一晚，你还能看到黄昏的同里，和第二天清早较安静的同里。路线也顺着从苏州往杭州走，不用折返。",
        "당일치기 방문객이 줄어들면 퉁리의 분위기도 달라지기 때문입니다. 반일 가이드와 퇴사원, 세 다리를 보고, 하룻밤 머물며 해 질 녘과 이튿날 한결 조용한 아침의 퉁리까지 만납니다. 쑤저우에서 항저우로 향하는 동선도 되돌아가는 일 없이 자연스럽게 이어집니다.",
      ),
    },
    {
      question: l("Are the four hotels fixed?", "这四家酒店是定好的吗？", "네 호텔은 확정인가요?"),
      answer: l(
        "They are our first choice for this route, but no rooms are held until you book. If one of them cannot confirm your dates, we offer a hotel of the same standard, and nothing changes until you approve it.",
        "这四家是这条路线的首选，但在你预订之前不会预留房间。如果某一家确认不了你的日期，我们会提供同等标准的酒店，你同意之前什么都不改。",
        "이 네 곳은 이 여정의 첫 번째 선택이지만, 예약 전에는 객실을 잡아 두지 않습니다. 날짜가 맞지 않는 호텔이 있으면 같은 등급의 호텔을 제안하며, 동의하시기 전에는 아무것도 바꾸지 않습니다.",
      ),
    },
    {
      question: l("What depends on the day or the season?", "哪些要看当天或季节？", "날짜나 계절에 따라 달라지는 것은 무엇인가요?"),
      answer: l(
        "A few things, and we would rather say so once here than in every line. Museum closing days are checked against your dates, and the order of the days moves around them. Boats, teahouses and the evening performance at the Master of the Nets Garden keep their own schedules. Access inside the Bund buildings depends on the day. At Shanghai Museum East, guiding in the galleries needs the museum's approval, so you explore on your own or with a museum-approved guide. Bugaoli is lived in, so it is seen from the street. Top of Shanghai is worth it only on a clear evening. Longjing's prized spring tea is picked mainly in March and April; a grower visit depends on availability and is confirmed in your written plan. You can still walk the terraces at other times, but neither tea picking nor tea from a particular slope is promised.",
        "有几样，我们宁可在这里一次说清，也不在每一行里加注。博物馆闭馆日会按你的日期核对，每天的先后顺序围着它调整。游船、茶馆和网师园的晚间演出各有各的时间。外滩几栋大楼能不能进内部，要看当天开放情况。上海博物馆东馆的展厅讲解需要馆方事先批准，所以馆内自行参观，或请馆方认可的讲解员。步高里有居民，只在街上看。上海之巅只在天气通透的傍晚才值得上。龙井春茶主要在三、四月采；茶农能否接待，要看当时情况，并写进你的书面行程。其他时候仍可走茶山，但不保证能看到采茶，也不承诺喝到来自某一片山坡的茶。",
        "몇 가지가 있으며, 문장마다 단서를 달기보다 여기서 한 번에 말씀드립니다. 박물관 휴관일은 여행 날짜에 맞춰 확인하고, 일정 순서를 그에 맞춰 조정합니다. 배, 찻집, 망사원의 저녁 공연은 각자의 운영 시간이 있습니다. 와이탄 건물의 실내 출입은 그날의 개방 상황에 따라 다릅니다. 상하이박물관 동관의 전시실 해설은 박물관의 사전 승인이 필요해 자유 관람하거나 박물관이 승인한 해설사를 이용합니다. 부가오리는 주민이 사는 곳이라 거리에서만 봅니다. 상하이 타워 전망대는 하늘이 맑은 저녁에만 권합니다. 용정 봄차는 주로 3~4월에 수확합니다. 차 농가 방문은 가능 여부를 확인해 서면 일정에 넣으며, 다른 시기에도 차밭을 걸을 수 있지만 찻잎 따기나 특정 비탈에서 난 차를 약속하지는 않습니다.",
      ),
    },
    {
      question: l("How is this tour priced?", "这条路线怎么报价？", "이 여행의 가격은 어떻게 정하나요?"),
      answer: l(
        "We quote for your actual dates, group size and rooms after checking live availability, so there is no fixed public price. The written quote, with every service listed, comes before you pay.",
        "按你的实际日期、人数和房间安排，核对实时余量后报价，所以没有公开的固定价。列明每项服务的书面报价，会在你付款前发给你。",
        "실제 여행 날짜, 인원, 객실 구성에 맞춰 예약 가능 여부를 확인한 뒤 견적을 드리므로 고정 공개 가격은 없습니다. 모든 서비스를 적은 서면 견적은 결제 전에 받으십니다.",
      ),
    },
  ],
  datePublished: "2026-10-10",
  dateModified: "2026-10-10",
};

const ccBy2 = "https://creativecommons.org/licenses/by/2.0/";
const ccBy4 = "https://creativecommons.org/licenses/by/4.0/";
const ccBySa2 = "https://creativecommons.org/licenses/by-sa/2.0/";
const ccBySa3 = "https://creativecommons.org/licenses/by-sa/3.0/";
const ccBySa4 = "https://creativecommons.org/licenses/by-sa/4.0/";
const cc0 = "https://creativecommons.org/publicdomain/zero/1.0/";

/** Credits for the third-party route photographs reused above. */
export const jiangnanArtPrivateTourPhotoCreditsBySlug: Readonly<
  Record<string, readonly PrivateTourPhotoCredit[]>
> = {
  [slug]: [
    {
      subject: l("Pingjiang Road, Suzhou", "苏州平江路", "쑤저우 핑장루"),
      author: "kevinmcgill",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:A_stone_arch_bridge_in_Pingjiang_Road,_Suzhou.jpg",
      licenseLabel: "CC BY-SA 2.0",
      licenseUrl: ccBySa2,
    },
    {
      subject: l("Humble Administrator's Garden, Suzhou", "苏州拙政园", "쑤저우 졸정원"),
      author: "Chainwit.",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Humble_Administrator%27s_Garden_Suzhou_(2024)_-_img_01.jpg",
      licenseLabel: "CC BY 4.0",
      licenseUrl: ccBy4,
    },
    {
      subject: l("Suzhou Museum courtyard", "苏州博物馆庭院", "쑤저우박물관 안뜰"),
      author: "Universe729",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Suzhoumuseum.jpg",
      licenseLabel: "CC BY-SA 3.0",
      licenseUrl: ccBySa3,
    },
    {
      subject: l("Yipu (Garden of Cultivation), Suzhou", "苏州艺圃", "쑤저우 예포"),
      author: "Herr Klugbeisser",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:China_-_Suzhou_-_Garden_of_Cultivation_-_Yanguang_ge.jpg",
      licenseLabel: "CC BY-SA 4.0",
      licenseUrl: ccBySa4,
    },
    {
      subject: l("Canal in Tongli", "同里河道", "퉁리 운하"),
      author: "Jonathan Suh",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Tongli,_China_20160331.jpg",
      licenseLabel: "CC BY-SA 4.0",
      licenseUrl: ccBySa4,
    },
    {
      subject: l("Tuisi Garden, Tongli", "同里退思园", "퉁리 퇴사원"),
      author: "Zossolino",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:2015-09-25-080503_-_Tongli,_Tuisi_Yuan_-_%E2%80%9EGarten_des_Pension%C3%A4rs%E2%80%9C.jpg",
      licenseLabel: "CC BY-SA 4.0",
      licenseUrl: ccBySa4,
    },
    {
      subject: l("Gongchen Bridge, Hangzhou", "杭州拱宸桥", "항저우 궁천교"),
      author: "Windmemories",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:20231122_Gongchen_Bridge_01.jpg",
      licenseLabel: "CC BY-SA 4.0",
      licenseUrl: ccBySa4,
    },
    {
      subject: l("Broken Bridge, West Lake", "西湖断桥", "서호 단교"),
      author: "Suicasmo",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Broken_Bridge_(Hangzhou)_20250505.jpg",
      licenseLabel: "CC0 1.0",
      licenseUrl: cc0,
    },
    {
      subject: l("Yu Garden, Shanghai", "上海豫园", "상하이 예원"),
      author: "King of Hearts",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Yu_Garden_Shanghai_November_2017_002.jpg",
      licenseLabel: "CC BY-SA 4.0",
      licenseUrl: ccBySa4,
    },
    {
      subject: l("Former French Concession, Shanghai", "上海原法租界", "상하이 옛 프랑스 조계지"),
      author: "Fabio Achilli",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:French_Concession,_Shanghai,_China_(9740638438).jpg",
      licenseLabel: "CC BY 2.0",
      licenseUrl: ccBy2,
    },
    {
      subject: l("Shanghai Jewish Refugees Museum courtyard", "上海犹太难民纪念馆庭院", "상하이 유대인 난민 기념관 안뜰"),
      author: "Difference engine",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Shanghai_Jewish_Refugees_Museum_courtyard.jpg",
      licenseLabel: "CC BY-SA 4.0",
      licenseUrl: ccBySa4,
    },
    {
      subject: l("Shanghai Museum East exterior", "上海博物馆东馆外观", "상하이박물관 동관 외관"),
      author: "Alexey Yakovlev",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Shanghai_Museum_East.jpg",
      licenseLabel: "CC0 1.0",
      licenseUrl: cc0,
    },
    {
      subject: l("Yangshupu Waterworks, Shanghai", "上海杨树浦水厂", "상하이 양푸 상수도 공장"),
      author: "Poiuytre",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:YangshupuWaterworks4.jpg",
      licenseLabel: "CC0 1.0",
      licenseUrl: cc0,
    },
  ],
};
