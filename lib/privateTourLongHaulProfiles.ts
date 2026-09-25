import type {
  ComparisonProfile,
  PrivateTourExpansionLocalizedText,
} from "./privateTourExpansionProfiles";

const l = (
  en: string,
  zh: string,
  ko: string,
): PrivateTourExpansionLocalizedText => ({ en, zh, ko });

const classicRoute = l(
  "Beijing · Xi'an · Chengdu · Guilin · Yangshuo · Shanghai",
  "北京 · 西安 · 成都 · 桂林 · 阳朔 · 上海",
  "베이징 · 시안 · 청두 · 구이린 · 양숴 · 상하이",
);

export const privateTourLongHaulProfiles: Readonly<
  Record<string, ComparisonProfile>
> = {
  "beijing-xian-chengdu-guilin-shanghai-14-day-private-tour": {
    route: classicRoute,
    appeal: l(
      "For a first trip, this route gives each of Beijing, Xi'an, Chengdu, the Li River and Shanghai its own time. The Great Wall and Terracotta Warriors sit between city days, rather than on travel days.",
      "第一次来中国，可以把北京、西安、成都、漓江和上海都走到。长城和兵马俑各有游览日，不用塞进转场那天。",
      "첫 중국 여행이라면 베이징, 시안, 청두, 리강, 상하이를 차례로 볼 수 있습니다. 만리장성과 병마용은 이동일에 끼워 넣지 않습니다.",
    ),
    pace: l(
      "Thirteen nights in six hotels, joined by two high-speed trains and two domestic flights, with light arrival and travel days.",
      "13 晚住 6 家酒店，用两段高铁和两段国内航班连接，抵达日与转场日安排较轻。",
      "호텔 6곳에서 13박하며 고속철도 2구간과 국내선 2구간으로 잇고 도착일과 이동일은 가볍게 둡니다.",
    ),
    fit: l(
      "For couples, families or friends who want to set their own dates and keep the guide and vehicle to themselves.",
      "适合想自己定日期、导游和车都只服务自己一行的情侣、家庭或朋友。",
      "출발일을 직접 정하고 가이드와 차량을 일행만 쓰고 싶은 커플, 가족, 친구에게 맞습니다.",
    ),
  },
  "beijing-xian-chengdu-guilin-shanghai-14-day-small-group-tour": {
    route: classicRoute,
    appeal: l(
      "Beijing, Xi'an, Chengdu, the Li River and Shanghai on four fixed 2027 departures. At most 12 guests share the guide and vehicle, which lowers the price per person.",
      "北京、西安、成都、漓江和上海这条线，2027 年有四个固定出发日。最多 12 人共用导游和车，每人的费用因此更低。",
      "베이징, 시안, 청두, 리강, 상하이를 2027년 네 차례의 정기 출발로 여행합니다. 최대 12명이 가이드와 차량을 함께 쓰므로 1인 요금이 낮아집니다.",
    ),
    pace: l(
      "Everyone follows one plan on fixed dates. The trip runs with at least 8 guests; if it cannot run, you can take a full refund.",
      "日期和每天的安排是固定的。满 8 人出发；若未成团，可以选择全额退款。",
      "정해진 날짜에 모두 같은 일정으로 움직입니다. 8명부터 출발하며 출발하지 못하면 전액 환불을 선택할 수 있습니다.",
    ),
    fit: l(
      "A practical choice if you travel alone or as a couple and do not need a private guide or vehicle.",
      "一个人或两个人出行，不介意和其他团友共用导游与车，可以看这条。",
      "혼자 또는 둘이 여행하며 전용 가이드와 차량이 꼭 필요하지 않다면 살펴볼 만합니다.",
    ),
  },
  "beijing-xian-zhangjiajie-guilin-shanghai-14-day-private-tour": {
    route: l(
      "Beijing · Xi'an · Zhangjiajie · Guilin · Yangshuo · Shanghai",
      "北京 · 西安 · 张家界 · 桂林 · 阳朔 · 上海",
      "베이징 · 시안 · 장가계 · 구이린 · 양숴 · 상하이",
    ),
    appeal: l(
      "Beijing and Xi'an come first. Then spend three nights around Zhangjiajie's sandstone pillars and three around the Li River before ending in Shanghai.",
      "先看北京和西安，再把张家界峰林和漓江山水各留三晚，最后到上海。这样两段山水都不用当天赶来赶去。",
      "베이징과 시안을 먼저 보고 장가계 사암 봉우리와 리강 주변에서 각각 3박한 뒤 상하이로 갑니다. 두 풍경을 당일치기로 서두르지 않습니다.",
    ),
    pace: l(
      "Thirteen nights in seven hotel stays, with Tianmen Mountain and a full Forest Park day.",
      "13 晚共 7 段住宿，含天门山和森林公园完整一天。",
      "호텔 7곳에서 13박하며 천문산과 삼림공원 종일 일정이 있습니다.",
    ),
    fit: l(
      "Pick this route if Zhangjiajie and the Li River matter more to you than Chengdu's pandas. It includes a full Forest Park day and Tianmen Mountain.",
      "如果比起成都大熊猫，你更想看张家界和漓江，可以选这条。森林公园有完整一天，也留了天门山。",
      "청두 판다보다 장가계와 리강이 더 끌린다면 이 일정이 맞습니다. 삼림공원에 하루를 쓰고 천문산도 봅니다.",
    ),
  },
  "beijing-xian-chengdu-yangtze-cruise-shanghai-17-day-private-tour": {
    route: l(
      "Beijing · Xi'an · Chengdu · Chongqing · Yangtze River · Shanghai · Suzhou day trip",
      "北京 · 西安 · 成都 · 重庆 · 长江 · 上海 · 苏州一日往返",
      "베이징 · 시안 · 청두 · 충칭 · 양쯔강 · 상하이 · 쑤저우 당일치기",
    ),
    appeal: l(
      "Travel between Beijing, Xi'an, Chengdu and Chongqing by train, then spend three nights sailing downstream through the Three Gorges to Yichang. Shanghai comes after the cruise.",
      "北京、西安、成都、重庆之间坐高铁。到了重庆上船，顺流经过三峡到宜昌，在船上住三晚，然后再去上海。",
      "베이징, 시안, 청두, 충칭을 열차로 잇고 충칭에서 이창까지 삼협을 따라 내려가는 배에서 3박합니다. 크루즈 뒤에는 상하이로 갑니다.",
    ),
    pace: l(
      "Sixteen nights: thirteen in hotels and three on the ship, with four unhurried nights in Shanghai at the end.",
      "共 16 晚：酒店 13 晚、游轮 3 晚，最后在上海从容住 4 晚。",
      "총 16박으로 호텔 13박과 선상 3박이며 마지막에 상하이에서 여유롭게 4박합니다.",
    ),
    fit: l(
      "For a two-and-a-half-week trip where the cruise is one part of the route, rather than the whole holiday.",
      "适合有两周半时间、想把三峡游轮放进中国行程里，但不想整趟都按游轮线路走的人。",
      "2주 반 일정 중 일부만 삼협 크루즈로 보내고 나머지는 육로 여행으로 채우고 싶다면 맞습니다.",
    ),
  },
  "beijing-xian-silk-road-15-day-private-tour": {
    route: l(
      "Beijing · Xi'an · Zhangye · Jiayuguan · Dunhuang · Turpan · Urumqi",
      "北京 · 西安 · 张掖 · 嘉峪关 · 敦煌 · 吐鲁番 · 乌鲁木齐",
      "베이징 · 시안 · 장예 · 자위관 · 둔황 · 투루판 · 우루무치",
    ),
    appeal: l(
      "After Beijing and the Terracotta Warriors, the route heads west: Zhangye Danxia, Jiayuguan, the Mogao Caves and Turpan. The distances between stops are part of this trip.",
      "北京和兵马俑之后一路向西，经过张掖丹霞、嘉峪关、莫高窟和吐鲁番。各站相隔远，这条线会有长途转场。",
      "베이징과 병마용을 본 뒤 장예 칠채산, 자위관, 막고굴, 투루판으로 서쪽을 향합니다. 도시 사이 거리가 멀어 이동일이 깁니다.",
    ),
    pace: l(
      "Fourteen nights at eight stops, with long desert legs by high-speed train and private car and a flight back east from Urumqi.",
      "14 晚住 8 个地方，戈壁长途段用高铁和私车，最后从乌鲁木齐飞回东部。",
      "8곳에서 14박하며 긴 사막 구간은 고속철도와 전용 차량으로, 마지막은 우루무치에서 동부로 날아갑니다.",
    ),
    fit: l(
      "For travellers who would trade some city time for the Mogao Caves and the west, and are comfortable with long train and road days.",
      "如果你更想去莫高窟和西部，能接受高铁与公路长途，这条比只走经典城市更合适。",
      "도시 관광 시간을 조금 줄여 막고굴과 서부를 보고 싶고 긴 열차·차량 이동을 감당할 수 있다면 맞습니다.",
    ),
  },
  "beijing-xian-yunnan-14-day-private-tour": {
    route: l(
      "Beijing · Xi'an · Kunming · Dali · Lijiang · Shangri-La · Shanghai",
      "北京 · 西安 · 昆明 · 大理 · 丽江 · 香格里拉 · 上海",
      "베이징 · 시안 · 쿤밍 · 다리 · 리장 · 샹그릴라 · 상하이",
    ),
    appeal: l(
      "Beijing and Xi'an give you the old capitals. Yunnan then takes you from the Stone Forest and Erhai Lake through Lijiang and Tiger Leaping Gorge to Shangri-La.",
      "前面看北京和西安，后面把时间留给云南：石林、洱海、丽江、虎跳峡，最后到香格里拉。",
      "베이징과 시안에서 옛 수도를 본 뒤 윈난으로 갑니다. 석림과 얼하이에서 리장, 호도협을 지나 샹그릴라까지 이어집니다.",
    ),
    pace: l(
      "Thirteen nights at seven stops, climbing step by step to Shangri-La at about 3,300 metres.",
      "13 晚住 7 个地方，逐步升高到海拔约 3,300 米的香格里拉。",
      "7곳에서 13박하며 해발 약 3,300미터 샹그릴라까지 단계적으로 올라갑니다.",
    ),
    fit: l(
      "Choose Yunnan if lakes and mountain towns matter more than adding another major city. The route rises gradually to Shangri-La at about 3,300 metres.",
      "不想一路只看大城市，想去湖边和山里小镇，可以选云南。不过行程会逐步升到海拔约 3,300 米的香格里拉。",
      "대도시를 한 곳 더 가기보다 호수와 산속 마을이 좋다면 윈난을 택하세요. 샹그릴라까지 점차 올라가며 고도는 약 3,300미터입니다.",
    ),
  },
  "beijing-xian-huangshan-hangzhou-shanghai-14-day-private-tour": {
    route: l(
      "Beijing · Xi'an · Huangshan · Hangzhou · Suzhou · Shanghai",
      "北京 · 西安 · 黄山 · 杭州 · 苏州 · 上海",
      "베이징 · 시안 · 황산 · 항저우 · 쑤저우 · 상하이",
    ),
    appeal: l(
      "After Beijing and Xi'an, take the eastern route through Huangshan and Hongcun. West Lake and Suzhou's gardens come before Shanghai.",
      "北京和西安之后往东走，先看黄山与宏村，再去西湖、苏州园林，最后到上海。",
      "베이징과 시안 뒤에는 동쪽으로 갑니다. 황산과 훙촌을 보고 서호와 쑤저우 정원을 거쳐 상하이에 도착합니다.",
    ),
    pace: l(
      "Thirteen nights at six stops, with one long train or flight from Xi'an and short high-speed trains through the east.",
      "13 晚住 6 个地方，从西安过去是一段长途高铁或航班，东部都是短途高铁。",
      "6곳에서 13박하며 시안에서는 긴 고속철도나 항공편 한 번, 동부는 짧은 고속철도로 이동합니다.",
    ),
    fit: l(
      "A good fit if you would rather spend time on one mountain and in gardens than keep changing big cities. Huangshan still calls for walking and steps.",
      "如果你想把时间留给黄山、茶乡和园林，而不是继续加大城市，可以走这条。黄山那天仍要走路和爬台阶。",
      "대도시를 계속 옮기기보다 산 한 곳과 정원에 시간을 쓰고 싶다면 맞습니다. 황산에서는 걷고 계단을 올라야 합니다.",
    ),
  },
  "china-grand-tour-21-day-private-tour": {
    route: l(
      "Beijing · Xi'an · Chengdu · Guilin · Yangshuo · Zhangjiajie · Chongqing · Yangtze River · Shanghai",
      "北京 · 西安 · 成都 · 桂林 · 阳朔 · 张家界 · 重庆 · 长江 · 上海",
      "베이징 · 시안 · 청두 · 구이린 · 양숴 · 장가계 · 충칭 · 양쯔강 · 상하이",
    ),
    appeal: l(
      "Three weeks make room for Beijing and Xi'an, Chengdu's pandas, the Li River, Zhangjiajie and three nights on a Three Gorges cruise. It is a long route, with a full day at each stop.",
      "有三周时间，才好把北京、西安、成都大熊猫、漓江、张家界和三晚三峡游轮放在一趟里。每一站至少留一个完整游览日。",
      "3주라면 베이징과 시안, 청두 판다, 리강, 장가계, 삼협 3박 크루즈를 한 번에 잇고 각 지역에서 적어도 하루를 보낼 수 있습니다.",
    ),
    pace: l(
      "Twenty nights: seventeen in hotels and three on the ship, with at least one full day at every stop.",
      "共 20 晚：酒店 17 晚、游轮 3 晚，每一站至少一个完整游览日。",
      "총 20박으로 호텔 17박과 선상 3박이며 모든 곳에 최소 하루의 온전한 일정이 있습니다.",
    ),
    fit: l(
      "For a first China visit when you have three weeks and want both the mountain scenery and the river cruise. Expect more transfers than on a two-week route.",
      "第一次来中国，又有三周假期，山水和游轮都不想舍弃，可以考虑这条。转场会比两周线多。",
      "첫 중국 여행에 3주를 쓸 수 있고 산 풍경과 강 크루즈를 모두 원한다면 맞습니다. 2주 일정에 비해 이동 횟수는 많습니다.",
    ),
  },
  "beijing-xian-zhangjiajie-guilin-shanghai-14-day-small-group-tour": {
    route: l(
      "Beijing · Xi'an · Zhangjiajie · Guilin · Yangshuo · Shanghai",
      "北京 · 西安 · 张家界 · 桂林 · 阳朔 · 上海",
      "베이징 · 시안 · 장가계 · 구이린 · 양숴 · 상하이",
    ),
    appeal: l(
      "Zhangjiajie and the Li River stay in the 14-day route. On two fixed 2027 dates, up to 12 guests share the guide and vehicle for a lower price per person.",
      "张家界和漓江都保留在 14 天路线里。2027 年有两个固定出发日，最多 12 人共用导游和车，每人费用比私家团低。",
      "14일 일정에 장가계와 리강을 모두 넣었습니다. 2027년 두 차례 정기 출발하며 최대 12명이 가이드와 차량을 함께 써 1인 요금을 낮춥니다.",
    ),
    pace: l(
      "The dates and daily plan are shared. At least 8 guests are needed; if the trip cannot run, you can choose a full refund.",
      "全团按同一日期和行程走。满 8 人出发；若未成团，可以选择全额退款。",
      "날짜와 일정을 함께 쓰는 상품입니다. 8명부터 출발하며 출발하지 못하면 전액 환불을 선택할 수 있습니다.",
    ),
    fit: l(
      "For solo travellers or couples who want both landscape stops and are comfortable following the group's pace.",
      "适合一个人或两个人出行，想看两段山水，也愿意跟着全团的节奏走。",
      "혼자 또는 둘이 장가계와 리강을 모두 보고 싶고 그룹 속도에 맞춰도 괜찮다면 적합합니다.",
    ),
  },
  "beijing-xian-chengdu-yangtze-cruise-shanghai-17-day-small-group-tour": {
    route: l(
      "Beijing · Xi'an · Chengdu · Chongqing · Yangtze River · Shanghai · Suzhou day trip",
      "北京 · 西安 · 成都 · 重庆 · 长江 · 上海 · 苏州一日往返",
      "베이징 · 시안 · 청두 · 충칭 · 양쯔강 · 상하이 · 쑤저우 당일치기",
    ),
    appeal: l(
      "This 17-day route puts a three-night Three Gorges cruise between the city stays. It has two fixed 2027 departures and no more than 12 guests.",
      "17 天里有三晚住在三峡游轮上，前后接城市行程。2027 年有两个固定出发日，每团最多 12 人。",
      "17일 일정 중 3박은 삼협 크루즈에서 보냅니다. 2027년 두 차례 정기 출발하며 한 그룹은 최대 12명입니다.",
    ),
    pace: l(
      "All guests follow the same land itinerary and sailing. The group runs with at least 8; if it cannot run, a full refund is available.",
      "陆上行程和游轮航期都按全团统一安排。满 8 人出发；若未成团，可以选择全额退款。",
      "육상 일정과 크루즈 운항일을 모두 함께 맞춥니다. 8명부터 출발하며 출발하지 못하면 전액 환불을 선택할 수 있습니다.",
    ),
    fit: l(
      "For someone who wants the cruise and city days in a group capped at 12, and can travel on the set dates.",
      "想坐三峡游轮、也想看几座城市，能接受固定日期和最多 12 人同行，可以选这条。",
      "정해진 날짜에 갈 수 있고 크루즈와 도시 관광을 최대 12명 그룹으로 하고 싶다면 맞습니다.",
    ),
  },
  "beijing-xian-silk-road-15-day-small-group-tour": {
    route: l(
      "Beijing · Xi'an · Zhangye · Jiayuguan · Dunhuang · Turpan · Urumqi",
      "北京 · 西安 · 张掖 · 嘉峪关 · 敦煌 · 吐鲁番 · 乌鲁木齐",
      "베이징 · 시안 · 장예 · 자위관 · 둔황 · 투루판 · 우루무치",
    ),
    appeal: l(
      "The 15-day Silk Road route crosses long stretches of western China. Two fixed 2027 departures let up to 12 guests share those road and rail days, at a lower price per person.",
      "15 天丝路会穿过很长的西部路段。2027 年两个固定出发日，最多 12 人一起走高铁和公路，每人的费用较低。",
      "15일 실크로드 일정에는 중국 서부의 긴 이동 구간이 있습니다. 2027년 두 차례 정기 출발하며 최대 12명이 열차와 차량을 함께 써 1인 요금을 낮춥니다.",
    ),
    pace: l(
      "Departure dates and the route are fixed. At least 8 guests are needed; if the group cannot run, you can take a full refund.",
      "日期和路线固定。满 8 人出发；若未成团，可以选择全额退款。",
      "출발일과 경로가 정해져 있습니다. 8명부터 출발하며 출발하지 못하면 전액 환불을 선택할 수 있습니다.",
    ),
    fit: l(
      "For travellers who want to see the western sites and would rather share the long transfers with a few others.",
      "想看西部的景点，也愿意和少数团友一起走长途转场，适合选这条。",
      "서부 명소를 보고 싶고 긴 이동 구간을 다른 몇 명과 함께 보내고 싶다면 맞습니다.",
    ),
  },
  "beijing-xian-guilin-shanghai-10-day-private-tour": {
    route: l(
      "Beijing · Xi'an · Guilin · Yangshuo · Shanghai",
      "北京 · 西安 · 桂林 · 阳朔 · 上海",
      "베이징 · 시안 · 구이린 · 양숴 · 상하이",
    ),
    appeal: l(
      "Ten days cover the Great Wall, the Terracotta Warriors, a Li River cruise and Shanghai. There is a travel day between each main stop.",
      "十天可以看长城、兵马俑、坐漓江游船，最后到上海。几个主要站点之间都留了转场日。",
      "열흘 동안 만리장성과 병마용을 보고 리강 유람선을 탄 뒤 상하이로 갑니다. 주요 지역 사이에는 이동일을 둡니다.",
    ),
    pace: l(
      "Nine nights in five hotels, joined by one high-speed train and two domestic flights.",
      "9 晚住 5 家酒店，用一段高铁和两段国内航班连接。",
      "호텔 5곳에서 9박하며 고속철도 1구간과 국내선 2구간으로 잇습니다.",
    ),
    fit: l(
      "For a first visit with about ten days. It keeps the route to four main stops instead of adding another city.",
      "第一次来中国，只有十天左右，可以先走这四站，不再硬加一个城市。",
      "첫 여행에 열흘 정도 쓸 수 있다면 네 주요 지역에 집중하는 일정입니다. 도시를 하나 더 넣지 않습니다.",
    ),
  },
  "beijing-hangzhou-suzhou-shanghai-11-day-private-tour": {
    route: l(
      "Beijing · Hangzhou · Suzhou · Shanghai",
      "北京 · 杭州 · 苏州 · 上海",
      "베이징 · 항저우 · 쑤저우 · 상하이",
    ),
    appeal: l(
      "There is no domestic flight on this route. After four nights in Beijing, trains take you to Hangzhou, Suzhou and Shanghai, with West Lake, gardens and a water town along the way.",
      "整条线不用坐国内航班。北京住四晚后，坐高铁到杭州、苏州、上海，中间有西湖、园林和水乡古镇。",
      "국내선을 타지 않는 일정입니다. 베이징에서 4박한 뒤 열차로 항저우, 쑤저우, 상하이를 잇고 서호와 정원, 수향마을을 봅니다.",
    ),
    pace: l(
      "Ten nights in four cities with no domestic flights; the longest train is Beijing to Hangzhou.",
      "10 晚住四座城市，没有国内航班；最长一段是北京到杭州的高铁。",
      "네 도시에서 10박하며 국내선은 없고 가장 긴 구간은 베이징–항저우 고속철도입니다.",
    ),
    fit: l(
      "For anyone who wants gardens and waterside towns after Beijing and prefers trains to domestic flights. Beijing to Hangzhou is the long rail leg.",
      "看完北京之后，更想慢慢逛园林和水乡，也不想坐国内航班，可以选这条。北京到杭州是其中最长的高铁段。",
      "베이징 뒤에는 정원과 물가 마을을 보고 싶고 국내선보다 열차가 편하다면 맞습니다. 베이징–항저우가 가장 긴 열차 구간입니다.",
    ),
  },
  "shanghai-zhangjiajie-fenghuang-guilin-13-day-private-tour": {
    route: l(
      "Shanghai · Zhangjiajie · Fenghuang · Guilin · Longji · Yangshuo",
      "上海 · 张家界 · 凤凰 · 桂林 · 龙脊 · 阳朔",
      "상하이 · 장가계 · 봉황 · 구이린 · 룽지 · 양숴",
    ),
    appeal: l(
      "Fly into and out of Shanghai, then spend the middle of the trip among Zhangjiajie's peaks, Fenghuang, the Longji rice terraces and the Li River.",
      "从上海进出，中间把时间留给张家界峰林、凤凰古城、龙脊梯田和漓江。",
      "상하이로 들어와 상하이에서 돌아갑니다. 중간 일정은 장가계 봉우리, 봉황고성, 룽지 다랑논과 리강에 씁니다.",
    ),
    pace: l(
      "Twelve nights at seven stays, with two flights and two high-speed trains through southern China.",
      "12 晚住 7 个地方，南方段用两段航班和两段高铁连接。",
      "7곳에서 12박하며 남부 구간은 항공 2구간과 고속철도 2구간으로 잇습니다.",
    ),
    fit: l(
      "For a return visit if you have already seen the northern capitals. There are seven hotel stays in twelve nights, so expect to move often.",
      "如果北京和西安已经去过，下一趟想看山水小镇，可以走这条。12 晚住 7 个地方，换酒店会比较频繁。",
      "베이징과 시안을 이미 봤다면 다음 여행으로 어울립니다. 12박 동안 숙소 7곳을 옮기므로 이동이 잦습니다.",
    ),
  },
};
