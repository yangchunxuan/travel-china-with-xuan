import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "answer-first",
      "type": "lead",
      "text": "以旅行当天实际携带的护照为唯一身份底稿。航班和实名制铁路票必须与所用有效证件匹配；酒店和应用可能用不同字段显示，但这不表示可以自创昵称或换用另一证件。先从护照建立一条原始记录，再保存平台格式变化的证据。"
    },
    {
      "id": "decision-map",
      "type": "table",
      "caption": "同一身份，不同表单",
      "columns": [
        "情况",
        "选择",
        "行动"
      ],
      "rows": [
        [
          "机票",
          "姓名与有效证件必须匹配",
          "按航司护照姓名说明填写，出票后立即核对。"
        ],
        [
          "铁路 12306",
          "准确填写证件类型、姓名和号码",
          "乘车携带订票所用护照原件。"
        ],
        [
          "酒店",
          "使用护照身份，显示异常时通知酒店",
          "保留确认单并携护照入住。"
        ],
        [
          "应用字段太短或拆分方式不同",
          "按平台官方格式指引",
          "截图保存，未经客服确认不要自创缩写。"
        ]
      ]
    },
    {
      "id": "detail-heading",
      "type": "heading",
      "level": 2,
      "text": "建立护照身份底稿"
    },
    {
      "id": "detail-list",
      "type": "list",
      "items": [
        "从资料页抄录姓、名、护照号、国籍、出生日期和有效期。机读区可帮助判断标点与顺序，但具体字段仍以预订方说明为准。",
        "连字符、空格、撇号和多个名字出票后可能显示不同。外观变化不一定是错误，但只有服务商能确认是否接受。",
        "不要把旧护照号码与新护照姓名混用，也不要用居留证订一段后假定另一段可直接换成护照。",
        "中国境内系统可能将拉丁字母转为大写或去掉空格；保留确认页面，结果有歧义时联系官方客服。"
      ]
    },
    {
      "id": "steps-heading",
      "type": "heading",
      "level": 2,
      "text": "先更正，不要先取消"
    },
    {
      "id": "steps",
      "type": "list",
      "ordered": true,
      "items": [
        "用旅行日仍有效的护照录入身份。",
        "付款前逐字符比较姓名、证件类型和号码。",
        "出票后立即查看正式票证或订单，不只看曾填写的表单。",
        "有不一致时先联系航司、12306、代理或酒店官方渠道，询问更正、重开还是重新预订。",
        "携护照原件及任何已获接受的格式或证件更新书面确认。"
      ]
    },
    {
      "id": "failure-backup",
      "type": "callout",
      "title": "订票后更换护照",
      "body": "分别联系每个服务商，航司、铁路和酒店没有共享更新流程。依法保留新旧护照资料与换发证明，但不要假定同时携带旧护照就自动解决问题；由服务商说明更正或重开方式。",
      "tone": "warning"
    },
    {
      "id": "scope-boundary",
      "type": "callout",
      "title": "适用边界与实时规则",
      "body": "本文不能判断某个缩写或缺少字符是否一定被接受。航司、中国铁路、酒店和边检按各自系统进行实名核验。旅行前使用官方客服，不要依赖论坛对姓名格式的保证。",
      "tone": "neutral"
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "继续规划",
      "items": [
        {
          "label": "第一次坐中国高铁",
          "href": "/zh/guides/china-high-speed-train-first-time-guide/",
          "description": "在车站使用同一本护照。"
        },
        {
          "label": "护照丢失恢复",
          "href": "/zh/guides/lost-passport-in-china-exit-recovery/",
          "description": "补发证件后修复订单。"
        },
        {
          "label": "中国入境要求",
          "href": "/guides/china-entry-requirements/",
          "description": "让旅行证件与入境许可匹配。"
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "已复核的官方来源",
      "items": [
        {
          "label": "China guide for business expatriates (real-name rail travel)",
          "url": "https://english.www.gov.cn/2025special/bizexpatsinchina2025",
          "publisher": "State Council of China",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "12306 real-name ticket information",
          "url": "https://kyfw.12306.cn/mormhweb/zxdt/201401/t20140117_1318.html",
          "publisher": "China Railway 12306",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "12306 real-name ticket FAQ",
          "url": "https://kyfw.12306.cn/otn/gonggao/realNameTicket.html",
          "publisher": "China Railway 12306",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "CAAC air travel ID and ticket guidance",
          "url": "https://www.caac.gov.cn/big5/www.caac.gov.cn/INDEX/HLFW/HKLXCS/",
          "publisher": "Civil Aviation Administration of China",
          "reviewedAt": "2026-08-12"
        }
      ]
    }
  ]
};

export default body;
