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
    "12-day private Jiangnan tour: Suzhou gardens, Tongli overnight, West Lake and tea, five nights in Shanghai. Four hotel suggestions; quote by date.",
    "江南 12 天 11 晚私家旅程：苏州园林与平江路、同里留宿一晚、杭州运河西湖与茶山、上海旧城到浦东。逐城推荐四家候选酒店，按日期询价。",
    "쑤저우 정원과 핑장루, 퉁리 1박, 항저우 대운하·서호·차밭, 상하이 5박을 잇는 강남 12일 프라이빗 여행. 네 도시의 추천 숙소와 날짜별 견적.",
  ),
  eyebrow: l(
    "A living story of gardens, canals, tea and a changing city",
    "从一座园、一条河、一盏茶，读到一座城",
    "정원과 물길, 차 한 잔에서 변화하는 도시까지",
  ),
  lede: l(
    "Begin where a garden frames the world. Stay in a water town after its day visitors leave. Follow the canal to a lake and a tea hillside, then read Shanghai as Jiangnan's next chapter.",
    "从园林的一扇漏窗开始，在同里等一座水乡静下来；循大运河去看西湖与茶山，最后走进上海，读江南故事如何续写。",
    "쑤저우 정원의 창으로 풍경을 보고, 당일 여행객이 돌아간 퉁리에서 하룻밤을 보냅니다. 대운하의 물길을 따라 서호와 차밭으로, 다시 상하이의 옛 골목과 강변으로 이어집니다.",
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
      "Meet your driver at Shanghai Hongqiao and travel to Suzhou, leaving the arrival hall for a city shaped by canals and gardens. After check-in, the day is intentionally light. If your arrival hour allows, take a first walk along Pingjiang Road, where a narrow lane runs beside the water and local life continues behind old doorways. Arrival via Pudong can be quoted as a route adjustment.",
      "在上海虹桥与司机会合，前往苏州。从机场或车站的匆忙，慢慢转入河街相依的旧城；入住后先休息，不把抵达日排满。若时间和体力允许，沿平江路走一小段，看河在巷旁流，老屋里仍有寻常生活。若从浦东抵达，接送路线可另行调整并报价。",
      "상하이 훙차오 공항 또는 역에서 전용 차량으로 쑤저우에 들어섭니다. 체크인 후 도착 시간에 여유가 있다면 핑장루의 물길을 따라 천천히 걸으며, 내일 만날 정원 바깥의 생활 골목을 먼저 느껴봅니다. 푸둥으로 도착하는 경우에는 이동 동선과 비용을 별도로 조정합니다.",
    )),
    day(2, l("The Humble Administrator's Garden and Suzhou Museum", "拙政园与苏州博物馆", "졸정원과 쑤저우 박물관"), l(
      "Enter the Humble Administrator's Garden at a confirmed early slot. Wang Xianchen built it after leaving official life; its name turns the idea of governing toward the smaller art of tending a garden. At Suzhou Museum, I. M. Pei offers a contemporary conversation with that garden language. End on Pingjiang Road, whose canal-and-street pattern still recalls the old city map. Museum admission requires a confirmed reservation; a short boat or evening Kunqu/pingtan performance is possible only when operating and agreed separately.",
      "按预约到的较早时段走进拙政园。王献臣离开仕途后营园，把“为政”的抱负收进一池水、一方庭院；到了贝聿铭设计的苏州博物馆，再看这种园林语言如何被译成当代建筑。下午回到平江路，顺着仍可辨认的河街格局走。苏博须预约；短途游船与晚间昆曲、评弹演出须看运营和排期，并以最终行程确认。",
      "졸정원에서는 연못과 창, 굽이진 길이 하나의 풍경을 어떻게 여러 장면으로 나누는지 살펴봅니다. 확정된 개장 시간에 맞춰 일찍 방문한 뒤, 쑤저우 박물관에서 I. M. 페이의 건축과 우 지역의 예술을 만나고 오후에는 핑장루의 생활 골목으로 나옵니다. 박물관은 예약이 필요하며, 운하 보트는 운항과 최종 일정에 따라 조정합니다. 저녁 곤극·평탄 공연은 별도 선택입니다.",
    )),
    day(3, l("Yipu and everyday Suzhou", "艺圃与苏州日常街巷", "이포와 쑤저우의 일상"), l(
      "After yesterday's grand garden, find Yipu tucked into an ordinary lane. Its smaller pond and tea room make room for a slower conversation. With your guide, choose Canglang Pavilion and its waterside corridors or Shantang Street and its old canal. The Kunqu and Pingtan museums introduce Suzhou through performance and storytelling; Guanqian Street and Xuanmiao Temple bring the day back to city life. We adjust museum stops to opening hours rather than rush through every option.",
      "从昨日的名园转入小巷深处的艺圃。池塘小了，喝一杯茶、听一会儿风的时间反而多了。接下来与导游二选一：去沧浪亭看园廊如何借外面的水，或走白居易开凿河道旁的山塘街。昆曲、评弹博物馆让苏州有了声音，最后在观前街与玄妙观一带回到城市日常；馆舍是否入内，以当日开放为准，不必把所有备选都赶完。",
      "이포에서는 큰 장관보다 작은 마당의 여백이 오래 남습니다. 정원 안 찻집에서 잠시 쉰 뒤 가이드와 상의해 창랑정 또는 산탕제 중 한 곳을 고릅니다. 오후에는 개관 상황에 따라 곤극·평탄 박물관을 둘러보고, 관첸제와 현묘관 일대에서 오늘의 쑤저우를 만납니다. 모든 선택지를 서둘러 돌기보다 머물 시간을 남깁니다.",
    )),
    day(4, l("Tongli: stay inside the water town", "同里：在水乡住一晚", "퉁리: 수향마을에서 1박"), l(
      "Travel to Tongli for a half-day guided walk. Tuisi Garden takes its name from the wish to reflect on one's actions; its rooms and waterside garden offer a more intimate counterpoint to Suzhou. Cross the Taiping, Jili and Changqing bridges, and view a preserved house if open. The planned canal boat runs only when conditions permit. A dinner and one night in town let you meet Tongli again after the day-trip crowds have thinned, and in the quieter morning.",
      "到同里后，由当地导游带半天。退思园的名字取“退思补过”，屋舍与贴水庭园相接，像拙政园之后的一段低声自省；再走太平、吉利、长庆三桥，若开放可看一处旧宅。行程内小船以当天运营和天气为准。这里特意留宿一晚，也含一顿晚餐：一日游的人群散去后走一次，翌晨再看一次，水乡才不只是短暂停靠。",
      "쑤저우를 떠나 퉁리로 향하면 정원의 물길이 마을의 일상으로 이어집니다. 반일 가이드와 퇴사원, 태평·길리·장경 세 다리와 개방 중인 경우 옛 집 한 곳을 돌아봅니다. 운항하면 일정에 포함된 배를 타고, 당일치기 방문객이 돌아간 뒤에도 마을에 머물러 저녁과 이튿날 아침의 퉁리를 만납니다. 퉁리 석식 한 번이 포함됩니다.",
    )),
    day(5, l("Hangzhou and the working Grand Canal", "杭州：作为生活水道的大运河", "항저우와 생활의 수로 대운하"), l(
      "A private vehicle carries you from Tongli to Hangzhou. Here the waterway grows from a town canal into the Grand Canal, a working route that once moved goods between north and south. Around Gongchen Bridge and Qiaoxi, old commercial streets and later industrial buildings show how the city earned its living; at Xiaohe Street, waterside steps and homes bring that large history back to human scale. Settle into Hangzhou for two nights.",
      "专车从同里到杭州，水路的尺度也变了：枕边的小河成了贯通南北、运送物资的大运河。下午在拱宸桥、桥西看老商街与后来留下的工业建筑，再走小河直街的河埠头与民居。运河不仅是风景，也曾是养活一座城的路。今晚起在杭州连住两晚。",
      "퉁리의 좁은 물길을 떠나 전용 차량으로 항저우 대운하로 향합니다. 궁천교와 차오시에서는 옛 상업과 공장의 흔적을, 샤오허제에서는 물가 주택과 배가 닿던 작은 계단을 만납니다. 물이 풍경인 동시에 도시의 살림이었다는 사실을 떠올리며 항저우에서 첫 밤을 보냅니다.",
    )),
    day(6, l("West Lake and the Longjing tea hills", "西湖与龙井茶山", "서호와 룽징 차밭"), l(
      "West Lake is a landscape shaped by generations of poets, officials and gardeners, not simply a view. Follow a comfortable portion of Broken Bridge, Bai Causeway and Solitary Hill, where Xiling Seal Society keeps the art of seal carving alive; a lake boat and a stretch of Su Causeway follow if conditions and your pace allow. In the afternoon, trace a cup of Longjing tea back to the hills of Wengjiashan and Longjing village. A grower visit is arranged when available, with the China National Tea Museum's Longjing site considered around its opening schedule. Dinner in Hangzhou is included; tea picking depends on season and is not promised.",
      "西湖不只是一片天然湖色，也是历代人在山水中留下的审美。按体力走断桥、白堤、孤山与西泠印社一带；若游船运营，可乘行程内的西湖船，再选走一段苏堤，不强求全线。午后到翁家山、龙井村，看一杯龙井茶从哪里来；茶农拜访须能安排，中国茶叶博物馆龙井馆区也以开放情况为准。包含一顿杭州晚餐；采茶受季节影响，无法保证。",
      "단교에서 백제를 지나 고산으로 걷는 동안, 서호가 자연 풍경인 동시에 오랜 세월 사람의 손길로 다듬어진 문화 경관임을 느낍니다. 서령인사에서 인장 예술을 살펴보고, 운항하면 일정에 포함된 호수 배를 탄 뒤 체력에 맞춰 소제 일부를 걷습니다. 오후에는 웡자산과 룽징의 차밭으로 옮겨 가능하다면 차 농가를 방문하고, 개관 상황에 맞춰 중국 차 박물관 룽징관을 찾습니다. 항저우 석식 한 번이 포함되며 찻잎 따기는 계절에 따라 달라집니다.",
    )),
    day(7, l("Fast train to Shanghai; old city and Yu Garden", "高铁到上海：老城与豫园", "고속철로 상하이 이동, 구시가와 예원"), l(
      "Take the fast train to Shanghai, with private transfers at both ends. Begin in the old city: step into Yu Garden itself, then walk the surrounding streets as a different layer of the neighbourhood. After Suzhou's scholar gardens, the garden and trading streets here open Shanghai's chapter of the Jiangnan story. Train, station and visiting order are confirmed for your dates.",
      "乘高铁到上海，两端由私车接续。先走老城厢：进豫园园林，看一座院落怎样在闹市里收住山水；再到园外街巷，读另一层市井与商贸气息。走过苏州的文人园林，上海便以不同的方式接过江南的故事。车次、车站与游览次序按实际日期确认。",
      "항저우에서 고속철을 타고 상하이로 향합니다. 양쪽 역에서는 전용 차량이 이동을 잇고, 오후에는 옛 성곽 도심과 예원 정원, 그 주변의 거리들을 구분해 걸어봅니다. 쑤저우의 문인 정원에서 시작한 여정은 상하이의 정원과 상업 거리에서 새로운 장을 엽니다. 열차와 방문 순서는 실제 날짜에 맞춰 확정합니다.",
    )),
    day(8, l("Former French Concession and the Bund's buildings", "梧桐街区与外滩建筑", "옛 프랑스 조계지와 와이탄 건축"), l(
      "Walk Wukang and Sinan Roads, reading the city's residential chapters in garden houses and lilong lanes. View Bugaoli from the public street—it is still private housing and not open for visits—and compare the adapted Jianyeli and Xintiandi areas without treating them as the same kind of place. On the Bund, read the facades as records of trade and empire. Interiors of the Peace Hotel, former HSBC building or former Shanghai Club are explored only where access is confirmed for your date.",
      "沿武康路、思南路步行，从花园洋房读到里弄生活。步高里仍是民居、不对游客开放，我们只从公共街道看外观；再看建业里与新天地如何被修复和重新使用，不把它们混成同一种“老上海”。到了外滩，建筑立面讲起近代贸易与城市变迁。和平饭店、原汇丰银行大厅、原上海总会等内部空间，只有核实开放与入内方式后才安排。",
      "우캉루와 쓰난루의 가로수 아래를 걷고, 부가오리는 지금도 주민이 사는 비공개 주거지이므로 공공 도로에서 외관만 봅니다. 젠예리와 신톈디의 재생 공간은 서로 다른 방식으로 옛 건물을 오늘에 연결합니다. 와이탄에서는 강변 풍경 너머 건물의 역사에 귀를 기울입니다. 피스 호텔, 옛 HSBC 건물, 옛 상하이 클럽의 실내 출입은 여행 날짜에 맞춰 따로 확인합니다.",
    )),
    day(9, l("Hongkou's Jewish refuge history", "虹口：犹太难民与街区历史", "훙커우의 유대인 피난 역사"), l(
      "At the Shanghai Jewish Refugees Museum, centred on the former Ohel Moshe Synagogue, learn how refuge became part of Hongkou's history. Walk public stretches of Zhoushan Road, Huoshan Park and Tilanqiao, where the story belongs to streets as well as displays. Later, Shanghai History Museum places this one neighbourhood within the city's longer history. Museum opening days and the sequence are checked for your travel dates; residential interiors are not part of the visit.",
      "先到以上海摩西会堂旧址为核心的上海犹太难民纪念馆，了解虹口曾如何成为他人的避难之地。随后沿舟山路、霍山公园与提篮桥的公共街道走，把展柜里的历史放回真实街区；再到上海市历史博物馆，看这一段记忆如何嵌入更长的城市史。馆舍开放日和顺序按日期核对，不进入居民私人空间。",
      "훙커우에서는 상하이가 유대인 난민들에게 피난처였던 시절을 차분히 마주합니다. 옛 오헬 모세 회당을 중심으로 한 상하이 유대인 난민 기념관을 방문하고, 저우산루·훠산공원·티란차오의 공공 거리를 걸으며 장소에 남은 이야기를 듣습니다. 이어 상하이 역사박물관에서 이 동네의 역사를 도시 전체의 변화 속에 놓아봅니다. 개관일과 순서는 실제 날짜에 확인하며 주거 건물 내부에는 들어가지 않습니다.",
    )),
    day(10, l("Shanghai Museum East, Pudong and the Bund after dark", "上海博物馆东馆、浦东与夜外滩", "상하이 박물관 동관·푸둥·밤의 와이탄"), l(
      "Spend time with selected galleries at Shanghai Museum East, then look outward to Pudong and the planning that reshaped this bank of the river. The museum visit is self-guided or uses a museum-approved interpreter; your private guide handles the wider day. If tickets and visibility make sense, Top of Shanghai can be added as an option. Return to the Bund after dark and see the same two banks in a new light. The deck and exact museum plan are confirmed in writing.",
      "在上海博物馆东馆选看展厅，再把目光转向浦东：江的这一岸如何在近几十年重写天际线。馆内由客人自行参观，或使用馆方批准的讲解；私家导游负责馆外的背景与行程衔接。若票务和能见度合适，可另加上海之巅观景；夜晚回到外滩，看同一条江的两岸换一种光。观景台与具体参观安排以书面确认为准。",
      "상하이 박물관 동관에서 개방된 전시실을 살펴본 뒤 푸둥으로 향합니다. 오래된 물길과 정원에서 시작한 여행은 이곳에서 새로 설계된 도시의 풍경과 만납니다. 박물관 안에서는 자유 관람 또는 사전 승인된 해설을 이용하고, 개인 가이드는 박물관 밖의 맥락과 동선을 돕습니다. 시야와 입장권 상황이 맞으면 상하이 타워 전망대를 추가하고, 저녁에는 와이탄에서 강 양편의 다른 시대를 함께 바라봅니다. 전망대 포함 여부는 최종 견적에 명시합니다.",
    )),
    day(11, l("An open day in Shanghai", "上海自由活动日", "상하이 자유일"), l(
      "Keep one day unclaimed. Return to a street you loved, follow a personal interest, or walk a self-chosen stretch of the Yangpu riverfront, where former industrial sites offer another view of Shanghai's working past. Nothing is fixed today. A guide or private vehicle is added only on request and priced separately in writing.",
      "把一天真正留给自己：回到喜欢的街角、追一段个人兴趣，或自行挑杨浦滨江的一段走走，看旧工业沿线如何成为新的公共空间。今天没有固定景点，导游与私车也不默认包含；若想增加，我们再按你的想法书面报价。",
      "오늘은 미리 정해 둔 관광 코스 없이 상하이를 자신의 속도로 만나는 날입니다. 원한다면 옛 산업시설이 남아 있는 양푸 강변의 한 구간을 스스로 걸어보세요. 가이드나 전용 차량은 요청을 받아 서면으로 별도 견적한 경우에만 추가됩니다.",
    )),
    day(12, l("Depart from Shanghai Pudong", "上海浦东送机", "상하이 푸둥 출발"), l(
      "After breakfast and check-out, your driver takes you to Shanghai Pudong Airport at a time set around your confirmed flight. The last day is left clear of sightseeing, so the journey can end without a race against departure time.",
      "早餐后退房，司机按确认的航班时间送往上海浦东机场。最后一天不塞景点，让这段从园林到城市的旅程从容收尾。",
      "열두 날 동안 따라온 물길은 상하이에서 마무리됩니다. 아침 식사와 체크아웃 후 확정된 항공편에 맞춰 전용 차량으로 푸둥 공항으로 이동하며, 이날은 고정 관광을 넣지 않습니다.",
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
      question: l("Why spend a night in Tongli rather than visit for a few hours?", "为什么在同里住一晚，而不是半日往返？", "퉁리에서 당일치기 대신 왜 1박하나요?"),
      answer: l(
        "The half-day guide covers Tuisi Garden and the Three Bridges, but the overnight stay gives you an unscheduled evening and morning in the water town. It also keeps the journey moving naturally from Suzhou toward Hangzhou.",
        "半天导览可看退思园和三桥；留宿一晚，则有不按导览时钟走的傍晚与清晨，也让苏州到杭州的路线顺势向前，不必当天往返。",
        "반일 가이드와 퇴사원·세 다리를 본 뒤에도 마을에서 저녁과 다음 날 아침을 보낼 수 있습니다. 쑤저우에서 항저우로 이어지는 동선에도 자연스럽습니다.",
      ),
    },
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
      question: l("Can we enter Shanghai's old residential lanes and have a private guide inside every museum?", "上海老里弄能进去吗？私家导游能在博物馆内讲解吗？", "상하이의 옛 주거 골목과 박물관 내부에 모두 들어갈 수 있나요?"),
      answer: l(
        "Not universally. Bugaoli is still private housing and is viewed from public streets. Other historic interiors depend on access for your date. Shanghai Museum East requires prior approval for any organized gallery guiding, so we plan self-guided galleries or a museum-approved interpreter. Museum closure days may change the order of the Shanghai visits.",
        "不能一概保证。步高里仍是私人住宅，只从公共街道看外观；其他历史建筑内部是否开放须逐处核实。上海博物馆东馆的展厅组织讲解须事先获馆方批准，因此馆内安排自行参观或馆方认可的讲解。若遇闭馆日，上海段顺序也会调整。",
        "모두 가능한 것은 아닙니다. 부가오리는 현재 주거지이므로 공공 도로에서 외관만 봅니다. 다른 역사 건물의 실내 출입도 날짜별로 확인합니다. 상하이 박물관 동관의 단체 전시실 해설은 사전 승인이 필요해 자유 관람 또는 승인된 해설을 계획하며, 휴관일에는 방문 순서를 바꿉니다.",
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
