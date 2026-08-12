import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "answer-first",
      "type": "lead",
      "text": "按能保留最多选择的顺序处理：定位并锁定设备，保护手机号与主账号，保护付款方式，再重建旅行访问。远程抹除能保护数据，却可能终止追踪或增加找回难度，不应自动成为第一步。"
    },
    {
      "id": "decision-map",
      "type": "table",
      "caption": "按风险选择首个动作",
      "columns": [
        "情况",
        "选择",
        "行动"
      ],
      "rows": [
        [
          "手机可能在附近",
          "用可信设备播放声音或查看位置",
          "不要与疑似盗窃者对峙。"
        ],
        [
          "未锁屏或位置在移动",
          "立即标记丢失／保护设备",
          "留下安全回拨方式，不暴露房号或护照资料。"
        ],
        [
          "被盗或有人身危险",
          "拨打 110 并报案",
          "提供设备标识与证据，不自行追赶。"
        ],
        [
          "找回希望很小",
          "停用 SIM、保护账号、评估抹除",
          "先理解抹除可能停止追踪。"
        ]
      ]
    },
    {
      "id": "detail-heading",
      "type": "heading",
      "level": 2,
      "text": "先保护恢复钥匙"
    },
    {
      "id": "detail-list",
      "type": "list",
      "items": [
        "只从可信设备和官方域名使用 Apple“查找”或 Google Find Hub。声称“已找到手机”的消息可能是套取密码的钓鱼。",
        "如可能被入侵，应更改主账号密码，但遵从平台指引，让丢失设备仍与账号及激活保护关联。",
        "联系运营商暂停 SIM 或 eSIM；尽量保留号码，因为银行、钱包和订单可能依赖它，优先询问补卡而非永久销号。",
        "通过官方渠道联系发卡行和支付应用，按风险冻结或监控卡片并核查近期交易。",
        "从邮件、打印件或同行人设备整理航班、火车、酒店和保险关键信息。"
      ]
    },
    {
      "id": "steps-heading",
      "type": "heading",
      "level": 2,
      "text": "重建最低可用旅行手机"
    },
    {
      "id": "steps",
      "type": "list",
      "ordered": true,
      "items": [
        "在可信备用设备上只恢复交通、住宿和通信所需账号。",
        "使用已保存的备用验证码或硬件密钥，绝不让陌生人代收安全码。",
        "可行时向运营商补发原号码，再测试短信和账号恢复。",
        "通知酒店和承运人安全联系电话已经变化。",
        "把报案记录、序列号／IMEI、购买凭证和保险说明放在一起。"
      ]
    },
    {
      "id": "failure-backup",
      "type": "callout",
      "title": "双重验证只在丢失手机上",
      "body": "使用服务商官方账号恢复、备用码、可信设备或硬件密钥。除非客服指导，不要另建一个身份而切断原购买和订单。可请可信同行人或酒店提供网络，但不要让其接管账号。",
      "tone": "warning"
    },
    {
      "id": "scope-boundary",
      "type": "callout",
      "title": "适用边界与实时规则",
      "body": "远程定位和抹除取决于电量、联网、预先设置与平台状态，Apple 和 Google 都不能保证始终有实时位置。警方处理盗窃，平台与运营商控制账号和线路。本文不能追踪设备或撤销抹除。",
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
          "description": "选择替代联网方式。"
        },
        {
          "label": "在中国付款",
          "href": "/zh/guides/how-to-pay-in-china-as-a-tourist/",
          "description": "用备选恢复支付。"
        },
        {
          "label": "中国预订中的护照姓名",
          "href": "/zh/guides/passport-name-across-china-bookings/",
          "description": "准确重建交通订单。"
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "已复核的官方来源",
      "items": [
        {
          "label": "Find, secure or erase a lost Android device",
          "url": "https://support.google.com/android/answer/6160491?hl=en",
          "publisher": "Google Support",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Prepare Android for a lost device",
          "url": "https://support.google.com/android/answer/3265955?hl=en-en",
          "publisher": "Google Support",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "If your iPhone or iPad is lost or stolen",
          "url": "https://support.apple.com/en-us/101593",
          "publisher": "Apple Support",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Stolen device protection and account safety",
          "url": "https://support.apple.com/en-la/120837",
          "publisher": "Apple Support",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "China emergency numbers",
          "url": "https://english.www.gov.cn/2025special/bizexpatsinchina2025",
          "publisher": "State Council of China",
          "reviewedAt": "2026-08-12"
        }
      ]
    }
  ]
};

export default body;
