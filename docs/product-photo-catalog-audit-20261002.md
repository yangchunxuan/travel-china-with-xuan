# Homeground 已发布产品图片覆盖审计与逐日配图增补

审计基线：2026-10-02 worktree 中的已发布 `privateTourProducts`，共47产品；复核完成于2026-10-03。只新增 `lib/privateTourSceneMedia.ts` 和本说明；没有修改价格、产品正文、行程安排或图片文件，也没有下载或生成新图。产品聚合与UI由主代理接入。

## 结果与计数口径

| 项目 | 基线 | 本增补合并后 |
| --- | ---: | ---: |
| 已发布产品 | 47 | 47 |
| 英文行程日总数 | 414 | 414 |
| 有明确 day 分组的行程日 | 144 | 379 |
| 没有明确 day 分组的行程日 | 270 | 35 |

本增补为36产品写入293个 day 分组，其中235个此前没有图片分组；另58个本已有分组的日子增加正确景点或城市视角。共复用83个不同的已发布真实图片资产（30个沿用网站所有者图库授权，53个沿用现有署名与公开许可）。**379天“已覆盖”包含明确标记的目的地预览和可选行程图片，不等于379天都拥有该天每个景点的照片。** 接送日可以复用正确城市实景；图片不证明已订车辆、机场、酒店、船型或实时开放状态。

## 已证实的缺陷根因

1. 原产品页头只取 `heroImage + gallery`，多数产品只有两张，最多三张。即使 `routeMedia` 已有真正的逐日照片，也未加入页头浏览图库。
2. 原行程区缺少精确日图时，在已有 datedPhotos 中取“最近日期”。跨城市长线因此连续显示同一张图，甚至在已离开上一城市后仍显示上一城市照片。它无法根据英文行程实际地点判断图片。
3. 一旦有 datedPhotos，普通 gallery 不再参与缺图日选择；已有当地真实图没有对应到 day，导致资源有却看不到。
4. 基线 `withAdditionalMedia` 只 append + sort，同日未来可能出现多个分组；UI `.find(day)` 只取第一个。基线47产品没有重复 day 分组，所以这是接入此次增补时必须处理的合并隐患，而非基线已发生的重复分组故障。合并应按 day 聚合，保留所有不同 src/语义 variant。
5. 六张现有 gallery metadata 记录1600×1067，但实文件为1600×1000：故宫角楼、西安街巷、成都茶馆、桂林双塔、上海夜景和杭州茶园。本模块的拷贝数据已修正为实测尺寸；未改旧源文件。

## 配图策略及边界

- 按已发布英文 itinerary 的 slug/day 建立静态增补，运行时不猜景点，也不按“最近日期”跨城借图。
- 明确景点用该景点真实图：故宫、天坛、颐和园、兵马俑、西安城墙、熊猫基地、三星堆、乐山、外滩、豫园、拙政园、平江路、武陵源、天门山、凤凰、漓江、遇龙河、洱海、喜洲、石林、龙脊、瞿塘峡与巫峡等。
- 接送/列车/航班日只配实际出发或抵达目的地的图，客户可见说明简写为“主题 · 目的地一瞥”。一般景点只写主题，不追加重复免责声明。
- 选择上海或苏州、三星堆或其他轻松路线、大足或市区等，可选照片标“主题 · 备选行程”；不把所有选项写成已含服务。小团固定三星堆日用普通场景说明。
- 长城资产只证实北京附近长城风景，不能确认慕田峪具体段；caption使用“北京附近长城风景”。已有游轮照片不能确认订船；caption写“长江游轮示例船型 · 实际船名按航期确认”。
- “水乡后到上海”正文写同里或待确认水乡，因此没有用朱家角冒充同里；只补当天抵达上海的城市预览。杭州茶园图是梅家坞，不冒充具体龙井村；只作杭州茶园预览。
- 丝路私家团第14天可北京或上海东返，两者均只作为正文允许的选项；第15天出境城市未固定，保留无图，不擅自断定北京。
- 不同城市的山、水乡、寺庙、机场或雪场不可因为视觉相似替换。天池不能替代长白山滑雪；田螺坑不能替代承启楼；长白山天池不能替代新疆天山天池。

## 全部47产品覆盖

“新增覆盖”仅统计此前没有 day 分组的日子；“原图库”指hero+gallery去重路径数量，“独立图”指hero+gallery+routeMedia及本增补去重路径数量。

| 产品 slug | 天数 | 原图库 | 原独立图 | 独立图合并后 | 原已配日 | 新增覆盖 | 合并后已配日 | 未配日 |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
| `shanghai-suzhou-hangzhou-6-day-private-tour` | 6 | 3 | 9 | 9 | 6 | 0 | 6 | 无 |
| `chengdu-pandas-sanxingdui-5-day-private-tour` | 5 | 2 | 7 | 7 | 5 | 0 | 5 | 无 |
| `xian-terracotta-warriors-5-day-private-tour` | 5 | 2 | 7 | 7 | 5 | 0 | 5 | 无 |
| `chongqing-wulong-5-day-private-tour` | 5 | 2 | 7 | 7 | 5 | 0 | 5 | 无 |
| `guilin-yangshuo-5-day-private-tour` | 5 | 3 | 8 | 8 | 5 | 0 | 5 | 无 |
| `harbin-winter-5-day-private-tour` | 5 | 1 | 5 | 5 | 4 | 0 | 4 | D3 |
| `shanghai-suzhou-5-day-private-tour` | 5 | 3 | 8 | 8 | 5 | 0 | 5 | 无 |
| `beijing-highlights-5-day-private-tour` | 5 | 3 | 8 | 8 | 5 | 0 | 5 | 无 |
| `zhangjiajie-forest-4-day-private-tour` | 4 | 3 | 8 | 8 | 4 | 0 | 4 | 无 |
| `zhangjiajie-furong-fenghuang-7-day-private-tour` | 7 | 2 | 9 | 9 | 7 | 0 | 7 | 无 |
| `chengdu-jiuzhaigou-huanglong-6-day-private-tour` | 6 | 2 | 4 | 8 | 2 | 4 | 6 | 无 |
| `kunming-dali-lijiang-8-day-private-tour` | 8 | 2 | 4 | 7 | 2 | 6 | 8 | 无 |
| `guizhou-huangguoshu-libo-miao-7-day-private-tour` | 7 | 2 | 4 | 5 | 2 | 4 | 6 | D6 |
| `xiamen-tulou-quanzhou-6-day-private-tour` | 6 | 2 | 5 | 5 | 3 | 2 | 5 | D2 |
| `chaozhou-shantou-nanao-5-day-private-tour` | 5 | 3 | 6 | 6 | 3 | 2 | 5 | 无 |
| `chengdu-chongqing-8-day-private-tour` | 8 | 3 | 5 | 12 | 2 | 6 | 8 | 无 |
| `guangzhou-shunde-foshan-5-day-private-tour` | 5 | 3 | 5 | 5 | 2 | 3 | 5 | 无 |
| `huangshan-hongcun-huizhou-5-day-private-tour` | 5 | 2 | 4 | 4 | 2 | 1 | 3 | D4, D5 |
| `jingdezhen-wuyuan-wangxian-6-day-private-tour` | 6 | 2 | 4 | 4 | 2 | 2 | 4 | D4, D6 |
| `changbaishan-yanji-winter-6-day-private-tour` | 6 | 2 | 4 | 4 | 2 | 2 | 4 | D1, D2 |
| `shanghai-disneyland-5-day-private-tour` | 5 | 2 | 4 | 7 | 2 | 3 | 5 | 无 |
| `luoyang-dengfeng-kaifeng-6-day-private-tour` | 6 | 2 | 4 | 4 | 2 | 1 | 3 | D1, D5, D6 |
| `datong-pingyao-6-day-private-tour` | 6 | 2 | 4 | 4 | 2 | 1 | 3 | D1, D5, D6 |
| `zhangye-jiayuguan-dunhuang-7-day-private-tour` | 7 | 2 | 4 | 4 | 2 | 5 | 7 | 无 |
| `chongqing-yangtze-cruise-6-day-private-tour` | 6 | 2 | 4 | 6 | 2 | 3 | 5 | D6 |
| `xinjiang-ili-sayram-8-day-private-tour` | 8 | 2 | 4 | 4 | 2 | 3 | 5 | D1, D7, D8 |
| `hulunbuir-7-day-private-tour` | 7 | 2 | 4 | 4 | 2 | 0 | 2 | D1, D3, D5, D6, D7 |
| `kunming-jianshui-yuanyang-6-day-private-tour` | 6 | 2 | 4 | 5 | 2 | 4 | 6 | 无 |
| `shenzhen-family-tech-4-day-private-tour` | 4 | 2 | 4 | 4 | 2 | 2 | 4 | 无 |
| `beijing-xian-shanghai-12-day-private-tour` | 12 | 2 | 4 | 20 | 2 | 10 | 12 | 无 |
| `beijing-xian-chengdu-guilin-shanghai-14-day-private-tour` | 14 | 2 | 5 | 25 | 3 | 11 | 14 | 无 |
| `beijing-xian-chengdu-guilin-shanghai-14-day-small-group-tour` | 14 | 2 | 5 | 25 | 3 | 11 | 14 | 无 |
| `beijing-xian-zhangjiajie-guilin-shanghai-14-day-private-tour` | 14 | 2 | 5 | 23 | 3 | 11 | 14 | 无 |
| `beijing-xian-zhangjiajie-guilin-shanghai-14-day-small-group-tour` | 14 | 2 | 5 | 23 | 3 | 11 | 14 | 无 |
| `beijing-xian-chengdu-yangtze-cruise-shanghai-17-day-private-tour` | 17 | 2 | 5 | 30 | 3 | 14 | 17 | 无 |
| `beijing-xian-chengdu-yangtze-cruise-shanghai-17-day-small-group-tour` | 17 | 2 | 5 | 30 | 3 | 14 | 17 | 无 |
| `beijing-xian-silk-road-15-day-private-tour` | 15 | 2 | 5 | 17 | 3 | 7 | 10 | D10, D11, D12, D13, D15 |
| `beijing-xian-silk-road-15-day-small-group-tour` | 15 | 2 | 5 | 17 | 3 | 8 | 11 | D10, D11, D12, D13 |
| `beijing-xian-yunnan-14-day-private-tour` | 14 | 2 | 5 | 17 | 3 | 9 | 12 | D11, D12 |
| `beijing-xian-huangshan-hangzhou-shanghai-14-day-private-tour` | 14 | 2 | 5 | 23 | 3 | 11 | 14 | 无 |
| `china-grand-tour-21-day-private-tour` | 21 | 2 | 5 | 34 | 3 | 18 | 21 | 无 |
| `beijing-xian-guilin-shanghai-10-day-private-tour` | 10 | 2 | 5 | 20 | 3 | 7 | 10 | 无 |
| `beijing-hangzhou-suzhou-shanghai-11-day-private-tour` | 11 | 2 | 5 | 19 | 3 | 8 | 11 | 无 |
| `shanghai-zhangjiajie-fenghuang-guilin-13-day-private-tour` | 13 | 2 | 5 | 17 | 3 | 10 | 13 | 无 |
| `beijing-xian-shanghai-8-day-private-tour` | 8 | 2 | 5 | 16 | 3 | 5 | 8 | 无 |
| `beijing-xian-guilin-hong-kong-10-day-private-tour` | 10 | 2 | 5 | 15 | 3 | 7 | 10 | 无 |
| `beijing-xian-yangtze-cruise-shanghai-12-day-private-tour` | 12 | 2 | 5 | 23 | 3 | 9 | 12 | 无 |

## 确实缺少对应地点资产的35天

已经查过 `public/images` 的现有产品与guide文件、现有产品署名模块及 `docs/homeground-photo-provenance.md`。以下节点未找到可准确用于该日的已授权实景；应显示该日标题和文字空态，后续取得同地点真实照片再补。原来存在的同一线路其他日照片不等于这些节点已有照片。

### `harbin-winter-5-day-private-tour`

- D3：Winter culture day

正文为伏尔加庄园/冬季文化选择，现图库只有哈尔滨城市、教堂、冰雪大世界、站点；不能用冰雕冒充庄园。

### `guizhou-huangguoshu-libo-miao-7-day-private-tour`

- D6：Xijiang to Zhenyuan

未找到镇远古城/舞阳河实景；西江苗寨不是镇远。

### `xiamen-tulou-quanzhou-6-day-private-tour`

- D2：Chengqi Lou and overnight in Nanjing

没有承启楼或永定对应图；田螺坑土楼不能冒充承启楼，且行程中的南京指福建南靖。

### `huangshan-hongcun-huizhou-5-day-private-tour`

- D4：Xidi, Nanping and Guanlu, then Tangmo
- D5：Tangmo, Chengkan, Tangyue archways and departure

未找到西递/南屏/关麓/唐模/呈坎/棠樾对应图；宏村不能冒充这些古村。

### `jingdezhen-wuyuan-wangxian-6-day-private-tour`

- D4：Sanqingshan mountain day
- D6：Depart from Shangrao

没有三清山/上饶城市节点实景，不能以黄山或望仙谷替代。

### `changbaishan-yanji-winter-6-day-private-tour`

- D1：Arrive at Changbaishan resort
- D2：Beginner ski lesson and free snow time

没有本产品雪场/滑雪/度假村照片；长白山天池景观不代表雪场设施。

### `luoyang-dengfeng-kaifeng-6-day-private-tour`

- D1：Arrive in Zhengzhou
- D5：White Horse Temple and Luoyang
- D6：Depart Luoyang or Zhengzhou

未找到郑州城市节点/白马寺/可正确表示洛阳出发节点的照片；少林寺及龙门不能替代白马寺。

### `datong-pingyao-6-day-private-tour`

- D1：Arrive in Datong
- D5：Shanxi courtyard and Taiyuan
- D6：Jinci and departure

未找到大同城市抵达/太原院落/晋祠对应图；云冈或平遥不是太原、晋祠。

### `chongqing-yangtze-cruise-6-day-private-tour`

- D6：Three Gorges Dam and Yichang departure

没有三峡大坝/宜昌出发节点图；峡谷/船只不代表大坝或宜昌。

### `xinjiang-ili-sayram-8-day-private-tour`

- D1：Arrive in Urumqi
- D7：Return to Urumqi
- D8：Depart Urumqi

没有乌鲁木齐城市实景；赛里木湖/伊宁不能用于乌鲁木齐接送日。

### `hulunbuir-7-day-private-tour`

- D1：Arrive in Hailar
- D3：Wetland, reindeer culture and forest country
- D5：Border road to Manzhouli
- D6：Hulun Lake and return to Hailar
- D7：Depart Hailar

现图为莫日格勒河/恩和等草原视角，未找到海拉尔、具体湿地/驯鹿文化、满洲里、呼伦湖对应资产；不为形式重复草原冒充城镇/湖泊。

### `beijing-xian-silk-road-15-day-private-tour`

- D10：High-speed train to Turpan
- D11：The Turpan oasis
- D12：High-speed train to Urumqi
- D13：Heavenly Lake
- D15：Depart

吐鲁番、乌鲁木齐、天山天池没有对应资产；D15出境城市未确定，不能用北京作为已确认终点。

### `beijing-xian-silk-road-15-day-small-group-tour`

- D10：High-speed train to Turpan
- D11：The Turpan oasis
- D12：High-speed train to Urumqi
- D13：Heavenly Lake

吐鲁番、乌鲁木齐、天山天池没有对应资产；敦煌/赛里木湖或长白山天池不能替代。

### `beijing-xian-yunnan-14-day-private-tour`

- D11：Tiger Leaping Gorge to Shangri-La
- D12：Songzanlin Monastery and Pudacuo

没有虎跳峡、香格里拉松赞林寺/普达措照片；丽江古城/香格里拉火车站不能替代寺院和国家公园。

## 83个复用资产与授权继承

src沿用已发布文件，没有编辑或重新编码。公开许可资产把原作者、源页、许可名称和链接一并带入 `privateTourSceneCreditsBySlug`；聚合产品的credit模块应合并去重。`credit: null` 的图片是原网站授权图库，沿用现有本地图片授权说明，不编造CC许可。公开许可网页信息为本仓库已有记录，本任务没有把未核实新素材引入网站。

| key | 主题 | 现有文件 | 来源/原产品 | 署名与许可 |
| --- | --- | --- | --- | --- |
| `beijing-city` | 北京城市风景 | `/images/tours/beijing-highlights-5-day-private-tour/arrival-beijing-city-1600.webp` | `beijing-highlights-5-day-private-tour` | 原网站授权图库，见既有provenance登记 |
| `beijing-departure` | 北京城市风景 | `/images/tours/beijing-highlights-5-day-private-tour/departure-beijing-layers-1600.webp` | `beijing-highlights-5-day-private-tour` | 原网站授权图库，见既有provenance登记 |
| `forbidden-city` | 故宫 | `/images/tours/beijing-highlights-5-day-private-tour/forbidden-city-corridor-1600.webp` | `beijing-highlights-5-day-private-tour` | 原网站授权图库，见既有provenance登记 |
| `forbidden-tower` | 故宫角楼 | `/images/tours/beijing-highlights-5-day-private-tour/gallery-forbidden-corner-1600.webp` | `beijing-highlights-5-day-private-tour` | 原网站授权图库，见既有provenance登记 |
| `temple-heaven` | 天坛 | `/images/tours/beijing-highlights-5-day-private-tour/temple-of-heaven-2024-1600.webp` | `beijing-highlights-5-day-private-tour` | [xiquinhosilva / Xiquinho Silva](https://commons.wikimedia.org/wiki/File:Temple_of_Heaven_-_Hall_of_Prayer_for_Good_Harvests_01.jpg) · [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/) |
| `summer-palace` | 颐和园 | `/images/tours/beijing-hangzhou-suzhou-shanghai-11-day-private-tour/route-day-4.webp` | `beijing-hangzhou-suzhou-shanghai-11-day-private-tour` | 原网站授权图库，见既有provenance登记 |
| `great-wall` | 长城风景 | `/images/destinations/beijing/great-wall-1200.webp` | `beijing-highlights-5-day-private-tour` | 原网站授权图库，见既有provenance登记 |
| `xian-city` | 西安城市风景 | `/images/tours/xian-terracotta-warriors-5-day-private-tour/arrival-city-wall-1600.webp` | `xian-terracotta-warriors-5-day-private-tour` | 原网站授权图库，见既有provenance登记 |
| `xian-wall` | 西安城墙 | `/images/tours/beijing-xian-shanghai-8-day-private-tour/route-day-5.webp` | `beijing-xian-shanghai-8-day-private-tour` | 原网站授权图库，见既有provenance登记 |
| `terracotta` | 兵马俑 | `/images/destinations/xian/terracotta-pit-one-1200.webp` | `xian-terracotta-warriors-5-day-private-tour` | 原网站授权图库，见既有provenance登记 |
| `xian-food` | 西安老城街巷 | `/images/tours/xian-terracotta-warriors-5-day-private-tour/gallery-muslim-quarter-1600.webp` | `xian-terracotta-warriors-5-day-private-tour` | 原网站授权图库，见既有provenance登记 |
| `chengdu-city` | 成都城市风景 | `/images/destinations/chengdu/jinjiang-bridge-1200.webp` | `chengdu-pandas-sanxingdui-5-day-private-tour` | 原网站授权图库，见既有provenance登记 |
| `chengdu-departure` | 成都城市风景 | `/images/tours/chengdu-pandas-sanxingdui-5-day-private-tour/departure-chengdu-1600.webp` | `chengdu-pandas-sanxingdui-5-day-private-tour` | 原网站授权图库，见既有provenance登记 |
| `panda` | 成都熊猫基地 | `/images/tours/chengdu-pandas-sanxingdui-5-day-private-tour/hero-panda-1600.webp` | `chengdu-pandas-sanxingdui-5-day-private-tour` | [George Lu](https://commons.wikimedia.org/wiki/File:Panda_in_Chengdu_Research_Base_of_Giant_Panda_Breeding_-_7708872342.jpg) · [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/) |
| `teahouse` | 成都茶馆 | `/images/tours/chengdu-pandas-sanxingdui-5-day-private-tour/gallery-teahouse-1600.webp` | `chengdu-pandas-sanxingdui-5-day-private-tour` | 原网站授权图库，见既有provenance登记 |
| `sanxingdui` | 三星堆博物馆 | `/images/guides/sanxingdui-museum-booking-and-gallery-order/hero-1600.webp` | `chengdu-pandas-sanxingdui-5-day-private-tour` | [STW932](https://commons.wikimedia.org/wiki/File:New_Sandingdui_Museum_02.jpg) · [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) |
| `leshan` | 乐山大佛 | `/images/tours/chengdu-chongqing-8-day-private-tour/gallery-2.webp` | `chengdu-chongqing-8-day-private-tour` | [Ariel Steiner](https://commons.wikimedia.org/wiki/File:Leshan_Buddha_Statue_View.JPG) · [CC BY-SA 2.5](https://creativecommons.org/licenses/by-sa/2.5/) |
| `chongqing-city` | 重庆滨江风景 | `/images/tours/chongqing-wulong-5-day-private-tour/gallery-hongyadong-qiansimen-1600.webp` | `chongqing-wulong-5-day-private-tour` | 原网站授权图库，见既有provenance登记 |
| `chongqing-sunset` | 重庆城市风景 | `/images/tours/beijing-xian-yangtze-cruise-shanghai-12-day-private-tour/hero.webp` | `beijing-xian-yangtze-cruise-shanghai-12-day-private-tour` | 原网站授权图库，见既有provenance登记 |
| `liziba` | 李子坝轻轨 | `/images/tours/chongqing-wulong-5-day-private-tour/liziba-train-through-building-1600.webp` | `chongqing-wulong-5-day-private-tour` | [David290](https://commons.wikimedia.org/wiki/File:%E6%9D%8E%E5%AD%90%E5%9D%9D%E7%AB%99%E8%BD%BB%E8%BD%A8%E7%A9%BF%E6%A5%BC_0023.png) · [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) |
| `wulong` | 天生三桥 | `/images/destinations/chongqing/wulong-1200.webp` | `chongqing-wulong-5-day-private-tour` | [Brookqi](https://commons.wikimedia.org/wiki/File:Wulongtianshengsanqiao.JPG) · [Public Domain Mark](https://creativecommons.org/publicdomain/mark/1.0/) |
| `wulong-meadow` | 仙女山 | `/images/tours/chongqing-wulong-5-day-private-tour/route-day-4-extra.webp` | `chongqing-wulong-5-day-private-tour` | [杨志强Zhiqiang](https://commons.wikimedia.org/wiki/File:重庆武隆仙女山_-_panoramio.jpg) · [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/) |
| `cruise-ship` | 长江游轮 | `/images/tours/chongqing-yangtze-cruise-6-day-private-tour/gallery-1.webp` | `chongqing-yangtze-cruise-6-day-private-tour` | [Gaynor](https://commons.wikimedia.org/wiki/File:MV_Selina_Yangtze_River_Cruise_(12280525406).jpg) · [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/) |
| `qutang` | 瞿塘峡 | `/images/tours/chongqing-yangtze-cruise-6-day-private-tour/hero.webp` | `chongqing-yangtze-cruise-6-day-private-tour` | [Tan Wei Liang Byorn](https://commons.wikimedia.org/wiki/File:Qutang_Gorge_on_Changjiang.jpg) · [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/) |
| `wu-gorge` | 巫峡 | `/images/tours/chongqing-yangtze-cruise-6-day-private-tour/route-day-5-extra.webp` | `chongqing-yangtze-cruise-6-day-private-tour` | [Photnart](https://commons.wikimedia.org/wiki/File:Wu_Gorge_on_Yangtze.jpg) · [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) |
| `guilin-city` | 桂林城市风景 | `/images/tours/guilin-yangshuo-5-day-private-tour/route-day-5-extra.webp` | `guilin-yangshuo-5-day-private-tour` | [Chlukoe](https://commons.wikimedia.org/wiki/File:City_guilin_guangxi.jpg) · [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |
| `guilin-pagodas` | 桂林城市风景 | `/images/tours/guilin-yangshuo-5-day-private-tour/gallery-sun-moon-towers-1600.webp` | `guilin-yangshuo-5-day-private-tour` | 原网站授权图库，见既有provenance登记 |
| `li-river` | 漓江游船 | `/images/tours/guilin-yangshuo-5-day-private-tour/li-river-cruise-1600.webp` | `guilin-yangshuo-5-day-private-tour` | 原网站授权图库，见既有provenance登记 |
| `yulong` | 遇龙河乡村 | `/images/tours/guilin-yangshuo-5-day-private-tour/yulong-countryside-1600.webp` | `guilin-yangshuo-5-day-private-tour` | 原网站授权图库，见既有provenance登记 |
| `longji` | 龙脊梯田 | `/images/tours/shanghai-zhangjiajie-fenghuang-guilin-13-day-private-tour/gallery-1.webp` | `shanghai-zhangjiajie-fenghuang-guilin-13-day-private-tour` | 原网站授权图库，见既有provenance登记 |
| `shanghai-arrival` | 上海城市风景 | `/images/tours/shanghai-suzhou-hangzhou-6-day-private-tour/arrival-shanghai-1600.webp` | `shanghai-suzhou-hangzhou-6-day-private-tour` | 原网站授权图库，见既有provenance登记 |
| `shanghai-skyline` | 上海天际线 | `/images/tours/shanghai-suzhou-5-day-private-tour/shanghai-skyline-1600.webp` | `shanghai-suzhou-5-day-private-tour` | 原网站授权图库，见既有provenance登记 |
| `shanghai-bund` | 外滩 | `/images/destinations/shanghai/bund-architecture-1200.webp` | `shanghai-suzhou-hangzhou-6-day-private-tour` | 原网站授权图库，见既有provenance登记 |
| `shanghai-night` | 上海城市风景 | `/images/tours/shanghai-suzhou-5-day-private-tour/gallery-shanghai-night-1600.webp` | `shanghai-suzhou-5-day-private-tour` | 原网站授权图库，见既有provenance登记 |
| `shanghai-departure` | 上海城市风景 | `/images/tours/shanghai-suzhou-5-day-private-tour/departure-shanghai-1600.webp` | `shanghai-suzhou-5-day-private-tour` | 原网站授权图库，见既有provenance登记 |
| `yu-garden` | 豫园 | `/images/tours/shanghai-disneyland-5-day-private-tour/route-day-3.webp` | `shanghai-disneyland-5-day-private-tour` | [King of Hearts](https://commons.wikimedia.org/wiki/File:Yu_Garden_Shanghai_November_2017_002.jpg) · [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) |
| `french-concession` | 原法租界街巷 | `/images/tours/shanghai-disneyland-5-day-private-tour/route-day-4-extra.webp` | `shanghai-disneyland-5-day-private-tour` | [Fabio Achilli](https://commons.wikimedia.org/wiki/File:French_Concession,_Shanghai,_China_(9740638438).jpg) · [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/) |
| `disney` | 上海迪士尼 | `/images/tours/shanghai-disneyland-5-day-private-tour/hero.webp` | `shanghai-disneyland-5-day-private-tour` | [Josh Grenier](https://commons.wikimedia.org/wiki/File:18-03-12_ShanghaiDisney_013.jpg) · [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/) |
| `suzhou-garden` | 拙政园 | `/images/tours/shanghai-suzhou-5-day-private-tour/suzhou-humble-garden-1600.webp` | `shanghai-suzhou-5-day-private-tour` | [Chainwit.](https://commons.wikimedia.org/wiki/File:Humble_Administrator%27s_Garden_Suzhou_(2024)_-_img_01.jpg) · [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) |
| `pingjiang` | 平江路 | `/images/tours/shanghai-suzhou-hangzhou-6-day-private-tour/pingjiang-road-1600.webp` | `shanghai-suzhou-hangzhou-6-day-private-tour` | [kevinmcgill](https://commons.wikimedia.org/wiki/File:A_stone_arch_bridge_in_Pingjiang_Road,_Suzhou.jpg) · [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/) |
| `hangzhou-lake` | 西湖 | `/images/tours/beijing-hangzhou-suzhou-shanghai-11-day-private-tour/hero.webp` | `beijing-hangzhou-suzhou-shanghai-11-day-private-tour` | 原网站授权图库，见既有provenance登记 |
| `hangzhou-tea` | 杭州茶园风景 | `/images/tours/shanghai-suzhou-hangzhou-6-day-private-tour/gallery-hangzhou-tea-1600.webp` | `shanghai-suzhou-hangzhou-6-day-private-tour` | 原网站授权图库，见既有provenance登记 |
| `lingyin` | 飞来峰 | `/images/tours/shanghai-suzhou-hangzhou-6-day-private-tour/lingyin-feilai-peak-1600.webp` | `shanghai-suzhou-hangzhou-6-day-private-tour` | 原网站授权图库，见既有provenance登记 |
| `zhangjiajie-peaks` | 武陵源峰林 | `/images/tours/zhangjiajie-furong-fenghuang-7-day-private-tour/wulingyuan-peaks-1600.webp` | `zhangjiajie-furong-fenghuang-7-day-private-tour` | [颐园居](https://commons.wikimedia.org/wiki/File:Wulingyuan,_Zhangjiajie,_Hunan_20230702.jpg) · [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) |
| `zhangjiajie-tianzi` | 天子山 | `/images/tours/zhangjiajie-furong-fenghuang-7-day-private-tour/tianzi-mountain-panorama-1600.webp` | `zhangjiajie-furong-fenghuang-7-day-private-tour` | [Chensiyuan](https://commons.wikimedia.org/wiki/File:1_tianzishan_wulingyuan_zhangjiajie_2012.jpg) · [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) |
| `tianmen` | 天门山 | `/images/guides/zhangjiajie/tianmen-1600.jpg` | `zhangjiajie-forest-4-day-private-tour` | 原网站授权图库，见既有provenance登记 |
| `fenghuang` | 凤凰古城 | `/images/guides/border-town-fenghuang-chadong-shen-congwen/hero-1600.webp` | `zhangjiajie-furong-fenghuang-7-day-private-tour` | [xiquinhosilva](https://commons.wikimedia.org/wiki/File:%E5%87%A4%E5%87%B0%E5%8F%A4%E5%9F%8E_2024-06-22_18.jpg) · [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) |
| `fenghuang-river` | 凤凰沱江 | `/images/guides/border-town-fenghuang-chadong-shen-congwen/tuojiang-stepping-stones-1126.webp` | `zhangjiajie-furong-fenghuang-7-day-private-tour` | [Yu Hui (于回)](https://commons.wikimedia.org/wiki/File:Fenghuang_Ancient_Town.jpg) · [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/) |
| `kunming` | 昆明翠湖 | `/images/tours/kunming-jianshui-yuanyang-6-day-private-tour/route-day-1.webp` | `kunming-jianshui-yuanyang-6-day-private-tour` | [Daderot](https://commons.wikimedia.org/wiki/File:Green_Lake_Park,_Kunming,_China_-_DSC03430.JPG) · [Public domain](https://creativecommons.org/publicdomain/mark/1.0/) |
| `stone-forest` | 石林 | `/images/tours/beijing-xian-yunnan-14-day-private-tour/gallery-1.webp` | `beijing-xian-yunnan-14-day-private-tour` | 原网站授权图库，见既有provenance登记 |
| `dali-erhai` | 洱海 | `/images/tours/kunming-dali-lijiang-8-day-private-tour/gallery-1.webp` | `kunming-dali-lijiang-8-day-private-tour` | [Mx. Granger](https://commons.wikimedia.org/wiki/File:Tree_in_front_of_Erhai_Lake.jpg) · [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |
| `xizhou` | 喜洲 | `/images/tours/beijing-xian-yunnan-14-day-private-tour/route-day-8.webp` | `beijing-xian-yunnan-14-day-private-tour` | 原网站授权图库，见既有provenance登记 |
| `lijiang` | 丽江古城 | `/images/tours/kunming-dali-lijiang-8-day-private-tour/hero.webp` | `kunming-dali-lijiang-8-day-private-tour` | [CEphoto, Uwe Aranas](https://commons.wikimedia.org/wiki/File:Lijiang_Yunnan_Old-town-03.jpg) · [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/) |
| `jade-dragon` | 玉龙雪山 | `/images/tours/beijing-xian-yunnan-14-day-private-tour/route-day-10-extra.webp` | `beijing-xian-yunnan-14-day-private-tour` | [钉钉](https://commons.wikimedia.org/wiki/File:Jade_Dragon_Snow_Mountain,_Yunnan.jpg) · [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) |
| `xijiang` | 西江苗寨 | `/images/tours/guizhou-huangguoshu-libo-miao-7-day-private-tour/hero.webp` | `guizhou-huangguoshu-libo-miao-7-day-private-tour` | [SONG1907](https://commons.wikimedia.org/wiki/File:Xijiang_Miao_Village.jpg) · [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) |
| `xiamen` | 厦门鼓浪屿 | `/images/tours/xiamen-tulou-quanzhou-6-day-private-tour/hero.webp` | `xiamen-tulou-quanzhou-6-day-private-tour` | [Jakob Montrasio](https://commons.wikimedia.org/wiki/File:Gulangyu.jpg) · [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/) |
| `quanzhou` | 泉州开元寺 | `/images/tours/xiamen-tulou-quanzhou-6-day-private-tour/route-day-2.webp` | `xiamen-tulou-quanzhou-6-day-private-tour` | [Windmemories](https://commons.wikimedia.org/wiki/File:20230129_Twin_pagodas_of_Kaiyuan_Temple.jpg) · [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) |
| `shantou` | 汕头老城 | `/images/tours/chaozhou-shantou-nanao-5-day-private-tour/route-day-3.webp` | `chaozhou-shantou-nanao-5-day-private-tour` | [Sgnpkd](https://commons.wikimedia.org/wiki/File:Xiaogongyuan.jpg) · [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) |
| `chaozhou-street` | 潮州老城 | `/images/tours/chaozhou-shantou-nanao-5-day-private-tour/gallery-2.webp` | `chaozhou-shantou-nanao-5-day-private-tour` | [Windmemories](https://commons.wikimedia.org/wiki/File:20230206_Taiping_Road,_Chaozhou.jpg) · [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) |
| `guangzhou` | 广州城市风景 | `/images/tours/guangzhou-shunde-foshan-5-day-private-tour/hero.webp` | `guangzhou-shunde-foshan-5-day-private-tour` | [Daniel Lu（User:dllu）](https://commons.wikimedia.org/wiki/File:Canton_Tower_at_night_Guangzhou_2024_dllu.jpg) · [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) |
| `qinghui` | 清晖园 | `/images/tours/guangzhou-shunde-foshan-5-day-private-tour/gallery-2.webp` | `guangzhou-shunde-foshan-5-day-private-tour` | [古海岸遗址](https://commons.wikimedia.org/wiki/File:Foshan_Shunde_Qinghui_Yuan_2024-05-11_16.12.39.jpg) · [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) |
| `huangshan` | 黄山风景 | `/images/tours/huangshan-hongcun-huizhou-5-day-private-tour/hero.webp` | `huangshan-hongcun-huizhou-5-day-private-tour` | [Francesco Bandarin](https://commons.wikimedia.org/wiki/File:Mount_Huangshan-110978.jpg) · [CC BY-SA 3.0 IGO](https://creativecommons.org/licenses/by-sa/3.0/igo/) |
| `jingdezhen` | 景德镇御窑博物馆 | `/images/tours/jingdezhen-wuyuan-wangxian-6-day-private-tour/gallery-1.webp` | `jingdezhen-wuyuan-wangxian-6-day-private-tour` | [Zhu Pei](https://commons.wikimedia.org/wiki/File:02-Jingdezhen_Imperial_Kiln_Museum.jpg) · [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) |
| `wangxian` | 望仙谷 | `/images/tours/jingdezhen-wuyuan-wangxian-6-day-private-tour/hero.webp` | `jingdezhen-wuyuan-wangxian-6-day-private-tour` | [茅野ふたば](https://commons.wikimedia.org/wiki/File:Wangxiangu_Scenic_Area_-_25_(July_19,_2025).jpg) · [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) |
| `yanji-night` | 延吉城市风景 | `/images/tours/changbaishan-yanji-winter-6-day-private-tour/gallery-1.webp` | `changbaishan-yanji-winter-6-day-private-tour` | [EditQ](https://commons.wikimedia.org/wiki/File:Yanji_at_night.jpg) · [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) |
| `yanji-signs` | 延吉街区 | `/images/tours/changbaishan-yanji-winter-6-day-private-tour/route-day-2.webp` | `changbaishan-yanji-winter-6-day-private-tour` | [Liuxingy](https://commons.wikimedia.org/wiki/File:%E5%BB%B6%E5%90%89_%E5%BB%B6%E8%BE%B9%E5%A4%A7%E5%AD%A6%E7%BD%91%E7%BA%A2%E5%A2%99.jpg) · [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) |
| `shaolin` | 少林寺 | `/images/tours/luoyang-dengfeng-kaifeng-6-day-private-tour/gallery-1.webp` | `luoyang-dengfeng-kaifeng-6-day-private-tour` | [Gary Todd](https://commons.wikimedia.org/wiki/File:Shaolin_Temple_(10199309404).jpg) · [CC0](https://creativecommons.org/publicdomain/zero/1.0/) |
| `pingyao` | 平遥古城 | `/images/tours/datong-pingyao-6-day-private-tour/gallery-1.webp` | `datong-pingyao-6-day-private-tour` | [Chensiyuan](https://commons.wikimedia.org/wiki/File:1_pingyao_ancient_city_aerial_pano_2019.jpg) · [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) |
| `zhangye` | 张掖丹霞 | `/images/tours/zhangye-jiayuguan-dunhuang-7-day-private-tour/hero.webp` | `zhangye-jiayuguan-dunhuang-7-day-private-tour` | [Marcus Hsu](https://commons.wikimedia.org/wiki/File:Zhangye_Danxia_2016.jpg) · [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) |
| `jiayuguan` | 嘉峪关关城 | `/images/tours/zhangye-jiayuguan-dunhuang-7-day-private-tour/gallery-1.webp` | `zhangye-jiayuguan-dunhuang-7-day-private-tour` | [Doron](https://commons.wikimedia.org/wiki/File:JiayuguanFort.jpg) · [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/) |
| `dunhuang` | 鸣沙山与月牙泉 | `/images/tours/zhangye-jiayuguan-dunhuang-7-day-private-tour/route-day-6.webp` | `zhangye-jiayuguan-dunhuang-7-day-private-tour` | [xiquinhosilva](https://commons.wikimedia.org/wiki/File:Mingsha_Mountain_and_Crescent_Moon_Spring_(54532735713).jpg) · [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/) |
| `mogao` | 莫高窟外景 | `/images/tours/zhangye-jiayuguan-dunhuang-7-day-private-tour/route-day-5-extra.webp` | `zhangye-jiayuguan-dunhuang-7-day-private-tour` | [Tom Thai / eviltomthai](https://commons.wikimedia.org/wiki/File:Mogao_Caves_Exterior_And_Chambers.jpeg) · [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/) |
| `sayram` | 赛里木湖 | `/images/tours/xinjiang-ili-sayram-8-day-private-tour/hero.webp` | `xinjiang-ili-sayram-8-day-private-tour` | [Tomskyhaha](https://commons.wikimedia.org/wiki/File:In_Lake_Sayram_Scenic_Spot,_Xinjiang,_China_27.jpg) · [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) |
| `nalati` | 那拉提草原 | `/images/tours/xinjiang-ili-sayram-8-day-private-tour/gallery-1.webp` | `xinjiang-ili-sayram-8-day-private-tour` | [Yoshi Canopus](https://commons.wikimedia.org/wiki/File:Nalati_Grassland_4,_Xinjiang,_China.jpg) · [CC0](https://creativecommons.org/publicdomain/zero/1.0/) |
| `yining` | 伊宁伊犁河 | `/images/tours/xinjiang-ili-sayram-8-day-private-tour/route-day-3.webp` | `xinjiang-ili-sayram-8-day-private-tour` | [Charlie Qi](https://commons.wikimedia.org/wiki/File:Along_the_Ili_River,_Yining,_Xinjiang_2020-10-03.jpg) · [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) |
| `jianshui` | 建水文庙 | `/images/tours/kunming-jianshui-yuanyang-6-day-private-tour/gallery-1.webp` | `kunming-jianshui-yuanyang-6-day-private-tour` | [Vmenkov](https://commons.wikimedia.org/wiki/File:Jianshui_Confucian_Temple_-_P1360947.JPG) · [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/) |
| `yuanyang` | 元阳梯田 | `/images/tours/kunming-jianshui-yuanyang-6-day-private-tour/hero.webp` | `kunming-jianshui-yuanyang-6-day-private-tour` | [Takeaway](https://commons.wikimedia.org/wiki/File:2007_12_02_yuanyang_rice_terraces_sunset.jpg) · [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/) |
| `shenzhen` | 深圳福田天际线 | `/images/tours/shenzhen-family-tech-4-day-private-tour/hero.webp` | `shenzhen-family-tech-4-day-private-tour` | [Vikarna](https://commons.wikimedia.org/wiki/File:Futian_20220624.jpg) · [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) |
| `shenzhen-museum` | 深圳科学技术馆 | `/images/tours/shenzhen-family-tech-4-day-private-tour/gallery-1.webp` | `shenzhen-family-tech-4-day-private-tour` | [GuoaMeni KammueDu](https://commons.wikimedia.org/wiki/File:SZ_%E6%B7%B1%E5%9C%B3_Shenzhen_%E5%85%89%E6%98%8E%E5%8D%80_Guangming_%E6%B7%B1%E5%9C%B3%E7%A7%91%E5%AD%B8%E6%8A%80%E8%A1%93%E9%A4%A8_Shenzhen_Science_%26_Technology_Museum_tour_May_2025_R12S_19.jpg) · [CC0](https://creativecommons.org/publicdomain/zero/1.0/) |
| `hong-kong` | 香港海港 | `/images/tours/beijing-xian-guilin-hong-kong-10-day-private-tour/route-day-9-extra.webp` | `beijing-xian-guilin-hong-kong-10-day-private-tour` | [Mustang Joe (Joe deSousa)](https://commons.wikimedia.org/wiki/File:Hong_Kong_Skyline1.jpg) · [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |
| `jiuzhaigou-preview` | 九寨沟山谷 | `/images/tours/chengdu-jiuzhaigou-huanglong-6-day-private-tour/hero.webp` | `chengdu-jiuzhaigou-huanglong-6-day-private-tour` | [Chensiyuan](https://commons.wikimedia.org/wiki/File:1_jiuzhaigou_valley_wu_hua_hai_2011b.jpg) · [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) |
| `dazu` | 大足石刻 | `/images/destinations/chongqing/dazu-1200.webp` | `docs/homeground-photo-provenance.md` | [JL Cogburn](https://commons.wikimedia.org/wiki/File:Dazu_rock_carvings_-_Baodingshan,_大足石刻-宝顶山摩崖造像,_Chongqing,_2023_(53563776088).jpg) · [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/) |
| `guiyang` | 贵阳城市风景 | `/images/guides/guiyang-nanming-old-city-day-to-night-walk/hero-1600.webp` | `public/images/guides/guiyang-nanming-old-city-day-to-night-walk/image-plan.json` | [FN-082](https://commons.wikimedia.org/wiki/File:%E7%94%B2%E7%A7%80%E6%A5%BC%E5%A4%9C%E6%99%AF%EF%BC%8C%E8%B4%B5%E5%B7%9E_202403_2.jpg) · [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) |

## 接入与验证

`privateTourSceneMediaBySlug` 导出 slug/day 逐日照片；`privateTourSceneCreditsBySlug` 导出相应公开许可署名；`privateTourSceneAssets` 保留准确src、尺寸、来源及授权依据；`privateTourSceneMediaCoverage` 保存基线和合并后计数。只作类型 import，避免与产品注册表形成运行时循环。

所有83资产均检查文件存在与实际尺寸，credit字段齐全，EN/ZH/KO数据均有内容。所有293新增分组均位于对应产品的有效行程日内。跨产品复用前按照明确地点和英文日行程核对，原产品已有的独立照片保留；同城接送日允许复用。浏览器交互、多语言、署名区及构建验收由主代理在聚合接入后执行。
