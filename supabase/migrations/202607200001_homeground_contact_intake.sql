begin;

-- The current contact step can save either Email or WhatsApp and may include
-- the traveller's optional departure country/region. Existing inquiries stay
-- valid with a NULL departure_country value.
alter table homeground_private.inquiries
  add column if not exists departure_country text;

alter table homeground_private.inquiries
  drop constraint if exists inquiries_departure_country_check;

alter table homeground_private.inquiries
  add constraint inquiries_departure_country_check check (
    departure_country is null
    or (
      char_length(departure_country) between 1 and 80
      and departure_country !~ '[[:cntrl:]]'
    )
  );

-- Keep the 2026-07-19 RPC available for already-open static pages. The new
-- wrapper reuses its transaction, rate-limit and idempotency logic, then adds
-- the new versioned fields before that transaction can become visible.
create or replace function public.create_homeground_destination_inquiry_v2(
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
begin
  if p_schema_version <> 2
    or p_form_version <> '2026-07-20.1'
    or p_privacy_notice_version <> '2026-07-20.1'
    or (
      p_departure_country is not null
      and (
        char_length(trim(p_departure_country)) not between 1 and 80
        or trim(p_departure_country) ~ '[[:cntrl:]]'
      )
    )
  then
    raise exception using
      errcode = '22023',
      message = 'invalid current destination inquiry input';
  end if;

  result := public.create_homeground_destination_inquiry(
    p_schema_version,
    '2026-07-19.1',
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
    p_attribution,
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
        departure_country = nullif(trim(p_departure_country), '')
      where inquiry_id = (result ->> 'inquiryId')::uuid;
  end if;

  return result;
end;
$$;

revoke all on function public.create_homeground_destination_inquiry_v2(
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
  jsonb,
  text,
  text,
  text,
  integer,
  integer,
  timestamptz
) from public, anon, authenticated;

grant execute on function public.create_homeground_destination_inquiry_v2(
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
  jsonb,
  text,
  text,
  text,
  integer,
  integer,
  timestamptz
) to service_role;

-- Version the claim RPC instead of replacing its row type in place. This lets
-- an older worker continue using the original claim function during rollout.
create or replace function public.claim_homeground_notification_jobs_v2(
  p_worker_id text,
  p_job_limit integer default 10,
  p_lease_seconds integer default 60
)
returns table (
  job_id uuid,
  inquiry_id uuid,
  public_reference text,
  locale text,
  route_id text,
  answers jsonb,
  route_snapshot jsonb,
  reply_channel text,
  contact_email text,
  contact_phone_e164 text,
  departure_country text,
  note text,
  inquiry_created_at timestamptz,
  first_response_due_at timestamptz,
  lease_token uuid,
  row_version bigint,
  attempt_count integer
)
language sql
security definer
set search_path = pg_catalog, public, homeground_private
as $$
  select
    claimed.job_id,
    claimed.inquiry_id,
    claimed.public_reference,
    claimed.locale,
    claimed.route_id,
    claimed.answers,
    claimed.route_snapshot,
    claimed.reply_channel,
    claimed.contact_email,
    claimed.contact_phone_e164,
    inquiry.departure_country,
    claimed.note,
    claimed.inquiry_created_at,
    claimed.first_response_due_at,
    claimed.lease_token,
    claimed.row_version,
    claimed.attempt_count
  from public.claim_homeground_notification_jobs(
    p_worker_id,
    p_job_limit,
    p_lease_seconds
  ) claimed
  join homeground_private.inquiries inquiry
    on inquiry.inquiry_id = claimed.inquiry_id;
$$;

revoke all on function public.claim_homeground_notification_jobs_v2(
  text,
  integer,
  integer
) from public, anon, authenticated;

grant execute on function public.claim_homeground_notification_jobs_v2(
  text,
  integer,
  integer
) to service_role;

commit;
