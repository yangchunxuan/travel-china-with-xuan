import type { PrivateTourFaqItem } from "./privateTourProducts";

const l = (en: string, zh: string, ko: string) => ({ en, zh, ko });

export const shanghaiSuzhouAnswers: readonly PrivateTourFaqItem[] = [
  {
    question: l("Who is this five-day tour a good fit for?", "这条 5 天路线适合谁？", "이 5일 일정은 누구에게 잘 맞나요?"),
    answer: l(
      "Choose this Homeground tour if you want Shanghai, a water town and Suzhou without changing hotels. All four nights are in the same Shanghai hotel, so your main luggage stays there during the Suzhou day trip. There are three full sightseeing days; arrival and departure make up the other two days.",
      "想看上海、水乡和苏州，又不想搬酒店，可以选这条 Homeground 路线。4 晚都住上海同一家酒店，去苏州当天不用带大件行李。5 天中有 3 个完整游览日，另外两天用于抵达与返程。",
      "호텔을 옮기지 않고 상하이, 수향마을, 쑤저우를 보고 싶다면 이 Homeground 일정이 잘 맞습니다. 같은 상하이 호텔에 4박하므로 쑤저우 당일 여행에는 큰 짐을 가져갈 필요가 없습니다. 전체 5일 중 온전한 관광일은 3일이고 나머지는 도착일과 출발일입니다.",
    ),
  },
  {
    question: l("What do you arrange for the Suzhou day trip?", "苏州一日游的交通怎么安排？", "쑤저우 당일 여행의 이동은 어떻게 준비하나요?"),
    answer: l(
      "The published tour includes return second-class high-speed rail, private transfers at both ends and the guided Suzhou visit. Homeground coordinates these as one itinerary, so you do not need to book the train and local transfers separately. This rail arrangement applies to both the two- and four-person packages.",
      "公开行程包含高铁二等座往返、两端私车接驳和苏州导游游览。Homeground 将这些安排在同一份行程中，你不用分别预订火车和市内接送。2 人和 4 人方案都按这套高铁安排执行。",
      "공개 일정에는 왕복 고속철도 2등석, 양쪽 도시의 전용 차량 연결과 쑤저우 가이드 관광이 포함됩니다. Homeground가 하나의 일정으로 조율하므로 열차와 현지 이동을 따로 예약할 필요가 없습니다. 2명과 4명 상품 모두 이 철도 이동 방식입니다.",
    ),
  },
  {
    question: l("Is it suitable for parents or travellers who tire easily?", "带父母或容易走累的人能参加吗？", "부모님이나 쉽게 지치는 여행자에게도 맞나요?"),
    answer: l(
      "Keeping one hotel removes the need to repack between cities, and the private group can discuss its walking pace with us. Gardens and old streets still involve walking, steps and uneven surfaces. Tell us about walking limits or mobility equipment before booking so we can check a workable route and any changes to the quote.",
      "连住一家酒店能减少跨城整理行李的麻烦，私家团也方便提前沟通步行节奏。园林和老街仍有步行、台阶和不平路面。预订前告诉我们大致能走多久、是否使用助行设备，我们再核对合适的路线与报价调整。",
      "한 호텔에 머물면 도시를 옮길 때마다 짐을 다시 쌀 필요가 없고, 우리 일행만의 투어라 걷는 속도를 미리 상의할 수 있습니다. 다만 정원과 옛 거리는 도보, 계단과 고르지 않은 길이 있습니다. 보행 가능 시간이나 이동 보조기구를 알려주시면 가능한 동선과 견적 변경 여부를 확인합니다.",
    ),
  },
  {
    question: l("Which sights distinguish this from the six-day tour?", "与 6 天三城路线相比，景点有什么不同？", "6일 3도시 일정과 관광지가 어떻게 다른가요?"),
    answer: l(
      "This route includes Zhujiajiao, Shanghai Tower's 118th-floor observation deck and a Suzhou day with the Humble Administrator's Garden, Hanshan Temple and Pingjiang Road. Hangzhou and Suzhou Museum are not included. The six-day route instead stays in Suzhou and Hangzhou and includes a West Lake cruise.",
      "这条包含朱家角、上海中心 118 层，以及苏州的拙政园、寒山寺和平江路，不含杭州和苏州博物馆。6 天路线则在苏州和杭州过夜，并包含西湖游船。两条路线各有侧重，不是简单多加一天。",
      "이 일정은 주자자오, 상하이타워 118층 전망대와 쑤저우의 졸정원·한산사·핑장루를 포함합니다. 항저우와 쑤저우박물관은 포함되지 않습니다. 6일 일정은 쑤저우와 항저우에서 숙박하고 서호 유람선을 포함하는 별도 구성입니다.",
    ),
  },
  {
    question: l("Are the guide, hotel and price confirmed when I enquire?", "咨询时就能确认导游、酒店和价格吗？", "문의하면 가이드, 호텔과 가격이 바로 확정되나요?"),
    answer: l(
      "The published package includes English-speaking guide service and four nights with breakfast at a Ctrip 4-Diamond-rated hotel. We check your dates, room arrangement and availability before confirming the hotel and total in writing. Public two- and four-person prices are a starting point; children, other group sizes and changes need a personal quote. Enquiring does not reserve rooms or tickets.",
      "公开方案含英语导游和携程 4 钻酒店 4 晚含早住宿。我们按你的日期、房型和库存核对，再书面确认酒店与总价。公开的 2 人和 4 人价格用于参考，儿童、其他人数及行程调整另行报价；提交咨询不会自动占房或锁票。",
      "공개 상품은 영어 가이드와 씨트립 기준 4다이아 호텔의 조식 포함 4박을 제공합니다. 날짜, 객실 구성과 예약 가능 여부를 확인한 뒤 호텔과 총액을 서면으로 확정합니다. 공개된 2명·4명 가격을 기준으로 어린이, 다른 인원과 일정 변경은 개별 견적을 드립니다. 문의만으로 객실이나 표가 확보되지는 않습니다.",
    ),
  },
];

export const shanghaiSuzhouHangzhouAnswers: readonly PrivateTourFaqItem[] = [
  {
    question: l("Why choose this six-day Jiangnan private tour?", "为什么选择这条江南 6 天私家团？", "이 6일 강남 프라이빗 투어는 어떤 점이 좋은가요?"),
    answer: l(
      "This Homeground route suits travellers who want Shanghai, Suzhou and Hangzhou in one trip and can finish in Hangzhou. Staying in each city makes room for Suzhou's canals and Hangzhou's lake without returning to Shanghai every night. Hotels, intercity connections and four guided touring days are arranged together for your own party.",
      "想一次游览上海、苏州和杭州，并能从杭州离开的客人，适合这条 Homeground 路线。每座城市都安排住宿，逛苏州河街、看杭州西湖后，不必当晚再赶回上海。酒店、跨城衔接与 4 个导游游览日放在同一套安排中，只接待你的同行亲友。",
      "상하이·쑤저우·항저우를 한 번에 보고 항저우에서 출발할 수 있는 여행자에게 맞는 Homeground 일정입니다. 각 도시에서 숙박해 쑤저우 운하나 항저우 서호를 보고 매일 상하이로 돌아갈 필요가 없습니다. 우리 일행만을 위한 숙박, 도시 간 이동과 4일의 가이드 관광을 함께 준비합니다.",
    ),
  },
  {
    question: l("How many hotels and guided touring days are there?", "住几家酒店，有几个导游游览日？", "호텔은 몇 곳이며 가이드 관광은 며칠인가요?"),
    answer: l(
      "There are four touring days, Days 2–5. The five nights are split between Shanghai for two nights, Suzhou for one and Hangzhou for two: three hotels and two hotel changes. If keeping one hotel matters more than including Hangzhou, compare the five-day Shanghai–Suzhou tour, which stays in Shanghai for all four nights.",
      "第 2–5 天为 4 个游览日。5 晚分别住上海 2 晚、苏州 1 晚、杭州 2 晚，共 3 家酒店、换酒店 2 次。如果你更在意全程连住，而不是一定要去杭州，可以比较上海连住 4 晚的 5 天上海—苏州路线。",
      "2–5일차가 4일의 관광일입니다. 상하이 2박, 쑤저우 1박, 항저우 2박으로 호텔 3곳을 이용하고 두 번 옮깁니다. 항저우 방문보다 한 호텔에 계속 머무는 것이 중요하다면 상하이에서 4박하는 5일 상하이·쑤저우 일정과 비교해 보세요.",
    ),
  },
  {
    question: l("Is every intercity journey by private car?", "跨城全程都是包车吗？", "도시 간 이동은 모두 전용 차량인가요?"),
    answer: l(
      "For two or three travellers, the usual arrangement is high-speed rail with private transfers at both ends. For four to nine, a door-to-door vehicle is usually planned around the group's luggage. We confirm the actual transport in writing, and each connection is coordinated for you, so you do not have to piece it together yourself.",
      "2–3 人通常采用高铁加两端私车接送；4–9 人通常按人数与行李安排门到门车辆。实际方式会写进确认单。你不用自己把各段交通拼起来，但并非所有人数都默认全程包车。",
      "2–3명은 보통 고속철도와 양쪽 도시의 전용 픽업을, 4–9명은 수하물을 고려한 문 앞까지의 차량 이동을 계획합니다. 실제 방식은 서면으로 확정해 드립니다. 모든 인원이 전 구간을 차량으로 이동하는 것은 아니지만, 구간마다 따로 알아보실 필요 없이 저희가 연결해 드립니다.",
    ),
  },
  {
    question: l("Does the tour return to Shanghai for my flight?", "最后包含送回上海赶飞机吗？", "마지막 날 상하이로 돌아가는 이동도 포함되나요?"),
    answer: l(
      "The standard route starts at a Shanghai airport or station and ends at a Hangzhou airport or station. If your flight home leaves from Shanghai, send us the details before booking, and we will plan and quote the return journey, timing and any extra night separately. There is no need to change a flight you have already booked before talking to us.",
      "标准路线从上海机场或车站开始，到杭州机场或车站结束。如果回程航班从上海出发，预订前把航班信息告诉我们，我们再核算返沪交通、时间和是否需要加住，单独报价。已经订好的航班，不用在沟通前先改。",
      "기본 일정은 상하이 공항이나 역에서 시작해 항저우 공항이나 역에서 끝납니다. 귀국편이 상하이 출발이라면 예약 전에 항공편을 알려 주세요. 상하이로 돌아가는 이동과 시간, 추가 숙박 필요 여부를 따로 계획해 견적에 반영해 드립니다. 이미 예약한 항공편은 상담 전에 바꾸지 않으셔도 됩니다.",
    ),
  },
  {
    question: l("Can we travel with older parents or children?", "带长辈或孩子可以怎么安排？", "부모님이나 어린이와 함께라면 어떻게 준비하나요?"),
    answer: l(
      "Because it is just your party, you can talk through rest stops and priorities with Homeground before booking. Tell us the children's ages, room needs and how long each traveller can comfortably walk. Gardens, temple grounds and old lanes still have steps and uneven paths, so this is not a step-free trip; we check a workable route and any change in cost.",
      "私家团可以在预订前和 Homeground 商量休息和游览重点。告诉我们孩子年龄、房型需求，以及同行的人大概能连续走多久。园林、寺院和老街仍有台阶和不平的路面，这条路线不是无障碍行程；我们会为你核对可行路线和费用变化。",
      "우리 일행만 다니는 투어라 예약 전에 쉬는 시간과 우선순위를 Homeground와 상의하실 수 있습니다. 어린이 나이, 객실 구성과 무리 없이 걸을 수 있는 시간을 알려 주세요. 정원, 사찰, 옛 골목에는 계단과 고르지 않은 길이 있어 단차 없는 여행은 아닙니다. 가능한 동선과 비용 변화는 저희가 확인해 드립니다.",
    ),
  },
  {
    question: l("What is included in the price, and what is confirmed separately?", "报价包含什么，还需要确认什么？", "요금에는 무엇이 포함되고 무엇을 별도로 확인하나요?"),
    answer: l(
      "The package covers five nights with breakfast at Ctrip 4-Diamond-rated hotels, your agreed transport, English-speaking guiding on Days 2–5, arrival assistance and the listed admissions, including a West Lake cruise. Day 6 is a driver-only transfer, and Suzhou Museum depends on reservations. Lunch, dinner and travel to the start or from the end of the tour are separate. Before you pay, your written quote sets out rooms, availability, total price and cancellation terms.",
      "方案含携程 4 钻酒店 5 晚含早住宿、行程内交通、第 2–5 天英语导游、抵达协助和列明的门票（含西湖游船）。第 6 天由司机送行，苏州博物馆要看预约情况。午晚餐，以及抵达和离开时的机票、火车票另计；房型、能否预订、总价和取消条件，付款前都会书面发给你确认。",
      "씨트립 기준 4다이아 호텔 조식 포함 5박, 일정 내 이동, 2–5일차 영어 가이드, 도착 지원과 서호 유람선을 포함한 명시된 입장권이 포함됩니다. 6일차는 기사만 동행하며, 쑤저우박물관은 예약이 필요합니다. 점심·저녁과 투어 시작 전·종료 후 항공권·열차표는 별도입니다. 객실, 예약 가능 여부, 총액과 취소 조건은 결제 전에 서면으로 보내 드립니다.",
    ),
  },
];
