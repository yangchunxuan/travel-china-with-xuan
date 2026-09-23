-- Match the inquiry selection contract to the published six-traveller tiers.
-- Quote-only and products without an approved four-person basis remain unchanged.
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
    else false
  end is true;
$$;
