import type { StructuredPageBody } from "../../../lib/content-system/page-body";

const body: StructuredPageBody = {
  "schemaVersion": "1.0.0",
  "blocks": [
    {
      "id": "answer-first",
      "type": "lead",
      "text": "中国供电为 220V、50Hz。转换插头只改变物理形状，不改变电压。大多数标有 INPUT 100–240V、50/60Hz 的手机和电脑充电器只需合适的插头转换器；只支持约 110–120V 的单电压电器需要真正的变压器，或者不要携带。"
    },
    {
      "id": "decision-map",
      "type": "table",
      "caption": "转换插头还是变压器",
      "columns": [
        "情况",
        "选择",
        "行动"
      ],
      "rows": [
        [
          "标注 INPUT 100–240V, 50/60Hz",
          "只需转换插头",
          "确认插接牢固后正常使用。"
        ],
        [
          "只标 110V 或 120V",
          "变压器或更换电器",
          "不可直接接入 220V。"
        ],
        [
          "标注 220–240V",
          "通常电压兼容",
          "仍可能需要形状转换。"
        ],
        [
          "没有可读电气标签",
          "不要猜",
          "查询制造商规格或更换设备。"
        ]
      ]
    },
    {
      "id": "detail-heading",
      "type": "heading",
      "level": 2,
      "text": "插座形状的现实"
    },
    {
      "id": "detail-list",
      "type": "list",
      "items": [
        "上海官方指南列出 A、C、I 型。酒店、火车和机场的实际插座会不同，松动的多制式插座可能托不住较重充电器。",
        "携带信誉可靠、额定值足够的紧凑接地转换器；多人共用房间插座时可带短延长线或多口 USB 充电器。",
        "两脚转换器不能为三脚设备创造接地，高功率或接地设备需要额定匹配且真正接地的方案。",
        "吹风机、直发器、水壶和加热工具最容易出问题：许多是单电压，功率也超过小型旅行变压器。"
      ]
    },
    {
      "id": "steps-heading",
      "type": "heading",
      "level": 2,
      "text": "一分钟读懂每个充电器"
    },
    {
      "id": "steps",
      "type": "list",
      "ordered": true,
      "items": [
        "在充电器或电器上找 INPUT，不要把 USB 口的 OUTPUT 当成输入要求。",
        "确认电压范围包含 220V，频率包含 50Hz。",
        "确认转换设备的最大电压、电流和功率高于电器需求。",
        "把转换插头放入随身行李，不要层层叠接松动转换器。",
        "抵达后检查插座；出现火花、松动、过热或异味立即停止使用。"
      ]
    },
    {
      "id": "failure-backup",
      "type": "callout",
      "title": "插头能插但不能充电",
      "body": "先断电。用原装充电器在酒店确认可用的插座测试，再用低功率宽电压设备单独测试转换器。不要硬压插脚，应请酒店协助。物理上能插入，不等于电压、接地和线路状态正确。",
      "tone": "warning"
    },
    {
      "id": "scope-boundary",
      "type": "callout",
      "title": "适用边界与实时规则",
      "body": "不同建筑和插座的配置会变化。官方来源确认 220V/50Hz 与常见插头形状，但不能承诺某间酒店一定有哪种插座。高功率、医疗或专业设备应提前与制造商和住宿方核实。",
      "tone": "neutral"
    },
    {
      "id": "internal-links",
      "type": "internal-links",
      "title": "继续规划",
      "items": [
        {
          "label": "充电宝运输规则",
          "href": "/zh/guides/china-power-bank-rules-flights-trains/",
          "description": "确认备用电池可以随行。"
        },
        {
          "label": "中国 eSIM 或本地 SIM",
          "href": "/zh/guides/china-esim-vs-local-sim/",
          "description": "让手机保持有电和联网。"
        },
        {
          "label": "国际航班前最后一晚",
          "href": "/zh/guides/china-last-night-before-international-flight/",
          "description": "把关键充电器放入随身行李。"
        }
      ]
    },
    {
      "id": "sources",
      "type": "sources",
      "title": "已复核的官方来源",
      "items": [
        {
          "label": "Electricity in China",
          "url": "https://www.caac.gov.cn/ZTZL/RDZT/YTHYWZ/CHRY/SHZN/Electricity/index.html",
          "publisher": "Civil Aviation Administration of China",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Beijing pre-departure travel tips",
          "url": "https://english.beijing.gov.cn/travellinginbeijing/quickguideontravelservices/traveltips/202108/t20210811_2466837.html",
          "publisher": "Beijing Municipal Government",
          "reviewedAt": "2026-08-12"
        },
        {
          "label": "Shanghai electricity FAQ",
          "url": "https://english.shanghai.gov.cn/en-FAQs-StudyinShanghai/20250924/e961a223e45a4adca7969b3f7691132b.html",
          "publisher": "Shanghai Municipal Government",
          "reviewedAt": "2026-08-12"
        }
      ]
    }
  ]
};

export default body;
