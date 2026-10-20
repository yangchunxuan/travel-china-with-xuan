import type { HomegroundLocale } from "./homegroundI18n";
import type { PrivateCarServiceKind } from "./privateCarServices";

export interface PrivateCarServiceCopy {
  metadata: { title: string; description: string };
  name: string; h1: string; eyebrow: string; lede: string;
  home: string; services: string; breadcrumb: string; ask: string;
  facts: readonly string[];
  kindsTitle: string; kindsBody: string;
  kinds: Record<PrivateCarServiceKind, { title: string; body: string }>;
  /** 2026-10-19 owner: cars in every city in mainland China (not Hong Kong or Macao). Anchors use `id`. */
  cities?: { title: string; body: string; note: string; items: readonly { id: string; name: string; hubs: string }[] };
  quoteTitle: string; quoteBody: string; written: readonly string[]; quoteNote: string;
  relatedTitle: string;
  guideTitle: string; guideBody: string; guideLink: string;
  fullTripTitle: string; fullTripBody: string; fullTripLink: string;
  companyLink: string; termsLink: string;
  faqTitle: string; faq: readonly { question: string; answer: string }[];
  enquiry: {
    title: string; body: string; requiredNotice: string; optional: string;
    kind: string; chooseKind: string; cities: string; citiesPlaceholder: string;
    date: string; undecided: string; travellers: string;
    luggage: string; luggagePlaceholder: string;
    pickup: string; pickupPlaceholder: string; pickupTime: string; timePlaceholder: string;
    route: string; routePlaceholder: string; note: string; notePlaceholder: string;
    whatsapp: string; email: string; privacy: string; draftNote: string;
    message: {
      opening: string; subject: string; kind: string; cities: string; date: string;
      travellers: string; luggage: string; pickup: string; pickupTime: string;
      route: string; note: string; none: string; datesOpen: string;
      confirmation: string; separator: string;
    };
  };
}

const copies: Record<HomegroundLocale, PrivateCarServiceCopy> = {
  en: {
    metadata: {
      title: "China Private Car & Driver | Transfers & Custom Quotes",
      description: "Private car and driver in any city in mainland China: airport and station transfers, day hire and intercity trips with our own drivers, quoted in writing before you pay.",
    },
    name: "Private car and driver in China",
    h1: "A car and driver for the route you have in mind.",
    eyebrow: "Private transport · China",
    lede: "Private car and driver in any city in mainland China: airport and station transfers, day hire and intercity trips. Our own drivers, quoted in writing before you pay, and a planner replies within 12 hours.",
    home: "Home", services: "All services", breadcrumb: "Breadcrumb",
    ask: "Ask about your transport",
    facts: ["Any city in mainland China", "Our own cars and drivers", "Written quote before you pay"],
    kindsTitle: "What journey do you need?",
    kindsBody: "Choose the part you want help with. Your dates, pickup points, people and luggage shape the arrangements.",
    kinds: {
      transfer: { title: "Airport or station transfer", body: "Enquire about an arrival or departure transfer. Share the airport or station, your flight or train details, and the other end of the journey." },
      sightseeing: { title: "Private sightseeing car", body: "Keep your own hotel and ask about a car and driver for your chosen stops. Share the route, pickup point and the time you need." },
      intercity: { title: "Intercity transport enquiry", body: "Tell us the cities, stops and timing you are considering. We check the route and travel time, then quote it in writing." },
    },
    cities: {
      title: "Where we can send a car",
      body: "Our own cars and drivers meet you at these airports and stations, and anywhere else you are going.",
      note: "Not on this list? We send cars in every other city in mainland China too. Hong Kong and Macao are not included.",
      items: [
        { id: "beijing", name: "Beijing", hubs: "Capital (PEK) and Daxing (PKX) airports · Beijing South station" },
        { id: "shanghai", name: "Shanghai", hubs: "Pudong (PVG) and Hongqiao (SHA) airports · Hongqiao station" },
        { id: "guangzhou", name: "Guangzhou", hubs: "Baiyun airport (CAN), T1, T2 and T3 · Guangzhou South station" },
        { id: "shenzhen", name: "Shenzhen", hubs: "Bao'an airport (SZX) · Shenzhen North station" },
        { id: "chengdu", name: "Chengdu", hubs: "Tianfu (TFU) and Shuangliu (CTU) airports · Chengdu East station" },
        { id: "chongqing", name: "Chongqing", hubs: "Jiangbei airport (CKG) · Chongqing North station" },
        { id: "xian", name: "Xi'an", hubs: "Xianyang airport (XIY) · Xi'an North station" },
        { id: "guilin", name: "Guilin and Yangshuo", hubs: "Liangjiang airport (KWL) · Guilin North and Guilin West stations" },
        { id: "zhangjiajie", name: "Zhangjiajie", hubs: "Hehua airport (DYG) · Zhangjiajie West station" },
        { id: "harbin", name: "Harbin", hubs: "Taiping airport (HRB) · Harbin West station" },
        { id: "kunming", name: "Kunming", hubs: "Changshui airport (KMG) · Kunming South station" },
        { id: "hangzhou", name: "Hangzhou", hubs: "Xiaoshan airport (HGH) · Hangzhou East station" },
      ],
    },
    quoteTitle: "Confirm the journey before the price.",
    quoteBody: "Transport is quoted for your itinerary. You can ask for only one part while keeping the rest of your trip already arranged.",
    written: ["Dates, route, pickup points and timing", "Passengers, luggage and the proposed vehicle arrangement", "The responsible party, service scope and inclusions", "The total price, payment details and applicable terms"],
    quoteNote: "These details are confirmed in writing before you pay. The enquiry is a starting point, not a booking confirmation.",
    relatedTitle: "Need more than transport?",
    guideTitle: "Add a separate guide", guideBody: "A car and driver enquiry does not include guide service. If you want English-speaking guiding, ask for that scope and its quote separately.", guideLink: "Private English-speaking guides",
    fullTripTitle: "Help with the whole trip", fullTripBody: "For hotels, guiding and several connected parts of a journey, start with full trip planning and ground support.", fullTripLink: "Full trip planning & ground support",
    companyLink: "Company & travel-agency licence", termsLink: "Service terms",
    faqTitle: "Before you enquire.",
    faq: [
      { question: "Can you arrange a private driver in any city in China?", answer: "Yes. We send our own cars and drivers in every city in mainland China, for airport and station pickups, day hire and trips between cities. Hong Kong and Macao are not included." },
      { question: "Can I ask for just an airport or station transfer?", answer: "Yes. You can enquire about only the transport you need, while keeping your own hotels and other arrangements. Send both ends of the journey, the date and your flight or train details." },
      { question: "Is there a fixed daily car price?", answer: "The transport quote is prepared for your itinerary. Dates, route, timing, passenger numbers and luggage need to be checked. The written quote confirms the scope and total price before payment." },
      { question: "Can I enquire about a journey between cities?", answer: "Yes. Send the cities, any stops and your preferred timing. We check the route and travel time, then quote it in writing." },
      { question: "Does the driver also provide English-speaking guiding?", answer: "Guide service is quoted separately from a car and driver. We can add an English-speaking or Chinese-speaking guide, and a Korean-speaking guide in Shanghai, Beijing, Xi'an and Zhangjiajie." },
      { question: "How is the vehicle chosen?", answer: "Tell us the number of travellers and describe your luggage. The proposed vehicle arrangement is checked for your journey and confirmed in the written quote." },
      { question: "Does opening a WhatsApp or email draft book the car?", answer: "No. These fields prepare a message that you send yourself in WhatsApp or email. Preparing or opening the draft does not send an enquiry to this website or confirm a booking." },
    ],
    enquiry: {
      title: "Tell us about the journey.",
      body: "Add the basics below and open your message in WhatsApp or email. We can work through the details that are still open.",
      requiredNotice: "Service type, city or cities, travellers and a date are required. You can choose “Date not decided yet”. Other fields are optional.",
      optional: "Optional", kind: "Transport needed", chooseKind: "Choose a service",
      cities: "City or cities", citiesPlaceholder: "For example: Beijing, Shanghai",
      date: "Service start date", undecided: "Date not decided yet", travellers: "Number of travellers",
      luggage: "Luggage", luggagePlaceholder: "For example: 2 suitcases and 2 small bags",
      pickup: "Pickup point", pickupPlaceholder: "Airport, station or hotel name / address",
      pickupTime: "Pickup time or flight / train details", timePlaceholder: "For example: flight arrives at 15:30",
      route: "Route and stops", routePlaceholder: "Where you want to finish and any stops along the way",
      note: "Other needs", notePlaceholder: "For example: a guide request, communication needs or other timing",
      whatsapp: "Open WhatsApp draft", email: "Prepare an email", privacy: "Privacy notice",
      draftNote: "Nothing is sent until you send it in WhatsApp or email. This form prepares a draft only; it does not save an enquiry or confirm a booking.",
      message: {
        opening: "Hi Homeground, I’d like a quote for a private car and driver.", subject: "Private car and driver enquiry",
        kind: "Transport needed", cities: "City or cities", date: "Service start date", travellers: "Travellers",
        luggage: "Luggage", pickup: "Pickup point", pickupTime: "Pickup time / flight or train",
        route: "Route and stops", note: "Other needs", none: "To confirm", datesOpen: "Not decided yet",
        confirmation: "Please check route feasibility and confirm the responsible party, vehicle arrangements, service scope, inclusions, total price and terms in writing before payment.",
        separator: ": ",
      },
    },
  },
  zh: {
    metadata: {
      title: "中国包车与司机服务｜机场车站接送及行程询价",
      description: "中国大陆任何城市都可以派车：机场和车站接送、包车一日游、城际包车，都是我们自己的车和司机，付款前书面确认总价。",
    },
    name: "中国包车与司机服务", h1: "需要接送或包车？先把路线告诉我们。",
    eyebrow: "私人用车 · 中国",
    lede: "中国大陆任何城市都可以派车：机场和车站接送、包车一日游、城际包车。都是我们自己的车和司机，付款前书面报价，规划师 12 小时内回复。",
    home: "首页", services: "服务总览", breadcrumb: "当前位置", ask: "咨询用车安排",
    facts: ["中国大陆任何城市", "我们自己的车和司机", "付款前书面报价"],
    kindsTitle: "这趟用车，要怎么走？", kindsBody: "选择你需要协助的部分。日期、上车地点、人数和行李会影响具体安排。",
    kinds: {
      transfer: { title: "机场或车站接送", body: "咨询抵达或离开时的接送。告诉我们机场或车站、航班或车次，以及另一端的目的地。" },
      sightseeing: { title: "景点包车出行", body: "保留自己订好的酒店，单独咨询游览用车及司机。告诉我们想去的地点、上车位置及需要的时间。" },
      intercity: { title: "跨城用车询价", body: "告诉我们出发和到达城市、沿途停靠及时间安排。我们核对路线和路途时间，再书面报价。" },
    },
    cities: {
      title: "我们能在哪里派车",
      body: "下面这些机场和车站，以及你要去的其他地方，都由我们自己的车和司机接送。",
      note: "列表里没有你的城市？中国大陆其他城市也都能派车。不含港澳。",
      items: [
        { id: "beijing", name: "北京", hubs: "首都机场、大兴机场 · 北京南站" },
        { id: "shanghai", name: "上海", hubs: "浦东机场、虹桥机场 · 虹桥站" },
        { id: "guangzhou", name: "广州", hubs: "白云机场 T1、T2、T3 · 广州南站" },
        { id: "shenzhen", name: "深圳", hubs: "宝安机场 · 深圳北站" },
        { id: "chengdu", name: "成都", hubs: "天府机场、双流机场 · 成都东站" },
        { id: "chongqing", name: "重庆", hubs: "江北机场 · 重庆北站" },
        { id: "xian", name: "西安", hubs: "咸阳机场 · 西安北站" },
        { id: "guilin", name: "桂林、阳朔", hubs: "两江机场 · 桂林北站、桂林西站" },
        { id: "zhangjiajie", name: "张家界", hubs: "荷花机场 · 张家界西站" },
        { id: "harbin", name: "哈尔滨", hubs: "太平机场 · 哈尔滨西站" },
        { id: "kunming", name: "昆明", hubs: "长水机场 · 昆明南站" },
        { id: "hangzhou", name: "杭州", hubs: "萧山机场 · 杭州东站" },
      ],
    },
    quoteTitle: "先说清楚怎么走，再确认报价。",
    quoteBody: "用车按具体行程单独报价。可以只咨询一段，保留其他已经安排好的旅行部分。",
    written: ["日期、路线、上下车地点和时间", "同行人数、行李与拟定车辆安排", "负责方、服务范围和包含内容", "总价、付款安排及适用条款"],
    quoteNote: "以上内容在付款前书面确认。询价是开始沟通，还不是已确认的预订。",
    relatedTitle: "除了用车，还需要什么？",
    guideTitle: "另加导游服务", guideBody: "用车及司机询价不包含导游服务。需要英文讲解，可以单独提出导游需求，另行确认范围及报价。", guideLink: "私人英文导游",
    fullTripTitle: "一起安排整趟旅行", fullTripBody: "如果还需要酒店、导游，以及多个衔接的旅行部分，可以从全程规划与落地支持开始。", fullTripLink: "全程规划与落地支持",
    companyLink: "经营主体与旅行社许可", termsLink: "服务条款",
    faqTitle: "询价前，你可能想了解。",
    faq: [
      { question: "中国任何城市都能安排包车司机吗？", answer: "可以。中国大陆每个城市都能派我们自己的车和司机，机场车站接送、包车一日游、城际包车都可以。不含港澳。" },
      { question: "可以只咨询机场或车站接送吗？", answer: "可以，只咨询需要的交通部分，保留自己安排的酒店和其他行程。请提供接送两端、日期，以及航班或车次信息。" },
      { question: "有没有固定的每日包车价格？", answer: "用车按具体行程报价，需要核对日期、路线、时间、人数和行李。付款前的书面报价会确认服务范围及总价。" },
      { question: "可以咨询跨城用车吗？", answer: "可以。告诉我们城市、沿途停靠及希望的时间，我们核对路线和路途时间，再书面报价。" },
      { question: "司机也提供英文导游讲解吗？", answer: "用车及司机与导游服务分别报价。可以加配英文或中文导游；上海、北京、西安、张家界还可以安排韩语导游。" },
      { question: "怎么确定车辆？", answer: "告诉我们同行人数，并说明行李情况。根据这趟路线核对拟定车辆安排，在书面报价中确认。" },
      { question: "打开 WhatsApp 或邮件草稿，就订好车了吗？", answer: "没有。填写内容只是准备消息，需要你在 WhatsApp 或邮箱里自行发送。准备或打开草稿不会向本网站发送询价，也不代表已经确认预订。" },
    ],
    enquiry: {
      title: "告诉我们，这一段怎么走。", body: "填写基本需求，再打开 WhatsApp 或邮件草稿。还没确定的细节可以继续沟通。",
      requiredNotice: "用车类型、城市、人数和日期为必填；日期可以选择“还没确定”。其他内容选填。",
      optional: "选填", kind: "用车类型", chooseKind: "选择需要的服务",
      cities: "城市", citiesPlaceholder: "例如：北京，或上海到杭州",
      date: "开始用车日期", undecided: "日期还没确定", travellers: "同行人数",
      luggage: "行李情况", luggagePlaceholder: "例如：2个行李箱、2个随身包",
      pickup: "上车地点", pickupPlaceholder: "机场、车站或酒店名称／地址",
      pickupTime: "上车时间或航班／车次", timePlaceholder: "例如：航班15:30抵达",
      route: "路线与停靠地点", routePlaceholder: "在哪里结束，以及沿途想停靠的地方",
      note: "其他需要", notePlaceholder: "例如：是否需要导游、沟通语言或其他时间安排",
      whatsapp: "打开 WhatsApp 草稿", email: "准备询价邮件", privacy: "隐私说明",
      draftNote: "需要你在 WhatsApp 或邮箱中自行发送。这里仅准备草稿，不保存询价，也不代表预订已确认。",
      message: {
        opening: "你好 Homeground，我想咨询包车及司机报价。", subject: "包车及司机询价",
        kind: "用车类型", cities: "城市", date: "开始用车日期", travellers: "同行人数",
        luggage: "行李情况", pickup: "上车地点", pickupTime: "上车时间／航班或车次",
        route: "路线与停靠", note: "其他需要", none: "待确认", datesOpen: "未定",
        confirmation: "请先核对路线可行性，并在付款前书面确认负责方、车辆安排、服务范围、包含项、总价和条款。",
        separator: "：",
      },
    },
  },
  ko: {
    metadata: {
      title: "중국 전용 차량·기사｜공항·역 이동 및 맞춤 견적",
      description: "중국 본토 어느 도시든 차량을 보내 드립니다. 공항·역 픽업, 하루 차량, 도시 간 이동 모두 Homeground 전용 차량과 기사이며 결제 전 서면 견적을 안내합니다.",
    },
    name: "중국 전용 차량·기사 서비스", h1: "중국에서 필요한 이동을, 내 동선에 맞춰.",
    eyebrow: "전용 차량 · 중국",
    lede: "중국 본토 어느 도시든 차량을 보내 드립니다. 공항·역 픽업, 하루 차량, 도시 간 이동 모두 Homeground 전용 차량과 기사가 맡으며, 결제 전 서면 견적을 드리고 플래너가 12시간 안에 답장드립니다.",
    home: "홈", services: "전체 서비스", breadcrumb: "현재 위치", ask: "차량 이동 문의",
    facts: ["중국 본토 모든 도시", "Homeground 전용 차량과 기사", "결제 전 서면 견적"],
    kindsTitle: "어떤 이동이 필요한가요?", kindsBody: "도움이 필요한 부분을 선택하세요. 날짜, 픽업 장소, 인원과 짐에 맞춰 구체적인 준비 사항을 확인합니다.",
    kinds: {
      transfer: { title: "공항·역 픽업 및 이동", body: "도착 또는 출발 시 이동을 문의하세요. 공항이나 역, 항공편 또는 열차 정보와 반대편 목적지를 알려 주세요." },
      sightseeing: { title: "관광용 전용 차량", body: "직접 예약한 숙소는 그대로 두고, 원하는 관광 동선의 차량과 기사만 문의할 수 있습니다. 방문 장소, 픽업 위치와 필요한 시간을 알려 주세요." },
      intercity: { title: "도시 간 차량 이동 문의", body: "출발·도착 도시, 중간에 들를 곳과 희망 시간을 알려 주세요. 동선과 이동 시간을 확인한 뒤 서면으로 견적을 안내합니다." },
    },
    cities: {
      title: "차량을 보내 드리는 곳",
      body: "아래 공항과 역, 그리고 가시는 다른 곳까지 Homeground 전용 차량과 기사가 모십니다.",
      note: "목록에 없는 도시도 중국 본토라면 모두 차량을 보내 드립니다. 홍콩과 마카오는 포함되지 않습니다.",
      items: [
        { id: "beijing", name: "베이징", hubs: "서우두·다싱 공항 · 베이징남역" },
        { id: "shanghai", name: "상하이", hubs: "푸둥·훙차오 공항 · 훙차오역" },
        { id: "guangzhou", name: "광저우", hubs: "바이윈 공항 T1·T2·T3 · 광저우남역" },
        { id: "shenzhen", name: "선전", hubs: "바오안 공항 · 선전북역" },
        { id: "chengdu", name: "청두", hubs: "톈푸·솽류 공항 · 청두동역" },
        { id: "chongqing", name: "충칭", hubs: "장베이 공항 · 충칭북역" },
        { id: "xian", name: "시안", hubs: "셴양 공항 · 시안북역" },
        { id: "guilin", name: "계림·양삭", hubs: "량장 공항 · 계림북역·계림서역" },
        { id: "zhangjiajie", name: "장가계", hubs: "허화 공항 · 장가계서역" },
        { id: "harbin", name: "하얼빈", hubs: "타이핑 공항 · 하얼빈서역" },
        { id: "kunming", name: "쿤밍", hubs: "창수이 공항 · 쿤밍남역" },
        { id: "hangzhou", name: "항저우", hubs: "샤오산 공항 · 항저우동역" },
      ],
    },
    quoteTitle: "이동 계획을 정리한 뒤, 견적을 확인하세요.",
    quoteBody: "차량은 구체적인 동선에 맞춰 개별 견적을 안내합니다. 이미 준비한 여행은 그대로 두고 한 구간만 문의할 수 있습니다.",
    written: ["날짜, 동선, 승하차 장소와 시간", "여행 인원, 짐과 제안하는 차량 준비", "책임 주체, 서비스 범위와 포함 사항", "전체 금액, 결제 방식과 적용 약관"],
    quoteNote: "결제 전에 위 내용을 서면으로 확인합니다. 견적 문의는 상담의 시작이며 예약 확정이 아닙니다.",
    relatedTitle: "교통 외에도 도움이 필요한가요?",
    guideTitle: "가이드를 따로 요청", guideBody: "차량과 기사 문의에는 가이드 서비스가 포함되지 않습니다. 가이드가 필요하면 원하는 언어와 범위를 알려 주시고 별도 견적을 확인하세요.", guideLink: "프라이빗 가이드 서비스",
    fullTripTitle: "여행 전체를 함께 준비", fullTripBody: "숙소, 가이드와 여러 이동 구간을 연결해 준비하려면 전체 여행 계획 및 현지 지원을 확인하세요.", fullTripLink: "전체 여행 계획 및 현지 지원",
    companyLink: "운영사 및 여행사 허가", termsLink: "서비스 이용약관",
    faqTitle: "문의 전에 알아두세요.",
    faq: [
      { question: "중국 어느 도시에서든 전용 차량을 부를 수 있나요?", answer: "네. 중국 본토 모든 도시에서 Homeground 전용 차량과 기사를 보내 드리며, 공항·역 픽업, 하루 차량, 도시 간 이동 모두 가능합니다. 홍콩과 마카오는 포함되지 않습니다." },
      { question: "공항이나 역 이동만 문의할 수 있나요?", answer: "네. 필요한 교통편만 문의하고 직접 준비한 숙소와 다른 일정은 그대로 이용할 수 있습니다. 양쪽 장소, 날짜와 항공편 또는 열차 정보를 알려 주세요." },
      { question: "하루 차량 요금이 정해져 있나요?", answer: "구체적인 동선에 맞춰 견적을 안내하며 날짜, 동선, 시간, 인원과 짐을 확인해야 합니다. 결제 전 서면 견적에 범위와 전체 금액을 안내합니다." },
      { question: "도시 간 차량 이동을 문의할 수 있나요?", answer: "네. 도시, 중간에 들를 곳과 희망 시간을 알려 주세요. 동선과 이동 시간을 확인한 뒤 서면으로 견적을 안내합니다." },
      { question: "기사가 외국어 가이드 역할도 하나요?", answer: "차량과 기사 서비스와 가이드 서비스는 별도로 견적을 안내합니다. 영어나 중국어 가이드를 더할 수 있고, 상하이·베이징·시안·장가계에서는 한국어 가이드도 가능합니다." },
      { question: "차량은 어떻게 정하나요?", answer: "여행 인원과 짐의 종류를 알려 주세요. 해당 동선에 맞는 차량 준비 사항을 검토하고 서면 견적으로 확인합니다." },
      { question: "WhatsApp이나 이메일 초안을 열면 예약되나요?", answer: "아니요. 입력 내용은 메시지 초안이며 WhatsApp이나 이메일에서 직접 전송해야 합니다. 초안을 만들거나 여는 것만으로 이 웹사이트에 문의가 전송되거나 예약이 확정되지는 않습니다." },
    ],
    enquiry: {
      title: "필요한 이동을 알려 주세요.", body: "기본 내용을 입력한 뒤 WhatsApp이나 이메일 초안을 여세요. 아직 정하지 않은 부분은 상담에서 이어갈 수 있습니다.",
      requiredNotice: "이동 종류, 도시, 인원과 날짜를 입력해 주세요. 날짜가 미정이면 “날짜는 아직 미정이에요”를 선택할 수 있습니다. 나머지는 선택 사항입니다.",
      optional: "선택", kind: "필요한 이동", chooseKind: "서비스 선택",
      cities: "도시", citiesPlaceholder: "예: 베이징, 상하이",
      date: "이용 시작 날짜", undecided: "날짜는 아직 미정이에요", travellers: "여행 인원",
      luggage: "짐", luggagePlaceholder: "예: 여행 가방 2개와 작은 가방 2개",
      pickup: "픽업 장소", pickupPlaceholder: "공항, 역 또는 호텔 이름 / 주소",
      pickupTime: "픽업 시간 또는 항공편 / 열차 정보", timePlaceholder: "예: 항공편 15:30 도착",
      route: "동선과 중간 방문 장소", routePlaceholder: "도착할 곳과 이동 중에 들르고 싶은 장소",
      note: "기타 요청", notePlaceholder: "예: 가이드, 소통 언어 또는 다른 시간 요청",
      whatsapp: "WhatsApp 초안 열기", email: "문의 이메일 준비", privacy: "개인정보 안내",
      draftNote: "WhatsApp이나 이메일에서 직접 전송해야 합니다. 이 양식은 초안만 준비하며 문의를 저장하거나 예약을 확정하지 않습니다.",
      message: {
        opening: "안녕하세요 Homeground. 전용 차량과 기사 견적을 문의합니다.", subject: "전용 차량·기사 견적 문의",
        kind: "필요한 이동", cities: "도시", date: "이용 시작 날짜", travellers: "여행 인원",
        luggage: "짐", pickup: "픽업 장소", pickupTime: "픽업 시간 / 항공편 또는 열차",
        route: "동선과 방문 장소", note: "기타 요청", none: "확인 예정", datesOpen: "미정",
        confirmation: "동선의 실현 가능성을 확인하고 결제 전에 책임 주체, 차량 준비, 서비스 범위, 포함 사항, 전체 금액과 약관을 서면으로 안내해 주세요.",
        separator: ": ",
      },
    },
  },
};

export function getPrivateCarServiceCopy(locale: HomegroundLocale) { return copies[locale]; }
