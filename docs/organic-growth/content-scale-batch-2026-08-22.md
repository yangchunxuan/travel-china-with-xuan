# Homeground 60题严格内容批次 — 2026-08-22

状态：`ASSIGNED FOR DRAFT PRODUCTION — NOT PUBLISHED — CENTRAL INTEGRATION REQUIRED`

机器票据权威文件：`docs/organic-growth/content-scale-batch-2026-08-22.json`

## 基线与授权

- 基线：`origin/main@72e5d161ed8af853fbf262e7c875f8fd748645e3`，已含 [PR #83](https://github.com/yangchunxuan/travel-china-with-xuan/pull/83)。
- 线上：180 个 guide identity / 534 个 guide locale URL；8 个城市 Hub / 24 URL；1 个 entry collection；合计 189 个编辑型详情身份 / 559 个 locale URL；sitemap 664。
- PR #83 四篇共 12 个 locale URL 已上线 200，不得再次选同题。
- 用户在 2026-08-22 明确授权员工7锁题并派工。没有创建或虚构 GitHub Issue；写手没有 PR、合并或部署权限。
- 本批 60 个身份、六池各10个，共 91 复杂度单位。三语始终只算一个身份。
- Search Console 的题级证据不可用；关键词量、CPC、难度和购买概率不可用，未猜测。

## 全批硬门槛

1. 一题一个 canonical owner；近义词、反向线路、人群和年份变体必须合并。
2. 每篇交付 EN / 简中 / 韩文、metadata、source-log、image-plan、canonical-boundary；动态页还要 dynamic-facts。
3. 只使用可核权的真实地点/流程图片，不用 AI 纪实旅游图；记录作者、许可、原 URL、地点、处理及原/成品 SHA-256。
4. 先回答旅客任务，再给取舍、失败恢复和下一步；不得用模板堆字、通用百科或标题党凑长度。
5. 动态事实发布周复核，不冻结班次、价格、开放、库存、App行为或接待保证。
6. 每身份一个原子 commit；每员工一个批次分支；写手不改主页、公开 Registry、sitemap、共享计数、字体或 indexability。
7. 不强化付费服务权重，不强推 US$69 / US$129，不新增销售型 CTA。
8. 员工3只返修既有十篇 durable draft，不得新开第十一题；曲阜必须合并到 `qufu-three-confucian-sites-route`。
9. Route Reality 公开产品继续拒绝，不得借本批重启。
10. 完成后只 push 分支，不建 PR、不合并、不部署；中央逐篇审核后才能整合。

## 员工1 / 交通

分支：`article/worker-1-transport-scale-20260822`

| candidateId | workingTitle | score | units | proposedContentId |
|---|---|---:|---:|---|
| `transport-20260822-01` | Which Xi’an Railway Station? Xi’an, Xi’an North or the New Xi’an East | 94 | 2 | `xian-railway-station-selector` |
| `transport-20260822-02` | Chengdu CTU or TFU? Choose the Airport for the Whole Trip | 95 | 2 | `chengdu-shuangliu-or-tianfu-airport` |
| `transport-20260822-03` | Which Guangzhou Railway Station? South, East, Central, Baiyun or North | 95 | 2 | `guangzhou-railway-station-selector` |
| `transport-20260822-04` | Which Shanghai Railway Station? Shanghai, Hongqiao, South or Songjiang | 95 | 2 | `shanghai-railway-station-selector` |
| `transport-20260822-05` | Zhangjiajie Airport, Central Station or West Station? Match the Arrival to Your Base | 93 | 2 | `zhangjiajie-airport-or-railway-station-arrival` |
| `transport-20260822-06` | Beijing PEK or PKX? Choose Capital or Daxing by the Complete Trip | 94 | 2 | `beijing-capital-or-daxing-airport` |
| `transport-20260822-07` | Chengdu to Chongqing by Train: Choose the Right Station Pair, Not Just the Fastest Train | 91 | 2 | `chengdu-chongqing-station-pair` |
| `transport-20260822-08` | Changsha to Zhangjiajie: Train, Arrival Base and Park-Side Handoff | 89 | 2 | `changsha-zhangjiajie-transport-route` |
| `transport-20260822-09` | Guilin to Longji Rice Terraces: Choose Ping’an or Dazhai Before the Transfer | 91 | 2 | `guilin-longji-rice-terraces-transfer` |
| `transport-20260822-10` | Kunming to Stone Forest: Train, Bus or Car to the Correct Visitor Centre | 89 | 2 | `kunming-stone-forest-transport` |

## 员工2 / 目的地

分支：`article/worker-2-explore-scale-20260822`

| candidateId | workingTitle | score | units | proposedContentId |
|---|---|---:|---:|---|
| `destination-20260822-01` | Jiuzhaigou in One Day: Sightseeing Bus, Three Valleys and What to Skip | 94 | 2 | `jiuzhaigou-one-day-sightseeing-bus-route` |
| `destination-20260822-02` | Shanghai Disneyland for Foreign Visitors: Passport, App and a One-Day Plan | 94 | 2 | `shanghai-disneyland-foreign-visitors` |
| `destination-20260822-03` | Universal Beijing for Foreign Visitors: Ticket, Passport, App and One-Day Route | 93 | 2 | `universal-beijing-foreign-visitors` |
| `destination-20260822-04` | The Bund and Lujiazui: Which Side, When, and How to See Both | 91 | 1 | `bund-or-lujiazui-see-both` |
| `destination-20260822-05` | West Lake Without Walking the Whole Loop: Walk, Boat or Bike? | 93 | 2 | `west-lake-walk-boat-or-bike` |
| `destination-20260822-06` | Xiamen Island and Gulangyu in One Day: Separate the City Day from the Island Visit | 90 | 2 | `xiamen-and-gulangyu-one-day` |
| `destination-20260822-07` | Mount Emei: Golden Summit, Temple Route or Both? | 92 | 2 | `mount-emei-golden-summit-or-temple-route` |
| `destination-20260822-08` | Mount Tai: Night Climb, Day Hike or Bus-and-Cableway Route? | 87 | 2 | `mount-tai-night-climb-or-day-route` |
| `destination-20260822-09` | Which Water Town from Shanghai? Zhujiajiao, Tongli or Wuzhen | 95 | 2 | `shanghai-water-town-zhujiajiao-tongli-wuzhen` |
| `destination-20260822-10` | Jingdezhen’s Ceramic Districts: Imperial Kiln, Taoxichuan or Sanbao? | 91 | 1 | `jingdezhen-imperial-kiln-taoxichuan-sanbao` |

## 员工3 / 文化

分支：`article/worker-3-culture-scale-20260822`

| candidateId | workingTitle | score | units | proposedContentId |
|---|---|---:|---:|---|
| `culture-20260822-01` | Du Fu Thatched Cottage: Poet, Rebuilt Home and Literary Memory | 91 | 1 | `du-fu-thatched-cottage-literary-memorial` |
| `culture-20260822-02` | Chen Clan Academy: Read Seven Crafts Without Losing the Building | 88 | 1 | `guangzhou-chen-clan-academy-craft-reading` |
| `culture-20260822-03` | Jingdezhen Imperial Kiln Museum: Read Kiln Ruins, Sherds and Reconstructed Porcelain | 90 | 1 | `jingdezhen-imperial-kiln-museum-archaeology` |
| `culture-20260822-04` | Jiangnan Gongyuan: Read the Examination Cells, Reconstruction and Museum | 86 | 1 | `nanjing-jiangnan-gongyuan-examination-museum` |
| `culture-20260822-05` | Tianyi Pavilion: How a Private Library Survived Fire, Access Rules and Time | 85 | 1 | `ningbo-tianyi-pavilion-private-library` |
| `culture-20260822-06` | Rishengchang: How a Pingyao Courtyard Moved Money Across Qing China | 85 | 1 | `pingyao-rishengchang-draft-bank-network` |
| `culture-20260822-07` | Qufu’s Three Confucian Sites: Temple, Mansion and Cemetery in One Evidence Route | 88 | 1 | `qufu-three-confucian-sites-route` |
| `culture-20260822-08` | Shenyang Imperial Palace: Read the Three Routes Without Turning It into Beijing | 80 | 1 | `shenyang-imperial-palace-three-route-reading` |
| `culture-20260822-09` | Turpan Karez: Follow the Water from Vertical Wells to the Museum Route | 86 | 1 | `turpan-karez-museum-water-system` |
| `culture-20260822-10` | Xi’an Stele Forest: Read Text, Calligraphy, Carving and Rubbings Together | 86 | 1 | `xian-stele-forest-text-calligraphy-rubbings` |

## 员工4 / 规划

分支：`article/worker-4-planning-scale-20260822`

| candidateId | workingTitle | score | units | proposedContentId |
|---|---|---:|---:|---|
| `planning-20260822-s1-02` | First Solo Trip to China: A Recoverable Route and Safety Checks | 88 | 1 | `first-solo-trip-china-recoverable-route` |
| `planning-20260822-s1-03` | Chengdu, Jiuzhaigou and Huanglong: Route Order and Altitude Buffer | 87 | 2 | `chengdu-jiuzhaigou-huanglong-route-order` |
| `planning-20260822-s1-04` | Guilin, Yangshuo and Longji: Route Order for Karst and Rice Terraces | 88 | 1 | `guilin-yangshuo-longji-route-order` |
| `planning-20260822-s1-05` | Mainland China, Hong Kong and Macao: Route Order Across Three Entry Systems | 85 | 2 | `mainland-china-hong-kong-macao-route-order` |
| `planning-20260822-s1-06` | North China or South China for Your First Trip? | 88 | 1 | `north-or-south-china-first-trip` |
| `planning-20260822-s1-07` | Xiamen, Quanzhou and Fujian Tulou: Route Order and Rural Access | 86 | 1 | `xiamen-quanzhou-fujian-tulou-route-order` |
| `planning-20260822-s1-11` | Chinese Gardens and Water Towns: Choose Complementary Stops, Not Lookalikes | 88 | 1 | `chinese-gardens-water-towns-complementary-stops` |
| `planning-20260822-s1-12` | An Archaeology and Ancient Capitals Route in China | 89 | 1 | `china-archaeology-ancient-capitals-route` |
| `planning-20260822-s1-13` | A Buddhist Heritage Route in China: Caves, Temples and Living Practice | 87 | 1 | `china-buddhist-heritage-route` |
| `planning-20260822-s1-15` | Remote China Attraction: Group Tour, Private Car or DIY? | 86 | 1 | `remote-china-attraction-group-tour-private-car-or-diy` |

## 员工5 / 住宿

分支：`article/worker-5-stay-scale-20260822`

| candidateId | workingTitle | score | units | proposedContentId |
|---|---|---:|---:|---|
| `stay-20260822-scale-01` | Where to Stay in Chengdu: Chunxi Road, Wenshu or Kuanzhai Alley? | 92 | 1 | `chengdu-where-to-stay-chunxi-wenshu-kuanzhai` |
| `stay-20260822-scale-02` | Where to Stay in Guangzhou: Beijing Road, Liwan or Tianhe? | 93 | 1 | `guangzhou-where-to-stay-beijing-road-liwan-tianhe` |
| `stay-20260822-scale-03` | Where to Stay in Hangzhou: Hubin, Wulin or East Station? | 91 | 1 | `hangzhou-where-to-stay-hubin-wulin-east-station` |
| `stay-20260822-scale-04` | Where to Stay in Dali: Old Town, Xiaguan or an Erhai Village? | 88 | 1 | `dali-where-to-stay-old-town-xiaguan-erhai-village` |
| `stay-20260822-scale-05` | Where to Stay in Suzhou: Old City, Shantang or Jinji Lake? | 89 | 1 | `suzhou-where-to-stay-old-city-shantang-jinji-lake` |
| `stay-20260822-scale-06` | Where to Stay in Sanya: Sanya Bay, Dadonghai, Yalong Bay or Haitang Bay? | 86 | 2 | `sanya-where-to-stay-four-bays` |
| `stay-20260822-scale-07` | Stay Inside or Outside Pingyao Old City? | 87 | 1 | `pingyao-stay-inside-or-outside-old-city` |
| `stay-20260822-scale-08` | Stay in a Fujian Tulou or at a Nearby Hotel? | 90 | 2 | `fujian-tulou-stay-inside-or-nearby-hotel` |
| `stay-20260822-scale-09` | China Hotel Room Doesn’t Match the Booking: Verify, Change Rooms or Relocate | 91 | 1 | `china-hotel-room-does-not-match-booking` |
| `stay-20260822-scale-10` | Left Something at a China Hotel: Verify, Collect or Ship It | 87 | 2 | `china-hotel-left-item-recovery` |

## 员工6 / 入境与实用

分支：`article/worker-6-essentials-scale-20260822`

| candidateId | workingTitle | score | units | proposedContentId |
|---|---|---:|---:|---|
| `essentials-20260822-scale-01` | Amap, Apple Maps or Baidu Maps in China? Build a Verified Address and Navigation Backup | 90 | 2 | `china-navigation-verified-address-backup` |
| `essentials-20260822-scale-02` | Translate China Without Chinese: Menus, Screenshots, Signs and Offline Backups | 85 | 1 | `translate-china-without-chinese-offline-backups` |
| `essentials-20260822-scale-03` | China Airport Layover: Immigration, Bags, Airside and Overnight Decisions | 92 | 2 | `china-airport-layover-immigration-bags-airside-overnight` |
| `essentials-20260822-scale-04` | China Tourist Tax Refund in 2026: Instant Refund, Customs and Departure | 87 | 2 | `china-tourist-tax-refund-workflow` |
| `essentials-20260822-scale-05` | When Your Passport Is the Ticket in China: Booking-to-Gate Workflow | 91 | 2 | `china-passport-as-ticket-booking-to-gate` |
| `essentials-20260822-scale-06` | China Attraction Sold Out: Legitimate Recovery Options | 89 | 2 | `china-attraction-sold-out-recovery` |
| `essentials-20260822-scale-07` | How to Order Food in China Without Chinese: Counter, Paper Menu, QR and Delivery Fallbacks | 90 | 2 | `order-food-china-without-chinese` |
| `essentials-20260822-scale-08` | China Public Toilets: Find One, Use Squat or Seated Toilets and Carry the Right Kit | 85 | 1 | `china-public-toilets-first-time-guide` |
| `essentials-20260822-scale-09` | China Ride-Hailing Pickup Failure: Find the Car, Fix the Pin or Use a Safe Fallback | 88 | 2 | `china-ride-hailing-pickup-failure-recovery` |
| `essentials-20260822-scale-10` | Checked Bag Missing or Damaged at a China Airport: Report, Trace and Continue the Trip | 91 | 2 | `china-airport-checked-bag-missing-damaged` |

## 强制合并与拒绝

- 长城四段比较：本批删除，继续遵守既有 do-not-repeat；没有新的实地数据集不得重开。
- 虎跳峡多日徒步：本批拒绝；官方未开发区域通告未解除前不得写成可执行路线。
- 泛“China must-have apps”：拒绝；导航只做验证地址与备份工作流。
- ATM 扣款未出钞/吞卡：并入 `china-atm-cash-not-dispensed` 更新队列，不建第二页。
- 第一次24小时：仍归员工4的 deferred Hub/collection 方案，不由员工6另建。
- 酒店寄存：仍归 `foreigners-china-hotel` FAQ，不建新页。
- 上海迪士尼、北京环球的票/护照/App/一日路线各自合并一页，不拆票型或项目薄页。
- 水乡只保留三镇比较 owner；不得为乌镇东西栅、每个镇或每个人群继续拆页。
- 正反向交通走廊只建一个 canonical；不得把 Chengdu→Chongqing 和 Chongqing→Chengdu 分成两页。
- 城市住宿页只比较区域/基地，不做酒店榜单、实时价格、实时房态或外宾接待保证。

## 中央整合门

每个分支交中央前必须同时满足：10 个唯一身份、10 个原子 commit、三语结构对应、来源与图片权利完整、无 canonical 冲突、typecheck/生成检查/定向测试/production build/diff-check真实记录、30个locale页面桌面与390px验收。任何共享硬编码计数由中央组合批次统一更新，写手不得各自改动。
