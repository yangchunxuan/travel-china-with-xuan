import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "answer-first",
      "type": "lead",
      "text": "先看手机必须完成什么任务：旅行 eSIM 往往适合只要流量的人；中国大陆本地 SIM 可提供本地手机号码；双卡则能保留原号码并增加一条线路。设备、运营商办理和网络表现都取决于具体产品，付款前应核对实时说明。"
    },
    {
      "id": "decision-map",
      "type": "table",
      "caption": "从四种需求出发",
      "columns": [
        "情况",
        "选择",
        "行动"
      ],
      "rows": [
        [
          "只要流量",
          "旅行 eSIM 或原运营商漫游",
          "出发前购买并安装，离线保存二维码。"
        ],
        [
          "需要中国大陆号码",
          "到运营商营业厅办理本地 SIM",
          "携带护照原件并完成实名登记。"
        ],
        [
          "流量和本地号码都要",
          "双卡：原号码加数据 eSIM 或本地 SIM",
          "核对准确机型、销售地区版本和同时启用线路数量。"
        ],
        [
          "手机不兼容或有网络锁",
          "无锁备用手机、随身 Wi-Fi 或漫游",
          "确认解锁与频段支持后再购买。"
        ]
      ]
    },
    {
      "id": "detail-heading",
      "type": "heading",
      "level": 2,
      "text": "每种方案真正提供什么"
    },
    {
      "id": "detail-list",
      "type": "list",
      "items": [
        "旅行 eSIM 常见的是纯流量产品，未必提供 +86 大陆号码、普通通话或短信。不要只凭“eSIM”三个字推断功能。",
        "大陆运营商 SIM 通常提供本地号码并需要实名登记。北京市政府指南建议外国旅客携护照原件到中国移动、中国联通或中国电信营业厅办理。",
        "本地号码在场馆、配送或账号需要大陆短信时可能有用，但并非所有游客任务都必须使用。官方支付指南说明主要移动支付应用可以用外国或中国手机号码注册。",
        "标注双卡不等于任意两条线路都能同时工作。应按准确型号和地区版本查 Apple、Google 或 Samsung 的说明，并确认手机没有运营商锁。"
      ]
    },
    {
      "id": "steps-heading",
      "type": "heading",
      "level": 2,
      "text": "避免把所有希望放在一条线路上"
    },
    {
      "id": "steps",
      "type": "list",
      "ordered": true,
      "items": [
        "出发前按型号编号核对 eSIM、实体卡、双卡同时启用能力和网络锁状态。",
        "选择旅行 eSIM 时，在稳定 Wi-Fi 下安装；是否提前启用以供应商说明为准。把二维码、订单号和客服方式离线保存。",
        "选择本地 SIM 时，到运营商正规营业厅并携护照原件；请工作人员写下号码、套餐到期日、充值和注销方式。",
        "如果原号码用于接收银行或账号验证码，尽量保留它；按原运营商规则关闭高额数据漫游但保留必要短信。",
        "分别测试数据、通话和短信。网页能打开，不代表一定有语音、+86 号码或能收到所有验证码。"
      ]
    },
    {
      "id": "failure-backup",
      "type": "callout",
      "title": "首选方案失败时",
      "body": "找不到 eSIM 菜单：重新核对准确机型版本与网络锁，然后改用实体本地 SIM、漫游、随身 Wi-Fi 或兼容备用机。本地 SIM 激活失败：请营业厅核查护照录入，不要让非官方经销商随意变通。流量可用但某个应用不可用：先当作应用或路由问题排查，不能据此断言所有 eSIM 或本地 SIM 都一样。",
      "tone": "warning"
    },
    {
      "id": "scope-boundary",
      "type": "callout",
      "title": "适用边界与实时规则",
      "body": "截至 2026 年 8 月 12 日，大陆运营商 eSIM 仍取决于设备和运营商。Apple 当前只为特定大陆版 iPhone 机型说明大陆运营商 eSIM，并称境外购买的 iPhone 不能安装大陆运营商配置；这不等于对旅行 eSIM 或所有 Android 手机的统一结论。请始终查看准确设备与产品的官方页面。",
      "tone": "neutral"
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "继续规划",
      "items": [
        {
          "label": "准备在华支付",
          "href": "/zh/guides/how-to-pay-in-china-as-a-tourist/",
          "description": "手机号码注册与支付方案是两个独立决定。"
        },
        {
          "label": "核对入境要求",
          "href": "/guides/china-entry-requirements/",
          "description": "准备好护照与抵达材料。"
        },
        {
          "label": "第一次坐中国高铁",
          "href": "/zh/guides/china-high-speed-train-first-time-guide/",
          "description": "提前确认进站前必须可用的工具。"
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "已复核的官方来源",
      "items": [
        {
          "label": "MIIT real-name registration rules (2026 republication)",
          "url": "https://sdca.miit.gov.cn/zwgk/fgbz/art/2026/art_9b270ddb59cc4643b0a9c6811c4e750d.html",
          "publisher": "Ministry of Industry and Information Technology",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Purchasing SIM cards in Beijing",
          "url": "https://english.beijing.gov.cn/quickguideservices/purchasingsimcards/",
          "publisher": "Beijing Municipal Government",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Using eSIM while traveling in China mainland",
          "url": "https://support.apple.com/en-us/118227",
          "publisher": "Apple Support",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "China mainland carrier eSIM on iPhone",
          "url": "https://support.apple.com/en-mide/123879",
          "publisher": "Apple Support",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Foreign and Chinese phone numbers for mobile payment registration",
          "url": "https://nsd.mofcom.gov.cn/tzyts/art/2024/art_a08888d0b9da42f083b00223edaf1de7.html",
          "publisher": "Ministry of Commerce",
          "reviewedAt": "2026-08-12"
        }
      ]
    }
  ]
};

export default body;
