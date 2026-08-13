import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {
  schemaVersion: "1.0.0",
  blocks: [
    {
      id: "answer-first",
      type: "lead",
      text:
        "如果中国地图上的地点标记看起来不对，不要凭感觉拖动标记，也不要把经纬度直接粘贴到另一个 App。正确做法是重新确认“这是哪个地点”：取得官方中文全名、城市和区县、完整中文门址、分店或航站楼、可使用的入口以及附近地标；再在中国本地地图中用这些文字重新搜索。仍有疑问时，请场所用你正在使用的同一个地图 App 发送位置链接。不同地图不一致时，场所当前公布的正式地址和可进入的入口，比一组裸经纬度更可靠。",
    },
    {
      id: "no-number-repair",
      type: "callout",
      title: "不要自行计算“修正量”",
      body:
        "地图平台的官方开发文档确实区分多种坐标输入，但并没有给旅行者一个可在全国通用的固定方向或距离。手动加减数值可能只是把标记从一个错误位置移到另一个错误位置，也无法发现同名分店、旧地址或关闭的入口。本文只提供合规的旅行排障：核对地址与入口，不讨论未公开算法。",
      tone: "warning",
    },
    {
      id: "diagnosis-heading",
      type: "heading",
      level: 2,
      text: "先做 60 秒诊断",
    },
    {
      id: "diagnosis-table",
      type: "table",
      caption: "不同的可见症状，对应不同的恢复路径",
      columns: ["你看到的现象", "可能类别", "第一项检查"],
      rows: [
        [
          "同一个分享标记只在换 App 打开后落到道路或建筑旁边",
          "跨平台交接时坐标来源或底图来源不匹配",
          "停止传递数值，直接在接收地图中搜索官方中文地址。",
        ],
        [
          "两个搜索结果的区县、分店名或门牌号不同",
          "选错或模糊匹配了 POI",
          "出发前对比城市、区县、分店附加名称和官方电话。",
        ],
        [
          "两个结果都写同一座大型车站、景区或商场，却落在不同方向",
          "场所中心点与入口或导航引导点不同",
          "确认你的门票、交通方式和当天通行通知要求使用哪个入口。",
        ],
        [
          "目的地标记不动，只有代表当前位置的蓝点跳动",
          "手机实时定位、权限或室内信号问题",
          "先依靠现场标识和已知地标，再到开阔处重新定位。",
        ],
      ],
    },
    {
      id: "causes-heading",
      type: "heading",
      level: 2,
      text: "为什么描述“同一地点”的标记会不同",
    },
    {
      id: "causes-comparison",
      type: "comparison",
      title: "先判断出问题的是哪一层数据",
      columns: [
        {
          heading: "坐标交接",
          items: [
            "高德、百度和腾讯的官方开发文档都明确区分 GPS 与平台相关的坐标输入。",
            "使用自身数据的正规 App 可以在内部完成适配；第三方混用或误标来源时更容易出错。",
            "一组没有来源标签的经纬度，不能告诉旅行者接收 App 会如何解释它。",
          ],
        },
        {
          heading: "地址与 POI 匹配",
          items: [
            "文字不完整时，结果可能只落在城市、道路、商圈或大致中心。",
            "拼音名、翻译名和常见品牌名可能匹配到另一家分店。",
            "场所搬迁、改名或关闭入口后，各地图数据库的更新时间可能不同。",
          ],
        },
        {
          heading: "目的地与当前位置",
          items: [
            "大型场所可能同时有中心点、子 POI 和单独的导航入口。",
            "可用入口还可能随时段、票种、车辆通行或施工通知改变。",
            "手机蓝点也会受定位权限以及 GPS、Wi-Fi 和蜂窝信号影响。",
          ],
        },
      ],
    },
    {
      id: "regulatory-boundary",
      type: "paragraph",
      text:
        "中国的测绘与公开地图规则要求采用规定的测绘基准、系统和标准，并对受保护的地理信息进行经认定的处理。自然资源主管部门也明确，国家认定的处理算法及参数受到保护。这是理解制度背景所需的信息，但不能据此认定每一个酒店错标都来自保密处理，更不能推导出一个统一的修正量。平台的具体产品、接口与地区也会改变结论：同一家平台对境内和海外服务都可能记录不同的默认设置。",
    },
    {
      id: "card-heading",
      type: "heading",
      level: 2,
      text: "制作一张六字段目的地卡",
    },
    {
      id: "destination-card",
      type: "list",
      ordered: true,
      items: [
        "抄下场所目前使用的官方中文全名，包括括号内或短横线后的分店名称。",
        "记录城市和区县。这两项能排除大量同名和跨城市误选。",
        "抄下中文街道、弄巷和门牌号，保留原文字，不要只依赖译文。",
        "补充具体单元：航站楼、车站候车区、酒店楼栋、景区片区或商场楼层。",
        "只有在官方渠道确认后，才记录可使用入口或上车点及其方位，例如东门或某个地铁出口。",
        "增加一个现场可见地标和官方电话或消息渠道。卡片上不要放护照、订单、房号或支付信息。",
      ],
    },
    {
      id: "handoff-format",
      type: "callout",
      title: "最稳妥的交接同时包含文字与同 App 链接",
      body:
        "请酒店、景点或接待方发送完整中文地址，并使用司机或旅行者实际采用的同一个地图 App 分享位置。只有截图可能很快过时，只有链接又可能跳转到错误 App。把文字离线保存，必要时别人可以重新搜索。",
      tone: "decision",
    },
    {
      id: "crosscheck-heading",
      type: "heading",
      level: 2,
      text: "出发前交叉核对地点",
    },
    {
      id: "crosscheck-steps",
      type: "list",
      ordered: true,
      items: [
        "从场所当前官网、官方账号、订单确认或直接回复开始，不从转载攻略中的旧标记开始。",
        "在一个中国本地地图中搜索中文名和城市，选择区县及完整门址都与目的地卡一致的结果。",
        "打开 POI 详情，对比分店名称、类别和官方电话。字段缺失代表尚不确定，不代表已经确认。",
        "如果是大型场所，把所需入口、游客入口、上车点或售票处当作独立地点再次搜索。",
        "再看第二个本地地图，或请场所确认第一个结果。地址和入口一致，比两个标记在画面上完全重合更重要。",
        "离线保存选定的中文文字、同 App 链接和不含隐私的截图。如果入口可能变化，出发当天再查一次。",
      ],
    },
    {
      id: "scenarios-heading",
      type: "heading",
      level: 2,
      text: "旅行中常见的四种情境",
    },
    {
      id: "scenario-table",
      type: "table",
      caption: "根据症状选择恢复方式，不先套用单一理论",
      columns: ["情境", "判断", "恢复"],
      rows: [
        [
          "订单页上的英文酒店标记在马路对面，而酒店给出了中文门址",
          "先把订单标记视为未经核验",
          "搜索中文分店名和门牌号，请前台发送同 App 链接并确认入口。",
        ],
        [
          "一个地图标景区中心，另一个地图标东门",
          "两者可能都在描述这个场所",
          "以景点当天为你的票种和到达方式指定的入口为准。",
        ],
        [
          "出租车路线驶向另一个区的同名分店",
          "更可能是地点身份选错，而不是地图几何本身出错",
          "安全停车，核对六字段，并请场所发送司机所用 App 的链接。",
        ],
        [
          "在商场或车站内，蓝点跳到街外，但现场标识与目的地吻合",
          "把实时定位问题与固定 POI 分开",
          "先按楼层和出口标识前往清晰锚点，再到室外或入口附近重新定位。",
        ],
      ],
    },
    {
      id: "taxi-heading",
      type: "heading",
      level: 2,
      text: "在出租车或网约车内安全恢复",
    },
    {
      id: "taxi-recovery",
      type: "list",
      ordered: true,
      items: [
        "给司机看中文目的地卡和司机地图中的 POI，不要只给英文截图。",
        "指出区县、分店和入口，并在车辆开动前请司机确认区县。",
        "如果路线指向场所中心点，改搜已确认的车辆入口或上车点。",
        "路线明显前往另一个区或另一家分店时，请在安全公共地点停车；不要一边让司机分心，一边修改终点。",
        "致电或联系场所，请工作人员用中文说明最后一段路线，或发送司机所用 App 的位置链接。",
        "无法确认时，先改去附近已知的公共地标，再在那里解决最后一段，不要在车辆移动中反复测试标记。",
      ],
    },
    {
      id: "taxi-warning",
      type: "callout",
      title: "行驶中的车辆不适合反复试错",
      body:
        "不要让司机追随临时制作的标记进入封路、私人区域或不安全的停车点。稳妥备选是已核验的入口、有工作人员的酒店、交通枢纽出口，或其他能重新确认目的地的公共地标。",
      tone: "warning",
    },
    {
      id: "walking-heading",
      type: "heading",
      level: 2,
      text: "步行时如何恢复",
    },
    {
      id: "walking-recovery",
      type: "list",
      ordered: true,
      items: [
        "如果标记要求你跨越围栏、快速路、铁路、水道、施工区或私人入口，立即停下。",
        "把中文路牌、楼号、门名和附近地标与目的地卡逐项比较。",
        "如果只有蓝点不稳定，可到开阔处，在适当情况下开启地图的精确定位权限并等待重新定位；不要认为目的地也跟着移动了。",
        "退回一个明确锚点，例如有工作人员的地铁出口、主路路口、车站问询处或酒店前台。",
        "直接搜索入口或门名，不要反复导航到大型场所中心。",
        "请工作人员用中文说明从锚点到入口的走法，或发送准确入口的同 App 链接。",
        "如果场所关闭或入口改变，以场所实时通知为准；旧地图仍画着道路，也不要强行进入。",
      ],
    },
    {
      id: "change-heading",
      type: "heading",
      level: 2,
      text: "哪些变化会改变结论",
    },
    {
      id: "change-table",
      type: "table",
      caption: "以下任一条件变化，都应重新核验",
      columns: ["变化的条件", "为什么重要", "新的核验动作"],
      rows: [
        ["场所名称、分店或电话", "POI 可能搬迁、关闭或出现重复", "通过场所当前官方渠道确认。"],
        ["入口或道路通行", "中心位置没变，但可用到达路径会变", "核对当天入口和车辆规则。"],
        ["地图 App、订单内嵌地图或分享链接格式", "不同产品可能以不同方式解释或匹配位置", "在接收 App 中重新搜索文字地址。"],
        ["国家/地区、App 版本或服务接口", "平台文档并不存在一个跨产品通用的坐标默认值", "查看该产品当前官方帮助并使用第一方 POI。"],
        ["只有实时蓝点变化", "定位权限和信号条件会影响当前位置", "检查设备设置，并移动到开阔、明确的锚点。"],
      ],
    },
    {
      id: "final-heading",
      type: "heading",
      level: 2,
      text: "最终地点核验",
    },
    {
      id: "final-check",
      type: "list",
      items: [
        "中文名称和分店与场所当前官方渠道一致。",
        "城市、区县、街道和门牌全部一致，没有只凭标记猜测。",
        "选定入口符合当天票种、开放通知和交通方式。",
        "第二个来源或场所工作人员确认了同一个地点身份。",
        "文字地址和同 App 链接已经离线保存。",
        "路线不需要跨越障碍，也不会进入限制或关闭区域。",
        "如果地图仍不一致，你已有一个有工作人员的公共备选地标和可用联系方式。",
      ],
    },
    {
      id: "privacy-boundary",
      type: "callout",
      title: "修正公开地点，不暴露旅行者",
      body:
        "如果场所确认公开 POI 有误，可使用地图平台的正式地点反馈渠道，只提交识别公共地点所必需的信息。不要上传未经打码的护照、订单编号、房号、支付页面、二维码，或泄露旅行者实时位置的截图。POI、入口和道路都会变化；下列平台与政策来源均于 2026 年 8 月 13 日复核。",
      tone: "neutral",
    },
    {
      id: "internal-links",
      type: "internal-links",
      title: "准备其余抵达工具",
      items: [
        {
          label: "浏览中国旅行实用信息",
          href: "/zh/essentials/",
          description: "把联网、支付与故障恢复方案放在一起准备。",
        },
        {
          label: "选择中国 eSIM 或当地 SIM",
          href: "/zh/guides/china-esim-vs-local-sim/",
          description: "可用的数据连接有助于排障，但不能证明目的地标记正确。",
        },
        {
          label: "没有中国号码时使用公共 Wi-Fi",
          href: "/zh/guides/china-public-wifi-passport-login/",
          description: "为抵达后的地图排障准备场所级联网备选。",
        },
        {
          label: "在中国丢失手机后的恢复步骤",
          href: "/zh/guides/lost-phone-in-china-digital-recovery/",
          description: "按正确顺序保护设备、号码、账户与订单。",
        },
        { label: "看懂中国无人驾驶出租车运营区", href: "/zh/guides/china-robotaxi-zones-explained/", description: "看懂无人驾驶出租车运营区、试点阶段和车辆监管，并分清开放测试道路与可供公众乘坐的服务。" },
        { label: "理解重庆的立体城市", href: "/zh/guides/chongqing-upper-lower-city-orientation/", description: "把重庆当作三维城市来读：短距离步行前先核对道路高度、车站出口和建筑入口。" },
        { label: "从市场之外理解义乌", href: "/zh/guides/yiwu-market-to-factory-network/", description: "理解义乌商品陈列背后的不同角色，不把商位当成工厂证明，也不把旧目录当成当前指引。" },
      ],
    },
    {
      id: "sources",
      type: "sources",
      title: "地图平台、标准与监管一手来源",
      items: [
        {
          label: "地理编码与逆地理编码",
          url: "https://lbs.amap.com/api/webservice/guide/api/georegeo/",
          publisher: "高德地图开放平台",
          reviewedAt: "2026-08-13",
        },
        {
          label: "Web 服务 API 概述与坐标来源字段",
          url: "https://lbs.amap.com/api/webservice/summary/",
          publisher: "高德地图开放平台",
          reviewedAt: "2026-08-13",
        },
        {
          label: "地理编码服务与结果置信字段",
          url: "https://lbsyun.baidu.com/docs/webapi?title=geocoding%2Fguide%2Fwebservice-geocoding-base",
          publisher: "百度地图开放平台",
          reviewedAt: "2026-08-13",
        },
        {
          label: "地点检索 3.0 与导航引导点",
          url: "https://lbsyun.baidu.com/docs/webapi?title=placev3%2Fguide%2Fwebservice-placeapiV3%2FinterfaceDocumentV3",
          publisher: "百度地图开放平台",
          reviewedAt: "2026-08-13",
        },
        {
          label: "地址解析与匹配层级",
          url: "https://lbs.qq.com/webservice_v1/guide-geocoder.html",
          publisher: "腾讯位置服务",
          reviewedAt: "2026-08-13",
        },
        {
          label: "腾讯 WebService 的坐标输入类型",
          url: "https://lbs.qq.com/webservice_v1/guide-convert.html",
          publisher: "腾讯位置服务",
          reviewedAt: "2026-08-13",
        },
        {
          label: "关于推进地理信息保密处理技术研发和服务工作的通知",
          url: "https://www.beijing.gov.cn/zhengce/zhengcefagui/qtwj/202204/t20220407_2668607.html",
          publisher: "中华人民共和国自然资源部",
          reviewedAt: "2026-08-13",
        },
        {
          label: "中华人民共和国测绘法",
          url: "https://www.mfa.gov.cn/web/wjb_673085/zzjg_673183/bjhysws_674671/bhflfg/ldbjchxgfl/202303/P020230313535012030290.pdf",
          publisher: "全国人大常委会法律文本",
          reviewedAt: "2026-08-13",
        },
        {
          label: "GB/T 39609-2020 地名地址地理编码规则",
          url: "https://std.samr.gov.cn/gb/search/gbDetailed?id=TFB%2FwAU5XAs%3D&mode=p",
          publisher: "全国标准信息公共服务平台",
          reviewedAt: "2026-08-13",
        },
      ],
    },
  ],
};

export default body;
