import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "lead",
      "type": "lead",
      "text": "通过原订单或核验过的官方渠道联系准确物业。提供入住日期、预订人、房号与退房时刻，描述物品但保留一个私密识别点。请工作人员查找、建立失物记录并主动说出该识别点。匹配后选择交接最少的路线：本人取、授权一人代领，或仅在官方承运方接受准确内件后寄回。"
    },
    {
      "id": "short-answer",
      "type": "callout",
      "title": "先给结论",
      "tone": "decision",
      "body": "先确认酒店拿到的是你的物品；不要只凭“找到了”就付快递费。取得工单号、中性照片或描述、当前保管人和处理期限。本人领取的保管链最短。代领必须先让酒店接受书面授权并核验身份。寄递是最后选择：写清内件、包装、声明价值/保价选择、地址、官方付款、运单与每次交接风险。护照、仍在线的手机、药品、现金、电池、液体与其他敏感或限寄物，先走对应专题与承运方核验，不能推定可寄。"
    },
    {
      "id": "canonical-scope",
      "type": "paragraph",
      "text": "本文只协调找回，不判定法律所有权、不指责员工、不设置赔偿，也不批准某物品国内或跨境寄递。无法保证查找结果、保存状态、保管时长、当日取件、海关接受、送达时间或报销。数字账户、医疗、身份与人身安全风险永远先于实体物品找回。"
    },
    {
      "id": "triage-heading",
      "type": "heading",
      "level": 2,
      "text": "物品匹配后再选找回路径"
    },
    {
      "id": "triage-matrix",
      "type": "table",
      "caption": "使用最少且可追责的交接",
      "columns": [
        "物品与情形",
        "核实",
        "领取",
        "寄递"
      ],
      "rows": [
        [
          "护照或旅行证件",
          "私下匹配并由值班负责人保管",
          "本人或主管机关认可路径最稳",
          "不能假设普通寄递；转护照恢复专题"
        ],
        [
          "在线手机、钥匙或钱包",
          "用隐藏识别点，立即控制账户/门禁",
          "本人或可信授权人",
          "先完成安全处理并取得承运接受"
        ],
        [
          "药品或医疗设备",
          "准确识别，但不公开个人医疗资料",
          "紧急取回或寻求安全替代建议",
          "承运与目的地规则决定；时效可能不适合"
        ],
        [
          "衣物或普通耐用品",
          "颜色、品牌、口袋细节与房间位置",
          "仍在附近时最简单",
          "验视与包装约定后通常才可行"
        ],
        [
          "易碎或高价值物",
          "序列/记号与现状照片",
          "优先可控领取",
          "询问包装与声明价值服务，不保证结果"
        ],
        [
          "易腐、泄漏或可疑物",
          "不要要求员工超出政策处理",
          "服从酒店/主管机关安排",
          "官方承运方未明确接受就不寄"
        ]
      ]
    },
    {
      "id": "workflow-1-heading",
      "type": "heading",
      "level": 2,
      "text": "建立一个核验过的失物记录"
    },
    {
      "id": "workflow-1-context",
      "type": "paragraph",
      "text": "第一目标是匹配，不是公开物品所有细节。陌生短信或搜索广告里的电话不能直接视为酒店渠道。"
    },
    {
      "id": "workflow-1-steps",
      "type": "list",
      "ordered": true,
      "items": [
        "打开原订单，确认物业名、中文地址、入住日期、预订人、房号与退房时刻。",
        "使用平台对话、官网电话或平台确认的号码，请转前厅或值班负责人。",
        "描述类别、颜色、可能位置与时刻，但保留序列号尾数、刻字、口袋内件或独特损伤等一个私密标记。",
        "请其查客房、布草/客房部流转、保险箱、充电处和失物库，再由其主动说出隐藏标记。",
        "书面取得工单号、匹配描述、现状、当前保管人、保管位置、联系人岗位和物业说明的行动截止。"
      ]
    },
    {
      "id": "workflow-2-heading",
      "type": "heading",
      "level": 2,
      "text": "用签收记录完成领取"
    },
    {
      "id": "workflow-2-context",
      "type": "paragraph",
      "text": "不要临时派网约车司机或陌生跑腿代领，除非酒店明确接受该流程并能核验接收人。"
    },
    {
      "id": "workflow-2-steps",
      "type": "list",
      "ordered": true,
      "items": [
        "本人领取时约好柜台与时段，携带酒店要求的身份或订单证据，检查物品，只对真实收到内容签收。",
        "可信代领时先问酒店所需授权书与脱敏身份副本，只指定一位代领人与一个窗口。",
        "通过私密渠道给代领人工单号与一次性确认短语；不要把护照扫描件发进未核验聊天。",
        "取得带日期、酒店岗位、代领人与物品数量的交接照片或收据，遮住无关个人资料。"
      ]
    },
    {
      "id": "workflow-3-heading",
      "type": "heading",
      "level": 2,
      "text": "承运方接受准确内件后才寄"
    },
    {
      "id": "workflow-3-context",
      "type": "paragraph",
      "text": "酒店找到物品，不代表它可以寄。国内/国际路线以及电池、液体、药品、证件、现金与贵重物可能适用不同规则。"
    },
    {
      "id": "workflow-3-steps",
      "type": "list",
      "ordered": true,
      "items": [
        "向官方承运方准确说明物品、数量、电池/液体状态、价值、始发地与目的地，询问可用服务与验视要求。",
        "书面约定谁包装、谁承担必要成本、是否由承运方打包，以及实际提供何种声明价值或保价。",
        "封箱前取得物品现状与所有内件照片；封箱后拍包裹、面单与封口，但不公开发布。",
        "通过酒店有记录渠道或承运方官方链接/账户付款，不向未核验个人请求直接转账。",
        "取得正式运单与追踪号，记录酒店交承运人的时间与姓名/岗位，并等待首次收件扫描。"
      ]
    },
    {
      "id": "failure-heading",
      "type": "heading",
      "level": 2,
      "text": "保管链断开时"
    },
    {
      "id": "failure-recovery",
      "type": "table",
      "caption": "回到最后一个有记录的保管人",
      "columns": [
        "失败",
        "马上处理",
        "升级边界"
      ],
      "rows": [
        [
          "首班说没找到",
          "换班时请求客房部与失物库第二次查找",
          "事实只给一次，不断泄露新识别点"
        ],
        [
          "照片相似但不能证明",
          "让人员私下核对保留标记",
          "未匹配前不认领、不付款、不授权"
        ],
        [
          "酒店要求转个人账户",
          "从官方物业/平台渠道反查人员岗位",
          "使用正式账单或承运方付款"
        ],
        [
          "承运方拒收",
          "不要隐瞒、改名或拆包绕过验视",
          "改为领取、合规专门服务或依法处理"
        ],
        [
          "追踪没有收件扫描",
          "联系最后记录的酒店保管人与官方承运方",
          "仅有面单不等于已交件，保留时间线"
        ],
        [
          "护照或手机未被安全保管",
          "立即启动身份/数字风险专题",
          "实体查找并行，不能等寄递"
        ]
      ]
    },
    {
      "id": "promise-boundary",
      "type": "callout",
      "title": "“找到了”不等于找回完成",
      "tone": "warning",
      "body": "酒店要安全识别物品与权利人，承运方也要验视。本文不能保证发现、保存状态、保管、授权放行、寄递合法、清关、保价覆盖、追踪或送达。不要分享密码、一次性验证码、完整卡资料或无必要护照页面，也不能虚报内件。"
    },
    {
      "id": "next-step",
      "type": "callout",
      "title": "下一步：马上发查找消息",
      "tone": "decision",
      "body": "发送：“订单__，住客__，房号__，退房__。我把[类别/颜色]落在__附近。请建立失物记录，查客房部与失物库，并在不公开标记的情况下告诉我它是否有[私密标记]。请给工单号、当前保管人、现状与处理截止。”标记匹配后才选领取或寄递。"
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "继续找回与预防计划",
      "items": [
        {
          "label": "使用护照遗失与出境恢复流程",
          "href": "/zh/guides/lost-passport-in-china-exit-recovery/",
          "description": "酒店不能立即安全返还护照时，用专页保护出境时间线。"
        },
        {
          "label": "手机遗失先控制数字风险",
          "href": "/zh/guides/lost-phone-in-china-digital-recovery/",
          "description": "酒店查找期间也要先锁定账户并保留沟通。"
        },
        {
          "label": "找回失败时建立证据包",
          "href": "/zh/guides/china-booking-dispute-evidence-pack/",
          "description": "升级处理前整理保管、沟通、付款与替代记录。"
        },
        {
          "label": "返回中国住宿决策",
          "href": "/zh/stay/",
          "description": "回到不含酒店榜单的住宿决策入口。"
        },
        {
          "label": "下次保护国际航班前最后一晚",
          "href": "/zh/guides/china-last-night-before-international-flight/",
          "description": "退房前执行证件、设备与行李的最后一晚清点。"
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "官方旅馆治安、民法、邮政与图片来源",
      "items": [
        {
          "label": "旅馆业治安管理办法",
          "url": "https://xzfg.moj.gov.cn/mobile/law/detail?LawID=792",
          "publisher": "司法部国家行政法规库",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "中华人民共和国民法典",
          "url": "https://www.court.gov.cn/zixun/xiangqing/233181.html",
          "publisher": "最高人民法院",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "邮件快件收寄验视规定（试行）",
          "url": "https://www.spb.gov.cn/gjyzj/c200045/201507/603f78a94f6f4b4280126eb496ae92bf.shtml",
          "publisher": "国家邮政局",
          "reviewedAt": "2026-08-22"
        },
        {
          "label": "首图：Vmenkov拍摄龙海酒店前台，CC BY-SA 3.0",
          "url": "https://commons.wikimedia.org/wiki/File:Longhai_-_Hotel_reception_-_P1260519.JPG",
          "publisher": "Wikimedia Commons",
          "reviewedAt": "2026-08-22"
        }
      ]
    }
  ]
} as const satisfies StructuredPageBody;

export default body;
