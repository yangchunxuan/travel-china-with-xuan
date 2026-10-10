-- Add the five-city 13-day quote-only route to the canonical inquiry name allowlist.
-- Carry forward the complete 202610100001 Jiangnan function byte-for-byte and add
-- one identity. The existing price-selection helper remains unchanged: this route
-- has no published price row and submits no priced selection.
-- Apply after 202610100001_add_jiangnan_quote_route.sql.
begin;

create or replace function homeground_private.private_tour_product_name_v1(
  p_slug text, p_locale text
) returns text
language sql immutable set search_path = pg_catalog
as $$
  select case p_slug
    when 'shanghai-suzhou-hangzhou-6-day-private-tour' then case p_locale
      when 'en' then 'Shanghai, Suzhou & Hangzhou: 6-Day Private Tour'
      when 'zh' then '上海·苏州·杭州 6 天 5 晚私家团'
      when 'ko' then '상하이·쑤저우·항저우 6일 프라이빗 투어'
      when 'ja' then '上海・蘇州・杭州 6日間プライベートツアー'
      else null end
    when 'chengdu-pandas-sanxingdui-5-day-private-tour' then case p_locale
      when 'en' then 'Chengdu, Pandas & Sanxingdui: 5-Day Private Tour'
      when 'zh' then '成都·大熊猫·三星堆 5 天 4 晚私家团'
      when 'ko' then '청두·판다·싼싱두이 5일 프라이빗 투어'
      when 'ja' then '成都・パンダ・三星堆 5日間（4泊）プライベートツアー'
      else null end
    when 'xian-terracotta-warriors-5-day-private-tour' then case p_locale
      when 'en' then 'Xi''an & the Terracotta Warriors: 5-Day Private Tour'
      when 'zh' then '西安·兵马俑 5 天 4 晚私家团'
      when 'ko' then '시안·병마용 5일 프라이빗 투어'
      when 'ja' then '西安・兵馬俑 5日間（4泊）プライベートツアー'
      else null end
    when 'chongqing-wulong-5-day-private-tour' then case p_locale
      when 'en' then 'Chongqing & Wulong: 5-Day Private Tour'
      when 'zh' then '重庆·武隆 5 天 4 晚私家团'
      when 'ko' then '충칭·우룽 5일 프라이빗 투어'
      when 'ja' then '重慶・武隆 5日間（4泊）プライベートツアー'
      else null end
    when 'guilin-yangshuo-5-day-private-tour' then case p_locale
      when 'en' then 'Guilin & Yangshuo: 5-Day Private Tour'
      when 'zh' then '桂林·阳朔 5 天 4 晚私家团'
      when 'ko' then '구이린·양숴 5일 프라이빗 투어'
      when 'ja' then '桂林・陽朔 5日間（4泊）プライベートツアー'
      else null end
    when 'harbin-winter-5-day-private-tour' then case p_locale
      when 'en' then 'Harbin Ice & Snow: 5-Day Private Tour'
      when 'zh' then '哈尔滨冰雪 5 天 4 晚私家团'
      when 'ko' then '하얼빈 빙설 5일 프라이빗 투어'
      when 'ja' then 'ハルビン氷雪 5日間（4泊）プライベートツアー'
      else null end
    when 'shanghai-suzhou-5-day-private-tour' then case p_locale
      when 'en' then 'Shanghai & Suzhou: 5-Day Private Tour'
      when 'zh' then '上海·苏州 5 天 4 晚私家团'
      when 'ko' then '상하이·쑤저우 5일 프라이빗 투어'
      when 'ja' then '上海・蘇州 5日間（4泊）プライベートツアー'
      else null end
    when 'beijing-highlights-5-day-private-tour' then case p_locale
      when 'en' then 'Beijing Highlights: 5-Day Private Tour'
      when 'zh' then '北京经典 5 天 4 晚私家团'
      when 'ko' then '베이징 핵심 5일 프라이빗 투어'
      when 'ja' then '北京の見どころ 5日間（4泊）プライベートツアー'
      else null end
    when 'zhangjiajie-forest-4-day-private-tour' then case p_locale
      when 'en' then 'Zhangjiajie Forest: 4-Day Fixed-Route Private Tour'
      when 'zh' then '张家界森林公园 4 天 3 晚固定路线私家团'
      when 'ko' then '장자제 국립삼림공원 4일 고정 코스 프라이빗 투어'
      when 'ja' then '張家界森林公園 4日間（3泊）固定ルートのプライベートツアー'
      else null end
    when 'zhangjiajie-furong-fenghuang-7-day-private-tour' then case p_locale
      when 'en' then 'Zhangjiajie, Furong Town & Fenghuang: 7-Day Private Tour'
      when 'zh' then '张家界、芙蓉镇与凤凰 7 天 6 晚私家团'
      when 'ko' then '장자제, 푸룽전, 펑황 6박 7일 프라이빗 투어'
      when 'ja' then '張家界・芙蓉鎮・鳳凰 7日間（6泊）プライベートツアー'
      else null end
    when 'zhangjiajie-4-day-private-tour' then case p_locale
      when 'en' then 'Zhangjiajie in 4 Days: Peaks, Glass Bridge and Tianmen Mountain'
      when 'zh' then '张家界4天3晚：峰林、玻璃桥与天门山'
      when 'ko' then '장자제 4일 3박: 사암 봉우리와 유리다리, 톈먼산'
      when 'ja' then '張家界4日間｜奇岩の峰林・ガラス橋・天門山'
      else null end
    when 'chengdu-jiuzhaigou-huanglong-6-day-private-tour' then case p_locale
      when 'en' then 'Chengdu, Jiuzhaigou & Huanglong: 6-Day Private Tour'
      when 'zh' then '成都·九寨沟·黄龙 6 天 5 晚私家团'
      when 'ko' then '청두·주자이거우·황룽 6일 프라이빗 투어'
      when 'ja' then '成都・九寨溝・黄龍 6日間（5泊）プライベートツアー'
      else null end
    when 'kunming-dali-lijiang-8-day-private-tour' then case p_locale
      when 'en' then 'Kunming, Dali & Lijiang: 8-Day Private Tour'
      when 'zh' then '昆明·大理·丽江 8 天 7 晚私家团'
      when 'ko' then '쿤밍·다리·리장 8일 프라이빗 투어'
      when 'ja' then '昆明・大理・麗江 8日間（7泊）プライベートツアー'
      else null end
    when 'guizhou-huangguoshu-libo-miao-7-day-private-tour' then case p_locale
      when 'en' then 'Guiyang, Huangguoshu, Libo, Xijiang & Zhenyuan: 7-Day Private Tour'
      when 'zh' then '贵阳·黄果树·荔波·西江苗寨·镇远 7 天 6 晚私家团'
      when 'ko' then '구이양·황궈수·리보·시장·전위안 7일 프라이빗 투어'
      when 'ja' then '貴陽・黄果樹・荔波・西江・鎮遠 7日間（6泊）プライベートツアー'
      else null end
    when 'xiamen-tulou-quanzhou-6-day-private-tour' then case p_locale
      when 'en' then 'Xiamen, Fujian Tulou, Anxi & Quanzhou: 6-Day Private Tour'
      when 'zh' then '厦门·福建土楼·安溪·泉州 6 天 5 晚私家团'
      when 'ko' then '샤먼·푸젠 토루·안시·취안저우 6일 프라이빗 투어'
      when 'ja' then '厦門・福建土楼・安渓・泉州 6日間（5泊）プライベートツアー'
      else null end
    when 'chaozhou-shantou-nanao-5-day-private-tour' then case p_locale
      when 'en' then 'Shantou, Nan''ao & Chaozhou: 5-Day Private Tour'
      when 'zh' then '汕头·南澳·潮州 5 天 4 晚私家团'
      when 'ko' then '산터우·난아오·차오저우 5일 프라이빗 투어'
      when 'ja' then '汕頭・南澳島・潮州 5日間（4泊）プライベートツアー'
      else null end
    when 'chengdu-chongqing-8-day-private-tour' then case p_locale
      when 'en' then 'Chengdu, Leshan, Chongqing, Wulong & Dazu: 8-Day Private Tour'
      when 'zh' then '成都·乐山·重庆·武隆·大足 8 天 7 晚私家团'
      when 'ko' then '청두·러산·충칭·우룽·대족 8일 프라이빗 투어'
      when 'ja' then '成都・楽山・重慶・武隆・大足 8日間（7泊）プライベートツアー'
      else null end
    when 'guangzhou-shunde-foshan-5-day-private-tour' then case p_locale
      when 'en' then 'Guangzhou, Shunde & Foshan: 5-Day Private Tour'
      when 'zh' then '广州·顺德·佛山 5 天 4 晚私家团'
      when 'ko' then '광저우·순더·포산 5일 프라이빗 투어'
      when 'ja' then '広州・順徳・仏山 5日間（4泊）プライベートツアー'
      else null end
    when 'huangshan-hongcun-huizhou-5-day-private-tour' then case p_locale
      when 'en' then 'Huangshan, Hongcun & Huizhou: 5-Day Private Tour'
      when 'zh' then '黄山·宏村·徽州 5 天 4 晚私家团'
      when 'ko' then '황산·홍춘·후이저우 5일 프라이빗 투어'
      when 'ja' then '黄山・宏村・徽州 5日間（4泊）プライベートツアー'
      else null end
    when 'jingdezhen-wuyuan-wangxian-6-day-private-tour' then case p_locale
      when 'en' then 'Jingdezhen, Wuyuan, Sanqingshan & Wangxian Valley: 6-Day Private Tour'
      when 'zh' then '景德镇·婺源·三清山·望仙谷 6 天 5 晚私家团'
      when 'ko' then '징더전·우위안·삼청산·왕셴구 6일 프라이빗 투어'
      when 'ja' then '景徳鎮・婺源・三清山・望仙谷 6日間（5泊）プライベートツアー'
      else null end
    when 'changbaishan-yanji-winter-6-day-private-tour' then case p_locale
      when 'en' then 'Changbaishan Resort, North Slope & Yanji: 6-Day Winter Private Tour'
      when 'zh' then '长白山度假区·北坡·延吉 6 天 5 晚冬季私家团'
      when 'ko' then '창바이산·북파·옌지 6일 겨울 프라이빗 투어'
      when 'ja' then '長白山リゾート・北坡・延吉 冬の6日間（5泊）プライベートツアー'
      else null end
    when 'shanghai-disneyland-5-day-private-tour' then case p_locale
      when 'en' then 'Shanghai & Disneyland: 5-Day Private Tour'
      when 'zh' then '上海与迪士尼 5 天 4 晚私家团'
      when 'ko' then '상하이·디즈니랜드 5일 프라이빗 투어'
      when 'ja' then '上海・ディズニーランド 5日間（4泊）プライベートツアー'
      else null end
    when 'luoyang-dengfeng-kaifeng-6-day-private-tour' then case p_locale
      when 'en' then 'Luoyang, Dengfeng & Kaifeng: 6-Day Private Tour'
      when 'zh' then '洛阳·登封·开封 6 天 5 晚私家团'
      when 'ko' then '뤄양·덩펑·카이펑 6일 프라이빗 투어'
      when 'ja' then '洛陽・登封・開封 6日間（5泊）プライベートツアー'
      else null end
    when 'datong-pingyao-6-day-private-tour' then case p_locale
      when 'en' then 'Datong & Pingyao: 6-Day Private Tour'
      when 'zh' then '大同·平遥 6 天 5 晚私家团'
      when 'ko' then '다퉁·핑야오 6일 프라이빗 투어'
      when 'ja' then '大同・平遥 6日間（5泊）プライベートツアー'
      else null end
    when 'zhangye-jiayuguan-dunhuang-7-day-private-tour' then case p_locale
      when 'en' then 'Zhangye, Jiayuguan & Dunhuang: 7-Day Private Tour'
      when 'zh' then '张掖·嘉峪关·敦煌 7 天 6 晚私家团'
      when 'ko' then '장예·자위관·둔황 7일 프라이빗 투어'
      when 'ja' then '張掖・嘉峪関・敦煌 7日間（6泊）プライベートツアー'
      else null end
    when 'chongqing-yangtze-cruise-6-day-private-tour' then case p_locale
      when 'en' then 'Chongqing & Yangtze Three Gorges: 6-Day Private Tour'
      when 'zh' then '重庆与长江三峡游轮 6 天 5 晚私家团'
      when 'ko' then '충칭·창장삼협 크루즈 6일 프라이빗 투어'
      when 'ja' then '重慶と長江三峡 6日間プライベートツアー'
      else null end
    when 'xinjiang-ili-sayram-8-day-private-tour' then case p_locale
      when 'en' then 'Ili, Sayram Lake & Nalati: 8-Day Private Tour'
      when 'zh' then '伊犁·赛里木湖·那拉提 8 天 7 晚私家团'
      when 'ko' then '이리·싸이리무호·나라티 8일 프라이빗 투어'
      when 'ja' then '伊犁・賽里木湖・那拉提 8日間（7泊）プライベートツアー'
      else null end
    when 'hulunbuir-7-day-private-tour' then case p_locale
      when 'en' then 'Hulunbuir Grassland & Forest: 7-Day Private Tour'
      when 'zh' then '呼伦贝尔草原与森林 7 天 6 晚私家团'
      when 'ko' then '후룬베이얼 초원·숲 7일 프라이빗 투어'
      when 'ja' then 'フルンボイル（呼倫貝爾）草原・森林 7日間（6泊）プライベートツアー'
      else null end
    when 'kunming-jianshui-yuanyang-6-day-private-tour' then case p_locale
      when 'en' then 'Kunming, Jianshui & Yuanyang: 6-Day Private Tour'
      when 'zh' then '昆明·建水·元阳 6 天 5 晚私家团'
      when 'ko' then '쿤밍·젠수이·위안양 6일 프라이빗 투어'
      when 'ja' then '昆明・建水・元陽 6日間（5泊）プライベートツアー'
      else null end
    when 'shenzhen-family-tech-4-day-private-tour' then case p_locale
      when 'en' then 'Shenzhen Family Science & Technology: 4-Day Private Tour'
      when 'zh' then '深圳亲子科技 4 天 3 晚私家团'
      when 'ko' then '선전 가족 과학·기술 4일 프라이빗 투어'
      when 'ja' then '深圳・親子で楽しむ科学とテクノロジー 4日間（3泊）プライベートツアー'
      else null end
    when 'beijing-xian-shanghai-12-day-private-tour' then case p_locale
      when 'en' then 'Beijing, Xi''an & Shanghai: 12-Day Private Tour'
      when 'zh' then '北京·西安·上海 12 天 11 晚私家团'
      when 'ko' then '베이징·시안·상하이 12일 프라이빗 투어'
      when 'ja' then '北京・西安・上海 12日間（11泊）プライベートツアー'
      else null end
    when 'beijing-xian-chengdu-guilin-shanghai-14-day-private-tour' then case p_locale
      when 'en' then 'Beijing, Xi''an, Chengdu, Guilin & Shanghai: 14-Day Private Tour'
      when 'zh' then '北京·西安·成都·桂林·上海 14 天 13 晚私家团'
      when 'ko' then '베이징·시안·청두·구이린·상하이 14일 프라이빗 투어'
      when 'ja' then '北京・西安・成都・桂林・上海 14日間（13泊）プライベートツアー'
      else null end
    when 'beijing-xian-chengdu-guilin-shanghai-14-day-small-group-tour' then case p_locale
      when 'en' then 'Beijing, Xi''an, Chengdu, Guilin & Shanghai: 14-Day Small-Group Tour'
      when 'zh' then '北京·西安·成都·桂林·上海 14 天 13 晚小团'
      when 'ko' then '베이징·시안·청두·구이린·상하이 14일 소규모 그룹 투어'
      when 'ja' then '北京・西安・成都・桂林・上海 14日間 少人数ツアー'
      else null end
    when 'beijing-xian-zhangjiajie-guilin-shanghai-14-day-private-tour' then case p_locale
      when 'en' then 'Beijing, Xi''an, Zhangjiajie, Guilin & Shanghai: 14-Day Private Tour'
      when 'zh' then '北京·西安·张家界·桂林·上海 14 天 13 晚私家团'
      when 'ko' then '베이징·시안·장가계·구이린·상하이 14일 프라이빗 투어'
      when 'ja' then '北京・西安・張家界・桂林・上海 14日間（13泊）プライベートツアー'
      else null end
    when 'beijing-xian-chengdu-yangtze-cruise-shanghai-17-day-private-tour' then case p_locale
      when 'en' then 'Beijing, Xi''an, Chengdu, Yangtze Cruise & Shanghai: 17-Day Private Tour'
      when 'zh' then '北京·西安·成都·长江游轮·上海 17 天 16 晚私家团'
      when 'ko' then '베이징·시안·청두·양쯔강 크루즈·상하이 17일 프라이빗 투어'
      when 'ja' then '北京・西安・成都・長江クルーズ・上海 17日間プライベートツアー'
      else null end
    when 'beijing-xian-silk-road-15-day-private-tour' then case p_locale
      when 'en' then 'Beijing, Xi''an & the Silk Road: 15-Day Private Tour'
      when 'zh' then '北京·西安·丝绸之路 15 天 14 晚私家团'
      when 'ko' then '베이징·시안·실크로드 15일 프라이빗 투어'
      when 'ja' then '北京・西安・シルクロード 15日間（14泊）プライベートツアー'
      else null end
    when 'beijing-xian-yunnan-14-day-private-tour' then case p_locale
      when 'en' then 'Beijing, Xi''an & Yunnan: 14-Day Private Tour'
      when 'zh' then '北京·西安·云南 14 天 13 晚私家团'
      when 'ko' then '베이징·시안·윈난 14일 프라이빗 투어'
      when 'ja' then '北京・西安・雲南 14日間（13泊）プライベートツアー'
      else null end
    when 'beijing-xian-huangshan-hangzhou-shanghai-14-day-private-tour' then case p_locale
      when 'en' then 'Beijing, Xi''an, Yellow Mountain, Hangzhou & Shanghai: 14-Day Private Tour'
      when 'zh' then '北京·西安·黄山·杭州·上海 14 天 13 晚私家团'
      when 'ko' then '베이징·시안·황산·항저우·상하이 14일 프라이빗 투어'
      when 'ja' then '北京・西安・黄山・杭州・上海 14日間（13泊）プライベートツアー'
      else null end
    when 'china-grand-tour-21-day-private-tour' then case p_locale
      when 'en' then 'Grand China with Zhangjiajie & the Yangtze: 21-Day Private Tour'
      when 'zh' then '中国全景：含张家界与长江游轮 21 天 20 晚私家团'
      when 'ko' then '장가계·양쯔강 크루즈를 포함한 중국 일주 21일 프라이빗 투어'
      when 'ja' then '北京・西安・桂林・張家界・長江三峡・上海 21日間プライベートツアー'
      else null end
    when 'beijing-xian-zhangjiajie-guilin-shanghai-14-day-small-group-tour' then case p_locale
      when 'en' then 'Beijing, Xi''an, Zhangjiajie, Guilin & Shanghai: 14-Day Small-Group Tour'
      when 'zh' then '北京·西安·张家界·桂林·上海 14 天 13 晚小团'
      when 'ko' then '베이징·시안·장가계·구이린·상하이 14일 소규모 그룹 투어'
      when 'ja' then '北京・西安・張家界・桂林・上海 14日間 少人数ツアー'
      else null end
    when 'beijing-xian-chengdu-yangtze-cruise-shanghai-17-day-small-group-tour' then case p_locale
      when 'en' then 'Beijing, Xi''an, Chengdu, Yangtze Cruise & Shanghai: 17-Day Small-Group Tour'
      when 'zh' then '北京·西安·成都·长江游轮·上海 17 天 16 晚小团'
      when 'ko' then '베이징·시안·청두·양쯔강 크루즈·상하이 17일 소규모 그룹 투어'
      when 'ja' then '北京・西安・成都・長江クルーズ・上海 17日間 少人数ツアー'
      else null end
    when 'beijing-xian-silk-road-15-day-small-group-tour' then case p_locale
      when 'en' then 'Beijing, Xi''an & the Silk Road: 15-Day Small-Group Tour'
      when 'zh' then '北京·西安·丝绸之路 15 天 14 晚小团'
      when 'ko' then '베이징·시안·실크로드 15일 소규모 그룹 투어'
      when 'ja' then '北京・西安・シルクロード 15日間 少人数ツアー'
      else null end
    when 'beijing-xian-guilin-shanghai-10-day-private-tour' then case p_locale
      when 'en' then 'Beijing, Xi''an, Guilin & Shanghai: 10-Day Private Tour'
      when 'zh' then '北京·西安·桂林·上海 10 天 9 晚私家团'
      when 'ko' then '베이징·시안·구이린·상하이 10일 프라이빗 투어'
      when 'ja' then '北京・西安・桂林・上海 10日間（9泊）プライベートツアー'
      else null end
    when 'beijing-hangzhou-suzhou-shanghai-11-day-private-tour' then case p_locale
      when 'en' then 'Beijing, Hangzhou, Suzhou & Shanghai: 11-Day Private Tour'
      when 'zh' then '北京·杭州·苏州·上海 11 天 10 晚私家团'
      when 'ko' then '베이징·항저우·쑤저우·상하이 11일 프라이빗 투어'
      when 'ja' then '北京・杭州・蘇州・上海 11日間（10泊）プライベートツアー'
      else null end
    when 'shanghai-zhangjiajie-fenghuang-guilin-13-day-private-tour' then case p_locale
      when 'en' then 'Shanghai, Zhangjiajie, Fenghuang & Guilin: 13-Day Private Tour'
      when 'zh' then '上海·张家界·凤凰·桂林 13 天 12 晚私家团'
      when 'ko' then '상하이·장가계·봉황·구이린 13일 프라이빗 투어'
      when 'ja' then '上海・張家界・鳳凰・桂林 13日間（12泊）プライベートツアー'
      else null end
    when 'beijing-xian-shanghai-8-day-private-tour' then case p_locale
      when 'en' then 'Beijing, Xi''an & Shanghai: 8-Day Private Tour'
      when 'zh' then '北京·西安·上海 8 天 7 晚私家团'
      when 'ko' then '베이징·시안·상하이 8일 프라이빗 투어'
      when 'ja' then '北京・西安・上海 8日間（7泊）プライベートツアー'
      else null end
    when 'beijing-xian-guilin-hong-kong-10-day-private-tour' then case p_locale
      when 'en' then 'Beijing, Xi''an, Guilin & Hong Kong: 10-Day Private Tour'
      when 'zh' then '北京·西安·桂林·香港 10 天 9 晚私家团'
      when 'ko' then '베이징·시안·구이린·홍콩 10일 프라이빗 투어'
      when 'ja' then '北京・西安・桂林・香港 10日間（9泊）プライベートツアー'
      else null end
    when 'beijing-xian-yangtze-cruise-shanghai-12-day-private-tour' then case p_locale
      when 'en' then 'Beijing, Xi''an, Yangtze Cruise & Shanghai: 12-Day Private Tour'
      when 'zh' then '北京·西安·长江游轮·上海 12 天 11 晚私家团'
      when 'ko' then '베이징·시안·양쯔강 크루즈·상하이 12일 프라이빗 투어'
      when 'ja' then '北京・西安・長江クルーズ・上海 12日間プライベートツアー'
      else null end
    when 'harbin-yabuli-snow-town-6-day-private-tour' then case p_locale
      when 'en' then 'Harbin, Yabuli & Snow Town: 6-Day Winter Private Tour'
      when 'zh' then '哈尔滨·亚布力·雪乡 6 天 5 晚冬季私家团'
      when 'ko' then '하얼빈·야부리·설향 6일 겨울 프라이빗 투어'
      when 'ja' then 'ハルビン・亜布力・雪郷 6日間（5泊）冬季プライベートツアー'
      else null end
    when 'harbin-snow-town-changbaishan-yanji-8-day-private-tour' then case p_locale
      when 'en' then 'Harbin, Yabuli, Snow Town, Changbai Mountain & Yanji: 8-Day Winter Private Tour'
      when 'zh' then '哈尔滨·亚布力·雪乡·长白山·延吉 8 天 7 晚冬季私家团'
      when 'ko' then '하얼빈·야부리·설향·창바이산·옌지 8일 겨울 프라이빗 투어'
      when 'ja' then 'ハルビン・亜布力・雪郷・長白山・延吉 8日間（7泊）冬季プライベートツアー'
      else null end
    when 'harbin-mohe-arctic-village-7-day-private-tour' then case p_locale
      when 'en' then 'Harbin, Mohe, Beihong & Arctic Village: 7-Day Winter Private Tour'
      when 'zh' then '哈尔滨·漠河·北红村·北极村 7 天 6 晚冬季私家团'
      when 'ko' then '하얼빈·모허·베이훙촌·북극촌 7일 겨울 프라이빗 투어'
      when 'ja' then 'ハルビン・漠河・北紅村・北極村 7日間（6泊）冬季プライベートツアー'
      else null end
    when 'harbin-snow-town-mohe-9-day-private-tour' then case p_locale
      when 'en' then 'Harbin, Yabuli, Snow Town & Mohe: 9-Day Winter Private Tour'
      when 'zh' then '哈尔滨·亚布力·雪乡·漠河 9 天 8 晚冬季私家团'
      when 'ko' then '하얼빈·야부리·설향·모허 9일 겨울 프라이빗 투어'
      when 'ja' then 'ハルビン・亜布力・雪郷・漠河 9日間（8泊）冬季プライベートツアー'
      else null end
    when 'yanji-changbaishan-wanda-6-day-private-tour' then case p_locale
      when 'en' then 'Yanji, Changbai Mountain & Wanda Resort: 6-Day Winter Private Tour'
      when 'zh' then '延吉·长白山·万达度假区 6 天 5 晚冬季私家团'
      when 'ko' then '연길·백두산·완다 리조트 6일 겨울 프라이빗 투어'
      when 'ja' then '延吉・長白山・ワンダリゾート 6日間（5泊）冬季プライベートツアー'
      else null end
    when 'suzhou-tongli-hangzhou-shanghai-12-day-private-tour' then case p_locale
      when 'en' then 'Jiangnan, The Art of Living: 12 Days in Suzhou, Tongli, Hangzhou & Shanghai'
      when 'zh' then '江南，生活的艺术｜苏州·同里·杭州·上海 12 天私家旅程'
      when 'ko' then '중국 강남, 물길에 머무는 12일｜쑤저우·퉁리·항저우·상하이 프라이빗 여행'
      when 'ja' then '江南、暮らしの芸術｜蘇州・同里・杭州・上海12日間プライベートツアー'
      else null end
    when 'beijing-xian-chengdu-guilin-shanghai-13-day-private-tour' then case p_locale
      when 'en' then 'Beijing, Xi''an, Chengdu, Guilin & Shanghai: 13-Day Private Tour'
      when 'zh' then '北京·西安·成都·桂林·上海 13 天 12 晚私家团'
      when 'ko' then '베이징·시안·청두·계림·상하이 13일 프라이빗 투어'
      when 'ja' then '北京・西安・成都・桂林・上海 13日間（12泊）プライベートツアー'
      else null end
    else null
  end;
$$;

revoke all on function homeground_private.private_tour_product_name_v1(text, text)
  from public, anon, authenticated, service_role;

commit;
