import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "lead",
      "type": "lead",
      "text": "先停在房门口。使用床和卫生间前，保存确认单，并连续拍下分房现状。把重大不符——床型、吸烟属性、窗户、无障碍要素、入住人数或不安全/不可用状态——与偏好区别开。向值班负责人提出一个可执行修复和书面短时限；必要条件无法安全恢复时才搬离。"
    },
    {
      "id": "short-answer",
      "type": "callout",
      "title": "先给结论",
      "tone": "decision",
      "body": "先核验，因为房型名称未必等于已订属性。若差异重大，出示确认单，要求原订房或保留全部必要条件的一个具体等价房；搬行李前先看替代房。若有安全问题、没有可用房，或到你写明的截止时刻仍无负责答复，就取得合理的附近替代房，并保存原订单与新收据。换房、退款或报销都不会自动发生。"
    },
    {
      "id": "canonical-scope",
      "type": "paragraph",
      "text": "这是现场恢复流程，不是赔偿计算或法律结论。本文不保证升级、免房费、现金退款、拒付成功或12315结果。楼层、装饰或宽泛“景观”偏好，不会自动等同于确认过的床数、无烟房、无障碍条件或其他必要条款；必须对照真实书面记录。"
    },
    {
      "id": "triage-heading",
      "type": "heading",
      "level": 2,
      "text": "按风险与重大程度选择下一动作"
    },
    {
      "id": "triage-matrix",
      "type": "table",
      "caption": "用证据提出一个要求，再设截止时间",
      "columns": [
        "发现差异",
        "先核验",
        "换房",
        "搬离"
      ],
      "rows": [
        [
          "房型标签含糊",
          "请人员逐项对应已订属性",
          "只有确认属性缺失才换",
          "先给物业合理说明机会"
        ],
        [
          "床数或入住配置错误",
          "展示确认单与房号",
          "要求原订或真正等价配置",
          "全员无法合法安全睡下就搬"
        ],
        [
          "无烟、窗户或必要无障碍条件缺失",
          "记录房间与准确确认条款",
          "先看一个符合的替代房",
          "必要条件无法恢复就搬"
        ],
        [
          "可快速处理的清洁问题",
          "使用前记录",
          "清洁无法恢复则换房",
          "严重、反复或不安全则搬"
        ],
        [
          "景观、楼层或装饰不同",
          "看它是保证还是示意图片",
          "可以询问，但不把偏好说成确认条款",
          "通常须同时有另一必要条件失效"
        ],
        [
          "立即安全风险",
          "不要为完整证据留在原处",
          "只接受可证明安全的替代",
          "去安全有人物业；紧急危险联系急救部门"
        ]
      ]
    },
    {
      "id": "workflow-1-heading",
      "type": "heading",
      "level": 2,
      "text": "固定“已订”和“实配”的对照"
    },
    {
      "id": "workflow-1-context",
      "type": "paragraph",
      "text": "把比较缩窄到负责人可以回答的程度。不要拍到无关客人，也不要暴露护照与付款资料。"
    },
    {
      "id": "workflow-1-steps",
      "type": "list",
      "ordered": true,
      "items": [
        "保存完整确认单、房型描述、所选附加项、人数、日期、总额与卖方/供应方名称，带当前时间。",
        "在门口从房号连续拍到床、窗、卫生间与缺失要素；只在必要处补拍特写。",
        "写一行：“预订：__；实配：__；这是必要条件，因为：__。”不要推测动机或先下欺诈结论。",
        "安全时保持行李未拆，回前台要求值班负责人姓名或岗位，并建立平台内或书面工单。"
      ]
    },
    {
      "id": "workflow-2-heading",
      "type": "heading",
      "level": 2,
      "text": "要求一个可检查的修复"
    },
    {
      "id": "workflow-2-context",
      "type": "paragraph",
      "text": "先把住宿恢复，再谈笼统“赔偿”；准确要求更容易执行，也更方便后续判断。"
    },
    {
      "id": "workflow-2-steps",
      "type": "list",
      "ordered": true,
      "items": [
        "先要求确认房；若无房，用床数与每个必要属性定义等价，不用更高级营销名称定义。",
        "按时刻、同行需要与安全替代选择设一个现实短时限，写清当地日期时间。",
        "原问题未结案前先看替代房，再查气味、窗户、卫生间、无障碍动线、门锁与缺失要素。",
        "接受时取得新房号/房型和价格处理的文字记录；保留原证据，不公开发布隐私。"
      ]
    },
    {
      "id": "workflow-3-heading",
      "type": "heading",
      "level": 2,
      "text": "搬离但不断掉证据链"
    },
    {
      "id": "workflow-3-context",
      "type": "paragraph",
      "text": "先安顿人，再追款。除非继续停留有安全风险，否则不要在物业或平台记清操作前自行取消订单或丢下房卡。"
    },
    {
      "id": "workflow-3-steps",
      "type": "list",
      "ordered": true,
      "items": [
        "发最后一条事实消息：差异、所求修复、截止时间、已收答复，以及无可用房时将取得合理替代住宿。",
        "从原订单建立平台工单并记编号；问清由物业取消、你取消，还是保留原订单状态。",
        "选择附近、能补回缺失必要条件且没有不必要豪华升级的房间，保存条款与明细收据。",
        "全员安全后再建立完整争议证据包，按事实使用卖方、平台、付款或监管渠道。"
      ]
    },
    {
      "id": "failure-heading",
      "type": "heading",
      "level": 2,
      "text": "第一次修复又失败时"
    },
    {
      "id": "failure-recovery",
      "type": "table",
      "caption": "保护睡眠与安全，同时保持记录一致",
      "columns": [
        "失败",
        "马上处理",
        "边界"
      ],
      "rows": [
        [
          "前台说两个房型“一样”",
          "比较具体确认属性，不争房型名称",
          "不修复就请其书面说明"
        ],
        [
          "替代房又有新问题",
          "使用前拍下，再回值班负责人一次",
          "不要无限循环看房，到截止时间就切换"
        ],
        [
          "酒店与平台互相推",
          "把双方放进同一时间线并记录工单号",
          "截止就先安顿，责任后判"
        ],
        [
          "只剩昂贵替代房",
          "记录合理搜索范围与便宜选项为何不可用",
          "控制成本；报销仍不保证"
        ],
        [
          "人身安全恶化",
          "停止取证，去公共、有人、安全地点",
          "立即危险联系当地紧急服务，不等消费渠道"
        ]
      ]
    },
    {
      "id": "promise-boundary",
      "type": "callout",
      "title": "证据改善决策，不保证结果",
      "tone": "warning",
      "body": "结果取决于确认文字、实际分房、物业答复、平台条款、付款路径与适用流程。本文不能保证房态、升级、退款、报销、监管受理或特定法律结果。不要为了完美证据牺牲即时安全、隐私或必要睡眠。"
    },
    {
      "id": "next-step",
      "type": "callout",
      "title": "下一步：发送四行换房要求",
      "tone": "decision",
      "body": "发送：“订单__确认__。房间__实际是__。缺失的必要条件是__。请在当地时间__前展示符合房间；若没有，请书面确认，以便我取得合理替代住宿。”保存答复；截止时检查替代房或搬离。"
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "继续酒店恢复流程",
      "items": [
        {
          "label": "建立完整预订争议证据包",
          "href": "/zh/guides/china-booking-dispute-evidence-pack/",
          "description": "先稳定住宿，再整理订单、沟通与付款链。"
        },
        {
          "label": "返回中国住宿决策",
          "href": "/zh/stay/",
          "description": "回到不含酒店榜单的住宿决策入口。"
        },
        {
          "label": "核验无障碍客房",
          "href": "/zh/guides/china-accessible-hotel-room-verification/",
          "description": "核对下客点、房门与卫生间的连续动线。"
        },
        {
          "label": "执行酒店疏散安全检查",
          "href": "/zh/guides/china-hotel-emergency-exit-fire-safety-check/",
          "description": "错房争议不暂停消防判断：检查实际楼层，疏散无法使用就搬离。"
        },
        {
          "label": "核验外宾住宿登记",
          "href": "/zh/guides/foreigners-china-hotel/",
          "description": "房间条件争议与护照登记、拒绝入住问题要分开处理。"
        },
        {
          "label": "重新判断下一家酒店类型",
          "href": "/zh/guides/international-chain-or-local-hotel-china/",
          "description": "按运营匹配与核验质量选择，不假设品牌能避免所有错房。"
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "官方消费者法律、投诉与图片来源",
      "items": [
        {
          "label": "中华人民共和国消费者权益保护法",
          "url": "https://www.samr.gov.cn/zfjcj/tzgg/art/2023/art_615af9ed6bcd4974bf853dd2e02bc663.html",
          "publisher": "国家市场监督管理总局",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "消费者权益保护法实施条例",
          "url": "https://app.www.gov.cn/govdata/gov/202403/19/513111/article.html",
          "publisher": "国务院·中国政府网",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "市场监督管理投诉举报处理办法",
          "url": "https://www.samr.gov.cn/zw/zfxxgk/fdzdgknr/fgs/art/2026/art_e4d03a20c0fd49769e408c7bf3791ff5.html",
          "publisher": "国家市场监督管理总局",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "首图：Edo-biscuit拍摄上海酒店客房，CC BY-SA 4.0",
          "url": "https://commons.wikimedia.org/wiki/File:Room_of_Toy_Story_Hotel_Shanghai.jpg",
          "publisher": "Wikimedia Commons",
          "reviewedAt": "2026-08-22"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
