begin;

-- The 2026-07-21 form removes silent attribution from newly saved website
-- inquiries. Keep the older RPC generations callable for already-open static
-- pages, while ensuring the current generation stores no UTM payload.
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
    or p_privacy_notice_version <> '2026-07-21.1'
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

comment on function public.create_homeground_destination_inquiry_v4(
  smallint,
  text,
  text,
  uuid,
  integer,
  text,
  text,
  jsonb,
  jsonb,
  text,
  text,
  text,
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
  'Creates or replays a 2026-07-21 destination inquiry while discarding attribution. The internal Inquiry ID is required only inside the persistence transaction.';

revoke all on function public.create_homeground_destination_inquiry_v4(
  smallint,
  text,
  text,
  uuid,
  integer,
  text,
  text,
  jsonb,
  jsonb,
  text,
  text,
  text,
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

grant execute on function public.create_homeground_destination_inquiry_v4(
  smallint,
  text,
  text,
  uuid,
  integer,
  text,
  text,
  jsonb,
  jsonb,
  text,
  text,
  text,
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

commit;
