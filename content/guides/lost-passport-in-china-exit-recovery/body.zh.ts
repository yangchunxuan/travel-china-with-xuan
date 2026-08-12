import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "answer-first",
      "type": "lead",
      "text": "护照丢失通常可以处理，但复印件不是旅行证件。官方核心顺序是：先取得公安机关出入境管理部门要求的证明，再向本国使领馆申请新护照或旅行证件，最后按要求补办签证、停留或离境文件。立即行动，并保留所有回执。"
    },
    {
      "id": "decision-map",
      "type": "table",
      "caption": "四段恢复链",
      "columns": [
        "情况",
        "选择",
        "行动"
      ],
      "rows": [
        [
          "1. 安全",
          "保护账户并安全查找",
          "记录丢失时间地点；如被盗及时报警。"
        ],
        [
          "2. 证明",
          "联系当地公安出入境管理部门",
          "申请护照报失证明或当地指定材料。"
        ],
        [
          "3. 补证",
          "联系本国使领馆",
          "按其流程申请应急护照或旅行证件。"
        ],
        [
          "4. 合法离境",
          "必要时返回出入境管理部门",
          "补办签证、停留或离境所需文件。"
        ]
      ]
    },
    {
      "id": "detail-heading",
      "type": "heading",
      "level": 2,
      "text": "第一小时做什么"
    },
    {
      "id": "detail-list",
      "type": "list",
      "items": [
        "如遇盗窃或人身危险，拨打 110。普通遗失可请酒店或可信本地联系人协助找到最近的公安机关和出入境管理窗口。",
        "保护与护照一起丢失的账户，但不要在公开网络发布完整护照扫描件。把资料页、签证、入境章、报案记录和订单凭证存入受控文件夹。",
        "只从使领馆官方网站取得联系方式，询问身份材料、照片、预约、费用及所需证明。",
        "通知航空公司、铁路和酒店证件号码将变化；若存在更正流程，不要先取消订单。"
      ]
    },
    {
      "id": "steps-heading",
      "type": "heading",
      "level": 2,
      "text": "按顺序重建证件"
    },
    {
      "id": "steps",
      "type": "list",
      "ordered": true,
      "items": [
        "取得当地公安出入境管理部门要求的护照报失证明。",
        "向本国使领馆申请新护照或应急旅行证件；资格和时效由本国规定。",
        "携新证件与报失证明询问当地出入境管理部门是否需补办签证、停留证件或离境文件。",
        "逐项核对航班、火车、酒店和保险中的姓名与新证件号码，通过官方渠道更正。",
        "携带原件和复印件提早到机场；最终由边检判断离境文件是否足够。"
      ]
    },
    {
      "id": "failure-backup",
      "type": "callout",
      "title": "离境日期很近时",
      "body": "不要以为使领馆签发应急旅行证件后，中国一侧流程就自动完成。立即联系当地出入境管理部门和航空公司，记录所有指示，在确认无法按时取得哪些文件后再调整可退改订单。逾期停留或证件问题必须由主管机关处理。",
      "tone": "warning"
    },
    {
      "id": "scope-boundary",
      "type": "callout",
      "title": "适用边界与实时规则",
      "body": "使领馆流程、地方预约和证件名称会有差异。国家移民管理局说明的是核心链条；本国使领馆负责本国旅行证件，当地出入境管理部门负责中国一侧签证或离境文件。本指南不承诺当日办结或必然获准出境。",
      "tone": "neutral"
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "继续规划",
      "items": [
        {
          "label": "中国入境要求",
          "href": "/guides/china-entry-requirements/",
          "description": "了解需要重建的各类文件。"
        },
        {
          "label": "国际航班前最后一晚",
          "href": "/zh/guides/china-last-night-before-international-flight/",
          "description": "重新核对证件与机场时间。"
        },
        {
          "label": "开口程机票规划",
          "href": "/zh/guides/china-open-jaw-flights-route-planning/",
          "description": "调整离境城市时保留路线逻辑。"
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "已复核的官方来源",
      "items": [
        {
          "label": "Lost or damaged foreign passport procedure",
          "url": "https://en.nia.gov.cn/n147428/n147498/n147780/n147970/c159250/content.html",
          "publisher": "National Immigration Administration",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Entry and stay rules for foreigners",
          "url": "https://en.nia.gov.cn/n147423/n147478/n147715/c158215/content.html",
          "publisher": "National Immigration Administration",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "China guide for business expatriates (emergency numbers)",
          "url": "https://english.www.gov.cn/2025special/bizexpatsinchina2025",
          "publisher": "State Council of China",
          "reviewedAt": "2026-08-12"
        }
      ]
    }
  ]
};

export default body;
