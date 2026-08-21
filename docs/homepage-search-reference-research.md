# Homeground China 首页文章搜索入口：外部参考研究

研究日期：2026-08-21（Asia/Shanghai）

## 结论先行

Homeground 不应在首屏再放一个与 Route Finder 竞争的“大搜索框”。建议采用双入口：

1. 桌面端在全局导航保留文字/图标入口 `Search guides`；移动端保留 44×44px 搜索按钮，点击后进入全屏搜索。
2. 首页的主搜索组件放在 **Route Finder 的结果/人工规划承接之后、文章卡片列表之前**。标题建议为 `Find a China travel guide`，这是内容探索的起点，不是新的行程生成器。

首版应是确定性的文章索引搜索，不做 AI 问答。空闲态给 5–7 个可靠主题；输入后给最多 6–8 条分组联想；提交后进入可分享的 `/guides/search?q=...` 结果页。这样既保留 Homeground “先给有用结果、再联系人工”的承诺，也不会让搜索、Route Finder 和客服入口同时争夺首屏主行动。

## 参考矩阵

> “观察”来自 2026-08-21 的页面现场检查或官方页面当前索引；“借鉴”与“不可照搬”是针对 Homeground 的设计判断。

| 网站 / URL | 入口位置 | 空闲状态 | 输入态 / 建议 | 提交后 | 移动端 | 值得借鉴 | 不可照搬 |
|---|---|---|---|---|---|---|---|
| [Lonely Planet Search](https://www.lonelyplanet.com/search) | 桌面全局导航直接显示 `Search`，进入独立搜索页 | 自动聚合 Suggested Destinations / Books / Trips / Inspiration / Things to Do；每组有 View All | 输入 `china` 后变成可访问的 listbox；顶部有 All / Destinations / Books / Trips / Inspiration / Things to Do 分类按钮、Reset；结果行同时给标题与类型/地点 | 现场检查中 Enter 仍停留在 `/search`，选择建议直接进入内容；查询未写入 URL | 390px 实测无横向溢出；输入框约 358×46px；内容变单列，导航折叠为菜单 | “没输入也有下一步”、多类型建议、结果行的类型副标签、明显清除按钮 | Homeground 不需要混合书籍、付费行程、景点和广告；也不应复制其没有查询 URL 的瞬时状态 |
| [Visit Norway](https://www.visitnorway.com/en/) / [现场查询例](https://www.visitnorway.com/search/?content%5Bquery%5D=fjord) | 首页顶部 `Search` 按钮，打开近似全屏的搜索层 | 打开即展示全量内容，并显示 Listing / Events / Articles 数量 | 输入 `fjord` 后结果即时刷新，并按 Listing / Articles / Events 显示数量；结果含地点、标题、摘要，商业项目标注 Book | 输入过程中 URL 即更新为 `/search/?content[query]=fjord`，可刷新/分享 | 搜索本身是页面级覆盖层，天然适合窄屏；关闭动作保留在顶部 | 查询状态进 URL、结果数可见、内容类型分组、摘要帮助判断 | 15,000+ 默认结果会制造噪音；Homeground 空闲态应给精选入口，不要先把整个索引倾倒给用户；也不要混入预订商品 |
| [Visit Singapore](https://www.visitsingapore.com/en/) / [Personalised itinerary](https://www.visitsingapore.com/en/personalised-travel-itinerary/) | 首页主导航使用 `Get recommendations`，把“没想好搜什么”导向个性化灵感流程 | 第一步问 “Who are you travelling with?”；提供 Solo / Partner / Kids / Friends / Parents 等明确选项 | 以结构化选择代替自由文本，最后 `Recommend to me`；这是旅行灵感筛选而非全站关键词搜索 | 进入后续推荐旅程，页面状态与 cookie 个性化有关 | 问题和大尺寸选项适合逐步、单列操作；移动端不需要承载复杂结果表 | 为“不知道关键词”的用户提供可点选起点；Homeground 可把同行者、天数、兴趣交给现有 Route Finder | 不要把文章搜索变成第二套问卷；不要依赖可选 cookie 才能提供核心搜索；也不要让推荐流程替代可查找、可分享的内容结果 |
| [Tourism Australia Search](https://www.australia.com/en/search.html) | 全局导航的搜索图标进入独立页 | 空查询也展示内容；搜索框下提供 Articles / Accommodation / Events / Experiences / Eat And Drink / Transportation 类型与数量，以及内容 Category | 可同时按内容来源和主题分类收窄；结果显示标题、摘要和 `Places to go` / `Things to do` 等标签 | 独立结果页，带分页（当前索引显示 1 / 83） | 390px 实测无横向溢出，搜索框 314×48px；类型数量与结果改为单列/紧凑布局 | “文章类型 + 主题”两层信息架构、计数、分页、结果标签；搜索按钮有可访问名称 | 六个内容库和两层筛选对 Homeground 首版过重；Accommodation/Events 等库存不是文章入口的目标 |
| [Tourism New Zealand](https://www.newzealand.com/ca/) | 首页首屏内容之后直接放 `ASK OUR AI — NEW` 和 `Ask us anything…` | 提供三条示例问题，例如交通难度、各季节玩法、机票与住宿 | 自然语言问答，以问题建议降低空白输入压力 | 进入 AI 回答，而不是传统结果列表 | 首页内联输入和短示例问题易于窄屏堆叠；本次未完成独立移动端现场复核 | 示例问题非常适合解释“这里能搜什么”；Homeground 可把它改为静态热门搜索 chips | 首版不应复制 AI 答案：有事实时效、引用、幻觉、成本和多语言一致性风险；搜索文章应返回来源页，而不是生成答案 |
| [National Geographic Travel](https://www.nationalgeographic.com/travel/) | 当前 Travel 首页以主题导航、编辑精选、Best of the World 与 Destination Guides 为主；本次现场 DOM 未找到清晰的 Travel 专属搜索入口 | 依靠编辑精选、专题和目的地导读触发探索 | 没有可确认的 Travel 页内联想模式 | 用户从内容卡片进入文章/专题 | 移动端核心是内容流和横向/轮播型精选，不是搜索主任务 | 说明“编辑推荐浏览”仍然必要；搜索不应取代首页精选主题 | 不要把搜索藏到不明确的全站层级；Homeground 的文章库较小，更需要明确入口与可预测结果 |
| [GOV.UK Search](https://www.gov.uk/search/all) / [官方搜索架构说明](https://docs.publishing.service.gov.uk/manual/govuk-search.html) | 首页与所有 GOV.UK 页面顶部均可进入全站搜索；独立搜索页有清晰 H1 和可见 Search 按钮 | 空查询仍有可操作输入，并显示全站结果；没有花哨建议 | 现场输入 `passport` 时不即时替换结果，也未出现建议；提交才搜索，降低动态控件复杂度 | `/search/all?keywords=passport`；显示 5,963 results、标题、摘要、子页与分页；状态可分享 | 顶部导航在小屏折叠为 Menu / Search GOV.UK；结果保持纵向列表 | 可见 label、明确搜索范围、查询写入 URL、结果数、摘要、分页、渐进增强 | GOV.UK 面向任务完成且库存巨大；Homeground 不需要如此素、如此长的结果页，也不要默认显示全部文章 |
| [Algolia Autocomplete](https://www.algolia.com/doc/guides/building-search-ui/ui-and-ux-patterns/autocomplete/react) / [Detached mode](https://www.algolia.com/doc/ui-libraries/autocomplete/core-concepts/detached-mode) / [Keyboard navigation](https://www.algolia.com/doc/ui-libraries/autocomplete/core-concepts/keyboard-navigation) | 作为官方组件模式，可嵌在站内任何入口 | 可配置 focus 时打开热门/最近搜索；建议来自可控索引 | 提供可访问的 as-you-type autocomplete；方向键移动，Enter 当前页打开，Cmd/Ctrl+Enter 新标签；可分多个来源 | 可与独立 InstantSearch 结果页和 URL 路由组合 | 官方 detached mode 在小于 500px 时默认转为全屏 modal | 移动端全屏、键盘规范、多来源分组、`enterKeyHint="search"`、等待状态 | 不要因为库能做就默认加入历史、个性化、多列面板；首版应控制范围和 JS 体积 |

## 给 Homeground 的明确方案

### 1. 首页位置与层级

- 保留 Hero 与 Route Finder 作为主要价值主张和主行动，不在 Hero 中并排放第二个大输入框。
- 在 **Route Finder 结果/人工规划承接之后、Guide/Article 卡片列表之前**放一个独立浅色搜索带。桌面最大内容宽度约 720px，移动端占容器全宽。
- 全局导航增加 `Search guides`；桌面是文字+图标，移动端是有 `aria-label="Search China travel guides"` 的 44×44px 按钮。它们打开同一搜索体验，而不是两套实现。

建议文案（英文站）：

- 小标题：`Plan with practical guides`
- 标题：`Find a China travel guide`
- 可见 label：`Search China travel guides`
- placeholder（不是唯一 label）：`Try “visa-free”, “Beijing” or “solo travel”`
- 空闲 chips：`Visa & entry`、`First trip to China`、`Beijing`、`Shanghai`、`Zhangjiajie`、`Getting around`、`Payments & apps`

### 2. 交互状态

| 状态 | Homeground 行为 |
|---|---|
| 未聚焦 | 显示输入框、Search 按钮与 5–7 个静态热门主题；不请求搜索服务 |
| 聚焦但空 | 打开面板，先给 `Popular guides` 与 `Browse by topic`，最多 6 项；不要显示“全部 N 篇”长列表 |
| 输入 1 字符 | 保持稳定，不触发请求；可提示 `Type at least 2 characters`，避免闪烁 |
| 输入 ≥2 字符 | 150–250ms debounce；显示最多 6–8 项，分为 `Guides`、`Destinations`、`Topics`（没有真实内容的组不显示） |
| 建议项 | 主行文章/目的地标题；副行只显示一种类型与短描述，例如 `Guide · Entry & visas`；匹配词高亮但不只靠颜色表达 |
| Enter / Search | 若有键盘高亮项则打开该项；否则进入 `/guides/search?q={query}`；URL 保留 query，支持刷新、返回、分享 |
| 加载 | 输入区立即显示轻量 busy 状态，容器 `aria-busy="true"`；超过短暂阈值再显示骨架，不移动输入框 |
| 无结果 | `No guides found for “…”`；保留原查询；给 3 个可恢复动作：检查拼写、选择热门主题、浏览全部 guides；人工规划是次级链接，不是唯一出口 |
| 结果页 | H1 重复查询范围；`role="status"`/`aria-live="polite"` 宣布结果数；卡片显示标题、摘要、主题、更新时间（确有时）；首版只需 Topic / Destination 两类筛选 |

### 3. 桌面与移动端

- 桌面：聚焦后在输入框下方打开锚定面板，宽度与输入一致；最大高度约 60vh；不遮住 Route Finder 的已有结果。
- 移动端（建议断点 `<500px`）：参考 Algolia detached mode，进入全屏搜索视图；顶部固定 Back、输入、Clear，结果区域独立滚动；打开时聚焦输入，关闭后焦点返回触发按钮。
- 输入、Search、Clear、建议行的触控区域至少 44×44px；320px 宽不产生页面横向滚动。
- 不使用 hover-only 预览；所有 hover 状态都有 `:focus-visible` 等价状态，并保留明显焦点环。

### 4. 可访问性与技术边界

- 使用语义 `<search>` / `<form role="search">`、可见 `<label>`、`input type="search"` 和真实 `<button type="submit">`。
- 联想用 [W3C Combobox Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/)：`combobox` + `listbox` + `option`，维护 `aria-expanded`、`aria-controls`、`aria-activedescendant`；Arrow Up/Down、Enter、Escape、Tab 行为必须可预测。
- 动态结果数使用 [W3C `role=status` 技术](https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA22)，默认礼貌播报，不用 alert 打断。
- 索引数据来自现有发布文章/guide registry；不要为显示建议复制另一份手工标题清单。需要单独维护的只应是 5–7 个空闲态热门主题。
- 同义词首版至少覆盖用户真实表达：`visa free` / `visa-free`、`bullet train` / `high-speed rail`、`wechat pay` / `mobile payment`、城市英文与常见拼写。中日韩界面应使用各自的索引字段或明确的同义词，不在 UI 内临时机器翻译。
- 不把 Route Finder 答案、聊天线索或个人历史发送给第三方搜索服务；首版无需个性化历史。

## 推荐的首版验收门槛

1. 首页两个入口进入同一搜索逻辑，Hero 主 CTA 与 Route Finder 不变。
2. 空闲态、联想、加载、无结果、结果页五种状态都有文案与视觉稿。
3. 鼠标、触屏、仅键盘、VoiceOver/NVDA 均可完成：打开 → 输入 → 浏览建议 → 打开结果 → 返回。
4. 查询存在 URL 中；复制结果页 URL 到新标签后，查询与筛选可恢复。
5. 320px 无横向滚动；44px 触控目标；缩放 200% 不丢失输入、清除或提交。
6. 中文/英文/韩文各抽查至少 10 个高意图查询和 5 个无结果查询；不出现错误城市、空白建议或把未发布内容暴露出来。
7. Search 的 JS/索引不会阻塞 Hero 和 Route Finder；未交互前不加载非必要搜索包。

## 本次实现取舍（2026-08-21）

- 已采用：搜索位于现有 Travel Guides 标题之后、精选卡片之前；三语使用同一组件；示例问题常驻；输入两字后最多展示 6 条当前语言建议；提交进入可分享的 GET 结果页。
- 索引是约 105–116 KB 的同语言静态 JSON，只在首页搜索首次获得焦点时读取，不进入初始 HTML。搜索计算在本地完成，因此不增加逐字网络请求，也不需要人为 debounce。
- 首版只返回 `published + indexable` 的 Guide 文档，所以不伪造当前语料中并不存在的 Destination / Topic 建议分组。文章类型仍通过每条结果的 collection 副标签说明。
- 320px 与 390px 已能以内联单列完成输入、提交和建议浏览，首版保留页面上下文，不额外引入全屏 modal、焦点陷阱和第二套关闭逻辑。若以后建议来源扩展到目的地、主题或近期搜索，再启用 `<500px` detached mode。

## 主要官方资料

- [Lonely Planet Search](https://www.lonelyplanet.com/search)
- [Visit Norway official travel guide](https://www.visitnorway.com/en/)
- [Visit Singapore official site](https://www.visitsingapore.com/en/)
- [Tourism Australia Search](https://www.australia.com/en/search.html)
- [Tourism New Zealand official site](https://www.newzealand.com/ca/)
- [National Geographic Travel](https://www.nationalgeographic.com/travel/)
- [GOV.UK search architecture](https://docs.publishing.service.gov.uk/manual/govuk-search.html)
- [GOV.UK guidance: navigate a service](https://design-system.service.gov.uk/patterns/navigate-a-service/)
- [GOV.UK text input guidance](https://design-system.service.gov.uk/components/text-input/)
- [Algolia Autocomplete](https://www.algolia.com/doc/guides/building-search-ui/ui-and-ux-patterns/autocomplete/react)
- [Algolia detached mode](https://www.algolia.com/doc/ui-libraries/autocomplete/core-concepts/detached-mode)
- [Algolia keyboard navigation](https://www.algolia.com/doc/ui-libraries/autocomplete/core-concepts/keyboard-navigation)
- [W3C WAI combobox pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/)
- [W3C WAI ARIA22 status messages](https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA22)

## 证据说明与限制

- Lonely Planet、Visit Norway、Visit Singapore、Tourism Australia、National Geographic Travel、GOV.UK 的关键状态在 2026-08-21 现场读取页面可见 DOM；Lonely Planet 与 Tourism Australia 另以 390px 视口复核无横向溢出。
- Tourism New Zealand 的 `ASK OUR AI`、输入提示与三条示例问题来自同日官方页面索引；现场浏览器连接超时，因此其移动端细节没有当场确认，不作为 Homeground 组件尺寸依据。
- Visit Singapore 会按访问环境重定向语言；现场落在韩文版本，但页面结构、问题与选项属于同一官方个性化 itinerary 模式。
- National Geographic Travel 在本次现场 DOM 中没有可确认的 Travel 专属搜索控件，因此仅作为“编辑精选浏览不能被搜索取代”的反例，不据此断言其所有地区/登录态都没有全站搜索。
