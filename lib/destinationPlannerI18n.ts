import type { HomegroundLocale } from "./homegroundI18n";
import {
  destinationIds,
  type DestinationId,
  type DestinationPaceId,
} from "./destinationTiming";
import type {
  DestinationPlannerPartyId,
  DestinationPlannerMode,
} from "./destinationPlanner";

export interface PlannerOption<Id extends string> {
  id: Id;
  label: string;
  description: string;
}

interface DestinationPlannerCopy {
  introEyebrow: string;
  introTitle: string;
  introBody: string;
  progress: (current: number, total: number) => string;
  stepLabels: {
    destinations: string;
    nights: string;
    party: string;
    pace: string;
  };
  mobileTrust: readonly [string, string, string];
  selectedCount: (count: number) => string;
  questions: {
    destinations: {
      eyebrow: string;
      title: string;
      help: string;
      legend: string;
      selectionNote: string;
      otherToggle: string;
      otherLabel: string;
      otherHint: string;
      otherPlaceholder: string;
      classicStartLabel: string;
      classicStartDescription: string;
      classicStartConfirm: string;
      error: string;
      otherError: string;
    };
    nights: {
      eyebrow: string;
      title: string;
      help: string;
      legend: string;
      custom: string;
      customLabel: string;
      error: string;
      nights: (count: number) => string;
    };
    party: {
      eyebrow: string;
      title: string;
      help: string;
      legend: string;
      error: string;
    };
    pace: {
      eyebrow: string;
      title: string;
      help: string;
      legend: string;
      error: string;
    };
  };
  destinations: Record<DestinationId, string>;
  destinationConditions: Partial<Record<DestinationId, string>>;
  partyOptions: readonly PlannerOption<DestinationPlannerPartyId>[];
  paceOptions: readonly PlannerOption<DestinationPaceId>[];
  back: string;
  continue: string;
  showCheck: string;
  restart: string;
  editAnswers: string;
  discardContactConfirm: string;
  result: {
    kicker: string;
    titles: Record<
      | "needs_prioritization"
      | "tighter_than_selected_pace"
      | "within_reference_range"
      | "room_to_shape"
      | "partial_manual_check"
      | "manual_only",
      string
    >;
    bodies: {
      needsPrioritization: (
        minimum: number,
        available: number,
        shortfall: number,
      ) => string;
      tighterThanPace: (
        available: number,
        pace: string,
        minimum: number,
      ) => string;
      withinRange: (pace: string) => string;
      roomToShape: (open: number) => string;
      partialManual: (other: string) => string;
      otherOnly: (other: string) => string;
      classicStart: string;
    };
    wishlistTitle: string;
    keptAll: string;
    otherLabel: string;
    timingTitle: string;
    available: string;
    essentials: string;
    selectedPace: (pace: string) => string;
    notCalculated: string;
    range: (minimum: number, maximum: number) => string;
    nights: (count: number) => string;
    boundary: string;
    conditionalNote: string;
    mustSeeTitle: string;
    mustSeeBody: string;
    mustSeeEqual: string;
    mustSeeLimit: string;
    answersTitle: string;
    answerLabels: {
      destinations: string;
      nights: string;
      party: string;
      pace: string;
    };
    classicStartValue: string;
    contactEyebrow: string;
    contactTitle: string;
    contactBody: string;
  };
  partyLabels: Record<DestinationPlannerPartyId, string>;
  paceLabels: Record<DestinationPaceId, string>;
  modeLabels: Record<DestinationPlannerMode, string>;
}

const enDestinations: Record<DestinationId, string> = {
  "beijing-great-wall": "Beijing & the Great Wall",
  shanghai: "Shanghai",
  xian: "Xi’an",
  chengdu: "Chengdu",
  chongqing: "Chongqing",
  zhangjiajie: "Zhangjiajie",
  "guilin-yangshuo": "Guilin & Yangshuo",
  "hangzhou-suzhou": "Hangzhou & Suzhou",
  "yunnan-dali-lijiang": "Yunnan · Dali & Lijiang",
  "guangzhou-shenzhen": "Guangzhou & Shenzhen",
};

const zhDestinations: Record<DestinationId, string> = {
  "beijing-great-wall": "北京与长城",
  shanghai: "上海",
  xian: "西安",
  chengdu: "成都",
  chongqing: "重庆",
  zhangjiajie: "张家界",
  "guilin-yangshuo": "桂林与阳朔",
  "hangzhou-suzhou": "杭州与苏州",
  "yunnan-dali-lijiang": "云南 · 大理与丽江",
  "guangzhou-shenzhen": "广州与深圳",
};

const koDestinations: Record<DestinationId, string> = {
  "beijing-great-wall": "베이징 & 만리장성",
  shanghai: "상하이",
  xian: "시안",
  chengdu: "청두",
  chongqing: "충칭",
  zhangjiajie: "장자제",
  "guilin-yangshuo": "구이린 & 양숴",
  "hangzhou-suzhou": "항저우 & 쑤저우",
  "yunnan-dali-lijiang": "윈난 · 다리 & 리장",
  "guangzhou-shenzhen": "광저우 & 선전",
};

export const destinationPlannerCopy: Record<
  HomegroundLocale,
  DestinationPlannerCopy
> = {
  en: {
    introEyebrow: "Start with your wishlist",
    introTitle: "Check what your China time can hold",
    introBody:
      "Choose every place that genuinely interests you. We will keep them all, show any time tension and carry the same brief to a person.",
    progress: (current, total) => `Question ${current} of ${total}`,
    stepLabels: {
      destinations: "Wishlist",
      nights: "Nights",
      party: "Group",
      pace: "Pace",
    },
    mobileTrust: [
      "No budget needed",
      "No contact yet",
      "Every place stays",
    ],
    selectedCount: (count) =>
      `${count} ${count === 1 ? "place" : "places"} selected`,
    questions: {
      destinations: {
        eyebrow: "Keep the whole wishlist",
        title: "Which places would you genuinely like to include?",
        help:
          "Choose as many as you want. This is a wishlist, not a final route.",
        legend: "China wishlist",
        selectionNote:
          "Selection order does not set the travel order.",
        otherToggle: "I also have another place in mind",
        otherLabel: "Other city, region or sight",
        otherHint:
          "Write the name as you know it. A planner will check it rather than guessing.",
        otherPlaceholder: "For example: Huangshan or Kashgar",
        classicStartLabel: "I’m not sure yet",
        classicStartDescription:
          "Keep the city choice open and ask a planner for a classic starting point.",
        classicStartConfirm:
          "This will clear the places already selected. Continue?",
        error: "Choose at least one place, add another place, or select “I’m not sure yet.”",
        otherError: "Enter the other place, or close this field.",
      },
      nights: {
        eyebrow: "Use one clear time unit",
        title: "How many nights will you spend in China?",
        help:
          "Count hotel nights in China, not nights spent on international flights. An estimate is fine.",
        legend: "Nights in China",
        custom: "Another number",
        customLabel: "Enter nights in China",
        error: "Choose or enter a whole number from 1 to 60 nights.",
        nights: (count) => `${count} ${count === 1 ? "night" : "nights"}`,
      },
      party: {
        eyebrow: "Plan for real people",
        title: "Which best describes your group?",
        help:
          "This answer goes to the planner and does not change your wishlist.",
        legend: "Travelling party",
        error: "Choose the option that best describes your group.",
      },
      pace: {
        eyebrow: "Name the travel depth",
        title: "How would you like the trip to feel?",
        help:
          "This check compares destination stay time only. A planner confirms transport later.",
        legend: "Preferred pace",
        error: "Choose Essentials, Classic or Unhurried.",
      },
    },
    destinations: enDestinations,
    destinationConditions: {
      zhangjiajie: "3 nights needs favourable arrival and departure times.",
      "hangzhou-suzhou":
        "2 nights is a compressed option and needs a planner to check the connections.",
    },
    partyOptions: [
      {
        id: "two-adults",
        label: "Two adults",
        description: "A couple or two travelling companions.",
      },
      {
        id: "family-with-children",
        label: "Family with children",
        description: "Younger travellers need a workable rhythm.",
      },
      {
        id: "older-relatives",
        label: "Travelling with older relatives",
        description: "Walking, transfers and recovery time matter.",
      },
      {
        id: "multigenerational-family",
        label: "Mixed-age family",
        description: "Children and older relatives are travelling together.",
      },
      {
        id: "friends-private-group",
        label: "Friends or a private group",
        description: "Shared plans with different interests to balance.",
      },
      {
        id: "solo",
        label: "Solo",
        description: "One independent traveller.",
      },
    ],
    paceOptions: [
      {
        id: "essentials",
        label: "Essentials",
        description: "Key highlights, earlier starts and little buffer.",
      },
      {
        id: "classic",
        label: "Classic",
        description: "A balanced first-time depth for most travellers.",
      },
      {
        id: "unhurried",
        label: "Unhurried",
        description: "More recovery time and open space.",
      },
    ],
    back: "Back",
    continue: "Continue",
    showCheck: "Check my wishlist",
    restart: "Start again",
    editAnswers: "Edit answers",
    discardContactConfirm:
      "Changing the planner answers will clear the contact details you entered. Continue?",
    result: {
      kicker: "Your first timing check",
      titles: {
        needs_prioritization: "Your wishlist and time are in conflict",
        tighter_than_selected_pace: "Your places need a faster pace",
        within_reference_range: "Your stay time matches this pace",
        room_to_shape: "You have room to shape the trip",
        partial_manual_check: "Part of this wishlist needs a human check",
        manual_only: "Your starting brief is ready for a planner",
      },
      bodies: {
        needsPrioritization: (minimum, available, shortfall) =>
          `The selected places use about ${minimum} nights even at an Essentials depth. You have ${available}, a gap of about ${shortfall} nights.`,
        tighterThanPace: (available, pace, minimum) =>
          `${available} nights reaches the Essentials reference, but it is below the ${pace} starting range of about ${minimum} nights.`,
        withinRange: (pace) =>
          `The destination stay time falls within the ${pace} reference range.`,
        roomToShape: (open) =>
          `${open} nights remain unassigned after this pace reference. We have not added another place automatically.`,
        partialManual: (other) =>
          `We checked the known destinations. “${other}” remains in your brief and needs a planner to confirm its location and connections.`,
        otherOnly: (other) =>
          `“${other}” stays exactly as you wrote it. An automatic time claim here would be guesswork, so a planner needs to check it.`,
        classicStart:
          "You asked us to keep the city choice open. Your nights, group and pace are ready for a planner to use as the starting brief.",
      },
      wishlistTitle: "Everything you chose",
      keptAll: "We have not added, removed or replaced any selected place.",
      otherLabel: "Other place",
      timingTitle: "Time comparison",
      available: "Available",
      essentials: "Essentials reference",
      selectedPace: (pace) => `${pace} reference`,
      notCalculated: "Planner check",
      range: (minimum, maximum) =>
        minimum === maximum
          ? `${minimum} nights`
          : `${minimum}–${maximum} nights`,
      nights: (count) => `${count} ${count === 1 ? "night" : "nights"}`,
      boundary:
        "This covers destination stay time only. Transport, arrival and departure points, and the final order still need a planner to confirm.",
      conditionalNote:
        "A compressed stay appears in this selection and needs favourable connections.",
      mustSeeTitle: "What should a planner protect first?",
      mustSeeBody:
        "Optional: mark up to three must-see places. Nothing else will be removed.",
      mustSeeEqual: "Leave all my choices equally important",
      mustSeeLimit: "You can mark up to three must-see places.",
      answersTitle: "Your brief",
      answerLabels: {
        destinations: "Places",
        nights: "Nights",
        party: "Group",
        pace: "Pace",
      },
      classicStartValue: "City choice open",
      contactEyebrow: "Continue with a person",
      contactTitle: "Want a planner to check the real route?",
      contactBody:
        "Your full wishlist, nights, pace, priorities and unresolved questions will carry into the contact method you choose.",
    },
    partyLabels: {
      solo: "Solo",
      "two-adults": "Two adults",
      "family-with-children": "Family with children",
      "older-relatives": "Travelling with older relatives",
      "multigenerational-family": "Mixed-age family",
      "friends-private-group": "Friends or a private group",
    },
    paceLabels: {
      essentials: "Essentials",
      classic: "Classic",
      unhurried: "Unhurried",
    },
    modeLabels: {
      wishlist: "Wishlist selected",
      "classic-start": "City choice open",
    },
  },
  zh: {
    introEyebrow: "先从愿望清单开始",
    introTitle: "看看你的中国旅行时间能装下什么",
    introBody:
      "把真正感兴趣的地方都选上。我们会保留全部愿望，指出时间矛盾，并把同一份信息交给人工规划师。",
    progress: (current, total) => `第 ${current} 题，共 ${total} 题`,
    stepLabels: {
      destinations: "愿望清单",
      nights: "住宿晚数",
      party: "同行成员",
      pace: "旅行节奏",
    },
    mobileTrust: [
      "无需先填预算",
      "结果前不留联系方式",
      "每个地点都会保留",
    ],
    selectedCount: (count) => `已选择 ${count} 个地点`,
    questions: {
      destinations: {
        eyebrow: "完整保留愿望",
        title: "你真正想把哪些地方放进这次旅行？",
        help: "想选多少都可以。这是愿望清单，不是最终路线。",
        legend: "中国旅行愿望",
        selectionNote: "勾选顺序不代表最终旅行顺序。",
        otherToggle: "我还有其他想去的地方",
        otherLabel: "其他城市、地区或景点",
        otherHint: "按你知道的名称填写，规划师会核实，不会让系统乱猜。",
        otherPlaceholder: "例如：黄山或喀什",
        classicStartLabel: "我还没决定",
        classicStartDescription: "暂不选城市，请规划师给我一个经典起点。",
        classicStartConfirm: "这会清空已经选择的地方。是否继续？",
        error: "请至少选择一个地方、填写其他地点，或选择“我还没决定”。",
        otherError: "请填写其他地点，或关闭这个输入框。",
      },
      nights: {
        eyebrow: "统一使用清楚的时间单位",
        title: "你会在中国住宿多少晚？",
        help: "只计算在中国酒店住宿的晚数，不包含国际航班上的夜晚。估计值也可以。",
        legend: "在中国住宿晚数",
        custom: "其他晚数",
        customLabel: "输入在华住宿晚数",
        error: "请选择或输入1至60之间的整数晚数。",
        nights: (count) => `${count}晚`,
      },
      party: {
        eyebrow: "为真实同行者规划",
        title: "哪一项最符合你们的同行情况？",
        help: "这项信息会交给规划师，不会改变你的愿望清单。",
        legend: "同行者",
        error: "请选择最符合同行情况的一项。",
      },
      pace: {
        eyebrow: "选择旅行深度",
        title: "你希望这次旅行是什么节奏？",
        help: "这里只比较目的地停留时间；交通会由规划师后续核对。",
        legend: "理想节奏",
        error: "请选择核心速览、经典适中或从容慢行。",
      },
    },
    destinations: zhDestinations,
    destinationConditions: {
      zhangjiajie: "3晚需要较合适的抵达和离开时间。",
      "hangzhou-suzhou": "2晚属于压缩方案，需要规划师核实交通衔接。",
    },
    partyOptions: [
      {
        id: "two-adults",
        label: "两位成人",
        description: "情侣，或两位结伴出行的成人。",
      },
      {
        id: "family-with-children",
        label: "带孩子的家庭",
        description: "需要照顾小朋友的节奏。",
      },
      {
        id: "older-relatives",
        label: "与年长亲友同行",
        description: "步行、换乘和恢复时间更重要。",
      },
      {
        id: "multigenerational-family",
        label: "多代同游家庭",
        description: "孩子和年长亲友一起出行。",
      },
      {
        id: "friends-private-group",
        label: "朋友或私人小团",
        description: "共同安排，也要平衡不同兴趣。",
      },
      {
        id: "solo",
        label: "独自旅行",
        description: "一位独立旅行者。",
      },
    ],
    paceOptions: [
      {
        id: "essentials",
        label: "核心速览",
        description: "重点体验、较多早起，几乎没有缓冲。",
      },
      {
        id: "classic",
        label: "经典适中",
        description: "适合多数第一次来中国的平衡深度。",
      },
      {
        id: "unhurried",
        label: "从容慢行",
        description: "增加恢复时间和自由空间。",
      },
    ],
    back: "返回",
    continue: "继续",
    showCheck: "检查我的愿望清单",
    restart: "重新开始",
    editAnswers: "修改答案",
    discardContactConfirm: "修改规划答案会清空已经填写的联系方式。是否继续？",
    result: {
      kicker: "你的初步时间检查",
      titles: {
        needs_prioritization: "愿望清单与现有时间存在冲突",
        tighter_than_selected_pace: "这些地方需要更快的旅行节奏",
        within_reference_range: "停留时间与所选节奏大致匹配",
        room_to_shape: "你还有时间塑造这趟旅行",
        partial_manual_check: "部分愿望需要人工核实",
        manual_only: "你的初步需求已可以交给规划师",
      },
      bodies: {
        needsPrioritization: (minimum, available, shortfall) =>
          `即使按核心速览计算，这些地方也大约需要${minimum}晚。你现有${available}晚，约相差${shortfall}晚。`,
        tighterThanPace: (available, pace, minimum) =>
          `${available}晚达到核心参考量，但低于${pace}大约${minimum}晚的起点。`,
        withinRange: (pace) => `目的地停留时间处于${pace}参考范围内。`,
        roomToShape: (open) =>
          `按照当前节奏参考，还剩${open}晚未分配。我们没有自动添加无关目的地。`,
        partialManual: (other) =>
          `已计算标准目的地；“${other}”仍完整保留在需求中，需要规划师核实位置和交通。`,
        otherOnly: (other) =>
          `“${other}”会按原文保留。此时自动给出时间结论只会是猜测，因此需要规划师核实。`,
        classicStart:
          "你选择暂不决定城市。晚数、同行者和节奏已经整理好，可以作为规划师推荐路线的起点。",
      },
      wishlistTitle: "你选择的全部地方",
      keptAll: "没有增加、删除或替换任何已选地点。",
      otherLabel: "其他地点",
      timingTitle: "时间对比",
      available: "现有时间",
      essentials: "核心参考",
      selectedPace: (pace) => `${pace}参考`,
      notCalculated: "人工核实",
      range: (minimum, maximum) =>
        minimum === maximum ? `${minimum}晚` : `${minimum}–${maximum}晚`,
      nights: (count) => `${count}晚`,
      boundary:
        "这里仅检查目的地停留时间。交通、入境与离境点，以及最终顺序仍需规划师确认。",
      conditionalNote: "所选地点中包含压缩停留，需要较合适的交通衔接。",
      mustSeeTitle: "规划师最应该优先保留什么？",
      mustSeeBody: "选填：最多标记三个必去地点。其他愿望不会因此被删除。",
      mustSeeEqual: "我的所有选择同样重要",
      mustSeeLimit: "最多可标记三个必去地点。",
      answersTitle: "你的需求摘要",
      answerLabels: {
        destinations: "地点",
        nights: "晚数",
        party: "同行者",
        pace: "节奏",
      },
      classicStartValue: "暂不决定城市",
      contactEyebrow: "接下来由人工继续",
      contactTitle: "需要规划师核实真正的路线吗？",
      contactBody:
        "完整愿望、晚数、节奏、优先级和待确认事项会自动带入你选择的联系方式。",
    },
    partyLabels: {
      solo: "独自旅行",
      "two-adults": "两位成人",
      "family-with-children": "带孩子的家庭",
      "older-relatives": "与年长亲友同行",
      "multigenerational-family": "多代同游家庭",
      "friends-private-group": "朋友或私人小团",
    },
    paceLabels: {
      essentials: "核心速览",
      classic: "经典适中",
      unhurried: "从容慢行",
    },
    modeLabels: {
      wishlist: "已选择愿望地点",
      "classic-start": "暂不决定城市",
    },
  },
  ko: {
    introEyebrow: "여행 희망 목록부터",
    introTitle: "중국에서 보낼 시간에 무엇을 담을 수 있는지 확인하세요",
    introBody:
      "진심으로 가고 싶은 곳을 모두 선택하세요. 선택을 그대로 보존하고 시간의 충돌을 보여 준 뒤 같은 내용을 사람 플래너에게 전달합니다.",
    progress: (current, total) => `${total}개 중 ${current}번째 질문`,
    stepLabels: {
      destinations: "위시리스트",
      nights: "숙박일",
      party: "동행",
      pace: "여행 속도",
    },
    mobileTrust: [
      "예산 입력 불필요",
      "결과 전 연락처 불필요",
      "선택지는 모두 유지",
    ],
    selectedCount: (count) => `${count}곳 선택`,
    questions: {
      destinations: {
        eyebrow: "희망을 모두 보존합니다",
        title: "이번 여행에 정말 넣고 싶은 곳은 어디인가요?",
        help: "원하는 만큼 선택하세요. 최종 동선이 아니라 희망 목록입니다.",
        legend: "중국 여행 희망 목록",
        selectionNote: "선택 순서는 실제 여행 순서를 뜻하지 않습니다.",
        otherToggle: "목록에 없는 다른 곳도 있어요",
        otherLabel: "다른 도시, 지역 또는 명소",
        otherHint: "알고 있는 이름 그대로 적어 주세요. 추측하지 않고 플래너가 확인합니다.",
        otherPlaceholder: "예: 황산 또는 카슈가르",
        classicStartLabel: "아직 정하지 못했어요",
        classicStartDescription: "도시 선택은 열어 두고 플래너에게 대표적인 첫 중국 여행안을 요청합니다.",
        classicStartConfirm: "이미 선택한 장소가 모두 지워집니다. 계속할까요?",
        error: "장소를 하나 이상 선택하거나 다른 장소를 입력하거나 ‘아직 정하지 못했어요’를 선택해 주세요.",
        otherError: "다른 장소를 입력하거나 입력란을 닫아 주세요.",
      },
      nights: {
        eyebrow: "하나의 분명한 시간 단위",
        title: "중국에서 몇 박을 머무르나요?",
        help: "국제선에서 보내는 밤이 아니라 중국 호텔 숙박일수를 세어 주세요. 예상치도 괜찮습니다.",
        legend: "중국 숙박일수",
        custom: "다른 숙박일수",
        customLabel: "중국 숙박일수 입력",
        error: "1박부터 60박 사이의 정수를 선택하거나 입력해 주세요.",
        nights: (count) => `${count}박`,
      },
      party: {
        eyebrow: "실제 여행자를 기준으로",
        title: "일행을 가장 잘 설명하는 항목은 무엇인가요?",
        help: "이 정보는 플래너에게 전달되며 선택한 장소 목록은 바뀌지 않습니다.",
        legend: "여행 일행",
        error: "일행을 가장 잘 설명하는 항목을 선택해 주세요.",
      },
      pace: {
        eyebrow: "여행의 깊이 선택",
        title: "이번 여행이 어떤 속도로 느껴지길 원하나요?",
        help: "여기서는 목적지 체류 시간만 비교하고 교통은 플래너가 나중에 확인합니다.",
        legend: "선호 여행 속도",
        error: "핵심, 클래식 또는 여유로운 속도를 선택해 주세요.",
      },
    },
    destinations: koDestinations,
    destinationConditions: {
      zhangjiajie: "3박은 도착과 출발 시간이 유리해야 합니다.",
      "hangzhou-suzhou": "2박은 압축 일정이며 교통 연결을 플래너가 확인해야 합니다.",
    },
    partyOptions: [
      {
        id: "two-adults",
        label: "성인 두 명",
        description: "커플 또는 두 명의 여행 동행.",
      },
      {
        id: "family-with-children",
        label: "아이와 함께하는 가족",
        description: "어린 여행자의 리듬을 고려합니다.",
      },
      {
        id: "older-relatives",
        label: "연세 있는 가족과 함께",
        description: "도보량, 환승과 회복 시간이 중요합니다.",
      },
      {
        id: "multigenerational-family",
        label: "여러 세대 가족",
        description: "아이와 연세 있는 가족이 함께 여행합니다.",
      },
      {
        id: "friends-private-group",
        label: "친구 또는 단독 그룹",
        description: "함께하는 계획과 서로 다른 관심사를 조율합니다.",
      },
      {
        id: "solo",
        label: "혼자",
        description: "한 명의 자유 여행자.",
      },
    ],
    paceOptions: [
      {
        id: "essentials",
        label: "핵심 위주",
        description: "주요 명소, 이른 출발과 거의 없는 여유 시간.",
      },
      {
        id: "classic",
        label: "클래식",
        description: "첫 중국 여행에 알맞은 균형 잡힌 깊이.",
      },
      {
        id: "unhurried",
        label: "여유롭게",
        description: "회복 시간과 빈 시간을 더 둡니다.",
      },
    ],
    back: "이전",
    continue: "계속",
    showCheck: "희망 목록 확인하기",
    restart: "처음부터",
    editAnswers: "답변 수정",
    discardContactConfirm:
      "플래너 답변을 변경하면 입력한 연락처 정보가 지워집니다. 계속할까요?",
    result: {
      kicker: "첫 시간 점검",
      titles: {
        needs_prioritization: "희망 목록과 가능한 시간이 충돌합니다",
        tighter_than_selected_pace: "선택한 장소에는 더 빠른 속도가 필요합니다",
        within_reference_range: "체류 시간이 선택한 속도와 대체로 맞습니다",
        room_to_shape: "여행을 다듬을 여유가 있습니다",
        partial_manual_check: "일부 희망 장소는 사람의 확인이 필요합니다",
        manual_only: "플래너에게 전달할 출발 정보가 준비되었습니다",
      },
      bodies: {
        needsPrioritization: (minimum, available, shortfall) =>
          `핵심 위주로 보아도 선택한 장소에는 약 ${minimum}박이 필요합니다. 가능한 시간은 ${available}박으로 약 ${shortfall}박이 부족합니다.`,
        tighterThanPace: (available, pace, minimum) =>
          `${available}박은 핵심 기준에는 닿지만 ${pace} 기준의 약 ${minimum}박보다 짧습니다.`,
        withinRange: (pace) =>
          `목적지 체류 시간이 ${pace} 참고 범위 안에 있습니다.`,
        roomToShape: (open) =>
          `현재 속도 기준 뒤에 ${open}박이 배정되지 않은 채 남습니다. 관련 없는 장소를 자동으로 추가하지 않았습니다.`,
        partialManual: (other) =>
          `알려진 목적지는 계산했습니다. ‘${other}’도 그대로 보존되며 위치와 연결을 플래너가 확인해야 합니다.`,
        otherOnly: (other) =>
          `‘${other}’를 적은 그대로 보존합니다. 여기서 자동 시간 결론을 내리면 추측이 되므로 플래너 확인이 필요합니다.`,
        classicStart:
          "도시 선택을 열어 두셨습니다. 숙박일수, 일행과 속도가 플래너 추천의 출발 정보로 준비되었습니다.",
      },
      wishlistTitle: "선택한 모든 장소",
      keptAll: "선택한 장소를 추가하거나 삭제하거나 바꾸지 않았습니다.",
      otherLabel: "다른 장소",
      timingTitle: "시간 비교",
      available: "가능한 시간",
      essentials: "핵심 참고값",
      selectedPace: (pace) => `${pace} 참고값`,
      notCalculated: "플래너 확인",
      range: (minimum, maximum) =>
        minimum === maximum
          ? `${minimum}박`
          : `${minimum}–${maximum}박`,
      nights: (count) => `${count}박`,
      boundary:
        "여기서는 목적지 체류 시간만 확인합니다. 교통, 입출국 장소와 최종 순서는 플래너가 확인해야 합니다.",
      conditionalNote:
        "선택에 압축 체류가 포함되어 있어 유리한 교통 연결이 필요합니다.",
      mustSeeTitle: "플래너가 가장 먼저 지켜야 할 곳은 어디인가요?",
      mustSeeBody: "선택 사항: 꼭 가야 할 곳을 최대 세 곳 표시하세요. 다른 희망 장소는 삭제되지 않습니다.",
      mustSeeEqual: "모든 선택이 똑같이 중요해요",
      mustSeeLimit: "꼭 가야 할 곳은 최대 세 곳까지 표시할 수 있습니다.",
      answersTitle: "여행 요청 요약",
      answerLabels: {
        destinations: "장소",
        nights: "숙박",
        party: "일행",
        pace: "속도",
      },
      classicStartValue: "도시 선택 열어 두기",
      contactEyebrow: "다음은 사람이 이어 갑니다",
      contactTitle: "플래너가 실제 동선을 확인해 드릴까요?",
      contactBody:
        "전체 희망 목록, 숙박일수, 속도, 우선순위와 미확인 사항이 선택한 연락 방법에 자동으로 담깁니다.",
    },
    partyLabels: {
      solo: "혼자",
      "two-adults": "성인 두 명",
      "family-with-children": "아이와 함께하는 가족",
      "older-relatives": "연세 있는 가족과 함께",
      "multigenerational-family": "여러 세대 가족",
      "friends-private-group": "친구 또는 단독 그룹",
    },
    paceLabels: {
      essentials: "핵심 위주",
      classic: "클래식",
      unhurried: "여유롭게",
    },
    modeLabels: {
      wishlist: "희망 장소 선택",
      "classic-start": "도시 선택 열어 두기",
    },
  },
};

export function getDestinationPlannerCopy(
  locale: HomegroundLocale,
): DestinationPlannerCopy {
  return destinationPlannerCopy[locale];
}

export function getDestinationName(
  id: DestinationId,
  locale: HomegroundLocale,
): string {
  return destinationPlannerCopy[locale].destinations[id];
}

export function getDestinationNames(
  ids: readonly DestinationId[],
  locale: HomegroundLocale,
): string[] {
  const selected = new Set(ids);
  return destinationIds
    .filter((id) => selected.has(id))
    .map((id) => getDestinationName(id, locale));
}
