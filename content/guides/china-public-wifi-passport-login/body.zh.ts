import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "answer-first",
      "type": "lead",
      "text": "中国公共 Wi-Fi 没有全国统一的登录方式。部分大型机场已公开护照终端或扫描登录，其他网络可能用短信、房号或工作人员发码。把 Wi-Fi 当作场所提供的服务，而不是唯一上网手段，并按现场官方说明操作。"
    },
    {
      "id": "decision-map",
      "type": "table",
      "caption": "按场所选择登录方式",
      "columns": [
        "情况",
        "选择",
        "行动"
      ],
      "rows": [
        [
          "有护照终端或扫描器的机场",
          "使用官方机器或门户",
          "护照不离手，并从机场标志确认网络名。"
        ],
        [
          "酒店",
          "向前台确认官方 SSID 和登录",
          "可能需要房号、姓氏或密码。"
        ],
        [
          "要求短信的场所",
          "使用门户接受的号码",
          "不保证支持外国号码。"
        ],
        [
          "无法登录",
          "切换 eSIM、本地 SIM、漫游或随身 Wi-Fi",
          "不要在未经确认的仿冒门户输入护照资料。"
        ]
      ]
    },
    {
      "id": "detail-heading",
      "type": "heading",
      "level": 2,
      "text": "护照登录是具体服务，不是全国通用"
    },
    {
      "id": "detail-list",
      "type": "list",
      "items": [
        "北京首都、大兴机场指南说明了护照登录，上海浦东机场也发布了自己的护照上网流程；这些实例不能推断所有机场、车站或咖啡馆相同。",
        "机场终端可能扫描旅行证件后显示或打印凭证。遮挡护照并收好打印纸，不要遗留副本。",
        "从官方标识或工作人员确认 SSID，看似合理的网络名也可能是假热点。",
        "把公共 Wi-Fi 视为不可信网络：使用 HTTPS，避免敏感账号修改，关闭文件共享，用后忘记网络。"
      ]
    },
    {
      "id": "steps-heading",
      "type": "heading",
      "level": 2,
      "text": "安全连接顺序"
    },
    {
      "id": "steps",
      "type": "list",
      "ordered": true,
      "items": [
        "关闭自动加入，从官方标志或工作人员确认准确网络名。",
        "打开场所官方认证门户；如有终端，先完成终端流程，不要反复尝试短信。",
        "阅读所需身份数据；域名、证书或页面异常时停止。",
        "仅处理必要的低风险任务，银行、密码恢复和证件上传改用自己的数据。",
        "使用后忘记网络，并删除并非主动安装的描述文件。"
      ]
    },
    {
      "id": "failure-backup",
      "type": "callout",
      "title": "门户循环或拒绝护照",
      "body": "不要向未确认页面反复提交不同证件格式。询问机场或酒店服务台是否有外国护照终端、人工密码或服务窗口；没有就使用独立数据。联系官方客服时可截图错误，但遮住护照号码。",
      "tone": "warning"
    },
    {
      "id": "scope-boundary",
      "type": "callout",
      "title": "适用边界与实时规则",
      "body": "护照 Wi-Fi 的可用性与步骤因场所而异，也会变化。所引机场官方页面只支持截至 2026 年 8 月 12 日的具体服务，不能保证覆盖、速度、任何服务可访问或所有证件都被接受。",
      "tone": "neutral"
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "继续规划",
      "items": [
        {
          "label": "中国 eSIM 或本地 SIM",
          "href": "/zh/guides/china-esim-vs-local-sim/",
          "description": "准备独立数据备选。"
        },
        {
          "label": "在中国付款",
          "href": "/zh/guides/how-to-pay-in-china-as-a-tourist/",
          "description": "不要让公共 Wi-Fi 成为付款前提。"
        },
        {
          "label": "第一次坐中国高铁",
          "href": "/zh/guides/china-high-speed-train-first-time-guide/",
          "description": "进站前下载车票和说明。"
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "已复核的官方来源",
      "items": [
        {
          "label": "Beijing airports connectivity guide",
          "url": "https://english.beijing.gov.cn/latest/specials/essentialtipsfornewarrivals/getconnected/202408/t20240830_3785643.html",
          "publisher": "Beijing Municipal Government",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Beijing Capital Airport Wi-Fi",
          "url": "https://english.beijing.gov.cn/specials/beijingservice/pek/wifi/",
          "publisher": "Beijing Municipal Government",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Daxing Airport passport Wi-Fi service",
          "url": "https://english.beijing.gov.cn/latest/news/202512/t20251205_4322494.html",
          "publisher": "Beijing Municipal Government",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Pudong Airport passport Wi-Fi update",
          "url": "https://english.shanghai.gov.cn/en-Latest-WhatsNew/20260424/88cde5e96ef242daa534102069450a03.html",
          "publisher": "Shanghai Municipal Government",
          "reviewedAt": "2026-08-12"
        }
      ]
    }
  ]
};

export default body;
