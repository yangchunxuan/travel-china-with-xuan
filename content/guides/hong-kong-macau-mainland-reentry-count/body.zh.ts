import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "answer-first",
      "type": "lead",
      "text": "在中国大陆出入境管理上，香港和澳门是不同的出入境管辖区。从大陆前往香港或澳门，就是离开大陆；从港澳返回大陆，是一次新的大陆入境。能否返回取决于护照、签证剩余次数、免签政策和准确路线，与支线停留多久无关。"
    },
    {
      "id": "decision-map",
      "type": "table",
      "caption": "计算过关次数，不是酒店晚数",
      "columns": [
        "情况",
        "选择",
        "行动"
      ],
      "rows": [
        [
          "大陆 → 香港",
          "一次大陆离境",
          "当前大陆停留在边检处结束。"
        ],
        [
          "香港 → 大陆",
          "一次新的大陆入境",
          "必须具备该次入境的有效依据。"
        ],
        [
          "大陆 → 澳门 → 大陆",
          "离境加一次新入境",
          "即使当天往返也经过两次边检。"
        ],
        [
          "香港 → 澳门",
          "不构成大陆入境",
          "分别适用香港与澳门的入境规则。"
        ]
      ]
    },
    {
      "id": "detail-heading",
      "type": "heading",
      "level": 2,
      "text": "买票前先画路线"
    },
    {
      "id": "detail-list",
      "type": "list",
      "items": [
        "按管辖区写顺序，例如“上海 → 香港 → 深圳”包含两段不同的大陆停留。",
        "单次大陆签证通常在首次进入大陆时使用。随后去港澳，即使签证有效期尚未到，也不会自动恢复为可再次使用。",
        "两次或多次签证返回时仍须在有效期内并有未使用次数；每次停留期限与签证有效期是不同字段。",
        "免签和过境免签有自己的国籍、口岸、联程客票与区域条件，不能在未核对实时政策时当作备用入境次数。"
      ]
    },
    {
      "id": "steps-heading",
      "type": "heading",
      "level": 2,
      "text": "更稳妥的订票测试"
    },
    {
      "id": "steps",
      "type": "list",
      "ordered": true,
      "items": [
        "在一条线上标出每次大陆入境和离境。",
        "为每次抵达大陆写明法律依据：未使用的签证次数、适用的免签，或符合条件的过境政策。",
        "分别到香港和澳门入境事务部门官网核对其准入。",
        "确认承运人和口岸接受你的证件与路线；船、铁路和陆路口岸的值机步骤可能不同。",
        "准备联程票和住宿证明，但理解这些只是支持材料，不保证获准入境。"
      ]
    },
    {
      "id": "failure-backup",
      "type": "callout",
      "title": "行程中才发现次数不足",
      "body": "不要抱着“短途离境会重置”的想法去碰运气。联系国家移民管理局服务渠道、最近的大陆出入境管理部门和承运人，在仍处于合法停留期间调整路线；如需个案意见，应联系具备资质的移民专业人士或本国使领馆。",
      "tone": "warning"
    },
    {
      "id": "scope-boundary",
      "type": "callout",
      "title": "适用边界与实时规则",
      "body": "本文只解释边境次数，不判断个人资格。国籍、普通签证、单方面免签和过境免签政策会变化。应在旅行当周按准确护照、日期、口岸和后续行程重新查询官方规则。",
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
          "description": "为每次大陆抵达核对入境依据。"
        },
        {
          "label": "深圳—香港交通",
          "href": "/zh/guides/shenzhen-hong-kong-transport-route/",
          "description": "资格确认后再选择口岸。"
        },
        {
          "label": "香港—澳门交通",
          "href": "/zh/guides/hong-kong-macau-transport-route/",
          "description": "单独规划非大陆段。"
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "已复核的官方来源",
      "items": [
        {
          "label": "Exit and Entry Administration Law (bilingual PDF)",
          "url": "https://fgw.sh.gov.cn/cmsres/59/59f5d2526744beaaa10ec0316a16586/8ac6aae3143b2aea1d9a69bdd52edd3e.pdf",
          "publisher": "Shanghai Municipal Government / National law",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Chinese visa FAQ explaining Hong Kong and Macao entries",
          "url": "https://sk.china-embassy.gov.cn/slo/consularaffairs/VISA/202005/P020210712030405067319.pdf",
          "publisher": "Embassy of China in Slovakia",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Border inspection for travel between mainland and Hong Kong/Macao",
          "url": "https://en.nia.gov.cn/n147413/c177654/content.html",
          "publisher": "National Immigration Administration",
          "reviewedAt": "2026-08-12"
        }
      ]
    }
  ]
};

export default body;
