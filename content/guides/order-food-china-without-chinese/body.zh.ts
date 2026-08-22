import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "answer-first",
      "type": "lead",
      "text": "一次只完成一个决定：从餐厅当前菜单确认菜品，展示准确条目，确定数量，说明堂食或打包，确认屏幕总额，然后付款。从能用的最简单界面开始——人工柜台或纸质菜单——再考虑二维码。只有中文地址、联系渠道和交接时间都可靠时，才把外卖作为备选。"
    },
    {
      "id": "quick-answer",
      "type": "callout",
      "title": "简短答案",
      "body": "任何翻译旁都保留菜品原中文，付款前请工作人员指向最终订单。与其笼统说‘来个不辣的’，不如展示一张具体菜品照片。过敏或其他高后果限制不能只靠翻译卡：它只是开场问题，必须请负责的餐厅人员确认食材和做法；无法确认就不点。",
      "tone": "decision"
    },
    {
      "id": "matrix-heading",
      "type": "heading",
      "level": 2,
      "text": "选择摩擦最小的点餐界面"
    },
    {
      "id": "decision-matrix",
      "type": "table",
      "caption": "只有当前方式无法完成时，才沿阶梯切换。",
      "columns": [
        "点餐界面",
        "适合情况",
        "确认时刻",
        "切换信号"
      ],
      "rows": [
        [
          "人工柜台/展示柜",
          "看得见餐品且工作人员可指认",
          "指向具体餐品并用数字显示数量，读取收银总额",
          "餐品无货或柜台只引导扫码"
        ],
        [
          "纸质或墙面菜单",
          "可匹配名称、图片或价格",
          "拍下中文名，请工作人员在选中行做标记",
          "没有现价、标记售罄或份量不明"
        ],
        [
          "桌面二维码菜单",
          "手机、网络和支持的支付都能用",
          "提交前检查购物车、数量、桌号和总额",
          "网页打不开、桌号错误或无法支付"
        ],
        [
          "外卖",
          "已准备核实过的定位/地址和可联系号码",
          "检查商家、餐品、配送地址、备注和交接点",
          "地址无法核实或到达时间很关键"
        ]
      ]
    },
    {
      "id": "workflow-heading",
      "type": "heading",
      "level": 2,
      "text": "五部分点餐交接"
    },
    {
      "id": "workflow",
      "type": "list",
      "ordered": true,
      "items": [
        "先确认界面：在柜台点、看纸质菜单、扫桌码还是用外卖平台。不要假设二维码只用于付款。",
        "保存原文：拍摄或截取当前中文菜名、价格、规格和选项。翻译这一个准确条目，同时保留原文给工作人员看。",
        "一次选一道菜。指向纸面或屏幕条目，用数字显示数量。多人分享时先问份量，不要一次下单多道完全未知的菜。",
        "说明堂食、打包还是配送。堂食扫码要检查桌号；打包要问领取位置及使用哪个号码或姓名。",
        "饮食限制与口味偏好分开。用简短双语卡点名食材或做法风险，再请负责人员做是/否确认；交叉接触和配方可能仍不确定。",
        "回读购物车：菜品、规格、数量、加项、服务方式和显示总额。二维码提交前截图，以便追查重复或丢单。",
        "订单可见后再付款。保留收据/订单号，并确认状态已受理；页面转圈或银行通知本身不代表后厨收到订单。",
        "交接时匹配号码和餐品。打包可在附近开袋核对明显错误，同时不阻塞柜台和队伍。"
      ]
    },
    {
      "id": "confirmation-heading",
      "type": "heading",
      "level": 2,
      "text": "从三个层次确认意思"
    },
    {
      "id": "confirmation-lanes",
      "type": "comparison",
      "title": "菜品、交易与交接",
      "columns": [
        {
          "heading": "菜品",
          "body": "当前中文菜单条目、规格和选项符合意图。翻译帮助比较，餐厅才确认实际制作内容。"
        },
        {
          "heading": "交易",
          "body": "购物车、桌号/地址、数量、总额和已受理状态都可见。只有付款提醒不一定表示后厨收单。"
        },
        {
          "heading": "交接",
          "body": "订单号/姓名、服务方式和取餐/配送点一致。外卖还需要可用的联系路径。"
        }
      ]
    },
    {
      "id": "failure-heading",
      "type": "heading",
      "level": 2,
      "text": "常见点餐故障"
    },
    {
      "id": "failure-matrix",
      "type": "table",
      "caption": "保留准确菜品和交易证据，再切换界面。",
      "columns": [
        "故障",
        "立即检查",
        "可用备选"
      ],
      "rows": [
        [
          "二维码页面打不开",
          "问工作人员二维码是否有效、是否须连接店内网络",
          "使用纸单/菜单照片，或请柜台代为录单"
        ],
        [
          "翻译结果不通",
          "回到原中文菜名，只翻译更小的词或选项",
          "请工作人员指图片/展示餐品，改选简单明确的菜"
        ],
        [
          "账户已扣款但没有订单",
          "向工作人员展示商户、时间、金额和交易状态",
          "餐厅查清订单/支付记录前不要再次付款"
        ],
        [
          "桌号错误或数量重复",
          "打开购物车/订单历史，展示已提交记录",
          "制作前请工作人员更正，但取消不一定可行"
        ],
        [
          "无法确认饮食限制",
          "向负责人员再问一次明确食材/做法问题",
          "改选密封且有标签的食品或换餐厅，不推断安全"
        ],
        [
          "骑手找不到交接点",
          "发送核实过的中文地址、地标和当前位置",
          "移动到约定的安全显眼点，或经允许请酒店前台代收"
        ]
      ]
    },
    {
      "id": "recovery-heading",
      "type": "heading",
      "level": 2,
      "text": "不要在状态不明时再下第二单"
    },
    {
      "id": "recovery",
      "type": "list",
      "ordered": true,
      "items": [
        "冻结当前界面并拍下订单号、商户、金额、桌号/地址和状态。",
        "只找对应负责人：餐厅柜台查后厨/订单状态，外卖客服查派送状态，支付机构只查交易状态。",
        "展示准确中文菜品行，不重新翻译整段对话；标出缺失、重复或错误部分。",
        "得到明确取消、更正或受理状态后再提交替代。若工作人员无法解决，先记录首单状态，再换支付方式或餐品。",
        "外卖交接失败时尽量留在官方订单沟通渠道，不披露无关护照或支付凭证。",
        "保留收据和截图，直到扣款与实际收到餐品一致；重大未解决重复扣款走平台或支付争议。"
      ]
    },
    {
      "id": "scope-boundary",
      "type": "callout",
      "title": "语言工具不能确认什么",
      "body": "本指南不能保证菜单翻译、食材不存在、过敏安全、无交叉接触、现货、价格、支付成功、配送时间或退款。当前菜单、负责的餐厅人员、平台和支付方控制这些事实。健康关键限制无法明确确认时，不要下单。",
      "tone": "warning"
    },
    {
      "id": "next-heading",
      "type": "heading",
      "level": 2,
      "text": "随身点餐工具包"
    },
    {
      "id": "next-check",
      "type": "list",
      "items": [
        "截图可离线查看",
        "保留中文菜名",
        "用数字表达数量",
        "备好堂食/打包短句",
        "需要时有一张明确限制卡",
        "第二种支付方式",
        "核实过的配送地址和地标",
        "保留收据/订单号"
      ]
    },
    {
      "id": "faq-heading",
      "type": "heading",
      "level": 2,
      "text": "点餐常见问题"
    },
    {
      "id": "faq-1-question",
      "type": "heading",
      "level": 3,
      "text": "每个二维码菜单都需要中国手机号吗？"
    },
    {
      "id": "faq-1-answer",
      "type": "paragraph",
      "text": "没有适用于所有餐厅的规则。尝试当前流程；如要求无法使用的登录或支付，请工作人员提供柜台或纸单方式。"
    },
    {
      "id": "faq-2-question",
      "type": "heading",
      "level": 3,
      "text": "翻译能确认某道菜对过敏者安全吗？"
    },
    {
      "id": "faq-2-answer",
      "type": "paragraph",
      "text": "不能。保留原文，向负责人员询问具体食材和做法；无法确认就选择其他方案。"
    },
    {
      "id": "faq-3-question",
      "type": "heading",
      "level": 3,
      "text": "应不应该默认用外卖？"
    },
    {
      "id": "faq-3-answer",
      "type": "paragraph",
      "text": "只有地址、定位、联系和交接可靠时才用。网络或地址信心不足时，附近人工柜台往往更简单。"
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "相关餐饮、支付与地址主题",
      "items": [
        {
          "label": "不会中文如何翻译",
          "href": "/zh/guides/translate-china-without-chinese-offline-backups/",
          "description": "准备菜单所需的截图和离线文字方法。"
        },
        {
          "label": "境外游客在中国如何付款",
          "href": "/zh/guides/how-to-pay-in-china-as-a-tourist/",
          "description": "排队点餐前设置并核实支付。"
        },
        {
          "label": "地址核实与导航备份",
          "href": "/zh/guides/china-navigation-verified-address-backup/",
          "description": "为外卖准备中文地址和地标。"
        },
        {
          "label": "第一次在中国合餐",
          "href": "/zh/guides/first-shared-meal-in-china/",
          "description": "了解份量、合餐与桌面流程。"
        },
        {
          "label": "中国地方美食路线",
          "href": "/zh/guides/china-regional-food-route/",
          "description": "把地方美食放进整体行程。"
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "官方来源",
      "items": [
        {
          "label": "上海外卖应用指南",
          "url": "https://english.shanghai.gov.cn/en-UsefulApps/20240109/89844b5729d64b199463a156bc8ef43d.html",
          "publisher": "上海市人民政府",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "菜单翻译服务指南",
          "url": "https://english.shanghai.gov.cn/en-CIIE2025Service-Onsite/20251016/a8cde7a821ae4df5a957b6014f7c3814.html",
          "publisher": "上海市人民政府",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "境外来华人员支付指南",
          "url": "https://english.www.gov.cn/news/202404/11/content_WS6617c858c6d0868f4e8e5f4d.html",
          "publisher": "中国国务院",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "文明用餐指南",
          "url": "https://zwgk.mct.gov.cn/zfxxgkml/qt/202210/t20221017_936555.html",
          "publisher": "文化和旅游部",
          "reviewedAt": "2026-08-22"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
