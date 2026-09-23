-- Forward migration for the second ten Homeground private-tour products.
-- The public inquiry RPCs and traffic validator already delegate product
-- identity and selection checks to these two private helper functions.

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
      else null end
    when 'chengdu-pandas-sanxingdui-5-day-private-tour' then case p_locale
      when 'en' then 'Chengdu, Pandas & Sanxingdui: 5-Day Private Tour'
      when 'zh' then '成都·大熊猫·三星堆 5 天 4 晚私家团'
      when 'ko' then '청두·판다·싼싱두이 5일 프라이빗 투어'
      else null end
    when 'xian-terracotta-warriors-5-day-private-tour' then case p_locale
      when 'en' then 'Xi''an & the Terracotta Warriors: 5-Day Private Tour'
      when 'zh' then '西安·兵马俑 5 天 4 晚私家团'
      when 'ko' then '시안·병마용 5일 프라이빗 투어'
      else null end
    when 'chongqing-wulong-5-day-private-tour' then case p_locale
      when 'en' then 'Chongqing & Wulong: 5-Day Private Tour'
      when 'zh' then '重庆·武隆 5 天 4 晚私家团'
      when 'ko' then '충칭·우룽 5일 프라이빗 투어'
      else null end
    when 'guilin-yangshuo-5-day-private-tour' then case p_locale
      when 'en' then 'Guilin & Yangshuo: 5-Day Private Tour'
      when 'zh' then '桂林·阳朔 5 天 4 晚私家团'
      when 'ko' then '구이린·양숴 5일 프라이빗 투어'
      else null end
    when 'harbin-winter-5-day-private-tour' then case p_locale
      when 'en' then 'Harbin Ice & Snow: 5-Day Private Tour'
      when 'zh' then '哈尔滨冰雪 5 天 4 晚私家团'
      when 'ko' then '하얼빈 빙설 5일 프라이빗 투어'
      else null end
    when 'shanghai-suzhou-5-day-private-tour' then case p_locale
      when 'en' then 'Shanghai & Suzhou: 5-Day Private Tour'
      when 'zh' then '上海·苏州 5 天 4 晚私家团'
      when 'ko' then '상하이·쑤저우 5일 프라이빗 투어'
      else null end
    when 'beijing-highlights-5-day-private-tour' then case p_locale
      when 'en' then 'Beijing Highlights: 5-Day Private Tour'
      when 'zh' then '北京经典 5 天 4 晚私家团'
      when 'ko' then '베이징 핵심 5일 프라이빗 투어'
      else null end
    when 'zhangjiajie-forest-4-day-private-tour' then case p_locale
      when 'en' then 'Zhangjiajie Forest: 4-Day Fixed-Route Private Tour'
      when 'zh' then '张家界森林公园 4 天 3 晚固定路线私家团'
      when 'ko' then '장자제 국립삼림공원 4일 고정 코스 프라이빗 투어'
      else null end
    when 'zhangjiajie-furong-fenghuang-7-day-private-tour' then case p_locale
      when 'en' then 'Zhangjiajie, Furong Town & Fenghuang: 7-Day Private Tour'
      when 'zh' then '张家界、芙蓉镇与凤凰 7 天 6 晚私家团'
      when 'ko' then '장자제, 푸룽전, 펑황 6박 7일 프라이빗 투어'
      else null end
    when 'zhangjiajie-4-day-private-tour' then case p_locale
      when 'en' then 'Zhangjiajie in 4 Days: Peaks, Glass Bridge and Tianmen Mountain'
      when 'zh' then '张家界4天3晚：峰林、玻璃桥与天门山'
      when 'ko' then '장자제 4일 3박: 사암 봉우리와 유리다리, 톈먼산'
      else null end
    when 'chengdu-jiuzhaigou-huanglong-6-day-private-tour' then case p_locale
      when 'en' then 'Chengdu, Jiuzhaigou & Huanglong: 6-Day Private Tour'
      when 'zh' then '成都·九寨沟·黄龙 6 天 5 晚私家团'
      when 'ko' then '청두·주자이거우·황룽 6일 프라이빗 투어'
      else null end
    when 'kunming-dali-lijiang-8-day-private-tour' then case p_locale
      when 'en' then 'Kunming, Dali & Lijiang: 8-Day Private Tour'
      when 'zh' then '昆明·大理·丽江 8 天 7 晚私家团'
      when 'ko' then '쿤밍·다리·리장 8일 프라이빗 투어'
      else null end
    when 'guizhou-huangguoshu-libo-miao-7-day-private-tour' then case p_locale
      when 'en' then 'Guiyang, Huangguoshu, Libo, Xijiang & Zhenyuan: 7-Day Private Tour'
      when 'zh' then '贵阳·黄果树·荔波·西江苗寨·镇远 7 天 6 晚私家团'
      when 'ko' then '구이양·황궈수·리보·시장·전위안 7일 프라이빗 투어'
      else null end
    when 'xiamen-tulou-quanzhou-6-day-private-tour' then case p_locale
      when 'en' then 'Xiamen, Fujian Tulou, Anxi & Quanzhou: 6-Day Private Tour'
      when 'zh' then '厦门·福建土楼·安溪·泉州 6 天 5 晚私家团'
      when 'ko' then '샤먼·푸젠 토루·안시·취안저우 6일 프라이빗 투어'
      else null end
    when 'chaozhou-shantou-nanao-5-day-private-tour' then case p_locale
      when 'en' then 'Shantou, Nan''ao & Chaozhou: 5-Day Private Tour'
      when 'zh' then '汕头·南澳·潮州 5 天 4 晚私家团'
      when 'ko' then '산터우·난아오·차오저우 5일 프라이빗 투어'
      else null end
    when 'chengdu-chongqing-8-day-private-tour' then case p_locale
      when 'en' then 'Chengdu, Leshan, Chongqing, Wulong & Dazu: 8-Day Private Tour'
      when 'zh' then '成都·乐山·重庆·武隆·大足 8 天 7 晚私家团'
      when 'ko' then '청두·러산·충칭·우룽·대족 8일 프라이빗 투어'
      else null end
    when 'guangzhou-shunde-foshan-5-day-private-tour' then case p_locale
      when 'en' then 'Guangzhou, Shunde & Foshan: 5-Day Private Tour'
      when 'zh' then '广州·顺德·佛山 5 天 4 晚私家团'
      when 'ko' then '광저우·순더·포산 5일 프라이빗 투어'
      else null end
    when 'huangshan-hongcun-huizhou-5-day-private-tour' then case p_locale
      when 'en' then 'Huangshan, Hongcun & Huizhou: 5-Day Private Tour'
      when 'zh' then '黄山·宏村·徽州 5 天 4 晚私家团'
      when 'ko' then '황산·홍춘·후이저우 5일 프라이빗 투어'
      else null end
    when 'jingdezhen-wuyuan-wangxian-6-day-private-tour' then case p_locale
      when 'en' then 'Jingdezhen, Wuyuan, Sanqingshan & Wangxian Valley: 6-Day Private Tour'
      when 'zh' then '景德镇·婺源·三清山·望仙谷 6 天 5 晚私家团'
      when 'ko' then '징더전·우위안·삼청산·왕셴구 6일 프라이빗 투어'
      else null end
    when 'changbaishan-yanji-winter-6-day-private-tour' then case p_locale
      when 'en' then 'Changbaishan Resort, North Slope & Yanji: 6-Day Winter Private Tour'
      when 'zh' then '长白山度假区·北坡·延吉 6 天 5 晚冬季私家团'
      when 'ko' then '창바이산·북파·옌지 6일 겨울 프라이빗 투어'
      else null end
    when 'shanghai-disneyland-5-day-private-tour' then case p_locale
      when 'en' then 'Shanghai & Disneyland: 5-Day Private Tour'
      when 'zh' then '上海与迪士尼 5 天 4 晚私家团'
      when 'ko' then '상하이·디즈니랜드 5일 프라이빗 투어'
      else null end
    when 'luoyang-dengfeng-kaifeng-6-day-private-tour' then case p_locale
      when 'en' then 'Luoyang, Dengfeng & Kaifeng: 6-Day Private Tour'
      when 'zh' then '洛阳·登封·开封 6 天 5 晚私家团'
      when 'ko' then '뤄양·덩펑·카이펑 6일 프라이빗 투어'
      else null end
    when 'datong-pingyao-6-day-private-tour' then case p_locale
      when 'en' then 'Datong & Pingyao: 6-Day Private Tour'
      when 'zh' then '大同·平遥 6 天 5 晚私家团'
      when 'ko' then '다퉁·핑야오 6일 프라이빗 투어'
      else null end
    when 'zhangye-jiayuguan-dunhuang-7-day-private-tour' then case p_locale
      when 'en' then 'Zhangye, Jiayuguan & Dunhuang: 7-Day Private Tour'
      when 'zh' then '张掖·嘉峪关·敦煌 7 天 6 晚私家团'
      when 'ko' then '장예·자위관·둔황 7일 프라이빗 투어'
      else null end
    when 'chongqing-yangtze-cruise-6-day-private-tour' then case p_locale
      when 'en' then 'Chongqing & Yangtze Three Gorges: 6-Day Private Tour'
      when 'zh' then '重庆与长江三峡游轮 6 天 5 晚私家团'
      when 'ko' then '충칭·창장삼협 크루즈 6일 프라이빗 투어'
      else null end
    when 'xinjiang-ili-sayram-8-day-private-tour' then case p_locale
      when 'en' then 'Ili, Sayram Lake & Nalati: 8-Day Private Tour'
      when 'zh' then '伊犁·赛里木湖·那拉提 8 天 7 晚私家团'
      when 'ko' then '이리·싸이리무호·나라티 8일 프라이빗 투어'
      else null end
    when 'hulunbuir-7-day-private-tour' then case p_locale
      when 'en' then 'Hulunbuir Grassland & Forest: 7-Day Private Tour'
      when 'zh' then '呼伦贝尔草原与森林 7 天 6 晚私家团'
      when 'ko' then '후룬베이얼 초원·숲 7일 프라이빗 투어'
      else null end
    when 'kunming-jianshui-yuanyang-6-day-private-tour' then case p_locale
      when 'en' then 'Kunming, Jianshui & Yuanyang: 6-Day Private Tour'
      when 'zh' then '昆明·建水·元阳 6 天 5 晚私家团'
      when 'ko' then '쿤밍·젠수이·위안양 6일 프라이빗 투어'
      else null end
    when 'shenzhen-family-tech-4-day-private-tour' then case p_locale
      when 'en' then 'Shenzhen Family Science & Technology: 4-Day Private Tour'
      when 'zh' then '深圳亲子科技 4 天 3 晚私家团'
      when 'ko' then '선전 가족 과학·기술 4일 프라이빗 투어'
      else null end
    when 'beijing-xian-shanghai-12-day-private-tour' then case p_locale
      when 'en' then 'Beijing, Xi''an & Shanghai: 12-Day Private Tour'
      when 'zh' then '北京·西安·上海 12 天 11 晚私家团'
      when 'ko' then '베이징·시안·상하이 12일 프라이빗 투어'
      else null end
    else null
  end;
$$;

-- A selection is valid only for an exact public price row. Products whose
-- package has no price rows remain quote-only and therefore have no branch.
create or replace function homeground_private.is_valid_private_tour_selection_v1(
  p_slug text, p_package_id text, p_travelers integer
) returns boolean
language sql immutable set search_path = pg_catalog
as $$
  select case p_slug
    when 'shanghai-suzhou-hangzhou-6-day-private-tour' then
      p_package_id = 'standard-guided' and p_travelers in (2, 4)
    when 'chengdu-pandas-sanxingdui-5-day-private-tour' then
      p_package_id = 'standard-guided' and p_travelers in (2, 4)
    when 'xian-terracotta-warriors-5-day-private-tour' then
      p_package_id = 'standard-guided' and p_travelers in (2, 4)
    when 'chongqing-wulong-5-day-private-tour' then
      p_package_id = 'standard-guided' and p_travelers in (2, 4)
    when 'guilin-yangshuo-5-day-private-tour' then
      p_package_id = 'standard-guided' and p_travelers in (2, 4)
    when 'harbin-winter-5-day-private-tour' then
      p_package_id = 'standard-guided-winter' and p_travelers in (2, 4)
    when 'shanghai-suzhou-5-day-private-tour' then
      p_package_id = 'standard-guided' and p_travelers in (2, 4)
    when 'beijing-highlights-5-day-private-tour' then
      p_package_id in ('english-guided', 'no-guide') and p_travelers in (2, 4)
    when 'zhangjiajie-forest-4-day-private-tour' then
      p_package_id = 'fixed-route-english-guided' and p_travelers in (2, 4)
    when 'zhangjiajie-furong-fenghuang-7-day-private-tour' then
      p_package_id = 'standard-guided' and p_travelers in (2, 4)
    when 'chengdu-jiuzhaigou-huanglong-6-day-private-tour' then
      p_package_id = 'standard-guided' and p_travelers = 2
    when 'kunming-dali-lijiang-8-day-private-tour' then
      p_package_id = 'standard-guided' and p_travelers = 6
    when 'guizhou-huangguoshu-libo-miao-7-day-private-tour' then
      p_package_id = 'standard-guided' and p_travelers = 2
    when 'xiamen-tulou-quanzhou-6-day-private-tour' then
      p_package_id = 'standard-guided' and p_travelers = 2
    when 'chaozhou-shantou-nanao-5-day-private-tour' then
      p_package_id = 'standard-guided' and p_travelers in (2, 4, 6)
    when 'chengdu-chongqing-8-day-private-tour' then
      p_package_id = 'standard-guided' and p_travelers = 2
    when 'guangzhou-shunde-foshan-5-day-private-tour' then
      p_package_id = 'standard-guided' and p_travelers in (2, 4, 6)
    when 'huangshan-hongcun-huizhou-5-day-private-tour' then
      p_package_id = 'standard-guided' and p_travelers = 4
    when 'luoyang-dengfeng-kaifeng-6-day-private-tour' then
      p_package_id = 'standard-guided' and p_travelers in (2, 4, 6)
    when 'zhangye-jiayuguan-dunhuang-7-day-private-tour' then
      p_package_id = 'standard-guided' and p_travelers in (2, 4, 6)
    when 'kunming-jianshui-yuanyang-6-day-private-tour' then
      p_package_id = 'standard-guided' and p_travelers in (2, 4, 6)
    when 'shenzhen-family-tech-4-day-private-tour' then
      p_package_id = 'standard-guided' and p_travelers in (2, 4, 6)
    when 'beijing-xian-shanghai-12-day-private-tour' then
      p_package_id = 'standard-guided' and p_travelers in (2, 4, 6)
    else false
  end is true;
$$;

revoke all on function homeground_private.private_tour_product_name_v1(text, text)
  from public, anon, authenticated, service_role;
revoke all on function homeground_private.is_valid_private_tour_selection_v1(text, text, integer)
  from public, anon, authenticated, service_role;

commit;
