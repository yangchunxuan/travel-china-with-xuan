import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "answer-first",
      "type": "lead",
      "text": "不要把“密封”“熟制”“真空包装”或“自用”当作自动许可。中国对动植物及其产品实施检疫管理。肉类、许多乳蛋产品、新鲜果蔬、种子、植物和土壤属于禁止或受控范围；例外和许可必须逐项核对。"
    },
    {
      "id": "decision-map",
      "type": "table",
      "caption": "打包筛查",
      "columns": [
        "情况",
        "选择",
        "行动"
      ],
      "rows": [
        [
          "肉类或肉制品",
          "通常不要携带",
          "官方清单覆盖生熟肉类及脏器。"
        ],
        [
          "奶、乳制品或蛋类",
          "核对准确类别",
          "多种产品被列入；婴幼儿或特殊用途例外很窄且有条件。"
        ],
        [
          "新鲜果蔬、种子、植物或土壤",
          "除非明确获准，否则不带",
          "礼物和少量也有植物检疫风险。"
        ],
        [
          "常温密封零食",
          "仍要查看配料",
          "密封袋也可能含肉、乳、蛋、种子等受控成分。"
        ]
      ]
    },
    {
      "id": "detail-heading",
      "type": "heading",
      "level": 2,
      "text": "看配料，不只看包装正面"
    },
    {
      "id": "detail-list",
      "type": "list",
      "items": [
        "肉干、香肠、肉松、汤料和夹心点心仍可能属于肉制品。",
        "奶酪、奶粉、发酵乳制品和含蛋食品并非一条统一规则，应按实时清单和明确例外判断。",
        "从贵宾室、酒店或上一国家拿的新鲜水果，到边境时仍是新鲜水果。",
        "种子、球茎、插枝、活植物、培养介质和土壤即使是纪念品也涉及检疫。",
        "宠物入境是独立的正式流程，不能从普通行李清单推断。"
      ]
    },
    {
      "id": "steps-heading",
      "type": "heading",
      "level": 2,
      "text": "出发前就决定是否放弃携带"
    },
    {
      "id": "steps",
      "type": "list",
      "ordered": true,
      "items": [
        "拍下不确定物品的配料和产地标签。",
        "按准确成分与产品形态查询官方禁止清单和海关指南。",
        "旅行前取得所需检疫证书或许可；到机场再解释不能替代事先批准。",
        "可携物品保留原始标签包装并放在便于取出的位置。",
        "对受控或不确定物品申报并遵从海关指示；如需放弃，使用正式处置流程。"
      ]
    },
    {
      "id": "failure-backup",
      "type": "callout",
      "title": "如果是礼物或有纪念意义",
      "body": "情感或价格不会改变检疫属性。向赠送者索取完整配料和准确产品名称，出发前联系海关；证明不足时，只能选择合法专业寄运或不携带。",
      "tone": "warning"
    },
    {
      "id": "scope-boundary",
      "type": "callout",
      "title": "适用边界与实时规则",
      "body": "疫情与原产地限制可能快速变化。本文是筛查方法，不是最终放行清单。旅行当周应核对海关实时清单、原产地公告和许可要求。",
      "tone": "neutral"
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "继续规划",
      "items": [
        {
          "label": "中国海关红绿通道",
          "href": "/zh/guides/china-customs-red-green-channels/",
          "description": "受控或不确定行李应申报。"
        },
        {
          "label": "中国入境要求",
          "href": "/guides/china-entry-requirements/",
          "description": "区分检疫与边检。"
        },
        {
          "label": "充电宝运输规则",
          "href": "/zh/guides/china-power-bank-rules-flights-trains/",
          "description": "完成其余随身行李检查。"
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "已复核的官方来源",
      "items": [
        {
          "label": "Customs FAQ: prohibited animals, plants and products",
          "url": "https://online.customs.gov.cn/ociswebserver/pages/jcjybcx/question.html",
          "publisher": "General Administration of Customs",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "List of animals, plants and products prohibited from being carried or mailed into China",
          "url": "https://www.moa.gov.cn/nybgb/2022/202202/202204/P020220401365957599038.pdf",
          "publisher": "Ministry of Agriculture and Rural Affairs / General Administration of Customs",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Customs Announcement No. 43 of 2025",
          "url": "https://app.www.gov.cn/govdata/gov/202504/05/526129/article.html",
          "publisher": "General Administration of Customs",
          "reviewedAt": "2026-08-12"
        }
      ]
    }
  ]
};

export default body;
