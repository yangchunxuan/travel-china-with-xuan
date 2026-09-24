import type {
  ComparisonProfile,
  PrivateTourExpansionLocalizedText,
} from "./privateTourExpansionProfiles";

const l = (
  en: string,
  zh: string,
  ko: string,
): PrivateTourExpansionLocalizedText => ({ en, zh, ko });

export const privateTourExpansionPhaseTwoProfiles: Readonly<
  Record<string, ComparisonProfile>
> = {
  "shanghai-disneyland-5-day-private-tour": {
    route: l(
      "Shanghai · Shanghai Disneyland",
      "上海 · 上海迪士尼",
      "상하이 · 상하이 디즈니랜드",
    ),
    appeal: l(
      "Stay in one Shanghai hotel, see the Bund and old city at a comfortable pace, devote a full day to Disneyland and keep one lighter day for neighbourhoods and free time.",
      "上海同一家酒店连住，以从容节奏看外滩与老城，把完整一天留给迪士尼，再用一天轻松逛街区并保留自由时间。",
      "상하이 한 호텔에 머물며 와이탄과 구시가를 여유롭게 보고, 디즈니랜드에 하루를 온전히 쓰고, 하루는 동네 산책과 자유 시간으로 남깁니다.",
    ),
    pace: l(
      "Four nights in one Shanghai hotel, with guided city touring on Days 2 and 4 and a full Disneyland day on Day 3.",
      "上海同一家酒店连住 4 晚，第 2、4 天安排城市导游服务，第 3 天完整游览迪士尼。",
      "상하이 한 호텔에서 4박하며 2일·4일 차에는 도심 가이드 일정, 3일 차에는 디즈니랜드 종일 일정을 진행합니다.",
    ),
    fit: l(
      "Travellers who want Shanghai Disneyland, the Bund, Yu Garden and neighbourhood time without changing hotels.",
      "想住定一家酒店，同时游览上海迪士尼、外滩、豫园与城市街区的旅客。",
      "호텔을 옮기지 않고 상하이 디즈니랜드, 와이탄, 예원과 도심 동네를 둘러보고 싶은 여행자.",
    ),
  },
  "luoyang-dengfeng-kaifeng-6-day-private-tour": {
    route: l(
      "Zhengzhou · Kaifeng · Dengfeng · Luoyang",
      "郑州 · 开封 · 登封 · 洛阳",
      "정저우 · 카이펑 · 덩펑 · 뤄양",
    ),
    appeal: l(
      "Enter through Zhengzhou, give Kaifeng one full day, cross Dengfeng for Shaolin Temple and finish with two substantial Luoyang touring days.",
      "从郑州进入，给开封一个完整游览日，经登封看少林寺，最后用两个充足的游览日看洛阳。",
      "정저우로 들어와 카이펑에 하루를 쓰고 덩펑 소림사를 거쳐 뤄양에서 이틀간 핵심 유적을 봅니다.",
    ),
    pace: l(
      "One night in Zhengzhou, one in Kaifeng and three in Luoyang, with private guide and vehicle service on Days 2–5.",
      "郑州 1 晚、开封 1 晚、洛阳 3 晚，第 2–5 天安排私人导游与用车。",
      "정저우 1박, 카이펑 1박, 뤄양 3박이며 2~5일 차에 전용 가이드와 차량을 제공합니다.",
    ),
    fit: l(
      "Travellers focused on Henan heritage who want Kaifeng, Shaolin Temple and Longmen Grottoes in one one-way route.",
      "想用一条顺路行程集中游览开封、少林寺与龙门石窟的河南人文旅客。",
      "카이펑, 소림사와 용문석굴을 한 방향의 동선으로 만나고 싶은 허난 문화 여행자.",
    ),
  },
  "datong-pingyao-6-day-private-tour": {
    route: l(
      "Datong · Hanging Temple · Pingyao · Taiyuan",
      "大同 · 悬空寺 · 平遥 · 太原",
      "다퉁 · 현공사 · 핑야오 · 타이위안",
    ),
    appeal: l(
      "Start with Yungang and Datong's old city, travel south via Hanging Temple and Yingxian, stay two nights in Pingyao and finish in Taiyuan without driving back north.",
      "先看云冈石窟与大同古城，经悬空寺和应县一路向南，在平遥连住两晚，最后从太原离开，不再向北折返。",
      "운강석굴과 다퉁 구시가에서 시작해 현공사와 잉셴을 거쳐 남쪽으로 이동하고 핑야오 2박 후 타이위안에서 마칩니다.",
    ),
    pace: l(
      "Two nights in Datong, two in Pingyao and one in Taiyuan, with guide and vehicle service on Days 2–6 as the departure time allows.",
      "大同 2 晚、平遥 2 晚、太原 1 晚；第 2–6 天按返程时间安排导游与用车。",
      "다퉁 2박, 핑야오 2박, 타이위안 1박이며 출발 시간에 맞춰 2~6일 차에 가이드와 차량을 제공합니다.",
    ),
    fit: l(
      "Travellers who want Yungang Grottoes, Hanging Temple and two nights in Pingyao on a southbound route ending in Taiyuan.",
      "想游云冈石窟、悬空寺，并在平遥连住两晚后从太原离开的旅客。",
      "운강석굴과 현공사를 보고 핑야오에서 2박한 뒤 타이위안에서 마치고 싶은 여행자.",
    ),
  },
  "zhangye-jiayuguan-dunhuang-7-day-private-tour": {
    route: l(
      "Zhangye · Jiayuguan · Dunhuang",
      "张掖 · 嘉峪关 · 敦煌",
      "장예 · 자위관 · 둔황",
    ),
    appeal: l(
      "Begin with Zhangye's landforms, cross Jiayuguan and keep three nights in Dunhuang for Mogao Caves, the desert and a buffer against ticket or weather changes.",
      "从张掖丹霞出发，经嘉峪关一路向西，在敦煌连住三晚，为莫高窟、沙漠与票务或天气变化留出余量。",
      "장예 단샤에서 시작해 자위관을 거쳐 서쪽으로 이동하고 둔황에서 3박하며 막고굴, 사막과 예약·날씨 변동에 여유를 둡니다.",
    ),
    pace: l(
      "Two nights in Zhangye, one in Jiayuguan and three in Dunhuang, with private guide and vehicle service on Days 2–6.",
      "张掖 2 晚、嘉峪关 1 晚、敦煌 3 晚，第 2–6 天包含私人导游与用车。",
      "장예 2박, 자위관 1박, 둔황 3박이며 2~6일 차에 전용 가이드와 차량이 포함됩니다.",
    ),
    fit: l(
      "Travellers who want Zhangye Danxia, Jiayuguan Fort, Mogao Caves and desert scenery along the Hexi Corridor.",
      "想沿河西走廊串联张掖丹霞、嘉峪关关城、莫高窟与沙漠风景的旅客。",
      "허시회랑을 따라 장예 단샤, 자위관성, 막고굴과 사막 풍경을 보고 싶은 여행자.",
    ),
  },
  "chongqing-yangtze-cruise-6-day-private-tour": {
    route: l(
      "Chongqing · Yangtze Three Gorges · Yichang",
      "重庆 · 长江三峡 · 宜昌",
      "충칭 · 창장삼협 · 이창",
    ),
    appeal: l(
      "See Chongqing before boarding a date-confirmed downstream cruise, then pass the Three Gorges and finish in Yichang without retracing the route.",
      "先看重庆，再登上按日期确认的下水游轮，穿过长江三峡后从宜昌离开，不走回头路。",
      "충칭을 둘러본 뒤 날짜가 확정된 하행 크루즈에 승선해 삼협을 지나 이창에서 마칩니다.",
    ),
    pace: l(
      "Two nights in a Chongqing hotel followed by three nights in a balcony cruise cabin, ending in Yichang.",
      "重庆酒店住 2 晚，再在带阳台的游轮舱房住 3 晚，最后在宜昌结束。",
      "충칭 호텔 2박 뒤 발코니 크루즈 객실에서 3박하고 이창에서 마칩니다.",
    ),
    fit: l(
      "Travellers who want two Chongqing nights followed by a three-night downstream cruise through the Three Gorges.",
      "想先住两晚重庆，再乘三晚下水游轮穿过长江三峡的旅客。",
      "충칭에서 2박한 뒤 3박 하행 크루즈로 창장삼협을 지나고 싶은 여행자.",
    ),
  },
  "xinjiang-ili-sayram-8-day-private-tour": {
    route: l(
      "Urumqi · Sayram Lake · Yining · Tekes · Nalati",
      "乌鲁木齐 · 赛里木湖 · 伊宁 · 特克斯 · 那拉提",
      "우루무치 · 싸이리무호 · 이닝 · 터커스 · 나라티",
    ),
    appeal: l(
      "Travel from Urumqi to Sayram Lake, Yining, Tekes and Nalati, while keeping the exact grassland and return road flexible around seasonal opening conditions.",
      "从乌鲁木齐进入赛里木湖、伊宁、特克斯与那拉提，并按季节开放情况调整具体草原与返程道路。",
      "우루무치에서 싸이리무호, 이닝, 터커스와 나라티를 잇되 계절별 개방에 맞춰 초원과 귀환 도로를 조정합니다.",
    ),
    pace: l(
      "Seven breakfast-included nights on a seasonal circuit whose mountain roads, grassland access and hotels are checked by date.",
      "季节性环线共 7 晚含早，山区道路、草原开放与酒店均按日期核对。",
      "계절형 순환 일정으로 조식 포함 7박이며 산악 도로, 초원 접근과 호텔을 날짜별 확인합니다.",
    ),
    fit: l(
      "Travellers seeking a seasonal circuit of Sayram Lake, the Ili River valley and grassland, with road and access alternatives.",
      "想看赛里木湖、伊犁河谷与草原，并能接受道路和开放情况备用方案的旅客。",
      "싸이리무호, 이리강 계곡과 초원을 보고 도로와 접근 상황의 대체안도 받아들일 수 있는 여행자.",
    ),
  },
  "hulunbuir-7-day-private-tour": {
    route: l(
      "Hailar · Mergel River · Erguna · Manzhouli",
      "海拉尔 · 莫日格勒河 · 额尔古纳 · 满洲里",
      "하이라얼 · 모리거러강 · 얼구나 · 만저우리",
    ),
    appeal: l(
      "Travel from Hailar to the Mergel River, Erguna, forest settlements and Manzhouli, with summer road and accommodation details confirmed before sale.",
      "从海拉尔进入莫日格勒河、额尔古纳、森林村落与满洲里，并在售前确认夏季道路与住宿细节。",
      "하이라얼에서 모리거러강, 얼구나, 숲 마을과 만저우리로 이어지며 여름 도로와 숙박 세부를 판매 전에 확인합니다.",
    ),
    pace: l(
      "Six nights across the circuit, with private vehicle and guide service and rural room details confirmed item by item.",
      "环线共 6 晚，包含私车与导游服务，乡村住宿条件逐项确认。",
      "순환 일정 6박과 전용 차량, 가이드 서비스를 포함하며 외곽 숙소 조건을 항목별 확인합니다.",
    ),
    fit: l(
      "Summer travellers who want grassland, wetland, forest settlements and Manzhouli in one seasonal circuit.",
      "想用一条夏季环线走过草原、湿地、森林村落与满洲里的旅客。",
      "여름 순환 일정으로 초원, 습지, 숲 마을과 만저우리를 만나고 싶은 여행자.",
    ),
  },
  "kunming-jianshui-yuanyang-6-day-private-tour": {
    route: l(
      "Kunming · Stone Forest · Jianshui · Yuanyang",
      "昆明 · 石林 · 建水 · 元阳",
      "쿤밍 · 석림 · 젠수이 · 위안양",
    ),
    appeal: l(
      "Link Kunming, Jianshui's courtyards and two nights among Yuanyang's cultural landscape, without promising a particular sunrise, cloud sea or reflection.",
      "串联昆明、建水院落与元阳文化景观连住两晚，不承诺固定日出、云海或倒影。",
      "쿤밍, 젠수이의 안뜰과 위안양 문화 경관 2박을 잇되 특정 일출, 운해나 반영을 보장하지 않습니다.",
    ),
    pace: l(
      "Two nights in Kunming, one in Jianshui and two in Yuanyang, with private guide and vehicle service on Days 2–5.",
      "昆明 2 晚、建水 1 晚、元阳 2 晚，第 2–5 天包含私人导游与用车。",
      "쿤밍 2박, 젠수이 1박, 위안양 2박이며 2~5일 차에 전용 가이드와 차량이 포함됩니다.",
    ),
    fit: l(
      "Travellers who want Jianshui courtyards, old-town life and rice terraces, with two Yuanyang nights for more than one weather window.",
      "想看建水院落、古城生活与梯田，并用元阳两晚增加天气机会的旅客。",
      "젠수이 안뜰과 고성 생활, 계단식 논을 보고 위안양 2박으로 날씨 기회를 늘리고 싶은 여행자.",
    ),
  },
  "shenzhen-family-tech-4-day-private-tour": {
    route: l(
      "Shenzhen · Science and Technology Museum · Huaqiangbei",
      "深圳 · 科学技术馆 · 华强北",
      "선전 · 과학기술관 · 화창베이",
    ),
    appeal: l(
      "Build the family trip around Shenzhen Science and Technology Museum and Huaqiangbei, then add an age-appropriate city or coastal day.",
      "以深圳科学技术馆与华强北为核心，再按孩子年龄加入城市或海边一天。",
      "선전과학기술관과 화창베이를 중심으로 아이 나이에 맞는 도심 또는 해안 하루를 더합니다.",
    ),
    pace: l(
      "Three breakfast-included nights in one Shenzhen hotel, with private guide and vehicle service on Days 2–3.",
      "深圳同一家含早酒店连住 3 晚，第 2–3 天包含私人导游与用车。",
      "선전 한 호텔에서 조식 포함 3박하며 2~3일 차에 전용 가이드와 차량이 포함됩니다.",
    ),
    fit: l(
      "Families who want public science venues, Huaqiangbei and an age-matched city or coastal activity.",
      "想带孩子体验公共科学场馆、华强北与适龄城市或海边活动的家庭。",
      "아이와 공공 과학관, 화창베이와 연령에 맞는 도심 또는 해안 활동을 경험하고 싶은 가족.",
    ),
  },
  "beijing-xian-shanghai-12-day-private-tour": {
    route: l(
      "Beijing · Xi'an · Shanghai",
      "北京 · 西安 · 上海",
      "베이징 · 시안 · 상하이",
    ),
    appeal: l(
      "Give Beijing, Xi'an and Shanghai enough time to stand on their own, then connect them by confirmed high-speed rail.",
      "让北京、西安与上海各自拥有充足时间，再用已确认高铁串联。",
      "베이징, 시안과 상하이에 충분한 시간을 두고 확정된 고속철도로 연결합니다.",
    ),
    pace: l(
      "Four nights in Beijing, three in Xi'an and four in Shanghai, with confirmed second-class high-speed rail between cities.",
      "北京 4 晚、西安 3 晚、上海 4 晚，并以已确认的二等座高铁连接城市。",
      "베이징 4박, 시안 3박, 상하이 4박이며 도시 간에는 확정된 고속철도 2등석으로 이동합니다.",
    ),
    fit: l(
      "First-time China travellers who want three core cities, a full Terracotta Warriors day and light arrival and departure days.",
      "第一次来中国，想走三座核心城市、给兵马俑完整一天并放松抵离日的旅客。",
      "중국 첫 여행에서 세 핵심 도시, 병마용 종일 일정과 여유 있는 도착·출발일을 원하는 여행자.",
    ),
  },
};
