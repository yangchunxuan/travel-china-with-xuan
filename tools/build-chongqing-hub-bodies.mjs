import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const repositoryRoot = resolve(import.meta.dirname, "..");
const draftRoot = resolve(
  repositoryRoot,
  "docs/organic-growth/city-hub-drafts/chongqing",
);
const outputRoot = resolve(repositoryRoot, "content/destinations/chongqing");

const localeConfig = {
  en: {
    draft: "hub.en.md",
    linksTitle: "Continue with the detailed guide for the next decision",
    stayTitle: "Verify the exact hotel before booking",
    planningTitle: "Turn the Chongqing choice into a whole route",
    sourceTitle: "Official sources and image records",
    quoteTitle: "Ask for a human Chongqing property-fit check",
    quoteBody:
      "Use the general planner only for a first contact. In the initial form, share travel dates, the city or areas being compared, traveller and room counts, and an approximate accommodation budget if useful. You may say that you want to discuss family or accessibility arrangements later, but do not submit children's ages, mobility, medical or accessibility details, passport or other document information, booking or payment records, or identifiable material intended for a hotel, DMC or other supplier. A planner can arrange a separate human follow-up; those details are discussed only when appropriate and with suitable consent. Nothing is shared with a supplier without separate, purpose-specific consent. This is not live inventory, and Homeground cannot guarantee price, cannot guarantee availability, cannot guarantee foreign-guest acceptance, cannot guarantee room type and cannot guarantee accessibility.",
    labels: {
      orientation: ["Read Chongqing's banks and levels", "Use the bank–level–entrance–connection method before attempting a walking route."],
      stay: ["Choose a Chongqing accommodation base", "Compare Jiefangbei, Guanyinqiao and Shapingba, then verify the exact property entrance."],
      geology: ["Understand Wulong's tiankeng landscape", "Use the focused geology guide for landform terms and managed-access detail."],
      opera: ["Choose Sichuan opera with context", "Compare a named programme instead of treating face changing as the whole art form."],
      station: ["Choose the correct Chongqing railway station", "Match the dated ticket, hotel and onward corridor across North, West, Shapingba and East."],
      metro: ["Test whether ‘near the metro’ is useful", "Verify the exact exit and complete route to the lobby."],
      accessible: ["Verify an actually usable accessible room", "Check the complete arrival-to-room route before paying."],
      foreignHotel: ["Can foreigners stay at any hotel in China?", "Separate the legal rule, platform display and the property's current operation."],
      lastNight: ["Plan the last night before an international flight", "Work backwards from the named CKG terminal and check-in requirement."],
      rushed: ["Check whether the itinerary is too rushed", "Count station access, luggage, vertical movement and the cost of another hotel move."],
      review: ["Review an existing China itinerary", "Bring the current day-by-day route for an evidence-based weak-link review."],
      contact: ["Ask Homeground to plan the complete trip", "Use the general trip brief only after the city, dates and main constraints are clear."],
    },
    figures: {
      confluence: ["The Yangtze and Jialing rivers meeting below the Yuzhong peninsula in Chongqing.", "The river confluence explains why nearby-looking districts can still require a bridge, tunnel or rail connection."],
      escalator: ["The Crown Escalator in Chongqing climbing between two street levels.", "A real vertical connector is more useful than a straight-line map distance in Chongqing."],
      station: ["The concourse frontage of Chongqing East railway station.", "Chongqing East is a distinct ticketed hub, not another name for North or West."],
      liziba: ["Layered roads, rail infrastructure and riverbank terrain near Liziba in Chongqing.", "Liziba belongs to a westward cluster, not the central-peninsula walking route."],
      wulong: ["Natural bridges in Wulong Karst, Chongqing Municipality.", "Wulong is a separate landscape day with local transfer, walking and weather exposure."],
      dazu: ["Rock carvings at Baodingshan in Dazu, Chongqing Municipality.", "Dazu is a dedicated heritage excursion, not a downtown Chongqing attraction."],
    },
  },
  zh: {
    draft: "hub.zh.md",
    linksTitle: "下一步需要细节时，继续阅读对应指南",
    stayTitle: "预订前核对具体酒店",
    planningTitle: "把重庆选择放回整条中国路线",
    sourceTitle: "官方来源与图片记录",
    quoteTitle: "申请人工核对重庆住宿匹配度",
    quoteBody:
      "通用规划入口只用于第一次联系。初始表单可以填写旅行日期、比较中的城市或区域、旅客人数、房间数，以及自愿提供的大致住宿预算。可以说明之后希望讨论家庭或无障碍安排，但不要提交儿童具体年龄、行动、医疗或无障碍细节、护照或其他证件资料、订单或付款记录，也不要上传准备交给酒店、地接社或其他供应商的可识别材料。团队会另行安排人工跟进；只有在确有需要并取得适当同意后才讨论这些细节。未经另行、针对明确目的的同意，不会把信息交给供应商。这里不是实时库存，且不保证价格、不保证房态、不保证外宾接待、不保证房型，也不保证无障碍适用性。",
    labels: {
      orientation: ["读懂重庆的江岸与高差", "开始步行前，先按江岸—高度—入口—连接方式核对路线。"],
      stay: ["选择重庆住宿基地", "比较解放碑、观音桥与沙坪坝，再核对具体物业入口。"],
      geology: ["理解武隆天坑地貌", "通过专题地质指南了解地貌术语和景区管理边界。"],
      opera: ["有上下文地选择川剧", "比较有名称的节目，不把变脸当成整门艺术。"],
      station: ["选择正确的重庆铁路站", "按日期、车票、酒店和下一段方向比较北站、西站、沙坪坝站与东站。"],
      metro: ["核对“地铁附近”是否真的有用", "确认具体出口，以及从出口到酒店大堂的完整路线。"],
      accessible: ["核对真正可用的无障碍客房", "付款前检查从抵达到客房的整条路径。"],
      foreignHotel: ["外国旅客能入住中国任何酒店吗？", "区分法律规则、平台展示和具体物业当下的登记操作。"],
      lastNight: ["规划国际航班前的最后一晚", "从明确的 CKG 航站楼和值机要求倒推。"],
      rushed: ["检查行程是否太赶", "计入进站、行李、垂直移动和再次换酒店的成本。"],
      review: ["人工复核现有中国行程", "带上当前逐日路线，找出有证据的薄弱环节。"],
      contact: ["请 Homeground 规划完整旅行", "确定城市、日期与主要限制后，再使用通用旅行简报入口。"],
    },
    figures: {
      confluence: ["重庆渝中半岛下方的长江与嘉陵江交汇处。", "两江交汇的地理关系说明：地图上看似相邻的区域，仍可能需要过桥、穿隧道或乘轨道交通。"],
      escalator: ["连接重庆两个街道高度的皇冠大扶梯。", "在重庆，真实的垂直连接方式比地图直线距离更有用。"],
      station: ["重庆东站站房前的交通空间。", "重庆东站是独立票面车站，不是北站或西站的另一个名字。"],
      liziba: ["重庆李子坝附近叠加的道路、轨道设施与江岸地形。", "李子坝属于向西的独立分区，不在中心半岛步行线内。"],
      wulong: ["重庆市武隆喀斯特的天生桥。", "武隆是独立的自然景观日，需要计入本地接驳、步行与天气。"],
      dazu: ["重庆市大足宝顶山石刻。", "大足是专门的文化遗产延伸，不是重庆市中心景点。"],
    },
  },
  ko: {
    draft: "hub.ko.md",
    linksTitle: "다음 결정을 위한 상세 가이드를 이어서 읽으세요",
    stayTitle: "예약 전에 실제 숙소를 확인하세요",
    planningTitle: "충칭 선택을 중국 전체 동선으로 연결하세요",
    sourceTitle: "공식 출처와 이미지 기록",
    quoteTitle: "충칭 숙소 적합성을 사람에게 확인받기",
    quoteBody:
      "일반 일정 상담 창구는 첫 연락에만 사용합니다. 초기 양식에는 여행 날짜, 비교 중인 도시나 지역, 여행자 수와 객실 수, 필요하면 대략적인 숙박 예산을 적을 수 있습니다. 가족 또는 접근성 준비를 나중에 논의하고 싶다고 말할 수는 있지만, 어린이의 구체적인 나이, 이동·의료·접근성 세부 정보, 여권이나 기타 신분증 정보, 예약·결제 기록, 호텔·현지 업체·기타 공급업체에 전달할 식별 가능한 자료는 제출하지 마세요. 담당자가 별도의 후속 상담을 마련할 수 있으며, 그런 세부사항은 필요하고 적절한 동의를 얻은 뒤에만 논의합니다. 별도의 목적별 동의 없이 공급업체와 정보를 공유하지 않습니다. 이 창구는 실시간 재고가 아니며, 가격을 보장하지 않습니다. 객실 가능 여부를 보장하지 않습니다. 외국인 투숙을 보장하지 않습니다. 객실 유형을 보장하지 않습니다. 접근성을 보장하지 않습니다.",
    labels: {
      orientation: ["충칭의 강변과 높이 읽기", "걷기 전에 강변–높이–출입구–연결 방식으로 동선을 확인하세요."],
      stay: ["충칭 숙박 거점 선택", "제팡베이, 관인차오, 사핑바를 비교한 뒤 실제 숙소 출입구를 확인하세요."],
      geology: ["우룽 톈컹 지형 이해", "전문 지질 가이드에서 지형 용어와 관리된 방문 범위를 확인하세요."],
      opera: ["맥락과 함께 쓰촨 오페라 선택", "변검만으로 전체 예술을 설명하지 말고 이름이 있는 프로그램을 비교하세요."],
      station: ["정확한 충칭 기차역 선택", "날짜, 승차권, 호텔, 다음 이동 방향에 맞춰 북역·서역·사핑바역·동역을 비교하세요."],
      metro: ["‘지하철 근처’가 실제로 유용한지 확인", "정확한 출구와 로비까지의 전체 경로를 검증하세요."],
      accessible: ["실제로 사용할 수 있는 접근성 객실 확인", "결제 전에 도착부터 객실까지 전 경로를 확인하세요."],
      foreignHotel: ["외국인은 중국의 모든 호텔에 묵을 수 있나요?", "법적 원칙, 플랫폼 표시, 개별 숙소의 현재 등록 운영을 구분하세요."],
      lastNight: ["국제선 출발 전 마지막 밤 계획", "확정된 CKG 터미널과 체크인 요건에서 역산하세요."],
      rushed: ["일정이 너무 빠른지 확인", "역 접근, 짐, 수직 이동, 호텔 재이동 비용까지 계산하세요."],
      review: ["기존 중국 일정 검토", "현재 일자별 동선을 가져와 근거가 있는 취약 구간을 찾으세요."],
      contact: ["Homeground에 전체 여행 설계 요청", "도시, 날짜와 주요 제약을 정한 뒤 일반 여행 브리프를 사용하세요."],
    },
    figures: {
      confluence: ["충칭 위중반도 아래에서 만나는 양쯔강과 자링강.", "두 강의 관계를 보면 가까워 보이는 구역도 다리·터널·철도 연결이 필요할 수 있음을 알 수 있습니다."],
      escalator: ["충칭의 서로 다른 도로 높이를 잇는 황관 대형 에스컬레이터.", "충칭에서는 지도상 직선거리보다 실제 수직 연결수단이 더 중요합니다."],
      station: ["충칭동역 역사 앞 교통 공간.", "충칭동역은 북역이나 서역의 다른 이름이 아니라 별도의 승차권 역입니다."],
      liziba: ["충칭 리쯔바 주변의 겹친 도로, 철도시설, 강변 지형.", "리쯔바는 서쪽 구역 일정이며 중심반도 도보동선에 속하지 않습니다."],
      wulong: ["충칭시 우룽 카르스트의 천연교.", "우룽은 현지 환승, 보행, 날씨를 계산해야 하는 별도의 자연경관 하루입니다."],
      dazu: ["충칭시 다쭈 바오딩산 석각.", "다쭈는 충칭 도심 명소가 아니라 전용 문화유산 일정입니다."],
    },
  },
};

const supportOwnerSlugs = [
  ["orientation", "chongqing-upper-lower-city-orientation"],
  ["stay", "chongqing-where-to-stay-jiefangbei-guanyinqiao-shapingba"],
  ["geology", "china-tiankeng-sinkholes-explained"],
  ["opera", "sichuan-opera-face-changing-with-context"],
  ["station", "chongqing-railway-station-selector"],
];

const stayOwnerSlugs = [
  ["metro", "china-hotel-near-metro"],
  ["accessible", "china-accessible-hotel-room-verification"],
  ["foreignHotel", "foreigners-china-hotel"],
  ["lastNight", "china-last-night-before-international-flight"],
];

const sourceItems = [
  {
    url: "https://www.cq.gov.cn/ywdt/bmts/202512/t20251222_15262188.html",
    labels: { en: "Chongqing airport passenger-terminal arrangement", zh: "重庆机场客运航站楼安排", ko: "충칭공항 여객 터미널 운영 체계" },
    publishers: { en: "Chongqing Municipal Government", zh: "重庆市人民政府", ko: "충칭시 인민정부" },
  },
  {
    url: "https://www.cq.gov.cn/ywdt/jrcq/202606/t20260626_15778151.html",
    labels: { en: "2026 Q3 Chongqing railway timetable roles", zh: "2026 年第三季度重庆铁路运行图与车站分工", ko: "2026년 3분기 충칭 철도 운행도와 역별 역할" },
    publishers: { en: "Chongqing Municipal Government", zh: "重庆市人民政府", ko: "충칭시 인민정부" },
  },
  {
    url: "https://www.cq.gov.cn/ywdt/bmts/202507/t20250728_14853868.html",
    labels: { en: "Chongqing East station Line 6 access", zh: "重庆东站轨道交通 6 号线接驳", ko: "충칭동역 지하철 6호선 연결" },
    publishers: { en: "Chongqing Municipal Government", zh: "重庆市人民政府", ko: "충칭시 인민정부" },
  },
  {
    url: "https://www.cq.gov.cn/ywdt/bmts/202206/t20220615_10817239.html",
    labels: { en: "Chongqing Station passenger-service suspension", zh: "重庆站暂停办理客运业务", ko: "충칭역 여객 업무 중단" },
    publishers: { en: "Chongqing Municipal Government", zh: "重庆市人民政府", ko: "충칭시 인민정부" },
  },
  {
    url: "https://jtysw.cq.gov.cn/sy_240/jdtp/202607/t20260715_15825144.html",
    labels: { en: "Chongqing Station reconstruction progress", zh: "重庆站改造工程进展", ko: "충칭역 재건축 진행 상황" },
    publishers: { en: "Chongqing Municipal Commission of Transport", zh: "重庆市交通运输委员会", ko: "충칭시 교통운수위원회" },
  },
  {
    url: "https://wap.cq.gov.cn/ywdt/jrcq/202606/t20260613_15751500.html",
    labels: { en: "Liziba works and staged exit closures", zh: "李子坝施工与分阶段出入口关闭", ko: "리쯔바 공사와 단계별 출입구 폐쇄" },
    publishers: { en: "Chongqing Municipal Government", zh: "重庆市人民政府", ko: "충칭시 인민정부" },
  },
  {
    url: "https://www.cq.gov.cn/ywdt/bmts/202606/t20260608_15737519.html",
    labels: { en: "Wulong weather-related operating notices", zh: "武隆因天气调整运营的通知", ko: "우룽 기상 관련 운영 조정 공지" },
    publishers: { en: "Chongqing Municipal Government", zh: "重庆市人民政府", ko: "충칭시 인민정부" },
  },
  {
    url: "https://english.cq.gov.cn/aboutchongqing/culture/NaturalHeritage/202606/t20260612_15751145.html",
    labels: { en: "Wulong Karst official overview", zh: "武隆喀斯特官方概览", ko: "우룽 카르스트 공식 개요" },
    publishers: { en: "Chongqing Municipal Government", zh: "重庆市人民政府", ko: "충칭시 인민정부" },
  },
  {
    url: "https://english.cq.gov.cn/aboutchongqing/travel/5ALevelTouristAttraction/202606/t20260611_15745500.html",
    labels: { en: "Dazu Rock Carvings official overview", zh: "大足石刻官方概览", ko: "다쭈 석각 공식 개요" },
    publishers: { en: "Chongqing Municipal Government", zh: "重庆市人民政府", ko: "충칭시 인민정부" },
  },
  {
    url: "https://admin.cq.gov.cn/ywdt/jrcq/202607/t20260712_15816815.html",
    labels: { en: "Chongqing cruise-market operating context", zh: "重庆游轮市场运营背景", ko: "충칭 크루즈 시장 운영 배경" },
    publishers: { en: "Chongqing Municipal Government", zh: "重庆市人民政府", ko: "충칭시 인민정부" },
  },
  {
    url: "https://commons.wikimedia.org/wiki/File:Yuzhong,_Chongqing.jpg",
    labels: { en: "Hero: Yuzhong by Kingswang192, CC BY 4.0; cropped, resized and converted", zh: "首图：渝中，摄影 Kingswang192，CC BY 4.0；已裁切、缩放并转码", ko: "대표 이미지: 위중, 촬영 Kingswang192, CC BY 4.0; 자르기·크기 조정·형식 변환" },
    publishers: { en: "Wikimedia Commons", zh: "Wikimedia Commons", ko: "Wikimedia Commons" },
  },
  {
    url: "https://commons.wikimedia.org/wiki/File:The_junction_of_Yangtze_River_and_Jialing_River.jpg",
    labels: { en: "Yangtze–Jialing confluence by Tauno Tõhk, CC BY-SA 2.0; cropped, resized and converted", zh: "长江—嘉陵江交汇处，摄影 Tauno Tõhk，CC BY-SA 2.0；已裁切、缩放并转码", ko: "양쯔강–자링강 합류부, 촬영 Tauno Tõhk, CC BY-SA 2.0; 자르기·크기 조정·형식 변환" },
    publishers: { en: "Wikimedia Commons", zh: "Wikimedia Commons", ko: "Wikimedia Commons" },
  },
  {
    url: "https://commons.wikimedia.org/wiki/File:Crown_Escalator,_Chongqing,_2017-09-21.jpg",
    labels: { en: "Crown Escalator by Siyuwj, CC BY-SA 3.0; cropped, resized and converted", zh: "皇冠大扶梯，摄影 Siyuwj，CC BY-SA 3.0；已裁切、缩放并转码", ko: "황관 대형 에스컬레이터, 촬영 Siyuwj, CC BY-SA 3.0; 자르기·크기 조정·형식 변환" },
    publishers: { en: "Wikimedia Commons", zh: "Wikimedia Commons", ko: "Wikimedia Commons" },
  },
  {
    url: "https://commons.wikimedia.org/wiki/File:September_2025_at_Chongqing_East_Railway_Station_02.jpg",
    labels: { en: "Chongqing East station by Renek78, CC0 1.0; cropped, resized and converted", zh: "重庆东站，摄影 Renek78，CC0 1.0；已裁切、缩放并转码", ko: "충칭동역, 촬영 Renek78, CC0 1.0; 자르기·크기 조정·형식 변환" },
    publishers: { en: "Wikimedia Commons", zh: "Wikimedia Commons", ko: "Wikimedia Commons" },
  },
  {
    url: "https://commons.wikimedia.org/wiki/File:201908_Liziba,_Chongqing.jpg",
    labels: { en: "Liziba by MNXANL, CC BY-SA 4.0; cropped, resized and converted", zh: "李子坝，摄影 MNXANL，CC BY-SA 4.0；已裁切、缩放并转码", ko: "리쯔바, 촬영 MNXANL, CC BY-SA 4.0; 자르기·크기 조정·형식 변환" },
    publishers: { en: "Wikimedia Commons", zh: "Wikimedia Commons", ko: "Wikimedia Commons" },
  },
  {
    url: "https://commons.wikimedia.org/wiki/File:Wulongtianshengsanqiao.JPG",
    labels: { en: "Wulong natural bridge by Brookqi, released into the public domain; cropped, resized and converted", zh: "武隆天生桥，摄影 Brookqi，作者已释放至公有领域；已裁切、缩放并转码", ko: "우룽 천연교, 촬영 Brookqi, 저작자가 퍼블릭 도메인으로 공개; 자르기·크기 조정·형식 변환" },
    publishers: { en: "Wikimedia Commons", zh: "Wikimedia Commons", ko: "Wikimedia Commons" },
  },
  {
    url: "https://commons.wikimedia.org/wiki/File:Dazu_rock_carvings_-_Baodingshan,_大足石刻-宝顶山摩崖造像,_Chongqing,_2023_(53563776088).jpg",
    labels: { en: "Dazu Baodingshan by JL Cogburn, CC BY-SA 2.0; cropped, resized and converted", zh: "大足宝顶山，摄影 JL Cogburn，CC BY-SA 2.0；已裁切、缩放并转码", ko: "다쭈 바오딩산, 촬영 JL Cogburn, CC BY-SA 2.0; 자르기·크기 조정·형식 변환" },
    publishers: { en: "Wikimedia Commons", zh: "Wikimedia Commons", ko: "Wikimedia Commons" },
  },
  {
    url: "https://creativecommons.org/licenses/by/4.0/",
    labels: { en: "Licence: CC BY 4.0", zh: "许可：CC BY 4.0", ko: "라이선스: CC BY 4.0" },
    publishers: { en: "Creative Commons", zh: "Creative Commons", ko: "Creative Commons" },
  },
  {
    url: "https://creativecommons.org/licenses/by-sa/2.0/",
    labels: { en: "Licence: CC BY-SA 2.0", zh: "许可：CC BY-SA 2.0", ko: "라이선스: CC BY-SA 2.0" },
    publishers: { en: "Creative Commons", zh: "Creative Commons", ko: "Creative Commons" },
  },
  {
    url: "https://creativecommons.org/licenses/by-sa/3.0/",
    labels: { en: "Licence: CC BY-SA 3.0", zh: "许可：CC BY-SA 3.0", ko: "라이선스: CC BY-SA 3.0" },
    publishers: { en: "Creative Commons", zh: "Creative Commons", ko: "Creative Commons" },
  },
  {
    url: "https://creativecommons.org/licenses/by-sa/4.0/",
    labels: { en: "Licence: CC BY-SA 4.0", zh: "许可：CC BY-SA 4.0", ko: "라이선스: CC BY-SA 4.0" },
    publishers: { en: "Creative Commons", zh: "Creative Commons", ko: "Creative Commons" },
  },
  {
    url: "https://creativecommons.org/publicdomain/zero/1.0/",
    labels: { en: "Dedication: CC0 1.0", zh: "权利声明：CC0 1.0", ko: "권리 포기 선언: CC0 1.0" },
    publishers: { en: "Creative Commons", zh: "Creative Commons", ko: "Creative Commons" },
  },
];

function cleanInline(value) {
  return value
    .replace(/\[([^\]]+)\]\([^)]+\)/gu, "$1")
    .replace(/\*\*([^*]+)\*\*/gu, "$1")
    .replace(/`([^`]+)`/gu, "$1")
    .replace(/\s+/gu, " ")
    .trim();
}

function parseTable(lines, start, caption, nextId) {
  const rows = [];
  let index = start;
  while (index < lines.length && /^\s*\|/u.test(lines[index])) {
    rows.push(
      lines[index]
        .trim()
        .slice(1, -1)
        .split("|")
        .map(cleanInline),
    );
    index += 1;
  }
  const columns = rows[0];
  const dataRows = rows.slice(2);
  return {
    block: {
      id: nextId("table"),
      type: "table",
      caption: cleanInline(caption),
      columns,
      rows: dataRows,
    },
    next: index,
  };
}

function parseMarkdown(markdown) {
  const lines = markdown.replace(/\r\n/gu, "\n").split("\n");
  const blocks = [];
  let index = 0;
  let count = 0;
  let lastHeading = "Decision table";
  const nextId = (type) => `${type}-${String(++count).padStart(3, "0")}`;

  while (index < lines.length) {
    const line = lines[index].trim();
    if (!line || line.startsWith("# ")) {
      index += 1;
      continue;
    }
    if (/^#{2,3}\s/u.test(line)) {
      const match = /^(#{2,3})\s+(.+)$/u.exec(line);
      lastHeading = cleanInline(match[2]);
      blocks.push({
        id: nextId("heading"),
        type: "heading",
        level: match[1].length,
        text: lastHeading,
      });
      index += 1;
      continue;
    }
    if (/^\s*\|/u.test(lines[index])) {
      const parsed = parseTable(lines, index, lastHeading, nextId);
      blocks.push(parsed.block);
      index = parsed.next;
      continue;
    }
    if (/^(?:[-*]|\d+\.)\s+/u.test(line)) {
      const ordered = /^\d+\./u.test(line);
      const items = [];
      while (index < lines.length) {
        const itemLine = lines[index].trim();
        const pattern = ordered ? /^\d+\.\s+(.+)$/u : /^[-*]\s+(.+)$/u;
        const match = pattern.exec(itemLine);
        if (!match) break;
        items.push(cleanInline(match[1]));
        index += 1;
      }
      blocks.push({ id: nextId("list"), type: "list", ordered, items });
      continue;
    }

    const paragraphLines = [line];
    index += 1;
    while (index < lines.length) {
      const next = lines[index].trim();
      if (!next || /^#{1,3}\s/u.test(next) || /^\s*\|/u.test(lines[index]) || /^(?:[-*]|\d+\.)\s+/u.test(next)) break;
      paragraphLines.push(next);
      index += 1;
    }
    blocks.push({
      id: nextId(blocks.length === 0 ? "lead" : "paragraph"),
      type: blocks.length === 0 ? "lead" : "paragraph",
      text: cleanInline(paragraphLines.join(" ")),
    });
  }
  return blocks;
}

function insertAfterHeading(blocks, headingPrefix, inserted) {
  const index = blocks.findIndex(
    (block) => block.type === "heading" && block.level === 2 && block.text.startsWith(headingPrefix),
  );
  if (index === -1) throw new Error(`Heading not found: ${headingPrefix}`);
  blocks.splice(index + 1, 0, ...inserted);
}

function figure(id, file, dimensions, copy) {
  return {
    id,
    type: "figure",
    src: `/images/destinations/chongqing/${file}`,
    alt: copy[0],
    width: dimensions[0],
    height: dimensions[1],
    caption: copy[1],
  };
}

function href(locale, slug, family = "guides") {
  const prefix = locale === "en" ? "" : `/${locale}`;
  return `${prefix}/${family}/${slug}/`;
}

function enrich(blocks, locale) {
  const config = localeConfig[locale];
  for (const block of blocks) {
    if (block.type !== "paragraph") continue;
    if (locale === "zh") {
      block.text = block.text.replace("“8D魔幻城市”", "“立体山城”");
    }
    if (block.text.includes("Four specialist guides cover the detailed decisions")) {
      block.text = "Five specialist guides cover the detailed decisions:";
    }
    if (block.text.includes("以下四篇专题指南负责更具体的判断")) {
      block.text = "以下五篇专题指南负责更具体的判断：";
    }
    if (block.text.includes("다음 네 편의 전문 가이드")) {
      block.text = "다음 다섯 편의 전문 가이드에서 더 구체적인 판단을 이어갈 수 있습니다.";
    }
    if (block.text.startsWith("Browse the current")) {
      block.text = "All five specialist URLs were verified live on 21 August 2026. Use their links below when the city-level decision becomes a station, accommodation, geology, performance or vertical-route task.";
    }
    if (block.text.startsWith("可浏览当前的")) {
      block.text = "五个专题 URL 已于2026年8月21日核实在线。城市层面的判断进入车站、住宿、地质、演出或垂直动线执行时，请使用下方相应链接。";
    }
    if (block.text.startsWith("현재 Homeground")) {
      block.text = "다섯 개 전문 URL은 2026년 8월 21일 모두 실제 공개 상태로 확인했습니다. 도시 선택이 역·숙박·지질·공연·수직 동선 실행으로 바뀌면 아래의 해당 링크를 사용하세요.";
    }
    if (block.text.includes("planned Dazu Shike") || block.text.includes("规划中的大足石刻高铁站") || block.text.includes("계획 중인 다쭈스커")) {
      block.text = locale === "en"
        ? "Two urban nights work for a concentrated stop in a wider route, not a representative municipality trip. Three nights are the best minimum for most first visitors. Adding Wulong changes the trip into city plus landscape: station access, local transfer, shuttles, weather and walking still make a full operational day. Adding Dazu creates a culture-and-heritage day. Build that excursion from transport and opening information verified for the travel date; this Hub does not rely on proposed future infrastructure."
        : locale === "zh"
          ? "两个市区夜晚适合把重庆当作更长中国路线中的浓缩停靠点，并不能代表整个重庆市域。对大多数第一次来的人，三晚是最合适的最低起点。加入武隆后，旅行性质变成“城市＋自然景观”：进出车站、景区接驳、内部交通、天气和步行仍会占用一个完整运营日。加入大足则形成文化与遗产主题日，应以出行日期核实后的交通与开放信息为准；本 Hub 不依赖尚未落地的未来基础设施。"
          : "도심 2박은 긴 중국 여행 중 농축된 정차로는 가능하지만 충칭 직할시 전체를 대표하지 않습니다. 대부분의 첫 방문객에게 3박이 가장 현실적인 최소치입니다. 우룽을 추가하면 역 접근, 현지 이동, 셔틀, 날씨, 보행을 합쳐 운영상 하루가 필요합니다. 다쭈를 추가하면 문화와 유산에 집중하는 하루가 됩니다. 여행 날짜에 확인한 교통과 개방 정보를 기준으로 설계하며, 이 Hub는 제안 단계의 미래 기반시설을 전제로 하지 않습니다.";
    }
    if (block.text.startsWith("As checked in August 2026") || block.text.startsWith("截至2026年8月的核查") || block.text.startsWith("2026년 8월 확인 기준")) {
      block.text = locale === "en"
        ? "Since 23 December 2025, CKG's scheduled domestic, international and regional passenger flights have used the T3 system. Passengers should still follow the terminal and gate shown by the airline rather than relying on an older guide. Rail transit serves the airport, but a car can be the better arrival choice with large luggage, a late landing or a difficult hotel last mile. Recheck the airline record before arranging pickup because flight operations remain dynamic."
        : locale === "zh"
          ? "自2025年12月23日起，CKG计划国内、国际及地区客运航班统一使用T3体系。旅客仍应以航空公司显示的航站楼和登机口为准，不要依赖旧攻略。机场有轨道交通连接；不过在行李多、落地较晚或酒店最后一段复杂时，车辆接送可能更合适。航班运营属于动态事实，安排接送前应再次核对航空公司订单。"
          : "2025년 12월 23일부터 CKG의 정기 국내선·국제선·지역선 여객편은 T3 체계를 사용합니다. 오래된 안내문보다 항공사가 표시한 터미널과 탑승구를 따라야 합니다. 철도교통으로 공항에 갈 수 있지만 큰 짐, 늦은 도착, 복잡한 호텔 마지막 구간이 있다면 차량이 더 나을 수 있습니다. 항공편 운영은 동적 정보이므로 픽업 전에 항공사 예약기록을 다시 확인합니다.";
    }
  }

  const ownerList = blocks.find(
    (block, index) =>
      block.type === "list" &&
      blocks[index - 1]?.type === "paragraph" &&
      (blocks[index - 1].text.includes("Five specialist guides") ||
        blocks[index - 1].text.includes("以下五篇专题指南") ||
        blocks[index - 1].text.includes("다음 다섯 편의 전문 가이드")),
  );
  if (!ownerList) throw new Error(`Specialist owner list not found for ${locale}`);
  ownerList.items.push(
    locale === "en"
      ? "Which Chongqing Railway Station Should You Use? — dated route, ticketed station, hotel transfer and wrong-station prevention."
      : locale === "zh"
        ? "重庆应该用哪个火车站？——按日期、票面车站、酒店接驳和错站预防执行。"
        : "충칭에서 어느 기차역을 이용해야 하나요? — 날짜별 노선, 승차권 역, 호텔 이동, 잘못된 역 방지.",
  );

  const headings = locale === "en"
    ? ["1. Chongqing", "3. Read Chongqing", "5. Airport", "6. How the main", "8. Wulong"]
    : locale === "zh"
      ? ["1. 重庆", "3. 用四个", "5. 机场", "6. 市区", "8. 武隆"]
      : ["1. 중국", "3. 네 가지", "5. 공항", "6. 중심", "8. 우룽"];

  insertAfterHeading(blocks, headings[0], [
    figure("river-confluence", "confluence-1200.webp", [1200, 800], config.figures.confluence),
  ]);
  insertAfterHeading(blocks, headings[1], [
    figure("crown-escalator", "crown-escalator-1200.webp", [1200, 750], config.figures.escalator),
  ]);
  insertAfterHeading(blocks, headings[2], [
    figure("chongqing-east-station", "chongqing-east-station-1200.webp", [1200, 750], config.figures.station),
  ]);
  insertAfterHeading(blocks, headings[3], [
    figure("liziba-geography", "liziba-1200.webp", [1200, 800], config.figures.liziba),
  ]);
  insertAfterHeading(blocks, headings[4], [
    figure("wulong-landscape", "wulong-1200.webp", [1200, 800], config.figures.wulong),
    figure("dazu-heritage", "dazu-1200.webp", [1200, 800], config.figures.dazu),
  ]);

  blocks.push({
    id: "canonical-owner-links",
    type: "internal-links",
    title: config.linksTitle,
    items: supportOwnerSlugs.map(([key, slug]) => ({
      label: config.labels[key][0],
      href: href(locale, slug),
      description: config.labels[key][1],
    })),
  });
  blocks.push({
    id: "stay-owner-links",
    type: "internal-links",
    title: config.stayTitle,
    items: stayOwnerSlugs.map(([key, slug]) => ({
      label: config.labels[key][0],
      href: href(locale, slug),
      description: config.labels[key][1],
    })),
  });
  blocks.push({
    id: "stay-quote-handoff",
    type: "callout",
    title: config.quoteTitle,
    body: config.quoteBody,
    tone: "decision",
  });
  blocks.push({
    id: "planning-links",
    type: "internal-links",
    title: config.planningTitle,
    items: [
      {
        label: config.labels.rushed[0],
        href: href(locale, "is-your-china-itinerary-too-rushed"),
        description: config.labels.rushed[1],
      },
      {
        label: config.labels.review[0],
        href: `${locale === "en" ? "" : `/${locale}`}/china-itinerary-review/`,
        description: config.labels.review[1],
      },
      {
        label: config.labels.contact[0],
        href: `${locale === "en" ? "" : `/${locale}`}/#planner-contact`,
        description: config.labels.contact[1],
      },
    ],
  });
  blocks.push({
    id: "official-sources",
    type: "sources",
    title: config.sourceTitle,
    items: sourceItems.map(({ labels, url, publishers }) => ({
      label: labels[locale],
      url,
      publisher: publishers[locale],
      reviewedAt: "2026-08-21",
    })),
  });
}

function blockSignature(blocks) {
  return blocks.map((block) => `${block.id}:${block.type}`);
}

function renderBody(blocks) {
  const serialized = JSON.stringify({ schemaVersion: "1.0.0", blocks }, null, 2)
    .replace(/^(\s*)"([A-Za-z][A-Za-z0-9]*)":/gmu, "$1$2:");
  return `import type { StructuredPageBody } from "../../../lib/content-system/page-body";\n\nconst body = ${serialized} as const satisfies StructuredPageBody;\n\nexport default body;\n`;
}

await mkdir(outputRoot, { recursive: true });
const bodies = {};
for (const [locale, config] of Object.entries(localeConfig)) {
  const markdown = await readFile(resolve(draftRoot, config.draft), "utf8");
  const blocks = parseMarkdown(markdown);
  enrich(blocks, locale);
  bodies[locale] = blocks;
}

const enSignature = blockSignature(bodies.en);
for (const locale of ["zh", "ko"]) {
  const signature = blockSignature(bodies[locale]);
  if (JSON.stringify(signature) !== JSON.stringify(enSignature)) {
    throw new Error(`Chongqing locale block signatures diverge: en vs ${locale}`);
  }
}

for (const [locale, blocks] of Object.entries(bodies)) {
  await writeFile(resolve(outputRoot, `body.${locale}.ts`), renderBody(blocks), "utf8");
}

process.stdout.write(`Generated ${enSignature.length} aligned blocks for en, zh and ko.\n`);
