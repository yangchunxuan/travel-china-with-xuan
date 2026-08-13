import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "lead",
      type: "lead",
      text: "二十四节气既是太阳周年运动中的固定标记，也是中国人记忆季节变化、农事节奏与社区实践的一套活态框架。对旅客来说，节气名适合用来追问“这个地方在此时观察什么、做什么”，却不能保证旅行当天一定下雨、结霜、降雪或转暖。",
    },
    {
      id: "direct-answer",
      type: "callout",
      tone: "decision",
      title: "旅客最该记住的一条规则",
      body: "用节气理解眼前所见，用最新的当地天气预报决定穿什么、户外安排是否可行。看到以节气命名的菜品或活动时，还要确认具体地点、呈现它的社区或场馆，以及当年的日期。只有一个节气标签，不能证明这项实践全国通行、历史悠久或今天一定存在。",
    },
    {
      id: "scope-heading",
      type: "heading",
      level: 2,
      text: "同一套节气，包含三种不同层次的意义",
    },
    {
      id: "scope-table",
      type: "table",
      caption: "理解节气信息前，先把这三层分开",
      columns: ["层次", "相对稳定的部分", "会变化的部分", "旅客怎么用"],
      rows: [
        ["天文标记", "节气顺序，以及太阳视黄经每隔15度设置一个节点", "每年落到公历上的精确时刻", "判断旅行日期位于太阳周年周期的哪个位置"],
        ["环境记忆", "名称保留了对季节、天气、物候与农事的观察", "实际状况会受纬度、海拔、季风、海陆位置与年份影响", "先理解名称在追问什么，再看当地证据"],
        ["活态文化实践", "社区会传承与节气相关的食俗、谚语、仪式与活动", "谁在实践、怎样实践、在哪里实践，以及旅客能否参与", "找到具体的地方主体，再核对当年安排"],
      ],
    },
    {
      id: "heritage-context",
      type: "paragraph",
      text: "联合国教科文组织于2016年将“二十四节气——中国人通过观察太阳周年运动而形成的时间知识体系及其实践”列入人类非物质文化遗产代表作名录。其资料说明，二十四节气发端于黄河流域，后来逐步在全国应用，并持续影响农业生产与日常生活。覆盖全国不等于各地完全相同：教科文组织列举的是若干具体社区的节庆，而不是一套全国统一表演。",
    },
    {
      id: "mechanics-heading",
      type: "heading",
      level: 2,
      text: "节气是天文节点，不是天气事件",
    },
    {
      id: "mechanics",
      type: "paragraph",
      text: "中国气象局对现代节气划分的解释，是依据太阳在黄道上的视位置：太阳视黄经每前进15度，就进入下一个节气。严格来说，这个节点是一个时刻，不是完整的一天；但在日常表达中，人们也常用节气名指当天，甚至指直到下一个节气前的大约两周。如果活动时间、展览或仪式很重要，应按主办方公布的公历日期和时间执行，不要根据翻译后的节气名自行推算。",
    },
    {
      id: "names-heading",
      type: "heading",
      level: 2,
      text: "把节气名当成古老的观察索引",
    },
    {
      id: "name-families",
      type: "table",
      caption: "四类常见命名：它们有描述性，但不是当天预报",
      columns: ["类别", "例子", "名称指向什么", "稳妥的旅行解读"],
      rows: [
        ["季节转折", "立春、立夏、立秋、立冬", "一年季节循环中的位置", "天文意义上的入季，不代表当地气温已经换季"],
        ["太阳几何", "春分、秋分、夏至、冬至", "昼夜长短与太阳周年位置的变化", "昼长含义通常比温度假设更能跨地区成立"],
        ["水分与温度语言", "雨水、白露、霜降、小雪、大雪", "传统经验中的趋势与可见自然现象", "先看当地是否真的出现，不能等名称“准时兑现”"],
        ["物候与农事", "惊蛰、谷雨、小满、芒种", "生物信号与农业时序", "追问说的是哪种作物、哪类生境与哪套地方农时"],
      ],
    },
    {
      id: "forecast-warning",
      type: "callout",
      tone: "warning",
      title: "“立春”不等于当地已经进入春天天气",
      body: "中国横跨多种纬度、海拔与海陆环境，季风影响也不相同。中国气象局明确指出，各地四季变化差异很大。一项使用1960—2008年549个气象站资料的同行评议研究，也发现以气候阈值定义的“气候节气”时间会变化。无论古老名称还是全国平均，都不能代替旅行日期对应城市的天气预报。",
    },
    {
      id: "weather-heading",
      type: "heading",
      level: 2,
      text: "把诗意的天气词，转成实际核验",
    },
    {
      id: "weather-check",
      type: "table",
      caption: "从节气名走到旅行决策",
      columns: ["你看到的词", "不要直接推断", "应该另查", "失效后的调整"],
      rows: [
        ["日历上写着“小雪”", "这里当天一定下雪", "当地预报、海拔以及道路或景区公告", "准备不受天气影响的室内选项"],
        ["说明牌上写着“雨水”", "这一天必然下雨", "逐小时降水与场地地面状况", "移动暴露度高的步行，把文化参观保留下来"],
        ["菜单上写着“立秋”", "炎热已经结束", "高温预警、遮阴条件与夜间气温", "减少正午户外时间"],
        ["农场介绍“霜降”", "所有田地都已经结霜", "作物阶段、当地最低气温与农户解释", "只描述真实所见，不替节气名补演天气"],
      ],
    },
    {
      id: "food-heading",
      type: "heading",
      level: 2,
      text: "一道“节气菜”，可能表达三种不同意思",
    },
    {
      id: "food-meaning",
      type: "comparison",
      title: "先识别它在主张什么，再转述",
      columns: [
        {
          heading: "当季食材",
          body: "某种作物、水产或腌藏食品正处于当地生产周期中可得或受重视的阶段。可以追问产地，也要确认当季是否真的已经到来。",
        },
        {
          heading: "社区食俗",
          body: "某个家庭或地方把一种食物与节气联系起来。中国气象局的冬至资料记录了多地不同吃法，这证明的是多样性，不是一份全国统一菜单。",
        },
        {
          heading: "商业主题",
          body: "餐馆、酒店或商店也可能围绕熟悉的节气推出限时菜单。可以体验，但不能把营销名称当成古老或全国性传统的证据。",
        },
      ],
    },
    {
      id: "food-questions",
      type: "list",
      items: [
        "这道菜在当地确实与这个节气有关，还是普通的季节菜单？",
        "是谁在解释这层关系：社区传承者、博物馆、生产者、餐馆，还是一条社交媒体内容？",
        "食材是否真的来自本地并处于当季，还是仅借用了节气名称？",
        "说明中是否出现医疗功效？若没有可靠健康证据，应只把它视为文化观念。",
        "饮食限制与过敏原能否脱离文化故事，按实际配方另行确认？",
      ],
    },
    {
      id: "health-boundary",
      type: "callout",
      tone: "warning",
      title: "本文不是节气养生建议",
      body: "菜单和地方说明中可能出现“滋补”“祛湿”或“防病”等表达。本文只把这些当作文化语言记录，不推荐任何食物、草药或生活方式用于治疗或预防疾病。健康决定应遵循适当的临床建议。",
    },
    {
      id: "activities-heading",
      type: "heading",
      level: 2,
      text: "地方活动必须能说清地点和当下主办者",
    },
    {
      id: "activities",
      type: "paragraph",
      text: "联合国教科文组织的资料举到九华立春祭、壮族霜降节等例子；中国国家级非遗数据库还单独记录了安仁赶分社这一春分社区实践。它们说明，同一套节气可以生长出不同的地方表达，却不能证明每天都有游客演出、所有人都能进入，或另一座城市也有完全相同的活动。出发前应向当地文旅部门、博物馆、社区组织或场馆核对当年安排，并尊重仪式空间与拍摄限制。",
    },
    {
      id: "scenarios-heading",
      type: "heading",
      level: 2,
      text: "两位旅客，两种站得住脚的读法",
    },
    {
      id: "scenarios",
      type: "comparison",
      columns: [
        {
          heading: "情境一：在两座城市遇见不同冬至食物",
          items: [
            "一位旅客在一座城市看到饺子宣传，在另一座城市看到糯米类食物。",
            "更可靠的结论是：同一节气存在地区差异，而不是其中一道才是全国“正宗答案”。",
            "旅客先问当地关联和实际配料，再按真实食谱处理饮食限制。",
          ],
        },
        {
          heading: "情境二：惊蛰遇上寒冷天气",
          items: [
            "博物馆展板讲述惊蛰的物候记忆，但当天预报仍然寒冷。",
            "二者并不矛盾：天文节点固定，而生物活动与天气会随地点和年份变化。",
            "旅客保留博物馆里的文化理解，再按实时天气调整户外活动。",
          ],
        },
      ],
    },
    {
      id: "workflow-heading",
      type: "heading",
      level: 2,
      text: "一套五步现场读法",
    },
    {
      id: "workflow",
      type: "list",
      ordered: true,
      items: [
        "先说清节气名称，并从可靠年历确认旅行年份对应的准确公历日期。",
        "把天文节点，与眼前信息所主张的当地天气、作物或物候分开。",
        "给主张定位：城市、村庄、海拔、场馆、社区和生产者都会改变含义。",
        "判断所见属于直接观察、社区解释、机构阐释，还是商业推广。",
        "参加或品尝之前，核对当下主办者、开放安排、时间、配料与可行替代。",
      ],
    },
    {
      id: "failure-heading",
      type: "heading",
      level: 2,
      text: "预想中的节气场景没有出现时",
    },
    {
      id: "failure-recovery",
      type: "table",
      caption: "计划中的证据消失，也可以保留原本的文化问题",
      columns: ["失效情况", "它说明什么", "更好的下一步"],
      rows: [
        ["田里的作物阶段不同", "当地条件或农户选择与简化节气表不同", "询问生产者眼前是什么阶段，不要摆拍虚假的节气农事"],
        ["公告过的活动没有举行", "非遗名录不是运营日历", "改看博物馆或有文献依据的展览，并复核社区官方通知"],
        ["节气菜已经售罄", "节气不能保证供应", "请当地人解释另一种当季食材，不要硬找一份所谓全国等价菜"],
        ["天气与节气名相反", "名称本来就不是预报", "当天按实时天气行动，把节气名留作历史与文化语境"],
      ],
    },
    {
      id: "final-check",
      type: "callout",
      tone: "neutral",
      title: "出发前的最后核验",
      body: "临近旅行时，再查准确节气日期、城市天气、社区或场馆公告、访客权限、拍摄规则与食物配料。本文于2026年8月13日复核了动态信息的编辑边界，但不声称任何点名活动、作物阶段或菜单目前一定可得。",
    },
    {
      id: "human-help",
      type: "callout",
      tone: "decision",
      title: "想请真人把合适的时令体验放进路线？",
      body: "留下旅行日期、人数和大致预算。Homeground 规划师可以帮助确认哪些地方实践当下真实存在，并把一个有证据支撑的时令体验放进路线。",
    },
    {
      id: "internal-links",
      type: "internal-links",
      title: "带着语境继续规划",
      items: [
        { "label": "不按清单式玩法探索中国", "href": "/zh/explore/", "description": "返回已经上线的文化与体验集合页。" },
        { "label": "判断中国旅行是否需要导游", "href": "/zh/guides/do-you-need-a-tour-guide-in-china/", "description": "当地方解释或实时核验会改变体验时，再考虑专业解说。" },
        { "label": "检查行程是否太赶", "href": "/zh/guides/is-your-china-itinerary-too-rushed/", "description": "给观察留出时间，不要匆忙打卡一个时令节点。" },
      ],
    },
    {
      id: "sources",
      type: "sources",
      title: "官方与学术来源",
      items: [
        { "label": "二十四节气——联合国教科文组织代表作名录", "url": "https://ich.unesco.org/en/RL/the-twenty-four-solar-terms-knowledge-in-china-of-time-and-practices-developed-through-observation-of-the-sun-s-annual-motion-00647", "publisher": "联合国教科文组织非物质文化遗产", "reviewedAt": "2026-08-13" },
        { "label": "24节气的来源和命名", "url": "https://www.cma.gov.cn/2011xzt/essjqzt/jqhz/jqhz02/201312/t20131213_233949.html", "publisher": "中国气象局", "reviewedAt": "2026-08-13" },
        { "label": "二十四节气列入联合国教科文组织人类非遗代表作名录", "url": "https://www.mct.gov.cn/gtb/index.jsp?url=https%3A%2F%2Fwww.mct.gov.cn%2Fwhzx%2Fbnsj%2Fdwwhllj%2F201612%2Ft20161214_773196.html", "publisher": "中华人民共和国文化和旅游部", "reviewedAt": "2026-08-13" },
        { "label": "农历二十四节气（安仁赶分社）", "url": "https://www.ihchina.cn/project_details/15064.html", "publisher": "中国非物质文化遗产网", "reviewedAt": "2026-08-13" },
        { "label": "二十四节气·冬至及地区习俗", "url": "https://www.cma.gov.cn/ztbd/2025zt/24jq/dongzhi/index.html", "publisher": "中国气象局", "reviewedAt": "2026-08-13" },
        { "label": "1960—2008年二十四节气的气候变化研究", "url": "https://link.springer.com/article/10.1007/s11434-011-4724-4", "publisher": "Science Bulletin / Springer Nature", "reviewedAt": "2026-08-13" },
        { "label": "首图：Uuongkinghe拍摄杭州半山立夏节气鼓乐，CC BY-SA 4.0；已裁切缩放", "url": "https://commons.wikimedia.org/wiki/File:%E4%BA%8C%E5%8D%81%E5%9B%9B%E8%8A%82%E6%B0%94%E4%BB%A4%E9%BC%93_202405051009.jpg", "publisher": "维基共享资源", "reviewedAt": "2026-08-13" },
      ],
    },
  ],
} as const satisfies StructuredPageBody;

export default body;
