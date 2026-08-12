import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "answer-first",
      "type": "lead",
      "text": "携带应申报物品，或者拿不准时，应走红色通道；确认没有任何应申报物品才走绿色通道。中国海关 2025 年规定要求适用时填写纸质或电子进出境行李物品申报单；选择绿色通道本身就表示行李中没有应申报物品。"
    },
    {
      "id": "decision-map",
      "type": "table",
      "caption": "通道判断",
      "columns": [
        "情况",
        "选择",
        "行动"
      ],
      "rows": [
        [
          "限制或管制物品",
          "红色",
          "即使自用也应在查验前申报。"
        ],
        [
          "动植物及相关产品",
          "红色／检疫审查",
          "包装、熟制或真空并不等于允许。"
        ],
        [
          "货币、商业物品或数量超限",
          "红色",
          "限额与许可取决于物品和行程。"
        ],
        [
          "普通自用物品且无申报事项",
          "绿色",
          "如被询问，准备好票据与说明。"
        ]
      ]
    },
    {
      "id": "detail-heading",
      "type": "heading",
      "level": 2,
      "text": "到达通道标志前"
    },
    {
      "id": "detail-list",
      "type": "list",
      "items": [
        "行李涉及列明类别时填写申报单，包括禁止或限制物品、动植物及其产品、规定范围的货币或有价证券、商业性物品和其他应申报行李。",
        "药品尽量保留原包装，适用时携带处方或医生证明；管制药物和大数量应按具体药品核查。",
        "不要把物品分给同行人以掩盖数量或价值，绿色通道行李也可被检查。",
        "电子表格、现场标志与你的理解不一致时，在选择通道前询问海关人员。"
      ]
    },
    {
      "id": "steps-heading",
      "type": "heading",
      "level": 2,
      "text": "抵达前五分钟检查"
    },
    {
      "id": "steps",
      "type": "list",
      "ordered": true,
      "items": [
        "列出食品、药品、现金、高价值设备、礼物和代他人携带的物品。",
        "按口岸、方向和具体物品核对海关与检疫实时清单。",
        "离线保存许可证、处方、发票和产品标签。",
        "有任何应申报或不确定物品，填写申报并走红色通道。",
        "如实回答并保留征税、暂时进境、放弃或扣留物品的海关凭证。"
      ]
    },
    {
      "id": "failure-backup",
      "type": "callout",
      "title": "已走绿色通道后才想起",
      "body": "在离开监管区域前停下并主动告诉海关人员。主动说明比隐瞒或丢弃更安全。物品被暂扣时，索取书面凭证和官方后续步骤，不要向非官方中间人付款。",
      "tone": "warning"
    },
    {
      "id": "scope-boundary",
      "type": "callout",
      "title": "适用边界与实时规则",
      "body": "免税限量和限制清单会变化，也取决于具体物品。本文不提供统一的价值、酒类、烟草、药品或货币限额。旅行当周应查看海关最新申报表和准确物品规则。",
      "tone": "neutral"
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "继续规划",
      "items": [
        {
          "label": "食品、植物和动物产品入境",
          "href": "/zh/guides/food-plants-animal-products-into-china/",
          "description": "打包前完成检疫检查。"
        },
        {
          "label": "中国入境要求",
          "href": "/guides/china-entry-requirements/",
          "description": "区分边检与海关任务。"
        },
        {
          "label": "充电宝乘机乘车规则",
          "href": "/zh/guides/china-power-bank-rules-flights-trains/",
          "description": "过海关后仍需核对运输安全限制。"
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "已复核的官方来源",
      "items": [
        {
          "label": "Customs Announcement No. 43 of 2025",
          "url": "https://app.www.gov.cn/govdata/gov/202504/05/526129/article.html",
          "publisher": "General Administration of Customs / State Council",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Customs clearance guide",
          "url": "https://english.customs.gov.cn/statics/88707c1e-aa4e-40ca-a968-bdbdbb565e4f.html",
          "publisher": "General Administration of Customs",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Red and green baggage channels",
          "url": "https://english.customs.gov.cn/statics/3a12c746-51e1-4d94-8fc1-44a573fad090.html",
          "publisher": "General Administration of Customs",
          "reviewedAt": "2026-08-12"
        }
      ]
    }
  ]
};

export default body;
