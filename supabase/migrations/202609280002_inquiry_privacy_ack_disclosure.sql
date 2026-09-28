-- Accept the reviewed receipt disclosure without rejecting cached older forms.
-- Preserve the submitted version in the inquiry; never relabel historical consent.
begin;

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
    or (p_privacy_notice_version is null or p_privacy_notice_version not in ('2026-07-26.1', '2026-09-28.1'))
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
    or (p_privacy_notice_version is null or p_privacy_notice_version not in ('2026-07-26.1', '2026-09-28.1'))
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

create or replace function public.create_homeground_destination_inquiry_v4(
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
  p_departure_country text,
  p_rough_budget_per_person text,
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
set search_path = pg_catalog, public, homeground_private
as $$
declare
  result jsonb;
  normalized_attribution jsonb := coalesce(p_attribution, '{}'::jsonb);
begin
  if p_schema_version <> 2
    or p_form_version <> '2026-07-21.1'
    or (p_privacy_notice_version is null or p_privacy_notice_version not in ('2026-07-21.1', '2026-09-28.1'))
    or p_landing_path is distinct from (
      case p_locale
        when 'en' then '/'
        when 'zh' then '/zh/'
        when 'ko' then '/ko/'
        else null
      end
    )
    or jsonb_typeof(normalized_attribution) <> 'object'
    or (
      normalized_attribution
        - 'utmSource'
        - 'utmMedium'
        - 'utmCampaign'
    ) <> '{}'::jsonb
    or coalesce(normalized_attribution ->> 'utmSource', '') <> ''
    or coalesce(normalized_attribution ->> 'utmMedium', '') <> ''
    or coalesce(normalized_attribution ->> 'utmCampaign', '') <> ''
  then
    raise exception using
      errcode = '22023',
      message = 'invalid current destination inquiry input';
  end if;

  result := public.create_homeground_destination_inquiry_v3(
    p_schema_version,
    '2026-07-20.2',
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
    p_departure_country,
    p_rough_budget_per_person,
    p_note,
    '2026-07-20.2',
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
        form_version = p_form_version,
        privacy_notice_version = p_privacy_notice_version,
        attribution_json = '{}'::jsonb
      where inquiry_id = (result ->> 'inquiryId')::uuid;
  end if;

  return result;
end;
$$;

commit;
