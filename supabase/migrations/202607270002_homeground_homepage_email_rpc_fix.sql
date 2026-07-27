begin;

-- The wrapper's first argument to create_homeground_inquiry must resolve to
-- smallint. An uncast integer literal cannot resolve the strict RPC signature
-- at runtime, even though the wrapper itself can be created successfully.
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
  technical_snapshot jsonb := jsonb_build_object(
    'kind', 'homepage-email',
    'informationStatus', 'not_provided',
    'ruleVersion', '2026-07-26.1'
  );
begin
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
    or p_attribution is distinct from '{}'::jsonb
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
    raise exception using
      errcode = '22023',
      message = 'invalid homepage email input';
  end if;

  result := public.create_homeground_inquiry(
    1::smallint,
    '2026-07-18.1',
    p_locale,
    gen_random_uuid(),
    1,
    'homepage-email',
    '2026-07-26.1',
    jsonb_build_object('informationStatus', 'not_provided'),
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
        answers_json =
          jsonb_build_object('informationStatus', 'not_provided'),
        route_snapshot_json = technical_snapshot,
        attribution_json = '{}'::jsonb
      where inquiry_id = (result ->> 'inquiryId')::uuid;
  end if;

  return result;
end;
$$;

comment on function public.create_homeground_homepage_email_v1(
  smallint,
  text,
  text,
  text,
  text,
  text,
  jsonb,
  text,
  text,
  text,
  integer,
  integer,
  timestamptz
) is
  'Creates or replays an email-only homepage contact request. The controlled route fields are technical sentinels and never represent traveller-supplied itinerary facts.';

revoke all on function public.create_homeground_homepage_email_v1(
  smallint,
  text,
  text,
  text,
  text,
  text,
  jsonb,
  text,
  text,
  text,
  integer,
  integer,
  timestamptz
) from public, anon, authenticated;

grant execute on function public.create_homeground_homepage_email_v1(
  smallint,
  text,
  text,
  text,
  text,
  text,
  jsonb,
  text,
  text,
  text,
  integer,
  integer,
  timestamptz
) to service_role;

notify pgrst, 'reload schema';

commit;
