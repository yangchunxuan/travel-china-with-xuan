/** Same accepted service offers in the other seven site languages. No prices live in this copy. */
export type GuideReservationTranslationLocale = "zh" | "ko" | "ja" | "fr" | "es" | "de" | "ar";
export interface GuideReservationTranslation {
  label: string; examples: string; feeUnit: string; boatFeeUnit: string; action: string; dateAction: string; guarantee: string; publishedFare: string;
  offers: readonly { title: string; body: string }[];
  tianmenNote: string;
  palaceCard: {title:string;body:string}; cruiseCard: {title:string;body:string};
  /** Guide-specific booking cards that lead with the attraction's booking rule; {release} is filled from the rule. */
  cards?: Readonly<Record<string,{title:string;body:string}>>;
}
/** Offer order: packing, Yangshuo, Shanghai, Tianmen, Palace inline mention, then (zh and ko only) the 2026-10-19 route and pre-trip offers: 14-day, 10-day, 7-day, Beijing stay, first trip, family, route order, arrival card. */
export const guideReservationOfferTranslations: Record<GuideReservationTranslationLocale, GuideReservationTranslation> = {
  zh: {
    label:"Homeground China · 景点预约",examples:"我们可以代预约的景点",feeUnit:"每人每景点的预约服务费，景点门票按官方价格另付",boatFeeUnit:"每人的预约服务费，官方船票另付",action:"查看可代预约的景点",dateAction:"发送日期和人数",guarantee:"至少提前 {days} 天提交需求并付款，即可享有预约保证。",publishedFare:"公布票价",
    offers:[
      {title:"出发前，把景点订好",body:"中国一些知名景点只接受每位游客本人护照的实名预约，故宫更是只提前 7 天放票。Homeground China 可以代订指定景点，从故宫到兵马俑、成都大熊猫基地都可以。告诉我们日期和人数，付款前先收到书面报价。"},
      {title:"准备坐漓江游船到阳朔？船票可以交给我们",body:"如果计划从桂林乘船到阳朔，Homeground China 可以代订漓江游船。告诉我们乘船日期、人数和想选的船型，我们会在付款前书面确认预订细节和完整报价。这里提供的是游船票，不包含酒店接送，也不是遇龙河竹筏。"},
      {title:"酒店定好了？接着安排想看的景点",body:"上海并非所有景点都需要预约。对于我们服务清单中的景点，无论是在上海，还是常接着前往的苏州、杭州，Homeground China 都可以帮你办理预约。告诉我们日期和人数，付款前先收到书面报价。"},
      {title:"张家界之后，其他城市的景点也可以提前安排",body:"本预约服务不售卖天门山门票。中国行程中的其他城市，我们可以代预约指定景点，例如北京故宫、西安兵马俑和桂林漓江游船。告诉我们日期和人数，付款前先收到书面报价。"},
      {title:"不想自己操作预约？",body:"Homeground China 可以按每位旅客本人的护照姓名代订故宫门票。"},
      {title:"出发前，把这条路线上的景点订好",body:"这条路线上有几个景点只能凭每位旅客本人的护照实名预约入场。故宫当天不卖票：参观前 7 天北京时间 20:00 放票；成都大熊猫基地最多提前 14 天在网上开售。Homeground China 可以把你路线上的景点一起订好：告诉我们日期和人数，付款前先收到书面报价。"},
      {title:"出发前，把这条路线上的景点订好",body:"这条路线上有几个景点只能凭每位旅客本人的护照实名预约入场。故宫当天不卖票：参观前 7 天北京时间 20:00 放票。Homeground China 可以把你路线上的景点一起订好：告诉我们日期和人数，付款前先收到书面报价。"},
      {title:"出发前，把这条路线上的景点订好",body:"七天的行程没有多余的一天来补救错过的预约。故宫当天不卖票：参观前 7 天北京时间 20:00 放票，按每位旅客本人的护照实名预约。Homeground China 可以把你路线上的景点一起订好：告诉我们日期和人数，付款前先收到书面报价。"},
      {title:"酒店定好了？接着把北京的景点订好",body:"故宫当天不卖票：参观前 7 天北京时间 20:00 放票，按每位旅客本人的护照实名预约。慕田峪长城和天坛也要实名预约。Homeground China 可以一起帮你订：告诉我们日期和人数，付款前先收到书面报价。"},
      {title:"不管选哪条路线，出发前把景点订好",body:"北京这条路线要靠每位旅客本人的护照实名预约。故宫当天不卖票：参观前 7 天北京时间 20:00 放票。Homeground China 可以把你路线上的景点一起订好：告诉我们日期和人数，付款前先收到书面报价。"},
      {title:"带孩子出行？出发前把大景点订好",body:"孩子和大人一样，要用自己的护照单独实名预约。故宫当天不卖票：参观前 7 天北京时间 20:00 放票；成都大熊猫基地最多提前 14 天在网上开售，分上午、下午入园。Homeground China 可以帮全家一起订：告诉我们日期和人数，付款前先收到书面报价。"},
      {title:"路线定了？先订那几个提前几天才放票的景点",body:"这条路线上每座城市都有一个只提前几天放票的景点：故宫参观前 7 天北京时间 20:00 放票、当天不卖；陕西历史博物馆提前 5 天 17:00 放票；成都大熊猫基地最多提前 14 天在网上开售。Homeground China 可以按每位旅客本人的护照一起订好：告诉我们日期和人数，付款前先收到书面报价。"},
      {title:"入境卡填好了？出发前也把景点订好",body:"入境卡用于申报入境信息；大景点还要另外按每位旅客本人的护照实名预约。故宫当天不卖票：参观前 7 天北京时间 20:00 放票。Homeground China 可以把你路线上的景点订好：告诉我们日期和人数，付款前先收到书面报价。"}
    ],tianmenNote:"天门山和张家界国家森林公园，请查看本页介绍的私家团或当日导游服务。",
    cards:{
      "forbidden-city-for-foreign-visitors":{title:"故宫当天不卖票。",body:"放票规则：{release}。每位旅客用自己的护照实名预约，门口买不到。热门日期放票后可能约满，退票余量也不保证出现；护照号填错一位，买了也改不了。自己预约还要注册英文平台账号、通过邮箱验证。交给 Homeground China：发送日期和人数，付款前收到书面报价，之后收到每位旅客的预约记录。"},
      "national-museum-of-china-booking-and-route":{title:"国家博物馆免费，但要提前用护照预约。",body:"每位参观者都要用自己的护照实名预约。放票规则：{release}。交给 Homeground China：发送日期和人数，付款前收到书面报价，之后收到每位旅客的预约记录。"},
      "shaanxi-history-museum-booking-and-collection-plan":{title:"陕西历史博物馆只提前 5 天放票。",body:"基本陈列免费，但每位参观者都要用自己的护照实名预约。放票规则：{release}。交给 Homeground China：发送日期和人数，付款前收到书面报价，之后收到每位旅客的预约记录。"},
      "chengdu-panda-base-or-dujiangyan-panda-valley":{title:"熊猫基地门票在网上预约，分上午、下午入园。",body:"每位旅客用自己的护照实名购票。放票规则：{release}。交给 Homeground China：发送日期和人数，付款前收到书面报价，之后收到每位旅客的预约记录。"},
      "jade-dragon-snow-mountain-cable-car-booking":{title:"玉龙雪山索道每天晚上放未来 7 天的票。",body:"放票规则：{release}。进山也按每位旅客本人实名预约。交给 Homeground China：发送日期和人数，付款前收到书面报价，之后收到每位旅客的预约记录。"}
    },
    palaceCard:{title:"故宫预约不想自己操作？",body:"自行预约需要注册英文预约平台账号、通过邮箱验证，并在放票时准确填写每位旅客的护照信息。放票规则：{release}。交给 Homeground China：发送日期和人数，付款前收到书面报价，之后收到每位旅客的预约记录。"},
    cruiseCard:{title:"漓江游船，让 Homeground China 帮你订",body:"告诉我们乘船日期、人数和想选的船型。我们会核对预订是否接受你的护照，在付款前书面确认登船码头和完整报价，随后发送每位旅客的预订记录。"}
  },
  ko: {
    label:"Homeground China · 관광지 예약",examples:"예약을 도와드리는 관광지",feeUnit:"관광지당 1인 예약 대행료이며, 입장권은 공식 가격으로 별도 결제합니다",boatFeeUnit:"1인 예약 대행료이며, 공식 선박 요금은 별도입니다",action:"예약 가능한 관광지 보기",dateAction:"날짜와 인원 보내기",guarantee:"방문 최소 {days}일 전까지 요청과 결제를 완료하면 예약을 보장합니다.",publishedFare:"공시 요금",
    offers:[
      {title:"짐을 챙겼다면, 출국 전에 관광지도 예약하세요",body:"중국에 가져갈 수 있는 물건을 확인하는 것만큼, 가고 싶은 관광지를 준비하는 것도 중요합니다. 자금성을 비롯한 중국의 일부 유명 관광지는 사전 실명 예약이 있어야 방문할 수 있습니다. Homeground China가 서비스 대상 관광지를 여행자 각자의 여권상 이름으로 예약해 드립니다. 날짜와 인원을 알려 주시면 결제 전에 서면 견적을 보내 드립니다."},
      {title:"리강 유람선으로 양숴에 도착하시나요? 배편을 예약해 드립니다",body:"구이린에서 양숴까지 배로 이동할 계획이라면 Homeground China가 리강 유람선을 예약해 드립니다. 승선일, 인원, 원하는 선박 등급을 알려 주세요. 결제 전에 예약 내용과 총견적을 서면으로 확인합니다. 유람선 승선권만 해당하며, 호텔 차량 이동이나 위룽허 대나무 뗏목은 포함하지 않습니다."},
      {title:"호텔을 정했다면, 다음은 가고 싶은 관광지입니다",body:"상하이의 모든 관광지에 예약이 필요한 것은 아닙니다. 당사 서비스 목록에 있는 상하이 관광지와, 이후 일정으로 자주 이어지는 쑤저우·항저우의 관광지는 Homeground China가 예약을 도와드립니다. 날짜와 인원을 보내 주시면 결제 전에 서면 견적을 드립니다."},
      {title:"장자제 다음 일정, 다른 도시의 관광지도 미리 준비하세요",body:"이 예약 서비스에서는 톈먼산 입장권을 판매하지 않습니다. 중국 여행의 다른 일정에서는 베이징 자금성, 시안 병마용, 구이린 리강 유람선 등 서비스 대상 관광지를 예약해 드립니다. 날짜와 인원을 알려 주시면 결제 전에 서면 견적을 보내 드립니다."},
      {title:"직접 예약하기 번거로우신가요?",body:"Homeground China가 여행자 각자의 여권상 이름으로 고궁박물원 입장권을 예약해 드립니다."},
      {title:"출국 전에 이 일정의 관광지를 예약하세요",body:"이 일정의 몇몇 관광지는 여행자 본인 여권 실명 예약이 있어야 입장할 수 있습니다. 자금성은 당일 표를 팔지 않으며 방문 7일 전 중국 시간 20:00에 오픈합니다. 청두 판다기지는 최대 14일 전부터 온라인으로 판매합니다. Homeground China가 일정 속 관광지를 한 번에 예약해 드립니다. 날짜와 인원을 보내 주시면 결제 전에 서면 견적을 드립니다."},
      {title:"출국 전에 이 일정의 관광지를 예약하세요",body:"이 일정의 몇몇 관광지는 여행자 본인 여권 실명 예약이 있어야 입장할 수 있습니다. 자금성은 당일 표를 팔지 않으며 방문 7일 전 중국 시간 20:00에 오픈합니다. Homeground China가 일정 속 관광지를 한 번에 예약해 드립니다. 날짜와 인원을 보내 주시면 결제 전에 서면 견적을 드립니다."},
      {title:"출국 전에 이 일정의 관광지를 예약하세요",body:"7일 일정에는 놓친 예약을 만회할 여유 날이 없습니다. 자금성은 당일 표를 팔지 않으며 방문 7일 전 중국 시간 20:00에 여행자 본인 여권 실명으로 오픈합니다. Homeground China가 일정 속 관광지를 한 번에 예약해 드립니다. 날짜와 인원을 보내 주시면 결제 전에 서면 견적을 드립니다."},
      {title:"숙소를 정했다면, 다음은 베이징 관광지 예약입니다",body:"자금성은 당일 표를 팔지 않으며 방문 7일 전 중국 시간 20:00에 여행자 본인 여권 실명으로 오픈합니다. 무톈위 만리장성과 천단도 실명 예약입니다. Homeground China가 한 번에 예약해 드립니다. 날짜와 인원을 보내 주시면 결제 전에 서면 견적을 드립니다."},
      {title:"어느 일정을 고르든 출국 전에 관광지를 예약하세요",body:"베이징 일정은 여행자 본인 여권 실명 예약에 달려 있습니다. 자금성은 당일 표를 팔지 않으며 방문 7일 전 중국 시간 20:00에 오픈합니다. Homeground China가 일정 속 관광지를 한 번에 예약해 드립니다. 날짜와 인원을 보내 주시면 결제 전에 서면 견적을 드립니다."},
      {title:"아이와 함께라면 출국 전에 큰 관광지를 예약하세요",body:"아이도 어른처럼 본인 여권으로 따로 실명 예약해야 합니다. 자금성은 당일 표를 팔지 않으며 방문 7일 전 중국 시간 20:00에 오픈합니다. 청두 판다기지는 최대 14일 전부터 온라인으로 판매하며 오전·오후 입장으로 나뉩니다. Homeground China가 가족 모두의 예약을 도와드립니다. 날짜와 인원을 보내 주시면 결제 전에 서면 견적을 드립니다."},
      {title:"동선을 정했다면, 며칠 전에야 열리는 관광지부터 예약하세요",body:"이 일정의 도시마다 방문 며칠 전에야 예약이 열리는 관광지가 있습니다. 자금성은 7일 전 중국 시간 20:00에 오픈하며 당일 표가 없고, 산시역사박물관은 5일 전 17:00, 청두 판다기지는 최대 14일 전부터 온라인으로 판매합니다. Homeground China가 여행자 본인 여권 실명으로 한 번에 예약해 드립니다. 날짜와 인원을 보내 주시면 결제 전에 서면 견적을 드립니다."},
      {title:"입국카드를 마쳤다면, 출국 전에 관광지도 예약하세요",body:"입국카드는 입국 정보를 신고하는 양식이고, 큰 관광지는 여행자 본인 여권 실명으로 따로 온라인 예약해야 합니다. 자금성은 당일 표를 팔지 않으며 방문 7일 전 중국 시간 20:00에 오픈합니다. Homeground China가 일정 속 관광지를 예약해 드립니다. 날짜와 인원을 보내 주시면 결제 전에 서면 견적을 드립니다."}
    ],tianmenNote:"톈먼산과 장자제 국가삼림공원은 이 페이지에서 안내하는 프라이빗 투어나 당일 가이드 서비스를 확인해 주세요.",
    cards:{
      "forbidden-city-for-foreign-visitors":{title:"자금성은 당일 표를 팔지 않습니다.",body:"판매 일정: {release}. 여행자 본인 여권 실명으로 예약하며 현장에서는 살 수 없습니다. 인기 날짜는 오픈 후 매진될 수 있고, 취소표가 다시 나온다는 보장도 없습니다. 여권 번호를 한 자리만 잘못 입력해도 예약 후에는 고칠 수 없습니다. 직접 예약하려면 영문 예약 사이트 계정과 이메일 인증도 필요합니다. Homeground China에 날짜와 인원을 보내 주세요. 결제 전 서면 견적을 받고, 이후 각 여행자의 예약 기록을 받으실 수 있습니다."},
      "national-museum-of-china-booking-and-route":{title:"국가박물관은 무료지만, 여권 실명 예약이 있어야 입장할 수 있습니다.",body:"관람객 모두 본인 여권 실명으로 예약합니다. 판매 일정: {release}. Homeground China에 날짜와 인원을 보내 주세요. 결제 전 서면 견적을 받고, 이후 각 여행자의 예약 기록을 받으실 수 있습니다."},
      "shaanxi-history-museum-booking-and-collection-plan":{title:"산시역사박물관은 방문 5일 전에야 예약이 열립니다.",body:"기본 관람은 무료지만 관람객 모두 본인 여권 실명 예약이 필요합니다. 판매 일정: {release}. Homeground China에 날짜와 인원을 보내 주세요. 결제 전 서면 견적을 받고, 이후 각 여행자의 예약 기록을 받으실 수 있습니다."},
      "chengdu-panda-base-or-dujiangyan-panda-valley":{title:"판다기지 입장권은 온라인으로, 오전·오후 입장으로 판매합니다.",body:"여행자 본인 여권 실명으로 예약합니다. 판매 일정: {release}. Homeground China에 날짜와 인원을 보내 주세요. 결제 전 서면 견적을 받고, 이후 각 여행자의 예약 기록을 받으실 수 있습니다."},
      "jade-dragon-snow-mountain-cable-car-booking":{title:"옥룡설산 케이블카는 매일 저녁 향후 7일분이 열립니다.",body:"판매 일정: {release}. 입장도 여행자 본인 실명으로 예약합니다. Homeground China에 날짜와 인원을 보내 주세요. 결제 전 서면 견적을 받고, 이후 각 여행자의 예약 기록을 받으실 수 있습니다."}
    },
    palaceCard:{title:"고궁박물원 예약을 맡기고 싶으신가요?",body:"직접 예약하려면 영문 예약 사이트 계정과 이메일 인증이 필요하며, 판매가 시작되면 모든 여행자의 여권 정보를 정확히 입력해야 합니다. 판매 일정: {release}. Homeground China에 날짜와 인원을 보내 주세요. 결제 전 서면 견적을 받고, 이후 각 여행자의 예약 기록을 받으실 수 있습니다."},
    cruiseCard:{title:"리강 유람선 예약은 Homeground China에 맡기세요",body:"승선일, 인원, 원하는 선박 등급을 알려 주세요. 해당 예약이 여권을 받는지 확인하고, 결제 전에 승선 부두와 총견적을 서면으로 안내한 뒤 각 여행자의 예약 기록을 보내 드립니다."}
  },
  ja: {
    label:"Homeground China · 観光チケット予約",examples:"予約を代行できる観光施設",feeUnit:"1名・1施設あたりの予約サービス料。チケット代は公式料金で別途必要です",boatFeeUnit:"1名あたりの予約サービス料。公式の乗船料は別途必要です",action:"予約できる施設を見る",dateAction:"日付と人数を送る",guarantee:"訪問日の少なくとも {days} 日前までにご依頼・お支払いを完了すれば、予約を保証します。",publishedFare:"公表料金",
    offers:[
      {title:"荷造りの次は、出発前の観光予約を",body:"中国へ持ち込める物の確認と同じく、訪れたい観光施設の予約も旅の準備の一つです。故宮など、中国の一部の有名施設は事前の実名予約がないと入場できません。Homeground Chinaでは、対象施設を旅行者ご本人のパスポート氏名で予約します。日付と人数をお知らせいただければ、お支払い前に書面でお見積もりをご案内します。"},
      {title:"漓江クルーズで陽朔へ？乗船券を手配します",body:"桂林から陽朔へ船で向かうなら、Homeground Chinaが漓江クルーズを予約できます。乗船日、人数、ご希望の船のクラスをお知らせください。お支払い前に予約内容と総額を書面で確認します。対象はクルーズの乗船券のみで、ホテル送迎や遇龍河の竹いかだは含みません。"},
      {title:"ホテルが決まったら、次は観光の予定を",body:"上海のすべての観光施設に予約が必要なわけではありません。当社の対象リストにある上海の施設や、次の目的地になりやすい蘇州・杭州の施設は、Homeground Chinaが予約を代行できます。日付と人数をお知らせいただければ、お支払い前に書面でお見積もりをご案内します。"},
      {title:"張家界の先へ。ほかの都市の観光予約も準備を",body:"この予約サービスでは天門山のチケットを販売していません。中国旅行のほかの目的地では、北京の故宮、西安の兵馬俑、桂林の漓江クルーズなど、対象施設の予約を代行できます。日付と人数をお知らせいただければ、お支払い前に書面でお見積もりをご案内します。"},
      {title:"予約の手続きを任せたい方へ",body:"Homeground Chinaが、旅行者ご本人のパスポート氏名で故宮博物院のチケットを予約します。"}
    ],tianmenNote:"天門山と張家界国家森林公園については、このページでご紹介するプライベートツアーまたは当日のガイドサービスをご覧ください。",
    palaceCard:{title:"故宮博物院の予約を任せませんか？",body:"自分で予約する場合、英語予約サイトのアカウント登録とメール認証に加え、発売時に全員の正確なパスポート情報が必要です。発売規則：{release}。Homeground Chinaに日付と人数をお知らせください。お支払い前に書面のお見積もりを確認し、その後、各旅行者の予約記録をお受け取りいただけます。"},
    cruiseCard:{title:"漓江クルーズの予約は Homeground Chinaへ",body:"乗船日、人数、ご希望の船のクラスをお知らせください。パスポートでの予約が可能かを確認し、お支払い前に乗船埠頭と総額を書面でご案内したうえで、各旅行者の予約記録をお送りします。"}
  },
  fr: {
    label:"Homeground China · Réservation de visites",examples:"Les sites que nous pouvons réserver",feeUnit:"de frais de réservation par personne et par site, billet au tarif officiel en supplément",boatFeeUnit:"de frais de réservation par personne, tarif officiel du bateau en supplément",action:"Voir les sites disponibles",dateAction:"Envoyer mes dates et le nombre de voyageurs",guarantee:"Envoyez votre demande et réglez au moins {days} jours à l’avance pour une réservation garantie.",publishedFare:"Tarif publié",
    offers:[
      {title:"Valise prête ? Réservez aussi vos visites avant le départ",body:"Vérifier ce que vous pouvez emporter en Chine est une étape ; réserver les lieux que vous souhaitez visiter en est une autre. Certains sites célèbres, dont la Cité interdite, exigent une réservation nominative à l’avance. Homeground China peut réserver les sites de sa sélection au nom figurant sur le passeport de chaque voyageur. Envoyez vos dates et le nombre de participants : vous recevrez un devis écrit avant de payer."},
      {title:"Vous arrivez à Yangshuo par la rivière Li ? Nous réservons le bateau",body:"Si vous prévoyez de naviguer de Guilin à Yangshuo, Homeground China peut réserver votre croisière sur la rivière Li. Indiquez la date, le nombre de voyageurs et la catégorie de bateau souhaitée. Nous confirmons les détails et le devis complet par écrit avant paiement. Il s’agit uniquement du billet de croisière, sans transfert à l’hôtel ni radeau de bambou sur la rivière Yulong."},
      {title:"Hôtel choisi ? Préparez maintenant vos visites",body:"Tous les sites de Shanghai ne nécessitent pas de réservation. Pour ceux qui figurent sur notre liste, à Shanghai comme dans les villes souvent visitées ensuite, notamment Suzhou et Hangzhou, Homeground China peut s’en charger. Envoyez vos dates et le nombre de voyageurs : vous recevrez un devis écrit avant de payer."},
      {title:"Après Zhangjiajie : réservez les autres étapes de votre voyage",body:"Ce service ne vend pas de billets pour le mont Tianmen. Pour les autres étapes de votre voyage en Chine, Homeground China peut réserver certains sites, de la Cité interdite à Pékin à l’armée de terre cuite à Xi’an et à la croisière sur la rivière Li à Guilin. Envoyez vos dates et le nombre de voyageurs : vous recevrez un devis écrit avant paiement."},
      {title:"Vous préférez nous confier la réservation ?",body:"Homeground China peut réserver les billets du musée du Palais au nom figurant sur le passeport de chaque voyageur."}
    ],tianmenNote:"Pour le mont Tianmen et le parc forestier national de Zhangjiajie, consultez le voyage privé ou le service de guide à la journée présenté sur cette page.",
    palaceCard:{title:"Vous préférez nous confier les billets du musée du Palais ?",body:"Réserver vous-même demande un compte sur le portail en anglais, une vérification par e-mail et les coordonnées exactes du passeport de chaque voyageur à l’ouverture des ventes. Mise en vente : {release}. Confiez la réservation à Homeground China : envoyez votre date et le nombre de voyageurs, recevez un devis écrit avant paiement, puis le justificatif de chaque participant."},
    cruiseCard:{title:"Confiez votre croisière sur la rivière Li à Homeground China",body:"Indiquez la date de navigation, le nombre de voyageurs et la catégorie de bateau souhaitée. Nous vérifions que la réservation accepte vos passeports, confirmons par écrit le quai d’embarquement et le devis complet avant paiement, puis envoyons le justificatif de chaque voyageur."}
  },
  es: {
    label:"Homeground China · Reservas de visitas",examples:"Lugares que podemos reservar",feeUnit:"de gestión por persona y lugar, más la entrada al precio oficial",boatFeeUnit:"de gestión por persona, más la tarifa oficial del barco",action:"Ver los lugares que reservamos",dateAction:"Enviar fecha y número de viajeros",guarantee:"Envía la solicitud y paga al menos {days} días antes de la visita para tener la reserva garantizada.",publishedFare:"Tarifa publicada",
    offers:[
      {title:"¿Maleta lista? Reserva las visitas antes de volar",body:"Comprobar qué puedes llevar a China es una parte de los preparativos; reservar los lugares que quieres visitar es otra. Algunos de los sitios más conocidos, como la Ciudad Prohibida, solo se visitan con reserva nominativa previa. Homeground China puede reservar los lugares de su lista con el nombre del pasaporte de cada viajero. Envíanos las fechas y el número de personas: recibirás un presupuesto escrito antes de pagar."},
      {title:"¿Llegas a Yangshuo en crucero por el río Li? Reservamos el barco",body:"Si piensas navegar de Guilin a Yangshuo, Homeground China puede reservar tu crucero por el río Li. Indícanos la fecha, el número de viajeros y la categoría de barco que prefieres. Confirmamos los detalles y el presupuesto completo por escrito antes del pago. Es solo el billete del crucero: no incluye el traslado al hotel ni una balsa de bambú por el río Yulong."},
      {title:"¿Hotel elegido? Ahora prepara las visitas",body:"No todos los lugares de Shanghai requieren reserva. Para los que figuran en nuestra lista, tanto en Shanghai como en ciudades que suelen visitarse después, como Suzhou y Hangzhou, Homeground China puede encargarse de reservar. Envíanos las fechas y el número de viajeros y recibe un presupuesto escrito antes de pagar."},
      {title:"Después de Zhangjiajie: reservas para las demás etapas",body:"Este servicio no vende entradas para la montaña Tianmen. En otras etapas de tu viaje por China, Homeground China puede reservar lugares seleccionados, desde la Ciudad Prohibida de Pekín hasta los Guerreros de Terracota de Xi’an y el crucero por el río Li de Guilin. Envíanos las fechas y el número de viajeros y recibe un presupuesto escrito antes de pagar."},
      {title:"¿Prefieres que nos encarguemos?",body:"Homeground China puede reservar las entradas del Museo del Palacio con el nombre que figura en el pasaporte de cada viajero."}
    ],tianmenNote:"Para la montaña Tianmen y el Parque Forestal Nacional de Zhangjiajie, consulta el circuito privado o el servicio de guía por un día que se describe en esta página.",
    palaceCard:{title:"¿Prefieres delegar la reserva del Museo del Palacio?",body:"Reservar por tu cuenta requiere una cuenta en el portal en inglés, verificación por correo electrónico y los datos exactos del pasaporte de cada viajero al abrirse la venta. Calendario de venta: {release}. Deja la gestión a Homeground China: envía la fecha y el número de viajeros, recibe un presupuesto escrito antes de pagar y, después, el justificante de reserva de cada persona."},
    cruiseCard:{title:"Deja que Homeground China reserve tu crucero por el río Li",body:"Indícanos la fecha, el número de viajeros y la categoría de barco que prefieres. Comprobamos que la reserva admite tus pasaportes, confirmamos por escrito el muelle de embarque y el presupuesto completo antes del pago y enviamos el justificante de cada viajero."}
  },
  de: {
    label:"Homeground China · Eintrittskarten reservieren",examples:"Diese Sehenswürdigkeiten können wir buchen",feeUnit:"Buchungsgebühr pro Person und Sehenswürdigkeit, zuzüglich Eintrittskarte zum offiziellen Preis",boatFeeUnit:"Buchungsgebühr pro Person, zuzüglich des offiziellen Schiffspreises",action:"Buchbare Sehenswürdigkeiten ansehen",dateAction:"Datum und Personenzahl senden",guarantee:"Senden Sie Ihre Anfrage und leisten Sie die Zahlung mindestens {days} Tage vor dem Besuch, damit die Buchung garantiert ist.",publishedFare:"Veröffentlichter Preis",
    offers:[
      {title:"Koffer gepackt? Buchen Sie die Besichtigungen vor dem Abflug",body:"Zu prüfen, was Sie nach China mitnehmen dürfen, ist ein Teil der Reisevorbereitung; die gewünschten Besichtigungen zu buchen, ein weiterer. Einige bekannte Sehenswürdigkeiten, darunter die Verbotene Stadt, können nur mit einer vorherigen Reservierung auf den eigenen Namen besucht werden. Homeground China kann ausgewählte Sehenswürdigkeiten auf den Passnamen jedes Reisenden buchen. Senden Sie Ihre Termine und die Personenzahl. Vor der Zahlung erhalten Sie ein schriftliches Angebot."},
      {title:"Mit dem Li-Fluss-Schiff nach Yangshuo? Wir buchen die Fahrt",body:"Wenn Sie von Guilin nach Yangshuo fahren möchten, kann Homeground China die Li-Fluss-Schifffahrt für Sie reservieren. Teilen Sie uns Fahrtag, Personenzahl und gewünschte Schiffsklasse mit. Buchungsdetails und Gesamtangebot bestätigen wir vor der Zahlung schriftlich. Es handelt sich nur um das Schiffsticket, nicht um Ihren Hoteltransfer oder ein Bambusfloß auf dem Yulong-Fluss."},
      {title:"Hotel gewählt? Planen Sie als Nächstes die Besichtigungen",body:"Nicht jede Sehenswürdigkeit in Shanghai erfordert eine Reservierung. Für die Orte auf unserer Liste, in Shanghai ebenso wie in häufig anschließenden Reisezielen wie Suzhou und Hangzhou, übernimmt Homeground China die Buchung. Senden Sie Termine und Personenzahl und erhalten Sie vor der Zahlung ein schriftliches Angebot."},
      {title:"Nach Zhangjiajie: Buchungen für weitere Reiseziele",body:"Dieser Service verkauft keine Eintrittskarten für den Tianmen-Berg. An anderen Stationen Ihrer Chinareise kann Homeground China ausgewählte Sehenswürdigkeiten reservieren, von der Verbotenen Stadt in Peking über die Terrakotta-Armee in Xi’an bis zur Li-Fluss-Schifffahrt in Guilin. Senden Sie Termine und Personenzahl und erhalten Sie vor der Zahlung ein schriftliches Angebot."},
      {title:"Möchten Sie die Buchung lieber abgeben?",body:"Homeground China kann die Eintrittskarten für das Palastmuseum auf den Passnamen jedes Reisenden buchen."}
    ],tianmenNote:"Für den Tianmen-Berg und den Zhangjiajie-Nationalwaldpark nutzen Sie die auf dieser Seite vorgestellte Privatreise oder den Tagesguide.",
    palaceCard:{title:"Sollen wir die Buchung für das Palastmuseum übernehmen?",body:"Für die eigene Buchung benötigen Sie ein Konto im englischen Portal, eine E-Mail-Bestätigung und bei Verkaufsbeginn die genauen Passdaten aller Reisenden. Verkaufsregel: {release}. Überlassen Sie die Buchung Homeground China: Senden Sie Datum und Personenzahl, erhalten Sie vor der Zahlung ein schriftliches Angebot und danach den Buchungsnachweis für jeden Reisenden."},
    cruiseCard:{title:"Lassen Sie Homeground China Ihre Li-Fluss-Schifffahrt buchen",body:"Teilen Sie uns Fahrtag, Personenzahl und gewünschte Schiffsklasse mit. Wir prüfen, ob die Buchung Ihre Reisepässe akzeptiert, bestätigen vor der Zahlung Anlegestelle und Gesamtangebot schriftlich und senden anschließend jedem Reisenden seinen Buchungsnachweis."}
  },
  ar: {
    label:"Homeground China · حجز المعالم",examples:"معالم يمكننا حجزها",feeUnit:"رسوم حجز لكل شخص ولكل معلم، وتُضاف إليها التذكرة بالسعر الرسمي",boatFeeUnit:"رسوم حجز لكل شخص، وتُضاف إليها أجرة القارب الرسمية",action:"اطّلع على المعالم المتاحة للحجز",dateAction:"أرسل التاريخ وعدد المسافرين",guarantee:"أرسل الطلب وأكمل الدفع قبل الزيارة بما لا يقل عن {days} أيام لضمان الحجز.",publishedFare:"السعر المنشور",
    offers:[
      {title:"جهزت حقائبك؟ احجز المعالم قبل السفر أيضًا",body:"التحقق مما يمكنك إدخاله إلى الصين جزء من التحضير، وحجز المعالم التي ترغب في زيارتها جزء آخر. بعض المعالم الشهيرة، ومنها المدينة المحرمة، لا يمكن زيارتها دون حجز مسبق بالاسم الحقيقي. تستطيع Homeground China حجز المعالم المشمولة بخدمتنا بالاسم الوارد في جواز سفر كل مسافر. أرسل التواريخ وعدد الأشخاص لتحصل على عرض سعر مكتوب قبل الدفع."},
      {title:"ستصل إلى يانغشو عبر نهر لي؟ يمكننا حجز القارب",body:"إذا كنت تخطط للإبحار من غويلين إلى يانغشو، يمكن لـ Homeground China حجز رحلة نهر لي. أرسل تاريخ الإبحار وعدد المسافرين وفئة القارب المطلوبة. نؤكد تفاصيل الحجز وعرض السعر الكامل كتابيًا قبل الدفع. الخدمة لتذكرة الرحلة النهرية فقط، ولا تشمل الانتقال إلى الفندق أو طوف الخيزران على نهر يولونغ."},
      {title:"اخترت الفندق؟ حان وقت ترتيب الزيارات",body:"لا تحتاج كل معالم شنغهاي إلى حجز. أما المعالم المدرجة في قائمتنا، في شنغهاي أو في المدن التي تليها غالبًا مثل سوتشو وهانغتشو، فيمكن لـ Homeground China حجزها لك. أرسل التواريخ وعدد المسافرين لتحصل على عرض سعر مكتوب قبل الدفع."},
      {title:"بعد تشانغجياجيه: حجوزات بقية محطات رحلتك",body:"لا تُباع تذاكر جبل تيانمن عبر هذه الخدمة. في محطات أخرى من رحلتك في الصين، تستطيع Homeground China حجز معالم محددة، من المدينة المحرمة في بكين إلى جيش الطين في شيآن ورحلة نهر لي في غويلين. أرسل التواريخ وعدد المسافرين لتحصل على عرض سعر مكتوب قبل الدفع."},
      {title:"تفضّل أن نتولى الحجز؟",body:"تستطيع Homeground China حجز تذاكر متحف القصر بالاسم الوارد في جواز سفر كل مسافر."}
    ],tianmenNote:"لجبل تيانمن ومتنزه تشانغجياجيه الوطني للغابات، اطّلع على الجولة الخاصة أو خدمة المرشد ليوم واحد الموضحة في هذه الصفحة.",
    palaceCard:{title:"تفضّل إسناد حجز متحف القصر إلينا؟",body:"الحجز بنفسك يتطلب حسابًا على البوابة الإنجليزية وتحققًا بالبريد الإلكتروني وبيانات جواز السفر الدقيقة لكل مسافر عند بدء البيع. موعد طرح التذاكر: {release}. أسند الحجز إلى Homeground China: أرسل التاريخ وعدد الأشخاص، واحصل على عرض سعر مكتوب قبل الدفع، ثم استلم سجل الحجز الخاص بكل مسافر."},
    cruiseCard:{title:"دع Homeground China تحجز رحلتك على نهر لي",body:"أرسل تاريخ الإبحار وعدد المسافرين وفئة القارب المطلوبة. نتحقق من قبول جوازات سفركم للحجز، ونؤكد رصيف الصعود وعرض السعر الكامل كتابيًا قبل الدفع، ثم نرسل سجل الحجز الخاص بكل مسافر."}
  }
};
