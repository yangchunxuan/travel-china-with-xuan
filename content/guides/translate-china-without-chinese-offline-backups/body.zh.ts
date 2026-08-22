import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "answer-first",
      "type": "lead",
      "text": "把翻译当作草稿，不要当作权威结论。拍菜单时要把菜名、价格和选项标记放在同一画面；App 页面要在报错消失前先截图；标识要同时拍全牌和它所指向的门、站台或柜台。先翻译，再对过敏、票务、付款、医疗或安全含义请工作人员或第二种方法确认。准备少量离线短语卡，网络中断时仍能继续沟通。"
    },
    {
      "id": "quick-answer",
      "type": "callout",
      "title": "先保留语境，再翻译，最后确认",
      "body": "相机适合可见文字，截图能保留短暂显示的界面，手动输入适合精确名称和数字，面对面时全屏展示一句短话最清楚。出发前下载支持的语言并实测，但要假设部分相机、语音或 App 功能仍可能需要网络，且会随设备变化。后果重大的内容必须由人确认。",
      "tone": "decision"
    },
    {
      "id": "matrix-heading",
      "type": "heading",
      "level": 2,
      "text": "按材料选择能保留证据的输入方式"
    },
    {
      "id": "decision-matrix",
      "type": "table",
      "caption": "不同材料会以不同方式失真",
      "columns": [
        "材料",
        "最佳首次采集",
        "必须包含",
        "如何确认"
      ],
      "rows": [
        [
          "纸质菜单或菜单牌",
          "正对、无反光照片",
          "菜名标题、价格、份量、选项和旁注",
          "指着准确项目，请工作人员复述数量和饮食限制。"
        ],
        [
          "二维码菜单或 App 页面",
          "原始截图",
          "页面标题、已选规格、购物车数量、费用和提交按钮",
          "付款前请工作人员或同行者核对最终订单。"
        ],
        [
          "车站、入口或警告标识",
          "一张环境全景加一张文字近照",
          "箭头、楼层、门号、时段条件和标识管辖的位置",
          "以当前官方标识为准，方向冲突时询问制服工作人员。"
        ],
        [
          "短对话",
          "全屏显示的一句单一请求",
          "要做的动作、准确名称或数字，以及是/否确认",
          "请对方指示、输入或重复决定，不要只凭含糊点头。"
        ]
      ]
    },
    {
      "id": "workflow-heading",
      "type": "heading",
      "level": 2,
      "text": "准备双层翻译工具包"
    },
    {
      "id": "workflow",
      "type": "list",
      "ordered": true,
      "items": [
        "出发前只安装自己会用的工具；如支持，下载简体中文和输出语言，并用一张印刷中文样本在飞行模式下测试。",
        "保存六张短语卡：酒店地址、‘请打字’、过敏或饮食限制、‘请指正确入口’、‘请联系场地方’和紧急联系人。每张只表达一个请求。",
        "中文名称和数字必须与翻译并排保留，不能让机器输出覆盖原文。",
        "拍文字时把手机放正、避开反光、让文字清晰占满画面，再补拍一张显示周边语境的全景。",
        "翻译界面前先保存原始截图；保留错误、订单状态、日期时间和非敏感编号，同时遮住密码、验证码和付款资料。",
        "检查结果是否漏掉否定词、过敏原、日期、单位、入口和退款条件，这些字段一旦丢失后果较大。",
        "用工作人员或第二条翻译路径确认动作，再保存现场真正奏效的中文表达。"
      ]
    },
    {
      "id": "confirmation-heading",
      "type": "heading",
      "level": 2,
      "text": "清楚每一层能做什么"
    },
    {
      "id": "confirmation-lanes",
      "type": "comparison",
      "title": "独立证据一致时，翻译可信度才会上升",
      "columns": [
        {
          "heading": "机器输出",
          "items": [
            "提供首次理解",
            "可能漏读排版、否定和本地简称",
            "不能证明法律、医疗或过敏安全"
          ]
        },
        {
          "heading": "原始语境",
          "items": [
            "保留箭头、价格、标题和选中状态",
            "让工作人员看到准确原文",
            "防止流畅却脱离语境的翻译"
          ]
        },
        {
          "heading": "人工确认",
          "items": [
            "把文字对应到现实动作",
            "可以指出入口、菜品或选项",
            "后果重大时仍应留下记录"
          ]
        }
      ]
    },
    {
      "id": "failure-heading",
      "type": "heading",
      "level": 2,
      "text": "翻译明显不对时"
    },
    {
      "id": "failure-matrix",
      "type": "table",
      "caption": "先改变输入，不要让同一工具反复猜",
      "columns": [
        "故障",
        "原因",
        "恢复"
      ],
      "rows": [
        [
          "相机把菜单顺序打乱",
          "分栏、竖排或反光破坏阅读顺序",
          "正对拍一个小区域，再逐条翻菜名和相邻选项。"
        ],
        [
          "截图翻出按钮，却丢了已选状态",
          "工具把界面当成普通文字",
          "对照未修改截图，请工作人员确认购物车或预订摘要。"
        ],
        [
          "语音翻出无关内容",
          "噪声、口音、人名或抢话干扰识别",
          "改用短句输入，请对方键入关键名词或数字。"
        ],
        [
          "离线时没有相机或对话功能",
          "语言包、设备或当前功能支持不同",
          "使用离线文字和已存短语卡，转向有人服务，不要反复尝试联网。"
        ]
      ]
    },
    {
      "id": "recovery-heading",
      "type": "heading",
      "level": 2,
      "text": "恢复后果重大的误解"
    },
    {
      "id": "recovery",
      "type": "list",
      "ordered": true,
      "items": [
        "在不可逆步骤前暂停交易、进餐、路线或表单。",
        "展示未修改的原始图片或页面，指出有疑问的准确词、行、按钮或项目。",
        "把请求缩短为一句话、一个数字或一个选择，避免成语、玩笑和多重条件。",
        "换第二个翻译器，或请工作人员输入中文答案；两个结果冲突时不能取平均。",
        "涉及过敏、医疗、安全、出入境、票务或付款后果时，升级给有责任的专业人员，并以控制性官方记录为准。",
        "保存已确认的中文短语和结果供后续使用，但不要记录他人的私人资料。"
      ]
    },
    {
      "id": "scope-boundary",
      "type": "callout",
      "title": "翻译不能保证什么",
      "body": "任何相机、截图、语音或离线翻译都不能保证准确、可用或解释安全。支持语言和设备功能会变化，离线结果也可能能力较弱。本页不能确认餐食绝对无过敏原、医疗指示、签证身份、合同、退款权或路线安全。错误有实际后果时，必须以中文原始记录和负责任的人工运营方为准。",
      "tone": "warning"
    },
    {
      "id": "next-heading",
      "type": "heading",
      "level": 2,
      "text": "依赖工具包前检查"
    },
    {
      "id": "next-check",
      "type": "list",
      "items": [
        "输入与输出语言已在飞行模式实测",
        "中文原文始终与翻译并排保存",
        "既有环境全景也有可读近照",
        "敏感截图分享前已遮挡",
        "六张单一请求短语卡已离线保存",
        "已确定第二种方法和有人服务路径",
        "关键含义需明确确认，不能只看点头"
      ]
    },
    {
      "id": "faq-heading",
      "type": "heading",
      "level": 2,
      "text": "常见翻译问题"
    },
    {
      "id": "faq-1-question",
      "type": "heading",
      "level": 3,
      "text": "应该一次翻完整张菜单吗？"
    },
    {
      "id": "faq-1-answer",
      "type": "paragraph",
      "text": "全景用于看排版，真正下单时再翻准确菜品行和附近选项。整页覆盖可能打乱分栏，把价格错配到别的菜。"
    },
    {
      "id": "faq-2-question",
      "type": "heading",
      "level": 3,
      "text": "下载语言后，相机功能都能离线用吗？"
    },
    {
      "id": "faq-2-answer",
      "type": "paragraph",
      "text": "不一定。工具、语言、设备和版本支持各不相同，出发前要在飞行模式逐项测试相机、截图、输入和对话。"
    },
    {
      "id": "faq-3-question",
      "type": "heading",
      "level": 3,
      "text": "翻译好的过敏卡能保证安全吗？"
    },
    {
      "id": "faq-3-answer",
      "type": "paragraph",
      "text": "它只能开启沟通，不能保证食材、制作过程或交叉接触。要让工作人员针对具体菜品确认，答案不清楚就不要继续。"
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "把翻译接到真实旅行任务",
      "items": [
        {
          "label": "诊断错误地图点",
          "href": "/zh/guides/china-map-coordinate-offset-explained/",
          "description": "把翻译后的地点文字与已核实地址绑定。"
        },
        {
          "label": "准备数据连接",
          "href": "/zh/guides/china-esim-vs-local-sim/",
          "description": "明确哪些翻译功能仍需要网络。"
        },
        {
          "label": "谨慎使用公共 Wi-Fi",
          "href": "/zh/guides/china-public-wifi-passport-login/",
          "description": "敏感截图只通过可信渠道传送。"
        },
        {
          "label": "完成第一次中式合餐",
          "href": "/zh/guides/first-shared-meal-in-china/",
          "description": "把菜单翻译接到点菜、节奏与分享规则。"
        },
        {
          "label": "核实官方票务渠道",
          "href": "/zh/guides/official-or-reseller-china-tickets/",
          "description": "不要让流畅翻译把非官方页面变成权威。"
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "一手翻译与入境服务来源",
      "items": [
        {
          "label": "在 iPhone 上翻译文字、语音和对话",
          "url": "https://support.apple.com/guide/iphone/translate-text-voice-and-conversations-iphd74cb450f/ios",
          "publisher": "Apple 支持",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "在 iPhone App 与照片中翻译文字",
          "url": "https://support.apple.com/en-gb/guide/iphone/iphab4dcff1d/ios",
          "publisher": "Apple 支持",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "下载语言以便离线使用",
          "url": "https://support.google.com/translate/answer/6142473?hl=en-GB-0",
          "publisher": "Google 翻译帮助",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "中国推动入境数字旅游与翻译服务",
          "url": "https://english.www.gov.cn/news/202602/05/content_WS69849d8ac6d00ca5f9a08eff.html",
          "publisher": "中国国务院",
          "reviewedAt": "2026-08-22"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
