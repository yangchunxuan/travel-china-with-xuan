begin;

-- Deploy the quote-aware notification worker and admin readers first, then
-- this migration, the intake allowlist, and finally the independently gated UI.
-- No previous RPC signature or queued notification shape is changed.
alter table homeground_private.inquiries
  drop constraint if exists inquiries_entry_path_check;
alter table homeground_private.inquiries
  add constraint inquiries_entry_path_check check (
    entry_path in ('generated_route', 'destination_timing', 'homepage_email', 'private_tour_quote')
  );

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
  allowed_packages text[];
  quote_answers jsonb;
  technical_snapshot jsonb := jsonb_build_object(
    'kind', 'private-tour-quote', 'ruleVersion', '2026-09-10.1'
  );
begin
  expected_product_name := case product_slug
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
    when 'zhangjiajie-4-day-private-tour' then case p_locale
      when 'en' then 'Zhangjiajie in 4 Days: Peaks, Glass Bridge and Tianmen Mountain'
      when 'zh' then '张家界4天3晚：峰林、玻璃桥与天门山'
      when 'ko' then '장자제 4일 3박: 사암 봉우리와 유리다리, 톈먼산'
      else null end
    else null
  end;

  if expected_product_name is not null then
    expected_product_interest := jsonb_build_object(
      'slug', product_slug,
      'name', expected_product_name
    );
    if p_product_interest ? 'selection' then
      -- Keep this enum aligned with getPrivateTourInquirySelection.
      allowed_packages := case product_slug
        when 'beijing-highlights-5-day-private-tour' then array['english-guided', 'no-guide']
        when 'harbin-winter-5-day-private-tour' then array['standard-guided-winter']
        when 'zhangjiajie-forest-4-day-private-tour' then array['fixed-route-english-guided']
        when 'zhangjiajie-4-day-private-tour' then array[]::text[]
        else array['standard-guided']
      end;
      if jsonb_typeof(product_selection) is distinct from 'object'
        or jsonb_typeof(product_selection -> 'packageId') is distinct from 'string'
        or not coalesce((product_selection ->> 'packageId') = any(allowed_packages), false)
        or jsonb_typeof(product_selection -> 'travelers') is distinct from 'number'
        or not coalesce((product_selection -> 'travelers') in ('2'::jsonb, '4'::jsonb), false)
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
      expected_product_interest := expected_product_interest || jsonb_build_object('selection', expected_selection);
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
    -- A real calendar date, not a regex-only date such as 2026-02-30.
    if to_char(p_travel_date::date, 'YYYY-MM-DD') is distinct from p_travel_date then
      raise exception using errcode = '22023', message = 'invalid requested travel date';
    end if;
  end if;

  quote_answers := jsonb_build_object(
    'productInterest', expected_product_interest,
    'travelDate', p_travel_date,
    'landingPath', p_landing_path
  );
  -- Reuse the atomic idempotency lock, rate limit, saved reference and outbox.
  -- All versioned fields are written before the transaction becomes visible.
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

create or replace function public.create_homeground_private_tour_quote_with_traffic_v1(
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
  p_first_response_due_at timestamptz,
  p_traffic_session_hash text
)
returns jsonb
language plpgsql
security definer
set search_path = pg_catalog, public, homeground_private
as $$
declare
  result jsonb;
  attribution_result jsonb := jsonb_build_object('outcome', 'not_requested');
begin
  result := public.create_homeground_private_tour_quote_v1(
    p_schema_version, p_form_version, p_locale, p_contact_email,
    p_product_interest, p_travel_date, p_note, p_privacy_notice_version,
    p_landing_path, p_idempotency_key_hash, p_payload_hash,
    p_rate_limit_subject_hash, p_short_rate_limit, p_daily_rate_limit,
    p_first_response_due_at
  );
  if p_traffic_session_hash is not null
    and (result ->> 'outcome') in ('created', 'replay')
  then
    attribution_result := homeground_private.enqueue_inquiry_traffic_attribution_v1(
      (result ->> 'inquiryId')::uuid, p_traffic_session_hash
    );
  end if;
  return result || jsonb_build_object('attributionOutcome', attribution_result ->> 'outcome');
end;
$$;

-- Dates and notes stay in the private inquiry / planner notification, never in
-- the anonymous admin metrics or traffic event payload. Group size is not a
-- legacy party answer, and is deliberately not added to that metric.
insert into homeground_private.admin_metric_compatibility (
  metric_id, schema_version, entry_path, form_version, rule_version
)
select metric_id, 4, 'private_tour_quote', '2026-09-10.1', '2026-09-10.1'
from unnest(array['reply_channel_choice', 'form_locale']) as metric(metric_id)
on conflict do nothing;

revoke all on function public.create_homeground_private_tour_quote_v1(
  smallint, text, text, text, jsonb, text, text, text, text, text, text, text, integer, integer, timestamptz
) from public, anon, authenticated;
grant execute on function public.create_homeground_private_tour_quote_v1(
  smallint, text, text, text, jsonb, text, text, text, text, text, text, text, integer, integer, timestamptz
) to service_role;

revoke all on function public.create_homeground_private_tour_quote_with_traffic_v1(
  smallint, text, text, text, jsonb, text, text, text, text, text, text, text, integer, integer, timestamptz, text
) from public, anon, authenticated;
grant execute on function public.create_homeground_private_tour_quote_with_traffic_v1(
  smallint, text, text, text, jsonb, text, text, text, text, text, text, text, integer, integer, timestamptz, text
) to service_role;

commit;
