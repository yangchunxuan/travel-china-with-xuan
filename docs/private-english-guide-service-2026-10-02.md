# Homeground 单日私人英文导游产品

用户已确认下列售价。网站产品页已制作，尚未发布到正式官网。

## 价格与服务范围

| 城市 | 常规售价 | 旺季售价 |
|---|---:|---:|
| 上海 | CNY 1,200 | CNY 1,400–1,600 |
| 北京 | CNY 1,200 | CNY 1,400 |
| 西安 | CNY 900 | CNY 1,100 |
| 张家界 | CNY 900 | CNY 1,100 |

所有价格均按一位英文导游、一天最多 8 小时计费，不是每位游客价格。人数、具体路线、档期与当天适用价格在预订前确认。

交通、客人门票和餐食另行确认；需要专车和司机时另外报价。书面报价列明完整包含项及额外费用，包括可能产生的导游相关费用。尚未制定的超时费、休息安排和取消条款没有被写成固定承诺。

## 中文页面主要文案

**按你的节奏，与英文导游一起游览。**

已经安排好酒店和交通？在需要本地协助的游览日，单独配一位英文导游。告诉我们想去哪里、希望走得快还是慢，我们一起安排这一天。

- 一位导游，只服务你们一行人。
- 每天最多 8 小时。
- 人数和安排在报价时确认。

上海：游览外滩、豫园，或走走你感兴趣的街区。

北京：安排北京市区游览，或去长城；根据出发地点和景点核实时间与交通。

西安：参观兵马俑，或探索古城里的历史景点；一起核对路线及路途时间。

张家界：游览国家森林公园，或安排天门山一天；根据出发地点、区域与步行强度安排。

**询价：**选择城市，填写日期和人数，再告诉我们想去哪里。我们核实安排后回复报价。

## English introduction

**Your day, with a local English-speaking guide.**

Already arranged your hotels and transport? Add an English-speaking guide for the sightseeing days where you want local help. Tell us what you want to see and the pace that suits you.

One guide, just for your party. Up to 8 hours per day. Group size confirmed with your quote.

These are guide-only reference rates, charged per guide, per day. We confirm the applicable rate, group size and route before you book.

**Ask about your guide:** Choose a city, add your date and group size, and tell us what you would like to see. We will check the arrangements and reply with a quote.

## 已完成的网站工作

- 英文、中文、韩文产品页，价格与规则同义。
- “旅行服务”页增加独立英文导游入口。
- WhatsApp／邮件预填城市、日期、人数、参考价、路线备注及页面链接；不会自动发送。
- 输入检查防止未选城市、错误日期或无效人数被当成有效询价。
- 新服务按钮直接携带完整消息，不经过会丢失这些字段的通用桌面邮箱弹窗。
- reciprocal canonical/hreflang、Service／FAQ 结构化数据、搜索内容登记与 sitemap。

## 核验状态

生产构建与导出检查通过，相关既有测试通过，三种语言本地页面均返回 HTTP 200。三种语言、四个城市的询价消息都核对了城市、日期、15 人人数、备注与计价单位。

完整询价测试套件：1,084 项通过、0 项失败；11 项 PostgreSQL 集成检查因本机缺少数据库测试工具而跳过。人数输入标准化另核对了 6 种输入。

浏览器工具两次初始化均报 `failed to write kernel assets: 系統找不到指定的路徑。 (os error 3)`，因此尚未进行浏览器视觉及实际点击验收，没有新开任何浏览器标签页。没有向任何人发送消息、接受预订或收款。

## 本地预览

- 英文：http://127.0.0.1:4173/services/private-english-speaking-guides/
- 中文：http://127.0.0.1:4173/zh/services/private-english-speaking-guides/
- 韩文：http://127.0.0.1:4173/ko/services/private-english-speaking-guides/

工作分支：`codex/private-english-guides-20261002`。
