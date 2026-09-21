-- Forward migration for the ten Homeground private-tour expansion products.
-- Historical migrations remain unchanged; this migration updates databases
-- that have already applied the published private-tour inquiry contracts.

begin;

-- Keep the canonical product names in one backend allowlist so homepage and
-- quote inquiries apply exactly the same locale-specific identity checks.
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
    else null
  end;
$$;

-- A selection is valid only when that exact package and group size has a
-- public price row. Quote-only products deliberately have no valid selection.
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
    else false
  end is true;
$$;

revoke all on function homeground_private.private_tour_product_name_v1(text, text)
  from public, anon, authenticated, service_role;
revoke all on function homeground_private.is_valid_private_tour_selection_v1(text, text, integer)
  from public, anon, authenticated, service_role;

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
    or p_locale not in ('en', 'zh', 'ko')
    or p_landing_path is distinct from (
      case p_locale
        when 'en' then '/'
        when 'zh' then '/zh/'
        when 'ko' then '/ko/'
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

comment on function public.create_homeground_homepage_email_v1(
  smallint, text, text, text, text, text, jsonb, text, text, text,
  integer, integer, timestamptz
) is
  'Creates or replays an email-only homepage contact request and may retain an allowlisted tour identity plus an exact published package and group-size selection. No prices, traveller names or free-text itinerary facts are accepted.';

revoke all on function public.create_homeground_homepage_email_v1(
  smallint, text, text, text, text, text, jsonb, text, text, text,
  integer, integer, timestamptz
) from public, anon, authenticated;
grant execute on function public.create_homeground_homepage_email_v1(
  smallint, text, text, text, text, text, jsonb, text, text, text,
  integer, integer, timestamptz
) to service_role;

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
    or p_locale is null or p_locale not in ('en', 'zh', 'ko')
    or jsonb_typeof(p_product_interest) is distinct from 'object'
    or expected_product_interest is null
    or p_product_interest is distinct from expected_product_interest
    or p_landing_path is distinct from (
      case p_locale when 'en' then '/' when 'zh' then '/zh/' when 'ko' then '/ko/' end
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

comment on function public.create_homeground_private_tour_quote_v1(
  smallint, text, text, text, jsonb, text, text, text, text, text, text, text,
  integer, integer, timestamptz
) is
  'Creates or replays a private-tour quote request using a canonical product identity and, when supplied, an exact published package and group-size selection.';

revoke all on function public.create_homeground_private_tour_quote_v1(
  smallint, text, text, text, jsonb, text, text, text, text, text, text, text,
  integer, integer, timestamptz
) from public, anon, authenticated;
grant execute on function public.create_homeground_private_tour_quote_v1(
  smallint, text, text, text, jsonb, text, text, text, text, text, text, text,
  integer, integer, timestamptz
) to service_role;

-- Traffic may retain any known product with no selection. When a selection is
-- present, the package and traveller count must be a public priced combination.
create or replace function homeground_private.is_valid_traffic_product_v2(
  p_slug text, p_package_id text, p_travelers integer
) returns boolean
language sql immutable set search_path = pg_catalog
as $$
  select case
    when p_slug is null then p_package_id is null and p_travelers is null
    when homeground_private.private_tour_product_name_v1(p_slug, 'en') is not null then
      (p_package_id is null and p_travelers is null)
      or homeground_private.is_valid_private_tour_selection_v1(
        p_slug, p_package_id, p_travelers
      )
    else false
  end is true;
$$;

revoke all on function homeground_private.is_valid_traffic_product_v2(text, text, integer)
  from public, anon, authenticated, service_role;

-- The original v2 event validator accepted only two- and four-person
-- selections. Expansion products also publish six-person prices, so keep the
-- primitive numeric guard broad and leave the exact product/package/group
-- decision to is_valid_traffic_product_v2 above.
create or replace function homeground_private.is_valid_traffic_event_v2(candidate jsonb)
returns boolean language plpgsql immutable set search_path = pg_catalog, homeground_private
as $$
declare sequence_value integer; travelers_value integer;
begin
  if jsonb_typeof(candidate) is distinct from 'object' then return false; end if;
  if exists (select 1 from jsonb_object_keys(candidate) supplied(key)
    where key not in ('eventId', 'type', 'pagePath', 'actionCode', 'payloadHash',
      'clientSequence', 'productSlug', 'packageId', 'travelers', 'surface', 'errorCode'))
    or (candidate ->> 'eventId') is null
    or (candidate ->> 'eventId') !~* '^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$'
    or (candidate ->> 'payloadHash') is null
    or (candidate ->> 'payloadHash') !~ '^[0-9a-f]{64}$'
    or not homeground_private.is_valid_traffic_path(candidate ->> 'pagePath')
    or (candidate ->> 'type') is null
    or (candidate ->> 'type') not in ('page_view', 'contact_options_viewed', 'contact_channel_clicked',
      'email_form_started', 'product_selection_changed', 'contact_channel_selected',
      'enquiry_submit_attempted', 'enquiry_submit_failed', 'enquiry_submit_uncertain')
  then return false; end if;
  if jsonb_typeof(candidate -> 'clientSequence') is distinct from 'number'
    or (candidate ->> 'clientSequence') !~ '^[1-9][0-9]{0,6}$'
  then return false; end if;
  sequence_value := (candidate ->> 'clientSequence')::integer;
  if sequence_value not between 1 and 1000000 then return false; end if;
  if (candidate ->> 'travelers') is not null then
    if (candidate -> 'travelers') not in (
      '2'::jsonb, '3'::jsonb, '4'::jsonb, '5'::jsonb,
      '6'::jsonb, '7'::jsonb, '8'::jsonb, '9'::jsonb
    ) then return false; end if;
    travelers_value := (candidate ->> 'travelers')::integer;
  end if;
  if not homeground_private.is_valid_traffic_product_v2(candidate ->> 'productSlug',
    candidate ->> 'packageId', travelers_value) then return false; end if;
  if (candidate ->> 'type') = 'product_selection_changed' and
    ((candidate ->> 'productSlug') is null or (candidate ->> 'packageId') is null or travelers_value is null)
  then return false; end if;
  if (candidate ->> 'type') in ('contact_channel_clicked', 'contact_channel_selected') then
    if (candidate ->> 'actionCode') is null or (candidate ->> 'actionCode') not in ('email', 'whatsapp', 'messenger')
    then return false; end if;
  elsif (candidate ->> 'actionCode') is not null then return false;
  end if;
  if ((candidate ->> 'surface') is not null and
    (candidate ->> 'surface') not in ('product', 'homepage_quick_email', 'planner', 'contact_options')) or
    ((candidate ->> 'type') <> 'page_view' and (candidate ->> 'surface') is null)
  then return false; end if;
  if (candidate ->> 'type') in ('enquiry_submit_failed', 'enquiry_submit_uncertain') then
    if (candidate ->> 'errorCode') is null or (candidate ->> 'errorCode') not in
      ('validation', 'network', 'rate_limited', 'service_unavailable', 'server_error', 'unknown_response')
    then return false; end if;
  elsif (candidate ->> 'errorCode') is not null then return false;
  end if;
  return true;
end;
$$;

revoke all on function homeground_private.is_valid_traffic_event_v2(jsonb)
  from public, anon, authenticated, service_role;

commit;
