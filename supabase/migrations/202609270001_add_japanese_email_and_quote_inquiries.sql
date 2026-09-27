-- Add Japanese to email-only and private-tour quote intake. Generated-route
-- and destination inquiries retain their existing three-language contract.
begin;

alter table homeground_private.inquiries
  drop constraint if exists inquiries_locale_check;
alter table homeground_private.inquiries
  add constraint inquiries_locale_check check (
    locale in ('en', 'zh', 'ko')
    or (locale = 'ja' and (
      (entry_path = 'homepage_email' and route_id = 'homepage-email')
      or (entry_path = 'private_tour_quote' and route_id = 'private-tour-quote')
    ))
  );

-- The traffic collector RPC gets its Japanese allowlist separately. These
-- constraints permit atomic attribution after that collector is updated.
alter table homeground_private.traffic_sessions
  drop constraint if exists traffic_sessions_locale_check;
alter table homeground_private.traffic_sessions
  add constraint traffic_sessions_locale_check
    check (locale in ('en', 'zh', 'ko', 'ja'));
alter table homeground_private.inquiry_traffic_attribution
  drop constraint if exists inquiry_traffic_attribution_locale_check;
alter table homeground_private.inquiry_traffic_attribution
  add constraint inquiry_traffic_attribution_locale_check
    check (locale in ('en', 'zh', 'ko', 'ja'));

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
    else null
  end;
$$;

create or replace function public.create_homeground_inquiry(
  p_schema_version smallint,
  p_form_version text,
  p_locale text,
  p_journey_id uuid,
  p_journey_revision integer,
  p_route_id text,
  p_rule_version text,
  p_answers jsonb,
  p_route_snapshot jsonb,
  p_contact_channel text,
  p_contact_email text,
  p_contact_phone_e164 text,
  p_note text,
  p_privacy_notice_version text,
  p_landing_path text,
  p_attribution jsonb,
  p_idempotency_key_hash text,
  p_payload_hash text,
  p_rate_limit_subject_hash text,
  p_short_rate_limit integer,
  p_daily_rate_limit integer,
  p_first_response_due_at timestamptz
)
returns jsonb
language plpgsql
security definer
set search_path = pg_catalog, public, extensions, homeground_private
as $$
declare
  existing_inquiry homeground_private.inquiries%rowtype;
  created_inquiry homeground_private.inquiries%rowtype;
  candidate_reference text;
  reference_attempt integer;
  rate_limit_result jsonb;
begin
  if p_schema_version <> 1
    or p_locale is null or p_locale not in ('en', 'zh', 'ko', 'ja')
    or (p_locale = 'ja' and (p_route_id is null or p_route_id not in ('homepage-email', 'private-tour-quote')))
    or p_journey_revision < 1
    or jsonb_typeof(p_answers) <> 'object'
    or jsonb_typeof(p_route_snapshot) <> 'object'
    or p_contact_channel not in ('email', 'whatsapp')
    or p_idempotency_key_hash !~ '^[0-9a-f]{64}$'
    or p_payload_hash !~ '^[0-9a-f]{64}$'
    or (
      p_rate_limit_subject_hash is not null
      and p_rate_limit_subject_hash !~ '^[0-9a-f]{64}$'
    )
    or p_short_rate_limit < 1
    or p_daily_rate_limit < 1
  then
    raise exception using
      errcode = '22023',
      message = 'invalid inquiry RPC input';
  end if;

  perform pg_advisory_xact_lock(hashtextextended(p_idempotency_key_hash, 0));

  select *
    into existing_inquiry
    from homeground_private.inquiries
    where idempotency_key_hash = p_idempotency_key_hash
    for update;

  if found then
    if existing_inquiry.payload_hash <> p_payload_hash then
      return jsonb_build_object(
        'outcome', 'idempotency_conflict'
      );
    end if;

    return jsonb_build_object(
      'outcome', 'replay',
      'inquiryId', existing_inquiry.inquiry_id,
      'publicReference', existing_inquiry.public_reference,
      'receivedAt', existing_inquiry.created_at
    );
  end if;

  -- Idempotent replays are resolved before consuming an IP rate-limit slot.
  -- This is deliberately inside the same transaction and behind the same
  -- advisory lock as persistence, so a concurrent replay cannot be rejected
  -- as a new rate-limited submission.
  if p_rate_limit_subject_hash is not null then
    rate_limit_result :=
      homeground_private.consume_inquiry_rate_limit(
        p_rate_limit_subject_hash,
        p_short_rate_limit,
        p_daily_rate_limit
      );

    if not coalesce((rate_limit_result ->> 'allowed')::boolean, false) then
      return jsonb_build_object(
        'outcome', 'rate_limited',
        'retryAfter',
          greatest((rate_limit_result ->> 'retryAfter')::integer, 1)
      );
    end if;
  end if;

  for reference_attempt in 1..5 loop
    candidate_reference :=
      homeground_private.generate_public_reference();
    exit when not exists (
      select 1
        from homeground_private.inquiries
        where public_reference = candidate_reference
    );
  end loop;

  if candidate_reference is null or exists (
    select 1
      from homeground_private.inquiries
      where public_reference = candidate_reference
  ) then
    raise exception using
      errcode = '23505',
      message = 'unable to allocate public reference';
  end if;

  insert into homeground_private.inquiries (
    public_reference,
    schema_version,
    form_version,
    entry_path,
    locale,
    journey_id,
    journey_revision,
    route_id,
    rule_version,
    answers_json,
    route_snapshot_json,
    contact_channel,
    contact_email,
    contact_phone_e164,
    note,
    privacy_notice_version,
    landing_path,
    attribution_json,
    first_response_due_at,
    idempotency_key_hash,
    payload_hash
  )
  values (
    candidate_reference,
    p_schema_version,
    p_form_version,
    case
      when p_locale = 'ja' and p_route_id = 'homepage-email' then 'homepage_email'
      when p_locale = 'ja' and p_route_id = 'private-tour-quote' then 'private_tour_quote'
      else 'generated_route'
    end,
    p_locale,
    p_journey_id,
    p_journey_revision,
    p_route_id,
    p_rule_version,
    p_answers,
    p_route_snapshot,
    p_contact_channel,
    p_contact_email,
    p_contact_phone_e164,
    p_note,
    p_privacy_notice_version,
    p_landing_path,
    coalesce(p_attribution, '{}'::jsonb),
    p_first_response_due_at,
    p_idempotency_key_hash,
    p_payload_hash
  )
  returning * into created_inquiry;

  insert into homeground_private.notification_outbox (
    inquiry_id
  )
  values (
    created_inquiry.inquiry_id
  );

  return jsonb_build_object(
    'outcome', 'created',
    'inquiryId', created_inquiry.inquiry_id,
    'publicReference', created_inquiry.public_reference,
    'receivedAt', created_inquiry.created_at
  );
end;
$$;

create or replace function public.create_homeground_homepage_email_v1(
  p_schema_version smallint,
  p_form_version text,
  p_locale text,
  p_contact_email text,
  p_privacy_notice_version text,
  p_landing_path text,
  p_attribution jsonb,
  p_idempotency_key_hash text,
  p_payload_hash text,
  p_rate_limit_subject_hash text,
  p_short_rate_limit integer,
  p_daily_rate_limit integer,
  p_first_response_due_at timestamptz
)
returns jsonb
language plpgsql
security definer
set search_path = pg_catalog, public, extensions, homeground_private
as $$
declare
  result jsonb;
  normalized_email text := trim(p_contact_email);
  product_slug text := p_attribution #>> '{productInterest,slug}';
  expected_product_name text;
  expected_attribution jsonb;
  expected_product_interest jsonb;
  product_selection jsonb := p_attribution #> '{productInterest,selection}';
  expected_selection jsonb;
  selected_travelers integer;
  homepage_answers jsonb;
  technical_snapshot jsonb := jsonb_build_object(
    'kind', 'homepage-email',
    'informationStatus', 'not_provided',
    'ruleVersion', '2026-07-26.1'
  );
begin
  expected_product_name := homeground_private.private_tour_product_name_v1(
    product_slug, p_locale
  );

  if expected_product_name is not null then
    expected_product_interest := jsonb_build_object(
      'slug', product_slug,
      'name', expected_product_name
    );
    if (p_attribution -> 'productInterest') ? 'selection' then
      selected_travelers := case product_selection -> 'travelers'
        when '2'::jsonb then 2
        when '4'::jsonb then 4
        when '6'::jsonb then 6
        else null
      end;
      if jsonb_typeof(product_selection) is distinct from 'object'
        or jsonb_typeof(product_selection -> 'packageId') is distinct from 'string'
        or jsonb_typeof(product_selection -> 'travelers') is distinct from 'number'
        or not homeground_private.is_valid_private_tour_selection_v1(
          product_slug, product_selection ->> 'packageId', selected_travelers
        )
      then
        raise exception using errcode = '22023', message = 'invalid homepage product selection';
      end if;
      expected_selection := jsonb_build_object(
        'packageId', product_selection ->> 'packageId',
        'travelers', product_selection -> 'travelers'
      );
      if product_selection is distinct from expected_selection then
        raise exception using errcode = '22023', message = 'invalid homepage product selection';
      end if;
      expected_product_interest := expected_product_interest
        || jsonb_build_object('selection', expected_selection);
    end if;
  end if;

  expected_attribution := case
    when p_attribution = '{}'::jsonb then '{}'::jsonb
    when expected_product_interest is not null then
      jsonb_build_object('productInterest', expected_product_interest)
    else null
  end;

  if p_schema_version is distinct from 3
    or p_form_version is distinct from '2026-07-26.1'
    or p_privacy_notice_version is distinct from '2026-07-26.1'
    or p_locale is null
    or p_locale not in ('en', 'zh', 'ko', 'ja')
    or p_landing_path is distinct from (
      case p_locale
        when 'en' then '/'
        when 'zh' then '/zh/'
        when 'ko' then '/ko/'
        when 'ja' then '/ja/'
        else null
      end
    )
    or p_attribution is null
    or jsonb_typeof(p_attribution) is distinct from 'object'
    or expected_attribution is null
    or p_attribution is distinct from expected_attribution
    or p_contact_email is null
    or char_length(normalized_email) not between 3 and 254
    or normalized_email !~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'
    or position(chr(10) in normalized_email) > 0
    or position(chr(13) in normalized_email) > 0
    or p_idempotency_key_hash is null
    or p_payload_hash is null
    or p_rate_limit_subject_hash is null
    or p_short_rate_limit is null
    or p_short_rate_limit < 1
    or p_daily_rate_limit is null
    or p_daily_rate_limit < 1
    or p_first_response_due_at is null
  then
    raise exception using errcode = '22023', message = 'invalid homepage email input';
  end if;

  homepage_answers := jsonb_build_object('informationStatus', 'not_provided')
    || expected_attribution;

  result := public.create_homeground_inquiry(
    1::smallint,
    '2026-07-18.1',
    p_locale,
    gen_random_uuid(),
    1,
    'homepage-email',
    '2026-07-26.1',
    homepage_answers,
    technical_snapshot,
    'email',
    normalized_email,
    null,
    null,
    p_privacy_notice_version,
    p_landing_path,
    '{}'::jsonb,
    p_idempotency_key_hash,
    p_payload_hash,
    p_rate_limit_subject_hash,
    p_short_rate_limit,
    p_daily_rate_limit,
    p_first_response_due_at
  );

  if (result ->> 'outcome') in ('created', 'replay') then
    update homeground_private.inquiries
      set
        schema_version = p_schema_version,
        form_version = p_form_version,
        entry_path = 'homepage_email',
        rule_version = p_form_version,
        answers_json = homepage_answers,
        route_snapshot_json = technical_snapshot,
        attribution_json = '{}'::jsonb
      where inquiry_id = (result ->> 'inquiryId')::uuid;
  end if;

  return result;
end;
$$;

create or replace function public.create_homeground_private_tour_quote_v1(
  p_schema_version smallint,
  p_form_version text,
  p_locale text,
  p_contact_email text,
  p_product_interest jsonb,
  p_travel_date text,
  p_note text,
  p_privacy_notice_version text,
  p_landing_path text,
  p_idempotency_key_hash text,
  p_payload_hash text,
  p_rate_limit_subject_hash text,
  p_short_rate_limit integer,
  p_daily_rate_limit integer,
  p_first_response_due_at timestamptz
)
returns jsonb
language plpgsql
security definer
set search_path = pg_catalog, public, extensions, homeground_private
as $$
declare
  result jsonb;
  normalized_email text := trim(p_contact_email);
  product_slug text := p_product_interest ->> 'slug';
  expected_product_name text;
  expected_product_interest jsonb;
  product_selection jsonb := p_product_interest -> 'selection';
  expected_selection jsonb;
  selected_travelers integer;
  quote_answers jsonb;
  technical_snapshot jsonb := jsonb_build_object(
    'kind', 'private-tour-quote', 'ruleVersion', '2026-09-10.1'
  );
begin
  expected_product_name := homeground_private.private_tour_product_name_v1(
    product_slug, p_locale
  );

  if expected_product_name is not null then
    expected_product_interest := jsonb_build_object(
      'slug', product_slug,
      'name', expected_product_name
    );
    if p_product_interest ? 'selection' then
      selected_travelers := case product_selection -> 'travelers'
        when '2'::jsonb then 2
        when '4'::jsonb then 4
        when '6'::jsonb then 6
        else null
      end;
      if jsonb_typeof(product_selection) is distinct from 'object'
        or jsonb_typeof(product_selection -> 'packageId') is distinct from 'string'
        or jsonb_typeof(product_selection -> 'travelers') is distinct from 'number'
        or not homeground_private.is_valid_private_tour_selection_v1(
          product_slug, product_selection ->> 'packageId', selected_travelers
        )
      then
        raise exception using errcode = '22023', message = 'invalid quote product selection';
      end if;
      expected_selection := jsonb_build_object(
        'packageId', product_selection ->> 'packageId',
        'travelers', product_selection -> 'travelers'
      );
      if product_selection is distinct from expected_selection then
        raise exception using errcode = '22023', message = 'invalid quote product selection';
      end if;
      expected_product_interest := expected_product_interest
        || jsonb_build_object('selection', expected_selection);
    end if;
  end if;

  if p_schema_version is distinct from 4
    or p_form_version is distinct from '2026-09-10.1'
    or p_privacy_notice_version is distinct from '2026-07-26.1'
    or p_locale is null or p_locale not in ('en', 'zh', 'ko', 'ja')
    or jsonb_typeof(p_product_interest) is distinct from 'object'
    or expected_product_interest is null
    or p_product_interest is distinct from expected_product_interest
    or p_landing_path is distinct from (
      case p_locale when 'en' then '/' when 'zh' then '/zh/' when 'ko' then '/ko/' when 'ja' then '/ja/' end
      || 'tours/' || product_slug || '/'
    )
    or p_contact_email is null
    or char_length(normalized_email) not between 3 and 254
    or normalized_email !~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'
    or normalized_email ~ '[[:cntrl:]]'
    or (p_note is not null and (
      char_length(p_note) not between 1 and 1000
      or p_note <> btrim(p_note)
      or p_note ~ U&'[\0001-\0008\000B-\001F\007F-\009F\061C\200E\200F\202A-\202E\2066-\2069]'
    ))
    or p_idempotency_key_hash is null
    or p_payload_hash is null
    or p_rate_limit_subject_hash is null
    or p_short_rate_limit is null or p_short_rate_limit < 1
    or p_daily_rate_limit is null or p_daily_rate_limit < 1
    or p_first_response_due_at is null
  then
    raise exception using errcode = '22023', message = 'invalid private tour quote input';
  end if;

  if p_travel_date is not null then
    if p_travel_date !~ '^[0-9]{4}-[0-9]{2}-[0-9]{2}$'
      or left(p_travel_date, 4) = '0000'
    then
      raise exception using errcode = '22023', message = 'invalid requested travel date';
    end if;
    if to_char(p_travel_date::date, 'YYYY-MM-DD') is distinct from p_travel_date then
      raise exception using errcode = '22023', message = 'invalid requested travel date';
    end if;
  end if;

  quote_answers := jsonb_build_object(
    'productInterest', expected_product_interest,
    'travelDate', p_travel_date,
    'landingPath', p_landing_path
  );
  result := public.create_homeground_inquiry(
    1::smallint, '2026-07-18.1', p_locale, gen_random_uuid(), 1,
    'private-tour-quote', '2026-09-10.1', quote_answers, technical_snapshot,
    'email', normalized_email, null, p_note,
    p_privacy_notice_version, p_landing_path, '{}'::jsonb,
    p_idempotency_key_hash, p_payload_hash, p_rate_limit_subject_hash,
    p_short_rate_limit, p_daily_rate_limit, p_first_response_due_at
  );
  if result ->> 'outcome' = 'created' then
    update homeground_private.inquiries
      set schema_version = p_schema_version, form_version = p_form_version,
          entry_path = 'private_tour_quote', rule_version = p_form_version
      where inquiry_id = (result ->> 'inquiryId')::uuid;
  end if;
  return result;
end;
$$;

commit;
