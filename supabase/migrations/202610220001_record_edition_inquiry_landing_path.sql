-- Enquiries from the French, German, Spanish and Arabic editions are filed
-- under the English intake (locale = 'en'). They now record their own page as
-- the landing path, so the planner can see the visitor's page language:
--   homepage email:     '/fr/', '/de/', '/es/', '/ar/'   (besides '/')
--   private-tour quote: '/fr/tours/<slug>/' etc.          (besides '/tours/<slug>/')
-- Only locale 'en' gains these paths; zh/ko/ja keep exactly one surface, and
-- every other path stays rejected. The locale value itself is unchanged.
--
-- Both submit functions are exact copies of their latest definitions in
-- 202609300001_add_northeast_winter_preview_tours.sql; only the landing-path
-- condition differs. The *_with_traffic_v1 wrappers and
-- create_homeground_inquiry_with_receipt_v1 call these functions, so they
-- accept the same paths unchanged. create or replace keeps existing grants.
--
-- Safe order: this migration accepts both old and new paths, so it can be
-- applied before the Edge Functions and the static site that send them.

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
        when '8'::jsonb then 8
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
    or (
      p_landing_path is distinct from (
        case p_locale
          when 'en' then '/'
          when 'zh' then '/zh/'
          when 'ko' then '/ko/'
          when 'ja' then '/ja/'
          else null
        end
      )
      and (
        p_locale is distinct from 'en'
        or coalesce(p_landing_path not in ('/fr/', '/de/', '/es/', '/ar/'), true)
      )
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
        when '8'::jsonb then 8
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
    or (
      p_landing_path is distinct from (
        case p_locale when 'en' then '/' when 'zh' then '/zh/' when 'ko' then '/ko/' when 'ja' then '/ja/' end
        || 'tours/' || product_slug || '/'
      )
      and (
        p_locale is distinct from 'en'
        or coalesce(p_landing_path not in (
          '/fr/tours/' || product_slug || '/',
          '/de/tours/' || product_slug || '/',
          '/es/tours/' || product_slug || '/',
          '/ar/tours/' || product_slug || '/'
        ), true)
      )
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

-- The internal notification needs the recorded landing path to show the page
-- language of homepage-email enquiries (their answers do not carry it). v5 is
-- v4 plus the inquiry's landing_path: it calls v4 unchanged, so leasing,
-- deadlines and email-correction snapshots stay identical. v4 remains for the
-- previous worker version and rollback.
create function public.claim_homeground_notification_jobs_v5(
  p_worker_id text,
  p_job_limit integer default 1,
  p_lease_seconds integer default 90
)
returns table(job_id uuid,inquiry_id uuid,public_reference text,locale text,route_id text,answers jsonb,route_snapshot jsonb,
  reply_channel text,contact_email text,contact_phone_e164 text,departure_country text,rough_budget_per_person text,note text,
  inquiry_created_at timestamptz,first_response_due_at timestamptz,lease_token uuid,row_version bigint,attempt_count integer,
  contact_revision integer,current_contact_revision integer,previous_contact_email text,landing_path text)
language sql
security definer
set search_path = pg_catalog, homeground_private
as $$
  select claimed.job_id, claimed.inquiry_id, claimed.public_reference, claimed.locale, claimed.route_id,
    claimed.answers, claimed.route_snapshot, claimed.reply_channel, claimed.contact_email,
    claimed.contact_phone_e164, claimed.departure_country, claimed.rough_budget_per_person, claimed.note,
    claimed.inquiry_created_at, claimed.first_response_due_at, claimed.lease_token, claimed.row_version,
    claimed.attempt_count, claimed.contact_revision, claimed.current_contact_revision,
    claimed.previous_contact_email, inquiry.landing_path
  from public.claim_homeground_notification_jobs_v4(p_worker_id, p_job_limit, p_lease_seconds) claimed
  left join homeground_private.inquiries inquiry on inquiry.inquiry_id = claimed.inquiry_id;
$$;

revoke all on function public.claim_homeground_notification_jobs_v5(text, integer, integer)
  from public, anon, authenticated;
grant execute on function public.claim_homeground_notification_jobs_v5(text, integer, integer)
  to service_role;

commit;
