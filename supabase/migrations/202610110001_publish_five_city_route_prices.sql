-- Publish the five-city 13-day route's prices: one hotel-inclusive package
-- ('standard-guided') for 4, 6 or 8 travellers. Carry forward the complete
-- 202610090001 selection function byte-for-byte and add one branch. Product
-- names are unchanged: 202610100002 already names this route. The inquiry
-- functions already accept 4, 6 and 8 travellers.
-- Apply after 202610100002_add_five_city_quote_route.sql.
begin;

create or replace function homeground_private.is_valid_private_tour_selection_v1(
  p_slug text, p_package_id text, p_travelers integer
) returns boolean
language sql immutable set search_path = pg_catalog
as $$
  select case p_slug
    when 'shanghai-suzhou-hangzhou-6-day-private-tour' then
      p_package_id = 'standard-guided' and p_travelers in (2, 4, 6)
    when 'chengdu-pandas-sanxingdui-5-day-private-tour' then
      p_package_id = 'standard-guided' and p_travelers in (2, 4, 6)
    when 'xian-terracotta-warriors-5-day-private-tour' then
      p_package_id = 'standard-guided' and p_travelers in (2, 4, 6)
    when 'chongqing-wulong-5-day-private-tour' then
      p_package_id = 'standard-guided' and p_travelers in (2, 4, 6)
    when 'guilin-yangshuo-5-day-private-tour' then
      p_package_id = 'standard-guided' and p_travelers in (2, 4, 6)
    when 'harbin-winter-5-day-private-tour' then
      p_package_id = 'standard-guided-winter' and p_travelers in (2, 4, 6)
    when 'shanghai-suzhou-5-day-private-tour' then
      p_package_id = 'standard-guided' and p_travelers in (2, 4, 6)
    when 'beijing-highlights-5-day-private-tour' then
      p_package_id in ('english-guided', 'no-guide') and p_travelers in (2, 4, 6)
    when 'zhangjiajie-forest-4-day-private-tour' then
      p_package_id = 'fixed-route-english-guided' and p_travelers in (2, 4, 6)
    when 'zhangjiajie-furong-fenghuang-7-day-private-tour' then
      p_package_id = 'standard-guided' and p_travelers in (2, 4, 6)
    when 'zhangjiajie-4-day-private-tour' then
      p_package_id in ('selected-city-stay', 'spacious-premium-stay', 'distinctive-mountain-stay') and p_travelers = 6
    when 'chengdu-jiuzhaigou-huanglong-6-day-private-tour' then
      p_package_id = 'standard-guided' and p_travelers in (2, 6)
    when 'kunming-dali-lijiang-8-day-private-tour' then
      p_package_id = 'standard-guided' and p_travelers = 6
    when 'guizhou-huangguoshu-libo-miao-7-day-private-tour' then
      p_package_id = 'standard-guided' and p_travelers in (2, 6)
    when 'xiamen-tulou-quanzhou-6-day-private-tour' then
      p_package_id = 'standard-guided' and p_travelers in (2, 6)
    when 'chaozhou-shantou-nanao-5-day-private-tour' then
      p_package_id = 'standard-guided' and p_travelers in (2, 4, 6)
    when 'chengdu-chongqing-8-day-private-tour' then
      p_package_id = 'standard-guided' and p_travelers in (2, 6)
    when 'guangzhou-shunde-foshan-5-day-private-tour' then
      p_package_id = 'standard-guided' and p_travelers in (2, 4, 6)
    when 'huangshan-hongcun-huizhou-5-day-private-tour' then
      p_package_id = 'standard-guided' and p_travelers in (4, 6)
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
    when 'beijing-xian-chengdu-guilin-shanghai-14-day-private-tour' then
      p_package_id = 'standard-guided' and p_travelers in (2, 4, 6)
    when 'beijing-xian-chengdu-guilin-shanghai-14-day-small-group-tour' then
      p_package_id = 'small-group-departure' and p_travelers = 2
    when 'beijing-xian-zhangjiajie-guilin-shanghai-14-day-private-tour' then
      p_package_id = 'standard-guided' and p_travelers in (2, 4, 6)
    when 'beijing-xian-chengdu-yangtze-cruise-shanghai-17-day-private-tour' then
      p_package_id = 'standard-guided' and p_travelers in (2, 4, 6)
    when 'beijing-xian-silk-road-15-day-private-tour' then
      p_package_id = 'standard-guided' and p_travelers in (2, 4, 6)
    when 'beijing-xian-yunnan-14-day-private-tour' then
      p_package_id = 'standard-guided' and p_travelers in (2, 4, 6)
    when 'beijing-xian-huangshan-hangzhou-shanghai-14-day-private-tour' then
      p_package_id = 'standard-guided' and p_travelers in (2, 4, 6)
    when 'china-grand-tour-21-day-private-tour' then
      p_package_id = 'standard-guided' and p_travelers in (2, 4, 6)
    when 'beijing-xian-zhangjiajie-guilin-shanghai-14-day-small-group-tour' then
      p_package_id = 'small-group-departure' and p_travelers = 2
    when 'beijing-xian-chengdu-yangtze-cruise-shanghai-17-day-small-group-tour' then
      p_package_id = 'small-group-departure' and p_travelers = 2
    when 'beijing-xian-silk-road-15-day-small-group-tour' then
      p_package_id = 'small-group-departure' and p_travelers = 2
    when 'beijing-xian-guilin-shanghai-10-day-private-tour' then
      p_package_id = 'standard-guided' and p_travelers in (2, 4, 6)
    when 'beijing-hangzhou-suzhou-shanghai-11-day-private-tour' then
      p_package_id = 'standard-guided' and p_travelers in (2, 4, 6)
    when 'shanghai-zhangjiajie-fenghuang-guilin-13-day-private-tour' then
      p_package_id = 'standard-guided' and p_travelers in (2, 4, 6)
    when 'beijing-xian-shanghai-8-day-private-tour' then
      p_package_id = 'standard-guided' and p_travelers in (2, 4, 6)
    when 'beijing-xian-guilin-hong-kong-10-day-private-tour' then
      p_package_id = 'standard-guided' and p_travelers in (2, 4, 6)
    when 'beijing-xian-yangtze-cruise-shanghai-12-day-private-tour' then
      p_package_id = 'standard-guided' and p_travelers in (2, 4, 6)
    when 'harbin-yabuli-snow-town-6-day-private-tour' then
      p_package_id in ('low-season', 'peak-season') and p_travelers in (2, 4, 6, 8)
    when 'harbin-snow-town-changbaishan-yanji-8-day-private-tour' then
      p_package_id in ('low-season', 'peak-season') and p_travelers in (2, 4, 6, 8)
    when 'harbin-mohe-arctic-village-7-day-private-tour' then
      p_package_id in ('low-season', 'peak-season') and p_travelers in (2, 4, 6, 8)
    when 'harbin-snow-town-mohe-9-day-private-tour' then
      p_package_id in ('low-season', 'peak-season') and p_travelers in (2, 4, 6, 8)
    when 'yanji-changbaishan-wanda-6-day-private-tour' then
      p_package_id in ('low-season', 'peak-season') and p_travelers in (2, 4, 6, 8)
    when 'beijing-xian-chengdu-guilin-shanghai-13-day-private-tour' then
      p_package_id = 'standard-guided' and p_travelers in (4, 6, 8)
    else false
  end is true;
$$;

revoke all on function homeground_private.is_valid_private_tour_selection_v1(text, text, integer)
  from public, anon, authenticated, service_role;

commit;
